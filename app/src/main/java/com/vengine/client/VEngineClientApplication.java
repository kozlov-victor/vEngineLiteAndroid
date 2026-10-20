package com.vengine.client;

import android.app.Application;

import com.vengine.engine.VEngine;
import com.vengine.engine.VEngineSetup;

public class VEngineClientApplication extends Application {

    @Override
    public void onCreate() {
        super.onCreate();
        VEngineSetup.onLoadAssets(()->{
//        App.assets.setRemoteBaseUrl("http://vakozlov.zzz.com.ua/vEngine2/");
//        compileScriptFromUrl("out/dudeUntitled.js");
            VEngine.compileScriptFromUrl("index.js");
        });
    }
}
