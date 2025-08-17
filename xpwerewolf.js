(function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
    new MutationObserver(i => {
        for (const o of i)
            if (o.type === "childList")
                for (const l of o.addedNodes) l.tagName === "LINK" && l.rel === "modulepreload" && r(l)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function n(i) {
        const o = {};
        return i.integrity && (o.integrity = i.integrity), i.referrerPolicy && (o.referrerPolicy = i.referrerPolicy), i.crossOrigin === "use-credentials" ? o.credentials = "include" : i.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o
    }

    function r(i) {
        if (i.ep) return;
        i.ep = !0;
        const o = n(i);
        fetch(i.href, o)
    }
})();

function xp(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var xd = {
        exports: {}
    },
    sl = {},
    kd = {
        exports: {}
    },
    Z = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pi = Symbol.for("react.element"),
    kp = Symbol.for("react.portal"),
    Sp = Symbol.for("react.fragment"),
    Ep = Symbol.for("react.strict_mode"),
    _p = Symbol.for("react.profiler"),
    Cp = Symbol.for("react.provider"),
    Np = Symbol.for("react.context"),
    Rp = Symbol.for("react.forward_ref"),
    Pp = Symbol.for("react.suspense"),
    Lp = Symbol.for("react.memo"),
    Tp = Symbol.for("react.lazy"),
    Du = Symbol.iterator;

function jp(e) {
    return e === null || typeof e != "object" ? null : (e = Du && e[Du] || e["@@iterator"], typeof e == "function" ? e : null)
}
var Sd = {
        isMounted: function() {
            return !1
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
    },
    Ed = Object.assign,
    _d = {};

function Pr(e, t, n) {
    this.props = e, this.context = t, this.refs = _d, this.updater = n || Sd
}
Pr.prototype.isReactComponent = {};
Pr.prototype.setState = function(e, t) {
    if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, e, t, "setState")
};
Pr.prototype.forceUpdate = function(e) {
    this.updater.enqueueForceUpdate(this, e, "forceUpdate")
};

function Cd() {}
Cd.prototype = Pr.prototype;

function ma(e, t, n) {
    this.props = e, this.context = t, this.refs = _d, this.updater = n || Sd
}
var ya = ma.prototype = new Cd;
ya.constructor = ma;
Ed(ya, Pr.prototype);
ya.isPureReactComponent = !0;
var Mu = Array.isArray,
    Nd = Object.prototype.hasOwnProperty,
    ga = {
        current: null
    },
    Rd = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };

function Pd(e, t, n) {
    var r, i = {},
        o = null,
        l = null;
    if (t != null)
        for (r in t.ref !== void 0 && (l = t.ref), t.key !== void 0 && (o = "" + t.key), t) Nd.call(t, r) && !Rd.hasOwnProperty(r) && (i[r] = t[r]);
    var s = arguments.length - 2;
    if (s === 1) i.children = n;
    else if (1 < s) {
        for (var a = Array(s), u = 0; u < s; u++) a[u] = arguments[u + 2];
        i.children = a
    }
    if (e && e.defaultProps)
        for (r in s = e.defaultProps, s) i[r] === void 0 && (i[r] = s[r]);
    return {
        $$typeof: Pi,
        type: e,
        key: o,
        ref: l,
        props: i,
        _owner: ga.current
    }
}

function Op(e, t) {
    return {
        $$typeof: Pi,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner
    }
}

function va(e) {
    return typeof e == "object" && e !== null && e.$$typeof === Pi
}

function Dp(e) {
    var t = {
        "=": "=0",
        ":": "=2"
    };
    return "$" + e.replace(/[=:]/g, function(n) {
        return t[n]
    })
}
var bu = /\/+/g;

function Dl(e, t) {
    return typeof e == "object" && e !== null && e.key != null ? Dp("" + e.key) : t.toString(36)
}

function po(e, t, n, r, i) {
    var o = typeof e;
    (o === "undefined" || o === "boolean") && (e = null);
    var l = !1;
    if (e === null) l = !0;
    else switch (o) {
        case "string":
        case "number":
            l = !0;
            break;
        case "object":
            switch (e.$$typeof) {
                case Pi:
                case kp:
                    l = !0
            }
    }
    if (l) return l = e, i = i(l), e = r === "" ? "." + Dl(l, 0) : r, Mu(i) ? (n = "", e != null && (n = e.replace(bu, "$&/") + "/"), po(i, t, n, "", function(u) {
        return u
    })) : i != null && (va(i) && (i = Op(i, n + (!i.key || l && l.key === i.key ? "" : ("" + i.key).replace(bu, "$&/") + "/") + e)), t.push(i)), 1;
    if (l = 0, r = r === "" ? "." : r + ":", Mu(e))
        for (var s = 0; s < e.length; s++) {
            o = e[s];
            var a = r + Dl(o, s);
            l += po(o, t, n, a, i)
        } else if (a = jp(e), typeof a == "function")
            for (e = a.call(e), s = 0; !(o = e.next()).done;) o = o.value, a = r + Dl(o, s++), l += po(o, t, n, a, i);
        else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
    return l
}

function Wi(e, t, n) {
    if (e == null) return e;
    var r = [],
        i = 0;
    return po(e, r, "", "", function(o) {
        return t.call(n, o, i++)
    }), r
}

function Mp(e) {
    if (e._status === -1) {
        var t = e._result;
        t = t(), t.then(function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n)
        }, function(n) {
            (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n)
        }), e._status === -1 && (e._status = 0, e._result = t)
    }
    if (e._status === 1) return e._result.default;
    throw e._result
}
var Je = {
        current: null
    },
    mo = {
        transition: null
    },
    bp = {
        ReactCurrentDispatcher: Je,
        ReactCurrentBatchConfig: mo,
        ReactCurrentOwner: ga
    };

function Ld() {
    throw Error("act(...) is not supported in production builds of React.")
}
Z.Children = {
    map: Wi,
    forEach: function(e, t, n) {
        Wi(e, function() {
            t.apply(this, arguments)
        }, n)
    },
    count: function(e) {
        var t = 0;
        return Wi(e, function() {
            t++
        }), t
    },
    toArray: function(e) {
        return Wi(e, function(t) {
            return t
        }) || []
    },
    only: function(e) {
        if (!va(e)) throw Error("React.Children.only expected to receive a single React element child.");
        return e
    }
};
Z.Component = Pr;
Z.Fragment = Sp;
Z.Profiler = _p;
Z.PureComponent = ma;
Z.StrictMode = Ep;
Z.Suspense = Pp;
Z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = bp;
Z.act = Ld;
Z.cloneElement = function(e, t, n) {
    if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
    var r = Ed({}, e.props),
        i = e.key,
        o = e.ref,
        l = e._owner;
    if (t != null) {
        if (t.ref !== void 0 && (o = t.ref, l = ga.current), t.key !== void 0 && (i = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
        for (a in t) Nd.call(t, a) && !Rd.hasOwnProperty(a) && (r[a] = t[a] === void 0 && s !== void 0 ? s[a] : t[a])
    }
    var a = arguments.length - 2;
    if (a === 1) r.children = n;
    else if (1 < a) {
        s = Array(a);
        for (var u = 0; u < a; u++) s[u] = arguments[u + 2];
        r.children = s
    }
    return {
        $$typeof: Pi,
        type: e.type,
        key: i,
        ref: o,
        props: r,
        _owner: l
    }
};
Z.createContext = function(e) {
    return e = {
        $$typeof: Np,
        _currentValue: e,
        _currentValue2: e,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null
    }, e.Provider = {
        $$typeof: Cp,
        _context: e
    }, e.Consumer = e
};
Z.createElement = Pd;
Z.createFactory = function(e) {
    var t = Pd.bind(null, e);
    return t.type = e, t
};
Z.createRef = function() {
    return {
        current: null
    }
};
Z.forwardRef = function(e) {
    return {
        $$typeof: Rp,
        render: e
    }
};
Z.isValidElement = va;
Z.lazy = function(e) {
    return {
        $$typeof: Tp,
        _payload: {
            _status: -1,
            _result: e
        },
        _init: Mp
    }
};
Z.memo = function(e, t) {
    return {
        $$typeof: Lp,
        type: e,
        compare: t === void 0 ? null : t
    }
};
Z.startTransition = function(e) {
    var t = mo.transition;
    mo.transition = {};
    try {
        e()
    } finally {
        mo.transition = t
    }
};
Z.unstable_act = Ld;
Z.useCallback = function(e, t) {
    return Je.current.useCallback(e, t)
};
Z.useContext = function(e) {
    return Je.current.useContext(e)
};
Z.useDebugValue = function() {};
Z.useDeferredValue = function(e) {
    return Je.current.useDeferredValue(e)
};
Z.useEffect = function(e, t) {
    return Je.current.useEffect(e, t)
};
Z.useId = function() {
    return Je.current.useId()
};
Z.useImperativeHandle = function(e, t, n) {
    return Je.current.useImperativeHandle(e, t, n)
};
Z.useInsertionEffect = function(e, t) {
    return Je.current.useInsertionEffect(e, t)
};
Z.useLayoutEffect = function(e, t) {
    return Je.current.useLayoutEffect(e, t)
};
Z.useMemo = function(e, t) {
    return Je.current.useMemo(e, t)
};
Z.useReducer = function(e, t, n) {
    return Je.current.useReducer(e, t, n)
};
Z.useRef = function(e) {
    return Je.current.useRef(e)
};
Z.useState = function(e) {
    return Je.current.useState(e)
};
Z.useSyncExternalStore = function(e, t, n) {
    return Je.current.useSyncExternalStore(e, t, n)
};
Z.useTransition = function() {
    return Je.current.useTransition()
};
Z.version = "18.3.1";
kd.exports = Z;
var x = kd.exports;
const hr = xp(x);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ap = x,
    zp = Symbol.for("react.element"),
    Fp = Symbol.for("react.fragment"),
    Ip = Object.prototype.hasOwnProperty,
    Up = Ap.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    Bp = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
    };

function Td(e, t, n) {
    var r, i = {},
        o = null,
        l = null;
    n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (l = t.ref);
    for (r in t) Ip.call(t, r) && !Bp.hasOwnProperty(r) && (i[r] = t[r]);
    if (e && e.defaultProps)
        for (r in t = e.defaultProps, t) i[r] === void 0 && (i[r] = t[r]);
    return {
        $$typeof: zp,
        type: e,
        key: o,
        ref: l,
        props: i,
        _owner: Up.current
    }
}
sl.Fragment = Fp;
sl.jsx = Td;
sl.jsxs = Td;
xd.exports = sl;
var f = xd.exports,
    hs = {},
    jd = {
        exports: {}
    },
    dt = {},
    Od = {
        exports: {}
    },
    Dd = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
    function t(T, I) {
        var B = T.length;
        T.push(I);
        e: for (; 0 < B;) {
            var W = B - 1 >>> 1,
                Q = T[W];
            if (0 < i(Q, I)) T[W] = I, T[B] = Q, B = W;
            else break e
        }
    }

    function n(T) {
        return T.length === 0 ? null : T[0]
    }

    function r(T) {
        if (T.length === 0) return null;
        var I = T[0],
            B = T.pop();
        if (B !== I) {
            T[0] = B;
            e: for (var W = 0, Q = T.length, ue = Q >>> 1; W < ue;) {
                var J = 2 * (W + 1) - 1,
                    ce = T[J],
                    Me = J + 1,
                    ht = T[Me];
                if (0 > i(ce, B)) Me < Q && 0 > i(ht, ce) ? (T[W] = ht, T[Me] = B, W = Me) : (T[W] = ce, T[J] = B, W = J);
                else if (Me < Q && 0 > i(ht, B)) T[W] = ht, T[Me] = B, W = Me;
                else break e
            }
        }
        return I
    }

    function i(T, I) {
        var B = T.sortIndex - I.sortIndex;
        return B !== 0 ? B : T.id - I.id
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
        var o = performance;
        e.unstable_now = function() {
            return o.now()
        }
    } else {
        var l = Date,
            s = l.now();
        e.unstable_now = function() {
            return l.now() - s
        }
    }
    var a = [],
        u = [],
        h = 1,
        m = null,
        p = 3,
        w = !1,
        S = !1,
        E = !1,
        N = typeof setTimeout == "function" ? setTimeout : null,
        c = typeof clearTimeout == "function" ? clearTimeout : null,
        d = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);

    function y(T) {
        for (var I = n(u); I !== null;) {
            if (I.callback === null) r(u);
            else if (I.startTime <= T) r(u), I.sortIndex = I.expirationTime, t(a, I);
            else break;
            I = n(u)
        }
    }

    function C(T) {
        if (E = !1, y(T), !S)
            if (n(a) !== null) S = !0, le(g);
            else {
                var I = n(u);
                I !== null && Se(C, I.startTime - T)
            }
    }

    function g(T, I) {
        S = !1, E && (E = !1, c(j), j = -1), w = !0;
        var B = p;
        try {
            for (y(I), m = n(a); m !== null && (!(m.expirationTime > I) || T && !Y());) {
                var W = m.callback;
                if (typeof W == "function") {
                    m.callback = null, p = m.priorityLevel;
                    var Q = W(m.expirationTime <= I);
                    I = e.unstable_now(), typeof Q == "function" ? m.callback = Q : m === n(a) && r(a), y(I)
                } else r(a);
                m = n(a)
            }
            if (m !== null) var ue = !0;
            else {
                var J = n(u);
                J !== null && Se(C, J.startTime - I), ue = !1
            }
            return ue
        } finally {
            m = null, p = B, w = !1
        }
    }
    var R = !1,
        D = null,
        j = -1,
        V = 5,
        L = -1;

    function Y() {
        return !(e.unstable_now() - L < V)
    }

    function H() {
        if (D !== null) {
            var T = e.unstable_now();
            L = T;
            var I = !0;
            try {
                I = D(!0, T)
            } finally {
                I ? ee() : (R = !1, D = null)
            }
        } else R = !1
    }
    var ee;
    if (typeof d == "function") ee = function() {
        d(H)
    };
    else if (typeof MessageChannel < "u") {
        var oe = new MessageChannel,
            te = oe.port2;
        oe.port1.onmessage = H, ee = function() {
            te.postMessage(null)
        }
    } else ee = function() {
        N(H, 0)
    };

    function le(T) {
        D = T, R || (R = !0, ee())
    }

    function Se(T, I) {
        j = N(function() {
            T(e.unstable_now())
        }, I)
    }
    e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(T) {
        T.callback = null
    }, e.unstable_continueExecution = function() {
        S || w || (S = !0, le(g))
    }, e.unstable_forceFrameRate = function(T) {
        0 > T || 125 < T ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : V = 0 < T ? Math.floor(1e3 / T) : 5
    }, e.unstable_getCurrentPriorityLevel = function() {
        return p
    }, e.unstable_getFirstCallbackNode = function() {
        return n(a)
    }, e.unstable_next = function(T) {
        switch (p) {
            case 1:
            case 2:
            case 3:
                var I = 3;
                break;
            default:
                I = p
        }
        var B = p;
        p = I;
        try {
            return T()
        } finally {
            p = B
        }
    }, e.unstable_pauseExecution = function() {}, e.unstable_requestPaint = function() {}, e.unstable_runWithPriority = function(T, I) {
        switch (T) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                T = 3
        }
        var B = p;
        p = T;
        try {
            return I()
        } finally {
            p = B
        }
    }, e.unstable_scheduleCallback = function(T, I, B) {
        var W = e.unstable_now();
        switch (typeof B == "object" && B !== null ? (B = B.delay, B = typeof B == "number" && 0 < B ? W + B : W) : B = W, T) {
            case 1:
                var Q = -1;
                break;
            case 2:
                Q = 250;
                break;
            case 5:
                Q = 1073741823;
                break;
            case 4:
                Q = 1e4;
                break;
            default:
                Q = 5e3
        }
        return Q = B + Q, T = {
            id: h++,
            callback: I,
            priorityLevel: T,
            startTime: B,
            expirationTime: Q,
            sortIndex: -1
        }, B > W ? (T.sortIndex = B, t(u, T), n(a) === null && T === n(u) && (E ? (c(j), j = -1) : E = !0, Se(C, B - W))) : (T.sortIndex = Q, t(a, T), S || w || (S = !0, le(g))), T
    }, e.unstable_shouldYield = Y, e.unstable_wrapCallback = function(T) {
        var I = p;
        return function() {
            var B = p;
            p = I;
            try {
                return T.apply(this, arguments)
            } finally {
                p = B
            }
        }
    }
})(Dd);
Od.exports = Dd;
var $p = Od.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vp = x,
    ct = $p;

function O(e) {
    for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
}
var Md = new Set,
    ci = {};

function Qn(e, t) {
    kr(e, t), kr(e + "Capture", t)
}

function kr(e, t) {
    for (ci[e] = t, e = 0; e < t.length; e++) Md.add(t[e])
}
var Jt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
    ps = Object.prototype.hasOwnProperty,
    Hp = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    Au = {},
    zu = {};

function Wp(e) {
    return ps.call(zu, e) ? !0 : ps.call(Au, e) ? !1 : Hp.test(e) ? zu[e] = !0 : (Au[e] = !0, !1)
}

function Kp(e, t, n, r) {
    if (n !== null && n.type === 0) return !1;
    switch (typeof t) {
        case "function":
        case "symbol":
            return !0;
        case "boolean":
            return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
        default:
            return !1
    }
}

function Qp(e, t, n, r) {
    if (t === null || typeof t > "u" || Kp(e, t, n, r)) return !0;
    if (r) return !1;
    if (n !== null) switch (n.type) {
        case 3:
            return !t;
        case 4:
            return t === !1;
        case 5:
            return isNaN(t);
        case 6:
            return isNaN(t) || 1 > t
    }
    return !1
}

function Ze(e, t, n, r, i, o, l) {
    this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = i, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = l
}
var Ve = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
    Ve[e] = new Ze(e, 0, !1, e, null, !1, !1)
});
[
    ["acceptCharset", "accept-charset"],
    ["className", "class"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"]
].forEach(function(e) {
    var t = e[0];
    Ve[t] = new Ze(t, 1, !1, e[1], null, !1, !1)
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    Ve[e] = new Ze(e, 2, !1, e.toLowerCase(), null, !1, !1)
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
    Ve[e] = new Ze(e, 2, !1, e, null, !1, !1)
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
    Ve[e] = new Ze(e, 3, !1, e.toLowerCase(), null, !1, !1)
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
    Ve[e] = new Ze(e, 3, !0, e, null, !1, !1)
});
["capture", "download"].forEach(function(e) {
    Ve[e] = new Ze(e, 4, !1, e, null, !1, !1)
});
["cols", "rows", "size", "span"].forEach(function(e) {
    Ve[e] = new Ze(e, 6, !1, e, null, !1, !1)
});
["rowSpan", "start"].forEach(function(e) {
    Ve[e] = new Ze(e, 5, !1, e.toLowerCase(), null, !1, !1)
});
var wa = /[\-:]([a-z])/g;

function xa(e) {
    return e[1].toUpperCase()
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
    var t = e.replace(wa, xa);
    Ve[t] = new Ze(t, 1, !1, e, null, !1, !1)
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
    var t = e.replace(wa, xa);
    Ve[t] = new Ze(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1)
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
    var t = e.replace(wa, xa);
    Ve[t] = new Ze(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1)
});
["tabIndex", "crossOrigin"].forEach(function(e) {
    Ve[e] = new Ze(e, 1, !1, e.toLowerCase(), null, !1, !1)
});
Ve.xlinkHref = new Ze("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
    Ve[e] = new Ze(e, 1, !1, e.toLowerCase(), null, !0, !0)
});

function ka(e, t, n, r) {
    var i = Ve.hasOwnProperty(t) ? Ve[t] : null;
    (i !== null ? i.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Qp(t, n, i, r) && (n = null), r || i === null ? Wp(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : i.mustUseProperty ? e[i.propertyName] = n === null ? i.type === 3 ? !1 : "" : n : (t = i.attributeName, r = i.attributeNamespace, n === null ? e.removeAttribute(t) : (i = i.type, n = i === 3 || i === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))))
}
var nn = Vp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    Ki = Symbol.for("react.element"),
    tr = Symbol.for("react.portal"),
    nr = Symbol.for("react.fragment"),
    Sa = Symbol.for("react.strict_mode"),
    ms = Symbol.for("react.profiler"),
    bd = Symbol.for("react.provider"),
    Ad = Symbol.for("react.context"),
    Ea = Symbol.for("react.forward_ref"),
    ys = Symbol.for("react.suspense"),
    gs = Symbol.for("react.suspense_list"),
    _a = Symbol.for("react.memo"),
    an = Symbol.for("react.lazy"),
    zd = Symbol.for("react.offscreen"),
    Fu = Symbol.iterator;

function Ar(e) {
    return e === null || typeof e != "object" ? null : (e = Fu && e[Fu] || e["@@iterator"], typeof e == "function" ? e : null)
}
var ke = Object.assign,
    Ml;

function Yr(e) {
    if (Ml === void 0) try {
        throw Error()
    } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Ml = t && t[1] || ""
    }
    return `
` + Ml + e
}
var bl = !1;

function Al(e, t) {
    if (!e || bl) return "";
    bl = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
        if (t)
            if (t = function() {
                    throw Error()
                }, Object.defineProperty(t.prototype, "props", {
                    set: function() {
                        throw Error()
                    }
                }), typeof Reflect == "object" && Reflect.construct) {
                try {
                    Reflect.construct(t, [])
                } catch (u) {
                    var r = u
                }
                Reflect.construct(e, [], t)
            } else {
                try {
                    t.call()
                } catch (u) {
                    r = u
                }
                e.call(t.prototype)
            }
        else {
            try {
                throw Error()
            } catch (u) {
                r = u
            }
            e()
        }
    } catch (u) {
        if (u && r && typeof u.stack == "string") {
            for (var i = u.stack.split(`
`), o = r.stack.split(`
`), l = i.length - 1, s = o.length - 1; 1 <= l && 0 <= s && i[l] !== o[s];) s--;
            for (; 1 <= l && 0 <= s; l--, s--)
                if (i[l] !== o[s]) {
                    if (l !== 1 || s !== 1)
                        do
                            if (l--, s--, 0 > s || i[l] !== o[s]) {
                                var a = `
` + i[l].replace(" at new ", " at ");
                                return e.displayName && a.includes("<anonymous>") && (a = a.replace("<anonymous>", e.displayName)), a
                            } while (1 <= l && 0 <= s);
                    break
                }
        }
    } finally {
        bl = !1, Error.prepareStackTrace = n
    }
    return (e = e ? e.displayName || e.name : "") ? Yr(e) : ""
}

function Xp(e) {
    switch (e.tag) {
        case 5:
            return Yr(e.type);
        case 16:
            return Yr("Lazy");
        case 13:
            return Yr("Suspense");
        case 19:
            return Yr("SuspenseList");
        case 0:
        case 2:
        case 15:
            return e = Al(e.type, !1), e;
        case 11:
            return e = Al(e.type.render, !1), e;
        case 1:
            return e = Al(e.type, !0), e;
        default:
            return ""
    }
}

function vs(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
        case nr:
            return "Fragment";
        case tr:
            return "Portal";
        case ms:
            return "Profiler";
        case Sa:
            return "StrictMode";
        case ys:
            return "Suspense";
        case gs:
            return "SuspenseList"
    }
    if (typeof e == "object") switch (e.$$typeof) {
        case Ad:
            return (e.displayName || "Context") + ".Consumer";
        case bd:
            return (e._context.displayName || "Context") + ".Provider";
        case Ea:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case _a:
            return t = e.displayName || null, t !== null ? t : vs(e.type) || "Memo";
        case an:
            t = e._payload, e = e._init;
            try {
                return vs(e(t))
            } catch {}
    }
    return null
}

function Yp(e) {
    var t = e.type;
    switch (e.tag) {
        case 24:
            return "Cache";
        case 9:
            return (t.displayName || "Context") + ".Consumer";
        case 10:
            return (t._context.displayName || "Context") + ".Provider";
        case 18:
            return "DehydratedFragment";
        case 11:
            return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
            return "Fragment";
        case 5:
            return t;
        case 4:
            return "Portal";
        case 3:
            return "Root";
        case 6:
            return "Text";
        case 16:
            return vs(t);
        case 8:
            return t === Sa ? "StrictMode" : "Mode";
        case 22:
            return "Offscreen";
        case 12:
            return "Profiler";
        case 21:
            return "Scope";
        case 13:
            return "Suspense";
        case 19:
            return "SuspenseList";
        case 25:
            return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
            if (typeof t == "function") return t.displayName || t.name || null;
            if (typeof t == "string") return t
    }
    return null
}

function _n(e) {
    switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
            return e;
        case "object":
            return e;
        default:
            return ""
    }
}

function Fd(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
}

function qp(e) {
    var t = Fd(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = "" + e[t];
    if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var i = n.get,
            o = n.set;
        return Object.defineProperty(e, t, {
            configurable: !0,
            get: function() {
                return i.call(this)
            },
            set: function(l) {
                r = "" + l, o.call(this, l)
            }
        }), Object.defineProperty(e, t, {
            enumerable: n.enumerable
        }), {
            getValue: function() {
                return r
            },
            setValue: function(l) {
                r = "" + l
            },
            stopTracking: function() {
                e._valueTracker = null, delete e[t]
            }
        }
    }
}

function Qi(e) {
    e._valueTracker || (e._valueTracker = qp(e))
}

function Id(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(),
        r = "";
    return e && (r = Fd(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1
}

function Mo(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
        return e.activeElement || e.body
    } catch {
        return e.body
    }
}

function ws(e, t) {
    var n = t.checked;
    return ke({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked
    })
}

function Iu(e, t) {
    var n = t.defaultValue == null ? "" : t.defaultValue,
        r = t.checked != null ? t.checked : t.defaultChecked;
    n = _n(t.value != null ? t.value : n), e._wrapperState = {
        initialChecked: r,
        initialValue: n,
        controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null
    }
}

function Ud(e, t) {
    t = t.checked, t != null && ka(e, "checked", t, !1)
}

function xs(e, t) {
    Ud(e, t);
    var n = _n(t.value),
        r = t.type;
    if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
    else if (r === "submit" || r === "reset") {
        e.removeAttribute("value");
        return
    }
    t.hasOwnProperty("value") ? ks(e, t.type, n) : t.hasOwnProperty("defaultValue") && ks(e, t.type, _n(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked)
}

function Uu(e, t, n) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
        t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t
    }
    n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n)
}

function ks(e, t, n) {
    (t !== "number" || Mo(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n))
}
var qr = Array.isArray;

function pr(e, t, n, r) {
    if (e = e.options, t) {
        t = {};
        for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
        for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0)
    } else {
        for (n = "" + _n(n), t = null, i = 0; i < e.length; i++) {
            if (e[i].value === n) {
                e[i].selected = !0, r && (e[i].defaultSelected = !0);
                return
            }
            t !== null || e[i].disabled || (t = e[i])
        }
        t !== null && (t.selected = !0)
    }
}

function Ss(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(O(91));
    return ke({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue
    })
}

function Bu(e, t) {
    var n = t.value;
    if (n == null) {
        if (n = t.children, t = t.defaultValue, n != null) {
            if (t != null) throw Error(O(92));
            if (qr(n)) {
                if (1 < n.length) throw Error(O(93));
                n = n[0]
            }
            t = n
        }
        t == null && (t = ""), n = t
    }
    e._wrapperState = {
        initialValue: _n(n)
    }
}

function Bd(e, t) {
    var n = _n(t.value),
        r = _n(t.defaultValue);
    n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r)
}

function $u(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t)
}

function $d(e) {
    switch (e) {
        case "svg":
            return "http://www.w3.org/2000/svg";
        case "math":
            return "http://www.w3.org/1998/Math/MathML";
        default:
            return "http://www.w3.org/1999/xhtml"
    }
}

function Es(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml" ? $d(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e
}
var Xi, Vd = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, i) {
        MSApp.execUnsafeLocalFunction(function() {
            return e(t, n, r, i)
        })
    } : e
}(function(e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
    else {
        for (Xi = Xi || document.createElement("div"), Xi.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Xi.firstChild; e.firstChild;) e.removeChild(e.firstChild);
        for (; t.firstChild;) e.appendChild(t.firstChild)
    }
});

function di(e, t) {
    if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
            n.nodeValue = t;
            return
        }
    }
    e.textContent = t
}
var ti = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0
    },
    Gp = ["Webkit", "ms", "Moz", "O"];
Object.keys(ti).forEach(function(e) {
    Gp.forEach(function(t) {
        t = t + e.charAt(0).toUpperCase() + e.substring(1), ti[t] = ti[e]
    })
});

function Hd(e, t, n) {
    return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || ti.hasOwnProperty(e) && ti[e] ? ("" + t).trim() : t + "px"
}

function Wd(e, t) {
    e = e.style;
    for (var n in t)
        if (t.hasOwnProperty(n)) {
            var r = n.indexOf("--") === 0,
                i = Hd(n, t[n], r);
            n === "float" && (n = "cssFloat"), r ? e.setProperty(n, i) : e[n] = i
        }
}
var Jp = ke({
    menuitem: !0
}, {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
});

function _s(e, t) {
    if (t) {
        if (Jp[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(O(137, e));
        if (t.dangerouslySetInnerHTML != null) {
            if (t.children != null) throw Error(O(60));
            if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(O(61))
        }
        if (t.style != null && typeof t.style != "object") throw Error(O(62))
    }
}

function Cs(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
            return !1;
        default:
            return !0
    }
}
var Ns = null;

function Ca(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e
}
var Rs = null,
    mr = null,
    yr = null;

function Vu(e) {
    if (e = ji(e)) {
        if (typeof Rs != "function") throw Error(O(280));
        var t = e.stateNode;
        t && (t = fl(t), Rs(e.stateNode, e.type, t))
    }
}

function Kd(e) {
    mr ? yr ? yr.push(e) : yr = [e] : mr = e
}

function Qd() {
    if (mr) {
        var e = mr,
            t = yr;
        if (yr = mr = null, Vu(e), t)
            for (e = 0; e < t.length; e++) Vu(t[e])
    }
}

function Xd(e, t) {
    return e(t)
}

function Yd() {}
var zl = !1;

function qd(e, t, n) {
    if (zl) return e(t, n);
    zl = !0;
    try {
        return Xd(e, t, n)
    } finally {
        zl = !1, (mr !== null || yr !== null) && (Yd(), Qd())
    }
}

function fi(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var r = fl(n);
    if (r === null) return null;
    n = r[t];
    e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
            (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
            break e;
        default:
            e = !1
    }
    if (e) return null;
    if (n && typeof n != "function") throw Error(O(231, t, typeof n));
    return n
}
var Ps = !1;
if (Jt) try {
    var zr = {};
    Object.defineProperty(zr, "passive", {
        get: function() {
            Ps = !0
        }
    }), window.addEventListener("test", zr, zr), window.removeEventListener("test", zr, zr)
} catch {
    Ps = !1
}

function Zp(e, t, n, r, i, o, l, s, a) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
        t.apply(n, u)
    } catch (h) {
        this.onError(h)
    }
}
var ni = !1,
    bo = null,
    Ao = !1,
    Ls = null,
    em = {
        onError: function(e) {
            ni = !0, bo = e
        }
    };

function tm(e, t, n, r, i, o, l, s, a) {
    ni = !1, bo = null, Zp.apply(em, arguments)
}

function nm(e, t, n, r, i, o, l, s, a) {
    if (tm.apply(this, arguments), ni) {
        if (ni) {
            var u = bo;
            ni = !1, bo = null
        } else throw Error(O(198));
        Ao || (Ao = !0, Ls = u)
    }
}

function Xn(e) {
    var t = e,
        n = e;
    if (e.alternate)
        for (; t.return;) t = t.return;
    else {
        e = t;
        do t = e, t.flags & 4098 && (n = t.return), e = t.return; while (e)
    }
    return t.tag === 3 ? n : null
}

function Gd(e) {
    if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
    }
    return null
}

function Hu(e) {
    if (Xn(e) !== e) throw Error(O(188))
}

function rm(e) {
    var t = e.alternate;
    if (!t) {
        if (t = Xn(e), t === null) throw Error(O(188));
        return t !== e ? null : e
    }
    for (var n = e, r = t;;) {
        var i = n.return;
        if (i === null) break;
        var o = i.alternate;
        if (o === null) {
            if (r = i.return, r !== null) {
                n = r;
                continue
            }
            break
        }
        if (i.child === o.child) {
            for (o = i.child; o;) {
                if (o === n) return Hu(i), e;
                if (o === r) return Hu(i), t;
                o = o.sibling
            }
            throw Error(O(188))
        }
        if (n.return !== r.return) n = i, r = o;
        else {
            for (var l = !1, s = i.child; s;) {
                if (s === n) {
                    l = !0, n = i, r = o;
                    break
                }
                if (s === r) {
                    l = !0, r = i, n = o;
                    break
                }
                s = s.sibling
            }
            if (!l) {
                for (s = o.child; s;) {
                    if (s === n) {
                        l = !0, n = o, r = i;
                        break
                    }
                    if (s === r) {
                        l = !0, r = o, n = i;
                        break
                    }
                    s = s.sibling
                }
                if (!l) throw Error(O(189))
            }
        }
        if (n.alternate !== r) throw Error(O(190))
    }
    if (n.tag !== 3) throw Error(O(188));
    return n.stateNode.current === n ? e : t
}

function Jd(e) {
    return e = rm(e), e !== null ? Zd(e) : null
}

function Zd(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null;) {
        var t = Zd(e);
        if (t !== null) return t;
        e = e.sibling
    }
    return null
}
var ef = ct.unstable_scheduleCallback,
    Wu = ct.unstable_cancelCallback,
    im = ct.unstable_shouldYield,
    om = ct.unstable_requestPaint,
    _e = ct.unstable_now,
    lm = ct.unstable_getCurrentPriorityLevel,
    Na = ct.unstable_ImmediatePriority,
    tf = ct.unstable_UserBlockingPriority,
    zo = ct.unstable_NormalPriority,
    sm = ct.unstable_LowPriority,
    nf = ct.unstable_IdlePriority,
    al = null,
    It = null;

function am(e) {
    if (It && typeof It.onCommitFiberRoot == "function") try {
        It.onCommitFiberRoot(al, e, void 0, (e.current.flags & 128) === 128)
    } catch {}
}
var Lt = Math.clz32 ? Math.clz32 : dm,
    um = Math.log,
    cm = Math.LN2;

function dm(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (um(e) / cm | 0) | 0
}
var Yi = 64,
    qi = 4194304;

function Gr(e) {
    switch (e & -e) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 4:
            return 4;
        case 8:
            return 8;
        case 16:
            return 16;
        case 32:
            return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return e & 130023424;
        case 134217728:
            return 134217728;
        case 268435456:
            return 268435456;
        case 536870912:
            return 536870912;
        case 1073741824:
            return 1073741824;
        default:
            return e
    }
}

function Fo(e, t) {
    var n = e.pendingLanes;
    if (n === 0) return 0;
    var r = 0,
        i = e.suspendedLanes,
        o = e.pingedLanes,
        l = n & 268435455;
    if (l !== 0) {
        var s = l & ~i;
        s !== 0 ? r = Gr(s) : (o &= l, o !== 0 && (r = Gr(o)))
    } else l = n & ~i, l !== 0 ? r = Gr(l) : o !== 0 && (r = Gr(o));
    if (r === 0) return 0;
    if (t !== 0 && t !== r && !(t & i) && (i = r & -r, o = t & -t, i >= o || i === 16 && (o & 4194240) !== 0)) return t;
    if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0)
        for (e = e.entanglements, t &= r; 0 < t;) n = 31 - Lt(t), i = 1 << n, r |= e[n], t &= ~i;
    return r
}

function fm(e, t) {
    switch (e) {
        case 1:
        case 2:
        case 4:
            return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
            return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
            return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
            return -1;
        default:
            return -1
    }
}

function hm(e, t) {
    for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, o = e.pendingLanes; 0 < o;) {
        var l = 31 - Lt(o),
            s = 1 << l,
            a = i[l];
        a === -1 ? (!(s & n) || s & r) && (i[l] = fm(s, t)) : a <= t && (e.expiredLanes |= s), o &= ~s
    }
}

function Ts(e) {
    return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
}

function rf() {
    var e = Yi;
    return Yi <<= 1, !(Yi & 4194240) && (Yi = 64), e
}

function Fl(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t
}

function Li(e, t, n) {
    e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Lt(t), e[t] = n
}

function pm(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
    var r = e.eventTimes;
    for (e = e.expirationTimes; 0 < n;) {
        var i = 31 - Lt(n),
            o = 1 << i;
        t[i] = 0, r[i] = -1, e[i] = -1, n &= ~o
    }
}

function Ra(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n;) {
        var r = 31 - Lt(n),
            i = 1 << r;
        i & t | e[r] & t && (e[r] |= t), n &= ~i
    }
}
var se = 0;

function of (e) {
    return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1
}
var lf, Pa, sf, af, uf, js = !1,
    Gi = [],
    mn = null,
    yn = null,
    gn = null,
    hi = new Map,
    pi = new Map,
    cn = [],
    mm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");

function Ku(e, t) {
    switch (e) {
        case "focusin":
        case "focusout":
            mn = null;
            break;
        case "dragenter":
        case "dragleave":
            yn = null;
            break;
        case "mouseover":
        case "mouseout":
            gn = null;
            break;
        case "pointerover":
        case "pointerout":
            hi.delete(t.pointerId);
            break;
        case "gotpointercapture":
        case "lostpointercapture":
            pi.delete(t.pointerId)
    }
}

function Fr(e, t, n, r, i, o) {
    return e === null || e.nativeEvent !== o ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [i]
    }, t !== null && (t = ji(t), t !== null && Pa(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e)
}

function ym(e, t, n, r, i) {
    switch (t) {
        case "focusin":
            return mn = Fr(mn, e, t, n, r, i), !0;
        case "dragenter":
            return yn = Fr(yn, e, t, n, r, i), !0;
        case "mouseover":
            return gn = Fr(gn, e, t, n, r, i), !0;
        case "pointerover":
            var o = i.pointerId;
            return hi.set(o, Fr(hi.get(o) || null, e, t, n, r, i)), !0;
        case "gotpointercapture":
            return o = i.pointerId, pi.set(o, Fr(pi.get(o) || null, e, t, n, r, i)), !0
    }
    return !1
}

function cf(e) {
    var t = An(e.target);
    if (t !== null) {
        var n = Xn(t);
        if (n !== null) {
            if (t = n.tag, t === 13) {
                if (t = Gd(n), t !== null) {
                    e.blockedOn = t, uf(e.priority, function() {
                        sf(n)
                    });
                    return
                }
            } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
                e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
                return
            }
        }
    }
    e.blockedOn = null
}

function yo(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length;) {
        var n = Os(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
            n = e.nativeEvent;
            var r = new n.constructor(n.type, n);
            Ns = r, n.target.dispatchEvent(r), Ns = null
        } else return t = ji(n), t !== null && Pa(t), e.blockedOn = n, !1;
        t.shift()
    }
    return !0
}

function Qu(e, t, n) {
    yo(e) && n.delete(t)
}

function gm() {
    js = !1, mn !== null && yo(mn) && (mn = null), yn !== null && yo(yn) && (yn = null), gn !== null && yo(gn) && (gn = null), hi.forEach(Qu), pi.forEach(Qu)
}

function Ir(e, t) {
    e.blockedOn === t && (e.blockedOn = null, js || (js = !0, ct.unstable_scheduleCallback(ct.unstable_NormalPriority, gm)))
}

function mi(e) {
    function t(i) {
        return Ir(i, e)
    }
    if (0 < Gi.length) {
        Ir(Gi[0], e);
        for (var n = 1; n < Gi.length; n++) {
            var r = Gi[n];
            r.blockedOn === e && (r.blockedOn = null)
        }
    }
    for (mn !== null && Ir(mn, e), yn !== null && Ir(yn, e), gn !== null && Ir(gn, e), hi.forEach(t), pi.forEach(t), n = 0; n < cn.length; n++) r = cn[n], r.blockedOn === e && (r.blockedOn = null);
    for (; 0 < cn.length && (n = cn[0], n.blockedOn === null);) cf(n), n.blockedOn === null && cn.shift()
}
var gr = nn.ReactCurrentBatchConfig,
    Io = !0;

function vm(e, t, n, r) {
    var i = se,
        o = gr.transition;
    gr.transition = null;
    try {
        se = 1, La(e, t, n, r)
    } finally {
        se = i, gr.transition = o
    }
}

function wm(e, t, n, r) {
    var i = se,
        o = gr.transition;
    gr.transition = null;
    try {
        se = 4, La(e, t, n, r)
    } finally {
        se = i, gr.transition = o
    }
}

function La(e, t, n, r) {
    if (Io) {
        var i = Os(e, t, n, r);
        if (i === null) Xl(e, t, r, Uo, n), Ku(e, r);
        else if (ym(i, e, t, n, r)) r.stopPropagation();
        else if (Ku(e, r), t & 4 && -1 < mm.indexOf(e)) {
            for (; i !== null;) {
                var o = ji(i);
                if (o !== null && lf(o), o = Os(e, t, n, r), o === null && Xl(e, t, r, Uo, n), o === i) break;
                i = o
            }
            i !== null && r.stopPropagation()
        } else Xl(e, t, r, null, n)
    }
}
var Uo = null;

function Os(e, t, n, r) {
    if (Uo = null, e = Ca(r), e = An(e), e !== null)
        if (t = Xn(e), t === null) e = null;
        else if (n = t.tag, n === 13) {
        if (e = Gd(t), e !== null) return e;
        e = null
    } else if (n === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null
    } else t !== e && (e = null);
    return Uo = e, null
}

function df(e) {
    switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
            return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
            return 4;
        case "message":
            switch (lm()) {
                case Na:
                    return 1;
                case tf:
                    return 4;
                case zo:
                case sm:
                    return 16;
                case nf:
                    return 536870912;
                default:
                    return 16
            }
        default:
            return 16
    }
}
var hn = null,
    Ta = null,
    go = null;

function ff() {
    if (go) return go;
    var e, t = Ta,
        n = t.length,
        r, i = "value" in hn ? hn.value : hn.textContent,
        o = i.length;
    for (e = 0; e < n && t[e] === i[e]; e++);
    var l = n - e;
    for (r = 1; r <= l && t[n - r] === i[o - r]; r++);
    return go = i.slice(e, 1 < r ? 1 - r : void 0)
}

function vo(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0
}

function Ji() {
    return !0
}

function Xu() {
    return !1
}

function ft(e) {
    function t(n, r, i, o, l) {
        this._reactName = n, this._targetInst = i, this.type = r, this.nativeEvent = o, this.target = l, this.currentTarget = null;
        for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(o) : o[s]);
        return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Ji : Xu, this.isPropagationStopped = Xu, this
    }
    return ke(t.prototype, {
        preventDefault: function() {
            this.defaultPrevented = !0;
            var n = this.nativeEvent;
            n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Ji)
        },
        stopPropagation: function() {
            var n = this.nativeEvent;
            n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Ji)
        },
        persist: function() {},
        isPersistent: Ji
    }), t
}
var Lr = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(e) {
            return e.timeStamp || Date.now()
        },
        defaultPrevented: 0,
        isTrusted: 0
    },
    ja = ft(Lr),
    Ti = ke({}, Lr, {
        view: 0,
        detail: 0
    }),
    xm = ft(Ti),
    Il, Ul, Ur, ul = ke({}, Ti, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Oa,
        button: 0,
        buttons: 0,
        relatedTarget: function(e) {
            return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
        },
        movementX: function(e) {
            return "movementX" in e ? e.movementX : (e !== Ur && (Ur && e.type === "mousemove" ? (Il = e.screenX - Ur.screenX, Ul = e.screenY - Ur.screenY) : Ul = Il = 0, Ur = e), Il)
        },
        movementY: function(e) {
            return "movementY" in e ? e.movementY : Ul
        }
    }),
    Yu = ft(ul),
    km = ke({}, ul, {
        dataTransfer: 0
    }),
    Sm = ft(km),
    Em = ke({}, Ti, {
        relatedTarget: 0
    }),
    Bl = ft(Em),
    _m = ke({}, Lr, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }),
    Cm = ft(_m),
    Nm = ke({}, Lr, {
        clipboardData: function(e) {
            return "clipboardData" in e ? e.clipboardData : window.clipboardData
        }
    }),
    Rm = ft(Nm),
    Pm = ke({}, Lr, {
        data: 0
    }),
    qu = ft(Pm),
    Lm = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
    },
    Tm = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
    },
    jm = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
    };

function Om(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = jm[e]) ? !!t[e] : !1
}

function Oa() {
    return Om
}
var Dm = ke({}, Ti, {
        key: function(e) {
            if (e.key) {
                var t = Lm[e.key] || e.key;
                if (t !== "Unidentified") return t
            }
            return e.type === "keypress" ? (e = vo(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Tm[e.keyCode] || "Unidentified" : ""
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: Oa,
        charCode: function(e) {
            return e.type === "keypress" ? vo(e) : 0
        },
        keyCode: function(e) {
            return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        },
        which: function(e) {
            return e.type === "keypress" ? vo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
        }
    }),
    Mm = ft(Dm),
    bm = ke({}, ul, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
    }),
    Gu = ft(bm),
    Am = ke({}, Ti, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: Oa
    }),
    zm = ft(Am),
    Fm = ke({}, Lr, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
    }),
    Im = ft(Fm),
    Um = ke({}, ul, {
        deltaX: function(e) {
            return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        },
        deltaY: function(e) {
            return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
        },
        deltaZ: 0,
        deltaMode: 0
    }),
    Bm = ft(Um),
    $m = [9, 13, 27, 32],
    Da = Jt && "CompositionEvent" in window,
    ri = null;
Jt && "documentMode" in document && (ri = document.documentMode);
var Vm = Jt && "TextEvent" in window && !ri,
    hf = Jt && (!Da || ri && 8 < ri && 11 >= ri),
    Ju = " ",
    Zu = !1;

function pf(e, t) {
    switch (e) {
        case "keyup":
            return $m.indexOf(t.keyCode) !== -1;
        case "keydown":
            return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
            return !0;
        default:
            return !1
    }
}

function mf(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null
}
var rr = !1;

function Hm(e, t) {
    switch (e) {
        case "compositionend":
            return mf(t);
        case "keypress":
            return t.which !== 32 ? null : (Zu = !0, Ju);
        case "textInput":
            return e = t.data, e === Ju && Zu ? null : e;
        default:
            return null
    }
}

function Wm(e, t) {
    if (rr) return e === "compositionend" || !Da && pf(e, t) ? (e = ff(), go = Ta = hn = null, rr = !1, e) : null;
    switch (e) {
        case "paste":
            return null;
        case "keypress":
            if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                if (t.char && 1 < t.char.length) return t.char;
                if (t.which) return String.fromCharCode(t.which)
            }
            return null;
        case "compositionend":
            return hf && t.locale !== "ko" ? null : t.data;
        default:
            return null
    }
}
var Km = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
};

function ec(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Km[e.type] : t === "textarea"
}

function yf(e, t, n, r) {
    Kd(r), t = Bo(t, "onChange"), 0 < t.length && (n = new ja("onChange", "change", null, n, r), e.push({
        event: n,
        listeners: t
    }))
}
var ii = null,
    yi = null;

function Qm(e) {
    Rf(e, 0)
}

function cl(e) {
    var t = lr(e);
    if (Id(t)) return e
}

function Xm(e, t) {
    if (e === "change") return t
}
var gf = !1;
if (Jt) {
    var $l;
    if (Jt) {
        var Vl = "oninput" in document;
        if (!Vl) {
            var tc = document.createElement("div");
            tc.setAttribute("oninput", "return;"), Vl = typeof tc.oninput == "function"
        }
        $l = Vl
    } else $l = !1;
    gf = $l && (!document.documentMode || 9 < document.documentMode)
}

function nc() {
    ii && (ii.detachEvent("onpropertychange", vf), yi = ii = null)
}

function vf(e) {
    if (e.propertyName === "value" && cl(yi)) {
        var t = [];
        yf(t, yi, e, Ca(e)), qd(Qm, t)
    }
}

function Ym(e, t, n) {
    e === "focusin" ? (nc(), ii = t, yi = n, ii.attachEvent("onpropertychange", vf)) : e === "focusout" && nc()
}

function qm(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown") return cl(yi)
}

function Gm(e, t) {
    if (e === "click") return cl(t)
}

function Jm(e, t) {
    if (e === "input" || e === "change") return cl(t)
}

function Zm(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
}
var jt = typeof Object.is == "function" ? Object.is : Zm;

function gi(e, t) {
    if (jt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
    var n = Object.keys(e),
        r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (r = 0; r < n.length; r++) {
        var i = n[r];
        if (!ps.call(t, i) || !jt(e[i], t[i])) return !1
    }
    return !0
}

function rc(e) {
    for (; e && e.firstChild;) e = e.firstChild;
    return e
}

function ic(e, t) {
    var n = rc(e);
    e = 0;
    for (var r; n;) {
        if (n.nodeType === 3) {
            if (r = e + n.textContent.length, e <= t && r >= t) return {
                node: n,
                offset: t - e
            };
            e = r
        }
        e: {
            for (; n;) {
                if (n.nextSibling) {
                    n = n.nextSibling;
                    break e
                }
                n = n.parentNode
            }
            n = void 0
        }
        n = rc(n)
    }
}

function wf(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? wf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
}

function xf() {
    for (var e = window, t = Mo(); t instanceof e.HTMLIFrameElement;) {
        try {
            var n = typeof t.contentWindow.location.href == "string"
        } catch {
            n = !1
        }
        if (n) e = t.contentWindow;
        else break;
        t = Mo(e.document)
    }
    return t
}

function Ma(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
}

function e0(e) {
    var t = xf(),
        n = e.focusedElem,
        r = e.selectionRange;
    if (t !== n && n && n.ownerDocument && wf(n.ownerDocument.documentElement, n)) {
        if (r !== null && Ma(n)) {
            if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
            else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
                e = e.getSelection();
                var i = n.textContent.length,
                    o = Math.min(r.start, i);
                r = r.end === void 0 ? o : Math.min(r.end, i), !e.extend && o > r && (i = r, r = o, o = i), i = ic(n, o);
                var l = ic(n, r);
                i && l && (e.rangeCount !== 1 || e.anchorNode !== i.node || e.anchorOffset !== i.offset || e.focusNode !== l.node || e.focusOffset !== l.offset) && (t = t.createRange(), t.setStart(i.node, i.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(l.node, l.offset)) : (t.setEnd(l.node, l.offset), e.addRange(t)))
            }
        }
        for (t = [], e = n; e = e.parentNode;) e.nodeType === 1 && t.push({
            element: e,
            left: e.scrollLeft,
            top: e.scrollTop
        });
        for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top
    }
}
var t0 = Jt && "documentMode" in document && 11 >= document.documentMode,
    ir = null,
    Ds = null,
    oi = null,
    Ms = !1;

function oc(e, t, n) {
    var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Ms || ir == null || ir !== Mo(r) || (r = ir, "selectionStart" in r && Ma(r) ? r = {
        start: r.selectionStart,
        end: r.selectionEnd
    } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
        anchorNode: r.anchorNode,
        anchorOffset: r.anchorOffset,
        focusNode: r.focusNode,
        focusOffset: r.focusOffset
    }), oi && gi(oi, r) || (oi = r, r = Bo(Ds, "onSelect"), 0 < r.length && (t = new ja("onSelect", "select", null, t, n), e.push({
        event: t,
        listeners: r
    }), t.target = ir)))
}

function Zi(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n
}
var or = {
        animationend: Zi("Animation", "AnimationEnd"),
        animationiteration: Zi("Animation", "AnimationIteration"),
        animationstart: Zi("Animation", "AnimationStart"),
        transitionend: Zi("Transition", "TransitionEnd")
    },
    Hl = {},
    kf = {};
Jt && (kf = document.createElement("div").style, "AnimationEvent" in window || (delete or.animationend.animation, delete or.animationiteration.animation, delete or.animationstart.animation), "TransitionEvent" in window || delete or.transitionend.transition);

function dl(e) {
    if (Hl[e]) return Hl[e];
    if (!or[e]) return e;
    var t = or[e],
        n;
    for (n in t)
        if (t.hasOwnProperty(n) && n in kf) return Hl[e] = t[n];
    return e
}
var Sf = dl("animationend"),
    Ef = dl("animationiteration"),
    _f = dl("animationstart"),
    Cf = dl("transitionend"),
    Nf = new Map,
    lc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");

function Rn(e, t) {
    Nf.set(e, t), Qn(t, [e])
}
for (var Wl = 0; Wl < lc.length; Wl++) {
    var Kl = lc[Wl],
        n0 = Kl.toLowerCase(),
        r0 = Kl[0].toUpperCase() + Kl.slice(1);
    Rn(n0, "on" + r0)
}
Rn(Sf, "onAnimationEnd");
Rn(Ef, "onAnimationIteration");
Rn(_f, "onAnimationStart");
Rn("dblclick", "onDoubleClick");
Rn("focusin", "onFocus");
Rn("focusout", "onBlur");
Rn(Cf, "onTransitionEnd");
kr("onMouseEnter", ["mouseout", "mouseover"]);
kr("onMouseLeave", ["mouseout", "mouseover"]);
kr("onPointerEnter", ["pointerout", "pointerover"]);
kr("onPointerLeave", ["pointerout", "pointerover"]);
Qn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Qn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Qn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Qn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Qn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Qn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Jr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
    i0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Jr));

function sc(e, t, n) {
    var r = e.type || "unknown-event";
    e.currentTarget = n, nm(r, t, void 0, e), e.currentTarget = null
}

function Rf(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
        var r = e[n],
            i = r.event;
        r = r.listeners;
        e: {
            var o = void 0;
            if (t)
                for (var l = r.length - 1; 0 <= l; l--) {
                    var s = r[l],
                        a = s.instance,
                        u = s.currentTarget;
                    if (s = s.listener, a !== o && i.isPropagationStopped()) break e;
                    sc(i, s, u), o = a
                } else
                    for (l = 0; l < r.length; l++) {
                        if (s = r[l], a = s.instance, u = s.currentTarget, s = s.listener, a !== o && i.isPropagationStopped()) break e;
                        sc(i, s, u), o = a
                    }
        }
    }
    if (Ao) throw e = Ls, Ao = !1, Ls = null, e
}

function pe(e, t) {
    var n = t[Is];
    n === void 0 && (n = t[Is] = new Set);
    var r = e + "__bubble";
    n.has(r) || (Pf(t, e, 2, !1), n.add(r))
}

function Ql(e, t, n) {
    var r = 0;
    t && (r |= 4), Pf(n, e, r, t)
}
var eo = "_reactListening" + Math.random().toString(36).slice(2);

function vi(e) {
    if (!e[eo]) {
        e[eo] = !0, Md.forEach(function(n) {
            n !== "selectionchange" && (i0.has(n) || Ql(n, !1, e), Ql(n, !0, e))
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[eo] || (t[eo] = !0, Ql("selectionchange", !1, t))
    }
}

function Pf(e, t, n, r) {
    switch (df(t)) {
        case 1:
            var i = vm;
            break;
        case 4:
            i = wm;
            break;
        default:
            i = La
    }
    n = i.bind(null, t, n, e), i = void 0, !Ps || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: i
    }) : e.addEventListener(t, n, !0) : i !== void 0 ? e.addEventListener(t, n, {
        passive: i
    }) : e.addEventListener(t, n, !1)
}

function Xl(e, t, n, r, i) {
    var o = r;
    if (!(t & 1) && !(t & 2) && r !== null) e: for (;;) {
        if (r === null) return;
        var l = r.tag;
        if (l === 3 || l === 4) {
            var s = r.stateNode.containerInfo;
            if (s === i || s.nodeType === 8 && s.parentNode === i) break;
            if (l === 4)
                for (l = r.return; l !== null;) {
                    var a = l.tag;
                    if ((a === 3 || a === 4) && (a = l.stateNode.containerInfo, a === i || a.nodeType === 8 && a.parentNode === i)) return;
                    l = l.return
                }
            for (; s !== null;) {
                if (l = An(s), l === null) return;
                if (a = l.tag, a === 5 || a === 6) {
                    r = o = l;
                    continue e
                }
                s = s.parentNode
            }
        }
        r = r.return
    }
    qd(function() {
        var u = o,
            h = Ca(n),
            m = [];
        e: {
            var p = Nf.get(e);
            if (p !== void 0) {
                var w = ja,
                    S = e;
                switch (e) {
                    case "keypress":
                        if (vo(n) === 0) break e;
                    case "keydown":
                    case "keyup":
                        w = Mm;
                        break;
                    case "focusin":
                        S = "focus", w = Bl;
                        break;
                    case "focusout":
                        S = "blur", w = Bl;
                        break;
                    case "beforeblur":
                    case "afterblur":
                        w = Bl;
                        break;
                    case "click":
                        if (n.button === 2) break e;
                    case "auxclick":
                    case "dblclick":
                    case "mousedown":
                    case "mousemove":
                    case "mouseup":
                    case "mouseout":
                    case "mouseover":
                    case "contextmenu":
                        w = Yu;
                        break;
                    case "drag":
                    case "dragend":
                    case "dragenter":
                    case "dragexit":
                    case "dragleave":
                    case "dragover":
                    case "dragstart":
                    case "drop":
                        w = Sm;
                        break;
                    case "touchcancel":
                    case "touchend":
                    case "touchmove":
                    case "touchstart":
                        w = zm;
                        break;
                    case Sf:
                    case Ef:
                    case _f:
                        w = Cm;
                        break;
                    case Cf:
                        w = Im;
                        break;
                    case "scroll":
                        w = xm;
                        break;
                    case "wheel":
                        w = Bm;
                        break;
                    case "copy":
                    case "cut":
                    case "paste":
                        w = Rm;
                        break;
                    case "gotpointercapture":
                    case "lostpointercapture":
                    case "pointercancel":
                    case "pointerdown":
                    case "pointermove":
                    case "pointerout":
                    case "pointerover":
                    case "pointerup":
                        w = Gu
                }
                var E = (t & 4) !== 0,
                    N = !E && e === "scroll",
                    c = E ? p !== null ? p + "Capture" : null : p;
                E = [];
                for (var d = u, y; d !== null;) {
                    y = d;
                    var C = y.stateNode;
                    if (y.tag === 5 && C !== null && (y = C, c !== null && (C = fi(d, c), C != null && E.push(wi(d, C, y)))), N) break;
                    d = d.return
                }
                0 < E.length && (p = new w(p, S, null, n, h), m.push({
                    event: p,
                    listeners: E
                }))
            }
        }
        if (!(t & 7)) {
            e: {
                if (p = e === "mouseover" || e === "pointerover", w = e === "mouseout" || e === "pointerout", p && n !== Ns && (S = n.relatedTarget || n.fromElement) && (An(S) || S[Zt])) break e;
                if ((w || p) && (p = h.window === h ? h : (p = h.ownerDocument) ? p.defaultView || p.parentWindow : window, w ? (S = n.relatedTarget || n.toElement, w = u, S = S ? An(S) : null, S !== null && (N = Xn(S), S !== N || S.tag !== 5 && S.tag !== 6) && (S = null)) : (w = null, S = u), w !== S)) {
                    if (E = Yu, C = "onMouseLeave", c = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (E = Gu, C = "onPointerLeave", c = "onPointerEnter", d = "pointer"), N = w == null ? p : lr(w), y = S == null ? p : lr(S), p = new E(C, d + "leave", w, n, h), p.target = N, p.relatedTarget = y, C = null, An(h) === u && (E = new E(c, d + "enter", S, n, h), E.target = y, E.relatedTarget = N, C = E), N = C, w && S) t: {
                        for (E = w, c = S, d = 0, y = E; y; y = Zn(y)) d++;
                        for (y = 0, C = c; C; C = Zn(C)) y++;
                        for (; 0 < d - y;) E = Zn(E),
                        d--;
                        for (; 0 < y - d;) c = Zn(c),
                        y--;
                        for (; d--;) {
                            if (E === c || c !== null && E === c.alternate) break t;
                            E = Zn(E), c = Zn(c)
                        }
                        E = null
                    }
                    else E = null;
                    w !== null && ac(m, p, w, E, !1), S !== null && N !== null && ac(m, N, S, E, !0)
                }
            }
            e: {
                if (p = u ? lr(u) : window, w = p.nodeName && p.nodeName.toLowerCase(), w === "select" || w === "input" && p.type === "file") var g = Xm;
                else if (ec(p))
                    if (gf) g = Jm;
                    else {
                        g = qm;
                        var R = Ym
                    }
                else(w = p.nodeName) && w.toLowerCase() === "input" && (p.type === "checkbox" || p.type === "radio") && (g = Gm);
                if (g && (g = g(e, u))) {
                    yf(m, g, n, h);
                    break e
                }
                R && R(e, p, u),
                e === "focusout" && (R = p._wrapperState) && R.controlled && p.type === "number" && ks(p, "number", p.value)
            }
            switch (R = u ? lr(u) : window, e) {
                case "focusin":
                    (ec(R) || R.contentEditable === "true") && (ir = R, Ds = u, oi = null);
                    break;
                case "focusout":
                    oi = Ds = ir = null;
                    break;
                case "mousedown":
                    Ms = !0;
                    break;
                case "contextmenu":
                case "mouseup":
                case "dragend":
                    Ms = !1, oc(m, n, h);
                    break;
                case "selectionchange":
                    if (t0) break;
                case "keydown":
                case "keyup":
                    oc(m, n, h)
            }
            var D;
            if (Da) e: {
                switch (e) {
                    case "compositionstart":
                        var j = "onCompositionStart";
                        break e;
                    case "compositionend":
                        j = "onCompositionEnd";
                        break e;
                    case "compositionupdate":
                        j = "onCompositionUpdate";
                        break e
                }
                j = void 0
            }
            else rr ? pf(e, n) && (j = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (j = "onCompositionStart");j && (hf && n.locale !== "ko" && (rr || j !== "onCompositionStart" ? j === "onCompositionEnd" && rr && (D = ff()) : (hn = h, Ta = "value" in hn ? hn.value : hn.textContent, rr = !0)), R = Bo(u, j), 0 < R.length && (j = new qu(j, e, null, n, h), m.push({
                event: j,
                listeners: R
            }), D ? j.data = D : (D = mf(n), D !== null && (j.data = D)))),
            (D = Vm ? Hm(e, n) : Wm(e, n)) && (u = Bo(u, "onBeforeInput"), 0 < u.length && (h = new qu("onBeforeInput", "beforeinput", null, n, h), m.push({
                event: h,
                listeners: u
            }), h.data = D))
        }
        Rf(m, t)
    })
}

function wi(e, t, n) {
    return {
        instance: e,
        listener: t,
        currentTarget: n
    }
}

function Bo(e, t) {
    for (var n = t + "Capture", r = []; e !== null;) {
        var i = e,
            o = i.stateNode;
        i.tag === 5 && o !== null && (i = o, o = fi(e, n), o != null && r.unshift(wi(e, o, i)), o = fi(e, t), o != null && r.push(wi(e, o, i))), e = e.return
    }
    return r
}

function Zn(e) {
    if (e === null) return null;
    do e = e.return; while (e && e.tag !== 5);
    return e || null
}

function ac(e, t, n, r, i) {
    for (var o = t._reactName, l = []; n !== null && n !== r;) {
        var s = n,
            a = s.alternate,
            u = s.stateNode;
        if (a !== null && a === r) break;
        s.tag === 5 && u !== null && (s = u, i ? (a = fi(n, o), a != null && l.unshift(wi(n, a, s))) : i || (a = fi(n, o), a != null && l.push(wi(n, a, s)))), n = n.return
    }
    l.length !== 0 && e.push({
        event: t,
        listeners: l
    })
}
var o0 = /\r\n?/g,
    l0 = /\u0000|\uFFFD/g;

function uc(e) {
    return (typeof e == "string" ? e : "" + e).replace(o0, `
`).replace(l0, "")
}

function to(e, t, n) {
    if (t = uc(t), uc(e) !== t && n) throw Error(O(425))
}

function $o() {}
var bs = null,
    As = null;

function zs(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
}
var Fs = typeof setTimeout == "function" ? setTimeout : void 0,
    s0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    cc = typeof Promise == "function" ? Promise : void 0,
    a0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof cc < "u" ? function(e) {
        return cc.resolve(null).then(e).catch(u0)
    } : Fs;

function u0(e) {
    setTimeout(function() {
        throw e
    })
}

function Yl(e, t) {
    var n = t,
        r = 0;
    do {
        var i = n.nextSibling;
        if (e.removeChild(n), i && i.nodeType === 8)
            if (n = i.data, n === "/$") {
                if (r === 0) {
                    e.removeChild(i), mi(t);
                    return
                }
                r--
            } else n !== "$" && n !== "$?" && n !== "$!" || r++;
        n = i
    } while (n);
    mi(t)
}

function vn(e) {
    for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
            if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
            if (t === "/$") return null
        }
    }
    return e
}

function dc(e) {
    e = e.previousSibling;
    for (var t = 0; e;) {
        if (e.nodeType === 8) {
            var n = e.data;
            if (n === "$" || n === "$!" || n === "$?") {
                if (t === 0) return e;
                t--
            } else n === "/$" && t++
        }
        e = e.previousSibling
    }
    return null
}
var Tr = Math.random().toString(36).slice(2),
    Ft = "__reactFiber$" + Tr,
    xi = "__reactProps$" + Tr,
    Zt = "__reactContainer$" + Tr,
    Is = "__reactEvents$" + Tr,
    c0 = "__reactListeners$" + Tr,
    d0 = "__reactHandles$" + Tr;

function An(e) {
    var t = e[Ft];
    if (t) return t;
    for (var n = e.parentNode; n;) {
        if (t = n[Zt] || n[Ft]) {
            if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
                for (e = dc(e); e !== null;) {
                    if (n = e[Ft]) return n;
                    e = dc(e)
                }
            return t
        }
        e = n, n = e.parentNode
    }
    return null
}

function ji(e) {
    return e = e[Ft] || e[Zt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e
}

function lr(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(O(33))
}

function fl(e) {
    return e[xi] || null
}
var Us = [],
    sr = -1;

function Pn(e) {
    return {
        current: e
    }
}

function me(e) {
    0 > sr || (e.current = Us[sr], Us[sr] = null, sr--)
}

function fe(e, t) {
    sr++, Us[sr] = e.current, e.current = t
}
var Cn = {},
    Xe = Pn(Cn),
    rt = Pn(!1),
    $n = Cn;

function Sr(e, t) {
    var n = e.type.contextTypes;
    if (!n) return Cn;
    var r = e.stateNode;
    if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
    var i = {},
        o;
    for (o in n) i[o] = t[o];
    return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = i), i
}

function it(e) {
    return e = e.childContextTypes, e != null
}

function Vo() {
    me(rt), me(Xe)
}

function fc(e, t, n) {
    if (Xe.current !== Cn) throw Error(O(168));
    fe(Xe, t), fe(rt, n)
}

function Lf(e, t, n) {
    var r = e.stateNode;
    if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
    r = r.getChildContext();
    for (var i in r)
        if (!(i in t)) throw Error(O(108, Yp(e) || "Unknown", i));
    return ke({}, n, r)
}

function Ho(e) {
    return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Cn, $n = Xe.current, fe(Xe, e), fe(rt, rt.current), !0
}

function hc(e, t, n) {
    var r = e.stateNode;
    if (!r) throw Error(O(169));
    n ? (e = Lf(e, t, $n), r.__reactInternalMemoizedMergedChildContext = e, me(rt), me(Xe), fe(Xe, e)) : me(rt), fe(rt, n)
}
var Xt = null,
    hl = !1,
    ql = !1;

function Tf(e) {
    Xt === null ? Xt = [e] : Xt.push(e)
}

function f0(e) {
    hl = !0, Tf(e)
}

function Ln() {
    if (!ql && Xt !== null) {
        ql = !0;
        var e = 0,
            t = se;
        try {
            var n = Xt;
            for (se = 1; e < n.length; e++) {
                var r = n[e];
                do r = r(!0); while (r !== null)
            }
            Xt = null, hl = !1
        } catch (i) {
            throw Xt !== null && (Xt = Xt.slice(e + 1)), ef(Na, Ln), i
        } finally {
            se = t, ql = !1
        }
    }
    return null
}
var ar = [],
    ur = 0,
    Wo = null,
    Ko = 0,
    mt = [],
    yt = 0,
    Vn = null,
    Yt = 1,
    qt = "";

function Dn(e, t) {
    ar[ur++] = Ko, ar[ur++] = Wo, Wo = e, Ko = t
}

function jf(e, t, n) {
    mt[yt++] = Yt, mt[yt++] = qt, mt[yt++] = Vn, Vn = e;
    var r = Yt;
    e = qt;
    var i = 32 - Lt(r) - 1;
    r &= ~(1 << i), n += 1;
    var o = 32 - Lt(t) + i;
    if (30 < o) {
        var l = i - i % 5;
        o = (r & (1 << l) - 1).toString(32), r >>= l, i -= l, Yt = 1 << 32 - Lt(t) + i | n << i | r, qt = o + e
    } else Yt = 1 << o | n << i | r, qt = e
}

function ba(e) {
    e.return !== null && (Dn(e, 1), jf(e, 1, 0))
}

function Aa(e) {
    for (; e === Wo;) Wo = ar[--ur], ar[ur] = null, Ko = ar[--ur], ar[ur] = null;
    for (; e === Vn;) Vn = mt[--yt], mt[yt] = null, qt = mt[--yt], mt[yt] = null, Yt = mt[--yt], mt[yt] = null
}
var ut = null,
    at = null,
    ge = !1,
    Pt = null;

function Of(e, t) {
    var n = vt(5, null, null, 0);
    n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n)
}

function pc(e, t) {
    switch (e.tag) {
        case 5:
            var n = e.type;
            return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, ut = e, at = vn(t.firstChild), !0) : !1;
        case 6:
            return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, ut = e, at = null, !0) : !1;
        case 13:
            return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Vn !== null ? {
                id: Yt,
                overflow: qt
            } : null, e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824
            }, n = vt(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, ut = e, at = null, !0) : !1;
        default:
            return !1
    }
}

function Bs(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0
}

function $s(e) {
    if (ge) {
        var t = at;
        if (t) {
            var n = t;
            if (!pc(e, t)) {
                if (Bs(e)) throw Error(O(418));
                t = vn(n.nextSibling);
                var r = ut;
                t && pc(e, t) ? Of(r, n) : (e.flags = e.flags & -4097 | 2, ge = !1, ut = e)
            }
        } else {
            if (Bs(e)) throw Error(O(418));
            e.flags = e.flags & -4097 | 2, ge = !1, ut = e
        }
    }
}

function mc(e) {
    for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
    ut = e
}

function no(e) {
    if (e !== ut) return !1;
    if (!ge) return mc(e), ge = !0, !1;
    var t;
    if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !zs(e.type, e.memoizedProps)), t && (t = at)) {
        if (Bs(e)) throw Df(), Error(O(418));
        for (; t;) Of(e, t), t = vn(t.nextSibling)
    }
    if (mc(e), e.tag === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(O(317));
        e: {
            for (e = e.nextSibling, t = 0; e;) {
                if (e.nodeType === 8) {
                    var n = e.data;
                    if (n === "/$") {
                        if (t === 0) {
                            at = vn(e.nextSibling);
                            break e
                        }
                        t--
                    } else n !== "$" && n !== "$!" && n !== "$?" || t++
                }
                e = e.nextSibling
            }
            at = null
        }
    } else at = ut ? vn(e.stateNode.nextSibling) : null;
    return !0
}

function Df() {
    for (var e = at; e;) e = vn(e.nextSibling)
}

function Er() {
    at = ut = null, ge = !1
}

function za(e) {
    Pt === null ? Pt = [e] : Pt.push(e)
}
var h0 = nn.ReactCurrentBatchConfig;

function Br(e, t, n) {
    if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
        if (n._owner) {
            if (n = n._owner, n) {
                if (n.tag !== 1) throw Error(O(309));
                var r = n.stateNode
            }
            if (!r) throw Error(O(147, e));
            var i = r,
                o = "" + e;
            return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(l) {
                var s = i.refs;
                l === null ? delete s[o] : s[o] = l
            }, t._stringRef = o, t)
        }
        if (typeof e != "string") throw Error(O(284));
        if (!n._owner) throw Error(O(290, e))
    }
    return e
}

function ro(e, t) {
    throw e = Object.prototype.toString.call(t), Error(O(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e))
}

function yc(e) {
    var t = e._init;
    return t(e._payload)
}

function Mf(e) {
    function t(c, d) {
        if (e) {
            var y = c.deletions;
            y === null ? (c.deletions = [d], c.flags |= 16) : y.push(d)
        }
    }

    function n(c, d) {
        if (!e) return null;
        for (; d !== null;) t(c, d), d = d.sibling;
        return null
    }

    function r(c, d) {
        for (c = new Map; d !== null;) d.key !== null ? c.set(d.key, d) : c.set(d.index, d), d = d.sibling;
        return c
    }

    function i(c, d) {
        return c = Sn(c, d), c.index = 0, c.sibling = null, c
    }

    function o(c, d, y) {
        return c.index = y, e ? (y = c.alternate, y !== null ? (y = y.index, y < d ? (c.flags |= 2, d) : y) : (c.flags |= 2, d)) : (c.flags |= 1048576, d)
    }

    function l(c) {
        return e && c.alternate === null && (c.flags |= 2), c
    }

    function s(c, d, y, C) {
        return d === null || d.tag !== 6 ? (d = rs(y, c.mode, C), d.return = c, d) : (d = i(d, y), d.return = c, d)
    }

    function a(c, d, y, C) {
        var g = y.type;
        return g === nr ? h(c, d, y.props.children, C, y.key) : d !== null && (d.elementType === g || typeof g == "object" && g !== null && g.$$typeof === an && yc(g) === d.type) ? (C = i(d, y.props), C.ref = Br(c, d, y), C.return = c, C) : (C = Co(y.type, y.key, y.props, null, c.mode, C), C.ref = Br(c, d, y), C.return = c, C)
    }

    function u(c, d, y, C) {
        return d === null || d.tag !== 4 || d.stateNode.containerInfo !== y.containerInfo || d.stateNode.implementation !== y.implementation ? (d = is(y, c.mode, C), d.return = c, d) : (d = i(d, y.children || []), d.return = c, d)
    }

    function h(c, d, y, C, g) {
        return d === null || d.tag !== 7 ? (d = Bn(y, c.mode, C, g), d.return = c, d) : (d = i(d, y), d.return = c, d)
    }

    function m(c, d, y) {
        if (typeof d == "string" && d !== "" || typeof d == "number") return d = rs("" + d, c.mode, y), d.return = c, d;
        if (typeof d == "object" && d !== null) {
            switch (d.$$typeof) {
                case Ki:
                    return y = Co(d.type, d.key, d.props, null, c.mode, y), y.ref = Br(c, null, d), y.return = c, y;
                case tr:
                    return d = is(d, c.mode, y), d.return = c, d;
                case an:
                    var C = d._init;
                    return m(c, C(d._payload), y)
            }
            if (qr(d) || Ar(d)) return d = Bn(d, c.mode, y, null), d.return = c, d;
            ro(c, d)
        }
        return null
    }

    function p(c, d, y, C) {
        var g = d !== null ? d.key : null;
        if (typeof y == "string" && y !== "" || typeof y == "number") return g !== null ? null : s(c, d, "" + y, C);
        if (typeof y == "object" && y !== null) {
            switch (y.$$typeof) {
                case Ki:
                    return y.key === g ? a(c, d, y, C) : null;
                case tr:
                    return y.key === g ? u(c, d, y, C) : null;
                case an:
                    return g = y._init, p(c, d, g(y._payload), C)
            }
            if (qr(y) || Ar(y)) return g !== null ? null : h(c, d, y, C, null);
            ro(c, y)
        }
        return null
    }

    function w(c, d, y, C, g) {
        if (typeof C == "string" && C !== "" || typeof C == "number") return c = c.get(y) || null, s(d, c, "" + C, g);
        if (typeof C == "object" && C !== null) {
            switch (C.$$typeof) {
                case Ki:
                    return c = c.get(C.key === null ? y : C.key) || null, a(d, c, C, g);
                case tr:
                    return c = c.get(C.key === null ? y : C.key) || null, u(d, c, C, g);
                case an:
                    var R = C._init;
                    return w(c, d, y, R(C._payload), g)
            }
            if (qr(C) || Ar(C)) return c = c.get(y) || null, h(d, c, C, g, null);
            ro(d, C)
        }
        return null
    }

    function S(c, d, y, C) {
        for (var g = null, R = null, D = d, j = d = 0, V = null; D !== null && j < y.length; j++) {
            D.index > j ? (V = D, D = null) : V = D.sibling;
            var L = p(c, D, y[j], C);
            if (L === null) {
                D === null && (D = V);
                break
            }
            e && D && L.alternate === null && t(c, D), d = o(L, d, j), R === null ? g = L : R.sibling = L, R = L, D = V
        }
        if (j === y.length) return n(c, D), ge && Dn(c, j), g;
        if (D === null) {
            for (; j < y.length; j++) D = m(c, y[j], C), D !== null && (d = o(D, d, j), R === null ? g = D : R.sibling = D, R = D);
            return ge && Dn(c, j), g
        }
        for (D = r(c, D); j < y.length; j++) V = w(D, c, j, y[j], C), V !== null && (e && V.alternate !== null && D.delete(V.key === null ? j : V.key), d = o(V, d, j), R === null ? g = V : R.sibling = V, R = V);
        return e && D.forEach(function(Y) {
            return t(c, Y)
        }), ge && Dn(c, j), g
    }

    function E(c, d, y, C) {
        var g = Ar(y);
        if (typeof g != "function") throw Error(O(150));
        if (y = g.call(y), y == null) throw Error(O(151));
        for (var R = g = null, D = d, j = d = 0, V = null, L = y.next(); D !== null && !L.done; j++, L = y.next()) {
            D.index > j ? (V = D, D = null) : V = D.sibling;
            var Y = p(c, D, L.value, C);
            if (Y === null) {
                D === null && (D = V);
                break
            }
            e && D && Y.alternate === null && t(c, D), d = o(Y, d, j), R === null ? g = Y : R.sibling = Y, R = Y, D = V
        }
        if (L.done) return n(c, D), ge && Dn(c, j), g;
        if (D === null) {
            for (; !L.done; j++, L = y.next()) L = m(c, L.value, C), L !== null && (d = o(L, d, j), R === null ? g = L : R.sibling = L, R = L);
            return ge && Dn(c, j), g
        }
        for (D = r(c, D); !L.done; j++, L = y.next()) L = w(D, c, j, L.value, C), L !== null && (e && L.alternate !== null && D.delete(L.key === null ? j : L.key), d = o(L, d, j), R === null ? g = L : R.sibling = L, R = L);
        return e && D.forEach(function(H) {
            return t(c, H)
        }), ge && Dn(c, j), g
    }

    function N(c, d, y, C) {
        if (typeof y == "object" && y !== null && y.type === nr && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
            switch (y.$$typeof) {
                case Ki:
                    e: {
                        for (var g = y.key, R = d; R !== null;) {
                            if (R.key === g) {
                                if (g = y.type, g === nr) {
                                    if (R.tag === 7) {
                                        n(c, R.sibling), d = i(R, y.props.children), d.return = c, c = d;
                                        break e
                                    }
                                } else if (R.elementType === g || typeof g == "object" && g !== null && g.$$typeof === an && yc(g) === R.type) {
                                    n(c, R.sibling), d = i(R, y.props), d.ref = Br(c, R, y), d.return = c, c = d;
                                    break e
                                }
                                n(c, R);
                                break
                            } else t(c, R);
                            R = R.sibling
                        }
                        y.type === nr ? (d = Bn(y.props.children, c.mode, C, y.key), d.return = c, c = d) : (C = Co(y.type, y.key, y.props, null, c.mode, C), C.ref = Br(c, d, y), C.return = c, c = C)
                    }
                    return l(c);
                case tr:
                    e: {
                        for (R = y.key; d !== null;) {
                            if (d.key === R)
                                if (d.tag === 4 && d.stateNode.containerInfo === y.containerInfo && d.stateNode.implementation === y.implementation) {
                                    n(c, d.sibling), d = i(d, y.children || []), d.return = c, c = d;
                                    break e
                                } else {
                                    n(c, d);
                                    break
                                }
                            else t(c, d);
                            d = d.sibling
                        }
                        d = is(y, c.mode, C),
                        d.return = c,
                        c = d
                    }
                    return l(c);
                case an:
                    return R = y._init, N(c, d, R(y._payload), C)
            }
            if (qr(y)) return S(c, d, y, C);
            if (Ar(y)) return E(c, d, y, C);
            ro(c, y)
        }
        return typeof y == "string" && y !== "" || typeof y == "number" ? (y = "" + y, d !== null && d.tag === 6 ? (n(c, d.sibling), d = i(d, y), d.return = c, c = d) : (n(c, d), d = rs(y, c.mode, C), d.return = c, c = d), l(c)) : n(c, d)
    }
    return N
}
var _r = Mf(!0),
    bf = Mf(!1),
    Qo = Pn(null),
    Xo = null,
    cr = null,
    Fa = null;

function Ia() {
    Fa = cr = Xo = null
}

function Ua(e) {
    var t = Qo.current;
    me(Qo), e._currentValue = t
}

function Vs(e, t, n) {
    for (; e !== null;) {
        var r = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
        e = e.return
    }
}

function vr(e, t) {
    Xo = e, Fa = cr = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (nt = !0), e.firstContext = null)
}

function xt(e) {
    var t = e._currentValue;
    if (Fa !== e)
        if (e = {
                context: e,
                memoizedValue: t,
                next: null
            }, cr === null) {
            if (Xo === null) throw Error(O(308));
            cr = e, Xo.dependencies = {
                lanes: 0,
                firstContext: e
            }
        } else cr = cr.next = e;
    return t
}
var zn = null;

function Ba(e) {
    zn === null ? zn = [e] : zn.push(e)
}

function Af(e, t, n, r) {
    var i = t.interleaved;
    return i === null ? (n.next = n, Ba(t)) : (n.next = i.next, i.next = n), t.interleaved = n, en(e, r)
}

function en(e, t) {
    e.lanes |= t;
    var n = e.alternate;
    for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
    return n.tag === 3 ? n.stateNode : null
}
var un = !1;

function $a(e) {
    e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}

function zf(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects
    })
}

function Gt(e, t) {
    return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}

function wn(e, t, n) {
    var r = e.updateQueue;
    if (r === null) return null;
    if (r = r.shared, ie & 2) {
        var i = r.pending;
        return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, en(e, n)
    }
    return i = r.interleaved, i === null ? (t.next = t, Ba(r)) : (t.next = i.next, i.next = t), r.interleaved = t, en(e, n)
}

function wo(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
        var r = t.lanes;
        r &= e.pendingLanes, n |= r, t.lanes = n, Ra(e, n)
    }
}

function gc(e, t) {
    var n = e.updateQueue,
        r = e.alternate;
    if (r !== null && (r = r.updateQueue, n === r)) {
        var i = null,
            o = null;
        if (n = n.firstBaseUpdate, n !== null) {
            do {
                var l = {
                    eventTime: n.eventTime,
                    lane: n.lane,
                    tag: n.tag,
                    payload: n.payload,
                    callback: n.callback,
                    next: null
                };
                o === null ? i = o = l : o = o.next = l, n = n.next
            } while (n !== null);
            o === null ? i = o = t : o = o.next = t
        } else i = o = t;
        n = {
            baseState: r.baseState,
            firstBaseUpdate: i,
            lastBaseUpdate: o,
            shared: r.shared,
            effects: r.effects
        }, e.updateQueue = n;
        return
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t
}

function Yo(e, t, n, r) {
    var i = e.updateQueue;
    un = !1;
    var o = i.firstBaseUpdate,
        l = i.lastBaseUpdate,
        s = i.shared.pending;
    if (s !== null) {
        i.shared.pending = null;
        var a = s,
            u = a.next;
        a.next = null, l === null ? o = u : l.next = u, l = a;
        var h = e.alternate;
        h !== null && (h = h.updateQueue, s = h.lastBaseUpdate, s !== l && (s === null ? h.firstBaseUpdate = u : s.next = u, h.lastBaseUpdate = a))
    }
    if (o !== null) {
        var m = i.baseState;
        l = 0, h = u = a = null, s = o;
        do {
            var p = s.lane,
                w = s.eventTime;
            if ((r & p) === p) {
                h !== null && (h = h.next = {
                    eventTime: w,
                    lane: 0,
                    tag: s.tag,
                    payload: s.payload,
                    callback: s.callback,
                    next: null
                });
                e: {
                    var S = e,
                        E = s;
                    switch (p = t, w = n, E.tag) {
                        case 1:
                            if (S = E.payload, typeof S == "function") {
                                m = S.call(w, m, p);
                                break e
                            }
                            m = S;
                            break e;
                        case 3:
                            S.flags = S.flags & -65537 | 128;
                        case 0:
                            if (S = E.payload, p = typeof S == "function" ? S.call(w, m, p) : S, p == null) break e;
                            m = ke({}, m, p);
                            break e;
                        case 2:
                            un = !0
                    }
                }
                s.callback !== null && s.lane !== 0 && (e.flags |= 64, p = i.effects, p === null ? i.effects = [s] : p.push(s))
            } else w = {
                eventTime: w,
                lane: p,
                tag: s.tag,
                payload: s.payload,
                callback: s.callback,
                next: null
            }, h === null ? (u = h = w, a = m) : h = h.next = w, l |= p;
            if (s = s.next, s === null) {
                if (s = i.shared.pending, s === null) break;
                p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null
            }
        } while (!0);
        if (h === null && (a = m), i.baseState = a, i.firstBaseUpdate = u, i.lastBaseUpdate = h, t = i.shared.interleaved, t !== null) {
            i = t;
            do l |= i.lane, i = i.next; while (i !== t)
        } else o === null && (i.shared.lanes = 0);
        Wn |= l, e.lanes = l, e.memoizedState = m
    }
}

function vc(e, t, n) {
    if (e = t.effects, t.effects = null, e !== null)
        for (t = 0; t < e.length; t++) {
            var r = e[t],
                i = r.callback;
            if (i !== null) {
                if (r.callback = null, r = n, typeof i != "function") throw Error(O(191, i));
                i.call(r)
            }
        }
}
var Oi = {},
    Ut = Pn(Oi),
    ki = Pn(Oi),
    Si = Pn(Oi);

function Fn(e) {
    if (e === Oi) throw Error(O(174));
    return e
}

function Va(e, t) {
    switch (fe(Si, t), fe(ki, e), fe(Ut, Oi), e = t.nodeType, e) {
        case 9:
        case 11:
            t = (t = t.documentElement) ? t.namespaceURI : Es(null, "");
            break;
        default:
            e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Es(t, e)
    }
    me(Ut), fe(Ut, t)
}

function Cr() {
    me(Ut), me(ki), me(Si)
}

function Ff(e) {
    Fn(Si.current);
    var t = Fn(Ut.current),
        n = Es(t, e.type);
    t !== n && (fe(ki, e), fe(Ut, n))
}

function Ha(e) {
    ki.current === e && (me(Ut), me(ki))
}
var we = Pn(0);

function qo(e) {
    for (var t = e; t !== null;) {
        if (t.tag === 13) {
            var n = t.memoizedState;
            if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
            if (t.flags & 128) return t
        } else if (t.child !== null) {
            t.child.return = t, t = t.child;
            continue
        }
        if (t === e) break;
        for (; t.sibling === null;) {
            if (t.return === null || t.return === e) return null;
            t = t.return
        }
        t.sibling.return = t.return, t = t.sibling
    }
    return null
}
var Gl = [];

function Wa() {
    for (var e = 0; e < Gl.length; e++) Gl[e]._workInProgressVersionPrimary = null;
    Gl.length = 0
}
var xo = nn.ReactCurrentDispatcher,
    Jl = nn.ReactCurrentBatchConfig,
    Hn = 0,
    xe = null,
    Oe = null,
    be = null,
    Go = !1,
    li = !1,
    Ei = 0,
    p0 = 0;

function We() {
    throw Error(O(321))
}

function Ka(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
        if (!jt(e[n], t[n])) return !1;
    return !0
}

function Qa(e, t, n, r, i, o) {
    if (Hn = o, xe = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, xo.current = e === null || e.memoizedState === null ? v0 : w0, e = n(r, i), li) {
        o = 0;
        do {
            if (li = !1, Ei = 0, 25 <= o) throw Error(O(301));
            o += 1, be = Oe = null, t.updateQueue = null, xo.current = x0, e = n(r, i)
        } while (li)
    }
    if (xo.current = Jo, t = Oe !== null && Oe.next !== null, Hn = 0, be = Oe = xe = null, Go = !1, t) throw Error(O(300));
    return e
}

function Xa() {
    var e = Ei !== 0;
    return Ei = 0, e
}

function zt() {
    var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };
    return be === null ? xe.memoizedState = be = e : be = be.next = e, be
}

function kt() {
    if (Oe === null) {
        var e = xe.alternate;
        e = e !== null ? e.memoizedState : null
    } else e = Oe.next;
    var t = be === null ? xe.memoizedState : be.next;
    if (t !== null) be = t, Oe = e;
    else {
        if (e === null) throw Error(O(310));
        Oe = e, e = {
            memoizedState: Oe.memoizedState,
            baseState: Oe.baseState,
            baseQueue: Oe.baseQueue,
            queue: Oe.queue,
            next: null
        }, be === null ? xe.memoizedState = be = e : be = be.next = e
    }
    return be
}

function _i(e, t) {
    return typeof t == "function" ? t(e) : t
}

function Zl(e) {
    var t = kt(),
        n = t.queue;
    if (n === null) throw Error(O(311));
    n.lastRenderedReducer = e;
    var r = Oe,
        i = r.baseQueue,
        o = n.pending;
    if (o !== null) {
        if (i !== null) {
            var l = i.next;
            i.next = o.next, o.next = l
        }
        r.baseQueue = i = o, n.pending = null
    }
    if (i !== null) {
        o = i.next, r = r.baseState;
        var s = l = null,
            a = null,
            u = o;
        do {
            var h = u.lane;
            if ((Hn & h) === h) a !== null && (a = a.next = {
                lane: 0,
                action: u.action,
                hasEagerState: u.hasEagerState,
                eagerState: u.eagerState,
                next: null
            }), r = u.hasEagerState ? u.eagerState : e(r, u.action);
            else {
                var m = {
                    lane: h,
                    action: u.action,
                    hasEagerState: u.hasEagerState,
                    eagerState: u.eagerState,
                    next: null
                };
                a === null ? (s = a = m, l = r) : a = a.next = m, xe.lanes |= h, Wn |= h
            }
            u = u.next
        } while (u !== null && u !== o);
        a === null ? l = r : a.next = s, jt(r, t.memoizedState) || (nt = !0), t.memoizedState = r, t.baseState = l, t.baseQueue = a, n.lastRenderedState = r
    }
    if (e = n.interleaved, e !== null) {
        i = e;
        do o = i.lane, xe.lanes |= o, Wn |= o, i = i.next; while (i !== e)
    } else i === null && (n.lanes = 0);
    return [t.memoizedState, n.dispatch]
}

function es(e) {
    var t = kt(),
        n = t.queue;
    if (n === null) throw Error(O(311));
    n.lastRenderedReducer = e;
    var r = n.dispatch,
        i = n.pending,
        o = t.memoizedState;
    if (i !== null) {
        n.pending = null;
        var l = i = i.next;
        do o = e(o, l.action), l = l.next; while (l !== i);
        jt(o, t.memoizedState) || (nt = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o
    }
    return [o, r]
}

function If() {}

function Uf(e, t) {
    var n = xe,
        r = kt(),
        i = t(),
        o = !jt(r.memoizedState, i);
    if (o && (r.memoizedState = i, nt = !0), r = r.queue, Ya(Vf.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || be !== null && be.memoizedState.tag & 1) {
        if (n.flags |= 2048, Ci(9, $f.bind(null, n, r, i, t), void 0, null), Ae === null) throw Error(O(349));
        Hn & 30 || Bf(n, t, i)
    }
    return i
}

function Bf(e, t, n) {
    e.flags |= 16384, e = {
        getSnapshot: t,
        value: n
    }, t = xe.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
    }, xe.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e))
}

function $f(e, t, n, r) {
    t.value = n, t.getSnapshot = r, Hf(t) && Wf(e)
}

function Vf(e, t, n) {
    return n(function() {
        Hf(t) && Wf(e)
    })
}

function Hf(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
        var n = t();
        return !jt(e, n)
    } catch {
        return !0
    }
}

function Wf(e) {
    var t = en(e, 1);
    t !== null && Tt(t, e, 1, -1)
}

function wc(e) {
    var t = zt();
    return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: _i,
        lastRenderedState: e
    }, t.queue = e, e = e.dispatch = g0.bind(null, xe, e), [t.memoizedState, e]
}

function Ci(e, t, n, r) {
    return e = {
        tag: e,
        create: t,
        destroy: n,
        deps: r,
        next: null
    }, t = xe.updateQueue, t === null ? (t = {
        lastEffect: null,
        stores: null
    }, xe.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e
}

function Kf() {
    return kt().memoizedState
}

function ko(e, t, n, r) {
    var i = zt();
    xe.flags |= e, i.memoizedState = Ci(1 | t, n, void 0, r === void 0 ? null : r)
}

function pl(e, t, n, r) {
    var i = kt();
    r = r === void 0 ? null : r;
    var o = void 0;
    if (Oe !== null) {
        var l = Oe.memoizedState;
        if (o = l.destroy, r !== null && Ka(r, l.deps)) {
            i.memoizedState = Ci(t, n, o, r);
            return
        }
    }
    xe.flags |= e, i.memoizedState = Ci(1 | t, n, o, r)
}

function xc(e, t) {
    return ko(8390656, 8, e, t)
}

function Ya(e, t) {
    return pl(2048, 8, e, t)
}

function Qf(e, t) {
    return pl(4, 2, e, t)
}

function Xf(e, t) {
    return pl(4, 4, e, t)
}

function Yf(e, t) {
    if (typeof t == "function") return e = e(), t(e),
        function() {
            t(null)
        };
    if (t != null) return e = e(), t.current = e,
        function() {
            t.current = null
        }
}

function qf(e, t, n) {
    return n = n != null ? n.concat([e]) : null, pl(4, 4, Yf.bind(null, t, e), n)
}

function qa() {}

function Gf(e, t) {
    var n = kt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Ka(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e)
}

function Jf(e, t) {
    var n = kt();
    t = t === void 0 ? null : t;
    var r = n.memoizedState;
    return r !== null && t !== null && Ka(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e)
}

function Zf(e, t, n) {
    return Hn & 21 ? (jt(n, t) || (n = rf(), xe.lanes |= n, Wn |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, nt = !0), e.memoizedState = n)
}

function m0(e, t) {
    var n = se;
    se = n !== 0 && 4 > n ? n : 4, e(!0);
    var r = Jl.transition;
    Jl.transition = {};
    try {
        e(!1), t()
    } finally {
        se = n, Jl.transition = r
    }
}

function eh() {
    return kt().memoizedState
}

function y0(e, t, n) {
    var r = kn(e);
    if (n = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        }, th(e)) nh(t, n);
    else if (n = Af(e, t, n, r), n !== null) {
        var i = Ge();
        Tt(n, e, r, i), rh(n, t, r)
    }
}

function g0(e, t, n) {
    var r = kn(e),
        i = {
            lane: r,
            action: n,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
    if (th(e)) nh(t, i);
    else {
        var o = e.alternate;
        if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
            var l = t.lastRenderedState,
                s = o(l, n);
            if (i.hasEagerState = !0, i.eagerState = s, jt(s, l)) {
                var a = t.interleaved;
                a === null ? (i.next = i, Ba(t)) : (i.next = a.next, a.next = i), t.interleaved = i;
                return
            }
        } catch {} finally {}
        n = Af(e, t, i, r), n !== null && (i = Ge(), Tt(n, e, r, i), rh(n, t, r))
    }
}

function th(e) {
    var t = e.alternate;
    return e === xe || t !== null && t === xe
}

function nh(e, t) {
    li = Go = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t
}

function rh(e, t, n) {
    if (n & 4194240) {
        var r = t.lanes;
        r &= e.pendingLanes, n |= r, t.lanes = n, Ra(e, n)
    }
}
var Jo = {
        readContext: xt,
        useCallback: We,
        useContext: We,
        useEffect: We,
        useImperativeHandle: We,
        useInsertionEffect: We,
        useLayoutEffect: We,
        useMemo: We,
        useReducer: We,
        useRef: We,
        useState: We,
        useDebugValue: We,
        useDeferredValue: We,
        useTransition: We,
        useMutableSource: We,
        useSyncExternalStore: We,
        useId: We,
        unstable_isNewReconciler: !1
    },
    v0 = {
        readContext: xt,
        useCallback: function(e, t) {
            return zt().memoizedState = [e, t === void 0 ? null : t], e
        },
        useContext: xt,
        useEffect: xc,
        useImperativeHandle: function(e, t, n) {
            return n = n != null ? n.concat([e]) : null, ko(4194308, 4, Yf.bind(null, t, e), n)
        },
        useLayoutEffect: function(e, t) {
            return ko(4194308, 4, e, t)
        },
        useInsertionEffect: function(e, t) {
            return ko(4, 2, e, t)
        },
        useMemo: function(e, t) {
            var n = zt();
            return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e
        },
        useReducer: function(e, t, n) {
            var r = zt();
            return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = {
                pending: null,
                interleaved: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: t
            }, r.queue = e, e = e.dispatch = y0.bind(null, xe, e), [r.memoizedState, e]
        },
        useRef: function(e) {
            var t = zt();
            return e = {
                current: e
            }, t.memoizedState = e
        },
        useState: wc,
        useDebugValue: qa,
        useDeferredValue: function(e) {
            return zt().memoizedState = e
        },
        useTransition: function() {
            var e = wc(!1),
                t = e[0];
            return e = m0.bind(null, e[1]), zt().memoizedState = e, [t, e]
        },
        useMutableSource: function() {},
        useSyncExternalStore: function(e, t, n) {
            var r = xe,
                i = zt();
            if (ge) {
                if (n === void 0) throw Error(O(407));
                n = n()
            } else {
                if (n = t(), Ae === null) throw Error(O(349));
                Hn & 30 || Bf(r, t, n)
            }
            i.memoizedState = n;
            var o = {
                value: n,
                getSnapshot: t
            };
            return i.queue = o, xc(Vf.bind(null, r, o, e), [e]), r.flags |= 2048, Ci(9, $f.bind(null, r, o, n, t), void 0, null), n
        },
        useId: function() {
            var e = zt(),
                t = Ae.identifierPrefix;
            if (ge) {
                var n = qt,
                    r = Yt;
                n = (r & ~(1 << 32 - Lt(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Ei++, 0 < n && (t += "H" + n.toString(32)), t += ":"
            } else n = p0++, t = ":" + t + "r" + n.toString(32) + ":";
            return e.memoizedState = t
        },
        unstable_isNewReconciler: !1
    },
    w0 = {
        readContext: xt,
        useCallback: Gf,
        useContext: xt,
        useEffect: Ya,
        useImperativeHandle: qf,
        useInsertionEffect: Qf,
        useLayoutEffect: Xf,
        useMemo: Jf,
        useReducer: Zl,
        useRef: Kf,
        useState: function() {
            return Zl(_i)
        },
        useDebugValue: qa,
        useDeferredValue: function(e) {
            var t = kt();
            return Zf(t, Oe.memoizedState, e)
        },
        useTransition: function() {
            var e = Zl(_i)[0],
                t = kt().memoizedState;
            return [e, t]
        },
        useMutableSource: If,
        useSyncExternalStore: Uf,
        useId: eh,
        unstable_isNewReconciler: !1
    },
    x0 = {
        readContext: xt,
        useCallback: Gf,
        useContext: xt,
        useEffect: Ya,
        useImperativeHandle: qf,
        useInsertionEffect: Qf,
        useLayoutEffect: Xf,
        useMemo: Jf,
        useReducer: es,
        useRef: Kf,
        useState: function() {
            return es(_i)
        },
        useDebugValue: qa,
        useDeferredValue: function(e) {
            var t = kt();
            return Oe === null ? t.memoizedState = e : Zf(t, Oe.memoizedState, e)
        },
        useTransition: function() {
            var e = es(_i)[0],
                t = kt().memoizedState;
            return [e, t]
        },
        useMutableSource: If,
        useSyncExternalStore: Uf,
        useId: eh,
        unstable_isNewReconciler: !1
    };

function _t(e, t) {
    if (e && e.defaultProps) {
        t = ke({}, t), e = e.defaultProps;
        for (var n in e) t[n] === void 0 && (t[n] = e[n]);
        return t
    }
    return t
}

function Hs(e, t, n, r) {
    t = e.memoizedState, n = n(r, t), n = n == null ? t : ke({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n)
}
var ml = {
    isMounted: function(e) {
        return (e = e._reactInternals) ? Xn(e) === e : !1
    },
    enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var r = Ge(),
            i = kn(e),
            o = Gt(r, i);
        o.payload = t, n != null && (o.callback = n), t = wn(e, o, i), t !== null && (Tt(t, e, i, r), wo(t, e, i))
    },
    enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var r = Ge(),
            i = kn(e),
            o = Gt(r, i);
        o.tag = 1, o.payload = t, n != null && (o.callback = n), t = wn(e, o, i), t !== null && (Tt(t, e, i, r), wo(t, e, i))
    },
    enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = Ge(),
            r = kn(e),
            i = Gt(n, r);
        i.tag = 2, t != null && (i.callback = t), t = wn(e, i, r), t !== null && (Tt(t, e, r, n), wo(t, e, r))
    }
};

function kc(e, t, n, r, i, o, l) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, l) : t.prototype && t.prototype.isPureReactComponent ? !gi(n, r) || !gi(i, o) : !0
}

function ih(e, t, n) {
    var r = !1,
        i = Cn,
        o = t.contextType;
    return typeof o == "object" && o !== null ? o = xt(o) : (i = it(t) ? $n : Xe.current, r = t.contextTypes, o = (r = r != null) ? Sr(e, i) : Cn), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ml, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = i, e.__reactInternalMemoizedMaskedChildContext = o), t
}

function Sc(e, t, n, r) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && ml.enqueueReplaceState(t, t.state, null)
}

function Ws(e, t, n, r) {
    var i = e.stateNode;
    i.props = n, i.state = e.memoizedState, i.refs = {}, $a(e);
    var o = t.contextType;
    typeof o == "object" && o !== null ? i.context = xt(o) : (o = it(t) ? $n : Xe.current, i.context = Sr(e, o)), i.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Hs(e, t, o, n), i.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (t = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), t !== i.state && ml.enqueueReplaceState(i, i.state, null), Yo(e, n, i, r), i.state = e.memoizedState), typeof i.componentDidMount == "function" && (e.flags |= 4194308)
}

function Nr(e, t) {
    try {
        var n = "",
            r = t;
        do n += Xp(r), r = r.return; while (r);
        var i = n
    } catch (o) {
        i = `
Error generating stack: ` + o.message + `
` + o.stack
    }
    return {
        value: e,
        source: t,
        stack: i,
        digest: null
    }
}

function ts(e, t, n) {
    return {
        value: e,
        source: null,
        stack: n ?? null,
        digest: t ?? null
    }
}

function Ks(e, t) {
    try {
        console.error(t.value)
    } catch (n) {
        setTimeout(function() {
            throw n
        })
    }
}
var k0 = typeof WeakMap == "function" ? WeakMap : Map;

function oh(e, t, n) {
    n = Gt(-1, n), n.tag = 3, n.payload = {
        element: null
    };
    var r = t.value;
    return n.callback = function() {
        el || (el = !0, na = r), Ks(e, t)
    }, n
}

function lh(e, t, n) {
    n = Gt(-1, n), n.tag = 3;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
        var i = t.value;
        n.payload = function() {
            return r(i)
        }, n.callback = function() {
            Ks(e, t)
        }
    }
    var o = e.stateNode;
    return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
        Ks(e, t), typeof r != "function" && (xn === null ? xn = new Set([this]) : xn.add(this));
        var l = t.stack;
        this.componentDidCatch(t.value, {
            componentStack: l !== null ? l : ""
        })
    }), n
}

function Ec(e, t, n) {
    var r = e.pingCache;
    if (r === null) {
        r = e.pingCache = new k0;
        var i = new Set;
        r.set(t, i)
    } else i = r.get(t), i === void 0 && (i = new Set, r.set(t, i));
    i.has(n) || (i.add(n), e = b0.bind(null, e, t, n), t.then(e, e))
}

function _c(e) {
    do {
        var t;
        if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
        e = e.return
    } while (e !== null);
    return null
}

function Cc(e, t, n, r, i) {
    return e.mode & 1 ? (e.flags |= 65536, e.lanes = i, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Gt(-1, 1), t.tag = 2, wn(n, t, 1))), n.lanes |= 1), e)
}
var S0 = nn.ReactCurrentOwner,
    nt = !1;

function qe(e, t, n, r) {
    t.child = e === null ? bf(t, null, n, r) : _r(t, e.child, n, r)
}

function Nc(e, t, n, r, i) {
    n = n.render;
    var o = t.ref;
    return vr(t, i), r = Qa(e, t, n, r, o, i), n = Xa(), e !== null && !nt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, tn(e, t, i)) : (ge && n && ba(t), t.flags |= 1, qe(e, t, r, i), t.child)
}

function Rc(e, t, n, r, i) {
    if (e === null) {
        var o = n.type;
        return typeof o == "function" && !iu(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, sh(e, t, o, r, i)) : (e = Co(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e)
    }
    if (o = e.child, !(e.lanes & i)) {
        var l = o.memoizedProps;
        if (n = n.compare, n = n !== null ? n : gi, n(l, r) && e.ref === t.ref) return tn(e, t, i)
    }
    return t.flags |= 1, e = Sn(o, r), e.ref = t.ref, e.return = t, t.child = e
}

function sh(e, t, n, r, i) {
    if (e !== null) {
        var o = e.memoizedProps;
        if (gi(o, r) && e.ref === t.ref)
            if (nt = !1, t.pendingProps = r = o, (e.lanes & i) !== 0) e.flags & 131072 && (nt = !0);
            else return t.lanes = e.lanes, tn(e, t, i)
    }
    return Qs(e, t, n, r, i)
}

function ah(e, t, n) {
    var r = t.pendingProps,
        i = r.children,
        o = e !== null ? e.memoizedState : null;
    if (r.mode === "hidden")
        if (!(t.mode & 1)) t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null
        }, fe(fr, lt), lt |= n;
        else {
            if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = {
                baseLanes: e,
                cachePool: null,
                transitions: null
            }, t.updateQueue = null, fe(fr, lt), lt |= e, null;
            t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null
            }, r = o !== null ? o.baseLanes : n, fe(fr, lt), lt |= r
        }
    else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, fe(fr, lt), lt |= r;
    return qe(e, t, i, n), t.child
}

function uh(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152)
}

function Qs(e, t, n, r, i) {
    var o = it(n) ? $n : Xe.current;
    return o = Sr(t, o), vr(t, i), n = Qa(e, t, n, r, o, i), r = Xa(), e !== null && !nt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~i, tn(e, t, i)) : (ge && r && ba(t), t.flags |= 1, qe(e, t, n, i), t.child)
}

function Pc(e, t, n, r, i) {
    if (it(n)) {
        var o = !0;
        Ho(t)
    } else o = !1;
    if (vr(t, i), t.stateNode === null) So(e, t), ih(t, n, r), Ws(t, n, r, i), r = !0;
    else if (e === null) {
        var l = t.stateNode,
            s = t.memoizedProps;
        l.props = s;
        var a = l.context,
            u = n.contextType;
        typeof u == "object" && u !== null ? u = xt(u) : (u = it(n) ? $n : Xe.current, u = Sr(t, u));
        var h = n.getDerivedStateFromProps,
            m = typeof h == "function" || typeof l.getSnapshotBeforeUpdate == "function";
        m || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (s !== r || a !== u) && Sc(t, l, r, u), un = !1;
        var p = t.memoizedState;
        l.state = p, Yo(t, r, l, i), a = t.memoizedState, s !== r || p !== a || rt.current || un ? (typeof h == "function" && (Hs(t, n, h, r), a = t.memoizedState), (s = un || kc(t, n, s, r, p, a, u)) ? (m || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()), typeof l.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = a), l.props = r, l.state = a, l.context = u, r = s) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), r = !1)
    } else {
        l = t.stateNode, zf(e, t), s = t.memoizedProps, u = t.type === t.elementType ? s : _t(t.type, s), l.props = u, m = t.pendingProps, p = l.context, a = n.contextType, typeof a == "object" && a !== null ? a = xt(a) : (a = it(n) ? $n : Xe.current, a = Sr(t, a));
        var w = n.getDerivedStateFromProps;
        (h = typeof w == "function" || typeof l.getSnapshotBeforeUpdate == "function") || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (s !== m || p !== a) && Sc(t, l, r, a), un = !1, p = t.memoizedState, l.state = p, Yo(t, r, l, i);
        var S = t.memoizedState;
        s !== m || p !== S || rt.current || un ? (typeof w == "function" && (Hs(t, n, w, r), S = t.memoizedState), (u = un || kc(t, n, u, r, p, S, a) || !1) ? (h || typeof l.UNSAFE_componentWillUpdate != "function" && typeof l.componentWillUpdate != "function" || (typeof l.componentWillUpdate == "function" && l.componentWillUpdate(r, S, a), typeof l.UNSAFE_componentWillUpdate == "function" && l.UNSAFE_componentWillUpdate(r, S, a)), typeof l.componentDidUpdate == "function" && (t.flags |= 4), typeof l.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof l.componentDidUpdate != "function" || s === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = S), l.props = r, l.state = S, l.context = a, r = u) : (typeof l.componentDidUpdate != "function" || s === e.memoizedProps && p === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && p === e.memoizedState || (t.flags |= 1024), r = !1)
    }
    return Xs(e, t, n, r, o, i)
}

function Xs(e, t, n, r, i, o) {
    uh(e, t);
    var l = (t.flags & 128) !== 0;
    if (!r && !l) return i && hc(t, n, !1), tn(e, t, o);
    r = t.stateNode, S0.current = t;
    var s = l && typeof n.getDerivedStateFromError != "function" ? null : r.render();
    return t.flags |= 1, e !== null && l ? (t.child = _r(t, e.child, null, o), t.child = _r(t, null, s, o)) : qe(e, t, s, o), t.memoizedState = r.state, i && hc(t, n, !0), t.child
}

function ch(e) {
    var t = e.stateNode;
    t.pendingContext ? fc(e, t.pendingContext, t.pendingContext !== t.context) : t.context && fc(e, t.context, !1), Va(e, t.containerInfo)
}

function Lc(e, t, n, r, i) {
    return Er(), za(i), t.flags |= 256, qe(e, t, n, r), t.child
}
var Ys = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0
};

function qs(e) {
    return {
        baseLanes: e,
        cachePool: null,
        transitions: null
    }
}

function dh(e, t, n) {
    var r = t.pendingProps,
        i = we.current,
        o = !1,
        l = (t.flags & 128) !== 0,
        s;
    if ((s = l) || (s = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0), s ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (i |= 1), fe(we, i & 1), e === null) return $s(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (l = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, l = {
        mode: "hidden",
        children: l
    }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = l) : o = vl(l, r, 0, null), e = Bn(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = qs(n), t.memoizedState = Ys, e) : Ga(t, l));
    if (i = e.memoizedState, i !== null && (s = i.dehydrated, s !== null)) return E0(e, t, l, r, s, i, n);
    if (o) {
        o = r.fallback, l = t.mode, i = e.child, s = i.sibling;
        var a = {
            mode: "hidden",
            children: r.children
        };
        return !(l & 1) && t.child !== i ? (r = t.child, r.childLanes = 0, r.pendingProps = a, t.deletions = null) : (r = Sn(i, a), r.subtreeFlags = i.subtreeFlags & 14680064), s !== null ? o = Sn(s, o) : (o = Bn(o, l, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, l = e.child.memoizedState, l = l === null ? qs(n) : {
            baseLanes: l.baseLanes | n,
            cachePool: null,
            transitions: l.transitions
        }, o.memoizedState = l, o.childLanes = e.childLanes & ~n, t.memoizedState = Ys, r
    }
    return o = e.child, e = o.sibling, r = Sn(o, {
        mode: "visible",
        children: r.children
    }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r
}

function Ga(e, t) {
    return t = vl({
        mode: "visible",
        children: t
    }, e.mode, 0, null), t.return = e, e.child = t
}

function io(e, t, n, r) {
    return r !== null && za(r), _r(t, e.child, null, n), e = Ga(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e
}

function E0(e, t, n, r, i, o, l) {
    if (n) return t.flags & 256 ? (t.flags &= -257, r = ts(Error(O(422))), io(e, t, l, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, i = t.mode, r = vl({
        mode: "visible",
        children: r.children
    }, i, 0, null), o = Bn(o, i, l, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && _r(t, e.child, null, l), t.child.memoizedState = qs(l), t.memoizedState = Ys, o);
    if (!(t.mode & 1)) return io(e, t, l, null);
    if (i.data === "$!") {
        if (r = i.nextSibling && i.nextSibling.dataset, r) var s = r.dgst;
        return r = s, o = Error(O(419)), r = ts(o, r, void 0), io(e, t, l, r)
    }
    if (s = (l & e.childLanes) !== 0, nt || s) {
        if (r = Ae, r !== null) {
            switch (l & -l) {
                case 4:
                    i = 2;
                    break;
                case 16:
                    i = 8;
                    break;
                case 64:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                case 67108864:
                    i = 32;
                    break;
                case 536870912:
                    i = 268435456;
                    break;
                default:
                    i = 0
            }
            i = i & (r.suspendedLanes | l) ? 0 : i, i !== 0 && i !== o.retryLane && (o.retryLane = i, en(e, i), Tt(r, e, i, -1))
        }
        return ru(), r = ts(Error(O(421))), io(e, t, l, r)
    }
    return i.data === "$?" ? (t.flags |= 128, t.child = e.child, t = A0.bind(null, e), i._reactRetry = t, null) : (e = o.treeContext, at = vn(i.nextSibling), ut = t, ge = !0, Pt = null, e !== null && (mt[yt++] = Yt, mt[yt++] = qt, mt[yt++] = Vn, Yt = e.id, qt = e.overflow, Vn = t), t = Ga(t, r.children), t.flags |= 4096, t)
}

function Tc(e, t, n) {
    e.lanes |= t;
    var r = e.alternate;
    r !== null && (r.lanes |= t), Vs(e.return, t, n)
}

function ns(e, t, n, r, i) {
    var o = e.memoizedState;
    o === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: i
    } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i)
}

function fh(e, t, n) {
    var r = t.pendingProps,
        i = r.revealOrder,
        o = r.tail;
    if (qe(e, t, r.children, n), r = we.current, r & 2) r = r & 1 | 2, t.flags |= 128;
    else {
        if (e !== null && e.flags & 128) e: for (e = t.child; e !== null;) {
            if (e.tag === 13) e.memoizedState !== null && Tc(e, n, t);
            else if (e.tag === 19) Tc(e, n, t);
            else if (e.child !== null) {
                e.child.return = e, e = e.child;
                continue
            }
            if (e === t) break e;
            for (; e.sibling === null;) {
                if (e.return === null || e.return === t) break e;
                e = e.return
            }
            e.sibling.return = e.return, e = e.sibling
        }
        r &= 1
    }
    if (fe(we, r), !(t.mode & 1)) t.memoizedState = null;
    else switch (i) {
        case "forwards":
            for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && qo(e) === null && (i = n), n = n.sibling;
            n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), ns(t, !1, i, n, o);
            break;
        case "backwards":
            for (n = null, i = t.child, t.child = null; i !== null;) {
                if (e = i.alternate, e !== null && qo(e) === null) {
                    t.child = i;
                    break
                }
                e = i.sibling, i.sibling = n, n = i, i = e
            }
            ns(t, !0, n, null, o);
            break;
        case "together":
            ns(t, !1, null, null, void 0);
            break;
        default:
            t.memoizedState = null
    }
    return t.child
}

function So(e, t) {
    !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2)
}

function tn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), Wn |= t.lanes, !(n & t.childLanes)) return null;
    if (e !== null && t.child !== e.child) throw Error(O(153));
    if (t.child !== null) {
        for (e = t.child, n = Sn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Sn(e, e.pendingProps), n.return = t;
        n.sibling = null
    }
    return t.child
}

function _0(e, t, n) {
    switch (t.tag) {
        case 3:
            ch(t), Er();
            break;
        case 5:
            Ff(t);
            break;
        case 1:
            it(t.type) && Ho(t);
            break;
        case 4:
            Va(t, t.stateNode.containerInfo);
            break;
        case 10:
            var r = t.type._context,
                i = t.memoizedProps.value;
            fe(Qo, r._currentValue), r._currentValue = i;
            break;
        case 13:
            if (r = t.memoizedState, r !== null) return r.dehydrated !== null ? (fe(we, we.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? dh(e, t, n) : (fe(we, we.current & 1), e = tn(e, t, n), e !== null ? e.sibling : null);
            fe(we, we.current & 1);
            break;
        case 19:
            if (r = (n & t.childLanes) !== 0, e.flags & 128) {
                if (r) return fh(e, t, n);
                t.flags |= 128
            }
            if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), fe(we, we.current), r) break;
            return null;
        case 22:
        case 23:
            return t.lanes = 0, ah(e, t, n)
    }
    return tn(e, t, n)
}
var hh, Gs, ph, mh;
hh = function(e, t) {
    for (var n = t.child; n !== null;) {
        if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
        else if (n.tag !== 4 && n.child !== null) {
            n.child.return = n, n = n.child;
            continue
        }
        if (n === t) break;
        for (; n.sibling === null;) {
            if (n.return === null || n.return === t) return;
            n = n.return
        }
        n.sibling.return = n.return, n = n.sibling
    }
};
Gs = function() {};
ph = function(e, t, n, r) {
    var i = e.memoizedProps;
    if (i !== r) {
        e = t.stateNode, Fn(Ut.current);
        var o = null;
        switch (n) {
            case "input":
                i = ws(e, i), r = ws(e, r), o = [];
                break;
            case "select":
                i = ke({}, i, {
                    value: void 0
                }), r = ke({}, r, {
                    value: void 0
                }), o = [];
                break;
            case "textarea":
                i = Ss(e, i), r = Ss(e, r), o = [];
                break;
            default:
                typeof i.onClick != "function" && typeof r.onClick == "function" && (e.onclick = $o)
        }
        _s(n, r);
        var l;
        n = null;
        for (u in i)
            if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null)
                if (u === "style") {
                    var s = i[u];
                    for (l in s) s.hasOwnProperty(l) && (n || (n = {}), n[l] = "")
                } else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (ci.hasOwnProperty(u) ? o || (o = []) : (o = o || []).push(u, null));
        for (u in r) {
            var a = r[u];
            if (s = i != null ? i[u] : void 0, r.hasOwnProperty(u) && a !== s && (a != null || s != null))
                if (u === "style")
                    if (s) {
                        for (l in s) !s.hasOwnProperty(l) || a && a.hasOwnProperty(l) || (n || (n = {}), n[l] = "");
                        for (l in a) a.hasOwnProperty(l) && s[l] !== a[l] && (n || (n = {}), n[l] = a[l])
                    } else n || (o || (o = []), o.push(u, n)), n = a;
            else u === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, s = s ? s.__html : void 0, a != null && s !== a && (o = o || []).push(u, a)) : u === "children" ? typeof a != "string" && typeof a != "number" || (o = o || []).push(u, "" + a) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (ci.hasOwnProperty(u) ? (a != null && u === "onScroll" && pe("scroll", e), o || s === a || (o = [])) : (o = o || []).push(u, a))
        }
        n && (o = o || []).push("style", n);
        var u = o;
        (t.updateQueue = u) && (t.flags |= 4)
    }
};
mh = function(e, t, n, r) {
    n !== r && (t.flags |= 4)
};

function $r(e, t) {
    if (!ge) switch (e.tailMode) {
        case "hidden":
            t = e.tail;
            for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
            n === null ? e.tail = null : n.sibling = null;
            break;
        case "collapsed":
            n = e.tail;
            for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
            r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null
    }
}

function Ke(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
    if (t)
        for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 14680064, r |= i.flags & 14680064, i.return = e, i = i.sibling;
    else
        for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
    return e.subtreeFlags |= r, e.childLanes = n, t
}

function C0(e, t, n) {
    var r = t.pendingProps;
    switch (Aa(t), t.tag) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
            return Ke(t), null;
        case 1:
            return it(t.type) && Vo(), Ke(t), null;
        case 3:
            return r = t.stateNode, Cr(), me(rt), me(Xe), Wa(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (no(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Pt !== null && (oa(Pt), Pt = null))), Gs(e, t), Ke(t), null;
        case 5:
            Ha(t);
            var i = Fn(Si.current);
            if (n = t.type, e !== null && t.stateNode != null) ph(e, t, n, r, i), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
            else {
                if (!r) {
                    if (t.stateNode === null) throw Error(O(166));
                    return Ke(t), null
                }
                if (e = Fn(Ut.current), no(t)) {
                    r = t.stateNode, n = t.type;
                    var o = t.memoizedProps;
                    switch (r[Ft] = t, r[xi] = o, e = (t.mode & 1) !== 0, n) {
                        case "dialog":
                            pe("cancel", r), pe("close", r);
                            break;
                        case "iframe":
                        case "object":
                        case "embed":
                            pe("load", r);
                            break;
                        case "video":
                        case "audio":
                            for (i = 0; i < Jr.length; i++) pe(Jr[i], r);
                            break;
                        case "source":
                            pe("error", r);
                            break;
                        case "img":
                        case "image":
                        case "link":
                            pe("error", r), pe("load", r);
                            break;
                        case "details":
                            pe("toggle", r);
                            break;
                        case "input":
                            Iu(r, o), pe("invalid", r);
                            break;
                        case "select":
                            r._wrapperState = {
                                wasMultiple: !!o.multiple
                            }, pe("invalid", r);
                            break;
                        case "textarea":
                            Bu(r, o), pe("invalid", r)
                    }
                    _s(n, o), i = null;
                    for (var l in o)
                        if (o.hasOwnProperty(l)) {
                            var s = o[l];
                            l === "children" ? typeof s == "string" ? r.textContent !== s && (o.suppressHydrationWarning !== !0 && to(r.textContent, s, e), i = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (o.suppressHydrationWarning !== !0 && to(r.textContent, s, e), i = ["children", "" + s]) : ci.hasOwnProperty(l) && s != null && l === "onScroll" && pe("scroll", r)
                        } switch (n) {
                        case "input":
                            Qi(r), Uu(r, o, !0);
                            break;
                        case "textarea":
                            Qi(r), $u(r);
                            break;
                        case "select":
                        case "option":
                            break;
                        default:
                            typeof o.onClick == "function" && (r.onclick = $o)
                    }
                    r = i, t.updateQueue = r, r !== null && (t.flags |= 4)
                } else {
                    l = i.nodeType === 9 ? i : i.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = $d(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = l.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = l.createElement(n, {
                        is: r.is
                    }) : (e = l.createElement(n), n === "select" && (l = e, r.multiple ? l.multiple = !0 : r.size && (l.size = r.size))) : e = l.createElementNS(e, n), e[Ft] = t, e[xi] = r, hh(e, t, !1, !1), t.stateNode = e;
                    e: {
                        switch (l = Cs(n, r), n) {
                            case "dialog":
                                pe("cancel", e), pe("close", e), i = r;
                                break;
                            case "iframe":
                            case "object":
                            case "embed":
                                pe("load", e), i = r;
                                break;
                            case "video":
                            case "audio":
                                for (i = 0; i < Jr.length; i++) pe(Jr[i], e);
                                i = r;
                                break;
                            case "source":
                                pe("error", e), i = r;
                                break;
                            case "img":
                            case "image":
                            case "link":
                                pe("error", e), pe("load", e), i = r;
                                break;
                            case "details":
                                pe("toggle", e), i = r;
                                break;
                            case "input":
                                Iu(e, r), i = ws(e, r), pe("invalid", e);
                                break;
                            case "option":
                                i = r;
                                break;
                            case "select":
                                e._wrapperState = {
                                    wasMultiple: !!r.multiple
                                }, i = ke({}, r, {
                                    value: void 0
                                }), pe("invalid", e);
                                break;
                            case "textarea":
                                Bu(e, r), i = Ss(e, r), pe("invalid", e);
                                break;
                            default:
                                i = r
                        }
                        _s(n, i),
                        s = i;
                        for (o in s)
                            if (s.hasOwnProperty(o)) {
                                var a = s[o];
                                o === "style" ? Wd(e, a) : o === "dangerouslySetInnerHTML" ? (a = a ? a.__html : void 0, a != null && Vd(e, a)) : o === "children" ? typeof a == "string" ? (n !== "textarea" || a !== "") && di(e, a) : typeof a == "number" && di(e, "" + a) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (ci.hasOwnProperty(o) ? a != null && o === "onScroll" && pe("scroll", e) : a != null && ka(e, o, a, l))
                            } switch (n) {
                            case "input":
                                Qi(e), Uu(e, r, !1);
                                break;
                            case "textarea":
                                Qi(e), $u(e);
                                break;
                            case "option":
                                r.value != null && e.setAttribute("value", "" + _n(r.value));
                                break;
                            case "select":
                                e.multiple = !!r.multiple, o = r.value, o != null ? pr(e, !!r.multiple, o, !1) : r.defaultValue != null && pr(e, !!r.multiple, r.defaultValue, !0);
                                break;
                            default:
                                typeof i.onClick == "function" && (e.onclick = $o)
                        }
                        switch (n) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                r = !!r.autoFocus;
                                break e;
                            case "img":
                                r = !0;
                                break e;
                            default:
                                r = !1
                        }
                    }
                    r && (t.flags |= 4)
                }
                t.ref !== null && (t.flags |= 512, t.flags |= 2097152)
            }
            return Ke(t), null;
        case 6:
            if (e && t.stateNode != null) mh(e, t, e.memoizedProps, r);
            else {
                if (typeof r != "string" && t.stateNode === null) throw Error(O(166));
                if (n = Fn(Si.current), Fn(Ut.current), no(t)) {
                    if (r = t.stateNode, n = t.memoizedProps, r[Ft] = t, (o = r.nodeValue !== n) && (e = ut, e !== null)) switch (e.tag) {
                        case 3:
                            to(r.nodeValue, n, (e.mode & 1) !== 0);
                            break;
                        case 5:
                            e.memoizedProps.suppressHydrationWarning !== !0 && to(r.nodeValue, n, (e.mode & 1) !== 0)
                    }
                    o && (t.flags |= 4)
                } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ft] = t, t.stateNode = r
            }
            return Ke(t), null;
        case 13:
            if (me(we), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                if (ge && at !== null && t.mode & 1 && !(t.flags & 128)) Df(), Er(), t.flags |= 98560, o = !1;
                else if (o = no(t), r !== null && r.dehydrated !== null) {
                    if (e === null) {
                        if (!o) throw Error(O(318));
                        if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(O(317));
                        o[Ft] = t
                    } else Er(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
                    Ke(t), o = !1
                } else Pt !== null && (oa(Pt), Pt = null), o = !0;
                if (!o) return t.flags & 65536 ? t : null
            }
            return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || we.current & 1 ? De === 0 && (De = 3) : ru())), t.updateQueue !== null && (t.flags |= 4), Ke(t), null);
        case 4:
            return Cr(), Gs(e, t), e === null && vi(t.stateNode.containerInfo), Ke(t), null;
        case 10:
            return Ua(t.type._context), Ke(t), null;
        case 17:
            return it(t.type) && Vo(), Ke(t), null;
        case 19:
            if (me(we), o = t.memoizedState, o === null) return Ke(t), null;
            if (r = (t.flags & 128) !== 0, l = o.rendering, l === null)
                if (r) $r(o, !1);
                else {
                    if (De !== 0 || e !== null && e.flags & 128)
                        for (e = t.child; e !== null;) {
                            if (l = qo(e), l !== null) {
                                for (t.flags |= 128, $r(o, !1), r = l.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null;) o = n, e = r, o.flags &= 14680066, l = o.alternate, l === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = l.childLanes, o.lanes = l.lanes, o.child = l.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = l.memoizedProps, o.memoizedState = l.memoizedState, o.updateQueue = l.updateQueue, o.type = l.type, e = l.dependencies, o.dependencies = e === null ? null : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext
                                }), n = n.sibling;
                                return fe(we, we.current & 1 | 2), t.child
                            }
                            e = e.sibling
                        }
                    o.tail !== null && _e() > Rr && (t.flags |= 128, r = !0, $r(o, !1), t.lanes = 4194304)
                }
            else {
                if (!r)
                    if (e = qo(l), e !== null) {
                        if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), $r(o, !0), o.tail === null && o.tailMode === "hidden" && !l.alternate && !ge) return Ke(t), null
                    } else 2 * _e() - o.renderingStartTime > Rr && n !== 1073741824 && (t.flags |= 128, r = !0, $r(o, !1), t.lanes = 4194304);
                o.isBackwards ? (l.sibling = t.child, t.child = l) : (n = o.last, n !== null ? n.sibling = l : t.child = l, o.last = l)
            }
            return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = _e(), t.sibling = null, n = we.current, fe(we, r ? n & 1 | 2 : n & 1), t) : (Ke(t), null);
        case 22:
        case 23:
            return nu(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? lt & 1073741824 && (Ke(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ke(t), null;
        case 24:
            return null;
        case 25:
            return null
    }
    throw Error(O(156, t.tag))
}

function N0(e, t) {
    switch (Aa(t), t.tag) {
        case 1:
            return it(t.type) && Vo(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 3:
            return Cr(), me(rt), me(Xe), Wa(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
        case 5:
            return Ha(t), null;
        case 13:
            if (me(we), e = t.memoizedState, e !== null && e.dehydrated !== null) {
                if (t.alternate === null) throw Error(O(340));
                Er()
            }
            return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
        case 19:
            return me(we), null;
        case 4:
            return Cr(), null;
        case 10:
            return Ua(t.type._context), null;
        case 22:
        case 23:
            return nu(), null;
        case 24:
            return null;
        default:
            return null
    }
}
var oo = !1,
    Qe = !1,
    R0 = typeof WeakSet == "function" ? WeakSet : Set,
    z = null;

function dr(e, t) {
    var n = e.ref;
    if (n !== null)
        if (typeof n == "function") try {
            n(null)
        } catch (r) {
            Ee(e, t, r)
        } else n.current = null
}

function Js(e, t, n) {
    try {
        n()
    } catch (r) {
        Ee(e, t, r)
    }
}
var jc = !1;

function P0(e, t) {
    if (bs = Io, e = xf(), Ma(e)) {
        if ("selectionStart" in e) var n = {
            start: e.selectionStart,
            end: e.selectionEnd
        };
        else e: {
            n = (n = e.ownerDocument) && n.defaultView || window;
            var r = n.getSelection && n.getSelection();
            if (r && r.rangeCount !== 0) {
                n = r.anchorNode;
                var i = r.anchorOffset,
                    o = r.focusNode;
                r = r.focusOffset;
                try {
                    n.nodeType, o.nodeType
                } catch {
                    n = null;
                    break e
                }
                var l = 0,
                    s = -1,
                    a = -1,
                    u = 0,
                    h = 0,
                    m = e,
                    p = null;
                t: for (;;) {
                    for (var w; m !== n || i !== 0 && m.nodeType !== 3 || (s = l + i), m !== o || r !== 0 && m.nodeType !== 3 || (a = l + r), m.nodeType === 3 && (l += m.nodeValue.length), (w = m.firstChild) !== null;) p = m, m = w;
                    for (;;) {
                        if (m === e) break t;
                        if (p === n && ++u === i && (s = l), p === o && ++h === r && (a = l), (w = m.nextSibling) !== null) break;
                        m = p, p = m.parentNode
                    }
                    m = w
                }
                n = s === -1 || a === -1 ? null : {
                    start: s,
                    end: a
                }
            } else n = null
        }
        n = n || {
            start: 0,
            end: 0
        }
    } else n = null;
    for (As = {
            focusedElem: e,
            selectionRange: n
        }, Io = !1, z = t; z !== null;)
        if (t = z, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, z = e;
        else
            for (; z !== null;) {
                t = z;
                try {
                    var S = t.alternate;
                    if (t.flags & 1024) switch (t.tag) {
                        case 0:
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if (S !== null) {
                                var E = S.memoizedProps,
                                    N = S.memoizedState,
                                    c = t.stateNode,
                                    d = c.getSnapshotBeforeUpdate(t.elementType === t.type ? E : _t(t.type, E), N);
                                c.__reactInternalSnapshotBeforeUpdate = d
                            }
                            break;
                        case 3:
                            var y = t.stateNode.containerInfo;
                            y.nodeType === 1 ? y.textContent = "" : y.nodeType === 9 && y.documentElement && y.removeChild(y.documentElement);
                            break;
                        case 5:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            throw Error(O(163))
                    }
                } catch (C) {
                    Ee(t, t.return, C)
                }
                if (e = t.sibling, e !== null) {
                    e.return = t.return, z = e;
                    break
                }
                z = t.return
            }
    return S = jc, jc = !1, S
}

function si(e, t, n) {
    var r = t.updateQueue;
    if (r = r !== null ? r.lastEffect : null, r !== null) {
        var i = r = r.next;
        do {
            if ((i.tag & e) === e) {
                var o = i.destroy;
                i.destroy = void 0, o !== void 0 && Js(t, n, o)
            }
            i = i.next
        } while (i !== r)
    }
}

function yl(e, t) {
    if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
        var n = t = t.next;
        do {
            if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r()
            }
            n = n.next
        } while (n !== t)
    }
}

function Zs(e) {
    var t = e.ref;
    if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
            case 5:
                e = n;
                break;
            default:
                e = n
        }
        typeof t == "function" ? t(e) : t.current = e
    }
}

function yh(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, yh(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ft], delete t[xi], delete t[Is], delete t[c0], delete t[d0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
}

function gh(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4
}

function Oc(e) {
    e: for (;;) {
        for (; e.sibling === null;) {
            if (e.return === null || gh(e.return)) return null;
            e = e.return
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
            if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
            e.child.return = e, e = e.child
        }
        if (!(e.flags & 2)) return e.stateNode
    }
}

function ea(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = $o));
    else if (r !== 4 && (e = e.child, e !== null))
        for (ea(e, t, n), e = e.sibling; e !== null;) ea(e, t, n), e = e.sibling
}

function ta(e, t, n) {
    var r = e.tag;
    if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
    else if (r !== 4 && (e = e.child, e !== null))
        for (ta(e, t, n), e = e.sibling; e !== null;) ta(e, t, n), e = e.sibling
}
var Ue = null,
    Ct = !1;

function ln(e, t, n) {
    for (n = n.child; n !== null;) vh(e, t, n), n = n.sibling
}

function vh(e, t, n) {
    if (It && typeof It.onCommitFiberUnmount == "function") try {
        It.onCommitFiberUnmount(al, n)
    } catch {}
    switch (n.tag) {
        case 5:
            Qe || dr(n, t);
        case 6:
            var r = Ue,
                i = Ct;
            Ue = null, ln(e, t, n), Ue = r, Ct = i, Ue !== null && (Ct ? (e = Ue, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : Ue.removeChild(n.stateNode));
            break;
        case 18:
            Ue !== null && (Ct ? (e = Ue, n = n.stateNode, e.nodeType === 8 ? Yl(e.parentNode, n) : e.nodeType === 1 && Yl(e, n), mi(e)) : Yl(Ue, n.stateNode));
            break;
        case 4:
            r = Ue, i = Ct, Ue = n.stateNode.containerInfo, Ct = !0, ln(e, t, n), Ue = r, Ct = i;
            break;
        case 0:
        case 11:
        case 14:
        case 15:
            if (!Qe && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
                i = r = r.next;
                do {
                    var o = i,
                        l = o.destroy;
                    o = o.tag, l !== void 0 && (o & 2 || o & 4) && Js(n, t, l), i = i.next
                } while (i !== r)
            }
            ln(e, t, n);
            break;
        case 1:
            if (!Qe && (dr(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
                r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount()
            } catch (s) {
                Ee(n, t, s)
            }
            ln(e, t, n);
            break;
        case 21:
            ln(e, t, n);
            break;
        case 22:
            n.mode & 1 ? (Qe = (r = Qe) || n.memoizedState !== null, ln(e, t, n), Qe = r) : ln(e, t, n);
            break;
        default:
            ln(e, t, n)
    }
}

function Dc(e) {
    var t = e.updateQueue;
    if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        n === null && (n = e.stateNode = new R0), t.forEach(function(r) {
            var i = z0.bind(null, e, r);
            n.has(r) || (n.add(r), r.then(i, i))
        })
    }
}

function Et(e, t) {
    var n = t.deletions;
    if (n !== null)
        for (var r = 0; r < n.length; r++) {
            var i = n[r];
            try {
                var o = e,
                    l = t,
                    s = l;
                e: for (; s !== null;) {
                    switch (s.tag) {
                        case 5:
                            Ue = s.stateNode, Ct = !1;
                            break e;
                        case 3:
                            Ue = s.stateNode.containerInfo, Ct = !0;
                            break e;
                        case 4:
                            Ue = s.stateNode.containerInfo, Ct = !0;
                            break e
                    }
                    s = s.return
                }
                if (Ue === null) throw Error(O(160));
                vh(o, l, i), Ue = null, Ct = !1;
                var a = i.alternate;
                a !== null && (a.return = null), i.return = null
            } catch (u) {
                Ee(i, t, u)
            }
        }
    if (t.subtreeFlags & 12854)
        for (t = t.child; t !== null;) wh(t, e), t = t.sibling
}

function wh(e, t) {
    var n = e.alternate,
        r = e.flags;
    switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
            if (Et(t, e), bt(e), r & 4) {
                try {
                    si(3, e, e.return), yl(3, e)
                } catch (E) {
                    Ee(e, e.return, E)
                }
                try {
                    si(5, e, e.return)
                } catch (E) {
                    Ee(e, e.return, E)
                }
            }
            break;
        case 1:
            Et(t, e), bt(e), r & 512 && n !== null && dr(n, n.return);
            break;
        case 5:
            if (Et(t, e), bt(e), r & 512 && n !== null && dr(n, n.return), e.flags & 32) {
                var i = e.stateNode;
                try {
                    di(i, "")
                } catch (E) {
                    Ee(e, e.return, E)
                }
            }
            if (r & 4 && (i = e.stateNode, i != null)) {
                var o = e.memoizedProps,
                    l = n !== null ? n.memoizedProps : o,
                    s = e.type,
                    a = e.updateQueue;
                if (e.updateQueue = null, a !== null) try {
                    s === "input" && o.type === "radio" && o.name != null && Ud(i, o), Cs(s, l);
                    var u = Cs(s, o);
                    for (l = 0; l < a.length; l += 2) {
                        var h = a[l],
                            m = a[l + 1];
                        h === "style" ? Wd(i, m) : h === "dangerouslySetInnerHTML" ? Vd(i, m) : h === "children" ? di(i, m) : ka(i, h, m, u)
                    }
                    switch (s) {
                        case "input":
                            xs(i, o);
                            break;
                        case "textarea":
                            Bd(i, o);
                            break;
                        case "select":
                            var p = i._wrapperState.wasMultiple;
                            i._wrapperState.wasMultiple = !!o.multiple;
                            var w = o.value;
                            w != null ? pr(i, !!o.multiple, w, !1) : p !== !!o.multiple && (o.defaultValue != null ? pr(i, !!o.multiple, o.defaultValue, !0) : pr(i, !!o.multiple, o.multiple ? [] : "", !1))
                    }
                    i[xi] = o
                } catch (E) {
                    Ee(e, e.return, E)
                }
            }
            break;
        case 6:
            if (Et(t, e), bt(e), r & 4) {
                if (e.stateNode === null) throw Error(O(162));
                i = e.stateNode, o = e.memoizedProps;
                try {
                    i.nodeValue = o
                } catch (E) {
                    Ee(e, e.return, E)
                }
            }
            break;
        case 3:
            if (Et(t, e), bt(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
                mi(t.containerInfo)
            } catch (E) {
                Ee(e, e.return, E)
            }
            break;
        case 4:
            Et(t, e), bt(e);
            break;
        case 13:
            Et(t, e), bt(e), i = e.child, i.flags & 8192 && (o = i.memoizedState !== null, i.stateNode.isHidden = o, !o || i.alternate !== null && i.alternate.memoizedState !== null || (eu = _e())), r & 4 && Dc(e);
            break;
        case 22:
            if (h = n !== null && n.memoizedState !== null, e.mode & 1 ? (Qe = (u = Qe) || h, Et(t, e), Qe = u) : Et(t, e), bt(e), r & 8192) {
                if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !h && e.mode & 1)
                    for (z = e, h = e.child; h !== null;) {
                        for (m = z = h; z !== null;) {
                            switch (p = z, w = p.child, p.tag) {
                                case 0:
                                case 11:
                                case 14:
                                case 15:
                                    si(4, p, p.return);
                                    break;
                                case 1:
                                    dr(p, p.return);
                                    var S = p.stateNode;
                                    if (typeof S.componentWillUnmount == "function") {
                                        r = p, n = p.return;
                                        try {
                                            t = r, S.props = t.memoizedProps, S.state = t.memoizedState, S.componentWillUnmount()
                                        } catch (E) {
                                            Ee(r, n, E)
                                        }
                                    }
                                    break;
                                case 5:
                                    dr(p, p.return);
                                    break;
                                case 22:
                                    if (p.memoizedState !== null) {
                                        bc(m);
                                        continue
                                    }
                            }
                            w !== null ? (w.return = p, z = w) : bc(m)
                        }
                        h = h.sibling
                    }
                e: for (h = null, m = e;;) {
                    if (m.tag === 5) {
                        if (h === null) {
                            h = m;
                            try {
                                i = m.stateNode, u ? (o = i.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (s = m.stateNode, a = m.memoizedProps.style, l = a != null && a.hasOwnProperty("display") ? a.display : null, s.style.display = Hd("display", l))
                            } catch (E) {
                                Ee(e, e.return, E)
                            }
                        }
                    } else if (m.tag === 6) {
                        if (h === null) try {
                            m.stateNode.nodeValue = u ? "" : m.memoizedProps
                        } catch (E) {
                            Ee(e, e.return, E)
                        }
                    } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
                        m.child.return = m, m = m.child;
                        continue
                    }
                    if (m === e) break e;
                    for (; m.sibling === null;) {
                        if (m.return === null || m.return === e) break e;
                        h === m && (h = null), m = m.return
                    }
                    h === m && (h = null), m.sibling.return = m.return, m = m.sibling
                }
            }
            break;
        case 19:
            Et(t, e), bt(e), r & 4 && Dc(e);
            break;
        case 21:
            break;
        default:
            Et(t, e), bt(e)
    }
}

function bt(e) {
    var t = e.flags;
    if (t & 2) {
        try {
            e: {
                for (var n = e.return; n !== null;) {
                    if (gh(n)) {
                        var r = n;
                        break e
                    }
                    n = n.return
                }
                throw Error(O(160))
            }
            switch (r.tag) {
                case 5:
                    var i = r.stateNode;
                    r.flags & 32 && (di(i, ""), r.flags &= -33);
                    var o = Oc(e);
                    ta(e, o, i);
                    break;
                case 3:
                case 4:
                    var l = r.stateNode.containerInfo,
                        s = Oc(e);
                    ea(e, s, l);
                    break;
                default:
                    throw Error(O(161))
            }
        }
        catch (a) {
            Ee(e, e.return, a)
        }
        e.flags &= -3
    }
    t & 4096 && (e.flags &= -4097)
}

function L0(e, t, n) {
    z = e, xh(e)
}

function xh(e, t, n) {
    for (var r = (e.mode & 1) !== 0; z !== null;) {
        var i = z,
            o = i.child;
        if (i.tag === 22 && r) {
            var l = i.memoizedState !== null || oo;
            if (!l) {
                var s = i.alternate,
                    a = s !== null && s.memoizedState !== null || Qe;
                s = oo;
                var u = Qe;
                if (oo = l, (Qe = a) && !u)
                    for (z = i; z !== null;) l = z, a = l.child, l.tag === 22 && l.memoizedState !== null ? Ac(i) : a !== null ? (a.return = l, z = a) : Ac(i);
                for (; o !== null;) z = o, xh(o), o = o.sibling;
                z = i, oo = s, Qe = u
            }
            Mc(e)
        } else i.subtreeFlags & 8772 && o !== null ? (o.return = i, z = o) : Mc(e)
    }
}

function Mc(e) {
    for (; z !== null;) {
        var t = z;
        if (t.flags & 8772) {
            var n = t.alternate;
            try {
                if (t.flags & 8772) switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                        Qe || yl(5, t);
                        break;
                    case 1:
                        var r = t.stateNode;
                        if (t.flags & 4 && !Qe)
                            if (n === null) r.componentDidMount();
                            else {
                                var i = t.elementType === t.type ? n.memoizedProps : _t(t.type, n.memoizedProps);
                                r.componentDidUpdate(i, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate)
                            } var o = t.updateQueue;
                        o !== null && vc(t, o, r);
                        break;
                    case 3:
                        var l = t.updateQueue;
                        if (l !== null) {
                            if (n = null, t.child !== null) switch (t.child.tag) {
                                case 5:
                                    n = t.child.stateNode;
                                    break;
                                case 1:
                                    n = t.child.stateNode
                            }
                            vc(t, l, n)
                        }
                        break;
                    case 5:
                        var s = t.stateNode;
                        if (n === null && t.flags & 4) {
                            n = s;
                            var a = t.memoizedProps;
                            switch (t.type) {
                                case "button":
                                case "input":
                                case "select":
                                case "textarea":
                                    a.autoFocus && n.focus();
                                    break;
                                case "img":
                                    a.src && (n.src = a.src)
                            }
                        }
                        break;
                    case 6:
                        break;
                    case 4:
                        break;
                    case 12:
                        break;
                    case 13:
                        if (t.memoizedState === null) {
                            var u = t.alternate;
                            if (u !== null) {
                                var h = u.memoizedState;
                                if (h !== null) {
                                    var m = h.dehydrated;
                                    m !== null && mi(m)
                                }
                            }
                        }
                        break;
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                        break;
                    default:
                        throw Error(O(163))
                }
                Qe || t.flags & 512 && Zs(t)
            } catch (p) {
                Ee(t, t.return, p)
            }
        }
        if (t === e) {
            z = null;
            break
        }
        if (n = t.sibling, n !== null) {
            n.return = t.return, z = n;
            break
        }
        z = t.return
    }
}

function bc(e) {
    for (; z !== null;) {
        var t = z;
        if (t === e) {
            z = null;
            break
        }
        var n = t.sibling;
        if (n !== null) {
            n.return = t.return, z = n;
            break
        }
        z = t.return
    }
}

function Ac(e) {
    for (; z !== null;) {
        var t = z;
        try {
            switch (t.tag) {
                case 0:
                case 11:
                case 15:
                    var n = t.return;
                    try {
                        yl(4, t)
                    } catch (a) {
                        Ee(t, n, a)
                    }
                    break;
                case 1:
                    var r = t.stateNode;
                    if (typeof r.componentDidMount == "function") {
                        var i = t.return;
                        try {
                            r.componentDidMount()
                        } catch (a) {
                            Ee(t, i, a)
                        }
                    }
                    var o = t.return;
                    try {
                        Zs(t)
                    } catch (a) {
                        Ee(t, o, a)
                    }
                    break;
                case 5:
                    var l = t.return;
                    try {
                        Zs(t)
                    } catch (a) {
                        Ee(t, l, a)
                    }
            }
        } catch (a) {
            Ee(t, t.return, a)
        }
        if (t === e) {
            z = null;
            break
        }
        var s = t.sibling;
        if (s !== null) {
            s.return = t.return, z = s;
            break
        }
        z = t.return
    }
}
var T0 = Math.ceil,
    Zo = nn.ReactCurrentDispatcher,
    Ja = nn.ReactCurrentOwner,
    wt = nn.ReactCurrentBatchConfig,
    ie = 0,
    Ae = null,
    Re = null,
    Be = 0,
    lt = 0,
    fr = Pn(0),
    De = 0,
    Ni = null,
    Wn = 0,
    gl = 0,
    Za = 0,
    ai = null,
    tt = null,
    eu = 0,
    Rr = 1 / 0,
    Qt = null,
    el = !1,
    na = null,
    xn = null,
    lo = !1,
    pn = null,
    tl = 0,
    ui = 0,
    ra = null,
    Eo = -1,
    _o = 0;

function Ge() {
    return ie & 6 ? _e() : Eo !== -1 ? Eo : Eo = _e()
}

function kn(e) {
    return e.mode & 1 ? ie & 2 && Be !== 0 ? Be & -Be : h0.transition !== null ? (_o === 0 && (_o = rf()), _o) : (e = se, e !== 0 || (e = window.event, e = e === void 0 ? 16 : df(e.type)), e) : 1
}

function Tt(e, t, n, r) {
    if (50 < ui) throw ui = 0, ra = null, Error(O(185));
    Li(e, n, r), (!(ie & 2) || e !== Ae) && (e === Ae && (!(ie & 2) && (gl |= n), De === 4 && dn(e, Be)), ot(e, r), n === 1 && ie === 0 && !(t.mode & 1) && (Rr = _e() + 500, hl && Ln()))
}

function ot(e, t) {
    var n = e.callbackNode;
    hm(e, t);
    var r = Fo(e, e === Ae ? Be : 0);
    if (r === 0) n !== null && Wu(n), e.callbackNode = null, e.callbackPriority = 0;
    else if (t = r & -r, e.callbackPriority !== t) {
        if (n != null && Wu(n), t === 1) e.tag === 0 ? f0(zc.bind(null, e)) : Tf(zc.bind(null, e)), a0(function() {
            !(ie & 6) && Ln()
        }), n = null;
        else {
            switch ( of (r)) {
                case 1:
                    n = Na;
                    break;
                case 4:
                    n = tf;
                    break;
                case 16:
                    n = zo;
                    break;
                case 536870912:
                    n = nf;
                    break;
                default:
                    n = zo
            }
            n = Ph(n, kh.bind(null, e))
        }
        e.callbackPriority = t, e.callbackNode = n
    }
}

function kh(e, t) {
    if (Eo = -1, _o = 0, ie & 6) throw Error(O(327));
    var n = e.callbackNode;
    if (wr() && e.callbackNode !== n) return null;
    var r = Fo(e, e === Ae ? Be : 0);
    if (r === 0) return null;
    if (r & 30 || r & e.expiredLanes || t) t = nl(e, r);
    else {
        t = r;
        var i = ie;
        ie |= 2;
        var o = Eh();
        (Ae !== e || Be !== t) && (Qt = null, Rr = _e() + 500, Un(e, t));
        do try {
            D0();
            break
        } catch (s) {
            Sh(e, s)
        }
        while (!0);
        Ia(), Zo.current = o, ie = i, Re !== null ? t = 0 : (Ae = null, Be = 0, t = De)
    }
    if (t !== 0) {
        if (t === 2 && (i = Ts(e), i !== 0 && (r = i, t = ia(e, i))), t === 1) throw n = Ni, Un(e, 0), dn(e, r), ot(e, _e()), n;
        if (t === 6) dn(e, r);
        else {
            if (i = e.current.alternate, !(r & 30) && !j0(i) && (t = nl(e, r), t === 2 && (o = Ts(e), o !== 0 && (r = o, t = ia(e, o))), t === 1)) throw n = Ni, Un(e, 0), dn(e, r), ot(e, _e()), n;
            switch (e.finishedWork = i, e.finishedLanes = r, t) {
                case 0:
                case 1:
                    throw Error(O(345));
                case 2:
                    Mn(e, tt, Qt);
                    break;
                case 3:
                    if (dn(e, r), (r & 130023424) === r && (t = eu + 500 - _e(), 10 < t)) {
                        if (Fo(e, 0) !== 0) break;
                        if (i = e.suspendedLanes, (i & r) !== r) {
                            Ge(), e.pingedLanes |= e.suspendedLanes & i;
                            break
                        }
                        e.timeoutHandle = Fs(Mn.bind(null, e, tt, Qt), t);
                        break
                    }
                    Mn(e, tt, Qt);
                    break;
                case 4:
                    if (dn(e, r), (r & 4194240) === r) break;
                    for (t = e.eventTimes, i = -1; 0 < r;) {
                        var l = 31 - Lt(r);
                        o = 1 << l, l = t[l], l > i && (i = l), r &= ~o
                    }
                    if (r = i, r = _e() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * T0(r / 1960)) - r, 10 < r) {
                        e.timeoutHandle = Fs(Mn.bind(null, e, tt, Qt), r);
                        break
                    }
                    Mn(e, tt, Qt);
                    break;
                case 5:
                    Mn(e, tt, Qt);
                    break;
                default:
                    throw Error(O(329))
            }
        }
    }
    return ot(e, _e()), e.callbackNode === n ? kh.bind(null, e) : null
}

function ia(e, t) {
    var n = ai;
    return e.current.memoizedState.isDehydrated && (Un(e, t).flags |= 256), e = nl(e, t), e !== 2 && (t = tt, tt = n, t !== null && oa(t)), e
}

function oa(e) {
    tt === null ? tt = e : tt.push.apply(tt, e)
}

function j0(e) {
    for (var t = e;;) {
        if (t.flags & 16384) {
            var n = t.updateQueue;
            if (n !== null && (n = n.stores, n !== null))
                for (var r = 0; r < n.length; r++) {
                    var i = n[r],
                        o = i.getSnapshot;
                    i = i.value;
                    try {
                        if (!jt(o(), i)) return !1
                    } catch {
                        return !1
                    }
                }
        }
        if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
        else {
            if (t === e) break;
            for (; t.sibling === null;) {
                if (t.return === null || t.return === e) return !0;
                t = t.return
            }
            t.sibling.return = t.return, t = t.sibling
        }
    }
    return !0
}

function dn(e, t) {
    for (t &= ~Za, t &= ~gl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t;) {
        var n = 31 - Lt(t),
            r = 1 << n;
        e[n] = -1, t &= ~r
    }
}

function zc(e) {
    if (ie & 6) throw Error(O(327));
    wr();
    var t = Fo(e, 0);
    if (!(t & 1)) return ot(e, _e()), null;
    var n = nl(e, t);
    if (e.tag !== 0 && n === 2) {
        var r = Ts(e);
        r !== 0 && (t = r, n = ia(e, r))
    }
    if (n === 1) throw n = Ni, Un(e, 0), dn(e, t), ot(e, _e()), n;
    if (n === 6) throw Error(O(345));
    return e.finishedWork = e.current.alternate, e.finishedLanes = t, Mn(e, tt, Qt), ot(e, _e()), null
}

function tu(e, t) {
    var n = ie;
    ie |= 1;
    try {
        return e(t)
    } finally {
        ie = n, ie === 0 && (Rr = _e() + 500, hl && Ln())
    }
}

function Kn(e) {
    pn !== null && pn.tag === 0 && !(ie & 6) && wr();
    var t = ie;
    ie |= 1;
    var n = wt.transition,
        r = se;
    try {
        if (wt.transition = null, se = 1, e) return e()
    } finally {
        se = r, wt.transition = n, ie = t, !(ie & 6) && Ln()
    }
}

function nu() {
    lt = fr.current, me(fr)
}

function Un(e, t) {
    e.finishedWork = null, e.finishedLanes = 0;
    var n = e.timeoutHandle;
    if (n !== -1 && (e.timeoutHandle = -1, s0(n)), Re !== null)
        for (n = Re.return; n !== null;) {
            var r = n;
            switch (Aa(r), r.tag) {
                case 1:
                    r = r.type.childContextTypes, r != null && Vo();
                    break;
                case 3:
                    Cr(), me(rt), me(Xe), Wa();
                    break;
                case 5:
                    Ha(r);
                    break;
                case 4:
                    Cr();
                    break;
                case 13:
                    me(we);
                    break;
                case 19:
                    me(we);
                    break;
                case 10:
                    Ua(r.type._context);
                    break;
                case 22:
                case 23:
                    nu()
            }
            n = n.return
        }
    if (Ae = e, Re = e = Sn(e.current, null), Be = lt = t, De = 0, Ni = null, Za = gl = Wn = 0, tt = ai = null, zn !== null) {
        for (t = 0; t < zn.length; t++)
            if (n = zn[t], r = n.interleaved, r !== null) {
                n.interleaved = null;
                var i = r.next,
                    o = n.pending;
                if (o !== null) {
                    var l = o.next;
                    o.next = i, r.next = l
                }
                n.pending = r
            } zn = null
    }
    return e
}

function Sh(e, t) {
    do {
        var n = Re;
        try {
            if (Ia(), xo.current = Jo, Go) {
                for (var r = xe.memoizedState; r !== null;) {
                    var i = r.queue;
                    i !== null && (i.pending = null), r = r.next
                }
                Go = !1
            }
            if (Hn = 0, be = Oe = xe = null, li = !1, Ei = 0, Ja.current = null, n === null || n.return === null) {
                De = 1, Ni = t, Re = null;
                break
            }
            e: {
                var o = e,
                    l = n.return,
                    s = n,
                    a = t;
                if (t = Be, s.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
                    var u = a,
                        h = s,
                        m = h.tag;
                    if (!(h.mode & 1) && (m === 0 || m === 11 || m === 15)) {
                        var p = h.alternate;
                        p ? (h.updateQueue = p.updateQueue, h.memoizedState = p.memoizedState, h.lanes = p.lanes) : (h.updateQueue = null, h.memoizedState = null)
                    }
                    var w = _c(l);
                    if (w !== null) {
                        w.flags &= -257, Cc(w, l, s, o, t), w.mode & 1 && Ec(o, u, t), t = w, a = u;
                        var S = t.updateQueue;
                        if (S === null) {
                            var E = new Set;
                            E.add(a), t.updateQueue = E
                        } else S.add(a);
                        break e
                    } else {
                        if (!(t & 1)) {
                            Ec(o, u, t), ru();
                            break e
                        }
                        a = Error(O(426))
                    }
                } else if (ge && s.mode & 1) {
                    var N = _c(l);
                    if (N !== null) {
                        !(N.flags & 65536) && (N.flags |= 256), Cc(N, l, s, o, t), za(Nr(a, s));
                        break e
                    }
                }
                o = a = Nr(a, s),
                De !== 4 && (De = 2),
                ai === null ? ai = [o] : ai.push(o),
                o = l;do {
                    switch (o.tag) {
                        case 3:
                            o.flags |= 65536, t &= -t, o.lanes |= t;
                            var c = oh(o, a, t);
                            gc(o, c);
                            break e;
                        case 1:
                            s = a;
                            var d = o.type,
                                y = o.stateNode;
                            if (!(o.flags & 128) && (typeof d.getDerivedStateFromError == "function" || y !== null && typeof y.componentDidCatch == "function" && (xn === null || !xn.has(y)))) {
                                o.flags |= 65536, t &= -t, o.lanes |= t;
                                var C = lh(o, s, t);
                                gc(o, C);
                                break e
                            }
                    }
                    o = o.return
                } while (o !== null)
            }
            Ch(n)
        } catch (g) {
            t = g, Re === n && n !== null && (Re = n = n.return);
            continue
        }
        break
    } while (!0)
}

function Eh() {
    var e = Zo.current;
    return Zo.current = Jo, e === null ? Jo : e
}

function ru() {
    (De === 0 || De === 3 || De === 2) && (De = 4), Ae === null || !(Wn & 268435455) && !(gl & 268435455) || dn(Ae, Be)
}

function nl(e, t) {
    var n = ie;
    ie |= 2;
    var r = Eh();
    (Ae !== e || Be !== t) && (Qt = null, Un(e, t));
    do try {
        O0();
        break
    } catch (i) {
        Sh(e, i)
    }
    while (!0);
    if (Ia(), ie = n, Zo.current = r, Re !== null) throw Error(O(261));
    return Ae = null, Be = 0, De
}

function O0() {
    for (; Re !== null;) _h(Re)
}

function D0() {
    for (; Re !== null && !im();) _h(Re)
}

function _h(e) {
    var t = Rh(e.alternate, e, lt);
    e.memoizedProps = e.pendingProps, t === null ? Ch(e) : Re = t, Ja.current = null
}

function Ch(e) {
    var t = e;
    do {
        var n = t.alternate;
        if (e = t.return, t.flags & 32768) {
            if (n = N0(n, t), n !== null) {
                n.flags &= 32767, Re = n;
                return
            }
            if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
            else {
                De = 6, Re = null;
                return
            }
        } else if (n = C0(n, t, lt), n !== null) {
            Re = n;
            return
        }
        if (t = t.sibling, t !== null) {
            Re = t;
            return
        }
        Re = t = e
    } while (t !== null);
    De === 0 && (De = 5)
}

function Mn(e, t, n) {
    var r = se,
        i = wt.transition;
    try {
        wt.transition = null, se = 1, M0(e, t, n, r)
    } finally {
        wt.transition = i, se = r
    }
    return null
}

function M0(e, t, n, r) {
    do wr(); while (pn !== null);
    if (ie & 6) throw Error(O(327));
    n = e.finishedWork;
    var i = e.finishedLanes;
    if (n === null) return null;
    if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(O(177));
    e.callbackNode = null, e.callbackPriority = 0;
    var o = n.lanes | n.childLanes;
    if (pm(e, o), e === Ae && (Re = Ae = null, Be = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || lo || (lo = !0, Ph(zo, function() {
            return wr(), null
        })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
        o = wt.transition, wt.transition = null;
        var l = se;
        se = 1;
        var s = ie;
        ie |= 4, Ja.current = null, P0(e, n), wh(n, e), e0(As), Io = !!bs, As = bs = null, e.current = n, L0(n), om(), ie = s, se = l, wt.transition = o
    } else e.current = n;
    if (lo && (lo = !1, pn = e, tl = i), o = e.pendingLanes, o === 0 && (xn = null), am(n.stateNode), ot(e, _e()), t !== null)
        for (r = e.onRecoverableError, n = 0; n < t.length; n++) i = t[n], r(i.value, {
            componentStack: i.stack,
            digest: i.digest
        });
    if (el) throw el = !1, e = na, na = null, e;
    return tl & 1 && e.tag !== 0 && wr(), o = e.pendingLanes, o & 1 ? e === ra ? ui++ : (ui = 0, ra = e) : ui = 0, Ln(), null
}

function wr() {
    if (pn !== null) {
        var e = of (tl),
            t = wt.transition,
            n = se;
        try {
            if (wt.transition = null, se = 16 > e ? 16 : e, pn === null) var r = !1;
            else {
                if (e = pn, pn = null, tl = 0, ie & 6) throw Error(O(331));
                var i = ie;
                for (ie |= 4, z = e.current; z !== null;) {
                    var o = z,
                        l = o.child;
                    if (z.flags & 16) {
                        var s = o.deletions;
                        if (s !== null) {
                            for (var a = 0; a < s.length; a++) {
                                var u = s[a];
                                for (z = u; z !== null;) {
                                    var h = z;
                                    switch (h.tag) {
                                        case 0:
                                        case 11:
                                        case 15:
                                            si(8, h, o)
                                    }
                                    var m = h.child;
                                    if (m !== null) m.return = h, z = m;
                                    else
                                        for (; z !== null;) {
                                            h = z;
                                            var p = h.sibling,
                                                w = h.return;
                                            if (yh(h), h === u) {
                                                z = null;
                                                break
                                            }
                                            if (p !== null) {
                                                p.return = w, z = p;
                                                break
                                            }
                                            z = w
                                        }
                                }
                            }
                            var S = o.alternate;
                            if (S !== null) {
                                var E = S.child;
                                if (E !== null) {
                                    S.child = null;
                                    do {
                                        var N = E.sibling;
                                        E.sibling = null, E = N
                                    } while (E !== null)
                                }
                            }
                            z = o
                        }
                    }
                    if (o.subtreeFlags & 2064 && l !== null) l.return = o, z = l;
                    else e: for (; z !== null;) {
                        if (o = z, o.flags & 2048) switch (o.tag) {
                            case 0:
                            case 11:
                            case 15:
                                si(9, o, o.return)
                        }
                        var c = o.sibling;
                        if (c !== null) {
                            c.return = o.return, z = c;
                            break e
                        }
                        z = o.return
                    }
                }
                var d = e.current;
                for (z = d; z !== null;) {
                    l = z;
                    var y = l.child;
                    if (l.subtreeFlags & 2064 && y !== null) y.return = l, z = y;
                    else e: for (l = d; z !== null;) {
                        if (s = z, s.flags & 2048) try {
                            switch (s.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    yl(9, s)
                            }
                        } catch (g) {
                            Ee(s, s.return, g)
                        }
                        if (s === l) {
                            z = null;
                            break e
                        }
                        var C = s.sibling;
                        if (C !== null) {
                            C.return = s.return, z = C;
                            break e
                        }
                        z = s.return
                    }
                }
                if (ie = i, Ln(), It && typeof It.onPostCommitFiberRoot == "function") try {
                    It.onPostCommitFiberRoot(al, e)
                } catch {}
                r = !0
            }
            return r
        } finally {
            se = n, wt.transition = t
        }
    }
    return !1
}

function Fc(e, t, n) {
    t = Nr(n, t), t = oh(e, t, 1), e = wn(e, t, 1), t = Ge(), e !== null && (Li(e, 1, t), ot(e, t))
}

function Ee(e, t, n) {
    if (e.tag === 3) Fc(e, e, n);
    else
        for (; t !== null;) {
            if (t.tag === 3) {
                Fc(t, e, n);
                break
            } else if (t.tag === 1) {
                var r = t.stateNode;
                if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (xn === null || !xn.has(r))) {
                    e = Nr(n, e), e = lh(t, e, 1), t = wn(t, e, 1), e = Ge(), t !== null && (Li(t, 1, e), ot(t, e));
                    break
                }
            }
            t = t.return
        }
}

function b0(e, t, n) {
    var r = e.pingCache;
    r !== null && r.delete(t), t = Ge(), e.pingedLanes |= e.suspendedLanes & n, Ae === e && (Be & n) === n && (De === 4 || De === 3 && (Be & 130023424) === Be && 500 > _e() - eu ? Un(e, 0) : Za |= n), ot(e, t)
}

function Nh(e, t) {
    t === 0 && (e.mode & 1 ? (t = qi, qi <<= 1, !(qi & 130023424) && (qi = 4194304)) : t = 1);
    var n = Ge();
    e = en(e, t), e !== null && (Li(e, t, n), ot(e, n))
}

function A0(e) {
    var t = e.memoizedState,
        n = 0;
    t !== null && (n = t.retryLane), Nh(e, n)
}

function z0(e, t) {
    var n = 0;
    switch (e.tag) {
        case 13:
            var r = e.stateNode,
                i = e.memoizedState;
            i !== null && (n = i.retryLane);
            break;
        case 19:
            r = e.stateNode;
            break;
        default:
            throw Error(O(314))
    }
    r !== null && r.delete(t), Nh(e, n)
}
var Rh;
Rh = function(e, t, n) {
    if (e !== null)
        if (e.memoizedProps !== t.pendingProps || rt.current) nt = !0;
        else {
            if (!(e.lanes & n) && !(t.flags & 128)) return nt = !1, _0(e, t, n);
            nt = !!(e.flags & 131072)
        }
    else nt = !1, ge && t.flags & 1048576 && jf(t, Ko, t.index);
    switch (t.lanes = 0, t.tag) {
        case 2:
            var r = t.type;
            So(e, t), e = t.pendingProps;
            var i = Sr(t, Xe.current);
            vr(t, n), i = Qa(null, t, r, e, i, n);
            var o = Xa();
            return t.flags |= 1, typeof i == "object" && i !== null && typeof i.render == "function" && i.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, it(r) ? (o = !0, Ho(t)) : o = !1, t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, $a(t), i.updater = ml, t.stateNode = i, i._reactInternals = t, Ws(t, r, e, n), t = Xs(null, t, r, !0, o, n)) : (t.tag = 0, ge && o && ba(t), qe(null, t, i, n), t = t.child), t;
        case 16:
            r = t.elementType;
            e: {
                switch (So(e, t), e = t.pendingProps, i = r._init, r = i(r._payload), t.type = r, i = t.tag = I0(r), e = _t(r, e), i) {
                    case 0:
                        t = Qs(null, t, r, e, n);
                        break e;
                    case 1:
                        t = Pc(null, t, r, e, n);
                        break e;
                    case 11:
                        t = Nc(null, t, r, e, n);
                        break e;
                    case 14:
                        t = Rc(null, t, r, _t(r.type, e), n);
                        break e
                }
                throw Error(O(306, r, ""))
            }
            return t;
        case 0:
            return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : _t(r, i), Qs(e, t, r, i, n);
        case 1:
            return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : _t(r, i), Pc(e, t, r, i, n);
        case 3:
            e: {
                if (ch(t), e === null) throw Error(O(387));r = t.pendingProps,
                o = t.memoizedState,
                i = o.element,
                zf(e, t),
                Yo(t, r, null, n);
                var l = t.memoizedState;
                if (r = l.element, o.isDehydrated)
                    if (o = {
                            element: r,
                            isDehydrated: !1,
                            cache: l.cache,
                            pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
                            transitions: l.transitions
                        }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
                        i = Nr(Error(O(423)), t), t = Lc(e, t, r, n, i);
                        break e
                    } else if (r !== i) {
                    i = Nr(Error(O(424)), t), t = Lc(e, t, r, n, i);
                    break e
                } else
                    for (at = vn(t.stateNode.containerInfo.firstChild), ut = t, ge = !0, Pt = null, n = bf(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
                else {
                    if (Er(), r === i) {
                        t = tn(e, t, n);
                        break e
                    }
                    qe(e, t, r, n)
                }
                t = t.child
            }
            return t;
        case 5:
            return Ff(t), e === null && $s(t), r = t.type, i = t.pendingProps, o = e !== null ? e.memoizedProps : null, l = i.children, zs(r, i) ? l = null : o !== null && zs(r, o) && (t.flags |= 32), uh(e, t), qe(e, t, l, n), t.child;
        case 6:
            return e === null && $s(t), null;
        case 13:
            return dh(e, t, n);
        case 4:
            return Va(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = _r(t, null, r, n) : qe(e, t, r, n), t.child;
        case 11:
            return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : _t(r, i), Nc(e, t, r, i, n);
        case 7:
            return qe(e, t, t.pendingProps, n), t.child;
        case 8:
            return qe(e, t, t.pendingProps.children, n), t.child;
        case 12:
            return qe(e, t, t.pendingProps.children, n), t.child;
        case 10:
            e: {
                if (r = t.type._context, i = t.pendingProps, o = t.memoizedProps, l = i.value, fe(Qo, r._currentValue), r._currentValue = l, o !== null)
                    if (jt(o.value, l)) {
                        if (o.children === i.children && !rt.current) {
                            t = tn(e, t, n);
                            break e
                        }
                    } else
                        for (o = t.child, o !== null && (o.return = t); o !== null;) {
                            var s = o.dependencies;
                            if (s !== null) {
                                l = o.child;
                                for (var a = s.firstContext; a !== null;) {
                                    if (a.context === r) {
                                        if (o.tag === 1) {
                                            a = Gt(-1, n & -n), a.tag = 2;
                                            var u = o.updateQueue;
                                            if (u !== null) {
                                                u = u.shared;
                                                var h = u.pending;
                                                h === null ? a.next = a : (a.next = h.next, h.next = a), u.pending = a
                                            }
                                        }
                                        o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), Vs(o.return, n, t), s.lanes |= n;
                                        break
                                    }
                                    a = a.next
                                }
                            } else if (o.tag === 10) l = o.type === t.type ? null : o.child;
                            else if (o.tag === 18) {
                                if (l = o.return, l === null) throw Error(O(341));
                                l.lanes |= n, s = l.alternate, s !== null && (s.lanes |= n), Vs(l, n, t), l = o.sibling
                            } else l = o.child;
                            if (l !== null) l.return = o;
                            else
                                for (l = o; l !== null;) {
                                    if (l === t) {
                                        l = null;
                                        break
                                    }
                                    if (o = l.sibling, o !== null) {
                                        o.return = l.return, l = o;
                                        break
                                    }
                                    l = l.return
                                }
                            o = l
                        }
                qe(e, t, i.children, n),
                t = t.child
            }
            return t;
        case 9:
            return i = t.type, r = t.pendingProps.children, vr(t, n), i = xt(i), r = r(i), t.flags |= 1, qe(e, t, r, n), t.child;
        case 14:
            return r = t.type, i = _t(r, t.pendingProps), i = _t(r.type, i), Rc(e, t, r, i, n);
        case 15:
            return sh(e, t, t.type, t.pendingProps, n);
        case 17:
            return r = t.type, i = t.pendingProps, i = t.elementType === r ? i : _t(r, i), So(e, t), t.tag = 1, it(r) ? (e = !0, Ho(t)) : e = !1, vr(t, n), ih(t, r, i), Ws(t, r, i, n), Xs(null, t, r, !0, e, n);
        case 19:
            return fh(e, t, n);
        case 22:
            return ah(e, t, n)
    }
    throw Error(O(156, t.tag))
};

function Ph(e, t) {
    return ef(e, t)
}

function F0(e, t, n, r) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
}

function vt(e, t, n, r) {
    return new F0(e, t, n, r)
}

function iu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent)
}

function I0(e) {
    if (typeof e == "function") return iu(e) ? 1 : 0;
    if (e != null) {
        if (e = e.$$typeof, e === Ea) return 11;
        if (e === _a) return 14
    }
    return 2
}

function Sn(e, t) {
    var n = e.alternate;
    return n === null ? (n = vt(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n
}

function Co(e, t, n, r, i, o) {
    var l = 2;
    if (r = e, typeof e == "function") iu(e) && (l = 1);
    else if (typeof e == "string") l = 5;
    else e: switch (e) {
        case nr:
            return Bn(n.children, i, o, t);
        case Sa:
            l = 8, i |= 8;
            break;
        case ms:
            return e = vt(12, n, t, i | 2), e.elementType = ms, e.lanes = o, e;
        case ys:
            return e = vt(13, n, t, i), e.elementType = ys, e.lanes = o, e;
        case gs:
            return e = vt(19, n, t, i), e.elementType = gs, e.lanes = o, e;
        case zd:
            return vl(n, i, o, t);
        default:
            if (typeof e == "object" && e !== null) switch (e.$$typeof) {
                case bd:
                    l = 10;
                    break e;
                case Ad:
                    l = 9;
                    break e;
                case Ea:
                    l = 11;
                    break e;
                case _a:
                    l = 14;
                    break e;
                case an:
                    l = 16, r = null;
                    break e
            }
            throw Error(O(130, e == null ? e : typeof e, ""))
    }
    return t = vt(l, n, t, i), t.elementType = e, t.type = r, t.lanes = o, t
}

function Bn(e, t, n, r) {
    return e = vt(7, e, r, t), e.lanes = n, e
}

function vl(e, t, n, r) {
    return e = vt(22, e, r, t), e.elementType = zd, e.lanes = n, e.stateNode = {
        isHidden: !1
    }, e
}

function rs(e, t, n) {
    return e = vt(6, e, null, t), e.lanes = n, e
}

function is(e, t, n) {
    return t = vt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
    }, t
}

function U0(e, t, n, r, i) {
    this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Fl(0), this.expirationTimes = Fl(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Fl(0), this.identifierPrefix = r, this.onRecoverableError = i, this.mutableSourceEagerHydrationData = null
}

function ou(e, t, n, r, i, o, l, s, a) {
    return e = new U0(e, t, n, s, a), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = vt(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = {
        element: r,
        isDehydrated: n,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    }, $a(o), e
}

function B0(e, t, n) {
    var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
        $$typeof: tr,
        key: r == null ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n
    }
}

function Lh(e) {
    if (!e) return Cn;
    e = e._reactInternals;
    e: {
        if (Xn(e) !== e || e.tag !== 1) throw Error(O(170));
        var t = e;do {
            switch (t.tag) {
                case 3:
                    t = t.stateNode.context;
                    break e;
                case 1:
                    if (it(t.type)) {
                        t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                        break e
                    }
            }
            t = t.return
        } while (t !== null);
        throw Error(O(171))
    }
    if (e.tag === 1) {
        var n = e.type;
        if (it(n)) return Lf(e, n, t)
    }
    return t
}

function Th(e, t, n, r, i, o, l, s, a) {
    return e = ou(n, r, !0, e, i, o, l, s, a), e.context = Lh(null), n = e.current, r = Ge(), i = kn(n), o = Gt(r, i), o.callback = t ?? null, wn(n, o, i), e.current.lanes = i, Li(e, i, r), ot(e, r), e
}

function wl(e, t, n, r) {
    var i = t.current,
        o = Ge(),
        l = kn(i);
    return n = Lh(n), t.context === null ? t.context = n : t.pendingContext = n, t = Gt(o, l), t.payload = {
        element: e
    }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = wn(i, t, l), e !== null && (Tt(e, i, l, o), wo(e, i, l)), l
}

function rl(e) {
    if (e = e.current, !e.child) return null;
    switch (e.child.tag) {
        case 5:
            return e.child.stateNode;
        default:
            return e.child.stateNode
    }
}

function Ic(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t
    }
}

function lu(e, t) {
    Ic(e, t), (e = e.alternate) && Ic(e, t)
}

function $0() {
    return null
}
var jh = typeof reportError == "function" ? reportError : function(e) {
    console.error(e)
};

function su(e) {
    this._internalRoot = e
}
xl.prototype.render = su.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(O(409));
    wl(e, t, null, null)
};
xl.prototype.unmount = su.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Kn(function() {
            wl(null, e, null, null)
        }), t[Zt] = null
    }
};

function xl(e) {
    this._internalRoot = e
}
xl.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
        var t = af();
        e = {
            blockedOn: null,
            target: e,
            priority: t
        };
        for (var n = 0; n < cn.length && t !== 0 && t < cn[n].priority; n++);
        cn.splice(n, 0, e), n === 0 && cf(e)
    }
};

function au(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
}

function kl(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
}

function Uc() {}

function V0(e, t, n, r, i) {
    if (i) {
        if (typeof r == "function") {
            var o = r;
            r = function() {
                var u = rl(l);
                o.call(u)
            }
        }
        var l = Th(t, r, e, 0, null, !1, !1, "", Uc);
        return e._reactRootContainer = l, e[Zt] = l.current, vi(e.nodeType === 8 ? e.parentNode : e), Kn(), l
    }
    for (; i = e.lastChild;) e.removeChild(i);
    if (typeof r == "function") {
        var s = r;
        r = function() {
            var u = rl(a);
            s.call(u)
        }
    }
    var a = ou(e, 0, !1, null, null, !1, !1, "", Uc);
    return e._reactRootContainer = a, e[Zt] = a.current, vi(e.nodeType === 8 ? e.parentNode : e), Kn(function() {
        wl(t, a, n, r)
    }), a
}

function Sl(e, t, n, r, i) {
    var o = n._reactRootContainer;
    if (o) {
        var l = o;
        if (typeof i == "function") {
            var s = i;
            i = function() {
                var a = rl(l);
                s.call(a)
            }
        }
        wl(t, l, e, i)
    } else l = V0(n, t, e, i, r);
    return rl(l)
}
lf = function(e) {
    switch (e.tag) {
        case 3:
            var t = e.stateNode;
            if (t.current.memoizedState.isDehydrated) {
                var n = Gr(t.pendingLanes);
                n !== 0 && (Ra(t, n | 1), ot(t, _e()), !(ie & 6) && (Rr = _e() + 500, Ln()))
            }
            break;
        case 13:
            Kn(function() {
                var r = en(e, 1);
                if (r !== null) {
                    var i = Ge();
                    Tt(r, e, 1, i)
                }
            }), lu(e, 1)
    }
};
Pa = function(e) {
    if (e.tag === 13) {
        var t = en(e, 134217728);
        if (t !== null) {
            var n = Ge();
            Tt(t, e, 134217728, n)
        }
        lu(e, 134217728)
    }
};
sf = function(e) {
    if (e.tag === 13) {
        var t = kn(e),
            n = en(e, t);
        if (n !== null) {
            var r = Ge();
            Tt(n, e, t, r)
        }
        lu(e, t)
    }
};
af = function() {
    return se
};
uf = function(e, t) {
    var n = se;
    try {
        return se = e, t()
    } finally {
        se = n
    }
};
Rs = function(e, t, n) {
    switch (t) {
        case "input":
            if (xs(e, n), t = n.name, n.type === "radio" && t != null) {
                for (n = e; n.parentNode;) n = n.parentNode;
                for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                        var i = fl(r);
                        if (!i) throw Error(O(90));
                        Id(r), xs(r, i)
                    }
                }
            }
            break;
        case "textarea":
            Bd(e, n);
            break;
        case "select":
            t = n.value, t != null && pr(e, !!n.multiple, t, !1)
    }
};
Xd = tu;
Yd = Kn;
var H0 = {
        usingClientEntryPoint: !1,
        Events: [ji, lr, fl, Kd, Qd, tu]
    },
    Vr = {
        findFiberByHostInstance: An,
        bundleType: 0,
        version: "18.3.1",
        rendererPackageName: "react-dom"
    },
    W0 = {
        bundleType: Vr.bundleType,
        version: Vr.version,
        rendererPackageName: Vr.rendererPackageName,
        rendererConfig: Vr.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: nn.ReactCurrentDispatcher,
        findHostInstanceByFiber: function(e) {
            return e = Jd(e), e === null ? null : e.stateNode
        },
        findFiberByHostInstance: Vr.findFiberByHostInstance || $0,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.3.1-next-f1338f8080-20240426"
    };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var so = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!so.isDisabled && so.supportsFiber) try {
        al = so.inject(W0), It = so
    } catch {}
}
dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = H0;
dt.createPortal = function(e, t) {
    var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!au(t)) throw Error(O(200));
    return B0(e, t, null, n)
};
dt.createRoot = function(e, t) {
    if (!au(e)) throw Error(O(299));
    var n = !1,
        r = "",
        i = jh;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError)), t = ou(e, 1, !1, null, null, n, !1, r, i), e[Zt] = t.current, vi(e.nodeType === 8 ? e.parentNode : e), new su(t)
};
dt.findDOMNode = function(e) {
    if (e == null) return null;
    if (e.nodeType === 1) return e;
    var t = e._reactInternals;
    if (t === void 0) throw typeof e.render == "function" ? Error(O(188)) : (e = Object.keys(e).join(","), Error(O(268, e)));
    return e = Jd(t), e = e === null ? null : e.stateNode, e
};
dt.flushSync = function(e) {
    return Kn(e)
};
dt.hydrate = function(e, t, n) {
    if (!kl(t)) throw Error(O(200));
    return Sl(null, e, t, !0, n)
};
dt.hydrateRoot = function(e, t, n) {
    if (!au(e)) throw Error(O(405));
    var r = n != null && n.hydratedSources || null,
        i = !1,
        o = "",
        l = jh;
    if (n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (l = n.onRecoverableError)), t = Th(t, null, e, 1, n ?? null, i, !1, o, l), e[Zt] = t.current, vi(e), r)
        for (e = 0; e < r.length; e++) n = r[e], i = n._getVersion, i = i(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, i] : t.mutableSourceEagerHydrationData.push(n, i);
    return new xl(t)
};
dt.render = function(e, t, n) {
    if (!kl(t)) throw Error(O(200));
    return Sl(null, e, t, !1, n)
};
dt.unmountComponentAtNode = function(e) {
    if (!kl(e)) throw Error(O(40));
    return e._reactRootContainer ? (Kn(function() {
        Sl(null, null, e, !1, function() {
            e._reactRootContainer = null, e[Zt] = null
        })
    }), !0) : !1
};
dt.unstable_batchedUpdates = tu;
dt.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
    if (!kl(n)) throw Error(O(200));
    if (e == null || e._reactInternals === void 0) throw Error(O(38));
    return Sl(e, t, n, !1, r)
};
dt.version = "18.3.1-next-f1338f8080-20240426";

function Oh() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Oh)
    } catch (e) {
        console.error(e)
    }
}
Oh(), jd.exports = dt;
var Dh = jd.exports,
    Bc = Dh;
hs.createRoot = Bc.createRoot, hs.hydrateRoot = Bc.hydrateRoot;
var uu = {};
Object.defineProperty(uu, "__esModule", {
    value: !0
});
uu.parse = J0;
uu.serialize = Z0;
const K0 = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
    Q0 = /^[\u0021-\u003A\u003C-\u007E]*$/,
    X0 = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
    Y0 = /^[\u0020-\u003A\u003D-\u007E]*$/,
    q0 = Object.prototype.toString,
    G0 = (() => {
        const e = function() {};
        return e.prototype = Object.create(null), e
    })();

function J0(e, t) {
    const n = new G0,
        r = e.length;
    if (r < 2) return n;
    const i = (t == null ? void 0 : t.decode) || ey;
    let o = 0;
    do {
        const l = e.indexOf("=", o);
        if (l === -1) break;
        const s = e.indexOf(";", o),
            a = s === -1 ? r : s;
        if (l > a) {
            o = e.lastIndexOf(";", l - 1) + 1;
            continue
        }
        const u = $c(e, o, l),
            h = Vc(e, l, u),
            m = e.slice(u, h);
        if (n[m] === void 0) {
            let p = $c(e, l + 1, a),
                w = Vc(e, a, p);
            const S = i(e.slice(p, w));
            n[m] = S
        }
        o = a + 1
    } while (o < r);
    return n
}

function $c(e, t, n) {
    do {
        const r = e.charCodeAt(t);
        if (r !== 32 && r !== 9) return t
    } while (++t < n);
    return n
}

function Vc(e, t, n) {
    for (; t > n;) {
        const r = e.charCodeAt(--t);
        if (r !== 32 && r !== 9) return t + 1
    }
    return n
}

function Z0(e, t, n) {
    const r = (n == null ? void 0 : n.encode) || encodeURIComponent;
    if (!K0.test(e)) throw new TypeError(`argument name is invalid: ${e}`);
    const i = r(t);
    if (!Q0.test(i)) throw new TypeError(`argument val is invalid: ${t}`);
    let o = e + "=" + i;
    if (!n) return o;
    if (n.maxAge !== void 0) {
        if (!Number.isInteger(n.maxAge)) throw new TypeError(`option maxAge is invalid: ${n.maxAge}`);
        o += "; Max-Age=" + n.maxAge
    }
    if (n.domain) {
        if (!X0.test(n.domain)) throw new TypeError(`option domain is invalid: ${n.domain}`);
        o += "; Domain=" + n.domain
    }
    if (n.path) {
        if (!Y0.test(n.path)) throw new TypeError(`option path is invalid: ${n.path}`);
        o += "; Path=" + n.path
    }
    if (n.expires) {
        if (!ty(n.expires) || !Number.isFinite(n.expires.valueOf())) throw new TypeError(`option expires is invalid: ${n.expires}`);
        o += "; Expires=" + n.expires.toUTCString()
    }
    if (n.httpOnly && (o += "; HttpOnly"), n.secure && (o += "; Secure"), n.partitioned && (o += "; Partitioned"), n.priority) switch (typeof n.priority == "string" ? n.priority.toLowerCase() : void 0) {
        case "low":
            o += "; Priority=Low";
            break;
        case "medium":
            o += "; Priority=Medium";
            break;
        case "high":
            o += "; Priority=High";
            break;
        default:
            throw new TypeError(`option priority is invalid: ${n.priority}`)
    }
    if (n.sameSite) switch (typeof n.sameSite == "string" ? n.sameSite.toLowerCase() : n.sameSite) {
        case !0:
        case "strict":
            o += "; SameSite=Strict";
            break;
        case "lax":
            o += "; SameSite=Lax";
            break;
        case "none":
            o += "; SameSite=None";
            break;
        default:
            throw new TypeError(`option sameSite is invalid: ${n.sameSite}`)
    }
    return o
}

function ey(e) {
    if (e.indexOf("%") === -1) return e;
    try {
        return decodeURIComponent(e)
    } catch {
        return e
    }
}

function ty(e) {
    return q0.call(e) === "[object Date]"
}
/**
 * react-router v7.1.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
var Hc = "popstate";

function ny(e = {}) {
    function t(r, i) {
        let {
            pathname: o,
            search: l,
            hash: s
        } = r.location;
        return Ri("", {
            pathname: o,
            search: l,
            hash: s
        }, i.state && i.state.usr || null, i.state && i.state.key || "default")
    }

    function n(r, i) {
        return typeof i == "string" ? i : Nn(i)
    }
    return iy(t, n, null, e)
}

function re(e, t) {
    if (e === !1 || e === null || typeof e > "u") throw new Error(t)
}

function $e(e, t) {
    if (!e) {
        typeof console < "u" && console.warn(t);
        try {
            throw new Error(t)
        } catch {}
    }
}

function ry() {
    return Math.random().toString(36).substring(2, 10)
}

function Wc(e, t) {
    return {
        usr: e.state,
        key: e.key,
        idx: t
    }
}

function Ri(e, t, n = null, r) {
    return {
        pathname: typeof e == "string" ? e : e.pathname,
        search: "",
        hash: "",
        ...typeof t == "string" ? Tn(t) : t,
        state: n,
        key: t && t.key || r || ry()
    }
}

function Nn({
    pathname: e = "/",
    search: t = "",
    hash: n = ""
}) {
    return t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t), n && n !== "#" && (e += n.charAt(0) === "#" ? n : "#" + n), e
}

function Tn(e) {
    let t = {};
    if (e) {
        let n = e.indexOf("#");
        n >= 0 && (t.hash = e.substring(n), e = e.substring(0, n));
        let r = e.indexOf("?");
        r >= 0 && (t.search = e.substring(r), e = e.substring(0, r)), e && (t.pathname = e)
    }
    return t
}

function iy(e, t, n, r = {}) {
    let {
        window: i = document.defaultView,
        v5Compat: o = !1
    } = r, l = i.history, s = "POP", a = null, u = h();
    u == null && (u = 0, l.replaceState({
        ...l.state,
        idx: u
    }, ""));

    function h() {
        return (l.state || {
            idx: null
        }).idx
    }

    function m() {
        s = "POP";
        let N = h(),
            c = N == null ? null : N - u;
        u = N, a && a({
            action: s,
            location: E.location,
            delta: c
        })
    }

    function p(N, c) {
        s = "PUSH";
        let d = Ri(E.location, N, c);
        u = h() + 1;
        let y = Wc(d, u),
            C = E.createHref(d);
        try {
            l.pushState(y, "", C)
        } catch (g) {
            if (g instanceof DOMException && g.name === "DataCloneError") throw g;
            i.location.assign(C)
        }
        o && a && a({
            action: s,
            location: E.location,
            delta: 1
        })
    }

    function w(N, c) {
        s = "REPLACE";
        let d = Ri(E.location, N, c);
        u = h();
        let y = Wc(d, u),
            C = E.createHref(d);
        l.replaceState(y, "", C), o && a && a({
            action: s,
            location: E.location,
            delta: 0
        })
    }

    function S(N) {
        let c = i.location.origin !== "null" ? i.location.origin : i.location.href,
            d = typeof N == "string" ? N : Nn(N);
        return d = d.replace(/ $/, "%20"), re(c, `No window.location.(origin|href) available to create URL for href: ${d}`), new URL(d, c)
    }
    let E = {
        get action() {
            return s
        },
        get location() {
            return e(i, l)
        },
        listen(N) {
            if (a) throw new Error("A history only accepts one active listener");
            return i.addEventListener(Hc, m), a = N, () => {
                i.removeEventListener(Hc, m), a = null
            }
        },
        createHref(N) {
            return t(i, N)
        },
        createURL: S,
        encodeLocation(N) {
            let c = S(N);
            return {
                pathname: c.pathname,
                search: c.search,
                hash: c.hash
            }
        },
        push: p,
        replace: w,
        go(N) {
            return l.go(N)
        }
    };
    return E
}
var oy = new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);

function ly(e) {
    return e.index === !0
}

function il(e, t, n = [], r = {}) {
    return e.map((i, o) => {
        let l = [...n, String(o)],
            s = typeof i.id == "string" ? i.id : l.join("-");
        if (re(i.index !== !0 || !i.children, "Cannot specify children on an index route"), re(!r[s], `Found a route id collision on id "${s}".  Route id's must be globally unique within Data Router usages`), ly(i)) {
            let a = {
                ...i,
                ...t(i),
                id: s
            };
            return r[s] = a, a
        } else {
            let a = {
                ...i,
                ...t(i),
                id: s,
                children: void 0
            };
            return r[s] = a, i.children && (a.children = il(i.children, t, l, r)), a
        }
    })
}

function fn(e, t, n = "/") {
    return No(e, t, n, !1)
}

function No(e, t, n, r) {
    let i = typeof t == "string" ? Tn(t) : t,
        o = Ot(i.pathname || "/", n);
    if (o == null) return null;
    let l = Mh(e);
    ay(l);
    let s = null;
    for (let a = 0; s == null && a < l.length; ++a) {
        let u = wy(o);
        s = gy(l[a], u, r)
    }
    return s
}

function sy(e, t) {
    let {
        route: n,
        pathname: r,
        params: i
    } = e;
    return {
        id: n.id,
        pathname: r,
        params: i,
        data: t[n.id],
        handle: n.handle
    }
}

function Mh(e, t = [], n = [], r = "") {
    let i = (o, l, s) => {
        let a = {
            relativePath: s === void 0 ? o.path || "" : s,
            caseSensitive: o.caseSensitive === !0,
            childrenIndex: l,
            route: o
        };
        a.relativePath.startsWith("/") && (re(a.relativePath.startsWith(r), `Absolute route path "${a.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`), a.relativePath = a.relativePath.slice(r.length));
        let u = Bt([r, a.relativePath]),
            h = n.concat(a);
        o.children && o.children.length > 0 && (re(o.index !== !0, `Index routes must not have child routes. Please remove all child routes from route path "${u}".`), Mh(o.children, t, h, u)), !(o.path == null && !o.index) && t.push({
            path: u,
            score: my(u, o.index),
            routesMeta: h
        })
    };
    return e.forEach((o, l) => {
        var s;
        if (o.path === "" || !((s = o.path) != null && s.includes("?"))) i(o, l);
        else
            for (let a of bh(o.path)) i(o, l, a)
    }), t
}

function bh(e) {
    let t = e.split("/");
    if (t.length === 0) return [];
    let [n, ...r] = t, i = n.endsWith("?"), o = n.replace(/\?$/, "");
    if (r.length === 0) return i ? [o, ""] : [o];
    let l = bh(r.join("/")),
        s = [];
    return s.push(...l.map(a => a === "" ? o : [o, a].join("/"))), i && s.push(...l), s.map(a => e.startsWith("/") && a === "" ? "/" : a)
}

function ay(e) {
    e.sort((t, n) => t.score !== n.score ? n.score - t.score : yy(t.routesMeta.map(r => r.childrenIndex), n.routesMeta.map(r => r.childrenIndex)))
}
var uy = /^:[\w-]+$/,
    cy = 3,
    dy = 2,
    fy = 1,
    hy = 10,
    py = -2,
    Kc = e => e === "*";

function my(e, t) {
    let n = e.split("/"),
        r = n.length;
    return n.some(Kc) && (r += py), t && (r += dy), n.filter(i => !Kc(i)).reduce((i, o) => i + (uy.test(o) ? cy : o === "" ? fy : hy), r)
}

function yy(e, t) {
    return e.length === t.length && e.slice(0, -1).every((r, i) => r === t[i]) ? e[e.length - 1] - t[t.length - 1] : 0
}

function gy(e, t, n = !1) {
    let {
        routesMeta: r
    } = e, i = {}, o = "/", l = [];
    for (let s = 0; s < r.length; ++s) {
        let a = r[s],
            u = s === r.length - 1,
            h = o === "/" ? t : t.slice(o.length) || "/",
            m = ol({
                path: a.relativePath,
                caseSensitive: a.caseSensitive,
                end: u
            }, h),
            p = a.route;
        if (!m && u && n && !r[r.length - 1].route.index && (m = ol({
                path: a.relativePath,
                caseSensitive: a.caseSensitive,
                end: !1
            }, h)), !m) return null;
        Object.assign(i, m.params), l.push({
            params: i,
            pathname: Bt([o, m.pathname]),
            pathnameBase: Sy(Bt([o, m.pathnameBase])),
            route: p
        }), m.pathnameBase !== "/" && (o = Bt([o, m.pathnameBase]))
    }
    return l
}

function ol(e, t) {
    typeof e == "string" && (e = {
        path: e,
        caseSensitive: !1,
        end: !0
    });
    let [n, r] = vy(e.path, e.caseSensitive, e.end), i = t.match(n);
    if (!i) return null;
    let o = i[0],
        l = o.replace(/(.)\/+$/, "$1"),
        s = i.slice(1);
    return {
        params: r.reduce((u, {
            paramName: h,
            isOptional: m
        }, p) => {
            if (h === "*") {
                let S = s[p] || "";
                l = o.slice(0, o.length - S.length).replace(/(.)\/+$/, "$1")
            }
            const w = s[p];
            return m && !w ? u[h] = void 0 : u[h] = (w || "").replace(/%2F/g, "/"), u
        }, {}),
        pathname: o,
        pathnameBase: l,
        pattern: e
    }
}

function vy(e, t = !1, n = !0) {
    $e(e === "*" || !e.endsWith("*") || e.endsWith("/*"), `Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);
    let r = [],
        i = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (l, s, a) => (r.push({
            paramName: s,
            isOptional: a != null
        }), a ? "/?([^\\/]+)?" : "/([^\\/]+)"));
    return e.endsWith("*") ? (r.push({
        paramName: "*"
    }), i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? i += "\\/*$" : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"), [new RegExp(i, t ? void 0 : "i"), r]
}

function wy(e) {
    try {
        return e.split("/").map(t => decodeURIComponent(t).replace(/\//g, "%2F")).join("/")
    } catch (t) {
        return $e(!1, `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`), e
    }
}

function Ot(e, t) {
    if (t === "/") return e;
    if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
    let n = t.endsWith("/") ? t.length - 1 : t.length,
        r = e.charAt(n);
    return r && r !== "/" ? null : e.slice(n) || "/"
}

function xy(e, t = "/") {
    let {
        pathname: n,
        search: r = "",
        hash: i = ""
    } = typeof e == "string" ? Tn(e) : e;
    return {
        pathname: n ? n.startsWith("/") ? n : ky(n, t) : t,
        search: Ey(r),
        hash: _y(i)
    }
}

function ky(e, t) {
    let n = t.replace(/\/+$/, "").split("/");
    return e.split("/").forEach(i => {
        i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i)
    }), n.length > 1 ? n.join("/") : "/"
}

function os(e, t, n, r) {
    return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`
}

function Ah(e) {
    return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0)
}

function cu(e) {
    let t = Ah(e);
    return t.map((n, r) => r === t.length - 1 ? n.pathname : n.pathnameBase)
}

function du(e, t, n, r = !1) {
    let i;
    typeof e == "string" ? i = Tn(e) : (i = {
        ...e
    }, re(!i.pathname || !i.pathname.includes("?"), os("?", "pathname", "search", i)), re(!i.pathname || !i.pathname.includes("#"), os("#", "pathname", "hash", i)), re(!i.search || !i.search.includes("#"), os("#", "search", "hash", i)));
    let o = e === "" || i.pathname === "",
        l = o ? "/" : i.pathname,
        s;
    if (l == null) s = n;
    else {
        let m = t.length - 1;
        if (!r && l.startsWith("..")) {
            let p = l.split("/");
            for (; p[0] === "..";) p.shift(), m -= 1;
            i.pathname = p.join("/")
        }
        s = m >= 0 ? t[m] : "/"
    }
    let a = xy(i, s),
        u = l && l !== "/" && l.endsWith("/"),
        h = (o || l === ".") && n.endsWith("/");
    return !a.pathname.endsWith("/") && (u || h) && (a.pathname += "/"), a
}
var Bt = e => e.join("/").replace(/\/\/+/g, "/"),
    Sy = e => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
    Ey = e => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e,
    _y = e => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e,
    ll = class {
        constructor(e, t, n, r = !1) {
            this.status = e, this.statusText = t || "", this.internal = r, n instanceof Error ? (this.data = n.toString(), this.error = n) : this.data = n
        }
    };

function El(e) {
    return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e
}
var zh = ["POST", "PUT", "PATCH", "DELETE"],
    Cy = new Set(zh),
    Ny = ["GET", ...zh],
    Ry = new Set(Ny),
    Py = new Set([301, 302, 303, 307, 308]),
    Ly = new Set([307, 308]),
    ls = {
        state: "idle",
        location: void 0,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0
    },
    Ty = {
        state: "idle",
        data: void 0,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0
    },
    Hr = {
        state: "unblocked",
        proceed: void 0,
        reset: void 0,
        location: void 0
    },
    fu = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    jy = e => ({
        hasErrorBoundary: !!e.hasErrorBoundary
    }),
    Fh = "remix-router-transitions",
    Ih = Symbol("ResetLoaderData");

function Oy(e) {
    const t = e.window ? e.window : typeof window < "u" ? window : void 0,
        n = typeof t < "u" && typeof t.document < "u" && typeof t.document.createElement < "u";
    re(e.routes.length > 0, "You must provide a non-empty routes array to createRouter");
    let r = e.mapRouteProperties || jy,
        i = {},
        o = il(e.routes, r, void 0, i),
        l, s = e.basename || "/",
        a = e.dataStrategy || zy,
        u = e.patchRoutesOnNavigation,
        h = {
            ...e.future
        },
        m = null,
        p = new Set,
        w = null,
        S = null,
        E = null,
        N = e.hydrationData != null,
        c = fn(o, e.history.location, s),
        d = null;
    if (c == null && !u) {
        let v = pt(404, {
                pathname: e.history.location.pathname
            }),
            {
                matches: k,
                route: _
            } = rd(o);
        c = k, d = {
            [_.id]: v
        }
    }
    c && !e.hydrationData && Ui(c, o, e.history.location.pathname).active && (c = null);
    let y;
    if (c)
        if (c.some(v => v.route.lazy)) y = !1;
        else if (!c.some(v => v.route.loader)) y = !0;
    else {
        let v = e.hydrationData ? e.hydrationData.loaderData : null,
            k = e.hydrationData ? e.hydrationData.errors : null;
        if (k) {
            let _ = c.findIndex(P => k[P.route.id] !== void 0);
            y = c.slice(0, _ + 1).every(P => !sa(P.route, v, k))
        } else y = c.every(_ => !sa(_.route, v, k))
    } else {
        y = !1, c = [];
        let v = Ui(null, o, e.history.location.pathname);
        v.active && v.matches && (c = v.matches)
    }
    let C, g = {
            historyAction: e.history.action,
            location: e.history.location,
            matches: c,
            initialized: y,
            navigation: ls,
            restoreScrollPosition: e.hydrationData != null ? !1 : null,
            preventScrollReset: !1,
            revalidation: "idle",
            loaderData: e.hydrationData && e.hydrationData.loaderData || {},
            actionData: e.hydrationData && e.hydrationData.actionData || null,
            errors: e.hydrationData && e.hydrationData.errors || d,
            fetchers: new Map,
            blockers: new Map
        },
        R = "POP",
        D = !1,
        j, V = !1,
        L = new Map,
        Y = null,
        H = !1,
        ee = !1,
        oe = new Set,
        te = new Map,
        le = 0,
        Se = -1,
        T = new Map,
        I = new Set,
        B = new Map,
        W = new Map,
        Q = new Set,
        ue = new Map,
        J, ce = null;

    function Me() {
        if (m = e.history.listen(({
                action: v,
                location: k,
                delta: _
            }) => {
                if (J) {
                    J(), J = void 0;
                    return
                }
                $e(ue.size === 0 || _ != null, "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");
                let P = Lu({
                    currentLocation: g.location,
                    nextLocation: k,
                    historyAction: v
                });
                if (P && _ != null) {
                    let b = new Promise($ => {
                        J = $
                    });
                    e.history.go(_ * -1), Ii(P, {
                        state: "blocked",
                        location: k,
                        proceed() {
                            Ii(P, {
                                state: "proceeding",
                                proceed: void 0,
                                reset: void 0,
                                location: k
                            }), b.then(() => e.history.go(_))
                        },
                        reset() {
                            let $ = new Map(g.blockers);
                            $.set(P, Hr), Le({
                                blockers: $
                            })
                        }
                    });
                    return
                }
                return Wt(v, k)
            }), n) {
            Xy(t, L);
            let v = () => Yy(t, L);
            t.addEventListener("pagehide", v), Y = () => t.removeEventListener("pagehide", v)
        }
        return g.initialized || Wt("POP", g.location, {
            initialHydration: !0
        }), C
    }

    function ht() {
        m && m(), Y && Y(), p.clear(), j && j.abort(), g.fetchers.forEach((v, k) => Or(k)), g.blockers.forEach((v, k) => Pu(k))
    }

    function Ai(v) {
        return p.add(v), () => p.delete(v)
    }

    function Le(v, k = {}) {
        g = {
            ...g,
            ...v
        };
        let _ = [],
            P = [];
        g.fetchers.forEach((b, $) => {
            b.state === "idle" && (Q.has($) ? _.push($) : P.push($))
        }), Q.forEach(b => {
            !g.fetchers.has(b) && !te.has(b) && _.push(b)
        }), [...p].forEach(b => b(g, {
            deletedFetchers: _,
            viewTransitionOpts: k.viewTransitionOpts,
            flushSync: k.flushSync === !0
        })), _.forEach(b => Or(b)), P.forEach(b => g.fetchers.delete(b))
    }

    function St(v, k, {
        flushSync: _
    } = {}) {
        var M, X;
        let P = g.actionData != null && g.navigation.formMethod != null && Nt(g.navigation.formMethod) && g.navigation.state === "loading" && ((M = v.state) == null ? void 0 : M._isRedirect) !== !0,
            b;
        k.actionData ? Object.keys(k.actionData).length > 0 ? b = k.actionData : b = null : P ? b = g.actionData : b = null;
        let $ = k.loaderData ? td(g.loaderData, k.loaderData, k.matches || [], k.errors) : g.loaderData,
            K = g.blockers;
        K.size > 0 && (K = new Map(K), K.forEach((G, ye) => K.set(ye, Hr)));
        let F = D === !0 || g.navigation.formMethod != null && Nt(g.navigation.formMethod) && ((X = v.state) == null ? void 0 : X._isRedirect) !== !0;
        l && (o = l, l = void 0), H || R === "POP" || (R === "PUSH" ? e.history.push(v, v.state) : R === "REPLACE" && e.history.replace(v, v.state));
        let U;
        if (R === "POP") {
            let G = L.get(g.location.pathname);
            G && G.has(v.pathname) ? U = {
                currentLocation: g.location,
                nextLocation: v
            } : L.has(v.pathname) && (U = {
                currentLocation: v,
                nextLocation: g.location
            })
        } else if (V) {
            let G = L.get(g.location.pathname);
            G ? G.add(v.pathname) : (G = new Set([v.pathname]), L.set(g.location.pathname, G)), U = {
                currentLocation: g.location,
                nextLocation: v
            }
        }
        Le({
            ...k,
            actionData: b,
            loaderData: $,
            historyAction: R,
            location: v,
            initialized: !0,
            navigation: ls,
            revalidation: "idle",
            restoreScrollPosition: ju(v, k.matches || g.matches),
            preventScrollReset: F,
            blockers: K
        }, {
            viewTransitionOpts: U,
            flushSync: _ === !0
        }), R = "POP", D = !1, V = !1, H = !1, ee = !1, ce == null || ce.resolve(), ce = null
    }
    async function zi(v, k) {
        if (typeof v == "number") {
            e.history.go(v);
            return
        }
        let _ = la(g.location, g.matches, s, v, k == null ? void 0 : k.fromRouteId, k == null ? void 0 : k.relative),
            {
                path: P,
                submission: b,
                error: $
            } = Qc(!1, _, k),
            K = g.location,
            F = Ri(g.location, P, k && k.state);
        F = {
            ...F,
            ...e.history.encodeLocation(F)
        };
        let U = k && k.replace != null ? k.replace : void 0,
            M = "PUSH";
        U === !0 ? M = "REPLACE" : U === !1 || b != null && Nt(b.formMethod) && b.formAction === g.location.pathname + g.location.search && (M = "REPLACE");
        let X = k && "preventScrollReset" in k ? k.preventScrollReset === !0 : void 0,
            G = (k && k.flushSync) === !0,
            ye = Lu({
                currentLocation: K,
                nextLocation: F,
                historyAction: M
            });
        if (ye) {
            Ii(ye, {
                state: "blocked",
                location: F,
                proceed() {
                    Ii(ye, {
                        state: "proceeding",
                        proceed: void 0,
                        reset: void 0,
                        location: F
                    }), zi(v, k)
                },
                reset() {
                    let Ie = new Map(g.blockers);
                    Ie.set(ye, Hr), Le({
                        blockers: Ie
                    })
                }
            });
            return
        }
        await Wt(M, F, {
            submission: b,
            pendingError: $,
            preventScrollReset: X,
            replace: k && k.replace,
            enableViewTransition: k && k.viewTransition,
            flushSync: G
        })
    }

    function Pl() {
        ce || (ce = qy()), q(), Le({
            revalidation: "loading"
        });
        let v = ce.promise;
        return g.navigation.state === "submitting" ? v : g.navigation.state === "idle" ? (Wt(g.historyAction, g.location, {
            startUninterruptedRevalidation: !0
        }), v) : (Wt(R || g.historyAction, g.navigation.location, {
            overrideNavigation: g.navigation,
            enableViewTransition: V === !0
        }), v)
    }
    async function Wt(v, k, _) {
        j && j.abort(), j = null, R = v, H = (_ && _.startUninterruptedRevalidation) === !0, yp(g.location, g.matches), D = (_ && _.preventScrollReset) === !0, V = (_ && _.enableViewTransition) === !0;
        let P = l || o,
            b = _ && _.overrideNavigation,
            $ = fn(P, k, s),
            K = (_ && _.flushSync) === !0,
            F = Ui($, P, k.pathname);
        if (F.active && F.matches && ($ = F.matches), !$) {
            let {
                error: ve,
                notFoundMatches: he,
                route: je
            } = jl(k.pathname);
            St(k, {
                matches: he,
                loaderData: {},
                errors: {
                    [je.id]: ve
                }
            }, {
                flushSync: K
            });
            return
        }
        if (g.initialized && !ee && Vy(g.location, k) && !(_ && _.submission && Nt(_.submission.formMethod))) {
            St(k, {
                matches: $
            }, {
                flushSync: K
            });
            return
        }
        j = new AbortController;
        let U = er(e.history, k, j.signal, _ && _.submission),
            M;
        if (_ && _.pendingError) M = [bn($).route.id, {
            type: "error",
            error: _.pendingError
        }];
        else if (_ && _.submission && Nt(_.submission.formMethod)) {
            let ve = await Ll(U, k, _.submission, $, F.active, {
                replace: _.replace,
                flushSync: K
            });
            if (ve.shortCircuited) return;
            if (ve.pendingActionResult) {
                let [he, je] = ve.pendingActionResult;
                if (st(je) && El(je.error) && je.error.status === 404) {
                    j = null, St(k, {
                        matches: ve.matches,
                        loaderData: {},
                        errors: {
                            [he]: je.error
                        }
                    });
                    return
                }
            }
            $ = ve.matches || $, M = ve.pendingActionResult, b = ss(k, _.submission), K = !1, F.active = !1, U = er(e.history, U.url, U.signal)
        }
        let {
            shortCircuited: X,
            matches: G,
            loaderData: ye,
            errors: Ie
        } = await et(U, k, $, F.active, b, _ && _.submission, _ && _.fetcherSubmission, _ && _.replace, _ && _.initialHydration === !0, K, M);
        X || (j = null, St(k, {
            matches: G || $,
            ...nd(M),
            loaderData: ye,
            errors: Ie
        }))
    }
    async function Ll(v, k, _, P, b, $ = {}) {
        q();
        let K = Ky(k, _);
        if (Le({
                navigation: K
            }, {
                flushSync: $.flushSync === !0
            }), b) {
            let M = await Bi(P, k.pathname, v.signal);
            if (M.type === "aborted") return {
                shortCircuited: !0
            };
            if (M.type === "error") {
                let X = bn(M.partialMatches).route.id;
                return {
                    matches: M.partialMatches,
                    pendingActionResult: [X, {
                        type: "error",
                        error: M.error
                    }]
                }
            } else if (M.matches) P = M.matches;
            else {
                let {
                    notFoundMatches: X,
                    error: G,
                    route: ye
                } = jl(k.pathname);
                return {
                    matches: X,
                    pendingActionResult: [ye.id, {
                        type: "error",
                        error: G
                    }]
                }
            }
        }
        let F, U = Zr(P, k);
        if (!U.route.action && !U.route.lazy) F = {
            type: "error",
            error: pt(405, {
                method: v.method,
                pathname: k.pathname,
                routeId: U.route.id
            })
        };
        else if (F = (await A("action", g, v, [U], P, null))[U.route.id], v.signal.aborted) return {
            shortCircuited: !0
        };
        if (In(F)) {
            let M;
            return $ && $.replace != null ? M = $.replace : M = Jc(F.response.headers.get("Location"), new URL(v.url), s) === g.location.pathname + g.location.search, await Dt(v, F, !0, {
                submission: _,
                replace: M
            }), {
                shortCircuited: !0
            }
        }
        if (st(F)) {
            let M = bn(P, U.route.id);
            return ($ && $.replace) !== !0 && (R = "PUSH"), {
                matches: P,
                pendingActionResult: [M.route.id, F]
            }
        }
        return {
            matches: P,
            pendingActionResult: [U.route.id, F]
        }
    }
    async function et(v, k, _, P, b, $, K, F, U, M, X) {
        let G = b || ss(k, $),
            ye = $ || K || od(G),
            Ie = !H && !U;
        if (P) {
            if (Ie) {
                let He = Ye(X);
                Le({
                    navigation: G,
                    ...He !== void 0 ? {
                        actionData: He
                    } : {}
                }, {
                    flushSync: M
                })
            }
            let de = await Bi(_, k.pathname, v.signal);
            if (de.type === "aborted") return {
                shortCircuited: !0
            };
            if (de.type === "error") {
                let He = bn(de.partialMatches).route.id;
                return {
                    matches: de.partialMatches,
                    loaderData: {},
                    errors: {
                        [He]: de.error
                    }
                }
            } else if (de.matches) _ = de.matches;
            else {
                let {
                    error: He,
                    notFoundMatches: Hi,
                    route: br
                } = jl(k.pathname);
                return {
                    matches: Hi,
                    loaderData: {},
                    errors: {
                        [br.id]: He
                    }
                }
            }
        }
        let ve = l || o,
            [he, je] = Yc(e.history, g, _, ye, k, U === !0, ee, oe, Q, B, I, ve, s, X);
        if (Se = ++le, he.length === 0 && je.length === 0) {
            let de = Nu();
            return St(k, {
                matches: _,
                loaderData: {},
                errors: X && st(X[1]) ? {
                    [X[0]]: X[1].error
                } : null,
                ...nd(X),
                ...de ? {
                    fetchers: new Map(g.fetchers)
                } : {}
            }, {
                flushSync: M
            }), {
                shortCircuited: !0
            }
        }
        if (Ie) {
            let de = {};
            if (!P) {
                de.navigation = G;
                let He = Ye(X);
                He !== void 0 && (de.actionData = He)
            }
            je.length > 0 && (de.fetchers = Fi(je)), Le(de, {
                flushSync: M
            })
        }
        je.forEach(de => {
            on(de.key), de.controller && te.set(de.key, de.controller)
        });
        let Gn = () => je.forEach(de => on(de.key));
        j && j.signal.addEventListener("abort", Gn);
        let {
            loaderResults: Dr,
            fetcherResults: Kt
        } = await ae(g, _, he, je, v);
        if (v.signal.aborted) return {
            shortCircuited: !0
        };
        j && j.signal.removeEventListener("abort", Gn), je.forEach(de => te.delete(de.key));
        let Mt = ao(Dr);
        if (Mt) return await Dt(v, Mt.result, !0, {
            replace: F
        }), {
            shortCircuited: !0
        };
        if (Mt = ao(Kt), Mt) return I.add(Mt.key), await Dt(v, Mt.result, !0, {
            replace: F
        }), {
            shortCircuited: !0
        };
        let {
            loaderData: Ol,
            errors: Mr
        } = ed(g, _, Dr, X, je, Kt);
        U && g.errors && (Mr = {
            ...g.errors,
            ...Mr
        });
        let On = Nu(),
            $i = Ru(Se),
            Vi = On || $i || je.length > 0;
        return {
            matches: _,
            loaderData: Ol,
            errors: Mr,
            ...Vi ? {
                fetchers: new Map(g.fetchers)
            } : {}
        }
    }

    function Ye(v) {
        if (v && !st(v[1])) return {
            [v[0]]: v[1].data
        };
        if (g.actionData) return Object.keys(g.actionData).length === 0 ? null : g.actionData
    }

    function Fi(v) {
        return v.forEach(k => {
            let _ = g.fetchers.get(k.key),
                P = Wr(void 0, _ ? _.data : void 0);
            g.fetchers.set(k.key, P)
        }), new Map(g.fetchers)
    }
    async function jn(v, k, _, P) {
        on(v);
        let b = (P && P.flushSync) === !0,
            $ = l || o,
            K = la(g.location, g.matches, s, _, k, P == null ? void 0 : P.relative),
            F = fn($, K, s),
            U = Ui(F, $, K);
        if (U.active && U.matches && (F = U.matches), !F) {
            ze(v, k, pt(404, {
                pathname: K
            }), {
                flushSync: b
            });
            return
        }
        let {
            path: M,
            submission: X,
            error: G
        } = Qc(!0, K, P);
        if (G) {
            ze(v, k, G, {
                flushSync: b
            });
            return
        }
        let ye = Zr(F, M),
            Ie = (P && P.preventScrollReset) === !0;
        if (X && Nt(X.formMethod)) {
            await Te(v, k, M, ye, F, U.active, b, Ie, X);
            return
        }
        B.set(v, {
            routeId: k,
            path: M
        }), await Tl(v, k, M, ye, F, U.active, b, Ie, X)
    }
    async function Te(v, k, _, P, b, $, K, F, U) {
        q(), B.delete(v);

        function M(Ne) {
            if (!Ne.route.action && !Ne.route.lazy) {
                let Jn = pt(405, {
                    method: U.formMethod,
                    pathname: _,
                    routeId: k
                });
                return ze(v, k, Jn, {
                    flushSync: K
                }), !0
            }
            return !1
        }
        if (!$ && M(P)) return;
        let X = g.fetchers.get(v);
        Ce(v, Qy(U, X), {
            flushSync: K
        });
        let G = new AbortController,
            ye = er(e.history, _, G.signal, U);
        if ($) {
            let Ne = await Bi(b, _, ye.signal);
            if (Ne.type === "aborted") return;
            if (Ne.type === "error") {
                ze(v, k, Ne.error, {
                    flushSync: K
                });
                return
            } else if (Ne.matches) {
                if (b = Ne.matches, P = Zr(b, _), M(P)) return
            } else {
                ze(v, k, pt(404, {
                    pathname: _
                }), {
                    flushSync: K
                });
                return
            }
        }
        te.set(v, G);
        let Ie = le,
            he = (await A("action", g, ye, [P], b, v))[P.route.id];
        if (ye.signal.aborted) {
            te.get(v) === G && te.delete(v);
            return
        }
        if (Q.has(v)) {
            if (In(he) || st(he)) {
                Ce(v, sn(void 0));
                return
            }
        } else {
            if (In(he))
                if (te.delete(v), Se > Ie) {
                    Ce(v, sn(void 0));
                    return
                } else return I.add(v), Ce(v, Wr(U)), Dt(ye, he, !1, {
                    fetcherSubmission: U,
                    preventScrollReset: F
                });
            if (st(he)) {
                ze(v, k, he.error);
                return
            }
        }
        let je = g.navigation.location || g.location,
            Gn = er(e.history, je, G.signal),
            Dr = l || o,
            Kt = g.navigation.state !== "idle" ? fn(Dr, g.navigation.location, s) : g.matches;
        re(Kt, "Didn't find any matches after fetcher action");
        let Mt = ++le;
        T.set(v, Mt);
        let Ol = Wr(U, he.data);
        g.fetchers.set(v, Ol);
        let [Mr, On] = Yc(e.history, g, Kt, U, je, !1, ee, oe, Q, B, I, Dr, s, [P.route.id, he]);
        On.filter(Ne => Ne.key !== v).forEach(Ne => {
            let Jn = Ne.key,
                Ou = g.fetchers.get(Jn),
                wp = Wr(void 0, Ou ? Ou.data : void 0);
            g.fetchers.set(Jn, wp), on(Jn), Ne.controller && te.set(Jn, Ne.controller)
        }), Le({
            fetchers: new Map(g.fetchers)
        });
        let $i = () => On.forEach(Ne => on(Ne.key));
        G.signal.addEventListener("abort", $i);
        let {
            loaderResults: Vi,
            fetcherResults: de
        } = await ae(g, Kt, Mr, On, Gn);
        if (G.signal.aborted) return;
        G.signal.removeEventListener("abort", $i), T.delete(v), te.delete(v), On.forEach(Ne => te.delete(Ne.key));
        let He = ao(Vi);
        if (He) return Dt(Gn, He.result, !1, {
            preventScrollReset: F
        });
        if (He = ao(de), He) return I.add(He.key), Dt(Gn, He.result, !1, {
            preventScrollReset: F
        });
        let {
            loaderData: Hi,
            errors: br
        } = ed(g, Kt, Vi, void 0, On, de);
        if (g.fetchers.has(v)) {
            let Ne = sn(he.data);
            g.fetchers.set(v, Ne)
        }
        Ru(Mt), g.navigation.state === "loading" && Mt > Se ? (re(R, "Expected pending action"), j && j.abort(), St(g.navigation.location, {
            matches: Kt,
            loaderData: Hi,
            errors: br,
            fetchers: new Map(g.fetchers)
        })) : (Le({
            errors: br,
            loaderData: td(g.loaderData, Hi, Kt, br),
            fetchers: new Map(g.fetchers)
        }), ee = !1)
    }
    async function Tl(v, k, _, P, b, $, K, F, U) {
        let M = g.fetchers.get(v);
        Ce(v, Wr(U, M ? M.data : void 0), {
            flushSync: K
        });
        let X = new AbortController,
            G = er(e.history, _, X.signal);
        if ($) {
            let he = await Bi(b, _, G.signal);
            if (he.type === "aborted") return;
            if (he.type === "error") {
                ze(v, k, he.error, {
                    flushSync: K
                });
                return
            } else if (he.matches) b = he.matches, P = Zr(b, _);
            else {
                ze(v, k, pt(404, {
                    pathname: _
                }), {
                    flushSync: K
                });
                return
            }
        }
        te.set(v, X);
        let ye = le,
            ve = (await A("loader", g, G, [P], b, v))[P.route.id];
        if (te.get(v) === X && te.delete(v), !G.signal.aborted) {
            if (Q.has(v)) {
                Ce(v, sn(void 0));
                return
            }
            if (In(ve))
                if (Se > ye) {
                    Ce(v, sn(void 0));
                    return
                } else {
                    I.add(v), await Dt(G, ve, !1, {
                        preventScrollReset: F
                    });
                    return
                } if (st(ve)) {
                ze(v, k, ve.error);
                return
            }
            Ce(v, sn(ve.data))
        }
    }
    async function Dt(v, k, _, {
        submission: P,
        fetcherSubmission: b,
        preventScrollReset: $,
        replace: K
    } = {}) {
        k.response.headers.has("X-Remix-Revalidate") && (ee = !0);
        let F = k.response.headers.get("Location");
        re(F, "Expected a Location header on the redirect Response"), F = Jc(F, new URL(v.url), s);
        let U = Ri(g.location, F, {
            _isRedirect: !0
        });
        if (n) {
            let ve = !1;
            if (k.response.headers.has("X-Remix-Reload-Document")) ve = !0;
            else if (fu.test(F)) {
                const he = e.history.createURL(F);
                ve = he.origin !== t.location.origin || Ot(he.pathname, s) == null
            }
            if (ve) {
                K ? t.location.replace(F) : t.location.assign(F);
                return
            }
        }
        j = null;
        let M = K === !0 || k.response.headers.has("X-Remix-Replace") ? "REPLACE" : "PUSH",
            {
                formMethod: X,
                formAction: G,
                formEncType: ye
            } = g.navigation;
        !P && !b && X && G && ye && (P = od(g.navigation));
        let Ie = P || b;
        if (Ly.has(k.response.status) && Ie && Nt(Ie.formMethod)) await Wt(M, U, {
            submission: {
                ...Ie,
                formAction: F
            },
            preventScrollReset: $ || D,
            enableViewTransition: _ ? V : void 0
        });
        else {
            let ve = ss(U, P);
            await Wt(M, U, {
                overrideNavigation: ve,
                fetcherSubmission: b,
                preventScrollReset: $ || D,
                enableViewTransition: _ ? V : void 0
            })
        }
    }
    async function A(v, k, _, P, b, $) {
        let K, F = {};
        try {
            K = await Fy(a, v, k, _, P, b, $, i, r)
        } catch (U) {
            return P.forEach(M => {
                F[M.route.id] = {
                    type: "error",
                    error: U
                }
            }), F
        }
        for (let [U, M] of Object.entries(K))
            if (Hy(M)) {
                let X = M.result;
                F[U] = {
                    type: "redirect",
                    response: By(X, _, U, b, s)
                }
            } else F[U] = await Uy(M);
        return F
    }
    async function ae(v, k, _, P, b) {
        let $ = A("loader", v, b, _, k, null),
            K = Promise.all(P.map(async M => {
                if (M.matches && M.match && M.controller) {
                    let G = (await A("loader", v, er(e.history, M.path, M.controller.signal), [M.match], M.matches, M.key))[M.match.route.id];
                    return {
                        [M.key]: G
                    }
                } else return Promise.resolve({
                    [M.key]: {
                        type: "error",
                        error: pt(404, {
                            pathname: M.path
                        })
                    }
                })
            })),
            F = await $,
            U = (await K).reduce((M, X) => Object.assign(M, X), {});
        return {
            loaderResults: F,
            fetcherResults: U
        }
    }

    function q() {
        ee = !0, B.forEach((v, k) => {
            te.has(k) && oe.add(k), on(k)
        })
    }

    function Ce(v, k, _ = {}) {
        g.fetchers.set(v, k), Le({
            fetchers: new Map(g.fetchers)
        }, {
            flushSync: (_ && _.flushSync) === !0
        })
    }

    function ze(v, k, _, P = {}) {
        let b = bn(g.matches, k);
        Or(v), Le({
            errors: {
                [b.route.id]: _
            },
            fetchers: new Map(g.fetchers)
        }, {
            flushSync: (P && P.flushSync) === !0
        })
    }

    function Fe(v) {
        return W.set(v, (W.get(v) || 0) + 1), Q.has(v) && Q.delete(v), g.fetchers.get(v) || Ty
    }

    function Or(v) {
        let k = g.fetchers.get(v);
        te.has(v) && !(k && k.state === "loading" && T.has(v)) && on(v), B.delete(v), T.delete(v), I.delete(v), Q.delete(v), oe.delete(v), g.fetchers.delete(v)
    }

    function hp(v) {
        let k = (W.get(v) || 0) - 1;
        k <= 0 ? (W.delete(v), Q.add(v)) : W.set(v, k), Le({
            fetchers: new Map(g.fetchers)
        })
    }

    function on(v) {
        let k = te.get(v);
        k && (k.abort(), te.delete(v))
    }

    function Cu(v) {
        for (let k of v) {
            let _ = Fe(k),
                P = sn(_.data);
            g.fetchers.set(k, P)
        }
    }

    function Nu() {
        let v = [],
            k = !1;
        for (let _ of I) {
            let P = g.fetchers.get(_);
            re(P, `Expected fetcher: ${_}`), P.state === "loading" && (I.delete(_), v.push(_), k = !0)
        }
        return Cu(v), k
    }

    function Ru(v) {
        let k = [];
        for (let [_, P] of T)
            if (P < v) {
                let b = g.fetchers.get(_);
                re(b, `Expected fetcher: ${_}`), b.state === "loading" && (on(_), T.delete(_), k.push(_))
            } return Cu(k), k.length > 0
    }

    function pp(v, k) {
        let _ = g.blockers.get(v) || Hr;
        return ue.get(v) !== k && ue.set(v, k), _
    }

    function Pu(v) {
        g.blockers.delete(v), ue.delete(v)
    }

    function Ii(v, k) {
        let _ = g.blockers.get(v) || Hr;
        re(_.state === "unblocked" && k.state === "blocked" || _.state === "blocked" && k.state === "blocked" || _.state === "blocked" && k.state === "proceeding" || _.state === "blocked" && k.state === "unblocked" || _.state === "proceeding" && k.state === "unblocked", `Invalid blocker state transition: ${_.state} -> ${k.state}`);
        let P = new Map(g.blockers);
        P.set(v, k), Le({
            blockers: P
        })
    }

    function Lu({
        currentLocation: v,
        nextLocation: k,
        historyAction: _
    }) {
        if (ue.size === 0) return;
        ue.size > 1 && $e(!1, "A router only supports one blocker at a time");
        let P = Array.from(ue.entries()),
            [b, $] = P[P.length - 1],
            K = g.blockers.get(b);
        if (!(K && K.state === "proceeding") && $({
                currentLocation: v,
                nextLocation: k,
                historyAction: _
            })) return b
    }

    function jl(v) {
        let k = pt(404, {
                pathname: v
            }),
            _ = l || o,
            {
                matches: P,
                route: b
            } = rd(_);
        return {
            notFoundMatches: P,
            route: b,
            error: k
        }
    }

    function mp(v, k, _) {
        if (w = v, E = k, S = _ || null, !N && g.navigation === ls) {
            N = !0;
            let P = ju(g.location, g.matches);
            P != null && Le({
                restoreScrollPosition: P
            })
        }
        return () => {
            w = null, E = null, S = null
        }
    }

    function Tu(v, k) {
        return S && S(v, k.map(P => sy(P, g.loaderData))) || v.key
    }

    function yp(v, k) {
        if (w && E) {
            let _ = Tu(v, k);
            w[_] = E()
        }
    }

    function ju(v, k) {
        if (w) {
            let _ = Tu(v, k),
                P = w[_];
            if (typeof P == "number") return P
        }
        return null
    }

    function Ui(v, k, _) {
        if (u)
            if (v) {
                if (Object.keys(v[0].params).length > 0) return {
                    active: !0,
                    matches: No(k, _, s, !0)
                }
            } else return {
                active: !0,
                matches: No(k, _, s, !0) || []
            };
        return {
            active: !1,
            matches: null
        }
    }
    async function Bi(v, k, _) {
        if (!u) return {
            type: "success",
            matches: v
        };
        let P = v;
        for (;;) {
            let b = l == null,
                $ = l || o,
                K = i;
            try {
                await u({
                    path: k,
                    matches: P,
                    patch: (M, X) => {
                        _.aborted || Gc(M, X, $, K, r)
                    }
                })
            } catch (M) {
                return {
                    type: "error",
                    error: M,
                    partialMatches: P
                }
            } finally {
                b && !_.aborted && (o = [...o])
            }
            if (_.aborted) return {
                type: "aborted"
            };
            let F = fn($, k, s);
            if (F) return {
                type: "success",
                matches: F
            };
            let U = No($, k, s, !0);
            if (!U || P.length === U.length && P.every((M, X) => M.route.id === U[X].route.id)) return {
                type: "success",
                matches: null
            };
            P = U
        }
    }

    function gp(v) {
        i = {}, l = il(v, r, void 0, i)
    }

    function vp(v, k) {
        let _ = l == null;
        Gc(v, k, l || o, i, r), _ && (o = [...o], Le({}))
    }
    return C = {
        get basename() {
            return s
        },
        get future() {
            return h
        },
        get state() {
            return g
        },
        get routes() {
            return o
        },
        get window() {
            return t
        },
        initialize: Me,
        subscribe: Ai,
        enableScrollRestoration: mp,
        navigate: zi,
        fetch: jn,
        revalidate: Pl,
        createHref: v => e.history.createHref(v),
        encodeLocation: v => e.history.encodeLocation(v),
        getFetcher: Fe,
        deleteFetcher: hp,
        dispose: ht,
        getBlocker: pp,
        deleteBlocker: Pu,
        patchRoutes: vp,
        _internalFetchControllers: te,
        _internalSetRoutes: gp
    }, C
}

function Dy(e) {
    return e != null && ("formData" in e && e.formData != null || "body" in e && e.body !== void 0)
}

function la(e, t, n, r, i, o) {
    let l, s;
    if (i) {
        l = [];
        for (let u of t)
            if (l.push(u), u.route.id === i) {
                s = u;
                break
            }
    } else l = t, s = t[t.length - 1];
    let a = du(r || ".", cu(l), Ot(e.pathname, n) || e.pathname, o === "path");
    if (r == null && (a.search = e.search, a.hash = e.hash), (r == null || r === "" || r === ".") && s) {
        let u = hu(a.search);
        if (s.route.index && !u) a.search = a.search ? a.search.replace(/^\?/, "?index&") : "?index";
        else if (!s.route.index && u) {
            let h = new URLSearchParams(a.search),
                m = h.getAll("index");
            h.delete("index"), m.filter(w => w).forEach(w => h.append("index", w));
            let p = h.toString();
            a.search = p ? `?${p}` : ""
        }
    }
    return n !== "/" && (a.pathname = a.pathname === "/" ? n : Bt([n, a.pathname])), Nn(a)
}

function Qc(e, t, n) {
    if (!n || !Dy(n)) return {
        path: t
    };
    if (n.formMethod && !Wy(n.formMethod)) return {
        path: t,
        error: pt(405, {
            method: n.formMethod
        })
    };
    let r = () => ({
            path: t,
            error: pt(400, {
                type: "invalid-body"
            })
        }),
        o = (n.formMethod || "get").toUpperCase(),
        l = Bh(t);
    if (n.body !== void 0) {
        if (n.formEncType === "text/plain") {
            if (!Nt(o)) return r();
            let m = typeof n.body == "string" ? n.body : n.body instanceof FormData || n.body instanceof URLSearchParams ? Array.from(n.body.entries()).reduce((p, [w, S]) => `${p}${w}=${S}
`, "") : String(n.body);
            return {
                path: t,
                submission: {
                    formMethod: o,
                    formAction: l,
                    formEncType: n.formEncType,
                    formData: void 0,
                    json: void 0,
                    text: m
                }
            }
        } else if (n.formEncType === "application/json") {
            if (!Nt(o)) return r();
            try {
                let m = typeof n.body == "string" ? JSON.parse(n.body) : n.body;
                return {
                    path: t,
                    submission: {
                        formMethod: o,
                        formAction: l,
                        formEncType: n.formEncType,
                        formData: void 0,
                        json: m,
                        text: void 0
                    }
                }
            } catch {
                return r()
            }
        }
    }
    re(typeof FormData == "function", "FormData is not available in this environment");
    let s, a;
    if (n.formData) s = aa(n.formData), a = n.formData;
    else if (n.body instanceof FormData) s = aa(n.body), a = n.body;
    else if (n.body instanceof URLSearchParams) s = n.body, a = Zc(s);
    else if (n.body == null) s = new URLSearchParams, a = new FormData;
    else try {
        s = new URLSearchParams(n.body), a = Zc(s)
    } catch {
        return r()
    }
    let u = {
        formMethod: o,
        formAction: l,
        formEncType: n && n.formEncType || "application/x-www-form-urlencoded",
        formData: a,
        json: void 0,
        text: void 0
    };
    if (Nt(u.formMethod)) return {
        path: t,
        submission: u
    };
    let h = Tn(t);
    return e && h.search && hu(h.search) && s.append("index", ""), h.search = `?${s}`, {
        path: Nn(h),
        submission: u
    }
}

function Xc(e, t, n = !1) {
    let r = e.findIndex(i => i.route.id === t);
    return r >= 0 ? e.slice(0, n ? r + 1 : r) : e
}

function Yc(e, t, n, r, i, o, l, s, a, u, h, m, p, w) {
    let S = w ? st(w[1]) ? w[1].error : w[1].data : void 0,
        E = e.createURL(t.location),
        N = e.createURL(i),
        c = n;
    o && t.errors ? c = Xc(n, Object.keys(t.errors)[0], !0) : w && st(w[1]) && (c = Xc(n, w[0]));
    let d = w ? w[1].statusCode : void 0,
        y = d && d >= 400,
        C = c.filter((R, D) => {
            let {
                route: j
            } = R;
            if (j.lazy) return !0;
            if (j.loader == null) return !1;
            if (o) return sa(j, t.loaderData, t.errors);
            if (My(t.loaderData, t.matches[D], R)) return !0;
            let V = t.matches[D],
                L = R;
            return qc(R, {
                currentUrl: E,
                currentParams: V.params,
                nextUrl: N,
                nextParams: L.params,
                ...r,
                actionResult: S,
                actionStatus: d,
                defaultShouldRevalidate: y ? !1 : l || E.pathname + E.search === N.pathname + N.search || E.search !== N.search || by(V, L)
            })
        }),
        g = [];
    return u.forEach((R, D) => {
        if (o || !n.some(H => H.route.id === R.routeId) || a.has(D)) return;
        let j = fn(m, R.path, p);
        if (!j) {
            g.push({
                key: D,
                routeId: R.routeId,
                path: R.path,
                matches: null,
                match: null,
                controller: null
            });
            return
        }
        let V = t.fetchers.get(D),
            L = Zr(j, R.path),
            Y = !1;
        h.has(D) ? Y = !1 : s.has(D) ? (s.delete(D), Y = !0) : V && V.state !== "idle" && V.data === void 0 ? Y = l : Y = qc(L, {
            currentUrl: E,
            currentParams: t.matches[t.matches.length - 1].params,
            nextUrl: N,
            nextParams: n[n.length - 1].params,
            ...r,
            actionResult: S,
            actionStatus: d,
            defaultShouldRevalidate: y ? !1 : l
        }), Y && g.push({
            key: D,
            routeId: R.routeId,
            path: R.path,
            matches: j,
            match: L,
            controller: new AbortController
        })
    }), [C, g]
}

function sa(e, t, n) {
    if (e.lazy) return !0;
    if (!e.loader) return !1;
    let r = t != null && t[e.id] !== void 0,
        i = n != null && n[e.id] !== void 0;
    return !r && i ? !1 : typeof e.loader == "function" && e.loader.hydrate === !0 ? !0 : !r && !i
}

function My(e, t, n) {
    let r = !t || n.route.id !== t.route.id,
        i = !e.hasOwnProperty(n.route.id);
    return r || i
}

function by(e, t) {
    let n = e.route.path;
    return e.pathname !== t.pathname || n != null && n.endsWith("*") && e.params["*"] !== t.params["*"]
}

function qc(e, t) {
    if (e.route.shouldRevalidate) {
        let n = e.route.shouldRevalidate(t);
        if (typeof n == "boolean") return n
    }
    return t.defaultShouldRevalidate
}

function Gc(e, t, n, r, i) {
    let o;
    if (e) {
        let a = r[e];
        re(a, `No route found to patch children into: routeId = ${e}`), a.children || (a.children = []), o = a.children
    } else o = n;
    let l = t.filter(a => !o.some(u => Uh(a, u))),
        s = il(l, i, [e || "_", "patch", String((o == null ? void 0 : o.length) || "0")], r);
    o.push(...s)
}

function Uh(e, t) {
    return "id" in e && "id" in t && e.id === t.id ? !0 : e.index === t.index && e.path === t.path && e.caseSensitive === t.caseSensitive ? (!e.children || e.children.length === 0) && (!t.children || t.children.length === 0) ? !0 : e.children.every((n, r) => {
        var i;
        return (i = t.children) == null ? void 0 : i.some(o => Uh(n, o))
    }) : !1
}
async function Ay(e, t, n) {
    if (!e.lazy) return;
    let r = await e.lazy();
    if (!e.lazy) return;
    let i = n[e.id];
    re(i, "No route found in manifest");
    let o = {};
    for (let l in r) {
        let a = i[l] !== void 0 && l !== "hasErrorBoundary";
        $e(!a, `Route "${i.id}" has a static property "${l}" defined but its lazy function is also returning a value for this property. The lazy route property "${l}" will be ignored.`), !a && !oy.has(l) && (o[l] = r[l])
    }
    Object.assign(i, o), Object.assign(i, {
        ...t(i),
        lazy: void 0
    })
}
async function zy({
    matches: e
}) {
    let t = e.filter(r => r.shouldLoad);
    return (await Promise.all(t.map(r => r.resolve()))).reduce((r, i, o) => Object.assign(r, {
        [t[o].route.id]: i
    }), {})
}
async function Fy(e, t, n, r, i, o, l, s, a, u) {
    let h = o.map(w => w.route.lazy ? Ay(w.route, a, s) : void 0),
        m = o.map((w, S) => {
            let E = h[S],
                N = i.some(d => d.route.id === w.route.id);
            return {
                ...w,
                shouldLoad: N,
                resolve: async d => (d && r.method === "GET" && (w.route.lazy || w.route.loader) && (N = !0), N ? Iy(t, r, w, E, d, u) : Promise.resolve({
                    type: "data",
                    result: void 0
                }))
            }
        }),
        p = await e({
            matches: m,
            request: r,
            params: o[0].params,
            fetcherKey: l,
            context: u
        });
    try {
        await Promise.all(h)
    } catch {}
    return p
}
async function Iy(e, t, n, r, i, o) {
    let l, s, a = u => {
        let h, m = new Promise((S, E) => h = E);
        s = () => h(), t.signal.addEventListener("abort", s);
        let p = S => typeof u != "function" ? Promise.reject(new Error(`You cannot call the handler for a route which defines a boolean "${e}" [routeId: ${n.route.id}]`)) : u({
                request: t,
                params: n.params,
                context: o
            }, ...S !== void 0 ? [S] : []),
            w = (async () => {
                try {
                    return {
                        type: "data",
                        result: await (i ? i(E => p(E)) : p())
                    }
                } catch (S) {
                    return {
                        type: "error",
                        result: S
                    }
                }
            })();
        return Promise.race([w, m])
    };
    try {
        let u = n.route[e];
        if (r)
            if (u) {
                let h, [m] = await Promise.all([a(u).catch(p => {
                    h = p
                }), r]);
                if (h !== void 0) throw h;
                l = m
            } else if (await r, u = n.route[e], u) l = await a(u);
        else if (e === "action") {
            let h = new URL(t.url),
                m = h.pathname + h.search;
            throw pt(405, {
                method: t.method,
                pathname: m,
                routeId: n.route.id
            })
        } else return {
            type: "data",
            result: void 0
        };
        else if (u) l = await a(u);
        else {
            let h = new URL(t.url),
                m = h.pathname + h.search;
            throw pt(404, {
                pathname: m
            })
        }
    } catch (u) {
        return {
            type: "error",
            result: u
        }
    } finally {
        s && t.signal.removeEventListener("abort", s)
    }
    return l
}
async function Uy(e) {
    var r, i, o, l;
    let {
        result: t,
        type: n
    } = e;
    if ($h(t)) {
        let s;
        try {
            let a = t.headers.get("Content-Type");
            a && /\bapplication\/json\b/.test(a) ? t.body == null ? s = null : s = await t.json() : s = await t.text()
        } catch (a) {
            return {
                type: "error",
                error: a
            }
        }
        return n === "error" ? {
            type: "error",
            error: new ll(t.status, t.statusText, s),
            statusCode: t.status,
            headers: t.headers
        } : {
            type: "data",
            data: s,
            statusCode: t.status,
            headers: t.headers
        }
    }
    if (n === "error") {
        if (id(t)) {
            if (t.data instanceof Error) return {
                type: "error",
                error: t.data,
                statusCode: (r = t.init) == null ? void 0 : r.status
            };
            t = new ll(((i = t.init) == null ? void 0 : i.status) || 500, void 0, t.data)
        }
        return {
            type: "error",
            error: t,
            statusCode: El(t) ? t.status : void 0
        }
    }
    return id(t) ? {
        type: "data",
        data: t.data,
        statusCode: (o = t.init) == null ? void 0 : o.status,
        headers: (l = t.init) != null && l.headers ? new Headers(t.init.headers) : void 0
    } : {
        type: "data",
        data: t
    }
}

function By(e, t, n, r, i) {
    let o = e.headers.get("Location");
    if (re(o, "Redirects returned/thrown from loaders/actions must have a Location header"), !fu.test(o)) {
        let l = r.slice(0, r.findIndex(s => s.route.id === n) + 1);
        o = la(new URL(t.url), l, i, o), e.headers.set("Location", o)
    }
    return e
}

function Jc(e, t, n) {
    if (fu.test(e)) {
        let r = e,
            i = r.startsWith("//") ? new URL(t.protocol + r) : new URL(r),
            o = Ot(i.pathname, n) != null;
        if (i.origin === t.origin && o) return i.pathname + i.search + i.hash
    }
    return e
}

function er(e, t, n, r) {
    let i = e.createURL(Bh(t)).toString(),
        o = {
            signal: n
        };
    if (r && Nt(r.formMethod)) {
        let {
            formMethod: l,
            formEncType: s
        } = r;
        o.method = l.toUpperCase(), s === "application/json" ? (o.headers = new Headers({
            "Content-Type": s
        }), o.body = JSON.stringify(r.json)) : s === "text/plain" ? o.body = r.text : s === "application/x-www-form-urlencoded" && r.formData ? o.body = aa(r.formData) : o.body = r.formData
    }
    return new Request(i, o)
}

function aa(e) {
    let t = new URLSearchParams;
    for (let [n, r] of e.entries()) t.append(n, typeof r == "string" ? r : r.name);
    return t
}

function Zc(e) {
    let t = new FormData;
    for (let [n, r] of e.entries()) t.append(n, r);
    return t
}

function $y(e, t, n, r = !1, i = !1) {
    let o = {},
        l = null,
        s, a = !1,
        u = {},
        h = n && st(n[1]) ? n[1].error : void 0;
    return e.forEach(m => {
        if (!(m.route.id in t)) return;
        let p = m.route.id,
            w = t[p];
        if (re(!In(w), "Cannot handle redirect results in processLoaderData"), st(w)) {
            let S = w.error;
            if (h !== void 0 && (S = h, h = void 0), l = l || {}, i) l[p] = S;
            else {
                let E = bn(e, p);
                l[E.route.id] == null && (l[E.route.id] = S)
            }
            r || (o[p] = Ih), a || (a = !0, s = El(w.error) ? w.error.status : 500), w.headers && (u[p] = w.headers)
        } else o[p] = w.data, w.statusCode && w.statusCode !== 200 && !a && (s = w.statusCode), w.headers && (u[p] = w.headers)
    }), h !== void 0 && n && (l = {
        [n[0]]: h
    }, o[n[0]] = void 0), {
        loaderData: o,
        errors: l,
        statusCode: s || 200,
        loaderHeaders: u
    }
}

function ed(e, t, n, r, i, o) {
    let {
        loaderData: l,
        errors: s
    } = $y(t, n, r);
    return i.forEach(a => {
        let {
            key: u,
            match: h,
            controller: m
        } = a, p = o[u];
        if (re(p, "Did not find corresponding fetcher result"), !(m && m.signal.aborted))
            if (st(p)) {
                let w = bn(e.matches, h == null ? void 0 : h.route.id);
                s && s[w.route.id] || (s = {
                    ...s,
                    [w.route.id]: p.error
                }), e.fetchers.delete(u)
            } else if (In(p)) re(!1, "Unhandled fetcher revalidation redirect");
        else {
            let w = sn(p.data);
            e.fetchers.set(u, w)
        }
    }), {
        loaderData: l,
        errors: s
    }
}

function td(e, t, n, r) {
    let i = Object.entries(t).filter(([, o]) => o !== Ih).reduce((o, [l, s]) => (o[l] = s, o), {});
    for (let o of n) {
        let l = o.route.id;
        if (!t.hasOwnProperty(l) && e.hasOwnProperty(l) && o.route.loader && (i[l] = e[l]), r && r.hasOwnProperty(l)) break
    }
    return i
}

function nd(e) {
    return e ? st(e[1]) ? {
        actionData: {}
    } : {
        actionData: {
            [e[0]]: e[1].data
        }
    } : {}
}

function bn(e, t) {
    return (t ? e.slice(0, e.findIndex(r => r.route.id === t) + 1) : [...e]).reverse().find(r => r.route.hasErrorBoundary === !0) || e[0]
}

function rd(e) {
    let t = e.length === 1 ? e[0] : e.find(n => n.index || !n.path || n.path === "/") || {
        id: "__shim-error-route__"
    };
    return {
        matches: [{
            params: {},
            pathname: "",
            pathnameBase: "",
            route: t
        }],
        route: t
    }
}

function pt(e, {
    pathname: t,
    routeId: n,
    method: r,
    type: i,
    message: o
} = {}) {
    let l = "Unknown Server Error",
        s = "Unknown @remix-run/router error";
    return e === 400 ? (l = "Bad Request", r && t && n ? s = `You made a ${r} request to "${t}" but did not provide a \`loader\` for route "${n}", so there is no way to handle the request.` : i === "invalid-body" && (s = "Unable to encode submission body")) : e === 403 ? (l = "Forbidden", s = `Route "${n}" does not match URL "${t}"`) : e === 404 ? (l = "Not Found", s = `No route matches URL "${t}"`) : e === 405 && (l = "Method Not Allowed", r && t && n ? s = `You made a ${r.toUpperCase()} request to "${t}" but did not provide an \`action\` for route "${n}", so there is no way to handle the request.` : r && (s = `Invalid request method "${r.toUpperCase()}"`)), new ll(e || 500, l, new Error(s), !0)
}

function ao(e) {
    let t = Object.entries(e);
    for (let n = t.length - 1; n >= 0; n--) {
        let [r, i] = t[n];
        if (In(i)) return {
            key: r,
            result: i
        }
    }
}

function Bh(e) {
    let t = typeof e == "string" ? Tn(e) : e;
    return Nn({
        ...t,
        hash: ""
    })
}

function Vy(e, t) {
    return e.pathname !== t.pathname || e.search !== t.search ? !1 : e.hash === "" ? t.hash !== "" : e.hash === t.hash ? !0 : t.hash !== ""
}

function Hy(e) {
    return $h(e.result) && Py.has(e.result.status)
}

function st(e) {
    return e.type === "error"
}

function In(e) {
    return (e && e.type) === "redirect"
}

function id(e) {
    return typeof e == "object" && e != null && "type" in e && "data" in e && "init" in e && e.type === "DataWithResponseInit"
}

function $h(e) {
    return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body < "u"
}

function Wy(e) {
    return Ry.has(e.toUpperCase())
}

function Nt(e) {
    return Cy.has(e.toUpperCase())
}

function hu(e) {
    return new URLSearchParams(e).getAll("index").some(t => t === "")
}

function Zr(e, t) {
    let n = typeof t == "string" ? Tn(t).search : t.search;
    if (e[e.length - 1].route.index && hu(n || "")) return e[e.length - 1];
    let r = Ah(e);
    return r[r.length - 1]
}

function od(e) {
    let {
        formMethod: t,
        formAction: n,
        formEncType: r,
        text: i,
        formData: o,
        json: l
    } = e;
    if (!(!t || !n || !r)) {
        if (i != null) return {
            formMethod: t,
            formAction: n,
            formEncType: r,
            formData: void 0,
            json: void 0,
            text: i
        };
        if (o != null) return {
            formMethod: t,
            formAction: n,
            formEncType: r,
            formData: o,
            json: void 0,
            text: void 0
        };
        if (l !== void 0) return {
            formMethod: t,
            formAction: n,
            formEncType: r,
            formData: void 0,
            json: l,
            text: void 0
        }
    }
}

function ss(e, t) {
    return t ? {
        state: "loading",
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text
    } : {
        state: "loading",
        location: e,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0
    }
}

function Ky(e, t) {
    return {
        state: "submitting",
        location: e,
        formMethod: t.formMethod,
        formAction: t.formAction,
        formEncType: t.formEncType,
        formData: t.formData,
        json: t.json,
        text: t.text
    }
}

function Wr(e, t) {
    return e ? {
        state: "loading",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t
    } : {
        state: "loading",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: t
    }
}

function Qy(e, t) {
    return {
        state: "submitting",
        formMethod: e.formMethod,
        formAction: e.formAction,
        formEncType: e.formEncType,
        formData: e.formData,
        json: e.json,
        text: e.text,
        data: t ? t.data : void 0
    }
}

function sn(e) {
    return {
        state: "idle",
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        json: void 0,
        text: void 0,
        data: e
    }
}

function Xy(e, t) {
    try {
        let n = e.sessionStorage.getItem(Fh);
        if (n) {
            let r = JSON.parse(n);
            for (let [i, o] of Object.entries(r || {})) o && Array.isArray(o) && t.set(i, new Set(o || []))
        }
    } catch {}
}

function Yy(e, t) {
    if (t.size > 0) {
        let n = {};
        for (let [r, i] of t) n[r] = [...i];
        try {
            e.sessionStorage.setItem(Fh, JSON.stringify(n))
        } catch (r) {
            $e(!1, `Failed to save applied view transitions in sessionStorage (${r}).`)
        }
    }
}

function qy() {
    let e, t, n = new Promise((r, i) => {
        e = async o => {
            r(o);
            try {
                await n
            } catch {}
        }, t = async o => {
            i(o);
            try {
                await n
            } catch {}
        }
    });
    return {
        promise: n,
        resolve: e,
        reject: t
    }
}
var Yn = x.createContext(null);
Yn.displayName = "DataRouter";
var Di = x.createContext(null);
Di.displayName = "DataRouterState";
var pu = x.createContext({
    isTransitioning: !1
});
pu.displayName = "ViewTransition";
var Vh = x.createContext(new Map);
Vh.displayName = "Fetchers";
var Gy = x.createContext(null);
Gy.displayName = "Await";
var Vt = x.createContext(null);
Vt.displayName = "Navigation";
var _l = x.createContext(null);
_l.displayName = "Location";
var rn = x.createContext({
    outlet: null,
    matches: [],
    isDataRoute: !1
});
rn.displayName = "Route";
var mu = x.createContext(null);
mu.displayName = "RouteError";

function Jy(e, {
    relative: t
} = {}) {
    re(Mi(), "useHref() may be used only in the context of a <Router> component.");
    let {
        basename: n,
        navigator: r
    } = x.useContext(Vt), {
        hash: i,
        pathname: o,
        search: l
    } = bi(e, {
        relative: t
    }), s = o;
    return n !== "/" && (s = o === "/" ? n : Bt([n, o])), r.createHref({
        pathname: s,
        search: l,
        hash: i
    })
}

function Mi() {
    return x.useContext(_l) != null
}

function qn() {
    return re(Mi(), "useLocation() may be used only in the context of a <Router> component."), x.useContext(_l).location
}
var Hh = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";

function Wh(e) {
    x.useContext(Vt).static || x.useLayoutEffect(e)
}

function Zy() {
    let {
        isDataRoute: e
    } = x.useContext(rn);
    return e ? fg() : eg()
}

function eg() {
    re(Mi(), "useNavigate() may be used only in the context of a <Router> component.");
    let e = x.useContext(Yn),
        {
            basename: t,
            navigator: n
        } = x.useContext(Vt),
        {
            matches: r
        } = x.useContext(rn),
        {
            pathname: i
        } = qn(),
        o = JSON.stringify(cu(r)),
        l = x.useRef(!1);
    return Wh(() => {
        l.current = !0
    }), x.useCallback((a, u = {}) => {
        if ($e(l.current, Hh), !l.current) return;
        if (typeof a == "number") {
            n.go(a);
            return
        }
        let h = du(a, JSON.parse(o), i, u.relative === "path");
        e == null && t !== "/" && (h.pathname = h.pathname === "/" ? t : Bt([t, h.pathname])), (u.replace ? n.replace : n.push)(h, u.state, u)
    }, [t, n, o, i, e])
}
x.createContext(null);

function bi(e, {
    relative: t
} = {}) {
    let {
        matches: n
    } = x.useContext(rn), {
        pathname: r
    } = qn(), i = JSON.stringify(cu(n));
    return x.useMemo(() => du(e, JSON.parse(i), r, t === "path"), [e, i, r, t])
}

function tg(e, t, n, r) {
    re(Mi(), "useRoutes() may be used only in the context of a <Router> component.");
    let {
        navigator: i
    } = x.useContext(Vt), {
        matches: o
    } = x.useContext(rn), l = o[o.length - 1], s = l ? l.params : {}, a = l ? l.pathname : "/", u = l ? l.pathnameBase : "/", h = l && l.route; {
        let c = h && h.path || "";
        Kh(a, !h || c.endsWith("*") || c.endsWith("*?"), `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${a}" (under <Route path="${c}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${c}"> to <Route path="${c==="/"?"*":`${c}/*`}">.`)
    }
    let m = qn(),
        p;
    p = m;
    let w = p.pathname || "/",
        S = w;
    if (u !== "/") {
        let c = u.replace(/^\//, "").split("/");
        S = "/" + w.replace(/^\//, "").split("/").slice(c.length).join("/")
    }
    let E = fn(e, {
        pathname: S
    });
    return $e(h || E != null, `No routes matched location "${p.pathname}${p.search}${p.hash}" `), $e(E == null || E[E.length - 1].route.element !== void 0 || E[E.length - 1].route.Component !== void 0 || E[E.length - 1].route.lazy !== void 0, `Matched leaf route at location "${p.pathname}${p.search}${p.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`), lg(E && E.map(c => Object.assign({}, c, {
        params: Object.assign({}, s, c.params),
        pathname: Bt([u, i.encodeLocation ? i.encodeLocation(c.pathname).pathname : c.pathname]),
        pathnameBase: c.pathnameBase === "/" ? u : Bt([u, i.encodeLocation ? i.encodeLocation(c.pathnameBase).pathname : c.pathnameBase])
    })), o, n, r)
}

function ng() {
    let e = dg(),
        t = El(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e),
        n = e instanceof Error ? e.stack : null,
        r = "rgba(200,200,200, 0.5)",
        i = {
            padding: "0.5rem",
            backgroundColor: r
        },
        o = {
            padding: "2px 4px",
            backgroundColor: r
        },
        l = null;
    return console.error("Error handled by React Router default ErrorBoundary:", e), l = x.createElement(x.Fragment, null, x.createElement("p", null, "💿 Hey developer 👋"), x.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", x.createElement("code", {
        style: o
    }, "ErrorBoundary"), " or", " ", x.createElement("code", {
        style: o
    }, "errorElement"), " prop on your route.")), x.createElement(x.Fragment, null, x.createElement("h2", null, "Unexpected Application Error!"), x.createElement("h3", {
        style: {
            fontStyle: "italic"
        }
    }, t), n ? x.createElement("pre", {
        style: i
    }, n) : null, l)
}
var rg = x.createElement(ng, null),
    ig = class extends x.Component {
        constructor(e) {
            super(e), this.state = {
                location: e.location,
                revalidation: e.revalidation,
                error: e.error
            }
        }
        static getDerivedStateFromError(e) {
            return {
                error: e
            }
        }
        static getDerivedStateFromProps(e, t) {
            return t.location !== e.location || t.revalidation !== "idle" && e.revalidation === "idle" ? {
                error: e.error,
                location: e.location,
                revalidation: e.revalidation
            } : {
                error: e.error !== void 0 ? e.error : t.error,
                location: t.location,
                revalidation: e.revalidation || t.revalidation
            }
        }
        componentDidCatch(e, t) {
            console.error("React Router caught the following error during render", e, t)
        }
        render() {
            return this.state.error !== void 0 ? x.createElement(rn.Provider, {
                value: this.props.routeContext
            }, x.createElement(mu.Provider, {
                value: this.state.error,
                children: this.props.component
            })) : this.props.children
        }
    };

function og({
    routeContext: e,
    match: t,
    children: n
}) {
    let r = x.useContext(Yn);
    return r && r.static && r.staticContext && (t.route.errorElement || t.route.ErrorBoundary) && (r.staticContext._deepestRenderedBoundaryId = t.route.id), x.createElement(rn.Provider, {
        value: e
    }, n)
}

function lg(e, t = [], n = null, r = null) {
    if (e == null) {
        if (!n) return null;
        if (n.errors) e = n.matches;
        else if (t.length === 0 && !n.initialized && n.matches.length > 0) e = n.matches;
        else return null
    }
    let i = e,
        o = n == null ? void 0 : n.errors;
    if (o != null) {
        let a = i.findIndex(u => u.route.id && (o == null ? void 0 : o[u.route.id]) !== void 0);
        re(a >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(o).join(",")}`), i = i.slice(0, Math.min(i.length, a + 1))
    }
    let l = !1,
        s = -1;
    if (n)
        for (let a = 0; a < i.length; a++) {
            let u = i[a];
            if ((u.route.HydrateFallback || u.route.hydrateFallbackElement) && (s = a), u.route.id) {
                let {
                    loaderData: h,
                    errors: m
                } = n, p = u.route.loader && !h.hasOwnProperty(u.route.id) && (!m || m[u.route.id] === void 0);
                if (u.route.lazy || p) {
                    l = !0, s >= 0 ? i = i.slice(0, s + 1) : i = [i[0]];
                    break
                }
            }
        }
    return i.reduceRight((a, u, h) => {
        let m, p = !1,
            w = null,
            S = null;
        n && (m = o && u.route.id ? o[u.route.id] : void 0, w = u.route.errorElement || rg, l && (s < 0 && h === 0 ? (Kh("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), p = !0, S = null) : s === h && (p = !0, S = u.route.hydrateFallbackElement || null)));
        let E = t.concat(i.slice(0, h + 1)),
            N = () => {
                let c;
                return m ? c = w : p ? c = S : u.route.Component ? c = x.createElement(u.route.Component, null) : u.route.element ? c = u.route.element : c = a, x.createElement(og, {
                    match: u,
                    routeContext: {
                        outlet: a,
                        matches: E,
                        isDataRoute: n != null
                    },
                    children: c
                })
            };
        return n && (u.route.ErrorBoundary || u.route.errorElement || h === 0) ? x.createElement(ig, {
            location: n.location,
            revalidation: n.revalidation,
            component: w,
            error: m,
            children: N(),
            routeContext: {
                outlet: null,
                matches: E,
                isDataRoute: !0
            }
        }) : N()
    }, null)
}

function yu(e) {
    return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}

function sg(e) {
    let t = x.useContext(Yn);
    return re(t, yu(e)), t
}

function ag(e) {
    let t = x.useContext(Di);
    return re(t, yu(e)), t
}

function ug(e) {
    let t = x.useContext(rn);
    return re(t, yu(e)), t
}

function gu(e) {
    let t = ug(e),
        n = t.matches[t.matches.length - 1];
    return re(n.route.id, `${e} can only be used on routes that contain a unique "id"`), n.route.id
}

function cg() {
    return gu("useRouteId")
}

function dg() {
    var r;
    let e = x.useContext(mu),
        t = ag("useRouteError"),
        n = gu("useRouteError");
    return e !== void 0 ? e : (r = t.errors) == null ? void 0 : r[n]
}

function fg() {
    let {
        router: e
    } = sg("useNavigate"), t = gu("useNavigate"), n = x.useRef(!1);
    return Wh(() => {
        n.current = !0
    }), x.useCallback(async (i, o = {}) => {
        $e(n.current, Hh), n.current && (typeof i == "number" ? e.navigate(i) : await e.navigate(i, {
            fromRouteId: t,
            ...o
        }))
    }, [e, t])
}
var ld = {};

function Kh(e, t, n) {
    !t && !ld[e] && (ld[e] = !0, $e(!1, n))
}
var sd = {};

function ad(e, t) {
    !e && !sd[t] && (sd[t] = !0, console.warn(t))
}

function hg(e) {
    let t = {
        hasErrorBoundary: e.hasErrorBoundary || e.ErrorBoundary != null || e.errorElement != null
    };
    return e.Component && (e.element && $e(!1, "You should not include both `Component` and `element` on your route - `Component` will be used."), Object.assign(t, {
        element: x.createElement(e.Component),
        Component: void 0
    })), e.HydrateFallback && (e.hydrateFallbackElement && $e(!1, "You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."), Object.assign(t, {
        hydrateFallbackElement: x.createElement(e.HydrateFallback),
        HydrateFallback: void 0
    })), e.ErrorBoundary && (e.errorElement && $e(!1, "You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."), Object.assign(t, {
        errorElement: x.createElement(e.ErrorBoundary),
        ErrorBoundary: void 0
    })), t
}
var pg = class {
    constructor() {
        this.status = "pending", this.promise = new Promise((e, t) => {
            this.resolve = n => {
                this.status === "pending" && (this.status = "resolved", e(n))
            }, this.reject = n => {
                this.status === "pending" && (this.status = "rejected", t(n))
            }
        })
    }
};

function mg({
    router: e,
    flushSync: t
}) {
    let [n, r] = x.useState(e.state), [i, o] = x.useState(), [l, s] = x.useState({
        isTransitioning: !1
    }), [a, u] = x.useState(), [h, m] = x.useState(), [p, w] = x.useState(), S = x.useRef(new Map), E = x.useCallback((y, {
        deletedFetchers: C,
        flushSync: g,
        viewTransitionOpts: R
    }) => {
        y.fetchers.forEach((j, V) => {
            j.data !== void 0 && S.current.set(V, j.data)
        }), C.forEach(j => S.current.delete(j)), ad(g === !1 || t != null, 'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.');
        let D = e.window != null && e.window.document != null && typeof e.window.document.startViewTransition == "function";
        if (ad(R == null || D, "You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."), !R || !D) {
            t && g ? t(() => r(y)) : x.startTransition(() => r(y));
            return
        }
        if (t && g) {
            t(() => {
                h && (a && a.resolve(), h.skipTransition()), s({
                    isTransitioning: !0,
                    flushSync: !0,
                    currentLocation: R.currentLocation,
                    nextLocation: R.nextLocation
                })
            });
            let j = e.window.document.startViewTransition(() => {
                t(() => r(y))
            });
            j.finished.finally(() => {
                t(() => {
                    u(void 0), m(void 0), o(void 0), s({
                        isTransitioning: !1
                    })
                })
            }), t(() => m(j));
            return
        }
        h ? (a && a.resolve(), h.skipTransition(), w({
            state: y,
            currentLocation: R.currentLocation,
            nextLocation: R.nextLocation
        })) : (o(y), s({
            isTransitioning: !0,
            flushSync: !1,
            currentLocation: R.currentLocation,
            nextLocation: R.nextLocation
        }))
    }, [e.window, t, h, a]);
    x.useLayoutEffect(() => e.subscribe(E), [e, E]), x.useEffect(() => {
        l.isTransitioning && !l.flushSync && u(new pg)
    }, [l]), x.useEffect(() => {
        if (a && i && e.window) {
            let y = i,
                C = a.promise,
                g = e.window.document.startViewTransition(async () => {
                    x.startTransition(() => r(y)), await C
                });
            g.finished.finally(() => {
                u(void 0), m(void 0), o(void 0), s({
                    isTransitioning: !1
                })
            }), m(g)
        }
    }, [i, a, e.window]), x.useEffect(() => {
        a && i && n.location.key === i.location.key && a.resolve()
    }, [a, h, n.location, i]), x.useEffect(() => {
        !l.isTransitioning && p && (o(p.state), s({
            isTransitioning: !0,
            flushSync: !1,
            currentLocation: p.currentLocation,
            nextLocation: p.nextLocation
        }), w(void 0))
    }, [l.isTransitioning, p]);
    let N = x.useMemo(() => ({
            createHref: e.createHref,
            encodeLocation: e.encodeLocation,
            go: y => e.navigate(y),
            push: (y, C, g) => e.navigate(y, {
                state: C,
                preventScrollReset: g == null ? void 0 : g.preventScrollReset
            }),
            replace: (y, C, g) => e.navigate(y, {
                replace: !0,
                state: C,
                preventScrollReset: g == null ? void 0 : g.preventScrollReset
            })
        }), [e]),
        c = e.basename || "/",
        d = x.useMemo(() => ({
            router: e,
            navigator: N,
            static: !1,
            basename: c
        }), [e, N, c]);
    return x.createElement(x.Fragment, null, x.createElement(Yn.Provider, {
        value: d
    }, x.createElement(Di.Provider, {
        value: n
    }, x.createElement(Vh.Provider, {
        value: S.current
    }, x.createElement(pu.Provider, {
        value: l
    }, x.createElement(vg, {
        basename: c,
        location: n.location,
        navigationType: n.historyAction,
        navigator: N
    }, x.createElement(yg, {
        routes: e.routes,
        future: e.future,
        state: n
    })))))), null)
}
var yg = x.memo(gg);

function gg({
    routes: e,
    future: t,
    state: n
}) {
    return tg(e, void 0, n, t)
}

function vg({
    basename: e = "/",
    children: t = null,
    location: n,
    navigationType: r = "POP",
    navigator: i,
    static: o = !1
}) {
    re(!Mi(), "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
    let l = e.replace(/^\/*/, "/"),
        s = x.useMemo(() => ({
            basename: l,
            navigator: i,
            static: o,
            future: {}
        }), [l, i, o]);
    typeof n == "string" && (n = Tn(n));
    let {
        pathname: a = "/",
        search: u = "",
        hash: h = "",
        state: m = null,
        key: p = "default"
    } = n, w = x.useMemo(() => {
        let S = Ot(a, l);
        return S == null ? null : {
            location: {
                pathname: S,
                search: u,
                hash: h,
                state: m,
                key: p
            },
            navigationType: r
        }
    }, [l, a, u, h, m, p, r]);
    return $e(w != null, `<Router basename="${l}"> is not able to match the URL "${a}${u}${h}" because it does not start with the basename, so the <Router> won't render anything.`), w == null ? null : x.createElement(Vt.Provider, {
        value: s
    }, x.createElement(_l.Provider, {
        children: t,
        value: w
    }))
}
var Ro = "get",
    Po = "application/x-www-form-urlencoded";

function Cl(e) {
    return e != null && typeof e.tagName == "string"
}

function wg(e) {
    return Cl(e) && e.tagName.toLowerCase() === "button"
}

function xg(e) {
    return Cl(e) && e.tagName.toLowerCase() === "form"
}

function kg(e) {
    return Cl(e) && e.tagName.toLowerCase() === "input"
}

function Sg(e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
}

function Eg(e, t) {
    return e.button === 0 && (!t || t === "_self") && !Sg(e)
}
var uo = null;

function _g() {
    if (uo === null) try {
        new FormData(document.createElement("form"), 0), uo = !1
    } catch {
        uo = !0
    }
    return uo
}
var Cg = new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);

function as(e) {
    return e != null && !Cg.has(e) ? ($e(!1, `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Po}"`), null) : e
}

function Ng(e, t) {
    let n, r, i, o, l;
    if (xg(e)) {
        let s = e.getAttribute("action");
        r = s ? Ot(s, t) : null, n = e.getAttribute("method") || Ro, i = as(e.getAttribute("enctype")) || Po, o = new FormData(e)
    } else if (wg(e) || kg(e) && (e.type === "submit" || e.type === "image")) {
        let s = e.form;
        if (s == null) throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
        let a = e.getAttribute("formaction") || s.getAttribute("action");
        if (r = a ? Ot(a, t) : null, n = e.getAttribute("formmethod") || s.getAttribute("method") || Ro, i = as(e.getAttribute("formenctype")) || as(s.getAttribute("enctype")) || Po, o = new FormData(s, e), !_g()) {
            let {
                name: u,
                type: h,
                value: m
            } = e;
            if (h === "image") {
                let p = u ? `${u}.` : "";
                o.append(`${p}x`, "0"), o.append(`${p}y`, "0")
            } else u && o.append(u, m)
        }
    } else {
        if (Cl(e)) throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
        n = Ro, r = null, i = Po, l = e
    }
    return o && i === "text/plain" && (l = o, o = void 0), {
        action: r,
        method: n.toLowerCase(),
        encType: i,
        formData: o,
        body: l
    }
}

function vu(e, t) {
    if (e === !1 || e === null || typeof e > "u") throw new Error(t)
}
async function Rg(e, t) {
    if (e.id in t) return t[e.id];
    try {
        let n = await import(e.module);
        return t[e.id] = n, n
    } catch (n) {
        return console.error(`Error loading route module \`${e.module}\`, reloading page...`), console.error(n), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(() => {})
    }
}

function Pg(e) {
    return e == null ? !1 : e.href == null ? e.rel === "preload" && typeof e.imageSrcSet == "string" && typeof e.imageSizes == "string" : typeof e.rel == "string" && typeof e.href == "string"
}
async function Lg(e, t, n) {
    let r = await Promise.all(e.map(async i => {
        let o = t.routes[i.route.id];
        if (o) {
            let l = await Rg(o, n);
            return l.links ? l.links() : []
        }
        return []
    }));
    return Dg(r.flat(1).filter(Pg).filter(i => i.rel === "stylesheet" || i.rel === "preload").map(i => i.rel === "stylesheet" ? {
        ...i,
        rel: "prefetch",
        as: "style"
    } : {
        ...i,
        rel: "prefetch"
    }))
}

function ud(e, t, n, r, i, o) {
    let l = (a, u) => n[u] ? a.route.id !== n[u].route.id : !0,
        s = (a, u) => {
            var h;
            return n[u].pathname !== a.pathname || ((h = n[u].route.path) == null ? void 0 : h.endsWith("*")) && n[u].params["*"] !== a.params["*"]
        };
    return o === "assets" ? t.filter((a, u) => l(a, u) || s(a, u)) : o === "data" ? t.filter((a, u) => {
        var m;
        let h = r.routes[a.route.id];
        if (!h || !h.hasLoader) return !1;
        if (l(a, u) || s(a, u)) return !0;
        if (a.route.shouldRevalidate) {
            let p = a.route.shouldRevalidate({
                currentUrl: new URL(i.pathname + i.search + i.hash, window.origin),
                currentParams: ((m = n[0]) == null ? void 0 : m.params) || {},
                nextUrl: new URL(e, window.origin),
                nextParams: a.params,
                defaultShouldRevalidate: !0
            });
            if (typeof p == "boolean") return p
        }
        return !0
    }) : []
}

function Tg(e, t) {
    return jg(e.map(n => {
        let r = t.routes[n.route.id];
        if (!r) return [];
        let i = [r.module];
        return r.imports && (i = i.concat(r.imports)), i
    }).flat(1))
}

function jg(e) {
    return [...new Set(e)]
}

function Og(e) {
    let t = {},
        n = Object.keys(e).sort();
    for (let r of n) t[r] = e[r];
    return t
}

function Dg(e, t) {
    let n = new Set;
    return new Set(t), e.reduce((r, i) => {
        let o = JSON.stringify(Og(i));
        return n.has(o) || (n.add(o), r.push({
            key: o,
            link: i
        })), r
    }, [])
}

function Mg(e) {
    let t = typeof e == "string" ? new URL(e, typeof window > "u" ? "server://singlefetch/" : window.location.origin) : e;
    return t.pathname === "/" ? t.pathname = "_root.data" : t.pathname = `${t.pathname.replace(/\/$/,"")}.data`, t
}

function bg() {
    let e = x.useContext(Yn);
    return vu(e, "You must render this element inside a <DataRouterContext.Provider> element"), e
}

function Ag() {
    let e = x.useContext(Di);
    return vu(e, "You must render this element inside a <DataRouterStateContext.Provider> element"), e
}
var wu = x.createContext(void 0);
wu.displayName = "FrameworkContext";

function Qh() {
    let e = x.useContext(wu);
    return vu(e, "You must render this element inside a <HydratedRouter> element"), e
}

function zg(e, t) {
    let n = x.useContext(wu),
        [r, i] = x.useState(!1),
        [o, l] = x.useState(!1),
        {
            onFocus: s,
            onBlur: a,
            onMouseEnter: u,
            onMouseLeave: h,
            onTouchStart: m
        } = t,
        p = x.useRef(null);
    x.useEffect(() => {
        if (e === "render" && l(!0), e === "viewport") {
            let E = c => {
                    c.forEach(d => {
                        l(d.isIntersecting)
                    })
                },
                N = new IntersectionObserver(E, {
                    threshold: .5
                });
            return p.current && N.observe(p.current), () => {
                N.disconnect()
            }
        }
    }, [e]), x.useEffect(() => {
        if (r) {
            let E = setTimeout(() => {
                l(!0)
            }, 100);
            return () => {
                clearTimeout(E)
            }
        }
    }, [r]);
    let w = () => {
            i(!0)
        },
        S = () => {
            i(!1), l(!1)
        };
    return n ? e !== "intent" ? [o, p, {}] : [o, p, {
        onFocus: Kr(s, w),
        onBlur: Kr(a, S),
        onMouseEnter: Kr(u, w),
        onMouseLeave: Kr(h, S),
        onTouchStart: Kr(m, w)
    }] : [!1, p, {}]
}

function Kr(e, t) {
    return n => {
        e && e(n), n.defaultPrevented || t(n)
    }
}

function Fg({
    page: e,
    ...t
}) {
    let {
        router: n
    } = bg(), r = x.useMemo(() => fn(n.routes, e, n.basename), [n.routes, e, n.basename]);
    return r ? x.createElement(Ug, {
        page: e,
        matches: r,
        ...t
    }) : null
}

function Ig(e) {
    let {
        manifest: t,
        routeModules: n
    } = Qh(), [r, i] = x.useState([]);
    return x.useEffect(() => {
        let o = !1;
        return Lg(e, t, n).then(l => {
            o || i(l)
        }), () => {
            o = !0
        }
    }, [e, t, n]), r
}

function Ug({
    page: e,
    matches: t,
    ...n
}) {
    let r = qn(),
        {
            manifest: i,
            routeModules: o
        } = Qh(),
        {
            loaderData: l,
            matches: s
        } = Ag(),
        a = x.useMemo(() => ud(e, t, s, i, r, "data"), [e, t, s, i, r]),
        u = x.useMemo(() => ud(e, t, s, i, r, "assets"), [e, t, s, i, r]),
        h = x.useMemo(() => {
            if (e === r.pathname + r.search + r.hash) return [];
            let w = new Set,
                S = !1;
            if (t.forEach(N => {
                    var d;
                    let c = i.routes[N.route.id];
                    !c || !c.hasLoader || (!a.some(y => y.route.id === N.route.id) && N.route.id in l && ((d = o[N.route.id]) != null && d.shouldRevalidate) || c.hasClientLoader ? S = !0 : w.add(N.route.id))
                }), w.size === 0) return [];
            let E = Mg(e);
            return S && w.size > 0 && E.searchParams.set("_routes", t.filter(N => w.has(N.route.id)).map(N => N.route.id).join(",")), [E.pathname + E.search]
        }, [l, r, i, a, t, e, o]),
        m = x.useMemo(() => Tg(u, i), [u, i]),
        p = Ig(u);
    return x.createElement(x.Fragment, null, h.map(w => x.createElement("link", {
        key: w,
        rel: "prefetch",
        as: "fetch",
        href: w,
        ...n
    })), m.map(w => x.createElement("link", {
        key: w,
        rel: "modulepreload",
        href: w,
        ...n
    })), p.map(({
        key: w,
        link: S
    }) => x.createElement("link", {
        key: w,
        ...S
    })))
}

function Bg(...e) {
    return t => {
        e.forEach(n => {
            typeof n == "function" ? n(t) : n != null && (n.current = t)
        })
    }
}
var Xh = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
try {
    Xh && (window.__reactRouterVersion = "7.1.2")
} catch {}

function $g(e, t) {
    return Oy({
        basename: t == null ? void 0 : t.basename,
        future: t == null ? void 0 : t.future,
        history: ny({
            window: t == null ? void 0 : t.window
        }),
        hydrationData: (t == null ? void 0 : t.hydrationData) || Vg(),
        routes: e,
        mapRouteProperties: hg,
        dataStrategy: t == null ? void 0 : t.dataStrategy,
        patchRoutesOnNavigation: t == null ? void 0 : t.patchRoutesOnNavigation,
        window: t == null ? void 0 : t.window
    }).initialize()
}

function Vg() {
    let e = window == null ? void 0 : window.__staticRouterHydrationData;
    return e && e.errors && (e = {
        ...e,
        errors: Hg(e.errors)
    }), e
}

function Hg(e) {
    if (!e) return null;
    let t = Object.entries(e),
        n = {};
    for (let [r, i] of t)
        if (i && i.__type === "RouteErrorResponse") n[r] = new ll(i.status, i.statusText, i.data, i.internal === !0);
        else if (i && i.__type === "Error") {
        if (i.__subType) {
            let o = window[i.__subType];
            if (typeof o == "function") try {
                let l = new o(i.message);
                l.stack = "", n[r] = l
            } catch {}
        }
        if (n[r] == null) {
            let o = new Error(i.message);
            o.stack = "", n[r] = o
        }
    } else n[r] = i;
    return n
}
var Yh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
    qh = x.forwardRef(function({
        onClick: t,
        discover: n = "render",
        prefetch: r = "none",
        relative: i,
        reloadDocument: o,
        replace: l,
        state: s,
        target: a,
        to: u,
        preventScrollReset: h,
        viewTransition: m,
        ...p
    }, w) {
        let {
            basename: S
        } = x.useContext(Vt), E = typeof u == "string" && Yh.test(u), N, c = !1;
        if (typeof u == "string" && E && (N = u, Xh)) try {
            let V = new URL(window.location.href),
                L = u.startsWith("//") ? new URL(V.protocol + u) : new URL(u),
                Y = Ot(L.pathname, S);
            L.origin === V.origin && Y != null ? u = Y + L.search + L.hash : c = !0
        } catch {
            $e(!1, `<Link to="${u}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)
        }
        let d = Jy(u, {
                relative: i
            }),
            [y, C, g] = zg(r, p),
            R = Xg(u, {
                replace: l,
                state: s,
                target: a,
                preventScrollReset: h,
                relative: i,
                viewTransition: m
            });

        function D(V) {
            t && t(V), V.defaultPrevented || R(V)
        }
        let j = x.createElement("a", {
            ...p,
            ...g,
            href: N || d,
            onClick: c || o ? t : D,
            ref: Bg(w, C),
            target: a,
            "data-discover": !E && n === "render" ? "true" : void 0
        });
        return y && !E ? x.createElement(x.Fragment, null, j, x.createElement(Fg, {
            page: d
        })) : j
    });
qh.displayName = "Link";
var Wg = x.forwardRef(function({
    "aria-current": t = "page",
    caseSensitive: n = !1,
    className: r = "",
    end: i = !1,
    style: o,
    to: l,
    viewTransition: s,
    children: a,
    ...u
}, h) {
    let m = bi(l, {
            relative: u.relative
        }),
        p = qn(),
        w = x.useContext(Di),
        {
            navigator: S,
            basename: E
        } = x.useContext(Vt),
        N = w != null && Zg(m) && s === !0,
        c = S.encodeLocation ? S.encodeLocation(m).pathname : m.pathname,
        d = p.pathname,
        y = w && w.navigation && w.navigation.location ? w.navigation.location.pathname : null;
    n || (d = d.toLowerCase(), y = y ? y.toLowerCase() : null, c = c.toLowerCase()), y && E && (y = Ot(y, E) || y);
    const C = c !== "/" && c.endsWith("/") ? c.length - 1 : c.length;
    let g = d === c || !i && d.startsWith(c) && d.charAt(C) === "/",
        R = y != null && (y === c || !i && y.startsWith(c) && y.charAt(c.length) === "/"),
        D = {
            isActive: g,
            isPending: R,
            isTransitioning: N
        },
        j = g ? t : void 0,
        V;
    typeof r == "function" ? V = r(D) : V = [r, g ? "active" : null, R ? "pending" : null, N ? "transitioning" : null].filter(Boolean).join(" ");
    let L = typeof o == "function" ? o(D) : o;
    return x.createElement(qh, {
        ...u,
        "aria-current": j,
        className: V,
        ref: h,
        style: L,
        to: l,
        viewTransition: s
    }, typeof a == "function" ? a(D) : a)
});
Wg.displayName = "NavLink";
var Kg = x.forwardRef(({
    discover: e = "render",
    fetcherKey: t,
    navigate: n,
    reloadDocument: r,
    replace: i,
    state: o,
    method: l = Ro,
    action: s,
    onSubmit: a,
    relative: u,
    preventScrollReset: h,
    viewTransition: m,
    ...p
}, w) => {
    let S = Gg(),
        E = Jg(s, {
            relative: u
        }),
        N = l.toLowerCase() === "get" ? "get" : "post",
        c = typeof s == "string" && Yh.test(s),
        d = y => {
            if (a && a(y), y.defaultPrevented) return;
            y.preventDefault();
            let C = y.nativeEvent.submitter,
                g = (C == null ? void 0 : C.getAttribute("formmethod")) || l;
            S(C || y.currentTarget, {
                fetcherKey: t,
                method: g,
                navigate: n,
                replace: i,
                state: o,
                relative: u,
                preventScrollReset: h,
                viewTransition: m
            })
        };
    return x.createElement("form", {
        ref: w,
        method: N,
        action: E,
        onSubmit: r ? a : d,
        ...p,
        "data-discover": !c && e === "render" ? "true" : void 0
    })
});
Kg.displayName = "Form";

function Qg(e) {
    return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`
}

function Gh(e) {
    let t = x.useContext(Yn);
    return re(t, Qg(e)), t
}

function Xg(e, {
    target: t,
    replace: n,
    state: r,
    preventScrollReset: i,
    relative: o,
    viewTransition: l
} = {}) {
    let s = Zy(),
        a = qn(),
        u = bi(e, {
            relative: o
        });
    return x.useCallback(h => {
        if (Eg(h, t)) {
            h.preventDefault();
            let m = n !== void 0 ? n : Nn(a) === Nn(u);
            s(e, {
                replace: m,
                state: r,
                preventScrollReset: i,
                relative: o,
                viewTransition: l
            })
        }
    }, [a, s, u, n, r, t, e, i, o, l])
}
var Yg = 0,
    qg = () => `__${String(++Yg)}__`;

function Gg() {
    let {
        router: e
    } = Gh("useSubmit"), {
        basename: t
    } = x.useContext(Vt), n = cg();
    return x.useCallback(async (r, i = {}) => {
        let {
            action: o,
            method: l,
            encType: s,
            formData: a,
            body: u
        } = Ng(r, t);
        if (i.navigate === !1) {
            let h = i.fetcherKey || qg();
            await e.fetch(h, n, i.action || o, {
                preventScrollReset: i.preventScrollReset,
                formData: a,
                body: u,
                formMethod: i.method || l,
                formEncType: i.encType || s,
                flushSync: i.flushSync
            })
        } else await e.navigate(i.action || o, {
            preventScrollReset: i.preventScrollReset,
            formData: a,
            body: u,
            formMethod: i.method || l,
            formEncType: i.encType || s,
            replace: i.replace,
            state: i.state,
            fromRouteId: n,
            flushSync: i.flushSync,
            viewTransition: i.viewTransition
        })
    }, [e, t, n])
}

function Jg(e, {
    relative: t
} = {}) {
    let {
        basename: n
    } = x.useContext(Vt), r = x.useContext(rn);
    re(r, "useFormAction must be used inside a RouteContext");
    let [i] = r.matches.slice(-1), o = {
        ...bi(e || ".", {
            relative: t
        })
    }, l = qn();
    if (e == null) {
        o.search = l.search;
        let s = new URLSearchParams(o.search),
            a = s.getAll("index");
        if (a.some(h => h === "")) {
            s.delete("index"), a.filter(m => m).forEach(m => s.append("index", m));
            let h = s.toString();
            o.search = h ? `?${h}` : ""
        }
    }
    return (!e || e === ".") && i.route.index && (o.search = o.search ? o.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (o.pathname = o.pathname === "/" ? n : Bt([n, o.pathname])), Nn(o)
}

function Zg(e, t = {}) {
    let n = x.useContext(pu);
    re(n != null, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
    let {
        basename: r
    } = Gh("useViewTransitionState"), i = bi(e, {
        relative: t.relative
    });
    if (!n.isTransitioning) return !1;
    let o = Ot(n.currentLocation.pathname, r) || n.currentLocation.pathname,
        l = Ot(n.nextLocation.pathname, r) || n.nextLocation.pathname;
    return ol(i.pathname, l) != null || ol(i.pathname, o) != null
}
new TextEncoder;
/**
 * react-router v7.1.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function ev(e) {
    return x.createElement(mg, {
        flushSync: Dh.flushSync,
        ...e
    })
}
const tv = "modulepreload",
    nv = function(e) {
        return "/" + e
    },
    cd = {},
    Jh = function(t, n, r) {
        let i = Promise.resolve();
        if (n && n.length > 0) {
            document.getElementsByTagName("link");
            const l = document.querySelector("meta[property=csp-nonce]"),
                s = (l == null ? void 0 : l.nonce) || (l == null ? void 0 : l.getAttribute("nonce"));
            i = Promise.allSettled(n.map(a => {
                if (a = nv(a), a in cd) return;
                cd[a] = !0;
                const u = a.endsWith(".css"),
                    h = u ? '[rel="stylesheet"]' : "";
                if (document.querySelector(`link[href="${a}"]${h}`)) return;
                const m = document.createElement("link");
                if (m.rel = u ? "stylesheet" : tv, u || (m.as = "script"), m.crossOrigin = "", m.href = a, s && m.setAttribute("nonce", s), document.head.appendChild(m), u) return new Promise((p, w) => {
                    m.addEventListener("load", p), m.addEventListener("error", () => w(new Error(`Unable to preload CSS for ${a}`)))
                })
            }))
        }

        function o(l) {
            const s = new Event("vite:preloadError", {
                cancelable: !0
            });
            if (s.payload = l, window.dispatchEvent(s), !s.defaultPrevented) throw l
        }
        return i.then(l => {
            for (const s of l || []) s.status === "rejected" && o(s.reason);
            return t().catch(o)
        })
    };
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rv = e => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
    Zh = (...e) => e.filter((t, n, r) => !!t && r.indexOf(t) === n).join(" ");
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var iv = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ov = x.forwardRef(({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: i = "",
    children: o,
    iconNode: l,
    ...s
}, a) => x.createElement("svg", {
    ref: a,
    ...iv,
    width: t,
    height: t,
    stroke: e,
    strokeWidth: r ? Number(n) * 24 / Number(t) : n,
    className: Zh("lucide", i),
    ...s
}, [...l.map(([u, h]) => x.createElement(u, h)), ...Array.isArray(o) ? o : [o]]));
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ht = (e, t) => {
    const n = x.forwardRef(({
        className: r,
        ...i
    }, o) => x.createElement(ov, {
        ref: o,
        iconNode: t,
        className: Zh(`lucide-${rv(e)}`, r),
        ...i
    }));
    return n.displayName = `${e}`, n
};
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const co = Ht("Check", [
    ["path", {
        d: "M20 6 9 17l-5-5",
        key: "1gmf2c"
    }]
]);
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dd = Ht("Crown", [
    ["path", {
        d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
        key: "1vdc57"
    }],
    ["path", {
        d: "M5 21h14",
        key: "11awu3"
    }]
]);
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fd = Ht("Heart", [
    ["path", {
        d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
        key: "c3ymky"
    }]
]);
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const At = Ht("Loader", [
    ["path", {
        d: "M12 2v4",
        key: "3427ic"
    }],
    ["path", {
        d: "m16.2 7.8 2.9-2.9",
        key: "r700ao"
    }],
    ["path", {
        d: "M18 12h4",
        key: "wj9ykh"
    }],
    ["path", {
        d: "m16.2 16.2 2.9 2.9",
        key: "1bxg5t"
    }],
    ["path", {
        d: "M12 18v4",
        key: "jadmvz"
    }],
    ["path", {
        d: "m4.9 19.1 2.9-2.9",
        key: "bwix9q"
    }],
    ["path", {
        d: "M2 12h4",
        key: "j09sii"
    }],
    ["path", {
        d: "m4.9 4.9 2.9 2.9",
        key: "giyufr"
    }]
]);
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const us = Ht("LogOut", [
    ["path", {
        d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
        key: "1uf3rs"
    }],
    ["polyline", {
        points: "16 17 21 12 16 7",
        key: "1gabdz"
    }],
    ["line", {
        x1: "21",
        x2: "9",
        y1: "12",
        y2: "12",
        key: "1uyos4"
    }]
]);
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lv = Ht("Moon", [
    ["path", {
        d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
        key: "a7tn18"
    }]
]);
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qr = Ht("Skull", [
    ["circle", {
        cx: "9",
        cy: "12",
        r: "1",
        key: "1vctgf"
    }],
    ["circle", {
        cx: "15",
        cy: "12",
        r: "1",
        key: "1tmaij"
    }],
    ["path", {
        d: "M8 20v2h8v-2",
        key: "ded4og"
    }],
    ["path", {
        d: "m12.5 17-.5-1-.5 1h1z",
        key: "3me087"
    }],
    ["path", {
        d: "M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20",
        key: "xq9p5u"
    }]
]);
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hd = Ht("Trophy", [
    ["path", {
        d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6",
        key: "17hqa7"
    }],
    ["path", {
        d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18",
        key: "lmptdp"
    }],
    ["path", {
        d: "M4 22h16",
        key: "57wxv0"
    }],
    ["path", {
        d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",
        key: "1nw9bq"
    }],
    ["path", {
        d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",
        key: "1np0yb"
    }],
    ["path", {
        d: "M18 2H6v7a6 6 0 0 0 12 0V2Z",
        key: "u46fv3"
    }]
]);
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pd = Ht("Users", [
    ["path", {
        d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
        key: "1yyitq"
    }],
    ["circle", {
        cx: "9",
        cy: "7",
        r: "4",
        key: "nufk8"
    }],
    ["path", {
        d: "M22 21v-2a4 4 0 0 0-3-3.87",
        key: "kshegd"
    }],
    ["path", {
        d: "M16 3.13a4 4 0 0 1 0 7.75",
        key: "1da9ce"
    }]
]);
/**
 * @license lucide-react v0.408.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sv = Ht("Vote", [
        ["path", {
            d: "m9 12 2 2 4-4",
            key: "dzmm74"
        }],
        ["path", {
            d: "M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z",
            key: "1ezoue"
        }],
        ["path", {
            d: "M22 19H2",
            key: "nuriw5"
        }]
    ]),
    $t = Object.create(null);
$t.open = "0";
$t.close = "1";
$t.ping = "2";
$t.pong = "3";
$t.message = "4";
$t.upgrade = "5";
$t.noop = "6";
const Lo = Object.create(null);
Object.keys($t).forEach(e => {
    Lo[$t[e]] = e
});
const ua = {
        type: "error",
        data: "parser error"
    },
    ep = typeof Blob == "function" || typeof Blob < "u" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]",
    tp = typeof ArrayBuffer == "function",
    np = e => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e && e.buffer instanceof ArrayBuffer,
    xu = ({
        type: e,
        data: t
    }, n, r) => ep && t instanceof Blob ? n ? r(t) : md(t, r) : tp && (t instanceof ArrayBuffer || np(t)) ? n ? r(t) : md(new Blob([t]), r) : r($t[e] + (t || "")),
    md = (e, t) => {
        const n = new FileReader;
        return n.onload = function() {
            const r = n.result.split(",")[1];
            t("b" + (r || ""))
        }, n.readAsDataURL(e)
    };

function yd(e) {
    return e instanceof Uint8Array ? e : e instanceof ArrayBuffer ? new Uint8Array(e) : new Uint8Array(e.buffer, e.byteOffset, e.byteLength)
}
let cs;

function av(e, t) {
    if (ep && e.data instanceof Blob) return e.data.arrayBuffer().then(yd).then(t);
    if (tp && (e.data instanceof ArrayBuffer || np(e.data))) return t(yd(e.data));
    xu(e, !1, n => {
        cs || (cs = new TextEncoder), t(cs.encode(n))
    })
}
const gd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    ei = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (let e = 0; e < gd.length; e++) ei[gd.charCodeAt(e)] = e;
const uv = e => {
        let t = e.length * .75,
            n = e.length,
            r, i = 0,
            o, l, s, a;
        e[e.length - 1] === "=" && (t--, e[e.length - 2] === "=" && t--);
        const u = new ArrayBuffer(t),
            h = new Uint8Array(u);
        for (r = 0; r < n; r += 4) o = ei[e.charCodeAt(r)], l = ei[e.charCodeAt(r + 1)], s = ei[e.charCodeAt(r + 2)], a = ei[e.charCodeAt(r + 3)], h[i++] = o << 2 | l >> 4, h[i++] = (l & 15) << 4 | s >> 2, h[i++] = (s & 3) << 6 | a & 63;
        return u
    },
    cv = typeof ArrayBuffer == "function",
    ku = (e, t) => {
        if (typeof e != "string") return {
            type: "message",
            data: rp(e, t)
        };
        const n = e.charAt(0);
        return n === "b" ? {
            type: "message",
            data: dv(e.substring(1), t)
        } : Lo[n] ? e.length > 1 ? {
            type: Lo[n],
            data: e.substring(1)
        } : {
            type: Lo[n]
        } : ua
    },
    dv = (e, t) => {
        if (cv) {
            const n = uv(e);
            return rp(n, t)
        } else return {
            base64: !0,
            data: e
        }
    },
    rp = (e, t) => {
        switch (t) {
            case "blob":
                return e instanceof Blob ? e : new Blob([e]);
            case "arraybuffer":
            default:
                return e instanceof ArrayBuffer ? e : e.buffer
        }
    },
    ip = "",
    fv = (e, t) => {
        const n = e.length,
            r = new Array(n);
        let i = 0;
        e.forEach((o, l) => {
            xu(o, !1, s => {
                r[l] = s, ++i === n && t(r.join(ip))
            })
        })
    },
    hv = (e, t) => {
        const n = e.split(ip),
            r = [];
        for (let i = 0; i < n.length; i++) {
            const o = ku(n[i], t);
            if (r.push(o), o.type === "error") break
        }
        return r
    };

function pv() {
    return new TransformStream({
        transform(e, t) {
            av(e, n => {
                const r = n.length;
                let i;
                if (r < 126) i = new Uint8Array(1), new DataView(i.buffer).setUint8(0, r);
                else if (r < 65536) {
                    i = new Uint8Array(3);
                    const o = new DataView(i.buffer);
                    o.setUint8(0, 126), o.setUint16(1, r)
                } else {
                    i = new Uint8Array(9);
                    const o = new DataView(i.buffer);
                    o.setUint8(0, 127), o.setBigUint64(1, BigInt(r))
                }
                e.data && typeof e.data != "string" && (i[0] |= 128), t.enqueue(i), t.enqueue(n)
            })
        }
    })
}
let ds;

function fo(e) {
    return e.reduce((t, n) => t + n.length, 0)
}

function ho(e, t) {
    if (e[0].length === t) return e.shift();
    const n = new Uint8Array(t);
    let r = 0;
    for (let i = 0; i < t; i++) n[i] = e[0][r++], r === e[0].length && (e.shift(), r = 0);
    return e.length && r < e[0].length && (e[0] = e[0].slice(r)), n
}

function mv(e, t) {
    ds || (ds = new TextDecoder);
    const n = [];
    let r = 0,
        i = -1,
        o = !1;
    return new TransformStream({
        transform(l, s) {
            for (n.push(l);;) {
                if (r === 0) {
                    if (fo(n) < 1) break;
                    const a = ho(n, 1);
                    o = (a[0] & 128) === 128, i = a[0] & 127, i < 126 ? r = 3 : i === 126 ? r = 1 : r = 2
                } else if (r === 1) {
                    if (fo(n) < 2) break;
                    const a = ho(n, 2);
                    i = new DataView(a.buffer, a.byteOffset, a.length).getUint16(0), r = 3
                } else if (r === 2) {
                    if (fo(n) < 8) break;
                    const a = ho(n, 8),
                        u = new DataView(a.buffer, a.byteOffset, a.length),
                        h = u.getUint32(0);
                    if (h > Math.pow(2, 21) - 1) {
                        s.enqueue(ua);
                        break
                    }
                    i = h * Math.pow(2, 32) + u.getUint32(4), r = 3
                } else {
                    if (fo(n) < i) break;
                    const a = ho(n, i);
                    s.enqueue(ku(o ? a : ds.decode(a), t)), r = 0
                }
                if (i === 0 || i > e) {
                    s.enqueue(ua);
                    break
                }
            }
        }
    })
}
const op = 4;

function Pe(e) {
    if (e) return yv(e)
}

function yv(e) {
    for (var t in Pe.prototype) e[t] = Pe.prototype[t];
    return e
}
Pe.prototype.on = Pe.prototype.addEventListener = function(e, t) {
    return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
};
Pe.prototype.once = function(e, t) {
    function n() {
        this.off(e, n), t.apply(this, arguments)
    }
    return n.fn = t, this.on(e, n), this
};
Pe.prototype.off = Pe.prototype.removeListener = Pe.prototype.removeAllListeners = Pe.prototype.removeEventListener = function(e, t) {
    if (this._callbacks = this._callbacks || {}, arguments.length == 0) return this._callbacks = {}, this;
    var n = this._callbacks["$" + e];
    if (!n) return this;
    if (arguments.length == 1) return delete this._callbacks["$" + e], this;
    for (var r, i = 0; i < n.length; i++)
        if (r = n[i], r === t || r.fn === t) {
            n.splice(i, 1);
            break
        } return n.length === 0 && delete this._callbacks["$" + e], this
};
Pe.prototype.emit = function(e) {
    this._callbacks = this._callbacks || {};
    for (var t = new Array(arguments.length - 1), n = this._callbacks["$" + e], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    if (n) {
        n = n.slice(0);
        for (var r = 0, i = n.length; r < i; ++r) n[r].apply(this, t)
    }
    return this
};
Pe.prototype.emitReserved = Pe.prototype.emit;
Pe.prototype.listeners = function(e) {
    return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
};
Pe.prototype.hasListeners = function(e) {
    return !!this.listeners(e).length
};
const Nl = typeof Promise == "function" && typeof Promise.resolve == "function" ? t => Promise.resolve().then(t) : (t, n) => n(t, 0),
    gt = typeof self < "u" ? self : typeof window < "u" ? window : Function("return this")(),
    gv = "arraybuffer";

function lp(e, ...t) {
    return t.reduce((n, r) => (e.hasOwnProperty(r) && (n[r] = e[r]), n), {})
}
const vv = gt.setTimeout,
    wv = gt.clearTimeout;

function Rl(e, t) {
    t.useNativeTimers ? (e.setTimeoutFn = vv.bind(gt), e.clearTimeoutFn = wv.bind(gt)) : (e.setTimeoutFn = gt.setTimeout.bind(gt), e.clearTimeoutFn = gt.clearTimeout.bind(gt))
}
const xv = 1.33;

function kv(e) {
    return typeof e == "string" ? Sv(e) : Math.ceil((e.byteLength || e.size) * xv)
}

function Sv(e) {
    let t = 0,
        n = 0;
    for (let r = 0, i = e.length; r < i; r++) t = e.charCodeAt(r), t < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (r++, n += 4);
    return n
}

function sp() {
    return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5)
}

function Ev(e) {
    let t = "";
    for (let n in e) e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
    return t
}

function _v(e) {
    let t = {},
        n = e.split("&");
    for (let r = 0, i = n.length; r < i; r++) {
        let o = n[r].split("=");
        t[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
    }
    return t
}
class Cv extends Error {
    constructor(t, n, r) {
        super(t), this.description = n, this.context = r, this.type = "TransportError"
    }
}
class Su extends Pe {
    constructor(t) {
        super(), this.writable = !1, Rl(this, t), this.opts = t, this.query = t.query, this.socket = t.socket, this.supportsBinary = !t.forceBase64
    }
    onError(t, n, r) {
        return super.emitReserved("error", new Cv(t, n, r)), this
    }
    open() {
        return this.readyState = "opening", this.doOpen(), this
    }
    close() {
        return (this.readyState === "opening" || this.readyState === "open") && (this.doClose(), this.onClose()), this
    }
    send(t) {
        this.readyState === "open" && this.write(t)
    }
    onOpen() {
        this.readyState = "open", this.writable = !0, super.emitReserved("open")
    }
    onData(t) {
        const n = ku(t, this.socket.binaryType);
        this.onPacket(n)
    }
    onPacket(t) {
        super.emitReserved("packet", t)
    }
    onClose(t) {
        this.readyState = "closed", super.emitReserved("close", t)
    }
    pause(t) {}
    createUri(t, n = {}) {
        return t + "://" + this._hostname() + this._port() + this.opts.path + this._query(n)
    }
    _hostname() {
        const t = this.opts.hostname;
        return t.indexOf(":") === -1 ? t : "[" + t + "]"
    }
    _port() {
        return this.opts.port && (this.opts.secure && +(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80) ? ":" + this.opts.port : ""
    }
    _query(t) {
        const n = Ev(t);
        return n.length ? "?" + n : ""
    }
}
class Nv extends Su {
    constructor() {
        super(...arguments), this._polling = !1
    }
    get name() {
        return "polling"
    }
    doOpen() {
        this._poll()
    }
    pause(t) {
        this.readyState = "pausing";
        const n = () => {
            this.readyState = "paused", t()
        };
        if (this._polling || !this.writable) {
            let r = 0;
            this._polling && (r++, this.once("pollComplete", function() {
                --r || n()
            })), this.writable || (r++, this.once("drain", function() {
                --r || n()
            }))
        } else n()
    }
    _poll() {
        this._polling = !0, this.doPoll(), this.emitReserved("poll")
    }
    onData(t) {
        const n = r => {
            if (this.readyState === "opening" && r.type === "open" && this.onOpen(), r.type === "close") return this.onClose({
                description: "transport closed by the server"
            }), !1;
            this.onPacket(r)
        };
        hv(t, this.socket.binaryType).forEach(n), this.readyState !== "closed" && (this._polling = !1, this.emitReserved("pollComplete"), this.readyState === "open" && this._poll())
    }
    doClose() {
        const t = () => {
            this.write([{
                type: "close"
            }])
        };
        this.readyState === "open" ? t() : this.once("open", t)
    }
    write(t) {
        this.writable = !1, fv(t, n => {
            this.doWrite(n, () => {
                this.writable = !0, this.emitReserved("drain")
            })
        })
    }
    uri() {
        const t = this.opts.secure ? "https" : "http",
            n = this.query || {};
        return this.opts.timestampRequests !== !1 && (n[this.opts.timestampParam] = sp()), !this.supportsBinary && !n.sid && (n.b64 = 1), this.createUri(t, n)
    }
}
let ap = !1;
try {
    ap = typeof XMLHttpRequest < "u" && "withCredentials" in new XMLHttpRequest
} catch {}
const Rv = ap;

function Pv() {}
class Lv extends Nv {
    constructor(t) {
        if (super(t), typeof location < "u") {
            const n = location.protocol === "https:";
            let r = location.port;
            r || (r = n ? "443" : "80"), this.xd = typeof location < "u" && t.hostname !== location.hostname || r !== t.port
        }
    }
    doWrite(t, n) {
        const r = this.request({
            method: "POST",
            data: t
        });
        r.on("success", n), r.on("error", (i, o) => {
            this.onError("xhr post error", i, o)
        })
    }
    doPoll() {
        const t = this.request();
        t.on("data", this.onData.bind(this)), t.on("error", (n, r) => {
            this.onError("xhr poll error", n, r)
        }), this.pollXhr = t
    }
}
let xr = class To extends Pe {
    constructor(t, n, r) {
        super(), this.createRequest = t, Rl(this, r), this._opts = r, this._method = r.method || "GET", this._uri = n, this._data = r.data !== void 0 ? r.data : null, this._create()
    }
    _create() {
        var t;
        const n = lp(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
        n.xdomain = !!this._opts.xd;
        const r = this._xhr = this.createRequest(n);
        try {
            r.open(this._method, this._uri, !0);
            try {
                if (this._opts.extraHeaders) {
                    r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0);
                    for (let i in this._opts.extraHeaders) this._opts.extraHeaders.hasOwnProperty(i) && r.setRequestHeader(i, this._opts.extraHeaders[i])
                }
            } catch {}
            if (this._method === "POST") try {
                r.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
            } catch {}
            try {
                r.setRequestHeader("Accept", "*/*")
            } catch {}(t = this._opts.cookieJar) === null || t === void 0 || t.addCookies(r), "withCredentials" in r && (r.withCredentials = this._opts.withCredentials), this._opts.requestTimeout && (r.timeout = this._opts.requestTimeout), r.onreadystatechange = () => {
                var i;
                r.readyState === 3 && ((i = this._opts.cookieJar) === null || i === void 0 || i.parseCookies(r.getResponseHeader("set-cookie"))), r.readyState === 4 && (r.status === 200 || r.status === 1223 ? this._onLoad() : this.setTimeoutFn(() => {
                    this._onError(typeof r.status == "number" ? r.status : 0)
                }, 0))
            }, r.send(this._data)
        } catch (i) {
            this.setTimeoutFn(() => {
                this._onError(i)
            }, 0);
            return
        }
        typeof document < "u" && (this._index = To.requestsCount++, To.requests[this._index] = this)
    }
    _onError(t) {
        this.emitReserved("error", t, this._xhr), this._cleanup(!0)
    }
    _cleanup(t) {
        if (!(typeof this._xhr > "u" || this._xhr === null)) {
            if (this._xhr.onreadystatechange = Pv, t) try {
                this._xhr.abort()
            } catch {}
            typeof document < "u" && delete To.requests[this._index], this._xhr = null
        }
    }
    _onLoad() {
        const t = this._xhr.responseText;
        t !== null && (this.emitReserved("data", t), this.emitReserved("success"), this._cleanup())
    }
    abort() {
        this._cleanup()
    }
};
xr.requestsCount = 0;
xr.requests = {};
if (typeof document < "u") {
    if (typeof attachEvent == "function") attachEvent("onunload", vd);
    else if (typeof addEventListener == "function") {
        const e = "onpagehide" in gt ? "pagehide" : "unload";
        addEventListener(e, vd, !1)
    }
}

function vd() {
    for (let e in xr.requests) xr.requests.hasOwnProperty(e) && xr.requests[e].abort()
}
const Tv = function() {
    const e = up({
        xdomain: !1
    });
    return e && e.responseType !== null
}();
class jv extends Lv {
    constructor(t) {
        super(t);
        const n = t && t.forceBase64;
        this.supportsBinary = Tv && !n
    }
    request(t = {}) {
        return Object.assign(t, {
            xd: this.xd
        }, this.opts), new xr(up, this.uri(), t)
    }
}

function up(e) {
    const t = e.xdomain;
    try {
        if (typeof XMLHttpRequest < "u" && (!t || Rv)) return new XMLHttpRequest
    } catch {}
    if (!t) try {
        return new gt[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")
    } catch {}
}
const cp = typeof navigator < "u" && typeof navigator.product == "string" && navigator.product.toLowerCase() === "reactnative";
class Ov extends Su {
    get name() {
        return "websocket"
    }
    doOpen() {
        const t = this.uri(),
            n = this.opts.protocols,
            r = cp ? {} : lp(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
        this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
        try {
            this.ws = this.createSocket(t, n, r)
        } catch (i) {
            return this.emitReserved("error", i)
        }
        this.ws.binaryType = this.socket.binaryType, this.addEventListeners()
    }
    addEventListeners() {
        this.ws.onopen = () => {
            this.opts.autoUnref && this.ws._socket.unref(), this.onOpen()
        }, this.ws.onclose = t => this.onClose({
            description: "websocket connection closed",
            context: t
        }), this.ws.onmessage = t => this.onData(t.data), this.ws.onerror = t => this.onError("websocket error", t)
    }
    write(t) {
        this.writable = !1;
        for (let n = 0; n < t.length; n++) {
            const r = t[n],
                i = n === t.length - 1;
            xu(r, this.supportsBinary, o => {
                try {
                    this.doWrite(r, o)
                } catch {}
                i && Nl(() => {
                    this.writable = !0, this.emitReserved("drain")
                }, this.setTimeoutFn)
            })
        }
    }
    doClose() {
        typeof this.ws < "u" && (this.ws.onerror = () => {}, this.ws.close(), this.ws = null)
    }
    uri() {
        const t = this.opts.secure ? "wss" : "ws",
            n = this.query || {};
        return this.opts.timestampRequests && (n[this.opts.timestampParam] = sp()), this.supportsBinary || (n.b64 = 1), this.createUri(t, n)
    }
}
const fs = gt.WebSocket || gt.MozWebSocket;
class Dv extends Ov {
    createSocket(t, n, r) {
        return cp ? new fs(t, n, r) : n ? new fs(t, n) : new fs(t)
    }
    doWrite(t, n) {
        this.ws.send(n)
    }
}
class Mv extends Su {
    get name() {
        return "webtransport"
    }
    doOpen() {
        try {
            this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name])
        } catch (t) {
            return this.emitReserved("error", t)
        }
        this._transport.closed.then(() => {
            this.onClose()
        }).catch(t => {
            this.onError("webtransport error", t)
        }), this._transport.ready.then(() => {
            this._transport.createBidirectionalStream().then(t => {
                const n = mv(Number.MAX_SAFE_INTEGER, this.socket.binaryType),
                    r = t.readable.pipeThrough(n).getReader(),
                    i = pv();
                i.readable.pipeTo(t.writable), this._writer = i.writable.getWriter();
                const o = () => {
                    r.read().then(({
                        done: s,
                        value: a
                    }) => {
                        s || (this.onPacket(a), o())
                    }).catch(s => {})
                };
                o();
                const l = {
                    type: "open"
                };
                this.query.sid && (l.data = `{"sid":"${this.query.sid}"}`), this._writer.write(l).then(() => this.onOpen())
            })
        })
    }
    write(t) {
        this.writable = !1;
        for (let n = 0; n < t.length; n++) {
            const r = t[n],
                i = n === t.length - 1;
            this._writer.write(r).then(() => {
                i && Nl(() => {
                    this.writable = !0, this.emitReserved("drain")
                }, this.setTimeoutFn)
            })
        }
    }
    doClose() {
        var t;
        (t = this._transport) === null || t === void 0 || t.close()
    }
}
const bv = {
        websocket: Dv,
        webtransport: Mv,
        polling: jv
    },
    Av = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
    zv = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];

function ca(e) {
    if (e.length > 8e3) throw "URI too long";
    const t = e,
        n = e.indexOf("["),
        r = e.indexOf("]");
    n != -1 && r != -1 && (e = e.substring(0, n) + e.substring(n, r).replace(/:/g, ";") + e.substring(r, e.length));
    let i = Av.exec(e || ""),
        o = {},
        l = 14;
    for (; l--;) o[zv[l]] = i[l] || "";
    return n != -1 && r != -1 && (o.source = t, o.host = o.host.substring(1, o.host.length - 1).replace(/;/g, ":"), o.authority = o.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), o.ipv6uri = !0), o.pathNames = Fv(o, o.path), o.queryKey = Iv(o, o.query), o
}

function Fv(e, t) {
    const n = /\/{2,9}/g,
        r = t.replace(n, "/").split("/");
    return (t.slice(0, 1) == "/" || t.length === 0) && r.splice(0, 1), t.slice(-1) == "/" && r.splice(r.length - 1, 1), r
}

function Iv(e, t) {
    const n = {};
    return t.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function(r, i, o) {
        i && (n[i] = o)
    }), n
}
const da = typeof addEventListener == "function" && typeof removeEventListener == "function",
    jo = [];
da && addEventListener("offline", () => {
    jo.forEach(e => e())
}, !1);
class En extends Pe {
    constructor(t, n) {
        if (super(), this.binaryType = gv, this.writeBuffer = [], this._prevBufferLen = 0, this._pingInterval = -1, this._pingTimeout = -1, this._maxPayload = -1, this._pingTimeoutTime = 1 / 0, t && typeof t == "object" && (n = t, t = null), t) {
            const r = ca(t);
            n.hostname = r.host, n.secure = r.protocol === "https" || r.protocol === "wss", n.port = r.port, r.query && (n.query = r.query)
        } else n.host && (n.hostname = ca(n.host).host);
        Rl(this, n), this.secure = n.secure != null ? n.secure : typeof location < "u" && location.protocol === "https:", n.hostname && !n.port && (n.port = this.secure ? "443" : "80"), this.hostname = n.hostname || (typeof location < "u" ? location.hostname : "localhost"), this.port = n.port || (typeof location < "u" && location.port ? location.port : this.secure ? "443" : "80"), this.transports = [], this._transportsByName = {}, n.transports.forEach(r => {
            const i = r.prototype.name;
            this.transports.push(i), this._transportsByName[i] = r
        }), this.opts = Object.assign({
            path: "/engine.io",
            agent: !1,
            withCredentials: !1,
            upgrade: !0,
            timestampParam: "t",
            rememberUpgrade: !1,
            addTrailingSlash: !0,
            rejectUnauthorized: !0,
            perMessageDeflate: {
                threshold: 1024
            },
            transportOptions: {},
            closeOnBeforeunload: !1
        }, n), this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : ""), typeof this.opts.query == "string" && (this.opts.query = _v(this.opts.query)), da && (this.opts.closeOnBeforeunload && (this._beforeunloadEventListener = () => {
            this.transport && (this.transport.removeAllListeners(), this.transport.close())
        }, addEventListener("beforeunload", this._beforeunloadEventListener, !1)), this.hostname !== "localhost" && (this._offlineEventListener = () => {
            this._onClose("transport close", {
                description: "network connection lost"
            })
        }, jo.push(this._offlineEventListener))), this.opts.withCredentials && (this._cookieJar = void 0), this._open()
    }
    createTransport(t) {
        const n = Object.assign({}, this.opts.query);
        n.EIO = op, n.transport = t, this.id && (n.sid = this.id);
        const r = Object.assign({}, this.opts, {
            query: n,
            socket: this,
            hostname: this.hostname,
            secure: this.secure,
            port: this.port
        }, this.opts.transportOptions[t]);
        return new this._transportsByName[t](r)
    }
    _open() {
        if (this.transports.length === 0) {
            this.setTimeoutFn(() => {
                this.emitReserved("error", "No transports available")
            }, 0);
            return
        }
        const t = this.opts.rememberUpgrade && En.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
        this.readyState = "opening";
        const n = this.createTransport(t);
        n.open(), this.setTransport(n)
    }
    setTransport(t) {
        this.transport && this.transport.removeAllListeners(), this.transport = t, t.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", n => this._onClose("transport close", n))
    }
    onOpen() {
        this.readyState = "open", En.priorWebsocketSuccess = this.transport.name === "websocket", this.emitReserved("open"), this.flush()
    }
    _onPacket(t) {
        if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") switch (this.emitReserved("packet", t), this.emitReserved("heartbeat"), t.type) {
            case "open":
                this.onHandshake(JSON.parse(t.data));
                break;
            case "ping":
                this._sendPacket("pong"), this.emitReserved("ping"), this.emitReserved("pong"), this._resetPingTimeout();
                break;
            case "error":
                const n = new Error("server error");
                n.code = t.data, this._onError(n);
                break;
            case "message":
                this.emitReserved("data", t.data), this.emitReserved("message", t.data);
                break
        }
    }
    onHandshake(t) {
        this.emitReserved("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this._pingInterval = t.pingInterval, this._pingTimeout = t.pingTimeout, this._maxPayload = t.maxPayload, this.onOpen(), this.readyState !== "closed" && this._resetPingTimeout()
    }
    _resetPingTimeout() {
        this.clearTimeoutFn(this._pingTimeoutTimer);
        const t = this._pingInterval + this._pingTimeout;
        this._pingTimeoutTime = Date.now() + t, this._pingTimeoutTimer = this.setTimeoutFn(() => {
            this._onClose("ping timeout")
        }, t), this.opts.autoUnref && this._pingTimeoutTimer.unref()
    }
    _onDrain() {
        this.writeBuffer.splice(0, this._prevBufferLen), this._prevBufferLen = 0, this.writeBuffer.length === 0 ? this.emitReserved("drain") : this.flush()
    }
    flush() {
        if (this.readyState !== "closed" && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
            const t = this._getWritablePackets();
            this.transport.send(t), this._prevBufferLen = t.length, this.emitReserved("flush")
        }
    }
    _getWritablePackets() {
        if (!(this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1)) return this.writeBuffer;
        let n = 1;
        for (let r = 0; r < this.writeBuffer.length; r++) {
            const i = this.writeBuffer[r].data;
            if (i && (n += kv(i)), r > 0 && n > this._maxPayload) return this.writeBuffer.slice(0, r);
            n += 2
        }
        return this.writeBuffer
    }
    _hasPingExpired() {
        if (!this._pingTimeoutTime) return !0;
        const t = Date.now() > this._pingTimeoutTime;
        return t && (this._pingTimeoutTime = 0, Nl(() => {
            this._onClose("ping timeout")
        }, this.setTimeoutFn)), t
    }
    write(t, n, r) {
        return this._sendPacket("message", t, n, r), this
    }
    send(t, n, r) {
        return this._sendPacket("message", t, n, r), this
    }
    _sendPacket(t, n, r, i) {
        if (typeof n == "function" && (i = n, n = void 0), typeof r == "function" && (i = r, r = null), this.readyState === "closing" || this.readyState === "closed") return;
        r = r || {}, r.compress = r.compress !== !1;
        const o = {
            type: t,
            data: n,
            options: r
        };
        this.emitReserved("packetCreate", o), this.writeBuffer.push(o), i && this.once("flush", i), this.flush()
    }
    close() {
        const t = () => {
                this._onClose("forced close"), this.transport.close()
            },
            n = () => {
                this.off("upgrade", n), this.off("upgradeError", n), t()
            },
            r = () => {
                this.once("upgrade", n), this.once("upgradeError", n)
            };
        return (this.readyState === "opening" || this.readyState === "open") && (this.readyState = "closing", this.writeBuffer.length ? this.once("drain", () => {
            this.upgrading ? r() : t()
        }) : this.upgrading ? r() : t()), this
    }
    _onError(t) {
        if (En.priorWebsocketSuccess = !1, this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening") return this.transports.shift(), this._open();
        this.emitReserved("error", t), this._onClose("transport error", t)
    }
    _onClose(t, n) {
        if (this.readyState === "opening" || this.readyState === "open" || this.readyState === "closing") {
            if (this.clearTimeoutFn(this._pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), da && (this._beforeunloadEventListener && removeEventListener("beforeunload", this._beforeunloadEventListener, !1), this._offlineEventListener)) {
                const r = jo.indexOf(this._offlineEventListener);
                r !== -1 && jo.splice(r, 1)
            }
            this.readyState = "closed", this.id = null, this.emitReserved("close", t, n), this.writeBuffer = [], this._prevBufferLen = 0
        }
    }
}
En.protocol = op;
class Uv extends En {
    constructor() {
        super(...arguments), this._upgrades = []
    }
    onOpen() {
        if (super.onOpen(), this.readyState === "open" && this.opts.upgrade)
            for (let t = 0; t < this._upgrades.length; t++) this._probe(this._upgrades[t])
    }
    _probe(t) {
        let n = this.createTransport(t),
            r = !1;
        En.priorWebsocketSuccess = !1;
        const i = () => {
            r || (n.send([{
                type: "ping",
                data: "probe"
            }]), n.once("packet", m => {
                if (!r)
                    if (m.type === "pong" && m.data === "probe") {
                        if (this.upgrading = !0, this.emitReserved("upgrading", n), !n) return;
                        En.priorWebsocketSuccess = n.name === "websocket", this.transport.pause(() => {
                            r || this.readyState !== "closed" && (h(), this.setTransport(n), n.send([{
                                type: "upgrade"
                            }]), this.emitReserved("upgrade", n), n = null, this.upgrading = !1, this.flush())
                        })
                    } else {
                        const p = new Error("probe error");
                        p.transport = n.name, this.emitReserved("upgradeError", p)
                    }
            }))
        };

        function o() {
            r || (r = !0, h(), n.close(), n = null)
        }
        const l = m => {
            const p = new Error("probe error: " + m);
            p.transport = n.name, o(), this.emitReserved("upgradeError", p)
        };

        function s() {
            l("transport closed")
        }

        function a() {
            l("socket closed")
        }

        function u(m) {
            n && m.name !== n.name && o()
        }
        const h = () => {
            n.removeListener("open", i), n.removeListener("error", l), n.removeListener("close", s), this.off("close", a), this.off("upgrading", u)
        };
        n.once("open", i), n.once("error", l), n.once("close", s), this.once("close", a), this.once("upgrading", u), this._upgrades.indexOf("webtransport") !== -1 && t !== "webtransport" ? this.setTimeoutFn(() => {
            r || n.open()
        }, 200) : n.open()
    }
    onHandshake(t) {
        this._upgrades = this._filterUpgrades(t.upgrades), super.onHandshake(t)
    }
    _filterUpgrades(t) {
        const n = [];
        for (let r = 0; r < t.length; r++) ~this.transports.indexOf(t[r]) && n.push(t[r]);
        return n
    }
}
let Bv = class extends Uv {
    constructor(t, n = {}) {
        const r = typeof t == "object" ? t : n;
        (!r.transports || r.transports && typeof r.transports[0] == "string") && (r.transports = (r.transports || ["polling", "websocket", "webtransport"]).map(i => bv[i]).filter(i => !!i)), super(t, r)
    }
};

function $v(e, t = "", n) {
    let r = e;
    n = n || typeof location < "u" && location, e == null && (e = n.protocol + "//" + n.host), typeof e == "string" && (e.charAt(0) === "/" && (e.charAt(1) === "/" ? e = n.protocol + e : e = n.host + e), /^(https?|wss?):\/\//.test(e) || (typeof n < "u" ? e = n.protocol + "//" + e : e = "https://" + e), r = ca(e)), r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443")), r.path = r.path || "/";
    const o = r.host.indexOf(":") !== -1 ? "[" + r.host + "]" : r.host;
    return r.id = r.protocol + "://" + o + ":" + r.port + t, r.href = r.protocol + "://" + o + (n && n.port === r.port ? "" : ":" + r.port), r
}
const Vv = typeof ArrayBuffer == "function",
    Hv = e => typeof ArrayBuffer.isView == "function" ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer,
    dp = Object.prototype.toString,
    Wv = typeof Blob == "function" || typeof Blob < "u" && dp.call(Blob) === "[object BlobConstructor]",
    Kv = typeof File == "function" || typeof File < "u" && dp.call(File) === "[object FileConstructor]";

function Eu(e) {
    return Vv && (e instanceof ArrayBuffer || Hv(e)) || Wv && e instanceof Blob || Kv && e instanceof File
}

function Oo(e, t) {
    if (!e || typeof e != "object") return !1;
    if (Array.isArray(e)) {
        for (let n = 0, r = e.length; n < r; n++)
            if (Oo(e[n])) return !0;
        return !1
    }
    if (Eu(e)) return !0;
    if (e.toJSON && typeof e.toJSON == "function" && arguments.length === 1) return Oo(e.toJSON(), !0);
    for (const n in e)
        if (Object.prototype.hasOwnProperty.call(e, n) && Oo(e[n])) return !0;
    return !1
}

function Qv(e) {
    const t = [],
        n = e.data,
        r = e;
    return r.data = fa(n, t), r.attachments = t.length, {
        packet: r,
        buffers: t
    }
}

function fa(e, t) {
    if (!e) return e;
    if (Eu(e)) {
        const n = {
            _placeholder: !0,
            num: t.length
        };
        return t.push(e), n
    } else if (Array.isArray(e)) {
        const n = new Array(e.length);
        for (let r = 0; r < e.length; r++) n[r] = fa(e[r], t);
        return n
    } else if (typeof e == "object" && !(e instanceof Date)) {
        const n = {};
        for (const r in e) Object.prototype.hasOwnProperty.call(e, r) && (n[r] = fa(e[r], t));
        return n
    }
    return e
}

function Xv(e, t) {
    return e.data = ha(e.data, t), delete e.attachments, e
}

function ha(e, t) {
    if (!e) return e;
    if (e && e._placeholder === !0) {
        if (typeof e.num == "number" && e.num >= 0 && e.num < t.length) return t[e.num];
        throw new Error("illegal attachments")
    } else if (Array.isArray(e))
        for (let n = 0; n < e.length; n++) e[n] = ha(e[n], t);
    else if (typeof e == "object")
        for (const n in e) Object.prototype.hasOwnProperty.call(e, n) && (e[n] = ha(e[n], t));
    return e
}
const Yv = ["connect", "connect_error", "disconnect", "disconnecting", "newListener", "removeListener"],
    qv = 5;
var ne;
(function(e) {
    e[e.CONNECT = 0] = "CONNECT", e[e.DISCONNECT = 1] = "DISCONNECT", e[e.EVENT = 2] = "EVENT", e[e.ACK = 3] = "ACK", e[e.CONNECT_ERROR = 4] = "CONNECT_ERROR", e[e.BINARY_EVENT = 5] = "BINARY_EVENT", e[e.BINARY_ACK = 6] = "BINARY_ACK"
})(ne || (ne = {}));
class Gv {
    constructor(t) {
        this.replacer = t
    }
    encode(t) {
        return (t.type === ne.EVENT || t.type === ne.ACK) && Oo(t) ? this.encodeAsBinary({
            type: t.type === ne.EVENT ? ne.BINARY_EVENT : ne.BINARY_ACK,
            nsp: t.nsp,
            data: t.data,
            id: t.id
        }) : [this.encodeAsString(t)]
    }
    encodeAsString(t) {
        let n = "" + t.type;
        return (t.type === ne.BINARY_EVENT || t.type === ne.BINARY_ACK) && (n += t.attachments + "-"), t.nsp && t.nsp !== "/" && (n += t.nsp + ","), t.id != null && (n += t.id), t.data != null && (n += JSON.stringify(t.data, this.replacer)), n
    }
    encodeAsBinary(t) {
        const n = Qv(t),
            r = this.encodeAsString(n.packet),
            i = n.buffers;
        return i.unshift(r), i
    }
}

function wd(e) {
    return Object.prototype.toString.call(e) === "[object Object]"
}
class _u extends Pe {
    constructor(t) {
        super(), this.reviver = t
    }
    add(t) {
        let n;
        if (typeof t == "string") {
            if (this.reconstructor) throw new Error("got plaintext data when reconstructing a packet");
            n = this.decodeString(t);
            const r = n.type === ne.BINARY_EVENT;
            r || n.type === ne.BINARY_ACK ? (n.type = r ? ne.EVENT : ne.ACK, this.reconstructor = new Jv(n), n.attachments === 0 && super.emitReserved("decoded", n)) : super.emitReserved("decoded", n)
        } else if (Eu(t) || t.base64)
            if (this.reconstructor) n = this.reconstructor.takeBinaryData(t), n && (this.reconstructor = null, super.emitReserved("decoded", n));
            else throw new Error("got binary data when not reconstructing a packet");
        else throw new Error("Unknown type: " + t)
    }
    decodeString(t) {
        let n = 0;
        const r = {
            type: Number(t.charAt(0))
        };
        if (ne[r.type] === void 0) throw new Error("unknown packet type " + r.type);
        if (r.type === ne.BINARY_EVENT || r.type === ne.BINARY_ACK) {
            const o = n + 1;
            for (; t.charAt(++n) !== "-" && n != t.length;);
            const l = t.substring(o, n);
            if (l != Number(l) || t.charAt(n) !== "-") throw new Error("Illegal attachments");
            r.attachments = Number(l)
        }
        if (t.charAt(n + 1) === "/") {
            const o = n + 1;
            for (; ++n && !(t.charAt(n) === "," || n === t.length););
            r.nsp = t.substring(o, n)
        } else r.nsp = "/";
        const i = t.charAt(n + 1);
        if (i !== "" && Number(i) == i) {
            const o = n + 1;
            for (; ++n;) {
                const l = t.charAt(n);
                if (l == null || Number(l) != l) {
                    --n;
                    break
                }
                if (n === t.length) break
            }
            r.id = Number(t.substring(o, n + 1))
        }
        if (t.charAt(++n)) {
            const o = this.tryParse(t.substr(n));
            if (_u.isPayloadValid(r.type, o)) r.data = o;
            else throw new Error("invalid payload")
        }
        return r
    }
    tryParse(t) {
        try {
            return JSON.parse(t, this.reviver)
        } catch {
            return !1
        }
    }
    static isPayloadValid(t, n) {
        switch (t) {
            case ne.CONNECT:
                return wd(n);
            case ne.DISCONNECT:
                return n === void 0;
            case ne.CONNECT_ERROR:
                return typeof n == "string" || wd(n);
            case ne.EVENT:
            case ne.BINARY_EVENT:
                return Array.isArray(n) && (typeof n[0] == "number" || typeof n[0] == "string" && Yv.indexOf(n[0]) === -1);
            case ne.ACK:
            case ne.BINARY_ACK:
                return Array.isArray(n)
        }
    }
    destroy() {
        this.reconstructor && (this.reconstructor.finishedReconstruction(), this.reconstructor = null)
    }
}
class Jv {
    constructor(t) {
        this.packet = t, this.buffers = [], this.reconPack = t
    }
    takeBinaryData(t) {
        if (this.buffers.push(t), this.buffers.length === this.reconPack.attachments) {
            const n = Xv(this.reconPack, this.buffers);
            return this.finishedReconstruction(), n
        }
        return null
    }
    finishedReconstruction() {
        this.reconPack = null, this.buffers = []
    }
}
const Zv = Object.freeze(Object.defineProperty({
    __proto__: null,
    Decoder: _u,
    Encoder: Gv,
    get PacketType() {
        return ne
    },
    protocol: qv
}, Symbol.toStringTag, {
    value: "Module"
}));

function Rt(e, t, n) {
    return e.on(t, n),
        function() {
            e.off(t, n)
        }
}
const e1 = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    newListener: 1,
    removeListener: 1
});
class fp extends Pe {
    constructor(t, n, r) {
        super(), this.connected = !1, this.recovered = !1, this.receiveBuffer = [], this.sendBuffer = [], this._queue = [], this._queueSeq = 0, this.ids = 0, this.acks = {}, this.flags = {}, this.io = t, this.nsp = n, r && r.auth && (this.auth = r.auth), this._opts = Object.assign({}, r), this.io._autoConnect && this.open()
    }
    get disconnected() {
        return !this.connected
    }
    subEvents() {
        if (this.subs) return;
        const t = this.io;
        this.subs = [Rt(t, "open", this.onopen.bind(this)), Rt(t, "packet", this.onpacket.bind(this)), Rt(t, "error", this.onerror.bind(this)), Rt(t, "close", this.onclose.bind(this))]
    }
    get active() {
        return !!this.subs
    }
    connect() {
        return this.connected ? this : (this.subEvents(), this.io._reconnecting || this.io.open(), this.io._readyState === "open" && this.onopen(), this)
    }
    open() {
        return this.connect()
    }
    send(...t) {
        return t.unshift("message"), this.emit.apply(this, t), this
    }
    emit(t, ...n) {
        var r, i, o;
        if (e1.hasOwnProperty(t)) throw new Error('"' + t.toString() + '" is a reserved event name');
        if (n.unshift(t), this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) return this._addToQueue(n), this;
        const l = {
            type: ne.EVENT,
            data: n
        };
        if (l.options = {}, l.options.compress = this.flags.compress !== !1, typeof n[n.length - 1] == "function") {
            const h = this.ids++,
                m = n.pop();
            this._registerAckCallback(h, m), l.id = h
        }
        const s = (i = (r = this.io.engine) === null || r === void 0 ? void 0 : r.transport) === null || i === void 0 ? void 0 : i.writable,
            a = this.connected && !(!((o = this.io.engine) === null || o === void 0) && o._hasPingExpired());
        return this.flags.volatile && !s || (a ? (this.notifyOutgoingListeners(l), this.packet(l)) : this.sendBuffer.push(l)), this.flags = {}, this
    }
    _registerAckCallback(t, n) {
        var r;
        const i = (r = this.flags.timeout) !== null && r !== void 0 ? r : this._opts.ackTimeout;
        if (i === void 0) {
            this.acks[t] = n;
            return
        }
        const o = this.io.setTimeoutFn(() => {
                delete this.acks[t];
                for (let s = 0; s < this.sendBuffer.length; s++) this.sendBuffer[s].id === t && this.sendBuffer.splice(s, 1);
                n.call(this, new Error("operation has timed out"))
            }, i),
            l = (...s) => {
                this.io.clearTimeoutFn(o), n.apply(this, s)
            };
        l.withError = !0, this.acks[t] = l
    }
    emitWithAck(t, ...n) {
        return new Promise((r, i) => {
            const o = (l, s) => l ? i(l) : r(s);
            o.withError = !0, n.push(o), this.emit(t, ...n)
        })
    }
    _addToQueue(t) {
        let n;
        typeof t[t.length - 1] == "function" && (n = t.pop());
        const r = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: !1,
            args: t,
            flags: Object.assign({
                fromQueue: !0
            }, this.flags)
        };
        t.push((i, ...o) => r !== this._queue[0] ? void 0 : (i !== null ? r.tryCount > this._opts.retries && (this._queue.shift(), n && n(i)) : (this._queue.shift(), n && n(null, ...o)), r.pending = !1, this._drainQueue())), this._queue.push(r), this._drainQueue()
    }
    _drainQueue(t = !1) {
        if (!this.connected || this._queue.length === 0) return;
        const n = this._queue[0];
        n.pending && !t || (n.pending = !0, n.tryCount++, this.flags = n.flags, this.emit.apply(this, n.args))
    }
    packet(t) {
        t.nsp = this.nsp, this.io._packet(t)
    }
    onopen() {
        typeof this.auth == "function" ? this.auth(t => {
            this._sendConnectPacket(t)
        }) : this._sendConnectPacket(this.auth)
    }
    _sendConnectPacket(t) {
        this.packet({
            type: ne.CONNECT,
            data: this._pid ? Object.assign({
                pid: this._pid,
                offset: this._lastOffset
            }, t) : t
        })
    }
    onerror(t) {
        this.connected || this.emitReserved("connect_error", t)
    }
    onclose(t, n) {
        this.connected = !1, delete this.id, this.emitReserved("disconnect", t, n), this._clearAcks()
    }
    _clearAcks() {
        Object.keys(this.acks).forEach(t => {
            if (!this.sendBuffer.some(r => String(r.id) === t)) {
                const r = this.acks[t];
                delete this.acks[t], r.withError && r.call(this, new Error("socket has been disconnected"))
            }
        })
    }
    onpacket(t) {
        if (t.nsp === this.nsp) switch (t.type) {
            case ne.CONNECT:
                t.data && t.data.sid ? this.onconnect(t.data.sid, t.data.pid) : this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
                break;
            case ne.EVENT:
            case ne.BINARY_EVENT:
                this.onevent(t);
                break;
            case ne.ACK:
            case ne.BINARY_ACK:
                this.onack(t);
                break;
            case ne.DISCONNECT:
                this.ondisconnect();
                break;
            case ne.CONNECT_ERROR:
                this.destroy();
                const r = new Error(t.data.message);
                r.data = t.data.data, this.emitReserved("connect_error", r);
                break
        }
    }
    onevent(t) {
        const n = t.data || [];
        t.id != null && n.push(this.ack(t.id)), this.connected ? this.emitEvent(n) : this.receiveBuffer.push(Object.freeze(n))
    }
    emitEvent(t) {
        if (this._anyListeners && this._anyListeners.length) {
            const n = this._anyListeners.slice();
            for (const r of n) r.apply(this, t)
        }
        super.emit.apply(this, t), this._pid && t.length && typeof t[t.length - 1] == "string" && (this._lastOffset = t[t.length - 1])
    }
    ack(t) {
        const n = this;
        let r = !1;
        return function(...i) {
            r || (r = !0, n.packet({
                type: ne.ACK,
                id: t,
                data: i
            }))
        }
    }
    onack(t) {
        const n = this.acks[t.id];
        typeof n == "function" && (delete this.acks[t.id], n.withError && t.data.unshift(null), n.apply(this, t.data))
    }
    onconnect(t, n) {
        this.id = t, this.recovered = n && this._pid === n, this._pid = n, this.connected = !0, this.emitBuffered(), this.emitReserved("connect"), this._drainQueue(!0)
    }
    emitBuffered() {
        this.receiveBuffer.forEach(t => this.emitEvent(t)), this.receiveBuffer = [], this.sendBuffer.forEach(t => {
            this.notifyOutgoingListeners(t), this.packet(t)
        }), this.sendBuffer = []
    }
    ondisconnect() {
        this.destroy(), this.onclose("io server disconnect")
    }
    destroy() {
        this.subs && (this.subs.forEach(t => t()), this.subs = void 0), this.io._destroy(this)
    }
    disconnect() {
        return this.connected && this.packet({
            type: ne.DISCONNECT
        }), this.destroy(), this.connected && this.onclose("io client disconnect"), this
    }
    close() {
        return this.disconnect()
    }
    compress(t) {
        return this.flags.compress = t, this
    }
    get volatile() {
        return this.flags.volatile = !0, this
    }
    timeout(t) {
        return this.flags.timeout = t, this
    }
    onAny(t) {
        return this._anyListeners = this._anyListeners || [], this._anyListeners.push(t), this
    }
    prependAny(t) {
        return this._anyListeners = this._anyListeners || [], this._anyListeners.unshift(t), this
    }
    offAny(t) {
        if (!this._anyListeners) return this;
        if (t) {
            const n = this._anyListeners;
            for (let r = 0; r < n.length; r++)
                if (t === n[r]) return n.splice(r, 1), this
        } else this._anyListeners = [];
        return this
    }
    listenersAny() {
        return this._anyListeners || []
    }
    onAnyOutgoing(t) {
        return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.push(t), this
    }
    prependAnyOutgoing(t) {
        return this._anyOutgoingListeners = this._anyOutgoingListeners || [], this._anyOutgoingListeners.unshift(t), this
    }
    offAnyOutgoing(t) {
        if (!this._anyOutgoingListeners) return this;
        if (t) {
            const n = this._anyOutgoingListeners;
            for (let r = 0; r < n.length; r++)
                if (t === n[r]) return n.splice(r, 1), this
        } else this._anyOutgoingListeners = [];
        return this
    }
    listenersAnyOutgoing() {
        return this._anyOutgoingListeners || []
    }
    notifyOutgoingListeners(t) {
        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            const n = this._anyOutgoingListeners.slice();
            for (const r of n) r.apply(this, t.data)
        }
    }
}

function jr(e) {
    e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0
}
jr.prototype.duration = function() {
    var e = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
        var t = Math.random(),
            n = Math.floor(t * this.jitter * e);
        e = Math.floor(t * 10) & 1 ? e + n : e - n
    }
    return Math.min(e, this.max) | 0
};
jr.prototype.reset = function() {
    this.attempts = 0
};
jr.prototype.setMin = function(e) {
    this.ms = e
};
jr.prototype.setMax = function(e) {
    this.max = e
};
jr.prototype.setJitter = function(e) {
    this.jitter = e
};
class pa extends Pe {
    constructor(t, n) {
        var r;
        super(), this.nsps = {}, this.subs = [], t && typeof t == "object" && (n = t, t = void 0), n = n || {}, n.path = n.path || "/socket.io", this.opts = n, Rl(this, n), this.reconnection(n.reconnection !== !1), this.reconnectionAttempts(n.reconnectionAttempts || 1 / 0), this.reconnectionDelay(n.reconnectionDelay || 1e3), this.reconnectionDelayMax(n.reconnectionDelayMax || 5e3), this.randomizationFactor((r = n.randomizationFactor) !== null && r !== void 0 ? r : .5), this.backoff = new jr({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        }), this.timeout(n.timeout == null ? 2e4 : n.timeout), this._readyState = "closed", this.uri = t;
        const i = n.parser || Zv;
        this.encoder = new i.Encoder, this.decoder = new i.Decoder, this._autoConnect = n.autoConnect !== !1, this._autoConnect && this.open()
    }
    reconnection(t) {
        return arguments.length ? (this._reconnection = !!t, t || (this.skipReconnect = !0), this) : this._reconnection
    }
    reconnectionAttempts(t) {
        return t === void 0 ? this._reconnectionAttempts : (this._reconnectionAttempts = t, this)
    }
    reconnectionDelay(t) {
        var n;
        return t === void 0 ? this._reconnectionDelay : (this._reconnectionDelay = t, (n = this.backoff) === null || n === void 0 || n.setMin(t), this)
    }
    randomizationFactor(t) {
        var n;
        return t === void 0 ? this._randomizationFactor : (this._randomizationFactor = t, (n = this.backoff) === null || n === void 0 || n.setJitter(t), this)
    }
    reconnectionDelayMax(t) {
        var n;
        return t === void 0 ? this._reconnectionDelayMax : (this._reconnectionDelayMax = t, (n = this.backoff) === null || n === void 0 || n.setMax(t), this)
    }
    timeout(t) {
        return arguments.length ? (this._timeout = t, this) : this._timeout
    }
    maybeReconnectOnOpen() {
        !this._reconnecting && this._reconnection && this.backoff.attempts === 0 && this.reconnect()
    }
    open(t) {
        if (~this._readyState.indexOf("open")) return this;
        this.engine = new Bv(this.uri, this.opts);
        const n = this.engine,
            r = this;
        this._readyState = "opening", this.skipReconnect = !1;
        const i = Rt(n, "open", function() {
                r.onopen(), t && t()
            }),
            o = s => {
                this.cleanup(), this._readyState = "closed", this.emitReserved("error", s), t ? t(s) : this.maybeReconnectOnOpen()
            },
            l = Rt(n, "error", o);
        if (this._timeout !== !1) {
            const s = this._timeout,
                a = this.setTimeoutFn(() => {
                    i(), o(new Error("timeout")), n.close()
                }, s);
            this.opts.autoUnref && a.unref(), this.subs.push(() => {
                this.clearTimeoutFn(a)
            })
        }
        return this.subs.push(i), this.subs.push(l), this
    }
    connect(t) {
        return this.open(t)
    }
    onopen() {
        this.cleanup(), this._readyState = "open", this.emitReserved("open");
        const t = this.engine;
        this.subs.push(Rt(t, "ping", this.onping.bind(this)), Rt(t, "data", this.ondata.bind(this)), Rt(t, "error", this.onerror.bind(this)), Rt(t, "close", this.onclose.bind(this)), Rt(this.decoder, "decoded", this.ondecoded.bind(this)))
    }
    onping() {
        this.emitReserved("ping")
    }
    ondata(t) {
        try {
            this.decoder.add(t)
        } catch (n) {
            this.onclose("parse error", n)
        }
    }
    ondecoded(t) {
        Nl(() => {
            this.emitReserved("packet", t)
        }, this.setTimeoutFn)
    }
    onerror(t) {
        this.emitReserved("error", t)
    }
    socket(t, n) {
        let r = this.nsps[t];
        return r ? this._autoConnect && !r.active && r.connect() : (r = new fp(this, t, n), this.nsps[t] = r), r
    }
    _destroy(t) {
        const n = Object.keys(this.nsps);
        for (const r of n)
            if (this.nsps[r].active) return;
        this._close()
    }
    _packet(t) {
        const n = this.encoder.encode(t);
        for (let r = 0; r < n.length; r++) this.engine.write(n[r], t.options)
    }
    cleanup() {
        this.subs.forEach(t => t()), this.subs.length = 0, this.decoder.destroy()
    }
    _close() {
        this.skipReconnect = !0, this._reconnecting = !1, this.onclose("forced close")
    }
    disconnect() {
        return this._close()
    }
    onclose(t, n) {
        var r;
        this.cleanup(), (r = this.engine) === null || r === void 0 || r.close(), this.backoff.reset(), this._readyState = "closed", this.emitReserved("close", t, n), this._reconnection && !this.skipReconnect && this.reconnect()
    }
    reconnect() {
        if (this._reconnecting || this.skipReconnect) return this;
        const t = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) this.backoff.reset(), this.emitReserved("reconnect_failed"), this._reconnecting = !1;
        else {
            const n = this.backoff.duration();
            this._reconnecting = !0;
            const r = this.setTimeoutFn(() => {
                t.skipReconnect || (this.emitReserved("reconnect_attempt", t.backoff.attempts), !t.skipReconnect && t.open(i => {
                    i ? (t._reconnecting = !1, t.reconnect(), this.emitReserved("reconnect_error", i)) : t.onreconnect()
                }))
            }, n);
            this.opts.autoUnref && r.unref(), this.subs.push(() => {
                this.clearTimeoutFn(r)
            })
        }
    }
    onreconnect() {
        const t = this.backoff.attempts;
        this._reconnecting = !1, this.backoff.reset(), this.emitReserved("reconnect", t)
    }
}
const Xr = {};

function Do(e, t) {
    typeof e == "object" && (t = e, e = void 0), t = t || {};
    const n = $v(e, t.path || "/socket.io"),
        r = n.source,
        i = n.id,
        o = n.path,
        l = Xr[i] && o in Xr[i].nsps,
        s = t.forceNew || t["force new connection"] || t.multiplex === !1 || l;
    let a;
    return s ? a = new pa(r, t) : (Xr[i] || (Xr[i] = new pa(r, t)), a = Xr[i]), n.query && !t.query && (t.query = n.queryKey), a.socket(n.path, t)
}
Object.assign(Do, {
    Manager: pa,
    Socket: fp,
    io: Do,
    connect: Do
});
if (typeof document < "u") {
    const e = document.querySelector('meta[name="viewport"]');
    if (e) e.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    else {
        const t = document.createElement("meta");
        t.name = "viewport", t.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no", document.head.appendChild(t)
    }
}
const currentHost = window.location.hostname;
const currentPort = window.location.port || (window.location.protocol === 'https:' ? '443' : '80');
const serverPort = '5050';
const baseUrl = `${window.location.protocol}//${currentHost}:${serverPort}`;
const t1 = `${baseUrl}/api`,
    n1 = baseUrl;

function r1() {
    const [e, t] = x.useState(null), [n, r] = x.useState(localStorage.getItem("token")), [i, o] = x.useState("login"), [l, s] = x.useState(null), [a, u] = x.useState(null), [h, m] = x.useState(null), [p, w] = x.useState(null), [S, E] = x.useState(null), N = async (L, Y = "GET", H = null) => {
        const ee = {
            method: Y,
            headers: {
                "Content-Type": "application/json",
                Authorization: n ? `Bearer ${n}` : ""
            }
        };
        H && (ee.body = JSON.stringify(H));
        const oe = await fetch(`${t1}${L}`, ee),
            te = await oe.json();
        if (!oe.ok) throw new Error(te.message || "请求失败");
        return te
    }, c = (L, Y, H, ee, oe = "确定") => {
        m({
            type: L,
            title: Y,
            message: H,
            onConfirm: ee,
            buttonText: oe
        })
    }, d = () => {
        m(null)
    };
    x.useEffect(() => {
        n && N("/user/profile").then(L => {
            t(L), o("lobby")
        }).catch(() => {
            localStorage.removeItem("token"), r(null)
        })
    }, [n]);
    const y = () => {
            const [L, Y] = x.useState(!0), [H, ee] = x.useState(""), [oe, te] = x.useState(""), [le, Se] = x.useState(""), [T, I] = x.useState(!1), B = async () => {
                if (!H || !oe) {
                    c("error", "错误", "请填写用户名和密� ");
                    return
                }
                I(!0);
                try {
                    const ue = await N(L ? "/auth/login" : "/auth/register", "POST", L ? {
                        username: H,
                        password: oe
                    } : {
                        username: H,
                        password: oe,
                        nickname: le || H
                    });
                    localStorage.setItem("token", ue.token), r(ue.token), t(ue.user), o("lobby")
                } catch (W) {
                    c("error", "错误", W.message)
                } finally {
                    I(!1)
                }
            };
            return f.jsx("div", {
                className: "min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center p-4",
                children: f.jsxs("div", {
                    className: "bg-black/40 backdrop-blur-lg rounded-3xl p-8 w-full max-w-md border border-pink-500/30 shadow-2xl",
                    children: [f.jsxs("div", {
                        className: "text-center mb-8",
                        children: [f.jsx(fd, {
                            className: "w-16 h-16 mx-auto text-pink-400 mb-4 animate-pulse"
                        }), f.jsx("h1", {
                            className: "text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400",
                            children: "XP狼人杀"
                        }), f.jsx("p", {
                            className: "text-pink-200 mt-2",
                            children: "探索朋友们内心深处的秘密~"
                        })]
                    }), f.jsxs("div", {
                        className: "space-y-4",
                        children: [f.jsx("div", {
                            children: f.jsx("input", {
                                type: "text",
                                placeholder: "用户� ",
                                value: H,
                                onChange: W => ee(W.target.value),
                                onKeyDown: W => W.key === "Enter" && !T && B(),
                                className: "w-full px-4 py-3 rounded-xl bg-white/10 border border-pink-400/30 text-white placeholder-pink-200/50 focus:outline-none focus:border-pink-400"
                            })
                        }), f.jsx("div", {
                            children: f.jsx("input", {
                                type: "password",
                                placeholder: "密码",
                                value: oe,
                                onChange: W => te(W.target.value),
                                onKeyDown: W => W.key === "Enter" && !T && B(),
                                className: "w-full px-4 py-3 rounded-xl bg-white/10 border border-pink-400/30 text-white placeholder-pink-200/50 focus:outline-none focus:border-pink-400"
                            })
                        }), !L && f.jsx("div", {
                            children: f.jsx("input", {
                                type: "text",
                                placeholder: "昵称（可选）",
                                value: le,
                                onChange: W => Se(W.target.value),
                                onKeyDown: W => W.key === "Enter" && !T && B(),
                                className: "w-full px-4 py-3 rounded-xl bg-white/10 border border-pink-400/30 text-white placeholder-pink-200/50 focus:outline-none focus:border-pink-400"
                            })
                        }), f.jsx("button", {
                            onClick: B,
                            disabled: T || !H || !oe,
                            className: "w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 disabled:opacity-50",
                            children: T ? f.jsx(At, {
                                className: "w-5 h-5 mx-auto animate-spin"
                            }) : L ? "进入游戏" : "创建账号"
                        })]
                    }), f.jsx("div", {
                        className: "mt-6 text-center",
                        children: f.jsx("button", {
                            onClick: () => Y(!L),
                            className: "text-pink-300 hover:text-pink-200 transition-colors",
                            children: L ? "还没有账号？立即注册" : "已有账号？立即登� "
                        })
                    })]
                })
            })
        },
        C = () => {
            var le, Se;
            const [L, Y] = x.useState(""), [H, ee] = x.useState(!1), oe = async () => {
                ee(!0);
                try {
                    const T = await N("/room/create", "POST");
                    s(T.room_code), o("room")
                } catch (T) {
                    c("error", "错误", T.message)
                } finally {
                    ee(!1)
                }
            }, te = async () => {
                if (L.length !== 4) {
                    c("error", "错误", "请输� 4位房间号");
                    return
                }
                ee(!0);
                try {
                    await N(`/room/join/${L}`, "POST"), s(L), o("room")
                } catch (T) {
                    c("error", "错误", T.message)
                } finally {
                    ee(!1)
                }
            };
            return f.jsx("div", {
                className: "min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 p-4",
                children: f.jsxs("div", {
                    className: "max-w-6xl mx-auto",
                    children: [f.jsx("div", {
                        className: "bg-black/40 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-pink-500/30",
                        children: f.jsxs("div", {
                            className: "flex justify-between items-center",
                            children: [f.jsxs("div", {
                                className: "flex items-center space-x-4",
                                children: [f.jsx("div", {
                                    className: "w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center",
                                    children: f.jsx("span", {
                                        className: "text-2xl font-bold text-white",
                                        children: ((Se = (le = e == null ? void 0 : e.nickname) == null ? void 0 : le[0]) == null ? void 0 : Se.toUpperCase()) || "U"
                                    })
                                }), f.jsxs("div", {
                                    children: [f.jsx("h2", {
                                        className: "text-2xl font-bold text-white",
                                        children: e == null ? void 0 : e.nickname
                                    }), f.jsxs("div", {
                                        className: "flex space-x-4 text-pink-200 text-sm mt-1",
                                        children: [f.jsxs("span", {
                                            className: "flex items-center",
                                            children: [f.jsx(hd, {
                                                className: "w-4 h-4 mr-1"
                                            }), "胜场: ", (e == null ? void 0 : e.wins) || 0]
                                        }), f.jsxs("span", {
                                            className: "flex items-center",
                                            children: [f.jsx(pd, {
                                                className: "w-4 h-4 mr-1"
                                            }), "总局: ", (e == null ? void 0 : e.total_games) || 0]
                                        })]
                                    })]
                                })]
                            }), f.jsx("button", {
                                onClick: () => {
                                    localStorage.removeItem("token"), r(null), t(null), o("login")
                                },
                                className: "p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-all",
                                children: f.jsx(us, {
                                    className: "w-5 h-5"
                                })
                            })]
                        })
                    }), f.jsxs("div", {
                        className: "grid grid-cols-2 gap-6",
                        children: [f.jsx("div", {
                            className: "bg-black/40 backdrop-blur-lg rounded-3xl p-8 border border-pink-500/30 hover:border-pink-400/50 transition-all",
                            children: f.jsxs("div", {
                                className: "text-center",
                                children: [f.jsx("div", {
                                    className: "w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center",
                                    children: f.jsx(dd, {
                                        className: "w-10 h-10 text-white"
                                    })
                                }), f.jsx("h3", {
                                    className: "text-2xl font-bold text-white mb-2",
                                    children: "创建房间"
                                }), f.jsx("div", {
                                    className: "h-12 mb-3"
                                }), f.jsx("button", {
                                    onClick: oe,
                                    disabled: H,
                                    className: "w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105",
                                    children: H ? f.jsx(At, {
                                        className: "w-5 h-5 mx-auto animate-spin"
                                    }) : "创建房间"
                                })]
                            })
                        }), f.jsx("div", {
                            className: "bg-black/40 backdrop-blur-lg rounded-3xl p-8 border border-pink-500/30 hover:border-pink-400/50 transition-all",
                            children: f.jsxs("div", {
                                className: "text-center",
                                children: [f.jsx("div", {
                                    className: "w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center",
                                    children: f.jsx(pd, {
                                        className: "w-10 h-10 text-white"
                                    })
                                }), f.jsx("h3", {
                                    className: "text-2xl font-bold text-white mb-2",
                                    children: "加入房间"
                                }), f.jsxs("div", {
                                    className: "space-y-3",
                                    children: [f.jsx("input", {
                                        type: "text",
                                        placeholder: "4位房间号",
                                        value: L,
                                        onChange: T => Y(T.target.value.slice(0, 4)),
                                        className: "w-full px-4 py-3 rounded-xl bg-white/10 border border-pink-400/30 text-white text-center text-xs placeholder-pink-200/50 focus:outline-none focus:border-pink-400",
                                        maxLength: "4"
                                    }), f.jsx("button", {
                                        onClick: te,
                                        disabled: H || L.length !== 4,
                                        className: "w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50",
                                        children: H ? f.jsx(At, {
                                            className: "w-5 h-5 mx-auto animate-spin"
                                        }) : "加入房间"
                                    })]
                                })]
                            })
                        })]
                    }), f.jsxs("div", {
                        className: "mt-6 bg-black/40 backdrop-blur-lg rounded-3xl p-6 border border-pink-500/30",
                        children: [f.jsx("h3", {
                            className: "text-xl font-bold text-white mb-4",
                            children: "游戏规则"
                        }), f.jsxs("div", {
                            className: "space-y-2 text-pink-200",
                            children: [f.jsx("p", {
                                children: "1. 每位玩家匿名写下自己的XP"
                            }), f.jsx("p", {
                                children: "2. 系统随机抽取一个XP公开展示，该玩家成为狼人"
                            }), f.jsx("p", {
                                children: "3. 所有人讨论并投票，猜测这个XP属于� "
                            }), f.jsx("p", {
                                children: "4. 如果狼人没被投出，可以在夜晚击杀一名玩� "
                            }), f.jsx("p", {
                                children: "5. 被击杀的玩家必须公开自己的XP"
                            }), f.jsx("p", {
                                children: "6. 游戏继续直到狼人被投出或只剩狼人获胜"
                            })]
                        })]
                    })]
                })
            })
        },
        g = () => {
            const [L, Y] = x.useState(null), [H, ee] = x.useState([]), [oe, te] = x.useState(!1), [le, Se] = x.useState(!1);
            x.useEffect(() => {
                if (l) {
                    T();
                    const J = setInterval(T, 2e3);
                    return () => clearInterval(J)
                }
            }, [l]);
            const T = async () => {
                var J;
                try {
                    const ce = await N(`/room/info/${l}`);
                    Y(ce.room), ee(ce.members || []);
                    const Me = (J = ce.members) == null ? void 0 : J.find(ht => ht.user_id === e.id);
                    Me && te(Me.is_ready), ce.room.status === "playing" && ce.game_id && (u(ce.game_id), o("game"))
                } catch (ce) {
                    ce.message.includes("房间不存� ") && (c("error", "错误", "房间已不存在"), s(null), o("lobby"))
                }
            }, I = async () => {
                Se(!0);
                try {
                    const J = await N("/room/ready", "PUT", {
                        room_id: L.id
                    });
                    te(J.is_ready), T()
                } catch (J) {
                    c("error", "错误", J.message)
                } finally {
                    Se(!1)
                }
            }, B = async () => {
                Se(!0);
                try {
                    const J = await N("/room/start", "POST", {
                        room_id: L.id
                    });
                    u(J.game_id), o("game")
                } catch (J) {
                    c("error", "错误", J.message)
                } finally {
                    Se(!1)
                }
            }, W = async () => {
                try {
                    await N("/room/leave", "POST", {
                        room_id: L.id
                    }), s(null), o("lobby")
                } catch (J) {
                    c("error", "错误", J.message)
                }
            };
            if (!L) return f.jsx("div", {
                className: "min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center",
                children: f.jsx(At, {
                    className: "w-12 h-12 text-pink-400 animate-spin"
                })
            });
            const Q = L.owner_id === (e == null ? void 0 : e.id),
                ue = Q && H.length >= 4 && H.every(J => J.is_ready);
            return f.jsx("div", {
                className: "min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 p-4",
                children: f.jsxs("div", {
                    className: "max-w-4xl mx-auto",
                    children: [f.jsxs("div", {
                        className: "bg-black/40 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-pink-500/30",
                        children: [f.jsxs("div", {
                            className: "flex justify-between items-center mb-4",
                            children: [f.jsxs("div", {
                                children: [f.jsxs("h2", {
                                    className: "text-3xl font-bold text-white",
                                    children: ["房间� : ", l]
                                }), f.jsx("p", {
                                    className: "text-pink-200 mt-1",
                                    children: Q ? "你是房主" : `房主: ${L.owner_nickname}`
                                })]
                            }), f.jsx("button", {
                                onClick: W,
                                className: "p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-all",
                                children: f.jsx(us, {
                                    className: "w-5 h-5"
                                })
                            })]
                        }), f.jsx("div", {
                            className: "text-center text-pink-200",
                            children: f.jsxs("p", {
                                children: ["等待玩家加入... (", H.length, "/8)"]
                            })
                        })]
                    }), f.jsx("div", {
                        className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6",
                        children: H.map(J => {
                            var ce, Me;
                            return f.jsx("div", {
                                className: `bg-black/40 backdrop-blur-lg rounded-2xl p-4 border ${J.is_ready?"border-green-400/50":"border-pink-500/30"} transition-all`,
                                children: f.jsxs("div", {
                                    className: "text-center",
                                    children: [f.jsx("div", {
                                        className: "w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center",
                                        children: f.jsx("span", {
                                            className: "text-xl font-bold text-white",
                                            children: (Me = (ce = J.nickname) == null ? void 0 : ce[0]) == null ? void 0 : Me.toUpperCase()
                                        })
                                    }), f.jsx("p", {
                                        className: "text-white font-medium",
                                        children: J.nickname
                                    }), f.jsx("div", {
                                        className: "mt-2",
                                        children: J.is_ready ? f.jsxs("span", {
                                            className: "text-green-400 text-sm flex items-center justify-center",
                                            children: [f.jsx(co, {
                                                className: "w-4 h-4 mr-1"
                                            }), "准备好了"]
                                        }) : f.jsx("span", {
                                            className: "text-pink-300 text-sm",
                                            children: "等待� ..."
                                        })
                                    }), J.user_id === L.owner_id && f.jsx(dd, {
                                        className: "w-5 h-5 mx-auto mt-2 text-yellow-400"
                                    })]
                                })
                            }, J.user_id)
                        })
                    }), f.jsx("div", {
                        className: "bg-black/40 backdrop-blur-lg rounded-3xl p-6 border border-pink-500/30",
                        children: f.jsxs("div", {
                            className: "space-y-4",
                            children: ["              ", !Q && f.jsx("button", {
                                onClick: I,
                                disabled: le,
                                className: `w-full py-3 rounded-xl font-bold transition-all transform hover:scale-105 ${oe?"bg-green-500/30 hover:bg-green-500/40 text-green-300":"bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"}`,
                                children: le ? f.jsx(At, {
                                    className: "w-5 h-5 mx-auto animate-spin"
                                }) : oe ? "取消准备" : "准备"
                            }), Q && f.jsx("button", {
                                onClick: B,
                                disabled: !ue || le,
                                className: "w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 disabled:opacity-50",
                                children: le ? f.jsx(At, {
                                    className: "w-5 h-5 mx-auto animate-spin"
                                }) : "开始游� "
                            }), !ue && Q && f.jsx("p", {
                                className: "text-center text-pink-200 text-sm",
                                children: H.length < 4 ? `需要至� 4名玩�  (当前${H.length}� )` : "等待所有玩家准� "
                            })]
                        })
                    })]
                })
            })
        },
        R = () => {
            var Dt;
            const [L, Y] = x.useState(null), [H, ee] = x.useState(""), [oe, te] = x.useState(!1), [le, Se] = x.useState(null), [T, I] = x.useState(!1), [B, W] = x.useState(null), [Q, ue] = x.useState(!1), [J, ce] = x.useState(!1), [Me, ht] = x.useState({}), [Ai, Le] = x.useState(null);
            x.useEffect(() => {
                if (a) {
                    St();
                    const A = Do(n1);
                    A.emit("join_game", {
                        game_id: a
                    }), A.on("game_terminated", q => {
                        c("info", "游戏终止", q.message), o("lobby"), u(null)
                    }), A.on("game_over", q => {
                        St().then(Ce => {
                            var ze;
                            if (Ce) {
                                const Fe = (ze = Ce.players) == null ? void 0 : ze.find(Or => Or.user_id === (e == null ? void 0 : e.id));
                                w({
                                    winner: q.winner,
                                    playerRole: Fe != null && Fe.is_wolf ? "wolf" : "villager",
                                    isWolf: !!(Fe != null && Fe.is_wolf)
                                })
                            }
                        })
                    }), A.on("vote_tie", q => {
                        Le(q.message), c("info", "投票平局", q.message), setTimeout(() => Le(null), 3e3)
                    }), A.on("player_eliminated", q => {
                        q.xp_content && q.eliminated_player && E({
                            nickname: q.eliminated_player,
                            xp: q.xp_content
                        }), setTimeout(() => {
                            St()
                        }, 3e3)
                    }), A.on("new_round", q => {
                        q.killed_nickname && q.killed_xp && E({
                            nickname: q.killed_nickname,
                            xp: q.killed_xp
                        }), I(!1), Se(null), ht({}), Le(null), c("info", "新回合开� ", "")
                    });
                    const ae = setInterval(St, 1500);
                    return () => {
                        clearInterval(ae), A.disconnect()
                    }
                }
            }, [a]);
            const St = async () => {
                var A;
                if (a) try {
                    const ae = await N(`/game/state?game_id=${a}`);
                    Y(ae);
                    const q = (A = ae.players) == null ? void 0 : A.find(Ce => Ce.user_id === (e == null ? void 0 : e.id));
                    if (q && q.xp_content && te(!0), ae.game.status === "finished" && (ae.game.winner ? w({
                            winner: ae.game.winner,
                            playerRole: q != null && q.is_wolf ? "wolf" : "villager",
                            isWolf: !!(q != null && q.is_wolf)
                        }) : (c("info", "游戏已结� ", "游戏因异常原因终� "), o("lobby"), u(null), s(null))), ae.votes && ae.votes.length > 0) {
                        const Ce = {};
                        ae.votes.forEach(Fe => {
                            Ce[Fe.target_id] = (Ce[Fe.target_id] || 0) + 1
                        }), ht(Ce);
                        const ze = ae.votes.find(Fe => Fe.voter_id === (e == null ? void 0 : e.id));
                        I(!!ze)
                    } else ht({}), I(!1);
                    return ae
                } catch {
                    c("error", "错误", "加载游戏状态失� ")
                }
            }, zi = async () => {
                if (!H.trim()) {
                    c("error", "错误", "请输入你的XP");
                    return
                }
                ue(!0);
                try {
                    await N("/game/submit-xp", "POST", {
                        game_id: a,
                        xp_content: H
                    }), te(!0), ee("")
                } catch (A) {
                    c("error", "错误", A.message)
                } finally {
                    ue(!1)
                }
            }, Pl = async () => {
                if (!le) {
                    c("error", "错误", "请选择投票目标");
                    return
                }
                ue(!0);
                try {
                    await N("/game/vote", "POST", {
                        game_id: a,
                        target_id: le
                    }), I(!0)
                } catch (A) {
                    c("error", "错误", A.message)
                } finally {
                    ue(!1)
                }
            }, Wt = async () => {
                if (!B) {
                    c("error", "错误", "请选择击杀目标");
                    return
                }
                ue(!0);
                try {
                    await N("/game/kill", "POST", {
                        game_id: a,
                        target_id: B
                    }), W(null)
                } catch (A) {
                    c("error", "错误", A.message)
                } finally {
                    ue(!1)
                }
            }, Ll = async () => {
                ce(!0);
                try {
                    (await N("/game/exit", "POST", {
                        game_id: a
                    })).game_terminated ? c("info", "游戏已终� ", "") : c("success", "已退� ", "你已退出游� "), o("lobby"), u(null)
                } catch (A) {
                    c("error", "错误", A.message)
                } finally {
                    ce(!1)
                }
            };
            if (!L || !L.game) return f.jsx("div", {
                className: "min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center",
                children: f.jsx(At, {
                    className: "w-12 h-12 text-pink-400 animate-spin"
                })
            });
            const {
                game: et,
                players: Ye,
                my_role: Fi
            } = L, jn = (Ye == null ? void 0 : Ye.filter(A => A.is_alive)) || [], Te = Ye == null ? void 0 : Ye.find(A => A.user_id === (e == null ? void 0 : e.id)), Tl = Te && Te.is_alive;
            return f.jsx("div", {
                className: "min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 p-4",
                children: f.jsxs("div", {
                    className: "max-w-4xl mx-auto",
                    children: [f.jsx("div", {
                        className: "bg-black/40 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-pink-500/30",
                        children: f.jsxs("div", {
                            className: "flex justify-between items-start mb-4",
                            children: [f.jsxs("div", {
                                className: "flex-1",
                                children: [f.jsxs("h2", {
                                    className: "text-3xl font-bold text-white mb-2",
                                    children: [et.status === "submitting_xp" && "提交你的XP", et.status === "voting" && "讨论并投� ", et.status === "night" && "夜晚降临", et.status === "finished" && "游戏结束"]
                                }), f.jsxs("p", {
                                    className: "text-pink-200 text-sm",
                                    children: ["�  ", et.current_round || 1, " 回合 | 状� : ", et.status, " | 存活玩家: ", jn.length, "� "]
                                }), Fi === "wolf" && et.status !== "submitting_xp" && f.jsxs("div", {
                                    className: "inline-flex items-center bg-red-500/20 px-4 py-2 rounded-full mt-2",
                                    children: [f.jsx(lv, {
                                        className: "w-5 h-5 mr-2 text-red-400"
                                    }), f.jsx("span", {
                                        className: "text-red-300 font-medium",
                                        children: "你是狼人！小心不要暴露身� "
                                    })]
                                }), et.public_xp && f.jsxs("div", {
                                    className: "mt-4 p-4 bg-purple-500/20 rounded-xl border border-purple-400/30",
                                    children: [f.jsx("p", {
                                        className: "text-purple-200 text-sm mb-2",
                                        children: "公开的XP� "
                                    }), f.jsx("p", {
                                        className: "text-white text-lg font-medium",
                                        children: et.public_xp
                                    }), f.jsx("p", {
                                        className: "text-purple-200 text-xs mt-2",
                                        children: "这个XP属于谁？大家开始推理吧� "
                                    })]
                                })]
                            }), Tl && f.jsx("button", {
                                onClick: () => {
                                    const A = (Ye == null ? void 0 : Ye.length) || 0;
                                    c("warning", "确认退出游� ", A >= 5 ? "确定要退出当前游戏吗？游戏将继续进行� " : "当前游戏人数较少，退出后游戏将自动终歀��确定要退出吗� ", Ll, "确认退� ")
                                },
                                className: "ml-4 p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-all",
                                title: "退出游� ",
                                children: f.jsx(us, {
                                    className: "w-5 h-5"
                                })
                            })]
                        })
                    }), et.status === "submitting_xp" && f.jsxs("div", {
                        className: "bg-black/40 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-pink-500/30",
                        children: [f.jsx("h3", {
                            className: "text-xl font-bold text-white mb-4",
                            children: oe ? "等待其他玩家提交" : "写下你的XP"
                        }), oe ? f.jsxs("div", {
                            className: "text-center py-8",
                            children: [f.jsx(co, {
                                className: "w-12 h-12 text-green-400 mx-auto mb-4"
                            }), f.jsx("p", {
                                className: "text-white text-lg mb-2",
                                children: "你已提交XP"
                            }), f.jsx("p", {
                                className: "text-pink-200",
                                children: "等待其他玩家提交� ..."
                            })]
                        }) : f.jsxs(f.Fragment, {
                            children: [f.jsx("p", {
                                className: "text-pink-200 text-sm mb-3",
                                children: "在这里写下你的XP🫣~"
                            }), f.jsx("textarea", {
                                value: H,
                                onChange: A => ee(A.target.value),
                                placeholder: "在这里写下你的XP...",
                                className: "w-full h-32 px-4 py-3 rounded-xl bg-white/10 border border-pink-400/30 text-white placeholder-pink-200/50 focus:outline-none focus:border-pink-400 resize-none"
                            }), f.jsx("button", {
                                onClick: zi,
                                disabled: Q || !H.trim(),
                                className: "w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 disabled:opacity-50",
                                children: Q ? f.jsx(At, {
                                    className: "w-5 h-5 mx-auto animate-spin"
                                }) : "提交XP"
                            })]
                        })]
                    }), et.status === "voting" && f.jsxs("div", {
                        className: "bg-black/40 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-pink-500/30",
                        children: [f.jsxs("div", {
                            className: "mb-4",
                            children: [f.jsx("h3", {
                                className: "text-xl font-bold text-white mb-2",
                                children: Te && !Te.is_alive ? "观战模式 - 等待其他玩家投票" : T ? "等待其他玩家投票" : "讨论并投� "
                            }), Te && Te.is_alive && !T && f.jsx("p", {
                                className: "text-pink-200 text-sm",
                                children: "💭 先和大家讨论，分析谁是狼人，然后投出你的一� "
                            }), Te && !Te.is_alive && f.jsx("div", {
                                className: "p-3 bg-gray-500/20 rounded-xl border border-gray-400/30 mb-3",
                                children: f.jsxs("p", {
                                    className: "text-gray-300 text-sm flex items-center",
                                    children: [f.jsx(Qr, {
                                        className: "w-4 h-4 mr-2"
                                    }), "你已被淘汰，正在观战模式"]
                                })
                            }), Ai && f.jsx("div", {
                                className: "mt-3 p-3 bg-yellow-500/20 rounded-xl border border-yellow-400/30",
                                children: f.jsxs("p", {
                                    className: "text-yellow-200 text-sm flex items-center",
                                    children: [f.jsx("span", {
                                        className: "mr-2",
                                        children: "⚖️"
                                    }), Ai]
                                })
                            })]
                        }), Te && Te.is_alive && !T ? f.jsxs(f.Fragment, {
                            children: [f.jsxs("div", {
                                className: "bg-white/5 rounded-xl p-4 mb-4",
                                children: [f.jsx("p", {
                                    className: "text-pink-300 text-sm mb-3",
                                    children: "选择你认为是狼人的玩家："
                                }), f.jsx("div", {
                                    className: "grid grid-cols-2 md:grid-cols-3 gap-3",
                                    children: jn.map(A => {
                                        var ze, Fe;
                                        const ae = le === A.user_id,
                                            q = A.user_id === (e == null ? void 0 : e.id),
                                            Ce = Me[A.user_id] || 0;
                                        return f.jsxs("button", {
                                            onClick: () => !q && Se(A.user_id),
                                            disabled: q,
                                            className: `relative p-4 rounded-xl border-2 transition-all ${ae?"bg-red-500/30 border-red-400 shadow-lg shadow-red-500/30":q?"bg-gray-500/20 border-gray-500/30 opacity-50 cursor-not-allowed":"bg-white/10 border-pink-400/30 hover:bg-white/20 hover:border-pink-400"}`,
                                            children: [ae && f.jsx("div", {
                                                className: "absolute -top-2 -left-2 bg-red-500 rounded-full p-1",
                                                children: f.jsx(co, {
                                                    className: "w-4 h-4 text-white"
                                                })
                                            }), Ce > 0 && f.jsx("div", {
                                                className: "absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold",
                                                children: Ce
                                            }), f.jsxs("div", {
                                                className: "flex flex-col items-center",
                                                children: [f.jsx("div", {
                                                    className: `w-12 h-12 rounded-full flex items-center justify-center mb-2 ${ae?"bg-red-500":q?"bg-gray-500":"bg-gradient-to-r from-pink-400 to-purple-400"}`,
                                                    children: f.jsx("span", {
                                                        className: "text-white font-bold text-lg",
                                                        children: (Fe = (ze = A.nickname) == null ? void 0 : ze[0]) == null ? void 0 : Fe.toUpperCase()
                                                    })
                                                }), f.jsx("p", {
                                                    className: "text-white font-medium text-sm",
                                                    children: A.nickname
                                                }), q && f.jsx("p", {
                                                    className: "text-gray-400 text-xs mt-1",
                                                    children: "（自己）"
                                                }), ae && f.jsx("p", {
                                                    className: "text-red-300 text-xs mt-1",
                                                    children: "已选择"
                                                })]
                                            })]
                                        }, A.user_id)
                                    })
                                })]
                            }), le && f.jsx("div", {
                                className: "bg-red-500/10 border border-red-400/30 rounded-lg p-3 mb-4",
                                children: f.jsxs("p", {
                                    className: "text-red-300 text-sm text-center",
                                    children: ["你选择�  ", f.jsx("span", {
                                        className: "font-bold text-white",
                                        children: (Dt = jn.find(A => A.user_id === le)) == null ? void 0 : Dt.nickname
                                    }), " 作为狼人"]
                                })
                            }), f.jsx("button", {
                                onClick: Pl,
                                disabled: Q || !le,
                                className: "w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold hover:from-red-600 hover:to-orange-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed",
                                children: Q ? f.jsx(At, {
                                    className: "w-5 h-5 mx-auto animate-spin"
                                }) : le ? "确认投票" : "请先选择一名玩� "
                            })]
                        }) : Te && Te.is_alive && T ? f.jsxs("div", {
                            className: "text-center py-6",
                            children: [f.jsx(sv, {
                                className: "w-16 h-16 text-green-400 mx-auto mb-4"
                            }), f.jsx("p", {
                                className: "text-white text-lg mb-2",
                                children: "�  你已完成投票"
                            }), f.jsx("p", {
                                className: "text-pink-200 mb-6",
                                children: "等待其他玩家投票� ..."
                            })]
                        }) : Te && !Te.is_alive ? f.jsx("div", {
                            className: "text-center py-6",
                            children: f.jsxs("div", {
                                className: "bg-gray-500/10 rounded-xl p-6",
                                children: [f.jsx(Qr, {
                                    className: "w-16 h-16 text-gray-400 mx-auto mb-4"
                                }), f.jsx("p", {
                                    className: "text-gray-300 text-lg mb-2",
                                    children: "你已被淘� "
                                }), f.jsx("p", {
                                    className: "text-gray-400 mb-4",
                                    children: Te.death_reason === "voted" ? "被投票出局" : Te.death_reason === "killed" ? "被狼人击杀" : Te.death_reason === "exited" ? "退出游� " : ""
                                }), f.jsxs("div", {
                                    className: "mt-6 text-left",
                                    children: [f.jsx("p", {
                                        className: "text-gray-300 text-sm mb-3",
                                        children: "当前投票情况� "
                                    }), f.jsx("div", {
                                        className: "space-y-2",
                                        children: jn.map(A => {
                                            const ae = Me[A.user_id] || 0;
                                            return ae > 0 ? f.jsxs("div", {
                                                className: "flex justify-between items-center bg-gray-500/10 rounded-lg px-3 py-2",
                                                children: [f.jsx("span", {
                                                    className: "text-gray-300 text-sm",
                                                    children: A.nickname
                                                }), f.jsxs("span", {
                                                    className: "text-orange-400 text-sm font-medium",
                                                    children: [ae, " � "]
                                                })]
                                            }, A.user_id) : null
                                        })
                                    })]
                                })]
                            })
                        }) : null]
                    }), et.status === "night" && Fi === "wolf" && f.jsxs("div", {
                        className: "bg-black/40 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-red-500/30",
                        children: [f.jsx("h3", {
                            className: "text-xl font-bold text-white mb-4",
                            children: "选择击杀目标"
                        }), f.jsx("div", {
                            className: "grid grid-cols-2 md:grid-cols-3 gap-4 mb-4",
                            children: jn.filter(A => A.user_id !== (e == null ? void 0 : e.id)).map(A => f.jsxs("button", {
                                onClick: () => W(A.user_id),
                                className: `p-4 rounded-xl border transition-all ${B===A.user_id?"bg-red-500/30 border-red-400":"bg-white/10 border-red-400/30 hover:bg-white/20"}`,
                                children: [f.jsx(Qr, {
                                    className: "w-6 h-6 mx-auto mb-2 text-red-400"
                                }), f.jsx("p", {
                                    className: "text-white font-medium",
                                    children: A.nickname
                                })]
                            }, A.user_id))
                        }), f.jsx("button", {
                            onClick: Wt,
                            disabled: Q || !B,
                            className: "w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-800 text-white font-bold hover:from-red-700 hover:to-red-900 transition-all transform hover:scale-105 disabled:opacity-50",
                            children: Q ? f.jsx(At, {
                                className: "w-5 h-5 mx-auto animate-spin"
                            }) : "击杀"
                        })]
                    }), f.jsxs("div", {
                        className: "bg-black/40 backdrop-blur-lg rounded-3xl p-6 border border-pink-500/30",
                        children: [f.jsx("h3", {
                            className: "text-xl font-bold text-white mb-4",
                            children: "游戏记录"
                        }), f.jsxs("div", {
                            className: "space-y-3",
                            children: ["              ", Ye == null ? void 0 : Ye.map(A => {
                                var ae, q;
                                return f.jsxs("div", {
                                    className: `flex items-center justify-between p-3 rounded-xl ${A.is_alive?"bg-white/10":"bg-red-500/10"}`,
                                    children: [f.jsxs("div", {
                                        className: "flex items-center space-x-3",
                                        children: [f.jsx("div", {
                                            className: `w-10 h-10 rounded-full flex items-center justify-center ${A.is_alive?"bg-gradient-to-r from-pink-400 to-purple-400":"bg-gray-500"}`,
                                            children: f.jsx("span", {
                                                className: "text-white font-bold",
                                                children: (q = (ae = A.nickname) == null ? void 0 : ae[0]) == null ? void 0 : q.toUpperCase()
                                            })
                                        }), f.jsxs("div", {
                                            children: [f.jsx("p", {
                                                className: "text-white font-medium",
                                                children: A.nickname
                                            }), !A.is_alive && A.xp_content && f.jsxs("p", {
                                                className: "text-pink-200 text-sm mt-1",
                                                children: ["XP: ", A.xp_content]
                                            })]
                                        })]
                                    }), f.jsx("div", {
                                        children: !A.is_alive && f.jsx("span", {
                                            className: "text-red-400 text-sm",
                                            children: A.death_reason === "voted" ? "被投票出局" : A.death_reason === "killed" ? "被击杀" : "已退� "
                                        })
                                    })]
                                }, A.user_id)
                            })]
                        })]
                    })]
                })
            })
        },
        D = () => {
            if (!h) return null;
            const {
                type: L,
                title: Y,
                message: H,
                onConfirm: ee,
                buttonText: oe = "确定"
            } = h, te = () => {
                switch (L) {
                    case "success":
                        return f.jsx(co, {
                            className: "w-12 h-12 text-green-400 mx-auto mb-4"
                        });
                    case "error":
                        return f.jsx(Qr, {
                            className: "w-12 h-12 text-red-400 mx-auto mb-4"
                        });
                    default:
                        return f.jsx(fd, {
                            className: "w-12 h-12 text-pink-400 mx-auto mb-4"
                        })
                }
            };
            return f.jsx("div", {
                className: "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50",
                onClick: d,
                children: f.jsx("div", {
                    className: "bg-black/60 backdrop-blur-lg rounded-3xl p-8 max-w-md mx-4 border border-pink-500/30",
                    onClick: le => le.stopPropagation(),
                    children: f.jsxs("div", {
                        className: "text-center",
                        children: [te(), f.jsx("h3", {
                            className: "text-xl font-bold text-white mb-2",
                            children: Y
                        }), f.jsx("p", {
                            className: "text-pink-200 mb-6",
                            children: H
                        }), f.jsx("div", {
                            className: "flex space-x-4",
                            children: ee ? f.jsxs(f.Fragment, {
                                children: [f.jsx("button", {
                                    onClick: d,
                                    className: "flex-1 py-3 rounded-xl bg-gray-500/20 hover:bg-gray-500/30 text-gray-300 transition-all",
                                    children: "取消"
                                }), f.jsx("button", {
                                    onClick: () => {
                                        d(), ee()
                                    },
                                    className: "flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold hover:from-pink-600 hover:to-purple-600 transition-all",
                                    children: oe
                                })]
                            }) : f.jsx("button", {
                                onClick: d,
                                className: "w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold hover:from-pink-600 hover:to-purple-600 transition-all",
                                children: oe
                            })
                        })]
                    })
                })
            })
        },
        j = () => S ? f.jsx("div", {
            className: "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50",
            onClick: () => E(null),
            children: f.jsx("div", {
                className: "bg-black/80 backdrop-blur-lg rounded-3xl p-10 max-w-2xl mx-4 border-2 border-pink-500/50 shadow-2xl animate-bounce-in",
                onClick: L => L.stopPropagation(),
                children: f.jsxs("div", {
                    className: "text-center",
                    children: [f.jsx("h2", {
                        className: "text-3xl font-bold text-white mb-6",
                        children: "你能想到吗？"
                    }), f.jsxs("p", {
                        className: "text-2xl text-pink-300 mb-4",
                        children: [S.nickname, " 竟然喜欢� "]
                    }), f.jsx("div", {
                        className: "py-8 px-6 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl border border-pink-400/30",
                        children: f.jsx("p", {
                            className: "text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 leading-relaxed",
                            children: S.xp
                        })
                    }), f.jsx("button", {
                        onClick: () => E(null),
                        className: "mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105",
                        children: "继续游戏"
                    })]
                })
            })
        }) : null,
        V = () => {
            if (!p) return null;
            const {
                winner: L,
                playerRole: Y,
                isWolf: H
            } = p, ee = L === "wolf" && H || L === "villagers" && !H;
            return f.jsx("div", {
                className: "min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center p-4",
                children: f.jsxs("div", {
                    className: "bg-black/40 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full border border-pink-500/30 text-center",
                    children: [f.jsx("div", {
                        className: "mb-6",
                        children: ee ? f.jsxs(f.Fragment, {
                            children: [f.jsx(hd, {
                                className: "w-24 h-24 text-yellow-400 mx-auto mb-4 animate-bounce"
                            }), f.jsx("h2", {
                                className: "text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400",
                                children: "胜利� "
                            })]
                        }) : f.jsxs(f.Fragment, {
                            children: [f.jsx(Qr, {
                                className: "w-24 h-24 text-red-400 mx-auto mb-4 animate-pulse"
                            }), f.jsx("h2", {
                                className: "text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400",
                                children: "失败"
                            })]
                        })
                    }), f.jsxs("div", {
                        className: "space-y-4 mb-8",
                        children: [f.jsxs("p", {
                            className: "text-white text-lg",
                            children: [L === "wolf" ? "狼人阵营" : "村民阵营", " 获胜� "]
                        }), f.jsxs("p", {
                            className: "text-pink-200",
                            children: ["你的身份� ", H ? "狼人" : "村民"]
                        }), f.jsx("p", {
                            className: "text-pink-200",
                            children: ee ? "恭喜！你成功达成了目标！" : "不要气馁，下次再接再厉！"
                        })]
                    }), f.jsx("button", {
                        onClick: () => {
                            w(null), o("lobby"), u(null), s(null)
                        },
                        className: "w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105",
                        children: "返回大厅"
                    })]
                })
            })
        };
    return f.jsxs(f.Fragment, {
        children: [f.jsx(D, {}), f.jsx(V, {}), f.jsx(j, {}), !h && !p && f.jsxs(f.Fragment, {
            children: [i === "login" && f.jsx(y, {}), i === "lobby" && f.jsx(C, {}), i === "room" && f.jsx(g, {}), i === "game" && f.jsx(R, {})]
        })]
    })
}
const i1 = hr.lazy(() => Jh(() => import("./App-B-0DVxRl.js"), [])),
    o1 = hr.lazy(() => Jh(() => import("./notifications-CM6CxdBZ.js"), [])),
    l1 = [{
        caseSensitive: !1,
        path: "App",
        element: hr.createElement(i1)
    }, {
        caseSensitive: !1,
        path: "/",
        element: hr.createElement(r1)
    }, {
        caseSensitive: !1,
        path: "notifications",
        element: hr.createElement(o1)
    }];

function s1({
    children: e
}) {
    return f.jsx(f.Fragment, {
        children: e
    })
}
const a1 = $g(l1.map(e => ({
    ...e,
    element: f.jsx(s1, {
        children: e.element
    })
})), {
    future: {
        v7_relativeSplatPath: !0,
        v7_fetcherPersist: !0,
        v7_normalizeFormMethod: !0,
        v7_partialHydration: !0,
        v7_skipActionErrorRevalidation: !0
    }
});
hs.createRoot(document.getElementById("root")).render(f.jsx(hr.StrictMode, {
    children: f.jsx(ev, {
        router: a1
    })
}));
export {
    dd as C, fd as H, At as L, lv as M, Qr as S, hd as T, pd as U, sv as V, us as a, co as b, Ht as c, f as j, Do as l, x as r
};