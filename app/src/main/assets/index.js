"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : /* @__PURE__ */ Symbol.for("Symbol." + name);
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __decoratorStart = (base) => [, , , __create(base?.[__knownSymbol("metadata")] ?? null)];
  var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
  var __expectFn = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
  var __decoratorContext = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null)) });
  var __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
  var __runInitializers = (array, flags, self, value) => {
    for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
    return value;
  };
  var __decorateElement = (array, flags, name, decorators, target, extra) => {
    var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
    var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings[k + 5];
    var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
    var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc(k < 4 ? target : { get [name]() {
      return __privateGet(this, extra);
    }, set [name](x) {
      return __privateSet(this, extra, x);
    } }, name));
    k ? p && k < 4 && __name(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name(target, name);
    for (var i = decorators.length - 1; i >= 0; i--) {
      ctx = __decoratorContext(k, name, done = {}, array[3], extraInitializers);
      if (k) {
        ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn(target, x) : (x) => name in x };
        if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet : __privateMethod)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
        if (k > 2) access.set = p ? (x, y) => __privateSet(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
      }
      it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
      if (k ^ 4 || it === void 0) __expectFn(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
      else if (typeof it !== "object" || it === null) __typeError("Object expected");
      else __expectFn(fn = it.get) && (desc.get = fn), __expectFn(fn = it.set) && (desc.set = fn), __expectFn(fn = it.init) && initializers.unshift(fn);
    }
    return k || __decoratorMetadata(array, target), desc && __defProp(target, name, desc), p ? k ^ 4 ? extra : desc : target;
  };
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
  var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

  // define-plugin:virtual:defines
  var BUILD_ID = "1792184712688";

  // src/vEngineLite/utils/FpsCounter.ts
  var FpsCounter = class {
    constructor() {
      this.frameCount = 0;
      this.lastFpsUpdate = 0;
      this.fps = 0;
    }
    update(timestamp) {
      this.frameCount++;
      if (timestamp - this.lastFpsUpdate > 1e3) {
        this.fps = Math.floor(this.frameCount / ((timestamp - this.lastFpsUpdate) / 1e3));
        this.frameCount = 0;
        this.lastFpsUpdate = timestamp;
      }
    }
    getFps() {
      return this.fps;
    }
  };

  // src/vEngineLite/resource/UrlLoader.ts
  var UrlLoader = class _UrlLoader {
    static addUrlParameter(url, param, value) {
      if (url.indexOf("?") > -1) url += "&";
      else url += "?";
      return `${url}${param}=${value}`;
    }
    load(url, responseType, onProgress) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", _UrlLoader.addUrlParameter(url, "BUILD_ID", BUILD_ID), true);
      xhr.responseType = responseType;
      if (xhr.responseType === "blob") {
        xhr.setRequestHeader("Accept-Ranges", "bytes");
        xhr.setRequestHeader("Content-Range", "bytes");
      }
      return new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.response);
            } else {
              reject(url);
            }
          }
        };
        if (onProgress) {
          xhr.onprogress = (e) => {
            if (e.total !== 0) onProgress(e.loaded / e.total);
          };
        }
        xhr.onerror = (e) => {
          console.error(e);
          reject(url);
        };
        xhr.ontimeout = (e) => {
          console.error(e);
          reject(url);
        };
        xhr.send();
      });
    }
  };

  // src/vEngineLite/resource/AssetManager.ts
  var joinUrl = (base, path) => {
    if (!base.endsWith("/")) {
      base += "/";
    }
    if (path.startsWith("/")) {
      path = path.substring(1);
    }
    return base + path;
  };
  var AssetManager = class {
    constructor() {
      this.cache = /* @__PURE__ */ new Map();
      this.manifest = [];
      this.baseUrl = "";
    }
    setBaseUrl(value) {
      this.baseUrl = value;
      return this;
    }
    add(key, type, path) {
      path = joinUrl(this.baseUrl, path);
      this.manifest.push({ key, type, path });
      return this;
    }
    getImage(key) {
      return this.get(key, "image");
    }
    getJson(key) {
      return this.get(key, "json");
    }
    get(key, type) {
      const manifestItem = this.manifest.find((item) => item.key === key);
      if (!manifestItem) {
        throw new Error(`Manifest entry for key "${key}" not found.`);
      }
      if (manifestItem.type !== type) {
        throw new Error(`Asset with key "${key}" has the wrong type. ${type} expected, but ${manifestItem.type} found.}`);
      }
      const asset = this.cache.get(key);
      if (!asset) {
        throw new Error(`Asset with key "${key}" not found.`);
      }
      return asset;
    }
    async load(onProgress, onComplete) {
      if (this.manifest.length === 0) {
        onProgress?.(1);
        onComplete?.();
        return;
      }
      const totalAssets = this.manifest.length;
      let loadedCount = 0;
      const promises = this.manifest.map((item) => {
        let loadPromise;
        switch (item.type) {
          case "image":
            loadPromise = this.loadImage(item.path);
            break;
          case "json":
            loadPromise = this.loadJson(item.path, (n) => {
              const progress = (loadedCount + n) / totalAssets;
              onProgress?.(progress);
            });
            break;
          default:
            throw new Error(`Unknown asset type: ${item.type}`);
        }
        return loadPromise.then((asset) => {
          this.cache.set(item.key, asset);
          loadedCount++;
          const progress = loadedCount / totalAssets;
          onProgress?.(progress);
        });
      });
      await Promise.all(promises);
      onComplete?.();
    }
    loadImage(path) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load image at ${path}`));
        img.src = UrlLoader.addUrlParameter(path, "BUILD_ID", BUILD_ID);
      });
    }
    loadJson(path, onProgress) {
      const loader = new UrlLoader();
      return loader.load(path, "json", onProgress);
    }
  };

  // src/vEngineLite/rendering/Texture.ts
  var Texture = class {
    constructor(glTexture, width, height) {
      this.glTexture = glTexture;
      this.width = width;
      this.height = height;
    }
  };

  // src/vEngineLite/utils/GLUtils.ts
  var GLUtils = class {
    static createAndHoldContext(canvas) {
      const gl = canvas.getContext("webgl");
      if (!gl) throw new Error(`WebGL not supported`);
      this.gl = gl;
    }
    static getContext() {
      return this.gl;
    }
    static createShader(type, source) {
      const gl = this.gl;
      const shader = gl.createShader(type);
      if (!shader) throw new Error(`failed to create shader`);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (success) {
        return shader;
      }
      console.log(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      throw new Error(`failed to compile shader`);
    }
    static createProgram(vertexShader, fragmentShader) {
      const gl = this.gl;
      const program = gl.createProgram();
      if (!program) throw new Error(`failed to create program`);
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      const success = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (success) {
        return program;
      }
      console.log(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      throw new Error(`failed to link program`);
    }
    static setTextureFilters() {
      const gl = this.gl;
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    static createTextureFromImage(image) {
      const gl = this.gl;
      const texture = gl.createTexture();
      if (!texture) {
        throw new Error(`failed to create texture`);
      }
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        // target
        0,
        // level (mipmap level)
        gl.RGBA,
        // internal format
        gl.RGBA,
        // format
        gl.UNSIGNED_BYTE,
        // type
        image
        // source (HTMLElement)
      );
      this.setTextureFilters();
      gl.bindTexture(gl.TEXTURE_2D, null);
      return new Texture(texture, image.width, image.height);
    }
    static createColoredTexture(r, g, b, a = 255) {
      const gl = this.gl;
      const texture = gl.createTexture();
      if (!texture) {
        throw new Error(`failed to create texture`);
      }
      gl.bindTexture(gl.TEXTURE_2D, texture);
      const width = 1;
      const height = 1;
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([r, g, b, a])
      );
      this.setTextureFilters();
      gl.bindTexture(gl.TEXTURE_2D, null);
      return new Texture(texture, width, height);
    }
    static getEmptyTexture() {
      if (!this.emptyTexture) this.emptyTexture = this.createColoredTexture(255, 255, 255);
      return this.emptyTexture;
    }
  };

  // src/vEngineLite/utils/Mat2d.ts
  var Mat2d = class _Mat2d {
    constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
      this.values = [a, b, c, d, tx, ty];
    }
    // Create an identity matrix
    static identity(out = new _Mat2d()) {
      return out.from(1, 0, 0, 1, 0, 0);
    }
    // Create a matrix from Translation, Rotation (radians), Scale, and Pivot
    static fromTRS(x, y, angle, scaleX, scaleY, pivotX, pivotY, out = new _Mat2d()) {
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);
      const a = cos * scaleX;
      const b = sin * scaleX;
      const c = -sin * scaleY;
      const d = cos * scaleY;
      const tx = x - (pivotX * a + pivotY * c);
      const ty = y - (pivotX * b + pivotY * d);
      return out.from(a, b, c, d, tx, ty);
    }
    static fromTranslation(x, y, out = new _Mat2d()) {
      return out.from(
        1,
        0,
        0,
        1,
        x,
        y
      );
    }
    static projection(width, height, out = new _Mat2d()) {
      return out.from(
        2 / width,
        0,
        0,
        -2 / height,
        -1,
        1
      );
    }
    copyFrom(other) {
      this.values[0] = other.values[0];
      this.values[1] = other.values[1];
      this.values[2] = other.values[2];
      this.values[3] = other.values[3];
      this.values[4] = other.values[4];
      this.values[5] = other.values[5];
      return this;
    }
    from(a, b, c, d, tx, ty) {
      this.values[0] = a;
      this.values[1] = b;
      this.values[2] = c;
      this.values[3] = d;
      this.values[4] = tx;
      this.values[5] = ty;
      return this;
    }
    invert(out = new _Mat2d()) {
      const a = this.values[0];
      const b = this.values[1];
      const c = this.values[2];
      const d = this.values[3];
      const tx = this.values[4];
      const ty = this.values[5];
      let det = a * d - b * c;
      if (!det) {
        console.error(this);
        throw new Error(`can not invert the matrix`);
      }
      det = 1 / det;
      out.from(
        d * det,
        -b * det,
        -c * det,
        a * det,
        (c * ty - d * tx) * det,
        (b * tx - a * ty) * det
      );
      return out;
    }
    // Multiply this matrix by another Mat2d
    multiply(other, out = new _Mat2d()) {
      const a1 = this.values[0], b1 = this.values[1], c1 = this.values[2], d1 = this.values[3], tx1 = this.values[4], ty1 = this.values[5];
      const a2 = other.values[0], b2 = other.values[1], c2 = other.values[2], d2 = other.values[3], tx2 = other.values[4], ty2 = other.values[5];
      return out.from(
        a1 * a2 + c1 * b2,
        b1 * a2 + d1 * b2,
        a1 * c2 + c1 * d2,
        b1 * c2 + d1 * d2,
        a1 * tx2 + c1 * ty2 + tx1,
        b1 * tx2 + d1 * ty2 + ty1
      );
    }
    toFloat32Matrix3(out = new Float32Array(9)) {
      const a = this.values[0];
      const b = this.values[1];
      const c = this.values[2];
      const d = this.values[3];
      const tx = this.values[4];
      const ty = this.values[5];
      out[0] = a;
      out[1] = b;
      out[2] = 0;
      out[3] = c;
      out[4] = d;
      out[5] = 0;
      out[6] = tx;
      out[7] = ty;
      out[8] = 1;
      return out;
    }
    transformPoint(x, y, out = [0, 0]) {
      const [a, b, c, d, tx, ty] = this.values;
      out[0] = a * x + c * y + tx;
      out[1] = b * x + d * y + ty;
      return out;
    }
  };

  // src/vEngineLite/rendering/TriangleBatchRenderer.ts
  var TriangleBatchRenderer = class _TriangleBatchRenderer {
    constructor(app2) {
      this.app = app2;
      // vec2 a_position + vec2 a_texCoord + vec4 a_colorTint
      this.currentTriangle = 0;
      this.projMatrix = new Mat2d();
      this.viewMatrix = new Mat2d();
      this.viewProjMatrix = new Mat2d();
      this.point = [0, 0];
      this.triangle = {
        v1: { position: [0, 0], textCoord: [0, 0], colorTint: [0, 0, 0, 0] },
        v2: { position: [0, 0], textCoord: [0, 0], colorTint: [0, 0, 0, 0] },
        v3: { position: [0, 0], textCoord: [0, 0], colorTint: [0, 0, 0, 0] }
      };
      this.viewProjMatrixValues = new Float32Array(9);
      this.vertexData = new Float32Array(
        _TriangleBatchRenderer.TRIANGLES_IN_BATCH * _TriangleBatchRenderer.VERTICES_IN_TRIANGLE * _TriangleBatchRenderer.ATTRIBUTE_ELEMENTS_PER_VERTEX
      );
      this.createProgram();
      this.findAttributeAndUniformLocations();
      this.createVertexBuffer();
      this.updateProjectionMatrix();
    }
    static {
      this.TRIANGLES_IN_BATCH = 8192;
    }
    static {
      this.VERTICES_IN_TRIANGLE = 3;
    }
    static {
      this.VEC2_SIZE = 2;
    }
    static {
      this.VEC4_SIZE = 4;
    }
    static {
      this.ATTRIBUTE_ELEMENTS_PER_VERTEX = this.VEC2_SIZE + this.VEC2_SIZE + this.VEC4_SIZE;
    }
    createProgram() {
      const vertexShaderSource = `
            attribute vec2 a_position;
            attribute vec2 a_texCoord;
            attribute vec4 a_colorTint;

            uniform mat3 u_viewProjection;
            uniform vec2 u_textureSize;

            varying vec2 v_texCoord;
            varying vec4 v_colorTint;

            void main() {
                // \u041C\u043D\u043E\u0436\u0438\u043C\u043E \u0441\u0432\u0456\u0442\u043E\u0432\u0456 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u0438 \u043D\u0430 \u043C\u0430\u0442\u0440\u0438\u0446\u044E \u0432\u0438\u0434\u0443-\u043F\u0440\u043E\u0435\u043A\u0446\u0456\u0457
                vec3 pos = u_viewProjection * vec3(a_position, 1.0);
                gl_Position = vec4(pos.xy, 0.0, 1.0);
                v_texCoord = a_texCoord / u_textureSize;
                v_colorTint = a_colorTint;
            }
        `;
      const fragmentShaderSource = `
            precision mediump float;
            varying vec2 v_texCoord;
            varying vec4 v_colorTint;

            uniform sampler2D u_image;

            void main() {
                vec4 texColor = texture2D(u_image, v_texCoord);
                gl_FragColor = vec4(
                    texColor.rgb * v_colorTint.rgb * v_colorTint.a,
                    texColor.a * v_colorTint.a
                );
            }
        `;
      const gl = GLUtils.getContext();
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      const vertexShader = GLUtils.createShader(gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = GLUtils.createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
      this.program = GLUtils.createProgram(vertexShader, fragmentShader);
    }
    findAttributeAndUniformLocations() {
      const gl = GLUtils.getContext();
      this.positionAttributeLocation = gl.getAttribLocation(this.program, "a_position");
      this.texCoordAttributeLocation = gl.getAttribLocation(this.program, "a_texCoord");
      this.colorTintAttributeLocation = gl.getAttribLocation(this.program, "a_colorTint");
      this.viewProjectionUniformLocation = gl.getUniformLocation(this.program, "u_viewProjection");
      this.textureSizeUniformLocation = gl.getUniformLocation(this.program, "u_textureSize");
    }
    createVertexBuffer() {
      const gl = GLUtils.getContext();
      const vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        throw new Error(`failed to create vertex buffer`);
      }
      this.vertexBuffer = vertexBuffer;
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, this.vertexData.byteLength, gl.DYNAMIC_DRAW);
    }
    updateProjectionMatrix() {
      Mat2d.projection(this.app.size.w, this.app.size.h, this.projMatrix);
    }
    bind() {
      const gl = GLUtils.getContext();
      gl.useProgram(this.program);
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      const float32Size = 4;
      const stride = _TriangleBatchRenderer.ATTRIBUTE_ELEMENTS_PER_VERTEX * float32Size;
      const v2 = _TriangleBatchRenderer.VEC2_SIZE;
      const v4 = _TriangleBatchRenderer.VEC4_SIZE;
      let offset = 0;
      gl.enableVertexAttribArray(this.positionAttributeLocation);
      gl.vertexAttribPointer(this.positionAttributeLocation, v2, gl.FLOAT, false, stride, offset * float32Size);
      offset += v2;
      gl.enableVertexAttribArray(this.texCoordAttributeLocation);
      gl.vertexAttribPointer(this.texCoordAttributeLocation, v2, gl.FLOAT, false, stride, offset * float32Size);
      offset += v2;
      gl.enableVertexAttribArray(this.colorTintAttributeLocation);
      gl.vertexAttribPointer(this.colorTintAttributeLocation, v4, gl.FLOAT, false, stride, offset * float32Size);
    }
    batchVertex(v, worldMatrix, i) {
      const vData = this.vertexData;
      const point = worldMatrix.transformPoint(v.position[0], v.position[1], this.point);
      vData[i] = point[0];
      vData[i + 1] = point[1];
      vData[i + 2] = v.textCoord[0];
      vData[i + 3] = v.textCoord[1];
      vData[i + 4] = v.colorTint[0];
      vData[i + 5] = v.colorTint[1];
      vData[i + 6] = v.colorTint[2];
      vData[i + 7] = v.colorTint[3];
    }
    batchTriangle(triangle, texture, worldMatrix) {
      if (this.currentTriangle === _TriangleBatchRenderer.TRIANGLES_IN_BATCH) {
        this.flush();
      }
      if (this.currentTexture === void 0) this.currentTexture = texture;
      if (this.currentTexture !== texture) {
        this.flush();
        this.currentTexture = texture;
      }
      let i = this.currentTriangle * _TriangleBatchRenderer.VERTICES_IN_TRIANGLE * _TriangleBatchRenderer.ATTRIBUTE_ELEMENTS_PER_VERTEX;
      const size = _TriangleBatchRenderer.ATTRIBUTE_ELEMENTS_PER_VERTEX;
      this.batchVertex(triangle.v1, worldMatrix, i);
      this.batchVertex(triangle.v2, worldMatrix, i + size);
      this.batchVertex(triangle.v3, worldMatrix, i + size * 2);
      this.currentTriangle++;
    }
    batchSprite(size, textureInfo, worldMatrix, x = 0, y = 0) {
      const uv = textureInfo.rect.uv;
      const objWidth = size.w, objHeight = size.h;
      const texFrameWidth = textureInfo.rect.size.w, texFrameHeight = textureInfo.rect.size.h;
      const u = uv.x, v = uv.y;
      const colNorm = textureInfo.color.getNormalized();
      const t = this.triangle;
      t.v1.position[0] = x;
      t.v1.position[1] = y;
      t.v1.textCoord[0] = u;
      t.v1.textCoord[1] = v;
      t.v1.colorTint = colNorm;
      t.v2.position[0] = x + objWidth;
      t.v2.position[1] = y;
      t.v2.textCoord[0] = u + texFrameWidth;
      t.v2.textCoord[1] = v;
      t.v2.colorTint = colNorm;
      t.v3.position[0] = x;
      t.v3.position[1] = y + objHeight;
      t.v3.textCoord[0] = u;
      t.v3.textCoord[1] = v + texFrameHeight;
      t.v3.colorTint = colNorm;
      this.batchTriangle(t, textureInfo.texture, worldMatrix);
      t.v1.position[0] = x;
      t.v1.position[1] = y + objHeight;
      t.v1.textCoord[0] = u;
      t.v1.textCoord[1] = v + texFrameHeight;
      t.v2.position[0] = x + objWidth;
      t.v2.position[1] = y;
      t.v2.textCoord[0] = u + texFrameWidth;
      t.v2.textCoord[1] = v;
      t.v3.position[0] = x + objWidth;
      t.v3.position[1] = y + objHeight;
      t.v3.textCoord[0] = u + texFrameWidth;
      t.v3.textCoord[1] = v + texFrameHeight;
      this.batchTriangle(t, textureInfo.texture, worldMatrix);
    }
    clearRenderBuffer(color) {
      const gl = GLUtils.getContext();
      const normColor = color.getNormalized();
      gl.viewport(0, 0, this.app.viewPort.w, this.app.viewPort.h);
      gl.clearColor(normColor[0], normColor[1], normColor[2], normColor[3]);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }
    updateViewProjectionMatrix() {
      const cameraMatrix = this.app.camera.getWorldMatrix();
      cameraMatrix.invert(this.viewMatrix);
      this.projMatrix.multiply(this.viewMatrix, this.viewProjMatrix);
      this.viewProjMatrix.toFloat32Matrix3(this.viewProjMatrixValues);
    }
    flush() {
      if (this.currentTriangle === 0) return;
      const gl = GLUtils.getContext();
      this.updateViewProjectionMatrix();
      gl.uniformMatrix3fv(this.viewProjectionUniformLocation, false, this.viewProjMatrixValues);
      gl.uniform2f(this.textureSizeUniformLocation, this.currentTexture.width, this.currentTexture.height);
      gl.bindTexture(gl.TEXTURE_2D, this.currentTexture.glTexture);
      const floatCount = this.currentTriangle * _TriangleBatchRenderer.VERTICES_IN_TRIANGLE * _TriangleBatchRenderer.ATTRIBUTE_ELEMENTS_PER_VERTEX;
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertexData.subarray(0, floatCount));
      const vertexCount = this.currentTriangle * _TriangleBatchRenderer.VERTICES_IN_TRIANGLE;
      gl.drawArrays(gl.TRIANGLES, 0, vertexCount);
      this.currentTriangle = 0;
    }
  };

  // src/vEngineLite/utils/Vector2.ts
  var Vector2 = class {
    constructor(x = 0, y = 0, onChange = () => {
    }) {
      this.onChange = onChange;
      this._x = 0;
      this._y = 0;
      this._x = x;
      this._y = y;
    }
    get x() {
      return this._x;
    }
    set x(value) {
      if (this._x === value) return;
      this._x = value;
      this.onChange();
    }
    get u() {
      return this._x;
    }
    set u(value) {
      this.x = value;
    }
    get y() {
      return this._y;
    }
    set y(value) {
      if (this._y === value) return;
      this._y = value;
      this.onChange();
    }
    get v() {
      return this._y;
    }
    set v(value) {
      this.y = value;
    }
    xy(x, y = x) {
      this.x = x;
      this.y = y;
    }
    uv(u, v = u) {
      this.xy(u, v);
    }
    from(other) {
      this.xy(other.x, other.y);
    }
  };

  // src/vEngineLite/components/Transform.ts
  var Transform = class {
    constructor() {
      this._rotation = 0;
      this._dirty = true;
      this.localMatrix = new Mat2d();
      this.worldMatrix = new Mat2d();
      this.children = [];
      const setDirty = () => this.setDirty();
      this.position = new Vector2(0, 0, setDirty);
      this.scale = new Vector2(1, 1, setDirty);
      this.pivot = new Vector2(0, 0, setDirty);
    }
    get rotation() {
      return this._rotation;
    }
    set rotation(value) {
      if (this._rotation === value) return;
      this._rotation = value;
      this.setDirty();
    }
    get parent() {
      return this._parent;
    }
    set parent(newParent) {
      if (this._parent === newParent) return;
      if (this._parent) {
        const index = this._parent.children.indexOf(this);
        if (index > -1) {
          this._parent.children.splice(index, 1);
        }
      }
      this._parent = newParent;
      if (newParent) {
        newParent.children.push(this);
      }
      this.setDirty();
    }
    getWorldMatrix() {
      if (this._dirty) {
        this.updateWorldMatrix();
      }
      return this.worldMatrix;
    }
    setDirty() {
      if (!this._dirty) {
        this._dirty = true;
        for (const child of this.children) {
          child.setDirty();
        }
      }
    }
    updateWorldMatrix(force = false) {
      if (!this._dirty && !force) {
        return;
      }
      Mat2d.fromTRS(
        this.position.x,
        this.position.y,
        this._rotation,
        this.scale.x,
        this.scale.y,
        this.pivot.x,
        this.pivot.y,
        this.localMatrix
      );
      if (this._parent) {
        this._parent.getWorldMatrix().multiply(this.localMatrix, this.worldMatrix);
      } else {
        this.worldMatrix.copyFrom(this.localMatrix);
      }
      this._dirty = false;
      for (const child of this.children) {
        child.updateWorldMatrix(true);
      }
    }
  };

  // src/vEngineLite/camera/Camera.ts
  var Camera = class {
    constructor(app2) {
      this.app = app2;
      this.transform = new Transform();
      this.position = this.transform.position;
      this.scale = this.transform.scale;
      this.pivot = this.transform.pivot;
    }
    getWorldMatrix() {
      return this.transform.getWorldMatrix();
    }
    update(dt) {
      if (this.followTarget && this.followStrategy) {
        this.followStrategy.update(
          this,
          this.followTarget,
          dt
        );
      }
    }
  };

  // src/vEngineLite/physics/CollisionGroupManager.ts
  var CollisionGroup = class {
    constructor(bitMask) {
      this.bitMask = bitMask;
    }
  };
  var CollisionGroupManager = class {
    constructor() {
      this.base = 1;
      this.count = 0;
    }
    nextGroup() {
      if (this.count >= 31) {
        throw new Error("Maximum number of collision categories reached");
      }
      const result = this.base;
      this.base <<= 1;
      this.count++;
      return new CollisionGroup(result);
    }
    static combine(...categories) {
      let result = 0;
      for (const category of categories) {
        result |= category.bitMask;
      }
      return new CollisionGroup(result);
    }
    static {
      this.defaultGroup = new CollisionGroup(1);
    }
    static {
      this.noneGroup = new CollisionGroup(0);
    }
    static getDefaultGroup() {
      return this.defaultGroup;
    }
    static getNoneGroup() {
      return this.noneGroup;
    }
  };

  // src/vEngineLite/physics/IPhysics.ts
  var RigidBody = class {
    constructor(params) {
      if (!params.rect) {
        this.rect = {
          x: 0,
          y: 0,
          width: params.target.size.w,
          height: params.target.size.h
        };
      } else {
        this.rect = { ...params.rect };
      }
      this.target = params.target;
      this.velocity = params.velocity ?? new Vector2();
      this.collisionGroup = params.collisionGroup ?? CollisionGroupManager.getDefaultGroup();
      this.collideWithGroup = params.collideWithGroup ?? CollisionGroupManager.getDefaultGroup();
      this.ignoreCollisionWithGroup = params.ignoreCollisionWithGroup ?? CollisionGroupManager.getNoneGroup();
      this.nonBlockingCollisionWithGroup = params.nonBlockingCollisionWithGroup ?? CollisionGroupManager.getNoneGroup();
      this.restitution = params.restitution ?? 0;
      this.gravityFactor = params.gravityFactor ?? 1;
    }
  };

  // src/vEngineLite/physics/UniformGrid.ts
  var UniformGrid = class {
    constructor(cellSize) {
      this.cellSize = cellSize;
      this.cells = /* @__PURE__ */ new Map();
      this.pairKeys = /* @__PURE__ */ new Set();
      this.pairs = [];
      this.indexedStates = /* @__PURE__ */ new Map();
      this.indexedBodyCount = 0;
      this.inverseCellSize = 1 / cellSize;
    }
    getPotentialPairs(bodies) {
      this.cells.clear();
      this.pairKeys.clear();
      this.pairs.length = 0;
      this.indexedStates.clear();
      this.indexedBodyCount = bodies.length;
      let maxBodyId = 0;
      for (const body of bodies) {
        this.insertBody(body);
        if (body.id > maxBodyId) {
          maxBodyId = body.id;
        }
      }
      const pairStride = maxBodyId + 1;
      const pairs = this.pairs;
      const pairKeys = this.pairKeys;
      this.cells.forEach((column) => {
        column.forEach((cellBodies) => {
          this.collectCellPairs(cellBodies, pairStride, pairKeys, pairs);
        });
      });
      return pairs;
    }
    havePotentialPairsChanged(bodies) {
      if (bodies.length !== this.indexedBodyCount) {
        return true;
      }
      for (const body of bodies) {
        const indexed = this.indexedStates.get(body.id);
        if (!indexed) {
          return true;
        }
        const current = this.getIndexedBodyState(body);
        if (current.minCellX !== indexed.minCellX || current.minCellY !== indexed.minCellY || current.maxCellX !== indexed.maxCellX || current.maxCellY !== indexed.maxCellY || current.type !== indexed.type || current.collisionGroup !== indexed.collisionGroup || current.collideWithGroup !== indexed.collideWithGroup || current.ignoreCollisionWithGroup !== indexed.ignoreCollisionWithGroup || current.nonBlockingCollisionWithGroup !== indexed.nonBlockingCollisionWithGroup) {
          return true;
        }
      }
      return false;
    }
    insertBody(body) {
      const inverseCellSize = this.inverseCellSize;
      const state = this.getIndexedBodyState(body);
      this.indexedStates.set(body.id, state);
      for (let cellX = state.minCellX; cellX <= state.maxCellX; cellX++) {
        for (let cellY = state.minCellY; cellY <= state.maxCellY; cellY++) {
          let column = this.cells.get(cellX);
          if (!column) {
            column = /* @__PURE__ */ new Map();
            this.cells.set(cellX, column);
          }
          let cell = column.get(cellY);
          if (!cell) {
            cell = [];
            column.set(cellY, cell);
          }
          cell.push(body);
        }
      }
    }
    getIndexedBodyState(body) {
      const posX = body.target.position.x + body.rect.x;
      const posY = body.target.position.y + body.rect.y;
      return {
        minCellX: Math.floor(posX * this.inverseCellSize),
        minCellY: Math.floor(posY * this.inverseCellSize),
        maxCellX: Math.floor((posX + body.rect.width) * this.inverseCellSize),
        maxCellY: Math.floor((posY + body.rect.height) * this.inverseCellSize),
        type: body.type,
        collisionGroup: body.collisionGroup.bitMask,
        collideWithGroup: body.collideWithGroup.bitMask,
        ignoreCollisionWithGroup: body.ignoreCollisionWithGroup.bitMask,
        nonBlockingCollisionWithGroup: body.nonBlockingCollisionWithGroup.bitMask
      };
    }
    collectCellPairs(cellBodies, pairStride, pairKeys, pairs) {
      for (let i = 0; i < cellBodies.length; i++) {
        for (let j = i + 1; j < cellBodies.length; j++) {
          const a = cellBodies[i];
          const b = cellBodies[j];
          if (!this.canBodiesSharePair(a, b)) {
            continue;
          }
          const pairKey = this.getPairKey(a, b, pairStride);
          if (pairKeys.has(pairKey)) {
            continue;
          }
          pairKeys.add(pairKey);
          pairs.push([a, b]);
        }
      }
    }
    canBodiesSharePair(a, b) {
      if (a.type !== 1 /* DYNAMIC */ && b.type !== 1 /* DYNAMIC */) {
        return false;
      }
      const aCollisionGroup = a.collisionGroup.bitMask;
      const bCollisionGroup = b.collisionGroup.bitMask;
      const ignored = (aCollisionGroup & b.ignoreCollisionWithGroup.bitMask) !== 0 || (bCollisionGroup & a.ignoreCollisionWithGroup.bitMask) !== 0;
      if (ignored) {
        return false;
      }
      return (aCollisionGroup & b.collideWithGroup.bitMask) !== 0 || (bCollisionGroup & a.collideWithGroup.bitMask) !== 0 || (aCollisionGroup & b.nonBlockingCollisionWithGroup.bitMask) !== 0 || (bCollisionGroup & a.nonBlockingCollisionWithGroup.bitMask) !== 0;
    }
    getPairKey(a, b, stride) {
      const minId = a.id < b.id ? a.id : b.id;
      const maxId = a.id < b.id ? b.id : a.id;
      return minId * stride + maxId;
    }
  };

  // src/vEngineLite/physics/ArcadePhysics.ts
  var ArcadeRigidBody = class extends RigidBody {
    // px/s²
    constructor(params, id) {
      super(params);
      this.frameMovement = new Vector2();
      this.id = id;
      this.type = params.type;
      this.mass = params.mass ?? 1;
      this.friction = params.friction ?? 800;
    }
    onGround() {
      return this.support !== void 0;
    }
    jump(v0) {
      this.velocity.y = v0;
      this.support = void 0;
    }
  };
  var cachedNormal = new Vector2();
  var ArcadePhysics = class {
    constructor() {
      this.gravity = 300;
      this.nextId = 0;
      this.carried = /* @__PURE__ */ new Set();
      this.collisionEvents = /* @__PURE__ */ new Set();
      this.uniformGrid = new UniformGrid(128);
      this.allRigidBodies = [];
    }
    createRigidBody(params) {
      return new ArcadeRigidBody(params, this.nextId++);
    }
    updateBody(body, _dt) {
      const arcadeRigidBody = body;
      this.allRigidBodies.push(arcadeRigidBody);
    }
    prepareWorld(dt) {
      this.allRigidBodies.length = 0;
    }
    updateWorld(dt) {
      const carried = this.carried;
      this.collisionEvents.clear();
      const bodies = this.allRigidBodies;
      const substepCount = this.getSubstepCount(bodies, dt);
      const substepDt = dt / substepCount;
      for (let substep = 0; substep < substepCount; substep++) {
        for (const body of bodies) {
          this.integratePhysics(body, substepDt);
        }
        carried.clear();
        for (const body of bodies) {
          this.applySupportMovement(body, carried);
        }
        for (const body of bodies) {
          body.support = void 0;
        }
        const SOLVER_ITERATIONS = 4;
        let pairs = this.uniformGrid.getPotentialPairs(bodies);
        for (let iteration = 0; iteration < SOLVER_ITERATIONS; iteration++) {
          if (iteration > 0 && this.uniformGrid.havePotentialPairsChanged(bodies)) {
            pairs = this.uniformGrid.getPotentialPairs(bodies);
          }
          let solverChanged = false;
          for (const body of bodies) {
            body.support = void 0;
          }
          for (const [a, b] of pairs) {
            const collision = this.detectCollision(a, b);
            if (!collision) continue;
            solverChanged = this.resolveCollision(a, b, collision) || solverChanged;
            const pairKey = this.getCollisionPairKey(a, b);
            if (!this.collisionEvents.has(pairKey)) {
              this.collisionEvents.add(pairKey);
              a.onCollided?.(b);
              b.onCollided?.(a);
              solverChanged = true;
            }
            this.resolveSupport(a, b, collision);
          }
          if (!solverChanged) {
            break;
          }
        }
      }
      for (const body of bodies) {
        this.applyFriction(body, dt);
      }
    }
    getCollisionPairKey(a, b) {
      return a.id < b.id ? `${a.id}:${b.id}` : `${b.id}:${a.id}`;
    }
    getSubstepCount(bodies, dt) {
      let minimumExtent = Number.POSITIVE_INFINITY;
      let maximumMovement = 0;
      const seconds = dt / 1e3;
      for (const body of bodies) {
        if (body.rect.width <= 0 || body.rect.height <= 0) {
          continue;
        }
        minimumExtent = Math.min(
          minimumExtent,
          body.rect.width,
          body.rect.height
        );
        if (body.type === 0 /* STATIC */) {
          continue;
        }
        const velocityY = body.velocity.y + (body.type === 1 /* DYNAMIC */ ? this.gravity * body.gravityFactor * seconds : 0);
        maximumMovement = Math.max(
          maximumMovement,
          Math.abs(body.velocity.x * seconds),
          Math.abs(velocityY * seconds)
        );
      }
      if (!Number.isFinite(minimumExtent) || minimumExtent <= 0) {
        return 1;
      }
      return Math.max(1, Math.ceil(maximumMovement / (minimumExtent * 0.5)));
    }
    detectCollision(a, b) {
      const aPos = a.target.position;
      const aLeft = aPos.x + a.rect.x;
      const aRight = aLeft + a.rect.width;
      const aTop = aPos.y + a.rect.y;
      const aBottom = aTop + a.rect.height;
      const bPos = b.target.position;
      const bLeft = bPos.x + b.rect.x;
      const bRight = bLeft + b.rect.width;
      const bTop = bPos.y + b.rect.y;
      const bBottom = bTop + b.rect.height;
      const aCenterX = (aLeft + aRight) * 0.5;
      const bCenterX = (bLeft + bRight) * 0.5;
      const aCenterY = (aTop + aBottom) * 0.5;
      const bCenterY = (bTop + bBottom) * 0.5;
      const overlapX = Math.min(aRight, bRight) - Math.max(aLeft, bLeft);
      const overlapY = Math.min(aBottom, bBottom) - Math.max(aTop, bTop);
      if (overlapX <= 0 || overlapY <= 0) {
        return null;
      }
      if (overlapX < overlapY) {
        if (aCenterX < bCenterX) {
          cachedNormal.xy(-1, 0);
          return {
            normal: cachedNormal,
            depth: overlapX
          };
        } else {
          cachedNormal.xy(1, 0);
          return {
            normal: cachedNormal,
            depth: overlapX
          };
        }
      }
      if (aCenterY < bCenterY) {
        cachedNormal.xy(0, -1);
        return {
          normal: cachedNormal,
          depth: overlapY
        };
      } else {
        cachedNormal.xy(0, 1);
        return {
          normal: cachedNormal,
          depth: overlapY
        };
      }
    }
    integratePhysics(body, dt) {
      const seconds = dt / 1e3;
      body.frameMovement.xy(0, 0);
      if (body.type === 0 /* STATIC */) {
        return;
      }
      if (body.type === 1 /* DYNAMIC */) {
        body.velocity.y += this.gravity * body.gravityFactor * seconds;
      }
      const dx = body.velocity.x * seconds;
      const dy = body.velocity.y * seconds;
      body.target.position.x += dx;
      body.target.position.y += dy;
      body.frameMovement.xy(dx, dy);
    }
    resolveSupport(a, b, collision) {
      const { normal } = collision;
      if (normal.y === -1 && a.type === 1 /* DYNAMIC */) {
        a.support = b;
      }
      if (normal.y === 1 && b.type === 1 /* DYNAMIC */) {
        b.support = a;
      }
    }
    applyFriction(body, dt) {
      if (body.type !== 1 /* DYNAMIC */) {
        return;
      }
      if (!body.support) {
        return;
      }
      const seconds = dt / 1e3;
      const frictionDelta = body.friction * seconds;
      if (body.velocity.x > 0) {
        body.velocity.x = Math.max(
          0,
          body.velocity.x - frictionDelta
        );
      } else if (body.velocity.x < 0) {
        body.velocity.x = Math.min(
          0,
          body.velocity.x + frictionDelta
        );
      }
    }
    getInverseMass(body) {
      if (body.type !== 1 /* DYNAMIC */) {
        return 0;
      }
      if (body.mass <= 0) {
        throw new Error(
          "Dynamic rigid body must have mass > 0"
        );
      }
      return 1 / body.mass;
    }
    resolveCollision(a, b, collision) {
      if (this.isNonBlockingCollision(a, b)) {
        return false;
      }
      const { normal, depth } = collision;
      const invMassA = this.getInverseMass(a);
      const invMassB = this.getInverseMass(b);
      const invMassSum = invMassA + invMassB;
      const SLOP = 1e-3;
      const PERCENT = 0.8;
      const correctionDepth = Math.max(depth - SLOP, 0) * PERCENT;
      const correction = correctionDepth / invMassSum;
      a.target.position.x += normal.x * correction * invMassA;
      a.target.position.y += normal.y * correction * invMassA;
      b.target.position.x -= normal.x * correction * invMassB;
      b.target.position.y -= normal.y * correction * invMassB;
      const positionChanged = correctionDepth > 0;
      const relativeVelocityX = a.velocity.x - b.velocity.x;
      const relativeVelocityY = a.velocity.y - b.velocity.y;
      const velocityAlongNormal = relativeVelocityX * normal.x + relativeVelocityY * normal.y;
      if (velocityAlongNormal >= 0) {
        return positionChanged;
      }
      const restitution = (a.restitution + b.restitution) / 2;
      const impulseMagnitude = -(1 + restitution) * velocityAlongNormal / invMassSum;
      const impulseX = normal.x * impulseMagnitude;
      const impulseY = normal.y * impulseMagnitude;
      a.velocity.x += impulseX * invMassA;
      a.velocity.y += impulseY * invMassA;
      b.velocity.x -= impulseX * invMassB;
      b.velocity.y -= impulseY * invMassB;
      return true;
    }
    isNonBlockingCollision(a, b) {
      return (a.collisionGroup.bitMask & b.nonBlockingCollisionWithGroup.bitMask) !== 0 || (b.collisionGroup.bitMask & a.nonBlockingCollisionWithGroup.bitMask) !== 0;
    }
    applySupportMovement(body, carried) {
      if (body.type !== 1 /* DYNAMIC */) {
        return;
      }
      if (!body.support) {
        return;
      }
      if (carried.has(body.id)) {
        return;
      }
      carried.add(body.id);
      this.applySupportMovement(
        body.support,
        carried
      );
      const dx = body.support.frameMovement.x;
      const dy = body.support.frameMovement.y;
      body.target.position.x += dx;
      body.target.position.y += dy;
      body.frameMovement.x += dx;
      body.frameMovement.y += dy;
    }
  };

  // src/vEngineLite/utils/ObservableEntity.ts
  var ObservableEntity = class {
    constructor() {
      this.callbacks = [];
    }
    onChange(cb) {
      this.callbacks.push(cb);
      return cb;
    }
    offChange(cb) {
      this.callbacks.splice(this.callbacks.indexOf(cb), 1);
    }
    notifyChange() {
      for (const callback of this.callbacks) {
        callback();
      }
    }
  };

  // src/vEngineLite/utils/Size.ts
  var Size = class extends ObservableEntity {
    constructor(w = 0, h = w) {
      super();
      this._w = w;
      this._h = h;
    }
    set w(val) {
      this._w = val;
      this.notifyChange();
    }
    get w() {
      return this._w;
    }
    set h(val) {
      this._h = val;
      this.notifyChange();
    }
    get h() {
      return this._h;
    }
    wh(width, height = width) {
      this._w = width;
      this._h = height;
      this.notifyChange();
    }
    from(other) {
      this.wh(other.w, other.h);
      return this;
    }
  };

  // src/vEngineLite/rendering/scaleStrategy/AbstractScaleStrategy.ts
  var AbstractScaleStrategy = class {
    getScreenResolution() {
      return new Size(window.innerWidth, window.innerHeight);
    }
  };

  // src/vEngineLite/rendering/scaleStrategy/NoopScaleStrategy.ts
  var NoopScaleStrategy = class extends AbstractScaleStrategy {
    onResize(app2, container) {
      app2.viewPort.from(app2.size);
    }
  };

  // src/vEngineLite/application/VEngineLiteApplication.ts
  var VEngineLiteApplication = class {
    constructor(canvas, size, scaleStrategy = new NoopScaleStrategy()) {
      this.canvas = canvas;
      this.size = size;
      this.fpsCounter = new FpsCounter();
      this.assetManager = new AssetManager();
      this.camera = new Camera(this);
      this.physics = new ArcadePhysics();
      this.viewPort = new Size();
      this.running = false;
      this.FIXED_STEP = 1e3 / 60;
      this.MAX_DELTA = 250;
      this.MAX_STEPS = 10;
      this.accumulator = 0;
      GLUtils.createAndHoldContext(canvas);
      canvas.width = size.w;
      canvas.height = size.h;
      this.listenToResize(scaleStrategy);
      this.renderer = new TriangleBatchRenderer(this);
      this.renderer.bind();
    }
    runAppIfNotRunning() {
      if (this.running) return;
      this.running = true;
      const step = (timestamp) => {
        this.fpsCounter.update(timestamp);
        let delta = timestamp - this.lastTime;
        this.lastTime = timestamp;
        delta = Math.min(delta, this.MAX_DELTA);
        this.accumulator += delta;
        let stepCount = 0;
        while (this.accumulator >= this.FIXED_STEP && stepCount < this.MAX_STEPS) {
          this.onNextUpdate(this.FIXED_STEP);
          this.accumulator -= this.FIXED_STEP;
          stepCount++;
        }
        if (stepCount === this.MAX_STEPS) {
          this.accumulator = 0;
        }
        this.scene.render();
        requestAnimationFrame(step);
      };
      this.lastTime = performance.now();
      requestAnimationFrame(step);
    }
    listenToResize(scaleStrategy) {
      window.addEventListener("resize", () => {
        scaleStrategy.onResize(this, this.canvas);
      });
      scaleStrategy.onResize(this, this.canvas);
    }
    onNextUpdate(dt) {
      this.scene.onUpdate(dt);
      this.scene.input.keyboard.update(dt);
    }
    runScene(scene) {
      if (this.scene) this.scene.input.keyboard.stop();
      scene.input.keyboard.start();
      this.scene = scene;
      this.runAppIfNotRunning();
      scene.onPreloadStarted();
      this.assetManager.load((progress) => scene.onProgress(progress)).then(() => scene.onReady()).catch((e) => {
        console.error(e);
      });
    }
    getTime() {
      return this.lastTime;
    }
    getCurrentScene() {
      return this.scene;
    }
  };

  // src/vEngineLite/rendering/scaleStrategy/ScaleHelper.ts
  var ScaleHelper = class {
    static calcMetrixToFitRectToWindow(rect, window2) {
      const rectRatio = rect.h / rect.w;
      const windowRatio = window2.h / window2.w;
      let width;
      let height;
      if (windowRatio < rectRatio) {
        height = window2.h;
        width = height / rectRatio;
      } else {
        width = window2.w;
        height = width * rectRatio;
      }
      return {
        scale: new Vector2(width / rect.w, height / rect.h),
        pos: new Vector2((window2.w - width) / 2, (window2.h - height) / 2),
        size: new Size(width, height)
      };
    }
  };

  // src/vEngineLite/rendering/scaleStrategy/ScaleStrategyFitCanvasToScreen.ts
  var ScaleStrategyFitCanvasToScreen = class extends AbstractScaleStrategy {
    onResize(app2, container) {
      const screenResolution = this.getScreenResolution();
      const metrics = ScaleHelper.calcMetrixToFitRectToWindow(app2.size, screenResolution);
      container.width = metrics.size.w;
      container.height = metrics.size.h;
      container.style.width = metrics.size.w + "px";
      container.style.height = metrics.size.h + "px";
      container.style.margin = `${metrics.pos.y}px auto`;
      app2.viewPort.from(metrics.size);
    }
  };

  // src/vEngineLite/inputControl/KeyboardInputControl.ts
  var KEY_DOWN = "keydown";
  var KEY_UP = "keyup";
  var JUST_PRESSED = 0;
  var PRESSED = 1;
  var JUST_RELEASED = 2;
  var KeyboardInputControl = class {
    constructor() {
      this.listeners = /* @__PURE__ */ new Map();
      this.keyBuffer = /* @__PURE__ */ new Map();
      this.keyDownListener = (event) => {
        if (event.repeat) return;
        this.keyBuffer.set(event.code, JUST_PRESSED);
        const listeners = this.getListeners(KEY_DOWN, event.code);
        if (!listeners) return;
        for (const listener of listeners) listener();
      };
      this.keyUpListener = (event) => {
        this.keyBuffer.set(event.code, JUST_RELEASED);
        const listeners = this.getListeners(KEY_UP, event.code);
        if (!listeners) return;
        for (const listener of listeners) listener();
      };
      this.keyDownListener = this.keyDownListener.bind(this);
      this.keyUpListener = this.keyUpListener.bind(this);
    }
    update(dt) {
      this.keyBuffer.forEach((value, key) => {
        if (value == JUST_PRESSED) {
          this.keyBuffer.set(key, PRESSED);
        } else if (value === JUST_RELEASED) {
          this.keyBuffer.delete(key);
        }
      });
    }
    start() {
      window.addEventListener(KEY_DOWN, this.keyDownListener);
      window.addEventListener(KEY_UP, this.keyUpListener);
    }
    stop() {
      window.removeEventListener(KEY_DOWN, this.keyDownListener);
      window.removeEventListener(KEY_UP, this.keyUpListener);
    }
    addListener(eventName, btn, callback) {
      if (!this.listeners.has(eventName)) {
        this.listeners.set(eventName, /* @__PURE__ */ new Map());
      }
      if (!this.listeners.get(eventName).has(btn)) {
        this.listeners.get(eventName).set(btn, []);
      }
      this.listeners.get(eventName).get(btn).push(callback);
    }
    removeListener(eventName, btn, callback) {
      const events = this.listeners.get(eventName)?.get(btn);
      if (!events) return false;
      const index = events.indexOf(callback);
      if (index < 0) return false;
      events.splice(index, 1);
      return true;
    }
    getListeners(eventName, btn) {
      return this.listeners.get(eventName)?.get(btn);
    }
    onKeyDown(btn, callback) {
      this.addListener(KEY_DOWN, btn, callback);
    }
    offKeyDown(btn, callback) {
      return this.removeListener(KEY_DOWN, btn, callback);
    }
    onKeyUp(btn, callback) {
      this.addListener(KEY_UP, btn, callback);
    }
    offKeyUp(btn, callback) {
      return this.removeListener(KEY_UP, btn, callback);
    }
    isPressed(btn) {
      if (!this.keyBuffer.has(btn)) return false;
      const state = this.keyBuffer.get(btn);
      return state === JUST_PRESSED || state === PRESSED;
    }
    justPressed(btn) {
      return this.keyBuffer.get(btn) === JUST_PRESSED;
    }
    justReleased(btn) {
      return this.keyBuffer.get(btn) === JUST_RELEASED;
    }
    isReleased(btn) {
      if (!this.keyBuffer.has(btn)) return false;
      const state = this.keyBuffer.get(btn);
      return state === JUST_RELEASED;
    }
  };

  // src/vEngineLite/rendering/Color.ts
  var Color = class _Color extends ObservableEntity {
    constructor(r, g, b, a = 255) {
      super();
      this.normalized = [0, 0, 0, 0];
      this.rgba(r, g, b, a);
    }
    static WHITE() {
      return new _Color(255, 255, 255, 255);
    }
    static BLACK() {
      return new _Color(0, 0, 0, 255);
    }
    from(other) {
      this.rgba(other.r, other.g, other.b, other.a);
    }
    fromCssColor(hex) {
      const groups = hex.substring(1).match(/..?/g);
      if (!groups) throw new Error(`Invalid hex string: ${hex}`);
      const r = Number.parseInt(groups[0], 16);
      const g = Number.parseInt(groups[1], 16);
      const b = Number.parseInt(groups[2], 16);
      const a = groups[3] ? Number.parseInt(groups[3], 16) : 255;
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
      return this;
    }
    toCssColor() {
      const r = this.r.toString(16).padStart(2, "0");
      const g = this.g.toString(16).padStart(2, "0");
      const b = this.b.toString(16).padStart(2, "0");
      const a = this.a.toString(16).padStart(2, "0");
      return `#${r}${g}${b}${a}`;
    }
    set r(val) {
      this.dirty = this.dirty || val !== this._r;
      this._r = val;
      this.notifyChange();
    }
    get r() {
      return this._r;
    }
    set g(val) {
      this.dirty = this.dirty || val !== this._r;
      this._g = val;
      this.notifyChange();
    }
    get g() {
      return this._g;
    }
    set b(val) {
      this.dirty = this.dirty || val !== this._r;
      this._b = val;
      this.notifyChange();
    }
    get b() {
      return this._b;
    }
    set a(val) {
      this.dirty = this.dirty || val !== this._r;
      this._a = val;
      this.notifyChange();
    }
    get a() {
      return this._a;
    }
    rgb(r, g, b) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = 255;
    }
    rgba(r, g, b, a) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    }
    getNormalized() {
      if (this.dirty) {
        this.normalized[0] = this._r / 255;
        this.normalized[1] = this._g / 255;
        this.normalized[2] = this._b / 255;
        this.normalized[3] = this._a / 255;
        this.dirty = false;
      }
      return this.normalized;
    }
  };

  // src/vEngineLite/application/Scene.ts
  var Scene = class {
    constructor(app2) {
      this.app = app2;
      this.size = new Size().from(this.app.size);
      this.bgColor = Color.WHITE();
      this.input = {
        keyboard: new KeyboardInputControl()
      };
      this.objects = [];
    }
    calculateBounds() {
      let w = Math.max(...this.objects.map((it) => it.position.x + it.size.w), this.app.size.w);
      let h = Math.max(...this.objects.map((it) => it.position.y + it.size.h), this.app.size.h);
      this.size.wh(w, h);
    }
    onPreloadStarted() {
    }
    onProgress(percents) {
    }
    onReady() {
    }
    onUpdate(dt) {
      this.app.physics.prepareWorld(dt);
      for (const obj of this.objects) {
        obj.update(dt);
      }
      this.app.physics.updateWorld(dt);
      this.app.camera.update(dt);
    }
    render() {
      this.app.renderer.clearRenderBuffer(this.bgColor);
      for (const obj of this.objects) {
        obj.enterFrame(this.app.renderer);
      }
      this.app.renderer.flush();
    }
    addObject(obj) {
      this.objects.push(obj);
    }
    prependObject(obj) {
      this.objects.unshift(obj);
    }
    insertAtIndex(i, obj) {
      this.objects.splice(i, 0, obj);
    }
    insertBefore(obj, insertBefore) {
      const index = this.objects.indexOf(insertBefore);
      if (index < 0) return;
      this.insertAtIndex(index, obj);
    }
    insertAfter(obj, insertAfter) {
      const index = this.objects.indexOf(insertAfter);
      if (index < 0) return;
      if (index === this.objects.length - 1) this.objects.push(obj);
      else this.insertAtIndex(index + 1, obj);
    }
    removeObject(obj) {
      const index = this.objects.indexOf(obj);
      if (index < 0) return;
      this.objects.splice(index, 1);
    }
    getObjects() {
      return this.objects;
    }
  };

  // src/vEngineLite/animation/FrameAnimation.ts
  var FrameAnimation = class {
    constructor(gameObject, frames, duration, loops = Infinity, startFrameIndex = 0) {
      this.gameObject = gameObject;
      this.frames = frames;
      this.duration = duration;
      this.loops = loops;
      this.frameDuration = ~~(duration / frames.length);
      this.currentFrame = frames[startFrameIndex];
      this.updateGameObject();
    }
    static framesFromRegularSpriteSheet(textureWidth, textureHeight, tilesetCols, tilesetRows) {
      const frames = [];
      const width = textureWidth / tilesetCols;
      const height = textureHeight / tilesetRows;
      for (let y = 0; y < tilesetRows; y++) {
        for (let x = 0; x < tilesetCols; x++) {
          frames.push({ x: x * width, y: y * height, width, height, left: 0, top: 0, name: "" });
        }
      }
      return frames;
    }
    static spriteSheetFramesByName(spriteSheet, names) {
      const result = [];
      for (const name of names) {
        const f = spriteSheet.frames.find((frame) => frame.name === name);
        if (!f) {
          throw new Error(`Cannot find frame by name: ${name}`);
        }
        result.push({ ...f });
      }
      return result;
    }
    update(dt) {
      if (this.completed) return;
      this.time += dt;
      if (this.time > this.duration) {
        this.time %= this.duration;
        this.currentLoop++;
        if (this.currentLoop >= this.loops) {
          this.completed = true;
          return;
        }
      }
      let currentFrameIndex = Math.floor(this.time / this.frameDuration);
      this.currentFrame = this.frames[currentFrameIndex];
      this.updateGameObject();
    }
    getCurrentFrame() {
      return this.frames.indexOf(this.currentFrame);
    }
    getLoop() {
      return this.currentLoop;
    }
    isCompleted() {
      return this.completed;
    }
    reset() {
      this.time = 0;
      this.currentLoop = 0;
      this.completed = false;
    }
    updateGameObject() {
      const frame = this.currentFrame;
      this.gameObject.setFrame(frame);
    }
  };

  // src/vEngineLite/animation/FrameAnimationPlayer.ts
  var FrameAnimationPlayer = class {
    play(fa) {
      if (fa === this.currentAnimation) return false;
      fa.reset();
      this.completed = false;
      this.currentAnimation = fa;
      return true;
    }
    stop() {
      this.currentAnimation = void 0;
    }
    isAnimationCompleted() {
      return this.completed;
    }
    update(dt) {
      if (!this.currentAnimation) return;
      this.currentAnimation.update(dt);
      this.completed = this.currentAnimation.isCompleted();
    }
  };

  // src/vEngineLite/animation/stateMachine/AnimationStateMachine.ts
  var AnimationStateMachine = class {
    constructor(player) {
      this.player = player;
      this.states = {};
    }
    addStates(...states) {
      for (const state of states) {
        this.states[state.constructor.name] = state;
      }
    }
    setInitialState(state) {
      this.currentState = this.getState(state);
      this.playCurrentAnimation();
    }
    sendCommand(message) {
      if (!this.currentState) return false;
      const nextStateName = this.currentState.receiveCommand(message);
      if (nextStateName) {
        this.toNextState(nextStateName);
        return true;
      }
      return false;
    }
    getState(name) {
      const state = this.states[name];
      if (!state) throw new Error(`State ${name} not found`);
      return state;
    }
    toNextState(nextStateName) {
      this.currentState.onExit();
      this.currentState = this.getState(nextStateName);
      this.playCurrentAnimation();
    }
    playCurrentAnimation() {
      const started = this.player.play(this.currentState.onEnter());
      if (started) {
        this.currentState.onAnimationStarted();
      }
    }
    update(dt) {
      if (this.player.isAnimationCompleted()) {
        const nextStateName = this.currentState.onAnimationCompleted();
        if (nextStateName) {
          this.toNextState(nextStateName);
        }
      }
    }
  };

  // src/vEngineLite/animation/stateMachine/AnimationState.ts
  var AnimationState = class {
    onAnimationStarted() {
    }
    onAnimationCompleted() {
      return null;
    }
    onExit() {
    }
  };

  // src/test1/hero/states/abstracts/HeroAbstractMovingState.ts
  var HeroAbstractMovingState = class extends AnimationState {
    constructor(scene, hero) {
      super();
      this._scene = scene;
      this._hero = hero;
    }
    setHeroVelocity() {
      let vel;
      if (this._scene.input.keyboard.isPressed("ArrowRight" /* RIGHT */)) vel = this._hero.walkVelocity;
      else if (this._scene.input.keyboard.isPressed("ArrowLeft" /* LEFT */)) vel = -this._hero.walkVelocity;
      if (vel !== void 0) this._hero.getRigidBody().velocity.x = vel;
    }
  };

  // src/test1/hero/states/HeroAttack1State.ts
  var HeroAttack1State = class _HeroAttack1State extends HeroAbstractMovingState {
    constructor(scene, hero) {
      super(scene, hero);
      this.scene = scene;
      this.hero = hero;
    }
    onEnter() {
      this.setHeroVelocity();
      return this.hero.attack1Animation;
    }
    onAnimationCompleted() {
      return HeroIdleState.name;
    }
    receiveCommand(command) {
      switch (command) {
        case "walk":
          return _HeroAttack1State.name;
      }
      return null;
    }
  };

  // src/test1/hero/states/HeroFireState.ts
  var HeroFireState = class _HeroFireState extends HeroAbstractMovingState {
    constructor(scene, hero) {
      super(scene, hero);
      this.scene = scene;
      this.hero = hero;
    }
    onEnter() {
      this.setHeroVelocity();
      return this.hero.fireAnimation;
    }
    onAnimationStarted() {
      this.hero.shoot();
      this.hero.getRigidBody().velocity.x = -100 * this.hero.scale.x;
    }
    onAnimationCompleted() {
      return HeroIdleState.name;
    }
    receiveCommand(command) {
      switch (command) {
        case "walk":
          return _HeroFireState.name;
      }
      return null;
    }
  };

  // src/test1/hero/states/HeroAttack2State.ts
  var HeroAttack2State = class _HeroAttack2State extends HeroAbstractMovingState {
    constructor(scene, hero) {
      super(scene, hero);
      this.scene = scene;
      this.hero = hero;
    }
    onEnter() {
      this.setHeroVelocity();
      return this.hero.attack2Animation;
    }
    onAnimationCompleted() {
      return HeroIdleState.name;
    }
    receiveCommand(command) {
      switch (command) {
        case "walk":
          return _HeroAttack2State.name;
      }
      return null;
    }
  };

  // src/test1/hero/states/HeroFallState.ts
  var HeroFallState = class _HeroFallState extends HeroAbstractMovingState {
    constructor(scene, hero) {
      super(scene, hero);
      this.scene = scene;
      this.hero = hero;
    }
    onEnter() {
      this.setHeroVelocity();
      return this.hero.fallAnimation;
    }
    receiveCommand(command) {
      switch (command) {
        case "attack1":
          return HeroAttack1State.name;
        case "attack2":
          return HeroAttack2State.name;
        case "ground":
          return HeroIdleState.name;
        case "walk":
          return _HeroFallState.name;
        case "fire":
          return HeroFireState.name;
      }
      return null;
    }
  };

  // src/test1/hero/states/HeroLookUpState.ts
  var HeroLookUpState = class extends AnimationState {
    constructor(scene, hero) {
      super();
      this.scene = scene;
      this.hero = hero;
    }
    onEnter() {
      return this.hero.lookUpAnimation;
    }
    receiveCommand(command) {
      switch (command) {
        case "stopLookUp":
          return HeroIdleState.name;
        //case 'walk': return HeroWalkState.name;
        case "unground":
          return HeroFallState.name;
      }
      return null;
    }
  };

  // src/test1/hero/states/HeroWalkState.ts
  var HeroWalkState = class _HeroWalkState extends HeroAbstractMovingState {
    constructor(scene, hero) {
      super(scene, hero);
      this.scene = scene;
      this.hero = hero;
    }
    onEnter() {
      this.setHeroVelocity();
      return this.hero.walkAnimation;
    }
    receiveCommand(command) {
      switch (command) {
        case "walk":
          return _HeroWalkState.name;
        case "stop":
          return HeroIdleState.name;
        case "unground":
          return HeroFallState.name;
        case "attack1":
          return HeroAttack1State.name;
        case "attack2":
          return HeroAttack2State.name;
        case "fire":
          return HeroFireState.name;
      }
      return null;
    }
  };

  // src/test1/hero/states/HeroSitState.ts
  var HeroSitState = class extends AnimationState {
    constructor(scene, hero) {
      super();
      this.scene = scene;
      this.hero = hero;
    }
    onEnter() {
      return this.hero.sitAnimation;
    }
    receiveCommand(command) {
      switch (command) {
        case "stopSit":
          return HeroIdleState.name;
        case "attack1":
          return HeroAttack1State.name;
        case "attack2":
          return HeroAttack2State.name;
        case "unground":
          return HeroFallState.name;
        case "fire":
          return HeroFireState.name;
      }
      return null;
    }
  };

  // src/test1/hero/states/HeroIdleState.ts
  var HeroIdleState = class extends AnimationState {
    constructor(scene, hero) {
      super();
      this.scene = scene;
      this.hero = hero;
    }
    onEnter() {
      return this.hero.idleAnimation;
    }
    receiveCommand(command) {
      switch (command) {
        case "walk":
          return HeroWalkState.name;
        case "lookUp":
          return HeroLookUpState.name;
        case "unground":
          return HeroFallState.name;
        case "sit":
          return HeroSitState.name;
        case "attack1":
          return HeroAttack1State.name;
        case "attack2":
          return HeroAttack2State.name;
        case "fire":
          return HeroFireState.name;
      }
      return null;
    }
  };

  // src/vEngineLite/gameObject/base/Container.ts
  var Container = class {
    constructor(scene) {
      this.scene = scene;
      this.transform = new Transform();
      this.size = new Size();
      this.position = this.transform.position;
      this.scale = this.transform.scale;
      this.pivot = this.transform.pivot;
      this.children = [];
    }
    set rotation(value) {
      this.transform.rotation = value;
    }
    get rotation() {
      return this.transform.rotation;
    }
    getWorldMatrix() {
      return this.transform.getWorldMatrix();
    }
    enterFrame(renderer) {
    }
    update(dt) {
      if (this.body) {
        this.scene.app.physics.updateBody(this.body, dt);
      }
    }
    // public addChild
  };

  // src/vEngineLite/gameObject/base/RenderableContainer.ts
  var RenderableContainer = class extends Container {
    enterFrame(renderer) {
      this.render(renderer);
    }
  };

  // src/vEngineLite/gameObject/Sprite.ts
  var Sprite = class extends RenderableContainer {
    constructor(scene, texture) {
      super(scene);
      this.offset = new Vector2();
      this.textureInfo = {
        texture,
        rect: {
          uv: new Vector2(),
          size: new Size(texture.width, texture.height)
        },
        color: Color.WHITE()
      };
      this.size.from(this.textureInfo.rect.size);
    }
    render(renderer) {
      renderer.batchSprite(
        this.size,
        this.textureInfo,
        this.getWorldMatrix(),
        this.offset.x,
        this.offset.y
      );
    }
    setFrame(frame) {
      this.offset.xy(frame.left, frame.top);
      this.size.wh(frame.width, frame.height);
      this.textureInfo.rect.uv.uv(frame.x, frame.y);
      this.textureInfo.rect.size.wh(frame.width, frame.height);
    }
  };

  // src/vEngineLite/gameObject/shapes/Rectangle.ts
  var Rectangle = class extends RenderableContainer {
    constructor(scene) {
      super(scene);
      this.color = Color.WHITE();
      this.textureInfo = {
        color: this.color,
        texture: GLUtils.getEmptyTexture(),
        rect: {
          uv: new Vector2(),
          size: new Size(1)
        }
      };
      this.size.wh(32);
    }
    render(renderer) {
      renderer.batchSprite(
        this.size,
        this.textureInfo,
        this.getWorldMatrix()
      );
    }
  };

  // engine/core/ioc.ts
  var DIContext = {};
  function isConstructor(token) {
    return Object.prototype.hasOwnProperty.call(token, "prototype");
  }
  var DI = {
    CSS: (filePath, params) => {
      return function ClassDecorator(target, ctx) {
        return class extends target {
          static {
            this.__injectable = target.prototype.constructor.__injectable ?? target.name;
          }
          static {
            this.__scope = params?.global ? void 0 : target.prototype.constructor.__injectable ?? target.name;
          }
        };
      };
    },
    registerInstance: (instance) => {
      const tkn = instance.constructor.name;
      instance.constructor.__injectable = tkn;
      DIContext[tkn] = instance;
    },
    getInstance: (tkn) => {
      const res = DIContext[tkn];
      if (!res) {
        throw new Error(`instance is not registered: ${tkn}`);
      }
      return res;
    },
    Injectable: () => {
      return function ClassDecorator(target, ctx) {
        return class extends target {
          static {
            this.__injectable = target.prototype.constructor.__injectable ?? target.name;
          }
          static {
            this.__constructorArgumentsLength = target.length;
          }
          constructor(...args) {
            super(...args);
            DIContext[target.name] = this;
          }
        };
      };
    },
    Inject: (token) => {
      return (value, context) => {
        context.addInitializer(function() {
          const thisToken = this.constructor.__injectable;
          if (!thisToken) {
            console.error(this);
            throw new Error(`not injectable: ${this.constructor.name}`);
          }
          Object.defineProperty(this, context.name, {
            get: () => {
              if (!token) {
                throw new Error(`can not inject ${String(context.name)}: no runtime type was provided; use the DI injection transformer`);
              }
              const clazz = isConstructor(token) ? token : token();
              const injectToken = clazz.__injectable;
              if (!injectToken) {
                throw new Error(`not injectable: consider adding @Injectable() decorator to class ${clazz.name}`);
              }
              if (!DIContext[injectToken]) {
                const constructorArgumentsLength = clazz.__constructorArgumentsLength;
                if (constructorArgumentsLength > 0) {
                  throw new Error(`can not inject ${injectToken}: no default constructor`);
                }
                DIContext[injectToken] = new clazz();
              }
              return DIContext[injectToken];
            },
            set: (val) => {
            }
          });
        });
      };
    }
  };

  // src/test1/services/CollisionService.ts
  var _CollisionService_decorators, _init;
  _CollisionService_decorators = [DI.Injectable()];
  var CollisionService = class {
    constructor() {
      this.col = new CollisionGroupManager();
      this.rigidBodyGroup = this.col.nextGroup();
      this.heroBodyGroup = this.col.nextGroup();
      this.bulletGroup = this.col.nextGroup();
      this.particleGroup = this.col.nextGroup();
    }
  };
  _init = __decoratorStart(null);
  CollisionService = __decorateElement(_init, 0, "CollisionService", _CollisionService_decorators, CollisionService);
  __runInitializers(_init, 1, CollisionService);

  // src/test1/hero/HeroGameObject.ts
  var _collisionService_dec, _a, _HeroGameObject_decorators, _init2;
  _HeroGameObject_decorators = [DI.Injectable()];
  var HeroGameObject = class extends (_a = Sprite, _collisionService_dec = [DI.Inject(() => CollisionService)], _a) {
    constructor(scene, texture, spriteSheet) {
      super(scene, texture);
      this.collisionService = __runInitializers(_init2, 8, this), __runInitializers(_init2, 11, this);
      this.walkVelocity = 100;
      this.walkAnimation = void 0;
      this.idleAnimation = void 0;
      this.lookUpAnimation = void 0;
      this.fallAnimation = void 0;
      this.sitAnimation = void 0;
      this.attack1Animation = void 0;
      this.attack2Animation = void 0;
      this.fireAnimation = void 0;
      this.animationPlayer = new FrameAnimationPlayer();
      this.animationStateMachine = new AnimationStateMachine(this.animationPlayer);
      this.bodyRef = void 0;
      this.regularBodyRect = {
        x: 25,
        y: 2,
        width: 15,
        height: 62
      };
      this.position.xy(200, 250);
      const body = scene.app.physics.createRigidBody({
        type: 1 /* DYNAMIC */,
        target: this,
        rect: this.regularBodyRect,
        collisionGroup: CollisionGroupManager.combine(this.collisionService.rigidBodyGroup, this.collisionService.heroBodyGroup),
        collideWithGroup: this.collisionService.rigidBodyGroup
      });
      this.body = body;
      this.bodyRef = body;
      this.walkAnimation = new FrameAnimation(this, FrameAnimation.spriteSheetFramesByName(spriteSheet, [
        "hero_step1",
        "hero_step2",
        "hero_step3",
        "hero_step4"
      ]), 800);
      this.idleAnimation = new FrameAnimation(this, FrameAnimation.spriteSheetFramesByName(spriteSheet, [
        "hero_idle1",
        "hero_idle2"
      ]), 1600);
      this.fallAnimation = new FrameAnimation(this, FrameAnimation.spriteSheetFramesByName(spriteSheet, [
        "hero_fall1",
        "hero_fall2"
      ]), 800);
      this.sitAnimation = new FrameAnimation(this, FrameAnimation.spriteSheetFramesByName(spriteSheet, [
        "hero_sit_down1",
        "hero_sit_down2"
      ]), 1500);
      this.lookUpAnimation = new FrameAnimation(this, FrameAnimation.spriteSheetFramesByName(spriteSheet, [
        "hero_look-up1",
        "hero_look-up2"
      ]), 1600);
      this.attack1Animation = new FrameAnimation(this, FrameAnimation.spriteSheetFramesByName(spriteSheet, [
        "hero_attack1",
        "hero_attack2"
      ]), 500, 1);
      this.attack2Animation = new FrameAnimation(this, FrameAnimation.spriteSheetFramesByName(spriteSheet, [
        "hero_attack3",
        "hero_attack4"
      ]), 500, 1);
      this.fireAnimation = new FrameAnimation(this, FrameAnimation.spriteSheetFramesByName(spriteSheet, [
        "hero_fire1",
        "hero_fire2"
      ]), 450, 1);
      this.animationStateMachine.addStates(new HeroIdleState(this.scene, this), new HeroLookUpState(this.scene, this), new HeroWalkState(this.scene, this), new HeroFallState(this.scene, this), new HeroSitState(this.scene, this), new HeroAttack1State(this.scene, this), new HeroAttack2State(this.scene, this), new HeroFireState(this.scene, this));
      this.animationStateMachine.setInitialState(HeroIdleState.name);
    }
    update(dt) {
      super.update(dt);
      this.animationPlayer.update(dt);
      this.animationStateMachine.update(dt);
    }
    getRigidBody() {
      return this.bodyRef;
    }
    shoot() {
      const bullet = new Rectangle(this.scene);
      bullet.size.wh(5);
      bullet.color.fromCssColor("#8a0101");
      const bulletBody = this.scene.app.physics.createRigidBody({
        type: 1 /* DYNAMIC */,
        target: bullet,
        collisionGroup: CollisionGroupManager.combine(this.collisionService.rigidBodyGroup, this.collisionService.bulletGroup),
        collideWithGroup: this.collisionService.rigidBodyGroup,
        ignoreCollisionWithGroup: CollisionGroupManager.combine(this.collisionService.particleGroup, this.collisionService.heroBodyGroup),
        restitution: 0.1,
        mass: 1e-4,
        gravityFactor: 0.05
      });
      bulletBody.velocity.x = Math.sign(this.scale.x) * 500;
      bullet.body = bulletBody;
      bullet.position.y = this.position.y + this.regularBodyRect.y + 28;
      if (this.scale.x > 0) {
        bullet.position.x = this.position.x + this.regularBodyRect.x;
      } else {
        bullet.position.x = this.position.x + this.regularBodyRect.x;
      }
      this.scene.insertBefore(bullet, this);
      bulletBody.onCollided = (_) => {
        bulletBody.gravityFactor = 1;
        bullet.color.fromCssColor("#300101");
      };
      setTimeout(() => {
        this.scene.removeObject(bullet);
      }, 5e3);
    }
  };
  _init2 = __decoratorStart(_a);
  __decorateElement(_init2, 5, "collisionService", _collisionService_dec, HeroGameObject);
  HeroGameObject = __decorateElement(_init2, 0, "HeroGameObject", _HeroGameObject_decorators, HeroGameObject);
  __runInitializers(_init2, 1, HeroGameObject);

  // src/vEngineLite/utils/MathEx.ts
  var MathEx = class {
    static randomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static clamp(value, min, max) {
      if (value < min) return min;
      if (value > max) return max;
      return value;
    }
  };

  // src/vEngineLite/gameObject/TileMaps.ts
  var TileMaps = class {
    static fromTiledTileMap(map, layerNames, tileSetName) {
      const layers = [];
      for (const layerName of layerNames) {
        const layer = map.layers.find((layer2) => layer2.name == layerName);
        if (!layer) throw new Error(`Layer ${layerName} not found!`);
        layers.push({
          data: layer.data,
          parallaxX: layer.parallaxx ?? 1,
          parallaxY: layer.parallaxy ?? 1
        });
      }
      const tileSet = map.tilesets.find((tileset) => tileset.name == tileSetName);
      if (!tileSet) throw new Error(`Tile set ${tileSetName} not found!`);
      return {
        layers,
        mapWidthInTiles: map.width,
        tilesetRows: tileSet.imageheight / tileSet.tileheight,
        tilesetCols: tileSet.columns
      };
    }
    static getTiledMapCustomProperty(map, propertyName) {
      if (!map.properties) return void 0;
      const res = map.properties.find((prop) => prop.name === propertyName);
      if (!res) throw new Error(`Property ${propertyName} not found!`);
      return res;
    }
  };

  // src/vEngineLite/gameObject/TileMap.ts
  var TileMap = class extends RenderableContainer {
    constructor(scene, layers, mapWidthInTiles, tilesetCols, tilesetRows, texture) {
      super(scene);
      this.layers = layers;
      this.mapWidthInTiles = mapWidthInTiles;
      this.renderableLayers = [];
      this.bodies = [];
      const tileWidth = Math.floor(texture.width / tilesetCols);
      const tileHeight = Math.floor(texture.height / tilesetRows);
      this.mapHeightInTiles = Math.ceil(layers[0].data.length / this.mapWidthInTiles);
      this.spriteRenderer = {
        texture,
        rect: {
          uv: new Vector2(),
          size: new Size(Math.max(0, tileWidth - 1), Math.max(0, tileHeight - 1))
        },
        color: Color.WHITE()
      };
      this.tileSize = new Size(tileWidth, tileHeight);
      for (const layer of layers) {
        const tiles = this.createTiles(
          layer.data,
          mapWidthInTiles,
          tilesetCols,
          tileWidth,
          tileHeight
        );
        this.renderableLayers.push({
          tiles,
          parallaxX: layer.parallaxX ?? layer.parallax ?? 1,
          parallaxY: layer.parallaxY ?? layer.parallax ?? 1
        });
      }
      this.size.wh(mapWidthInTiles * tileWidth, this.mapHeightInTiles * tileHeight);
    }
    createCollisionBodies(solidTiles, params) {
      for (const layer of this.layers) {
        this.createMergedCollisionBodies(
          layer.data,
          this.mapWidthInTiles,
          this.mapHeightInTiles,
          this.tileSize.w,
          this.tileSize.h,
          solidTiles,
          params
        );
      }
    }
    update(dt) {
      super.update(dt);
      for (const body of this.bodies) {
        this.scene.app.physics.updateBody(body, dt);
      }
    }
    render(renderer) {
      const worldMatrix = this.getWorldMatrix();
      for (const layer of this.renderableLayers) {
        const parallaxOffsetX = this.scene.app.camera.position.x * (1 - layer.parallaxX);
        const parallaxOffsetY = this.scene.app.camera.position.y * (1 - layer.parallaxY);
        for (const tile of layer.tiles) {
          this.spriteRenderer.rect.uv.from(tile.uv);
          renderer.batchSprite(
            this.tileSize,
            this.spriteRenderer,
            worldMatrix,
            tile.position.x + parallaxOffsetX,
            tile.position.y + parallaxOffsetY
          );
        }
      }
    }
    createTiles(data, mapWidthInTiles, tilesetCols, tileWidth, tileHeight) {
      const tiles = [];
      for (let i = 0; i < data.length; i++) {
        let tileIndex = data[i];
        if (tileIndex === 0) continue;
        tileIndex--;
        const tile = {
          position: new Vector2(
            i % mapWidthInTiles * tileWidth,
            Math.floor(i / mapWidthInTiles) * tileHeight
          ),
          uv: new Vector2(
            tileIndex % tilesetCols * tileWidth + 0.5,
            Math.floor(tileIndex / tilesetCols) * tileHeight + 0.5
          ),
          size: this.tileSize
        };
        tiles.push(tile);
      }
      return tiles;
    }
    createMergedCollisionBodies(data, mapWidthInTiles, mapHeightInTiles, tileWidth, tileHeight, solidTiles, params) {
      const visited = new Array(data.length).fill(false);
      const isSolid = (x, y) => {
        if (x < 0 || y < 0 || x >= mapWidthInTiles || y >= mapHeightInTiles) {
          return false;
        }
        const index = y * mapWidthInTiles + x;
        return solidTiles.includes(data[index] - 1) && !visited[index];
      };
      for (let y = 0; y < mapHeightInTiles; y++) {
        for (let x = 0; x < mapWidthInTiles; x++) {
          if (!isSolid(x, y)) {
            continue;
          }
          let width = 1;
          while (isSolid(x + width, y)) {
            width++;
          }
          let height = 1;
          while (true) {
            const nextY = y + height;
            if (nextY >= mapHeightInTiles) {
              break;
            }
            let fullRow = true;
            for (let dx = 0; dx < width; dx++) {
              if (!isSolid(x + dx, nextY)) {
                fullRow = false;
                break;
              }
            }
            if (!fullRow) {
              break;
            }
            height++;
          }
          for (let dy = 0; dy < height; dy++) {
            for (let dx = 0; dx < width; dx++) {
              const index = (y + dy) * mapWidthInTiles + (x + dx);
              visited[index] = true;
            }
          }
          this.createCollisionBody(
            x * tileWidth,
            y * tileHeight,
            width * tileWidth,
            height * tileHeight,
            params
          );
        }
      }
    }
    createCollisionBody(x, y, width, height, params = {}) {
      const target = {
        position: new Vector2(x, y),
        size: new Size(width, height)
      };
      this.bodies.push(
        this.scene.app.physics.createRigidBody({
          ...params,
          type: 0 /* STATIC */,
          target
        })
      );
    }
  };

  // src/vEngineLite/camera/follow/LookAheadFollowStrategy.ts
  var LookAheadFollowStrategy = class {
    constructor(distance, lookAheadSmoothing = 6, cameraSmoothing = 4) {
      this.distance = distance;
      this.lookAheadSmoothing = lookAheadSmoothing;
      this.cameraSmoothing = cameraSmoothing;
      this.lookAheadX = 0;
      this.lookAheadY = 0;
      this.lookDirectionX = "right";
      this.lookDirectionY = "none";
    }
    update(camera, target, dt) {
      const seconds = dt / 1e3;
      let directionX = 0;
      if (this.lookDirectionX === "right") directionX = 1;
      if (this.lookDirectionX === "left") directionX = -1;
      let directionY = 0;
      if (this.lookDirectionY === "top") directionY = -1;
      else if (this.lookDirectionY === "bottom") directionY = 1;
      const desiredLookAheadX = this.distance * directionX;
      const desiredLookAheadY = this.distance * directionY;
      const lookAheadAlpha = 1 - Math.exp(
        -this.lookAheadSmoothing * seconds
      );
      this.lookAheadX += (desiredLookAheadX - this.lookAheadX) * lookAheadAlpha;
      this.lookAheadY += (desiredLookAheadY - this.lookAheadY) * lookAheadAlpha;
      const targetX = target.position.x + this.lookAheadX - camera.app.size.w / 2;
      const targetY = target.position.y + this.lookAheadY - camera.app.size.h / 2;
      const cameraAlpha = 1 - Math.exp(
        -this.cameraSmoothing * seconds
      );
      const wordBounds = camera.app.getCurrentScene().size;
      const viewPortWidth = camera.app.size.w;
      const viewPortHeight = camera.app.size.h;
      camera.position.x = camera.position.x + (targetX - camera.position.x) * cameraAlpha;
      camera.position.y = camera.position.y + (targetY - camera.position.y) * cameraAlpha;
      camera.position.x = MathEx.clamp(camera.position.x, 0, wordBounds.w - viewPortWidth);
      camera.position.y = MathEx.clamp(camera.position.y, 0, wordBounds.h - viewPortHeight);
    }
  };

  // src/vEngineLite/gameObject/text/Font.ts
  var LAT_CHARS = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
  var STANDARD_SYMBOLS = "1234567890 \"!`?'.,;:()[]{}<>|/@\\^$-%+=#_&~*";
  var CYR_CHARS = "\u0410\u0430\u0411\u0431\u0412\u0432\u0413\u0433\u0414\u0434\u0415\u0435\u0401\u0451\u0416\u0436\u0417\u0437\u0418\u0438\u0419\u0439\u041A\u043A\u041B\u043B\u041C\u043C\u041D\u043D\u041E\u043E\u041F\u043F\u0420\u0440\u0421\u0441\u0422\u0442\u0423\u0443\u0424\u0444\u0425\u0445\u0426\u0446\u0427\u0447\u0428\u0448\u0429\u0449\u042B\u044B\u042C\u044C\u042A\u044A\u042D\u044D\u042E\u044E\u042F\u044F\u0407\u0457\u0406\u0456\u0404\u0454\u0490\u0491";
  var Font = class _Font {
    constructor(context) {
      this.context = context;
      this.firstSymbol = Object.keys(context.chars)[0];
    }
    getCharInfo(ch) {
      return this.context.chars[ch] ?? this.context.chars["?"] ?? this.context.chars[this.firstSymbol];
    }
    static fromCss(options) {
      const chars = [
        ...new Set(
          options.chars ?? LAT_CHARS + STANDARD_SYMBOLS + CYR_CHARS + (options.additionalChars ?? "")
        )
      ];
      const padding = Math.max(
        0,
        Math.ceil(options.padding ?? 2)
      );
      const spacing = Math.max(
        0,
        Math.ceil(options.spacing ?? 2)
      );
      const atlasWidth = Math.floor(options.atlasWidth ?? 256);
      if (atlasWidth <= 0) {
        throw new Error("Invalid atlas width");
      }
      const fontSize = options.fontSize ?? 14;
      const fontStyle = [
        options.italic ? "italic" : "",
        options.bold ? "bold" : "",
        `${fontSize}px`,
        options.fontFamily ?? "Arial"
      ].filter(Boolean).join(" ");
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { alpha: true });
      ctx.font = fontStyle;
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "left";
      const metrics = chars.map((ch) => {
        const m = ctx.measureText(ch);
        const left = Math.floor(-m.actualBoundingBoxLeft);
        const right = Math.ceil(m.actualBoundingBoxRight);
        const top = Math.floor(-m.actualBoundingBoxAscent);
        const bottom = Math.ceil(m.actualBoundingBoxDescent);
        const width = Math.max(0, right - left);
        const height = Math.max(0, bottom - top);
        return {
          ch,
          advance: m.width,
          left,
          top,
          width,
          height
        };
      });
      const ascent = Math.max(
        0,
        ...metrics.map((m) => -m.top)
      );
      const descent = Math.max(
        0,
        ...metrics.map((m) => m.top + m.height)
      );
      const lineHeight = options.lineHeight ?? ascent + descent;
      const baselineOffset = ascent + (lineHeight - ascent - descent) / 2;
      const positions = [];
      let x = padding;
      let y = padding;
      let rowHeight = 0;
      for (const m of metrics) {
        const cellWidth = m.width + padding * 2;
        const cellHeight = m.height + padding * 2;
        if (cellWidth > atlasWidth) {
          throw new Error(
            `Glyph "${m.ch}" exceeds atlas width`
          );
        }
        if (x + cellWidth > atlasWidth && x > padding) {
          x = padding;
          y += rowHeight + spacing;
          rowHeight = 0;
        }
        const glyphX = x + padding;
        const glyphY = y + padding;
        positions.push({
          ch: m.ch,
          x,
          y,
          width: cellWidth,
          height: cellHeight,
          advance: m.advance,
          offsetX: m.left - padding,
          offsetY: baselineOffset + m.top - padding,
          drawX: glyphX - m.left,
          drawY: glyphY - m.top
        });
        x += cellWidth + spacing;
        rowHeight = Math.max(
          rowHeight,
          cellHeight
        );
      }
      const atlasHeight = Math.max(
        1,
        Math.ceil(y + rowHeight + padding)
      );
      canvas.width = atlasWidth;
      canvas.height = atlasHeight;
      ctx.font = fontStyle;
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "left";
      const fillColor = options.fillColor ?? Color.WHITE();
      ctx.fillStyle = fillColor.toCssColor();
      ctx.clearRect(
        0,
        0,
        atlasWidth,
        atlasHeight
      );
      const charsInfoPartial = {};
      for (const p of positions) {
        ctx.fillText(
          p.ch,
          p.drawX,
          p.drawY
        );
        charsInfoPartial[p.ch] = {
          pos: new Vector2(p.x, p.y),
          size: new Size(
            p.width,
            p.height
          ),
          advance: p.advance,
          offsetX: p.offsetX,
          offsetY: p.offsetY
        };
      }
      const texture = GLUtils.createTextureFromImage(canvas);
      const charsInfo = {};
      for (const ch of Object.keys(charsInfoPartial)) {
        charsInfo[ch] = {
          ...charsInfoPartial[ch],
          texture
        };
      }
      return new _Font({
        chars: charsInfo
      });
    }
  };

  // src/vEngineLite/gameObject/text/TextLabel.ts
  var TextLabel = class extends RenderableContainer {
    constructor(scene, font) {
      super(scene);
      this.font = font;
      this.color = Color.WHITE();
      this.text = "";
      this.dirty = true;
      this.textParameters = {
        wrap: false
      };
      this.lineHeight = this.font.getCharInfo("!").size.h;
      this.spaceWidth = this.font.getCharInfo(" ").advance;
      this.charSize = new Size();
      this.lines = [];
      this.renderableLetters = [];
      this.textureInfo = {
        texture: GLUtils.getEmptyTexture(),
        color: this.color,
        rect: {
          uv: new Vector2(),
          size: new Size(1)
        }
      };
      this.size.onChange(() => this.dirty = true);
    }
    setText(text) {
      if (this.text === text) return;
      this.dirty = true;
      this.text = text;
    }
    setTextParameters(parameters) {
      this.textParameters = parameters;
      this.dirty = true;
    }
    getTextParameters() {
      return { ...this.textParameters };
    }
    prepareText() {
      this.lines.length = 0;
      if (this.textParameters.wrap) {
        this.prepareTextWrap();
      } else {
        this.prepareTextNoWrap();
      }
      this.alignHorizontal();
      this.alignVertical();
      this.prepareRenderableLetters();
    }
    prepareTextWrap() {
      const wordsStr = this.text.split("\n").join(" ").split(" ").map((it) => it.trim()).filter((it) => it.length);
      const words = [];
      for (const wordStr of wordsStr) {
        let x2 = 0;
        const letters = [];
        for (const ch of wordStr) {
          const charInfo = this.font.getCharInfo(ch);
          const letter = { charInfo, x: x2 };
          letters.push(letter);
          x2 += charInfo.advance;
        }
        const word = {
          x: 0,
          letters,
          length: x2
        };
        words.push(word);
      }
      let x = 0, y = 0;
      const boundWidth = this.size.w;
      const boundHeight = this.size.h;
      let wordsOfCurrentLine = [];
      for (const word of words) {
        if (y >= boundHeight - this.lineHeight) {
          wordsOfCurrentLine = [];
          break;
        }
        if (wordsOfCurrentLine.length === 0 || x + word.length <= boundWidth) {
          word.x = x;
          wordsOfCurrentLine.push(word);
          x += word.length + this.spaceWidth;
        } else {
          const line = {
            x: 0,
            y,
            words: wordsOfCurrentLine,
            length: x
          };
          this.lines.push(line);
          x = 0;
          word.x = x;
          x += word.length + this.spaceWidth;
          wordsOfCurrentLine = [word];
          y += this.lineHeight;
        }
      }
      if (wordsOfCurrentLine.length !== 0) {
        const line = {
          x: 0,
          y,
          words: wordsOfCurrentLine,
          length: x
        };
        this.lines.push(line);
      }
      this.clampOverflowLines();
    }
    clampOverflowLines() {
      const boundWidth = this.size.w;
      for (let i = 0; i < this.lines.length; i++) {
        const line = this.lines[i];
        if (line.words.length === 1 && line.length > boundWidth) {
          let length = 0;
          const newChars = [];
          const word = line.words[0];
          for (const ch of word.letters) {
            length += ch.charInfo.advance;
            if (length <= boundWidth) {
              newChars.push(ch);
            } else break;
          }
          const newWord = {
            x: 0,
            letters: newChars,
            length: newChars.map((it) => it.charInfo.advance).reduce((a, b) => a + b, 0)
          };
          this.lines[i] = {
            x: 0,
            y: line.y,
            words: [newWord],
            length: newWord.length
          };
        }
      }
    }
    prepareTextNoWrap() {
      let x = 0;
      let y = 0;
      let letters = [];
      let wordLength = 0;
      const boundWidth = this.size.w;
      const boundHeight = this.size.h;
      for (const ch of this.text) {
        if (y >= boundHeight) {
          letters = [];
          break;
        }
        if (x >= boundWidth) {
          continue;
        }
        if (ch === "\n") {
          const word = {
            x: 0,
            letters,
            length: wordLength
          };
          const line = {
            x: 0,
            y,
            words: [word],
            length: wordLength
          };
          this.lines.push(line);
          wordLength = 0;
          letters = [];
          x = 0;
          y += this.lineHeight;
          continue;
        }
        const charInfo = this.font.getCharInfo(ch);
        const letter = { charInfo, x };
        letters.push(letter);
        wordLength += charInfo.advance;
        x += charInfo.advance;
      }
      if (letters.length !== 0) {
        const word = {
          x: 0,
          letters,
          length: wordLength
        };
        const line = {
          x: 0,
          y,
          words: [word],
          length: wordLength
        };
        this.lines.push(line);
      }
    }
    alignHorizontal() {
      let boundWidth = this.size.w;
      if (!boundWidth || !Number.isFinite(boundWidth)) {
        boundWidth = Math.max(...this.lines.map((it) => it.length));
      }
      switch (this.textParameters.textAlign) {
        case "right": {
          for (const line of this.lines) {
            line.x = boundWidth - line.length;
          }
          break;
        }
        case "center": {
          for (const line of this.lines) {
            line.x = (boundWidth - line.length) / 2;
          }
          break;
        }
        case "justify": {
          for (const line of this.lines) {
            const allWordsLengthSum = line.words.map((it) => it.length).reduce((prev, cur) => prev + cur, 0);
            if (line.words.length === 1) continue;
            const spaceSize = (boundWidth - allWordsLengthSum) / (line.words.length - 1);
            if (spaceSize > this.spaceWidth * 3) continue;
            let x = 0;
            for (const word of line.words) {
              word.x = x;
              x += word.length + spaceSize;
            }
          }
          break;
        }
      }
    }
    alignVertical() {
      let boundHeight = this.size.h;
      if (!boundHeight || !Number.isFinite(boundHeight)) {
        return;
      }
      let offsetY = 0;
      const linesHeight = this.lines.length * this.lineHeight;
      switch (this.textParameters.verticalAlign) {
        case "center": {
          offsetY = (boundHeight - linesHeight) / 2;
          break;
        }
        case "bottom": {
          offsetY = boundHeight - linesHeight;
          break;
        }
      }
      for (const line of this.lines) {
        line.y = offsetY;
        offsetY += this.lineHeight;
      }
    }
    prepareRenderableLetters() {
      this.renderableLetters.length = 0;
      for (const line of this.lines) {
        for (const word of line.words) {
          for (const letter of word.letters) {
            const charInfo = letter.charInfo;
            const renderableLetter = {
              charInfo,
              x: line.x + word.x + letter.x,
              y: line.y
            };
            this.renderableLetters.push(renderableLetter);
          }
        }
      }
    }
    render(renderer) {
      if (this.dirty) {
        this.prepareText();
        this.dirty = false;
      }
      const worldMatrix = this.getWorldMatrix();
      for (const letter of this.renderableLetters) {
        const charInfo = letter.charInfo;
        this.textureInfo.texture = charInfo.texture;
        this.textureInfo.rect.uv.from(charInfo.pos);
        this.textureInfo.rect.size.from(charInfo.size);
        this.charSize.from(charInfo.size);
        renderer.batchSprite(
          this.charSize,
          this.textureInfo,
          worldMatrix,
          letter.x + charInfo.offsetX,
          letter.y + charInfo.offsetY
        );
      }
    }
  };

  // src/test1/MainScene.ts
  var _collisionService_dec2, _a2, _MainScene_decorators, _init3;
  _MainScene_decorators = [DI.Injectable()];
  var MainScene = class extends (_a2 = Scene, _collisionService_dec2 = [DI.Inject(() => CollisionService)], _a2) {
    constructor(app2) {
      super(app2);
      this.collisionService = __runInitializers(_init3, 8, this), __runInitializers(_init3, 11, this);
      this.hero = void 0;
      this.cameraFollowStrategy = new LookAheadFollowStrategy(100, 6, 4);
      this.bgColor.fromCssColor("#686868");
    }
    onPreloadStarted() {
      this.app.assetManager.setBaseUrl("test1/assets").add("tileset", "image", "tiles.png").add("tilemap", "json", "map.json").add("cat", "image", "hero.png").add("cat-sprite-sheet", "json", "hero.json");
    }
    onProgress(percents) {
      super.onProgress(percents);
      console.log(percents);
    }
    onReady() {
    console.log("----------------onReady-----------------------------");
      {
        const tiledFile = this.app.assetManager.getJson("tilemap");
        console.log({tiledFile});
        console.log(typeof tiledFile);
        const tileTexture = GLUtils.createTextureFromImage(this.app.assetManager.getImage("tileset"));
        console.log({tileTexture});
        const tiledData = TileMaps.fromTiledTileMap(tiledFile, [
          "backgroundLayer",
          "foregroundLayer"
        ], "tiles");
        console.log({tiledData});
        const tileMap = new TileMap(this, tiledData.layers, tiledData.mapWidthInTiles, tiledData.tilesetCols, tiledData.tilesetRows, tileTexture);
        console.log({tileMap});
        const solidTiles = JSON.parse(TileMaps.getTiledMapCustomProperty(tiledFile, "solidTiles")?.value ?? "");
        console.log({solidTiles});
        tileMap.createCollisionBodies(solidTiles, {
          collisionGroup: this.collisionService.rigidBodyGroup
        });
        console.log("before addObject");
        this.addObject(tileMap);
        console.log("after addObject");
      }

      console.log("------------------1--------------------------------");

      {
        const platform = new Rectangle(this);
        this.addObject(platform);
        platform.size.wh(400, 50);
        platform.position.xy(100, 450);
        platform.color.rgb(120, 0, 0);
        platform.body = this.app.physics.createRigidBody({
          type: 0 /* STATIC */,
          target: platform,
          collisionGroup: this.collisionService.rigidBodyGroup,
          collideWithGroup: this.collisionService.rigidBodyGroup
        });
      }

      console.log("------------------2--------------------------------");

      {
        const platform = new Rectangle(this);
        this.addObject(platform);
        platform.size.wh(50, 50);
        platform.position.xy(230, 250);
        platform.color.rgb(120, 0, 0);
        platform.body = this.app.physics.createRigidBody({
          target: platform,
          type: 1 /* DYNAMIC */,
          collisionGroup: this.collisionService.rigidBodyGroup,
          collideWithGroup: this.collisionService.rigidBodyGroup
        });
      }
      {
        const platform = new Rectangle(this);
        this.addObject(platform);
        platform.size.wh(50, 30);
        platform.position.xy(310, 210);
        platform.color.rgb(120, 0, 0);
        platform.body = this.app.physics.createRigidBody({
          target: platform,
          type: 1 /* DYNAMIC */,
          collisionGroup: this.collisionService.rigidBodyGroup,
          collideWithGroup: this.collisionService.rigidBodyGroup
        });
      }
      {
        const platform = new Rectangle(this);
        this.addObject(platform);
        platform.size.wh(50, 30);
        platform.position.xy(310, 210);
        platform.color.rgb(120, 0, 0);
        platform.body = this.app.physics.createRigidBody({
          target: platform,
          type: 2 /* KINEMATIC */,
          velocity: new Vector2(10, 0),
          collisionGroup: this.collisionService.rigidBodyGroup,
          collideWithGroup: this.collisionService.rigidBodyGroup
        });
      }
      {
        const platform = new Rectangle(this);
        this.addObject(platform);
        platform.size.wh(50, 30);
        platform.position.xy(90, 210);
        platform.color.rgb(0, 233, 0);
        platform.body = this.app.physics.createRigidBody({
          target: platform,
          type: 2 /* KINEMATIC */,
          velocity: new Vector2(0, -10),
          collisionGroup: this.collisionService.rigidBodyGroup,
          collideWithGroup: this.collisionService.rigidBodyGroup
        });
      }
      {
        const platform = new Rectangle(this);
        this.addObject(platform);
        platform.size.wh(50, 30);
        platform.position.xy(100, 200);
        platform.color.rgb(0, 233, 0);
        platform.body = this.app.physics.createRigidBody({
          target: platform,
          type: 2 /* KINEMATIC */,
          velocity: new Vector2(0, 10),
          collisionGroup: this.collisionService.rigidBodyGroup,
          collideWithGroup: this.collisionService.rigidBodyGroup
        });
      }

      const catTexture = GLUtils.createTextureFromImage(this.app.assetManager.getImage("cat"));
      const catSpriteSheet = this.app.assetManager.getJson("cat-sprite-sheet");
      const animatedCat = new HeroGameObject(this, catTexture, catSpriteSheet);
      this.addObject(animatedCat);
      this.app.camera.followTarget = animatedCat;
      this.app.camera.followStrategy = this.cameraFollowStrategy;
      this.hero = animatedCat;
      this.calculateBounds();
      this.input.keyboard.onKeyDown("KeyX" /* X */, () => {
        const platform = new Rectangle(this);
        this.addObject(platform);
        platform.size.wh(50, 30);
        platform.position.xy(MathEx.randomInt(0, this.size.w), MathEx.randomInt(0, 50));
        platform.color.rgba(MathEx.randomInt(100, 255), MathEx.randomInt(100, 255), MathEx.randomInt(100, 255), MathEx.randomInt(100, 255));
        platform.body = this.app.physics.createRigidBody({
          target: platform,
          type: 1 /* DYNAMIC */,
          collisionGroup: this.collisionService.rigidBodyGroup,
          collideWithGroup: this.collisionService.rigidBodyGroup
        });
      });


      console.log("------------------done---------------------------");

    }
    onUpdate(dt) {
      super.onUpdate(dt);
      if (!this.hero) return;
      if (this.input.keyboard.isPressed("ArrowRight" /* RIGHT */)) {
        this.hero.scale.x = 1;
        this.hero.pivot.x = 0;
        const accepted = this.hero.animationStateMachine.sendCommand("walk");
        if (accepted) {
          this.cameraFollowStrategy.lookDirectionX = "right";
          this.cameraFollowStrategy.lookDirectionY = "none";
        }
      } else if (this.input.keyboard.justReleased("ArrowRight" /* RIGHT */)) {
        this.hero.animationStateMachine.sendCommand("stop");
        this.hero.getRigidBody().velocity.x = 0;
      }
      if (this.input.keyboard.isPressed("ArrowLeft" /* LEFT */)) {
        this.hero.scale.x = -1;
        this.hero.pivot.x = 64;
        const accepted = this.hero.animationStateMachine.sendCommand("walk");
        if (accepted) {
          this.cameraFollowStrategy.lookDirectionX = "left";
          this.cameraFollowStrategy.lookDirectionY = "none";
        }
      } else if (this.input.keyboard.justReleased("ArrowLeft" /* LEFT */)) {
        this.hero.animationStateMachine.sendCommand("stop");
        this.hero.getRigidBody().velocity.x = 0;
      }
      if (this.input.keyboard.isPressed("ArrowDown" /* DOWN */)) {
        const accepted = this.hero.animationStateMachine.sendCommand("sit");
        if (accepted) {
          this.cameraFollowStrategy.lookDirectionY = "bottom";
        }
      } else if (this.input.keyboard.justReleased("ArrowDown" /* DOWN */)) {
        const accepted = this.hero.animationStateMachine.sendCommand("stopSit");
        if (accepted) {
          this.cameraFollowStrategy.lookDirectionY = "none";
        }
      }
      if (this.input.keyboard.isPressed("ArrowUp" /* UP */)) {
        const accepted = this.hero.animationStateMachine.sendCommand("lookUp");
        if (accepted) {
          this.cameraFollowStrategy.lookDirectionY = "top";
        }
      } else if (this.input.keyboard.justReleased("ArrowUp" /* UP */)) {
        const accepted = this.hero.animationStateMachine.sendCommand("stopLookUp");
        if (accepted) {
          this.cameraFollowStrategy.lookDirectionY = "none";
        }
      }
      if (this.input.keyboard.isPressed("KeyZ" /* Z */)) {
        this.hero.animationStateMachine.sendCommand("attack1");
      }
      if (this.input.keyboard.isPressed("KeyX" /* X */)) {
        this.hero.animationStateMachine.sendCommand("attack2");
      }
      if (this.input.keyboard.isPressed("KeyA" /* A */)) {
        this.hero.animationStateMachine.sendCommand("fire");
      }
      if (this.input.keyboard.isPressed("Space" /* SPACE */) && this.hero.getRigidBody().onGround()) {
        this.hero.getRigidBody().jump(-350);
      }
      if (this.hero.getRigidBody().onGround()) {
        this.hero.animationStateMachine.sendCommand("ground");
      } else {
        this.hero.animationStateMachine.sendCommand("unground");
      }
    }
  };
  _init3 = __decoratorStart(_a2);
  __decorateElement(_init3, 5, "collisionService", _collisionService_dec2, MainScene);
  MainScene = __decorateElement(_init3, 0, "MainScene", _MainScene_decorators, MainScene);
  __runInitializers(_init3, 1, MainScene);

  console.log("===============1====================");

  // src/index.ts
  var app = new VEngineLiteApplication(
    document.getElementById("#c"),
    new Size(740, 480),
    new ScaleStrategyFitCanvasToScreen()
  );
  app.runScene(new MainScene(app));

})();
