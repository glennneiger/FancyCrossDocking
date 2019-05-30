package com.fancycrossdocking;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.horcrux.svg.SvgPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import org.reactnative.camera.RNCameraPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.darryncampbell.rndatawedgeintents.RNDataWedgeIntentsPackage;

import java.util.Arrays;
import java.util.List;

import android.widget.Toast;
import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import android.util.Log;
import com.reactnativecommunity.viewpager.RNCViewPagerPackage;
import com.rnfs.RNFSPackage;

import com.fancycrossdocking.module.HoneywellDataReceiverPackage;
import com.fancycrossdocking.module.MunBynDataReceiverPackage;

public class MainApplication extends Application implements ReactApplication {
  private static final String autoImportDir = "/enterprise/device/settings/datawedge/autoimport/";
  private static final String temp = "datawedge.tmp";
  private static final String finale = "datawedge.db";

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        new SvgPackage(),
        new AsyncStoragePackage(),
        new RNCameraPackage(),
        new RNSoundPackage(),
        new RNDataWedgeIntentsPackage(),
        new RNCViewPagerPackage(),
        new RNFSPackage(),
        new HoneywellDataReceiverPackage(),
        new MunBynDataReceiverPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initApp();
  }

  public void initApp(){
    File outputDirectory = new File(autoImportDir);
    File outputFile = new File(outputDirectory, temp);
    File finalFile = new File(outputDirectory, finale);
    try {
        InputStream is = getResources().openRawResource(R.raw.datawedge);
        copy(is, outputFile);
    } catch (Exception e) {
      Toast.makeText(getApplicationContext(), "Unable to install datawedge profile", Toast.LENGTH_LONG ).show();
      Log.d("Warning", "Unable to install datawedge profile", e);
    } finally {
      outputFile.setExecutable(true, false);
      outputFile.setReadable(true, false);
      outputFile.setWritable(true, false);
      if(outputFile.renameTo(finalFile)){
        //Toast.makeText(getApplicationContext(), "Wedge Profile Loaded!", Toast.LENGTH_LONG ).show();
      }else{
        Toast.makeText(getApplicationContext(), "Wedge Profile NOT Loaded!", Toast.LENGTH_LONG ).show();
      }
    }
  }

  public static void copy(InputStream in, File dst) throws IOException {
    OutputStream out = new FileOutputStream(dst);
    // Transfer bytes from in to out
    byte[] buf = new byte[1024];
    int len;
    while ((len = in.read(buf)) > 0) {
        out.write(buf, 0, len);
    }
    out.flush();
    in.close();
    out.close();
  }
}
