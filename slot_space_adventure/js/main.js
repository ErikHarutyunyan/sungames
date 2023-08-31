(function() {
    function b(f) {
        f = String(f);
        return f.charAt(0).toUpperCase() + f.slice(1)
    }

    function g(f, z) {
        var G = -1,
            x = f ? f.length : 0;
        if ("number" == typeof x && -1 < x && x <= t)
            for (; ++G < x;) z(f[G], G, f);
        else e(f, z)
    }

    function l(f) {
        f = String(f).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(f) ? f : b(f)
    }

    function e(f, z) {
        for (var G in f) y.call(f, G) && z(f[G], G, f)
    }

    function m(f) {
        return null == f ? b(f) : K.call(f).slice(8, -1)
    }

    function h(f, z) {
        var G = null != f ? typeof f[z] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(G) &&
            ("object" == G ? !!f[z] : !0)
    }

    function q(f) {
        return String(f).replace(/([ -])(?!$)/g, "$1?")
    }

    function n(f, z) {
        var G = null;
        g(f, function(x, B) {
            G = z(G, x, B, f)
        });
        return G
    }

    function k(f) {
        function z(R) {
            return n(R, function(Q, O) {
                var U = O.pattern || q(O);
                !Q && (Q = RegExp("\\b" + U + " *\\d+[.\\w_]*", "i").exec(f) || RegExp("\\b" + U + " *\\w+-[\\w]*", "i").exec(f) || RegExp("\\b" + U + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(f)) && ((Q = String(O.label && !RegExp(U, "i").test(O.label) ? O.label : Q).split("/"))[1] && !/[\d.]+/.test(Q[0]) && (Q[0] +=
                    " " + Q[1]), O = O.label || O, Q = l(Q[0].replace(RegExp(U, "i"), O).replace(RegExp("; *(?:" + O + "[_-])?", "i"), " ").replace(RegExp("(" + O + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return Q
            })
        }

        function G(R) {
            return n(R, function(Q, O) {
                return Q || (RegExp(O + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(f) || 0)[1] || null
            })
        }
        var x = p,
            B = f && "object" == typeof f && "String" != m(f);
        B && (x = f, f = null);
        var J = x.navigator || {},
            A = J.userAgent || "";
        f || (f = A);
        var E = B ? !!J.likeChrome : /\bChrome\b/.test(f) && !/internal|\n/i.test(K.toString()),
            P = B ? "Object" : "ScriptBridgingProxyObject",
            S = B ? "Object" : "Environment",
            C = B && x.java ? "JavaPackage" : m(x.java),
            W = B ? "Object" : "RuntimeObject";
        S = (C = /\bJava/.test(C) && x.java) && m(x.environment) == S;
        var I = C ? "a" : "\u03b1",
            X = C ? "b" : "\u03b2",
            Z = x.document || {},
            T = x.operamini || x.opera,
            aa = v.test(aa = B && T ? T["[[Class]]"] : m(T)) ? aa : T = null,
            a, r = f;
        B = [];
        var F = null,
            M = f == A;
        A = M && T && "function" == typeof T.version && T.version();
        var H = function(R) {
                return n(R, function(Q, O) {
                    return Q || RegExp("\\b" + (O.pattern || q(O)) + "\\b", "i").exec(f) && (O.label ||
                        O)
                })
            }([{
                label: "EdgeHTML",
                pattern: "Edge"
            }, "Trident", {
                label: "WebKit",
                pattern: "AppleWebKit"
            }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
            w = function(R) {
                return n(R, function(Q, O) {
                    return Q || RegExp("\\b" + (O.pattern || q(O)) + "\\b", "i").exec(f) && (O.label || O)
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
            N = z([{
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
            V = function(R) {
                return n(R, function(Q, O, U) {
                    return Q || (O[N] || O[/^[a-z]+(?: +[a-z]+\b)*/i.exec(N)] || RegExp("\\b" + q(U) + "(?:\\b|\\w*\\d)", "i").exec(f)) && U
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
            D = function(R) {
                return n(R, function(Q, O) {
                    var U = O.pattern || q(O);
                    if (!Q && (Q = RegExp("\\b" + U + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(f))) {
                        var Y = Q,
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
                        U && ba && /^Win/i.test(Y) && !/^Windows Phone /i.test(Y) && (ca = ca[/[\d.]+$/.exec(Y)]) && (Y = "Windows " + ca);
                        Y = String(Y);
                        U && ba && (Y = Y.replace(RegExp(U, "i"), ba));
                        Q = Y = l(Y.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/,
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
        H && (H = [H]);
        V && !N && (N = z([V]));
        if (a = /\bGoogle TV\b/.exec(N)) N = a[0];
        /\bSimulator\b/i.test(f) && (N = (N ? N + " " : "") + "Simulator");
        "Opera Mini" == w && /\bOPiOS\b/.test(f) && B.push("running in Turbo/Uncompressed mode");
        "IE" == w && /\blike iPhone OS\b/.test(f) ? (a = k(f.replace(/like iPhone OS/, "")), V = a.manufacturer, N = a.product) : /^iP/.test(N) ? (w || (w = "Safari"), D = "iOS" + ((a = / OS ([\d_]+)/i.exec(f)) ? " " + a[1].replace(/_/g, ".") : "")) : "Konqueror" != w || /buntu/i.test(D) ? V && "Google" != V &&
            (/Chrome/.test(w) && !/\bMobile Safari\b/i.test(f) || /\bVita\b/.test(N)) || /\bAndroid\b/.test(D) && /^Chrome/.test(w) && /\bVersion\//i.test(f) ? (w = "Android Browser", D = /\bAndroid\b/.test(D) ? D : "Android") : "Silk" == w ? (/\bMobi/i.test(f) || (D = "Android", B.unshift("desktop mode")), /Accelerated *= *true/i.test(f) && B.unshift("accelerated")) : "PaleMoon" == w && (a = /\bFirefox\/([\d.]+)\b/.exec(f)) ? B.push("identifying as Firefox " + a[1]) : "Firefox" == w && (a = /\b(Mobile|Tablet|TV)\b/i.exec(f)) ? (D || (D = "Firefox OS"), N || (N = a[1])) : !w ||
            (a = !/\bMinefield\b/i.test(f) && /\b(?:Firefox|Safari)\b/.exec(w)) ? (w && !N && /[\/,]|^[^(]+?\)/.test(f.slice(f.indexOf(a + "/") + 8)) && (w = null), (a = N || V || D) && (N || V || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(D)) && (w = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(D) ? D : a) + " Browser")) : "Electron" == w && (a = (/\bChrome\/([\d.]+)\b/.exec(f) || 0)[1]) && B.push("Chromium " + a) : D = "Kubuntu";
        A || (A = G(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", q(w),
            "(?:Firefox|Minefield|NetFront)"
        ]));
        if (a = "iCab" == H && 3 < parseFloat(A) && "WebKit" || /\bOpera\b/.test(w) && (/\bOPR\b/.test(f) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(f) && !/^(?:Trident|EdgeHTML)$/.test(H) && "WebKit" || !H && /\bMSIE\b/i.test(f) && ("Mac OS" == D ? "Tasman" : "Trident") || "WebKit" == H && /\bPlayStation\b(?! Vita\b)/i.test(w) && "NetFront") H = [a];
        "IE" == w && (a = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(f) || 0)[1]) ? (w += " Mobile", D = "Windows Phone " + (/\+$/.test(a) ? a : a + ".x"), B.unshift("desktop mode")) : /\bWPDesktop\b/i.test(f) ?
            (w = "IE Mobile", D = "Windows Phone 8.x", B.unshift("desktop mode"), A || (A = (/\brv:([\d.]+)/.exec(f) || 0)[1])) : "IE" != w && "Trident" == H && (a = /\brv:([\d.]+)/.exec(f)) && (w && B.push("identifying as " + w + (A ? " " + A : "")), w = "IE", A = a[1]);
        if (M) {
            if (h(x, "global"))
                if (C && (a = C.lang.System, r = a.getProperty("os.arch"), D = D || a.getProperty("os.name") + " " + a.getProperty("os.version")), S) {
                    try {
                        A = x.require("ringo/engine").version.join("."), w = "RingoJS"
                    } catch (R) {
                        (a = x.system) && a.global.system == x.system && (w = "Narwhal", D || (D = a[0].os || null))
                    }
                    w ||
                        (w = "Rhino")
                } else "object" == typeof x.process && !x.process.browser && (a = x.process) && ("object" == typeof a.versions && ("string" == typeof a.versions.electron ? (B.push("Node " + a.versions.node), w = "Electron", A = a.versions.electron) : "string" == typeof a.versions.nw && (B.push("Chromium " + A, "Node " + a.versions.node), w = "NW.js", A = a.versions.nw)), w || (w = "Node.js", r = a.arch, D = a.platform, A = (A = /[\d.]+/.exec(a.version)) ? A[0] : null));
            else m(a = x.runtime) == P ? (w = "Adobe AIR", D = a.flash.system.Capabilities.os) : m(a = x.phantom) == W ? (w = "PhantomJS",
                A = (a = a.version || null) && a.major + "." + a.minor + "." + a.patch) : "number" == typeof Z.documentMode && (a = /\bTrident\/(\d+)/i.exec(f)) ? (A = [A, Z.documentMode], (a = +a[1] + 4) != A[1] && (B.push("IE " + A[1] + " mode"), H && (H[1] = ""), A[1] = a), A = "IE" == w ? String(A[1].toFixed(1)) : A[0]) : "number" == typeof Z.documentMode && /^(?:Chrome|Firefox)\b/.test(w) && (B.push("masking as " + w + " " + A), w = "IE", A = "11.0", H = ["Trident"], D = "Windows");
            D = D && l(D)
        }
        A && (a = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(A) || /(?:alpha|beta)(?: ?\d)?/i.exec(f + ";" + (M && J.appMinorVersion)) ||
            /\bMinefield\b/i.test(f) && "a") && (F = /b/i.test(a) ? "beta" : "alpha", A = A.replace(RegExp(a + "\\+?$"), "") + ("beta" == F ? X : I) + (/\d+\+?/.exec(a) || ""));
        if ("Fennec" == w || "Firefox" == w && /\b(?:Android|Firefox OS)\b/.test(D)) w = "Firefox Mobile";
        else if ("Maxthon" == w && A) A = A.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(N)) "Xbox 360" == N && (D = null), "Xbox 360" == N && /\bIEMobile\b/.test(f) && B.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(w) && (!w || N || /Browser|Mobi/.test(w)) || "Windows CE" != D && !/Mobi/i.test(f))
            if ("IE" ==
                w && M) try {
                null === x.external && B.unshift("platform preview")
            } catch (R) {
                B.unshift("embedded")
            } else(/\bBlackBerry\b/.test(N) || /\bBB10\b/.test(f)) && (a = (RegExp(N.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(f) || 0)[1] || A) ? (a = [a, /BB10/.test(f)], D = (a[1] ? (N = null, V = "BlackBerry") : "Device Software") + " " + a[0], A = null) : this != e && "Wii" != N && (M && T || /Opera/.test(w) && /\b(?:MSIE|Firefox)\b/i.test(f) || "Firefox" == w && /\bOS X (?:\d+\.){2,}/.test(D) || "IE" == w && (D && !/^Win/.test(D) && 5.5 < A || /\bWindows XP\b/.test(D) && 8 < A || 8 == A && !/\bTrident\b/.test(f))) &&
                !v.test(a = k.call(e, f.replace(v, "") + ";")) && a.name && (a = "ing as " + a.name + ((a = a.version) ? " " + a : ""), v.test(w) ? (/\bIE\b/.test(a) && "Mac OS" == D && (D = null), a = "identify" + a) : (a = "mask" + a, w = aa ? l(aa.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(a) && (D = null), M || (A = null)), H = ["Presto"], B.push(a));
            else w += " Mobile";
        if (a = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(f) || 0)[1]) {
            a = [parseFloat(a.replace(/\.(\d)$/, ".0$1")), a];
            if ("Safari" == w && "+" == a[1].slice(-1)) w = "WebKit Nightly", F = "alpha", A = a[1].slice(0, -1);
            else if (A ==
                a[1] || A == (a[2] = (/\bSafari\/([\d.]+\+?)/i.exec(f) || 0)[1])) A = null;
            a[1] = (/\bChrome\/([\d.]+)/i.exec(f) || 0)[1];
            537.36 == a[0] && 537.36 == a[2] && 28 <= parseFloat(a[1]) && "WebKit" == H && (H = ["Blink"]);
            M && (E || a[1]) ? (H && (H[1] = "like Chrome"), a = a[1] || (a = a[0], 530 > a ? 1 : 532 > a ? 2 : 532.05 > a ? 3 : 533 > a ? 4 : 534.03 > a ? 5 : 534.07 > a ? 6 : 534.1 > a ? 7 : 534.13 > a ? 8 : 534.16 > a ? 9 : 534.24 > a ? 10 : 534.3 > a ? 11 : 535.01 > a ? 12 : 535.02 > a ? "13+" : 535.07 > a ? 15 : 535.11 > a ? 16 : 535.19 > a ? 17 : 536.05 > a ? 18 : 536.1 > a ? 19 : 537.01 > a ? 20 : 537.11 > a ? "21+" : 537.13 > a ? 23 : 537.18 > a ? 24 : 537.24 > a ? 25 : 537.36 >
                a ? 26 : "Blink" != H ? "27" : "28")) : (H && (H[1] = "like Safari"), a = (a = a[0], 400 > a ? 1 : 500 > a ? 2 : 526 > a ? 3 : 533 > a ? 4 : 534 > a ? "4+" : 535 > a ? 5 : 537 > a ? 6 : 538 > a ? 7 : 601 > a ? 8 : "8"));
            H && (H[1] += " " + (a += "number" == typeof a ? ".x" : /[.+]/.test(a) ? "" : "+"));
            "Safari" == w && (!A || 45 < parseInt(A)) && (A = a)
        }
        "Opera" == w && (a = /\bzbov|zvav$/.exec(D)) ? (w += " ", B.unshift("desktop mode"), "zvav" == a ? (w += "Mini", A = null) : w += "Mobile", D = D.replace(RegExp(" *" + a + "$"), "")) : "Safari" == w && /\bChrome\b/.exec(H && H[1]) && (B.unshift("desktop mode"), w = "Chrome Mobile", A = null, /\bOS X\b/.test(D) ?
            (V = "Apple", D = "iOS 4.3+") : D = null);
        A && 0 == A.indexOf(a = /[\d.]+$/.exec(D)) && -1 < f.indexOf("/" + a + "-") && (D = String(D.replace(a, "")).replace(/^ +| +$/g, ""));
        H && !/\b(?:Avant|Nook)\b/.test(w) && (/Browser|Lunascape|Maxthon/.test(w) || "Safari" != w && /^iOS/.test(D) && /\bSafari\b/.test(H[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(w) && H[1]) && (a = H[H.length - 1]) && B.push(a);
        B.length && (B = ["(" + B.join("; ") + ")"]);
        V && N && 0 > N.indexOf(V) && B.push("on " + V);
        N && B.push((/^on /.test(B[B.length -
            1]) ? "" : "on ") + N);
        if (D) {
            var da = (a = / ([\d.+]+)$/.exec(D)) && "/" == D.charAt(D.length - a[0].length - 1);
            D = {
                architecture: 32,
                family: a && !da ? D.replace(a[0], "") : D,
                version: a ? a[1] : null,
                toString: function() {
                    var R = this.version;
                    return this.family + (R && !da ? " " + R : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }(a = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(r)) && !/\bi686\b/i.test(r) ? (D && (D.architecture = 64, D.family = D.family.replace(RegExp(" *" + a), "")), w && (/\bWOW64\b/i.test(f) || M && /\w(?:86|32)$/.test(J.cpuClass || J.platform) && !/\bWin64; x64\b/i.test(f)) &&
            B.unshift("32-bit")) : D && /^OS X/.test(D.family) && "Chrome" == w && 39 <= parseFloat(A) && (D.architecture = 64);
        f || (f = null);
        x = {};
        x.description = f;
        x.layout = H && H[0];
        x.manufacturer = V;
        x.name = w;
        x.prerelease = F;
        x.product = N;
        x.ua = f;
        x.version = w && A;
        x.os = D || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        x.parse = k;
        x.toString = function() {
            return this.description || ""
        };
        x.version && B.unshift(A);
        x.name && B.unshift(w);
        D && w && (D != String(D).split(" ")[0] || D != w.split(" ")[0] && !N) && B.push(N ? "(" + D + ")" : "on " +
            D);
        B.length && (x.description = B.join(" "));
        return x
    }
    var d = {
            "function": !0,
            object: !0
        },
        p = d[typeof window] && window || this,
        u = d[typeof exports] && exports;
    d = d[typeof module] && module && !module.nodeType && module;
    var c = u && d && "object" == typeof global && global;
    !c || c.global !== c && c.window !== c && c.self !== c || (p = c);
    var t = Math.pow(2, 53) - 1,
        v = /\bOpera/;
    c = Object.prototype;
    var y = c.hasOwnProperty,
        K = c.toString,
        L = k();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (p.platform = L, define(function() {
            return L
        })) : u &&
        d ? e(L, function(f, z) {
            u[z] = f
        }) : p.platform = L
}).call(this);

function buildIOSMeta() {
    for (var b = [{
            name: "viewport",
            content: "width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        }, {
            name: "apple-mobile-web-app-capable",
            content: "yes"
        }, {
            name: "apple-mobile-web-app-status-bar-style",
            content: "black"
        }], g = 0; g < b.length; g++) {
        var l = document.createElement("meta");
        l.name = b[g].name;
        l.content = b[g].content;
        var e = window.document.head.querySelector('meta[name="' + l.name + '"]');
        e && e.parentNode.removeChild(e);
        window.document.head.appendChild(l)
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
    } catch (b) {
        return !0
    }
}

function isIOSLessThen13() {
    var b = platform.os,
        g = b.family.toLowerCase();
    b = parseFloat(b.version);
    return "ios" === g && 13 > b ? !0 : !1
}
$(document).ready(function() {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && (buildIOSFullscreenPanel(), buildIOSMeta())
});
jQuery(window).resize(function() {
    platform && "iPhone" === platform.product && "safari" === platform.name.toLowerCase() && isIOSLessThen13() && !iosInIframe() && iosResize()
});
var s_iScaleFactor = 1,
    s_bIsIphone = !1,
    s_iOffsetX, s_iOffsetY, s_bFocus = !0;
(function(b) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(b.substr(0,
        4))
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});

function trace(b) {
    console.log(b)
}

function isIOS() {
    var b = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    if (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone")) return s_bIsIphone = !0;
    for (; b.length;)
        if (navigator.platform === b.pop()) return !0;
    return s_bIsIphone = !1
}

function isIpad() {
    var b = -1 !== navigator.userAgent.toLowerCase().indexOf("ipad");
    return !b && navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && 2 < navigator.maxTouchPoints ? !0 : b
}

function isMobile() {
    return isIpad() ? !0 : jQuery.browser.mobile
}

function getSize(b) {
    var g = b.toLowerCase(),
        l = window.document,
        e = l.documentElement;
    if (void 0 === window["inner" + b]) b = e["client" + b];
    else if (window["inner" + b] != e["client" + b]) {
        var m = l.createElement("body");
        m.id = "vpw-test-b";
        m.style.cssText = "overflow:scroll";
        var h = l.createElement("div");
        h.id = "vpw-test-d";
        h.style.cssText = "position:absolute;top:-1000px";
        h.innerHTML = "<style>@media(" + g + ":" + e["client" + b] + "px){body#vpw-test-b div#vpw-test-d{" + g + ":7px!important}}</style>";
        m.appendChild(h);
        e.insertBefore(m, l.head);
        b = 7 == h["offset" + b] ? e["client" + b] : window["inner" + b];
        e.removeChild(m)
    } else b = window["inner" + b];
    return b
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
    var b = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < b ? b : 0
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var b = null !== platform.name && "safari" === platform.name.toLowerCase() ? getIOSWindowHeight() : getSize("Height");
        var g = getSize("Width");
        s_bFocus && _checkOrientation(g, b);
        var l = Math.min(b / CANVAS_HEIGHT, g / CANVAS_WIDTH),
            e = Math.round(CANVAS_WIDTH * l);
        l = Math.round(CANVAS_HEIGHT * l);
        if (l < b) {
            var m = b - l;
            l += m;
            e += CANVAS_WIDTH / CANVAS_HEIGHT * m
        } else e < g && (m = g - e, e += m, l += CANVAS_HEIGHT / CANVAS_WIDTH * m);
        m = b / 2 - l / 2;
        var h = g / 2 - e / 2,
            q = CANVAS_WIDTH / e;
        if (h * q < -EDGEBOARD_X ||
            m * q < -EDGEBOARD_Y) l = Math.min(b / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), g / (CANVAS_WIDTH - 2 * EDGEBOARD_X)), e = Math.round(CANVAS_WIDTH * l), l = Math.round(CANVAS_HEIGHT * l), m = (b - l) / 2, h = (g - e) / 2, q = CANVAS_WIDTH / e;
        s_iOffsetX = -1 * h * q;
        s_iOffsetY = -1 * m * q;
        0 <= m && (s_iOffsetY = 0);
        0 <= h && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone ? (canvas = document.getElementById("canvas"), s_oStage.canvas.width = 2 * e, s_oStage.canvas.height =
            2 * l, canvas.style.width = e + "px", canvas.style.height = l + "px", g = Math.min(e / CANVAS_WIDTH, l / CANVAS_HEIGHT), s_iScaleFactor = 2 * g, s_oStage.scaleX = s_oStage.scaleY = 2 * g) : s_bMobile && !1 === isIOS() ? ($("#canvas").css("width", e + "px"), $("#canvas").css("height", l + "px")) : (s_oStage.canvas.width = e, s_oStage.canvas.height = l, s_iScaleFactor = Math.min(e / CANVAS_WIDTH, l / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > m || (m = (b - l) / 2);
        $("#canvas").css("top", m + "px");
        $("#canvas").css("left", h + "px");
        fullscreenHandler()
    }
}

function createBitmap(b, g, l) {
    var e = new createjs.Bitmap(b),
        m = new createjs.Shape;
    g && l ? m.graphics.beginFill("#fff").drawRect(0, 0, g, l) : m.graphics.beginFill("#ff0").drawRect(0, 0, b.width, b.height);
    e.hitArea = m;
    return e
}

function createSprite(b, g, l, e, m, h) {
    b = null !== g ? new createjs.Sprite(b, g) : new createjs.Sprite(b);
    g = new createjs.Shape;
    g.graphics.beginFill("#000000").drawRect(-l, -e, m, h);
    b.hitArea = g;
    return b
}

function _checkOrientation(b, g) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (b > g ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
        s_oMain.stopUpdate()))
}

function playSound(b, g, l) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[b].play(), s_aSounds[b].volume(g), s_aSounds[b].loop(l), s_aSounds[b]) : null
}

function stopSound(b) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[b].stop()
}

function setVolume(b, g) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[b].volume(g)
}

function setMute(b, g) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[b].mute(g)
}

function randomFloatBetween(b, g, l) {
    "undefined" === typeof l && (l = 2);
    return parseFloat(Math.min(b + Math.random() * (g - b), g).toFixed(l))
}

function shuffle(b) {
    for (var g = b.length, l, e; 0 !== g;) e = Math.floor(Math.random() * g), --g, l = b[g], b[g] = b[e], b[e] = l;
    return b
}

function formatTime(b) {
    b /= 1E3;
    var g = Math.floor(b / 60);
    b = parseFloat(b - 60 * g).toFixed(1);
    var l = "";
    l = 10 > g ? l + ("0" + g + ":") : l + (g + ":");
    return 10 > b ? l + ("0" + b) : l + b
}

function NoClickDelay(b) {
    this.element = b;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
NoClickDelay.prototype = {
    handleEvent: function(b) {
        switch (b.type) {
            case "touchstart":
                this.onTouchStart(b);
                break;
            case "touchmove":
                this.onTouchMove(b);
                break;
            case "touchend":
                this.onTouchEnd(b)
        }
    },
    onTouchStart: function(b) {
        b.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function(b) {
        this.moved = !0
    },
    onTouchEnd: function(b) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend",
            this, !1);
        if (!this.moved) {
            b = document.elementFromPoint(b.changedTouches[0].clientX, b.changedTouches[0].clientY);
            3 === b.nodeType && (b = b.parentNode);
            var g = document.createEvent("MouseEvents");
            g.initEvent("click", !0, !0);
            b.dispatchEvent(g)
        }
    }
};

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}

function getParamValue(b) {
    for (var g = window.location.search.substring(1).split("&"), l = 0; l < g.length; l++) {
        var e = g[l].split("=");
        if (e[0] == b) return e[1]
    }
}
(function() {
    function b(l) {
        var e = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        l = l || window.event;
        l.type in e ? document.body.className = e[l.type] : (document.body.className = this[g] ? "hidden" : "visible", "hidden" === document.body.className ? (s_oMain.stopUpdate(), s_bFocus = !1) : (s_oMain.startUpdate(), s_bFocus = !0))
    }
    var g = "hidden";
    g in document ? document.addEventListener("visibilitychange", b) : (g = "mozHidden") in document ? document.addEventListener("mozvisibilitychange",
        b) : (g = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", b) : (g = "msHidden") in document ? document.addEventListener("msvisibilitychange", b) : "onfocusin" in document ? document.onfocusin = document.onfocusout = b : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = b
})();

function fullscreenHandler() {
    ENABLE_FULLSCREEN && screenfull.isEnabled && (s_bFullscreen = screenfull.isFullscreen, null !== s_oInterface && s_oInterface.resetFullscreenBut(), null !== s_oMenu && s_oMenu.resetFullscreenBut())
}
if (screenfull.isEnabled) screenfull.on("change", function() {
    s_bFullscreen = screenfull.isFullscreen;
    null !== s_oInterface && s_oInterface.resetFullscreenBut();
    null !== s_oMenu && s_oMenu.resetFullscreenBut();
    null !== s_oLevelMenu && s_oLevelMenu.resetFullscreenBut()
});

function CSpriteLibrary() {
    var b = {},
        g, l, e, m, h, q;
    this.init = function(n, k, d) {
        g = {};
        e = l = 0;
        m = n;
        h = k;
        q = d
    };
    this.addSprite = function(n, k) {
        if (b.hasOwnProperty(n)) return !1;
        var d = new Image;
        b[n] = g[n] = {
            szPath: k,
            oSprite: d,
            bLoaded: !1
        };
        l++;
        return !0
    };
    this.getSprite = function(n) {
        return b.hasOwnProperty(n) ? b[n].oSprite : null
    };
    this._onSpritesLoaded = function() {
        l = 0;
        h.call(q)
    };
    this._onSpriteLoaded = function() {
        m.call(q);
        ++e === l && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var n in g) g[n].oSprite.oSpriteLibrary = this,
            g[n].oSprite.szKey = n, g[n].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey)
            }, g[n].oSprite.onerror = function(k) {
                var d = k.currentTarget;
                setTimeout(function() {
                    g[d.szKey].oSprite.src = g[d.szKey].szPath
                }, 500)
            }, g[n].oSprite.src = g[n].szPath
    };
    this.setLoaded = function(n) {
        b[n].bLoaded = !0
    };
    this.isLoaded = function(n) {
        return b[n].bLoaded
    };
    this.getNumSprites = function() {
        return l
    }
}
var CANVAS_WIDTH = 1500,
    CANVAS_HEIGHT = 640,
    EDGEBOARD_X = 300,
    EDGEBOARD_Y = 0,
    FONT_GAME = "walibi0615bold",
    FPS_TIME = 1E3 / 24,
    DISABLE_SOUND_MOBILE = !1,
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    GAME_STATE_IDLE = 0,
    GAME_STATE_SPINNING = 1,
    GAME_STATE_SHOW_ALL_WIN = 2,
    GAME_STATE_SHOW_WIN = 3,
    REEL_STATE_START = 0,
    REEL_STATE_MOVING = 1,
    REEL_STATE_STOP = 2,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    REEL_OFFSET_X = 380,
    REEL_OFFSET_Y = 123,
    NUM_REELS = 5,
    NUM_ROWS = 3,
    NUM_SYMBOLS = 10,
    WILD_SYMBOL = 10,
    BONUS_SYMBOL = 9,
    NUM_PAYLINES = 5,
    SYMBOL_SIZE = 140,
    SPACE_BETWEEN_SYMBOLS = 10,
    MAX_FRAMES_REEL_EASE = 16,
    MIN_REEL_LOOPS, REEL_DELAY, REEL_START_Y = REEL_OFFSET_Y - 3 * SYMBOL_SIZE,
    REEL_ARRIVAL_Y = REEL_OFFSET_Y + 3 * SYMBOL_SIZE,
    TIME_SHOW_WIN, TIME_SHOW_ALL_WINS, MIN_BET, MAX_BET, TOTAL_MONEY, MAX_NUM_HOLD, UFO_WIDTH = 174,
    UFO_HEIGHT = 248,
    NUM_ALIEN = 3,
    NUM_SYMBOLS_FOR_BONUS = 3,
    PERC_WIN_BONUS_PRIZE_1, PERC_WIN_BONUS_PRIZE_2, PERC_WIN_BONUS_PRIZE_3, SOUNDTRACK_VOLUME = .5,
    WIN_OCCURRENCE, SLOT_CASH, MIN_WIN, BONUS_OCCURRENCE, PAYTABLE_VALUES,
    BONUS_PRIZE = [
        [5, 50, 100],
        [10, 100, 200],
        [50, 200, 500]
    ],
    ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, SHOW_CREDITS, SOUNDTRACK_VOLUME_IN_GAME = 1;

function CSlotSettings() {
    this._init = function() {
        this._initSymbolSpriteSheets();
        this._initPaylines();
        this._initSymbolWin();
        this._initSymbolAnims();
        this._initSymbolsOccurence();
        this._initBonus()
    };
    this._initSymbolSpriteSheets = function() {
        s_aSymbolData = [];
        for (var b = 1; b < NUM_SYMBOLS + 1; b++) {
            var g = {
                images: [s_oSpriteLibrary.getSprite("symbol_" + b)],
                frames: {
                    width: SYMBOL_SIZE,
                    height: SYMBOL_SIZE,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    "static": [0, 1],
                    moving: [1, 2]
                }
            };
            s_aSymbolData[b] = new createjs.SpriteSheet(g)
        }
    };
    this._initPaylines =
        function() {
            s_aPaylineCombo = [
                [{
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
                }],
                [{
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
                }],
                [{
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
                }],
                [{
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
                }],
                [{
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
                }]
            ]
        };
    this._initSymbolAnims = function() {
        s_aSymbolAnims = [];
        var b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_1_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[0] = new createjs.SpriteSheet(b);
        b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_2_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[1] = new createjs.SpriteSheet(b);
        b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_3_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0,
                    1
                ],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[2] = new createjs.SpriteSheet(b);
        b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_4_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[3] = new createjs.SpriteSheet(b);
        b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_5_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[4] = new createjs.SpriteSheet(b);
        b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_6_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[5] = new createjs.SpriteSheet(b);
        b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_7_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[6] = new createjs.SpriteSheet(b);
        b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_8_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[7] = new createjs.SpriteSheet(b);
        b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_9_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1, 14]
            }
        };
        s_aSymbolAnims[8] = new createjs.SpriteSheet(b);
        b = {
            framerate: 20,
            images: [s_oSpriteLibrary.getSprite("symbol_10_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1,
                    14
                ]
            }
        };
        s_aSymbolAnims[9] = new createjs.SpriteSheet(b)
    };
    this._initSymbolWin = function() {
        s_aSymbolWin = [];
        s_aSymbolWin[0] = PAYTABLE_VALUES[0];
        s_aSymbolWin[1] = PAYTABLE_VALUES[1];
        s_aSymbolWin[2] = PAYTABLE_VALUES[2];
        s_aSymbolWin[3] = PAYTABLE_VALUES[3];
        s_aSymbolWin[4] = PAYTABLE_VALUES[4];
        s_aSymbolWin[5] = PAYTABLE_VALUES[5];
        s_aSymbolWin[6] = PAYTABLE_VALUES[6];
        s_aSymbolWin[7] = PAYTABLE_VALUES[7]
    };
    this._initSymbolsOccurence = function() {
        s_aRandSymbols = [];
        var b;
        for (b = 0; 1 > b; b++) s_aRandSymbols.push(1);
        for (b = 0; 2 > b; b++) s_aRandSymbols.push(2);
        for (b = 0; 3 > b; b++) s_aRandSymbols.push(3);
        for (b = 0; 4 > b; b++) s_aRandSymbols.push(4);
        for (b = 0; 4 > b; b++) s_aRandSymbols.push(5);
        for (b = 0; 6 > b; b++) s_aRandSymbols.push(6);
        for (b = 0; 7 > b; b++) s_aRandSymbols.push(7);
        for (b = 0; 8 > b; b++) s_aRandSymbols.push(8);
        for (b = 0; 2 > b; b++) s_aRandSymbols.push(9);
        for (b = 0; 1 > b; b++) s_aRandSymbols.push(10)
    };
    this._initBonus = function() {
        s_aAlienOccurence = [];
        var b;
        for (b = 0; b < PERC_WIN_BONUS_PRIZE_1; b++) s_aAlienOccurence.push(0);
        for (b = 0; b < PERC_WIN_BONUS_PRIZE_2; b++) s_aAlienOccurence.push(1);
        for (b = 0; b <
            PERC_WIN_BONUS_PRIZE_3; b++) s_aAlienOccurence.push(2)
    };
    this._init()
}
var s_aSymbolData, s_aPaylineCombo, s_aSymbolWin, s_aSymbolAnims, s_aRandSymbols, s_aAlienOccurence;
TEXT_MONEY = "MONEY";
TEXT_PLAY = "PLAY";
TEXT_BET = "BET";
TEXT_COIN = "COIN";
TEXT_MAX_BET = "MAX BET";
TEXT_INFO = "INFO";
TEXT_LINES = "LINES";
TEXT_SPIN = "SPIN";
TEXT_WIN = "WIN";
TEXT_HOLD = "HOLD";
TEXT_HELP_WILD = "JOLLY SYMBOL CAN REPLACE ANY OTHER SYMBOL TO MAKE UP A COMBO";
TEXT_HELP_BONUS = "3 OR MORE STARS LET YOU PLAY THE BONUS GAME!";
TEXT_CREDITS_DEVELOPED = "DEVELOPED BY";
TEXT_CURRENCY = "$";
var TEXT_PRELOADER_CONTINUE = "START",
    TEXT_NO_MONEY = "NO MONEY! DO YOU WANT TO RECHARGE?",
    TEXT_RECHARGE = "RECHARGE",
    TEXT_EXIT = "EXIT";
TEXT_CONGRATULATIONS = "Congratulations!";
TEXT_MSG_SHARE1 = "You collected <strong>";
TEXT_MSG_SHARE2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_MSG_SHARING1 = "My score is ";
TEXT_MSG_SHARING2 = " points! Can you do better?";

function CPreloader() {
    var b, g, l, e, m, h, q, n, k;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.loadSprites();
        k = new createjs.Container;
        s_oStage.addChild(k)
    };
    this.unload = function() {
        k.removeAllChildren()
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    };
    this.attachSprites = function() {
        var d = new createjs.Shape;
        d.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.addChild(d);
        d = s_oSpriteLibrary.getSprite("200x200");
        q = createBitmap(d);
        q.regX = .5 * d.width;
        q.regY = .5 * d.height;
        q.x = CANVAS_WIDTH / 2;
        q.y = CANVAS_HEIGHT / 2 - 180;
        k.addChild(q);
        n = new createjs.Shape;
        n.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(q.x - 100, q.y - 100, 200, 200, 10);
        k.addChild(n);
        q.mask = n;
        d = s_oSpriteLibrary.getSprite("progress_bar");
        e = createBitmap(d);
        e.x = CANVAS_WIDTH / 2 -
            d.width / 2;
        e.y = CANVAS_HEIGHT / 2 + 50;
        k.addChild(e);
        b = d.width;
        g = d.height;
        m = new createjs.Shape;
        m.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(e.x, e.y, 1, g);
        k.addChild(m);
        e.mask = m;
        l = new createjs.Text("", "30px " + FONT_GAME, "#fff");
        l.x = CANVAS_WIDTH / 2;
        l.y = CANVAS_HEIGHT / 2 + 100;
        l.textBaseline = "alphabetic";
        l.textAlign = "center";
        k.addChild(l);
        h = new createjs.Shape;
        h.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.addChild(h);
        createjs.Tween.get(h).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(h);
            k.removeChild(h)
        })
    };
    this.refreshLoader = function(d) {
        l.text = d + "%";
        100 === d && (s_oMain._onRemovePreloader(), l.visible = !1, e.visible = !1);
        m.graphics.clear();
        d = Math.floor(d * b / 100);
        m.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(e.x, e.y, d, g)
    };
    this._init()
}

function CMain(b) {
    var g, l = 0,
        e = 0,
        m = STATE_LOADING,
        h, q;
    this.initContainer = function() {
        var d = document.getElementById("canvas");
        s_oStage = new createjs.Stage(d);
        createjs.Touch.enable(s_oStage, !0);
        s_bMobile = isMobile();
        !1 === s_bMobile && s_oStage.enableMouseOver(20);
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.framerate = 30;
        createjs.Ticker.addEventListener("tick", this._update);
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        h = new CPreloader
    };
    this.preloaderReady =
        function() {
            this._loadImages();
            !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
            g = !0
        };
    this.soundLoaded = function() {
        l++;
        h.refreshLoader(Math.floor(l / e * 100))
    };
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "win",
            loop: !0,
            volume: 1,
            ingamename: "win"
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
            filename: "reels",
            loop: !1,
            volume: 1,
            ingamename: "reels"
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
            filename: "choose_ufo",
            loop: !1,
            volume: 1,
            ingamename: "choose_ufo"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "press_hold",
            loop: !1,
            volume: 1,
            ingamename: "press_hold"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "reveal_alien",
            loop: !1,
            volume: 1,
            ingamename: "reveal_alien"
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
            filename: "soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack"
        });
        e += s_aSoundsInfo.length;
        s_aSounds = [];
        for (var d = 0; d < s_aSoundsInfo.length; d++) this.tryToLoadSound(s_aSoundsInfo[d], !1)
    };
    this.tryToLoadSound = function(d, p) {
        setTimeout(function() {
            s_aSounds[d.ingamename] = new Howl({
                src: [d.path + d.filename + ".mp3"],
                autoplay: !1,
                preload: !0,
                loop: d.loop,
                volume: d.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function(u, c) {
                    for (var t = 0; t < s_aSoundsInfo.length; t++)
                        if (u === s_aSounds[s_aSoundsInfo[t].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[t], !0);
                            break
                        }
                },
                onplayerror: function(u) {
                    for (var c = 0; c < s_aSoundsInfo.length; c++)
                        if (u === s_aSounds[s_aSoundsInfo[c].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[c].ingamename].once("unlock", function() {
                                s_aSounds[s_aSoundsInfo[c].ingamename].play();
                                "soundtrack" === s_aSoundsInfo[c].ingamename &&
                                    null !== s_oGame && setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME)
                            });
                            break
                        }
                }
            })
        }, p ? 200 : 0)
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("paytable", "./sprites/paytable.jpg");
        s_oSpriteLibrary.addSprite("but_play_bg", "./sprites/but_play_bg.png");
        s_oSpriteLibrary.addSprite("mask_slot", "./sprites/mask_slot.png");
        s_oSpriteLibrary.addSprite("spin_but", "./sprites/but_spin_bg.png");
        s_oSpriteLibrary.addSprite("coin_but", "./sprites/but_coin_bg.png");
        s_oSpriteLibrary.addSprite("info_but", "./sprites/but_info_bg.png");
        s_oSpriteLibrary.addSprite("bet_but", "./sprites/bet_but.png");
        s_oSpriteLibrary.addSprite("win_frame_anim", "./sprites/win_frame_anim.png");
        s_oSpriteLibrary.addSprite("but_lines_bg", "./sprites/but_lines_bg.png");
        s_oSpriteLibrary.addSprite("but_maxbet_bg",
            "./sprites/but_maxbet_bg.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("hit_area_col", "./sprites/hit_area_col.png");
        s_oSpriteLibrary.addSprite("hold_col", "./sprites/hold_col.png");
        s_oSpriteLibrary.addSprite("bonus_bg", "./sprites/bonus_bg.jpg");
        s_oSpriteLibrary.addSprite("bonus_ufo", "./sprites/bonus_ufo.png");
        s_oSpriteLibrary.addSprite("bonus_prize", "./sprites/bonus_prize.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        for (var d = 1; d < NUM_SYMBOLS + 1; d++) s_oSpriteLibrary.addSprite("symbol_" + d, "./sprites/symbol_" + d + ".png"), s_oSpriteLibrary.addSprite("symbol_" + d + "_anim", "./sprites/symbol_" + d + "_anim.png");
        for (d = 1; d < NUM_PAYLINES + 1; d++) s_oSpriteLibrary.addSprite("payline_" + d, "./sprites/payline_" + d + ".png");
        e += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        l++;
        h.refreshLoader(Math.floor(l / e * 100))
    };
    this._onAllImagesLoaded = function() {};
    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    };
    this._onRemovePreloader = function() {
        h.unload();
        s_oSoundTrack = playSound("soundtrack", 1, !0);
        this.gotoMenu()
    };
    this.gotoMenu = function() {
        new CMenu;
        m = STATE_MENU
    };
    this.gotoGame = function() {
        q = new CGame(n);
        m = STATE_GAME
    };
    this.gotoHelp = function() {
        new CHelp;
        m = STATE_HELP
    };
    this.stopUpdate = function() {
        g = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || Howler.mute(!0)
    };
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        g = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) && s_bAudioActive && Howler.mute(!1)
    };
    this._update = function(d) {
        if (!1 !== g) {
            var p = (new Date).getTime();
            s_iTimeElaps = p - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = p;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -=
                1E3, s_iCntFps = 0);
            m === STATE_GAME && q.update();
            s_oStage.update(d)
        }
    };
    s_oMain = this;
    var n = b;
    PAYTABLE_VALUES = [];
    for (var k = 0; 8 > k; k++) PAYTABLE_VALUES[k] = b["paytable_symbol_" + (k + 1)];
    ENABLE_FULLSCREEN = n.fullscreen;
    ENABLE_CHECK_ORIENTATION = n.check_orientation;
    SHOW_CREDITS = n.show_credits;
    s_bAudioActive = b.audio_enable_on_startup;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0,
    s_bFullscreen = !1,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack = null,
    s_aSoundsInfo;

function CTextButton(b, g, l, e, m, h, q, n) {
    var k, d, p, u, c, t, v, y, K, L;
    this._init = function(f, z, G, x, B, J, A) {
        k = !1;
        d = 1;
        p = [];
        u = [];
        L = createBitmap(G);
        y = new createjs.Container;
        y.x = f;
        y.y = z;
        y.regX = G.width / 2;
        y.regY = G.height / 2;
        s_bMobile || (y.cursor = "pointer");
        y.addChild(L, K);
        n.addChild(y);
        K = new CTLText(y, 15, 10, G.width - 30, G.height - 20, A, "center", J, B, 1, 2, 2, x, !0, !0, !1, !1);
        this._initListener()
    };
    this.unload = function() {
        y.off("mousedown", c);
        y.off("pressup", t);
        n.removeChild(y)
    };
    this.setVisible = function(f) {
        y.visible = f
    };
    this.setAlign =
        function(f) {
            K.textAlign = f
        };
    this.setTextX = function(f) {
        K.x = f
    };
    this.setScale = function(f) {
        d = y.scaleX = y.scaleY = f
    };
    this.enable = function() {
        k = !1
    };
    this.disable = function() {
        k = !0
    };
    this._initListener = function() {
        c = y.on("mousedown", this.buttonDown);
        t = y.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(f, z, G) {
        p[f] = z;
        u[f] = G
    };
    this.addEventListenerWithParams = function(f, z, G, x) {
        p[f] = z;
        u[f] = G;
        v = x
    };
    this.buttonRelease = function() {
        k || (playSound("press_but", 1, !1), y.scaleX = d, y.scaleY = d, p[ON_MOUSE_UP] && p[ON_MOUSE_UP].call(u[ON_MOUSE_UP],
            v))
    };
    this.buttonDown = function() {
        k || (y.scaleX = .9 * d, y.scaleY = .9 * d, p[ON_MOUSE_DOWN] && p[ON_MOUSE_DOWN].call(u[ON_MOUSE_DOWN]))
    };
    this.setPosition = function(f, z) {
        y.x = f;
        y.y = z
    };
    this.tweenPosition = function(f, z, G, x, B, J, A) {
        createjs.Tween.get(y).wait(x).to({
            x: f,
            y: z
        }, G, B).call(function() {
            void 0 !== J && J.call(A)
        })
    };
    this.changeText = function(f) {
        K.refreshText(f)
    };
    this.setX = function(f) {
        y.x = f
    };
    this.setY = function(f) {
        y.y = f
    };
    this.getButtonImage = function() {
        return y
    };
    this.getX = function() {
        return y.x
    };
    this.getY = function() {
        return y.y
    };
    this.getSprite = function() {
        return y
    };
    this.getScale = function() {
        return y.scaleX
    };
    this._init(b, g, l, e, m, h, q)
}

function CGfxButton(b, g, l, e) {
    var m, h, q, n, k, d, p, u, c;
    this._init = function(t, v, y, K) {
        m = !1;
        n = [];
        k = [];
        c = createBitmap(y);
        c.x = t;
        c.y = v;
        h = y.width;
        q = y.height;
        c.cursor = "pointer";
        c.regX = y.width / 2;
        c.regY = y.height / 2;
        !1 !== K && s_oStage.addChild(c);
        this._initListener()
    };
    this.unload = function() {
        c.off("mousedown", p);
        c.off("pressup", u);
        s_oStage.removeChild(c)
    };
    this.setVisible = function(t) {
        c.visible = t
    };
    this.enable = function() {
        m = !1;
        c.filters = [];
        c.cache(0, 0, h, q)
    };
    this.disable = function() {
        m = !0;
        var t = (new createjs.ColorMatrix).adjustSaturation(-100).adjustBrightness(40);
        c.filters = [new createjs.ColorMatrixFilter(t)];
        c.cache(0, 0, h, q)
    };
    this._initListener = function() {
        p = c.on("mousedown", this.buttonDown);
        u = c.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(t, v, y) {
        n[t] = v;
        k[t] = y
    };
    this.addEventListenerWithParams = function(t, v, y, K) {
        n[t] = v;
        k[t] = y;
        d = K
    };
    this.buttonRelease = function() {
        m || (playSound("press_but", 1, !1), c.scaleX = 1, c.scaleY = 1, n[ON_MOUSE_UP] && n[ON_MOUSE_UP].call(k[ON_MOUSE_UP], d))
    };
    this.buttonDown = function() {
        m || (c.scaleX = .9, c.scaleY = .9, n[ON_MOUSE_DOWN] &&
            n[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN], d))
    };
    this.setPosition = function(t, v) {
        c.x = t;
        c.y = v
    };
    this.setX = function(t) {
        c.x = t
    };
    this.setY = function(t) {
        c.y = t
    };
    this.getButtonImage = function() {
        return c
    };
    this.getX = function() {
        return c.x
    };
    this.getY = function() {
        return c.y
    };
    this.getSprite = function() {
        return c
    };
    this._init(b, g, l, e);
    return this
}

function CToggle(b, g, l, e, m) {
    var h, q, n, k, d, p, u;
    this._init = function(c, t, v, y, K) {
        u = void 0 !== K ? K : s_oStage;
        q = [];
        n = [];
        K = new createjs.SpriteSheet({
            images: [v],
            frames: {
                width: v.width / 2,
                height: v.height,
                regX: v.width / 2 / 2,
                regY: v.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        h = y;
        k = createSprite(K, "state_" + h, v.width / 2 / 2, v.height / 2, v.width / 2, v.height);
        k.x = c;
        k.y = t;
        k.stop();
        s_bMobile || (k.cursor = "pointer");
        u.addChild(k);
        this._initListener()
    };
    this.unload = function() {
        k.off("mousedown", d);
        k.off("pressup", p);
        u.removeChild(k)
    };
    this._initListener = function() {
        d = k.on("mousedown", this.buttonDown);
        p = k.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(c, t, v) {
        q[c] = t;
        n[c] = v
    };
    this.setCursorType = function(c) {
        k.cursor = c
    };
    this.setActive = function(c) {
        h = c;
        k.gotoAndStop("state_" + h)
    };
    this.buttonRelease = function() {
        k.scaleX = 1;
        k.scaleY = 1;
        playSound("press_but", 1, !1);
        h = !h;
        k.gotoAndStop("state_" + h);
        q[ON_MOUSE_UP] && q[ON_MOUSE_UP].call(n[ON_MOUSE_UP], h)
    };
    this.buttonDown = function() {
        k.scaleX = .9;
        k.scaleY = .9;
        q[ON_MOUSE_DOWN] && q[ON_MOUSE_DOWN].call(n[ON_MOUSE_DOWN])
    };
    this.setPosition = function(c, t) {
        k.x = c;
        k.y = t
    };
    this._init(b, g, l, e, m)
}

function CBetBut(b, g, l) {
    var e, m, h, q = [],
        n;
    this._init = function(k, d, p) {
        e = !1;
        m = [];
        h = [];
        p = s_oSpriteLibrary.getSprite("bet_but");
        var u = new createjs.SpriteSheet({
            images: [p],
            frames: {
                width: p.width / 2,
                height: p.height,
                regX: 0,
                regY: 0
            },
            animations: {
                on: [0, 1],
                off: [1, 2]
            }
        });
        n = createSprite(u, "on", 0, 0, p.width / 2, p.height);
        n.stop();
        n.x = k;
        n.y = d;
        n.cursor = "pointer";
        n.regX = p.width / 2;
        n.regY = p.height / 2;
        s_oStage.addChild(n);
        this._initListener()
    };
    this.unload = function() {
        n.off("mousedown", this.buttonDown);
        n.off("pressup", this.buttonRelease);
        s_oStage.removeChild(n)
    };
    this.disable = function(k) {
        e = k
    };
    this.setVisible = function(k) {
        n.visible = k
    };
    this.setOn = function() {
        n.gotoAndStop("on")
    };
    this.setOff = function() {
        n.gotoAndStop("off")
    };
    this._initListener = function() {
        n.on("mousedown", this.buttonDown);
        n.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(k, d, p) {
        m[k] = d;
        h[k] = p
    };
    this.addEventListenerWithParams = function(k, d, p, u) {
        m[k] = d;
        h[k] = p;
        q = u
    };
    this.buttonRelease = function() {
        m[ON_MOUSE_UP] && !1 === e && (playSound("press_but", 1, !1), m[ON_MOUSE_UP].call(h[ON_MOUSE_UP],
            q))
    };
    this.buttonDown = function() {
        m[ON_MOUSE_DOWN] && !1 === e && m[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN], q)
    };
    this.setPosition = function(k, d) {
        n.x = k;
        n.y = d
    };
    this.setX = function(k) {
        n.x = k
    };
    this.setY = function(k) {
        n.y = k
    };
    this.getButtonImage = function() {
        return n
    };
    this.getX = function() {
        return n.x
    };
    this.getY = function() {
        return n.y
    };
    this._init(b, g, l)
}

function CMenu() {
    var b, g, l, e, m, h, q = null,
        n = null,
        k, d, p, u, c, t;
    this._init = function() {
        k = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(k);
        var v = s_oSpriteLibrary.getSprite("but_play_bg");
        d = new CTextButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 60, v, TEXT_PLAY, FONT_GAME, "#ffffff", 42, s_oStage);
        d.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) v = s_oSpriteLibrary.getSprite("audio_icon"), m = CANVAS_WIDTH - v.width / 4 - 10, h = v.height / 2 + 10, p = new CToggle(m,
            h, v, s_bAudioActive, s_oStage), p.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this), null === s_oSoundTrack ? s_oSoundTrack = playSound("soundtrack", SOUNDTRACK_VOLUME, !0) : setVolume("soundtrack", 1);
        SHOW_CREDITS ? (v = s_oSpriteLibrary.getSprite("but_credits"), b = v.height / 2 + 10, g = v.height / 2 + 10, u = new CGfxButton(b, g, v, s_oStage), u.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this), l = b + v.width + 10, e = g) : (l = v.height / 2 + 10, e = v.height / 2 + 10);
        v = window.document;
        var y = v.documentElement;
        q = y.requestFullscreen || y.mozRequestFullScreen ||
            y.webkitRequestFullScreen || y.msRequestFullscreen;
        n = v.exitFullscreen || v.mozCancelFullScreen || v.webkitExitFullscreen || v.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (q = !1);
        q && screenfull.isEnabled && (v = s_oSpriteLibrary.getSprite("but_fullscreen"), c = new CToggle(l, e, v, s_bFullscreen, s_oStage), c.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        t = new createjs.Shape;
        t.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(t);
        createjs.Tween.get(t).to({
            alpha: 0
        }, 600).call(function() {
            t.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.refreshButtonPos = function(v, y) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || p.setPosition(m - v, y + h);
        SHOW_CREDITS && u.setPosition(b + v, g + y);
        q && screenfull.isEnabled && c.setPosition(l + v, e + y)
    };
    this.unload = function() {
        d.unload();
        d = null;
        SHOW_CREDITS && u.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) p.unload(), p = null;
        q && screenfull.isEnabled && c.unload();
        s_oStage.removeAllChildren();
        s_oMenu = null
    };
    this._onButPlayRelease = function() {
        this.unload();
        s_oMain.gotoGame();
        $(s_oMain).trigger("start_session")
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onButCreditsRelease = function() {
        new CCreditsPanel
    };
    this.resetFullscreenBut = function() {
        q && screenfull.isEnabled && c.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? n.call(window.document) : q.call(window.document.documentElement);
        sizeHandler()
    };
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CGame(b) {
    var g = !1,
        l, e, m = !0,
        h, q, n, k, d, p, u, c, t, v, y, K = 0,
        L, f, z, G, x, B, J, A, E, P, S, C, W, I, X = null,
        Z, T;
    this._init = function() {
        h = GAME_STATE_IDLE;
        l = !0;
        f = y = k = q = 0;
        B = [0, 1, 2, 3, 4];
        n = B[0];
        d = NUM_PAYLINES;
        v = TOTAL_MONEY;
        c = MIN_BET;
        t = c * d;
        J = [];
        for (var a = 0; a < NUM_ROWS; a++) {
            J[a] = [];
            for (var r = 0; r < NUM_REELS; r++) J[a][r] = 0
        }
        s_oTweenController = new CTweenController;
        C = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(C);
        this._initReels();
        W = createBitmap(s_oSpriteLibrary.getSprite("mask_slot"));
        s_oStage.addChild(W);
        this._initStaticSymbols();
        this._initHitAreaColumn();
        I = new CInterface(c, t, v);
        Z = new CBonusPanel;
        X = new CPayTablePanel;
        T = new CRechargePanel;
        v < t && (T.show(), I.disableSpin());
        g = !0
    };
    this.unload = function() {
        stopSound("reels");
        s_oStage.removeChild(C);
        s_oStage.removeChild(W);
        I.unload();
        X.unload();
        T.unload();
        for (var a = 0; a < z.length; a++) z[a].unload();
        for (a = 0; a < NUM_ROWS; a++)
            for (var r = 0; r < NUM_REELS; r++) G[a][r].unload();
        Z.unload()
    };
    this._initReels = function() {
        var a = REEL_OFFSET_X,
            r = REEL_OFFSET_Y,
            F = 0;
        z = [];
        for (var M = 0; M <
            NUM_REELS; M++) z[M] = new CReelColumn(M, a, r, F), z[M + NUM_REELS] = new CReelColumn(M + NUM_REELS, a, r + SYMBOL_SIZE * NUM_ROWS, F), a += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS, F += REEL_DELAY
    };
    this._initStaticSymbols = function() {
        var a = REEL_OFFSET_X,
            r = REEL_OFFSET_Y;
        G = [];
        for (var F = 0; F < NUM_ROWS; F++) {
            G[F] = [];
            for (var M = 0; M < NUM_REELS; M++) {
                var H = new CStaticSymbolCell(F, M, a, r);
                G[F][M] = H;
                a += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS
            }
            a = REEL_OFFSET_X;
            r += SYMBOL_SIZE
        }
    };
    this._initHitAreaColumn = function() {
        S = [];
        P = [];
        F = 376;
        M = 120;
        for (var a = 0; a < NUM_REELS; a++) {
            var r =
                createBitmap(s_oSpriteLibrary.getSprite("hold_col"));
            r.x = F;
            r.y = M;
            r.visible = !1;
            s_oStage.addChild(r);
            F += 150;
            P.push(r);
            S[a] = !1
        }
        A = [];
        E = [];
        var F = 381,
            M = 108;
        a = s_oSpriteLibrary.getSprite("hit_area_col");
        for (r = 0; r < NUM_REELS; r++) {
            var H = new CTLText(s_oStage, F, M + a.height - 20, a.width, 22, 22, "center", "#fff", FONT_GAME, 1, 0, 0, " ", !0, !0, !1, !1);
            H.setShadow("#000", 2, 2, 2);
            A[r] = H;
            H = new CGfxButton(F + a.width / 2, M + a.height / 2, a);
            H.setVisible(!1);
            H.addEventListenerWithParams(ON_MOUSE_UP, this._onHitAreaCol, this, {
                index: r
            });
            F += 150;
            E.push(H)
        }
    };
    this.generateFinalSymbols = function() {
        for (var a = 0; a < NUM_ROWS; a++)
            for (var r = 0; r < NUM_REELS; r++) !1 === z[r].isHold() && (J[a][r] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]);
        a = this._checkForCombos();
        this._checkForBonus();
        return a
    };
    this._checkForCombos = function() {
        x = [];
        for (var a = L = 0; a < d; a++) {
            var r = s_aPaylineCombo[a],
                F = [],
                M = J[r[0].row][r[0].col];
            if (M !== BONUS_SYMBOL) {
                var H = 1,
                    w = 1;
                for (F.push({
                        row: r[0].row,
                        col: r[0].col,
                        value: J[r[0].row][r[0].col]
                    }); M === WILD_SYMBOL && w < NUM_REELS;) H++,
                    M = J[r[w].row][r[w].col], F.push({
                        row: r[w].row,
                        col: r[w].col,
                        value: J[r[w].row][r[w].col]
                    }), w++;
                for (; w < r.length; w++)
                    if (J[r[w].row][r[w].col] === M || J[r[w].row][r[w].col] === WILD_SYMBOL) {
                        if (J[r[w].row][r[w].col] === BONUS_SYMBOL) break;
                        H++;
                        F.push({
                            row: r[w].row,
                            col: r[w].col,
                            value: J[r[w].row][r[w].col]
                        })
                    } else break;
                M !== BONUS_SYMBOL && 0 < s_aSymbolWin[M - 1][H - 1] && (L += s_aSymbolWin[M - 1][H - 1], x.push({
                    line: a + 1,
                    amount: s_aSymbolWin[M - 1][H - 1],
                    num_win: H,
                    value: M,
                    list: F
                }))
            }
        }
        return L * c > t ? !0 : !1
    };
    this._checkForBonus = function() {
        e = !1;
        K = 0;
        for (var a = [], r = 0; r < NUM_ROWS; r++)
            for (var F = 0; F < NUM_REELS; F++) J[r][F] === BONUS_SYMBOL && (a.push({
                row: r,
                col: F,
                value: J[r][F]
            }), K++);
        K >= NUM_SYMBOLS_FOR_BONUS && (x.push({
            line: -1,
            amount: 0,
            num_win: K,
            value: BONUS_SYMBOL,
            list: a
        }), 5 < K && (K = 5), e = !0)
    };
    this._generateRandSymbols = function() {
        for (var a = [], r = 0; r < NUM_ROWS; r++) a[r] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
        return a
    };
    this.reelArrived = function(a, r) {
        if (q > MIN_REEL_LOOPS)
            if (n === r) {
                if (!1 === z[a].isReadyToStop()) {
                    var F = a;
                    a < NUM_REELS ? (F +=
                        NUM_REELS, z[F].setReadyToStop(), z[a].restart([J[0][a], J[1][a], J[2][a]], !0)) : (F -= NUM_REELS, z[F].setReadyToStop(), z[a].restart([J[0][F], J[1][F], J[2][F]], !0))
                }
            } else z[a].restart(this._generateRandSymbols(), !1);
        else z[a].restart(this._generateRandSymbols(), !1), 0 === a && q++
    };
    this.increaseReelLoops = function() {
        q += 2
    };
    this.stopNextReel = function() {
        k++;
        0 === k % 2 && (playSound("reel_stop", .3, !1), n = B[k / 2], k === 2 * NUM_REELS && this._endReelAnimation())
    };
    this._endReelAnimation = function() {
        stopSound("reels");
        k = q = 0;
        n = B[0];
        for (var a =
                0; a < NUM_REELS; a++) S[a] = !1, P[a].visible = !1, z[a].setHold(!1), z[a + NUM_REELS].setHold(!1);
        y = 0;
        if (0 < x.length) {
            for (var r = 0; r < x.length; r++) {
                X.highlightCombo(x[r].value, x[r].num_win); - 1 !== x[r].line && I.showLine(x[r].line);
                var F = x[r].list;
                for (a = 0; a < F.length; a++) G[F[a].row][F[a].col].show(F[a].value)
            }
            L *= c;
            v += L;
            SLOT_CASH -= L;
            0 < L && (I.refreshMoney(v), I.refreshWinText(L));
            p = 0;
            h = GAME_STATE_SHOW_ALL_WIN;
            playSound("win", 1, !1);
            l = !0;
            !1 === e && (I.disableBetBut(!1), I.enableGuiButtons())
        } else l ? (this.enableColumnHitArea(),
            l = !1, I.enableSpin(), I.disableMaxBet()) : (I.disableBetBut(!1), I.enableGuiButtons(), l = !0), h = GAME_STATE_IDLE;
        f++;
        f === aa && (f = 0, $(s_oMain).trigger("show_interlevel_ad"));
        $(s_oMain).trigger("save_score", v)
    };
    this.hidePayTable = function() {
        X.hide()
    };
    this._showWin = function() {
        if (0 < u) {
            stopSound("win");
            if (-1 !== x[u - 1].line) {
                var a = x[u - 1].line;
                I.hideLine(a)
            }
            a = x[u - 1].list;
            for (var r = 0; r < a.length; r++) G[a[r].row][a[r].col].stopAnim()
        }
        u === x.length && (u = 0); - 1 !== x[u].line && (a = x[u].line, I.showLine(a));
        a = x[u].list;
        for (r = 0; r <
            a.length; r++) G[a[r].row][a[r].col].show(a[r].value);
        u++
    };
    this._hideAllWins = function() {
        for (var a = 0; a < x.length; a++)
            for (var r = x[a].list, F = 0; F < r.length; F++) G[r[F].row][r[F].col].stopAnim();
        I.hideAllLines();
        u = p = 0;
        p = TIME_SHOW_WIN;
        h = GAME_STATE_SHOW_WIN;
        e && Z.show(K, c)
    };
    this.setMoney = function(a) {
        v = a;
        I.refreshMoney(v);
        I.enableGuiButtons()
    };
    this.enableColumnHitArea = function() {
        for (var a = 0; a < NUM_REELS; a++) A[a].refreshText(TEXT_HOLD), E[a].setVisible(!0)
    };
    this.disableColumnHitArea = function() {
        for (var a = 0; a < NUM_REELS; a++) A[a].refreshText(" "),
            E[a].setVisible(!1)
    };
    this.activateLines = function(a) {
        d = a;
        this.removeWinShowing();
        t = a = c * d;
        I.refreshTotalBet(t);
        I.refreshNumLines(d);
        a > v ? I.disableSpin() : I.enableSpin()
    };
    this.addLine = function() {
        d === NUM_PAYLINES ? d = 1 : d++;
        var a = c * d;
        t = a;
        t = Math.floor(100 * t) / 100;
        I.refreshTotalBet(t);
        I.refreshNumLines(d);
        a > v ? I.disableSpin() : I.enableSpin()
    };
    this.changeCoinBet = function() {
        var a = Math.floor(100 * (c + .05)) / 100;
        a > MAX_BET ? (c = MIN_BET, t = c * d, t = Math.floor(100 * t) / 100, I.refreshBet(c), I.refreshTotalBet(t), a = t) : (a *= d, c += .05,
            c = Math.floor(100 * c) / 100, t = a, t = Math.floor(100 * t) / 100, I.refreshBet(c), I.refreshTotalBet(t));
        a > v ? I.disableSpin() : I.enableSpin()
    };
    this.onMaxBet = function() {
        var a = MAX_BET;
        d = NUM_PAYLINES;
        a *= d;
        c = MAX_BET;
        t = a;
        I.refreshBet(c);
        I.refreshTotalBet(t);
        I.refreshNumLines(d);
        a > v ? (I.disableSpin(), T.show()) : (I.enableSpin(), this.onSpin())
    };
    this._onHitAreaCol = function(a) {
        a = a.index;
        !0 === S[a] ? (S[a] = !1, P[a].visible = !1, A[a].refreshText(TEXT_HOLD), y--, z[a].setHold(!1), z[a + NUM_REELS].setHold(!1)) : y < MAX_NUM_HOLD && (S[a] = !0, y++,
            P[a].visible = !0, A[a].refreshText(" "), z[a].setHold(!0), z[a + NUM_REELS].setHold(!0), playSound("press_hold", 1, !1))
    };
    this.removeWinShowing = function() {
        X.resetHighlightCombo();
        I.resetWin();
        for (var a = 0; a < NUM_ROWS; a++)
            for (var r = 0; r < NUM_REELS; r++) G[a][r].hide();
        for (a = 0; a < z.length; a++) z[a].activate();
        h = GAME_STATE_IDLE
    };
    this.endBonus = function(a) {
        a *= c;
        v += a;
        I.refreshMoney(v);
        SLOT_CASH -= a;
        I.disableBetBut(!1);
        I.enableGuiButtons();
        $(s_oMain).trigger("bonus_end", v);
        $(s_oMain).trigger("save_score", v)
    };
    this.onSpin =
        function() {
            console.log("_bFirstSpin " + l);
            console.log("_iMoney " + v);
            console.log("_iTotBet " + t);
            if (l && v < t) T.show();
            else {
                stopSound("win");
                playSound("reels", .3, !1);
                this.disableColumnHitArea();
                I.disableBetBut(!0);
                this.removeWinShowing();
                MIN_WIN = s_aSymbolWin[0][s_aSymbolWin[0].length - 1];
                for (var a = 0; a < s_aSymbolWin.length; a++)
                    for (var r = s_aSymbolWin[a], F = 0; F < r.length; F++) 0 !== r[F] && r[F] < MIN_WIN && (MIN_WIN = r[F]);
                MIN_WIN *= c;
                l && (v -= t, I.refreshMoney(v), SLOT_CASH += t, $(s_oMain).trigger("bet_placed", {
                    bet: c,
                    tot_bet: t
                }));
                if (!m && z[0].visible && z[1].visible && this._checkForCombos()) this._assignWin();
                else if (SLOT_CASH < MIN_WIN) {
                    do a = this.generateFinalSymbols(); while (!0 === a || e)
                } else if (Math.floor(100 * Math.random()) > WIN_OCCURRENCE) {
                    do a = this.generateFinalSymbols(); while (!0 === a || e)
                } else this._assignWin();
                I.hideAllLines();
                I.disableGuiButtons();
                m = !1;
                h = GAME_STATE_SPINNING
            }
        };
    this._assignWin = function() {
        if (SLOT_CASH < BONUS_PRIZE[0][0] * c) {
            var a = 0;
            do {
                var r = this.generateFinalSymbols();
                a++
            } while ((!1 === r || L * c > SLOT_CASH || e) && 1E4 >= a)
        } else if (Math.floor(100 *
                Math.random()) >= BONUS_OCCURRENCE) {
            a = 0;
            do r = this.generateFinalSymbols(), a++; while ((!1 === r || L * c > SLOT_CASH || e) && 1E4 >= a)
        } else {
            a = 0;
            do {
                r = this.generateFinalSymbols();
                var F = 0;
                e && (F = K - 3);
                a++
            } while ((!1 === r || L * c + BONUS_PRIZE[F][0] * c > SLOT_CASH || !1 === e) && 1E4 >= a)
        }
        if (1E4 < a) {
            do r = this.generateFinalSymbols(); while (!0 === r || e)
        }
    };
    this.onInfoClicked = function() {
        h !== GAME_STATE_SPINNING && (X.isVisible() ? X.hide() : X.show())
    };
    this.onExit = function() {
        this.unload();
        s_oMain.gotoMenu();
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("share_event", {
            img: "200x200.jpg",
            title: TEXT_CONGRATULATIONS,
            msg: TEXT_MSG_SHARE1 + v + TEXT_MSG_SHARE2,
            msg_share: TEXT_MSG_SHARING1 + v + TEXT_MSG_SHARING2
        })
    };
    this.getState = function() {
        return h
    };
    this.update = function() {
        if (!1 !== g) switch (h) {
            case GAME_STATE_SPINNING:
                for (var a = 0; a < z.length; a++) z[a].update(n);
                break;
            case GAME_STATE_SHOW_ALL_WIN:
                p += s_iTimeElaps;
                p > TIME_SHOW_ALL_WINS && this._hideAllWins();
                break;
            case GAME_STATE_SHOW_WIN:
                p += s_iTimeElaps, p > TIME_SHOW_WIN && (p = 0, this._showWin())
        }
    };
    s_oGame = this;
    WIN_OCCURRENCE = b.win_occurrence;
    SLOT_CASH = b.slot_cash;
    BONUS_OCCURRENCE = b.bonus_occurrence;
    MIN_REEL_LOOPS = b.min_reel_loop;
    REEL_DELAY = b.reel_delay;
    TIME_SHOW_WIN = b.time_show_win;
    TIME_SHOW_ALL_WINS = b.time_show_all_wins;
    TOTAL_MONEY = b.money;
    MIN_BET = b.min_bet;
    MAX_BET = b.max_bet;
    MAX_NUM_HOLD = b.max_hold;
    PERC_WIN_BONUS_PRIZE_1 = b.perc_win_bonus_prize_1;
    PERC_WIN_BONUS_PRIZE_2 = b.perc_win_bonus_prize_2;
    PERC_WIN_BONUS_PRIZE_3 = b.perc_win_bonus_prize_3;
    var aa = b.num_spin_ads_showing;
    new CSlotSettings;
    this._init()
}
var s_oGame, s_oTweenController;

function CReelColumn(b, g, l, e) {
    var m, h, q, n, k, d, p, u, c, t, v, y, K, L, f;
    this._init = function(z, G, x, B) {
        n = q = h = m = !1;
        u = 0;
        k = z;
        p = B;
        d = k < NUM_REELS ? k : k - NUM_REELS;
        t = 0;
        v = MAX_FRAMES_REEL_EASE;
        c = REEL_STATE_START;
        y = x;
        K = y + SYMBOL_SIZE * NUM_ROWS;
        this.initContainer(G, x)
    };
    this.initContainer = function(z, G) {
        f = new createjs.Container;
        f.x = z;
        f.y = G;
        var x = 0;
        L = [];
        for (var B = 0; B < NUM_ROWS; B++) {
            var J = createSprite(s_aSymbolData[s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
            J.stop();
            J.x =
                0;
            J.y = x;
            f.addChild(J);
            L[B] = J;
            x += SYMBOL_SIZE
        }
        s_oStage.addChild(f)
    };
    this.unload = function() {
        s_oStage.removeChild(f)
    };
    this.activate = function() {
        y = f.y;
        K = y + SYMBOL_SIZE * NUM_ROWS;
        m = !0
    };
    this._setSymbol = function(z) {
        f.removeAllChildren();
        for (var G = 0, x = 0; x < z.length; x++) {
            var B = new createSprite(s_aSymbolData[z[x]], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
            B.stop();
            B.x = 0;
            B.y = G;
            f.addChild(B);
            L[x] = B;
            G += SYMBOL_SIZE
        }
    };
    this.setHold = function(z) {
        m = !1;
        n = z;
        u = 0
    };
    this.restart = function(z, G) {
        f.y = y = REEL_START_Y;
        K = y + SYMBOL_SIZE * NUM_ROWS;
        this._setSymbol(z);
        if (h = G) {
            t = 0;
            v = MAX_FRAMES_REEL_EASE;
            c = REEL_STATE_STOP;
            for (var x = 0; x < NUM_ROWS; x++) L[x].gotoAndStop("static");
            q = !0
        } else
            for (x = 0; x < NUM_ROWS; x++) L[x].gotoAndStop("moving")
    };
    this.setReadyToStop = function() {
        t = 0;
        v = MAX_FRAMES_REEL_EASE;
        c = REEL_STATE_STOP
    };
    this.isReadyToStop = function() {
        return h
    };
    this.isHold = function() {
        return n
    };
    this._updateStart = function() {
        0 === t && k < NUM_REELS && playSound("start_reel", .3, !1);
        t++;
        t > v && (t = 0, v /= 2, c++, y = f.y, K = y + SYMBOL_SIZE * NUM_ROWS);
        var z = s_oTweenController.easeInBack(t,
            0, 1, v);
        z = s_oTweenController.tweenValue(y, K, z);
        f.y = z
    };
    this._updateMoving = function() {
        t++;
        t > v && (t = 0, y = f.y, K = y + SYMBOL_SIZE * NUM_ROWS);
        var z = s_oTweenController.easeLinear(t, 0, 1, v);
        z = s_oTweenController.tweenValue(y, K, z);
        f.y = z
    };
    this._updateStopping = function() {
        t++;
        if (t >= v) m = !1, t = 0, v = MAX_FRAMES_REEL_EASE, c = REEL_STATE_START, u = 0, h = !1, q && (q = !1, f.y = REEL_OFFSET_Y), s_oGame.stopNextReel();
        else {
            var z = s_oTweenController.easeOutCubic(t, 0, 1, v);
            z = s_oTweenController.tweenValue(y, K, z);
            f.y = z
        }
    };
    this.update = function(z) {
        if (!1 !==
            m && (u++, u > p))
            if (n) z === k && (m = !1, s_oGame.stopNextReel(), s_oGame.stopNextReel(), 0 === k && s_oGame.increaseReelLoops());
            else switch (!1 === h && f.y > REEL_ARRIVAL_Y && s_oGame.reelArrived(k, d), c) {
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
    this._init(b, g, l, e)
}

function CInterface(b, g, l) {
    var e, m, h, q, n, k, d, p, u, c, t, v, y, K, L, f, z, G, x, B, J = null,
        A = null;
    this._init = function(E, P, S) {
        var C = s_oSpriteLibrary.getSprite("but_exit");
        h = CANVAS_WIDTH - C.width / 2 - 10;
        q = C.height / 2 + 10;
        u = new CGfxButton(h, q, C, !0);
        u.addEventListener(ON_MOUSE_UP, this._onExit, this);
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (C = s_oSpriteLibrary.getSprite("audio_icon"), n = u.getX() - C.width / 2, k = C.height / 2 + 10, y = new CToggle(n, k, C, s_bAudioActive, s_oStage), y.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
            e = n - C.width / 2, m = k) : (e = u.getX() - C.width, m = C.height / 2 + 10);
        C = window.document;
        var W = C.documentElement;
        J = W.requestFullscreen || W.mozRequestFullScreen || W.webkitRequestFullScreen || W.msRequestFullscreen;
        A = C.exitFullscreen || C.mozCancelFullScreen || C.webkitExitFullscreen || C.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (J = !1);
        J && screenfull.isEnabled && (C = s_oSpriteLibrary.getSprite("but_fullscreen"), B = new CToggle(e, m, C, s_bFullscreen, s_oStage), B.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        C = s_oSpriteLibrary.getSprite("spin_but");
        c = new CTextButton(1090 + C.width / 2, CANVAS_HEIGHT - C.height / 2, C, "", FONT_GAME, "#f951aa", 22, s_oStage);
        c.addEventListener(ON_MOUSE_UP, this._onSpin, this);
        C = s_oSpriteLibrary.getSprite("info_but");
        t = new CTextButton(328 + C.width / 2, CANVAS_HEIGHT - C.height / 2, C, TEXT_INFO, FONT_GAME, "#ffffff", 24, s_oStage);
        t.addEventListener(ON_MOUSE_UP, this._onInfo, this);
        C = s_oSpriteLibrary.getSprite("but_lines_bg");
        v = new CTextButton(494 + C.width / 2, CANVAS_HEIGHT - C.height / 2, C, TEXT_LINES, FONT_GAME, "#ffffff", 24, s_oStage);
        v.addEventListener(ON_MOUSE_UP,
            this._onAddLine, this);
        x = new CTLText(s_oStage, 494, CANVAS_HEIGHT - 80, C.width, 26, 26, "center", "#ffffff", FONT_GAME, 1, 0, 0, NUM_PAYLINES, !0, !0, !1, !1);
        x.setShadow("#000", 2, 2, 2);
        C = s_oSpriteLibrary.getSprite("coin_but");
        K = new CTextButton(680 + C.width / 2, CANVAS_HEIGHT - C.height / 2, C, TEXT_COIN, FONT_GAME, "#ffffff", 24, s_oStage);
        K.addEventListener(ON_MOUSE_UP, this._onBet, this);
        f = new CTLText(s_oStage, 680, CANVAS_HEIGHT - 80, C.width, 26, 26, "center", "#ffffff", FONT_GAME, 1, 0, 0, E.toFixed(2), !0, !0, !1, !1);
        f.setShadow("#000", 2, 2,
            2);
        C = s_oSpriteLibrary.getSprite("but_maxbet_bg");
        L = new CTextButton(866 + C.width / 2, CANVAS_HEIGHT - C.height / 2, C, TEXT_MAX_BET, FONT_GAME, "#ffffff", 24, s_oStage);
        L.addEventListener(ON_MOUSE_UP, this._onMaxBet, this);
        G = new CTLText(s_oStage, 866, CANVAS_HEIGHT - 80, C.width, 26, 26, "center", "#ffffff", FONT_GAME, 1, 0, 0, TEXT_BET + ": " + P.toFixed(2), !0, !0, !1, !1);
        G.setShadow("#000", 2, 2, 2);
        z = new CTLText(s_oStage, 349, 22, C.width - 20, 60, 60, "center", "#f951aa", FONT_GAME, 1, 0, 0, TEXT_MONEY + "\n" + S.toFixed(2) + TEXT_CURRENCY, !0, !0, !0, !1);
        C = s_oSpriteLibrary.getSprite("bet_but");
        d = [];
        E = new CBetBut(334 + C.width / 2, 282 + C.height / 2, C, !0);
        E.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 1);
        d[0] = E;
        E = new CBetBut(334 + C.width / 2, 180 + C.height / 2, C, !0);
        E.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 2);
        d[1] = E;
        E = new CBetBut(334 + C.width / 2, 432 + C.height / 2, C, !0);
        E.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 3);
        d[2] = E;
        E = new CBetBut(334 + C.width / 2, 114 + C.height / 2, C, !0);
        E.addEventListenerWithParams(ON_MOUSE_UP,
            this._onBetLineClicked, this, 4);
        d[3] = E;
        E = new CBetBut(334 + C.width / 2, 502 + C.height / 2, C, !0);
        E.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 5);
        d[4] = E;
        p = [];
        for (E = 0; E < NUM_PAYLINES; E++) P = new createjs.Bitmap(s_oSpriteLibrary.getSprite("payline_" + (E + 1))), P.x = 238, P.y = -40, P.visible = !1, s_oStage.addChild(P), p[E] = P;
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        u.unload();
        u = null;
        c.unload();
        c = null;
        t.unload();
        t = null;
        v.unload();
        v = null;
        K.unload();
        K = null;
        L.unload();
        L = null;
        if (!1 ===
            DISABLE_SOUND_MOBILE || !1 === s_bMobile) y.unload(), y = null;
        J && screenfull.isEnabled && B.unload();
        for (var E = 0; E < NUM_PAYLINES; E++) d[E].unload();
        s_oStage.removeAllChildren();
        s_oInterface = null
    };
    this.refreshButtonPos = function(E, P) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || y.setPosition(n - E, P + k);
        J && screenfull.isEnabled && B.setPosition(e - E, m + P);
        u.setPosition(h - E, P + q)
    };
    this.refreshMoney = function(E) {
        z.refreshText(TEXT_MONEY + "\n" + E.toFixed(2) + TEXT_CURRENCY)
    };
    this.refreshBet = function(E) {
        f.refreshText(E.toFixed(2))
    };
    this.refreshTotalBet = function(E) {
        G.refreshText(TEXT_BET + ": " + E.toFixed(2))
    };
    this.refreshNumLines = function(E) {
        x.refreshText(E);
        for (var P = 0; P < NUM_PAYLINES; P++) P < E ? (d[P].setOn(), p[P].visible = !0) : d[P].setOff();
        setTimeout(function() {
            for (var S = 0; S < NUM_PAYLINES; S++) p[S].visible = !1
        }, 1E3)
    };
    this.resetWin = function() {
        c.changeText("")
    };
    this.refreshWinText = function(E) {
        c.changeText(TEXT_WIN + "\n" + E.toFixed(2))
    };
    this.showLine = function(E) {
        p[E - 1].visible = !0
    };
    this.hideLine = function(E) {
        p[E - 1].visible = !1
    };
    this.hideAllLines =
        function() {
            for (var E = 0; E < NUM_PAYLINES; E++) p[E].visible = !1
        };
    this.disableBetBut = function(E) {
        for (var P = 0; P < NUM_PAYLINES; P++) d[P].disable(E)
    };
    this.enableGuiButtons = function() {
        c.enable();
        L.enable();
        K.enable();
        v.enable();
        t.enable()
    };
    this.enableSpin = function() {
        c.enable();
        L.enable()
    };
    this.disableSpin = function() {
        c.disable();
        L.disable()
    };
    this.enableMaxBet = function() {
        L.enable()
    };
    this.disableMaxBet = function() {
        L.disable()
    };
    this.disableGuiButtons = function() {
        c.disable();
        L.disable();
        K.disable();
        v.disable();
        t.disable()
    };
    this._onBetLineClicked = function(E) {
        this.refreshNumLines(E);
        s_oGame.activateLines(E)
    };
    this._onExit = function() {
        s_oGame.onExit()
    };
    this._onSpin = function() {
        s_oGame.onSpin()
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
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this.resetFullscreenBut = function() {
        J && screenfull.isEnabled &&
            B.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? A.call(window.document) : J.call(window.document.documentElement);
        sizeHandler()
    };
    s_oInterface = this;
    this._init(b, g, l);
    return this
}
var s_oInterface = null;

function CPayTablePanel() {
    var b, g, l, e;
    this._init = function() {
        e = new createjs.Container;
        l = createBitmap(s_oSpriteLibrary.getSprite("paytable"));
        e.addChild(l);
        this._createPayouts();
        new CTLText(e, 528, 322, 210, 130, 21, "center", "#ffff00", FONT_GAME, 1, 0, 0, TEXT_HELP_WILD, !0, !0, !0, !1);
        new CTLText(e, 908, 322, 210, 130, 21, "center", "#ffff00", FONT_GAME, 1, 0, 0, TEXT_HELP_BONUS, !0, !0, !0, !1);
        e.visible = !1;
        s_oStage.addChild(e);
        var m = this;
        e.on("pressup", function() {
            m._onExit()
        })
    };
    this.unload = function() {
        var m = this;
        e.off("pressup",
            function() {
                m._onExit()
            });
        s_oStage.removeChild(e);
        for (var h = 0; h < b.length; h++) e.removeChild(b[h]);
        for (h = 0; h < g.length; h++) e.removeChild(g[h])
    };
    this._createPayouts = function() {
        b = [];
        g = [];
        for (var m = [{
                x: 430,
                y: 130
            }, {
                x: 650,
                y: 130
            }, {
                x: 880,
                y: 130
            }, {
                x: 1100,
                y: 130
            }, {
                x: 430,
                y: 232
            }, {
                x: 650,
                y: 232
            }, {
                x: 880,
                y: 232
            }, {
                x: 1100,
                y: 232
            }], h = 0, q = 0; q < s_aSymbolWin.length; q++) {
            for (var n = [], k = 0; k < s_aSymbolWin[q].length; k++) n[k] = s_aSymbolWin[q][k];
            do k = n.indexOf(0), -1 !== k && n.splice(k, 1); while (-1 !== k);
            k = n.length;
            if (0 !== k) {
                var d = 30;
                4 === k &&
                    (d = 22);
                var p = m[h].y;
                b[q] = [];
                g[q] = [];
                for (var u = 0; u < k; u++) {
                    var c = new createjs.Text("X" + (5 - u), "25px " + FONT_GAME, "#ffffff");
                    c.textAlign = "center";
                    c.x = m[h].x;
                    c.y = p;
                    c.textBaseline = "alphabetic";
                    e.addChild(c);
                    b[q][u] = c;
                    var t = new createjs.Text(n[k - u - 1], "25px " + FONT_GAME, "#ffff00");
                    t.textAlign = "center";
                    t.x = c.x + 50;
                    t.y = c.y;
                    t.textBaseline = "alphabetic";
                    e.addChild(t);
                    g[q][u] = t;
                    p += d
                }
                h++
            }
        }
    };
    this.show = function() {
        e.visible = !0
    };
    this.hide = function() {
        e.visible = !1
    };
    this.resetHighlightCombo = function() {
        for (var m = 0; m < b.length; m++)
            for (var h =
                    0; h < b[m].length; h++) b[m][h].color = "#ffffff", g[m][h].color = "#ffff00", createjs.Tween.removeTweens(g[m][h]), g[m][h].alpha = 1
    };
    this.highlightCombo = function(m, h) {
        m !== BONUS_SYMBOL && (g[m - 1][NUM_REELS - h].color = "#ff0000", this.tweenAlpha(g[m - 1][NUM_REELS - h], 0))
    };
    this.tweenAlpha = function(m, h) {
        var q = this;
        createjs.Tween.get(m).to({
            alpha: h
        }, 200).call(function() {
            1 === h ? q.tweenAlpha(m, 0) : q.tweenAlpha(m, 1)
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

function CStaticSymbolCell(b, g, l, e) {
    var m = -1,
        h, q, n, k;
    this._init = function(d, p, u, c) {
        k = new createjs.Container;
        k.visible = !1;
        q = [];
        for (d = 0; d < NUM_SYMBOLS; d++) p = createSprite(s_aSymbolAnims[d], "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE), p.stop(), p.x = u, p.y = c, p.on("animationend", this._onAnimEnded, null, !1, {
            index: d
        }), k.addChild(p), q[d] = p, q[d].visible = !1;
        d = {
            framerate: 60,
            images: [s_oSpriteLibrary.getSprite("win_frame_anim")],
            frames: {
                width: SYMBOL_SIZE,
                height: SYMBOL_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                "static": [0, 1],
                anim: [1,
                    19
                ]
            }
        };
        d = new createjs.SpriteSheet(d);
        n = new createSprite(d, "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
        n.stop();
        n.x = u;
        n.y = c;
        k.addChild(n);
        s_oStage.addChild(k)
    };
    this.unload = function() {
        s_oStage.removeChild(k)
    };
    this.hide = function() {
        -1 < m && (n.gotoAndStop("static"), n.visible = !1, q[m].gotoAndPlay("static"), k.visible = !1)
    };
    this.show = function(d) {
        n.gotoAndPlay("anim");
        n.visible = !0;
        for (var p = 0; p < NUM_SYMBOLS; p++) q[p].visible = p + 1 === d ? !0 : !1;
        q[d - 1].gotoAndPlay("anim");
        m = d - 1;
        h = q[d - 1].spriteSheet.getNumFrames();
        k.visible = !0
    };
    this._onAnimEnded = function(d, p) {
        q[p.index].currentFrame !== h && (q[p.index].stop(), setTimeout(function() {
            q[p.index].gotoAndPlay(1)
        }, 100))
    };
    this.stopAnim = function() {
        q[m].gotoAndStop("static");
        q[m].visible = !1;
        n.gotoAndStop("static");
        n.visible = !1
    };
    this._init(b, g, l, e)
}

function CTweenController() {
    this.tweenValue = function(b, g, l) {
        return b + l * (g - b)
    };
    this.easeLinear = function(b, g, l, e) {
        return l * b / e + g
    };
    this.easeInCubic = function(b, g, l, e) {
        e = (b /= e) * b * b;
        return g + l * e
    };
    this.easeBackInQuart = function(b, g, l, e) {
        e = (b /= e) * b;
        return g + l * (2 * e * e + 2 * e * b + -3 * e)
    };
    this.easeInBack = function(b, g, l, e) {
        return l * (b /= e) * b * (2.70158 * b - 1.70158) + g
    };
    this.easeOutCubic = function(b, g, l, e) {
        return l * ((b = b / e - 1) * b * b + 1) + g
    }
}

function CBonusPanel() {
    var b, g, l, e, m, h, q, n, k, d;
    this._init = function() {
        d = new createjs.Container;
        s_oStage.addChild(d);
        var p = createBitmap(s_oSpriteLibrary.getSprite("bonus_bg"));
        d.alpha = 0;
        d.visible = !1;
        d.addChild(p);
        p = {
            framerate: 3,
            images: [s_oSpriteLibrary.getSprite("bonus_ufo")],
            frames: {
                width: UFO_WIDTH,
                height: UFO_HEIGHT,
                regX: UFO_WIDTH / 2,
                regY: UFO_HEIGHT / 2
            },
            animations: {
                idle: [0, 4, "idle"],
                lay_alien: [5, 9, "stop_lay"],
                idle_rand_0: [1, 4, "idle"],
                idle_rand_1: [2, 4, "idle"],
                idle_rand_2: [3, 4, "idle"],
                right: [3],
                left: [4],
                stop_lay: [9]
            }
        };
        p = new createjs.SpriteSheet(p);
        e = [];
        for (var u = 418, c = 0; 5 > c; c++) {
            var t = createSprite(p, "idle", UFO_WIDTH / 2, UFO_HEIGHT / 2, UFO_WIDTH, UFO_HEIGHT);
            t.on("click", this._onUfoReleased, this, !1, c);
            t.x = u;
            t.y = 376;
            t.stop();
            t.visible = !1;
            d.addChild(t);
            u += 164;
            e[c] = t
        }
        u = s_oSpriteLibrary.getSprite("bonus_prize");
        p = {
            framerate: 10,
            images: [u],
            frames: {
                width: Math.floor(u.width / NUM_ALIEN),
                height: u.height,
                regX: Math.floor(u.width / NUM_ALIEN) / 2,
                regY: u.height / 2
            },
            animations: {
                alien_0: [0],
                alien_1: [1],
                alien_2: [2]
            }
        };
        p = new createjs.SpriteSheet(p);
        n = createSprite(p, "alien_0", Math.floor(u.width / NUM_ALIEN) / 2, u.height / 2, Math.floor(u.width / NUM_ALIEN), u.height);
        d.addChild(n);
        c = new createjs.Shape;
        c.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(348, 260, 800, 240);
        d.addChild(c);
        n.mask = c;
        h = [];
        q = [];
        h[0] = createSprite(p, "alien_0", Math.floor(u.width / NUM_ALIEN) / 2, u.height / 2, Math.floor(u.width / NUM_ALIEN), u.height);
        h[0].x = 348;
        h[0].y = CANVAS_HEIGHT - 75;
        d.addChild(h[0]);
        c = new createjs.Text("100", "34px walibi0615bold", "#e7008a");
        c.textAlign = "left";
        c.x = h[0].x +
            u.width / NUM_ALIEN / 2 + 6;
        c.y = h[0].y + 12;
        c.textBaseline = "alphabetic";
        d.addChild(c);
        q.push(c);
        h[1] = createSprite(p, "alien_1", Math.floor(u.width / NUM_ALIEN) / 2, u.height / 2, Math.floor(u.width / NUM_ALIEN), u.height);
        h[1].x = 638;
        h[1].y = CANVAS_HEIGHT - 75;
        d.addChild(h[1]);
        c = new createjs.Text("200", "34px walibi0615bold", "#e7008a");
        c.textAlign = "left";
        c.x = h[1].x + +(u.width / NUM_ALIEN) / 2 + 6;
        c.y = h[1].y + 12;
        c.textBaseline = "alphabetic";
        d.addChild(c);
        q.push(c);
        h[2] = createSprite(p, "alien_2", Math.floor(u.width / NUM_ALIEN) / 2, u.height /
            2, Math.floor(u.width / NUM_ALIEN), u.height);
        h[2].x = 938;
        h[2].y = CANVAS_HEIGHT - 75;
        d.addChild(h[2]);
        c = new createjs.Text("300", "34px walibi0615bold", "#e7008a");
        c.textAlign = "left";
        c.x = h[2].x + +(u.width / NUM_ALIEN) / 2 + 6;
        c.y = h[2].y + 12;
        c.textBaseline = "alphabetic";
        d.addChild(c);
        q.push(c);
        k = new createjs.Text("+ 300", "80px " + FONT_GAME, "#ffff00");
        k.alpha = 0;
        k.textAlign = "center";
        k.shadow = new createjs.Shadow("#000", 2, 2, 2);
        k.x = CANVAS_WIDTH / 2;
        k.y = 150;
        k.textBaseline = "alphabetic";
        d.addChild(k)
    };
    this.unload = function() {
        for (var p =
                0; 5 > p; p++) e[p].off("click", this._onUfoReleased)
    };
    this.show = function(p, u) {
        g = u;
        b = !1;
        k.alpha = 0;
        switch (p) {
            case 3:
                m = BONUS_PRIZE[0];
                break;
            case 4:
                m = BONUS_PRIZE[1];
                break;
            case 5:
                m = BONUS_PRIZE[2];
                break;
            default:
                m = BONUS_PRIZE[0]
        }
        q[0].text = "X" + m[0];
        q[1].text = "X" + m[1];
        q[2].text = "X" + m[2];
        n.x = 118;
        n.y = 308;
        n.rotation = 0;
        n.gotoAndStop("alien_0");
        for (var c = 0; c < p; c++) {
            var t = Math.floor(3 * Math.random());
            e[c].framerate = 3;
            e[c].visible = !0;
            e[c].gotoAndPlay("idle_rand_" + t)
        }
        d.visible = !0;
        createjs.Tween.get(d).to({
            alpha: 1
        }, 1E3);
        setVolume("soundtrack", 0);
        playSound("soundtrack_bonus", 1, !0);
        $(s_oMain).trigger("bonus_start")
    };
    this._onUfoReleased = function(p, u) {
        if (!b) {
            b = !0;
            do var c = Math.floor(Math.random() * s_aAlienOccurence.length); while (m[s_aAlienOccurence[c]] * g > SLOT_CASH);
            this.playUfoLayAnim(u, s_aAlienOccurence[c]);
            playSound("choose_ufo", 1, !1)
        }
    };
    this.playUfoLayAnim = function(p, u) {
        l = m[u];
        n.gotoAndStop("alien_" + u);
        for (var c = 0; 5 > c; c++) c < p ? e[c].gotoAndStop("right") : c === p ? (e[p].framerate = 10, e[p].gotoAndPlay("lay_alien")) : e[c].gotoAndStop("left");
        this.layAlien(p)
    };
    this.layAlien = function(p) {
        n.x = e[p].x;
        var u = this;
        createjs.Tween.get(n).to({
            y: 460
        }, 300).call(function() {
            u.endBonus()
        });
        playSound("reveal_alien", 1, !1)
    };
    this.endBonus = function() {
        k.text = "X " + l;
        createjs.Tween.get(k).to({
            alpha: 1
        }, 500);
        setTimeout(function() {
            d.alpha = 0;
            d.visible = !1;
            for (var p = 0; p < e.length; p++) e[p].visible = !1;
            setVolume("soundtrack", SOUNDTRACK_VOLUME);
            stopSound("soundtrack_bonus");
            s_oGame.endBonus(l)
        }, 4E3)
    };
    this._init()
}

function CCreditsPanel() {
    var b, g, l, e, m, h, q, n, k, d;
    this._init = function() {
        d = new createjs.Container;
        d.alpha = 0;
        s_oStage.addChild(d);
        g = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        d.addChild(g);
        q = new createjs.Shape;
        q.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        q.alpha = .01;
        q.on("click", this._onLogoButRelease);
        d.addChild(q);
        var p = s_oSpriteLibrary.getSprite("but_exit");
        b = CANVAS_WIDTH / 2 + 250;
        e = new CGfxButton(b, 220, p, d);
        e.addEventListener(ON_MOUSE_UP, this.unload, this);
        h = new createjs.Text(TEXT_CREDITS_DEVELOPED,
            "34px " + FONT_GAME, "#000");
        h.textAlign = "center";
        h.textBaseline = "alphabetic";
        h.x = CANVAS_WIDTH / 2;
        h.y = 270;
        h.outline = 2;
        d.addChild(h);
        m = new createjs.Text(TEXT_CREDITS_DEVELOPED, "34px " + FONT_GAME, "#fff");
        m.textAlign = "center";
        m.textBaseline = "alphabetic";
        m.x = CANVAS_WIDTH / 2;
        m.y = 270;
        d.addChild(m);
        p = s_oSpriteLibrary.getSprite("logo_ctl");
        l = createBitmap(p);
        l.regX = p.width / 2;
        l.regY = p.height / 2;
        l.x = CANVAS_WIDTH / 2;
        l.y = CANVAS_HEIGHT / 2;
        d.addChild(l);
        k = new createjs.Text("www.codethislab.com", "30px " + FONT_GAME, "#000");
        k.textAlign = "center";
        k.textBaseline = "alphabetic";
        k.x = CANVAS_WIDTH / 2;
        k.y = 385;
        k.outline = 2;
        d.addChild(k);
        n = new createjs.Text("www.codethislab.com", "30px " + FONT_GAME, "#fff");
        n.textAlign = "center";
        n.textBaseline = "alphabetic";
        n.x = CANVAS_WIDTH / 2;
        n.y = 385;
        d.addChild(n);
        createjs.Tween.get(d).to({
            alpha: 1
        }, 600, createjs.Ease.cubicOut);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.refreshButtonPos = function(p, u) {};
    this.unload = function() {
        q.off("click", this._onLogoButRelease);
        e.unload();
        e = null;
        s_oStage.removeChild(d)
    };
    this._onLogoButRelease = function() {
        window.open("http://www.codethislab.com/index.php?&l=en", "_blank")
    };
    this._init()
}
CTLText.prototype = {
    constructor: CTLText,
    __autofit: function() {
        if (this._bFitText) {
            for (var b = this._iFontSize;
                (this._oText.getBounds().height > this._iHeight - 2 * this._iPaddingV || this._oText.getBounds().width > this._iWidth - 2 * this._iPaddingH) && !(b--, this._oText.font = b + "px " + this._szFont, this._oText.lineHeight = Math.round(b * this._fLineHeightFactor), this.__updateY(), this.__verticalAlign(), 8 > b););
            this._iFontSize = b
        }
    },
    __verticalAlign: function() {
        if (this._bVerticalAlign) {
            var b = this._oText.getBounds().height;
            this._oText.y -=
                (b - this._iHeight) / 2 + this._iPaddingV
        }
    },
    __updateY: function() {
        this._oText.y = this._y + this._iPaddingV;
        switch (this._oText.textBaseline) {
            case "middle":
                this._oText.y += this._oText.lineHeight / 2 + (this._iFontSize * this._fLineHeightFactor - this._iFontSize)
        }
    },
    __createText: function(b) {
        this._bDebug && (this._oDebugShape = new createjs.Shape, this._oDebugShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(this._x, this._y, this._iWidth, this._iHeight), this._oContainer.addChild(this._oDebugShape));
        this._oText = new createjs.Text(b,
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
        this.refreshText(b)
    },
    setVerticalAlign: function(b) {
        this._bVerticalAlign = b
    },
    setOutline: function(b) {
        null !== this._oText && (this._oText.outline = b)
    },
    setVisible: function(b) {
        this._oContainer.visible = b
    },
    setShadow: function(b, g, l, e) {
        null !== this._oText && (this._oText.shadow = new createjs.Shadow(b, g, l, e))
    },
    setColor: function(b) {
        this._oText.color = b
    },
    setAlpha: function(b) {
        this._oText.alpha = b
    },
    setY: function(b) {
        this._oText.y = b
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
    refreshText: function(b) {
        "" === b && (b = " ");
        null === this._oText && this.__createText(b);
        this._oText.text = b;
        this._oText.font = this._iFontSize + "px " + this._szFont;
        this._oText.lineHeight = Math.round(this._iFontSize * this._fLineHeightFactor);
        this.__autofit();
        this.__updateY();
        this.__verticalAlign()
    }
};

function CTLText(b, g, l, e, m, h, q, n, k, d, p, u, c, t, v, y, K) {
    this._oContainer = b;
    this._x = g;
    this._y = l;
    this._iWidth = e;
    this._iHeight = m;
    this._bMultiline = y;
    this._iFontSize = h;
    this._szAlign = q;
    this._szColor = n;
    this._szFont = k;
    this._iPaddingH = p;
    this._iPaddingV = u;
    this._bVerticalAlign = v;
    this._bFitText = t;
    this._bDebug = K;
    this._oDebugShape = null;
    this._fLineHeightFactor = d;
    this._oText = null;
    c && this.__createText(c)
}

function CRechargePanel() {
    var b, g, l, e, m, h, q = this;
    this._init = function() {
        h = new createjs.Container;
        h.visible = !1;
        s_oStage.addChild(h);
        g = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
        b = g.on("click", function() {});
        h.addChild(g);
        m = new CTLText(h, CANVAS_WIDTH / 2 - 240, 230, 480, 150, 40, "center", "#000", FONT_GAME, 1, 0, 0, TEXT_NO_MONEY, !0, !0, !0, !1);
        m.setOutline(3);
        new CTLText(h, CANVAS_WIDTH / 2 - 240, 230, 480, 150, 40, "center", "#fff", FONT_GAME, 1, 0, 0, TEXT_NO_MONEY, !0, !0, !0, !1);
        e = new CTextButton(CANVAS_WIDTH / 2 - 150, CANVAS_HEIGHT /
            2 + 100, s_oSpriteLibrary.getSprite("info_but"), TEXT_EXIT, FONT_GAME, "#fff", 40, h);
        e.addEventListener(ON_MOUSE_UP, this._onExit, this);
        l = new CTextButton(CANVAS_WIDTH / 2 + 150, CANVAS_HEIGHT / 2 + 100, s_oSpriteLibrary.getSprite("info_but"), TEXT_RECHARGE, FONT_GAME, "#fff", 40, h);
        l.addEventListener(ON_MOUSE_UP, this._onRecharge, this)
    };
    this.unload = function() {
        g.off("click", b);
        e.unload();
        e = null;
        l.unload();
        s_oStage.removeChild(h)
    };
    this.show = function() {
        h.alpha = 0;
        h.visible = !0;
        createjs.Tween.get(h).to({
            alpha: 1
        }, 600, createjs.Ease.cubicOut)
    };
    this.hide = function() {
        h.visible = !1
    };
    this._onExit = function() {
        q.hide();
        s_oInterface.enableGuiButtons()
    };
    this._onRecharge = function() {
        $(s_oMain).trigger("recharge");
        q.hide()
    };
    this._init()
};