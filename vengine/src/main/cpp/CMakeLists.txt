
cmake_minimum_required(VERSION 3.4.1)

project("vengine")
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)


message(STATUS "----------------------------------------")
message(STATUS "C++ standard: ${CMAKE_CXX_STANDARD}")
message(STATUS "C++ compiler: ${CMAKE_CXX_COMPILER}")
message(STATUS "C++ compiler version: ${CMAKE_CXX_COMPILER_VERSION}")
message(STATUS "----------------------------------------")

# V8 monolithic static library
add_library(v8_monolith STATIC IMPORTED)

set_target_properties(v8_monolith PROPERTIES
        IMPORTED_LOCATION
        "${CMAKE_CURRENT_SOURCE_DIR}/libs/${ANDROID_ABI}/libv8_monolith.a"
)

# Native Android library
add_library(
        ${CMAKE_PROJECT_NAME}
        SHARED
        native-lib.cpp
        app/js/Js.cpp
        app/logger/Logger.cpp
        app/console/Console.cpp
        app/gl/GlFields.cpp
        app/gl/GlFunctions.cpp
        app/external_functions/ExternalFunctions.cpp
        app/js_compilation_result/JsCompilationResult.cpp
        app/misc/misc.cpp
        app/misc/fun.hpp
)

target_compile_definitions(
        ${CMAKE_PROJECT_NAME} PRIVATE
        V8_COMPRESS_POINTERS
)

# V8 headers
target_include_directories(
        ${CMAKE_PROJECT_NAME}
        PRIVATE
        "${CMAKE_CURRENT_SOURCE_DIR}"
        "${CMAKE_CURRENT_SOURCE_DIR}/include"
)

# Link libraries
target_link_libraries(
        ${CMAKE_PROJECT_NAME}
        v8_monolith
        EGL
        GLESv2
        log
        android
        dl
        m
)

if(ANDROID AND ANDROID_ABI STREQUAL "arm64-v8a" OR ANDROID_ABI STREQUAL "x86_64")
    target_link_options(vengine PRIVATE
            "-Wl,-wrap,calloc"
            "-Wl,-wrap,free"
            "-Wl,-wrap,malloc"
            "-Wl,-wrap,memalign"
            "-Wl,-wrap,posix_memalign"
            "-Wl,-wrap,pvalloc"
            "-Wl,-wrap,realloc"
            "-Wl,-wrap,valloc"
            "-Wl,-wrap,malloc_usable_size"
            "-Wl,-wrap,realpath"
            "-Wl,-wrap,strdup"
            "-Wl,-wrap,strndup"
            "-Wl,-wrap,getcwd"
            "-Wl,-wrap,asprintf"
            "-Wl,-wrap,vasprintf"
    )
endif()