! function() {
    var a = "undefined" != typeof window && void 0 !== window.document ? window.document : {},
        d = "undefined" != typeof module && module.exports,
        c = function() {
            for (var l, m = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "),
                    "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")
                ], h = 0, e = m.length, p = {}; h < e; h++)
                if ((l = m[h]) && l[1] in a) {
                    for (h = 0; h < l.length; h++) p[m[0][h]] = l[h];
                    return p
                }
            return !1
        }(),
        g = {
            change: c.fullscreenchange,
            error: c.fullscreenerror
        },
        f = {
            request: function(l) {
                return new Promise(function(m, h) {
                    var e = function() {
                        this.off("change",
                            e);
                        m()
                    }.bind(this);
                    this.on("change", e);
                    l = l || a.documentElement;
                    Promise.resolve(l[c.requestFullscreen]())["catch"](h)
                }.bind(this))
            },
            exit: function() {
                return new Promise(function(l, m) {
                    if (this.isFullscreen) {
                        var h = function() {
                            this.off("change", h);
                            l()
                        }.bind(this);
                        this.on("change", h);
                        Promise.resolve(a[c.exitFullscreen]())["catch"](m)
                    } else l()
                }.bind(this))
            },
            toggle: function(l) {
                return this.isFullscreen ? this.exit() : this.request(l)
            },
            onchange: function(l) {
                this.on("change", l)
            },
            onerror: function(l) {
                this.on("error", l)
            },
            on: function(l, m) {
                var h = g[l];
                h && a.addEventListener(h, m, !1)
            },
            off: function(l, m) {
                var h = g[l];
                h && a.removeEventListener(h, m, !1)
            },
            raw: c
        };
    c ? (Object.defineProperties(f, {
        isFullscreen: {
            get: function() {
                return !!a[c.fullscreenElement]
            }
        },
        element: {
            enumerable: !0,
            get: function() {
                return a[c.fullscreenElement]
            }
        },
        isEnabled: {
            enumerable: !0,
            get: function() {
                return !!a[c.fullscreenEnabled]
            }
        }
    }), d ? module.exports = f : window.screenfull = f) : d ? module.exports = {
        isEnabled: !1
    } : window.screenfull = {
        isEnabled: !1
    }
}();
(function() {
    function a(k) {
        k = String(k);
        return k.charAt(0).toUpperCase() + k.slice(1)
    }

    function d(k, D) {
        var C = -1,
            v = k ? k.length : 0;
        if ("number" == typeof v && -1 < v && v <= I)
            for (; ++C < v;) D(k[C], C, k);
        else g(k, D)
    }

    function c(k) {
        k = String(k).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(k) ? k : a(k)
    }

    function g(k, D) {
        for (var C in k) G.call(k, C) && D(k[C], C, k)
    }

    function f(k) {
        return null == k ? a(k) : A.call(k).slice(8, -1)
    }

    function l(k, D) {
        var C = null != k ? typeof k[D] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(C) &&
            ("object" == C ? !!k[D] : !0)
    }

    function m(k) {
        return String(k).replace(/([ -])(?!$)/g, "$1?")
    }

    function h(k, D) {
        var C = null;
        d(k, function(v, t) {
            C = D(C, v, t, k)
        });
        return C
    }

    function e(k) {
        function D(V) {
            return h(V, function(T, S) {
                var Z = S.pattern || m(S);
                !T && (T = RegExp("\\b" + Z + " *\\d+[.\\w_]*", "i").exec(k) || RegExp("\\b" + Z + " *\\w+-[\\w]*", "i").exec(k) || RegExp("\\b" + Z + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(k)) && ((T = String(S.label && !RegExp(Z, "i").test(S.label) ? S.label : T).split("/"))[1] && !/[\d.]+/.test(T[0]) && (T[0] +=
                    " " + T[1]), S = S.label || S, T = c(T[0].replace(RegExp(Z, "i"), S).replace(RegExp("; *(?:" + S + "[_-])?", "i"), " ").replace(RegExp("(" + S + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return T
            })
        }

        function C(V) {
            return h(V, function(T, S) {
                return T || (RegExp(S + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(k) || 0)[1] || null
            })
        }
        var v = q,
            t = k && "object" == typeof k && "String" != f(k);
        t && (v = k, k = null);
        var H = v.navigator || {},
            w = H.userAgent || "";
        k || (k = w);
        var M = t ? !!H.likeChrome : /\bChrome\b/.test(k) && !/internal|\n/i.test(A.toString()),
            P = t ? "Object" : "ScriptBridgingProxyObject",
            N = t ? "Object" : "Environment",
            R = t && v.java ? "JavaPackage" : f(v.java),
            O = t ? "Object" : "RuntimeObject";
        N = (R = /\bJava/.test(R) && v.java) && f(v.environment) == N;
        var x = R ? "a" : "\u03b1",
            X = R ? "b" : "\u03b2",
            Y = v.document || {},
            U = v.operamini || v.opera,
            K = E.test(K = t && U ? U["[[Class]]"] : f(U)) ? K : U = null,
            n, aa = k;
        t = [];
        var y = null,
            Q = k == w;
        w = Q && U && "function" == typeof U.version && U.version();
        var z = function(V) {
                return h(V, function(T, S) {
                    return T || RegExp("\\b" + (S.pattern || m(S)) + "\\b", "i").exec(k) && (S.label ||
                        S)
                })
            }([{
                label: "EdgeHTML",
                pattern: "Edge"
            }, "Trident", {
                label: "WebKit",
                pattern: "AppleWebKit"
            }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
            b = function(V) {
                return h(V, function(T, S) {
                    return T || RegExp("\\b" + (S.pattern || m(S)) + "\\b", "i").exec(k) && (S.label || S)
                })
            }(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
                    label: "Microsoft Edge",
                    pattern: "Edge"
                }, "Midori", "Nook Browser",
                "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
                    label: "Samsung Internet",
                    pattern: "SamsungBrowser"
                }, "SeaMonkey", {
                    label: "Silk",
                    pattern: "(?:Cloud9|Silk-Accelerated)"
                }, "Sleipnir", "SlimBrowser", {
                    label: "SRWare Iron",
                    pattern: "Iron"
                }, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
                    label: "Opera Mini",
                    pattern: "OPiOS"
                }, "Opera", {
                    label: "Opera",
                    pattern: "OPR"
                }, "Chrome", {
                    label: "Chrome Mobile",
                    pattern: "(?:CriOS|CrMo)"
                }, {
                    label: "Firefox",
                    pattern: "(?:Firefox|Minefield)"
                }, {
                    label: "Firefox for iOS",
                    pattern: "FxiOS"
                },
                {
                    label: "IE",
                    pattern: "IEMobile"
                }, {
                    label: "IE",
                    pattern: "MSIE"
                }, "Safari"
            ]),
            u = D([{
                    label: "BlackBerry",
                    pattern: "BB10"
                }, "BlackBerry", {
                    label: "Galaxy S",
                    pattern: "GT-I9000"
                }, {
                    label: "Galaxy S2",
                    pattern: "GT-I9100"
                }, {
                    label: "Galaxy S3",
                    pattern: "GT-I9300"
                }, {
                    label: "Galaxy S4",
                    pattern: "GT-I9500"
                }, {
                    label: "Galaxy S5",
                    pattern: "SM-G900"
                }, {
                    label: "Galaxy S6",
                    pattern: "SM-G920"
                }, {
                    label: "Galaxy S6 Edge",
                    pattern: "SM-G925"
                }, {
                    label: "Galaxy S7",
                    pattern: "SM-G930"
                }, {
                    label: "Galaxy S7 Edge",
                    pattern: "SM-G935"
                }, "Google TV", "Lumia", "iPad",
                "iPod", "iPhone", "Kindle", {
                    label: "Kindle Fire",
                    pattern: "(?:Cloud9|Silk-Accelerated)"
                }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
                    label: "Wii U",
                    pattern: "WiiU"
                }, "Wii", "Xbox One", {
                    label: "Xbox 360",
                    pattern: "Xbox"
                }, "Xoom"
            ]),
            L = function(V) {
                return h(V, function(T, S, Z) {
                    return T || (S[u] || S[/^[a-z]+(?: +[a-z]+\b)*/i.exec(u)] || RegExp("\\b" + m(Z) + "(?:\\b|\\w*\\d)", "i").exec(k)) && Z
                })
            }({
                Apple: {
                    iPad: 1,
                    iPhone: 1,
                    iPod: 1
                },
                Archos: {},
                Amazon: {
                    Kindle: 1,
                    "Kindle Fire": 1
                },
                Asus: {
                    Transformer: 1
                },
                "Barnes & Noble": {
                    Nook: 1
                },
                BlackBerry: {
                    PlayBook: 1
                },
                Google: {
                    "Google TV": 1,
                    Nexus: 1
                },
                HP: {
                    TouchPad: 1
                },
                HTC: {},
                LG: {},
                Microsoft: {
                    Xbox: 1,
                    "Xbox One": 1
                },
                Motorola: {
                    Xoom: 1
                },
                Nintendo: {
                    "Wii U": 1,
                    Wii: 1
                },
                Nokia: {
                    Lumia: 1
                },
                Samsung: {
                    "Galaxy S": 1,
                    "Galaxy S2": 1,
                    "Galaxy S3": 1,
                    "Galaxy S4": 1
                },
                Sony: {
                    PlayStation: 1,
                    "PlayStation Vita": 1
                }
            }),
            B = function(V) {
                return h(V, function(T, S) {
                    var Z = S.pattern || m(S);
                    if (!T && (T = RegExp("\\b" + Z + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(k))) {
                        var ba = T,
                            ca = S.label || S,
                            da = {
                                "10.0": "10",
                                "6.4": "10 Technical Preview",
                                "6.3": "8.1",
                                "6.2": "8",
                                "6.1": "Server 2008 R2 / 7",
                                "6.0": "Server 2008 / Vista",
                                "5.2": "Server 2003 / XP 64-bit",
                                "5.1": "XP",
                                "5.01": "2000 SP1",
                                "5.0": "2000",
                                "4.0": "NT",
                                "4.90": "ME"
                            };
                        Z && ca && /^Win/i.test(ba) && !/^Windows Phone /i.test(ba) && (da = da[/[\d.]+$/.exec(ba)]) && (ba = "Windows " + da);
                        ba = String(ba);
                        Z && ca && (ba = ba.replace(RegExp(Z, "i"), ca));
                        T = ba = c(ba.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/,
                            "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                    }
                    return T
                })
            }(["Windows Phone", "Android", "CentOS", {
                    label: "Chrome OS",
                    pattern: "CrOS"
                }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X",
                "Macintosh", "Mac", "Windows 98;", "Windows "
            ]);
        z && (z = [z]);
        L && !u && (u = D([L]));
        if (n = /\bGoogle TV\b/.exec(u)) u = n[0];
        /\bSimulator\b/i.test(k) && (u = (u ? u + " " : "") + "Simulator");
        "Opera Mini" == b && /\bOPiOS\b/.test(k) && t.push("running in Turbo/Uncompressed mode");
        "IE" == b && /\blike iPhone OS\b/.test(k) ? (n = e(k.replace(/like iPhone OS/, "")), L = n.manufacturer, u = n.product) : /^iP/.test(u) ? (b || (b = "Safari"), B = "iOS" + ((n = / OS ([\d_]+)/i.exec(k)) ? " " + n[1].replace(/_/g, ".") : "")) : "Konqueror" != b || /buntu/i.test(B) ? L && "Google" != L &&
            (/Chrome/.test(b) && !/\bMobile Safari\b/i.test(k) || /\bVita\b/.test(u)) || /\bAndroid\b/.test(B) && /^Chrome/.test(b) && /\bVersion\//i.test(k) ? (b = "Android Browser", B = /\bAndroid\b/.test(B) ? B : "Android") : "Silk" == b ? (/\bMobi/i.test(k) || (B = "Android", t.unshift("desktop mode")), /Accelerated *= *true/i.test(k) && t.unshift("accelerated")) : "PaleMoon" == b && (n = /\bFirefox\/([\d.]+)\b/.exec(k)) ? t.push("identifying as Firefox " + n[1]) : "Firefox" == b && (n = /\b(Mobile|Tablet|TV)\b/i.exec(k)) ? (B || (B = "Firefox OS"), u || (u = n[1])) : !b ||
            (n = !/\bMinefield\b/i.test(k) && /\b(?:Firefox|Safari)\b/.exec(b)) ? (b && !u && /[\/,]|^[^(]+?\)/.test(k.slice(k.indexOf(n + "/") + 8)) && (b = null), (n = u || L || B) && (u || L || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(B)) && (b = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(B) ? B : n) + " Browser")) : "Electron" == b && (n = (/\bChrome\/([\d.]+)\b/.exec(k) || 0)[1]) && t.push("Chromium " + n) : B = "Kubuntu";
        w || (w = C(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", m(b),
            "(?:Firefox|Minefield|NetFront)"
        ]));
        if (n = "iCab" == z && 3 < parseFloat(w) && "WebKit" || /\bOpera\b/.test(b) && (/\bOPR\b/.test(k) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(k) && !/^(?:Trident|EdgeHTML)$/.test(z) && "WebKit" || !z && /\bMSIE\b/i.test(k) && ("Mac OS" == B ? "Tasman" : "Trident") || "WebKit" == z && /\bPlayStation\b(?! Vita\b)/i.test(b) && "NetFront") z = [n];
        "IE" == b && (n = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(k) || 0)[1]) ? (b += " Mobile", B = "Windows Phone " + (/\+$/.test(n) ? n : n + ".x"), t.unshift("desktop mode")) : /\bWPDesktop\b/i.test(k) ?
            (b = "IE Mobile", B = "Windows Phone 8.x", t.unshift("desktop mode"), w || (w = (/\brv:([\d.]+)/.exec(k) || 0)[1])) : "IE" != b && "Trident" == z && (n = /\brv:([\d.]+)/.exec(k)) && (b && t.push("identifying as " + b + (w ? " " + w : "")), b = "IE", w = n[1]);
        if (Q) {
            if (l(v, "global"))
                if (R && (n = R.lang.System, aa = n.getProperty("os.arch"), B = B || n.getProperty("os.name") + " " + n.getProperty("os.version")), N) {
                    try {
                        w = v.require("ringo/engine").version.join("."), b = "RingoJS"
                    } catch (V) {
                        (n = v.system) && n.global.system == v.system && (b = "Narwhal", B || (B = n[0].os || null))
                    }
                    b ||
                        (b = "Rhino")
                } else "object" == typeof v.process && !v.process.browser && (n = v.process) && ("object" == typeof n.versions && ("string" == typeof n.versions.electron ? (t.push("Node " + n.versions.node), b = "Electron", w = n.versions.electron) : "string" == typeof n.versions.nw && (t.push("Chromium " + w, "Node " + n.versions.node), b = "NW.js", w = n.versions.nw)), b || (b = "Node.js", aa = n.arch, B = n.platform, w = (w = /[\d.]+/.exec(n.version)) ? w[0] : null));
            else f(n = v.runtime) == P ? (b = "Adobe AIR", B = n.flash.system.Capabilities.os) : f(n = v.phantom) == O ? (b = "PhantomJS",
                w = (n = n.version || null) && n.major + "." + n.minor + "." + n.patch) : "number" == typeof Y.documentMode && (n = /\bTrident\/(\d+)/i.exec(k)) ? (w = [w, Y.documentMode], (n = +n[1] + 4) != w[1] && (t.push("IE " + w[1] + " mode"), z && (z[1] = ""), w[1] = n), w = "IE" == b ? String(w[1].toFixed(1)) : w[0]) : "number" == typeof Y.documentMode && /^(?:Chrome|Firefox)\b/.test(b) && (t.push("masking as " + b + " " + w), b = "IE", w = "11.0", z = ["Trident"], B = "Windows");
            B = B && c(B)
        }
        w && (n = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(w) || /(?:alpha|beta)(?: ?\d)?/i.exec(k + ";" + (Q && H.appMinorVersion)) ||
            /\bMinefield\b/i.test(k) && "a") && (y = /b/i.test(n) ? "beta" : "alpha", w = w.replace(RegExp(n + "\\+?$"), "") + ("beta" == y ? X : x) + (/\d+\+?/.exec(n) || ""));
        if ("Fennec" == b || "Firefox" == b && /\b(?:Android|Firefox OS)\b/.test(B)) b = "Firefox Mobile";
        else if ("Maxthon" == b && w) w = w.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(u)) "Xbox 360" == u && (B = null), "Xbox 360" == u && /\bIEMobile\b/.test(k) && t.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(b) && (!b || u || /Browser|Mobi/.test(b)) || "Windows CE" != B && !/Mobi/i.test(k))
            if ("IE" ==
                b && Q) try {
                null === v.external && t.unshift("platform preview")
            } catch (V) {
                t.unshift("embedded")
            } else(/\bBlackBerry\b/.test(u) || /\bBB10\b/.test(k)) && (n = (RegExp(u.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(k) || 0)[1] || w) ? (n = [n, /BB10/.test(k)], B = (n[1] ? (u = null, L = "BlackBerry") : "Device Software") + " " + n[0], w = null) : this != g && "Wii" != u && (Q && U || /Opera/.test(b) && /\b(?:MSIE|Firefox)\b/i.test(k) || "Firefox" == b && /\bOS X (?:\d+\.){2,}/.test(B) || "IE" == b && (B && !/^Win/.test(B) && 5.5 < w || /\bWindows XP\b/.test(B) && 8 < w || 8 == w && !/\bTrident\b/.test(k))) &&
                !E.test(n = e.call(g, k.replace(E, "") + ";")) && n.name && (n = "ing as " + n.name + ((n = n.version) ? " " + n : ""), E.test(b) ? (/\bIE\b/.test(n) && "Mac OS" == B && (B = null), n = "identify" + n) : (n = "mask" + n, b = K ? c(K.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(n) && (B = null), Q || (w = null)), z = ["Presto"], t.push(n));
            else b += " Mobile";
        if (n = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(k) || 0)[1]) {
            n = [parseFloat(n.replace(/\.(\d)$/, ".0$1")), n];
            if ("Safari" == b && "+" == n[1].slice(-1)) b = "WebKit Nightly", y = "alpha", w = n[1].slice(0, -1);
            else if (w ==
                n[1] || w == (n[2] = (/\bSafari\/([\d.]+\+?)/i.exec(k) || 0)[1])) w = null;
            n[1] = (/\bChrome\/([\d.]+)/i.exec(k) || 0)[1];
            537.36 == n[0] && 537.36 == n[2] && 28 <= parseFloat(n[1]) && "WebKit" == z && (z = ["Blink"]);
            Q && (M || n[1]) ? (z && (z[1] = "like Chrome"), n = n[1] || (n = n[0], 530 > n ? 1 : 532 > n ? 2 : 532.05 > n ? 3 : 533 > n ? 4 : 534.03 > n ? 5 : 534.07 > n ? 6 : 534.1 > n ? 7 : 534.13 > n ? 8 : 534.16 > n ? 9 : 534.24 > n ? 10 : 534.3 > n ? 11 : 535.01 > n ? 12 : 535.02 > n ? "13+" : 535.07 > n ? 15 : 535.11 > n ? 16 : 535.19 > n ? 17 : 536.05 > n ? 18 : 536.1 > n ? 19 : 537.01 > n ? 20 : 537.11 > n ? "21+" : 537.13 > n ? 23 : 537.18 > n ? 24 : 537.24 > n ? 25 : 537.36 >
                n ? 26 : "Blink" != z ? "27" : "28")) : (z && (z[1] = "like Safari"), n = (n = n[0], 400 > n ? 1 : 500 > n ? 2 : 526 > n ? 3 : 533 > n ? 4 : 534 > n ? "4+" : 535 > n ? 5 : 537 > n ? 6 : 538 > n ? 7 : 601 > n ? 8 : "8"));
            z && (z[1] += " " + (n += "number" == typeof n ? ".x" : /[.+]/.test(n) ? "" : "+"));
            "Safari" == b && (!w || 45 < parseInt(w)) && (w = n)
        }
        "Opera" == b && (n = /\bzbov|zvav$/.exec(B)) ? (b += " ", t.unshift("desktop mode"), "zvav" == n ? (b += "Mini", w = null) : b += "Mobile", B = B.replace(RegExp(" *" + n + "$"), "")) : "Safari" == b && /\bChrome\b/.exec(z && z[1]) && (t.unshift("desktop mode"), b = "Chrome Mobile", w = null, /\bOS X\b/.test(B) ?
            (L = "Apple", B = "iOS 4.3+") : B = null);
        w && 0 == w.indexOf(n = /[\d.]+$/.exec(B)) && -1 < k.indexOf("/" + n + "-") && (B = String(B.replace(n, "")).replace(/^ +| +$/g, ""));
        z && !/\b(?:Avant|Nook)\b/.test(b) && (/Browser|Lunascape|Maxthon/.test(b) || "Safari" != b && /^iOS/.test(B) && /\bSafari\b/.test(z[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(b) && z[1]) && (n = z[z.length - 1]) && t.push(n);
        t.length && (t = ["(" + t.join("; ") + ")"]);
        L && u && 0 > u.indexOf(L) && t.push("on " + L);
        u && t.push((/^on /.test(t[t.length -
            1]) ? "" : "on ") + u);
        if (B) {
            var W = (n = / ([\d.+]+)$/.exec(B)) && "/" == B.charAt(B.length - n[0].length - 1);
            B = {
                architecture: 32,
                family: n && !W ? B.replace(n[0], "") : B,
                version: n ? n[1] : null,
                toString: function() {
                    var V = this.version;
                    return this.family + (V && !W ? " " + V : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }(n = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(aa)) && !/\bi686\b/i.test(aa) ? (B && (B.architecture = 64, B.family = B.family.replace(RegExp(" *" + n), "")), b && (/\bWOW64\b/i.test(k) || Q && /\w(?:86|32)$/.test(H.cpuClass || H.platform) && !/\bWin64; x64\b/i.test(k)) &&
            t.unshift("32-bit")) : B && /^OS X/.test(B.family) && "Chrome" == b && 39 <= parseFloat(w) && (B.architecture = 64);
        k || (k = null);
        v = {};
        v.description = k;
        v.layout = z && z[0];
        v.manufacturer = L;
        v.name = b;
        v.prerelease = y;
        v.product = u;
        v.ua = k;
        v.version = b && w;
        v.os = B || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        v.parse = e;
        v.toString = function() {
            return this.description || ""
        };
        v.version && t.unshift(w);
        v.name && t.unshift(b);
        B && b && (B != String(B).split(" ")[0] || B != b.split(" ")[0] && !u) && t.push(u ? "(" + B + ")" : "on " +
            B);
        t.length && (v.description = t.join(" "));
        return v
    }
    var p = {
            "function": !0,
            object: !0
        },
        q = p[typeof window] && window || this,
        J = p[typeof exports] && exports;
    p = p[typeof module] && module && !module.nodeType && module;
    var r = J && p && "object" == typeof global && global;
    !r || r.global !== r && r.window !== r && r.self !== r || (q = r);
    var I = Math.pow(2, 53) - 1,
        E = /\bOpera/;
    r = Object.prototype;
    var G = r.hasOwnProperty,
        A = r.toString,
        F = e();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (q.platform = F, define(function() {
            return F
        })) : J &&
        p ? g(F, function(k, D) {
            J[D] = k
        }) : q.platform = F
}).call(this);

function buildIOSMeta() {
    for (var a = [{
            name: "viewport",
            content: "width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        }, {
            name: "apple-mobile-web-app-capable",
            content: "yes"
        }, {
            name: "apple-mobile-web-app-status-bar-style",
            content: "black"
        }], d = 0; d < a.length; d++) {
        var c = document.createElement("meta");
        c.name = a[d].name;
        c.content = a[d].content;
        var g = window.document.head.querySelector('meta[name="' + c.name + '"]');
        g && g.parentNode.removeChild(g);
        window.document.head.appendChild(c)
    }
}

function hideIOSFullscreenPanel() {
    jQuery(".xxx-ios-fullscreen-message").css("display", "none");
    jQuery(".xxx-ios-fullscreen-scroll").css("display", "none");
    jQuery(".xxx-game-iframe-full").removeClass("xxx-game-iframe-iphone-se")
}

function buildIOSFullscreenPanel() {
    jQuery("body").append('<div class="xxx-ios-fullscreen-message"><div class="xxx-ios-fullscreen-swipe"></div></div><div class="xxx-ios-fullscreen-scroll"></div>')
}

function showIOSFullscreenPanel() {
    jQuery(".xxx-ios-fullscreen-message").css("display", "block");
    jQuery(".xxx-ios-fullscreen-scroll").css("display", "block")
}

function __iosResize() {
    window.scrollTo(0, 0);
    console.log(window.devicePixelRatio);
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    if ("iPhone" === platform.product) switch (window.devicePixelRatio) {
        case 2:
            switch (window.innerWidth) {
                case 568:
                    320 !== window.innerHeight && jQuery(".xxx-game-iframe-full").addClass("xxx-game-iframe-iphone-se");
                    break;
                case 667:
                    375 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                    break;
                case 808:
                    414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                    break;
                default:
                    hideIOSFullscreenPanel()
            }
            break;
        case 3:
            switch (window.innerWidth) {
                case 736:
                    414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                    break;
                case 724:
                    375 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                    break;
                case 808:
                    414 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                    break;
                default:
                    hideIOSFullscreenPanel()
            }
            break;
        default:
            hideIOSFullscreenPanel()
    }
}

function iosResize() {
    __iosResize();
    setTimeout(function() {
        __iosResize()
    }, 500)
}

function iosInIframe() {
    try {
        return window.self !== window.top
    } catch (a) {
        return !0
    }
}
$(document).ready(function() {
    platform && "iPhone" === platform.product && "safari" !== platform.name.toLowerCase() && (buildIOSFullscreenPanel(), buildIOSMeta())
});
jQuery(window).resize(function() {
    platform && "iPhone" === platform.product && "safari" !== platform.name.toLowerCase() && iosResize()
});
var s_iOffsetX, s_iOffsetY, s_iScaleFactor = 1,
    s_bIsIphone = !1;
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,
        4))
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});

function trace(a) {
    console.log(a)
}

function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
}

function isIOS() {
    var a = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    for (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone") && (s_bIsIphone = !0); a.length;)
        if (navigator.platform === a.pop()) return !0;
    return s_bIsIphone = !1
}

function getSize(a) {
    var d = a.toLowerCase(),
        c = window.document,
        g = c.documentElement;
    if (void 0 === window["inner" + a]) a = g["client" + a];
    else if (window["inner" + a] != g["client" + a]) {
        var f = c.createElement("body");
        f.id = "vpw-test-b";
        f.style.cssText = "overflow:scroll";
        var l = c.createElement("div");
        l.id = "vpw-test-d";
        l.style.cssText = "position:absolute;top:-1000px";
        l.innerHTML = "<style>@media(" + d + ":" + g["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + d + ":7px!important}}</style>";
        f.appendChild(l);
        g.insertBefore(f, c.head);
        a = 7 == l["offset" + a] ? g["client" + a] : window["inner" + a];
        g.removeChild(f)
    } else a = window["inner" + a];
    return a
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}

function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}

function getHeightOfIOSToolbars() {
    var a = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < a ? a : 0
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a = "safari" === platform.name.toLowerCase() ? getIOSWindowHeight() : getSize("Height");
        var d = getSize("Width");
        _checkOrientation(d, a);
        var c = Math.min(a / CANVAS_HEIGHT, d / CANVAS_WIDTH),
            g = Math.round(CANVAS_WIDTH * c);
        c = Math.round(CANVAS_HEIGHT * c);
        if (c < a) {
            var f = a - c;
            c += f;
            g += CANVAS_WIDTH / CANVAS_HEIGHT * f
        } else g < d && (f = d - g, g += f, c += CANVAS_HEIGHT / CANVAS_WIDTH * f);
        f = a / 2 - c / 2;
        var l = d / 2 - g / 2,
            m = CANVAS_WIDTH / g;
        if (l * m < -EDGEBOARD_X || f * m < -EDGEBOARD_Y) c = Math.min(a / (CANVAS_HEIGHT -
            2 * EDGEBOARD_Y), d / (CANVAS_WIDTH - 2 * EDGEBOARD_X)), g = Math.round(CANVAS_WIDTH * c), c = Math.round(CANVAS_HEIGHT * c), f = (a - c) / 2, l = (d - g) / 2, m = CANVAS_WIDTH / g;
        s_iOffsetX = -1 * l * m;
        s_iOffsetY = -1 * f * m;
        0 <= f && (s_iOffsetY = 0);
        0 <= l && (s_iOffsetX = 0);
        null !== s_oGame && s_oGame.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone ? (canvas = document.getElementById("canvas"), s_oStage.canvas.width = 2 * g, s_oStage.canvas.height = 2 * c, canvas.style.width = g + "px", canvas.style.height =
            c + "px", d = Math.min(g / CANVAS_WIDTH, c / CANVAS_HEIGHT), s_iScaleFactor = 2 * d, s_oStage.scaleX = s_oStage.scaleY = 2 * d) : s_bMobile || isChrome() ? ($("#canvas").css("width", g + "px"), $("#canvas").css("height", c + "px")) : (s_oStage.canvas.width = g, s_oStage.canvas.height = c, s_iScaleFactor = Math.min(g / CANVAS_WIDTH, c / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > f || (f = (a - c) / 2);
        $("#canvas").css("top", f + "px");
        $("#canvas").css("left", l + "px");
        fullscreenHandler()
    }
}

function _checkOrientation(a, d) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (a > d ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
        s_oMain.stopUpdate()))
}

function createBitmap(a, d, c) {
    var g = new createjs.Bitmap(a),
        f = new createjs.Shape;
    d && c ? f.graphics.beginFill("#fff").drawRect(0, 0, d, c) : f.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    g.hitArea = f;
    return g
}

function createSprite(a, d, c, g, f, l) {
    a = null !== d ? new createjs.Sprite(a, d) : new createjs.Sprite(a);
    d = new createjs.Shape;
    d.graphics.beginFill("#000000").drawRect(-c, -g, f, l);
    a.hitArea = d;
    return a
}

function randomFloatBetween(a, d, c) {
    "undefined" === typeof c && (c = 2);
    return parseFloat(Math.min(a + Math.random() * (d - a), d).toFixed(c))
}

function shuffle(a) {
    for (var d = a.length, c, g; 0 !== d;) g = Math.floor(Math.random() * d), --d, c = a[d], a[d] = a[g], a[g] = c;
    return a
}

function interpolate(a, d, c) {
    return {
        x: a.x + (d.x - a.x) * c,
        y: a.y + (d.y - a.y) * c
    }
}

function formatTime(a) {
    a /= 1E3;
    var d = Math.floor(a / 60);
    a = parseFloat(a - 60 * d).toFixed(1);
    var c = "";
    c = 10 > d ? c + ("0" + d + ":") : c + (d + ":");
    return 10 > a ? c + ("0" + a) : c + a
}

function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
NoClickDelay.prototype = {
    handleEvent: function(a) {
        switch (a.type) {
            case "touchstart":
                this.onTouchStart(a);
                break;
            case "touchmove":
                this.onTouchMove(a);
                break;
            case "touchend":
                this.onTouchEnd(a)
        }
    },
    onTouchStart: function(a) {
        a.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function(a) {
        this.moved = !0
    },
    onTouchEnd: function(a) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend",
            this, !1);
        if (!this.moved) {
            a = document.elementFromPoint(a.changedTouches[0].clientX, a.changedTouches[0].clientY);
            3 === a.nodeType && (a = a.parentNode);
            var d = document.createEvent("MouseEvents");
            d.initEvent("click", !0, !0);
            a.dispatchEvent(d)
        }
    }
};

function playSound(a, d, c) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(), s_aSounds[a].volume(d), s_aSounds[a].loop(c), s_aSounds[a]) : null
}

function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].stop()
}

function setVolume(a, d) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].volume(d)
}

function setMute(a, d) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].mute(d)
}

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}

function getParamValue(a) {
    for (var d = window.location.search.substring(1).split("&"), c = 0; c < d.length; c++) {
        var g = d[c].split("=");
        if (g[0] == a) return g[1]
    }
}
(function() {
    function a(c) {
        var g = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        c = c || window.event;
        c.type in g ? document.body.className = g[c.type] : (document.body.className = this[d] ? "hidden" : "visible", "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var d = "hidden";
    d in document ? document.addEventListener("visibilitychange", a) : (d = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", a) : (d = "webkitHidden") in
        document ? document.addEventListener("webkitvisibilitychange", a) : (d = "msHidden") in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin" in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
})();

function fullscreenHandler() {
    ENABLE_FULLSCREEN && screenfull.isEnabled && (s_bFullscreen = screenfull.isFullscreen, null !== s_oInterface && s_oInterface.resetFullscreenBut(), null !== s_oMenu && s_oMenu.resetFullscreenBut())
}
if (screenfull.isEnabled) screenfull.on("change", function() {
    s_bFullscreen = screenfull.isFullscreen;
    null !== s_oInterface && s_oInterface.resetFullscreenBut();
    null !== s_oMenu && s_oMenu.resetFullscreenBut()
});

function saveItem(a, d) {
    s_bStorageAvailable && localStorage.setItem(a, d)
}

function getItem(a) {
    return s_bStorageAvailable ? localStorage.getItem(a) : null
}

function clearLocalStorage() {
    TOTAL_MONEY = START_MONEY;
    if (s_bStorageAvailable)
        for (var a = 0; null !== localStorage.key(a);) {
            var d = localStorage.key(a); - 1 !== d.indexOf(LOCALSTORAGE_STRING) ? localStorage.removeItem(d) : a++
        }
}

function CSpriteLibrary() {
    var a = {},
        d, c, g, f, l, m;
    this.init = function(h, e, p) {
        d = {};
        g = c = 0;
        f = h;
        l = e;
        m = p
    };
    this.addSprite = function(h, e) {
        if (a.hasOwnProperty(h)) return !1;
        var p = new Image;
        a[h] = d[h] = {
            szPath: e,
            oSprite: p,
            bLoaded: !1
        };
        c++;
        return !0
    };
    this.getSprite = function(h) {
        return a.hasOwnProperty(h) ? a[h].oSprite : null
    };
    this._onSpritesLoaded = function() {
        c = 0;
        l.call(m)
    };
    this._onSpriteLoaded = function() {
        f.call(m);
        ++g === c && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var h in d) d[h].oSprite.oSpriteLibrary = this,
            d[h].oSprite.szKey = h, d[h].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey)
            }, d[h].oSprite.onerror = function(e) {
                var p = e.currentTarget;
                setTimeout(function() {
                    d[p.szKey].oSprite.src = d[p.szKey].szPath
                }, 500)
            }, d[h].oSprite.src = d[h].szPath
    };
    this.setLoaded = function(h) {
        a[h].bLoaded = !0
    };
    this.isLoaded = function(h) {
        return a[h].bLoaded
    };
    this.getNumSprites = function() {
        return c
    }
}
var CANVAS_WIDTH = 1054,
    CANVAS_HEIGHT = 540,
    EDGEBOARD_X = 126,
    EDGEBOARD_Y = 35,
    FPS = 30,
    FPS_TIME = 1E3 / FPS,
    DISABLE_SOUND_MOBILE = !1,
    DISABLE_SOUND_DESKTOP = !1,
    LOCALSTORAGE_STRING = "slot_katana_fruits_",
    FONT_GAME_1 = "gang_of_threeregular",
    FONT_GAME_2 = "seven_swordsmen_bbregular",
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_GAME = 2,
    GAME_STATE_IDLE = 0,
    GAME_STATE_SPINNING = 1,
    GAME_STATE_SHOW_ALL_WIN = 2,
    GAME_STATE_SHOW_WIN = 3,
    GAME_STATE_BONUS = 4,
    REEL_STATE_START = 0,
    REEL_STATE_MOVING = 1,
    REEL_STATE_STOP = 2,
    SPIN_BUT_STATE_SPIN = "spin",
    SPIN_BUT_STATE_STOP =
    "stop",
    SPIN_BUT_STATE_AUTOSPIN = "autospin",
    SPIN_BUT_STATE_DISABLE = "disable",
    SPIN_BUT_STATE_FREESPIN = "freespin",
    SPIN_BUT_STATE_SKIP = "skip",
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    ON_BUT_YES_DOWN = 6,
    BONUS_BUTTON_1 = "up_left",
    BONUS_BUTTON_2 = "center_left",
    BONUS_BUTTON_3 = "down_left",
    BONUS_BUTTON_4 = "up_right",
    BONUS_BUTTON_5 = "center_right",
    BONUS_BUTTON_6 = "down_right",
    REEL_OFFSET_X = 273,
    REEL_OFFSET_Y = 77,
    START_REEL_OFFSET_X, START_REEL_OFFSET_Y, NUM_REELS = 5,
    NUM_ROWS =
    3,
    NUM_SYMBOLS = 10,
    WILD_SYMBOL = 7,
    BONUS_SYMBOL = 9,
    FREESPIN_SYMBOL = 8,
    NUM_PAYLINES = 20,
    SYMBOL_WIDTH = 108,
    SYMBOL_HEIGHT = 104,
    SPACE_BETWEEN_SYMBOLS = 6,
    SPACE_HEIGHT_BETWEEN_SYMBOLS = 0,
    MAX_FRAMES_REEL_EASE = 12,
    MIN_REEL_LOOPS, REEL_DELAY, REEL_START_Y = 14 - 3 * (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS),
    REEL_ARRIVAL_Y = 14 + 3 * (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS),
    TIME_SHOW_WIN, TIME_SHOW_ALL_WINS, TIME_SPIN_BUT_CHANGE = 1E3,
    TIME_HOLD_AUTOSPIN = 1E3,
    SYMBOL_FALL_SPEED = 24,
    MAX_BET, TOTAL_MONEY, COIN_BET, START_BET, BONUS_FREESPIN =
    1,
    BONUS_GAME = 2,
    STATE_BONUS_IDLE = 0,
    STATE_BONUS_KICK = 1,
    STATE_BONUS_WIN = 2,
    STATE_BONUS_LOSE = 3,
    ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, SOUNDTRACK_VOLUME_IN_GAME = 1,
    RESTART_CREDIT, NUM_SPIN_FOR_ADS, MULT_PER_BONUS_FINAL_PRIZE = 140,
    GAME_NAME = "ctl-fruits-low";
TOTAL_MONEY = START_MONEY = 100;
var WIN_OCCURRENCE = 30,
    FREESPIN_OCCURRENCE = 10,
    BONUS_OCCURRENCE = 10,
    SLOT_CASH = 100,
    NUM_FREESPIN = [3, 4, 5],
    BONUS_PRIZE = [10, 30, 60, 90, 100],
    BONUS_PRIZE_OCCURRENCE = [40, 25, 20, 10, 5],
    MAX_PRIZES_BONUS = 5;
COIN_BET = [.05, .1, .15, .2, .25, .3, .35, .4, .45, .5];
var PAYTABLE_VALUES = [
        [0, 0, 5, 20, 100],
        [0, 0, 5, 20, 100],
        [0, 0, 5, 20, 100],
        [0, 0, 10, 30, 150],
        [0, 0, 20, 50, 200],
        [0, 0, 25, 70, 300],
        [0, 0, 25, 100, 500]
    ],
    _bBonus = !1,
    _bFreespinEnable = !1,
    _iMinWin, _iTotFreeSpin = 0,
    _iNumSymbolFreeSpin = 0,
    _aCbCompleted = [],
    _aCbOwner = [],
    _aSymbolWin = [],
    _iFreespinSymbolNumOccur = [50, 30, 20],
    _aPaylineCombo = [],
    _aFinalSymbols;

function APIgetSlotInfos(a, d) {
    a.call(d, {
        start_money: TOTAL_MONEY,
        bets: COIN_BET,
        start_bet: COIN_BET[0],
        paytable: PAYTABLE_VALUES
    })
}

function APIAttemptSpin(a, d, c, g, f) {
    if (a > TOTAL_MONEY) _dieError("INVALID BET: " + a + ",money:" + TOTAL_MONEY, g, f);
    else {
        TOTAL_MONEY -= a;
        SLOT_CASH += a;
        TOTAL_MONEY = parseFloat(TOTAL_MONEY.toFixed(2));
        SLOT_CASH = parseFloat(SLOT_CASH.toFixed(2));
        var l = _bBonus = !1;
        if (SLOT_CASH < _iMinWin * d) generLosingPattern(), !0 === _bFreespinEnable && (_iTotFreeSpin--, 0 > _iTotFreeSpin && (_iTotFreeSpin = 0, _bFreespinEnable = !1)), a = {
            res: !0,
            win: !1,
            pattern: _aFinalSymbols,
            win_lines: {},
            money: TOTAL_MONEY,
            tot_win: 0,
            freespin: !1,
            num_freespin: _iTotFreeSpin,
            bonus: !1,
            bonus_prize: -1,
            cash: SLOT_CASH
        };
        else if (Math.floor(100 * Math.random()) < WIN_OCCURRENCE) {
            if (!1 === _bFreespinEnable && !1 === _bBonus) {
                var m = Math.floor(100 * Math.random());
                0 === _iTotFreeSpin && m < FREESPIN_OCCURRENCE + BONUS_OCCURRENCE && (m = Math.floor(Math.random() * (FREESPIN_OCCURRENCE + BONUS_OCCURRENCE) + 1), m <= FREESPIN_OCCURRENCE ? l = !0 : _bBonus = SLOT_CASH >= BONUS_PRIZE[0] * d ? !0 : !1)
            }
            m = 0;
            do {
                generateRandomSymbols(l);
                for (var h = checkWin(l, c), e = 0, p = 0; p < h.length; p++) e += h[p].amount;
                e *= d;
                m++
            } while (0 === h.length || 0 + e > SLOT_CASH ||
                0 + e < a);
            TOTAL_MONEY += e + 0;
            SLOT_CASH -= e + 0;
            TOTAL_MONEY = parseFloat(TOTAL_MONEY.toFixed(2));
            SLOT_CASH = parseFloat(SLOT_CASH.toFixed(2));
            l && 2 < _iNumSymbolFreeSpin ? (_bFreespinEnable = !0, _iTotFreeSpin = NUM_FREESPIN[_iNumSymbolFreeSpin - 3]) : !0 === _bFreespinEnable && (_iTotFreeSpin--, 0 > _iTotFreeSpin && (_iTotFreeSpin = 0, _bFreespinEnable = !1));
            a = {
                res: !0,
                win: !0,
                pattern: _aFinalSymbols,
                win_lines: h,
                money: TOTAL_MONEY,
                tot_win: e,
                freespin: l,
                num_freespin: _iTotFreeSpin,
                bonus: _bBonus,
                bonus_prize: -1,
                cash: SLOT_CASH
            }
        } else generLosingPattern(), !0 === _bFreespinEnable && (_iTotFreeSpin--, 0 > _iTotFreeSpin && (_iTotFreeSpin = 0, _bFreespinEnable = !1)), a = {
            res: !0,
            win: !1,
            pattern: _aFinalSymbols,
            win_lines: {},
            money: TOTAL_MONEY,
            tot_win: 0,
            freespin: !1,
            num_freespin: _iTotFreeSpin,
            bonus: !1,
            bonus_prize: -1
        };
        g.call(f, a)
    }
}

function apiAttemptBonus(a, d, c) {
    for (var g = [], f = 0; f < BONUS_PRIZE_OCCURRENCE.length; f++)
        for (var l = BONUS_PRIZE_OCCURRENCE[f], m = 0; m < l; m++) g.push(f);
    l = Math.floor(Math.random() * MAX_PRIZES_BONUS) + 1;
    m = [];
    var h = 0;
    for (f = 0; f < l; f++) {
        var e = BONUS_PRIZE[g[Math.floor(Math.random() * g.length)]] * a;
        h + e > SLOT_CASH && (e = 0);
        h += e;
        m.push(e);
        TOTAL_MONEY += e;
        SLOT_CASH -= e;
        TOTAL_MONEY = parseFloat(TOTAL_MONEY.toFixed(2));
        SLOT_CASH = parseFloat(SLOT_CASH.toFixed(2))
    }
    0 === m.length && (m = [0]);
    d.call(c, {
        res: !0,
        money: TOTAL_MONEY,
        bonus_win: h,
        prize_list: m
    })
}

function checkWin(a, d) {
    for (var c = [], g = 0; g < d; g++) {
        var f = _aPaylineCombo[g],
            l = [],
            m = _aFinalSymbols[f[0].row][f[0].col],
            h = 1,
            e = 1;
        for (l.push({
                row: f[0].row,
                col: f[0].col,
                value: _aFinalSymbols[f[0].row][f[0].col]
            }); m === WILD_SYMBOL && e < NUM_REELS;) h++, m = _aFinalSymbols[f[e].row][f[e].col], l.push({
            row: f[e].row,
            col: f[e].col,
            value: _aFinalSymbols[f[e].row][f[e].col]
        }), e++;
        for (; e < f.length; e++)
            if (_aFinalSymbols[f[e].row][f[e].col] === m || _aFinalSymbols[f[e].row][f[e].col] === WILD_SYMBOL) h++, l.push({
                row: f[e].row,
                col: f[e].col,
                value: _aFinalSymbols[f[e].row][f[e].col]
            });
            else break;
        !(0 < _aSymbolWin[m][h - 1]) || a && m === FREESPIN_SYMBOL || _bBonus && m === BONUS_SYMBOL || (l.sort(sortListByCol), c.push({
            line: g + 1,
            amount: _aSymbolWin[m][h - 1],
            num_win: h,
            value: m,
            list: l
        }))
    }
    if (a) {
        l = [];
        for (g = 0; g < NUM_ROWS; g++)
            for (f = 0; f < NUM_REELS; f++) _aFinalSymbols[g][f] === FREESPIN_SYMBOL && l.push({
                row: g,
                col: f,
                value: FREESPIN_SYMBOL
            });
        l.sort(sortListByCol);
        c.push({
            line: 0,
            amount: 0,
            num_win: l.length,
            value: FREESPIN_SYMBOL,
            list: l
        })
    } else if (_bBonus) {
        l = [];
        for (g = 0; g < NUM_ROWS; g++)
            for (f =
                0; f < NUM_REELS; f++) _aFinalSymbols[g][f] === BONUS_SYMBOL && l.push({
                row: g,
                col: f,
                value: BONUS_SYMBOL
            });
        l.sort(sortListByCol);
        c.push({
            line: 0,
            amount: 0,
            num_win: l.length,
            value: BONUS_SYMBOL,
            list: l
        })
    }
    return c
}

function generateRandomSymbols(a) {
    _aFinalSymbols = [];
    for (var d = 0; d < NUM_ROWS; d++) {
        _aFinalSymbols[d] = [];
        for (var c = 0; c < NUM_REELS; c++) {
            do {
                var g = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
                _aFinalSymbols[d][c] = g
            } while (g === BONUS_SYMBOL || g === FREESPIN_SYMBOL)
        }
    }
    if (a) {
        a = [];
        for (d = 0; d < _iFreespinSymbolNumOccur.length; d++)
            for (c = 0; c < _iFreespinSymbolNumOccur[d]; c++) a.push(d);
        _iNumSymbolFreeSpin = 3 + a[Math.floor(Math.random() * a.length)];
        d = [0, 1, 2, 3, 4];
        d = shuffle(d);
        for (c = 0; c < _iNumSymbolFreeSpin; c++) a =
            Math.floor(3 * Math.random()), _aFinalSymbols[a][d[c]] = FREESPIN_SYMBOL
    } else if (_bBonus)
        for (d = [0, 1, 2, 3, 4], d = shuffle(d), g = Math.floor(3 * Math.random() + 3), c = 0; c < g; c++) a = Math.floor(3 * Math.random()), _aFinalSymbols[a][d[c]] = BONUS_SYMBOL
}

function generLosingPattern() {
    for (var a = [], d = 0; d < NUM_ROWS; d++) {
        do var c = Math.floor(Math.random() * s_aRandSymbols.length); while (s_aRandSymbols[c] === BONUS_SYMBOL || s_aRandSymbols[c] === FREESPIN_SYMBOL || s_aRandSymbols[c] === WILD_SYMBOL);
        c = s_aRandSymbols[c];
        a[d] = c
    }
    _aFinalSymbols = [];
    for (d = 0; d < NUM_ROWS; d++) {
        _aFinalSymbols[d] = [];
        for (var g = 0; g < NUM_REELS; g++)
            if (0 == g) _aFinalSymbols[d][g] = a[d];
            else {
                do c = Math.floor(Math.random() * s_aRandSymbols.length), c = s_aRandSymbols[c]; while (a[0] === c || a[1] === c || a[2] === c || c === BONUS_SYMBOL ||
                    c === FREESPIN_SYMBOL || c === WILD_SYMBOL);
                _aFinalSymbols[d][g] = c
            }
    }
    return _aFinalSymbols
}

function refreshCredit(a, d, c) {
    TOTAL_MONEY = a;
    d.call(c, TOTAL_MONEY)
}

function formatEntries(a) {
    return a.toFixed(2)
}

function _dieError(a, d, c) {
    d.call(c, "res=false&desc=" + a)
}

function sortListByCol(a, d) {
    return a.col < d.col ? -1 : a.col > d.col ? 1 : 0
}

function _initSymbolWin() {
    _aSymbolWin = [];
    for (var a = 0; a < PAYTABLE_VALUES.length; a++) {
        _aSymbolWin[a] = [];
        for (var d = 0; d < PAYTABLE_VALUES[a].length; d++) _aSymbolWin[a][d] = PAYTABLE_VALUES[a][d]
    }
    for (a = PAYTABLE_VALUES.length; a < NUM_SYMBOLS; a++) _aSymbolWin[a] = [0, 0, 0, 0, 0]
}

function _setMinWin() {
    _iMinWin = 9999999999999;
    for (var a = 0; a < _aSymbolWin.length; a++)
        for (var d = _aSymbolWin[a], c = 0; c < d.length; c++) 0 !== d[c] && d[c] < _iMinWin && (_iMinWin = d[c])
}

function _initPaylines() {
    _aPaylineCombo[0] = [{
        row: 1,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 1,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 1,
        col: 4
    }];
    _aPaylineCombo[1] = [{
        row: 0,
        col: 0
    }, {
        row: 0,
        col: 1
    }, {
        row: 0,
        col: 2
    }, {
        row: 0,
        col: 3
    }, {
        row: 0,
        col: 4
    }];
    _aPaylineCombo[2] = [{
        row: 2,
        col: 0
    }, {
        row: 2,
        col: 1
    }, {
        row: 2,
        col: 2
    }, {
        row: 2,
        col: 3
    }, {
        row: 2,
        col: 4
    }];
    _aPaylineCombo[3] = [{
        row: 0,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 2,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 0,
        col: 4
    }];
    _aPaylineCombo[4] = [{
        row: 2,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 0,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 2,
        col: 4
    }];
    _aPaylineCombo[5] = [{
        row: 1,
        col: 0
    }, {
        row: 0,
        col: 1
    }, {
        row: 0,
        col: 2
    }, {
        row: 0,
        col: 3
    }, {
        row: 1,
        col: 4
    }];
    _aPaylineCombo[6] = [{
        row: 1,
        col: 0
    }, {
        row: 2,
        col: 1
    }, {
        row: 2,
        col: 2
    }, {
        row: 2,
        col: 3
    }, {
        row: 1,
        col: 4
    }];
    _aPaylineCombo[7] = [{
        row: 0,
        col: 0
    }, {
        row: 0,
        col: 1
    }, {
        row: 1,
        col: 2
    }, {
        row: 2,
        col: 3
    }, {
        row: 2,
        col: 4
    }];
    _aPaylineCombo[8] = [{
        row: 2,
        col: 0
    }, {
        row: 2,
        col: 1
    }, {
        row: 1,
        col: 2
    }, {
        row: 0,
        col: 3
    }, {
        row: 0,
        col: 4
    }];
    _aPaylineCombo[9] = [{
        row: 1,
        col: 0
    }, {
        row: 2,
        col: 1
    }, {
        row: 1,
        col: 2
    }, {
        row: 0,
        col: 3
    }, {
        row: 1,
        col: 4
    }];
    _aPaylineCombo[10] = [{
        row: 1,
        col: 0
    }, {
        row: 0,
        col: 1
    }, {
        row: 1,
        col: 2
    }, {
        row: 2,
        col: 3
    }, {
        row: 1,
        col: 4
    }];
    _aPaylineCombo[11] = [{
        row: 0,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 1,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 0,
        col: 4
    }];
    _aPaylineCombo[12] = [{
        row: 2,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 1,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 2,
        col: 4
    }];
    _aPaylineCombo[13] = [{
        row: 0,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 0,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 0,
        col: 4
    }];
    _aPaylineCombo[14] = [{
        row: 2,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 2,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 2,
        col: 4
    }];
    _aPaylineCombo[15] = [{
        row: 1,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 0,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 1,
        col: 4
    }];
    _aPaylineCombo[16] = [{
        row: 1,
        col: 0
    }, {
        row: 1,
        col: 1
    }, {
        row: 2,
        col: 2
    }, {
        row: 1,
        col: 3
    }, {
        row: 1,
        col: 4
    }];
    _aPaylineCombo[17] = [{
        row: 0,
        col: 0
    }, {
        row: 0,
        col: 1
    }, {
        row: 2,
        col: 2
    }, {
        row: 0,
        col: 3
    }, {
        row: 0,
        col: 4
    }];
    _aPaylineCombo[18] = [{
        row: 2,
        col: 0
    }, {
        row: 2,
        col: 1
    }, {
        row: 0,
        col: 2
    }, {
        row: 2,
        col: 3
    }, {
        row: 2,
        col: 4
    }];
    _aPaylineCombo[19] = [{
        row: 0,
        col: 0
    }, {
        row: 2,
        col: 1
    }, {
        row: 2,
        col: 2
    }, {
        row: 2,
        col: 3
    }, {
        row: 0,
        col: 4
    }];
    return _aPaylineCombo
}

function _init() {
    _initSymbolWin();
    _aPaylineCombo = _initPaylines();
    _setMinWin()
}
_init();

function CSlotSettings() {
    this._init = function() {
        this._initSymbolSpriteSheets();
        this._initSymbolsOccurence();
        this._initSymbolSplashEffect()
    };
    this._initSymbolSpriteSheets = function() {
        s_aSymbolData = [];
        for (var a = 0; a < NUM_SYMBOLS; a++) {
            var d = {
                images: [s_oSpriteLibrary.getSprite("symbol_" + a)],
                frames: {
                    width: SYMBOL_WIDTH,
                    height: SYMBOL_HEIGHT,
                    regX: SYMBOL_WIDTH / 2,
                    regY: SYMBOL_HEIGHT / 2
                },
                animations: {
                    "static": 0,
                    slice_left: 1,
                    slice_right: 2,
                    moving: 3
                }
            };
            s_aSymbolData[a] = new createjs.SpriteSheet(d)
        }
    };
    this._initSymbolsOccurence =
        function() {
            s_aRandSymbols = [];
            var a;
            for (a = 0; 1 > a; a++) s_aRandSymbols.push(9);
            for (a = 0; 2 > a; a++) s_aRandSymbols.push(8);
            for (a = 0; 3 > a; a++) s_aRandSymbols.push(7);
            for (a = 0; 4 > a; a++) s_aRandSymbols.push(6);
            for (a = 0; 5 > a; a++) s_aRandSymbols.push(5);
            for (a = 0; 6 > a; a++) s_aRandSymbols.push(4);
            for (a = 0; 7 > a; a++) s_aRandSymbols.push(3);
            for (a = 0; 8 > a; a++) s_aRandSymbols.push(2), s_aRandSymbols.push(1), s_aRandSymbols.push(0)
        };
    this._initSymbolSplashEffect = function() {
        s_aSymbolSplashId = [0, 0, 1, 0, 2, 0, 1, 3, 3, 3]
    };
    this._init()
}
var s_aSymbolData, s_aRandSymbols, s_aSymbolSplashId;

function CCreditsPanel() {
    var a, d, c, g, f, l, m, h;
    this._init = function() {
        h = new createjs.Container;
        s_oStage.addChild(h);
        c = new createjs.Shape;
        d = c.on("click", function() {});
        c.alpha = 0;
        c.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.addChild(c);
        g = new createjs.Container;
        g.visible = !1;
        h.addChild(g);
        var e = s_oSpriteLibrary.getSprite("msg_box");
        m = createBitmap(e);
        m.regX = e.width / 2;
        m.regY = e.height / 2;
        g.addChild(m);
        a = m.on("click", this._onLogoButRelease);
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT / 2;
        e =
            new createjs.Text(TEXT_DEVELOPED, "30px " + FONT_GAME_1, "#fff");
        e.y = -40;
        e.textAlign = "center";
        e.textBaseline = "alphabetic";
        g.addChild(e);
        e = new createjs.Text("www.codethislab.com", "26px " + FONT_GAME_1, "#fff");
        e.y = 60;
        e.textAlign = "center";
        e.textBaseline = "alphabetic";
        e.lineWidth = 300;
        g.addChild(e);
        e = s_oSpriteLibrary.getSprite("ctl_logo");
        l = createBitmap(e);
        l.regX = e.width / 2;
        l.regY = e.height / 2;
        g.addChild(l);
        e = s_oSpriteLibrary.getSprite("but_exit_info");
        f = new CGfxButton(170, -70, e, g);
        f.addEventListener(ON_MOUSE_UP,
            this.unload, this);
        c.alpha = 0;
        createjs.Tween.get(c).to({
            alpha: .7
        }, 500).call(function() {
            g.alpha = 0;
            g.visible = !0;
            createjs.Tween.get(g).to({
                alpha: 1
            }, 300)
        })
    };
    this.unload = function() {
        createjs.Tween.get(h).to({
            alpha: 0
        }, 500).call(function() {
            s_oStage.removeChild(h);
            f.unload()
        });
        c.off("click", d);
        m.off("click", a)
    };
    this._onLogoButRelease = function() {
        window.open("http://www.codethislab.com/index.php?&l=en")
    };
    this._init()
}
var TEXT_MONEY = "CREDIT",
    TEXT_BET = "Bet",
    TEXT_COIN = "BET",
    TEXT_MAX_BET = "MAX BET",
    TEXT_LINES = "LINES",
    TEXT_RISK = "RISK",
    TEXT_PAYTABLE = "INFO",
    TEXT_AUTO_SPIN = "AUTO PLAY",
    TEXT_SPIN = "REVEAL",
    TEXT_STOP_AUTO = "STOP AUTO",
    TEXT_SKIP = "SKIP",
    TEXT_WIN = "Win",
    TEXT_HELP_BONUS1 = "ON REELS 1 AND 5 ON THE PAYLINE STARTS THE BONUS ROUND",
    TEXT_HELP_BONUS2 = "CHOOSE A FRUIT TO DISCOVER YOUR MULTIPLIER BONUS!!",
    TEXT_HELP_FREESPIN = "GET 3 OR MORE SCATTERS ON ANY REEL ON A PAYLINE TO TRIGGER FREESPINS",
    TEXT_CURRENCY = "",
    TEXT_RETRY =
    "RETRY",
    TEXT_COLLECT = "COLLECT",
    TEXT_CUR_WIN = "CURRENT WIN",
    TEXT_DOUBLE = "DOUBLE TO",
    TEXT_CONGRATS = "CONGRATULATIONS!!",
    TEXT_YOU_WIN = "YOU GOT",
    TEXT_YOU_WON = "YOU WON",
    TEXT_NO_WIN = "NO WIN",
    TEXT_FREESPINS = "FREESPINS",
    TEXT_BONUS_HELP = "SELECT A FRUIT",
    TEXT_DEVELOPED = "DEVELOPED BY",
    TEXT_ARE_SURE = "ARE YOU SURE?",
    TEXT_DELETE_SAVINGS = "YOUR CREDIT WILL BE RESTORED TO DEFAULT VALUE",
    TEXT_RECHARGE = "DO YOU WANT TO RECHARGE YOUR CREDIT?",
    TEXT_NO_MAX_BET = "NOT ENOUGH MONEY FOR MAX BET!!",
    TEXT_NOT_ENOUGH_MONEY = "NOT ENOUGH MONEY FOR THE CURRENT BET!",
    TEXT_ERR_LS = "YOUR WEB BROWSER DOES NOT SUPPORT STORING SETTING LOCALLY. IN SAFARI, THE MOST COMMON CAUSE OF THIS IS USING 'PRIVATE BROWSING MODE'. SOME INFO MAY NOT SAVE OR SOME FEATURE MAY NOT WORK PROPERLY.";

function CPreloader() {
    var a, d, c, g, f, l, m, h, e;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.loadSprites();
        e = new createjs.Container;
        s_oStage.addChild(e)
    };
    this.unload = function() {
        e.removeAllChildren()
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    };
    this.attachSprites = function() {
        var p = new createjs.Shape;
        p.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e.addChild(p);
        p = s_oSpriteLibrary.getSprite("200x200");
        m = createBitmap(p);
        m.regX = .5 * p.width;
        m.regY = .5 * p.height;
        m.x = CANVAS_WIDTH / 2;
        m.y = CANVAS_HEIGHT / 2 - 120;
        e.addChild(m);
        h = new createjs.Shape;
        h.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(m.x - 100, m.y - 100, 200, 200, 10);
        e.addChild(h);
        m.mask = h;
        p = s_oSpriteLibrary.getSprite("progress_bar");
        g = createBitmap(p);
        g.x = CANVAS_WIDTH / 2 -
            p.width / 2;
        g.y = CANVAS_HEIGHT / 2 + 50;
        e.addChild(g);
        a = p.width;
        d = p.height;
        f = new createjs.Shape;
        f.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(g.x, g.y, 1, d);
        e.addChild(f);
        g.mask = f;
        c = new createjs.Text("", "30px " + FONT_GAME_2, "#fff");
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2 + 90;
        c.textBaseline = "alphabetic";
        c.textAlign = "center";
        e.addChild(c);
        l = new createjs.Shape;
        l.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e.addChild(l);
        createjs.Tween.get(l).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(l);
            e.removeChild(l)
        })
    };
    this.refreshLoader = function(p) {
        c.text = p + "%";
        100 === p && (s_oMain._onRemovePreloader(), c.visible = !1, g.visible = !1);
        f.graphics.clear();
        p = Math.floor(p * a / 100);
        f.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(g.x, g.y, p, d)
    };
    this._init()
}

function CMain(a) {
    var d, c = 0,
        g = 0,
        f = STATE_LOADING,
        l, m;
    this.initContainer = function() {
        var e = document.getElementById("canvas");
        s_oStage = new createjs.Stage(e);
        s_oAttachSection = new createjs.Container;
        s_oStage.addChild(s_oAttachSection);
        s_oStage.preventSelection = !1;
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && s_oStage.enableMouseOver(20);
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.framerate = FPS;
        createjs.Ticker.addEventListener("tick", this._update);
        navigator.userAgent.match(/Windows Phone/i) &&
            (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        ? l = new CPreloader
    };
    this.preloaderReady = function() {
        this._loadImages();
        (!1 === DISABLE_SOUND_DESKTOP && !1 === s_bMobile || !0 === s_bMobile && !1 === DISABLE_SOUND_MOBILE) && this._initSounds();
        d = !0
    };
    this.soundLoaded = function() {
        c++;
        l.refreshLoader(Math.floor(c / g * 100))
    };
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "press_but",
            loop: !1,
            volume: 1,
            ingamename: "press_but"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "reel_stop",
            loop: !1,
            volume: 1,
            ingamename: "reel_stop"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "reel_stop_bonus",
            loop: !1,
            volume: 1,
            ingamename: "reel_stop_bonus"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "reel_stop_freespin",
            loop: !1,
            volume: 1,
            ingamename: "reel_stop_freespin"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "start_reel",
            loop: !1,
            volume: 1,
            ingamename: "start_reel"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "spin_but",
            loop: !1,
            volume: 1,
            ingamename: "spin_but"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol_0_1_2",
            loop: !1,
            volume: 1,
            ingamename: "symbol_0_1_2"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol_3_4_5",
            loop: !1,
            volume: 1,
            ingamename: "symbol_3_4_5"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol_6",
            loop: !1,
            volume: 1,
            ingamename: "symbol_6"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol_7_8_9",
            loop: !1,
            volume: 1,
            ingamename: "symbol_7_8_9"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "avatar_win",
            loop: !1,
            volume: 1,
            ingamename: "avatar_win"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "avatar_cut",
            loop: !1,
            volume: 1,
            ingamename: "avatar_cut"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "bonus_end",
            loop: !1,
            volume: 1,
            ingamename: "bonus_end"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "swoosh",
            loop: !1,
            volume: 1,
            ingamename: "swoosh"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "bonus_mult",
            loop: !1,
            volume: 1,
            ingamename: "bonus_mult"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack"
        });
        g += s_aSoundsInfo.length;
        s_aSounds = [];
        for (var e = 0; e < s_aSoundsInfo.length; e++) this.tryToLoadSound(s_aSoundsInfo[e], !1)
    };
    this.tryToLoadSound = function(e, p) {
        setTimeout(function() {
            s_aSounds[e.ingamename] = new Howl({
                src: [e.path + e.filename + ".mp3"],
                autoplay: !1,
                preload: !0,
                loop: e.loop,
                volume: e.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function(q, J) {
                    for (var r = 0; r < s_aSoundsInfo.length; r++)
                        if (q === s_aSounds[s_aSoundsInfo[r].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[r], !0);
                            break
                        }
                },
                onplayerror: function(q) {
                    for (var J = 0; J < s_aSoundsInfo.length; J++)
                        if (q === s_aSounds[s_aSoundsInfo[J].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[J].ingamename].once("unlock", function() {
                                s_aSounds[s_aSoundsInfo[J].ingamename].play();
                                "soundtrack" === s_aSoundsInfo[J].ingamename && null !== s_oGame && setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME)
                            });
                            break
                        }
                }
            })
        }, p ? 200 : 0)
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu",
            "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("paytable1", "./sprites/paytable1.jpg");
        s_oSpriteLibrary.addSprite("paytable2", "./sprites/paytable2.jpg");
        s_oSpriteLibrary.addSprite("paytable3", "./sprites/paytable3.jpg");
        s_oSpriteLibrary.addSprite("paytable4", "./sprites/paytable4.jpg");
        s_oSpriteLibrary.addSprite("mask_slot", "./sprites/mask_slot.png");
        s_oSpriteLibrary.addSprite("but_text",
            "./sprites/but_text.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("but_arrow_next", "./sprites/but_arrow_next.png");
        s_oSpriteLibrary.addSprite("but_arrow_prev", "./sprites/but_arrow_prev.png");
        s_oSpriteLibrary.addSprite("logo", "./sprites/logo.png");
        s_oSpriteLibrary.addSprite("bg_loading_bonus", "./sprites/bg_loading_bonus.jpg");
        s_oSpriteLibrary.addSprite("bg_loading", "./sprites/bg_loading.jpg");
        s_oSpriteLibrary.addSprite("but_exit_info", "./sprites/but_exit_info.png");
        s_oSpriteLibrary.addSprite("bg_freespins", "./sprites/bg_freespins.jpg");
        s_oSpriteLibrary.addSprite("amount_freespins", "./sprites/amount_freespins.png");
        s_oSpriteLibrary.addSprite("amount_freespin_win", "./sprites/amount_freespin_win.png");
        s_oSpriteLibrary.addSprite("amount_bonus_win", "./sprites/amount_bonus_win.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("symbol_0", "./sprites/symbol_0.png");
        s_oSpriteLibrary.addSprite("symbol_1", "./sprites/symbol_1.png");
        s_oSpriteLibrary.addSprite("symbol_2", "./sprites/symbol_2.png");
        s_oSpriteLibrary.addSprite("symbol_3", "./sprites/symbol_3.png");
        s_oSpriteLibrary.addSprite("symbol_4", "./sprites/symbol_4.png");
        s_oSpriteLibrary.addSprite("symbol_5", "./sprites/symbol_5.png");
        s_oSpriteLibrary.addSprite("symbol_6", "./sprites/symbol_6.png");
        s_oSpriteLibrary.addSprite("symbol_7", "./sprites/symbol_7.png");
        s_oSpriteLibrary.addSprite("symbol_8", "./sprites/symbol_8.png");
        s_oSpriteLibrary.addSprite("symbol_9", "./sprites/symbol_9.png");
        s_oSpriteLibrary.addSprite("particle_effect_0", "./sprites/particle_effect_0.png");
        s_oSpriteLibrary.addSprite("particle_effect_1", "./sprites/particle_effect_1.png");
        s_oSpriteLibrary.addSprite("particle_effect_2", "./sprites/particle_effect_2.png");
        s_oSpriteLibrary.addSprite("particle_effect_3", "./sprites/particle_effect_3.png");
        s_oSpriteLibrary.addSprite("avatar_idle", "./sprites/avatar/avatar_idle.png");
        s_oSpriteLibrary.addSprite("bet_but", "./sprites/paylines/bet_but.png");
        s_oSpriteLibrary.addSprite("paylines", "./sprites/paylines/paylines.png");
        s_oSpriteLibrary.addSprite("avatar_win", "./sprites/avatar/avatar_win.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_delete_savings",
            "./sprites/but_delete_savings.png");
        g += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        c++;
        l.refreshLoader(Math.floor(c / g * 100))
    };
    this._onAllImagesLoaded = function() {};
    this._onRemovePreloader = function() {
        APIgetSlotInfos(this.settingPhase, this)
    };
    this.settingPhase = function(e) {
        try {
            saveItem(LOCALSTORAGE_STRING + "ls_available", "ok")
        } catch (p) {
            s_bStorageAvailable = !1
        }
        s_oGameSettings = new CSlotSettings;
        s_oMsgBox = new CMsgBox;
        l.unload();
        COIN_BET = e.bets;
        START_BET = e.start_bet;
        MIN_BET = e.bets[0];
        MIN_REEL_LOOPS = h.min_reel_loop;
        REEL_DELAY = h.reel_delay;
        TIME_SHOW_WIN = h.time_show_win;
        TIME_SHOW_ALL_WINS = h.time_show_all_wins;
        TOTAL_MONEY = e.start_money;
        ENABLE_FULLSCREEN = a.fullscreen;
        SHOW_CREDITS = a.show_credits;
        ENABLE_CHECK_ORIENTATION = a.check_orientation;
        PAYTABLE_VALUES = e.paytable;
        playSound("soundtrack", 1, !0);
        this.gotoMenu()
    };
    this.gotoMenu = function() {
        new CMenu;
        f = STATE_MENU
    };
    this.gotoGame = function() {
        m = new CGame(h);
        f = STATE_GAME
    };
    this.stopUpdate = function() {
        d = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || Howler.mute(!0)
    };
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        d = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && s_bAudioActive && Howler.mute(!1)
    };
    this.stopUpdateNoBlock = function() {
        d = !1;
        createjs.Ticker.paused = !0
    };
    this.startUpdateNoBlock = function() {
        s_iPrevTime = (new Date).getTime();
        d = !0;
        createjs.Ticker.paused = !1
    };
    this.refreshCredits = function() {
        m &&
            m.refreshCredits()
    };
    this._update = function(e) {
        if (!1 !== d) {
            var p = (new Date).getTime();
            s_iTimeElaps = p - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = p;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            f === STATE_GAME && m.update();
            s_oStage.update(e)
        }
    };
    s_oMain = this;
    var h = a;
    ENABLE_CHECK_ORIENTATION = h.check_orientation;
    NUM_SPIN_FOR_ADS = a.num_spin_for_ads;
    RESTART_CREDIT = a.restart_credit;
    s_bAudioActive = a.audio_enable_on_startup;
    this.initContainer()
}
var s_bMobile, s_bFullscreen = !1,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oDrawLayer, s_oStage, s_oAttachSection, s_oMain, s_oSpriteLibrary, s_oMsgBox, s_oGameSettings, s_aSounds, s_aSoundsInfo, s_bStorageAvailable = !0;

function CMenu() {
    var a, d, c, g, f, l, m, h, e = null,
        p = null,
        q, J, r, I, E, G, A, F;
    this._init = function() {
        q = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oAttachSection.addChild(q);
        var k = s_oSpriteLibrary.getSprite("but_play");
        J = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 164, k, s_oAttachSection);
        J.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) k = s_oSpriteLibrary.getSprite("audio_icon"), m = CANVAS_WIDTH - k.width / 4 - 4, h = k.height / 2 + 4, I = new CToggle(m, h, k, s_bAudioActive),
            I.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        SHOW_CREDITS ? (k = s_oSpriteLibrary.getSprite("but_credits"), a = k.width / 2 + 4, d = k.height / 2 + 4, E = new CGfxButton(a, d, k, s_oAttachSection), E.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this), f = a + k.width + 4, l = d) : (k = s_oSpriteLibrary.getSprite("but_fullscreen"), f = k.width / 4 + 4, l = k.height / 2 + 4);
        k = window.document;
        var D = k.documentElement;
        e = D.requestFullscreen || D.mozRequestFullScreen || D.webkitRequestFullScreen || D.msRequestFullscreen;
        p = k.exitFullscreen ||
            k.mozCancelFullScreen || k.webkitExitFullscreen || k.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (e = !1);
        e && screenfull.isEnabled && (k = s_oSpriteLibrary.getSprite("but_fullscreen"), G = new CToggle(f, l, k, s_bFullscreen, s_oAttachSection), G.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        k = s_oSpriteLibrary.getSprite("but_delete_savings");
        c = k.width / 2 + 4;
        g = CANVAS_HEIGHT - k.height / 2 - 4;
        r = new CGfxButton(c, g, k, s_oAttachSection);
        r.addEventListener(ON_MOUSE_UP, this._onDeleteSavings, this);
        s_bStorageAvailable ? !RESTART_CREDIT &&
            getItem(LOCALSTORAGE_STRING + "score") ? TOTAL_MONEY = parseFloat(getItem(LOCALSTORAGE_STRING + "score")) : r.setVisible(!1) : (s_oMsgBox.show(TEXT_ERR_LS), r.setVisible(!1));
        F = new CAreYouSurePanel;
        F.addEventListener(ON_BUT_YES_DOWN, this._onExitYes, this);
        A = new createjs.Shape;
        A.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oAttachSection.addChild(A);
        createjs.Tween.get(A).to({
            alpha: 0
        }, 400).call(function() {
            A.visible = !1
        });
        this.refreshButtonPos()
    };
    this.unload = function() {
        J.unload();
        J = null;
        r.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) I.unload(), I = null;
        SHOW_CREDITS && E.unload();
        e && screenfull.isEnabled && G.unload();
        s_oAttachSection.removeChild(q);
        q = null;
        s_oAttachSection.removeChild(A);
        s_oMenu = A = null
    };
    this.refreshButtonPos = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || I.setPosition(m - s_iOffsetX, s_iOffsetY + h);
        SHOW_CREDITS && E.setPosition(a + s_iOffsetX, d + s_iOffsetY);
        e && screenfull.isEnabled && G.setPosition(f + s_iOffsetX, l + s_iOffsetY);
        r.setPosition(c + s_iOffsetX, g - s_iOffsetY)
    };
    this._onButPlayRelease =
        function() {
            this.unload();
            $(s_oMain).trigger("start_session");
            s_oMain.gotoGame()
        };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onButCreditsRelease = function() {
        new CCreditsPanel
    };
    this.resetFullscreenBut = function() {
        e && screenfull.isEnabled && G.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? p.call(window.document) : e.call(window.document.documentElement);
        sizeHandler()
    };
    this._onDeleteSavings = function() {
        F.show(TEXT_DELETE_SAVINGS +
            ": " + START_MONEY + TEXT_CURRENCY + "\n" + TEXT_ARE_SURE)
    };
    this._onExitYes = function() {
        clearLocalStorage();
        r.setVisible(!1)
    };
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CSpriteSheetTextButton(a, d, c, g, f, l, m, h) {
    var e, p, q, J, r, I, E, G, A, F, k, D;
    this._init = function(C, v, t, H, w, M, P, N) {
        e = !1;
        J = M;
        r = [];
        I = [];
        D = N;
        p = t.width / 2;
        q = t.height;
        A = new createjs.Container;
        A.x = C;
        A.y = v;
        A.regX = p / 2;
        A.regY = q / 2;
        A.cursor = "pointer";
        D.addChild(A);
        C = new createjs.SpriteSheet({
            images: [t],
            frames: {
                width: p,
                height: q
            },
            animations: {
                state_enable: 0,
                state_disable: 1
            }
        });
        F = createSprite(C, "state_enable", 0, 0, p, q);
        A.addChild(F);
        k = new CTLText(A, p / 2 - p / 2, 2, p, q - 2, P, "center", M, w, 1, 0, 0, H, !0, !0, !1, !1);
        k.setShadow("#000",
            1, 1, 2);
        this._initListener()
    };
    this.unload = function() {
        A.off("mousedown", E);
        A.off("pressup", G);
        D.removeChild(A)
    };
    this.setVisible = function(C) {
        A.visible = C
    };
    this.enable = function() {
        e = !1;
        F.gotoAndStop("state_enable");
        k.setColor(J)
    };
    this.disable = function() {
        e = !0;
        F.gotoAndStop("state_disable");
        k.setColor("#c5c5c5")
    };
    this.setText = function(C) {
        k.refreshText(C)
    };
    this._initListener = function() {
        E = A.on("mousedown", this.buttonDown);
        G = A.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(C, v, t) {
        r[C] = v;
        I[C] =
            t
    };
    this.buttonRelease = function() {
        e || (playSound("press_but", 1, !1), A.scaleX = 1, A.scaleY = 1, r[ON_MOUSE_UP] && r[ON_MOUSE_UP].call(I[ON_MOUSE_UP]))
    };
    this.buttonDown = function() {
        e || (A.scaleX = .9, A.scaleY = .9, r[ON_MOUSE_DOWN] && r[ON_MOUSE_DOWN].call(I[ON_MOUSE_DOWN]))
    };
    this.setPosition = function(C, v) {
        A.x = C;
        A.y = v
    };
    this.changeText = function(C) {
        k.refreshText(C)
    };
    this.setX = function(C) {
        A.x = C
    };
    this.setY = function(C) {
        A.y = C
    };
    this.getButtonImage = function() {
        return A
    };
    this.getX = function() {
        return A.x
    };
    this.getY = function() {
        return A.y
    };
    this.getText = function() {
        return k.getString()
    };
    this._init(a, d, c, g, f, l, m, h);
    return this
}

function CGfxButton(a, d, c, g) {
    var f, l, m, h, e, p, q;
    this._init = function(r, I, E, G) {
        f = !1;
        l = 1;
        m = [];
        h = [];
        q = createBitmap(E);
        q.x = r;
        q.y = I;
        q.scaleX = q.scaleY = l;
        q.regX = E.width / 2;
        q.regY = E.height / 2;
        G.addChild(q);
        this._initListener()
    };
    this.unload = function() {
        q.off("mousedown", e);
        q.off("pressup", p);
        s_bMobile || q.off("mouseover", this.buttonOver);
        g.removeChild(q)
    };
    this.setVisible = function(r) {
        q.visible = r
    };
    this.setClickable = function(r) {
        f = !r
    };
    this._initListener = function() {
        e = q.on("mousedown", this.buttonDown);
        p = q.on("pressup",
            this.buttonRelease);
        if (!s_bMobile) q.on("mouseover", this.buttonOver)
    };
    this.addEventListener = function(r, I, E) {
        m[r] = I;
        h[r] = E
    };
    this.buttonRelease = function() {
        f || (q.scaleX = l, q.scaleY = l, m[ON_MOUSE_UP] && m[ON_MOUSE_UP].call(h[ON_MOUSE_UP]))
    };
    this.buttonDown = function() {
        f || (q.scaleX = .9 * l, q.scaleY = .9 * l, m[ON_MOUSE_DOWN] && m[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN]))
    };
    this.buttonOver = function(r) {
        s_bMobile || f || (r.target.cursor = "pointer")
    };
    this.pulseAnimation = function() {
        createjs.Tween.get(q).to({
            scaleX: 1.1 * l,
            scaleY: 1.1 *
                l
        }, 850, createjs.Ease.quadOut).to({
            scaleX: l,
            scaleY: l
        }, 650, createjs.Ease.quadIn).call(function() {
            J.pulseAnimation()
        })
    };
    this.trembleAnimation = function() {
        createjs.Tween.get(q).to({
            rotation: 5
        }, 75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function() {
            J.trebleAnimation()
        })
    };
    this.setPosition = function(r, I) {
        q.x = r;
        q.y = I
    };
    this.setX = function(r) {
        q.x = r
    };
    this.setY = function(r) {
        q.y = r
    };
    this.getButtonImage = function() {
        return q
    };
    this.getX = function() {
        return q.x
    };
    this.getY = function() {
        return q.y
    };
    var J = this;
    this._init(a, d, c, g);
    return this
}

function CToggle(a, d, c, g, f) {
    var l, m, h, e, p, q, J;
    this._init = function(r, I, E, G, A) {
        J = void 0 !== A ? A : s_oStage;
        m = [];
        h = [];
        A = new createjs.SpriteSheet({
            images: [E],
            frames: {
                width: E.width / 2,
                height: E.height,
                regX: E.width / 2 / 2,
                regY: E.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        l = G;
        e = createSprite(A, "state_" + l, E.width / 2 / 2, E.height / 2, E.width / 2, E.height);
        e.x = r;
        e.y = I;
        e.stop();
        s_bMobile || (e.cursor = "pointer");
        J.addChild(e);
        this._initListener()
    };
    this.unload = function() {
        e.off("mousedown", p);
        e.off("pressup", q);
        J.removeChild(e)
    };
    this._initListener = function() {
        p = e.on("mousedown", this.buttonDown);
        q = e.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(r, I, E) {
        m[r] = I;
        h[r] = E
    };
    this.setCursorType = function(r) {
        e.cursor = r
    };
    this.setActive = function(r) {
        l = r;
        e.gotoAndStop("state_" + l)
    };
    this.buttonRelease = function() {
        e.scaleX = 1;
        e.scaleY = 1;
        playSound("press_but", 1, !1);
        l = !l;
        e.gotoAndStop("state_" + l);
        m[ON_MOUSE_UP] && m[ON_MOUSE_UP].call(h[ON_MOUSE_UP], l)
    };
    this.buttonDown = function() {
        e.scaleX = .9;
        e.scaleY = .9;
        m[ON_MOUSE_DOWN] && m[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN])
    };
    this.setPosition = function(r, I) {
        e.x = r;
        e.y = I
    };
    this._init(a, d, c, g, f)
}

function CBetBut(a, d, c, g, f, l, m, h) {
    var e, p, q, J = [],
        r, I;
    this._init = function(G, A, F) {
        e = !1;
        p = [];
        q = [];
        I = new createjs.Container;
        I.x = G;
        I.y = A;
        E.addChild(I);
        G = {
            images: [s_oSpriteLibrary.getSprite("bet_but")],
            frames: {
                width: 34,
                height: 29
            },
            animations: {
                bet_but1_on: 0,
                bet_but1_off: 1,
                bet_but2_on: 2,
                bet_but2_off: 3,
                bet_but3_on: 4,
                bet_but3_off: 5,
                bet_but4_on: 6,
                bet_but4_off: 7,
                bet_but5_on: 8,
                bet_but5_off: 9,
                bet_but6_on: 10,
                bet_but6_off: 11,
                bet_but7_on: 12,
                bet_but7_off: 13,
                bet_but8_on: 14,
                bet_but8_off: 15,
                bet_but9_on: 16,
                bet_but9_off: 17,
                bet_but10_on: 18,
                bet_but10_off: 19,
                bet_but11_on: 20,
                bet_but11_off: 21,
                bet_but12_on: 22,
                bet_but12_off: 23,
                bet_but13_on: 24,
                bet_but13_off: 25,
                bet_but14_on: 26,
                bet_but14_off: 27,
                bet_but15_on: 28,
                bet_but15_off: 29,
                bet_but16_on: 30,
                bet_but16_off: 31,
                bet_but17_on: 32,
                bet_but17_off: 33,
                bet_but18_on: 34,
                bet_but18_off: 35,
                bet_but19_on: 36,
                bet_but19_off: 37,
                bet_but20_on: 38,
                bet_but20_off: 39
            }
        };
        G = new createjs.SpriteSheet(G);
        r = createSprite(G, F + "_on", 0, 0, 34, 29);
        r.stop();
        r.cursor = "pointer";
        I.addChild(r);
        this._initListener()
    };
    this.unload =
        function() {
            r.off("mousedown", this.buttonDown);
            r.off("pressup", this.buttonRelease);
            E.removeChild(r)
        };
    this.disable = function(G) {
        e = G
    };
    this.setVisible = function(G) {
        r.visible = G
    };
    this.setOn = function() {
        r.gotoAndStop(c + "_on")
    };
    this.setOff = function() {
        r.gotoAndStop(c + "_off")
    };
    this._initListener = function() {
        r.on("mousedown", this.buttonDown);
        r.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(G, A, F) {
        p[G] = A;
        q[G] = F
    };
    this.addEventListenerWithParams = function(G, A, F, k) {
        p[G] = A;
        q[G] = F;
        J = k
    };
    this.buttonRelease =
        function() {
            p[ON_MOUSE_UP] && !1 === e && (playSound("press_but", 1, !1), p[ON_MOUSE_UP].call(q[ON_MOUSE_UP], J))
        };
    this.buttonDown = function() {
        p[ON_MOUSE_DOWN] && !1 === e && p[ON_MOUSE_DOWN].call(q[ON_MOUSE_DOWN], J)
    };
    this.setPosition = function(G, A) {
        r.x = G;
        r.y = A
    };
    this.setX = function(G) {
        r.x = G
    };
    this.setY = function(G) {
        r.y = G
    };
    this.getButtonImage = function() {
        return r
    };
    this.getX = function() {
        return r.x
    };
    this.getY = function() {
        return r.y
    };
    var E = h;
    this._init(a, d, c, g, f, l, m)
}

function CGame() {
    var a = !1,
        d = !1,
        c, g, f, l, m, h, e, p, q, J, r, I, E, G, A, F, k, D, C, v, t, H, w, M, P, N, R, O, x, X, Y, U, K, n = null,
        aa, y, Q, z;
    this._init = function() {
        f = GAME_STATE_IDLE;
        p = D = A = h = l = 0;
        P = [0, 1, 2, 3, 4];
        m = P[0];
        e = NUM_PAYLINES;
        E = TOTAL_MONEY;
        r = START_BET;
        for (var b = 0; b < COIN_BET.length; b++)
            if (r === COIN_BET[b]) {
                t = b;
                break
            }
        I = r * e;
        v = [];
        c = !1;
        F = k = 0;
        C = [];
        s_oTweenController = new CTweenController;
        R = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oAttachSection.addChild(R);
        O = createBitmap(s_oSpriteLibrary.getSprite("bg_freespins"));
        O.alpha =
            0;
        s_oAttachSection.addChild(O);
        y = new createjs.Container;
        y.x = REEL_OFFSET_X;
        y.y = REEL_OFFSET_Y;
        s_oAttachSection.addChild(y);
        this._initReels();
        X = new createjs.Bitmap(s_oSpriteLibrary.getSprite("mask_slot"));
        X.x = -63;
        X.y = 0;
        y.addChild(X);
        b = {
            images: [s_oSpriteLibrary.getSprite("logo")],
            frames: {
                width: 195,
                height: 46,
                regX: 97,
                regY: 0
            },
            animations: {
                normal: 0,
                freespin: [1, 27, "stop_freespin"],
                stop_freespin: 27
            }
        };
        b = new createjs.SpriteSheet(b);
        x = createSprite(b, "normal", 97, 0, 195, 46);
        x.x = 294;
        x.y = -35;
        y.addChild(x);
        K = new CInterface(r,
            I, y);
        this._initStaticSymbols();
        z = new CAvatar(s_oAttachSection);
        z.show(0);
        n = new CPayTablePanel;
        aa = new CBonusPanel;
        Y = new CFreespinPanel(s_oStage);
        U = new CResultFreespin(s_oStage);
        this.refreshButtonPos();
        a = !0
    };
    this.unload = function() {
        K.unload();
        n.unload();
        for (var b = 0; b < H.length; b++) H[b].unload();
        s_oMsgBox.unload();
        s_oAttachSection.removeAllChildren();
        s_oGame = null
    };
    this.refreshButtonPos = function() {
        K.refreshButtonPos();
        aa.refreshButtonPos();
        z.refreshButtonPos()
    };
    this._initReels = function() {
        var b = START_REEL_OFFSET_X =
            15,
            u = START_REEL_OFFSET_Y = 13,
            L = new createjs.Shape;
        L.graphics.beginFill("rgba(0,0,0,0.3)").drawRect(b, u, SYMBOL_WIDTH * NUM_REELS + SPACE_BETWEEN_SYMBOLS * (NUM_REELS - 1), SYMBOL_HEIGHT * NUM_ROWS + SPACE_HEIGHT_BETWEEN_SYMBOLS * (NUM_ROWS - 1));
        y.addChild(L);
        Q = new createjs.Container;
        y.addChild(Q);
        L = new createjs.Shape;
        L.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(b, u, SYMBOL_WIDTH * NUM_REELS + SPACE_BETWEEN_SYMBOLS * (NUM_REELS - 1), SYMBOL_HEIGHT * NUM_ROWS + SPACE_HEIGHT_BETWEEN_SYMBOLS * (NUM_ROWS - 1));
        y.addChild(L);
        this.generateLosingPattern();
        var B = 0;
        H = [];
        for (var W = 0; W < NUM_REELS; W++) H[W] = new CReelColumn(W, b, u, B, [N[0][W], N[1][W], N[2][W]], Q), H[W + NUM_REELS] = new CReelColumn(W + NUM_REELS, b, u + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS, B, [N[0][W], N[1][W], N[2][W]], Q), b += SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS, B += REEL_DELAY;
        Q.mask = L
    };
    this._initStaticSymbols = function() {
        var b = REEL_OFFSET_X + START_REEL_OFFSET_X,
            u = REEL_OFFSET_Y + START_REEL_OFFSET_Y;
        w = [];
        for (var L = 0; L < NUM_ROWS; L++) {
            w[L] = [];
            for (var B = 0; B < NUM_REELS; B++) {
                var W = new CAnimSymbol(b, u, s_oAttachSection);
                w[L][B] = W;
                b += SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS
            }
            b = REEL_OFFSET_X + START_REEL_OFFSET_X;
            u += SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS
        }
    };
    this._generateRandSymbols = function() {
        for (var b = [], u = 0; u < NUM_ROWS; u++) b[u] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
        return b
    };
    this.reelArrived = function(b, u) {
        if (l > MIN_REEL_LOOPS)
            if (m === u) {
                if (!1 === H[b].isReadyToStop()) {
                    var L = b;
                    b < NUM_REELS ? (L += NUM_REELS, H[L].setReadyToStop(), H[b].restart([N[0][b], N[1][b], N[2][b]], !0)) : (L -= NUM_REELS, H[L].setReadyToStop(),
                        H[b].restart([N[0][L], N[1][L], N[2][L]], !0))
                }
            } else H[b].restart(this._generateRandSymbols(), !1);
        else H[b].restart(this._generateRandSymbols(), !1), d && 0 === b && l++
    };
    this.stopNextReel = function() {
        h++;
        0 === h % 2 && (m = P[h / 2], h === 2 * NUM_REELS && this._endReelAnimation())
    };
    this._realEndReelAnimation = function() {
        -1 !== C.indexOf(BONUS_GAME) || 0 < k ? (this.resetAutoSpin(), K.disableGuiButtons(c, 0 < k ? !0 : !1)) : c ? K.enableSpin(!0) : K.enableGuiButtons();
        K.setSpinState(TEXT_SPIN);
        "normal" !== x.currentAnimation && K.refreshFreeSpinNum(k);
        if (0 < M.length) {
            for (var b = 0; b < M.length; b++) {
                0 < M[b].line && K.showLine(M[b].line);
                for (var u = M[b].list, L = 0; L < u.length; L++) H[u[L].col].playWinAnim(u[L].row), H[u[L].col + NUM_REELS].playWinAnim(u[L].row)
            }
            0 < G && K.refreshWinText(G);
            p = 0;
            f = GAME_STATE_SHOW_ALL_WIN;
            K.refreshMoney(E)
        } else if (0 < k) K.disableSpin(0 < k ? !1 : !0), this.onSpin();
        else if ("normal" !== x.currentAnimation && (U.show(A), x.gotoAndStop("normal"), K.refreshFreeSpinNum(""), K.refreshFreeSpinAmount(0), createjs.Tween.get(O).to({
                    alpha: 0
                }, 2E3, createjs.Ease.cubicOut),
                K.enableGuiButtons()), c)
            if (E < I && 0 === k) K.enableGuiButtons(), this.resetAutoSpin(), K.enableGuiButtons(), f = GAME_STATE_IDLE;
            else this.onSpin();
        else K.enableGuiButtons(), f = GAME_STATE_IDLE;
        E < I && 0 === k ? (K.enableGuiButtons(), this.resetAutoSpin()) : c || ("stop_freespin" !== x.currentAnimation ? 0 < k || -1 !== C.indexOf(BONUS_GAME) ? K.enableSpin(!1) : (K.enableGuiButtons(), K.disableBetBut(!1)) : 0 < M.length && (K.enableSpin(!1), K.disableBetBut(!0)));
        K.refreshFreeSpinAmount(A)
    };
    this._endReelAnimation = function() {
        d = !1;
        q = h = l = 0;
        m = P[0];
        this._realEndReelAnimation()
    };
    this.hidePayTable = function() {
        n.hide()
    };
    this.fadeInSymbolInWin = function() {
        for (var b = M[q - 1].list, u = 0; u < b.length; u++) w[b[u].row][b[u].col].hide(), H[b[u].col].fadeIn(b[u].row, 500), H[b[u].col + NUM_REELS].fadeIn(b[u].row, 500);
        setTimeout(function() {
            s_oGame.showWin()
        }, 500)
    };
    this.showWin = function() {
        if (f === GAME_STATE_SHOW_WIN) {
            if (0 < q) {
                J = 0;
                stopSound("avatar_win");
                var b = M[q - 1].line;
                K.hideLine(b)
            }
            if (q === M.length)
                if (q = 0, "normal" !== x.currentAnimation && 0 === k && (U.show(A), x.gotoAndStop("normal"),
                        K.refreshFreeSpinNum(""), K.refreshFreeSpinAmount(0), createjs.Tween.get(O).to({
                            alpha: 0
                        }, 2E3, createjs.Ease.cubicOut), K.enableGuiButtons()), -1 !== C.indexOf(BONUS_GAME)) this._hideAllWins(), $(s_oMain).trigger("bonus_call", {
                    bet: COIN_BET[t]
                });
                else if (g) g = !1, Y.show(F);
            else if (0 < k) K.disableSpin(0 < k ? !1 : !0), this.onSpin();
            else if (c) this.onSpin();
            else K.enableGuiButtons(), K.disableBetBut(!1), f = GAME_STATE_IDLE, K.enableGuiButtons();
            else {
                var u = M[q].list;
                b = [];
                var L = u[0].col * (SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS),
                    B = L +
                    SYMBOL_WIDTH / 2,
                    W = SYMBOL_HEIGHT / 2 + u[0].row * SYMBOL_HEIGHT,
                    V = W + Math.floor(21 * Math.random()) - 10;
                b.push({
                    x: L,
                    y: W,
                    row: u[0].row,
                    col: u[0].col
                });
                for (var T = 1; T < u.length + 1; T++) {
                    for (var S = .5; 1 >= S;) {
                        var Z = interpolate({
                            x: L,
                            y: W
                        }, {
                            x: B,
                            y: V
                        }, S);
                        b.push({
                            x: Z.x,
                            y: Z.y,
                            row: u[T - 1].row,
                            col: u[T - 1].col
                        });
                        S += .5
                    }
                    T < u.length && (L = B, B = u[T].col * (SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS) + SYMBOL_WIDTH / 2, W = V, V = SYMBOL_HEIGHT / 2 + u[T].row * SYMBOL_HEIGHT + Math.floor(21 * Math.random()) - 10)
                }
                B += SYMBOL_WIDTH / 2;
                V += Math.floor(21 * Math.random()) - 10;
                b.push({
                    x: B,
                    y: V,
                    row: u[u.length - 1].row,
                    col: u[u.length - 1].col
                });
                v = [];
                for (u = 0; u < b.length - 1; u++) L = new createjs.Shape, L.graphics.setStrokeStyle(6, "round", 0, 0, !0).beginStroke("#ffffbb"), L.alpha = 0, y.addChild(L), L.graphics.moveTo(b[u].x, b[u].y), L.graphics.lineTo(b[u + 1].x, b[u + 1].y), v.push({
                    line: L,
                    row: b[u + 1].row,
                    col: b[u + 1].col
                });
                this._drawNextCutLine();
                z.show(1);
                playSound("avatar_win", 1, !1);
                q++
            }
        }
    };
    this._drawNextCutLine = function() {
        if (f === GAME_STATE_SHOW_WIN && J < v.length) {
            createjs.Tween.get(v[J].line).to({
                alpha: .8
            }, 50).call(function() {
                s_oGame._drawNextCutLine()
            }).wait(150).to({
                    alpha: 0
                },
                50);
            if (0 < J && 0 < q && 0 !== J % 2) {
                var b = v[J].row,
                    u = v[J].col;
                H[u].setVisible(b, !1);
                H[u + NUM_REELS].setVisible(b, !1);
                w[b][u].playAnim(N[b][u], M[q - 1].amount, J >= v.length - 2 ? !0 : !1)
            }
            J++
        }
    };
    this._hideAllWins = function() {
        for (var b = 0; b < NUM_ROWS; b++)
            for (var u = 0; u < NUM_REELS; u++) H[u].stopWinAnim(b), H[u + NUM_REELS].stopWinAnim(b);
        K.hideAllLines()
    };
    this._prepareForWinsShowing = function() {
        J = 0;
        p = TIME_SHOW_WIN;
        f = GAME_STATE_SHOW_WIN;
        this.showWin()
    };
    this.activateLines = function(b) {
        e = b;
        this.removeWinShowing();
        I = b = r * e;
        K.refreshTotalBet(I);
        K.refreshNumLines(e);
        b > E ? K.disableSpin(0 < k ? !1 : !0) : K.enableSpin(0 < k ? !1 : !0)
    };
    this.addLine = function() {
        e === NUM_PAYLINES ? e = 1 : e++;
        I = r * e;
        K.refreshTotalBet(I);
        K.refreshNumLines(e);
        K.enableSpin(0 < k ? !1 : !0)
    };
    this.resetCoinBet = function() {
        t = 0;
        var b = COIN_BET[t],
            u = b * e;
        r = b;
        I = u;
        K.refreshBet(r);
        K.refreshTotalBet(I);
        K.enableSpin(0 < k ? !1 : !0)
    };
    this.changeCoinBet = function() {
        t++;
        t === COIN_BET.length && (t = 0);
        var b = parseFloat(COIN_BET[t]),
            u = b * e;
        r = b;
        r = Math.floor(100 * r) / 100;
        I = u;
        K.refreshBet(r);
        K.refreshTotalBet(I);
        K.enableSpin(0 <
            k ? !1 : !0)
    };
    this.removeWinShowing = function() {
        n.resetHighlightCombo();
        K.resetWin();
        v[J] && createjs.Tween.removeTweens(v[J].line);
        for (var b = 0; b < NUM_ROWS; b++)
            for (var u = 0; u < NUM_REELS; u++) w[b][u].hide(), H[u].setVisible(b, !0), H[u + NUM_REELS].setVisible(b, !0);
        for (b = 0; b < H.length; b++) H[b].activate();
        f = GAME_STATE_IDLE
    };
    this.forceStopReel = function() {
        0 === k && this.resetAutoSpin();
        f = GAME_STATE_IDLE;
        for (var b = 0; b < NUM_REELS; b++) H[b].forceStop([N[0][b], N[1][b], N[2][b]], START_REEL_OFFSET_Y), H[b + NUM_REELS].forceStop(null,
            REEL_OFFSET_Y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS);
        this._endReelAnimation()
    };
    this.onSpin = function() {
        !(0 < k && "normal" === x.currentAnimation || -1 !== C.indexOf(BONUS_GAME) || 0 === k && "normal" !== x.currentAnimation) || f !== GAME_STATE_SHOW_ALL_WIN && f !== GAME_STATE_SHOW_WIN ? -1 === C.indexOf(BONUS_FREESPIN) || f !== GAME_STATE_SHOW_ALL_WIN && f !== GAME_STATE_SHOW_WIN ? E < I && 0 === k ? (this.resetAutoSpin(), new CRechargePanel) : (d = !1, stopSound("avatar_win"), playSound("spin_but", 1, !1), K.disableBetBut(!0), this.removeWinShowing(),
            I = "stop_freespin" === x.currentAnimation ? 0 : r * e, C = [], this._hideAllWins(), K.disableGuiButtons(c, 0 < k ? !0 : !1), E -= I, K.refreshMoney(E), $(s_oMain).trigger("bet_placed", {
                bet: COIN_BET[t],
                tot_bet: I,
                payline: e
            }), f = GAME_STATE_SPINNING) : (this._hideAllWins(), K.disableSpin(!0), this.removeWinShowing(), g = !1, Y.show(F)) : (this._hideAllWins(), K.disableSpin(!0), this.removeWinShowing(), q = M.length, f = GAME_STATE_SHOW_WIN, this.showWin())
    };
    this.onSpinReceived = function(b) {
        trace(b);
        D++;
        D === NUM_SPIN_FOR_ADS && (D = 0, $(s_oMain).trigger("show_interlevel_ad"));
        if (!0 === b.res) {
            N = b.pattern;
            M = b.win_lines;
            var u = parseFloat(b.tot_win),
                L = b.bonus;
            F = parseInt(b.num_freespin);
            E = parseFloat(b.money);
            "normal" !== x.currentAnimation && !1 === g && (A += u);
            k = F;
            0 < u || !0 === L || 0 < k ? (g = !1, b.freespin && (C.push(BONUS_FREESPIN), g = !0, A = 0), L && C.push(BONUS_GAME), G = u) : M = [];
            d = !0;
            $(s_oMain).trigger("save_score", E);
            saveItem(LOCALSTORAGE_STRING + "score", E)
        } else s_oGame.generateLosingPattern()
    };
    this.onBonusStart = function(b) {
        trace(b);
        E = parseFloat(b.money);
        parseFloat(b.bonus_win);
        aa.show(b.prize_list,
            r);
        f = GAME_STATE_BONUS
    };
    this.onAutoSpin = function(b) {
        if ((c = b) && f === GAME_STATE_IDLE) this.onSpin()
    };
    this.onStopAutoSpin = function() {
        this.resetAutoSpin();
        f !== GAME_STATE_SPINNING && f !== GAME_STATE_BONUS && K.enableGuiButtons()
    };
    this.generateLosingPattern = function() {
        for (var b = [], u = 0; u < NUM_ROWS; u++) {
            var L = Math.floor(Math.random() * (s_aRandSymbols.length - 2));
            L = s_aRandSymbols[L];
            b[u] = L
        }
        N = [];
        for (u = 0; u < NUM_ROWS; u++) {
            N[u] = [];
            for (var B = 0; B < NUM_REELS; B++)
                if (0 === B) N[u][B] = b[u];
                else {
                    do L = Math.floor(Math.random() * (s_aRandSymbols.length -
                        2)), L = s_aRandSymbols[L]; while (b[0] === L || b[1] === L || b[2] === L);
                    N[u][B] = L
                }
        }
        M = [];
        d = !0
    };
    this.onInfoClicked = function() {
        f !== GAME_STATE_SPINNING && (n.isVisible() ? n.hide() : n.show())
    };
    this.resetAutoSpin = function() {
        c = !1;
        K.setAutoSpinState(TEXT_AUTO_SPIN)
    };
    this.exitFromFreespinPanel = function() {
        K.refreshFreeSpinNum(k);
        K.refreshFreeSpinAmount(0);
        x.gotoAndPlay("freespin");
        createjs.Tween.get(O).to({
            alpha: 1
        }, 2E3, createjs.Ease.cubicOut);
        K.disableSpin(0 < k ? !1 : !0);
        f = GAME_STATE_IDLE;
        this.onSpin()
    };
    this.exitFromBonus = function(b) {
        K.refreshMoney(E);
        K.refreshWinText(b);
        if (g) g = !1, Y.show(F);
        else if (c) this.onSpin();
        else K.enableGuiButtons(), K.disableBetBut(!1), K.enableSpin(0 < k ? !1 : !0), K.enableGuiButtons()
    };
    this.refreshMoney = function(b) {
        E = b;
        K.refreshMoney(E)
    };
    this.onExit = function() {
        $(s_oMain).trigger("start_session");
        this.unload();
        s_oMain.gotoMenu()
    };
    this.getState = function() {
        return f
    };
    this.update = function() {
        if (!1 !== a) switch (f) {
            case GAME_STATE_SPINNING:
                for (var b = 0; b < H.length; b++) H[b].update();
                break;
            case GAME_STATE_SHOW_ALL_WIN:
                p += s_iTimeElaps;
                p > TIME_SHOW_ALL_WINS &&
                    (p = 0, this._hideAllWins(), q = c ? M.length : 0, this._prepareForWinsShowing());
                break;
            case GAME_STATE_SHOW_WIN:
                for (b = 0; b < NUM_ROWS; b++)
                    for (var u = 0; u < NUM_REELS; u++) w[b][u].update();
                break;
            case GAME_STATE_BONUS:
                aa.update()
        }
    };
    s_oGame = this;
    this._init()
}
var s_oGame = null,
    s_oTweenController;

function CReelColumn(a, d, c, g, f, l) {
    var m, h, e, p, q, J, r, I, E, G, A, F, k, D, C, v;
    this._init = function(t, H, w, M, P) {
        p = e = h = m = !1;
        I = 0;
        q = t;
        r = M;
        J = q < NUM_REELS ? q : q - NUM_REELS;
        G = 0;
        A = MAX_FRAMES_REEL_EASE;
        E = REEL_STATE_START;
        F = w;
        k = F + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS;
        this.initContainer(H, w, P)
    };
    this.initContainer = function(t, H) {
        v = new createjs.Container;
        v.x = t;
        v.y = H;
        var w = SYMBOL_WIDTH / 2,
            M = SYMBOL_HEIGHT / 2;
        D = [];
        C = [];
        for (var P = 0; P < NUM_ROWS; P++) {
            var N = createSprite(s_aSymbolData[f[P]], "static", SYMBOL_WIDTH / 2, SYMBOL_HEIGHT /
                2, SYMBOL_WIDTH, SYMBOL_HEIGHT);
            N.stop();
            N.x = w;
            N.y = M;
            v.addChild(N);
            D[P] = N;
            C[P] = f[P];
            M += SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS
        }
        l.addChild(v)
    };
    this.unload = function() {
        l.removeChild(v)
    };
    this.activate = function() {
        F = v.y;
        k = F + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS;
        m = !0
    };
    this._setSymbol = function(t) {
        v.removeAllChildren();
        for (var H = SYMBOL_WIDTH / 2, w = SYMBOL_HEIGHT / 2, M = 0; M < t.length; M++) {
            var P = createSprite(s_aSymbolData[t[M]], "static", SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2, SYMBOL_WIDTH, SYMBOL_HEIGHT);
            P.stop();
            P.x = H;
            P.y = w;
            v.addChild(P);
            D[M] = P;
            C[M] = t[M];
            w += SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS
        }
    };
    this.forceStop = function(t, H) {
        null !== t && this._setSymbol(t);
        v.y = H;
        m = !1;
        G = 0;
        A = MAX_FRAMES_REEL_EASE;
        E = REEL_STATE_START;
        I = 0;
        e = h = !1
    };
    this.setVisible = function(t, H) {
        D[t].visible = H
    };
    this.fadeIn = function(t, H) {
        D[t].scaleX = D[t].scaleY = .1;
        D[t].visible = !0;
        createjs.Tween.get(D[t]).to({
            scaleX: 1,
            scaleY: 1
        }, H, createjs.Ease.bounceOut)
    };
    this.restart = function(t, H) {
        v.y = F = REEL_START_Y;
        k = F + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) *
            NUM_ROWS;
        this._setSymbol(t);
        if (h = H) {
            G = 0;
            A = MAX_FRAMES_REEL_EASE;
            E = REEL_STATE_STOP;
            for (var w = 0; w < NUM_ROWS; w++) D[w].gotoAndStop("static");
            e = !0
        } else
            for (w = 0; w < NUM_ROWS; w++) D[w].gotoAndStop("moving")
    };
    this.setReadyToStop = function() {
        G = 0;
        A = MAX_FRAMES_REEL_EASE;
        E = REEL_STATE_STOP
    };
    this.playWinAnim = function(t) {
        D[t].scaleX = D[t].scaleY = 1;
        D[t].visible = !0;
        createjs.Tween.get(D[t], {
            loop: !0
        }).to({
            scaleX: 1.2,
            scaleY: 1.2
        }, 500, createjs.Ease.quintOut).to({
            scaleX: 1,
            scaleY: 1
        }, 500, createjs.Ease.cubicOut)
    };
    this.stopWinAnim =
        function(t) {
            createjs.Tween.removeTweens(D[t]);
            D[t].scaleX = D[t].scaleY = 1
        };
    this.isReadyToStop = function() {
        return h
    };
    this.getPosUpLeft = function(t) {
        return {
            x: v.x,
            y: v.y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * t
        }
    };
    this.getY = function() {
        return v.y
    };
    this._updateStart = function() {
        0 === G && q < NUM_REELS && playSound("start_reel", 1, !1);
        G++;
        G > A && (G = 0, A /= 2, E++, F = v.y, k = F + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS);
        var t = s_oTweenController.easeInBack(G, 0, 1, A);
        t = s_oTweenController.tweenValue(F, k, t);
        v.y = t
    };
    this._updateMoving = function() {
        G++;
        G > A && (G = 0, F = v.y, k = F + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS);
        var t = s_oTweenController.easeLinear(G, 0, 1, A);
        t = s_oTweenController.tweenValue(F, k, t);
        v.y = t
    };
    this._updateStopping = function() {
        G++;
        if (G >= A) m = !1, G = 0, A = MAX_FRAMES_REEL_EASE, E = REEL_STATE_START, I = 0, p = h = !1, e && (e = !1, v.y = k), s_oGame.stopNextReel();
        else {
            var t = s_oTweenController.easeOutBack(G, 0, 1, A);
            t = s_oTweenController.tweenValue(F, k, t);
            v.y = t;
            !1 === p && G >= .7 * A && e && (p = !0, C[0] === BONUS_SYMBOL || C[1] === BONUS_SYMBOL ||
                C[2] === BONUS_SYMBOL ? playSound("reel_stop_bonus", 1, !1) : C[0] === FREESPIN_SYMBOL || C[1] === FREESPIN_SYMBOL || C[2] === FREESPIN_SYMBOL ? playSound("reel_stop_freespin", 1, !1) : playSound("reel_stop", 1, !1))
        }
    };
    this.update = function() {
        if (!1 !== m && (I++, I > r)) switch (!1 === h && v.y > REEL_ARRIVAL_Y && E !== REEL_STATE_STOP && s_oGame.reelArrived(q, J), E) {
            case REEL_STATE_START:
                this._updateStart();
                break;
            case REEL_STATE_MOVING:
                this._updateMoving();
                break;
            case REEL_STATE_STOP:
                this._updateStopping()
        }
    };
    this._init(a, d, c, g, f)
}

function CInterface(a, d, c) {
    var g, f, l, m, h, e, p, q, J, r, I, E, G, A, F, k, D, C, v, t, H, w, M, P, N, R, O, x, X, Y, U, K, n = null,
        aa = null;
    this._init = function(y, Q, z) {
        this._initPaylines(z);
        var b = s_oSpriteLibrary.getSprite("but_text");
        q = CANVAS_HEIGHT - b.height / 2 - 150;
        C = new CSpriteSheetTextButton(70, q, b, TEXT_PAYTABLE, FONT_GAME_1, "#fce0ab", 15, z);
        C.addEventListener(ON_MOUSE_UP, this._onInfo, this);
        r = CANVAS_HEIGHT - b.height / 2 - 150;
        t = new CSpriteSheetTextButton(182, r, b, TEXT_COIN + " " + formatEntries(y), FONT_GAME_1, "#fce0ab", 15, z);
        t.addEventListener(ON_MOUSE_UP,
            this._onBet, this);
        J = CANVAS_HEIGHT - b.height / 2 - 150;
        v = new CSpriteSheetTextButton(294, J, b, TEXT_LINES + " " + NUM_PAYLINES, FONT_GAME_1, "#fce0ab", 15, z);
        v.addEventListener(ON_MOUSE_UP, this._onAddLine, this);
        I = CANVAS_HEIGHT - b.height / 2 - 150;
        H = new CSpriteSheetTextButton(406, I, b, TEXT_AUTO_SPIN, FONT_GAME_1, "#fce0ab", 15, z);
        H.addEventListener(ON_MOUSE_UP, this._onAutoSpin, this);
        E = 518;
        G = CANVAS_HEIGHT - b.height / 2 - 150;
        D = new CSpriteSheetTextButton(E, G, b, TEXT_SPIN, FONT_GAME_1, "#fce0ab", 15, z);
        D.addEventListener(ON_MOUSE_UP,
            this._onSpin, this);
        p = CANVAS_HEIGHT - 206;
        N = new CTLText(z, 19, p, 134, 15, 15, "left", "#fce0ab", FONT_GAME_1, 1, 0, 0, TEXT_MONEY + ": " + formatEntries(TOTAL_MONEY), !0, !0, !1, !1);
        N.setShadow("#000000", 2, 2, 2);
        x = new CTLText(z, 304, p, 134, 15, 15, "left", "#fce0ab", FONT_GAME_1, 1, 0, 0, TEXT_BET + ": " + formatEntries(Q), !0, !0, !1, !1);
        x.setShadow("#000000", 2, 2, 2);
        X = new CTLText(z, 444, p, 134, 15, 15, "left", "#fce0ab", FONT_GAME_1, 1, 0, 0, TEXT_WIN + ": 0.00" + TEXT_CURRENCY, !0, !0, !1, !1);
        X.setShadow("#000000", 1, 1, 2);
        y = s_oSpriteLibrary.getSprite("amount_freespins");
        M = new createjs.Container;
        M.visible = !1;
        M.x = 460;
        M.y = -14;
        M.regX = y.width / 2;
        M.regY = y.height / 2;
        z.addChild(M);
        y = createBitmap(y);
        M.addChild(y);
        Y = new CTLText(M, M.regX - 50, M.regY - 8, 100, 24, 24, "center", "#fce0ab", FONT_GAME_1, 1, 0, 0, "0", !0, !0, !1, !1);
        y = s_oSpriteLibrary.getSprite("amount_freespin_win");
        P = new createjs.Container;
        P.visible = !1;
        P.x = 126;
        P.y = -14;
        P.regX = y.width / 2;
        P.regY = y.height / 2;
        z.addChild(P);
        y = createBitmap(y);
        P.addChild(y);
        U = new CTLText(P, P.regX - 50, P.regY - 8, 100, 24, 24, "center", "#fce0ab", FONT_GAME_1, 1, 0,
            0, "0", !0, !0, !1, !1);
        z = s_oSpriteLibrary.getSprite("but_exit");
        g = CANVAS_WIDTH - z.width / 2 - 4;
        f = z.height / 2 + 4;
        w = new CGfxButton(g, f, z, s_oStage);
        w.addEventListener(ON_MOUSE_UP, this._onExit, this);
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (b = s_oSpriteLibrary.getSprite("audio_icon"), h = b.width / 4 + 4, e = f, R = new CToggle(h, e, b, s_bAudioActive), R.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this), l = h + b.width / 2 + 4, m = e) : (l = b.width / 2 + 4, m = f);
        b = window.document;
        z = b.documentElement;
        n = z.requestFullscreen || z.mozRequestFullScreen ||
            z.webkitRequestFullScreen || z.msRequestFullscreen;
        aa = b.exitFullscreen || b.mozCancelFullScreen || b.webkitExitFullscreen || b.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (n = !1);
        n && screenfull.isEnabled && (b = s_oSpriteLibrary.getSprite("but_fullscreen"), O = new CToggle(l, m, b, s_bFullscreen, s_oStage), O.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        K = new CAreYouSurePanel;
        K.addEventListener(ON_BUT_YES_DOWN, this._onExitYes, this);
        s_bMobile || (document.onkeyup = this.onKeyUp);
        this.refreshButtonPos()
    };
    this.onKeyUp =
        function(y) {
            y || (y = window.event);
            13 === y.keyCode && s_oInterface._onSpin();
            y.preventDefault();
            return !1
        };
    this.refreshButtonPos = function() {
        E - s_iOffsetX > CANVAS_WIDTH - 210 && D.setPosition(E - s_iOffsetX, G - s_iOffsetY);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || R.setPosition(h + s_iOffsetX, s_iOffsetY + e);
        n && screenfull.isEnabled && O.setPosition(l + s_iOffsetX, m + s_iOffsetY);
        w.setPosition(g - s_iOffsetX, f + s_iOffsetY)
    };
    this.unload = function() {
        D.unload();
        D = null;
        C.unload();
        C = null;
        v.unload();
        v = null;
        w.unload();
        t.unload();
        t = null;
        H.unload();
        H = null;
        K.unload();
        for (var y = 0; y < NUM_PAYLINES; y++) F[y].unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) R.unload(), R = null;
        n && screenfull.isEnabled && O.unload();
        s_oInterface = null
    };
    this._initPaylines = function(y) {
        var Q = s_oSpriteLibrary.getSprite("bet_but");
        F = [];
        var z = 4.5,
            b = {
                images: [s_oSpriteLibrary.getSprite("paylines")],
                frames: [
                    [1, 1, 594, 10, 0, -21, 0],
                    [1, 1, 594, 10, 0, -21, 0],
                    [1, 1, 594, 10, 0, -21, 0],
                    [597, 1, 591, 257, 0, -24, 0],
                    [1190, 1, 591, 258, 0, -24, 0],
                    [1, 261, 617, 110, 0, 0, 0],
                    [620, 261, 599, 107, 0, 0, 0],
                    [1221,
                        261, 617, 204, 0, 0, 0
                    ],
                    [1, 467, 617, 203, 0, 0, 0],
                    [620, 467, 615, 257, 0, 0, 0],
                    [1237, 467, 615, 254, 0, 0, 0],
                    [1, 726, 599, 111, 0, 0, 0],
                    [602, 726, 598, 106, 0, 0, 0],
                    [1202, 726, 614, 152, 0, 0, -1],
                    [1, 880, 614, 151, 0, 0, 0],
                    [617, 880, 595, 143, 0, -20, 0],
                    [1214, 880, 595, 121, 0, -20, 0],
                    [1, 1033, 596, 248, 0, -1, 0],
                    [599, 1033, 596, 249, 0, -1, 0],
                    [1197, 1033, 595, 198, 0, -20, -2]
                ],
                animations: {
                    payline0: 0,
                    payline1: 1,
                    payline2: 2,
                    payline3: 3,
                    payline4: 4,
                    payline5: 5,
                    payline6: 6,
                    payline7: 7,
                    payline8: 8,
                    payline9: 9,
                    payline10: 10,
                    payline11: 11,
                    payline12: 12,
                    payline13: 13,
                    payline14: 14,
                    payline15: 15,
                    payline16: 16,
                    payline17: 17,
                    payline18: 18,
                    payline19: 19
                }
            };
        b = new createjs.SpriteSheet(b);
        var u = [{
            x: -18,
            y: 176
        }, {
            x: -18,
            y: 46
        }, {
            x: -18,
            y: 269
        }, {
            x: -18,
            y: 14
        }, {
            x: -18,
            y: 54
        }, {
            x: 6,
            y: 45
        }, {
            x: 6,
            y: 174
        }, {
            x: 6,
            y: 46
        }, {
            x: 6,
            y: 78
        }, {
            x: -18,
            y: 50
        }, {
            x: -18,
            y: 53
        }, {
            x: 6,
            y: 46
        }, {
            x: 6,
            y: 175
        }, {
            x: 6,
            y: 15
        }, {
            x: 6,
            y: 164
        }, {
            x: -18,
            y: 26
        }, {
            x: -18,
            y: 183
        }, {
            x: 6,
            y: 53
        }, {
            x: 0,
            y: 31
        }, {
            x: -18,
            y: 77
        }];
        k = [];
        for (var L = 0; L < NUM_PAYLINES; L++) {
            var B = new createjs.Sprite(b, "payline" + L);
            B.x = u[L].x;
            B.y = u[L].y;
            B.visible = !1;
            y.addChild(B);
            k[L] = B
        }
        b = new CBetBut(-Q.width /
            4 - 6, z, "bet_but4", "4", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 4);
        F[3] = b;
        z += 32;
        b = new CBetBut(-Q.width / 4 - 4, z, "bet_but2", "2", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 2);
        F[1] = b;
        z += 32;
        b = new CBetBut(-Q.width / 4 - 4, z, "bet_but20", "20", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 20);
        F[19] = b;
        z += 32;
        b = new CBetBut(-Q.width / 4 - 4, z, "bet_but16", "16", FONT_GAME_1,
            "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 16);
        F[15] = b;
        z += 32;
        b = new CBetBut(-Q.width / 4 - 4, z, "bet_but10", "10", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 10);
        F[9] = b;
        z += 32;
        b = new CBetBut(-Q.width / 4 - 4, z, "bet_but1", "1", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 1);
        F[0] = b;
        z += 33;
        b = new CBetBut(-Q.width / 4 - 4, z, "bet_but11", "11", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP,
            this._onBetLineClicked, this, 11);
        F[10] = b;
        z += 32;
        b = new CBetBut(-Q.width / 4 - 4, z, "bet_but17", "17", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 17);
        F[16] = b;
        z += 32;
        b = new CBetBut(-Q.width / 4 - 4, z, "bet_but3", "3", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 3);
        F[2] = b;
        b = new CBetBut(-Q.width / 4 - 4, z + 32, "bet_but5", "5", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,
            5);
        F[4] = b;
        z = 4.5;
        b = new CBetBut(598 - Q.width / 4, z, "bet_but14", "14", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 14);
        F[13] = b;
        z += 32;
        b = new CBetBut(598 - Q.width / 4, z, "bet_but12", "12", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 12);
        F[11] = b;
        z += 32;
        b = new CBetBut(598 - Q.width / 4, z, "bet_but9", "9", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 9);
        F[8] = b;
        z += 32;
        b = new CBetBut(598 -
            Q.width / 4, z, "bet_but18", "18", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 18);
        F[17] = b;
        z += 32;
        b = new CBetBut(598 - Q.width / 4, z, "bet_but6", "6", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 6);
        F[5] = b;
        z += 33;
        b = new CBetBut(598 - Q.width / 4, z, "bet_but7", "7", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 7);
        F[6] = b;
        z += 32;
        b = new CBetBut(598 - Q.width / 4, z, "bet_but19",
            "19", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 19);
        F[18] = b;
        z += 32;
        b = new CBetBut(598 - Q.width / 4, z, "bet_but8", "8", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 8);
        F[7] = b;
        z += 32;
        b = new CBetBut(598 - Q.width / 4, z, "bet_but13", "13", FONT_GAME_1, "#ffd202", 17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 13);
        F[12] = b;
        b = new CBetBut(598 - Q.width / 4, z + 32, "bet_but15", "15", FONT_GAME_1, "#ffd202",
            17, y);
        b.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 15);
        F[14] = b
    };
    this.refreshMoney = function(y) {
        N.refreshText(TEXT_MONEY + ": " + formatEntries(y) + TEXT_CURRENCY)
    };
    this.refreshBet = function(y) {
        t.setText(TEXT_COIN + " " + formatEntries(y))
    };
    this.refreshTotalBet = function(y) {
        x.refreshText(TEXT_BET + ": " + formatEntries(y) + TEXT_CURRENCY)
    };
    this.refreshNumLines = function(y) {
        A = !0;
        v.setText(TEXT_LINES + " " + y);
        for (var Q = 0; Q < NUM_PAYLINES; Q++) Q < y ? (F[Q].setOn(), k[Q].visible = !0) : F[Q].setOff();
        setTimeout(function() {
            for (var z =
                    0; z < NUM_PAYLINES; z++) k[z].visible = !1;
            A = !1
        }, 1E3)
    };
    this.resetWin = function() {
        X.refreshText(TEXT_WIN + ": " + formatEntries(0))
    };
    this.refreshWinText = function(y) {
        X.refreshText(TEXT_WIN + ": " + formatEntries(y))
    };
    this.refreshFreeSpinNum = function(y) {
        Y.refreshText(y);
        "" === y ? (M.visible = !1, P.visible = !1) : (M.visible = !0, P.visible = !0)
    };
    this.refreshFreeSpinAmount = function(y) {
        U.refreshText(formatEntries(y))
    };
    this.showLine = function(y) {
        0 < y && (k[y - 1].visible = !0)
    };
    this.hideLine = function(y) {
        0 < y && (k[y - 1].visible = !1)
    };
    this.hideAllLines =
        function() {
            for (var y = 0; y < NUM_PAYLINES; y++) k[y].visible = !1
        };
    this.disableBetBut = function(y) {
        for (var Q = 0; Q < NUM_PAYLINES; Q++) F[Q].disable(y)
    };
    this.enableGuiButtons = function() {
        D.enable();
        H.enable();
        t.enable();
        v.enable();
        C.enable();
        s_bMobile || (document.onkeyup = this.onKeyUp)
    };
    this.enableSpin = function(y) {
        D.enable();
        y && H.enable();
        s_bMobile || (document.onkeyup = this.onKeyUp)
    };
    this.disableSpin = function(y) {
        D.disable();
        y && H.disable();
        s_bMobile || (document.onkeyup = null)
    };
    this.disableGuiButtons = function(y, Q) {
        s_bMobile ||
            (document.onkeyup = null);
        Q ? (H.disable(), this.disableSpin(!0)) : y ? (D.disable(), H.setText(TEXT_STOP_AUTO)) : (H.disable(), D.setText(TEXT_SKIP));
        t.disable();
        v.disable();
        C.disable()
    };
    this.setAutoSpinState = function(y) {
        H.setText(y)
    };
    this.setSpinState = function(y) {
        D.setText(y)
    };
    this._onBetLineClicked = function(y) {
        A || (this.refreshNumLines(y), s_oGame.activateLines(y))
    };
    this._onSpin = function() {
        if (D.getText() === TEXT_SKIP) s_oGame.forceStopReel(), D.setText(TEXT_SPIN);
        else s_oGame.onSpin()
    };
    this._onAddLine = function() {
        s_oGame.addLine()
    };
    this._onInfo = function() {
        s_oGame.onInfoClicked()
    };
    this._onBet = function() {
        s_oGame.changeCoinBet()
    };
    this._onAutoSpin = function() {
        H.getText() === TEXT_STOP_AUTO ? (H.setText(TEXT_AUTO_SPIN), s_oGame.onAutoSpin(!1)) : (H.setText(TEXT_STOP_AUTO), s_oGame.onAutoSpin(!0))
    };
    this.resetFullscreenBut = function() {
        n && screenfull.isEnabled && O.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? aa.call(window.document) : n.call(window.document.documentElement);
        sizeHandler()
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onExit = function() {
        K.show(TEXT_ARE_SURE)
    };
    this._onExitYes = function() {
        s_oGame.onExit()
    };
    s_oInterface = this;
    this._init(a, d, c);
    return this
}
var s_oInterface = null;

function CPayTablePanel() {
    var a, d, c, g, f, l, m, h, e;
    this._init = function() {
        a = 0;
        g = [];
        e = new createjs.Container;
        e.on("click", function() {});
        e.visible = !1;
        s_oAttachSection.addChild(e);
        var p = new createjs.Container;
        e.addChild(p);
        var q = createBitmap(s_oSpriteLibrary.getSprite("paytable1"));
        p.addChild(q);
        this._createPayouts(p);
        g[0] = p;
        p = new createjs.Container;
        p.visible = !1;
        e.addChild(p);
        q = createBitmap(s_oSpriteLibrary.getSprite("paytable2"));
        p.addChild(q);
        g[1] = p;
        f = g[a];
        p = new createjs.Container;
        p.visible = !1;
        e.addChild(p);
        q = createBitmap(s_oSpriteLibrary.getSprite("paytable3"));
        p.addChild(q);
        q = new CTLText(p, 543, 169, 280, 80, 21, "center", "#fce0ab", FONT_GAME_1, 1, 0, 0, TEXT_HELP_BONUS1, !0, !0, !0, !1);
        new CTLText(p, 543, 274, 280, 140, 32, "center", "#fce0ab", FONT_GAME_1, 1, 0, 0, TEXT_HELP_BONUS2, !0, !0, !0, !1);
        g[2] = p;
        p = new createjs.Container;
        p.visible = !1;
        e.addChild(p);
        q = createBitmap(s_oSpriteLibrary.getSprite("paytable4"));
        p.addChild(q);
        for (var J = 185, r = 0; 3 > r; r++) q = new createjs.Text(r + 3 + "X  " + NUM_FREESPIN[r], "17px " + FONT_GAME_1, "#fce0ab"),
            q.textAlign = "left", q.x = CANVAS_WIDTH / 2 + 21, q.y = J, q.textBaseline = "alphabetic", p.addChild(q), J += 28;
        q = new CTLText(p, CANVAS_WIDTH / 2 - 155, 284, 312, 125, 31, "center", "#fce0ab", FONT_GAME_1, 1, 0, 0, TEXT_HELP_FREESPIN, !0, !0, !0, !1);
        g[3] = p;
        f = g[a];
        h = new CGfxButton(217, CANVAS_HEIGHT - 119, s_oSpriteLibrary.getSprite("but_arrow_prev"), e);
        h.addEventListener(ON_MOUSE_UP, this._onPrev, this);
        m = new CGfxButton(CANVAS_WIDTH - 221, CANVAS_HEIGHT - 124, s_oSpriteLibrary.getSprite("but_arrow_next"), e);
        m.addEventListener(ON_MOUSE_UP, this._onNext,
            this);
        p = s_oSpriteLibrary.getSprite("but_exit_info");
        l = new CGfxButton(840, 122, p, e);
        l.addEventListener(ON_MOUSE_UP, this._onExit, this)
    };
    this.unload = function() {};
    this._createPayouts = function(p) {
        d = [];
        c = [];
        for (var q = [{
                x: 673,
                y: 300
            }, {
                x: 519,
                y: 300
            }, {
                x: 365,
                y: 300
            }, {
                x: 750,
                y: 223
            }, {
                x: 593,
                y: 223
            }, {
                x: 439,
                y: 223
            }, {
                x: 285,
                y: 223
            }, {
                x: 131,
                y: 223
            }], J = 0, r = 0; r < PAYTABLE_VALUES.length; r++) {
            var I = PAYTABLE_VALUES[r];
            do {
                var E = I.indexOf(0); - 1 !== E && I.splice(E, 1)
            } while (-1 !== E);
            E = I.length;
            if (0 !== E) {
                var G = 17;
                4 === E && (G = 13);
                var A = q[J].y;
                d[r] = [];
                c[r] = [];
                for (var F = 0; F < E; F++) {
                    var k = new CTLText(p, q[J].x, A, 30, 15, 15, "left", "#fff", FONT_GAME_1, 1, 0, 0, "X" + (5 - F), !0, !0, !1, !1);
                    d[r][F] = k;
                    k = new CTLText(p, q[J].x + 35, A, 50, 15, 15, "center", "#fce0ab", FONT_GAME_1, 1, 0, 0, I[E - F - 1], !0, !0, !1, !1);
                    c[r][F] = k;
                    A += G
                }
                J++
            }
        }
    };
    this._onNext = function() {
        a === g.length - 1 ? a = 0 : a++;
        f.visible = !1;
        g[a].visible = !0;
        f = g[a]
    };
    this._onPrev = function() {
        0 === a ? a = g.length - 1 : a--;
        f.visible = !1;
        g[a].visible = !0;
        f = g[a]
    };
    this.show = function() {
        a = 0;
        f.visible = !1;
        g[a].visible = !0;
        f = g[a];
        e.visible = !0
    };
    this.hide = function() {
        e.visible = !1
    };
    this.resetHighlightCombo = function() {};
    this.highlightCombo = function(p, q) {
        c[p - 1][NUM_REELS - q].color = "#ff9000";
        this.tweenAlpha(c[p - 1][NUM_REELS - q], 0)
    };
    this.tweenAlpha = function(p, q) {
        var J = this;
        createjs.Tween.get(p).to({
            alpha: q
        }, 200).call(function() {
            1 === q ? J.tweenAlpha(p, 0) : J.tweenAlpha(p, 1)
        })
    };
    this._onExit = function() {
        s_oGame.hidePayTable()
    };
    this.isVisible = function() {
        return e.visible
    };
    this._init()
}

function CTweenController() {
    this.tweenValue = function(a, d, c) {
        return a + c * (d - a)
    };
    this.easeLinear = function(a, d, c, g) {
        return c * a / g + d
    };
    this.easeInCubic = function(a, d, c, g) {
        g = (a /= g) * a * a;
        return d + c * g
    };
    this.easeBackInQuart = function(a, d, c, g) {
        g = (a /= g) * a;
        return d + c * (2 * g * g + 2 * g * a + -3 * g)
    };
    this.easeInBack = function(a, d, c, g) {
        return c * (a /= g) * a * (2.70158 * a - 1.70158) + d
    };
    this.easeOutBack = function(a, d, c, g, f) {
        void 0 == f && (f = 1.70158);
        return c * ((a = a / g - 1) * a * ((f + 1) * a + f) + 1) + d
    };
    this.easeOutCubic = function(a, d, c, g) {
        return c * ((a = a / g - 1) *
            a * a + 1) + d
    };
    this.getTrajectoryPoint = function(a, d) {
        var c = new createjs.Point,
            g = (1 - a) * (1 - a),
            f = a * a;
        c.x = g * d.start.x + 2 * (1 - a) * a * d.traj.x + f * d.end.x;
        c.y = g * d.start.y + 2 * (1 - a) * a * d.traj.y + f * d.end.y;
        return c
    }
}

function CMsgBox() {
    var a, d, c, g, f, l, m;
    this._init = function() {
        m = new createjs.Container;
        m.visible = !1;
        s_oStage.addChild(m);
        d = new createjs.Shape;
        d.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        a = d.on("click", function() {});
        m.addChild(d);
        var h = s_oSpriteLibrary.getSprite("msg_box");
        c = createBitmap(h);
        c.regX = h.width / 2;
        c.regY = h.height / 2;
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2;
        m.addChild(c);
        f = new CTLText(m, CANVAS_WIDTH / 2 - 179, CANVAS_HEIGHT / 2 - 48, 360, 90, 30, "center", "#000", FONT_GAME_1,
            1, 0, 0, " ", !0, !0, !0, !1);
        g = new CTLText(m, CANVAS_WIDTH / 2 - 180, CANVAS_HEIGHT / 2 - 48, 360, 90, 30, "center", "#fff", FONT_GAME_1, 1, 0, 0, " ", !0, !0, !0, !1);
        l = new CGfxButton(CANVAS_WIDTH / 2 + 160, CANVAS_HEIGHT / 2 - 70, s_oSpriteLibrary.getSprite("but_exit_info"), m);
        l.addEventListener(ON_MOUSE_UP, this._onExit, this)
    };
    this.unload = function() {
        d.off("click", a);
        l.unload()
    };
    this.show = function(h) {
        f.refreshText(h);
        g.refreshText(h);
        m.visible = !0
    };
    this.hide = function() {
        m.visible = !1
    };
    this._onExit = function() {
        this.hide()
    };
    this._init();
    return this
}

function CBonusPanel() {
    var a, d, c, g = !1,
        f, l, m, h, e, p, q, J, r, I, E, G, A, F, k, D, C, v, t = null,
        H, w = null,
        M, P, N, R, O;
    this._init = function() {
        c = !1;
        g = !0;
        q = [CANVAS_WIDTH / 2 - 210, CANVAS_WIDTH / 2, CANVAS_WIDTH / 2 + 210];
        O.removeAllChildren();
        O.visible = !1;
        var x = s_oSpriteLibrary.getSprite("bg_bonus");
        A = createBitmap(x);
        O.addChild(A);
        H = new CBonusCharacter(180, CANVAS_HEIGHT - 40, O);
        w = new createjs.Container;
        O.addChild(w);
        x = s_oSpriteLibrary.getSprite("amount_bonus_win");
        a = CANVAS_WIDTH / 2 - x.width / 2;
        d = 7;
        N = new createjs.Container;
        N.x = a;
        N.y =
            d;
        O.addChild(N);
        var X = createBitmap(x);
        N.addChild(X);
        P = new createjs.Text(formatEntries(0), "32px " + FONT_GAME_1, "#fce0ab");
        P.textAlign = "center";
        P.x = x.width / 2;
        P.y = 7;
        P.shadow = new createjs.Shadow("#000", 1, 1, 1);
        N.addChild(P);
        M = new CTLText(O, CANVAS_WIDTH / 2 - 200, 112, 400, 70, 35, "center", "#fce0ab", FONT_GAME_1, 1, 0, 0, TEXT_BONUS_HELP, !0, !0, !0, !1);
        M.setShadow("#000", 1, 1, 1);
        R = new createjs.Shape;
        R.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        G = R.on("click", function() {});
        O.addChild(R);
        this.refreshButtonPos();
        this._startBonus()
    };
    this._loadAllResources = function() {
        O = new createjs.Container;
        s_oAttachSection.addChild(O);
        var x = s_oSpriteLibrary.getSprite("bg_loading_bonus");
        F = createBitmap(x);
        O.addChild(F);
        x = s_oSpriteLibrary.getSprite("progress_bar");
        C = createBitmap(x);
        C.x = CANVAS_WIDTH / 2 - x.width / 2;
        C.y = CANVAS_HEIGHT - 91;
        O.addChild(C);
        m = x.width;
        h = x.height;
        E = new createjs.Shape;
        E.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(C.x, C.y, 1, h);
        O.addChild(E);
        C.mask = E;
        D = new createjs.Text("",
            "21px " + FONT_GAME_2, "#fff");
        D.x = CANVAS_WIDTH / 2;
        D.y = CANVAS_HEIGHT - 59;
        D.shadow = new createjs.Shadow("#000", 2, 2, 2);
        D.textBaseline = "alphabetic";
        D.textAlign = "center";
        O.addChild(D);
        s_oSpriteLibrary.init(this._onResourceBonusLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_bonus", "./sprites/bonus/bg_bonus.jpg");
        s_oSpriteLibrary.addSprite("shadow_fruit", "./sprites/bonus/shadow_fruit.png");
        s_oSpriteLibrary.addSprite("avatar_strafe_in", "./sprites/bonus/avatar_strafe_in.png");
        s_oSpriteLibrary.addSprite("avatar_strafe_out",
            "./sprites/bonus/avatar_strafe_out.png");
        e = 0;
        p = s_oSpriteLibrary.getNumSprites();
        0 === p ? this._startBonus() : s_oSpriteLibrary.loadSprites()
    };
    this._onResourceBonusLoaded = function() {
        e++;
        var x = Math.floor(e / p * 100);
        D.text = x + "%";
        E.graphics.clear();
        x = Math.floor(x * m / 100);
        E.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(C.x, C.y, x, h);
        e === p && this._init()
    };
    this.refreshButtonPos = function() {
        void 0 !== N && (N.y = d + s_iOffsetY)
    };
    this.unload = function() {
        R.off("click", G);
        for (var x = 0; x < r.length; x++) r[x].unload(), O.removeChild(I[x])
    };
    this._onAllImagesLoaded = function() {};
    this.reset = function() {
        v.unload();
        null !== t && (t.unload(), t = null);
        P.text = formatEntries(0);
        H.reset()
    };
    this.show = function(x, X) {
        J = x;
        g ? this._startBonus() : this._loadAllResources()
    };
    this.hide = function() {
        c = !1;
        A.off("click", function() {});
        O.visible = !1;
        this.reset();
        s_oGame.exitFromBonus(l)
    };
    this._startBonus = function() {
        l = 0;
        this._initFruitButtons();
        M.setAlpha(0);
        createjs.Tween.get(M.getText()).to({
            alpha: 1
        }, 800);
        A.on("click", function() {});
        c = O.visible = !0
    };
    this.endBonus = function() {
        v =
            new CBonusResultPanel(l, O);
        playSound("bonus_end", 1, !1)
    };
    this._initFruitButtons = function() {
        k = null;
        if (0 === J.length) this.endBonus();
        else {
            r = [];
            I = [];
            f = J.shift();
            l += f;
            for (var x = s_oSpriteLibrary.getSprite("shadow_fruit"), X = shuffle([0, 1, 2, 3, 4, 5, 6]), Y = 0; 3 > Y; Y++) {
                var U = X.pop();
                U = new CBonusBut(Y, q[Y], -70, U, w);
                U.pulseAnimation();
                U.addEventListener(ON_MOUSE_UP, this._onButtonRelease, this);
                r.push(U);
                U = createBitmap(x);
                U.regX = x.width / 2;
                U.regY = x.height / 2;
                U.x = q[Y];
                U.y = 469;
                U.alpha = .6;
                O.addChild(U);
                createjs.Tween.get(U, {
                    loop: !0
                }).to({
                    alpha: 1
                }, 850, createjs.Ease.quadOut).to({
                    alpha: .7
                }, 650, createjs.Ease.quadIn);
                I.push(U)
            }
            this._showAllButtons()
        }
    };
    this._showAllButtons = function() {
        R.visible = !1;
        for (var x = 500, X = 0; X < r.length; X++) r[X].tweenDown(243, x), x += 200;
        M.setAlpha(0);
        createjs.Tween.get(M.getText()).to({
            alpha: 1
        }, 800)
    };
    this._disableAllButtons = function() {
        R.visible = !0;
        for (var x = 0; x < r.length; x++) r[x].stopPulse(), createjs.Tween.removeTweens(I[x])
    };
    this.cutTheFruit = function() {
        k.playCutAnim();
        0 < f ? new CScoreText(formatEntries(f),
            k.getX(), k.getY(), O) : new CScoreText(TEXT_NO_WIN, k.getX(), k.getY(), O);
        playSound("bonus_mult", 1, !1);
        this.refreshScoreAmount(l);
        for (var x = 0; x < r.length; x++) k !== r[x] && r[x].tweenUp(-70, 350), createjs.Tween.get(I[x]).to({
            alpha: 0
        }, 500, createjs.Ease.backIn)
    };
    this.checkNextTurn = function() {
        this._initFruitButtons()
    };
    this._onButtonRelease = function(x) {
        createjs.Tween.get(M.getText()).to({
            alpha: 0
        }, 800);
        s_oBonusPanel._disableAllButtons();
        k = r[x];
        H.getCurX() === q[x] + 100 ? H.cutFruit() : H.startMoving(q[x] + 100)
    };
    this.refreshScoreAmount =
        function(x) {
            P.text = formatEntries(x)
        };
    this.update = function() {
        c && null !== k && k.update()
    };
    s_oBonusPanel = this
}
var s_oBonusPanel = null;

function CBonusCharacter(a, d, c) {
    var g, f, l, m, h, e, p;
    this._init = function(q, J) {
        g = l = q;
        f = J;
        p = new createjs.Container;
        p.x = q;
        p.y = J;
        p.scaleX = p.scaleY = .9;
        c.addChild(p);
        var r = {
            images: [s_oSpriteLibrary.getSprite("avatar_idle")],
            framerate: 15,
            frames: [
                [1, 1, 280, 228, 0, 131, 228],
                [283, 1, 282, 228, 0, 132, 228],
                [567, 1, 283, 228, 0, 133, 228],
                [852, 1, 283, 228, 0, 133, 228],
                [1137, 1, 281, 227, 0, 131, 228],
                [1420, 1, 277, 228, 0, 128, 228],
                [1699, 1, 275, 228, 0, 125, 228],
                [1, 231, 272, 228, 0, 122, 228],
                [275, 231, 268, 228, 0, 117, 228],
                [545, 231, 259, 228, 0, 108, 228],
                [806, 231, 251, 228, 0, 101, 228],
                [1059, 231, 250, 225, 0, 100, 226],
                [1311, 231, 250, 225, 0, 100, 226],
                [1563, 231, 251, 227, 0, 101, 228],
                [1, 461, 250, 225, 0, 100, 226],
                [253, 461, 253, 228, 0, 101, 228],
                [508, 461, 250, 225, 0, 100, 226],
                [760, 461, 261, 226, 0, 104, 226],
                [1023, 461, 250, 226, 0, 100, 226],
                [1275, 461, 252, 227, 0, 101, 228],
                [1529, 461, 251, 225, 0, 100, 226],
                [1782, 461, 252, 228, 0, 101, 228],
                [1, 691, 251, 228, 0, 101, 228],
                [254, 691, 250, 225, 0, 100, 226],
                [506, 691, 250, 226, 0, 100, 226],
                [758, 691, 251, 227, 0, 101, 228],
                [1011, 691, 253, 226, 0, 103, 226],
                [1266, 691, 269, 226, 0, 119,
                    226
                ],
                [1537, 691, 278, 226, 0, 128, 226]
            ],
            animations: {
                anim: {
                    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
                }
            }
        };
        r = new createjs.SpriteSheet(r);
        m = new createjs.Sprite(r, "anim");
        p.addChild(m);
        r = {
            images: [s_oSpriteLibrary.getSprite("avatar_strafe_in")],
            framerate: 30,
            frames: [
                [1, 1, 319, 204, 0, 159, 209],
                [322, 1, 324, 208, 0, 160, 211],
                [648, 1, 326, 210, 0, 162, 213],
                [976, 1, 324, 210, 0, 160, 212],
                [1302, 1, 330, 210, 0, 165, 213],
                [1634, 1, 310, 208, 0, 145, 211],
                [1, 213, 293, 211, 0, 128, 214],
                [296, 213, 285, 215, 0, 121,
                    218
                ],
                [583, 213, 280, 219, 0, 115, 223],
                [865, 213, 273, 223, 0, 108, 228],
                [1140, 213, 264, 226, 0, 100, 230],
                [1406, 213, 295, 231, 0, 131, 232],
                [1703, 213, 285, 231, 0, 121, 232],
                [1, 446, 283, 228, 0, 118, 231],
                [286, 446, 322, 229, 0, 158, 230],
                [610, 446, 330, 245, 0, 165, 246],
                [942, 446, 330, 252, 0, 165, 252],
                [1274, 446, 330, 227, 0, 165, 231],
                [1606, 446, 329, 227, 0, 164, 231],
                [1, 700, 325, 228, 0, 160, 232],
                [328, 700, 325, 227, 0, 160, 231],
                [655, 700, 322, 228, 0, 157, 232],
                [979, 700, 265, 228, 0, 100, 232],
                [1246, 700, 265, 229, 0, 100, 232],
                [1513, 700, 287, 231, 0, 122, 232],
                [1, 933, 315, 252, 0,
                    150, 252
                ],
                [318, 933, 300, 231, 0, 135, 232],
                [620, 933, 270, 229, 0, 105, 231],
                [892, 933, 282, 230, 0, 117, 231],
                [1176, 933, 292, 231, 0, 128, 232],
                [1470, 933, 264, 227, 0, 100, 231],
                [1736, 933, 265, 223, 0, 100, 228],
                [1, 1187, 265, 217, 0, 100, 222],
                [268, 1187, 262, 212, 0, 100, 217],
                [532, 1187, 288, 210, 0, 129, 214],
                [822, 1187, 303, 213, 0, 146, 215],
                [1127, 1187, 300, 214, 0, 143, 216],
                [1429, 1187, 293, 215, 0, 136, 217],
                [1, 1406, 288, 217, 0, 133, 220],
                [291, 1406, 292, 220, 0, 137, 221],
                [585, 1406, 294, 221, 0, 141, 223],
                [881, 1406, 293, 226, 0, 141, 227],
                [1176, 1406, 285, 227, 0, 135, 228]
            ],
            animations: {
                start: 0,
                anim: [0, 5, "start_cut"],
                start_cut: [6, 15, "end_cut"],
                end_cut: [16, 42, "stop_cut"],
                stop_cut: 42
            }
        };
        r = new createjs.SpriteSheet(r);
        h = new createjs.Sprite(r, "start");
        h.visible = !1;
        p.addChild(h);
        h.on("animationend", this._onEndAnimStrafeIn, this);
        r = {
            images: [s_oSpriteLibrary.getSprite("avatar_strafe_out")],
            framerate: 30,
            frames: [
                [1, 1, 281, 227, 0, 131, 228],
                [284, 1, 293, 228, 0, 143, 228],
                [579, 1, 300, 225, 0, 150, 225],
                [881, 1, 302, 225, 0, 151, 225],
                [1185, 1, 303, 223, 0, 151, 223],
                [1490, 1, 303, 221, 0, 148, 221],
                [1, 231, 295, 217, 0, 140, 218],
                [298, 231,
                    290, 215, 0, 133, 216
                ],
                [590, 231, 287, 213, 0, 129, 214],
                [879, 231, 295, 211, 0, 135, 213],
                [1176, 231, 324, 209, 0, 159, 212],
                [1502, 231, 325, 211, 0, 161, 212],
                [1, 450, 326, 210, 0, 162, 212],
                [329, 450, 326, 208, 0, 162, 211],
                [657, 450, 324, 208, 0, 160, 211],
                [983, 450, 324, 207, 0, 161, 210],
                [1309, 450, 315, 204, 0, 157, 208]
            ],
            animations: {
                start: 0,
                anim: [1, 8, "move"],
                move: [9, 16, "stop_move"],
                stop_move: 16
            }
        };
        r = new createjs.SpriteSheet(r);
        e = new createjs.Sprite(r, "start");
        p.addChild(e);
        e.on("animationend", this._onEndAnimStrafeOut, this)
    };
    this.addEventListener =
        function(q, J, r) {};
    this.hide = function() {
        m.visible = !1;
        h.visible = !1;
        h.gotoAndStop("start");
        m.gotoAndStop("start")
    };
    this.reset = function() {
        l = g;
        p.x = g;
        p.y = f
    };
    this.idle = function() {
        m.visible = !0;
        h.visible = !1;
        h.gotoAndStop("start");
        m.gotoAndPlay("anim")
    };
    this.startMoving = function(q) {
        l = q;
        m.gotoAndStop("start");
        m.visible = !1;
        e.visible = !0;
        e.gotoAndPlay("anim")
    };
    this.cutFruit = function() {
        playSound("avatar_cut", 1, !1);
        m.gotoAndStop("start");
        m.visible = !1;
        h.visible = !0;
        h.gotoAndPlay("start_cut")
    };
    this._onEndAnimStrafeIn =
        function(q) {
            "start_cut" === q.name ? s_oBonusPanel.cutTheFruit() : "stop_cut" === q.name && (h.visible = !1, m.visible = !0, m.gotoAndPlay("anim"))
        };
    this._onEndAnimStrafeOut = function(q) {
        "anim" === q.name && (playSound("swoosh", 1, !1), createjs.Tween.get(p).to({
            x: p.x + 70
        }, 400, createjs.Ease.linear).call(function() {
            e.visible = !1;
            p.x = l;
            h.visible = !0;
            h.gotoAndPlay("anim");
            playSound("avatar_cut", 1, !1)
        }))
    };
    this.getCurX = function() {
        return l
    };
    this._init(a, d)
}

function CBonusBut(a, d, c, g, f) {
    var l, m, h, e, p, q, J, r, I, E, G, A, F, k, D, C, v, t, H, w, M, P;
    this._init = function(R, O, x) {
        l = !1;
        k = [];
        D = [];
        t = new createjs.Container;
        t.x = R;
        t.y = O;
        t.cursor = "pointer";
        f.addChild(t);
        O = {
            images: [s_oSpriteLibrary.getSprite("symbol_" + x)],
            frames: {
                width: SYMBOL_WIDTH,
                height: SYMBOL_HEIGHT,
                regX: SYMBOL_WIDTH / 2,
                regY: SYMBOL_HEIGHT / 2
            },
            animations: {
                "static": 0,
                slice_left: 1,
                slice_right: 2,
                moving: 3
            }
        };
        R = new createjs.SpriteSheet(O);
        P = createSprite(R, "static", SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2, SYMBOL_WIDTH, SYMBOL_HEIGHT);
        t.addChild(P);
        w = createSprite(R, "slice_left", SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2, SYMBOL_WIDTH, SYMBOL_HEIGHT);
        w.visible = !1;
        t.addChild(w);
        O = {
            images: [s_oSpriteLibrary.getSprite("particle_effect_" + s_aSymbolSplashId[x])],
            frames: {
                width: 249,
                height: 204,
                regX: 124,
                regY: 102
            },
            animations: {
                "static": 0,
                anim: [0, 20, "hide"],
                hide: 21
            }
        };
        x = new createjs.SpriteSheet(O);
        H = createSprite(x, "static", 124, 102, 249, 204);
        H.visible = !1;
        t.addChild(H);
        M = createSprite(R, "slice_right", SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2, SYMBOL_WIDTH, SYMBOL_HEIGHT);
        M.visible = !1;
        t.addChild(M);
        m = !1;
        G = e = h = 0;
        E = randomFloatBetween(-2, 2, 2);
        J = randomFloatBetween(0, .5, 2);
        p = SYMBOL_FALL_SPEED;
        q = p / 2;
        this._initListener()
    };
    this.unload = function() {
        t.off("mousedown", C);
        t.off("pressup", v);
        f.removeChild(t)
    };
    this.setVisible = function(R) {
        t.visible = R
    };
    this.setClickable = function(R) {
        l = !R
    };
    this._initListener = function() {
        C = t.on("mousedown", this.buttonDown);
        v = t.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(R, O, x) {
        k[R] = O;
        D[R] = x
    };
    this.buttonRelease = function() {
        l || k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(D[ON_MOUSE_UP],
            a)
    };
    this.buttonDown = function() {
        l || k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(D[ON_MOUSE_DOWN])
    };
    this.playCutAnim = function() {
        P.visible = !1;
        w.visible = !0;
        M.visible = !0;
        h = G - 2 * q;
        e = G + 2 * q;
        r = J - .2;
        I = J + .2;
        A = 1.2 * -E;
        F = 1.2 * E;
        H.visible = !0;
        H.gotoAndPlay("anim");
        playSound(3 > a ? "symbol_0_1_2" : 6 > a ? "symbol_3_4_5" : "symbol_6", 1, !1);
        m = !0
    };
    this.stopPulse = function() {
        createjs.Tween.removeTweens(t)
    };
    this.tweenDown = function(R, O) {
        createjs.Tween.get(t).to({
            y: R
        }, O, createjs.Ease.backOut)
    };
    this.tweenUp = function(R, O) {
        createjs.Tween.get(t).to({
                y: R
            },
            O, createjs.Ease.backIn).call(function() {
            N.unload()
        })
    };
    this.pulseAnimation = function() {
        createjs.Tween.get(t, {
            loop: !0
        }).to({
            scaleX: 1.1,
            scaleY: 1.1
        }, 850, createjs.Ease.quadOut).to({
            scaleX: 1,
            scaleY: 1
        }, 650, createjs.Ease.quadIn)
    };
    this.trembleAnimation = function() {
        createjs.Tween.get(t).to({
            rotation: 5
        }, 75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function() {
            N.trebleAnimation()
        })
    };
    this.getX = function() {
        return t.x
    };
    this.getY = function() {
        return t.y
    };
    this.update = function() {
        if (m) {
            G += q;
            h += q;
            w.y = w.y - p + h * h / 1E3;
            w.x += .1 * G * r;
            w.rotation += A;
            e += q;
            M.y = M.y - p + e * e / 1E3;
            M.x += .1 * G * I;
            M.rotation += F;
            var R = 0;
            w.y > CANVAS_HEIGHT && R++;
            M.y > CANVAS_HEIGHT && R++;
            2 === R && (this.unload(), s_oBonusPanel.checkNextTurn())
        }
    };
    var N = this;
    this._init(d, c, g)
}

function CBonusResultPanel(a, d) {
    var c;
    this._init = function(f) {
        c = new createjs.Container;
        c.alpha = 0;
        g.addChild(c);
        var l = s_oSpriteLibrary.getSprite("msg_box"),
            m = createBitmap(l);
        m.regX = l.width / 2;
        m.regY = l.height / 2;
        m.x = CANVAS_WIDTH / 2;
        m.y = CANVAS_HEIGHT / 2;
        c.addChild(m);
        l = TEXT_NO_WIN;
        m = " ";
        var h = CANVAS_HEIGHT / 2 - 16;
        0 < f && (l = TEXT_CONGRATS, m = TEXT_YOU_WIN + "\n" + formatEntries(f), h = CANVAS_HEIGHT / 2 - 60);
        (new CTLText(c, CANVAS_WIDTH / 2 - 180, h, 360, 32, 32, "center", "#fce0ab", FONT_GAME_1, 1, 0, 0, l, !0, !0, !0, !1)).setShadow("#000",
            1, 1, 1);
        (new CTLText(c, CANVAS_WIDTH / 2 - 180, CANVAS_HEIGHT / 2 + 4, 360, 70, 35, "center", "#fce0ab", FONT_GAME_1, 1, 0, 0, m, !0, !0, !0, !1)).setShadow("#000", 1, 1, 1);
        createjs.Tween.get(c).to({
            alpha: 1
        }, 1E3, createjs.Ease.cubicOut).call(function() {
            setTimeout(function() {
                s_oBonusPanel.hide()
            }, 3E3)
        })
    };
    this.unload = function() {
        g.removeChild(c)
    };
    var g = d;
    this._init(a)
}

function CScoreText(a, d, c, g) {
    var f;
    this._init = function(l, m, h) {
        f = new createjs.Text("00000", " 56px " + FONT_GAME_1, "#fce0ab");
        f.textAlign = "center";
        f.text = l;
        f.x = m;
        f.y = h;
        f.alpha = 0;
        f.shadow = new createjs.Shadow("#000", 1, 1, 1);
        g.addChild(f);
        var e = this;
        createjs.Tween.get(f).to({
            alpha: 1
        }, 200, createjs.Ease.quadIn).call(function() {
            e.moveUp()
        })
    };
    this.moveUp = function() {
        var l = f.y - 280,
            m = this;
        createjs.Tween.get(f).to({
            y: l
        }, 1500, createjs.Ease.sineIn).call(function() {
            m.unload()
        });
        createjs.Tween.get(f).wait(800).to({
                alpha: 0
            },
            500)
    };
    this.unload = function() {
        g.removeChild(f)
    };
    this._init(a, d, c)
}

function CFreespinPanel(a) {
    var d, c, g, f, l;
    this._init = function() {
        l = new createjs.Container;
        d = l.on("click", function() {});
        l.visible = !1;
        m.addChild(l);
        c = new createjs.Shape;
        c.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        l.addChild(c);
        f = new createjs.Container;
        l.addChild(f);
        var h = s_oSpriteLibrary.getSprite("msg_box"),
            e = createBitmap(h);
        e.regX = h.width / 2;
        e.regY = h.height / 2;
        e.x = CANVAS_WIDTH / 2;
        f.addChild(e);
        new CTLText(f, CANVAS_WIDTH / 2 - 140, -56, 280, 34, 34, "center", "#fce0ab", FONT_GAME_1, 1, 0,
            0, TEXT_CONGRATS, !0, !0, !1, !1);
        g = new CTLText(f, CANVAS_WIDTH / 2 - 140, 18, 280, 38, 38, "center", "#fce0ab", FONT_GAME_1, 1, 0, 0, TEXT_CONGRATS, !0, !0, !1, !1)
    };
    this.unload = function() {
        l.off("click", d)
    };
    this.show = function(h) {
        g.refreshText(TEXT_YOU_WIN + " " + h + " " + TEXT_FREESPINS);
        l.alpha = 1;
        l.visible = !0;
        var e = this;
        f.y = -CANVAS_HEIGHT / 2;
        c.alpha = 0;
        createjs.Tween.get(f).to({
            y: CANVAS_HEIGHT / 2
        }, 800, createjs.Ease.cubicOut);
        createjs.Tween.get(c).to({
            alpha: .7
        }, 800, createjs.Ease.cubicOut).call(function() {
            setTimeout(function() {
                    e.hide()
                },
                3E3)
        });
        playSound("bonus_end", 1, !1)
    };
    this.hide = function() {
        createjs.Tween.get(l).to({
            alpha: 0
        }, 800, createjs.Ease.cubicOut).call(function() {
            l.visible = !1
        });
        s_oGame.exitFromFreespinPanel()
    };
    var m = a;
    this._init()
}

function CAvatar(a) {
    var d, c, g, f, l;
    this._init = function() {
        d = 150;
        c = CANVAS_HEIGHT - 40;
        l = new createjs.Container;
        l.x = d;
        l.y = c;
        m.addChild(l);
        var h = {
            images: [s_oSpriteLibrary.getSprite("avatar_idle")],
            framerate: 15,
            frames: [
                [1, 1, 280, 228, 0, 131, 228],
                [283, 1, 282, 228, 0, 132, 228],
                [567, 1, 283, 228, 0, 133, 228],
                [852, 1, 283, 228, 0, 133, 228],
                [1137, 1, 281, 227, 0, 131, 228],
                [1420, 1, 277, 228, 0, 128, 228],
                [1699, 1, 275, 228, 0, 125, 228],
                [1, 231, 272, 228, 0, 122, 228],
                [275, 231, 268, 228, 0, 117, 228],
                [545, 231, 259, 228, 0, 108, 228],
                [806, 231, 251, 228, 0, 101, 228],
                [1059, 231, 250, 225, 0, 100, 226],
                [1311, 231, 250, 225, 0, 100, 226],
                [1563, 231, 251, 227, 0, 101, 228],
                [1, 461, 250, 225, 0, 100, 226],
                [253, 461, 253, 228, 0, 101, 228],
                [508, 461, 250, 225, 0, 100, 226],
                [760, 461, 261, 226, 0, 104, 226],
                [1023, 461, 250, 226, 0, 100, 226],
                [1275, 461, 252, 227, 0, 101, 228],
                [1529, 461, 251, 225, 0, 100, 226],
                [1782, 461, 252, 228, 0, 101, 228],
                [1, 691, 251, 228, 0, 101, 228],
                [254, 691, 250, 225, 0, 100, 226],
                [506, 691, 250, 226, 0, 100, 226],
                [758, 691, 251, 227, 0, 101, 228],
                [1011, 691, 253, 226, 0, 103, 226],
                [1266, 691, 269, 226, 0, 119, 226],
                [1537, 691, 278, 226, 0,
                    128, 226
                ]
            ],
            animations: {
                anim: {
                    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
                }
            }
        };
        h = new createjs.SpriteSheet(h);
        g = new createjs.Sprite(h, "anim");
        l.addChild(g);
        h = {
            images: [s_oSpriteLibrary.getSprite("avatar_win")],
            frames: [
                [1, 1, 280, 228, 0, 131, 228],
                [283, 1, 293, 227, 0, 142, 227],
                [578, 1, 301, 225, 0, 150, 225],
                [881, 1, 301, 224, 0, 150, 224],
                [1184, 1, 302, 222, 0, 150, 222],
                [1488, 1, 302, 220, 0, 148, 220],
                [1, 231, 294, 217, 0, 139, 218],
                [297, 231, 289, 215, 0, 132, 216],
                [588, 231, 286, 210, 0, 128, 212],
                [876, 231,
                    287, 210, 0, 127, 212
                ],
                [1165, 231, 286, 211, 0, 124, 214],
                [1453, 231, 285, 214, 0, 120, 217],
                [1, 450, 279, 218, 0, 114, 221],
                [282, 450, 272, 222, 0, 107, 226],
                [556, 450, 264, 225, 0, 99, 229],
                [822, 450, 294, 230, 0, 129, 230],
                [1118, 450, 285, 230, 0, 120, 230],
                [1405, 450, 267, 229, 0, 102, 230],
                [1674, 450, 292, 230, 0, 127, 230],
                [1, 682, 326, 230, 0, 161, 230],
                [329, 682, 330, 252, 0, 165, 252],
                [661, 682, 330, 235, 0, 165, 235],
                [993, 682, 330, 228, 0, 165, 231],
                [1325, 682, 329, 227, 0, 164, 230],
                [1656, 682, 323, 228, 0, 158, 231],
                [1, 936, 323, 227, 0, 158, 230],
                [326, 936, 323, 227, 0, 158, 230],
                [651, 936,
                    264, 228, 0, 99, 231
                ],
                [917, 936, 263, 229, 0, 98, 231],
                [1182, 936, 286, 231, 0, 121, 231],
                [1470, 936, 314, 252, 0, 149, 252],
                [1, 1190, 299, 230, 0, 134, 230],
                [302, 1190, 270, 229, 0, 105, 230],
                [574, 1190, 280, 230, 0, 116, 230],
                [856, 1190, 291, 230, 0, 126, 230],
                [1149, 1190, 293, 231, 0, 129, 231],
                [1444, 1190, 264, 227, 0, 99, 230],
                [1710, 1190, 264, 221, 0, 99, 225],
                [1, 1423, 264, 217, 0, 99, 221],
                [267, 1423, 262, 212, 0, 99, 216],
                [531, 1423, 288, 210, 0, 128, 213],
                [821, 1423, 303, 212, 0, 145, 213],
                [1126, 1423, 301, 213, 0, 143, 214],
                [1429, 1423, 294, 215, 0, 135, 216],
                [1, 1642, 290, 217, 0, 133, 218],
                [293, 1642, 293, 220, 0, 138, 221],
                [588, 1642, 295, 222, 0, 141, 223],
                [885, 1642, 291, 224, 0, 140, 225],
                [1178, 1642, 285, 226, 0, 134, 227]
            ],
            animations: {
                start: 0,
                anim: [0, 38]
            }
        };
        h = new createjs.SpriteSheet(h);
        f = new createjs.Sprite(h, "start");
        f.on("animationend", this._onAnimationEnd, this);
        f.visible = !1;
        l.addChild(f);
        this.refreshButtonPos()
    };
    this._hideAllAnims = function() {
        g.visible = !1;
        f.visible = !1
    };
    this.refreshButtonPos = function() {
        l.x = d + s_iOffsetX;
        200 < l.x ? l.x = 200 : 180 > l.x && (l.x = 180)
    };
    this.show = function(h) {
        switch (h) {
            case 0:
                g.visible = !0;
                f.visible = !1;
                f.gotoAndStop("start");
                g.gotoAndPlay("anim");
                break;
            case 1:
                g.visible = !1, f.visible = !0, f.gotoAndPlay("anim")
        }
    };
    this._onAnimationEnd = function(h) {
        "anim" === h.currentTarget.currentAnimation && this.show(0)
    };
    var m = a;
    this._init()
}

function CAnimSymbol(a, d, c) {
    var g, f, l, m, h, e, p, q, J, r, I, E, G, A, F, k, D = null,
        C = null,
        v, t, H, w, M, P;
    this._init = function(N, R) {
        P = new createjs.Container;
        P.visible = !1;
        P.x = N;
        P.y = R;
        c.addChild(P);
        t = new createjs.Text("", "28px " + FONT_GAME_2, "#000");
        t.x = SYMBOL_WIDTH / 2;
        t.y = SYMBOL_HEIGHT / 2;
        t.textAlign = "center";
        t.textBaseline = "middle";
        t.outline = 3;
        P.addChild(t);
        v = new createjs.Text("X0", "28px " + FONT_GAME_2, "#fce0ab");
        v.x = SYMBOL_WIDTH / 2;
        v.y = SYMBOL_HEIGHT / 2;
        v.textAlign = "center";
        v.textBaseline = "middle";
        P.addChild(v);
        H = new createjs.Container;
        P.addChild(H);
        M = new createjs.Container;
        P.addChild(M);
        w = new createjs.Container;
        P.addChild(w);
        A = [];
        F = [];
        for (var O = 0; O < NUM_SYMBOLS; O++) {
            var x = createSprite(s_aSymbolData[O], "slice_left", SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2, SYMBOL_WIDTH, SYMBOL_HEIGHT);
            x.x = SYMBOL_WIDTH / 2;
            x.y = SYMBOL_HEIGHT / 2;
            H.addChild(x);
            A[O] = x;
            A[O].visible = !1;
            x = createSprite(s_aSymbolData[O], "slice_right", SYMBOL_WIDTH / 2, SYMBOL_HEIGHT / 2, SYMBOL_WIDTH, SYMBOL_HEIGHT);
            x.x = SYMBOL_WIDTH / 2;
            x.y = SYMBOL_HEIGHT / 2;
            w.addChild(x);
            F[O] = x;
            F[O].visible = !1
        }
        k = [];
        for (O = 0; 3 > O; O++) x = {
            images: [s_oSpriteLibrary.getSprite("particle_effect_" + O)],
            frames: {
                width: 249,
                height: 204,
                regX: 124,
                regY: 102
            },
            animations: {
                "static": 0,
                anim: [0, 20, "hide"],
                hide: 21
            }
        }, x = new createjs.SpriteSheet(x), x = createSprite(x, "static", 124, 102, 249, 204), x.x = SYMBOL_WIDTH / 2, x.y = SYMBOL_HEIGHT / 2, x.visible = !1, M.addChild(x), k.push(x);
        x = {
            images: [s_oSpriteLibrary.getSprite("particle_effect_3")],
            frames: {
                width: 139,
                height: 143,
                regX: 69,
                regY: 71
            },
            animations: {
                "static": 0,
                anim: [0, 14, "hide"],
                hide: 15
            }
        };
        x = new createjs.SpriteSheet(x);
        x = createSprite(x, "static", 139, 71, 69, 143);
        x.x = SYMBOL_WIDTH / 2;
        x.y = SYMBOL_HEIGHT / 2;
        x.visible = !1;
        M.addChild(x);
        k.push(x);
        this.reset()
    };
    this.reset = function() {
        f = g = !1;
        I = m = l = 0;
        r = randomFloatBetween(-2, 2, 2);
        p = randomFloatBetween(0, .5, 2);
        h = SYMBOL_FALL_SPEED;
        e = h / 2
    };
    this.hide = function() {
        v.text = "";
        t.text = "";
        null !== D && (D.x = SYMBOL_WIDTH / 2, D.y = SYMBOL_HEIGHT / 2, D.rotation = 0, D.visible = !1);
        null !== C && (C.x = SYMBOL_WIDTH / 2, C.y = SYMBOL_HEIGHT / 2, C.rotation = 0, C.visible = !1);
        D = C = null;
        P.visible = !1
    };
    this.playAnim = function(N, R, O) {
        O &&
            0 < R && (t.scaleX = t.scaleY = .1, v.scaleX = v.scaleY = .1, v.text = formatEntries(R), t.text = v.text, createjs.Tween.get(v).to({
                scaleX: 1,
                scaleY: 1
            }, 500, createjs.Ease.bounceOut), createjs.Tween.get(t).to({
                scaleX: 1,
                scaleY: 1
            }, 500, createjs.Ease.bounceOut));
        A[N].visible = !0;
        F[N].visible = !0;
        P.visible = !0;
        D = A[N];
        C = F[N];
        l = I - 2 * e;
        m = I + 2 * e;
        q = p - .2;
        J = p + .2;
        E = 1.2 * -r;
        G = 1.2 * r;
        f = O;
        k[s_aSymbolSplashId[N]].visible = !0;
        k[s_aSymbolSplashId[N]].gotoAndPlay("anim");
        playSound(3 > N ? "symbol_0_1_2" : 6 > N ? "symbol_3_4_5" : "symbol_6", 1, !1);
        g = !0
    };
    this.update =
        function() {
            if (g && null !== D && null !== C) {
                I += e;
                l += e;
                D.y = D.y - h + l * l / 1E3;
                D.x += .1 * I * q;
                D.rotation += E;
                m += e;
                C.y = C.y - h + m * m / 1E3;
                C.x += .1 * I * J;
                C.rotation += G;
                var N = 0;
                D.y > CANVAS_HEIGHT && N++;
                C.y > CANVAS_HEIGHT && N++;
                2 === N && (f && s_oGame.fadeInSymbolInWin(), this.reset())
            }
        };
    this._init(a, d)
}

function CResultFreespin(a) {
    var d, c, g, f, l, m, h;
    this._init = function() {
        h = new createjs.Container;
        h.visible = !1;
        e.addChild(h);
        d = new createjs.Shape;
        d.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        l = d.on("click", function() {});
        h.addChild(d);
        f = new createjs.Container;
        h.addChild(f);
        var p = s_oSpriteLibrary.getSprite("msg_box"),
            q = createBitmap(p);
        q.regX = p.width / 2;
        q.regY = p.height / 2;
        q.x = CANVAS_WIDTH / 2;
        f.addChild(q);
        c = new CTLText(f, CANVAS_WIDTH / 2 - 140, -52, 280, 34, 34, "center", "#fce0ab", FONT_GAME_1,
            1, 0, 0, TEXT_CONGRATS, !0, !0, !1, !1);
        g = new CTLText(f, CANVAS_WIDTH / 2 - 140, 18, 280, 38, 38, "center", "#fce0ab", FONT_GAME_1, 1, 0, 0, TEXT_CONGRATS, !0, !0, !1, !1);
        m = new CGfxButton(CANVAS_WIDTH / 2 + 196, CANVAS_HEIGHT / 2 - 364, s_oSpriteLibrary.getSprite("but_exit_info"), f);
        m.addEventListener(ON_MOUSE_UP, this.hide, this)
    };
    this.unload = function() {
        m.unload();
        d.off("click", l)
    };
    this.show = function(p) {
        0 === p ? (c.refreshText(" "), g.setY(-16), g.refreshText(TEXT_NO_WIN)) : (c.refreshText(TEXT_CONGRATS), g.setY(18), g.refreshText(TEXT_YOU_WON +
            " " + formatEntries(p)));
        h.alpha = 1;
        h.visible = !0;
        var q = this;
        f.y = -CANVAS_HEIGHT / 2;
        d.alpha = 0;
        createjs.Tween.get(f).to({
            y: CANVAS_HEIGHT / 2
        }, 800, createjs.Ease.cubicOut);
        createjs.Tween.get(d).to({
            alpha: .7
        }, 800, createjs.Ease.cubicOut).call(function() {
            setTimeout(function() {
                q.hide()
            }, 3E3)
        });
        playSound("bonus_end", 1, !1)
    };
    this.hide = function() {
        createjs.Tween.get(h).to({
            alpha: 0
        }, 800, createjs.Ease.cubicOut).call(function() {
            h.visible = !1
        })
    };
    var e = a;
    this._init()
}

function CAreYouSurePanel() {
    var a, d, c, g, f, l, m, h, e, p = this;
    this._init = function() {
        a = [];
        d = [];
        h = new createjs.Container;
        h.visible = !1;
        s_oStage.addChild(h);
        e = new createjs.Shape;
        c = e.on("click", function() {});
        e.alpha = .5;
        e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.addChild(e);
        var q = s_oSpriteLibrary.getSprite("msg_box");
        g = createBitmap(q);
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT / 2;
        g.regX = .5 * q.width;
        g.regY = .5 * q.height;
        h.addChild(g);
        f = new CTLText(h, CANVAS_WIDTH / 2 - q.width / 2 + 40, CANVAS_HEIGHT /
            2 - q.height / 2 + 30, q.width - 80, 90, 70, "center", "#ffffff", FONT_GAME_1, 1, 40, 10, TEXT_ARE_SURE, !0, !0, !0, !1);
        l = new CGfxButton(CANVAS_WIDTH / 2 + 105, .5 * CANVAS_HEIGHT + 49, s_oSpriteLibrary.getSprite("but_yes"), h);
        l.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        m = new CGfxButton(CANVAS_WIDTH / 2 - 105, .5 * CANVAS_HEIGHT + 49, s_oSpriteLibrary.getSprite("but_no"), h);
        m.addEventListener(ON_MOUSE_UP, this._onButNo, this)
    };
    this.addEventListener = function(q, J, r) {
        a[q] = J;
        d[q] = r
    };
    this.show = function(q) {
        f.refreshText(q);
        h.alpha = 0;
        h.visible = !0;
        createjs.Tween.get(h).to({
            alpha: 1
        }, 300, createjs.Ease.quartOut).call(function() {
            s_oMain.stopUpdateNoBlock()
        })
    };
    this.hide = function() {
        s_oMain.startUpdateNoBlock();
        createjs.Tween.get(h).to({
            alpha: 0
        }, 500, createjs.Ease.quartOut).call(function() {
            h.visible = !1
        })
    };
    this.unload = function() {
        m.unload();
        l.unload();
        e.off("click", c)
    };
    this._onButYes = function() {
        p.hide();
        a[ON_BUT_YES_DOWN] && a[ON_BUT_YES_DOWN].call(d[ON_BUT_YES_DOWN])
    };
    this._onButNo = function() {
        p.hide()
    };
    this._init()
}
CTLText.prototype = {
    constructor: CTLText,
    __autofit: function() {
        if (this._bFitText) {
            for (var a = this._iFontSize;
                (this._oText.getBounds().height > this._iHeight - 2 * this._iPaddingV || this._oText.getBounds().width > this._iWidth - 2 * this._iPaddingH) && !(a--, this._oText.font = a + "px " + this._szFont, this._oText.lineHeight = Math.round(a * this._fLineHeightFactor), this.__updateY(), this.__verticalAlign(), 8 > a););
            this._iFontSize = a
        }
    },
    __verticalAlign: function() {
        if (this._bVerticalAlign) {
            var a = this._oText.getBounds().height;
            this._oText.y -=
                (a - this._iHeight) / 2 + this._iPaddingV
        }
    },
    __updateY: function() {
        this._oText.y = this._y + this._iPaddingV;
        switch (this._oText.textBaseline) {
            case "middle":
                this._oText.y += this._oText.lineHeight / 2 + (this._iFontSize * this._fLineHeightFactor - this._iFontSize)
        }
    },
    __createText: function(a) {
        this._bDebug && (this._oDebugShape = new createjs.Shape, this._oDebugShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(this._x, this._y, this._iWidth, this._iHeight), this._oContainer.addChild(this._oDebugShape));
        this._oText = new createjs.Text(a,
            this._iFontSize + "px " + this._szFont, this._szColor);
        this._oText.textBaseline = "middle";
        this._oText.lineHeight = Math.round(this._iFontSize * this._fLineHeightFactor);
        this._oText.textAlign = this._szAlign;
        this._oText.lineWidth = this._bMultiline ? this._iWidth - 2 * this._iPaddingH : null;
        switch (this._szAlign) {
            case "center":
                this._oText.x = this._x + this._iWidth / 2;
                break;
            case "left":
                this._oText.x = this._x + this._iPaddingH;
                break;
            case "right":
                this._oText.x = this._x + this._iWidth - this._iPaddingH
        }
        this._oContainer.addChild(this._oText);
        this.refreshText(a)
    },
    setVerticalAlign: function(a) {
        this._bVerticalAlign = a
    },
    setOutline: function(a) {
        null !== this._oText && (this._oText.outline = a)
    },
    setShadow: function(a, d, c, g) {
        null !== this._oText && (this._oText.shadow = new createjs.Shadow(a, d, c, g))
    },
    setColor: function(a) {
        this._oText.color = a
    },
    setAlpha: function(a) {
        this._oText.alpha = a
    },
    setY: function(a) {
        this._y = this._oText.y = a
    },
    removeTweens: function() {
        createjs.Tween.removeTweens(this._oText)
    },
    getText: function() {
        return this._oText
    },
    getString: function() {
        return this._oText.text
    },
    getY: function() {
        return this._y
    },
    getFontSize: function() {
        return this._iFontSize
    },
    refreshText: function(a) {
        "" === a && (a = " ");
        null === this._oText && this.__createText(a);
        this._oText.text = a;
        this._oText.font = this._iFontSize + "px " + this._szFont;
        this._oText.lineHeight = Math.round(this._iFontSize * this._fLineHeightFactor);
        this.__autofit();
        this.__updateY();
        this.__verticalAlign()
    }
};

function CTLText(a, d, c, g, f, l, m, h, e, p, q, J, r, I, E, G, A) {
    this._oContainer = a;
    this._x = d;
    this._y = c;
    this._iWidth = g;
    this._iHeight = f;
    this._bMultiline = G;
    this._iFontSize = l;
    this._szAlign = m;
    this._szColor = h;
    this._szFont = e;
    this._iPaddingH = q;
    this._iPaddingV = J;
    this._bVerticalAlign = E;
    this._bFitText = I;
    this._bDebug = A;
    this._oDebugShape = null;
    this._fLineHeightFactor = p;
    this._oText = null;
    r && this.__createText(r)
}

function CRechargePanel() {
    var a, d, c, g, f, l, m, h = this;
    this._init = function() {
        m = new createjs.Container;
        s_oStage.addChild(m);
        d = new createjs.Shape;
        a = d.on("click", function() {});
        d.alpha = 0;
        d.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        m.addChild(d);
        c = new createjs.Container;
        c.visible = !1;
        m.addChild(c);
        var e = s_oSpriteLibrary.getSprite("msg_box");
        l = createBitmap(e);
        l.regX = e.width / 2;
        l.regY = e.height / 2;
        c.addChild(l);
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2;
        new CTLText(c, -e.width / 2 + 30, -80, e.width -
            60, 90, 30, "center", "#ffffff", FONT_GAME_1, 1, 40, 10, TEXT_RECHARGE, !0, !0, !0, !1);
        e = s_oSpriteLibrary.getSprite("but_no");
        f = new CGfxButton(-130, 50, e, c);
        f.addEventListener(ON_MOUSE_UP, this.unload, this);
        g = new CGfxButton(130, 50, s_oSpriteLibrary.getSprite("but_yes"), c);
        g.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
        d.alpha = 0;
        createjs.Tween.get(d).to({
            alpha: .7
        }, 500).call(function() {
            c.alpha = 0;
            c.visible = !0;
            createjs.Tween.get(c).to({
                alpha: 1
            }, 300)
        })
    };
    this.unload = function() {
        createjs.Tween.get(m).to({
                alpha: 0
            },
            500).call(function() {
            s_oStage.removeChild(m);
            f.unload();
            g.unload()
        });
        d.off("click", a)
    };
    this._onRecharge = function() {
        h.unload();
        $(s_oMain).trigger("recharge")
    };
    this._init()
}

function extractHostname(a) {
    a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
    a = a.split(":")[0];
    return a = a.split("?")[0]
}

function extractRootDomain(a) {
    a = extractHostname(a);
    var d = a.split("."),
        c = d.length;
    2 < c && (a = d[c - 2] + "." + d[c - 1]);
    return a
}
var getClosestTop = function() {
        var a = window,
            d = !1;
        try {
            for (; a.parent.document !== a.document;)
                if (a.parent.document) a = a.parent;
                else {
                    d = !0;
                    break
                }
        } catch (c) {
            d = !0
        }
        return {
            topFrame: a,
            err: d
        }
    },
    getBestPageUrl = function(a) {
        var d = a.topFrame,
            c = "";
        if (a.err) try {
            try {
                c = window.top.location.href
            } catch (f) {
                var g = window.location.ancestorOrigins;
                c = g[g.length - 1]
            }
        } catch (f) {
            c = d.document.referrer
        } else c = d.location.href;
        return c
    },
    TOPFRAMEOBJ = getClosestTop(),
    PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);

function seekAndDestroy() {
    for (var a = extractRootDomain(PAGE_URL), d = [String.fromCharCode(99, 111, 100, 101, 116, 104, 105, 115, 108, 97, 98, 46, 99, 111, 109), String.fromCharCode(101, 110, 118, 97, 116, 111, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116)], c = 0; c < d.length; c++)
        if (d[c] === a) return !0;
    return !1
};