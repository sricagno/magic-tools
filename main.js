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

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/utils/getId.js
var require_getId = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/utils/getId.js"(exports, module2) {
    "use strict";
    module2.exports = (prefix, cnt) => `${prefix}-${cnt}-${Math.random().toString(16).slice(3, 8)}`;
  }
});

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/createJob.js
var require_createJob = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/createJob.js"(exports, module2) {
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

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/utils/log.js
var require_log = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/utils/log.js"(exports) {
    "use strict";
    var logging = false;
    exports.logging = logging;
    exports.setLogging = (_logging) => {
      logging = _logging;
    };
    exports.log = (...args) => logging ? console.log.apply(exports, args) : null;
  }
});

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/createScheduler.js
var require_createScheduler = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/createScheduler.js"(exports, module2) {
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

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/utils/getEnvironment.js
var require_getEnvironment = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/utils/getEnvironment.js"(exports, module2) {
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

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/utils/resolvePaths.js
var require_resolvePaths = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/utils/resolvePaths.js"(exports, module2) {
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

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/constants/OEM.js
var require_OEM = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/constants/OEM.js"(exports, module2) {
    "use strict";
    module2.exports = {
      TESSERACT_ONLY: 0,
      LSTM_ONLY: 1,
      TESSERACT_LSTM_COMBINED: 2,
      DEFAULT: 3
    };
  }
});

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/package.json"(exports, module2) {
    module2.exports = {
      name: "tesseract.js",
      version: "6.0.1",
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
        "tesseract.js-core": "^6.0.0",
        "wasm-feature-detect": "^1.2.11",
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

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/constants/defaultOptions.js
var require_defaultOptions = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/constants/defaultOptions.js"(exports, module2) {
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

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/worker/browser/defaultOptions.js
var require_defaultOptions2 = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/worker/browser/defaultOptions.js"(exports, module2) {
    "use strict";
    var version = require_package().version;
    var defaultOptions = require_defaultOptions();
    module2.exports = {
      ...defaultOptions,
      workerPath: `https://cdn.jsdelivr.net/npm/tesseract.js@v${version}/dist/worker.min.js`
    };
  }
});

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/worker/browser/spawnWorker.js
var require_spawnWorker = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/worker/browser/spawnWorker.js"(exports, module2) {
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

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/worker/browser/terminateWorker.js
var require_terminateWorker = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/worker/browser/terminateWorker.js"(exports, module2) {
    "use strict";
    module2.exports = (worker) => {
      worker.terminate();
    };
  }
});

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/worker/browser/onMessage.js
var require_onMessage = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/worker/browser/onMessage.js"(exports, module2) {
    "use strict";
    module2.exports = (worker, handler) => {
      worker.onmessage = ({ data }) => {
        handler(data);
      };
    };
  }
});

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/worker/browser/send.js
var require_send = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/worker/browser/send.js"(exports, module2) {
    "use strict";
    module2.exports = async (worker, packet) => {
      worker.postMessage(packet);
    };
  }
});

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/worker/browser/loadImage.js
var require_loadImage = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/worker/browser/loadImage.js"(exports, module2) {
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

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/worker/browser/index.js
var require_browser = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/worker/browser/index.js"(exports, module2) {
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

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/createWorker.js
var require_createWorker = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/createWorker.js"(exports, module2) {
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

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/Tesseract.js
var require_Tesseract = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/Tesseract.js"(exports, module2) {
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

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/constants/languages.js
var require_languages = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/constants/languages.js"(exports, module2) {
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

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/constants/PSM.js
var require_PSM = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/constants/PSM.js"(exports, module2) {
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

// node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/tesseract.js@6.0.1/node_modules/tesseract.js/src/index.js"(exports, module2) {
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
function sanitizeOcrText(input) {
  const withoutControl = input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return withoutControl.slice(0, MAX_OUTPUT_LENGTH).trim();
}
function getMarkdownImageMatch(text) {
  const wiki = text.match(/!\[\[([^\]]+)\]\]/);
  if (wiki?.[0]) return wiki[0];
  const md = text.match(/!\[[^\]]*\]\(([^)]+)\)/);
  return md?.[0] ?? null;
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
function buildSelectionPdfOutputPath(notePath, noteBasename, exportFolder) {
  const folder = exportFolder?.trim();
  if (folder) {
    return `${folder}/${noteBasename}-selection.pdf`.replace(/\/{2,}/g, "/");
  }
  const parent = getParentPath(notePath);
  const raw = parent ? `${parent}/${noteBasename}-selection.pdf` : `${noteBasename}-selection.pdf`;
  return raw.replace(/\/{2,}/g, "/");
}

// main.ts
var DEFAULT_SETTINGS = {
  googleApiKey: "",
  defaultProvider: "local",
  insertAsCallout: false,
  geminiFastMode: false,
  ocrLanguage: "es",
  maxImageSizeMb: 10,
  ocrTimeoutSeconds: 5,
  pdfExportFolder: "",
  minPdfSelectionChars: 20
};
var I18N = {
  es: {
    extractTextFromImage: "Extraer texto de imagen",
    noImageDetected: "No se detect\xF3 una imagen embebida en la l\xEDnea o selecci\xF3n actual.",
    imageTooLarge: (sizeMb, maxMb) => `La imagen pesa ${sizeMb.toFixed(2)} MB y supera el m\xE1ximo configurado (${maxMb} MB).`,
    apiKeyMissing: "Falta la API key de Google AI Studio para usar Gemini OCR.",
    ocrFailed: "Fall\xF3 el OCR.",
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
    settingProvider: "Proveedor OCR por defecto",
    settingProviderDesc: "Eleg\xED Gemini o OCR local.",
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
    sectionPdf: "Exportador PDF",
    contextExportSelectionToPdf: "Exportar selecci\xF3n a PDF",
    invalidPdfExportFolder: "Ruta inv\xE1lida. Debe ser una carpeta dentro del vault.",
    emptyRenderedPdfFallback: "No se pudo renderizar con estilo. Se export\xF3 en modo texto simple.",
    saveDialogCanceled: "Exportaci\xF3n cancelada.",
    pdfWriteFailed: "No se pudo escribir el PDF. Revis\xE1 permisos/ruta de guardado.",
    selectionTooShort: (min) => `La selecci\xF3n es muy corta. Seleccion\xE1 al menos ${min} caracteres.`,
    providerGemini: "Gemini (Google AI Studio)",
    providerLocal: "OCR local",
    langAuto: "Autom\xE1tico",
    langEs: "Espa\xF1ol",
    langEn: "Ingl\xE9s",
    commandPdfUnavailable: "No se pudo acceder al motor de PDF de Electron. Prob\xE1 actualizar Obsidian Desktop."
  },
  en: {
    extractTextFromImage: "Extract text from image",
    noImageDetected: "No embedded image was detected in the current line or selection.",
    imageTooLarge: (sizeMb, maxMb) => `Image is ${sizeMb.toFixed(2)} MB and exceeds configured max (${maxMb} MB).`,
    apiKeyMissing: "Google AI Studio API key is missing for Gemini OCR.",
    ocrFailed: "OCR failed.",
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
    settingProvider: "Default OCR provider",
    settingProviderDesc: "Choose Gemini or local OCR.",
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
    sectionPdf: "PDF exporter",
    contextExportSelectionToPdf: "Export selection to PDF",
    invalidPdfExportFolder: "Invalid path. It must be a folder inside the vault.",
    emptyRenderedPdfFallback: "Styled render failed. Exported using plain text fallback.",
    saveDialogCanceled: "Export canceled.",
    pdfWriteFailed: "Could not write PDF. Check path/permissions.",
    selectionTooShort: (min) => `Selection is too short. Please select at least ${min} characters.`,
    providerGemini: "Gemini (Google AI Studio)",
    providerLocal: "Local OCR",
    langAuto: "Auto",
    langEs: "Spanish",
    langEn: "English",
    commandPdfUnavailable: "Could not access Electron PDF engine. Try updating Obsidian Desktop."
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
        const pointerEvent = window.event;
        const imageContext = this.findImageContextNearPointer(editor, pointerEvent) ?? this.getCurrentImageContext(editor, view);
        const selectedText = editor.getSelection().trim();
        const hasSelection = selectedText.length >= this.settings.minPdfSelectionChars;
        if (hasSelection && view.file) {
          menu.addItem((item) => {
            item.setTitle(this.i18n.contextExportSelectionToPdf);
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
        if (!imageContext) return;
        if (selectedText.length > 0 && !this.isSelectionSingleImage(selectedText)) {
          return;
        }
        menu.addItem((item) => {
          item.setTitle(this.i18n.extractTextFromImage);
          item.onClick(async () => this.handleImageOcr(editor, view, imageContext));
        });
      })
    );
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (!(file instanceof import_obsidian.TFile)) return;
        if (!this.isImageFile(file)) return;
        menu.addItem((item) => {
          item.setTitle(this.i18n.extractTextFromImage);
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
            await this.handleImageOcr(editor, view, imageContext);
          });
        });
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
  async handleImageOcr(editor, view, imageContext) {
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
      } else {
        new import_obsidian.Notice(`${this.i18n.ocrFailed} ${error instanceof Error ? error.message : ""}`.trim());
      }
    }
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
    return this.runLocalOcr(binary);
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
      throw new Error(`Gemini HTTP ${response.status}`);
    }
    const payload = await response.json();
    const text = payload.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("\n") ?? "";
    return text;
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
    const syntax = getMarkdownImageMatch(lineText);
    if (!syntax || !view.file) return null;
    const file = this.resolveImageFile(syntax, view.file.path);
    if (!file) return null;
    return {
      file,
      line,
      syntax
    };
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
    const rawPath = decodeURIComponent(mdMatch[1]);
    const parent = getParentPath(sourcePath);
    const resolved = (0, import_obsidian.normalizePath)(rawPath.startsWith("/") ? rawPath.substring(1) : `${parent}/${rawPath}`);
    const af = this.app.vault.getAbstractFileByPath(resolved);
    return af instanceof import_obsidian.TFile ? af : null;
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
      const decoded = decodeURIComponent(rawPath.trim());
      const parent = getParentPath(sourcePath);
      const resolved = (0, import_obsidian.normalizePath)(decoded.startsWith("/") ? decoded.substring(1) : `${parent}/${decoded}`);
      const file = this.app.vault.getAbstractFileByPath(resolved);
      if (!(file instanceof import_obsidian.TFile)) return `![${alt}](${rawPath})`;
      return `![${alt}](${this.app.vault.getResourcePath(file)})`;
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
    const syntax = getMarkdownImageMatch(tokenText || lineText);
    if (!syntax) return null;
    const activeFile = this.app.workspace.getActiveFile();
    if (!activeFile) return null;
    const file = this.resolveImageFile(syntax, activeFile.path);
    if (!file) return null;
    return { file, line, syntax };
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
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
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
      })
    );
    new import_obsidian.Setting(containerEl).setName(this.i18n.settingProvider).setDesc(this.i18n.settingProviderDesc).addDropdown((dropdown) => {
      dropdown.addOption("local", this.i18n.providerLocal).addOption("gemini", this.i18n.providerGemini).setValue(this.plugin.settings.defaultProvider).onChange(async (value) => {
        this.plugin.settings.defaultProvider = value;
        await this.plugin.saveSettings();
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
        this.plugin.settings.ocrLanguage = value;
        await this.plugin.saveSettings();
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
