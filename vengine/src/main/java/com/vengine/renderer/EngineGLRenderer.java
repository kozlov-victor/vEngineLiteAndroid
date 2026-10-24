package com.vengine.renderer;

import android.opengl.GLSurfaceView;
import android.util.DisplayMetrics;

import com.vengine.engine.VEngineSetup;
import com.vengine.utils.FPSCounter;
import com.vengine.model.JsCompilationResult;
import com.vengine.utils.Logger;
import com.vengine.engine.VEngine;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

public class EngineGLRenderer implements GLSurfaceView.Renderer {

    private final FPSCounter fpsCounter = new FPSCounter();
    private boolean surfaceAlreadyCreated = false;
    private volatile boolean resizeRequested = false;

    private void compileScriptFromLocalUrl(String assetUrl) {
        JsCompilationResult result = VEngine.compileScriptFromLocalUrl(assetUrl);
        if (!result.isSuccess()) {
            VEngine.dispose();
            throw new RuntimeException("js error: \n"+result.getError());
        }
    }

    private void compileInlineScript(String script) {
        JsCompilationResult result = VEngine.compileScript("<inline>",script);
        if (!result.isSuccess()) {
            VEngine.dispose();
            throw new RuntimeException("js error: "+result.getError());
        }
    }

    private void applyScreenSize() {
        var context = VEngine.getContext();
        if (context==null) return;
        DisplayMetrics metrics = context.getResources().getDisplayMetrics();
        int widthPixels = metrics.widthPixels;
        int heightPixels = metrics.heightPixels;
        compileInlineScript("innerWidth = "+widthPixels+";innerHeight = "+heightPixels+";");
    }

    public void requestResize() {
        this.resizeRequested = true;
    }

    @Override
    public void onSurfaceCreated(GL10 gl10, EGLConfig eglConfig) {
        Logger.info("------renderer on surface created----------" + this);
        if (surfaceAlreadyCreated) {
            // gl context was lost -> we can't handle that yet
            // generate contextlost event in JS?
            Logger.error("GL context lost. Cannot restore. Exiting.");
            VEngine.dispose();
            System.exit(0);
        }
        VEngine.initV8();
        applyScreenSize();
        compileScriptFromLocalUrl("bootstrap.js");
        var result = VEngine.initGlobalHandlers();
        if (!result.isSuccess()) {
            VEngine.dispose();
            throw new RuntimeException("initGlobalHandlers error: \n"+result.getError());
        }

        var activity = VEngine.getActivity();
        if (activity!=null) {
            var assetsLoaderListener = VEngineSetup.getOnAssetsLoaderListener();
            assetsLoaderListener.run();
        }
        surfaceAlreadyCreated = true;
    }

    @Override
    public void onSurfaceChanged(GL10 gl10, int i, int i1) {}

    @Override
    public void onDrawFrame(GL10 gl10) {
        VEngine.updateFrame();
        if (resizeRequested) {
            var context = VEngine.getContext();
            if (context==null) return;
            DisplayMetrics metrics = context.getResources().getDisplayMetrics();
            int widthPixels = metrics.widthPixels;
            int heightPixels = metrics.heightPixels;
            VEngine.onResize(widthPixels, heightPixels);
            resizeRequested = false;
        }
        VEngine.touchSurfaceDelegate.updateFrame();
        fpsCounter.updateFrame();
    }
}