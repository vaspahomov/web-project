/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./sw.js",['./workbox-3b38d5bd'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  importScripts();
  workbox.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "/_next/static/runtime/amp.js",
    "revision": "d8d18f34871a0b2bc0bc2abd0b97418f"
  }, {
    "url": "/_next/static/runtime/amp.js.map",
    "revision": "3407eb7a729e4472a0c70e85594fcafe"
  }, {
    "url": "/_next/static/runtime/main.js",
    "revision": "3a61e11aec367e9fe047fc5c904dd0d2"
  }, {
    "url": "/_next/static/runtime/main.js.map",
    "revision": "a1083f53fec08d39d5503070e6bc5ea6"
  }, {
    "url": "/_next/static/runtime/polyfills.js",
    "revision": "fce25b578d63c14668ee1886e3062b32"
  }, {
    "url": "/_next/static/runtime/polyfills.js.map",
    "revision": "82dca635a629d8ab38c3ad85b2ad65a2"
  }, {
    "url": "/_next/static/runtime/react-refresh.js",
    "revision": "54c9a5691fdf87a6167a360bc5a2ddd5"
  }, {
    "url": "/_next/static/runtime/react-refresh.js.map",
    "revision": "ad6fee1ed9f6f6f31cfdf57cc8720893"
  }, {
    "url": "/_next/static/runtime/webpack.js",
    "revision": "c933c3273c6dc93ba89e0420e79f8b96"
  }, {
    "url": "/_next/static/runtime/webpack.js.map",
    "revision": "df1710902cb38f07bf97d419f8d298e2"
  }], {
    "ignoreURLParametersMatching": [/ts/]
  });
  workbox.cleanupOutdatedCaches();

});
//# sourceMappingURL=sw.js.map
