package com.vengine.engine;

import android.app.AlertDialog;
import android.content.Context;
import android.content.pm.ActivityInfo;
import android.graphics.Color;
import android.opengl.GLUtils;

import com.vengine.activity.VEngineLiteActivity;
import com.vengine.assets.Assets;
import com.vengine.model.BitmapInfo;
import com.vengine.model.JsCompilationResult;
import com.vengine.renderer.EngineGLRenderer;
import com.vengine.renderer.EngineGLSurfaceView;
import com.vengine.touch.TouchSurfaceDelegate;
import com.vengine.utils.SurfaceResizer;

import android.widget.FrameLayout;

import androidx.annotation.RestrictTo;

import java.lang.ref.WeakReference;
import java.nio.ByteBuffer;

@RestrictTo(RestrictTo.Scope.LIBRARY)
public class VEngine {

    static {
        System.loadLibrary("vengine");
    }

    public static final EngineGLRenderer engineGLRenderer = new EngineGLRenderer();
    private static WeakReference<VEngineLiteActivity> activityRef;

    public static final TouchSurfaceDelegate touchSurfaceDelegate = new TouchSurfaceDelegate();
    public static EngineGLSurfaceView surfaceView;
    public static final SurfaceResizer surfaceResizer = new SurfaceResizer();
    public static final Assets assets = new Assets();

    public static void setActivity(VEngineLiteActivity activity) {
        if (activity != null) {
            activityRef = new WeakReference<>(activity);
        } else {
            activityRef = null;
        }
    }

    public static VEngineLiteActivity getActivity() {
        return activityRef != null ? activityRef.get() : null;
    }

    public static Context getContext() {
        VEngineLiteActivity activity = getActivity();
        if (activity != null) {
            return activity.getApplicationContext();
        }
        return null;
    }

    public static FrameLayout getLayout() {
        VEngineLiteActivity activity = getActivity();
        if (activity != null) {
            return activity.getFrameLayout();
        }
        return null;
    }

    public static void checkCompilationResult(JsCompilationResult result) {
        if (!result.isSuccess()) {
            VEngine.dispose();
            throw new RuntimeException("js error: \n"+result.getError());
        }
    }

    public static void compileScriptFromUrl(String url) {
        JsCompilationResult result = compileScript(url, VEngine.assets.loadString(url));
        checkCompilationResult(result);
    }

    public static void compileInlineScript(String script) {
        JsCompilationResult result = VEngine.compileScript("<inline>",script);
        checkCompilationResult(result);
    }

    public static native void initV8(int screenWidth, int screenHeight);
    public static native String getV8Version();
    private static native JsCompilationResult compileScript(String fileName, String source);
    public static native void updateFrame();

    public static native void onTouchEvent(String eventName, float x, float y, int id);

    public static native void onResize(int width, int height);

    public static native void dispose();

    @JniAccess
    public static void setSurfaceWidth(int width) {
        VEngine.surfaceResizer.setWidth(width);
    }

    @JniAccess
    public static int getSurfaceWidth() {
        return VEngine.surfaceResizer.getWidth();
    }

    @JniAccess
    public static void setSurfaceHeight(int height) {
        VEngine.surfaceResizer.setHeight(height);
    }

    @JniAccess
    public static int getSurfaceHeight() {
        return VEngine.surfaceResizer.getHeight();
    }

    @JniAccess
    public static BitmapInfo loadBitmap(String fileName) {
        return VEngine.assets.loadBitmap(fileName);
    }

    @JniAccess
    public static String loadString(String fileName) {
        return VEngine.assets.loadString(fileName);
    }

    @JniAccess
    public static ByteBuffer loadBinary(String fileName) {
        return VEngine.assets.loadBinary(fileName);
    }

    @JniAccess
    public static void getBitmap(int target, int level ,int bitmap) {
        GLUtils.texImage2D(target,level, VEngine.assets.getCachedBitmap(bitmap),0);
    }

    @JniAccess
    public static void alert(String msg) {
        VEngineLiteActivity activity = VEngine.getActivity();
        if (activity != null) {
            activity.runOnUiThread(()->{
                new AlertDialog.Builder(activity)
                .setMessage(msg).setPositiveButton("Ok",(dialogInterface, i) -> {
                    dialogInterface.dismiss();
                })
                .create()
                .show();
            });
        }
    }

    public static void setOrientation(boolean landscape) {
        VEngineLiteActivity activity = VEngine.getActivity();
        if (activity != null) {
            activity.runOnUiThread(()->{
                if (landscape) activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
                else activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
            });
        }
    }

    @JniAccess
    public static void setBgColor(String color) {
        VEngineLiteActivity activity = VEngine.getActivity();
        if (activity != null) {
            activity.runOnUiThread(()->{
                FrameLayout layout = VEngine.getLayout();
                if (layout!=null) {
                    layout.setBackgroundColor(Color.parseColor(color));
                }
            });
        }
    }

}
