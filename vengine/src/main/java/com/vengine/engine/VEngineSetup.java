package com.vengine.engine;

import com.vengine.assets.OnAssetsLoaderListener;

public class VEngineSetup {

    private static OnAssetsLoaderListener onAssetsLoaderListener = () -> {};

    public static void onLoadAssets(OnAssetsLoaderListener listener) {
        onAssetsLoaderListener = listener;
    }
    public static OnAssetsLoaderListener getOnAssetsLoaderListener() {
        return onAssetsLoaderListener;
    }

}
