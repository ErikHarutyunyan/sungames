(function () {
  var a =
      "undefined" !== typeof window && "undefined" !== typeof window.document
        ? window.document
        : {},
    d = "undefined" !== typeof module && module.exports,
    f = "undefined" !== typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
    h = (function () {
      for (
        var b,
          e = [
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
          g = 0,
          f = e.length,
          c = {};
        g < f;
        g++
      )
        if ((b = e[g]) && b[1] in a) {
          for (g = 0; g < b.length; g++) c[e[0][g]] = b[g];
          return c;
        }
      return !1;
    })(),
    b = {
      change: h.fullscreenchange,
      error: h.fullscreenerror,
    },
    m = {
      request: function (b) {
        var e = h.requestFullscreen;
        b = b || a.documentElement;
        if (/5\.1[.\d]* Safari/.test(navigator.userAgent)) b[e]();
        else b[e](f && Element.ALLOW_KEYBOARD_INPUT);
      },
      exit: function () {
        a[h.exitFullscreen]();
      },
      toggle: function (b) {
        this.isFullscreen ? this.exit() : this.request(b);
      },
      onchange: function (b) {
        this.on("change", b);
      },
      onerror: function (b) {
        this.on("error", b);
      },
      on: function (k, e) {
        var g = b[k];
        g && a.addEventListener(g, e, !1);
      },
      off: function (k, e) {
        var g = b[k];
        g && a.removeEventListener(g, e, !1);
      },
      raw: h,
    };
  h
    ? (Object.defineProperties(m, {
        isFullscreen: {
          get: function () {
            return !!a[h.fullscreenElement];
          },
        },
        element: {
          enumerable: !0,
          get: function () {
            return a[h.fullscreenElement];
          },
        },
        enabled: {
          enumerable: !0,
          get: function () {
            return !!a[h.fullscreenEnabled];
          },
        },
      }),
      d ? (module.exports = m) : (window.screenfull = m))
    : d
    ? (module.exports = !1)
    : (window.screenfull = !1);
})();
(function () {
  function a(p) {
    p = String(p);
    return p.charAt(0).toUpperCase() + p.slice(1);
  }

  function d(p, c) {
    var b = -1,
      a = p ? p.length : 0;
    if ("number" == typeof a && -1 < a && a <= t)
      for (; ++b < a; ) c(p[b], b, p);
    else h(p, c);
  }

  function f(p) {
    p = String(p).replace(/^ +| +$/g, "");
    return /^(?:webOS|i(?:OS|P))/.test(p) ? p : a(p);
  }

  function h(p, c) {
    for (var b in p) n.call(p, b) && c(p[b], b, p);
  }

  function b(p) {
    return null == p ? a(p) : q.call(p).slice(8, -1);
  }

  function m(p, c) {
    var b = null != p ? typeof p[c] : "number";
    return (
      !/^(?:boolean|number|string|undefined)$/.test(b) &&
      ("object" == b ? !!p[c] : !0)
    );
  }

  function k(p) {
    return String(p).replace(/([ -])(?!$)/g, "$1?");
  }

  function e(p, c) {
    var b = null;
    d(p, function (a, e) {
      b = c(b, a, e, p);
    });
    return b;
  }

  function g(p) {
    function a(c) {
      return e(c, function (c, b) {
        var a = b.pattern || k(b);
        !c &&
          (c =
            RegExp("\\b" + a + " *\\d+[.\\w_]*", "i").exec(p) ||
            RegExp("\\b" + a + " *\\w+-[\\w]*", "i").exec(p) ||
            RegExp(
              "\\b" + a + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)",
              "i"
            ).exec(p)) &&
          ((c = String(
            b.label && !RegExp(a, "i").test(b.label) ? b.label : c
          ).split("/"))[1] &&
            !/[\d.]+/.test(c[0]) &&
            (c[0] += " " + c[1]),
          (b = b.label || b),
          (c = f(
            c[0]
              .replace(RegExp(a, "i"), b)
              .replace(RegExp("; *(?:" + b + "[_-])?", "i"), " ")
              .replace(RegExp("(" + b + ")[-_.]?(\\w)", "i"), "$1 $2")
          )));
        return c;
      });
    }

    function d(c) {
      return e(c, function (c, b) {
        return (
          c ||
          (RegExp(
            b + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)",
            "i"
          ).exec(p) || 0)[1] ||
          null
        );
      });
    }
    var l = c,
      n = p && "object" == typeof p && "String" != b(p);
    n && ((l = p), (p = null));
    var u = l.navigator || {},
      t = u.userAgent || "";
    p || (p = t);
    var w = n
        ? !!u.likeChrome
        : /\bChrome\b/.test(p) && !/internal|\n/i.test(q.toString()),
      x = n ? "Object" : "ScriptBridgingProxyObject",
      B = n ? "Object" : "Environment",
      G = n && l.java ? "JavaPackage" : b(l.java),
      V = n ? "Object" : "RuntimeObject";
    B = (G = /\bJava/.test(G) && l.java) && b(l.environment) == B;
    var W = G ? "a" : "\u03b1",
      X = G ? "b" : "\u03b2",
      S = l.document || {},
      L = l.operamini || l.opera,
      P = v.test((P = n && L ? L["[[Class]]"] : b(L))) ? P : (L = null),
      r,
      Q = p;
    n = [];
    var R = null,
      M = p == t;
    t = M && L && "function" == typeof L.version && L.version();
    var C = (function (c) {
        return e(c, function (c, b) {
          return (
            c ||
            (RegExp("\\b" + (b.pattern || k(b)) + "\\b", "i").exec(p) &&
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
      y = (function (c) {
        return e(c, function (c, b) {
          return (
            c ||
            (RegExp("\\b" + (b.pattern || k(b)) + "\\b", "i").exec(p) &&
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
      D = a([
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
      J = (function (c) {
        return e(c, function (c, b, a) {
          return (
            c ||
            ((b[D] ||
              b[/^[a-z]+(?: +[a-z]+\b)*/i.exec(D)] ||
              RegExp("\\b" + k(a) + "(?:\\b|\\w*\\d)", "i").exec(p)) &&
              a)
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
      z = (function (c) {
        return e(c, function (c, b) {
          var a = b.pattern || k(b);
          if (
            !c &&
            (c = RegExp("\\b" + a + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(p))
          ) {
            var e = c,
              g = b.label || b,
              d = {
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
            a &&
              g &&
              /^Win/i.test(e) &&
              !/^Windows Phone /i.test(e) &&
              (d = d[/[\d.]+$/.exec(e)]) &&
              (e = "Windows " + d);
            e = String(e);
            a && g && (e = e.replace(RegExp(a, "i"), g));
            c = e = f(
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
          return c;
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
    J && !D && (D = a([J]));
    if ((r = /\bGoogle TV\b/.exec(D))) D = r[0];
    /\bSimulator\b/i.test(p) && (D = (D ? D + " " : "") + "Simulator");
    "Opera Mini" == y &&
      /\bOPiOS\b/.test(p) &&
      n.push("running in Turbo/Uncompressed mode");
    "IE" == y && /\blike iPhone OS\b/.test(p)
      ? ((r = g(p.replace(/like iPhone OS/, ""))),
        (J = r.manufacturer),
        (D = r.product))
      : /^iP/.test(D)
      ? (y || (y = "Safari"),
        (z =
          "iOS" +
          ((r = / OS ([\d_]+)/i.exec(p)) ? " " + r[1].replace(/_/g, ".") : "")))
      : "Konqueror" != y || /buntu/i.test(z)
      ? (J &&
          "Google" != J &&
          ((/Chrome/.test(y) && !/\bMobile Safari\b/i.test(p)) ||
            /\bVita\b/.test(D))) ||
        (/\bAndroid\b/.test(z) && /^Chrome/.test(y) && /\bVersion\//i.test(p))
        ? ((y = "Android Browser"), (z = /\bAndroid\b/.test(z) ? z : "Android"))
        : "Silk" == y
        ? (/\bMobi/i.test(p) || ((z = "Android"), n.unshift("desktop mode")),
          /Accelerated *= *true/i.test(p) && n.unshift("accelerated"))
        : "PaleMoon" == y && (r = /\bFirefox\/([\d.]+)\b/.exec(p))
        ? n.push("identifying as Firefox " + r[1])
        : "Firefox" == y && (r = /\b(Mobile|Tablet|TV)\b/i.exec(p))
        ? (z || (z = "Firefox OS"), D || (D = r[1]))
        : !y ||
          (r = !/\bMinefield\b/i.test(p) && /\b(?:Firefox|Safari)\b/.exec(y))
        ? (y &&
            !D &&
            /[\/,]|^[^(]+?\)/.test(p.slice(p.indexOf(r + "/") + 8)) &&
            (y = null),
          (r = D || J || z) &&
            (D || J || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(z)) &&
            (y =
              /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(z) ? z : r) +
              " Browser"))
        : "Electron" == y &&
          (r = (/\bChrome\/([\d.]+)\b/.exec(p) || 0)[1]) &&
          n.push("Chromium " + r)
      : (z = "Kubuntu");
    t ||
      (t = d([
        "(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))",
        "Version",
        k(y),
        "(?:Firefox|Minefield|NetFront)",
      ]));
    if (
      (r =
        ("iCab" == C && 3 < parseFloat(t) && "WebKit") ||
        (/\bOpera\b/.test(y) && (/\bOPR\b/.test(p) ? "Blink" : "Presto")) ||
        (/\b(?:Midori|Nook|Safari)\b/i.test(p) &&
          !/^(?:Trident|EdgeHTML)$/.test(C) &&
          "WebKit") ||
        (!C && /\bMSIE\b/i.test(p) && ("Mac OS" == z ? "Tasman" : "Trident")) ||
        ("WebKit" == C && /\bPlayStation\b(?! Vita\b)/i.test(y) && "NetFront"))
    )
      C = [r];
    "IE" == y && (r = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(p) || 0)[1])
      ? ((y += " Mobile"),
        (z = "Windows Phone " + (/\+$/.test(r) ? r : r + ".x")),
        n.unshift("desktop mode"))
      : /\bWPDesktop\b/i.test(p)
      ? ((y = "IE Mobile"),
        (z = "Windows Phone 8.x"),
        n.unshift("desktop mode"),
        t || (t = (/\brv:([\d.]+)/.exec(p) || 0)[1]))
      : "IE" != y &&
        "Trident" == C &&
        (r = /\brv:([\d.]+)/.exec(p)) &&
        (y && n.push("identifying as " + y + (t ? " " + t : "")),
        (y = "IE"),
        (t = r[1]));
    if (M) {
      if (m(l, "global"))
        if (
          (G &&
            ((r = G.lang.System),
            (Q = r.getProperty("os.arch")),
            (z =
              z ||
              r.getProperty("os.name") + " " + r.getProperty("os.version"))),
          B)
        ) {
          try {
            (t = l.require("ringo/engine").version.join(".")), (y = "RingoJS");
          } catch (U) {
            (r = l.system) &&
              r.global.system == l.system &&
              ((y = "Narwhal"), z || (z = r[0].os || null));
          }
          y || (y = "Rhino");
        } else
          "object" == typeof l.process &&
            !l.process.browser &&
            (r = l.process) &&
            ("object" == typeof r.versions &&
              ("string" == typeof r.versions.electron
                ? (n.push("Node " + r.versions.node),
                  (y = "Electron"),
                  (t = r.versions.electron))
                : "string" == typeof r.versions.nw &&
                  (n.push("Chromium " + t, "Node " + r.versions.node),
                  (y = "NW.js"),
                  (t = r.versions.nw))),
            y ||
              ((y = "Node.js"),
              (Q = r.arch),
              (z = r.platform),
              (t = (t = /[\d.]+/.exec(r.version)) ? t[0] : null)));
      else
        b((r = l.runtime)) == x
          ? ((y = "Adobe AIR"), (z = r.flash.system.Capabilities.os))
          : b((r = l.phantom)) == V
          ? ((y = "PhantomJS"),
            (t =
              (r = r.version || null) &&
              r.major + "." + r.minor + "." + r.patch))
          : "number" == typeof S.documentMode &&
            (r = /\bTrident\/(\d+)/i.exec(p))
          ? ((t = [t, S.documentMode]),
            (r = +r[1] + 4) != t[1] &&
              (n.push("IE " + t[1] + " mode"), C && (C[1] = ""), (t[1] = r)),
            (t = "IE" == y ? String(t[1].toFixed(1)) : t[0]))
          : "number" == typeof S.documentMode &&
            /^(?:Chrome|Firefox)\b/.test(y) &&
            (n.push("masking as " + y + " " + t),
            (y = "IE"),
            (t = "11.0"),
            (C = ["Trident"]),
            (z = "Windows"));
      z = z && f(z);
    }
    t &&
      (r =
        /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(t) ||
        /(?:alpha|beta)(?: ?\d)?/i.exec(p + ";" + (M && u.appMinorVersion)) ||
        (/\bMinefield\b/i.test(p) && "a")) &&
      ((R = /b/i.test(r) ? "beta" : "alpha"),
      (t =
        t.replace(RegExp(r + "\\+?$"), "") +
        ("beta" == R ? X : W) +
        (/\d+\+?/.exec(r) || "")));
    if (
      "Fennec" == y ||
      ("Firefox" == y && /\b(?:Android|Firefox OS)\b/.test(z))
    )
      y = "Firefox Mobile";
    else if ("Maxthon" == y && t) t = t.replace(/\.[\d.]+/, ".x");
    else if (/\bXbox\b/i.test(D))
      "Xbox 360" == D && (z = null),
        "Xbox 360" == D && /\bIEMobile\b/.test(p) && n.unshift("mobile mode");
    else if (
      (!/^(?:Chrome|IE|Opera)$/.test(y) &&
        (!y || D || /Browser|Mobi/.test(y))) ||
      ("Windows CE" != z && !/Mobi/i.test(p))
    )
      if ("IE" == y && M)
        try {
          null === l.external && n.unshift("platform preview");
        } catch (U) {
          n.unshift("embedded");
        }
      else
        (/\bBlackBerry\b/.test(D) || /\bBB10\b/.test(p)) &&
        (r =
          (RegExp(D.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(p) ||
            0)[1] || t)
          ? ((r = [r, /BB10/.test(p)]),
            (z =
              (r[1] ? ((D = null), (J = "BlackBerry")) : "Device Software") +
              " " +
              r[0]),
            (t = null))
          : this != h &&
            "Wii" != D &&
            ((M && L) ||
              (/Opera/.test(y) && /\b(?:MSIE|Firefox)\b/i.test(p)) ||
              ("Firefox" == y && /\bOS X (?:\d+\.){2,}/.test(z)) ||
              ("IE" == y &&
                ((z && !/^Win/.test(z) && 5.5 < t) ||
                  (/\bWindows XP\b/.test(z) && 8 < t) ||
                  (8 == t && !/\bTrident\b/.test(p))))) &&
            !v.test((r = g.call(h, p.replace(v, "") + ";"))) &&
            r.name &&
            ((r = "ing as " + r.name + ((r = r.version) ? " " + r : "")),
            v.test(y)
              ? (/\bIE\b/.test(r) && "Mac OS" == z && (z = null),
                (r = "identify" + r))
              : ((r = "mask" + r),
                (y = P ? f(P.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera"),
                /\bIE\b/.test(r) && (z = null),
                M || (t = null)),
            (C = ["Presto"]),
            n.push(r));
    else y += " Mobile";
    if ((r = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(p) || 0)[1])) {
      r = [parseFloat(r.replace(/\.(\d)$/, ".0$1")), r];
      if ("Safari" == y && "+" == r[1].slice(-1))
        (y = "WebKit Nightly"), (R = "alpha"), (t = r[1].slice(0, -1));
      else if (
        t == r[1] ||
        t == (r[2] = (/\bSafari\/([\d.]+\+?)/i.exec(p) || 0)[1])
      )
        t = null;
      r[1] = (/\bChrome\/([\d.]+)/i.exec(p) || 0)[1];
      537.36 == r[0] &&
        537.36 == r[2] &&
        28 <= parseFloat(r[1]) &&
        "WebKit" == C &&
        (C = ["Blink"]);
      M && (w || r[1])
        ? (C && (C[1] = "like Chrome"),
          (r =
            r[1] ||
            ((r = r[0]),
            530 > r
              ? 1
              : 532 > r
              ? 2
              : 532.05 > r
              ? 3
              : 533 > r
              ? 4
              : 534.03 > r
              ? 5
              : 534.07 > r
              ? 6
              : 534.1 > r
              ? 7
              : 534.13 > r
              ? 8
              : 534.16 > r
              ? 9
              : 534.24 > r
              ? 10
              : 534.3 > r
              ? 11
              : 535.01 > r
              ? 12
              : 535.02 > r
              ? "13+"
              : 535.07 > r
              ? 15
              : 535.11 > r
              ? 16
              : 535.19 > r
              ? 17
              : 536.05 > r
              ? 18
              : 536.1 > r
              ? 19
              : 537.01 > r
              ? 20
              : 537.11 > r
              ? "21+"
              : 537.13 > r
              ? 23
              : 537.18 > r
              ? 24
              : 537.24 > r
              ? 25
              : 537.36 > r
              ? 26
              : "Blink" != C
              ? "27"
              : "28")))
        : (C && (C[1] = "like Safari"),
          (r =
            ((r = r[0]),
            400 > r
              ? 1
              : 500 > r
              ? 2
              : 526 > r
              ? 3
              : 533 > r
              ? 4
              : 534 > r
              ? "4+"
              : 535 > r
              ? 5
              : 537 > r
              ? 6
              : 538 > r
              ? 7
              : 601 > r
              ? 8
              : "8")));
      C &&
        (C[1] +=
          " " + (r += "number" == typeof r ? ".x" : /[.+]/.test(r) ? "" : "+"));
      "Safari" == y && (!t || 45 < parseInt(t)) && (t = r);
    }
    "Opera" == y && (r = /\bzbov|zvav$/.exec(z))
      ? ((y += " "),
        n.unshift("desktop mode"),
        "zvav" == r ? ((y += "Mini"), (t = null)) : (y += "Mobile"),
        (z = z.replace(RegExp(" *" + r + "$"), "")))
      : "Safari" == y &&
        /\bChrome\b/.exec(C && C[1]) &&
        (n.unshift("desktop mode"),
        (y = "Chrome Mobile"),
        (t = null),
        /\bOS X\b/.test(z) ? ((J = "Apple"), (z = "iOS 4.3+")) : (z = null));
    t &&
      0 == t.indexOf((r = /[\d.]+$/.exec(z))) &&
      -1 < p.indexOf("/" + r + "-") &&
      (z = String(z.replace(r, "")).replace(/^ +| +$/g, ""));
    C &&
      !/\b(?:Avant|Nook)\b/.test(y) &&
      (/Browser|Lunascape|Maxthon/.test(y) ||
        ("Safari" != y && /^iOS/.test(z) && /\bSafari\b/.test(C[1])) ||
        (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
          y
        ) &&
          C[1])) &&
      (r = C[C.length - 1]) &&
      n.push(r);
    n.length && (n = ["(" + n.join("; ") + ")"]);
    J && D && 0 > D.indexOf(J) && n.push("on " + J);
    D && n.push((/^on /.test(n[n.length - 1]) ? "" : "on ") + D);
    if (z) {
      var T =
        (r = / ([\d.+]+)$/.exec(z)) &&
        "/" == z.charAt(z.length - r[0].length - 1);
      z = {
        architecture: 32,
        family: r && !T ? z.replace(r[0], "") : z,
        version: r ? r[1] : null,
        toString: function () {
          var c = this.version;
          return (
            this.family +
            (c && !T ? " " + c : "") +
            (64 == this.architecture ? " 64-bit" : "")
          );
        },
      };
    }
    (r = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(Q)) && !/\bi686\b/i.test(Q)
      ? (z &&
          ((z.architecture = 64),
          (z.family = z.family.replace(RegExp(" *" + r), ""))),
        y &&
          (/\bWOW64\b/i.test(p) ||
            (M &&
              /\w(?:86|32)$/.test(u.cpuClass || u.platform) &&
              !/\bWin64; x64\b/i.test(p))) &&
          n.unshift("32-bit"))
      : z &&
        /^OS X/.test(z.family) &&
        "Chrome" == y &&
        39 <= parseFloat(t) &&
        (z.architecture = 64);
    p || (p = null);
    l = {};
    l.description = p;
    l.layout = C && C[0];
    l.manufacturer = J;
    l.name = y;
    l.prerelease = R;
    l.product = D;
    l.ua = p;
    l.version = y && t;
    l.os = z || {
      architecture: null,
      family: null,
      version: null,
      toString: function () {
        return "null";
      },
    };
    l.parse = g;
    l.toString = function () {
      return this.description || "";
    };
    l.version && n.unshift(t);
    l.name && n.unshift(y);
    z &&
      y &&
      (z != String(z).split(" ")[0] || (z != y.split(" ")[0] && !D)) &&
      n.push(D ? "(" + z + ")" : "on " + z);
    n.length && (l.description = n.join(" "));
    return l;
  }
  var l = {
      function: !0,
      object: !0,
    },
    c = (l[typeof window] && window) || this,
    u = l[typeof exports] && exports;
  l = l[typeof module] && module && !module.nodeType && module;
  var x = u && l && "object" == typeof global && global;
  !x || (x.global !== x && x.window !== x && x.self !== x) || (c = x);
  var t = Math.pow(2, 53) - 1,
    v = /\bOpera/;
  x = Object.prototype;
  var n = x.hasOwnProperty,
    q = x.toString,
    w = g();
  "function" == typeof define && "object" == typeof define.amd && define.amd
    ? ((c.platform = w),
      define(function () {
        return w;
      }))
    : u && l
    ? h(w, function (c, b) {
        u[b] = c;
      })
    : (c.platform = w);
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
      d = 0;
    d < a.length;
    d++
  ) {
    var f = document.createElement("meta");
    f.name = a[d].name;
    f.content = a[d].content;
    var h = window.document.head.querySelector('meta[name="' + f.name + '"]');
    h && h.parentNode.removeChild(h);
    window.document.head.appendChild(f);
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
$(document).ready(function () {
  platform &&
    "iPhone" === platform.product &&
    "safari" !== platform.name.toLowerCase() &&
    (buildIOSFullscreenPanel(), buildIOSMeta());
});
jQuery(window).resize(function () {
  platform &&
    "iPhone" === platform.product &&
    "safari" !== platform.name.toLowerCase() &&
    iosResize();
});
var s_iOffsetX = 0,
  s_iOffsetY = 0,
  s_fInverseScaling = 0,
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
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
  window.matchMedia("(orientation: portrait)").matches && sizeHandler();
  window.matchMedia("(orientation: landscape)").matches && sizeHandler();
}

function getSize(a) {
  var d = a.toLowerCase(),
    f = window.document,
    h = f.documentElement;
  if (void 0 === window["inner" + a]) a = h["client" + a];
  else if (window["inner" + a] != h["client" + a]) {
    var b = f.createElement("body");
    b.id = "vpw-test-b";
    b.style.cssText = "overflow:scroll";
    var m = f.createElement("div");
    m.id = "vpw-test-d";
    m.style.cssText = "position:absolute;top:-1000px";
    m.innerHTML =
      "<style>@media(" +
      d +
      ":" +
      h["client" + a] +
      "px){body#vpw-test-b div#vpw-test-d{" +
      d +
      ":7px!important}}</style>";
    b.appendChild(m);
    h.insertBefore(b, f.head);
    a = 7 == m["offset" + a] ? h["client" + a] : window["inner" + a];
    h.removeChild(b);
  } else a = window["inner" + a];
  return a;
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
    var d = getSize("Width");
    _checkOrientation(d, a);
    s_iScaleFactor = Math.min(a / CANVAS_HEIGHT, d / CANVAS_WIDTH);
    var f = CANVAS_WIDTH * s_iScaleFactor,
      h = CANVAS_HEIGHT * s_iScaleFactor;
    if (h < a) {
      var b = a - h;
      h += b;
      f += (CANVAS_WIDTH / CANVAS_HEIGHT) * b;
    } else
      f < d &&
        ((b = d - f), (f += b), (h += (CANVAS_HEIGHT / CANVAS_WIDTH) * b));
    b = a / 2 - h / 2;
    var m = d / 2 - f / 2,
      k = CANVAS_WIDTH / f;
    if (m * k < -EDGEBOARD_X || b * k < -EDGEBOARD_Y)
      (s_iScaleFactor = Math.min(
        a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y),
        d / (CANVAS_WIDTH - 2 * EDGEBOARD_X)
      )),
        (f = CANVAS_WIDTH * s_iScaleFactor),
        (h = CANVAS_HEIGHT * s_iScaleFactor),
        (b = (a - h) / 2),
        (m = (d - f) / 2),
        (k = CANVAS_WIDTH / f);
    s_fInverseScaling = k;
    s_iOffsetX = -1 * m * k;
    s_iOffsetY = -1 * b * k;
    0 <= b && (s_iOffsetY = 0);
    0 <= m && (s_iOffsetX = 0);
    null !== s_oInterface &&
      s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    s_bIsIphone
      ? ((canvas = document.getElementById("canvas")),
        (s_oStage.canvas.width = 2 * f),
        (s_oStage.canvas.height = 2 * h),
        (canvas.style.width = f + "px"),
        (canvas.style.height = h + "px"),
        (d = Math.min(f / CANVAS_WIDTH, h / CANVAS_HEIGHT)),
        (s_iScaleFactor = 2 * d),
        (s_oStage.scaleX = s_oStage.scaleY = 2 * d))
      : s_bMobile && !1 === isIOS()
      ? ($("#canvas").css("width", f + "px"),
        $("#canvas").css("height", h + "px"))
      : ((s_oStage.canvas.width = f),
        (s_oStage.canvas.height = h),
        (s_iScaleFactor = Math.min(f / CANVAS_WIDTH, h / CANVAS_HEIGHT)),
        (s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor));
    0 > b || (b = (a - h) / 2);
    $("#canvas").css("top", b + "px");
    s_iCanvasOffsetHeight = b;
    $("#canvas").css("left", m + "px");
    s_iCanvasResizeWidth = f;
    s_iCanvasResizeHeight = h;
    s_iCanvasOffsetWidth = m;
    fullscreenHandler();
  }
}

function _checkOrientation(a, d) {
  s_bMobile &&
    ENABLE_CHECK_ORIENTATION &&
    (a > d
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

function createBitmap(a, d, f) {
  var h = new createjs.Bitmap(a),
    b = new createjs.Shape();
  d && f
    ? b.graphics.beginFill("#fff").drawRect(-d / 2, -f / 2, d, f)
    : b.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
  h.hitArea = b;
  return h;
}

function createSprite(a, d, f, h, b, m) {
  a = null !== d ? new createjs.Sprite(a, d) : new createjs.Sprite(a);
  d = new createjs.Shape();
  d.graphics.beginFill("#000000").drawRect(-f, -h, b, m);
  a.hitArea = d;
  return a;
}

function roundDecimal(a, d) {
  var f = Math.pow(10, d);
  return Math.round(f * a) / f;
}

function randomFloatBetween(a, d, f) {
  "undefined" === typeof f && (f = 2);
  return parseFloat(Math.min(a + Math.random() * (d - a), d).toFixed(f));
}

function shuffle(a) {
  for (var d = a.length, f, h; 0 !== d; )
    (h = Math.floor(Math.random() * d)),
      --d,
      (f = a[d]),
      (a[d] = a[h]),
      (a[h] = f);
  return a;
}

function formatTime(a) {
  a /= 1e3;
  var d = Math.floor(a / 60);
  a = parseFloat(a - 60 * d).toFixed(1);
  var f = "";
  f = 10 > d ? f + ("0" + d + ":") : f + (d + ":");
  return 10 > a ? f + ("0" + a) : f + a;
}

function degreesToRadians(a) {
  return (a * Math.PI) / 180;
}

function checkRectCollision(a, d) {
  var f = getBounds(a, 0.9);
  var h = getBounds(d, 0.98);
  return calculateIntersection(f, h);
}

function calculateIntersection(a, d) {
  var f, h, b, m;
  var k = a.x + (f = a.width / 2);
  var e = a.y + (h = a.height / 2);
  var g = d.x + (b = d.width / 2);
  var l = d.y + (m = d.height / 2);
  k = Math.abs(k - g) - (f + b);
  e = Math.abs(e - l) - (h + m);
  return 0 > k && 0 > e
    ? ((k = Math.min(Math.min(a.width, d.width), -k)),
      (e = Math.min(Math.min(a.height, d.height), -e)),
      {
        x: Math.max(a.x, d.x),
        y: Math.max(a.y, d.y),
        width: k,
        height: e,
        rect1: a,
        rect2: d,
      })
    : null;
}

function getBounds(a, d) {
  var f = {
    x: Infinity,
    y: Infinity,
    width: 0,
    height: 0,
  };
  if (a instanceof createjs.Container) {
    f.x2 = -Infinity;
    f.y2 = -Infinity;
    var h = a.children,
      b = h.length,
      m;
    for (m = 0; m < b; m++) {
      var k = getBounds(h[m], 1);
      k.x < f.x && (f.x = k.x);
      k.y < f.y && (f.y = k.y);
      k.x + k.width > f.x2 && (f.x2 = k.x + k.width);
      k.y + k.height > f.y2 && (f.y2 = k.y + k.height);
    }
    Infinity == f.x && (f.x = 0);
    Infinity == f.y && (f.y = 0);
    Infinity == f.x2 && (f.x2 = 0);
    Infinity == f.y2 && (f.y2 = 0);
    f.width = f.x2 - f.x;
    f.height = f.y2 - f.y;
    delete f.x2;
    delete f.y2;
  } else {
    if (a instanceof createjs.Bitmap) {
      b = a.sourceRect || a.image;
      m = b.width * d;
      var e = b.height * d;
    } else if (a instanceof createjs.Sprite)
      if (
        a.spriteSheet._frames &&
        a.spriteSheet._frames[a.currentFrame] &&
        a.spriteSheet._frames[a.currentFrame].image
      ) {
        b = a.spriteSheet.getFrame(a.currentFrame);
        m = b.rect.width;
        e = b.rect.height;
        h = b.regX;
        var g = b.regY;
      } else (f.x = a.x || 0), (f.y = a.y || 0);
    else (f.x = a.x || 0), (f.y = a.y || 0);
    h = h || 0;
    m = m || 0;
    g = g || 0;
    e = e || 0;
    f.regX = h;
    f.regY = g;
    b = a.localToGlobal(0 - h, 0 - g);
    k = a.localToGlobal(m - h, e - g);
    m = a.localToGlobal(m - h, 0 - g);
    h = a.localToGlobal(0 - h, e - g);
    f.x = Math.min(Math.min(Math.min(b.x, k.x), m.x), h.x);
    f.y = Math.min(Math.min(Math.min(b.y, k.y), m.y), h.y);
    f.width = Math.max(Math.max(Math.max(b.x, k.x), m.x), h.x) - f.x;
    f.height = Math.max(Math.max(Math.max(b.y, k.y), m.y), h.y) - f.y;
  }
  return f;
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
      3 == a.nodeType && (a = a.parentNode);
      var d = document.createEvent("MouseEvents");
      d.initEvent("click", !0, !0);
      a.dispatchEvent(d);
    }
  },
};
(function () {
  function a(a) {
    var f = {
      focus: "visible",
      focusin: "visible",
      pageshow: "visible",
      blur: "hidden",
      focusout: "hidden",
      pagehide: "hidden",
    };
    a = a || window.event;
    a.type in f
      ? (document.body.className = f[a.type])
      : ((document.body.className = this[d] ? "hidden" : "visible"),
        "hidden" === document.body.className
          ? s_oMain.stopUpdate()
          : s_oMain.startUpdate());
  }
  var d = "hidden";
  d in document
    ? document.addEventListener("visibilitychange", a)
    : (d = "mozHidden") in document
    ? document.addEventListener("mozvisibilitychange", a)
    : (d = "webkitHidden") in document
    ? document.addEventListener("webkitvisibilitychange", a)
    : (d = "msHidden") in document
    ? document.addEventListener("msvisibilitychange", a)
    : "onfocusin" in document
    ? (document.onfocusin = document.onfocusout = a)
    : (window.onpageshow =
        window.onpagehide =
        window.onfocus =
        window.onblur =
          a);
})();

function playSound(a, d, f) {
  return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
    ? (s_aSounds[a].play(),
      s_aSounds[a].volume(d),
      s_aSounds[a].loop(f),
      s_aSounds[a])
    : null;
}

function stopSound(a) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].stop();
}

function setVolume(a, d) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].volume(d);
}

function setMute(a, d) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].mute(d);
}

function ctlArcadeResume() {
  null !== s_oMain && s_oMain.startUpdate();
}

function ctlArcadePause() {
  null !== s_oMain && s_oMain.stopUpdate();
}

function getParamValue(a) {
  for (
    var d = window.location.search.substring(1).split("&"), f = 0;
    f < d.length;
    f++
  ) {
    var h = d[f].split("=");
    if (h[0] == a) return h[1];
  }
}

function fullscreenHandler() {
  ENABLE_FULLSCREEN &&
    !1 !== screenfull.enabled &&
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
    d,
    f,
    h,
    b,
    m,
    k;
  this.init = function (a, g, l) {
    d = {};
    h = f = 0;
    b = a;
    m = g;
    k = l;
  };
  this.addSprite = function (b, g) {
    if (!a.hasOwnProperty(b)) {
      var e = new Image();
      a[b] = d[b] = {
        szPath: g,
        oSprite: e,
        bLoaded: !1,
      };
      f++;
    }
  };
  this.getSprite = function (b) {
    return a.hasOwnProperty(b) ? a[b].oSprite : null;
  };
  this._onSpritesLoaded = function () {
    f = 0;
    m.call(k);
  };
  this._onSpriteLoaded = function () {
    b.call(k);
    ++h === f && this._onSpritesLoaded();
  };
  this.loadSprites = function () {
    for (var b in d)
      (d[b].oSprite.oSpriteLibrary = this),
        (d[b].oSprite.szKey = b),
        (d[b].oSprite.onload = function () {
          this.oSpriteLibrary.setLoaded(this.szKey);
          this.oSpriteLibrary._onSpriteLoaded(this.szKey);
        }),
        (d[b].oSprite.onerror = function (b) {
          var a = b.currentTarget;
          setTimeout(function () {
            d[a.szKey].oSprite.src = d[a.szKey].szPath;
          }, 500);
        }),
        (d[b].oSprite.src = d[b].szPath);
  };
  this.setLoaded = function (b) {
    a[b].bLoaded = !0;
  };
  this.isLoaded = function (b) {
    return a[b].bLoaded;
  };
  this.getNumSprites = function () {
    return f;
  };
}
var CANVAS_WIDTH = 1280,
  CANVAS_HEIGHT = 768,
  EDGEBOARD_X = 90,
  EDGEBOARD_Y = 95,
  FPS = 30,
  FPS_TIME = 1e3 / FPS,
  DISABLE_SOUND_MOBILE = !1,
  STATE_LOADING = 0,
  STATE_MENU = 1,
  STATE_HELP = 1,
  STATE_GAME = 3,
  STATE_GAME_WAITING_FOR_BET = 0,
  STATE_GAME_SPINNING = 1,
  STATE_GAME_SHOW_WINNER = 2,
  STATE_DISTRIBUTE_FICHES = 3,
  ON_SHOW_BET_ON_TABLE = 0,
  ON_SHOW_ENLIGHT = 1,
  ON_HIDE_ENLIGHT = 2,
  ON_MOUSE_DOWN = 0,
  ON_MOUSE_UP = 1,
  ON_MOUSE_OVER = 2,
  ON_MOUSE_OUT = 3,
  ON_DRAG_START = 4,
  ON_DRAG_END = 5,
  ON_CONTROLLER_END = 6,
  ON_CONTROLLER_REMOVE = 7,
  ON_CONTROLLER_ROLL = 8,
  COLOR_RED = "red",
  COLOR_BLACK = "black",
  COLOR_ZERO = "zero",
  TOTAL_MONEY,
  NUM_FICHE_VALUES = 6,
  NUMBERS_TO_BET = 37,
  NUM_FICHES = 6,
  MIN_BET,
  MAX_BET,
  WIN_OCCURRENCE,
  TIME_WAITING_BET,
  TIME_SHOW_WINNER,
  TIME_FICHES_MOV = 1500,
  NUM_MASK_BALL_SPIN_FRAMES = 100,
  NUM_BALL_SPIN_FRAMES = 200,
  NUM_HAND_FOR_ADS,
  WIDTH_CELL_NUMBER,
  HEIGHT_CELL_NUMBER,
  ROW_HISTORY = 19,
  FONT1 = "arialbold",
  FONT2 = "plantagenet_cherokeeregular",
  ENABLE_FULLSCREEN,
  ENABLE_CHECK_ORIENTATION,
  SHOW_CREDITS;

function CRouletteSettings() {
  var a, d, f, h, b;
  this._init = function () {
    var b = s_oSpriteLibrary.getSprite("hit_area_number");
    WIDTH_CELL_NUMBER = b.width;
    HEIGHT_CELL_NUMBER = b.height;
    this._initAttachFiches();
    a = [0.1, 1, 5, 10, 25, 100];
    f = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
    d = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    h = [[]];
    h[0][0] = 70;
    h[0][1] = 8;
    h[0][2] = 54;
    h[0][3] = 76;
    h[0][4] = 59;
    h[0][5] = 19;
    h[0][6] = 43;
    h[0][7] = 86;
    h[0][8] = 27;
    h[0][9] = 96;
    h[0][10] = 21;
    h[0][11] = 32;
    h[0][12] = 81;
    h[0][13] = 38;
    h[0][14] = 3;
    h[0][15] = 65;
    h[0][16] = 13;
    h[0][17] = 48;
    h[0][18] = 92;
    h[0][19] = 62;
    h[0][20] = 5;
    h[0][21] = 57;
    h[0][22] = 95;
    h[0][23] = 24;
    h[0][24] = 16;
    h[0][25] = 51;
    h[0][26] = 73;
    h[0][27] = 40;
    h[0][28] = 84;
    h[0][29] = 89;
    h[0][30] = 30;
    h[0][31] = 0;
    h[0][32] = 68;
    h[0][33] = 11;
    h[0][34] = 46;
    h[0][35] = 78;
    h[0][36] = 35;
  };
  this._initAttachFiches = function () {
    b = [];
    b.bet_0 = {
      x: 53,
      y: 117,
    };
    for (var a = 127, k = 196, e = 1; 37 > e; e++)
      (b["bet_" + e] = {
        x: a,
        y: k,
      }),
        0 === e % 3
          ? ((a += WIDTH_CELL_NUMBER + 3), (k = 196))
          : (k -= HEIGHT_CELL_NUMBER + 3);
    b.bet_0_1 = {
      x: 97,
      y: 195,
    };
    b.bet_0_2 = {
      x: 97,
      y: 120,
    };
    b.bet_0_3 = {
      x: 97,
      y: 45,
    };
    a = 159;
    k = 194;
    for (var g = 1; 34 > g; g++)
      (b["bet_" + g + "_" + (g + 3)] = {
        x: a,
        y: k,
      }),
        0 === g % 3
          ? ((a += WIDTH_CELL_NUMBER + 3), (k = 194))
          : (k -= HEIGHT_CELL_NUMBER + 3);
    a = 128;
    k = 157;
    for (g = e = 1; 25 > g; g++)
      (b["bet_" + e + "_" + (e + 1)] = {
        x: a,
        y: k,
      }),
        0 === g % 2
          ? ((a += WIDTH_CELL_NUMBER + 3), (k = 157), (e += 2))
          : ((k -= HEIGHT_CELL_NUMBER + 3), e++);
    b.bet_0_1_2 = {
      x: 96,
      y: 158,
    };
    b.bet_0_2_3 = {
      x: 96,
      y: 84,
    };
    a = 128;
    k = 232;
    for (g = e = 1; 13 > g; g++)
      (b["bet_" + e + "_" + (e + 1) + "_" + (e + 2)] = {
        x: a,
        y: k,
      }),
        (a += WIDTH_CELL_NUMBER + 3),
        (e += 3);
    b.bet_0_1_2_3 = {
      x: 96,
      y: 232,
    };
    k = a = 158;
    for (g = e = 1; 23 > g; g++)
      (b["bet_" + e + "_" + (e + 1) + "_" + (e + 3) + "_" + (e + 4)] = {
        x: a,
        y: k,
      }),
        0 === g % 2
          ? ((a += WIDTH_CELL_NUMBER + 3), (k = 157), (e += 2))
          : ((k -= HEIGHT_CELL_NUMBER + 3), e++);
    a = 158;
    k = 232;
    for (g = e = 1; 12 > g; g++)
      (b[
        "bet_" +
          e +
          "_" +
          (e + 1) +
          "_" +
          (e + 2) +
          "_" +
          (e + 3) +
          "_" +
          (e + 4) +
          "_" +
          (e + 5)
      ] = {
        x: a,
        y: k,
      }),
        (e += 3),
        (a += WIDTH_CELL_NUMBER + 3);
    b.col1 = {
      x: 872,
      y: 194,
    };
    b.col2 = {
      x: 872,
      y: 120,
    };
    b.col3 = {
      x: 872,
      y: 46,
    };
    b.first12 = {
      x: 220,
      y: 289,
    };
    b.second12 = {
      x: 469,
      y: 289,
    };
    b.third12 = {
      x: 717,
      y: 289,
    };
    b.first18 = {
      x: 159,
      y: 400,
    };
    b.even = {
      x: 281,
      y: 400,
    };
    b.black = {
      x: 409,
      y: 400,
    };
    b.red = {
      x: 533,
      y: 400,
    };
    b.odd = {
      x: 656,
      y: 400,
    };
    b.second18 = {
      x: 778,
      y: 400,
    };
    b.oDealerWin = {
      x: CANVAS_WIDTH / 2,
      y: -232,
    };
    b.oReceiveWin = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT + 100,
    };
  };
  this.generateFichesPileByIndex = function (b) {
    var k = [],
      e = a.length - 1,
      g = a[e];
    do {
      var d = b % g;
      d = roundDecimal(d, 1);
      b = roundDecimal(b / g, 1);
      b = Math.floor(b);
      for (var c = 0; c < b; c++) k.push(this.getFicheIndexByValue(g));
      e--;
      g = a[e];
      b = d;
    } while (0 < d && -1 < e);
    return k;
  };
  this.getNumbersForButton = function (b) {
    switch (b) {
      case "col1":
        var a = [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
        break;
      case "col2":
        a = [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35];
        break;
      case "col3":
        a = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36];
        break;
      case "first12":
        a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        break;
      case "second12":
        a = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
        break;
      case "third12":
        a = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
        break;
      case "first18":
        a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
        break;
      case "second18":
        a = [
          19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
          36,
        ];
        break;
      case "even":
        a = [
          2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36,
        ];
        break;
      case "black":
        a = [
          2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
        ];
        break;
      case "red":
        a = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        break;
      case "odd":
        a = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];
        break;
      case "oBetVoisinsZero":
        a = [22, 18, 29, 7, 28, 12, 35, 3, 26, 0, 32, 15, 19, 4, 21, 2, 25];
        break;
      case "oBetTier":
        a = [27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33];
        break;
      case "oBetOrphelins":
        a = [1, 6, 9, 14, 17, 20, 31, 34];
    }
    return a;
  };
  this.getBetMultiplierForButton = function (b) {
    switch (b) {
      case "oBetFirstRow":
        var a = 12;
        break;
      case "oBetSecondRow":
        a = 12;
        break;
      case "oBetThirdRow":
        a = 12;
        break;
      case "oBetFirst12":
        a = 12;
        break;
      case "oBetSecond12":
        a = 12;
        break;
      case "oBetThird12":
        a = 12;
        break;
      case "oBetFirst18":
        a = 18;
        break;
      case "oBetSecond18":
        a = 18;
        break;
      case "oBetEven":
        a = 18;
        break;
      case "oBetBlack":
        a = 18;
        break;
      case "oBetRed":
        a = 18;
        break;
      case "oBetOdd":
        a = 18;
        break;
      case "oBetVoisinsZero":
        a = 17;
        break;
      case "oBetTier":
        a = 12;
        break;
      case "oBetOrphelins":
        a = 8;
        break;
      case "oBetFinalsBet":
        a = 4;
    }
    return a;
  };
  this.getBetWinForButton = function (b) {
    switch (b) {
      case "oBetFirstRow":
        var a = 3;
        break;
      case "oBetSecondRow":
        a = 3;
        break;
      case "oBetThirdRow":
        a = 3;
        break;
      case "oBetFirst12":
        a = 3;
        break;
      case "oBetSecond12":
        a = 3;
        break;
      case "oBetThird12":
        a = 3;
        break;
      case "oBetFirst18":
        a = 2;
        break;
      case "oBetSecond18":
        a = 2;
        break;
      case "oBetEven":
        a = 2;
        break;
      case "oBetBlack":
        a = 2;
        break;
      case "oBetRed":
        a = 2;
        break;
      case "oBetOdd":
        a = 2;
        break;
      case "oBetVoisinsZero":
        a = 2;
        break;
      case "oBetTier":
        a = 3;
        break;
      case "oBetOrphelins":
        a = 4;
        break;
      case "oBetFinalsBet":
        a = 4;
    }
    return a;
  };
  this.getNumFichesPerBet = function (a) {
    switch (a) {
      case "oBetVoisinsZero":
        var b = 9;
        break;
      case "oBetTier":
        b = 6;
        break;
      case "oBetOrphelins":
        b = 5;
    }
    return b;
  };
  this.getFicheValues = function (b) {
    return a[b];
  };
  this.getFicheIndexByValue = function (b) {
    for (var d = 0, e = 0; e < a.length; e++)
      if (b === a[e]) {
        d = e;
        break;
      }
    return d;
  };
  this.getColorNumber = function (b) {
    var a;
    for (a = 0; a < f.length; a++) if (f[a] === b) return COLOR_BLACK;
    for (a = 0; a < d.length; a++) if (d[a] === b) return COLOR_RED;
    return COLOR_ZERO;
  };
  this.getFrameForBallSpin = function (a, b) {
    return h[a][b];
  };
  this.getAttachOffset = function (a) {
    return b[a];
  };
  this._init();
}

function CFichesController(a) {
  var d, f, h, b, m, k;
  this._init = function (a) {
    k = a;
    this.reset();
  };
  this.reset = function () {
    this._removeAllFichesOnTable();
    d = [];
    f = [];
    h = [];
    b = [];
    m = [];
  };
  this.setFicheOnTable = function (a, g, d) {
    this.addFicheOnTable(a, g, d);
    b.push({
      tag: "oBetSingle",
      num: 1,
    });
  };
  this.addFicheOnTable = function (a, b, k) {
    void 0 === d[b] && (d[b] = 0);
    var c = s_oGameSettings.getFicheValues(a);
    d[b] += c;
    d[b] = roundDecimal(d[b], 1);
    c = s_oGameSettings.generateFichesPileByIndex(d[b]);
    c.sort(function (b, a) {
      return b - a;
    });
    this._removeFichesPile(f[b]);
    f[b] = [];
    var e = s_oGameSettings.getAttachOffset(b),
      g = e.x;
    e = e.y;
    for (var l = 0; l < c.length; l++)
      k.push(this._attachFichesPile(c[l], b, g, e)), (e -= 5);
    h.push({
      index: b,
      value: a,
    });
  };
  this._attachFichesPile = function (b, a, d, c) {
    b = new CFiche(d, c, b, k);
    f[a].push(b);
    m.push(b);
    return b;
  };
  this.createPileForVoisinZero = function (a, g) {
    this.addFicheOnTable(a, "bet_0_2_3", g);
    this.addFicheOnTable(a, "bet_0_2_3", g);
    this.addFicheOnTable(a, "bet_4_7", g);
    this.addFicheOnTable(a, "bet_12_15", g);
    this.addFicheOnTable(a, "bet_18_21", g);
    this.addFicheOnTable(a, "bet_19_22", g);
    this.addFicheOnTable(a, "bet_25_26_28_29", g);
    this.addFicheOnTable(a, "bet_25_26_28_29", g);
    this.addFicheOnTable(a, "bet_32_35", g);
    b.push({
      tag: "oBetVoisinsZero",
      num: 9,
    });
  };
  this.createPileForTier = function (a, g) {
    this.addFicheOnTable(a, "bet_5_8", g);
    this.addFicheOnTable(a, "bet_10_11", g);
    this.addFicheOnTable(a, "bet_13_16", g);
    this.addFicheOnTable(a, "bet_23_24", g);
    this.addFicheOnTable(a, "bet_27_30", g);
    this.addFicheOnTable(a, "bet_33_36", g);
    b.push({
      tag: "oBetTier",
      num: 6,
    });
  };
  this.createPileForOrphelins = function (a, g) {
    this.addFicheOnTable(a, "bet_1", g);
    this.addFicheOnTable(a, "bet_6_9", g);
    this.addFicheOnTable(a, "bet_14_17", g);
    this.addFicheOnTable(a, "bet_17_20", g);
    this.addFicheOnTable(a, "bet_31_34", g);
    b.push({
      tag: "oBetOrphelins",
      num: 5,
    });
  };
  this.createPileForMultipleNumbers = function (a, g, d) {
    for (var c = 0; c < g.length; c++)
      this.addFicheOnTable(a, "bet_" + g[c], d);
    b.push({
      tag: "oBetMultiple",
      num: g.length,
    });
  };
  this._removeAllFichesOnTable = function () {
    if (m)
      for (var a = 0; a < m.length; a++)
        k.contains(m[a].getSprite()) && k.removeChild(m[a].getSprite());
  };
  this._removeFichesPile = function (a) {
    for (var b in a) k.removeChild(a[b].getSprite());
  };
  this.clearLastBet = function () {
    if (0 === b.length) return 0;
    for (var a = b.pop().num, g, k = 0; k < a; k++) {
      var c = h.pop();
      g = s_oGameSettings.getFicheValues(c.value);
      d[c.index] -= g;
      d[c.index] = roundDecimal(d[c.index], 1);
      var m = s_oGameSettings.generateFichesPileByIndex(d[c.index]);
      m.sort(function (a, b) {
        return a - b;
      });
      this._removeFichesPile(f[c.index]);
      f[c.index] = [];
      var x = s_oGameSettings.getAttachOffset(c.index),
        t = x.x;
      x = x.y;
      for (var v = 0; v < m.length; v++)
        this._attachFichesPile(m[v], c.index, t, x), (x -= 5);
    }
    return g * a;
  };
  this.clearAllBets = function () {
    for (var a = h.length, b = 0; b < a; b++) this.clearLastBet();
  };
  this._init(a);
}
TEXT_MONEY = "MONEY";
TEXT_CUR_BET = "CUR BET";
TEXT_PLAY = "PLAY";
TEXT_BET = "BET";
TEXT_COIN = "COIN";
TEXT_MIN_BET = "MIN BET";
TEXT_MAX_BET = "MAX BET";
TEXT_SPIN = "SPIN";
TEXT_EXIT = "EXIT";
TEXT_RECHARGE = "RECHARGE";
TEXT_VOISINS_ZERO = "VOISINS DU ZERO";
TEXT_TIER = "TIER";
TEXT_ORPHELINS = "ORPHELINS";
TEXT_NEIGHBORS = "NEIGHBORS";
TEXT_FINALSBET = "FINALS BET";
TEXT_REBET = "REBET";
TEXT_WIN = "WIN";
TEXT_HISTORY = "HISTORY";
TEXT_YOU_WIN = "YOU WON";
TEXT_YOU_LOSE = "YOU LOST";
TEXT_CURRENCY = "$";
var TEXT_PRELOADER_CONTINUE = "START";
TEXT_ERROR_NO_MONEY_MSG = "NOT ENOUGH MONEY FOR THIS BET!!";
TEXT_ERROR_MAX_BET_REACHED = "MAX BET REACHED!!";
TEXT_ERROR_MIN_BET = "YOU BET IS LOWER THAN MINIMUM BET!!";
TEXT_NO_MONEY = "YOU DON'T HAVE ENOUGH MONEY!!!";
TEXT_RECHARGE_MSG = "PLEASE CLICK RECHARGE BUTTON TO PLAY AGAIN";
var TEXT_CREDITS_DEVELOPED = "DEVELOPED BY",
  TEXT_LINK = "WWW.CODETHISLAB.COM";
TEXT_CONGRATULATIONS = "Congratulations!";
TEXT_SHARE_1 = "You collected <strong>";
TEXT_SHARE_2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_SHARE_3 = "My score is ";
TEXT_SHARE_4 = " points! Can you do better?";

function CPreloader() {
  var a, d, f, h, b, m, k, e, g, l;
  this._init = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
    s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
    s_oSpriteLibrary.addSprite("but_start", "./sprites/but_start.png");
    s_oSpriteLibrary.loadSprites();
    l = new createjs.Container();
    s_oStage.addChild(l);
  };
  this.unload = function () {
    l.removeAllChildren();
    g.unload();
  };
  this._onImagesLoaded = function () {};
  this._onAllImagesLoaded = function () {
    this.attachSprites();
    s_oMain.preloaderReady();
  };
  this.attachSprites = function () {
    var c = new createjs.Shape();
    c.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    l.addChild(c);
    c = s_oSpriteLibrary.getSprite("200x200");
    k = createBitmap(c);
    k.regX = 0.5 * c.width;
    k.regY = 0.5 * c.height;
    k.x = CANVAS_WIDTH / 2;
    k.y = CANVAS_HEIGHT / 2 - 180;
    l.addChild(k);
    e = new createjs.Shape();
    e.graphics
      .beginFill("rgba(0,0,0,0.01)")
      .drawRoundRect(k.x - 100, k.y - 100, 200, 200, 10);
    l.addChild(e);
    k.mask = e;
    c = s_oSpriteLibrary.getSprite("progress_bar");
    h = createBitmap(c);
    h.x = CANVAS_WIDTH / 2 - c.width / 2;
    h.y = CANVAS_HEIGHT / 2 + 50;
    l.addChild(h);
    a = c.width;
    d = c.height;
    b = new createjs.Shape();
    b.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(h.x, h.y, 1, d);
    l.addChild(b);
    h.mask = b;
    f = new createjs.Text("", "30px " + FONT1, "#fff");
    f.x = CANVAS_WIDTH / 2;
    f.y = CANVAS_HEIGHT / 2 + 100;
    f.textBaseline = "alphabetic";
    f.textAlign = "center";
    l.addChild(f);
    c = s_oSpriteLibrary.getSprite("but_start");
    g = new CTextButton(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2,
      c,
      TEXT_PRELOADER_CONTINUE,
      "Arial",
      "#000",
      "bold 50",
      l
    );
    g.addEventListener(ON_MOUSE_UP, this._onButStartRelease, this);
    g.setVisible(!1);
    m = new createjs.Shape();
    m.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    l.addChild(m);
    createjs.Tween.get(m)
      .to(
        {
          alpha: 0,
        },
        500
      )
      .call(function () {
        createjs.Tween.removeTweens(m);
        l.removeChild(m);
      });
  };
  this._onButStartRelease = function () {
    s_oMain._onRemovePreloader();
  };
  this.refreshLoader = function (c) {
    f.text = c + "%";
    100 === c &&
      (s_oMain._onRemovePreloader(), (f.visible = !1), (h.visible = !1));
    b.graphics.clear();
    c = Math.floor((c * a) / 100);
    b.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(h.x, h.y, c, d);
  };
  this._init();
}

function CMain(a) {
  var d,
    f = 0,
    h = 0,
    b = STATE_LOADING,
    m,
    k;
  this.initContainer = function () {
    var a = document.getElementById("canvas");
    s_oStage = new createjs.Stage(a);
    createjs.Touch.enable(s_oStage);
    s_bMobile = jQuery.browser.mobile;
    !1 === s_bMobile && s_oStage.enableMouseOver(20);
    s_iPrevTime = new Date().getTime();
    createjs.Ticker.setFPS(FPS);
    createjs.Ticker.addEventListener("tick", this._update);
    navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
    s_oSpriteLibrary = new CSpriteLibrary();
    m = new CPreloader();
  };
  this.soundLoaded = function () {
    f++;
    m.refreshLoader(Math.floor((f / h) * 100));
  };
  this._initSounds = function () {
    Howler.mute(!s_bAudioActive);
    s_aSoundsInfo = [];
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "chip",
      loop: !1,
      volume: 1,
      ingamename: "chip",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "click",
      loop: !1,
      volume: 1,
      ingamename: "click",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "fiche_collect",
      loop: !1,
      volume: 1,
      ingamename: "fiche_collect",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "wheel_sound",
      loop: !0,
      volume: 1,
      ingamename: "wheel_sound",
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
      filename: "lose",
      loop: !1,
      volume: 1,
      ingamename: "lose",
    });
    h += s_aSoundsInfo.length;
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
          onloaderror: function (a, b) {
            for (var c = 0; c < s_aSoundsInfo.length; c++)
              if (a === s_aSounds[s_aSoundsInfo[c].ingamename]._sounds[0]._id) {
                s_oMain.tryToLoadSound(s_aSoundsInfo[c], !0);
                break;
              }
          },
          onplayerror: function (a) {
            for (var b = 0; b < s_aSoundsInfo.length; b++)
              if (a === s_aSounds[s_aSoundsInfo[b].ingamename]._sounds[0]._id) {
                s_aSounds[s_aSoundsInfo[b].ingamename].once(
                  "unlock",
                  function () {
                    s_aSounds[s_aSoundsInfo[b].ingamename].play();
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
    s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
    s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
    s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
    s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
    s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
    s_oSpriteLibrary.addSprite("hit_area_0", "./sprites/hit_area_0.png");
    s_oSpriteLibrary.addSprite(
      "hit_area_color",
      "./sprites/hit_area_color.png"
    );
    s_oSpriteLibrary.addSprite(
      "hit_area_horizontal",
      "./sprites/hit_area_horizontal.png"
    );
    s_oSpriteLibrary.addSprite(
      "hit_area_number",
      "./sprites/hit_area_number.png"
    );
    s_oSpriteLibrary.addSprite(
      "hit_area_couple_horizontal",
      "./sprites/hit_area_couple_horizontal.png"
    );
    s_oSpriteLibrary.addSprite(
      "hit_area_couple_vertical",
      "./sprites/hit_area_couple_vertical.png"
    );
    s_oSpriteLibrary.addSprite(
      "hit_area_small",
      "./sprites/hit_area_small.png"
    );
    s_oSpriteLibrary.addSprite(
      "hit_area_horizontal_half",
      "./sprites/hit_area_horizontal_half.png"
    );
    s_oSpriteLibrary.addSprite("chip_box", "./sprites/chip_box.png");
    s_oSpriteLibrary.addSprite("but_bets", "./sprites/but_bets.png");
    s_oSpriteLibrary.addSprite("but_bg", "./sprites/but_bg.png");
    s_oSpriteLibrary.addSprite("but_clear_all", "./sprites/but_clear_all.png");
    s_oSpriteLibrary.addSprite(
      "but_clear_last",
      "./sprites/but_clear_last.png"
    );
    s_oSpriteLibrary.addSprite("but_rebet", "./sprites/but_rebet.png");
    s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
    s_oSpriteLibrary.addSprite("logo_credits", "./sprites/logo_credits.png");
    s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
    s_oSpriteLibrary.addSprite("history_bg", "./sprites/history_bg.png");
    s_oSpriteLibrary.addSprite(
      "show_number_panel",
      "./sprites/show_number_panel.png"
    );
    s_oSpriteLibrary.addSprite(
      "show_number_bg",
      "./sprites/show_number_bg.png"
    );
    s_oSpriteLibrary.addSprite("ball", "./sprites/ball.png");
    s_oSpriteLibrary.addSprite("enlight_0", "./sprites/enlight_0.png");
    s_oSpriteLibrary.addSprite("enlight_color", "./sprites/enlight_color.png");
    s_oSpriteLibrary.addSprite(
      "enlight_horizontal",
      "./sprites/enlight_horizontal.png"
    );
    s_oSpriteLibrary.addSprite(
      "enlight_number",
      "./sprites/enlight_number.png"
    );
    s_oSpriteLibrary.addSprite(
      "enlight_horizontal_half",
      "./sprites/enlight_horizontal_half.png"
    );
    s_oSpriteLibrary.addSprite("select_fiche", "./sprites/select_fiche.png");
    s_oSpriteLibrary.addSprite("spin_but", "./sprites/spin_but.png");
    s_oSpriteLibrary.addSprite("placeholder", "./sprites/placeholder.png");
    s_oSpriteLibrary.addSprite("circle_red", "./sprites/circle_red.png");
    s_oSpriteLibrary.addSprite("circle_green", "./sprites/circle_green.png");
    s_oSpriteLibrary.addSprite("circle_black", "./sprites/circle_black.png");
    s_oSpriteLibrary.addSprite("final_bet_bg", "./sprites/final_bet_bg.png");
    s_oSpriteLibrary.addSprite("neighbor_bg", "./sprites/neighbor_bg.jpg");
    s_oSpriteLibrary.addSprite(
      "neighbor_enlight",
      "./sprites/neighbor_enlight.png"
    );
    s_oSpriteLibrary.addSprite(
      "hitarea_neighbor",
      "./sprites/hitarea_neighbor.png"
    );
    s_oSpriteLibrary.addSprite("bg_wheel", "./sprites/bg_wheel.jpg");
    s_oSpriteLibrary.addSprite("logo_game_0", "./sprites/logo_game_0.png");
    s_oSpriteLibrary.addSprite(
      "but_fullscreen",
      "./sprites/but_fullscreen.png"
    );
    s_oSpriteLibrary.addSprite(
      "board_roulette",
      "./sprites/board_roulette.jpg"
    );
    for (var a = 0; a < NUM_FICHES; a++)
      s_oSpriteLibrary.addSprite("fiche_" + a, "./sprites/fiche_" + a + ".png");
    for (a = 0; a < NUM_MASK_BALL_SPIN_FRAMES; a++)
      s_oSpriteLibrary.addSprite(
        "wheel_handle_" + a,
        "./sprites/mask_ball_spin/wheel_handle_" + a + ".png"
      );
    for (a = 0; a < NUM_MASK_BALL_SPIN_FRAMES; a++)
      s_oSpriteLibrary.addSprite(
        "wheel_numbers_" + a,
        "./sprites/wheel_anim/wheel_numbers_" + a + ".png"
      );
    h += s_oSpriteLibrary.getNumSprites();
    s_oSpriteLibrary.loadSprites();
  };
  this._onImagesLoaded = function () {
    f++;
    m.refreshLoader(Math.floor((f / h) * 100));
  };
  this._onAllImagesLoaded = function () {};
  this.onImageLoadError = function (a) {};
  this.preloaderReady = function () {
    this._loadImages();
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || this._initSounds();
    d = !0;
  };
  this._onRemovePreloader = function () {
    m.unload();
    this.gotoMenu();
  };
  this.gotoMenu = function () {
    new CMenu();
    b = STATE_MENU;
  };
  this.gotoGame = function () {
    k = new CGame(e);
    b = STATE_GAME;
  };
  this.gotoHelp = function () {
    new CHelp();
    b = STATE_HELP;
  };
  this.stopUpdate = function () {
    d = !1;
    createjs.Ticker.paused = !0;
    $("#block_game").css("display", "block");
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || Howler.mute(!0);
  };
  this.startUpdate = function () {
    s_iPrevTime = new Date().getTime();
    d = !0;
    createjs.Ticker.paused = !1;
    $("#block_game").css("display", "none");
    (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) &&
      s_bAudioActive &&
      Howler.mute(!1);
  };
  this._update = function (a) {
    if (!1 !== d) {
      var e = new Date().getTime();
      s_iTimeElaps = e - s_iPrevTime;
      s_iCntTime += s_iTimeElaps;
      s_iCntFps++;
      s_iPrevTime = e;
      1e3 <= s_iCntTime &&
        ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0));
      b === STATE_GAME && k.update();
      s_oStage.update(a);
    }
  };
  s_oMain = this;
  var e = a;
  ENABLE_FULLSCREEN = a.fullscreen;
  ENABLE_CHECK_ORIENTATION = a.check_orientation;
  SHOW_CREDITS = e.show_credits;
  this.initContainer();
}
var s_bMobile,
  s_bAudioActive = !1,
  s_bFullscreen = !1,
  s_iCntTime = 0,
  s_iTimeElaps = 0,
  s_iPrevTime = 0,
  s_iCntFps = 0,
  s_iCurFps = 0,
  s_oDrawLayer,
  s_oStage,
  s_oMain = null,
  s_oSpriteLibrary,
  s_aSounds,
  s_aSoundsInfo;

function CTextButton(a, d, f, h, b, m, k, e) {
  var g, l, c, u, x, t, v, n, q, w;
  this._init = function (a, b, d, f, k, h, m) {
    g = !1;
    l = 1;
    c = [];
    u = [];
    n = new createjs.Container();
    n.x = a;
    n.y = b;
    n.regX = d.width / 2;
    n.regY = d.height / 2;
    s_bMobile || (n.cursor = "pointer");
    e.addChild(n);
    w = createBitmap(d);
    n.addChild(w);
    q = new CTLText(
      n,
      parseInt(0.06 * d.width),
      parseInt(0.06 * d.height),
      d.width - 2 * parseInt(0.06 * d.width),
      d.height - 2 * parseInt(0.06 * d.height),
      m,
      "center",
      h,
      k,
      1,
      0,
      0,
      f,
      !0,
      !0,
      !0,
      !1
    );
    this._initListener();
  };
  this.unload = function () {
    n.off("mousedown", x);
    n.off("pressup", t);
    e.removeChild(n);
  };
  this.setVisible = function (a) {
    n.visible = a;
  };
  this.setScale = function (a) {
    l = n.scaleX = n.scaleY = a;
  };
  this.enable = function () {
    g = !1;
  };
  this.disable = function () {
    g = !0;
  };
  this._initListener = function () {
    x = n.on("mousedown", this.buttonDown);
    t = n.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (a, b, e) {
    c[a] = b;
    u[a] = e;
  };
  this.addEventListenerWithParams = function (a, b, e, d) {
    c[a] = b;
    u[a] = e;
    v = d;
  };
  this.buttonRelease = function () {
    g ||
      (playSound("click", 1, !1),
      (n.scaleX = l),
      (n.scaleY = l),
      c[ON_MOUSE_UP] && c[ON_MOUSE_UP].call(u[ON_MOUSE_UP], v));
  };
  this.buttonDown = function () {
    g ||
      ((n.scaleX = 0.9 * l),
      (n.scaleY = 0.9 * l),
      c[ON_MOUSE_DOWN] && c[ON_MOUSE_DOWN].call(u[ON_MOUSE_DOWN]));
  };
  this.setPosition = function (a, b) {
    n.x = a;
    n.y = b;
  };
  this.tweenPosition = function (a, b, c, e, d, g, f) {
    createjs.Tween.get(n)
      .wait(e)
      .to(
        {
          x: a,
          y: b,
        },
        c,
        d
      )
      .call(function () {
        void 0 !== g && g.call(f);
      });
  };
  this.changeText = function (a) {
    q.refreshText(a);
  };
  this.setX = function (a) {
    n.x = a;
  };
  this.setY = function (a) {
    n.y = a;
  };
  this.getButtonImage = function () {
    return n;
  };
  this.getX = function () {
    return n.x;
  };
  this.getY = function () {
    return n.y;
  };
  this.getSprite = function () {
    return n;
  };
  this.getScale = function () {
    return n.scaleX;
  };
  this._init(a, d, f, h, b, m, k);
}

function CGfxButton(a, d, f, h) {
  var b, m, k, e, g, l, c, u, x, t, v;
  this._init = function (a, c, p) {
    b = !1;
    e = [];
    g = [];
    v = createBitmap(p);
    m = p.width;
    k = p.height;
    v.x = a;
    v.y = c;
    v.regX = p.width / 2;
    v.regY = p.height / 2;
    s_bMobile || (v.cursor = "pointer");
    n.addChild(v);
    this._initListener();
  };
  this.unload = function () {
    v.off("mousedown", c);
    v.off("pressup", u);
    !1 === s_bMobile && (v.off("rollover", x), v.off("rollout", t));
    n.removeChild(v);
  };
  this.setVisible = function (a) {
    v.visible = a;
  };
  this.enable = function () {
    b = !1;
    v.filters = [];
    v.cache(0, 0, m, k);
  };
  this.disable = function () {
    b = !0;
    var a = new createjs.ColorMatrix()
      .adjustSaturation(-100)
      .adjustBrightness(40);
    v.filters = [new createjs.ColorMatrixFilter(a)];
    v.cache(0, 0, m, k);
  };
  this._initListener = function () {
    c = v.on("mousedown", this.buttonDown);
    u = v.on("pressup", this.buttonRelease);
    !1 === s_bMobile &&
      ((x = v.on("rollover", this.mouseOver)),
      (t = v.on("rollout", this.mouseOut)));
  };
  this.addEventListener = function (a, b, c) {
    e[a] = b;
    g[a] = c;
  };
  this.addEventListenerWithParams = function (a, b, c, d) {
    e[a] = b;
    g[a] = c;
    l = d;
  };
  this.buttonRelease = function () {
    b ||
      (playSound("click", 1, !1),
      (v.scaleX = 1),
      (v.scaleY = 1),
      e[ON_MOUSE_UP] && e[ON_MOUSE_UP].call(g[ON_MOUSE_UP], l));
  };
  this.buttonDown = function () {
    b ||
      ((v.scaleX = 0.9),
      (v.scaleY = 0.9),
      e[ON_MOUSE_DOWN] && e[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN], l));
  };
  this.mouseOver = function () {
    e[ON_MOUSE_OVER] && e[ON_MOUSE_OVER].call(g[ON_MOUSE_OVER], l);
  };
  this.mouseOut = function () {
    e[ON_MOUSE_OUT] && e[ON_MOUSE_OUT].call(g[ON_MOUSE_OUT], l);
  };
  this.setPosition = function (a, b) {
    v.x = a;
    v.y = b;
  };
  this.rotate = function (a) {
    v.rotation = a;
  };
  this.setX = function (a) {
    v.x = a;
  };
  this.setY = function (a) {
    v.y = a;
  };
  this.getButtonImage = function () {
    return v;
  };
  this.getX = function () {
    return v.x;
  };
  this.getY = function () {
    return v.y;
  };
  var n = h;
  this._init(a, d, f);
  return this;
}

function CFicheBut(a, d, f) {
  var h,
    b,
    m,
    k,
    e,
    g,
    l = [],
    c,
    u,
    x;
  this._init = function (a, d, f) {
    b = !1;
    u = new createjs.Container();
    s_oStage.addChild(u);
    h = !1;
    e = [];
    g = [];
    c = createBitmap(f);
    c.x = a;
    c.y = d;
    c.regX = f.width / 2;
    c.regY = f.height / 2;
    s_bMobile || (c.cursor = "pointer");
    u.addChild(c);
    m = f.width;
    k = f.height;
    f = s_oSpriteLibrary.getSprite("select_fiche");
    x = createBitmap(f);
    x.x = a - 2;
    x.y = d - 2;
    x.regX = f.width / 2;
    x.regY = f.height / 2;
    u.addChild(x);
    x.visible = h;
    this._initListener();
  };
  this.unload = function () {
    c.off("mousedown", this.buttonDown);
    c.off("pressup", this.buttonRelease);
    s_oStage.removeChild(u);
  };
  this.select = function () {
    h = !0;
    x.visible = h;
  };
  this.deselect = function () {
    h = !1;
    x.visible = h;
  };
  this.enable = function () {
    b = !1;
    c.filters = [];
    c.cache(0, 0, m, k);
  };
  this.disable = function () {
    b = !0;
    var a = new createjs.ColorMatrix().adjustSaturation(-90);
    c.filters = [new createjs.ColorMatrixFilter(a)];
    c.cache(0, 0, m, k);
  };
  this.setVisible = function (a) {
    c.visible = a;
  };
  this._initListener = function () {
    c.on("mousedown", this.buttonDown);
    c.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (a, b, c) {
    e[a] = b;
    g[a] = c;
  };
  this.addEventListenerWithParams = function (a, b, c, d) {
    e[a] = b;
    g[a] = c;
    l = d;
  };
  this.buttonRelease = function () {
    b ||
      (playSound("click", 1, !1),
      (c.scaleX = 1),
      (c.scaleY = 1),
      e[ON_MOUSE_UP] && e[ON_MOUSE_UP].call(g[ON_MOUSE_UP], l),
      (h = !h),
      (x.visible = h));
  };
  this.buttonDown = function () {
    b ||
      ((c.scaleX = 0.9),
      (c.scaleY = 0.9),
      e[ON_MOUSE_DOWN] && e[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN], l));
  };
  this.setPosition = function (a, b) {
    c.x = a;
    c.y = b;
  };
  this.setX = function (a) {
    c.x = a;
  };
  this.setY = function (a) {
    c.y = a;
  };
  this.getButtonImage = function () {
    return c;
  };
  this.getX = function () {
    return c.x;
  };
  this.getY = function () {
    return c.y;
  };
  this._init(a, d, f);
}

function CBetTableButton(a, d, f, h, b, m) {
  var k, e, g, l, c, u, x, t, v;
  this._init = function (a, b, c, p, d, f) {
    k = f;
    x = p;
    e = [];
    g = [];
    v = d;
    l = createBitmap(c);
    l.x = a;
    l.y = b;
    l.regX = c.width / 2;
    l.regY = c.height / 2;
    s_bMobile || (l.cursor = "pointer");
    this._initListener();
    v.addChild(l);
    t = [];
    t = x.split("_");
    1 < t.length ? t.splice(0, 1) : this._assignNumber();
    this._assignBetMultiplier();
  };
  this.unload = function () {
    l.off("mousedown", this.buttonDown);
    l.off("pressup", this.buttonRelease);
    l.off("rollover", this.mouseOver);
    l.off("rollout", this.mouseOut);
    v.removeChild(l);
  };
  this.setVisible = function (a) {
    l.visible = a;
  };
  this._assignNumber = function () {
    t = s_oGameSettings.getNumbersForButton(x);
  };
  this._assignBetMultiplier = function () {
    switch (t.length) {
      case 0:
        c = s_oGameSettings.getBetMultiplierForButton(x);
        u = s_oGameSettings.getBetWinForButton(x);
        break;
      default:
        (c = t.length), (u = Math.floor(36 / t.length));
    }
  };
  this._initListener = function () {
    l.on("mousedown", this.buttonDown);
    l.on("pressup", this.buttonRelease);
    l.on("rollover", this.mouseOver);
    l.on("rollout", this.mouseOut);
  };
  this.addEventListener = function (a, b, c) {
    e[a] = b;
    g[a] = c;
  };
  this.addEventListenerWithParams = function (a, b, c, p) {
    e[a] = b;
    g[a] = c;
  };
  this.buttonRelease = function () {
    playSound("click", 1, !1);
    e[ON_MOUSE_UP] &&
      e[ON_MOUSE_UP].call(
        g[ON_MOUSE_UP],
        {
          numbers: t,
          bet_mult: c,
          bet_win: u,
          name: x,
          num_fiches: 1,
        },
        !1
      );
  };
  this.buttonDown = function () {
    e[ON_MOUSE_DOWN] &&
      e[ON_MOUSE_DOWN].call(
        g[ON_MOUSE_DOWN],
        {
          button: x,
          numbers: t,
          bet_mult: c,
          bet_win: u,
          num_fiches: 1,
        },
        !1
      );
  };
  this.mouseOver = function () {
    e[ON_MOUSE_OVER] &&
      (k
        ? e[ON_MOUSE_OVER].call(g[ON_MOUSE_OVER], {
            numbers: t,
            enlight: x,
          })
        : e[ON_MOUSE_OVER].call(g[ON_MOUSE_OVER], {
            numbers: t,
          }));
  };
  this.mouseOut = function () {
    e[ON_MOUSE_OUT] &&
      (k
        ? e[ON_MOUSE_OUT].call(g[ON_MOUSE_OUT], {
            numbers: t,
            enlight: x,
          })
        : e[ON_MOUSE_OUT].call(g[ON_MOUSE_OUT], {
            numbers: t,
          }));
  };
  this.setPosition = function (a, b) {
    l.x = a;
    l.y = b;
  };
  this.setX = function (a) {
    l.x = a;
  };
  this.setY = function (a) {
    l.y = a;
  };
  this.rotate = function (a) {
    l.rotation = a;
  };
  this.getButtonImage = function () {
    return l;
  };
  this.getX = function () {
    return l.x;
  };
  this.getY = function () {
    return l.y;
  };
  this._init(a, d, f, h, b, m);
}

function CBetTextButton(a, d, f, h, b, m, k, e) {
  var g, l, c, u, x, t, v, n, q, w, p, A, E;
  this._init = function (a, b, e, d, f, k, h, m) {
    g = !1;
    q = [];
    w = [];
    p = new createjs.Container();
    p.x = a;
    p.y = b;
    p.regX = e.width / 2;
    p.regY = e.height / 2;
    s_bMobile || (p.cursor = "pointer");
    s_oStage.addChild(p);
    E = createBitmap(e);
    p.addChild(E);
    l = e.width;
    c = e.height;
    A = new CTLText(
      p,
      10,
      10,
      e.width - 20,
      e.height - 20,
      h,
      "center",
      k,
      f,
      1,
      2,
      2,
      d,
      !0,
      !0,
      !0,
      !1
    );
    this._initListener();
    v = m;
    n = [];
    n = m.split("_");
    1 < n.length ? n.splice(0, 1) : this._assignNumber(m);
    u = s_oGameSettings.getBetMultiplierForButton(m);
    x = s_oGameSettings.getBetWinForButton(m);
    t = s_oGameSettings.getNumFichesPerBet(m);
  };
  this._assignNumber = function (a) {
    n = s_oGameSettings.getNumbersForButton(a);
  };
  this.unload = function () {
    p.off("mousedown");
    p.off("pressup");
    s_oStage.removeChild(p);
  };
  this.setVisible = function (a) {
    p.visible = a;
  };
  this.enable = function () {
    g = !1;
    E.filters = [];
    E.cache(0, 0, l, c);
  };
  this.disable = function () {
    g = !0;
    var a = new createjs.ColorMatrix()
      .adjustSaturation(-100)
      .adjustBrightness(40);
    E.filters = [new createjs.ColorMatrixFilter(a)];
    E.cache(0, 0, l, c);
  };
  this._initListener = function () {
    oParent = this;
    p.on("mousedown", this.buttonDown);
    p.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (a, b, c) {
    q[a] = b;
    w[a] = c;
  };
  this.buttonRelease = function () {
    g ||
      (playSound("click", 1, !1),
      (p.scaleX = 1),
      (p.scaleY = 1),
      q[ON_MOUSE_UP] &&
        q[ON_MOUSE_UP].call(
          w[ON_MOUSE_UP],
          {
            name: v,
            numbers: n,
            bet_mult: u,
            bet_win: x,
            num_fiches: t,
          },
          !1
        ));
  };
  this.buttonDown = function () {
    g ||
      ((p.scaleX = 0.9),
      (p.scaleY = 0.9),
      q[ON_MOUSE_DOWN] && q[ON_MOUSE_DOWN].call(w[ON_MOUSE_DOWN]));
  };
  this.setPosition = function (a, b) {
    p.x = a;
    p.y = b;
  };
  this.changeText = function (a) {
    A.refreshText(a);
  };
  this.setX = function (a) {
    p.x = a;
  };
  this.setY = function (a) {
    p.y = a;
  };
  this.getButtonImage = function () {
    return p;
  };
  this.getX = function () {
    return p.x;
  };
  this.getY = function () {
    return p.y;
  };
  this._init(a, d, f, h, b, m, k, e);
  return this;
}

function CToggle(a, d, f, h, b) {
  var m, k, e, g, l, c, u;
  this._init = function (a, b, d, g, f) {
    u = void 0 !== f ? f : s_oStage;
    k = [];
    e = [];
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
    m = g;
    c = createSprite(
      f,
      "state_" + m,
      d.width / 2 / 2,
      d.height / 2,
      d.width / 2,
      d.height
    );
    c.x = a;
    c.y = b;
    c.stop();
    s_bMobile || (c.cursor = "pointer");
    u.addChild(c);
    this._initListener();
  };
  this.unload = function () {
    c.off("mousedown", g);
    c.off("pressup", l);
    u.removeChild(c);
  };
  this._initListener = function () {
    g = c.on("mousedown", this.buttonDown);
    l = c.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (a, b, c) {
    k[a] = b;
    e[a] = c;
  };
  this.setCursorType = function (a) {
    c.cursor = a;
  };
  this.setActive = function (a) {
    m = a;
    c.gotoAndStop("state_" + m);
  };
  this.buttonRelease = function () {
    c.scaleX = 1;
    c.scaleY = 1;
    playSound("click", 1, !1);
    m = !m;
    c.gotoAndStop("state_" + m);
    k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(e[ON_MOUSE_UP], m);
  };
  this.buttonDown = function () {
    c.scaleX = 0.9;
    c.scaleY = 0.9;
    k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(e[ON_MOUSE_DOWN]);
  };
  this.setPosition = function (a, b) {
    c.x = a;
    c.y = b;
  };
  this._init(a, d, f, h, b);
}

function CMenu() {
  var a,
    d,
    f,
    h,
    b,
    m,
    k,
    e,
    g,
    l = null,
    c = null,
    u,
    x,
    t,
    v,
    n;
  this._init = function () {
    u = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
    s_oStage.addChild(u);
    var q = s_oSpriteLibrary.getSprite("but_play");
    f = CANVAS_WIDTH / 2;
    h = CANVAS_HEIGHT - 110;
    x = new CGfxButton(f, h, q, s_oStage);
    x.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
      (q = s_oSpriteLibrary.getSprite("audio_icon")),
        (k = CANVAS_WIDTH - q.width / 4 - 10),
        (e = q.height / 2 + 10),
        (v = new CToggle(k, e, q, s_bAudioActive, s_oStage)),
        v.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
    var w = s_oSpriteLibrary.getSprite("but_fullscreen");
    SHOW_CREDITS
      ? ((q = s_oSpriteLibrary.getSprite("but_credits")),
        (b = q.width / 2 + 10),
        (m = q.height / 2 + 10),
        (t = new CGfxButton(b, m, q, s_oStage)),
        t.addEventListener(ON_MOUSE_UP, this._onCredits, this),
        (a = b + w.width / 2 + 10),
        (d = w.height / 2 + 10))
      : ((a = q.width / 4 + 10), (d = q.height / 2 + 10));
    q = window.document;
    var p = q.documentElement;
    l =
      p.requestFullscreen ||
      p.mozRequestFullScreen ||
      p.webkitRequestFullScreen ||
      p.msRequestFullscreen;
    c =
      q.exitFullscreen ||
      q.mozCancelFullScreen ||
      q.webkitExitFullscreen ||
      q.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (l = !1);
    l &&
      screenfull.enabled &&
      ((g = new CToggle(a, d, w, s_bFullscreen, s_oStage)),
      g.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    n = new createjs.Shape();
    n.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    s_oStage.addChild(n);
    createjs.Tween.get(n)
      .to(
        {
          alpha: 0,
        },
        400
      )
      .call(function () {
        n.visible = !1;
      });
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };
  this.refreshButtonPos = function (c, f) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      v.setPosition(k - c, f + e);
    l && screenfull.enabled && g.setPosition(a + c, d + f);
    SHOW_CREDITS && t.setPosition(b + c, f + m);
    x.setPosition(h, h - f);
  };
  this.unload = function () {
    x.unload();
    x = null;
    SHOW_CREDITS && (t.unload(), (t = null));
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) v.unload(), (v = null);
    l && screenfull.enabled && g.unload();
    s_oStage.removeChild(u);
    u = null;
    s_oStage.removeChild(n);
    s_oMenu = n = null;
  };
  this._onButPlayRelease = function () {
    this.unload();
    s_oMain.gotoGame();
    $(s_oMain).trigger("start_session");
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this._onCredits = function () {
    new CCreditsPanel();
  };
  this.resetFullscreenBut = function () {
    l && screenfull.enabled && g.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? c.call(window.document)
      : l.call(window.document.documentElement);
    sizeHandler();
  };
  s_oMenu = this;
  this._init();
}
var s_oMenu = null;

function CGame(a) {
  var d = !1,
    f,
    h,
    b,
    m,
    k,
    e,
    g,
    l,
    c,
    u,
    x,
    t,
    v,
    n,
    q,
    w,
    p,
    A,
    E,
    I,
    F,
    K;
  this._init = function () {
    s_oTweenController = new CTweenController();
    s_oGameSettings = new CRouletteSettings();
    v = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
    s_oStage.addChild(v);
    p = new CTableController();
    p.addEventListener(ON_SHOW_ENLIGHT, this._onShowEnlight);
    p.addEventListener(ON_HIDE_ENLIGHT, this._onHideEnlight);
    p.addEventListener(ON_SHOW_BET_ON_TABLE, this._onShowBetOnTable);
    e = 0;
    h = -1;
    b = 37;
    g = [];
    l = [];
    c = [];
    t = [];
    n = new CSeat();
    w = new CInterface();
    I = new CFinalBetPanel(816, 564);
    E = new CWheelAnim(0, 0);
    F = new CNeighborsPanel(n.getCredit());
    K = new CGameOver();
    A = new CMsgBox();
    u = [];
    m = 0;
    this._onSitDown();
    d = !0;
  };
  this.unload = function () {
    stopSound("wheel_sound");
    w.unload();
    p.unload();
    A.unload();
    I.unload();
    F.unload();
    K.unload();
    E.unload();
    s_oStage.removeAllChildren();
  };
  this._setState = function (a) {
    h = a;
    switch (a) {
      case STATE_GAME_WAITING_FOR_BET:
        w.enableBetFiches(), w.setCurBet(0), w.hideBlock();
    }
  };
  this._resetTable = function () {
    m = 0;
    b = 37;
    g = [];
    l = [];
    c = [];
    null !== q && (p.getContainer().removeChild(q), (q = null));
    n.reset();
    F.reset();
    0.1 > n.getCredit()
      ? ((h = -1), w.hideBlock(), K.show())
      : (w.enableRebet(), this._setState(STATE_GAME_WAITING_FOR_BET));
    e++;
    e === NUM_HAND_FOR_ADS &&
      ((e = 0), $(s_oMain).trigger("show_interlevel_ad"));
  };
  this._startRouletteAnim = function () {
    w.disableBetFiches();
    k = this._generateWinLoss();
    u.push(k);
    m = 0;
  };
  this._startBallSpinAnim = function () {
    var a = n.getNumbersBetted()[k];
    a = roundDecimal(a.win, 2);
    E.startSpin(0, s_oGameSettings.getFrameForBallSpin(0, k), k, a);
  };
  this._generateWinLoss = function () {
    var a = n.getNumbersBetted(),
      c = n.getNumberSelected(),
      p = a[c[0][0]].win;
    H += n.getCurBet();
    H = parseFloat(H.toFixed(2));
    if (H < p) {
      c = 0;
      var d = Math.floor(100 * Math.random());
    } else
      -1 === WIN_OCCURRENCE
        ? ((c = 37 - b), (d = Math.floor(38 * Math.random())))
        : ((c = WIN_OCCURRENCE), (d = Math.floor(100 * Math.random())));
    if ((f = d >= c ? !1 : !0)) {
      do (d = Math.floor(Math.random() * a.length)), (p = a[d].win);
      while (0 === p);
    } else {
      c = [];
      for (d = 0; 37 > d; d++) c.push(d);
      do {
        if (0 === c.length) {
          d = Math.floor(Math.random() * a.length);
          break;
        }
        d = Math.floor(Math.random() * c.length);
        p = a[d].win;
        c.splice(d, 1);
      } while (p > n.getCurBet());
    }
    return (k = d);
  };
  this._rouletteAnimEnded = function () {
    m = 0;
    this._setState(STATE_GAME_SHOW_WINNER);
    stopSound("wheel_sound");
    var a = n.getNumbersBetted(),
      b = a[k],
      c = roundDecimal(b.win, 2);
    x = [];
    for (var d = 0; d < a.length; d++) {
      var e = a[d];
      if (0 < e.win)
        for (var g = 0; g < e.mc.length; g++) {
          x.push(e.mc[g]);
          var f = s_oGameSettings.getAttachOffset("oDealerWin");
          e.mc[g].setEndPoint(f.x, f.y);
        }
    }
    if (b.mc)
      for (a = 0; a < b.mc.length; a++)
        (f = s_oGameSettings.getAttachOffset("oReceiveWin")),
          b.mc[a].setEndPoint(f.x, f.y);
    w.refreshNumExtracted(u);
    q = createBitmap(s_oSpriteLibrary.getSprite("placeholder"));
    0 === k
      ? ((q.x = p.getEnlightX(k) + 22), (q.y = p.getEnlightY(k) + 90))
      : ((q.x = p.getEnlightX(k) + 8), (q.y = p.getEnlightY(k) + 16));
    q.regX = 6;
    q.regY = 20;
    p.getContainer().addChild(q);
    n.showWin(c);
    0 < c && (H -= c);
    H = parseFloat(H.toFixed(2));
    $(s_oMain).trigger("save_score", n.getCredit());
    w.refreshMoney(n.getCredit() - c, c);
  };
  this.showMsgBox = function (a) {
    A.show(a);
  };
  this.onRecharge = function () {
    n.recharge(TOTAL_MONEY);
    w.setMoney(n.getCredit());
    this._setState(STATE_GAME_WAITING_FOR_BET);
    K.hide();
    $(s_oMain).trigger("recharge");
  };
  this.onSpin = function () {
    if (F.isVisible()) F.onExit();
    0 !== n.getCurBet() &&
      (n.getCurBet() < MIN_BET
        ? (A.show(TEXT_ERROR_MIN_BET), w.enableBetFiches(), w.enableSpin(!0))
        : w.isBlockVisible() ||
          (w.showBlock(),
          F.hide(),
          I.hide(),
          w.enableSpin(!1),
          this._startRouletteAnim(),
          this._startBallSpinAnim(),
          $(s_oMain).trigger("bet_placed", n.getCurBet()),
          this._setState(STATE_GAME_SPINNING),
          playSound("wheel_sound", 1, !1)));
  };
  this._onSitDown = function () {
    this._setState(STATE_GAME_WAITING_FOR_BET);
    n.setInfo(TOTAL_MONEY, p.getContainer());
    w.setMoney(TOTAL_MONEY);
    w.setCurBet(0);
  };
  this._onShowBetOnTable = function (a, p) {
    var d = a.button,
      e = a.numbers;
    b -= a.bet_mult;
    g.push(a.bet_mult);
    var f = a.bet_win,
      k = a.num_fiches;
    if (p) var h = a.value;
    else
      (h = w.getCurFicheSelected()),
        0 === l.length && ((t = []), w.disableRebet()),
        t.push({
          button: a.button,
          numbers: a.numbers,
          bet_mult: a.bet_mult,
          bet_win: a.bet_win,
          num_fiches: a.num_fiches,
          neighbors: !1,
          value: h,
        });
    var m = s_oGameSettings.getFicheValues(h);
    l.push(f);
    c.push(k);
    var q = n.getCurBet();
    if (0 > n.getCredit() - m * k) A.show(TEXT_ERROR_NO_MONEY_MSG), F.reset();
    else if (q + m * k > MAX_BET) A.show(TEXT_ERROR_MAX_BET_REACHED), F.reset();
    else {
      switch (d) {
        case "oBetVoisinsZero":
          n.addFicheOnTable(m, h, [0, 2, 3], 12, "bet_0_2_3");
          n.addFicheOnTable(m, h, [0, 2, 3], 12, "bet_0_2_3");
          n.addFicheOnTable(m, h, [4, 7], 18, "bet_4_7");
          n.addFicheOnTable(m, h, [12, 15], 18, "bet_12_15");
          n.addFicheOnTable(m, h, [19, 22], 18, "bet_19_22");
          n.addFicheOnTable(m, h, [25, 26, 28, 29], 9, "bet_25_26_28_29");
          n.addFicheOnTable(m, h, [25, 26, 28, 29], 9, "bet_25_26_28_29");
          n.addFicheOnTable(m, h, [32, 35], 18, "bet_32_35");
          break;
        case "oBetTier":
          n.createPileForTier(m, h, e, f, k);
          break;
        case "oBetOrphelins":
          n.addFicheOnTable(m, h, [1], 36, "bet_1");
          n.addFicheOnTable(m, h, [6, 9], 18, "bet_6_9");
          n.addFicheOnTable(m, h, [14, 17], 18, "bet_14_17");
          n.addFicheOnTable(m, h, [17, 20], 18, "bet_17_20");
          n.addFicheOnTable(m, h, [31, 34], 18, "bet_31_34");
          break;
        case "oBetFinalsBet":
          n.createPileForMultipleNumbers(m, h, e, f, k);
          break;
        default:
          n.addFicheOnTable(m, h, e, f, d);
      }
      w.setMoney(n.getCredit());
      w.setCurBet(n.getCurBet());
      w.enableSpin(!0);
      playSound("chip", 1, !1);
    }
  };
  this._onShowBetOnTableFromNeighbors = function (a, p) {
    var d = a.numbers;
    b -= a.bet_mult;
    g.push(a.bet_mult);
    var e = a.bet_win,
      f = a.num_fiches;
    p ||
      (0 === l.length && ((t = []), w.disableRebet()),
      t.push({
        button: a.button,
        numbers: a.numbers,
        bet_mult: a.bet_mult,
        bet_win: a.bet_win,
        num_fiches: a.num_fiches,
        value: w.getCurFicheSelected(),
        num_clicked: a.num_clicked,
        neighbors: !0,
      }));
    l.push(e);
    c.push(f);
    var h = s_oGameSettings.getFicheValues(a.value);
    h * f > n.getCredit()
      ? (A.show(TEXT_ERROR_NO_MONEY_MSG), F.reset())
      : (n.createPileForMultipleNumbers(h, a.value, d, e, f),
        w.setMoney(n.getCredit()),
        w.setCurBet(n.getCurBet()),
        w.enableSpin(!0),
        playSound("chip", 1, !1));
  };
  this._onShowEnlight = function (a) {
    for (var b = a.numbers, c = 0; c < b.length; c++)
      p.enlight("oEnlight_" + b[c]);
    (a = a.enlight) && p.enlight("oEnlight_" + a);
  };
  this._onHideEnlight = function (a) {
    for (var b = a.numbers, c = 0; c < b.length; c++)
      p.enlightOff("oEnlight_" + b[c]);
    (a = a.enlight) && p.enlightOff("oEnlight_" + a);
  };
  this.onClearLastBet = function () {
    if (0 < g.length) {
      var a = g.pop();
      b += a;
    }
    0 === g.length && w.enableSpin(!1);
    n.clearLastBet(l.pop(), c.pop());
    w.setMoney(n.getCredit());
    w.setCurBet(n.getCurBet());
    F.clearLastBet();
    0 < t.length && t.pop();
  };
  this.onClearAllBets = function () {
    n.clearAllBets();
    w.setMoney(n.getCredit());
    w.setCurBet(n.getCurBet());
    w.enableSpin(!1);
    F.reset();
    t = [];
    b = 37;
  };
  this.onRebet = function () {
    for (var a = 0; a < t.length; a++)
      !0 === t[a].neighbors
        ? F.rebet(t[a].num_clicked)
        : this._onShowBetOnTable(t[a], !0);
  };
  this.onFinalBetShown = function () {
    I.isVisible() ? I.hide() : I.show();
  };
  this.onOpenNeighbors = function () {
    I.hide();
    F.showPanel(w.getCurFicheSelected(), n.getCredit(), n.getCurBet());
  };
  this.onExit = function () {
    $(s_oMain).trigger("end_session");
    $(s_oMain).trigger("save_score", n.getCredit());
    $(s_oMain).trigger("share_event", n.getCredit());
    this.unload();
    s_oMain.gotoMenu();
  };
  this._updateWaitingBet = function () {
    F.isVisible() ||
      0 === TIME_WAITING_BET ||
      ((m += s_iTimeElaps), m > TIME_WAITING_BET && ((m = 0), this.onSpin()));
  };
  this._updateSpinning = function () {};
  this._updateShowWinner = function () {
    m += s_iTimeElaps;
    m > TIME_SHOW_WINNER &&
      ((m = 0), s_oGame._setState(STATE_DISTRIBUTE_FICHES));
  };
  this._updateDistributeFiches = function () {
    m += s_iTimeElaps;
    if (m > TIME_FICHES_MOV)
      (m = 0), playSound("fiche_collect", 1, !1), this._resetTable();
    else
      for (
        var a = s_oTweenController.easeInOutCubic(m, 0, 1, TIME_FICHES_MOV),
          b = 0;
        b < x.length;
        b++
      )
        x[b].updatePos(a);
  };
  this.update = function () {
    if (!1 !== d) {
      switch (h) {
        case STATE_GAME_WAITING_FOR_BET:
          this._updateWaitingBet();
          break;
        case STATE_GAME_SPINNING:
          this._updateSpinning();
          break;
        case STATE_GAME_SHOW_WINNER:
          this._updateShowWinner();
          break;
        case STATE_DISTRIBUTE_FICHES:
          this._updateDistributeFiches();
      }
      E.isVisible() && E.update();
    }
  };
  s_oGame = this;
  TOTAL_MONEY = a.money;
  MIN_BET = a.min_bet;
  MAX_BET = a.max_bet;
  TIME_WAITING_BET = a.time_bet;
  TIME_SHOW_WINNER = a.time_winner;
  WIN_OCCURRENCE = a.win_occurrence;
  NUM_HAND_FOR_ADS = a.num_hand_before_ads;
  var H = a.casino_cash;
  this._init();
}
var s_oGame, s_oTweenController, s_oGameSettings;

function CInterface() {
  var a,
    d,
    f,
    h,
    b,
    m,
    k,
    e,
    g,
    l,
    c,
    u = null,
    x = null,
    t,
    v,
    n,
    q,
    w,
    p,
    A,
    E,
    I,
    F,
    K,
    H,
    O,
    N;
  this._init = function () {
    var B = s_oSpriteLibrary.getSprite("but_bg"),
      G = createBitmap(B);
    G.x = 191;
    G.y = 93;
    s_oStage.addChild(G);
    new CTLText(
      s_oStage,
      200,
      100,
      B.width - 16,
      24,
      24,
      "center",
      "#fff",
      FONT1,
      1,
      2,
      2,
      TEXT_MONEY,
      !0,
      !0,
      !1,
      !1
    );
    t = new CTLText(
      s_oStage,
      200,
      122,
      B.width - 16,
      24,
      20,
      "center",
      "#fff",
      FONT1,
      1,
      2,
      2,
      "0",
      !0,
      !0,
      !1,
      !1
    );
    G = createBitmap(s_oSpriteLibrary.getSprite("but_bg"));
    G.x = 350;
    G.y = 93;
    s_oStage.addChild(G);
    new CTLText(
      s_oStage,
      358,
      100,
      B.width - 16,
      24,
      24,
      "center",
      "#fff",
      FONT1,
      1,
      2,
      2,
      TEXT_CUR_BET,
      !0,
      !0,
      !1,
      !1
    );
    v = new CTLText(
      s_oStage,
      358,
      122,
      B.width - 16,
      24,
      20,
      "center",
      "#fff",
      FONT1,
      1,
      2,
      2,
      "0",
      !0,
      !0,
      !1,
      !1
    );
    n = createBitmap(s_oSpriteLibrary.getSprite("but_bets"));
    n.x = 515;
    n.y = 100;
    s_oStage.addChild(n);
    new CTLText(
      s_oStage,
      520,
      98,
      B.width - 16,
      56,
      24,
      "center",
      "#fff",
      FONT1,
      1,
      2,
      2,
      TEXT_MIN_BET + ": " + MIN_BET + " " + TEXT_MAX_BET + ": " + MAX_BET,
      !0,
      !0,
      !0,
      !1
    );
    B = createBitmap(s_oSpriteLibrary.getSprite("logo_game_0"));
    B.x = 740;
    B.y = 98;
    s_oStage.addChild(B);
    q = new CSpinBut(
      1107,
      641,
      s_oSpriteLibrary.getSprite("spin_but"),
      "  " + TEXT_SPIN,
      FONT1,
      "#fff",
      19,
      s_oStage
    );
    q.setVisible(!1);
    q.addEventListener(ON_MOUSE_UP, this._onSpin, this);
    K = new CBetTextButton(
      266,
      641,
      s_oSpriteLibrary.getSprite("but_bg"),
      TEXT_VOISINS_ZERO,
      FONT1,
      "#fff",
      16,
      "oBetVoisinsZero"
    );
    K.addEventListener(ON_MOUSE_UP, this._onBetRelease, this);
    F = new CBetTextButton(
      424,
      641,
      s_oSpriteLibrary.getSprite("but_bg"),
      TEXT_TIER,
      FONT1,
      "#fff",
      16,
      "oBetTier"
    );
    F.addEventListener(ON_MOUSE_UP, this._onBetRelease, this);
    I = new CBetTextButton(
      582,
      641,
      s_oSpriteLibrary.getSprite("but_bg"),
      TEXT_ORPHELINS,
      FONT1,
      "#fff",
      16,
      "oBetOrphelins"
    );
    I.addEventListener(ON_MOUSE_UP, this._onBetRelease, this);
    E = new CTextButton(
      740,
      641,
      s_oSpriteLibrary.getSprite("but_bg"),
      TEXT_NEIGHBORS,
      FONT1,
      "#fff",
      16,
      s_oStage
    );
    E.addEventListener(ON_MOUSE_UP, this._onNeighborsPanel, this);
    A = new CTextButton(
      898,
      641,
      s_oSpriteLibrary.getSprite("but_bg"),
      TEXT_FINALSBET,
      FONT1,
      "#fff",
      16,
      s_oStage
    );
    A.addEventListener(ON_MOUSE_UP, this._onFinalBetShow, this);
    H = new CGfxButton(
      1064,
      586,
      s_oSpriteLibrary.getSprite("but_rebet"),
      s_oStage
    );
    H.disable();
    H.addEventListener(ON_MOUSE_UP, this._onRebet, this);
    w = new CGfxButton(
      1064,
      526,
      s_oSpriteLibrary.getSprite("but_clear_last"),
      s_oStage
    );
    w.addEventListener(ON_MOUSE_UP, this._onClearLastBet, this);
    p = new CGfxButton(
      1064,
      466,
      s_oSpriteLibrary.getSprite("but_clear_all"),
      s_oStage
    );
    p.addEventListener(ON_MOUSE_UP, this._onClearAllBet, this);
    this._initFichesBut();
    this.disableBetFiches();
    O = new CHistory(1095, 158, s_oStage);
    k = 0;
    e[k].select();
    B = new createjs.Graphics()
      .beginFill("rgba(0,0,0,0.01)")
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    N = new createjs.Shape(B);
    N.on("click", function () {});
    N.visible = !1;
    s_oStage.addChild(N);
    B = s_oSpriteLibrary.getSprite("but_exit");
    a = CANVAS_WIDTH - B.width / 2 - 10;
    d = B.height / 2 + 10;
    g = new CGfxButton(a, d, B, s_oStage);
    g.addEventListener(ON_MOUSE_UP, this._onExit, this);
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
      (B = s_oSpriteLibrary.getSprite("audio_icon")),
        (b = a - B.width / 2 - 10),
        (m = B.height / 2 + 10),
        (l = new CToggle(b, m, B, s_bAudioActive, s_oStage)),
        l.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
    B = window.document;
    G = B.documentElement;
    u =
      G.requestFullscreen ||
      G.mozRequestFullScreen ||
      G.webkitRequestFullScreen ||
      G.msRequestFullscreen;
    x =
      B.exitFullscreen ||
      B.mozCancelFullScreen ||
      B.webkitExitFullscreen ||
      B.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (u = !1);
    u &&
      screenfull.enabled &&
      ((B = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (f = B.width / 4 + 10),
      (h = B.height / 2 + 10),
      (c = new CToggle(f, h, B, s_bFullscreen, s_oStage)),
      c.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };
  this.unload = function () {
    g.unload();
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || l.unload();
    u && screenfull.enabled && c.unload();
    q.unload();
    w.unload();
    p.unload();
    A.unload();
    E.unload();
    I.unload();
    F.unload();
    K.unload();
    H.unload();
    s_oInterface = null;
  };
  this.refreshButtonPos = function (p, e) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      l.setPosition(b - p, m + e);
    u && screenfull.enabled && c.setPosition(f + p, h + e);
    g.setPosition(a - p, d + e);
  };
  this.hideBlock = function () {
    N.visible = !1;
  };
  this.showBlock = function () {
    N.visible = !0;
  };
  this.enableBetFiches = function () {
    for (var a = 0; a < NUM_FICHE_VALUES; a++) e[a].enable();
    w.enable();
    p.enable();
    A.enable();
    E.enable();
    I.enable();
    F.enable();
    K.enable();
  };
  this.disableBetFiches = function () {
    for (var a = 0; a < NUM_FICHE_VALUES; a++) e[a].disable();
    w.disable();
    p.disable();
    A.disable();
    E.disable();
    I.disable();
    F.disable();
    K.disable();
    H.disable();
  };
  this.enableRebet = function () {
    H.enable();
  };
  this.disableRebet = function () {
    H.disable();
  };
  this.deselectAllFiches = function () {
    for (var a = 0; a < NUM_FICHES; a++) e[a].deselect();
  };
  this.enableSpin = function (a) {
    q.setVisible(a);
  };
  this._initFichesBut = function () {
    var a = createBitmap(s_oSpriteLibrary.getSprite("chip_box"));
    a.x = 102;
    a.y = 100;
    s_oStage.addChild(a);
    a = 150;
    e = [];
    for (var b = 0; b < NUM_FICHES; b++) {
      var c = s_oSpriteLibrary.getSprite("fiche_" + b);
      e[b] = new CFicheBut(142, a, c);
      e[b].addEventListenerWithParams(
        ON_MOUSE_UP,
        this._onFicheSelected,
        this,
        [b]
      );
      a += c.height + 25;
    }
  };
  this.refreshTime = function (a) {
    formatTime(a);
  };
  this.setMoney = function (a) {
    t.refreshText(a.toFixed(2) + TEXT_CURRENCY);
  };
  this.setCurBet = function (a) {
    v.refreshText(a.toFixed(2) + TEXT_CURRENCY);
  };
  this.refreshMoney = function (a, b) {
    new CRollingTextController(
      t.getText(),
      null,
      a,
      parseFloat(b),
      1e3,
      EASE_LINEAR,
      TEXT_CURRENCY
    );
  };
  this.refreshNumExtracted = function (a) {
    var b = a.length - 1,
      c = -1;
    a.length > ROW_HISTORY - 1 && (c = b - ROW_HISTORY);
    for (var p = 0; b > c; b--) {
      switch (s_oGameSettings.getColorNumber(a[b])) {
        case COLOR_BLACK:
          O.showBlack(p, a[b]);
          break;
        case COLOR_RED:
          O.showRed(p, a[b]);
          break;
        case COLOR_ZERO:
          O.showGreen(p, a[b]);
      }
      p++;
    }
  };
  this.gameOver = function () {};
  this._onBetRelease = function (a) {
    var b = a.numbers,
      c = a.bet_mult,
      p = a.bet_win;
    null !== b &&
      s_oGame._onShowBetOnTable(
        {
          button: a.name,
          numbers: b,
          bet_mult: c,
          bet_win: p,
          num_fiches: a.num_fiches,
        },
        !1
      );
  };
  this._onFicheSelected = function (a) {
    playSound("fiche_collect", 1, !1);
    this.deselectAllFiches();
    a = a[0];
    for (var b = 0; b < NUM_FICHE_VALUES; b++) b === a && (k = b);
  };
  this._onSpin = function () {
    this.disableBetFiches();
    this.enableSpin(!1);
    s_oGame.onSpin();
  };
  this._onClearLastBet = function () {
    s_oGame.onClearLastBet();
  };
  this._onClearAllBet = function () {
    s_oGame.onClearAllBets();
  };
  this._onFinalBetShow = function () {
    s_oGame.onFinalBetShown();
  };
  this._onNeighborsPanel = function () {
    s_oGame.onOpenNeighbors();
  };
  this._onRebet = function () {
    H.disable();
    s_oGame.onRebet();
  };
  this._onExit = function () {
    s_oGame.onExit();
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this.resetFullscreenBut = function () {
    u && screenfull.enabled && c.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? x.call(window.document)
      : u.call(window.document.documentElement);
    sizeHandler();
  };
  this.getCurFicheSelected = function () {
    return k;
  };
  this.isBlockVisible = function () {
    return N.visible;
  };
  s_oInterface = this;
  this._init();
  return this;
}
var s_oInterface = null;

function CMsgBox() {
  var a, d, f;
  this._init = function () {
    f = new createjs.Container();
    f.alpha = 0;
    f.visible = !1;
    s_oStage.addChild(f);
    a = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
    a.on("click", function () {});
    f.addChild(a);
    d = new CTLText(
      f,
      CANVAS_WIDTH / 2 - 250,
      230,
      500,
      280,
      40,
      "center",
      "#fff",
      FONT1,
      1,
      2,
      2,
      "",
      !0,
      !0,
      !0,
      !1
    );
  };
  this.unload = function () {
    a.off("click", function () {});
  };
  this.show = function (a) {
    d.refreshText(a);
    f.visible = !0;
    var b = this;
    createjs.Tween.get(f).to(
      {
        alpha: 1,
      },
      500
    );
    setTimeout(function () {
      b._onExit();
    }, 2e3);
  };
  this._onExit = function () {
    f.visible && (f.off("mousedown"), (f.visible = !1));
  };
  this._init();
  return this;
}

function CTweenController() {
  this.tweenValue = function (a, d, f) {
    return a + f * (d - a);
  };
  this.easeLinear = function (a, d, f, h) {
    return (f * a) / h + d;
  };
  this.easeInCubic = function (a, d, f, h) {
    h = (a /= h) * a * a;
    return d + f * h;
  };
  this.easeBackInQuart = function (a, d, f, h) {
    h = (a /= h) * a;
    return d + f * (2 * h * h + 2 * h * a + -3 * h);
  };
  this.easeInBack = function (a, d, f, h) {
    return f * (a /= h) * a * (2.70158 * a - 1.70158) + d;
  };
  this.easeOutCubic = function (a, d, f, h) {
    return f * ((a = a / h - 1) * a * a + 1) + d;
  };
  this.easeInOutCubic = function (a, d, f, h) {
    return 1 > (a /= h / 2)
      ? (f / 2) * a * a * a + d
      : (f / 2) * ((a -= 2) * a * a + 2) + d;
  };
  this.tweenVectors = function (a, d, f, h) {
    h.x = a.x + f * (d.x - a.x);
    h.y = a.y + f * (d.y - a.y);
    return h;
  };
}

function CSeat() {
  var a, d, f, h, b, m;
  this._init = function () {
    this.reset();
  };
  this.reset = function () {
    f = [];
    h = [];
    b = [];
    this.resetNumberWins();
    m && m.reset();
    a = 0;
  };
  this.setInfo = function (b, e) {
    d = b;
    a = 0;
    m = new CFichesController(e);
  };
  this.resetNumberWins = function () {
    for (var a = 0; a < NUMBERS_TO_BET; a++)
      f[a] = {
        win: 0,
        mc: null,
      };
    b = [];
  };
  this.setFicheBetted = function (k, e, g, l, c) {
    for (var m = [], x = [], t = 0; t < e.length; t++) {
      var v = (parseFloat(f[e[t]].win) + g * k * c).toFixed(1);
      f[e[t]] = {
        win: v,
        mc: l,
      };
      m.push(g * k * c);
      x.push(l);
    }
    b.push({
      win: m,
      mc: l,
    });
    h.push(e);
    k = parseFloat((k * c).toFixed(2));
    a += k;
    a = parseFloat(a.toFixed(2));
    d -= k;
    d = roundDecimal(d, 1);
  };
  this.createPileForVoisinZero = function (a, b, d, f, c) {
    var e = [];
    m.createPileForVoisinZero(b, e);
    this.setFicheBetted(a, d, f, e, c);
  };
  this.createPileForTier = function (a, b, d, f, c) {
    var e = [];
    m.createPileForTier(b, e);
    this.setFicheBetted(a, d, f, e, c);
  };
  this.createPileForOrphelins = function (k, e, g, l, c) {
    l = [];
    m.createPileForOrphelins(e, l);
    e = [];
    var u = (parseFloat(f[g[0]].win) + 36 * k).toFixed(1);
    f[g[0]] = {
      win: u,
      mc: l,
    };
    e.push(36 * k);
    u = (parseFloat(f[g[1]].win) + 18 * k).toFixed(1);
    f[g[1]] = {
      win: u,
      mc: l,
    };
    e.push(18 * k);
    u = (parseFloat(f[g[2]].win) + 18 * k).toFixed(1);
    f[g[2]] = {
      win: u,
      mc: l,
    };
    e.push(18 * k);
    u = (parseFloat(f[g[3]].win) + 18 * k).toFixed(1);
    f[g[3]] = {
      win: u,
      mc: l,
    };
    e.push(18 * k);
    u = (parseFloat(f[g[4]].win) + 36 * k).toFixed(1);
    f[g[4]] = {
      win: u,
      mc: l,
    };
    e.push(36 * k);
    u = (parseFloat(f[g[5]].win) + 18 * k).toFixed(1);
    f[g[5]] = {
      win: u,
      mc: l,
    };
    e.push(18 * k);
    u = (parseFloat(f[g[6]].win) + 18 * k).toFixed(1);
    f[g[6]] = {
      win: u,
      mc: l,
    };
    e.push(18 * k);
    u = (parseFloat(f[g[7]].win) + 18 * k).toFixed(1);
    f[g[7]] = {
      win: u,
      mc: l,
    };
    e.push(18 * k);
    h.push(g);
    k = parseFloat((k * c).toFixed(2));
    a += k;
    d -= k;
    d = roundDecimal(d, 1);
    b.push({
      win: e,
      mc: l,
    });
  };
  this.createPileForMultipleNumbers = function (a, b, d, f, c) {
    var e = [];
    m.createPileForMultipleNumbers(b, d, e);
    this.setFicheBetted(a, d, f, e, c);
  };
  this.addFicheOnTable = function (a, b, d, f, c) {
    var e = [];
    m.setFicheOnTable(b, c, e);
    this.setFicheBetted(a, d, f, e, 1);
  };
  this.clearLastBet = function () {
    if (0 !== h.length) {
      var k = m.clearLastBet();
      d += k;
      d = roundDecimal(d, 1);
      a -= k;
      k = h.pop();
      for (var e = b.pop().win, g = 0; g < k.length; g++)
        f[k[g]] =
          0 < b.length
            ? {
                win: f[k[g]].win - e[g],
                mc: b[b.length - 1].mc,
              }
            : {
                win: f[k[g]].win - e[g],
                mc: null,
              };
    }
  };
  this.clearAllBets = function () {
    this.resetNumberWins();
    m.clearAllBets();
    d += a;
    d = roundDecimal(d, 1);
    a = 0;
  };
  this.showWin = function (a) {
    d += a;
    d = roundDecimal(d, 1);
  };
  this.recharge = function (a) {
    d = a;
  };
  this.getCurBet = function () {
    return a;
  };
  this.getCredit = function () {
    return d;
  };
  this.getNumbersBetted = function () {
    return f;
  };
  this.getNumberSelected = function () {
    return h;
  };
  this._init();
}

function CTableController() {
  var a, d, f, h;
  this._init = function () {
    d = new createjs.Container();
    d.x = 184;
    d.y = 150;
    s_oStage.addChild(d);
    var a = createBitmap(s_oSpriteLibrary.getSprite("board_roulette"));
    d.addChild(a);
    this._initEnlights();
    a = new CBetTableButton(
      221,
      289,
      s_oSpriteLibrary.getSprite("hit_area_horizontal"),
      "first12",
      d,
      !0
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    a = new CBetTableButton(
      470,
      289,
      s_oSpriteLibrary.getSprite("hit_area_horizontal"),
      "second12",
      d,
      !0
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    a = new CBetTableButton(
      717,
      289,
      s_oSpriteLibrary.getSprite("hit_area_horizontal"),
      "third12",
      d,
      !0
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    a = new CBetTableButton(
      54,
      121,
      s_oSpriteLibrary.getSprite("hit_area_0"),
      "bet_0",
      d,
      !1
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    for (
      var m = s_oSpriteLibrary.getSprite("hit_area_number"),
        k = 128,
        e = 194,
        g = 1;
      37 > g;
      g++
    )
      (a = new CBetTableButton(k, e, m, "bet_" + g, d, !1)),
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this),
        !1 === s_bMobile &&
          (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
          a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this)),
        0 === g % 3
          ? ((k += WIDTH_CELL_NUMBER + 3), (e = 194))
          : (e -= HEIGHT_CELL_NUMBER + 3);
    a = new CBetTableButton(
      97,
      195,
      s_oSpriteLibrary.getSprite("hit_area_couple_vertical"),
      "bet_0_1",
      d,
      !1
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    a = new CBetTableButton(
      97,
      120,
      s_oSpriteLibrary.getSprite("hit_area_couple_vertical"),
      "bet_0_2",
      d,
      !1
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    a = new CBetTableButton(
      97,
      45,
      s_oSpriteLibrary.getSprite("hit_area_couple_vertical"),
      "bet_0_3",
      d,
      !1
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    k = 159;
    e = 194;
    for (var l = 1; 34 > l; l++)
      (a = new CBetTableButton(
        k,
        e,
        s_oSpriteLibrary.getSprite("hit_area_couple_vertical"),
        "bet_" + l + "_" + (l + 3),
        d,
        !1
      )),
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this),
        !1 === s_bMobile &&
          (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
          a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this)),
        0 === l % 3
          ? ((k += WIDTH_CELL_NUMBER + 3), (e = 194))
          : (e -= HEIGHT_CELL_NUMBER + 3);
    k = 128;
    e = 157;
    for (l = g = 1; 25 > l; l++)
      (a = new CBetTableButton(
        k,
        e,
        s_oSpriteLibrary.getSprite("hit_area_couple_horizontal"),
        "bet_" + g + "_" + (g + 1),
        d,
        !1
      )),
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this),
        !1 === s_bMobile &&
          (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
          a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this)),
        0 === l % 2
          ? ((k += WIDTH_CELL_NUMBER + 3), (e = 157), (g += 2))
          : ((e -= HEIGHT_CELL_NUMBER + 3), g++);
    a = new CBetTableButton(
      96,
      158,
      s_oSpriteLibrary.getSprite("hit_area_small"),
      "bet_0_1_2",
      d,
      !1
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    a = new CBetTableButton(
      96,
      84,
      s_oSpriteLibrary.getSprite("hit_area_small"),
      "bet_0_2_3",
      d,
      !1
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    k = 128;
    e = 232;
    g = 1;
    m = s_oSpriteLibrary.getSprite("hit_area_couple_horizontal");
    for (l = 1; 13 > l; l++)
      (a = new CBetTableButton(
        k,
        e,
        m,
        "bet_" + g + "_" + (g + 1) + "_" + (g + 2),
        d,
        !1
      )),
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this),
        !1 === s_bMobile &&
          (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
          a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this)),
        (k += WIDTH_CELL_NUMBER + 3),
        (g += 3);
    a = new CBetTableButton(
      96,
      232,
      s_oSpriteLibrary.getSprite("hit_area_small"),
      "bet_0_1_2_3",
      d,
      !1
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    e = k = 158;
    for (l = g = 1; 23 > l; l++)
      (a = new CBetTableButton(
        k,
        e,
        s_oSpriteLibrary.getSprite("hit_area_small"),
        "bet_" + g + "_" + (g + 1) + "_" + (g + 3) + "_" + (g + 4),
        d,
        !1
      )),
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this),
        !1 === s_bMobile &&
          (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
          a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this)),
        0 === l % 2
          ? ((k += WIDTH_CELL_NUMBER + 3), (e = 157), (g += 2))
          : ((e -= HEIGHT_CELL_NUMBER + 3), g++);
    k = 158;
    e = 232;
    g = 1;
    m = s_oSpriteLibrary.getSprite("hit_area_small");
    for (l = 1; 12 > l; l++)
      (a = new CBetTableButton(
        k,
        e,
        m,
        "bet_" +
          g +
          "_" +
          (g + 1) +
          "_" +
          (g + 2) +
          "_" +
          (g + 3) +
          "_" +
          (g + 4) +
          "_" +
          (g + 5),
        d,
        !1
      )),
        a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this),
        !1 === s_bMobile &&
          (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
          a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this)),
        (g += 3),
        (k += WIDTH_CELL_NUMBER + 3);
    a = new CBetTableButton(
      872,
      194,
      s_oSpriteLibrary.getSprite("hit_area_number"),
      "col1",
      d,
      !0
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    a = new CBetTableButton(
      872,
      120,
      s_oSpriteLibrary.getSprite("hit_area_number"),
      "col2",
      d,
      !0
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    a = new CBetTableButton(
      872,
      46,
      s_oSpriteLibrary.getSprite("hit_area_number"),
      "col3",
      d,
      !0
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    a = new CBetTableButton(
      159,
      400,
      s_oSpriteLibrary.getSprite("hit_area_horizontal_half"),
      "first18",
      d,
      !0
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    a = new CBetTableButton(
      281,
      400,
      s_oSpriteLibrary.getSprite("hit_area_horizontal_half"),
      "even",
      d,
      !0
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    a = new CBetTableButton(
      408,
      400,
      s_oSpriteLibrary.getSprite("hit_area_color"),
      "black",
      d,
      !0
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    a = new CBetTableButton(
      533,
      400,
      s_oSpriteLibrary.getSprite("hit_area_color"),
      "red",
      d,
      !0
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    a = new CBetTableButton(
      656,
      400,
      s_oSpriteLibrary.getSprite("hit_area_horizontal_half"),
      "odd",
      d,
      !0
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    a = new CBetTableButton(
      778,
      400,
      s_oSpriteLibrary.getSprite("hit_area_horizontal_half"),
      "second18",
      d,
      !0
    );
    a.addEventListener(ON_MOUSE_DOWN, this._onBetPress, this);
    !1 === s_bMobile &&
      (a.addEventListener(ON_MOUSE_OVER, this._onBetNumberOver, this),
      a.addEventListener(ON_MOUSE_OUT, this._onBetNumberOut, this));
    f = [];
    h = [];
  };
  this._initEnlights = function () {
    a = [];
    var b = new CEnlight(11, 10, s_oSpriteLibrary.getSprite("enlight_0"), d);
    a.oEnlight_0 = b;
    for (
      var f = 98,
        h = 159,
        e = s_oSpriteLibrary.getSprite("enlight_number"),
        g = 0;
      36 > g;
      g++
    )
      (b = new CEnlight(f, h, e, d)),
        (a["oEnlight_" + (g + 1)] = b),
        0 === (g + 1) % 3
          ? ((f += e.width + 3), (h = 159))
          : (h -= e.height + 3);
    b = new CEnlight(842, 159, s_oSpriteLibrary.getSprite("enlight_number"), d);
    a.oEnlight_col1 = b;
    b = new CEnlight(842, 85, s_oSpriteLibrary.getSprite("enlight_number"), d);
    a.oEnlight_col2 = b;
    b = new CEnlight(842, 11, s_oSpriteLibrary.getSprite("enlight_number"), d);
    a.oEnlight_col3 = b;
    b = new CEnlight(
      98,
      234,
      s_oSpriteLibrary.getSprite("enlight_horizontal"),
      d
    );
    a.oEnlight_first12 = b;
    b = new CEnlight(
      347,
      234,
      s_oSpriteLibrary.getSprite("enlight_horizontal"),
      d
    );
    a.oEnlight_second12 = b;
    b = new CEnlight(
      595,
      234,
      s_oSpriteLibrary.getSprite("enlight_horizontal"),
      d
    );
    a.oEnlight_third12 = b;
    b = new CEnlight(
      98,
      345,
      s_oSpriteLibrary.getSprite("enlight_horizontal_half"),
      d
    );
    a.oEnlight_first18 = b;
    b = new CEnlight(
      220,
      345,
      s_oSpriteLibrary.getSprite("enlight_horizontal_half"),
      d
    );
    a.oEnlight_even = b;
    b = new CEnlight(347, 348, s_oSpriteLibrary.getSprite("enlight_color"), d);
    a.oEnlight_black = b;
    b = new CEnlight(470, 348, s_oSpriteLibrary.getSprite("enlight_color"), d);
    a.oEnlight_red = b;
    b = new CEnlight(
      595,
      345,
      s_oSpriteLibrary.getSprite("enlight_horizontal_half"),
      d
    );
    a.oEnlight_odd = b;
    b = new CEnlight(
      717,
      345,
      s_oSpriteLibrary.getSprite("enlight_horizontal_half"),
      d
    );
    a.oEnlight_second18 = b;
  };
  this.unload = function () {
    for (var a = 0; a < d.getNumChildren(); a++) {
      var f = d.getChildAt(a);
      f instanceof CBetTableButton && f.unload();
    }
  };
  this.addEventListener = function (a, d, k) {
    f[a] = d;
    h[a] = k;
  };
  this._onBetPress = function (a) {
    null !== a.numbers &&
      f[ON_SHOW_BET_ON_TABLE] &&
      f[ON_SHOW_BET_ON_TABLE].call(h[ON_SHOW_BET_ON_TABLE], a, !1);
  };
  this._onBetNumberOver = function (a) {
    null !== a.numbers &&
      f[ON_SHOW_ENLIGHT] &&
      f[ON_SHOW_ENLIGHT].call(h[ON_SHOW_ENLIGHT], a);
  };
  this._onBetNumberOut = function (a) {
    null !== a.numbers &&
      f[ON_HIDE_ENLIGHT] &&
      f[ON_HIDE_ENLIGHT].call(h[ON_HIDE_ENLIGHT], a);
  };
  this.enlight = function (b) {
    a[b].show();
  };
  this.enlightOff = function (b) {
    a[b].hide();
  };
  this.getEnlightX = function (b) {
    return a["oEnlight_" + b].getX();
  };
  this.getEnlightY = function (b) {
    return a["oEnlight_" + b].getY();
  };
  this.getContainer = function () {
    return d;
  };
  this.getX = function () {
    return d.x;
  };
  this.getY = function () {
    return d.x;
  };
  this._init();
}

function CEnlight(a, d, f, h) {
  var b;
  this._init = function (a, d, e, f) {
    b = createBitmap(e);
    b.x = a;
    b.y = d;
    b.visible = !1;
    f.addChild(b);
  };
  this.show = function () {
    b.visible = !0;
  };
  this.hide = function () {
    b.visible = !1;
  };
  this.rotate = function (a) {
    b.rotation = a;
  };
  this.getX = function () {
    return b.x;
  };
  this.getY = function () {
    return b.y;
  };
  this._init(a, d, f, h);
}

function CFiche(a, d, f, h, b) {
  var m, k, e, g, l;
  this._init = function (a, b, d, e, f) {
    l = e;
    e = s_oSpriteLibrary.getSprite("fiche_" + d);
    g = createBitmap(e);
    g.x = a;
    g.y = b;
    g.regX = e.width / 2;
    g.regY = e.height / 2;
    f ? ((g.scaleX = f), (g.scaleY = f)) : ((g.scaleX = 0.8), (g.scaleY = 0.8));
    m = d;
    l.addChild(g);
  };
  this.setEndPoint = function (a, b) {
    k = new createjs.Point(g.x, g.y);
    e = new createjs.Point(a, b);
  };
  this.updatePos = function (a) {
    var c = new createjs.Point();
    c = s_oTweenController.tweenVectors(k, e, a, c);
    g.x = c.x;
    g.y = c.y;
  };
  this.getSprite = function () {
    return g;
  };
  this.getValue = function () {
    return m;
  };
  this._init(a, d, f, h, b);
}

function CHistoryRow(a, d, f) {
  var h, b, m, k, e, g, l;
  this._init = function (a, d) {
    l = new createjs.Container();
    l.x = a;
    l.y = d;
    f.addChild(l);
    h = createBitmap(s_oSpriteLibrary.getSprite("circle_red"));
    h.visible = !1;
    l.addChild(h);
    b = createBitmap(s_oSpriteLibrary.getSprite("circle_green"));
    b.visible = !1;
    b.x = 24;
    l.addChild(b);
    m = createBitmap(s_oSpriteLibrary.getSprite("circle_black"));
    m.visible = !1;
    m.x = 48;
    l.addChild(m);
    k = new createjs.Text("a", "12px " + FONT1, "#fff");
    k.x = h.x + 10;
    k.y = h.y + 4;
    k.visible = !1;
    k.textAlign = "center";
    l.addChild(k);
    e = new createjs.Text("a", "12px " + FONT1, "#fff");
    e.x = b.x + 10;
    e.y = b.y + 4;
    e.visible = !1;
    e.textAlign = "center";
    l.addChild(e);
    g = new createjs.Text("a", "12px " + FONT1, "#fff");
    g.x = m.x + 10;
    g.y = m.y + 4;
    g.visible = !1;
    g.textAlign = "center";
    l.addChild(g);
  };
  this.showBlack = function (a) {
    g.text = a;
    h.visible = !1;
    k.visible = !1;
    b.visible = !1;
    e.visible = !1;
    m.visible = !0;
    g.visible = !0;
  };
  this.showRed = function (a) {
    k.text = a;
    h.visible = !0;
    k.visible = !0;
    b.visible = !1;
    e.visible = !1;
    m.visible = !1;
    g.visible = !1;
  };
  this.showGreen = function (a) {
    e.text = a;
    h.visible = !1;
    k.visible = !1;
    b.visible = !0;
    e.visible = !0;
    m.visible = !1;
    g.visible = !1;
  };
  this._init(a, d);
}

function CWheelAnim(a, d) {
  var f, h, b, m, k, e, g, l, c, u, x, t, v, n, q, w, p, A;
  this._init = function (a, c) {
    k = m = 0;
    h = !1;
    A = new createjs.Container();
    A.visible = !1;
    A.x = a;
    A.y = c;
    p = A.on("click", function () {});
    s_oStage.addChild(A);
    var b = new createjs.Shape();
    b.graphics
      .beginFill("rgba(0,0,0,0.7)")
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    A.addChild(b);
    b = createBitmap(s_oSpriteLibrary.getSprite("bg_wheel"));
    b.x = 240;
    b.y = 159;
    A.addChild(b);
    g = [];
    for (var d = 0; d < NUM_MASK_BALL_SPIN_FRAMES; d++)
      (b = createBitmap(s_oSpriteLibrary.getSprite("wheel_numbers_" + d))),
        (b.x = 418),
        (b.y = 219),
        (b.visible = !1),
        A.addChild(b),
        g.push(b);
    this._initBall();
    l = [];
    for (d = 0; d < NUM_MASK_BALL_SPIN_FRAMES; d++)
      (b = createBitmap(s_oSpriteLibrary.getSprite("wheel_handle_" + d))),
        (b.x = 519),
        (b.y = 186),
        (b.visible = !1),
        A.addChild(b),
        l.push(b);
    x = g[0];
    x.visible = !0;
    t = l[0];
    t.visible = !0;
    q = new createjs.Container();
    q.visible = !1;
    q.x = CANVAS_WIDTH / 2;
    q.y = CANVAS_HEIGHT / 2;
    A.addChild(q);
    b = s_oSpriteLibrary.getSprite("show_number_panel");
    d = createBitmap(b);
    q.addChild(d);
    d = {
      images: [s_oSpriteLibrary.getSprite("show_number_bg")],
      frames: {
        width: 117,
        height: 117,
        regX: 58,
        regY: 58,
      },
      animations: {
        black: [0],
        red: [1],
        green: [2],
      },
    };
    d = new createjs.SpriteSheet(d);
    w = createSprite(d, "black", 58, 58, 117, 117);
    w.x = b.width / 2;
    w.y = b.height / 2;
    q.addChild(w);
    v = new createjs.Text("36", "80px " + FONT2, "#fff");
    v.textAlign = "center";
    v.textBaseline = "middle";
    v.x = b.width / 2;
    v.y = b.height / 2 + 7;
    q.addChild(v);
    d = s_oSpriteLibrary.getSprite("but_bg");
    var e = createBitmap(d);
    e.regX = d.width / 2;
    e.x = b.width / 2;
    e.y = b.height - 12;
    q.addChild(e);
    n = new createjs.Text("", "22px " + FONT1, "#fff");
    n.textAlign = "center";
    n.textBaseline = "middle";
    n.x = b.width / 2;
    n.y = b.height + 20;
    q.addChild(n);
    q.regX = b.width / 2;
    q.regY = b.height / 2;
  };
  this.unload = function () {
    A.off("click", p);
  };
  this._initBall = function () {
    c = [];
    c.push({
      x: 892.9,
      y: 358.95,
    });
    c.push({
      x: 889.4,
      y: 338.95,
    });
    c.push({
      x: 880.9,
      y: 320.45,
    });
    c.push({
      x: 870.9,
      y: 303.45,
    });
    c.push({
      x: 857.65,
      y: 287.2,
    });
    c.push({
      x: 842.4,
      y: 272.2,
    });
    c.push({
      x: 825.9,
      y: 257.45,
    });
    c.push({
      x: 808.15,
      y: 245.7,
    });
    c.push({
      x: 788.15,
      y: 234.45,
    });
    c.push({
      x: 767.9,
      y: 224.45,
    });
    c.push({
      x: 746.9,
      y: 217.2,
    });
    c.push({
      x: 724.4,
      y: 210.7,
    });
    c.push({
      x: 702.15,
      y: 205.2,
    });
    c.push({
      x: 680.15,
      y: 201.7,
    });
    c.push({
      x: 657.15,
      y: 199.45,
    });
    c.push({
      x: 634.15,
      y: 198.95,
    });
    c.push({
      x: 609.15,
      y: 199.95,
    });
    c.push({
      x: 586.4,
      y: 202.2,
    });
    c.push({
      x: 564.15,
      y: 206.2,
    });
    c.push({
      x: 541.65,
      y: 211.2,
    });
    c.push({
      x: 519.15,
      y: 218.2,
    });
    c.push({
      x: 498.9,
      y: 227.45,
    });
    c.push({
      x: 478.9,
      y: 236.7,
    });
    c.push({
      x: 461.15,
      y: 248.95,
    });
    c.push({
      x: 444.15,
      y: 261.45,
    });
    c.push({
      x: 429.15,
      y: 275.7,
    });
    c.push({
      x: 416.65,
      y: 291.45,
    });
    c.push({
      x: 406.65,
      y: 308.95,
    });
    c.push({
      x: 399.15,
      y: 326.7,
    });
    c.push({
      x: 394.4,
      y: 345.7,
    });
    c.push({
      x: 394.4,
      y: 365.7,
    });
    c.push({
      x: 396.65,
      y: 385.7,
    });
    c.push({
      x: 402.4,
      y: 405.2,
    });
    c.push({
      x: 411.65,
      y: 424.95,
    });
    c.push({
      x: 425.9,
      y: 444.2,
    });
    c.push({
      x: 444.15,
      y: 462.2,
    });
    c.push({
      x: 465.9,
      y: 477.95,
    });
    c.push({
      x: 491.15,
      y: 492.45,
    });
    c.push({
      x: 519.15,
      y: 504.7,
    });
    c.push({
      x: 549.9,
      y: 512.95,
    });
    c.push({
      x: 582.4,
      y: 518.7,
    });
    c.push({
      x: 615.4,
      y: 520.45,
    });
    c.push({
      x: 648.4,
      y: 518.45,
    });
    c.push({
      x: 681.4,
      y: 513.45,
    });
    c.push({
      x: 711.9,
      y: 505.2,
    });
    c.push({
      x: 739.65,
      y: 493.45,
    });
    c.push({
      x: 764.65,
      y: 478.7,
    });
    c.push({
      x: 786.15,
      y: 461.95,
    });
    c.push({
      x: 802.9,
      y: 444.45,
    });
    c.push({
      x: 816.15,
      y: 424.7,
    });
    c.push({
      x: 825.15,
      y: 404.7,
    });
    c.push({
      x: 829.9,
      y: 384.7,
    });
    c.push({
      x: 829.9,
      y: 364.7,
    });
    c.push({
      x: 825.9,
      y: 345.95,
    });
    c.push({
      x: 818.9,
      y: 327.2,
    });
    c.push({
      x: 808.15,
      y: 310.2,
    });
    c.push({
      x: 795.15,
      y: 293.95,
    });
    c.push({
      x: 779.65,
      y: 279.45,
    });
    c.push({
      x: 761.65,
      y: 267.2,
    });
    c.push({
      x: 742.4,
      y: 256.45,
    });
    c.push({
      x: 721.15,
      y: 247.95,
    });
    c.push({
      x: 698.65,
      y: 240.45,
    });
    c.push({
      x: 673.65,
      y: 236.95,
    });
    c.push({
      x: 650.65,
      y: 234.45,
    });
    c.push({
      x: 625.65,
      y: 233.95,
    });
    c.push({
      x: 603.15,
      y: 235.45,
    });
    c.push({
      x: 579.9,
      y: 238.7,
    });
    c.push({
      x: 556.9,
      y: 246.2,
    });
    c.push({
      x: 534.4,
      y: 254.2,
    });
    c.push({
      x: 514.4,
      y: 265.7,
    });
    c.push({
      x: 497.65,
      y: 278.2,
    });
    c.push({
      x: 482.15,
      y: 292.45,
    });
    c.push({
      x: 468.9,
      y: 307.7,
    });
    c.push({
      x: 460.65,
      y: 326.2,
    });
    c.push({
      x: 455.65,
      y: 344.7,
    });
    c.push({
      x: 454.4,
      y: 364.7,
    });
    c.push({
      x: 458.15,
      y: 384.7,
    });
    c.push({
      x: 466.9,
      y: 403.7,
    });
    c.push({
      x: 480.15,
      y: 421.95,
    });
    c.push({
      x: 498.15,
      y: 438.2,
    });
    c.push({
      x: 520.65,
      y: 453.2,
    });
    c.push({
      x: 546.65,
      y: 463.7,
    });
    c.push({
      x: 575.4,
      y: 471.45,
    });
    c.push({
      x: 605.4,
      y: 475.2,
    });
    c.push({
      x: 635.4,
      y: 474.95,
    });
    c.push({
      x: 664.4,
      y: 469.95,
    });
    c.push({
      x: 690.9,
      y: 460.7,
    });
    c.push({
      x: 714.15,
      y: 447.95,
    });
    c.push({
      x: 732.65,
      y: 431.2,
    });
    c.push({
      x: 743.4,
      y: 418.7,
    });
    c.push({
      x: 749.4,
      y: 411.2,
    });
    c.push({
      x: 752.15,
      y: 397.95,
    });
    c.push({
      x: 757.65,
      y: 379.45,
    });
    c.push({
      x: 757.65,
      y: 379.45,
    });
    c.push({
      x: 755.65,
      y: 375.7,
    });
    c.push({
      x: 756.15,
      y: 366.2,
    });
    c.push({
      x: 756.15,
      y: 356.2,
    });
    c.push({
      x: 753.65,
      y: 344.95,
    });
    c.push({
      x: 751.4,
      y: 346.45,
    });
    c.push({
      x: 749.9,
      y: 346.45,
    });
    c.push({
      x: 751.65,
      y: 351.7,
    });
    c.push({
      x: 754.15,
      y: 356.7,
    });
    c.push({
      x: 754.9,
      y: 362.45,
    });
    c.push({
      x: 755.9,
      y: 367.45,
    });
    c.push({
      x: 756.4,
      y: 374.2,
    });
    c.push({
      x: 756.4,
      y: 380.2,
    });
    c.push({
      x: 755.65,
      y: 386.7,
    });
    c.push({
      x: 754.4,
      y: 392.45,
    });
    c.push({
      x: 752.65,
      y: 399.2,
    });
    c.push({
      x: 750.15,
      y: 405.45,
    });
    c.push({
      x: 747.65,
      y: 411.7,
    });
    c.push({
      x: 744.4,
      y: 416.95,
    });
    c.push({
      x: 740.65,
      y: 424.45,
    });
    c.push({
      x: 736.15,
      y: 429.7,
    });
    c.push({
      x: 731.15,
      y: 434.95,
    });
    c.push({
      x: 725.65,
      y: 440.95,
    });
    c.push({
      x: 720.15,
      y: 446.2,
    });
    c.push({
      x: 713.65,
      y: 451.2,
    });
    c.push({
      x: 705.9,
      y: 455.45,
    });
    c.push({
      x: 698.65,
      y: 460.2,
    });
    c.push({
      x: 691.15,
      y: 462.95,
    });
    c.push({
      x: 682.15,
      y: 466.7,
    });
    c.push({
      x: 673.65,
      y: 469.2,
    });
    c.push({
      x: 664.65,
      y: 471.45,
    });
    c.push({
      x: 655.15,
      y: 473.45,
    });
    c.push({
      x: 646.15,
      y: 475.2,
    });
    c.push({
      x: 634.9,
      y: 476.45,
    });
    c.push({
      x: 624.9,
      y: 476.45,
    });
    c.push({
      x: 614.9,
      y: 476.45,
    });
    c.push({
      x: 604.9,
      y: 475.7,
    });
    c.push({
      x: 595.65,
      y: 474.2,
    });
    c.push({
      x: 586.4,
      y: 472.45,
    });
    c.push({
      x: 577.15,
      y: 470.45,
    });
    c.push({
      x: 568.65,
      y: 466.95,
    });
    c.push({
      x: 561.15,
      y: 464.95,
    });
    c.push({
      x: 553.15,
      y: 460.95,
    });
    c.push({
      x: 545.15,
      y: 457.95,
    });
    c.push({
      x: 539.9,
      y: 452.95,
    });
    c.push({
      x: 531.4,
      y: 447.95,
    });
    c.push({
      x: 525.9,
      y: 443.45,
    });
    c.push({
      x: 518.4,
      y: 439.45,
    });
    c.push({
      x: 513.4,
      y: 433.7,
    });
    c.push({
      x: 509.15,
      y: 426.95,
    });
    c.push({
      x: 504.15,
      y: 420.45,
    });
    c.push({
      x: 500.65,
      y: 415.2,
    });
    c.push({
      x: 497.4,
      y: 409.7,
    });
    c.push({
      x: 495.15,
      y: 403.45,
    });
    c.push({
      x: 494.65,
      y: 398.45,
    });
    c.push({
      x: 493.4,
      y: 391.2,
    });
    c.push({
      x: 492.4,
      y: 385.7,
    });
    c.push({
      x: 491.9,
      y: 378.7,
    });
    c.push({
      x: 492.4,
      y: 373.7,
    });
    c.push({
      x: 492.9,
      y: 367.2,
    });
    c.push({
      x: 493.4,
      y: 361.95,
    });
    c.push({
      x: 495.15,
      y: 356.2,
    });
    c.push({
      x: 497.65,
      y: 350.95,
    });
    c.push({
      x: 500.15,
      y: 344.2,
    });
    c.push({
      x: 502.65,
      y: 339.2,
    });
    c.push({
      x: 505.9,
      y: 334.7,
    });
    c.push({
      x: 510.65,
      y: 328.95,
    });
    c.push({
      x: 513.9,
      y: 323.95,
    });
    c.push({
      x: 518.9,
      y: 318.95,
    });
    c.push({
      x: 523.9,
      y: 314.2,
    });
    c.push({
      x: 528.9,
      y: 311.2,
    });
    c.push({
      x: 533.9,
      y: 306.7,
    });
    c.push({
      x: 539.65,
      y: 301.7,
    });
    c.push({
      x: 544.65,
      y: 299.2,
    });
    c.push({
      x: 550.65,
      y: 295.95,
    });
    c.push({
      x: 558.4,
      y: 294.45,
    });
    c.push({
      x: 564.9,
      y: 289.95,
    });
    c.push({
      x: 572.4,
      y: 289.45,
    });
    c.push({
      x: 579.9,
      y: 286.95,
    });
    c.push({
      x: 585.15,
      y: 285.95,
    });
    c.push({
      x: 592.65,
      y: 283.45,
    });
    c.push({
      x: 600.15,
      y: 283.45,
    });
    c.push({
      x: 607.9,
      y: 283.45,
    });
    c.push({
      x: 613.9,
      y: 281.2,
    });
    c.push({
      x: 621.9,
      y: 280.7,
    });
    c.push({
      x: 629.4,
      y: 280.7,
    });
    c.push({
      x: 636.9,
      y: 280.7,
    });
    c.push({
      x: 644.4,
      y: 280.95,
    });
    c.push({
      x: 651.9,
      y: 281.95,
    });
    c.push({
      x: 658.9,
      y: 284.2,
    });
    c.push({
      x: 665.65,
      y: 287.45,
    });
    c.push({
      x: 672.65,
      y: 289.95,
    });
    c.push({
      x: 679.65,
      y: 291.2,
    });
    c.push({
      x: 686.4,
      y: 293.7,
    });
    c.push({
      x: 692.4,
      y: 296.2,
    });
    c.push({
      x: 699.15,
      y: 298.7,
    });
    c.push({
      x: 704.15,
      y: 301.95,
    });
    c.push({
      x: 710.65,
      y: 306.95,
    });
    c.push({
      x: 715.65,
      y: 309.45,
    });
    c.push({
      x: 721.15,
      y: 312.95,
    });
    c.push({
      x: 726.15,
      y: 316.95,
    });
    c.push({
      x: 731.15,
      y: 321.95,
    });
    c.push({
      x: 736.15,
      y: 324.95,
    });
    c.push({
      x: 739.9,
      y: 330.95,
    });
    c.push({
      x: 742.4,
      y: 335.7,
    });
    c.push({
      x: 746.15,
      y: 340.95,
    });
    c.push({
      x: 748.65,
      y: 346.45,
    });
    u = createBitmap(s_oSpriteLibrary.getSprite("ball"));
    u.x = c[0].x;
    u.y = c[0].y;
    A.addChild(u);
    e = 0;
  };
  this.hide = function () {
    q.visible = !1;
    A.visible = !1;
    e = 0;
  };
  this.startSpin = function (a, c, p, d) {
    this.playToFrame(c);
    b = d;
    h = !0;
    A.visible = !0;
    this.setShowNumberInfo(p);
    f = !0;
  };
  this.setShowNumberInfo = function (a) {
    v.text = a;
    0 < b
      ? ((n.font = "18px " + FONT1),
        (n.text = TEXT_YOU_WIN + " " + b + TEXT_CURRENCY))
      : ((n.font = "22px " + FONT1), (n.text = TEXT_YOU_LOSE));
    switch (s_oGameSettings.getColorNumber(a)) {
      case COLOR_BLACK:
        w.gotoAndStop("black");
        break;
      case COLOR_RED:
        w.gotoAndStop("red");
        break;
      case COLOR_ZERO:
        w.gotoAndStop("green");
    }
  };
  this._showNumberExtracted = function () {
    q.scaleX = q.scaleY = 0.1;
    q.visible = !0;
    createjs.Tween.get(q).to(
      {
        scaleX: 1,
        scaleY: 1,
      },
      800,
      createjs.Ease.cubicOut
    );
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
      0 < b ? playSound("win", 1, !1) : playSound("lose", 1, !1);
  };
  this.playToFrame = function (a) {
    x.visible = !1;
    m = a;
    g[m].visible = !0;
    x = g[m];
    t.visible = !1;
    l[m].visible = !0;
    t = l[m];
  };
  this.nextFrame = function () {
    x.visible = !1;
    m++;
    g[m].visible = !0;
    x = g[m];
    t.visible = !1;
    l[m].visible = !0;
    t = l[m];
  };
  this._ballSpin = function () {
    u.x = c[e].x;
    u.y = c[e].y;
    e++;
    e === NUM_BALL_SPIN_FRAMES
      ? ((f = !1),
        (e = NUM_BALL_SPIN_FRAMES - 1),
        s_oGame._rouletteAnimEnded(),
        this.hide())
      : e === NUM_BALL_SPIN_FRAMES / 2 && this._showNumberExtracted();
  };
  this.isVisible = function () {
    return A.visible;
  };
  this.update = function () {
    !1 !== f &&
      (k++,
      2 === k &&
        ((k = 0),
        h &&
          (this._ballSpin(),
          m === NUM_MASK_BALL_SPIN_FRAMES - 1
            ? this.playToFrame(1)
            : this.nextFrame())));
  };
  this._init(a, d);
}

function CFinalBetPanel(a, d) {
  var f, h;
  this._init = function (a, d) {
    f = [
      [0, 10, 20, 30],
      [1, 11, 21, 31],
      [2, 12, 22, 32],
      [3, 13, 23, 33],
      [4, 14, 24, 34],
      [5, 15, 25, 35],
      [6, 16, 26, 36],
      [7, 17, 27],
      [8, 18, 28],
      [9, 19, 29],
    ];
    h = new createjs.Container();
    h.x = a;
    h.y = d;
    s_oStage.addChild(h);
    for (
      var b = s_oSpriteLibrary.getSprite("final_bet_bg"),
        e = b.width / 2,
        g = b.height / 2,
        l = 0;
      10 > l;
      l++
    )
      new CTextButton(
        e,
        g,
        b,
        "" + l,
        FONT1,
        "#fff",
        14,
        h
      ).addEventListenerWithParams(ON_MOUSE_UP, this._onFinalBetPressed, this, {
        index: l,
      }),
        4 === l ? ((e = b.width / 2), (g += b.height)) : (e += b.width + 2);
    h.visible = !1;
  };
  this.unload = function () {
    for (var a = 0; a < h.getNumChildren(); a++)
      if (d instanceof CTextButton) {
        var d = h.getChildAt(a);
        d.unload();
      }
  };
  this.show = function () {
    h.visible = !0;
  };
  this.hide = function () {
    h.visible = !1;
  };
  this._onFinalBetPressed = function (a) {
    a = a.index;
    s_oGame._onShowBetOnTable(
      {
        button: "oBetFinalsBet",
        numbers: f[a],
        bet_mult: 4 === f[a].length ? 4 : 3,
        bet_win: 4 === f[a].length ? 9 : 12,
        num_fiches: f[a].length,
      },
      !1
    );
    this.hide();
  };
  this.isVisible = function () {
    return h.visible;
  };
  this._init(a, d);
}

function CNeighborsPanel() {
  var a, d, f, h, b, m, k, e, g, l, c, u, x, t, v, n, q, w;
  this._init = function () {
    c = [];
    w = new createjs.Container();
    s_oStage.addChild(w);
    n = new createjs.Shape();
    n.graphics
      .beginFill("rgba(0,0,0,0.7)")
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    n.on("click", function () {});
    w.addChild(n);
    q = new createjs.Container();
    q.x = 265;
    q.y = 85;
    w.addChild(q);
    var a = createBitmap(s_oSpriteLibrary.getSprite("neighbor_bg"));
    q.addChild(a);
    v = new createjs.Text(f + TEXT_CURRENCY, "20px " + FONT1, "#fff");
    v.textAlign = "center";
    v.x = 690;
    v.y = 564;
    q.addChild(v);
    e = [];
    a = new CEnlight(
      354,
      41,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    e.oEnlight_0 = a;
    a = new CEnlight(
      212,
      505,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-136.8);
    e.oEnlight_1 = a;
    a = new CEnlight(
      586,
      145,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(58.1);
    e.oEnlight_2 = a;
    a = new CEnlight(
      268,
      62,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-19.2);
    e.oEnlight_3 = a;
    a = new CEnlight(
      523,
      84,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(39);
    e.oEnlight_4 = a;
    a = new CEnlight(
      377,
      563,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-175);
    e.oEnlight_5 = a;
    a = new CEnlight(
      637,
      311,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(96.2);
    e.oEnlight_6 = a;
    a = new CEnlight(
      142,
      184,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-58.8);
    e.oEnlight_7 = a;
    a = new CEnlight(
      504,
      530,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(156.5);
    e.oEnlight_8 = a;
    a = new CEnlight(
      121,
      357,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-97);
    e.oEnlight_9 = a;
    a = new CEnlight(
      421,
      560,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(175.6);
    e.oEnlight_10 = a;
    a = new CEnlight(
      574,
      473,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(135.8);
    e.oEnlight_11 = a;
    a = new CEnlight(
      195,
      113,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-39.1);
    e.oEnlight_12 = a;
    a = new CEnlight(
      619,
      399,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(117.4);
    e.oEnlight_13 = a;
    a = new CEnlight(
      155,
      440,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-118.2);
    e.oEnlight_14 = a;
    a = new CEnlight(
      442,
      47,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(19.7);
    e.oEnlight_15 = a;
    a = new CEnlight(
      290,
      548,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-156.8);
    e.oEnlight_16 = a;
    a = new CEnlight(
      628,
      226,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(80.2);
    e.oEnlight_17 = a;
    a = new CEnlight(
      117,
      269,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-79.2);
    e.oEnlight_18 = a;
    a = new CEnlight(
      484,
      62,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(29.6);
    e.oEnlight_19 = a;
    a = new CEnlight(
      181,
      475,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-127.5);
    e.oEnlight_20 = a;
    a = new CEnlight(
      557,
      112,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(49.1);
    e.oEnlight_21 = a;
    a = new CEnlight(
      115,
      314,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-88.9);
    e.oEnlight_22 = a;
    a = new CEnlight(
      463,
      549,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(166.4);
    e.oEnlight_23 = a;
    a = new CEnlight(
      333,
      559,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-166.6);
    e.oEnlight_24 = a;
    a = new CEnlight(
      610,
      183,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(69);
    e.oEnlight_25 = a;
    a = new CEnlight(
      311,
      47,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-7.9);
    e.oEnlight_26 = a;
    a = new CEnlight(
      633,
      355,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(106.4);
    e.oEnlight_27 = a;
    a = new CEnlight(
      166,
      146,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-48.1);
    e.oEnlight_28 = a;
    a = new CEnlight(
      126,
      225,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-68.3);
    e.oEnlight_29 = a;
    a = new CEnlight(
      541,
      505,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(146);
    e.oEnlight_30 = a;
    a = new CEnlight(
      134,
      400,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-108.2);
    e.oEnlight_31 = a;
    a = new CEnlight(
      397,
      40,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(8.7);
    e.oEnlight_32 = a;
    a = new CEnlight(
      249,
      530,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-146.3);
    e.oEnlight_33 = a;
    a = new CEnlight(
      636,
      268,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(87.9);
    e.oEnlight_34 = a;
    a = new CEnlight(
      230,
      85,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(-29.1);
    e.oEnlight_35 = a;
    a = new CEnlight(
      600,
      439,
      s_oSpriteLibrary.getSprite("neighbor_enlight"),
      q
    );
    a.rotate(127.1);
    e.oEnlight_36 = a;
    t = new createjs.Container();
    q.addChild(t);
    a = s_oSpriteLibrary.getSprite("hitarea_neighbor");
    var b = new CGfxButton(376, 72, a, q);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 0,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 0,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 0,
    });
    b = new CGfxButton(415, 76, a, q);
    b.rotate(9.2);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 32,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 32,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 32,
    });
    b = new CGfxButton(453, 86, a, q);
    b.rotate(20);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 15,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 15,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 15,
    });
    b = new CGfxButton(490, 102, a, q);
    b.rotate(29.4);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 19,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 19,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 19,
    });
    b = new CGfxButton(520, 124, a, q);
    b.rotate(39.4);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 4,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 4,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 4,
    });
    b = new CGfxButton(549, 150, a, q);
    b.rotate(48.8);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 21,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 21,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 21,
    });
    b = new CGfxButton(571, 181, a, q);
    b.rotate(58.5);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 2,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 2,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 2,
    });
    b = new CGfxButton(588, 216, a, q);
    b.rotate(68.7);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 25,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 25,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 25,
    });
    b = new CGfxButton(599, 253, a, q);
    b.rotate(78.9);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 17,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 17,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 17,
    });
    b = new CGfxButton(604, 291, a, q);
    b.rotate(90.4);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 34,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 34,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 34,
    });
    b = new CGfxButton(603, 330, a, q);
    b.rotate(96.5);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 6,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 6,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 6,
    });
    b = new CGfxButton(596, 368, a, q);
    b.rotate(107.5);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 27,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 27,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 27,
    });
    b = new CGfxButton(580, 404, a, q);
    b.rotate(116);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 13,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 13,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 13,
    });
    b = new CGfxButton(560, 438, a, q);
    b.rotate(126.2);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 36,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 36,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 36,
    });
    b = new CGfxButton(534, 466, a, q);
    b.rotate(135.7);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 11,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 11,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 11,
    });
    b = new CGfxButton(504, 490, a, q);
    b.rotate(145.2);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 30,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 30,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 30,
    });
    b = new CGfxButton(471, 510, a, q);
    b.rotate(154.9);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 8,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 8,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 8,
    });
    b = new CGfxButton(434, 522, a, q);
    b.rotate(165.2);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 23,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 23,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 23,
    });
    b = new CGfxButton(395, 529, a, q);
    b.rotate(174.9);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 10,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 10,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 10,
    });
    b = new CGfxButton(357, 529, a, q);
    b.rotate(-176.5);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 5,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 5,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 5,
    });
    b = new CGfxButton(319, 522, a, q);
    b.rotate(-166);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 24,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 24,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 24,
    });
    b = new CGfxButton(282, 509, a, q);
    b.rotate(-156);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 16,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 16,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 16,
    });
    b = new CGfxButton(247, 491, a, q);
    b.rotate(-146);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 33,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 33,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 33,
    });
    b = new CGfxButton(217, 466, a, q);
    b.rotate(-137);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 1,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 1,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 1,
    });
    b = new CGfxButton(193, 437, a, q);
    b.rotate(-128);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 20,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 20,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 20,
    });
    b = new CGfxButton(172, 404, a, q);
    b.rotate(-118.4);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 14,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 14,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 14,
    });
    b = new CGfxButton(158, 367, a, q);
    b.rotate(-105.7);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 31,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 31,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 31,
    });
    b = new CGfxButton(149, 330, a, q);
    b.rotate(-95.5);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 9,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 9,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 9,
    });
    b = new CGfxButton(148, 291, a, q);
    b.rotate(-88.2);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 22,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 22,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 22,
    });
    b = new CGfxButton(154, 252, a, q);
    b.rotate(-78);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 18,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 18,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 18,
    });
    b = new CGfxButton(164, 216, a, q);
    b.rotate(-67.8);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 29,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 29,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 29,
    });
    b = new CGfxButton(181, 181, a, q);
    b.rotate(-57.6);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 7,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 7,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 7,
    });
    b = new CGfxButton(205, 150, a, q);
    b.rotate(-48.8);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 28,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 28,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 28,
    });
    b = new CGfxButton(233, 124, a, q);
    b.rotate(-39.1);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 12,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 12,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 12,
    });
    b = new CGfxButton(265, 102, a, q);
    b.rotate(-29.9);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 35,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 35,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 35,
    });
    b = new CGfxButton(300, 86, a, q);
    b.rotate(-19.2);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 3,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 3,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 3,
    });
    b = new CGfxButton(338, 76, a, q);
    b.rotate(-8.5);
    b.addEventListenerWithParams(ON_MOUSE_UP, this._onNeighborRelease, this, {
      index: 26,
    });
    b.addEventListenerWithParams(ON_MOUSE_OVER, this._onNeighborOver, this, {
      index: 26,
    });
    b.addEventListenerWithParams(ON_MOUSE_OUT, this._onNeighborOut, this, {
      index: 26,
    });
    this._initNeighbors();
    x = new CGfxButton(717, 38, s_oSpriteLibrary.getSprite("but_exit"), q);
    x.addEventListener(ON_MOUSE_UP, this.onExit, this);
    this.reset();
    this.hide();
  };
  this.unload = function () {
    n.off("click", function () {});
    for (var a = 0; a < w.getNumChildren(); a++)
      if (b instanceof CGfxButton) {
        var b = w.getChildAt(a);
        b.unload();
      }
  };
  this.showPanel = function (a, b, c) {
    d = a;
    f = b;
    h = c;
    l = [];
    v.text = b + TEXT_CURRENCY;
    w.visible = !0;
  };
  this.hide = function () {
    w.visible = !1;
  };
  this._initNeighbors = function () {
    b = [
      [3, 26, 0, 32, 15],
      [16, 33, 1, 20, 14],
      [4, 21, 2, 25, 17],
      [12, 35, 3, 26, 0],
      [15, 19, 4, 21, 2],
      [23, 10, 5, 24, 16],
      [17, 34, 6, 27, 13],
      [18, 29, 7, 28, 12],
      [11, 30, 8, 23, 10],
      [14, 31, 9, 22, 18],
      [8, 23, 10, 5, 24],
      [13, 36, 11, 30, 8],
      [7, 28, 12, 35, 3],
      [6, 27, 13, 36, 11],
      [1, 20, 14, 31, 9],
      [0, 32, 15, 19, 4],
      [5, 24, 16, 33, 1],
      [2, 25, 17, 34, 6],
      [9, 22, 18, 29, 7],
      [32, 15, 19, 4, 21],
      [33, 1, 20, 14, 31],
      [19, 4, 21, 2, 25],
      [31, 9, 22, 18, 29],
      [30, 8, 23, 10, 5],
      [10, 5, 24, 16, 33],
      [21, 2, 25, 17, 34],
      [35, 3, 26, 0, 32],
      [34, 6, 27, 13, 36],
      [29, 7, 28, 12, 35],
      [22, 18, 29, 7, 28],
      [36, 11, 30, 8, 23],
      [20, 14, 31, 9, 22],
      [26, 0, 32, 15, 19],
      [24, 16, 33, 1, 20],
      [25, 17, 34, 6, 27],
      [28, 12, 35, 3, 26],
      [27, 13, 36, 11, 30],
    ];
    u = [];
    u.oAttach_0 = new createjs.Point(377, 70);
    u.oAttach_32 = new createjs.Point(416, 74);
    u.oAttach_15 = new createjs.Point(454, 85);
    u.oAttach_19 = new createjs.Point(492, 101);
    u.oAttach_4 = new createjs.Point(523, 122);
    u.oAttach_21 = new createjs.Point(550, 150);
    u.oAttach_2 = new createjs.Point(572, 180);
    u.oAttach_25 = new createjs.Point(588, 216);
    u.oAttach_17 = new createjs.Point(603, 255);
    u.oAttach_34 = new createjs.Point(607, 294);
    u.oAttach_6 = new createjs.Point(605, 330);
    u.oAttach_27 = new createjs.Point(600, 370);
    u.oAttach_13 = new createjs.Point(585, 408);
    u.oAttach_36 = new createjs.Point(565, 442);
    u.oAttach_11 = new createjs.Point(538, 472);
    u.oAttach_30 = new createjs.Point(506, 494);
    u.oAttach_8 = new createjs.Point(475, 515);
    u.oAttach_23 = new createjs.Point(435, 526);
    u.oAttach_10 = new createjs.Point(398, 536);
    u.oAttach_5 = new createjs.Point(357, 534);
    u.oAttach_24 = new createjs.Point(318, 526);
    u.oAttach_16 = new createjs.Point(282, 513);
    u.oAttach_33 = new createjs.Point(245, 494);
    u.oAttach_1 = new createjs.Point(218, 468);
    u.oAttach_20 = new createjs.Point(190, 440);
    u.oAttach_14 = new createjs.Point(173, 406);
    u.oAttach_31 = new createjs.Point(156, 368);
    u.oAttach_9 = new createjs.Point(150, 330);
    u.oAttach_22 = new createjs.Point(148, 292);
    u.oAttach_18 = new createjs.Point(153, 252);
    u.oAttach_29 = new createjs.Point(165, 215);
    u.oAttach_7 = new createjs.Point(182, 183);
    u.oAttach_28 = new createjs.Point(208, 150);
    u.oAttach_12 = new createjs.Point(233, 123);
    u.oAttach_35 = new createjs.Point(266, 100);
    u.oAttach_3 = new createjs.Point(302, 86);
    u.oAttach_26 = new createjs.Point(339, 76);
  };
  this.reset = function () {
    m = [];
    for (var a = 0; a < NUMBERS_TO_BET; a++) m[a] = 0;
    if (k) for (a = 0; a < k.length; a++) t.removeChild(k[a].getSprite());
    k = [];
    g = [];
    h = 0;
  };
  this.clearLastBet = function () {
    if (0 !== c.length) {
      var a = c.pop(),
        b = s_oGameSettings.getFicheValues(d);
      m[a] -= b;
      m[a] = roundDecimal(m[a], 1);
      b = g[a];
      0 < b.length
        ? t.removeChild(b[b.length - 1].getSprite())
        : ((c = []), (m[a] = 0));
      k.pop();
      g[a].pop();
      if (0 === c.length)
        for (k = [], g = [], a = 0; a < NUMBERS_TO_BET; a++) m[a] = 0;
      h = 0;
    }
  };
  this.onExit = function () {
    this.hide();
  };
  this.addFicheOnNeighborTable = function () {
    var e = s_oGameSettings.getFicheValues(d);
    if (h + 5 * e > f) s_oGame.showMsgBox(TEXT_ERROR_NO_MONEY_MSG);
    else if (h + 5 * e > MAX_BET)
      s_oGame.showMsgBox(TEXT_ERROR_MAX_BET_REACHED);
    else {
      h += 5 * e;
      h = roundDecimal(h, 1);
      var k = f - h;
      k = roundDecimal(k, 1);
      v.text = k + TEXT_CURRENCY;
      playSound("chip", 1, !1);
      m[a] += e;
      m[a] = roundDecimal(m[a], 1);
      e = s_oGameSettings.generateFichesPileByIndex(m[a]);
      e.sort();
      this._removeFichesPile(g[a]);
      g[a] = [];
      k = u["oAttach_" + a].x;
      for (var n = u["oAttach_" + a].y, q = 0; q < e.length; q++)
        this._attachFichesPile(e[q], a, k, n), (n -= 5);
      l.push(a);
      s_oGame._onShowBetOnTableFromNeighbors(
        {
          button: "oBetNeighbors",
          numbers: b[a],
          bet_mult: 5,
          bet_win: 7.2,
          value: d,
          num_fiches: 5,
          num_clicked: a,
        },
        !1
      );
      c.push(a);
    }
  };
  this._attachFichesPile = function (a, b, c, d) {
    a = new CFiche(c, d, a, t, 0.7);
    g[b].push(a);
    k.push(a);
  };
  this._removeFichesPile = function (a) {
    for (var b in a) t.removeChild(a[b].getSprite());
  };
  this.searchForNumClicked = function () {
    for (var b = 0; b < l.length; b++) if (l[b] === a) return !0;
    return !1;
  };
  this._onNeighborRelease = function (b) {
    a = b.index;
    this.addFicheOnNeighborTable();
  };
  this.rebet = function (b) {
    a = b;
    this.addFicheOnNeighborTable();
  };
  this._onNeighborOver = function (a) {
    a = b[a.index];
    for (var c = 0; c < a.length; c++) e["oEnlight_" + a[c]].show();
  };
  this._onNeighborOut = function (a) {
    a = b[a.index];
    for (var c = 0; c < a.length; c++) e["oEnlight_" + a[c]].hide();
  };
  this.isVisible = function () {
    return w.visible;
  };
  this._init();
}

function CGameOver() {
  var a, d, f;
  this._init = function () {
    f = new createjs.Container();
    s_oStage.addChild(f);
    var h = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
    f.addChild(h);
    new CTLText(
      f,
      CANVAS_WIDTH / 2 - 250,
      230,
      500,
      80,
      40,
      "center",
      "#fff",
      FONT1,
      1,
      2,
      2,
      TEXT_NO_MONEY,
      !0,
      !0,
      !0,
      !1
    );
    new CTLText(
      f,
      CANVAS_WIDTH / 2 - 250,
      370,
      500,
      40,
      40,
      "center",
      "#fff",
      FONT1,
      1,
      2,
      2,
      TEXT_RECHARGE_MSG,
      !0,
      !0,
      !0,
      !1
    );
    a = new CTextButton(
      CANVAS_WIDTH / 2 + 170,
      510,
      s_oSpriteLibrary.getSprite("but_bg"),
      TEXT_RECHARGE,
      FONT1,
      "#fff",
      14,
      f
    );
    a.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
    d = new CTextButton(
      CANVAS_WIDTH / 2 - 170,
      510,
      s_oSpriteLibrary.getSprite("but_bg"),
      TEXT_EXIT,
      FONT1,
      "#fff",
      14,
      f
    );
    d.addEventListener(ON_MOUSE_UP, this._onExit, this);
    this.hide();
  };
  this.unload = function () {
    a.unload();
    d.unload();
  };
  this.show = function () {
    f.visible = !0;
  };
  this.hide = function () {
    f.visible = !1;
  };
  this._onRecharge = function () {
    s_oGame.onRecharge();
  };
  this._onExit = function () {
    s_oGame.onExit();
  };
  this._init();
}

function CCreditsPanel() {
  var a, d, f, h, b, m, k, e, g;
  this._init = function () {
    g = new createjs.Container();
    s_oStage.addChild(g);
    var l = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
    g.addChild(l);
    b = new createjs.Shape();
    b.graphics
      .beginFill("rgba(0,0,0,0.7)")
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    g.addChild(b);
    l = s_oSpriteLibrary.getSprite("msg_box");
    d = createBitmap(l);
    d.x = CANVAS_WIDTH / 2;
    d.y = CANVAS_HEIGHT / 2;
    d.regX = l.width / 2;
    d.regY = l.height / 2;
    g.addChild(d);
    m = new createjs.Shape();
    m.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    m.alpha = 0.01;
    k = m.on("click", this._onLogoButRelease);
    g.addChild(m);
    l = s_oSpriteLibrary.getSprite("but_exit");
    a = CANVAS_WIDTH / 2 + 234;
    f = new CGfxButton(a, 254, l, g);
    f.addEventListener(ON_MOUSE_UP, this.unload, this);
    h = new createjs.Text(TEXT_CREDITS_DEVELOPED, "26px Arial", "#ffffff");
    h.x = CANVAS_WIDTH / 2;
    h.y = 300;
    h.textAlign = "center";
    g.addChild(h);
    l = s_oSpriteLibrary.getSprite("logo_credits");
    var c = createBitmap(l);
    c.regX = l.width / 2;
    c.regY = l.height / 2;
    c.x = CANVAS_WIDTH / 2;
    c.y = CANVAS_HEIGHT / 2;
    g.addChild(c);
    e = new createjs.Text(TEXT_LINK, "24px Arial", "#ffffff");
    e.x = CANVAS_WIDTH / 2;
    e.y = 440;
    e.textAlign = "center";
    g.addChild(e);
  };
  this.unload = function () {
    m.off("click", k);
    f.unload();
    f = null;
    s_oStage.removeChild(g);
  };
  this._onLogoButRelease = function () {
    window.open("http://www.codethislab.com/index.php?&l=en");
  };
  this._init();
}

function CHistory(a, d, f) {
  var h, b;
  this._init = function (a, d) {
    b = new createjs.Container();
    b.x = a;
    b.y = d;
    m.addChild(b);
    var e = s_oSpriteLibrary.getSprite("history_bg"),
      f = createBitmap(e);
    b.addChild(f);
    f = new createjs.Text(TEXT_HISTORY, "12px " + FONT1, "#fff");
    f.textAlign = "center";
    f.x = e.width / 2;
    f.y = 5;
    b.addChild(f);
    this._initNumExtracted();
  };
  this._initNumExtracted = function () {
    h = [];
    for (var a = 24, d = 0; d < ROW_HISTORY; d++) {
      var f = new CHistoryRow(5, a, b);
      h[d] = f;
      a += 22;
    }
  };
  this.setPosition = function (a, d) {
    b.x = a;
    b.y = d;
  };
  this.showBlack = function (a, b) {
    h[a].showBlack(b);
  };
  this.showRed = function (a, b) {
    h[a].showRed(b);
  };
  this.showGreen = function (a, b) {
    h[a].showGreen(b);
  };
  var m = f;
  this._init(a, d);
}
var EASE_LINEAR = 0,
  EASE_CUBIC_IN = 1,
  EASE_QUART_BACKIN = 2,
  EASE_BACKIN = 3,
  EASE_SIN_IN = 4,
  EASE_QUAD_IN = 5,
  EASE_CUBIC_OUT = 6,
  EASE_ELASTIC_OUT = 7,
  EASE_BACKOUT = 8,
  EASE_QUINT_OUT = 9,
  EASE_CUBIC_INOUT = 10;

function CRollingTextController(a, d, f, h, b, m, k) {
  var e,
    g,
    l,
    c,
    u,
    x,
    t,
    v,
    n,
    q,
    w,
    p = [],
    A,
    E;
  this._init = function (a, b, c, d, e, f, g) {
    q = [];
    w = [];
    u = e;
    this.setUpdateInfo(c, d);
    v = f;
    n = g;
    A = a;
    E = b;
  };
  this.unload = function () {
    clearInterval(t);
  };
  this.setUpdateInfo = function (a, b) {
    l = parseFloat(a);
    c = l + b;
    e = 0;
    g = Math.round(u / FPS);
    x = 0;
    var d = this;
    t = setInterval(function () {
      d.update();
    }, FPS_TIME);
  };
  this.addEventListener = function (a, b, c) {
    q[a] = b;
    w[a] = c;
  };
  this.addRollingListener = function (a, b, c) {
    q[ON_CONTROLLER_ROLL] = a;
    w[ON_CONTROLLER_ROLL] = b;
    p = [];
    for (a = 0; a < c.length; a++)
      p[a] = {
        step: c[a],
        flag: !1,
      };
  };
  this.increaseValue = function (a) {
    x = a;
  };
  this.getTarget = function () {
    return A;
  };
  this.update = function () {
    e++;
    if (e > g)
      (e = 0),
        (A.text = c.toFixed(2) + n),
        null !== E && (E.text = c.toFixed(2) + n),
        clearInterval(t),
        null !== q[ON_CONTROLLER_END] &&
          void 0 !== q[ON_CONTROLLER_END] &&
          q[ON_CONTROLLER_END].call(w[ON_CONTROLLER_END], this),
        0 < x
          ? this.setUpdateInfo(x)
          : null !== q[ON_CONTROLLER_REMOVE] &&
            void 0 !== q[ON_CONTROLLER_REMOVE] &&
            q[ON_CONTROLLER_REMOVE].call(w[ON_CONTROLLER_REMOVE], this);
    else {
      switch (v) {
        case EASE_BACKIN:
          var a = s_oTweenController.easeInBack(e, 0, 1, g);
          break;
        case EASE_BACKOUT:
          a = s_oTweenController.easeOutBack(e, 0, 1, g);
          break;
        case EASE_CUBIC_IN:
          a = s_oTweenController.easeInCubic(e, 0, 1, g);
          break;
        case EASE_CUBIC_OUT:
          a = s_oTweenController.easeOutCubic(e, 0, 1, g);
          break;
        case EASE_ELASTIC_OUT:
          a = s_oTweenController.easeOutElastic(e, 0, 1, g);
          break;
        case EASE_LINEAR:
          a = s_oTweenController.easeLinear(e, 0, 1, g);
          break;
        case EASE_QUART_BACKIN:
          a = s_oTweenController.easeBackInQuart(e, 0, 1, g);
          break;
        default:
          a = s_oTweenController.easeLinear(e, 0, 1, g);
      }
      a = s_oTweenController.tweenValue(l, c, a);
      for (var b = 0; b < p.length; b++)
        a > p[b].step &&
          !p[b].flag &&
          ((p[b].flag = !0),
          null !== q[ON_CONTROLLER_ROLL] &&
            q[ON_CONTROLLER_ROLL].call(w[ON_CONTROLLER_ROLL], b));
      A.text = a.toFixed(2) + n;
      null !== E && (E.text = a.toFixed(2) + n);
    }
  };
  this._init(a, d, f, h, b, m, k);
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
  setShadow: function (a, d, f, h) {
    null !== this._oText &&
      (this._oText.shadow = new createjs.Shadow(a, d, f, h));
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

function CTLText(a, d, f, h, b, m, k, e, g, l, c, u, x, t, v, n, q) {
  this._oContainer = a;
  this._x = d;
  this._y = f;
  this._iWidth = h;
  this._iHeight = b;
  this._bMultiline = n;
  this._iFontSize = m;
  this._szAlign = k;
  this._szColor = e;
  this._szFont = g;
  this._iPaddingH = c;
  this._iPaddingV = u;
  this._bVerticalAlign = v;
  this._bFitText = t;
  this._bDebug = q;
  this._oDebugShape = null;
  this._fLineHeightFactor = l;
  this._oText = null;
  x && this.__createText(x);
}

function CSpinBut(a, d, f, h, b, m, k, e) {
  var g, l, c, u, x, t, v, n, q, w;
  this._init = function (a, b, d, f, h, k, m) {
    g = !1;
    l = 1;
    c = [];
    u = [];
    n = new createjs.Container();
    n.x = a;
    n.y = b;
    n.regX = d.width / 2;
    n.regY = d.height / 2;
    s_bMobile || (n.cursor = "pointer");
    e.addChild(n);
    w = createBitmap(d);
    n.addChild(w);
    q = new CTLText(
      n,
      80,
      10,
      d.width - 90,
      d.height - 20,
      m,
      "center",
      k,
      h,
      1,
      0,
      0,
      f,
      !0,
      !0,
      !0,
      !1
    );
    this._initListener();
  };
  this.unload = function () {
    n.off("mousedown", x);
    n.off("pressup", t);
    e.removeChild(n);
  };
  this.setVisible = function (a) {
    n.visible = a;
  };
  this.setScale = function (a) {
    l = n.scaleX = n.scaleY = a;
  };
  this.enable = function () {
    g = !1;
  };
  this.disable = function () {
    g = !0;
  };
  this._initListener = function () {
    x = n.on("mousedown", this.buttonDown);
    t = n.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (a, b, d) {
    c[a] = b;
    u[a] = d;
  };
  this.addEventListenerWithParams = function (a, b, d, e) {
    c[a] = b;
    u[a] = d;
    v = e;
  };
  this.buttonRelease = function () {
    g ||
      (playSound("click", 1, !1),
      (n.scaleX = l),
      (n.scaleY = l),
      c[ON_MOUSE_UP] && c[ON_MOUSE_UP].call(u[ON_MOUSE_UP], v));
  };
  this.buttonDown = function () {
    g ||
      ((n.scaleX = 0.9 * l),
      (n.scaleY = 0.9 * l),
      c[ON_MOUSE_DOWN] && c[ON_MOUSE_DOWN].call(u[ON_MOUSE_DOWN]));
  };
  this.setPosition = function (a, b) {
    n.x = a;
    n.y = b;
  };
  this.tweenPosition = function (a, b, c, d, e, f, g) {
    createjs.Tween.get(n)
      .wait(d)
      .to(
        {
          x: a,
          y: b,
        },
        c,
        e
      )
      .call(function () {
        void 0 !== f && f.call(g);
      });
  };
  this.changeText = function (a) {
    q.refreshText(a);
  };
  this.setX = function (a) {
    n.x = a;
  };
  this.setY = function (a) {
    n.y = a;
  };
  this.getButtonImage = function () {
    return n;
  };
  this.getX = function () {
    return n.x;
  };
  this.getY = function () {
    return n.y;
  };
  this.getSprite = function () {
    return n;
  };
  this.getScale = function () {
    return n.scaleX;
  };
  this._init(a, d, f, h, b, m, k);
}

function extractHostname(a) {
  a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
  a = a.split(":")[0];
  return (a = a.split("?")[0]);
}

function extractRootDomain(a) {
  a = extractHostname(a);
  var d = a.split("."),
    f = d.length;
  2 < f && (a = d[f - 2] + "." + d[f - 1]);
  return a;
}
var getClosestTop = function () {
    var a = window,
      d = !1;
    try {
      for (; a.parent.document !== a.document; )
        if (a.parent.document) a = a.parent;
        else {
          d = !0;
          break;
        }
    } catch (f) {
      d = !0;
    }
    return {
      topFrame: a,
      err: d,
    };
  },
  getBestPageUrl = function (a) {
    var d = a.topFrame,
      f = "";
    if (a.err)
      try {
        try {
          f = window.top.location.href;
        } catch (b) {
          var h = window.location.ancestorOrigins;
          f = h[h.length - 1];
        }
      } catch (b) {
        f = d.document.referrer;
      }
    else f = d.location.href;
    return f;
  },
  TOPFRAMEOBJ = getClosestTop(),
  PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);

function seekAndDestroy() {
  for (
    var a = extractRootDomain(PAGE_URL),
      d = [
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
      f = 0;
    f < d.length;
    f++
  )
    if (d[f] === a) return !0;
  return !1;
}
