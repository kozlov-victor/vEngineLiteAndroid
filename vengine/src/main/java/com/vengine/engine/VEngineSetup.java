package com.vengine.engine;

import com.vengine.assets.OnAssetsLoaderListener;
import com.vengine.model.JsCompilationResult;

public class VEngineSetup {

    private static OnAssetsLoaderListener onAssetsLoaderListener = () -> {};

    public static void onLoadAssets(OnAssetsLoaderListener listener) {
        onAssetsLoaderListener = listener;
    }

    public static void setRemoteBaseUrl(String remoteBaseUrl) {
        VEngine.assets.setRemoteBaseUrl(remoteBaseUrl);
    }

    public static JsCompilationResult compileScriptFromUrl(String url) {
        return VEngine.compileScriptFromUrl(url);
    }

    public static OnAssetsLoaderListener getOnAssetsLoaderListener() {
        return onAssetsLoaderListener;
    }

}
