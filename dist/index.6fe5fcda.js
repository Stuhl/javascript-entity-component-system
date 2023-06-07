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
})({"Vu5rp":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "f3938d746fe5fcda";
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

},{}],"dPYp5":[function(require,module,exports) {
var _index = require("./index");
// setup
const ECS = new (0, _index.EntityComponentSystem)();
const canvas = document.getElementById("game-canvas");
const positionComponent = {
    name: "position",
    state: {
        x: 0,
        y: 0
    }
};
const boxComponent = {
    name: "box",
    state: {
        width: 20,
        height: 20
    }
};
const playerBox = {
    name: "playerBox",
    state: {
        width: 10,
        height: 10
    }
};
const jitterComponent = {
    name: "jitter"
};
let xDirecton = 0;
let yDirection = 0;
let isSpacebar = false;
const controlComponent = {
    name: "control",
    state: {
        moveSpeed: 2,
        runSpeed: 5,
        controlsID: null
    },
    onAttach () {
        const keys = {};
        const id = setInterval(()=>{
            if (keys["ArrowLeft"]) xDirecton = -1;
            if (keys["ArrowRight"]) xDirecton = 1;
            if (keys["ArrowUp"]) yDirection = -1;
            if (keys["ArrowDown"]) yDirection = 1;
            if (keys[" "]) isSpacebar = true;
        }, 20);
        this.controlsID = id;
        document.addEventListener("keydown", (event)=>{
            keys[event.key] = true;
        });
        document.addEventListener("keyup", (event)=>{
            delete keys[event.key];
            if (!keys["ArrowLeft"]) xDirecton = 0;
            if (!keys["ArrowRight"]) xDirecton = 0;
            if (!keys["ArrowUp"]) yDirection = 0;
            if (!keys["ArrowDown"]) yDirection = 0;
            if (!keys[" "]) isSpacebar = false;
        });
    }
};
const growComponent = {
    name: "growEffect",
    state: {
        growSpeed: 0.1,
        maxGrowSize: 50
    }
};
const collisionComponent = {
    name: "onCollisionDeleteComponent"
};
let isGrowEffectChecked = true;
let isJitterChecked = true;
let isFlashColorChecked = true;
const collisionProcessor = {
    name: "onCollisionDeleteProcessor",
    target: "onCollisionDeleteComponent",
    update (component, entities) {
        entities.forEach((entity)=>{
            const allEntities = ECS.getEntities();
            for (let targetEntity of allEntities){
                const isPlayer = targetEntity.name === "Player";
                if (!isPlayer) continue;
                const targetPosition = ECS.entityHasComponent(targetEntity, "position");
                const targetRenderer = ECS.entityHasComponent(targetEntity, "box") || ECS.entityHasComponent(targetEntity, "playerBox");
                const hasPosition = ECS.entityHasComponent(entity, "position");
                const hasRenderer = ECS.entityHasComponent(entity, "box") || ECS.entityHasComponent(entity, "playerBox");
                const hasCollision = ECS.entityHasComponent(entity, "onCollisionDeleteComponent");
                const isSelf = targetEntity === entity;
                if (!hasPosition || !hasRenderer || isSelf || !targetPosition || !targetRenderer || !hasCollision) continue;
                const x = entity.state.x;
                const y = entity.state.y;
                const width = entity.state.width;
                const height = entity.state.height;
                const targetX = targetEntity.state.x;
                const targetY = targetEntity.state.y;
                const targetWidth = targetEntity.state.width;
                const targetHeight = targetEntity.state.height;
                const xCollision = x + width >= targetX && x <= targetX + targetWidth;
                const yCollision = y + height >= targetY && y <= targetY + targetHeight;
                if (xCollision && yCollision) {
                    ECS.removeComponentFromEntity(entity, "onCollisionDeleteComponent");
                    if (isGrowEffectChecked) ECS.addComponentToEntity(entity, "growEffect");
                    if (isJitterChecked) ECS.addComponentToEntity(entity, "jitter");
                    if (isFlashColorChecked) ECS.addComponentToEntity(entity, "flashColor");
                }
            }
        });
    }
};
const growProcesssor = {
    name: "growProcessor",
    target: "growEffect",
    update (component, entities) {
        entities.forEach((entity)=>{
            entity.state.width += entity.state.growSpeed * (Math.random() * 5);
            entity.state.height += entity.state.growSpeed * (Math.random() * 5);
            if (entity.state.width > entity.state.maxGrowSize) {
                ECS.removeEntity(entity);
                score += 10;
            }
        });
    }
};
const controlProcessor = {
    name: "controlProcessor",
    target: "control",
    update (component, entities) {
        entities.forEach((entity)=>{
            entity.state.x += xDirecton * entity.state.moveSpeed;
            entity.state.y += yDirection * entity.state.moveSpeed;
            if (isSpacebar && xDirecton) entity.state.x += xDirecton * entity.state.runSpeed;
            if (isSpacebar && yDirection) entity.state.y += yDirection * entity.state.runSpeed;
        });
    }
};
const jitterProcessor = {
    name: "jitterProcessor",
    target: "jitter",
    update (component, entities) {
        entities.forEach((entity)=>{
            const currentX = entity.state.x;
            const currentY = entity.state.y;
            const newX = Math.random() * 10 - 5 + currentX;
            const newY = Math.random() * 10 - 5 + currentY;
            entity.state.x = newX;
            entity.state.y = newY;
        });
    }
};
const boxRenderingProcessor = {
    name: "boxRenderingProcessor",
    target: "box",
    update (component, entities) {
        entities.forEach((entity)=>{
            const hasFlashColor = ECS.entityHasComponent(entity, "flashColor");
            ctx.translate(entity.state.x, entity.state.y);
            ctx.fillStyle = hasFlashColor ? entity.state.flashColorCurrent : "orange";
            ctx.fillRect(0, 0, entity.state.width, entity.state.height);
            ctx.translate(-entity.state.x, -entity.state.y);
        });
    }
};
const playerBoxRenderingProcessor = {
    name: "playerBoxRenderingProcessor",
    target: "playerBox",
    update (component, entities) {
        entities.forEach((entity)=>{
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillRect(entity.state.x, entity.state.y, entity.state.width, entity.state.height);
            ctx.closePath();
        });
    }
};
const flashColorComponent = {
    name: "flashColor",
    state: {
        flashColorTimer: 0,
        flashColorSpeed: 200,
        flashColor1: "white",
        flashColor2: "red",
        flashColorCurrent: "red"
    }
};
const flashColorProcessor = {
    name: "flashColorProcessor",
    target: "flashColor",
    update (component, entities) {
        entities.forEach((entity)=>{
            entity.state.flashColorTimer += 20;
            if (entity.state.flashColorTimer >= entity.state.flashColorSpeed) {
                entity.state.flashColorTimer = 0;
                entity.state.flashColorCurrent = entity.state.flashColorCurrent === entity.state.flashColor1 ? entity.state.flashColor2 : entity.state.flashColor1;
            }
        });
    }
};
ECS.addComponent(positionComponent);
ECS.addComponent(boxComponent);
ECS.addComponent(jitterComponent);
ECS.addComponent(controlComponent);
ECS.addComponent(playerBox);
ECS.addComponent(growComponent);
ECS.addComponent(collisionComponent);
ECS.addComponent(flashColorComponent);
ECS.addProcessor(flashColorProcessor);
ECS.addProcessor(collisionProcessor);
ECS.addProcessor(growProcesssor);
ECS.addProcessor(jitterProcessor);
ECS.addProcessor(boxRenderingProcessor);
ECS.addProcessor(controlProcessor);
ECS.addProcessor(playerBoxRenderingProcessor);
const create100Boxes = ()=>{
    for(let i = 0; i < 100; i++){
        const box = ECS.createEntity("enemy", [
            "position",
            "box",
            "onCollisionDeleteComponent"
        ]);
        box.state.x = Math.random() * canvas.width;
        box.state.y = Math.random() * canvas.height;
        ECS.addEntity(box);
    }
};
const createPlayerBox = ()=>{
    const playerBox = ECS.createEntity("Player", [
        "position",
        "playerBox",
        "control"
    ]);
    playerBox.state.x = canvas.width / 2;
    playerBox.state.y = canvas.height / 2;
    ECS.addEntity(playerBox);
};
const updatePlayerCodeSnippet = ()=>{
    const element = document.getElementById("player-code-snippet");
    const newSnippet = getPlayerCodeSnippet();
    element.innerHTML = newSnippet;
};
const getPlayerCodeSnippet = ()=>{
    const player = ECS.getEntity("Player");
    const components = player.components.filter((comp)=>comp !== "position").toString().replace(/,/ig, ", ");
    return `player components: [${components}])`;
};
const updateEnemyCodeSnippet = ()=>{
    const element = document.getElementById("enemy-code-snippet");
    const newSnippet = getEnemyCodeSnippet();
    element.innerHTML = newSnippet;
};
const getEnemyCodeSnippet = ()=>{
    const enemy = ECS.getEntity("enemy");
    const components = enemy.components.filter((comp)=>comp !== "position").toString().replace(/,/ig, ", ");
    return `enemy components: [${components}]`;
};
canvas.width = 500;
canvas.height = 500;
canvas.style.backgroundColor = "black";
const ctx = canvas.getContext("2d");
let score = 0;
const gameloop = ()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ECS.update();
    ctx.font = "30px Comis-Sans";
    ctx.fillText("Score:", 30, 30);
    ctx.fillText(String(score), 110, 32);
    requestAnimationFrame(gameloop);
};
create100Boxes();
createPlayerBox();
updatePlayerCodeSnippet();
updateEnemyCodeSnippet();
gameloop();
const playerRendererCheckbox = document.getElementById("player-renderer");
const playerRendererContainer = document.getElementById("player-renderer-container");
const playerRendererSize = document.getElementById("player-renderer-size");
const playerControlsCheckbox = document.getElementById("player-controls");
const playerControlsContainer = document.getElementById("player-controls-container");
const playerControlsSpeed = document.getElementById("player-controls-speed");
const playerControlsRunSpeed = document.getElementById("player-controls-run-speed");
playerRendererCheckbox.addEventListener("change", ()=>{
    const checkbox = playerRendererCheckbox;
    const isChecked = checkbox.checked;
    const player = ECS.getEntity("Player");
    if (isChecked) {
        playerRendererContainer.style.display = "block";
        ECS.addComponentToEntity(player, "playerBox");
    }
    if (!isChecked) {
        playerRendererContainer.style.display = "none";
        ECS.removeComponentFromEntity(player, "playerBox");
    }
    updatePlayerCodeSnippet();
});
playerRendererSize.addEventListener("change", ()=>{
    const player = ECS.getEntity("Player");
    player.state.height = Number(playerRendererSize.value);
    player.state.width = Number(playerRendererSize.value);
    updatePlayerCodeSnippet();
});
playerControlsCheckbox.addEventListener("change", ()=>{
    const checkbox = playerControlsCheckbox;
    const isChecked = checkbox.checked;
    const player = ECS.getEntity("Player");
    if (isChecked) {
        playerControlsContainer.style.display = "block";
        ECS.addComponentToEntity(player, "control");
    }
    if (!isChecked) {
        playerControlsContainer.style.display = "none";
        ECS.removeComponentFromEntity(player, "control");
    }
    updatePlayerCodeSnippet();
});
playerControlsSpeed.addEventListener("change", ()=>{
    const player = ECS.getEntity("Player");
    player.state.moveSpeed = Number(playerControlsSpeed.value);
    updatePlayerCodeSnippet();
});
playerControlsRunSpeed.addEventListener("change", ()=>{
    const player = ECS.getEntity("Player");
    player.state.runSpeed = Number(playerControlsRunSpeed.value);
    updatePlayerCodeSnippet();
});
const enemyRendererCheckbox = document.getElementById("enemy-renderer");
const enemyRendererContainer = document.getElementById("enemy-renderer-container");
const enemyRendererSize = document.getElementById("enemy-renderer-size");
const enemyCollisionCheckbox = document.getElementById("enemy-collision");
const enemyGrowCheckbox = document.getElementById("enemy-grow");
const enemyGrowContainer = document.getElementById("enemy-grow-container");
const enemyGrowSpeed = document.getElementById("enemy-grow-speed");
const enemyGrowMaxSize = document.getElementById("enemy-grow-maxSize");
const enemyJitterCheckbox = document.getElementById("enemy-jitter");
const enemyColorCheckbox = document.getElementById("enemy-color");
const enemyColorContainer = document.getElementById("enemy-color-container");
const enemyColorSpeed = document.getElementById("enemy-color-speed");
enemyRendererCheckbox.addEventListener("change", ()=>{
    const checkbox = enemyRendererCheckbox;
    const isChecked = checkbox.checked;
    const enemies = ECS.getEntitiesByName("enemy");
    enemies.forEach((enemy)=>{
        if (isChecked) ECS.addComponentToEntity(enemy, "box");
        if (!isChecked) ECS.removeComponentFromEntity(enemy, "box");
    });
    if (isChecked) enemyRendererContainer.style.display = "block";
    if (!isChecked) enemyRendererContainer.style.display = "none";
    updateEnemyCodeSnippet();
});
enemyRendererSize.addEventListener("change", ()=>{
    const enemies = ECS.getEntitiesByName("enemy");
    enemies.forEach((enemy)=>{
        enemy.state.height = Number(enemyRendererSize.value);
        enemy.state.width = Number(enemyRendererSize.value);
    });
    updatePlayerCodeSnippet();
});
enemyCollisionCheckbox.addEventListener("change", ()=>{
    const checkbox = enemyCollisionCheckbox;
    const isChecked = checkbox.checked;
    const enemies = ECS.getEntitiesByName("enemy");
    enemies.forEach((enemy)=>{
        if (isChecked) ECS.removeComponentFromEntity(enemy, "onCollisionDeleteComponent");
        if (!isChecked) ECS.addComponentToEntity(enemy, "onCollisionDeleteComponent");
    });
    updateEnemyCodeSnippet();
});
enemyGrowCheckbox.addEventListener("change", ()=>{
    const checkbox = playerControlsCheckbox;
    const isChecked = checkbox.checked;
    if (isChecked) {
        enemyGrowContainer.style.display = "block";
        isGrowEffectChecked = true;
    }
    if (!isChecked) {
        enemyGrowContainer.style.display = "none";
        isGrowEffectChecked = false;
    }
    updateEnemyCodeSnippet();
});
enemyGrowSpeed.addEventListener("change", ()=>{});
playerControlsSpeed.addEventListener("change", ()=>{
    const player = ECS.getEntity("Player");
    player.state.moveSpeed = Number(playerControlsSpeed.value);
    updatePlayerCodeSnippet();
});
playerControlsRunSpeed.addEventListener("change", ()=>{
    const player = ECS.getEntity("Player");
    player.state.runSpeed = Number(playerControlsRunSpeed.value);
    updatePlayerCodeSnippet();
});

},{"./index":"h7u1C"}],"h7u1C":[function(require,module,exports) {
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
  * Gets registered processor names.
  * @returns All registered processor names in an array.
  */ getProcessorNames() {
        return this.processors.map((processor)=>processor.name);
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
   */ createEntity(name, components) {
        let entity = {
            name,
            components,
            state: {}
        };
        components.forEach((component)=>{
            const foundComponent = this.components.find((ECSComponent)=>component === ECSComponent.name);
            if (!foundComponent) throw new Error(`createEntity(): component ${component} not found. You probably forgot to register the component in the system.`);
            if (foundComponent.onAttach) foundComponent.onAttach();
            entity.state = Object.assign(entity.state, foundComponent.state);
        });
        return entity;
    }
    /**
   * Checks if an entity has target component.
   * @param entity - entity object
   * @param component - Name of component
   * @returns true if entity has the component or false if not
   */ entityHasComponent(entity, component) {
        return entity.components.includes(component);
    }
    /**
   * Removes component from an entity.
   * @param entity - entity object
   * @param component - Name of component
   * @returns Void if operation successful or throw an error.
   */ removeComponentFromEntity(entity, targetComponent) {
        const indexOfComponent = entity.components.indexOf(targetComponent);
        if (indexOfComponent === -1) throw new Error(`removeComponentFromEntity(): component ${targetComponent} not found in entity ${entity.name}`);
        entity.components = entity.components.filter((component)=>component !== targetComponent);
        const component = this.getComponent(targetComponent);
        const keys = Object.keys(component.state);
        keys.forEach((key)=>{
            delete entity[key];
        });
    }
    /**
   * Adds a component to an entity.
   * @param entity - entity object
   * @param component - Name of component
   * @returns Void if operation is successful or throws an error.
   */ addComponentToEntity(entity, component) {
        if (this.entityHasComponent(entity, component)) throw new Error(`addComponentToEntity(): Can't add component ${component} - this entity already has this component.`);
        const isComponentRegistered = this.hasComponent(component);
        if (!isComponentRegistered) throw new Error(`addComponentToEntity(): You can't add component ${component} to entity ${entity}, because the component is not registered.`);
        const targetComponent = this.getComponent(component);
        entity.state = Object.assign(entity.state, targetComponent.state ? targetComponent.state : {});
        entity.components.push(targetComponent.name);
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
        passedComponent.state = component.state ? passedComponent.state : {};
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
        const indexOf = this.entities.indexOf(entity);
        if (indexOf === -1) throw new Error(`removeEntity(): entity "${entity.name}" not found.`);
        this.entities.splice(indexOf, 1);
    }
    /**
   * Gets all entities that have the target component registered.
   * @param componentName - Name of the component
   * @returns All entities in an array.
   */ getEntitiesFromComponent(componentName) {
        return this.entities.filter((entity)=>{
            return entity.components.includes(componentName);
        });
    }
    /**
   * Runs all processors for it's corresponding components e.g. run the prcoessors update function.
   * @returns Void if successful
   */ runProcessors() {
        this.processors.forEach((processor)=>{
            const entities = this.getEntitiesFromComponent(processor.target);
            const component = this.getComponent(processor.target);
            processor.update(component, entities);
        });
    }
    /**
   * Run custom logic of an entity e.g. run entity.update()
   * @returns Void if successful
   */ runCustomLogicOnEntities() {
        this.entities.forEach((entity)=>{
            if (entity.update) entity.update();
        });
    }
    /**
   * Runs all processors. This should be done per frame e.g. inside your gameloop.
   * @returns Void if successful
   */ update() {
        this.runProcessors();
        this.runCustomLogicOnEntities();
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

},{}]},["Vu5rp","dPYp5"], "dPYp5", "parcelRequire325e")

//# sourceMappingURL=index.6fe5fcda.js.map
