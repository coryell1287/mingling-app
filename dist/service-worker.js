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
define("./service-worker.js",['./workbox-87e1096a'], function (workbox) { 'use strict';

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

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "app.5e8d3f63fa7693699490.js",
    "revision": null
  }, {
    "url": "assets/icons/favicon.ico",
    "revision": "9e328a54ce3c0ca6a2a127706b2912d0"
  }, {
    "url": "assets/images/plant.webp",
    "revision": "a38e17f9a3e0026d1d5448ff9a030a08"
  }, {
    "url": "common-components_Home_index_tsx.aab3cc0acbc7fc625aae.hot-update.js",
    "revision": null
  }, {
    "url": "common-components_Home_index_tsx.d31de0b76cae184cd76b.js",
    "revision": null
  }, {
    "url": "manifest.webmanifest",
    "revision": "5bae3c998fc87d2e617d9d93aa8bf6b6"
  }, {
    "url": "runtime.aab3cc0acbc7fc625aae.hot-update.js",
    "revision": null
  }, {
    "url": "runtime.aab3cc0acbc7fc625aae.hot-update.json",
    "revision": null
  }, {
    "url": "runtime.bd45ed95bde574bb859d.js",
    "revision": null
  }], {});
  workbox.registerRoute(/.(?:png|jpg|jpeg|svg)$/, new workbox.CacheFirst({
    "cacheName": "images",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      purgeOnQuotaError: true
    })]
  }), 'GET');

});
//# sourceMappingURL=service-worker.js.map
