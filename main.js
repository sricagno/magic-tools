"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/regenerator-runtime@0.13.11/node_modules/regenerator-runtime/runtime.js
var require_runtime = __commonJS({
  "node_modules/.pnpm/regenerator-runtime@0.13.11/node_modules/regenerator-runtime/runtime.js"(exports, module2) {
    var runtime = (function(exports2) {
      "use strict";
      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
      };
      var undefined;
      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
      function define(obj, key, value) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
        return obj[key];
      }
      try {
        define({}, "");
      } catch (err) {
        define = function(obj, key, value) {
          return obj[key] = value;
        };
      }
      function wrap(innerFn, outerFn, self, tryLocsList) {
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);
        defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) });
        return generator;
      }
      exports2.wrap = wrap;
      function tryCatch(fn, obj, arg) {
        try {
          return { type: "normal", arg: fn.call(obj, arg) };
        } catch (err) {
          return { type: "throw", arg: err };
        }
      }
      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed";
      var ContinueSentinel = {};
      function Generator() {
      }
      function GeneratorFunction() {
      }
      function GeneratorFunctionPrototype() {
      }
      var IteratorPrototype = {};
      define(IteratorPrototype, iteratorSymbol, function() {
        return this;
      });
      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
      if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        IteratorPrototype = NativeIteratorPrototype;
      }
      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = GeneratorFunctionPrototype;
      defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
      defineProperty(
        GeneratorFunctionPrototype,
        "constructor",
        { value: GeneratorFunction, configurable: true }
      );
      GeneratorFunction.displayName = define(
        GeneratorFunctionPrototype,
        toStringTagSymbol,
        "GeneratorFunction"
      );
      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function(method) {
          define(prototype, method, function(arg) {
            return this._invoke(method, arg);
          });
        });
      }
      exports2.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
      };
      exports2.mark = function(genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;
          define(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
      };
      exports2.awrap = function(arg) {
        return { __await: arg };
      };
      function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);
          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;
            if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
              return PromiseImpl.resolve(value.__await).then(function(value2) {
                invoke("next", value2, resolve, reject);
              }, function(err) {
                invoke("throw", err, resolve, reject);
              });
            }
            return PromiseImpl.resolve(value).then(function(unwrapped) {
              result.value = unwrapped;
              resolve(result);
            }, function(error) {
              return invoke("throw", error, resolve, reject);
            });
          }
        }
        var previousPromise;
        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function(resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(
            callInvokeWithMethodAndArg,
            // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg
          ) : callInvokeWithMethodAndArg();
        }
        defineProperty(this, "_invoke", { value: enqueue });
      }
      defineIteratorMethods(AsyncIterator.prototype);
      define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
      });
      exports2.AsyncIterator = AsyncIterator;
      exports2.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(
          wrap(innerFn, outerFn, self, tryLocsList),
          PromiseImpl
        );
        return exports2.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
      };
      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }
          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            }
            return doneResult();
          }
          context.method = method;
          context.arg = arg;
          while (true) {
            var delegate = context.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }
            if (context.method === "next") {
              context.sent = context._sent = context.arg;
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }
              context.dispatchException(context.arg);
            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }
            state = GenStateExecuting;
            var record = tryCatch(innerFn, self, context);
            if (record.type === "normal") {
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;
              if (record.arg === ContinueSentinel) {
                continue;
              }
              return {
                value: record.arg,
                done: context.done
              };
            } else if (record.type === "throw") {
              state = GenStateCompleted;
              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      }
      function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method;
        var method = delegate.iterator[methodName];
        if (method === undefined) {
          context.delegate = null;
          if (methodName === "throw" && delegate.iterator["return"]) {
            context.method = "return";
            context.arg = undefined;
            maybeInvokeDelegate(delegate, context);
            if (context.method === "throw") {
              return ContinueSentinel;
            }
          }
          if (methodName !== "return") {
            context.method = "throw";
            context.arg = new TypeError(
              "The iterator does not provide a '" + methodName + "' method"
            );
          }
          return ContinueSentinel;
        }
        var record = tryCatch(method, delegate.iterator, context.arg);
        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }
        var info = record.arg;
        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }
        if (info.done) {
          context[delegate.resultName] = info.value;
          context.next = delegate.nextLoc;
          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined;
          }
        } else {
          return info;
        }
        context.delegate = null;
        return ContinueSentinel;
      }
      defineIteratorMethods(Gp);
      define(Gp, toStringTagSymbol, "Generator");
      define(Gp, iteratorSymbol, function() {
        return this;
      });
      define(Gp, "toString", function() {
        return "[object Generator]";
      });
      function pushTryEntry(locs) {
        var entry = { tryLoc: locs[0] };
        if (1 in locs) {
          entry.catchLoc = locs[1];
        }
        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }
        this.tryEntries.push(entry);
      }
      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }
      function Context(tryLocsList) {
        this.tryEntries = [{ tryLoc: "root" }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }
      exports2.keys = function(val) {
        var object = Object(val);
        var keys = [];
        for (var key in object) {
          keys.push(key);
        }
        keys.reverse();
        return function next() {
          while (keys.length) {
            var key2 = keys.pop();
            if (key2 in object) {
              next.value = key2;
              next.done = false;
              return next;
            }
          }
          next.done = true;
          return next;
        };
      };
      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];
          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }
          if (typeof iterable.next === "function") {
            return iterable;
          }
          if (!isNaN(iterable.length)) {
            var i = -1, next = function next2() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next2.value = iterable[i];
                  next2.done = false;
                  return next2;
                }
              }
              next2.value = undefined;
              next2.done = true;
              return next2;
            };
            return next.next = next;
          }
        }
        return { next: doneResult };
      }
      exports2.values = values;
      function doneResult() {
        return { value: undefined, done: true };
      }
      Context.prototype = {
        constructor: Context,
        reset: function(skipTempReset) {
          this.prev = 0;
          this.next = 0;
          this.sent = this._sent = undefined;
          this.done = false;
          this.delegate = null;
          this.method = "next";
          this.arg = undefined;
          this.tryEntries.forEach(resetTryEntry);
          if (!skipTempReset) {
            for (var name in this) {
              if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined;
              }
            }
          }
        },
        stop: function() {
          this.done = true;
          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;
          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }
          return this.rval;
        },
        dispatchException: function(exception) {
          if (this.done) {
            throw exception;
          }
          var context = this;
          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;
            if (caught) {
              context.method = "next";
              context.arg = undefined;
            }
            return !!caught;
          }
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;
            if (entry.tryLoc === "root") {
              return handle("end");
            }
            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");
              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },
        abrupt: function(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }
          if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
            finallyEntry = null;
          }
          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;
          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }
          return this.complete(record);
        },
        complete: function(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }
          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }
          return ContinueSentinel;
        },
        finish: function(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },
        "catch": function(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;
              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }
              return thrown;
            }
          }
          throw new Error("illegal catch attempt");
        },
        delegateYield: function(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName,
            nextLoc
          };
          if (this.method === "next") {
            this.arg = undefined;
          }
          return ContinueSentinel;
        }
      };
      return exports2;
    })(
      // If this script is executing as a CommonJS module, use module.exports
      // as the regeneratorRuntime namespace. Otherwise create a new empty
      // object. Either way, the resulting object will be used to initialize
      // the regeneratorRuntime variable at the top of this file.
      typeof module2 === "object" ? module2.exports : {}
    );
    try {
      regeneratorRuntime = runtime;
    } catch (accidentalStrictMode) {
      if (typeof globalThis === "object") {
        globalThis.regeneratorRuntime = runtime;
      } else {
        Function("r", "regeneratorRuntime = r")(runtime);
      }
    }
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/utils/getId.js
var require_getId = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/utils/getId.js"(exports, module2) {
    "use strict";
    module2.exports = (prefix, cnt) => `${prefix}-${cnt}-${Math.random().toString(16).slice(3, 8)}`;
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/createJob.js
var require_createJob = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/createJob.js"(exports, module2) {
    "use strict";
    var getId = require_getId();
    var jobCounter = 0;
    module2.exports = ({
      id: _id,
      action,
      payload = {}
    }) => {
      let id = _id;
      if (typeof id === "undefined") {
        id = getId("Job", jobCounter);
        jobCounter += 1;
      }
      return {
        id,
        action,
        payload
      };
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/utils/log.js
var require_log = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/utils/log.js"(exports) {
    "use strict";
    var logging = false;
    exports.logging = logging;
    exports.setLogging = (_logging) => {
      logging = _logging;
    };
    exports.log = (...args) => logging ? console.log.apply(exports, args) : null;
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/createScheduler.js
var require_createScheduler = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/createScheduler.js"(exports, module2) {
    "use strict";
    var createJob = require_createJob();
    var { log } = require_log();
    var getId = require_getId();
    var schedulerCounter = 0;
    module2.exports = () => {
      const id = getId("Scheduler", schedulerCounter);
      const workers = {};
      const runningWorkers = {};
      let jobQueue = [];
      schedulerCounter += 1;
      const getQueueLen = () => jobQueue.length;
      const getNumWorkers = () => Object.keys(workers).length;
      const dequeue = () => {
        if (jobQueue.length !== 0) {
          const wIds = Object.keys(workers);
          for (let i = 0; i < wIds.length; i += 1) {
            if (typeof runningWorkers[wIds[i]] === "undefined") {
              jobQueue[0](workers[wIds[i]]);
              break;
            }
          }
        }
      };
      const queue = (action, payload) => new Promise((resolve, reject) => {
        const job = createJob({ action, payload });
        jobQueue.push(async (w) => {
          jobQueue.shift();
          runningWorkers[w.id] = job;
          try {
            resolve(await w[action].apply(exports, [...payload, job.id]));
          } catch (err) {
            reject(err);
          } finally {
            delete runningWorkers[w.id];
            dequeue();
          }
        });
        log(`[${id}]: Add ${job.id} to JobQueue`);
        log(`[${id}]: JobQueue length=${jobQueue.length}`);
        dequeue();
      });
      const addWorker = (w) => {
        workers[w.id] = w;
        log(`[${id}]: Add ${w.id}`);
        log(`[${id}]: Number of workers=${getNumWorkers()}`);
        dequeue();
        return w.id;
      };
      const addJob = async (action, ...payload) => {
        if (getNumWorkers() === 0) {
          throw Error(`[${id}]: You need to have at least one worker before adding jobs`);
        }
        return queue(action, payload);
      };
      const terminate = async () => {
        Object.keys(workers).forEach(async (wid) => {
          await workers[wid].terminate();
        });
        jobQueue = [];
      };
      return {
        addWorker,
        addJob,
        terminate,
        getQueueLen,
        getNumWorkers
      };
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/utils/getEnvironment.js
var require_getEnvironment = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/utils/getEnvironment.js"(exports, module2) {
    "use strict";
    module2.exports = (key) => {
      const env = {};
      if (typeof WorkerGlobalScope !== "undefined") {
        env.type = "webworker";
      } else if (typeof document === "object") {
        env.type = "browser";
      } else if (typeof process === "object" && typeof require === "function") {
        env.type = "node";
      }
      if (typeof key === "undefined") {
        return env;
      }
      return env[key];
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/utils/resolvePaths.js
var require_resolvePaths = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/utils/resolvePaths.js"(exports, module2) {
    "use strict";
    var isBrowser = require_getEnvironment()("type") === "browser";
    var resolveURL = isBrowser ? (s) => new URL(s, window.location.href).href : (s) => s;
    module2.exports = (options) => {
      const opts = { ...options };
      ["corePath", "workerPath", "langPath"].forEach((key) => {
        if (options[key]) {
          opts[key] = resolveURL(opts[key]);
        }
      });
      return opts;
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/constants/OEM.js
var require_OEM = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/constants/OEM.js"(exports, module2) {
    "use strict";
    module2.exports = {
      TESSERACT_ONLY: 0,
      LSTM_ONLY: 1,
      TESSERACT_LSTM_COMBINED: 2,
      DEFAULT: 3
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/package.json"(exports, module2) {
    module2.exports = {
      name: "tesseract.js",
      version: "7.0.0",
      description: "Pure Javascript Multilingual OCR",
      main: "src/index.js",
      type: "commonjs",
      types: "src/index.d.ts",
      unpkg: "dist/tesseract.min.js",
      jsdelivr: "dist/tesseract.min.js",
      scripts: {
        start: "node scripts/server.js",
        build: "rimraf dist && webpack --config scripts/webpack.config.prod.js && rollup -c scripts/rollup.esm.mjs",
        "profile:tesseract": "webpack-bundle-analyzer dist/tesseract-stats.json",
        "profile:worker": "webpack-bundle-analyzer dist/worker-stats.json",
        prepublishOnly: "npm run build",
        wait: "rimraf dist && wait-on http://localhost:3000/dist/tesseract.min.js",
        test: "npm-run-all -p -r start test:all",
        "test:all": "npm-run-all wait test:browser test:node:all",
        "test:browser": "karma start karma.conf.js",
        "test:node": "nyc mocha --exit --bail --require ./scripts/test-helper.mjs",
        "test:node:all": "npm run test:node -- ./tests/*.test.mjs",
        lint: "eslint src",
        "lint:fix": "eslint --fix src",
        postinstall: "opencollective-postinstall || true"
      },
      browser: {
        "./src/worker/node/index.js": "./src/worker/browser/index.js"
      },
      author: "",
      contributors: [
        "jeromewu"
      ],
      license: "Apache-2.0",
      devDependencies: {
        "@babel/core": "^7.21.4",
        "@babel/eslint-parser": "^7.21.3",
        "@babel/preset-env": "^7.21.4",
        "@rollup/plugin-commonjs": "^24.1.0",
        acorn: "^8.8.2",
        "babel-loader": "^9.1.2",
        buffer: "^6.0.3",
        cors: "^2.8.5",
        eslint: "^7.32.0",
        "eslint-config-airbnb-base": "^14.2.1",
        "eslint-plugin-import": "^2.27.5",
        "expect.js": "^0.3.1",
        express: "^4.18.2",
        mocha: "^10.2.0",
        "npm-run-all": "^4.1.5",
        karma: "^6.4.2",
        "karma-chrome-launcher": "^3.2.0",
        "karma-firefox-launcher": "^2.1.2",
        "karma-mocha": "^2.0.1",
        "karma-webpack": "^5.0.0",
        nyc: "^15.1.0",
        rimraf: "^5.0.0",
        rollup: "^3.20.7",
        "wait-on": "^7.0.1",
        webpack: "^5.79.0",
        "webpack-bundle-analyzer": "^4.8.0",
        "webpack-cli": "^5.0.1",
        "webpack-dev-middleware": "^6.0.2",
        "rollup-plugin-sourcemaps": "^0.6.3"
      },
      dependencies: {
        "bmp-js": "^0.1.0",
        "idb-keyval": "^6.2.0",
        "is-url": "^1.2.4",
        "node-fetch": "^2.6.9",
        "opencollective-postinstall": "^2.0.3",
        "regenerator-runtime": "^0.13.3",
        "tesseract.js-core": "^7.0.0",
        "wasm-feature-detect": "^1.8.0",
        zlibjs: "^0.3.1"
      },
      overrides: {
        "@rollup/pluginutils": "^5.0.2"
      },
      repository: {
        type: "git",
        url: "https://github.com/naptha/tesseract.js.git"
      },
      bugs: {
        url: "https://github.com/naptha/tesseract.js/issues"
      },
      homepage: "https://github.com/naptha/tesseract.js",
      collective: {
        type: "opencollective",
        url: "https://opencollective.com/tesseractjs"
      }
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/constants/defaultOptions.js
var require_defaultOptions = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/constants/defaultOptions.js"(exports, module2) {
    "use strict";
    module2.exports = {
      /*
       * Use BlobURL for worker script by default
       * TODO: remove this option
       *
       */
      workerBlobURL: true,
      logger: () => {
      }
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/worker/browser/defaultOptions.js
var require_defaultOptions2 = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/worker/browser/defaultOptions.js"(exports, module2) {
    "use strict";
    var version = require_package().version;
    var defaultOptions = require_defaultOptions();
    module2.exports = {
      ...defaultOptions,
      workerPath: `https://cdn.jsdelivr.net/npm/tesseract.js@v${version}/dist/worker.min.js`
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/worker/browser/spawnWorker.js
var require_spawnWorker = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/worker/browser/spawnWorker.js"(exports, module2) {
    "use strict";
    module2.exports = ({ workerPath, workerBlobURL }) => {
      let worker;
      if (Blob && URL && workerBlobURL) {
        const blob = new Blob([`importScripts("${workerPath}");`], {
          type: "application/javascript"
        });
        worker = new Worker(URL.createObjectURL(blob));
      } else {
        worker = new Worker(workerPath);
      }
      return worker;
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/worker/browser/terminateWorker.js
var require_terminateWorker = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/worker/browser/terminateWorker.js"(exports, module2) {
    "use strict";
    module2.exports = (worker) => {
      worker.terminate();
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/worker/browser/onMessage.js
var require_onMessage = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/worker/browser/onMessage.js"(exports, module2) {
    "use strict";
    module2.exports = (worker, handler) => {
      worker.onmessage = ({ data }) => {
        handler(data);
      };
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/worker/browser/send.js
var require_send = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/worker/browser/send.js"(exports, module2) {
    "use strict";
    module2.exports = async (worker, packet) => {
      worker.postMessage(packet);
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/worker/browser/loadImage.js
var require_loadImage = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/worker/browser/loadImage.js"(exports, module2) {
    "use strict";
    var readFromBlobOrFile = (blob) => new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = ({ target: { error: { code } } }) => {
        reject(Error(`File could not be read! Code=${code}`));
      };
      fileReader.readAsArrayBuffer(blob);
    });
    var loadImage = async (image) => {
      let data = image;
      if (typeof image === "undefined") {
        return "undefined";
      }
      if (typeof image === "string") {
        if (/data:image\/([a-zA-Z]*);base64,([^"]*)/.test(image)) {
          data = atob(image.split(",")[1]).split("").map((c) => c.charCodeAt(0));
        } else {
          const resp = await fetch(image);
          data = await resp.arrayBuffer();
        }
      } else if (typeof HTMLElement !== "undefined" && image instanceof HTMLElement) {
        if (image.tagName === "IMG") {
          data = await loadImage(image.src);
        }
        if (image.tagName === "VIDEO") {
          data = await loadImage(image.poster);
        }
        if (image.tagName === "CANVAS") {
          await new Promise((resolve) => {
            image.toBlob(async (blob) => {
              data = await readFromBlobOrFile(blob);
              resolve();
            });
          });
        }
      } else if (typeof OffscreenCanvas !== "undefined" && image instanceof OffscreenCanvas) {
        const blob = await image.convertToBlob();
        data = await readFromBlobOrFile(blob);
      } else if (image instanceof File || image instanceof Blob) {
        data = await readFromBlobOrFile(image);
      }
      return new Uint8Array(data);
    };
    module2.exports = loadImage;
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/worker/browser/index.js
var require_browser = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/worker/browser/index.js"(exports, module2) {
    "use strict";
    var defaultOptions = require_defaultOptions2();
    var spawnWorker = require_spawnWorker();
    var terminateWorker = require_terminateWorker();
    var onMessage = require_onMessage();
    var send = require_send();
    var loadImage = require_loadImage();
    module2.exports = {
      defaultOptions,
      spawnWorker,
      terminateWorker,
      onMessage,
      send,
      loadImage
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/createWorker.js
var require_createWorker = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/createWorker.js"(exports, module2) {
    "use strict";
    var resolvePaths = require_resolvePaths();
    var createJob = require_createJob();
    var { log } = require_log();
    var getId = require_getId();
    var OEM = require_OEM();
    var {
      defaultOptions,
      spawnWorker,
      terminateWorker,
      onMessage,
      loadImage,
      send
    } = require_browser();
    var workerCounter = 0;
    module2.exports = async (langs = "eng", oem = OEM.LSTM_ONLY, _options = {}, config = {}) => {
      const id = getId("Worker", workerCounter);
      const {
        logger,
        errorHandler,
        ...options
      } = resolvePaths({
        ...defaultOptions,
        ..._options
      });
      const promises = {};
      const currentLangs = typeof langs === "string" ? langs.split("+") : langs;
      let currentOem = oem;
      let currentConfig = config;
      const lstmOnlyCore = [OEM.DEFAULT, OEM.LSTM_ONLY].includes(oem) && !options.legacyCore;
      let workerResReject;
      let workerResResolve;
      const workerRes = new Promise((resolve, reject) => {
        workerResResolve = resolve;
        workerResReject = reject;
      });
      const workerError = (event) => {
        workerResReject(event.message);
      };
      let worker = spawnWorker(options);
      worker.onerror = workerError;
      workerCounter += 1;
      const startJob = ({ id: jobId, action, payload }) => new Promise((resolve, reject) => {
        log(`[${id}]: Start ${jobId}, action=${action}`);
        const promiseId = `${action}-${jobId}`;
        promises[promiseId] = { resolve, reject };
        send(worker, {
          workerId: id,
          jobId,
          action,
          payload
        });
      });
      const load = () => console.warn("`load` is depreciated and should be removed from code (workers now come pre-loaded)");
      const loadInternal = (jobId) => startJob(createJob({
        id: jobId,
        action: "load",
        payload: { options: { lstmOnly: lstmOnlyCore, corePath: options.corePath, logging: options.logging } }
      }));
      const writeText = (path, text, jobId) => startJob(createJob({
        id: jobId,
        action: "FS",
        payload: { method: "writeFile", args: [path, text] }
      }));
      const readText = (path, jobId) => startJob(createJob({
        id: jobId,
        action: "FS",
        payload: { method: "readFile", args: [path, { encoding: "utf8" }] }
      }));
      const removeFile = (path, jobId) => startJob(createJob({
        id: jobId,
        action: "FS",
        payload: { method: "unlink", args: [path] }
      }));
      const FS = (method, args, jobId) => startJob(createJob({
        id: jobId,
        action: "FS",
        payload: { method, args }
      }));
      const loadLanguageInternal = (_langs, jobId) => startJob(createJob({
        id: jobId,
        action: "loadLanguage",
        payload: {
          langs: _langs,
          options: {
            langPath: options.langPath,
            dataPath: options.dataPath,
            cachePath: options.cachePath,
            cacheMethod: options.cacheMethod,
            gzip: options.gzip,
            lstmOnly: [OEM.DEFAULT, OEM.LSTM_ONLY].includes(currentOem) && !options.legacyLang
          }
        }
      }));
      const initializeInternal = (_langs, _oem, _config, jobId) => startJob(createJob({
        id: jobId,
        action: "initialize",
        payload: { langs: _langs, oem: _oem, config: _config }
      }));
      const reinitialize = (langs2 = "eng", oem2, config2, jobId) => {
        if (lstmOnlyCore && [OEM.TESSERACT_ONLY, OEM.TESSERACT_LSTM_COMBINED].includes(oem2)) throw Error("Legacy model requested but code missing.");
        const _oem = oem2 || currentOem;
        currentOem = _oem;
        const _config = config2 || currentConfig;
        currentConfig = _config;
        const langsArr = typeof langs2 === "string" ? langs2.split("+") : langs2;
        const _langs = langsArr.filter((x) => !currentLangs.includes(x));
        currentLangs.push(..._langs);
        if (_langs.length > 0) {
          return loadLanguageInternal(_langs, jobId).then(() => initializeInternal(langs2, _oem, _config, jobId));
        }
        return initializeInternal(langs2, _oem, _config, jobId);
      };
      const setParameters = (params = {}, jobId) => startJob(createJob({
        id: jobId,
        action: "setParameters",
        payload: { params }
      }));
      const recognize = async (image, opts = {}, output = {
        text: true
      }, jobId) => startJob(createJob({
        id: jobId,
        action: "recognize",
        payload: { image: await loadImage(image), options: opts, output }
      }));
      const detect = async (image, jobId) => {
        if (lstmOnlyCore) throw Error("`worker.detect` requires Legacy model, which was not loaded.");
        return startJob(createJob({
          id: jobId,
          action: "detect",
          payload: { image: await loadImage(image) }
        }));
      };
      const terminate = async () => {
        if (worker !== null) {
          terminateWorker(worker);
          worker = null;
        }
        return Promise.resolve();
      };
      onMessage(worker, ({
        workerId,
        jobId,
        status,
        action,
        data
      }) => {
        const promiseId = `${action}-${jobId}`;
        if (status === "resolve") {
          log(`[${workerId}]: Complete ${jobId}`);
          promises[promiseId].resolve({ jobId, data });
          delete promises[promiseId];
        } else if (status === "reject") {
          promises[promiseId].reject(data);
          delete promises[promiseId];
          if (action === "load") workerResReject(data);
          if (errorHandler) {
            errorHandler(data);
          } else {
            throw Error(data);
          }
        } else if (status === "progress") {
          logger({ ...data, userJobId: jobId });
        }
      });
      const resolveObj = {
        id,
        worker,
        load,
        writeText,
        readText,
        removeFile,
        FS,
        reinitialize,
        setParameters,
        recognize,
        detect,
        terminate
      };
      loadInternal().then(() => loadLanguageInternal(langs)).then(() => initializeInternal(langs, oem, config)).then(() => workerResResolve(resolveObj)).catch(() => {
      });
      return workerRes;
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/Tesseract.js
var require_Tesseract = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/Tesseract.js"(exports, module2) {
    "use strict";
    var createWorker = require_createWorker();
    var recognize = async (image, langs, options) => {
      const worker = await createWorker(langs, 1, options);
      return worker.recognize(image).finally(async () => {
        await worker.terminate();
      });
    };
    var detect = async (image, options) => {
      const worker = await createWorker("osd", 0, options);
      return worker.detect(image).finally(async () => {
        await worker.terminate();
      });
    };
    module2.exports = {
      recognize,
      detect
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/constants/languages.js
var require_languages = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/constants/languages.js"(exports, module2) {
    "use strict";
    module2.exports = {
      AFR: "afr",
      AMH: "amh",
      ARA: "ara",
      ASM: "asm",
      AZE: "aze",
      AZE_CYRL: "aze_cyrl",
      BEL: "bel",
      BEN: "ben",
      BOD: "bod",
      BOS: "bos",
      BUL: "bul",
      CAT: "cat",
      CEB: "ceb",
      CES: "ces",
      CHI_SIM: "chi_sim",
      CHI_TRA: "chi_tra",
      CHR: "chr",
      CYM: "cym",
      DAN: "dan",
      DEU: "deu",
      DZO: "dzo",
      ELL: "ell",
      ENG: "eng",
      ENM: "enm",
      EPO: "epo",
      EST: "est",
      EUS: "eus",
      FAS: "fas",
      FIN: "fin",
      FRA: "fra",
      FRK: "frk",
      FRM: "frm",
      GLE: "gle",
      GLG: "glg",
      GRC: "grc",
      GUJ: "guj",
      HAT: "hat",
      HEB: "heb",
      HIN: "hin",
      HRV: "hrv",
      HUN: "hun",
      IKU: "iku",
      IND: "ind",
      ISL: "isl",
      ITA: "ita",
      ITA_OLD: "ita_old",
      JAV: "jav",
      JPN: "jpn",
      KAN: "kan",
      KAT: "kat",
      KAT_OLD: "kat_old",
      KAZ: "kaz",
      KHM: "khm",
      KIR: "kir",
      KOR: "kor",
      KUR: "kur",
      LAO: "lao",
      LAT: "lat",
      LAV: "lav",
      LIT: "lit",
      MAL: "mal",
      MAR: "mar",
      MKD: "mkd",
      MLT: "mlt",
      MSA: "msa",
      MYA: "mya",
      NEP: "nep",
      NLD: "nld",
      NOR: "nor",
      ORI: "ori",
      PAN: "pan",
      POL: "pol",
      POR: "por",
      PUS: "pus",
      RON: "ron",
      RUS: "rus",
      SAN: "san",
      SIN: "sin",
      SLK: "slk",
      SLV: "slv",
      SPA: "spa",
      SPA_OLD: "spa_old",
      SQI: "sqi",
      SRP: "srp",
      SRP_LATN: "srp_latn",
      SWA: "swa",
      SWE: "swe",
      SYR: "syr",
      TAM: "tam",
      TEL: "tel",
      TGK: "tgk",
      TGL: "tgl",
      THA: "tha",
      TIR: "tir",
      TUR: "tur",
      UIG: "uig",
      UKR: "ukr",
      URD: "urd",
      UZB: "uzb",
      UZB_CYRL: "uzb_cyrl",
      VIE: "vie",
      YID: "yid"
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/constants/PSM.js
var require_PSM = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/constants/PSM.js"(exports, module2) {
    "use strict";
    module2.exports = {
      OSD_ONLY: "0",
      AUTO_OSD: "1",
      AUTO_ONLY: "2",
      AUTO: "3",
      SINGLE_COLUMN: "4",
      SINGLE_BLOCK_VERT_TEXT: "5",
      SINGLE_BLOCK: "6",
      SINGLE_LINE: "7",
      SINGLE_WORD: "8",
      CIRCLE_WORD: "9",
      SINGLE_CHAR: "10",
      SPARSE_TEXT: "11",
      SPARSE_TEXT_OSD: "12",
      RAW_LINE: "13"
    };
  }
});

// node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/tesseract.js@7.0.0/node_modules/tesseract.js/src/index.js"(exports, module2) {
    "use strict";
    require_runtime();
    var createScheduler = require_createScheduler();
    var createWorker = require_createWorker();
    var Tesseract = require_Tesseract();
    var languages = require_languages();
    var OEM = require_OEM();
    var PSM = require_PSM();
    var { setLogging } = require_log();
    module2.exports = {
      languages,
      OEM,
      PSM,
      createScheduler,
      createWorker,
      setLogging,
      ...Tesseract
    };
  }
});

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => MagicToolsPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// magic-tools-utils.ts
var MAX_OUTPUT_LENGTH = 2e4;
var MAX_TIMEOUT_SECONDS = 30;
var MIN_TIMEOUT_SECONDS = 3;
var IMAGE_OPTIMIZATION_EXTENSIONS = ["png", "jpg", "jpeg", "webp"];
var AI_DEFINITION_MAX_WORDS = 8;
var AI_DEFINITION_MAX_CHARS = 60;
function sanitizeOcrText(input) {
  const withoutControl = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return withoutControl.slice(0, MAX_OUTPUT_LENGTH).trim();
}
function getMarkdownImageMatch(text) {
  return getMarkdownImageMatches(text)[0] ?? null;
}
function getMarkdownImageMatches(text) {
  const matches = [];
  const wikiRegex = /!\[\[([^\]]+)\]\]/g;
  for (const m of text.matchAll(wikiRegex)) {
    if (typeof m.index === "number" && m[0]) {
      matches.push({ index: m.index, syntax: m[0] });
    }
  }
  const mdRegex = /!\[[^\]]*\]\(([^)]+)\)/g;
  for (const m of text.matchAll(mdRegex)) {
    if (typeof m.index === "number" && m[0]) {
      matches.push({ index: m.index, syntax: m[0] });
    }
  }
  return matches.sort((a, b) => a.index - b.index).map((m) => m.syntax);
}
function removeWikiDecorators(pathLike) {
  return pathLike.split("|")[0].split("#")[0].trim();
}
function clampTimeoutSeconds(seconds) {
  return Math.min(MAX_TIMEOUT_SECONDS, Math.max(MIN_TIMEOUT_SECONDS, Math.round(seconds)));
}
function getParentPath(path) {
  const idx = path.lastIndexOf("/");
  return idx === -1 ? "" : path.substring(0, idx);
}
function resolveMarkdownImagePaths(rawPath, sourcePath) {
  const decoded = decodeURIComponent(rawPath.trim());
  const candidates = [];
  const normalize = (p) => {
    const parts = p.replace(/\\/g, "/").split("/");
    const out = [];
    for (const part of parts) {
      if (!part || part === ".") continue;
      if (part === "..") {
        if (out.length > 0) out.pop();
        continue;
      }
      out.push(part);
    }
    return out.join("/");
  };
  const pushCandidate = (p) => {
    const normalized = normalize(p);
    if (normalized && !candidates.includes(normalized)) {
      candidates.push(normalized);
    }
  };
  if (decoded.startsWith("/")) {
    const abs = decoded.substring(1).replace(/\/{2,}/g, "/");
    pushCandidate(abs);
  } else {
    const parent = getParentPath(sourcePath);
    const relative = parent ? `${parent}/${decoded}` : decoded;
    pushCandidate(relative.replace(/\/{2,}/g, "/"));
    if (parent) {
      pushCandidate(decoded.replace(/\/{2,}/g, "/"));
    }
  }
  return candidates;
}
function buildSelectionPdfOutputPath(notePath, noteBasename, exportFolder) {
  const folder = exportFolder?.trim();
  if (folder) {
    return `${folder}/${noteBasename}-selection.pdf`.replace(/\/{2,}/g, "/");
  }
  const parent = getParentPath(notePath);
  const raw = parent ? `${parent}/${noteBasename}-selection.pdf` : `${noteBasename}-selection.pdf`;
  return raw.replace(/\/{2,}/g, "/");
}
function isImageOptimizationSupported(extension) {
  const ext = extension.toLowerCase();
  return IMAGE_OPTIMIZATION_EXTENSIONS.includes(ext);
}
function isAiDefinitionSelectionValid(selection, maxWords = AI_DEFINITION_MAX_WORDS, maxChars = AI_DEFINITION_MAX_CHARS) {
  const normalized = selection.trim();
  if (!normalized) return false;
  if (normalized.length > maxChars) return false;
  const words = normalized.split(/\s+/).filter(Boolean);
  return words.length >= 1 && words.length <= maxWords;
}
function getAiDefinitionLanguageName(code) {
  const labels = {
    auto: "auto",
    en: "English",
    es: "Spanish",
    pt: "Portuguese",
    fr: "French",
    de: "German",
    it: "Italian",
    nl: "Dutch",
    ru: "Russian",
    zh: "Chinese (Simplified)",
    ja: "Japanese"
  };
  return labels[code] ?? "auto";
}
function buildOptimizedImagePathWithExtension(filePath, extension) {
  const normalized = filePath.replace(/\\/g, "/");
  const slashIdx = normalized.lastIndexOf("/");
  const folder = slashIdx === -1 ? "" : normalized.substring(0, slashIdx + 1);
  const fileName = slashIdx === -1 ? normalized : normalized.substring(slashIdx + 1);
  const dotIdx = fileName.lastIndexOf(".");
  const base = dotIdx === -1 ? fileName : fileName.substring(0, dotIdx);
  return `${folder}${base}-optimized.${extension.replace(/^\./, "")}`;
}

// main.ts
var DEFAULT_SETTINGS = {
  googleApiKey: "",
  openaiApiKey: "",
  defaultProvider: "local",
  insertAsCallout: false,
  geminiFastMode: false,
  ocrLanguage: "es",
  maxImageSizeMb: 10,
  ocrTimeoutSeconds: 5,
  pdfExportFolder: "",
  minPdfSelectionChars: 20,
  enableImageOptimization: false,
  replaceOriginalImage: true,
  createBackupBeforeReplace: true,
  enableAiDefinitions: false,
  aiDefinitionLanguage: "es"
};
var I18N = {
  es: {
    extractTextFromImage: "Extraer texto de imagen",
    noImageDetected: "No se detect\xF3 una imagen embebida en la l\xEDnea o selecci\xF3n actual.",
    imageTooLarge: (sizeMb, maxMb) => `La imagen pesa ${sizeMb.toFixed(2)} MB y supera el m\xE1ximo configurado (${maxMb} MB).`,
    apiKeyMissing: "Falta la API key de Google AI Studio para usar Gemini OCR.",
    openAiApiKeyMissing: "Falta la API key de OpenAI para usar OCR con OpenAI.",
    ocrFailed: "Fall\xF3 el OCR.",
    serviceUnavailable: "El proveedor de OCR no est\xE1 disponible temporalmente (503). Prob\xE1 nuevamente en unos segundos.",
    rateLimited: "Se alcanz\xF3 el l\xEDmite del proveedor OCR (429). Esper\xE1 un momento e intent\xE1 de nuevo.",
    timeoutError: "Se agot\xF3 el tiempo de OCR. Prob\xE1 aumentar el timeout (m\xE1x. 30s) o usar una imagen con menos texto/complejidad.",
    modalTitle: "Texto extra\xEDdo",
    copyText: "Copiar texto",
    copied: "Texto copiado",
    insertToggle: "Insertar debajo de la imagen",
    insertNow: "Insertar ahora",
    close: "Cerrar",
    inserted: "Texto insertado debajo de la imagen",
    exportSelectionToPdf: "Magic Tools: Exportar selecci\xF3n a PDF",
    noTextSelected: "No hay texto seleccionado",
    pdfSaved: (path) => `PDF guardado: ${path}`,
    pdfNotDesktop: "La exportaci\xF3n a PDF solo est\xE1 disponible en Obsidian Desktop.",
    pdfFailed: "No se pudo generar el PDF de la selecci\xF3n.",
    settingsTitle: "Magic Tools",
    settingApiKey: "Google AI Studio API key",
    settingApiKeyDesc: "Se usa cuando el proveedor OCR es Gemini.",
    settingOpenAiApiKey: "OpenAI API key",
    settingOpenAiApiKeyDesc: "Se usa cuando el proveedor OCR es OpenAI.",
    settingProvider: "Proveedor OCR por defecto",
    settingProviderDesc: "Eleg\xED Gemini, OpenAI o OCR local.",
    settingInsertAsCallout: "Insertar dentro de callout",
    settingInsertAsCalloutDesc: "Desactivado por defecto. Si se activa, usa bloque [!note] expandido.",
    settingGeminiFastMode: "Gemini Fast Mode (borra imagen)",
    settingGeminiFastModeDesc: "Riesgo: inserta transcripci\xF3n y elimina la imagen original. Usalo bajo tu propio riesgo.",
    settingLanguage: "Idioma OCR",
    settingLanguageDesc: "Idioma preferido para el reconocimiento.",
    settingMaxSize: "Tama\xF1o m\xE1ximo de imagen (MB)",
    settingMaxSizeDesc: "L\xEDmite para evitar procesamientos pesados.",
    settingTimeout: "Timeout OCR (segundos)",
    settingTimeoutDesc: "Por defecto 5, m\xE1ximo 30.",
    settingPdfExportFolder: "Carpeta por defecto para exportar PDFs",
    settingPdfExportFolderDesc: "Ruta relativa al vault (ej: Exports/PDF). Vac\xEDo = misma carpeta de la nota.",
    settingMinPdfChars: "M\xEDnimo de caracteres para exportar selecci\xF3n",
    settingMinPdfCharsDesc: "Evita exportaciones vac\xEDas o accidentales desde men\xFA contextual.",
    sectionOcr: "OCR de imagen",
    sectionAiDefinitions: "Definiciones con IA",
    sectionImages: "Im\xE1genes",
    sectionPdf: "Exportador PDF",
    menuGroupTitle: "Magic Tools",
    contextExportSelectionToPdf: "Exportar selecci\xF3n a PDF",
    explainSelectionWithAi: "Explicar selecci\xF3n (IA)",
    aiDefinitionModalTitle: "Explicaci\xF3n breve",
    aiDefinitionFailed: "No se pudo generar la explicaci\xF3n.",
    aiDefinitionApiKeyMissing: "Configur\xE1 una API key de IA para usar esta funci\xF3n.",
    aiDefinitionTimeout: "Se agot\xF3 el tiempo al pedir la explicaci\xF3n. Prob\xE1 de nuevo.",
    aiDefinitionServiceUnavailable: "El proveedor de IA no est\xE1 disponible temporalmente (503). Prob\xE1 en unos segundos.",
    aiDefinitionRateLimited: "Se alcanz\xF3 el l\xEDmite del proveedor de IA (429). Esper\xE1 un momento e intent\xE1 de nuevo.",
    aiDefinitionSelectionInvalid: `Seleccion\xE1 un t\xE9rmino o frase corta (m\xE1x. ${AI_DEFINITION_MAX_WORDS} palabras o ${AI_DEFINITION_MAX_CHARS} caracteres).`,
    invalidPdfExportFolder: "Ruta inv\xE1lida. Debe ser una carpeta dentro del vault.",
    emptyRenderedPdfFallback: "No se pudo renderizar con estilo. Se export\xF3 en modo texto simple.",
    saveDialogCanceled: "Exportaci\xF3n cancelada.",
    pdfWriteFailed: "No se pudo escribir el PDF. Revis\xE1 permisos/ruta de guardado.",
    selectionTooShort: (min) => `La selecci\xF3n es muy corta. Seleccion\xE1 al menos ${min} caracteres.`,
    providerGemini: "Gemini (Google AI Studio)",
    providerOpenAI: "OpenAI",
    providerLocal: "OCR local",
    langAuto: "Autom\xE1tico",
    langEs: "Espa\xF1ol",
    langEn: "Ingl\xE9s",
    commandPdfUnavailable: "No se pudo acceder al motor de PDF de Electron. Prob\xE1 actualizar Obsidian Desktop.",
    optimizeModalTitle: "Recortar y redimensionar imagen",
    optimizeAction: "Recortar y redimensionar imagen",
    optimizeApply: "Aplicar optimizaci\xF3n",
    cropCancel: "Cancelar",
    optimizeSavedReplaced: "Imagen optimizada guardada. Se reemplaz\xF3 el original.",
    optimizeSavedReplacedWithBackup: "Imagen optimizada guardada. Se reemplaz\xF3 el original (backup: .bkp).",
    optimizeSavedNewFile: (path) => `Imagen optimizada guardada como: ${path}`,
    optimizeUnsupportedFormat: (ext) => `Formato de imagen no soportado para optimizaci\xF3n: .${ext}. Soportados: png, jpg, jpeg, webp.`,
    optimizeSaveFailed: "No se pudo guardar la imagen optimizada.",
    optimizeWouldIncreaseSize: "La optimizaci\xF3n propuesta aumentar\xEDa el tama\xF1o de la imagen. Baj\xE1 m\xE1s la calidad o recort\xE1 m\xE1s para continuar.",
    optimizeCurrentResolution: "Resoluci\xF3n actual",
    optimizeEstimatedCurrentSize: "Tama\xF1o estimado actual",
    optimizeQualityLabel: "Calidad",
    optimizeQualityNotApplicable: "(no aplica para PNG)",
    optimizePngConversionNotice: "En PNG no se puede ajustar calidad perceptual. Para comprimir con calidad, convert\xED a JPG.",
    optimizeConvertToJpg: "Convertir PNG a JPG",
    optimizeConvertFormatDisclaimer: "Si reemplaz\xE1s el original, se mantiene la extensi\xF3n del archivo, pero el contenido interno pasa a JPG.",
    optimizeEstimatedOutputResolution: "Resoluci\xF3n estimada de salida",
    optimizeEstimatedOutputSize: "Tama\xF1o estimado de salida",
    optimizeRiskLevel: "Riesgo de degradaci\xF3n",
    optimizeRiskLow: "Bajo",
    optimizeRiskMedium: "Medio",
    optimizeRiskHigh: "Alto",
    optimizeHighRiskTitle: "Optimizaci\xF3n agresiva",
    optimizeRiskDisclaimer: "Esta optimizaci\xF3n puede degradar notablemente la imagen (texto borroso, artefactos y p\xE9rdida de detalle). Usala solo si prioriz\xE1s reducir tama\xF1o.",
    optimizeContinueAnyway: "Continuar de todos modos",
    settingEnableImageOptimization: "Habilitar acci\xF3n de optimizaci\xF3n de imagen",
    settingEnableImageOptimizationDesc: "Muestra la acci\xF3n contextual para recortar y redimensionar im\xE1genes.",
    settingReplaceOriginalImage: "Reemplazar imagen original",
    settingReplaceOriginalImageDesc: "Si est\xE1 activo, sobrescribe el archivo original con la versi\xF3n optimizada.",
    settingCreateBackupBeforeReplace: "Crear backup antes de reemplazar",
    settingCreateBackupBeforeReplaceDesc: "Si est\xE1 activo, crea un archivo .bkp antes de sobrescribir la imagen original.",
    settingImageRiskDisclaimer: "\u26A0\uFE0F Si reemplaz\xE1s la imagen original sin backup, no hay forma autom\xE1tica de recuperarla.",
    settingEnableAiDefinitions: "Habilitar explicaci\xF3n breve por selecci\xF3n",
    settingEnableAiDefinitionsDesc: "Agrega una acci\xF3n contextual para explicar un t\xE9rmino o frase corta usando IA.",
    settingAiDefinitionLanguage: "Idioma de respuesta",
    settingAiDefinitionLanguageDesc: "Idioma preferido para la explicaci\xF3n breve.",
    aiDefinitionsRequiresApi: "Configur\xE1 una API key de Gemini u OpenAI para habilitar esta secci\xF3n.",
    aiLangAuto: "Autom\xE1tico",
    aiLangEn: "Ingl\xE9s",
    aiLangEs: "Espa\xF1ol",
    aiLangPt: "Portugu\xE9s",
    aiLangFr: "Franc\xE9s",
    aiLangDe: "Alem\xE1n",
    aiLangIt: "Italiano",
    aiLangNl: "Neerland\xE9s",
    aiLangRu: "Ruso",
    aiLangZh: "Chino (simplificado)",
    aiLangJa: "Japon\xE9s"
  },
  en: {
    extractTextFromImage: "Extract text from image",
    noImageDetected: "No embedded image was detected in the current line or selection.",
    imageTooLarge: (sizeMb, maxMb) => `Image is ${sizeMb.toFixed(2)} MB and exceeds configured max (${maxMb} MB).`,
    apiKeyMissing: "Google AI Studio API key is missing for Gemini OCR.",
    openAiApiKeyMissing: "OpenAI API key is missing for OpenAI OCR.",
    ocrFailed: "OCR failed.",
    serviceUnavailable: "OCR provider is temporarily unavailable (503). Please retry in a few seconds.",
    rateLimited: "OCR provider rate limit reached (429). Please wait and retry.",
    timeoutError: "OCR timed out. Try increasing timeout (max 30s) or use an image with less text/complexity.",
    modalTitle: "Extracted text",
    copyText: "Copy text",
    copied: "Text copied",
    insertToggle: "Insert below image",
    insertNow: "Insert now",
    close: "Close",
    inserted: "Text inserted below image",
    exportSelectionToPdf: "Magic Tools: Export selection to PDF",
    noTextSelected: "No text selected",
    pdfSaved: (path) => `PDF saved: ${path}`,
    pdfNotDesktop: "PDF export is only available in Obsidian Desktop.",
    pdfFailed: "Could not generate selection PDF.",
    settingsTitle: "Magic Tools",
    settingApiKey: "Google AI Studio API key",
    settingApiKeyDesc: "Used when OCR provider is Gemini.",
    settingOpenAiApiKey: "OpenAI API key",
    settingOpenAiApiKeyDesc: "Used when OCR provider is OpenAI.",
    settingProvider: "Default OCR provider",
    settingProviderDesc: "Choose Gemini, OpenAI, or local OCR.",
    settingInsertAsCallout: "Insert inside callout",
    settingInsertAsCalloutDesc: "Off by default. If enabled, uses expanded [!note] block.",
    settingGeminiFastMode: "Gemini Fast Mode (deletes image)",
    settingGeminiFastModeDesc: "Risk: inserts transcription and removes original image. Use at your own risk.",
    settingLanguage: "OCR language",
    settingLanguageDesc: "Preferred recognition language.",
    settingMaxSize: "Max image size (MB)",
    settingMaxSizeDesc: "Limit to avoid heavy processing.",
    settingTimeout: "OCR timeout (seconds)",
    settingTimeoutDesc: "Default 5, hard max 30.",
    settingPdfExportFolder: "Default folder for exported PDFs",
    settingPdfExportFolderDesc: "Vault-relative path (e.g. Exports/PDF). Empty = same note folder.",
    settingMinPdfChars: "Minimum chars for exporting selection",
    settingMinPdfCharsDesc: "Avoid empty or accidental exports from context menu.",
    sectionOcr: "Image OCR",
    sectionAiDefinitions: "AI Definitions",
    sectionImages: "Images",
    sectionPdf: "PDF exporter",
    menuGroupTitle: "Magic Tools",
    contextExportSelectionToPdf: "Export selection to PDF",
    explainSelectionWithAi: "Explain selection (AI)",
    aiDefinitionModalTitle: "Quick explanation",
    aiDefinitionFailed: "Could not generate explanation.",
    aiDefinitionApiKeyMissing: "Configure an AI API key to use this feature.",
    aiDefinitionTimeout: "Explanation request timed out. Please try again.",
    aiDefinitionServiceUnavailable: "AI provider is temporarily unavailable (503). Please retry in a few seconds.",
    aiDefinitionRateLimited: "AI provider rate limit reached (429). Please wait and retry.",
    aiDefinitionSelectionInvalid: `Select a short term or phrase (max ${AI_DEFINITION_MAX_WORDS} words or ${AI_DEFINITION_MAX_CHARS} chars).`,
    invalidPdfExportFolder: "Invalid path. It must be a folder inside the vault.",
    emptyRenderedPdfFallback: "Styled render failed. Exported using plain text fallback.",
    saveDialogCanceled: "Export canceled.",
    pdfWriteFailed: "Could not write PDF. Check path/permissions.",
    selectionTooShort: (min) => `Selection is too short. Please select at least ${min} characters.`,
    providerGemini: "Gemini (Google AI Studio)",
    providerOpenAI: "OpenAI",
    providerLocal: "Local OCR",
    langAuto: "Auto",
    langEs: "Spanish",
    langEn: "English",
    commandPdfUnavailable: "Could not access Electron PDF engine. Try updating Obsidian Desktop.",
    optimizeModalTitle: "Crop and resize image",
    optimizeAction: "Crop and resize image",
    optimizeApply: "Apply optimization",
    cropCancel: "Cancel",
    optimizeSavedReplaced: "Optimized image saved. Original replaced.",
    optimizeSavedReplacedWithBackup: "Optimized image saved. Original replaced (backup: .bkp).",
    optimizeSavedNewFile: (path) => `Optimized image saved as: ${path}`,
    optimizeUnsupportedFormat: (ext) => `Unsupported image format for optimization: .${ext}. Supported: png, jpg, jpeg, webp.`,
    optimizeSaveFailed: "Could not save optimized image.",
    optimizeWouldIncreaseSize: "The proposed optimization would increase image size. Lower quality or crop more to continue.",
    optimizeCurrentResolution: "Current resolution",
    optimizeEstimatedCurrentSize: "Current estimated size",
    optimizeQualityLabel: "Quality",
    optimizeQualityNotApplicable: "(not applicable for PNG)",
    optimizePngConversionNotice: "PNG does not support perceptual quality adjustment. Convert to JPG to use quality compression.",
    optimizeConvertToJpg: "Convert PNG to JPG",
    optimizeConvertFormatDisclaimer: "If you replace the original, the file extension is preserved but internal content is converted to JPG.",
    optimizeEstimatedOutputResolution: "Estimated output resolution",
    optimizeEstimatedOutputSize: "Estimated output size",
    optimizeRiskLevel: "Degradation risk",
    optimizeRiskLow: "Low",
    optimizeRiskMedium: "Medium",
    optimizeRiskHigh: "High",
    optimizeHighRiskTitle: "Aggressive optimization",
    optimizeRiskDisclaimer: "This optimization may noticeably degrade image quality (blurry text, artifacts, detail loss). Use it only if file size reduction is the priority.",
    optimizeContinueAnyway: "Continue anyway",
    settingEnableImageOptimization: "Enable image optimization action",
    settingEnableImageOptimizationDesc: "Shows the contextual action to crop and resize images.",
    settingReplaceOriginalImage: "Replace original image",
    settingReplaceOriginalImageDesc: "If enabled, overwrite the original file with the optimized version.",
    settingCreateBackupBeforeReplace: "Create backup before replace",
    settingCreateBackupBeforeReplaceDesc: "If enabled, creates a .bkp file before overwriting the original image.",
    settingImageRiskDisclaimer: "\u26A0\uFE0F If you replace the original image without backup, it cannot be recovered automatically.",
    settingEnableAiDefinitions: "Enable quick explanation from selection",
    settingEnableAiDefinitionsDesc: "Adds a contextual action to explain a short term or phrase using AI.",
    settingAiDefinitionLanguage: "Response language",
    settingAiDefinitionLanguageDesc: "Preferred language for the quick explanation.",
    aiDefinitionsRequiresApi: "Configure a Gemini or OpenAI API key to enable this section.",
    aiLangAuto: "Auto",
    aiLangEn: "English",
    aiLangEs: "Spanish",
    aiLangPt: "Portuguese",
    aiLangFr: "French",
    aiLangDe: "German",
    aiLangIt: "Italian",
    aiLangNl: "Dutch",
    aiLangRu: "Russian",
    aiLangZh: "Chinese (Simplified)",
    aiLangJa: "Japanese"
  }
};
function getLocale() {
  const locale = ((0, import_obsidian.getLanguage)?.() ?? navigator.language ?? "en").toLowerCase();
  return locale.startsWith("es") ? "es" : "en";
}
function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("OCR_TIMEOUT")), ms);
    promise.then((value) => {
      window.clearTimeout(timer);
      resolve(value);
    }).catch((err) => {
      window.clearTimeout(timer);
      reject(err);
    });
  });
}
var OcrResultModal = class extends import_obsidian.Modal {
  constructor(app, text, onInsert) {
    super(app);
    this.text = text;
    this.onInsert = onInsert;
    this.i18n = I18N[getLocale()];
  }
  onOpen() {
    this.titleEl.setText(this.i18n.modalTitle);
    const textarea = this.contentEl.createEl("textarea", {
      text: this.text,
      cls: "magic-tools-ocr-textarea"
    });
    textarea.style.width = "100%";
    textarea.style.minHeight = "220px";
    const buttonRow = this.contentEl.createDiv({ cls: "magic-tools-button-row" });
    buttonRow.style.display = "flex";
    buttonRow.style.gap = "8px";
    const copyButton = buttonRow.createEl("button", { text: this.i18n.copyText });
    copyButton.addEventListener("click", async () => {
      await navigator.clipboard.writeText(textarea.value);
      new import_obsidian.Notice(this.i18n.copied);
    });
    const insertButton = buttonRow.createEl("button", { text: this.i18n.insertNow });
    insertButton.addEventListener("click", () => {
      this.onInsert();
      this.close();
    });
    const closeButton = buttonRow.createEl("button", { text: this.i18n.close });
    closeButton.addEventListener("click", () => this.close());
  }
};
var AiDefinitionModal = class extends import_obsidian.Modal {
  constructor(app, text) {
    super(app);
    this.text = text;
    this.i18n = I18N[getLocale()];
  }
  onOpen() {
    this.titleEl.setText(this.i18n.aiDefinitionModalTitle);
    const body = this.contentEl.createEl("textarea", {
      text: this.text,
      cls: "magic-tools-ocr-textarea"
    });
    body.style.width = "100%";
    body.style.minHeight = "140px";
    body.style.resize = "vertical";
    const buttonRow = this.contentEl.createDiv({ cls: "magic-tools-button-row" });
    buttonRow.style.display = "flex";
    buttonRow.style.gap = "8px";
    const copyButton = buttonRow.createEl("button", { text: this.i18n.copyText });
    copyButton.addEventListener("click", async () => {
      await navigator.clipboard.writeText(body.value);
      new import_obsidian.Notice(this.i18n.copied);
    });
    const closeButton = buttonRow.createEl("button", { text: this.i18n.close });
    closeButton.addEventListener("click", () => this.close());
  }
};
var ImageOptimizationModal = class extends import_obsidian.Modal {
  constructor(app, imageDataUrl, outputMimeType, currentSizeBytes, onOptimize) {
    super(app);
    this.imageDataUrl = imageDataUrl;
    this.outputMimeType = outputMimeType;
    this.currentSizeBytes = currentSizeBytes;
    this.onOptimize = onOptimize;
    this.i18n = I18N[getLocale()];
    this.cropX = 0;
    this.cropY = 0;
    this.cropW = 0;
    this.cropH = 0;
    this.quality = 90;
    this.qualityEnabled = true;
    this.forceJpegConversion = false;
    this.estimateRequestId = 0;
    this.isDragging = false;
    this.isResizing = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.resizeHandle = "";
    this.HANDLE_SIZE = 14;
    this.HANDLE_HITBOX = 24;
    this.QUALITY_OPTIONS = [90, 75, 50, 25, 10];
    this.onMouseMove = (e) => {
      if (!this.isDragging && !this.isResizing) return;
      const { x, y } = this.canvasCoords(e);
      if (this.isDragging) {
        this.cropX = Math.max(0, Math.min(this.canvas.width - this.cropW, x - this.dragStartX));
        this.cropY = Math.max(0, Math.min(this.canvas.height - this.cropH, y - this.dragStartY));
      } else {
        const dx = x - this.dragStartX;
        const dy = y - this.dragStartY;
        this.dragStartX = x;
        this.dragStartY = y;
        const h = this.resizeHandle;
        if (h.includes("e")) this.cropW = Math.max(10, this.cropW + dx);
        if (h.includes("s")) this.cropH = Math.max(10, this.cropH + dy);
        if (h.includes("w")) {
          const newW = Math.max(10, this.cropW - dx);
          this.cropX += this.cropW - newW;
          this.cropW = newW;
        }
        if (h.includes("n")) {
          const newH = Math.max(10, this.cropH - dy);
          this.cropY += this.cropH - newH;
          this.cropH = newH;
        }
        this.cropX = Math.max(0, this.cropX);
        this.cropY = Math.max(0, this.cropY);
        if (this.cropX + this.cropW > this.canvas.width) this.cropW = this.canvas.width - this.cropX;
        if (this.cropY + this.cropH > this.canvas.height) this.cropH = this.canvas.height - this.cropY;
      }
      this.draw();
      this.updateEstimatedOutputResolution();
      void this.updateEstimatedOutputSize();
    };
    this.onMouseUp = () => {
      this.isDragging = false;
      this.isResizing = false;
    };
  }
  onOpen() {
    this.titleEl.setText(this.i18n.optimizeModalTitle);
    this.modalEl.style.maxWidth = "90vw";
    this.modalEl.style.width = "fit-content";
    const infoContainer = this.contentEl.createDiv({ cls: "magic-tools-optimize-info" });
    infoContainer.style.cssText = "display:grid;grid-template-columns:auto 1fr;gap:6px 10px;margin-bottom:10px;";
    this.currentResolutionValueEl = this.createInfoRow(infoContainer, this.i18n.optimizeCurrentResolution);
    this.currentSizeValueEl = this.createInfoRow(infoContainer, this.i18n.optimizeEstimatedCurrentSize);
    this.outputResolutionValueEl = this.createInfoRow(infoContainer, this.i18n.optimizeEstimatedOutputResolution);
    this.outputSizeValueEl = this.createInfoRow(infoContainer, this.i18n.optimizeEstimatedOutputSize);
    this.riskValueEl = this.createInfoRow(infoContainer, this.i18n.optimizeRiskLevel);
    const qualityRow = this.contentEl.createDiv({ cls: "magic-tools-optimize-quality-row" });
    qualityRow.style.cssText = "display:flex;align-items:center;gap:10px;margin-bottom:10px;";
    const qualityLabelEl = qualityRow.createEl("label", { text: this.i18n.optimizeQualityLabel });
    const qualitySelect = qualityRow.createEl("select");
    for (const value of this.QUALITY_OPTIONS) {
      const option = qualitySelect.createEl("option", { text: String(value) });
      option.value = String(value);
      if (value === this.quality) {
        option.selected = true;
      }
    }
    qualitySelect.addEventListener("change", () => {
      this.quality = Number(qualitySelect.value) || 90;
      void this.updateEstimatedOutputSize();
    });
    this.qualityEnabled = this.outputMimeType !== "image/png";
    if (!this.qualityEnabled) {
      qualitySelect.disabled = true;
      qualityLabelEl.setText(`${this.i18n.optimizeQualityLabel} ${this.i18n.optimizeQualityNotApplicable}`);
      const pngNotice = this.contentEl.createDiv({ text: this.i18n.optimizePngConversionNotice });
      pngNotice.style.cssText = "margin-bottom:8px;color:var(--text-muted);font-size:12px;";
      const convertRow = this.contentEl.createDiv({ cls: "magic-tools-optimize-convert-row" });
      convertRow.style.cssText = "display:flex;align-items:center;gap:8px;margin-bottom:10px;";
      const convertToggle = convertRow.createEl("input");
      convertToggle.type = "checkbox";
      const convertLabel = convertRow.createEl("label", { text: this.i18n.optimizeConvertToJpg });
      convertLabel.style.cursor = "pointer";
      convertLabel.addEventListener("click", () => {
        if (!convertToggle.checked) {
          convertToggle.checked = true;
          convertToggle.dispatchEvent(new Event("change"));
        }
      });
      convertToggle.addEventListener("change", () => {
        if (convertToggle.checked) {
          this.forceJpegConversion = true;
          convertToggle.disabled = true;
          qualitySelect.disabled = false;
          qualityLabelEl.setText(this.i18n.optimizeQualityLabel);
          const convertDisclaimer = this.contentEl.createDiv({ text: this.i18n.optimizeConvertFormatDisclaimer });
          convertDisclaimer.style.cssText = "margin-bottom:8px;color:var(--text-muted);font-size:12px;";
          void this.updateEstimatedOutputSize();
        }
      });
    }
    this.canvas = this.contentEl.createEl("canvas");
    this.canvas.style.display = "block";
    this.canvas.style.cursor = "crosshair";
    this.canvas.style.maxWidth = "80vw";
    this.canvas.style.maxHeight = "50vh";
    this.img = new Image();
    this.img.onload = () => this.initCanvas();
    this.img.src = this.imageDataUrl;
    const buttonRow = this.contentEl.createDiv({ cls: "magic-tools-button-row" });
    buttonRow.style.cssText = "display:flex;gap:8px;margin-top:10px;";
    this.optimizeButton = buttonRow.createEl("button", { text: this.i18n.optimizeApply, cls: "mod-cta" });
    this.optimizeButton.addEventListener("click", () => void this.performOptimization(this.optimizeButton));
    const cancelBtn = buttonRow.createEl("button", { text: this.i18n.cropCancel });
    cancelBtn.addEventListener("click", () => this.close());
    this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e));
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
  }
  onClose() {
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
  }
  initCanvas() {
    const maxW = Math.min(window.innerWidth * 0.8, this.img.naturalWidth);
    const maxH = Math.min(window.innerHeight * 0.5, this.img.naturalHeight);
    const scale = Math.min(maxW / this.img.naturalWidth, maxH / this.img.naturalHeight, 1);
    this.canvas.width = Math.round(this.img.naturalWidth * scale);
    this.canvas.height = Math.round(this.img.naturalHeight * scale);
    this.canvas.style.width = `${this.canvas.width}px`;
    this.canvas.style.height = `${this.canvas.height}px`;
    this.cropX = 0;
    this.cropY = 0;
    this.cropW = this.canvas.width;
    this.cropH = this.canvas.height;
    this.draw();
    this.currentResolutionValueEl.setText(`${this.img.naturalWidth} x ${this.img.naturalHeight}`);
    this.currentSizeValueEl.setText(this.formatSize(this.currentSizeBytes));
    this.updateEstimatedOutputResolution();
    void this.updateEstimatedOutputSize();
  }
  createInfoRow(container, label) {
    container.createEl("span", { text: `${label}:` });
    return container.createEl("span", { text: "-" });
  }
  draw() {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(this.img, 0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.45)";
    ctx.fillRect(0, 0, this.canvas.width, this.cropY);
    ctx.fillRect(0, this.cropY + this.cropH, this.canvas.width, this.canvas.height - this.cropY - this.cropH);
    ctx.fillRect(0, this.cropY, this.cropX, this.cropH);
    ctx.fillRect(this.cropX + this.cropW, this.cropY, this.canvas.width - this.cropX - this.cropW, this.cropH);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(this.cropX, this.cropY, this.cropW, this.cropH);
    ctx.fillStyle = "#00bcd4";
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 1;
    const h = this.HANDLE_SIZE;
    const corners = this.getHandleRects();
    for (const rect of Object.values(corners)) {
      ctx.fillRect(rect.x, rect.y, h, h);
      ctx.strokeRect(rect.x, rect.y, h, h);
    }
  }
  getHandleRects() {
    const h = this.HANDLE_SIZE;
    const { cropX: x, cropY: y, cropW: w, cropH: hh } = this;
    return {
      nw: { x: x - h / 2, y: y - h / 2 },
      ne: { x: x + w - h / 2, y: y - h / 2 },
      sw: { x: x - h / 2, y: y + hh - h / 2 },
      se: { x: x + w - h / 2, y: y + hh - h / 2 }
    };
  }
  hitTestHandle(mx, my) {
    const h = this.HANDLE_SIZE;
    const hb = this.HANDLE_HITBOX;
    for (const [name, rect] of Object.entries(this.getHandleRects())) {
      const cx = rect.x + h / 2;
      const cy = rect.y + h / 2;
      if (mx >= cx - hb / 2 && mx <= cx + hb / 2 && my >= cy - hb / 2 && my <= cy + hb / 2) {
        return name;
      }
    }
    return "";
  }
  hitTestCrop(mx, my) {
    return mx >= this.cropX && mx <= this.cropX + this.cropW && my >= this.cropY && my <= this.cropY + this.cropH;
  }
  canvasCoords(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = rect.width > 0 ? this.canvas.width / rect.width : 1;
    const scaleY = rect.height > 0 ? this.canvas.height / rect.height : 1;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    return {
      x: Math.max(0, Math.min(this.canvas.width, x)),
      y: Math.max(0, Math.min(this.canvas.height, y))
    };
  }
  onMouseDown(e) {
    const { x, y } = this.canvasCoords(e);
    const handle = this.hitTestHandle(x, y);
    if (handle) {
      this.isResizing = true;
      this.resizeHandle = handle;
      this.dragStartX = x;
      this.dragStartY = y;
      return;
    }
    if (this.hitTestCrop(x, y)) {
      this.isDragging = true;
      this.dragStartX = x - this.cropX;
      this.dragStartY = y - this.cropY;
      return;
    }
    this.isDragging = false;
    this.isResizing = false;
    this.cropX = x;
    this.cropY = y;
    this.cropW = 1;
    this.cropH = 1;
    this.isResizing = true;
    this.resizeHandle = "se";
    this.dragStartX = x;
    this.dragStartY = y;
  }
  async performOptimization(optimizeButton) {
    optimizeButton.disabled = true;
    try {
      const payload = await this.renderOptimizedBlob();
      if (payload.blob.size >= this.currentSizeBytes) {
        new import_obsidian.Notice(this.i18n.optimizeWouldIncreaseSize, 8e3);
        return;
      }
      const risk = this.evaluateRisk(payload);
      if (risk.level === "high") {
        const confirmed = await this.confirmHighRiskOptimization(risk.message);
        if (!confirmed) return;
      }
      await this.onOptimize(payload);
      this.close();
    } catch (error) {
      console.error("[Magic Tools] Optimize image failed", error);
      new import_obsidian.Notice(this.i18n.optimizeSaveFailed);
    } finally {
      optimizeButton.disabled = false;
    }
  }
  getSourceRect() {
    const scaleX = this.img.naturalWidth / this.canvas.width;
    const scaleY = this.img.naturalHeight / this.canvas.height;
    const srcX = Math.round(this.cropX * scaleX);
    const srcY = Math.round(this.cropY * scaleY);
    const srcW = Math.max(1, Math.round(this.cropW * scaleX));
    const srcH = Math.max(1, Math.round(this.cropH * scaleY));
    return { x: srcX, y: srcY, width: srcW, height: srcH };
  }
  updateEstimatedOutputResolution() {
    const rect = this.getSourceRect();
    this.outputResolutionValueEl.setText(`${rect.width} x ${rect.height}`);
  }
  async updateEstimatedOutputSize() {
    const requestId = ++this.estimateRequestId;
    this.outputSizeValueEl.setText("...");
    if (this.optimizeButton) this.optimizeButton.disabled = true;
    try {
      const payload = await this.renderOptimizedBlob();
      if (requestId !== this.estimateRequestId) return;
      this.outputResolutionValueEl.setText(`${payload.width} x ${payload.height}`);
      const qualityInfo = payload.quality !== this.quality ? ` (${payload.quality})` : "";
      const sizeText = `${this.formatSize(payload.blob.size)}${qualityInfo}`;
      const risk = this.evaluateRisk(payload);
      this.riskValueEl.setText(risk.label);
      if (payload.blob.size >= this.currentSizeBytes) {
        this.outputSizeValueEl.setText(`${sizeText} \u26A0\uFE0F`);
        if (this.optimizeButton) this.optimizeButton.disabled = true;
      } else {
        this.outputSizeValueEl.setText(sizeText);
        if (this.optimizeButton) this.optimizeButton.disabled = false;
      }
    } catch {
      if (requestId !== this.estimateRequestId) return;
      this.outputSizeValueEl.setText("-");
      this.riskValueEl.setText("-");
      if (this.optimizeButton) this.optimizeButton.disabled = true;
    }
  }
  evaluateRisk(payload) {
    const ratio = payload.blob.size / Math.max(1, this.currentSizeBytes);
    const pixels = Math.max(1, payload.width * payload.height);
    const bpp = payload.blob.size * 8 / pixels;
    const lowQuality = this.qualityEnabled && payload.quality <= 30;
    const aggressiveShrink = ratio < 0.25;
    const veryLowBpp = bpp < 0.6;
    if (lowQuality && aggressiveShrink || lowQuality && veryLowBpp || aggressiveShrink && veryLowBpp) {
      return {
        level: "high",
        label: this.i18n.optimizeRiskHigh,
        message: this.i18n.optimizeRiskDisclaimer
      };
    }
    if (this.qualityEnabled && payload.quality <= 40 || ratio < 0.4 || bpp < 1) {
      return {
        level: "medium",
        label: this.i18n.optimizeRiskMedium,
        message: this.i18n.optimizeRiskDisclaimer
      };
    }
    return {
      level: "low",
      label: this.i18n.optimizeRiskLow,
      message: this.i18n.optimizeRiskDisclaimer
    };
  }
  confirmHighRiskOptimization(message) {
    const prompt = `${this.i18n.optimizeHighRiskTitle}

${message}

${this.i18n.optimizeContinueAnyway}?`;
    return Promise.resolve(window.confirm(prompt));
  }
  async renderOptimizedBlob() {
    const src = this.getSourceRect();
    const baseCanvas = document.createElement("canvas");
    baseCanvas.width = src.width;
    baseCanvas.height = src.height;
    const baseCtx = baseCanvas.getContext("2d");
    if (!baseCtx) throw new Error("Canvas context unavailable");
    baseCtx.drawImage(this.img, src.x, src.y, src.width, src.height, 0, 0, src.width, src.height);
    const qualityCandidates = this.getCandidateQualities();
    const scaleCandidates = [1, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5, 0.45, 0.4, 0.35, 0.3, 0.25];
    let bestPayload = null;
    for (const scale of scaleCandidates) {
      const targetW = Math.max(1, Math.round(src.width * scale));
      const targetH = Math.max(1, Math.round(src.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;
      ctx.drawImage(baseCanvas, 0, 0, src.width, src.height, 0, 0, targetW, targetH);
      for (const q of qualityCandidates) {
        const blob = await this.renderBlob(canvas, q);
        if (!blob) continue;
        const payload = {
          blob,
          width: targetW,
          height: targetH,
          quality: q,
          outputMimeType: this.getEffectiveOutputMimeType()
        };
        if (!bestPayload || payload.blob.size < bestPayload.blob.size) {
          bestPayload = payload;
        }
        if (payload.blob.size < this.currentSizeBytes) {
          return payload;
        }
      }
    }
    if (bestPayload) return bestPayload;
    throw new Error("Blob conversion failed");
  }
  getCandidateQualities() {
    if (!this.qualityEnabled && !this.forceJpegConversion) {
      return [this.quality];
    }
    const filtered = this.QUALITY_OPTIONS.filter((q) => q <= this.quality);
    return filtered.length ? [...filtered] : [this.quality];
  }
  renderBlob(canvas, quality) {
    const mime = this.getEffectiveOutputMimeType();
    return new Promise((resolve) => {
      canvas.toBlob(resolve, mime, quality / 100);
    });
  }
  getEffectiveOutputMimeType() {
    return this.forceJpegConversion ? "image/jpeg" : this.outputMimeType;
  }
  formatSize(bytes) {
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
};
var MagicToolsPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.settings = DEFAULT_SETTINGS;
    this.i18n = I18N[getLocale()];
  }
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new MagicToolsSettingTab(this.app, this));
    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor, view) => {
        if (this.findImageContextNearPointer(editor, window.event)) {
          return;
        }
        const pointerEvent = window.event;
        const imageContext = this.findImageContextNearPointer(editor, pointerEvent) ?? this.getCurrentImageContext(editor, view);
        const selectedText = editor.getSelection().trim();
        const hasSelection = selectedText.length >= this.settings.minPdfSelectionChars;
        const canExportSelection = hasSelection && !!view.file;
        const canExtractImage = !!imageContext;
        const canOptimizeImage = canExtractImage && this.settings.enableImageOptimization;
        const canExplainSelection = this.canShowAiDefinitionAction(selectedText);
        if (!canExportSelection && !canExtractImage && !canOptimizeImage && !canExplainSelection) {
          return;
        }
        menu.addItem((item) => {
          item.setTitle(this.i18n.menuGroupTitle).setIsLabel(true).setSection("magic-tools");
        });
        if (canExportSelection && view.file) {
          menu.addItem((item) => {
            item.setTitle(this.i18n.contextExportSelectionToPdf);
            item.setSection("magic-tools");
            item.onClick(async () => {
              try {
                await this.exportSelectionToPdf(editor, view.file);
              } catch (error) {
                console.error("[Magic Tools] Context export selection to PDF failed", error);
                new import_obsidian.Notice(this.i18n.pdfFailed);
              }
            });
          });
        }
        if (canExplainSelection) {
          menu.addItem((item) => {
            item.setTitle(this.i18n.explainSelectionWithAi);
            item.setSection("magic-tools");
            item.onClick(async () => {
              await this.handleAiDefinition(selectedText);
            });
          });
        }
        if (canExtractImage && imageContext) {
          menu.addItem((item) => {
            item.setTitle(this.i18n.extractTextFromImage);
            item.setSection("magic-tools");
            item.onClick(async () => this.handleImageOcr(editor, imageContext));
          });
        }
        if (canOptimizeImage && imageContext) {
          menu.addItem((item) => {
            item.setTitle(this.i18n.optimizeAction);
            item.setSection("magic-tools");
            item.onClick(async () => this.handleImageOptimization(imageContext.file));
          });
        }
      })
    );
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (!(file instanceof import_obsidian.TFile)) return;
        if (!this.isImageFile(file)) return;
        menu.addItem((item) => {
          item.setTitle(this.i18n.menuGroupTitle).setIsLabel(true).setSection("magic-tools");
        });
        menu.addItem((item) => {
          item.setTitle(this.i18n.extractTextFromImage);
          item.setSection("magic-tools");
          item.onClick(async () => {
            const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
            const editor = view?.editor;
            const activeFile = view?.file;
            if (!editor || !activeFile) {
              new import_obsidian.Notice(this.i18n.noImageDetected);
              return;
            }
            const line = this.findImageLineForFile(editor, file, activeFile.path);
            if (line === -1) {
              new import_obsidian.Notice(this.i18n.noImageDetected);
              return;
            }
            const imageContext = {
              file,
              line,
              syntax: this.extractImageSyntaxAtLine(editor, line) ?? `![[${file.path}]]`
            };
            await this.handleImageOcr(editor, imageContext);
          });
        });
        if (this.settings.enableImageOptimization) {
          menu.addItem((item) => {
            item.setTitle(this.i18n.optimizeAction);
            item.setSection("magic-tools");
            item.onClick(async () => this.handleImageOptimization(file));
          });
        }
      })
    );
    this.addCommand({
      id: "export-selection-to-pdf",
      name: this.i18n.exportSelectionToPdf,
      editorCheckCallback: (checking, editor, view) => {
        if (!editor || !view?.file) return false;
        if (checking) return true;
        this.exportSelectionToPdf(editor, view.file).catch((error) => {
          console.error("[Magic Tools] Export selection to PDF failed", error);
          new import_obsidian.Notice(this.i18n.pdfFailed);
        });
        return true;
      }
    });
  }
  async handleImageOcr(editor, imageContext) {
    try {
      const maxBytes = this.settings.maxImageSizeMb * 1024 * 1024;
      if (imageContext.file.stat.size > maxBytes) {
        new import_obsidian.Notice(
          this.i18n.imageTooLarge(imageContext.file.stat.size / (1024 * 1024), this.settings.maxImageSizeMb)
        );
        return;
      }
      const binary = await this.app.vault.readBinary(imageContext.file);
      const timeoutMs = clampTimeoutSeconds(this.settings.ocrTimeoutSeconds) * 1e3;
      const extracted = await withTimeout(this.runOcr(binary, imageContext.file.extension), timeoutMs);
      const safeText = sanitizeOcrText(extracted);
      if (!safeText) throw new Error("EMPTY_OCR_RESULT");
      const insertFn = () => {
        const insertedText = this.buildInsertedText(safeText);
        editor.replaceRange(insertedText, { line: imageContext.line + 1, ch: 0 });
        if (this.settings.defaultProvider === "gemini" && this.settings.geminiFastMode) {
          editor.replaceRange("", { line: imageContext.line, ch: 0 }, { line: imageContext.line + 1, ch: 0 });
        }
        new import_obsidian.Notice(this.i18n.inserted);
      };
      if (this.settings.defaultProvider === "gemini" && this.settings.geminiFastMode) {
        insertFn();
        return;
      }
      new OcrResultModal(this.app, safeText, insertFn).open();
    } catch (error) {
      console.error("[Magic Tools] OCR failed", error);
      if (error instanceof Error && error.message === "OCR_TIMEOUT") {
        new import_obsidian.Notice(this.i18n.timeoutError, 8e3);
      } else if (error instanceof Error && error.message.includes("HTTP 503")) {
        new import_obsidian.Notice(this.i18n.serviceUnavailable, 8e3);
      } else if (error instanceof Error && error.message.includes("HTTP 429")) {
        new import_obsidian.Notice(this.i18n.rateLimited, 8e3);
      } else {
        new import_obsidian.Notice(`${this.i18n.ocrFailed} ${error instanceof Error ? error.message : ""}`.trim());
      }
    }
  }
  async handleImageOptimization(imageFile) {
    const extension = imageFile.extension.toLowerCase();
    if (!isImageOptimizationSupported(extension)) {
      new import_obsidian.Notice(this.i18n.optimizeUnsupportedFormat(extension));
      return;
    }
    const binary = await this.app.vault.readBinary(imageFile);
    const mimeType = this.getMimeType(extension);
    const base64 = this.arrayBufferToBase64(binary);
    const dataUrl = `data:${mimeType};base64,${base64}`;
    new ImageOptimizationModal(this.app, dataUrl, mimeType, binary.byteLength, async (payload) => {
      try {
        const optimizedBinary = await payload.blob.arrayBuffer();
        if (this.settings.replaceOriginalImage) {
          if (this.settings.createBackupBeforeReplace) {
            const bkpPath = imageFile.path + ".bkp";
            await this.app.vault.adapter.writeBinary(bkpPath, binary);
          }
          await this.app.vault.modifyBinary(imageFile, optimizedBinary);
          new import_obsidian.Notice(
            this.settings.createBackupBeforeReplace ? this.i18n.optimizeSavedReplacedWithBackup : this.i18n.optimizeSavedReplaced
          );
          return;
        }
        const outputExt = payload.outputMimeType === "image/jpeg" ? "jpg" : payload.outputMimeType === "image/webp" ? "webp" : imageFile.extension;
        const outputPath = buildOptimizedImagePathWithExtension(imageFile.path, outputExt);
        await this.app.vault.adapter.writeBinary(outputPath, optimizedBinary);
        new import_obsidian.Notice(this.i18n.optimizeSavedNewFile(outputPath));
      } catch (error) {
        console.error("[Magic Tools] Image optimization save failed", error);
        throw error;
      }
    }).open();
  }
  pickImageContextFromSelection(editor, view) {
    const selected = editor.getSelection().trim();
    if (!selected || !view.file) return null;
    if (!this.isSelectionSingleImage(selected)) return null;
    const syntax = getMarkdownImageMatch(selected);
    if (!syntax) return null;
    const line = editor.getCursor().line;
    const file = this.resolveImageFile(syntax, view.file.path);
    if (!file) return null;
    return { file, line, syntax };
  }
  async runOcr(binary, extension) {
    if (this.settings.defaultProvider === "gemini") {
      return this.runGeminiOcr(binary, extension);
    }
    if (this.settings.defaultProvider === "openai") {
      return this.runOpenAiOcr(binary, extension);
    }
    return this.runLocalOcr(binary);
  }
  hasOnlineAiConfigured() {
    return !!this.settings.googleApiKey.trim() || !!this.settings.openaiApiKey.trim();
  }
  canShowAiDefinitionAction(selection) {
    return this.settings.enableAiDefinitions && this.hasOnlineAiConfigured() && !!selection.trim();
  }
  async handleAiDefinition(selection) {
    if (!this.settings.enableAiDefinitions) return;
    if (!this.hasOnlineAiConfigured()) {
      new import_obsidian.Notice(this.i18n.aiDefinitionApiKeyMissing);
      return;
    }
    if (!isAiDefinitionSelectionValid(selection)) {
      new import_obsidian.Notice(this.i18n.aiDefinitionSelectionInvalid);
      return;
    }
    try {
      const timeoutMs = clampTimeoutSeconds(this.settings.ocrTimeoutSeconds) * 1e3;
      const explanation = await withTimeout(this.runAiDefinition(selection), timeoutMs);
      const safeText = sanitizeOcrText(explanation);
      if (!safeText) {
        throw new Error("EMPTY_AI_DEFINITION_RESULT");
      }
      const singleParagraph = safeText.replace(/\s*\n+\s*/g, " ").trim();
      const normalizedTerm = selection.trim();
      const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const termTokens = normalizedTerm.split(/\s+/).filter(Boolean).map(escapeRegex);
      const termPattern = termTokens.length ? new RegExp(`\\b${termTokens.join("\\\\s+")}\\b`, "i") : null;
      const matchedTermInExplanation = termPattern ? singleParagraph.match(termPattern)?.[0] ?? "" : "";
      const smartCapitalizeWord = (word) => {
        if (!word) return word;
        const hasUpperAfterFirst = /[A-Z]/.test(word.slice(1));
        if (hasUpperAfterFirst) return word;
        if (word === word.toUpperCase()) return word;
        if (word === word.toLowerCase()) {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      };
      const fallbackCapitalizedTerm = normalizedTerm.split(/(\s+)/).map((chunk) => chunk.trim() ? smartCapitalizeWord(chunk) : chunk).join("");
      const capitalizedTerm = matchedTermInExplanation || fallbackCapitalizedTerm;
      const formatted = `**${capitalizedTerm}**: ${singleParagraph}`;
      new AiDefinitionModal(this.app, formatted).open();
    } catch (error) {
      console.error("[Magic Tools] Explain selection failed", error);
      if (error instanceof Error && error.message === "OCR_TIMEOUT") {
        new import_obsidian.Notice(this.i18n.aiDefinitionTimeout, 8e3);
      } else if (error instanceof Error && error.message.includes("HTTP 503")) {
        new import_obsidian.Notice(this.i18n.aiDefinitionServiceUnavailable, 8e3);
      } else if (error instanceof Error && error.message.includes("HTTP 429")) {
        new import_obsidian.Notice(this.i18n.aiDefinitionRateLimited, 8e3);
      } else {
        new import_obsidian.Notice(this.i18n.aiDefinitionFailed);
      }
    }
  }
  resolveAiDefinitionProvider() {
    if (this.settings.defaultProvider === "gemini" && this.settings.googleApiKey.trim()) return "gemini";
    if (this.settings.defaultProvider === "openai" && this.settings.openaiApiKey.trim()) return "openai";
    if (this.settings.openaiApiKey.trim()) return "openai";
    if (this.settings.googleApiKey.trim()) return "gemini";
    return null;
  }
  getAiLanguageHint() {
    return getAiDefinitionLanguageName(this.settings.aiDefinitionLanguage);
  }
  async runAiDefinition(selection) {
    const provider = this.resolveAiDefinitionProvider();
    if (!provider) {
      throw new Error(this.i18n.aiDefinitionApiKeyMissing);
    }
    const languageHint = this.getAiLanguageHint();
    const prompt = `Explain the selected term or phrase in 2-4 short sentences. If it is a company, person, or organization, explain what it is and why it is known. Be concise, factual, and avoid markdown/bullets. Language: ${languageHint}. Selection: ${selection}`;
    if (provider === "gemini") {
      const response2 = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(this.settings.googleApiKey)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ]
          })
        }
      );
      if (!response2.ok) {
        const details = await this.tryExtractProviderError(response2);
        throw new Error(`Gemini HTTP ${response2.status}${details ? ` - ${details}` : ""}`);
      }
      const payload2 = await response2.json();
      return payload2.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("\n") ?? "";
    }
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.settings.openaiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          {
            role: "user",
            content: [{ type: "input_text", text: prompt }]
          }
        ]
      })
    });
    if (!response.ok) {
      const details = await this.tryExtractProviderError(response);
      throw new Error(`OpenAI HTTP ${response.status}${details ? ` - ${details}` : ""}`);
    }
    const payload = await response.json();
    if (payload.output_text?.trim()) {
      return payload.output_text;
    }
    return payload.output?.flatMap((item) => item.content ?? []).map((part) => part.type === "output_text" || part.type === "text" ? part.text ?? "" : "").join("\n").trim() ?? "";
  }
  async runGeminiOcr(binary, extension) {
    if (!this.settings.googleApiKey?.trim()) {
      throw new Error(this.i18n.apiKeyMissing);
    }
    const base64 = this.arrayBufferToBase64(binary);
    const mimeType = this.getMimeType(extension);
    const languageHint = this.settings.ocrLanguage === "auto" ? "auto" : this.settings.ocrLanguage;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(this.settings.googleApiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Extract only readable text from this image. Do not add commentary. OCR language hint: ${languageHint}.`
                },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64
                  }
                }
              ]
            }
          ]
        })
      }
    );
    if (!response.ok) {
      const details = await this.tryExtractProviderError(response);
      throw new Error(`Gemini HTTP ${response.status}${details ? ` - ${details}` : ""}`);
    }
    const payload = await response.json();
    const text = payload.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("\n") ?? "";
    return text;
  }
  async runOpenAiOcr(binary, extension) {
    if (!this.settings.openaiApiKey?.trim()) {
      throw new Error(this.i18n.openAiApiKeyMissing);
    }
    const base64 = this.arrayBufferToBase64(binary);
    const mimeType = this.getMimeType(extension);
    const languageHint = this.settings.ocrLanguage === "auto" ? "auto" : this.settings.ocrLanguage;
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.settings.openaiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `Extract only readable text from this image. Do not add commentary. OCR language hint: ${languageHint}.`
              },
              {
                type: "input_image",
                image_url: `data:${mimeType};base64,${base64}`
              }
            ]
          }
        ]
      })
    });
    if (!response.ok) {
      const details = await this.tryExtractProviderError(response);
      throw new Error(`OpenAI HTTP ${response.status}${details ? ` - ${details}` : ""}`);
    }
    const payload = await response.json();
    if (payload.output_text?.trim()) {
      return payload.output_text;
    }
    const contentText = payload.output?.flatMap((item) => item.content ?? []).map((part) => part.type === "output_text" || part.type === "text" ? part.text ?? "" : "").join("\n").trim() ?? "";
    return contentText;
  }
  async tryExtractProviderError(response) {
    try {
      const clone = response.clone();
      const body = await clone.json();
      return body.error?.message?.trim() || body.message?.trim() || "";
    } catch {
      return "";
    }
  }
  async runLocalOcr(binary) {
    const lang = this.settings.ocrLanguage === "es" ? "spa" : this.settings.ocrLanguage === "en" ? "eng" : "eng+spa";
    const tesseract = await Promise.resolve().then(() => __toESM(require_src()));
    const worker = await tesseract.createWorker(lang);
    try {
      const result = await worker.recognize(new Uint8Array(binary));
      return result.data.text ?? "";
    } finally {
      await worker.terminate();
    }
  }
  async exportSelectionToPdf(editor, noteFile) {
    const selection = editor.getSelection();
    if (!selection.trim()) {
      new import_obsidian.Notice(this.i18n.noTextSelected);
      return;
    }
    if (selection.trim().length < this.settings.minPdfSelectionChars) {
      new import_obsidian.Notice(this.i18n.selectionTooShort(this.settings.minPdfSelectionChars));
      return;
    }
    if (!import_obsidian.Platform.isDesktopApp) {
      new import_obsidian.Notice(this.i18n.pdfNotDesktop);
      return;
    }
    const selectionWithInlinedImages = this.inlineImageEmbedsForSelection(selection, noteFile.path);
    const renderedHtml = await this.renderSelectionHtml(selectionWithInlinedImages, noteFile.path);
    const finalContent = renderedHtml.trim() ? renderedHtml : this.escapeHtml(selectionWithInlinedImages).replace(/\n/g, "<br/>");
    if (!renderedHtml.trim()) {
      new import_obsidian.Notice(this.i18n.emptyRenderedPdfFallback);
    }
    console.log("[Magic Tools] PDF render content length:", finalContent.length);
    const html = this.buildPrintableHtml(finalContent);
    const pdfBuffer = await this.renderPdfFromHtml(html);
    if (!pdfBuffer) {
      new import_obsidian.Notice(this.i18n.commandPdfUnavailable);
      return;
    }
    const outputPath = await this.resolvePdfOutputPath(noteFile.path, noteFile.basename);
    if (!outputPath) {
      new import_obsidian.Notice(this.i18n.saveDialogCanceled);
      return;
    }
    try {
      await this.writePdfToPath(outputPath, pdfBuffer);
      new import_obsidian.Notice(this.i18n.pdfSaved(outputPath));
    } catch (error) {
      console.error("[Magic Tools] PDF write failed", error);
      new import_obsidian.Notice(this.i18n.pdfWriteFailed);
    }
  }
  async resolvePdfOutputPath(notePath, noteBasename) {
    const folder = this.settings.pdfExportFolder.trim();
    if (!folder) {
      const savePath = await this.promptPdfSavePath(`${noteBasename}-selection.pdf`);
      return savePath;
    }
    if (this.isAbsoluteSystemPath(folder)) {
      new import_obsidian.Notice(this.i18n.invalidPdfExportFolder);
      return null;
    }
    return (0, import_obsidian.normalizePath)(buildSelectionPdfOutputPath(notePath, noteBasename, folder));
  }
  isAbsoluteSystemPath(value) {
    return value.startsWith("/") || value.startsWith("~") || /^[A-Za-z]:\\/.test(value);
  }
  async promptPdfSavePath(defaultFileName) {
    if (!import_obsidian.Platform.isDesktopApp) return null;
    try {
      const req = window.require;
      if (!req) return null;
      const remote = req("@electron/remote");
      const dialog = remote?.dialog;
      const result = await dialog?.showSaveDialog({
        title: this.i18n.contextExportSelectionToPdf,
        defaultPath: defaultFileName,
        filters: [{ name: "PDF", extensions: ["pdf"] }]
      });
      if (!result || result.canceled || !result.filePath) {
        return null;
      }
      return result.filePath;
    } catch (error) {
      console.error("[Magic Tools] Save dialog unavailable", error);
      return null;
    }
  }
  async writePdfToPath(outputPath, pdfBuffer) {
    if (this.isAbsoluteSystemPath(outputPath)) {
      const req = window.require;
      if (!req) throw new Error("Node require unavailable");
      const fs = req("fs/promises");
      await fs.writeFile(outputPath, new Uint8Array(pdfBuffer));
      return;
    }
    await this.ensureVaultFolderExistsForPath(outputPath);
    await this.app.vault.adapter.writeBinary(outputPath, pdfBuffer);
  }
  buildPrintableHtml(innerHtml) {
    const baseHref = window.location.href;
    return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <base href="${baseHref}" />
    <style>
      html, body { background: transparent !important; color: #111 !important; }
      body { margin: 0; }
      .markdown-preview-view, .markdown-rendered { color: #111 !important; }
      .markdown-preview-view * { color: inherit !important; }
      .markdown-preview-view { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.55; }
      h1, h2, h3, h4, h5, h6 { margin: 1.1em 0 0.55em; }
      p, ul, ol, blockquote, pre { margin: 0.6em 0; }
      code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
      blockquote { border-left: 3px solid #999; padding-left: 0.8em; }
      img { max-width: 100%; height: auto; }
      .callout { border: 1px solid #d0d0d0; border-radius: 8px; padding: 10px 12px; margin: 10px 0; background: #f7f7f7; }
      .callout-title { font-weight: 700; margin-bottom: 6px; }
      .callout-content > :first-child { margin-top: 0; }
      .callout-content > :last-child { margin-bottom: 0; }
      .callout[data-callout="important"] { border-left: 4px solid #d97706; }
      .callout[data-callout="warning"] { border-left: 4px solid #b91c1c; }
      .callout[data-callout="note"] { border-left: 4px solid #2563eb; }
    </style>
  </head>
  <body>
    <div class="markdown-preview-view markdown-rendered markdown-preview-section" style="padding:24px;">
      ${innerHtml}
    </div>
  </body>
</html>`;
  }
  async renderPdfFromHtml(html) {
    try {
      const req = window.require;
      if (!req) return null;
      const remote = req("@electron/remote");
      if (!remote?.BrowserWindow) return null;
      const win = new remote.BrowserWindow({
        show: false,
        webPreferences: { sandbox: false }
      });
      await win.loadURL("about:blank");
      await win.webContents.executeJavaScript(
        `document.open();document.write(${JSON.stringify(html)});document.close();`,
        true
      );
      await win.webContents.executeJavaScript(
        `new Promise((resolve) => {
          const done = () => setTimeout(resolve, 120);
          if (document.readyState === 'complete') {
            const imgs = Array.from(document.images || []);
            if (!imgs.length) return done();
            let pending = imgs.length;
            const next = () => { pending -= 1; if (pending <= 0) done(); };
            imgs.forEach((img) => {
              if (img.complete) return next();
              img.addEventListener('load', next, { once: true });
              img.addEventListener('error', next, { once: true });
            });
            return;
          }
          window.addEventListener('load', done, { once: true });
        })`,
        true
      );
      const nodeBuffer = await win.webContents.printToPDF({
        printBackground: true,
        preferCSSPageSize: true
      });
      if (!nodeBuffer || nodeBuffer.byteLength < 1024) {
        console.warn("[Magic Tools] PDF output looks too small/empty", nodeBuffer?.byteLength ?? 0);
      }
      win.destroy();
      return nodeBuffer.buffer.slice(nodeBuffer.byteOffset, nodeBuffer.byteOffset + nodeBuffer.byteLength);
    } catch (error) {
      console.error("[Magic Tools] Electron PDF rendering unavailable", error);
      return null;
    }
  }
  async renderSelectionHtml(markdown, sourcePath) {
    const host = document.createElement("div");
    host.style.position = "fixed";
    host.style.left = "-99999px";
    host.style.top = "0";
    host.style.width = "800px";
    host.style.zIndex = "-1";
    host.className = "markdown-preview-view markdown-rendered markdown-preview-section";
    document.body.appendChild(host);
    try {
      await import_obsidian.MarkdownRenderer.render(this.app, markdown, host, sourcePath, this);
      await this.inlineRenderedImagesAsDataUrls(host);
      await this.waitForPaint();
      return host.innerHTML;
    } finally {
      host.remove();
    }
  }
  async inlineRenderedImagesAsDataUrls(container) {
    const imgs = Array.from(container.querySelectorAll("img"));
    for (const img of imgs) {
      const src = img.getAttribute("src") ?? "";
      if (!src || src.startsWith("data:") || src.startsWith("http://") || src.startsWith("https://")) {
        continue;
      }
      try {
        const response = await fetch(src);
        if (!response.ok) continue;
        const blob = await response.blob();
        const dataUrl = await this.blobToDataUrl(blob);
        img.setAttribute("src", dataUrl);
      } catch {
      }
    }
  }
  blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  }
  async waitForPaint() {
    await new Promise((resolve) => window.requestAnimationFrame(() => resolve()));
    await new Promise((resolve) => window.setTimeout(() => resolve(), 60));
  }
  escapeHtml(input) {
    return input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
  }
  getCurrentImageContext(editor, view) {
    const fromSelection = this.pickImageContextFromSelection(editor, view);
    if (fromSelection) return fromSelection;
    const line = editor.getCursor().line;
    const lineText = editor.getLine(line);
    if (!view.file) return null;
    const matches = getMarkdownImageMatches(lineText);
    for (const syntax of matches) {
      const file = this.resolveImageFile(syntax, view.file.path);
      if (file) {
        return {
          file,
          line,
          syntax
        };
      }
    }
    return null;
  }
  resolveImageFile(imageSyntax, sourcePath) {
    const wikiMatch = imageSyntax.match(/!\[\[([^\]]+)\]\]/);
    if (wikiMatch?.[1]) {
      const clean = removeWikiDecorators(wikiMatch[1]);
      const file = this.app.metadataCache.getFirstLinkpathDest(clean, sourcePath);
      return file instanceof import_obsidian.TFile ? file : null;
    }
    const mdMatch = imageSyntax.match(/!\[[^\]]*\]\(([^)]+)\)/);
    if (!mdMatch?.[1]) return null;
    const candidates = resolveMarkdownImagePaths(mdMatch[1], sourcePath);
    for (const candidate of candidates) {
      const af = this.app.vault.getAbstractFileByPath(candidate);
      if (af instanceof import_obsidian.TFile) return af;
    }
    return null;
  }
  inlineImageEmbedsForSelection(selection, sourcePath) {
    const wikiPattern = /!\[\[([^\]]+)\]\]/g;
    const markdownPattern = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const withWikiResolved = selection.replace(wikiPattern, (_full, rawPath) => {
      const clean = removeWikiDecorators(rawPath);
      const file = this.app.metadataCache.getFirstLinkpathDest(clean, sourcePath);
      if (!(file instanceof import_obsidian.TFile)) return `![[${rawPath}]]`;
      return `![](${this.app.vault.getResourcePath(file)})`;
    });
    return withWikiResolved.replace(markdownPattern, (_full, alt, rawPath) => {
      if (/^https?:\/\//i.test(rawPath) || /^data:/i.test(rawPath)) {
        return `![${alt}](${rawPath})`;
      }
      const candidates = resolveMarkdownImagePaths(rawPath, sourcePath);
      for (const candidate of candidates) {
        const file = this.app.vault.getAbstractFileByPath(candidate);
        if (file instanceof import_obsidian.TFile) {
          return `![${alt}](${this.app.vault.getResourcePath(file)})`;
        }
      }
      return `![${alt}](${rawPath})`;
    });
  }
  findImageContextNearPointer(editor, event) {
    if (!event?.target) return null;
    const target = event.target;
    const editorContainer = target.closest(".markdown-source-view.mod-cm6");
    if (!editorContainer) return null;
    const imageToken = target.closest("img, span.cm-embed.cm-image, span.cm-formatting-embed.cm-image");
    const lineElement = target.closest(".cm-line");
    let tokenText = imageToken?.textContent?.trim() ?? "";
    if (!tokenText && imageToken instanceof HTMLImageElement) {
      const possibleAlt = imageToken.getAttribute("alt") ?? "";
      tokenText = possibleAlt.startsWith("![[") || possibleAlt.startsWith("![") ? possibleAlt : "";
    }
    const lineNumberAttr = lineElement?.getAttribute("data-line");
    const lineNumber = lineNumberAttr ? Number(lineNumberAttr) : NaN;
    const line = Number.isFinite(lineNumber) ? lineNumber : editor.getCursor().line;
    const lineText = editor.getLine(line);
    const matches = getMarkdownImageMatches(tokenText || lineText);
    if (!matches.length) return null;
    const activeFile = this.app.workspace.getActiveFile();
    if (!activeFile) return null;
    for (const syntax of matches) {
      const file = this.resolveImageFile(syntax, activeFile.path);
      if (file) {
        return { file, line, syntax };
      }
    }
    return null;
  }
  getMimeType(extension) {
    const ext = extension.toLowerCase();
    if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
    if (ext === "webp") return "image/webp";
    if (ext === "gif") return "image/gif";
    return "image/png";
  }
  extractImageSyntaxAtLine(editor, line) {
    const lineText = editor.getLine(line);
    return getMarkdownImageMatch(lineText);
  }
  findImageLineForFile(editor, imageFile, sourcePath) {
    const totalLines = editor.lineCount();
    const cursorLine = editor.getCursor().line;
    const matches = [];
    for (let i = 0; i < totalLines; i += 1) {
      const syntax = getMarkdownImageMatch(editor.getLine(i));
      if (!syntax) continue;
      const resolved = this.resolveImageFile(syntax, sourcePath);
      if (resolved?.path === imageFile.path) {
        matches.push(i);
      }
    }
    if (matches.length === 0) return -1;
    let bestLine = matches[0];
    let bestDistance = Math.abs(bestLine - cursorLine);
    for (let i = 1; i < matches.length; i += 1) {
      const dist = Math.abs(matches[i] - cursorLine);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestLine = matches[i];
      }
    }
    return bestLine;
  }
  async ensureVaultFolderExistsForPath(filePath) {
    const idx = filePath.lastIndexOf("/");
    if (idx <= 0) return;
    const folderPath = filePath.substring(0, idx);
    const existing = this.app.vault.getAbstractFileByPath(folderPath);
    if (existing) return;
    const segments = folderPath.split("/").filter(Boolean);
    let current = "";
    for (const segment of segments) {
      current = current ? `${current}/${segment}` : segment;
      const af = this.app.vault.getAbstractFileByPath(current);
      if (!af) {
        await this.app.vault.createFolder(current);
      }
    }
  }
  buildInsertedText(safeText) {
    if (!this.settings.insertAsCallout) {
      return `
${safeText}
`;
    }
    return `> [!note] ${this.i18n.modalTitle}
> ${safeText.replace(/\n/g, "\n> ")}
`;
  }
  isSelectionSingleImage(selection) {
    const trimmed = selection.trim();
    if (!trimmed) return false;
    const matched = getMarkdownImageMatch(trimmed);
    return matched === trimmed;
  }
  isImageFile(file) {
    return ["png", "jpg", "jpeg", "webp", "gif", "bmp", "svg"].includes(file.extension.toLowerCase());
  }
  arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.byteLength; i += 1) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  async loadSettings() {
    const loaded = await this.loadData();
    this.settings = Object.assign({}, DEFAULT_SETTINGS, loaded);
    if (typeof loaded.enableImageOptimization !== "boolean" && typeof loaded.enableCrop === "boolean") {
      this.settings.enableImageOptimization = loaded.enableCrop;
    }
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var MagicToolsSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.i18n = I18N[getLocale()];
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: this.i18n.settingsTitle });
    containerEl.createEl("h3", { text: this.i18n.sectionOcr });
    new import_obsidian.Setting(containerEl).setName(this.i18n.settingApiKey).setDesc(this.i18n.settingApiKeyDesc).addText(
      (text) => text.setPlaceholder("AIza...").setValue(this.plugin.settings.googleApiKey).onChange(async (value) => {
        this.plugin.settings.googleApiKey = value.trim();
        await this.plugin.saveSettings();
        this.display();
      })
    );
    new import_obsidian.Setting(containerEl).setName(this.i18n.settingOpenAiApiKey).setDesc(this.i18n.settingOpenAiApiKeyDesc).addText(
      (text) => text.setPlaceholder("sk-...").setValue(this.plugin.settings.openaiApiKey).onChange(async (value) => {
        this.plugin.settings.openaiApiKey = value.trim();
        await this.plugin.saveSettings();
        this.display();
      })
    );
    new import_obsidian.Setting(containerEl).setName(this.i18n.settingProvider).setDesc(this.i18n.settingProviderDesc).addDropdown((dropdown) => {
      dropdown.addOption("local", this.i18n.providerLocal).addOption("gemini", this.i18n.providerGemini).addOption("openai", this.i18n.providerOpenAI).setValue(this.plugin.settings.defaultProvider).onChange(async (value) => {
        const allowed = ["local", "gemini", "openai"];
        if (allowed.includes(value)) {
          this.plugin.settings.defaultProvider = value;
          await this.plugin.saveSettings();
        }
      });
    });
    new import_obsidian.Setting(containerEl).setName(this.i18n.settingInsertAsCallout).setDesc(this.i18n.settingInsertAsCalloutDesc).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.insertAsCallout).onChange(async (value) => {
        this.plugin.settings.insertAsCallout = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName(this.i18n.settingGeminiFastMode).setDesc(this.i18n.settingGeminiFastModeDesc).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.geminiFastMode).onChange(async (value) => {
        this.plugin.settings.geminiFastMode = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName(this.i18n.settingLanguage).setDesc(this.i18n.settingLanguageDesc).addDropdown((dropdown) => {
      dropdown.addOption("auto", this.i18n.langAuto).addOption("es", this.i18n.langEs).addOption("en", this.i18n.langEn).setValue(this.plugin.settings.ocrLanguage).onChange(async (value) => {
        const allowed = ["auto", "es", "en"];
        if (allowed.includes(value)) {
          this.plugin.settings.ocrLanguage = value;
          await this.plugin.saveSettings();
        }
      });
    });
    new import_obsidian.Setting(containerEl).setName(this.i18n.settingMaxSize).setDesc(this.i18n.settingMaxSizeDesc).addText(
      (text) => text.setValue(String(this.plugin.settings.maxImageSizeMb)).onChange(async (value) => {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) {
          this.plugin.settings.maxImageSizeMb = Math.max(1, Math.min(15, Math.round(parsed)));
          await this.plugin.saveSettings();
        }
      })
    );
    new import_obsidian.Setting(containerEl).setName(this.i18n.settingTimeout).setDesc(this.i18n.settingTimeoutDesc).addText(
      (text) => text.setValue(String(this.plugin.settings.ocrTimeoutSeconds)).onChange(async (value) => {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) {
          this.plugin.settings.ocrTimeoutSeconds = Math.max(
            MIN_TIMEOUT_SECONDS,
            Math.min(MAX_TIMEOUT_SECONDS, Math.round(parsed))
          );
          await this.plugin.saveSettings();
        }
      })
    );
    containerEl.createEl("h3", { text: this.i18n.sectionAiDefinitions });
    const hasAiApiConfigured = this.plugin.hasOnlineAiConfigured();
    new import_obsidian.Setting(containerEl).setName(this.i18n.settingEnableAiDefinitions).setDesc(this.i18n.settingEnableAiDefinitionsDesc).addToggle((toggle) => {
      toggle.setValue(hasAiApiConfigured ? this.plugin.settings.enableAiDefinitions : false).setDisabled(!hasAiApiConfigured).onChange(async (value) => {
        this.plugin.settings.enableAiDefinitions = value;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian.Setting(containerEl).setName(this.i18n.settingAiDefinitionLanguage).setDesc(this.i18n.settingAiDefinitionLanguageDesc).addDropdown((dropdown) => {
      dropdown.addOption("auto", this.i18n.aiLangAuto).addOption("en", this.i18n.aiLangEn).addOption("es", this.i18n.aiLangEs).addOption("pt", this.i18n.aiLangPt).addOption("fr", this.i18n.aiLangFr).addOption("de", this.i18n.aiLangDe).addOption("it", this.i18n.aiLangIt).addOption("nl", this.i18n.aiLangNl).addOption("ru", this.i18n.aiLangRu).addOption("zh", this.i18n.aiLangZh).addOption("ja", this.i18n.aiLangJa).setValue(this.plugin.settings.aiDefinitionLanguage).setDisabled(!hasAiApiConfigured).onChange(async (value) => {
        const allowed = ["auto", "en", "es", "pt", "fr", "de", "it", "nl", "ru", "zh", "ja"];
        if (allowed.includes(value)) {
          this.plugin.settings.aiDefinitionLanguage = value;
          await this.plugin.saveSettings();
        }
      });
    });
    if (!hasAiApiConfigured) {
      const warning = containerEl.createEl("p", { text: this.i18n.aiDefinitionsRequiresApi });
      warning.style.margin = "6px 0 12px";
      warning.style.color = "var(--text-warning, #c86d00)";
    }
    containerEl.createEl("h3", { text: this.i18n.sectionImages });
    new import_obsidian.Setting(containerEl).setName(this.i18n.settingEnableImageOptimization).setDesc(this.i18n.settingEnableImageOptimizationDesc).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.enableImageOptimization).onChange(async (value) => {
        this.plugin.settings.enableImageOptimization = value;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName(this.i18n.settingReplaceOriginalImage).setDesc(this.i18n.settingReplaceOriginalImageDesc).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.replaceOriginalImage).onChange(async (value) => {
        this.plugin.settings.replaceOriginalImage = value;
        await this.plugin.saveSettings();
        this.display();
      })
    );
    new import_obsidian.Setting(containerEl).setName(this.i18n.settingCreateBackupBeforeReplace).setDesc(this.i18n.settingCreateBackupBeforeReplaceDesc).addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.createBackupBeforeReplace).onChange(async (value) => {
        this.plugin.settings.createBackupBeforeReplace = value;
        await this.plugin.saveSettings();
        this.display();
      })
    );
    if (this.plugin.settings.replaceOriginalImage && !this.plugin.settings.createBackupBeforeReplace) {
      const warning = containerEl.createEl("p", { text: this.i18n.settingImageRiskDisclaimer });
      warning.style.margin = "6px 0 12px";
      warning.style.color = "var(--text-warning, #c86d00)";
    }
    containerEl.createEl("h3", { text: this.i18n.sectionPdf });
    new import_obsidian.Setting(containerEl).setName(this.i18n.settingPdfExportFolder).setDesc(this.i18n.settingPdfExportFolderDesc).addText(
      (text) => text.setPlaceholder("Exports/PDF").setValue(this.plugin.settings.pdfExportFolder).onChange(async (value) => {
        this.plugin.settings.pdfExportFolder = value.trim().replace(/^\/+|\/+$/g, "");
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName(this.i18n.settingMinPdfChars).setDesc(this.i18n.settingMinPdfCharsDesc).addText(
      (text) => text.setValue(String(this.plugin.settings.minPdfSelectionChars)).onChange(async (value) => {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) {
          this.plugin.settings.minPdfSelectionChars = Math.max(1, Math.min(500, Math.round(parsed)));
          await this.plugin.saveSettings();
        }
      })
    );
  }
};
