
#ifndef VENGINE_V_ENGINE_H
#define VENGINE_V_ENGINE_H

#include "../js/Js.h"
#include "../js_compilation_result/JsCompilationResult.h"

class VEngine {
private:
    void* env;
public:
    explicit VEngine(void* env);
    JsCompilationResult initV8(int screenWidth, int screenHeight);
    std::string getV8Version();
    JsCompilationResult compileScript(std::string fileName, std::string source);
    void updateFrame() const;
    void onTouchEvent(std::string eventName, float x, float y, int id) const;
    void onResize(int width, int height) const;
    void dispose();

private:
    Js* js{};
    JsCompilationResult initGlobalHandlers();
    JsCompilationResult initBootstrap();
};


#endif