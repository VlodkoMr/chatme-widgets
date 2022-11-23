"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chatmeContractAddress = exports.MainContract = void 0;
var _nearApiJs = require("near-api-js");
var _transform = require("../utils/transform");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var chatmeContractAddress = function chatmeContractAddress(network) {
  switch (network) {
    case "local":
      return "near-message.testnet";
    case "testnet":
      return "chatme.testnet";
  }
  return "chatme.near";
};
exports.chatmeContractAddress = chatmeContractAddress;
var MainContract = /*#__PURE__*/function () {
  function MainContract(_ref) {
    var contractId = _ref.contractId,
      walletToUse = _ref.walletToUse;
    _classCallCheck(this, MainContract);
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  /**
   * Group by ID
   * @param id
   * @returns {Promise<any>}
   */
  _createClass(MainContract, [{
    key: "getGroupById",
    value: function () {
      var _getGroupById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.wallet.viewMethod({
                  contractId: this.contractId,
                  method: 'get_group_by_id',
                  args: {
                    id: id
                  }
                });
              case 3:
                return _context.abrupt("return", _context.sent);
              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                console.log("blockchain error", _context.t0);
              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));
      function getGroupById(_x) {
        return _getGroupById.apply(this, arguments);
      }
      return getGroupById;
    }() // async getPublicGroups(page_limit, skip = 0) {
    //   try {
    //     return await this.wallet.viewMethod({
    //       contractId: this.contractId,
    //       method: 'get_public_groups',
    //       args: {
    //         page_limit,
    //         skip
    //       }
    //     });
    //   } catch (e) {
    //     console.log(`blockchain error`, e);
    //   }
    // }
    /**
     * User additional Info
     * @param address
     * @returns {Promise<any>}
     */
    // async getUserInfo(address) {
    //   try {
    //     return await this.wallet.viewMethod({
    //       contractId: this.contractId,
    //       method: 'get_user_info',
    //       args: {
    //         address
    //       }
    //     });
    //   } catch (e) {
    //     console.log(`blockchain error`, e);
    //   }
    // }
    /**
     * User spam count
     * @param address
     * @returns {Promise<any>}
     */
    // async getSpamCount(address) {
    //   try {
    //     return await this.wallet.viewMethod({
    //       contractId: this.contractId,
    //       method: 'get_spam_count',
    //       args: {
    //         address
    //       }
    //     });
    //   } catch (e) {
    //     console.log(`blockchain error`, e);
    //   }
    // }
    /**
     * Activate user account Level
     * @param depositNEAR
     * @returns {Promise<any>}
     */
    // async userAccountLevelUp(depositNEAR) {
    //   const deposit = utils.format.parseNearAmount(depositNEAR.toString());
    //   try {
    //     const gas = convertToTera(30);
    //     return await this.wallet.callMethod({
    //       contractId: this.contractId,
    //       method: 'user_account_level_up',
    //       gas,
    //       deposit
    //     });
    //   } catch (e) {
    //     console.log(`blockchain error`, e);
    //   }
    // }
    /**
     * Get owned groups
     * @returns {Promise<any>}
     */
    // async getOwnerGroups(account) {
    //   try {
    //     return await this.wallet.viewMethod({
    //       contractId: this.contractId,
    //       method: 'get_owner_groups',
    //       args: {
    //         account
    //       }
    //     });
    //   } catch (e) {
    //     console.log(`blockchain error`, e);
    //   }
    // }
    /**
     * Get groups that user joined
     * @returns {Promise<any>}
     */
  }, {
    key: "getUserGroups",
    value: function () {
      var _getUserGroups = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(account) {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this.wallet.viewMethod({
                  contractId: this.contractId,
                  method: 'get_user_groups',
                  args: {
                    account: account
                  }
                });
              case 3:
                return _context2.abrupt("return", _context2.sent);
              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                console.log("blockchain error", _context2.t0);
              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6]]);
      }));
      function getUserGroups(_x2) {
        return _getUserGroups.apply(this, arguments);
      }
      return getUserGroups;
    }()
    /**
     * Create group
     * @param title
     * @param image
     * @param text
     * @param url
     * @param group_type
     * @param members
     * @returns {Promise<*>}
     */
    // async createNewGroup(title, image, text, url, group_type, members) {
    //   const deposit = utils.format.parseNearAmount("0.25");
    //   const gas = convertToTera(80);
    //
    //   return await this.wallet.callMethod({
    //     contractId: this.contractId,
    //     method: 'create_new_group',
    //     args: {
    //       title,
    //       image,
    //       url,
    //       text,
    //       group_type,
    //       members,
    //       edit_members: true
    //     },
    //     gas,
    //     deposit
    //   })
    // }
    /**
     * Edit Group
     * @param id
     * @param title
     * @param image
     * @param text
     * @param url
     * @returns {Promise<*>}
     */
    // async editGroup(id, title, image, text, url) {
    //   const gas = convertToTera(50);
    //   return await this.wallet.callMethod({
    //     contractId: this.contractId,
    //     method: 'edit_group',
    //     args: {
    //       id,
    //       title,
    //       image,
    //       text,
    //       url
    //     },
    //     gas
    //   })
    // }
    /**
     * Add group members
     * @param id
     * @param members
     * @returns {Promise<*>}
     */
    // async ownerAddGroupMembers(id, members) {
    //   return await this.wallet.callMethod({
    //     contractId: this.contractId,
    //     method: 'owner_add_group_members',
    //     args: {
    //       id,
    //       members
    //     }
    //   })
    // }
    /**
     * Remove group members
     * @param id
     * @param members
     * @returns {Promise<*>}
     */
    // async ownerRemoveGroupMembers(id, members) {
    //   return await this.wallet.callMethod({
    //     contractId: this.contractId,
    //     method: 'owner_remove_group_members',
    //     args: {
    //       id,
    //       members
    //     }
    //   })
    // }
    /**
     * Remove group
     * @param group_id
     * @param confirm_title
     * @returns {Promise<*>}
     */
    // async ownerRemoveGroup(group_id, confirm_title) {
    //   return await this.wallet.callMethod({
    //     contractId: this.contractId,
    //     method: 'owner_remove_group',
    //     args: {
    //       group_id,
    //       confirm_title
    //     }
    //   })
    // }
    /**
     * Join Public group
     * @param id
     * @returns {Promise<*>}
     */
  }, {
    key: "joinPublicGroup",
    value: function () {
      var _joinPublicGroup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id) {
        var deposit, gas;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                deposit = _nearApiJs.utils.format.parseNearAmount("0.01");
                gas = (0, _transform.convertToTera)(150);
                _context3.next = 4;
                return this.wallet.callMethod({
                  contractId: this.contractId,
                  method: 'join_public_group',
                  args: {
                    id: id
                  },
                  gas: gas,
                  deposit: deposit
                });
              case 4:
                return _context3.abrupt("return", _context3.sent);
              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function joinPublicGroup(_x3) {
        return _joinPublicGroup.apply(this, arguments);
      }
      return joinPublicGroup;
    }()
    /**
     * Join Public channel
     * @param id
     * @returns {Promise<*>}
     */
  }, {
    key: "joinPublicChannel",
    value: function () {
      var _joinPublicChannel = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id) {
        var deposit, gas;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                deposit = _nearApiJs.utils.format.parseNearAmount("0.0001");
                gas = (0, _transform.convertToTera)(150);
                _context4.next = 4;
                return this.wallet.callMethod({
                  contractId: this.contractId,
                  method: 'join_public_channel',
                  args: {
                    id: id
                  },
                  gas: gas,
                  deposit: deposit
                });
              case 4:
                return _context4.abrupt("return", _context4.sent);
              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function joinPublicChannel(_x4) {
        return _joinPublicChannel.apply(this, arguments);
      }
      return joinPublicChannel;
    }()
    /**
     * Leave group
     * @param id
     * @returns {Promise<*>}
     */
  }, {
    key: "leaveGroup",
    value: function () {
      var _leaveGroup = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(id) {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.wallet.callMethod({
                  contractId: this.contractId,
                  method: 'leave_group',
                  args: {
                    id: id
                  }
                });
              case 2:
                return _context5.abrupt("return", _context5.sent);
              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function leaveGroup(_x5) {
        return _leaveGroup.apply(this, arguments);
      }
      return leaveGroup;
    }()
    /**
     * Leave channel
     * @param id
     * @returns {Promise<*>}
     */
  }, {
    key: "leaveChannel",
    value: function () {
      var _leaveChannel = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id) {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.wallet.callMethod({
                  contractId: this.contractId,
                  method: 'leave_channel',
                  args: {
                    id: id
                  }
                });
              case 2:
                return _context6.abrupt("return", _context6.sent);
              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      function leaveChannel(_x6) {
        return _leaveChannel.apply(this, arguments);
      }
      return leaveChannel;
    }()
    /**
     * Report spam
     * @param message_id
     * @param message_sender
     * @returns {Promise<*>}
     */
  }, {
    key: "spamReport",
    value: function () {
      var _spamReport = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(message_id, message_sender) {
        var gas;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                gas = (0, _transform.convertToTera)(250);
                _context7.next = 3;
                return this.wallet.callMethod({
                  contractId: this.contractId,
                  method: 'spam_report',
                  args: {
                    message_id: message_id,
                    message_sender: message_sender
                  },
                  gas: gas
                });
              case 3:
                return _context7.abrupt("return", _context7.sent);
              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));
      function spamReport(_x7, _x8) {
        return _spamReport.apply(this, arguments);
      }
      return spamReport;
    }()
    /**
     * Send message to Account
     * @param text
     * @param image
     * @param to_address
     * @param reply_message_id
     * @param encrypt_key
     * @returns {Promise<*>}
     */
  }, {
    key: "sendPrivateMessage",
    value: function () {
      var _sendPrivateMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(text, image, to_address, reply_message_id, encrypt_key) {
        var inner_id;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                inner_id = (0, _transform.getInnerId)(text, image, to_address);
                _context8.next = 3;
                return this.wallet.callMethod({
                  contractId: this.contractId,
                  method: 'send_private_message',
                  args: {
                    text: text,
                    image: image,
                    to_address: to_address,
                    encrypt_key: encrypt_key,
                    reply_message_id: reply_message_id,
                    inner_id: inner_id
                  }
                });
              case 3:
                return _context8.abrupt("return", _context8.sent);
              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));
      function sendPrivateMessage(_x9, _x10, _x11, _x12, _x13) {
        return _sendPrivateMessage.apply(this, arguments);
      }
      return sendPrivateMessage;
    }()
    /**
     * Send message to the group
     * @param text
     * @param image
     * @param group_id
     * @param reply_message_id
     * @returns {Promise<*>}
     */
  }, {
    key: "sendGroupMessage",
    value: function () {
      var _sendGroupMessage = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(text, image, group_id, reply_message_id) {
        var inner_id;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                inner_id = (0, _transform.getInnerId)(text, image, group_id);
                _context9.next = 3;
                return this.wallet.callMethod({
                  contractId: this.contractId,
                  method: 'send_group_message',
                  args: {
                    text: text,
                    image: image,
                    group_id: group_id,
                    reply_message_id: reply_message_id,
                    inner_id: inner_id
                  }
                });
              case 3:
                return _context9.abrupt("return", _context9.sent);
              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));
      function sendGroupMessage(_x14, _x15, _x16, _x17) {
        return _sendGroupMessage.apply(this, arguments);
      }
      return sendGroupMessage;
    }()
  }]);
  return MainContract;
}();
exports.MainContract = MainContract;