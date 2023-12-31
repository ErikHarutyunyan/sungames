"use strict";
self["xmlDomLib"] = {},
    function() {
        function a(a, b) {
            for (var c in a) b[c] = a[c]
        }

        function b(b, c) {
            var d = b.prototype;
            if (!(d instanceof c)) {
                function e() {}
                e.prototype = c.prototype, e = new e, a(d, e), b.prototype = d = e
            }
            d.constructor != b && ("function" != typeof b && console.error("unknow Class:" + b), d.constructor = b)
        }

        function c(a, b) {
            if (b instanceof Error) var d = b;
            else d = this, Error.call(this, ba[a]), this.message = ba[a], Error.captureStackTrace && Error.captureStackTrace(this, c);
            return d.code = a, b && (this.message = this.message + ": " + b), d
        }

        function d() {}

        function e(a, b) {
            this._node = a, this._refresh = b, f(this)
        }

        function f(b) {
            var c = b._node._inc || b._node.ownerDocument._inc;
            if (b._inc != c) {
                var d = b._refresh(b._node);
                N(b, "length", d.length), a(d, b), b._inc = c
            }
        }

        function g() {}

        function h(a, b) {
            for (var c = a.length; c--;)
                if (a[c] === b) return c
        }

        function i(a, b, c, d) {
            if (d ? b[h(b, d)] = c : b[b.length++] = c, a) {
                c.ownerElement = a;
                var e = a.ownerDocument;
                e && (d && q(e, a, d), p(e, a, c))
            }
        }

        function j(a, b, d) {
            var e = h(b, d);
            if (0 <= e) {
                for (var f = b.length - 1; e < f;) b[e] = b[++e];
                if (b.length = f, a) {
                    var g = a.ownerDocument;
                    g && (q(g, a, d), d.ownerElement = null)
                }
            } else throw c(ja, new Error(a.tagName + "@" + d))
        }

        function k(a) {
            if (this._features = {}, a)
                for (var b in a) this._features = a[b]
        }

        function l() {}

        function m(a) {
            return "<" == a && "&lt;" || ">" == a && "&gt;" || "&" == a && "&amp;" || "\"" == a && "&quot;" || "&#" + a.charCodeAt() + ";"
        }

        function n(a, b) {
            if (b(a)) return !0;
            if (a = a.firstChild)
                do
                    if (n(a, b)) return !0; while (a = a.nextSibling)
        }

        function o() {}

        function p(a, b, c) {
            a && a._inc++;
            var d = c.namespaceURI;
            "http://www.w3.org/2000/xmlns/" == d && (b._nsMap[c.prefix ? c.localName : ""] = c.value)
        }

        function q(a, b, c) {
            a && a._inc++;
            var d = c.namespaceURI;
            "http://www.w3.org/2000/xmlns/" == d && delete b._nsMap[c.prefix ? c.localName : ""]
        }

        function r(a, b, c) {
            if (a && a._inc) {
                a._inc++;
                var d = b.childNodes;
                if (c) d[d.length++] = c;
                else {
                    for (var e = b.firstChild, f = 0; e;) d[f++] = e, e = e.nextSibling;
                    d.length = f
                }
            }
        }

        function s(a, b) {
            var c = b.previousSibling,
                d = b.nextSibling;
            return c ? c.nextSibling = d : a.firstChild = d, d ? d.previousSibling = c : a.lastChild = c, r(a.ownerDocument, a), b
        }

        function t(a, b, c) {
            var d = b.parentNode;
            if (d && d.removeChild(b), b.nodeType === $) {
                var e = b.firstChild;
                if (null == e) return b;
                var f = b.lastChild
            } else e = f = b;
            var g = c ? c.previousSibling : a.lastChild;
            e.previousSibling = g, f.nextSibling = c, g ? g.nextSibling = e : a.firstChild = e, null == c ? a.lastChild = f : c.previousSibling = f;
            do e.parentNode = a; while (e !== f && (e = e.nextSibling));
            return r(a.ownerDocument || a, a), b.nodeType == $ && (b.firstChild = b.lastChild = null), b
        }

        function u(a, b) {
            var c = b.parentNode;
            if (c) {
                var d = a.lastChild;
                c.removeChild(b);
                var d = a.lastChild
            }
            var d = a.lastChild;
            return b.parentNode = a, b.previousSibling = d, b.nextSibling = null, d ? d.nextSibling = b : a.firstChild = b, a.lastChild = b, r(a.ownerDocument, a, b), b
        }

        function v() {
            this._nsMap = {}
        }

        function w() {}

        function x() {}

        function y() {}

        function z() {}

        function A() {}

        function B() {}

        function C() {}

        function D() {}

        function E() {}

        function F() {}

        function G() {}

        function H() {}

        function I(a, b) {
            var c = [],
                d = 9 == this.nodeType && this.documentElement || this,
                e = d.prefix,
                f = d.namespaceURI;
            if (f && null == e) {
                var e = d.lookupPrefix(f);
                if (null == e) var g = [{
                    namespace: f,
                    prefix: null
                }]
            }
            return K(this, c, a, b, g), c.join("")
        }

        function J(a, b, c) {
            var d = a.prefix || "",
                e = a.namespaceURI;
            if (!d && !e) return !1;
            if ("xml" === d && "http://www.w3.org/XML/1998/namespace" === e || "http://www.w3.org/2000/xmlns/" == e) return !1;
            for (var f = c.length; f--;) {
                var g = c[f];
                if (g.prefix == d) return g.namespace != e
            }
            return !0
        }

        function K(a, b, c, d, e) {
            if (d) {
                if (a = d(a), !a) return;
                if ("string" == typeof a) return void b.push(a)
            }
            switch (a.nodeType) {
                case Q:
                    e || (e = []);
                    var f = e.length,
                        g = a.attributes,
                        h = g.length,
                        j = a.firstChild,
                        k = a.tagName;
                    c = "http://www.w3.org/1999/xhtml" === a.namespaceURI || c, b.push("<", k);
                    for (var l, n = 0; n < h; n++) l = g.item(n), "xmlns" == l.prefix ? e.push({
                        prefix: l.localName,
                        namespace: l.value
                    }) : "xmlns" == l.nodeName && e.push({
                        prefix: "",
                        namespace: l.value
                    });
                    for (var l, n = 0; n < h; n++) {
                        if (l = g.item(n), J(l, c, e)) {
                            var i = l.prefix || "",
                                o = l.namespaceURI,
                                p = i ? " xmlns:" + i : " xmlns";
                            b.push(p, "=\"", o, "\""), e.push({
                                prefix: i,
                                namespace: o
                            })
                        }
                        K(l, b, c, d, e)
                    }
                    if (J(a, c, e)) {
                        var i = a.prefix || "",
                            o = a.namespaceURI,
                            p = i ? " xmlns:" + i : " xmlns";
                        b.push(p, "=\"", o, "\""), e.push({
                            prefix: i,
                            namespace: o
                        })
                    }
                    if (j || c && !/^(?:meta|link|img|br|hr|input)$/i.test(k)) {
                        if (b.push(">"), c && /^script$/i.test(k))
                            for (; j;) j.data ? b.push(j.data) : K(j, b, c, d, e), j = j.nextSibling;
                        else
                            for (; j;) K(j, b, c, d, e), j = j.nextSibling;
                        b.push("</", k, ">")
                    } else b.push("/>");
                    return;
                case Y:
                case $:
                    for (var j = a.firstChild; j;) K(j, b, c, d, e), j = j.nextSibling;
                    return;
                case R:
                    return b.push(" ", a.name, "=\"", a.value.replace(/[<&"]/g, m), "\"");
                case S:
                    return b.push(a.data.replace(/[<&]/g, m));
                case T:
                    return b.push("<![CDATA[", a.data, "]]>");
                case X:
                    return b.push("<!--", a.data, "-->");
                case Z:
                    var q = a.publicId,
                        r = a.systemId;
                    if (b.push("<!DOCTYPE ", a.name), q) b.push(" PUBLIC \"", q), r && "." != r && b.push("\" \"", r), b.push("\">");
                    else if (r && "." != r) b.push(" SYSTEM \"", r, "\">");
                    else {
                        var s = a.internalSubset;
                        s && b.push(" [", s, "]"), b.push(">")
                    }
                    return;
                case W:
                    return b.push("<?", a.target, " ", a.data, "?>");
                case U:
                    return b.push("&", a.nodeName, ";");
                default:
                    b.push("??", a.nodeName);
            }
        }

        function L(a, b, c) {
            var d;
            switch (b.nodeType) {
                case Q:
                    d = b.cloneNode(!1), d.ownerDocument = a;
                case $:
                    break;
                case R:
                    c = !0;
            }
            if (d || (d = b.cloneNode(!1)), d.ownerDocument = a, d.parentNode = null, c)
                for (var e = b.firstChild; e;) d.appendChild(L(a, e, c)), e = e.nextSibling;
            return d
        }

        function M(a, b, c) {
            var e = new b.constructor;
            for (var f in b) {
                var h = b[f];
                "object" != typeof h && h != e[f] && (e[f] = h)
            }
            switch (b.childNodes && (e.childNodes = new d), e.ownerDocument = a, e.nodeType) {
                case Q:
                    var j = b.attributes,
                        k = e.attributes = new g,
                        l = j.length;
                    k._ownerElement = e;
                    for (var m = 0; m < l; m++) e.setAttributeNode(M(a, j.item(m), !0));
                    break;;
                case R:
                    c = !0;
            }
            if (c)
                for (var i = b.firstChild; i;) e.appendChild(M(a, i, c)), i = i.nextSibling;
            return e
        }

        function N(a, b, c) {
            a[b] = c
        }
        var O = self["xmlDomLib"],
            P = {},
            Q = P.ELEMENT_NODE = 1,
            R = P.ATTRIBUTE_NODE = 2,
            S = P.TEXT_NODE = 3,
            T = P.CDATA_SECTION_NODE = 4,
            U = P.ENTITY_REFERENCE_NODE = 5,
            V = P.ENTITY_NODE = 6,
            W = P.PROCESSING_INSTRUCTION_NODE = 7,
            X = P.COMMENT_NODE = 8,
            Y = P.DOCUMENT_NODE = 9,
            Z = P.DOCUMENT_TYPE_NODE = 10,
            $ = P.DOCUMENT_FRAGMENT_NODE = 11,
            _ = P.NOTATION_NODE = 12,
            aa = {},
            ba = {},
            ca = aa.INDEX_SIZE_ERR = (ba[1] = "Index size error", 1),
            da = aa.DOMSTRING_SIZE_ERR = (ba[2] = "DOMString size error", 2),
            ea = aa.HIERARCHY_REQUEST_ERR = (ba[3] = "Hierarchy request error", 3),
            fa = aa.WRONG_DOCUMENT_ERR = (ba[4] = "Wrong document", 4),
            ga = aa.INVALID_CHARACTER_ERR = (ba[5] = "Invalid character", 5),
            ha = aa.NO_DATA_ALLOWED_ERR = (ba[6] = "No data allowed", 6),
            ia = aa.NO_MODIFICATION_ALLOWED_ERR = (ba[7] = "No modification allowed", 7),
            ja = aa.NOT_FOUND_ERR = (ba[8] = "Not found", 8),
            ka = aa.NOT_SUPPORTED_ERR = (ba[9] = "Not supported", 9),
            la = aa.INUSE_ATTRIBUTE_ERR = (ba[10] = "Attribute in use", 10),
            ma = aa.INVALID_STATE_ERR = (ba[11] = "Invalid state", 11),
            na = aa.SYNTAX_ERR = (ba[12] = "Syntax error", 12),
            oa = aa.INVALID_MODIFICATION_ERR = (ba[13] = "Invalid modification", 13),
            pa = aa.NAMESPACE_ERR = (ba[14] = "Invalid namespace", 14),
            qa = aa.INVALID_ACCESS_ERR = (ba[15] = "Invalid access", 15);
        c.prototype = Error.prototype, a(aa, c);
        d.prototype = {
            length: 0,
            item: function(a) {
                return this[a] || null
            },
            toString: function(a, b) {
                for (var c = [], d = 0; d < this.length; d++) K(this[d], c, a, b);
                return c.join("")
            }
        }, e.prototype.item = function(a) {
            return f(this), this[a]
        }, b(e, d);
        g.prototype = {
            length: 0,
            item: d.prototype.item,
            getNamedItem: function(a) {
                for (var b = this.length; b--;) {
                    var c = this[b];
                    if (c.nodeName == a) return c
                }
            },
            setNamedItem: function(a) {
                var b = a.ownerElement;
                if (b && b != this._ownerElement) throw new c(la);
                var d = this.getNamedItem(a.nodeName);
                return i(this._ownerElement, this, a, d), d
            },
            setNamedItemNS: function(a) {
                var b, d = a.ownerElement;
                if (d && d != this._ownerElement) throw new c(la);
                return b = this.getNamedItemNS(a.namespaceURI, a.localName), i(this._ownerElement, this, a, b), b
            },
            removeNamedItem: function(a) {
                var b = this.getNamedItem(a);
                return j(this._ownerElement, this, b), b
            },
            removeNamedItemNS: function(a, b) {
                var c = this.getNamedItemNS(a, b);
                return j(this._ownerElement, this, c), c
            },
            getNamedItemNS: function(a, b) {
                for (var c = this.length; c--;) {
                    var d = this[c];
                    if (d.localName == b && d.namespaceURI == a) return d
                }
                return null
            }
        };
        k.prototype = {
            hasFeature: function(a, b) {
                var c = this._features[a.toLowerCase()];
                return !!(c && (!b || b in c))
            },
            createDocument: function(a, b, c) {
                var e = new o;
                if (e.implementation = this, e.childNodes = new d, e.doctype = c, c && e.appendChild(c), b) {
                    var f = e.createElementNS(a, b);
                    e.appendChild(f)
                }
                return e
            },
            createDocumentType: function(a, b, c) {
                var d = new B;
                return d.name = a, d.nodeName = a, d.publicId = b, d.systemId = c, d
            }
        };
        l.prototype = {
            firstChild: null,
            lastChild: null,
            previousSibling: null,
            nextSibling: null,
            attributes: null,
            parentNode: null,
            childNodes: null,
            ownerDocument: null,
            nodeValue: null,
            namespaceURI: null,
            prefix: null,
            localName: null,
            insertBefore: function(a, b) {
                return t(this, a, b)
            },
            replaceChild: function(a, b) {
                this.insertBefore(a, b), b && this.removeChild(b)
            },
            removeChild: function(a) {
                return s(this, a)
            },
            appendChild: function(a) {
                return this.insertBefore(a, null)
            },
            hasChildNodes: function() {
                return null != this.firstChild
            },
            cloneNode: function(a) {
                return M(this.ownerDocument || this, this, a)
            },
            normalize: function() {
                for (var a = this.firstChild; a;) {
                    var b = a.nextSibling;
                    b && b.nodeType == S && a.nodeType == S ? (this.removeChild(b), a.appendData(b.data)) : (a.normalize(), a = b)
                }
            },
            isSupported: function(a, b) {
                return this.ownerDocument.implementation.hasFeature(a, b)
            },
            hasAttributes: function() {
                return 0 < this.attributes.length
            },
            lookupPrefix: function(a) {
                for (var b = this; b;) {
                    var c = b._nsMap;
                    if (c)
                        for (var d in c)
                            if (c[d] == a) return d;
                    b = b.nodeType == R ? b.ownerDocument : b.parentNode
                }
                return null
            },
            lookupNamespaceURI: function(a) {
                for (var b = this; b;) {
                    var c = b._nsMap;
                    if (c && a in c) return c[a];
                    b = b.nodeType == R ? b.ownerDocument : b.parentNode
                }
                return null
            },
            isDefaultNamespace: function(a) {
                var b = this.lookupPrefix(a);
                return null == b
            }
        }, a(P, l), a(P, l.prototype), o.prototype = {
            nodeName: "#document",
            nodeType: Y,
            doctype: null,
            documentElement: null,
            _inc: 1,
            insertBefore: function(a, b) {
                if (a.nodeType == $) {
                    for (var c, d = a.firstChild; d;) c = d.nextSibling, this.insertBefore(d, b), d = c;
                    return a
                }
                return null == this.documentElement && a.nodeType == Q && (this.documentElement = a), t(this, a, b), a.ownerDocument = this, a
            },
            removeChild: function(a) {
                return this.documentElement == a && (this.documentElement = null), s(this, a)
            },
            importNode: function(a, b) {
                return L(this, a, b)
            },
            getElementById: function(a) {
                var b = null;
                return n(this.documentElement, function(c) {
                    if (c.nodeType == Q && c.getAttribute("id") == a) return b = c, !0
                }), b
            },
            createElement: function(a) {
                var b = new v;
                b.ownerDocument = this, b.nodeName = a, b.tagName = a, b.childNodes = new d;
                var c = b.attributes = new g;
                return c._ownerElement = b, b
            },
            createDocumentFragment: function() {
                var a = new F;
                return a.ownerDocument = this, a.childNodes = new d, a
            },
            createTextNode: function(a) {
                var b = new y;
                return b.ownerDocument = this, b.appendData(a), b
            },
            createComment: function(a) {
                var b = new z;
                return b.ownerDocument = this, b.appendData(a), b
            },
            createCDATASection: function(a) {
                var b = new A;
                return b.ownerDocument = this, b.appendData(a), b
            },
            createProcessingInstruction: function(a, b) {
                var c = new G;
                return c.ownerDocument = this, c.tagName = c.target = a, c.nodeValue = c.data = b, c
            },
            createAttribute: function(a) {
                var b = new w;
                return b.ownerDocument = this, b.name = a, b.nodeName = a, b.localName = a, b.specified = !0, b
            },
            createEntityReference: function(a) {
                var b = new E;
                return b.ownerDocument = this, b.nodeName = a, b
            },
            createElementNS: function(a, b) {
                var c = new v,
                    e = b.split(":"),
                    f = c.attributes = new g;
                return c.childNodes = new d, c.ownerDocument = this, c.nodeName = b, c.tagName = b, c.namespaceURI = a, 2 == e.length ? (c.prefix = e[0], c.localName = e[1]) : c.localName = b, f._ownerElement = c, c
            },
            createAttributeNS: function(a, b) {
                var c = new w,
                    d = b.split(":");
                return c.ownerDocument = this, c.nodeName = b, c.name = b, c.namespaceURI = a, c.specified = !0, 2 == d.length ? (c.prefix = d[0], c.localName = d[1]) : c.localName = b, c
            }
        }, b(o, l);
        v.prototype = {
            nodeType: Q,
            hasAttribute: function(a) {
                return null != this.getAttributeNode(a)
            },
            getAttribute: function(a) {
                var b = this.getAttributeNode(a);
                return b && b.value || ""
            },
            getAttributeNode: function(a) {
                return this.attributes.getNamedItem(a)
            },
            setAttribute: function(a, b) {
                var c = this.ownerDocument.createAttribute(a);
                c.value = c.nodeValue = "" + b, this.setAttributeNode(c)
            },
            removeAttribute: function(a) {
                var b = this.getAttributeNode(a);
                b && this.removeAttributeNode(b)
            },
            appendChild: function(a) {
                return a.nodeType === $ ? this.insertBefore(a, null) : u(this, a)
            },
            setAttributeNode: function(a) {
                return this.attributes.setNamedItem(a)
            },
            setAttributeNodeNS: function(a) {
                return this.attributes.setNamedItemNS(a)
            },
            removeAttributeNode: function(a) {
                return this.attributes.removeNamedItem(a.nodeName)
            },
            removeAttributeNS: function(a, b) {
                var c = this.getAttributeNodeNS(a, b);
                c && this.removeAttributeNode(c)
            },
            hasAttributeNS: function(a, b) {
                return null != this.getAttributeNodeNS(a, b)
            },
            getAttributeNS: function(a, b) {
                var c = this.getAttributeNodeNS(a, b);
                return c && c.value || ""
            },
            setAttributeNS: function(a, b, c) {
                var d = this.ownerDocument.createAttributeNS(a, b);
                d.value = d.nodeValue = "" + c, this.setAttributeNode(d)
            },
            getAttributeNodeNS: function(a, b) {
                return this.attributes.getNamedItemNS(a, b)
            },
            getElementsByTagName: function(a) {
                return new e(this, function(b) {
                    var c = [];
                    return n(b, function(d) {
                        d !== b && d.nodeType == Q && ("*" === a || d.tagName == a) && c.push(d)
                    }), c
                })
            },
            getElementsByTagNameNS: function(a, b) {
                return new e(this, function(c) {
                    var d = [];
                    return n(c, function(e) {
                        e !== c && e.nodeType === Q && ("*" === a || e.namespaceURI === a) && ("*" === b || e.localName == b) && d.push(e)
                    }), d
                })
            }
        }, o.prototype.getElementsByTagName = v.prototype.getElementsByTagName, o.prototype.getElementsByTagNameNS = v.prototype.getElementsByTagNameNS, b(v, l);
        w.prototype.nodeType = R, b(w, l);
        x.prototype = {
            data: "",
            substringData: function(a, b) {
                return this.data.substring(a, a + b)
            },
            appendData: function(a) {
                a = this.data + a, this.nodeValue = this.data = a, this.length = a.length
            },
            insertData: function(a, b) {
                this.replaceData(a, 0, b)
            },
            appendChild: function() {
                throw new Error(ba[ea])
            },
            deleteData: function(a, b) {
                this.replaceData(a, b, "")
            },
            replaceData: function(a, b, c) {
                var d = this.data.substring(0, a),
                    e = this.data.substring(a + b);
                c = d + c + e, this.nodeValue = this.data = c, this.length = c.length
            }
        }, b(x, l);
        y.prototype = {
            nodeName: "#text",
            nodeType: S,
            splitText: function(a) {
                var b = this.data,
                    c = b.substring(a);
                b = b.substring(0, a), this.data = this.nodeValue = b, this.length = b.length;
                var d = this.ownerDocument.createTextNode(c);
                return this.parentNode && this.parentNode.insertBefore(d, this.nextSibling), d
            }
        }, b(y, x);
        z.prototype = {
            nodeName: "#comment",
            nodeType: X
        }, b(z, x);
        A.prototype = {
            nodeName: "#cdata-section",
            nodeType: T
        }, b(A, x);
        B.prototype.nodeType = Z, b(B, l);
        C.prototype.nodeType = _, b(C, l);
        D.prototype.nodeType = V, b(D, l);
        E.prototype.nodeType = U, b(E, l);
        F.prototype.nodeName = "#document-fragment", F.prototype.nodeType = $, b(F, l), G.prototype.nodeType = W, b(G, l), H.prototype.serializeToString = function(a, b, c) {
            return I.call(a, b, c)
        }, l.prototype.toString = I;
        try {
            if (Object.defineProperty) {
                function a(b) {
                    switch (b.nodeType) {
                        case Q:
                        case $:
                            var c = [];
                            for (b = b.firstChild; b;) 7 !== b.nodeType && 8 !== b.nodeType && c.push(a(b)), b = b.nextSibling;
                            return c.join("");
                        default:
                            return b.nodeValue;
                    }
                }
                Object.defineProperty(e.prototype, "length", {
                    get: function() {
                        return f(this), this.$$length
                    }
                }), Object.defineProperty(l.prototype, "textContent", {
                    get: function() {
                        return a(this)
                    },
                    set: function(a) {
                        switch (this.nodeType) {
                            case Q:
                            case $:
                                for (; this.firstChild;) this.removeChild(this.firstChild);
                                (a || a + "") && this.appendChild(this.ownerDocument.createTextNode(a));
                                break;
                            default:
                                this.data = a, this.value = a, this.nodeValue = a;
                        }
                    }
                }), N = function(a, b, c) {
                    a["$$" + b] = c
                }
            }
        } catch (a) {}
        O.DOMImplementation = k, O.XMLSerializer = H
    }(),
    function() {
        function a() {}

        function b(b, h, m, n, o) {
            function p(a) {
                var b = String.fromCharCode;
                if (65535 < a) {
                    a -= 65536;
                    var c = 55296 + (a >> 10),
                        d = 56320 + (1023 & a);
                    return b(c, d)
                }
                return b(a)
            }

            function q(b) {
                var a = b.slice(1, -1);
                return a in m ? m[a] : "#" === a.charAt(0) ? p(parseInt(a.substr(1).replace("x", "0x"))) : (o.error("entity not found:" + b), b)
            }

            function r(a) {
                if (a > z) {
                    var c = b.substring(z, a).replace(/&#?\w+;/g, q);
                    w && s(z), n.characters(c, 0, a - z), z = a
                }
            }

            function s(a, c) {
                for (; a >= u && (c = v.exec(b));) t = c.index, u = t + c[0].length, w.lineNumber++;
                w.columnNumber = a - t + 1
            }
            for (var t = 0, u = 0, v = /.*(?:\r\n?|\n)|.*$/g, w = n.locator, x = [{
                    currentNSMap: h
                }], y = {}, z = 0;;) {
                try {
                    var A = b.indexOf("<", z);
                    if (0 > A) {
                        if (!b.substr(z).match(/^\s*$/)) {
                            var B = n.doc,
                                C = B.createTextNode(b.substr(z));
                            B.appendChild(C), n.currentElement = C
                        }
                        return
                    }
                    switch (A > z && r(A), b.charAt(A + 1)) {
                        case "/":
                            var D = b.indexOf(">", A + 3),
                                E = b.substring(A + 2, D),
                                F = x.pop();
                            0 > D ? (E = b.substring(A + 2).replace(/[\s<].*/, ""), o.error("end tag name: " + E + " is not complete:" + F.tagName), D = A + 1 + E.length) : E.match(/\s</) && (E = E.replace(/[\s<].*/, ""), o.error("end tag name: " + E + " maybe not complete"), D = A + 1 + E.length);
                            var G = F.localNSMap,
                                H = F.tagName == E,
                                I = H || F.tagName && F.tagName.toLowerCase() == E.toLowerCase();
                            if (I) {
                                if (n.endElement(F.uri, F.localName, E), G)
                                    for (var J in G) n.endPrefixMapping(J);
                                H || o.fatalError("end tag name: " + E + " is not match the current start tagName:" + F.tagName)
                            } else x.push(F);
                            D++;
                            break;
                        case "?":
                            w && s(A), D = k(b, A, n);
                            break;
                        case "!":
                            w && s(A), D = j(b, A, n, o);
                            break;
                        default:
                            w && s(A);
                            var K = new l,
                                L = x[x.length - 1].currentNSMap,
                                D = d(b, A, K, L, q, o),
                                M = K.length;
                            if (!K.closed && g(b, D, K.tagName, y) && (K.closed = !0, !m.nbsp && o.warning("unclosed xml attribute")), w && M) {
                                for (var N, a = c(w, {}), O = 0; O < M; O++) N = K[O], s(N.offset), N.locator = c(w, {});
                                n.locator = a, e(K, n, L) && x.push(K), n.locator = w
                            } else e(K, n, L) && x.push(K);
                            "http://www.w3.org/1999/xhtml" !== K.uri || K.closed ? D++ : D = f(b, D, K.tagName, q, n);
                    }
                } catch (a) {
                    o.error("element parse error: " + a), D = -1
                }
                D > z ? z = D : r(Math.max(A, z) + 1)
            }
        }

        function c(a, b) {
            return b.lineNumber = a.lineNumber, b.columnNumber = a.columnNumber, b
        }

        function d(a, b, d, e, f, g) {
            for (var h, i, j = ++b, k = 0;;) {
                var l = a.charAt(j);
                switch (l) {
                    case "=":
                        if (1 === k) h = a.slice(b, j), k = 3;
                        else if (2 === k) k = 3;
                        else throw new Error("attribute equal must after attrName");
                        break;
                    case "'":
                    case "\"":
                        if (3 === k || 1 === k) {
                            if (1 === k && (g.warning("attribute value must after \"=\""), h = a.slice(b, j)), b = j + 1, j = a.indexOf(l, b), 0 < j) i = a.slice(b, j).replace(/&#?\w+;/g, f), d.add(h, i, b - 1), k = 5;
                            else throw new Error("attribute value no end '" + l + "' match");
                        } else if (4 == k) i = a.slice(b, j).replace(/&#?\w+;/g, f), d.add(h, i, b), g.warning("attribute \"" + h + "\" missed start quot(" + l + ")!!"), b = j + 1, k = 5;
                        else throw new Error("attribute value must after \"=\"");
                        break;
                    case "/":
                        switch (k) {
                            case 0:
                                d.setTagName(a.slice(b, j));
                            case 5:
                            case 6:
                            case 7:
                                k = 7, d.closed = !0;
                            case 4:
                            case 1:
                            case 2:
                                break;
                            default:
                                throw new Error("attribute invalid close char('/')");
                        }
                        break;
                    case "":
                        return g.error("unexpected end of input"), 0 == k && d.setTagName(a.slice(b, j)), j;
                    case ">":
                        switch (k) {
                            case 0:
                                d.setTagName(a.slice(b, j));
                            case 5:
                            case 6:
                            case 7:
                                break;
                            case 4:
                            case 1:
                                i = a.slice(b, j), "/" === i.slice(-1) && (d.closed = !0, i = i.slice(0, -1));
                            case 2:
                                2 === k && (i = h), 4 == k ? (g.warning("attribute \"" + i + "\" missed quot(\")!!"), d.add(h, i.replace(/&#?\w+;/g, f), b)) : (("http://www.w3.org/1999/xhtml" !== e[""] || !i.match(/^(?:disabled|checked|selected)$/i)) && g.warning("attribute \"" + i + "\" missed value!! \"" + i + "\" instead!!"), d.add(i, i, b));
                                break;
                            case 3:
                                throw new Error("attribute value missed!!");
                        }
                        return j;
                    case "\x80":
                        l = " ";
                    default:
                        if (" " >= l) switch (k) {
                            case 0:
                                d.setTagName(a.slice(b, j)), k = 6;
                                break;
                            case 1:
                                h = a.slice(b, j), k = 2;
                                break;
                            case 4:
                                var i = a.slice(b, j).replace(/&#?\w+;/g, f);
                                g.warning("attribute \"" + i + "\" missed quot(\")!!"), d.add(h, i, b);
                            case 5:
                                k = 6;
                        } else switch (k) {
                            case 2:
                                d.tagName;
                                "http://www.w3.org/1999/xhtml" === e[""] && h.match(/^(?:disabled|checked|selected)$/i) || g.warning("attribute \"" + h + "\" missed value!! \"" + h + "\" instead2!!"), d.add(h, h, b), b = j, k = 1;
                                break;
                            case 5:
                                g.warning("attribute space is required\"" + h + "\"!!");
                            case 6:
                                k = 1, b = j;
                                break;
                            case 3:
                                k = 4, b = j;
                                break;
                            case 7:
                                throw new Error("elements closed character '/' and '>' must be connected to");
                        }
                }
                j++
            }
        }

        function e(b, c, d) {
            for (var e = b.tagName, f = null, g = b.length; g--;) {
                var i = b[g],
                    a = i.qName,
                    j = i.value,
                    k = a.indexOf(":");
                if (0 < k) var l = i.prefix = a.slice(0, k),
                    m = a.slice(k + 1),
                    n = "xmlns" === l && m;
                else m = a, l = null, n = "xmlns" === a ? "" : "__special_false_value__";
                i.localName = m, "__special_false_value__" !== n && (null == f && (f = {}, h(d, d = {})), d[n] = f[n] = j, i.uri = "http://www.w3.org/2000/xmlns/", c.startPrefixMapping(n, j))
            }
            for (var g = b.length; g--;) {
                i = b[g];
                var l = i.prefix;
                l && ("xml" === l && (i.uri = "http://www.w3.org/XML/1998/namespace"), "xmlns" !== l && (i.uri = d[l || ""]))
            }
            var k = e.indexOf(":");
            0 < k ? (l = b.prefix = e.slice(0, k), m = b.localName = e.slice(k + 1)) : (l = null, m = b.localName = e);
            var o = b.uri = d[l || ""];
            if (c.startElement(o, m, e, b), !b.closed) return b.currentNSMap = d, b.localNSMap = f, !0;
            if (c.endElement(o, m, e), f)
                for (l in f) c.endPrefixMapping(l)
        }

        function f(a, b, c, d, e) {
            if (/^(?:script|textarea)$/i.test(c)) {
                var f = a.indexOf("</" + c + ">", b),
                    g = a.substring(b + 1, f);
                if (/[&<]/.test(g)) return /^script$/i.test(c) ? (e.characters(g, 0, g.length), f) : (g = g.replace(/&#?\w+;/g, d), e.characters(g, 0, g.length), f)
            }
            return b + 1
        }

        function g(a, b, c, d) {
            var e = d[c];
            return null == e && (e = a.lastIndexOf("</" + c + ">"), e < b && (e = a.lastIndexOf("</" + c)), d[c] = e), e < b
        }

        function h(a, b) {
            for (var c in a) b[c] = a[c]
        }

        function j(a, b, c, d) {
            var e = a.charAt(b + 2);
            switch (e) {
                case "-":
                    if ("-" === a.charAt(b + 3)) {
                        var f = a.indexOf("-->", b + 4);
                        return f > b ? (c.comment(a, b + 4, f - b - 4), f + 3) : (d.error("Unclosed comment"), -1)
                    }
                    return -1;
                default:
                    if ("CDATA[" == a.substr(b + 3, 6)) {
                        var f = a.indexOf("]]>", b + 9);
                        return c.startCDATA(), c.characters(a, b + 9, f - b - 9), c.endCDATA(), f + 3
                    }
                    var g = i(a, b),
                        h = g.length;
                    if (1 < h && /!doctype/i.test(g[0][0])) {
                        var j = g[1][0],
                            k = 3 < h && /^public$/i.test(g[2][0]) && g[3][0],
                            l = 4 < h && g[4][0],
                            m = g[h - 1];
                        return c.startDTD(j, k && k.replace(/^(['"])(.*?)\1$/, "$2"), l && l.replace(/^(['"])(.*?)\1$/, "$2")), c.endDTD(), m.index + m[0].length
                    }
            }
            return -1
        }

        function k(a, b, c) {
            var d = a.indexOf("?>", b);
            if (d) {
                var e = a.substring(b, d).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
                if (e) {
                    e[0].length;
                    return c.processingInstruction(e[1], e[2]), d + 2
                }
                return -1
            }
            return -1
        }

        function l() {}

        function i(a, b) {
            var c, d = [],
                e = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
            for (e.lastIndex = b, e.exec(a); c = e.exec(a);)
                if (d.push(c), c[1]) return d
        }
        var m = self["xmlDomLib"],
            n = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,
            o = new RegExp("[\\-\\.0-9" + n.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"),
            p = new RegExp("^" + n.source + o.source + "*(?::" + n.source + o.source + "*)?$");
        a.prototype = {
            parse: function(a, c, d) {
                var e = this.domBuilder;
                e.startDocument(), h(c, c = {}), b(a, c, d, e, this.errorHandler), e.endDocument()
            }
        }, l.prototype = {
            setTagName: function(a) {
                if (!p.test(a)) throw new Error("invalid tagName:" + a);
                this.tagName = a
            },
            add: function(a, b, c) {
                if (!p.test(a)) throw new Error("invalid attribute:" + a);
                this[this.length++] = {
                    qName: a,
                    value: b,
                    offset: c
                }
            },
            length: 0,
            getLocalName: function(a) {
                return this[a].localName
            },
            getLocator: function(a) {
                return this[a].locator
            },
            getQName: function(a) {
                return this[a].qName
            },
            getURI: function(a) {
                return this[a].uri
            },
            getValue: function(a) {
                return this[a].value
            }
        }, m.XMLReader = a
    }(),
    function() {
        function a(a) {
            this.options = a || {
                locator: {}
            }
        }

        function b(a, b, d) {
            function f(b) {
                var c = a[b];
                !c && h && (c = 2 == a.length ? function(c) {
                    a(b, c)
                } : a), g[b] = c && function(a) {
                    c("[xmldom " + b + "]\t" + a + e(d))
                } || function() {}
            }
            if (!a) {
                if (b instanceof c) return b;
                a = b
            }
            var g = {},
                h = a instanceof Function;
            return d = d || {}, f("warning"), f("error"), f("fatalError"), g
        }

        function c() {
            this.cdata = !1
        }

        function d(a, b) {
            b.lineNumber = a.lineNumber, b.columnNumber = a.columnNumber
        }

        function e(a) {
            if (a) return "\n@" + (a.systemId || "") + "#[line:" + a.lineNumber + ",col:" + a.columnNumber + "]"
        }

        function f(a, b, c) {
            return "string" == typeof a ? a.substr(b, c) : a.length >= b + c || b ? new java.lang.String(a, b, c) + "" : a
        }

        function g(a, b) {
            a.currentElement ? a.currentElement.appendChild(b) : a.doc.appendChild(b)
        }
        var h = self["xmlDomLib"],
            i = h.XMLReader,
            j = h.DOMImplementation,
            k = {
                lt: "<",
                gt: ">",
                amp: "&",
                quot: "\"",
                apos: "'",
                Agrave: "\xC0",
                Aacute: "\xC1",
                Acirc: "\xC2",
                Atilde: "\xC3",
                Auml: "\xC4",
                Aring: "\xC5",
                AElig: "\xC6",
                Ccedil: "\xC7",
                Egrave: "\xC8",
                Eacute: "\xC9",
                Ecirc: "\xCA",
                Euml: "\xCB",
                Igrave: "\xCC",
                Iacute: "\xCD",
                Icirc: "\xCE",
                Iuml: "\xCF",
                ETH: "\xD0",
                Ntilde: "\xD1",
                Ograve: "\xD2",
                Oacute: "\xD3",
                Ocirc: "\xD4",
                Otilde: "\xD5",
                Ouml: "\xD6",
                Oslash: "\xD8",
                Ugrave: "\xD9",
                Uacute: "\xDA",
                Ucirc: "\xDB",
                Uuml: "\xDC",
                Yacute: "\xDD",
                THORN: "\xDE",
                szlig: "\xDF",
                agrave: "\xE0",
                aacute: "\xE1",
                acirc: "\xE2",
                atilde: "\xE3",
                auml: "\xE4",
                aring: "\xE5",
                aelig: "\xE6",
                ccedil: "\xE7",
                egrave: "\xE8",
                eacute: "\xE9",
                ecirc: "\xEA",
                euml: "\xEB",
                igrave: "\xEC",
                iacute: "\xED",
                icirc: "\xEE",
                iuml: "\xEF",
                eth: "\xF0",
                ntilde: "\xF1",
                ograve: "\xF2",
                oacute: "\xF3",
                ocirc: "\xF4",
                otilde: "\xF5",
                ouml: "\xF6",
                oslash: "\xF8",
                ugrave: "\xF9",
                uacute: "\xFA",
                ucirc: "\xFB",
                uuml: "\xFC",
                yacute: "\xFD",
                thorn: "\xFE",
                yuml: "\xFF",
                nbsp: " ",
                iexcl: "\xA1",
                cent: "\xA2",
                pound: "\xA3",
                curren: "\xA4",
                yen: "\xA5",
                brvbar: "\xA6",
                sect: "\xA7",
                uml: "\xA8",
                copy: "\xA9",
                ordf: "\xAA",
                laquo: "\xAB",
                not: "\xAC",
                shy: "\xAD\xAD",
                reg: "\xAE",
                macr: "\xAF",
                deg: "\xB0",
                plusmn: "\xB1",
                sup2: "\xB2",
                sup3: "\xB3",
                acute: "\xB4",
                micro: "\xB5",
                para: "\xB6",
                middot: "\xB7",
                cedil: "\xB8",
                sup1: "\xB9",
                ordm: "\xBA",
                raquo: "\xBB",
                frac14: "\xBC",
                frac12: "\xBD",
                frac34: "\xBE",
                iquest: "\xBF",
                times: "\xD7",
                divide: "\xF7",
                forall: "\u2200",
                part: "\u2202",
                exist: "\u2203",
                empty: "\u2205",
                nabla: "\u2207",
                isin: "\u2208",
                notin: "\u2209",
                ni: "\u220B",
                prod: "\u220F",
                sum: "\u2211",
                minus: "\u2212",
                lowast: "\u2217",
                radic: "\u221A",
                prop: "\u221D",
                infin: "\u221E",
                ang: "\u2220",
                and: "\u2227",
                or: "\u2228",
                cap: "\u2229",
                cup: "\u222A",
                "int": "\u222B",
                there4: "\u2234",
                sim: "\u223C",
                cong: "\u2245",
                asymp: "\u2248",
                ne: "\u2260",
                equiv: "\u2261",
                le: "\u2264",
                ge: "\u2265",
                sub: "\u2282",
                sup: "\u2283",
                nsub: "\u2284",
                sube: "\u2286",
                supe: "\u2287",
                oplus: "\u2295",
                otimes: "\u2297",
                perp: "\u22A5",
                sdot: "\u22C5",
                Alpha: "\u0391",
                Beta: "\u0392",
                Gamma: "\u0393",
                Delta: "\u0394",
                Epsilon: "\u0395",
                Zeta: "\u0396",
                Eta: "\u0397",
                Theta: "\u0398",
                Iota: "\u0399",
                Kappa: "\u039A",
                Lambda: "\u039B",
                Mu: "\u039C",
                Nu: "\u039D",
                Xi: "\u039E",
                Omicron: "\u039F",
                Pi: "\u03A0",
                Rho: "\u03A1",
                Sigma: "\u03A3",
                Tau: "\u03A4",
                Upsilon: "\u03A5",
                Phi: "\u03A6",
                Chi: "\u03A7",
                Psi: "\u03A8",
                Omega: "\u03A9",
                alpha: "\u03B1",
                beta: "\u03B2",
                gamma: "\u03B3",
                delta: "\u03B4",
                epsilon: "\u03B5",
                zeta: "\u03B6",
                eta: "\u03B7",
                theta: "\u03B8",
                iota: "\u03B9",
                kappa: "\u03BA",
                lambda: "\u03BB",
                mu: "\u03BC",
                nu: "\u03BD",
                xi: "\u03BE",
                omicron: "\u03BF",
                pi: "\u03C0",
                rho: "\u03C1",
                sigmaf: "\u03C2",
                sigma: "\u03C3",
                tau: "\u03C4",
                upsilon: "\u03C5",
                phi: "\u03C6",
                chi: "\u03C7",
                psi: "\u03C8",
                omega: "\u03C9",
                thetasym: "\u03D1",
                upsih: "\u03D2",
                piv: "\u03D6",
                OElig: "\u0152",
                oelig: "\u0153",
                Scaron: "\u0160",
                scaron: "\u0161",
                Yuml: "\u0178",
                fnof: "\u0192",
                circ: "\u02C6",
                tilde: "\u02DC",
                ensp: "\u2002",
                emsp: "\u2003",
                thinsp: "\u2009",
                zwnj: "\u200C",
                zwj: "\u200D",
                lrm: "\u200E",
                rlm: "\u200F",
                ndash: "\u2013",
                mdash: "\u2014",
                lsquo: "\u2018",
                rsquo: "\u2019",
                sbquo: "\u201A",
                ldquo: "\u201C",
                rdquo: "\u201D",
                bdquo: "\u201E",
                dagger: "\u2020",
                Dagger: "\u2021",
                bull: "\u2022",
                hellip: "\u2026",
                permil: "\u2030",
                prime: "\u2032",
                Prime: "\u2033",
                lsaquo: "\u2039",
                rsaquo: "\u203A",
                oline: "\u203E",
                euro: "\u20AC",
                trade: "\u2122",
                larr: "\u2190",
                uarr: "\u2191",
                rarr: "\u2192",
                darr: "\u2193",
                harr: "\u2194",
                crarr: "\u21B5",
                lceil: "\u2308",
                rceil: "\u2309",
                lfloor: "\u230A",
                rfloor: "\u230B",
                loz: "\u25CA",
                spades: "\u2660",
                clubs: "\u2663",
                hearts: "\u2665",
                diams: "\u2666"
            };
        a.prototype.parseFromString = function(a, d) {
            var e = this.options,
                f = new i,
                g = e.domBuilder || new c,
                h = e.errorHandler,
                j = e.locator,
                l = e.xmlns || {},
                m = /\/x?html?$/.test(d),
                n = m ? k : {
                    "lt": "<",
                    "gt": ">",
                    "amp": "&",
                    "quot": "\"",
                    "apos": "'"
                };
            return j && g.setDocumentLocator(j), f.errorHandler = b(h, g, j), f.domBuilder = e.domBuilder || g, m && (l[""] = "http://www.w3.org/1999/xhtml"), l.xml = l.xml || "http://www.w3.org/XML/1998/namespace", a ? f.parse(a, l, n) : f.errorHandler.error("invalid doc source"), g.doc
        }, c.prototype = {
            startDocument: function() {
                this.doc = new j().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId)
            },
            startElement: function(a, b, c, e) {
                var f = this.doc,
                    h = f.createElementNS(a, c || b),
                    j = e.length;
                g(this, h), this.currentElement = h, this.locator && d(this.locator, h);
                for (var k = 0; k < j; k++) {
                    var a = e.getURI(k),
                        i = e.getValue(k),
                        c = e.getQName(k),
                        l = f.createAttributeNS(a, c);
                    this.locator && d(e.getLocator(k), l), l.value = l.nodeValue = i, h.setAttributeNode(l)
                }
            },
            endElement: function() {
                var a = this.currentElement,
                    b = a.tagName;
                this.currentElement = a.parentNode
            },
            startPrefixMapping: function() {},
            endPrefixMapping: function() {},
            processingInstruction: function(a, b) {
                var c = this.doc.createProcessingInstruction(a, b);
                this.locator && d(this.locator, c), g(this, c)
            },
            ignorableWhitespace: function() {},
            characters: function(a) {
                if (a = f.apply(this, arguments), a) {
                    if (this.cdata) var b = this.doc.createCDATASection(a);
                    else var b = this.doc.createTextNode(a);
                    this.currentElement ? this.currentElement.appendChild(b) : /^\s*$/.test(a) && this.doc.appendChild(b), this.locator && d(this.locator, b)
                }
            },
            skippedEntity: function() {},
            endDocument: function() {
                this.doc.normalize()
            },
            setDocumentLocator: function(a) {
                (this.locator = a) && (a.lineNumber = 0)
            },
            comment: function(a) {
                a = f.apply(this, arguments);
                var b = this.doc.createComment(a);
                this.locator && d(this.locator, b), g(this, b)
            },
            startCDATA: function() {
                this.cdata = !0
            },
            endCDATA: function() {
                this.cdata = !1
            },
            startDTD: function(a, b, c) {
                var e = this.doc.implementation;
                if (e && e.createDocumentType) {
                    var f = e.createDocumentType(a, b, c);
                    this.locator && d(this.locator, f), g(this, f)
                }
            },
            warning: function(a) {
                console.warn("[xmldom warning]\t" + a, e(this.locator))
            },
            error: function(a) {
                console.error("[xmldom error]\t" + a, e(this.locator))
            },
            fatalError: function(a) {
                throw console.error("[xmldom fatalError]\t" + a, e(this.locator)), a
            }
        }, "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(a) {
            c.prototype[a] = function() {
                return null
            }
        }), h.DOMParser = a
    }();