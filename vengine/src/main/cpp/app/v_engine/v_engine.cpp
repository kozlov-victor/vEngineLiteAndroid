#include "v_engine.h"

#include <iostream>
#include <v8-version-string.h>
#include "../bootstrap/bootstrap.hpp"

VEngine::VEngine(void* env):env(env), js(new Js()) {
}

JsCompilationResult VEngine::initV8(const int screenWidth, const int screenHeight) {
    js->initV8();
    js->initGlobalObjects(env);
    js->onResize(screenWidth,screenHeight,false);
    JsCompilationResult result = initBootstrap();
    if (!result.success) return result;
    result = initGlobalHandlers();
    return result;
}

JsCompilationResult VEngine::initGlobalHandlers() {
    bool success = true;
    std::string result;
    if (!js->findFunctionByName("_nextTick",js->nextTickFunction)) {
        success = false;
        result = "no _nextTick function; bootstrap script is wrong";
    }
    else if (!js->findFunctionByName("_triggerEvent", js->triggerEventFunction)) {
        success = false;
        result = "no _triggerEvent function; bootstrap script is wrong";
    }
    return {success,result};
}

JsCompilationResult VEngine::initBootstrap() {
    return compileScript("bootstrap.js", bootstrapJs);
}

std::string VEngine::getV8Version() {
    return V8_VERSION_STRING;
}

JsCompilationResult VEngine::compileScript(std::string fileName, std::string source) {
    return
        js->compileScript(fileName.c_str(),
            source.c_str()
        );
}

void VEngine::updateFrame() const {
    if (js == nullptr) {
        return;
    }
    js->callFunction(js->nextTickFunction);
}

void VEngine::onTouchEvent(std::string eventName, float x, float y, int id) const {
    if (js == nullptr) {
        return;
    }
    js->onTouchEvent(eventName.c_str(),x,y,id);
}

void VEngine::onResize(int width, int height) const {
    if (js == nullptr) {
        return;
    }
    js->onResize(width,height,true);
}

void VEngine::dispose() {
    if (js == nullptr) {
        return;
    }
    delete js;
    js = nullptr;
}
