#include <jni.h>
#include <GLES2/gl2.h>
#include <v8-version-string.h>
#include "app/js/Js.h"
#include "app/logger/Logger.h"
#include "app/misc/android/misc.h"
#include "app/bootstrap/bootstrap.hpp"

Js *js;

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_engine_VEngine_initV8(JNIEnv *env, jclass clazz) {
    js = new Js();
    js->initV8();
    js->initGlobalObjects(env);
}

extern "C"
JNIEXPORT jobject JNICALL
Java_com_vengine_engine_VEngine_compileScript(JNIEnv *env, jclass clazz, jstring file_name,
                                                jstring source) {

    JsCompilationResult result =
            js->compileScript(
                    jstring2string(env,file_name).c_str(),
                    jstring2string(env,source).c_str()
            );
    jclass cl = env->FindClass("com/vengine/model/JsCompilationResult");
    jmethodID cid = env->GetMethodID(cl, "<init>", "(ZLjava/lang/String;)V");
    return env->NewObject(cl, cid, result.success,env->NewStringUTF(result.error.c_str()));
}

extern "C"
JNIEXPORT jobject JNICALL
Java_com_vengine_engine_VEngine_initGlobalHandlers(JNIEnv *env, jclass clazz) {
    bool success = true;
    std::string result;
    if (!js->findFunctionByName("_nextTick",js->nextTickFunction)) {
        success = false;
        result = "no _nextTick function; bootstrap.js is wrong";
    }
    else if (!js->findFunctionByName("_triggerEvent", js->triggerEventFunction)) {
        success = false;
        result = "no _triggerEvent function; bootstrap.js is wrong";
    }
    jclass cl = env->FindClass("com/vengine/model/JsCompilationResult");
    jmethodID cid = env->GetMethodID(cl, "<init>", "(ZLjava/lang/String;)V");
    return env->NewObject(cl, cid, success,env->NewStringUTF(result.c_str()));
}

extern "C"
JNIEXPORT jobject JNICALL
Java_com_vengine_engine_VEngine_initBootstrap(JNIEnv *env, jclass clazz) {
    JsCompilationResult result =
            js->compileScript(
                "bootstrap.js",
                bootstrapJs
            );
    jclass cl = env->FindClass("com/vengine/model/JsCompilationResult");
    jmethodID cid = env->GetMethodID(cl, "<init>", "(ZLjava/lang/String;)V");
    return env->NewObject(cl, cid, result.success,env->NewStringUTF(result.error.c_str()));
}

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_engine_VEngine_updateFrame(JNIEnv *env, jclass clazz) {
    if (js == nullptr) {
        return;
    }
    js->callFunction(js->nextTickFunction);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_engine_VEngine_onTouchEvent(JNIEnv *env, jclass clazz, jstring event_name, jfloat x, jfloat y, jint id) {
    if (js == nullptr) {
        return;
    }
    js->onTouchEvent(jstring2string(env,event_name).c_str(),x,y,id);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_engine_VEngine_onResize(JNIEnv *env, jclass clazz, jint width, jint height) {
    if (js == nullptr) {
        return;
    }
    js->onResize(width,height);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_engine_VEngine_dispose(JNIEnv *env, jclass clazz) {
    if (js == nullptr) {
        return;
    }
    delete js;
    js = nullptr;
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_vengine_engine_VEngine_getV8Version(JNIEnv *env, jclass clazz) {
    return env->NewStringUTF(V8_VERSION_STRING);
}