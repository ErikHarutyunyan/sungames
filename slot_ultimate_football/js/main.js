/*
 screenfull
 v5.0.0 - 2019-09-09
 (c) Sindre Sorhus; MIT License
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
!(function () {
  var a =
      "undefined" != typeof window && void 0 !== window.document
        ? window.document
        : {},
    f = "undefined" != typeof module && module.exports,
    c = (function () {
      for (
        var e,
          k = [
            "requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(
              " "
            ),
            "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(
              " "
            ),
            "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(
              " "
            ),
            "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(
              " "
            ),
            "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(
              " "
            ),
          ],
          l = 0,
          b = k.length,
          q = {};
        l < b;
        l++
      )
        if ((e = k[l]) && e[1] in a) {
          for (l = 0; l < e.length; l++) q[k[0][l]] = e[l];
          return q;
        }
      return !1;
    })(),
    d = { change: c.fullscreenchange, error: c.fullscreenerror },
    g = {
      request: function (e) {
        return new Promise(
          function (k, l) {
            var b = function () {
              this.off("change", b);
              k();
            }.bind(this);
            this.on("change", b);
            e = e || a.documentElement;
            Promise.resolve(e[c.requestFullscreen]())["catch"](l);
          }.bind(this)
        );
      },
      exit: function () {
        return new Promise(
          function (e, k) {
            if (this.isFullscreen) {
              var l = function () {
                this.off("change", l);
                e();
              }.bind(this);
              this.on("change", l);
              Promise.resolve(a[c.exitFullscreen]())["catch"](k);
            } else e();
          }.bind(this)
        );
      },
      toggle: function (e) {
        return this.isFullscreen ? this.exit() : this.request(e);
      },
      onchange: function (e) {
        this.on("change", e);
      },
      onerror: function (e) {
        this.on("error", e);
      },
      on: function (e, k) {
        var l = d[e];
        l && a.addEventListener(l, k, !1);
      },
      off: function (e, k) {
        var l = d[e];
        l && a.removeEventListener(l, k, !1);
      },
      raw: c,
    };
  c
    ? (Object.defineProperties(g, {
        isFullscreen: {
          get: function () {
            return !!a[c.fullscreenElement];
          },
        },
        element: {
          enumerable: !0,
          get: function () {
            return a[c.fullscreenElement];
          },
        },
        isEnabled: {
          enumerable: !0,
          get: function () {
            return !!a[c.fullscreenEnabled];
          },
        },
      }),
      f ? (module.exports = g) : (window.screenfull = g))
    : f
    ? (module.exports = { isEnabled: !1 })
    : (window.screenfull = { isEnabled: !1 });
})();
(function () {
  function a(p) {
    p = String(p);
    return p.charAt(0).toUpperCase() + p.slice(1);
  }
  function f(p, F) {
    var K = -1,
      A = p ? p.length : 0;
    if ("number" == typeof A && -1 < A && A <= v)
      for (; ++K < A; ) F(p[K], K, p);
    else d(p, F);
  }
  function c(p) {
    p = String(p).replace(/^ +| +$/g, "");
    return /^(?:webOS|i(?:OS|P))/.test(p) ? p : a(p);
  }
  function d(p, F) {
    for (var K in p) B.call(p, K) && F(p[K], K, p);
  }
  function g(p) {
    return null == p ? a(p) : z.call(p).slice(8, -1);
  }
  function e(p, F) {
    var K = null != p ? typeof p[F] : "number";
    return (
      !/^(?:boolean|number|string|undefined)$/.test(K) &&
      ("object" == K ? !!p[F] : !0)
    );
  }
  function k(p) {
    return String(p).replace(/([ -])(?!$)/g, "$1?");
  }
  function l(p, F) {
    var K = null;
    f(p, function (A, y) {
      K = F(K, A, y, p);
    });
    return K;
  }
  function b(p) {
    function F(S) {
      return l(S, function (X, W) {
        var aa = W.pattern || k(W);
        !X &&
          (X =
            RegExp("\\b" + aa + " *\\d+[.\\w_]*", "i").exec(p) ||
            RegExp("\\b" + aa + " *\\w+-[\\w]*", "i").exec(p) ||
            RegExp(
              "\\b" + aa + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)",
              "i"
            ).exec(p)) &&
          ((X = String(
            W.label && !RegExp(aa, "i").test(W.label) ? W.label : X
          ).split("/"))[1] &&
            !/[\d.]+/.test(X[0]) &&
            (X[0] += " " + X[1]),
          (W = W.label || W),
          (X = c(
            X[0]
              .replace(RegExp(aa, "i"), W)
              .replace(RegExp("; *(?:" + W + "[_-])?", "i"), " ")
              .replace(RegExp("(" + W + ")[-_.]?(\\w)", "i"), "$1 $2")
          )));
        return X;
      });
    }
    function K(S) {
      return l(S, function (X, W) {
        return (
          X ||
          (RegExp(
            W + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)",
            "i"
          ).exec(p) || 0)[1] ||
          null
        );
      });
    }
    var A = n,
      y = p && "object" == typeof p && "String" != g(p);
    y && ((A = p), (p = null));
    var L = A.navigator || {},
      C = L.userAgent || "";
    p || (p = C);
    var P = y
        ? !!L.likeChrome
        : /\bChrome\b/.test(p) && !/internal|\n/i.test(z.toString()),
      Y = y ? "Object" : "ScriptBridgingProxyObject",
      R = y ? "Object" : "Environment",
      U = y && A.java ? "JavaPackage" : g(A.java),
      O = y ? "Object" : "RuntimeObject";
    R = (U = /\bJava/.test(U) && A.java) && g(A.environment) == R;
    var Z = U ? "a" : "\u03b1",
      J = U ? "b" : "\u03b2",
      D = A.document || {},
      I = A.operamini || A.opera,
      H = x.test((H = y && I ? I["[[Class]]"] : g(I))) ? H : (I = null),
      h,
      Q = p;
    y = [];
    var V = null,
      m = p == C;
    C = m && I && "function" == typeof I.version && I.version();
    var u = (function (S) {
        return l(S, function (X, W) {
          return (
            X ||
            (RegExp("\\b" + (W.pattern || k(W)) + "\\b", "i").exec(p) &&
              (W.label || W))
          );
        });
      })([
        { label: "EdgeHTML", pattern: "Edge" },
        "Trident",
        { label: "WebKit", pattern: "AppleWebKit" },
        "iCab",
        "Presto",
        "NetFront",
        "Tasman",
        "KHTML",
        "Gecko",
      ]),
      r = (function (S) {
        return l(S, function (X, W) {
          return (
            X ||
            (RegExp("\\b" + (W.pattern || k(W)) + "\\b", "i").exec(p) &&
              (W.label || W))
          );
        });
      })([
        "Adobe AIR",
        "Arora",
        "Avant Browser",
        "Breach",
        "Camino",
        "Electron",
        "Epiphany",
        "Fennec",
        "Flock",
        "Galeon",
        "GreenBrowser",
        "iCab",
        "Iceweasel",
        "K-Meleon",
        "Konqueror",
        "Lunascape",
        "Maxthon",
        { label: "Microsoft Edge", pattern: "Edge" },
        "Midori",
        "Nook Browser",
        "PaleMoon",
        "PhantomJS",
        "Raven",
        "Rekonq",
        "RockMelt",
        { label: "Samsung Internet", pattern: "SamsungBrowser" },
        "SeaMonkey",
        { label: "Silk", pattern: "(?:Cloud9|Silk-Accelerated)" },
        "Sleipnir",
        "SlimBrowser",
        { label: "SRWare Iron", pattern: "Iron" },
        "Sunrise",
        "Swiftfox",
        "Waterfox",
        "WebPositive",
        "Opera Mini",
        { label: "Opera Mini", pattern: "OPiOS" },
        "Opera",
        { label: "Opera", pattern: "OPR" },
        "Chrome",
        { label: "Chrome Mobile", pattern: "(?:CriOS|CrMo)" },
        { label: "Firefox", pattern: "(?:Firefox|Minefield)" },
        { label: "Firefox for iOS", pattern: "FxiOS" },
        { label: "IE", pattern: "IEMobile" },
        { label: "IE", pattern: "MSIE" },
        "Safari",
      ]),
      M = F([
        { label: "BlackBerry", pattern: "BB10" },
        "BlackBerry",
        { label: "Galaxy S", pattern: "GT-I9000" },
        { label: "Galaxy S2", pattern: "GT-I9100" },
        { label: "Galaxy S3", pattern: "GT-I9300" },
        { label: "Galaxy S4", pattern: "GT-I9500" },
        { label: "Galaxy S5", pattern: "SM-G900" },
        { label: "Galaxy S6", pattern: "SM-G920" },
        { label: "Galaxy S6 Edge", pattern: "SM-G925" },
        { label: "Galaxy S7", pattern: "SM-G930" },
        { label: "Galaxy S7 Edge", pattern: "SM-G935" },
        "Google TV",
        "Lumia",
        "iPad",
        "iPod",
        "iPhone",
        "Kindle",
        { label: "Kindle Fire", pattern: "(?:Cloud9|Silk-Accelerated)" },
        "Nexus",
        "Nook",
        "PlayBook",
        "PlayStation Vita",
        "PlayStation",
        "TouchPad",
        "Transformer",
        { label: "Wii U", pattern: "WiiU" },
        "Wii",
        "Xbox One",
        { label: "Xbox 360", pattern: "Xbox" },
        "Xoom",
      ]),
      T = (function (S) {
        return l(S, function (X, W, aa) {
          return (
            X ||
            ((W[M] ||
              W[/^[a-z]+(?: +[a-z]+\b)*/i.exec(M)] ||
              RegExp("\\b" + k(aa) + "(?:\\b|\\w*\\d)", "i").exec(p)) &&
              aa)
          );
        });
      })({
        Apple: { iPad: 1, iPhone: 1, iPod: 1 },
        Archos: {},
        Amazon: { Kindle: 1, "Kindle Fire": 1 },
        Asus: { Transformer: 1 },
        "Barnes & Noble": { Nook: 1 },
        BlackBerry: { PlayBook: 1 },
        Google: { "Google TV": 1, Nexus: 1 },
        HP: { TouchPad: 1 },
        HTC: {},
        LG: {},
        Microsoft: { Xbox: 1, "Xbox One": 1 },
        Motorola: { Xoom: 1 },
        Nintendo: { "Wii U": 1, Wii: 1 },
        Nokia: { Lumia: 1 },
        Samsung: {
          "Galaxy S": 1,
          "Galaxy S2": 1,
          "Galaxy S3": 1,
          "Galaxy S4": 1,
        },
        Sony: { PlayStation: 1, "PlayStation Vita": 1 },
      }),
      E = (function (S) {
        return l(S, function (X, W) {
          var aa = W.pattern || k(W);
          if (
            !X &&
            (X = RegExp("\\b" + aa + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(p))
          ) {
            var ba = X,
              ca = W.label || W,
              da = {
                "10.0": "10",
                6.4: "10 Technical Preview",
                6.3: "8.1",
                6.2: "8",
                6.1: "Server 2008 R2 / 7",
                "6.0": "Server 2008 / Vista",
                5.2: "Server 2003 / XP 64-bit",
                5.1: "XP",
                5.01: "2000 SP1",
                "5.0": "2000",
                "4.0": "NT",
                "4.90": "ME",
              };
            aa &&
              ca &&
              /^Win/i.test(ba) &&
              !/^Windows Phone /i.test(ba) &&
              (da = da[/[\d.]+$/.exec(ba)]) &&
              (ba = "Windows " + da);
            ba = String(ba);
            aa && ca && (ba = ba.replace(RegExp(aa, "i"), ca));
            X = ba = c(
              ba
                .replace(/ ce$/i, " CE")
                .replace(/\bhpw/i, "web")
                .replace(/\bMacintosh\b/, "Mac OS")
                .replace(/_PowerPC\b/i, " OS")
                .replace(/\b(OS X) [^ \d]+/i, "$1")
                .replace(/\bMac (OS X)\b/, "$1")
                .replace(/\/(\d)/, " $1")
                .replace(/_/g, ".")
                .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "")
                .replace(/\bx86\.64\b/gi, "x86_64")
                .replace(/\b(Windows Phone) OS\b/, "$1")
                .replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1")
                .split(" on ")[0]
            );
          }
          return X;
        });
      })([
        "Windows Phone",
        "Android",
        "CentOS",
        { label: "Chrome OS", pattern: "CrOS" },
        "Debian",
        "Fedora",
        "FreeBSD",
        "Gentoo",
        "Haiku",
        "Kubuntu",
        "Linux Mint",
        "OpenBSD",
        "Red Hat",
        "SuSE",
        "Ubuntu",
        "Xubuntu",
        "Cygwin",
        "Symbian OS",
        "hpwOS",
        "webOS ",
        "webOS",
        "Tablet OS",
        "Tizen",
        "Linux",
        "Mac OS X",
        "Macintosh",
        "Mac",
        "Windows 98;",
        "Windows ",
      ]);
    u && (u = [u]);
    T && !M && (M = F([T]));
    if ((h = /\bGoogle TV\b/.exec(M))) M = h[0];
    /\bSimulator\b/i.test(p) && (M = (M ? M + " " : "") + "Simulator");
    "Opera Mini" == r &&
      /\bOPiOS\b/.test(p) &&
      y.push("running in Turbo/Uncompressed mode");
    "IE" == r && /\blike iPhone OS\b/.test(p)
      ? ((h = b(p.replace(/like iPhone OS/, ""))),
        (T = h.manufacturer),
        (M = h.product))
      : /^iP/.test(M)
      ? (r || (r = "Safari"),
        (E =
          "iOS" +
          ((h = / OS ([\d_]+)/i.exec(p)) ? " " + h[1].replace(/_/g, ".") : "")))
      : "Konqueror" != r || /buntu/i.test(E)
      ? (T &&
          "Google" != T &&
          ((/Chrome/.test(r) && !/\bMobile Safari\b/i.test(p)) ||
            /\bVita\b/.test(M))) ||
        (/\bAndroid\b/.test(E) && /^Chrome/.test(r) && /\bVersion\//i.test(p))
        ? ((r = "Android Browser"), (E = /\bAndroid\b/.test(E) ? E : "Android"))
        : "Silk" == r
        ? (/\bMobi/i.test(p) || ((E = "Android"), y.unshift("desktop mode")),
          /Accelerated *= *true/i.test(p) && y.unshift("accelerated"))
        : "PaleMoon" == r && (h = /\bFirefox\/([\d.]+)\b/.exec(p))
        ? y.push("identifying as Firefox " + h[1])
        : "Firefox" == r && (h = /\b(Mobile|Tablet|TV)\b/i.exec(p))
        ? (E || (E = "Firefox OS"), M || (M = h[1]))
        : !r ||
          (h = !/\bMinefield\b/i.test(p) && /\b(?:Firefox|Safari)\b/.exec(r))
        ? (r &&
            !M &&
            /[\/,]|^[^(]+?\)/.test(p.slice(p.indexOf(h + "/") + 8)) &&
            (r = null),
          (h = M || T || E) &&
            (M || T || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(E)) &&
            (r =
              /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(E) ? E : h) +
              " Browser"))
        : "Electron" == r &&
          (h = (/\bChrome\/([\d.]+)\b/.exec(p) || 0)[1]) &&
          y.push("Chromium " + h)
      : (E = "Kubuntu");
    C ||
      (C = K([
        "(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))",
        "Version",
        k(r),
        "(?:Firefox|Minefield|NetFront)",
      ]));
    if (
      (h =
        ("iCab" == u && 3 < parseFloat(C) && "WebKit") ||
        (/\bOpera\b/.test(r) && (/\bOPR\b/.test(p) ? "Blink" : "Presto")) ||
        (/\b(?:Midori|Nook|Safari)\b/i.test(p) &&
          !/^(?:Trident|EdgeHTML)$/.test(u) &&
          "WebKit") ||
        (!u && /\bMSIE\b/i.test(p) && ("Mac OS" == E ? "Tasman" : "Trident")) ||
        ("WebKit" == u && /\bPlayStation\b(?! Vita\b)/i.test(r) && "NetFront"))
    )
      u = [h];
    "IE" == r && (h = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(p) || 0)[1])
      ? ((r += " Mobile"),
        (E = "Windows Phone " + (/\+$/.test(h) ? h : h + ".x")),
        y.unshift("desktop mode"))
      : /\bWPDesktop\b/i.test(p)
      ? ((r = "IE Mobile"),
        (E = "Windows Phone 8.x"),
        y.unshift("desktop mode"),
        C || (C = (/\brv:([\d.]+)/.exec(p) || 0)[1]))
      : "IE" != r &&
        "Trident" == u &&
        (h = /\brv:([\d.]+)/.exec(p)) &&
        (r && y.push("identifying as " + r + (C ? " " + C : "")),
        (r = "IE"),
        (C = h[1]));
    if (m) {
      if (e(A, "global"))
        if (
          (U &&
            ((h = U.lang.System),
            (Q = h.getProperty("os.arch")),
            (E =
              E ||
              h.getProperty("os.name") + " " + h.getProperty("os.version"))),
          R)
        ) {
          try {
            (C = A.require("ringo/engine").version.join(".")), (r = "RingoJS");
          } catch (S) {
            (h = A.system) &&
              h.global.system == A.system &&
              ((r = "Narwhal"), E || (E = h[0].os || null));
          }
          r || (r = "Rhino");
        } else
          "object" == typeof A.process &&
            !A.process.browser &&
            (h = A.process) &&
            ("object" == typeof h.versions &&
              ("string" == typeof h.versions.electron
                ? (y.push("Node " + h.versions.node),
                  (r = "Electron"),
                  (C = h.versions.electron))
                : "string" == typeof h.versions.nw &&
                  (y.push("Chromium " + C, "Node " + h.versions.node),
                  (r = "NW.js"),
                  (C = h.versions.nw))),
            r ||
              ((r = "Node.js"),
              (Q = h.arch),
              (E = h.platform),
              (C = (C = /[\d.]+/.exec(h.version)) ? C[0] : null)));
      else
        g((h = A.runtime)) == Y
          ? ((r = "Adobe AIR"), (E = h.flash.system.Capabilities.os))
          : g((h = A.phantom)) == O
          ? ((r = "PhantomJS"),
            (C =
              (h = h.version || null) &&
              h.major + "." + h.minor + "." + h.patch))
          : "number" == typeof D.documentMode &&
            (h = /\bTrident\/(\d+)/i.exec(p))
          ? ((C = [C, D.documentMode]),
            (h = +h[1] + 4) != C[1] &&
              (y.push("IE " + C[1] + " mode"), u && (u[1] = ""), (C[1] = h)),
            (C = "IE" == r ? String(C[1].toFixed(1)) : C[0]))
          : "number" == typeof D.documentMode &&
            /^(?:Chrome|Firefox)\b/.test(r) &&
            (y.push("masking as " + r + " " + C),
            (r = "IE"),
            (C = "11.0"),
            (u = ["Trident"]),
            (E = "Windows"));
      E = E && c(E);
    }
    C &&
      (h =
        /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(C) ||
        /(?:alpha|beta)(?: ?\d)?/i.exec(p + ";" + (m && L.appMinorVersion)) ||
        (/\bMinefield\b/i.test(p) && "a")) &&
      ((V = /b/i.test(h) ? "beta" : "alpha"),
      (C =
        C.replace(RegExp(h + "\\+?$"), "") +
        ("beta" == V ? J : Z) +
        (/\d+\+?/.exec(h) || "")));
    if (
      "Fennec" == r ||
      ("Firefox" == r && /\b(?:Android|Firefox OS)\b/.test(E))
    )
      r = "Firefox Mobile";
    else if ("Maxthon" == r && C) C = C.replace(/\.[\d.]+/, ".x");
    else if (/\bXbox\b/i.test(M))
      "Xbox 360" == M && (E = null),
        "Xbox 360" == M && /\bIEMobile\b/.test(p) && y.unshift("mobile mode");
    else if (
      (!/^(?:Chrome|IE|Opera)$/.test(r) &&
        (!r || M || /Browser|Mobi/.test(r))) ||
      ("Windows CE" != E && !/Mobi/i.test(p))
    )
      if ("IE" == r && m)
        try {
          null === A.external && y.unshift("platform preview");
        } catch (S) {
          y.unshift("embedded");
        }
      else
        (/\bBlackBerry\b/.test(M) || /\bBB10\b/.test(p)) &&
        (h =
          (RegExp(M.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(p) ||
            0)[1] || C)
          ? ((h = [h, /BB10/.test(p)]),
            (E =
              (h[1] ? ((M = null), (T = "BlackBerry")) : "Device Software") +
              " " +
              h[0]),
            (C = null))
          : this != d &&
            "Wii" != M &&
            ((m && I) ||
              (/Opera/.test(r) && /\b(?:MSIE|Firefox)\b/i.test(p)) ||
              ("Firefox" == r && /\bOS X (?:\d+\.){2,}/.test(E)) ||
              ("IE" == r &&
                ((E && !/^Win/.test(E) && 5.5 < C) ||
                  (/\bWindows XP\b/.test(E) && 8 < C) ||
                  (8 == C && !/\bTrident\b/.test(p))))) &&
            !x.test((h = b.call(d, p.replace(x, "") + ";"))) &&
            h.name &&
            ((h = "ing as " + h.name + ((h = h.version) ? " " + h : "")),
            x.test(r)
              ? (/\bIE\b/.test(h) && "Mac OS" == E && (E = null),
                (h = "identify" + h))
              : ((h = "mask" + h),
                (r = H ? c(H.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera"),
                /\bIE\b/.test(h) && (E = null),
                m || (C = null)),
            (u = ["Presto"]),
            y.push(h));
    else r += " Mobile";
    if ((h = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(p) || 0)[1])) {
      h = [parseFloat(h.replace(/\.(\d)$/, ".0$1")), h];
      if ("Safari" == r && "+" == h[1].slice(-1))
        (r = "WebKit Nightly"), (V = "alpha"), (C = h[1].slice(0, -1));
      else if (
        C == h[1] ||
        C == (h[2] = (/\bSafari\/([\d.]+\+?)/i.exec(p) || 0)[1])
      )
        C = null;
      h[1] = (/\bChrome\/([\d.]+)/i.exec(p) || 0)[1];
      537.36 == h[0] &&
        537.36 == h[2] &&
        28 <= parseFloat(h[1]) &&
        "WebKit" == u &&
        (u = ["Blink"]);
      m && (P || h[1])
        ? (u && (u[1] = "like Chrome"),
          (h =
            h[1] ||
            ((h = h[0]),
            530 > h
              ? 1
              : 532 > h
              ? 2
              : 532.05 > h
              ? 3
              : 533 > h
              ? 4
              : 534.03 > h
              ? 5
              : 534.07 > h
              ? 6
              : 534.1 > h
              ? 7
              : 534.13 > h
              ? 8
              : 534.16 > h
              ? 9
              : 534.24 > h
              ? 10
              : 534.3 > h
              ? 11
              : 535.01 > h
              ? 12
              : 535.02 > h
              ? "13+"
              : 535.07 > h
              ? 15
              : 535.11 > h
              ? 16
              : 535.19 > h
              ? 17
              : 536.05 > h
              ? 18
              : 536.1 > h
              ? 19
              : 537.01 > h
              ? 20
              : 537.11 > h
              ? "21+"
              : 537.13 > h
              ? 23
              : 537.18 > h
              ? 24
              : 537.24 > h
              ? 25
              : 537.36 > h
              ? 26
              : "Blink" != u
              ? "27"
              : "28")))
        : (u && (u[1] = "like Safari"),
          (h =
            ((h = h[0]),
            400 > h
              ? 1
              : 500 > h
              ? 2
              : 526 > h
              ? 3
              : 533 > h
              ? 4
              : 534 > h
              ? "4+"
              : 535 > h
              ? 5
              : 537 > h
              ? 6
              : 538 > h
              ? 7
              : 601 > h
              ? 8
              : "8")));
      u &&
        (u[1] +=
          " " + (h += "number" == typeof h ? ".x" : /[.+]/.test(h) ? "" : "+"));
      "Safari" == r && (!C || 45 < parseInt(C)) && (C = h);
    }
    "Opera" == r && (h = /\bzbov|zvav$/.exec(E))
      ? ((r += " "),
        y.unshift("desktop mode"),
        "zvav" == h ? ((r += "Mini"), (C = null)) : (r += "Mobile"),
        (E = E.replace(RegExp(" *" + h + "$"), "")))
      : "Safari" == r &&
        /\bChrome\b/.exec(u && u[1]) &&
        (y.unshift("desktop mode"),
        (r = "Chrome Mobile"),
        (C = null),
        /\bOS X\b/.test(E) ? ((T = "Apple"), (E = "iOS 4.3+")) : (E = null));
    C &&
      0 == C.indexOf((h = /[\d.]+$/.exec(E))) &&
      -1 < p.indexOf("/" + h + "-") &&
      (E = String(E.replace(h, "")).replace(/^ +| +$/g, ""));
    u &&
      !/\b(?:Avant|Nook)\b/.test(r) &&
      (/Browser|Lunascape|Maxthon/.test(r) ||
        ("Safari" != r && /^iOS/.test(E) && /\bSafari\b/.test(u[1])) ||
        (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
          r
        ) &&
          u[1])) &&
      (h = u[u.length - 1]) &&
      y.push(h);
    y.length && (y = ["(" + y.join("; ") + ")"]);
    T && M && 0 > M.indexOf(T) && y.push("on " + T);
    M && y.push((/^on /.test(y[y.length - 1]) ? "" : "on ") + M);
    if (E) {
      var G =
        (h = / ([\d.+]+)$/.exec(E)) &&
        "/" == E.charAt(E.length - h[0].length - 1);
      E = {
        architecture: 32,
        family: h && !G ? E.replace(h[0], "") : E,
        version: h ? h[1] : null,
        toString: function () {
          var S = this.version;
          return (
            this.family +
            (S && !G ? " " + S : "") +
            (64 == this.architecture ? " 64-bit" : "")
          );
        },
      };
    }
    (h = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(Q)) && !/\bi686\b/i.test(Q)
      ? (E &&
          ((E.architecture = 64),
          (E.family = E.family.replace(RegExp(" *" + h), ""))),
        r &&
          (/\bWOW64\b/i.test(p) ||
            (m &&
              /\w(?:86|32)$/.test(L.cpuClass || L.platform) &&
              !/\bWin64; x64\b/i.test(p))) &&
          y.unshift("32-bit"))
      : E &&
        /^OS X/.test(E.family) &&
        "Chrome" == r &&
        39 <= parseFloat(C) &&
        (E.architecture = 64);
    p || (p = null);
    A = {};
    A.description = p;
    A.layout = u && u[0];
    A.manufacturer = T;
    A.name = r;
    A.prerelease = V;
    A.product = M;
    A.ua = p;
    A.version = r && C;
    A.os = E || {
      architecture: null,
      family: null,
      version: null,
      toString: function () {
        return "null";
      },
    };
    A.parse = b;
    A.toString = function () {
      return this.description || "";
    };
    A.version && y.unshift(C);
    A.name && y.unshift(r);
    E &&
      r &&
      (E != String(E).split(" ")[0] || (E != r.split(" ")[0] && !M)) &&
      y.push(M ? "(" + E + ")" : "on " + E);
    y.length && (A.description = y.join(" "));
    return A;
  }
  var q = { function: !0, object: !0 },
    n = (q[typeof window] && window) || this,
    w = q[typeof exports] && exports;
  q = q[typeof module] && module && !module.nodeType && module;
  var t = w && q && "object" == typeof global && global;
  !t || (t.global !== t && t.window !== t && t.self !== t) || (n = t);
  var v = Math.pow(2, 53) - 1,
    x = /\bOpera/;
  t = Object.prototype;
  var B = t.hasOwnProperty,
    z = t.toString,
    N = b();
  "function" == typeof define && "object" == typeof define.amd && define.amd
    ? ((n.platform = N),
      define(function () {
        return N;
      }))
    : w && q
    ? d(N, function (p, F) {
        w[F] = p;
      })
    : (n.platform = N);
}).call(this);
function buildIOSMeta() {
  for (
    var a = [
        {
          name: "viewport",
          content:
            "width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no",
        },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black" },
      ],
      f = 0;
    f < a.length;
    f++
  ) {
    var c = document.createElement("meta");
    c.name = a[f].name;
    c.content = a[f].content;
    var d = window.document.head.querySelector('meta[name="' + c.name + '"]');
    d && d.parentNode.removeChild(d);
    window.document.head.appendChild(c);
  }
}
function hideIOSFullscreenPanel() {
  jQuery(".xxx-ios-fullscreen-message").css("display", "none");
  jQuery(".xxx-ios-fullscreen-scroll").css("display", "none");
  jQuery(".xxx-game-iframe-full").removeClass("xxx-game-iframe-iphone-se");
}
function buildIOSFullscreenPanel() {
  jQuery("body").append(
    '<div class="xxx-ios-fullscreen-message"><div class="xxx-ios-fullscreen-swipe"></div></div><div class="xxx-ios-fullscreen-scroll"></div>'
  );
}
function showIOSFullscreenPanel() {
  jQuery(".xxx-ios-fullscreen-message").css("display", "block");
  jQuery(".xxx-ios-fullscreen-scroll").css("display", "block");
}
function __iosResize() {
  window.scrollTo(0, 0);
  console.log(window.devicePixelRatio);
  console.log(window.innerWidth);
  console.log(window.innerHeight);
  if ("iPhone" === platform.product)
    switch (window.devicePixelRatio) {
      case 2:
        switch (window.innerWidth) {
          case 568:
            320 !== window.innerHeight &&
              jQuery(".xxx-game-iframe-full").addClass(
                "xxx-game-iframe-iphone-se"
              );
            break;
          case 667:
            375 === window.innerHeight
              ? hideIOSFullscreenPanel()
              : showIOSFullscreenPanel();
            break;
          case 808:
            414 === window.innerHeight
              ? hideIOSFullscreenPanel()
              : showIOSFullscreenPanel();
            break;
          default:
            hideIOSFullscreenPanel();
        }
        break;
      case 3:
        switch (window.innerWidth) {
          case 736:
            414 === window.innerHeight
              ? hideIOSFullscreenPanel()
              : showIOSFullscreenPanel();
            break;
          case 724:
            375 === window.innerHeight
              ? hideIOSFullscreenPanel()
              : showIOSFullscreenPanel();
            break;
          case 808:
            414 === window.innerHeight
              ? hideIOSFullscreenPanel()
              : showIOSFullscreenPanel();
            break;
          default:
            hideIOSFullscreenPanel();
        }
        break;
      default:
        hideIOSFullscreenPanel();
    }
}
function iosResize() {
  __iosResize();
  setTimeout(function () {
    __iosResize();
  }, 500);
}
function iosInIframe() {
  try {
    return window.self !== window.top;
  } catch (a) {
    return !0;
  }
}
function isIOSLessThen13() {
  var a = platform.os,
    f = a.family.toLowerCase();
  a = parseFloat(a.version);
  return "ios" === f && 13 > a ? !0 : !1;
}
$(document).ready(function () {
  platform &&
    "iPhone" === platform.product &&
    "safari" === platform.name.toLowerCase() &&
    isIOSLessThen13() &&
    !iosInIframe() &&
    (buildIOSFullscreenPanel(), buildIOSMeta());
});
jQuery(window).resize(function () {
  platform &&
    "iPhone" === platform.product &&
    "safari" === platform.name.toLowerCase() &&
    isIOSLessThen13() &&
    !iosInIframe() &&
    iosResize();
});
var s_iOffsetX,
  s_iOffsetY,
  s_iScaleFactor = 1,
  s_bIsIphone = !1,
  s_bFocus = !0;
(function (a) {
  (jQuery.browser = jQuery.browser || {}).mobile =
    /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(
      a
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(
      a.substr(0, 4)
    );
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function () {
  sizeHandler();
});
function trace(a) {
  console.log(a);
}
function isChrome() {
  return (
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
  );
}
function isIOS() {
  var a =
    "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(
      ";"
    );
  if (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone"))
    return (s_bIsIphone = !0);
  for (; a.length; ) if (navigator.platform === a.pop()) return !0;
  return (s_bIsIphone = !1);
}
function isIpad() {
  var a = -1 !== navigator.userAgent.toLowerCase().indexOf("ipad");
  return !a &&
    navigator.userAgent.match(/Mac/) &&
    navigator.maxTouchPoints &&
    2 < navigator.maxTouchPoints
    ? !0
    : a;
}
function isMobile() {
  return isIpad() ? !0 : jQuery.browser.mobile;
}
function getSize(a) {
  var f = a.toLowerCase(),
    c = window.document,
    d = c.documentElement;
  if (void 0 === window["inner" + a]) a = d["client" + a];
  else if (window["inner" + a] != d["client" + a]) {
    var g = c.createElement("body");
    g.id = "vpw-test-b";
    g.style.cssText = "overflow:scroll";
    var e = c.createElement("div");
    e.id = "vpw-test-d";
    e.style.cssText = "position:absolute;top:-1000px";
    e.innerHTML =
      "<style>@media(" +
      f +
      ":" +
      d["client" + a] +
      "px){body#vpw-test-b div#vpw-test-d{" +
      f +
      ":7px!important}}</style>";
    g.appendChild(e);
    d.insertBefore(g, c.head);
    a = 7 == e["offset" + a] ? d["client" + a] : window["inner" + a];
    d.removeChild(g);
  } else a = window["inner" + a];
  return a;
}
window.addEventListener("orientationchange", onOrientationChange);
function onOrientationChange() {
  window.matchMedia("(orientation: portrait)").matches && sizeHandler();
  window.matchMedia("(orientation: landscape)").matches && sizeHandler();
}
function getIOSWindowHeight() {
  return (
    (document.documentElement.clientWidth / window.innerWidth) *
    window.innerHeight
  );
}
function getHeightOfIOSToolbars() {
  var a =
    (0 === window.orientation ? screen.height : screen.width) -
    getIOSWindowHeight();
  return 1 < a ? a : 0;
}
function sizeHandler() {
  window.scrollTo(0, 1);
  if ($("#canvas")) {
    var a =
      null !== platform.name && "safari" === platform.name.toLowerCase()
        ? getIOSWindowHeight()
        : getSize("Height");
    var f = getSize("Width");
    s_bFocus && _checkOrientation(f, a);
    var c = Math.min(a / CANVAS_HEIGHT, f / CANVAS_WIDTH),
      d = Math.round(CANVAS_WIDTH * c);
    c = Math.round(CANVAS_HEIGHT * c);
    if (c < a) {
      var g = a - c;
      c += g;
      d += (CANVAS_WIDTH / CANVAS_HEIGHT) * g;
    } else
      d < f &&
        ((g = f - d), (d += g), (c += (CANVAS_HEIGHT / CANVAS_WIDTH) * g));
    g = a / 2 - c / 2;
    var e = f / 2 - d / 2,
      k = CANVAS_WIDTH / d;
    if (e * k < -EDGEBOARD_X || g * k < -EDGEBOARD_Y)
      (c = Math.min(
        a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y),
        f / (CANVAS_WIDTH - 2 * EDGEBOARD_X)
      )),
        (d = Math.round(CANVAS_WIDTH * c)),
        (c = Math.round(CANVAS_HEIGHT * c)),
        (g = (a - c) / 2),
        (e = (f - d) / 2),
        (k = CANVAS_WIDTH / d);
    s_iOffsetX = -1 * e * k;
    s_iOffsetY = -1 * g * k;
    0 <= g && (s_iOffsetY = 0);
    0 <= e && (s_iOffsetX = 0);
    null !== s_oGame && s_oGame.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    s_bIsIphone && s_oStage
      ? ((canvas = document.getElementById("canvas")),
        (s_oStage.canvas.width = 2 * d),
        (s_oStage.canvas.height = 2 * c),
        (canvas.style.width = d + "px"),
        (canvas.style.height = c + "px"),
        (f = Math.min(d / CANVAS_WIDTH, c / CANVAS_HEIGHT)),
        (s_iScaleFactor = 2 * f),
        (s_oStage.scaleX = s_oStage.scaleY = 2 * f))
      : s_bMobile || isChrome()
      ? ($("#canvas").css("width", d + "px"),
        $("#canvas").css("height", c + "px"))
      : s_oStage &&
        ((s_oStage.canvas.width = d),
        (s_oStage.canvas.height = c),
        (s_iScaleFactor = Math.min(d / CANVAS_WIDTH, c / CANVAS_HEIGHT)),
        (s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor));
    0 > g || (g = (a - c) / 2);
    $("#canvas").css("top", g + "px");
    $("#canvas").css("left", e + "px");
    fullscreenHandler();
  }
}
function _checkOrientation(a, f) {
  s_bMobile &&
    ENABLE_CHECK_ORIENTATION &&
    (a > f
      ? "landscape" === $(".orientation-msg-container").attr("data-orientation")
        ? ($(".orientation-msg-container").css("display", "none"),
          s_oMain.startUpdate())
        : ($(".orientation-msg-container").css("display", "block"),
          s_oMain.stopUpdate())
      : "portrait" === $(".orientation-msg-container").attr("data-orientation")
      ? ($(".orientation-msg-container").css("display", "none"),
        s_oMain.startUpdate())
      : ($(".orientation-msg-container").css("display", "block"),
        s_oMain.stopUpdate()));
}
function createBitmap(a, f, c) {
  var d = new createjs.Bitmap(a),
    g = new createjs.Shape();
  f && c
    ? g.graphics.beginFill("#fff").drawRect(0, 0, f, c)
    : g.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
  d.hitArea = g;
  return d;
}
function createSprite(a, f, c, d, g, e) {
  a = null !== f ? new createjs.Sprite(a, f) : new createjs.Sprite(a);
  g &&
    e &&
    ((f = new createjs.Shape()),
    f.graphics.beginFill("#000000").drawRect(-c, -d, g, e),
    (a.hitArea = f));
  return a;
}
function randomFloatBetween(a, f, c) {
  "undefined" === typeof c && (c = 2);
  return parseFloat(Math.min(a + Math.random() * (f - a), f).toFixed(c));
}
function shuffle(a) {
  for (var f = a.length, c, d; 0 !== f; )
    (d = Math.floor(Math.random() * f)),
      --f,
      (c = a[f]),
      (a[f] = a[d]),
      (a[d] = c);
  return a;
}
function interpolate(a, f, c) {
  return { x: a.x + (f.x - a.x) * c, y: a.y + (f.y - a.y) * c };
}
function formatTime(a) {
  a /= 1e3;
  var f = Math.floor(a / 60);
  a = parseFloat(a - 60 * f).toFixed(1);
  var c = "";
  c = 10 > f ? c + ("0" + f + ":") : c + (f + ":");
  return 10 > a ? c + ("0" + a) : c + a;
}
function NoClickDelay(a) {
  this.element = a;
  window.Touch && this.element.addEventListener("touchstart", this, !1);
}
NoClickDelay.prototype = {
  handleEvent: function (a) {
    switch (a.type) {
      case "touchstart":
        this.onTouchStart(a);
        break;
      case "touchmove":
        this.onTouchMove(a);
        break;
      case "touchend":
        this.onTouchEnd(a);
    }
  },
  onTouchStart: function (a) {
    a.preventDefault();
    this.moved = !1;
    this.element.addEventListener("touchmove", this, !1);
    this.element.addEventListener("touchend", this, !1);
  },
  onTouchMove: function (a) {
    this.moved = !0;
  },
  onTouchEnd: function (a) {
    this.element.removeEventListener("touchmove", this, !1);
    this.element.removeEventListener("touchend", this, !1);
    if (!this.moved) {
      a = document.elementFromPoint(
        a.changedTouches[0].clientX,
        a.changedTouches[0].clientY
      );
      3 === a.nodeType && (a = a.parentNode);
      var f = document.createEvent("MouseEvents");
      f.initEvent("click", !0, !0);
      a.dispatchEvent(f);
    }
  },
};
function playSound(a, f, c) {
  return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
    ? (s_aSounds[a].play(),
      s_aSounds[a].volume(f),
      s_aSounds[a].loop(c),
      s_aSounds[a])
    : null;
}
function stopSound(a) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].stop();
}
function setVolume(a, f) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].volume(f);
}
function setMute(a, f) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].mute(f);
}
function ctlArcadeResume() {
  null !== s_oMain && s_oMain.startUpdate();
}
function ctlArcadePause() {
  null !== s_oMain && s_oMain.stopUpdate();
}
function getParamValue(a) {
  for (
    var f = window.location.search.substring(1).split("&"), c = 0;
    c < f.length;
    c++
  ) {
    var d = f[c].split("=");
    if (d[0] == a) return d[1];
  }
}
(function () {
  function a(c) {
    var d = {
      focus: "visible",
      focusin: "visible",
      pageshow: "visible",
      blur: "hidden",
      focusout: "hidden",
      pagehide: "hidden",
    };
    c = c || window.event;
    c.type in d
      ? (document.body.className = d[c.type])
      : ((document.body.className = this[f] ? "hidden" : "visible"),
        "hidden" === document.body.className
          ? (s_oMain.stopUpdate(), (s_bFocus = !1))
          : (s_oMain.startUpdate(), (s_bFocus = !0)));
  }
  var f = "hidden";
  f in document
    ? document.addEventListener("visibilitychange", a)
    : (f = "mozHidden") in document
    ? document.addEventListener("mozvisibilitychange", a)
    : (f = "webkitHidden") in document
    ? document.addEventListener("webkitvisibilitychange", a)
    : (f = "msHidden") in document
    ? document.addEventListener("msvisibilitychange", a)
    : "onfocusin" in document
    ? (document.onfocusin = document.onfocusout = a)
    : (window.onpageshow =
        window.onpagehide =
        window.onfocus =
        window.onblur =
          a);
})();
function fullscreenHandler() {
  ENABLE_FULLSCREEN &&
    screenfull.isEnabled &&
    ((s_bFullscreen = screenfull.isFullscreen),
    null !== s_oInterface && s_oInterface.resetFullscreenBut(),
    null !== s_oMenu && s_oMenu.resetFullscreenBut());
}
if (screenfull.isEnabled)
  screenfull.on("change", function () {
    s_bFullscreen = screenfull.isFullscreen;
    null !== s_oInterface && s_oInterface.resetFullscreenBut();
    null !== s_oMenu && s_oMenu.resetFullscreenBut();
  });
function saveItem(a, f) {
  s_bStorageAvailable && localStorage.setItem(a, f);
}
function getItem(a) {
  return s_bStorageAvailable ? localStorage.getItem(a) : null;
}
function clearLocalStorage() {
  TOTAL_MONEY = START_MONEY;
  if (s_bStorageAvailable)
    for (var a = 0; null !== localStorage.key(a); ) {
      var f = localStorage.key(a);
      -1 !== f.indexOf(LOCALSTORAGE_STRING) ? localStorage.removeItem(f) : a++;
    }
}
function CSpriteLibrary() {
  var a = {},
    f,
    c,
    d,
    g,
    e,
    k;
  this.init = function (l, b, q) {
    f = {};
    d = c = 0;
    g = l;
    e = b;
    k = q;
  };
  this.addSprite = function (l, b) {
    if (a.hasOwnProperty(l)) return !1;
    var q = new Image();
    a[l] = f[l] = { szPath: b, oSprite: q, bLoaded: !1 };
    c++;
    return !0;
  };
  this.getSprite = function (l) {
    return a.hasOwnProperty(l) ? a[l].oSprite : null;
  };
  this._onSpritesLoaded = function () {
    c = 0;
    e.call(k);
  };
  this._onSpriteLoaded = function () {
    g.call(k);
    ++d === c && this._onSpritesLoaded();
  };
  this.loadSprites = function () {
    for (var l in f)
      (f[l].oSprite.oSpriteLibrary = this),
        (f[l].oSprite.szKey = l),
        (f[l].oSprite.onload = function () {
          this.oSpriteLibrary.setLoaded(this.szKey);
          this.oSpriteLibrary._onSpriteLoaded(this.szKey);
        }),
        (f[l].oSprite.onerror = function (b) {
          var q = b.currentTarget;
          setTimeout(function () {
            f[q.szKey].oSprite.src = f[q.szKey].szPath;
          }, 500);
        }),
        (f[l].oSprite.src = f[l].szPath);
  };
  this.setLoaded = function (l) {
    a[l].bLoaded = !0;
  };
  this.isLoaded = function (l) {
    return a[l].bLoaded;
  };
  this.getNumSprites = function () {
    return c;
  };
}
var CANVAS_WIDTH = 1500,
  CANVAS_HEIGHT = 768,
  EDGEBOARD_X = 180,
  EDGEBOARD_Y = 40,
  FPS = 30,
  FPS_TIME = 1e3 / FPS,
  DISABLE_SOUND_MOBILE = !1,
  DISABLE_SOUND_DESKTOP = !1,
  LOCALSTORAGE_STRING = "slot_ultimate_football_",
  FONT_GAME_1 = "robotoblack",
  FONT_GAME_2 = "VT323",
  STATE_LOADING = 0,
  STATE_MENU = 1,
  STATE_GAME = 2,
  GAME_STATE_IDLE = 0,
  GAME_STATE_SPINNING = 1,
  GAME_STATE_SHOW_ALL_WIN = 2,
  GAME_STATE_SHOW_WIN = 3,
  GAME_STATE_BONUS = 4,
  GAME_STATE_FREEKICK = 5,
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
  ON_END_BIG_WIN = 6,
  ON_BUT_YES_DOWN = 7,
  ON_END_PLAYER_MOVE = 8,
  ON_OPPONENT_HIDE = 9,
  ON_OPPONENT_TACKLE = 10,
  ON_BONUS_END = 11,
  ON_FREEKICK_PLAY = 12,
  ON_EXIT_FREEKICKS_MSGBOX = 13,
  ON_EXIT_FREEKICKS = 14,
  STATE_FREEKICKS_IDLE = 0,
  STATE_FREEKICKS_KICK = 1,
  BONUS_ANIM_RUN = 0,
  BONUS_ANIM_FALL = 1,
  BONUS_ANIM_TOUCHDOWN = 2,
  BONUS_BUTTON_1 = "up_left",
  BONUS_BUTTON_2 = "center_left",
  BONUS_BUTTON_3 = "down_left",
  BONUS_BUTTON_4 = "up_right",
  BONUS_BUTTON_5 = "center_right",
  BONUS_BUTTON_6 = "down_right",
  REEL_OFFSET_X = 330,
  REEL_OFFSET_Y = 97,
  WIDTH_MASK_SLOT,
  START_REEL_OFFSET_X,
  START_REEL_OFFSET_Y,
  NUM_REELS = 5,
  NUM_ROWS = 3,
  NUM_SYMBOLS = 10,
  WILD_SYMBOL = 7,
  BONUS_SYMBOL = 9,
  FREESPIN_SYMBOL = 8,
  NUM_PAYLINES = 20,
  SYMBOL_WIDTH = 171,
  SYMBOL_HEIGHT = 164,
  SYMBOL_ANIM_WIDTH = 340,
  SYMBOL_ANIM_HEIGHT = 326,
  WIN_BIG_ANIM_WIDTH = 281,
  WIN_BIG_ANIM_HEIGHT = 270,
  MULT_PER_BONUS_FINAL_PRIZE = 150,
  TIME_OPPONENT_RUN = 3e3,
  STARTING_STANDS_SCALE_BONUS = 0.74,
  SPACE_BETWEEN_SYMBOLS = 12,
  SPACE_HEIGHT_BETWEEN_SYMBOLS = 3,
  MAX_FRAMES_REEL_EASE = 12,
  MIN_REEL_LOOPS,
  REEL_DELAY,
  REEL_START_Y = 20 - 3 * (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS),
  REEL_ARRIVAL_Y = 20 + 3 * (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS),
  TIME_SHOW_WIN,
  TIME_SHOW_ALL_WINS = 2e3,
  MAX_BET,
  TOTAL_MONEY,
  COIN_BET,
  BONUS_FREESPIN = 1,
  BONUS_GAME = 2,
  REEL_SCALE = 1,
  STATE_BONUS_IDLE = 0,
  STATE_BONUS_KICK = 1,
  STATE_BONUS_WIN = 2,
  STATE_BONUS_LOSE = 3,
  ENABLE_FULLSCREEN,
  ENABLE_CHECK_ORIENTATION,
  SOUNDTRACK_VOLUME_IN_GAME = 1,
  RESTART_CREDIT,
  NUM_SPIN_FOR_ADS,
  NULL_TARGET = 0,
  NULL_TARGET_POLE = 1,
  GREEN_TARGET = 2,
  BALL_FLYTIME = 2500,
  BALL_MAX_ROTATION = 30,
  GOAL_AREA = [
    { x: 0, y: -40, width: 750, height: 435 },
    { x: -26, y: -94, width: 750, height: 420 },
    { x: -18, y: -78, width: 750, height: 400 },
  ],
  STAKE_POS = [
    [
      { x: -160, y: -260 },
      { x: -165, y: 190 },
      { x: 165, y: 190 },
      { x: 160, y: -260 },
    ],
    [
      { x: -185, y: -300 },
      { x: -190, y: 170 },
      { x: 140, y: 150 },
      { x: 135, y: -350 },
    ],
    [
      { x: -170, y: -330 },
      { x: -175, y: 165 },
      { x: 140, y: 180 },
      { x: 140, y: -280 },
    ],
  ],
  POST_POS = [
    { x: 0, y: 66 },
    { x: -26, y: 20 },
  ],
  TARGET_AREA_SPRITE_OFFSET = [
    { red: { x: 0, y: 0 }, yellow: { x: 0, y: 0 }, green: { x: 0, y: 0 } },
    { red: { x: 0, y: 0 }, yellow: { x: 4, y: -6 }, green: { x: 5, y: -9 } },
    { red: { x: 0, y: 0 }, yellow: { x: -3, y: -6 }, green: { x: -4, y: -9 } },
  ],
  Y_BAR_OFFSET = [-150, -150, -150],
  GREEN_INDICATOR_RANGE = [
    { horiz: { left: -14, right: 14 }, vert: { top: -29, bot: 24 } },
    { horiz: { left: -17, right: 11 }, vert: { top: -25, bot: 32 } },
    { horiz: { left: -12, right: 15 }, vert: { top: -25, bot: 32 } },
  ];
TOTAL_MONEY = START_MONEY = 100;
var WIN_OCCURRENCE = 35,
  FREESPIN_OCCURRENCE = 10,
  BONUS_OCCURRENCE = 10,
  SLOT_CASH = 100,
  NUM_FREESPIN = [3, 4, 5],
  BONUS_PRIZE = [10, 30, 60, 90, 100],
  BONUS_PRIZE_OCCURRENCE = [40, 25, 20, 10, 5],
  MAX_PRIZES_BONUS = 5;
COIN_BET = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5];
var PAYTABLE_VALUES = [
    [0, 0, 5, 20, 100],
    [0, 0, 5, 20, 100],
    [0, 0, 5, 20, 100],
    [0, 0, 10, 30, 150],
    [0, 0, 20, 50, 200],
    [0, 0, 25, 70, 300],
    [0, 0, 25, 100, 500],
  ],
  _bBonus = !1,
  _bFreespinEnable = !1,
  _iMinWin,
  _iTotFreeSpin = 0,
  _iNumSymbolFreeSpin = 0,
  _aCbCompleted = [],
  _aCbOwner = [],
  _aSymbolWin = [],
  _iFreespinSymbolNumOccur = [50, 30, 20],
  _aPaylineCombo = [],
  _aFinalSymbols;
function APIgetSlotInfos(a, f) {
  a.call(f, {
    start_money: TOTAL_MONEY,
    bets: COIN_BET,
    start_bet: COIN_BET[0],
    paytable: PAYTABLE_VALUES,
  });
}
function APIAttemptSpin(a, f, c, d, g) {
  if (a > TOTAL_MONEY)
    _dieError("INVALID BET: " + a + ",money:" + TOTAL_MONEY, d, g);
  else {
    TOTAL_MONEY -= a;
    SLOT_CASH += a;
    TOTAL_MONEY = parseFloat(TOTAL_MONEY.toFixed(2));
    SLOT_CASH = parseFloat(SLOT_CASH.toFixed(2));
    var e = (_bBonus = !1);
    if (SLOT_CASH < _iMinWin * f)
      generLosingPattern(),
        !0 === _bFreespinEnable &&
          (_iTotFreeSpin--,
          0 > _iTotFreeSpin && ((_iTotFreeSpin = 0), (_bFreespinEnable = !1))),
        (a = {
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
          cash: SLOT_CASH,
        });
    else if (Math.floor(100 * Math.random()) < WIN_OCCURRENCE) {
      if (!1 === _bFreespinEnable && !1 === _bBonus) {
        var k = Math.floor(100 * Math.random());
        0 === _iTotFreeSpin &&
          k < FREESPIN_OCCURRENCE + BONUS_OCCURRENCE &&
          ((k = Math.floor(
            Math.random() * (FREESPIN_OCCURRENCE + BONUS_OCCURRENCE) + 1
          )),
          k <= FREESPIN_OCCURRENCE
            ? (e = !0)
            : (_bBonus = SLOT_CASH >= BONUS_PRIZE[0] * f ? !0 : !1));
      }
      k = 0;
      do {
        var l = [];
        if (generateRandomSymbols(e)) {
          l = checkWin(e, c);
          for (var b = 0, q = 0; q < l.length; q++) b += l[q].amount;
          b *= f;
        }
        k++;
      } while (0 === l.length || 0 + b > SLOT_CASH || 0 + b < a);
      TOTAL_MONEY += b + 0;
      SLOT_CASH -= b + 0;
      TOTAL_MONEY = parseFloat(TOTAL_MONEY.toFixed(2));
      SLOT_CASH = parseFloat(SLOT_CASH.toFixed(2));
      e && 2 < _iNumSymbolFreeSpin
        ? ((_bFreespinEnable = !0),
          (_iTotFreeSpin = NUM_FREESPIN[_iNumSymbolFreeSpin - 3]))
        : !0 === _bFreespinEnable &&
          (_iTotFreeSpin--,
          0 > _iTotFreeSpin && ((_iTotFreeSpin = 0), (_bFreespinEnable = !1)));
      a = {
        res: !0,
        win: !0,
        pattern: _aFinalSymbols,
        win_lines: l,
        money: TOTAL_MONEY,
        tot_win: b,
        freespin: e,
        num_freespin: _iTotFreeSpin,
        bonus: _bBonus,
        bonus_prize: -1,
        cash: SLOT_CASH,
      };
    } else
      generLosingPattern(),
        !0 === _bFreespinEnable &&
          (_iTotFreeSpin--,
          0 > _iTotFreeSpin && ((_iTotFreeSpin = 0), (_bFreespinEnable = !1))),
        (a = {
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
        });
    d.call(g, a);
  }
}
function apiAttemptBonus(a, f, c) {
  for (var d = [], g = 0; g < BONUS_PRIZE_OCCURRENCE.length; g++)
    for (var e = BONUS_PRIZE_OCCURRENCE[g], k = 0; k < e; k++) d.push(g);
  e = Math.floor(Math.random() * MAX_PRIZES_BONUS) + 1;
  k = [];
  var l = 0;
  for (g = 0; g < e; g++) {
    var b = BONUS_PRIZE[d[Math.floor(Math.random() * d.length)]] * a;
    l + b > SLOT_CASH && (b = 0);
    l += b;
    k.push(b);
    TOTAL_MONEY += b;
    SLOT_CASH -= b;
    TOTAL_MONEY = parseFloat(TOTAL_MONEY.toFixed(2));
    SLOT_CASH = parseFloat(SLOT_CASH.toFixed(2));
  }
  0 === k.length && (k = [0]);
  console.log("aPrizeList " + k);
  f.call(c, {
    res: !0,
    money: TOTAL_MONEY,
    bonus_win: l,
    prize_list: k,
    final_prize: k.length === MAX_PRIZES_BONUS ? !0 : !1,
  });
}
function checkWin(a, f) {
  for (var c = [], d = 0; d < f; d++) {
    var g = _aPaylineCombo[d],
      e = [],
      k = _aFinalSymbols[g[0].row][g[0].col],
      l = 1,
      b = 1;
    for (
      e.push({
        row: g[0].row,
        col: g[0].col,
        value: _aFinalSymbols[g[0].row][g[0].col],
      });
      k === WILD_SYMBOL && b < NUM_REELS;

    )
      l++,
        (k = _aFinalSymbols[g[b].row][g[b].col]),
        e.push({
          row: g[b].row,
          col: g[b].col,
          value: _aFinalSymbols[g[b].row][g[b].col],
        }),
        b++;
    for (; b < g.length; b++)
      if (
        _aFinalSymbols[g[b].row][g[b].col] === k ||
        _aFinalSymbols[g[b].row][g[b].col] === WILD_SYMBOL
      )
        l++,
          e.push({
            row: g[b].row,
            col: g[b].col,
            value: _aFinalSymbols[g[b].row][g[b].col],
          });
      else break;
    !(0 < _aSymbolWin[k][l - 1]) ||
      (a && k === FREESPIN_SYMBOL) ||
      (_bBonus && k === BONUS_SYMBOL) ||
      (e.sort(sortListByCol),
      c.push({
        line: d + 1,
        amount: _aSymbolWin[k][l - 1],
        num_win: l,
        value: k,
        list: e,
      }));
  }
  if (a) {
    e = [];
    for (d = 0; d < NUM_ROWS; d++)
      for (g = 0; g < NUM_REELS; g++)
        _aFinalSymbols[d][g] === FREESPIN_SYMBOL &&
          e.push({ row: d, col: g, value: FREESPIN_SYMBOL });
    e.sort(sortListByCol);
    c.push({
      line: 0,
      amount: 0,
      num_win: e.length,
      value: FREESPIN_SYMBOL,
      list: e,
    });
  } else if (_bBonus) {
    e = [];
    for (d = 0; d < NUM_ROWS; d++)
      for (g = 0; g < NUM_REELS; g++)
        _aFinalSymbols[d][g] === BONUS_SYMBOL &&
          e.push({ row: d, col: g, value: BONUS_SYMBOL });
    e.sort(sortListByCol);
    c.push({
      line: 0,
      amount: 0,
      num_win: e.length,
      value: BONUS_SYMBOL,
      list: e,
    });
  }
  return c;
}
function generateRandomSymbols(a) {
  _aFinalSymbols = [];
  for (var f = 0, c = 0, d = 0; d < NUM_ROWS; d++) {
    _aFinalSymbols[d] = [];
    for (var g = 0; g < NUM_REELS; g++) {
      do {
        var e =
          s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
        _aFinalSymbols[d][g] = e;
      } while ((e === BONUS_SYMBOL && _bBonus) || (a && e === FREESPIN_SYMBOL));
      e === BONUS_SYMBOL && f++;
      e === FREESPIN_SYMBOL && c++;
    }
  }
  if ((!a && 2 < c) || (!_bBonus && 2 < f)) return !1;
  if (a) {
    a = [];
    for (d = 0; d < _iFreespinSymbolNumOccur.length; d++)
      for (g = 0; g < _iFreespinSymbolNumOccur[d]; g++) a.push(d);
    _iNumSymbolFreeSpin = 3 + a[Math.floor(Math.random() * a.length)];
    d = [0, 1, 2, 3, 4];
    d = shuffle(d);
    for (g = 0; g < _iNumSymbolFreeSpin; g++)
      (a = Math.floor(3 * Math.random())),
        (_aFinalSymbols[a][d[g]] = FREESPIN_SYMBOL);
  } else if (_bBonus)
    for (
      d = [0, 1, 2, 3, 4],
        d = shuffle(d),
        f = Math.floor(3 * Math.random() + 3),
        g = 0;
      g < f;
      g++
    )
      (a = Math.floor(3 * Math.random())),
        (_aFinalSymbols[a][d[g]] = BONUS_SYMBOL);
  return !0;
}
function generLosingPattern() {
  for (var a = [], f = 0; f < NUM_ROWS; f++) {
    do var c = Math.floor(Math.random() * s_aRandSymbols.length);
    while (
      s_aRandSymbols[c] === BONUS_SYMBOL ||
      s_aRandSymbols[c] === FREESPIN_SYMBOL ||
      s_aRandSymbols[c] === WILD_SYMBOL
    );
    c = s_aRandSymbols[c];
    a[f] = c;
  }
  _aFinalSymbols = [];
  for (f = 0; f < NUM_ROWS; f++) {
    _aFinalSymbols[f] = [];
    for (var d = 0; d < NUM_REELS; d++)
      if (0 == d) _aFinalSymbols[f][d] = a[f];
      else {
        do
          (c = Math.floor(Math.random() * s_aRandSymbols.length)),
            (c = s_aRandSymbols[c]);
        while (
          a[0] === c ||
          a[1] === c ||
          a[2] === c ||
          c === BONUS_SYMBOL ||
          c === FREESPIN_SYMBOL ||
          c === WILD_SYMBOL
        );
        _aFinalSymbols[f][d] = c;
      }
  }
  return _aFinalSymbols;
}
function refreshCredit(a, f, c) {
  TOTAL_MONEY = a;
  f.call(c, TOTAL_MONEY);
}
function formatEntries(a) {
  return a.toFixed(2) + TEXT_CURRENCY;
}
function _dieError(a, f, c) {
  f.call(c, "res=false&desc=" + a);
}
function sortListByCol(a, f) {
  return a.col < f.col ? -1 : a.col > f.col ? 1 : 0;
}
function _initSymbolWin() {
  _aSymbolWin = [];
  for (var a = 0; a < PAYTABLE_VALUES.length; a++) {
    _aSymbolWin[a] = [];
    for (var f = 0; f < PAYTABLE_VALUES[a].length; f++)
      _aSymbolWin[a][f] = PAYTABLE_VALUES[a][f];
  }
  for (a = PAYTABLE_VALUES.length; a < NUM_SYMBOLS; a++)
    _aSymbolWin[a] = [0, 0, 0, 0, 0];
}
function _setMinWin() {
  _iMinWin = 9999999999999;
  for (var a = 0; a < _aSymbolWin.length; a++)
    for (var f = _aSymbolWin[a], c = 0; c < f.length; c++)
      0 !== f[c] && f[c] < _iMinWin && (_iMinWin = f[c]);
}
function _initPaylines() {
  _aPaylineCombo[0] = [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
    { row: 1, col: 3 },
    { row: 1, col: 4 },
  ];
  _aPaylineCombo[1] = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 0, col: 3 },
    { row: 0, col: 4 },
  ];
  _aPaylineCombo[2] = [
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
    { row: 2, col: 3 },
    { row: 2, col: 4 },
  ];
  _aPaylineCombo[3] = [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 },
    { row: 1, col: 3 },
    { row: 0, col: 4 },
  ];
  _aPaylineCombo[4] = [
    { row: 2, col: 0 },
    { row: 1, col: 1 },
    { row: 0, col: 2 },
    { row: 1, col: 3 },
    { row: 2, col: 4 },
  ];
  _aPaylineCombo[5] = [
    { row: 1, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
    { row: 0, col: 3 },
    { row: 1, col: 4 },
  ];
  _aPaylineCombo[6] = [
    { row: 1, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
    { row: 2, col: 3 },
    { row: 1, col: 4 },
  ];
  _aPaylineCombo[7] = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 1, col: 2 },
    { row: 2, col: 3 },
    { row: 2, col: 4 },
  ];
  _aPaylineCombo[8] = [
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 1, col: 2 },
    { row: 0, col: 3 },
    { row: 0, col: 4 },
  ];
  _aPaylineCombo[9] = [
    { row: 1, col: 0 },
    { row: 2, col: 1 },
    { row: 1, col: 2 },
    { row: 0, col: 3 },
    { row: 1, col: 4 },
  ];
  _aPaylineCombo[10] = [
    { row: 1, col: 0 },
    { row: 0, col: 1 },
    { row: 1, col: 2 },
    { row: 2, col: 3 },
    { row: 1, col: 4 },
  ];
  _aPaylineCombo[11] = [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
    { row: 1, col: 3 },
    { row: 0, col: 4 },
  ];
  _aPaylineCombo[12] = [
    { row: 2, col: 0 },
    { row: 1, col: 1 },
    { row: 1, col: 2 },
    { row: 1, col: 3 },
    { row: 2, col: 4 },
  ];
  _aPaylineCombo[13] = [
    { row: 0, col: 0 },
    { row: 1, col: 1 },
    { row: 0, col: 2 },
    { row: 1, col: 3 },
    { row: 0, col: 4 },
  ];
  _aPaylineCombo[14] = [
    { row: 2, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 },
    { row: 1, col: 3 },
    { row: 2, col: 4 },
  ];
  _aPaylineCombo[15] = [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 0, col: 2 },
    { row: 1, col: 3 },
    { row: 1, col: 4 },
  ];
  _aPaylineCombo[16] = [
    { row: 1, col: 0 },
    { row: 1, col: 1 },
    { row: 2, col: 2 },
    { row: 1, col: 3 },
    { row: 1, col: 4 },
  ];
  _aPaylineCombo[17] = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 2, col: 2 },
    { row: 0, col: 3 },
    { row: 0, col: 4 },
  ];
  _aPaylineCombo[18] = [
    { row: 2, col: 0 },
    { row: 2, col: 1 },
    { row: 0, col: 2 },
    { row: 2, col: 3 },
    { row: 2, col: 4 },
  ];
  _aPaylineCombo[19] = [
    { row: 0, col: 0 },
    { row: 2, col: 1 },
    { row: 2, col: 2 },
    { row: 2, col: 3 },
    { row: 0, col: 4 },
  ];
  return _aPaylineCombo;
}
function _init() {
  _initSymbolWin();
  _aPaylineCombo = _initPaylines();
  _setMinWin();
}
_init();
function CSlotSettings() {
  this._init = function () {
    this._initSymbolSpriteSheets();
    this._initSymbolAnims();
    this._initSymbolsOccurence();
  };
  this._initSymbolSpriteSheets = function () {
    s_aSymbolData = [];
    for (var a = 0; a < NUM_SYMBOLS; a++) {
      var f = {
        images: [s_oSpriteLibrary.getSprite("symbol_" + a)],
        frames: {
          width: SYMBOL_WIDTH,
          height: SYMBOL_HEIGHT,
          regX: 0,
          regY: 0,
        },
        animations: { static: [0, 1], moving: [1, 2] },
      };
      s_aSymbolData[a] = new createjs.SpriteSheet(f);
    }
  };
  this._initSymbolsOccurence = function () {
    s_aRandSymbols = [];
    var a;
    for (a = 0; 1 > a; a++) s_aRandSymbols.push(9);
    for (a = 0; 2 > a; a++) s_aRandSymbols.push(8);
    for (a = 0; 3 > a; a++) s_aRandSymbols.push(7);
    for (a = 0; 4 > a; a++) s_aRandSymbols.push(6);
    for (a = 0; 5 > a; a++) s_aRandSymbols.push(5);
    for (a = 0; 6 > a; a++) s_aRandSymbols.push(4);
    for (a = 0; 7 > a; a++) s_aRandSymbols.push(3);
    for (a = 0; 8 > a; a++)
      s_aRandSymbols.push(2), s_aRandSymbols.push(1), s_aRandSymbols.push(0);
  };
  this._initSymbolAnims = function () {
    s_aSymbolAnims = [];
    for (var a = Math.floor(FPS / 2), f = 0; f < NUM_SYMBOLS; f++) {
      var c = {
        framerate: a,
        images: [s_oSpriteLibrary.getSprite("symbol_" + f + "_anim")],
        frames: { width: SYMBOL_ANIM_WIDTH, height: SYMBOL_ANIM_HEIGHT },
        animations: { static: [0], anim: [0, 23] },
      };
      s_aSymbolAnims[f] = new createjs.SpriteSheet(c);
    }
  };
  this._init();
}
var s_aSymbolData, s_aPaylineCombo, s_aSymbolAnims, s_aRandSymbols;
function CMenu() {
  var a,
    f,
    c,
    d,
    g,
    e,
    k,
    l,
    b = null,
    q = null,
    n,
    w,
    t,
    v,
    x,
    B,
    z,
    N;
  this._init = function () {
    n = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
    s_oAttachSection.addChild(n);
    var p = s_oSpriteLibrary.getSprite("but_play");
    w = new CGfxButton(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT - 164,
      p,
      s_oAttachSection
    );
    w.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
      (p = s_oSpriteLibrary.getSprite("audio_icon")),
        (k = CANVAS_WIDTH - p.width / 4 - 4),
        (l = p.height / 2 + 4),
        (v = new CToggle(k, l, p, s_bAudioActive)),
        v.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
    SHOW_CREDITS
      ? ((p = s_oSpriteLibrary.getSprite("but_credits")),
        (a = p.width / 2 + 4),
        (f = p.height / 2 + 4),
        (x = new CGfxButton(a, f, p, s_oAttachSection)),
        x.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this),
        (g = a + p.width + 4),
        (e = f))
      : ((p = s_oSpriteLibrary.getSprite("but_fullscreen")),
        (g = p.width / 4 + 4),
        (e = p.height / 2 + 4));
    p = window.document;
    var F = p.documentElement;
    b =
      F.requestFullscreen ||
      F.mozRequestFullScreen ||
      F.webkitRequestFullScreen ||
      F.msRequestFullscreen;
    q =
      p.exitFullscreen ||
      p.mozCancelFullScreen ||
      p.webkitExitFullscreen ||
      p.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (b = !1);
    b &&
      screenfull.isEnabled &&
      ((p = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (B = new CToggle(g, e, p, s_bFullscreen, s_oAttachSection)),
      B.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    p = s_oSpriteLibrary.getSprite("but_delete_savings");
    c = p.width / 2 + 4;
    d = CANVAS_HEIGHT - p.height / 2 - 4;
    t = new CGfxButton(c, d, p, s_oAttachSection);
    t.addEventListener(ON_MOUSE_UP, this._onDeleteSavings, this);
    s_bStorageAvailable
      ? !RESTART_CREDIT && getItem(LOCALSTORAGE_STRING + "score")
        ? (TOTAL_MONEY = parseFloat(getItem(LOCALSTORAGE_STRING + "score")))
        : t.setVisible(!1)
      : (s_oMsgBox.show(TEXT_ERR_LS), t.setVisible(!1));
    N = new CAreYouSurePanel();
    N.addEventListener(ON_BUT_YES_DOWN, this._onExitYes, this);
    z = new createjs.Shape();
    z.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    s_oAttachSection.addChild(z);
    createjs.Tween.get(z)
      .to({ alpha: 0 }, 400)
      .call(function () {
        z.visible = !1;
      });
    this.refreshButtonPos();
  };
  this.unload = function () {
    w.unload();
    w = null;
    t.unload();
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) v.unload(), (v = null);
    SHOW_CREDITS && x.unload();
    b && screenfull.isEnabled && B.unload();
    s_oAttachSection.removeChild(n);
    n = null;
    s_oAttachSection.removeChild(z);
    s_oMenu = z = null;
  };
  this.refreshButtonPos = function () {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      v.setPosition(k - s_iOffsetX, s_iOffsetY + l);
    SHOW_CREDITS && x.setPosition(a + s_iOffsetX, f + s_iOffsetY);
    b && screenfull.isEnabled && B.setPosition(g + s_iOffsetX, e + s_iOffsetY);
    t.setPosition(c + s_iOffsetX, d - s_iOffsetY);
  };
  this._onButPlayRelease = function () {
    this.unload();
    $(s_oMain).trigger("start_session");
    s_oMain.gotoGame();
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this._onButCreditsRelease = function () {
    new CCreditsPanel();
  };
  this.resetFullscreenBut = function () {
    b && screenfull.isEnabled && B.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? q.call(window.document)
      : b.call(window.document.documentElement);
    sizeHandler();
  };
  this._onDeleteSavings = function () {
    N.show(
      TEXT_DELETE_SAVINGS +
        ": " +
        START_MONEY +
        TEXT_CURRENCY +
        "\n" +
        TEXT_ARE_SURE
    );
  };
  this._onExitYes = function () {
    clearLocalStorage();
    t.setVisible(!1);
  };
  s_oMenu = this;
  this._init();
}
var s_oMenu = null;
function CCreditsPanel() {
  var a, f, c, d, g, e, k, l;
  this._init = function () {
    l = new createjs.Container();
    s_oStage.addChild(l);
    c = new createjs.Shape();
    f = c.on("click", function () {});
    c.alpha = 0;
    c.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    l.addChild(c);
    d = new createjs.Container();
    d.visible = !1;
    l.addChild(d);
    var b = s_oSpriteLibrary.getSprite("msg_box");
    k = createBitmap(b);
    k.regX = b.width / 2;
    k.regY = b.height / 2;
    d.addChild(k);
    a = k.on("click", this._onLogoButRelease);
    d.x = CANVAS_WIDTH / 2;
    d.y = CANVAS_HEIGHT / 2;
    b = new createjs.Text(TEXT_DEVELOPED, "30px " + FONT_GAME_1, "#fff");
    b.y = -40;
    b.textAlign = "center";
    b.textBaseline = "alphabetic";
    d.addChild(b);
    b = new createjs.Text("www.codethislab.com", "26px " + FONT_GAME_1, "#fff");
    b.y = 60;
    b.textAlign = "center";
    b.textBaseline = "alphabetic";
    b.lineWidth = 300;
    d.addChild(b);
    b = s_oSpriteLibrary.getSprite("ctl_logo");
    e = createBitmap(b);
    e.regX = b.width / 2;
    e.regY = b.height / 2;
    d.addChild(e);
    b = s_oSpriteLibrary.getSprite("but_exit");
    g = new CGfxButton(245, -146, b, d);
    g.addEventListener(ON_MOUSE_UP, this.unload, this);
    c.alpha = 0;
    createjs.Tween.get(c)
      .to({ alpha: 0.7 }, 500)
      .call(function () {
        d.alpha = 0;
        d.visible = !0;
        createjs.Tween.get(d).to({ alpha: 1 }, 300);
      });
  };
  this.unload = function () {
    createjs.Tween.get(l)
      .to({ alpha: 0 }, 500)
      .call(function () {
        s_oStage.removeChild(l);
        g.unload();
      });
    c.off("click", f);
    k.off("click", a);
  };
  this._onLogoButRelease = function () {
    window.open("http://www.codethislab.com/index.php?&l=en");
  };
  this._init();
}
function CAreYouSurePanel() {
  var a,
    f,
    c,
    d,
    g,
    e,
    k,
    l,
    b,
    q = this;
  this._init = function () {
    a = [];
    f = [];
    l = new createjs.Container();
    l.visible = !1;
    s_oStage.addChild(l);
    b = new createjs.Shape();
    c = b.on("click", function () {});
    b.alpha = 0.5;
    b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    l.addChild(b);
    var n = s_oSpriteLibrary.getSprite("msg_box");
    d = createBitmap(n);
    d.x = CANVAS_WIDTH / 2;
    d.y = CANVAS_HEIGHT / 2;
    d.regX = 0.5 * n.width;
    d.regY = 0.5 * n.height;
    l.addChild(d);
    g = new CTLText(
      l,
      CANVAS_WIDTH / 2 - n.width / 2 + 40,
      CANVAS_HEIGHT / 2 - n.height / 2 + 30,
      n.width - 80,
      90,
      70,
      "center",
      "#fff",
      FONT_GAME_1,
      1,
      40,
      10,
      TEXT_ARE_SURE,
      !0,
      !0,
      !0,
      !1
    );
    e = new CGfxButton(
      CANVAS_WIDTH / 2 + 120,
      0.5 * CANVAS_HEIGHT + 70,
      s_oSpriteLibrary.getSprite("but_yes"),
      l
    );
    e.addEventListener(ON_MOUSE_UP, this._onButYes, this);
    k = new CGfxButton(
      CANVAS_WIDTH / 2 - 120,
      0.5 * CANVAS_HEIGHT + 70,
      s_oSpriteLibrary.getSprite("but_exit"),
      l
    );
    k.addEventListener(ON_MOUSE_UP, this._onButNo, this);
  };
  this.addEventListener = function (n, w, t) {
    a[n] = w;
    f[n] = t;
  };
  this.show = function (n) {
    g.refreshText(n);
    l.alpha = 0;
    l.visible = !0;
    createjs.Tween.get(l)
      .to({ alpha: 1 }, 300, createjs.Ease.quartOut)
      .call(function () {
        s_oMain.stopUpdateNoBlock();
      });
  };
  this.hide = function () {
    s_oMain.startUpdateNoBlock();
    createjs.Tween.get(l)
      .to({ alpha: 0 }, 500, createjs.Ease.quartOut)
      .call(function () {
        l.visible = !1;
      });
  };
  this.unload = function () {
    k.unload();
    e.unload();
    b.off("click", c);
  };
  this._onButYes = function () {
    q.hide();
    a[ON_BUT_YES_DOWN] && a[ON_BUT_YES_DOWN].call(f[ON_BUT_YES_DOWN]);
  };
  this._onButNo = function () {
    q.hide();
  };
  this._init();
}
CTLText.prototype = {
  constructor: CTLText,
  __autofit: function () {
    if (this._bFitText) {
      for (
        var a = this._iFontSize;
        (this._oText.getBounds().height > this._iHeight - 2 * this._iPaddingV ||
          this._oText.getBounds().width > this._iWidth - 2 * this._iPaddingH) &&
        !(a--,
        (this._oText.font = a + "px " + this._szFont),
        (this._oText.lineHeight = Math.round(a * this._fLineHeightFactor)),
        this.__updateY(),
        this.__verticalAlign(),
        8 > a);

      );
      this._iFontSize = a;
    }
  },
  __verticalAlign: function () {
    if (this._bVerticalAlign) {
      var a = this._oText.getBounds().height;
      this._oText.y -= (a - this._iHeight) / 2 + this._iPaddingV;
    }
  },
  __updateY: function () {
    this._oText.y = this._y + this._iPaddingV;
    switch (this._oText.textBaseline) {
      case "middle":
        this._oText.y +=
          this._oText.lineHeight / 2 +
          (this._iFontSize * this._fLineHeightFactor - this._iFontSize);
    }
  },
  __createText: function (a) {
    this._bDebug &&
      ((this._oDebugShape = new createjs.Shape()),
      this._oDebugShape.graphics
        .beginFill("rgba(255,0,0,0.5)")
        .drawRect(this._x, this._y, this._iWidth, this._iHeight),
      this._oContainer.addChild(this._oDebugShape));
    this._oText = new createjs.Text(
      a,
      this._iFontSize + "px " + this._szFont,
      this._szColor
    );
    this._oText.textBaseline = "middle";
    this._oText.lineHeight = Math.round(
      this._iFontSize * this._fLineHeightFactor
    );
    this._oText.textAlign = this._szAlign;
    this._oText.lineWidth = this._bMultiline
      ? this._iWidth - 2 * this._iPaddingH
      : null;
    switch (this._szAlign) {
      case "center":
        this._oText.x = this._x + this._iWidth / 2;
        break;
      case "left":
        this._oText.x = this._x + this._iPaddingH;
        break;
      case "right":
        this._oText.x = this._x + this._iWidth - this._iPaddingH;
    }
    this._oContainer.addChild(this._oText);
    this.refreshText(a);
  },
  setVerticalAlign: function (a) {
    this._bVerticalAlign = a;
  },
  setOutline: function (a) {
    null !== this._oText && (this._oText.outline = a);
  },
  setShadow: function (a, f, c, d) {
    null !== this._oText &&
      (this._oText.shadow = new createjs.Shadow(a, f, c, d));
  },
  setColor: function (a) {
    this._oText.color = a;
  },
  setAlpha: function (a) {
    this._oText.alpha = a;
  },
  setY: function (a) {
    this._y = this._oText.y = a;
  },
  removeTweens: function () {
    createjs.Tween.removeTweens(this._oText);
  },
  getText: function () {
    return this._oText;
  },
  getString: function () {
    return this._oText.text;
  },
  getY: function () {
    return this._y;
  },
  getFontSize: function () {
    return this._iFontSize;
  },
  refreshText: function (a) {
    "" === a && (a = " ");
    null === this._oText && this.__createText(a);
    this._oText.text = a;
    this._oText.font = this._iFontSize + "px " + this._szFont;
    this._oText.lineHeight = Math.round(
      this._iFontSize * this._fLineHeightFactor
    );
    this.__autofit();
    this.__updateY();
    this.__verticalAlign();
  },
};
function CTLText(a, f, c, d, g, e, k, l, b, q, n, w, t, v, x, B, z) {
  this._oContainer = a;
  this._x = f;
  this._y = c;
  this._iWidth = d;
  this._iHeight = g;
  this._bMultiline = B;
  this._iFontSize = e;
  this._szAlign = k;
  this._szColor = l;
  this._szFont = b;
  this._iPaddingH = n;
  this._iPaddingV = w;
  this._bVerticalAlign = x;
  this._bFitText = v;
  this._bDebug = z;
  this._oDebugShape = null;
  this._fLineHeightFactor = q;
  this._oText = null;
  t && this.__createText(t);
}
function CPreloader() {
  var a, f, c, d, g, e, k, l, b;
  this._init = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
    s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
    s_oSpriteLibrary.loadSprites();
    b = new createjs.Container();
    s_oStage.addChild(b);
  };
  this.unload = function () {
    b.removeAllChildren();
  };
  this._onImagesLoaded = function () {};
  this._onAllImagesLoaded = function () {
    this.attachSprites();
    s_oMain.preloaderReady();
  };
  this.attachSprites = function () {
    var q = new createjs.Shape();
    q.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    b.addChild(q);
    q = s_oSpriteLibrary.getSprite("200x200");
    k = createBitmap(q);
    k.regX = 0.5 * q.width;
    k.regY = 0.5 * q.height;
    k.x = CANVAS_WIDTH / 2;
    k.y = CANVAS_HEIGHT / 2 - 120;
    b.addChild(k);
    l = new createjs.Shape();
    l.graphics
      .beginFill("rgba(0,0,0,0.01)")
      .drawRoundRect(k.x - 100, k.y - 100, 200, 200, 10);
    b.addChild(l);
    k.mask = l;
    q = s_oSpriteLibrary.getSprite("progress_bar");
    d = createBitmap(q);
    d.x = CANVAS_WIDTH / 2 - q.width / 2;
    d.y = CANVAS_HEIGHT / 2 + 50;
    b.addChild(d);
    a = q.width;
    f = q.height;
    g = new createjs.Shape();
    g.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, 1, f);
    b.addChild(g);
    d.mask = g;
    c = new createjs.Text("", "30px " + FONT_GAME_1, "#fff");
    c.x = CANVAS_WIDTH / 2;
    c.y = CANVAS_HEIGHT / 2 + 120;
    c.textBaseline = "alphabetic";
    c.textAlign = "center";
    b.addChild(c);
    e = new createjs.Shape();
    e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    b.addChild(e);
    createjs.Tween.get(e)
      .to({ alpha: 0 }, 500)
      .call(function () {
        createjs.Tween.removeTweens(e);
        b.removeChild(e);
      });
  };
  this.refreshLoader = function (q) {
    c.text = q + "%";
    100 === q &&
      (s_oMain._onRemovePreloader(), (c.visible = !1), (d.visible = !1));
    g.graphics.clear();
    q = Math.floor((q * a) / 100);
    g.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, q, f);
  };
  this._init();
}
function CMain(a) {
  var f,
    c = 0,
    d = 0,
    g = STATE_LOADING,
    e,
    k;
  this.initContainer = function () {
    var b = document.getElementById("canvas");
    s_oStage = new createjs.Stage(b);
    s_oAttachSection = new createjs.Container();
    s_oStage.addChild(s_oAttachSection);
    s_oStage.preventSelection = !1;
    createjs.Touch.enable(s_oStage, !0);
    s_bMobile = isMobile();
    !1 === s_bMobile && s_oStage.enableMouseOver(20);
    s_iPrevTime = new Date().getTime();
    createjs.Ticker.framerate = FPS;
    createjs.Ticker.addEventListener("tick", this._update);
    navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
    s_oSpriteLibrary = new CSpriteLibrary();

    e = new CPreloader();
  };
  this.preloaderReady = function () {
    this._loadImages();
    ((!1 === DISABLE_SOUND_DESKTOP && !1 === s_bMobile) ||
      (!0 === s_bMobile && !1 === DISABLE_SOUND_MOBILE)) &&
      this._initSounds();
    f = !0;
  };
  this.soundLoaded = function () {
    c++;
    e.refreshLoader(Math.floor((c / d) * 100));
  };
  this._initSounds = function () {
    Howler.mute(!s_bAudioActive);
    s_aSoundsInfo = [];
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "avatar_win",
      loop: !1,
      volume: 1,
      ingamename: "avatar_win",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "bonus_mult",
      loop: !1,
      volume: 1,
      ingamename: "bonus_mult",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "bonus_win",
      loop: !1,
      volume: 1,
      ingamename: "bonus_win",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "crowd_touchdown",
      loop: !1,
      volume: 1,
      ingamename: "crowd_touchdown",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "enemy",
      loop: !1,
      volume: 1,
      ingamename: "enemy",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "enemy_tackle",
      loop: !1,
      volume: 1,
      ingamename: "enemy_tackle",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "game_over",
      loop: !1,
      volume: 1,
      ingamename: "game_over",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "goal",
      loop: !1,
      volume: 1,
      ingamename: "goal",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "kick",
      loop: !1,
      volume: 1,
      ingamename: "kick",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "miss_goal",
      loop: !1,
      volume: 1,
      ingamename: "miss_goal",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "win_bonus",
      loop: !1,
      volume: 1,
      ingamename: "win_bonus",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "press_but",
      loop: !1,
      volume: 1,
      ingamename: "press_but",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "reel_stop",
      loop: !1,
      volume: 1,
      ingamename: "reel_stop",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "reel_stop_bonus",
      loop: !1,
      volume: 1,
      ingamename: "reel_stop_bonus",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "reel_stop_freespin",
      loop: !1,
      volume: 1,
      ingamename: "reel_stop_freespin",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "start_reel",
      loop: !1,
      volume: 1,
      ingamename: "start_reel",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "spin_but",
      loop: !1,
      volume: 1,
      ingamename: "spin_but",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "symbol0",
      loop: !1,
      volume: 1,
      ingamename: "symbol0",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "symbol1",
      loop: !1,
      volume: 1,
      ingamename: "symbol1",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "symbol2",
      loop: !1,
      volume: 1,
      ingamename: "symbol2",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "symbol3",
      loop: !1,
      volume: 1,
      ingamename: "symbol3",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "symbol4",
      loop: !1,
      volume: 1,
      ingamename: "symbol4",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "symbol5",
      loop: !1,
      volume: 1,
      ingamename: "symbol5",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "symbol6",
      loop: !1,
      volume: 1,
      ingamename: "symbol6",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "symbol7",
      loop: !1,
      volume: 1,
      ingamename: "symbol7",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "symbol8",
      loop: !1,
      volume: 1,
      ingamename: "symbol8",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "symbol9",
      loop: !1,
      volume: 1,
      ingamename: "symbol9",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "soundtrack_bonus",
      loop: !0,
      volume: 1,
      ingamename: "soundtrack_bonus",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "crowd_idle",
      loop: !0,
      volume: 1,
      ingamename: "crowd_idle",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "crowd",
      loop: !0,
      volume: 1,
      ingamename: "crowd",
    });
    d += s_aSoundsInfo.length;
    s_aSounds = [];
    for (var b = 0; b < s_aSoundsInfo.length; b++)
      this.tryToLoadSound(s_aSoundsInfo[b], !1);
  };
  this.tryToLoadSound = function (b, q) {
    setTimeout(
      function () {
        s_aSounds[b.ingamename] = new Howl({
          src: [b.path + b.filename + ".mp3"],
          autoplay: !1,
          preload: !0,
          loop: b.loop,
          volume: b.volume,
          onload: s_oMain.soundLoaded,
          onloaderror: function (n, w) {
            for (var t = 0; t < s_aSoundsInfo.length; t++)
              if (n === s_aSounds[s_aSoundsInfo[t].ingamename]._sounds[0]._id) {
                s_oMain.tryToLoadSound(s_aSoundsInfo[t], !0);
                break;
              }
          },
          onplayerror: function (n) {
            for (var w = 0; w < s_aSoundsInfo.length; w++)
              if (n === s_aSounds[s_aSoundsInfo[w].ingamename]._sounds[0]._id) {
                s_aSounds[s_aSoundsInfo[w].ingamename].once(
                  "unlock",
                  function () {
                    s_aSounds[s_aSoundsInfo[w].ingamename].play();
                    "crowd" === s_aSoundsInfo[w].ingamename &&
                      null !== s_oGame &&
                      setVolume("crowd", SOUNDTRACK_VOLUME_IN_GAME);
                  }
                );
                break;
              }
          },
        });
      },
      q ? 200 : 0
    );
  };
  this._loadImages = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
    s_oSpriteLibrary.addSprite("paytable1", "./sprites/paytable1.jpg");
    s_oSpriteLibrary.addSprite("paytable2", "./sprites/paytable2.jpg");
    s_oSpriteLibrary.addSprite("paytable3", "./sprites/paytable3.jpg");
    s_oSpriteLibrary.addSprite("paytable4", "./sprites/paytable4.jpg");
    s_oSpriteLibrary.addSprite("mask_slot", "./sprites/mask_slot.png");
    s_oSpriteLibrary.addSprite(
      "win_frame_anim",
      "./sprites/win_frame_anim.png"
    );
    s_oSpriteLibrary.addSprite("but_text", "./sprites/but_text.png");
    s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
    s_oSpriteLibrary.addSprite(
      "but_arrow_next",
      "./sprites/but_arrow_next.png"
    );
    s_oSpriteLibrary.addSprite(
      "but_arrow_prev",
      "./sprites/but_arrow_prev.png"
    );
    s_oSpriteLibrary.addSprite("logo", "./sprites/logo.png");
    s_oSpriteLibrary.addSprite(
      "bg_loading_bonus",
      "./sprites/bg_loading_bonus.jpg"
    );
    s_oSpriteLibrary.addSprite("bg_loading", "./sprites/bg_loading.jpg");
    s_oSpriteLibrary.addSprite(
      "amount_bonus_win",
      "./sprites/amount_bonus_win.png"
    );
    s_oSpriteLibrary.addSprite("symbol_0", "./sprites/symbol_0.jpg");
    s_oSpriteLibrary.addSprite("symbol_0_anim", "./sprites/symbol_0_anim.jpg");
    s_oSpriteLibrary.addSprite("symbol_1", "./sprites/symbol_1.jpg");
    s_oSpriteLibrary.addSprite("symbol_1_anim", "./sprites/symbol_1_anim.jpg");
    s_oSpriteLibrary.addSprite("symbol_2", "./sprites/symbol_2.jpg");
    s_oSpriteLibrary.addSprite("symbol_2_anim", "./sprites/symbol_2_anim.jpg");
    s_oSpriteLibrary.addSprite("symbol_3", "./sprites/symbol_3.jpg");
    s_oSpriteLibrary.addSprite("symbol_3_anim", "./sprites/symbol_3_anim.jpg");
    s_oSpriteLibrary.addSprite("symbol_4", "./sprites/symbol_4.jpg");
    s_oSpriteLibrary.addSprite("symbol_4_anim", "./sprites/symbol_4_anim.jpg");
    s_oSpriteLibrary.addSprite("symbol_5", "./sprites/symbol_5.jpg");
    s_oSpriteLibrary.addSprite("symbol_5_anim", "./sprites/symbol_5_anim.jpg");
    s_oSpriteLibrary.addSprite("symbol_6", "./sprites/symbol_6.jpg");
    s_oSpriteLibrary.addSprite("symbol_6_anim", "./sprites/symbol_6_anim.jpg");
    s_oSpriteLibrary.addSprite("symbol_7", "./sprites/symbol_7.jpg");
    s_oSpriteLibrary.addSprite("symbol_7_anim", "./sprites/symbol_7_anim.jpg");
    s_oSpriteLibrary.addSprite("symbol_8", "./sprites/symbol_8.jpg");
    s_oSpriteLibrary.addSprite("symbol_8_anim", "./sprites/symbol_8_anim.jpg");
    s_oSpriteLibrary.addSprite("symbol_9", "./sprites/symbol_9.jpg");
    s_oSpriteLibrary.addSprite("symbol_9_anim", "./sprites/symbol_9_anim.jpg");
    s_oSpriteLibrary.addSprite("bet_but", "./sprites/paylines/bet_but.png");
    s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
    s_oSpriteLibrary.addSprite(
      "but_delete_savings",
      "./sprites/but_delete_savings.png"
    );
    s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
    s_oSpriteLibrary.addSprite(
      "but_fullscreen",
      "./sprites/but_fullscreen.png"
    );
    s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
    s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
    s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");
    s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
    s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
    s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
    s_oSpriteLibrary.addSprite("text_bg", "./sprites/text_bg.png");
    s_oSpriteLibrary.addSprite(
      "bg_loading_freekicks",
      "./sprites/bg_loading_freekicks.jpg"
    );
    for (var b = 0; 2 > b; b++)
      s_oSpriteLibrary.addSprite(
        "paylines-" + b,
        "./sprites/paylines/paylines-" + b + ".png"
      );
    for (b = 0; 3 > b; b++)
      s_oSpriteLibrary.addSprite(
        "avatar_idle-" + b,
        "./sprites/avatar/avatar_idle-" + b + ".png"
      );
    for (b = 0; 3 > b; b++)
      s_oSpriteLibrary.addSprite(
        "avatar_win1-" + b,
        "./sprites/avatar/avatar_win1-" + b + ".png"
      );
    for (b = 0; 3 > b; b++)
      s_oSpriteLibrary.addSprite(
        "avatar_win2-" + b,
        "./sprites/avatar/avatar_win2-" + b + ".png"
      );
    d += s_oSpriteLibrary.getNumSprites();
    s_oSpriteLibrary.loadSprites();
  };
  this._onImagesLoaded = function () {
    c++;
    e.refreshLoader(Math.floor((c / d) * 100));
  };
  this._onAllImagesLoaded = function () {};
  this._onRemovePreloader = function () {
    APIgetSlotInfos(this.settingPhase, this);
  };
  this.settingPhase = function (b) {
    try {
      saveItem(LOCALSTORAGE_STRING + "ls_available", "ok");
    } catch (q) {
      s_bStorageAvailable = !1;
    }
    s_oGameSettings = new CSlotSettings();
    s_oMsgBox = new CMsgBox();
    e.unload();
    COIN_BET = b.bets;
    START_BET = b.start_bet;
    MIN_BET = b.bets[0];
    MIN_REEL_LOOPS = l.min_reel_loop;
    REEL_DELAY = l.reel_delay;
    TIME_SHOW_WIN = l.time_show_win;
    TIME_SHOW_ALL_WINS = l.time_show_all_wins;
    TOTAL_MONEY = b.start_money;
    ENABLE_FULLSCREEN = a.fullscreen;
    SHOW_CREDITS = a.show_credits;
    ENABLE_CHECK_ORIENTATION = a.check_orientation;
    PAYTABLE_VALUES = b.paytable;
    playSound("crowd", 1, !0);
    this.gotoMenu();
  };
  this.gotoMenu = function () {
    _oMenu = new CMenu();
    g = STATE_MENU;
  };
  this.gotoGame = function () {
    k = new CGame(l);
    g = STATE_GAME;
  };
  this.stopUpdate = function () {
    f = !1;
    createjs.Ticker.paused = !0;
    $("#block_game").css("display", "block");
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || Howler.mute(!0);
  };
  this.startUpdate = function () {
    s_iPrevTime = new Date().getTime();
    f = !0;
    createjs.Ticker.paused = !1;
    $("#block_game").css("display", "none");
    (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) &&
      s_bAudioActive &&
      Howler.mute(!1);
  };
  this.stopUpdateNoBlock = function () {
    f = !1;
    createjs.Ticker.paused = !0;
  };
  this.startUpdateNoBlock = function () {
    s_iPrevTime = new Date().getTime();
    f = !0;
    createjs.Ticker.paused = !1;
  };
  this._update = function (b) {
    if (!1 !== f) {
      var q = new Date().getTime();
      s_iTimeElaps = q - s_iPrevTime;
      s_iCntTime += s_iTimeElaps;
      s_iCntFps++;
      s_iPrevTime = q;
      1e3 <= s_iCntTime &&
        ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0));
      g === STATE_GAME && k.update();
      s_oStage.update(b);
    }
  };
  s_oMain = this;
  var l = a;
  ENABLE_CHECK_ORIENTATION = l.check_orientation;
  NUM_SPIN_FOR_ADS = a.num_spin_for_ads;
  RESTART_CREDIT = a.restart_credit;
  s_bAudioActive = a.audio_enable_on_startup;
  this.initContainer();
}
var s_bMobile,
  s_bFullscreen = !1,
  s_iCntTime = 0,
  s_iTimeElaps = 0,
  s_iPrevTime = 0,
  s_iCntFps = 0,
  s_iCurFps = 0,
  s_oDrawLayer,
  s_oStage,
  s_oAttachSection,
  s_oMain,
  s_oSpriteLibrary,
  s_oMsgBox,
  s_oGameSettings,
  s_aSounds,
  s_aSoundsInfo,
  s_bStorageAvailable = !0;
function CSpriteSheetTextButton(a, f, c, d, g, e, k, l) {
  var b, q, n, w, t, v, x, B, z, N, p, F;
  this._init = function (K, A, y, L, C, P, Y, R) {
    b = !1;
    w = P;
    t = [];
    v = [];
    F = R;
    q = y.width / 2;
    n = y.height;
    z = new createjs.Container();
    z.x = K;
    z.y = A;
    z.regX = q / 2;
    z.regY = n / 2;
    z.cursor = "pointer";
    F.addChild(z);
    K = new createjs.SpriteSheet({
      images: [y],
      frames: { width: q, height: n },
      animations: { state_enable: 0, state_disable: 1 },
    });
    N = createSprite(K, "state_enable", 0, 0, q, n);
    z.addChild(N);
    p = new CTLText(
      z,
      0,
      0,
      q,
      n,
      Y,
      "center",
      P,
      C,
      1,
      4,
      4,
      L,
      !0,
      !0,
      !0,
      !1
    );
    this._initListener();
  };
  this.unload = function () {
    z.off("mousedown", x);
    z.off("pressup", B);
    F.removeChild(z);
  };
  this.setVisible = function (K) {
    z.visible = K;
  };
  this.enable = function () {
    b = !1;
    N.gotoAndStop("state_enable");
    p.setColor(w);
  };
  this.disable = function () {
    b = !0;
    N.gotoAndStop("state_disable");
    p.setColor("#636363");
  };
  this.setText = function (K) {
    p.refreshText(K);
  };
  this._initListener = function () {
    x = z.on("mousedown", this.buttonDown);
    B = z.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (K, A, y) {
    t[K] = A;
    v[K] = y;
  };
  this.buttonRelease = function () {
    b ||
      (playSound("press_but", 1, !1),
      (z.scaleX = 1),
      (z.scaleY = 1),
      t[ON_MOUSE_UP] && t[ON_MOUSE_UP].call(v[ON_MOUSE_UP]));
  };
  this.buttonDown = function () {
    b ||
      ((z.scaleX = 0.9),
      (z.scaleY = 0.9),
      t[ON_MOUSE_DOWN] && t[ON_MOUSE_DOWN].call(v[ON_MOUSE_DOWN]));
  };
  this.setPosition = function (K, A) {
    z.x = K;
    z.y = A;
  };
  this.setX = function (K) {
    z.x = K;
  };
  this.setY = function (K) {
    z.y = K;
  };
  this.getButtonImage = function () {
    return z;
  };
  this.getX = function () {
    return z.x;
  };
  this.getY = function () {
    return z.y;
  };
  this.getText = function () {
    return p.getString();
  };
  this._init(a, f, c, d, g, e, k, l);
  return this;
}
function CGfxButton(a, f, c, d) {
  var g, e, k, l, b, q, n, w, t;
  this._init = function (v, x, B, z) {
    g = !1;
    e = 1;
    k = [];
    l = [];
    t = createBitmap(B);
    t.x = v;
    t.y = x;
    t.scaleX = t.scaleY = e;
    t.regX = B.width / 2;
    t.regY = B.height / 2;
    z.addChild(t);
    this._initListener();
  };
  this.unload = function () {
    createjs.Tween.removeTweens(t);
    t.off("mousedown", q);
    t.off("pressup", n);
    s_bMobile || t.off("mouseover", w);
    d.removeChild(t);
  };
  this.setVisible = function (v) {
    t.visible = v;
  };
  this.setClickable = function (v) {
    g = !v;
  };
  this._initListener = function () {
    q = t.on("mousedown", this.buttonDown);
    n = t.on("pressup", this.buttonRelease);
    s_bMobile || (w = t.on("mouseover", this.buttonOver));
  };
  this.addEventListener = function (v, x, B) {
    k[v] = x;
    l[v] = B;
  };
  this.addEventListenerWithParams = function (v, x, B, z) {
    k[v] = x;
    l[v] = B;
    b = z;
  };
  this.buttonRelease = function () {
    g ||
      ((t.scaleX = e),
      (t.scaleY = e),
      k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(l[ON_MOUSE_UP], b));
  };
  this.buttonDown = function () {
    g ||
      ((t.scaleX = 0.9 * e),
      (t.scaleY = 0.9 * e),
      k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN], b));
  };
  this.buttonOver = function (v) {
    s_bMobile || g || (v.target.cursor = "pointer");
  };
  this.pulseAnimation = function () {
    createjs.Tween.get(t, { loop: -1 })
      .to({ scaleX: 1.1 * e, scaleY: 1.1 * e }, 850, createjs.Ease.quadOut)
      .to({ scaleX: e, scaleY: e }, 650, createjs.Ease.quadIn);
  };
  this.moveY = function (v, x, B, z) {
    createjs.Tween.get(t).wait(B).to({ y: v }, x, z);
  };
  this.setPosition = function (v, x) {
    t.x = v;
    t.y = x;
  };
  this.setX = function (v) {
    t.x = v;
  };
  this.setY = function (v) {
    t.y = v;
  };
  this.getButtonImage = function () {
    return t;
  };
  this.getX = function () {
    return t.x;
  };
  this.getY = function () {
    return t.y;
  };
  this._init(a, f, c, d);
  return this;
}
function CToggle(a, f, c, d, g) {
  var e, k, l, b, q, n, w;
  this._init = function (t, v, x, B, z) {
    w = void 0 !== z ? z : s_oStage;
    k = [];
    l = [];
    z = new createjs.SpriteSheet({
      images: [x],
      frames: {
        width: x.width / 2,
        height: x.height,
        regX: x.width / 2 / 2,
        regY: x.height / 2,
      },
      animations: { state_true: [0], state_false: [1] },
    });
    e = B;
    b = createSprite(
      z,
      "state_" + e,
      x.width / 2 / 2,
      x.height / 2,
      x.width / 2,
      x.height
    );
    b.x = t;
    b.y = v;
    b.stop();
    s_bMobile || (b.cursor = "pointer");
    w.addChild(b);
    this._initListener();
  };
  this.unload = function () {
    b.off("mousedown", q);
    b.off("pressup", n);
    w.removeChild(b);
  };
  this._initListener = function () {
    q = b.on("mousedown", this.buttonDown);
    n = b.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (t, v, x) {
    k[t] = v;
    l[t] = x;
  };
  this.setCursorType = function (t) {
    b.cursor = t;
  };
  this.setActive = function (t) {
    e = t;
    b.gotoAndStop("state_" + e);
  };
  this.buttonRelease = function () {
    b.scaleX = 1;
    b.scaleY = 1;
    playSound("press_but", 1, !1);
    e = !e;
    b.gotoAndStop("state_" + e);
    k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(l[ON_MOUSE_UP], e);
  };
  this.buttonDown = function () {
    b.scaleX = 0.9;
    b.scaleY = 0.9;
    k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN]);
  };
  this.setPosition = function (t, v) {
    b.x = t;
    b.y = v;
  };
  this._init(a, f, c, d, g);
}
function CBetBut(a, f, c, d) {
  var g,
    e,
    k,
    l = [],
    b,
    q;
  this._init = function (w, t, v) {
    g = !1;
    e = [];
    k = [];
    q = new createjs.Container();
    q.x = w;
    q.y = t;
    n.addChild(q);
    w = {
      images: [s_oSpriteLibrary.getSprite("bet_but")],
      frames: { width: 44, height: 45 },
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
        bet_but20_off: 39,
      },
    };
    w = new createjs.SpriteSheet(w);
    b = createSprite(w, v + "_on", 0, 0, 44, 45);
    b.stop();
    b.cursor = "pointer";
    q.addChild(b);
    this._initListener();
  };
  this.unload = function () {
    b.off("mousedown", this.buttonDown);
    b.off("pressup", this.buttonRelease);
    n.removeChild(b);
  };
  this.disable = function (w) {
    g = w;
  };
  this.setVisible = function (w) {
    b.visible = w;
  };
  this.setOn = function () {
    b.gotoAndStop(c + "_on");
  };
  this.setOff = function () {
    b.gotoAndStop(c + "_off");
  };
  this._initListener = function () {
    b.on("mousedown", this.buttonDown);
    b.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (w, t, v) {
    e[w] = t;
    k[w] = v;
  };
  this.addEventListenerWithParams = function (w, t, v, x) {
    e[w] = t;
    k[w] = v;
    l = x;
  };
  this.buttonRelease = function () {
    e[ON_MOUSE_UP] &&
      !1 === g &&
      (playSound("press_but", 1, !1), e[ON_MOUSE_UP].call(k[ON_MOUSE_UP], l));
  };
  this.buttonDown = function () {
    e[ON_MOUSE_DOWN] && !1 === g && e[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN], l);
  };
  this.setPosition = function (w, t) {
    b.x = w;
    b.y = t;
  };
  this.setX = function (w) {
    b.x = w;
  };
  this.setY = function (w) {
    b.y = w;
  };
  this.getButtonImage = function () {
    return b;
  };
  this.getX = function () {
    return b.x;
  };
  this.getY = function () {
    return b.y;
  };
  var n = d;
  this._init(a, f, c);
}
function CGame() {
  var a,
    f,
    c = !1,
    d = !1,
    g,
    e,
    k,
    l,
    b,
    q,
    n,
    w,
    t,
    v,
    x,
    B,
    z,
    N,
    p,
    F,
    K,
    A,
    y,
    L,
    C,
    P,
    Y,
    R,
    U,
    O,
    Z,
    J,
    D = null,
    I,
    H,
    h,
    Q,
    V;
  this._init = function () {
    k = GAME_STATE_IDLE;
    w = K = q = l = 0;
    Y = [0, 1, 2, 3, 4];
    b = Y[0];
    n = NUM_PAYLINES;
    B = TOTAL_MONEY;
    v = START_BET;
    v = parseFloat(v.toFixed(2));
    for (var m = 0; m < COIN_BET.length; m++)
      if (v === COIN_BET[m]) {
        y = m;
        break;
      }
    x = v * n;
    g = !1;
    p = F = 0;
    A = [];
    s_oTweenController = new CTweenController();
    U = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
    s_oAttachSection.addChild(U);
    H = new createjs.Container();
    H.x = REEL_OFFSET_X;
    H.y = REEL_OFFSET_Y;
    H.scaleX = H.scaleY = REEL_SCALE;
    s_oAttachSection.addChild(H);
    m = s_oSpriteLibrary.getSprite("mask_slot");
    WIDTH_MASK_SLOT = m.width;
    var u = new createjs.Shape();
    u.graphics
      .beginFill("rgba(0,0,0,0.5)")
      .drawRect(
        22,
        16,
        WIDTH_MASK_SLOT - 40,
        SYMBOL_HEIGHT * NUM_ROWS + SPACE_HEIGHT_BETWEEN_SYMBOLS * NUM_ROWS + 10
      );
    H.addChild(u);
    this._initReels();
    Z = createBitmap(m);
    H.addChild(Z);
    m = {
      images: [s_oSpriteLibrary.getSprite("logo")],
      frames: { width: 302, height: 80, regX: 151, regY: 0 },
      animations: { normal: 0, freespin: [1, 11] },
    };
    a = CANVAS_WIDTH / 2;
    f = 0;
    m = new createjs.SpriteSheet(m);
    O = createSprite(m, "normal", 151, 0, 302, 80);
    O.x = a + 70;
    O.y = f;
    s_oAttachSection.addChild(O);
    J = new CInterface(v, x, H);
    this._initStaticSymbols();
    Q = new CAvatar(s_oAttachSection);
    D = new CPayTablePanel();
    I = new CBonusPanel();
    V = new CFreekicksPanel();
    this.refreshButtonPos();
    c = !0;
  };
  this.unload = function () {
    J.unload();
    D.unload();
    for (var m = 0; m < L.length; m++) L[m].unload();
    for (m = 0; m < NUM_ROWS; m++)
      for (var u = 0; u < NUM_REELS; u++) C[m][u].unload();
    s_oMsgBox.unload();
    s_oAttachSection.removeAllChildren();
    s_oGame = null;
  };
  this.refreshButtonPos = function () {
    J.refreshButtonPos();
    D.refreshButtonPos();
    O.y = f + s_iOffsetY;
    I.refreshButtonPos();
    V.refreshButtonPos();
    Q.refreshButtonPos();
  };
  this._initReels = function () {
    h = new createjs.Container();
    H.addChild(h);
    var m = (START_REEL_OFFSET_X = 34),
      u = (START_REEL_OFFSET_Y = 22),
      r = new createjs.Shape();
    r.graphics
      .beginFill("rgba(255,0,0,0.01)")
      .drawRect(
        m,
        u,
        SYMBOL_WIDTH * NUM_REELS + SPACE_BETWEEN_SYMBOLS * (NUM_REELS - 1),
        SYMBOL_HEIGHT * NUM_ROWS + SPACE_HEIGHT_BETWEEN_SYMBOLS * (NUM_ROWS - 1)
      );
    H.addChild(r);
    this._generateLosingPattern();
    var M = 0;
    L = [];
    for (var T = 0; T < NUM_REELS; T++)
      (L[T] = new CReelColumn(T, m, u, M, [R[0][T], R[1][T], R[2][T]], h)),
        (L[T + NUM_REELS] = new CReelColumn(
          T + NUM_REELS,
          m,
          u + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS,
          M,
          [R[0][T], R[1][T], R[2][T]],
          h
        )),
        (m += SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS),
        (M += REEL_DELAY);
    h.mask = r;
  };
  this._initStaticSymbols = function () {
    var m = REEL_OFFSET_X + START_REEL_OFFSET_X,
      u = REEL_OFFSET_Y + START_REEL_OFFSET_Y;
    C = [];
    for (var r = 0; r < NUM_ROWS; r++) {
      C[r] = [];
      for (var M = 0; M < NUM_REELS; M++) {
        var T = new CStaticSymbolCell(r, M, m, u, H);
        C[r][M] = T;
        m += (SYMBOL_WIDTH + SPACE_BETWEEN_SYMBOLS) * REEL_SCALE;
      }
      m = REEL_OFFSET_X + START_REEL_OFFSET_X;
      u += (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * REEL_SCALE;
    }
  };
  this._generateRandSymbols = function () {
    for (var m = [], u = 0; u < NUM_ROWS; u++)
      m[u] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
    return m;
  };
  this.reelArrived = function (m, u) {
    if (l > MIN_REEL_LOOPS)
      if (b === u) {
        if (!1 === L[m].isReadyToStop()) {
          var r = m;
          m < NUM_REELS
            ? ((r += NUM_REELS),
              L[r].setReadyToStop(),
              L[m].restart([R[0][m], R[1][m], R[2][m]], !0))
            : ((r -= NUM_REELS),
              L[r].setReadyToStop(),
              L[m].restart([R[0][r], R[1][r], R[2][r]], !0));
        }
      } else L[m].restart(this._generateRandSymbols(), !1);
    else L[m].restart(this._generateRandSymbols(), !1), d && 0 === m && l++;
  };
  this.stopNextReel = function () {
    q++;
    0 === q % 2 &&
      ((b = Y[q / 2]), q === 2 * NUM_REELS && this._endReelAnimation());
  };
  this._realEndReelAnimation = function () {
    -1 !== A.indexOf(BONUS_GAME) || 0 < F
      ? (this.resetAutoSpin(), J.disableGuiButtons(g, 0 < F ? !0 : !1))
      : g
      ? J.enableSpin(!0)
      : J.enableGuiButtons();
    J.setSpinState(TEXT_SPIN);
    if (0 < P.length) {
      Q.show(0.5 < Math.random() ? 1 : 2);
      for (var m = 0; m < P.length; m++) {
        7 > P[m].value && D.highlightCombo(P[m].value, P[m].num_win);
        0 < P[m].line && J.showLine(P[m].line);
        for (var u = P[m].list, r = 0; r < u.length; r++)
          C[u[r].row][u[r].col].showWinFrame();
      }
      0 < z && J.refreshWinText(z);
      TIME_SHOW_ALL_WINS = 2e3;
      w = 0;
      k = GAME_STATE_SHOW_ALL_WIN;
      playSound("avatar_win", 1, !1);
    } else if (g)
      if (B < x && 0 === F)
        J.enableGuiButtons(),
          this.resetAutoSpin(),
          J.enableGuiButtons(),
          (k = GAME_STATE_IDLE);
      else this.onSpin();
    else J.enableGuiButtons(), (k = GAME_STATE_IDLE);
    B < x && 0 === F
      ? (J.enableGuiButtons(), this.resetAutoSpin())
      : g ||
        (V.isVisible()
          ? 0 < P.length && (J.enableSpin(!1), J.disableBetBut(!0))
          : 0 < F || -1 !== A.indexOf(BONUS_GAME)
          ? J.enableSpin(!1)
          : (J.enableGuiButtons(), J.disableBetBut(!1)));
  };
  this._endReelAnimation = function () {
    d = !1;
    t = q = l = 0;
    b = Y[0];
    this._realEndReelAnimation();
  };
  this.hidePayTable = function () {
    D.hide();
  };
  this.showWin = function () {
    if (k === GAME_STATE_SHOW_WIN) {
      if (0 < t) {
        stopSound("avatar_win");
        var m = P[t - 1].line;
        J.hideLine(m);
        var u = P[t - 1].list;
        for (m = 0; m < u.length; m++)
          L[u[m].col].setVisible(u[m].row, !0),
            L[u[m].col + NUM_REELS].setVisible(u[m].row, !0);
      }
      if (t === P.length)
        if (((t = 0), -1 !== A.indexOf(BONUS_GAME)))
          this._hideAllWins(),
            $(s_oMain).trigger("bonus_call", { bet: COIN_BET[y] });
        else if (e) (e = !1), V.show(p), (k = GAME_STATE_FREEKICK);
        else if (g) this.onSpin();
        else
          J.enableGuiButtons(),
            J.disableBetBut(!1),
            (k = GAME_STATE_IDLE),
            J.enableGuiButtons();
      else {
        m = P[t].line;
        u = P[t].list;
        if (0 === m) {
          var r = Math.floor(u.length / 2);
          m = u[r].row;
          r = u[r].col;
        } else {
          J.showLine(m);
          r = 2;
          var M = !1;
          3 > u.length
            ? P[t].value === FREESPIN_SYMBOL
              ? ((r = u[0].col), (m = u[0].row), (M = !0))
              : ((r = u.length - 1), (m = u[r].row))
            : (m = u[r].row);
          for (; !M && R[m][r] === WILD_SYMBOL; )
            if ((r--, 0 > r)) {
              r = 0;
              m = u[r].row;
              break;
            } else m = u[r].row;
        }
        u = { x: 0, y: 0 };
        0 === m
          ? 0 === r
            ? (M = { x: 0, y: 0 })
            : 4 === r
            ? ((M = { x: SYMBOL_ANIM_WIDTH, y: 0 }),
              (u = { x: SYMBOL_WIDTH, y: 0 }))
            : ((M = { x: SYMBOL_ANIM_WIDTH / 2, y: 0 }),
              (u = { x: SYMBOL_WIDTH / 2, y: 0 }))
          : 1 === m
          ? 0 === r
            ? ((M = { x: 0, y: SYMBOL_ANIM_HEIGHT / 2 }),
              (u = { x: 0, y: SYMBOL_HEIGHT / 2 }))
            : 4 === r
            ? ((M = { x: SYMBOL_ANIM_WIDTH, y: SYMBOL_ANIM_HEIGHT / 2 }),
              (u = { x: SYMBOL_WIDTH, y: SYMBOL_HEIGHT / 2 }))
            : ((M = { x: SYMBOL_ANIM_WIDTH / 2, y: SYMBOL_ANIM_HEIGHT / 2 }),
              (u = { x: SYMBOL_WIDTH / 2, y: SYMBOL_HEIGHT / 2 }))
          : 0 === r
          ? ((M = { x: 0, y: SYMBOL_ANIM_HEIGHT }),
            (u = { x: 0, y: SYMBOL_HEIGHT }))
          : 4 === r
          ? ((M = { x: SYMBOL_ANIM_WIDTH, y: SYMBOL_ANIM_HEIGHT }),
            (u = { x: SYMBOL_WIDTH, y: SYMBOL_HEIGHT }))
          : ((M = { x: SYMBOL_ANIM_WIDTH / 2, y: WIN_BIG_ANIM_HEIGHT }),
            (u = { x: SYMBOL_WIDTH / 2, y: SYMBOL_HEIGHT }));
        C[m][r].show(
          R[m][r] + 1,
          P[t].amount * v,
          u,
          M,
          g || (!1 === e && 0 < F) ? 1 : 3
        );
        t++;
      }
    }
  };
  this._hideAllWins = function () {
    for (var m = 0; m < NUM_ROWS; m++)
      for (var u = 0; u < NUM_REELS; u++) C[m][u].hideWinFrame();
    J.hideAllLines();
  };
  this._prepareForWinsShowing = function () {
    w = TIME_SHOW_WIN;
    k = GAME_STATE_SHOW_WIN;
    this.showWin();
  };
  this.activateLines = function (m) {
    n = m;
    this.removeWinShowing();
    x = m = v * n;
    J.refreshTotalBet(x);
    J.refreshNumLines(n);
    m > B ? J.disableSpin(0 < F ? !1 : !0) : J.enableSpin(0 < F ? !1 : !0);
  };
  this.addLine = function () {
    n === NUM_PAYLINES ? (n = 1) : n++;
    x = v * n;
    J.refreshTotalBet(x);
    J.refreshNumLines(n);
    J.enableSpin(0 < F ? !1 : !0);
  };
  this.resetCoinBet = function () {
    y = 0;
    var m = COIN_BET[y],
      u = m * n;
    v = m;
    x = u;
    J.refreshBet(v);
    J.refreshTotalBet(x);
    J.enableSpin(0 < F ? !1 : !0);
  };
  this.changeCoinBet = function () {
    y++;
    y === COIN_BET.length && (y = 0);
    var m = parseFloat(COIN_BET[y]),
      u = m * n;
    v = m;
    v = Math.floor(100 * v) / 100;
    x = u;
    J.refreshBet(v);
    J.refreshTotalBet(x);
    J.enableSpin(0 < F ? !1 : !0);
  };
  this.removeWinShowing = function () {
    D.resetHighlightCombo();
    J.resetWin();
    for (var m = 0; m < NUM_ROWS; m++)
      for (var u = 0; u < NUM_REELS; u++)
        C[m][u].hide(),
          L[u].setVisible(m, !0),
          L[u + NUM_REELS].setVisible(m, !0);
    for (m = 0; m < L.length; m++) L[m].activate();
    k = GAME_STATE_IDLE;
  };
  this.forceStopReel = function () {
    0 === F && this.resetAutoSpin();
    k = GAME_STATE_IDLE;
    for (var m = 0; m < NUM_REELS; m++) {
      var u =
        REEL_OFFSET_Y +
        (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS;
      L[m].forceStop([R[0][m], R[1][m], R[2][m]], START_REEL_OFFSET_Y);
      L[m + NUM_REELS].forceStop(null, u);
    }
    this._endReelAnimation();
  };
  this.onSpin = function () {
    !(
      (0 < F && !V.isVisible()) ||
      -1 !== A.indexOf(BONUS_GAME) ||
      (0 === F && V.isVisible())
    ) ||
    (k !== GAME_STATE_SHOW_ALL_WIN && k !== GAME_STATE_SHOW_WIN)
      ? (stopSound("avatar_win"),
        B < x && 0 === F
          ? (this.resetAutoSpin(), new CRechargePanel())
          : ((d = !1),
            playSound("spin_but", 1, !1),
            J.disableBetBut(!0),
            V.isVisible()
              ? ((x = 0), F--)
              : (this.removeWinShowing(),
                (x = v * n),
                (A = []),
                this._hideAllWins(),
                J.disableGuiButtons(g, 0 < F ? !0 : !1),
                (B -= x),
                J.refreshMoney(B),
                (k = GAME_STATE_SPINNING)),
            $(s_oMain).trigger("bet_placed", {
              bet: COIN_BET[y],
              tot_bet: x,
              payline: n,
            })))
      : (this._hideAllWins(),
        this.removeWinShowing(),
        (t = P.length),
        (k = GAME_STATE_SHOW_WIN),
        this.showWin());
  };
  this.onSpinReceived = function (m) {
    K++;
    K === NUM_SPIN_FOR_ADS &&
      ((K = 0), $(s_oMain).trigger("show_interlevel_ad"));
    console.log(m);
    if (!0 === m.res) {
      R = m.pattern;
      P = m.win_lines;
      var u = parseFloat(m.tot_win),
        r = m.bonus;
      m.freespin ? (F = p = parseInt(m.num_freespin)) : (p = 0);
      B = parseFloat(m.money);
      V.isVisible()
        ? V.playerShot(u, p)
        : (0 < u || !0 === r || 0 < F
            ? ((e = !1),
              m.freespin && (A.push(BONUS_FREESPIN), (e = !0)),
              r && A.push(BONUS_GAME),
              (z = u))
            : (P = []),
          (d = !0),
          $(s_oMain).trigger("save_score", B),
          saveItem(LOCALSTORAGE_STRING + "score", B));
    } else s_oGame._generateLosingPattern();
  };
  this.onBonusStart = function (m) {
    B = parseFloat(m.money);
    N = parseFloat(m.bonus_win);
    I.show(m.prize_list, m.final_prize);
    setVolume("crowd", 0);
    k = GAME_STATE_BONUS;
    saveItem(LOCALSTORAGE_STRING + "score", B);
  };
  this.refreshMoney = function (m) {
    B = m;
    J.refreshMoney(B);
    saveItem(LOCALSTORAGE_STRING + "score", B);
  };
  this.onAutoSpin = function (m) {
    if ((g = m) && k === GAME_STATE_IDLE) this.onSpin();
  };
  this.onStopAutoSpin = function () {
    this.resetAutoSpin();
    k !== GAME_STATE_SPINNING && k !== GAME_STATE_BONUS && J.enableGuiButtons();
  };
  this.resetAutoSpin = function () {
    g = !1;
    J.setAutoSpinState(TEXT_AUTO_SPIN);
  };
  this._generateLosingPattern = function () {
    for (var m = [], u = 0; u < NUM_ROWS; u++) {
      var r = Math.floor(Math.random() * (s_aRandSymbols.length - 2));
      r = s_aRandSymbols[r];
      m[u] = r;
    }
    R = [];
    for (u = 0; u < NUM_ROWS; u++) {
      R[u] = [];
      for (var M = 0; M < NUM_REELS; M++)
        if (0 === M) R[u][M] = m[u];
        else {
          do
            (r = Math.floor(Math.random() * (s_aRandSymbols.length - 2))),
              (r = s_aRandSymbols[r]);
          while (m[0] === r || m[1] === r || m[2] === r);
          R[u][M] = r;
        }
    }
    P = [];
    d = !0;
  };
  this.onInfoClicked = function () {
    k !== GAME_STATE_SPINNING && (D.isVisible() ? D.hide() : D.show());
  };
  this.exitFromFreekicks = function (m) {
    J.refreshWinText(z + m);
    J.refreshMoney(B);
    J.enableGuiButtons();
    k = GAME_STATE_IDLE;
  };
  this.exitFromBonus = function () {
    J.refreshMoney(B);
    J.refreshWinText(z + N);
    if (e) (e = !1), V.show(p), (k = GAME_STATE_FREEKICK);
    else if (g) this.onSpin();
    else
      J.enableGuiButtons(),
        J.disableBetBut(!1),
        J.enableSpin(0 < F ? !1 : !0),
        J.enableGuiButtons();
    setVolume("crowd", 1);
    k = GAME_STATE_IDLE;
  };
  this.onExit = function () {
    $(s_oMain).trigger("start_session");
    this.unload();
    s_oMain.gotoMenu();
  };
  this.getState = function () {
    return k;
  };
  this.update = function () {
    if (!1 !== c)
      switch (k) {
        case GAME_STATE_SPINNING:
          for (var m = 0; m < L.length; m++) L[m].update();
          break;
        case GAME_STATE_SHOW_ALL_WIN:
          w += s_iTimeElaps;
          w > TIME_SHOW_ALL_WINS &&
            ((w = 0),
            this._hideAllWins(),
            (t = g ? P.length : 0),
            this._prepareForWinsShowing());
          break;
        case GAME_STATE_BONUS:
          I.update();
          break;
        case GAME_STATE_FREEKICK:
          V.update();
      }
  };
  s_oGame = this;
  this._init();
}
var s_oGame = null,
  s_oTweenController;
function CReelColumn(a, f, c, d, g, e) {
  var k, l, b, q, n, w, t, v, x, B, z, N, p, F, K, A;
  this._init = function (y, L, C, P, Y) {
    q = b = l = k = !1;
    v = 0;
    n = y;
    t = P;
    w = n < NUM_REELS ? n : n - NUM_REELS;
    B = 0;
    z = MAX_FRAMES_REEL_EASE;
    x = REEL_STATE_START;
    N = C;
    p = N + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS;
    this.initContainer(L, C, Y);
  };
  this.initContainer = function (y, L, C) {
    A = new createjs.Container();
    A.x = y;
    A.y = L;
    y = 0;
    F = [];
    K = [];
    for (L = 0; L < NUM_ROWS; L++) {
      var P = createSprite(
        s_aSymbolData[C[L]],
        "static",
        0,
        0,
        SYMBOL_WIDTH,
        SYMBOL_HEIGHT
      );
      P.stop();
      P.x = 0;
      P.y = y;
      A.addChild(P);
      F[L] = P;
      K[L] = C[L];
      y += SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS;
    }
    e.addChild(A);
  };
  this.unload = function () {
    e.removeChild(A);
  };
  this.activate = function () {
    N = A.y;
    p = N + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS;
    k = !0;
  };
  this._setSymbol = function (y) {
    for (var L = 0, C = 0; C < y.length; C++)
      (F[C].spriteSheet = s_aSymbolData[y[C]]),
        F[C].gotoAndStop("static"),
        (F[C].x = 0),
        (F[C].y = L),
        (K[C] = y[C]),
        (L += SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS);
  };
  this.forceStop = function (y, L) {
    null !== y && this._setSymbol(y);
    A.y = L;
    k = !1;
    B = 0;
    z = MAX_FRAMES_REEL_EASE;
    x = REEL_STATE_START;
    v = 0;
    b = l = !1;
  };
  this.setVisible = function (y, L) {
    F[y].visible = L;
  };
  this.restart = function (y, L) {
    A.y = N = REEL_START_Y;
    p = N + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS;
    this._setSymbol(y);
    if ((l = L)) {
      B = 0;
      z = MAX_FRAMES_REEL_EASE;
      x = REEL_STATE_STOP;
      for (var C = 0; C < NUM_ROWS; C++) F[C].gotoAndStop("static");
      b = !0;
    } else for (C = 0; C < NUM_ROWS; C++) F[C].gotoAndStop("moving");
  };
  this.setReadyToStop = function () {
    B = 0;
    z = MAX_FRAMES_REEL_EASE;
    x = REEL_STATE_STOP;
  };
  this.isReadyToStop = function () {
    return l;
  };
  this.getPosUpLeft = function (y) {
    return {
      x: A.x,
      y: A.y + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * y,
    };
  };
  this.getY = function () {
    return A.y;
  };
  this._updateStart = function () {
    0 === B && n < NUM_REELS && playSound("start_reel", 1, !1);
    B++;
    B > z &&
      ((B = 0),
      (z /= 2),
      x++,
      (N = A.y),
      (p = N + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS));
    var y = s_oTweenController.easeInBack(B, 0, 1, z);
    y = s_oTweenController.tweenValue(N, p, y);
    A.y = y;
  };
  this._updateMoving = function () {
    B++;
    B > z &&
      ((B = 0),
      (N = A.y),
      (p = N + (SYMBOL_HEIGHT + SPACE_HEIGHT_BETWEEN_SYMBOLS) * NUM_ROWS));
    var y = s_oTweenController.easeLinear(B, 0, 1, z);
    y = s_oTweenController.tweenValue(N, p, y);
    A.y = y;
  };
  this._updateStopping = function () {
    B++;
    if (B >= z)
      (k = !1),
        (B = 0),
        (z = MAX_FRAMES_REEL_EASE),
        (x = REEL_STATE_START),
        (v = 0),
        (q = l = !1),
        b && ((b = !1), (A.y = p)),
        s_oGame.stopNextReel();
    else {
      var y = s_oTweenController.easeOutCubic(B, 0, 1, z);
      y = s_oTweenController.tweenValue(N, p, y);
      A.y = y;
      !1 === q &&
        B >= 0.7 * z &&
        b &&
        ((q = !0),
        K[0] === BONUS_SYMBOL || K[1] === BONUS_SYMBOL || K[2] === BONUS_SYMBOL
          ? playSound("reel_stop_bonus", 1, !1)
          : K[0] === FREESPIN_SYMBOL ||
            K[1] === FREESPIN_SYMBOL ||
            K[2] === FREESPIN_SYMBOL
          ? playSound("reel_stop_freespin", 1, !1)
          : playSound("reel_stop", 1, !1));
    }
  };
  this.update = function () {
    if (!1 !== k && (v++, v > t))
      switch (
        (!1 === l && A.y > REEL_ARRIVAL_Y && s_oGame.reelArrived(n, w), x)
      ) {
        case REEL_STATE_START:
          this._updateStart();
          break;
        case REEL_STATE_MOVING:
          this._updateMoving();
          break;
        case REEL_STATE_STOP:
          this._updateStopping();
      }
  };
  this._init(a, f, c, d, g);
}
function CInterface(a, f, c) {
  var d,
    g,
    e,
    k,
    l,
    b,
    q,
    n,
    w,
    t,
    v,
    x,
    B,
    z,
    N,
    p,
    F,
    K,
    A,
    y,
    L,
    C,
    P,
    Y,
    R,
    U,
    O,
    Z = null,
    J = null;
  this._init = function (D, I, H) {
    this._initPaylines(H);
    var h = s_oSpriteLibrary.getSprite("but_text");
    q = CANVAS_HEIGHT - h.height / 2 - 154;
    F = new CSpriteSheetTextButton(
      164,
      q,
      h,
      TEXT_PAYTABLE,
      FONT_GAME_1,
      "#fff",
      26,
      H
    );
    F.addEventListener(ON_MOUSE_UP, this._onInfo, this);
    w = CANVAS_HEIGHT - h.height / 2 - 154;
    A = new CSpriteSheetTextButton(
      325,
      w,
      h,
      TEXT_COIN + " " + formatEntries(D),
      FONT_GAME_1,
      "#fff",
      26,
      H
    );
    A.addEventListener(ON_MOUSE_UP, this._onBet, this);
    n = CANVAS_HEIGHT - h.height / 2 - 154;
    K = new CSpriteSheetTextButton(
      486,
      n,
      h,
      TEXT_LINES + " " + NUM_PAYLINES,
      FONT_GAME_1,
      "#fff",
      26,
      H
    );
    K.addEventListener(ON_MOUSE_UP, this._onAddLine, this);
    t = CANVAS_HEIGHT - h.height / 2 - 154;
    y = new CSpriteSheetTextButton(
      647,
      t,
      h,
      TEXT_AUTO_SPIN,
      FONT_GAME_1,
      "#fff",
      26,
      H
    );
    y.addEventListener(ON_MOUSE_UP, this._onAutoSpin, this);
    v = 808;
    x = CANVAS_HEIGHT - h.height / 2 - 154;
    p = new CSpriteSheetTextButton(
      v,
      x,
      h,
      TEXT_SPIN,
      FONT_GAME_1,
      "#fff",
      26,
      H
    );
    p.addEventListener(ON_MOUSE_UP, this._onSpin, this);
    D = s_oSpriteLibrary.getSprite("text_bg");
    var Q = 20,
      V = createBitmap(D);
    V.x = Q;
    V.y = 530;
    H.addChild(V);
    var m = CANVAS_HEIGHT - 236;
    new CTLText(
      H,
      24,
      m,
      150,
      26,
      26,
      "left",
      "#ffd90c",
      FONT_GAME_2,
      1,
      0,
      0,
      TEXT_MONEY,
      !0,
      !0,
      !1,
      !1
    );
    C = new CTLText(
      H,
      175,
      m,
      150,
      26,
      26,
      "right",
      "#ffd90c",
      FONT_GAME_2,
      1,
      0,
      0,
      formatEntries(TOTAL_MONEY),
      !0,
      !0,
      !1,
      !1
    );
    Q += D.width + 2;
    V = createBitmap(D);
    V.x = Q;
    V.y = 530;
    H.addChild(V);
    new CTLText(
      H,
      336,
      m,
      150,
      26,
      26,
      "left",
      "#ffd90c",
      FONT_GAME_2,
      1,
      0,
      0,
      TEXT_BET,
      !0,
      !0,
      !1,
      !1
    );
    P = new CTLText(
      H,
      487,
      m,
      150,
      26,
      26,
      "right",
      "#ffd90c",
      FONT_GAME_2,
      1,
      0,
      0,
      formatEntries(I),
      !0,
      !0,
      !1,
      !1
    );
    Q += D.width + 2;
    V = createBitmap(D);
    V.x = Q;
    V.y = 530;
    H.addChild(V);
    new CTLText(
      H,
      648,
      m,
      150,
      26,
      26,
      "left",
      "#ffd90c",
      FONT_GAME_2,
      1,
      0,
      0,
      TEXT_WIN,
      !0,
      !0,
      !1,
      !1
    );
    Y = new CTLText(
      H,
      799,
      m,
      150,
      26,
      26,
      "right",
      "#ffd90c",
      FONT_GAME_2,
      1,
      0,
      0,
      "0.00" + TEXT_CURRENCY,
      !0,
      !0,
      !1,
      !1
    );
    I = s_oSpriteLibrary.getSprite("but_exit");
    d = CANVAS_WIDTH - I.width / 2 - 4;
    g = I.height / 2 + 4;
    L = new CGfxButton(d, g, I, s_oAttachSection);
    L.addEventListener(ON_MOUSE_UP, this._onExit, this);
    !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
      ? ((h = s_oSpriteLibrary.getSprite("audio_icon")),
        (l = h.width / 4 + 4),
        (b = g),
        (R = new CToggle(l, b, h, s_bAudioActive, s_oAttachSection)),
        R.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
        (e = l + h.width / 2 + 4),
        (k = b))
      : ((e = h.width / 2 + 4), (k = g));
    h = window.document;
    I = h.documentElement;
    Z =
      I.requestFullscreen ||
      I.mozRequestFullScreen ||
      I.webkitRequestFullScreen ||
      I.msRequestFullscreen;
    J =
      h.exitFullscreen ||
      h.mozCancelFullScreen ||
      h.webkitExitFullscreen ||
      h.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (Z = !1);
    Z &&
      screenfull.isEnabled &&
      ((h = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (U = new CToggle(e, k, h, s_bFullscreen, s_oAttachSection)),
      U.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    O = new CAreYouSurePanel();
    O.addEventListener(ON_BUT_YES_DOWN, this._onExitYes, this);
    s_bMobile || (document.onkeyup = this.onKeyUp);
    this.refreshButtonPos();
  };
  this.onKeyUp = function (D) {
    D || (D = window.event);
    13 === D.keyCode && s_oInterface._onSpin();
    D.preventDefault();
    return !1;
  };
  this.refreshButtonPos = function () {
    v - s_iOffsetX > CANVAS_WIDTH - 210 &&
      p.setPosition(v - s_iOffsetX, x - s_iOffsetY);
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      R.setPosition(l + s_iOffsetX, s_iOffsetY + b);
    Z && screenfull.isEnabled && U.setPosition(e + s_iOffsetX, k + s_iOffsetY);
    L.setPosition(d - s_iOffsetX, g + s_iOffsetY);
  };
  this.unload = function () {
    p.unload();
    p = null;
    F.unload();
    F = null;
    K.unload();
    K = null;
    A.unload();
    A = null;
    y.unload();
    y = null;
    L.unload();
    O.unload();
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) R.unload(), (R = null);
    Z && screenfull.isEnabled && U.unload();
    for (var D = 0; D < NUM_PAYLINES; D++) z[D].unload();
    s_oInterface = null;
  };
  this._initPaylines = function (D) {
    var I = s_oSpriteLibrary.getSprite("bet_but");
    z = [];
    var H = 22.5,
      h = new CBetBut(-I.width / 4, H, "bet_but4", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 4);
    z[3] = h;
    H += 51;
    h = new CBetBut(-I.width / 4, H, "bet_but2", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 2);
    z[1] = h;
    H += 51;
    h = new CBetBut(-I.width / 4, H, "bet_but20", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 20);
    z[19] = h;
    H += 51;
    h = new CBetBut(-I.width / 4, H, "bet_but16", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 16);
    z[15] = h;
    H += 51;
    h = new CBetBut(-I.width / 4, H, "bet_but10", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 10);
    z[9] = h;
    H += 51;
    h = new CBetBut(-I.width / 4, H, "bet_but1", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 1);
    z[0] = h;
    H += 52;
    h = new CBetBut(-I.width / 4, H, "bet_but11", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 11);
    z[10] = h;
    H += 51;
    h = new CBetBut(-I.width / 4, H, "bet_but17", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 17);
    z[16] = h;
    H += 51;
    h = new CBetBut(-I.width / 4, H, "bet_but3", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 3);
    z[2] = h;
    h = new CBetBut(-I.width / 4, H + 51, "bet_but5", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 5);
    z[4] = h;
    H = 18.5;
    h = new CBetBut(WIDTH_MASK_SLOT - I.width / 4, H, "bet_but14", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 14);
    z[13] = h;
    H += 51;
    h = new CBetBut(WIDTH_MASK_SLOT - I.width / 4, H, "bet_but12", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 12);
    z[11] = h;
    H += 51;
    h = new CBetBut(WIDTH_MASK_SLOT - I.width / 4, H, "bet_but9", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 9);
    z[8] = h;
    H += 51;
    h = new CBetBut(WIDTH_MASK_SLOT - I.width / 4, H, "bet_but18", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 18);
    z[17] = h;
    H += 51;
    h = new CBetBut(WIDTH_MASK_SLOT - I.width / 4, H, "bet_but6", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 6);
    z[5] = h;
    H += 52;
    h = new CBetBut(WIDTH_MASK_SLOT - I.width / 4, H, "bet_but7", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 7);
    z[6] = h;
    H += 51;
    h = new CBetBut(WIDTH_MASK_SLOT - I.width / 4, H, "bet_but19", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 19);
    z[18] = h;
    H += 51;
    h = new CBetBut(WIDTH_MASK_SLOT - I.width / 4, H, "bet_but8", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 8);
    z[7] = h;
    H += 51;
    h = new CBetBut(WIDTH_MASK_SLOT - I.width / 4, H, "bet_but13", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 13);
    z[12] = h;
    h = new CBetBut(WIDTH_MASK_SLOT - I.width / 4, H + 51, "bet_but15", D);
    h.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 15);
    z[14] = h;
    I = {
      images: [
        s_oSpriteLibrary.getSprite("paylines-0"),
        s_oSpriteLibrary.getSprite("paylines-1"),
      ],
      frames: [
        [1, 1, 975, 49, 0, 0, 0],
        [978, 1, 975, 49, 0, 0, 0],
        [1, 52, 975, 49, 0, 0, 0],
        [978, 52, 975, 425, 0, 0, 0],
        [1, 479, 975, 424, 0, 0, 0],
        [978, 479, 977, 185, 0, 0, 0],
        [1, 905, 977, 185, 0, 0, 0],
        [980, 905, 977, 336, 0, 0, 0],
        [1, 1243, 977, 337, 0, 0, 0],
        [980, 1243, 975, 406, 0, 0, 0],
        [1, 1, 975, 406, 1, 0, 0],
        [978, 1, 977, 187, 1, 0, 0],
        [1, 409, 977, 186, 1, 0, 0],
        [980, 409, 977, 254, 1, 0, 0],
        [1, 665, 977, 254, 1, 0, 0],
        [980, 665, 975, 225, 1, 0, 0],
        [1, 921, 975, 188, 1, 0, 0],
        [978, 921, 977, 352, 1, 0, 0],
        [1, 1275, 977, 352, 1, 0, 0],
        [980, 1275, 975, 325, 1, 0, 0],
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
        payline19: 19,
      },
    };
    I = new createjs.SpriteSheet(I);
    H = [
      { x: -23, y: 277 },
      { x: -23, y: 73 },
      { x: -23, y: 431 },
      { x: -23, y: 22 },
      { x: -23, y: 107 },
      { x: 18, y: 89 },
      { x: 18, y: 277 },
      { x: 18, y: 92 },
      { x: 18, y: 124 },
      { x: -23, y: 97 },
      { x: -23, y: 100 },
      { x: 18, y: 73 },
      { x: 18, y: 294 },
      { x: 18, y: 22 },
      { x: 18, y: 276 },
      { x: -23, y: 58 },
      { x: -23, y: 306 },
      { x: 18, y: 98 },
      { x: 18, y: 102 },
      { x: -23, y: 124 },
    ];
    N = [];
    for (h = 0; h < NUM_PAYLINES; h++) {
      var Q = createSprite(I, "payline" + h);
      Q.x = H[h].x;
      Q.y = H[h].y;
      Q.visible = !1;
      D.addChild(Q);
      N[h] = Q;
    }
  };
  this.refreshMoney = function (D) {
    C.refreshText(formatEntries(D));
  };
  this.refreshBet = function (D) {
    A.setText(TEXT_COIN + " " + formatEntries(D));
  };
  this.refreshTotalBet = function (D) {
    P.refreshText(formatEntries(D));
  };
  this.refreshNumLines = function (D) {
    B = !0;
    K.setText(TEXT_LINES + " " + D);
    for (var I = 0; I < NUM_PAYLINES; I++)
      I < D ? (z[I].setOn(), (N[I].visible = !0)) : z[I].setOff();
    setTimeout(function () {
      for (var H = 0; H < NUM_PAYLINES; H++) N[H].visible = !1;
      B = !1;
    }, 1e3);
  };
  this.resetWin = function () {
    Y.refreshText(formatEntries(0));
  };
  this.refreshWinText = function (D) {
    Y.refreshText(formatEntries(D));
  };
  this.showLine = function (D) {
    0 < D && (N[D - 1].visible = !0);
  };
  this.hideLine = function (D) {
    0 < D && (N[D - 1].visible = !1);
  };
  this.hideAllLines = function () {
    for (var D = 0; D < NUM_PAYLINES; D++) N[D].visible = !1;
  };
  this.disableBetBut = function (D) {
    for (var I = 0; I < NUM_PAYLINES; I++) z[I].disable(D);
  };
  this.enableGuiButtons = function () {
    p.enable();
    y.enable();
    A.enable();
    K.enable();
    F.enable();
    s_bMobile || (document.onkeyup = this.onKeyUp);
  };
  this.enableSpin = function (D) {
    p.enable();
    D && y.enable();
    s_bMobile || (document.onkeyup = this.onKeyUp);
  };
  this.disableSpin = function (D) {
    p.disable();
    D && y.disable();
    s_bMobile || (document.onkeyup = null);
  };
  this.disableGuiButtons = function (D, I) {
    s_bMobile || (document.onkeyup = null);
    I
      ? (y.disable(), this.disableSpin(!0))
      : D
      ? (p.disable(), y.setText(TEXT_STOP_AUTO))
      : (y.disable(), p.setText(TEXT_SKIP));
    A.disable();
    K.disable();
    F.disable();
  };
  this.setAutoSpinState = function (D) {
    y.setText(D);
  };
  this.setSpinState = function (D) {
    p.setText(D);
  };
  this._onBetLineClicked = function (D) {
    B || (this.refreshNumLines(D), s_oGame.activateLines(D));
  };
  this._onSpin = function () {
    if (p.getText() === TEXT_SKIP)
      s_oGame.forceStopReel(), p.setText(TEXT_SPIN);
    else s_oGame.onSpin();
  };
  this._onAddLine = function () {
    s_oGame.addLine();
  };
  this._onInfo = function () {
    s_oGame.onInfoClicked();
  };
  this._onBet = function () {
    s_oGame.changeCoinBet();
  };
  this._onAutoSpin = function () {
    y.getText() === TEXT_STOP_AUTO
      ? (y.setText(TEXT_AUTO_SPIN), s_oGame.onAutoSpin(!1))
      : (y.setText(TEXT_STOP_AUTO), s_oGame.onAutoSpin(!0));
  };
  this.resetFullscreenBut = function () {
    Z && screenfull.isEnabled && U.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? J.call(window.document)
      : Z.call(window.document.documentElement);
    sizeHandler();
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this._onExit = function () {
    O.show(TEXT_ARE_SURE);
  };
  this._onExitYes = function () {
    s_oGame.onExit();
  };
  s_oInterface = this;
  this._init(a, f, c);
}
var s_oInterface = null;
function CPayTablePanel() {
  var a, f, c, d, g, e, k, l, b, q;
  this._init = function () {
    a = 0;
    d = [];
    q = new createjs.Container();
    q.visible = !1;
    g = q.on("click", function () {});
    s_oAttachSection.addChild(q);
    var n = new createjs.Container();
    q.addChild(n);
    var w = createBitmap(s_oSpriteLibrary.getSprite("paytable1"));
    n.addChild(w);
    this._createPayouts(n);
    d[0] = n;
    n = new createjs.Container();
    n.visible = !1;
    q.addChild(n);
    w = createBitmap(s_oSpriteLibrary.getSprite("paytable2"));
    n.addChild(w);
    d[1] = n;
    e = d[a];
    n = new createjs.Container();
    n.visible = !1;
    q.addChild(n);
    w = createBitmap(s_oSpriteLibrary.getSprite("paytable3"));
    n.addChild(w);
    w = new createjs.Text(TEXT_HELP_BONUS1, "28px " + FONT_GAME_1, "#fff");
    w.textAlign = "center";
    w.x = 976;
    w.y = 250;
    w.lineWidth = 400;
    n.addChild(w);
    w = new createjs.Text(TEXT_HELP_BONUS2, "40px " + FONT_GAME_1, "#fff");
    w.textAlign = "center";
    w.x = 976;
    w.y = 400;
    w.lineWidth = 400;
    n.addChild(w);
    d[2] = n;
    n = new createjs.Container();
    n.visible = !1;
    q.addChild(n);
    w = createBitmap(s_oSpriteLibrary.getSprite("paytable4"));
    n.addChild(w);
    for (var t = 265, v = 0; 3 > v; v++)
      (w = new createjs.Text(
        "X" + (v + 3) + " -> " + NUM_FREESPIN[v] + " " + TEXT_FREESPINS,
        "24px " + FONT_GAME_1,
        "#ffff00"
      )),
        (w.textAlign = "left"),
        (w.x = CANVAS_WIDTH / 2 + 20),
        (w.y = t),
        (w.textBaseline = "alphabetic"),
        n.addChild(w),
        (t += 40);
    w = new createjs.Text(TEXT_HELP_FREESPIN, "36px " + FONT_GAME_1, "#fff");
    w.textAlign = "center";
    w.x = CANVAS_WIDTH / 2;
    w.y = 410;
    w.lineWidth = 420;
    n.addChild(w);
    d[3] = n;
    e = d[a];
    l = new CGfxButton(
      CANVAS_WIDTH / 2 + 540,
      CANVAS_HEIGHT / 2,
      s_oSpriteLibrary.getSprite("but_arrow_next"),
      q
    );
    l.addEventListener(ON_MOUSE_UP, this._onNext, this);
    b = new CGfxButton(
      CANVAS_WIDTH / 2 - 540,
      CANVAS_HEIGHT / 2,
      s_oSpriteLibrary.getSprite("but_arrow_prev"),
      q
    );
    b.addEventListener(ON_MOUSE_UP, this._onPrev, this);
    n = s_oSpriteLibrary.getSprite("but_exit");
    k = new CGfxButton(1250, 120, n, q);
    k.addEventListener(ON_MOUSE_UP, this._onExit, this);
  };
  this.unload = function () {
    q.off("click", g);
    k.unload();
    l.unload();
    b.unload();
    s_oAttachSection.removeChild(q);
    for (var n = 0; n < f.length; n++) q.removeChild(f[n]);
    for (n = 0; n < c.length; n++) q.removeChild(c[n]);
  };
  this._createPayouts = function (n) {
    f = [];
    c = [];
    for (
      var w = [
          { x: 980, y: 448 },
          { x: 760, y: 448 },
          { x: 540, y: 448 },
          { x: 1090, y: 338 },
          { x: 870, y: 338 },
          { x: 650, y: 338 },
          { x: 430, y: 338 },
        ],
        t = 0,
        v = 0;
      v < PAYTABLE_VALUES.length;
      v++
    ) {
      var x = PAYTABLE_VALUES[v];
      do {
        var B = x.indexOf(0);
        -1 !== B && x.splice(B, 1);
      } while (-1 !== B);
      B = x.length;
      if (0 !== B) {
        var z = 20;
        4 === B && (z = 16);
        var N = w[t].y;
        f[v] = [];
        c[v] = [];
        for (var p = 0; p < B; p++) {
          var F = new createjs.Text(
            "X" + (5 - p),
            "20px " + FONT_GAME_1,
            "#ffffff"
          );
          F.textAlign = "center";
          F.x = w[t].x;
          F.y = N;
          F.textBaseline = "alphabetic";
          n.addChild(F);
          f[v][p] = F;
          var K = new createjs.Text(
            x[B - p - 1],
            "20px " + FONT_GAME_1,
            "#ffff00"
          );
          K.textAlign = "center";
          K.x = F.x + 35;
          K.y = F.y;
          K.textBaseline = "alphabetic";
          n.addChild(K);
          c[v][p] = K;
          N += z;
        }
        t++;
      }
    }
  };
  this._onNext = function () {
    a === d.length - 1 ? (a = 0) : a++;
    e.visible = !1;
    d[a].visible = !0;
    e = d[a];
  };
  this._onPrev = function () {
    0 === a ? (a = d.length - 1) : a--;
    e.visible = !1;
    d[a].visible = !0;
    e = d[a];
  };
  this.refreshButtonPos = function (n, w) {};
  this.show = function () {
    a = 0;
    e.visible = !1;
    d[a].visible = !0;
    e = d[a];
    q.visible = !0;
  };
  this.hide = function () {
    q.visible = !1;
  };
  this.resetHighlightCombo = function () {
    for (var n = 0; n < f.length; n++)
      if (void 0 !== f[n])
        for (var w = 0; w < f[n].length; w++)
          (f[n][w].color = "#ffffff"),
            (c[n][w].color = "#ffff00"),
            createjs.Tween.removeTweens(c[n][w]),
            (c[n][w].alpha = 1);
  };
  this.highlightCombo = function (n, w) {
    c[n][NUM_REELS - w].color = "#ff9000";
    this.tweenAlpha(c[n][NUM_REELS - w], 0);
  };
  this.tweenAlpha = function (n, w) {
    var t = this;
    createjs.Tween.get(n)
      .to({ alpha: w }, 200)
      .call(function () {
        1 === w ? t.tweenAlpha(n, 0) : t.tweenAlpha(n, 1);
      });
  };
  this._onExit = function () {
    s_oGame.hidePayTable();
  };
  this.isVisible = function () {
    return q.visible;
  };
  this._init();
}
function CStaticSymbolCell(a, f, c, d) {
  var g,
    e,
    k,
    l,
    b = -1,
    q,
    n,
    w,
    t,
    v,
    x,
    B;
  this._init = function (N, p, F, K) {
    k = F;
    l = K;
    g = 0;
    B = new createjs.Container();
    B.visible = !1;
    s_oAttachSection.addChild(B);
    x = new createjs.Container();
    x.visible = !1;
    x.x = F;
    x.y = K;
    B.addChild(x);
    x.scaleX = x.scaleY = 0.5 * REEL_SCALE;
    q = [];
    for (N = 0; N < NUM_SYMBOLS; N++)
      (p = createSprite(
        s_aSymbolAnims[N],
        "static",
        0,
        0,
        SYMBOL_ANIM_WIDTH,
        SYMBOL_ANIM_HEIGHT
      )),
        p.stop(),
        p.on("animationend", this._onAnimEnded, null, !1),
        x.addChild(p),
        (q[N] = p),
        (q[N].visible = !1);
    N = s_oSpriteLibrary.getSprite("amount_bonus_win");
    v = createBitmap(N);
    v.regX = N.width / 2;
    v.regY = N.height / 2;
    v.x = SYMBOL_ANIM_WIDTH / 2;
    v.y = SYMBOL_ANIM_HEIGHT;
    x.addChild(v);
    t = new createjs.Text("", "40px " + FONT_GAME_1, "#000");
    t.textAlign = "center";
    t.textBaseline = "alphabetic";
    t.x = SYMBOL_ANIM_WIDTH / 2 + 2;
    t.y = SYMBOL_ANIM_HEIGHT + 17;
    x.addChild(t);
    w = new createjs.Text("", "40px " + FONT_GAME_1, "#fff");
    w.textAlign = "center";
    w.textBaseline = "alphabetic";
    w.x = SYMBOL_ANIM_WIDTH / 2;
    w.y = SYMBOL_ANIM_HEIGHT + 15;
    x.addChild(w);
    N = {
      framerate: 30,
      images: [s_oSpriteLibrary.getSprite("win_frame_anim")],
      frames: { width: SYMBOL_WIDTH, height: SYMBOL_HEIGHT },
      animations: { static: 0, anim: [1, 19] },
    };
    N = new createjs.SpriteSheet(N);
    n = createSprite(N, "static", 0, 0, SYMBOL_WIDTH, SYMBOL_HEIGHT);
    n.x = F;
    n.y = K;
    B.addChild(n);
  };
  this.unload = function () {
    s_oAttachSection.removeChild(B);
  };
  this.hide = function () {
    -1 < b &&
      (stopSound("symbol" + b),
      n.gotoAndStop("static"),
      (n.visible = !1),
      (v.visible = !1),
      (w.text = ""),
      (t.text = ""),
      q[b].gotoAndPlay("static"),
      (q[b].visible = !1),
      (B.visible = !1),
      (b = -1));
  };
  this.show = function (N, p, F, K, A) {
    g = 0;
    e = A;
    for (A = 0; A < NUM_SYMBOLS; A++) q[A].visible = A + 1 === N ? !0 : !1;
    v.visible = !1;
    0 < p && ((w.text = formatEntries(p)), (t.text = w.text), (v.visible = !0));
    q[N - 1].gotoAndPlay("anim");
    b = N - 1;
    q[N - 1].spriteSheet.getNumFrames();
    x.regX = K.x;
    x.regY = K.y;
    x.x = k + F.x;
    x.y = l + F.y;
    x.scaleX = x.scaleY = 0.5 * REEL_SCALE;
    x.visible = !0;
    x.alpha = 1;
    B.visible = !0;
    createjs.Tween.get(x).to(
      { scaleX: REEL_SCALE, scaleY: REEL_SCALE },
      1e3,
      createjs.Ease.cubicOut
    );
    playSound("symbol" + b, 1, !1);
  };
  this.showWinFrame = function () {
    n.gotoAndPlay("anim");
    n.visible = !0;
    B.visible = !0;
  };
  this.hideWinFrame = function () {
    createjs.Tween.removeTweens(x);
    n.gotoAndPlay("static");
    n.visible = !1;
    B.visible = !1;
  };
  this._onAnimEnded = function () {
    g++;
    g === e &&
      -1 < b &&
      (q[b].stop(),
      createjs.Tween.get(x)
        .to(
          { scaleX: 0.52, scaleY: 0.52, alpha: 0 },
          500,
          createjs.Ease.cubicOut
        )
        .call(function () {
          z.stopAnim();
          s_oGame.showWin();
        }));
  };
  this.stopAnim = function () {
    -1 !== b &&
      (stopSound("symbol" + b),
      (q[b].visible = !1),
      (x.visible = !1),
      n.gotoAndStop("static"),
      (n.visible = !1));
  };
  var z = this;
  this._init(a, f, c, d);
}
function CTweenController() {
  this.tweenValue = function (a, f, c) {
    return a + c * (f - a);
  };
  this.easeLinear = function (a, f, c, d) {
    return (c * a) / d + f;
  };
  this.easeInCubic = function (a, f, c, d) {
    d = (a /= d) * a * a;
    return f + c * d;
  };
  this.easeBackInQuart = function (a, f, c, d) {
    d = (a /= d) * a;
    return f + c * (2 * d * d + 2 * d * a + -3 * d);
  };
  this.easeInBack = function (a, f, c, d) {
    return c * (a /= d) * a * (2.70158 * a - 1.70158) + f;
  };
  this.easeOutCubic = function (a, f, c, d) {
    return c * ((a = a / d - 1) * a * a + 1) + f;
  };
  this.getTrajectoryPoint = function (a, f) {
    var c = new createjs.Point(),
      d = (1 - a) * (1 - a),
      g = a * a;
    c.x = d * f.start.x + 2 * (1 - a) * a * f.traj.x + g * f.end.x;
    c.y = d * f.start.y + 2 * (1 - a) * a * f.traj.y + g * f.end.y;
    return c;
  };
}
function CMsgBox() {
  var a, f, c, d, g, e, k;
  this._init = function () {
    k = new createjs.Container();
    k.visible = !1;
    s_oStage.addChild(k);
    f = new createjs.Shape();
    f.graphics
      .beginFill("rgba(0,0,0,0.7)")
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    a = f.on("click", function () {});
    k.addChild(f);
    var l = s_oSpriteLibrary.getSprite("msg_box");
    c = createBitmap(l);
    c.regX = l.width / 2;
    c.regY = l.height / 2;
    c.x = CANVAS_WIDTH / 2;
    c.y = CANVAS_HEIGHT / 2;
    k.addChild(c);
    g = new createjs.Text("", "21px " + FONT_GAME_1, "#000");
    g.x = CANVAS_WIDTH / 2 + 2;
    g.y = CANVAS_HEIGHT / 2 - 87;
    g.lineWidth = 300;
    g.textAlign = "center";
    k.addChild(g);
    d = new createjs.Text("", "21px " + FONT_GAME_1, "#ffffff");
    d.x = CANVAS_WIDTH / 2;
    d.y = CANVAS_HEIGHT / 2 - 85;
    d.textAlign = "center";
    d.lineWidth = 300;
    k.addChild(d);
    e = new CGfxButton(
      CANVAS_WIDTH / 2 + 218,
      CANVAS_HEIGHT / 2 - 115,
      s_oSpriteLibrary.getSprite("but_exit"),
      k
    );
    e.addEventListener(ON_MOUSE_UP, this._onExit, this);
  };
  this.unload = function () {
    f.off("click", a);
    e.unload();
  };
  this.show = function (l) {
    g.text = l;
    d.text = l;
    k.visible = !0;
  };
  this.hide = function () {
    k.visible = !1;
  };
  this._onExit = function () {
    this.hide();
  };
  this._init();
  return this;
}
function CBonusPanel() {
  var a,
    f,
    c,
    d = !1,
    g,
    e,
    k,
    l,
    b,
    q,
    n,
    w,
    t,
    v,
    x,
    B,
    z,
    N,
    p,
    F,
    K,
    A,
    y,
    L,
    C,
    P,
    Y,
    R,
    U,
    O,
    Z,
    J,
    D,
    I,
    H,
    h,
    Q,
    V,
    m = null,
    u,
    r,
    M,
    T,
    E;
  this._init = function () {
    d = !0;
    v = 1;
    p = [176, 476, 776];
    F = [
      { x: 640, y: 526 },
      { x: 776, y: 526 },
      { x: 896, y: 526 },
    ];
    K = [
      { x: 500, y: 1070 },
      { x: 776, y: 1070 },
      { x: 1036, y: 1070 },
    ];
    y = [
      { x: 10, y: 0 },
      { x: -20, y: 0 },
      { x: 10, y: -10 },
      { x: 0, y: 20 },
      { x: 10, y: -10 },
      { x: -10, y: 0 },
      { x: 10, y: 0 },
      { x: -20, y: 0 },
      { x: 10, y: -10 },
      { x: 0, y: 20 },
      { x: 10, y: -10 },
      { x: -10, y: 0 },
    ];
    E.removeAllChildren();
    E.visible = !1;
    var G = s_oSpriteLibrary.getSprite("bg_bonus");
    U = createBitmap(G);
    U.regX = G.width / 2;
    U.regY = G.height;
    U.scaleX = U.scaleY = STARTING_STANDS_SCALE_BONUS;
    U.x = CANVAS_WIDTH / 2;
    U.y = 521;
    E.addChild(U);
    Y = new CFieldBonus(0, 516, E);
    R = new CFieldEndZoneBonus(0, 516, E);
    G = s_oSpriteLibrary.getSprite("post");
    O = createBitmap(G);
    O.regX = G.width / 2;
    O.regY = G.height;
    O.x = CANVAS_WIDTH - 450;
    O.y = 518;
    O.scaleX = O.scaleY = 0.2;
    E.addChild(O);
    A = [];
    for (G = 0; 3 > G; G++) {
      var S = new CBonusOpponent(G, F[G], K[G], E);
      S.addEventListener(ON_OPPONENT_HIDE, this._onOpponentHide, this);
      S.addEventListener(ON_OPPONENT_TACKLE, this._onOpponentTackle, this);
      A.push(S);
    }
    I = new CBonusPlayer(p[1], 370, E);
    I.addEventListener(ON_END_PLAYER_MOVE, this._onEndPlayerMove, this);
    I.addEventListener(ON_BONUS_END, this._onBonusEnd, this);
    c = CANVAS_HEIGHT - 100;
    r = new createjs.Container();
    r.x = 0;
    r.y = c;
    E.addChild(r);
    Z = new CGfxButton(
      CANVAS_WIDTH / 2 - 350,
      50,
      s_oSpriteLibrary.getSprite("but_left"),
      r
    );
    Z.addEventListener(ON_MOUSE_UP, this._onLeft, this);
    J = new CGfxButton(
      CANVAS_WIDTH / 2,
      50,
      s_oSpriteLibrary.getSprite("but_center"),
      r
    );
    J.addEventListener(ON_MOUSE_UP, this._onCenter, this);
    D = new CGfxButton(
      CANVAS_WIDTH / 2 + 350,
      50,
      s_oSpriteLibrary.getSprite("but_right"),
      r
    );
    D.addEventListener(ON_MOUSE_UP, this._onRight, this);
    G = s_oSpriteLibrary.getSprite("amount_bonus_win");
    a = 10;
    f = 3;
    T = new createjs.Container();
    T.x = a;
    T.y = f;
    E.addChild(T);
    S = createBitmap(G);
    T.addChild(S);
    M = new createjs.Text(formatEntries(0), "40px " + FONT_GAME_1, "#fff");
    M.textBaseline = "alphabetic";
    M.textAlign = "center";
    M.x = G.width / 2;
    M.y = 54;
    M.shadow = new createjs.Shadow("#000", 1, 1, 1);
    T.addChild(M);
    u = new createjs.Shape();
    u.graphics
      .beginFill("rgba(0,0,0,0.01)")
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    C = u.on("click", function () {});
    E.addChild(u);
    this._startBonus();
  };
  this._loadAllResources = function () {
    E = new createjs.Container();
    s_oAttachSection.addChild(E);
    var G = s_oSpriteLibrary.getSprite("bg_loading_bonus");
    H = createBitmap(G);
    E.addChild(H);
    G = s_oSpriteLibrary.getSprite("progress_bar");
    Q = createBitmap(G);
    Q.x = CANVAS_WIDTH / 2 - G.width / 2;
    Q.y = CANVAS_HEIGHT - 91;
    E.addChild(Q);
    k = G.width;
    l = G.height;
    L = new createjs.Shape();
    L.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(Q.x, Q.y, 1, l);
    E.addChild(L);
    Q.mask = L;
    h = new createjs.Text("", "15px " + FONT_GAME_1, "#fff");
    h.x = CANVAS_WIDTH / 2;
    h.y = CANVAS_HEIGHT - 41;
    h.shadow = new createjs.Shadow("#000", 2, 2, 2);
    h.textBaseline = "alphabetic";
    h.textAlign = "center";
    E.addChild(h);
    s_oSpriteLibrary.init(
      this._onResourceBonusLoaded,
      this._onAllImagesLoaded,
      this
    );
    s_oSpriteLibrary.addSprite("bg_bonus", "./sprites/bonus/bg_bonus.jpg");
    s_oSpriteLibrary.addSprite("but_center", "./sprites/bonus/but_center.png");
    s_oSpriteLibrary.addSprite("but_left", "./sprites/bonus/but_left.png");
    s_oSpriteLibrary.addSprite("but_right", "./sprites/bonus/but_right.png");
    s_oSpriteLibrary.addSprite("post", "./sprites/bonus/post.png");
    for (G = 0; 3 > G; G++)
      s_oSpriteLibrary.addSprite(
        "field_loop-" + G,
        "./sprites/bonus/field_loop-" + G + ".png"
      );
    for (G = 0; 4 > G; G++)
      s_oSpriteLibrary.addSprite(
        "end_zone-" + G,
        "./sprites/bonus/end_zone-" + G + ".png"
      );
    s_oSpriteLibrary.addSprite(
      "player_falling",
      "./sprites/bonus/player/player_falling.png"
    );
    for (G = 0; 2 > G; G++)
      s_oSpriteLibrary.addSprite(
        "player_running-" + G,
        "./sprites/bonus/player/player_running-" + G + ".png"
      );
    for (G = 0; 2 > G; G++)
      s_oSpriteLibrary.addSprite(
        "player_touchdown-" + G,
        "./sprites/bonus/player/player_touchdown-" + G + ".png"
      );
    for (G = 0; 3 > G; G++)
      s_oSpriteLibrary.addSprite(
        "enemy_running-" + G,
        "./sprites/bonus/enemy/enemy_running-" + G + ".png"
      );
    for (G = 0; 2 > G; G++)
      s_oSpriteLibrary.addSprite(
        "enemy_tackle-" + G,
        "./sprites/bonus/enemy/enemy_tackle-" + G + ".png"
      );
    n = 0;
    w = s_oSpriteLibrary.getNumSprites();
    0 === w ? this._startBonus() : s_oSpriteLibrary.loadSprites();
  };
  this._onResourceBonusLoaded = function () {
    n++;
    var G = Math.floor((n / w) * 100);
    h.text = G + "%";
    L.graphics.clear();
    G = Math.floor((G * k) / 100);
    L.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(Q.x, Q.y, G, l);
    n === w && this._init();
  };
  this.refreshButtonPos = function () {
    void 0 !== r && (r.y = c - s_iOffsetY);
    void 0 !== T && ((T.x = a + s_iOffsetX), (T.y = f + s_iOffsetY));
  };
  this.unload = function () {
    u.off("click", C);
    Z.unload();
    J.unload();
    D.unload();
  };
  this._onAllImagesLoaded = function () {};
  this.reset = function () {
    V.unload();
    I.reset();
    M.text = formatEntries(0);
    null !== m && (m.unload(), (m = null));
    U.scaleX = U.scaleY = STARTING_STANDS_SCALE_BONUS;
    U.x = CANVAS_WIDTH / 2;
    U.y = 521;
    O.x = CANVAS_WIDTH - 450;
    O.y = 518;
    O.scaleX = O.scaleY = 0.2;
    R.reset();
  };
  this.show = function (G, S) {
    N = G;
    e = S;
    t = (1 - STARTING_STANDS_SCALE_BONUS) / N.length;
    d ? this._startBonus() : this._loadAllResources();
    P = E.on("click", function () {});
  };
  this.hide = function () {
    stopSound("soundtrack_bonus");
    stopSound("crowd_idle");
    E.off("click", P);
    E.visible = !1;
    this.reset();
    s_oGame.exitFromBonus();
  };
  this._startBonus = function () {
    playSound("soundtrack_bonus", 1, !0);
    playSound("crowd_idle", 1, !0);
    q = 0;
    this._enableAllButtons();
    I.show();
    Y.show();
    E.visible = !0;
    J.pulseAnimation();
    Z.pulseAnimation();
    D.pulseAnimation();
    this.refreshButtonPos();
  };
  this._enableAllButtons = function () {
    u.visible = !1;
    new createjs.Tween.get(r).to({ alpha: 1 }, 500);
  };
  this._disableAllButtons = function () {
    u.visible = !0;
    new createjs.Tween.get(r).to({ alpha: 0 }, 500);
  };
  this.refreshScoreAmount = function () {
    M.text = formatEntries(q);
  };
  this._onLeft = function () {
    s_oBonusPanel._disableAllButtons();
    var G = 0 === v ? 0 : 1 === v ? 1500 : 3e3;
    v = 0;
    I.move(p[v], G);
  };
  this._onRight = function () {
    s_oBonusPanel._disableAllButtons();
    var G = 0 === v ? 3e3 : 1 === v ? 1500 : 0;
    v = 2;
    I.move(p[v], G);
  };
  this._onCenter = function () {
    s_oBonusPanel._disableAllButtons();
    var G = 0 === v ? 1500 : 1 === v ? 0 : 1500;
    v = 1;
    I.move(p[v], G);
  };
  this._onEndPlayerMove = function () {
    x = 0;
    if (0 === N.length) {
      if (((g = !0), !e)) {
        A[v].show(0);
        for (var G = [], S = 0; 3 > S; S++) S !== v && G.push(S);
        var X = Math.floor(Math.random() * G.length);
        A[G[X]].show(Math.floor(500 * Math.random()));
        this._scaleStands();
      }
    } else if (((g = !1), (b = N.shift()), (q += b), 0 === N.length && e))
      R.show(),
        (S = U.scaleX + t),
        new createjs.Tween.get(U).to({ scaleX: S, scaleY: S }, 1200),
        (S = O.scaleX + t),
        new createjs.Tween.get(O).to(
          { scaleX: S, scaleY: S, x: O.x + 500, y: O.y + 60 },
          1e3
        ),
        (m = new CScoreText(formatEntries(b), CANVAS_WIDTH / 2, 252, E)),
        playSound("bonus_mult", 1, !1),
        this.refreshScoreAmount(),
        setTimeout(function () {
          I.changeAnim(BONUS_ANIM_TOUCHDOWN);
          playSound("crowd_touchdown", 1, !1);
        }, 500);
    else {
      for (S = G = 0; 3 > S; S++)
        S !== v &&
          (A[S].show(G), (X = Math.floor(1e3 * Math.random())), (G += X));
      this._scaleStands();
    }
  };
  this._scaleStands = function () {
    var G = U.scaleX + t;
    new createjs.Tween.get(U).to(
      { scaleX: G, scaleY: G },
      TIME_OPPONENT_RUN,
      createjs.Ease.cubicIn
    );
    G = O.scaleX + t;
    new createjs.Tween.get(O).to(
      { scaleX: G, scaleY: G, x: O.x + 750 * t },
      TIME_OPPONENT_RUN,
      createjs.Ease.cubicIn
    );
  };
  this._onBonusEnd = function () {
    setTimeout(function () {
      Y.stop();
      V = new CBonusResultPanel(q, E);
      stopSound("soundtrack_bonus");
      stopSound("crowd_idle");
      e ? playSound("win_bonus", 1, !1) : playSound("game_over", 1, !1);
    }, 1e3);
  };
  this._onOpponentHide = function () {
    x++;
    2 === x &&
      !1 === g &&
      ((m = new CScoreText(formatEntries(b), CANVAS_WIDTH / 2, 252, E)),
      playSound("bonus_mult", 1, !1),
      this.refreshScoreAmount(),
      I.tweenJump(),
      this._enableAllButtons());
  };
  this._onOpponentTackle = function (G) {
    if (g && v === G) {
      B = 0;
      var S = this;
      z = setInterval(function () {
        S.tremble();
      }, 20);
      I.changeAnim(BONUS_ANIM_FALL);
      playSound("enemy_tackle", 1, !1);
    }
  };
  this.tremble = function () {
    var G = y[B];
    E.x += G.x;
    E.y += G.y;
    B++;
    B === y.length && ((B = 0), clearInterval(z));
  };
  this.update = function () {};
  s_oBonusPanel = this;
}
var s_oBonusPanel = null;
function CBonusResultPanel(a, f) {
  var c;
  this._init = function (g) {
    c = new createjs.Container();
    c.alpha = 0;
    d.addChild(c);
    var e = s_oSpriteLibrary.getSprite("msg_box"),
      k = createBitmap(e);
    k.regX = e.width / 2;
    k.regY = e.height / 2;
    k.x = CANVAS_WIDTH / 2;
    k.y = CANVAS_HEIGHT / 2;
    c.addChild(k);
    e = new createjs.Text(TEXT_CONGRATS, "32px " + FONT_GAME_1, "#fff");
    e.textAlign = "center";
    e.x = CANVAS_WIDTH / 2;
    e.y = CANVAS_HEIGHT / 2 - 100;
    c.addChild(e);
    g = new createjs.Text(
      TEXT_YOU_WIN + "\n" + formatEntries(g),
      "35px " + FONT_GAME_1,
      "#fff"
    );
    g.x = CANVAS_WIDTH / 2;
    g.y = CANVAS_HEIGHT / 2 + 24;
    g.textAlign = "center";
    g.lineHeight = 35;
    g.textBaseline = "middle";
    c.addChild(g);
    createjs.Tween.get(c)
      .to({ alpha: 1 }, 1e3, createjs.Ease.cubicOut)
      .call(function () {
        setTimeout(function () {
          s_oBonusPanel.hide();
        }, 3e3);
      });
  };
  this.unload = function () {
    d.removeChild(c);
  };
  var d = f;
  this._init(a);
}
function CBonusPlayer(a, f, c) {
  var d, g, e, k, l, b, q, n;
  this._init = function (t, v) {
    d = t;
    g = v;
    e = [];
    k = [];
    n = new createjs.Container();
    n.visible = !1;
    n.x = t;
    n.y = v;
    w.addChild(n);
    var x = {
      images: [
        s_oSpriteLibrary.getSprite("player_running-0"),
        s_oSpriteLibrary.getSprite("player_running-1"),
      ],
      framerate: 30,
      frames: [
        [1, 1, 404, 403, 0, -74, -45],
        [407, 1, 413, 416, 0, -68, -32],
        [822, 1, 421, 429, 0, -66, -19],
        [1245, 1, 420, 440, 0, -64, -8],
        [1, 443, 427, 444, 0, -58, -4],
        [430, 443, 438, 440, 0, -53, -8],
        [870, 443, 447, 432, 0, -46, -16],
        [1319, 443, 454, 416, 0, -35, -32],
        [1, 889, 479, 404, 0, -22, -44],
        [482, 889, 507, 407, 0, -22, -41],
        [991, 889, 523, 421, 0, -39, -27],
        [1516, 889, 506, 433, 0, -65, -15],
        [1, 1324, 510, 440, 0, -74, -8],
        [513, 1324, 503, 440, 0, -75, -8],
        [1018, 1324, 475, 436, 0, -75, -12],
        [1495, 1324, 443, 426, 0, -75, -22],
        [1, 1, 421, 410, 1, -78, -38],
        [424, 1, 401, 396, 1, -83, -52],
      ],
      animations: { start: 0, anim: [0, 17] },
    };
    x = new createjs.SpriteSheet(x);
    l = createSprite(x, "start");
    l.visible = !1;
    n.addChild(l);
    x = {
      images: [s_oSpriteLibrary.getSprite("player_falling")],
      framerate: 30,
      frames: [
        [1, 1, 404, 403, 0, -74, -45],
        [407, 1, 404, 403, 0, -74, -45],
        [813, 1, 424, 403, 0, -63, -45],
        [1239, 1, 449, 400, 0, -50, -48],
        [1, 406, 477, 377, 0, -36, -71],
        [480, 406, 550, 309, 0, -16, -139],
        [1032, 406, 550, 309, 0, -16, -139],
        [1, 785, 582, 248, 0, -4, -200],
        [585, 785, 596, 88, 0, -7, -360],
      ],
      animations: { start: 0, anim: [0, 8, "hide"], hide: 9 },
    };
    x = new createjs.SpriteSheet(x);
    b = createSprite(x, "start");
    b.on("animationend", this._onEndFall, this);
    b.visible = !1;
    n.addChild(b);
    x = {
      images: [
        s_oSpriteLibrary.getSprite("player_touchdown-0"),
        s_oSpriteLibrary.getSprite("player_touchdown-1"),
      ],
      framerate: 30,
      frames: [
        [1, 1, 401, 396, 0, -83, -52],
        [404, 1, 385, 386, 0, -95, -62],
        [791, 1, 361, 370, 0, -113, -78],
        [1154, 1, 343, 357, 0, -128, -91],
        [1499, 1, 322, 362, 0, -135, -86],
        [1, 399, 304, 370, 0, -138, -78],
        [307, 399, 296, 377, 0, -142, -71],
        [605, 399, 289, 384, 0, -145, -64],
        [896, 399, 281, 383, 0, -149, -65],
        [1179, 399, 277, 383, 0, -150, -65],
        [1458, 399, 273, 381, 0, -152, -67],
        [1733, 399, 269, 378, 0, -157, -70],
        [1, 785, 260, 377, 0, -172, -71],
        [263, 785, 241, 375, 0, -192, -73],
        [506, 785, 218, 374, 0, -202, -74],
        [726, 785, 197, 376, 0, -204, -72],
        [925, 785, 215, 378, 0, -201, -70],
        [1142, 785, 223, 380, 0, -194, -68],
        [1367, 785, 230, 381, 0, -184, -67],
        [1599, 785, 238, 383, 0, -182, -65],
        [1, 1170, 261, 383, 0, -183, -65],
        [264, 1170, 279, 383, 0, -185, -65],
        [545, 1170, 286, 382, 0, -188, -66],
        [833, 1170, 294, 379, 0, -195, -69],
        [1129, 1170, 291, 376, 0, -201, -72],
        [1422, 1170, 277, 373, 0, -209, -75],
        [1701, 1170, 259, 368, 0, -215, -80],
        [1, 1555, 241, 363, 0, -218, -84],
        [244, 1555, 236, 353, 0, -210, -86],
        [482, 1555, 251, 345, 0, -189, -89],
        [735, 1555, 283, 335, 0, -154, -92],
        [1020, 1555, 307, 326, 0, -131, -94],
        [1329, 1555, 301, 315, 0, -137, -97],
        [1632, 1555, 287, 318, 0, -149, -89],
        [1, 1, 290, 284, 1, -147, -120],
        [293, 1, 283, 259, 1, -157, -142],
        [578, 1, 259, 234, 1, -188, -166],
        [1, 287, 245, 211, 1, -212, -185],
        [248, 287, 237, 195, 1, -229, -199],
        [487, 287, 229, 178, 1, -242, -210],
        [718, 287, 224, 161, 1, -246, -221],
        [1, 500, 231, 154, 1, -253, -229],
        [234, 500, 241, 145, 1, -260, -237],
        [477, 500, 241, 153, 1, -264, -228],
        [720, 500, 224, 154, 1, -269, -226],
        [1, 656, 190, 156, 1, -277, -224],
        [193, 656, 184, 155, 1, -266, -224],
        [379, 656, 184, 155, 1, -268, -223],
        [565, 656, 181, 157, 1, -275, -221],
        [748, 656, 183, 161, 1, -275, -216],
        [1, 819, 189, 169, 1, -274, -207],
        [192, 819, 192, 180, 1, -273, -196],
        [386, 819, 196, 188, 1, -273, -188],
        [584, 819, 202, 193, 1, -272, -183],
        [788, 819, 203, 199, 1, -272, -177],
        [1, 1020, 207, 204, 1, -271, -172],
        [210, 1020, 208, 207, 1, -270, -169],
        [420, 1020, 207, 206, 1, -271, -170],
        [629, 1020, 219, 202, 1, -269, -174],
        [1, 1229, 240, 193, 1, -269, -183],
        [243, 1229, 259, 181, 1, -268, -195],
        [504, 1229, 274, 168, 1, -268, -208],
        [1, 1424, 294, 145, 1, -268, -231],
        [297, 1424, 315, 134, 1, -267, -242],
        [614, 1424, 328, 136, 1, -267, -240],
        [1, 1571, 336, 136, 1, -265, -240],
        [339, 1571, 335, 128, 1, -265, -248],
        [676, 1571, 328, 114, 1, -265, -262],
      ],
      animations: { start: 0, anim: [0, 67, "stop"], stop: 67 },
    };
    x = new createjs.SpriteSheet(x);
    q = createSprite(x, "start");
    q.on("animationend", this._onEndTouchdown, this);
    q.visible = !1;
    n.addChild(q);
  };
  this.addEventListener = function (t, v, x) {
    e[t] = v;
    k[t] = x;
  };
  this.show = function () {
    l.visible = !0;
    n.visible = !0;
    l.gotoAndPlay("anim");
  };
  this.hide = function () {
    n.visible = !1;
  };
  this.reset = function () {
    n.alpha = 1;
    n.x = d;
    n.y = g;
    l.visible = !1;
    b.visible = !1;
    q.visible = !1;
  };
  this.changeAnim = function (t) {
    switch (t) {
      case BONUS_ANIM_FALL:
        l.visible = !1;
        b.visible = !0;
        q.visible = !1;
        b.gotoAndPlay("anim");
        break;
      case BONUS_ANIM_TOUCHDOWN:
        (l.visible = !1),
          (b.visible = !1),
          (q.visible = !0),
          q.gotoAndPlay("anim");
    }
  };
  this._onEndFall = function (t) {
    "anim" === t.currentTarget.currentAnimation &&
      (this.hide(), e[ON_BONUS_END] && e[ON_BONUS_END].call(k[ON_BONUS_END]));
  };
  this._onEndTouchdown = function (t) {
    "anim" === t.currentTarget.currentAnimation &&
      (new createjs.Tween.get(n).to({ alpha: 0 }, 500),
      e[ON_BONUS_END] && e[ON_BONUS_END].call(k[ON_BONUS_END]));
  };
  this.tweenJump = function () {
    new createjs.Tween.get(n).to({ y: g - 50 }, 50).to({ y: g }, 50);
  };
  this.move = function (t, v) {
    new createjs.Tween.get(n)
      .to({ x: t }, v, createjs.Ease.cubicOut)
      .call(function () {
        e[ON_END_PLAYER_MOVE] &&
          e[ON_END_PLAYER_MOVE].call(k[ON_END_PLAYER_MOVE]);
      });
  };
  var w = c;
  this._init(a, f);
}
function CBonusOpponent(a, f, c, d) {
  var g,
    e,
    k,
    l,
    b,
    q,
    n,
    w = this;
  this._init = function (v, x) {
    g = [];
    e = [];
    k = v;
    l = x;
    n = new createjs.Container();
    n.visible = !1;
    n.x = v.x;
    n.y = v.y;
    n.scaleX = n.scaleY = 0.1;
    t.addChild(n);
    var B = {
      images: [
        s_oSpriteLibrary.getSprite("enemy_running-0"),
        s_oSpriteLibrary.getSprite("enemy_running-1"),
        s_oSpriteLibrary.getSprite("enemy_running-2"),
      ],
      framerate: 30,
      frames: [
        [1, 1, 551, 698, 0, -9, -30],
        [554, 1, 550, 707, 0, -5, -21],
        [1106, 1, 551, 717, 0, 0, -11],
        [1, 720, 551, 725, 0, 0, -3],
        [554, 720, 552, 726, 0, 0, -2],
        [1108, 720, 549, 722, 0, -4, -6],
        [1, 1, 545, 714, 1, -11, -14],
        [548, 1, 521, 703, 1, -24, -25],
        [1071, 1, 536, 695, 1, -19, -33],
        [1, 717, 566, 698, 1, -2, -30],
        [569, 717, 577, 709, 1, 0, -19],
        [1148, 717, 579, 718, 1, 0, -10],
        [1, 1, 572, 724, 2, 0, -4],
        [575, 1, 567, 725, 2, 0, -3],
        [1144, 1, 562, 721, 2, 0, -7],
        [1, 728, 554, 714, 2, 0, -14],
        [557, 728, 544, 702, 2, -3, -26],
        [1103, 728, 556, 698, 2, -3, -30],
      ],
      animations: { start: 0, anim: [0, 17] },
    };
    B = new createjs.SpriteSheet(B);
    b = createSprite(B, "start");
    n.addChild(b);
    B = {
      images: [
        s_oSpriteLibrary.getSprite("enemy_tackle-0"),
        s_oSpriteLibrary.getSprite("enemy_tackle-1"),
      ],
      framerate: 30,
      frames: [
        [1, 1, 585, 688, 0, -6, -50],
        [588, 1, 598, 659, 0, -17, -80],
        [1188, 1, 602, 629, 0, -27, -112],
        [1, 691, 571, 570, 0, -50, -171],
        [574, 691, 552, 536, 0, -63, -205],
        [1128, 691, 612, 503, 0, -70, -238],
        [1, 1263, 646, 496, 0, -82, -245],
        [649, 1263, 710, 493, 0, -61, -248],
        [1361, 1263, 656, 502, 0, -85, -239],
        [1, 1, 659, 516, 1, -93, -225],
        [662, 1, 500, 536, 1, -126, -205],
        [1164, 1, 543, 534, 1, -80, -207],
        [1, 539, 562, 530, 1, -58, -211],
        [565, 539, 568, 520, 1, -48, -221],
        [1135, 539, 566, 511, 1, -44, -230],
        [1, 1071, 555, 501, 1, -48, -240],
        [558, 1071, 549, 485, 1, -52, -256],
        [1109, 1071, 550, 441, 1, -72, -300],
      ],
      animations: { start: 0, anim: [0, 17, "stop"], stop: 18 },
    };
    B = new createjs.SpriteSheet(B);
    q = createSprite(B, "start");
    q.on("animationend", this._onEndTackle, this);
    n.addChild(q);
    n.regX = 402;
    n.regY = 728;
  };
  this.addEventListener = function (v, x, B) {
    g[v] = x;
    e[v] = B;
  };
  this.reset = function () {
    n.x = k.x;
    n.y = k.y;
    n.scaleX = n.scaleY = 0.1;
    b.visible = !1;
    q.visible = !1;
  };
  this.show = function (v) {
    this.reset();
    setTimeout(function () {
      w._startRun();
    }, v);
  };
  this._startRun = function () {
    b.visible = !0;
    b.gotoAndPlay("anim");
    n.alpha = 0;
    n.visible = !0;
    new createjs.Tween.get(n).to({ alpha: 1 }, 500);
    new createjs.Tween.get(n)
      .to(
        { scaleX: 1, scaleY: 1, x: l.x, y: l.y },
        TIME_OPPONENT_RUN,
        createjs.Ease.cubicIn
      )
      .call(function () {
        g[ON_OPPONENT_TACKLE] &&
          g[ON_OPPONENT_TACKLE].call(e[ON_OPPONENT_TACKLE], a);
      });
    setTimeout(function () {
      w._changeAnim();
      playSound("enemy", 1, !1);
    }, 2500);
  };
  this.hide = function () {
    n.visible = !1;
    g[ON_OPPONENT_HIDE] && g[ON_OPPONENT_HIDE].call(e[ON_OPPONENT_HIDE]);
  };
  this._changeAnim = function () {
    b.visible = !1;
    b.gotoAndStop("start");
    q.visible = !0;
    q.gotoAndPlay("anim");
  };
  this._onEndTackle = function (v) {
    "anim" === v.currentTarget.currentAnimation && this.hide();
  };
  var t = d;
  this._init(f, c);
}
function CScoreText(a, f, c, d) {
  var g;
  this._init = function (e, k, l) {
    g = new createjs.Text("00000", "100px " + FONT_GAME_1, "#fff");
    g.textAlign = "center";
    g.text = e;
    g.x = k;
    g.y = l;
    g.alpha = 0;
    g.shadow = new createjs.Shadow("#000", 1, 1, 1);
    d.addChild(g);
    var b = this;
    createjs.Tween.get(g)
      .to({ alpha: 1 }, 200, createjs.Ease.quadIn)
      .call(function () {
        b.moveUp();
      });
  };
  this.moveUp = function () {
    var e = g.y - 400,
      k = this;
    createjs.Tween.get(g)
      .to({ y: e }, 1500, createjs.Ease.sineIn)
      .call(function () {
        k.unload();
      });
    createjs.Tween.get(g).wait(800).to({ alpha: 0 }, 500);
  };
  this.unload = function () {
    d.removeChild(g);
  };
  this._init(a, f, c);
}
function CAvatar(a) {
  var f, c, d, g, e;
  this._init = function () {
    f = -90;
    e = new createjs.Container();
    e.x = 50;
    e.y = 105;
    k.addChild(e);
    var l = {
      images: [
        s_oSpriteLibrary.getSprite("avatar_idle-0"),
        s_oSpriteLibrary.getSprite("avatar_idle-1"),
        s_oSpriteLibrary.getSprite("avatar_idle-2"),
      ],
      framerate: 15,
      frames: [
        [1, 1, 364, 692, 0, 0, 0],
        [367, 1, 364, 692, 0, 0, 0],
        [733, 1, 364, 692, 0, 0, 0],
        [1099, 1, 364, 692, 0, 0, 0],
        [1465, 1, 364, 692, 0, 0, 0],
        [1, 695, 364, 692, 0, 0, 0],
        [367, 695, 364, 692, 0, 0, 0],
        [733, 695, 364, 692, 0, 0, 0],
        [1099, 695, 364, 692, 0, 0, 0],
        [1465, 695, 364, 692, 0, 0, 0],
        [1, 1, 364, 692, 1, 0, 0],
        [367, 1, 364, 692, 1, 0, 0],
        [733, 1, 364, 692, 1, 0, 0],
        [1099, 1, 364, 692, 1, 0, 0],
        [1465, 1, 364, 692, 1, 0, 0],
        [1, 695, 364, 692, 1, 0, 0],
        [367, 695, 364, 692, 1, 0, 0],
        [733, 695, 364, 692, 1, 0, 0],
        [1099, 695, 364, 692, 1, 0, 0],
        [1465, 695, 364, 692, 1, 0, 0],
        [1, 1, 364, 692, 2, 0, 0],
        [367, 1, 364, 692, 2, 0, 0],
        [733, 1, 364, 692, 2, 0, 0],
        [1099, 1, 364, 692, 2, 0, 0],
        [1465, 1, 364, 692, 2, 0, 0],
        [1, 695, 364, 692, 2, 0, 0],
        [367, 695, 364, 692, 2, 0, 0],
        [733, 695, 364, 692, 2, 0, 0],
        [1099, 695, 364, 692, 2, 0, 0],
        [1465, 695, 364, 692, 2, 0, 0],
      ],
      animations: { start: 0, anim: [0, 29] },
    };
    l = new createjs.SpriteSheet(l);
    c = createSprite(l, "anim", 0, 0, 364, 692);
    e.addChild(c);
    l = {
      images: [
        s_oSpriteLibrary.getSprite("avatar_win1-0"),
        s_oSpriteLibrary.getSprite("avatar_win1-1"),
        s_oSpriteLibrary.getSprite("avatar_win1-2"),
      ],
      framerate: 30,
      frames: [
        [1, 1, 342, 547, 0, -22, -145],
        [345, 1, 342, 542, 0, -22, -150],
        [689, 1, 342, 539, 0, -22, -153],
        [1033, 1, 342, 534, 0, -22, -158],
        [1377, 1, 346, 521, 0, -18, -171],
        [1, 550, 356, 518, 0, -8, -174],
        [359, 550, 364, 518, 0, 0, -174],
        [725, 550, 364, 525, 0, 0, -167],
        [1091, 550, 348, 564, 0, -16, -128],
        [1441, 550, 335, 602, 0, -29, -90],
        [1, 1154, 331, 635, 0, -33, -57],
        [334, 1154, 325, 667, 0, -39, -25],
        [661, 1154, 313, 681, 0, -51, -11],
        [976, 1154, 308, 639, 0, -56, -53],
        [1286, 1154, 303, 610, 0, -61, -82],
        [1591, 1154, 304, 608, 0, -60, -84],
        [1, 1, 311, 599, 1, -53, -93],
        [314, 1, 323, 588, 1, -41, -104],
        [639, 1, 330, 574, 1, -34, -118],
        [971, 1, 335, 559, 1, -28, -133],
        [1308, 1, 339, 530, 1, -24, -162],
        [1649, 1, 343, 520, 1, -19, -172],
        [1, 602, 345, 515, 1, -17, -177],
        [348, 602, 346, 514, 1, -17, -178],
        [696, 602, 347, 523, 1, -17, -169],
        [1045, 602, 347, 529, 1, -17, -163],
        [1394, 602, 347, 533, 1, -17, -159],
        [1, 1137, 345, 537, 1, -19, -155],
        [348, 1137, 343, 537, 1, -21, -155],
        [693, 1137, 342, 537, 1, -22, -155],
        [1037, 1137, 342, 537, 1, -22, -155],
        [1381, 1137, 341, 537, 1, -23, -155],
        [1, 1, 340, 538, 2, -24, -154],
        [343, 1, 340, 538, 2, -24, -154],
        [685, 1, 340, 539, 2, -24, -153],
        [1027, 1, 342, 543, 2, -22, -149],
        [1, 546, 342, 544, 2, -22, -148],
        [345, 546, 342, 546, 2, -22, -146],
        [689, 546, 342, 547, 2, -22, -145],
      ],
      animations: {
        start: 0,
        anim: {
          frames: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
            36, 37, 38,
          ],
        },
      },
    };
    l = new createjs.SpriteSheet(l);
    d = createSprite(l, "start");
    d.on("animationend", this._onAnimationEnd, this);
    d.visible = !1;
    e.addChild(d);
    l = {
      images: [
        s_oSpriteLibrary.getSprite("avatar_win2-0"),
        s_oSpriteLibrary.getSprite("avatar_win2-1"),
        s_oSpriteLibrary.getSprite("avatar_win2-2"),
      ],
      framerate: 30,
      frames: [
        [1, 1, 323, 547, 0, -36, -145],
        [326, 1, 325, 545, 0, -34, -147],
        [653, 1, 326, 540, 0, -33, -152],
        [981, 1, 333, 535, 0, -24, -157],
        [1316, 1, 335, 531, 0, -21, -161],
        [1653, 1, 334, 529, 0, -20, -163],
        [1, 550, 333, 526, 0, -19, -166],
        [336, 550, 325, 521, 0, -28, -171],
        [663, 550, 331, 519, 0, -25, -173],
        [996, 550, 334, 517, 0, -24, -175],
        [1332, 550, 335, 517, 0, -23, -175],
        [1669, 550, 341, 520, 0, -20, -172],
        [1, 1078, 341, 523, 0, -21, -169],
        [344, 1078, 337, 526, 0, -26, -166],
        [683, 1078, 336, 540, 0, -27, -152],
        [1021, 1078, 337, 584, 0, -27, -108],
        [1360, 1078, 340, 603, 0, -24, -89],
        [1702, 1078, 339, 612, 0, -24, -80],
        [1, 1, 332, 612, 1, -32, -80],
        [335, 1, 331, 614, 1, -33, -78],
        [668, 1, 332, 615, 1, -32, -77],
        [1002, 1, 332, 614, 1, -32, -78],
        [1336, 1, 329, 610, 1, -34, -82],
        [1667, 1, 330, 591, 1, -34, -101],
        [1, 618, 333, 573, 1, -31, -119],
        [336, 618, 336, 550, 1, -28, -142],
        [674, 618, 338, 531, 1, -25, -161],
        [1014, 618, 345, 531, 1, -19, -161],
        [1361, 618, 339, 531, 1, -21, -161],
        [1702, 618, 335, 530, 1, -25, -162],
        [1, 1193, 324, 530, 1, -33, -162],
        [327, 1193, 324, 530, 1, -33, -162],
        [653, 1193, 323, 530, 1, -33, -162],
        [978, 1193, 322, 531, 1, -33, -161],
        [1302, 1193, 321, 532, 1, -33, -160],
        [1625, 1193, 320, 532, 1, -35, -160],
        [1, 1, 323, 533, 2, -32, -159],
        [326, 1, 322, 534, 2, -33, -158],
        [650, 1, 324, 537, 2, -33, -155],
        [1, 540, 324, 539, 2, -33, -153],
        [327, 540, 323, 541, 2, -35, -151],
        [1, 1083, 326, 544, 2, -33, -148],
        [329, 1083, 326, 547, 2, -34, -145],
      ],
      animations: {
        start: 0,
        anim: {
          frames: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
            36, 37, 38, 39, 40, 41, 42,
          ],
        },
      },
    };
    l = new createjs.SpriteSheet(l);
    g = createSprite(l, "start");
    g.on("animationend", this._onAnimationEnd, this);
    g.visible = !1;
    e.addChild(g);
    this.refreshButtonPos();
  };
  this._hideAllAnims = function () {
    c.visible = !1;
    d.visible = !1;
    g.visible = !1;
  };
  this.refreshButtonPos = function () {
    e.x = 150 < s_iOffsetX ? f + s_iOffsetX : 60;
  };
  this.show = function (l) {
    switch (l) {
      case 0:
        c.visible = !0;
        d.visible = !1;
        g.visible = !1;
        d.gotoAndStop("start");
        g.gotoAndStop("start");
        c.gotoAndPlay("anim");
        break;
      case 1:
        c.visible = !1;
        d.visible = !0;
        g.visible = !1;
        d.gotoAndPlay("anim");
        break;
      case 2:
        (c.visible = !1),
          (d.visible = !1),
          (g.visible = !0),
          g.gotoAndPlay("anim");
    }
  };
  this._onAnimationEnd = function (l) {
    "anim" === l.currentTarget.currentAnimation && this.show(0);
  };
  var k = a;
  this._init();
}
function CRechargePanel() {
  var a,
    f,
    c,
    d,
    g,
    e,
    k,
    l = this;
  this._init = function () {
    k = new createjs.Container();
    s_oStage.addChild(k);
    f = new createjs.Shape();
    a = f.on("click", function () {});
    f.alpha = 0;
    f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    k.addChild(f);
    c = new createjs.Container();
    c.visible = !1;
    k.addChild(c);
    var b = s_oSpriteLibrary.getSprite("msg_box");
    e = createBitmap(b);
    e.regX = b.width / 2;
    e.regY = b.height / 2;
    c.addChild(e);
    c.x = CANVAS_WIDTH / 2;
    c.y = CANVAS_HEIGHT / 2;
    new CTLText(
      c,
      -b.width / 2 + 30,
      -80,
      b.width - 60,
      90,
      30,
      "center",
      "#fff",
      FONT_GAME_1,
      1,
      40,
      10,
      TEXT_RECHARGE,
      !0,
      !0,
      !0,
      !1
    );
    b = s_oSpriteLibrary.getSprite("but_exit");
    g = new CGfxButton(-130, 70, b, c);
    g.addEventListener(ON_MOUSE_UP, this.unload, this);
    d = new CGfxButton(130, 70, s_oSpriteLibrary.getSprite("but_yes"), c);
    d.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
    f.alpha = 0;
    createjs.Tween.get(f)
      .to({ alpha: 0.7 }, 500)
      .call(function () {
        c.alpha = 0;
        c.visible = !0;
        createjs.Tween.get(c).to({ alpha: 1 }, 300);
      });
  };
  this.unload = function () {
    createjs.Tween.get(k)
      .to({ alpha: 0 }, 500)
      .call(function () {
        s_oStage.removeChild(k);
        g.unload();
        d.unload();
      });
    f.off("click", a);
  };
  this._onRecharge = function () {
    l.unload();
    $(s_oMain).trigger("recharge");
  };
  this._init();
}
function CFieldBonus(a, f, c) {
  var d;
  this._init = function (e, k) {
    var l = {
      images: [
        s_oSpriteLibrary.getSprite("field_loop-0"),
        s_oSpriteLibrary.getSprite("field_loop-1"),
        s_oSpriteLibrary.getSprite("field_loop-2"),
      ],
      framerate: 30,
      frames: [
        [1, 1, 1500, 252, 0, 0, 0],
        [1, 255, 1500, 252, 0, 0, 0],
        [1, 509, 1500, 252, 0, 0, 0],
        [1, 763, 1500, 252, 0, 0, 0],
        [1, 1017, 1500, 252, 0, 0, 0],
        [1, 1271, 1500, 252, 0, 0, 0],
        [1, 1525, 1500, 252, 0, 0, 0],
        [1, 1779, 1500, 252, 0, 0, 0],
        [1, 1, 1500, 252, 1, 0, 0],
        [1, 255, 1500, 252, 1, 0, 0],
        [1, 509, 1500, 252, 1, 0, 0],
        [1, 763, 1500, 252, 1, 0, 0],
        [1, 1017, 1500, 252, 1, 0, 0],
        [1, 1271, 1500, 252, 1, 0, 0],
        [1, 1525, 1500, 252, 1, 0, 0],
        [1, 1779, 1500, 252, 1, 0, 0],
        [1, 1, 1500, 252, 2, 0, 0],
        [1, 255, 1500, 252, 2, 0, 0],
      ],
      animations: { start: 0, anim: [0, 17] },
    };
    l = new createjs.SpriteSheet(l);
    d = createSprite(l, "start");
    d.visible = !1;
    d.x = e;
    d.y = k;
    g.addChild(d);
  };
  this.show = function () {
    d.visible = !0;
    d.gotoAndPlay("anim");
  };
  this.hide = function () {
    d.visible = !1;
    d.gotoAndStop("start");
  };
  this.stop = function () {
    d.stop();
  };
  var g = c;
  this._init(a, f);
}
function CFieldEndZoneBonus(a, f, c) {
  var d;
  this._init = function (e, k) {
    var l = {
      images: [
        s_oSpriteLibrary.getSprite("end_zone-0"),
        s_oSpriteLibrary.getSprite("end_zone-1"),
        s_oSpriteLibrary.getSprite("end_zone-2"),
        s_oSpriteLibrary.getSprite("end_zone-3"),
      ],
      framerate: 30,
      frames: [
        [1, 1, 1500, 33, 0, 0, 0],
        [1, 36, 1500, 34, 0, 0, 0],
        [1, 72, 1500, 35, 0, 0, 0],
        [1, 109, 1500, 38, 0, 0, 0],
        [1, 149, 1500, 41, 0, 0, 0],
        [1, 192, 1500, 46, 0, 0, 0],
        [1, 240, 1500, 52, 0, 0, 0],
        [1, 294, 1500, 58, 0, 0, 0],
        [1, 354, 1500, 66, 0, 0, 0],
        [1, 422, 1500, 74, 0, 0, 0],
        [1, 498, 1500, 84, 0, 0, 0],
        [1, 584, 1500, 93, 0, 0, 0],
        [1, 679, 1500, 104, 0, 0, 0],
        [1, 785, 1500, 115, 0, 0, 0],
        [1, 902, 1500, 126, 0, 0, 0],
        [1, 1030, 1500, 137, 0, 0, 0],
        [1, 1169, 1500, 148, 0, 0, 0],
        [1, 1319, 1500, 162, 0, 0, 0],
        [1, 1483, 1500, 180, 0, 0, 0],
        [1, 1665, 1500, 198, 0, 0, 0],
        [1, 1, 1500, 215, 1, 0, 0],
        [1, 218, 1500, 238, 1, 0, 0],
        [1, 458, 1500, 252, 1, 0, 0],
        [1, 712, 1500, 252, 1, 0, 0],
        [1, 966, 1500, 252, 1, 0, 0],
        [1, 1220, 1500, 252, 1, 0, 0],
        [1, 1474, 1500, 252, 1, 0, 0],
        [1, 1728, 1500, 252, 1, 0, 0],
        [1, 1, 1500, 252, 2, 0, 0],
        [1, 255, 1500, 252, 2, 0, 0],
        [1, 509, 1500, 252, 2, 0, 0],
        [1, 763, 1500, 252, 2, 0, 0],
        [1, 1017, 1500, 252, 2, 0, 0],
        [1, 1271, 1500, 252, 2, 0, 0],
        [1, 1525, 1500, 252, 2, 0, 0],
        [1, 1779, 1500, 251, 2, 0, -1],
        [1, 1, 1500, 252, 3, 0, 0],
        [1, 255, 1500, 252, 3, 0, 0],
        [1, 509, 1500, 252, 3, 0, 0],
      ],
      animations: { start: 0, anim: [0, 38, "stop"], stop: 38 },
    };
    l = new createjs.SpriteSheet(l);
    d = createSprite(l, "start");
    d.visible = !1;
    d.x = e;
    d.y = k;
    g.addChild(d);
  };
  this.show = function () {
    d.visible = !0;
    d.gotoAndPlay("anim");
  };
  this.hide = function () {
    this.reset();
  };
  this.reset = function () {
    d.gotoAndStop("start");
    d.visible = !1;
  };
  var g = c;
  this._init(a, f);
}
function CBallFreekicks(a, f, c, d) {
  var g, e, k;
  this._init = function (b, q, n) {
    g = 2;
    e = new createjs.Container();
    e.x = b;
    e.y = q;
    n.addChild(e);
    b = s_oSpriteLibrary.getSprite("ball_freekicks");
    q = b.width / 2;
    n = b.height / 6;
    b = new createjs.SpriteSheet({
      images: [b],
      framerate: 30,
      frames: { width: q, height: n, regX: q / 2, regY: n / 2 },
      animations: { launch: [0, 11, "launch"] },
    });
    k = createSprite(b, "launch", 0, 0, 0, 0);
    k.gotoAndStop("launch");
    e.addChild(k);
  };
  this.unload = function () {
    c.removeChild(e);
  };
  this.launch = function (b, q, n, w, t) {
    k.gotoAndPlay("launch");
    k.framerate = 30;
    var v = BALL_FLYTIME;
    w *= BALL_MAX_ROTATION;
    new createjs.Tween.get(e).to({ rotation: w }, v, createjs.Ease.cubicOut);
    new createjs.Tween.get(e).to({ x: b }, v, createjs.Ease.cubicOut);
    new createjs.Tween.get(e)
      .to({ y: q }, 0.5 * v, createjs.Ease.cubicOut)
      .call(function () {
        t
          ? (new createjs.Tween.removeTweens(e),
            (k.framerate = 10),
            d.ballTouchTheTarget(e.x, e.y, n),
            new createjs.Tween.get(e).to(
              { y: q + 400, alpha: 0 },
              0.5 * v,
              createjs.Ease.cubicIn
            ),
            new createjs.Tween.get(e)
              .to({ scaleX: e.scaleX + 0.1, scaleY: e.scaleY + 0.1 }, 0.5 * v)
              .wait(1e3)
              .call(function () {
                d.ballArrived(t);
                new createjs.Tween.removeTweens(e);
                k.gotoAndStop("launch");
              }))
          : (new createjs.Tween.get(e).to(
              { y: q + 200, alpha: 0 },
              0.5 * v,
              createjs.Ease.cubicIn
            ),
            d.ballTouchTheTarget(e.x, e.y, n),
            n > NULL_TARGET_POLE && l._waveAnimation(e.x, e.y));
      });
    new createjs.Tween.get(e)
      .to({ scaleX: 0.02, scaleY: 0.02 }, v, createjs.Ease.cubicOut)
      .wait(1e3)
      .call(function () {
        d.ballArrived(t);
        new createjs.Tween.removeTweens(e);
        k.gotoAndStop("launch");
      });
  };
  this.reset = function () {
    e.alpha = 1;
    e.scaleX = e.scaleY = 1;
    e.rotation = 0;
    e.x = a;
    e.y = f;
  };
  this._waveAnimation = function (b, q) {
    0 === g
      ? (g = 2)
      : (this.spawnWave(b, q),
        setTimeout(function () {
          l._waveAnimation(b, q);
        }, 200));
  };
  this.spawnWave = function (b, q) {
    g--;
    var n = new createjs.Shape();
    n.graphics.setStrokeStyle(3);
    n.graphics.beginStroke("rgba(255,255,255,1)").drawCircle(b, q, 1);
    c.addChild(n);
    new createjs.Tween.get(n.graphics.command).to(
      { radius: 50 },
      1e3,
      createjs.Ease.cubicOut
    );
    new createjs.Tween.get(n)
      .to({ alpha: 0 }, 1e3, createjs.Ease.cubicOut)
      .call(function () {
        c.removeChild(n);
      });
  };
  this.getContainer = function () {
    return e;
  };
  var l = this;
  this._init(a, f, c);
}
function CFreekicksFinalPanel(a) {
  var f, c, d, g, e, k;
  this._init = function () {
    f = [];
    c = [];
    k = new createjs.Container();
    k.visible = !1;
    l.addChild(k);
    var b = s_oSpriteLibrary.getSprite("msg_box"),
      q = createBitmap(b);
    q.x = CANVAS_WIDTH / 2;
    q.y = CANVAS_HEIGHT / 2;
    q.regX = b.width / 2;
    q.regY = b.height / 2;
    k.addChild(q);
    g = new createjs.Text(TEXT_GREAT, "70px " + FONT_GAME_1, "#fff");
    g.textAlign = "center";
    g.textBaseline = "alphabetic";
    g.lineWidth = 400;
    g.x = CANVAS_WIDTH / 2;
    g.y = 320;
    k.addChild(g);
    e = new createjs.Text("", "55px " + FONT_GAME_1, "#fff");
    e.textAlign = "center";
    e.textBaseline = "alphabetic";
    e.lineWidth = 400;
    e.lineHeight = 66;
    e.x = CANVAS_WIDTH / 2;
    e.y = 430;
    k.addChild(e);
  };
  this.addEventListener = function (b, q, n) {
    f[b] = q;
    c[b] = n;
  };
  this.show = function (b, q) {
    g.text = b;
    e.text = q;
    d = k.on("click", function () {});
    k.alpha = 0;
    k.visible = !0;
    playSound("bonus_win", 1, !1);
    var n = this;
    createjs.Tween.get(k)
      .to({ alpha: 1 }, 800, createjs.Ease.cubicOut)
      .call(function () {
        setTimeout(function () {
          n.hide();
        }, 3e3);
      });
  };
  this.hide = function () {
    k.off("click", d);
    createjs.Tween.get(k)
      .to({ alpha: 0 }, 800, createjs.Ease.cubicOut)
      .call(function () {
        k.visible = !1;
      });
    f[ON_EXIT_FREEKICKS] && f[ON_EXIT_FREEKICKS].call(c[ON_EXIT_FREEKICKS]);
  };
  var l = a;
  this._init();
}
function CFreekicksMsgBox(a) {
  var f, c, d, g, e, k;
  this._init = function () {
    f = [];
    c = [];
    k = new createjs.Container();
    k.visible = !1;
    l.addChild(k);
    var b = s_oSpriteLibrary.getSprite("msg_box"),
      q = createBitmap(b);
    q.x = CANVAS_WIDTH / 2;
    q.y = CANVAS_HEIGHT / 2;
    q.regX = b.width / 2;
    q.regY = b.height / 2;
    k.addChild(q);
    g = new createjs.Text(TEXT_GREAT, "50px " + FONT_GAME_1, "#fff");
    g.textAlign = "center";
    g.textBaseline = "alphabetic";
    g.lineWidth = 400;
    g.x = CANVAS_WIDTH / 2;
    g.y = 300;
    k.addChild(g);
    e = new createjs.Text("", "55px " + FONT_GAME_1, "#fff");
    e.textAlign = "center";
    e.textBaseline = "alphabetic";
    e.lineWidth = 400;
    e.lineHeight = 66;
    e.x = CANVAS_WIDTH / 2;
    e.y = 420;
    k.addChild(e);
  };
  this.addEventListener = function (b, q, n) {
    f[b] = q;
    c[b] = n;
  };
  this.show = function (b) {
    e.text = TEXT_YOU_WIN + " " + b + " " + TEXT_FREESPINS;
    d = k.on("click", function () {});
    k.alpha = 0;
    k.visible = !0;
    var q = this;
    createjs.Tween.get(k)
      .to({ alpha: 1 }, 800, createjs.Ease.cubicOut)
      .call(function () {
        setTimeout(function () {
          q.hide();
        }, 3e3);
      });
    playSound("bonus_win", 1, !1);
  };
  this.hide = function () {
    k.off("click", d);
    createjs.Tween.get(k)
      .to({ alpha: 0 }, 800, createjs.Ease.cubicOut)
      .call(function () {
        k.visible = !1;
      });
    f[ON_EXIT_FREEKICKS_MSGBOX] &&
      f[ON_EXIT_FREEKICKS_MSGBOX].call(c[ON_EXIT_FREEKICKS_MSGBOX]);
  };
  var l = a;
  this._init();
}
function CFreekicksPanel() {
  var a,
    f,
    c,
    d,
    g,
    e = !1,
    k = !1,
    l,
    b,
    q,
    n,
    w,
    t,
    v,
    x,
    B,
    z,
    N,
    p,
    F,
    K,
    A,
    y,
    L,
    C,
    P,
    Y,
    R,
    U = null,
    O,
    Z,
    J,
    D,
    I,
    H,
    h,
    Q,
    V = this;
  this._init = function () {
    e = !0;
    b = g = !1;
    Q.removeAllChildren();
    O = new createjs.Container();
    O.x = CANVAS_WIDTH / 2;
    O.y = CANVAS_HEIGHT / 2;
    O.scaleX = O.scaleY = 0.5;
    Q.addChild(O);
    var m = s_oSpriteLibrary.getSprite("bg_game_1"),
      u = createBitmap(m);
    u.regX = m.width / 2;
    u.regY = m.height / 2;
    O.addChild(u);
    C = new CGoalArea(0, O);
    m = s_oSpriteLibrary.getSprite("ball_holder");
    u = createBitmap(m);
    u.regX = m.width / 2;
    u.regY = m.height / 2;
    u.x = 78;
    u.y = 764;
    O.addChild(u);
    R = new CBallFreekicks(0, 600, O, this);
    U = new CPlayerFreeckicks(Q);
    U.addEventListener(ON_FREEKICK_PLAY, this.kickBall, this);
    c = CANVAS_WIDTH - 30;
    d = 30;
    P = new createjs.Container();
    P.x = c;
    P.y = d;
    Q.addChild(P);
    m = s_oSpriteLibrary.getSprite("amount_bonus_win");
    a = 30;
    f = CANVAS_HEIGHT - m.height / 2 - 10;
    Y = new createjs.Container();
    Y.x = a;
    Y.y = f;
    Q.addChild(Y);
    u = createBitmap(m);
    u.regY = m.height / 2;
    Y.addChild(u);
    L = new createjs.Text("0.00", "40px " + FONT_GAME_1, "#fff");
    L.x = m.width / 2;
    L.y = 12;
    L.shadow = new createjs.Shadow("#000", 2, 2, 2);
    L.textBaseline = "alphabetic";
    L.textAlign = "center";
    Y.addChild(L);
    J = new createjs.Text(TEXT_FREEKICKS_HELP, "50px " + FONT_GAME_1, "#fff");
    J.x = CANVAS_WIDTH / 2;
    J.y = 200;
    J.textAlign = "center";
    J.textBaseline = "alphabetic";
    J.shadow = new createjs.Shadow("#000", 1, 1, 1);
    J.alpha = 0;
    Q.addChild(J);
    H = new CFreekicksMsgBox(Q);
    H.addEventListener(ON_EXIT_FREEKICKS_MSGBOX, this._closeMsgBox, this);
    h = new CFreekicksFinalPanel(Q);
    h.addEventListener(ON_EXIT_FREEKICKS, this.exitFromFinalPanel, this);
    this._startFreekicks();
  };
  this.refreshButtonPos = function () {
    g &&
      ((P.x = c - s_iOffsetX),
      (P.y = d + s_iOffsetY),
      (Y.x = a + s_iOffsetX),
      (Y.y = f - s_iOffsetY));
  };
  this.show = function (m) {
    F = 0;
    w = m;
    b = !1;
    e ? this._startFreekicks() : this._loadAllResources();
  };
  this._loadAllResources = function () {
    Q = new createjs.Container();
    s_oAttachSection.addChild(Q);
    var m = s_oSpriteLibrary.getSprite("bg_loading_freekicks");
    m = createBitmap(m);
    Q.addChild(m);
    m = s_oSpriteLibrary.getSprite("progress_bar");
    I = createBitmap(m);
    I.x = CANVAS_WIDTH / 2 - m.width / 2;
    I.y = CANVAS_HEIGHT - 270;
    Q.addChild(I);
    t = m.width;
    v = m.height;
    D = new createjs.Shape();
    D.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(I.x, I.y, 1, v);
    Q.addChild(D);
    I.mask = D;
    Z = new createjs.Text("", "30px " + FONT_GAME_1, "#fff");
    Z.x = CANVAS_WIDTH / 2;
    Z.y = CANVAS_HEIGHT - 225;
    Z.shadow = new createjs.Shadow("#000", 2, 2, 2);
    Z.textBaseline = "alphabetic";
    Z.textAlign = "center";
    Q.addChild(Z);
    s_oSpriteLibrary.init(
      this._onResourceFreekicksLoaded,
      this._onAllImagesLoaded,
      this
    );
    s_oSpriteLibrary.addSprite(
      "ball_freekicks",
      "./sprites/freekicks/ball_freekicks.png"
    );
    s_oSpriteLibrary.addSprite(
      "ball_holder",
      "./sprites/freekicks/ball_holder.png"
    );
    s_oSpriteLibrary.addSprite(
      "bg_game_1",
      "./sprites/freekicks/bg_game_1.jpg"
    );
    s_oSpriteLibrary.addSprite("post_1", "./sprites/freekicks/post_1.png");
    for (m = 0; 53 > m; m++)
      s_oSpriteLibrary.addSprite(
        "player_" + m,
        "./sprites/freekicks/player/player_" + m + ".png"
      );
    x = 0;
    B = s_oSpriteLibrary.getNumSprites();
    s_oSpriteLibrary.loadSprites();
  };
  this._onResourceFreekicksLoaded = function () {
    x++;
    var m = Math.floor((x / B) * 100);
    Z.text = m + "%";
    D.graphics.clear();
    m = Math.floor((m * t) / 100);
    D.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(I.x, I.y, m, v);
    x === B && this._init();
  };
  this._onAllImagesLoaded = function () {};
  this._startFreekicks = function () {
    y = Q.on("click", function () {
      V.clickHitArea();
    });
    k = g = Q.visible = !0;
    L.text = "0.00";
    H.show(w);
    this.refreshNumKick(w);
  };
  this.hide = function () {
    g = !1;
    Q.off("click", y);
    k = Q.visible = !1;
  };
  this.clickHitArea = function () {
    b &&
      ((b = !1), s_oGame.onSpin(), createjs.Tween.get(J).to({ alpha: 0 }, 500));
  };
  this._closeMsgBox = function () {
    l
      ? n ||
        ((b = !0), (J.alpha = 0), createjs.Tween.get(J).to({ alpha: 1 }, 500))
      : ((J.alpha = 0), createjs.Tween.get(J).to({ alpha: 1 }, 500), (b = !0));
  };
  this.playerShot = function (m, u) {
    p = m;
    F += m;
    K = u;
    0 < m
      ? ((q = !0),
        (z = (0.3 * Math.random()).toFixed(3)),
        (N = (0.3 * Math.random()).toFixed(3)))
      : ((q = !1),
        (z = (0.5 * Math.random() + 0.5).toFixed(3)),
        (N = (0.5 * Math.random() + 0.5).toFixed(3)));
    var r = 0.5 < Math.random() ? 1 : -1;
    z *= r;
    r = 0.5 < Math.random() ? 1 : -1;
    N *= r;
    l = !1;
    0 < u && (l = !0);
    this.startKick();
  };
  this.startKick = function () {
    console.log("startKick");
    U.startPlay();
  };
  this._resetShot = function () {
    R.reset();
    new createjs.Tween.get(O)
      .to(
        { scaleX: 0.5, scaleY: 0.5, regX: 0, regY: 0 },
        1e3,
        createjs.Ease.cubicOut
      )
      .call(function () {
        V._levelSet();
      });
  };
  this._levelSet = function () {
    O.scaleX = O.scaleY = 0.5;
    O.regX = O.regY = 0;
    l
      ? (H.show(K), (w += K), this.refreshNumKick(w))
      : n ||
        ((b = !0), (J.alpha = 0), createjs.Tween.get(J).to({ alpha: 1 }, 500));
  };
  this.kickBall = function () {
    w--;
    A[w].visible = !1;
    var m = C.getAreaHit(z, N, q ? GREEN_TARGET : NULL_TARGET);
    this._shiftCamera(m.x);
    R.launch(m.x, m.y, m.areahit, z, m.stakehit);
  };
  this.refreshNumKick = function (m) {
    P.removeAllChildren();
    var u = s_oSpriteLibrary.getSprite("ball_freekicks"),
      r = u.width / 2,
      M = u.height / 6;
    u = new createjs.SpriteSheet({
      images: [u],
      frames: { width: r, height: M, regX: r / 2, regY: M / 2 },
      animations: { static: 0 },
    });
    A = [];
    for (r = 0; r < m; r++)
      (A[r] = createSprite(u, "static", 0, 0, 0, 0)),
        A[r].gotoAndStop("static"),
        (A[r].scaleX = A[r].scaleY = 0.15),
        (A[r].rotation = 30),
        (A[r].x = 26 * -r),
        P.addChild(A[r]);
    this.refreshButtonPos();
  };
  this._shiftCamera = function (m) {
    320 < Math.abs(m) && (m = 0 < m ? 320 : -320);
    new createjs.Tween.get(O)
      .wait(500)
      .to({ scaleX: 1, scaleY: 1, regX: m }, 2e3, createjs.Ease.cubicOut);
    new createjs.Tween.get(O)
      .wait(500)
      .to({ regY: -200 }, 1300, createjs.Ease.cubicOut)
      .to({ regY: -150 }, 1600, createjs.Ease.cubicIn);
  };
  this.ballTouchTheTarget = function (m, u, r) {
    switch (r) {
      case NULL_TARGET_POLE:
        playSound("miss_goal", 1, !1);
        new CScoreTextFreekicks(TEXT_CENTER_NULL, m, u, O, "#ff0000");
        break;
      case NULL_TARGET:
        playSound("miss_goal", 1, !1);
        new CScoreTextFreekicks(TEXT_MISS, m, u, O, "#ff0000");
        break;
      default:
        playSound("goal", 1, !1),
          new CScoreTextFreekicks(formatEntries(p), m, u, O, "#fff");
    }
    r !== NULL_TARGET_POLE &&
      O.swapChildren(R.getContainer(), C.getContainer());
  };
  this.ballArrived = function (m) {
    L.text = formatEntries(F);
    n = !1;
    0 === w &&
      !1 === l &&
      ((n = !0),
      0 === F
        ? h.show(TEXT_NO_WIN_FREEKICKS, "")
        : h.show(TEXT_GREAT, TEXT_YOU_WIN + " " + L.text + "!"));
    this._resetShot();
    m || O.swapChildren(C.getContainer(), R.getContainer());
  };
  this.exitFromFinalPanel = function () {
    V.hide();
    s_oGame.exitFromFreekicks(F);
  };
  this.isVisible = function () {
    return k;
  };
  this.update = function () {
    g && U.update();
  };
}
function CGoalArea(a, f) {
  var c, d, g, e, k;
  this._init = function (l, b) {
    c = l;
    d = new createjs.Container();
    b.addChild(d);
    k = new createjs.Container();
    b.addChild(k);
    this.setGoalArea(c);
    this.setAreaSprite(c);
  };
  this.unload = function () {
    f.removeChild(d);
    f.removeChild(k);
  };
  this.setGoalArea = function (l) {
    c = l;
    d.removeAllChildren();
    k.removeAllChildren();
    f.removeChild(e);
    d.x = GOAL_AREA[c].x;
    d.y = GOAL_AREA[c].y;
    g = new createjs.Shape();
    g.graphics
      .beginFill("rgba(0,255,255,0.5)")
      .drawRect(
        -GOAL_AREA[c].width / 2,
        -GOAL_AREA[c].height / 2,
        GOAL_AREA[c].width,
        GOAL_AREA[c].height
      );
  };
  this.setAreaSprite = function () {
    this._stakeArea();
  };
  this._stakeArea = function () {
    var l = new createjs.Shape();
    l.graphics.setStrokeStyle(50);
    l.graphics.beginStroke("rgba(255,255,255,0.01)");
    l.graphics.moveTo(STAKE_POS[c][0].x, STAKE_POS[c][0].y);
    for (var b = 1; b < STAKE_POS[c].length; b++)
      l.graphics.lineTo(STAKE_POS[c][b].x, STAKE_POS[c][b].y);
    k.addChild(l);
    l = s_oSpriteLibrary.getSprite("post_" + (c + 1));
    e = createBitmap(l);
    e.regX = l.width / 2;
    e.regY = l.height / 2;
    e.x = POST_POS[c].x - GOAL_AREA[c].x;
    e.y = POST_POS[c].y - GOAL_AREA[c].y;
    d.addChild(e);
  };
  this.getAreaHit = function (l, b, q) {
    l = GOAL_AREA[c].x + (l * GOAL_AREA[c].width) / 2;
    b = GOAL_AREA[c].y + (b * GOAL_AREA[c].height) / 2;
    return k.hitTest(l, b)
      ? { x: l, y: b, areahit: NULL_TARGET_POLE, stakehit: !0 }
      : { x: l, y: b, areahit: q, stakehit: !1 };
  };
  this.getGlobalPos = function () {
    return f.localToGlobal(d.x, d.y);
  };
  this.getContainer = function () {
    return d;
  };
  this._init(a, f);
}
function CPlayerFreeckicks(a) {
  var f, c, d, g, e, k, l;
  this._init = function (b) {
    c = f = !1;
    e = [];
    k = [];
    d = 0;
    l = new createjs.Container();
    l.x = -160;
    l.y = CANVAS_HEIGHT;
    b.addChild(l);
    g = [];
    for (b = 0; 37 >= b; b++) {
      var q = s_oSpriteLibrary.getSprite("player_" + b);
      g[b] = createBitmap(q);
      g[b].regY = q.height;
      g[b].visible = !1;
      l.addChild(g[b]);
    }
  };
  this.unload = function () {
    a.removeChild(l);
  };
  this.addEventListener = function (b, q, n) {
    e[b] = q;
    k[b] = n;
  };
  this.fade = function () {
    new createjs.Tween.get(l).to({ alpha: 0 }, 800);
  };
  this.startPlay = function () {
    l.alpha = 1;
    f = !0;
    c = !1;
  };
  this._playShot = function () {
    0 !== d && (g[d - 1].visible = !1);
    g[d].visible = !0;
    d++;
    26 <= d &&
      !c &&
      ((c = !0),
      playSound("kick", 1, !1),
      e[ON_FREEKICK_PLAY] && e[ON_FREEKICK_PLAY].call(k[ON_FREEKICK_PLAY]),
      this.fade());
    37 < d && ((g[d - 1].visible = !1), (d = 0), (f = !1));
  };
  this.update = function () {
    f && this._playShot();
  };
  this._init(a);
}
function CScoreTextFreekicks(a, f, c, d, g) {
  var e;
  this._init = function (k, l, b, q) {
    e = new createjs.Text(k, " 54px " + FONT_GAME_1, "#17294d");
    e.textAlign = "center";
    e.color = g;
    e.x = l;
    e.y = b;
    e.alpha = 0;
    q.addChild(e);
    var n = this;
    createjs.Tween.get(e)
      .to({ alpha: 1 }, 400, createjs.Ease.quadIn)
      .call(function () {
        n.moveUp();
      });
  };
  this.moveUp = function () {
    var k = e.y - 100,
      l = this;
    createjs.Tween.get(e)
      .to({ y: k }, 1e3, createjs.Ease.sineIn)
      .call(function () {
        l.unload();
      });
    createjs.Tween.get(e).wait(500).to({ alpha: 0 }, 500);
  };
  this.unload = function () {
    d.removeChild(e);
  };
  this._init(a, f, c, d);
}
function extractHostname(a) {
  a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
  a = a.split(":")[0];
  return (a = a.split("?")[0]);
}
function extractRootDomain(a) {
  a = extractHostname(a);
  var f = a.split("."),
    c = f.length;
  2 < c && (a = f[c - 2] + "." + f[c - 1]);
  return a;
}
var getClosestTop = function () {
    var a = window,
      f = !1;
    try {
      for (; a.parent.document !== a.document; )
        if (a.parent.document) a = a.parent;
        else {
          f = !0;
          break;
        }
    } catch (c) {
      f = !0;
    }
    return { topFrame: a, err: f };
  },
  getBestPageUrl = function (a) {
    var f = a.topFrame,
      c = "";
    if (a.err)
      try {
        try {
          c = window.top.location.href;
        } catch (g) {
          var d = window.location.ancestorOrigins;
          c = d[d.length - 1];
        }
      } catch (g) {
        c = f.document.referrer;
      }
    else c = f.location.href;
    return c;
  },
  TOPFRAMEOBJ = getClosestTop(),
  PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);
function seekAndDestroy() {
  for (
    var a = extractRootDomain(PAGE_URL),
      f = [
        String.fromCharCode(
          99,
          111,
          100,
          101,
          116,
          104,
          105,
          115,
          108,
          97,
          98,
          46,
          99,
          111,
          109
        ),
        String.fromCharCode(101, 110, 118, 97, 116, 111, 46, 99, 111, 109),
        String.fromCharCode(
          99,
          111,
          100,
          101,
          99,
          97,
          110,
          121,
          111,
          110,
          46,
          99,
          111,
          109
        ),
        String.fromCharCode(
          99,
          111,
          100,
          101,
          99,
          97,
          110,
          121,
          111,
          110,
          46,
          110,
          101,
          116
        ),
      ],
      c = 0;
    c < f.length;
    c++
  )
    if (f[c] === a) return !0;
  return !1;
}
