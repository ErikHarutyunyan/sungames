(function () {
  var a =
      "undefined" !== typeof window && "undefined" !== typeof window.document
        ? window.document
        : {},
    b = "undefined" !== typeof module && module.exports,
    c = "undefined" !== typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
    f = (function () {
      for (
        var c,
          b = [
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
          e = 0,
          d = b.length,
          f = {};
        e < d;
        e++
      )
        if ((c = b[e]) && c[1] in a) {
          for (e = 0; e < c.length; e++) f[b[0][e]] = c[e];
          return f;
        }
      return !1;
    })(),
    k = {
      change: f.fullscreenchange,
      error: f.fullscreenerror,
    },
    n = {
      request: function (b) {
        var m = f.requestFullscreen;
        b = b || a.documentElement;
        if (/5\.1[.\d]* Safari/.test(navigator.userAgent)) b[m]();
        else b[m](c && Element.ALLOW_KEYBOARD_INPUT);
      },
      exit: function () {
        a[f.exitFullscreen]();
      },
      toggle: function (a) {
        this.isFullscreen ? this.exit() : this.request(a);
      },
      onchange: function (a) {
        this.on("change", a);
      },
      onerror: function (a) {
        this.on("error", a);
      },
      on: function (b, c) {
        var e = k[b];
        e && a.addEventListener(e, c, !1);
      },
      off: function (b, c) {
        var e = k[b];
        e && a.removeEventListener(e, c, !1);
      },
      raw: f,
    };
  f
    ? (Object.defineProperties(n, {
        isFullscreen: {
          get: function () {
            return !!a[f.fullscreenElement];
          },
        },
        element: {
          enumerable: !0,
          get: function () {
            return a[f.fullscreenElement];
          },
        },
        enabled: {
          enumerable: !0,
          get: function () {
            return !!a[f.fullscreenEnabled];
          },
        },
      }),
      b ? (module.exports = n) : (window.screenfull = n))
    : b
    ? (module.exports = !1)
    : (window.screenfull = !1);
})();
(function () {
  function a(a) {
    a = String(a);
    return a.charAt(0).toUpperCase() + a.slice(1);
  }

  function b(a, d) {
    var b = -1,
      c = a ? a.length : 0;
    if ("number" == typeof c && -1 < c && c <= A)
      for (; ++b < c; ) d(a[b], b, a);
    else f(a, d);
  }

  function c(d) {
    d = String(d).replace(/^ +| +$/g, "");
    return /^(?:webOS|i(?:OS|P))/.test(d) ? d : a(d);
  }

  function f(a, d) {
    for (var b in a) x.call(a, b) && d(a[b], b, a);
  }

  function k(d) {
    return null == d ? a(d) : B.call(d).slice(8, -1);
  }

  function n(a, d) {
    var b = null != a ? typeof a[d] : "number";
    return (
      !/^(?:boolean|number|string|undefined)$/.test(b) &&
      ("object" == b ? !!a[d] : !0)
    );
  }

  function h(a) {
    return String(a).replace(/([ -])(?!$)/g, "$1?");
  }

  function m(a, d) {
    var c = null;
    b(a, function (b, e) {
      c = d(c, b, e, a);
    });
    return c;
  }

  function e(a) {
    function d(d) {
      return m(d, function (d, b) {
        var r = b.pattern || h(b);
        !d &&
          (d =
            RegExp("\\b" + r + " *\\d+[.\\w_]*", "i").exec(a) ||
            RegExp("\\b" + r + " *\\w+-[\\w]*", "i").exec(a) ||
            RegExp(
              "\\b" + r + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)",
              "i"
            ).exec(a)) &&
          ((d = String(
            b.label && !RegExp(r, "i").test(b.label) ? b.label : d
          ).split("/"))[1] &&
            !/[\d.]+/.test(d[0]) &&
            (d[0] += " " + d[1]),
          (b = b.label || b),
          (d = c(
            d[0]
              .replace(RegExp(r, "i"), b)
              .replace(RegExp("; *(?:" + b + "[_-])?", "i"), " ")
              .replace(RegExp("(" + b + ")[-_.]?(\\w)", "i"), "$1 $2")
          )));
        return d;
      });
    }

    function b(d) {
      return m(d, function (d, b) {
        return (
          d ||
          (RegExp(
            b + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)",
            "i"
          ).exec(a) || 0)[1] ||
          null
        );
      });
    }
    var t = p,
      l = a && "object" == typeof a && "String" != k(a);
    l && ((t = a), (a = null));
    var y = t.navigator || {},
      r = y.userAgent || "";
    a || (a = r);
    var I = l
        ? !!y.likeChrome
        : /\bChrome\b/.test(a) && !/internal|\n/i.test(B.toString()),
      J = l ? "Object" : "ScriptBridgingProxyObject",
      R = l ? "Object" : "Environment",
      K = l && t.java ? "JavaPackage" : k(t.java),
      q = l ? "Object" : "RuntimeObject";
    R = (K = /\bJava/.test(K) && t.java) && k(t.environment) == R;
    var E = K ? "a" : "\u03b1",
      x = K ? "b" : "\u03b2",
      A = t.document || {},
      z = t.operamini || t.opera,
      O = w.test((O = l && z ? z["[[Class]]"] : k(z))) ? O : (z = null),
      g,
      P = a;
    l = [];
    var Q = null,
      H = a == r;
    r = H && z && "function" == typeof z.version && z.version();
    var C = (function (d) {
        return m(d, function (d, b) {
          return (
            d ||
            (RegExp("\\b" + (b.pattern || h(b)) + "\\b", "i").exec(a) &&
              (b.label || b))
          );
        });
      })([
        {
          label: "EdgeHTML",
          pattern: "Edge",
        },
        "Trident",
        {
          label: "WebKit",
          pattern: "AppleWebKit",
        },
        "iCab",
        "Presto",
        "NetFront",
        "Tasman",
        "KHTML",
        "Gecko",
      ]),
      u = (function (d) {
        return m(d, function (d, b) {
          return (
            d ||
            (RegExp("\\b" + (b.pattern || h(b)) + "\\b", "i").exec(a) &&
              (b.label || b))
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
        {
          label: "Microsoft Edge",
          pattern: "Edge",
        },
        "Midori",
        "Nook Browser",
        "PaleMoon",
        "PhantomJS",
        "Raven",
        "Rekonq",
        "RockMelt",
        {
          label: "Samsung Internet",
          pattern: "SamsungBrowser",
        },
        "SeaMonkey",
        {
          label: "Silk",
          pattern: "(?:Cloud9|Silk-Accelerated)",
        },
        "Sleipnir",
        "SlimBrowser",
        {
          label: "SRWare Iron",
          pattern: "Iron",
        },
        "Sunrise",
        "Swiftfox",
        "Waterfox",
        "WebPositive",
        "Opera Mini",
        {
          label: "Opera Mini",
          pattern: "OPiOS",
        },
        "Opera",
        {
          label: "Opera",
          pattern: "OPR",
        },
        "Chrome",
        {
          label: "Chrome Mobile",
          pattern: "(?:CriOS|CrMo)",
        },
        {
          label: "Firefox",
          pattern: "(?:Firefox|Minefield)",
        },
        {
          label: "Firefox for iOS",
          pattern: "FxiOS",
        },
        {
          label: "IE",
          pattern: "IEMobile",
        },
        {
          label: "IE",
          pattern: "MSIE",
        },
        "Safari",
      ]),
      D = d([
        {
          label: "BlackBerry",
          pattern: "BB10",
        },
        "BlackBerry",
        {
          label: "Galaxy S",
          pattern: "GT-I9000",
        },
        {
          label: "Galaxy S2",
          pattern: "GT-I9100",
        },
        {
          label: "Galaxy S3",
          pattern: "GT-I9300",
        },
        {
          label: "Galaxy S4",
          pattern: "GT-I9500",
        },
        {
          label: "Galaxy S5",
          pattern: "SM-G900",
        },
        {
          label: "Galaxy S6",
          pattern: "SM-G920",
        },
        {
          label: "Galaxy S6 Edge",
          pattern: "SM-G925",
        },
        {
          label: "Galaxy S7",
          pattern: "SM-G930",
        },
        {
          label: "Galaxy S7 Edge",
          pattern: "SM-G935",
        },
        "Google TV",
        "Lumia",
        "iPad",
        "iPod",
        "iPhone",
        "Kindle",
        {
          label: "Kindle Fire",
          pattern: "(?:Cloud9|Silk-Accelerated)",
        },
        "Nexus",
        "Nook",
        "PlayBook",
        "PlayStation Vita",
        "PlayStation",
        "TouchPad",
        "Transformer",
        {
          label: "Wii U",
          pattern: "WiiU",
        },
        "Wii",
        "Xbox One",
        {
          label: "Xbox 360",
          pattern: "Xbox",
        },
        "Xoom",
      ]),
      F = (function (d) {
        return m(d, function (d, b, r) {
          return (
            d ||
            ((b[D] ||
              b[/^[a-z]+(?: +[a-z]+\b)*/i.exec(D)] ||
              RegExp("\\b" + h(r) + "(?:\\b|\\w*\\d)", "i").exec(a)) &&
              r)
          );
        });
      })({
        Apple: {
          iPad: 1,
          iPhone: 1,
          iPod: 1,
        },
        Archos: {},
        Amazon: {
          Kindle: 1,
          "Kindle Fire": 1,
        },
        Asus: {
          Transformer: 1,
        },
        "Barnes & Noble": {
          Nook: 1,
        },
        BlackBerry: {
          PlayBook: 1,
        },
        Google: {
          "Google TV": 1,
          Nexus: 1,
        },
        HP: {
          TouchPad: 1,
        },
        HTC: {},
        LG: {},
        Microsoft: {
          Xbox: 1,
          "Xbox One": 1,
        },
        Motorola: {
          Xoom: 1,
        },
        Nintendo: {
          "Wii U": 1,
          Wii: 1,
        },
        Nokia: {
          Lumia: 1,
        },
        Samsung: {
          "Galaxy S": 1,
          "Galaxy S2": 1,
          "Galaxy S3": 1,
          "Galaxy S4": 1,
        },
        Sony: {
          PlayStation: 1,
          "PlayStation Vita": 1,
        },
      }),
      v = (function (d) {
        return m(d, function (d, b) {
          var r = b.pattern || h(b);
          if (
            !d &&
            (d = RegExp("\\b" + r + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(a))
          ) {
            var e = d,
              f = b.label || b,
              g = {
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
            r &&
              f &&
              /^Win/i.test(e) &&
              !/^Windows Phone /i.test(e) &&
              (g = g[/[\d.]+$/.exec(e)]) &&
              (e = "Windows " + g);
            e = String(e);
            r && f && (e = e.replace(RegExp(r, "i"), f));
            d = e = c(
              e
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
          return d;
        });
      })([
        "Windows Phone",
        "Android",
        "CentOS",
        {
          label: "Chrome OS",
          pattern: "CrOS",
        },
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
    C && (C = [C]);
    F && !D && (D = d([F]));
    if ((g = /\bGoogle TV\b/.exec(D))) D = g[0];
    /\bSimulator\b/i.test(a) && (D = (D ? D + " " : "") + "Simulator");
    "Opera Mini" == u &&
      /\bOPiOS\b/.test(a) &&
      l.push("running in Turbo/Uncompressed mode");
    "IE" == u && /\blike iPhone OS\b/.test(a)
      ? ((g = e(a.replace(/like iPhone OS/, ""))),
        (F = g.manufacturer),
        (D = g.product))
      : /^iP/.test(D)
      ? (u || (u = "Safari"),
        (v =
          "iOS" +
          ((g = / OS ([\d_]+)/i.exec(a)) ? " " + g[1].replace(/_/g, ".") : "")))
      : "Konqueror" != u || /buntu/i.test(v)
      ? (F &&
          "Google" != F &&
          ((/Chrome/.test(u) && !/\bMobile Safari\b/i.test(a)) ||
            /\bVita\b/.test(D))) ||
        (/\bAndroid\b/.test(v) && /^Chrome/.test(u) && /\bVersion\//i.test(a))
        ? ((u = "Android Browser"), (v = /\bAndroid\b/.test(v) ? v : "Android"))
        : "Silk" == u
        ? (/\bMobi/i.test(a) || ((v = "Android"), l.unshift("desktop mode")),
          /Accelerated *= *true/i.test(a) && l.unshift("accelerated"))
        : "PaleMoon" == u && (g = /\bFirefox\/([\d.]+)\b/.exec(a))
        ? l.push("identifying as Firefox " + g[1])
        : "Firefox" == u && (g = /\b(Mobile|Tablet|TV)\b/i.exec(a))
        ? (v || (v = "Firefox OS"), D || (D = g[1]))
        : !u ||
          (g = !/\bMinefield\b/i.test(a) && /\b(?:Firefox|Safari)\b/.exec(u))
        ? (u &&
            !D &&
            /[\/,]|^[^(]+?\)/.test(a.slice(a.indexOf(g + "/") + 8)) &&
            (u = null),
          (g = D || F || v) &&
            (D || F || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(v)) &&
            (u =
              /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(v) ? v : g) +
              " Browser"))
        : "Electron" == u &&
          (g = (/\bChrome\/([\d.]+)\b/.exec(a) || 0)[1]) &&
          l.push("Chromium " + g)
      : (v = "Kubuntu");
    r ||
      (r = b([
        "(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))",
        "Version",
        h(u),
        "(?:Firefox|Minefield|NetFront)",
      ]));
    if (
      (g =
        ("iCab" == C && 3 < parseFloat(r) && "WebKit") ||
        (/\bOpera\b/.test(u) && (/\bOPR\b/.test(a) ? "Blink" : "Presto")) ||
        (/\b(?:Midori|Nook|Safari)\b/i.test(a) &&
          !/^(?:Trident|EdgeHTML)$/.test(C) &&
          "WebKit") ||
        (!C && /\bMSIE\b/i.test(a) && ("Mac OS" == v ? "Tasman" : "Trident")) ||
        ("WebKit" == C && /\bPlayStation\b(?! Vita\b)/i.test(u) && "NetFront"))
    )
      C = [g];
    "IE" == u && (g = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(a) || 0)[1])
      ? ((u += " Mobile"),
        (v = "Windows Phone " + (/\+$/.test(g) ? g : g + ".x")),
        l.unshift("desktop mode"))
      : /\bWPDesktop\b/i.test(a)
      ? ((u = "IE Mobile"),
        (v = "Windows Phone 8.x"),
        l.unshift("desktop mode"),
        r || (r = (/\brv:([\d.]+)/.exec(a) || 0)[1]))
      : "IE" != u &&
        "Trident" == C &&
        (g = /\brv:([\d.]+)/.exec(a)) &&
        (u && l.push("identifying as " + u + (r ? " " + r : "")),
        (u = "IE"),
        (r = g[1]));
    if (H) {
      if (n(t, "global"))
        if (
          (K &&
            ((g = K.lang.System),
            (P = g.getProperty("os.arch")),
            (v =
              v ||
              g.getProperty("os.name") + " " + g.getProperty("os.version"))),
          R)
        ) {
          try {
            (r = t.require("ringo/engine").version.join(".")), (u = "RingoJS");
          } catch (T) {
            (g = t.system) &&
              g.global.system == t.system &&
              ((u = "Narwhal"), v || (v = g[0].os || null));
          }
          u || (u = "Rhino");
        } else
          "object" == typeof t.process &&
            !t.process.browser &&
            (g = t.process) &&
            ("object" == typeof g.versions &&
              ("string" == typeof g.versions.electron
                ? (l.push("Node " + g.versions.node),
                  (u = "Electron"),
                  (r = g.versions.electron))
                : "string" == typeof g.versions.nw &&
                  (l.push("Chromium " + r, "Node " + g.versions.node),
                  (u = "NW.js"),
                  (r = g.versions.nw))),
            u ||
              ((u = "Node.js"),
              (P = g.arch),
              (v = g.platform),
              (r = (r = /[\d.]+/.exec(g.version)) ? r[0] : null)));
      else
        k((g = t.runtime)) == J
          ? ((u = "Adobe AIR"), (v = g.flash.system.Capabilities.os))
          : k((g = t.phantom)) == q
          ? ((u = "PhantomJS"),
            (r =
              (g = g.version || null) &&
              g.major + "." + g.minor + "." + g.patch))
          : "number" == typeof A.documentMode &&
            (g = /\bTrident\/(\d+)/i.exec(a))
          ? ((r = [r, A.documentMode]),
            (g = +g[1] + 4) != r[1] &&
              (l.push("IE " + r[1] + " mode"), C && (C[1] = ""), (r[1] = g)),
            (r = "IE" == u ? String(r[1].toFixed(1)) : r[0]))
          : "number" == typeof A.documentMode &&
            /^(?:Chrome|Firefox)\b/.test(u) &&
            (l.push("masking as " + u + " " + r),
            (u = "IE"),
            (r = "11.0"),
            (C = ["Trident"]),
            (v = "Windows"));
      v = v && c(v);
    }
    r &&
      (g =
        /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(r) ||
        /(?:alpha|beta)(?: ?\d)?/i.exec(a + ";" + (H && y.appMinorVersion)) ||
        (/\bMinefield\b/i.test(a) && "a")) &&
      ((Q = /b/i.test(g) ? "beta" : "alpha"),
      (r =
        r.replace(RegExp(g + "\\+?$"), "") +
        ("beta" == Q ? x : E) +
        (/\d+\+?/.exec(g) || "")));
    if (
      "Fennec" == u ||
      ("Firefox" == u && /\b(?:Android|Firefox OS)\b/.test(v))
    )
      u = "Firefox Mobile";
    else if ("Maxthon" == u && r) r = r.replace(/\.[\d.]+/, ".x");
    else if (/\bXbox\b/i.test(D))
      "Xbox 360" == D && (v = null),
        "Xbox 360" == D && /\bIEMobile\b/.test(a) && l.unshift("mobile mode");
    else if (
      (!/^(?:Chrome|IE|Opera)$/.test(u) &&
        (!u || D || /Browser|Mobi/.test(u))) ||
      ("Windows CE" != v && !/Mobi/i.test(a))
    )
      if ("IE" == u && H)
        try {
          null === t.external && l.unshift("platform preview");
        } catch (T) {
          l.unshift("embedded");
        }
      else
        (/\bBlackBerry\b/.test(D) || /\bBB10\b/.test(a)) &&
        (g =
          (RegExp(D.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(a) ||
            0)[1] || r)
          ? ((g = [g, /BB10/.test(a)]),
            (v =
              (g[1] ? ((D = null), (F = "BlackBerry")) : "Device Software") +
              " " +
              g[0]),
            (r = null))
          : this != f &&
            "Wii" != D &&
            ((H && z) ||
              (/Opera/.test(u) && /\b(?:MSIE|Firefox)\b/i.test(a)) ||
              ("Firefox" == u && /\bOS X (?:\d+\.){2,}/.test(v)) ||
              ("IE" == u &&
                ((v && !/^Win/.test(v) && 5.5 < r) ||
                  (/\bWindows XP\b/.test(v) && 8 < r) ||
                  (8 == r && !/\bTrident\b/.test(a))))) &&
            !w.test((g = e.call(f, a.replace(w, "") + ";"))) &&
            g.name &&
            ((g = "ing as " + g.name + ((g = g.version) ? " " + g : "")),
            w.test(u)
              ? (/\bIE\b/.test(g) && "Mac OS" == v && (v = null),
                (g = "identify" + g))
              : ((g = "mask" + g),
                (u = O ? c(O.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera"),
                /\bIE\b/.test(g) && (v = null),
                H || (r = null)),
            (C = ["Presto"]),
            l.push(g));
    else u += " Mobile";
    if ((g = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(a) || 0)[1])) {
      g = [parseFloat(g.replace(/\.(\d)$/, ".0$1")), g];
      if ("Safari" == u && "+" == g[1].slice(-1))
        (u = "WebKit Nightly"), (Q = "alpha"), (r = g[1].slice(0, -1));
      else if (
        r == g[1] ||
        r == (g[2] = (/\bSafari\/([\d.]+\+?)/i.exec(a) || 0)[1])
      )
        r = null;
      g[1] = (/\bChrome\/([\d.]+)/i.exec(a) || 0)[1];
      537.36 == g[0] &&
        537.36 == g[2] &&
        28 <= parseFloat(g[1]) &&
        "WebKit" == C &&
        (C = ["Blink"]);
      H && (I || g[1])
        ? (C && (C[1] = "like Chrome"),
          (g =
            g[1] ||
            ((g = g[0]),
            530 > g
              ? 1
              : 532 > g
              ? 2
              : 532.05 > g
              ? 3
              : 533 > g
              ? 4
              : 534.03 > g
              ? 5
              : 534.07 > g
              ? 6
              : 534.1 > g
              ? 7
              : 534.13 > g
              ? 8
              : 534.16 > g
              ? 9
              : 534.24 > g
              ? 10
              : 534.3 > g
              ? 11
              : 535.01 > g
              ? 12
              : 535.02 > g
              ? "13+"
              : 535.07 > g
              ? 15
              : 535.11 > g
              ? 16
              : 535.19 > g
              ? 17
              : 536.05 > g
              ? 18
              : 536.1 > g
              ? 19
              : 537.01 > g
              ? 20
              : 537.11 > g
              ? "21+"
              : 537.13 > g
              ? 23
              : 537.18 > g
              ? 24
              : 537.24 > g
              ? 25
              : 537.36 > g
              ? 26
              : "Blink" != C
              ? "27"
              : "28")))
        : (C && (C[1] = "like Safari"),
          (g =
            ((g = g[0]),
            400 > g
              ? 1
              : 500 > g
              ? 2
              : 526 > g
              ? 3
              : 533 > g
              ? 4
              : 534 > g
              ? "4+"
              : 535 > g
              ? 5
              : 537 > g
              ? 6
              : 538 > g
              ? 7
              : 601 > g
              ? 8
              : "8")));
      C &&
        (C[1] +=
          " " + (g += "number" == typeof g ? ".x" : /[.+]/.test(g) ? "" : "+"));
      "Safari" == u && (!r || 45 < parseInt(r)) && (r = g);
    }
    "Opera" == u && (g = /\bzbov|zvav$/.exec(v))
      ? ((u += " "),
        l.unshift("desktop mode"),
        "zvav" == g ? ((u += "Mini"), (r = null)) : (u += "Mobile"),
        (v = v.replace(RegExp(" *" + g + "$"), "")))
      : "Safari" == u &&
        /\bChrome\b/.exec(C && C[1]) &&
        (l.unshift("desktop mode"),
        (u = "Chrome Mobile"),
        (r = null),
        /\bOS X\b/.test(v) ? ((F = "Apple"), (v = "iOS 4.3+")) : (v = null));
    r &&
      0 == r.indexOf((g = /[\d.]+$/.exec(v))) &&
      -1 < a.indexOf("/" + g + "-") &&
      (v = String(v.replace(g, "")).replace(/^ +| +$/g, ""));
    C &&
      !/\b(?:Avant|Nook)\b/.test(u) &&
      (/Browser|Lunascape|Maxthon/.test(u) ||
        ("Safari" != u && /^iOS/.test(v) && /\bSafari\b/.test(C[1])) ||
        (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
          u
        ) &&
          C[1])) &&
      (g = C[C.length - 1]) &&
      l.push(g);
    l.length && (l = ["(" + l.join("; ") + ")"]);
    F && D && 0 > D.indexOf(F) && l.push("on " + F);
    D && l.push((/^on /.test(l[l.length - 1]) ? "" : "on ") + D);
    if (v) {
      var S =
        (g = / ([\d.+]+)$/.exec(v)) &&
        "/" == v.charAt(v.length - g[0].length - 1);
      v = {
        architecture: 32,
        family: g && !S ? v.replace(g[0], "") : v,
        version: g ? g[1] : null,
        toString: function () {
          var a = this.version;
          return (
            this.family +
            (a && !S ? " " + a : "") +
            (64 == this.architecture ? " 64-bit" : "")
          );
        },
      };
    }
    (g = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(P)) && !/\bi686\b/i.test(P)
      ? (v &&
          ((v.architecture = 64),
          (v.family = v.family.replace(RegExp(" *" + g), ""))),
        u &&
          (/\bWOW64\b/i.test(a) ||
            (H &&
              /\w(?:86|32)$/.test(y.cpuClass || y.platform) &&
              !/\bWin64; x64\b/i.test(a))) &&
          l.unshift("32-bit"))
      : v &&
        /^OS X/.test(v.family) &&
        "Chrome" == u &&
        39 <= parseFloat(r) &&
        (v.architecture = 64);
    a || (a = null);
    t = {};
    t.description = a;
    t.layout = C && C[0];
    t.manufacturer = F;
    t.name = u;
    t.prerelease = Q;
    t.product = D;
    t.ua = a;
    t.version = u && r;
    t.os = v || {
      architecture: null,
      family: null,
      version: null,
      toString: function () {
        return "null";
      },
    };
    t.parse = e;
    t.toString = function () {
      return this.description || "";
    };
    t.version && l.unshift(r);
    t.name && l.unshift(u);
    v &&
      u &&
      (v != String(v).split(" ")[0] || (v != u.split(" ")[0] && !D)) &&
      l.push(D ? "(" + v + ")" : "on " + v);
    l.length && (t.description = l.join(" "));
    return t;
  }
  var d = {
      function: !0,
      object: !0,
    },
    p = (d[typeof window] && window) || this,
    y = d[typeof exports] && exports;
  d = d[typeof module] && module && !module.nodeType && module;
  var l = y && d && "object" == typeof global && global;
  !l || (l.global !== l && l.window !== l && l.self !== l) || (p = l);
  var A = Math.pow(2, 53) - 1,
    w = /\bOpera/;
  l = Object.prototype;
  var x = l.hasOwnProperty,
    B = l.toString,
    z = e();
  "function" == typeof define && "object" == typeof define.amd && define.amd
    ? ((p.platform = z),
      define(function () {
        return z;
      }))
    : y && d
    ? f(z, function (a, d) {
        y[d] = a;
      })
    : (p.platform = z);
}).call(this);

function buildIOSMeta() {
  for (
    var a = [
        {
          name: "viewport",
          content:
            "width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no",
        },
        {
          name: "apple-mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "apple-mobile-web-app-status-bar-style",
          content: "black",
        },
      ],
      b = 0;
    b < a.length;
    b++
  ) {
    var c = document.createElement("meta");
    c.name = a[b].name;
    c.content = a[b].content;
    var f = window.document.head.querySelector('meta[name="' + c.name + '"]');
    f && f.parentNode.removeChild(f);
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
$(document).ready(function () {
  platform &&
    "iPhone" === platform.product &&
    !iosInIframe() &&
    (buildIOSFullscreenPanel(), buildIOSMeta());
});
jQuery(window).resize(function () {
  platform && "iPhone" === platform.product && !iosInIframe() && iosResize();
});
var s_iOffsetX,
  s_iOffsetY,
  s_iScaleFactor = 1,
  s_bIsIphone = !1;
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
  for (
    -1 !== navigator.userAgent.toLowerCase().indexOf("iphone") &&
    (s_bIsIphone = !0);
    a.length;

  )
    if (navigator.platform === a.pop()) return !0;
  return (s_bIsIphone = !1);
}

function getSize(a) {
  var b = a.toLowerCase(),
    c = window.document,
    f = c.documentElement;
  if (void 0 === window["inner" + a]) a = f["client" + a];
  else if (window["inner" + a] != f["client" + a]) {
    var k = c.createElement("body");
    k.id = "vpw-test-b";
    k.style.cssText = "overflow:scroll";
    var n = c.createElement("div");
    n.id = "vpw-test-d";
    n.style.cssText = "position:absolute;top:-1000px";
    n.innerHTML =
      "<style>@media(" +
      b +
      ":" +
      f["client" + a] +
      "px){body#vpw-test-b div#vpw-test-d{" +
      b +
      ":7px!important}}</style>";
    k.appendChild(n);
    f.insertBefore(k, c.head);
    a = 7 == n["offset" + a] ? f["client" + a] : window["inner" + a];
    f.removeChild(k);
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
      "safari" === platform.name.toLowerCase()
        ? getIOSWindowHeight()
        : getSize("Height");
    var b = getSize("Width");
    _checkOrientation(b, a);
    var c = Math.min(a / CANVAS_HEIGHT, b / CANVAS_WIDTH),
      f = CANVAS_WIDTH * c;
    c *= CANVAS_HEIGHT;
    if (c < a) {
      var k = a - c;
      c += k;
      f += (CANVAS_WIDTH / CANVAS_HEIGHT) * k;
    } else
      f < b &&
        ((k = b - f), (f += k), (c += (CANVAS_HEIGHT / CANVAS_WIDTH) * k));
    k = a / 2 - c / 2;
    var n = b / 2 - f / 2,
      h = CANVAS_WIDTH / f;
    if (n * h < -EDGEBOARD_X || k * h < -EDGEBOARD_Y)
      (c = Math.min(
        a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y),
        b / (CANVAS_WIDTH - 2 * EDGEBOARD_X)
      )),
        (f = CANVAS_WIDTH * c),
        (c *= CANVAS_HEIGHT),
        (k = (a - c) / 2),
        (n = (b - f) / 2),
        (h = CANVAS_WIDTH / f);
    s_iOffsetX = -1 * n * h;
    s_iOffsetY = -1 * k * h;
    0 <= k && (s_iOffsetY = 0);
    0 <= n && (s_iOffsetX = 0);
    null !== s_oInterface &&
      s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    s_bIsIphone
      ? ((canvas = document.getElementById("canvas")),
        (s_oStage.canvas.width = 2 * f),
        (s_oStage.canvas.height = 2 * c),
        (canvas.style.width = f + "px"),
        (canvas.style.height = c + "px"),
        (b = Math.min(f / CANVAS_WIDTH, c / CANVAS_HEIGHT)),
        (s_iScaleFactor = 2 * b),
        (s_oStage.scaleX = s_oStage.scaleY = 2 * b))
      : s_bMobile || isChrome()
      ? ($("#canvas").css("width", f + "px"),
        $("#canvas").css("height", c + "px"))
      : ((s_oStage.canvas.width = f),
        (s_oStage.canvas.height = c),
        (s_iScaleFactor = Math.min(f / CANVAS_WIDTH, c / CANVAS_HEIGHT)),
        (s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor));
    0 > k || (k = (a - c) / 2);
    $("#canvas").css("top", k + "px");
    $("#canvas").css("left", n + "px");
    fullscreenHandler();
  }
}

function _checkOrientation(a, b) {
  s_bMobile &&
    ENABLE_CHECK_ORIENTATION &&
    (a > b
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

function createBitmap(a, b, c) {
  var f = new createjs.Bitmap(a),
    k = new createjs.Shape();
  b && c
    ? k.graphics.beginFill("#fff").drawRect(0, 0, b, c)
    : k.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
  f.hitArea = k;
  return f;
}

function createSprite(a, b, c, f, k, n) {
  a = null !== b ? new createjs.Sprite(a, b) : new createjs.Sprite(a);
  b = new createjs.Shape();
  b.graphics.beginFill("#000000").drawRect(-c, -f, k, n);
  a.hitArea = b;
  return a;
}

function randomFloatBetween(a, b, c) {
  "undefined" === typeof c && (c = 2);
  return parseFloat(Math.min(a + Math.random() * (b - a), b).toFixed(c));
}

function shuffle(a) {
  for (var b = a.length, c, f; 0 !== b; )
    (f = Math.floor(Math.random() * b)),
      --b,
      (c = a[b]),
      (a[b] = a[f]),
      (a[f] = c);
  return a;
}

function formatTime(a) {
  a /= 1e3;
  var b = Math.floor(a / 60);
  a = parseFloat(a - 60 * b).toFixed(1);
  var c = "";
  c = 10 > b ? c + ("0" + b + ":") : c + (b + ":");
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
      var b = document.createEvent("MouseEvents");
      b.initEvent("click", !0, !0);
      a.dispatchEvent(b);
    }
  },
};

function playSound(a, b, c) {
  return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
    ? (s_aSounds[a].play(),
      s_aSounds[a].volume(b),
      s_aSounds[a].loop(c),
      s_aSounds[a])
    : null;
}

function stopSound(a) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].stop();
}

function setVolume(a, b) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].volume(b);
}

function setMute(a, b) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].mute(b);
}

function ctlArcadeResume() {
  null !== s_oMain && s_oMain.startUpdate();
}

function ctlArcadePause() {
  null !== s_oMain && s_oMain.stopUpdate();
}

function getParamValue(a) {
  for (
    var b = window.location.search.substring(1).split("&"), c = 0;
    c < b.length;
    c++
  ) {
    var f = b[c].split("=");
    if (f[0] == a) return f[1];
  }
}
(function () {
  function a(a) {
    var c = {
      focus: "visible",
      focusin: "visible",
      pageshow: "visible",
      blur: "hidden",
      focusout: "hidden",
      pagehide: "hidden",
    };
    a = a || window.event;
    a.type in c
      ? (document.body.className = c[a.type])
      : ((document.body.className = this[b] ? "hidden" : "visible"),
        "hidden" === document.body.className
          ? s_oMain.stopUpdate()
          : s_oMain.startUpdate());
  }
  var b = "hidden";
  b in document
    ? document.addEventListener("visibilitychange", a)
    : (b = "mozHidden") in document
    ? document.addEventListener("mozvisibilitychange", a)
    : (b = "webkitHidden") in document
    ? document.addEventListener("webkitvisibilitychange", a)
    : (b = "msHidden") in document
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
    screenfull.enabled &&
    ((s_bFullscreen = screenfull.isFullscreen),
    null !== s_oInterface && s_oInterface.resetFullscreenBut(),
    null !== s_oMenu && s_oMenu.resetFullscreenBut());
}
if (screenfull.enabled)
  screenfull.on("change", function () {
    s_bFullscreen = screenfull.isFullscreen;
    null !== s_oInterface && s_oInterface.resetFullscreenBut();
    null !== s_oMenu && s_oMenu.resetFullscreenBut();
  });

function CSpriteLibrary() {
  var a = {},
    b,
    c,
    f,
    k,
    n,
    h;
  this.init = function (a, e, d) {
    b = {};
    f = c = 0;
    k = a;
    n = e;
    h = d;
  };
  this.addSprite = function (f, e) {
    if (!a.hasOwnProperty(f)) {
      var d = new Image();
      a[f] = b[f] = {
        szPath: e,
        oSprite: d,
        bLoaded: !1,
      };
      c++;
    }
  };
  this.getSprite = function (b) {
    return a.hasOwnProperty(b) ? a[b].oSprite : null;
  };
  this._onSpritesLoaded = function () {
    c = 0;
    n.call(h);
  };
  this._onSpriteLoaded = function () {
    k.call(h);
    ++f === c && this._onSpritesLoaded();
  };
  this.loadSprites = function () {
    for (var a in b)
      (b[a].oSprite.oSpriteLibrary = this),
        (b[a].oSprite.szKey = a),
        (b[a].oSprite.onload = function () {
          this.oSpriteLibrary.setLoaded(this.szKey);
          this.oSpriteLibrary._onSpriteLoaded(this.szKey);
        }),
        (b[a].oSprite.onerror = function (a) {
          var d = a.currentTarget;
          setTimeout(function () {
            b[d.szKey].oSprite.src = b[d.szKey].szPath;
          }, 500);
        }),
        (b[a].oSprite.src = b[a].szPath);
  };
  this.setLoaded = function (b) {
    a[b].bLoaded = !0;
  };
  this.isLoaded = function (b) {
    return a[b].bLoaded;
  };
  this.getNumSprites = function () {
    return c;
  };
}
var CANVAS_WIDTH = 1500,
  CANVAS_HEIGHT = 640,
  EDGEBOARD_X = 300,
  EDGEBOARD_Y = 0,
  FPS_TIME = 1e3 / 24,
  DISABLE_SOUND_MOBILE = !1,
  FONT_GAME = "arialbold",
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
  REEL_OFFSET_Y = 84,
  NUM_REELS = 5,
  NUM_ROWS = 3,
  NUM_SYMBOLS = 8,
  WILD_SYMBOL = 8,
  NUM_PAYLINES = 20,
  SYMBOL_SIZE = 140,
  SPACE_BETWEEN_SYMBOLS = 10,
  MAX_FRAMES_REEL_EASE = 16,
  MIN_REEL_LOOPS,
  REEL_DELAY,
  REEL_START_Y = REEL_OFFSET_Y - 3 * SYMBOL_SIZE,
  REEL_ARRIVAL_Y = REEL_OFFSET_Y + 3 * SYMBOL_SIZE,
  TIME_SHOW_WIN,
  TIME_SHOW_ALL_WINS,
  MIN_BET = 0.05,
  MAX_BET = 0.5,
  TOTAL_MONEY,
  WIN_OCCURRENCE,
  SLOT_CASH,
  MIN_WIN,
  PAYTABLE_VALUES,
  ENABLE_FULLSCREEN,
  ENABLE_CHECK_ORIENTATION,
  SHOW_CREDITS;

function CSlotSettings() {
  this._init = function () {
    this._initSymbolSpriteSheets();
    this._initPaylines();
    this._initSymbolWin();
    this._initSymbolAnims();
    this._initSymbolsOccurence();
  };
  this._initSymbolSpriteSheets = function () {
    s_aSymbolData = [];
    for (var a = 1; a < NUM_SYMBOLS + 1; a++) {
      var b = {
        images: [s_oSpriteLibrary.getSprite("symbol_" + a)],
        frames: {
          width: SYMBOL_SIZE,
          height: SYMBOL_SIZE,
          regX: 0,
          regY: 0,
        },
        animations: {
          static: [0, 1],
          moving: [1, 2],
        },
      };
      s_aSymbolData[a] = new createjs.SpriteSheet(b);
    }
  };
  this._initPaylines = function () {
    s_aPaylineCombo = [
      [
        {
          row: 1,
          col: 0,
        },
        {
          row: 1,
          col: 1,
        },
        {
          row: 1,
          col: 2,
        },
        {
          row: 1,
          col: 3,
        },
        {
          row: 1,
          col: 4,
        },
      ],
      [
        {
          row: 0,
          col: 0,
        },
        {
          row: 0,
          col: 1,
        },
        {
          row: 0,
          col: 2,
        },
        {
          row: 0,
          col: 3,
        },
        {
          row: 0,
          col: 4,
        },
      ],
      [
        {
          row: 2,
          col: 0,
        },
        {
          row: 2,
          col: 1,
        },
        {
          row: 2,
          col: 2,
        },
        {
          row: 2,
          col: 3,
        },
        {
          row: 2,
          col: 4,
        },
      ],
      [
        {
          row: 0,
          col: 0,
        },
        {
          row: 1,
          col: 1,
        },
        {
          row: 2,
          col: 2,
        },
        {
          row: 1,
          col: 3,
        },
        {
          row: 0,
          col: 4,
        },
      ],
      [
        {
          row: 2,
          col: 0,
        },
        {
          row: 1,
          col: 1,
        },
        {
          row: 0,
          col: 2,
        },
        {
          row: 1,
          col: 3,
        },
        {
          row: 2,
          col: 4,
        },
      ],
      [
        {
          row: 1,
          col: 0,
        },
        {
          row: 0,
          col: 1,
        },
        {
          row: 0,
          col: 2,
        },
        {
          row: 0,
          col: 3,
        },
        {
          row: 1,
          col: 4,
        },
      ],
      [
        {
          row: 1,
          col: 0,
        },
        {
          row: 2,
          col: 1,
        },
        {
          row: 2,
          col: 2,
        },
        {
          row: 2,
          col: 3,
        },
        {
          row: 1,
          col: 4,
        },
      ],
      [
        {
          row: 0,
          col: 0,
        },
        {
          row: 0,
          col: 1,
        },
        {
          row: 1,
          col: 2,
        },
        {
          row: 2,
          col: 3,
        },
        {
          row: 2,
          col: 4,
        },
      ],
      [
        {
          row: 2,
          col: 0,
        },
        {
          row: 2,
          col: 1,
        },
        {
          row: 1,
          col: 2,
        },
        {
          row: 0,
          col: 3,
        },
        {
          row: 0,
          col: 4,
        },
      ],
      [
        {
          row: 1,
          col: 0,
        },
        {
          row: 2,
          col: 1,
        },
        {
          row: 1,
          col: 2,
        },
        {
          row: 0,
          col: 3,
        },
        {
          row: 1,
          col: 4,
        },
      ],
      [
        {
          row: 2,
          col: 0,
        },
        {
          row: 0,
          col: 1,
        },
        {
          row: 1,
          col: 2,
        },
        {
          row: 2,
          col: 3,
        },
        {
          row: 1,
          col: 4,
        },
      ],
      [
        {
          row: 0,
          col: 0,
        },
        {
          row: 1,
          col: 1,
        },
        {
          row: 1,
          col: 2,
        },
        {
          row: 1,
          col: 3,
        },
        {
          row: 0,
          col: 4,
        },
      ],
      [
        {
          row: 2,
          col: 0,
        },
        {
          row: 1,
          col: 1,
        },
        {
          row: 1,
          col: 2,
        },
        {
          row: 1,
          col: 3,
        },
        {
          row: 2,
          col: 4,
        },
      ],
      [
        {
          row: 0,
          col: 0,
        },
        {
          row: 1,
          col: 1,
        },
        {
          row: 0,
          col: 2,
        },
        {
          row: 1,
          col: 3,
        },
        {
          row: 0,
          col: 4,
        },
      ],
      [
        {
          row: 2,
          col: 0,
        },
        {
          row: 1,
          col: 1,
        },
        {
          row: 2,
          col: 2,
        },
        {
          row: 1,
          col: 3,
        },
        {
          row: 2,
          col: 4,
        },
      ],
      [
        {
          row: 1,
          col: 0,
        },
        {
          row: 1,
          col: 1,
        },
        {
          row: 0,
          col: 2,
        },
        {
          row: 1,
          col: 3,
        },
        {
          row: 1,
          col: 4,
        },
      ],
      [
        {
          row: 1,
          col: 0,
        },
        {
          row: 1,
          col: 1,
        },
        {
          row: 2,
          col: 2,
        },
        {
          row: 1,
          col: 3,
        },
        {
          row: 1,
          col: 4,
        },
      ],
      [
        {
          row: 0,
          col: 0,
        },
        {
          row: 0,
          col: 1,
        },
        {
          row: 2,
          col: 2,
        },
        {
          row: 0,
          col: 3,
        },
        {
          row: 0,
          col: 4,
        },
      ],
      [
        {
          row: 2,
          col: 0,
        },
        {
          row: 2,
          col: 1,
        },
        {
          row: 0,
          col: 2,
        },
        {
          row: 2,
          col: 3,
        },
        {
          row: 2,
          col: 4,
        },
      ],
      [
        {
          row: 0,
          col: 0,
        },
        {
          row: 2,
          col: 1,
        },
        {
          row: 2,
          col: 2,
        },
        {
          row: 2,
          col: 3,
        },
        {
          row: 0,
          col: 4,
        },
      ],
    ];
  };
  this._initSymbolWin = function () {
    s_aSymbolWin = [];
    s_aSymbolWin[0] = PAYTABLE_VALUES[0];
    s_aSymbolWin[1] = PAYTABLE_VALUES[1];
    s_aSymbolWin[2] = PAYTABLE_VALUES[2];
    s_aSymbolWin[3] = PAYTABLE_VALUES[3];
    s_aSymbolWin[4] = PAYTABLE_VALUES[4];
    s_aSymbolWin[5] = PAYTABLE_VALUES[5];
    s_aSymbolWin[6] = PAYTABLE_VALUES[6];
  };
  this._initSymbolAnims = function () {
    s_aSymbolAnims = [];
    var a = {
      framerate: 20,
      images: [s_oSpriteLibrary.getSprite("symbol_1_anim")],
      frames: {
        width: SYMBOL_SIZE,
        height: SYMBOL_SIZE,
        regX: 0,
        regY: 0,
      },
      animations: {
        static: [0, 1],
        anim: [1, 14],
      },
    };
    s_aSymbolAnims[0] = new createjs.SpriteSheet(a);
    a = {
      framerate: 20,
      images: [s_oSpriteLibrary.getSprite("symbol_2_anim")],
      frames: {
        width: SYMBOL_SIZE,
        height: SYMBOL_SIZE,
        regX: 0,
        regY: 0,
      },
      animations: {
        static: [0, 1],
        anim: [1, 14],
      },
    };
    s_aSymbolAnims[1] = new createjs.SpriteSheet(a);
    a = {
      framerate: 20,
      images: [s_oSpriteLibrary.getSprite("symbol_3_anim")],
      frames: {
        width: SYMBOL_SIZE,
        height: SYMBOL_SIZE,
        regX: 0,
        regY: 0,
      },
      animations: {
        static: [0, 1],
        anim: [1, 14],
      },
    };
    s_aSymbolAnims[2] = new createjs.SpriteSheet(a);
    a = {
      framerate: 20,
      images: [s_oSpriteLibrary.getSprite("symbol_4_anim")],
      frames: {
        width: SYMBOL_SIZE,
        height: SYMBOL_SIZE,
        regX: 0,
        regY: 0,
      },
      animations: {
        static: [0, 1],
        anim: [1, 14],
      },
    };
    s_aSymbolAnims[3] = new createjs.SpriteSheet(a);
    a = {
      framerate: 20,
      images: [s_oSpriteLibrary.getSprite("symbol_5_anim")],
      frames: {
        width: SYMBOL_SIZE,
        height: SYMBOL_SIZE,
        regX: 0,
        regY: 0,
      },
      animations: {
        static: [0, 1],
        anim: [1, 14],
      },
    };
    s_aSymbolAnims[4] = new createjs.SpriteSheet(a);
    a = {
      framerate: 20,
      images: [s_oSpriteLibrary.getSprite("symbol_6_anim")],
      frames: {
        width: SYMBOL_SIZE,
        height: SYMBOL_SIZE,
        regX: 0,
        regY: 0,
      },
      animations: {
        static: [0, 1],
        anim: [1, 14],
      },
    };
    s_aSymbolAnims[5] = new createjs.SpriteSheet(a);
    a = {
      framerate: 20,
      images: [s_oSpriteLibrary.getSprite("symbol_7_anim")],
      frames: {
        width: SYMBOL_SIZE,
        height: SYMBOL_SIZE,
        regX: 0,
        regY: 0,
      },
      animations: {
        static: [0, 1],
        anim: [1, 14],
      },
    };
    s_aSymbolAnims[6] = new createjs.SpriteSheet(a);
    a = {
      framerate: 20,
      images: [s_oSpriteLibrary.getSprite("symbol_8_anim")],
      frames: {
        width: SYMBOL_SIZE,
        height: SYMBOL_SIZE,
        regX: 0,
        regY: 0,
      },
      animations: {
        static: [0, 1],
        anim: [1, 14],
      },
    };
    s_aSymbolAnims[7] = new createjs.SpriteSheet(a);
  };
  this._initSymbolsOccurence = function () {
    s_aRandSymbols = [];
    var a;
    for (a = 0; 1 > a; a++) s_aRandSymbols.push(1);
    for (a = 0; 2 > a; a++) s_aRandSymbols.push(2);
    for (a = 0; 3 > a; a++) s_aRandSymbols.push(3);
    for (a = 0; 4 > a; a++) s_aRandSymbols.push(4);
    for (a = 0; 4 > a; a++) s_aRandSymbols.push(5);
    for (a = 0; 6 > a; a++) s_aRandSymbols.push(6);
    for (a = 0; 6 > a; a++) s_aRandSymbols.push(7);
    for (a = 0; 1 > a; a++) s_aRandSymbols.push(8);
  };
  this._init();
}
var s_aSymbolData,
  s_aPaylineCombo,
  s_aSymbolWin,
  s_aSymbolAnims,
  s_aRandSymbols;
TEXT_MONEY = "MONEY";
TEXT_PLAY = "PLAY";
TEXT_BET = "BET";
TEXT_COIN = "COIN";
TEXT_MAX_BET = "MAX BET";
TEXT_INFO = "INFO";
TEXT_LINES = "LINES";
TEXT_SPIN = "SPIN";
TEXT_WIN = "WIN";
TEXT_HELP_WILD =
  "THIS SIMBOL IS A JOLLY WHICH CAN REPLACE ANY OTHER SYMBOL TO MAKE UP A COMBO";
TEXT_CREDITS_DEVELOPED = "DEVELOPED BY";
TEXT_CURRENCY = "$";
TEXT_PRELOADER_CONTINUE = "START";
TEXT_SHARE_IMAGE = "200x200.jpg";
TEXT_SHARE_TITLE = "Congratulations!";
TEXT_SHARE_MSG1 = "You collected <strong>";
TEXT_SHARE_MSG2 =
  " points</strong>!<br><br>Share your score with your friends!";
TEXT_SHARE_SHARE1 = "My score is ";
TEXT_SHARE_SHARE2 = " points! Can you do better?";

function CPreloader() {
  var a, b, c, f, k, n, h, m, e, d;
  this._init = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
    s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
    s_oSpriteLibrary.addSprite("but_start", "./sprites/but_start.png");
    s_oSpriteLibrary.loadSprites();
    d = new createjs.Container();
    s_oStage.addChild(d);
  };
  this.unload = function () {
    d.removeAllChildren();
    e.unload();
  };
  this._onImagesLoaded = function () {};
  this._onAllImagesLoaded = function () {
    this.attachSprites();
    s_oMain.preloaderReady();
  };
  this.attachSprites = function () {
    var p = new createjs.Shape();
    p.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    d.addChild(p);
    p = s_oSpriteLibrary.getSprite("200x200");
    h = createBitmap(p);
    h.regX = 0.5 * p.width;
    h.regY = 0.5 * p.height;
    h.x = CANVAS_WIDTH / 2;
    h.y = CANVAS_HEIGHT / 2 - 140;
    d.addChild(h);
    m = new createjs.Shape();
    m.graphics
      .beginFill("rgba(0,0,0,0.01)")
      .drawRoundRect(h.x - 100, h.y - 100, 200, 200, 10);
    d.addChild(m);
    h.mask = m;
    p = s_oSpriteLibrary.getSprite("progress_bar");
    f = createBitmap(p);
    f.x = CANVAS_WIDTH / 2 - p.width / 2;
    f.y = CANVAS_HEIGHT / 2 + 90;
    d.addChild(f);
    a = p.width;
    b = p.height;
    k = new createjs.Shape();
    k.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(f.x, f.y, 1, b);
    d.addChild(k);
    f.mask = k;
    c = new createjs.Text("", "30px " + FONT_GAME, "#fff");
    c.x = CANVAS_WIDTH / 2;
    c.y = CANVAS_HEIGHT / 2 + 140;
    c.textBaseline = "alphabetic";
    c.textAlign = "center";
    d.addChild(c);
    p = s_oSpriteLibrary.getSprite("but_start");
    e = new CTextButton(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 40,
      p,
      TEXT_PRELOADER_CONTINUE,
      "Arial",
      "#000",
      50,
      d
    );
    e.addEventListener(ON_MOUSE_UP, this._onButStartRelease, this);
    e.setVisible(!1);
    n = new createjs.Shape();
    n.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    d.addChild(n);
    createjs.Tween.get(n)
      .to(
        {
          alpha: 0,
        },
        500
      )
      .call(function () {
        createjs.Tween.removeTweens(n);
        d.removeChild(n);
      });
  };
  this._onButStartRelease = function () {
    s_oMain._onRemovePreloader();
  };
  this.refreshLoader = function (d) {
    c.text = d + "%";
    100 === d &&
      (s_oMain._onRemovePreloader(), (c.visible = !1), (f.visible = !1));
    k.graphics.clear();
    d = Math.floor((d * a) / 100);
    k.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(f.x, f.y, d, b);
  };
  this._init();
}

function CMain(a) {
  var b,
    c = 0,
    f = 0,
    k = STATE_LOADING,
    n,
    h;
  this.initContainer = function () {
    var a = document.getElementById("canvas");
    s_oStage = new createjs.Stage(a);
    createjs.Touch.enable(s_oStage);
    s_bMobile = jQuery.browser.mobile;
    !1 === s_bMobile && s_oStage.enableMouseOver(20);
    s_iPrevTime = new Date().getTime();
    createjs.Ticker.framerate = 30;
    createjs.Ticker.addEventListener("tick", this._update);
    navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
    s_oSpriteLibrary = new CSpriteLibrary();
    n = new CPreloader();
  };
  this.preloaderReady = function () {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || this._initSounds();
    this._loadImages();
    b = !0;
  };
  this.soundLoaded = function () {
    c++;
    n.refreshLoader(Math.floor((c / f) * 100));
    c === f && new CSlotSettings();
  };
  this._initSounds = function () {
    Howler.mute(!s_bAudioActive);
    s_aSoundsInfo = [];
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "press_but",
      loop: !1,
      volume: 1,
      ingamename: "press_but",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "win",
      loop: !1,
      volume: 1,
      ingamename: "win",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "reels",
      loop: !1,
      volume: 1,
      ingamename: "reels",
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
      filename: "start_reel",
      loop: !1,
      volume: 1,
      ingamename: "start_reel",
    });
    f += s_aSoundsInfo.length;
    s_aSounds = [];
    for (var a = 0; a < s_aSoundsInfo.length; a++)
      this.tryToLoadSound(s_aSoundsInfo[a], !1);
  };
  this.tryToLoadSound = function (a, b) {
    setTimeout(
      function () {
        s_aSounds[a.ingamename] = new Howl({
          src: [a.path + a.filename + ".mp3"],
          autoplay: !1,
          preload: !0,
          loop: a.loop,
          volume: a.volume,
          onload: s_oMain.soundLoaded,
          onloaderror: function (a, d) {
            for (var b = 0; b < s_aSoundsInfo.length; b++)
              if (a === s_aSounds[s_aSoundsInfo[b].ingamename]._sounds[0]._id) {
                s_oMain.tryToLoadSound(s_aSoundsInfo[b], !0);
                break;
              }
          },
          onplayerror: function (a) {
            for (var d = 0; d < s_aSoundsInfo.length; d++)
              if (a === s_aSounds[s_aSoundsInfo[d].ingamename]._sounds[0]._id) {
                s_aSounds[s_aSoundsInfo[d].ingamename].once(
                  "unlock",
                  function () {
                    s_aSounds[s_aSoundsInfo[d].ingamename].play();
                  }
                );
                break;
              }
          },
        });
      },
      b ? 200 : 0
    );
  };
  this._loadImages = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite("but_bg", "./sprites/but_play_bg.png");
    s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
    s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
    s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
    s_oSpriteLibrary.addSprite("paytable", "./sprites/paytable.jpg");
    s_oSpriteLibrary.addSprite("mask_slot", "./sprites/mask_slot.png");
    s_oSpriteLibrary.addSprite("spin_but", "./sprites/but_spin_bg.png");
    s_oSpriteLibrary.addSprite("coin_but", "./sprites/but_coin_bg.png");
    s_oSpriteLibrary.addSprite("info_but", "./sprites/but_info_bg.png");
    s_oSpriteLibrary.addSprite("bet_but", "./sprites/bet_but.png");
    s_oSpriteLibrary.addSprite(
      "win_frame_anim",
      "./sprites/win_frame_anim.png"
    );
    s_oSpriteLibrary.addSprite("but_lines_bg", "./sprites/but_lines_bg.png");
    s_oSpriteLibrary.addSprite("but_maxbet_bg", "./sprites/but_maxbet_bg.png");
    s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
    s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
    s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
    s_oSpriteLibrary.addSprite(
      "but_fullscreen",
      "./sprites/but_fullscreen.png"
    );
    s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
    for (var a = 1; a < NUM_SYMBOLS + 1; a++)
      s_oSpriteLibrary.addSprite(
        "symbol_" + a,
        "./sprites/symbol_" + a + ".png"
      ),
        s_oSpriteLibrary.addSprite(
          "symbol_" + a + "_anim",
          "./sprites/symbol_" + a + "_anim.png"
        );
    for (a = 1; a < NUM_PAYLINES + 1; a++)
      s_oSpriteLibrary.addSprite(
        "payline_" + a,
        "./sprites/payline_" + a + ".png"
      );
    f += s_oSpriteLibrary.getNumSprites();
    s_oSpriteLibrary.loadSprites();
  };
  this._onImagesLoaded = function () {
    c++;
    n.refreshLoader(Math.floor((c / f) * 100));
    c === f && new CSlotSettings();
  };
  this._onAllImagesLoaded = function () {};
  this._onRemovePreloader = function () {
    n.unload();
    this.gotoMenu();
  };
  this.gotoMenu = function () {
    new CMenu();
    k = STATE_MENU;
  };
  this.gotoGame = function () {
    h = new CGame(m);
    k = STATE_GAME;
  };
  this.gotoHelp = function () {
    new CHelp();
    k = STATE_HELP;
  };
  this.stopUpdate = function () {
    b = !1;
    createjs.Ticker.paused = !0;
    $("#block_game").css("display", "block");
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || Howler.mute(!0);
  };
  this.startUpdate = function () {
    s_iPrevTime = new Date().getTime();
    b = !0;
    createjs.Ticker.paused = !1;
    $("#block_game").css("display", "none");
    (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) &&
      s_bAudioActive &&
      Howler.mute(!1);
  };
  this._update = function (a) {
    if (!1 !== b) {
      var d = new Date().getTime();
      s_iTimeElaps = d - s_iPrevTime;
      s_iCntTime += s_iTimeElaps;
      s_iCntFps++;
      s_iPrevTime = d;
      1e3 <= s_iCntTime &&
        ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0));
      k === STATE_GAME && h.update();
      s_oStage.update(a);
    }
  };
  s_oMain = this;
  var m = a;
  PAYTABLE_VALUES = [];
  for (var e = 0; 7 > e; e++)
    PAYTABLE_VALUES[e] = a["paytable_symbol_" + (e + 1)];
  s_bAudioActive = a.audio_enable_on_startup;
  ENABLE_FULLSCREEN = m.fullscreen;
  ENABLE_CHECK_ORIENTATION = m.check_orientation;
  SHOW_CREDITS = m.show_credits;
  this.initContainer();
}
var s_bMobile,
  s_bAudioActive = !0,
  s_bFullscreen = !1,
  s_iCntTime = 0,
  s_iTimeElaps = 0,
  s_iPrevTime = 0,
  s_iCntFps = 0,
  s_iCurFps = 0,
  s_oDrawLayer,
  s_oStage,
  s_oMain,
  s_oSpriteLibrary,
  s_aSoundsInfo,
  s_aSounds;

function CTextButton(a, b, c, f, k, n, h, m) {
  var e, d, p, y, l, A, w, x, B, z;
  this._init = function (a, b, c, f, k, l, r) {
    e = !1;
    d = 1;
    p = [];
    y = [];
    z = createBitmap(c);
    x = new createjs.Container();
    x.x = a;
    x.y = b;
    x.regX = c.width / 2;
    x.regY = c.height / 2;
    s_bMobile || (x.cursor = "pointer");
    x.addChild(z, B);
    m.addChild(x);
    B = new CTLText(
      x,
      10,
      5,
      c.width - 20,
      c.height - 10,
      r,
      "center",
      l,
      k,
      1,
      0,
      0,
      f,
      !0,
      !0,
      !1,
      !1
    );
    this._initListener();
  };
  this.unload = function () {
    x.off("mousedown", l);
    x.off("pressup", A);
    m.removeChild(x);
  };
  this.setVisible = function (a) {
    x.visible = a;
  };
  this.setAlign = function (a) {
    B.textAlign = a;
  };
  this.setTextX = function (a) {
    B.x = a;
  };
  this.setScale = function (a) {
    d = x.scaleX = x.scaleY = a;
  };
  this.enable = function () {
    e = !1;
  };
  this.disable = function () {
    e = !0;
  };
  this._initListener = function () {
    l = x.on("mousedown", this.buttonDown);
    A = x.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (a, b, d) {
    p[a] = b;
    y[a] = d;
  };
  this.addEventListenerWithParams = function (a, b, d, c) {
    p[a] = b;
    y[a] = d;
    w = c;
  };
  this.buttonRelease = function () {
    e ||
      (playSound("press_but", 1, !1),
      (x.scaleX = d),
      (x.scaleY = d),
      p[ON_MOUSE_UP] && p[ON_MOUSE_UP].call(y[ON_MOUSE_UP], w));
  };
  this.buttonDown = function () {
    e ||
      ((x.scaleX = 0.9 * d),
      (x.scaleY = 0.9 * d),
      p[ON_MOUSE_DOWN] && p[ON_MOUSE_DOWN].call(y[ON_MOUSE_DOWN]));
  };
  this.setPosition = function (a, b) {
    x.x = a;
    x.y = b;
  };
  this.tweenPosition = function (a, b, d, c, e, f, r) {
    createjs.Tween.get(x)
      .wait(c)
      .to(
        {
          x: a,
          y: b,
        },
        d,
        e
      )
      .call(function () {
        void 0 !== f && f.call(r);
      });
  };
  this.changeText = function (a) {
    B.refreshText(a);
  };
  this.setX = function (a) {
    x.x = a;
  };
  this.setY = function (a) {
    x.y = a;
  };
  this.getButtonImage = function () {
    return x;
  };
  this.getX = function () {
    return x.x;
  };
  this.getY = function () {
    return x.y;
  };
  this.getSprite = function () {
    return x;
  };
  this.getScale = function () {
    return x.scaleX;
  };
  this._init(a, b, c, f, k, n, h);
}

function CGfxButton(a, b, c) {
  var f,
    k,
    n,
    h,
    m = [],
    e;
  this._init = function (a, b, c) {
    n = [];
    h = [];
    e = createBitmap(c);
    e.x = a;
    e.y = b;
    e.regX = c.width / 2;
    e.regY = c.height / 2;
    s_bMobile || (e.cursor = "pointer");
    s_oStage.addChild(e);
    this._initListener();
  };
  this.unload = function () {
    e.off("mousedown", f);
    e.off("pressup", k);
    s_oStage.removeChild(e);
  };
  this.setVisible = function (a) {
    e.visible = a;
  };
  this._initListener = function () {
    f = e.on("mousedown", this.buttonDown);
    k = e.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (a, b, c) {
    n[a] = b;
    h[a] = c;
  };
  this.addEventListenerWithParams = function (a, b, c, e) {
    n[a] = b;
    h[a] = c;
    m = e;
  };
  this.buttonRelease = function () {
    playSound("press_but", 0.3, !1);
    e.scaleX = 1;
    e.scaleY = 1;
    n[ON_MOUSE_UP] && n[ON_MOUSE_UP].call(h[ON_MOUSE_UP], m);
  };
  this.buttonDown = function () {
    e.scaleX = 0.9;
    e.scaleY = 0.9;
    n[ON_MOUSE_DOWN] && n[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN], m);
  };
  this.setPosition = function (a, b) {
    e.x = a;
    e.y = b;
  };
  this.setX = function (a) {
    e.x = a;
  };
  this.setY = function (a) {
    e.y = a;
  };
  this.getButtonImage = function () {
    return e;
  };
  this.getX = function () {
    return e.x;
  };
  this.getY = function () {
    return e.y;
  };
  this._init(a, b, c);
  return this;
}

function CToggle(a, b, c, f, k) {
  var n, h, m, e, d, p, y;
  this._init = function (a, b, d, c, f) {
    y = void 0 !== f ? f : s_oStage;
    h = [];
    m = [];
    f = new createjs.SpriteSheet({
      images: [d],
      frames: {
        width: d.width / 2,
        height: d.height,
        regX: d.width / 2 / 2,
        regY: d.height / 2,
      },
      animations: {
        state_true: [0],
        state_false: [1],
      },
    });
    n = c;
    e = createSprite(
      f,
      "state_" + n,
      d.width / 2 / 2,
      d.height / 2,
      d.width / 2,
      d.height
    );
    e.x = a;
    e.y = b;
    e.stop();
    s_bMobile || (e.cursor = "pointer");
    y.addChild(e);
    this._initListener();
  };
  this.unload = function () {
    e.off("mousedown", d);
    e.off("pressup", p);
    y.removeChild(e);
  };
  this._initListener = function () {
    d = e.on("mousedown", this.buttonDown);
    p = e.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (a, b, d) {
    h[a] = b;
    m[a] = d;
  };
  this.setCursorType = function (a) {
    e.cursor = a;
  };
  this.setActive = function (a) {
    n = a;
    e.gotoAndStop("state_" + n);
  };
  this.buttonRelease = function () {
    e.scaleX = 1;
    e.scaleY = 1;
    playSound("press_but", 1, !1);
    n = !n;
    e.gotoAndStop("state_" + n);
    h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(m[ON_MOUSE_UP], n);
  };
  this.buttonDown = function () {
    e.scaleX = 0.9;
    e.scaleY = 0.9;
    h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(m[ON_MOUSE_DOWN]);
  };
  this.setPosition = function (a, b) {
    e.x = a;
    e.y = b;
  };
  this._init(a, b, c, f, k);
}

function CBetBut(a, b, c) {
  var f,
    k,
    n,
    h = [],
    m;
  this._init = function (a, b, c) {
    f = !1;
    k = [];
    n = [];
    c = s_oSpriteLibrary.getSprite("bet_but");
    var d = new createjs.SpriteSheet({
      images: [c],
      frames: {
        width: c.width / 2,
        height: c.height,
        regX: 0,
        regY: 0,
      },
      animations: {
        on: [0, 1],
        off: [1, 2],
      },
    });
    m = createSprite(d, "on", 0, 0, c.width / 2, c.height);
    m.stop();
    m.x = a;
    m.y = b;
    m.regX = c.width / 2;
    m.regY = c.height / 2;
    s_oStage.addChild(m);
    this._initListener();
  };
  this.unload = function () {
    m.off("mousedown", this.buttonDown);
    m.off("pressup", this.buttonRelease);
    s_oStage.removeChild(m);
  };
  this.disable = function (a) {
    f = a;
  };
  this.setVisible = function (a) {
    m.visible = a;
  };
  this.setOn = function () {
    m.gotoAndStop("on");
  };
  this.setOff = function () {
    m.gotoAndStop("off");
  };
  this._initListener = function () {
    m.on("mousedown", this.buttonDown);
    m.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (a, b, c) {
    k[a] = b;
    n[a] = c;
  };
  this.addEventListenerWithParams = function (a, b, c, f) {
    k[a] = b;
    n[a] = c;
    h = f;
  };
  this.buttonRelease = function () {
    k[ON_MOUSE_UP] &&
      !1 === f &&
      (playSound("press_but", 1, !1), k[ON_MOUSE_UP].call(n[ON_MOUSE_UP], h));
  };
  this.buttonDown = function () {
    k[ON_MOUSE_DOWN] && !1 === f && k[ON_MOUSE_DOWN].call(n[ON_MOUSE_DOWN], h);
  };
  this.setPosition = function (a, b) {
    m.x = a;
    m.y = b;
  };
  this.setX = function (a) {
    m.x = a;
  };
  this.setY = function (a) {
    m.y = a;
  };
  this.getButtonImage = function () {
    return m;
  };
  this.getX = function () {
    return m.x;
  };
  this.getY = function () {
    return m.y;
  };
  this._init(a, b, c);
}

function CMenu() {
  var a,
    b,
    c,
    f,
    k,
    n,
    h = null,
    m = null,
    e,
    d,
    p,
    y,
    l,
    A;
  this._init = function () {
    e = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
    s_oStage.addChild(e);
    var w = s_oSpriteLibrary.getSprite("but_bg");
    d = new CTextButton(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT - 164,
      w,
      TEXT_PLAY,
      FONT_GAME,
      "#ffffff",
      40,
      s_oStage
    );
    d.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
      (w = s_oSpriteLibrary.getSprite("audio_icon")),
        (k = CANVAS_WIDTH - w.width / 4 - 10),
        (n = w.height / 2 + 10),
        (p = new CToggle(k, n, w, s_bAudioActive)),
        p.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
    SHOW_CREDITS
      ? ((w = s_oSpriteLibrary.getSprite("but_credits")),
        (a = w.height / 2 + 10),
        (b = w.height / 2 + 10),
        (y = new CGfxButton(a, b, w, s_oStage)),
        y.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this),
        (c = a + w.width + 10),
        (f = b))
      : ((c = w.height / 2 + 10), (f = w.height / 2 + 10));
    w = window.document;
    var x = w.documentElement;
    h =
      x.requestFullscreen ||
      x.mozRequestFullScreen ||
      x.webkitRequestFullScreen ||
      x.msRequestFullscreen;
    m =
      w.exitFullscreen ||
      w.mozCancelFullScreen ||
      w.webkitExitFullscreen ||
      w.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (h = !1);
    h &&
      screenfull.enabled &&
      ((w = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (l = new CToggle(c, f, w, s_bFullscreen, s_oStage)),
      l.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    A = new createjs.Shape();
    A.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    s_oStage.addChild(A);
    createjs.Tween.get(A)
      .to(
        {
          alpha: 0,
        },
        400
      )
      .call(function () {
        A.visible = !1;
      });
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };
  this.unload = function () {
    d.unload();
    d = null;
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) p.unload(), (p = null);
    SHOW_CREDITS && y.unload();
    h && screenfull.enabled && l.unload();
    s_oStage.removeChild(e);
    e = null;
    s_oStage.removeChild(A);
    s_oMenu = A = null;
  };
  this.refreshButtonPos = function (d, e) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      p.setPosition(k - d, e + n);
    SHOW_CREDITS && y.setPosition(a + d, b + e);
    h && screenfull.enabled && l.setPosition(c + d, f + e);
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
    h && screenfull.enabled && l.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? m.call(window.document)
      : h.call(window.document.documentElement);
    sizeHandler();
  };
  s_oMenu = this;
  this._init();
}
var s_oMenu = null;

function CGame(a) {
  var b = !1,
    c,
    f,
    k,
    n,
    h,
    m,
    e,
    d,
    p,
    y,
    l,
    A,
    w,
    x,
    B,
    z,
    E,
    L,
    M,
    t,
    G = null;
  this._init = function () {
    c = GAME_STATE_IDLE;
    A = n = f = 0;
    z = [0, 1, 2, 3, 4];
    k = z[0];
    h = NUM_PAYLINES;
    y = TOTAL_MONEY;
    d = MIN_BET;
    p = d * h;
    s_oTweenController = new CTweenController();
    L = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
    s_oStage.addChild(L);
    this._initReels();
    M = new createjs.Bitmap(s_oSpriteLibrary.getSprite("mask_slot"));
    s_oStage.addChild(M);
    t = new CInterface(d, p, y);
    this._initStaticSymbols();
    G = new CPayTablePanel();
    y < p && t.disableSpin();
    b = !0;
  };
  this.unload = function () {
    stopSound("reels");
    t.unload();
    G.unload();
    for (var a = 0; a < w.length; a++) w[a].unload();
    for (a = 0; a < NUM_ROWS; a++)
      for (var b = 0; b < NUM_REELS; b++) x[a][b].unload();
    s_oStage.removeAllChildren();
  };
  this._initReels = function () {
    var a = REEL_OFFSET_X,
      b = REEL_OFFSET_Y,
      d = 0;
    w = [];
    for (var c = 0; c < NUM_REELS; c++)
      (w[c] = new CReelColumn(c, a, b, d)),
        (w[c + NUM_REELS] = new CReelColumn(
          c + NUM_REELS,
          a,
          b + SYMBOL_SIZE * NUM_ROWS,
          d
        )),
        (a += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS),
        (d += REEL_DELAY);
  };
  this._initStaticSymbols = function () {
    var a = REEL_OFFSET_X,
      b = REEL_OFFSET_Y;
    x = [];
    for (var d = 0; d < NUM_ROWS; d++) {
      x[d] = [];
      for (var c = 0; c < NUM_REELS; c++) {
        var f = new CStaticSymbolCell(d, c, a, b);
        x[d][c] = f;
        a += SYMBOL_SIZE + SPACE_BETWEEN_SYMBOLS;
      }
      a = REEL_OFFSET_X;
      b += SYMBOL_SIZE;
    }
  };
  this.generateFinalSymbols = function () {
    E = [];
    for (var a = 0; a < NUM_ROWS; a++) {
      E[a] = [];
      for (var b = 0; b < NUM_REELS; b++)
        E[a][b] =
          s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
    }
    B = [];
    for (a = l = 0; a < h; a++) {
      b = s_aPaylineCombo[a];
      var d = [],
        c = E[b[0].row][b[0].col],
        f = 1,
        e = 1;
      for (
        d.push({
          row: b[0].row,
          col: b[0].col,
          value: E[b[0].row][b[0].col],
        });
        c === WILD_SYMBOL && e < NUM_REELS;

      )
        f++,
          (c = E[b[e].row][b[e].col]),
          d.push({
            row: b[e].row,
            col: b[e].col,
            value: E[b[e].row][b[e].col],
          }),
          e++;
      for (; e < b.length; e++)
        if (
          E[b[e].row][b[e].col] === c ||
          E[b[e].row][b[e].col] === WILD_SYMBOL
        )
          f++,
            d.push({
              row: b[e].row,
              col: b[e].col,
              value: E[b[e].row][b[e].col],
            });
        else break;
      0 < s_aSymbolWin[c - 1][f - 1] &&
        ((l += s_aSymbolWin[c - 1][f - 1]),
        B.push({
          line: a + 1,
          amount: s_aSymbolWin[c - 1][f - 1],
          num_win: f,
          value: c,
          list: d,
        }));
    }
    return 0 < B.length ? !0 : !1;
  };
  this._generateRandSymbols = function () {
    for (var a = [], b = 0; b < NUM_ROWS; b++)
      a[b] = s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)];
    return a;
  };
  this.reelArrived = function (a, b) {
    if (f > MIN_REEL_LOOPS)
      if (k === b) {
        if (!1 === w[a].isReadyToStop()) {
          var d = a;
          a < NUM_REELS
            ? ((d += NUM_REELS),
              w[d].setReadyToStop(),
              w[a].restart([E[0][a], E[1][a], E[2][a]], !0))
            : ((d -= NUM_REELS),
              w[d].setReadyToStop(),
              w[a].restart([E[0][d], E[1][d], E[2][d]], !0));
        }
      } else w[a].restart(this._generateRandSymbols(), !1);
    else w[a].restart(this._generateRandSymbols(), !1), 0 === a && f++;
  };
  this.stopNextReel = function () {
    n++;
    0 === n % 2 &&
      (playSound("reel_stop", 1, !1),
      (k = z[n / 2]),
      n === 2 * NUM_REELS && this._endReelAnimation());
  };
  this._endReelAnimation = function () {
    stopSound("reels");
    t.disableBetBut(!1);
    n = f = 0;
    k = z[0];
    if (0 < B.length) {
      for (var a = 0; a < B.length; a++) {
        G.highlightCombo(B[a].value, B[a].num_win);
        t.showLine(B[a].line);
        for (var b = B[a].list, e = 0; e < b.length; e++)
          x[b[e].row][b[e].col].show(b[e].value);
      }
      l *= d;
      y += l;
      SLOT_CASH -= l;
      0 < l && (t.refreshMoney(y), t.refreshWinText(l));
      m = 0;
      c = GAME_STATE_SHOW_ALL_WIN;
      playSound("win", 0.3, !1);
    } else c = GAME_STATE_IDLE;
    t.enableGuiButtons();
    y < p && t.disableSpin();
    A++;
    A === N && ((A = 0), $(s_oMain).trigger("show_interlevel_ad"));
    $(s_oMain).trigger("save_score", y);
  };
  this.hidePayTable = function () {
    G.hide();
  };
  this._showWin = function () {
    if (0 < e) {
      stopSound("win");
      var a = B[e - 1].line;
      t.hideLine(a);
      a = B[e - 1].list;
      for (var b = 0; b < a.length; b++) x[a[b].row][a[b].col].stopAnim();
    }
    e === B.length && (e = 0);
    a = B[e].line;
    t.showLine(a);
    a = B[e].list;
    for (b = 0; b < a.length; b++) x[a[b].row][a[b].col].show(a[b].value);
    e++;
  };
  this._hideAllWins = function () {
    for (var a = 0; a < B.length; a++)
      for (var b = B[a].list, d = 0; d < b.length; d++)
        x[b[d].row][b[d].col].stopAnim();
    t.hideAllLines();
    e = m = 0;
    m = TIME_SHOW_WIN;
    c = GAME_STATE_SHOW_WIN;
  };
  this.activateLines = function (a) {
    h = a;
    this.removeWinShowing();
    p = a = d * h;
    t.refreshTotalBet(p);
    t.refreshNumLines(h);
    a > y ? t.disableSpin() : t.enableSpin();
  };
  this.addLine = function () {
    h === NUM_PAYLINES ? (h = 1) : h++;
    var a = d * h;
    p = a = parseFloat(a.toFixed(2));
    t.refreshTotalBet(p);
    t.refreshNumLines(h);
    a > y ? t.disableSpin() : t.enableSpin();
  };
  this.changeCoinBet = function () {
    var a = Math.floor(100 * (d + 0.05)) / 100;
    a > MAX_BET
      ? ((d = MIN_BET),
        (p = d * h),
        (p = parseFloat(p.toFixed(2))),
        t.refreshBet(d),
        t.refreshTotalBet(p),
        (a = p))
      : ((a *= h),
        (a = parseFloat(a.toFixed(2))),
        (d += 0.05),
        (d = Math.floor(100 * d) / 100),
        (p = a),
        t.refreshBet(d),
        t.refreshTotalBet(p));
    trace("iNewTotalBet: " + a);
    trace("_iMoney: " + y);
    a > y ? t.disableSpin() : t.enableSpin();
  };
  this.onMaxBet = function () {
    var a = MAX_BET;
    h = NUM_PAYLINES;
    a *= h;
    d = MAX_BET;
    p = a;
    t.refreshBet(d);
    t.refreshTotalBet(p);
    t.refreshNumLines(h);
    a > y ? t.disableSpin() : (t.enableSpin(), this.onSpin());
  };
  this.removeWinShowing = function () {
    G.resetHighlightCombo();
    t.resetWin();
    for (var a = 0; a < NUM_ROWS; a++)
      for (var b = 0; b < NUM_REELS; b++) x[a][b].hide();
    for (a = 0; a < w.length; a++) w[a].activate();
    c = GAME_STATE_IDLE;
  };
  this.onSpin = function () {
    stopSound("win");
    playSound("reels", 1, !1);
    t.disableBetBut(!0);
    this.removeWinShowing();
    MIN_WIN = s_aSymbolWin[0][s_aSymbolWin[0].length - 1];
    for (var a = 0; a < s_aSymbolWin.length; a++)
      for (var b = s_aSymbolWin[a], e = 0; e < b.length; e++)
        0 !== b[e] && b[e] < MIN_WIN && (MIN_WIN = b[e]);
    MIN_WIN *= d;
    y -= p;
    t.refreshMoney(y);
    SLOT_CASH += p;
    $(s_oMain).trigger("bet_placed", {
      bet: d,
      tot_bet: p,
    });
    if (SLOT_CASH < MIN_WIN) {
      do a = this.generateFinalSymbols();
      while (!0 === a);
    } else if (Math.floor(101 * Math.random()) > WIN_OCCURRENCE) {
      do a = this.generateFinalSymbols();
      while (!0 === a);
    } else {
      do a = this.generateFinalSymbols();
      while (!1 === a || l * d > SLOT_CASH);
    }
    t.hideAllLines();
    t.disableGuiButtons();
    c = GAME_STATE_SPINNING;
  };
  this._printSymbol = function () {
    for (var a = 0; a < NUM_ROWS; a++)
      for (var b = 0; b < NUM_REELS; b++)
        trace("_aFinalSymbolCombo[" + a + "][" + b + "]: " + E[a][b]);
  };
  this.onInfoClicked = function () {
    c !== GAME_STATE_SPINNING && (G.isVisible() ? G.hide() : G.show());
  };
  this.onExit = function () {
    this.unload();
    $(s_oMain).trigger("end_session");
    $(s_oMain).trigger("share_event", y);
    s_oMain.gotoMenu();
  };
  this.getState = function () {
    return c;
  };
  this.update = function () {
    if (!1 !== b)
      switch (c) {
        case GAME_STATE_SPINNING:
          for (var a = 0; a < w.length; a++) w[a].update();
          break;
        case GAME_STATE_SHOW_ALL_WIN:
          m += s_iTimeElaps;
          m > TIME_SHOW_ALL_WINS && this._hideAllWins();
          break;
        case GAME_STATE_SHOW_WIN:
          (m += s_iTimeElaps), m > TIME_SHOW_WIN && ((m = 0), this._showWin());
      }
  };
  s_oGame = this;
  WIN_OCCURRENCE = a.win_occurrence;
  MIN_REEL_LOOPS = a.min_reel_loop;
  REEL_DELAY = a.reel_delay;
  TIME_SHOW_WIN = a.time_show_win;
  TIME_SHOW_ALL_WINS = a.time_show_all_wins;
  TOTAL_MONEY = a.money;
  SLOT_CASH = a.slot_cash;
  var N = a.ad_show_counter;
  this._init();
}
var s_oGame, s_oTweenController;

function CReelColumn(a, b, c, f) {
  var k, n, h, m, e, d, p, y, l, A, w, x, B, z;
  this._init = function (a, b, c, f) {
    h = n = k = !1;
    p = 0;
    m = a;
    d = f;
    e = m < NUM_REELS ? m : m - NUM_REELS;
    l = 0;
    A = MAX_FRAMES_REEL_EASE;
    y = REEL_STATE_START;
    w = c;
    x = w + SYMBOL_SIZE * NUM_ROWS;
    this.initContainer(b, c);
  };
  this.initContainer = function (a, b) {
    z = new createjs.Container();
    z.x = a;
    z.y = b;
    var d = 0;
    B = [];
    for (var c = 0; c < NUM_ROWS; c++) {
      var e = createSprite(
        s_aSymbolData[
          s_aRandSymbols[Math.floor(Math.random() * s_aRandSymbols.length)]
        ],
        "static",
        0,
        0,
        SYMBOL_SIZE,
        SYMBOL_SIZE
      );
      e.stop();
      e.x = 0;
      e.y = d;
      z.addChild(e);
      B[c] = e;
      d += SYMBOL_SIZE;
    }
    s_oStage.addChild(z);
  };
  this.unload = function () {
    s_oStage.removeChild(z);
  };
  this.activate = function () {
    w = z.y;
    x = w + SYMBOL_SIZE * NUM_ROWS;
    k = !0;
  };
  this._setSymbol = function (a) {
    z.removeAllChildren();
    for (var b = 0, d = 0; d < a.length; d++) {
      var c = new createjs.Sprite(
        s_aSymbolData[a[d]],
        "static",
        0,
        0,
        SYMBOL_SIZE,
        SYMBOL_SIZE
      );
      c.stop();
      c.x = 0;
      c.y = b;
      z.addChild(c);
      B[d] = c;
      b += SYMBOL_SIZE;
    }
  };
  this.restart = function (a, b) {
    z.y = w = REEL_START_Y;
    x = w + SYMBOL_SIZE * NUM_ROWS;
    this._setSymbol(a);
    if ((n = b)) {
      l = 0;
      A = MAX_FRAMES_REEL_EASE;
      y = REEL_STATE_STOP;
      for (var d = 0; d < NUM_ROWS; d++) B[d].gotoAndStop("static");
      h = !0;
    } else for (d = 0; d < NUM_ROWS; d++) B[d].gotoAndStop("moving");
  };
  this.setReadyToStop = function () {
    l = 0;
    A = MAX_FRAMES_REEL_EASE;
    y = REEL_STATE_STOP;
  };
  this.isReadyToStop = function () {
    return n;
  };
  this._updateStart = function () {
    0 === l && m < NUM_REELS && playSound("start_reel", 0.3, !1);
    l++;
    l > A &&
      ((l = 0), (A /= 2), y++, (w = z.y), (x = w + SYMBOL_SIZE * NUM_ROWS));
    var a = s_oTweenController.easeInBack(l, 0, 1, A);
    a = s_oTweenController.tweenValue(w, x, a);
    z.y = a;
  };
  this._updateMoving = function () {
    l++;
    l > A && ((l = 0), (w = z.y), (x = w + SYMBOL_SIZE * NUM_ROWS));
    var a = s_oTweenController.easeLinear(l, 0, 1, A);
    a = s_oTweenController.tweenValue(w, x, a);
    z.y = a;
  };
  this._updateStopping = function () {
    l++;
    if (l >= A)
      (k = !1),
        (l = 0),
        (A = MAX_FRAMES_REEL_EASE),
        (y = REEL_STATE_START),
        (p = 0),
        (n = !1),
        h && ((h = !1), (z.y = REEL_OFFSET_Y)),
        s_oGame.stopNextReel();
    else {
      var a = s_oTweenController.easeOutCubic(l, 0, 1, A);
      a = s_oTweenController.tweenValue(w, x, a);
      z.y = a;
    }
  };
  this.update = function () {
    if (!1 !== k && (p++, p > d))
      switch (
        (!1 === n && z.y > REEL_ARRIVAL_Y && s_oGame.reelArrived(m, e), y)
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
  this._init(a, b, c, f);
}

function CInterface(a, b, c) {
  var f,
    k,
    n,
    h,
    m,
    e,
    d,
    p,
    y,
    l,
    A,
    w,
    x,
    B,
    z,
    E = null,
    L = null,
    M,
    t,
    G,
    N,
    r,
    I;
  this._init = function (a, b, c) {
    var q = s_oSpriteLibrary.getSprite("but_exit");
    n = CANVAS_WIDTH - q.width / 2 - 2;
    h = q.height / 2 + 2;
    y = new CGfxButton(n, h, q, !0);
    y.addEventListener(ON_MOUSE_UP, this._onExit, this);
    !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
      ? ((m = y.getX() - q.width),
        (e = q.height / 2 + 2),
        (x = new CToggle(
          m,
          e,
          s_oSpriteLibrary.getSprite("audio_icon"),
          s_bAudioActive
        )),
        x.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
        (f = m - q.width),
        (k = e))
      : ((f = y.getX() - q.width), (k = q.height / 2 + 2));
    q = window.document;
    var J = q.documentElement;
    E =
      J.requestFullscreen ||
      J.mozRequestFullScreen ||
      J.webkitRequestFullScreen ||
      J.msRequestFullscreen;
    L =
      q.exitFullscreen ||
      q.mozCancelFullScreen ||
      q.webkitExitFullscreen ||
      q.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (E = !1);
    E &&
      screenfull.enabled &&
      ((q = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (I = new CToggle(f, k, q, s_bFullscreen, s_oStage)),
      I.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    q = s_oSpriteLibrary.getSprite("spin_but");
    l = new CTextButton(
      1026 + q.width / 2,
      595,
      q,
      TEXT_SPIN,
      FONT_GAME,
      "#ffffff",
      30,
      s_oStage
    );
    l.addEventListener(ON_MOUSE_UP, this._onSpin, this);
    q = s_oSpriteLibrary.getSprite("info_but");
    A = new CTextButton(
      296 + q.width / 2,
      595,
      q,
      TEXT_INFO,
      FONT_GAME,
      "#ffffff",
      30,
      s_oStage
    );
    A.addEventListener(ON_MOUSE_UP, this._onInfo, this);
    q = s_oSpriteLibrary.getSprite("but_lines_bg");
    w = new CTextButton(
      436 + q.width / 2,
      595,
      q,
      TEXT_LINES,
      FONT_GAME,
      "#ffffff",
      30,
      s_oStage
    );
    w.addEventListener(ON_MOUSE_UP, this._onAddLine, this);
    q = s_oSpriteLibrary.getSprite("coin_but");
    B = new CTextButton(
      620 + q.width / 2,
      595,
      q,
      TEXT_COIN,
      FONT_GAME,
      "#ffffff",
      30,
      s_oStage
    );
    B.addEventListener(ON_MOUSE_UP, this._onBet, this);
    q = s_oSpriteLibrary.getSprite("but_maxbet_bg");
    z = new CTextButton(
      805 + q.width / 2,
      595,
      q,
      TEXT_MAX_BET,
      FONT_GAME,
      "#ffffff",
      30,
      s_oStage
    );
    z.addEventListener(ON_MOUSE_UP, this._onMaxBet, this);
    t = new CTLText(
      s_oStage,
      330,
      14,
      150,
      50,
      24,
      "center",
      "#ffde00",
      FONT_GAME,
      1,
      0,
      0,
      TEXT_MONEY + " " + c.toFixed(2) + TEXT_CURRENCY,
      !0,
      !0,
      !0,
      !1
    );
    N = new CTLText(
      s_oStage,
      460,
      CANVAS_HEIGHT - 120,
      134,
      30,
      30,
      "center",
      "#ffffff",
      FONT_GAME,
      1,
      0,
      0,
      NUM_PAYLINES,
      !0,
      !0,
      !1,
      !1
    );
    M = new CTLText(
      s_oStage,
      643,
      CANVAS_HEIGHT - 120,
      134,
      30,
      30,
      "center",
      "#ffffff",
      FONT_GAME,
      1,
      0,
      0,
      a.toFixed(2),
      !0,
      !0,
      !1,
      !1
    );
    G = new CTLText(
      s_oStage,
      825,
      CANVAS_HEIGHT - 120,
      175,
      30,
      30,
      "center",
      "#ffffff",
      FONT_GAME,
      1,
      0,
      0,
      TEXT_BET + ": " + b.toFixed(2),
      !0,
      !0,
      !1,
      !1
    );
    r = new CTLText(
      s_oStage,
      1049,
      CANVAS_HEIGHT - 120,
      132,
      30,
      30,
      "center",
      "#ffde00",
      FONT_GAME,
      1,
      0,
      0,
      " ",
      !0,
      !0,
      !1,
      !1
    );
    q = s_oSpriteLibrary.getSprite("bet_but");
    d = [];
    a = q.height / 2;
    b = 84 + a;
    c = new CBetBut(319 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 4);
    d[3] = c;
    b += 43;
    c = new CBetBut(319 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 2);
    d[1] = c;
    b += 43;
    c = new CBetBut(319 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 20);
    d[19] = c;
    b += 43;
    c = new CBetBut(319 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 16);
    d[15] = c;
    b += 43;
    c = new CBetBut(319 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 10);
    d[9] = c;
    b += 43;
    c = new CBetBut(319 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 1);
    d[0] = c;
    b += 44;
    c = new CBetBut(319 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 11);
    d[10] = c;
    b += 43;
    c = new CBetBut(319 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 17);
    d[16] = c;
    b += 43;
    c = new CBetBut(319 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 3);
    d[2] = c;
    c = new CBetBut(319 + q.width / 2, b + 43, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 5);
    d[4] = c;
    b = 84 + a;
    c = new CBetBut(1130 + q.width / 2, b, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 14);
    d[13] = c;
    b += 43;
    c = new CBetBut(1130 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 12);
    d[11] = c;
    b += 43;
    c = new CBetBut(1130 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 9);
    d[8] = c;
    b += 43;
    c = new CBetBut(1130 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 18);
    d[17] = c;
    b += 43;
    c = new CBetBut(1130 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 6);
    d[5] = c;
    b += 44;
    c = new CBetBut(1130 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 7);
    d[6] = c;
    b += 43;
    c = new CBetBut(1130 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 19);
    d[18] = c;
    b += 43;
    c = new CBetBut(1130 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 8);
    d[7] = c;
    b += 43;
    c = new CBetBut(1130 + q.width / 2, b, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 13);
    d[12] = c;
    c = new CBetBut(1130 + q.width / 2, b + 43, q, !0);
    c.addEventListenerWithParams(ON_MOUSE_UP, this._onBetLineClicked, this, 15);
    d[14] = c;
    p = [];
    for (q = 0; q < NUM_PAYLINES; q++)
      (a = createBitmap(s_oSpriteLibrary.getSprite("payline_" + (q + 1)))),
        (a.visible = !1),
        s_oStage.addChild(a),
        (p[q] = a);
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };
  this.unload = function () {
    y.unload();
    y = null;
    l.unload();
    l = null;
    A.unload();
    A = null;
    w.unload();
    w = null;
    B.unload();
    B = null;
    z.unload();
    z = null;
    !1 === DISABLE_SOUND_MOBILE && (x.unload(), (x = null));
    E && screenfull.enabled && I.unload();
    for (var a = 0; a < NUM_PAYLINES; a++) d[a].unload();
    s_oInterface = null;
  };
  this.refreshButtonPos = function (a, b) {
    y.setPosition(n - a, b + h);
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      x.setPosition(m - a, b + e);
    E && screenfull.enabled && I.setPosition(f - a, k + b);
  };
  this.refreshMoney = function (a) {
    t.refreshText(TEXT_MONEY + "\n" + a.toFixed(2) + TEXT_CURRENCY);
  };
  this.refreshBet = function (a) {
    M.refreshText(a.toFixed(2));
  };
  this.refreshTotalBet = function (a) {
    G.refreshText(TEXT_BET + ": " + a.toFixed(2));
  };
  this.refreshNumLines = function (a) {
    N.refreshText(a);
    for (var b = 0; b < NUM_PAYLINES; b++)
      b < a ? (d[b].setOn(), (p[b].visible = !0)) : d[b].setOff();
    setTimeout(function () {
      for (var a = 0; a < NUM_PAYLINES; a++) p[a].visible = !1;
    }, 1e3);
  };
  this.resetWin = function () {
    r.refreshText(" ");
  };
  this.refreshWinText = function (a) {
    r.refreshText(TEXT_WIN + " " + a.toFixed(2) + TEXT_CURRENCY);
  };
  this.showLine = function (a) {
    p[a - 1].visible = !0;
  };
  this.hideLine = function (a) {
    p[a - 1].visible = !1;
  };
  this.hideAllLines = function () {
    for (var a = 0; a < NUM_PAYLINES; a++) p[a].visible = !1;
  };
  this.disableBetBut = function (a) {
    for (var b = 0; b < NUM_PAYLINES; b++) d[b].disable(a);
  };
  this.enableGuiButtons = function () {
    l.enable();
    z.enable();
    B.enable();
    w.enable();
    A.enable();
  };
  this.enableSpin = function () {
    l.enable();
    z.enable();
  };
  this.disableSpin = function () {
    l.disable();
    z.disable();
  };
  this.disableGuiButtons = function () {
    l.disable();
    z.disable();
    B.disable();
    w.disable();
    A.disable();
  };
  this._onBetLineClicked = function (a) {
    this.refreshNumLines(a);
    s_oGame.activateLines(a);
  };
  this._onExit = function () {
    s_oGame.onExit();
  };
  this._onSpin = function () {
    s_oGame.onSpin();
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
  this._onMaxBet = function () {
    s_oGame.onMaxBet();
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this.resetFullscreenBut = function () {
    E && screenfull.enabled && I.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? L.call(window.document)
      : E.call(window.document.documentElement);
    sizeHandler();
  };
  s_oInterface = this;
  this._init(a, b, c);
  return this;
}
var s_oInterface = null;

function CPayTablePanel() {
  var a, b, c, f;
  this._init = function () {
    f = new createjs.Container();
    c = createBitmap(s_oSpriteLibrary.getSprite("paytable"));
    f.addChild(c);
    this._createPayouts();
    new CTLText(
      f,
      760,
      466,
      454,
      120,
      26,
      "center",
      "#ffff00",
      FONT_GAME,
      1,
      0,
      0,
      TEXT_HELP_WILD,
      !0,
      !0,
      !0,
      !1
    );
    f.visible = !1;
    s_oStage.addChild(f);
    var a = this;
    f.on("pressup", function () {
      a._onExit();
    });
  };
  this.unload = function () {
    var c = this;
    f.off("pressup", function () {
      c._onExit();
    });
    s_oStage.removeChild(f);
    for (var n = 0; n < a.length; n++) f.removeChild(a[n].getText());
    for (n = 0; n < b.length; n++) f.removeChild(b[n]);
  };
  this._createPayouts = function () {
    a = [];
    b = [];
    for (
      var c = [
          {
            x: 440,
            y: 112,
          },
          {
            x: 440,
            y: 292,
          },
          {
            x: 440,
            y: 476,
          },
          {
            x: 770,
            y: 112,
          },
          {
            x: 770,
            y: 292,
          },
          {
            x: 1090,
            y: 112,
          },
          {
            x: 1090,
            y: 292,
          },
        ],
        n = 0,
        h = 0;
      h < s_aSymbolWin.length;
      h++
    ) {
      for (var m = [], e = 0; e < s_aSymbolWin[h].length; e++)
        m[e] = s_aSymbolWin[h][e];
      do (e = m.indexOf(0)), -1 !== e && m.splice(e, 1);
      while (-1 !== e);
      e = m.length;
      if (0 !== e) {
        var d = 30;
        4 === e && (d = 25);
        var p = c[n].y;
        a[h] = [];
        b[h] = [];
        for (var y = 0; y < e; y++) {
          var l = new CTLText(
            f,
            c[n].x,
            p,
            44,
            25,
            25,
            "left",
            "#ffffff",
            FONT_GAME,
            1,
            0,
            0,
            "X" + (5 - y),
            !0,
            !0,
            !1,
            !1
          );
          a[h][y] = l;
          l = new CTLText(
            f,
            l.getX() + 50,
            l.getY(),
            44,
            25,
            25,
            "left",
            "#ffff00",
            FONT_GAME,
            1,
            0,
            0,
            m[e - y - 1],
            !0,
            !0,
            !1,
            !1
          );
          b[h][y] = l;
          p += d;
        }
        n++;
      }
    }
  };
  this.show = function () {
    f.visible = !0;
  };
  this.hide = function () {
    f.visible = !1;
  };
  this.resetHighlightCombo = function () {
    for (var c = 0; c < a.length; c++)
      for (var f = 0; f < a[c].length; f++)
        a[c][f].setColor("#ffffff"),
          b[c][f].setColor("#ffff00"),
          createjs.Tween.removeTweens(b[c][f].getText()),
          b[c][f].setAlpha(1);
  };
  this.highlightCombo = function (a, c) {
    b[a - 1][NUM_REELS - c].setColor("#ff0000");
    this.tweenAlpha(b[a - 1][NUM_REELS - c].getText(), 0);
  };
  this.tweenAlpha = function (a, b) {
    var c = this;
    createjs.Tween.get(a)
      .to(
        {
          alpha: b,
        },
        200
      )
      .call(function () {
        1 === b ? c.tweenAlpha(a, 0) : c.tweenAlpha(a, 1);
      });
  };
  this._onExit = function () {
    s_oGame.hidePayTable();
  };
  this.isVisible = function () {
    return f.visible;
  };
  this._init();
}

function CStaticSymbolCell(a, b, c, f) {
  var k = -1,
    n,
    h,
    m,
    e;
  this._init = function (a, b, c, f) {
    e = new createjs.Container();
    e.visible = !1;
    h = [];
    for (a = 0; a < NUM_SYMBOLS; a++)
      (b = createSprite(
        s_aSymbolAnims[a],
        "static",
        0,
        0,
        SYMBOL_SIZE,
        SYMBOL_SIZE
      )),
        b.stop(),
        (b.x = c),
        (b.y = f),
        b.on("animationend", this._onAnimEnded, null, !1, {
          index: a,
        }),
        e.addChild(b),
        (h[a] = b),
        (h[a].visible = !1);
    a = {
      framerate: 60,
      images: [s_oSpriteLibrary.getSprite("win_frame_anim")],
      frames: {
        width: SYMBOL_SIZE,
        height: SYMBOL_SIZE,
        regX: 0,
        regY: 0,
      },
      animations: {
        static: [0, 1],
        anim: [1, 19],
      },
    };
    a = new createjs.SpriteSheet(a);
    m = new createjs.Sprite(a, "static", 0, 0, SYMBOL_SIZE, SYMBOL_SIZE);
    m.stop();
    m.x = c;
    m.y = f;
    e.addChild(m);
    s_oStage.addChild(e);
  };
  this.unload = function () {
    s_oStage.removeChild(e);
  };
  this.hide = function () {
    -1 < k &&
      (m.gotoAndStop("static"),
      (m.visible = !1),
      h[k].gotoAndPlay("static"),
      (e.visible = !1));
  };
  this.show = function (a) {
    m.gotoAndPlay("anim");
    m.visible = !0;
    for (var b = 0; b < NUM_SYMBOLS; b++) h[b].visible = b + 1 === a ? !0 : !1;
    h[a - 1].gotoAndPlay("anim");
    k = a - 1;
    n = h[a - 1].spriteSheet.getNumFrames();
    e.visible = !0;
  };
  this._onAnimEnded = function (a, b) {
    h[b.index].currentFrame !== n &&
      (h[b.index].stop(),
      setTimeout(function () {
        h[b.index].gotoAndPlay(1);
      }, 100));
  };
  this.stopAnim = function () {
    h[k].gotoAndStop("static");
    h[k].visible = !1;
    m.gotoAndStop("static");
    m.visible = !1;
  };
  this._init(a, b, c, f);
}

function CTweenController() {
  this.tweenValue = function (a, b, c) {
    return a + c * (b - a);
  };
  this.easeLinear = function (a, b, c, f) {
    return (c * a) / f + b;
  };
  this.easeInCubic = function (a, b, c, f) {
    f = (a /= f) * a * a;
    return b + c * f;
  };
  this.easeBackInQuart = function (a, b, c, f) {
    f = (a /= f) * a;
    return b + c * (2 * f * f + 2 * f * a + -3 * f);
  };
  this.easeInBack = function (a, b, c, f) {
    return c * (a /= f) * a * (2.70158 * a - 1.70158) + b;
  };
  this.easeOutBack = function (a, b, c, f, k) {
    void 0 == k && (k = 1.70158);
    return c * ((a = a / f - 1) * a * ((k + 1) * a + k) + 1) + b;
  };
  this.easeOutCubic = function (a, b, c, f) {
    return c * ((a = a / f - 1) * a * a + 1) + b;
  };
}

function CCreditsPanel() {
  var a, b, c, f, k, n, h, m, e, d;
  this._init = function () {
    d = new createjs.Container();
    d.alpha = 0;
    s_oStage.addChild(d);
    var p = new createjs.Shape();
    p.graphics
      .beginFill("rgba(0,0,0,0.7)")
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    d.addChild(p);
    b = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
    d.addChild(b);
    h = new createjs.Shape();
    h.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    h.alpha = 0.01;
    h.on("click", this._onLogoButRelease);
    d.addChild(h);
    p = s_oSpriteLibrary.getSprite("but_exit");
    a = CANVAS_WIDTH / 2 + 390;
    f = new CGfxButton(a, 185, p, d);
    f.addEventListener(ON_MOUSE_UP, this.unload, this);
    n = new createjs.Text(TEXT_CREDITS_DEVELOPED, "40px " + FONT_GAME, "#000");
    n.textAlign = "center";
    n.textBaseline = "alphabetic";
    n.x = CANVAS_WIDTH / 2;
    n.y = 270;
    n.outline = 3;
    d.addChild(n);
    k = new createjs.Text(TEXT_CREDITS_DEVELOPED, "40px " + FONT_GAME, "#fff");
    k.textAlign = "center";
    k.textBaseline = "alphabetic";
    k.x = CANVAS_WIDTH / 2;
    k.y = 270;
    d.addChild(k);
    p = s_oSpriteLibrary.getSprite("logo_ctl");
    c = createBitmap(p);
    c.regX = p.width / 2;
    c.regY = p.height / 2;
    c.x = CANVAS_WIDTH / 2;
    c.y = CANVAS_HEIGHT / 2;
    d.addChild(c);
    e = new createjs.Text("www.codethislab.com", "34px " + FONT_GAME, "#000");
    e.textAlign = "center";
    e.textBaseline = "alphabetic";
    e.x = CANVAS_WIDTH / 2;
    e.y = 395;
    e.outline = 3;
    d.addChild(e);
    m = new createjs.Text("www.codethislab.com", "34px " + FONT_GAME, "#fff");
    m.textAlign = "center";
    m.textBaseline = "alphabetic";
    m.x = CANVAS_WIDTH / 2;
    m.y = 395;
    d.addChild(m);
    createjs.Tween.get(d).to(
      {
        alpha: 1,
      },
      600,
      createjs.Ease.cubicOut
    );
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };
  this.refreshButtonPos = function (a, b) {};
  this.unload = function () {
    h.off("click", this._onLogoButRelease);
    f.unload();
    f = null;
    s_oStage.removeChild(d);
  };
  this._onLogoButRelease = function () {
    window.open("http://www.codethislab.com/index.php?&l=en", "_blank");
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
  setShadow: function (a, b, c, f) {
    null !== this._oText &&
      (this._oText.shadow = new createjs.Shadow(a, b, c, f));
  },
  setColor: function (a) {
    this._oText.color = a;
  },
  setAlpha: function (a) {
    this._oText.alpha = a;
  },
  removeTweens: function () {
    createjs.Tween.removeTweens(this._oText);
  },
  getText: function () {
    return this._oText;
  },
  getX: function () {
    return this._x;
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

function CTLText(a, b, c, f, k, n, h, m, e, d, p, y, l, A, w, x, B) {
  this._oContainer = a;
  this._x = b;
  this._y = c;
  this._iWidth = f;
  this._iHeight = k;
  this._bMultiline = x;
  this._iFontSize = n;
  this._szAlign = h;
  this._szColor = m;
  this._szFont = e;
  this._iPaddingH = p;
  this._iPaddingV = y;
  this._bVerticalAlign = w;
  this._bFitText = A;
  this._bDebug = B;
  this._oDebugShape = null;
  this._fLineHeightFactor = d;
  this._oText = null;
  l && this.__createText(l);
}

function extractHostname(a) {
  a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
  a = a.split(":")[0];
  return (a = a.split("?")[0]);
}

function extractRootDomain(a) {
  a = extractHostname(a);
  var b = a.split("."),
    c = b.length;
  2 < c && (a = b[c - 2] + "." + b[c - 1]);
  return a;
}
var getClosestTop = function () {
    var a = window,
      b = !1;
    try {
      for (; a.parent.document !== a.document; )
        if (a.parent.document) a = a.parent;
        else {
          b = !0;
          break;
        }
    } catch (c) {
      b = !0;
    }
    return {
      topFrame: a,
      err: b,
    };
  },
  getBestPageUrl = function (a) {
    var b = a.topFrame,
      c = "";
    if (a.err)
      try {
        try {
          c = window.top.location.href;
        } catch (k) {
          var f = window.location.ancestorOrigins;
          c = f[f.length - 1];
        }
      } catch (k) {
        c = b.document.referrer;
      }
    else c = b.location.href;
    return c;
  },
  TOPFRAMEOBJ = getClosestTop(),
  PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);

function seekAndDestroy() {
  for (
    var a = extractRootDomain(PAGE_URL),
      b = [
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
    c < b.length;
    c++
  )
    if (b[c] === a) return !0;
  return !1;
}
