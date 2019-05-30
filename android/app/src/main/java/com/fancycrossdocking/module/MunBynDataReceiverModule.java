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


public class MunBynDataReceiverModule extends ReactContextBaseJavaModule implements Observer,LifecycleEventListener {
  private static final String TAG = "MBR_Module";
  //MunByn IPDA030B
  public final static String SCAN_ACTION = "scan.rcv.message";
  public final static String BARCODE_READ_SUCCESS="munbyn_barcode_read_success";
  public final static String BARCODE_READ_FAIL="munbyn_barcode_read_fail";

  private ReactApplicationContext mReactContext;

  //Debugging on/off
  private static final boolean D = true;

  public MunBynDataReceiverModule(ReactApplicationContext reactContext) {
    super(reactContext);
    if (D) Log.d(TAG,"Creating MunByn Data Receiver");
    this.mReactContext = reactContext;
    reactContext.addLifecycleEventListener(this);
    //  Register a broadcast receiver for the Enumerate Scanners intent
    ObservableObject.getInstance().addObserver(this);
  }

  //(MunByn IPDA030B) Create a broadcast object to get the intent sent from the service.
  public BroadcastReceiver mBroadcastReceiver = new BroadcastReceiver(){
    @Override
    public void onReceive(Context context, Intent intent) {
      if (D) Log.d(TAG,"Receiving scanned data from BroaadcastReceiver ");
      ObservableObject.getInstance().updateValue(intent);
    }
  };

  @Override
  public String getName() {
   return "MunBynDataReceiver";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    //  These are the constants available to the caller
    constants.put("SCAN_ACTION", SCAN_ACTION);
    constants.put("BARCODE_READ_SUCCESS", BARCODE_READ_SUCCESS);
    constants.put("BARCODE_READ_FAIL", BARCODE_READ_FAIL);
    return constants;
  }

  @ReactMethod
  public void startReceiver() {
    if (D) Log.d(TAG,"Registering MunByn Data Receiver ");
    this.mReactContext.registerReceiver(mBroadcastReceiver, new IntentFilter(SCAN_ACTION));
  }

  @Override
  public void onHostResume() {
    if (D) Log.d(TAG,"Registering MunByn Data Receiver ");
    this.mReactContext.registerReceiver(mBroadcastReceiver, new IntentFilter(SCAN_ACTION));
  }

  @Override
  public void onHostPause() {
    if (D) Log.d(TAG,"Unregistering MunByn Data Receiver");
    this.mReactContext.unregisterReceiver(mBroadcastReceiver);
  }

  @Override
  public void onHostDestroy() {
    // Activity `onDestroy`
    if (D) Log.d(TAG, "Host Destroy");
  }

  //  http://stackoverflow.com/questions/28083430/communication-between-broadcastreceiver-and-activity-android#30964385
  @Override
  public void update(Observable observable, Object content) {
    Intent intent = (Intent)content;
    String action = intent.getAction();
    if (intent.getAction().equals(SCAN_ACTION)) {
      byte[] barocode = intent.getByteArrayExtra("barocode");
      int barocodelen = intent.getIntExtra("length", 0);
      byte temp = intent.getByteExtra("barcodeType", (byte) 0);
      byte[] aimid = intent.getByteArrayExtra("aimid");
      String data = new String(barocode, 0, barocodelen);

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

  //  Sending events to JavaScript as defined in the native-modules documentation.
  //  Note: Callbacks can only be invoked a single time so are not a suitable interface for barcode scans.
  private void sendEvent(ReactContext reactContext,String eventName,WritableMap params) {
      reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, params);
  }
}
