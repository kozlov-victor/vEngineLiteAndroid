package com.vengine.renderer;

import android.content.Context;
import android.opengl.GLSurfaceView;
import android.util.AttributeSet;

import com.vengine.engine.VEngine;

public class EngineGLSurfaceView extends GLSurfaceView {

    public EngineGLSurfaceView(Context context, AttributeSet attributeSet) {
        super(context, attributeSet);
        setEGLContextClientVersion(2);
        setFocusable(true);
        setPreserveEGLContextOnPause(true);
        setRenderer(VEngine.engineGLRenderer);
        setDebugFlags(DEBUG_CHECK_GL_ERROR | DEBUG_LOG_GL_CALLS);
        setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
    }


}