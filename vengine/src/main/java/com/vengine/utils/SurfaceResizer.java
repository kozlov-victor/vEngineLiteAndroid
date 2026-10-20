package com.vengine.utils;

import android.os.Handler;
import android.os.Looper;
import android.view.ViewGroup;

import com.vengine.engine.VEngine;


public class SurfaceResizer {

    public void setWidth(final int width){
        setSize(width,-1);
    }

    public int getWidth() {
        return VEngine.surfaceView.getWidth();
    }

    public void setHeight(final int height){
        setSize(-1,height);
    }

    public void setSize(final int width, final int height){
        new Handler(Looper.getMainLooper()).post(()->{
            ViewGroup.LayoutParams params = VEngine.surfaceView.getLayoutParams();
            if (width!=-1) params.width = width;
            if (height!=-1) params.height = height;
            VEngine.surfaceView.setLayoutParams(params);
        });
    }

    public int getHeight() {
        return VEngine.surfaceView.getHeight();
    }

}