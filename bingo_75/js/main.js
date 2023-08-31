(function() {
    var a = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document : {},
        c = "undefined" !== typeof module && module.exports,
        b = function() {
            for (var b, c = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "),
                    "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")
                ], f = 0, n = c.length, d = {}; f < n; f++)
                if ((b = c[f]) && b[1] in a) {
                    for (f = 0; f < b.length; f++) d[c[0][f]] = b[f];
                    return d
                }
            return !1
        }(),
        f = {
            change: b.fullscreenchange,
            error: b.fullscreenerror
        },
        m = {
            request: function(c) {
                return new Promise(function(f, k) {
                    var n = function() {
                        this.off("change",
                            n);
                        f()
                    }.bind(this);
                    this.on("change", n);
                    c = c || a.documentElement;
                    Promise.resolve(c[b.requestFullscreen]())["catch"](k)
                }.bind(this))
            },
            exit: function() {
                return new Promise(function(c, f) {
                    if (this.isFullscreen) {
                        var k = function() {
                            this.off("change", k);
                            c()
                        }.bind(this);
                        this.on("change", k);
                        Promise.resolve(a[b.exitFullscreen]())["catch"](f)
                    } else c()
                }.bind(this))
            },
            toggle: function(a) {
                return this.isFullscreen ? this.exit() : this.request(a)
            },
            onchange: function(a) {
                this.on("change", a)
            },
            onerror: function(a) {
                this.on("error", a)
            },
            on: function(b, c) {
                var k = f[b];
                k && a.addEventListener(k, c, !1)
            },
            off: function(b, c) {
                var k = f[b];
                k && a.removeEventListener(k, c, !1)
            },
            raw: b
        };
    b ? (Object.defineProperties(m, {
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
    }), c ? module.exports = m : window.screenfull = m) : c ? module.exports = {
        isEnabled: !1
    } : window.screenfull = {
        isEnabled: !1
    }
})();
(function() {
    function a(a) {
        a = String(a);
        return a.charAt(0).toUpperCase() + a.slice(1)
    }

    function c(a, b) {
        var d = -1,
            c = a ? a.length : 0;
        if ("number" == typeof c && -1 < c && c <= u)
            for (; ++d < c;) b(a[d], d, a);
        else f(a, b)
    }

    function b(b) {
        b = String(b).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(b) ? b : a(b)
    }

    function f(a, b) {
        for (var d in a) z.call(a, d) && b(a[d], d, a)
    }

    function m(b) {
        return null == b ? a(b) : r.call(b).slice(8, -1)
    }

    function g(a, b) {
        var d = null != a ? typeof a[b] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(d) &&
            ("object" == d ? !!a[b] : !0)
    }

    function h(a) {
        return String(a).replace(/([ -])(?!$)/g, "$1?")
    }

    function k(a, b) {
        var d = null;
        c(a, function(c, p) {
            d = b(d, c, p, a)
        });
        return d
    }

    function n(a) {
        function d(d) {
            return k(d, function(d, e) {
                var c = e.pattern || h(e);
                !d && (d = RegExp("\\b" + c + " *\\d+[.\\w_]*", "i").exec(a) || RegExp("\\b" + c + " *\\w+-[\\w]*", "i").exec(a) || RegExp("\\b" + c + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(a)) && ((d = String(e.label && !RegExp(c, "i").test(e.label) ? e.label : d).split("/"))[1] && !/[\d.]+/.test(d[0]) && (d[0] +=
                    " " + d[1]), e = e.label || e, d = b(d[0].replace(RegExp(c, "i"), e).replace(RegExp("; *(?:" + e + "[_-])?", "i"), " ").replace(RegExp("(" + e + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return d
            })
        }

        function c(b) {
            return k(b, function(b, d) {
                return b || (RegExp(d + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(a) || 0)[1] || null
            })
        }
        var e = l,
            p = a && "object" == typeof a && "String" != m(a);
        p && (e = a, a = null);
        var t = e.navigator || {},
            w = t.userAgent || "";
        a || (a = w);
        var u = p ? !!t.likeChrome : /\bChrome\b/.test(a) && !/internal|\n/i.test(r.toString()),
            z = p ? "Object" : "ScriptBridgingProxyObject",
            B = p ? "Object" : "Environment",
            Q = p && e.java ? "JavaPackage" : m(e.java),
            D = p ? "Object" : "RuntimeObject";
        B = (Q = /\bJava/.test(Q) && e.java) && m(e.environment) == B;
        var T = Q ? "a" : "\u03b1",
            S = Q ? "b" : "\u03b2",
            U = e.document || {},
            I = e.operamini || e.opera,
            L = v.test(L = p && I ? I["[[Class]]"] : m(I)) ? L : I = null,
            q, M = a;
        p = [];
        var J = null,
            K = a == w;
        w = K && I && "function" == typeof I.version && I.version();
        var F = function(b) {
                return k(b, function(b, d) {
                    return b || RegExp("\\b" + (d.pattern || h(d)) + "\\b", "i").exec(a) && (d.label ||
                        d)
                })
            }([{
                label: "EdgeHTML",
                pattern: "Edge"
            }, "Trident", {
                label: "WebKit",
                pattern: "AppleWebKit"
            }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
            x = function(b) {
                return k(b, function(b, d) {
                    return b || RegExp("\\b" + (d.pattern || h(d)) + "\\b", "i").exec(a) && (d.label || d)
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
            G = d([{
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
            R = function(b) {
                return k(b, function(b, d, e) {
                    return b || (d[G] || d[/^[a-z]+(?: +[a-z]+\b)*/i.exec(G)] || RegExp("\\b" + h(e) + "(?:\\b|\\w*\\d)", "i").exec(a)) && e
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
            y = function(d) {
                return k(d, function(d, e) {
                    var c = e.pattern || h(e);
                    if (!d && (d = RegExp("\\b" + c + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(a))) {
                        var p = d,
                            l = e.label || e,
                            f = {
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
                        c && l && /^Win/i.test(p) && !/^Windows Phone /i.test(p) && (f = f[/[\d.]+$/.exec(p)]) && (p = "Windows " + f);
                        p = String(p);
                        c && l && (p = p.replace(RegExp(c, "i"), l));
                        d = p = b(p.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/,
                            " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                    }
                    return d
                })
            }(["Windows Phone", "Android", "CentOS", {
                    label: "Chrome OS",
                    pattern: "CrOS"
                }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac",
                "Windows 98;", "Windows "
            ]);
        F && (F = [F]);
        R && !G && (G = d([R]));
        if (q = /\bGoogle TV\b/.exec(G)) G = q[0];
        /\bSimulator\b/i.test(a) && (G = (G ? G + " " : "") + "Simulator");
        "Opera Mini" == x && /\bOPiOS\b/.test(a) && p.push("running in Turbo/Uncompressed mode");
        "IE" == x && /\blike iPhone OS\b/.test(a) ? (q = n(a.replace(/like iPhone OS/, "")), R = q.manufacturer, G = q.product) : /^iP/.test(G) ? (x || (x = "Safari"), y = "iOS" + ((q = / OS ([\d_]+)/i.exec(a)) ? " " + q[1].replace(/_/g, ".") : "")) : "Konqueror" != x || /buntu/i.test(y) ? R && "Google" != R && (/Chrome/.test(x) &&
            !/\bMobile Safari\b/i.test(a) || /\bVita\b/.test(G)) || /\bAndroid\b/.test(y) && /^Chrome/.test(x) && /\bVersion\//i.test(a) ? (x = "Android Browser", y = /\bAndroid\b/.test(y) ? y : "Android") : "Silk" == x ? (/\bMobi/i.test(a) || (y = "Android", p.unshift("desktop mode")), /Accelerated *= *true/i.test(a) && p.unshift("accelerated")) : "PaleMoon" == x && (q = /\bFirefox\/([\d.]+)\b/.exec(a)) ? p.push("identifying as Firefox " + q[1]) : "Firefox" == x && (q = /\b(Mobile|Tablet|TV)\b/i.exec(a)) ? (y || (y = "Firefox OS"), G || (G = q[1])) : !x || (q = !/\bMinefield\b/i.test(a) &&
            /\b(?:Firefox|Safari)\b/.exec(x)) ? (x && !G && /[\/,]|^[^(]+?\)/.test(a.slice(a.indexOf(q + "/") + 8)) && (x = null), (q = G || R || y) && (G || R || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(y)) && (x = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(y) ? y : q) + " Browser")) : "Electron" == x && (q = (/\bChrome\/([\d.]+)\b/.exec(a) || 0)[1]) && p.push("Chromium " + q) : y = "Kubuntu";
        w || (w = c(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", h(x), "(?:Firefox|Minefield|NetFront)"]));
        if (q = "iCab" == F && 3 < parseFloat(w) && "WebKit" || /\bOpera\b/.test(x) && (/\bOPR\b/.test(a) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(a) && !/^(?:Trident|EdgeHTML)$/.test(F) && "WebKit" || !F && /\bMSIE\b/i.test(a) && ("Mac OS" == y ? "Tasman" : "Trident") || "WebKit" == F && /\bPlayStation\b(?! Vita\b)/i.test(x) && "NetFront") F = [q];
        "IE" == x && (q = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(a) || 0)[1]) ? (x += " Mobile", y = "Windows Phone " + (/\+$/.test(q) ? q : q + ".x"), p.unshift("desktop mode")) : /\bWPDesktop\b/i.test(a) ? (x = "IE Mobile", y = "Windows Phone 8.x",
            p.unshift("desktop mode"), w || (w = (/\brv:([\d.]+)/.exec(a) || 0)[1])) : "IE" != x && "Trident" == F && (q = /\brv:([\d.]+)/.exec(a)) && (x && p.push("identifying as " + x + (w ? " " + w : "")), x = "IE", w = q[1]);
        if (K) {
            if (g(e, "global"))
                if (Q && (q = Q.lang.System, M = q.getProperty("os.arch"), y = y || q.getProperty("os.name") + " " + q.getProperty("os.version")), B) {
                    try {
                        w = e.require("ringo/engine").version.join("."), x = "RingoJS"
                    } catch (X) {
                        (q = e.system) && q.global.system == e.system && (x = "Narwhal", y || (y = q[0].os || null))
                    }
                    x || (x = "Rhino")
                } else "object" == typeof e.process &&
                    !e.process.browser && (q = e.process) && ("object" == typeof q.versions && ("string" == typeof q.versions.electron ? (p.push("Node " + q.versions.node), x = "Electron", w = q.versions.electron) : "string" == typeof q.versions.nw && (p.push("Chromium " + w, "Node " + q.versions.node), x = "NW.js", w = q.versions.nw)), x || (x = "Node.js", M = q.arch, y = q.platform, w = (w = /[\d.]+/.exec(q.version)) ? w[0] : null));
            else m(q = e.runtime) == z ? (x = "Adobe AIR", y = q.flash.system.Capabilities.os) : m(q = e.phantom) == D ? (x = "PhantomJS", w = (q = q.version || null) && q.major + "." + q.minor +
                "." + q.patch) : "number" == typeof U.documentMode && (q = /\bTrident\/(\d+)/i.exec(a)) ? (w = [w, U.documentMode], (q = +q[1] + 4) != w[1] && (p.push("IE " + w[1] + " mode"), F && (F[1] = ""), w[1] = q), w = "IE" == x ? String(w[1].toFixed(1)) : w[0]) : "number" == typeof U.documentMode && /^(?:Chrome|Firefox)\b/.test(x) && (p.push("masking as " + x + " " + w), x = "IE", w = "11.0", F = ["Trident"], y = "Windows");
            y = y && b(y)
        }
        w && (q = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(w) || /(?:alpha|beta)(?: ?\d)?/i.exec(a + ";" + (K && t.appMinorVersion)) || /\bMinefield\b/i.test(a) &&
            "a") && (J = /b/i.test(q) ? "beta" : "alpha", w = w.replace(RegExp(q + "\\+?$"), "") + ("beta" == J ? S : T) + (/\d+\+?/.exec(q) || ""));
        if ("Fennec" == x || "Firefox" == x && /\b(?:Android|Firefox OS)\b/.test(y)) x = "Firefox Mobile";
        else if ("Maxthon" == x && w) w = w.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(G)) "Xbox 360" == G && (y = null), "Xbox 360" == G && /\bIEMobile\b/.test(a) && p.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(x) && (!x || G || /Browser|Mobi/.test(x)) || "Windows CE" != y && !/Mobi/i.test(a))
            if ("IE" == x && K) try {
                null === e.external &&
                    p.unshift("platform preview")
            } catch (X) {
                p.unshift("embedded")
            } else(/\bBlackBerry\b/.test(G) || /\bBB10\b/.test(a)) && (q = (RegExp(G.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(a) || 0)[1] || w) ? (q = [q, /BB10/.test(a)], y = (q[1] ? (G = null, R = "BlackBerry") : "Device Software") + " " + q[0], w = null) : this != f && "Wii" != G && (K && I || /Opera/.test(x) && /\b(?:MSIE|Firefox)\b/i.test(a) || "Firefox" == x && /\bOS X (?:\d+\.){2,}/.test(y) || "IE" == x && (y && !/^Win/.test(y) && 5.5 < w || /\bWindows XP\b/.test(y) && 8 < w || 8 == w && !/\bTrident\b/.test(a))) && !v.test(q =
                n.call(f, a.replace(v, "") + ";")) && q.name && (q = "ing as " + q.name + ((q = q.version) ? " " + q : ""), v.test(x) ? (/\bIE\b/.test(q) && "Mac OS" == y && (y = null), q = "identify" + q) : (q = "mask" + q, x = L ? b(L.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(q) && (y = null), K || (w = null)), F = ["Presto"], p.push(q));
            else x += " Mobile";
        if (q = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(a) || 0)[1]) {
            q = [parseFloat(q.replace(/\.(\d)$/, ".0$1")), q];
            if ("Safari" == x && "+" == q[1].slice(-1)) x = "WebKit Nightly", J = "alpha", w = q[1].slice(0, -1);
            else if (w == q[1] || w == (q[2] =
                    (/\bSafari\/([\d.]+\+?)/i.exec(a) || 0)[1])) w = null;
            q[1] = (/\bChrome\/([\d.]+)/i.exec(a) || 0)[1];
            537.36 == q[0] && 537.36 == q[2] && 28 <= parseFloat(q[1]) && "WebKit" == F && (F = ["Blink"]);
            K && (u || q[1]) ? (F && (F[1] = "like Chrome"), q = q[1] || (q = q[0], 530 > q ? 1 : 532 > q ? 2 : 532.05 > q ? 3 : 533 > q ? 4 : 534.03 > q ? 5 : 534.07 > q ? 6 : 534.1 > q ? 7 : 534.13 > q ? 8 : 534.16 > q ? 9 : 534.24 > q ? 10 : 534.3 > q ? 11 : 535.01 > q ? 12 : 535.02 > q ? "13+" : 535.07 > q ? 15 : 535.11 > q ? 16 : 535.19 > q ? 17 : 536.05 > q ? 18 : 536.1 > q ? 19 : 537.01 > q ? 20 : 537.11 > q ? "21+" : 537.13 > q ? 23 : 537.18 > q ? 24 : 537.24 > q ? 25 : 537.36 > q ? 26 : "Blink" !=
                F ? "27" : "28")) : (F && (F[1] = "like Safari"), q = (q = q[0], 400 > q ? 1 : 500 > q ? 2 : 526 > q ? 3 : 533 > q ? 4 : 534 > q ? "4+" : 535 > q ? 5 : 537 > q ? 6 : 538 > q ? 7 : 601 > q ? 8 : "8"));
            F && (F[1] += " " + (q += "number" == typeof q ? ".x" : /[.+]/.test(q) ? "" : "+"));
            "Safari" == x && (!w || 45 < parseInt(w)) && (w = q)
        }
        "Opera" == x && (q = /\bzbov|zvav$/.exec(y)) ? (x += " ", p.unshift("desktop mode"), "zvav" == q ? (x += "Mini", w = null) : x += "Mobile", y = y.replace(RegExp(" *" + q + "$"), "")) : "Safari" == x && /\bChrome\b/.exec(F && F[1]) && (p.unshift("desktop mode"), x = "Chrome Mobile", w = null, /\bOS X\b/.test(y) ? (R =
            "Apple", y = "iOS 4.3+") : y = null);
        w && 0 == w.indexOf(q = /[\d.]+$/.exec(y)) && -1 < a.indexOf("/" + q + "-") && (y = String(y.replace(q, "")).replace(/^ +| +$/g, ""));
        F && !/\b(?:Avant|Nook)\b/.test(x) && (/Browser|Lunascape|Maxthon/.test(x) || "Safari" != x && /^iOS/.test(y) && /\bSafari\b/.test(F[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(x) && F[1]) && (q = F[F.length - 1]) && p.push(q);
        p.length && (p = ["(" + p.join("; ") + ")"]);
        R && G && 0 > G.indexOf(R) && p.push("on " + R);
        G && p.push((/^on /.test(p[p.length -
            1]) ? "" : "on ") + G);
        if (y) {
            var W = (q = / ([\d.+]+)$/.exec(y)) && "/" == y.charAt(y.length - q[0].length - 1);
            y = {
                architecture: 32,
                family: q && !W ? y.replace(q[0], "") : y,
                version: q ? q[1] : null,
                toString: function() {
                    var a = this.version;
                    return this.family + (a && !W ? " " + a : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }(q = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(M)) && !/\bi686\b/i.test(M) ? (y && (y.architecture = 64, y.family = y.family.replace(RegExp(" *" + q), "")), x && (/\bWOW64\b/i.test(a) || K && /\w(?:86|32)$/.test(t.cpuClass || t.platform) && !/\bWin64; x64\b/i.test(a)) &&
            p.unshift("32-bit")) : y && /^OS X/.test(y.family) && "Chrome" == x && 39 <= parseFloat(w) && (y.architecture = 64);
        a || (a = null);
        e = {};
        e.description = a;
        e.layout = F && F[0];
        e.manufacturer = R;
        e.name = x;
        e.prerelease = J;
        e.product = G;
        e.ua = a;
        e.version = x && w;
        e.os = y || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        e.parse = n;
        e.toString = function() {
            return this.description || ""
        };
        e.version && p.unshift(w);
        e.name && p.unshift(x);
        y && x && (y != String(y).split(" ")[0] || y != x.split(" ")[0] && !G) && p.push(G ? "(" + y + ")" : "on " +
            y);
        p.length && (e.description = p.join(" "));
        return e
    }
    var d = {
            "function": !0,
            object: !0
        },
        l = d[typeof window] && window || this,
        t = d[typeof exports] && exports;
    d = d[typeof module] && module && !module.nodeType && module;
    var e = t && d && "object" == typeof global && global;
    !e || e.global !== e && e.window !== e && e.self !== e || (l = e);
    var u = Math.pow(2, 53) - 1,
        v = /\bOpera/;
    e = Object.prototype;
    var z = e.hasOwnProperty,
        r = e.toString,
        B = n();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (l.platform = B, define(function() {
            return B
        })) : t &&
        d ? f(B, function(a, d) {
            t[d] = a
        }) : l.platform = B
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
        var f = window.document.head.querySelector('meta[name="' + b.name + '"]');
        f && f.parentNode.removeChild(f);
        window.document.head.appendChild(b)
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
        c = a.family.toLowerCase();
    a = parseFloat(a.version);
    return "ios" === c && 13 > a ? !0 : !1
}
$(document).ready(function() {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && (buildIOSFullscreenPanel(), buildIOSMeta())
});
jQuery(window).resize(function() {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && iosResize()
});
var s_iOffsetX, s_iOffsetY, s_bIsIphone = !1,
    s_bLandscape = !1;
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,
        4))
})(navigator.userAgent || navigator.vendor || window.opera);

function isTablet() {
    var a = navigator.userAgent.toLowerCase();
    return -1 !== a.indexOf("ipad") ? !0 : -1 < a.indexOf("android") && -1 === a.indexOf("mobile") ? !0 : !1
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
$(window).resize(function() {
    sizeHandler()
});

function trace(a) {
    console.log(a)
}

function getSize(a) {
    var c = a.toLowerCase(),
        b = window.document,
        f = b.documentElement;
    if (void 0 === window["inner" + a]) a = f["client" + a];
    else if (window["inner" + a] != f["client" + a]) {
        var m = b.createElement("body");
        m.id = "vpw-test-b";
        m.style.cssText = "overflow:scroll";
        var g = b.createElement("div");
        g.id = "vpw-test-d";
        g.style.cssText = "position:absolute;top:-1000px";
        g.innerHTML = "<style>@media(" + c + ":" + f["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + c + ":7px!important}}</style>";
        m.appendChild(g);
        f.insertBefore(m, b.head);
        a = 7 == g["offset" + a] ? f["client" + a] : window["inner" + a];
        f.removeChild(m)
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
        var c = getSize("Width");
        _checkOrientation(c, a);
        var b = Math.min(a / CANVAS_HEIGHT, c / CANVAS_WIDTH);
        s_bLandscape = c > a ? !0 : !1;
        var f = Math.round(CANVAS_WIDTH * b);
        b = Math.round(CANVAS_HEIGHT * b);
        if (b < a) {
            var m = a - b;
            b += m;
            f += CANVAS_WIDTH / CANVAS_HEIGHT * m
        } else f < c && (m = c - f, f += m, b += CANVAS_HEIGHT / CANVAS_WIDTH * m);
        m = a / 2 - b / 2;
        var g = c / 2 - f / 2,
            h = CANVAS_WIDTH / f;
        if (g * h < -EDGEBOARD_X || m * h < -EDGEBOARD_Y) b =
            Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), c / (CANVAS_WIDTH - 2 * EDGEBOARD_X)), f = Math.round(CANVAS_WIDTH * b), b = Math.round(CANVAS_HEIGHT * b), m = (a - b) / 2, g = (c - f) / 2, h = CANVAS_WIDTH / f;
        s_iOffsetX = -1 * g * h;
        s_iOffsetY = -1 * m * h;
        0 <= m && (s_iOffsetY = 0);
        0 <= g && (s_iOffsetX = 0);
        s_oGame && s_oGame.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oCardSelection && s_oCardSelection.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone ? (canvas = document.getElementById("canvas"),
            s_oStage.canvas.width = 2 * f, s_oStage.canvas.height = 2 * b, canvas.style.width = f + "px", canvas.style.height = b + "px", s_iScaleFactor = 2 * Math.min(f / CANVAS_WIDTH, b / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor) : s_bMobile || isChrome() ? ($("#canvas").css("width", f + "px"), $("#canvas").css("height", b + "px")) : (s_oStage.canvas.width = f, s_oStage.canvas.height = b, s_iScaleFactor = Math.min(f / CANVAS_WIDTH, b / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > m || (m = (a - b) / 2);
        $("#canvas").css("top", m + "px");
        $("#canvas").css("left", g + "px");
        fullscreenHandler()
    }
}

function _checkOrientation(a, c) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (a > c ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
        s_oMain.stopUpdate()))
}

function isSquaredRatio() {
    var a = CANVAS_WIDTH - 2 * s_iOffsetX,
        c = CANVAS_HEIGHT - 2 * s_iOffsetY;
    return (a > c ? a / c : c / a) < 4 / 3 ? !0 : !1
}

function smartResize(a, c, b) {
    null !== a.getBounds() && (c = inRectResize(a, CANVAS_WIDTH - 2 * s_iOffsetX - c, CANVAS_HEIGHT - 2 * s_iOffsetY - b), a.scaleX = a.scaleY = 1, 1 > c && (a.scaleX = a.scaleY = c))
}

function inRectResize(a, c, b) {
    if (null !== a.getBounds() && void 0 !== a.getBounds()) {
        var f = a.getBounds().width;
        c /= f;
        f = a.getBounds().height;
        b = Math.min(c, b / f);
        return a.scaleX = a.scaleY = b
    }
}

function createBitmap(a, c, b) {
    var f = new createjs.Bitmap(a),
        m = new createjs.Shape;
    c && b ? m.graphics.beginFill("#fff").drawRect(0, 0, c, b) : m.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    f.hitArea = m;
    return f
}

function createSprite(a, c, b, f, m, g) {
    a = null !== c ? new createjs.Sprite(a, c) : new createjs.Sprite(a);
    c = new createjs.Shape;
    c.graphics.beginFill("#000000").drawRect(-b, -f, m, g);
    a.hitArea = c;
    return a
}

function pad(a, c, b) {
    a += "";
    return a.length >= c ? a : Array(c - a.length + 1).join(b || "0") + a
}

function randomFloatBetween(a, c, b) {
    "undefined" === typeof b && (b = 2);
    return parseFloat(Math.min(a + Math.random() * (c - a), c).toFixed(b))
}

function rotateVector2D(a, c) {
    var b = c.getX() * Math.cos(a) + c.getY() * Math.sin(a),
        f = c.getX() * -Math.sin(a) + c.getY() * Math.cos(a);
    c.set(b, f)
}

function tweenVectorsOnX(a, c, b) {
    return a + b * (c - a)
}

function shuffle(a) {
    for (var c = a.length, b, f; 0 !== c;) f = Math.floor(Math.random() * c), --c, b = a[c], a[c] = a[f], a[f] = b;
    return a
}

function bubbleSort(a) {
    do {
        var c = !1;
        for (var b = 0; b < a.length - 1; b++) a[b] > a[b + 1] && (c = a[b], a[b] = a[b + 1], a[b + 1] = c, c = !0)
    } while (c)
}

function compare(a, c) {
    return a.index > c.index ? -1 : a.index < c.index ? 1 : 0
}

function easeLinear(a, c, b, f) {
    return b * a / f + c
}

function easeInQuad(a, c, b, f) {
    return b * (a /= f) * a + c
}

function easeInSine(a, c, b, f) {
    return -b * Math.cos(a / f * (Math.PI / 2)) + b + c
}

function easeInCubic(a, c, b, f) {
    return b * (a /= f) * a * a + c
}

function getTrajectoryPoint(a, c) {
    var b = new createjs.Point,
        f = (1 - a) * (1 - a),
        m = a * a;
    b.x = f * c.start.x + 2 * (1 - a) * a * c.traj.x + m * c.end.x;
    b.y = f * c.start.y + 2 * (1 - a) * a * c.traj.y + m * c.end.y;
    return b
}

function formatTime(a) {
    a /= 1E3;
    var c = Math.floor(a / 60);
    a = parseFloat(a - 60 * c).toFixed(1);
    var b = "";
    b = 10 > c ? b + ("0" + c + ":") : b + (c + ":");
    return 10 > a ? b + ("0" + a) : b + a
}

function formatValue(a) {
    return TEXT_CURRENCY + a.toFixed(2)
}

function degreesToRadians(a) {
    return a * Math.PI / 180
}

function checkRectCollision(a, c) {
    var b = getBounds(a, .9);
    var f = getBounds(c, .98);
    return calculateIntersection(b, f)
}

function calculateIntersection(a, c) {
    var b, f, m, g;
    var h = a.x + (b = a.width / 2);
    var k = a.y + (f = a.height / 2);
    var n = c.x + (m = c.width / 2);
    var d = c.y + (g = c.height / 2);
    h = Math.abs(h - n) - (b + m);
    k = Math.abs(k - d) - (f + g);
    return 0 > h && 0 > k ? (h = Math.min(Math.min(a.width, c.width), -h), k = Math.min(Math.min(a.height, c.height), -k), {
        x: Math.max(a.x, c.x),
        y: Math.max(a.y, c.y),
        width: h,
        height: k,
        rect1: a,
        rect2: c
    }) : null
}

function getBounds(a, c) {
    var b = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
    };
    if (a instanceof createjs.Container) {
        b.x2 = -Infinity;
        b.y2 = -Infinity;
        var f = a.children,
            m = f.length,
            g;
        for (g = 0; g < m; g++) {
            var h = getBounds(f[g], 1);
            h.x < b.x && (b.x = h.x);
            h.y < b.y && (b.y = h.y);
            h.x + h.width > b.x2 && (b.x2 = h.x + h.width);
            h.y + h.height > b.y2 && (b.y2 = h.y + h.height)
        }
        Infinity == b.x && (b.x = 0);
        Infinity == b.y && (b.y = 0);
        Infinity == b.x2 && (b.x2 = 0);
        Infinity == b.y2 && (b.y2 = 0);
        b.width = b.x2 - b.x;
        b.height = b.y2 - b.y;
        delete b.x2;
        delete b.y2
    } else {
        if (a instanceof createjs.Bitmap) {
            m =
                a.sourceRect || a.image;
            g = m.width * c;
            var k = m.height * c
        } else if (a instanceof createjs.Sprite)
            if (a.spriteSheet._frames && a.spriteSheet._frames[a.currentFrame] && a.spriteSheet._frames[a.currentFrame].image) {
                m = a.spriteSheet.getFrame(a.currentFrame);
                g = m.rect.width;
                k = m.rect.height;
                f = m.regX;
                var n = m.regY
            } else b.x = a.x || 0, b.y = a.y || 0;
        else b.x = a.x || 0, b.y = a.y || 0;
        f = f || 0;
        g = g || 0;
        n = n || 0;
        k = k || 0;
        b.regX = f;
        b.regY = n;
        m = a.localToGlobal(0 - f, 0 - n);
        h = a.localToGlobal(g - f, k - n);
        g = a.localToGlobal(g - f, 0 - n);
        f = a.localToGlobal(0 - f, k - n);
        b.x =
            Math.min(Math.min(Math.min(m.x, h.x), g.x), f.x);
        b.y = Math.min(Math.min(Math.min(m.y, h.y), g.y), f.y);
        b.width = Math.max(Math.max(Math.max(m.x, h.x), g.x), f.x) - b.x;
        b.height = Math.max(Math.max(Math.max(m.y, h.y), g.y), f.y) - b.y
    }
    return b
}

function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}

function shuffle(a) {
    for (var c = a.length, b, f; 0 < c;) f = Math.floor(Math.random() * c), c--, b = a[c], a[c] = a[f], a[f] = b;
    return a
}

function arrayUnique(a) {
    a = a.concat();
    for (var c = 0; c < a.length; ++c)
        for (var b = c + 1; b < a.length; ++b) a[c] === a[b] && a.splice(b--, 1);
    return a
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
            3 == a.nodeType && (a = a.parentNode);
            var c = document.createEvent("MouseEvents");
            c.initEvent("click", !0, !0);
            a.dispatchEvent(c)
        }
    }
};
(function() {
    function a(a) {
        var b = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        a = a || window.event;
        a.type in b ? document.body.className = b[a.type] : (document.body.className = this[c] ? "hidden" : "visible", "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var c = "hidden";
    c in document ? document.addEventListener("visibilitychange", a) : (c = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", a) : (c = "webkitHidden") in
        document ? document.addEventListener("webkitvisibilitychange", a) : (c = "msHidden") in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin" in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
})();

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}

function getParamValue(a) {
    for (var c = window.location.search.substring(1).split("&"), b = 0; b < c.length; b++) {
        var f = c[b].split("=");
        if (f[0] == a) return f[1]
    }
}

function playSound(a, c, b) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(), s_aSounds[a].volume(c), s_aSounds[a].loop(b), s_aSounds[a]) : null
}

function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || a.stop()
}

function setVolume(a, c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].volume(c)
}

function setMute(a, c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || a.mute(c)
}

function fullscreenHandler() {
    ENABLE_FULLSCREEN && screenfull.isEnabled && (s_bFullscreen = screenfull.isFullscreen, null !== s_oInterface && s_oInterface.resetFullscreenBut(), null !== s_oMenu && s_oMenu.resetFullscreenBut(), null !== s_oCardSelection && s_oCardSelection.resetFullscreenBut())
}
if (screenfull.isEnabled) screenfull.on("change", function() {
    s_bFullscreen = screenfull.isFullscreen;
    null !== s_oInterface && s_oInterface.resetFullscreenBut();
    null !== s_oMenu && s_oMenu.resetFullscreenBut();
    null !== s_oCardSelection && s_oCardSelection.resetFullscreenBut()
});
! function() {
    function a(c) {
        var g = c;
        if (f[g]) g = f[g];
        else {
            for (var h = g, k, n = [], d = 0; h;) {
                if (null !== (k = b.text.exec(h))) n.push(k[0]);
                else if (null !== (k = b.modulo.exec(h))) n.push("%");
                else if (null !== (k = b.placeholder.exec(h))) {
                    if (k[2]) {
                        d |= 1;
                        var l = [],
                            t = k[2],
                            e;
                        if (null !== (e = b.key.exec(t)))
                            for (l.push(e[1]);
                                "" !== (t = t.substring(e[0].length));)
                                if (null !== (e = b.key_access.exec(t))) l.push(e[1]);
                                else if (null !== (e = b.index_access.exec(t))) l.push(e[1]);
                        else throw new SyntaxError("[sprintf] failed to parse named argument key");
                        else throw new SyntaxError("[sprintf] failed to parse named argument key");
                        k[2] = l
                    } else d |= 2;
                    if (3 === d) throw Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
                    n.push({
                        placeholder: k[0],
                        param_no: k[1],
                        keys: k[2],
                        sign: k[3],
                        pad_char: k[4],
                        align: k[5],
                        width: k[6],
                        precision: k[7],
                        type: k[8]
                    })
                } else throw new SyntaxError("[sprintf] unexpected placeholder");
                h = h.substring(k[0].length)
            }
            g = f[g] = n
        }
        h = arguments;
        k = 1;
        n = g.length;
        l = "";
        var m, v;
        for (t = 0; t < n; t++)
            if ("string" === typeof g[t]) l += g[t];
            else if ("object" === typeof g[t]) {
            e = g[t];
            if (e.keys)
                for (d = h[k], m = 0; m < e.keys.length; m++) {
                    if (void 0 == d) throw Error(a('[sprintf] Cannot access property "%s" of undefined value "%s"', e.keys[m], e.keys[m - 1]));
                    d = d[e.keys[m]]
                } else d = e.param_no ? h[e.param_no] : h[k++];
            b.not_type.test(e.type) && b.not_primitive.test(e.type) && d instanceof Function && (d = d());
            if (b.numeric_arg.test(e.type) && "number" !== typeof d && isNaN(d)) throw new TypeError(a("[sprintf] expecting number but found %T", d));
            b.number.test(e.type) && (v = 0 <= d);
            switch (e.type) {
                case "b":
                    d = parseInt(d, 10).toString(2);
                    break;
                case "c":
                    d = String.fromCharCode(parseInt(d, 10));
                    break;
                case "d":
                case "i":
                    d = parseInt(d, 10);
                    break;
                case "j":
                    d = JSON.stringify(d, null, e.width ? parseInt(e.width) : 0);
                    break;
                case "e":
                    d = e.precision ? parseFloat(d).toExponential(e.precision) : parseFloat(d).toExponential();
                    break;
                case "f":
                    d = e.precision ? parseFloat(d).toFixed(e.precision) : parseFloat(d);
                    break;
                case "g":
                    d = e.precision ? String(Number(d.toPrecision(e.precision))) : parseFloat(d);
                    break;
                case "o":
                    d = (parseInt(d,
                        10) >>> 0).toString(8);
                    break;
                case "s":
                    d = String(d);
                    d = e.precision ? d.substring(0, e.precision) : d;
                    break;
                case "t":
                    d = String(!!d);
                    d = e.precision ? d.substring(0, e.precision) : d;
                    break;
                case "T":
                    d = Object.prototype.toString.call(d).slice(8, -1).toLowerCase();
                    d = e.precision ? d.substring(0, e.precision) : d;
                    break;
                case "u":
                    d = parseInt(d, 10) >>> 0;
                    break;
                case "v":
                    d = d.valueOf();
                    d = e.precision ? d.substring(0, e.precision) : d;
                    break;
                case "x":
                    d = (parseInt(d, 10) >>> 0).toString(16);
                    break;
                case "X":
                    d = (parseInt(d, 10) >>> 0).toString(16).toUpperCase()
            }
            if (b.json.test(e.type)) l +=
                d;
            else {
                if (!b.number.test(e.type) || v && !e.sign) var z = "";
                else z = v ? "+" : "-", d = d.toString().replace(b.sign, "");
                m = e.pad_char ? "0" === e.pad_char ? "0" : e.pad_char.charAt(1) : " ";
                var r = e.width - (z + d).length;
                r = e.width ? 0 < r ? m.repeat(r) : "" : "";
                l += e.align ? z + d + r : "0" === m ? z + r + d : r + z + d
            }
        }
        return l
    }

    function c(b, c) {
        return a.apply(null, [b].concat(c || []))
    }
    var b = {
            not_string: /[^s]/,
            not_bool: /[^t]/,
            not_type: /[^T]/,
            not_primitive: /[^v]/,
            number: /[diefg]/,
            numeric_arg: /[bcdiefguxX]/,
            json: /[j]/,
            not_json: /[^j]/,
            text: /^[^\x25]+/,
            modulo: /^\x25{2}/,
            placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
            key: /^([a-z_][a-z_\d]*)/i,
            key_access: /^\.([a-z_][a-z_\d]*)/i,
            index_access: /^\[(\d+)\]/,
            sign: /^[+-]/
        },
        f = Object.create(null);
    "undefined" !== typeof exports && (exports.sprintf = a, exports.vsprintf = c);
    "undefined" !== typeof window && (window.sprintf = a, window.vsprintf = c, "function" === typeof define && define.amd && define(function() {
        return {
            sprintf: a,
            vsprintf: c
        }
    }))
}();

function CSpriteLibrary() {
    var a = {},
        c, b, f, m, g, h;
    this.init = function(a, n, d) {
        c = {};
        f = b = 0;
        m = a;
        g = n;
        h = d
    };
    this.addSprite = function(f, n) {
        if (a.hasOwnProperty(f)) return !1;
        var d = new Image;
        a[f] = c[f] = {
            szPath: n,
            oSprite: d,
            bLoaded: !1
        };
        b++;
        return !0
    };
    this.getSprite = function(b) {
        return a.hasOwnProperty(b) ? a[b].oSprite : null
    };
    this._onSpritesLoaded = function() {
        b = 0;
        g.call(h)
    };
    this._onSpriteLoaded = function() {
        m.call(h);
        ++f === b && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var a in c) c[a].oSprite.oSpriteLibrary = this,
            c[a].oSprite.szKey = a, c[a].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey)
            }, c[a].oSprite.onerror = function(a) {
                var d = a.currentTarget;
                setTimeout(function() {
                    c[d.szKey].oSprite.src = c[d.szKey].szPath
                }, 500)
            }, c[a].oSprite.src = c[a].szPath
    };
    this.setLoaded = function(b) {
        a[b].bLoaded = !0
    };
    this.isLoaded = function(b) {
        return a[b].bLoaded
    };
    this.getNumSprites = function() {
        return b
    }
}
var CANVAS_WIDTH = 1360,
    CANVAS_HEIGHT = 1360,
    EDGEBOARD_X = 360,
    EDGEBOARD_Y = 360,
    FPS = 30,
    FPS_TIME = 1E3 / FPS,
    DISABLE_SOUND_MOBILE = !1,
    PRIMARY_FONT = "sourcesanspro-black",
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    ON_BUT_EXIT = 6,
    ON_BUT_RECHARGE = 7,
    ON_BUT_YES = 8,
    ON_BUT_NO = 9,
    ON_BUT_START = 10,
    ON_CARD_LINE_COMPLETED = 0,
    ON_CARD_NUM_CLICK = 1,
    ON_NUM_CLICK = 2,
    NUM_DIFFERENT_BALLS = 5,
    ANIMATION_SPEED, WIN_OCCURRENCE = [],
    BANK, START_PLAYER_MONEY,
    CARD_ROWS = 5,
    CARD_COLS = 5,
    STAR_COORD = {
        row: 2,
        col: 2
    },
    STAR_VALUE = -1,
    LABEL_EMPTY = "empty",
    LABEL_STAR = "star_empty",
    COIN_BETS, MIN_CARDS = 1,
    MAX_CARDS = 4,
    NUM_EXTRACTIONS = [35, 45, 55],
    NUM_NUMBERS = 75,
    PAYTABLE_INFO, BUTTON_Y_OFFSET = 3,
    AUTOFILL_ENABLED, TIME_EXTRACTION, TIME_EXTRACTION_MANUAL, CARD_POSITION = [];
CARD_POSITION.num_1 = [{
    x: 0,
    y: 0,
    scale: 1
}];
CARD_POSITION.num_2 = [{
    x: -320,
    y: 0,
    scale: 1
}, {
    x: 320,
    y: 0,
    scale: 1
}];
CARD_POSITION.num_3 = [{
    x: -320,
    y: -380,
    scale: 1
}, {
    x: 320,
    y: -380,
    scale: 1
}, {
    x: 0,
    y: 380,
    scale: 1
}];
CARD_POSITION.num_4 = [{
    x: -320,
    y: -380,
    scale: 1
}, {
    x: 320,
    y: -380,
    scale: 1
}, {
    x: -320,
    y: 380,
    scale: 1
}, {
    x: 320,
    y: 380,
    scale: 1
}];
var BALL_COLORS = ["#fdb400", "#a3e21a", "#1ab9e2", "#be1ae0", "#ff3a3a"],
    SOUNDTRACK_VOLUME_IN_GAME = .1,
    ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, SHOW_CREDITS, TEXT_CURRENCY = "$",
    TEXT_PLAY = "PLAY",
    TEXT_START = "START",
    TEXT_SELECT_CARD = "SELECT CARDS",
    TEXT_TOT_BET = "TOT BET",
    TEXT_PLUS = "+",
    TEXT_MIN = "-",
    TEXT_SELECT_NUM_CARDS = "NUM CARDS",
    TEXT_SELECT_NUM_BALLS = "NUMBER TO EXTRACT",
    TEXT_GAMEOVER = "YOU RUN OUT OF MONEY!!!",
    TEXT_EXIT = "EXIT",
    TEXT_PAYTABLE = "PAYTABLE",
    TEXT_MONEY = "MONEY",
    TEXT_COIN = "COIN",
    TEXT_WIN = "WIN",
    TEXT_ARE_SURE =
    "ARE YOU SURE?",
    TEXT_YES = "YES",
    TEXT_NO = "NO",
    TEXT_CREDITS_DEVELOPED = "DEVELOPED BY",
    TEXT_PRELOADER_CONTINUE = "START",
    TEXT_RECHARGE = "RECHARGE",
    TEXT_WRONG_NUMBER = "THE NUMBER %s IS NOT BEEN EXTRACTED",
    TEXT_PAYTABLE_PRIZES = "ANY DIAGONAL;ANY COLUMN;ANY ROW;ANY 2 ROWS;ANY 3 ROWS;ANY 4 ROWS;BINGO!".split(";"),
    TEXT_CONGRATULATIONS = "Congratulations!",
    TEXT_SHARE_1 = "You collected <strong>",
    TEXT_SHARE_2 = " points</strong>!<br><br>Share your score with your friends!",
    TEXT_SHARE_3 = "My score is ",
    TEXT_SHARE_4 = " points! Can you do better?";

function CPreloader() {
    var a, c, b, f, m, g, h, k, n, d;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.addSprite("but_start", "./sprites/but_start.png");
        s_oSpriteLibrary.loadSprites();
        d = new createjs.Container;
        s_oStage.addChild(d)
    };
    this.unload = function() {
        d.removeAllChildren();
        n.unload()
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    };
    this.attachSprites = function() {
        var l = new createjs.Shape;
        l.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        d.addChild(l);
        l = s_oSpriteLibrary.getSprite("200x200");
        h = createBitmap(l);
        h.regX = .5 * l.width;
        h.regY = .5 * l.height;
        h.x = CANVAS_WIDTH / 2;
        h.y = CANVAS_HEIGHT / 2 - 180;
        d.addChild(h);
        k = new createjs.Shape;
        k.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(h.x - 100, h.y - 100, 200, 200, 10);
        d.addChild(k);
        h.mask = k;
        l = s_oSpriteLibrary.getSprite("progress_bar");
        f = createBitmap(l);
        f.x = CANVAS_WIDTH / 2 - l.width / 2;
        f.y = CANVAS_HEIGHT / 2 + 50;
        d.addChild(f);
        a = l.width;
        c = l.height;
        m = new createjs.Shape;
        m.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(f.x, f.y, 1, c);
        d.addChild(m);
        f.mask = m;
        b = new createjs.Text("", "30px " + PRIMARY_FONT, "#fff");
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT / 2 + 100;
        b.textBaseline = "alphabetic";
        b.textAlign = "center";
        d.addChild(b);
        l = s_oSpriteLibrary.getSprite("but_start");
        n = new CTextButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT /
            2, l, TEXT_PRELOADER_CONTINUE, "Arial", "#000", 40, 0, d);
        n.addEventListener(ON_MOUSE_UP, this._onButStartRelease, this);
        n.setVisible(!1);
        g = new createjs.Shape;
        g.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        d.addChild(g);
        createjs.Tween.get(g).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(g);
            d.removeChild(g)
        })
    };
    this._onButStartRelease = function() {
        s_oMain._onRemovePreloader()
    };
    this.refreshLoader = function(d) {
        b.text = d + "%";
        100 === d && (s_oMain._onRemovePreloader(), b.visible = !1,
            f.visible = !1);
        m.graphics.clear();
        d = Math.floor(d * a / 100);
        m.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(f.x, f.y, d, c)
    };
    this._init()
}

function CMain(a) {
    var c, b = 0,
        f = 0,
        m = STATE_LOADING,
        g, h;
    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && (s_oStage.enableMouseOver(20), $("body").on("contextmenu", "#canvas", function(a) {
            return !1
        }));
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        g = new CPreloader
    };
    this.preloaderReady = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        this._loadImages();
        c = !0
    };
    this.soundLoaded = function() {
        b++;
        g.refreshLoader(Math.floor(b / f * 100))
    };
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "click",
            loop: !1,
            volume: 1,
            ingamename: "click"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "game_over",
            loop: !1,
            volume: 1,
            ingamename: "game_over"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "launch_ball",
            loop: !1,
            volume: 1,
            ingamename: "launch_ball"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "win_row",
            loop: !1,
            volume: 1,
            ingamename: "win_row"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "win",
            loop: !1,
            volume: 1,
            ingamename: "win"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack"
        });
        for (var a = 1; a <= NUM_NUMBERS; a++) s_aSoundsInfo.push({
            path: "./sounds/numbers/",
            filename: a,
            loop: !1,
            volume: 1,
            ingamename: a
        });
        f += s_aSoundsInfo.length;
        s_aSounds = [];
        for (a = 0; a < s_aSoundsInfo.length; a++) this.tryToLoadSound(s_aSoundsInfo[a], !1)
    };
    this.tryToLoadSound = function(a, d) {
        setTimeout(function() {
            s_aSounds[a.ingamename] = new Howl({
                src: [a.path + a.filename + ".mp3"],
                autoplay: !1,
                preload: !0,
                loop: a.loop,
                volume: a.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function(a, d) {
                    for (var b = 0; b < s_aSoundsInfo.length; b++)
                        if (a === s_aSounds[s_aSoundsInfo[b].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[b], !0);
                            break
                        }
                },
                onplayerror: function(a) {
                    for (var b =
                            0; b < s_aSoundsInfo.length; b++)
                        if (a === s_aSounds[s_aSoundsInfo[b].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[b].ingamename].once("unlock", function() {
                                s_aSounds[s_aSoundsInfo[b].ingamename].play();
                                "soundtrack" === s_aSoundsInfo[b].ingamename && null !== s_oGame && setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME)
                            });
                            break
                        }
                }
            })
        }, d ? 200 : 0)
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box",
            "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("bg_select_card", "./sprites/bg_select_card.jpg");
        s_oSpriteLibrary.addSprite("but_settings", "./sprites/but_settings.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_paytable", "./sprites/but_paytable.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_plus", "./sprites/but_plus.png");
        s_oSpriteLibrary.addSprite("but_generic", "./sprites/but_generic.png");
        s_oSpriteLibrary.addSprite("plus_display", "./sprites/plus_display.png");
        s_oSpriteLibrary.addSprite("but_buy_cards", "./sprites/but_buy_cards.png");
        s_oSpriteLibrary.addSprite("but_buy_cards_disabled", "./sprites/but_buy_cards_disabled.png");
        s_oSpriteLibrary.addSprite("num_cards_panel", "./sprites/num_cards_panel.png");
        s_oSpriteLibrary.addSprite("num_balls_panel", "./sprites/num_balls_panel.png");
        s_oSpriteLibrary.addSprite("tube", "./sprites/tube.png");
        s_oSpriteLibrary.addSprite("ball", "./sprites/ball.png");
        s_oSpriteLibrary.addSprite("card_cell", "./sprites/card_cell.png");
        s_oSpriteLibrary.addSprite("but_gui", "./sprites/but_gui.png");
        s_oSpriteLibrary.addSprite("but_ball", "./sprites/but_ball.png");
        s_oSpriteLibrary.addSprite("board_cell", "./sprites/board_cell.png");
        s_oSpriteLibrary.addSprite("number_extract_bg", "./sprites/number_extract_bg.png");
        s_oSpriteLibrary.addSprite("ball_preview", "./sprites/ball_preview.png");
        s_oSpriteLibrary.addSprite("card_highlight", "./sprites/card_highlight.png");
        s_oSpriteLibrary.addSprite("display_small", "./sprites/display_small.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("logo_credits", "./sprites/logo_credits.png");
        s_oSpriteLibrary.addSprite("card_bg", "./sprites/card_bg.png");
        s_oSpriteLibrary.addSprite("board_bg", "./sprites/board_bg.png");
        s_oSpriteLibrary.addSprite("board_bg_horiz", "./sprites/board_bg_horiz.png");
        s_oSpriteLibrary.addSprite("bg_credits",
            "./sprites/bg_credits.png");
        f += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        b++;
        g.refreshLoader(Math.floor(b / f * 100))
    };
    this._onAllImagesLoaded = function() {};
    this._onRemovePreloader = function() {
        g.unload();
        playSound("soundtrack", 1, !0);
        this.gotoMenu()
    };
    this.gotoMenu = function() {
        new CMenu;
        m = STATE_MENU
    };
    this.gotoGame = function() {
        h = new CGame(k);
        m = STATE_GAME;
        $(s_oMain).trigger("game_start")
    };
    this.gotoHelp = function() {
        new CHelp;
        m = STATE_HELP
    };
    this.stopUpdate = function() {
        c = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || Howler.mute(!0);
        console.trace("stopUpdate")
    };
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        c = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && s_bAudioActive && Howler.mute(!1);
        console.log("startUpdate")
    };
    this._update = function(a) {
        if (!1 !== c) {
            var b = (new Date).getTime();
            s_iTimeElaps = b - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = b;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            m === STATE_GAME && h.update();
            s_oStage.update(a)
        }
    };
    s_oMain = this;
    var k = a;
    ENABLE_CHECK_ORIENTATION = !1;
    SHOW_CREDITS = a.show_credits;
    ENABLE_FULLSCREEN = k.fullscreen;
    s_bAudioActive = a.audio_enable_on_startup;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack, s_oCanvas, s_bFullscreen = !1;

function CTextButton(a, c, b, f, m, g, h, k, n) {
    var d, l, t, e, u, v, z, r, B, D, C;
    this._init = function(a, b, c, f, w, m, g, k) {
        d = !1;
        l = 1;
        t = [];
        e = [];
        C = createBitmap(c);
        r = new createjs.Container;
        r.x = a;
        r.y = b;
        r.regX = c.width / 2;
        r.regY = c.height / 2;
        s_bMobile || (r.cursor = "pointer");
        r.addChild(C, D);
        n.addChild(r);
        B = new CTLText(r, 12, 7, c.width - 20, c.height - 10, g, "center", "#000", w, 1, k, 0, f, !0, !0, !1, !1);
        D = new CTLText(r, 10, 5, c.width - 20, c.height - 10, g, "center", m, w, 1, k, 0, f, !0, !0, !1, !1);
        this._initListener()
    };
    this.unload = function() {
        r.off("mousedown",
            u);
        r.off("pressup", v);
        n.removeChild(r)
    };
    this.setVisible = function(a) {
        r.visible = a
    };
    this.setAlign = function(a) {
        D.textAlign = a;
        B.textAlign = a
    };
    this.setTextX = function(a) {
        D.x = a;
        B.x = a
    };
    this.setScale = function(a) {
        l = r.scaleX = r.scaleY = a
    };
    this.enable = function() {
        d = !1;
        r.cursor = "pointer"
    };
    this.disable = function() {
        d = !0;
        r.cursor = "default"
    };
    this._initListener = function() {
        u = r.on("mousedown", this.buttonDown);
        v = r.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, d) {
        t[a] = b;
        e[a] = d
    };
    this.addEventListenerWithParams =
        function(a, b, d, c) {
            t[a] = b;
            e[a] = d;
            z = c
        };
    this.buttonRelease = function() {
        d || (playSound("click", 1, !1), r.scaleX = l, r.scaleY = l, t[ON_MOUSE_UP] && t[ON_MOUSE_UP].call(e[ON_MOUSE_UP], z))
    };
    this.buttonDown = function() {
        d || (r.scaleX = .9 * l, r.scaleY = .9 * l, t[ON_MOUSE_DOWN] && t[ON_MOUSE_DOWN].call(e[ON_MOUSE_DOWN]))
    };
    this.setPosition = function(a, b) {
        r.x = a;
        r.y = b
    };
    this.tweenPosition = function(a, b, d, c, e, f, l) {
        createjs.Tween.get(r).wait(c).to({
            x: a,
            y: b
        }, d, e).call(function() {
            void 0 !== f && f.call(l)
        })
    };
    this.changeText = function(a) {
        D.refreshText(a);
        B.refreshText(a)
    };
    this.setX = function(a) {
        r.x = a
    };
    this.setY = function(a) {
        r.y = a
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
    this.getSprite = function() {
        return r
    };
    this.getScale = function() {
        return r.scaleX
    };
    this._init(a, c, b, f, m, g, h, k)
}

function CTextSpritesheetBut(a, c, b, f, m, g, h, k, n) {
    var d = 1,
        l, t = !1,
        e, u, v, z;
    this._init = function(a, b, d, c, f, n, p, g, k) {
        l = !1;
        e = [];
        u = [];
        z = createBitmap(d);
        v = new createjs.Container;
        v.x = a;
        v.y = b;
        v.regX = d.width / 2;
        v.regY = d.height / 2;
        v.cursor = "pointer";
        g || (a = new createjs.SpriteSheet({
            images: [d],
            frames: {
                width: d.width / 2,
                height: d.height,
                regX: d.width / 2 / 2,
                regY: d.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        }), z = createSprite(a, "state_false", d.width / 2 / 2, d.height / 2, d.width / 2, d.height), v.regX = 0, v.regY = 0);
        v.addChild(z);
        a = d.width / 2 - 20;
        d = d.height - 20;
        new CTLText(v, -(a / 2) + 2, -(d / 2) + 2, a, d, p, "center", "#000", f, 1, 4, 0, c, !0, !0, !1, !1);
        new CTLText(v, -(a / 2), -(d / 2), a, d, p, "center", n, f, 1, 4, 0, c, !0, !0, !1, !1);
        k.addChild(v);
        this._initListener()
    };
    this.unload = function() {
        v.removeAllEventListeners();
        n.removeChild(v)
    };
    this.setVisible = function(a) {
        v.visible = a
    };
    this._initListener = function() {
        v.on("mousedown", this.buttonDown);
        v.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, d, b) {
        e[a] = d;
        u[a] = b
    };
    this.buttonRelease = function() {
        l ||
            t || (playSound("click", 1, !1), v.scaleX = 1 * d, v.scaleY = 1 * d, e[ON_MOUSE_UP] && e[ON_MOUSE_UP].call(u[ON_MOUSE_UP]))
    };
    this.buttonDown = function() {
        l || t || (v.scaleX = .9 * d, v.scaleY = .9 * d, e[ON_MOUSE_DOWN] && e[ON_MOUSE_DOWN].call(u[ON_MOUSE_DOWN]))
    };
    this.enable = function() {
        l = !1;
        v.cursor = "pointer";
        k || z.gotoAndStop("state_true")
    };
    this.disable = function() {
        l = !0;
        v.cursor = "default";
        k || z.gotoAndStop("state_false")
    };
    this.toggle = function() {
        l = !l;
        k || (l ? z.gotoAndStop("state_false") : z.gotoAndStop("state_true"))
    };
    this.setTextPosition =
        function(a, d) {};
    this.setText = function(a) {};
    this.setPosition = function(a, d) {
        v.x = a;
        v.y = d
    };
    this.setX = function(a) {
        v.x = a
    };
    this.setY = function(a) {
        v.y = a
    };
    this.getButtonImage = function() {
        return v
    };
    this.getX = function() {
        return v.x
    };
    this.getY = function() {
        return v.y
    };
    this.block = function(a) {
        t = a
    };
    this.setScale = function(a) {
        d = a;
        v.scaleX = a;
        v.scaleY = a
    };
    this.setScaleX = function(a) {
        z.scaleX = a
    };
    this._init(a, c, b, f, m, g, h, k, n);
    return this
}

function CToggle(a, c, b, f, m) {
    var g, h, k, n, d, l;
    this._init = function(a, d, b, c) {
        h = [];
        k = [];
        var e = new createjs.SpriteSheet({
            images: [b],
            frames: {
                width: b.width / 2,
                height: b.height,
                regX: b.width / 2 / 2,
                regY: b.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        g = c;
        l = createSprite(e, "state_" + g, b.width / 2 / 2, b.height / 2, b.width / 2, b.height);
        l.x = a;
        l.y = d;
        l.stop();
        l.cursor = "pointer";
        m.addChild(l);
        this._initListener()
    };
    this.unload = function() {
        l.off("mousedown", n);
        l.off("pressup", d);
        m.removeChild(l)
    };
    this._initListener = function() {
        n =
            l.on("mousedown", this.buttonDown);
        d = l.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, d) {
        h[a] = b;
        k[a] = d
    };
    this.setActive = function(a) {
        g = a;
        l.gotoAndStop("state_" + g)
    };
    this.buttonRelease = function() {
        l.scaleX = 1;
        l.scaleY = 1;
        playSound("click", 1, !1);
        g = !g;
        l.gotoAndStop("state_" + g);
        h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(k[ON_MOUSE_UP], g)
    };
    this.buttonDown = function() {
        l.scaleX = .9;
        l.scaleY = .9;
        h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN])
    };
    this.setPosition = function(a, b) {
        l.x = a;
        l.y = b
    };
    this.setMask =
        function(a) {
            l.mask = a
        };
    this.getButtonImage = function() {
        return l
    };
    this._init(a, c, b, f)
}

function CGfxButton(a, c, b, f) {
    var m, g, h, k, n, d;
    this._init = function(a, b, c, f) {
        m = !1;
        g = [];
        h = [];
        d = createBitmap(c);
        d.x = a;
        d.y = b;
        d.regX = c.width / 2;
        d.regY = c.height / 2;
        d.cursor = "pointer";
        f.addChild(d);
        this._initListener()
    };
    this.unload = function() {
        d.off("mousedown", k);
        d.off("pressup", n);
        f.removeChild(d)
    };
    this.setVisible = function(a) {
        d.visible = a
    };
    this._initListener = function() {
        k = d.on("mousedown", this.buttonDown);
        n = d.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, d) {
        g[a] = b;
        h[a] = d
    };
    this.buttonRelease =
        function() {
            m || (playSound("click", 1, !1), d.scaleX = 1, d.scaleY = 1, g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(h[ON_MOUSE_UP]))
        };
    this.buttonDown = function() {
        m || (d.scaleX = .9, d.scaleY = .9, g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN]))
    };
    this.enable = function() {
        m = !1;
        d.cursor = "pointer"
    };
    this.disable = function() {
        m = !0;
        d.cursor = "default"
    };
    this.setPosition = function(a, b) {
        d.x = a;
        d.y = b
    };
    this.setX = function(a) {
        d.x = a
    };
    this.setY = function(a) {
        d.y = a
    };
    this.setMask = function(a) {
        d.mask = a
    };
    this.getButtonImage = function() {
        return d
    };
    this.getX = function() {
        return d.x
    };
    this.getY = function() {
        return d.y
    };
    this._init(a, c, b, f);
    return this
}

function CToggleText(a, c, b, f, m, g, h, k, n, d, l) {
    var t, e, u, v, z, r, B, D, C, A;
    this._init = function(a, b, d, c, f, l, n, g, k, m) {
        v = [];
        z = [];
        t = a;
        e = f;
        u = l;
        A = new createjs.Container;
        A.x = b;
        A.y = d;
        A.regX = e / 2;
        A.regY = u / 2;
        H.addChild(A);
        a = new createjs.SpriteSheet({
            images: [c],
            frames: {
                width: e,
                height: u
            },
            animations: {
                on: [0],
                off: [1]
            }
        });
        D = t ? createSprite(a, "on", 0, 0, e, u) : createSprite(a, "off", 0, 0, e, u);
        D.stop();
        D.cursor = "pointer";
        A.addChild(D);
        C = new createjs.Text(n, m + "px " + g, k);
        C.textAlign = "center";
        C.shadow = new createjs.Shadow("#000", 2, 2, 2);
        C.textBaseline = "middle";
        C.lineHeight = 24;
        C.x = e / 2 - 1;
        C.y = u / 2 + 2;
        A.addChild(C);
        this._initListener()
    };
    this.unload = function() {
        A.off("mousedown", r);
        A.off("pressup", B);
        H.removeChild(D)
    };
    this.activate = function(a) {
        (t = a) ? D.gotoAndStop("on"): D.gotoAndStop("off")
    };
    this.setPosition = function(a, b) {
        A.x = a;
        A.y = b
    };
    this.setScale = function(a) {
        A.scaleX = A.scaleY = a
    };
    this._initListener = function() {
        r = A.on("mousedown", this.buttonDown);
        B = A.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, d) {
        v[a] = b;
        z[a] = d
    };
    this.buttonRelease =
        function() {
            playSound("click", 1, !1);
            (t = !t) ? D.gotoAndStop("on"): D.gotoAndStop("off");
            v[ON_MOUSE_UP] && v[ON_MOUSE_UP].call(z[ON_MOUSE_UP], {
                active: t
            })
        };
    this.buttonDown = function() {
        v[ON_MOUSE_DOWN] && v[ON_MOUSE_DOWN].call(z[ON_MOUSE_DOWN])
    };
    this.getContainer = function() {
        return A
    };
    var H = l;
    this._init(a, c, b, f, m, g, h, k, n, d)
}

function CMenu() {
    var a, c, b, f, m, g, h, k, n, d, l, t, e, u, v = null,
        z = null;
    this._init = function() {
        n = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(n);
        var r = s_oSpriteLibrary.getSprite("but_play");
        h = CANVAS_WIDTH / 2;
        k = CANVAS_HEIGHT - 150;
        d = new CGfxButton(h, k, r, s_oStage);
        d.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) r = s_oSpriteLibrary.getSprite("audio_icon"), m = CANVAS_WIDTH - r.height / 2 - 10, g = r.height / 2 + 10, t = new CToggle(m, g, r, s_bAudioActive,
            s_oStage), t.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this), setVolume("soundtrack", 1);
        SHOW_CREDITS ? (r = s_oSpriteLibrary.getSprite("but_paytable"), a = 10 + r.width / 2, c = r.height / 2 + 10, e = new CGfxButton(a, c, r, s_oStage), e.addEventListener(ON_MOUSE_UP, this._onCredits, this), b = a + r.width + 10, f = c) : (r = s_oSpriteLibrary.getSprite("but_fullscreen"), b = 10 + r.width / 4, f = r.height / 2 + 10);
        r = window.document;
        var B = r.documentElement;
        v = B.requestFullscreen || B.mozRequestFullScreen || B.webkitRequestFullScreen || B.msRequestFullscreen;
        z = r.exitFullscreen || r.mozCancelFullScreen || r.webkitExitFullscreen || r.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (v = !1);
        v && screenfull.isEnabled && (r = s_oSpriteLibrary.getSprite("but_fullscreen"), u = new CToggle(b, f, r, s_bFullscreen, s_oStage), u.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        l = new createjs.Shape;
        l.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(l);
        createjs.Tween.get(l).to({
            alpha: 0
        }, 1E3).call(function() {
            l.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX,
            s_iOffsetY)
    };
    this.unload = function() {
        d.unload();
        d = null;
        l.visible = !1;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) t.unload(), t = null;
        v && screenfull.isEnabled && u.unload();
        SHOW_CREDITS && e.unload();
        s_oStage.removeChild(n);
        s_oMenu = n = null
    };
    this.refreshButtonPos = function(l, n) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || t.setPosition(m - l, n + g);
        v && screenfull.isEnabled && u.setPosition(b + l, f + n);
        SHOW_CREDITS && e.setPosition(a + l, c + n);
        d.setPosition(h, k - n)
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onButPlayRelease = function() {
        this.unload();
        $(s_oMain).trigger("start_session");
        s_oMain.gotoGame()
    };
    this.resetFullscreenBut = function() {
        v && screenfull.isEnabled && u.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? z.call(window.document) : v.call(window.document.documentElement);
        sizeHandler()
    };
    this._onCredits = function() {
        new CCreditsPanel
    };
    this.onExitCredits = function() {};
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CGame(a) {
    var c, b, f, m, g, h, k, n, d, l, t, e, u, v, z, r, B = null,
        D, C, A, H, p, E, w, N, O, P;
    this._init = function() {
        c = !1;
        b = !0;
        f = BANK;
        m = START_PLAYER_MONEY;
        n = d = 0;
        var a = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(a);
        p = new createjs.Container;
        p.x = 60;
        p.y = 160;
        s_oStage.addChild(p);
        E = new createjs.Container;
        E.x = CANVAS_WIDTH - 200;
        E.y = CANVAS_HEIGHT / 2;
        s_oStage.addChild(E);
        w = new createjs.Container;
        w.x = CANVAS_WIDTH / 2;
        w.y = CANVAS_HEIGHT / 2;
        s_oStage.addChild(w);
        A = new CNumberBoard(0, 0, E);
        A.setVertical();
        r = new CInterface;
        C = new CCardSelection(m, s_oStage);
        N = new CMsgBox(s_oSpriteLibrary.getSprite("msg_box"));
        N.addEventListener(ON_BUT_EXIT, r.enableGUI, r);
        N.addEventListener(ON_BUT_RECHARGE, this._onRecharge, this);
        P = new CMsgBox(s_oSpriteLibrary.getSprite("msg_box"));
        P.hideButtons();
        P.centerMessage();
        O = new CAreYouSurePanel(s_oStage);
        O.addEventListener(ON_BUT_YES, this.onConfirmExit, this);
        O.addEventListener(ON_BUT_NO, this.onRefuseExit, this);
        this.refreshButtonPos()
    };
    this.unload = function() {
        r.unload();
        D && D.unload();
        null !== B && B.unload();
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
        C.unload();
        O.unload();
        P.unload();
        N.unload();
        s_oGame = null
    };
    this.initGame = function(a, b, d, c, e) {
        setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
        g = a;
        h = b;
        m = d;
        k = c;
        r.refreshTotBet(k);
        r.refreshMoney(m);
        D = new CAnimBalls(0, 0, h, p);
        this._generateNewCardSet();
        t = WIN_OCCURRENCE[e];
        z = PAYTABLE_INFO[e];
        H = new CPaytablePanel(s_oStage);
        H.initPrizes(z);
        this.refreshButtonPos()
    };
    this.refreshButtonPos = function() {
        r.refreshButtonPos(s_iOffsetX,
            s_iOffsetY);
        N.refreshButtonPos();
        P.refreshButtonPos();
        O.refreshButtonPos();
        H && H.refreshButtonPos();
        p.scaleX = p.scaleY = 1;
        p.x = 56 + s_iOffsetX;
        E.scaleX = E.scaleY = 1;
        A.setVertical();
        s_bLandscape ? (p.y = -60 + s_iOffsetY, p.scaleX = p.scaleY = .6, E.x = CANVAS_WIDTH - 16 - s_iOffsetX, E.y = s_iOffsetY + 84, E.scaleX = E.scaleY = .89, isSquaredRatio() || (A.setHorizontal(), E.x = CANVAS_WIDTH / 2, E.y = s_iOffsetY + 10, E.scaleX = E.scaleY = .6)) : (p.y = -90 + s_iOffsetY, E.x = 316 + s_iOffsetX, E.y = 312);
        e && this._setCardPos()
    };
    this._setCardPos = function() {
        if (s_bLandscape) {
            if (isSquaredRatio()) {
                for (var a =
                        0; a < e.length; a++) {
                    var b = CARD_POSITION["num_" + e.length];
                    e[a].setPos(b[a].x, b[a].y)
                }
                b = 40;
                a = E.x - E.getBounds().width - s_iOffsetX - b;
                var d = CANVAS_HEIGHT - 2 * s_iOffsetY - 340;
                w.x = a / 2 + b / 2;
                inRectResize(w, a, d)
            } else {
                d = e[0].getBounds().width;
                b = 40;
                var c = e.length * d + b * (e.length - 1);
                for (a = 0; a < e.length; a++) e[a].setPos(-c / 2 + d / 2 + (d + b) * a, 0);
                w.x = CANVAS_WIDTH / 2;
                smartResize(w, 40, 344)
            }
            w.y = CANVAS_HEIGHT / 2 + 34
        } else {
            if (isSquaredRatio())
                for (a = 0; a < e.length; a++) b = CARD_POSITION["num_" + e.length], e[a].setPos(b[a].x, b[a].y);
            else
                for (d = e[0].getBounds().height,
                    b = 40, c = e.length * d + b * (e.length - 1), a = 0; a < e.length; a++) e[a].setPos(0, -c / 2 + d / 2 + (d + b) * a);
            a = CANVAS_WIDTH - E.x - s_iOffsetX;
            w.x = E.x + a / 2;
            w.y = CANVAS_HEIGHT / 2;
            inRectResize(w, a - 40, CANVAS_HEIGHT - 2 * s_iOffsetY - 280)
        }
    };
    this._resetGame = function() {
        c = !1;
        n = 0;
        void 0 !== D && D.unload();
        D = new CAnimBalls(0, 0, h, p);
        for (var a = 0; a < e.length; a++) e[a].reset();
        A.reset()
    };
    this._removeCards = function() {
        for (var a = 0; a < e.length; a++) e[a].unload()
    };
    this._onRecharge = function() {
        $(s_oMain).trigger("recharge")
    };
    this.setMoney = function(a) {
        m += a;
        r.refreshMoney(m);
        r.enableGUI();
        s_oCardSelection.setMoney(m)
    };
    this.startGame = function() {
        if (0 > m - k) this.showRechargePanel();
        else {
            b || this._resetGame();
            m -= k;
            f += k;
            r.refreshMoney(m);
            b = !1;
            $(s_oMain).trigger("bet_placed", k);
            l = 0;
            var a = 1 + Math.floor(100 * Math.random());
            f < COIN_BETS[s_iCurCoinBet] * z[z.length - 1] && (a = t + 1);
            if (a <= t) {
                a = Math.floor(Math.random() * e.length);
                switch (Math.floor(3 * Math.random())) {
                    case 0:
                        var d = e[a].getRow(Math.floor(Math.random() * CARD_ROWS));
                        break;
                    case 1:
                        d = e[a].getCol(Math.floor(Math.random() * CARD_COLS));
                        break;
                    case 2:
                        d = e[a].getDiag(Math.floor(2 * Math.random()))
                }
                bubbleSort(d);
                u = [];
                for (a = 0; a < d.length; a++) d[a] !== STAR_VALUE && u.push(d[a]);
                d = [];
                for (a = 0; a < NUM_NUMBERS; a++) d[a] = a + 1;
                for (a = u.length - 1; 0 <= a; a--) d.splice(u[a] - 1, 1);
                this.setRandomNumberToExtract(d, h - u.length)
            } else {
                do {
                    d = [];
                    for (a = 0; a < NUM_NUMBERS; a++) d[a] = a + 1;
                    u = [];
                    this.setRandomNumberToExtract(d, h)
                } while (!0 === this._checkWin())
            }
            shuffle(u);
            v = [];
            this.extractNextNumber();
            D.start(u);
            c = !0
        }
    };
    this._onCellClick = function(a) {
        var b = a.cardid;
        a = a.number;
        c && a !== STAR_VALUE &&
            (this.isExtracted(a) ? e[b].findNumberExtracted(a) : P.showAndHide(sprintf(TEXT_WRONG_NUMBER, a)))
    };
    this.isExtracted = function(a) {
        return void 0 === v || null === v ? !1 : -1 !== v.indexOf(a) ? !0 : !1
    };
    this._generateNewCardSet = function() {
        var a = CARD_POSITION["num_" + g];
        e = [];
        for (var b = 0; b < g; b++) {
            var d = new CCard(a[b].x, a[b].y, a[b].scale, w, b);
            d.addEventListener(ON_CARD_NUM_CLICK, this._onCellClick, this);
            e.push(d)
        }
    };
    this.setRandomNumberToExtract = function(a, b) {
        for (var d = 0; d < b; d++) {
            var c = Math.floor(Math.random() * a.length);
            u.push(a[c]);
            a.splice(c, 1)
        }
    };
    this._checkWin = function() {
        for (var a = 0; a < e.length; a++)
            if (e[a].checkIfIsWinner(u)) return !0;
        return !1
    };
    this.extractNextNumber = function() {
        if (l === u.length) {
            c = !1;
            this._calculateWins();
            r.enableGUI();
            for (var a = 0; a < e.length; a++) e[a].hideHighlight();
            d++;
            d === AD_SHOW_COUNTER && (d = 0, $(s_oMain).trigger("show_interlevel_ad"));
            $(s_oMain).trigger("save_score", m)
        } else {
            v.push(u[l]);
            D.extractNextBall(u[l], l + 1);
            A.numExtracted(u[l]);
            if (AUTOFILL_ENABLED)
                for (a = 0; a < e.length; a++) e[a].findNumberExtracted(u[l]);
            else playSound(u[l], 1, !1);
            l++
        }
    };
    this._calculateWins = function() {
        for (var a = n = 0; a < e.length; a++) {
            var b = e[a].getWinIndex();
            0 <= b && (n += COIN_BETS[s_iCurCoinBet] * z[b], e[a].initWinAnim())
        }
        r.refreshWin(n);
        0 < n && (m += n, r.refreshMoney(m), f -= n, playSound("win", 1, !1))
    };
    this.showRechargePanel = function() {
        N.show(TEXT_GAMEOVER, !0)
    };
    this.onPaytable = function() {
        H.show()
    };
    this.onBuyNewCards = function() {
        this._resetGame();
        this._removeCards();
        this._resetGame();
        b = !0;
        C.setMoney(m);
        C.show()
    };
    this.onExit = function() {
        createjs.Ticker.paused = !0;
        O.show()
    };
    this.onConfirmExit = function() {
        createjs.Ticker.paused = !1;
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("share_event", m);
        this.unload();
        s_oMain.gotoMenu();
        $(s_oMain).trigger("show_interlevel_ad")
    };
    this.onRefuseExit = function() {
        createjs.Ticker.paused = !1
    };
    this.gameOver = function() {
        B = new CEndPanel(s_oSpriteLibrary.getSprite("msg_box"));
        B.show()
    };
    this.getCurNumCards = function() {
        return g
    };
    this.update = function() {};
    s_oGame = this;
    WIN_OCCURRENCE = a.win_occurrence;
    COIN_BETS = a.coin_bet;
    BANK = a.bank_money;
    START_PLAYER_MONEY = a.start_player_money;
    PAYTABLE_INFO = a.paytable;
    AD_SHOW_COUNTER = a.ad_show_counter;
    AUTOFILL_ENABLED = a.autofill_mode;
    TIME_EXTRACTION = a.time_extraction_autofill;
    TIME_EXTRACTION_MANUAL = a.time_extraction_manual;
    this._init()
}
var s_oGame;

function CInterface() {
    var a, c, b, f, m, g, h, k, n, d, l, t, e, u, v, z, r, B, D, C, A = null,
        H = null;
    this._init = function() {
        z = new createjs.Container;
        z.x = CANVAS_WIDTH / 2;
        s_oStage.addChild(z);
        var p = s_oSpriteLibrary.getSprite("but_exit");
        h = CANVAS_WIDTH - p.height / 2 - 10;
        k = p.height / 2 + 10;
        l = new CGfxButton(h, k, p, s_oStage);
        l.addEventListener(ON_MOUSE_UP, this._onExit, this);
        var E = 10;
        s_bMobile && !isTablet() && (E = 30);
        p = s_oSpriteLibrary.getSprite("but_paytable");
        a = h - p.width - E;
        c = k;
        D = new CGfxButton(a, c, p, s_oStage);
        D.addEventListener(ON_MOUSE_UP,
            this._onPaytable, this);
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (m = a - p.width - E, g = c, p = s_oSpriteLibrary.getSprite("audio_icon"), d = new CToggle(m, g, p, s_bAudioActive, s_oStage), d.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this), b = m - p.width / 2, f = g) : (b = a - p.width - E, f = c);
        p = window.document;
        E = p.documentElement;
        A = E.requestFullscreen || E.mozRequestFullScreen || E.webkitRequestFullScreen || E.msRequestFullscreen;
        H = p.exitFullscreen || p.mozCancelFullScreen || p.webkitExitFullscreen || p.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN &&
            (A = !1);
        A && screenfull.isEnabled && (p = s_oSpriteLibrary.getSprite("but_fullscreen"), C = new CToggle(b, f, p, s_bFullscreen, s_oStage), C.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        p = s_oSpriteLibrary.getSprite("but_settings");
        n = new CGUIExpandible(h, k, p, s_oStage);
        n.addButton(l);
        n.addButton(D);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || n.addButton(d);
        A && screenfull.isEnabled && n.addButton(C);
        t = new CDisplayText(-425, 0, s_oSpriteLibrary.getSprite("plus_display"), formatValue(START_PLAYER_MONEY), TEXT_MONEY,
            30, z);
        u = new CDisplayText(t.getX() + 230, 0, s_oSpriteLibrary.getSprite("display_small"), "", TEXT_TOT_BET, 30, z);
        p = s_oSpriteLibrary.getSprite("but_buy_cards");
        B = new CGfxButton(u.getX() + 175, 41, p, z);
        B.addEventListener(ON_MOUSE_UP, this._onButBuy, this);
        v = new CDisplayText(B.getX() + 48, 0, s_oSpriteLibrary.getSprite("display_small"), "", TEXT_COIN, 30, z);
        e = new CDisplayText(v.getX() + 135, 0, s_oSpriteLibrary.getSprite("display_small"), formatValue(0), TEXT_WIN, 30, z);
        p = s_oSpriteLibrary.getSprite("but_generic");
        r = new CTextSpritesheetBut(e.getX() +
            197, 41, p, TEXT_START, PRIMARY_FONT, "#ffffff", 50, !1, z);
        r.addEventListener(ON_MOUSE_UP, this._onButPlay, this);
        r.enable();
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) d.unload(), d = null;
        A && screenfull.isEnabled && C.unload();
        B.unload();
        l.unload();
        s_oInterface = null
    };
    this.refreshButtonPos = function(a, b) {
        smartResize(z, 20, 0);
        z.y = CANVAS_HEIGHT - 90 * z.scaleX - s_iOffsetY;
        n.refreshPos()
    };
    this.refreshMoney = function(a) {
        t.changeText(formatValue(a))
    };
    this.refreshTotBet =
        function(a) {
            u.changeText(formatValue(a));
            v.changeText(formatValue(COIN_BETS[s_iCurCoinBet]))
        };
    this.refreshWin = function(a) {
        e.changeText(formatValue(a));
        0 < a && e.setHighlight()
    };
    this.enableGUI = function() {
        r.enable();
        B.enable();
        var a = s_oSpriteLibrary.getSprite("but_buy_cards");
        B.getButtonImage().image = a
    };
    this.disableGUI = function() {
        r.disable();
        B.disable();
        var a = s_oSpriteLibrary.getSprite("but_buy_cards_disabled");
        B.getButtonImage().image = a
    };
    this._onButPlay = function() {
        this.disableGUI();
        e.changeText(formatValue(0));
        e.stopHighlight();
        s_oGame.startGame()
    };
    this._onButBuy = function() {
        s_oGame.onBuyNewCards()
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onExit = function() {
        s_oGame.onExit()
    };
    this._onPaytable = function() {
        s_oGame.onPaytable()
    };
    this.resetFullscreenBut = function() {
        A && screenfull.isEnabled && C.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? H.call(window.document) : A.call(window.document.documentElement);
        sizeHandler()
    };
    s_oInterface =
        this;
    this._init();
    return this
}
var s_oInterface = null;

function CEndPanel(a) {
    var c, b, f;
    this._init = function(a) {
        b = new createjs.Container;
        b.alpha = 0;
        b.visible = !1;
        s_oStage.addChild(b);
        c = createBitmap(a);
        b.addChild(c);
        f = new CTLText(b, CANVAS_WIDTH / 2 - 250, CANVAS_HEIGHT / 2 - 200, 500, 400, 100, "center", "#fff", PRIMARY_FONT, 1, 0, 0, " ", !0, !0, !0, !1)
    };
    this.unload = function() {
        b.removeAllEventListeners()
    };
    this._initListener = function() {
        b.on("mousedown", this._onExit)
    };
    this.show = function() {
        playSound("game_over", 1, !1);
        f.refreshText(TEXT_GAMEOVER);
        b.visible = !0;
        var a = this;
        createjs.Tween.get(b).to({
                alpha: 1
            },
            500).call(function() {
            a._initListener()
        })
    };
    this._onExit = function() {
        b.removeAllEventListeners();
        s_oStage.removeChild(b);
        $(s_oMain).trigger("end_session");
        s_oGame.onExit()
    };
    this._init(a);
    return this
}

function CAnimBalls(a, c, b, f) {
    var m, g, h, k, n, d, l, t, e, u, v, z, r, B, D, C, A, H, p;
    this._init = function(a, b, d) {
        m = d;
        l = 1;
        p = new createjs.Container;
        p.x = a;
        p.y = b;
        E.addChild(p);
        A = new createjs.Container;
        p.addChild(A);
        a = s_oSpriteLibrary.getSprite("ball");
        b = a.width / NUM_DIFFERENT_BALLS;
        g = a.height;
        B = new createjs.SpriteSheet({
            images: [a],
            frames: {
                width: b,
                height: g,
                regX: b / 2,
                regY: g / 2
            },
            animations: {
                cyan: [0],
                orange: [1],
                yellow: [2],
                grey: [3],
                green: [4]
            }
        });
        a = s_oSpriteLibrary.getSprite("tube");
        a = createBitmap(a);
        a.x = -48;
        a.y = 24;
        b = (new createjs.Graphics).beginFill("rgba(255,0,0,0.01)").drawRoundRectComplex(a.x,
            a.y + 301, 296, 80, 0, 40, 40, 0);
        z = new createjs.Shape(b);
        e = [];
        H = new createjs.Container;
        p.addChild(H);
        p.addChild(a);
        p.addChild(z);
        this.initBalls();
        A.visible = !1
    };
    this.unload = function() {
        clearTimeout(t);
        E.removeChild(p)
    };
    this.reset = function(a) {
        m = a;
        C.text = "0/" + m
    };
    this.initBalls = function() {
        for (var a = s_oSpriteLibrary.getSprite("tube").height - g - g / 2, b = 0; 7 > b; b++) e[b] = new CBallExtracted(0, a, c, g, Math.floor(Math.random() * NUM_DIFFERENT_BALLS), 32, 3, B, A), a -= g;
        d = e[0].getY();
        a = s_oSpriteLibrary.getSprite("ball_preview");
        var c =
            a.width / NUM_DIFFERENT_BALLS;
        D = new createjs.SpriteSheet({
            images: [a],
            frames: {
                width: c,
                height: a.height,
                regX: c / 2,
                regY: a.height / 2
            },
            animations: {
                cyan: [0],
                orange: [1],
                yellow: [2],
                grey: [3],
                green: [4]
            }
        });
        u = [];
        h = c;
        c = new CBallExtracted(50 - h / 2, 122 + a.height / 2, h, a.height, e[0].getColor(), 80, 5, D, H);
        u.push(c);
        a = s_oSpriteLibrary.getSprite("number_extract_bg");
        b = createBitmap(a);
        b.x = 40;
        b.y = 112;
        p.addChild(b);
        a = (new createjs.Graphics).beginFill("rgba(255,255,255,0.01)").drawCircle(b.x + a.width / 2, b.y + a.height / 2, 92);
        r = new createjs.Shape(a);
        p.addChild(r);
        C = new createjs.Text("0/" + m, " 24px " + PRIMARY_FONT, "#fff");
        C.x = 150;
        C.y = 304;
        C.textAlign = "center";
        C.textBaseline = "middle";
        p.addChild(C);
        c.setMask(r)
    };
    this.start = function(a) {
        A.visible = !0;
        v = [];
        for (var b = 0; b < a.length; b++) v.push(a[b]);
        for (b = 0; b < e.length; b++) a = this.getColorByNum(v.shift()), e[b].setSprite(a)
    };
    this.extractNextBall = function(a, b) {
        k = 0;
        playSound("launch_ball", 1, !1);
        for (var c = 0; c < e.length; c++)
            if (e[c].getY() > d) {
                e[c].setMask(z);
                var f = e[c].getX() + g;
                e[c].moveX(f, this.placeNewBall, this)
            } else {
                f =
                    e[c].getY() + g;
                var p = "";
                f > d && (p = a);
                e[c].moveY(f, p, this.placeNewBall, this)
            }
        n = 0;
        c = this.getColorByNum(a);
        u[u.length - 1].setSprite(c);
        u[u.length - 1].setText(a);
        for (c = 0; c < u.length; c++) f = u[c].getX() + h, u[c].moveX(f, this.placeNewPreviewBall, this);
        C.text = b + "/" + m
    };
    this.placeNewBall = function() {
        k++;
        if (k === e.length) {
            var a = s_oSpriteLibrary.getSprite("ball"),
                b = this.getColorByNum(v.shift());
            a = new CBallExtracted(0, e[e.length - 1].getY() - a.height, a.width / NUM_DIFFERENT_BALLS, a.height, b, 32, 3, B, A);
            e.push(a);
            e[0].getX() > 3 *
                g ? (e[0].unload(), e.splice(0, 1)) : l++;
            a = AUTOFILL_ENABLED ? TIME_EXTRACTION : TIME_EXTRACTION_MANUAL[s_oGame.getCurNumCards() - 1];
            t = setTimeout(function() {
                null !== s_oGame && s_oGame.extractNextNumber()
            }, a)
        }
    };
    this.placeNewPreviewBall = function() {
        n++;
        if (n === u.length) {
            var a = s_oSpriteLibrary.getSprite("ball_preview");
            a = new CBallExtracted(50 - h / 2, 122 + a.height / 2, a.width / NUM_DIFFERENT_BALLS, a.height, e[l].getColor(), 80, 5, D, H);
            a.setMask(r);
            u.push(a);
            u[0].getX() > h && (u[0].unload(), u.splice(0, 1))
        }
    };
    this.getColorByNum = function(a) {
        return Math.floor((a -
            1) / 15)
    };
    var E = f;
    this._init(a, c, b)
}

function CCardSelection(a, c) {
    var b, f, m, g, h, k, n, d, l, t, e, u, v, z, r, B, D, C, A, H, p, E, w, N, O, P, Q, V, T, S = null,
        U = null,
        I, L, q, M, J, K;
    this._init = function(a) {
        n = a;
        l = s_iCurNumCards;
        e = NUM_EXTRACTIONS[s_iCurNumToExtract];
        d = COIN_BETS[s_iCurCoinBet] * l;
        t = 0;
        I = new createjs.Container;
        I.on("click", function() {});
        F.addChild(I);
        a = createBitmap(s_oSpriteLibrary.getSprite("bg_select_card"));
        I.addChild(a);
        a = CANVAS_WIDTH / 2;
        var c = 900,
            u = 100;
        v = new CTLText(I, a - c / 2, 150, c, u, 100, "center", "#fff", PRIMARY_FONT, 1, 0, 0, TEXT_SELECT_CARD, !0, !0, !1, !1);
        v.setOutline(4);
        z = new CTLText(I, a - c / 2, 150, c, u, 100, "center", "#ffc103", PRIMARY_FONT, 1, 0, 0, TEXT_SELECT_CARD, !0, !0, !1, !1);
        L = new createjs.Container;
        L.x = CANVAS_WIDTH / 2;
        L.y = CANVAS_HEIGHT - 90;
        I.addChild(L);
        D = new CDisplayText(-510, 0, s_oSpriteLibrary.getSprite("plus_display"), formatValue(n), TEXT_MONEY, 30, L);
        C = new CDisplayText(-180, 0, s_oSpriteLibrary.getSprite("display_small"), formatValue(COIN_BETS[s_iCurCoinBet]), TEXT_COIN, 30, L);
        a = s_oSpriteLibrary.getSprite("but_plus");
        p = new CTextSpritesheetBut(C.getX() +
            170, C.getY() + 41, a, TEXT_PLUS, PRIMARY_FONT, "#ffffff", 70, !1, L);
        s_iCurCoinBet === COIN_BETS.length - 1 ? p.disable() : p.enable();
        p.addEventListener(ON_MOUSE_UP, this._onButBetPlusRelease, this);
        a = s_oSpriteLibrary.getSprite("but_plus");
        E = new CTextSpritesheetBut(C.getX() - 48, C.getY() + 41, a, TEXT_MIN, PRIMARY_FONT, "#ffffff", 70, !1, L);
        0 === s_iCurCoinBet ? E.disable() : E.enable();
        E.setScaleX(-1);
        E.addEventListener(ON_MOUSE_UP, this._onButBetMinRelease, this);
        A = new CDisplayText(50, 0, s_oSpriteLibrary.getSprite("plus_display"),
            formatValue(d), TEXT_TOT_BET, 30, L);
        V = new CTextButton(402, 41, s_oSpriteLibrary.getSprite("but_gui"), TEXT_PLAY, PRIMARY_FONT, "#ffffff", 50, 0, L);
        V.addEventListener(ON_MOUSE_UP, this._onButPlay, this);
        K = new createjs.Container;
        K.x = CANVAS_WIDTH / 2 - 250;
        K.y = CANVAS_HEIGHT / 2 - 10;
        I.addChild(K);
        q = new createjs.Container;
        q.y = -100;
        K.addChild(q);
        a = s_oSpriteLibrary.getSprite("num_cards_panel");
        c = createBitmap(a);
        c.regX = a.width / 2;
        c.regY = a.height / 2;
        q.addChild(c);
        c = 400;
        u = 34;
        new CTLText(q, -(c / 2), -64 - u / 2, c, u, 34, "center", "#fff",
            PRIMARY_FONT, 1, 0, 0, TEXT_SELECT_NUM_CARDS, !0, !0, !0, !1);
        H = new createjs.Text(l, " 44px " + PRIMARY_FONT, "#fff");
        H.y = 34;
        H.textAlign = "center";
        H.textBaseline = "middle";
        q.addChild(H);
        a = s_oSpriteLibrary.getSprite("but_plus");
        w = new CTextSpritesheetBut(156, 35, a, TEXT_PLUS, PRIMARY_FONT, "#ffffff", 70, !1, q);
        w.enable();
        w.addEventListener(ON_MOUSE_UP, this._onButCardPlusRelease, this);
        a = s_oSpriteLibrary.getSprite("but_plus");
        N = new CTextSpritesheetBut(-164, 35, a, TEXT_MIN, PRIMARY_FONT, "#ffffff", 70, !1, q);
        N.enable();
        N.setScaleX(-1);
        N.addEventListener(ON_MOUSE_UP, this._onButCardMinRelease, this);
        M = new createjs.Container;
        M.y = 100;
        K.addChild(M);
        a = s_oSpriteLibrary.getSprite("num_balls_panel");
        c = createBitmap(a);
        c.regX = a.width / 2;
        c.regY = a.height / 2;
        M.addChild(c);
        c = 400;
        u = 34;
        new CTLText(M, -(c / 2), -44 - u / 2, c, u, 34, "center", "#fff", PRIMARY_FONT, 1, 0, 0, TEXT_SELECT_NUM_BALLS, !0, !0, !0, !1);
        a = s_oSpriteLibrary.getSprite("but_ball");
        O = new CToggleText(0 === s_iCurNumToExtract ? !0 : !1, -150, 24, a, a.width / 2, a.height, NUM_EXTRACTIONS[0], PRIMARY_FONT, "#ffffff",
            50, M);
        O.addEventListener(ON_MOUSE_UP, this._onButNumBall1Release, this);
        P = new CToggleText(1 === s_iCurNumToExtract ? !0 : !1, 0, 24, a, a.width / 2, a.height, NUM_EXTRACTIONS[1], PRIMARY_FONT, "#ffffff", 50, M);
        P.addEventListener(ON_MOUSE_UP, this._onButNumBall2Release, this);
        Q = new CToggleText(2 === s_iCurNumToExtract ? !0 : !1, 150, 24, a, a.width / 2, a.height, NUM_EXTRACTIONS[2], PRIMARY_FONT, "#ffffff", 50, M);
        Q.addEventListener(ON_MOUSE_UP, this._onButNumBall3Release, this);
        this._initCards();
        a = s_oSpriteLibrary.getSprite("but_exit");
        h = CANVAS_WIDTH - a.height / 2 - 10;
        k = a.height / 2 + 10;
        B = new CGfxButton(h, k, a, I);
        B.addEventListener(ON_MOUSE_UP, this._onExit, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) m = h - a.width - 10, g = k, a = s_oSpriteLibrary.getSprite("audio_icon"), r = new CToggle(m, g, a, s_bAudioActive, I), r.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        a = window.document;
        c = a.documentElement;
        S = c.requestFullscreen || c.mozRequestFullScreen || c.webkitRequestFullScreen || c.msRequestFullscreen;
        U = a.exitFullscreen || a.mozCancelFullScreen || a.webkitExitFullscreen ||
            a.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (S = !1);
        S && screenfull.isEnabled && (a = s_oSpriteLibrary.getSprite("but_fullscreen"), b = a.width / 4 + 6, f = a.height / 2 + 10, T = new CToggle(b, f, a, s_bFullscreen, I), T.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        this._checkIfCanPlay();
        this._setButtonsStates();
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.refreshButtonPos = function(a, d) {
        if (s_bLandscape) {
            var c = s_iOffsetY + 6,
                e = 100;
            z.setY(c + e / 2);
            v.setY(c + e / 2);
            K.x = CANVAS_WIDTH / 2 - 300;
            K.y = CANVAS_HEIGHT / 2 - 10;
            q.x =
                0;
            q.y = -100;
            M.x = 0;
            M.y = 100;
            J.x = CANVAS_WIDTH / 2 + 300;
            J.y = CANVAS_HEIGHT / 2 - 20
        } else c = 150, e = 100, z.setY(c + e / 2), v.setY(c + e / 2), K.x = CANVAS_WIDTH / 2, K.y = 380, q.x = -230, q.y = 0, M.x = 230, M.y = 4, J.x = CANVAS_WIDTH / 2, J.y = CANVAS_HEIGHT / 2 + 170;
        smartResize(K, 20, 0);
        L.y = CANVAS_HEIGHT - 90 - s_iOffsetY;
        smartResize(L, 20, 0);
        smartResize(J, 20, 250);
        B.setPosition(h - a, d + k);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || r.setPosition(m - a, d + g);
        S && screenfull.isEnabled && T.setPosition(b + a, f + d)
    };
    this.unload = function() {
        p.unload();
        E.unload();
        w.unload();
        N.unload();
        O.unload();
        P.unload();
        Q.unload();
        V.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) r.unload(), r = null;
        S && screenfull.isEnabled && T.unload();
        B.unload();
        I.removeAllEventListeners();
        F.removeChild(I);
        s_oCardSelection = null
    };
    this.setMoney = function(a) {
        n = a;
        D.changeText(formatValue(a));
        this._setButtonsStates()
    };
    this._initCards = function() {
        J = new createjs.Container;
        J.x = CANVAS_WIDTH / 2 + 250;
        J.y = CANVAS_HEIGHT / 2 - 16;
        I.addChild(J);
        var a = s_oSpriteLibrary.getSprite("msg_box"),
            b = createBitmap(a);
        b.regX = a.width /
            2;
        b.regY = a.height / 2;
        J.addChild(b);
        new CTLText(J, -185, -317, 370, 34, 34, "center", "#ffc103", PRIMARY_FONT, 1, 0, 0, TEXT_PAYTABLE, !0, !0, !1, !1);
        a = s_oSpriteLibrary.getSprite("card_cell");
        b = a.width / 5;
        a = new createjs.SpriteSheet({
            images: [a],
            frames: {
                width: b,
                height: b,
                regX: b / 2,
                regY: b / 2
            },
            animations: {
                state_empty: [0],
                state_extracted: [1],
                state_highlight: [2],
                state_star_empty: [3],
                state_star_highlight: [4]
            }
        });
        u = [];
        u[0] = new CPaytableCard(-170, -190, b, 0, a, J, PAYTABLE_WIN_SCHEME[WIN_TYPE_DIAGONAL]);
        u[1] = new CPaytableCard(0, -190,
            b, 1, a, J, PAYTABLE_WIN_SCHEME[WIN_TYPE_COLUMN]);
        u[2] = new CPaytableCard(170, -190, b, 2, a, J, PAYTABLE_WIN_SCHEME[WIN_TYPE_ANY_ROW]);
        u[3] = new CPaytableCard(-170, 0, b, 0, a, J, PAYTABLE_WIN_SCHEME[WIN_TYPE_ANY_2_ROWS]);
        u[4] = new CPaytableCard(0, 0, b, 1, a, J, PAYTABLE_WIN_SCHEME[WIN_TYPE_ANY_3_ROWS]);
        u[5] = new CPaytableCard(170, 0, b, 2, a, J, PAYTABLE_WIN_SCHEME[WIN_TYPE_ANY_4_ROWS]);
        u[6] = new CPaytableCard(0, 190, b, 2, a, J, PAYTABLE_WIN_SCHEME[WIN_TYPE_BINGO]);
        this.initPrizes(PAYTABLE_INFO[t])
    };
    this.initPrizes = function(a) {
        for (var b =
                0; b < u.length; b++) u[b].setMsg(TEXT_PAYTABLE_PRIZES[b] + ": x" + a[b])
    };
    this._checkIfEnoughMoney = function() {
        return n < d ? !1 : !0
    };
    this._checkIfCanPlay = function() {
        this._checkIfEnoughMoney() || (s_iCurCoinBet = 0, l = MIN_CARDS, C.changeText(formatValue(COIN_BETS[s_iCurCoinBet])), d = COIN_BETS[s_iCurCoinBet] / COIN_BETS[0] * COIN_BETS[0] * l, H.text = l, A.changeText(formatValue(d)), !1 === this._checkIfEnoughMoney() && s_oGame.showRechargePanel())
    };
    this._setButtonsStates = function() {
        this._setBetButtonsStates();
        this._setCardButtonsStates()
    };
    this._setBetButtonsStates = function() {
        p.enable();
        E.enable();
        0 === s_iCurCoinBet && E.disable();
        s_iCurCoinBet === COIN_BETS.length - 1 && p.disable();
        s_iCurCoinBet < COIN_BETS.length - 1 && n < COIN_BETS[s_iCurCoinBet + 1] / COIN_BETS[0] * COIN_BETS[0] * l && p.disable()
    };
    this._setCardButtonsStates = function() {
        w.enable();
        N.enable();
        l === MIN_CARDS && N.disable();
        l === MAX_CARDS && w.disable();
        l < MAX_CARDS && n < COIN_BETS[s_iCurCoinBet] / COIN_BETS[0] * COIN_BETS[0] * (l + 1) && w.disable()
    };
    this._onButBetPlusRelease = function() {
        s_iCurCoinBet++;
        C.changeText(formatValue(COIN_BETS[s_iCurCoinBet]));
        d = COIN_BETS[s_iCurCoinBet] / COIN_BETS[0] * COIN_BETS[0] * l;
        A.changeText(formatValue(d));
        this._setButtonsStates()
    };
    this._onButBetMinRelease = function() {
        s_iCurCoinBet--;
        C.changeText(formatValue(COIN_BETS[s_iCurCoinBet]));
        d = COIN_BETS[s_iCurCoinBet] / COIN_BETS[0] * COIN_BETS[0] * l;
        A.changeText(formatValue(d));
        this._setButtonsStates()
    };
    this._onButCardPlusRelease = function() {
        l++;
        H.text = l;
        d = COIN_BETS[s_iCurCoinBet] / COIN_BETS[0] * COIN_BETS[0] * l;
        A.changeText(formatValue(d));
        this._setButtonsStates()
    };
    this._onButCardMinRelease =
        function() {
            l--;
            H.text = l;
            d = COIN_BETS[s_iCurCoinBet] / COIN_BETS[0] * COIN_BETS[0] * l;
            A.changeText(formatValue(d));
            this._setButtonsStates()
        };
    this._onButNumBall1Release = function() {
        e !== NUM_EXTRACTIONS[0] ? (e = NUM_EXTRACTIONS[0], P.activate(!1), Q.activate(!1)) : O.activate(!0);
        t = 0;
        this.initPrizes(PAYTABLE_INFO[t])
    };
    this._onButNumBall2Release = function() {
        e !== NUM_EXTRACTIONS[1] ? (e = NUM_EXTRACTIONS[1], O.activate(!1), Q.activate(!1)) : P.activate(!0);
        t = 1;
        this.initPrizes(PAYTABLE_INFO[t])
    };
    this._onButNumBall3Release = function() {
        e !==
            NUM_EXTRACTIONS[2] ? (e = NUM_EXTRACTIONS[2], P.activate(!1), O.activate(!1)) : Q.activate(!0);
        t = 2;
        this.initPrizes(PAYTABLE_INFO[t])
    };
    this._onButPlay = function() {
        !1 === this._checkIfEnoughMoney() ? s_oGame.showRechargePanel() : (s_iCurNumCards = l, s_iCurNumToExtract = t, this.hide(), s_oGame.initGame(l, e, n, d, t))
    };
    this._onRecharge = function() {
        $(s_oMain).trigger("recharge")
    };
    this.show = function() {
        I.visible = !0
    };
    this.hide = function() {
        I.visible = !1
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onExit = function() {
        s_oGame.onExit()
    };
    this.resetFullscreenBut = function() {
        S && screenfull.isEnabled && T.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? U.call(window.document) : S.call(window.document.documentElement);
        sizeHandler()
    };
    var F = c;
    s_oCardSelection = this;
    this._init(a)
}
var s_oCardSelection = null,
    s_iCurNumCards = 1,
    s_iCurNumToExtract = 0,
    s_iCurCoinBet = 0;

function CCard(a, c, b, f, m) {
    var g, h, k = -1,
        n, d, l, t, e, u, v, z, r, B, D, C, A;
    this._init = function(a, b, c) {
        r = [];
        B = [];
        D = !1;
        h = m;
        n = null;
        var e = [],
            f = 1;
        d = [];
        for (var p = 0; p < CARD_COLS; p++) {
            e[p] = [];
            for (var k = 0; 15 > k; k++) e[p].push(f), f++
        }
        l = [];
        for (p = 0; p < CARD_ROWS; p++)
            for (l[p] = [], k = 0; k < CARD_COLS; k++) l[p][k] = LABEL_EMPTY;
        l[STAR_COORD.row][STAR_COORD.col] = LABEL_STAR;
        for (p = 0; p < CARD_COLS; p++) shuffle(e[p]);
        for (p = 0; p < CARD_COLS; p++) p === STAR_COORD.col ? e[p].splice(4) : e[p].splice(5);
        for (p = 0; p < CARD_COLS; p++) bubbleSort(e[p]);
        A = new createjs.Container;
        A.scaleX = A.scaleY = c;
        A.x = a;
        A.y = b;
        H.addChild(A);
        p = s_oSpriteLibrary.getSprite("card_bg");
        k = createBitmap(p);
        k.regX = p.width / 2;
        k.regY = p.height / 2;
        A.addChild(k);
        c = new createjs.Container;
        c.y = 60;
        A.addChild(c);
        p = s_oSpriteLibrary.getSprite("card_cell");
        g = p.width / 5;
        f = new createjs.SpriteSheet({
            images: [p],
            frames: {
                width: g,
                height: g,
                regX: g / 2,
                regY: g / 2
            },
            animations: {
                state_empty: [0],
                state_extracted: [1],
                state_highlight: [2],
                state_star_empty: [3],
                state_star_highlight: [4]
            }
        });
        var u = g * (CARD_COLS - 1),
            v = g * (CARD_ROWS - 1);
        t = [];
        for (p =
            0; p < CARD_ROWS; p++)
            for (t[p] = [], k = 0; k < CARD_COLS; k++) a = -u / 2 + u / (CARD_COLS - 1) * k, b = -v / 2 + v / (CARD_ROWS - 1) * p, a = new CCardCell(a, b, f, c, l[p][k], g, e[k][0], AUTOFILL_ENABLED), a.addEventListener(ON_NUM_CLICK, this._onCellClick, this), t[p][k] = a, l[p][k] === LABEL_EMPTY ? (l[p][k] = e[k][0], e[k].splice(0, 1)) : (l[p][k] = STAR_VALUE, a.setValue(STAR_VALUE));
        this.initRows();
        this.initCols();
        this.initDiags();
        this.initCoordinates();
        p = s_oSpriteLibrary.getSprite("card_highlight");
        C = createBitmap(p);
        C.regX = p.width / 2;
        C.regY = p.height / 2;
        C.visible = !1;
        A.addChild(C)
    };
    this.unload = function() {
        for (var a = 0; a < t.length; a++)
            for (var b = 0; b < t[a].length; b++) t[a][b].unload();
        H.removeChild(A)
    };
    this.addEventListener = function(a, b, d, c) {
        r[a] = b;
        B[a] = d
    };
    this._onCellClick = function(a) {
        r[ON_CARD_NUM_CLICK] && r[ON_CARD_NUM_CLICK].call(B[ON_CARD_NUM_CLICK], {
            cardid: h,
            number: a
        })
    };
    this.initRows = function() {
        e = [];
        for (var a = 0; a < CARD_ROWS; a++) {
            e[a] = [];
            for (var b = 0; b < CARD_COLS; b++) e[a].push(parseInt(l[a][b]))
        }
    };
    this.initCols = function() {
        u = [];
        for (var a = 0; a < CARD_ROWS; a++) {
            u[a] = [];
            for (var b = 0; b < CARD_COLS; b++) u[a].push(parseInt(l[b][a]))
        }
    };
    this.initDiags = function() {
        v = [
            [],
            []
        ];
        for (var a = 0; a < CARD_ROWS; a++)
            for (var b = 0; b < CARD_COLS; b++) a === b && v[0].push(l[a][b]), CARD_COLS - a - 1 === b && v[1].push(l[a][b])
    };
    this.initCoordinates = function() {
        z = [];
        for (var a = 0; a < CARD_ROWS; a++)
            for (var b = 0; b < CARD_COLS; b++) z[l[a][b]] = {
                row: a,
                col: b
            }
    };
    this.reset = function() {
        -1 !== k && (clearInterval(k), k = -1);
        n = null;
        D = !1;
        d = [];
        C.visible = !1;
        for (var a = 0; a < t.length; a++)
            for (var b = 0; b < t[a].length; b++) l[a][b] === STAR_VALUE ? t[a][b].gotoAndStop("state_star_empty") :
                t[a][b].gotoAndStop("state_empty")
    };
    this.hideHighlight = function() {
        C.visible = !1
    };
    this.checkIfIsWinner = function(a) {
        for (var b = 0; b < e.length; b++) {
            for (var d = 0, c = 0; c < e[b].length; c++)
                for (var f = 0; f < a.length; f++) a[f] === e[b][c] && d++;
            if (b === STAR_COORD.row) {
                if (4 === d) return !0
            } else if (5 === d) return !0
        }
        for (b = 0; b < u.length; b++) {
            for (c = d = 0; c < u[b].length; c++)
                for (f = 0; f < a.length; f++) a[f] === u[b][c] && d++;
            if (b === STAR_COORD.col) {
                if (4 === d) return !0
            } else if (5 === d) return !0
        }
        for (b = 0; b < v.length; b++) {
            for (c = d = 0; c < v[b].length; c++)
                for (f =
                    0; f < a.length; f++) a[f] === v[b][c] && d++;
            if (4 === d) return !0
        }
        return !1
    };
    this.findNumberExtracted = function(a) {
        for (var b = !1, d = 0, c = 0, e = 0; e < l.length; e++)
            for (var f = 0; f < l[e].length; f++)
                if (l[e][f] === a) {
                    b = !0;
                    d = e;
                    c = f;
                    break
                }
        b && this._checkWins(d, c)
    };
    this._checkWins = function(a, b) {
        t[a][b].gotoAndStop("state_extracted");
        var c = !1,
            e = this.getRow(a);
        if (e = this.checkLineFills(e)) c = !0, d.push(a), D || (n = WIN_TYPE_ANY_ROW, this.highlightLine(e)), D = !0, r[ON_CARD_LINE_COMPLETED] && r[ON_CARD_LINE_COMPLETED].call(B[ON_CARD_LINE_COMPLETED], {
            cardid: h,
            type: WIN_TYPE_ANY_ROW,
            laneindex: a
        });
        e = this.getCol(b);
        if (e = this.checkLineFills(e)) D || (n = WIN_TYPE_COLUMN, this.highlightLine(e)), D = !0, r[ON_CARD_LINE_COMPLETED] && r[ON_CARD_LINE_COMPLETED].call(B[ON_CARD_LINE_COMPLETED], {
            cardid: h,
            type: WIN_TYPE_COLUMN,
            laneindex: b
        });
        a === b && (e = this.getDiag(0), e = this.checkLineFills(e)) && (D || (n = WIN_TYPE_DIAGONAL, this.highlightLine(e)), D = !0, r[ON_CARD_LINE_COMPLETED] && r[ON_CARD_LINE_COMPLETED].call(B[ON_CARD_LINE_COMPLETED], {
            cardid: h,
            type: WIN_TYPE_DIAGONAL,
            laneindex: 0
        }));
        CARD_COLS - a - 1 === b && (e = this.getDiag(1), e = this.checkLineFills(e)) && (D || (n = WIN_TYPE_DIAGONAL, this.highlightLine(e)), D = !0, r[ON_CARD_LINE_COMPLETED] && r[ON_CARD_LINE_COMPLETED].call(B[ON_CARD_LINE_COMPLETED], {
            cardid: h,
            type: WIN_TYPE_DIAGONAL,
            laneindex: 1
        }));
        if (c && 2 <= d.length) {
            this.removePreviousCombo();
            for (c = 0; c < d.length; c++) a = d[c], e = this.getRow(a), this.highlightLine(e);
            switch (d.length) {
                case 2:
                    var f = WIN_TYPE_ANY_2_ROWS;
                    break;
                case 3:
                    f = WIN_TYPE_ANY_3_ROWS;
                    break;
                case 4:
                    f = WIN_TYPE_ANY_4_ROWS;
                    break;
                case 5:
                    f = WIN_TYPE_BINGO
            }
            n =
                f;
            r[ON_CARD_LINE_COMPLETED] && r[ON_CARD_LINE_COMPLETED].call(B[ON_CARD_LINE_COMPLETED], {
                cardid: h,
                type: f,
                laneindex: a
            })
        }
    };
    this.initWinAnim = function() {
        C.visible = !0;
        var a = this;
        k = setInterval(function() {
            a._playWinAnim()
        }, 300)
    };
    this._playWinAnim = function() {
        C.visible = !C.visible
    };
    this.checkLineFills = function(a) {
        for (var b = 0; b < a.length; b++) {
            var d = z[a[b]].row,
                c = z[a[b]].col;
            if ("state_extracted" !== t[d][c].getCurrentAnimation() && "state_star_empty" !== t[d][c].getCurrentAnimation() && "state_highlight" !== t[d][c].getCurrentAnimation() &&
                "state_star_highlight" !== t[d][c].getCurrentAnimation()) return null
        }
        return a
    };
    this.highlightLine = function(a) {
        for (var b = 0; b < a.length; b++) {
            var d = z[a[b]].row,
                c = z[a[b]].col;
            d === STAR_COORD.row && c === STAR_COORD.col ? t[d][c].gotoAndStop("state_star_highlight") : t[d][c].gotoAndStop("state_highlight")
        }
    };
    this.removePreviousCombo = function() {
        for (var a = 0; a < t.length; a++)
            for (var b = 0; b < t[a].length; b++) "state_highlight" === t[a][b].getCurrentAnimation() && t[a][b].gotoAndStop("state_extracted"), "state_star_highlight" === t[a][b].getCurrentAnimation() &&
                t[a][b].gotoAndStop("state_star_empty")
    };
    this.printGrid = function() {
        for (var a = 0; a < CARD_ROWS; a++)
            for (var b = 0; b < CARD_COLS; b++) trace("_aGrid[" + a + "][" + b + "]: " + l[a][b])
    };
    this.setPos = function(a, b) {
        A.x = a;
        A.y = b
    };
    this.getBounds = function() {
        return A.getBounds()
    };
    this.getRow = function(a) {
        return e[a]
    };
    this.getCol = function(a) {
        return u[a]
    };
    this.getDiag = function(a) {
        return v[a]
    };
    this.getRowHighlighted = function() {
        return d.length
    };
    this.getWinIndex = function() {
        switch (n) {
            case WIN_TYPE_DIAGONAL:
                var a = 0;
                break;
            case WIN_TYPE_COLUMN:
                a =
                    1;
                break;
            case WIN_TYPE_ANY_ROW:
                a = 2;
                break;
            case WIN_TYPE_ANY_2_ROWS:
                a = 3;
                break;
            case WIN_TYPE_ANY_3_ROWS:
                a = 4;
                break;
            case WIN_TYPE_ANY_4_ROWS:
                a = 5;
                break;
            case WIN_TYPE_BINGO:
                a = 6;
                break;
            default:
                a = -1
        }
        return a
    };
    var H = f;
    this._init(a, c, b)
}

function CCardCell(a, c, b, f, m, g, h, k) {
    var n, d, l, t, e;
    this._init = function(a, b, c, f, k, m, h) {
        n = [];
        d = [];
        l = m;
        t = new createjs.Container;
        t.x = a;
        t.y = b;
        f.addChild(t);
        e = createSprite(c, "state_" + k, g / 2, g / 2, g, g);
        t.addChild(e);
        k === LABEL_EMPTY && (a = new createjs.Text(l, " 64px " + PRIMARY_FONT, "#000"), a.y = 6, a.textAlign = "center", a.textBaseline = "middle", t.addChild(a));
        if (!h) t.on("click", this._onCellClick, this)
    };
    this.unload = function() {
        k || t.removeAllEventListeners();
        f.removeChild(t)
    };
    this.addEventListener = function(a, b, c, e) {
        n[a] =
            b;
        d[a] = c
    };
    this._onCellClick = function() {
        n[ON_NUM_CLICK] && n[ON_NUM_CLICK].call(d[ON_NUM_CLICK], l)
    };
    this.gotoAndStop = function(a) {
        e.gotoAndStop(a)
    };
    this.getCurrentAnimation = function() {
        return e.currentAnimation
    };
    this.setValue = function(a) {
        l = a
    };
    this._init(a, c, b, f, m, h, k)
}

function CMsgBox(a) {
    var c, b, f, m, g, h, k, n, d;
    this._init = function(a) {
        c = [];
        b = [];
        h = new createjs.Container;
        h.x = CANVAS_WIDTH / 2;
        h.y = CANVAS_HEIGHT / 2;
        h.alpha = 0;
        h.visible = !1;
        h.on("click", function() {}, this);
        m = new createjs.Shape;
        m.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.addChild(m);
        g = new createjs.Container;
        h.addChild(g);
        f = createBitmap(a);
        f.regX = a.width / 2;
        f.regY = a.height / 2;
        g.addChild(f);
        k = new CTLText(h, -250, -250, 500, 250, 100, "center", "#fff", PRIMARY_FONT,
            1, 0, 0, " ", !0, !0, !0, !1);
        n = new CTextButton(0, 150, s_oSpriteLibrary.getSprite("but_gui"), TEXT_EXIT, PRIMARY_FONT, "#ffffff", 50, 0, g);
        n.addEventListener(ON_MOUSE_UP, this._onExit, this);
        d = new CTextButton(0, 100, s_oSpriteLibrary.getSprite("but_gui"), TEXT_RECHARGE, PRIMARY_FONT, "#ffffff", 50, 0, g);
        d.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
        s_oStage.addChild(h)
    };
    this.unload = function() {
        s_oStage.removeChild(h);
        n.unload();
        d.unload();
        h.removeAllEventListeners()
    };
    this.refreshButtonPos = function() {
        smartResize(g,
            40, 40)
    };
    this.addEventListener = function(a, d, e) {
        c[a] = d;
        b[a] = e
    };
    this.show = function(a, b) {
        playSound("game_over", 1, !1);
        k.refreshText(a);
        h.visible = !0;
        createjs.Tween.get(h).to({
            alpha: 1
        }, 500);
        b ? (n.setPosition(0, 200), d.setVisible(!0)) : (n.setPosition(0, 150), d.setVisible(!1))
    };
    this.showAndHide = function(a) {
        k.refreshText(a);
        h.visible = !0;
        var b = this;
        createjs.Tween.get(h).to({
            alpha: 1
        }, 500, createjs.Ease.cubicOut).wait(500).to({
            alpha: 0
        }, 500, createjs.Ease.cubicIn).call(function() {
            b.hide()
        })
    };
    this.centerMessage = function() {
        k.setY(-125)
    };
    this.hideButtons = function() {
        n.setVisible(!1);
        d.setVisible(!1)
    };
    this.hide = function() {
        h.visible = !1
    };
    this._onExit = function() {
        this.hide();
        c[ON_BUT_EXIT] && c[ON_BUT_EXIT].call(b[ON_BUT_EXIT])
    };
    this._onRecharge = function() {
        this.hide();
        c[ON_BUT_RECHARGE] && c[ON_BUT_RECHARGE].call(b[ON_BUT_RECHARGE])
    };
    this._init(a);
    return this
}

function CNumberBoard(a, c, b) {
    var f = NUM_NUMBERS / 5,
        m, g, h, k;
    this._init = function(a, b) {
        h = new createjs.Container;
        h.x = a;
        h.y = b;
        n.addChild(h);
        var d = s_oSpriteLibrary.getSprite("board_bg");
        g = createBitmap(d);
        g.regX = d.width / 2;
        g.regY = d.height / 2;
        h.addChild(g);
        k = new createjs.Container;
        n.addChild(k);
        this._initGrid()
    };
    this._initGrid = function() {
        var a = s_oSpriteLibrary.getSprite("board_cell"),
            b = a.width / 3,
            c = a.height;
        a = new createjs.SpriteSheet({
            images: [a],
            frames: {
                width: b,
                height: c,
                regX: b / 2,
                regY: c / 2
            },
            animations: {
                state_1: [0],
                state_2: [1],
                state_3: [2]
            }
        });
        var e = "state_1";
        m = [];
        for (var n = b * (f - 1), g = 4 * c, h = 0; 5 > h; h++)
            for (var r = 0; r < f; r++) {
                var B = new CNumberBoardCell(-n / 2 + n / (f - 1) * r, -g / 2 + g / 4 * h, h * f + (r + 1), b, c, a, k);
                e = "state_1" === e ? "state_2" : "state_1";
                B.setState(e);
                m.push(B)
            }
    };
    this.reset = function() {
        for (var a = "state_1", b = 0; b < m.length; b++) a = "state_1" === a ? "state_2" : "state_1", m[b].setState(a)
    };
    this.numExtracted = function(a) {
        m[a - 1].setState("state_3")
    };
    this.setHorizontal = function() {
        var a = s_oSpriteLibrary.getSprite("board_bg_horiz");
        g.image =
            a;
        g.regX = a.width / 2;
        g.regY = a.height / 2;
        g.x = 0;
        g.y = g.getBounds().height / 2;
        k.x = g.x + 28;
        k.y = g.y;
        a = s_oSpriteLibrary.getSprite("board_cell");
        var b = a.width / 3 * (f - 1);
        a = 4 * a.height;
        for (var c = 0, e = 0; 5 > e; e++)
            for (var n = 0; n < f; n++) m[c].setPos(-b / 2 + b / (f - 1) * n, -a / 2 + a / 4 * e), c++
    };
    this.setVertical = function() {
        var a = s_oSpriteLibrary.getSprite("board_bg");
        g.image = a;
        g.regX = a.width / 2;
        g.regY = a.height / 2;
        g.x = -g.getBounds().width / 2;
        g.y = g.getBounds().height / 2;
        k.x = g.x;
        k.y = g.y + 28;
        a = s_oSpriteLibrary.getSprite("board_cell");
        var b = a.width /
            3 * 4;
        a = a.height * (f - 1);
        for (var c = 0, e = 0; 5 > e; e++)
            for (var n = 0; n < f; n++) m[c].setPos(-b / 2 + b / 4 * e, -a / 2 + a / (f - 1) * n), c++
    };
    var n = b;
    this._init(a, c)
}

function CNumberBoardCell(a, c, b, f, m, g, h) {
    var k, n, d, l;
    this._init = function(a, b, c, f, g, h) {
        l = new createjs.Container;
        l.x = a;
        l.y = b;
        t.addChild(l);
        k = createSprite(h, "", 0, 0, f, g);
        l.addChild(k);
        d = new createjs.Text(c, "36px " + PRIMARY_FONT, "#000");
        d.x = 1;
        d.y = 5;
        d.textAlign = "center";
        d.textBaseline = "middle";
        l.addChild(d);
        n = new createjs.Text(c, "36px " + PRIMARY_FONT, "#fff");
        n.y = 4;
        n.textAlign = "center";
        n.textBaseline = "middle";
        l.addChild(n)
    };
    this.setState = function(a) {
        k.gotoAndStop(a);
        n.color = "state_3" === a ? "#ffc103" : "#fff"
    };
    this.setPos = function(a, b) {
        l.x = a;
        l.y = b
    };
    var t = h;
    this._init(a, c, b, f, m, g)
}

function CBallExtracted(a, c, b, f, m, g, h, k, n) {
    var d, l, t, e, u;
    this._init = function(a, b, c, f, k, n, g, h) {
        d = k;
        u = new createjs.Container;
        u.x = a;
        u.y = b;
        v.addChild(u);
        l = createSprite(h, k, c / 2, f / 2, c, f);
        l.gotoAndStop(k);
        u.addChild(l);
        t = new createjs.Text("", n + "px " + PRIMARY_FONT, "#222");
        t.y = 2;
        t.textAlign = "center";
        t.textBaseline = "middle";
        t.outline = g;
        u.addChild(t);
        e = new createjs.Text("", n + "px " + PRIMARY_FONT, "#fff");
        e.y = t.y;
        e.textAlign = "center";
        e.textBaseline = "middle";
        u.addChild(e)
    };
    this.setMask = function(a) {
        u.mask = a; - 1 < navigator.userAgent.indexOf("Chrome/50.0") &&
            (u.compositeOperation = "hard-light")
    };
    this.unload = function() {
        v.removeChild(u)
    };
    this.setText = function(a) {
        t.text = a;
        e.text = a
    };
    this.setSprite = function(a) {
        l.gotoAndStop(a)
    };
    this.moveX = function(a, b, c) {
        createjs.Tween.get(u).to({
            x: a
        }, 300, createjs.Ease.cubicOut).call(function() {
            b.call(c)
        })
    };
    this.moveY = function(a, b, c, d) {
        this.setText(b);
        createjs.Tween.get(u).to({
            y: a
        }, 300, createjs.Ease.cubicOut).call(function() {
            c.call(d)
        })
    };
    this.getX = function() {
        return u.x + l.x
    };
    this.getY = function() {
        return u.y + l.y
    };
    this.getColor =
        function() {
            return d
        };
    var v = n;
    this._init(a, c, b, f, m, g, h, k)
}
var WIN_TYPE_DIAGONAL = "diagonal",
    WIN_TYPE_COLUMN = "column",
    WIN_TYPE_ANY_ROW = "any_row",
    WIN_TYPE_ANY_2_ROWS = "any_2_rows",
    WIN_TYPE_ANY_3_ROWS = "any_3_rows",
    WIN_TYPE_ANY_4_ROWS = "any_4_rows",
    WIN_TYPE_BINGO = "bingo",
    PAYTABLE_WIN_SCHEME = [];
PAYTABLE_WIN_SCHEME[WIN_TYPE_DIAGONAL] = [
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1]
];
PAYTABLE_WIN_SCHEME[WIN_TYPE_COLUMN] = [
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0]
];
PAYTABLE_WIN_SCHEME[WIN_TYPE_ANY_ROW] = [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
PAYTABLE_WIN_SCHEME[WIN_TYPE_ANY_2_ROWS] = [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0]
];
PAYTABLE_WIN_SCHEME[WIN_TYPE_ANY_3_ROWS] = [
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1]
];
PAYTABLE_WIN_SCHEME[WIN_TYPE_ANY_4_ROWS] = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0]
];
PAYTABLE_WIN_SCHEME[WIN_TYPE_BINGO] = [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1]
];

function CPaytablePanel(a) {
    var c, b, f, m;
    this._init = function() {
        m = new createjs.Shape;
        m.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        m.visible = !1;
        m.on("click", function() {});
        h.addChild(m);
        f = new createjs.Container;
        f.on("click", function() {});
        f.visible = !1;
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT / 2;
        h.addChild(f);
        var a = s_oSpriteLibrary.getSprite("msg_box"),
            c = createBitmap(a);
        c.regX = a.width / 2;
        c.regY = a.height / 2;
        f.addChild(c);
        new CTLText(f, -250, -322, 500, 44, 44, "center", "#ffc103", PRIMARY_FONT,
            1, 0, 0, TEXT_PAYTABLE, !0, !0, !1, !1);
        this._initCards();
        b = new CTextButton(226, 276, s_oSpriteLibrary.getSprite("but_gui"), TEXT_PLAY, PRIMARY_FONT, "#ffffff", 50, 0, f);
        b.addEventListener(ON_MOUSE_UP, this._onButPlay, this)
    };
    this.unload = function() {
        b.unload();
        f.removeAllEventListeners()
    };
    this.refreshButtonPos = function() {
        smartResize(f, 40, 40)
    };
    this.show = function() {
        f.visible = !0;
        m.visible = !0;
        createjs.Ticker.paused = !0
    };
    this.hide = function() {
        f.visible = !1;
        m.visible = !1;
        createjs.Ticker.paused = !1
    };
    this._initCards = function() {
        var a =
            s_oSpriteLibrary.getSprite("card_cell"),
            b = a.width / 5;
        a = new createjs.SpriteSheet({
            images: [a],
            frames: {
                width: b,
                height: b,
                regX: b / 2,
                regY: b / 2
            },
            animations: {
                state_empty: [0],
                state_extracted: [1],
                state_highlight: [2],
                state_star_empty: [3],
                state_star_highlight: [4]
            }
        });
        c = [];
        c[0] = new CPaytableCard(-170, -190, b, 0, a, f, PAYTABLE_WIN_SCHEME[WIN_TYPE_DIAGONAL]);
        c[1] = new CPaytableCard(0, -190, b, 1, a, f, PAYTABLE_WIN_SCHEME[WIN_TYPE_COLUMN]);
        c[2] = new CPaytableCard(170, -190, b, 2, a, f, PAYTABLE_WIN_SCHEME[WIN_TYPE_ANY_ROW]);
        c[3] = new CPaytableCard(-170,
            0, b, 0, a, f, PAYTABLE_WIN_SCHEME[WIN_TYPE_ANY_2_ROWS]);
        c[4] = new CPaytableCard(0, 0, b, 1, a, f, PAYTABLE_WIN_SCHEME[WIN_TYPE_ANY_3_ROWS]);
        c[5] = new CPaytableCard(170, 0, b, 2, a, f, PAYTABLE_WIN_SCHEME[WIN_TYPE_ANY_4_ROWS]);
        c[6] = new CPaytableCard(0, 190, b, 2, a, f, PAYTABLE_WIN_SCHEME[WIN_TYPE_BINGO])
    };
    this.initPrizes = function(a) {
        for (var b = 0; b < c.length; b++) c[b].setMsg(TEXT_PAYTABLE_PRIZES[b] + ": x" + a[b])
    };
    this._onButPlay = function() {
        g.hide()
    };
    var g = this;
    var h = a;
    this._init()
}

function CPaytableCard(a, c, b, f, m, g, h) {
    var k, n;
    this._init = function(a, b, c, f, g, h) {
        n = new createjs.Container;
        n.x = a;
        n.y = b;
        n.scaleX = n.scaleY = .25;
        d.addChild(n);
        a = c * (h[0].length - 1);
        b = c * (h.length - 1);
        for (var e = 0; e < h.length; e++)
            for (var l = 0; l < h[e].length; l++) {
                var m = e === STAR_COORD.row && l === STAR_COORD.col ? 0 === h[e][l] ? createSprite(g, "state_star_empty", 0, 0, c, c) : createSprite(g, "state_star_highlight", 0, 0, c, c) : 0 === h[e][l] ? createSprite(g, "state_empty", 0, 0, c, c) : createSprite(g, "state_highlight", 0, 0, c, c);
                m.x = -a / 2 + a / (h[e].length -
                    1) * l;
                m.y = -b / 2 + b / (h.length - 1) * e;
                n.addChild(m)
            }
        c = n.getBounds().height / 2 + c / 2;
        g = n.getBounds().width;
        k = new CTLText(n, -(g / 2), c - 35, g, 70, 70, "center", "#fff", PRIMARY_FONT, 1, 0, 0, TEXT_PAYTABLE_PRIZES[f], !0, !0, !1, !1)
    };
    this.setMsg = function(a) {
        k.refreshText(a)
    };
    var d = g;
    this._init(a, c, b, f, m, h)
}

function CDisplayText(a, c, b, f, m, g, h) {
    var k, n;
    this._init = function(a, b, c, f, g, h) {
        n = new createjs.Container;
        n.x = a;
        n.y = b;
        d.addChild(n);
        a = createBitmap(c);
        n.addChild(a);
        k = new CTLText(n, 20, 19, c.width - 40, c.height - 40, h, "center", "#fff", PRIMARY_FONT, 1, 0, 0, f, !0, !0, !1, !1);
        new CTLText(n, 0, -40, c.width, 36, 30, "center", "#fff", PRIMARY_FONT, 1, 10, 0, g, !0, !0, !1, !1)
    };
    this.setPosition = function(a, b) {
        n.x = a;
        n.y = b
    };
    this.changeText = function(a) {
        k.refreshText(a)
    };
    this.getX = function() {
        return n.x
    };
    this.getY = function() {
        return n.y
    };
    this.setHighlight =
        function() {
            createjs.Tween.get(k.getText(), {
                loop: !0
            }).to({
                alpha: 0
            }, 600, createjs.Ease.cubicIn).to({
                alpha: 1
            }, 600, createjs.Ease.cubicOut)
        };
    this.stopHighlight = function() {
        k.getText().alpha = 1;
        createjs.Tween.removeTweens(k.getText())
    };
    var d = h;
    this._init(a, c, b, f, m, g)
}

function CAreYouSurePanel(a) {
    var c, b, f, m, g, h;
    this._init = function() {
        c = [];
        b = [];
        f = new createjs.Shape;
        f.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.visible = !1;
        f.on("click", function() {});
        s_oStage.addChild(f);
        h = new createjs.Container;
        h.x = CANVAS_WIDTH / 2;
        h.y = CANVAS_HEIGHT / 2;
        h.visible = !1;
        k.addChild(h);
        var a = s_oSpriteLibrary.getSprite("msg_box"),
            d = createBitmap(a);
        d.regX = a.width / 2;
        d.regY = a.height / 2;
        h.addChild(d);
        new CTLText(h, -250, -200, 500, 250, 100, "center", "#fff", PRIMARY_FONT,
            1, 0, 0, TEXT_ARE_SURE, !0, !0, !0, !1);
        m = new CTextButton(170, 170, s_oSpriteLibrary.getSprite("but_gui"), TEXT_YES, PRIMARY_FONT, "#ffffff", 50, 0, h);
        m.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        g = new CTextButton(-170, 170, s_oSpriteLibrary.getSprite("but_gui"), TEXT_NO, PRIMARY_FONT, "#ffffff", 50, 0, h);
        g.addEventListener(ON_MOUSE_UP, this._onButNo, this)
    };
    this.unload = function() {
        m.unload();
        g.unload();
        f.removeAllEventListeners()
    };
    this.addEventListener = function(a, d, f) {
        c[a] = d;
        b[a] = f
    };
    this.refreshButtonPos = function() {
        smartResize(h,
            40, 40)
    };
    this.show = function() {
        h.visible = !0;
        f.visible = !0
    };
    this.hide = function() {
        h.visible = !1;
        f.visible = !1
    };
    this._onButYes = function() {
        this.hide();
        c[ON_BUT_YES] && c[ON_BUT_YES].call(b[ON_BUT_YES])
    };
    this._onButNo = function() {
        this.hide();
        c[ON_BUT_NO] && c[ON_BUT_NO].call(b[ON_BUT_NO])
    };
    var k = a;
    this._init()
}

function CCreditsPanel() {
    var a, c, b, f, m, g, h, k;
    this._init = function() {
        m = new createjs.Shape;
        m.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(m);
        k = new createjs.Container;
        k.x = CANVAS_WIDTH / 2;
        k.y = CANVAS_HEIGHT / 2;
        s_oStage.addChild(k);
        var n = s_oSpriteLibrary.getSprite("bg_credits");
        c = createBitmap(n);
        c.regX = n.width / 2;
        c.regY = n.height / 2;
        k.addChild(c);
        g = new createjs.Shape;
        g.graphics.beginFill("#0f0f0f").drawRect(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT);
        g.alpha = .01;
        a = g.on("click", this._onLogoButRelease);
        k.addChild(g);
        n = s_oSpriteLibrary.getSprite("but_exit");
        b = new CGfxButton(236, -104, n, k);
        b.addEventListener(ON_MOUSE_UP, this.unload, this);
        f = new createjs.Text(TEXT_CREDITS_DEVELOPED, "36px " + PRIMARY_FONT, "#ffffff");
        f.y = -80;
        f.textAlign = "center";
        k.addChild(f);
        n = s_oSpriteLibrary.getSprite("logo_credits");
        var d = createBitmap(n);
        d.regX = n.width / 2;
        d.regY = n.height / 2;
        k.addChild(d);
        h = new createjs.Text("www.codethislab.com", "34px " + PRIMARY_FONT, "#ffffff");
        h.y = 50;
        h.textAlign = "center";
        k.addChild(h)
    };
    this.unload = function() {
        g.off("click", a);
        b.unload();
        b = null;
        s_oStage.removeChild(m);
        s_oStage.removeChild(k);
        s_oMenu.onExitCredits()
    };
    this.refreshButtonPos = function() {
        smartResize(k, 40, 40)
    };
    this._onLogoButRelease = function() {
        window.open("http://www.codethislab.com/index.php?&l=en")
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
    setShadow: function(a, c, b, f) {
        null !== this._oText && (this._oText.shadow = new createjs.Shadow(a, c, b, f))
    },
    setColor: function(a) {
        this._oText.color = a
    },
    setAlpha: function(a) {
        this._oText.alpha = a
    },
    setX: function(a) {
        this._x = a;
        this._oText.x = a
    },
    setY: function(a) {
        this._y = a;
        this._oText.y = a
    },
    removeTweens: function() {
        createjs.Tween.removeTweens(this._oText)
    },
    getText: function() {
        return this._oText
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

function CTLText(a, c, b, f, m, g, h, k, n, d, l, t, e, u, v, z, r) {
    this._oContainer = a;
    this._x = c;
    this._y = b;
    this._iWidth = f;
    this._iHeight = m;
    this._bMultiline = z;
    this._iFontSize = g;
    this._szAlign = h;
    this._szColor = k;
    this._szFont = n;
    this._iPaddingH = l;
    this._iPaddingV = t;
    this._bVerticalAlign = v;
    this._bFitText = u;
    this._bDebug = r;
    this._oDebugShape = null;
    this._fLineHeightFactor = d;
    this._oText = null;
    e && this.__createText(e)
}

function CGUIExpandible(a, c, b, f) {
    var m, g, h, k, n, d, l, t, e;
    this._init = function(a, b, c, f) {
        k = [];
        l = new createjs.Container;
        l.x = a;
        l.y = b;
        f.addChild(l);
        t = new createjs.Container;
        l.addChild(t);
        e = new createjs.Container;
        l.addChild(e);
        h = !1;
        d = new CGfxButton(0, 0, c, e);
        d.addEventListener(ON_MOUSE_UP, this._onMenu, this);
        n = new createjs.Shape;
        a = -c.width / 2 - 7 * c.width;
        n.graphics.beginFill("rgba(255,0,0,0.01)").drawRoundRectComplex(a, -c.height / 2, 7 * c.width, c.height, 20, 20, 20, 20);
        t.addChild(n);
        g = m = 74
    };
    this.unload = function() {
        d.unload();
        f.removeChild(l)
    };
    this.refreshPos = function() {
        l.x = a - s_iOffsetX;
        l.y = c + s_iOffsetY
    };
    this.addButton = function(a) {
        var b = a.getButtonImage();
        a.setMask(n);
        b.x = 0;
        b.y = 0;
        b.visible = !1;
        t.addChildAt(b, 0);
        k.push(b)
    };
    this._onMenu = function() {
        (h = !h) ? u._expand(): u._collapse()
    };
    this._expand = function() {
        for (var a = 0; a < k.length; a++) k[a].visible = !0, createjs.Tween.get(k[a], {
            override: !0
        }).wait(300 * a / 2).to({
            x: -m - a * g
        }, 300, createjs.Ease.cubicOut)
    };
    this._collapse = function() {
        for (var a = 0; a < k.length; a++) {
            var b = k[k.length - 1 - a];
            createjs.Tween.get(b, {
                override: !0
            }).wait(300 * a / 2).to({
                x: 0
            }, 300, createjs.Ease.cubicOut).call(function(a) {
                a.visible = !1
            }, [b])
        }
    };
    var u = this;
    this._init(a, c, b, f)
};