package com.vengine.assets.provider;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;

import com.vengine.engine.VEngine;

import java.io.IOException;
import java.io.InputStream;
import java.nio.ByteBuffer;

public class LocalAssetsProvider extends AbstractAccessProvider {

    @Override
    public Bitmap loadBitmap(String fileName) {
        fileName = processLocalUrl(fileName);
        if (fileName.startsWith("data:image") && fileName.contains(",")) {
            return convertString64ToImage(fileName.split(",")[1]);
        }
        else {
            var context = VEngine.getContext();
            if (context==null) return null;
            try(InputStream inputStream = context.getAssets().open(fileName)) {
                return BitmapFactory.decodeStream(inputStream);
            } catch (IOException e) {
                e.printStackTrace();
                return null;
            }
        }
    }

    @Override
    public String loadString(String fileName) {
        fileName = processLocalUrl(fileName);
        var context = VEngine.getContext();
        if (context==null) return null;
        try {
            return loadString(context.getAssets().open(fileName));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ByteBuffer loadBinary(String fileName) {
        fileName = processLocalUrl(fileName);
        var context = VEngine.getContext();
        if (context==null) return null;
        try {
            return loadBinary(context.getAssets().open(fileName));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private String processLocalUrl(String url){
        if (url.startsWith("./")) url = url.replace("./","");
        if (url.contains("?")) url = url.split("\\?")[0];
        return url;
    }

    private Bitmap convertString64ToImage(String base64String) {
        byte[] decodedString = Base64.decode(base64String, Base64.DEFAULT);
        return BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
    }

}
