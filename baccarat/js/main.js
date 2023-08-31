
!(function () {
  var a =
      "undefined" != typeof window && void 0 !== window.document
        ? window.document
        : {},
    d = "undefined" != typeof module && module.exports,
    b = (function () {
      for (
        var f,
          q = [
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
          n = q.length,
          t = {};
        l < n;
        l++
      )
        if ((f = q[l]) && f[1] in a) {
          for (l = 0; l < f.length; l++) t[q[0][l]] = f[l];
          return t;
        }
      return !1;
    })(),
    c = {
      change: b.fullscreenchange,
      error: b.fullscreenerror,
    },
    e = {
      request: function (f) {
        return new Promise(
          function (q, l) {
            var n = function () {
              this.off("change", n);
              q();
            }.bind(this);
            this.on("change", n);
            f = f || a.documentElement;
            Promise.resolve(f[b.requestFullscreen]())["catch"](l);
          }.bind(this)
        );
      },
      exit: function () {
        return new Promise(
          function (f, q) {
            if (this.isFullscreen) {
              var l = function () {
                this.off("change", l);
                f();
              }.bind(this);
              this.on("change", l);
              Promise.resolve(a[b.exitFullscreen]())["catch"](q);
            } else f();
          }.bind(this)
        );
      },
      toggle: function (f) {
        return this.isFullscreen ? this.exit() : this.request(f);
      },
      onchange: function (f) {
        this.on("change", f);
      },
      onerror: function (f) {
        this.on("error", f);
      },
      on: function (f, q) {
        var l = c[f];
        l && a.addEventListener(l, q, !1);
      },
      off: function (f, q) {
        var l = c[f];
        l && a.removeEventListener(l, q, !1);
      },
      raw: b,
    };
  b
    ? (Object.defineProperties(e, {
        isFullscreen: {
          get: function () {
            return !!a[b.fullscreenElement];
          },
        },
        element: {
          enumerable: !0,
          get: function () {
            return a[b.fullscreenElement];
          },
        },
        isEnabled: {
          enumerable: !0,
          get: function () {
            return !!a[b.fullscreenEnabled];
          },
        },
      }),
      d ? (module.exports = e) : (window.screenfull = e))
    : d
    ? (module.exports = {
        isEnabled: !1,
      })
    : (window.screenfull = {
        isEnabled: !1,
      });
})();
(function () {
  function a(p) {
    p = String(p);
    return p.charAt(0).toUpperCase() + p.slice(1);
  }

  function d(p, J) {
    var I = -1,
      F = p ? p.length : 0;
    if ("number" == typeof F && -1 < F && F <= u)
      for (; ++I < F; ) J(p[I], I, p);
    else c(p, J);
  }

  function b(p) {
    p = String(p).replace(/^ +| +$/g, "");
    return /^(?:webOS|i(?:OS|P))/.test(p) ? p : a(p);
  }

  function c(p, J) {
    for (var I in p) m.call(p, I) && J(p[I], I, p);
  }

  function e(p) {
    return null == p ? a(p) : z.call(p).slice(8, -1);
  }

  function f(p, J) {
    var I = null != p ? typeof p[J] : "number";
    return (
      !/^(?:boolean|number|string|undefined)$/.test(I) &&
      ("object" == I ? !!p[J] : !0)
    );
  }

  function q(p) {
    return String(p).replace(/([ -])(?!$)/g, "$1?");
  }

  function l(p, J) {
    var I = null;
    d(p, function (F, G) {
      I = J(I, F, G, p);
    });
    return I;
  }

  function n(p) {
    function J(R) {
      return l(R, function (O, N) {
        var T = N.pattern || q(N);
        !O &&
          (O =
            RegExp("\\b" + T + " *\\d+[.\\w_]*", "i").exec(p) ||
            RegExp("\\b" + T + " *\\w+-[\\w]*", "i").exec(p) ||
            RegExp(
              "\\b" + T + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)",
              "i"
            ).exec(p)) &&
          ((O = String(
            N.label && !RegExp(T, "i").test(N.label) ? N.label : O
          ).split("/"))[1] &&
            !/[\d.]+/.test(O[0]) &&
            (O[0] += " " + O[1]),
          (N = N.label || N),
          (O = b(
            O[0]
              .replace(RegExp(T, "i"), N)
              .replace(RegExp("; *(?:" + N + "[_-])?", "i"), " ")
              .replace(RegExp("(" + N + ")[-_.]?(\\w)", "i"), "$1 $2")
          )));
        return O;
      });
    }

    function I(R) {
      return l(R, function (O, N) {
        return (
          O ||
          (RegExp(
            N + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)",
            "i"
          ).exec(p) || 0)[1] ||
          null
        );
      });
    }
    var F = v,
      G = p && "object" == typeof p && "String" != e(p);
    G && ((F = p), (p = null));
    var P = F.navigator || {},
      y = P.userAgent || "";
    p || (p = y);
    var H = G
        ? !!P.likeChrome
        : /\bChrome\b/.test(p) && !/internal|\n/i.test(z.toString()),
      X = G ? "Object" : "ScriptBridgingProxyObject",
      S = G ? "Object" : "Environment",
      Q = G && F.java ? "JavaPackage" : e(F.java),
      x = G ? "Object" : "RuntimeObject";
    S = (Q = /\bJava/.test(Q) && F.java) && e(F.environment) == S;
    var w = Q ? "a" : "\u03b1",
      A = Q ? "b" : "\u03b2",
      B = F.document || {},
      K = F.operamini || F.opera,
      U = r.test((U = G && K ? K["[[Class]]"] : e(K))) ? U : (K = null),
      k,
      Z = p;
    G = [];
    var aa = null,
      Y = p == y;
    y = Y && K && "function" == typeof K.version && K.version();
    var L = (function (R) {
        return l(R, function (O, N) {
          return (
            O ||
            (RegExp("\\b" + (N.pattern || q(N)) + "\\b", "i").exec(p) &&
              (N.label || N))
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
      C = (function (R) {
        return l(R, function (O, N) {
          return (
            O ||
            (RegExp("\\b" + (N.pattern || q(N)) + "\\b", "i").exec(p) &&
              (N.label || N))
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
      M = J([
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
      V = (function (R) {
        return l(R, function (O, N, T) {
          return (
            O ||
            ((N[M] ||
              N[/^[a-z]+(?: +[a-z]+\b)*/i.exec(M)] ||
              RegExp("\\b" + q(T) + "(?:\\b|\\w*\\d)", "i").exec(p)) &&
              T)
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
      D = (function (R) {
        return l(R, function (O, N) {
          var T = N.pattern || q(N);
          if (
            !O &&
            (O = RegExp("\\b" + T + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(p))
          ) {
            var W = O,
              ba = N.label || N,
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
            T &&
              ba &&
              /^Win/i.test(W) &&
              !/^Windows Phone /i.test(W) &&
              (ca = ca[/[\d.]+$/.exec(W)]) &&
              (W = "Windows " + ca);
            W = String(W);
            T && ba && (W = W.replace(RegExp(T, "i"), ba));
            O = W = b(
              W.replace(/ ce$/i, " CE")
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
          return O;
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
    L && (L = [L]);
    V && !M && (M = J([V]));
    if ((k = /\bGoogle TV\b/.exec(M))) M = k[0];
    /\bSimulator\b/i.test(p) && (M = (M ? M + " " : "") + "Simulator");
    "Opera Mini" == C &&
      /\bOPiOS\b/.test(p) &&
      G.push("running in Turbo/Uncompressed mode");
    "IE" == C && /\blike iPhone OS\b/.test(p)
      ? ((k = n(p.replace(/like iPhone OS/, ""))),
        (V = k.manufacturer),
        (M = k.product))
      : /^iP/.test(M)
      ? (C || (C = "Safari"),
        (D =
          "iOS" +
          ((k = / OS ([\d_]+)/i.exec(p)) ? " " + k[1].replace(/_/g, ".") : "")))
      : "Konqueror" != C || /buntu/i.test(D)
      ? (V &&
          "Google" != V &&
          ((/Chrome/.test(C) && !/\bMobile Safari\b/i.test(p)) ||
            /\bVita\b/.test(M))) ||
        (/\bAndroid\b/.test(D) && /^Chrome/.test(C) && /\bVersion\//i.test(p))
        ? ((C = "Android Browser"), (D = /\bAndroid\b/.test(D) ? D : "Android"))
        : "Silk" == C
        ? (/\bMobi/i.test(p) || ((D = "Android"), G.unshift("desktop mode")),
          /Accelerated *= *true/i.test(p) && G.unshift("accelerated"))
        : "PaleMoon" == C && (k = /\bFirefox\/([\d.]+)\b/.exec(p))
        ? G.push("identifying as Firefox " + k[1])
        : "Firefox" == C && (k = /\b(Mobile|Tablet|TV)\b/i.exec(p))
        ? (D || (D = "Firefox OS"), M || (M = k[1]))
        : !C ||
          (k = !/\bMinefield\b/i.test(p) && /\b(?:Firefox|Safari)\b/.exec(C))
        ? (C &&
            !M &&
            /[\/,]|^[^(]+?\)/.test(p.slice(p.indexOf(k + "/") + 8)) &&
            (C = null),
          (k = M || V || D) &&
            (M || V || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(D)) &&
            (C =
              /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(D) ? D : k) +
              " Browser"))
        : "Electron" == C &&
          (k = (/\bChrome\/([\d.]+)\b/.exec(p) || 0)[1]) &&
          G.push("Chromium " + k)
      : (D = "Kubuntu");
    y ||
      (y = I([
        "(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))",
        "Version",
        q(C),
        "(?:Firefox|Minefield|NetFront)",
      ]));
    if (
      (k =
        ("iCab" == L && 3 < parseFloat(y) && "WebKit") ||
        (/\bOpera\b/.test(C) && (/\bOPR\b/.test(p) ? "Blink" : "Presto")) ||
        (/\b(?:Midori|Nook|Safari)\b/i.test(p) &&
          !/^(?:Trident|EdgeHTML)$/.test(L) &&
          "WebKit") ||
        (!L && /\bMSIE\b/i.test(p) && ("Mac OS" == D ? "Tasman" : "Trident")) ||
        ("WebKit" == L && /\bPlayStation\b(?! Vita\b)/i.test(C) && "NetFront"))
    )
      L = [k];
    "IE" == C && (k = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(p) || 0)[1])
      ? ((C += " Mobile"),
        (D = "Windows Phone " + (/\+$/.test(k) ? k : k + ".x")),
        G.unshift("desktop mode"))
      : /\bWPDesktop\b/i.test(p)
      ? ((C = "IE Mobile"),
        (D = "Windows Phone 8.x"),
        G.unshift("desktop mode"),
        y || (y = (/\brv:([\d.]+)/.exec(p) || 0)[1]))
      : "IE" != C &&
        "Trident" == L &&
        (k = /\brv:([\d.]+)/.exec(p)) &&
        (C && G.push("identifying as " + C + (y ? " " + y : "")),
        (C = "IE"),
        (y = k[1]));
    if (Y) {
      if (f(F, "global"))
        if (
          (Q &&
            ((k = Q.lang.System),
            (Z = k.getProperty("os.arch")),
            (D =
              D ||
              k.getProperty("os.name") + " " + k.getProperty("os.version"))),
          S)
        ) {
          try {
            (y = F.require("ringo/engine").version.join(".")), (C = "RingoJS");
          } catch (R) {
            (k = F.system) &&
              k.global.system == F.system &&
              ((C = "Narwhal"), D || (D = k[0].os || null));
          }
          C || (C = "Rhino");
        } else
          "object" == typeof F.process &&
            !F.process.browser &&
            (k = F.process) &&
            ("object" == typeof k.versions &&
              ("string" == typeof k.versions.electron
                ? (G.push("Node " + k.versions.node),
                  (C = "Electron"),
                  (y = k.versions.electron))
                : "string" == typeof k.versions.nw &&
                  (G.push("Chromium " + y, "Node " + k.versions.node),
                  (C = "NW.js"),
                  (y = k.versions.nw))),
            C ||
              ((C = "Node.js"),
              (Z = k.arch),
              (D = k.platform),
              (y = (y = /[\d.]+/.exec(k.version)) ? y[0] : null)));
      else
        e((k = F.runtime)) == X
          ? ((C = "Adobe AIR"), (D = k.flash.system.Capabilities.os))
          : e((k = F.phantom)) == x
          ? ((C = "PhantomJS"),
            (y =
              (k = k.version || null) &&
              k.major + "." + k.minor + "." + k.patch))
          : "number" == typeof B.documentMode &&
            (k = /\bTrident\/(\d+)/i.exec(p))
          ? ((y = [y, B.documentMode]),
            (k = +k[1] + 4) != y[1] &&
              (G.push("IE " + y[1] + " mode"), L && (L[1] = ""), (y[1] = k)),
            (y = "IE" == C ? String(y[1].toFixed(1)) : y[0]))
          : "number" == typeof B.documentMode &&
            /^(?:Chrome|Firefox)\b/.test(C) &&
            (G.push("masking as " + C + " " + y),
            (C = "IE"),
            (y = "11.0"),
            (L = ["Trident"]),
            (D = "Windows"));
      D = D && b(D);
    }
    y &&
      (k =
        /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(y) ||
        /(?:alpha|beta)(?: ?\d)?/i.exec(p + ";" + (Y && P.appMinorVersion)) ||
        (/\bMinefield\b/i.test(p) && "a")) &&
      ((aa = /b/i.test(k) ? "beta" : "alpha"),
      (y =
        y.replace(RegExp(k + "\\+?$"), "") +
        ("beta" == aa ? A : w) +
        (/\d+\+?/.exec(k) || "")));
    if (
      "Fennec" == C ||
      ("Firefox" == C && /\b(?:Android|Firefox OS)\b/.test(D))
    )
      C = "Firefox Mobile";
    else if ("Maxthon" == C && y) y = y.replace(/\.[\d.]+/, ".x");
    else if (/\bXbox\b/i.test(M))
      "Xbox 360" == M && (D = null),
        "Xbox 360" == M && /\bIEMobile\b/.test(p) && G.unshift("mobile mode");
    else if (
      (!/^(?:Chrome|IE|Opera)$/.test(C) &&
        (!C || M || /Browser|Mobi/.test(C))) ||
      ("Windows CE" != D && !/Mobi/i.test(p))
    )
      if ("IE" == C && Y)
        try {
          null === F.external && G.unshift("platform preview");
        } catch (R) {
          G.unshift("embedded");
        }
      else
        (/\bBlackBerry\b/.test(M) || /\bBB10\b/.test(p)) &&
        (k =
          (RegExp(M.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(p) ||
            0)[1] || y)
          ? ((k = [k, /BB10/.test(p)]),
            (D =
              (k[1] ? ((M = null), (V = "BlackBerry")) : "Device Software") +
              " " +
              k[0]),
            (y = null))
          : this != c &&
            "Wii" != M &&
            ((Y && K) ||
              (/Opera/.test(C) && /\b(?:MSIE|Firefox)\b/i.test(p)) ||
              ("Firefox" == C && /\bOS X (?:\d+\.){2,}/.test(D)) ||
              ("IE" == C &&
                ((D && !/^Win/.test(D) && 5.5 < y) ||
                  (/\bWindows XP\b/.test(D) && 8 < y) ||
                  (8 == y && !/\bTrident\b/.test(p))))) &&
            !r.test((k = n.call(c, p.replace(r, "") + ";"))) &&
            k.name &&
            ((k = "ing as " + k.name + ((k = k.version) ? " " + k : "")),
            r.test(C)
              ? (/\bIE\b/.test(k) && "Mac OS" == D && (D = null),
                (k = "identify" + k))
              : ((k = "mask" + k),
                (C = U ? b(U.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera"),
                /\bIE\b/.test(k) && (D = null),
                Y || (y = null)),
            (L = ["Presto"]),
            G.push(k));
    else C += " Mobile";
    if ((k = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(p) || 0)[1])) {
      k = [parseFloat(k.replace(/\.(\d)$/, ".0$1")), k];
      if ("Safari" == C && "+" == k[1].slice(-1))
        (C = "WebKit Nightly"), (aa = "alpha"), (y = k[1].slice(0, -1));
      else if (
        y == k[1] ||
        y == (k[2] = (/\bSafari\/([\d.]+\+?)/i.exec(p) || 0)[1])
      )
        y = null;
      k[1] = (/\bChrome\/([\d.]+)/i.exec(p) || 0)[1];
      537.36 == k[0] &&
        537.36 == k[2] &&
        28 <= parseFloat(k[1]) &&
        "WebKit" == L &&
        (L = ["Blink"]);
      Y && (H || k[1])
        ? (L && (L[1] = "like Chrome"),
          (k =
            k[1] ||
            ((k = k[0]),
            530 > k
              ? 1
              : 532 > k
              ? 2
              : 532.05 > k
              ? 3
              : 533 > k
              ? 4
              : 534.03 > k
              ? 5
              : 534.07 > k
              ? 6
              : 534.1 > k
              ? 7
              : 534.13 > k
              ? 8
              : 534.16 > k
              ? 9
              : 534.24 > k
              ? 10
              : 534.3 > k
              ? 11
              : 535.01 > k
              ? 12
              : 535.02 > k
              ? "13+"
              : 535.07 > k
              ? 15
              : 535.11 > k
              ? 16
              : 535.19 > k
              ? 17
              : 536.05 > k
              ? 18
              : 536.1 > k
              ? 19
              : 537.01 > k
              ? 20
              : 537.11 > k
              ? "21+"
              : 537.13 > k
              ? 23
              : 537.18 > k
              ? 24
              : 537.24 > k
              ? 25
              : 537.36 > k
              ? 26
              : "Blink" != L
              ? "27"
              : "28")))
        : (L && (L[1] = "like Safari"),
          (k =
            ((k = k[0]),
            400 > k
              ? 1
              : 500 > k
              ? 2
              : 526 > k
              ? 3
              : 533 > k
              ? 4
              : 534 > k
              ? "4+"
              : 535 > k
              ? 5
              : 537 > k
              ? 6
              : 538 > k
              ? 7
              : 601 > k
              ? 8
              : "8")));
      L &&
        (L[1] +=
          " " + (k += "number" == typeof k ? ".x" : /[.+]/.test(k) ? "" : "+"));
      "Safari" == C && (!y || 45 < parseInt(y)) && (y = k);
    }
    "Opera" == C && (k = /\bzbov|zvav$/.exec(D))
      ? ((C += " "),
        G.unshift("desktop mode"),
        "zvav" == k ? ((C += "Mini"), (y = null)) : (C += "Mobile"),
        (D = D.replace(RegExp(" *" + k + "$"), "")))
      : "Safari" == C &&
        /\bChrome\b/.exec(L && L[1]) &&
        (G.unshift("desktop mode"),
        (C = "Chrome Mobile"),
        (y = null),
        /\bOS X\b/.test(D) ? ((V = "Apple"), (D = "iOS 4.3+")) : (D = null));
    y &&
      0 == y.indexOf((k = /[\d.]+$/.exec(D))) &&
      -1 < p.indexOf("/" + k + "-") &&
      (D = String(D.replace(k, "")).replace(/^ +| +$/g, ""));
    L &&
      !/\b(?:Avant|Nook)\b/.test(C) &&
      (/Browser|Lunascape|Maxthon/.test(C) ||
        ("Safari" != C && /^iOS/.test(D) && /\bSafari\b/.test(L[1])) ||
        (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
          C
        ) &&
          L[1])) &&
      (k = L[L.length - 1]) &&
      G.push(k);
    G.length && (G = ["(" + G.join("; ") + ")"]);
    V && M && 0 > M.indexOf(V) && G.push("on " + V);
    M && G.push((/^on /.test(G[G.length - 1]) ? "" : "on ") + M);
    if (D) {
      var da =
        (k = / ([\d.+]+)$/.exec(D)) &&
        "/" == D.charAt(D.length - k[0].length - 1);
      D = {
        architecture: 32,
        family: k && !da ? D.replace(k[0], "") : D,
        version: k ? k[1] : null,
        toString: function () {
          var R = this.version;
          return (
            this.family +
            (R && !da ? " " + R : "") +
            (64 == this.architecture ? " 64-bit" : "")
          );
        },
      };
    }
    (k = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(Z)) && !/\bi686\b/i.test(Z)
      ? (D &&
          ((D.architecture = 64),
          (D.family = D.family.replace(RegExp(" *" + k), ""))),
        C &&
          (/\bWOW64\b/i.test(p) ||
            (Y &&
              /\w(?:86|32)$/.test(P.cpuClass || P.platform) &&
              !/\bWin64; x64\b/i.test(p))) &&
          G.unshift("32-bit"))
      : D &&
        /^OS X/.test(D.family) &&
        "Chrome" == C &&
        39 <= parseFloat(y) &&
        (D.architecture = 64);
    p || (p = null);
    F = {};
    F.description = p;
    F.layout = L && L[0];
    F.manufacturer = V;
    F.name = C;
    F.prerelease = aa;
    F.product = M;
    F.ua = p;
    F.version = C && y;
    F.os = D || {
      architecture: null,
      family: null,
      version: null,
      toString: function () {
        return "null";
      },
    };
    F.parse = n;
    F.toString = function () {
      return this.description || "";
    };
    F.version && G.unshift(y);
    F.name && G.unshift(C);
    D &&
      C &&
      (D != String(D).split(" ")[0] || (D != C.split(" ")[0] && !M)) &&
      G.push(M ? "(" + D + ")" : "on " + D);
    G.length && (F.description = G.join(" "));
    return F;
  }
  var t = {
      function: !0,
      object: !0,
    },
    v = (t[typeof window] && window) || this,
    h = t[typeof exports] && exports;
  t = t[typeof module] && module && !module.nodeType && module;
  var g = h && t && "object" == typeof global && global;
  !g || (g.global !== g && g.window !== g && g.self !== g) || (v = g);
  var u = Math.pow(2, 53) - 1,
    r = /\bOpera/;
  g = Object.prototype;
  var m = g.hasOwnProperty,
    z = g.toString,
    E = n();
  "function" == typeof define && "object" == typeof define.amd && define.amd
    ? ((v.platform = E),
      define(function () {
        return E;
      }))
    : h && t
    ? c(E, function (p, J) {
        h[J] = p;
      })
    : (v.platform = E);
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
    var b = document.createElement("meta");
    b.name = a[d].name;
    b.content = a[d].content;
    var c = window.document.head.querySelector('meta[name="' + b.name + '"]');
    c && c.parentNode.removeChild(c);
    window.document.head.appendChild(b);
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
var s_iScaleFactor = 1,
  s_bIsIphone = !1,
  s_iOffsetX,
  s_iOffsetY,
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

function getSize(a) {
  var d = a.toLowerCase(),
    b = window.document,
    c = b.documentElement;
  if (void 0 === window["inner" + a]) a = c["client" + a];
  else if (window["inner" + a] != c["client" + a]) {
    var e = b.createElement("body");
    e.id = "vpw-test-b";
    e.style.cssText = "overflow:scroll";
    var f = b.createElement("div");
    f.id = "vpw-test-d";
    f.style.cssText = "position:absolute;top:-1000px";
    f.innerHTML =
      "<style>@media(" +
      d +
      ":" +
      c["client" + a] +
      "px){body#vpw-test-b div#vpw-test-d{" +
      d +
      ":7px!important}}</style>";
    e.appendChild(f);
    c.insertBefore(e, b.head);
    a = 7 == f["offset" + a] ? c["client" + a] : window["inner" + a];
    c.removeChild(e);
  } else a = window["inner" + a];
  return a;
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
  window.matchMedia("(orientation: portrait)").matches && sizeHandler();
  window.matchMedia("(orientation: landscape)").matches && sizeHandler();
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
    var d = getSize("Width");
    s_bFocus && _checkOrientation(d, a);
    var b = Math.min(a / CANVAS_HEIGHT, d / CANVAS_WIDTH),
      c = Math.round(CANVAS_WIDTH * b);
    b = Math.round(CANVAS_HEIGHT * b);
    if (b < a) {
      var e = a - b;
      b += e;
      c += (CANVAS_WIDTH / CANVAS_HEIGHT) * e;
    } else
      c < d &&
        ((e = d - c), (c += e), (b += (CANVAS_HEIGHT / CANVAS_WIDTH) * e));
    e = a / 2 - b / 2;
    var f = d / 2 - c / 2,
      q = CANVAS_WIDTH / c;
    if (f * q < -EDGEBOARD_X || e * q < -EDGEBOARD_Y)
      (b = Math.min(
        a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y),
        d / (CANVAS_WIDTH - 2 * EDGEBOARD_X)
      )),
        (c = Math.round(CANVAS_WIDTH * b)),
        (b = Math.round(CANVAS_HEIGHT * b)),
        (e = (a - b) / 2),
        (f = (d - c) / 2),
        (q = CANVAS_WIDTH / c);
    s_iOffsetX = -1 * f * q;
    s_iOffsetY = -1 * e * q;
    0 <= e && (s_iOffsetY = 0);
    0 <= f && (s_iOffsetX = 0);
    null !== s_oInterface &&
      s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    s_iScaleFactor = Math.min(c / CANVAS_WIDTH, b / CANVAS_HEIGHT);
    s_bIsIphone
      ? ((canvas = document.getElementById("canvas")),
        (s_oStage.canvas.width = 2 * c),
        (s_oStage.canvas.height = 2 * b),
        (canvas.style.width = c + "px"),
        (canvas.style.height = b + "px"),
        (s_iScaleFactor = 2 * Math.min(c / CANVAS_WIDTH, b / CANVAS_HEIGHT)),
        (s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor))
      : s_bMobile || isChrome()
      ? ($("#canvas").css("width", c + "px"),
        $("#canvas").css("height", b + "px"))
      : ((s_oStage.canvas.width = c),
        (s_oStage.canvas.height = b),
        (s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor));
    0 > e || (e = (a - b) / 2);
    $("#canvas").css("top", e + "px");
    $("#canvas").css("left", f + "px");
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

function createBitmap(a, d, b) {
  var c = new createjs.Bitmap(a),
    e = new createjs.Shape();
  d && b
    ? e.graphics.beginFill("#fff").drawRect(0, 0, d, b)
    : e.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
  c.hitArea = e;
  return c;
}

function createSprite(a, d, b, c, e, f) {
  a = null !== d ? new createjs.Sprite(a, d) : new createjs.Sprite(a);
  d = new createjs.Shape();
  d.graphics.beginFill("#000000").drawRect(-b, -c, e, f);
  a.hitArea = d;
  return a;
}

function randomFloatBetween(a, d, b) {
  "undefined" === typeof b && (b = 2);
  return parseFloat(Math.min(a + Math.random() * (d - a), d).toFixed(b));
}

function shuffle(a) {
  for (var d = a.length, b, c; 0 !== d; )
    (c = Math.floor(Math.random() * d)),
      --d,
      (b = a[d]),
      (a[d] = a[c]),
      (a[c] = b);
  return a;
}

function formatTime(a) {
  a /= 1e3;
  var d = Math.floor(a / 60);
  a = parseFloat(a - 60 * d).toFixed(1);
  var b = "";
  b = 10 > d ? b + ("0" + d + ":") : b + (d + ":");
  return 10 > a ? b + ("0" + a) : b + a;
}

function formatValue(a) {
  return TEXT_CURRENCY + a.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
Array.prototype.sortOn = function () {
  var a = this.slice();
  if (!arguments.length) return a.sort();
  var d = Array.prototype.slice.call(arguments);
  return a.sort(function (b, c) {
    for (var e = d.slice(), f = e.shift(); b[f] == c[f] && e.length; )
      f = e.shift();
    return b[f] == c[f] ? 0 : b[f] > c[f] ? 1 : -1;
  });
};

function roundDecimal(a, d) {
  var b = Math.pow(10, d);
  return Math.round(b * a) / b;
}

function tweenVectors(a, d, b, c) {
  c.set(
    a.getX() + b * (d.getX() - a.getX()),
    a.getY() + b * (d.getY() - a.getY())
  );
  return c;
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
      var d = document.createEvent("MouseEvents");
      d.initEvent("click", !0, !0);
      a.dispatchEvent(d);
    }
  },
};
(function () {
  function a(b) {
    var c = {
      focus: "visible",
      focusin: "visible",
      pageshow: "visible",
      blur: "hidden",
      focusout: "hidden",
      pagehide: "hidden",
    };
    b = b || window.event;
    b.type in c
      ? (document.body.className = c[b.type])
      : ((document.body.className = this[d] ? "hidden" : "visible"),
        "hidden" === document.body.className
          ? (s_oMain.stopUpdate(), (s_bFocus = !1))
          : (s_oMain.startUpdate(), (s_bFocus = !0)));
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

function playSound(a, d, b) {
  return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
    ? (s_aSounds[a].play(),
      s_aSounds[a].volume(d),
      s_aSounds[a].loop(b),
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
    var d = window.location.search.substring(1).split("&"), b = 0;
    b < d.length;
    b++
  ) {
    var c = d[b].split("=");
    if (c[0] == a) return c[1];
  }
}

function fullscreenHandler() {
  ENABLE_FULLSCREEN &&
    !1 !== screenfull.isEnabled &&
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

function CSpriteLibrary() {
  var a = {},
    d,
    b,
    c,
    e,
    f,
    q;
  this.init = function (l, n, t) {
    d = {};
    c = b = 0;
    e = l;
    f = n;
    q = t;
  };
  this.addSprite = function (l, n) {
    if (a.hasOwnProperty(l)) return !1;
    var t = new Image();
    a[l] = d[l] = {
      szPath: n,
      oSprite: t,
      bLoaded: !1,
    };
    b++;
    return !0;
  };
  this.getSprite = function (l) {
    return a.hasOwnProperty(l) ? a[l].oSprite : null;
  };
  this._onSpritesLoaded = function () {
    b = 0;
    f.call(q);
  };
  this._onSpriteLoaded = function () {
    e.call(q);
    ++c === b && this._onSpritesLoaded();
  };
  this.loadSprites = function () {
    for (var l in d)
      (d[l].oSprite.oSpriteLibrary = this),
        (d[l].oSprite.szKey = l),
        (d[l].oSprite.onload = function () {
          this.oSpriteLibrary.setLoaded(this.szKey);
          this.oSpriteLibrary._onSpriteLoaded(this.szKey);
        }),
        (d[l].oSprite.onerror = function (n) {
          var t = n.currentTarget;
          setTimeout(function () {
            d[t.szKey].oSprite.src = d[t.szKey].szPath;
          }, 500);
        }),
        (d[l].oSprite.src = d[l].szPath);
  };
  this.setLoaded = function (l) {
    a[l].bLoaded = !0;
  };
  this.isLoaded = function (l) {
    return a[l].bLoaded;
  };
  this.getNumSprites = function () {
    return b;
  };
}
var CANVAS_WIDTH = 1700,
  CANVAS_HEIGHT = 768,
  EDGEBOARD_X = 338,
  EDGEBOARD_Y = 0,
  FPS = 30,
  FPS_TIME = 1e3 / FPS,
  DISABLE_SOUND_MOBILE = !1,
  FONT_GAME_1 = "arialbold",
  FONT_GAME_2 = "Digital-7",
  STATE_LOADING = 0,
  STATE_MENU = 1,
  STATE_HELP = 1,
  STATE_GAME = 3,
  STATE_GAME_WAITING_FOR_BET = 0,
  STATE_GAME_DEALING = 1,
  STATE_GAME_SHOW_WINNER = 2,
  STATE_CARD_DEALING = 0,
  STATE_CARD_REMOVING = 1,
  ON_MOUSE_DOWN = 0,
  ON_MOUSE_UP = 1,
  ON_MOUSE_OVER = 2,
  ON_MOUSE_OUT = 3,
  ON_DRAG_START = 4,
  ON_DRAG_END = 5,
  ASSIGN_FICHES = "ASSIGN_FICHES",
  END_HAND = "END_HAND",
  ON_CARD_SHOWN = "ON_CARD_SHOWN",
  ON_CARD_ANIMATION_ENDING = "ON_CARD_ANIMATION_ENDING",
  ON_CARD_TO_REMOVE = "ON_CARD_TO_REMOVE",
  NUM_FICHES = 6,
  CARD_WIDTH = 66,
  CARD_HEIGHT = 102,
  MIN_BET,
  MAX_BET,
  TOTAL_MONEY,
  FICHE_WIDTH,
  WIN_OCCURRENCE,
  BET_OCCURRENCE,
  FICHES_VALUE,
  TIME_FICHES_MOV = 600,
  TIME_CARD_DEALING = 250,
  TIME_CARD_REMOVE = 1e3,
  TIME_SHOW_FINAL_CARDS = 4e3,
  TIME_END_HAND,
  BET_TIME = 1e4,
  AD_SHOW_COUNTER,
  NUM_DECKS = 4,
  COLOR_FICHE_PER_VALUE = "#fff #000 #000 #fff #fff #fff".split(" "),
  BET_TIE = 0,
  BET_BANKER = 1,
  BET_PLAYER = 2,
  WIN_TIE = 0,
  WIN_DEALER = 1,
  WIN_PLAYER = 2,
  POS_BET = [],
  MULTIPLIERS = [],
  ENABLE_FULLSCREEN,
  ENABLE_CHECK_ORIENTATION,
  SHOW_CREDITS,
  TEXT_BET = ["TIE", "BANKER", "PLAYER"],
  TEXT_WIN = "WIN",
  TEXT_SHOW_WIN = ["TIE - PAYS 8 TO 1", TEXT_BET[1], TEXT_BET[2]],
  TEXT_NO_WIN = "NO WIN",
  TEXT_PUSH = "PUSH",
  TEXT_PLAY = "PLAY",
  TEXT_CLEAR = "CLEAR",
  TEXT_REBET = "REBET",
  TEXT_DEAL = "DEAL",
  TEXT_MIN_BET = "MIN BET",
  TEXT_MAX_BET = "MAX BET",
  TEXT_NO = "NO",
  TEXT_YES = "YES",
  TEXT_RECHARGE = "RECHARGE",
  TEXT_EXIT = "EXIT",
  TEXT_MONEY = "MONEY",
  TEXT_CURRENCY = "$",
  TEXT_CREDITS_DEVELOPED = "DEVELOPED BY",
  TEXT_PRELOADER_CONTINUE = "START",
  TEXT_OUTCOME = "OUTCOME: ",
  TEXT_DISPLAY_MSG_WAITING_BET = "WAITING FOR YOUR BET",
  TEXT_DISPLAY_MSG_PLAYER_LOSE = "PLAYER LOSES THIS HAND!",
  TEXT_DISPLAY_MSG_PLAYER_WIN = "PLAYER WINS",
  TEXT_DISPLAY_TIE = "THIS HAND IS A TIE!",
  TEXT_DISPLAY_MSG_DEALING = "DEALING...",
  TEXT_NO_MONEY = "YOU DON'T HAVE ENOUGH MONEY!!!",
  TEXT_HAND_WON = "HAND WON BY",
  TEXT_ERROR_MIN_BET = "YOUR BET IS LOWER THAN MINIMUM BET!!",
  TEXT_SHARE_IMAGE = "200x200.jpg",
  TEXT_SHARE_TITLE = "Congratulations!",
  TEXT_SHARE_MSG1 = "You collected <strong>",
  TEXT_SHARE_MSG2 =
    " points</strong>!<br><br>Share your score with your friends!",
  TEXT_SHARE_SHARE1 = "My score is ",
  TEXT_SHARE_SHARE2 = " points! Can you do better?";

function CPreloader() {
  var a, d, b, c, e, f, q, l, n;
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
    var t = new createjs.Shape();
    t.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    n.addChild(t);
    t = s_oSpriteLibrary.getSprite("200x200");
    q = createBitmap(t);
    q.regX = 0.5 * t.width;
    q.regY = 0.5 * t.height;
    q.x = CANVAS_WIDTH / 2;
    q.y = CANVAS_HEIGHT / 2 - 180;
    n.addChild(q);
    l = new createjs.Shape();
    l.graphics
      .beginFill("rgba(0,0,0,0.01)")
      .drawRoundRect(q.x - 100, q.y - 100, 200, 200, 10);
    n.addChild(l);
    q.mask = l;
    t = s_oSpriteLibrary.getSprite("progress_bar");
    c = createBitmap(t);
    c.x = CANVAS_WIDTH / 2 - t.width / 2;
    c.y = CANVAS_HEIGHT / 2 + 50;
    n.addChild(c);
    a = t.width;
    d = t.height;
    e = new createjs.Shape();
    e.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(c.x, c.y, 1, d);
    n.addChild(e);
    c.mask = e;
    b = new createjs.Text("", "30px " + FONT_GAME_1, "#fff");
    b.x = CANVAS_WIDTH / 2;
    b.y = CANVAS_HEIGHT / 2 + 100;
    b.textBaseline = "alphabetic";
    b.textAlign = "center";
    n.addChild(b);
    f = new createjs.Shape();
    f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    n.addChild(f);
    createjs.Tween.get(f)
      .to(
        {
          alpha: 0,
        },
        500
      )
      .call(function () {
        createjs.Tween.removeTweens(f);
        n.removeChild(f);
      });
  };
  this.refreshLoader = function (t) {
    b.text = t + "%";
    100 === t &&
      (s_oMain._onRemovePreloader(), (b.visible = !1), (c.visible = !1));
    e.graphics.clear();
    t = Math.floor((t * a) / 100);
    e.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(c.x, c.y, t, d);
  };
  this._init();
}

function CMain(a) {
  var d,
    b = 0,
    c = 0,
    e = STATE_LOADING,
    f,
    q;
  this.initContainer = function () {
    var n = document.getElementById("canvas");
    s_oStage = new createjs.Stage(n);
    createjs.Touch.enable(s_oStage, !0);
    s_bMobile = isMobile();
    !1 === s_bMobile && s_oStage.enableMouseOver(20);
    s_iPrevTime = new Date().getTime();
    createjs.Ticker.setFPS(FPS);
    createjs.Ticker.addEventListener("tick", this._update);
    navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
    s_oSpriteLibrary = new CSpriteLibrary();
    f = new CPreloader();

    s_oGameSettings = new CGameSettings();
    d = !0;
  };
  this.preloaderReady = function () {
    this._loadImages();
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || this._initSounds();
  };
  this.soundLoaded = function () {
    b++;
    f.refreshLoader(Math.floor((b / c) * 100));
  };
  this._initSounds = function () {
    Howler.mute(!s_bAudioActive);
    s_aSoundsInfo = [];
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "card",
      loop: !1,
      volume: 1,
      ingamename: "card",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "chip",
      loop: !1,
      volume: 1,
      ingamename: "chip",
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
      filename: "lose",
      loop: !1,
      volume: 1,
      ingamename: "lose",
    });
    c += s_aSoundsInfo.length;
    s_aSounds = [];
    for (var n = 0; n < s_aSoundsInfo.length; n++)
      this.tryToLoadSound(s_aSoundsInfo[n], !1);
  };
  this.tryToLoadSound = function (n, t) {
    setTimeout(
      function () {
        s_aSounds[n.ingamename] = new Howl({
          src: [n.path + n.filename + ".mp3"],
          autoplay: !1,
          preload: !0,
          loop: n.loop,
          volume: n.volume,
          onload: s_oMain.soundLoaded,
          onloaderror: function (v, h) {
            for (var g = 0; g < s_aSoundsInfo.length; g++)
              if (v === s_aSounds[s_aSoundsInfo[g].ingamename]._sounds[0]._id) {
                s_oMain.tryToLoadSound(s_aSoundsInfo[g], !0);
                break;
              }
          },
          onplayerror: function (v) {
            for (var h = 0; h < s_aSoundsInfo.length; h++)
              if (v === s_aSounds[s_aSoundsInfo[h].ingamename]._sounds[0]._id) {
                s_aSounds[s_aSoundsInfo[h].ingamename].once(
                  "unlock",
                  function () {
                    s_aSounds[s_aSoundsInfo[h].ingamename].play();
                  }
                );
                break;
              }
          },
        });
      },
      t ? 200 : 0
    );
  };
  this._loadImages = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite("but_menu_bg", "./sprites/but_menu_bg.png");
    s_oSpriteLibrary.addSprite("but_game_bg", "./sprites/but_game_bg.png");
    s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
    s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
    s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
    s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
    s_oSpriteLibrary.addSprite(
      "card_spritesheet",
      "./sprites/card_spritesheet.png"
    );
    s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
    s_oSpriteLibrary.addSprite("display_bg", "./sprites/display_bg.png");
    s_oSpriteLibrary.addSprite(
      "fiche_highlight",
      "./sprites/fiche_highlight.png"
    );
    s_oSpriteLibrary.addSprite("bet_banker", "./sprites/bet_banker.png");
    s_oSpriteLibrary.addSprite("bet_tie", "./sprites/bet_tie.png");
    s_oSpriteLibrary.addSprite("bet_player", "./sprites/bet_player.png");
    s_oSpriteLibrary.addSprite("win_bg", "./sprites/win_bg.png");
    s_oSpriteLibrary.addSprite("history_cell", "./sprites/history_cell.png");
    s_oSpriteLibrary.addSprite(
      "history_highlight",
      "./sprites/history_highlight.png"
    );
    s_oSpriteLibrary.addSprite("history_bg", "./sprites/history_bg.png");
    s_oSpriteLibrary.addSprite("but_clear", "./sprites/but_clear.png");
    s_oSpriteLibrary.addSprite("but_deal", "./sprites/but_deal.png");
    s_oSpriteLibrary.addSprite("but_rebet", "./sprites/but_rebet.png");
    s_oSpriteLibrary.addSprite("gui_bg", "./sprites/gui_bg.png");
    s_oSpriteLibrary.addSprite(
      "but_fullscreen",
      "./sprites/but_fullscreen.png"
    );
    s_oSpriteLibrary.addSprite("logo_credits", "./sprites/logo_credits.png");
    s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
    for (var n = 0; n < NUM_FICHES; n++)
      s_oSpriteLibrary.addSprite("fiche_" + n, "./sprites/fiche_" + n + ".png");
    c += s_oSpriteLibrary.getNumSprites();
    s_oSpriteLibrary.loadSprites();
  };
  this._onImagesLoaded = function () {
    b++;
    f.refreshLoader(Math.floor((b / c) * 100));
  };
  this._onAllImagesLoaded = function () {};
  this._onRemovePreloader = function () {
    f.unload();
    this.gotoMenu();
  };
  this.gotoMenu = function () {
    new CMenu();
    e = STATE_MENU;
  };
  this.gotoGame = function () {
    q = new CGame(l);
    e = STATE_GAME;
  };
  this.gotoHelp = function () {
    new CHelp();
    e = STATE_HELP;
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
  this._update = function (n) {
    if (d) {
      var t = new Date().getTime();
      s_iTimeElaps = t - s_iPrevTime;
      s_iCntTime += s_iTimeElaps;
      s_iCntFps++;
      s_iPrevTime = t;
      1e3 <= s_iCntTime &&
        ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0));
      e === STATE_GAME && q.update();
      s_oStage.update(n);
    }
  };
  s_oMain = this;
  var l = a;
  ENABLE_CHECK_ORIENTATION = l.check_orientation;
  ENABLE_FULLSCREEN = l.fullscreen;
  SHOW_CREDITS = a.show_credits;
  s_bAudioActive = a.audio_enable_on_startup;
  this.initContainer();
}
var s_bMobile,
  s_bAudioActive = !0,
  s_iCntTime = 0,
  s_iTimeElaps = 0,
  s_iPrevTime = 0,
  s_iCntFps = 0,
  s_iCurFps = 0,
  s_oDrawLayer,
  s_oStage,
  s_oMain,
  s_oSpriteLibrary,
  s_oGameSettings,
  s_bFullscreen = !1;

function CTextButton(a, d, b, c, e, f, q, l) {
  var n, t, v, h, g, u, r, m, z, E;
  this._init = function (p, J, I, F, G, P, y) {
    n = !1;
    t = 1;
    v = [];
    h = [];
    E = createBitmap(I);
    m = new createjs.Container();
    m.x = p;
    m.y = J;
    m.regX = I.width / 2;
    m.regY = I.height / 2;
    s_bMobile || (m.cursor = "pointer");
    m.addChild(E, z);
    l.addChild(m);
    z = new CTLText(
      m,
      10,
      5,
      I.width - 20,
      I.height - 10,
      y,
      "center",
      P,
      G,
      1,
      0,
      0,
      F,
      !0,
      !0,
      !1,
      !1
    );
    this._initListener();
  };
  this.unload = function () {
    m.off("mousedown", g);
    m.off("pressup", u);
    l.removeChild(m);
  };
  this.setVisible = function (p) {
    m.visible = p;
  };
  this.setAlign = function (p) {
    z.textAlign = p;
  };
  this.setTextX = function (p) {
    z.x = p;
  };
  this.setScale = function (p) {
    t = m.scaleX = m.scaleY = p;
  };
  this.enable = function () {
    n = !1;
  };
  this.disable = function () {
    n = !0;
  };
  this._initListener = function () {
    g = m.on("mousedown", this.buttonDown);
    u = m.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (p, J, I) {
    v[p] = J;
    h[p] = I;
  };
  this.addEventListenerWithParams = function (p, J, I, F) {
    v[p] = J;
    h[p] = I;
    r = F;
  };
  this.buttonRelease = function () {
    n ||
      (playSound("press_but", 1, !1),
      (m.scaleX = t),
      (m.scaleY = t),
      v[ON_MOUSE_UP] && v[ON_MOUSE_UP].call(h[ON_MOUSE_UP], r));
  };
  this.buttonDown = function () {
    n ||
      ((m.scaleX = 0.9 * t),
      (m.scaleY = 0.9 * t),
      v[ON_MOUSE_DOWN] && v[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN]));
  };
  this.setPosition = function (p, J) {
    m.x = p;
    m.y = J;
  };
  this.tweenPosition = function (p, J, I, F, G, P, y) {
    createjs.Tween.get(m)
      .wait(F)
      .to(
        {
          x: p,
          y: J,
        },
        I,
        G
      )
      .call(function () {
        void 0 !== P && P.call(y);
      });
  };
  this.changeText = function (p) {
    z.refreshText(p);
  };
  this.setX = function (p) {
    m.x = p;
  };
  this.setY = function (p) {
    m.y = p;
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
  this.getSprite = function () {
    return m;
  };
  this.getScale = function () {
    return m.scaleX;
  };
  this._init(a, d, b, c, e, f, q);
}

function CGfxButton(a, d, b, c) {
  var e,
    f,
    q,
    l,
    n,
    t = [],
    v,
    h,
    g;
  this._init = function (r, m, z) {
    e = !1;
    l = [];
    n = [];
    f = z.width;
    q = z.height;
    g = createBitmap(z);
    g.x = r;
    g.y = m;
    g.regX = z.width / 2;
    g.regY = z.height / 2;
    g.cursor = "pointer";
    u.addChild(g);
    this._initListener();
  };
  this.unload = function () {
    g.off("mousedown", v);
    g.off("pressup", h);
    u.removeChild(g);
  };
  this.setVisible = function (r) {
    g.visible = r;
  };
  this._initListener = function () {
    v = g.on("mousedown", this.buttonDown);
    h = g.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (r, m, z) {
    l[r] = m;
    n[r] = z;
  };
  this.addEventListenerWithParams = function (r, m, z, E) {
    l[r] = m;
    n[r] = z;
    t = E;
  };
  this.buttonRelease = function (r) {
    r.stopPropagation();
    r.preventDefault();
    e ||
      (playSound("press_but", 1, !1),
      l[ON_MOUSE_UP] && l[ON_MOUSE_UP].call(n[ON_MOUSE_UP], t));
  };
  this.buttonDown = function () {
    e || (l[ON_MOUSE_DOWN] && l[ON_MOUSE_DOWN].call(n[ON_MOUSE_DOWN], t));
  };
  this.setPosition = function (r, m) {
    g.x = r;
    g.y = m;
  };
  this.setX = function (r) {
    g.x = r;
  };
  this.setY = function (r) {
    g.y = r;
  };
  this.enable = function () {
    e = !1;
    g.filters = [];
    g.cache(0, 0, f, q);
  };
  this.disable = function () {
    e = !0;
    var r = new createjs.ColorMatrix()
      .adjustSaturation(-100)
      .adjustBrightness(40);
    g.filters = [new createjs.ColorMatrixFilter(r)];
    g.cache(0, 0, f, q);
  };
  this.getButtonImage = function () {
    return g;
  };
  this.getX = function () {
    return g.x;
  };
  this.getY = function () {
    return g.y;
  };
  var u = c;
  this._init(a, d, b);
  return this;
}

function CGuiButton(a, d, b, c, e, f, q, l) {
  var n, t, v, h, g, u, r;
  this._init = function (m, z, E, p, J, I, F, G) {
    n = !1;
    t = [];
    v = [];
    r = G;
    h = new createjs.Container();
    h.x = m;
    h.y = z;
    h.regX = E.width / 2;
    h.regY = E.height / 2;
    r.addChild(h);
    g = createBitmap(E);
    h.addChild(g);
    u = new CTLText(
      h,
      10,
      E.height - F - 3,
      E.width / 2,
      F,
      F,
      "left",
      I,
      J,
      1,
      0,
      0,
      p,
      !0,
      !0,
      !1,
      !1
    );
    this._initListener();
  };
  this.unload = function () {
    h.off("mousedown");
    h.off("pressup");
    r.removeChild(h);
  };
  this.setVisible = function (m) {
    h.visible = m;
  };
  this.enable = function () {
    n = !1;
    u.setColor("#fff");
  };
  this.disable = function () {
    n = !0;
    u.setColor("#a39b9d");
  };
  this._initListener = function () {
    h.on("mousedown", this.buttonDown);
    h.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (m, z, E) {
    t[m] = z;
    v[m] = E;
  };
  this.buttonRelease = function () {
    n ||
      (playSound("press_but", 1, !1),
      (h.scaleX = 1),
      (h.scaleY = 1),
      t[ON_MOUSE_UP] && t[ON_MOUSE_UP].call(v[ON_MOUSE_UP]));
  };
  this.buttonDown = function () {
    n ||
      ((h.scaleX = 0.9),
      (h.scaleY = 0.9),
      t[ON_MOUSE_DOWN] && t[ON_MOUSE_DOWN].call(v[ON_MOUSE_DOWN]));
  };
  this.setPosition = function (m, z) {
    h.x = m;
    h.y = z;
  };
  this.changeText = function (m) {
    u.refreshText(m);
  };
  this.setX = function (m) {
    h.x = m;
  };
  this.setY = function (m) {
    h.y = m;
  };
  this.getButtonImage = function () {
    return h;
  };
  this.getX = function () {
    return h.x;
  };
  this.getY = function () {
    return h.y;
  };
  this._init(a, d, b, c, e, f, q, l);
  return this;
}

function CToggle(a, d, b, c, e) {
  var f,
    q,
    l,
    n,
    t = [],
    v,
    h,
    g;
  this._init = function (u, r, m, z, E) {
    l = [];
    n = [];
    var p = new createjs.SpriteSheet({
      images: [m],
      frames: {
        width: m.width / 2,
        height: m.height,
        regX: m.width / 2 / 2,
        regY: m.height / 2,
      },
      animations: {
        state_true: [0],
        state_false: [1],
      },
    });
    f = z;
    q = E;
    g = createSprite(
      p,
      "state_" + f,
      m.width / 2 / 2,
      m.height / 2,
      m.width / 2,
      m.height
    );
    g.x = u;
    g.y = r;
    g.cursor = "pointer";
    g.stop();
    s_oStage.addChild(g);
    this._initListener();
  };
  this.unload = function () {
    g.off("mousedown", v);
    g.off("pressup", h);
    s_oStage.removeChild(g);
  };
  this._initListener = function () {
    v = g.on("mousedown", this.buttonDown);
    h = g.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (u, r, m) {
    l[u] = r;
    n[u] = m;
  };
  this.addEventListenerWithParams = function (u, r, m, z) {
    l[u] = r;
    n[u] = m;
    t = z;
  };
  this.setActive = function (u) {
    f = u;
    g.gotoAndStop("state_" + f);
  };
  this.buttonRelease = function () {
    g.scaleX = 1;
    g.scaleY = 1;
    playSound("press_but", 1, !1);
    q && ((f = !f), g.gotoAndStop("state_" + f));
    l[ON_MOUSE_UP] && l[ON_MOUSE_UP].call(n[ON_MOUSE_UP], t);
  };
  this.buttonDown = function () {
    g.scaleX = 0.9;
    g.scaleY = 0.9;
    l[ON_MOUSE_DOWN] && l[ON_MOUSE_DOWN].call(n[ON_MOUSE_DOWN], t);
  };
  this.setPosition = function (u, r) {
    g.x = u;
    g.y = r;
  };
  this.setVisible = function (u) {
    g.visible = u;
  };
  this.getY = function () {
    return g.y;
  };
  this._init(a, d, b, c, e);
}

function CMenu() {
  var a,
    d,
    b,
    c,
    e,
    f,
    q,
    l = null,
    n = null,
    t,
    v,
    h,
    g,
    u;
  this._init = function () {
    v = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
    s_oStage.addChild(v);
    var r = s_oSpriteLibrary.getSprite("but_menu_bg");
    h = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 164, r, s_oStage);
    h.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
      (r = s_oSpriteLibrary.getSprite("audio_icon")),
        (e = CANVAS_WIDTH - r.width / 4 - 10),
        (f = r.height / 2 + 10),
        (g = new CToggle(e, f, r, s_bAudioActive, !0)),
        g.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
    SHOW_CREDITS
      ? ((r = s_oSpriteLibrary.getSprite("but_credits")),
        (a = 10 + r.width / 2),
        (d = r.height / 2 + 10),
        (t = new CGfxButton(a, d, r, s_oStage)),
        t.addEventListener(ON_MOUSE_UP, this._onCredits, this),
        (b = a + r.width + 10),
        (c = d))
      : ((r = s_oSpriteLibrary.getSprite("but_fullscreen")),
        (b = 10 + r.width / 4),
        (c = r.height / 2 + 10));
    r = window.document;
    var m = r.documentElement;
    l =
      m.requestFullscreen ||
      m.mozRequestFullScreen ||
      m.webkitRequestFullScreen ||
      m.msRequestFullscreen;
    n =
      r.exitFullscreen ||
      r.mozCancelFullScreen ||
      r.webkitExitFullscreen ||
      r.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (l = !1);
    l &&
      screenfull.isEnabled &&
      ((r = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (q = new CToggle(b, c, r, s_bFullscreen, s_oStage)),
      q.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    u = new createjs.Shape();
    u.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    s_oStage.addChild(u);
    createjs.Tween.get(u)
      .to(
        {
          alpha: 0,
        },
        400
      )
      .call(function () {
        u.visible = !1;
      });
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };
  this.refreshButtonPos = function (r, m) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      g.setPosition(e - r, m + f);
    l && screenfull.isEnabled && q.setPosition(b + r, c + m);
    SHOW_CREDITS && t.setPosition(a + r, d + m);
  };
  this.unload = function () {
    h.unload();
    h = null;
    SHOW_CREDITS && t.unload();
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) g.unload(), (g = null);
    l && screenfull.isEnabled && q.unload();
    s_oStage.removeAllChildren();
    s_oMenu = null;
  };
  this._onButPlayRelease = function () {
    this.unload();
    s_oMain.gotoGame();
    $(s_oMain).trigger("start_session");
  };
  this._onCredits = function () {
    new CCreditsPanel();
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this.resetFullscreenBut = function () {
    l && screenfull.isEnabled && q.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? n.call(window.document)
      : l.call(window.document.documentElement);
    sizeHandler();
  };
  s_oMenu = this;
  this._init();
}
var s_oMenu = null;

function CGame(a) {
  var d = !1,
    b,
    c,
    e,
    f,
    q,
    l,
    n,
    t,
    v,
    h,
    g,
    u,
    r,
    m,
    z,
    E,
    p,
    J,
    I,
    F,
    G,
    P,
    y,
    H,
    X,
    S;
  this._init = function () {
    e = MAX_BET;
    f = -1;
    t = c = 0;
    m = [];
    for (var x = 0; x < BET_OCCURRENCE.length; x++)
      for (var w = 0; w < BET_OCCURRENCE[x]; w++) m.push(x);
    s_oTweenController = new CTweenController();
    P = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
    s_oStage.addChild(P);
    x = s_oSpriteLibrary.getSprite("gui_bg");
    w = createBitmap(x);
    w.y = CANVAS_HEIGHT - x.height;
    s_oStage.addChild(w);
    G = new createjs.Container();
    s_oStage.addChild(G);
    y = new CInterface(TOTAL_MONEY);
    y.displayMsg(
      TEXT_DISPLAY_MSG_WAITING_BET,
      TEXT_MIN_BET + ": " + MIN_BET + "\n" + TEXT_MAX_BET + ": " + MAX_BET
    );
    H = new CSeat();
    H.setCredit(TOTAL_MONEY);
    this.reset(!1);
    E = new CVector2();
    E.set(1214, 228);
    p = new CVector2();
    p.set(CANVAS_WIDTH / 2 + 100, 230);
    J = new CVector2();
    J.set(418, 820);
    I = new CVector2();
    I.set(0, -CANVAS_HEIGHT);
    F = new CVector2(454, 230);
    r = [H.getCardOffset(), p];
    S = new CGameOver();
    H.getCredit() < FICHES_VALUE[0]
      ? (this._gameOver(), this.changeState(-1))
      : (d = !0);
    z = new CVector2(E.getX(), E.getY());
    X = new CMsgBox();
    this.changeState(STATE_GAME_WAITING_FOR_BET);
  };
  this.unload = function () {
    d = !1;
    for (var x = 0; x < v.length; x++) v[x].unload();
    y.unload();
    S.unload();
    X.unload();
    s_oStage.removeAllChildren();
  };
  this.reset = function (x) {
    b = !1;
    l = n = q = c = 0;
    H.reset();
    v = [];
    v.splice(0);
    y.reset();
    y.enableBetFiches(x);
    this.shuffleCard();
  };
  this.setMoney = function (x) {
    H.setCredit(x);
    y.refreshCredit(x);
    S.hide();
  };
  this.shuffleCard = function () {
    g = [];
    g = s_oGameSettings.getShuffledCardDeck();
  };
  this.changeState = function (x) {
    f = x;
    if (f === STATE_GAME_DEALING) {
      var w = Q < 2 * H.getTotBet() ? WIN_OCCURRENCE : 100 * Math.random();
      x = H.getBetArray();
      for (var A = 0, B = 0; B < x.length; B++) 0 < x[B] && A++;
      if (w < WIN_OCCURRENCE) {
        if (1 === A) {
          for (B = 0; B < x.length; B++) {
            var K = 0;
            if (0 !== x[B]) {
              K = B;
              break;
            }
          }
          B = K;
        } else {
          do B = m[Math.floor(Math.random() * m.length)];
          while (0 === x[B]);
        }
        do
          6 > g.length && this.shuffleCard(),
            (x = []),
            x.push(g.splice(0, 1)),
            x.push(g.splice(0, 1)),
            (w = []),
            w.push(g.splice(0, 1)),
            w.push(g.splice(0, 1)),
            (K = this._simulateHand(x, w));
        while (B !== K);
      } else {
        if (3 === A)
          (w = Math.random()), (B = 0.5 < w ? BET_BANKER : BET_PLAYER);
        else {
          B = [];
          for (w = 0; w < x.length; w++) 0 === x[w] && B.push(w);
          w = Math.floor(Math.random() * B.length);
          B = B[w];
        }
        do
          6 > g.length && this.shuffleCard(),
            (x = []),
            x.push(g.splice(0, 1)),
            x.push(g.splice(0, 1)),
            (w = []),
            w.push(g.splice(0, 1)),
            w.push(g.splice(0, 1)),
            (K = this._simulateHand(x, w));
        while (B !== K);
      }
      u = [];
      for (B = 0; B < x.length; B++) u[B] = x[B];
      h = [];
      for (B = 0; B < w.length; B++) h[B] = w[B];
      y.disableButtons();
      y.displayMsg(TEXT_DISPLAY_MSG_DEALING, "");
      this._dealing();
    }
  };
  this._simulateHand = function (x, w) {
    for (var A = 0, B = 0, K = 0; K < x.length; K++)
      (A += s_oGameSettings.getCardValue(x[K])),
        (B += s_oGameSettings.getCardValue(w[K]));
    A %= 10;
    B %= 10;
    if (7 < B) return (A = B > A ? WIN_DEALER : B === A ? WIN_TIE : WIN_PLAYER);
    K = !1;
    if (7 < A) return WIN_PLAYER;
    if (6 > A) {
      var U = g.splice(0, 1),
        k = s_oGameSettings.getCardValue(U);
      x.push(U);
      A = (A + k) % 10;
      3 > B
        ? (K = !0)
        : 3 === B && 8 !== k
        ? (K = !0)
        : 4 === B && 1 < k && 8 > k
        ? (K = !0)
        : 5 === B && 3 < k && 8 > k
        ? (K = !0)
        : 6 !== B || (6 !== k && 7 !== k) || (K = !1);
      K &&
        ((U = g.splice(0, 1)),
        w.push(U),
        (B += s_oGameSettings.getCardValue(U)),
        (B %= 10));
    } else
      6 > B &&
        ((U = g.splice(0, 1)),
        w.push(U),
        (B += s_oGameSettings.getCardValue(U)),
        (B %= 10));
    return B === A ? WIN_TIE : B > A ? WIN_DEALER : WIN_PLAYER;
  };
  this.cardFromDealerArrived = function (x, w, A) {
    !1 === w ? (l += x.getValue()) : (n += x.getValue());
    3 > A
      ? s_oGame._dealing()
      : ((l %= 10),
        (n %= 10),
        y.refreshCardValue(n, l),
        1 === u.length
          ? ((x = u.splice(0, 1)[0]),
            (w = new CCard(E.getX(), E.getY(), G)),
            w.setInfo(
              z,
              H.getAttachCardOffset(),
              x,
              s_oGameSettings.getCardValue(x),
              !1,
              q
            ),
            w.addEventListener(
              ON_CARD_ANIMATION_ENDING,
              s_oGame.cardFromDealerArrived
            ),
            H.newCardDealed(),
            q++,
            v.push(w))
          : 1 === h.length
          ? (q++,
            (A = new CVector2(p.getX() + (CARD_WIDTH / 2) * 2, p.getY())),
            (x = h.splice(0, 1)),
            (w = new CCard(E.getX(), E.getY(), G)),
            w.setInfo(z, A, x, s_oGameSettings.getCardValue(x), !0, q),
            w.addEventListener(
              ON_CARD_ANIMATION_ENDING,
              s_oGame.cardFromDealerArrived
            ),
            v.push(w))
          : s_oGame._showWin());
  };
  this._showWin = function () {
    var x = n === l ? BET_TIE : n > l ? BET_BANKER : BET_PLAYER;
    var w = H.getBetArray(),
      A = !1;
    if (x === BET_TIE) {
      if (0 < w[BET_TIE]) {
        var B = H.getPotentialWin(BET_TIE);
        this._playerWin(B, x, !0);
        this._playerWin(w[BET_BANKER], BET_BANKER, !1);
        this._playerWin(w[BET_PLAYER], BET_PLAYER, !1);
        A = !0;
        y.showWin(BET_TIE, B, TEXT_WIN);
      } else (B = w[BET_BANKER] + w[BET_PLAYER]), H.increaseCredit(B), (Q -= B);
      y.showWin(BET_BANKER, w[BET_BANKER], TEXT_PUSH);
      y.showWin(BET_PLAYER, w[BET_PLAYER], TEXT_PUSH);
    } else
      for (var K = 0; K < w.length; K++)
        0 < w[K] &&
          ((B = 0),
          x === K
            ? (this._playerWin(H.getPotentialWin(K), x, !0),
              (B = H.getPotentialWin(K)),
              (A = !0))
            : this._playerLose(K, !1),
          y.showWin(K, B, 0 < B ? TEXT_WIN : TEXT_NO_WIN));
    A
      ? playSound("win", 1, !1)
      : (playSound("lose", 1, !1), this._playerLose(x, !0));
    setTimeout(function () {
      s_oGame._onEndHand(x);
    }, TIME_END_HAND);
  };
  this._playerWin = function (x, w, A) {
    H.increaseCredit(x);
    Q -= x;
    A &&
      y.displayMsg(
        TEXT_DISPLAY_MSG_PLAYER_WIN,
        TEXT_BET[w] === BET_TIE
          ? TEXT_DISPLAY_TIE
          : TEXT_OUTCOME + " " + TEXT_BET[w]
      );
    H.initMovement(w, J.getX(), J.getY());
  };
  this._playerLose = function (x, w) {
    w
      ? y.displayMsg(
          TEXT_DISPLAY_MSG_PLAYER_LOSE,
          TEXT_BET[x] === BET_TIE
            ? TEXT_DISPLAY_TIE
            : TEXT_OUTCOME + " " + TEXT_BET[x]
        )
      : H.initMovement(x, I.getX(), I.getY());
  };
  this._dealing = function () {
    if (q < 2 * r.length) {
      var x = new CCard(E.getX(), E.getY(), G);
      if (1 === q % r.length) {
        var w = new CVector2(
          p.getX() + (CARD_WIDTH / 2) * (1 < q ? 1 : 0),
          p.getY()
        );
        var A = h.splice(0, 1)[0];
        x.setInfo(z, w, A, s_oGameSettings.getCardValue(A), !0, q);
      } else
        (A = u.splice(0, 1)[0]),
          x.setInfo(
            z,
            H.getAttachCardOffset(),
            A,
            s_oGameSettings.getCardValue(A),
            !1,
            q
          ),
          H.newCardDealed();
      v.push(x);
      q++;
      x.addEventListener(ON_CARD_ANIMATION_ENDING, this.cardFromDealerArrived);
      x.addEventListener(ON_CARD_TO_REMOVE, this._onRemoveCard);
      playSound("card", 1, !1);
    }
  };
  this._onEndHand = function (x) {
    y.addHistoryRow(l, n, x);
    x = new CVector2(F.getX(), F.getY());
    for (var w = 0; w < v.length; w++) v[w].initRemoving(x), v[w].hideCard();
    y.clearCardValueText();
    c = 0;
    s_oGame.changeState(STATE_GAME_SHOW_WINNER);
    playSound("fiche_collect", 1, !1);
    t++;
    t === AD_SHOW_COUNTER &&
      ((t = 0), $(s_oMain).trigger("show_interlevel_ad"));
    $(s_oMain).trigger("save_score", [H.getCredit()]);
  };
  this.setBet = function (x, w, A) {
    b && ((b = !1), this.clearBets());
    var B = H.getTotBet();
    B + x <= e &&
      x <= H.getCredit() &&
      ((B + x).toFixed(2),
      H.decreaseCredit(x),
      (Q += x),
      H.bet(x, A, w),
      y.enable(!0, !1, !1, !1, !1),
      y.refreshCredit(H.getCredit()));
  };
  this._gameOver = function () {
    S.show();
  };
  this.onDeal = function () {
    H.getTotBet() < MIN_BET
      ? (X.show(TEXT_ERROR_MIN_BET), y.enableBetFiches(!1), y.enable(!0))
      : ($(s_oMain).trigger("bet_placed", H.getTotBet()),
        H.calculatePotentialWins(),
        this.changeState(STATE_GAME_DEALING));
  };
  this.clearBets = function () {
    var x = H.getStartingBet();
    if (0 < x) {
      H.clearBet();
      H.increaseCredit(x);
      Q -= x;
      y.refreshCredit(H.getCredit());
      var w = H.checkIfRebetIsPossible();
      y.enableBetFiches(w);
      $(s_oMain).trigger("clear_bet", x);
    }
  };
  this.rebet = function () {
    this.clearBets();
    var x = H.rebet();
    Q -= x;
    y.enable(!0, !1, !1, !1, !1);
    y.refreshCredit(H.getCredit());
    c = BET_TIME;
    b = !0;
  };
  this._onRemoveCard = function (x) {
    x.unload();
    y.displayMsg(
      TEXT_DISPLAY_MSG_WAITING_BET,
      TEXT_MIN_BET + ": " + MIN_BET + "\n" + TEXT_MAX_BET + ": " + MAX_BET
    );
  };
  this.onExit = function () {
    this.unload();
    $(s_oMain).trigger("end_session");
    $(s_oMain).trigger("share_event", H.getCredit());
    s_oMain.gotoMenu();
  };
  this.getState = function () {
    return f;
  };
  this._updateDealing = function () {
    for (var x = 0; x < v.length; x++) v[x].update();
  };
  this._updateShowWinner = function () {
    H.updateFichesController(s_iTimeElaps);
    for (var x = 0; x < v.length; x++) v[x].update();
    c += s_iTimeElaps;
    c > TIME_END_HAND &&
      ((c = 0),
      (x = H.checkIfRebetIsPossible()),
      this.reset(x),
      y.reset(),
      H.getCredit() < FICHES_VALUE[0]
        ? (this._gameOver(), this.changeState(-1))
        : this.changeState(STATE_GAME_WAITING_FOR_BET),
      y.refreshCredit(H.getCredit()));
  };
  this.update = function () {
    if (!1 !== d)
      switch (f) {
        case STATE_GAME_DEALING:
          this._updateDealing();
          break;
        case STATE_GAME_SHOW_WINNER:
          this._updateShowWinner();
      }
  };
  s_oGame = this;
  TOTAL_MONEY = a.money;
  MIN_BET = a.min_bet;
  MAX_BET = a.max_bet;
  MULTIPLIERS = a.multiplier;
  BET_TIME = a.bet_time;
  BLACKJACK_PAYOUT = a.blackjack_payout;
  WIN_OCCURRENCE = a.win_occurrence;
  BET_OCCURRENCE = a.bet_occurrence;
  var Q = a.game_cash;
  TIME_END_HAND = a.time_show_hand;
  AD_SHOW_COUNTER = a.ad_show_counter;
  this._init();
}
var s_oGame, s_oTweenController;

function CInterface(a) {
  var d,
    b,
    c,
    e,
    f,
    q,
    l,
    n,
    t,
    v,
    h,
    g,
    u,
    r,
    m,
    z,
    E = null,
    p,
    J,
    I,
    F,
    G,
    P,
    y,
    H,
    X,
    S,
    Q = null,
    x = null;
  this._init = function (w) {
    var A = s_oSpriteLibrary.getSprite("but_exit");
    f = CANVAS_WIDTH - A.width / 2 - 10;
    q = A.height / 2 + 10;
    u = new CGfxButton(f, q, A, s_oStage);
    u.addEventListener(ON_MOUSE_UP, this._onExit, this);
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
      (l = u.getX() - A.width - 10),
        (n = A.height / 2 + 10),
        (E = new CToggle(
          l,
          n,
          s_oSpriteLibrary.getSprite("audio_icon"),
          s_bAudioActive,
          !0
        )),
        E.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
    A = window.document;
    var B = A.documentElement;
    Q =
      B.requestFullscreen ||
      B.mozRequestFullScreen ||
      B.webkitRequestFullScreen ||
      B.msRequestFullscreen;
    x =
      A.exitFullscreen ||
      A.mozCancelFullScreen ||
      A.webkitExitFullscreen ||
      A.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (Q = !1);
    Q &&
      screenfull.isEnabled &&
      ((A = s_oSpriteLibrary.getSprite("but_fullscreen")),
      null === E
        ? ((d = u.getX() - A.width / 2 - 10), (b = A.height / 2 + 10))
        : ((d = l - A.width / 2 - 10), (b = A.height / 2 + 10)),
      (S = new CToggle(d, b, A, s_bFullscreen, !0)),
      S.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    A = createBitmap(s_oSpriteLibrary.getSprite("display_bg"));
    A.x = 290;
    A.y = 6;
    s_oStage.addChild(A);
    H = new CGfxButton(
      CANVAS_WIDTH / 2,
      590,
      s_oSpriteLibrary.getSprite("bet_player"),
      s_oStage
    );
    H.addEventListener(ON_MOUSE_UP, this._onButPlayerRelease, this);
    y = new CGfxButton(
      CANVAS_WIDTH / 2,
      482,
      s_oSpriteLibrary.getSprite("bet_banker"),
      s_oStage
    );
    y.addEventListener(ON_MOUSE_UP, this._onButBankerRelease, this);
    P = new CGfxButton(
      CANVAS_WIDTH / 2,
      400,
      s_oSpriteLibrary.getSprite("bet_tie"),
      s_oStage
    );
    P.addEventListener(ON_MOUSE_UP, this._onButTieRelease, this);
    A = s_oSpriteLibrary.getSprite("but_clear");
    r = new CGuiButton(
      939,
      CANVAS_HEIGHT - 31,
      A,
      TEXT_CLEAR,
      FONT_GAME_1,
      "#ffffff",
      17,
      s_oStage
    );
    r.addEventListener(ON_MOUSE_UP, this._onButClearRelease, this);
    A = s_oSpriteLibrary.getSprite("but_rebet");
    m = new CGuiButton(
      1112,
      CANVAS_HEIGHT - A.height / 2,
      A,
      TEXT_REBET,
      FONT_GAME_1,
      "#ffffff",
      17,
      s_oStage
    );
    m.disable();
    m.addEventListener(ON_MOUSE_UP, this._onButRebetRelease, this);
    F = new CTLText(
      s_oStage,
      412,
      12,
      190,
      50,
      24,
      "left",
      "#ffde00",
      FONT_GAME_2,
      1,
      0,
      0,
      " ",
      !0,
      !0,
      !0,
      !1
    );
    G = new CTLText(
      s_oStage,
      412,
      64,
      190,
      40,
      19,
      "left",
      "#ffde00",
      FONT_GAME_2,
      1,
      0,
      0,
      " ",
      !0,
      !0,
      !0,
      !1
    );
    J = new createjs.Text("", "20px " + FONT_GAME_1, "#fff");
    J.shadow = new createjs.Shadow("#000000", 2, 2, 1);
    J.x = 910;
    J.y = 180;
    J.textAlign = "right";
    s_oStage.addChild(J);
    I = new createjs.Text("", "20px " + FONT_GAME_1, "#fff");
    I.shadow = new createjs.Shadow("#000000", 2, 2, 1);
    I.x = 658;
    I.y = 180;
    I.textAlign = "right";
    s_oStage.addChild(I);
    new CTLText(
      s_oStage,
      350,
      CANVAS_HEIGHT - 90,
      110,
      40,
      30,
      "right",
      "#ffde00",
      FONT_GAME_2,
      1,
      0,
      0,
      TEXT_MONEY + ":",
      !0,
      !0,
      !1,
      !1
    );
    p = new CTLText(
      s_oStage,
      470,
      CANVAS_HEIGHT - 90,
      190,
      40,
      30,
      "left",
      "#ffde00",
      FONT_GAME_2,
      1,
      0,
      0,
      formatValue(w),
      !0,
      !0,
      !1,
      !1
    );
    A = s_oSpriteLibrary.getSprite("but_deal");
    z = new CGuiButton(
      1282,
      CANVAS_HEIGHT - A.height / 2,
      A,
      TEXT_DEAL,
      FONT_GAME_1,
      "#ffffff",
      26,
      s_oStage
    );
    z.addEventListener(ON_MOUSE_UP, this._onButDealRelease, this);
    g = [];
    g[BET_TIE] = new CWinDisplay(CANVAS_WIDTH + 100, 360, s_oStage);
    g[BET_BANKER] = new CWinDisplay(CANVAS_WIDTH + 100, 460, s_oStage);
    g[BET_PLAYER] = new CWinDisplay(CANVAS_WIDTH + 100, 580, s_oStage);
    POS_BET[BET_TIE] = {
      x: P.getX(),
      y: P.getY() + 15,
    };
    POS_BET[BET_BANKER] = {
      x: y.getX(),
      y: y.getY() + 35,
    };
    POS_BET[BET_PLAYER] = {
      x: H.getX(),
      y: H.getY() + 35,
    };
    w = [
      {
        x: 387,
        y: CANVAS_HEIGHT - 24,
      },
      {
        x: 467,
        y: CANVAS_HEIGHT - 24,
      },
      {
        x: 547,
        y: CANVAS_HEIGHT - 24,
      },
      {
        x: 627,
        y: CANVAS_HEIGHT - 24,
      },
      {
        x: 707,
        y: CANVAS_HEIGHT - 24,
      },
      {
        x: 787,
        y: CANVAS_HEIGHT - 24,
      },
    ];
    h = [];
    for (B = 0; B < NUM_FICHES; B++)
      (h[B] = new CFiche(w[B].x, w[B].y, B, FICHES_VALUE[B], 1, !0, s_oStage)),
        h[B].addEventListenerWithParams(
          ON_MOUSE_UP,
          this._onFicheClicked,
          this,
          [FICHES_VALUE[B], B]
        );
    t = FICHES_VALUE[0];
    v = 0;
    FICHE_WIDTH = A.width;
    c = 10;
    e = 265;
    X = new CHistory(c, e, s_oStage);
    this.disableButtons();
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };
  this.unload = function () {
    u.unload();
    u = null;
    !1 === DISABLE_SOUND_MOBILE && (E.unload(), (E = null));
    Q && screenfull.isEnabled && S.unload();
    r.unload();
    y.unload();
    H.unload();
    P.unload();
    z.unload();
    m.unload();
    s_oInterface = null;
  };
  this.refreshButtonPos = function (w, A) {
    u.setPosition(f - w, A + q);
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      E.setPosition(l - w, A + n);
    Q && screenfull.isEnabled && S.setPosition(d - w, b + A);
    X.setPosition(c + w, e);
  };
  this.reset = function () {
    this.disableButtons();
  };
  this.enableBetFiches = function (w) {
    for (var A = 0; A < NUM_FICHES; A++) h[A].enable();
    r.enable();
    w && m.enable();
    P.enable();
    y.enable();
    H.enable();
  };
  this.disableBetFiches = function () {
    for (var w = 0; w < NUM_FICHES; w++) h[w].disable();
    r.disable();
    m.disable();
    P.disable();
    y.disable();
    H.disable();
  };
  this.disableButtons = function () {
    z.disable();
  };
  this.enable = function (w) {
    w ? z.enable() : z.disable();
  };
  this.refreshCredit = function (w) {
    p.refreshText(formatValue(w));
  };
  this.refreshCardValue = function (w, A) {
    J.text = "" + w;
    I.text = "" + A;
  };
  this.displayMsg = function (w, A) {
    F.refreshText(w);
    G.refreshText(A);
  };
  this.clearCardValueText = function () {
    J.text = "";
    I.text = "";
  };
  this._onFicheClicked = function (w) {
    for (var A = 0; A < h.length; A++) h[A].select(!1);
    h[w[1]].select(!0);
    t = w[0];
    v = w[1];
  };
  this.showWin = function (w, A, B) {
    g[w].show(TEXT_SHOW_WIN[w], A, B);
  };
  this.hideAllWins = function () {
    for (var w = 0; w < g.length; w++) g[w].hide();
  };
  this.addHistoryRow = function (w, A, B) {
    X.addHistoryRow(w, A, B);
  };
  this._onButTieRelease = function () {
    this.hideAllWins();
    s_oGame.setBet(t, v, BET_TIE);
  };
  this._onButBankerRelease = function () {
    this.hideAllWins();
    s_oGame.setBet(t, v, BET_BANKER);
  };
  this._onButPlayerRelease = function () {
    this.hideAllWins();
    s_oGame.setBet(t, v, BET_PLAYER);
  };
  this._onButClearRelease = function () {
    s_oGame.clearBets();
  };
  this._onButRebetRelease = function () {
    this.hideAllWins();
    m.disable();
    s_oGame.rebet();
  };
  this._onButDealRelease = function () {
    this.disableBetFiches();
    this.disableButtons();
    s_oGame.onDeal();
  };
  this._onExit = function () {
    s_oGame.onExit();
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this.resetFullscreenBut = function () {
    Q && screenfull.isEnabled && S.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? x.call(window.document)
      : Q.call(window.document.documentElement);
    sizeHandler();
  };
  s_oInterface = this;
  this._init(a);
  return this;
}
var s_oInterface = null;

function CTweenController() {
  this.tweenValue = function (a, d, b) {
    return a + b * (d - a);
  };
  this.easeLinear = function (a, d, b, c) {
    return (b * a) / c + d;
  };
  this.easeInCubic = function (a, d, b, c) {
    c = (a /= c) * a * a;
    return d + b * c;
  };
  this.easeBackInQuart = function (a, d, b, c) {
    c = (a /= c) * a;
    return d + b * (2 * c * c + 2 * c * a + -3 * c);
  };
  this.easeInBack = function (a, d, b, c) {
    return b * (a /= c) * a * (2.70158 * a - 1.70158) + d;
  };
  this.easeOutCubic = function (a, d, b, c) {
    return b * ((a = a / c - 1) * a * a + 1) + d;
  };
}

function CSeat() {
  var a, d, b, c, e, f, q, l, n, t, v;
  this._init = function () {
    n = new createjs.Container();
    n.x = CANVAS_WIDTH / 2 - 150;
    n.y = 230;
    s_oStage.addChild(n);
    v = [];
    for (var h = 0; 3 > h; h++) v[h] = new CFichesController();
    e = 0;
    this.reset();
    t = new CVector2();
    t.set(0, 0);
    l = new CVector2(t.getX(), t.getY());
  };
  this.unload = function () {
    s_oStage.removeChild(n);
  };
  this.addEventListener = function (h, g, u) {};
  this.reset = function () {
    for (var h = (c = b = d = a = 0); h < v.length; h++) v[h].reset();
    f = [];
    for (h = 0; 3 > h; h++) f[h] = [];
  };
  this.clearBet = function () {
    b = d = a = 0;
    f = [];
    for (var h = 0; 3 > h; h++) v[h].reset(), (f[h] = []);
  };
  this.setCredit = function (h) {
    e = h;
  };
  this.increaseCredit = function (h) {
    e += h;
  };
  this.bet = function (h, g, u) {
    u = 0;
    switch (g) {
      case BET_TIE:
        u = a += h;
        break;
      case BET_BANKER:
        u = d += h;
        break;
      case BET_PLAYER:
        u = b += h;
    }
    v[g].createFichesPile(u.toFixed(1), POS_BET[g].x, POS_BET[g].y);
  };
  this.calculatePotentialWins = function () {
    q = [];
    q[BET_TIE] = a * MULTIPLIERS[BET_TIE];
    q[BET_BANKER] = d * MULTIPLIERS[BET_BANKER];
    q[BET_PLAYER] = b * MULTIPLIERS[BET_PLAYER];
    v[0].setPrevValue(a);
    v[1].setPrevValue(d);
    v[2].setPrevValue(b);
  };
  this.decreaseCredit = function (h) {
    e -= h;
  };
  this.refreshFiches = function (h, g, u, r, m) {
    f[m].push({
      value: h,
      index: g,
    });
    v[m].refreshFiches(f[m], u, r);
  };
  this.initMovement = function (h, g, u) {
    v[h].initMovement(g, u);
  };
  this.newCardDealed = function () {
    c++;
  };
  this.rebet = function () {
    for (var h = 0, g = 0; g < v.length; g++) {
      var u = parseFloat(v[g].getPrevBet().toFixed(2));
      if (0 < u) {
        h += u;
        this.decreaseCredit(u);
        switch (g) {
          case BET_TIE:
            a += u;
            break;
          case BET_BANKER:
            d += u;
            break;
          case BET_PLAYER:
            b += u;
        }
        v[g].createFichesPile(u, POS_BET[g].x, POS_BET[g].y);
      }
    }
    return h;
  };
  this.checkIfRebetIsPossible = function () {
    for (var h = 0, g = 0; g < v.length; g++) {
      var u = parseFloat(v[g].getPrevBet().toFixed(2));
      h += u;
    }
    return h > e ? !1 : !0;
  };
  this.updateFichesController = function (h) {
    for (var g = 0; g < v.length; g++) v[g].update(h);
  };
  this.getAttachCardOffset = function () {
    l.set(n.x + t.getX() + (CARD_WIDTH / 2) * c, n.y + t.getY());
    return l;
  };
  this.getTotBet = function () {
    return a + d + b;
  };
  this.getBetArray = function () {
    return [a, d, b];
  };
  this.getCredit = function () {
    return e;
  };
  this.getCardOffset = function () {
    return t;
  };
  this.getPotentialWin = function (h) {
    return q[h];
  };
  this.getStartingBet = function () {
    for (var h = 0, g = 0; g < v.length; g++) h += v[g].getValue();
    return h;
  };
  this._init();
}

function CFichesController() {
  var a, d, b, c, e, f, q, l, n, t, v;
  this._init = function () {
    l = new createjs.Container();
    s_oStage.addChild(l);
    e = new CVector2();
    e.set(l.x, l.y);
    n = new createjs.Container();
    s_oStage.addChild(n);
    v = new CTLText(
      n,
      0,
      0,
      150,
      28,
      28,
      "center",
      "#000",
      FONT_GAME_1,
      1,
      0,
      0,
      " ",
      !0,
      !0,
      !1,
      !1
    );
    t = new CTLText(
      n,
      0,
      0,
      150,
      28,
      28,
      "center",
      "#fff",
      FONT_GAME_1,
      1,
      0,
      0,
      " ",
      !0,
      !0,
      !1,
      !1
    );
    b = c = d = 0;
    a = !1;
  };
  this.addEventListener = function (h, g, u) {};
  this.reset = function () {
    a = !1;
    b = 0;
    l.removeAllChildren();
    l.x = e.getX();
    l.y = e.getY();
    v.refreshText("");
    t.refreshText("");
  };
  this.setPrevValue = function (h) {
    c = h;
  };
  this.refreshFiches = function (h, g, u) {
    h = h.sortOn("value", "index");
    for (var r = g, m = u, z = (b = 0), E = 0; E < h.length; E++)
      new CFiche(r, m, h[E].index, FICHES_VALUE[h[E].index], 0.85, !1, l),
        (m -= 5),
        z++,
        9 < z && ((z = 0), (r += FICHE_WIDTH), (m = u)),
        (b += h[E].value);
    playSound("chip", 1, !1);
    t.setX(g);
    t.setY(u + 20);
    t.refreshText(formatValue(b));
    v.setX(g + 2);
    v.setY(u + 22);
    v.refreshText(formatValue(b));
  };
  this.createFichesPile = function (h, g, u) {
    this.reset();
    var r = [];
    do {
      for (
        var m = FICHES_VALUE[FICHES_VALUE.length - 1],
          z = FICHES_VALUE.length - 1;
        m > h;

      )
        z--, (m = FICHES_VALUE[z]);
      z = Math.floor(h / m);
      for (var E = 0; E < z; E++)
        r.push({
          value: m,
          index: s_oGameSettings.getIndexForFiches(m),
        });
      m = Math.floor(h / m) === h / m ? 0 : h % m;
      h = m.toFixed(2);
    } while (0 < m);
    this.refreshFiches(r, g, u);
  };
  this.initMovement = function (h, g) {
    c = b;
    f = new CVector2(l.x, l.y);
    q = new CVector2(h, g);
    t.refreshText("");
    v.refreshText("");
    a = !0;
  };
  this.getValue = function () {
    return b;
  };
  this.getPrevBet = function () {
    return c;
  };
  this.update = function (h) {
    if (a)
      if (((d += h), d > TIME_FICHES_MOV)) (d = 0), (a = !1);
      else {
        h = easeInOutCubic(d, 0, 1, TIME_FICHES_MOV);
        var g = new CVector2();
        g = tweenVectors(f, q, h, g);
        l.x = g.getX();
        l.y = g.getY();
      }
  };
  this._init();
}

function CVector2(a, d) {
  var b, c;
  this._init = function (e, f) {
    b = e;
    c = f;
  };
  this.add = function (e, f) {
    b += e;
    c += f;
  };
  this.addV = function (e) {
    b += e.getX();
    c += e.getY();
  };
  this.scalarDivision = function (e) {
    b /= e;
    c /= e;
  };
  this.subV = function (e) {
    b -= e.getX();
    c -= e.getY();
  };
  this.scalarProduct = function (e) {
    b *= e;
    c *= e;
  };
  this.invert = function () {
    b *= -1;
    c *= -1;
  };
  this.dotProduct = function (e) {
    return b * e.getX() + c * e.getY();
  };
  this.set = function (e, f) {
    b = e;
    c = f;
  };
  this.setV = function (e) {
    b = e.getX();
    c = e.getY();
  };
  this.length = function () {
    return Math.sqrt(b * b + c * c);
  };
  this.length2 = function () {
    return b * b + c * c;
  };
  this.normalize = function () {
    var e = this.length();
    0 < e && ((b /= e), (c /= e));
  };
  this.getNormalize = function (e) {
    this.length();
    e.set(b, c);
    e.normalize();
  };
  this.rot90CCW = function () {
    var e = b;
    b = -c;
    c = e;
  };
  this.rot90CW = function () {
    var e = b;
    b = c;
    c = -e;
  };
  this.getRotCCW = function (e) {
    e.set(b, c);
    e.rot90CCW();
  };
  this.getRotCW = function (e) {
    e.set(b, c);
    e.rot90CW();
  };
  this.ceil = function () {
    b = Math.ceil(b);
    c = Math.ceil(c);
  };
  this.round = function () {
    b = Math.round(b);
    c = Math.round(c);
  };
  this.toString = function () {
    return "Vector2: " + b + ", " + c;
  };
  this.print = function () {
    trace("Vector2: " + b + ", " + c);
  };
  this.getX = function () {
    return b;
  };
  this.getY = function () {
    return c;
  };
  this._init(a, d);
}

function CGameSettings() {
  var a, d, b;
  this._init = function () {
    b = [];
    a = [];
    for (var c = 0; c < NUM_DECKS; c++)
      for (var e = 0; 52 > e; e++) {
        a.push(e);
        var f = (e + 1) % 13;
        if (10 < f || 0 === f) f = 10;
        b.push(f);
      }
    FICHES_VALUE = [0.1, 1, 5, 10, 25, 100];
  };
  this.getIndexForFiches = function (c) {
    for (var e = 0, f = 0; f < FICHES_VALUE.length; f++)
      FICHES_VALUE[f] === c && (e = f);
    return e;
  };
  this.generateFichesPile = function (c) {
    var e = [],
      f = FICHES_VALUE.length - 1,
      q = FICHES_VALUE[f];
    do {
      var l = c % q;
      l = CMath.roundDecimal(l, 1);
      c = Math.floor(c / q);
      for (var n = 0; n < c; n++) e.push(q);
      f--;
      q = FICHES_VALUE[f];
      c = l;
    } while (0 < l && -1 < f);
    return e;
  };
  this.timeToString = function (c) {
    c = Math.round(c / 1e3);
    var e = Math.floor(c / 60);
    c -= 60 * e;
    var f = "";
    f = 10 > e ? f + ("0" + e + ":") : f + (e + ":");
    return 10 > c ? f + ("0" + c) : f + c;
  };
  this.getShuffledCardDeck = function () {
    for (var c = [], e = 0; e < a.length; e++) c[e] = a[e];
    for (d = []; 0 < c.length; )
      d.push(c.splice(Math.round(Math.random() * (c.length - 1)), 1)[0]);
    return d;
  };
  this.getCardValue = function (c) {
    return b[c];
  };
  this.getCardDeck = function () {
    return a;
  };
  this._init();
}
var TYPE_LINEAR = 0,
  TYPE_OUT_CUBIC = 1,
  TYPE_IN_CUBIC = 2,
  TYPE_OUT_BACK = 3,
  TYPE_IN_BACK = 4;

function ease(a, d, b, c, e, f) {
  switch (a) {
    case TYPE_LINEAR:
      var q = easeLinear(d, b, c, e, f);
      break;
    case TYPE_IN_CUBIC:
      q = easeInCubic(d, b, c, e, f);
      break;
    case TYPE_OUT_CUBIC:
      q = easeOutCubic(d, b, c, e, f);
      break;
    case TYPE_IN_BACK:
      q = easeInBack(d, b, c, e, f);
      break;
    case TYPE_OUT_BACK:
      q = easeInBack(d, b, c, e, f);
  }
  return q;
}

function easeOutBounce(a, d, b, c) {
  return (a /= c) < 1 / 2.75
    ? 7.5625 * b * a * a + d
    : a < 2 / 2.75
    ? b * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + d
    : a < 2.5 / 2.75
    ? b * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + d
    : b * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + d;
}

function easeInBounce(a, d, b, c) {
  return b - easeOutBounce(c - a, 0, b, c) + d;
}

function easeInOutBounce(a, d, b, c) {
  return a < c / 2
    ? 0.5 * easeInBounce(2 * a, 0, b, c) + d
    : 0.5 * easeOutBounce(2 * a - c, 0, b, c) + 0.5 * b + d;
}

function easeInCirc(a, d, b, c) {
  return -b * (Math.sqrt(1 - (a /= c) * a) - 1) + d;
}

function easeOutCirc(a, d, b, c) {
  return b * Math.sqrt(1 - (a = a / c - 1) * a) + d;
}

function easeInOutCirc(a, d, b, c) {
  return 1 > (a /= c / 2)
    ? (-b / 2) * (Math.sqrt(1 - a * a) - 1) + d
    : (b / 2) * (Math.sqrt(1 - (a -= 2) * a) + 1) + d;
}

function easeInCubic(a, d, b, c, e) {
  return b * (a /= c) * a * a + d;
}

function easeOutCubic(a, d, b, c, e) {
  return b * ((a = a / c - 1) * a * a + 1) + d;
}

function easeInOutCubic(a, d, b, c, e) {
  return 1 > (a /= c / 2)
    ? (b / 2) * a * a * a + d
    : (b / 2) * ((a -= 2) * a * a + 2) + d;
}

function easeInElastic(a, d, b, c, e, f, q) {
  if (0 == a) return d;
  if (1 == (a /= c)) return d + b;
  q || (q = 0.3 * c);
  !f || f < Math.abs(b)
    ? ((f = b), (e = q / 4))
    : (e = (q / (2 * Math.PI)) * Math.asin(b / f));
  return (
    -(f * Math.pow(2, 10 * --a) * Math.sin((2 * (a * c - e) * Math.PI) / q)) + d
  );
}

function easeOutElastic(a, d, b, c, e, f, q) {
  if (0 == a) return d;
  if (1 == (a /= c)) return d + b;
  q || (q = 0.3 * c);
  !f || f < Math.abs(b)
    ? ((f = b), (e = q / 4))
    : (e = (q / (2 * Math.PI)) * Math.asin(b / f));
  return (
    f * Math.pow(2, -10 * a) * Math.sin((2 * (a * c - e) * Math.PI) / q) + b + d
  );
}

function easeInOutElastic(a, d, b, c, e, f, q) {
  if (0 == a) return d;
  if (1 == (a /= c)) return d + b;
  q || (q = 0.3 * c);
  !f || f < Math.abs(b)
    ? ((f = b), (e = q / 4))
    : (e = (q / (2 * Math.PI)) * Math.asin(b / f));
  return 1 > a
    ? -0.5 *
        f *
        Math.pow(2, 10 * --a) *
        Math.sin((2 * (a * c - e) * Math.PI) / q) +
        d
    : f *
        Math.pow(2, -10 * --a) *
        Math.sin((2 * (a * c - e) * Math.PI) / q) *
        0.5 +
        b +
        d;
}

function easeInExpo(a, d, b, c) {
  return 0 == a ? d : b * Math.pow(2, 10 * (a / c - 1)) + d;
}

function easeOutExpo(a, d, b, c) {
  return a == c ? d + b : b * (-Math.pow(2, (-10 * a) / c) + 1) + d;
}

function easeInOutExpo(a, d, b, c) {
  return 0 == a
    ? d
    : a == c
    ? d + b
    : 1 > (a /= c / 2)
    ? (b / 2) * Math.pow(2, 10 * (a - 1)) + d
    : (b / 2) * (-Math.pow(2, -10 * --a) + 2) + d;
}

function easeLinear(a, d, b, c) {
  return (b * a) / c + d;
}

function easeInQuad(a, d, b, c) {
  return b * (a /= c) * a + d;
}

function easeOutQuad(a, d, b, c) {
  return -b * (a /= c) * (a - 2) + d;
}

function easeInOutQuad(a, d, b, c) {
  return 1 > (a /= c / 2)
    ? (b / 2) * a * a + d
    : (-b / 2) * (--a * (a - 2) - 1) + d;
}

function easeInQuart(a, d, b, c) {
  return b * (a /= c) * a * a * a + d;
}

function easeOutQuart(a, d, b, c) {
  return -b * ((a = a / c - 1) * a * a * a - 1) + d;
}

function easeInOutQuart(a, d, b, c) {
  return 1 > (a /= c / 2)
    ? (b / 2) * a * a * a * a + d
    : (-b / 2) * ((a -= 2) * a * a * a - 2) + d;
}

function easeInQuint(a, d, b, c) {
  return b * (a /= c) * a * a * a * a + d;
}

function easeOutQuint(a, d, b, c) {
  return b * ((a = a / c - 1) * a * a * a * a + 1) + d;
}

function easeInOutQuint(a, d, b, c) {
  return 1 > (a /= c / 2)
    ? (b / 2) * a * a * a * a * a + d
    : (b / 2) * ((a -= 2) * a * a * a * a + 2) + d;
}

function easeInSine(a, d, b, c) {
  return -b * Math.cos((a / c) * (Math.PI / 2)) + b + d;
}

function easeOutSine(a, d, b, c) {
  return b * Math.sin((a / c) * (Math.PI / 2)) + d;
}

function easeInOutSine(a, d, b, c) {
  return (-b / 2) * (Math.cos((Math.PI * a) / c) - 1) + d;
}

function easeInBack(a, d, b, c) {
  return b * (a /= c) * a * (2.70158 * a - 1.70158) + d;
}

function easeOutBack(a, d, b, c) {
  return b * ((a = a / c - 1) * a * (2.70158 * a + 1.70158) + 1) + d;
}

function CCard(a, d, b) {
  var c,
    e,
    f = -1,
    q,
    l,
    n,
    t,
    v,
    h,
    g,
    u,
    r,
    m;
  this._init = function (z, E, p) {
    m = p;
    p = {
      images: [s_oSpriteLibrary.getSprite("card_spritesheet")],
      frames: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        regX: CARD_WIDTH / 2,
        regY: CARD_HEIGHT / 2,
      },
      animations: {
        card_1_1: [0],
        card_1_2: [1],
        card_1_3: [2],
        card_1_4: [3],
        card_1_5: [4],
        card_1_6: [5],
        card_1_7: [6],
        card_1_8: [7],
        card_1_9: [8],
        card_1_10: [9],
        card_1_J: [10],
        card_1_Q: [11],
        card_1_K: [12],
        card_2_1: [13],
        card_2_2: [14],
        card_2_3: [15],
        card_2_4: [16],
        card_2_5: [17],
        card_2_6: [18],
        card_2_7: [19],
        card_2_8: [20],
        card_2_9: [21],
        card_2_10: [22],
        card_2_J: [23],
        card_2_Q: [24],
        card_2_K: [25],
        card_3_1: [26],
        card_3_2: [27],
        card_3_3: [28],
        card_3_4: [29],
        card_3_5: [30],
        card_3_6: [31],
        card_3_7: [32],
        card_3_8: [33],
        card_3_9: [34],
        card_3_10: [35],
        card_3_J: [36],
        card_3_Q: [37],
        card_3_K: [38],
        card_4_1: [39],
        card_4_2: [40],
        card_4_3: [41],
        card_4_4: [42],
        card_4_5: [43],
        card_4_6: [44],
        card_4_7: [45],
        card_4_8: [46],
        card_4_9: [47],
        card_4_10: [48],
        card_4_J: [49],
        card_4_Q: [50],
        card_4_K: [51],
        back: [52],
      },
    };
    p = new createjs.SpriteSheet(p);
    r = createSprite(
      p,
      "back",
      CARD_WIDTH / 2,
      CARD_HEIGHT / 2,
      CARD_WIDTH,
      CARD_HEIGHT
    );
    r.x = z;
    r.y = E;
    r.rotation = 120;
    r.stop();
    m.addChild(r);
    g = [];
    u = [];
  };
  this.unload = function () {
    h = v = null;
    m.removeChild(r);
  };
  this.addEventListener = function (z, E, p) {
    g[z] = E;
    u[z] = p;
  };
  this.setInfo = function (z, E, p, J, I, F) {
    e = !1;
    t = 0;
    q = parseInt(p);
    l = J;
    v = z;
    h = E;
    n = F;
    c = I;
    f = STATE_CARD_DEALING;
  };
  this.removeFromTable = function () {
    g[ON_CARD_TO_REMOVE] &&
      g[ON_CARD_TO_REMOVE].call(u[ON_CARD_TO_REMOVE], this);
  };
  this.initRemoving = function (z) {
    v = new CVector2(r.x, r.y);
    h = z;
    t = 0;
    f = STATE_CARD_REMOVING;
  };
  this.setValue = function () {
    r.gotoAndStop(q);
    var z = this;
    createjs.Tween.get(r)
      .to(
        {
          scaleX: 1,
        },
        100
      )
      .call(function () {
        z.cardShown();
      });
  };
  this.showCard = function () {
    var z = this;
    createjs.Tween.get(r)
      .to(
        {
          scaleX: 0.1,
        },
        100
      )
      .call(function () {
        z.setValue();
      });
  };
  this.hideCard = function () {
    var z = this;
    createjs.Tween.get(r)
      .to(
        {
          scaleX: 0.1,
        },
        100
      )
      .call(function () {
        z.setBack();
      });
  };
  this.setBack = function () {
    r.gotoAndStop("back");
    var z = this;
    createjs.Tween.get(r)
      .to(
        {
          scaleX: 1,
        },
        100
      )
      .call(function () {
        z.cardHidden();
      });
  };
  this.cardShown = function () {
    g[ON_CARD_SHOWN] && g[ON_CARD_SHOWN].call(u[ON_CARD_SHOWN]);
  };
  this.cardHidden = function () {
    e = !0;
  };
  this.getValue = function () {
    return l;
  };
  this.getFotogram = function () {
    return q;
  };
  this._updateDealing = function () {
    t += s_iTimeElaps;
    if (t > TIME_CARD_DEALING)
      (f = -1),
        (t = 0),
        (r.x = h.getX()),
        (r.y = h.getY()),
        (r.rotation = 360),
        g[ON_CARD_ANIMATION_ENDING] &&
          g[ON_CARD_ANIMATION_ENDING].call(
            u[ON_CARD_ANIMATION_ENDING],
            this,
            c,
            n
          ),
        this.showCard();
    else {
      this.visible = !0;
      var z = easeInOutCubic(t, 0, 1, TIME_CARD_DEALING),
        E = new CVector2();
      E = tweenVectors(v, h, z, E);
      r.x = E.getX();
      r.y = E.getY();
      r.rotation = 120 + (24e3 * z) / 100;
    }
  };
  this._updateRemoving = function () {
    t += s_iTimeElaps;
    if (t > TIME_CARD_REMOVE)
      (t = 0),
        (e = r.visible = !1),
        (f = -1),
        g[ON_CARD_TO_REMOVE] &&
          g[ON_CARD_TO_REMOVE].call(u[ON_CARD_TO_REMOVE], this);
    else {
      var z = easeInOutCubic(t, 0, 1, TIME_CARD_REMOVE),
        E = new CVector2();
      E = tweenVectors(v, h, z, E);
      r.x = E.getX();
      r.y = E.getY();
      r.rotation = (4500 * z) / 100;
    }
  };
  this.update = function () {
    switch (f) {
      case STATE_CARD_DEALING:
        this._updateDealing();
        break;
      case STATE_CARD_REMOVING:
        !0 === e && this._updateRemoving();
    }
  };
  s_oCard = this;
  this._init(a, d, b);
}
var s_oCard;

function CGameOver() {
  var a, d, b, c;
  this._init = function () {
    c = new createjs.Container();
    s_oStage.addChild(c);
    c.on("click", function () {});
    var e = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
    c.addChild(e);
    a = new CTLText(
      c,
      CANVAS_WIDTH / 2 - 170,
      280,
      340,
      130,
      32,
      "center",
      "#fff",
      FONT_GAME_1,
      1,
      0,
      0,
      TEXT_NO_MONEY,
      !0,
      !0,
      !0,
      !1
    );
    a.setShadow("#000000", 2, 2, 2);
    d = new CTextButton(
      CANVAS_WIDTH / 2 - 100,
      450,
      s_oSpriteLibrary.getSprite("but_game_bg"),
      TEXT_RECHARGE,
      FONT_GAME_1,
      "#fff",
      14,
      c
    );
    d.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
    b = new CTextButton(
      CANVAS_WIDTH / 2 + 100,
      450,
      s_oSpriteLibrary.getSprite("but_game_bg"),
      TEXT_EXIT,
      FONT_GAME_1,
      "#fff",
      14,
      c
    );
    b.addEventListener(ON_MOUSE_UP, this._onExit, this);
    this.hide();
  };
  this.unload = function () {
    d.unload();
    b.unload();
    c.off("click", function () {});
  };
  this.show = function () {
    c.visible = !0;
  };
  this.hide = function () {
    c.visible = !1;
  };
  this._onRecharge = function () {
    $(s_oMain).trigger("recharge");
  };
  this._onExit = function () {
    s_oGame.onExit();
  };
  this._init();
}

function CWinDisplay(a, d, b) {
  var c, e, f, q;
  this._init = function (n, t) {
    c = n;
    q = new createjs.Container();
    q.visible = !1;
    q.x = n;
    q.y = t;
    l.addChild(q);
    var v = s_oSpriteLibrary.getSprite("win_bg"),
      h = createBitmap(v);
    q.addChild(h);
    e = new CTLText(
      q,
      v.width / 2 - 90,
      v.height / 2 - 38,
      180,
      33,
      23,
      "center",
      "#ffffff",
      FONT_GAME_1,
      1,
      0,
      0,
      " ",
      !0,
      !0,
      !1,
      !1
    );
    f = new CTLText(
      q,
      v.width / 2 - 90,
      v.height / 2 + 6,
      180,
      33,
      29,
      "center",
      "#ffffff",
      FONT_GAME_1,
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
  this.show = function (n, t, v) {
    e.refreshText(n);
    0 < t
      ? (f.setColor("#07a74f"), f.refreshText(v + " " + t.toFixed(2)))
      : (f.setColor("#ce0909"), f.refreshText(TEXT_NO_WIN));
    q.visible = !0;
    createjs.Tween.get(q).to(
      {
        x: CANVAS_WIDTH / 2 + 100,
      },
      400,
      createjs.Ease.cubicOut
    );
  };
  this.hide = function () {
    createjs.Tween.get(q)
      .to(
        {
          x: c,
        },
        400,
        createjs.Ease.cubicOut
      )
      .call(function () {
        q.visible = !1;
      });
  };
  var l = b;
  this._init(a, d);
}

function CHistory(a, d, b) {
  var c, e, f, q, l, n, t, v, h, g, u;
  this._init = function (m, z) {
    v = s_oSpriteLibrary.getSprite("history_cell");
    g = new createjs.Container();
    g.x = m;
    g.y = z;
    r.addChild(g);
    n = createBitmap(s_oSpriteLibrary.getSprite("history_bg"));
    n.alpha = 0;
    g.addChild(n);
    u = new createjs.Container();
    u.x = 5;
    u.y = 5;
    g.addChild(u);
    q = 7 * v.height;
    h = new createjs.Shape();
    h.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(u.x, u.y, v.width, q);
    g.addChild(h);
    u.mask = h;
    t = createBitmap(s_oSpriteLibrary.getSprite("history_highlight"));
    t.alpha = 0;
    t.x = 5;
    t.y = 5;
    g.addChild(t);
    l = [];
  };
  this.addHistoryRow = function (m, z, E) {
    c = m;
    e = z;
    f = E;
    if (0 < l.length) for (m = 0; m < l.length; m++) l[m].moveDown(this);
    else
      createjs.Tween.get(n).to(
        {
          alpha: 1,
        },
        400,
        createjs.Ease.cubicOut
      ),
        createjs.Tween.get(t).to(
          {
            alpha: 1,
          },
          400,
          createjs.Ease.cubicOut
        ),
        (m = new CHistoryRow(0, 0, c, e, f, v, u)),
        l.push(m);
  };
  this._showNextRow = function (m) {
    m === l[0] &&
      (0 < l.length && l[0].getY() >= q && (l[0].unload(), l.splice(0, 1)),
      (m = new CHistoryRow(0, 0, c, e, f, v, u)),
      l.push(m));
  };
  this.setPosition = function (m, z) {
    g.x = m;
    g.y = z;
  };
  var r = b;
  this._init(a, d);
}

function CHistoryRow(a, d, b, c, e, f, q) {
  var l, n;
  this._init = function (h, g, u, r, m) {
    l = m.height;
    n = new createjs.Container();
    n.alpha = 0;
    n.x = h;
    n.y = g;
    v.addChild(n);
    g = new createjs.SpriteSheet({
      images: [m],
      frames: {
        width: m.width / 2,
        height: m.height,
      },
      animations: {
        state_lose: [0],
        state_win: [1],
      },
    });
    h = [];
    h[0] = createSprite(g, "state_lose", 0, 0, m.width / 2, m.height);
    n.addChild(h[0]);
    h[1] = createSprite(g, "state_lose", 0, 0, m.width / 2, m.height);
    h[1].x = m.width / 2;
    n.addChild(h[1]);
    0 < e && h[e - 1].gotoAndStop("state_win");
    u = new createjs.Text(u, "24px " + FONT_GAME_1, "#fff");
    u.x = h[0].x + m.width / 4;
    u.y = h[0].y + m.height / 2;
    u.textAlign = "center";
    u.textBaseline = "middle";
    n.addChild(u);
    r = new createjs.Text(r, "24px " + FONT_GAME_1, "#fff");
    r.x = h[1].x + m.width / 4;
    r.y = h[1].y + m.height / 2;
    r.textAlign = "center";
    r.textBaseline = "middle";
    n.addChild(r);
    createjs.Tween.get(n).to(
      {
        alpha: 1,
      },
      400,
      createjs.Ease.cubicOut
    );
  };
  this.unload = function () {
    v.removeChild(n);
  };
  this.moveDown = function (h) {
    var g = n.y + l;
    createjs.Tween.get(n)
      .to(
        {
          y: g,
        },
        400,
        createjs.Ease.cubicOut
      )
      .call(function () {
        h._showNextRow(t);
      });
  };
  this.getY = function () {
    return n.y;
  };
  var t = this;
  var v = q;
  this._init(a, d, b, c, f);
}

function CMsgBox() {
  var a, d, b, c;
  this._init = function () {
    c = new createjs.Container();
    c.alpha = 0;
    c.visible = !1;
    s_oStage.addChild(c);
    a = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
    c.addChild(a);
    b = new CTLText(
      c,
      CANVAS_WIDTH / 2 - 208,
      CANVAS_HEIGHT / 2 - 90,
      400,
      180,
      34,
      "center",
      "#000",
      FONT_GAME_1,
      1,
      0,
      0,
      TEXT_NO_MONEY,
      !0,
      !0,
      !0,
      !1
    );
    d = new CTLText(
      c,
      CANVAS_WIDTH / 2 - 210,
      CANVAS_HEIGHT / 2 - 92,
      400,
      180,
      34,
      "center",
      "#ffffff",
      FONT_GAME_1,
      1,
      0,
      0,
      TEXT_NO_MONEY,
      !0,
      !0,
      !0,
      !1
    );
  };
  this.unload = function () {
    c.off("mousedown", this._onExit);
  };
  this._initListener = function () {
    c.on("mousedown", this._onExit);
  };
  this.show = function (e) {
    b.refreshText(e);
    d.refreshText(e);
    c.visible = !0;
    var f = this;
    createjs.Tween.get(c)
      .to(
        {
          alpha: 1,
        },
        500
      )
      .call(function () {
        f._initListener();
      });
    setTimeout(function () {
      f._onExit();
    }, 3e3);
  };
  this._onExit = function () {
    c.visible && (c.off("mousedown"), (c.visible = !1));
  };
  this._init();
  return this;
}

function CCreditsPanel() {
  var a, d, b, c, e, f, q, l, n;
  this._init = function () {
    n = new createjs.Container();
    s_oStage.addChild(n);
    var t = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
    n.addChild(t);
    f = new createjs.Shape();
    f.graphics
      .beginFill("rgba(0,0,0,0.7)")
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    n.addChild(f);
    t = s_oSpriteLibrary.getSprite("msg_box");
    b = createBitmap(t);
    b.x = CANVAS_WIDTH / 2;
    b.y = CANVAS_HEIGHT / 2;
    b.regX = t.width / 2;
    b.regY = t.height / 2;
    n.addChild(b);
    q = new createjs.Shape();
    q.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    q.alpha = 0.01;
    d = q.on("click", this._onLogoButRelease);
    n.addChild(q);
    t = s_oSpriteLibrary.getSprite("but_exit");
    a = CANVAS_WIDTH / 2 - 234;
    c = new CGfxButton(a, 270, t, n);
    c.addEventListener(ON_MOUSE_UP, this.unload, this);
    e = new createjs.Text(
      TEXT_CREDITS_DEVELOPED,
      "26px " + FONT_GAME_1,
      "#ffffff"
    );
    e.x = CANVAS_WIDTH / 2;
    e.y = 310;
    e.textAlign = "center";
    n.addChild(e);
    t = s_oSpriteLibrary.getSprite("logo_credits");
    var v = createBitmap(t);
    v.regX = t.width / 2;
    v.regY = t.height / 2;
    v.x = CANVAS_WIDTH / 2;
    v.y = CANVAS_HEIGHT / 2;
    n.addChild(v);
    l = new createjs.Text(
      "www.codethislab.com",
      "24px " + FONT_GAME_1,
      "#ffffff"
    );
    l.x = CANVAS_WIDTH / 2;
    l.y = 420;
    l.textAlign = "center";
    n.addChild(l);
  };
  this.unload = function () {
    q.off("click", d);
    c.unload();
    c = null;
    s_oStage.removeChild(n);
  };
  this._onLogoButRelease = function () {
    window.open("http://www.codethislab.com/index.php?&l=en");
  };
  this._init();
}
CTLText.prototype = {
  constructor: CTLText,
  __autofit: function () {
    if (this._bFitText) {
      for (
        var a = this._iStartingFontSize;
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
  setX: function (a) {
    this._x = this._oText.x = a;
  },
  setY: function (a) {
    this._y = this._oText.y = a;
  },
  setVerticalAlign: function (a) {
    this._bVerticalAlign = a;
  },
  setOutline: function (a) {
    null !== this._oText && (this._oText.outline = a);
  },
  setShadow: function (a, d, b, c) {
    null !== this._oText &&
      (this._oText.shadow = new createjs.Shadow(a, d, b, c));
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
  getBounds: function () {
    return this._oText.getBounds();
  },
  refreshText: function (a) {
    "" === a && (a = " ");
    null === this._oText && this.__createText(a);
    this._oText.text = a;
    this._oText.font = this._iStartingFontSize + "px " + this._szFont;
    this._oText.lineHeight = Math.round(
      this._iStartingFontSize * this._fLineHeightFactor
    );
    this.__autofit();
    this.__updateY();
    this.__verticalAlign();
  },
};

function CTLText(a, d, b, c, e, f, q, l, n, t, v, h, g, u, r, m, z) {
  this._oContainer = a;
  this._x = d;
  this._y = b;
  this._iWidth = c;
  this._iHeight = e;
  this._bMultiline = m;
  this._iFontSize = this._iStartingFontSize = f;
  this._szAlign = q;
  this._szColor = l;
  this._szFont = n;
  this._iPaddingH = v;
  this._iPaddingV = h;
  this._bVerticalAlign = r;
  this._bFitText = u;
  this._bDebug = z;
  this._oDebugShape = null;
  this._fLineHeightFactor = t;
  this._oText = null;
  g && this.__createText(g);
}

function CFiche(a, d, b, c, e, f, q) {
  var l, n, t, v, h, g, u;
  this._init = function (r, m, z, E, p) {
    u = new createjs.Container();
    u.x = r;
    u.y = m;
    u.scaleX = u.scaleY = e;
    q.addChild(u);
    r = s_oSpriteLibrary.getSprite("fiche_highlight");
    h = createBitmap(r);
    h.x = -9;
    h.y = -9;
    h.visible = !1;
    u.addChild(h);
    r = s_oSpriteLibrary.getSprite("fiche_" + z);
    g = createBitmap(r);
    u.addChild(g);
    new CTLText(
      u,
      8,
      8,
      r.width - 21,
      20,
      20,
      "center",
      COLOR_FICHE_PER_VALUE[z],
      FONT_GAME_1,
      1,
      0,
      0,
      E,
      !0,
      !0,
      !1,
      !1
    );
    p &&
      ((l = !1),
      (n = []),
      (t = []),
      u.on("mousedown", this.buttonDown),
      u.on("pressup", this.buttonRelease));
    u.regX = r.width / 2;
    u.regY = r.height / 2;
  };
  this.addEventListener = function (r, m, z) {
    n[r] = m;
    t[r] = z;
  };
  this.addEventListenerWithParams = function (r, m, z, E) {
    n[r] = m;
    t[r] = z;
    v = E;
  };
  this.select = function (r) {
    h.visible = r;
  };
  this.enable = function () {
    l = !1;
  };
  this.disable = function () {
    l = !0;
  };
  this.buttonRelease = function () {
    l ||
      ((u.scaleX = e),
      (u.scaleY = e),
      n[ON_MOUSE_UP] && n[ON_MOUSE_UP].call(t[ON_MOUSE_UP], v));
  };
  this.buttonDown = function () {
    l ||
      ((u.scaleX = 0.9 * e),
      (u.scaleY = 0.9 * e),
      n[ON_MOUSE_DOWN] && n[ON_MOUSE_DOWN].call(t[ON_MOUSE_DOWN], v));
  };
  this.getX = function () {
    return u.x;
  };
  this.getY = function () {
    return u.x;
  };
  this._init(a, d, b, c, f);
}

function extractHostname(a) {
  a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
  a = a.split(":")[0];
  return (a = a.split("?")[0]);
}

function extractRootDomain(a) {
  a = extractHostname(a);
  var d = a.split("."),
    b = d.length;
  2 < b && (a = d[b - 2] + "." + d[b - 1]);
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
    } catch (b) {
      d = !0;
    }
    return {
      topFrame: a,
      err: d,
    };
  },
  getBestPageUrl = function (a) {
    var d = a.topFrame,
      b = "";
    if (a.err)
      try {
        try {
          b = window.top.location.href;
        } catch (e) {
          var c = window.location.ancestorOrigins;
          b = c[c.length - 1];
        }
      } catch (e) {
        b = d.document.referrer;
      }
    else b = d.location.href;
    return b;
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
      b = 0;
    b < d.length;
    b++
  )
    if (d[b] === a) return !0;
  return !1;
}
