/*
 screenfull
 v5.0.0 - 2019-09-09
 (c) Sindre Sorhus; MIT License
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
! function() {
    var a = "undefined" != typeof window && void 0 !== window.document ? window.document : {},
        b = "undefined" != typeof module && module.exports,
        c = function() {
            for (var h, k = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "),
                    "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")
                ], g = 0, e = k.length, l = {}; g < e; g++)
                if ((h = k[g]) && h[1] in a) {
                    for (g = 0; g < h.length; g++) l[k[0][g]] = h[g];
                    return l
                }
            return !1
        }(),
        d = {
            change: c.fullscreenchange,
            error: c.fullscreenerror
        },
        f = {
            request: function(h) {
                return new Promise(function(k, g) {
                    var e = function() {
                        this.off("change",
                            e);
                        k()
                    }.bind(this);
                    this.on("change", e);
                    h = h || a.documentElement;
                    Promise.resolve(h[c.requestFullscreen]())["catch"](g)
                }.bind(this))
            },
            exit: function() {
                return new Promise(function(h, k) {
                    if (this.isFullscreen) {
                        var g = function() {
                            this.off("change", g);
                            h()
                        }.bind(this);
                        this.on("change", g);
                        Promise.resolve(a[c.exitFullscreen]())["catch"](k)
                    } else h()
                }.bind(this))
            },
            toggle: function(h) {
                return this.isFullscreen ? this.exit() : this.request(h)
            },
            onchange: function(h) {
                this.on("change", h)
            },
            onerror: function(h) {
                this.on("error", h)
            },
            on: function(h, k) {
                var g = d[h];
                g && a.addEventListener(g, k, !1)
            },
            off: function(h, k) {
                var g = d[h];
                g && a.removeEventListener(g, k, !1)
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
    }), b ? module.exports = f : window.screenfull = f) : b ? module.exports = {
        isEnabled: !1
    } : window.screenfull = {
        isEnabled: !1
    }
}();
(function() {
    function a(m) {
        m = String(m);
        return m.charAt(0).toUpperCase() + m.slice(1)
    }

    function b(m, r) {
        var F = -1,
            D = m ? m.length : 0;
        if ("number" == typeof D && -1 < D && D <= w)
            for (; ++F < D;) r(m[F], F, m);
        else d(m, r)
    }

    function c(m) {
        m = String(m).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(m) ? m : a(m)
    }

    function d(m, r) {
        for (var F in m) G.call(m, F) && r(m[F], F, m)
    }

    function f(m) {
        return null == m ? a(m) : x.call(m).slice(8, -1)
    }

    function h(m, r) {
        var F = null != m ? typeof m[r] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(F) &&
            ("object" == F ? !!m[r] : !0)
    }

    function k(m) {
        return String(m).replace(/([ -])(?!$)/g, "$1?")
    }

    function g(m, r) {
        var F = null;
        b(m, function(D, B) {
            F = r(F, D, B, m)
        });
        return F
    }

    function e(m) {
        function r(P) {
            return g(P, function(Q, T) {
                var Y = T.pattern || k(T);
                !Q && (Q = RegExp("\\b" + Y + " *\\d+[.\\w_]*", "i").exec(m) || RegExp("\\b" + Y + " *\\w+-[\\w]*", "i").exec(m) || RegExp("\\b" + Y + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(m)) && ((Q = String(T.label && !RegExp(Y, "i").test(T.label) ? T.label : Q).split("/"))[1] && !/[\d.]+/.test(Q[0]) && (Q[0] +=
                    " " + Q[1]), T = T.label || T, Q = c(Q[0].replace(RegExp(Y, "i"), T).replace(RegExp("; *(?:" + T + "[_-])?", "i"), " ").replace(RegExp("(" + T + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return Q
            })
        }

        function F(P) {
            return g(P, function(Q, T) {
                return Q || (RegExp(T + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(m) || 0)[1] || null
            })
        }
        var D = v,
            B = m && "object" == typeof m && "String" != f(m);
        B && (D = m, m = null);
        var J = D.navigator || {},
            A = J.userAgent || "";
        m || (m = A);
        var N = B ? !!J.likeChrome : /\bChrome\b/.test(m) && !/internal|\n/i.test(x.toString()),
            O = B ? "Object" : "ScriptBridgingProxyObject",
            S = B ? "Object" : "Environment",
            I = B && D.java ? "JavaPackage" : f(D.java),
            V = B ? "Object" : "RuntimeObject";
        S = (I = /\bJava/.test(I) && D.java) && f(D.environment) == S;
        var ba = I ? "a" : "\u03b1",
            Z = I ? "b" : "\u03b2",
            U = D.document || {},
            W = D.operamini || D.opera,
            X = E.test(X = B && W ? W["[[Class]]"] : f(W)) ? X : W = null,
            q, K = m;
        B = [];
        var H = null,
            L = m == A;
        A = L && W && "function" == typeof W.version && W.version();
        var C = function(P) {
                return g(P, function(Q, T) {
                    return Q || RegExp("\\b" + (T.pattern || k(T)) + "\\b", "i").exec(m) && (T.label ||
                        T)
                })
            }([{
                label: "EdgeHTML",
                pattern: "Edge"
            }, "Trident", {
                label: "WebKit",
                pattern: "AppleWebKit"
            }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
            n = function(P) {
                return g(P, function(Q, T) {
                    return Q || RegExp("\\b" + (T.pattern || k(T)) + "\\b", "i").exec(m) && (T.label || T)
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
            R = r([{
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
            p = function(P) {
                return g(P, function(Q, T, Y) {
                    return Q || (T[R] || T[/^[a-z]+(?: +[a-z]+\b)*/i.exec(R)] || RegExp("\\b" + k(Y) + "(?:\\b|\\w*\\d)", "i").exec(m)) && Y
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
            t = function(P) {
                return g(P, function(Q, T) {
                    var Y = T.pattern || k(T);
                    if (!Q && (Q = RegExp("\\b" + Y + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(m))) {
                        var aa = Q,
                            ca = T.label || T,
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
                        Y && ca && /^Win/i.test(aa) && !/^Windows Phone /i.test(aa) && (da = da[/[\d.]+$/.exec(aa)]) && (aa = "Windows " + da);
                        aa = String(aa);
                        Y && ca && (aa = aa.replace(RegExp(Y, "i"), ca));
                        Q = aa = c(aa.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/,
                            "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                    }
                    return Q
                })
            }(["Windows Phone", "Android", "CentOS", {
                    label: "Chrome OS",
                    pattern: "CrOS"
                }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X",
                "Macintosh", "Mac", "Windows 98;", "Windows "
            ]);
        C && (C = [C]);
        p && !R && (R = r([p]));
        if (q = /\bGoogle TV\b/.exec(R)) R = q[0];
        /\bSimulator\b/i.test(m) && (R = (R ? R + " " : "") + "Simulator");
        "Opera Mini" == n && /\bOPiOS\b/.test(m) && B.push("running in Turbo/Uncompressed mode");
        "IE" == n && /\blike iPhone OS\b/.test(m) ? (q = e(m.replace(/like iPhone OS/, "")), p = q.manufacturer, R = q.product) : /^iP/.test(R) ? (n || (n = "Safari"), t = "iOS" + ((q = / OS ([\d_]+)/i.exec(m)) ? " " + q[1].replace(/_/g, ".") : "")) : "Konqueror" != n || /buntu/i.test(t) ? p && "Google" != p &&
            (/Chrome/.test(n) && !/\bMobile Safari\b/i.test(m) || /\bVita\b/.test(R)) || /\bAndroid\b/.test(t) && /^Chrome/.test(n) && /\bVersion\//i.test(m) ? (n = "Android Browser", t = /\bAndroid\b/.test(t) ? t : "Android") : "Silk" == n ? (/\bMobi/i.test(m) || (t = "Android", B.unshift("desktop mode")), /Accelerated *= *true/i.test(m) && B.unshift("accelerated")) : "PaleMoon" == n && (q = /\bFirefox\/([\d.]+)\b/.exec(m)) ? B.push("identifying as Firefox " + q[1]) : "Firefox" == n && (q = /\b(Mobile|Tablet|TV)\b/i.exec(m)) ? (t || (t = "Firefox OS"), R || (R = q[1])) : !n ||
            (q = !/\bMinefield\b/i.test(m) && /\b(?:Firefox|Safari)\b/.exec(n)) ? (n && !R && /[\/,]|^[^(]+?\)/.test(m.slice(m.indexOf(q + "/") + 8)) && (n = null), (q = R || p || t) && (R || p || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(t)) && (n = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(t) ? t : q) + " Browser")) : "Electron" == n && (q = (/\bChrome\/([\d.]+)\b/.exec(m) || 0)[1]) && B.push("Chromium " + q) : t = "Kubuntu";
        A || (A = F(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", k(n),
            "(?:Firefox|Minefield|NetFront)"
        ]));
        if (q = "iCab" == C && 3 < parseFloat(A) && "WebKit" || /\bOpera\b/.test(n) && (/\bOPR\b/.test(m) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(m) && !/^(?:Trident|EdgeHTML)$/.test(C) && "WebKit" || !C && /\bMSIE\b/i.test(m) && ("Mac OS" == t ? "Tasman" : "Trident") || "WebKit" == C && /\bPlayStation\b(?! Vita\b)/i.test(n) && "NetFront") C = [q];
        "IE" == n && (q = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(m) || 0)[1]) ? (n += " Mobile", t = "Windows Phone " + (/\+$/.test(q) ? q : q + ".x"), B.unshift("desktop mode")) : /\bWPDesktop\b/i.test(m) ?
            (n = "IE Mobile", t = "Windows Phone 8.x", B.unshift("desktop mode"), A || (A = (/\brv:([\d.]+)/.exec(m) || 0)[1])) : "IE" != n && "Trident" == C && (q = /\brv:([\d.]+)/.exec(m)) && (n && B.push("identifying as " + n + (A ? " " + A : "")), n = "IE", A = q[1]);
        if (L) {
            if (h(D, "global"))
                if (I && (q = I.lang.System, K = q.getProperty("os.arch"), t = t || q.getProperty("os.name") + " " + q.getProperty("os.version")), S) {
                    try {
                        A = D.require("ringo/engine").version.join("."), n = "RingoJS"
                    } catch (P) {
                        (q = D.system) && q.global.system == D.system && (n = "Narwhal", t || (t = q[0].os || null))
                    }
                    n ||
                        (n = "Rhino")
                } else "object" == typeof D.process && !D.process.browser && (q = D.process) && ("object" == typeof q.versions && ("string" == typeof q.versions.electron ? (B.push("Node " + q.versions.node), n = "Electron", A = q.versions.electron) : "string" == typeof q.versions.nw && (B.push("Chromium " + A, "Node " + q.versions.node), n = "NW.js", A = q.versions.nw)), n || (n = "Node.js", K = q.arch, t = q.platform, A = (A = /[\d.]+/.exec(q.version)) ? A[0] : null));
            else f(q = D.runtime) == O ? (n = "Adobe AIR", t = q.flash.system.Capabilities.os) : f(q = D.phantom) == V ? (n = "PhantomJS",
                A = (q = q.version || null) && q.major + "." + q.minor + "." + q.patch) : "number" == typeof U.documentMode && (q = /\bTrident\/(\d+)/i.exec(m)) ? (A = [A, U.documentMode], (q = +q[1] + 4) != A[1] && (B.push("IE " + A[1] + " mode"), C && (C[1] = ""), A[1] = q), A = "IE" == n ? String(A[1].toFixed(1)) : A[0]) : "number" == typeof U.documentMode && /^(?:Chrome|Firefox)\b/.test(n) && (B.push("masking as " + n + " " + A), n = "IE", A = "11.0", C = ["Trident"], t = "Windows");
            t = t && c(t)
        }
        A && (q = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(A) || /(?:alpha|beta)(?: ?\d)?/i.exec(m + ";" + (L && J.appMinorVersion)) ||
            /\bMinefield\b/i.test(m) && "a") && (H = /b/i.test(q) ? "beta" : "alpha", A = A.replace(RegExp(q + "\\+?$"), "") + ("beta" == H ? Z : ba) + (/\d+\+?/.exec(q) || ""));
        if ("Fennec" == n || "Firefox" == n && /\b(?:Android|Firefox OS)\b/.test(t)) n = "Firefox Mobile";
        else if ("Maxthon" == n && A) A = A.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(R)) "Xbox 360" == R && (t = null), "Xbox 360" == R && /\bIEMobile\b/.test(m) && B.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(n) && (!n || R || /Browser|Mobi/.test(n)) || "Windows CE" != t && !/Mobi/i.test(m))
            if ("IE" ==
                n && L) try {
                null === D.external && B.unshift("platform preview")
            } catch (P) {
                B.unshift("embedded")
            } else(/\bBlackBerry\b/.test(R) || /\bBB10\b/.test(m)) && (q = (RegExp(R.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(m) || 0)[1] || A) ? (q = [q, /BB10/.test(m)], t = (q[1] ? (R = null, p = "BlackBerry") : "Device Software") + " " + q[0], A = null) : this != d && "Wii" != R && (L && W || /Opera/.test(n) && /\b(?:MSIE|Firefox)\b/i.test(m) || "Firefox" == n && /\bOS X (?:\d+\.){2,}/.test(t) || "IE" == n && (t && !/^Win/.test(t) && 5.5 < A || /\bWindows XP\b/.test(t) && 8 < A || 8 == A && !/\bTrident\b/.test(m))) &&
                !E.test(q = e.call(d, m.replace(E, "") + ";")) && q.name && (q = "ing as " + q.name + ((q = q.version) ? " " + q : ""), E.test(n) ? (/\bIE\b/.test(q) && "Mac OS" == t && (t = null), q = "identify" + q) : (q = "mask" + q, n = X ? c(X.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(q) && (t = null), L || (A = null)), C = ["Presto"], B.push(q));
            else n += " Mobile";
        if (q = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(m) || 0)[1]) {
            q = [parseFloat(q.replace(/\.(\d)$/, ".0$1")), q];
            if ("Safari" == n && "+" == q[1].slice(-1)) n = "WebKit Nightly", H = "alpha", A = q[1].slice(0, -1);
            else if (A ==
                q[1] || A == (q[2] = (/\bSafari\/([\d.]+\+?)/i.exec(m) || 0)[1])) A = null;
            q[1] = (/\bChrome\/([\d.]+)/i.exec(m) || 0)[1];
            537.36 == q[0] && 537.36 == q[2] && 28 <= parseFloat(q[1]) && "WebKit" == C && (C = ["Blink"]);
            L && (N || q[1]) ? (C && (C[1] = "like Chrome"), q = q[1] || (q = q[0], 530 > q ? 1 : 532 > q ? 2 : 532.05 > q ? 3 : 533 > q ? 4 : 534.03 > q ? 5 : 534.07 > q ? 6 : 534.1 > q ? 7 : 534.13 > q ? 8 : 534.16 > q ? 9 : 534.24 > q ? 10 : 534.3 > q ? 11 : 535.01 > q ? 12 : 535.02 > q ? "13+" : 535.07 > q ? 15 : 535.11 > q ? 16 : 535.19 > q ? 17 : 536.05 > q ? 18 : 536.1 > q ? 19 : 537.01 > q ? 20 : 537.11 > q ? "21+" : 537.13 > q ? 23 : 537.18 > q ? 24 : 537.24 > q ? 25 : 537.36 >
                q ? 26 : "Blink" != C ? "27" : "28")) : (C && (C[1] = "like Safari"), q = (q = q[0], 400 > q ? 1 : 500 > q ? 2 : 526 > q ? 3 : 533 > q ? 4 : 534 > q ? "4+" : 535 > q ? 5 : 537 > q ? 6 : 538 > q ? 7 : 601 > q ? 8 : "8"));
            C && (C[1] += " " + (q += "number" == typeof q ? ".x" : /[.+]/.test(q) ? "" : "+"));
            "Safari" == n && (!A || 45 < parseInt(A)) && (A = q)
        }
        "Opera" == n && (q = /\bzbov|zvav$/.exec(t)) ? (n += " ", B.unshift("desktop mode"), "zvav" == q ? (n += "Mini", A = null) : n += "Mobile", t = t.replace(RegExp(" *" + q + "$"), "")) : "Safari" == n && /\bChrome\b/.exec(C && C[1]) && (B.unshift("desktop mode"), n = "Chrome Mobile", A = null, /\bOS X\b/.test(t) ?
            (p = "Apple", t = "iOS 4.3+") : t = null);
        A && 0 == A.indexOf(q = /[\d.]+$/.exec(t)) && -1 < m.indexOf("/" + q + "-") && (t = String(t.replace(q, "")).replace(/^ +| +$/g, ""));
        C && !/\b(?:Avant|Nook)\b/.test(n) && (/Browser|Lunascape|Maxthon/.test(n) || "Safari" != n && /^iOS/.test(t) && /\bSafari\b/.test(C[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(n) && C[1]) && (q = C[C.length - 1]) && B.push(q);
        B.length && (B = ["(" + B.join("; ") + ")"]);
        p && R && 0 > R.indexOf(p) && B.push("on " + p);
        R && B.push((/^on /.test(B[B.length -
            1]) ? "" : "on ") + R);
        if (t) {
            var M = (q = / ([\d.+]+)$/.exec(t)) && "/" == t.charAt(t.length - q[0].length - 1);
            t = {
                architecture: 32,
                family: q && !M ? t.replace(q[0], "") : t,
                version: q ? q[1] : null,
                toString: function() {
                    var P = this.version;
                    return this.family + (P && !M ? " " + P : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }(q = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(K)) && !/\bi686\b/i.test(K) ? (t && (t.architecture = 64, t.family = t.family.replace(RegExp(" *" + q), "")), n && (/\bWOW64\b/i.test(m) || L && /\w(?:86|32)$/.test(J.cpuClass || J.platform) && !/\bWin64; x64\b/i.test(m)) &&
            B.unshift("32-bit")) : t && /^OS X/.test(t.family) && "Chrome" == n && 39 <= parseFloat(A) && (t.architecture = 64);
        m || (m = null);
        D = {};
        D.description = m;
        D.layout = C && C[0];
        D.manufacturer = p;
        D.name = n;
        D.prerelease = H;
        D.product = R;
        D.ua = m;
        D.version = n && A;
        D.os = t || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        D.parse = e;
        D.toString = function() {
            return this.description || ""
        };
        D.version && B.unshift(A);
        D.name && B.unshift(n);
        t && n && (t != String(t).split(" ")[0] || t != n.split(" ")[0] && !R) && B.push(R ? "(" + t + ")" : "on " +
            t);
        B.length && (D.description = B.join(" "));
        return D
    }
    var l = {
            "function": !0,
            object: !0
        },
        v = l[typeof window] && window || this,
        y = l[typeof exports] && exports;
    l = l[typeof module] && module && !module.nodeType && module;
    var u = y && l && "object" == typeof global && global;
    !u || u.global !== u && u.window !== u && u.self !== u || (v = u);
    var w = Math.pow(2, 53) - 1,
        E = /\bOpera/;
    u = Object.prototype;
    var G = u.hasOwnProperty,
        x = u.toString,
        z = e();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (v.platform = z, define(function() {
            return z
        })) : y &&
        l ? d(z, function(m, r) {
            y[r] = m
        }) : v.platform = z
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
        }], b = 0; b < a.length; b++) {
        var c = document.createElement("meta");
        c.name = a[b].name;
        c.content = a[b].content;
        var d = window.document.head.querySelector('meta[name="' + c.name + '"]');
        d && d.parentNode.removeChild(d);
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

function isIOSLessThen13() {
    var a = platform.os,
        b = a.family.toLowerCase();
    a = parseFloat(a.version);
    return "ios" === b && 13 > a ? !0 : !1
}
$(document).ready(function() {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && (buildIOSFullscreenPanel(), buildIOSMeta())
});
jQuery(window).resize(function() {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && iosResize()
});
var s_iOffsetX, s_iOffsetY, s_iScaleFactor = 1,
    s_bIsIphone = !1,
    s_bFocus = !0;
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
    if (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone")) return s_bIsIphone = !0;
    for (; a.length;)
        if (navigator.platform === a.pop()) return !0;
    return s_bIsIphone = !1
}

function isIpad() {
    var a = -1 !== navigator.userAgent.toLowerCase().indexOf("ipad");
    return !a && navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && 2 < navigator.maxTouchPoints ? !0 : a
}

function isMobile() {
    return isIpad() ? !0 : jQuery.browser.mobile
}

function getSize(a) {
    var b = a.toLowerCase(),
        c = window.document,
        d = c.documentElement;
    if (void 0 === window["inner" + a]) a = d["client" + a];
    else if (window["inner" + a] != d["client" + a]) {
        var f = c.createElement("body");
        f.id = "vpw-test-b";
        f.style.cssText = "overflow:scroll";
        var h = c.createElement("div");
        h.id = "vpw-test-d";
        h.style.cssText = "position:absolute;top:-1000px";
        h.innerHTML = "<style>@media(" + b + ":" + d["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + b + ":7px!important}}</style>";
        f.appendChild(h);
        d.insertBefore(f, c.head);
        a = 7 == h["offset" + a] ? d["client" + a] : window["inner" + a];
        d.removeChild(f)
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
        var a = null !== platform.name && "safari" === platform.name.toLowerCase() ? getIOSWindowHeight() : getSize("Height");
        var b = getSize("Width");
        s_bFocus && _checkOrientation(b, a);
        var c = Math.min(a / CANVAS_HEIGHT, b / CANVAS_WIDTH),
            d = Math.round(CANVAS_WIDTH * c);
        c = Math.round(CANVAS_HEIGHT * c);
        if (c < a) {
            var f = a - c;
            c += f;
            d += CANVAS_WIDTH / CANVAS_HEIGHT * f
        } else d < b && (f = b - d, d += f, c += CANVAS_HEIGHT / CANVAS_WIDTH * f);
        f = a / 2 - c / 2;
        var h = b / 2 - d / 2,
            k = CANVAS_WIDTH / d;
        if (h * k < -EDGEBOARD_X ||
            f * k < -EDGEBOARD_Y) c = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), b / (CANVAS_WIDTH - 2 * EDGEBOARD_X)), d = Math.round(CANVAS_WIDTH * c), c = Math.round(CANVAS_HEIGHT * c), f = (a - c) / 2, h = (b - d) / 2, k = CANVAS_WIDTH / d;
        s_iOffsetX = -1 * h * k;
        s_iOffsetY = -1 * f * k;
        0 <= f && (s_iOffsetY = 0);
        0 <= h && (s_iOffsetX = 0);
        null !== s_oGame && s_oGame.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone && s_oStage ? (canvas = document.getElementById("canvas"), s_oStage.canvas.width = 2 * d, s_oStage.canvas.height =
            2 * c, canvas.style.width = d + "px", canvas.style.height = c + "px", b = Math.min(d / CANVAS_WIDTH, c / CANVAS_HEIGHT), s_iScaleFactor = 2 * b, s_oStage.scaleX = s_oStage.scaleY = 2 * b) : s_bMobile || isChrome() ? ($("#canvas").css("width", d + "px"), $("#canvas").css("height", c + "px")) : s_oStage && (s_oStage.canvas.width = d, s_oStage.canvas.height = c, s_iScaleFactor = Math.min(d / CANVAS_WIDTH, c / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > f || (f = (a - c) / 2);
        $("#canvas").css("top", f + "px");
        $("#canvas").css("left", h + "px");
        fullscreenHandler()
    }
}

function _checkOrientation(a, b) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (a > b ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
        s_oMain.stopUpdate()))
}

function createBitmap(a, b, c) {
    var d = new createjs.Bitmap(a),
        f = new createjs.Shape;
    b && c ? f.graphics.beginFill("#fff").drawRect(0, 0, b, c) : f.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    d.hitArea = f;
    return d
}

function createSprite(a, b, c, d, f, h) {
    a = null !== b ? new createjs.Sprite(a, b) : new createjs.Sprite(a);
    b = new createjs.Shape;
    b.graphics.beginFill("#000000").drawRect(-c, -d, f, h);
    a.hitArea = b;
    return a
}

function randomFloatBetween(a, b, c) {
    "undefined" === typeof c && (c = 2);
    return parseFloat(Math.min(a + Math.random() * (b - a), b).toFixed(c))
}

function shuffle(a) {
    for (var b = a.length, c, d; 0 !== b;) d = Math.floor(Math.random() * b), --b, c = a[b], a[b] = a[d], a[d] = c;
    return a
}

function interpolate(a, b, c) {
    return {
        x: a.x + (b.x - a.x) * c,
        y: a.y + (b.y - a.y) * c
    }
}

function formatTime(a) {
    a /= 1E3;
    var b = Math.floor(a / 60);
    a = parseFloat(a - 60 * b).toFixed(1);
    var c = "";
    c = 10 > b ? c + ("0" + b + ":") : c + (b + ":");
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
            var b = document.createEvent("MouseEvents");
            b.initEvent("click", !0, !0);
            a.dispatchEvent(b)
        }
    }
};

function playSound(a, b, c) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(), s_aSounds[a].volume(b), s_aSounds[a].loop(c), s_aSounds[a]) : null
}

function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].stop()
}

function setVolume(a, b) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].volume(b)
}

function setMute(a, b) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].mute(b)
}

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}

function getParamValue(a) {
    for (var b = window.location.search.substring(1).split("&"), c = 0; c < b.length; c++) {
        var d = b[c].split("=");
        if (d[0] == a) return d[1]
    }
}
(function() {
    function a(c) {
        var d = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        c = c || window.event;
        c.type in d ? document.body.className = d[c.type] : (document.body.className = this[b] ? "hidden" : "visible", "hidden" === document.body.className ? (s_oMain.stopUpdate(), s_bFocus = !1) : (s_oMain.startUpdate(), s_bFocus = !0))
    }
    var b = "hidden";
    b in document ? document.addEventListener("visibilitychange", a) : (b = "mozHidden") in document ? document.addEventListener("mozvisibilitychange",
        a) : (b = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", a) : (b = "msHidden") in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin" in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
})();

function fullscreenHandler() {
    ENABLE_FULLSCREEN && screenfull.isEnabled && (s_bFullscreen = screenfull.isFullscreen, null !== s_oInterface && s_oInterface.resetFullscreenBut(), null !== s_oMenu && s_oMenu.resetFullscreenBut())
}
if (screenfull.isEnabled) screenfull.on("change", function() {
    s_bFullscreen = screenfull.isFullscreen;
    null !== s_oInterface && s_oInterface.resetFullscreenBut();
    null !== s_oMenu && s_oMenu.resetFullscreenBut()
});

function saveItem(a, b) {
    s_bStorageAvailable && localStorage.setItem(a, b)
}

function getItem(a) {
    return s_bStorageAvailable ? localStorage.getItem(a) : null
}

function clearLocalStorage() {
    TOTAL_MONEY = START_MONEY;
    if (s_bStorageAvailable)
        for (var a = 0; null !== localStorage.key(a);) {
            var b = localStorage.key(a); - 1 !== b.indexOf(LOCALSTORAGE_STRING) ? localStorage.removeItem(b) : a++
        }
}

function CSpriteLibrary() {
    var a = {},
        b, c, d, f, h, k;
    this.init = function(g, e, l) {
        b = {};
        d = c = 0;
        f = g;
        h = e;
        k = l
    };
    this.addSprite = function(g, e) {
        if (a.hasOwnProperty(g)) return !1;
        var l = new Image;
        a[g] = b[g] = {
            szPath: e,
            oSprite: l,
            bLoaded: !1
        };
        c++;
        return !0
    };
    this.getSprite = function(g) {
        return a.hasOwnProperty(g) ? a[g].oSprite : null
    };
    this._onSpritesLoaded = function() {
        c = 0;
        h.call(k)
    };
    this._onSpriteLoaded = function() {
        f.call(k);
        ++d === c && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var g in b) b[g].oSprite.oSpriteLibrary = this,
            b[g].oSprite.szKey = g, b[g].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey)
            }, b[g].oSprite.onerror = function(e) {
                var l = e.currentTarget;
                setTimeout(function() {
                    b[l.szKey].oSprite.src = b[l.szKey].szPath
                }, 500)
            }, b[g].oSprite.src = b[g].szPath
    };
    this.setLoaded = function(g) {
        a[g].bLoaded = !0
    };
    this.isLoaded = function(g) {
        return a[g].bLoaded
    };
    this.getNumSprites = function() {
        return c
    }
}
var CANVAS_WIDTH = 1920,
    CANVAS_HEIGHT = 1080,
    EDGEBOARD_X = 256,
    EDGEBOARD_Y = 84,
    FPS = 60,
    FPS_TIME = 1E3 / FPS,
    DISABLE_SOUND_MOBILE = !1,
    DISABLE_SOUND_DESKTOP = !1,
    LOCALSTORAGE_STRING = "slot_zeus_treasure_",
    FONT_GAME_1 = "robotoblack",
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
    SPIN_BUT_STATE_STOP = "stop",
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
    ON_CHARACTER_END_JUMP = 7,
    BONUS_BUTTON_1 = "up_left",
    BONUS_BUTTON_2 = "center_left",
    BONUS_BUTTON_3 = "down_left",
    BONUS_BUTTON_4 = "up_right",
    BONUS_BUTTON_5 = "center_right",
    BONUS_BUTTON_6 = "down_right",
    REEL_OFFSET_X = 320,
    REEL_OFFSET_Y = 150,
    START_REEL_OFFSET_X, START_REEL_OFFSET_Y, NUM_REELS = 5,
    NUM_ROWS = 3,
    NUM_SYMBOLS =
    10,
    WILD_SYMBOL = 7,
    BONUS_SYMBOL = 9,
    FREESPIN_SYMBOL = 8,
    NUM_PAYLINES = 20,
    SYMBOL_WIDTH = 240,
    SYMBOL_HEIGHT = 230,
    SYMBOL_ANIM_WIDTH = 480,
    SYMBOL_ANIM_HEIGHT = 460,
    WIN_BIG_ANIM_WIDTH = 564,
    WIN_BIG_ANIM_HEIGHT = 542,
    SPACE_BETWEEN_SYMBOLS = 14.5,
    SPACE_HEIGHT_BETWEEN_SYMBOLS = 0,
    OFFSET_Y_SYMBOLS = 24,
    MAX_FRAMES_REEL_EASE = 24,
    MIN_REEL_LOOPS, SUSPANCE_REEL_LOOPS = 5,
    REEL_DELAY, REEL_START_Y = 80 - 3 * (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS),
    REEL_ARRIVAL_Y = 80 + 3 * (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS),
    TIME_SHOW_WIN, TIME_SHOW_ALL_WINS =
    2E3,
    TIME_SPIN_BUT_CHANGE = 1E3,
    TIME_HOLD_AUTOSPIN = 1E3,
    MIN_TIME_EFFECT_FREESPIN = 600,
    MAX_TIME_EFFECT_FREESPIN = 3E3,
    MAX_BET, TOTAL_MONEY, START_BET, COIN_BET, BONUS_FREESPIN = 1,
    BONUS_GAME = 2,
    REEL_SCALE = .85,
    STATE_BONUS_IDLE = 0,
    STATE_BONUS_KICK = 1,
    STATE_BONUS_WIN = 2,
    STATE_BONUS_LOSE = 3,
    ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, SOUNDTRACK_VOLUME_IN_GAME = 1,
    RESTART_CREDIT, NUM_SPIN_FOR_ADS, START_MONEY, WIN_OCCURRENCE = 35,
    FREESPIN_OCCURRENCE = 10,
    BONUS_OCCURRENCE = 10,
    SLOT_CASH = 100,
    NUM_FREESPIN = [3, 4, 5],
    BONUS_PRIZE = [10, 30, 60,
        90, 100
    ],
    BONUS_PRIZE_OCCURRENCE = [40, 25, 20, 10, 5],
    MAX_PRIZES_BONUS = 5,
    _iCoinBets = [.05, .1, .15, .2, .25, .3, .35, .4, .45, .5],
    PAYTABLE_VALUES = [
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

function APIgetSlotInfos(a, b) {
    a.call(b, {
        start_money: TOTAL_MONEY,
        bets: _iCoinBets,
        start_bet: _iCoinBets[0],
        paytable: PAYTABLE_VALUES
    })
}

function APIAttemptSpin(a, b, c, d, f) {
    if (a > TOTAL_MONEY) _dieError("INVALID BET: " + a + ",money:" + TOTAL_MONEY, d, f);
    else {
        TOTAL_MONEY -= a;
        SLOT_CASH += a;
        TOTAL_MONEY = parseFloat(TOTAL_MONEY.toFixed(2));
        SLOT_CASH = parseFloat(SLOT_CASH.toFixed(2));
        var h = _bBonus = !1;
        if (SLOT_CASH < _iMinWin * b) generLosingPattern(), !0 === _bFreespinEnable && (_iTotFreeSpin--, 0 > _iTotFreeSpin && (_iTotFreeSpin = 0, _bFreespinEnable = !1)), a = {
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
                var k = Math.floor(100 * Math.random());
                0 === _iTotFreeSpin && k < FREESPIN_OCCURRENCE + BONUS_OCCURRENCE && (k = Math.floor(Math.random() * (FREESPIN_OCCURRENCE + BONUS_OCCURRENCE) + 1), k <= FREESPIN_OCCURRENCE ? h = !0 : _bBonus = SLOT_CASH >= BONUS_PRIZE[0] * b ? !0 : !1)
            }
            k = 0;
            do {
                generateRandomSymbols(h);
                for (var g = checkWin(h, c), e = 0, l = 0; l < g.length; l++) e += g[l].amount;
                e *= b;
                k++
            } while (0 === g.length || 0 + e > SLOT_CASH ||
                0 + e < a);
            TOTAL_MONEY += e + 0;
            SLOT_CASH -= e + 0;
            TOTAL_MONEY = parseFloat(TOTAL_MONEY.toFixed(2));
            SLOT_CASH = parseFloat(SLOT_CASH.toFixed(2));
            h && 2 < _iNumSymbolFreeSpin ? (_bFreespinEnable = !0, _iTotFreeSpin = NUM_FREESPIN[_iNumSymbolFreeSpin - 3]) : !0 === _bFreespinEnable && (_iTotFreeSpin--, 0 > _iTotFreeSpin && (_iTotFreeSpin = 0, _bFreespinEnable = !1));
            a = {
                res: !0,
                win: !0,
                pattern: _aFinalSymbols,
                win_lines: g,
                money: TOTAL_MONEY,
                tot_win: e,
                freespin: h,
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
        d.call(f, a)
    }
}

function apiAttemptBonus(a, b, c) {
    for (var d = [], f = 0; f < BONUS_PRIZE_OCCURRENCE.length; f++)
        for (var h = BONUS_PRIZE_OCCURRENCE[f], k = 0; k < h; k++) d.push(f);
    h = Math.floor(Math.random() * MAX_PRIZES_BONUS) + 1;
    k = [];
    var g = 0,
        e = !1,
        l = 0;
    for (f = 0; f < h; f++) {
        var v = BONUS_PRIZE[d[Math.floor(Math.random() * d.length)]] * a;
        l < v && (l = v);
        g + v > SLOT_CASH && (v = 0);
        g += v;
        k.push(v);
        TOTAL_MONEY += v;
        SLOT_CASH -= v;
        TOTAL_MONEY = parseFloat(TOTAL_MONEY.toFixed(2));
        SLOT_CASH = parseFloat(SLOT_CASH.toFixed(2))
    }
    0 === k.length ? (k = [0], g = 0) : 1 < k.length && l === k[k.length -
        1] && (e = !0);
    a = {
        res: !0,
        money: TOTAL_MONEY,
        bonus_win: g,
        prize_list: JSON.stringify(k),
        final_prize: e
    };
    b.call(c, a)
}

function checkWin(a, b) {
    for (var c = [], d = 0; d < b; d++) {
        var f = _aPaylineCombo[d],
            h = [],
            k = _aFinalSymbols[f[0].row][f[0].col],
            g = 1,
            e = 1;
        for (h.push({
                row: f[0].row,
                col: f[0].col,
                value: _aFinalSymbols[f[0].row][f[0].col]
            }); k === WILD_SYMBOL && e < NUM_REELS;) g++, k = _aFinalSymbols[f[e].row][f[e].col], h.push({
            row: f[e].row,
            col: f[e].col,
            value: _aFinalSymbols[f[e].row][f[e].col]
        }), e++;
        for (; e < f.length; e++)
            if (_aFinalSymbols[f[e].row][f[e].col] === k || _aFinalSymbols[f[e].row][f[e].col] === WILD_SYMBOL) g++, h.push({
                row: f[e].row,
                col: f[e].col,
                value: _aFinalSymbols[f[e].row][f[e].col]
            });
            else break;
        !(0 < _aSymbolWin[k][g - 1]) || a && k === FREESPIN_SYMBOL || _bBonus && k === BONUS_SYMBOL || (h.sort(sortListByCol), c.push({
            line: d + 1,
            amount: _aSymbolWin[k][g - 1],
            num_win: g,
            value: k,
            list: h
        }))
    }
    if (a) {
        h = [];
        for (d = 0; d < NUM_ROWS; d++)
            for (f = 0; f < NUM_REELS; f++) _aFinalSymbols[d][f] === FREESPIN_SYMBOL && h.push({
                row: d,
                col: f,
                value: FREESPIN_SYMBOL
            });
        h.sort(sortListByCol);
        c.push({
            line: 0,
            amount: 0,
            num_win: h.length,
            value: FREESPIN_SYMBOL,
            list: h
        })
    } else if (_bBonus) {
        h = [];
        for (d = 0; d < NUM_ROWS; d++)
            for (f =
                0; f < NUM_REELS; f++) _aFinalSymbols[d][f] === BONUS_SYMBOL && h.push({
                row: d,
                col: f,
                value: BONUS_SYMBOL
            });
        h.sort(sortListByCol);
        c.push({
            line: 0,
            amount: 0,
            num_win: h.length,
            value: BONUS_SYMBOL,
            list: h
        })
    }
    return c
}

function generateRandomSymbols(a) {
    _aFinalSymbols = [];
    for (var b = 0; b < NUM_ROWS; b++) {
        _aFinalSymbols[b] = [];
        for (var c = 0; c < NUM_REELS; c++) {
            do {
                var d = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
                _aFinalSymbols[b][c] = d
            } while (d === BONUS_SYMBOL || d === FREESPIN_SYMBOL)
        }
    }
    if (a) {
        a = [];
        for (b = 0; b < _iFreespinSymbolNumOccur.length; b++)
            for (c = 0; c < _iFreespinSymbolNumOccur[b]; c++) a.push(b);
        _iNumSymbolFreeSpin = 3 + a[Math.floor(Math.random() * a.length)];
        b = [0, 1, 2, 3, 4];
        b = shuffle(b);
        for (c = 0; c < _iNumSymbolFreeSpin; c++) a =
            Math.floor(3 * Math.random()), _aFinalSymbols[a][b[c]] = FREESPIN_SYMBOL
    } else if (_bBonus)
        for (b = [0, 1, 2, 3, 4], b = shuffle(b), d = Math.floor(3 * Math.random() + 3), c = 0; c < d; c++) a = Math.floor(3 * Math.random()), _aFinalSymbols[a][b[c]] = BONUS_SYMBOL
}

function generLosingPattern() {
    for (var a = [], b = 0; b < NUM_ROWS; b++) {
        do var c = Math.floor(Math.random() * s_aRandSymbols.length); while (s_aRandSymbols[c] === BONUS_SYMBOL || s_aRandSymbols[c] === FREESPIN_SYMBOL || s_aRandSymbols[c] === WILD_SYMBOL);
        c = s_aRandSymbols[c];
        a[b] = c
    }
    var d = 0,
        f = 0;
    _aFinalSymbols = [];
    for (b = 0; b < NUM_ROWS; b++) {
        _aFinalSymbols[b] = [];
        for (var h = 0; h < NUM_REELS; h++)
            if (0 == h) _aFinalSymbols[b][h] = a[b];
            else {
                do c = Math.floor(Math.random() * s_aRandSymbols.length), c = s_aRandSymbols[c]; while (a[0] === c || a[1] === c || a[2] ===
                    c || c === BONUS_SYMBOL && 2 === d || c === FREESPIN_SYMBOL && 2 === f || c === WILD_SYMBOL);
                _aFinalSymbols[b][h] = c;
                c === BONUS_SYMBOL ? d++ : c === FREESPIN_SYMBOL && f++
            }
    }
    return _aFinalSymbols
}

function refreshCredit(a, b, c) {
    TOTAL_MONEY = a;
    b.call(c, TOTAL_MONEY)
}

function formatEntries(a) {
    return a.toFixed(2)
}

function _dieError(a, b, c) {
    b.call(c, "res=false&desc=" + a)
}

function sortListByCol(a, b) {
    return a.col < b.col ? -1 : a.col > b.col ? 1 : 0
}

function _initSymbolWin() {
    _aSymbolWin = [];
    for (var a = 0; a < PAYTABLE_VALUES.length; a++) {
        _aSymbolWin[a] = [];
        for (var b = 0; b < PAYTABLE_VALUES[a].length; b++) _aSymbolWin[a][b] = PAYTABLE_VALUES[a][b]
    }
    for (a = PAYTABLE_VALUES.length; a < NUM_SYMBOLS; a++) _aSymbolWin[a] = [0, 0, 0, 0, 0]
}

function _setMinWin() {
    _iMinWin = 9999999999999;
    for (var a = 0; a < _aSymbolWin.length; a++)
        for (var b = _aSymbolWin[a], c = 0; c < b.length; c++) 0 !== b[c] && b[c] < _iMinWin && (_iMinWin = b[c])
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
        this._initSymbolAnims();
        this._initSymbolsOccurence()
    };
    this._initSymbolSpriteSheets = function() {
        s_aSymbolData = [];
        for (var a = 0; a < NUM_SYMBOLS; a++) {
            var b = s_oSpriteLibrary.getSprite("symbol_" + a);
            s_aSymbolData[a] = new createjs.SpriteSheet({
                images: [b],
                frames: {
                    width: SYMBOL_WIDTH,
                    height: b.height,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    "static": 0,
                    moving: 1
                }
            })
        }
    };
    this._initSymbolsOccurence = function() {
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
    this._initSymbolAnims = function() {
        s_aSymbolAnims = [];
        for (var a = 0; a < NUM_SYMBOLS; a++) {
            var b = {
                framerate: FPS,
                images: [s_oSpriteLibrary.getSprite("symbol_" + a + "_0"), s_oSpriteLibrary.getSprite("symbol_" +
                    a + "_1"), s_oSpriteLibrary.getSprite("symbol_" + a + "_2"), s_oSpriteLibrary.getSprite("symbol_" + a + "_3"), s_oSpriteLibrary.getSprite("symbol_" + a + "_4"), s_oSpriteLibrary.getSprite("symbol_" + a + "_5"), s_oSpriteLibrary.getSprite("symbol_" + a + "_6"), s_oSpriteLibrary.getSprite("symbol_" + a + "_7")],
                frames: {
                    width: SYMBOL_ANIM_WIDTH,
                    height: SYMBOL_ANIM_HEIGHT
                },
                animations: {
                    "static": 0,
                    anim: [0, 119]
                }
            };
            s_aSymbolAnims[a] = new createjs.SpriteSheet(b)
        }
    };
    this._init()
}
var s_aSymbolData, s_aPaylineCombo, s_aSymbolAnims, s_aRandSymbols;

function CMenu() {
    var a, b, c, d, f, h, k, g, e = null,
        l = null,
        v, y, u, w, E, G, x, z;
    this._init = function() {
        v = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oAttachSection.addChild(v);
        var m = s_oSpriteLibrary.getSprite("logo_menu"),
            r = createBitmap(m);
        r.regX = m.width / 2;
        r.regY = m.height / 2;
        r.x = CANVAS_WIDTH / 2;
        r.y = CANVAS_HEIGHT / 2 + 100;
        r.alpha = 0;
        s_oAttachSection.addChild(r);
        m = s_oSpriteLibrary.getSprite("but_play");
        y = new CGfxButton(CANVAS_WIDTH / 2 + 450, CANVAS_HEIGHT - 300, m, s_oAttachSection);
        y.addEventListener(ON_MOUSE_UP, this._onButPlayRelease,
            this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) m = s_oSpriteLibrary.getSprite("audio_icon"), k = CANVAS_WIDTH - m.width / 4 - 4, g = m.height / 2 + 4, w = new CToggle(k, g, m, s_bAudioActive), w.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        SHOW_CREDITS ? (m = s_oSpriteLibrary.getSprite("but_credits"), a = m.width / 2 + 4, b = m.height / 2 + 4, E = new CGfxButton(a, b, m, s_oAttachSection), E.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this), f = a + m.width + 4, h = b) : (f = m.width / 2 + 4, h = m.height / 2 + 4);
        m = window.document;
        var F = m.documentElement;
        e = F.requestFullscreen || F.mozRequestFullScreen || F.webkitRequestFullScreen || F.msRequestFullscreen;
        l = m.exitFullscreen || m.mozCancelFullScreen || m.webkitExitFullscreen || m.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (e = !1);
        e && screenfull.isEnabled && (m = s_oSpriteLibrary.getSprite("but_fullscreen"), G = new CToggle(f, h, m, s_bFullscreen, s_oAttachSection), G.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        m = s_oSpriteLibrary.getSprite("but_delete_savings");
        c = m.width / 2 + 4;
        d = CANVAS_HEIGHT - m.height / 2 - 4;
        u = new CGfxButton(c,
            d, m, s_oAttachSection);
        u.addEventListener(ON_MOUSE_UP, this._onDeleteSavings, this);
        s_bStorageAvailable ? !RESTART_CREDIT && getItem(LOCALSTORAGE_STRING + "score") ? TOTAL_MONEY = parseFloat(getItem(LOCALSTORAGE_STRING + "score")) : u.setVisible(!1) : (s_oMsgBox.show(TEXT_ERR_LS), u.setVisible(!1));
        z = new CAreYouSurePanel;
        z.addEventListener(ON_BUT_YES_DOWN, this._onExitYes, this);
        x = new createjs.Shape;
        x.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oAttachSection.addChild(x);
        createjs.Tween.get(x).to({
                alpha: 0
            },
            400).call(function() {
            x.visible = !1
        });
        this.refreshButtonPos();
        createjs.Tween.get(r).to({
            alpha: 1
        }, 800, createjs.Ease.quintOut)
    };
    this.unload = function() {
        y.unload();
        y = null;
        u.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) w.unload(), w = null;
        SHOW_CREDITS && E.unload();
        e && screenfull.isEnabled && G.unload();
        s_oAttachSection.removeChild(v);
        v = null;
        s_oAttachSection.removeChild(x);
        s_oMenu = x = null
    };
    this.refreshButtonPos = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || w.setPosition(k - s_iOffsetX, s_iOffsetY +
            g);
        SHOW_CREDITS && E.setPosition(a + s_iOffsetX, b + s_iOffsetY);
        e && screenfull.isEnabled && G.setPosition(f + s_iOffsetX, h + s_iOffsetY);
        u.setPosition(c + s_iOffsetX, d - s_iOffsetY)
    };
    this._onButPlayRelease = function() {
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
        s_bFullscreen ? l.call(window.document) : e.call(window.document.documentElement);
        sizeHandler()
    };
    this._onDeleteSavings = function() {
        z.show(TEXT_DELETE_SAVINGS + ": " + START_MONEY + TEXT_CURRENCY + "\n" + TEXT_ARE_SURE)
    };
    this._onExitYes = function() {
        clearLocalStorage();
        u.setVisible(!1)
    };
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CCreditsPanel() {
    var a, b, c, d, f, h, k, g, e = this;
    this._init = function() {
        g = new createjs.Container;
        s_oStage.addChild(g);
        c = new createjs.Shape;
        b = c.on("click", function() {});
        c.alpha = 0;
        c.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        g.addChild(c);
        d = new createjs.Container;
        g.addChild(d);
        var l = s_oSpriteLibrary.getSprite("msg_box");
        k = createBitmap(l);
        k.regX = l.width / 2;
        k.regY = l.height / 2;
        d.addChild(k);
        a = k.on("click", this._onLogoButRelease);
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2;
        l = new createjs.Text("www.codethislab.com",
            "52px " + FONT_GAME_1, "#fede00");
        l.y = 210;
        l.textAlign = "center";
        l.textBaseline = "alphabetic";
        l.lineWidth = 300;
        d.addChild(l);
        l = s_oSpriteLibrary.getSprite("ctl_logo");
        h = createBitmap(l);
        h.y = -70;
        h.regX = l.width / 2;
        h.regY = l.height / 2;
        d.addChild(h);
        l = s_oSpriteLibrary.getSprite("but_yes");
        f = new CGfxButton(0, 360, l, d);
        f.addEventListener(ON_MOUSE_UP, this.hide, this);
        d.scale = 0;
        c.alpha = 0;
        createjs.Tween.get(c).to({
            alpha: .7
        }, 300, createjs.Ease.quartOut);
        createjs.Tween.get(d).to({
            scale: 1
        }, 1E3, createjs.Ease.elasticOut)
    };
    this.unload =
        function() {
            createjs.Tween.get(g).to({
                alpha: 0
            }, 500).call(function() {
                s_oStage.removeChild(g);
                f.unload()
            });
            c.off("click", b);
            k.off("click", a)
        };
    this._onLogoButRelease = function() {
        window.open("http://www.codethislab.com/index.php?&l=en")
    };
    this.hide = function() {
        f.disable();
        createjs.Tween.get(c).to({
            alpha: 0
        }, 500, createjs.Ease.quartOut);
        createjs.Tween.get(d).to({
            scale: 0
        }, 500, createjs.Ease.backIn).call(function() {
            e.unload()
        })
    };
    this._init()
}

function CAreYouSurePanel() {
    var a, b, c, d, f, h, k, g, e, l, v = this;
    this._init = function() {
        a = [];
        b = [];
        e = new createjs.Container;
        e.visible = !1;
        s_oStage.addChild(e);
        l = new createjs.Shape;
        c = l.on("click", function() {});
        l.alpha = 0;
        l.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e.addChild(l);
        var y = s_oSpriteLibrary.getSprite("msg_box_small");
        g = new createjs.Container;
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT / 2;
        g.regX = .5 * y.width;
        g.regY = .5 * y.height;
        e.addChild(g);
        d = createBitmap(y);
        g.addChild(d);
        f = new CTLText(g,
            50, 80, y.width - 100, 140, 70, "center", "#fede00", FONT_GAME_1, 1, 0, 0, TEXT_ARE_SURE, !0, !0, !0, !1);
        h = new CGfxButton(y.width - 130, 304, s_oSpriteLibrary.getSprite("but_yes"), g);
        h.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        k = new CGfxButton(130, 304, s_oSpriteLibrary.getSprite("but_no"), g);
        k.addEventListener(ON_MOUSE_UP, this._onButNo, this);
        this.disableButtons()
    };
    this.addEventListener = function(y, u, w) {
        a[y] = u;
        b[y] = w
    };
    this.disableButtons = function() {
        h.disable();
        k.disable()
    };
    this.enableButtons = function() {
        k.enable();
        h.enable()
    };
    this.show = function(y) {
        f.refreshText(y);
        e.visible = !0;
        g.scale = 0;
        l.alpha = 0;
        createjs.Tween.get(l).to({
            alpha: .7
        }, 300, createjs.Ease.quartOut);
        createjs.Tween.get(g).to({
            scale: 1
        }, 1E3, createjs.Ease.elasticOut).call(function() {
            v.enableButtons()
        })
    };
    this.hide = function(y) {
        createjs.Tween.get(l).to({
            alpha: 0
        }, 500, createjs.Ease.quartOut);
        createjs.Tween.get(g).to({
            scale: 0
        }, 500, createjs.Ease.backIn).call(function() {
            e.visible = !1;
            y && a[ON_BUT_YES_DOWN] && a[ON_BUT_YES_DOWN].call(b[ON_BUT_YES_DOWN])
        })
    };
    this.unload =
        function() {
            k.unload();
            h.unload();
            l.off("click", c)
        };
    this._onButYes = function() {
        v.disableButtons();
        v.hide(!0)
    };
    this._onButNo = function() {
        v.disableButtons();
        v.hide(!1)
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
    setShadow: function(a, b, c, d) {
        null !== this._oText && (this._oText.shadow = new createjs.Shadow(a, b, c, d))
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

function CTLText(a, b, c, d, f, h, k, g, e, l, v, y, u, w, E, G, x) {
    this._oContainer = a;
    this._x = b;
    this._y = c;
    this._iWidth = d;
    this._iHeight = f;
    this._bMultiline = G;
    this._iFontSize = h;
    this._szAlign = k;
    this._szColor = g;
    this._szFont = e;
    this._iPaddingH = v;
    this._iPaddingV = y;
    this._bVerticalAlign = E;
    this._bFitText = w;
    this._bDebug = x;
    this._oDebugShape = null;
    this._fLineHeightFactor = l;
    this._oText = null;
    u && this.__createText(u)
}

function CPreloader() {
    var a, b, c, d, f, h, k, g, e;
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
        var l = new createjs.Shape;
        l.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e.addChild(l);
        l = s_oSpriteLibrary.getSprite("200x200");
        k = createBitmap(l);
        k.regX = .5 * l.width;
        k.regY = .5 * l.height;
        k.x = CANVAS_WIDTH / 2;
        k.y = CANVAS_HEIGHT / 2 - 120;
        e.addChild(k);
        g = new createjs.Shape;
        g.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(k.x - 100, k.y - 100, 200, 200, 10);
        e.addChild(g);
        k.mask = g;
        l = s_oSpriteLibrary.getSprite("progress_bar");
        d = createBitmap(l);
        d.x = CANVAS_WIDTH / 2 -
            l.width / 2;
        d.y = CANVAS_HEIGHT / 2 + 50;
        e.addChild(d);
        a = l.width;
        b = l.height;
        f = new createjs.Shape;
        f.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, 1, b);
        e.addChild(f);
        d.mask = f;
        c = new createjs.Text("", "30px " + FONT_GAME_1, "#fede00");
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2 + 120;
        c.textBaseline = "alphabetic";
        c.textAlign = "center";
        e.addChild(c);
        h = new createjs.Shape;
        h.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e.addChild(h);
        createjs.Tween.get(h).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(h);
            e.removeChild(h)
        })
    };
    this.refreshLoader = function(l) {
        c.text = l + "%";
        100 === l && (s_oMain._onRemovePreloader(), c.visible = !1, d.visible = !1);
        f.graphics.clear();
        l = Math.floor(l * a / 100);
        f.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, l, b)
    };
    this._init()
}

function CMain(a) {
    var b, c = 0,
        d = 0,
        f = STATE_LOADING,
        h, k;
    this.initContainer = function() {
        var e = document.getElementById("canvas");
        s_oStage = new createjs.Stage(e);
        s_oAttachSection = new createjs.Container;
        s_oStage.addChild(s_oAttachSection);
        s_oStage.preventSelection = !1;
        createjs.Touch.enable(s_oStage, !0);
        s_bMobile = isMobile();
        !1 === s_bMobile && s_oStage.enableMouseOver(20);
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.framerate = FPS;
        createjs.Ticker.addEventListener("tick", this._update);
        navigator.userAgent.match(/Windows Phone/i) &&
            (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
         h = new CPreloader
    };
    this.preloaderReady = function() {
        this._loadImages();
        (!1 === DISABLE_SOUND_DESKTOP && !1 === s_bMobile || !0 === s_bMobile && !1 === DISABLE_SOUND_MOBILE) && this._initSounds();
        b = !0
    };
    this.soundLoaded = function() {
        c++;
        h.refreshLoader(Math.floor(c / d * 100))
    };
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "ambience_game",
            loop: !0,
            volume: 1,
            ingamename: "ambience_game"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "press_but",
            loop: !1,
            volume: 1,
            ingamename: "press_but"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "click",
            loop: !1,
            volume: 1,
            ingamename: "click"
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
            filename: "symbol0",
            loop: !1,
            volume: 1,
            ingamename: "symbol0"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol1",
            loop: !1,
            volume: 1,
            ingamename: "symbol1"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol2",
            loop: !1,
            volume: 1,
            ingamename: "symbol2"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol3",
            loop: !1,
            volume: 1,
            ingamename: "symbol3"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol4",
            loop: !1,
            volume: 1,
            ingamename: "symbol4"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol5",
            loop: !1,
            volume: 1,
            ingamename: "symbol5"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol6",
            loop: !1,
            volume: 1,
            ingamename: "symbol6"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol7",
            loop: !1,
            volume: 1,
            ingamename: "symbol7"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol8",
            loop: !1,
            volume: 1,
            ingamename: "symbol8"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol9",
            loop: !1,
            volume: 1,
            ingamename: "symbol9"
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
            filename: "bonus_end",
            loop: !1,
            volume: 1,
            ingamename: "bonus_end"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "bonus_end_win",
            loop: !1,
            volume: 1,
            ingamename: "bonus_end_win"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "character_jump",
            loop: !1,
            volume: 1,
            ingamename: "character_jump"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "character_landing",
            loop: !1,
            volume: 1,
            ingamename: "character_landing"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "soundtrack_bonus",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack_bonus"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "character_landing_pot",
            loop: !1,
            volume: 1,
            ingamename: "character_landing_pot"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "character_falling",
            loop: !1,
            volume: 1,
            ingamename: "character_falling"
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
            filename: "suspance",
            loop: !0,
            volume: 1,
            ingamename: "suspance"
        });
        d += s_aSoundsInfo.length;
        s_aSounds = [];
        for (var e = 0; e < s_aSoundsInfo.length; e++) this.tryToLoadSound(s_aSoundsInfo[e], !1)
    };
    this.tryToLoadSound = function(e, l) {
        setTimeout(function() {
            s_aSounds[e.ingamename] = new Howl({
                src: [e.path + e.filename +
                    ".mp3"
                ],
                autoplay: !1,
                preload: !0,
                loop: e.loop,
                volume: e.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function(v, y) {
                    for (var u = 0; u < s_aSoundsInfo.length; u++)
                        if (v === s_aSounds[s_aSoundsInfo[u].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[u], !0);
                            break
                        }
                },
                onplayerror: function(v) {
                    for (var y = 0; y < s_aSoundsInfo.length; y++)
                        if (v === s_aSounds[s_aSoundsInfo[y].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[y].ingamename].once("unlock", function() {
                                s_aSounds[s_aSoundsInfo[y].ingamename].play();
                                "ambience_game" ===
                                s_aSoundsInfo[y].ingamename && null !== s_oGame && setVolume("ambience_game", SOUNDTRACK_VOLUME_IN_GAME)
                            });
                            break
                        }
                }
            })
        }, l ? 200 : 0)
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("paytable1", "./sprites/paytable1.jpg");
        s_oSpriteLibrary.addSprite("paytable2", "./sprites/paytable2.jpg");
        s_oSpriteLibrary.addSprite("paytable3", "./sprites/paytable3.jpg");
        s_oSpriteLibrary.addSprite("paytable4",
            "./sprites/paytable4.jpg");
        s_oSpriteLibrary.addSprite("mask_slot", "./sprites/mask_slot.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_0", "./sprites/win_frame_anim_0.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_1", "./sprites/win_frame_anim_1.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_big_0", "./sprites/win_frame_anim_big_0.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_big_1", "./sprites/win_frame_anim_big_1.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_big_2", "./sprites/win_frame_anim_big_2.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_big_3", "./sprites/win_frame_anim_big_3.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_big_4", "./sprites/win_frame_anim_big_4.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_big_5", "./sprites/win_frame_anim_big_5.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_big_6", "./sprites/win_frame_anim_big_6.png");
        s_oSpriteLibrary.addSprite("win_frame_anim_big_7", "./sprites/win_frame_anim_big_7.png");
        s_oSpriteLibrary.addSprite("but_text", "./sprites/but_text.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("msg_box_small", "./sprites/msg_box_small.png");
        s_oSpriteLibrary.addSprite("but_arrow_next", "./sprites/but_arrow_next.png");
        s_oSpriteLibrary.addSprite("but_arrow_prev", "./sprites/but_arrow_prev.png");
        s_oSpriteLibrary.addSprite("bg_loading_bonus", "./sprites/bg_loading_bonus.jpg");
        s_oSpriteLibrary.addSprite("but_exit_info", "./sprites/but_exit_info.png");
        s_oSpriteLibrary.addSprite("bg_freespins", "./sprites/bg_freespins.png");
        s_oSpriteLibrary.addSprite("amount_freespins", "./sprites/amount_freespins.png");
        s_oSpriteLibrary.addSprite("amount_freespin_win", "./sprites/amount_freespin_win.png");
        s_oSpriteLibrary.addSprite("amount_bonus_win", "./sprites/amount_bonus_win.png");
        for (var e = 0; 62 > e; e++) s_oSpriteLibrary.addSprite("logo_" + e, "./sprites/logo/logo_" + e + ".png");
        for (e = 0; e < NUM_SYMBOLS; e++) {
            s_oSpriteLibrary.addSprite("symbol_" + e, "./sprites/symbol_" + e + ".png");
            for (var l = 0; 8 > l; l++) s_oSpriteLibrary.addSprite("symbol_" + e + "_" + l, "./sprites/symbols/symbol_" +
                e + "_" + l + ".jpg")
        }
        s_oSpriteLibrary.addSprite("bet_but", "./sprites/paylines/bet_but.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_delete_savings", "./sprites/but_delete_savings.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("logo_menu", "./sprites/logo_menu.png");
        for (e = 1; e < NUM_PAYLINES + 1; e++) s_oSpriteLibrary.addSprite("payline_" + e, "./sprites/paylines/payline_" + e + ".png");
        for (e = 0; 191 > e; e++) s_oSpriteLibrary.addSprite("suspance_" + e, "./sprites/suspance/suspance_" + e + ".png");
        for (e = 0; 289 > e; e++) s_oSpriteLibrary.addSprite("avatar_" + e, "./sprites/avatar/avatar_" + e + ".png");
        d += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        c++;
        h.refreshLoader(Math.floor(c / d * 100))
    };
    this._onAllImagesLoaded = function() {};
    this._onRemovePreloader = function() {
        APIgetSlotInfos(this.settingPhase, this)
    };
    this.settingPhase = function(e) {
        try {
            saveItem(LOCALSTORAGE_STRING +
                "ls_available", "ok")
        } catch (l) {
            s_bStorageAvailable = !1
        }
        s_oGameSettings = new CSlotSettings;
        s_oMsgBox = new CMsgBox;
        h.unload();
        COIN_BET = e.bets;
        START_BET = e.start_bet;
        MIN_BET = e.bets[0];
        MIN_REEL_LOOPS = g.min_reel_loop;
        REEL_DELAY = g.reel_delay;
        TIME_SHOW_WIN = g.time_show_win;
        TIME_SHOW_ALL_WINS = g.time_show_all_wins;
        ENABLE_FULLSCREEN = a.fullscreen;
        SHOW_CREDITS = a.show_credits;
        ENABLE_CHECK_ORIENTATION = a.check_orientation;
        PAYTABLE_VALUES = e.paytable;
        playSound("ambience_game", 1, !0);
        this.gotoMenu()
    };
    this.gotoMenu = function() {
        _oMenu =
            new CMenu;
        f = STATE_MENU
    };
    this.gotoGame = function() {
        k = new CGame(g);
        f = STATE_GAME
    };
    this.stopUpdate = function() {
        b = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || Howler.mute(!0)
    };
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        b = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && s_bAudioActive && Howler.mute(!1)
    };
    this.stopUpdateNoBlock = function() {
        b = !1;
        createjs.Ticker.paused = !0
    };
    this.startUpdateNoBlock = function() {
        s_iPrevTime = (new Date).getTime();
        b = !0;
        createjs.Ticker.paused = !1
    };
    this._update = function(e) {
        if (!1 !== b) {
            var l = (new Date).getTime();
            s_iTimeElaps = l - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = l;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            f === STATE_GAME && k.update();
            s_oStage.update(e)
        }
    };
    s_oMain = this;
    var g = a;
    ENABLE_CHECK_ORIENTATION = g.check_orientation;
    NUM_SPIN_FOR_ADS = a.num_spin_for_ads;
    RESTART_CREDIT = a.restart_credit;
    s_bAudioActive =
        a.audio_enable_on_startup;
    TOTAL_MONEY = START_MONEY = a.start_credit;
    this.initContainer()
}
var s_bMobile, s_bFullscreen = !1,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oDrawLayer, s_oStage, s_oAttachSection, s_oMain, s_oSpriteLibrary, s_oMsgBox, s_oGameSettings, s_aSounds, s_aSoundsInfo, s_bStorageAvailable = !0;

function CSpriteSheetTextButton(a, b, c, d, f, h, k, g) {
    var e, l, v, y, u, w, E, G, x, z, m, r;
    this._init = function(F, D, B, J, A, N, O, S) {
        e = !1;
        y = N;
        u = [];
        w = [];
        r = S;
        l = B.width / 2;
        v = B.height;
        x = new createjs.Container;
        x.x = F;
        x.y = D;
        x.regX = l / 2;
        x.regY = v / 2;
        x.cursor = "pointer";
        r.addChild(x);
        F = new createjs.SpriteSheet({
            images: [B],
            frames: {
                width: l,
                height: v
            },
            animations: {
                state_enable: 0,
                state_disable: 1
            }
        });
        z = createSprite(F, "state_enable", 0, 0, l, v);
        x.addChild(z);
        m = new CTLText(x, 10, 10, l - 20, v - 26, O, "center", N, A, 1.1, 0, 0, J, !0, !0, !1, !1);
        this._initListener()
    };
    this.unload = function() {
        x.off("mousedown", E);
        x.off("pressup", G);
        r.removeChild(x)
    };
    this.setVisible = function(F) {
        x.visible = F
    };
    this.enable = function() {
        e = !1;
        z.gotoAndStop("state_enable");
        m.setColor(y)
    };
    this.disable = function() {
        e = !0;
        z.gotoAndStop("state_disable");
        m.setColor("#636363")
    };
    this.setText = function(F) {
        m.refreshText(F)
    };
    this._initListener = function() {
        E = x.on("mousedown", this.buttonDown);
        G = x.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(F, D, B) {
        u[F] = D;
        w[F] = B
    };
    this.buttonRelease = function() {
        e ||
            (playSound("press_but", 1, !1), x.scaleX = 1, x.scaleY = 1, u[ON_MOUSE_UP] && u[ON_MOUSE_UP].call(w[ON_MOUSE_UP]))
    };
    this.buttonDown = function() {
        e || (x.scaleX = .9, x.scaleY = .9, u[ON_MOUSE_DOWN] && u[ON_MOUSE_DOWN].call(w[ON_MOUSE_DOWN]))
    };
    this.setPosition = function(F, D) {
        x.x = F;
        x.y = D
    };
    this.changeText = function(F) {
        m.refreshText(F)
    };
    this.setX = function(F) {
        x.x = F
    };
    this.setY = function(F) {
        x.y = F
    };
    this.getButtonImage = function() {
        return x
    };
    this.getX = function() {
        return x.x
    };
    this.getY = function() {
        return x.y
    };
    this.getText = function() {
        return m.getString()
    };
    this._init(a, b, c, d, f, h, k, g);
    return this
}

function CGfxButton(a, b, c, d) {
    var f, h, k, g, e, l, v, y, u;
    this._init = function(w, E, G, x) {
        f = !1;
        h = 1;
        k = [];
        g = [];
        u = createBitmap(G);
        u.x = w;
        u.y = E;
        u.scaleX = u.scaleY = h;
        u.regX = G.width / 2;
        u.regY = G.height / 2;
        x.addChild(u);
        this._initListener()
    };
    this.unload = function() {
        u.off("mousedown", l);
        u.off("pressup", v);
        s_bMobile || u.off("mouseover", y);
        createjs.Tween.removeTweens(u);
        d.removeChild(u)
    };
    this.setVisible = function(w) {
        u.visible = w
    };
    this.enable = function() {
        f = !1
    };
    this.disable = function() {
        f = !0
    };
    this._initListener = function() {
        l = u.on("mousedown",
            this.buttonDown);
        v = u.on("pressup", this.buttonRelease);
        s_bMobile || (y = u.on("mouseover", this.buttonOver))
    };
    this.addEventListener = function(w, E, G) {
        k[w] = E;
        g[w] = G
    };
    this.addEventListenerWithParams = function(w, E, G, x) {
        k[w] = E;
        g[w] = G;
        e = x
    };
    this.buttonRelease = function() {
        f || (u.scaleX = h, u.scaleY = h, playSound("press_but", 1, !1), k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(g[ON_MOUSE_UP], e))
    };
    this.buttonDown = function() {
        f || (u.scaleX = .9 * h, u.scaleY = .9 * h, k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN], e))
    };
    this.buttonOver =
        function(w) {
            s_bMobile || f || (w.target.cursor = "pointer")
        };
    this.pulseAnimation = function() {
        createjs.Tween.get(u, {
            loop: -1
        }).to({
            scaleX: 1.1 * h,
            scaleY: 1.1 * h
        }, 850, createjs.Ease.quadOut).to({
            scaleX: h,
            scaleY: h
        }, 650, createjs.Ease.quadIn)
    };
    this.moveY = function(w, E, G, x) {
        createjs.Tween.get(u).wait(G).to({
            y: w
        }, E, x)
    };
    this.setPosition = function(w, E) {
        u.x = w;
        u.y = E
    };
    this.setX = function(w) {
        u.x = w
    };
    this.setY = function(w) {
        u.y = w
    };
    this.getButtonImage = function() {
        return u
    };
    this.getX = function() {
        return u.x
    };
    this.getY = function() {
        return u.y
    };
    this._init(a, b, c, d);
    return this
}

function CToggle(a, b, c, d, f) {
    var h, k, g, e, l, v, y;
    this._init = function(u, w, E, G, x) {
        y = void 0 !== x ? x : s_oStage;
        k = [];
        g = [];
        x = new createjs.SpriteSheet({
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
        h = G;
        e = createSprite(x, "state_" + h, E.width / 2 / 2, E.height / 2, E.width / 2, E.height);
        e.x = u;
        e.y = w;
        e.stop();
        s_bMobile || (e.cursor = "pointer");
        y.addChild(e);
        this._initListener()
    };
    this.unload = function() {
        e.off("mousedown", l);
        e.off("pressup", v);
        y.removeChild(e)
    };
    this._initListener = function() {
        l = e.on("mousedown", this.buttonDown);
        v = e.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(u, w, E) {
        k[u] = w;
        g[u] = E
    };
    this.setCursorType = function(u) {
        e.cursor = u
    };
    this.setActive = function(u) {
        h = u;
        e.gotoAndStop("state_" + h)
    };
    this.buttonRelease = function() {
        e.scaleX = 1;
        e.scaleY = 1;
        playSound("press_but", 1, !1);
        h = !h;
        e.gotoAndStop("state_" + h);
        k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(g[ON_MOUSE_UP], h)
    };
    this.buttonDown = function() {
        e.scaleX = .9;
        e.scaleY = .9;
        k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN])
    };
    this.setPosition = function(u, w) {
        e.x = u;
        e.y = w
    };
    this._init(a, b, c, d, f)
}

function CBetBut(a, b, c, d) {
    var f, h, k, g = [],
        e, l;
    this._init = function(y, u, w) {
        f = !1;
        h = [];
        k = [];
        l = new createjs.Container;
        l.x = y;
        l.y = u;
        v.addChild(l);
        y = {
            images: [s_oSpriteLibrary.getSprite("bet_but")],
            frames: {
                width: 102,
                height: 82
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
        y = new createjs.SpriteSheet(y);
        e = createSprite(y, w + "_on", 0, 0, 102, 82);
        e.stop();
        e.cursor = "pointer";
        l.addChild(e);
        this._initListener()
    };
    this.unload = function() {
        e.off("mousedown",
            this.buttonDown);
        e.off("pressup", this.buttonRelease);
        v.removeChild(e)
    };
    this.disable = function(y) {
        f = y
    };
    this.setVisible = function(y) {
        e.visible = y
    };
    this.setOn = function() {
        e.gotoAndStop(c + "_on")
    };
    this.setOff = function() {
        e.gotoAndStop(c + "_off")
    };
    this._initListener = function() {
        e.on("mousedown", this.buttonDown);
        e.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(y, u, w) {
        h[y] = u;
        k[y] = w
    };
    this.addEventListenerWithParams = function(y, u, w, E) {
        h[y] = u;
        k[y] = w;
        g = E
    };
    this.buttonRelease = function() {
        h[ON_MOUSE_UP] &&
            !1 === f && (playSound("press_but", 1, !1), h[ON_MOUSE_UP].call(k[ON_MOUSE_UP], g))
    };
    this.buttonDown = function() {
        h[ON_MOUSE_DOWN] && !1 === f && h[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN], g)
    };
    this.setPosition = function(y, u) {
        e.x = y;
        e.y = u
    };
    this.setX = function(y) {
        e.x = y
    };
    this.setY = function(y) {
        e.y = y
    };
    this.getButtonImage = function() {
        return e
    };
    this.getX = function() {
        return e.x
    };
    this.getY = function() {
        return e.y
    };
    var v = d;
    this._init(a, b, c)
}

function CGame() {
    var a = !1,
        b = !1,
        c, d, f, h, k, g, e, l, v, y, u, w, E, G, x, z, m, r, F, D, B, J, A, N, O, S, I, V, ba, Z, U, W, X, q, K, H = null,
        L, C, n, R;
    this._init = function() {
        f = GAME_STATE_IDLE;
        l = z = F = g = h = 0;
        S = [0, 1, 2, 3, 4];
        k = S[0];
        e = NUM_PAYLINES;
        w = TOTAL_MONEY;
        y = START_BET;
        y = parseFloat(y.toFixed(2));
        for (var p = 0; p < COIN_BET.length; p++)
            if (y === COIN_BET[p]) {
                B = p;
                break
            }
        u = y * e;
        c = !1;
        m = r = 0;
        D = [];
        s_oTweenController = new CTweenController;
        ba = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oAttachSection.addChild(ba);
        Z = createBitmap(s_oSpriteLibrary.getSprite("bg_freespins"));
        Z.alpha = 0;
        s_oAttachSection.addChild(Z);
        C = new createjs.Container;
        C.x = REEL_OFFSET_X;
        C.y = REEL_OFFSET_Y;
        C.scaleX = C.scaleY = REEL_SCALE;
        s_oAttachSection.addChild(C);
        this._initReels();
        W = createBitmap(s_oSpriteLibrary.getSprite("mask_slot"));
        W.x = -139;
        W.y = -58;
        C.addChild(W);
        V = [];
        for (p = 1; p < NUM_REELS; p++) V[p] = new CSuspanceEffect(START_REEL_OFFSET_X + p * (SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS), START_REEL_OFFSET_Y, C);
        p = [];
        for (var t = 0; 62 > t; t++) p.push(s_oSpriteLibrary.getSprite("logo_" + t));
        p = new createjs.SpriteSheet({
            images: p,
            frames: {
                width: 512,
                height: 209,
                regX: 256,
                regY: 0
            },
            animations: {
                normal: 0,
                freespin: [1, 61]
            }
        });
        U = createSprite(p, "normal", 256, 0, 512, 209);
        U.x = 750;
        U.y = -100;
        C.addChild(U);
        K = new CInterface(y, u, C);
        this._initStaticSymbols();
        R = new CAvatar(s_oAttachSection);
        R.show("idle");
        H = new CPayTablePanel;
        L = new CBonusPanel;
        X = new CFreespinPanel(s_oStage);
        q = new CResultFreespin(s_oStage);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        playSound("ambience_game", 1, !0);
        a = !0;
        w < u && new CRechargePanel
    };
    this.unload = function() {
        stopSound("ambience_game");
        K.unload();
        H.unload();
        for (var p = 0; p < A.length; p++) A[p].unload();
        for (p = 0; p < NUM_ROWS; p++)
            for (var t = 0; t < NUM_REELS; t++) N[p][t].unload();
        s_oMsgBox.unload();
        s_oAttachSection.removeAllChildren();
        s_oGame = null
    };
    this.refreshButtonPos = function() {
        K.refreshButtonPos();
        H.refreshButtonPos();
        L.refreshButtonPos();
        R.refreshButtonPos()
    };
    this._initReels = function() {
        n = new createjs.Container;
        C.addChild(n);
        var p = START_REEL_OFFSET_X = 122,
            t = START_REEL_OFFSET_Y = 83,
            M = new createjs.Shape;
        M.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(p,
            t, SYMBOL_WIDTH * NUM_REELS + SPACE_BETWEEN_SYMBOLS * (NUM_REELS - 1), SYMBOL_HEIGHT * NUM_ROWS + SPACE_HEIGHT_BETWEEN_SYMBOLS * (NUM_ROWS - 1));
        C.addChild(M);
        this._generateLosingPattern();
        var P = 0;
        A = [];
        for (var Q = 0; Q < NUM_REELS; Q++) A[Q] = new CReelColumn(Q, p, t, P, [I[0][Q], I[1][Q], I[2][Q]], n), A[Q + NUM_REELS] = new CReelColumn(Q + NUM_REELS, p, t + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS, P, [I[0][Q], I[1][Q], I[2][Q]], n), p += SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS, P += REEL_DELAY;
        n.mask = M
    };
    this._initStaticSymbols = function() {
        var p =
            REEL_OFFSET_X + START_REEL_OFFSET_X,
            t = REEL_OFFSET_Y + START_REEL_OFFSET_Y;
        N = [];
        for (var M = 0; M < NUM_ROWS; M++) {
            N[M] = [];
            for (var P = 0; P < NUM_REELS; P++) {
                var Q = new CStaticSymbolCell(M, P, p, t);
                N[M][P] = Q;
                p += (SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS) * REEL_SCALE
            }
            p = REEL_OFFSET_X + START_REEL_OFFSET_X;
            t += (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * REEL_SCALE
        }
    };
    this._generateRandSymbols = function() {
        for (var p = [], t = 0; t < NUM_ROWS; t++) p[t] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
        return p
    };
    this.reelArrived = function(p,
        t) {
        if (h > J)
            if (k === t) {
                if (!1 === A[p].isReadyToStop()) {
                    var M = p;
                    p < NUM_REELS ? (M += NUM_REELS, A[M].setReadyToStop(), A[p].restart([I[0][p], I[1][p], I[2][p]], !0)) : (M -= NUM_REELS, A[M].setReadyToStop(), A[p].restart([I[0][M], I[1][M], I[2][M]], !0))
                }
            } else A[p].restart(this._generateRandSymbols(), !1);
        else A[p].restart(this._generateRandSymbols(), !1), !b || 0 !== p && p !== NUM_REELS - 1 || h++
    };
    this.stopNextReel = function() {
        g++;
        if (0 === g % 2) {
            console.log("1 HIDE ALL");
            for (var p = 1; p < NUM_REELS; p++) V[p].hide();
            for (p = 0; p < NUM_ROWS; p++) I[p][k] ===
                BONUS_SYMBOL && E++, I[p][k] === FREESPIN_SYMBOL && G++;
            k = S[g / 2];
            g === 2 * NUM_REELS && this._endReelAnimation()
        }
        1 < k && (2 === E || 2 === G) ? (h = 0, J = SUSPANCE_REEL_LOOPS, console.log("SHOW " + k), V[k].show()) : J = MIN_REEL_LOOPS
    };
    this._realEndReelAnimation = function() {
        console.log("2 HIDE ALL");
        for (var p = 1; p < NUM_REELS; p++) V[p].hide(); - 1 !== D.indexOf(BONUS_GAME) || 0 < r ? (this.resetAutoSpin(), K.disableGuiButtons(c, 0 < r ? !0 : !1)) : c ? K.enableSpin(!0) : K.enableGuiButtons();
        K.setSpinState(TEXT_SPIN);
        "normal" !== U.currentAnimation && K.refreshFreeSpinNum(r);
        if (0 < O.length) {
            "normal" === U.currentAnimation && (R.show("win"), playSound("avatar_win", 1, !1));
            for (var t = 0; t < O.length; t++) {
                7 > O[t].value && H.highlightCombo(O[t].value, O[t].num_win);
                0 < O[t].line && K.showLine(O[t].line);
                var M = O[t].list;
                for (p = 0; p < M.length; p++) N[M[p].row][M[p].col].showWinFrame()
            }
            0 < x && K.refreshWinText(x);
            TIME_SHOW_ALL_WINS = 2E3;
            l = 0;
            f = GAME_STATE_SHOW_ALL_WIN;
            K.refreshMoney(w)
        } else if (0 < r) K.disableSpin(0 < r ? !1 : !0), this.onSpin();
        else if ("freespin" === U.currentAnimation && (q.show(z), U.gotoAndStop("normal"),
                K.refreshFreeSpinNum(""), K.refreshFreeSpinAmount(0), createjs.Tween.get(Z).to({
                    alpha: 0
                }, 2E3, createjs.Ease.cubicOut), setVolume("ambience_game", 1), stopSound("freespin_soundtrack"), K.enableGuiButtons()), c)
            if (w < u && 0 === r) K.enableGuiButtons(), this.resetAutoSpin(), K.enableGuiButtons(), f = GAME_STATE_IDLE;
            else this.onSpin();
        else K.enableGuiButtons(), f = GAME_STATE_IDLE;
        w < u && 0 === r ? (K.enableGuiButtons(), this.resetAutoSpin()) : c || ("freespin" !== U.currentAnimation ? 0 < r || -1 !== D.indexOf(BONUS_GAME) ? K.enableSpin(!1) : (K.enableGuiButtons(),
            K.disableBetBut(!1)) : 0 < O.length && (K.enableSpin(!1), K.disableBetBut(!0)));
        K.refreshFreeSpinAmount(z)
    };
    this.refreshMoney = function(p) {
        w = p;
        K.refreshMoney(w);
        saveItem(LOCALSTORAGE_STRING + "score", w)
    };
    this._endReelAnimation = function() {
        b = !1;
        v = g = h = 0;
        k = S[0];
        this._realEndReelAnimation()
    };
    this.hidePayTable = function() {
        H.hide()
    };
    this.showWin = function() {
        if (f === GAME_STATE_SHOW_WIN) {
            if (0 < v) {
                var p = O[v - 1].line;
                K.hideLine(p);
                var t = O[v - 1].list;
                for (p = 0; p < t.length; p++) A[t[p].col].setVisible(t[p].row, !0), A[t[p].col + NUM_REELS].setVisible(t[p].row, !0)
            }
            if (v === O.length)
                if (v = 0, "freespin" === U.currentAnimation && 0 === r && (q.show(z), U.gotoAndStop("normal"), K.refreshFreeSpinNum(""), K.refreshFreeSpinAmount(""), createjs.Tween.get(Z).to({
                        alpha: 0
                    }, 2E3, createjs.Ease.cubicOut), K.enableGuiButtons()), -1 !== D.indexOf(BONUS_GAME)) this._hideAllWins(), $(s_oMain).trigger("bonus_call", {
                    bet: COIN_BET[B]
                });
                else if (d) d = !1, X.show(m);
            else if (0 < r) K.disableSpin(0 < r ? !1 : !0), this.onSpin();
            else if (c) this.onSpin();
            else K.enableGuiButtons(), K.disableBetBut(!1), f = GAME_STATE_IDLE,
                K.enableGuiButtons();
            else {
                p = O[v].line;
                t = O[v].list;
                if (0 === p) {
                    var M = Math.floor(t.length / 2);
                    p = t[M].row;
                    M = t[M].col
                } else {
                    K.showLine(p);
                    M = 2;
                    var P = !1;
                    3 > t.length ? O[v].value === FREESPIN_SYMBOL ? (M = t[0].col, p = t[0].row, P = !0) : (M = t.length - 1, p = t[M].row) : p = t[M].row;
                    for (; !P && I[p][M] === WILD_SYMBOL;)
                        if (M--, 0 > M) {
                            M = 0;
                            p = t[M].row;
                            break
                        } else p = t[M].row
                }
                t = {
                    x: 0,
                    y: 0
                };
                0 === p ? 0 === M ? P = {
                    x: 0,
                    y: 0
                } : 4 === M ? (P = {
                    x: WIN_BIG_ANIM_WIDTH,
                    y: 0
                }, t = {
                    x: SYMBOL_WIDTH,
                    y: 0
                }) : (P = {
                    x: WIN_BIG_ANIM_WIDTH / 2,
                    y: 0
                }, t = {
                    x: SYMBOL_WIDTH / 2,
                    y: 0
                }) : 1 === p ? 0 === M ? (P = {
                    x: 0,
                    y: WIN_BIG_ANIM_HEIGHT / 2
                }, t = {
                    x: 0,
                    y: SYMBOL_HEIGHT / 2
                }) : 4 === M ? (P = {
                    x: WIN_BIG_ANIM_WIDTH,
                    y: WIN_BIG_ANIM_HEIGHT / 2
                }, t = {
                    x: SYMBOL_WIDTH,
                    y: SYMBOL_HEIGHT / 2
                }) : (P = {
                    x: WIN_BIG_ANIM_WIDTH / 2,
                    y: WIN_BIG_ANIM_HEIGHT / 2
                }, t = {
                    x: SYMBOL_WIDTH / 2,
                    y: SYMBOL_HEIGHT / 2
                }) : 0 === M ? (P = {
                    x: 0,
                    y: WIN_BIG_ANIM_HEIGHT
                }, t = {
                    x: 0,
                    y: SYMBOL_HEIGHT
                }) : 4 === M ? (P = {
                    x: WIN_BIG_ANIM_WIDTH,
                    y: WIN_BIG_ANIM_HEIGHT
                }, t = {
                    x: SYMBOL_WIDTH,
                    y: SYMBOL_HEIGHT
                }) : (P = {
                    x: WIN_BIG_ANIM_WIDTH / 2,
                    y: WIN_BIG_ANIM_HEIGHT
                }, t = {
                    x: SYMBOL_WIDTH / 2,
                    y: SYMBOL_HEIGHT
                });
                N[p][M].show(I[p][M] + 1,
                    O[v].amount, t, P, c || !1 === d && 0 < r ? 1 : 3);
                v++
            }
        }
    };
    this._hideAllWins = function() {
        for (var p = 0; p < NUM_ROWS; p++)
            for (var t = 0; t < NUM_REELS; t++) N[p][t].hideWinFrame();
        K.hideAllLines()
    };
    this._prepareForWinsShowing = function() {
        l = TIME_SHOW_WIN;
        f = GAME_STATE_SHOW_WIN;
        this.showWin()
    };
    this.activateLines = function(p) {
        e = p;
        this.removeWinShowing();
        u = p = y * e;
        K.refreshTotalBet(u);
        K.refreshNumLines(e);
        p > w ? K.disableSpin(0 < r ? !1 : !0) : K.enableSpin(0 < r ? !1 : !0)
    };
    this.addLine = function() {
        e === NUM_PAYLINES ? e = 1 : e++;
        u = y * e;
        K.refreshTotalBet(u);
        K.refreshNumLines(e);
        K.enableSpin(0 < r ? !1 : !0)
    };
    this.resetCoinBet = function() {
        B = 0;
        var p = COIN_BET[B],
            t = p * e;
        y = p;
        u = t;
        K.refreshBet(y);
        K.refreshTotalBet(u);
        K.enableSpin(0 < r ? !1 : !0)
    };
    this.changeCoinBet = function() {
        B++;
        B === COIN_BET.length && (B = 0);
        var p = parseFloat(COIN_BET[B]),
            t = p * e;
        y = p;
        y = Math.floor(100 * y) / 100;
        u = t;
        K.refreshBet(y);
        K.refreshTotalBet(u);
        K.enableSpin(0 < r ? !1 : !0)
    };
    this.removeWinShowing = function() {
        H.resetHighlightCombo();
        K.resetWin();
        for (var p = 0; p < NUM_ROWS; p++)
            for (var t = 0; t < NUM_REELS; t++) N[p][t].hide(), A[t].setVisible(p, !0), A[t + NUM_REELS].setVisible(p, !0);
        for (p = 0; p < A.length; p++) A[p].activate();
        f = GAME_STATE_IDLE
    };
    this.forceStopReel = function() {
        0 === r && this.resetAutoSpin();
        f = GAME_STATE_IDLE;
        for (var p = 0; p < NUM_REELS; p++) {
            var t = REEL_OFFSET_Y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS;
            A[p].forceStop([I[0][p], I[1][p], I[2][p]], START_REEL_OFFSET_Y - 27);
            A[p + NUM_REELS].forceStop(null, t)
        }
        this._endReelAnimation()
    };
    this.onSpin = function() {
        J = MIN_REEL_LOOPS;
        G = E = 0;
        !(0 < r && "freespin" !== U.currentAnimation || -1 !== D.indexOf(BONUS_GAME) ||
            0 === r && "freespin" === U.currentAnimation) || f !== GAME_STATE_SHOW_ALL_WIN && f !== GAME_STATE_SHOW_WIN ? -1 === D.indexOf(BONUS_FREESPIN) || f !== GAME_STATE_SHOW_ALL_WIN && f !== GAME_STATE_SHOW_WIN ? w < u && 0 === r ? (this.resetAutoSpin(), new CRechargePanel) : (b = !1, playSound("spin_but", 1, !1), K.disableBetBut(!0), this.removeWinShowing(), u = "freespin" === U.currentAnimation ? 0 : y * e, D = [], this._hideAllWins(), K.disableGuiButtons(c, 0 < r ? !0 : !1), w -= u, K.refreshMoney(w), $(s_oMain).trigger("bet_placed", {
                bet: COIN_BET[B],
                tot_bet: u,
                payline: e
            }),
            f = GAME_STATE_SPINNING) : (this._hideAllWins(), K.disableSpin(!0), this.removeWinShowing(), d = !1, X.show(m)) : (this._hideAllWins(), this.removeWinShowing(), v = O.length, f = GAME_STATE_SHOW_WIN, this.showWin())
    };
    this.onSpinReceived = function(p) {
        F++;
        F === NUM_SPIN_FOR_ADS && (F = 0, $(s_oMain).trigger("show_interlevel_ad"));
        if (!0 === p.res) {
            I = p.pattern;
            O = p.win_lines;
            var t = parseFloat(p.tot_win),
                M = p.bonus;
            m = parseInt(p.num_freespin);
            w = parseFloat(p.money);
            "normal" !== U.currentAnimation && !1 === d && (z += t);
            r = m;
            0 < t || !0 === M || 0 < r ? (d = !1,
                p.freespin && (D.push(BONUS_FREESPIN), d = !0, z = 0), M && D.push(BONUS_GAME), x = t) : O = [];
            b = !0;
            $(s_oMain).trigger("save_score", w);
            saveItem(LOCALSTORAGE_STRING + "score", w)
        } else s_oGame._generateLosingPattern()
    };
    this.onBonusStart = function(p) {
        trace(p);
        w = parseFloat(p.money);
        parseFloat(p.bonus_win);
        L.show(JSON.parse(p.prize_list), y, p.final_prize);
        f = GAME_STATE_BONUS;
        $(s_oMain).trigger("save_score", w);
        saveItem(LOCALSTORAGE_STRING + "score", w)
    };
    this.onAutoSpin = function(p) {
        if ((c = p) && f === GAME_STATE_IDLE) this.onSpin()
    };
    this.onStopAutoSpin =
        function() {
            this.resetAutoSpin();
            f !== GAME_STATE_SPINNING && f !== GAME_STATE_BONUS && K.enableGuiButtons()
        };
    this.resetAutoSpin = function() {
        c = !1;
        K.setAutoSpinState(TEXT_AUTO_SPIN)
    };
    this._generateLosingPattern = function() {
        for (var p = [], t = 0; t < NUM_ROWS; t++) {
            var M = Math.floor(Math.random() * (s_aRandSymbols.length - 2));
            M = s_aRandSymbols[M];
            p[t] = M
        }
        I = [];
        for (t = 0; t < NUM_ROWS; t++) {
            I[t] = [];
            for (var P = 0; P < NUM_REELS; P++)
                if (0 === P) I[t][P] = p[t];
                else {
                    do M = Math.floor(Math.random() * (s_aRandSymbols.length - 2)), M = s_aRandSymbols[M]; while (p[0] ===
                        M || p[1] === M || p[2] === M);
                    I[t][P] = M
                }
        }
        O = [];
        b = !0
    };
    this.onInfoClicked = function() {
        f !== GAME_STATE_SPINNING && (H.isVisible() ? H.hide() : H.show())
    };
    this.exitFromFreespinPanel = function() {
        K.refreshFreeSpinNum(r);
        K.refreshFreeSpinAmount(0);
        U.gotoAndPlay("freespin");
        createjs.Tween.get(Z).to({
            alpha: 1
        }, 2E3, createjs.Ease.cubicOut);
        K.disableSpin(0 < r ? !1 : !0);
        f = GAME_STATE_IDLE;
        this.onSpin()
    };
    this.exitFromBonus = function(p) {
        K.refreshMoney(w);
        K.refreshWinText(p);
        if (d) d = !1, X.show(m);
        else if (c) this.onSpin();
        else K.enableGuiButtons(),
            K.disableBetBut(!1), K.enableSpin(0 < r ? !1 : !0), K.enableGuiButtons();
        f = GAME_STATE_IDLE
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
                for (var p = 0; p < A.length; p++) A[p].update();
                break;
            case GAME_STATE_SHOW_ALL_WIN:
                l += s_iTimeElaps, l > TIME_SHOW_ALL_WINS && (l = 0, this._hideAllWins(), v = c ? O.length : 0, this._prepareForWinsShowing())
        }
    };
    s_oGame = this;
    this._init()
}
var s_oGame = null,
    s_oTweenController;

function CReelColumn(a, b, c, d, f, h) {
    var k, g, e, l, v, y, u, w, E, G, x, z, m, r, F, D;
    this._init = function(B, J, A, N, O) {
        l = e = g = k = !1;
        w = 0;
        v = B;
        u = N;
        y = v < NUM_REELS ? v : v - NUM_REELS;
        G = 0;
        x = MAX_FRAMES_REEL_EASE;
        E = REEL_STATE_START;
        z = A;
        m = z + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS - OFFSET_Y_SYMBOLS;
        this.initContainer(J, A, O)
    };
    this.initContainer = function(B, J, A) {
        D = new createjs.Container;
        D.x = B;
        D.y = J;
        B = -OFFSET_Y_SYMBOLS;
        r = [];
        F = [];
        for (J = 0; J < NUM_ROWS; J++) {
            var N = createSprite(s_aSymbolData[A[J]], "static", 0, 0, SYMBOL_WIDTH, SYMBOL_HEIGHT);
            N.stop();
            N.x = 0;
            N.y = B;
            D.addChild(N);
            r[J] = N;
            F[J] = A[J];
            B += SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS
        }
        h.addChild(D)
    };
    this.unload = function() {
        h.removeChild(D)
    };
    this.activate = function() {
        z = D.y;
        m = z + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS - OFFSET_Y_SYMBOLS;
        k = !0
    };
    this._setSymbol = function(B) {
        for (var J = 0, A = 0; A < B.length; A++) r[A].spriteSheet = s_aSymbolData[B[A]], r[A].gotoAndStop("static"), r[A].x = 0, r[A].y = J, F[A] = B[A], J += SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS
    };
    this.forceStop = function(B, J) {
        null !== B &&
            this._setSymbol(B);
        D.y = J;
        k = !1;
        G = 0;
        x = MAX_FRAMES_REEL_EASE;
        E = REEL_STATE_START;
        w = 0;
        e = g = !1
    };
    this.setVisible = function(B, J) {
        r[B].visible = J
    };
    this.restart = function(B, J) {
        D.y = z = REEL_START_Y;
        m = z + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS - OFFSET_Y_SYMBOLS;
        this._setSymbol(B);
        if (g = J) {
            G = 0;
            x = MAX_FRAMES_REEL_EASE;
            E = REEL_STATE_STOP;
            for (var A = 0; A < NUM_ROWS; A++) r[A].gotoAndStop("static");
            e = !0
        } else
            for (A = 0; A < NUM_ROWS; A++) r[A].gotoAndStop("moving")
    };
    this.setReadyToStop = function() {
        G = 0;
        x = MAX_FRAMES_REEL_EASE;
        E =
            REEL_STATE_STOP
    };
    this.isReadyToStop = function() {
        return g
    };
    this.getPosUpLeft = function(B) {
        return {
            x: D.x,
            y: D.y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * B
        }
    };
    this.getY = function() {
        return D.y
    };
    this._updateStart = function() {
        0 === G && v < NUM_REELS && playSound("start_reel", 1, !1);
        G++;
        G > x && (G = 0, x /= 2, E++, z = D.y, m = z + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS - OFFSET_Y_SYMBOLS);
        var B = s_oTweenController.easeInBack(G, 0, 1, x);
        B = s_oTweenController.tweenValue(z, m, B);
        D.y = B
    };
    this._updateMoving = function() {
        G++;
        G > x &&
            (G = 0, z = D.y, m = z + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS - OFFSET_Y_SYMBOLS);
        var B = s_oTweenController.easeLinear(G, 0, 1, x);
        B = s_oTweenController.tweenValue(z, m, B);
        D.y = B
    };
    this._updateStopping = function() {
        G++;
        if (G >= x) k = !1, G = 0, x = MAX_FRAMES_REEL_EASE, E = REEL_STATE_START, w = 0, l = g = !1, e && (e = !1, D.y = m), s_oGame.stopNextReel();
        else {
            var B = s_oTweenController.easeOutBack(G, 0, 1, x);
            B = s_oTweenController.tweenValue(z, m, B);
            D.y = B;
            !1 === l && G >= .7 * x && e && (l = !0, F[0] === BONUS_SYMBOL || F[1] === BONUS_SYMBOL || F[2] === BONUS_SYMBOL ?
                playSound("reel_stop_bonus", 1, !1) : F[0] === FREESPIN_SYMBOL || F[1] === FREESPIN_SYMBOL || F[2] === FREESPIN_SYMBOL ? playSound("reel_stop_freespin", 1, !1) : playSound("reel_stop", 1, !1))
        }
    };
    this.update = function() {
        if (!1 !== k && (w++, w > u)) switch (!1 === g && D.y > REEL_ARRIVAL_Y && E !== REEL_STATE_STOP && s_oGame.reelArrived(v, y), E) {
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
    this._init(a, b, c, d, f)
}

function CInterface(a, b, c) {
    var d, f, h, k, g, e, l, v, y, u, w, E, G, x, z, m, r, F, D, B, J, A, N, O, S, I, V, ba, Z, U, W, X, q = null,
        K = null;
    this._init = function(H, L, C) {
        this._initPaylines(C);
        var n = s_oSpriteLibrary.getSprite("but_text");
        v = CANVAS_HEIGHT - n.height / 2 - 170;
        F = new CSpriteSheetTextButton(272, v, n, TEXT_PAYTABLE, FONT_GAME_1, "#8d4402", 34, C);
        F.addEventListener(ON_MOUSE_UP, this._onInfo, this);
        u = CANVAS_HEIGHT - n.height / 2 - 170;
        B = new CSpriteSheetTextButton(520, u, n, TEXT_COIN + " " + formatEntries(H), FONT_GAME_1, "#8d4402", 34, C);
        B.addEventListener(ON_MOUSE_UP,
            this._onBet, this);
        y = CANVAS_HEIGHT - n.height / 2 - 170;
        D = new CSpriteSheetTextButton(758, y, n, TEXT_LINES + " " + NUM_PAYLINES, FONT_GAME_1, "#8d4402", 34, C);
        D.addEventListener(ON_MOUSE_UP, this._onAddLine, this);
        w = CANVAS_HEIGHT - n.height / 2 - 170;
        J = new CSpriteSheetTextButton(996, w, n, TEXT_AUTO_SPIN, FONT_GAME_1, "#8d4402", 34, C);
        J.addEventListener(ON_MOUSE_UP, this._onAutoSpin, this);
        E = 1234;
        G = CANVAS_HEIGHT - n.height / 2 - 170;
        r = new CSpriteSheetTextButton(E, G, n, TEXT_SPIN, FONT_GAME_1, "#8d4402", 34, C);
        r.addEventListener(ON_MOUSE_UP,
            this._onSpin, this);
        l = CANVAS_HEIGHT - 290;
        S = new CTLText(C, 148, l, 278, 30, 30, "left", "#fede00", FONT_GAME_1, 1, 0, 0, TEXT_MONEY + ": " + formatEntries(TOTAL_MONEY) + TEXT_CURRENCY, !0, !0, !1, !1);
        I = new CTLText(C, 776, l, 278, 30, 30, "left", "#fede00", FONT_GAME_1, 1, 0, 0, TEXT_BET + ": " + formatEntries(L) + TEXT_CURRENCY, !0, !0, !1, !1);
        V = new CTLText(C, 1086, l, 278, 30, 30, "left", "#fede00", FONT_GAME_1, 1, 0, 0, TEXT_WIN + ": 0.00" + TEXT_CURRENCY, !0, !0, !1, !1);
        L = s_oSpriteLibrary.getSprite("amount_freespins");
        N = new createjs.Container;
        N.visible = !1;
        N.x = 300;
        N.y = 5;
        N.regX = L.width / 2;
        N.regY = L.height / 2;
        C.addChild(N);
        H = createBitmap(L);
        N.addChild(H);
        ba = new CTLText(N, 20, L.height / 2, L.width - 40, L.height / 2 - 10, 48, "center", "#fce0ab", FONT_GAME_1, 1, 0, 0, "0", !0, !0, !1, !1);
        L = s_oSpriteLibrary.getSprite("amount_freespin_win");
        O = new createjs.Container;
        O.visible = !1;
        O.x = 1200;
        O.y = 5;
        O.regX = L.width / 2;
        O.regY = L.height / 2;
        C.addChild(O);
        H = createBitmap(L);
        O.addChild(H);
        Z = new CTLText(O, 20, L.height / 2, L.width - 40, L.height / 2 - 10, 48, "center", "#fce0ab", FONT_GAME_1, 1, 0, 0, "0", !0, !0, !1, !1);
        C = s_oSpriteLibrary.getSprite("but_exit");
        d = CANVAS_WIDTH - C.width / 2 - 4;
        f = C.height / 2 + 4;
        A = new CGfxButton(d, f, C, s_oAttachSection);
        A.addEventListener(ON_MOUSE_UP, this._onExit, this);
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (n = s_oSpriteLibrary.getSprite("audio_icon"), g = n.width / 4 + 4, e = f, U = new CToggle(g, e, n, s_bAudioActive, s_oAttachSection), U.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this), h = g + n.width / 2 + 4, k = e) : (h = n.width / 2 + 4, k = f);
        n = window.document;
        C = n.documentElement;
        q = C.requestFullscreen || C.mozRequestFullScreen ||
            C.webkitRequestFullScreen || C.msRequestFullscreen;
        K = n.exitFullscreen || n.mozCancelFullScreen || n.webkitExitFullscreen || n.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (q = !1);
        q && screenfull.isEnabled && (n = s_oSpriteLibrary.getSprite("but_fullscreen"), W = new CToggle(h, k, n, s_bFullscreen, s_oAttachSection), W.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        X = new CAreYouSurePanel;
        X.addEventListener(ON_BUT_YES_DOWN, this._onExitYes, this);
        s_bMobile || (document.onkeyup = this.onKeyUp);
        this.refreshButtonPos()
    };
    this.onKeyUp = function(H) {
        H || (H = window.event);
        13 === H.keyCode && s_oInterface._onSpin();
        H.preventDefault();
        return !1
    };
    this.refreshButtonPos = function() {
        E - s_iOffsetX > CANVAS_WIDTH - 210 && r.setPosition(E - s_iOffsetX, G - s_iOffsetY);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || U.setPosition(g + s_iOffsetX, s_iOffsetY + e);
        q && screenfull.isEnabled && W.setPosition(h + s_iOffsetX, k + s_iOffsetY);
        A.setPosition(d - s_iOffsetX, f + s_iOffsetY)
    };
    this.unload = function() {
        r.unload();
        r = null;
        F.unload();
        F = null;
        D.unload();
        D = null;
        B.unload();
        B = null;
        J.unload();
        J = null;
        A.unload();
        X.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) U.unload(), U = null;
        q && screenfull.isEnabled && W.unload();
        for (var H = 0; H < NUM_PAYLINES; H++) z[H].unload();
        s_oInterface = null
    };
    this._initPaylines = function(H) {
        var L = s_oSpriteLibrary.getSprite("bet_but");
        z = [];
        var C = 91,
            n = new CBetBut(-L.width / 4 + 70, C, "bet_but4", H);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 4);
        z[3] = n;
        C += 68;
        n = new CBetBut(-L.width / 4 + 70, C, "bet_but2", H);
        n.addEventListenerWithParams(ON_MOUSE_UP,
            this._onBetLineClicked, this, 2);
        z[1] = n;
        C += 68;
        n = new CBetBut(-L.width / 4 + 70, C, "bet_but20", H);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 20);
        z[19] = n;
        C += 68;
        n = new CBetBut(-L.width / 4 + 70, C, "bet_but16", H);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 16);
        z[15] = n;
        C += 68;
        n = new CBetBut(-L.width / 4 + 70, C, "bet_but10", H);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 10);
        z[9] = n;
        C += 68;
        n = new CBetBut(-L.width / 4 + 70, C, "bet_but1", H);
        n.addEventListenerWithParams(ON_MOUSE_UP,
            this._onBetLineClicked, this, 1);
        z[0] = n;
        C += 69;
        n = new CBetBut(-L.width / 4 + 70, C, "bet_but11", H);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 11);
        z[10] = n;
        C += 68;
        n = new CBetBut(-L.width / 4 + 70, C, "bet_but17", H);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 17);
        z[16] = n;
        C += 68;
        n = new CBetBut(-L.width / 4 + 70, C, "bet_but3", H);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 3);
        z[2] = n;
        n = new CBetBut(-L.width / 4 + 70, C + 68, "bet_but5", H);
        n.addEventListenerWithParams(ON_MOUSE_UP,
            this._onBetLineClicked, this, 5);
        z[4] = n;
        C = 91;
        n = new CBetBut(1434 - L.width / 4, C, "bet_but14", H);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 14);
        z[13] = n;
        C += 68;
        n = new CBetBut(1434 - L.width / 4, C, "bet_but12", H);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 12);
        z[11] = n;
        C += 68;
        n = new CBetBut(1434 - L.width / 4, C, "bet_but9", H);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 9);
        z[8] = n;
        C += 68;
        n = new CBetBut(1434 - L.width / 4, C, "bet_but18", H);
        n.addEventListenerWithParams(ON_MOUSE_UP,
            this._onBetLineClicked, this, 18);
        z[17] = n;
        C += 68;
        n = new CBetBut(1434 - L.width / 4, C, "bet_but6", H);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 6);
        z[5] = n;
        C += 69;
        n = new CBetBut(1434 - L.width / 4, C, "bet_but7", H);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 7);
        z[6] = n;
        C += 68;
        n = new CBetBut(1434 - L.width / 4, C, "bet_but19", H);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 19);
        z[18] = n;
        C += 68;
        n = new CBetBut(1434 - L.width / 4, C, "bet_but8", H);
        n.addEventListenerWithParams(ON_MOUSE_UP,
            this._onBetLineClicked, this, 8);
        z[7] = n;
        C += 68;
        n = new CBetBut(1434 - L.width / 4, C, "bet_but13", H);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 13);
        z[12] = n;
        n = new CBetBut(1434 - L.width / 4, C + 68, "bet_but15", H);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 15);
        z[14] = n;
        L = [{
            x: 122,
            y: 470
        }, {
            x: 122,
            y: 200
        }, {
            x: 122,
            y: 678
        }, {
            x: 122,
            y: 126
        }, {
            x: 122,
            y: 180
        }, {
            x: 122,
            y: 122
        }, {
            x: 122,
            y: 460
        }, {
            x: 122,
            y: 198
        }, {
            x: 122,
            y: 130
        }, {
            x: 122,
            y: 228
        }, {
            x: 122,
            y: 214
        }, {
            x: 122,
            y: 190
        }, {
            x: 122,
            y: 420
        }, {
            x: 122,
            y: 126
        }, {
            x: 122,
            y: 422
        }, {
            x: 122,
            y: 230
        }, {
            x: 122,
            y: 470
        }, {
            x: 122,
            y: 148
        }, {
            x: 122,
            y: 120
        }, {
            x: 122,
            y: 260
        }];
        m = [];
        for (C = 0; C < NUM_PAYLINES; C++) n = new createBitmap(s_oSpriteLibrary.getSprite("payline_" + (C + 1))), n.x = L[C].x, n.y = L[C].y, n.visible = !1, H.addChild(n), m[C] = n
    };
    this.refreshMoney = function(H) {
        S.refreshText(TEXT_MONEY + ": " + formatEntries(H) + TEXT_CURRENCY)
    };
    this.refreshBet = function(H) {
        B.setText(TEXT_COIN + " " + formatEntries(H))
    };
    this.refreshTotalBet = function(H) {
        I.refreshText(TEXT_BET + ": " + formatEntries(H) + TEXT_CURRENCY)
    };
    this.refreshNumLines =
        function(H) {
            x = !0;
            D.setText(TEXT_LINES + " " + H);
            for (var L = 0; L < NUM_PAYLINES; L++) L < H ? (z[L].setOn(), m[L].visible = !0) : z[L].setOff();
            setTimeout(function() {
                for (var C = 0; C < NUM_PAYLINES; C++) m[C].visible = !1;
                x = !1
            }, 1E3)
        };
    this.resetWin = function() {
        V.refreshText(TEXT_WIN + ": " + formatEntries(0))
    };
    this.refreshWinText = function(H) {
        V.refreshText(TEXT_WIN + ": " + formatEntries(H))
    };
    this.refreshFreeSpinNum = function(H) {
        ba.refreshText(H);
        "" === H ? (N.visible = !1, O.visible = !1) : (N.visible = !0, O.visible = !0)
    };
    this.refreshFreeSpinAmount =
        function(H) {
            "" === H ? Z.refreshText(H) : Z.refreshText(formatEntries(H))
        };
    this.showLine = function(H) {
        0 < H && (m[H - 1].visible = !0)
    };
    this.hideLine = function(H) {
        0 < H && (m[H - 1].visible = !1)
    };
    this.hideAllLines = function() {
        for (var H = 0; H < NUM_PAYLINES; H++) m[H].visible = !1
    };
    this.disableBetBut = function(H) {
        for (var L = 0; L < NUM_PAYLINES; L++) z[L].disable(H)
    };
    this.enableGuiButtons = function() {
        r.enable();
        J.enable();
        B.enable();
        D.enable();
        F.enable();
        s_bMobile || (document.onkeyup = this.onKeyUp)
    };
    this.enableSpin = function(H) {
        r.enable();
        H &&
            J.enable();
        s_bMobile || (document.onkeyup = this.onKeyUp)
    };
    this.disableSpin = function(H) {
        r.disable();
        H && J.disable();
        s_bMobile || (document.onkeyup = null)
    };
    this.disableGuiButtons = function(H, L) {
        s_bMobile || (document.onkeyup = null);
        L ? (J.disable(), this.disableSpin(!0)) : H ? (r.disable(), J.setText(TEXT_STOP_AUTO)) : (J.disable(), r.setText(TEXT_SKIP));
        B.disable();
        D.disable();
        F.disable()
    };
    this.setAutoSpinState = function(H) {
        J.setText(H)
    };
    this.setSpinState = function(H) {
        r.setText(H)
    };
    this._onBetLineClicked = function(H) {
        x || (this.refreshNumLines(H),
            s_oGame.activateLines(H))
    };
    this._onSpin = function() {
        if (r.getText() === TEXT_SKIP) s_oGame.forceStopReel(), r.setText(TEXT_SPIN);
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
        J.getText() === TEXT_STOP_AUTO ? (J.setText(TEXT_AUTO_SPIN), s_oGame.onAutoSpin(!1)) : (J.setText(TEXT_STOP_AUTO), s_oGame.onAutoSpin(!0))
    };
    this.resetFullscreenBut = function() {
        q && screenfull.isEnabled &&
            W.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? K.call(window.document) : q.call(window.document.documentElement);
        sizeHandler()
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onExit = function() {
        X.show(TEXT_ARE_SURE)
    };
    this._onExitYes = function() {
        s_oGame.onExit()
    };
    s_oInterface = this;
    this._init(a, b, c)
}
var s_oInterface = null;

function CPayTablePanel() {
    var a, b, c, d, f, h, k, g, e;
    this._init = function() {
        a = 0;
        d = [];
        e = new createjs.Container;
        e.on("click", function() {});
        e.visible = !1;
        s_oAttachSection.addChild(e);
        var l = new createjs.Container;
        e.addChild(l);
        var v = createBitmap(s_oSpriteLibrary.getSprite("paytable1"));
        l.addChild(v);
        this._createPayouts(l);
        d[0] = l;
        l = new createjs.Container;
        l.visible = !1;
        e.addChild(l);
        v = createBitmap(s_oSpriteLibrary.getSprite("paytable2"));
        l.addChild(v);
        d[1] = l;
        f = d[a];
        l = new createjs.Container;
        l.visible = !1;
        e.addChild(l);
        v = createBitmap(s_oSpriteLibrary.getSprite("paytable3"));
        l.addChild(v);
        v = new CTLText(l, 1E3, 366, 546, 118, 36, "center", "#fede00", FONT_GAME_1, 1, 0, 0, TEXT_HELP_BONUS1, !0, !0, !0, !1);
        new CTLText(l, 1E3, 544, 546, 280, 36, "center", "#fede00", FONT_GAME_1, 1, 0, 0, TEXT_HELP_BONUS2, !0, !0, !0, !1);
        d[2] = l;
        l = new createjs.Container;
        l.visible = !1;
        e.addChild(l);
        v = createBitmap(s_oSpriteLibrary.getSprite("paytable4"));
        l.addChild(v);
        for (var y = 400, u = 0; 3 > u; u++) v = new createjs.Text(u + 3 + "X  " + NUM_FREESPIN[u], "40px " + FONT_GAME_1, "#fede00"),
            v.textAlign = "left", v.x = CANVAS_WIDTH / 2 + 44, v.y = y, v.textBaseline = "alphabetic", l.addChild(v), y += 42;
        v = new CTLText(l, CANVAS_WIDTH / 2 - 280, 550, 560, 280, 56, "center", "#fede00", FONT_GAME_1, 1, 0, 0, TEXT_HELP_FREESPIN, !0, !0, !0, !1);
        d[3] = l;
        f = d[a];
        k = new CGfxButton(CANVAS_WIDTH - 270, CANVAS_HEIGHT / 2, s_oSpriteLibrary.getSprite("but_arrow_next"), e);
        k.addEventListener(ON_MOUSE_UP, this._onNext, this);
        g = new CGfxButton(270, CANVAS_HEIGHT / 2, s_oSpriteLibrary.getSprite("but_arrow_prev"), e);
        g.addEventListener(ON_MOUSE_UP, this._onPrev,
            this);
        l = s_oSpriteLibrary.getSprite("but_exit_info");
        h = new CGfxButton(1566, 266, l, e);
        h.addEventListener(ON_MOUSE_UP, this._onExit, this)
    };
    this.unload = function() {};
    this._createPayouts = function(l) {
        b = [];
        c = [];
        for (var v = [{
                x: 1164,
                y: 744
            }, {
                x: 800,
                y: 744
            }, {
                x: 1290,
                y: 558
            }, {
                x: 940,
                y: 558
            }, {
                x: 590,
                y: 558
            }, {
                x: 1164,
                y: 374
            }, {
                x: 800,
                y: 374
            }], y = 0, u = 0; u < PAYTABLE_VALUES.length; u++) {
            var w = PAYTABLE_VALUES[u];
            do {
                var E = w.indexOf(0); - 1 !== E && w.splice(E, 1)
            } while (-1 !== E);
            E = w.length;
            if (0 !== E) {
                var G = 40;
                4 === E && (G = 32);
                var x = v[y].y;
                b[u] = [];
                c[u] = [];
                for (var z = 0; z < E; z++) {
                    var m = new createjs.Text("X" + (5 - z), "40px " + FONT_GAME_1, "#ffffff");
                    m.textAlign = "center";
                    m.x = v[y].x;
                    m.y = x;
                    m.textBaseline = "alphabetic";
                    l.addChild(m);
                    b[u][z] = m;
                    var r = new createjs.Text(w[E - z - 1], "40px " + FONT_GAME_1, "#fede00");
                    r.textAlign = "center";
                    r.x = m.x + 70;
                    r.y = m.y;
                    r.textBaseline = "alphabetic";
                    l.addChild(r);
                    c[u][z] = r;
                    x += G
                }
                y++
            }
        }
    };
    this._onNext = function() {
        a === d.length - 1 ? a = 0 : a++;
        f.visible = !1;
        d[a].visible = !0;
        f = d[a]
    };
    this._onPrev = function() {
        0 === a ? a = d.length - 1 : a--;
        f.visible = !1;
        d[a].visible = !0;
        f = d[a]
    };
    this.refreshButtonPos = function(l, v) {};
    this.show = function() {
        a = 0;
        f.visible = !1;
        d[a].visible = !0;
        f = d[a];
        e.visible = !0
    };
    this.hide = function() {
        e.visible = !1
    };
    this.resetHighlightCombo = function() {
        for (var l = 0; l < b.length; l++)
            if (void 0 !== b[l])
                for (var v = 0; v < b[l].length; v++) b[l][v].color = "#ffffff", c[l][v].color = "#ffff00", createjs.Tween.removeTweens(c[l][v]), c[l][v].alpha = 1
    };
    this.highlightCombo = function(l, v) {
        c[l][NUM_REELS - v].color = "#ff9000";
        this.tweenAlpha(c[l][NUM_REELS - v], 0)
    };
    this.tweenAlpha = function(l,
        v) {
        createjs.Tween.get(l, {
            loop: -1
        }).to({
            alpha: 0
        }, 200).to({
            alpha: 1
        }, 200)
    };
    this._onExit = function() {
        s_oGame.hidePayTable()
    };
    this.isVisible = function() {
        return e.visible
    };
    this._init()
}

function CStaticSymbolCell(a, b, c, d) {
    var f, h, k, g, e = -1,
        l, v, y, u, w, E, G;
    this._init = function(z, m, r, F) {
        k = r;
        g = F;
        f = 0;
        G = new createjs.Container;
        G.visible = !1;
        s_oAttachSection.addChild(G);
        E = new createjs.Container;
        E.visible = !1;
        E.x = r;
        E.y = F;
        G.addChild(E);
        E.scaleX = E.scaleY = .5 * REEL_SCALE;
        l = [];
        for (z = 0; z < NUM_SYMBOLS; z++) m = createSprite(s_aSymbolAnims[z], "static", 0, 0, SYMBOL_ANIM_WIDTH, SYMBOL_ANIM_HEIGHT), m.on("animationend", this._onAnimEnded, null, !1), E.addChild(m), l[z] = m, l[z].visible = !1;
        z = {
            images: [s_oSpriteLibrary.getSprite("win_frame_anim_big_0"),
                s_oSpriteLibrary.getSprite("win_frame_anim_big_1"), s_oSpriteLibrary.getSprite("win_frame_anim_big_2"), s_oSpriteLibrary.getSprite("win_frame_anim_big_3"), s_oSpriteLibrary.getSprite("win_frame_anim_big_4"), s_oSpriteLibrary.getSprite("win_frame_anim_big_5"), s_oSpriteLibrary.getSprite("win_frame_anim_big_6"), s_oSpriteLibrary.getSprite("win_frame_anim_big_7")
            ],
            framerate: 60,
            frames: {
                width: WIN_BIG_ANIM_WIDTH,
                height: WIN_BIG_ANIM_HEIGHT
            },
            animations: {
                "static": 0,
                anim: [1, 64]
            }
        };
        z = new createjs.SpriteSheet(z);
        y =
            createSprite(z, "static", 0, 0, WIN_BIG_ANIM_WIDTH, WIN_BIG_ANIM_HEIGHT);
        y.x = -36;
        y.y = -40;
        E.addChild(y);
        z = s_oSpriteLibrary.getSprite("amount_bonus_win");
        w = createBitmap(z);
        w.regX = z.width / 2;
        w.regY = z.height / 2;
        w.x = SYMBOL_ANIM_WIDTH / 2;
        w.y = SYMBOL_ANIM_HEIGHT;
        E.addChild(w);
        u = new CTLText(E, SYMBOL_ANIM_WIDTH / 2 - 125, SYMBOL_ANIM_HEIGHT - 37, 250, 76, 76, "center", "#fede00", FONT_GAME_1, 1.1, 0, 0, " ", !0, !0, !1, !1);
        z = {
            images: [s_oSpriteLibrary.getSprite("win_frame_anim_0"), s_oSpriteLibrary.getSprite("win_frame_anim_1")],
            framerate: 40,
            frames: {
                width: 342,
                height: 336
            },
            animations: {
                "static": 0,
                anim: [0, 42]
            }
        };
        z = new createjs.SpriteSheet(z);
        v = createSprite(z, "static", 0, 0, 342, 336);
        v.x = r - 60;
        v.y = F - 60;
        v.scaleX = v.scaleY = REEL_SCALE;
        G.addChild(v)
    };
    this.unload = function() {
        s_oAttachSection.removeChild(G)
    };
    this.hide = function() {
        -1 < e && (stopSound("symbol" + e), v.gotoAndStop("static"), v.visible = !1, y.gotoAndStop("static"), y.visible = !1, w.visible = !1, u.refreshText(" "), l[e].gotoAndPlay("static"), l[e].visible = !1, G.visible = !1, e = -1)
    };
    this.show = function(z, m, r, F, D) {
        f =
            0;
        h = D;
        for (D = 0; D < NUM_SYMBOLS; D++) l[D].visible = D + 1 === z ? !0 : !1;
        w.visible = !1;
        0 < m ? (u.refreshText(formatEntries(m)), w.visible = !0) : u.refreshText(" ");
        y.gotoAndPlay("anim");
        y.visible = !0;
        l[z - 1].gotoAndPlay("anim");
        e = z - 1;
        l[z - 1].spriteSheet.getNumFrames();
        E.regX = F.x;
        E.regY = F.y;
        E.x = k + r.x;
        E.y = g + r.y;
        E.scaleX = E.scaleY = .5 * REEL_SCALE;
        E.visible = !0;
        E.alpha = 1;
        G.visible = !0;
        createjs.Tween.get(E).to({
            scaleX: REEL_SCALE,
            scaleY: REEL_SCALE
        }, 1E3, createjs.Ease.cubicOut);
        playSound("symbol" + e, 1, !1)
    };
    this.showWinFrame = function() {
        v.gotoAndPlay("anim");
        v.visible = !0;
        G.visible = !0
    };
    this.hideWinFrame = function() {
        createjs.Tween.removeTweens(E);
        v.gotoAndPlay("static");
        v.visible = !1;
        G.visible = !1
    };
    this._onAnimEnded = function() {
        f++;
        f === h && -1 < e && (l[e].stop(), createjs.Tween.get(E).to({
            scaleX: .52,
            scaleY: .52,
            alpha: 0
        }, 500, createjs.Ease.cubicOut).call(function() {
            x.stopAnim();
            s_oGame.showWin()
        }))
    };
    this.stopAnim = function() {
        -1 !== e && (stopSound("symbol" + e), l[e].visible = !1, E.visible = !1, v.gotoAndStop("static"), v.visible = !1)
    };
    var x = this;
    this._init(a, b, c, d)
}

function CTweenController() {
    this.tweenValue = function(a, b, c) {
        return a + c * (b - a)
    };
    this.easeLinear = function(a, b, c, d) {
        return c * a / d + b
    };
    this.easeInCubic = function(a, b, c, d) {
        d = (a /= d) * a * a;
        return b + c * d
    };
    this.easeBackInQuart = function(a, b, c, d) {
        d = (a /= d) * a;
        return b + c * (2 * d * d + 2 * d * a + -3 * d)
    };
    this.easeInBack = function(a, b, c, d) {
        return c * (a /= d) * a * (2.70158 * a - 1.70158) + b
    };
    this.easeOutBack = function(a, b, c, d) {
        return c * ((a = a / d - 1) * a * (2.70158 * a + 1.70158) + 1) + b
    };
    this.easeOutCubic = function(a, b, c, d) {
        return c * ((a = a / d - 1) * a * a + 1) + b
    };
    this.getTrajectoryPoint =
        function(a, b) {
            var c = new createjs.Point,
                d = (1 - a) * (1 - a),
                f = a * a;
            c.x = d * b.start.x + 2 * (1 - a) * a * b.traj.x + f * b.end.x;
            c.y = d * b.start.y + 2 * (1 - a) * a * b.traj.y + f * b.end.y;
            return c
        }
}

function CMsgBox() {
    var a, b, c, d, f, h, k;
    this._init = function() {
        k = new createjs.Container;
        k.visible = !1;
        s_oStage.addChild(k);
        b = new createjs.Shape;
        b.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        a = b.on("click", function() {});
        k.addChild(b);
        var g = s_oSpriteLibrary.getSprite("msg_box");
        h = new createjs.Container;
        h.x = CANVAS_WIDTH / 2;
        h.y = CANVAS_HEIGHT / 2;
        h.regX = g.width / 2;
        h.regY = g.height / 2;
        h.scale = 0;
        k.addChild(h);
        c = createBitmap(g);
        h.addChild(c);
        d = new CTLText(h, 70, 60, g.width - 140, 400, 42,
            "center", "#fede00", FONT_GAME_1, 1, 0, 0, " ", !0, !0, !0, !1);
        f = new CGfxButton(g.width / 2, g.height - 150, s_oSpriteLibrary.getSprite("but_yes"), h);
        f.addEventListener(ON_MOUSE_UP, this._onExit, this)
    };
    this.unload = function() {
        b.off("click", a);
        f.unload()
    };
    this.show = function(g) {
        d.refreshText(g);
        k.visible = !0;
        b.alpha = 0;
        createjs.Tween.get(b).to({
            alpha: .7
        }, 300, createjs.Ease.quartOut);
        createjs.Tween.get(h).to({
            scale: 1
        }, 1E3, createjs.Ease.elasticOut)
    };
    this.hide = function() {
        f.disable();
        createjs.Tween.get(b).to({
                alpha: 0
            }, 500,
            createjs.Ease.quartOut);
        createjs.Tween.get(h).to({
            scale: 0
        }, 500, createjs.Ease.backIn).call(function() {
            k.visible = !1
        })
    };
    this._onExit = function() {
        this.hide()
    };
    this._init()
}

function CBonusPanel() {
    var a, b, c = !1,
        d, f, h, k, g, e, l, v, y, u, w, E, G, x, z, m, r, F, D = null,
        B, J, A, N, O, S;
    this._init = function() {
        c = !0;
        S.removeAllChildren();
        S.visible = !1;
        var I = s_oSpriteLibrary.getSprite("bg_bonus");
        E = createBitmap(I);
        S.addChild(E);
        O = new createjs.Shape;
        O.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        w = O.on("click", function() {});
        S.addChild(O);
        I = [];
        for (var V = 0; 76 > V; V++) I.push(s_oSpriteLibrary.getSprite("particle_rainbow_" + V));
        I = new createjs.SpriteSheet({
            images: I,
            frames: {
                width: 800,
                height: 260
            },
            animations: {
                start: 0,
                anim: [0, 75]
            }
        });
        B = createSprite(I, "start", 0, 0, 800, 260);
        B.x = 584;
        B.y = 132;
        S.addChild(B);
        m = new CBonusParallax(0, CANVAS_HEIGHT, S);
        r = new CBonusPlatformController(0, 580, S);
        b = a = 10;
        N = new createjs.Container;
        N.x = a;
        N.y = b;
        S.addChild(N);
        I = s_oSpriteLibrary.getSprite("amount_bonus_win");
        V = createBitmap(I);
        N.addChild(V);
        A = new createjs.Text(formatEntries(0), "56px " + FONT_GAME_1, "#fede00");
        A.textAlign = "center";
        A.textBaseline = "alphabetic";
        A.x = I.width / 2;
        A.y = 64;
        N.addChild(A);
        J = new createjs.Text(TEXT_BONUS_HELP,
            "60px " + FONT_GAME_1, "#fede00");
        J.x = CANVAS_WIDTH / 2;
        J.y = 150;
        J.textAlign = "center";
        J.textBaseline = "alphabetic";
        J.lineWidth = 900;
        J.shadow = new createjs.Shadow("#000", 1, 1, 1);
        S.addChild(J);
        this._startBonus()
    };
    this._loadAllResources = function() {
        S = new createjs.Container;
        s_oAttachSection.addChild(S);
        var I = s_oSpriteLibrary.getSprite("bg_loading_bonus");
        G = createBitmap(I);
        S.addChild(G);
        I = s_oSpriteLibrary.getSprite("progress_bar");
        z = createBitmap(I);
        z.x = CANVAS_WIDTH / 2 - I.width / 2;
        z.y = CANVAS_HEIGHT - 91;
        S.addChild(z);
        f =
            I.width;
        h = I.height;
        u = new createjs.Shape;
        u.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(z.x, z.y, 1, h);
        S.addChild(u);
        z.mask = u;
        x = new createjs.Text("", "21px " + FONT_GAME_1, "#fff");
        x.x = CANVAS_WIDTH / 2;
        x.y = CANVAS_HEIGHT - 59;
        x.shadow = new createjs.Shadow("#000", 2, 2, 2);
        x.textBaseline = "alphabetic";
        x.textAlign = "center";
        S.addChild(x);
        s_oSpriteLibrary.init(this._onResourceBonusLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_bonus", "./sprites/bonus/bg_bonus.jpg");
        s_oSpriteLibrary.addSprite("platform_0",
            "./sprites/bonus/platform_0.png");
        s_oSpriteLibrary.addSprite("platform_1", "./sprites/bonus/platform_1.png");
        s_oSpriteLibrary.addSprite("platform_2", "./sprites/bonus/platform_2.png");
        s_oSpriteLibrary.addSprite("platform_3", "./sprites/bonus/platform_3.png");
        s_oSpriteLibrary.addSprite("rock_0", "./sprites/bonus/rock_0.png");
        s_oSpriteLibrary.addSprite("rock_1", "./sprites/bonus/rock_1.png");
        for (I = 0; 76 > I; I++) s_oSpriteLibrary.addSprite("particle_rainbow_" + I, "./sprites/bonus/particle_rainbow/particle_rainbow_" +
            I + ".png");
        for (I = 0; 119 > I; I++) s_oSpriteLibrary.addSprite("character_idle_" + I, "./sprites/bonus/character/idle/character_idle_" + I + ".png");
        for (I = 0; 97 > I; I++) s_oSpriteLibrary.addSprite("character_jump_" + I, "./sprites/bonus/character/jump/character_jump_" + I + ".png");
        for (I = 0; 56 > I; I++) s_oSpriteLibrary.addSprite("character_pot_" + I, "./sprites/bonus/character/pot/character_pot_" + I + ".png");
        k = 0;
        g = s_oSpriteLibrary.getNumSprites();
        0 === g ? this._startBonus() : s_oSpriteLibrary.loadSprites()
    };
    this._onResourceBonusLoaded =
        function() {
            k++;
            var I = Math.floor(k / g * 100);
            x.text = I + "%";
            u.graphics.clear();
            I = Math.floor(I * f / 100);
            u.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(z.x, z.y, I, h);
            k === g && this._init()
        };
    this.refreshButtonPos = function() {
        void 0 !== N && (N.x = a + s_iOffsetX, N.y = b + s_iOffsetY)
    };
    this.unload = function() {
        O.off("click", w);
        r.unload()
    };
    this._onAllImagesLoaded = function() {};
    this.reset = function() {
        F.unload();
        r.reset();
        null !== D && (D.unload(), D = null);
        A.text = formatEntries(0);
        m.reset();
        B.gotoAndStop("start")
    };
    this.show = function(I,
        V, ba) {
        l = V;
        y = I;
        d = ba;
        c ? this._startBonus() : this._loadAllResources()
    };
    this.hide = function() {
        stopSound("soundtrack_bonus");
        setVolume("ambience_game", 1);
        E.off("click", function() {});
        S.visible = !1;
        this.reset();
        s_oGame.exitFromBonus(e)
    };
    this._startBonus = function() {
        e = 0;
        playSound("soundtrack_bonus", 1, !0);
        B.gotoAndPlay("anim");
        r.startBonus(l);
        J.alpha = 0;
        createjs.Tween.get(J).to({
            alpha: 1
        }, 800);
        E.on("click", function() {});
        S.visible = !0;
        this.refreshButtonPos()
    };
    this.endBonus = function() {
        F = new CBonusResultPanel(e, S);
        d ?
            playSound("bonus_end_win", 1, !1) : playSound("bonus_end", 1, !1);
        stopSound("soundtrack_bonus")
    };
    this.refreshScoreAmount = function() {
        A.text = formatEntries(e)
    };
    this.prepareForJump = function(I) {
        0 === y.length - 1 ? (v = y.shift(), e += v, r.jumpCharacter(I, v, !0)) : 0 === y.length ? r.jumpCharacter(I, 0, !1) : (v = y.shift(), e += v, r.jumpCharacter(I, v, !0))
    };
    this.scrollLeft = function() {
        var I = !1;
        0 === y.length - 1 ? d && (I = !0) : 0 === y.length && (I = .5 < Math.random() ? !0 : !1);
        r.scrollLeft(I);
        m.scrollLeft();
        createjs.Tween.get(J).to({
            alpha: 1
        }, 800)
    };
    this._onButtonRelease =
        function(I) {
            createjs.Tween.get(J).to({
                alpha: 0
            }, 500);
            s_oBonusPanel.prepareForJump(I)
        };
    s_oBonusPanel = this
}
var s_oBonusPanel = null;

function CBonusResultPanel(a, b) {
    var c, d;
    this._init = function(f) {
        c = new createjs.Container;
        b.addChild(c);
        var h = s_oSpriteLibrary.getSprite("msg_box_small");
        d = new createjs.Container;
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2;
        d.regX = h.width / 2;
        d.regY = h.height / 2;
        d.scale = 0;
        c.addChild(d);
        var k = createBitmap(h);
        d.addChild(k);
        new CTLText(d, 50, 80, h.width - 100, 74, 74, "center", "#fede00", FONT_GAME_1, 1, 0, 0, TEXT_CONGRATS, !0, !0, !1, !1);
        new CTLText(d, 50, 160, h.width - 100, 280, 70, "center", "#fede00", FONT_GAME_1, 1, 0, 0, TEXT_YOU_WIN +
            "\n" + formatEntries(f), !0, !0, !0, !1);
        var g = this;
        createjs.Tween.get(d).to({
            scale: 1
        }, 1E3, createjs.Ease.elasticOut).call(function() {
            setTimeout(function() {
                g.hide()
            }, 3E3)
        })
    };
    this.hide = function() {
        createjs.Tween.get(d).to({
            scale: 0
        }, 500, createjs.Ease.backIn).call(function() {
            b.removeChild(c);
            s_oBonusPanel.hide()
        })
    };
    this.unload = function() {
        b.removeChild(c)
    };
    this._init(a)
}

function CBonusBut(a, b, c, d, f) {
    var h, k, g, e, l, v, y, u, w, E, G;
    this._init = function(x, z, m, r, F) {
        h = !1;
        k = 1;
        g = [];
        e = [];
        w = new createjs.Container;
        w.x = x;
        w.y = z;
        w.scaleX = w.scaleY = k;
        F.addChild(w);
        x = {
            images: [r],
            frames: {
                width: r.width / 2,
                height: r.height,
                regX: r.width / 4,
                regY: r.height / 2
            },
            animations: {
                state_0: 0,
                state_1: 1
            }
        };
        x = new createjs.SpriteSheet(x);
        E = createSprite(x, "state_0", r.width / 4, r.height / 2, r.width / 2, r.height);
        w.addChild(E);
        if (m) {
            m = [];
            for (r = 0; 56 > r; r++) m.push(s_oSpriteLibrary.getSprite("character_pot_" + r));
            x = {
                images: m,
                frames: {
                    width: 283,
                    height: 459,
                    regX: 141,
                    regY: 459
                },
                animations: {
                    start: 0,
                    anim: [8, 55, "stop"],
                    stop: 55
                }
            };
            x = new createjs.SpriteSheet(x);
            G = createSprite(x, "start", 166, 538, 332, 538);
            G.y = -32;
            w.addChild(G)
        }
        this._initListener()
    };
    this.unload = function() {
        s_bMobile ? w.off("mousedown", v) : (w.off("mousedown", v), w.off("mouseover", u));
        w.off("click", y);
        f.removeChild(w)
    };
    this.setVisible = function(x) {
        w.visible = x
    };
    this.setClickable = function(x) {
        h = !x
    };
    this._initListener = function() {
        s_bMobile ? v = w.on("mousedown", this.buttonDown) : (v =
            w.on("mousedown", this.buttonDown), u = w.on("mouseover", this.buttonOver));
        y = w.on("click", this.buttonRelease)
    };
    this.addEventListener = function(x, z, m) {
        g[x] = z;
        e[x] = m
    };
    this.addEventListenerWithParams = function(x, z, m, r) {
        g[x] = z;
        e[x] = m;
        l = r
    };
    this.buttonRelease = function() {
        h || (w.scaleX = k, w.scaleY = k, playSound("click", 1, !1), g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(e[ON_MOUSE_UP], l))
    };
    this.buttonDown = function() {
        h || g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(e[ON_MOUSE_DOWN], l)
    };
    this.buttonOver = function(x) {
        s_bMobile || h || (x.target.cursor =
            "pointer")
    };
    this.trembleAnimation = function() {
        createjs.Tween.get(w).to({
            rotation: 5
        }, 75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn)
    };
    this.moveY = function(x, z, m, r) {
        createjs.Tween.get(w).wait(m).to({
            y: x
        }, z, r)
    };
    this.playPotAnim = function() {
        G.gotoAndPlay("anim")
    };
    this.setPosition = function(x, z) {
        w.x = x;
        w.y = z
    };
    this.setX = function(x) {
        w.x = x
    };
    this.setY = function(x) {
        w.y = x
    };
    this.getButtonImage = function() {
        return w
    };
    this.getX = function() {
        return w.x
    };
    this.getY =
        function() {
            return w.y
        };
    this._init(a, b, c, d, f)
}

function CBonusCharacter(a, b, c) {
    var d, f, h, k, g, e, l, v, y, u = this;
    this._init = function(w, E) {
        h = w;
        k = E;
        g = [];
        e = [];
        y = new createjs.Container;
        y.x = w;
        y.y = E;
        c.addChild(y);
        for (var G = [], x = 0; 119 > x; x++) G.push(s_oSpriteLibrary.getSprite("character_idle_" + x));
        G = {
            images: G,
            frames: {
                width: 276,
                height: 257,
                regX: 138,
                regY: 257
            },
            animations: {
                start: 0,
                anim: [0, 118]
            }
        };
        G = new createjs.SpriteSheet(G);
        l = createSprite(G, "start", 138, 257, 276, 257);
        y.addChild(l);
        G = [];
        for (x = 0; 97 > x; x++) G.push(s_oSpriteLibrary.getSprite("character_jump_" + x));
        G = {
            images: G,
            frames: {
                width: 276,
                height: 257,
                regX: 138,
                regY: 257
            },
            animations: {
                start: 0,
                start_jump: [0, 10, "before_jump"],
                before_jump: [11, 28, "jumping"],
                jumping: [29, 57],
                landing: [58, 96, "start"]
            }
        };
        G = new createjs.SpriteSheet(G);
        v = createSprite(G, "start", 138, 257, 276, 257);
        y.addChild(v);
        v.on("animationend", this._onEndAnimJump, this)
    };
    this.addEventListener = function(w, E, G) {
        g[w] = E;
        e[w] = G
    };
    this.hide = function() {
        l.visible = !1;
        v.visible = !1;
        v.gotoAndStop("start");
        l.gotoAndStop("start")
    };
    this.reset = function() {
        y.x = h;
        y.y = k
    };
    this.idle = function() {
        l.visible = !0;
        v.visible = !1;
        v.gotoAndStop("start");
        l.gotoAndPlay("anim")
    };
    this.jump = function(w, E) {
        d = w;
        f = E;
        l.visible = !1;
        v.visible = !0;
        l.gotoAndStop("start");
        v.gotoAndPlay("start_jump");
        playSound("character_jump", 1, !1)
    };
    this._onEndAnimJump = function(w) {
        if ("start_jump" === w.name) {
            w = f;
            var E = d,
                G = 200 + 50 * Math.random();
            createjs.Tween.get(y).to({
                y: y.y - G
            }, w / 2, createjs.Ease.cubicOut).to({
                y: E.y
            }, w / 2, createjs.Ease.cubicIn);
            createjs.Tween.get(y).to({
                x: E.x
            }, w, createjs.Ease.linear).call(function() {
                u.endJump()
            })
        }
    };
    this.endJump =
        function() {
            v.gotoAndPlay("landing");
            g[ON_CHARACTER_END_JUMP] && g[ON_CHARACTER_END_JUMP].call(e[ON_CHARACTER_END_JUMP])
        };
    this.moveDown = function() {
        createjs.Tween.get(v).to({
            y: v.y + 20
        }, 500, createjs.Ease.cubicOut).to({
            y: v.y
        }, 500, createjs.Ease.cubicOut).call(function() {
            u.idle()
        })
    };
    this.getX = function() {
        return y.x
    };
    this.getContainer = function() {
        return y
    };
    this._init(a, b)
}

function CBonusParallax(a, b, c) {
    var d;
    this._init = function(f, h) {
        d = new createjs.Container;
        d.x = f;
        d.y = h;
        c.addChild(d);
        var k = s_oSpriteLibrary.getSprite("rock_0"),
            g = createBitmap(k);
        g.regY = k.height;
        g.x = -50;
        g.y = 0;
        d.addChild(g);
        k = s_oSpriteLibrary.getSprite("rock_1");
        g = createBitmap(k);
        g.regY = k.height;
        g.x = 1E3;
        g.y = 100;
        d.addChild(g);
        k = s_oSpriteLibrary.getSprite("rock_0");
        g = createBitmap(k);
        g.regY = k.height;
        g.x = 2600;
        g.y = 200;
        g.scaleX = -1;
        d.addChild(g);
        k = s_oSpriteLibrary.getSprite("rock_1");
        g = createBitmap(k);
        g.regY =
            k.height;
        g.x = 3500;
        g.y = 150;
        d.addChild(g)
    };
    this.reset = function() {
        d.x = 0
    };
    this.scrollLeft = function() {
        createjs.Tween.get(d).to({
            x: d.x - 100
        }, 2E3, createjs.Ease.cubicOut)
    };
    this._init(a, b)
}

function CBonusPlatformController(a, b, c) {
    var d, f, h, k, g, e, l, v, y, u, w = null,
        E, G = null,
        x, z, m;
    this._init = function(r, F) {
        d = r;
        f = F;
        u = [];
        z = new createjs.Container;
        z.x = r;
        z.y = F;
        c.addChild(z);
        m = new createjs.Container;
        z.addChild(m);
        var D = s_oSpriteLibrary.getSprite("platform_0");
        D = createBitmap(D);
        m.addChild(D);
        x = new CBonusCharacter(400, 60, z);
        x.addEventListener(ON_CHARACTER_END_JUMP, this._onEndJump, this);
        this.addPlatforms(!1)
    };
    this.reset = function() {
        k = g = !1;
        m.removeAllChildren();
        G = null;
        null !== w && (z.removeChild(w), w = null);
        z.x = d;
        z.y = f;
        var r = s_oSpriteLibrary.getSprite("platform_0");
        r = createBitmap(r);
        m.addChild(r);
        x.reset();
        this.addPlatforms(!1);
        z.setChildIndex(m, 0);
        z.setChildIndex(x.getContainer(), 1)
    };
    this.startBonus = function(r) {
        x.idle()
    };
    this.addPlatforms = function(r) {
        g = r;
        for (var F = 0; F < u.length; F++) u[F].unload();
        u = [];
        var D = 1,
            B = x.getX() + 484;
        for (F = 0; 3 > F; F++) {
            var J = s_oSpriteLibrary.getSprite("platform_" + D),
                A = new CBonusBut(B, CANVAS_HEIGHT, r, J, m);
            A.addEventListenerWithParams(ON_MOUSE_DOWN, this._onPlatformClick, this, F);
            v =
                J.width / 2;
            B += v + 38;
            u.push(A);
            A.moveY(115, 1E3, 500 + 200 * D, createjs.Ease.backOut);
            D++
        }
        var N = this;
        y = setInterval(function() {
            N.shakeRandPlatform()
        }, 2500)
    };
    this.unload = function() {
        this._removePlatforms()
    };
    this._removePlatforms = function(r) {
        clearInterval(y);
        if (null !== G) {
            var F = s_oSpriteLibrary.getSprite("platform_" + (l + 1)),
                D = new createjs.SpriteSheet({
                    images: [F],
                    frames: {
                        width: F.width / 2,
                        height: F.height,
                        regX: F.width / 4,
                        regY: F.height / 2
                    },
                    animations: {
                        state_0: 0,
                        state_1: 1
                    }
                });
            F = createSprite(D, "state_1", F.width / 4, F.height /
                2, F.width / 2, F.height);
            F.x = G.getX();
            F.y = G.getY();
            F.alpha = 0;
            m.addChild(F);
            var B = this;
            createjs.Tween.get(F).to({
                alpha: 1
            }, 1E3).call(function() {
                B.addPlatforms(r)
            })
        }
    };
    this.shakeRandPlatform = function() {
        u[Math.floor(3 * Math.random())].trembleAnimation()
    };
    this.jumpCharacter = function(r, F, D) {
        h = D;
        e = F;
        G = u[r];
        F = 1E3 + 200 * r;
        var B = [];
        if (D) {
            D = {
                x: G.getX(),
                y: 77
            };
            for (var J = 0; 3 > J; J++) J !== r && B.push(J);
            E = G
        } else {
            D = {
                x: G.getX() + 100,
                y: 845
            };
            F += 500;
            B.push(r);
            for (J = 0; 3 > J; J++)
                if (J !== r) {
                    B.push(J);
                    break
                }
            for (r = 0; r < u.length; r++)
                if (-1 ===
                    B.indexOf(r)) {
                    E = u[r];
                    break
                }
        }
        for (r = 0; r < B.length; r++) u[B[r]].moveY(CANVAS_HEIGHT, 1E3, 0, createjs.Ease.cubicOut);
        x.jump(D, F);
        g && (z.setChildIndex(m, 1), z.setChildIndex(x.getContainer(), 0))
    };
    this._onEndJump = function() {
        var r = 0;
        h ? (k ? (x.hide(), G.playPotAnim(), playSound("character_landing_pot", 1, !1), setTimeout(function() {
            s_oBonusPanel.endBonus()
        }, 1500)) : (playSound("character_landing", 1, !1), x.moveDown(), createjs.Tween.get(G.getButtonImage()).to({
            y: G.getY() + 26
        }, 500, createjs.Ease.cubicOut).to({
                y: G.getY()
            }, 500,
            createjs.Ease.cubicOut).call(function() {
            s_oBonusPanel.scrollLeft()
        })), r = formatEntries(e), new CScoreText(r, E.getX(), E.getY(), z), playSound("bonus_mult", 1, !1), s_oBonusPanel.refreshScoreAmount()) : (playSound("character_falling", 1, !1), setTimeout(function() {
            s_oBonusPanel.endBonus()
        }, 1500))
    };
    this._onPlatformClick = function(r) {
        for (var F = 0; F < u.length; F++) u[F].setClickable(!1);
        l = r;
        s_oBonusPanel._onButtonRelease(r)
    };
    this.scrollLeft = function(r) {
        k = r;
        this._removePlatforms(k);
        r = m.x - G.getX() + 384;
        createjs.Tween.get(z).to({
                x: r
            },
            2E3, createjs.Ease.cubicOut)
    };
    this._init(a, b)
}

function CScoreText(a, b, c, d) {
    var f;
    this._init = function(h, k, g) {
        f = new createjs.Text("00000", "100px " + FONT_GAME_1, "#fede00");
        f.textAlign = "center";
        f.text = h;
        f.x = k;
        f.y = g;
        f.alpha = 0;
        f.shadow = new createjs.Shadow("#000", 1, 1, 1);
        d.addChild(f);
        var e = this;
        createjs.Tween.get(f).to({
            alpha: 1
        }, 200, createjs.Ease.quadIn).call(function() {
            e.moveUp()
        })
    };
    this.moveUp = function() {
        var h = f.y - 400,
            k = this;
        createjs.Tween.get(f).to({
            y: h
        }, 1500, createjs.Ease.sineIn).call(function() {
            k.unload()
        });
        createjs.Tween.get(f).wait(800).to({
                alpha: 0
            },
            500)
    };
    this.unload = function() {
        d.removeChild(f)
    };
    this._init(a, b, c)
}

function CFreespinPanel(a) {
    var b, c, d, f;
    this._init = function() {
        f = new createjs.Container;
        f.on("click", function() {});
        f.visible = !1;
        a.addChild(f);
        b = new createjs.Shape;
        b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.addChild(b);
        var h = s_oSpriteLibrary.getSprite("msg_box_small");
        d = new createjs.Container;
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2;
        d.regX = h.width / 2;
        d.regY = h.height / 2;
        f.addChild(d);
        var k = createBitmap(h);
        d.addChild(k);
        new CTLText(d, 50, 80, h.width - 100, 74, 74, "center", "#fede00",
            FONT_GAME_1, 1, 0, 0, TEXT_CONGRATS, !0, !0, !0, !1);
        c = new CTLText(d, 50, 200, h.width - 100, 180, 60, "center", "#fede00", FONT_GAME_1, 1, 0, 0, " ", !0, !0, !0, !1)
    };
    this.show = function(h) {
        c.refreshText(TEXT_YOU_WIN + " " + h + " " + TEXT_FREESPINS);
        f.visible = !0;
        d.scale = 0;
        b.alpha = 0;
        var k = this;
        createjs.Tween.get(b).to({
            alpha: .7
        }, 300, createjs.Ease.quartOut);
        createjs.Tween.get(d).to({
            scale: 1
        }, 1E3, createjs.Ease.elasticOut).call(function() {
            setTimeout(function() {
                k.hide()
            }, 3E3)
        });
        playSound("bonus_end", 1, !1)
    };
    this.hide = function() {
        createjs.Tween.get(b).to({
                alpha: 0
            },
            500, createjs.Ease.quartOut);
        createjs.Tween.get(d).to({
            scale: 0
        }, 500, createjs.Ease.backIn).call(function() {
            s_oGame.exitFromFreespinPanel()
        })
    };
    this._init()
}

function CAvatar(a) {
    var b, c, d, f;
    this._init = function() {
        b = -100;
        c = CANVAS_HEIGHT;
        f = new createjs.Container;
        f.x = b;
        f.y = c;
        h.addChild(f);
        for (var k = [], g = 0; 289 > g; g++) k.push(s_oSpriteLibrary.getSprite("avatar_" + g));
        k = new createjs.SpriteSheet({
            images: k,
            framerate: 60,
            frames: {
                width: 382,
                height: 518,
                regX: 0,
                regY: 518
            },
            animations: {
                idle: [0, 121],
                win: [122, 288, "idle"]
            }
        });
        d = createSprite(k, "start", 0, 635, 649, 635);
        f.addChild(d);
        this.refreshButtonPos()
    };
    this._hideAllAnims = function() {};
    this.refreshButtonPos = function() {
        f.x = 150 < s_iOffsetX ?
            b + s_iOffsetX : 0;
        f.y = c - s_iOffsetY
    };
    this.show = function(k) {
        d.gotoAndPlay(k)
    };
    var h = a;
    this._init()
}

function CResultFreespin(a) {
    var b, c, d, f, h, k, g;
    this._init = function() {
        g = new createjs.Container;
        g.visible = !1;
        e.addChild(g);
        b = new createjs.Shape;
        b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h = b.on("click", function() {});
        g.addChild(b);
        var l = s_oSpriteLibrary.getSprite("msg_box_small");
        f = new createjs.Container;
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT / 2;
        f.regX = l.width / 2;
        f.regY = l.height / 2;
        g.addChild(f);
        var v = createBitmap(l);
        f.addChild(v);
        c = new CTLText(f, 50, 70, l.width - 100, 74, 74, "center",
            "#fede00", FONT_GAME_1, 1, 0, 0, TEXT_CONGRATS, !0, !0, !0, !1);
        d = new CTLText(f, 50, 160, l.width - 100, 210, 70, "center", "#fede00", FONT_GAME_1, 1, 0, 0, TEXT_CONGRATS, !0, !0, !0, !1);
        k = new CGfxButton(l.width / 2, l.height + 80, s_oSpriteLibrary.getSprite("but_yes"), f);
        k.addEventListener(ON_MOUSE_UP, this.hide, this)
    };
    this.unload = function() {
        k.unload();
        b.off("click", h)
    };
    this.show = function(l) {
        k.enable();
        0 === l ? (c.refreshText(""), d.y = 0, d.refreshText(TEXT_NO_WIN)) : (c.refreshText(TEXT_CONGRATS), d.y = 30, d.refreshText(TEXT_YOU_WON + " " +
            formatEntries(l)));
        g.alpha = 1;
        g.visible = !0;
        f.scale = 0;
        b.alpha = 0;
        var v = this;
        createjs.Tween.get(b).to({
            alpha: .7
        }, 300, createjs.Ease.quartOut);
        createjs.Tween.get(f).to({
            scale: 1
        }, 1E3, createjs.Ease.elasticOut).call(function() {
            setTimeout(function() {
                v.hide()
            }, 3E3)
        });
        playSound("bonus_end", 1, !1)
    };
    this.hide = function() {
        k.disable();
        createjs.Tween.get(b).to({
            alpha: 0
        }, 500, createjs.Ease.quartOut);
        createjs.Tween.get(f).to({
            scale: 0
        }, 500, createjs.Ease.backIn).call(function() {
            g.visible = !1
        })
    };
    var e = a;
    this._init()
}

function CRechargePanel() {
    var a, b, c, d, f, h, k, g = this;
    this._init = function() {
        k = new createjs.Container;
        s_oStage.addChild(k);
        b = new createjs.Shape;
        a = b.on("click", function() {});
        b.alpha = 0;
        b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.addChild(b);
        var e = s_oSpriteLibrary.getSprite("msg_box_small");
        c = new createjs.Container;
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT / 2;
        c.regX = .5 * e.width;
        c.regY = .5 * e.height;
        k.addChild(c);
        h = createBitmap(e);
        c.addChild(h);
        new CTLText(c, 50, 60, e.width - 100, 180, 90, "center",
            "#fede00", FONT_GAME_1, 1, 40, 10, TEXT_RECHARGE, !0, !0, !0, !1);
        var l = s_oSpriteLibrary.getSprite("but_no");
        f = new CGfxButton(130, 380, l, c);
        f.addEventListener(ON_MOUSE_UP, this.hide, this);
        d = new CGfxButton(e.width - 130, 380, s_oSpriteLibrary.getSprite("but_yes"), c);
        d.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
        this.disableButtons();
        k.visible = !0;
        c.scale = 0;
        b.alpha = 0;
        createjs.Tween.get(b).to({
            alpha: .7
        }, 300, createjs.Ease.quartOut);
        createjs.Tween.get(c).to({
            scale: 1
        }, 1E3, createjs.Ease.elasticOut).call(function() {
            g.enableButtons()
        })
    };
    this.unload = function() {
        f.unload();
        d.unload();
        b.off("click", a);
        s_oStage.removeChild(k)
    };
    this.disableButtons = function() {
        d.disable();
        f.disable()
    };
    this.enableButtons = function() {
        f.enable();
        d.enable()
    };
    this.hide = function() {
        var e = this;
        createjs.Tween.get(b).to({
            alpha: 0
        }, 500, createjs.Ease.quartOut);
        createjs.Tween.get(c).to({
            scale: 0
        }, 500, createjs.Ease.backIn).call(function() {
            e.unload()
        })
    };
    this._onRecharge = function() {
        g.hide();
        $(s_oMain).trigger("recharge")
    };
    this._init()
}

function CSuspanceEffect(a, b, c) {
    var d, f;
    this._init = function(h, k) {
        f = new createjs.Container;
        f.visible = !1;
        f.x = h - 92;
        f.y = k - 34;
        c.addChild(f);
        for (var g = [], e = 0; 191 > e; e++) g.push(s_oSpriteLibrary.getSprite("suspance_" + e));
        g = new createjs.SpriteSheet({
            images: g,
            framerate: 60,
            frames: {
                width: 426,
                height: 754
            },
            animations: {
                start: 0,
                start_anim: [0, 61, "anim"],
                anim: [62, 126],
                end: [127, 190, "stop"],
                stop: 191
            }
        });
        d = createSprite(g, "start", 0, 0, 426, 754);
        d.on("animationend", this._onAnimEnd, this);
        f.addChild(d)
    };
    this.show = function() {
        f.visible ||
            (f.visible = !0, f.alpha = 0, d.gotoAndPlay("start_anim"), createjs.Tween.get(f).to({
                alpha: 1
            }, 500, createjs.Ease.cubicOut), playSound("suspance", 1, !0))
    };
    this.hide = function() {
        d.gotoAndPlay("end");
        stopSound("suspance")
    };
    this._onAnimEnd = function(h) {
        "end" === h.name && (f.visible = !1, d.gotoAndStop("start"))
    };
    this._init(a, b)
}

function extractHostname(a) {
    a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
    a = a.split(":")[0];
    return a = a.split("?")[0]
}

function extractRootDomain(a) {
    a = extractHostname(a);
    var b = a.split("."),
        c = b.length;
    2 < c && (a = b[c - 2] + "." + b[c - 1]);
    return a
}
var getClosestTop = function() {
        var a = window,
            b = !1;
        try {
            for (; a.parent.document !== a.document;)
                if (a.parent.document) a = a.parent;
                else {
                    b = !0;
                    break
                }
        } catch (c) {
            b = !0
        }
        return {
            topFrame: a,
            err: b
        }
    },
    getBestPageUrl = function(a) {
        var b = a.topFrame,
            c = "";
        if (a.err) try {
            try {
                c = window.top.location.href
            } catch (f) {
                var d = window.location.ancestorOrigins;
                c = d[d.length - 1]
            }
        } catch (f) {
            c = b.document.referrer
        } else c = b.location.href;
        return c
    },
    TOPFRAMEOBJ = getClosestTop(),
    PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);

function seekAndDestroy() {
    for (var a = extractRootDomain(PAGE_URL), b = [String.fromCharCode(99, 111, 100, 101, 116, 104, 105, 115, 108, 97, 98, 46, 99, 111, 109), String.fromCharCode(101, 110, 118, 97, 116, 111, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116)], c = 0; c < b.length; c++)
        if (b[c] === a) return !0;
    return !1
};