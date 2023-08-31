! function() {
    var a = "undefined" != typeof window && void 0 !== window.document ? window.document : {},
        c = "undefined" != typeof module && module.exports,
        b = function() {
            for (var g, m = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "),
                    "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")
                ], q = 0, l = m.length, u = {}; q < l; q++)
                if ((g = m[q]) && g[1] in a) {
                    for (q = 0; q < g.length; q++) u[m[0][q]] = g[q];
                    return u
                }
            return !1
        }(),
        d = {
            change: b.fullscreenchange,
            error: b.fullscreenerror
        },
        h = {
            request: function(g) {
                return new Promise(function(m, q) {
                    var l = function() {
                        this.off("change",
                            l);
                        m()
                    }.bind(this);
                    this.on("change", l);
                    g = g || a.documentElement;
                    Promise.resolve(g[b.requestFullscreen]())["catch"](q)
                }.bind(this))
            },
            exit: function() {
                return new Promise(function(g, m) {
                    if (this.isFullscreen) {
                        var q = function() {
                            this.off("change", q);
                            g()
                        }.bind(this);
                        this.on("change", q);
                        Promise.resolve(a[b.exitFullscreen]())["catch"](m)
                    } else g()
                }.bind(this))
            },
            toggle: function(g) {
                return this.isFullscreen ? this.exit() : this.request(g)
            },
            onchange: function(g) {
                this.on("change", g)
            },
            onerror: function(g) {
                this.on("error", g)
            },
            on: function(g, m) {
                var q = d[g];
                q && a.addEventListener(q, m, !1)
            },
            off: function(g, m) {
                var q = d[g];
                q && a.removeEventListener(q, m, !1)
            },
            raw: b
        };
    b ? (Object.defineProperties(h, {
        isFullscreen: {
            get: function() {
                return !!a[b.fullscreenElement]
            }
        },
        element: {
            enumerable: !0,
            get: function() {
                return a[b.fullscreenElement]
            }
        },
        isEnabled: {
            enumerable: !0,
            get: function() {
                return !!a[b.fullscreenEnabled]
            }
        }
    }), c ? module.exports = h : window.screenfull = h) : c ? module.exports = {
        isEnabled: !1
    } : window.screenfull = {
        isEnabled: !1
    }
}();
(function() {
    function a(t) {
        t = String(t);
        return t.charAt(0).toUpperCase() + t.slice(1)
    }

    function c(t, E) {
        var D = -1,
            F = t ? t.length : 0;
        if ("number" == typeof F && -1 < F && F <= k)
            for (; ++D < F;) E(t[D], D, t);
        else d(t, E)
    }

    function b(t) {
        t = String(t).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(t) ? t : a(t)
    }

    function d(t, E) {
        for (var D in t) x.call(t, D) && E(t[D], D, t)
    }

    function h(t) {
        return null == t ? a(t) : y.call(t).slice(8, -1)
    }

    function g(t, E) {
        var D = null != t ? typeof t[E] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(D) &&
            ("object" == D ? !!t[E] : !0)
    }

    function m(t) {
        return String(t).replace(/([ -])(?!$)/g, "$1?")
    }

    function q(t, E) {
        var D = null;
        c(t, function(F, B) {
            D = E(D, F, B, t)
        });
        return D
    }

    function l(t) {
        function E(U) {
            return q(U, function(R, O) {
                var W = O.pattern || m(O);
                !R && (R = RegExp("\\b" + W + " *\\d+[.\\w_]*", "i").exec(t) || RegExp("\\b" + W + " *\\w+-[\\w]*", "i").exec(t) || RegExp("\\b" + W + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(t)) && ((R = String(O.label && !RegExp(W, "i").test(O.label) ? O.label : R).split("/"))[1] && !/[\d.]+/.test(R[0]) && (R[0] +=
                    " " + R[1]), O = O.label || O, R = b(R[0].replace(RegExp(W, "i"), O).replace(RegExp("; *(?:" + O + "[_-])?", "i"), " ").replace(RegExp("(" + O + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return R
            })
        }

        function D(U) {
            return q(U, function(R, O) {
                return R || (RegExp(O + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(t) || 0)[1] || null
            })
        }
        var F = w,
            B = t && "object" == typeof t && "String" != h(t);
        B && (F = t, t = null);
        var M = F.navigator || {},
            C = M.userAgent || "";
        t || (t = C);
        var P = B ? !!M.likeChrome : /\bChrome\b/.test(t) && !/internal|\n/i.test(y.toString()),
            L = B ? "Object" : "ScriptBridgingProxyObject",
            K = B ? "Object" : "Environment",
            Q = B && F.java ? "JavaPackage" : h(F.java),
            Y = B ? "Object" : "RuntimeObject";
        K = (Q = /\bJava/.test(Q) && F.java) && h(F.environment) == K;
        var aa = Q ? "a" : "\u03b1",
            J = Q ? "b" : "\u03b2",
            V = F.document || {},
            T = F.operamini || F.opera,
            S = n.test(S = B && T ? T["[[Class]]"] : h(T)) ? S : T = null,
            e, r = t;
        B = [];
        var v = null,
            p = t == C;
        C = p && T && "function" == typeof T.version && T.version();
        var H = function(U) {
                return q(U, function(R, O) {
                    return R || RegExp("\\b" + (O.pattern || m(O)) + "\\b", "i").exec(t) && (O.label ||
                        O)
                })
            }([{
                label: "EdgeHTML",
                pattern: "Edge"
            }, "Trident", {
                label: "WebKit",
                pattern: "AppleWebKit"
            }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
            G = function(U) {
                return q(U, function(R, O) {
                    return R || RegExp("\\b" + (O.pattern || m(O)) + "\\b", "i").exec(t) && (O.label || O)
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
            N = E([{
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
            X = function(U) {
                return q(U, function(R, O, W) {
                    return R || (O[N] || O[/^[a-z]+(?: +[a-z]+\b)*/i.exec(N)] || RegExp("\\b" + m(W) + "(?:\\b|\\w*\\d)", "i").exec(t)) && W
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
            I = function(U) {
                return q(U, function(R, O) {
                    var W = O.pattern || m(O);
                    if (!R && (R = RegExp("\\b" + W + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(t))) {
                        var Z = R,
                            ba = O.label || O,
                            ca = {
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
                        W && ba && /^Win/i.test(Z) && !/^Windows Phone /i.test(Z) && (ca = ca[/[\d.]+$/.exec(Z)]) && (Z = "Windows " + ca);
                        Z = String(Z);
                        W && ba && (Z = Z.replace(RegExp(W, "i"), ba));
                        R = Z = b(Z.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/,
                            "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                    }
                    return R
                })
            }(["Windows Phone", "Android", "CentOS", {
                    label: "Chrome OS",
                    pattern: "CrOS"
                }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X",
                "Macintosh", "Mac", "Windows 98;", "Windows "
            ]);
        H && (H = [H]);
        X && !N && (N = E([X]));
        if (e = /\bGoogle TV\b/.exec(N)) N = e[0];
        /\bSimulator\b/i.test(t) && (N = (N ? N + " " : "") + "Simulator");
        "Opera Mini" == G && /\bOPiOS\b/.test(t) && B.push("running in Turbo/Uncompressed mode");
        "IE" == G && /\blike iPhone OS\b/.test(t) ? (e = l(t.replace(/like iPhone OS/, "")), X = e.manufacturer, N = e.product) : /^iP/.test(N) ? (G || (G = "Safari"), I = "iOS" + ((e = / OS ([\d_]+)/i.exec(t)) ? " " + e[1].replace(/_/g, ".") : "")) : "Konqueror" != G || /buntu/i.test(I) ? X && "Google" != X &&
            (/Chrome/.test(G) && !/\bMobile Safari\b/i.test(t) || /\bVita\b/.test(N)) || /\bAndroid\b/.test(I) && /^Chrome/.test(G) && /\bVersion\//i.test(t) ? (G = "Android Browser", I = /\bAndroid\b/.test(I) ? I : "Android") : "Silk" == G ? (/\bMobi/i.test(t) || (I = "Android", B.unshift("desktop mode")), /Accelerated *= *true/i.test(t) && B.unshift("accelerated")) : "PaleMoon" == G && (e = /\bFirefox\/([\d.]+)\b/.exec(t)) ? B.push("identifying as Firefox " + e[1]) : "Firefox" == G && (e = /\b(Mobile|Tablet|TV)\b/i.exec(t)) ? (I || (I = "Firefox OS"), N || (N = e[1])) : !G ||
            (e = !/\bMinefield\b/i.test(t) && /\b(?:Firefox|Safari)\b/.exec(G)) ? (G && !N && /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(e + "/") + 8)) && (G = null), (e = N || X || I) && (N || X || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(I)) && (G = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(I) ? I : e) + " Browser")) : "Electron" == G && (e = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) && B.push("Chromium " + e) : I = "Kubuntu";
        C || (C = D(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", m(G),
            "(?:Firefox|Minefield|NetFront)"
        ]));
        if (e = "iCab" == H && 3 < parseFloat(C) && "WebKit" || /\bOpera\b/.test(G) && (/\bOPR\b/.test(t) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(t) && !/^(?:Trident|EdgeHTML)$/.test(H) && "WebKit" || !H && /\bMSIE\b/i.test(t) && ("Mac OS" == I ? "Tasman" : "Trident") || "WebKit" == H && /\bPlayStation\b(?! Vita\b)/i.test(G) && "NetFront") H = [e];
        "IE" == G && (e = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1]) ? (G += " Mobile", I = "Windows Phone " + (/\+$/.test(e) ? e : e + ".x"), B.unshift("desktop mode")) : /\bWPDesktop\b/i.test(t) ?
            (G = "IE Mobile", I = "Windows Phone 8.x", B.unshift("desktop mode"), C || (C = (/\brv:([\d.]+)/.exec(t) || 0)[1])) : "IE" != G && "Trident" == H && (e = /\brv:([\d.]+)/.exec(t)) && (G && B.push("identifying as " + G + (C ? " " + C : "")), G = "IE", C = e[1]);
        if (p) {
            if (g(F, "global"))
                if (Q && (e = Q.lang.System, r = e.getProperty("os.arch"), I = I || e.getProperty("os.name") + " " + e.getProperty("os.version")), K) {
                    try {
                        C = F.require("ringo/engine").version.join("."), G = "RingoJS"
                    } catch (U) {
                        (e = F.system) && e.global.system == F.system && (G = "Narwhal", I || (I = e[0].os || null))
                    }
                    G ||
                        (G = "Rhino")
                } else "object" == typeof F.process && !F.process.browser && (e = F.process) && ("object" == typeof e.versions && ("string" == typeof e.versions.electron ? (B.push("Node " + e.versions.node), G = "Electron", C = e.versions.electron) : "string" == typeof e.versions.nw && (B.push("Chromium " + C, "Node " + e.versions.node), G = "NW.js", C = e.versions.nw)), G || (G = "Node.js", r = e.arch, I = e.platform, C = (C = /[\d.]+/.exec(e.version)) ? C[0] : null));
            else h(e = F.runtime) == L ? (G = "Adobe AIR", I = e.flash.system.Capabilities.os) : h(e = F.phantom) == Y ? (G = "PhantomJS",
                C = (e = e.version || null) && e.major + "." + e.minor + "." + e.patch) : "number" == typeof V.documentMode && (e = /\bTrident\/(\d+)/i.exec(t)) ? (C = [C, V.documentMode], (e = +e[1] + 4) != C[1] && (B.push("IE " + C[1] + " mode"), H && (H[1] = ""), C[1] = e), C = "IE" == G ? String(C[1].toFixed(1)) : C[0]) : "number" == typeof V.documentMode && /^(?:Chrome|Firefox)\b/.test(G) && (B.push("masking as " + G + " " + C), G = "IE", C = "11.0", H = ["Trident"], I = "Windows");
            I = I && b(I)
        }
        C && (e = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(C) || /(?:alpha|beta)(?: ?\d)?/i.exec(t + ";" + (p && M.appMinorVersion)) ||
            /\bMinefield\b/i.test(t) && "a") && (v = /b/i.test(e) ? "beta" : "alpha", C = C.replace(RegExp(e + "\\+?$"), "") + ("beta" == v ? J : aa) + (/\d+\+?/.exec(e) || ""));
        if ("Fennec" == G || "Firefox" == G && /\b(?:Android|Firefox OS)\b/.test(I)) G = "Firefox Mobile";
        else if ("Maxthon" == G && C) C = C.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(N)) "Xbox 360" == N && (I = null), "Xbox 360" == N && /\bIEMobile\b/.test(t) && B.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(G) && (!G || N || /Browser|Mobi/.test(G)) || "Windows CE" != I && !/Mobi/i.test(t))
            if ("IE" ==
                G && p) try {
                null === F.external && B.unshift("platform preview")
            } catch (U) {
                B.unshift("embedded")
            } else(/\bBlackBerry\b/.test(N) || /\bBB10\b/.test(t)) && (e = (RegExp(N.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(t) || 0)[1] || C) ? (e = [e, /BB10/.test(t)], I = (e[1] ? (N = null, X = "BlackBerry") : "Device Software") + " " + e[0], C = null) : this != d && "Wii" != N && (p && T || /Opera/.test(G) && /\b(?:MSIE|Firefox)\b/i.test(t) || "Firefox" == G && /\bOS X (?:\d+\.){2,}/.test(I) || "IE" == G && (I && !/^Win/.test(I) && 5.5 < C || /\bWindows XP\b/.test(I) && 8 < C || 8 == C && !/\bTrident\b/.test(t))) &&
                !n.test(e = l.call(d, t.replace(n, "") + ";")) && e.name && (e = "ing as " + e.name + ((e = e.version) ? " " + e : ""), n.test(G) ? (/\bIE\b/.test(e) && "Mac OS" == I && (I = null), e = "identify" + e) : (e = "mask" + e, G = S ? b(S.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(e) && (I = null), p || (C = null)), H = ["Presto"], B.push(e));
            else G += " Mobile";
        if (e = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1]) {
            e = [parseFloat(e.replace(/\.(\d)$/, ".0$1")), e];
            if ("Safari" == G && "+" == e[1].slice(-1)) G = "WebKit Nightly", v = "alpha", C = e[1].slice(0, -1);
            else if (C ==
                e[1] || C == (e[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1])) C = null;
            e[1] = (/\bChrome\/([\d.]+)/i.exec(t) || 0)[1];
            537.36 == e[0] && 537.36 == e[2] && 28 <= parseFloat(e[1]) && "WebKit" == H && (H = ["Blink"]);
            p && (P || e[1]) ? (H && (H[1] = "like Chrome"), e = e[1] || (e = e[0], 530 > e ? 1 : 532 > e ? 2 : 532.05 > e ? 3 : 533 > e ? 4 : 534.03 > e ? 5 : 534.07 > e ? 6 : 534.1 > e ? 7 : 534.13 > e ? 8 : 534.16 > e ? 9 : 534.24 > e ? 10 : 534.3 > e ? 11 : 535.01 > e ? 12 : 535.02 > e ? "13+" : 535.07 > e ? 15 : 535.11 > e ? 16 : 535.19 > e ? 17 : 536.05 > e ? 18 : 536.1 > e ? 19 : 537.01 > e ? 20 : 537.11 > e ? "21+" : 537.13 > e ? 23 : 537.18 > e ? 24 : 537.24 > e ? 25 : 537.36 >
                e ? 26 : "Blink" != H ? "27" : "28")) : (H && (H[1] = "like Safari"), e = (e = e[0], 400 > e ? 1 : 500 > e ? 2 : 526 > e ? 3 : 533 > e ? 4 : 534 > e ? "4+" : 535 > e ? 5 : 537 > e ? 6 : 538 > e ? 7 : 601 > e ? 8 : "8"));
            H && (H[1] += " " + (e += "number" == typeof e ? ".x" : /[.+]/.test(e) ? "" : "+"));
            "Safari" == G && (!C || 45 < parseInt(C)) && (C = e)
        }
        "Opera" == G && (e = /\bzbov|zvav$/.exec(I)) ? (G += " ", B.unshift("desktop mode"), "zvav" == e ? (G += "Mini", C = null) : G += "Mobile", I = I.replace(RegExp(" *" + e + "$"), "")) : "Safari" == G && /\bChrome\b/.exec(H && H[1]) && (B.unshift("desktop mode"), G = "Chrome Mobile", C = null, /\bOS X\b/.test(I) ?
            (X = "Apple", I = "iOS 4.3+") : I = null);
        C && 0 == C.indexOf(e = /[\d.]+$/.exec(I)) && -1 < t.indexOf("/" + e + "-") && (I = String(I.replace(e, "")).replace(/^ +| +$/g, ""));
        H && !/\b(?:Avant|Nook)\b/.test(G) && (/Browser|Lunascape|Maxthon/.test(G) || "Safari" != G && /^iOS/.test(I) && /\bSafari\b/.test(H[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(G) && H[1]) && (e = H[H.length - 1]) && B.push(e);
        B.length && (B = ["(" + B.join("; ") + ")"]);
        X && N && 0 > N.indexOf(X) && B.push("on " + X);
        N && B.push((/^on /.test(B[B.length -
            1]) ? "" : "on ") + N);
        if (I) {
            var da = (e = / ([\d.+]+)$/.exec(I)) && "/" == I.charAt(I.length - e[0].length - 1);
            I = {
                architecture: 32,
                family: e && !da ? I.replace(e[0], "") : I,
                version: e ? e[1] : null,
                toString: function() {
                    var U = this.version;
                    return this.family + (U && !da ? " " + U : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }(e = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(r)) && !/\bi686\b/i.test(r) ? (I && (I.architecture = 64, I.family = I.family.replace(RegExp(" *" + e), "")), G && (/\bWOW64\b/i.test(t) || p && /\w(?:86|32)$/.test(M.cpuClass || M.platform) && !/\bWin64; x64\b/i.test(t)) &&
            B.unshift("32-bit")) : I && /^OS X/.test(I.family) && "Chrome" == G && 39 <= parseFloat(C) && (I.architecture = 64);
        t || (t = null);
        F = {};
        F.description = t;
        F.layout = H && H[0];
        F.manufacturer = X;
        F.name = G;
        F.prerelease = v;
        F.product = N;
        F.ua = t;
        F.version = G && C;
        F.os = I || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        F.parse = l;
        F.toString = function() {
            return this.description || ""
        };
        F.version && B.unshift(C);
        F.name && B.unshift(G);
        I && G && (I != String(I).split(" ")[0] || I != G.split(" ")[0] && !N) && B.push(N ? "(" + I + ")" : "on " +
            I);
        B.length && (F.description = B.join(" "));
        return F
    }
    var u = {
            "function": !0,
            object: !0
        },
        w = u[typeof window] && window || this,
        A = u[typeof exports] && exports;
    u = u[typeof module] && module && !module.nodeType && module;
    var f = A && u && "object" == typeof global && global;
    !f || f.global !== f && f.window !== f && f.self !== f || (w = f);
    var k = Math.pow(2, 53) - 1,
        n = /\bOpera/;
    f = Object.prototype;
    var x = f.hasOwnProperty,
        y = f.toString,
        z = l();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (w.platform = z, define(function() {
            return z
        })) : A &&
        u ? d(z, function(t, E) {
            A[E] = t
        }) : w.platform = z
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
        }], c = 0; c < a.length; c++) {
        var b = document.createElement("meta");
        b.name = a[c].name;
        b.content = a[c].content;
        var d = window.document.head.querySelector('meta[name="' + b.name + '"]');
        d && d.parentNode.removeChild(d);
        window.document.head.appendChild(b)
    }
}

function hideIOSFullscreenPanel() {
    document.querySelector(".xxx-ios-fullscreen-message").style.display = "none";
    document.querySelector(".xxx-ios-fullscreen-scroll").style.display = "none";
    document.querySelector(".xxx-game-iframe-full").classList.remove("xxx-game-iframe-iphone-se")
}

function buildIOSFullscreenPanel() {
    document.body.insertAdjacentHTML("beforeend", '<div class="xxx-ios-fullscreen-message"><div class="xxx-ios-fullscreen-swipe"></div></div><div class="xxx-ios-fullscreen-scroll"></div>')
}

function showIOSFullscreenPanel() {
    document.querySelector(".xxx-ios-fullscreen-message").style.display = "none";
    document.querySelector(".xxx-ios-fullscreen-scroll").style.display = "none"
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
                    320 !== window.innerHeight && document.querySelector(".xxx-game-iframe-full").classList.add("xxx-game-iframe-iphone-se");
                    break;
                case 667:
                    375 === window.innerHeight ? hideIOSFullscreenPanel() : showIOSFullscreenPanel();
                    break;
                case 808:
                    414 === window.innerHeight ? hideIOSFullscreenPanel() :
                        showIOSFullscreenPanel();
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
        c = a.family.toLowerCase();
    a = parseFloat(a.version);
    return "ios" === c && 13 > a ? !0 : !1
}
document.addEventListener("DOMContentLoaded", function() {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && (buildIOSFullscreenPanel(), buildIOSMeta())
});
window.addEventListener("resize", function(a) {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && iosResize()
});
var s_iScaleFactor = 1,
    s_bIsIphone = !1,
    s_iOffsetX, s_iOffsetY, s_bFocus = !0,
    browserName = function(a) {
        switch (!0) {
            case -1 < a.indexOf("edge"):
                return "MS Edge";
            case -1 < a.indexOf("edg/"):
                return "Edge ( chromium based)";
            case -1 < a.indexOf("opr") && !!window.opr:
                return "Opera";
            case -1 < a.indexOf("chrome") && !!window.chrome:
                return "Chrome";
            case -1 < a.indexOf("trident"):
                return "MS IE";
            case -1 < a.indexOf("firefox"):
                return "Mozilla Firefox";
            case -1 < a.indexOf("safari"):
                return "Safari";
            default:
                return "other"
        }
    }(window.navigator.userAgent.toLowerCase());
window.addEventListener("resize", function(a) {
    sizeHandler()
}, !0);

function trace(a) {
    console.log(a)
}

function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
}

function isIpad() {
    var a = -1 !== navigator.userAgent.toLowerCase().indexOf("ipad");
    return !a && navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && 2 < navigator.maxTouchPoints ? !0 : a
}

function isMobile() {
    return isIpad() ? !0 : navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ? !0 : !1
}

function isIOS() {
    var a = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    if (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone")) return s_bIsIphone = !0;
    for (; a.length;)
        if (navigator.platform === a.pop()) return !0;
    return s_bIsIphone = !1
}

function getSize(a) {
    var c = a.toLowerCase(),
        b = window.document,
        d = b.documentElement;
    if (void 0 === window["inner" + a]) a = d["client" + a];
    else if (window["inner" + a] != d["client" + a]) {
        var h = b.createElement("body");
        h.id = "vpw-test-b";
        h.style.cssText = "overflow:scroll";
        var g = b.createElement("div");
        g.id = "vpw-test-d";
        g.style.cssText = "position:absolute;top:-1000px";
        g.innerHTML = "<style>@media(" + c + ":" + d["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + c + ":7px!important}}</style>";
        h.appendChild(g);
        d.insertBefore(h, b.head);
        a = 7 == g["offset" + a] ? d["client" + a] : window["inner" + a];
        d.removeChild(h)
    } else a = window["inner" + a];
    return a
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    sizeHandler()
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
    if (document.querySelector("#canvas")) {
        var a = null !== platform.name && "safari" === platform.name.toLowerCase() ? getIOSWindowHeight() : getSize("Height");
        var c = getSize("Width");
        s_bFocus && _checkOrientation(c, a);
        var b = Math.min(a / CANVAS_HEIGHT, c / CANVAS_WIDTH),
            d = Math.round(CANVAS_WIDTH * b);
        b = Math.round(CANVAS_HEIGHT * b);
        if (b < a) {
            var h = a - b;
            b += h;
            d += CANVAS_WIDTH / CANVAS_HEIGHT * h
        } else d < c && (h = c - d, d += h, b += CANVAS_HEIGHT / CANVAS_WIDTH * h);
        h = a / 2 - b / 2;
        var g = c / 2 - d / 2,
            m = CANVAS_WIDTH / d;
        if (g * m < -EDGEBOARD_X || h * m < -EDGEBOARD_Y) b = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), c / (CANVAS_WIDTH - 2 * EDGEBOARD_X)), d = Math.round(CANVAS_WIDTH * b), b = Math.round(CANVAS_HEIGHT * b), h = (a - b) / 2, g = (c - d) / 2, m = CANVAS_WIDTH / d;
        s_iOffsetX = -1 * g * m;
        s_iOffsetY = -1 * h * m;
        0 <= h && (s_iOffsetY = 0);
        0 <= g && (s_iOffsetX = 0);
        null !== s_oGame && s_oGame.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone && s_oStage ? (canvas = document.getElementById("canvas"), s_oStage.canvas.width =
            2 * d, s_oStage.canvas.height = 2 * b, canvas.style.width = d + "px", canvas.style.height = b + "px", s_iScaleFactor = 2 * Math.min(d / CANVAS_WIDTH, b / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor) : s_bMobile || isChrome() ? (document.querySelector("#canvas").style.width = d + "px", document.querySelector("#canvas").style.height = b + "px") : s_oStage && (s_oStage.canvas.width = d, s_oStage.canvas.height = b, s_iScaleFactor = Math.min(d / CANVAS_WIDTH, b / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 <= h && (h = (a - b) / 2);
        document.querySelector("#canvas").style.top = h + "px";
        document.querySelector("#canvas").style.left = g + "px";
        fullscreenHandler()
    }
}

function _checkOrientation(a, c) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (a > c ? "landscape" === document.querySelector(".orientation-msg-container").getAttribute("data-orientation") ? (document.querySelector(".orientation-msg-container").style.display = "none", s_oMain.startUpdate()) : (document.querySelector(".orientation-msg-container").style.display = "block", s_oMain.stopUpdate()) : "portrait" === document.querySelector(".orientation-msg-container").getAttribute("data-orientation") ? (document.querySelector(".orientation-msg-container").style.display =
        "none", s_oMain.startUpdate()) : (document.querySelector(".orientation-msg-container").style.display = "block", s_oMain.stopUpdate()))
}

function createBitmap(a, c, b) {
    var d = new createjs.Bitmap(a),
        h = new createjs.Shape;
    c && b ? h.graphics.beginFill("#fff").drawRect(0, 0, c, b) : h.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    d.hitArea = h;
    return d
}

function createSprite(a, c, b, d, h, g) {
    a = null !== c ? new createjs.Sprite(a, c) : new createjs.Sprite(a);
    c = new createjs.Shape;
    c.graphics.beginFill("#000000").drawRect(-b, -d, h, g);
    a.hitArea = c;
    return a
}

function randomFloatBetween(a, c, b) {
    "undefined" === typeof b && (b = 2);
    return parseFloat(Math.min(a + Math.random() * (c - a), c).toFixed(b))
}

function shuffle(a) {
    for (var c = a.length, b, d; 0 !== c;) d = Math.floor(Math.random() * c), --c, b = a[c], a[c] = a[d], a[d] = b;
    return a
}

function formatTime(a) {
    a /= 1E3;
    var c = Math.floor(a / 60);
    a = parseFloat(a - 60 * c).toFixed(1);
    var b = "";
    b = 10 > c ? b + ("0" + c + ":") : b + (c + ":");
    return 10 > a ? b + ("0" + a) : b + a
}

function rotateVector2D(a, c) {
    var b = c.getX() * Math.cos(a) + c.getY() * Math.sin(a),
        d = c.getX() * -Math.sin(a) + c.getY() * Math.cos(a);
    c.set(b, d)
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
            var c = document.createEvent("MouseEvents");
            c.initEvent("click", !0, !0);
            a.dispatchEvent(c)
        }
    }
};

function getUrlVars(a) {
    a = a.trim();
    var c = [];
    a = a.split("&");
    for (var b = 0; b < a.length; b++) {
        var d = a[b].split("=");
        c[d[0]] = d[1]
    }
    return c
}

function tryCheckLogin() {
    var a = checkLogin();
    a = getUrlVars(a);
    "true" === a.res ? (s_bLogged = !0, WHEEL_SETTINGS = a.bonus_prize.split("#"), s_oGameSettings.initSymbolWin(a.paytable), COIN_BET = a.coin_bet.split("#"), MAX_BET = parseFloat(COIN_BET[COIN_BET.length - 1]), MIN_BET = parseFloat(COIN_BET[0]), document.dispatchEvent(new CustomEvent("start_session")), s_oMenu.exitFromMenu()) : s_oMsgBox.show("can't login #" + a.desc)
}

function tryCallSpin(a, c, b) {
    a = callSpin(b, a, c);
    a = getUrlVars(a);
    if ("true" === a.res) s_oGame.onSpinReceived(a);
    else s_oMsgBox.show(a.desc)
}

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}

function getParamValue(a) {
    for (var c = window.location.search.substring(1).split("&"), b = 0; b < c.length; b++) {
        var d = c[b].split("=");
        if (d[0] == a) return d[1]
    }
}

function playSound(a, c, b) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(), s_aSounds[a].volume(c), s_aSounds[a].loop(b), s_aSounds[a]) : null
}

function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].stop()
}

function setVolume(a, c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].volume(c)
}

function setMute(a, c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].mute(c)
}
(function() {
    function a(b) {
        var d = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        b = b || window.event;
        b.type in d ? document.body.className = d[b.type] : (document.body.className = this[c] ? "hidden" : "visible", "hidden" === document.body.className ? (s_oMain.stopUpdate(), s_bFocus = !1) : (s_oMain.startUpdate(), s_bFocus = !0))
    }
    var c = "hidden";
    c in document ? document.addEventListener("visibilitychange", a) : (c = "mozHidden") in document ? document.addEventListener("mozvisibilitychange",
        a) : (c = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", a) : (c = "msHidden") in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin" in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
})();

function fullscreenHandler() {
    ENABLE_FULLSCREEN && screenfull.isEnabled && (s_bFullscreen = screenfull.isFullscreen, null !== s_oInterface && s_oInterface.resetFullscreenBut(), null !== s_oMenu && s_oMenu.resetFullscreenBut())
}
if (screenfull.isEnabled) screenfull.on("change", function() {
    s_bFullscreen = screenfull.isFullscreen;
    null !== s_oInterface && s_oInterface.resetFullscreenBut();
    null !== s_oMenu && s_oMenu.resetFullscreenBut()
});

function CSpriteLibrary() {
    var a = {},
        c, b, d, h, g, m;
    this.init = function(q, l, u) {
        c = {};
        d = b = 0;
        h = q;
        g = l;
        m = u
    };
    this.addSprite = function(q, l) {
        if (a.hasOwnProperty(q)) return !1;
        var u = new Image;
        a[q] = c[q] = {
            szPath: l,
            oSprite: u,
            bLoaded: !1
        };
        b++;
        return !0
    };
    this.getSprite = function(q) {
        return a.hasOwnProperty(q) ? a[q].oSprite : null
    };
    this._onSpritesLoaded = function() {
        b = 0;
        g.call(m)
    };
    this._onSpriteLoaded = function() {
        h.call(m);
        ++d === b && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var q in c) c[q].oSprite.oSpriteLibrary = this,
            c[q].oSprite.szKey = q, c[q].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey)
            }, c[q].oSprite.onerror = function(l) {
                var u = l.currentTarget;
                setTimeout(function() {
                    c[u.szKey].oSprite.src = c[u.szKey].szPath
                }, 500)
            }, c[q].oSprite.src = c[q].szPath
    };
    this.setLoaded = function(q) {
        a[q].bLoaded = !0
    };
    this.isLoaded = function(q) {
        return a[q].bLoaded
    };
    this.getNumSprites = function() {
        return b
    }
}
var CANVAS_WIDTH = 1500,
    CANVAS_HEIGHT = 768,
    EDGEBOARD_X = 200,
    EDGEBOARD_Y = 70,
    FPS = 30,
    FPS_TIME = 1E3 / FPS,
    DISABLE_SOUND_MOBILE = !1,
    FONT_GAME_1 = "odin_roundedbold",
    FONT_GAME_2 = "Digital-7",
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
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
    SPIN_BUT_STATE_DISABLE =
    "disable",
    SPIN_BUT_STATE_FREESPIN = "freespin",
    SPIN_BUT_STATE_SKIP = "skip",
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    BONUS_BUTTON_1 = "up_left",
    BONUS_BUTTON_2 = "center_left",
    BONUS_BUTTON_3 = "down_left",
    BONUS_BUTTON_4 = "up_right",
    BONUS_BUTTON_5 = "center_right",
    BONUS_BUTTON_6 = "down_right",
    REEL_OFFSET_X = 290,
    REEL_OFFSET_Y = 97,
    NUM_REELS = 5,
    NUM_ROWS = 3,
    NUM_SYMBOLS = 13,
    WILD_SYMBOL = 12,
    BONUS_SYMBOL = 13,
    FREESPIN_SYMBOL = 1,
    NUM_PAYLINES = 20,
    SYMBOL_WIDTH = 171,
    SYMBOL_HEIGHT = 164,
    SYMBOL_ANIM_WIDTH = 340,
    SYMBOL_ANIM_HEIGHT = 326,
    SPACE_BETWEEN_SYMBOLS = 17,
    SPACE_HEIGHT_BETWEEN_SYMBOLS = 4,
    MAX_FRAMES_REEL_EASE = 16,
    MIN_REEL_LOOPS, REEL_DELAY, REEL_START_Y = REEL_OFFSET_Y - 3 * (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS),
    REEL_ARRIVAL_Y = REEL_OFFSET_Y + 3 * (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS),
    TIME_SHOW_WIN, TIME_SHOW_ALL_WINS, TIME_SPIN_BUT_CHANGE = 1E3,
    TIME_HOLD_AUTOSPIN = 1E3,
    COIN_BET, MIN_BET, MAX_BET, TOTAL_MONEY, WIN_OCCURRENCE, SLOT_CASH, MIN_WIN, FREESPIN_OCCURRENCE, BONUS_OCCURRENCE, FREESPIN_SYMBOL_NUM_OCCURR,
    NUM_FREESPIN, BONUS_PRIZE, BONUS_PRIZE_OCCURR, PAYTABLE_VALUES, BONUS_FREESPIN = 1,
    BONUS_GOALKEEPER = 2,
    WHEEL_SETTINGS, SEGMENT_ROT = 18,
    TIME_ANIM_IDLE = 1E4,
    MIN_FAKE_SPIN = 3,
    WHEEL_SPIN_TIMESPEED = 2600,
    ANIM_SPIN_TIMESPEED = 50,
    TIME_ANIM_WIN = 5E3,
    ANIM_WIN1_TIMESPEED = 300,
    ANIM_WIN2_TIMESPEED = 50,
    LED_SPIN = 3,
    ANIM_IDLE1_TIMESPEED = 2E3,
    ANIM_IDLE2_TIMESPEED = 100,
    ANIM_IDLE3_TIMESPEED = 150,
    STATE_BONUS_IDLE = 0,
    STATE_BONUS_KICK = 1,
    STATE_BONUS_WIN = 2,
    STATE_BONUS_LOSE = 3,
    NUM_SPIN_FOR_ADS, ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, SHOW_CREDITS,
    SOUNDTRACK_VOLUME_IN_GAME = 1;

function CSlotSettings() {
    this._init = function() {
        this._initSymbolSpriteSheets();
        this._initSymbolAnims();
        this._initSymbolsOccurence()
    };
    this._initSymbolSpriteSheets = function() {
        s_aSymbolData = [];
        for (var a = 1; a < NUM_SYMBOLS + 1; a++) {
            var c = {
                images: [s_oSpriteLibrary.getSprite("symbol_" + a)],
                frames: {
                    width: SYMBOL_WIDTH,
                    height: SYMBOL_HEIGHT,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    "static": [0, 1],
                    moving: [1, 2]
                }
            };
            s_aSymbolData[a] = new createjs.SpriteSheet(c)
        }
    };
    this.initSymbolWin = function(a) {
        a = a.split("#");
        s_aSymbolWin = [];
        for (var c =
                0; c < a.length; c++) {
            var b = a[c].split(",");
            s_aSymbolWin[c] = [];
            for (var d = 0; d < b.length; d++) s_aSymbolWin[c][d] = parseFloat(b[d])
        }
    };
    this._initSymbolsOccurence = function() {
        s_aRandSymbols = [];
        var a;
        for (a = 0; 1 > a; a++) s_aRandSymbols.push(1);
        for (a = 0; 2 > a; a++) s_aRandSymbols.push(2);
        for (a = 0; 3 > a; a++) s_aRandSymbols.push(3);
        for (a = 0; 4 > a; a++) s_aRandSymbols.push(4);
        for (a = 0; 4 > a; a++) s_aRandSymbols.push(5);
        for (a = 0; 6 > a; a++) s_aRandSymbols.push(6);
        for (a = 0; 6 > a; a++) s_aRandSymbols.push(7);
        for (a = 0; 6 > a; a++) s_aRandSymbols.push(8);
        for (a =
            0; 6 > a; a++) s_aRandSymbols.push(9);
        for (a = 0; 6 > a; a++) s_aRandSymbols.push(10);
        for (a = 0; 6 > a; a++) s_aRandSymbols.push(11);
        for (a = 0; 1 > a; a++) s_aRandSymbols.push(12);
        for (a = 0; 1 > a; a++) s_aRandSymbols.push(13)
    };
    this._initSymbolAnims = function() {
        s_aSymbolAnims = [];
        for (var a = Math.floor(FPS / 2), c = 0; c < NUM_SYMBOLS; c++) {
            var b = {
                framerate: a,
                images: [s_oSpriteLibrary.getSprite("symbol_" + (c + 1) + "_anim")],
                frames: {
                    width: SYMBOL_ANIM_WIDTH,
                    height: SYMBOL_ANIM_HEIGHT
                },
                animations: {
                    "static": [0],
                    anim: [0, 23]
                }
            };
            s_aSymbolAnims[c] = new createjs.SpriteSheet(b)
        }
        s_oAnimRegPoint = [{
            x: 85,
            y: 82
        }, {
            x: 85,
            y: 82
        }, {
            x: 85,
            y: 82
        }, {
            x: 85,
            y: 82
        }, {
            x: 85,
            y: 82
        }, {
            x: 85,
            y: 82
        }, {
            x: 85,
            y: 82
        }, {
            x: 85,
            y: 82
        }, {
            x: 85,
            y: 82
        }, {
            x: 85,
            y: 82
        }, {
            x: 85,
            y: 82
        }, {
            x: 85,
            y: 82
        }, , {
            x: 85,
            y: 82
        }]
    };
    this._init()
}
var s_aSymbolData, s_aPaylineCombo, s_aSymbolWin, s_aSymbolAnims, s_aRandSymbols, s_oAnimRegPoint = [];

function CPreloader() {
    var a, c, b, d, h, g, m, q, l;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.loadSprites();
        l = new createjs.Container;
        s_oStage.addChild(l)
    };
    this.unload = function() {
        l.removeAllChildren()
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    };
    this.attachSprites = function() {
        var u = new createjs.Shape;
        u.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        l.addChild(u);
        u = s_oSpriteLibrary.getSprite("200x200");
        m = createBitmap(u);
        m.regX = .5 * u.width;
        m.regY = .5 * u.height;
        m.x = CANVAS_WIDTH / 2;
        m.y = CANVAS_HEIGHT / 2 - 180;
        l.addChild(m);
        q = new createjs.Shape;
        q.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(m.x - 100, m.y - 100, 200, 200, 10);
        l.addChild(q);
        m.mask = q;
        u = s_oSpriteLibrary.getSprite("progress_bar");
        d = createBitmap(u);
        d.x = CANVAS_WIDTH / 2 -
            u.width / 2;
        d.y = CANVAS_HEIGHT / 2 + 50;
        l.addChild(d);
        a = u.width;
        c = u.height;
        h = new createjs.Shape;
        h.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, 1, c);
        l.addChild(h);
        d.mask = h;
        b = new createjs.Text("", "30px " + FONT_GAME_1, "#fff");
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT / 2 + 100;
        b.textBaseline = "alphabetic";
        b.textAlign = "center";
        l.addChild(b);
        g = new createjs.Shape;
        g.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        l.addChild(g);
        createjs.Tween.get(g).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(g);
            l.removeChild(g)
        })
    };
    this.refreshLoader = function(u) {
        b.text = u + "%";
        100 === u && (s_oMain._onRemovePreloader(), b.visible = !1, d.visible = !1);
        h.graphics.clear();
        u = Math.floor(u * a / 100);
        h.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, u, c)
    };
    this._init()
}

function CMain(a) {
    var c, b = 0,
        d = 0,
        h = STATE_LOADING,
        g, m;
    this.initContainer = function() {
        var l = document.getElementById("canvas");
        s_oStage = new createjs.Stage(l);
        s_oAttachSection = new createjs.Container;
        s_oStage.addChild(s_oAttachSection);
        s_bMobile = isMobile();
        !1 === s_bMobile ? s_oStage.enableMouseOver(20) : createjs.Touch.enable(s_oStage, !0);
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.setFPS(FPS);
        createjs.Ticker.addEventListener("tick", this._update);
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        g = new CPreloader 
    };
    this.preloaderReady = function() {
        this._loadImages();
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        c = !0
    };
    this.soundLoaded = function() {
        b++;
        g.refreshLoader(Math.floor(b / d * 100))
    };
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "crowd",
            loop: !0,
            volume: 1,
            ingamename: "crowd"
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
            filename: "kick",
            loop: !1,
            volume: 1,
            ingamename: "kick"
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
            filename: "symbol9_10_11",
            loop: !1,
            volume: 1,
            ingamename: "symbol9_10_11"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol12",
            loop: !1,
            volume: 1,
            ingamename: "symbol12"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "symbol13",
            loop: !1,
            volume: 1,
            ingamename: "symbol13"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "bonus_win",
            loop: !1,
            volume: 1,
            ingamename: "bonus_win"
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
            filename: "soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack"
        });
        d +=
            s_aSoundsInfo.length;
        s_aSounds = [];
        for (var l = 0; l < s_aSoundsInfo.length; l++) this.tryToLoadSound(s_aSoundsInfo[l], !1)
    };
    this.tryToLoadSound = function(l, u) {
        setTimeout(function() {
            s_aSounds[l.ingamename] = new Howl({
                src: [l.path + l.filename + ".mp3"],
                autoplay: !1,
                preload: !0,
                loop: l.loop,
                volume: l.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function(w, A) {
                    for (var f = 0; f < s_aSoundsInfo.length; f++)
                        if (w === s_aSounds[s_aSoundsInfo[f].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[f], !0);
                            break
                        }
                },
                onplayerror: function(w) {
                    for (var A =
                            0; A < s_aSoundsInfo.length; A++)
                        if (w === s_aSounds[s_aSoundsInfo[A].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[A].ingamename].once("unlock", function() {
                                s_aSounds[s_aSoundsInfo[A].ingamename].play();
                                "soundtrack" === s_aSoundsInfo[A].ingamename && null !== s_oGame && setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME)
                            });
                            break
                        }
                }
            })
        }, u ? 200 : 0)
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("but_bg",
            "./sprites/but_play_bg.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("paytable1", "./sprites/paytable1.jpg");
        s_oSpriteLibrary.addSprite("paytable2", "./sprites/paytable2.jpg");
        s_oSpriteLibrary.addSprite("paytable3", "./sprites/paytable3.jpg");
        s_oSpriteLibrary.addSprite("paytable4", "./sprites/paytable4.jpg");
        s_oSpriteLibrary.addSprite("mask_slot", "./sprites/mask_slot.png");
        s_oSpriteLibrary.addSprite("coin_but",
            "./sprites/but_coin_bg.png");
        s_oSpriteLibrary.addSprite("info_but", "./sprites/but_info_bg.png");
        s_oSpriteLibrary.addSprite("win_frame_anim", "./sprites/win_frame_anim.png");
        s_oSpriteLibrary.addSprite("but_lines_bg", "./sprites/but_lines_bg.png");
        s_oSpriteLibrary.addSprite("but_maxbet_bg", "./sprites/but_maxbet_bg.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("but_arrow_next", "./sprites/but_arrow_next.png");
        s_oSpriteLibrary.addSprite("but_arrow_prev", "./sprites/but_arrow_prev.png");
        s_oSpriteLibrary.addSprite("logo", "./sprites/logo.png");
        s_oSpriteLibrary.addSprite("but_spin", "./sprites/but_spin.png");
        s_oSpriteLibrary.addSprite("bg_loading_bonus", "./sprites/bg_loading_bonus.jpg");
        s_oSpriteLibrary.addSprite("bg_loading", "./sprites/bg_loading.jpg");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("ctl_logo",
            "./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_exit_info", "./sprites/but_exit_info.png");
        s_oSpriteLibrary.addSprite("amount_win_bg", "./sprites/amount_win_bg.png");
        for (var l = 1; l < NUM_SYMBOLS + 1; l++) s_oSpriteLibrary.addSprite("symbol_" + l, "./sprites/symbol_" + l + ".png"), s_oSpriteLibrary.addSprite("symbol_" + l + "_anim", "./sprites/symbol_" + l + "_anim.jpg");
        for (l = 1; l < NUM_PAYLINES + 1; l++) s_oSpriteLibrary.addSprite("payline_" + l, "./sprites/paylines/payline_" + l + ".png"), s_oSpriteLibrary.addSprite("bet_but" +
            l, "./sprites/paylines/bet_but" + l + ".png");
        for (l = 0; 30 > l; l++) s_oSpriteLibrary.addSprite("avatar_idle_" + l, "./sprites/avatar/avatar_idle/avatar_idle_" + l + ".png");
        for (l = 0; 38 > l; l++) s_oSpriteLibrary.addSprite("avatar_win_" + l, "./sprites/avatar/avatar_win/avatar_win_" + l + ".png");
        d += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        b++;
        g.refreshLoader(Math.floor(b / d * 100))
    };
    this._onAllImagesLoaded = function() {};
    this._onRemovePreloader = function() {
        s_oGameSettings = new CSlotSettings;
        s_oMsgBox = new CMsgBox;
        g.unload();
        WIN_OCCURRENCE = q.win_occurrence;
        MIN_REEL_LOOPS = q.min_reel_loop;
        REEL_DELAY = q.reel_delay;
        TIME_SHOW_WIN = q.time_show_win;
        TIME_SHOW_ALL_WINS = q.time_show_all_wins;
        SLOT_CASH = q.slot_cash;
        TOTAL_MONEY = parseFloat(q.money);
        FREESPIN_OCCURRENCE = q.freespin_occurrence;
        BONUS_OCCURRENCE = q.bonus_occurrence;
        FREESPIN_SYMBOL_NUM_OCCURR = q.freespin_symbol_num_occur;
        NUM_FREESPIN = q.num_freespin;
        BONUS_PRIZE = q.bonus_prize;
        BONUS_PRIZE_OCCURR = q.bonus_prize_occur;
        COIN_BET = q.coin_bet;
        ENABLE_FULLSCREEN =
            a.fullscreen;
        NUM_SPIN_FOR_ADS = a.num_spin_ads_showing;
        PAYTABLE_VALUES = [];
        for (var l = 1; 11 > l; l++) PAYTABLE_VALUES[l] = a["paytable_symbol_" + l];
        s_oSoundTrack = playSound("soundtrack", 1, !0);
        this.gotoMenu()
    };
    this.gotoMenu = function() {
        new CMenu;
        h = STATE_MENU
    };
    this.gotoGame = function() {
        m = new CGame(q);
        h = STATE_GAME
    };
    this.gotoHelp = function() {
        new CHelp;
        h = STATE_HELP
    };
    this.stopUpdate = function() {
        c = !1;
        createjs.Ticker.paused = !0;
        document.querySelector("#block_game").style.display = "block";
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile ||
            Howler.mute(!0)
    };
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        c = !0;
        createjs.Ticker.paused = !1;
        document.querySelector("#block_game").style.display = "none";
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && s_bAudioActive && Howler.mute(!1)
    };
    this._update = function(l) {
        if (!1 !== c) {
            var u = (new Date).getTime();
            s_iTimeElaps = u - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = u;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            h === STATE_GAME && m.update();
            s_oStage.update(l)
        }
    };
    s_oMain = this;
    var q = a;
    ENABLE_CHECK_ORIENTATION = q.check_orientation;
    SHOW_CREDITS = q.show_credits;
    s_bAudioActive = a.audio_enable_on_startup;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0,
    s_bFullscreen = !1,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oDrawLayer, s_oStage, s_oAttachSection, s_oMain, s_oSpriteLibrary, s_bLogged = !1,
    s_oMsgBox, s_oGameSettings, s_aSounds, s_oSoundTrack = null;

function CTextButton(a, c, b, d, h, g, m, q, l, u) {
    var w, A, f, k, n, x, y, z, t, E;
    this._init = function(D, F, B, M, C, P, L, K, Q) {
        w = !1;
        A = 1;
        f = [];
        k = [];
        E = createBitmap(B);
        z = new createjs.Container;
        z.x = D;
        z.y = F;
        z.regX = B.width / 2;
        z.regY = B.height / 2;
        s_bMobile || (z.cursor = "pointer");
        z.addChild(E, t);
        u.addChild(z);
        t = new CTLText(z, 10, 5, B.width - 20, B.height - 10, L, K, P, C, 1, Q, 0, M, !0, !0, !1, !1);
        this._initListener()
    };
    this.unload = function() {
        z.off("mousedown", n);
        z.off("pressup", x);
        u.removeChild(z)
    };
    this.setVisible = function(D) {
        z.visible = D
    };
    this.setAlign =
        function(D) {
            t.textAlign = D
        };
    this.setTextX = function(D) {
        t.x = D
    };
    this.setScale = function(D) {
        A = z.scaleX = z.scaleY = D
    };
    this.enable = function() {
        w = !1
    };
    this.disable = function() {
        w = !0
    };
    this._initListener = function() {
        n = z.on("mousedown", this.buttonDown);
        x = z.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(D, F, B) {
        f[D] = F;
        k[D] = B
    };
    this.addEventListenerWithParams = function(D, F, B, M) {
        f[D] = F;
        k[D] = B;
        y = M
    };
    this.buttonRelease = function() {
        w || (playSound("press_but", 1, !1), z.scaleX = A, z.scaleY = A, f[ON_MOUSE_UP] && f[ON_MOUSE_UP].call(k[ON_MOUSE_UP],
            y))
    };
    this.buttonDown = function() {
        w || (z.scaleX = .9 * A, z.scaleY = .9 * A, f[ON_MOUSE_DOWN] && f[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN]))
    };
    this.setPosition = function(D, F) {
        z.x = D;
        z.y = F
    };
    this.tweenPosition = function(D, F, B, M, C, P, L) {
        createjs.Tween.get(z).wait(M).to({
            x: D,
            y: F
        }, B, C).call(function() {
            void 0 !== P && P.call(L)
        })
    };
    this.changeText = function(D) {
        t.refreshText(D)
    };
    this.setX = function(D) {
        z.x = D
    };
    this.setY = function(D) {
        z.y = D
    };
    this.getButtonImage = function() {
        return z
    };
    this.getX = function() {
        return z.x
    };
    this.getY = function() {
        return z.y
    };
    this.getSprite = function() {
        return z
    };
    this.getScale = function() {
        return z.scaleX
    };
    this._init(a, c, b, d, h, g, m, q, l)
}

function CGfxButton(a, c, b, d) {
    var h, g, m, q, l, u = [],
        w, A, f;
    this._init = function(n, x, y) {
        h = !1;
        g = y.width;
        m = y.height;
        q = [];
        l = [];
        f = createBitmap(y);
        f.x = n;
        f.y = x;
        f.regX = y.width / 2;
        f.regY = y.height / 2;
        f.cursor = "pointer";
        k.addChild(f);
        this._initListener()
    };
    this.unload = function() {
        f.off("mousedown", w);
        f.off("pressup", A);
        k.removeChild(f)
    };
    this.enable = function() {
        h = !1;
        f.filters = [];
        f.cache(0, 0, g, m)
    };
    this.disable = function() {
        h = !0;
        var n = (new createjs.ColorMatrix).adjustSaturation(-100).adjustBrightness(40);
        f.filters = [new createjs.ColorMatrixFilter(n)];
        f.cache(0, 0, g, m)
    };
    this.setVisible = function(n) {
        f.visible = n
    };
    this._initListener = function() {
        w = f.on("mousedown", this.buttonDown);
        A = f.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(n, x, y) {
        q[n] = x;
        l[n] = y
    };
    this.addEventListenerWithParams = function(n, x, y, z) {
        q[n] = x;
        l[n] = y;
        u = z
    };
    this.buttonRelease = function() {
        h || (playSound("press_but", 1, !1), f.scaleX = 1, f.scaleY = 1, q[ON_MOUSE_UP] && q[ON_MOUSE_UP].call(l[ON_MOUSE_UP], u))
    };
    this.buttonDown = function() {
        h || (f.scaleX = .9, f.scaleY = .9, q[ON_MOUSE_DOWN] && q[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN],
            u))
    };
    this.setPosition = function(n, x) {
        f.x = n;
        f.y = x
    };
    this.setX = function(n) {
        f.x = n
    };
    this.setY = function(n) {
        f.y = n
    };
    this.getButtonImage = function() {
        return f
    };
    this.getX = function() {
        return f.x
    };
    this.getY = function() {
        return f.y
    };
    var k = d;
    this._init(a, c, b);
    return this
}

function CToggle(a, c, b, d, h) {
    var g, m, q, l, u, w, A;
    this._init = function(f, k, n, x, y) {
        A = void 0 !== y ? y : s_oStage;
        m = [];
        q = [];
        y = new createjs.SpriteSheet({
            images: [n],
            frames: {
                width: n.width / 2,
                height: n.height,
                regX: n.width / 2 / 2,
                regY: n.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        g = x;
        l = createSprite(y, "state_" + g, n.width / 2 / 2, n.height / 2, n.width / 2, n.height);
        l.x = f;
        l.y = k;
        l.stop();
        s_bMobile || (l.cursor = "pointer");
        A.addChild(l);
        this._initListener()
    };
    this.unload = function() {
        l.off("mousedown", u);
        l.off("pressup", w);
        A.removeChild(l)
    };
    this._initListener = function() {
        u = l.on("mousedown", this.buttonDown);
        w = l.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(f, k, n) {
        m[f] = k;
        q[f] = n
    };
    this.setCursorType = function(f) {
        l.cursor = f
    };
    this.setActive = function(f) {
        g = f;
        l.gotoAndStop("state_" + g)
    };
    this.buttonRelease = function() {
        l.scaleX = 1;
        l.scaleY = 1;
        playSound("press_but", 1, !1);
        g = !g;
        l.gotoAndStop("state_" + g);
        m[ON_MOUSE_UP] && m[ON_MOUSE_UP].call(q[ON_MOUSE_UP], g)
    };
    this.buttonDown = function() {
        l.scaleX = .9;
        l.scaleY = .9;
        m[ON_MOUSE_DOWN] && m[ON_MOUSE_DOWN].call(q[ON_MOUSE_DOWN])
    };
    this.setPosition = function(f, k) {
        l.x = f;
        l.y = k
    };
    this._init(a, c, b, d, h)
}

function CBetBut(a, c, b, d, h, g, m, q) {
    var l, u, w, A = [],
        f, k;
    this._init = function(x, y, z, t, E, D, F) {
        l = !1;
        u = [];
        w = [];
        k = new createjs.Container;
        k.x = x;
        k.y = y;
        n.addChild(k);
        x = new createjs.SpriteSheet({
            images: [z],
            frames: {
                width: z.width / 2,
                height: z.height
            },
            animations: {
                on: [0, 1],
                off: [1, 2]
            }
        });
        f = createSprite(x, "on", 0, 0, z.width / 2, z.height);
        f.stop();
        f.cursor = "pointer";
        k.addChild(f);
        this._initListener()
    };
    this.unload = function() {
        f.off("mousedown", this.buttonDown);
        f.off("pressup", this.buttonRelease);
        n.removeChild(f)
    };
    this.disable =
        function(x) {
            l = x
        };
    this.setVisible = function(x) {
        f.visible = x
    };
    this.setOn = function() {
        f.gotoAndStop("on")
    };
    this.setOff = function() {
        f.gotoAndStop("off")
    };
    this._initListener = function() {
        f.on("mousedown", this.buttonDown);
        f.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(x, y, z) {
        u[x] = y;
        w[x] = z
    };
    this.addEventListenerWithParams = function(x, y, z, t) {
        u[x] = y;
        w[x] = z;
        A = t
    };
    this.buttonRelease = function() {
        u[ON_MOUSE_UP] && !1 === l && (playSound("press_but", 1, !1), u[ON_MOUSE_UP].call(w[ON_MOUSE_UP], A))
    };
    this.buttonDown =
        function() {
            u[ON_MOUSE_DOWN] && !1 === l && u[ON_MOUSE_DOWN].call(w[ON_MOUSE_DOWN], A)
        };
    this.setPosition = function(x, y) {
        f.x = x;
        f.y = y
    };
    this.setX = function(x) {
        f.x = x
    };
    this.setY = function(x) {
        f.y = x
    };
    this.getButtonImage = function() {
        return f
    };
    this.getX = function() {
        return f.x
    };
    this.getY = function() {
        return f.y
    };
    var n = q;
    this._init(a, c, b, d, h, g, m)
}

function CMenu() {
    var a, c, b, d, h, g, m = null,
        q = null,
        l, u, w, A, f, k;
    this._init = function() {
        w = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oAttachSection.addChild(w);
        var n = s_oSpriteLibrary.getSprite("but_bg");
        A = new CGfxButton(CANVAS_WIDTH / 2 + 420, CANVAS_HEIGHT - 164, n, s_oStage);
        A.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) n = s_oSpriteLibrary.getSprite("audio_icon"), h = CANVAS_WIDTH - n.width / 4 - 10, g = n.height / 2 + 10, f = new CToggle(h, g, n, s_bAudioActive, s_oAttachSection),
            f.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        SHOW_CREDITS ? (n = s_oSpriteLibrary.getSprite("but_credits"), a = n.width / 2 + 10, c = n.height / 2 + 10, u = new CGfxButton(a, c, n, s_oAttachSection), u.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this), b = a + n.width + 10, d = c) : (n = s_oSpriteLibrary.getSprite("but_fullscreen"), b = n.width / 4 + 10, d = n.height / 2 + 10);
        n = window.document;
        var x = n.documentElement;
        m = x.requestFullscreen || x.mozRequestFullScreen || x.webkitRequestFullScreen || x.msRequestFullscreen;
        q = n.exitFullscreen ||
            n.mozCancelFullScreen || n.webkitExitFullscreen || n.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (m = !1);
        m && screenfull.isEnabled && (n = s_oSpriteLibrary.getSprite("but_fullscreen"), l = new CToggle(b, d, n, s_bFullscreen, s_oAttachSection), l.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        k = new createjs.Shape;
        k.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oAttachSection.addChild(k);
        createjs.Tween.get(k).to({
            alpha: 0
        }, 400).call(function() {
            k.visible = !1
        });
        setVolume("soundtrack",
            1);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        A.unload();
        A = null;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) f.unload(), f = null;
        SHOW_CREDITS && u.unload();
        m && screenfull.isEnabled && l.unload();
        s_oAttachSection.removeChild(w);
        w = null;
        s_oAttachSection.removeChild(k);
        s_oMenu = k = null;
        setVolume("soundtrack", 0)
    };
    this.refreshButtonPos = function(n, x) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || f.setPosition(h - n, x + g);
        SHOW_CREDITS && u.setPosition(a + n, c + x);
        m && screenfull.isEnabled && l.setPosition(b +
            n, d + x)
    };
    this._onButPlayRelease = function() {
        tryCheckLogin()
    };
    this.exitFromMenu = function() {
        this.unload();
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
        m && screenfull.isEnabled && l.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? q.call(window.document) : m.call(window.document.documentElement);
        sizeHandler()
    };
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CGame() {
    var a, c, b = !1,
        d = !1,
        h, g, m, q, l, u, w, A, f, k, n, x, y, z, t, E, D, F, B, M, C, P, L, K, Q, Y, aa, J, V = null,
        T, S, e;
    this._init = function() {
        m = GAME_STATE_IDLE;
        A = D = u = q = 0;
        P = [0, 1, 2, 3, 4];
        l = P[0];
        w = NUM_PAYLINES;
        x = TOTAL_MONEY;
        k = MIN_BET;
        n = k * w;
        h = !1;
        F = t = z = 0;
        s_oTweenController = new CTweenController;
        K = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oAttachSection.addChild(K);
        this._initReels();
        Y = new createjs.Bitmap(s_oSpriteLibrary.getSprite("mask_slot"));
        s_oAttachSection.addChild(Y);
        var r = {
            images: [s_oSpriteLibrary.getSprite("logo")],
            frames: {
                width: 230,
                height: 86,
                regX: 165,
                regY: 0
            },
            animations: {
                normal: [0],
                freespin: [1, 55]
            }
        };
        J = new CInterface(k, n, x);
        this._initStaticSymbols();
        e = new CAvatar(s_oAttachSection);
        e.show(0);
        r = new createjs.SpriteSheet(r);
        Q = createSprite(r, "normal", 165, 0, 230, 86);
        Q.stop();
        s_oAttachSection.addChild(Q);
        V = new CPayTablePanel;
        x < n && J.disableSpin();
        MIN_WIN = s_aSymbolWin[0][s_aSymbolWin[0].length - 1];
        for (r = 0; r < s_aSymbolWin.length; r++)
            for (var v = s_aSymbolWin[r], p = 0; p < v.length; p++) 0 !== v[p] && v[p] < MIN_WIN && (MIN_WIN = v[p]);
        T = new CBonusPanel;
        aa = new CFreespinPanel(s_oStage);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        playSound("crowd", 1, !0);
        S = new CRechargePanel;
        x < n && (S.show(), J.disableSpin());
        b = !0
    };
    this.unload = function() {
        stopSound("crowd");
        S.unload();
        J.unload();
        V.unload();
        for (var r = 0; r < B.length; r++) B[r].unload();
        for (r = 0; r < NUM_ROWS; r++)
            for (var v = 0; v < NUM_REELS; v++) M[r][v].unload();
        s_oAttachSection.removeAllChildren();
        s_oGame = null
    };
    this.refreshButtonPos = function(r, v) {
        J.refreshButtonPos(r, v);
        V.refreshButtonPos(r, v);
        40 > s_iOffsetY ? (a = 800, c = -2) : (a = 1432, c = 80);
        Q.x = a;
        Q.y = c + v;
        e.refreshButtonPos(r, v)
    };
    this._initReels = function() {
        var r = REEL_OFFSET_X,
            v = REEL_OFFSET_Y,
            p = 0;
        B = [];
        for (var H = 0; H < NUM_REELS; H++) B[H] = new CReelColumn(H, r, v, p), B[H + NUM_REELS] = new CReelColumn(H + NUM_REELS, r, v + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS, p), r += SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS, p += REEL_DELAY
    };
    this._initStaticSymbols = function() {
        var r = REEL_OFFSET_X,
            v = REEL_OFFSET_Y;
        M = [];
        for (var p = 0; p < NUM_ROWS; p++) {
            M[p] = [];
            for (var H = 0; H < NUM_REELS; H++) {
                var G = new CStaticSymbolCell(p, H, r, v);
                M[p][H] = G;
                r +=
                    SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS
            }
            r = REEL_OFFSET_X;
            v += SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS
        }
    };
    this.generateLosingPattern = function() {
        for (var r = [], v = 0; v < NUM_ROWS; v++) {
            var p = Math.floor(Math.random() * (s_aRandSymbols.length - 2));
            p = s_aRandSymbols[p];
            r[v] = p
        }
        L = [];
        for (v = 0; v < NUM_ROWS; v++) {
            L[v] = [];
            for (var H = 0; H < NUM_REELS; H++)
                if (0 === H) L[v][H] = r[v];
                else {
                    do p = Math.floor(Math.random() * (s_aRandSymbols.length - 2)), p = s_aRandSymbols[p]; while (r[0] === p || r[1] === p || r[2] === p);
                    L[v][H] = p
                }
        }
        C = [];
        d = !0
    };
    this._generateRandSymbols =
        function() {
            for (var r = [], v = 0; v < NUM_ROWS; v++) r[v] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
            return r
        };
    this.reelArrived = function(r, v) {
        if (q > MIN_REEL_LOOPS)
            if (l === v) {
                if (!1 === B[r].isReadyToStop()) {
                    var p = r;
                    r < NUM_REELS ? (p += NUM_REELS, B[p].setReadyToStop(), B[r].restart([L[0][r], L[1][r], L[2][r]], !0)) : (p -= NUM_REELS, B[p].setReadyToStop(), B[r].restart([L[0][p], L[1][p], L[2][p]], !0))
                }
            } else B[r].restart(this._generateRandSymbols(), !1);
        else B[r].restart(this._generateRandSymbols(), !1), d && 0 ===
            r && q++
    };
    this.stopNextReel = function(r, v) {
        u++;
        0 === u % 2 ? (l = P[u / 2], u === 2 * NUM_REELS && this._endReelAnimation()) : v ? playSound("reel_stop_bonus", 1, !1) : r ? playSound("reel_stop_freespin", 1, !1) : playSound("reel_stop", 1, !1)
    };
    this._endReelAnimation = function() {
        d = !1;
        f = u = q = 0;
        l = P[0];
        0 < t && (J.disableGuiButtons(), J.disableSpin());
        "freespin" === Q.currentAnimation && !1 === g && J.refreshFreeSpinNum(z);
        if (0 < C.length) {
            e.show(1);
            for (var r = 0; r < C.length; r++) {
                0 < C[r].line && (V.highlightCombo(C[r].value, C[r].num_win), J.showLine(C[r].line));
                for (var v = C[r].list, p = 0; p < v.length; p++) M[v[p].row][v[p].col].showWinFrame()
            }
            "freespin" === Q.currentAnimation && 0 === z && (Q.gotoAndStop("normal"), J.refreshFreeSpinNum(""), J.setSpinState(SPIN_BUT_STATE_SPIN));
            0 < y && J.refreshWinText(y);
            A = 0;
            m = GAME_STATE_SHOW_ALL_WIN;
            playSound("avatar_win", 1, !1);
            t !== BONUS_GOALKEEPER && J.refreshMoney(x)
        } else if (0 < z) J.disableSpin(), this.onSpin();
        else if ("freespin" === Q.currentAnimation && (Q.gotoAndStop("normal"), J.refreshFreeSpinNum(""), J.setSpinState(SPIN_BUT_STATE_SPIN)), h)
            if (x <
                n && 0 === z) this.resetCoinBet(), h = !1, J.enableGuiButtons();
            else this.onSpin();
        else m = GAME_STATE_IDLE;
        x < n && 0 === z ? (this.resetCoinBet(), h = !1, J.enableGuiButtons()) : h || 0 !== z || 0 !== t || (J.enableGuiButtons(), J.disableBetBut(!1));
        F++;
        F === NUM_SPIN_FOR_ADS && (F = 0, document.dispatchEvent(new CustomEvent("show_interlevel_ad")));
        document.dispatchEvent(new CustomEvent("save_score", {
            detail: {
                score: x
            }
        }))
    };
    this.hidePayTable = function() {
        V.hide()
    };
    this.showWin = function() {
        if (0 < f) {
            stopSound("avatar_win");
            var r = C[f - 1].line;
            0 < r &&
                J.hideLine(r);
            var v = C[f - 1].list;
            for (r = 0; r < v.length; r++) B[v[r].col].setVisible(v[r].row, !0), B[v[r].col + NUM_REELS].setVisible(v[r].row, !0)
        }
        if (f === C.length)
            if (f = 0, g) g = !1, aa.show(z);
            else if (0 < z) J.disableSpin(), this.onSpin();
        else if (t === BONUS_GOALKEEPER) T.isVisible() || (this._hideAllWins(), T.show(BONUS_PRIZE[E]), m = GAME_STATE_BONUS);
        else if (h) this.onSpin();
        else J.enableGuiButtons(), J.disableBetBut(!1), m = GAME_STATE_IDLE;
        else {
            r = C[f].line;
            v = C[f].list;
            if (0 === r) {
                var p = Math.floor(v.length / 2);
                r = v[p].row;
                p = v[p].col
            } else {
                J.showLine(r);
                p = 2;
                var H = !1;
                3 > v.length ? C[f].value === FREESPIN_SYMBOL ? (p = v[0].col, r = v[0].row, H = !0) : (p = v.length - 1, r = v[p].row) : r = v[p].row;
                for (; !H && L[r][p] === WILD_SYMBOL;)
                    if (p--, 0 > p) {
                        p = 0;
                        r = v[p].row;
                        break
                    } else r = v[p].row
            }
            v = {
                x: 0,
                y: 0
            };
            0 === r ? 0 === p ? H = {
                x: 0,
                y: 0
            } : 4 === p ? (H = {
                x: SYMBOL_ANIM_WIDTH,
                y: 0
            }, v = {
                x: SYMBOL_WIDTH,
                y: 0
            }) : (H = {
                x: SYMBOL_ANIM_WIDTH / 2,
                y: 0
            }, v = {
                x: SYMBOL_WIDTH / 2,
                y: 0
            }) : 1 === r ? 0 === p ? (H = {
                x: 0,
                y: SYMBOL_ANIM_HEIGHT / 2
            }, v = {
                x: 0,
                y: SYMBOL_HEIGHT / 2
            }) : 4 === p ? (H = {
                x: SYMBOL_ANIM_WIDTH,
                y: SYMBOL_ANIM_HEIGHT / 2
            }, v = {
                x: SYMBOL_WIDTH,
                y: SYMBOL_HEIGHT /
                    2
            }) : (H = {
                x: SYMBOL_ANIM_WIDTH / 2,
                y: SYMBOL_ANIM_HEIGHT / 2
            }, v = {
                x: SYMBOL_WIDTH / 2,
                y: SYMBOL_HEIGHT / 2
            }) : 0 === p ? (H = {
                x: 0,
                y: SYMBOL_ANIM_HEIGHT
            }, v = {
                x: 0,
                y: SYMBOL_HEIGHT
            }) : 4 === p ? (H = {
                x: SYMBOL_ANIM_WIDTH,
                y: SYMBOL_ANIM_HEIGHT
            }, v = {
                x: SYMBOL_WIDTH,
                y: SYMBOL_HEIGHT
            }) : (H = {
                x: SYMBOL_ANIM_WIDTH / 2,
                y: SYMBOL_ANIM_HEIGHT
            }, v = {
                x: SYMBOL_WIDTH / 2,
                y: SYMBOL_HEIGHT
            });
            M[r][p].show(C[f].value, C[f].amount, v, H, h || !1 === g && 0 < z ? 1 : 3);
            f++
        }
    };
    this._hideAllWins = function() {
        for (var r = 0; r < NUM_ROWS; r++)
            for (var v = 0; v < NUM_REELS; v++) M[r][v].hideWinFrame();
        J.hideAllLines()
    };
    this._prepareForWinsShowing = function() {
        this._hideAllWins();
        f = A = 0;
        A = TIME_SHOW_WIN;
        m = GAME_STATE_SHOW_WIN;
        this.showWin();
        0 === z && J.setSpinState(SPIN_BUT_STATE_SKIP)
    };
    this.activateLines = function(r) {
        w = r;
        this.removeWinShowing();
        n = r = k * w;
        J.refreshTotalBet(n);
        J.refreshNumLines(w);
        r > x ? J.disableSpin() : J.enableSpin()
    };
    this.resetCoinBet = function() {
        D = 0;
        var r = parseFloat(COIN_BET[D]),
            v = r * w;
        k = r;
        k = Math.floor(100 * k) / 100;
        n = v;
        J.refreshBet(k);
        J.refreshTotalBet(n);
        J.enableSpin()
    };
    this.addLine = function() {
        w ===
            NUM_PAYLINES ? w = 1 : w++;
        n = k * w;
        n = Math.floor(100 * n) / 100;
        J.refreshTotalBet(n);
        J.refreshNumLines(w);
        J.enableSpin()
    };
    this.changeCoinBet = function() {
        D++;
        D === COIN_BET.length && (D = 0);
        var r = parseFloat(COIN_BET[D]),
            v = r * w;
        k = r;
        k = Math.floor(100 * k) / 100;
        n = v;
        n = Math.floor(100 * n) / 100;
        J.refreshBet(k);
        J.refreshTotalBet(n);
        J.enableSpin()
    };
    this.onMaxBet = function() {
        if (x < MAX_BET * NUM_PAYLINES) s_oMsgBox.show(TEXT_NO_MAX_BET);
        else {
            var r = MAX_BET;
            w = NUM_PAYLINES;
            r *= w;
            k = MAX_BET;
            n = r;
            J.refreshBet(k);
            J.refreshTotalBet(n);
            J.refreshNumLines(w);
            r > x ? (J.disableSpin(), S.show()) : (J.enableSpin(), this.onSpin())
        }
    };
    this.removeWinShowing = function() {
        V.resetHighlightCombo();
        J.resetWin();
        for (var r = 0; r < NUM_ROWS; r++)
            for (var v = 0; v < NUM_REELS; v++) M[r][v].hide(), B[v].setVisible(r, !0), B[v + NUM_REELS].setVisible(r, !0);
        for (r = 0; r < B.length; r++) B[r].activate();
        m = GAME_STATE_IDLE
    };
    this.forceStopReel = function() {
        0 === z && (h = !1);
        m = GAME_STATE_IDLE;
        for (var r = 0; r < NUM_REELS; r++) B[r].forceStop([L[0][r], L[1][r], L[2][r]], REEL_OFFSET_Y), B[r + NUM_REELS].forceStop(null, REEL_OFFSET_Y +
            (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS);
        this._endReelAnimation()
    };
    this.setMoney = function(r) {
        s_aSession.iMoney = x = r;
        J.refreshMoney(x);
        J.enableGuiButtons()
    };
    this.onSpin = function() {
        x < n && 0 === z ? (J.enableGuiButtons(), h = !1, S.show()) : (stopSound("avatar_win"), playSound("spin_but", 1, !1), J.disableBetBut(!0), this.removeWinShowing(), !0 === s_bLogged ? (n = "freespin" === Q.currentAnimation ? 0 : k * w, tryCallSpin(k, n, w)) : this.generateLosingPattern(), this._hideAllWins(), J.disableGuiButtons())
    };
    this.onSkip = function() {
        if (0 <
            t) this._hideAllWins(), T.show(BONUS_PRIZE[E]), m = GAME_STATE_BONUS;
        else this.onSpin()
    };
    this.onAutoSpin = function() {
        h = !0;
        this.onSpin()
    };
    this.onStopAutoSpin = function() {
        h = !1;
        m !== GAME_STATE_SPINNING && m !== GAME_STATE_BONUS && J.enableGuiButtons()
    };
    this.generateLosingPattern = function() {
        for (var r = [], v = 0; v < NUM_ROWS; v++) {
            var p = Math.floor(Math.random() * (s_aRandSymbols.length - 2));
            p = s_aRandSymbols[p];
            r[v] = p
        }
        L = [];
        for (v = 0; v < NUM_ROWS; v++) {
            L[v] = [];
            for (var H = 0; H < NUM_REELS; H++)
                if (0 === H) L[v][H] = r[v];
                else {
                    do p = Math.floor(Math.random() *
                        (s_aRandSymbols.length - 2)), p = s_aRandSymbols[p]; while (r[0] === p || r[1] === p || r[2] === p);
                    L[v][H] = p
                }
        }
        C = [];
        d = !0
    };
    this.onSpinReceived = function(r) {
        x -= n;
        J.refreshMoney(x);
        "true" === r.res ? (z = parseInt(r.num_freespin), "true" === r.win ? (L = JSON.parse(r.pattern), C = JSON.parse(r.win_lines), g = !1, 1 === parseInt(r.freespin) ? (t = BONUS_FREESPIN, h = !1, g = !0) : 0 < parseInt(r.bonus) ? (t = BONUS_GOALKEEPER, h = !1, E = r.bonus_prize) : t = 0, y = parseFloat(r.tot_win)) : (t = 0, L = JSON.parse(r.pattern), C = []), d = !0, x = parseFloat(r.money)) : s_oGame.generateLosingPattern();
        m = GAME_STATE_SPINNING
    };
    this.onInfoClicked = function() {
        m !== GAME_STATE_SPINNING && (V.isVisible() ? V.hide() : V.show())
    };
    this.exitFromFreespinPanel = function() {
        J.refreshFreeSpinNum(z);
        Q.gotoAndPlay("freespin");
        J.setSpinState(SPIN_BUT_STATE_FREESPIN);
        J.disableSpin();
        this.onSpin()
    };
    this.exitFromBonus = function() {
        document.dispatchEvent(new CustomEvent("bonus_end", {
            detail: {
                score: x
            }
        }));
        J.refreshMoney(x);
        if (h) this.onSpin();
        else this.removeWinShowing(), J.enableGuiButtons(), J.disableBetBut(!1), J.enableSpin();
        document.dispatchEvent(new CustomEvent("save_score", {
            detail: {
                score: x
            }
        }))
    };
    this.onExit = function() {
        this.unload();
        s_oMain.gotoMenu();
        document.dispatchEvent(new CustomEvent("end_session"))
    };
    this.getState = function() {
        return m
    };
    this.update = function() {
        if (!1 !== b) {
            switch (m) {
                case GAME_STATE_IDLE:
                    if (h) return;
                    0 === z && (A += s_iTimeElaps, A > TIME_SPIN_BUT_CHANGE && (A = 0, J.toggleAutoSpinImage()));
                    J.update();
                    break;
                case GAME_STATE_SPINNING:
                    for (var r = 0; r < B.length; r++) B[r].update();
                    break;
                case GAME_STATE_SHOW_ALL_WIN:
                    A += s_iTimeElaps;
                    A > TIME_SHOW_ALL_WINS && this._prepareForWinsShowing();
                    break;
                case GAME_STATE_BONUS:
                    T.update()
            }
            e.update()
        }
    };
    s_oGame = this;
    this._init()
}
var s_oGame = null,
    s_oTweenController;

function CReelColumn(a, c, b, d) {
    var h, g, m, q, l, u, w, A, f, k, n, x, y, z, t;
    this._init = function(E, D, F, B) {
        m = g = h = !1;
        w = 0;
        q = E;
        u = B;
        l = q < NUM_REELS ? q : q - NUM_REELS;
        f = 0;
        k = MAX_FRAMES_REEL_EASE;
        A = REEL_STATE_START;
        n = F;
        x = n + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS;
        this.initContainer(D, F)
    };
    this.initContainer = function(E, D) {
        t = new createjs.Container;
        t.x = E;
        t.y = D;
        var F = 0;
        y = [];
        z = [];
        for (var B = 0; B < NUM_ROWS; B++) {
            var M = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)],
                C = createSprite(s_aSymbolData[M], "static",
                    0, 0, SYMBOL_WIDTH, SYMBOL_HEIGHT);
            C.stop();
            C.x = 0;
            C.y = F;
            t.addChild(C);
            y[B] = C;
            z[B] = M;
            F += SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS
        }
        s_oAttachSection.addChild(t)
    };
    this.unload = function() {
        s_oAttachSection.removeChild(t)
    };
    this.activate = function() {
        n = t.y;
        x = n + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS;
        h = !0
    };
    this._setSymbol = function(E) {
        t.removeAllChildren();
        for (var D = 0, F = 0; F < E.length; F++) {
            var B = new createjs.Sprite(s_aSymbolData[E[F]], "static", 0, 0, SYMBOL_WIDTH, SYMBOL_HEIGHT);
            B.stop();
            B.x = 0;
            B.y = D;
            t.addChild(B);
            y[F] = B;
            z[F] = E[F];
            D += SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS
        }
    };
    this.forceStop = function(E, D) {
        null !== E && this._setSymbol(E);
        t.y = D;
        h = !1;
        f = 0;
        k = MAX_FRAMES_REEL_EASE;
        A = REEL_STATE_START;
        w = 0;
        m = g = !1
    };
    this.setVisible = function(E, D) {
        y[E].visible = D
    };
    this.restart = function(E, D) {
        t.y = n = REEL_START_Y;
        x = n + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS;
        this._setSymbol(E);
        if (g = D) {
            f = 0;
            k = MAX_FRAMES_REEL_EASE;
            A = REEL_STATE_STOP;
            for (var F = 0; F < NUM_ROWS; F++) y[F].gotoAndStop("static");
            m = !0
        } else
            for (F = 0; F < NUM_ROWS; F++) y[F].gotoAndStop("moving")
    };
    this.setReadyToStop = function() {
        f = 0;
        k = MAX_FRAMES_REEL_EASE;
        A = REEL_STATE_STOP
    };
    this.isReadyToStop = function() {
        return g
    };
    this.getPosUpLeft = function(E) {
        return {
            x: t.x,
            y: t.y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * E
        }
    };
    this.getY = function() {
        return t.y
    };
    this._updateStart = function() {
        0 === f && q < NUM_REELS && playSound("start_reel", 1, !1);
        f++;
        f > k && (f = 0, k /= 2, A++, n = t.y, x = n + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS);
        var E = s_oTweenController.easeInBack(f, 0, 1, k);
        E = s_oTweenController.tweenValue(n, x, E);
        t.y =
            E
    };
    this._updateMoving = function() {
        f++;
        f > k && (f = 0, n = t.y, x = n + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS);
        var E = s_oTweenController.easeLinear(f, 0, 1, k);
        E = s_oTweenController.tweenValue(n, x, E);
        t.y = E
    };
    this._updateStopping = function() {
        f++;
        if (f >= k) h = !1, f = 0, k = MAX_FRAMES_REEL_EASE, A = REEL_STATE_START, w = 0, g = !1, m && (m = !1, t.y = REEL_OFFSET_Y), s_oGame.stopNextReel(z[0] === FREESPIN_SYMBOL || z[1] === FREESPIN_SYMBOL || z[2] === FREESPIN_SYMBOL ? !0 : !1, z[0] === BONUS_SYMBOL || z[1] === BONUS_SYMBOL || z[2] === BONUS_SYMBOL ? !0 : !1);
        else {
            var E = s_oTweenController.easeOutCubic(f, 0, 1, k);
            E = s_oTweenController.tweenValue(n, x, E);
            t.y = E
        }
    };
    this.update = function() {
        if (!1 !== h && (w++, w > u)) switch (!1 === g && t.y > REEL_ARRIVAL_Y && s_oGame.reelArrived(q, l), A) {
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
    this._init(a, c, b, d)
}

function CInterface(a, c, b) {
    var d, h, g, m, q, l, u, w, A, f, k, n, x, y, z, t, E, D, F, B, M, C, P, L, K, Q, Y = null,
        aa = null,
        J, V, T, S;
    this._init = function(e, r, v) {
        var p = s_oSpriteLibrary.getSprite("but_exit");
        d = CANVAS_WIDTH - p.width / 2 - 2;
        h = p.height / 2 + 2;
        F = new CGfxButton(d, h, p, s_oAttachSection);
        F.addEventListener(ON_MOUSE_UP, this._onExit, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) p = s_oSpriteLibrary.getSprite("audio_icon"), z = d - p.width / 2 - 2, t = p.height / 2 + 2, P = new CToggle(z, t, p, s_bAudioActive, s_oAttachSection), P.addEventListener(ON_MOUSE_UP,
            this._onAudioToggle, this);
        p = window.document;
        var H = p.documentElement;
        Y = H.requestFullscreen || H.mozRequestFullScreen || H.webkitRequestFullScreen || H.msRequestFullscreen;
        aa = p.exitFullscreen || p.mozCancelFullScreen || p.webkitExitFullscreen || p.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (Y = !1);
        Y && screenfull.isEnabled && (p = s_oSpriteLibrary.getSprite("but_fullscreen"), q = p.width / 4 + 2, l = p.height / 2 + 2, Q = new CToggle(q, l, p, s_bFullscreen, s_oAttachSection), Q.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        this._initPaylines();
        p = s_oSpriteLibrary.getSprite("info_but");
        A = CANVAS_HEIGHT - p.height / 2 - 80;
        M = new CTextButton(420, A, p, TEXT_PAYTABLE, FONT_GAME_1, "#ffffff", 24, "center", 0, s_oAttachSection);
        M.addEventListener(ON_MOUSE_UP, this._onInfo, this);
        p = s_oSpriteLibrary.getSprite("but_lines_bg");
        f = CANVAS_HEIGHT - p.height / 2 - 80;
        C = new CTextButton(640, f, p, TEXT_LINES + " " + NUM_PAYLINES, FONT_GAME_1, "#ffffff", 24, "center", 0, s_oAttachSection);
        C.addEventListener(ON_MOUSE_UP, this._onAddLine, this);
        p = s_oSpriteLibrary.getSprite("coin_but");
        k = CANVAS_HEIGHT -
            p.height / 2 - 80;
        L = new CTextButton(860, k, p, TEXT_COIN + " " + e.toFixed(2), FONT_GAME_1, "#ffffff", 24, "center", 0, s_oAttachSection);
        L.addEventListener(ON_MOUSE_UP, this._onBet, this);
        p = s_oSpriteLibrary.getSprite("but_maxbet_bg");
        n = CANVAS_HEIGHT - p.height / 2 - 80;
        K = new CTextButton(1080, n, p, TEXT_MAX_BET, FONT_GAME_1, "#ffffff", 25, "center", 0, s_oAttachSection);
        K.addEventListener(ON_MOUSE_UP, this._onMaxBet, this);
        p = s_oSpriteLibrary.getSprite("but_spin");
        x = CANVAS_WIDTH - 100;
        y = CANVAS_HEIGHT - p.height / 2;
        B = new CSpinBut(x - s_iOffsetX,
            y - s_iOffsetY, p, p.width / 5, p.height, s_oAttachSection);
        B.addEventListener(ON_MOUSE_UP, this._onSpin, this);
        w = CANVAS_HEIGHT - 162;
        J = new CTLText(s_oAttachSection, 320, w, 230, 24, 24, "center", "#ffde00", FONT_GAME_2, 1, 0, 0, TEXT_MONEY + ": " + v.toFixed(2) + TEXT_CURRENCY, !0, !0, !1, !1);
        u = CANVAS_HEIGHT - 162;
        V = new CTLText(s_oAttachSection, 600, u, 300, 24, 24, "center", "#ffde00", FONT_GAME_2, 1, 0, 0, TEXT_BET + ": " + r.toFixed(2) + TEXT_CURRENCY, !0, !0, !1, !1);
        T = new CTLText(s_oAttachSection, 910, CANVAS_HEIGHT - 162, 305, 24, 24, "center", "#ffde00",
            FONT_GAME_2, 1, 0, 0, TEXT_WIN + ": 0" + TEXT_CURRENCY, !0, !0, !1, !1);
        g = CANVAS_WIDTH - 108;
        m = CANVAS_HEIGHT - 108;
        S = new createjs.Text("", "70px " + FONT_GAME_1, "#ffde00");
        S.x = g - s_iOffsetX;
        S.y = m - s_iOffsetY;
        S.textAlign = "center";
        S.textBaseline = "alphabetic";
        s_oAttachSection.addChild(S);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        F.unload();
        F = null;
        B.unload();
        B = null;
        M.unload();
        M = null;
        C.unload();
        C = null;
        L.unload();
        L = null;
        K.unload();
        K = null;
        !1 === DISABLE_SOUND_MOBILE && (P.unload(), P = null);
        for (var e = 0; e <
            NUM_PAYLINES; e++) E[e].unload();
        Y && screenfull.isEnabled && Q.unload();
        s_oInterface = null
    };
    this.refreshButtonPos = function(e, r) {
        F.setPosition(d - e, r + h);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || P.setPosition(z - e, r + t);
        x - e > CANVAS_WIDTH - 300 && (B.setPosition(x - e, y - r), S.x = g - e, S.y = m - r);
        Y && screenfull.isEnabled && Q.setPosition(q + e, l + r)
    };
    this._initPaylines = function() {
        var e = s_oSpriteLibrary.getSprite("bet_but4");
        E = [];
        var r = e.height / 2,
            v = 77 + r,
            p = new CBetBut(200 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but4"), "4", FONT_GAME_1,
                "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 4);
        E[3] = p;
        v += 50;
        p = new CBetBut(200 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but2"), "2", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 2);
        E[1] = p;
        v += 50;
        p = new CBetBut(200 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but20"), "20", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this,
            20);
        E[19] = p;
        v += 50;
        p = new CBetBut(200 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but17"), "17", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 17);
        E[16] = p;
        v += 50;
        p = new CBetBut(200 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but10"), "10", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 10);
        E[9] = p;
        v += 50;
        p = new CBetBut(200 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but1"), "1", FONT_GAME_1,
            "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 1);
        E[0] = p;
        v += 51;
        p = new CBetBut(200 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but11"), "11", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 11);
        E[10] = p;
        v += 50;
        p = new CBetBut(200 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but16"), "16", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked,
            this, 16);
        E[15] = p;
        v += 50;
        p = new CBetBut(200 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but3"), "3", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 3);
        E[2] = p;
        p = new CBetBut(200 + e.width / 2, v + 50, s_oSpriteLibrary.getSprite("bet_but5"), "5", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 5);
        E[4] = p;
        v = 77 + r;
        p = new CBetBut(1175 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but12"), "12", FONT_GAME_1,
            "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 12);
        E[11] = p;
        v += 50;
        p = new CBetBut(1175 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but14"), "14", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 14);
        E[13] = p;
        v += 50;
        p = new CBetBut(1175 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but9"), "9", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked,
            this, 9);
        E[8] = p;
        v += 50;
        p = new CBetBut(1175 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but18"), "18", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 18);
        E[17] = p;
        v += 50;
        p = new CBetBut(1175 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but6"), "6", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 6);
        E[5] = p;
        v += 51;
        p = new CBetBut(1175 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but7"), "7",
            FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 7);
        E[6] = p;
        v += 50;
        p = new CBetBut(1175 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but19"), "19", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 19);
        E[18] = p;
        v += 50;
        p = new CBetBut(1175 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but8"), "8", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked,
            this, 8);
        E[7] = p;
        v += 50;
        p = new CBetBut(1175 + e.width / 2, v, s_oSpriteLibrary.getSprite("bet_but13"), "13", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 13);
        E[12] = p;
        p = new CBetBut(1175 + e.width / 2, v + 50, s_oSpriteLibrary.getSprite("bet_but15"), "15", FONT_GAME_1, "#ffd202", 24, s_oAttachSection);
        p.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 15);
        E[14] = p;
        D = [];
        for (e = 0; e < NUM_PAYLINES; e++) r = createBitmap(s_oSpriteLibrary.getSprite("payline_" +
            (e + 1))), r.visible = !1, s_oAttachSection.addChild(r), D[e] = r
    };
    this.refreshMoney = function(e) {
        J.refreshText(TEXT_MONEY + ": " + e.toFixed(2) + TEXT_CURRENCY)
    };
    this.refreshBet = function(e) {
        L.changeText(TEXT_COIN + " " + e.toFixed(2))
    };
    this.refreshTotalBet = function(e) {
        V.refreshText(TEXT_BET + ": " + e.toFixed(2) + TEXT_CURRENCY)
    };
    this.refreshNumLines = function(e) {
        C.changeText(TEXT_LINES + " " + e);
        for (var r = 0; r < NUM_PAYLINES; r++) r < e ? (E[r].setOn(), D[r].visible = !0) : E[r].setOff();
        setTimeout(function() {
            for (var v = 0; v < NUM_PAYLINES; v++) D[v].visible = !1
        }, 1E3)
    };
    this.resetWin = function() {
        T.refreshText(TEXT_WIN + ": 0" + TEXT_CURRENCY)
    };
    this.refreshWinText = function(e) {
        T.refreshText(TEXT_WIN + ": " + e.toFixed(2) + TEXT_CURRENCY)
    };
    this.refreshFreeSpinNum = function(e) {
        S.text = e
    };
    this.showLine = function(e) {
        D[e - 1].visible = !0
    };
    this.hideLine = function(e) {
        D[e - 1].visible = !1
    };
    this.hideAllLines = function() {
        for (var e = 0; e < NUM_PAYLINES; e++) D[e].visible = !1
    };
    this.disableBetBut = function(e) {
        for (var r = 0; r < NUM_PAYLINES; r++) E[r].disable(e)
    };
    this.enableGuiButtons = function() {
        B.enable();
        K.enable();
        L.enable();
        C.enable();
        M.enable()
    };
    this.enableSpin = function() {
        B.enable();
        K.enable()
    };
    this.disableSpin = function() {
        B.disable();
        K.disable()
    };
    this.disableGuiButtons = function() {
        B.getState() !== SPIN_BUT_STATE_FREESPIN && B.setState(SPIN_BUT_STATE_STOP);
        K.disable();
        L.disable();
        C.disable();
        M.disable()
    };
    this.toggleAutoSpinImage = function() {
        B.toggleAutoSpinImage()
    };
    this.setSpinState = function(e) {
        B.setState(e)
    };
    this._onBetLineClicked = function(e) {
        this.refreshNumLines(e);
        s_oGame.activateLines(e)
    };
    this._onExit =
        function() {
            s_oGame.onExit()
        };
    this._onSpin = function(e) {
        if (e === SPIN_BUT_STATE_AUTOSPIN) s_oGame.onAutoSpin();
        else if (e === SPIN_BUT_STATE_SPIN || e === SPIN_BUT_STATE_AUTOSPIN) s_oGame.onSpin();
        else if (e === SPIN_BUT_STATE_SKIP) s_oGame.onSkip();
        else s_oGame.forceStopReel()
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
    this._onMaxBet = function() {
        s_oGame.onMaxBet()
    };
    this.resetFullscreenBut = function() {
        Y && screenfull.isEnabled &&
            Q.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? aa.call(window.document) : Y.call(window.document.documentElement);
        sizeHandler()
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this.update = function() {
        B.update()
    };
    s_oInterface = this;
    this._init(a, c, b);
    return this
}
var s_oInterface = null;

function CPayTablePanel() {
    var a, c, b, d, h, g, m, q, l, u, w, A;
    this._init = function() {
        b = 0;
        g = [];
        w = new createjs.Container;
        w.on("click", function() {});
        w.visible = !1;
        s_oAttachSection.addChild(w);
        var f = new createjs.Container;
        w.addChild(f);
        var k = createBitmap(s_oSpriteLibrary.getSprite("paytable1"));
        f.addChild(k);
        this._createPayouts(f);
        g[0] = f;
        f = new createjs.Container;
        f.visible = !1;
        w.addChild(f);
        k = createBitmap(s_oSpriteLibrary.getSprite("paytable2"));
        f.addChild(k);
        g[1] = f;
        m = g[b];
        f = new createjs.Container;
        f.visible = !1;
        w.addChild(f);
        k = createBitmap(s_oSpriteLibrary.getSprite("paytable3"));
        f.addChild(k);
        new CTLText(f, 770, 248, 400, 100, 28, "center", "#fff", FONT_GAME_1, 1, 0, 0, TEXT_HELP_BONUS1, !0, !0, !0, !1);
        new CTLText(f, 770, 400, 400, 180, 40, "center", "#fff", FONT_GAME_1, 1, 0, 0, TEXT_HELP_BONUS2, !0, !0, !0, !1);
        g[2] = f;
        f = new createjs.Container;
        f.visible = !1;
        w.addChild(f);
        k = createBitmap(s_oSpriteLibrary.getSprite("paytable4"));
        f.addChild(k);
        new CTLText(f, CANVAS_WIDTH / 2 - 210, 410, 420, 170, 40, "center", "#fff", FONT_GAME_1, 1, 0, 0, TEXT_HELP_FREESPIN, !0, !0, !0, !1);
        g[3] = f;
        m = g[b];
        l = new CGfxButton(CANVAS_WIDTH - 290, CANVAS_HEIGHT - 160, s_oSpriteLibrary.getSprite("but_arrow_next"), w);
        l.addEventListener(ON_MOUSE_UP, this._onNext, this);
        u = new CGfxButton(290, CANVAS_HEIGHT - 160, s_oSpriteLibrary.getSprite("but_arrow_prev"), w);
        u.addEventListener(ON_MOUSE_UP, this._onPrev, this);
        f = s_oSpriteLibrary.getSprite("but_credits");
        a = f.width / 2 + 2;
        c = f.height / 2 + 2;
        A = new CGfxButton(a, c, f, w);
        A.addEventListener(ON_MOUSE_UP, this._onCredits, this);
        f = s_oSpriteLibrary.getSprite("but_exit_info");
        q = new CGfxButton(1220, 154, f, w);
        q.addEventListener(ON_MOUSE_UP, this._onExit, this)
    };
    this.unload = function() {
        w.off("click", function() {});
        q.unload();
        l.unload();
        u.unload();
        A.unload();
        s_oAttachSection.removeChild(w);
        for (var f = 0; f < d.length; f++) w.removeChild(d[f])
    };
    this._createPayouts = function(f) {
        d = [];
        h = [];
        for (var k = [{
                x: 530,
                y: 250
            }, {
                x: 750,
                y: 250
            }, {
                x: 970,
                y: 250
            }, {
                x: 421,
                y: 360
            }, {
                x: 641,
                y: 360
            }, {
                x: 861,
                y: 360
            }, {
                x: 1081,
                y: 360
            }, {
                x: 530,
                y: 470
            }, {
                x: 750,
                y: 470
            }, {
                x: 970,
                y: 470
            }], n = 0, x = 0; x < s_aSymbolWin.length; x++) {
            var y = s_aSymbolWin[x];
            do {
                var z = y.indexOf(0); - 1 !== z && y.splice(z, 1)
            } while (-1 !== z);
            z = y.length;
            if (0 !== z) {
                var t = 24;
                4 === z && (t = 18);
                var E = k[n].y;
                d[x] = [];
                h[x] = [];
                for (var D = 0; D < z; D++) {
                    var F = new CTLText(f, k[n].x, E, 35, 21, 21, "left", "#fff", FONT_GAME_1, 1, 0, 0, "X" + (5 - D), !0, !0, !1, !1);
                    d[x][D] = F;
                    F = new CTLText(f, F.getX() + 40, F.getY(), 50, 21, 21, "left", "#ffff00", FONT_GAME_1, 1, 0, 0, y[z - D - 1], !0, !0, !1, !1);
                    h[x][D] = F;
                    E += t
                }
                n++
            }
        }
    };
    this._onNext = function() {
        b === g.length - 1 ? b = 0 : b++;
        m.visible = !1;
        g[b].visible = !0;
        m = g[b]
    };
    this._onPrev = function() {
        0 === b ? b = g.length -
            1 : b--;
        m.visible = !1;
        g[b].visible = !0;
        m = g[b]
    };
    this._onCredits = function() {
        new CCreditsPanel
    };
    this.refreshButtonPos = function(f, k) {
        A.setPosition(a + f, c + k)
    };
    this.show = function() {
        b = 0;
        m.visible = !1;
        g[b].visible = !0;
        m = g[b];
        w.visible = !0
    };
    this.hide = function() {
        w.visible = !1
    };
    this.resetHighlightCombo = function() {
        for (var f = 0; f < d.length; f++)
            if (void 0 !== d[f])
                for (var k = 0; k < d[f].length; k++) d[f][k].color = "#ffffff", h[f][k].setColor("#ffff00"), createjs.Tween.removeTweens(h[f][k].getText()), h[f][k].setAlpha(1)
    };
    this.highlightCombo =
        function(f, k) {
            h[f - 1][NUM_REELS - k].setColor("#ff9000");
            this.tweenAlpha(h[f - 1][NUM_REELS - k].getText(), 0)
        };
    this.tweenAlpha = function(f, k) {
        createjs.Tween.get(f, {
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
        return w.visible
    };
    this._init()
}

function CStaticSymbolCell(a, c, b, d) {
    var h, g, m, q, l = -1,
        u, w, A, f, k, n;
    this._init = function(y, z, t, E) {
        m = t;
        q = E;
        h = 0;
        n = new createjs.Container;
        n.visible = !1;
        s_oAttachSection.addChild(n);
        k = new createjs.Container;
        k.visible = !1;
        k.x = t;
        k.y = E;
        n.addChild(k);
        u = [];
        for (y = 0; y < NUM_SYMBOLS; y++) z = createSprite(s_aSymbolAnims[y], "static", 0, 0, SYMBOL_ANIM_WIDTH, SYMBOL_ANIM_HEIGHT), z.stop(), z.on("animationend", this._onAnimEnded, null, !1), k.addChild(z), u[y] = z, u[y].visible = !1;
        y = s_oSpriteLibrary.getSprite("amount_win_bg");
        f = createBitmap(y);
        f.regX = y.width / 2;
        f.regY = y.height / 2;
        f.x = SYMBOL_ANIM_WIDTH / 2;
        f.y = SYMBOL_ANIM_HEIGHT;
        k.addChild(f);
        A = new CTLText(k, SYMBOL_ANIM_WIDTH / 2 - y.width / 2, SYMBOL_ANIM_HEIGHT - 22, y.width, 48, 48, "center", "#ffd102", FONT_GAME_1, 1, 0, 0, " ", !0, !0, !1, !1);
        A.setShadow("#000", 2, 2, 2);
        y = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("win_frame_anim")],
            frames: {
                width: SYMBOL_WIDTH,
                height: SYMBOL_HEIGHT
            },
            animations: {
                "static": [0],
                anim: [1, 19]
            }
        };
        y = new createjs.SpriteSheet(y);
        w = new createjs.Sprite(y, "static", 0, 0, SYMBOL_WIDTH, SYMBOL_HEIGHT);
        w.stop();
        w.x = t;
        w.y = E;
        n.addChild(w)
    };
    this.unload = function() {
        s_oAttachSection.removeChild(n)
    };
    this.hide = function() {
        if (-1 < l) {
            var y = l + 1;
            9 === y || 10 === y || 11 === y ? stopSound("symbol9_10_11") : stopSound("symbol" + y);
            w.gotoAndStop("static");
            w.visible = !1;
            f.visible = !1;
            A.refreshText("");
            u[l].gotoAndPlay("static");
            u[l].visible = !1;
            n.visible = !1;
            l = -1
        }
    };
    this.show = function(y, z, t, E, D) {
        h = 0;
        g = D;
        for (D = 0; D < NUM_SYMBOLS; D++) u[D].visible = D + 1 === y ? !0 : !1;
        f.visible = !1;
        0 < z && (A.refreshText("x" + z), f.visible = !0);
        u[y - 1].gotoAndPlay("anim");
        l = y - 1;
        u[y - 1].spriteSheet.getNumFrames();
        k.regX = E.x;
        k.regY = E.y;
        k.x = m + t.x;
        k.y = q + t.y;
        k.scaleX = k.scaleY = .5;
        k.visible = !0;
        k.alpha = 1;
        n.visible = !0;
        createjs.Tween.get(k).to({
            scaleX: 1,
            scaleY: 1
        }, 1500, createjs.Ease.cubicOut);
        9 === y || 10 === y || 11 === y ? playSound("symbol9_10_11", 1, !1) : playSound("symbol" + y, 1, !1)
    };
    this.showWinFrame = function() {
        w.gotoAndPlay("anim");
        w.visible = !0;
        n.visible = !0
    };
    this.hideWinFrame = function() {
        w.gotoAndPlay("static");
        w.visible = !1;
        n.visible = !1
    };
    this._onAnimEnded = function() {
        h++;
        h === g && -1 < l && (u[l].stop(),
            createjs.Tween.get(k).to({
                scaleX: .52,
                scaleY: .52,
                alpha: 0
            }, 500, createjs.Ease.cubicOut).call(function() {
                x.stopAnim();
                s_oGame.showWin()
            }))
    };
    this.stopAnim = function() {
        var y = l + 1;
        9 === y || 10 === y || 11 === y ? stopSound("symbol9_10_11") : stopSound("symbol" + y);
        u[l].visible = !1;
        k.visible = !1;
        w.gotoAndStop("static");
        w.visible = !1
    };
    var x = this;
    this._init(a, c, b, d)
}

function CTweenController() {
    this.tweenValue = function(a, c, b) {
        return a + b * (c - a)
    };
    this.easeLinear = function(a, c, b, d) {
        return b * a / d + c
    };
    this.easeInCubic = function(a, c, b, d) {
        d = (a /= d) * a * a;
        return c + b * d
    };
    this.easeBackInQuart = function(a, c, b, d) {
        d = (a /= d) * a;
        return c + b * (2 * d * d + 2 * d * a + -3 * d)
    };
    this.easeInBack = function(a, c, b, d) {
        return b * (a /= d) * a * (2.70158 * a - 1.70158) + c
    };
    this.easeOutCubic = function(a, c, b, d) {
        return b * ((a = a / d - 1) * a * a + 1) + c
    };
    this.getTrajectoryPoint = function(a, c) {
        var b = new createjs.Point,
            d = (1 - a) * (1 - a),
            h = a * a;
        b.x = d *
            c.start.x + 2 * (1 - a) * a * c.traj.x + h * c.end.x;
        b.y = d * c.start.y + 2 * (1 - a) * a * c.traj.y + h * c.end.y;
        return b
    }
}

function CMsgBox() {
    var a, c, b, d;
    this._init = function() {
        d = new createjs.Container;
        d.visible = !1;
        s_oStage.addChild(d);
        a = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        d.addChild(a);
        c = new CTLText(d, CANVAS_WIDTH / 2 - 220, CANVAS_HEIGHT / 2 - 50, 440, 120, 30, "center", "#fff", FONT_GAME_1, 1, 0, 0, " ", !0, !0, !0, !1);
        b = new CGfxButton(CANVAS_WIDTH / 2 + 210, CANVAS_HEIGHT / 2 - 110, s_oSpriteLibrary.getSprite("but_exit_info"), d);
        b.addEventListener(ON_MOUSE_UP, this._onExit, this)
    };
    this.show = function(h) {
        c.refreshText(h);
        d.visible = !0
    };
    this.hide = function() {
        d.visible = !1
    };
    this._onExit = function() {
        this.hide()
    };
    this._init();
    return this
}

function CBonusPanel() {
    var a, c = !1,
        b = !1,
        d, h, g, m, q, l, u, w, A, f, k, n, x, y, z, t, E, D, F, B, M, C, P, L;
    this._init = function() {
        a = !1;
        c = !0;
        d = -1;
        L.removeAllChildren();
        var K = createBitmap(s_oSpriteLibrary.getSprite("bg_bonus"));
        L.addChild(K);
        K = s_oSpriteLibrary.getSprite("ball_shadow");
        t = createBitmap(K);
        t.x = CANVAS_WIDTH / 2 - 100;
        t.y = CANVAS_HEIGHT - 330;
        L.addChild(t);
        E = new CBonusBall(CANVAS_WIDTH / 2, 538, L);
        K = s_oSpriteLibrary.getSprite("but_goal");
        f = new CGfxButton(425, 155, K, L);
        f.addEventListenerWithParams(ON_MOUSE_UP, this._onShot,
            this, BONUS_BUTTON_1);
        k = new CGfxButton(495, 235, K, L);
        k.addEventListenerWithParams(ON_MOUSE_UP, this._onShot, this, BONUS_BUTTON_2);
        n = new CGfxButton(565, 315, K, L);
        n.addEventListenerWithParams(ON_MOUSE_UP, this._onShot, this, BONUS_BUTTON_3);
        x = new CGfxButton(1080, 155, K, L);
        x.addEventListenerWithParams(ON_MOUSE_UP, this._onShot, this, BONUS_BUTTON_4);
        y = new CGfxButton(1010, 235, K, L);
        y.addEventListenerWithParams(ON_MOUSE_UP, this._onShot, this, BONUS_BUTTON_5);
        z = new CGfxButton(940, 315, K, L);
        z.addEventListenerWithParams(ON_MOUSE_UP,
            this._onShot, this, BONUS_BUTTON_6);
        D = new CBonusGoalkeeper(L);
        F = new CBonusPlayer(646, 0, L);
        this._startBonus()
    };
    this._loadAllResources = function() {
        L = new createjs.Container;
        L.on("click", function() {});
        s_oAttachSection.addChild(L);
        var K = s_oSpriteLibrary.getSprite("bg_loading_bonus");
        M = createBitmap(K);
        L.addChild(M);
        K = s_oSpriteLibrary.getSprite("progress_bar");
        P = createBitmap(K);
        P.x = CANVAS_WIDTH / 2 - K.width / 2;
        P.y = CANVAS_HEIGHT - 170;
        L.addChild(P);
        q = K.width;
        l = K.height;
        A = new createjs.Shape;
        A.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(P.x,
            P.y, 1, l);
        L.addChild(A);
        P.mask = A;
        C = new createjs.Text("", "30px " + FONT_GAME_1, "#fff");
        C.x = CANVAS_WIDTH / 2;
        C.y = CANVAS_HEIGHT - 125;
        C.shadow = new createjs.Shadow("#000", 2, 2, 2);
        C.textBaseline = "alphabetic";
        C.textAlign = "center";
        L.addChild(C);
        s_oSpriteLibrary.init(this._onResourceBonusLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_bonus", "./sprites/bonus/bg_bonus.jpg");
        s_oSpriteLibrary.addSprite("ball_shadow", "./sprites/bonus/ball_shadow.png");
        s_oSpriteLibrary.addSprite("but_goal", "./sprites/bonus/but_goal.png");
        s_oSpriteLibrary.addSprite("ball_anim", "./sprites/bonus/ball_anim.png");
        s_oSpriteLibrary.addSprite("bonus_panel_bg", "./sprites/bonus/bonus_panel_bg.png");
        for (K = 0; 23 > K; K++) s_oSpriteLibrary.addSprite("gk_idle_" + K, "./sprites/bonus/goalkeeper_idle/gk_idle_" + K + ".png");
        for (K = 0; 33 > K; K++) s_oSpriteLibrary.addSprite("gk_save_left_" + K, "./sprites/bonus/goalkeeper_save_left/gk_save_left_" + K + ".png"), s_oSpriteLibrary.addSprite("gk_save_right_" + K, "./sprites/bonus/goalkeeper_save_right/gk_save_right_" + K + ".png");
        for (K =
            0; 30 > K; K++) s_oSpriteLibrary.addSprite("player_" + K, "./sprites/bonus/player/player_" + K + ".png");
        u = 0;
        w = s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
        b = !0
    };
    this._onResourceBonusLoaded = function() {
        u++;
        var K = Math.floor(u / w * 100);
        C.text = K + "%";
        A.graphics.clear();
        K = Math.floor(K * q / 100);
        A.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(P.x, P.y, K, l);
        u === w && this._init()
    };
    this._onAllImagesLoaded = function() {};
    this.show = function(K) {
        h = K;
        c ? this._startBonus() : this._loadAllResources();
        document.dispatchEvent(new CustomEvent("bonus_start"))
    };
    this.hide = function() {
        a = !1;
        L.off("click", function() {});
        L.visible = !1;
        B.unload();
        this._enableAllButtons();
        b = !1
    };
    this._startBonus = function() {
        t.visible = !0;
        D.show();
        L.on("click", function() {});
        a = L.visible = !0;
        d = STATE_BONUS_IDLE
    };
    this._enableAllButtons = function() {
        k.setVisible(!0);
        y.setVisible(!0);
        n.setVisible(!0);
        z.setVisible(!0);
        f.setVisible(!0);
        x.setVisible(!0)
    };
    this._disableAllButtons = function() {
        k.setVisible(!1);
        y.setVisible(!1);
        n.setVisible(!1);
        z.setVisible(!1);
        f.setVisible(!1);
        x.setVisible(!1)
    };
    this._onShot =
        function(K) {
            s_oBonusPanel._disableAllButtons();
            switch (K) {
                case BONUS_BUTTON_1:
                    g = f.getX();
                    m = f.getY();
                    break;
                case BONUS_BUTTON_2:
                    g = k.getX();
                    m = k.getY();
                    break;
                case BONUS_BUTTON_3:
                    g = n.getX();
                    m = n.getY();
                    break;
                case BONUS_BUTTON_4:
                    g = x.getX();
                    m = x.getY();
                    break;
                case BONUS_BUTTON_5:
                    g = y.getX();
                    m = y.getY();
                    break;
                case BONUS_BUTTON_6:
                    g = z.getX(), m = z.getY()
            }
            d = STATE_BONUS_KICK;
            F.show()
        };
    this.kick = function() {
        playSound("kick", 1, !1);
        t.visible = !1;
        E.show(g, m);
        D.dive(Math.round(Math.random() + 1))
    };
    this.ballArrived = function() {
        d =
            STATE_BONUS_WIN;
        new CScoreText(h, g, m);
        setTimeout(function() {
            B = new CBonusResultPanel(h, L)
        }, 2E3)
    };
    this.unload = function() {
        this.hide();
        s_oGame.exitFromBonus()
    };
    this.isVisible = function() {
        return b
    };
    this.update = function() {
        if (a) switch (d) {
            case STATE_BONUS_IDLE:
                D.update();
                break;
            case STATE_BONUS_KICK:
                D.update(), F.update(), E.update()
        }
    };
    s_oBonusPanel = this
}
var s_oBonusPanel = null,
    s_aSession = [];
NUM_ROWS = 3;
NUM_REELS = 5;
var _aFinalSymbols = [],
    _aPaylineCombo = [];
_aPaylineCombo = _initPaylines();
var _aSymbolWin = [],
    _iNumSymbolFreeSpin = 0;
s_aSession.bBonus = 0;

function _initSettings() {
    s_aSession.iMoney = TOTAL_MONEY;
    s_aSession.iSlotCash = SLOT_CASH;
    s_aSession.win_occurrence = WIN_OCCURRENCE;
    s_aSession.freespin_occurrence = FREESPIN_OCCURRENCE;
    s_aSession.bonus_occurrence = BONUS_OCCURRENCE;
    s_aSession.freespin_symbol_num_occur = FREESPIN_SYMBOL_NUM_OCCURR;
    s_aSession.num_freespin = NUM_FREESPIN;
    s_aSession.bonus_prize = BONUS_PRIZE;
    s_aSession.bonus_prize_occur = BONUS_PRIZE_OCCURR;
    s_aSession.coin_bet = COIN_BET;
    _aSymbolWin = _initSymbolWin()
}

function checkLogin() {
    s_aSession.iTotFreeSpin = 0;
    s_aSession.bFreeSpin = 0;
    _initSettings();
    _setMinWin();
    return _tryToCheckLogin()
}

function callSpin(a, c, b) {
    return _onSpin(a, c, b)
}

function _tryToCheckLogin() {
    for (var a = [], c = 0; c < _aSymbolWin.length; c++) a[c] = _aSymbolWin[c].join(",");
    return "res=true&login=true&money=" + s_aSession.iMoney + "&bonus_prize=" + s_aSession.bonus_prize.join("#") + "&paytable=" + a.join("#") + "&coin_bet=" + s_aSession.coin_bet.join("#")
}

function _setMinWin() {
    s_aSession.min_win = 9999999999999;
    for (var a = 0; a < _aSymbolWin.length; a++)
        for (var c = _aSymbolWin[a], b = 0; b < c.length; b++) 0 !== c[b] && c[b] < s_aSession.min_win && (s_aSession.min_win = c[b])
}

function _onSpin(a, c, b) {
    if (b > s_aSession.iMoney) _dieError("INVALID BET: " + b + ",money:" + s_aSession.iMoney);
    else {
        s_aSession.iMoney -= b;
        s_aSession.iSlotCash += b;
        var d = s_aSession.bBonus = 0,
            h = 0;
        if (s_aSession.iSlotCash < s_aSession.min_win * c) return generLosingPattern(), 1 === s_aSession.bFreeSpin && (--s_aSession.iTotFreeSpin, 0 > s_aSession.iTotFreeSpin && (s_aSession.iTotFreeSpin = 0, s_aSession.bFreeSpin = 0)), document.dispatchEvent(new CustomEvent("bet_placed", {
                detail: {
                    bet: c,
                    tot_bet: b,
                    payline: a,
                    amount_win: 0
                }
            })), "res=true&win=false&pattern=" +
            JSON.stringify(_aFinalSymbols) + "&money=" + s_aSession.iMoney + "&freespin=0&num_freespin=" + s_aSession.iTotFreeSpin + "&bonus=false&bonus_prize=-1&cash=" + s_aSession.iSlotCash;
        if (Math.floor(100 * Math.random()) < s_aSession.win_occurrence) {
            if (0 === s_aSession.bFreeSpin && 0 === s_aSession.bBonus) {
                var g = Math.floor(100 * Math.random());
                0 === s_aSession.iTotFreeSpin && g < s_aSession.freespin_occurrence + s_aSession.bonus_occurrence && (g = Math.floor(Math.random() * (s_aSession.freespin_occurrence + s_aSession.bonus_occurrence) + 1), g <=
                    s_aSession.freespin_occurrence ? d = 1 : h = s_aSession.iSlotCash >= s_aSession.bonus_prize[0] * c ? 1 : 0)
            }
            var m;
            g = 0;
            do {
                generateRandomSymbols(d, h);
                var q = checkWin(d, h, a),
                    l = 0;
                for (m = 0; m < q.length; m++) l += q[m].amount;
                l *= c;
                var u = 0;
                m = -1;
                if (1 === h) {
                    s_aSession.bBonus = 1;
                    m = [];
                    for (u = 0; u < s_aSession.bonus_prize_occur.length; u++)
                        for (var w = s_aSession.bonus_prize_occur[u], A = 0; A < w; A++) m.push(u);
                    m = m[Math.floor(Math.random() * m.length)];
                    u = s_aSession.bonus_prize[m] * c
                }
                g++
            } while (0 === q.length || u + l > s_aSession.iSlotCash || u + l < b);
            s_aSession.iMoney =
                s_aSession.iMoney + l + u;
            s_aSession.iSlotCash = s_aSession.iSlotCash - l - u;
            1 === d && 2 < _iNumSymbolFreeSpin ? (s_aSession.bFreeSpin = 1, s_aSession.iTotFreeSpin = s_aSession.num_freespin[_iNumSymbolFreeSpin - 3]) : 1 === s_aSession.bFreeSpin && (--s_aSession.iTotFreeSpin, 0 > s_aSession.iTotFreeSpin && (s_aSession.iTotFreeSpin = 0, s_aSession.bFreeSpin = 0));
            document.dispatchEvent(new CustomEvent("bet_placed", {
                detail: {
                    bet: c,
                    tot_bet: b,
                    payline: a,
                    amount_win: l + u
                }
            }));
            return "res=true&win=true&pattern=" + JSON.stringify(_aFinalSymbols) + "&win_lines=" +
                JSON.stringify(q) + "&money=" + s_aSession.iMoney + "&tot_win=" + l + "&freespin=" + d + "&num_freespin=" + s_aSession.iTotFreeSpin + "&bonus=" + s_aSession.bBonus + "&bonus_prize=" + m + "&cash=" + s_aSession.iSlotCash
        }
        generLosingPattern();
        1 === s_aSession.bFreeSpin && (--s_aSession.iTotFreeSpin, 0 > s_aSession.iTotFreeSpin && (s_aSession.iTotFreeSpin = 0, s_aSession.bFreeSpin = 0));
        document.dispatchEvent(new CustomEvent("bet_placed", {
            detail: {
                bet: c,
                tot_bet: b,
                payline: a,
                amount_win: 0
            }
        }));
        return "res=true&win=false&pattern=" + JSON.stringify(_aFinalSymbols) +
            "&money=" + s_aSession.iMoney + "&freespin=0&num_freespin=" + s_aSession.iTotFreeSpin + "&bonus=false&bonus_prize=-1"
    }
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
    _aPaylineCombo[6] = [{
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
    _aPaylineCombo[7] = [{
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
    _aPaylineCombo[8] = [{
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
    _aPaylineCombo[9] = [{
        row: 1,
        col: 0
    }, {
        row: 0,
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
        row: 2,
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
        row: 0,
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
        row: 2,
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
        row: 0,
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
    _aPaylineCombo[14] = [{
        row: 2,
        col: 0
    }, {
        row: 2,
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
    _aPaylineCombo[15] = [{
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
    _aPaylineCombo[16] = [{
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

function _initSymbolWin() {
    _aSymbolWin[0] = [0, 0, 0, 0, 0];
    _aSymbolWin[1] = PAYTABLE_VALUES[1];
    _aSymbolWin[2] = PAYTABLE_VALUES[2];
    _aSymbolWin[3] = PAYTABLE_VALUES[3];
    _aSymbolWin[4] = PAYTABLE_VALUES[4];
    _aSymbolWin[5] = PAYTABLE_VALUES[5];
    _aSymbolWin[6] = PAYTABLE_VALUES[6];
    _aSymbolWin[7] = PAYTABLE_VALUES[7];
    _aSymbolWin[8] = PAYTABLE_VALUES[8];
    _aSymbolWin[9] = PAYTABLE_VALUES[9];
    _aSymbolWin[10] = PAYTABLE_VALUES[10];
    _aSymbolWin[11] = [0, 0, 0, 0, 0];
    _aSymbolWin[12] = [0, 0, 0, 0, 0];
    return _aSymbolWin
}

function generLosingPattern() {
    for (var a = [], c = 0; c < NUM_ROWS; c++) {
        do var b = Math.floor(Math.random() * s_aRandSymbols.length); while (s_aRandSymbols[b] === BONUS_SYMBOL || s_aRandSymbols[b] === FREESPIN_SYMBOL || s_aRandSymbols[b] === WILD_SYMBOL);
        b = s_aRandSymbols[b];
        a[c] = b
    }
    for (c = 0; c < NUM_ROWS; c++) {
        _aFinalSymbols[c] = [];
        for (var d = 0; d < NUM_REELS; d++)
            if (0 == d) _aFinalSymbols[c][d] = a[c];
            else {
                do b = Math.floor(Math.random() * s_aRandSymbols.length), b = s_aRandSymbols[b]; while (a[0] === b || a[1] === b || a[2] === b || b === BONUS_SYMBOL || b === FREESPIN_SYMBOL ||
                    b === WILD_SYMBOL);
                _aFinalSymbols[c][d] = b
            }
    }
}

function generateRandomSymbols(a, c) {
    for (var b = 0; b < NUM_ROWS; b++) {
        _aFinalSymbols[b] = [];
        for (var d = 0; d < NUM_REELS; d++) {
            do iRandSymbol = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)], _aFinalSymbols[b][d] = iRandSymbol; while (iRandSymbol === BONUS_SYMBOL || iRandSymbol === FREESPIN_SYMBOL)
        }
    }
    if (1 === a) {
        var h = [];
        for (b = 0; b < s_aSession.freespin_symbol_num_occur.length; b++)
            for (d = 0; d < s_aSession.freespin_symbol_num_occur[b]; d++) h.push(b);
        _iNumSymbolFreeSpin = 3 + h[Math.floor(Math.random() * h.length)];
        b = [0, 1, 2,
            3, 4
        ];
        b = shuffle(b);
        for (d = 0; d < _iNumSymbolFreeSpin; d++) h = Math.floor(3 * Math.random()), _aFinalSymbols[h][b[d]] = FREESPIN_SYMBOL
    } else if (1 === c) {
        b = [0, 1, 2, 3, 4];
        b = shuffle(b);
        var g = Math.floor(3 * Math.random() + 3);
        for (d = 0; d < g; d++) h = Math.floor(3 * Math.random()), _aFinalSymbols[h][b[d]] = BONUS_SYMBOL
    }
}

function checkWin(a, c, b) {
    for (var d = [], h = 0; h < b; h++) {
        var g = _aPaylineCombo[h],
            m = [],
            q = _aFinalSymbols[g[0].row][g[0].col],
            l = 1,
            u = 1;
        for (m.push({
                row: g[0].row,
                col: g[0].col,
                value: _aFinalSymbols[g[0].row][g[0].col]
            }); q === WILD_SYMBOL && u < NUM_REELS;) l++, q = _aFinalSymbols[g[u].row][g[u].col], m.push({
            row: g[u].row,
            col: g[u].col,
            value: _aFinalSymbols[g[u].row][g[u].col]
        }), u++;
        for (; u < g.length; u++)
            if (_aFinalSymbols[g[u].row][g[u].col] === q || _aFinalSymbols[g[u].row][g[u].col] === WILD_SYMBOL) l++, m.push({
                row: g[u].row,
                col: g[u].col,
                value: _aFinalSymbols[g[u].row][g[u].col]
            });
            else break;
        !(0 < _aSymbolWin[q - 1][l - 1]) || 1 === a && q === FREESPIN_SYMBOL || 1 === c && q === BONUS_SYMBOL || (m.sort(sortListByCol), d.push({
            line: h + 1,
            amount: _aSymbolWin[q - 1][l - 1],
            num_win: l,
            value: q,
            list: m
        }))
    }
    if (1 === a) {
        m = [];
        for (a = 0; a < NUM_ROWS; a++)
            for (c = 0; c < NUM_REELS; c++) _aFinalSymbols[a][c] === FREESPIN_SYMBOL && m.push({
                row: a,
                col: c,
                value: FREESPIN_SYMBOL
            });
        m.sort(sortListByCol);
        d.push({
            line: 0,
            amount: 0,
            num_win: m.length,
            value: FREESPIN_SYMBOL,
            list: m
        })
    } else if (1 === c) {
        m = [];
        for (a = 0; a <
            NUM_ROWS; a++)
            for (c = 0; c < NUM_REELS; c++) _aFinalSymbols[a][c] === BONUS_SYMBOL && m.push({
                row: a,
                col: c,
                value: BONUS_SYMBOL
            });
        m.sort(sortListByCol);
        d.push({
            line: 0,
            amount: 0,
            num_win: m.length,
            value: BONUS_SYMBOL,
            list: m
        })
    }
    return d
}

function shuffle(a) {
    for (var c, b, d = a.length; d; c = Math.floor(Math.random() * d), b = a[--d], a[d] = a[c], a[c] = b);
    return a
}

function sortListByCol(a, c) {
    return a.col < c.col ? -1 : a.col > c.col ? 1 : 0
}

function _dieError(a) {
    return "res=false&desc=" + a
}

function CSpinBut(a, c, b, d, h, g) {
    var m = !1,
        q = !1,
        l, u, w, A, f, k, n;
    this._init = function(y, z, t, E, D) {
        A = [];
        f = [];
        k = new createjs.Container;
        k.x = y;
        k.y = z;
        k.regX = Math.floor(E / 2);
        k.regY = Math.floor(D / 2);
        k.cursor = "pointer";
        x.addChild(k);
        y = new createjs.SpriteSheet({
            framerate: 1,
            images: [t],
            frames: {
                width: E,
                height: D
            },
            animations: {
                spin: [0],
                stop: [1],
                autospin: [2],
                skip: [3],
                freespin: [4],
                disable: [5]
            }
        });
        n = createSprite(y, "spin", 0, 0, E, D);
        n.stop();
        k.addChild(n);
        l = D;
        w = SPIN_BUT_STATE_SPIN;
        this._initListener()
    };
    this.enable = function() {
        m = !1;
        n.gotoAndStop(w)
    };
    this.disable = function() {
        m = !0
    };
    this.setState = function(y) {
        n.gotoAndStop(y);
        y !== SPIN_BUT_STATE_STOP && (w = y)
    };
    this.toggleAutoSpinImage = function() {
        n.currentAnimation === SPIN_BUT_STATE_SPIN ? n.gotoAndStop(SPIN_BUT_STATE_AUTOSPIN) : n.gotoAndStop(SPIN_BUT_STATE_SPIN)
    };
    this._initListener = function() {
        k.on("mousedown", this.buttonDown);
        k.on("pressup", this.buttonRelease)
    };
    this.unload = function() {
        k.off("mousedown", this.buttonDown);
        k.off("pressup", this.buttonRelease);
        x.removeChild(k)
    };
    this.setVisible =
        function(y) {
            k.visible = y
        };
    this.addEventListener = function(y, z, t) {
        A[y] = z;
        f[y] = t
    };
    this.buttonRelease = function() {
        !1 === q || m || (q = !1, A[ON_MOUSE_UP] && A[ON_MOUSE_UP].call(f[ON_MOUSE_UP], n.currentAnimation))
    };
    this.buttonDown = function() {
        m || (u = 0, q = !0, A[ON_MOUSE_DOWN] && A[ON_MOUSE_DOWN].call(f[ON_MOUSE_DOWN]))
    };
    this.setPosition = function(y, z) {
        k.x = y;
        k.y = z
    };
    this.setX = function(y) {
        k.x = y
    };
    this.setY = function(y) {
        k.y = y
    };
    this.getButtonImage = function() {
        return k
    };
    this.getX = function() {
        return k.x
    };
    this.getY = function() {
        return k.y
    };
    this.getHeight = function() {
        return l
    };
    this.getSprite = function() {
        return k
    };
    this.getState = function() {
        return n.currentAnimation
    };
    this.update = function() {
        !1 !== q && (u += s_iTimeElaps, u > TIME_HOLD_AUTOSPIN && (u = 0, q = !1, A[ON_MOUSE_UP] && A[ON_MOUSE_UP].call(f[ON_MOUSE_UP], n.currentAnimation, !0)))
    };
    var x = g;
    this._init(a, c, b, d, h);
    return this
}

function CBonusGoalkeeper(a) {
    var c = !1,
        b, d, h, g, m, q, l, u, w, A;
    this._init = function() {
        l = new createjs.Container;
        f.addChild(l);
        u = new createjs.Container;
        u.x = 650;
        u.y = 160;
        l.addChild(u);
        w = new createjs.Container;
        w.visible = !1;
        w.x = 292;
        w.y = 132;
        l.addChild(w);
        A = new createjs.Container;
        A.visible = !1;
        A.x = 662;
        A.y = 132;
        l.addChild(A);
        q = [
            [],
            [],
            []
        ];
        for (var k = 0; 23 > k; k++) {
            var n = createBitmap(s_oSpriteLibrary.getSprite("gk_idle_" + k));
            u.addChild(n);
            q[0].push(n);
            0 < k && (n.visible = !1)
        }
        for (k = 0; 33 > k; k++) {
            n = createBitmap(s_oSpriteLibrary.getSprite("gk_save_left_" +
                k));
            w.addChild(n);
            q[1].push(n);
            var x = createBitmap(s_oSpriteLibrary.getSprite("gk_save_right_" + k));
            A.addChild(x);
            q[2].push(x);
            0 < k && (n.visible = !1, x.visible = !1)
        }
    };
    this.show = function() {
        g = b = 0;
        m = 2;
        d = 23;
        u.visible = !0;
        w.visible = !1;
        A.visible = !1;
        l.visible = !0;
        q[b][0].visible = !0;
        h = 0;
        c = !0
    };
    this.dive = function(k) {
        g = 0;
        m = 1;
        d = 33;
        b = k;
        switch (b) {
            case 1:
                u.visible = !1;
                w.visible = !0;
                A.visible = !1;
                break;
            case 2:
                u.visible = !1, w.visible = !1, A.visible = !0
        }
        q[b][0].visible = !0;
        h = 0;
        this.resetIdleAnim();
        c = !0
    };
    this.resetIdleAnim = function() {
        for (var k =
                0; k < q[0].length; k++) q[0][k].visible = !1
    };
    this._showWinAnim = function() {
        l.visible = !1;
        u.visible = !0;
        w.visible = !1;
        c = A.visible = !1
    };
    this.playToFrame = function(k) {
        q[b][h].visible = !1;
        h = k;
        q[b][h].visible = !0
    };
    this.nextFrame = function() {
        q[b][h].visible = !1;
        h++;
        q[b][h].visible = !0
    };
    this.update = function() {
        !1 !== c && (g++, g === m && (g = 0, h === d - 1 ? 0 === b ? this.playToFrame(1) : (q[b][h].visible = !1, this._showWinAnim()) : this.nextFrame()))
    };
    var f = a;
    this._init()
}

function CBonusPlayer(a, c, b) {
    var d = !1,
        h, g, m, q;
    this._init = function(u, w) {
        q = new createjs.Container;
        q.visible = !1;
        q.x = u;
        q.y = w;
        l.addChild(q);
        m = [];
        for (var A = 0; 30 > A; A++) {
            var f = createBitmap(s_oSpriteLibrary.getSprite("player_" + A));
            q.addChild(f);
            m.push(f);
            0 < A && (f.visible = !1)
        }
    };
    this.show = function() {
        h = 30;
        m[0].visible = !0;
        g = 0;
        d = q.visible = !0
    };
    this.hide = function() {
        q.visible = !1
    };
    this.playToFrame = function(u) {
        m[g].visible = !1;
        g = u;
        m[g].visible = !0
    };
    this.nextFrame = function() {
        m[g].visible = !1;
        g++;
        m[g].visible = !0
    };
    this.update =
        function() {
            !1 !== d && (g === h - 1 ? (d = !1, this.hide()) : (this.nextFrame(), 9 === g && s_oBonusPanel.kick()))
        };
    var l = b;
    this._init(a, c)
}

function CBonusBall(a, c, b) {
    var d = !1,
        h, g, m, q, l, u, w, A, f, k;
    this._init = function(x, y) {
        h = x;
        g = y;
        q = 1;
        l = FPS / 2;
        var z = s_oSpriteLibrary.getSprite("ball_anim"),
            t = new createjs.SpriteSheet({
                images: [z],
                frames: {
                    width: 211,
                    height: 205,
                    regX: 105,
                    regY: 102
                },
                animations: {
                    "static": [0],
                    moving: [1, 29, "moving"]
                }
            });
        k = createSprite(t, "static", 0, 0, z.width / 2, z.height);
        k.visible = !1;
        k.x = h;
        k.y = g;
        k.stop();
        n.addChild(k);
        f = new CTweenController
    };
    this.show = function(x, y) {
        u = x;
        w = y;
        k.x = h;
        k.y = g;
        this._calculateMid(new createjs.Point(k.x, k.y), new createjs.Point(u,
            w));
        k.scaleX = k.scaleY = 1;
        k.alpha = 1;
        k.visible = !0;
        k.gotoAndPlay("moving");
        m = 0;
        d = !0
    };
    this.hide = function() {
        k.visible = !1
    };
    this._resetBall = function() {
        playSound("avatar_win", 1, !1);
        m = 0;
        k.gotoAndStop("static");
        d = !1;
        createjs.Tween.get(k).to({
            y: CANVAS_HEIGHT / 2
        }, 1500, createjs.Ease.cubicIn);
        createjs.Tween.get(k).to({
            alpha: 0
        }, 1E3, createjs.Ease.cubicIn).call(function() {
            s_oBonusPanel.ballArrived()
        })
    };
    this._calculateMid = function(x, y) {
        var z = y.x < CANVAS_WIDTH / 2 ? new createjs.Point(y.x - 100, y.y + 40) : new createjs.Point(y.x +
            100, y.y + 40);
        A = {
            start: x,
            end: y,
            traj: z
        }
    };
    this.getX = function() {
        return k.x
    };
    this.getY = function() {
        return k.y
    };
    this.update = function() {
        if (d)
            if (m += q, m > l) this._resetBall();
            else {
                var x = f.easeOutCubic(m, 0, 1, l);
                x = f.getTrajectoryPoint(x, A);
                k.x = x.x;
                k.y = x.y;
                .2 <= k.scaleX && (k.scaleX -= .06, k.scaleY -= .06)
            }
    };
    var n = b;
    this._init(a, c)
}

function CScoreText(a, c, b) {
    var d;
    this._init = function(h, g, m) {
        d = new createjs.Text("00000", " 60px " + FONT_GAME_1, "#ffd202");
        d.textAlign = "center";
        d.text = "X" + h;
        d.x = g;
        d.y = m;
        d.alpha = 0;
        d.shadow = new createjs.Shadow("#000", 1, 1, 1);
        s_oStage.addChild(d);
        var q = this;
        createjs.Tween.get(d).to({
            alpha: 1
        }, 200, createjs.Ease.quadIn).call(function() {
            q.moveUp()
        })
    };
    this.moveUp = function() {
        var h = d.y - 100,
            g = this;
        createjs.Tween.get(d).to({
            y: h
        }, 1500, createjs.Ease.sineIn).call(function() {
            g.unload()
        });
        createjs.Tween.get(d).wait(800).to({
                alpha: 0
            },
            500)
    };
    this.unload = function() {
        s_oStage.removeChild(d)
    };
    this._init(a, c, b)
}

function CBonusResultPanel(a, c) {
    var b, d;
    this._init = function(g) {
        b = new createjs.Shape;
        b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        b.alpha = 0;
        h.addChild(b);
        d = new createjs.Container;
        d.x = -CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2;
        h.addChild(d);
        var m = s_oSpriteLibrary.getSprite("bonus_panel_bg"),
            q = createBitmap(m);
        q.regX = m.width / 2;
        q.regY = m.height / 2;
        d.addChild(q);
        (new CTLText(d, -240, -110, 480, 52, 52, "center", "#fff", FONT_GAME_1, 1, 0, 0, TEXT_CONGRATS, !0, !0, !1, !1)).setShadow("#000", 1, 1, 1);
        (new CTLText(d, -240, 10, 480, 100, 50, "center", "#fff", FONT_GAME_1, 1, 0, 0, TEXT_YOU_WIN + "\nX" + g, !0, !0, !0, !1)).setShadow("#000", 1, 1, 1);
        createjs.Tween.get(d).to({
            x: CANVAS_WIDTH / 2
        }, 1E3, createjs.Ease.cubicOut).call(function() {
            createjs.Tween.get(b).to({
                alpha: .6
            }, 400)
        }).call(function() {
            setTimeout(function() {
                s_oBonusPanel.unload()
            }, 2E3)
        });
        playSound("bonus_win", 1, !1)
    };
    this.unload = function() {
        h.removeChild(b);
        h.removeChild(d)
    };
    var h = c;
    this._init(a)
}

function CFreespinPanel(a) {
    var c, b;
    this._init = function() {
        b = new createjs.Container;
        b.visible = !1;
        d.addChild(b);
        var h = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        b.addChild(h);
        new CTLText(b, CANVAS_WIDTH / 2 - 240, 300, 480, 50, 50, "center", "#fff", FONT_GAME_1, 1, 0, 0, TEXT_CONGRATS, !0, !0, !1, !1);
        c = new CTLText(b, CANVAS_WIDTH / 2 - 240, 420, 480, 50, 50, "center", "#fff", FONT_GAME_1, 1, 0, 0, " ", !0, !0, !1, !1)
    };
    this.show = function(h) {
        c.refreshText(TEXT_YOU_WIN + " " + h + " " + TEXT_FREESPINS);
        b.on("click", function() {});
        b.alpha = 0;
        b.visible = !0;
        var g = this;
        createjs.Tween.get(b).to({
            alpha: 1
        }, 800, createjs.Ease.cubicOut).call(function() {
            setTimeout(function() {
                g.hide()
            }, 3E3)
        });
        playSound("bonus_win", 1, !1)
    };
    this.hide = function() {
        b.off("click", function() {});
        createjs.Tween.get(b).to({
            alpha: 0
        }, 800, createjs.Ease.cubicOut).call(function() {
            b.visible = !1
        });
        s_oGame.exitFromFreespinPanel()
    };
    var d = a;
    this._init()
}

function CAvatar(a) {
    var c, b = !1,
        d = !1,
        h, g = 2,
        m = 0,
        q, l = 0,
        u, w, A, f;
    this._init = function() {
        c = 50;
        f = new createjs.Container;
        f.x = 130;
        f.y = 252;
        k.addChild(f);
        w = new createjs.Container;
        f.addChild(w);
        A = new createjs.Container;
        A.visible = !1;
        f.addChild(A);
        u = [
            [],
            []
        ];
        for (var n = 0; 30 > n; n++) {
            var x = createBitmap(s_oSpriteLibrary.getSprite("avatar_idle_" + n));
            w.addChild(x);
            u[0][n] = x;
            x.visible = !1
        }
        for (n = 0; 38 > n; n++) x = createBitmap(s_oSpriteLibrary.getSprite("avatar_win_" + n)), A.addChild(x), u[1][n] = x, x.visible = !1;
        this.refreshButtonPos(s_iOffsetX)
    };
    this._hideAllAnims = function() {
        for (var n = 0; n < u[0].length; n++) u[0][n].visible = !1, u[1][n].visible = !1, u[2][n].visible = !1
    };
    this.refreshButtonPos = function(n, x) {
        130 > c + n && (f.x = c + n)
    };
    this.show = function(n) {
        u[l][m].visible = !1;
        l = n;
        switch (n) {
            case 0:
                w.visible = !0;
                A.visible = !1;
                break;
            case 1:
                w.visible = !1, A.visible = !0
        }
        q = u[l].length;
        g = 2;
        u[l][0].visible = !0;
        d = m = h = 0;
        b = !0
    };
    this.playToFrame = function(n) {
        u[l][m].visible = !1;
        m = n;
        u[l][m].visible = !0
    };
    this.nextFrame = function() {
        u[l][m].visible = !1;
        m++;
        u[l][m].visible = !0
    };
    this.update =
        function() {
            !1 !== b && (h++, h === g && (h = 0, m === q - 1 ? (this.playToFrame(1), d++, 2 === d && 1 === l && this.show(0)) : this.nextFrame()))
        };
    var k = a;
    this._init()
}

function CCreditsPanel() {
    var a, c, b, d;
    this._init = function() {
        c = new createjs.Container;
        s_oStage.addChild(c);
        var h = s_oSpriteLibrary.getSprite("msg_box");
        h = createBitmap(h);
        c.addChild(h);
        a = new createjs.Shape;
        a.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        a.alpha = .01;
        a.on("click", this._onLogoButRelease);
        c.addChild(a);
        h = new createjs.Text("www.codethislab.com", " 34px " + FONT_GAME_1, "#000000");
        h.x = CANVAS_WIDTH / 2;
        h.y = 500;
        h.textAlign = "center";
        h.textBaseline = "middle";
        h.lineWidth = 300;
        h.outline =
            5;
        c.addChild(h);
        var g = new createjs.Text("www.codethislab.com", " 34px " + FONT_GAME_1, "#ffffff");
        g.x = CANVAS_WIDTH / 2;
        g.y = h.y;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.lineWidth = 300;
        c.addChild(g);
        h = s_oSpriteLibrary.getSprite("ctl_logo");
        d = createBitmap(h);
        d.regX = h.width / 2;
        d.regY = h.height / 2;
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2 - 40;
        c.addChild(d);
        h = s_oSpriteLibrary.getSprite("but_exit_info");
        b = new CGfxButton(970, 264, h, c);
        b.addEventListener(ON_MOUSE_UP, this.unload, this);
        c.alpha = 0;
        createjs.Tween.get(c).to({
                alpha: 1
            },
            1E3, createjs.Ease.cubicOut)
    };
    this.unload = function() {
        b.unload();
        a.off("mousedown", this._onLogoButRelease);
        s_oStage.removeChild(c)
    };
    this._onLogoButRelease = function() {
        window.open("https://www.codethislab.com/", "_blank")
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
    setShadow: function(a, c, b, d) {
        null !== this._oText && (this._oText.shadow = new createjs.Shadow(a, c, b, d))
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
    getX: function() {
        return this._x
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

function CTLText(a, c, b, d, h, g, m, q, l, u, w, A, f, k, n, x, y) {
    this._oContainer = a;
    this._x = c;
    this._y = b;
    this._iWidth = d;
    this._iHeight = h;
    this._bMultiline = x;
    this._iFontSize = g;
    this._szAlign = m;
    this._szColor = q;
    this._szFont = l;
    this._iPaddingH = w;
    this._iPaddingV = A;
    this._bVerticalAlign = n;
    this._bFitText = k;
    this._bDebug = y;
    this._oDebugShape = null;
    this._fLineHeightFactor = u;
    this._oText = null;
    f && this.__createText(f)
}

function CRechargePanel() {
    var a, c, b, d, h, g, m = this;
    this._init = function() {
        g = new createjs.Container;
        g.visible = !1;
        s_oStage.addChild(g);
        c = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        a = c.on("click", function() {});
        g.addChild(c);
        h = new CTLText(g, CANVAS_WIDTH / 2 - 240, 250, 480, 150, 40, "center", "#000", FONT_GAME_1, 1, 0, 0, TEXT_NO_MONEY, !0, !0, !0, !1);
        h.setOutline(3);
        new CTLText(g, CANVAS_WIDTH / 2 - 240, 250, 480, 150, 40, "center", "#fff", FONT_GAME_1, 1, 0, 0, TEXT_NO_MONEY, !0, !0, !0, !1);
        d = new CTextButton(CANVAS_WIDTH / 2 - 140, CANVAS_HEIGHT /
            2 + 100, s_oSpriteLibrary.getSprite("info_but"), TEXT_EXIT, FONT_GAME_1, "#fff", 40, "center", 0, g);
        d.addEventListener(ON_MOUSE_UP, this._onExit, this);
        b = new CTextButton(CANVAS_WIDTH / 2 + 140, CANVAS_HEIGHT / 2 + 100, s_oSpriteLibrary.getSprite("info_but"), TEXT_RECHARGE, FONT_GAME_1, "#fff", 40, "center", 0, g);
        b.addEventListener(ON_MOUSE_UP, this._onRecharge, this)
    };
    this.unload = function() {
        c.off("click", a);
        d.unload();
        d = null;
        b.unload();
        s_oStage.removeChild(g)
    };
    this.show = function() {
        g.alpha = 0;
        g.visible = !0;
        createjs.Tween.get(g).to({
                alpha: 1
            },
            600, createjs.Ease.cubicOut)
    };
    this.hide = function() {
        g.visible = !1
    };
    this._onExit = function() {
        m.hide();
        s_oInterface.enableGuiButtons()
    };
    this._onRecharge = function() {
        document.dispatchEvent(new CustomEvent("recharge"));
        m.hide()
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
    var c = a.split("."),
        b = c.length;
    2 < b && (a = c[b - 2] + "." + c[b - 1]);
    return a
}
var getClosestTop = function() {
        var a = window,
            c = !1;
        try {
            for (; a.parent.document !== a.document;)
                if (a.parent.document) a = a.parent;
                else {
                    c = !0;
                    break
                }
        } catch (b) {
            c = !0
        }
        return {
            topFrame: a,
            err: c
        }
    },
    getBestPageUrl = function(a) {
        var c = a.topFrame,
            b = "";
        if (a.err) try {
            try {
                b = window.top.location.href
            } catch (h) {
                var d = window.location.ancestorOrigins;
                b = d[d.length - 1]
            }
        } catch (h) {
            b = c.document.referrer
        } else b = c.location.href;
        return b
    },
    TOPFRAMEOBJ = getClosestTop(),
    PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);

function seekAndDestroy() {
    for (var a = extractRootDomain(PAGE_URL), c = [String.fromCharCode(99, 111, 100, 101, 116, 104, 105, 115, 108, 97, 98, 46, 99, 111, 109), String.fromCharCode(101, 110, 118, 97, 116, 111, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 99, 111, 109), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116)], b = 0; b < c.length; b++)
        if (c[b] === a) return !0;
    return !1
};