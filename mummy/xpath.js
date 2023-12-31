"use strict";
(function() {
    "use strict";

    function e(e) {
        var t = Array.prototype.slice,
            r = e.length,
            o = function(e, r) {
                return function() {
                    return r.apply(this, e.concat(t.call(arguments)))
                }
            },
            n = function() {
                var s = t.call(arguments);
                return s.length < r ? o(s, n) : e.apply(this, t.apply(arguments, [0, r]))
            };
        return n
    }

    function t() {
        if (0 === arguments.length) throw new Error("compose requires at least one argument");
        var e = Array.prototype.slice.call(arguments).reverse(),
            t = e[0],
            r = e.slice(1);
        return function() {
            return ee(function(e, t) {
                return t(e)
            }, t.apply(null, arguments), r)
        }
    }

    function r(e) {
        return function() {
            return e
        }
    }

    function o(e) {
        return e.toString()
    }

    function n(e) {
        for (var t, r = Object(e), o = 1; o < arguments.length; o++)
            if (t = arguments[o], null != t)
                for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (r[n] = t[n]);
        return r
    }

    function p() {
        this.init()
    }

    function u(t) {
        this.expression = t
    }

    function s(e, t, r) {
        t in e || (e[t] = r)
    }

    function a() {}

    function i(e) {
        0 < arguments.length && this.init(e)
    }

    function l(e) {
        0 < arguments.length && this.init(e)
    }

    function c(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function d(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function h(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function g(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function N(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function y(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function E(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function A(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function m(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function T(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function f(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function S(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function R(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function b(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function O(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function I(e, t, r) {
        0 < arguments.length && this.init(e, t, r)
    }

    function x(e) {
        for (; e && e.parentNode;) e = e.parentNode;
        return e
    }

    function D(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function v(e, t, r) {
        0 < arguments.length && this.init(e, t, r)
    }

    function L(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function P(e) {
        0 < arguments.length && this.init(e)
    }

    function C(e, t) {
        0 < arguments.length && this.init(e, t)
    }

    function _(e) {
        0 < arguments.length && this.init(e)
    }

    function F(e) {
        0 < arguments.length && this.init(e)
    }

    function U(e) {
        for (var t = e.split("e-"), r = t[0].replace(".", ""), o = +t[1], n = 0; n < o - 1; n += 1) r = "0" + r;
        return "0." + r
    }

    function V(e) {
        for (var t = e.split("e"), r = t[0].replace(".", ""), o = +t[1], n = o + 1 - r.length, s = 0; s < n; s += 1) r += "0";
        return r
    }

    function B(e) {
        0 < arguments.length && this.init(e)
    }

    function M(e) {
        this.init(e)
    }

    function H(e, t) {
        if (e === t) return 0;
        if (e.compareDocumentPosition) {
            var r = e.compareDocumentPosition(t);
            return 1 & r ? 1 : 10 & r ? 1 : 20 & r ? -1 : 0
        }
        for (var o = 0, s = 0, a = e; null != a; a = a.parentNode || a.ownerElement) o++;
        for (var p = t; null != p; p = p.parentNode || p.ownerElement) s++;
        if (o > s) {
            for (; o > s;) e = e.parentNode || e.ownerElement, o--;
            if (e === t) return 1
        } else if (s > o) {
            for (; s > o;) t = t.parentNode || t.ownerElement, s--;
            if (e === t) return -1
        }
        for (var u = e.parentNode || e.ownerElement, l = t.parentNode || t.ownerElement; u !== l;) e = u, t = l, u = e.parentNode || e.ownerElement, l = t.parentNode || t.ownerElement;
        var c = ue.isAttribute(e),
            d = ue.isAttribute(t);
        if (c && !d) return -1;
        if (!c && d) return 1;
        if (u)
            for (var h, n = c ? u.attributes : u.childNodes, g = n.length, N = 0; N < g; N += 1) {
                if (h = n[N], h === e) return -1;
                if (h === t) return 1
            }
        throw new Error("Unexpected: could not determine node order")
    }

    function G() {
        this.init()
    }

    function W(e, t, r) {
        this.isXPathNamespace = !0, this.ownerDocument = r.ownerDocument, this.nodeName = "#namespace", this.prefix = e, this.localName = e, this.namespaceURI = t, this.nodeValue = t, this.ownerElement = r, this.nodeType = W.XPATH_NAMESPACE_NODE
    }

    function Y(e, t, r) {
        this.variableResolver = null == e ? new q : e, this.namespaceResolver = null == t ? new Q : t, this.functionResolver = null == r ? new w : r
    }

    function q() {}

    function w(e) {
        this.thisArg = null == e ? ie : e, this.functions = {}, this.addStandardFunctions()
    }

    function Q() {}

    function J(t, e, r) {
        this.xpath = r.parse(t), this.context = new Y, this.context.namespaceResolver = new X(e)
    }

    function X(e) {
        this.xpathNSResolver = e
    }

    function K(e) {
        this.node = e, this.namespaceResolver = new Q
    }

    function $(e, r) {
        switch (r == $.ANY_TYPE && (e.constructor === _ ? r = $.STRING_TYPE : e.constructor === F ? r = $.NUMBER_TYPE : e.constructor === B ? r = $.BOOLEAN_TYPE : e.constructor === G && (r = $.UNORDERED_NODE_ITERATOR_TYPE)), this.resultType = r, r) {
            case $.NUMBER_TYPE:
                return void(this.numberValue = e.numberValue());
            case $.STRING_TYPE:
                return void(this.stringValue = e.stringValue());
            case $.BOOLEAN_TYPE:
                return void(this.booleanValue = e.booleanValue());
            case $.ANY_UNORDERED_NODE_TYPE:
            case $.FIRST_ORDERED_NODE_TYPE:
                if (e.constructor === G) return void(this.singleNodeValue = e.first());
                break;
            case $.UNORDERED_NODE_ITERATOR_TYPE:
            case $.ORDERED_NODE_ITERATOR_TYPE:
                if (e.constructor === G) return this.invalidIteratorState = !1, this.nodes = e.toArray(), void(this.iteratorIndex = 0);
                break;
            case $.UNORDERED_NODE_SNAPSHOT_TYPE:
            case $.ORDERED_NODE_SNAPSHOT_TYPE:
                if (e.constructor === G) return this.nodes = e.toArray(), void(this.snapshotLength = this.nodes.length);
        }
        throw new le(le.TYPE_ERR)
    }

    function k(o, n) {
        o.createExpression = function(t, e) {
            try {
                return new J(t, e, n)
            } catch (t) {
                throw new le(le.INVALID_EXPRESSION_ERR, t)
            }
        }, o.createNSResolver = function(e) {
            return new K(e)
        }, o.evaluate = function(s, e, a, r, t) {
            if (0 > r || 9 < r) throw {
                code: 0,
                toString: function() {
                    return "Request type not supported"
                }
            };
            return o.createExpression(s, a, n).evaluate(e, r, t)
        }
    }
    var Z = Math.round,
        j = self["xmlDomLib"],
        z = e(function(e, t) {
            for (var r = 0; r < t.length; r += 1) e(t[r], r, t)
        }),
        ee = e(function(e, t, r) {
            var o = t;
            return z(function(t, r) {
                o = e(o, t, r)
            }, r), o
        }),
        te = e(function(e, t) {
            var r = Array(t.length);
            return z(function(t, o) {
                r[o] = e(t)
            }, t), r
        }),
        re = e(function(e, t) {
            var r = [];
            return z(function(t, o) {
                e(t, o) && r.push(t)
            }, t), r
        }),
        oe = e(function(e, t) {
            for (var r = 0; r < e.length; r += 1)
                if (e[r] === t) return !0;
            return !1
        }),
        ne = e(function(e, t) {
            return t[e]
        }),
        se = e(function(e, t) {
            return t.join(e)
        }),
        ae = e(function(e, t, r) {
            return e + r + t
        });
    p.prototype = {}, p.prototype.constructor = p, p.superclass = Object.prototype, p.prototype.init = function() {
        this.reduceActions = [], this.reduceActions[3] = function(e) {
            return new d(e[0], e[2])
        }, this.reduceActions[5] = function(e) {
            return new h(e[0], e[2])
        }, this.reduceActions[7] = function(e) {
            return new g(e[0], e[2])
        }, this.reduceActions[8] = function(e) {
            return new N(e[0], e[2])
        }, this.reduceActions[10] = function(e) {
            return new y(e[0], e[2])
        }, this.reduceActions[11] = function(e) {
            return new E(e[0], e[2])
        }, this.reduceActions[12] = function(e) {
            return new A(e[0], e[2])
        }, this.reduceActions[13] = function(e) {
            return new m(e[0], e[2])
        }, this.reduceActions[15] = function(e) {
            return new T(e[0], e[2])
        }, this.reduceActions[16] = function(e) {
            return new f(e[0], e[2])
        }, this.reduceActions[18] = function(e) {
            return new S(e[0], e[2])
        }, this.reduceActions[19] = function(e) {
            return new R(e[0], e[2])
        }, this.reduceActions[20] = function(e) {
            return new b(e[0], e[2])
        }, this.reduceActions[22] = function(e) {
            return new l(e[1])
        }, this.reduceActions[24] = function(e) {
            return new O(e[0], e[2])
        }, this.reduceActions[25] = function(e) {
            return new I(void 0, void 0, e[0])
        }, this.reduceActions[27] = function(e) {
            return e[0].locationPath = e[2], e[0]
        }, this.reduceActions[28] = function(e) {
            return e[0].locationPath = e[2], e[0].locationPath.steps.unshift(new v(v.DESCENDANTORSELF, L.nodeTest, [])), e[0]
        }, this.reduceActions[29] = function(e) {
            return new I(e[0], [], void 0)
        }, this.reduceActions[30] = function(e) {
            return ue.instance_of(e[0], I) ? (null == e[0].filterPredicates && (e[0].filterPredicates = []), e[0].filterPredicates.push(e[1]), e[0]) : new I(e[0], [e[1]], void 0)
        }, this.reduceActions[32] = function(e) {
            return e[1]
        }, this.reduceActions[33] = function(e) {
            return new _(e[0])
        }, this.reduceActions[34] = function(e) {
            return new F(e[0])
        }, this.reduceActions[36] = function(e) {
            return new C(e[0], [])
        }, this.reduceActions[37] = function(e) {
            return new C(e[0], e[2])
        }, this.reduceActions[38] = function(e) {
            return [e[0]]
        }, this.reduceActions[39] = function(e) {
            return e[2].unshift(e[0]), e[2]
        }, this.reduceActions[43] = function() {
            return new D(!0, [])
        }, this.reduceActions[44] = function(e) {
            return e[1].absolute = !0, e[1]
        }, this.reduceActions[46] = function(e) {
            return new D(!1, [e[0]])
        }, this.reduceActions[47] = function(e) {
            return e[0].steps.push(e[2]), e[0]
        }, this.reduceActions[49] = function(e) {
            return new v(e[0], e[1], [])
        }, this.reduceActions[50] = function(e) {
            return new v(v.CHILD, e[0], [])
        }, this.reduceActions[51] = function(e) {
            return new v(e[0], e[1], e[2])
        }, this.reduceActions[52] = function(e) {
            return new v(v.CHILD, e[0], e[1])
        }, this.reduceActions[54] = function(e) {
            return [e[0]]
        }, this.reduceActions[55] = function(e) {
            return e[1].unshift(e[0]), e[1]
        }, this.reduceActions[56] = function(e) {
            if ("ancestor" == e[0]) return v.ANCESTOR;
            return "ancestor-or-self" == e[0] ? v.ANCESTORORSELF : "attribute" == e[0] ? v.ATTRIBUTE : "child" == e[0] ? v.CHILD : "descendant" == e[0] ? v.DESCENDANT : "descendant-or-self" == e[0] ? v.DESCENDANTORSELF : "following" == e[0] ? v.FOLLOWING : "following-sibling" == e[0] ? v.FOLLOWINGSIBLING : "namespace" == e[0] ? v.NAMESPACE : "parent" == e[0] ? v.PARENT : "preceding" == e[0] ? v.PRECEDING : "preceding-sibling" == e[0] ? v.PRECEDINGSIBLING : "self" == e[0] ? v.SELF : -1
        }, this.reduceActions[57] = function() {
            return v.ATTRIBUTE
        }, this.reduceActions[59] = function(e) {
            if ("comment" == e[0]) return L.commentTest;
            return "text" == e[0] ? L.textTest : "processing-instruction" == e[0] ? L.anyPiTest : "node" == e[0] ? L.nodeTest : new L(-1, void 0)
        }, this.reduceActions[60] = function(e) {
            return new L.PITest(e[2])
        }, this.reduceActions[61] = function(e) {
            return e[1]
        }, this.reduceActions[63] = function(e) {
            return e[1].absolute = !0, e[1].steps.unshift(new v(v.DESCENDANTORSELF, L.nodeTest, [])), e[1]
        }, this.reduceActions[64] = function(e) {
            return e[0].steps.push(new v(v.DESCENDANTORSELF, L.nodeTest, [])), e[0].steps.push(e[2]), e[0]
        }, this.reduceActions[65] = function() {
            return new v(v.SELF, L.nodeTest, [])
        }, this.reduceActions[66] = function() {
            return new v(v.PARENT, L.nodeTest, [])
        }, this.reduceActions[67] = function(e) {
            return new P(e[1])
        }, this.reduceActions[68] = function() {
            return L.nameTestAny
        }, this.reduceActions[69] = function(e) {
            return new L.NameTestPrefixAny(e[0].split(":")[0])
        }, this.reduceActions[70] = function(e) {
            return new L.NameTestQName(e[0])
        }
    }, p.actionTable = [" s s        sssssssss    s ss  s  ss", "                 s                  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "                rrrrr               ", " s s        sssssssss    s ss  s  ss", "rs  rrrrrrrr s  sssssrrrrrr  rrs rs ", " s s        sssssssss    s ss  s  ss", "                            s       ", "                            s       ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "  s                                 ", "                            s       ", " s           s  sssss          s  s ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "a                                   ", "r       s                    rr  r  ", "r      sr                    rr  r  ", "r   s  rr            s       rr  r  ", "r   rssrr            rss     rr  r  ", "r   rrrrr            rrrss   rr  r  ", "r   rrrrrsss         rrrrr   rr  r  ", "r   rrrrrrrr         rrrrr   rr  r  ", "r   rrrrrrrr         rrrrrs  rr  r  ", "r   rrrrrrrr         rrrrrr  rr  r  ", "r   rrrrrrrr         rrrrrr  rr  r  ", "r  srrrrrrrr         rrrrrrs rr sr  ", "r  srrrrrrrr         rrrrrrs rr  r  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r   rrrrrrrr         rrrrrr  rr  r  ", "r   rrrrrrrr         rrrrrr  rr  r  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "                sssss               ", "r  rrrrrrrrr         rrrrrrr rr sr  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "                             s      ", "r  srrrrrrrr         rrrrrrs rr  r  ", "r   rrrrrrrr         rrrrr   rr  r  ", "              s                     ", "                             s      ", "                rrrrr               ", " s s        sssssssss    s sss s  ss", "r  srrrrrrrr         rrrrrrs rr  r  ", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss    s ss  s  ss", " s s        sssssssss      ss  s  ss", " s s        sssssssss    s ss  s  ss", " s           s  sssss          s  s ", " s           s  sssss          s  s ", "r  rrrrrrrrr         rrrrrrr rr rr  ", " s           s  sssss          s  s ", " s           s  sssss          s  s ", "r  rrrrrrrrr         rrrrrrr rr sr  ", "r  rrrrrrrrr         rrrrrrr rr sr  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "                             s      ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "                             rr     ", "                             s      ", "                             rs     ", "r      sr                    rr  r  ", "r   s  rr            s       rr  r  ", "r   rssrr            rss     rr  r  ", "r   rssrr            rss     rr  r  ", "r   rrrrr            rrrss   rr  r  ", "r   rrrrr            rrrss   rr  r  ", "r   rrrrr            rrrss   rr  r  ", "r   rrrrr            rrrss   rr  r  ", "r   rrrrrsss         rrrrr   rr  r  ", "r   rrrrrsss         rrrrr   rr  r  ", "r   rrrrrrrr         rrrrr   rr  r  ", "r   rrrrrrrr         rrrrr   rr  r  ", "r   rrrrrrrr         rrrrr   rr  r  ", "r   rrrrrrrr         rrrrrr  rr  r  ", "                                 r  ", "                                 s  ", "r  srrrrrrrr         rrrrrrs rr  r  ", "r  srrrrrrrr         rrrrrrs rr  r  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "r  rrrrrrrrr         rrrrrrr rr  r  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", "r  rrrrrrrrr         rrrrrrr rr rr  ", " s s        sssssssss    s ss  s  ss", "r  rrrrrrrrr         rrrrrrr rr rr  ", "                             r      "], p.actionTableNumber = [" 1 0        /.-,+*)('    & %$  #  \"!", "                 J                  ", "a  aaaaaaaaa         aaaaaaa aa  a  ", "                YYYYY               ", " 1 0        /.-,+*)('    & %$  #  \"!", "K1  KKKKKKKK .  +*)('KKKKKK  KK# K\" ", " 1 0        /.-,+*)('    & %$  #  \"!", "                            N       ", "                            O       ", "e  eeeeeeeee         eeeeeee ee ee  ", "f  fffffffff         fffffff ff ff  ", "d  ddddddddd         ddddddd dd dd  ", "B  BBBBBBBBB         BBBBBBB BB BB  ", "A  AAAAAAAAA         AAAAAAA AA AA  ", "  P                                 ", "                            Q       ", " 1           .  +*)('          #  \" ", "b  bbbbbbbbb         bbbbbbb bb  b  ", "                                    ", "!       S                    !!  !  ", "\"      T\"                    \"\"  \"  ", "$   V  $$            U       $$  $  ", "&   &ZY&&            &XW     &&  &  ", ")   )))))            )))\\[   ))  )  ", ".   ....._^]         .....   ..  .  ", "1   11111111         11111   11  1  ", "5   55555555         55555`  55  5  ", "7   77777777         777777  77  7  ", "9   99999999         999999  99  9  ", ":  c::::::::         ::::::b :: a:  ", "I  fIIIIIIII         IIIIIIe II  I  ", "=  =========         ======= == ==  ", "?  ?????????         ??????? ?? ??  ", "C  CCCCCCCCC         CCCCCCC CC CC  ", "J   JJJJJJJJ         JJJJJJ  JJ  J  ", "M   MMMMMMMM         MMMMMM  MM  M  ", "N  NNNNNNNNN         NNNNNNN NN  N  ", "P  PPPPPPPPP         PPPPPPP PP  P  ", "                +*)('               ", "R  RRRRRRRRR         RRRRRRR RR aR  ", "U  UUUUUUUUU         UUUUUUU UU  U  ", "Z  ZZZZZZZZZ         ZZZZZZZ ZZ ZZ  ", "c  ccccccccc         ccccccc cc cc  ", "                             j      ", "L  fLLLLLLLL         LLLLLLe LL  L  ", "6   66666666         66666   66  6  ", "              k                     ", "                             l      ", "                XXXXX               ", " 1 0        /.-,+*)('    & %$m #  \"!", "_  f________         ______e __  _  ", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1 0        /.-,+*)('      %$  #  \"!", " 1 0        /.-,+*)('    & %$  #  \"!", " 1           .  +*)('          #  \" ", " 1           .  +*)('          #  \" ", ">  >>>>>>>>>         >>>>>>> >> >>  ", " 1           .  +*)('          #  \" ", " 1           .  +*)('          #  \" ", "Q  QQQQQQQQQ         QQQQQQQ QQ aQ  ", "V  VVVVVVVVV         VVVVVVV VV aV  ", "T  TTTTTTTTT         TTTTTTT TT  T  ", "@  @@@@@@@@@         @@@@@@@ @@ @@  ", "                             \x87      ", "[  [[[[[[[[[         [[[[[[[ [[ [[  ", "D  DDDDDDDDD         DDDDDDD DD DD  ", "                             HH     ", "                             \x88      ", "                             F\x89     ", "#      T#                    ##  #  ", "%   V  %%            U       %%  %  ", "'   'ZY''            'XW     ''  '  ", "(   (ZY((            (XW     ((  (  ", "+   +++++            +++\\[   ++  +  ", "*   *****            ***\\[   **  *  ", "-   -----            ---\\[   --  -  ", ",   ,,,,,            ,,,\\[   ,,  ,  ", "0   00000_^]         00000   00  0  ", "/   /////_^]         /////   //  /  ", "2   22222222         22222   22  2  ", "3   33333333         33333   33  3  ", "4   44444444         44444   44  4  ", "8   88888888         888888  88  8  ", "                                 ^  ", "                                 \x8A  ", ";  f;;;;;;;;         ;;;;;;e ;;  ;  ", "<  f<<<<<<<<         <<<<<<e <<  <  ", "O  OOOOOOOOO         OOOOOOO OO  O  ", "`  `````````         ``````` ``  `  ", "S  SSSSSSSSS         SSSSSSS SS  S  ", "W  WWWWWWWWW         WWWWWWW WW  W  ", "\\  \\\\\\\\\\\\\\\\\\         \\\\\\\\\\\\\\ \\\\ \\\\  ", "E  EEEEEEEEE         EEEEEEE EE EE  ", " 1 0        /.-,+*)('    & %$  #  \"!", "]  ]]]]]]]]]         ]]]]]]] ]] ]]  ", "                             G      "], p.gotoTable = ["3456789:;<=>?@ AB  CDEFGH IJ ", "                             ", "                             ", "                             ", "L456789:;<=>?@ AB  CDEFGH IJ ", "            M        EFGH IJ ", "       N;<=>?@ AB  CDEFGH IJ ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "            S        EFGH IJ ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "              e              ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                        h  J ", "              i          j   ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "o456789:;<=>?@ ABpqCDEFGH IJ ", "                             ", "  r6789:;<=>?@ AB  CDEFGH IJ ", "   s789:;<=>?@ AB  CDEFGH IJ ", "    t89:;<=>?@ AB  CDEFGH IJ ", "    u89:;<=>?@ AB  CDEFGH IJ ", "     v9:;<=>?@ AB  CDEFGH IJ ", "     w9:;<=>?@ AB  CDEFGH IJ ", "     x9:;<=>?@ AB  CDEFGH IJ ", "     y9:;<=>?@ AB  CDEFGH IJ ", "      z:;<=>?@ AB  CDEFGH IJ ", "      {:;<=>?@ AB  CDEFGH IJ ", "       |;<=>?@ AB  CDEFGH IJ ", "       };<=>?@ AB  CDEFGH IJ ", "       ~;<=>?@ AB  CDEFGH IJ ", "         \x7F=>?@ AB  CDEFGH IJ ", "\x80456789:;<=>?@ AB  CDEFGH IJ\x81", "            \x82        EFGH IJ ", "            \x83        EFGH IJ ", "                             ", "                     \x84 GH IJ ", "                     \x85 GH IJ ", "              i          \x86   ", "              i          \x87   ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "                             ", "o456789:;<=>?@ AB\x8CqCDEFGH IJ ", "                             ", "                             "], p.productions = [
        [1, 1, 2],
        [2, 1, 3],
        [3, 1, 4],
        [3, 3, 3, -9, 4],
        [4, 1, 5],
        [4, 3, 4, -8, 5],
        [5, 1, 6],
        [5, 3, 5, -22, 6],
        [5, 3, 5, -5, 6],
        [6, 1, 7],
        [6, 3, 6, -23, 7],
        [6, 3, 6, -24, 7],
        [6, 3, 6, -6, 7],
        [6, 3, 6, -7, 7],
        [7, 1, 8],
        [7, 3, 7, -25, 8],
        [7, 3, 7, -26, 8],
        [8, 1, 9],
        [8, 3, 8, -12, 9],
        [8, 3, 8, -11, 9],
        [8, 3, 8, -10, 9],
        [9, 1, 10],
        [9, 2, -26, 9],
        [10, 1, 11],
        [10, 3, 10, -27, 11],
        [11, 1, 12],
        [11, 1, 13],
        [11, 3, 13, -28, 14],
        [11, 3, 13, -4, 14],
        [13, 1, 15],
        [13, 2, 13, 16],
        [15, 1, 17],
        [15, 3, -29, 2, -30],
        [15, 1, -15],
        [15, 1, -16],
        [15, 1, 18],
        [18, 3, -13, -29, -30],
        [18, 4, -13, -29, 19, -30],
        [19, 1, 20],
        [19, 3, 20, -31, 19],
        [20, 1, 2],
        [12, 1, 14],
        [12, 1, 21],
        [21, 1, -28],
        [21, 2, -28, 14],
        [21, 1, 22],
        [14, 1, 23],
        [14, 3, 14, -28, 23],
        [14, 1, 24],
        [23, 2, 25, 26],
        [23, 1, 26],
        [23, 3, 25, 26, 27],
        [23, 2, 26, 27],
        [23, 1, 28],
        [27, 1, 16],
        [27, 2, 16, 27],
        [25, 2, -14, -3],
        [25, 1, -32],
        [26, 1, 29],
        [26, 3, -20, -29, -30],
        [26, 4, -21, -29, -15, -30],
        [16, 3, -33, 30, -34],
        [30, 1, 2],
        [22, 2, -4, 14],
        [24, 3, 14, -4, 23],
        [28, 1, -35],
        [28, 1, -2],
        [17, 2, -36, -18],
        [29, 1, -17],
        [29, 1, -19],
        [29, 1, -18]
    ], p.DOUBLEDOT = 2, p.DOUBLECOLON = 3, p.DOUBLESLASH = 4, p.NOTEQUAL = 5, p.LESSTHANOREQUAL = 6, p.GREATERTHANOREQUAL = 7, p.AND = 8, p.OR = 9, p.MOD = 10, p.DIV = 11, p.MULTIPLYOPERATOR = 12, p.FUNCTIONNAME = 13, p.AXISNAME = 14, p.LITERAL = 15, p.NUMBER = 16, p.ASTERISKNAMETEST = 17, p.QNAME = 18, p.NCNAMECOLONASTERISK = 19, p.NODETYPE = 20, p.PROCESSINGINSTRUCTIONWITHLITERAL = 21, p.EQUALS = 22, p.LESSTHAN = 23, p.GREATERTHAN = 24, p.PLUS = 25, p.MINUS = 26, p.BAR = 27, p.SLASH = 28, p.LEFTPARENTHESIS = 29, p.RIGHTPARENTHESIS = 30, p.COMMA = 31, p.AT = 32, p.LEFTBRACKET = 33, p.RIGHTBRACKET = 34, p.DOT = 35, p.DOLLAR = 36, p.prototype.tokenize = function(e) {
        for (var t = [], r = [], o = e + "\0", n = 0, s = o.charAt(n++);;) {
            for (;
                " " == s || "\t" == s || "\r" == s || "\n" == s;) s = o.charAt(n++);
            if ("\0" == s || n >= o.length) break;
            if ("(" == s) {
                t.push(p.LEFTPARENTHESIS), r.push(s), s = o.charAt(n++);
                continue
            }
            if (")" == s) {
                t.push(p.RIGHTPARENTHESIS), r.push(s), s = o.charAt(n++);
                continue
            }
            if ("[" == s) {
                t.push(p.LEFTBRACKET), r.push(s), s = o.charAt(n++);
                continue
            }
            if ("]" == s) {
                t.push(p.RIGHTBRACKET), r.push(s), s = o.charAt(n++);
                continue
            }
            if ("@" == s) {
                t.push(p.AT), r.push(s), s = o.charAt(n++);
                continue
            }
            if ("," == s) {
                t.push(p.COMMA), r.push(s), s = o.charAt(n++);
                continue
            }
            if ("|" == s) {
                t.push(p.BAR), r.push(s), s = o.charAt(n++);
                continue
            }
            if ("+" == s) {
                t.push(p.PLUS), r.push(s), s = o.charAt(n++);
                continue
            }
            if ("-" == s) {
                t.push(p.MINUS), r.push(s), s = o.charAt(n++);
                continue
            }
            if ("=" == s) {
                t.push(p.EQUALS), r.push(s), s = o.charAt(n++);
                continue
            }
            if ("$" == s) {
                t.push(p.DOLLAR), r.push(s), s = o.charAt(n++);
                continue
            }
            if ("." == s) {
                if (s = o.charAt(n++), "." == s) {
                    t.push(p.DOUBLEDOT), r.push(".."), s = o.charAt(n++);
                    continue
                }
                if ("0" <= s && "9" >= s) {
                    var a = "." + s;
                    for (s = o.charAt(n++);
                        "0" <= s && "9" >= s;) a += s, s = o.charAt(n++);
                    t.push(p.NUMBER), r.push(a);
                    continue
                }
                t.push(p.DOT), r.push(".");
                continue
            }
            if ("'" == s || "\"" == s) {
                for (var i = s, u = ""; n < o.length && (s = o.charAt(n)) !== i;) u += s, n += 1;
                if (s !== i) throw le.fromMessage("Unterminated string literal: " + i + u);
                n += 1, t.push(p.LITERAL), r.push(u), s = o.charAt(n++);
                continue
            }
            if ("0" <= s && "9" >= s) {
                var a = s;
                for (s = o.charAt(n++);
                    "0" <= s && "9" >= s;) a += s, s = o.charAt(n++);
                if ("." == s && "0" <= o.charAt(n) && "9" >= o.charAt(n))
                    for (a += s, a += o.charAt(n++), s = o.charAt(n++);
                        "0" <= s && "9" >= s;) a += s, s = o.charAt(n++);
                t.push(p.NUMBER), r.push(a);
                continue
            }
            if ("*" == s) {
                if (0 < t.length) {
                    var l = t[t.length - 1];
                    if (l != p.AT && l != p.DOUBLECOLON && l != p.LEFTPARENTHESIS && l != p.LEFTBRACKET && l != p.AND && l != p.OR && l != p.MOD && l != p.DIV && l != p.MULTIPLYOPERATOR && l != p.SLASH && l != p.DOUBLESLASH && l != p.BAR && l != p.PLUS && l != p.MINUS && l != p.EQUALS && l != p.NOTEQUAL && l != p.LESSTHAN && l != p.LESSTHANOREQUAL && l != p.GREATERTHAN && l != p.GREATERTHANOREQUAL) {
                        t.push(p.MULTIPLYOPERATOR), r.push(s), s = o.charAt(n++);
                        continue
                    }
                }
                t.push(p.ASTERISKNAMETEST), r.push(s), s = o.charAt(n++);
                continue
            }
            if (":" == s && ":" == o.charAt(n)) {
                t.push(p.DOUBLECOLON), r.push("::"), n++, s = o.charAt(n++);
                continue
            }
            if ("/" == s) {
                if (s = o.charAt(n++), "/" == s) {
                    t.push(p.DOUBLESLASH), r.push("//"), s = o.charAt(n++);
                    continue
                }
                t.push(p.SLASH), r.push("/");
                continue
            }
            if ("!" == s && "=" == o.charAt(n)) {
                t.push(p.NOTEQUAL), r.push("!="), n++, s = o.charAt(n++);
                continue
            }
            if ("<" == s) {
                if ("=" == o.charAt(n)) {
                    t.push(p.LESSTHANOREQUAL), r.push("<="), n++, s = o.charAt(n++);
                    continue
                }
                t.push(p.LESSTHAN), r.push("<"), s = o.charAt(n++);
                continue
            }
            if (">" == s) {
                if ("=" == o.charAt(n)) {
                    t.push(p.GREATERTHANOREQUAL), r.push(">="), n++, s = o.charAt(n++);
                    continue
                }
                t.push(p.GREATERTHAN), r.push(">"), s = o.charAt(n++);
                continue
            }
            if ("_" == s || ue.isLetter(s.charCodeAt(0))) {
                var c = s;
                for (s = o.charAt(n++); ue.isNCNameChar(s.charCodeAt(0));) c += s, s = o.charAt(n++);
                if (0 < t.length) {
                    var l = t[t.length - 1];
                    if (l != p.AT && l != p.DOUBLECOLON && l != p.LEFTPARENTHESIS && l != p.LEFTBRACKET && l != p.AND && l != p.OR && l != p.MOD && l != p.DIV && l != p.MULTIPLYOPERATOR && l != p.SLASH && l != p.DOUBLESLASH && l != p.BAR && l != p.PLUS && l != p.MINUS && l != p.EQUALS && l != p.NOTEQUAL && l != p.LESSTHAN && l != p.LESSTHANOREQUAL && l != p.GREATERTHAN && l != p.GREATERTHANOREQUAL) {
                        if ("and" == c) {
                            t.push(p.AND), r.push(c);
                            continue
                        }
                        if ("or" == c) {
                            t.push(p.OR), r.push(c);
                            continue
                        }
                        if ("mod" == c) {
                            t.push(p.MOD), r.push(c);
                            continue
                        }
                        if ("div" == c) {
                            t.push(p.DIV), r.push(c);
                            continue
                        }
                    }
                }
                if (":" == s) {
                    if ("*" == o.charAt(n)) {
                        t.push(p.NCNAMECOLONASTERISK), r.push(c + ":*"), n++, s = o.charAt(n++);
                        continue
                    }
                    if ("_" == o.charAt(n) || ue.isLetter(o.charCodeAt(n))) {
                        for (c += ":", s = o.charAt(n++); ue.isNCNameChar(s.charCodeAt(0));) c += s, s = o.charAt(n++);
                        if ("(" == s) {
                            t.push(p.FUNCTIONNAME), r.push(c);
                            continue
                        }
                        t.push(p.QNAME), r.push(c);
                        continue
                    }
                    if (":" == o.charAt(n)) {
                        t.push(p.AXISNAME), r.push(c);
                        continue
                    }
                }
                if ("(" == s) {
                    if ("comment" == c || "text" == c || "node" == c) {
                        t.push(p.NODETYPE), r.push(c);
                        continue
                    }
                    if ("processing-instruction" == c) {
                        ")" == o.charAt(n) ? t.push(p.NODETYPE) : t.push(p.PROCESSINGINSTRUCTIONWITHLITERAL), r.push(c);
                        continue
                    }
                    t.push(p.FUNCTIONNAME), r.push(c);
                    continue
                }
                t.push(p.QNAME), r.push(c);
                continue
            }
            throw new Error("Unexpected character " + s)
        }
        return t.push(1), r.push("[EOF]"), [t, r]
    }, p.SHIFT = "s", p.REDUCE = "r", p.ACCEPT = "a", p.prototype.parse = function(e) {
        var r, o, n = this.tokenize(e);
        if (null != n) {
            r = n[0], o = n[1];
            var e, s, l, t = 0,
                c = [],
                d = [],
                h = [];
            for (c.push(0), d.push(1), h.push("_S"), s = r[t], l = o[t++];;) switch (e = c[c.length - 1], p.actionTable[e].charAt(s - 1)) {
                case p.SHIFT:
                    d.push(-s), h.push(l), c.push(p.actionTableNumber[e].charCodeAt(s - 1) - 32), s = r[t], l = o[t++];
                    break;
                case p.REDUCE:
                    for (var g = p.productions[p.actionTableNumber[e].charCodeAt(s - 1) - 32][1], N = [], y = 0; y < g; y++) d.pop(), N.unshift(h.pop()), c.pop();
                    var i = c[c.length - 1];
                    d.push(p.productions[p.actionTableNumber[e].charCodeAt(s - 1) - 32][0]), null == this.reduceActions[p.actionTableNumber[e].charCodeAt(s - 1) - 32] ? h.push(N[0]) : h.push(this.reduceActions[p.actionTableNumber[e].charCodeAt(s - 1) - 32](N)), c.push(p.gotoTable[i].charCodeAt(p.productions[p.actionTableNumber[e].charCodeAt(s - 1) - 32][0] - 2) - 33);
                    break;
                case p.ACCEPT:
                    return new u(h.pop());
                default:
                    throw new Error("XPath parse error");
            }
        }
    }, u.prototype = {}, u.prototype.constructor = u, u.superclass = Object.prototype, u.prototype.toString = function() {
        return this.expression.toString()
    }, u.prototype.evaluate = function(e) {
        return e.contextNode = e.expressionContextNode, e.contextSize = 1, e.contextPosition = 1, e.isHtml && (s(e, "caseInsensitive", !0), s(e, "allowAnyNamespaceForNoPrefix", !0)), s(e, "caseInsensitive", !1), this.expression.evaluate(e)
    }, u.XML_NAMESPACE_URI = "http://www.w3.org/XML/1998/namespace", u.XMLNS_NAMESPACE_URI = "http://www.w3.org/2000/xmlns/", a.prototype = {}, a.prototype.constructor = a, a.superclass = Object.prototype, a.prototype.init = function() {}, a.prototype.toString = function() {
        return "<Expression>"
    }, a.prototype.evaluate = function() {
        throw new Error("Could not evaluate expression.")
    }, i.prototype = new a, i.prototype.constructor = i, i.superclass = a.prototype, i.prototype.init = function(e) {
        this.rhs = e
    }, l.prototype = new i, l.prototype.constructor = l, l.superclass = i.prototype, l.prototype.init = function(e) {
        l.superclass.init.call(this, e)
    }, l.prototype.evaluate = function(e) {
        return this.rhs.evaluate(e).number().negate()
    }, l.prototype.toString = function() {
        return "-" + this.rhs.toString()
    }, c.prototype = new a, c.prototype.constructor = c, c.superclass = a.prototype, c.prototype.init = function(e, t) {
        this.lhs = e, this.rhs = t
    }, d.prototype = new c, d.prototype.constructor = d, d.superclass = c.prototype, d.prototype.init = function(e, t) {
        d.superclass.init.call(this, e, t)
    }, d.prototype.toString = function() {
        return "(" + this.lhs.toString() + " or " + this.rhs.toString() + ")"
    }, d.prototype.evaluate = function(e) {
        var t = this.lhs.evaluate(e).bool();
        return t.booleanValue() ? t : this.rhs.evaluate(e).bool()
    }, h.prototype = new c, h.prototype.constructor = h, h.superclass = c.prototype, h.prototype.init = function(e, t) {
        h.superclass.init.call(this, e, t)
    }, h.prototype.toString = function() {
        return "(" + this.lhs.toString() + " and " + this.rhs.toString() + ")"
    }, h.prototype.evaluate = function(e) {
        var t = this.lhs.evaluate(e).bool();
        return t.booleanValue() ? this.rhs.evaluate(e).bool() : t
    }, g.prototype = new c, g.prototype.constructor = g, g.superclass = c.prototype, g.prototype.init = function(e, t) {
        g.superclass.init.call(this, e, t)
    }, g.prototype.toString = function() {
        return "(" + this.lhs.toString() + " = " + this.rhs.toString() + ")"
    }, g.prototype.evaluate = function(e) {
        return this.lhs.evaluate(e).equals(this.rhs.evaluate(e))
    }, N.prototype = new c, N.prototype.constructor = N, N.superclass = c.prototype, N.prototype.init = function(e, t) {
        N.superclass.init.call(this, e, t)
    }, N.prototype.toString = function() {
        return "(" + this.lhs.toString() + " != " + this.rhs.toString() + ")"
    }, N.prototype.evaluate = function(e) {
        return this.lhs.evaluate(e).notequal(this.rhs.evaluate(e))
    }, y.prototype = new c, y.prototype.constructor = y, y.superclass = c.prototype, y.prototype.init = function(e, t) {
        y.superclass.init.call(this, e, t)
    }, y.prototype.evaluate = function(e) {
        return this.lhs.evaluate(e).lessthan(this.rhs.evaluate(e))
    }, y.prototype.toString = function() {
        return "(" + this.lhs.toString() + " < " + this.rhs.toString() + ")"
    }, E.prototype = new c, E.prototype.constructor = E, E.superclass = c.prototype, E.prototype.init = function(e, t) {
        E.superclass.init.call(this, e, t)
    }, E.prototype.evaluate = function(e) {
        return this.lhs.evaluate(e).greaterthan(this.rhs.evaluate(e))
    }, E.prototype.toString = function() {
        return "(" + this.lhs.toString() + " > " + this.rhs.toString() + ")"
    }, A.prototype = new c, A.prototype.constructor = A, A.superclass = c.prototype, A.prototype.init = function(e, t) {
        A.superclass.init.call(this, e, t)
    }, A.prototype.evaluate = function(e) {
        return this.lhs.evaluate(e).lessthanorequal(this.rhs.evaluate(e))
    }, A.prototype.toString = function() {
        return "(" + this.lhs.toString() + " <= " + this.rhs.toString() + ")"
    }, m.prototype = new c, m.prototype.constructor = m, m.superclass = c.prototype, m.prototype.init = function(e, t) {
        m.superclass.init.call(this, e, t)
    }, m.prototype.evaluate = function(e) {
        return this.lhs.evaluate(e).greaterthanorequal(this.rhs.evaluate(e))
    }, m.prototype.toString = function() {
        return "(" + this.lhs.toString() + " >= " + this.rhs.toString() + ")"
    }, T.prototype = new c, T.prototype.constructor = T, T.superclass = c.prototype, T.prototype.init = function(e, t) {
        T.superclass.init.call(this, e, t)
    }, T.prototype.evaluate = function(e) {
        return this.lhs.evaluate(e).number().plus(this.rhs.evaluate(e).number())
    }, T.prototype.toString = function() {
        return "(" + this.lhs.toString() + " + " + this.rhs.toString() + ")"
    }, f.prototype = new c, f.prototype.constructor = f, f.superclass = c.prototype, f.prototype.init = function(e, t) {
        f.superclass.init.call(this, e, t)
    }, f.prototype.evaluate = function(e) {
        return this.lhs.evaluate(e).number().minus(this.rhs.evaluate(e).number())
    }, f.prototype.toString = function() {
        return "(" + this.lhs.toString() + " - " + this.rhs.toString() + ")"
    }, S.prototype = new c, S.prototype.constructor = S, S.superclass = c.prototype, S.prototype.init = function(e, t) {
        S.superclass.init.call(this, e, t)
    }, S.prototype.evaluate = function(e) {
        return this.lhs.evaluate(e).number().multiply(this.rhs.evaluate(e).number())
    }, S.prototype.toString = function() {
        return "(" + this.lhs.toString() + " * " + this.rhs.toString() + ")"
    }, R.prototype = new c, R.prototype.constructor = R, R.superclass = c.prototype, R.prototype.init = function(e, t) {
        R.superclass.init.call(this, e, t)
    }, R.prototype.evaluate = function(e) {
        return this.lhs.evaluate(e).number().div(this.rhs.evaluate(e).number())
    }, R.prototype.toString = function() {
        return "(" + this.lhs.toString() + " div " + this.rhs.toString() + ")"
    }, b.prototype = new c, b.prototype.constructor = b, b.superclass = c.prototype, b.prototype.init = function(e, t) {
        b.superclass.init.call(this, e, t)
    }, b.prototype.evaluate = function(e) {
        return this.lhs.evaluate(e).number().mod(this.rhs.evaluate(e).number())
    }, b.prototype.toString = function() {
        return "(" + this.lhs.toString() + " mod " + this.rhs.toString() + ")"
    }, O.prototype = new c, O.prototype.constructor = O, O.superclass = c.prototype, O.prototype.init = function(e, t) {
        O.superclass.init.call(this, e, t)
    }, O.prototype.evaluate = function(e) {
        return this.lhs.evaluate(e).nodeset().union(this.rhs.evaluate(e).nodeset())
    }, O.prototype.toString = function() {
        return te(o, [this.lhs, this.rhs]).join(" | ")
    }, I.prototype = new a, I.prototype.constructor = I, I.superclass = a.prototype, I.prototype.init = function(e, t, r) {
        I.superclass.init.call(this), this.filter = e, this.filterPredicates = t, this.locationPath = r
    }, I.applyPredicates = function(e, t, r) {
        return ee(function(e, r) {
            var o = t.extend({
                contextSize: e.length
            });
            return re(function(e, t) {
                return I.predicateMatches(r, o.extend({
                    contextNode: e,
                    contextPosition: t + 1
                }))
            }, e)
        }, r, e)
    }, I.getRoot = function(e, t) {
        var r = t[0];
        if (9 === r.nodeType) return r;
        if (e.virtualRoot) return e.virtualRoot;
        var o = r.ownerDocument;
        if (o) return o;
        for (var s = r; null != s.parentNode;) s = s.parentNode;
        return s
    }, I.applyStep = function(e, t, r) {
        var o = this,
            s = [];
        switch (t.contextNode = r, e.axis) {
            case v.ANCESTOR:
                if (t.contextNode === t.virtualRoot) break;
                var a;
                for (a = 2 == t.contextNode.nodeType ? I.getOwnerElement(t.contextNode) : t.contextNode.parentNode; null != a && (e.nodeTest.matches(a, t) && s.push(a), a !== t.virtualRoot);) a = a.parentNode;
                break;
            case v.ANCESTORORSELF:
                for (var a = t.contextNode; null != a && (e.nodeTest.matches(a, t) && s.push(a), a !== t.virtualRoot); a = 2 == a.nodeType ? I.getOwnerElement(a) : a.parentNode);
                break;
            case v.ATTRIBUTE:
                var p = t.contextNode.attributes;
                if (null != p)
                    for (var a, i = 0; i < p.length; i++) a = p.item(i), e.nodeTest.matches(a, t) && s.push(a);
                break;
            case v.CHILD:
                for (var a = t.contextNode.firstChild; null != a; a = a.nextSibling) e.nodeTest.matches(a, t) && s.push(a);
                break;
            case v.DESCENDANT:
                for (var l = [t.contextNode.firstChild]; 0 < l.length;)
                    for (var a = l.pop(); null != a;) e.nodeTest.matches(a, t) && s.push(a), null == a.firstChild ? a = a.nextSibling : (l.push(a.nextSibling), a = a.firstChild);
                break;
            case v.DESCENDANTORSELF:
                e.nodeTest.matches(t.contextNode, t) && s.push(t.contextNode);
                for (var l = [t.contextNode.firstChild]; 0 < l.length;)
                    for (var a = l.pop(); null != a;) e.nodeTest.matches(a, t) && s.push(a), null == a.firstChild ? a = a.nextSibling : (l.push(a.nextSibling), a = a.firstChild);
                break;
            case v.FOLLOWING:
                if (t.contextNode === t.virtualRoot) break;
                var l = [];
                null == t.contextNode.firstChild ? l.unshift(t.contextNode.nextSibling) : l.unshift(t.contextNode.firstChild);
                for (var a = t.contextNode.parentNode; null != a && 9 != a.nodeType && a !== t.virtualRoot; a = a.parentNode) l.unshift(a.nextSibling);
                do
                    for (var a = l.pop(); null != a;) e.nodeTest.matches(a, t) && s.push(a), null == a.firstChild ? a = a.nextSibling : (l.push(a.nextSibling), a = a.firstChild); while (0 < l.length);
                break;
            case v.FOLLOWINGSIBLING:
                if (t.contextNode === t.virtualRoot) break;
                for (var a = t.contextNode.nextSibling; null != a; a = a.nextSibling) e.nodeTest.matches(a, t) && s.push(a);
                break;
            case v.NAMESPACE:
                var c = {};
                if (1 == t.contextNode.nodeType) {
                    c["xml"] = u.XML_NAMESPACE_URI, c["xmlns"] = u.XMLNS_NAMESPACE_URI;
                    for (var a = t.contextNode; null != a && 1 == a.nodeType; a = a.parentNode)
                        for (var i = 0; i < a.attributes.length; i++) {
                            var n = a.attributes.item(i),
                                d = n.name + "";
                            if ("xmlns" == d) null == c[""] && (c[""] = n.value);
                            else if (6 < d.length && "xmlns:" == d.substring(0, 6)) {
                                var h = d.substring(6, d.length);
                                null == c[h] && (c[h] = n.value)
                            }
                        }
                    for (var h in c) {
                        var g = new W(h, c[h], t.contextNode);
                        e.nodeTest.matches(g, t) && s.push(g)
                    }
                }
                break;
            case v.PARENT:
                a = null, t.contextNode !== t.virtualRoot && (2 == t.contextNode.nodeType ? a = I.getOwnerElement(t.contextNode) : a = t.contextNode.parentNode), null != a && e.nodeTest.matches(a, t) && s.push(a);
                break;
            case v.PRECEDING:
                var l = null == t.virtualRoot ? [x(t.contextNode)] : [t.virtualRoot];
                outer: for (; 0 < l.length;)
                    for (var a = l.pop(); null != a;) {
                        if (a == t.contextNode) break outer;
                        e.nodeTest.matches(a, t) && s.unshift(a), null == a.firstChild ? a = a.nextSibling : (l.push(a.nextSibling), a = a.firstChild)
                    }
                break;
            case v.PRECEDINGSIBLING:
                if (t.contextNode === t.virtualRoot) break;
                for (var a = t.contextNode.previousSibling; null != a; a = a.previousSibling) e.nodeTest.matches(a, t) && s.push(a);
                break;
            case v.SELF:
                e.nodeTest.matches(t.contextNode, t) && s.push(t.contextNode);
                break;
            default:
        }
        return s
    }, I.applySteps = function(e, t, r) {
        return ee(function(e, r) {
            return [].concat.apply([], te(function(e) {
                return I.applyPredicates(r.predicates, t, I.applyStep(r, t, e))
            }, e))
        }, r, e)
    }, I.prototype.applyFilter = function(e, t) {
        if (!this.filter) return {
            nodes: [e.contextNode]
        };
        var r = this.filter.evaluate(e);
        if (!ue.instance_of(r, G)) {
            if (null != this.filterPredicates && 0 < this.filterPredicates.length || null != this.locationPath) throw new Error("Path expression filter must evaluate to a nodeset if predicates or location path are used");
            return {
                nonNodes: r
            }
        }
        return {
            nodes: I.applyPredicates(this.filterPredicates || [], t, r.toUnsortedArray())
        }
    }, I.applyLocationPath = function(e, t, r) {
        if (!e) return r;
        var o = e.absolute ? [I.getRoot(t, r)] : r;
        return I.applySteps(e.steps, t, o)
    }, I.prototype.evaluate = function(e) {
        var t = n(new Y, e),
            r = this.applyFilter(e, t);
        if ("nonNodes" in r) return r.nonNodes;
        var o = new G;
        return o.addArray(I.applyLocationPath(this.locationPath, t, r.nodes)), o
    }, I.predicateMatches = function(e, t) {
        var r = e.evaluate(t);
        return ue.instance_of(r, F) ? t.contextPosition == r.numberValue() : r.booleanValue()
    }, I.predicateString = t(ae("[", "]"), o), I.predicatesString = t(se(""), te(I.predicateString)), I.prototype.toString = function() {
        if (this.filter != null) {
            var e = o(this.filter);
            return ue.instance_of(this.filter, _) ? ae("'", "'", e) : null != this.filterPredicates && this.filterPredicates.length ? ae("(", ")", e) + I.predicatesString(this.filterPredicates) : null == this.locationPath ? e : e + (this.locationPath.absolute ? "" : "/") + o(this.locationPath)
        }
        return o(this.locationPath)
    }, I.getOwnerElement = function(e) {
        if (e.ownerElement) return e.ownerElement;
        try {
            if (e.selectSingleNode) return e.selectSingleNode("..")
        } catch (t) {}
        for (var t = 9 == e.nodeType ? e : e.ownerDocument, r = t.getElementsByTagName("*"), o = 0; o < r.length; o++)
            for (var n, s = r.item(o), a = s.attributes, p = 0; p < a.length; p++)
                if (n = a.item(p), n === e) return s;
        return null
    }, D.prototype = {}, D.prototype.constructor = D, D.superclass = Object.prototype, D.prototype.init = function(e, t) {
        this.absolute = e, this.steps = t
    }, D.prototype.toString = function() {
        return (this.absolute ? "/" : "") + te(o, this.steps).join("/")
    }, v.prototype = {}, v.prototype.constructor = v, v.superclass = Object.prototype, v.prototype.init = function(e, t, r) {
        this.axis = e, this.nodeTest = t, this.predicates = r
    }, v.prototype.toString = function() {
        return v.STEPNAMES[this.axis] + "::" + this.nodeTest.toString() + I.predicatesString(this.predicates)
    }, v.ANCESTOR = 0, v.ANCESTORORSELF = 1, v.ATTRIBUTE = 2, v.CHILD = 3, v.DESCENDANT = 4, v.DESCENDANTORSELF = 5, v.FOLLOWING = 6, v.FOLLOWINGSIBLING = 7, v.NAMESPACE = 8, v.PARENT = 9, v.PRECEDING = 10, v.PRECEDINGSIBLING = 11, v.SELF = 12, v.STEPNAMES = ee(function(e, t) {
        return e[t[0]] = t[1], e
    }, {}, [
        [v.ANCESTOR, "ancestor"],
        [v.ANCESTORORSELF, "ancestor-or-self"],
        [v.ATTRIBUTE, "attribute"],
        [v.CHILD, "child"],
        [v.DESCENDANT, "descendant"],
        [v.DESCENDANTORSELF, "descendant-or-self"],
        [v.FOLLOWING, "following"],
        [v.FOLLOWINGSIBLING, "following-sibling"],
        [v.NAMESPACE, "namespace"],
        [v.PARENT, "parent"],
        [v.PRECEDING, "preceding"],
        [v.PRECEDINGSIBLING, "preceding-sibling"],
        [v.SELF, "self"]
    ]), L.prototype = {}, L.prototype.constructor = L, L.superclass = Object.prototype, L.prototype.init = function(e, t) {
        this.type = e, this.value = t
    }, L.prototype.toString = function() {
        return "<unknown nodetest type>"
    }, L.prototype.matches = function() {
        console.warn("unknown node test type")
    }, L.NAMETESTANY = 0, L.NAMETESTPREFIXANY = 1, L.NAMETESTQNAME = 2, L.COMMENT = 3, L.TEXT = 4, L.PI = 5, L.NODE = 6, L.isNodeType = function(e) {
        return t(oe(e), ne("nodeType"))
    }, L.makeNodeTestType = function(e, t, r) {
        var o = r || function() {};
        for (var n in o.prototype = new L(t.type), o.prototype.constructor = e, t) o.prototype[n] = t[n];
        return o
    }, L.makeNodeTypeTest = function(e, t, o) {
        return new(L.makeNodeTestType(e, {
            matches: L.isNodeType(t),
            toString: r(o)
        }))
    }, L.hasPrefix = function(e) {
        return e.prefix || -1 !== (e.nodeName || e.tagName).indexOf(":")
    }, L.isElementOrAttribute = L.isNodeType([1, 2]), L.nameSpaceMatches = function(e, t, r) {
        var o = r.namespaceURI || "";
        if (!e) return !o || t.allowAnyNamespaceForNoPrefix && !L.hasPrefix(r);
        var n = t.namespaceResolver.getNamespace(e, t.expressionContextNode);
        if (null == n) throw new Error("Cannot resolve QName " + e);
        return n === o
    }, L.localNameMatches = function(e, t, r) {
        var o = r.localName || r.nodeName;
        return t.caseInsensitive ? e.toLowerCase() === o.toLowerCase() : e === o
    }, L.NameTestPrefixAny = L.makeNodeTestType(L.NAMETESTPREFIXANY, {
        matches: function(e, t) {
            return L.isElementOrAttribute(e) && L.nameSpaceMatches(this.prefix, t, e)
        },
        toString: function() {
            return this.prefix + ":*"
        }
    }, function(e) {
        this.prefix = e
    }), L.NameTestQName = L.makeNodeTestType(L.NAMETESTQNAME, {
        matches: function(e, t) {
            return L.isNodeType([1, 2, W.XPATH_NAMESPACE_NODE])(e) && L.nameSpaceMatches(this.prefix, t, e) && L.localNameMatches(this.localName, t, e)
        },
        toString: function() {
            return this.name
        }
    }, function(e) {
        var t = e.split(":");
        this.name = e, this.prefix = 1 < t.length ? t[0] : null, this.localName = t[1 < t.length ? 1 : 0]
    }), L.PITest = L.makeNodeTestType(L.PI, {
        matches: function(e) {
            return L.isNodeType([7])(e) && (e.target || e.nodeName) === this.name
        },
        toString: function() {
            return ae("processing-instruction(\"", "\")", this.name)
        }
    }, function(e) {
        this.name = e
    }), L.nameTestAny = L.makeNodeTypeTest(L.NAMETESTANY, [1, 2, W.XPATH_NAMESPACE_NODE], "*"), L.textTest = L.makeNodeTypeTest(L.TEXT, [3, 4], "text()"), L.commentTest = L.makeNodeTypeTest(L.COMMENT, [8], "comment()"), L.nodeTest = L.makeNodeTypeTest(L.NODE, [1, 2, 3, 4, 7, 8, 9], "node()"), L.anyPiTest = L.makeNodeTypeTest(L.PI, [7], "processing-instruction()"), P.prototype = new a, P.prototype.constructor = P, P.superclass = a.prototype, P.prototype.init = function(e) {
        this.variable = e
    }, P.prototype.toString = function() {
        return "$" + this.variable
    }, P.prototype.evaluate = function(e) {
        var t = ue.resolveQName(this.variable, e.namespaceResolver, e.contextNode, !1);
        if (null == t[0]) throw new Error("Cannot resolve QName " + fn);
        var r = e.variableResolver.getVariable(t[1], t[0]);
        if (!r) throw le.fromMessage("Undeclared variable: " + this.toString());
        return r
    }, C.prototype = new a, C.prototype.constructor = C, C.superclass = a.prototype, C.prototype.init = function(e, t) {
        this.functionName = e, this.arguments = t
    }, C.prototype.toString = function() {
        for (var e = this.functionName + "(", t = 0; t < this.arguments.length; t++) 0 < t && (e += ", "), e += this.arguments[t].toString();
        return e + ")"
    }, C.prototype.evaluate = function(e) {
        var t = w.getFunctionFromContext(this.functionName, e);
        if (!t) throw new Error("Unknown function " + this.functionName);
        var r = [e].concat(this.arguments);
        return t.apply(e.functionResolver.thisArg, r)
    };
    var pe = {};
    pe.equals = function(e, t) {
        return e.equals(t)
    }, pe.notequal = function(e, t) {
        return e.notequal(t)
    }, pe.lessthan = function(e, t) {
        return e.lessthan(t)
    }, pe.greaterthan = function(e, t) {
        return e.greaterthan(t)
    }, pe.lessthanorequal = function(e, t) {
        return e.lessthanorequal(t)
    }, pe.greaterthanorequal = function(e, t) {
        return e.greaterthanorequal(t)
    }, _.prototype = new a, _.prototype.constructor = _, _.superclass = a.prototype, _.prototype.init = function(e) {
        this.str = e + ""
    }, _.prototype.toString = function() {
        return this.str
    }, _.prototype.evaluate = function() {
        return this
    }, _.prototype.string = function() {
        return this
    }, _.prototype.number = function() {
        return new F(this.str)
    }, _.prototype.bool = function() {
        return new B(this.str)
    }, _.prototype.nodeset = function() {
        throw new Error("Cannot convert string to nodeset")
    }, _.prototype.stringValue = function() {
        return this.str
    }, _.prototype.numberValue = function() {
        return this.number().numberValue()
    }, _.prototype.booleanValue = function() {
        return this.bool().booleanValue()
    }, _.prototype.equals = function(e) {
        return ue.instance_of(e, B) ? this.bool().equals(e) : ue.instance_of(e, F) ? this.number().equals(e) : ue.instance_of(e, G) ? e.compareWithString(this, pe.equals) : new B(this.str == e.str)
    }, _.prototype.notequal = function(e) {
        return ue.instance_of(e, B) ? this.bool().notequal(e) : ue.instance_of(e, F) ? this.number().notequal(e) : ue.instance_of(e, G) ? e.compareWithString(this, pe.notequal) : new B(this.str != e.str)
    }, _.prototype.lessthan = function(e) {
        return this.number().lessthan(e)
    }, _.prototype.greaterthan = function(e) {
        return this.number().greaterthan(e)
    }, _.prototype.lessthanorequal = function(e) {
        return this.number().lessthanorequal(e)
    }, _.prototype.greaterthanorequal = function(e) {
        return this.number().greaterthanorequal(e)
    }, F.prototype = new a, F.prototype.constructor = F, F.superclass = a.prototype, F.prototype.init = function(e) {
        this.num = "string" == typeof e ? this.parse(e) : +e
    }, F.prototype.numberFormat = /^\s*-?[0-9]*\.?[0-9]+\s*$/, F.prototype.parse = function(e) {
        return this.numberFormat.test(e) ? parseFloat(e) : Number.NaN
    }, F.prototype.toString = function() {
        var e = this.num.toString();
        return -1 === e.indexOf("e-") ? -1 === e.indexOf("e") ? e : V(e) : U(e)
    }, F.prototype.evaluate = function() {
        return this
    }, F.prototype.string = function() {
        return new _(this.toString())
    }, F.prototype.number = function() {
        return this
    }, F.prototype.bool = function() {
        return new B(this.num)
    }, F.prototype.nodeset = function() {
        throw new Error("Cannot convert number to nodeset")
    }, F.prototype.stringValue = function() {
        return this.string().stringValue()
    }, F.prototype.numberValue = function() {
        return this.num
    }, F.prototype.booleanValue = function() {
        return this.bool().booleanValue()
    }, F.prototype.negate = function() {
        return new F(-this.num)
    }, F.prototype.equals = function(e) {
        return ue.instance_of(e, B) ? this.bool().equals(e) : ue.instance_of(e, _) ? this.equals(e.number()) : ue.instance_of(e, G) ? e.compareWithNumber(this, pe.equals) : new B(this.num == e.num)
    }, F.prototype.notequal = function(e) {
        return ue.instance_of(e, B) ? this.bool().notequal(e) : ue.instance_of(e, _) ? this.notequal(e.number()) : ue.instance_of(e, G) ? e.compareWithNumber(this, pe.notequal) : new B(this.num != e.num)
    }, F.prototype.lessthan = function(e) {
        return ue.instance_of(e, G) ? e.compareWithNumber(this, pe.greaterthan) : ue.instance_of(e, B) || ue.instance_of(e, _) ? this.lessthan(e.number()) : new B(this.num < e.num)
    }, F.prototype.greaterthan = function(e) {
        return ue.instance_of(e, G) ? e.compareWithNumber(this, pe.lessthan) : ue.instance_of(e, B) || ue.instance_of(e, _) ? this.greaterthan(e.number()) : new B(this.num > e.num)
    }, F.prototype.lessthanorequal = function(e) {
        return ue.instance_of(e, G) ? e.compareWithNumber(this, pe.greaterthanorequal) : ue.instance_of(e, B) || ue.instance_of(e, _) ? this.lessthanorequal(e.number()) : new B(this.num <= e.num)
    }, F.prototype.greaterthanorequal = function(e) {
        return ue.instance_of(e, G) ? e.compareWithNumber(this, pe.lessthanorequal) : ue.instance_of(e, B) || ue.instance_of(e, _) ? this.greaterthanorequal(e.number()) : new B(this.num >= e.num)
    }, F.prototype.plus = function(e) {
        return new F(this.num + e.num)
    }, F.prototype.minus = function(e) {
        return new F(this.num - e.num)
    }, F.prototype.multiply = function(e) {
        return new F(this.num * e.num)
    }, F.prototype.div = function(e) {
        return new F(this.num / e.num)
    }, F.prototype.mod = function(e) {
        return new F(this.num % e.num)
    }, B.prototype = new a, B.prototype.constructor = B, B.superclass = a.prototype, B.prototype.init = function(e) {
        this.b = !!e
    }, B.prototype.toString = function() {
        return this.b.toString()
    }, B.prototype.evaluate = function() {
        return this
    }, B.prototype.string = function() {
        return new _(this.b)
    }, B.prototype.number = function() {
        return new F(this.b)
    }, B.prototype.bool = function() {
        return this
    }, B.prototype.nodeset = function() {
        throw new Error("Cannot convert boolean to nodeset")
    }, B.prototype.stringValue = function() {
        return this.string().stringValue()
    }, B.prototype.numberValue = function() {
        return this.number().numberValue()
    }, B.prototype.booleanValue = function() {
        return this.b
    }, B.prototype.not = function() {
        return new B(!this.b)
    }, B.prototype.equals = function(e) {
        return ue.instance_of(e, _) || ue.instance_of(e, F) ? this.equals(e.bool()) : ue.instance_of(e, G) ? e.compareWithBoolean(this, pe.equals) : new B(this.b == e.b)
    }, B.prototype.notequal = function(e) {
        return ue.instance_of(e, _) || ue.instance_of(e, F) ? this.notequal(e.bool()) : ue.instance_of(e, G) ? e.compareWithBoolean(this, pe.notequal) : new B(this.b != e.b)
    }, B.prototype.lessthan = function(e) {
        return this.number().lessthan(e)
    }, B.prototype.greaterthan = function(e) {
        return this.number().greaterthan(e)
    }, B.prototype.lessthanorequal = function(e) {
        return this.number().lessthanorequal(e)
    }, B.prototype.greaterthanorequal = function(e) {
        return this.number().greaterthanorequal(e)
    }, B.true_ = new B(!0), B.false_ = new B(!1), M.prototype = {}, M.prototype.constructor = M, M.superclass = Object.prototype, M.prototype.init = function(e) {
        this.left = null, this.right = null, this.node = e, this.depth = 1
    }, M.prototype.balance = function() {
        var e = null == this.left ? 0 : this.left.depth,
            t = null == this.right ? 0 : this.right.depth;
        if (e > t + 1) {
            var r = null == this.left.left ? 0 : this.left.left.depth,
                o = null == this.left.right ? 0 : this.left.right.depth;
            r < o && this.left.rotateRR(), this.rotateLL()
        } else if (e + 1 < t) {
            var n = null == this.right.right ? 0 : this.right.right.depth,
                s = null == this.right.left ? 0 : this.right.left.depth;
            s > n && this.right.rotateLL(), this.rotateRR()
        }
    }, M.prototype.rotateLL = function() {
        var e = this.node,
            t = this.right;
        this.node = this.left.node, this.right = this.left, this.left = this.left.left, this.right.left = this.right.right, this.right.right = t, this.right.node = e, this.right.updateInNewLocation(), this.updateInNewLocation()
    }, M.prototype.rotateRR = function() {
        var e = this.node,
            t = this.left;
        this.node = this.right.node, this.left = this.right, this.right = this.right.right, this.left.right = this.left.left, this.left.left = t, this.left.node = e, this.left.updateInNewLocation(), this.updateInNewLocation()
    }, M.prototype.updateInNewLocation = function() {
        this.getDepthFromChildren()
    }, M.prototype.getDepthFromChildren = function() {
        this.depth = null == this.node ? 0 : 1, null != this.left && (this.depth = this.left.depth + 1), null != this.right && this.depth <= this.right.depth && (this.depth = this.right.depth + 1)
    }, M.prototype.add = function(e) {
        if (e === this.node) return !1;
        var t = H(e, this.node),
            r = !1;
        return -1 == t ? null == this.left ? (this.left = new M(e), r = !0) : (r = this.left.add(e), r && this.balance()) : 1 == t && (null == this.right ? (this.right = new M(e), r = !0) : (r = this.right.add(e), r && this.balance())), r && this.getDepthFromChildren(), r
    }, G.prototype = new a, G.prototype.constructor = G, G.superclass = a.prototype, G.prototype.init = function() {
        this.tree = null, this.nodes = [], this.size = 0
    }, G.prototype.toString = function() {
        var e = this.first();
        return null == e ? "" : this.stringForNode(e)
    }, G.prototype.evaluate = function() {
        return this
    }, G.prototype.string = function() {
        return new _(this.toString())
    }, G.prototype.stringValue = function() {
        return this.toString()
    }, G.prototype.number = function() {
        return new F(this.string())
    }, G.prototype.numberValue = function() {
        return +this.string()
    }, G.prototype.bool = function() {
        return new B(this.booleanValue())
    }, G.prototype.booleanValue = function() {
        return !!this.size
    }, G.prototype.nodeset = function() {
        return this
    }, G.prototype.stringForNode = function(e) {
        return 9 == e.nodeType || 1 == e.nodeType || 11 === e.nodeType ? this.stringForContainerNode(e) : 2 === e.nodeType ? e.value || e.nodeValue : e.isNamespaceNode ? e.namespace : e.nodeValue
    }, G.prototype.stringForContainerNode = function(e) {
        for (var t, r = "", o = e.firstChild; null != o; o = o.nextSibling) t = o.nodeType, (1 === t || 3 === t || 4 === t || 9 === t || 11 === t) && (r += this.stringForNode(o));
        return r
    }, G.prototype.buildTree = function() {
        if (!this.tree && this.nodes.length) {
            this.tree = new M(this.nodes[0]);
            for (var e = 1; e < this.nodes.length; e += 1) this.tree.add(this.nodes[e])
        }
        return this.tree
    }, G.prototype.first = function() {
        var e = this.buildTree();
        if (null == e) return null;
        for (; null != e.left;) e = e.left;
        return e.node
    }, G.prototype.add = function(e) {
        for (var t = 0; t < this.nodes.length; t += 1)
            if (e === this.nodes[t]) return;
        this.tree = null, this.nodes.push(e), this.size += 1
    }, G.prototype.addArray = function(e) {
        var t = this;
        z(function(e) {
            t.add(e)
        }, e)
    }, G.prototype.toArray = function() {
        var e = [];
        return this.toArrayRec(this.buildTree(), e), e
    }, G.prototype.toArrayRec = function(e, t) {
        null != e && (this.toArrayRec(e.left, t), t.push(e.node), this.toArrayRec(e.right, t))
    }, G.prototype.toUnsortedArray = function() {
        return this.nodes.slice()
    }, G.prototype.compareWithString = function(e, t) {
        for (var r = this.toUnsortedArray(), o = 0; o < r.length; o++) {
            var s = r[o],
                n = new _(this.stringForNode(s)),
                a = t(n, e);
            if (a.booleanValue()) return a
        }
        return new B(!1)
    }, G.prototype.compareWithNumber = function(e, t) {
        for (var r = this.toUnsortedArray(), o = 0; o < r.length; o++) {
            var s = r[o],
                n = new F(this.stringForNode(s)),
                a = t(n, e);
            if (a.booleanValue()) return a
        }
        return new B(!1)
    }, G.prototype.compareWithBoolean = function(e, t) {
        return t(this.bool(), e)
    }, G.prototype.compareWithNodeSet = function(e, t) {
        for (var r = this.toUnsortedArray(), o = function(e, r) {
                return t(r, e)
            }, n = 0; n < r.length; n++) {
            var s = new _(this.stringForNode(r[n])),
                a = e.compareWithString(s, o);
            if (a.booleanValue()) return a
        }
        return new B(!1)
    }, G.compareWith = e(function(e, t) {
        return ue.instance_of(t, _) ? this.compareWithString(t, e) : ue.instance_of(t, F) ? this.compareWithNumber(t, e) : ue.instance_of(t, B) ? this.compareWithBoolean(t, e) : this.compareWithNodeSet(t, e)
    }), G.prototype.equals = G.compareWith(pe.equals), G.prototype.notequal = G.compareWith(pe.notequal), G.prototype.lessthan = G.compareWith(pe.lessthan), G.prototype.greaterthan = G.compareWith(pe.greaterthan), G.prototype.lessthanorequal = G.compareWith(pe.lessthanorequal), G.prototype.greaterthanorequal = G.compareWith(pe.greaterthanorequal), G.prototype.union = function(e) {
        var t = new G;
        return t.addArray(this.toUnsortedArray()), t.addArray(e.toUnsortedArray()), t
    }, W.prototype = {}, W.prototype.constructor = W, W.superclass = Object.prototype, W.prototype.toString = function() {
        return "{ \"" + this.prefix + "\", \"" + this.namespaceURI + "\" }"
    }, Y.prototype = {}, Y.prototype.constructor = Y, Y.superclass = Object.prototype, Y.prototype.extend = function(e) {
        return n(new Y, this, e)
    }, q.prototype = {}, q.prototype.constructor = q, q.superclass = Object.prototype, q.prototype.getVariable = function() {
        return null
    }, w.prototype = {}, w.prototype.constructor = w, w.superclass = Object.prototype, w.prototype.addStandardFunctions = function() {
        this.functions["{}last"] = ie.last, this.functions["{}position"] = ie.position, this.functions["{}count"] = ie.count, this.functions["{}id"] = ie.id, this.functions["{}local-name"] = ie.localName, this.functions["{}namespace-uri"] = ie.namespaceURI, this.functions["{}name"] = ie.name, this.functions["{}string"] = ie.string, this.functions["{}concat"] = ie.concat, this.functions["{}starts-with"] = ie.startsWith, this.functions["{}contains"] = ie.contains, this.functions["{}substring-before"] = ie.substringBefore, this.functions["{}substring-after"] = ie.substringAfter, this.functions["{}substring"] = ie.substring, this.functions["{}string-length"] = ie.stringLength, this.functions["{}normalize-space"] = ie.normalizeSpace, this.functions["{}translate"] = ie.translate, this.functions["{}boolean"] = ie.boolean_, this.functions["{}not"] = ie.not, this.functions["{}true"] = ie.true_, this.functions["{}false"] = ie.false_, this.functions["{}lang"] = ie.lang, this.functions["{}number"] = ie.number, this.functions["{}sum"] = ie.sum, this.functions["{}floor"] = ie.floor, this.functions["{}ceiling"] = ie.ceiling, this.functions["{}round"] = ie.round
    }, w.prototype.addFunction = function(e, t, r) {
        this.functions["{" + e + "}" + t] = r
    }, w.getFunctionFromContext = function(e, t) {
        var r = ue.resolveQName(e, t.namespaceResolver, t.contextNode, !1);
        if (null === r[0]) throw new Error("Cannot resolve QName " + name);
        return t.functionResolver.getFunction(r[1], r[0])
    }, w.prototype.getFunction = function(e, t) {
        return this.functions["{" + t + "}" + e]
    }, Q.prototype = {}, Q.prototype.constructor = Q, Q.superclass = Object.prototype, Q.prototype.getNamespace = function(e, t) {
        if ("xml" == e) return u.XML_NAMESPACE_URI;
        if ("xmlns" == e) return u.XMLNS_NAMESPACE_URI;
        for (9 == t.nodeType ? t = t.documentElement : 2 == t.nodeType ? t = I.getOwnerElement(t) : 1 != t.nodeType && (t = t.parentNode); null != t && 1 == t.nodeType;) {
            for (var r = t.attributes, o = 0; o < r.length; o++) {
                var n = r.item(o),
                    s = n.name || n.nodeName;
                if ("xmlns" === s && "" === e || s === "xmlns:" + e) return (n.value || n.nodeValue) + ""
            }
            t = t.parentNode
        }
        return null
    };
    var ie = {};
    ie.last = function(e) {
        if (1 != arguments.length) throw new Error("Function last expects ()");
        return new F(e.contextSize)
    }, ie.position = function(e) {
        if (1 != arguments.length) throw new Error("Function position expects ()");
        return new F(e.contextPosition)
    }, ie.count = function() {
        var e, t = arguments[0];
        if (2 != arguments.length || !ue.instance_of(e = arguments[1].evaluate(t), G)) throw new Error("Function count expects (node-set)");
        return new F(e.size)
    }, ie.id = function() {
        var e, t = arguments[0];
        if (2 != arguments.length) throw new Error("Function id expects (object)");
        e = arguments[1].evaluate(t), e = ue.instance_of(e, G) ? e.toArray().join(" ") : e.stringValue();
        for (var r = e.split(/[\x0d\x0a\x09\x20]+/), o = 0, s = new G, a = 9 == t.contextNode.nodeType ? t.contextNode : t.contextNode.ownerDocument, p = 0; p < r.length; p++) {
            var i;
            i = a.getElementById ? a.getElementById(r[p]) : ue.getElementById(a, r[p]), null != i && (s.add(i), o++)
        }
        return s
    }, ie.localName = function(e, t) {
        var r;
        if (1 == arguments.length) r = e.contextNode;
        else if (2 == arguments.length) r = t.evaluate(e).first();
        else throw new Error("Function local-name expects (node-set?)");
        return null == r ? new _("") : new _(r.localName || r.baseName || r.target || r.nodeName || "")
    }, ie.namespaceURI = function() {
        var e, t = arguments[0];
        if (1 == arguments.length) e = t.contextNode;
        else if (2 == arguments.length) e = arguments[1].evaluate(t).first();
        else throw new Error("Function namespace-uri expects (node-set?)");
        return null == e ? new _("") : new _(e.namespaceURI)
    }, ie.name = function() {
        var e, t = arguments[0];
        if (1 == arguments.length) e = t.contextNode;
        else if (2 == arguments.length) e = arguments[1].evaluate(t).first();
        else throw new Error("Function name expects (node-set?)");
        return null == e ? new _("") : 1 == e.nodeType ? new _(e.nodeName) : 2 == e.nodeType ? new _(e.name || e.nodeName) : 7 === e.nodeType ? new _(e.target || e.nodeName) : null == e.localName ? new _("") : new _(e.localName)
    }, ie.string = function() {
        var e = arguments[0];
        if (1 == arguments.length) return new _(G.prototype.stringForNode(e.contextNode));
        if (2 == arguments.length) return arguments[1].evaluate(e).string();
        throw new Error("Function string expects (object?)")
    }, ie.concat = function(e) {
        if (3 > arguments.length) throw new Error("Function concat expects (string, string[, string]*)");
        for (var t = "", r = 1; r < arguments.length; r++) t += arguments[r].evaluate(e).stringValue();
        return new _(t)
    }, ie.startsWith = function() {
        var e = arguments[0];
        if (3 != arguments.length) throw new Error("Function startsWith expects (string, string)");
        var t = arguments[1].evaluate(e).stringValue(),
            r = arguments[2].evaluate(e).stringValue();
        return new B(t.substring(0, r.length) == r)
    }, ie.contains = function() {
        var e = arguments[0];
        if (3 != arguments.length) throw new Error("Function contains expects (string, string)");
        var t = arguments[1].evaluate(e).stringValue(),
            r = arguments[2].evaluate(e).stringValue();
        return new B(-1 !== t.indexOf(r))
    }, ie.substringBefore = function() {
        var e = arguments[0];
        if (3 != arguments.length) throw new Error("Function substring-before expects (string, string)");
        var t = arguments[1].evaluate(e).stringValue(),
            r = arguments[2].evaluate(e).stringValue();
        return new _(t.substring(0, t.indexOf(r)))
    }, ie.substringAfter = function() {
        var e = arguments[0];
        if (3 != arguments.length) throw new Error("Function substring-after expects (string, string)");
        var t = arguments[1].evaluate(e).stringValue(),
            r = arguments[2].evaluate(e).stringValue();
        if (0 == r.length) return new _(t);
        var o = t.indexOf(r);
        return -1 == o ? new _("") : new _(t.substring(o + r.length))
    }, ie.substring = function() {
        var e = arguments[0];
        if (3 != arguments.length && 4 != arguments.length) throw new Error("Function substring expects (string, number, number?)");
        var t = arguments[1].evaluate(e).stringValue(),
            r = Z(arguments[2].evaluate(e).numberValue()) - 1,
            o = 4 == arguments.length ? r + Z(arguments[3].evaluate(e).numberValue()) : void 0;
        return new _(t.substring(r, o))
    }, ie.stringLength = function() {
        var e, t = arguments[0];
        if (1 == arguments.length) e = G.prototype.stringForNode(t.contextNode);
        else if (2 == arguments.length) e = arguments[1].evaluate(t).stringValue();
        else throw new Error("Function string-length expects (string?)");
        return new F(e.length)
    }, ie.normalizeSpace = function() {
        var e, r = arguments[0];
        if (1 == arguments.length) e = G.prototype.stringForNode(r.contextNode);
        else if (2 == arguments.length) e = arguments[1].evaluate(r).stringValue();
        else throw new Error("Function normalize-space expects (string?)");
        for (var o = 0, n = e.length - 1; ue.isSpace(e.charCodeAt(n));) n--;
        for (var s = ""; o <= n && ue.isSpace(e.charCodeAt(o));) o++;
        for (; o <= n;)
            if (ue.isSpace(e.charCodeAt(o)))
                for (s += " "; o <= n && ue.isSpace(e.charCodeAt(o));) o++;
            else s += e.charAt(o), o++;
        return new _(s)
    }, ie.translate = function(e, r, o, n) {
        if (4 != arguments.length) throw new Error("Function translate expects (string, string, string)");
        var s = r.evaluate(e).stringValue(),
            a = o.evaluate(e).stringValue(),
            p = n.evaluate(e).stringValue(),
            i = ee(function(e, t, r) {
                return t in e || (e[t] = r > p.length ? "" : p[r]), e
            }, {}, a),
            u = se("", te(function(e) {
                return e in i ? i[e] : e
            }, s));
        return new _(u)
    }, ie.boolean_ = function() {
        var e = arguments[0];
        if (2 != arguments.length) throw new Error("Function boolean expects (object)");
        return arguments[1].evaluate(e).bool()
    }, ie.not = function(e, t) {
        if (2 != arguments.length) throw new Error("Function not expects (object)");
        return t.evaluate(e).bool().not()
    }, ie.true_ = function() {
        if (1 != arguments.length) throw new Error("Function true expects ()");
        return B.true_
    }, ie.false_ = function() {
        if (1 != arguments.length) throw new Error("Function false expects ()");
        return B.false_
    }, ie.lang = function() {
        var e = arguments[0];
        if (2 != arguments.length) throw new Error("Function lang expects (string)");
        for (var t, r, o = e.contextNode; null != o && 9 != o.nodeType; o = o.parentNode)
            if (r = o.getAttributeNS(u.XML_NAMESPACE_URI, "lang"), null != r) {
                t = r + "";
                break
            }
        if (null == t) return B.false_;
        var n = arguments[1].evaluate(e).stringValue();
        return new B(t.substring(0, n.length) == n && (t.length == n.length || "-" == t.charAt(n.length)))
    }, ie.number = function() {
        var e = arguments[0];
        if (1 != arguments.length && 2 != arguments.length) throw new Error("Function number expects (object?)");
        return 1 == arguments.length ? new F(G.prototype.stringForNode(e.contextNode)) : arguments[1].evaluate(e).number()
    }, ie.sum = function() {
        var e, t = arguments[0];
        if (2 != arguments.length || !ue.instance_of(e = arguments[1].evaluate(t), G)) throw new Error("Function sum expects (node-set)");
        e = e.toUnsortedArray();
        for (var r = 0, o = 0; o < e.length; o++) r += new F(G.prototype.stringForNode(e[o])).numberValue();
        return new F(r)
    }, ie.floor = function() {
        var e = arguments[0];
        if (2 != arguments.length) throw new Error("Function floor expects (number)");
        return new F(Math.floor(arguments[1].evaluate(e).numberValue()))
    }, ie.ceiling = function() {
        var e = arguments[0];
        if (2 != arguments.length) throw new Error("Function ceiling expects (number)");
        return new F(Math.ceil(arguments[1].evaluate(e).numberValue()))
    }, ie.round = function() {
        var e = arguments[0];
        if (2 != arguments.length) throw new Error("Function round expects (number)");
        return new F(Z(arguments[1].evaluate(e).numberValue()))
    };
    var ue = {};
    ue.isAttribute = function(e) {
        return e && (2 === e.nodeType || e.ownerElement)
    }, ue.splitQName = function(e) {
        var t = e.indexOf(":");
        return -1 == t ? [null, e] : [e.substring(0, t), e.substring(t + 1)]
    }, ue.resolveQName = function(e, t, r, o) {
        var n = ue.splitQName(e);
        return null == n[0] ? o ? (n[0] = t.getNamespace("", r), null == n[0] && (n[0] = "")) : n[0] = "" : n[0] = t.getNamespace(n[0], r), n
    }, ue.isSpace = function(e) {
        return 9 == e || 13 == e || 10 == e || 32 == e
    }, ue.isLetter = function(e) {
        return 65 <= e && 90 >= e || 97 <= e && 122 >= e || 192 <= e && 214 >= e || 216 <= e && 246 >= e || 248 <= e && 255 >= e || 256 <= e && 305 >= e || 308 <= e && 318 >= e || 321 <= e && 328 >= e || 330 <= e && 382 >= e || 384 <= e && 451 >= e || 461 <= e && 496 >= e || 500 <= e && 501 >= e || 506 <= e && 535 >= e || 592 <= e && 680 >= e || 699 <= e && 705 >= e || 902 == e || 904 <= e && 906 >= e || 908 == e || 910 <= e && 929 >= e || 931 <= e && 974 >= e || 976 <= e && 982 >= e || 986 == e || 988 == e || 990 == e || 992 == e || 994 <= e && 1011 >= e || 1025 <= e && 1036 >= e || 1038 <= e && 1103 >= e || 1105 <= e && 1116 >= e || 1118 <= e && 1153 >= e || 1168 <= e && 1220 >= e || 1223 <= e && 1224 >= e || 1227 <= e && 1228 >= e || 1232 <= e && 1259 >= e || 1262 <= e && 1269 >= e || 1272 <= e && 1273 >= e || 1329 <= e && 1366 >= e || 1369 == e || 1377 <= e && 1414 >= e || 1488 <= e && 1514 >= e || 1520 <= e && 1522 >= e || 1569 <= e && 1594 >= e || 1601 <= e && 1610 >= e || 1649 <= e && 1719 >= e || 1722 <= e && 1726 >= e || 1728 <= e && 1742 >= e || 1744 <= e && 1747 >= e || 1749 == e || 1765 <= e && 1766 >= e || 2309 <= e && 2361 >= e || 2365 == e || 2392 <= e && 2401 >= e || 2437 <= e && 2444 >= e || 2447 <= e && 2448 >= e || 2451 <= e && 2472 >= e || 2474 <= e && 2480 >= e || 2482 == e || 2486 <= e && 2489 >= e || 2524 <= e && 2525 >= e || 2527 <= e && 2529 >= e || 2544 <= e && 2545 >= e || 2565 <= e && 2570 >= e || 2575 <= e && 2576 >= e || 2579 <= e && 2600 >= e || 2602 <= e && 2608 >= e || 2610 <= e && 2611 >= e || 2613 <= e && 2614 >= e || 2616 <= e && 2617 >= e || 2649 <= e && 2652 >= e || 2654 == e || 2674 <= e && 2676 >= e || 2693 <= e && 2699 >= e || 2701 == e || 2703 <= e && 2705 >= e || 2707 <= e && 2728 >= e || 2730 <= e && 2736 >= e || 2738 <= e && 2739 >= e || 2741 <= e && 2745 >= e || 2749 == e || 2784 == e || 2821 <= e && 2828 >= e || 2831 <= e && 2832 >= e || 2835 <= e && 2856 >= e || 2858 <= e && 2864 >= e || 2866 <= e && 2867 >= e || 2870 <= e && 2873 >= e || 2877 == e || 2908 <= e && 2909 >= e || 2911 <= e && 2913 >= e || 2949 <= e && 2954 >= e || 2958 <= e && 2960 >= e || 2962 <= e && 2965 >= e || 2969 <= e && 2970 >= e || 2972 == e || 2974 <= e && 2975 >= e || 2979 <= e && 2980 >= e || 2984 <= e && 2986 >= e || 2990 <= e && 2997 >= e || 2999 <= e && 3001 >= e || 3077 <= e && 3084 >= e || 3086 <= e && 3088 >= e || 3090 <= e && 3112 >= e || 3114 <= e && 3123 >= e || 3125 <= e && 3129 >= e || 3168 <= e && 3169 >= e || 3205 <= e && 3212 >= e || 3214 <= e && 3216 >= e || 3218 <= e && 3240 >= e || 3242 <= e && 3251 >= e || 3253 <= e && 3257 >= e || 3294 == e || 3296 <= e && 3297 >= e || 3333 <= e && 3340 >= e || 3342 <= e && 3344 >= e || 3346 <= e && 3368 >= e || 3370 <= e && 3385 >= e || 3424 <= e && 3425 >= e || 3585 <= e && 3630 >= e || 3632 == e || 3634 <= e && 3635 >= e || 3648 <= e && 3653 >= e || 3713 <= e && 3714 >= e || 3716 == e || 3719 <= e && 3720 >= e || 3722 == e || 3725 == e || 3732 <= e && 3735 >= e || 3737 <= e && 3743 >= e || 3745 <= e && 3747 >= e || 3749 == e || 3751 == e || 3754 <= e && 3755 >= e || 3757 <= e && 3758 >= e || 3760 == e || 3762 <= e && 3763 >= e || 3773 == e || 3776 <= e && 3780 >= e || 3904 <= e && 3911 >= e || 3913 <= e && 3945 >= e || 4256 <= e && 4293 >= e || 4304 <= e && 4342 >= e || 4352 == e || 4354 <= e && 4355 >= e || 4357 <= e && 4359 >= e || 4361 == e || 4363 <= e && 4364 >= e || 4366 <= e && 4370 >= e || 4412 == e || 4414 == e || 4416 == e || 4428 == e || 4430 == e || 4432 == e || 4436 <= e && 4437 >= e || 4441 == e || 4447 <= e && 4449 >= e || 4451 == e || 4453 == e || 4455 == e || 4457 == e || 4461 <= e && 4462 >= e || 4466 <= e && 4467 >= e || 4469 == e || 4510 == e || 4520 == e || 4523 == e || 4526 <= e && 4527 >= e || 4535 <= e && 4536 >= e || 4538 == e || 4540 <= e && 4546 >= e || 4587 == e || 4592 == e || 4601 == e || 7680 <= e && 7835 >= e || 7840 <= e && 7929 >= e || 7936 <= e && 7957 >= e || 7960 <= e && 7965 >= e || 7968 <= e && 8005 >= e || 8008 <= e && 8013 >= e || 8016 <= e && 8023 >= e || 8025 == e || 8027 == e || 8029 == e || 8031 <= e && 8061 >= e || 8064 <= e && 8116 >= e || 8118 <= e && 8124 >= e || 8126 == e || 8130 <= e && 8132 >= e || 8134 <= e && 8140 >= e || 8144 <= e && 8147 >= e || 8150 <= e && 8155 >= e || 8160 <= e && 8172 >= e || 8178 <= e && 8180 >= e || 8182 <= e && 8188 >= e || 8486 == e || 8490 <= e && 8491 >= e || 8494 == e || 8576 <= e && 8578 >= e || 12353 <= e && 12436 >= e || 12449 <= e && 12538 >= e || 12549 <= e && 12588 >= e || 44032 <= e && 55203 >= e || 19968 <= e && 40869 >= e || 12295 == e || 12321 <= e && 12329 >= e
    }, ue.isNCNameChar = function(e) {
        return 48 <= e && 57 >= e || 1632 <= e && 1641 >= e || 1776 <= e && 1785 >= e || 2406 <= e && 2415 >= e || 2534 <= e && 2543 >= e || 2662 <= e && 2671 >= e || 2790 <= e && 2799 >= e || 2918 <= e && 2927 >= e || 3047 <= e && 3055 >= e || 3174 <= e && 3183 >= e || 3302 <= e && 3311 >= e || 3430 <= e && 3439 >= e || 3664 <= e && 3673 >= e || 3792 <= e && 3801 >= e || 3872 <= e && 3881 >= e || 46 == e || 45 == e || 95 == e || ue.isLetter(e) || 768 <= e && 837 >= e || 864 <= e && 865 >= e || 1155 <= e && 1158 >= e || 1425 <= e && 1441 >= e || 1443 <= e && 1465 >= e || 1467 <= e && 1469 >= e || 1471 == e || 1473 <= e && 1474 >= e || 1476 == e || 1611 <= e && 1618 >= e || 1648 == e || 1750 <= e && 1756 >= e || 1757 <= e && 1759 >= e || 1760 <= e && 1764 >= e || 1767 <= e && 1768 >= e || 1770 <= e && 1773 >= e || 2305 <= e && 2307 >= e || 2364 == e || 2366 <= e && 2380 >= e || 2381 == e || 2385 <= e && 2388 >= e || 2402 <= e && 2403 >= e || 2433 <= e && 2435 >= e || 2492 == e || 2494 == e || 2495 == e || 2496 <= e && 2500 >= e || 2503 <= e && 2504 >= e || 2507 <= e && 2509 >= e || 2519 == e || 2530 <= e && 2531 >= e || 2562 == e || 2620 == e || 2622 == e || 2623 == e || 2624 <= e && 2626 >= e || 2631 <= e && 2632 >= e || 2635 <= e && 2637 >= e || 2672 <= e && 2673 >= e || 2689 <= e && 2691 >= e || 2748 == e || 2750 <= e && 2757 >= e || 2759 <= e && 2761 >= e || 2763 <= e && 2765 >= e || 2817 <= e && 2819 >= e || 2876 == e || 2878 <= e && 2883 >= e || 2887 <= e && 2888 >= e || 2891 <= e && 2893 >= e || 2902 <= e && 2903 >= e || 2946 <= e && 2947 >= e || 3006 <= e && 3010 >= e || 3014 <= e && 3016 >= e || 3018 <= e && 3021 >= e || 3031 == e || 3073 <= e && 3075 >= e || 3134 <= e && 3140 >= e || 3142 <= e && 3144 >= e || 3146 <= e && 3149 >= e || 3157 <= e && 3158 >= e || 3202 <= e && 3203 >= e || 3262 <= e && 3268 >= e || 3270 <= e && 3272 >= e || 3274 <= e && 3277 >= e || 3285 <= e && 3286 >= e || 3330 <= e && 3331 >= e || 3390 <= e && 3395 >= e || 3398 <= e && 3400 >= e || 3402 <= e && 3405 >= e || 3415 == e || 3633 == e || 3636 <= e && 3642 >= e || 3655 <= e && 3662 >= e || 3761 == e || 3764 <= e && 3769 >= e || 3771 <= e && 3772 >= e || 3784 <= e && 3789 >= e || 3864 <= e && 3865 >= e || 3893 == e || 3895 == e || 3897 == e || 3902 == e || 3903 == e || 3953 <= e && 3972 >= e || 3974 <= e && 3979 >= e || 3984 <= e && 3989 >= e || 3991 == e || 3993 <= e && 4013 >= e || 4017 <= e && 4023 >= e || 4025 == e || 8400 <= e && 8412 >= e || 8417 == e || 12330 <= e && 12335 >= e || 12441 == e || 12442 == e || 183 == e || 720 == e || 721 == e || 903 == e || 1600 == e || 3654 == e || 3782 == e || 12293 == e || 12337 <= e && 12341 >= e || 12445 <= e && 12446 >= e || 12540 <= e && 12542 >= e
    }, ue.coalesceText = function(e) {
        for (var t = e.firstChild; null != t; t = t.nextSibling)
            if (3 == t.nodeType || 4 == t.nodeType) {
                var r = t.nodeValue,
                    o = t;
                for (t = t.nextSibling; null != t && (3 == t.nodeType || 4 == t.nodeType);) {
                    r += t.nodeValue;
                    var n = t;
                    t = t.nextSibling, n.parentNode.removeChild(n)
                }
                if (4 == o.nodeType) {
                    var s = o.parentNode;
                    if (null == o.nextSibling) s.removeChild(o), s.appendChild(s.ownerDocument.createTextNode(r));
                    else {
                        var a = o.nextSibling;
                        s.removeChild(o), s.insertBefore(s.ownerDocument.createTextNode(r), a)
                    }
                } else o.nodeValue = r;
                if (null == t) break
            } else 1 == t.nodeType && ue.coalesceText(t)
    }, ue.instance_of = function(e, t) {
        for (; null != e;) {
            if (e.constructor === t) return !0;
            if (e === Object) return !1;
            e = e.constructor.superclass
        }
        return !1
    }, ue.getElementById = function(e, t) {
        if (1 == e.nodeType && (e.getAttribute("id") == t || e.getAttributeNS(null, "id") == t)) return e;
        for (var r, o = e.firstChild; null != o; o = o.nextSibling)
            if (r = ue.getElementById(o, t), null != r) return r;
        return null
    };
    var le = function() {
        function e(e, r) {
            var o = r ? ": " + r.toString() : "";
            return e === t.INVALID_EXPRESSION_ERR ? "Invalid expression" + o : e === t.TYPE_ERR ? "Type error" + o : null
        }

        function t(t, r, o) {
            var n = Error.call(this, e(t, r) || o);
            return n.code = t, n.exception = r, n
        }
        return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t.superclass = Error, t.prototype.toString = function() {
            return this.message
        }, t.fromMessage = function(e, r) {
            return new t(null, r, e)
        }, t.INVALID_EXPRESSION_ERR = 51, t.TYPE_ERR = 52, t
    }();
    J.prototype = {}, J.prototype.constructor = J, J.superclass = Object.prototype, J.getOwnerDocument = function(e) {
        return 9 === e.nodeType ? e : e.ownerDocument
    }, J.detectHtmlDom = function(e) {
        if (!e) return !1;
        var t = J.getOwnerDocument(e);
        try {
            return t.implementation.hasFeature("HTML", "2.0")
        } catch (t) {
            return !0
        }
    }, J.prototype.evaluate = function(e, r) {
        this.context.expressionContextNode = e, this.context.caseInsensitive = J.detectHtmlDom(e);
        var t = this.xpath.evaluate(this.context);
        return new $(t, r)
    }, X.prototype = {}, X.prototype.constructor = X, X.superclass = Object.prototype, X.prototype.getNamespace = function(e) {
        return null == this.xpathNSResolver ? null : this.xpathNSResolver.lookupNamespaceURI(e)
    }, K.prototype = {}, K.prototype.constructor = K, K.superclass = Object.prototype, K.prototype.lookupNamespaceURI = function(e) {
        return this.namespaceResolver.getNamespace(e, this.node)
    }, $.prototype = {}, $.prototype.constructor = $, $.superclass = Object.prototype;
    $.prototype.iterateNext = function() {
        if (this.resultType != $.UNORDERED_NODE_ITERATOR_TYPE && this.resultType != $.ORDERED_NODE_ITERATOR_TYPE) throw new le(le.TYPE_ERR);
        return this.nodes[this.iteratorIndex++]
    }, $.prototype.snapshotItem = function(e) {
        if (this.resultType != $.UNORDERED_NODE_SNAPSHOT_TYPE && this.resultType != $.ORDERED_NODE_SNAPSHOT_TYPE) throw new le(le.TYPE_ERR);
        return this.nodes[e]
    }, $.ANY_TYPE = 0, $.NUMBER_TYPE = 1, $.STRING_TYPE = 2, $.BOOLEAN_TYPE = 3, $.UNORDERED_NODE_ITERATOR_TYPE = 4, $.ORDERED_NODE_ITERATOR_TYPE = 5, $.UNORDERED_NODE_SNAPSHOT_TYPE = 6, $.ORDERED_NODE_SNAPSHOT_TYPE = 7, $.ANY_UNORDERED_NODE_TYPE = 8, $.FIRST_ORDERED_NODE_TYPE = 9;
    try {
        var ce = !0;
        try {
            document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("XPath", null) && (ce = !1)
        } catch (t) {}
        ce && k(document, new p)
    } catch (t) {}
    k(j, new p),
        function() {
            function e(e) {
                return {
                    getNamespace: function(t, r) {
                        var o = e(t, r);
                        return o || E.getNamespace(t, r)
                    }
                }
            }

            function t(t) {
                return e(t.getNamespace.bind(t))
            }

            function r(t) {
                return e(function(e) {
                    return t[e]
                })
            }

            function o(o) {
                return o && "function" == typeof o.getNamespace ? t(o) : "function" == typeof o ? e(o) : "object" == typeof o ? r(o) : E
            }

            function n(e) {
                if (null === e || "undefined" == typeof e || e instanceof _ || e instanceof B || e instanceof F || e instanceof G) return e;
                switch (typeof e) {
                    case "string":
                        return new _(e);
                    case "boolean":
                        return new B(e);
                    case "number":
                        return new F(e);
                }
                var t = new G;
                return t.addArray([].concat(e)), t
            }

            function s(e) {
                return function(t) {
                    var r = Array.prototype.slice.call(arguments, 1).map(function(e) {
                            return e.evaluate(t)
                        }),
                        o = e.apply(this, [].concat(t, r));
                    return n(o)
                }
            }

            function a(e) {
                return {
                    getFunction: function(t, r) {
                        var o = e(t, r);
                        return o ? s(o) : A.getFunction(t, r)
                    }
                }
            }

            function i(e) {
                return a(e.getFunction.bind(e))
            }

            function u(e) {
                return a(function(t) {
                    return e[t]
                })
            }

            function l(e) {
                return e && "function" == typeof e.getFunction ? i(e) : "function" == typeof e ? a(e) : "object" == typeof e ? u(e) : A
            }

            function c(e) {
                return {
                    getVariable: function(t, r) {
                        var o = e(t, r);
                        return n(o)
                    }
                }
            }

            function d(e) {
                if (e) {
                    if ("function" == typeof e.getVariable) return c(e.getVariable.bind(e));
                    if ("function" == typeof e) return c(e);
                    if ("object" == typeof e) return c(function(t) {
                        return e[t]
                    })
                }
                return m
            }

            function h(e, t, r) {
                e in r && (t[e] = r[e])
            }

            function g(e) {
                var t = new Y;
                return e ? (t.namespaceResolver = o(e.namespaces), t.functionResolver = l(e.functions), t.variableResolver = d(e.variables), t.expressionContextNode = e.node, h("allowAnyNamespaceForNoPrefix", t, e), h("isHtml", t, e)) : t.namespaceResolver = E, t
            }

            function N(e, t) {
                var r = g(t);
                return e.evaluate(r)
            }
            var y = new p,
                E = new Q,
                A = new w,
                m = new q,
                T = {
                    evaluate: function(e) {
                        return N(this.expression, e)
                    },
                    evaluateNumber: function(e) {
                        return this.evaluate(e).numberValue()
                    },
                    evaluateString: function(e) {
                        return this.evaluate(e).stringValue()
                    },
                    evaluateBoolean: function(e) {
                        return this.evaluate(e).booleanValue()
                    },
                    evaluateNodeSet: function(e) {
                        return this.evaluate(e).nodeset()
                    },
                    select: function(e) {
                        return this.evaluateNodeSet(e).toArray()
                    },
                    select1: function(e) {
                        return this.select(e)[0]
                    }
                };
            j.parse = function(e) {
                var t = y.parse(e);
                return Object.create(T, {
                    expression: {
                        value: t
                    }
                })
            }
        }(), j.XPath = u, j.XPathParser = p, j.XPathResult = $, j.Step = v, j.NodeTest = L, j.BarOperation = O, j.NamespaceResolver = Q, j.FunctionResolver = w, j.VariableResolver = q, j.Utilities = ue, j.XPathContext = Y, j.XNodeSet = G, j.XBoolean = B, j.XString = _, j.XNumber = F, j.select = function(t, e, r) {
            return j.selectWithResolver(t, e, null, r)
        }, j.useNamespaces = function(e) {
            var t = {
                mappings: e || {},
                lookupNamespaceURI: function(e) {
                    return this.mappings[e]
                }
            };
            return function(r, e, o) {
                return j.selectWithResolver(r, e, t, o)
            }
        }, j.selectWithResolver = function(t, e, r, o) {
            var n = new J(t, r, new p()),
                s = $.ANY_TYPE,
                a = n.evaluate(e, s, null);
            return a.resultType == $.STRING_TYPE ? a = a.stringValue : a.resultType == $.NUMBER_TYPE ? a = a.numberValue : a.resultType == $.BOOLEAN_TYPE ? a = a.booleanValue : (a = a.nodes, o && (a = a[0])), a
        }, j.select1 = function(t, e) {
            return j.select(t, e, !0)
        }
})();