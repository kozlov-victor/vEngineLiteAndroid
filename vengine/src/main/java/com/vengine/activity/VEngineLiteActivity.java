package com.vengine.activity;

import android.content.pm.ActivityInfo;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.DisplayMetrics;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.vengine.R;
import com.vengine.engine.VEngine;
import com.vengine.utils.Logger;

import java.util.Objects;

public class VEngineLiteActivity extends AppCompatActivity implements View.OnTouchListener {

    private FrameLayout frameLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        Logger.info("----activity on create------------");
        super.onCreate(savedInstanceState);
        VEngine.setActivity(this);
        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);

        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setContentView(R.layout.activity_main);
        VEngine.surfaceView = findViewById(R.id.engine_gl_surface_view);
        DisplayMetrics metrics = Objects.requireNonNull(VEngine.getContext()).getResources().getDisplayMetrics();
        int widthPixels = metrics.widthPixels;
        int heightPixels = metrics.heightPixels;
        int min = Math.min(widthPixels, heightPixels);
        VEngine.surfaceResizer.setSize(min,min);
        FrameLayout frameLayout = findViewById(R.id.engine_gl_frame_view);
        frameLayout.setOnTouchListener(this);
        this.frameLayout = frameLayout;
    }

    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        VEngine.engineGLRenderer.requestResize();
    }

    @Override
    public boolean onTouch(View view, MotionEvent motionEvent) {
        VEngine.touchSurfaceDelegate.onTouch(motionEvent);
        return true;
    }

    public FrameLayout getFrameLayout() {
        return frameLayout;
    }

    @Override
    protected void onDestroy() {
        Logger.info("----activity on destroy------------");
        super.onDestroy();
        VEngine.dispose();
        VEngine.setActivity(null);
    }
}
