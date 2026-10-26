#include <jni.h>
#include <GLES2/gl2.h>
#include <v8-version-string.h>
#include "app/v_engine/v_engine.h"
#include "app/logger/Logger.h"
#include "app/misc/android/misc.h"
#include "app/bootstrap/bootstrap.hpp"

VEngine* vEngine;


extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_engine_VEngine_initV8(JNIEnv *env, jclass clazz, jint screen_width,
                                       jint screen_height) {
    vEngine = new VEngine(env);
    vEngine->initV8(screen_width, screen_height);
}

extern "C"
JNIEXPORT jobject JNICALL
Java_com_vengine_engine_VEngine_compileScript(JNIEnv *env, jclass clazz, jstring file_name,
                                                jstring source) {

    JsCompilationResult result =
            vEngine->compileScript(
                    jstring2string(env,file_name),
                    jstring2string(env,source)
            );
    jclass cl = env->FindClass("com/vengine/model/JsCompilationResult");
    jmethodID cid = env->GetMethodID(cl, "<init>", "(ZLjava/lang/String;)V");
    return env->NewObject(cl, cid, result.success,env->NewStringUTF(result.error.c_str()));
}

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_engine_VEngine_updateFrame(JNIEnv *env, jclass clazz) {
    if (vEngine == nullptr) {
        return;
    }
    vEngine->updateFrame();
}

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_engine_VEngine_onTouchEvent(JNIEnv *env, jclass clazz, jstring event_name, jfloat x, jfloat y, jint id) {
    if (vEngine == nullptr) {
        return;
    }
    vEngine->onTouchEvent(jstring2string(env,event_name),x,y,id);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_engine_VEngine_onResize(JNIEnv *env, jclass clazz, jint width, jint height) {
    if (vEngine == nullptr) {
        return;
    }
    vEngine->onResize(width, height);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_engine_VEngine_dispose(JNIEnv *env, jclass clazz) {
    if (vEngine == nullptr) {
        return;
    }
    vEngine->dispose();
    delete vEngine;
    vEngine = nullptr;
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_vengine_engine_VEngine_getV8Version(JNIEnv *env, jclass clazz) {
    return env->NewStringUTF(vEngine->getV8Version().c_str());
}