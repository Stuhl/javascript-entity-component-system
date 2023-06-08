// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"dqyzF":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "494487f318878ac0";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"lSbv5":[function(require,module,exports) {
var _apiV2 = require("./api_v2");
const ecs = new (0, _apiV2.EntityComponentSystem)();
const positionComponent = {
    name: "position",
    state: {
        x: 0,
        y: 0
    }
};
const massComponent = {
    name: "mass",
    state: {
        mass: 0.2,
        velocityX: 1,
        velocityY: 0
    }
};
const shapeComponent = {
    name: "shape",
    state: {
        size: 10,
        color: "red"
    }
};
const collisionComponent = {
    name: "collision",
    state: {
        collisionX: false,
        collisionY: false
    }
};
const gravityProcessor = {
    name: "gravity_processor",
    required: [
        "position",
        "mass"
    ],
    update (entity, components, processor) {
        const position = components[0];
        const mass = components[1];
        mass.state.velocityY += mass.state.mass;
        position.state.y += mass.state.velocityY;
        position.state.x += mass.state.velocityX;
    }
};
const shapeDrawProcessor = {
    name: "shape_draw_processor",
    required: [
        "position",
        "shape"
    ],
    update (entity, components, processor) {
        const position = components[0];
        const shape = components[1];
        context.translate(position.state.x, position.state.y);
        context.fillStyle = shape.state.color;
        context.fillRect(0, 0, shape.state.size, shape.state.size);
        context.translate(-position.state.x, -position.state.y);
    }
};
const edgeCollisionProcessor = {
    name: "edge_collision_processor",
    required: [
        "position",
        "collision",
        "shape"
    ],
    update (entity, components, processor) {
        const position = components[0];
        const collision = components[1];
        const shape = components[2];
        const x = position.state.x;
        const y = position.state.y;
        const size = shape.state.size;
        if (x <= 0 || x + size >= canvas.width) collision.state.collisionX = true;
        else collision.state.collisionX = false;
        if (y <= 0 || y + size >= canvas.height) collision.state.collisionY = true;
        else collision.state.collisionY = false;
    }
};
const bounceProcessor = {
    name: "bounce_processor",
    required: [
        "position",
        "collision",
        "mass"
    ],
    update (entity, components, processor) {
        const position = components[0];
        const collision = components[1];
        const mass = components[2];
        if (collision.state.collisionY) mass.state.velocityY = -mass.state.velocityY;
        if (collision.state.collisionX) mass.state.velocityX = -mass.state.velocityX;
    }
};
ecs.addComponent(positionComponent);
ecs.addComponent(massComponent);
ecs.addComponent(shapeComponent);
ecs.addComponent(collisionComponent);
ecs.addProcessor(gravityProcessor);
ecs.addProcessor(shapeDrawProcessor);
ecs.addProcessor(edgeCollisionProcessor);
ecs.addProcessor(bounceProcessor);
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const gameloop = ()=>{
    context.clearRect(0, 0, canvas.width, canvas.height);
    ecs.update();
    requestAnimationFrame(gameloop);
};
const addDefaultBox = ()=>{
    const box = ecs.createEntity("box", [
        "position",
        "mass",
        "shape",
        "collision"
    ], [
        "shape_draw_processor",
        "edge_collision_processor",
        "gravity_processor",
        "bounce_processor"
    ]);
    ecs.addEntity(box);
};
const addRandomBox = (amount)=>{
    for(let i = 0; i < amount; i++){
        const box = ecs.createEntity("box", [
            "position",
            "mass",
            "shape",
            "collision"
        ], [
            "shape_draw_processor",
            "edge_collision_processor",
            "gravity_processor",
            "bounce_processor"
        ]);
        const [position, shape, mass] = ecs.getEntityComponents(box, [
            "position",
            "shape",
            "mass"
        ]);
        const colors = [
            "green",
            "blue",
            "orange",
            "red",
            "white"
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomMass = Math.random() * 0.5 + 0.1;
        const randomSize = Math.random() * 30;
        const randomX = Math.random() * canvas.width;
        const randomY = Math.random() * canvas.height;
        position.state.x = randomX;
        position.state.y = randomY;
        shape.state.color = randomColor;
        mass.state.size = randomSize;
        mass.state.mass = randomMass;
        ecs.addEntity(box);
    }
};
const resetState = ()=>{
    const entities = ecs.getEntities();
    for (let entity of entities)ecs.removeEntity(entity);
// addDefaultBox()
};
const randomBoxButton = document.getElementById("random-box-button");
const randomBoxButton50 = document.getElementById("random-box-button-50");
const resetButton = document.getElementById("reset-button");
randomBoxButton.addEventListener("click", ()=>{
    addRandomBox(1);
});
randomBoxButton50.addEventListener("click", ()=>{
    addRandomBox(50);
});
resetButton.addEventListener("click", ()=>{
    resetState();
});
addDefaultBox();
gameloop();

},{"./api_v2":"3rp0D"}],"3rp0D":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * The Entity Component System class.
 */ parcelHelpers.export(exports, "EntityComponentSystem", ()=>EntityComponentSystem);
class EntityComponentSystem {
    constructor(){
        this.components = [];
        this.processors = [];
        this.entities = [];
    }
    /**
   * Gets all registered processors.
   * @returns All registered processors in an array.
   */ getProcessors() {
        return this.processors;
    }
    /**
   * Gets all components processors.
   * @returns All registered components in an array.
   */ getComponents() {
        return this.components;
    }
    /**
   * Gets all registered entities.
   * @returns All registered entities in an array.
   */ getEntities() {
        return this.entities;
    }
    /**
   * Gets a registered processor by name.
   * @param name - Name of the processor
   * @returns A processor or throws an error.
   */ getProcessor(name) {
        const hasProcessor = this.hasProcessor(name);
        if (!hasProcessor) throw new Error(`getProcessor(): processor "${name}" not found.`);
        return this.processors.find((processor)=>processor.name === name);
    }
    /**
   * Gets a registered component by name.
   * @param name - Name of the component
   * @returns A component or throws an error.
   */ getComponent(name) {
        const hasComponent = this.hasComponent(name);
        if (!hasComponent) throw new Error(`getComponent(): component "${name}" not found.`);
        return this.components.find((component)=>component.name === name);
    }
    /**
   * Gets a registered entity by name.
   * @param name -Name of the entity
   * @returns A entity or throws an error. 
   */ getEntity(name) {
        const hasEntity = this.hasEntity(name);
        if (!hasEntity) throw new Error(`getEntity(): entity "${name}" not found.`);
        return this.entities.find((entity)=>entity.name === name);
    }
    /**
   * Gets all registered entities that match the given name.
   * @param name -Name of the entity
   * @returns An array of entities or an empty array.
   */ getEntitiesByName(name) {
        return this.entities.filter((entity)=>entity.name === name);
    }
    getEntityComponents(entity, components) {
        const foundComponents = [];
        const length = entity.components.length;
        for (let currentComponent of components)for(let i = 0; i < length; i++){
            const currentEntityComponent = entity.components[i];
            if (currentEntityComponent.name === currentComponent) foundComponents.push(currentEntityComponent);
        }
        return foundComponents;
    }
    /**
   * Checks if processor is registered by name.
   * @param name - Name of the processor
   * @returns true if found or false if not.
   */ hasProcessor(name) {
        let found = false;
        for (let processor of this.processors)if (processor.name === name) found = true;
        return found;
    }
    /**
   * Checks if component is registered.
   * @param name - Name of the component
   * @returns true if found or false if not.
   */ hasComponent(name) {
        let found = false;
        for (let component of this.components)if (component.name === name) found = true;
        return found;
    }
    /**
   * Checks if entity is registered.
   * @param name - Name of the entity
   * @returns true if found or false if not.
   */ hasEntity(name) {
        let found = false;
        for (let entity of this.entities)if (entity.name === name) found = true;
        return found;
    }
    /**
   * Composes a entity with given components.
   * @param name - Name of the entity
   * @param components - An array of component names
   * @returns The composed entity or throws an error.
   */ createEntity(name, components, processors) {
        let entity = {
            name,
            components: [],
            processors: []
        };
        components.forEach((componentName)=>{
            const foundComponent = this.getComponent(componentName);
            const copy = JSON.parse(JSON.stringify(foundComponent));
            if (copy.onAttach) foundComponent.onAttach();
            entity.components.push(copy);
        });
        processors.forEach((processorName)=>{
            const foundProcessor = this.getProcessor(processorName);
            entity.processors.push(foundProcessor);
        });
        return entity;
    }
    /**
   * Checks if an entity has target component.
   * @param entity - entity object
   * @param component - Name of component
   * @returns true if entity has the component or false if not
   */ entityHasComponent(entity, component) {
        const length = entity.components.length;
        for(let i = 0; i < length; i++){
            if (entity.components[i].name === component) return true;
        }
        return false;
    }
    entityHasProcessor(entity, processor) {
        const length = entity.processors.length;
        for(let i = 0; i < length; i++){
            if (entity.processors[i].name === processor) return true;
        }
        return false;
    }
    /**
   * Removes component from an entity.
   * @param entity - entity object
   * @param component - Name of component
   * @returns Void if operation successful or throw an error.
   */ removeComponentFromEntity(entity, component) {
        if (!this.entityHasComponent(entity, component)) throw new Error(`removeComponentFromEntity(): component ${component} not found in entity ${entity.name}`);
        let index = null;
        const length = entity.components.length;
        for(let i = 0; i < length; i++)if (entity.components[i].name === component) {
            index = i;
            break;
        }
        entity.components.splice(index, 1);
    }
    /**
   * Adds a component to an entity.
   * @param entity - entity object
   * @param component - Name of component
   * @returns Void if operation is successful or throws an error.
   */ addComponentToEntity(entity, component) {
        if (this.entityHasComponent(entity, component)) throw new Error(`addComponentToEntity(): Can't add component ${component} - this entity already has this component.`);
        if (!this.hasComponent(component)) throw new Error(`addComponentToEntity(): You can't add component ${component} to entity ${entity}, because the component is not registered.`);
        entity.components.push(this.getComponent(component));
    }
    /**
   * Adds a entity to the system.
   * @param entity - entity object
   * @returns Void if successful
   */ addEntity(entity) {
        this.entities.push(entity);
    }
    /**
   * Adds a component to the system.
   * @param component - component object
   * @returns Void if successful
   */ addComponent(component) {
        const passedComponent = component;
        if (passedComponent.onAttach) passedComponent.onAttach();
        this.components.push(passedComponent);
    }
    /**
   * Adds a processor to the system.
   * @param processor - processor object
   * @returns Void if successful
   */ addProcessor(processor) {
        this.processors.push(processor);
    }
    /**
   * Removes an entity from the system.
   * @param entity - entity object
   * @returns Void if successful or throws an error.
   */ removeEntity(entity) {
        const length = this.entities.length;
        for(let i = 0; i < length; i++)if (this.entities[i] === entity) {
            this.entities.splice(i, 1);
            return;
        }
        throw new Error(`removeEntity(): entity "${entity.name}" not found.`);
    }
    /**
   * Gets all entities that have the target component registered.
   * @param componentName - Name of the component
   * @returns All entities in an array.
   */ getEntitiesFromRequiredComponents(components) {
        const entities = [];
        let entitiesAmount = this.entities.length;
        for(let i = 0; i < entitiesAmount; i++){
            const currentEntity = this.entities[i];
            let hasAllComponents = true;
            for(let j = 0; j < components.length; j++){
                const currentComponent = components[j];
                if (!this.entityHasComponent(currentEntity, currentComponent)) {
                    hasAllComponents = false;
                    break;
                }
            }
            if (hasAllComponents) entities.push(currentEntity);
        }
        return entities;
    }
    /**
   * Runs all processors for it's corresponding components e.g. run the prcoessors update function.
   * @returns Void if successful
   */ runProcessors() {
        this.processors.forEach((processor)=>{
            const entities = this.getEntitiesFromRequiredComponents(processor.required);
            const entityAmount = entities.length;
            for(let i = 0; i < entityAmount; i++){
                const currentEntity = entities[i];
                const hasProcessor = this.entityHasProcessor(currentEntity, processor.name);
                if (hasProcessor) {
                    const components = this.getEntityComponents(currentEntity, processor.required);
                    processor.update(currentEntity, components, processor);
                }
            }
        });
    }
    /**
   * Runs all processors. This should be done per frame e.g. inside your gameloop.
   * @returns Void if successful
   */ update() {
        this.runProcessors();
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["dqyzF","lSbv5"], "lSbv5", "parcelRequire325e")

//# sourceMappingURL=index.18878ac0.js.map
