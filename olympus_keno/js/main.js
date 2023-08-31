!(function () {
  var a =
      "undefined" != typeof window && void 0 !== window.document
        ? window.document
        : {},
    b = "undefined" != typeof module && module.exports,
    c = (function () {
      for (
        var g,
          h = [
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
          k = 0,
          n = h.length,
          p = {};
        k < n;
        k++
      )
        if ((g = h[k]) && g[1] in a) {
          for (k = 0; k < g.length; k++) p[h[0][k]] = g[k];
          return p;
        }
      return !1;
    })(),
    e = {
      change: c.fullscreenchange,
      error: c.fullscreenerror,
    },
    d = {
      request: function (g) {
        return new Promise(
          function (h, k) {
            var n = function () {
              this.off("change", n);
              h();
            }.bind(this);
            this.on("change", n);
            g = g || a.documentElement;
            Promise.resolve(g[c.requestFullscreen]())["catch"](k);
          }.bind(this)
        );
      },
      exit: function () {
        return new Promise(
          function (g, h) {
            if (this.isFullscreen) {
              var k = function () {
                this.off("change", k);
                g();
              }.bind(this);
              this.on("change", k);
              Promise.resolve(a[c.exitFullscreen]())["catch"](h);
            } else g();
          }.bind(this)
        );
      },
      toggle: function (g) {
        return this.isFullscreen ? this.exit() : this.request(g);
      },
      onchange: function (g) {
        this.on("change", g);
      },
      onerror: function (g) {
        this.on("error", g);
      },
      on: function (g, h) {
        var k = e[g];
        k && a.addEventListener(k, h, !1);
      },
      off: function (g, h) {
        var k = e[g];
        k && a.removeEventListener(k, h, !1);
      },
      raw: c,
    };
  c
    ? (Object.defineProperties(d, {
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
      b ? (module.exports = d) : (window.screenfull = d))
    : b
    ? (module.exports = {
        isEnabled: !1,
      })
    : (window.screenfull = {
        isEnabled: !1,
      });
})();
(function () {
  function a(f) {
    f = String(f);
    return f.charAt(0).toUpperCase() + f.slice(1);
  }

  function b(f, A) {
    var x = -1,
      t = f ? f.length : 0;
    if ("number" == typeof t && -1 < t && t <= z)
      for (; ++x < t; ) A(f[x], x, f);
    else e(f, A);
  }

  function c(f) {
    f = String(f).replace(/^ +| +$/g, "");
    return /^(?:webOS|i(?:OS|P))/.test(f) ? f : a(f);
  }

  function e(f, A) {
    for (var x in f) l.call(f, x) && A(f[x], x, f);
  }

  function d(f) {
    return null == f ? a(f) : r.call(f).slice(8, -1);
  }

  function g(f, A) {
    var x = null != f ? typeof f[A] : "number";
    return (
      !/^(?:boolean|number|string|undefined)$/.test(x) &&
      ("object" == x ? !!f[A] : !0)
    );
  }

  function h(f) {
    return String(f).replace(/([ -])(?!$)/g, "$1?");
  }

  function k(f, A) {
    var x = null;
    b(f, function (t, y) {
      x = A(x, t, y, f);
    });
    return x;
  }

  function n(f) {
    function A(Q) {
      return k(Q, function (K, J) {
        var S = J.pattern || h(J);
        !K &&
          (K =
            RegExp("\\b" + S + " *\\d+[.\\w_]*", "i").exec(f) ||
            RegExp("\\b" + S + " *\\w+-[\\w]*", "i").exec(f) ||
            RegExp(
              "\\b" + S + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)",
              "i"
            ).exec(f)) &&
          ((K = String(
            J.label && !RegExp(S, "i").test(J.label) ? J.label : K
          ).split("/"))[1] &&
            !/[\d.]+/.test(K[0]) &&
            (K[0] += " " + K[1]),
          (J = J.label || J),
          (K = c(
            K[0]
              .replace(RegExp(S, "i"), J)
              .replace(RegExp("; *(?:" + J + "[_-])?", "i"), " ")
              .replace(RegExp("(" + J + ")[-_.]?(\\w)", "i"), "$1 $2")
          )));
        return K;
      });
    }

    function x(Q) {
      return k(Q, function (K, J) {
        return (
          K ||
          (RegExp(
            J + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)",
            "i"
          ).exec(f) || 0)[1] ||
          null
        );
      });
    }
    var t = B,
      y = f && "object" == typeof f && "String" != d(f);
    y && ((t = f), (f = null));
    var L = t.navigator || {},
      C = L.userAgent || "";
    f || (f = C);
    var V = y
        ? !!L.likeChrome
        : /\bChrome\b/.test(f) && !/internal|\n/i.test(r.toString()),
      R = y ? "Object" : "ScriptBridgingProxyObject",
      O = y ? "Object" : "Environment",
      N = y && t.java ? "JavaPackage" : d(t.java),
      W = y ? "Object" : "RuntimeObject";
    O = (N = /\bJava/.test(N) && t.java) && d(t.environment) == O;
    var Z = N ? "a" : "\u03b1",
      D = N ? "b" : "\u03b2",
      G = t.document || {},
      M = t.operamini || t.opera,
      P = w.test((P = y && M ? M["[[Class]]"] : d(M))) ? P : (M = null),
      m,
      X = f;
    y = [];
    var aa = null,
      Y = f == C;
    C = Y && M && "function" == typeof M.version && M.version();
    var H = (function (Q) {
        return k(Q, function (K, J) {
          return (
            K ||
            (RegExp("\\b" + (J.pattern || h(J)) + "\\b", "i").exec(f) &&
              (J.label || J))
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
      E = (function (Q) {
        return k(Q, function (K, J) {
          return (
            K ||
            (RegExp("\\b" + (J.pattern || h(J)) + "\\b", "i").exec(f) &&
              (J.label || J))
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
      I = A([
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
      T = (function (Q) {
        return k(Q, function (K, J, S) {
          return (
            K ||
            ((J[I] ||
              J[/^[a-z]+(?: +[a-z]+\b)*/i.exec(I)] ||
              RegExp("\\b" + h(S) + "(?:\\b|\\w*\\d)", "i").exec(f)) &&
              S)
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
      F = (function (Q) {
        return k(Q, function (K, J) {
          var S = J.pattern || h(J);
          if (
            !K &&
            (K = RegExp("\\b" + S + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(f))
          ) {
            var U = K,
              ba = J.label || J,
              ca = {
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
            S &&
              ba &&
              /^Win/i.test(U) &&
              !/^Windows Phone /i.test(U) &&
              (ca = ca[/[\d.]+$/.exec(U)]) &&
              (U = "Windows " + ca);
            U = String(U);
            S && ba && (U = U.replace(RegExp(S, "i"), ba));
            K = U = c(
              U.replace(/ ce$/i, " CE")
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
          return K;
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
    H && (H = [H]);
    T && !I && (I = A([T]));
    if ((m = /\bGoogle TV\b/.exec(I))) I = m[0];
    /\bSimulator\b/i.test(f) && (I = (I ? I + " " : "") + "Simulator");
    "Opera Mini" == E &&
      /\bOPiOS\b/.test(f) &&
      y.push("running in Turbo/Uncompressed mode");
    "IE" == E && /\blike iPhone OS\b/.test(f)
      ? ((m = n(f.replace(/like iPhone OS/, ""))),
        (T = m.manufacturer),
        (I = m.product))
      : /^iP/.test(I)
      ? (E || (E = "Safari"),
        (F =
          "iOS" +
          ((m = / OS ([\d_]+)/i.exec(f)) ? " " + m[1].replace(/_/g, ".") : "")))
      : "Konqueror" != E || /buntu/i.test(F)
      ? (T &&
          "Google" != T &&
          ((/Chrome/.test(E) && !/\bMobile Safari\b/i.test(f)) ||
            /\bVita\b/.test(I))) ||
        (/\bAndroid\b/.test(F) && /^Chrome/.test(E) && /\bVersion\//i.test(f))
        ? ((E = "Android Browser"), (F = /\bAndroid\b/.test(F) ? F : "Android"))
        : "Silk" == E
        ? (/\bMobi/i.test(f) || ((F = "Android"), y.unshift("desktop mode")),
          /Accelerated *= *true/i.test(f) && y.unshift("accelerated"))
        : "PaleMoon" == E && (m = /\bFirefox\/([\d.]+)\b/.exec(f))
        ? y.push("identifying as Firefox " + m[1])
        : "Firefox" == E && (m = /\b(Mobile|Tablet|TV)\b/i.exec(f))
        ? (F || (F = "Firefox OS"), I || (I = m[1]))
        : !E ||
          (m = !/\bMinefield\b/i.test(f) && /\b(?:Firefox|Safari)\b/.exec(E))
        ? (E &&
            !I &&
            /[\/,]|^[^(]+?\)/.test(f.slice(f.indexOf(m + "/") + 8)) &&
            (E = null),
          (m = I || T || F) &&
            (I || T || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(F)) &&
            (E =
              /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(F) ? F : m) +
              " Browser"))
        : "Electron" == E &&
          (m = (/\bChrome\/([\d.]+)\b/.exec(f) || 0)[1]) &&
          y.push("Chromium " + m)
      : (F = "Kubuntu");
    C ||
      (C = x([
        "(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))",
        "Version",
        h(E),
        "(?:Firefox|Minefield|NetFront)",
      ]));
    if (
      (m =
        ("iCab" == H && 3 < parseFloat(C) && "WebKit") ||
        (/\bOpera\b/.test(E) && (/\bOPR\b/.test(f) ? "Blink" : "Presto")) ||
        (/\b(?:Midori|Nook|Safari)\b/i.test(f) &&
          !/^(?:Trident|EdgeHTML)$/.test(H) &&
          "WebKit") ||
        (!H && /\bMSIE\b/i.test(f) && ("Mac OS" == F ? "Tasman" : "Trident")) ||
        ("WebKit" == H && /\bPlayStation\b(?! Vita\b)/i.test(E) && "NetFront"))
    )
      H = [m];
    "IE" == E && (m = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(f) || 0)[1])
      ? ((E += " Mobile"),
        (F = "Windows Phone " + (/\+$/.test(m) ? m : m + ".x")),
        y.unshift("desktop mode"))
      : /\bWPDesktop\b/i.test(f)
      ? ((E = "IE Mobile"),
        (F = "Windows Phone 8.x"),
        y.unshift("desktop mode"),
        C || (C = (/\brv:([\d.]+)/.exec(f) || 0)[1]))
      : "IE" != E &&
        "Trident" == H &&
        (m = /\brv:([\d.]+)/.exec(f)) &&
        (E && y.push("identifying as " + E + (C ? " " + C : "")),
        (E = "IE"),
        (C = m[1]));
    if (Y) {
      if (g(t, "global"))
        if (
          (N &&
            ((m = N.lang.System),
            (X = m.getProperty("os.arch")),
            (F =
              F ||
              m.getProperty("os.name") + " " + m.getProperty("os.version"))),
          O)
        ) {
          try {
            (C = t.require("ringo/engine").version.join(".")), (E = "RingoJS");
          } catch (Q) {
            (m = t.system) &&
              m.global.system == t.system &&
              ((E = "Narwhal"), F || (F = m[0].os || null));
          }
          E || (E = "Rhino");
        } else
          "object" == typeof t.process &&
            !t.process.browser &&
            (m = t.process) &&
            ("object" == typeof m.versions &&
              ("string" == typeof m.versions.electron
                ? (y.push("Node " + m.versions.node),
                  (E = "Electron"),
                  (C = m.versions.electron))
                : "string" == typeof m.versions.nw &&
                  (y.push("Chromium " + C, "Node " + m.versions.node),
                  (E = "NW.js"),
                  (C = m.versions.nw))),
            E ||
              ((E = "Node.js"),
              (X = m.arch),
              (F = m.platform),
              (C = (C = /[\d.]+/.exec(m.version)) ? C[0] : null)));
      else
        d((m = t.runtime)) == R
          ? ((E = "Adobe AIR"), (F = m.flash.system.Capabilities.os))
          : d((m = t.phantom)) == W
          ? ((E = "PhantomJS"),
            (C =
              (m = m.version || null) &&
              m.major + "." + m.minor + "." + m.patch))
          : "number" == typeof G.documentMode &&
            (m = /\bTrident\/(\d+)/i.exec(f))
          ? ((C = [C, G.documentMode]),
            (m = +m[1] + 4) != C[1] &&
              (y.push("IE " + C[1] + " mode"), H && (H[1] = ""), (C[1] = m)),
            (C = "IE" == E ? String(C[1].toFixed(1)) : C[0]))
          : "number" == typeof G.documentMode &&
            /^(?:Chrome|Firefox)\b/.test(E) &&
            (y.push("masking as " + E + " " + C),
            (E = "IE"),
            (C = "11.0"),
            (H = ["Trident"]),
            (F = "Windows"));
      F = F && c(F);
    }
    C &&
      (m =
        /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(C) ||
        /(?:alpha|beta)(?: ?\d)?/i.exec(f + ";" + (Y && L.appMinorVersion)) ||
        (/\bMinefield\b/i.test(f) && "a")) &&
      ((aa = /b/i.test(m) ? "beta" : "alpha"),
      (C =
        C.replace(RegExp(m + "\\+?$"), "") +
        ("beta" == aa ? D : Z) +
        (/\d+\+?/.exec(m) || "")));
    if (
      "Fennec" == E ||
      ("Firefox" == E && /\b(?:Android|Firefox OS)\b/.test(F))
    )
      E = "Firefox Mobile";
    else if ("Maxthon" == E && C) C = C.replace(/\.[\d.]+/, ".x");
    else if (/\bXbox\b/i.test(I))
      "Xbox 360" == I && (F = null),
        "Xbox 360" == I && /\bIEMobile\b/.test(f) && y.unshift("mobile mode");
    else if (
      (!/^(?:Chrome|IE|Opera)$/.test(E) &&
        (!E || I || /Browser|Mobi/.test(E))) ||
      ("Windows CE" != F && !/Mobi/i.test(f))
    )
      if ("IE" == E && Y)
        try {
          null === t.external && y.unshift("platform preview");
        } catch (Q) {
          y.unshift("embedded");
        }
      else
        (/\bBlackBerry\b/.test(I) || /\bBB10\b/.test(f)) &&
        (m =
          (RegExp(I.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(f) ||
            0)[1] || C)
          ? ((m = [m, /BB10/.test(f)]),
            (F =
              (m[1] ? ((I = null), (T = "BlackBerry")) : "Device Software") +
              " " +
              m[0]),
            (C = null))
          : this != e &&
            "Wii" != I &&
            ((Y && M) ||
              (/Opera/.test(E) && /\b(?:MSIE|Firefox)\b/i.test(f)) ||
              ("Firefox" == E && /\bOS X (?:\d+\.){2,}/.test(F)) ||
              ("IE" == E &&
                ((F && !/^Win/.test(F) && 5.5 < C) ||
                  (/\bWindows XP\b/.test(F) && 8 < C) ||
                  (8 == C && !/\bTrident\b/.test(f))))) &&
            !w.test((m = n.call(e, f.replace(w, "") + ";"))) &&
            m.name &&
            ((m = "ing as " + m.name + ((m = m.version) ? " " + m : "")),
            w.test(E)
              ? (/\bIE\b/.test(m) && "Mac OS" == F && (F = null),
                (m = "identify" + m))
              : ((m = "mask" + m),
                (E = P ? c(P.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera"),
                /\bIE\b/.test(m) && (F = null),
                Y || (C = null)),
            (H = ["Presto"]),
            y.push(m));
    else E += " Mobile";
    if ((m = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(f) || 0)[1])) {
      m = [parseFloat(m.replace(/\.(\d)$/, ".0$1")), m];
      if ("Safari" == E && "+" == m[1].slice(-1))
        (E = "WebKit Nightly"), (aa = "alpha"), (C = m[1].slice(0, -1));
      else if (
        C == m[1] ||
        C == (m[2] = (/\bSafari\/([\d.]+\+?)/i.exec(f) || 0)[1])
      )
        C = null;
      m[1] = (/\bChrome\/([\d.]+)/i.exec(f) || 0)[1];
      537.36 == m[0] &&
        537.36 == m[2] &&
        28 <= parseFloat(m[1]) &&
        "WebKit" == H &&
        (H = ["Blink"]);
      Y && (V || m[1])
        ? (H && (H[1] = "like Chrome"),
          (m =
            m[1] ||
            ((m = m[0]),
            530 > m
              ? 1
              : 532 > m
              ? 2
              : 532.05 > m
              ? 3
              : 533 > m
              ? 4
              : 534.03 > m
              ? 5
              : 534.07 > m
              ? 6
              : 534.1 > m
              ? 7
              : 534.13 > m
              ? 8
              : 534.16 > m
              ? 9
              : 534.24 > m
              ? 10
              : 534.3 > m
              ? 11
              : 535.01 > m
              ? 12
              : 535.02 > m
              ? "13+"
              : 535.07 > m
              ? 15
              : 535.11 > m
              ? 16
              : 535.19 > m
              ? 17
              : 536.05 > m
              ? 18
              : 536.1 > m
              ? 19
              : 537.01 > m
              ? 20
              : 537.11 > m
              ? "21+"
              : 537.13 > m
              ? 23
              : 537.18 > m
              ? 24
              : 537.24 > m
              ? 25
              : 537.36 > m
              ? 26
              : "Blink" != H
              ? "27"
              : "28")))
        : (H && (H[1] = "like Safari"),
          (m =
            ((m = m[0]),
            400 > m
              ? 1
              : 500 > m
              ? 2
              : 526 > m
              ? 3
              : 533 > m
              ? 4
              : 534 > m
              ? "4+"
              : 535 > m
              ? 5
              : 537 > m
              ? 6
              : 538 > m
              ? 7
              : 601 > m
              ? 8
              : "8")));
      H &&
        (H[1] +=
          " " + (m += "number" == typeof m ? ".x" : /[.+]/.test(m) ? "" : "+"));
      "Safari" == E && (!C || 45 < parseInt(C)) && (C = m);
    }
    "Opera" == E && (m = /\bzbov|zvav$/.exec(F))
      ? ((E += " "),
        y.unshift("desktop mode"),
        "zvav" == m ? ((E += "Mini"), (C = null)) : (E += "Mobile"),
        (F = F.replace(RegExp(" *" + m + "$"), "")))
      : "Safari" == E &&
        /\bChrome\b/.exec(H && H[1]) &&
        (y.unshift("desktop mode"),
        (E = "Chrome Mobile"),
        (C = null),
        /\bOS X\b/.test(F) ? ((T = "Apple"), (F = "iOS 4.3+")) : (F = null));
    C &&
      0 == C.indexOf((m = /[\d.]+$/.exec(F))) &&
      -1 < f.indexOf("/" + m + "-") &&
      (F = String(F.replace(m, "")).replace(/^ +| +$/g, ""));
    H &&
      !/\b(?:Avant|Nook)\b/.test(E) &&
      (/Browser|Lunascape|Maxthon/.test(E) ||
        ("Safari" != E && /^iOS/.test(F) && /\bSafari\b/.test(H[1])) ||
        (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
          E
        ) &&
          H[1])) &&
      (m = H[H.length - 1]) &&
      y.push(m);
    y.length && (y = ["(" + y.join("; ") + ")"]);
    T && I && 0 > I.indexOf(T) && y.push("on " + T);
    I && y.push((/^on /.test(y[y.length - 1]) ? "" : "on ") + I);
    if (F) {
      var da =
        (m = / ([\d.+]+)$/.exec(F)) &&
        "/" == F.charAt(F.length - m[0].length - 1);
      F = {
        architecture: 32,
        family: m && !da ? F.replace(m[0], "") : F,
        version: m ? m[1] : null,
        toString: function () {
          var Q = this.version;
          return (
            this.family +
            (Q && !da ? " " + Q : "") +
            (64 == this.architecture ? " 64-bit" : "")
          );
        },
      };
    }
    (m = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(X)) && !/\bi686\b/i.test(X)
      ? (F &&
          ((F.architecture = 64),
          (F.family = F.family.replace(RegExp(" *" + m), ""))),
        E &&
          (/\bWOW64\b/i.test(f) ||
            (Y &&
              /\w(?:86|32)$/.test(L.cpuClass || L.platform) &&
              !/\bWin64; x64\b/i.test(f))) &&
          y.unshift("32-bit"))
      : F &&
        /^OS X/.test(F.family) &&
        "Chrome" == E &&
        39 <= parseFloat(C) &&
        (F.architecture = 64);
    f || (f = null);
    t = {};
    t.description = f;
    t.layout = H && H[0];
    t.manufacturer = T;
    t.name = E;
    t.prerelease = aa;
    t.product = I;
    t.ua = f;
    t.version = E && C;
    t.os = F || {
      architecture: null,
      family: null,
      version: null,
      toString: function () {
        return "null";
      },
    };
    t.parse = n;
    t.toString = function () {
      return this.description || "";
    };
    t.version && y.unshift(C);
    t.name && y.unshift(E);
    F &&
      E &&
      (F != String(F).split(" ")[0] || (F != E.split(" ")[0] && !I)) &&
      y.push(I ? "(" + F + ")" : "on " + F);
    y.length && (t.description = y.join(" "));
    return t;
  }
  var p = {
      function: !0,
      object: !0,
    },
    B = (p[typeof window] && window) || this,
    q = p[typeof exports] && exports;
  p = p[typeof module] && module && !module.nodeType && module;
  var u = q && p && "object" == typeof global && global;
  !u || (u.global !== u && u.window !== u && u.self !== u) || (B = u);
  var z = Math.pow(2, 53) - 1,
    w = /\bOpera/;
  u = Object.prototype;
  var l = u.hasOwnProperty,
    r = u.toString,
    v = n();
  "function" == typeof define && "object" == typeof define.amd && define.amd
    ? ((B.platform = v),
      define(function () {
        return v;
      }))
    : q && p
    ? e(v, function (f, A) {
        q[A] = f;
      })
    : (B.platform = v);
}).call(this);
var s_iScaleFactor = 1,
  s_iOffsetX,
  s_iOffsetY;
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

function getSize(a) {
  var b = a.toLowerCase(),
    c = window.document,
    e = c.documentElement;
  if (void 0 === window["inner" + a]) a = e["client" + a];
  else if (window["inner" + a] != e["client" + a]) {
    var d = c.createElement("body");
    d.id = "vpw-test-b";
    d.style.cssText = "overflow:scroll";
    var g = c.createElement("div");
    g.id = "vpw-test-d";
    g.style.cssText = "position:absolute;top:-1000px";
    g.innerHTML =
      "<style>@media(" +
      b +
      ":" +
      e["client" + a] +
      "px){body#vpw-test-b div#vpw-test-d{" +
      b +
      ":7px!important}}</style>";
    d.appendChild(g);
    e.insertBefore(d, c.head);
    a = 7 == g["offset" + a] ? e["client" + a] : window["inner" + a];
    e.removeChild(d);
  } else a = window["inner" + a];
  return a;
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
  window.matchMedia("(orientation: portrait)").matches && sizeHandler();
  window.matchMedia("(orientation: landscape)").matches && sizeHandler();
}

function isIOS() {
  for (
    var a =
      "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(
        ";"
      );
    a.length;

  )
    if (navigator.platform === a.pop()) return (s_bIsIphone = !0);
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
  if ($("#canvas") && s_oStage && s_oStage.canvas) {
    var a =
      null !== platform.name && "safari" === platform.name.toLowerCase()
        ? getIOSWindowHeight()
        : getSize("Height");
    var b = getSize("Width"),
      c = Math.min(a / CANVAS_HEIGHT, b / CANVAS_WIDTH);
    b > a
      ? ((EDGEBOARD_X = 0), (EDGEBOARD_Y = 440), (s_bLandscape = !0))
      : ((EDGEBOARD_X = 420), (EDGEBOARD_Y = 0), (s_bLandscape = !1));
    var e = Math.round(CANVAS_WIDTH * c);
    c = Math.round(CANVAS_HEIGHT * c);
    if (c < a) {
      var d = a - c;
      c += d;
      e += (CANVAS_WIDTH / CANVAS_HEIGHT) * d;
    } else
      e < b &&
        ((d = b - e), (e += d), (c += (CANVAS_HEIGHT / CANVAS_WIDTH) * d));
    d = a / 2 - c / 2;
    var g = b / 2 - e / 2,
      h = CANVAS_WIDTH / e;
    if (g * h < -EDGEBOARD_X || d * h < -EDGEBOARD_Y)
      (c = Math.min(
        a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y),
        b / (CANVAS_WIDTH - 2 * EDGEBOARD_X)
      )),
        (e = Math.round(CANVAS_WIDTH * c)),
        (c = Math.round(CANVAS_HEIGHT * c)),
        (d = (a - c) / 2),
        (g = (b - e) / 2),
        (h = CANVAS_WIDTH / e);
    s_iOffsetX = -1 * g * h;
    s_iOffsetY = -1 * d * h;
    0 <= d && (s_iOffsetY = 0);
    0 <= g && (s_iOffsetX = 0);
    null !== s_oMenu && s_oMenu.refreshButtonPos();
    null !== s_oGame && s_oGame.refreshButtonPos();
    $("#canvas").css("width", e + "px");
    $("#canvas").css("height", c + "px");
    c < a && (d = (a - c) / 2);
    0 > d || (d = (a - c) / 2);
    $("#canvas").css("top", d + "px");
    $("#canvas").css("left", g + "px");
    fullscreenHandler();
  }
}

function createBitmap(a, b, c) {
  var e = new createjs.Bitmap(a),
    d = new createjs.Shape();
  b && c
    ? d.graphics.beginFill("#fff").drawRect(0, 0, b, c)
    : d.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
  e.hitArea = d;
  return e;
}

function createSprite(a, b, c, e, d, g) {
  a = null !== b ? new createjs.Sprite(a, b) : new createjs.Sprite(a);
  b = new createjs.Shape();
  b.graphics.beginFill("#000000").drawRect(-c, -e, d, g);
  a.hitArea = b;
  return a;
}

function pad(a, b, c) {
  a += "";
  return a.length >= b ? a : Array(b - a.length + 1).join(c || "0") + a;
}

function randomFloatBetween(a, b, c) {
  "undefined" === typeof c && (c = 2);
  return parseFloat(Math.min(a + Math.random() * (b - a), b).toFixed(c));
}

function rotateVector2D(a, b) {
  var c = b.getX() * Math.cos(a) + b.getY() * Math.sin(a),
    e = b.getX() * -Math.sin(a) + b.getY() * Math.cos(a);
  b.set(c, e);
}

function tweenVectorsOnX(a, b, c) {
  return a + c * (b - a);
}

function shuffle(a) {
  for (var b = a.length, c, e; 0 !== b; )
    (e = Math.floor(Math.random() * b)),
      --b,
      (c = a[b]),
      (a[b] = a[e]),
      (a[e] = c);
  return a;
}

function bubbleSort(a) {
  do {
    var b = !1;
    for (var c = 0; c < a.length - 1; c++)
      a[c] > a[c + 1] &&
        ((b = a[c]), (a[c] = a[c + 1]), (a[c + 1] = b), (b = !0));
  } while (b);
}

function compare(a, b) {
  return a.index > b.index ? -1 : a.index < b.index ? 1 : 0;
}

function easeLinear(a, b, c, e) {
  return (c * a) / e + b;
}

function easeInQuad(a, b, c, e) {
  return c * (a /= e) * a + b;
}

function easeInSine(a, b, c, e) {
  return -c * Math.cos((a / e) * (Math.PI / 2)) + c + b;
}

function easeInCubic(a, b, c, e) {
  return c * (a /= e) * a * a + b;
}

function getTrajectoryPoint(a, b) {
  var c = new createjs.Point(),
    e = (1 - a) * (1 - a),
    d = a * a;
  c.x = e * b.start.x + 2 * (1 - a) * a * b.traj.x + d * b.end.x;
  c.y = e * b.start.y + 2 * (1 - a) * a * b.traj.y + d * b.end.y;
  return c;
}

function formatTime(a) {
  a /= 1e3;
  var b = Math.floor(a / 60);
  a = parseFloat(a - 60 * b).toFixed(1);
  var c = "";
  c = 10 > b ? c + ("0" + b + ":") : c + (b + ":");
  return 10 > a ? c + ("0" + a) : c + a;
}

function degreesToRadians(a) {
  return (a * Math.PI) / 180;
}

function checkRectCollision(a, b) {
  var c = getBounds(a, 0.9);
  var e = getBounds(b, 0.98);
  return calculateIntersection(c, e);
}

function calculateIntersection(a, b) {
  var c, e, d, g;
  var h = a.x + (c = a.width / 2);
  var k = a.y + (e = a.height / 2);
  var n = b.x + (d = b.width / 2);
  var p = b.y + (g = b.height / 2);
  h = Math.abs(h - n) - (c + d);
  k = Math.abs(k - p) - (e + g);
  return 0 > h && 0 > k
    ? ((h = Math.min(Math.min(a.width, b.width), -h)),
      (k = Math.min(Math.min(a.height, b.height), -k)),
      {
        x: Math.max(a.x, b.x),
        y: Math.max(a.y, b.y),
        width: h,
        height: k,
        rect1: a,
        rect2: b,
      })
    : null;
}

function getBounds(a, b) {
  var c = {
    x: Infinity,
    y: Infinity,
    width: 0,
    height: 0,
  };
  if (a instanceof createjs.Container) {
    c.x2 = -Infinity;
    c.y2 = -Infinity;
    var e = a.children,
      d = e.length,
      g;
    for (g = 0; g < d; g++) {
      var h = getBounds(e[g], 1);
      h.x < c.x && (c.x = h.x);
      h.y < c.y && (c.y = h.y);
      h.x + h.width > c.x2 && (c.x2 = h.x + h.width);
      h.y + h.height > c.y2 && (c.y2 = h.y + h.height);
    }
    Infinity == c.x && (c.x = 0);
    Infinity == c.y && (c.y = 0);
    Infinity == c.x2 && (c.x2 = 0);
    Infinity == c.y2 && (c.y2 = 0);
    c.width = c.x2 - c.x;
    c.height = c.y2 - c.y;
    delete c.x2;
    delete c.y2;
  } else {
    if (a instanceof createjs.Bitmap) {
      d = a.sourceRect || a.image;
      g = d.width * b;
      var k = d.height * b;
    } else if (a instanceof createjs.Sprite)
      if (
        a.spriteSheet._frames &&
        a.spriteSheet._frames[a.currentFrame] &&
        a.spriteSheet._frames[a.currentFrame].image
      ) {
        d = a.spriteSheet.getFrame(a.currentFrame);
        g = d.rect.width;
        k = d.rect.height;
        e = d.regX;
        var n = d.regY;
      } else (c.x = a.x || 0), (c.y = a.y || 0);
    else (c.x = a.x || 0), (c.y = a.y || 0);
    e = e || 0;
    g = g || 0;
    n = n || 0;
    k = k || 0;
    c.regX = e;
    c.regY = n;
    d = a.localToGlobal(0 - e, 0 - n);
    h = a.localToGlobal(g - e, k - n);
    g = a.localToGlobal(g - e, 0 - n);
    e = a.localToGlobal(0 - e, k - n);
    c.x = Math.min(Math.min(Math.min(d.x, h.x), g.x), e.x);
    c.y = Math.min(Math.min(Math.min(d.y, h.y), g.y), e.y);
    c.width = Math.max(Math.max(Math.max(d.x, h.x), g.x), e.x) - c.x;
    c.height = Math.max(Math.max(Math.max(d.y, h.y), g.y), e.y) - c.y;
  }
  return c;
}

function NoClickDelay(a) {
  this.element = a;
  window.Touch && this.element.addEventListener("touchstart", this, !1);
}

function shuffle(a) {
  for (var b = a.length, c, e; 0 < b; )
    (e = Math.floor(Math.random() * b)),
      b--,
      (c = a[b]),
      (a[b] = a[e]),
      (a[e] = c);
  return a;
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
      var b = document.createEvent("MouseEvents");
      b.initEvent("click", !0, !0);
      a.dispatchEvent(b);
    }
  },
};

function getParamValue(a) {
  for (
    var b = window.location.search.substring(1).split("&"), c = 0;
    c < b.length;
    c++
  ) {
    var e = b[c].split("=");
    if (e[0] == a) return e[1];
  }
}

function playSound(a, b, c) {
  return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
    ? (s_aSounds[a].play(),
      s_aSounds[a].volume(b),
      s_aSounds[a].loop(c),
      s_aSounds[a])
    : null;
}

function setMute(a) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || Howler.mute(a);
}

function toggleMute(a) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || Howler.mute(a);
}

function stopSound(a) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].stop();
}

function setVolume(a, b) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].volume(b);
}

function muteSound(a, b) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].mute(b);
}
var browserPrefixes = ["moz", "ms", "o", "webkit"],
  isVisible = !0;

function getHiddenPropertyName(a) {
  return a ? a + "Hidden" : "hidden";
}

function getVisibilityEvent(a) {
  return (a ? a : "") + "visibilitychange";
}

function getBrowserPrefix() {
  for (var a = 0; a < browserPrefixes.length; a++)
    if (getHiddenPropertyName(browserPrefixes[a]) in document)
      return browserPrefixes[a];
  return null;
}

function fullScreenHandler(a) {
  s_bFullscreen = a;
  sizeHandler();
}

function randomIntBetween(a, b) {
  return parseInt(Math.min(a + Math.random() * (b - a), b));
}

function lineInterpolate(a, b, c, e) {
  var d = (b.x - a.x) / c;
  b = (b.y - a.y) / c;
  var g = [];
  e = c - (void 0 !== e ? (e > c ? c : e) : c);
  for (e; e < c; e++)
    g.push({
      x: a.x + d * e,
      y: a.y + b * e,
    });
  return g;
}
(function () {
  function a(c) {
    var e = {
      focus: "visible",
      focusin: "visible",
      pageshow: "visible",
      blur: "hidden",
      focusout: "hidden",
      pagehide: "hidden",
    };
    c = c || window.event;
    c.type in e
      ? (document.body.className = e[c.type])
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

function saveItem(a, b) {
  s_bStorageAvailable && localStorage.setItem(a, b);
}

function getItem(a) {
  return s_bStorageAvailable ? localStorage.getItem(a) : null;
}

function clearLocalStorage() {
  TOTAL_MONEY = START_MONEY;
  if (s_bStorageAvailable)
    for (var a = 0; null !== localStorage.key(a); ) {
      var b = localStorage.key(a);
      -1 !== b.indexOf(LOCALSTORAGE_STRING) ? localStorage.removeItem(b) : a++;
    }
}

function CSpriteLibrary() {
  var a = {},
    b,
    c,
    e,
    d,
    g,
    h;
  this.init = function (k, n, p) {
    b = {};
    e = c = 0;
    d = k;
    g = n;
    h = p;
  };
  this.addSprite = function (k, n) {
    if (a.hasOwnProperty(k)) return !1;
    var p = new Image();
    a[k] = b[k] = {
      szPath: n,
      oSprite: p,
      bLoaded: !1,
    };
    c++;
    return !0;
  };
  this.getSprite = function (k) {
    return a.hasOwnProperty(k) ? a[k].oSprite : null;
  };
  this._onSpritesLoaded = function () {
    c = 0;
    g.call(h);
  };
  this._onSpriteLoaded = function () {
    d.call(h);
    ++e === c && this._onSpritesLoaded();
  };
  this.loadSprites = function () {
    for (var k in b)
      (b[k].oSprite.oSpriteLibrary = this),
        (b[k].oSprite.szKey = k),
        (b[k].oSprite.onload = function () {
          this.oSpriteLibrary.setLoaded(this.szKey);
          this.oSpriteLibrary._onSpriteLoaded(this.szKey);
        }),
        (b[k].oSprite.onerror = function (n) {
          var p = n.currentTarget;
          setTimeout(function () {
            b[p.szKey].oSprite.src = b[p.szKey].szPath;
          }, 500);
        }),
        (b[k].oSprite.src = b[k].szPath);
  };
  this.setLoaded = function (k) {
    a[k].bLoaded = !0;
  };
  this.isLoaded = function (k) {
    return a[k].bLoaded;
  };
  this.getNumSprites = function () {
    return c;
  };
}
var CANVAS_WIDTH = 1920,
  CANVAS_HEIGHT = 1920,
  EDGEBOARD_X = 0,
  EDGEBOARD_Y = 0,
  FPS = 30,
  FPS_TIME = 1e3 / FPS,
  DISABLE_SOUND_MOBILE = !1,
  PRIMARY_FONT = "Averia_Libre",
  LOCALSTORAGE_STRING = "olympus_keno_",
  STATE_LOADING = 0,
  STATE_MENU = 1,
  STATE_HELP = 2,
  STATE_GAME = 3,
  ON_MOUSE_DOWN = 0,
  ON_MOUSE_UP = 1,
  ON_MOUSE_OVER = 2,
  ON_MOUSE_OUT = 3,
  ON_DRAG_START = 4,
  ON_DRAG_END = 5,
  ON_END_THUNDER = 6,
  ON_BUT_YES_DOWN = 7,
  ON_EXPAND = 8,
  ON_COLLAPSE = 9,
  NUM_DIFFERENT_BALLS = 5,
  WIN_OCCURRENCE = [],
  PAYOUTS = [],
  BANK,
  START_PLAYER_MONEY,
  CUR_GRID_SCALE = 1,
  MAX_TABLE_HEIGHT = 800,
  CELL_WIDTH,
  CELL_HEIGHT,
  PAYTABLE_POS_PORTRAIT = {
    x: CANVAS_WIDTH / 2 - 250,
    y: 50,
  },
  WINS_PANEL_POS_PORTRAIT = {
    x: CANVAS_WIDTH / 2 + 100,
    y: 188,
  },
  BET,
  TOTAL_MONEY,
  START_MONEY,
  MAX_TIME_EFFECT_LIGHTING = 3e3,
  MIN_TIME_EFFECT_LIGHTING = 600,
  FONT_COLOR_HIGHLIGHT = "#ffb400",
  GAME_NAME = "ctl-olympus-keno",
  SOUNDTRACK_VOLUME_IN_GAME = 1;

function CPreloader() {
  var a, b, c, e, d, g, h, k, n;
  this._init = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
    s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
    s_oSpriteLibrary.loadSprites();
    n = new createjs.Container();
    s_oStage.addChild(n);
  };
  this.unload = function () {
    n.removeAllChildren();
  };
  this._onImagesLoaded = function () {};
  this._onAllImagesLoaded = function () {
    this.attachSprites();
    s_oMain.preloaderReady();
  };
  this.attachSprites = function () {
    var p = new createjs.Shape();
    p.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    n.addChild(p);
    p = s_oSpriteLibrary.getSprite("200x200");
    h = createBitmap(p);
    h.regX = 0.5 * p.width;
    h.regY = 0.5 * p.height;
    h.x = CANVAS_WIDTH / 2;
    h.y = CANVAS_HEIGHT / 2 - 120;
    n.addChild(h);
    k = new createjs.Shape();
    k.graphics
      .beginFill("rgba(0,0,0,0.01)")
      .drawRoundRect(h.x - 100, h.y - 100, 200, 200, 10);
    n.addChild(k);
    h.mask = k;
    p = s_oSpriteLibrary.getSprite("progress_bar");
    e = createBitmap(p);
    e.x = CANVAS_WIDTH / 2 - p.width / 2;
    e.y = CANVAS_HEIGHT / 2 + 50;
    n.addChild(e);
    a = p.width;
    b = p.height;
    d = new createjs.Shape();
    d.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(e.x, e.y, 1, b);
    n.addChild(d);
    e.mask = d;
    c = new createjs.Text("", "30px " + PRIMARY_FONT, "#ffba00");
    c.x = CANVAS_WIDTH / 2;
    c.y = CANVAS_HEIGHT / 2 + 150;
    c.textBaseline = "alphabetic";
    c.textAlign = "center";
    n.addChild(c);
    g = new createjs.Shape();
    g.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    n.addChild(g);
    createjs.Tween.get(g)
      .to(
        {
          alpha: 0,
        },
        500
      )
      .call(function () {
        createjs.Tween.removeTweens(g);
        n.removeChild(g);
      });
  };
  this.refreshLoader = function (p) {
    c.text = p + "%";
    100 === p &&
      (s_oMain._onRemovePreloader(), (c.visible = !1), (e.visible = !1));
    d.graphics.clear();
    p = Math.floor((p * a) / 100);
    d.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(e.x, e.y, p, b);
  };
  this._init();
}

function CMain(a) {
  var b,
    c = 0,
    e = 0,
    d = STATE_LOADING,
    g,
    h;
  this.initContainer = function () {
    s_oCanvas = document.getElementById("canvas");
    s_oStage = new createjs.Stage(s_oCanvas);
    createjs.Touch.enable(s_oStage, !0);
    s_oStage.preventSelection = !1;
    s_bMobile = isMobile();
    !1 === s_bMobile && s_oStage.enableMouseOver(20);
    s_iPrevTime = new Date().getTime();
    createjs.Ticker.framerate = FPS;
    createjs.Ticker.addEventListener("tick", this._update);
    navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
    s_oSpriteLibrary = new CSpriteLibrary();
    g = new CPreloader();
  };
  this.preloaderReady = function () {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || this._initSounds();
    this._loadImages();
    b = !0;
  };
  this.soundLoaded = function () {
    c++;
    g.refreshLoader(Math.floor((c / e) * 100));
  };
  this._onRemovePreloader = function () {
    APIgetSlotInfos(this.settingPhase, this);
  };
  this._initSounds = function () {
    Howler.mute(!s_bAudioActive);
    s_aSoundsInfo = [];
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "soundtrack",
      loop: !0,
      volume: 1,
      ingamename: "soundtrack",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "press_button",
      loop: !1,
      volume: 1,
      ingamename: "click",
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
      filename: "launch_ball",
      loop: !1,
      volume: 1,
      ingamename: "launch_ball",
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
      filename: "thunder",
      loop: !1,
      volume: 1,
      ingamename: "thunder",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "avatar_start_spin",
      loop: !1,
      volume: 1,
      ingamename: "avatar_start_spin",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "avatar_win_0",
      loop: !1,
      volume: 1,
      ingamename: "avatar_win_0",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "avatar_win_1",
      loop: !1,
      volume: 1,
      ingamename: "avatar_win_1",
    });
    e += s_aSoundsInfo.length;
    s_aSounds = [];
    for (var n = 0; n < s_aSoundsInfo.length; n++)
      this.tryToLoadSound(s_aSoundsInfo[n], !1);
  };
  this.tryToLoadSound = function (n, p) {
    setTimeout(
      function () {
        s_aSounds[n.ingamename] = new Howl({
          src: [n.path + n.filename + ".mp3"],
          autoplay: !1,
          preload: !0,
          loop: n.loop,
          volume: n.volume,
          onload: s_oMain.soundLoaded,
          onloaderror: function (B, q) {
            for (var u = 0; u < s_aSoundsInfo.length; u++)
              if (B === s_aSounds[s_aSoundsInfo[u].ingamename]._sounds[0]._id) {
                s_oMain.tryToLoadSound(s_aSoundsInfo[u], !0);
                break;
              }
          },
          onplayerror: function (B) {
            for (var q = 0; q < s_aSoundsInfo.length; q++)
              if (B === s_aSounds[s_aSoundsInfo[q].ingamename]._sounds[0]._id) {
                s_aSounds[s_aSoundsInfo[q].ingamename].once(
                  "unlock",
                  function () {
                    s_aSounds[s_aSoundsInfo[q].ingamename].play();
                    "soundtrack" === s_aSoundsInfo[q].ingamename &&
                      null !== s_oGame &&
                      setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
                  }
                );
                break;
              }
          },
        });
      },
      p ? 200 : 0
    );
  };
  this._loadImages = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
    s_oSpriteLibrary.addSprite("msg_box_small", "./sprites/msg_box_small.png");
    s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");
    s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
    s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
    s_oSpriteLibrary.addSprite(
      "bg_game_thunder_off",
      "./sprites/bg_game_thunder_off.jpg"
    );
    s_oSpriteLibrary.addSprite(
      "bg_game_thunder_on",
      "./sprites/bg_game_thunder_on.jpg"
    );
    s_oSpriteLibrary.addSprite("logo_menu", "./sprites/logo_menu.png");
    s_oSpriteLibrary.addSprite("but_plus", "./sprites/but_plus.png");
    s_oSpriteLibrary.addSprite("but_generic", "./sprites/but_generic.png");
    s_oSpriteLibrary.addSprite("plus_display", "./sprites/plus_display.png");
    s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
    s_oSpriteLibrary.addSprite("cell_bg", "./sprites/cell_bg.png");
    s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
    s_oSpriteLibrary.addSprite(
      "but_delete_savings",
      "./sprites/but_delete_savings.png"
    );
    s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
    s_oSpriteLibrary.addSprite(
      "but_fullscreen",
      "./sprites/but_fullscreen.png"
    );
    s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
    s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
    s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
    s_oSpriteLibrary.addSprite("entries_panel", "./sprites/entries_panel.png");
    s_oSpriteLibrary.addSprite("but_settings", "./sprites/but_settings.png");
    s_oSpriteLibrary.addSprite(
      "payouts_landscape",
      "./sprites/payouts_landscape.png"
    );
    s_oSpriteLibrary.addSprite(
      "payouts_portrait",
      "./sprites/payouts_portrait.png"
    );
    s_oSpriteLibrary.addSprite("win_panel", "./sprites/win_panel.png");
    s_oSpriteLibrary.addSprite("pavement_bg", "./sprites/pavement_bg.png");
    for (var n = 0; 151 > n; n++)
      s_oSpriteLibrary.addSprite(
        "avatar_" + n,
        "./sprites/avatar/avatar_" + n + ".png"
      );
    for (n = 0; 39 > n; n++)
      s_oSpriteLibrary.addSprite(
        "symbol_explosion_" + n,
        "./sprites/symbol_explosion/symbol_explosion_" + n + ".png"
      );
    for (n = 0; 14 > n; n++)
      s_oSpriteLibrary.addSprite(
        "frame_selection_" + n,
        "./sprites/frame_selection/frame_selection_" + n + ".png"
      );
    e += s_oSpriteLibrary.getNumSprites();
    s_oSpriteLibrary.loadSprites();
  };
  this._onImagesLoaded = function () {
    c++;
    g.refreshLoader(Math.floor((c / e) * 100));
    if (c === e) this.onAllResourcesLoaded();
  };
  this._onAllImagesLoaded = function () {};
  this.settingPhase = function (n) {
    try {
      saveItem("ls_available", "ok");
    } catch (p) {
      s_bStorageAvailable = !1;
    }
    TOTAL_MONEY = n.start_money;
    BET = n.bets;
    playSound("soundtrack", 1, !0);
    g.unload();
    this.gotoMenu();
  };
  this.gotoMenu = function () {
    new CMenu();
    d = STATE_MENU;
  };
  this.gotoGame = function () {
    h = new CGame(k);
    d = STATE_GAME;
  };
  this.gotoHelp = function () {
    new CHelp();
    d = STATE_HELP;
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
  this.stopUpdateNoBlock = function () {
    b = !1;
    createjs.Ticker.paused = !0;
  };
  this.startUpdateNoBlock = function () {
    s_iPrevTime = new Date().getTime();
    b = !0;
    createjs.Ticker.paused = !1;
  };
  this.refreshCredits = function (n) {
    h && h.refreshCredits(n);
  };
  this._update = function (n) {
    if (!1 !== b) {
      var p = new Date().getTime();
      s_iTimeElaps = p - s_iPrevTime;
      s_iCntTime += s_iTimeElaps;
      s_iCntFps++;
      s_iPrevTime = p;
      1e3 <= s_iCntTime &&
        ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0));
      d === STATE_GAME && h.update();
      s_oStage.update(n);
    }
  };
  s_oMain = this;
  var k = a;
  ENABLE_FULLSCREEN = a.fullscreen;
  s_bAudioActive = a.audio_enable_on_startup;
  TOTAL_MONEY = START_MONEY = a.start_credit;
  RESTART_CREDIT = a.restart_credit;
  WIN_OCCURRENCE = a.win_occurrence;
  COIN_BETS = a.bets;
  this.initContainer();
}
var s_bMobile,
  s_iCntTime = 0,
  s_iTimeElaps = 0,
  s_iPrevTime = 0,
  s_iCntFps = 0,
  s_iCurFps = 0,
  s_bAudioActive = !1,
  s_bFullscreen = !1,
  s_oStage,
  s_oMain,
  s_oSpriteLibrary,
  s_oSoundTrack = null,
  s_oCanvas,
  s_aSounds,
  s_aSoundsInfo;
s_bFullscreen = !1;
var s_bStorageAvailable = !0;

function CTextButton(a, b, c, e, d, g, h, k, n, p, B, q, u) {
  var z, w, l, r, v, f, A;
  this._init = function (x, t, y, L, C, V, R, O, N, W, Z, D) {
    z = !1;
    w = 1;
    l = [];
    r = [];
    O || (O = "center");
    N || (N = 0);
    Z || (Z = 0);
    W = createBitmap(y);
    D = Math.ceil(R / 20);
    A = new createjs.Text(L, "bold " + R + "px " + C, "#000000");
    A.textAlign = O;
    A.textBaseline = "alphabetic";
    var G = A.getBounds();
    A.y = Math.floor(y.height / 2) + G.height / 3 + D;
    f = new createjs.Text(L, "bold " + R + "px " + C, V);
    f.textAlign = O;
    f.textBaseline = "alphabetic";
    G = f.getBounds();
    switch (O) {
      case "center":
        f.x = y.width / 2;
        break;
      case "right":
        f.x = y.width - Z;
        break;
      case "left":
        f.x = 0 + N;
    }
    A.x = f.x + D;
    f.y = Math.floor(y.height / 2) + G.height / 2;
    v = new createjs.Container();
    v.x = x;
    v.y = t;
    v.regX = y.width / 2;
    v.regY = y.height / 2;
    v.cursor = "pointer";
    v.addChild(W, A, f);
    u.addChild(v);
    this._initListener();
  };
  this.unload = function () {
    v.off("mousedown");
    v.off("pressup");
    u.removeChild(v);
  };
  this.setVisible = function (x) {
    v.visible = x;
  };
  this._initListener = function () {
    oParent = this;
    v.on("mousedown", this.buttonDown);
    v.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (x, t, y) {
    l[x] = t;
    r[x] = y;
  };
  this.buttonRelease = function () {
    z ||
      ((v.scaleX = 1 * w),
      (v.scaleY = 1 * w),
      l[ON_MOUSE_UP] && l[ON_MOUSE_UP].call(r[ON_MOUSE_UP]));
  };
  this.buttonDown = function () {
    z ||
      ((v.scaleX = 0.9 * w),
      (v.scaleY = 0.9 * w),
      l[ON_MOUSE_DOWN] && l[ON_MOUSE_DOWN].call(r[ON_MOUSE_DOWN]));
  };
  this.setTextPosition = function (x) {
    f.y = x;
    A.y = x + 2;
  };
  this.setText = function (x) {
    f.text = x;
    A.text = x;
  };
  this.setPosition = function (x, t) {
    v.x = x;
    v.y = t;
  };
  this.setX = function (x) {
    v.x = x;
  };
  this.setY = function (x) {
    v.y = x;
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
  this.block = function (x) {
    z = x;
  };
  this.setScale = function (x) {
    w = x;
    v.scaleX = x;
    v.scaleY = x;
  };
  this._init(a, b, c, e, d, g, h, k, n, p, B, q);
  return this;
}

function CTextToggle(a, b, c, e, d, g, h, k, n) {
  var p = 1,
    B,
    q = !1,
    u,
    z,
    w,
    l,
    r,
    v;
  this._init = function (f, A, x, t, y, L, C, V, R) {
    B = !1;
    u = [];
    z = [];
    v = createBitmap(x);
    var O = Math.ceil(C / 20);
    r = new createjs.Text(t, " " + C + "px " + y, "#000000");
    r.textAlign = "center";
    r.textBaseline = "alphabetic";
    var N = r.getBounds();
    r.x = x.width / 2 + O;
    r.y = Math.floor(x.height / 2) + N.height / 3 + O - 7;
    l = new createjs.Text(t, " " + C + "px " + y, L);
    l.textAlign = "center";
    l.textBaseline = "alphabetic";
    N = l.getBounds();
    l.x = x.width / 2;
    l.y = Math.floor(x.height / 2) + N.height / 3 - 7;
    w = new createjs.Container();
    w.x = f;
    w.y = A;
    w.regX = x.width / 2;
    w.regY = x.height / 2;
    w.cursor = "pointer";
    V ||
      ((f = new createjs.SpriteSheet({
        images: [x],
        frames: {
          width: x.width / 2,
          height: x.height,
          regX: x.width / 2 / 2,
          regY: x.height / 2,
        },
        animations: {
          state_true: [0],
          state_false: [1],
        },
      })),
      (v = createSprite(
        f,
        "state_false",
        x.width / 2 / 2,
        x.height / 2,
        x.width / 2,
        x.height
      )),
      (r.x = O),
      (r.y = O + 17),
      (l.x = 0),
      (l.y = 17),
      (w.regX = 0),
      (w.regY = 0));
    w.addChild(v, r, l);
    R.addChild(w);
    this._initListener();
  };
  this.unload = function () {
    w.off("mousedown");
    w.off("pressup");
    n.removeChild(w);
  };
  this.setVisible = function (f) {
    w.visible = f;
  };
  this._initListener = function () {
    w.on("mousedown", this.buttonDown);
    w.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (f, A, x) {
    u[f] = A;
    z[f] = x;
  };
  this.buttonRelease = function () {
    B ||
      q ||
      ((w.scaleX = 1 * p),
      (w.scaleY = 1 * p),
      u[ON_MOUSE_UP] && u[ON_MOUSE_UP].call(z[ON_MOUSE_UP]));
  };
  this.buttonDown = function () {
    B ||
      q ||
      ((w.scaleX = 0.9 * p),
      (w.scaleY = 0.9 * p),
      u[ON_MOUSE_DOWN] && u[ON_MOUSE_DOWN].call(z[ON_MOUSE_DOWN]));
  };
  this.enable = function () {
    B = !1;
    k || v.gotoAndStop("state_true");
  };
  this.disable = function () {
    B = !0;
    k || v.gotoAndStop("state_false");
  };
  this.setTextPosition = function (f, A) {
    var x = Math.ceil(h / 20);
    r.x = f + x;
    r.y = A + x;
    l.x = f;
    l.y = A;
  };
  this.setText = function (f) {
    l.text = f;
    r.text = f;
  };
  this.setPosition = function (f, A) {
    w.x = f;
    w.y = A;
  };
  this.setX = function (f) {
    w.x = f;
  };
  this.setY = function (f) {
    w.y = f;
  };
  this.getButtonImage = function () {
    return w;
  };
  this.getX = function () {
    return w.x;
  };
  this.getY = function () {
    return w.y;
  };
  this.block = function (f) {
    q = f;
  };
  this.setScale = function (f) {
    p = f;
    w.scaleX = f;
    w.scaleY = f;
  };
  this.setScaleX = function (f) {
    v.scaleX = f;
  };
  this._init(a, b, c, e, d, g, h, k, n);
  return this;
}

function CToggle(a, b, c, e, d) {
  var g,
    h,
    k,
    n = [],
    p,
    B,
    q;
  this._init = function (u, z, w, l) {
    h = [];
    k = [];
    var r = new createjs.SpriteSheet({
      images: [w],
      frames: {
        width: w.width / 2,
        height: w.height,
        regX: w.width / 2 / 2,
        regY: w.height / 2,
      },
      animations: {
        state_true: [0],
        state_false: [1],
      },
    });
    g = l;
    q = createSprite(
      r,
      "state_" + g,
      w.width / 2 / 2,
      w.height / 2,
      w.width / 2,
      w.height
    );
    q.mouseEnabled = !0;
    q.x = u;
    q.y = z;
    q.stop();
    q.cursor = "pointer";
    d.addChild(q);
    this._initListener();
  };
  this.unload = function () {
    q.off("mousedown", p);
    q.off("pressup", B);
    q.mouseEnabled = !1;
    d.removeChild(q);
  };
  this._initListener = function () {
    p = q.on("mousedown", this.buttonDown);
    B = q.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (u, z, w) {
    h[u] = z;
    k[u] = w;
  };
  this.addEventListenerWithParams = function (u, z, w, l) {
    h[u] = z;
    k[u] = w;
    n = l;
  };
  this.setActive = function (u) {
    g = u;
    q.gotoAndStop("state_" + g);
  };
  this.buttonRelease = function () {
    q.scaleX = 1;
    q.scaleY = 1;
    playSound("click", 1, !1);
    g = !g;
    q.gotoAndStop("state_" + g);
    h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(k[ON_MOUSE_UP], n);
  };
  this.buttonDown = function () {
    q.scaleX = 0.9;
    q.scaleY = 0.9;
    h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN], n);
  };
  this.getButtonImage = function () {
    return q;
  };
  this.setPosition = function (u, z) {
    q.x = u;
    q.y = z;
  };
  this.setVisible = function (u) {
    q.visible = u;
  };
  this._init(a, b, c, e);
}

function CNumToggle(a, b, c, e) {
  var d,
    g,
    h,
    k,
    n,
    p,
    B,
    q,
    u,
    z,
    w = [];
  this._init = function (l, r, v, f) {
    d = !1;
    g = [];
    h = [];
    q = new createjs.Container();
    q.x = l;
    q.y = r;
    q.cursor = "pointer";
    f.addChild(q);
    l = {
      images: [s_oSpriteLibrary.getSprite("cell_bg")],
      framerate: 2,
      frames: {
        width: CELL_WIDTH,
        height: CELL_HEIGHT,
        regX: CELL_WIDTH / 2,
        regY: CELL_HEIGHT / 2,
      },
      animations: {
        start: 0,
        hit: 1,
      },
    };
    l = new createjs.SpriteSheet(l);
    u = createSprite(
      l,
      "start",
      CELL_WIDTH / 2,
      CELL_HEIGHT / 2,
      CELL_WIDTH,
      CELL_HEIGHT
    );
    q.addChild(u);
    p = new createjs.Text(v, " 50px " + PRIMARY_FONT, "#6b1f02");
    p.y = 12;
    p.textAlign = "center";
    p.textBaseline = "alphabetic";
    p.visible = !1;
    q.addChild(p);
    p.outline = 6;
    B = new createjs.Text(v, " 50px " + PRIMARY_FONT, "#fff");
    B.y = 12;
    B.textAlign = "center";
    B.textBaseline = "alphabetic";
    q.addChild(B);
    z = new createjs.Shape();
    z.graphics
      .beginFill("rgba(0,0,0,0.1)")
      .drawRect(-CELL_WIDTH / 2, -CELL_HEIGHT / 2, CELL_WIDTH, CELL_HEIGHT);
    q.addChild(z);
    this._initListener();
  };
  this.unload = function () {
    z.off("mousedown", k);
    z.off("click", n);
    e.removeChild(q);
  };
  this._initListener = function () {
    k = z.on("mousedown", this.buttonDown);
    n = z.on("click", this.buttonRelease);
  };
  this.addEventListener = function (l, r, v) {
    g[l] = r;
    h[l] = v;
  };
  this.addEventListenerWithParams = function (l, r, v, f) {
    g[l] = r;
    h[l] = v;
    w = f;
  };
  this.reset = function () {
    u.gotoAndStop("start");
    B.color = "#fff";
    p.visible = !1;
  };
  this.setHit = function () {
    u.gotoAndStop("hit");
    B.color !== FONT_COLOR_HIGHLIGHT && (B.color = "#b9b8b8");
  };
  this.buttonRelease = function () {
    d ||
      (playSound("click", 1, !1),
      (B.color = "#fff"),
      (p.visible = !1),
      g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(h[ON_MOUSE_UP], w));
  };
  this.buttonDown = function () {
    d || (g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN], w));
  };
  this.setPosition = function (l, r) {
    q.x = l;
    q.y = r;
  };
  this.getGlobalPosition = function () {
    return {
      x: q.localToGlobal(0, 0).x,
      y: q.localToGlobal(0, 0).y,
    };
  };
  this.block = function (l) {
    d = l;
  };
  this.select = function () {
    B.color = FONT_COLOR_HIGHLIGHT;
    p.visible = !0;
  };
  this.highlight = function () {
    u.gotoAndPlay(0);
  };
  this.stopHighlight = function () {
    u.gotoAndStop(1);
    B.color = "#fff";
  };
  this.getNum = function () {
    return B.text;
  };
  this._init(a, b, c, e);
}

function CGfxButton(a, b, c, e) {
  var d, g, h, k, n, p, B, q, u;
  this._init = function (z, w, l, r) {
    d = !1;
    g = 1;
    h = [];
    k = [];
    u = createBitmap(l);
    u.x = z;
    u.y = w;
    u.scaleX = u.scaleY = g;
    u.regX = l.width / 2;
    u.regY = l.height / 2;
    r.addChild(u);
    this._initListener();
  };
  this.unload = function () {
    u.off("mousedown", p);
    u.off("pressup", B);
    s_bMobile || u.off("mouseover", q);
    createjs.Tween.removeTweens(u);
    e.removeChild(u);
  };
  this.setVisible = function (z) {
    u.visible = z;
  };
  this.enable = function () {
    d = !1;
  };
  this.disable = function () {
    d = !0;
  };
  this._initListener = function () {
    p = u.on("mousedown", this.buttonDown);
    B = u.on("pressup", this.buttonRelease);
    s_bMobile || (q = u.on("mouseover", this.buttonOver));
  };
  this.addEventListener = function (z, w, l) {
    h[z] = w;
    k[z] = l;
  };
  this.addEventListenerWithParams = function (z, w, l, r) {
    h[z] = w;
    k[z] = l;
    n = r;
  };
  this.buttonRelease = function () {
    d ||
      ((u.scaleX = g),
      (u.scaleY = g),
      h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(k[ON_MOUSE_UP], n));
  };
  this.buttonDown = function () {
    d ||
      ((u.scaleX = 0.9 * g),
      (u.scaleY = 0.9 * g),
      h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN], n));
  };
  this.buttonOver = function (z) {
    s_bMobile || d || (z.target.cursor = "pointer");
  };
  this.pulseAnimation = function () {
    createjs.Tween.get(u, {
      loop: -1,
    })
      .to(
        {
          scaleX: 1.1 * g,
          scaleY: 1.1 * g,
        },
        850,
        createjs.Ease.quadOut
      )
      .to(
        {
          scaleX: g,
          scaleY: g,
        },
        650,
        createjs.Ease.quadIn
      );
  };
  this.moveY = function (z, w, l, r) {
    createjs.Tween.get(u).wait(l).to(
      {
        y: z,
      },
      w,
      r
    );
  };
  this.setPosition = function (z, w) {
    u.x = z;
    u.y = w;
  };
  this.setX = function (z) {
    u.x = z;
  };
  this.setY = function (z) {
    u.y = z;
  };
  this.getButtonImage = function () {
    return u;
  };
  this.getX = function () {
    return u.x;
  };
  this.getY = function () {
    return u.y;
  };
  this._init(a, b, c, e);
  return this;
}

function CGame(a) {
  var b,
    c = !1,
    e,
    d,
    g,
    h,
    k,
    n,
    p,
    B,
    q,
    u,
    z,
    w,
    l,
    r,
    v,
    f,
    A,
    x,
    t,
    y,
    L,
    C,
    V,
    R,
    O,
    N,
    W;
  this._init = function () {
    b = !1;
    p = TOTAL_MONEY;
    n = BET[0];
    n = parseFloat(n.toFixed(2));
    k = [];
    B = 0;
    l = [];
    var D = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
    s_oStage.addChild(D);
    f = createBitmap(s_oSpriteLibrary.getSprite("bg_game_thunder_off"));
    f.alpha = 0;
    s_oStage.addChild(f);
    A = createBitmap(s_oSpriteLibrary.getSprite("bg_game_thunder_on"));
    A.alpha = 0;
    s_oStage.addChild(A);
    D = s_oSpriteLibrary.getSprite("pavement_bg");
    x = createBitmap(D);
    x.y = CANVAS_HEIGHT;
    x.regY = D.height;
    s_oStage.addChild(x);
    C = new createjs.Container();
    s_oStage.addChild(C);
    this._initCells();
    C.x = CANVAS_WIDTH / 2 + CELL_WIDTH / 2;
    C.y = CANVAS_HEIGHT / 2 - CELL_HEIGHT / 2;
    V = new createjs.Container();
    s_oStage.addChild(V);
    D = new createjs.Graphics()
      .beginFill("rgba(255,0,0,0.01)")
      .drawRect(
        C.x,
        C.y,
        C.getBounds().width * CUR_GRID_SCALE,
        C.getBounds().height * CUR_GRID_SCALE
      );
    N = new createjs.Shape(D);
    N.on("click", function () {});
    N.visible = !1;
    s_oStage.addChild(N);
    R = new CPayouts(0, 0);
    y = new CInterface();
    y.refreshBet(n);
    y.refreshMoney(p);
    W = new createjs.Container();
    s_oStage.addChild(W);
    t = new CAvatar(s_oStage);
    L = new CWinPanel();
    O = new CAlertText();
    this.refreshButtonPos();
    p < n && new CRechargePanel();
  };
  this.refreshGridScale = function () {
    CUR_GRID_SCALE = (CANVAS_HEIGHT - 2 * s_iOffsetY) / MAX_TABLE_HEIGHT;
    1 >= CUR_GRID_SCALE
      ? (CUR_GRID_SCALE = parseFloat(CUR_GRID_SCALE.toFixed(2)))
      : 1.2 < CUR_GRID_SCALE && (CUR_GRID_SCALE = 1.2);
    C.scale = CUR_GRID_SCALE;
  };
  this.refreshButtonPos = function () {
    this.refreshGridScale();
    t.refreshPos();
    R.refreshPos();
    y.refreshButtonPos();
    x.y = CANVAS_HEIGHT - s_iOffsetY;
    C.y = s_bLandscape
      ? CANVAS_HEIGHT / 2 - CELL_HEIGHT / 2
      : CANVAS_HEIGHT / 2 - 150;
    N.graphics.clear();
    N.graphics
      .beginFill("rgba(255,0,0,0.01)")
      .drawRect(
        C.x - CELL_WIDTH * CUR_GRID_SCALE * 5 - CELL_WIDTH / 2 - 10,
        C.y - 4 * CELL_HEIGHT - CELL_HEIGHT / 2 - 20,
        C.getBounds().width * CUR_GRID_SCALE + 20,
        C.getBounds().height * CUR_GRID_SCALE + 20
      );
  };
  this._initCells = function () {
    var D = s_oSpriteLibrary.getSprite("cell_bg");
    CELL_WIDTH = D.width / 2;
    CELL_HEIGHT = D.height;
    D = -(10 * CELL_WIDTH) / 2 + CELL_WIDTH / 2 - 40;
    var G = -(8 * CELL_HEIGHT) / 2 + CELL_HEIGHT / 2 + 10;
    z = [];
    w = [];
    for (var M = 0, P = 0; 80 > P; P++)
      (z[P] = new CNumToggle(
        D + (P % 10) * CELL_WIDTH,
        G + CELL_HEIGHT * M,
        P + 1,
        C
      )),
        z[P].addEventListenerWithParams(
          ON_MOUSE_UP,
          this._onButNumRelease,
          this,
          P
        ),
        9 === P % 10 && M++,
        (w[P] = !1);
  };
  this._onButNumRelease = function (D) {
    this._clearAllSelected();
    if (w[D]) {
      B--;
      w[D] = !1;
      for (var G = 0; G < l.length; G++) l[G] === D && l.splice(G, 1);
    } else B++, (w[D] = !0), l.push(D);
    for (G = 0; G < l.length; G++) z[l[G]].select();
    u = R.updatePayouts(B - 1);
    if (9 < B) for (G = 0; G < w.length; G++) w[G] || z[G].block(!0);
    else for (G = 0; G < w.length; G++) z[G].block(!1);
  };
  this.onEndThunderAnim = function (D, G) {
    D.tweenEndPointToStartPoint(0, 400);
    e++;
    if (e === h.length)
      (b = !1),
        createjs.Tween.get(f).to(
          {
            alpha: 0,
          },
          1e3,
          createjs.Ease.cubicOut
        ),
        t.stopPlayAnim(),
        s_oGame._checkContinueGame();
    else {
      z[G].setHit();
      var M = z[G].getGlobalPosition();
      new CExplosion(M.x, M.y, s_oStage);
    }
  };
  this.clearSelection = function () {
    l = [];
    this._clearAllExtracted();
    B = 0;
    R.updatePayouts(B - 1);
    for (var D = 0; D < w.length; D++)
      (w[D] = !1), z[D].block(!1), z[D].reset();
    for (D = 0; D < k.length; D++) k[D].unload();
  };
  this.selectBet = function (D) {
    this._clearAllExtracted();
    for (var G, M = 0; M < BET.length; M++) BET[M] === n && (G = M);
    "add" === D
      ? G !== BET.length - 1 && BET[G + 1] <= p && G++
      : 0 !== G && G--;
    n = BET[G];
    y.refreshBet(n);
  };
  this.refreshCredit = function (D) {
    p = D;
    y.refreshMoney(D);
    saveItem(LOCALSTORAGE_STRING + "score", p);
  };
  this.startAvatarPlayAnim = function () {
    if (p < n)
      return (
        new CRechargePanel(),
        this.smartBlockGUI(!0),
        t.stopPlayAnim(),
        createjs.Tween.get(f).to(
          {
            alpha: 0,
          },
          1e3,
          createjs.Ease.cubicOut
        ),
        !1
      );
    if (2 > B) return O.show(TEXT_CANT_PLAY), this.smartBlockGUI(!1), !1;
    this._clearAllExtracted();
    this.smartBlockGUI(!1);
    createjs.Tween.get(f).to(
      {
        alpha: 1,
      },
      2e3,
      createjs.Ease.cubicOut
    );
    t.startPlayAnim();
    return !0;
  };
  this.play = function () {
    p < n
      ? new CRechargePanel()
      : ((p -= n),
        y.refreshMoney(p),
        saveItem(LOCALSTORAGE_STRING + "score", p),
        (d = 0),
        (g = 500),
        $(s_oMain).trigger("bet_placed", {
          bet: n,
          selected: l,
          num_selected: w,
        }));
  };
  this.autoplay = function () {
    c = !0;
    this.startAvatarPlayAnim() || (c = !1);
  };
  this.stopAutoPlay = function () {
    c = !1;
    y.enableAllButton(!1, c);
  };
  this.onSpinReceived = function (D) {
    r = D.extracted;
    q = D.tot_guessed;
    this._animExtraction(r.length);
  };
  this._animExtraction = function (D) {
    h = [];
    for (var G = 0; G < D; G++) h.push(z[r[G] - 1].getGlobalPosition());
    e = 0;
    v = [];
    for (G = D = 0; G < h.length; G++) this.createThunder(G, D), (D += 200);
    b = !0;
  };
  this.createThunder = function (D, G) {
    var M = [
        {
          thickness: 7,
          color: "#88f",
          offset: {
            x: 0,
            y: 0,
          },
          tremble: 13,
          frequences: [1e3 / 30, 100, 50],
          glow: {
            blur: 20,
            color: "#88f",
            offset: {
              x: 0,
              y: 0,
            },
          },
        },
        {
          thickness: 5,
          color: "#ccf",
          offset: {
            x: -10,
            y: 0,
          },
          tremble: 10,
          frequences: [50, 100],
          glow: {
            blur: 20,
            color: "#fff",
            offset: {
              x: 0,
              y: 0,
            },
          },
        },
        {
          thickness: 10,
          color: "#fff",
          offset: {
            x: 10,
            y: 0,
          },
          tremble: 8,
          frequences: [50, 100],
          glow: null,
        },
        {
          thickness: 2,
          color: "#fff",
          offset: {
            x: 30,
            y: 0,
          },
          tremble: 25,
          frequences: [50, 1e3 / 30],
          glow: {
            blur: 20,
            color: "#88f",
            offset: {
              x: 0,
              y: 0,
            },
          },
        },
        {
          thickness: 4,
          color: "#fff",
          offset: {
            x: -30,
            y: 0,
          },
          tremble: 25,
          frequences: [50, 1e3 / 30],
          glow: {
            blur: 20,
            color: "#fff",
            offset: {
              x: 0,
              y: 0,
            },
          },
        },
      ],
      P = t.getThunderPoint(),
      m = new CThunderBolt(W);
    m.addEventListener(ON_END_THUNDER, this.onEndThunderAnim, this);
    for (var X = 0; X < M.length; X++) m.createThunder(M[X], P, P);
    m.tweenStartPointToEndPoint(
      G,
      500,
      {
        x: h[D].x,
        y: h[D].y,
      },
      z[r[D] - 1].getNum() - 1
    );
    v.push(m);
  };
  this._checkContinueGame = function () {
    for (var D = 0; D < PAYOUTS[B - 1].hits.length; D++)
      if (PAYOUTS[B - 1].hits[D] === q) {
        var G = n * PAYOUTS[B - 1].pays[D];
        G = parseFloat(G.toFixed(2));
        p += G;
        SLOT_CASH -= G;
        y.showWin(G);
        R.highlightWin(q);
        break;
      }
    y.refreshMoney(p);
    saveItem(LOCALSTORAGE_STRING + "score", p);
    $(s_oMain).trigger("save_score", p);
    0 < G
      ? (L.show(TEXT_WIN + "\n" + formatEntries(G), !0), t.playWin())
      : L.show(TEXT_NO_WIN, !1);
    this.highlightCell();
  };
  this._clearAllExtracted = function () {
    y.showWin(0);
    R.stopHighlight();
    for (var D = 0; D < w.length; D++) z[D].reset();
    for (D = 0; D < l.length; D++) z[l[D]].select();
    for (D = 0; D < k.length; D++) k[D].unload();
  };
  this._clearAllSelected = function () {
    y.showWin(0);
    R.stopHighlight();
  };
  this.smartBlockGUI = function (D) {
    D
      ? ((N.visible = !1), y.enableAllButton(!0), y.enableAutoPlay(!0))
      : ((N.visible = !0), y.enableAllButton(!1, c));
  };
  this.getCurMoney = function () {
    return p;
  };
  this.restartGame = function () {
    this.unload();
    this._init();
  };
  this.unload = function () {
    y.unload();
    L.unload();
    createjs.Tween.removeAllTweens();
    s_oStage.removeAllChildren();
  };
  this.onExitFromWinPanel = function () {
    c
      ? (this.smartBlockGUI(!1),
        setTimeout(function () {
          Z.startAvatarPlayAnim();
        }, 1e3))
      : this.smartBlockGUI(!0);
  };
  this.onExit = function () {
    $(s_oMain).trigger("end_session");
    $(s_oMain).trigger("show_interlevel_ad");
    this.unload();
    s_oMain.gotoMenu();
  };
  this.highlightCell = function () {
    if (!(q < u)) {
      k = [];
      for (var D = 0; D < r.length; D++)
        for (var G = 0; G < l.length; G++)
          if (r[D] === l[G] + 1) {
            z[l[G]].highlight();
            var M = z[l[G]].getGlobalPosition();
            k.push(new CHighlightCell(M.x, M.y, V));
          }
    }
  };
  this.isAutoPlay = function () {
    return c;
  };
  this.update = function () {
    if (b) {
      for (var D = 0; D < v.length; D++) v[D].update();
      d += s_iTimeElaps;
      d > g &&
        ((g =
          Math.floor(
            Math.random() *
              (MAX_TIME_EFFECT_LIGHTING - MIN_TIME_EFFECT_LIGHTING + 1)
          ) + MIN_TIME_EFFECT_LIGHTING),
        (d = 0),
        createjs.Tween.get(A)
          .to(
            {
              alpha: 1,
            },
            400,
            createjs.Ease.cubicIn
          )
          .to(
            {
              alpha: 0,
            },
            200,
            createjs.Ease.cubicOut
          ));
    }
  };
  s_oGame = this;
  PAYOUTS = a.payouts;
  START_PLAYER_MONEY = a.start_player_money;
  var Z = this;
  this._init();
}
var s_oGame = null;

function CInterface() {
  var a,
    b,
    c,
    e,
    d,
    g,
    h,
    k,
    n,
    p,
    B = null,
    q = null,
    u,
    z,
    w,
    l,
    r,
    v,
    f,
    A,
    x;
  this._init = function () {
    var t = s_oSpriteLibrary.getSprite("but_exit");
    d = CANVAS_WIDTH - t.height / 2 - 10;
    g = t.height / 2 + 10;
    w = new CGfxButton(d, g, t, s_oStage);
    w.addEventListener(ON_MOUSE_UP, this._onExit, this);
    !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
      ? ((t = s_oSpriteLibrary.getSprite("audio_icon")),
        (c = w.getX() - t.width / 2 - 10),
        (e = t.height / 2 + 10),
        (u = new CToggle(c, e, t, s_bAudioActive, s_oStage)),
        u.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
        (t = s_oSpriteLibrary.getSprite("but_fullscreen")),
        (a = c - t.width / 2 - 10))
      : ((t = s_oSpriteLibrary.getSprite("but_fullscreen")),
        (a = w.getX() - t.width / 2 - 10));
    b = t.height / 2 + 10;
    var y = window.document,
      L = y.documentElement;
    B =
      L.requestFullscreen ||
      L.mozRequestFullScreen ||
      L.webkitRequestFullScreen ||
      L.msRequestFullscreen;
    q =
      y.exitFullscreen ||
      y.mozCancelFullScreen ||
      y.webkitExitFullscreen ||
      y.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (B = !1);
    B &&
      screenfull.isEnabled &&
      ((z = new CToggle(a, b, t, s_bFullscreen, s_oStage)),
      z.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    t = s_oSpriteLibrary.getSprite("but_settings");
    n = CANVAS_WIDTH - t.height / 2 - 10;
    p = t.height / 2 + 10;
    h = t.height / 2 + 10;
    k = t.height / 2 + 10;
    l = new CGUIExpandible(n, p, t, s_oStage);
    l.addButton(w);
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || l.addButton(u);
    B && screenfull.isEnabled && l.addButton(z);
    r = new createjs.Container();
    r.x = 500;
    r.y = 500;
    s_oStage.addChild(r);
    v = new CButtonGUILandscape(s_oStage);
    f = new CButtonGUIPortrait(s_oStage);
    A = new CWinsPanel(s_oStage);
    x = new CAreYouSurePanel();
    x.addEventListener(ON_BUT_YES_DOWN, s_oGame.onExit, s_oGame);
  };
  this.unload = function () {
    w.unload();
    l.unload();
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) u.unload(), (u = null);
    B && screenfull.isEnabled && z.unload();
    s_oInterface = null;
  };
  this.refreshButtonPos = function () {
    s_bLandscape
      ? (A.setPosition(
          CANVAS_WIDTH / 2 + 5 * CELL_WIDTH * CUR_GRID_SCALE + CELL_WIDTH / 2,
          CANVAS_HEIGHT / 2 + CELL_HEIGHT * CUR_GRID_SCALE + 102
        ),
        v.setScale(CUR_GRID_SCALE),
        v.setPosition(
          CANVAS_WIDTH / 2 + 33,
          CANVAS_HEIGHT / 2 + 4 * CELL_HEIGHT + 100
        ),
        v.setVisible(!0),
        f.setVisible(!1),
        l.setPos(h + s_iOffsetX, k + s_iOffsetY))
      : (A.setPosition(WINS_PANEL_POS_PORTRAIT.x, WINS_PANEL_POS_PORTRAIT.y),
        f.setScale(CUR_GRID_SCALE),
        f.setPosition(
          CANVAS_WIDTH / 2 + 33,
          CANVAS_HEIGHT / 2 + 4 * CELL_HEIGHT + 50
        ),
        v.setVisible(!1),
        f.setVisible(!0),
        l.setPos(n - s_iOffsetX, p + s_iOffsetY));
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this._onExit = function () {
    x.show(TEXT_ARE_SURE);
  };
  this.resetFullscreenBut = function () {
    B && screenfull.isEnabled && z.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? q.call(window.document)
      : B.call(window.document.documentElement);
    sizeHandler();
  };
  this.refreshBet = function (t) {
    v.refreshBet(t);
    f.refreshBet(t);
  };
  this.refreshMoney = function (t) {
    A.refreshMoney(t);
  };
  this.showWin = function (t) {
    A.showWin(t);
  };
  this.enablePlus = function (t) {
    v.enablePlus(t);
    f.enablePlus(t);
  };
  this.enableMin = function (t) {
    v.enableMin(t);
    f.enableMin(t);
  };
  this.enablePlay1 = function (t) {
    v.enablePlay1(t);
    f.enablePlay1(t);
  };
  this.enableAutoPlay = function (t) {
    v.enableAutoPlay(t);
    f.enableAutoPlay(t);
  };
  this.enableClear = function (t) {
    v.enableClear(t);
    f.enableClear(t);
  };
  this.enableAllButton = function (t, y) {
    this.enablePlus(t);
    this.enableMin(t);
    this.enablePlay1(t);
    y ? this.enableAutoPlay(!0) : this.enableAutoPlay(t);
    this.enableClear(t);
  };
  s_oInterface = this;
  this._init();
  return this;
}
var s_oInterface = null;

function CPayouts(a, b) {
  var c, e, d;
  this._init = function (g, h) {
    c = new createjs.Container();
    c.x = g;
    c.y = h;
    s_oStage.addChild(c);
    e = new CPaytableLandscape(c);
    d = new CPaytablePortrait(c);
  };
  this.unload = function () {
    s_oStage.removeChild(c);
  };
  this.refreshPos = function () {
    s_bLandscape
      ? (e.setPosition(
          CANVAS_WIDTH / 2 + 5 * CELL_WIDTH * CUR_GRID_SCALE + CELL_WIDTH / 2,
          CANVAS_HEIGHT / 2 -
            4 * CELL_HEIGHT * CUR_GRID_SCALE -
            CELL_HEIGHT / 2 +
            12
        ),
        e.setVisible(!0),
        d.setVisible(!1))
      : (d.setPosition(PAYTABLE_POS_PORTRAIT.x, PAYTABLE_POS_PORTRAIT.y),
        e.setVisible(!1),
        d.setVisible(!0));
  };
  this.updatePayouts = function (g) {
    e.updatePayouts(g);
    return d.updatePayouts(g);
  };
  this.highlightWin = function (g) {
    e.highlightWin(g);
    d.highlightWin(g);
  };
  this.stopHighlight = function () {
    e.stopHighlight();
    d.stopHighlight();
  };
  this._init(a, b);
}

function CAlertText() {
  var a, b;
  this._init = function () {
    b = new createjs.Container();
    b.x = CANVAS_WIDTH / 2;
    b.y = CANVAS_HEIGHT / 2;
    b.visible = !1;
    s_oStage.addChild(b);
    var c = new createjs.Shape();
    c.graphics
      .beginFill("rgba(0,0,0,0.7)")
      .drawRoundRect(-300, 0, 600, 150, 10);
    b.addChild(c);
    a = new createjs.Text("", " 50px " + PRIMARY_FONT, "#fff");
    a.y = 60;
    a.lineWidth = 600;
    a.textAlign = "center";
    a.textBaseline = "alphabetic";
    b.addChild(a);
  };
  this.show = function (c) {
    createjs.Tween.hasActiveTweens(b) ||
      ((a.text = c),
      (b.visible = !0),
      (b.scaleX = b.scaleY = 0.1),
      new createjs.Tween.get(b)
        .to(
          {
            scaleX: 1,
            scaleY: 1,
          },
          600,
          createjs.Ease.cubicOut
        )
        .wait(2e3)
        .to(
          {
            scaleX: 0.1,
            scaleY: 0.1,
          },
          500,
          createjs.Ease.cubicIn
        )
        .call(function () {
          b.visible = !1;
          s_oGame.smartBlockGUI(!0);
        }));
  };
  this._init();
}

function CWinPanel() {
  var a,
    b,
    c,
    e,
    d,
    g,
    h = this;
  this._init = function () {
    b = new createjs.Container();
    b.visible = !1;
    s_oStage.addChild(b);
    e = new createjs.Shape();
    e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    a = e.on("click", this._onExit);
    e.alpha = 0.01;
    b.addChild(e);
    var k = s_oSpriteLibrary.getSprite("msg_box_small");
    c = new createjs.Container();
    c.regX = k.width / 2;
    c.regY = k.height / 2;
    c.x = CANVAS_WIDTH / 2;
    c.y = CANVAS_HEIGHT / 2;
    b.addChild(c);
    createBitmap(k);
    d = new CTLText(
      c,
      0,
      0,
      k.width,
      k.height,
      180,
      "center",
      "#6b1f02",
      PRIMARY_FONT,
      1,
      0,
      0,
      TEXT_CURRENCY + "0.00",
      !0,
      !0,
      !0,
      !1
    );
    d.setOutline(10);
    g = new CTLText(
      c,
      0,
      0,
      k.width,
      k.height,
      180,
      "center",
      "#ffb400",
      PRIMARY_FONT,
      1,
      0,
      0,
      TEXT_CURRENCY + "0.00",
      !0,
      !0,
      !0,
      !1
    );
  };
  this.unload = function () {
    e.off("click", a);
  };
  this.show = function (k, n) {
    n && playSound("win", 1, !1);
    g.refreshText(k);
    d.refreshText(k);
    b.alpha = 1;
    b.visible = !0;
    c.scale = 0.01;
    createjs.Tween.get(c).to(
      {
        scale: 1,
      },
      500,
      createjs.Ease.backOut
    );
    setTimeout(function () {
      createjs.Tween.get(c)
        .to(
          {
            scale: 0,
          },
          400,
          createjs.Ease.backIn
        )
        .call(function () {
          h._onExit();
        });
    }, 2e3);
  };
  this._onExit = function () {
    createjs.Tween.get(b)
      .to(
        {
          alpha: 0,
        },
        500,
        createjs.Ease.cubicOut
      )
      .call(function () {
        s_oGame.onExitFromWinPanel();
      });
  };
  this._init();
}

function CAvatar(a) {
  var b, c, e, d;
  this._init = function () {
    b = -300;
    c = CANVAS_HEIGHT + 100;
    d = new createjs.Container();
    d.x = b;
    d.y = c;
    g.addChild(d);
    for (var h = [], k = 0; 151 > k; k++)
      h.push(s_oSpriteLibrary.getSprite("avatar_" + k));
    h = new createjs.SpriteSheet({
      images: h,
      framerate: 24,
      frames: {
        width: 1012,
        height: 911,
        regX: 0,
        regY: h[0].height,
      },
      animations: {
        idle: [0, 40],
        win_0: [41, 64, "idle"],
        win_1: [65, 95, "idle"],
        start_freespin: [96, 114, "start_lightning"],
        start_lightning: [115, 122, "freespin_loop"],
        freespin_loop: [123, 136],
        end_freespin: [137, 150, "idle"],
      },
    });
    e = createSprite(h, "idle");
    e.on("animationend", this._onAnimationEnd, this);
    d.addChild(e);
    this.refreshPos();
  };
  this.refreshPos = function () {
    d.x = 50 < b + s_iOffsetX ? 50 : b + s_iOffsetX;
    d.y = c - s_iOffsetY;
    s_bLandscape || ((d.scale = CUR_GRID_SCALE), (d.scale *= 0.9));
  };
  this.show = function (h) {
    e.gotoAndPlay(h);
  };
  this._onAnimationEnd = function (h) {
    122 === h.currentTarget.currentFrame && s_oGame.play();
  };
  this.startPlayAnim = function () {
    playSound("avatar_start_spin", 1, !1);
    e.gotoAndPlay("start_freespin");
  };
  this.stopPlayAnim = function () {
    e.gotoAndPlay("end_freespin");
  };
  this.playWin = function () {
    if (0.5 < Math.random()) {
      var h = "win_0";
      playSound("avatar_win_0", 1, !1);
    } else (h = "win_1"), playSound("avatar_win_1", 1, !1);
    e.gotoAndPlay(h);
  };
  this.getThunderPoint = function () {
    var h = d.localToGlobal(670, -98);
    return {
      x: h.x,
      y: h.y,
    };
  };
  var g = a;
  this._init();
}

function CPaytable(a) {
  this._iHighlightIndex;
  this._iCurAlpha = 0;
  this._aHitsText;
  this._aPaysText;
  this._oContainer;
  this._oParentContainer = a;
  this._oThis = this;
}
CPaytable.prototype._init = function () {
  this._oContainer = new createjs.Container();
  this._oParentContainer.addChild(this._oContainer);
};
CPaytable.prototype.setVisible = function (a) {
  this._oContainer.visible = a;
};
CPaytable.prototype.setPosition = function (a, b) {
  this._oContainer.x = a;
  this._oContainer.y = b;
};
CPaytable.prototype.updatePayouts = function (a) {
  if (0 > a)
    for (var b = 0; 6 > b; b++)
      (this._aHitsText[b].text = "-"), (this._aPaysText[b].text = "-");
  else {
    for (b = 0; b < PAYOUTS[a].hits.length; b++)
      (this._aHitsText[b].text = PAYOUTS[a].hits[b]),
        (this._aPaysText[b].text = PAYOUTS[a].pays[b]);
    for (b = PAYOUTS[a].hits.length; 6 > b; b++)
      (this._aHitsText[b].text = "-"), (this._aPaysText[b].text = "-");
    return PAYOUTS[a].hits[PAYOUTS[a].hits.length - 1];
  }
};
CPaytable.prototype.highlightWin = function (a) {
  for (var b = 0; 6 > b; b++)
    if (this._aHitsText[b].text === a) {
      this._iHighlightIndex = b;
      this._flicker(b);
      break;
    }
};
CPaytable.prototype._flicker = function (a) {
  createjs.Tween.get(this._aHitsText[a], {
    loop: -1,
  })
    .to(
      {
        alpha: 0,
      },
      250,
      createjs.Ease.cubicOut
    )
    .to(
      {
        alpha: 1,
      },
      250,
      createjs.Ease.cubicOut
    );
  createjs.Tween.get(this._aPaysText[a], {
    loop: -1,
  })
    .to(
      {
        alpha: 0,
      },
      250,
      createjs.Ease.cubicOut
    )
    .to(
      {
        alpha: 1,
      },
      250,
      createjs.Ease.cubicOut
    );
};
CPaytable.prototype.stopHighlight = function () {
  this._aHitsText[this._iHighlightIndex] &&
    (createjs.Tween.removeTweens(this._aHitsText[this._iHighlightIndex]),
    createjs.Tween.removeTweens(this._aPaysText[this._iHighlightIndex]),
    (this._aHitsText[this._iHighlightIndex].alpha = 1),
    (this._aPaysText[this._iHighlightIndex].alpha = 1));
};

function CPaytableLandscape(a) {
  CPaytable.call(this, a);
  this._init = function () {
    CPaytable.prototype._init.call(this);
    var b = s_oSpriteLibrary.getSprite("payouts_landscape"),
      c = createBitmap(b);
    this._oContainer.addChild(c);
    c = new createjs.Text(TEXT_PAYOUTS, "34px " + PRIMARY_FONT, "#ffffff");
    c.x = b.width / 2;
    c.y = 40;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.lineWidth = 400;
    this._oContainer.addChild(c);
    b = new createjs.Text(TEXT_HITS, " 30px " + PRIMARY_FONT, "#ffffff");
    b.x = 80;
    b.y = 100;
    b.textAlign = "center";
    b.textBaseline = "alphabetic";
    b.lineWidth = 400;
    this._oContainer.addChild(b);
    b = new createjs.Text(TEXT_PAYS, " 30px " + PRIMARY_FONT, "#ffffff");
    b.x = 210;
    b.y = 100;
    b.textAlign = "center";
    b.textBaseline = "alphabetic";
    b.lineWidth = 400;
    this._oContainer.addChild(b);
    this._aHitsText = [];
    this._aPaysText = [];
    for (b = 0; 6 > b; b++)
      (c = 140 + 50 * b),
        (this._aHitsText[b] = new createjs.Text(
          "-",
          "36px " + PRIMARY_FONT,
          "#ffffff"
        )),
        (this._aHitsText[b].x = 80),
        (this._aHitsText[b].y = c),
        (this._aHitsText[b].textAlign = "center"),
        (this._aHitsText[b].textBaseline = "middle"),
        this._oContainer.addChild(this._aHitsText[b]),
        (this._aPaysText[b] = new createjs.Text(
          "-",
          "36px " + PRIMARY_FONT,
          "#ffffff"
        )),
        (this._aPaysText[b].x = 210),
        (this._aPaysText[b].y = c),
        (this._aPaysText[b].textAlign = "center"),
        (this._aPaysText[b].textBaseline = "middle"),
        this._oContainer.addChild(this._aPaysText[b]);
  };
  this._init();
}
CPaytableLandscape.prototype = Object.create(CPaytable.prototype);

function CPaytablePortrait(a) {
  CPaytable.call(this, a);
  this._init = function () {
    CPaytable.prototype._init.call(this);
    var b = s_oSpriteLibrary.getSprite("payouts_portrait"),
      c = createBitmap(b);
    this._oContainer.addChild(c);
    c = new createjs.Text(TEXT_PAYOUTS, " 34px " + PRIMARY_FONT, "#ffffff");
    c.x = b.width / 2;
    c.y = 40;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.lineWidth = 400;
    this._oContainer.addChild(c);
    c = 80;
    var e = 210,
      d = new createjs.Text(TEXT_HITS, " 30px " + PRIMARY_FONT, "#ffffff");
    d.x = c;
    d.y = 100;
    d.textAlign = "center";
    d.textBaseline = "alphabetic";
    d.lineWidth = 400;
    this._oContainer.addChild(d);
    d = new createjs.Text(TEXT_PAYS, " 30px " + PRIMARY_FONT, "#ffffff");
    d.x = e;
    d.y = 100;
    d.textAlign = "center";
    d.textBaseline = "alphabetic";
    d.lineWidth = 400;
    this._oContainer.addChild(d);
    d = new createjs.Text(TEXT_HITS, " 30px " + PRIMARY_FONT, "#ffffff");
    d.x = c + 280;
    d.y = 100;
    d.textAlign = "center";
    d.textBaseline = "alphabetic";
    d.lineWidth = 400;
    this._oContainer.addChild(d);
    d = new createjs.Text(TEXT_PAYS, " 30px " + PRIMARY_FONT, "#ffffff");
    d.x = e + 280;
    d.y = 100;
    d.textAlign = "center";
    d.textBaseline = "alphabetic";
    d.lineWidth = 400;
    this._oContainer.addChild(d);
    d = 140;
    this._aHitsText = [];
    this._aPaysText = [];
    for (var g = 0; 6 > g; g++)
      (this._aHitsText[g] = new createjs.Text(
        "-",
        "36px " + PRIMARY_FONT,
        "#ffffff"
      )),
        (this._aHitsText[g].x = c),
        (this._aHitsText[g].y = d),
        (this._aHitsText[g].textAlign = "center"),
        (this._aHitsText[g].textBaseline = "middle"),
        this._oContainer.addChild(this._aHitsText[g]),
        (this._aPaysText[g] = new createjs.Text(
          "-",
          "36px " + PRIMARY_FONT,
          "#ffffff"
        )),
        (this._aPaysText[g].x = e),
        (this._aPaysText[g].y = d),
        (this._aPaysText[g].textAlign = "center"),
        (this._aPaysText[g].textBaseline = "middle"),
        this._oContainer.addChild(this._aPaysText[g]),
        2 === g ? ((c += 280), (e += 280), (d = 140)) : (d += 50);
    this._oContainer.regX = b.width / 2;
  };
  this._init();
}
CPaytablePortrait.prototype = Object.create(CPaytable.prototype);

function CWinsPanel(a) {
  var b, c, e;
  this._init = function () {
    e = new createjs.Container();
    a.addChild(e);
    var d = s_oSpriteLibrary.getSprite("win_panel"),
      g = createBitmap(d);
    e.addChild(g);
    c = new CTLText(
      e,
      5,
      30,
      d.width - 10,
      d.height - 40,
      40,
      "center",
      "#ffffff",
      PRIMARY_FONT,
      1,
      0,
      0,
      TEXT_CURRENCY + "0.00",
      !0,
      !0,
      !1,
      !1
    );
    var h = s_oSpriteLibrary.getSprite("entries_panel");
    h = createBitmap(h);
    h.y = g.y + d.height + 2;
    e.addChild(h);
    b = new CTLText(
      e,
      5,
      h.y + 30,
      d.width - 10,
      d.height - 40,
      34,
      "center",
      "#ffffff",
      PRIMARY_FONT,
      1,
      0,
      0,
      " ",
      !0,
      !0,
      !1,
      !1
    );
  };
  this.setPosition = function (d, g) {
    e.x = d;
    e.y = g;
  };
  this.showWin = function (d) {
    c.refreshText(formatEntries(d));
  };
  this.refreshMoney = function (d) {
    b.refreshText(formatEntries(d));
  };
  this._init();
}
CTLText.prototype = {
  constructor: CTLText,
  __autofit: function () {
    if (this._bFitText)
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
  setShadow: function (a, b, c, e) {
    null !== this._oText &&
      (this._oText.shadow = new createjs.Shadow(a, b, c, e));
  },
  setColor: function (a) {
    this._oText.color = a;
  },
  setScale: function (a) {
    this._oText.scale = a;
  },
  setAlpha: function (a) {
    this._oText.alpha = a;
  },
  setX: function (a) {
    this._x = this._oText.x = a;
  },
  setY: function (a) {
    this._y = this._oText.y = a;
  },
  setFontSize: function (a) {
    this._iFontSize = a;
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

function CTLText(a, b, c, e, d, g, h, k, n, p, B, q, u, z, w, l, r) {
  this._oContainer = a;
  this._x = b;
  this._y = c;
  this._iWidth = e;
  this._iHeight = d;
  this._bMultiline = l;
  this._iFontSize = g;
  this._szAlign = h;
  this._szColor = k;
  this._szFont = n;
  this._iPaddingH = B;
  this._iPaddingV = q;
  this._bVerticalAlign = w;
  this._bFitText = z;
  this._bDebug = r;
  this._oDebugShape = null;
  this._fLineHeightFactor = p;
  this._oText = null;
  u && this.__createText(u);
}

function CButtonGUI(a) {
  this._oBetDisplay;
  this._oButPlus;
  this._oButMin;
  this._oButPlay1;
  this._oButAutoPlay;
  this._oButClear;
  this._oCurVisiblePanel;
  this._oButtonGUILandscape;
  this._oButtonGUIPortrait;
  this._oContainer;
  this._oParentContainer = a;
  this._oThis = this;
}
CButtonGUI.prototype._init = function () {
  this._oContainer = new createjs.Container();
  this._oParentContainer.addChild(this._oContainer);
  var a = s_oSpriteLibrary.getSprite("but_plus");
  this._oButMin = new CTextToggle(
    0,
    0,
    a,
    TEXT_MIN,
    PRIMARY_FONT,
    "#ffffff",
    70,
    !1,
    this._oContainer
  );
  this._oButMin.enable();
  this._oButMin.setTextPosition(0, 20);
  this._oButMin.setScaleX(-1);
  this._oButMin.addEventListener(ON_MOUSE_UP, this._onButMinRelease, this);
  a = s_oSpriteLibrary.getSprite("plus_display");
  this._oBetDisplay = new CTextButton(
    0,
    0,
    a,
    " ",
    PRIMARY_FONT,
    "#ffffff",
    40,
    "center",
    0,
    0,
    0,
    0,
    this._oContainer
  );
  this._oBetDisplay.setTextPosition(51);
  this._oBetDisplay.block(!0);
  a = s_oSpriteLibrary.getSprite("but_plus");
  this._oButPlus = new CTextToggle(
    0,
    0,
    a,
    TEXT_PLUS,
    PRIMARY_FONT,
    "#ffffff",
    70,
    !1,
    this._oContainer
  );
  this._oButPlus.enable();
  this._oButPlus.setTextPosition(0, 20);
  this._oButPlus.addEventListener(ON_MOUSE_UP, this._onButPlusRelease, this);
  a = s_oSpriteLibrary.getSprite("but_generic");
  this._oButPlay1 = new CTextToggle(
    0,
    0,
    a,
    TEXT_PLAY1,
    PRIMARY_FONT,
    "#ffffff",
    30,
    !1,
    this._oContainer
  );
  this._oButPlay1.enable();
  this._oButPlay1.setTextPosition(0, 10);
  this._oButPlay1.addEventListener(ON_MOUSE_UP, this._onPlay1, this);
  this._oButAutoPlay = new CTextToggle(
    0,
    0,
    a,
    TEXT_AUTOPLAY,
    PRIMARY_FONT,
    "#ffffff",
    30,
    !1,
    this._oContainer
  );
  this._oButAutoPlay.enable();
  this._oButAutoPlay.setTextPosition(0, 10);
  this._oButAutoPlay.addEventListener(ON_MOUSE_UP, this._onAutoPlay, this);
  this._oButClear = new CTextToggle(
    0,
    0,
    a,
    TEXT_CLEAR,
    PRIMARY_FONT,
    "#ffffff",
    30,
    !1,
    this._oContainer
  );
  this._oButClear.enable();
  this._oButClear.setTextPosition(0, 10);
  this._oButClear.addEventListener(ON_MOUSE_UP, this._onClear, this);
};
CButtonGUI.prototype.unload = function () {
  this._oBetDisplay.unload();
  this._oButMin.unload();
  this._oButPlus.unload();
  this._oButPlay1.unload();
  this._oButAutoPlay.unload();
  this._oButClear.unload();
};
CButtonGUI.prototype.setVisible = function (a) {
  this._oContainer.visible = a;
};
CButtonGUI.prototype.setScale = function (a) {
  this._oContainer.scale = a;
};
CButtonGUI.prototype.setPosition = function (a, b) {
  this._oContainer.x = a;
  this._oContainer.y = b;
};
CButtonGUI.prototype.refreshBet = function (a) {
  this._oBetDisplay.setText(formatEntries(a));
};
CButtonGUI.prototype.enablePlus = function (a) {
  a ? this._oButPlus.enable() : this._oButPlus.disable();
};
CButtonGUI.prototype.enableMin = function (a) {
  a ? this._oButMin.enable() : this._oButMin.disable();
};
CButtonGUI.prototype.enablePlay1 = function (a) {
  a ? this._oButPlay1.enable() : this._oButPlay1.disable();
};
CButtonGUI.prototype.enableAutoPlay = function (a) {
  a ? this._oButAutoPlay.enable() : this._oButAutoPlay.disable();
};
CButtonGUI.prototype.enableClear = function (a) {
  a ? this._oButClear.enable() : this._oButClear.disable();
};
CButtonGUI.prototype._onClear = function () {
  s_oGame.clearSelection();
};
CButtonGUI.prototype._onButPlusRelease = function () {
  s_oGame.selectBet("add");
};
CButtonGUI.prototype._onButMinRelease = function () {
  s_oGame.selectBet("remove");
};
CButtonGUI.prototype._onPlay1 = function () {
  s_oGame.startAvatarPlayAnim();
};
CButtonGUI.prototype._onAutoPlay = function () {
  s_oGame.isAutoPlay() ? s_oGame.stopAutoPlay() : s_oGame.autoplay();
  this._oButAutoPlay.setText(s_oGame.isAutoPlay() ? TEXT_STOP : TEXT_AUTOPLAY);
};

function CButtonGUILandscape(a) {
  CButtonGUI.call(this, a);
  this._init = function () {
    CButtonGUI.prototype._init.call(this);
    var b = 0;
    this._oButMin.setX(b);
    var c = s_oSpriteLibrary.getSprite("but_plus");
    b += c.width / 4 + 2;
    var e = s_oSpriteLibrary.getSprite("plus_display");
    b += e.width / 2;
    this._oBetDisplay.setX(b);
    b += e.width / 2 + 2;
    b += c.width / 4;
    this._oButPlus.setX(b);
    b += c.width + 2;
    this._oButClear.setX(b);
    c = s_oSpriteLibrary.getSprite("but_generic");
    b += c.width / 2 + 2;
    this._oButAutoPlay.setX(b);
    b += c.width / 2 + 2;
    this._oButPlay1.setX(b);
    this._oContainer.x = CANVAS_WIDTH / 2;
    this._oContainer.regX = this._oContainer.getBounds().width / 2;
  };
  this._init();
}
CButtonGUILandscape.prototype = Object.create(CButtonGUI.prototype);

function CButtonGUIPortrait(a) {
  CButtonGUI.call(this, a);
  this._init = function () {
    CButtonGUI.prototype._init.call(this);
    var b = 0;
    this._oButMin.setX(b);
    var c = s_oSpriteLibrary.getSprite("but_plus");
    b += c.width / 4 + 2;
    var e = s_oSpriteLibrary.getSprite("plus_display");
    b += e.width / 2;
    this._oBetDisplay.setX(b);
    this._oButClear.setPosition(b, e.height + 10);
    b += e.width / 2 + 2;
    b += c.width / 4;
    this._oButPlus.setX(b);
    b += c.width + 20;
    this._oButPlay1.setX(b);
    this._oButAutoPlay.setPosition(b, e.height + 10);
    this._oContainer.x = CANVAS_WIDTH / 2;
    this._oContainer.regX = this._oContainer.getBounds().width / 2;
  };
  this._init();
}
CButtonGUIPortrait.prototype = Object.create(CButtonGUI.prototype);
var DEBUG_SHOW_THUNDER_POINT_JOINT = !1,
  DEBUG_SHOW_BOUNDS_SHAPE = !1,
  MAX_OFFSET = 13,
  NUMBER_OF_JOINT = 30;

function CThunderBolt(a) {
  var b,
    c,
    e,
    d,
    g,
    h,
    k,
    n,
    p,
    B,
    q,
    u,
    z,
    w = this;
  this._init = function (l) {
    e = [];
    d = [];
    g = l;
    h = new createjs.Container();
    g.addChild(h);
    q = [];
    z = [];
    u = !0;
    DEBUG_SHOW_BOUNDS_SHAPE && ((k = new createjs.Shape()), h.addChild(k));
    n = new createjs.Rectangle(0, 0, 0, 0);
    c = b = 0;
    p = [];
  };
  this.addEventListener = function (l, r, v) {
    e[l] = r;
    d[l] = v;
  };
  this.createThunder = function (l, r, v) {
    q.push(this._createThunderJoint(l, r, v));
  };
  this._createThunderJoint = function (l, r, v) {
    var f = new createjs.Shape();
    h.addChild(f);
    var A = f.graphics,
      x = lineInterpolate(r, v, NUMBER_OF_JOINT);
    x.push(v);
    A.beginStroke(l.color).setStrokeStyle(l.thickness);
    var t = [];
    t.push(A.moveTo(r.x, r.y).command);
    for (var y = 1; y < x.length; y++)
      if (
        (t.push(A.lineTo(x[y].x + l.offset.x, x[y].y + l.offset.y).command),
        DEBUG_SHOW_THUNDER_POINT_JOINT)
      ) {
        var L = new createjs.Shape();
        L.graphics
          .beginFill("rgba(255,0,0,0.5)")
          .drawCircle(0, 0, 10)
          .endFill();
        L.x = x[y].x;
        L.y = x[y].y;
        h.addChild(L);
      }
    A.endStroke();
    if ((y = l.glow))
      f.shadow = new createjs.Shadow(y.color, y.offset.x, y.offset.y, y.blur);
    u && A.store();
    A = Math.abs(l.offset.x) + l.tremble;
    b = A > b ? A : b;
    A = Math.abs(l.offset.y) + l.tremble;
    c = A > c ? A : c;
    this._refreshRectArea(r, v);
    return {
      shape: f,
      commands: t,
      points: x,
      frequences: l.frequences,
      frequence_id: this._randomizeFrequenceID(l.frequences),
      time: 0,
      tremble: l.tremble,
      offset: l.offset,
      start: r,
      end: v,
    };
  };
  this._randomizeFrequenceID = function (l) {
    return Math.round(Math.random() * l.length);
  };
  this._refreshRectArea = function (l, r) {
    var v = l.x,
      f = l.y,
      A = r.x,
      x = r.y;
    l.x > r.x && ((v = r.x), (A = l.x));
    l.y > r.y && ((f = r.y), (x = l.y));
    n.setValues(v - b, f - c, A + b, x + c);
    DEBUG_SHOW_BOUNDS_SHAPE &&
      (k.graphics.clear(),
      k.graphics
        .beginFill("red")
        .drawRect(n.x, n.y, n.width - n.x, n.height - n.y));
  };
  this.updatePosition = function (l, r) {
    var v = lineInterpolate(l, r, NUMBER_OF_JOINT);
    v.push(r);
    this._refreshRectArea(l, r);
    for (var f = 0; f < q.length; f++) {
      var A = q[f].offset;
      q[f].commands[0].x = l.x;
      q[f].commands[0].y = l.y;
      q[f].start = l;
      q[f].end = r;
      var x = q[f].points;
      q[f].points[0] = l;
      for (var t = 1; t < v.length; t++)
        (x[t].x = v[t].x + A.x), (x[t].y = v[t].y + A.y);
    }
  };
  this.getLastCommandIDByThunderID = function (l) {
    return q[l].commands.length - 1;
  };
  this.removeAllEventListenerTweenEndToStartPoint = function () {
    for (var l = 0; l < z.length; l++)
      z[l] && (z[l].removeAllEventListeners(), (z[l] = null));
  };
  this.removeTweensEndToStartPoint = function () {
    for (var l = 0; l < q.length; l++)
      createjs.Tween.removeTweens(q[l].points[0]);
  };
  this.tweenEndPointToStartPoint = function (l, r, v) {
    v = void 0 === v ? createjs.Ease.cubicOut : v;
    this.removeAllEventListenerTweenEndToStartPoint();
    for (var f = 0; f < q.length; f++) {
      createjs.Tween.removeTweens(q[f].points[0]);
      var A = this.getLastCommandIDByThunderID(f),
        x = q[f].points[A];
      A = createjs.Tween.get(q[f].points[0], {
        override: !0,
      })
        .wait(l)
        .to(
          {
            x: x.x,
            y: x.y,
          },
          r,
          v
        );
      A.on(
        "change",
        function (t) {
          this.updatePosition(t.target.target, x);
        },
        this
      );
      z[f] = A;
    }
  };
  this.tweenStartPointToEndPoint = function (l, r, v, f) {
    this.removeAllEventListenerTweenEndToStartPoint();
    for (var A = 0; A < q.length; A++) {
      createjs.Tween.removeTweens(q[A].points[0]);
      var x = this.getLastCommandIDByThunderID(A);
      B = v;
      var t = q[A].points[0];
      x = createjs.Tween.get(q[A].points[x], {
        override: !0,
      })
        .wait(l)
        .to(
          {
            x: B.x,
            y: B.y,
          },
          r,
          createjs.Ease.cubicOut
        );
      x.on(
        "change",
        function (y) {
          this.updatePosition(t, y.target.target);
        },
        this
      );
      x.on("complete", function () {
        w.unload();
        playSound("thunder", 1, !1);
        e[ON_END_THUNDER] && e[ON_END_THUNDER].call(d[ON_END_THUNDER], w, f);
      });
      z[A] = x;
    }
  };
  this._randomizeThunderPoint = function (l, r, v) {
    var f = r.x + randomIntBetween(-v, v);
    r = r.y + randomIntBetween(-v, v);
    l.x = f;
    l.y = r;
  };
  this.optimizeDrawCallingByFrequenceTime = function (l) {
    u = l;
    if (!u) for (l = 0; l < q.length; l++) q[l].shape.graphics.unstore();
  };
  this.isOptimzed = function () {
    return u;
  };
  this.addParticle = function (l, r) {
    p.push({
      bitmap: l,
      update_time: r.update_time,
      max_pos_offset: r.max_pos_offset,
      time: 0,
    });
    h.addChild(l);
  };
  this._updateThunders = function () {
    for (var l = 0; l < q.length; l++) {
      var r = q[l].shape;
      u && r.graphics.unstore();
      if (q[l].time < q[l].frequences[q[l].frequence_id])
        q[l].time += s_iTimeElaps;
      else {
        q[l].time = 0;
        q[l].frequence_id = this._randomizeFrequenceID(q[l].frequences);
        for (var v = q[l].commands, f = q[l].points, A = 1; A < v.length; A++)
          this._randomizeThunderPoint(v[A], f[A], q[l].tremble);
        u && r.graphics.store();
      }
    }
  };
  this._updateParticles = function () {
    for (var l = 0; l < p.length; l++) {
      var r = p[l].update_time;
      p[l].time += s_iTimeElaps;
      if (!(p[l].time < r)) {
        p[l].time = 0;
        r = randomIntBetween(-p[l].max_pos_offset, p[l].max_pos_offset);
        var v = p[l].bitmap,
          f = Math.floor(Math.random() * q.length);
        f = q[f].points[Math.floor(Math.random() * q[f].points.length)];
        v.x = f.x + r;
        v.y = f.y + r;
      }
    }
  };
  this.unload = function () {
    this.removeAllEventListenerTweenEndToStartPoint();
    this.removeTweensEndToStartPoint();
    q = [];
    z = [];
    p = [];
    g.removeChild(h);
  };
  this.update = function () {
    0 > q.length || (this._updateThunders(), this._updateParticles());
  };
  this._init(a);
}

function CExplosion(a, b, c) {
  var e;
  this._init = function (d, g) {
    for (var h = [], k = 0; 39 > k; k++)
      h.push(s_oSpriteLibrary.getSprite("symbol_explosion_" + k));
    k = new createjs.SpriteSheet({
      images: h,
      framerate: 30,
      frames: {
        width: h[0].width,
        height: h[0].height,
        regX: h[0].width / 2,
        regY: h[0].height / 2,
      },
      animations: {
        start: 0,
        anim: [0, 38, "end_anim"],
        end_anim: 0,
      },
    });
    e = createSprite(
      k,
      "anim",
      h[0].width / 2,
      h[0].height / 2,
      h[0].width,
      h[0].height
    );
    e.x = d;
    e.y = g;
    e.on("animationend", this.onExplosionAnimEnd, this);
    c.addChild(e);
  };
  this.onExplosionAnimEnd = function (d) {
    "end_anim" === d.name && c.removeChild(e);
  };
  this._init(a, b);
}

function CHighlightCell(a, b, c) {
  var e;
  this._init = function (d, g) {
    for (var h = [], k = 0; 14 > k; k++)
      h.push(s_oSpriteLibrary.getSprite("frame_selection_" + k));
    k = new createjs.SpriteSheet({
      images: h,
      framerate: 30,
      frames: {
        width: h[0].width,
        height: h[0].height,
        regX: h[0].width / 2,
        regY: h[0].height / 2,
      },
      animations: {
        start: 0,
        anim: [0, 13],
      },
    });
    e = createSprite(
      k,
      "anim",
      h[0].width / 2,
      h[0].height / 2,
      h[0].width,
      h[0].height
    );
    e.x = d;
    e.y = g;
    c.addChild(e);
  };
  this.unload = function () {
    c.removeChild(e);
  };
  this._init(a, b);
}

function CMenu() {
  var a,
    b,
    c,
    e,
    d,
    g,
    h,
    k,
    n = null,
    p = null,
    B,
    q,
    u,
    z,
    w,
    l,
    r,
    v;
  this._init = function () {
    B = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
    s_oStage.addChild(B);
    var f = s_oSpriteLibrary.getSprite("logo_menu"),
      A = createBitmap(f);
    A.regX = f.width / 2;
    A.regY = f.height / 2;
    A.x = CANVAS_WIDTH / 2;
    A.y = CANVAS_HEIGHT / 2 - 200;
    A.alpha = 0;
    A.scale = 0;
    s_oStage.addChild(A);
    f = s_oSpriteLibrary.getSprite("but_play");
    q = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 250, f, s_oStage);
    q.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
      (f = s_oSpriteLibrary.getSprite("audio_icon")),
        (h = CANVAS_WIDTH - f.width / 4 - 4),
        (k = f.height / 2 + 4),
        (z = new CToggle(h, k, f, s_bAudioActive, s_oStage)),
        z.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
    f = s_oSpriteLibrary.getSprite("but_credits");
    a = f.width / 2 + 4;
    b = f.height / 2 + 4;
    w = new CGfxButton(a, b, f, s_oStage);
    w.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this);
    d = a + f.width + 4;
    g = b;
    f = window.document;
    var x = f.documentElement;
    n =
      x.requestFullscreen ||
      x.mozRequestFullScreen ||
      x.webkitRequestFullScreen ||
      x.msRequestFullscreen;
    p =
      f.exitFullscreen ||
      f.mozCancelFullScreen ||
      f.webkitExitFullscreen ||
      f.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (n = !1);
    n &&
      screenfull.isEnabled &&
      ((f = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (l = new CToggle(d, g, f, s_bFullscreen, s_oStage)),
      l.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    f = s_oSpriteLibrary.getSprite("but_delete_savings");
    c = f.width / 2 + 4;
    e = CANVAS_HEIGHT - f.height / 2 - 4;
    u = new CGfxButton(c, e, f, s_oStage);
    u.addEventListener(ON_MOUSE_UP, this._onDeleteSavings, this);
    s_bStorageAvailable
      ? !RESTART_CREDIT && getItem(LOCALSTORAGE_STRING + "score")
        ? (TOTAL_MONEY = parseFloat(getItem(LOCALSTORAGE_STRING + "score")))
        : u.setVisible(!1)
      : (new CMsgBox().show(TEXT_ERR_LS), u.setVisible(!1));
    v = new CAreYouSurePanel();
    v.addEventListener(ON_BUT_YES_DOWN, this._onExitYes, this);
    r = new createjs.Shape();
    r.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    s_oStage.addChild(r);
    createjs.Tween.get(r)
      .to(
        {
          alpha: 0,
        },
        400
      )
      .call(function () {
        r.visible = !1;
      });
    this.refreshButtonPos();
    createjs.Tween.get(A).to(
      {
        alpha: 1,
      },
      800,
      createjs.Ease.quintOut
    );
    createjs.Tween.get(A).to(
      {
        scale: 1,
      },
      800,
      createjs.Ease.backOut
    );
  };
  this.unload = function () {
    q.unload();
    q = null;
    u.unload();
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) z.unload(), (z = null);
    w.unload();
    n && screenfull.isEnabled && l.unload();
    s_oStage.removeAllChildren();
    s_oMenu = null;
  };
  this.refreshButtonPos = function () {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      z.setPosition(h - s_iOffsetX, s_iOffsetY + k);
    w.setPosition(a + s_iOffsetX, b + s_iOffsetY);
    n && screenfull.isEnabled && l.setPosition(d + s_iOffsetX, g + s_iOffsetY);
    u.setPosition(c + s_iOffsetX, e - s_iOffsetY);
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
    n && screenfull.isEnabled && l.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? p.call(window.document)
      : n.call(window.document.documentElement);
    sizeHandler();
  };
  this._onDeleteSavings = function () {
    v.show(
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
    u.setVisible(!1);
  };
  s_oMenu = this;
  this._init();
}
var s_oMenu = null;

function CCreditsPanel() {
  var a,
    b,
    c,
    e,
    d,
    g,
    h,
    k,
    n = this;
  this._init = function () {
    k = new createjs.Container();
    s_oStage.addChild(k);
    c = new createjs.Shape();
    b = c.on("click", function () {});
    c.alpha = 0;
    c.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    k.addChild(c);
    e = new createjs.Container();
    k.addChild(e);
    var p = s_oSpriteLibrary.getSprite("msg_box_small");
    h = createBitmap(p);
    h.regX = p.width / 2;
    h.regY = p.height / 2;
    e.addChild(h);
    a = h.on("click", this._onLogoButRelease);
    e.x = CANVAS_WIDTH / 2;
    e.y = CANVAS_HEIGHT / 2;
    p = new createjs.Text(
      "www.codethislab.com",
      "52px " + PRIMARY_FONT,
      "#fff"
    );
    p.y = 40;
    p.textAlign = "center";
    p.textBaseline = "alphabetic";
    p.lineWidth = 300;
    e.addChild(p);
    p = s_oSpriteLibrary.getSprite("ctl_logo");
    g = createBitmap(p);
    g.y = -150;
    g.regX = p.width / 2;
    g.regY = p.height / 2;
    e.addChild(g);
    p = s_oSpriteLibrary.getSprite("but_yes");
    d = new CGfxButton(0, 150, p, e);
    d.addEventListener(ON_MOUSE_UP, this.hide, this);
    e.scale = 0;
    c.alpha = 0;
    createjs.Tween.get(c).to(
      {
        alpha: 0.7,
      },
      300,
      createjs.Ease.quartOut
    );
    createjs.Tween.get(e).to(
      {
        scale: 1,
      },
      1e3,
      createjs.Ease.elasticOut
    );
  };
  this.unload = function () {
    createjs.Tween.get(k)
      .to(
        {
          alpha: 0,
        },
        500
      )
      .call(function () {
        s_oStage.removeChild(k);
        d.unload();
      });
    c.off("click", b);
    h.off("click", a);
  };
  this._onLogoButRelease = function () {
    window.open("http://www.codethislab.com/index.php?&l=en");
  };
  this.hide = function () {
    d.disable();
    createjs.Tween.get(c).to(
      {
        alpha: 0,
      },
      500,
      createjs.Ease.quartOut
    );
    createjs.Tween.get(e)
      .to(
        {
          scale: 0,
        },
        500,
        createjs.Ease.backIn
      )
      .call(function () {
        n.unload();
      });
  };
  this._init();
}
var SLOT_CASH = 100,
  COIN_BETS,
  _aCombination,
  _iHitsNumber;

function APIgetSlotInfos(a, b) {
  a.call(b, {
    start_money: TOTAL_MONEY,
    bets: COIN_BETS,
  });
}

function apiAttemptKenoSpin(a, b, c, e, d) {
  for (var g = b.length, h = null, k = 0; k < PAYOUTS[g - 1].pays.length; k++)
    if (PAYOUTS[g - 1].pays[k] * a <= SLOT_CASH) {
      h = k;
      break;
    }
  a =
    null === h
      ? this._extractLosingCombination(g, b, c)
      : this._checkWin(h, g, b, c);
  e.call(d, a);
}
this._extractLosingCombination = function (a, b, c) {
  a = Math.round(
    Math.random() * (PAYOUTS[a - 1].hits[PAYOUTS[a - 1].hits.length - 1] - 1)
  );
  for (var e = [], d = 0; d < b.length; d++) e[d] = b[d] + 1;
  shuffle(e);
  b = [];
  for (d = 0; d < c.length; d++) c[d] || b.push(d + 1);
  shuffle(b);
  c = [];
  for (d = 0; 20 > d; d++) d < a ? c.push(e[d]) : c.push(b[d]);
  shuffle(c);
  return {
    extracted: c,
    tot_guessed: 0,
  };
};
this._checkWin = function (a, b, c, e) {
  return 100 * Math.random() < WIN_OCCURRENCE[b - 1]
    ? this._extractWinCombination(a, b, c, e)
    : this._extractLosingCombination(b, c, e);
};
this._extractWinCombination = function (a, b, c, e) {
  for (var d = [], g = PAYOUTS[b - 1].pays.length - 1; g >= a; g--)
    for (var h = 0; h < PAYOUTS[b - 1].occurrence[g]; h++)
      d.push(PAYOUTS[b - 1].hits[g]);
  a = Math.floor(Math.random() * d.length);
  b = [];
  for (g = 0; g < c.length; g++) b[g] = c[g] + 1;
  shuffle(b);
  c = [];
  for (g = 0; g < e.length; g++) e[g] || c.push(g + 1);
  shuffle(c);
  e = [];
  for (g = 0; 20 > g; g++) g < d[a] ? e.push(b[g]) : e.push(c[g]);
  shuffle(e);
  return {
    extracted: e,
    tot_guessed: d[a],
  };
};
this._extractLosingCombination = function (a, b, c) {
  a = Math.round(
    Math.random() * (PAYOUTS[a - 1].hits[PAYOUTS[a - 1].hits.length - 1] - 1)
  );
  for (var e = [], d = 0; d < b.length; d++) e[d] = b[d] + 1;
  shuffle(e);
  b = [];
  for (d = 0; d < c.length; d++) c[d] || b.push(d + 1);
  shuffle(b);
  c = [];
  for (d = 0; 20 > d; d++) d < a ? c.push(e[d]) : c.push(b[d]);
  shuffle(c);
  return {
    extracted: c,
    tot_guessed: 0,
  };
};

function refreshCredit(a, b, c) {
  TOTAL_MONEY = a;
  b.call(c, TOTAL_MONEY);
}

function formatEntries(a) {
  return a.toFixed(2);
}

function CAreYouSurePanel() {
  var a,
    b,
    c,
    e,
    d,
    g,
    h,
    k,
    n,
    p,
    B = this;
  this._init = function () {
    a = [];
    b = [];
    n = new createjs.Container();
    n.visible = !1;
    s_oStage.addChild(n);
    p = new createjs.Shape();
    c = p.on("click", function () {});
    p.alpha = 0;
    p.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    n.addChild(p);
    var q = s_oSpriteLibrary.getSprite("msg_box_small");
    k = new createjs.Container();
    k.x = CANVAS_WIDTH / 2;
    k.y = CANVAS_HEIGHT / 2;
    k.regX = 0.5 * q.width;
    k.regY = 0.5 * q.height;
    n.addChild(k);
    e = createBitmap(q);
    k.addChild(e);
    d = new CTLText(
      k,
      50,
      60,
      q.width - 100,
      180,
      90,
      "center",
      "#ffba00",
      PRIMARY_FONT,
      1,
      0,
      0,
      TEXT_ARE_SURE,
      !0,
      !0,
      !0,
      !1
    );
    g = new CGfxButton(
      q.width - 170,
      380,
      s_oSpriteLibrary.getSprite("but_yes"),
      k
    );
    g.addEventListener(ON_MOUSE_UP, this._onButYes, this);
    h = new CGfxButton(170, 380, s_oSpriteLibrary.getSprite("but_no"), k);
    h.addEventListener(ON_MOUSE_UP, this._onButNo, this);
    this.disableButtons();
  };
  this.addEventListener = function (q, u, z) {
    a[q] = u;
    b[q] = z;
  };
  this.disableButtons = function () {
    g.disable();
    h.disable();
  };
  this.enableButtons = function () {
    h.enable();
    g.enable();
  };
  this.show = function (q) {
    d.refreshText(q);
    n.visible = !0;
    k.scale = 0;
    p.alpha = 0;
    createjs.Tween.get(p).to(
      {
        alpha: 0.7,
      },
      300,
      createjs.Ease.quartOut
    );
    createjs.Tween.get(k)
      .to(
        {
          scale: 1,
        },
        1e3,
        createjs.Ease.elasticOut
      )
      .call(function () {
        s_oMain.stopUpdateNoBlock();
        B.enableButtons();
      });
  };
  this.hide = function (q) {
    s_oMain.startUpdateNoBlock();
    createjs.Tween.get(p).to(
      {
        alpha: 0,
      },
      500,
      createjs.Ease.quartOut
    );
    createjs.Tween.get(k)
      .to(
        {
          scale: 0,
        },
        500,
        createjs.Ease.backIn
      )
      .call(function () {
        n.visible = !1;
        q && a[ON_BUT_YES_DOWN] && a[ON_BUT_YES_DOWN].call(b[ON_BUT_YES_DOWN]);
      });
  };
  this.unload = function () {
    h.unload();
    g.unload();
    p.off("click", c);
  };
  this._onButYes = function () {
    B.disableButtons();
    B.hide(!0);
  };
  this._onButNo = function () {
    B.disableButtons();
    B.hide(!1);
  };
  this._init();
}

function CGUIExpandible(a, b, c, e) {
  var d,
    g,
    h = [],
    k = [],
    n,
    p,
    B,
    q,
    u,
    z,
    w;
  this._init = function (r, v, f, A) {
    n = !0;
    B = [];
    u = new createjs.Container();
    u.x = r;
    u.y = v;
    A.addChild(u);
    z = new createjs.Container();
    u.addChild(z);
    w = new createjs.Container();
    u.addChild(w);
    p = !1;
    q = new CGfxButton(0, 0, f, w);
    q.addEventListener(ON_MOUSE_UP, this.onMenu, this);
    d = {
      x: 0,
      y: 130,
    };
    g = 130;
  };
  this.unload = function () {
    q.unload();
    e.removeChild(u);
  };
  this.setPos = function (r, v) {
    u.x = r;
    u.y = v;
    d = s_bLandscape
      ? {
          x: 130,
          y: 0,
        }
      : {
          x: 0,
          y: 130,
        };
    g = 130;
  };
  this.reset = function () {
    if (p) this.onMenu();
  };
  this.addButton = function (r) {
    r = r.getButtonImage();
    r.x = 0;
    r.y = 0;
    r.visible = 0;
    z.addChildAt(r, 0);
    B.push(r);
  };
  this.onMenu = function () {
    n && ((p = !p) ? l._expand() : l._collapse());
  };
  this._expand = function () {
    h[ON_EXPAND] && h[ON_EXPAND].call(k[ON_EXPAND]);
    for (var r = 0; r < B.length; r++)
      (B[r].visible = !0),
        s_bLandscape
          ? createjs.Tween.get(B[r], {
              override: !0,
            })
              .wait((300 * r) / 2)
              .to(
                {
                  x: d.x + r * g,
                },
                300,
                createjs.Ease.cubicOut
              )
          : createjs.Tween.get(B[r], {
              override: !0,
            })
              .wait((300 * r) / 2)
              .to(
                {
                  y: d.y + r * g,
                },
                300,
                createjs.Ease.cubicOut
              );
  };
  this._collapse = function () {
    h[ON_COLLAPSE] && h[ON_COLLAPSE].call(k[ON_COLLAPSE]);
    for (var r = 0; r < B.length; r++) {
      var v = B[B.length - 1 - r];
      createjs.Tween.get(v, {
        override: !0,
      })
        .wait((300 * r) / 2)
        .to(
          {
            x: 0,
            y: 0,
          },
          300,
          createjs.Ease.cubicOut
        )
        .call(
          function (f) {
            f.visible = !1;
          },
          [v]
        );
    }
  };
  this.addEventListener = function (r, v, f) {
    h[r] = v;
    k[r] = f;
  };
  this.enable = function () {
    n = !0;
    q.setActive(!0);
  };
  this.disable = function () {
    n = !1;
    q.setActive(!1);
  };
  this.isExpanded = function () {
    return p;
  };
  var l = this;
  this._init(a, b, c, e);
}

function CRechargePanel() {
  var a,
    b,
    c,
    e,
    d,
    g,
    h,
    k = this;
  this._init = function () {
    h = new createjs.Container();
    s_oStage.addChild(h);
    b = new createjs.Shape();
    a = b.on("click", function () {});
    b.alpha = 0;
    b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    h.addChild(b);
    var n = s_oSpriteLibrary.getSprite("msg_box_small");
    c = new createjs.Container();
    c.x = CANVAS_WIDTH / 2;
    c.y = CANVAS_HEIGHT / 2;
    c.regX = 0.5 * n.width;
    c.regY = 0.5 * n.height;
    h.addChild(c);
    g = createBitmap(n);
    c.addChild(g);
    new CTLText(
      c,
      50,
      60,
      n.width - 100,
      270,
      90,
      "center",
      "#ffba00",
      PRIMARY_FONT,
      1,
      40,
      10,
      TEXT_NO_MONEY + "\n" + TEXT_RECHARGE,
      !0,
      !0,
      !0,
      !1
    );
    var p = s_oSpriteLibrary.getSprite("but_no");
    d = new CGfxButton(140, 410, p, c);
    d.addEventListener(ON_MOUSE_UP, this.hide, this);
    e = new CGfxButton(
      n.width - 140,
      410,
      s_oSpriteLibrary.getSprite("but_yes"),
      c
    );
    e.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
    this.disableButtons();
    h.visible = !0;
    c.scale = 0;
    b.alpha = 0;
    createjs.Tween.get(b).to(
      {
        alpha: 0.7,
      },
      300,
      createjs.Ease.quartOut
    );
    createjs.Tween.get(c)
      .to(
        {
          scale: 1,
        },
        1e3,
        createjs.Ease.elasticOut
      )
      .call(function () {
        k.enableButtons();
      });
  };
  this.unload = function () {
    d.unload();
    e.unload();
    b.off("click", a);
    s_oStage.removeChild(h);
  };
  this.disableButtons = function () {
    e.disable();
    d.disable();
  };
  this.enableButtons = function () {
    d.enable();
    e.enable();
  };
  this.hide = function () {
    var n = this;
    createjs.Tween.get(b).to(
      {
        alpha: 0,
      },
      500,
      createjs.Ease.quartOut
    );
    createjs.Tween.get(c)
      .to(
        {
          scale: 0,
        },
        500,
        createjs.Ease.backIn
      )
      .call(function () {
        n.unload();
      });
  };
  this._onRecharge = function () {
    k.hide();
    $(s_oMain).trigger("recharge");
  };
  this._init();
}

function CMsgBox() {
  var a, b, c, e, d, g, h;
  this._init = function () {
    h = new createjs.Container();
    h.visible = !1;
    s_oStage.addChild(h);
    b = new createjs.Shape();
    b.graphics
      .beginFill("rgba(0,0,0,0.7)")
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    a = b.on("click", function () {});
    h.addChild(b);
    var k = s_oSpriteLibrary.getSprite("msg_box");
    g = new createjs.Container();
    g.x = CANVAS_WIDTH / 2;
    g.y = CANVAS_HEIGHT / 2;
    g.regX = k.width / 2;
    g.regY = k.height / 2;
    g.scale = 0;
    h.addChild(g);
    c = createBitmap(k);
    g.addChild(c);
    e = new CTLText(
      g,
      70,
      60,
      k.width - 140,
      650,
      62,
      "center",
      "#ffba00",
      PRIMARY_FONT,
      1,
      0,
      0,
      " ",
      !0,
      !0,
      !0,
      !1
    );
    d = new CGfxButton(
      k.width / 2,
      k.height - 150,
      s_oSpriteLibrary.getSprite("but_yes"),
      g
    );
    d.addEventListener(ON_MOUSE_UP, this._onExit, this);
  };
  this.unload = function () {
    b.off("click", a);
    d.unload();
  };
  this.show = function (k) {
    e.refreshText(k);
    h.visible = !0;
    b.alpha = 0;
    createjs.Tween.get(b).to(
      {
        alpha: 0.7,
      },
      300,
      createjs.Ease.quartOut
    );
    createjs.Tween.get(g).to(
      {
        scale: 1,
      },
      1e3,
      createjs.Ease.elasticOut
    );
  };
  this.hide = function () {
    d.disable();
    var k = this;
    createjs.Tween.get(b).to(
      {
        alpha: 0,
      },
      500,
      createjs.Ease.quartOut
    );
    createjs.Tween.get(g)
      .to(
        {
          scale: 0,
        },
        500,
        createjs.Ease.backIn
      )
      .call(function () {
        k.unload();
      });
  };
  this._onExit = function () {
    this.hide();
  };
  this._init();
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
        } catch (d) {
          var e = window.location.ancestorOrigins;
          c = e[e.length - 1];
        }
      } catch (d) {
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
