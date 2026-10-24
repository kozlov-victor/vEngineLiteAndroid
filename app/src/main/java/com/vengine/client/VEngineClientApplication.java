package com.vengine.client;

import android.app.Application;

import com.vengine.engine.VEngineSetup;

public class VEngineClientApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        VEngineSetup.onLoadAssets(()->{
            //VEngineSetup.setRemoteBaseUrl("http://vakozlov.zzz.com.ua/vEngine2/");
            VEngineSetup.compileScriptFromUrl("index.js");
        });
    }
}
