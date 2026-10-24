package com.vengine.engine;

import com.vengine.assets.OnAssetsLoaderListener;

public class VEngineSetup {

    private static OnAssetsLoaderListener onAssetsLoaderListener = () -> {};

    public static void onLoadAssets(OnAssetsLoaderListener listener) {
        onAssetsLoaderListener = listener;
    }

    public static void setRemoteBaseUrl(String remoteBaseUrl) {
        VEngine.assets.setRemoteBaseUrl(remoteBaseUrl);
    }

    public static void compileScriptFromUrl(String url) {
        VEngine.compileScriptFromUrl(url);
    }

    public static OnAssetsLoaderListener getOnAssetsLoaderListener() {
        return onAssetsLoaderListener;
    }

}
