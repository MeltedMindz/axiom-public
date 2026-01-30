'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var invariant = _interopDefault(require('tiny-invariant'));
var solidity = require('@ethersproject/solidity');
var sdkCore = require('@uniswap/sdk-core');
var v3Sdk = require('@uniswap/v3-sdk');
var utils = require('ethers/lib/utils');
var JSBI = _interopDefault(require('jsbi'));
var ethers = require('ethers');
var abi = require('@ethersproject/abi');
var IMulticall = _interopDefault(require('@uniswap/v3-periphery/artifacts/contracts/interfaces/IMulticall.sol/IMulticall.json'));

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function _createForOfIteratorHelperLoose(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (t) return (t = t.call(r)).next.bind(t);
  if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
    t && (r = t);
    var o = 0;
    return function () {
      return o >= r.length ? {
        done: !0
      } : {
        done: !1,
        value: r[o++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return _regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function (t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
    return this;
  }), _regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function () {
    return {
      w: i,
      m: f
    };
  })();
}
function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  _regeneratorDefine = function (e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, _regeneratorDefine(e, r, n, t);
}
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function sortsBefore(currencyA, currencyB) {
  if (currencyA.isNative) return true;
  if (currencyB.isNative) return false;
  return currencyA.wrapped.sortsBefore(currencyB.wrapped);
}

var _hookFlagIndex;
(function (HookOptions) {
  HookOptions["AfterRemoveLiquidityReturnsDelta"] = "afterRemoveLiquidityReturnsDelta";
  HookOptions["AfterAddLiquidityReturnsDelta"] = "afterAddLiquidityReturnsDelta";
  HookOptions["AfterSwapReturnsDelta"] = "afterSwapReturnsDelta";
  HookOptions["BeforeSwapReturnsDelta"] = "beforeSwapReturnsDelta";
  HookOptions["AfterDonate"] = "afterDonate";
  HookOptions["BeforeDonate"] = "beforeDonate";
  HookOptions["AfterSwap"] = "afterSwap";
  HookOptions["BeforeSwap"] = "beforeSwap";
  HookOptions["AfterRemoveLiquidity"] = "afterRemoveLiquidity";
  HookOptions["BeforeRemoveLiquidity"] = "beforeRemoveLiquidity";
  HookOptions["AfterAddLiquidity"] = "afterAddLiquidity";
  HookOptions["BeforeAddLiquidity"] = "beforeAddLiquidity";
  HookOptions["AfterInitialize"] = "afterInitialize";
  HookOptions["BeforeInitialize"] = "beforeInitialize";
})(exports.HookOptions || (exports.HookOptions = {}));
var hookFlagIndex = (_hookFlagIndex = {}, _hookFlagIndex[exports.HookOptions.AfterRemoveLiquidityReturnsDelta] = 0, _hookFlagIndex[exports.HookOptions.AfterAddLiquidityReturnsDelta] = 1, _hookFlagIndex[exports.HookOptions.AfterSwapReturnsDelta] = 2, _hookFlagIndex[exports.HookOptions.BeforeSwapReturnsDelta] = 3, _hookFlagIndex[exports.HookOptions.AfterDonate] = 4, _hookFlagIndex[exports.HookOptions.BeforeDonate] = 5, _hookFlagIndex[exports.HookOptions.AfterSwap] = 6, _hookFlagIndex[exports.HookOptions.BeforeSwap] = 7, _hookFlagIndex[exports.HookOptions.AfterRemoveLiquidity] = 8, _hookFlagIndex[exports.HookOptions.BeforeRemoveLiquidity] = 9, _hookFlagIndex[exports.HookOptions.AfterAddLiquidity] = 10, _hookFlagIndex[exports.HookOptions.BeforeAddLiquidity] = 11, _hookFlagIndex[exports.HookOptions.AfterInitialize] = 12, _hookFlagIndex[exports.HookOptions.BeforeInitialize] = 13, _hookFlagIndex);
var Hook = /*#__PURE__*/function () {
  function Hook() {}
  Hook.permissions = function permissions(address) {
    this._checkAddress(address);
    return {
      beforeInitialize: this._hasPermission(address, exports.HookOptions.BeforeInitialize),
      afterInitialize: this._hasPermission(address, exports.HookOptions.AfterInitialize),
      beforeAddLiquidity: this._hasPermission(address, exports.HookOptions.BeforeAddLiquidity),
      afterAddLiquidity: this._hasPermission(address, exports.HookOptions.AfterAddLiquidity),
      beforeRemoveLiquidity: this._hasPermission(address, exports.HookOptions.BeforeRemoveLiquidity),
      afterRemoveLiquidity: this._hasPermission(address, exports.HookOptions.AfterRemoveLiquidity),
      beforeSwap: this._hasPermission(address, exports.HookOptions.BeforeSwap),
      afterSwap: this._hasPermission(address, exports.HookOptions.AfterSwap),
      beforeDonate: this._hasPermission(address, exports.HookOptions.BeforeDonate),
      afterDonate: this._hasPermission(address, exports.HookOptions.AfterDonate),
      beforeSwapReturnsDelta: this._hasPermission(address, exports.HookOptions.BeforeSwapReturnsDelta),
      afterSwapReturnsDelta: this._hasPermission(address, exports.HookOptions.AfterSwapReturnsDelta),
      afterAddLiquidityReturnsDelta: this._hasPermission(address, exports.HookOptions.AfterAddLiquidityReturnsDelta),
      afterRemoveLiquidityReturnsDelta: this._hasPermission(address, exports.HookOptions.AfterRemoveLiquidityReturnsDelta)
    };
  };
  Hook.hasPermission = function hasPermission(address, hookOption) {
    this._checkAddress(address);
    return this._hasPermission(address, hookOption);
  };
  Hook.hasInitializePermissions = function hasInitializePermissions(address) {
    this._checkAddress(address);
    return this._hasPermission(address, exports.HookOptions.BeforeInitialize) || Hook._hasPermission(address, exports.HookOptions.AfterInitialize);
  };
  Hook.hasLiquidityPermissions = function hasLiquidityPermissions(address) {
    this._checkAddress(address);
    // this implicitly encapsulates liquidity delta permissions
    return this._hasPermission(address, exports.HookOptions.BeforeAddLiquidity) || Hook._hasPermission(address, exports.HookOptions.AfterAddLiquidity) || Hook._hasPermission(address, exports.HookOptions.BeforeRemoveLiquidity) || Hook._hasPermission(address, exports.HookOptions.AfterRemoveLiquidity);
  };
  Hook.hasSwapPermissions = function hasSwapPermissions(address) {
    this._checkAddress(address);
    // this implicitly encapsulates swap delta permissions
    return this._hasPermission(address, exports.HookOptions.BeforeSwap) || Hook._hasPermission(address, exports.HookOptions.AfterSwap);
  };
  Hook.hasDonatePermissions = function hasDonatePermissions(address) {
    this._checkAddress(address);
    return this._hasPermission(address, exports.HookOptions.BeforeDonate) || Hook._hasPermission(address, exports.HookOptions.AfterDonate);
  };
  Hook._hasPermission = function _hasPermission(address, hookOption) {
    // Use only the last 4 bytes (32 bits) to avoid JavaScript precision issues
    // All hook flags are in bits 0-13, which fit comfortably in 32 bits
    var last4Bytes = '0x' + address.slice(-8);
    return !!(parseInt(last4Bytes, 16) & 1 << hookFlagIndex[hookOption]);
  };
  Hook._checkAddress = function _checkAddress(address) {
    !utils.isAddress(address) ?  invariant(false, 'invalid address')  : void 0;
  };
  return Hook;
}();

var _TICK_SPACINGS;
// constants used internally but not expected to be used externally
var ADDRESS_ZERO = ethers.constants.AddressZero;
var NEGATIVE_ONE = /*#__PURE__*/JSBI.BigInt(-1);
var ZERO = /*#__PURE__*/JSBI.BigInt(0);
var ONE = /*#__PURE__*/JSBI.BigInt(1);
var EMPTY_BYTES = '0x';
// used in liquidity amount math
var Q96 = /*#__PURE__*/JSBI.exponentiate(/*#__PURE__*/JSBI.BigInt(2), /*#__PURE__*/JSBI.BigInt(96));
var Q192 = /*#__PURE__*/JSBI.exponentiate(Q96, /*#__PURE__*/JSBI.BigInt(2));
// used when unwrapping weth in positon manager
var OPEN_DELTA = ethers.constants.Zero;
// error constants
var NATIVE_NOT_SET = 'NATIVE_NOT_SET';
var ZERO_LIQUIDITY = 'ZERO_LIQUIDITY';
var NO_SQRT_PRICE = 'NO_SQRT_PRICE';
var CANNOT_BURN = 'CANNOT_BURN';
/**
 * Function fragments that exist on the PositionManager contract.
 */
var PositionFunctions;
(function (PositionFunctions) {
  PositionFunctions["INITIALIZE_POOL"] = "initializePool";
  PositionFunctions["MODIFY_LIQUIDITIES"] = "modifyLiquidities";
  // Inherited from PermitForwarder
  PositionFunctions["PERMIT_BATCH"] = "0x002a3e3a";
  // Inherited from ERC721Permit
  PositionFunctions["ERC721PERMIT_PERMIT"] = "0x0f5730f1";
})(PositionFunctions || (PositionFunctions = {}));
/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */
var FeeAmount;
(function (FeeAmount) {
  FeeAmount[FeeAmount["LOWEST"] = 100] = "LOWEST";
  FeeAmount[FeeAmount["LOW"] = 500] = "LOW";
  FeeAmount[FeeAmount["MEDIUM"] = 3000] = "MEDIUM";
  FeeAmount[FeeAmount["HIGH"] = 10000] = "HIGH";
})(FeeAmount || (FeeAmount = {}));
/**
 * The default factory tick spacings by fee amount.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var TICK_SPACINGS = (_TICK_SPACINGS = {}, _TICK_SPACINGS[FeeAmount.LOWEST] = 1, _TICK_SPACINGS[FeeAmount.LOW] = 10, _TICK_SPACINGS[FeeAmount.MEDIUM] = 60, _TICK_SPACINGS[FeeAmount.HIGH] = 200, _TICK_SPACINGS);

var DYNAMIC_FEE_FLAG = 0x800000;
var NO_TICK_DATA_PROVIDER_DEFAULT = /*#__PURE__*/new v3Sdk.NoTickDataProvider();
/**
 * Represents a V4 pool
 */
var Pool = /*#__PURE__*/function () {
  /**
   * Construct a pool
   * @param currencyA One of the currencys in the pool
   * @param currencyB The other currency in the pool
   * @param fee The fee in hundredths of a bips of the input amount of every swap that is collected by the pool
   * @param tickSpacing The tickSpacing of the pool
   * @param hooks The address of the hook contract
   * @param sqrtRatioX96 The sqrt of the current ratio of amounts of currency1 to currency0
   * @param liquidity The current value of in range liquidity
   * @param tickCurrent The current tick of the pool
   */
  function Pool(currencyA, currencyB, fee, tickSpacing, hooks, sqrtRatioX96, liquidity, tickCurrent, ticks) {
    if (ticks === void 0) {
      ticks = NO_TICK_DATA_PROVIDER_DEFAULT;
    }
    !utils.isAddress(hooks) ?  invariant(false, 'Invalid hook address')  : void 0;
    !(Number.isInteger(fee) && (fee === DYNAMIC_FEE_FLAG || fee < 1000000)) ?  invariant(false, 'FEE')  : void 0;
    if (fee === DYNAMIC_FEE_FLAG) {
      !(Number(hooks) > 0) ?  invariant(false, 'Dynamic fee pool requires a hook')  : void 0;
    }
    var tickCurrentSqrtRatioX96 = v3Sdk.TickMath.getSqrtRatioAtTick(tickCurrent);
    var nextTickSqrtRatioX96 = v3Sdk.TickMath.getSqrtRatioAtTick(tickCurrent + 1);
    !(JSBI.greaterThanOrEqual(JSBI.BigInt(sqrtRatioX96), tickCurrentSqrtRatioX96) && JSBI.lessThanOrEqual(JSBI.BigInt(sqrtRatioX96), nextTickSqrtRatioX96)) ?  invariant(false, 'PRICE_BOUNDS')  : void 0;
    var _ref = sortsBefore(currencyA, currencyB) ? [currencyA, currencyB] : [currencyB, currencyA];
    this.currency0 = _ref[0];
    this.currency1 = _ref[1];
    this.fee = fee;
    this.sqrtRatioX96 = JSBI.BigInt(sqrtRatioX96);
    this.tickSpacing = tickSpacing;
    this.hooks = hooks;
    this.liquidity = JSBI.BigInt(liquidity);
    this.tickCurrent = tickCurrent;
    this.tickDataProvider = Array.isArray(ticks) ? new v3Sdk.TickListDataProvider(ticks, tickSpacing) : ticks;
    this.poolKey = Pool.getPoolKey(this.currency0, this.currency1, this.fee, this.tickSpacing, this.hooks);
    this.poolId = Pool.getPoolId(this.currency0, this.currency1, this.fee, this.tickSpacing, this.hooks);
  }
  Pool.getPoolKey = function getPoolKey(currencyA, currencyB, fee, tickSpacing, hooks) {
    !utils.isAddress(hooks) ?  invariant(false, 'Invalid hook address')  : void 0;
    var _ref2 = sortsBefore(currencyA, currencyB) ? [currencyA, currencyB] : [currencyB, currencyA],
      currency0 = _ref2[0],
      currency1 = _ref2[1];
    var currency0Addr = currency0.isNative ? ADDRESS_ZERO : currency0.wrapped.address;
    var currency1Addr = currency1.isNative ? ADDRESS_ZERO : currency1.wrapped.address;
    return {
      currency0: currency0Addr,
      currency1: currency1Addr,
      fee: fee,
      tickSpacing: tickSpacing,
      hooks: hooks
    };
  };
  Pool.getPoolId = function getPoolId(currencyA, currencyB, fee, tickSpacing, hooks) {
    var _ref3 = sortsBefore(currencyA, currencyB) ? [currencyA, currencyB] : [currencyB, currencyA],
      currency0 = _ref3[0],
      currency1 = _ref3[1];
    var currency0Addr = currency0.isNative ? ADDRESS_ZERO : currency0.wrapped.address;
    var currency1Addr = currency1.isNative ? ADDRESS_ZERO : currency1.wrapped.address;
    return solidity.keccak256(['bytes'], [utils.defaultAbiCoder.encode(['address', 'address', 'uint24', 'int24', 'address'], [currency0Addr, currency1Addr, fee, tickSpacing, hooks])]);
  }
  /** backwards compatibility with v2/3 sdks */;
  var _proto = Pool.prototype;
  /**
   * Returns true if the currency is either currency0 or currency1
   * @param currency The currency to check
   * @returns True if currency is either currency0 or currency1
   */
  _proto.involvesCurrency = function involvesCurrency(currency) {
    return currency.equals(this.currency0) || currency.equals(this.currency1);
  }
  /** backwards compatibility with v2/3 sdks */;
  _proto.involvesToken = function involvesToken(currency) {
    return this.involvesCurrency(currency);
  }
  /**
   * v4-only involvesToken convenience method, used for mixed route ETH <-> WETH connection only
   * @param currency
   */;
  _proto.v4InvolvesToken = function v4InvolvesToken(currency) {
    return this.involvesCurrency(currency) || currency.wrapped.equals(this.currency0) || currency.wrapped.equals(this.currency1) || currency.wrapped.equals(this.currency0.wrapped) || currency.wrapped.equals(this.currency1.wrapped);
  }
  /**
   * Returns the current mid price of the pool in terms of currency0, i.e. the ratio of currency1 over currency0
   */;
  /**
   * Return the price of the given currency in terms of the other currency in the pool.
   * @param currency The currency to return price of
   * @returns The price of the given currency, in terms of the other.
   */
  _proto.priceOf = function priceOf(currency) {
    !this.involvesCurrency(currency) ?  invariant(false, 'CURRENCY')  : void 0;
    return currency.equals(this.currency0) ? this.currency0Price : this.currency1Price;
  }
  /**
   * Returns the chain ID of the currencies in the pool.
   */;
  /** Works only for vanilla hookless v3 pools, otherwise throws an error */
  _proto.getOutputAmount =
  /*#__PURE__*/
  function () {
    var _getOutputAmount = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(inputAmount, sqrtPriceLimitX96) {
      var zeroForOne, _yield$this$swap, outputAmount, sqrtRatioX96, liquidity, tickCurrent, outputCurrency;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            !this.involvesCurrency(inputAmount.currency) ?  invariant(false, 'CURRENCY')  : void 0;
            zeroForOne = inputAmount.currency.equals(this.currency0);
            _context.n = 1;
            return this.swap(zeroForOne, inputAmount.quotient, sqrtPriceLimitX96);
          case 1:
            _yield$this$swap = _context.v;
            outputAmount = _yield$this$swap.amountCalculated;
            sqrtRatioX96 = _yield$this$swap.sqrtRatioX96;
            liquidity = _yield$this$swap.liquidity;
            tickCurrent = _yield$this$swap.tickCurrent;
            outputCurrency = zeroForOne ? this.currency1 : this.currency0;
            return _context.a(2, [sdkCore.CurrencyAmount.fromRawAmount(outputCurrency, JSBI.multiply(outputAmount, NEGATIVE_ONE)), new Pool(this.currency0, this.currency1, this.fee, this.tickSpacing, this.hooks, sqrtRatioX96, liquidity, tickCurrent, this.tickDataProvider)]);
        }
      }, _callee, this);
    }));
    function getOutputAmount(_x, _x2) {
      return _getOutputAmount.apply(this, arguments);
    }
    return getOutputAmount;
  }()
  /**
   * Given a desired output amount of a currency, return the computed input amount and a pool with state updated after the trade
   * Works only for vanilla hookless v3 pools, otherwise throws an error
   * @param outputAmount the output amount for which to quote the input amount
   * @param sqrtPriceLimitX96 The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap
   * @returns The input amount and the pool with updated state
   */
  ;
  _proto.getInputAmount =
  /*#__PURE__*/
  function () {
    var _getInputAmount = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(outputAmount, sqrtPriceLimitX96) {
      var zeroForOne, _yield$this$swap2, inputAmount, sqrtRatioX96, liquidity, tickCurrent, inputCurrency;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            !this.involvesCurrency(outputAmount.currency) ?  invariant(false, 'CURRENCY')  : void 0;
            zeroForOne = outputAmount.currency.equals(this.currency1);
            _context2.n = 1;
            return this.swap(zeroForOne, JSBI.multiply(outputAmount.quotient, NEGATIVE_ONE), sqrtPriceLimitX96);
          case 1:
            _yield$this$swap2 = _context2.v;
            inputAmount = _yield$this$swap2.amountCalculated;
            sqrtRatioX96 = _yield$this$swap2.sqrtRatioX96;
            liquidity = _yield$this$swap2.liquidity;
            tickCurrent = _yield$this$swap2.tickCurrent;
            inputCurrency = zeroForOne ? this.currency0 : this.currency1;
            return _context2.a(2, [sdkCore.CurrencyAmount.fromRawAmount(inputCurrency, inputAmount), new Pool(this.currency0, this.currency1, this.fee, this.tickSpacing, this.hooks, sqrtRatioX96, liquidity, tickCurrent, this.tickDataProvider)]);
        }
      }, _callee2, this);
    }));
    function getInputAmount(_x3, _x4) {
      return _getInputAmount.apply(this, arguments);
    }
    return getInputAmount;
  }()
  /**
   * Executes a swap
   * @param zeroForOne Whether the amount in is token0 or token1
   * @param amountSpecified The amount of the swap, which implicitly configures the swap as exact input (positive), or exact output (negative)
   * @param sqrtPriceLimitX96 The Q64.96 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap
   * @returns amountCalculated
   * @returns sqrtRatioX96
   * @returns liquidity
   * @returns tickCurrent
   */
  ;
  _proto.swap =
  /*#__PURE__*/
  function () {
    var _swap = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(zeroForOne, amountSpecified, sqrtPriceLimitX96) {
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (this.hookImpactsSwap()) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2, v3Sdk.v3Swap(JSBI.BigInt(this.fee), this.sqrtRatioX96, this.tickCurrent, this.liquidity, this.tickSpacing, this.tickDataProvider, zeroForOne, amountSpecified, sqrtPriceLimitX96));
          case 1:
            throw new Error('Unsupported hook');
          case 2:
            return _context3.a(2);
        }
      }, _callee3, this);
    }));
    function swap(_x5, _x6, _x7) {
      return _swap.apply(this, arguments);
    }
    return swap;
  }();
  _proto.hookImpactsSwap = function hookImpactsSwap() {
    // could use this function to clear certain hooks that may have swap Permissions, but we know they don't interfere
    // in the swap outcome
    return Hook.hasSwapPermissions(this.hooks);
  };
  return _createClass(Pool, [{
    key: "token0",
    get: function get() {
      return this.currency0;
    }
  }, {
    key: "token1",
    get: function get() {
      return this.currency1;
    }
  }, {
    key: "currency0Price",
    get: function get() {
      var _this$_currency0Price;
      return (_this$_currency0Price = this._currency0Price) != null ? _this$_currency0Price : this._currency0Price = new sdkCore.Price(this.currency0, this.currency1, Q192, JSBI.multiply(this.sqrtRatioX96, this.sqrtRatioX96));
    }
    /** backwards compatibility with v2/3 sdks */
  }, {
    key: "token0Price",
    get: function get() {
      return this.currency0Price;
    }
    /**
     * Returns the current mid price of the pool in terms of currency1, i.e. the ratio of currency0 over currency1
     */
  }, {
    key: "currency1Price",
    get: function get() {
      var _this$_currency1Price;
      return (_this$_currency1Price = this._currency1Price) != null ? _this$_currency1Price : this._currency1Price = new sdkCore.Price(this.currency1, this.currency0, JSBI.multiply(this.sqrtRatioX96, this.sqrtRatioX96), Q192);
    }
    /** backwards compatibility with v2/3 sdks */
  }, {
    key: "token1Price",
    get: function get() {
      return this.currency1Price;
    }
  }, {
    key: "chainId",
    get: function get() {
      return this.currency0.chainId;
    }
  }]);
}();

function amountWithPathCurrency(amount, pool) {
  return sdkCore.CurrencyAmount.fromFractionalAmount(getPathCurrency(amount.currency, pool), amount.numerator, amount.denominator);
}
function getPathCurrency(currency, pool) {
  if (pool.involvesCurrency(currency)) {
    return currency;
  } else if (pool.involvesCurrency(currency.wrapped)) {
    return currency.wrapped;
  } else if (pool.currency0.wrapped.equals(currency)) {
    return pool.currency0;
  } else if (pool.currency1.wrapped.equals(currency)) {
    return pool.currency1;
  } else {
    throw new Error("Expected currency " + currency.symbol + " to be either " + pool.currency0.symbol + " or " + pool.currency1.symbol);
  }
}

/**
 * Represents a list of pools through which a swap can occur
 * @template TInput The input currency
 * @template TOutput The output currency
 */
var Route = /*#__PURE__*/function () {
  /**
   * Creates an instance of route.
   * @param pools An array of `Pool` objects, ordered by the route the swap will take
   * @param input The input currency
   * @param output The output currency
   */
  function Route(pools, input, output) {
    this._midPrice = null;
    !(pools.length > 0) ?  invariant(false, 'POOLS')  : void 0;
    var chainId = pools[0].chainId;
    var allOnSameChain = pools.every(function (pool) {
      return pool.chainId === chainId;
    });
    !allOnSameChain ?  invariant(false, 'CHAIN_IDS')  : void 0;
    /**
     * function throws if pools do not involve the input and output currency or the native/wrapped equivalent
     **/
    this.pathInput = getPathCurrency(input, pools[0]);
    this.pathOutput = getPathCurrency(output, pools[pools.length - 1]);
    // If the input is native and the first pool is an eth-weth pool, that means we already wrapped the input to weth
    // so we need to set the path input to be the wrapped input
    if (pools[0].currency0.wrapped.equals(pools[0].currency1)) {
      var _pools$;
      if (this.pathInput.isNative && (_pools$ = pools[1]) != null && _pools$.currency0.isNative) {
        this.pathInput = pools[0].currency1;
      } else if (this.pathInput.equals(pools[0].currency1) && pools[1] && !pools[1].currency0.isNative) {
        this.pathInput = pools[0].currency0;
      }
    }
    /**
     * Normalizes currency0-currency1 order and selects the next currency/fee step to add to the path
     * */
    var currencyPath = [this.pathInput];
    for (var _iterator = _createForOfIteratorHelperLoose(pools.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
        i = _step$value[0],
        pool = _step$value[1];
      var currentInputCurrency = currencyPath[i];
      !(currentInputCurrency.equals(pool.currency0) || currentInputCurrency.equals(pool.currency1)) ?  invariant(false, 'PATH')  : void 0;
      var nextCurrency = currentInputCurrency.equals(pool.currency0) ? pool.currency1 : pool.currency0;
      currencyPath.push(nextCurrency);
    }
    this.pools = pools;
    this.currencyPath = currencyPath;
    this.input = input;
    this.output = output != null ? output : currencyPath[currencyPath.length - 1];
  }
  return _createClass(Route, [{
    key: "chainId",
    get: function get() {
      return this.pools[0].chainId;
    }
    /**
     * Returns the mid price of the route
     */
  }, {
    key: "midPrice",
    get: function get() {
      if (this._midPrice !== null) return this._midPrice;
      var price = this.pools.slice(1).reduce(function (_ref, pool) {
        var nextInput = _ref.nextInput,
          price = _ref.price;
        return nextInput.equals(pool.currency0) ? {
          nextInput: pool.currency1,
          price: price.multiply(pool.currency0Price)
        } : {
          nextInput: pool.currency0,
          price: price.multiply(pool.currency1Price)
        };
      }, this.pools[0].currency0.equals(this.pathInput) ? {
        nextInput: this.pools[0].currency1,
        price: this.pools[0].currency0Price
      } : {
        nextInput: this.pools[0].currency0,
        price: this.pools[0].currency1Price
      }).price;
      return this._midPrice = new sdkCore.Price(this.input, this.output, price.denominator, price.numerator);
    }
  }]);
}();

/**
 * Trades comparator, an extension of the input output comparator that also considers other dimensions of the trade in ranking them
 * @template TInput The input currency, either Ether or an ERC-20
 * @template TOutput The output currency, either Ether or an ERC-20
 * @template TTradeType The trade type, either exact input or exact output
 * @param a The first trade to compare
 * @param b The second trade to compare
 * @returns A sorted ordering for two neighboring elements in a trade array
 */
function tradeComparator(a, b) {
  // must have same input and output currency for comparison
  !a.inputAmount.currency.equals(b.inputAmount.currency) ?  invariant(false, 'INPUT_CURRENCY')  : void 0;
  !a.outputAmount.currency.equals(b.outputAmount.currency) ?  invariant(false, 'OUTPUT_CURRENCY')  : void 0;
  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      // consider the number of hops since each hop costs gas
      var aHops = a.swaps.reduce(function (total, cur) {
        return total + cur.route.currencyPath.length;
      }, 0);
      var bHops = b.swaps.reduce(function (total, cur) {
        return total + cur.route.currencyPath.length;
      }, 0);
      return aHops - bHops;
    }
    // trade A requires less input than trade B, so A should come first
    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    // tradeA has less output than trade B, so should come second
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1;
    } else {
      return -1;
    }
  }
}
/**
 * Represents a trade executed against a set of routes where some percentage of the input is
 * split across each route.
 *
 * Each route has its own set of pools. Pools can not be re-used across routes.
 *
 * Does not account for slippage, i.e., changes in price environment that can occur between
 * the time the trade is submitted and when it is executed.
 * @template TInput The input currency, either Ether or an ERC-20
 * @template TOutput The output currency, either Ether or an ERC-20
 * @template TTradeType The trade type, either exact input or exact output
 */
var Trade = /*#__PURE__*/function () {
  /**
   * Construct a trade by passing in the pre-computed property values
   * @param routes The routes through which the trade occurs
   * @param tradeType The type of trade, exact input or exact output
   */
  function Trade(_ref) {
    var routes = _ref.routes,
      tradeType = _ref.tradeType;
    var inputCurrency = routes[0].inputAmount.currency;
    var outputCurrency = routes[0].outputAmount.currency;
    !routes.every(function (_ref2) {
      var route = _ref2.route;
      return inputCurrency.equals(route.input);
    }) ?  invariant(false, 'INPUT_CURRENCY_MATCH')  : void 0;
    !routes.every(function (_ref3) {
      var route = _ref3.route;
      return outputCurrency.equals(route.output);
    }) ?  invariant(false, 'OUTPUT_CURRENCY_MATCH')  : void 0;
    var numPools = routes.map(function (_ref4) {
      var route = _ref4.route;
      return route.pools.length;
    }).reduce(function (total, cur) {
      return total + cur;
    }, 0);
    var poolIDSet = new Set();
    for (var _iterator = _createForOfIteratorHelperLoose(routes), _step; !(_step = _iterator()).done;) {
      var route = _step.value.route;
      for (var _iterator2 = _createForOfIteratorHelperLoose(route.pools), _step2; !(_step2 = _iterator2()).done;) {
        var pool = _step2.value;
        poolIDSet.add(Pool.getPoolId(pool.currency0, pool.currency1, pool.fee, pool.tickSpacing, pool.hooks));
      }
    }
    !(numPools === poolIDSet.size) ?  invariant(false, 'POOLS_DUPLICATED')  : void 0;
    this.swaps = routes;
    this.tradeType = tradeType;
  }
  /**
   * @deprecated Deprecated in favor of 'swaps' property. If the trade consists of multiple routes
   * this will return an error.
   *
   * When the trade consists of just a single route, this returns the route of the trade,
   * i.e. which pools the trade goes through.
   */
  /**
   * Constructs an exact in trade with the given amount in and route
   * @template TInput The input currency, either Ether or an ERC-20
   * @template TOutput The output currency, either Ether or an ERC-20
   * @param route The route of the exact in trade
   * @param amountIn The amount being passed in
   * @returns The exact in trade
   */
  Trade.exactIn =
  /*#__PURE__*/
  function () {
    var _exactIn = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(route, amountIn) {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            return _context.a(2, Trade.fromRoute(route, amountIn, sdkCore.TradeType.EXACT_INPUT));
        }
      }, _callee);
    }));
    function exactIn(_x, _x2) {
      return _exactIn.apply(this, arguments);
    }
    return exactIn;
  }()
  /**
   * Constructs an exact out trade with the given amount out and route
   * @template TInput The input currency, either Ether or an ERC-20
   * @template TOutput The output currency, either Ether or an ERC-20
   * @param route The route of the exact out trade
   * @param amountOut The amount returned by the trade
   * @returns The exact out trade
   */
  ;
  Trade.exactOut =
  /*#__PURE__*/
  function () {
    var _exactOut = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(route, amountOut) {
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            return _context2.a(2, Trade.fromRoute(route, amountOut, sdkCore.TradeType.EXACT_OUTPUT));
        }
      }, _callee2);
    }));
    function exactOut(_x3, _x4) {
      return _exactOut.apply(this, arguments);
    }
    return exactOut;
  }()
  /**
   * Constructs a trade by simulating swaps through the given route
   * @template TInput The input currency, either Ether or an ERC-20.
   * @template TOutput The output currency, either Ether or an ERC-20.
   * @template TTradeType The type of the trade, either exact in or exact out.
   * @param route route to swap through
   * @param amount the amount specified, either input or output, depending on tradeType
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The route
   */
  ;
  Trade.fromRoute =
  /*#__PURE__*/
  function () {
    var _fromRoute = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(route, amount, tradeType) {
      var inputAmount, outputAmount, tokenAmount, i, pool, _yield$pool$getOutput, _tokenAmount, _i, _pool, _yield$_pool$getInput, isEthWethPool, _route$pools;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            if (!(tradeType === sdkCore.TradeType.EXACT_INPUT)) {
              _context3.n = 5;
              break;
            }
            !amount.currency.equals(route.input) ?  invariant(false, 'INPUT')  : void 0;
            // Account for trades that wrap/unwrap as a first step
            tokenAmount = amountWithPathCurrency(amount, route.pools[0]);
            i = 0;
          case 1:
            if (!(i < route.pools.length)) {
              _context3.n = 4;
              break;
            }
            pool = route.pools[i];
            _context3.n = 2;
            return pool.getOutputAmount(tokenAmount);
          case 2:
            _yield$pool$getOutput = _context3.v;
            tokenAmount = _yield$pool$getOutput[0];
          case 3:
            i++;
            _context3.n = 1;
            break;
          case 4:
            inputAmount = sdkCore.CurrencyAmount.fromFractionalAmount(route.input, amount.numerator, amount.denominator);
            outputAmount = sdkCore.CurrencyAmount.fromFractionalAmount(route.output, tokenAmount.numerator, tokenAmount.denominator);
            _context3.n = 10;
            break;
          case 5:
            !amount.currency.equals(route.output) ?  invariant(false, 'OUTPUT')  : void 0;
            // Account for trades that wrap/unwrap as a last step
            _tokenAmount = amountWithPathCurrency(amount, route.pools[route.pools.length - 1]);
            _i = route.pools.length - 1;
          case 6:
            if (!(_i >= 0)) {
              _context3.n = 9;
              break;
            }
            _pool = route.pools[_i];
            _context3.n = 7;
            return _pool.getInputAmount(_tokenAmount);
          case 7:
            _yield$_pool$getInput = _context3.v;
            _tokenAmount = _yield$_pool$getInput[0];
            // Special case: if this is the last pool (first in backward iteration) and it's an ETH-WETH pool
            // with ETH as the route output, we need to convert the WETH amount back to ETH
            // so the next pool in the iteration can work with ETH
            // and vice versa if the route output is WETH
            if (_i === route.pools.length - 1) {
              // Check if this is an ETH-WETH pool
              isEthWethPool = _pool.currency1.equals(_pool.currency0.wrapped);
              if (isEthWethPool) {
                if (route.output.isNative && (_route$pools = route.pools[_i - 1]) != null && _route$pools.currency0.isNative) {
                  // Convert WETH amount to ETH for the next pool
                  _tokenAmount = sdkCore.CurrencyAmount.fromFractionalAmount(_pool.currency0,
                  // native currency
                  _tokenAmount.numerator, _tokenAmount.denominator);
                } else if (route.output.equals(_pool.currency1) && route.pools[_i - 1] && !route.pools[_i - 1].currency0.isNative) {
                  // Convert ETH amount to WETH for the next pool
                  _tokenAmount = sdkCore.CurrencyAmount.fromFractionalAmount(_pool.currency1,
                  // wrapped currency
                  _tokenAmount.numerator, _tokenAmount.denominator);
                }
              }
            }
          case 8:
            _i--;
            _context3.n = 6;
            break;
          case 9:
            inputAmount = sdkCore.CurrencyAmount.fromFractionalAmount(route.input, _tokenAmount.numerator, _tokenAmount.denominator);
            outputAmount = sdkCore.CurrencyAmount.fromFractionalAmount(route.output, amount.numerator, amount.denominator);
          case 10:
            return _context3.a(2, new Trade({
              routes: [{
                inputAmount: inputAmount,
                outputAmount: outputAmount,
                route: route
              }],
              tradeType: tradeType
            }));
        }
      }, _callee3);
    }));
    function fromRoute(_x5, _x6, _x7) {
      return _fromRoute.apply(this, arguments);
    }
    return fromRoute;
  }()
  /**
   * Constructs a trade from routes by simulating swaps
   *
   * @template TInput The input currency, either Ether or an ERC-20.
   * @template TOutput The output currency, either Ether or an ERC-20.
   * @template TTradeType The type of the trade, either exact in or exact out.
   * @param routes the routes to swap through and how much of the amount should be routed through each
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The trade
   */
  ;
  Trade.fromRoutes =
  /*#__PURE__*/
  function () {
    var _fromRoutes = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(routes, tradeType) {
      var swaps;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.n = 1;
            return Promise.all(routes.map(/*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(_ref5) {
                var amount, route, trade;
                return _regenerator().w(function (_context4) {
                  while (1) switch (_context4.n) {
                    case 0:
                      amount = _ref5.amount, route = _ref5.route;
                      _context4.n = 1;
                      return Trade.fromRoute(route, amount, tradeType);
                    case 1:
                      trade = _context4.v;
                      return _context4.a(2, trade.swaps[0]);
                  }
                }, _callee4);
              }));
              return function (_x0) {
                return _ref6.apply(this, arguments);
              };
            }()));
          case 1:
            swaps = _context5.v;
            return _context5.a(2, new Trade({
              routes: swaps,
              tradeType: tradeType
            }));
        }
      }, _callee5);
    }));
    function fromRoutes(_x8, _x9) {
      return _fromRoutes.apply(this, arguments);
    }
    return fromRoutes;
  }()
  /**
   * Creates a trade without computing the result of swapping through the route. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @template TInput The input currency, either Ether or an ERC-20
   * @template TOutput The output currency, either Ether or an ERC-20
   * @template TTradeType The type of the trade, either exact in or exact out
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */
  ;
  Trade.createUncheckedTrade = function createUncheckedTrade(constructorArguments) {
    return new Trade(_extends({}, constructorArguments, {
      routes: [{
        inputAmount: constructorArguments.inputAmount,
        outputAmount: constructorArguments.outputAmount,
        route: constructorArguments.route
      }]
    }));
  }
  /**
   * Creates a trade without computing the result of swapping through the routes. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @template TInput The input currency, either Ether or an ERC-20
   * @template TOutput The output currency, either Ether or an ERC-20
   * @template TTradeType The type of the trade, either exact in or exact out
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */;
  Trade.createUncheckedTradeWithMultipleRoutes = function createUncheckedTradeWithMultipleRoutes(constructorArguments) {
    return new Trade(constructorArguments);
  }
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount out
   */;
  var _proto = Trade.prototype;
  _proto.minimumAmountOut = function minimumAmountOut(slippageTolerance, amountOut) {
    if (amountOut === void 0) {
      amountOut = this.outputAmount;
    }
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, 'SLIPPAGE_TOLERANCE')  : void 0;
    if (this.tradeType === sdkCore.TradeType.EXACT_OUTPUT) {
      return amountOut;
    } else {
      var slippageAdjustedAmountOut = new sdkCore.Fraction(ONE).add(slippageTolerance).invert().multiply(amountOut.quotient).quotient;
      return sdkCore.CurrencyAmount.fromRawAmount(amountOut.currency, slippageAdjustedAmountOut);
    }
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount in
   */;
  _proto.maximumAmountIn = function maximumAmountIn(slippageTolerance, amountIn) {
    if (amountIn === void 0) {
      amountIn = this.inputAmount;
    }
    !!slippageTolerance.lessThan(ZERO) ?  invariant(false, 'SLIPPAGE_TOLERANCE')  : void 0;
    if (this.tradeType === sdkCore.TradeType.EXACT_INPUT) {
      return amountIn;
    } else {
      var slippageAdjustedAmountIn = new sdkCore.Fraction(ONE).add(slippageTolerance).multiply(amountIn.quotient).quotient;
      return sdkCore.CurrencyAmount.fromRawAmount(amountIn.currency, slippageAdjustedAmountIn);
    }
  }
  /**
   * Return the execution price after accounting for slippage tolerance
   * @param slippageTolerance the allowed tolerated slippage
   * @returns The execution price
   */;
  _proto.worstExecutionPrice = function worstExecutionPrice(slippageTolerance) {
    return new sdkCore.Price(this.inputAmount.currency, this.outputAmount.currency, this.maximumAmountIn(slippageTolerance).quotient, this.minimumAmountOut(slippageTolerance).quotient);
  }
  /**
   * Given a list of pools, and a fixed amount in, returns the top `maxNumResults` trades that go from an input currency
   * amount to an output currency, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param nextAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param currencyAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact in trade
   */;
  Trade.bestTradeExactIn =
  /*#__PURE__*/
  function () {
    var _bestTradeExactIn = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(pools, currencyAmountIn, currencyOut, _temp,
    // used in recursion.
    currentPools, nextAmountIn, bestTrades) {
      var _ref7, _ref7$maxNumResults, maxNumResults, _ref7$maxHops, maxHops, amountIn, i, pool, amountOut, _yield$pool$getOutput2, poolsExcludingThisPool, _t, _t2, _t3;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            _ref7 = _temp === void 0 ? {} : _temp, _ref7$maxNumResults = _ref7.maxNumResults, maxNumResults = _ref7$maxNumResults === void 0 ? 3 : _ref7$maxNumResults, _ref7$maxHops = _ref7.maxHops, maxHops = _ref7$maxHops === void 0 ? 3 : _ref7$maxHops;
            if (currentPools === void 0) {
              currentPools = [];
            }
            if (nextAmountIn === void 0) {
              nextAmountIn = currencyAmountIn;
            }
            if (bestTrades === void 0) {
              bestTrades = [];
            }
            !(pools.length > 0) ?  invariant(false, 'POOLS')  : void 0;
            !(maxHops > 0) ?  invariant(false, 'MAX_HOPS')  : void 0;
            !(currencyAmountIn === nextAmountIn || currentPools.length > 0) ?  invariant(false, 'INVALID_RECURSION')  : void 0;
            amountIn = nextAmountIn;
            i = 0;
          case 1:
            if (!(i < pools.length)) {
              _context6.n = 11;
              break;
            }
            pool = pools[i]; // pool irrelevant
            if (!(!pool.currency0.equals(amountIn.currency) && !pool.currency1.equals(amountIn.currency))) {
              _context6.n = 2;
              break;
            }
            return _context6.a(3, 10);
          case 2:
            amountOut = void 0;
            _context6.p = 3;
            _context6.n = 4;
            return pool.getOutputAmount(amountIn);
          case 4:
            _yield$pool$getOutput2 = _context6.v;
            amountOut = _yield$pool$getOutput2[0];
            _context6.n = 7;
            break;
          case 5:
            _context6.p = 5;
            _t = _context6.v;
            if (!_t.isInsufficientInputAmountError) {
              _context6.n = 6;
              break;
            }
            return _context6.a(3, 10);
          case 6:
            throw _t;
          case 7:
            if (!amountOut.currency.equals(currencyOut)) {
              _context6.n = 9;
              break;
            }
            _t2 = sdkCore.sortedInsert;
            _t3 = bestTrades;
            _context6.n = 8;
            return Trade.fromRoute(new Route([].concat(currentPools, [pool]), currencyAmountIn.currency, currencyOut), currencyAmountIn, sdkCore.TradeType.EXACT_INPUT);
          case 8:
            _t2(_t3, _context6.v, maxNumResults, tradeComparator);
            _context6.n = 10;
            break;
          case 9:
            if (!(maxHops > 1 && pools.length > 1)) {
              _context6.n = 10;
              break;
            }
            poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length)); // otherwise, consider all the other paths that lead from this currency as long as we have not exceeded maxHops
            _context6.n = 10;
            return Trade.bestTradeExactIn(poolsExcludingThisPool, currencyAmountIn, currencyOut, {
              maxNumResults: maxNumResults,
              maxHops: maxHops - 1
            }, [].concat(currentPools, [pool]), amountOut, bestTrades);
          case 10:
            i++;
            _context6.n = 1;
            break;
          case 11:
            return _context6.a(2, bestTrades);
        }
      }, _callee6, null, [[3, 5]]);
    }));
    function bestTradeExactIn(_x1, _x10, _x11, _x12, _x13, _x14, _x15) {
      return _bestTradeExactIn.apply(this, arguments);
    }
    return bestTradeExactIn;
  }()
  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pools, and a fixed amount out, returns the top `maxNumResults` trades that go from an input currency
   * to an output currency amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param currencyAmountOut the desired currency amount out
   * @param nextAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact out trade
   */
  ;
  Trade.bestTradeExactOut =
  /*#__PURE__*/
  function () {
    var _bestTradeExactOut = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(pools, currencyIn, currencyAmountOut, _temp2,
    // used in recursion.
    currentPools, nextAmountOut, bestTrades) {
      var _ref8, _ref8$maxNumResults, maxNumResults, _ref8$maxHops, maxHops, amountOut, i, pool, amountIn, _yield$pool$getInputA, poolsExcludingThisPool, _t4, _t5, _t6;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.p = _context7.n) {
          case 0:
            _ref8 = _temp2 === void 0 ? {} : _temp2, _ref8$maxNumResults = _ref8.maxNumResults, maxNumResults = _ref8$maxNumResults === void 0 ? 3 : _ref8$maxNumResults, _ref8$maxHops = _ref8.maxHops, maxHops = _ref8$maxHops === void 0 ? 3 : _ref8$maxHops;
            if (currentPools === void 0) {
              currentPools = [];
            }
            if (nextAmountOut === void 0) {
              nextAmountOut = currencyAmountOut;
            }
            if (bestTrades === void 0) {
              bestTrades = [];
            }
            !(pools.length > 0) ?  invariant(false, 'POOLS')  : void 0;
            !(maxHops > 0) ?  invariant(false, 'MAX_HOPS')  : void 0;
            !(currencyAmountOut === nextAmountOut || currentPools.length > 0) ?  invariant(false, 'INVALID_RECURSION')  : void 0;
            amountOut = nextAmountOut;
            i = 0;
          case 1:
            if (!(i < pools.length)) {
              _context7.n = 11;
              break;
            }
            pool = pools[i]; // pool irrelevant
            if (!(!pool.currency0.equals(amountOut.currency) && !pool.currency1.equals(amountOut.currency))) {
              _context7.n = 2;
              break;
            }
            return _context7.a(3, 10);
          case 2:
            amountIn = void 0;
            _context7.p = 3;
            _context7.n = 4;
            return pool.getInputAmount(amountOut);
          case 4:
            _yield$pool$getInputA = _context7.v;
            amountIn = _yield$pool$getInputA[0];
            _context7.n = 7;
            break;
          case 5:
            _context7.p = 5;
            _t4 = _context7.v;
            if (!_t4.isInsufficientReservesError) {
              _context7.n = 6;
              break;
            }
            return _context7.a(3, 10);
          case 6:
            throw _t4;
          case 7:
            if (!amountIn.currency.equals(currencyIn)) {
              _context7.n = 9;
              break;
            }
            _t5 = sdkCore.sortedInsert;
            _t6 = bestTrades;
            _context7.n = 8;
            return Trade.fromRoute(new Route([pool].concat(currentPools), currencyIn, currencyAmountOut.currency), currencyAmountOut, sdkCore.TradeType.EXACT_OUTPUT);
          case 8:
            _t5(_t6, _context7.v, maxNumResults, tradeComparator);
            _context7.n = 10;
            break;
          case 9:
            if (!(maxHops > 1 && pools.length > 1)) {
              _context7.n = 10;
              break;
            }
            poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length)); // otherwise, consider all the other paths that arrive at this currency as long as we have not exceeded maxHops
            _context7.n = 10;
            return Trade.bestTradeExactOut(poolsExcludingThisPool, currencyIn, currencyAmountOut, {
              maxNumResults: maxNumResults,
              maxHops: maxHops - 1
            }, [pool].concat(currentPools), amountIn, bestTrades);
          case 10:
            i++;
            _context7.n = 1;
            break;
          case 11:
            return _context7.a(2, bestTrades);
        }
      }, _callee7, null, [[3, 5]]);
    }));
    function bestTradeExactOut(_x16, _x17, _x18, _x19, _x20, _x21, _x22) {
      return _bestTradeExactOut.apply(this, arguments);
    }
    return bestTradeExactOut;
  }();
  return _createClass(Trade, [{
    key: "route",
    get: function get() {
      !(this.swaps.length === 1) ?  invariant(false, 'MULTIPLE_ROUTES')  : void 0;
      return this.swaps[0].route;
    }
    /**
     * The input amount for the trade assuming no slippage.
     */
  }, {
    key: "inputAmount",
    get: function get() {
      if (this._inputAmount) {
        return this._inputAmount;
      }
      var inputCurrency = this.swaps[0].inputAmount.currency;
      var totalInputFromRoutes = this.swaps.map(function (_ref9) {
        var inputAmount = _ref9.inputAmount;
        return inputAmount;
      }).reduce(function (total, cur) {
        return total.add(cur);
      }, sdkCore.CurrencyAmount.fromRawAmount(inputCurrency, 0));
      this._inputAmount = totalInputFromRoutes;
      return this._inputAmount;
    }
    /**
     * The output amount for the trade assuming no slippage.
     */
  }, {
    key: "outputAmount",
    get: function get() {
      if (this._outputAmount) {
        return this._outputAmount;
      }
      var outputCurrency = this.swaps[0].outputAmount.currency;
      var totalOutputFromRoutes = this.swaps.map(function (_ref0) {
        var outputAmount = _ref0.outputAmount;
        return outputAmount;
      }).reduce(function (total, cur) {
        return total.add(cur);
      }, sdkCore.CurrencyAmount.fromRawAmount(outputCurrency, 0));
      this._outputAmount = totalOutputFromRoutes;
      return this._outputAmount;
    }
    /**
     * The price expressed in terms of output amount/input amount.
     */
  }, {
    key: "executionPrice",
    get: function get() {
      var _this$_executionPrice;
      return (_this$_executionPrice = this._executionPrice) != null ? _this$_executionPrice : this._executionPrice = new sdkCore.Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.quotient, this.outputAmount.quotient);
    }
    /**
     * Returns the percent difference between the route's mid price and the price impact
     */
  }, {
    key: "priceImpact",
    get: function get() {
      if (this._priceImpact) {
        return this._priceImpact;
      }
      var spotOutputAmount = sdkCore.CurrencyAmount.fromRawAmount(this.outputAmount.currency, 0);
      for (var _iterator3 = _createForOfIteratorHelperLoose(this.swaps), _step3; !(_step3 = _iterator3()).done;) {
        var _step3$value = _step3.value,
          route = _step3$value.route,
          inputAmount = _step3$value.inputAmount;
        var midPrice = route.midPrice;
        spotOutputAmount = spotOutputAmount.add(midPrice.quote(inputAmount));
      }
      var priceImpact = spotOutputAmount.subtract(this.outputAmount).divide(spotOutputAmount);
      this._priceImpact = new sdkCore.Percent(priceImpact.numerator, priceImpact.denominator);
      return this._priceImpact;
    }
  }]);
}();

/**
 * This library is the almost the same as v3-sdk priceTickConversion except
 * that it accepts a Currency type instead of a Token type,
 * and thus uses some helper functions defined for the Currency type over the Token type.
 */
/**
 * Returns a price object corresponding to the input tick and the base/quote token
 * Inputs must be tokens because the address order is used to interpret the price represented by the tick
 * @param baseToken the base token of the price
 * @param quoteToken the quote token of the price
 * @param tick the tick for which to return the price
 */
function tickToPrice(baseCurrency, quoteCurrency, tick) {
  var sqrtRatioX96 = v3Sdk.TickMath.getSqrtRatioAtTick(tick);
  var ratioX192 = JSBI.multiply(sqrtRatioX96, sqrtRatioX96);
  return sortsBefore(baseCurrency, quoteCurrency) ? new sdkCore.Price(baseCurrency, quoteCurrency, Q192, ratioX192) : new sdkCore.Price(baseCurrency, quoteCurrency, ratioX192, Q192);
}
/**
 * Returns the first tick for which the given price is greater than or equal to the tick price
 * @param price for which to return the closest tick that represents a price less than or equal to the input price,
 * i.e. the price of the returned tick is less than or equal to the input price
 */
function priceToClosestTick(price) {
  var sorted = sortsBefore(price.baseCurrency, price.quoteCurrency);
  var sqrtRatioX96 = sorted ? v3Sdk.encodeSqrtRatioX96(price.numerator, price.denominator) : v3Sdk.encodeSqrtRatioX96(price.denominator, price.numerator);
  var tick = v3Sdk.TickMath.getTickAtSqrtRatio(sqrtRatioX96);
  var nextTickPrice = tickToPrice(price.baseCurrency, price.quoteCurrency, tick + 1);
  if (sorted) {
    if (!price.lessThan(nextTickPrice)) {
      tick++;
    }
  } else {
    if (!price.greaterThan(nextTickPrice)) {
      tick++;
    }
  }
  return tick;
}

/**
 * Represents a position on a Uniswap V4 Pool
 * @dev Similar to the V3 implementation
 * - using Currency instead of Token
 * - keep in mind that Pool and liquidity must be fetched from the pool manager
 */
var Position = /*#__PURE__*/function () {
  /**
   * Constructs a position for a given pool with the given liquidity
   * @param pool For which pool the liquidity is assigned
   * @param liquidity The amount of liquidity that is in the position
   * @param tickLower The lower tick of the position
   * @param tickUpper The upper tick of the position
   */
  function Position(_ref) {
    var pool = _ref.pool,
      liquidity = _ref.liquidity,
      tickLower = _ref.tickLower,
      tickUpper = _ref.tickUpper;
    // cached resuts for the getters
    this._token0Amount = null;
    this._token1Amount = null;
    this._mintAmounts = null;
    !(tickLower < tickUpper) ?  invariant(false, 'TICK_ORDER')  : void 0;
    !(tickLower >= v3Sdk.TickMath.MIN_TICK && tickLower % pool.tickSpacing === 0) ?  invariant(false, 'TICK_LOWER')  : void 0;
    !(tickUpper <= v3Sdk.TickMath.MAX_TICK && tickUpper % pool.tickSpacing === 0) ?  invariant(false, 'TICK_UPPER')  : void 0;
    this.pool = pool;
    this.tickLower = tickLower;
    this.tickUpper = tickUpper;
    this.liquidity = JSBI.BigInt(liquidity);
  }
  /**
   * Returns the price of token0 at the lower tick
   */
  var _proto = Position.prototype;
  /**
   * Returns the lower and upper sqrt ratios if the price 'slips' up to slippage tolerance percentage
   * @param slippageTolerance The amount by which the price can 'slip' before the transaction will revert
   * @returns The sqrt ratios after slippage
   */
  _proto.ratiosAfterSlippage = function ratiosAfterSlippage(slippageTolerance) {
    var priceLower = this.pool.token0Price.asFraction.multiply(new sdkCore.Percent(1).subtract(slippageTolerance));
    var priceUpper = this.pool.token0Price.asFraction.multiply(slippageTolerance.add(1));
    var sqrtRatioX96Lower = v3Sdk.encodeSqrtRatioX96(priceLower.numerator, priceLower.denominator);
    if (JSBI.lessThanOrEqual(sqrtRatioX96Lower, v3Sdk.TickMath.MIN_SQRT_RATIO)) {
      sqrtRatioX96Lower = JSBI.add(v3Sdk.TickMath.MIN_SQRT_RATIO, JSBI.BigInt(1));
    }
    var sqrtRatioX96Upper = v3Sdk.encodeSqrtRatioX96(priceUpper.numerator, priceUpper.denominator);
    if (JSBI.greaterThanOrEqual(sqrtRatioX96Upper, v3Sdk.TickMath.MAX_SQRT_RATIO)) {
      sqrtRatioX96Upper = JSBI.subtract(v3Sdk.TickMath.MAX_SQRT_RATIO, JSBI.BigInt(1));
    }
    return {
      sqrtRatioX96Lower: sqrtRatioX96Lower,
      sqrtRatioX96Upper: sqrtRatioX96Upper
    };
  }
  /**
   * Returns the maximum amount of token0 and token1 that must be sent in order to safely mint the amount of liquidity held by the position
   * with the given slippage tolerance
   * @param slippageTolerance Tolerance of unfavorable slippage from the current price
   * @returns The amounts, with slippage
   * @dev In v4, minting and increasing is protected by maximum amounts of token0 and token1.
   */;
  _proto.mintAmountsWithSlippage = function mintAmountsWithSlippage(slippageTolerance) {
    // get lower/upper prices
    // these represent the lowest and highest prices that the pool is allowed to "slip" to
    var _this$ratiosAfterSlip = this.ratiosAfterSlippage(slippageTolerance),
      sqrtRatioX96Upper = _this$ratiosAfterSlip.sqrtRatioX96Upper,
      sqrtRatioX96Lower = _this$ratiosAfterSlip.sqrtRatioX96Lower;
    // construct counterfactual pools from the lower bounded price and the upper bounded price
    var poolLower = new Pool(this.pool.token0, this.pool.token1, this.pool.fee, this.pool.tickSpacing, this.pool.hooks, sqrtRatioX96Lower, 0 /* liquidity doesn't matter */, v3Sdk.TickMath.getTickAtSqrtRatio(sqrtRatioX96Lower));
    var poolUpper = new Pool(this.pool.token0, this.pool.token1, this.pool.fee, this.pool.tickSpacing, this.pool.hooks, sqrtRatioX96Upper, 0 /* liquidity doesn't matter */, v3Sdk.TickMath.getTickAtSqrtRatio(sqrtRatioX96Upper));
    // Note: Slippage derivation in v4 is different from v3.
    // When creating a position (minting) or adding to a position (increasing) slippage is bounded by the MAXIMUM amount in in token0 and token1.
    // The largest amount of token1 will happen when the price slips up, so we use the poolUpper to get amount1.
    // The largest amount of token0 will happen when the price slips down, so we use the poolLower to get amount0.
    // Ie...We want the larger amounts, which occurs at the upper price for amount1...
    var amount1 = new Position({
      pool: poolUpper,
      liquidity: this.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).mintAmounts.amount1;
    // ...and the lower for amount0
    var amount0 = new Position({
      pool: poolLower,
      liquidity: this.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).mintAmounts.amount0;
    return {
      amount0: amount0,
      amount1: amount1
    };
  }
  /**
   * Returns the minimum amounts that should be requested in order to safely burn the amount of liquidity held by the
   * position with the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the current price
   * @returns The amounts, with slippage
   */;
  _proto.burnAmountsWithSlippage = function burnAmountsWithSlippage(slippageTolerance) {
    // get lower/upper prices
    var _this$ratiosAfterSlip2 = this.ratiosAfterSlippage(slippageTolerance),
      sqrtRatioX96Upper = _this$ratiosAfterSlip2.sqrtRatioX96Upper,
      sqrtRatioX96Lower = _this$ratiosAfterSlip2.sqrtRatioX96Lower;
    // construct counterfactual pools
    var poolLower = new Pool(this.pool.currency0, this.pool.currency1, this.pool.fee, this.pool.tickSpacing, this.pool.hooks, sqrtRatioX96Lower, 0 /* liquidity doesn't matter */, v3Sdk.TickMath.getTickAtSqrtRatio(sqrtRatioX96Lower));
    var poolUpper = new Pool(this.pool.currency0, this.pool.currency1, this.pool.fee, this.pool.tickSpacing, this.pool.hooks, sqrtRatioX96Upper, 0 /* liquidity doesn't matter */, v3Sdk.TickMath.getTickAtSqrtRatio(sqrtRatioX96Upper));
    // we want the smaller amounts...
    // ...which occurs at the upper price for amount0...
    var amount0 = new Position({
      pool: poolUpper,
      liquidity: this.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).amount0;
    // ...and the lower for amount1
    var amount1 = new Position({
      pool: poolLower,
      liquidity: this.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).amount1;
    return {
      amount0: amount0.quotient,
      amount1: amount1.quotient
    };
  }
  /**
   * Returns the minimum amounts that must be sent in order to mint the amount of liquidity held by the position at
   * the current price for the pool
   */;
  /**
   * Returns the AllowanceTransferPermitBatch for adding liquidity to a position
   * @param slippageTolerance The amount by which the price can 'slip' before the transaction will revert
   * @param spender The spender of the permit (should usually be the PositionManager)
   * @param nonce A valid permit2 nonce
   * @param deadline The deadline for the permit
   */
  _proto.permitBatchData = function permitBatchData(slippageTolerance, spender, nonce, deadline) {
    var _this$mintAmountsWith = this.mintAmountsWithSlippage(slippageTolerance),
      amount0 = _this$mintAmountsWith.amount0,
      amount1 = _this$mintAmountsWith.amount1;
    return {
      details: [{
        token: this.pool.currency0.wrapped.address,
        amount: amount0,
        expiration: deadline,
        nonce: nonce
      }, {
        token: this.pool.currency1.wrapped.address,
        amount: amount1,
        expiration: deadline,
        nonce: nonce
      }],
      spender: spender,
      sigDeadline: deadline
    };
  }
  /**
   * Computes the maximum amount of liquidity received for a given amount of token0, token1,
   * and the prices at the tick boundaries.
   * @param pool The pool for which the position should be created
   * @param tickLower The lower tick of the position
   * @param tickUpper The upper tick of the position
   * @param amount0 token0 amountzw
   * @param amount1 token1 amount
   * @param useFullPrecision If false, liquidity will be maximized according to what the router can calculate,
   * not what core can theoretically support
   * @returns The amount of liquidity for the position
   */;
  Position.fromAmounts = function fromAmounts(_ref2) {
    var pool = _ref2.pool,
      tickLower = _ref2.tickLower,
      tickUpper = _ref2.tickUpper,
      amount0 = _ref2.amount0,
      amount1 = _ref2.amount1,
      useFullPrecision = _ref2.useFullPrecision;
    var sqrtRatioAX96 = v3Sdk.TickMath.getSqrtRatioAtTick(tickLower);
    var sqrtRatioBX96 = v3Sdk.TickMath.getSqrtRatioAtTick(tickUpper);
    return new Position({
      pool: pool,
      tickLower: tickLower,
      tickUpper: tickUpper,
      liquidity: v3Sdk.maxLiquidityForAmounts(pool.sqrtRatioX96, sqrtRatioAX96, sqrtRatioBX96, amount0, amount1, useFullPrecision)
    });
  }
  /**
   * Computes a position with the maximum amount of liquidity received for a given amount of token0, assuming an unlimited amount of token1
   * @param pool The pool for which the position is created
   * @param tickLower The lower tick
   * @param tickUpper The upper tick
   * @param amount0 The desired amount of token0
   * @param useFullPrecision If true, liquidity will be maximized according to what the router can calculate,
   * not what core can theoretically support
   * @returns The position
   */;
  Position.fromAmount0 = function fromAmount0(_ref3) {
    var pool = _ref3.pool,
      tickLower = _ref3.tickLower,
      tickUpper = _ref3.tickUpper,
      amount0 = _ref3.amount0,
      useFullPrecision = _ref3.useFullPrecision;
    return Position.fromAmounts({
      pool: pool,
      tickLower: tickLower,
      tickUpper: tickUpper,
      amount0: amount0,
      amount1: sdkCore.MaxUint256,
      useFullPrecision: useFullPrecision
    });
  }
  /**
   * Computes a position with the maximum amount of liquidity received for a given amount of token1, assuming an unlimited amount of token0
   * @param pool The pool for which the position is created
   * @param tickLower The lower tick
   * @param tickUpper The upper tick
   * @param amount1 The desired amount of token1
   * @returns The position
   */;
  Position.fromAmount1 = function fromAmount1(_ref4) {
    var pool = _ref4.pool,
      tickLower = _ref4.tickLower,
      tickUpper = _ref4.tickUpper,
      amount1 = _ref4.amount1;
    // this function always uses full precision,
    return Position.fromAmounts({
      pool: pool,
      tickLower: tickLower,
      tickUpper: tickUpper,
      amount0: sdkCore.MaxUint256,
      amount1: amount1,
      useFullPrecision: true
    });
  };
  return _createClass(Position, [{
    key: "token0PriceLower",
    get: function get() {
      return tickToPrice(this.pool.currency0, this.pool.currency1, this.tickLower);
    }
    /**
     * Returns the price of token0 at the upper tick
     */
  }, {
    key: "token0PriceUpper",
    get: function get() {
      return tickToPrice(this.pool.currency0, this.pool.currency1, this.tickUpper);
    }
    /**
     * Returns the amount of token0 that this position's liquidity could be burned for at the current pool price
     */
  }, {
    key: "amount0",
    get: function get() {
      if (!this._token0Amount) {
        if (this.pool.tickCurrent < this.tickLower) {
          this._token0Amount = sdkCore.CurrencyAmount.fromRawAmount(this.pool.currency0, v3Sdk.SqrtPriceMath.getAmount0Delta(v3Sdk.TickMath.getSqrtRatioAtTick(this.tickLower), v3Sdk.TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, false));
        } else if (this.pool.tickCurrent < this.tickUpper) {
          this._token0Amount = sdkCore.CurrencyAmount.fromRawAmount(this.pool.currency0, v3Sdk.SqrtPriceMath.getAmount0Delta(this.pool.sqrtRatioX96, v3Sdk.TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, false));
        } else {
          this._token0Amount = sdkCore.CurrencyAmount.fromRawAmount(this.pool.currency0, ZERO);
        }
      }
      return this._token0Amount;
    }
    /**
     * Returns the amount of token1 that this position's liquidity could be burned for at the current pool price
     */
  }, {
    key: "amount1",
    get: function get() {
      if (!this._token1Amount) {
        if (this.pool.tickCurrent < this.tickLower) {
          this._token1Amount = sdkCore.CurrencyAmount.fromRawAmount(this.pool.currency1, ZERO);
        } else if (this.pool.tickCurrent < this.tickUpper) {
          this._token1Amount = sdkCore.CurrencyAmount.fromRawAmount(this.pool.currency1, v3Sdk.SqrtPriceMath.getAmount1Delta(v3Sdk.TickMath.getSqrtRatioAtTick(this.tickLower), this.pool.sqrtRatioX96, this.liquidity, false));
        } else {
          this._token1Amount = sdkCore.CurrencyAmount.fromRawAmount(this.pool.currency1, v3Sdk.SqrtPriceMath.getAmount1Delta(v3Sdk.TickMath.getSqrtRatioAtTick(this.tickLower), v3Sdk.TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, false));
        }
      }
      return this._token1Amount;
    }
  }, {
    key: "mintAmounts",
    get: function get() {
      if (this._mintAmounts === null) {
        if (this.pool.tickCurrent < this.tickLower) {
          return {
            amount0: v3Sdk.SqrtPriceMath.getAmount0Delta(v3Sdk.TickMath.getSqrtRatioAtTick(this.tickLower), v3Sdk.TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, true),
            amount1: ZERO
          };
        } else if (this.pool.tickCurrent < this.tickUpper) {
          return {
            amount0: v3Sdk.SqrtPriceMath.getAmount0Delta(this.pool.sqrtRatioX96, v3Sdk.TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, true),
            amount1: v3Sdk.SqrtPriceMath.getAmount1Delta(v3Sdk.TickMath.getSqrtRatioAtTick(this.tickLower), this.pool.sqrtRatioX96, this.liquidity, true)
          };
        } else {
          return {
            amount0: ZERO,
            amount1: v3Sdk.SqrtPriceMath.getAmount1Delta(v3Sdk.TickMath.getSqrtRatioAtTick(this.tickLower), v3Sdk.TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, true)
          };
        }
      }
      return this._mintAmounts;
    }
  }]);
}();

var encodeRouteToPath = function encodeRouteToPath(route, exactOutput) {
  // create a deep copy of pools so that we don't tamper with pool array on route
  var pools = route.pools.map(function (p) {
    return p;
  });
  if (exactOutput) pools = pools.reverse();
  var startingCurrency = exactOutput ? route.pathOutput : route.pathInput;
  var pathKeys = [];
  for (var _iterator = _createForOfIteratorHelperLoose(pools), _step; !(_step = _iterator()).done;) {
    var pool = _step.value;
    var nextCurrency = startingCurrency.equals(pool.currency0) ? pool.currency1 : pool.currency0;
    pathKeys.push({
      intermediateCurrency: nextCurrency.isNative ? ADDRESS_ZERO : nextCurrency.address,
      fee: pool.fee,
      tickSpacing: pool.tickSpacing,
      hooks: pool.hooks,
      hookData: '0x'
    });
    startingCurrency = nextCurrency;
  }
  return exactOutput ? pathKeys.reverse() : pathKeys;
};

var _V4_BASE_ACTIONS_ABI_, _V4_SWAP_ACTIONS_V2_;
(function (URVersion) {
  URVersion["V2_0"] = "2.0";
  URVersion["V2_1"] = "2.1";
})(exports.URVersion || (exports.URVersion = {}));
(function (Actions) {
  // pool actions
  // liquidity actions
  Actions[Actions["INCREASE_LIQUIDITY"] = 0] = "INCREASE_LIQUIDITY";
  Actions[Actions["DECREASE_LIQUIDITY"] = 1] = "DECREASE_LIQUIDITY";
  Actions[Actions["MINT_POSITION"] = 2] = "MINT_POSITION";
  Actions[Actions["BURN_POSITION"] = 3] = "BURN_POSITION";
  // for fee on transfer tokens
  // INCREASE_LIQUIDITY_FROM_DELTAS = 0x04,
  // MINT_POSITION_FROM_DELTAS = 0x05,
  // swapping
  Actions[Actions["SWAP_EXACT_IN_SINGLE"] = 6] = "SWAP_EXACT_IN_SINGLE";
  Actions[Actions["SWAP_EXACT_IN"] = 7] = "SWAP_EXACT_IN";
  Actions[Actions["SWAP_EXACT_OUT_SINGLE"] = 8] = "SWAP_EXACT_OUT_SINGLE";
  Actions[Actions["SWAP_EXACT_OUT"] = 9] = "SWAP_EXACT_OUT";
  // closing deltas on the pool manager
  // settling
  Actions[Actions["SETTLE"] = 11] = "SETTLE";
  Actions[Actions["SETTLE_ALL"] = 12] = "SETTLE_ALL";
  Actions[Actions["SETTLE_PAIR"] = 13] = "SETTLE_PAIR";
  // taking
  Actions[Actions["TAKE"] = 14] = "TAKE";
  Actions[Actions["TAKE_ALL"] = 15] = "TAKE_ALL";
  Actions[Actions["TAKE_PORTION"] = 16] = "TAKE_PORTION";
  Actions[Actions["TAKE_PAIR"] = 17] = "TAKE_PAIR";
  Actions[Actions["CLOSE_CURRENCY"] = 18] = "CLOSE_CURRENCY";
  // CLEAR_OR_TAKE = 0x13,
  Actions[Actions["SWEEP"] = 20] = "SWEEP";
  // for wrapping/unwrapping native
  // WRAP = 0x15,
  Actions[Actions["UNWRAP"] = 22] = "UNWRAP";
})(exports.Actions || (exports.Actions = {}));
(function (Subparser) {
  Subparser[Subparser["V4SwapExactInSingle"] = 0] = "V4SwapExactInSingle";
  Subparser[Subparser["V4SwapExactIn"] = 1] = "V4SwapExactIn";
  Subparser[Subparser["V4SwapExactOutSingle"] = 2] = "V4SwapExactOutSingle";
  Subparser[Subparser["V4SwapExactOut"] = 3] = "V4SwapExactOut";
  Subparser[Subparser["PoolKey"] = 4] = "PoolKey";
})(exports.Subparser || (exports.Subparser = {}));
var POOL_KEY_STRUCT = '(address currency0,address currency1,uint24 fee,int24 tickSpacing,address hooks)';
var PATH_KEY_STRUCT = '(address intermediateCurrency,uint256 fee,int24 tickSpacing,address hooks,bytes hookData)';
var SWAP_EXACT_IN_SINGLE_STRUCT = '(' + POOL_KEY_STRUCT + ' poolKey,bool zeroForOne,uint128 amountIn,uint128 amountOutMinimum,bytes hookData)';
// UR 2.0 swap structs (without maxHopSlippage)
var SWAP_EXACT_IN_STRUCT_V2_0 = '(address currencyIn,' + PATH_KEY_STRUCT + '[] path,uint128 amountIn,uint128 amountOutMinimum)';
var SWAP_EXACT_OUT_STRUCT_V2_0 = '(address currencyOut,' + PATH_KEY_STRUCT + '[] path,uint128 amountOut,uint128 amountInMaximum)';
// UR 2.1 swap structs (with maxHopSlippage)
var SWAP_EXACT_IN_STRUCT_V2_1 = '(address currencyIn,' + PATH_KEY_STRUCT + '[] path,uint256[] maxHopSlippage,uint128 amountIn,uint128 amountOutMinimum)';
var SWAP_EXACT_OUT_SINGLE_STRUCT = '(' + POOL_KEY_STRUCT + ' poolKey,bool zeroForOne,uint128 amountOut,uint128 amountInMaximum,bytes hookData)';
var SWAP_EXACT_OUT_STRUCT_V2_1 = '(address currencyOut,' + PATH_KEY_STRUCT + '[] path,uint256[] maxHopSlippage,uint128 amountOut,uint128 amountInMaximum)';
// V4_BASE_ACTIONS_ABI_DEFINITION uses V2.0 structs (default, without maxHopSlippage)
var SWAP_EXACT_IN_STRUCT = SWAP_EXACT_IN_STRUCT_V2_0;
var SWAP_EXACT_OUT_STRUCT = SWAP_EXACT_OUT_STRUCT_V2_0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var V4_BASE_ACTIONS_ABI_DEFINITION = (_V4_BASE_ACTIONS_ABI_ = {}, _V4_BASE_ACTIONS_ABI_[exports.Actions.INCREASE_LIQUIDITY] = [{
  name: 'tokenId',
  type: 'uint256'
}, {
  name: 'liquidity',
  type: 'uint256'
}, {
  name: 'amount0Max',
  type: 'uint128'
}, {
  name: 'amount1Max',
  type: 'uint128'
}, {
  name: 'hookData',
  type: 'bytes'
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.DECREASE_LIQUIDITY] = [{
  name: 'tokenId',
  type: 'uint256'
}, {
  name: 'liquidity',
  type: 'uint256'
}, {
  name: 'amount0Min',
  type: 'uint128'
}, {
  name: 'amount1Min',
  type: 'uint128'
}, {
  name: 'hookData',
  type: 'bytes'
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.MINT_POSITION] = [{
  name: 'poolKey',
  type: POOL_KEY_STRUCT,
  subparser: exports.Subparser.PoolKey
}, {
  name: 'tickLower',
  type: 'int24'
}, {
  name: 'tickUpper',
  type: 'int24'
}, {
  name: 'liquidity',
  type: 'uint256'
}, {
  name: 'amount0Max',
  type: 'uint128'
}, {
  name: 'amount1Max',
  type: 'uint128'
}, {
  name: 'owner',
  type: 'address'
}, {
  name: 'hookData',
  type: 'bytes'
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.BURN_POSITION] = [{
  name: 'tokenId',
  type: 'uint256'
}, {
  name: 'amount0Min',
  type: 'uint128'
}, {
  name: 'amount1Min',
  type: 'uint128'
}, {
  name: 'hookData',
  type: 'bytes'
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.SWAP_EXACT_IN_SINGLE] = [{
  name: 'swap',
  type: SWAP_EXACT_IN_SINGLE_STRUCT,
  subparser: exports.Subparser.V4SwapExactInSingle
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.SWAP_EXACT_IN] = [{
  name: 'swap',
  type: SWAP_EXACT_IN_STRUCT,
  subparser: exports.Subparser.V4SwapExactIn
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.SWAP_EXACT_OUT_SINGLE] = [{
  name: 'swap',
  type: SWAP_EXACT_OUT_SINGLE_STRUCT,
  subparser: exports.Subparser.V4SwapExactOutSingle
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.SWAP_EXACT_OUT] = [{
  name: 'swap',
  type: SWAP_EXACT_OUT_STRUCT,
  subparser: exports.Subparser.V4SwapExactOut
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.SETTLE] = [{
  name: 'currency',
  type: 'address'
}, {
  name: 'amount',
  type: 'uint256'
}, {
  name: 'payerIsUser',
  type: 'bool'
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.SETTLE_ALL] = [{
  name: 'currency',
  type: 'address'
}, {
  name: 'maxAmount',
  type: 'uint256'
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.SETTLE_PAIR] = [{
  name: 'currency0',
  type: 'address'
}, {
  name: 'currency1',
  type: 'address'
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.TAKE] = [{
  name: 'currency',
  type: 'address'
}, {
  name: 'recipient',
  type: 'address'
}, {
  name: 'amount',
  type: 'uint256'
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.TAKE_ALL] = [{
  name: 'currency',
  type: 'address'
}, {
  name: 'minAmount',
  type: 'uint256'
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.TAKE_PORTION] = [{
  name: 'currency',
  type: 'address'
}, {
  name: 'recipient',
  type: 'address'
}, {
  name: 'bips',
  type: 'uint256'
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.TAKE_PAIR] = [{
  name: 'currency0',
  type: 'address'
}, {
  name: 'currency1',
  type: 'address'
}, {
  name: 'recipient',
  type: 'address'
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.CLOSE_CURRENCY] = [{
  name: 'currency',
  type: 'address'
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.SWEEP] = [{
  name: 'currency',
  type: 'address'
}, {
  name: 'recipient',
  type: 'address'
}], _V4_BASE_ACTIONS_ABI_[exports.Actions.UNWRAP] = [{
  name: 'amount',
  type: 'uint256'
}], _V4_BASE_ACTIONS_ABI_);
// UR 2.1 specific ABI definitions for swap actions (with maxHopSlippage)
var V4_SWAP_ACTIONS_V2_1 = (_V4_SWAP_ACTIONS_V2_ = {}, _V4_SWAP_ACTIONS_V2_[exports.Actions.SWAP_EXACT_IN] = [{
  name: 'swap',
  type: SWAP_EXACT_IN_STRUCT_V2_1,
  subparser: exports.Subparser.V4SwapExactIn
}], _V4_SWAP_ACTIONS_V2_[exports.Actions.SWAP_EXACT_OUT] = [{
  name: 'swap',
  type: SWAP_EXACT_OUT_STRUCT_V2_1,
  subparser: exports.Subparser.V4SwapExactOut
}], _V4_SWAP_ACTIONS_V2_);
var FULL_DELTA_AMOUNT = 0;
var V4Planner = /*#__PURE__*/function () {
  function V4Planner() {
    this.actions = EMPTY_BYTES;
    this.params = [];
  }
  var _proto = V4Planner.prototype;
  _proto.addAction = function addAction(type, parameters, urVersion) {
    if (urVersion === void 0) {
      urVersion = exports.URVersion.V2_0;
    }
    var command = createAction(type, parameters, urVersion);
    this.params.push(command.encodedInput);
    this.actions = this.actions.concat(command.action.toString(16).padStart(2, '0'));
    return this;
  };
  _proto.addTrade = function addTrade(trade, slippageTolerance, maxHopSlippage, urVersion) {
    if (urVersion === void 0) {
      urVersion = exports.URVersion.V2_0;
    }
    var exactOutput = trade.tradeType === sdkCore.TradeType.EXACT_OUTPUT;
    // exactInput we sometimes perform aggregated slippage checks, but not with exactOutput
    if (exactOutput) !!!slippageTolerance ?  invariant(false, 'ExactOut requires slippageTolerance')  : void 0;
    !(trade.swaps.length === 1) ?  invariant(false, 'Only accepts Trades with 1 swap (must break swaps into individual trades)')  : void 0;
    var actionType = exactOutput ? exports.Actions.SWAP_EXACT_OUT : exports.Actions.SWAP_EXACT_IN;
    var currencyIn = currencyAddress(trade.route.pathInput);
    var currencyOut = currencyAddress(trade.route.pathOutput);
    // Build the swap struct based on UR version
    if (urVersion === exports.URVersion.V2_1) {
      // UR 2.1: includes maxHopSlippage field
      var maxHopSlippageArray = maxHopSlippage != null ? maxHopSlippage : [];
      this.addSwapAction(actionType, [exactOutput ? {
        currencyOut: currencyOut,
        path: encodeRouteToPath(trade.route, exactOutput),
        maxHopSlippage: maxHopSlippageArray,
        amountOut: trade.outputAmount.quotient.toString(),
        amountInMaximum: trade.maximumAmountIn(slippageTolerance != null ? slippageTolerance : new sdkCore.Percent(0)).quotient.toString()
      } : {
        currencyIn: currencyIn,
        path: encodeRouteToPath(trade.route, exactOutput),
        maxHopSlippage: maxHopSlippageArray,
        amountIn: trade.inputAmount.quotient.toString(),
        amountOutMinimum: slippageTolerance ? trade.minimumAmountOut(slippageTolerance).quotient.toString() : 0
      }], urVersion);
    } else {
      // UR 2.0: no maxHopSlippage field (default for backwards compatibility)
      this.addSwapAction(actionType, [exactOutput ? {
        currencyOut: currencyOut,
        path: encodeRouteToPath(trade.route, exactOutput),
        amountOut: trade.outputAmount.quotient.toString(),
        amountInMaximum: trade.maximumAmountIn(slippageTolerance != null ? slippageTolerance : new sdkCore.Percent(0)).quotient.toString()
      } : {
        currencyIn: currencyIn,
        path: encodeRouteToPath(trade.route, exactOutput),
        amountIn: trade.inputAmount.quotient.toString(),
        amountOutMinimum: slippageTolerance ? trade.minimumAmountOut(slippageTolerance).quotient.toString() : 0
      }], urVersion);
    }
    return this;
  };
  _proto.addSettle = function addSettle(currency, payerIsUser, amount) {
    this.addAction(exports.Actions.SETTLE, [currencyAddress(currency), amount != null ? amount : FULL_DELTA_AMOUNT, payerIsUser]);
    return this;
  };
  _proto.addTake = function addTake(currency, recipient, amount) {
    var takeAmount = amount != null ? amount : FULL_DELTA_AMOUNT;
    this.addAction(exports.Actions.TAKE, [currencyAddress(currency), recipient, takeAmount]);
    return this;
  };
  _proto.addUnwrap = function addUnwrap(amount) {
    this.addAction(exports.Actions.UNWRAP, [amount]);
    return this;
  };
  _proto.finalize = function finalize() {
    return utils.defaultAbiCoder.encode(['bytes', 'bytes[]'], [this.actions, this.params]);
  };
  _proto.addSwapAction = function addSwapAction(type, parameters, urVersion) {
    // Use V2.1 ABI (with maxHopSlippage) for V2.1, otherwise default to V2.0 ABI (without maxHopSlippage)
    var abiDef = urVersion === exports.URVersion.V2_1 ? V4_SWAP_ACTIONS_V2_1[type] : V4_BASE_ACTIONS_ABI_DEFINITION[type];
    var encodedInput = utils.defaultAbiCoder.encode(abiDef.map(function (v) {
      return v.type;
    }), parameters);
    this.params.push(encodedInput);
    this.actions = this.actions.concat(type.toString(16).padStart(2, '0'));
    return this;
  };
  return V4Planner;
}();
function currencyAddress(currency) {
  return currency.isNative ? ADDRESS_ZERO : currency.wrapped.address;
}
function createAction(action, parameters, urVersion) {
  if (urVersion === void 0) {
    urVersion = exports.URVersion.V2_0;
  }
  // Use V2.1 ABI for swap actions if V2.1, otherwise use base ABI (V2.0)
  var isSwapAction = action === exports.Actions.SWAP_EXACT_IN || action === exports.Actions.SWAP_EXACT_OUT;
  var abiDef = urVersion === exports.URVersion.V2_1 && isSwapAction ? V4_SWAP_ACTIONS_V2_1[action] : V4_BASE_ACTIONS_ABI_DEFINITION[action];
  var encodedInput = utils.defaultAbiCoder.encode(abiDef.map(function (v) {
    return v.type;
  }), parameters);
  return {
    action: action,
    encodedInput: encodedInput
  };
}

// Uniswap v4 supports native pools. Those currencies are represented by the zero address.
// TODO: Figure out if this is how we should be handling weird edge case tokens like CELO/Polygon/etc..
// Does interface treat those like ERC20 tokens or NATIVE tokens?
function toAddress(currency) {
  if (currency.isNative) return ADDRESS_ZERO;else return currency.wrapped.address;
}

// A wrapper around V4Planner to help handle PositionManager actions
var V4PositionPlanner = /*#__PURE__*/function (_V4Planner) {
  function V4PositionPlanner() {
    return _V4Planner.apply(this, arguments) || this;
  }
  _inheritsLoose(V4PositionPlanner, _V4Planner);
  var _proto = V4PositionPlanner.prototype;
  // MINT_POSITION
  _proto.addMint = function addMint(pool, tickLower, tickUpper, liquidity, amount0Max, amount1Max, owner, hookData) {
    if (hookData === void 0) {
      hookData = EMPTY_BYTES;
    }
    var inputs = [Pool.getPoolKey(pool.currency0, pool.currency1, pool.fee, pool.tickSpacing, pool.hooks), tickLower, tickUpper, liquidity.toString(), amount0Max.toString(), amount1Max.toString(), owner, hookData];
    this.addAction(exports.Actions.MINT_POSITION, inputs);
  }
  // INCREASE_LIQUIDITY
  ;
  _proto.addIncrease = function addIncrease(tokenId, liquidity, amount0Max, amount1Max, hookData) {
    if (hookData === void 0) {
      hookData = EMPTY_BYTES;
    }
    var inputs = [tokenId.toString(), liquidity.toString(), amount0Max.toString(), amount1Max.toString(), hookData];
    this.addAction(exports.Actions.INCREASE_LIQUIDITY, inputs);
  }
  // DECREASE_LIQUIDITY
  ;
  _proto.addDecrease = function addDecrease(tokenId, liquidity, amount0Min, amount1Min, hookData) {
    if (hookData === void 0) {
      hookData = EMPTY_BYTES;
    }
    var inputs = [tokenId.toString(), liquidity.toString(), amount0Min.toString(), amount1Min.toString(), hookData];
    this.addAction(exports.Actions.DECREASE_LIQUIDITY, inputs);
  }
  // BURN_POSITION
  ;
  _proto.addBurn = function addBurn(tokenId, amount0Min, amount1Min, hookData) {
    if (hookData === void 0) {
      hookData = EMPTY_BYTES;
    }
    var inputs = [tokenId.toString(), amount0Min.toString(), amount1Min.toString(), hookData];
    this.addAction(exports.Actions.BURN_POSITION, inputs);
  }
  // SETTLE_PAIR
  ;
  _proto.addSettlePair = function addSettlePair(currency0, currency1) {
    var inputs = [toAddress(currency0), toAddress(currency1)];
    this.addAction(exports.Actions.SETTLE_PAIR, inputs);
  }
  // TAKE_PAIR
  ;
  _proto.addTakePair = function addTakePair(currency0, currency1, recipient) {
    var inputs = [toAddress(currency0), toAddress(currency1), recipient];
    this.addAction(exports.Actions.TAKE_PAIR, inputs);
  }
  // SWEEP
  ;
  _proto.addSweep = function addSweep(currency, to) {
    var inputs = [toAddress(currency), to];
    this.addAction(exports.Actions.SWEEP, inputs);
  };
  return V4PositionPlanner;
}(V4Planner);

/**
 * Converts a big int to a hex string
 * @param bigintIsh
 * @returns The hex encoded calldata
 */
function toHex(bigintIsh) {
  var bigInt = JSBI.BigInt(bigintIsh);
  var hex = bigInt.toString(16);
  if (hex.length % 2 !== 0) {
    hex = "0" + hex;
  }
  return "0x" + hex;
}

// Parses V4Router actions
var V4BaseActionsParser = /*#__PURE__*/function () {
  function V4BaseActionsParser() {}
  V4BaseActionsParser.parseCalldata = function parseCalldata(calldata, urVersion) {
    if (urVersion === void 0) {
      urVersion = exports.URVersion.V2_0;
    }
    var _ethers$utils$default = ethers.ethers.utils.defaultAbiCoder.decode(['bytes', 'bytes[]'], calldata),
      actions = _ethers$utils$default[0],
      inputs = _ethers$utils$default[1];
    var actionTypes = V4BaseActionsParser.getActions(actions);
    return {
      actions: actionTypes.map(function (actionType, i) {
        // Use V2.1 ABI for swap actions if V2.1, otherwise use base ABI (V2.0)
        var isSwapAction = actionType === exports.Actions.SWAP_EXACT_IN || actionType === exports.Actions.SWAP_EXACT_OUT;
        var abiDef = urVersion === exports.URVersion.V2_1 && isSwapAction ? V4_SWAP_ACTIONS_V2_1[actionType] : V4_BASE_ACTIONS_ABI_DEFINITION[actionType];
        var rawParams = ethers.ethers.utils.defaultAbiCoder.decode(abiDef.map(function (command) {
          return command.type;
        }), inputs[i]);
        var params = rawParams.map(function (param, j) {
          switch (abiDef[j].subparser) {
            case exports.Subparser.V4SwapExactInSingle:
              return {
                name: abiDef[j].name,
                value: parseV4ExactInSingle(param)
              };
            case exports.Subparser.V4SwapExactIn:
              return {
                name: abiDef[j].name,
                value: parseV4ExactIn(param, urVersion)
              };
            case exports.Subparser.V4SwapExactOutSingle:
              return {
                name: abiDef[j].name,
                value: parseV4ExactOutSingle(param)
              };
            case exports.Subparser.V4SwapExactOut:
              return {
                name: abiDef[j].name,
                value: parseV4ExactOut(param, urVersion)
              };
            case exports.Subparser.PoolKey:
              return {
                name: abiDef[j].name,
                value: parsePoolKey(param)
              };
            default:
              return {
                name: abiDef[j].name,
                value: param
              };
          }
        });
        return {
          actionName: exports.Actions[actionType],
          actionType: actionType,
          params: params
        };
      })
    };
  }
  // parse command types from bytes string
  ;
  V4BaseActionsParser.getActions = function getActions(actions) {
    var actionTypes = [];
    for (var i = 2; i < actions.length; i += 2) {
      var _byte = actions.substring(i, i + 2);
      actionTypes.push(parseInt(_byte, 16));
    }
    return actionTypes;
  };
  return V4BaseActionsParser;
}();
function parsePoolKey(data) {
  var currency0 = data[0],
    currency1 = data[1],
    fee = data[2],
    tickSpacing = data[3],
    hooks = data[4];
  return {
    currency0: currency0,
    currency1: currency1,
    fee: parseInt(fee),
    tickSpacing: parseInt(tickSpacing),
    hooks: hooks
  };
}
function parsePathKey(data) {
  var intermediateCurrency = data[0],
    fee = data[1],
    tickSpacing = data[2],
    hooks = data[3],
    hookData = data[4];
  return {
    intermediateCurrency: intermediateCurrency,
    fee: parseInt(fee),
    tickSpacing: parseInt(tickSpacing),
    hooks: hooks,
    hookData: hookData
  };
}
function parseV4ExactInSingle(data) {
  var poolKey = data[0],
    zeroForOne = data[1],
    amountIn = data[2],
    amountOutMinimum = data[3],
    hookData = data[4];
  var currency0 = poolKey[0],
    currency1 = poolKey[1],
    fee = poolKey[2],
    tickSpacing = poolKey[3],
    hooks = poolKey[4];
  return {
    poolKey: {
      currency0: currency0,
      currency1: currency1,
      fee: fee,
      tickSpacing: tickSpacing,
      hooks: hooks
    },
    zeroForOne: zeroForOne,
    amountIn: amountIn,
    amountOutMinimum: amountOutMinimum,
    hookData: hookData
  };
}
function parseV4ExactIn(data, urVersion) {
  var paths = data[1].map(function (pathKey) {
    return parsePathKey(pathKey);
  });
  if (urVersion === exports.URVersion.V2_1) {
    // V2.1: [currencyIn, path, maxHopSlippage, amountIn, amountOutMinimum]
    var currencyIn = data[0],
      maxHopSlippage = data[2],
      amountIn = data[3],
      amountOutMinimum = data[4];
    return {
      currencyIn: currencyIn,
      path: paths,
      maxHopSlippage: maxHopSlippage,
      amountIn: amountIn,
      amountOutMinimum: amountOutMinimum
    };
  } else {
    // V2.0: [currencyIn, path, amountIn, amountOutMinimum]
    var _currencyIn = data[0],
      _amountIn = data[2],
      _amountOutMinimum = data[3];
    return {
      currencyIn: _currencyIn,
      path: paths,
      amountIn: _amountIn,
      amountOutMinimum: _amountOutMinimum
    };
  }
}
function parseV4ExactOutSingle(data) {
  var poolKey = data[0],
    zeroForOne = data[1],
    amountOut = data[2],
    amountInMaximum = data[3],
    hookData = data[4];
  var currency0 = poolKey.currency0,
    currency1 = poolKey.currency1,
    fee = poolKey.fee,
    tickSpacing = poolKey.tickSpacing,
    hooks = poolKey.hooks;
  return {
    poolKey: {
      currency0: currency0,
      currency1: currency1,
      fee: fee,
      tickSpacing: tickSpacing,
      hooks: hooks
    },
    zeroForOne: zeroForOne,
    amountOut: amountOut,
    amountInMaximum: amountInMaximum,
    hookData: hookData
  };
}
function parseV4ExactOut(data, urVersion) {
  var paths = data[1].map(function (pathKey) {
    return parsePathKey(pathKey);
  });
  if (urVersion === exports.URVersion.V2_1) {
    // V2.1: [currencyOut, path, maxHopSlippage, amountOut, amountInMaximum]
    var currencyOut = data[0],
      maxHopSlippage = data[2],
      amountOut = data[3],
      amountInMaximum = data[4];
    return {
      currencyOut: currencyOut,
      path: paths,
      maxHopSlippage: maxHopSlippage,
      amountOut: amountOut,
      amountInMaximum: amountInMaximum
    };
  } else {
    // V2.0: [currencyOut, path, amountOut, amountInMaximum]
    var _currencyOut = data[0],
      _amountOut = data[2],
      _amountInMaximum = data[3];
    return {
      currencyOut: _currencyOut,
      path: paths,
      amountOut: _amountOut,
      amountInMaximum: _amountInMaximum
    };
  }
}

// Shared Action Constants used in the v4 Router and v4 position manager
var MSG_SENDER = '0x0000000000000000000000000000000000000001';

var Multicall = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function Multicall() {}
  Multicall.encodeMulticall = function encodeMulticall(calldataList) {
    if (!Array.isArray(calldataList)) {
      calldataList = [calldataList];
    }
    return calldataList.length === 1 ? calldataList[0] : Multicall.INTERFACE.encodeFunctionData('multicall', [calldataList]);
  };
  Multicall.decodeMulticall = function decodeMulticall(encodedCalldata) {
    return Multicall.INTERFACE.decodeFunctionData('multicall', encodedCalldata)[0];
  };
  return Multicall;
}();
Multicall.INTERFACE = /*#__PURE__*/new abi.Interface(IMulticall.abi);

// TODO: import this from npm
var positionManagerAbi = [{
  type: 'constructor',
  inputs: [{
    name: '_poolManager',
    type: 'address',
    internalType: 'contract IPoolManager'
  }, {
    name: '_permit2',
    type: 'address',
    internalType: 'contract IAllowanceTransfer'
  }, {
    name: '_unsubscribeGasLimit',
    type: 'uint256',
    internalType: 'uint256'
  }, {
    name: '_tokenDescriptor',
    type: 'address',
    internalType: 'contract IPositionDescriptor'
  }, {
    name: '_weth9',
    type: 'address',
    internalType: 'contract IWETH9'
  }],
  stateMutability: 'nonpayable'
}, {
  type: 'receive',
  stateMutability: 'payable'
}, {
  type: 'function',
  name: 'DOMAIN_SEPARATOR',
  inputs: [],
  outputs: [{
    name: '',
    type: 'bytes32',
    internalType: 'bytes32'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'WETH9',
  inputs: [],
  outputs: [{
    name: '',
    type: 'address',
    internalType: 'contract IWETH9'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'approve',
  inputs: [{
    name: 'spender',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'id',
    type: 'uint256',
    internalType: 'uint256'
  }],
  outputs: [],
  stateMutability: 'nonpayable'
}, {
  type: 'function',
  name: 'balanceOf',
  inputs: [{
    name: 'owner',
    type: 'address',
    internalType: 'address'
  }],
  outputs: [{
    name: '',
    type: 'uint256',
    internalType: 'uint256'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'getApproved',
  inputs: [{
    name: '',
    type: 'uint256',
    internalType: 'uint256'
  }],
  outputs: [{
    name: '',
    type: 'address',
    internalType: 'address'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'getPoolAndPositionInfo',
  inputs: [{
    name: 'tokenId',
    type: 'uint256',
    internalType: 'uint256'
  }],
  outputs: [{
    name: 'poolKey',
    type: 'tuple',
    internalType: 'struct PoolKey',
    components: [{
      name: 'currency0',
      type: 'address',
      internalType: 'Currency'
    }, {
      name: 'currency1',
      type: 'address',
      internalType: 'Currency'
    }, {
      name: 'fee',
      type: 'uint24',
      internalType: 'uint24'
    }, {
      name: 'tickSpacing',
      type: 'int24',
      internalType: 'int24'
    }, {
      name: 'hooks',
      type: 'address',
      internalType: 'contract IHooks'
    }]
  }, {
    name: 'info',
    type: 'uint256',
    internalType: 'PositionInfo'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'getPositionLiquidity',
  inputs: [{
    name: 'tokenId',
    type: 'uint256',
    internalType: 'uint256'
  }],
  outputs: [{
    name: 'liquidity',
    type: 'uint128',
    internalType: 'uint128'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'initializePool',
  inputs: [{
    name: 'key',
    type: 'tuple',
    internalType: 'struct PoolKey',
    components: [{
      name: 'currency0',
      type: 'address',
      internalType: 'Currency'
    }, {
      name: 'currency1',
      type: 'address',
      internalType: 'Currency'
    }, {
      name: 'fee',
      type: 'uint24',
      internalType: 'uint24'
    }, {
      name: 'tickSpacing',
      type: 'int24',
      internalType: 'int24'
    }, {
      name: 'hooks',
      type: 'address',
      internalType: 'contract IHooks'
    }]
  }, {
    name: 'sqrtPriceX96',
    type: 'uint160',
    internalType: 'uint160'
  }],
  outputs: [{
    name: '',
    type: 'int24',
    internalType: 'int24'
  }],
  stateMutability: 'payable'
}, {
  type: 'function',
  name: 'isApprovedForAll',
  inputs: [{
    name: '',
    type: 'address',
    internalType: 'address'
  }, {
    name: '',
    type: 'address',
    internalType: 'address'
  }],
  outputs: [{
    name: '',
    type: 'bool',
    internalType: 'bool'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'modifyLiquidities',
  inputs: [{
    name: 'unlockData',
    type: 'bytes',
    internalType: 'bytes'
  }, {
    name: 'deadline',
    type: 'uint256',
    internalType: 'uint256'
  }],
  outputs: [],
  stateMutability: 'payable'
}, {
  type: 'function',
  name: 'modifyLiquiditiesWithoutUnlock',
  inputs: [{
    name: 'actions',
    type: 'bytes',
    internalType: 'bytes'
  }, {
    name: 'params',
    type: 'bytes[]',
    internalType: 'bytes[]'
  }],
  outputs: [],
  stateMutability: 'payable'
}, {
  type: 'function',
  name: 'msgSender',
  inputs: [],
  outputs: [{
    name: '',
    type: 'address',
    internalType: 'address'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'multicall',
  inputs: [{
    name: 'data',
    type: 'bytes[]',
    internalType: 'bytes[]'
  }],
  outputs: [{
    name: 'results',
    type: 'bytes[]',
    internalType: 'bytes[]'
  }],
  stateMutability: 'payable'
}, {
  type: 'function',
  name: 'name',
  inputs: [],
  outputs: [{
    name: '',
    type: 'string',
    internalType: 'string'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'nextTokenId',
  inputs: [],
  outputs: [{
    name: '',
    type: 'uint256',
    internalType: 'uint256'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'nonces',
  inputs: [{
    name: 'owner',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'word',
    type: 'uint256',
    internalType: 'uint256'
  }],
  outputs: [{
    name: 'bitmap',
    type: 'uint256',
    internalType: 'uint256'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'ownerOf',
  inputs: [{
    name: 'id',
    type: 'uint256',
    internalType: 'uint256'
  }],
  outputs: [{
    name: 'owner',
    type: 'address',
    internalType: 'address'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'permit',
  inputs: [{
    name: 'spender',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'tokenId',
    type: 'uint256',
    internalType: 'uint256'
  }, {
    name: 'deadline',
    type: 'uint256',
    internalType: 'uint256'
  }, {
    name: 'nonce',
    type: 'uint256',
    internalType: 'uint256'
  }, {
    name: 'signature',
    type: 'bytes',
    internalType: 'bytes'
  }],
  outputs: [],
  stateMutability: 'payable'
}, {
  type: 'function',
  name: 'permit',
  inputs: [{
    name: 'owner',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'permitSingle',
    type: 'tuple',
    internalType: 'struct IAllowanceTransfer.PermitSingle',
    components: [{
      name: 'details',
      type: 'tuple',
      internalType: 'struct IAllowanceTransfer.PermitDetails',
      components: [{
        name: 'token',
        type: 'address',
        internalType: 'address'
      }, {
        name: 'amount',
        type: 'uint160',
        internalType: 'uint160'
      }, {
        name: 'expiration',
        type: 'uint48',
        internalType: 'uint48'
      }, {
        name: 'nonce',
        type: 'uint48',
        internalType: 'uint48'
      }]
    }, {
      name: 'spender',
      type: 'address',
      internalType: 'address'
    }, {
      name: 'sigDeadline',
      type: 'uint256',
      internalType: 'uint256'
    }]
  }, {
    name: 'signature',
    type: 'bytes',
    internalType: 'bytes'
  }],
  outputs: [{
    name: 'err',
    type: 'bytes',
    internalType: 'bytes'
  }],
  stateMutability: 'payable'
}, {
  type: 'function',
  name: 'permit2',
  inputs: [],
  outputs: [{
    name: '',
    type: 'address',
    internalType: 'contract IAllowanceTransfer'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'permitBatch',
  inputs: [{
    name: 'owner',
    type: 'address',
    internalType: 'address'
  }, {
    name: '_permitBatch',
    type: 'tuple',
    internalType: 'struct IAllowanceTransfer.PermitBatch',
    components: [{
      name: 'details',
      type: 'tuple[]',
      internalType: 'struct IAllowanceTransfer.PermitDetails[]',
      components: [{
        name: 'token',
        type: 'address',
        internalType: 'address'
      }, {
        name: 'amount',
        type: 'uint160',
        internalType: 'uint160'
      }, {
        name: 'expiration',
        type: 'uint48',
        internalType: 'uint48'
      }, {
        name: 'nonce',
        type: 'uint48',
        internalType: 'uint48'
      }]
    }, {
      name: 'spender',
      type: 'address',
      internalType: 'address'
    }, {
      name: 'sigDeadline',
      type: 'uint256',
      internalType: 'uint256'
    }]
  }, {
    name: 'signature',
    type: 'bytes',
    internalType: 'bytes'
  }],
  outputs: [{
    name: 'err',
    type: 'bytes',
    internalType: 'bytes'
  }],
  stateMutability: 'payable'
}, {
  type: 'function',
  name: 'permitForAll',
  inputs: [{
    name: 'owner',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'operator',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'approved',
    type: 'bool',
    internalType: 'bool'
  }, {
    name: 'deadline',
    type: 'uint256',
    internalType: 'uint256'
  }, {
    name: 'nonce',
    type: 'uint256',
    internalType: 'uint256'
  }, {
    name: 'signature',
    type: 'bytes',
    internalType: 'bytes'
  }],
  outputs: [],
  stateMutability: 'payable'
}, {
  type: 'function',
  name: 'poolKeys',
  inputs: [{
    name: 'poolId',
    type: 'bytes25',
    internalType: 'bytes25'
  }],
  outputs: [{
    name: 'currency0',
    type: 'address',
    internalType: 'Currency'
  }, {
    name: 'currency1',
    type: 'address',
    internalType: 'Currency'
  }, {
    name: 'fee',
    type: 'uint24',
    internalType: 'uint24'
  }, {
    name: 'tickSpacing',
    type: 'int24',
    internalType: 'int24'
  }, {
    name: 'hooks',
    type: 'address',
    internalType: 'contract IHooks'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'poolManager',
  inputs: [],
  outputs: [{
    name: '',
    type: 'address',
    internalType: 'contract IPoolManager'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'positionInfo',
  inputs: [{
    name: 'tokenId',
    type: 'uint256',
    internalType: 'uint256'
  }],
  outputs: [{
    name: 'info',
    type: 'uint256',
    internalType: 'PositionInfo'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'revokeNonce',
  inputs: [{
    name: 'nonce',
    type: 'uint256',
    internalType: 'uint256'
  }],
  outputs: [],
  stateMutability: 'payable'
}, {
  type: 'function',
  name: 'safeTransferFrom',
  inputs: [{
    name: 'from',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'to',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'id',
    type: 'uint256',
    internalType: 'uint256'
  }],
  outputs: [],
  stateMutability: 'nonpayable'
}, {
  type: 'function',
  name: 'safeTransferFrom',
  inputs: [{
    name: 'from',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'to',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'id',
    type: 'uint256',
    internalType: 'uint256'
  }, {
    name: 'data',
    type: 'bytes',
    internalType: 'bytes'
  }],
  outputs: [],
  stateMutability: 'nonpayable'
}, {
  type: 'function',
  name: 'setApprovalForAll',
  inputs: [{
    name: 'operator',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'approved',
    type: 'bool',
    internalType: 'bool'
  }],
  outputs: [],
  stateMutability: 'nonpayable'
}, {
  type: 'function',
  name: 'subscribe',
  inputs: [{
    name: 'tokenId',
    type: 'uint256',
    internalType: 'uint256'
  }, {
    name: 'newSubscriber',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'data',
    type: 'bytes',
    internalType: 'bytes'
  }],
  outputs: [],
  stateMutability: 'payable'
}, {
  type: 'function',
  name: 'subscriber',
  inputs: [{
    name: 'tokenId',
    type: 'uint256',
    internalType: 'uint256'
  }],
  outputs: [{
    name: 'subscriber',
    type: 'address',
    internalType: 'contract ISubscriber'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'supportsInterface',
  inputs: [{
    name: 'interfaceId',
    type: 'bytes4',
    internalType: 'bytes4'
  }],
  outputs: [{
    name: '',
    type: 'bool',
    internalType: 'bool'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'symbol',
  inputs: [],
  outputs: [{
    name: '',
    type: 'string',
    internalType: 'string'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'tokenDescriptor',
  inputs: [],
  outputs: [{
    name: '',
    type: 'address',
    internalType: 'contract IPositionDescriptor'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'tokenURI',
  inputs: [{
    name: 'tokenId',
    type: 'uint256',
    internalType: 'uint256'
  }],
  outputs: [{
    name: '',
    type: 'string',
    internalType: 'string'
  }],
  stateMutability: 'view'
}, {
  type: 'function',
  name: 'transferFrom',
  inputs: [{
    name: 'from',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'to',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'id',
    type: 'uint256',
    internalType: 'uint256'
  }],
  outputs: [],
  stateMutability: 'nonpayable'
}, {
  type: 'function',
  name: 'unlockCallback',
  inputs: [{
    name: 'data',
    type: 'bytes',
    internalType: 'bytes'
  }],
  outputs: [{
    name: '',
    type: 'bytes',
    internalType: 'bytes'
  }],
  stateMutability: 'nonpayable'
}, {
  type: 'function',
  name: 'unsubscribe',
  inputs: [{
    name: 'tokenId',
    type: 'uint256',
    internalType: 'uint256'
  }],
  outputs: [],
  stateMutability: 'payable'
}, {
  type: 'function',
  name: 'unsubscribeGasLimit',
  inputs: [],
  outputs: [{
    name: '',
    type: 'uint256',
    internalType: 'uint256'
  }],
  stateMutability: 'view'
}, {
  type: 'event',
  name: 'Approval',
  inputs: [{
    name: 'owner',
    type: 'address',
    indexed: true,
    internalType: 'address'
  }, {
    name: 'spender',
    type: 'address',
    indexed: true,
    internalType: 'address'
  }, {
    name: 'id',
    type: 'uint256',
    indexed: true,
    internalType: 'uint256'
  }],
  anonymous: false
}, {
  type: 'event',
  name: 'ApprovalForAll',
  inputs: [{
    name: 'owner',
    type: 'address',
    indexed: true,
    internalType: 'address'
  }, {
    name: 'operator',
    type: 'address',
    indexed: true,
    internalType: 'address'
  }, {
    name: 'approved',
    type: 'bool',
    indexed: false,
    internalType: 'bool'
  }],
  anonymous: false
}, {
  type: 'event',
  name: 'Subscription',
  inputs: [{
    name: 'tokenId',
    type: 'uint256',
    indexed: true,
    internalType: 'uint256'
  }, {
    name: 'subscriber',
    type: 'address',
    indexed: true,
    internalType: 'address'
  }],
  anonymous: false
}, {
  type: 'event',
  name: 'Transfer',
  inputs: [{
    name: 'from',
    type: 'address',
    indexed: true,
    internalType: 'address'
  }, {
    name: 'to',
    type: 'address',
    indexed: true,
    internalType: 'address'
  }, {
    name: 'id',
    type: 'uint256',
    indexed: true,
    internalType: 'uint256'
  }],
  anonymous: false
}, {
  type: 'event',
  name: 'Unsubscription',
  inputs: [{
    name: 'tokenId',
    type: 'uint256',
    indexed: true,
    internalType: 'uint256'
  }, {
    name: 'subscriber',
    type: 'address',
    indexed: true,
    internalType: 'address'
  }],
  anonymous: false
}, {
  type: 'error',
  name: 'AlreadySubscribed',
  inputs: [{
    name: 'tokenId',
    type: 'uint256',
    internalType: 'uint256'
  }, {
    name: 'subscriber',
    type: 'address',
    internalType: 'address'
  }]
}, {
  type: 'error',
  name: 'BurnNotificationReverted',
  inputs: [{
    name: 'subscriber',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'reason',
    type: 'bytes',
    internalType: 'bytes'
  }]
}, {
  type: 'error',
  name: 'ContractLocked',
  inputs: []
}, {
  type: 'error',
  name: 'DeadlinePassed',
  inputs: [{
    name: 'deadline',
    type: 'uint256',
    internalType: 'uint256'
  }]
}, {
  type: 'error',
  name: 'DeltaNotNegative',
  inputs: [{
    name: 'currency',
    type: 'address',
    internalType: 'Currency'
  }]
}, {
  type: 'error',
  name: 'DeltaNotPositive',
  inputs: [{
    name: 'currency',
    type: 'address',
    internalType: 'Currency'
  }]
}, {
  type: 'error',
  name: 'GasLimitTooLow',
  inputs: []
}, {
  type: 'error',
  name: 'InputLengthMismatch',
  inputs: []
}, {
  type: 'error',
  name: 'InsufficientBalance',
  inputs: []
}, {
  type: 'error',
  name: 'InvalidContractSignature',
  inputs: []
}, {
  type: 'error',
  name: 'InvalidEthSender',
  inputs: []
}, {
  type: 'error',
  name: 'InvalidSignature',
  inputs: []
}, {
  type: 'error',
  name: 'InvalidSignatureLength',
  inputs: []
}, {
  type: 'error',
  name: 'InvalidSigner',
  inputs: []
}, {
  type: 'error',
  name: 'MaximumAmountExceeded',
  inputs: [{
    name: 'maximumAmount',
    type: 'uint128',
    internalType: 'uint128'
  }, {
    name: 'amountRequested',
    type: 'uint128',
    internalType: 'uint128'
  }]
}, {
  type: 'error',
  name: 'MinimumAmountInsufficient',
  inputs: [{
    name: 'minimumAmount',
    type: 'uint128',
    internalType: 'uint128'
  }, {
    name: 'amountReceived',
    type: 'uint128',
    internalType: 'uint128'
  }]
}, {
  type: 'error',
  name: 'ModifyLiquidityNotificationReverted',
  inputs: [{
    name: 'subscriber',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'reason',
    type: 'bytes',
    internalType: 'bytes'
  }]
}, {
  type: 'error',
  name: 'NoCodeSubscriber',
  inputs: []
}, {
  type: 'error',
  name: 'NoSelfPermit',
  inputs: []
}, {
  type: 'error',
  name: 'NonceAlreadyUsed',
  inputs: []
}, {
  type: 'error',
  name: 'NotApproved',
  inputs: [{
    name: 'caller',
    type: 'address',
    internalType: 'address'
  }]
}, {
  type: 'error',
  name: 'NotPoolManager',
  inputs: []
}, {
  type: 'error',
  name: 'NotSubscribed',
  inputs: []
}, {
  type: 'error',
  name: 'PoolManagerMustBeLocked',
  inputs: []
}, {
  type: 'error',
  name: 'SignatureDeadlineExpired',
  inputs: []
}, {
  type: 'error',
  name: 'SubscriptionReverted',
  inputs: [{
    name: 'subscriber',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'reason',
    type: 'bytes',
    internalType: 'bytes'
  }]
}, {
  type: 'error',
  name: 'TransferNotificationReverted',
  inputs: [{
    name: 'subscriber',
    type: 'address',
    internalType: 'address'
  }, {
    name: 'reason',
    type: 'bytes',
    internalType: 'bytes'
  }]
}, {
  type: 'error',
  name: 'Unauthorized',
  inputs: []
}, {
  type: 'error',
  name: 'UnsupportedAction',
  inputs: [{
    name: 'action',
    type: 'uint256',
    internalType: 'uint256'
  }]
}];

var NFT_PERMIT_TYPES = {
  Permit: [{
    name: 'spender',
    type: 'address'
  }, {
    name: 'tokenId',
    type: 'uint256'
  }, {
    name: 'nonce',
    type: 'uint256'
  }, {
    name: 'deadline',
    type: 'uint256'
  }]
};
// type guard
function isMint(options) {
  return Object.keys(options).some(function (k) {
    return k === 'recipient';
  });
}
function shouldCreatePool(options) {
  if (options.createPool) {
    !(options.sqrtPriceX96 !== undefined) ?  invariant(false, NO_SQRT_PRICE)  : void 0;
    return true;
  }
  return false;
}
var V4PositionManager = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function V4PositionManager() {}
  /**
   * Public methods to encode method parameters for different actions on the PositionManager contract
   */
  V4PositionManager.createCallParameters = function createCallParameters(poolKey, sqrtPriceX96) {
    return {
      calldata: this.encodeInitializePool(poolKey, sqrtPriceX96),
      value: toHex(0)
    };
  };
  V4PositionManager.addCallParameters = function addCallParameters(position, options) {
    /**
     * Cases:
     * - if pool does not exist yet, encode initializePool
     * then,
     * - if is mint, encode MINT_POSITION. If migrating, encode a SETTLE and SWEEP for both currencies. Else, encode a SETTLE_PAIR. If on a NATIVE pool, encode a SWEEP.
     * - else, encode INCREASE_LIQUIDITY and SETTLE_PAIR. If it is on a NATIVE pool, encode a SWEEP.
     */
    !JSBI.greaterThan(position.liquidity, ZERO) ?  invariant(false, ZERO_LIQUIDITY)  : void 0;
    var calldataList = [];
    var planner = new V4PositionPlanner();
    // Encode initialize pool.
    if (isMint(options) && shouldCreatePool(options)) {
      // No planner used here because initializePool is not supported as an Action
      calldataList.push(V4PositionManager.encodeInitializePool(position.pool.poolKey, options.sqrtPriceX96));
    }
    // position.pool.currency0 is native if and only if options.useNative is set
    !(position.pool.currency0 === options.useNative || !position.pool.currency0.isNative && options.useNative === undefined) ?  invariant(false, NATIVE_NOT_SET)  : void 0;
    // adjust for slippage
    var maximumAmounts = position.mintAmountsWithSlippage(options.slippageTolerance);
    var amount0Max = toHex(maximumAmounts.amount0);
    var amount1Max = toHex(maximumAmounts.amount1);
    // We use permit2 to approve tokens to the position manager
    if (options.batchPermit) {
      calldataList.push(V4PositionManager.encodePermitBatch(options.batchPermit.owner, options.batchPermit.permitBatch, options.batchPermit.signature));
    }
    // mint
    if (isMint(options)) {
      var recipient = sdkCore.validateAndParseAddress(options.recipient);
      planner.addMint(position.pool, position.tickLower, position.tickUpper, position.liquidity, amount0Max, amount1Max, recipient, options.hookData);
    } else {
      // increase
      planner.addIncrease(options.tokenId, position.liquidity, amount0Max, amount1Max, options.hookData);
    }
    var value = toHex(0);
    // If migrating, we need to settle and sweep both currencies individually
    if (isMint(options) && options.migrate) {
      if (options.useNative) {
        // unwrap the exact amount needed to send to the pool manager
        planner.addUnwrap(OPEN_DELTA);
        // payer is v4 position manager
        planner.addSettle(position.pool.currency0, false);
        planner.addSettle(position.pool.currency1, false);
        // sweep any leftover wrapped native that was not unwrapped
        // recipient will be same as the v4 lp token recipient
        planner.addSweep(position.pool.currency0.wrapped, options.recipient);
        planner.addSweep(position.pool.currency1, options.recipient);
      } else {
        // payer is v4 position manager
        planner.addSettle(position.pool.currency0, false);
        planner.addSettle(position.pool.currency1, false);
        // recipient will be same as the v4 lp token recipient
        planner.addSweep(position.pool.currency0, options.recipient);
        planner.addSweep(position.pool.currency1, options.recipient);
      }
    } else {
      // need to settle both currencies when minting / adding liquidity (user is the payer)
      planner.addSettlePair(position.pool.currency0, position.pool.currency1);
      // When not migrating and adding native currency, add a final sweep
      if (options.useNative) {
        // Any sweeping must happen after the settling.
        // native currency will always be currency0 in v4
        value = toHex(amount0Max);
        planner.addSweep(position.pool.currency0, MSG_SENDER);
      }
    }
    calldataList.push(V4PositionManager.encodeModifyLiquidities(planner.finalize(), options.deadline));
    return {
      calldata: Multicall.encodeMulticall(calldataList),
      value: value
    };
  }
  /**
   * Produces the calldata for completely or partially exiting a position
   * @param position The position to exit
   * @param options Additional information necessary for generating the calldata
   * @returns The call parameters
   */;
  V4PositionManager.removeCallParameters = function removeCallParameters(position, options) {
    /**
     * cases:
     * - if liquidityPercentage is 100%, encode BURN_POSITION and then TAKE_PAIR
     * - else, encode DECREASE_LIQUIDITY and then TAKE_PAIR
     */
    var calldataList = [];
    var planner = new V4PositionPlanner();
    var tokenId = toHex(options.tokenId);
    if (options.burnToken) {
      // if burnToken is true, the specified liquidity percentage must be 100%
      !options.liquidityPercentage.equalTo(ONE) ?  invariant(false, CANNOT_BURN)  : void 0;
      // if there is a permit, encode the ERC721Permit permit call
      if (options.permit) {
        calldataList.push(V4PositionManager.encodeERC721Permit(options.permit.spender, options.permit.tokenId, options.permit.deadline, options.permit.nonce, options.permit.signature));
      }
      // slippage-adjusted amounts derived from current position liquidity
      var _position$burnAmounts = position.burnAmountsWithSlippage(options.slippageTolerance),
        amount0Min = _position$burnAmounts.amount0,
        amount1Min = _position$burnAmounts.amount1;
      planner.addBurn(tokenId, amount0Min, amount1Min, options.hookData);
    } else {
      var _options$hookData;
      // construct a partial position with a percentage of liquidity
      var partialPosition = new Position({
        pool: position.pool,
        liquidity: options.liquidityPercentage.multiply(position.liquidity).quotient,
        tickLower: position.tickLower,
        tickUpper: position.tickUpper
      });
      // If the partial position has liquidity=0, this is a collect call and collectCallParameters should be used
      !JSBI.greaterThan(partialPosition.liquidity, ZERO) ?  invariant(false, ZERO_LIQUIDITY)  : void 0;
      // slippage-adjusted underlying amounts
      var _partialPosition$burn = partialPosition.burnAmountsWithSlippage(options.slippageTolerance),
        _amount0Min = _partialPosition$burn.amount0,
        _amount1Min = _partialPosition$burn.amount1;
      planner.addDecrease(tokenId, partialPosition.liquidity.toString(), _amount0Min.toString(), _amount1Min.toString(), (_options$hookData = options.hookData) != null ? _options$hookData : EMPTY_BYTES);
    }
    planner.addTakePair(position.pool.currency0, position.pool.currency1, MSG_SENDER);
    calldataList.push(V4PositionManager.encodeModifyLiquidities(planner.finalize(), options.deadline));
    return {
      calldata: Multicall.encodeMulticall(calldataList),
      value: toHex(0)
    };
  }
  /**
   * Produces the calldata for collecting fees from a position
   * @param position The position to collect fees from
   * @param options Additional information necessary for generating the calldata
   * @returns The call parameters
   */;
  V4PositionManager.collectCallParameters = function collectCallParameters(position, options) {
    var calldataList = [];
    var planner = new V4PositionPlanner();
    var tokenId = toHex(options.tokenId);
    var recipient = sdkCore.validateAndParseAddress(options.recipient);
    /**
     * To collect fees in V4, we need to:
     * - encode a decrease liquidity by 0
     * - and encode a TAKE_PAIR
     */
    planner.addDecrease(tokenId, '0', '0', '0', options.hookData);
    planner.addTakePair(position.pool.currency0, position.pool.currency1, recipient);
    calldataList.push(V4PositionManager.encodeModifyLiquidities(planner.finalize(), options.deadline));
    return {
      calldata: Multicall.encodeMulticall(calldataList),
      value: toHex(0)
    };
  }
  // Initialize a pool
  ;
  V4PositionManager.encodeInitializePool = function encodeInitializePool(poolKey, sqrtPriceX96) {
    return V4PositionManager.INTERFACE.encodeFunctionData(PositionFunctions.INITIALIZE_POOL, [poolKey, sqrtPriceX96.toString()]);
  }
  // Encode a modify liquidities call
  ;
  V4PositionManager.encodeModifyLiquidities = function encodeModifyLiquidities(unlockData, deadline) {
    return V4PositionManager.INTERFACE.encodeFunctionData(PositionFunctions.MODIFY_LIQUIDITIES, [unlockData, deadline]);
  }
  // Encode a permit batch call
  ;
  V4PositionManager.encodePermitBatch = function encodePermitBatch(owner, permitBatch, signature) {
    return V4PositionManager.INTERFACE.encodeFunctionData(PositionFunctions.PERMIT_BATCH, [owner, permitBatch, signature]);
  }
  // Encode a ERC721Permit permit call
  ;
  V4PositionManager.encodeERC721Permit = function encodeERC721Permit(spender, tokenId, deadline, nonce, signature) {
    return V4PositionManager.INTERFACE.encodeFunctionData(PositionFunctions.ERC721PERMIT_PERMIT, [spender, tokenId, deadline, nonce, signature]);
  }
  // Prepare the params for an EIP712 signTypedData request
  ;
  V4PositionManager.getPermitData = function getPermitData(permit, positionManagerAddress, chainId) {
    return {
      domain: {
        name: 'Uniswap V4 Positions NFT',
        chainId: chainId,
        verifyingContract: positionManagerAddress
      },
      types: NFT_PERMIT_TYPES,
      values: permit
    };
  };
  return V4PositionManager;
}();
V4PositionManager.INTERFACE = /*#__PURE__*/new abi.Interface(positionManagerAbi);

exports.DYNAMIC_FEE_FLAG = DYNAMIC_FEE_FLAG;
exports.Hook = Hook;
exports.Pool = Pool;
exports.Position = Position;
exports.Route = Route;
exports.Trade = Trade;
exports.V4BaseActionsParser = V4BaseActionsParser;
exports.V4Planner = V4Planner;
exports.V4PositionManager = V4PositionManager;
exports.V4PositionPlanner = V4PositionPlanner;
exports.V4_BASE_ACTIONS_ABI_DEFINITION = V4_BASE_ACTIONS_ABI_DEFINITION;
exports.V4_SWAP_ACTIONS_V2_1 = V4_SWAP_ACTIONS_V2_1;
exports.amountWithPathCurrency = amountWithPathCurrency;
exports.encodeRouteToPath = encodeRouteToPath;
exports.getPathCurrency = getPathCurrency;
exports.hookFlagIndex = hookFlagIndex;
exports.priceToClosestTick = priceToClosestTick;
exports.sortsBefore = sortsBefore;
exports.tickToPrice = tickToPrice;
exports.toAddress = toAddress;
exports.toHex = toHex;
exports.tradeComparator = tradeComparator;
//# sourceMappingURL=v4-sdk.cjs.development.js.map
