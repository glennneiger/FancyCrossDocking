package com.fancycrossdocking.module;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.app.Activity;
import android.widget.Toast;
import android.content.BroadcastReceiver;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.Context;
import android.os.Bundle;
import com.facebook.react.bridge.Arguments;
import android.support.annotation.Nullable;
import android.util.Log;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import android.support.annotation.Nullable;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;

import java.util.Observable;
import java.util.Observer;
import java.util.Map;
import java.util.HashMap;


public class HoneywellDataReceiverModule extends ReactContextBaseJavaModule implements Observer,LifecycleEventListener {
  private static final String TAG = "HDR_Module";
  //Honeywell configuration
  private static final String ACTION_BARCODE_DATA = "com.honeywell.sample.action.BARCODE_DATA";
  private static final String EXTRA_SCANNER = "com.honeywell.aidc.extra.EXTRA_SCANNER";
  private static final String ACTION_CLAIM_SCANNER = "com.honeywell.aidc.action.ACTION_CLAIM_SCANNER";
  private static final String ACTION_RELEASE_SCANNER = "com.honeywell.aidc.action.ACTION_RELEASE_SCANNER";
  private static final String EXTRA_PROFILE = "com.honeywell.aidc.extra.EXTRA_PROFILE";
  private static final String EXTRA_PROPERTIES = "com.honeywell.aidc.extra.EXTRA_PROPERTIES";
  private static final String BARCODE_READ_SUCCESS = "barcodeReadSuccess";
  private static final String BARCODE_READ_FAIL = "barcodeReadFail";

  private ReactApplicationContext mReactContext;

  //Debugging on/off
  private static final boolean D = true;

  public HoneywellDataReceiverModule(ReactApplicationContext reactContext) {
    super(reactContext);
    if (D) Log.d(TAG,"Creating Honeywell Data Receiver");
    this.mReactContext = reactContext;
    reactContext.addLifecycleEventListener(this);
    //  Register a broadcast receiver for the Enumerate Scanners intent
    ObservableObject.getInstance().addObserver(this);
  }

  //(Honeywell CT40) Create a broadcast object to get the intent sent from the service.
  public BroadcastReceiver mBroadcastReceiver = new BroadcastReceiver(){
    @Override
    public void onReceive(Context context, Intent intent) {
      if (D) Log.d("HBR","Receiving scanned data from BroaadcastReceiver ");
      ObservableObject.getInstance().updateValue(intent);
    }
  };

  @Override
  public String getName() {
   return "HoneywellDataReceiver";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    //  These are the constants available to the caller
    constants.put("ACTION_BARCODE_DATA", ACTION_BARCODE_DATA);
    constants.put("EXTRA_SCANNER", EXTRA_SCANNER);
    constants.put("ACTION_CLAIM_SCANNER", ACTION_CLAIM_SCANNER);
    constants.put("ACTION_RELEASE_SCANNER", ACTION_RELEASE_SCANNER);
    constants.put("EXTRA_PROFILE", EXTRA_PROFILE);
    constants.put("EXTRA_PROPERTIES", EXTRA_PROPERTIES);
    constants.put("BARCODE_READ_SUCCESS", BARCODE_READ_SUCCESS);
    constants.put("BARCODE_READ_FAIL", BARCODE_READ_FAIL);
    return constants;
  }

  @ReactMethod
  public void startReceiver() {
    if (D) Log.d(TAG,"Registering Honeywell Data Receiver ");
    this.mReactContext.registerReceiver(mBroadcastReceiver, new IntentFilter(ACTION_BARCODE_DATA));
    claimScanner();
  }

  @Override
  public void onHostResume() {
    if (D) Log.d(TAG,"Registering Honeywell Data Receiver ");
    this.mReactContext.registerReceiver(mBroadcastReceiver, new IntentFilter(ACTION_BARCODE_DATA));
    claimScanner();
  }

  @Override
  public void onHostPause() {
    if (D) Log.d(TAG,"Unregistering Honeywell Data Receiver");
    this.mReactContext.unregisterReceiver(mBroadcastReceiver);
    releaseScanner();
  }

  @Override
  public void onHostDestroy() {
    // Activity `onDestroy`
    if (D) Log.d(TAG, "Host Destroy");
  }

  private void claimScanner() {
    Bundle properties = new Bundle();
    properties.putBoolean("DPR_DATA_INTENT", true);
    properties.putString("DPR_DATA_INTENT_ACTION", ACTION_BARCODE_DATA);
    this.mReactContext.sendBroadcast(new Intent(ACTION_CLAIM_SCANNER)
            .putExtra(EXTRA_SCANNER, "dcs.scanner.imager")
            .putExtra(EXTRA_PROFILE, "DEFAULT")// "MyProfile1")
            .putExtra(EXTRA_PROPERTIES, properties)
    );
  }

  private void releaseScanner() {
    this.mReactContext.sendBroadcast(new Intent(ACTION_RELEASE_SCANNER));
  }

  //  http://stackoverflow.com/questions/28083430/communication-between-broadcastreceiver-and-activity-android#30964385
  @Override
  public void update(Observable observable, Object content) {
    Intent intent = (Intent)content;
    String action = intent.getAction();
    if (intent.getAction().equals(ACTION_BARCODE_DATA)) {
      int version = intent.getIntExtra("version", 0);
      if (version >= 1) {
        String data = intent.getStringExtra("data");
        if (data != null){
          //Toast.makeText(mReactContext.getApplicationContext(), "Data: "+data, Toast.LENGTH_SHORT).show();
          WritableMap params = Arguments.createMap();
          params.putString("source", "scanner");
          params.putString("data", data);
          params.putString("labelType", "LABEL-TYPE-CODE128");
          sendEvent(this.mReactContext, BARCODE_READ_SUCCESS, params);
        }
      }
    }
  }

  //  Sending events to JavaScript as defined in the native-modules documentation.
  //  Note: Callbacks can only be invoked a single time so are not a suitable interface for barcode scans.
  private void sendEvent(ReactContext reactContext,String eventName,WritableMap params) {
      reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, params);
  }
}
