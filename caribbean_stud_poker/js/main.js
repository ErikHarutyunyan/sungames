(function () {
  function a(h) {
    h = String(h);
    return h.charAt(0).toUpperCase() + h.slice(1);
  }

  function c(h, L) {
    var J = -1,
      C = h ? h.length : 0;
    if ("number" == typeof C && -1 < C && C <= B)
      for (; ++J < C; ) L(h[J], J, h);
    else d(h, L);
  }

  function b(h) {
    h = String(h).replace(/^ +| +$/g, "");
    return /^(?:webOS|i(?:OS|P))/.test(h) ? h : a(h);
  }

  function d(h, L) {
    for (var J in h) v.call(h, J) && L(h[J], J, h);
  }

  function e(h) {
    return null == h ? a(h) : w.call(h).slice(8, -1);
  }

  function f(h, L) {
    var J = null != h ? typeof h[L] : "number";
    return (
      !/^(?:boolean|number|string|undefined)$/.test(J) &&
      ("object" == J ? !!h[L] : !0)
    );
  }

  function k(h) {
    return String(h).replace(/([ -])(?!$)/g, "$1?");
  }

  function n(h, L) {
    var J = null;
    c(h, function (C, D) {
      J = L(J, C, D, h);
    });
    return J;
  }

  function r(h) {
    function L(Q) {
      return n(Q, function (O, N) {
        var U = N.pattern || k(N);
        !O &&
          (O =
            RegExp("\\b" + U + " *\\d+[.\\w_]*", "i").exec(h) ||
            RegExp("\\b" + U + " *\\w+-[\\w]*", "i").exec(h) ||
            RegExp(
              "\\b" + U + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)",
              "i"
            ).exec(h)) &&
          ((O = String(
            N.label && !RegExp(U, "i").test(N.label) ? N.label : O
          ).split("/"))[1] &&
            !/[\d.]+/.test(O[0]) &&
            (O[0] += " " + O[1]),
          (N = N.label || N),
          (O = b(
            O[0]
              .replace(RegExp(U, "i"), N)
              .replace(RegExp("; *(?:" + N + "[_-])?", "i"), " ")
              .replace(RegExp("(" + N + ")[-_.]?(\\w)", "i"), "$1 $2")
          )));
        return O;
      });
    }

    function J(Q) {
      return n(Q, function (O, N) {
        return (
          O ||
          (RegExp(
            N + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)",
            "i"
          ).exec(h) || 0)[1] ||
          null
        );
      });
    }
    var C = m,
      D = h && "object" == typeof h && "String" != e(h);
    D && ((C = h), (h = null));
    var P = C.navigator || {},
      x = P.userAgent || "";
    h || (h = x);
    var R = D
        ? !!P.likeChrome
        : /\bChrome\b/.test(h) && !/internal|\n/i.test(w.toString()),
      S = D ? "Object" : "ScriptBridgingProxyObject",
      I = D ? "Object" : "Environment",
      z = D && C.java ? "JavaPackage" : e(C.java),
      M = D ? "Object" : "RuntimeObject";
    I = (z = /\bJava/.test(z) && C.java) && e(C.environment) == I;
    var T = z ? "a" : "\u03b1",
      Z = z ? "b" : "\u03b2",
      aa = C.document || {},
      G = C.operamini || C.opera,
      E = l.test((E = D && G ? G["[[Class]]"] : e(G))) ? E : (G = null),
      g,
      Y = h;
    D = [];
    var V = null,
      y = h == x;
    x = y && G && "function" == typeof G.version && G.version();
    var F = (function (Q) {
        return n(Q, function (O, N) {
          return (
            O ||
            (RegExp("\\b" + (N.pattern || k(N)) + "\\b", "i").exec(h) &&
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
      u = (function (Q) {
        return n(Q, function (O, N) {
          return (
            O ||
            (RegExp("\\b" + (N.pattern || k(N)) + "\\b", "i").exec(h) &&
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
      H = L([
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
      W = (function (Q) {
        return n(Q, function (O, N, U) {
          return (
            O ||
            ((N[H] ||
              N[/^[a-z]+(?: +[a-z]+\b)*/i.exec(H)] ||
              RegExp("\\b" + k(U) + "(?:\\b|\\w*\\d)", "i").exec(h)) &&
              U)
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
      A = (function (Q) {
        return n(Q, function (O, N) {
          var U = N.pattern || k(N);
          if (
            !O &&
            (O = RegExp("\\b" + U + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(h))
          ) {
            var X = O,
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
            U &&
              ba &&
              /^Win/i.test(X) &&
              !/^Windows Phone /i.test(X) &&
              (ca = ca[/[\d.]+$/.exec(X)]) &&
              (X = "Windows " + ca);
            X = String(X);
            U && ba && (X = X.replace(RegExp(U, "i"), ba));
            O = X = b(
              X.replace(/ ce$/i, " CE")
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
    F && (F = [F]);
    W && !H && (H = L([W]));
    if ((g = /\bGoogle TV\b/.exec(H))) H = g[0];
    /\bSimulator\b/i.test(h) && (H = (H ? H + " " : "") + "Simulator");
    "Opera Mini" == u &&
      /\bOPiOS\b/.test(h) &&
      D.push("running in Turbo/Uncompressed mode");
    "IE" == u && /\blike iPhone OS\b/.test(h)
      ? ((g = r(h.replace(/like iPhone OS/, ""))),
        (W = g.manufacturer),
        (H = g.product))
      : /^iP/.test(H)
      ? (u || (u = "Safari"),
        (A =
          "iOS" +
          ((g = / OS ([\d_]+)/i.exec(h)) ? " " + g[1].replace(/_/g, ".") : "")))
      : "Konqueror" != u || /buntu/i.test(A)
      ? (W &&
          "Google" != W &&
          ((/Chrome/.test(u) && !/\bMobile Safari\b/i.test(h)) ||
            /\bVita\b/.test(H))) ||
        (/\bAndroid\b/.test(A) && /^Chrome/.test(u) && /\bVersion\//i.test(h))
        ? ((u = "Android Browser"), (A = /\bAndroid\b/.test(A) ? A : "Android"))
        : "Silk" == u
        ? (/\bMobi/i.test(h) || ((A = "Android"), D.unshift("desktop mode")),
          /Accelerated *= *true/i.test(h) && D.unshift("accelerated"))
        : "PaleMoon" == u && (g = /\bFirefox\/([\d.]+)\b/.exec(h))
        ? D.push("identifying as Firefox " + g[1])
        : "Firefox" == u && (g = /\b(Mobile|Tablet|TV)\b/i.exec(h))
        ? (A || (A = "Firefox OS"), H || (H = g[1]))
        : !u ||
          (g = !/\bMinefield\b/i.test(h) && /\b(?:Firefox|Safari)\b/.exec(u))
        ? (u &&
            !H &&
            /[\/,]|^[^(]+?\)/.test(h.slice(h.indexOf(g + "/") + 8)) &&
            (u = null),
          (g = H || W || A) &&
            (H || W || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(A)) &&
            (u =
              /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(A) ? A : g) +
              " Browser"))
        : "Electron" == u &&
          (g = (/\bChrome\/([\d.]+)\b/.exec(h) || 0)[1]) &&
          D.push("Chromium " + g)
      : (A = "Kubuntu");
    x ||
      (x = J([
        "(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))",
        "Version",
        k(u),
        "(?:Firefox|Minefield|NetFront)",
      ]));
    if (
      (g =
        ("iCab" == F && 3 < parseFloat(x) && "WebKit") ||
        (/\bOpera\b/.test(u) && (/\bOPR\b/.test(h) ? "Blink" : "Presto")) ||
        (/\b(?:Midori|Nook|Safari)\b/i.test(h) &&
          !/^(?:Trident|EdgeHTML)$/.test(F) &&
          "WebKit") ||
        (!F && /\bMSIE\b/i.test(h) && ("Mac OS" == A ? "Tasman" : "Trident")) ||
        ("WebKit" == F && /\bPlayStation\b(?! Vita\b)/i.test(u) && "NetFront"))
    )
      F = [g];
    "IE" == u && (g = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(h) || 0)[1])
      ? ((u += " Mobile"),
        (A = "Windows Phone " + (/\+$/.test(g) ? g : g + ".x")),
        D.unshift("desktop mode"))
      : /\bWPDesktop\b/i.test(h)
      ? ((u = "IE Mobile"),
        (A = "Windows Phone 8.x"),
        D.unshift("desktop mode"),
        x || (x = (/\brv:([\d.]+)/.exec(h) || 0)[1]))
      : "IE" != u &&
        "Trident" == F &&
        (g = /\brv:([\d.]+)/.exec(h)) &&
        (u && D.push("identifying as " + u + (x ? " " + x : "")),
        (u = "IE"),
        (x = g[1]));
    if (y) {
      if (f(C, "global"))
        if (
          (z &&
            ((g = z.lang.System),
            (Y = g.getProperty("os.arch")),
            (A =
              A ||
              g.getProperty("os.name") + " " + g.getProperty("os.version"))),
          I)
        ) {
          try {
            (x = C.require("ringo/engine").version.join(".")), (u = "RingoJS");
          } catch (Q) {
            (g = C.system) &&
              g.global.system == C.system &&
              ((u = "Narwhal"), A || (A = g[0].os || null));
          }
          u || (u = "Rhino");
        } else
          "object" == typeof C.process &&
            !C.process.browser &&
            (g = C.process) &&
            ("object" == typeof g.versions &&
              ("string" == typeof g.versions.electron
                ? (D.push("Node " + g.versions.node),
                  (u = "Electron"),
                  (x = g.versions.electron))
                : "string" == typeof g.versions.nw &&
                  (D.push("Chromium " + x, "Node " + g.versions.node),
                  (u = "NW.js"),
                  (x = g.versions.nw))),
            u ||
              ((u = "Node.js"),
              (Y = g.arch),
              (A = g.platform),
              (x = (x = /[\d.]+/.exec(g.version)) ? x[0] : null)));
      else
        e((g = C.runtime)) == S
          ? ((u = "Adobe AIR"), (A = g.flash.system.Capabilities.os))
          : e((g = C.phantom)) == M
          ? ((u = "PhantomJS"),
            (x =
              (g = g.version || null) &&
              g.major + "." + g.minor + "." + g.patch))
          : "number" == typeof aa.documentMode &&
            (g = /\bTrident\/(\d+)/i.exec(h))
          ? ((x = [x, aa.documentMode]),
            (g = +g[1] + 4) != x[1] &&
              (D.push("IE " + x[1] + " mode"), F && (F[1] = ""), (x[1] = g)),
            (x = "IE" == u ? String(x[1].toFixed(1)) : x[0]))
          : "number" == typeof aa.documentMode &&
            /^(?:Chrome|Firefox)\b/.test(u) &&
            (D.push("masking as " + u + " " + x),
            (u = "IE"),
            (x = "11.0"),
            (F = ["Trident"]),
            (A = "Windows"));
      A = A && b(A);
    }
    x &&
      (g =
        /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(x) ||
        /(?:alpha|beta)(?: ?\d)?/i.exec(h + ";" + (y && P.appMinorVersion)) ||
        (/\bMinefield\b/i.test(h) && "a")) &&
      ((V = /b/i.test(g) ? "beta" : "alpha"),
      (x =
        x.replace(RegExp(g + "\\+?$"), "") +
        ("beta" == V ? Z : T) +
        (/\d+\+?/.exec(g) || "")));
    if (
      "Fennec" == u ||
      ("Firefox" == u && /\b(?:Android|Firefox OS)\b/.test(A))
    )
      u = "Firefox Mobile";
    else if ("Maxthon" == u && x) x = x.replace(/\.[\d.]+/, ".x");
    else if (/\bXbox\b/i.test(H))
      "Xbox 360" == H && (A = null),
        "Xbox 360" == H && /\bIEMobile\b/.test(h) && D.unshift("mobile mode");
    else if (
      (!/^(?:Chrome|IE|Opera)$/.test(u) &&
        (!u || H || /Browser|Mobi/.test(u))) ||
      ("Windows CE" != A && !/Mobi/i.test(h))
    )
      if ("IE" == u && y)
        try {
          null === C.external && D.unshift("platform preview");
        } catch (Q) {
          D.unshift("embedded");
        }
      else
        (/\bBlackBerry\b/.test(H) || /\bBB10\b/.test(h)) &&
        (g =
          (RegExp(H.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(h) ||
            0)[1] || x)
          ? ((g = [g, /BB10/.test(h)]),
            (A =
              (g[1] ? ((H = null), (W = "BlackBerry")) : "Device Software") +
              " " +
              g[0]),
            (x = null))
          : this != d &&
            "Wii" != H &&
            ((y && G) ||
              (/Opera/.test(u) && /\b(?:MSIE|Firefox)\b/i.test(h)) ||
              ("Firefox" == u && /\bOS X (?:\d+\.){2,}/.test(A)) ||
              ("IE" == u &&
                ((A && !/^Win/.test(A) && 5.5 < x) ||
                  (/\bWindows XP\b/.test(A) && 8 < x) ||
                  (8 == x && !/\bTrident\b/.test(h))))) &&
            !l.test((g = r.call(d, h.replace(l, "") + ";"))) &&
            g.name &&
            ((g = "ing as " + g.name + ((g = g.version) ? " " + g : "")),
            l.test(u)
              ? (/\bIE\b/.test(g) && "Mac OS" == A && (A = null),
                (g = "identify" + g))
              : ((g = "mask" + g),
                (u = E ? b(E.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera"),
                /\bIE\b/.test(g) && (A = null),
                y || (x = null)),
            (F = ["Presto"]),
            D.push(g));
    else u += " Mobile";
    if ((g = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(h) || 0)[1])) {
      g = [parseFloat(g.replace(/\.(\d)$/, ".0$1")), g];
      if ("Safari" == u && "+" == g[1].slice(-1))
        (u = "WebKit Nightly"), (V = "alpha"), (x = g[1].slice(0, -1));
      else if (
        x == g[1] ||
        x == (g[2] = (/\bSafari\/([\d.]+\+?)/i.exec(h) || 0)[1])
      )
        x = null;
      g[1] = (/\bChrome\/([\d.]+)/i.exec(h) || 0)[1];
      537.36 == g[0] &&
        537.36 == g[2] &&
        28 <= parseFloat(g[1]) &&
        "WebKit" == F &&
        (F = ["Blink"]);
      y && (R || g[1])
        ? (F && (F[1] = "like Chrome"),
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
              : "Blink" != F
              ? "27"
              : "28")))
        : (F && (F[1] = "like Safari"),
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
      F &&
        (F[1] +=
          " " + (g += "number" == typeof g ? ".x" : /[.+]/.test(g) ? "" : "+"));
      "Safari" == u && (!x || 45 < parseInt(x)) && (x = g);
    }
    "Opera" == u && (g = /\bzbov|zvav$/.exec(A))
      ? ((u += " "),
        D.unshift("desktop mode"),
        "zvav" == g ? ((u += "Mini"), (x = null)) : (u += "Mobile"),
        (A = A.replace(RegExp(" *" + g + "$"), "")))
      : "Safari" == u &&
        /\bChrome\b/.exec(F && F[1]) &&
        (D.unshift("desktop mode"),
        (u = "Chrome Mobile"),
        (x = null),
        /\bOS X\b/.test(A) ? ((W = "Apple"), (A = "iOS 4.3+")) : (A = null));
    x &&
      0 == x.indexOf((g = /[\d.]+$/.exec(A))) &&
      -1 < h.indexOf("/" + g + "-") &&
      (A = String(A.replace(g, "")).replace(/^ +| +$/g, ""));
    F &&
      !/\b(?:Avant|Nook)\b/.test(u) &&
      (/Browser|Lunascape|Maxthon/.test(u) ||
        ("Safari" != u && /^iOS/.test(A) && /\bSafari\b/.test(F[1])) ||
        (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
          u
        ) &&
          F[1])) &&
      (g = F[F.length - 1]) &&
      D.push(g);
    D.length && (D = ["(" + D.join("; ") + ")"]);
    W && H && 0 > H.indexOf(W) && D.push("on " + W);
    H && D.push((/^on /.test(D[D.length - 1]) ? "" : "on ") + H);
    if (A) {
      var da =
        (g = / ([\d.+]+)$/.exec(A)) &&
        "/" == A.charAt(A.length - g[0].length - 1);
      A = {
        architecture: 32,
        family: g && !da ? A.replace(g[0], "") : A,
        version: g ? g[1] : null,
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
    (g = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(Y)) && !/\bi686\b/i.test(Y)
      ? (A &&
          ((A.architecture = 64),
          (A.family = A.family.replace(RegExp(" *" + g), ""))),
        u &&
          (/\bWOW64\b/i.test(h) ||
            (y &&
              /\w(?:86|32)$/.test(P.cpuClass || P.platform) &&
              !/\bWin64; x64\b/i.test(h))) &&
          D.unshift("32-bit"))
      : A &&
        /^OS X/.test(A.family) &&
        "Chrome" == u &&
        39 <= parseFloat(x) &&
        (A.architecture = 64);
    h || (h = null);
    C = {};
    C.description = h;
    C.layout = F && F[0];
    C.manufacturer = W;
    C.name = u;
    C.prerelease = V;
    C.product = H;
    C.ua = h;
    C.version = u && x;
    C.os = A || {
      architecture: null,
      family: null,
      version: null,
      toString: function () {
        return "null";
      },
    };
    C.parse = r;
    C.toString = function () {
      return this.description || "";
    };
    C.version && D.unshift(x);
    C.name && D.unshift(u);
    A &&
      u &&
      (A != String(A).split(" ")[0] || (A != u.split(" ")[0] && !H)) &&
      D.push(H ? "(" + A + ")" : "on " + A);
    D.length && (C.description = D.join(" "));
    return C;
  }
  var p = {
      function: !0,
      object: !0,
    },
    m = (p[typeof window] && window) || this,
    q = p[typeof exports] && exports;
  p = p[typeof module] && module && !module.nodeType && module;
  var t = q && p && "object" == typeof global && global;
  !t || (t.global !== t && t.window !== t && t.self !== t) || (m = t);
  var B = Math.pow(2, 53) - 1,
    l = /\bOpera/;
  t = Object.prototype;
  var v = t.hasOwnProperty,
    w = t.toString,
    K = r();
  "function" == typeof define && "object" == typeof define.amd && define.amd
    ? ((m.platform = K),
      define(function () {
        return K;
      }))
    : q && p
    ? d(K, function (h, L) {
        q[L] = h;
      })
    : (m.platform = K);
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
      c = 0;
    c < a.length;
    c++
  ) {
    var b = document.createElement("meta");
    b.name = a[c].name;
    b.content = a[c].content;
    var d = window.document.head.querySelector('meta[name="' + b.name + '"]');
    d && d.parentNode.removeChild(d);
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

function isIOSLessThen13() {
  var a = platform.os,
    c = a.family.toLowerCase();
  a = parseFloat(a.version);
  return "ios" === c && 13 > a ? !0 : !1;
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

function getSize(a) {
  var c = a.toLowerCase(),
    b = window.document,
    d = b.documentElement;
  if (void 0 === window["inner" + a]) a = d["client" + a];
  else if (window["inner" + a] != d["client" + a]) {
    var e = b.createElement("body");
    e.id = "vpw-test-b";
    e.style.cssText = "overflow:scroll";
    var f = b.createElement("div");
    f.id = "vpw-test-d";
    f.style.cssText = "position:absolute;top:-1000px";
    f.innerHTML =
      "<style>@media(" +
      c +
      ":" +
      d["client" + a] +
      "px){body#vpw-test-b div#vpw-test-d{" +
      c +
      ":7px!important}}</style>";
    e.appendChild(f);
    d.insertBefore(e, b.head);
    a = 7 == f["offset" + a] ? d["client" + a] : window["inner" + a];
    d.removeChild(e);
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
    var c = getSize("Width");
    s_bFocus && _checkOrientation(c, a);
    var b = Math.min(a / CANVAS_HEIGHT, c / CANVAS_WIDTH),
      d = Math.round(CANVAS_WIDTH * b);
    b = Math.round(CANVAS_HEIGHT * b);
    if (b < a) {
      var e = a - b;
      b += e;
      d += (CANVAS_WIDTH / CANVAS_HEIGHT) * e;
    } else
      d < c &&
        ((e = c - d), (d += e), (b += (CANVAS_HEIGHT / CANVAS_WIDTH) * e));
    e = a / 2 - b / 2;
    var f = c / 2 - d / 2,
      k = CANVAS_WIDTH / d;
    if (f * k < -EDGEBOARD_X || e * k < -EDGEBOARD_Y)
      (b = Math.min(
        a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y),
        c / (CANVAS_WIDTH - 2 * EDGEBOARD_X)
      )),
        (d = Math.round(CANVAS_WIDTH * b)),
        (b = Math.round(CANVAS_HEIGHT * b)),
        (e = (a - b) / 2),
        (f = (c - d) / 2),
        (k = CANVAS_WIDTH / d);
    s_iOffsetX = -1 * f * k;
    s_iOffsetY = -1 * e * k;
    0 <= e && (s_iOffsetY = 0);
    0 <= f && (s_iOffsetX = 0);
    null !== s_oInterface &&
      s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    s_bIsIphone
      ? ((canvas = document.getElementById("canvas")),
        (s_oStage.canvas.width = 2 * d),
        (s_oStage.canvas.height = 2 * b),
        (canvas.style.width = d + "px"),
        (canvas.style.height = b + "px"),
        (c = Math.min(d / CANVAS_WIDTH, b / CANVAS_HEIGHT)),
        (s_iScaleFactor = 2 * c),
        (s_oStage.scaleX = s_oStage.scaleY = 2 * c))
      : s_bMobile && !1 === isIOS()
      ? ($("#canvas").css("width", d + "px"),
        $("#canvas").css("height", b + "px"))
      : ((s_oStage.canvas.width = d),
        (s_oStage.canvas.height = b),
        (s_iScaleFactor = Math.min(d / CANVAS_WIDTH, b / CANVAS_HEIGHT)),
        (s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor));
    0 > e || (e = (a - b) / 2);
    $("#canvas").css("top", e + "px");
    $("#canvas").css("left", f + "px");
    fullscreenHandler();
  }
}

function _checkOrientation(a, c) {
  s_bMobile &&
    ENABLE_CHECK_ORIENTATION &&
    (a > c
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

function createBitmap(a, c, b) {
  var d = new createjs.Bitmap(a),
    e = new createjs.Shape();
  c && b
    ? e.graphics.beginFill("#fff").drawRect(0, 0, c, b)
    : e.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
  d.hitArea = e;
  return d;
}

function createSprite(a, c, b, d, e, f) {
  a = null !== c ? new createjs.Sprite(a, c) : new createjs.Sprite(a);
  c = new createjs.Shape();
  c.graphics.beginFill("#000000").drawRect(-b, -d, e, f);
  a.hitArea = c;
  return a;
}
(function () {
  function a(b) {
    var d = {
      focus: "visible",
      focusin: "visible",
      pageshow: "visible",
      blur: "hidden",
      focusout: "hidden",
      pagehide: "hidden",
    };
    b = b || window.event;
    b.type in d
      ? (document.body.className = d[b.type])
      : ((document.body.className = this[c] ? "hidden" : "visible"),
        "hidden" === document.body.className
          ? (s_oMain.stopUpdate(), (s_bFocus = !1))
          : (s_oMain.startUpdate(), (s_bFocus = !0)));
  }
  var c = "hidden";
  c in document
    ? document.addEventListener("visibilitychange", a)
    : (c = "mozHidden") in document
    ? document.addEventListener("mozvisibilitychange", a)
    : (c = "webkitHidden") in document
    ? document.addEventListener("webkitvisibilitychange", a)
    : (c = "msHidden") in document
    ? document.addEventListener("msvisibilitychange", a)
    : "onfocusin" in document
    ? (document.onfocusin = document.onfocusout = a)
    : (window.onpageshow =
        window.onpagehide =
        window.onfocus =
        window.onblur =
          a);
})();

function randomFloatBetween(a, c, b) {
  "undefined" === typeof b && (b = 2);
  return parseFloat(Math.min(a + Math.random() * (c - a), c).toFixed(b));
}

function shuffle(a) {
  for (var c = a.length, b, d; 0 !== c; )
    (d = Math.floor(Math.random() * c)),
      --c,
      (b = a[c]),
      (a[c] = a[d]),
      (a[d] = b);
  return a;
}

function formatTime(a) {
  a /= 1e3;
  var c = Math.floor(a / 60);
  a = parseFloat(a - 60 * c).toFixed(1);
  var b = "";
  b = 10 > c ? b + ("0" + c + ":") : b + (c + ":");
  return 10 > a ? b + ("0" + a) : b + a;
}
Array.prototype.sortOn = function () {
  var a = this.slice();
  if (!arguments.length) return a.sort();
  var c = Array.prototype.slice.call(arguments);
  return a.sort(function (b, d) {
    for (var e = c.slice(), f = e.shift(); b[f] == d[f] && e.length; )
      f = e.shift();
    return b[f] == d[f] ? 0 : b[f] > d[f] ? 1 : -1;
  });
};

function roundDecimal(a, c) {
  var b = Math.pow(10, c);
  return Math.round(b * a) / b;
}

function tweenVectors(a, c, b, d) {
  d.set(
    a.getX() + b * (c.getX() - a.getX()),
    a.getY() + b * (c.getY() - a.getY())
  );
  return d;
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
      var c = document.createEvent("MouseEvents");
      c.initEvent("click", !0, !0);
      a.dispatchEvent(c);
    }
  },
};

function playSound(a, c, b) {
  return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
    ? (s_aSounds[a].play(),
      s_aSounds[a].volume(c),
      s_aSounds[a].loop(b),
      s_aSounds[a])
    : null;
}

function stopSound(a) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].stop();
}

function setVolume(a, c) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].volume(c);
}

function setMute(a, c) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].mute(c);
}

function ctlArcadeResume() {
  null !== s_oMain && s_oMain.startUpdate();
}

function ctlArcadePause() {
  null !== s_oMain && s_oMain.stopUpdate();
}

function getParamValue(a) {
  for (
    var c = window.location.search.substring(1).split("&"), b = 0;
    b < c.length;
    b++
  ) {
    var d = c[b].split("=");
    if (d[0] == a) return d[1];
  }
}

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

function CSpriteLibrary() {
  var a = {},
    c,
    b,
    d,
    e,
    f,
    k;
  this.init = function (n, r, p) {
    c = {};
    d = b = 0;
    e = n;
    f = r;
    k = p;
  };
  this.addSprite = function (n, r) {
    if (a.hasOwnProperty(n)) return !1;
    var p = new Image();
    a[n] = c[n] = {
      szPath: r,
      oSprite: p,
      bLoaded: !1,
    };
    b++;
    return !0;
  };
  this.getSprite = function (n) {
    return a.hasOwnProperty(n) ? a[n].oSprite : null;
  };
  this._onSpritesLoaded = function () {
    b = 0;
    f.call(k);
  };
  this._onSpriteLoaded = function () {
    e.call(k);
    ++d === b && this._onSpritesLoaded();
  };
  this.loadSprites = function () {
    for (var n in c)
      (c[n].oSprite.oSpriteLibrary = this),
        (c[n].oSprite.szKey = n),
        (c[n].oSprite.onload = function () {
          this.oSpriteLibrary.setLoaded(this.szKey);
          this.oSpriteLibrary._onSpriteLoaded(this.szKey);
        }),
        (c[n].oSprite.onerror = function (r) {
          var p = r.currentTarget;
          setTimeout(function () {
            c[p.szKey].oSprite.src = c[p.szKey].szPath;
          }, 500);
        }),
        (c[n].oSprite.src = c[n].szPath);
  };
  this.setLoaded = function (n) {
    a[n].bLoaded = !0;
  };
  this.isLoaded = function (n) {
    return a[n].bLoaded;
  };
  this.getNumSprites = function () {
    return b;
  };
}
var CANVAS_WIDTH = 1700,
  CANVAS_HEIGHT = 768,
  EDGEBOARD_X = 250,
  EDGEBOARD_Y = 0,
  FPS_TIME = 1e3 / 24,
  DISABLE_SOUND_MOBILE = !1,
  FONT_GAME_1 = "arialbold",
  FONT_GAME_2 = "Digital-7",
  STATE_LOADING = 0,
  STATE_MENU = 1,
  STATE_HELP = 1,
  STATE_GAME = 3,
  STATE_GAME_WAITING_FOR_BET = 0,
  STATE_GAME_DEALING = 1,
  STATE_GAME_PLAYER_TURN = 2,
  STATE_GAME_SHOWDOWN = 3,
  STATE_GAME_DISTRIBUTE_FICHES = 4,
  STATE_GAME_SHOW_WINNER = 5,
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
  TIME_FICHES_MOV = 600,
  TIME_CARD_DEALING = 250,
  TIME_CARD_REMOVE = 1e3,
  TIME_SHOW_FINAL_CARDS = 4e3,
  TIME_END_HAND,
  BET_TIME = 1e4,
  AD_SHOW_COUNTER,
  NUM_DECKS = 4,
  PAYOUT_MULT,
  ROYAL_FLUSH = 0,
  STRAIGHT_FLUSH = 1,
  FOUR_OF_A_KIND = 2,
  FULL_HOUSE = 3,
  FLUSH = 4,
  STRAIGHT = 5,
  THREE_OF_A_KIND = 6,
  TWO_PAIR = 7,
  ONE_PAIR = 8,
  HIGH_CARD = 9,
  NO_HAND = 10,
  CARD_TWO = 2,
  CARD_THREE = 3,
  CARD_FOUR = 4,
  CARD_FIVE = 5,
  CARD_SIX = 6,
  CARD_SEVEN = 7,
  CARD_EIGHT = 8,
  CARD_NINE = 9,
  CARD_TEN = 10,
  CARD_JACK = 11,
  CARD_QUEEN = 12,
  CARD_KING = 13,
  CARD_ACE = 14,
  BET_ANTE = 0,
  BET_RAISE = 1,
  POS_BET = [],
  MULTIPLIERS = [],
  COLOR_FICHE_PER_VALUE = "#fff #000 #000 #fff #fff #fff".split(" "),
  FICHES_VALUE,
  ENABLE_FULLSCREEN,
  ENABLE_CHECK_ORIENTATION,
  SHOW_CREDITS,
  TEXT_DEAL = "DEAL",
  TEXT_MIN_BET = "MIN BET",
  TEXT_MAX_BET = "MAX BET",
  TEXT_RECHARGE = "RECHARGE",
  TEXT_EXIT = "EXIT",
  TEXT_MONEY = "MONEY",
  TEXT_CURRENCY = "$",
  TEXT_RAISE = "RAISE",
  TEXT_FOLD = "FOLD",
  TEXT_CREDITS_DEVELOPED = "DEVELOPED BY",
  TEXT_PRELOADER_CONTINUE = "START",
  TEXT_DISPLAY_MSG_WAITING_BET = "WAITING FOR YOUR BET",
  TEXT_DISPLAY_MSG_PLAYER_LOSE = "PLAYER LOSES THIS HAND!",
  TEXT_DISPLAY_MSG_STANDOFF = "STAND OFF",
  TEXT_DISPLAY_MSG_PLAYER_WIN = "PLAYER WINS",
  TEXT_DISPLAY_MSG_USER_TURN = "PLAYER TURN. RAISE OR FOLD?",
  TEXT_DISPLAY_MSG_SHOWDOWN = "SHOWDOWN!",
  TEXT_DISPLAY_MSG_DEALING = "DEALING...",
  TEXT_DISPLAY_MSG_NOT_QUALIFY = "DEALER DOES NOT QUALIFY",
  TEXT_NO_MONEY = "YOU DON'T HAVE ENOUGH MONEY!!!",
  TEXT_NO_MONEY_FOR_RAISE =
    "YOU DON'T HAVE ENOUGH MONEY FOR RAISE BET EVENTUALLY!!!",
  TEXT_HAND_WON_PLAYER = "HAND WON BY THE PLAYER",
  TEXT_HAND_WON_DEALER = "HAND WON BY THE DEALER",
  TEXT_ERROR_MIN_BET = "YOUR BET IS LOWER THAN MINIMUM BET!!",
  TEXT_ERROR_MAX_BET = "YOUR BET IS HIGHER THAN MAXIMUM BET!!",
  TEXT_EVALUATOR =
    "ROYAL FLUSH;STRAIGHT FLUSH;FOUR OF A KIND;FULL HOUSE;FLUSH;STRAIGHT;THREE OF A KIND;TWO PAIR;ONE PAIR;HIGH CARD;NO HAND".split(
      ";"
    ),
  TEXT_SHARE_IMAGE = "200x200.jpg",
  TEXT_SHARE_TITLE = "Congratulations!",
  TEXT_SHARE_MSG1 = "You collected <strong>",
  TEXT_SHARE_MSG2 =
    " points</strong>!<br><br>Share your score with your friends!",
  TEXT_SHARE_SHARE1 = "My score is ",
  TEXT_SHARE_SHARE2 = " points! Can you do better?";

function CPreloader() {
  var a, c, b, d, e, f, k, n, r, p;
  this._init = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
    s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
    s_oSpriteLibrary.addSprite("but_start", "./sprites/but_start.png");
    s_oSpriteLibrary.loadSprites();
    p = new createjs.Container();
    s_oStage.addChild(p);
  };
  this.unload = function () {
    p.removeAllChildren();
    r.unload();
  };
  this._onImagesLoaded = function () {};
  this._onAllImagesLoaded = function () {
    this.attachSprites();
    s_oMain.preloaderReady();
  };
  this.attachSprites = function () {
    var m = new createjs.Shape();
    m.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    p.addChild(m);
    m = s_oSpriteLibrary.getSprite("200x200");
    k = createBitmap(m);
    k.regX = 0.5 * m.width;
    k.regY = 0.5 * m.height;
    k.x = CANVAS_WIDTH / 2;
    k.y = CANVAS_HEIGHT / 2 - 180;
    p.addChild(k);
    n = new createjs.Shape();
    n.graphics
      .beginFill("rgba(0,0,0,0.01)")
      .drawRoundRect(k.x - 100, k.y - 100, 200, 200, 10);
    p.addChild(n);
    k.mask = n;
    m = s_oSpriteLibrary.getSprite("progress_bar");
    d = createBitmap(m);
    d.x = CANVAS_WIDTH / 2 - m.width / 2;
    d.y = CANVAS_HEIGHT / 2 + 50;
    p.addChild(d);
    a = m.width;
    c = m.height;
    e = new createjs.Shape();
    e.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, 1, c);
    p.addChild(e);
    d.mask = e;
    b = new createjs.Text("", "30px " + FONT_GAME_1, "#fff");
    b.x = CANVAS_WIDTH / 2;
    b.y = CANVAS_HEIGHT / 2 + 100;
    b.textBaseline = "alphabetic";
    b.textAlign = "center";
    p.addChild(b);
    m = s_oSpriteLibrary.getSprite("but_start");
    r = new CTextButton(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2,
      m,
      TEXT_PRELOADER_CONTINUE,
      "Arial",
      "#000",
      "bold 50",
      p
    );
    r.addEventListener(ON_MOUSE_UP, this._onButStartRelease, this);
    r.setVisible(!1);
    f = new createjs.Shape();
    f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    p.addChild(f);
    createjs.Tween.get(f)
      .to(
        {
          alpha: 0,
        },
        500
      )
      .call(function () {
        createjs.Tween.removeTweens(f);
        p.removeChild(f);
      });
  };
  this._onButStartRelease = function () {
    s_oMain._onRemovePreloader();
  };
  this.refreshLoader = function (m) {
    b.text = m + "%";
    100 === m &&
      (s_oMain._onRemovePreloader(), (b.visible = !1), (d.visible = !1));
    e.graphics.clear();
    m = Math.floor((m * a) / 100);
    e.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, m, c);
  };
  this._init();
}

function CMain(a) {
  var c,
    b = 0,
    d = 0,
    e = STATE_LOADING,
    f,
    k;
  this.initContainer = function () {
    var r = document.getElementById("canvas");
    s_oStage = new createjs.Stage(r);
    createjs.Touch.enable(s_oStage, !0);
    s_bMobile = isMobile();
    !1 === s_bMobile && s_oStage.enableMouseOver(20);
    s_iPrevTime = new Date().getTime();
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", this._update);
    navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
    s_oSpriteLibrary = new CSpriteLibrary();
    f = new CPreloader();
    s_oGameSettings = new CGameSettings();
    c = !0;
  };
  this.preloaderReady = function () {
    this._loadImages();
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || this._initSounds();
  };
  this.soundLoaded = function () {
    b++;
    f.refreshLoader(Math.floor((b / d) * 100));
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
    d += s_aSoundsInfo.length;
    s_aSounds = [];
    for (var r = 0; r < s_aSoundsInfo.length; r++)
      this.tryToLoadSound(s_aSoundsInfo[r], !1);
  };
  this.tryToLoadSound = function (r, p) {
    setTimeout(
      function () {
        s_aSounds[r.ingamename] = new Howl({
          src: [r.path + r.filename + ".mp3"],
          autoplay: !1,
          preload: !0,
          loop: r.loop,
          volume: r.volume,
          onload: s_oMain.soundLoaded,
          onloaderror: function (m, q) {
            for (var t = 0; t < s_aSoundsInfo.length; t++)
              if (m === s_aSounds[s_aSoundsInfo[t].ingamename]._sounds[0]._id) {
                s_oMain.tryToLoadSound(s_aSoundsInfo[t], !0);
                break;
              }
          },
          onplayerror: function (m) {
            for (var q = 0; q < s_aSoundsInfo.length; q++)
              if (m === s_aSounds[s_aSoundsInfo[q].ingamename]._sounds[0]._id) {
                s_aSounds[s_aSoundsInfo[q].ingamename].once(
                  "unlock",
                  function () {
                    s_aSounds[s_aSoundsInfo[q].ingamename].play();
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
    s_oSpriteLibrary.addSprite("win_bg", "./sprites/win_bg.png");
    s_oSpriteLibrary.addSprite("but_clear", "./sprites/but_clear.png");
    s_oSpriteLibrary.addSprite("but_generic", "./sprites/but_generic.png");
    s_oSpriteLibrary.addSprite("but_rebet", "./sprites/but_rebet.png");
    s_oSpriteLibrary.addSprite("gui_bg", "./sprites/gui_bg.png");
    s_oSpriteLibrary.addSprite("bet_ante", "./sprites/bet_ante.png");
    s_oSpriteLibrary.addSprite("bet_raise", "./sprites/bet_raise.png");
    s_oSpriteLibrary.addSprite("paytable_bg", "./sprites/paytable_bg.png");
    s_oSpriteLibrary.addSprite("help_cursor", "./sprites/help_cursor.png");
    s_oSpriteLibrary.addSprite(
      "but_fullscreen",
      "./sprites/but_fullscreen.png"
    );
    s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
    s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
    for (var r = 0; r < NUM_FICHES; r++)
      s_oSpriteLibrary.addSprite("fiche_" + r, "./sprites/fiche_" + r + ".png");
    d += s_oSpriteLibrary.getNumSprites();
    s_oSpriteLibrary.loadSprites();
  };
  this._onImagesLoaded = function () {
    b++;
    f.refreshLoader(Math.floor((b / d) * 100));
  };
  this._onAllImagesLoaded = function () {};
  this.onAllPreloaderImagesLoaded = function () {
    this._loadImages();
  };
  this._onRemovePreloader = function () {
    f.unload();
    this.gotoMenu();
  };
  this.gotoMenu = function () {
    new CMenu();
    e = STATE_MENU;
  };
  this.gotoGame = function () {
    k = new CGame(n);
    e = STATE_GAME;
  };
  this.gotoHelp = function () {
    new CHelp();
    e = STATE_HELP;
  };
  this.stopUpdate = function () {
    c = !1;
    createjs.Ticker.paused = !0;
    $("#block_game").css("display", "block");
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || Howler.mute(!0);
  };
  this.startUpdate = function () {
    s_iPrevTime = new Date().getTime();
    c = !0;
    createjs.Ticker.paused = !1;
    $("#block_game").css("display", "none");
    (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) &&
      s_bAudioActive &&
      Howler.mute(!1);
  };
  this._update = function (r) {
    if (c) {
      var p = new Date().getTime();
      s_iTimeElaps = p - s_iPrevTime;
      s_iCntTime += s_iTimeElaps;
      s_iCntFps++;
      s_iPrevTime = p;
      1e3 <= s_iCntTime &&
        ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0));
      e === STATE_GAME && k.update();
      s_oStage.update(r);
    }
  };
  s_oMain = this;
  var n = a;
  ENABLE_CHECK_ORIENTATION = n.check_orientation;
  ENABLE_FULLSCREEN = n.fullscreen;
  SHOW_CREDITS = a.show_credits;
  FICHES_VALUE = a.fiche_values;
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
  s_bFullscreen = !1,
  s_oDrawLayer,
  s_oStage,
  s_oMain,
  s_oSpriteLibrary,
  s_oGameSettings,
  s_aSoundsInfo;

function CTextButton(a, c, b, d, e, f, k, n) {
  var r, p, m, q, t, B, l, v, w, K;
  this._init = function (h, L, J, C, D, P, x) {
    r = !1;
    p = 1;
    m = [];
    q = [];
    K = createBitmap(J);
    v = new createjs.Container();
    v.x = h;
    v.y = L;
    v.regX = J.width / 2;
    v.regY = J.height / 2;
    s_bMobile || (v.cursor = "pointer");
    v.addChild(K, w);
    n.addChild(v);
    w = new CTLText(
      v,
      10,
      5,
      J.width - 20,
      J.height - 10,
      x,
      "center",
      P,
      D,
      1,
      0,
      0,
      C,
      !0,
      !0,
      !1,
      !1
    );
    this._initListener();
  };
  this.unload = function () {
    v.off("mousedown", t);
    v.off("pressup", B);
    n.removeChild(v);
  };
  this.setVisible = function (h) {
    v.visible = h;
  };
  this.setAlign = function (h) {
    w.textAlign = h;
  };
  this.setTextX = function (h) {
    w.x = h;
  };
  this.setScale = function (h) {
    p = v.scaleX = v.scaleY = h;
  };
  this.enable = function () {
    r = !1;
  };
  this.disable = function () {
    r = !0;
  };
  this._initListener = function () {
    t = v.on("mousedown", this.buttonDown);
    B = v.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (h, L, J) {
    m[h] = L;
    q[h] = J;
  };
  this.addEventListenerWithParams = function (h, L, J, C) {
    m[h] = L;
    q[h] = J;
    l = C;
  };
  this.buttonRelease = function () {
    r ||
      (playSound("press_but", 1, !1),
      (v.scaleX = p),
      (v.scaleY = p),
      m[ON_MOUSE_UP] && m[ON_MOUSE_UP].call(q[ON_MOUSE_UP], l));
  };
  this.buttonDown = function () {
    r ||
      ((v.scaleX = 0.9 * p),
      (v.scaleY = 0.9 * p),
      m[ON_MOUSE_DOWN] && m[ON_MOUSE_DOWN].call(q[ON_MOUSE_DOWN]));
  };
  this.setPosition = function (h, L) {
    v.x = h;
    v.y = L;
  };
  this.tweenPosition = function (h, L, J, C, D, P, x) {
    createjs.Tween.get(v)
      .wait(C)
      .to(
        {
          x: h,
          y: L,
        },
        J,
        D
      )
      .call(function () {
        void 0 !== P && P.call(x);
      });
  };
  this.changeText = function (h) {
    w.refreshText(h);
  };
  this.setX = function (h) {
    v.x = h;
  };
  this.setY = function (h) {
    v.y = h;
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
  this.getSprite = function () {
    return v;
  };
  this.getScale = function () {
    return v.scaleX;
  };
  this._init(a, c, b, d, e, f, k);
}

function CGfxButton(a, c, b, d) {
  var e,
    f,
    k,
    n,
    r,
    p = [],
    m,
    q,
    t;
  this._init = function (l, v, w) {
    e = !1;
    n = [];
    r = [];
    f = w.width;
    k = w.height;
    t = createBitmap(w);
    t.x = l;
    t.y = v;
    t.regX = w.width / 2;
    t.regY = w.height / 2;
    t.cursor = "pointer";
    B.addChild(t);
    this._initListener();
  };
  this.unload = function () {
    t.off("mousedown", m);
    t.off("pressup", q);
    B.removeChild(t);
  };
  this.setVisible = function (l) {
    t.visible = l;
  };
  this._initListener = function () {
    m = t.on("mousedown", this.buttonDown);
    q = t.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (l, v, w) {
    n[l] = v;
    r[l] = w;
  };
  this.addEventListenerWithParams = function (l, v, w, K) {
    n[l] = v;
    r[l] = w;
    p = K;
  };
  this.buttonRelease = function () {
    e ||
      (playSound("press_but", 1, !1),
      (t.scaleX = t.scaleY = 1),
      n[ON_MOUSE_UP] && n[ON_MOUSE_UP].call(r[ON_MOUSE_UP], p));
  };
  this.buttonDown = function () {
    e ||
      ((t.scaleX = t.scaleY = 0.9),
      n[ON_MOUSE_DOWN] && n[ON_MOUSE_DOWN].call(r[ON_MOUSE_DOWN], p));
  };
  this.setPosition = function (l, v) {
    t.x = l;
    t.y = v;
  };
  this.setX = function (l) {
    t.x = l;
  };
  this.setY = function (l) {
    t.y = l;
  };
  this.enable = function () {
    e = !1;
    t.filters = [];
    t.cache(0, 0, f, k);
  };
  this.disable = function () {
    e = !0;
    var l = new createjs.ColorMatrix().adjustSaturation(-100);
    t.filters = [new createjs.ColorMatrixFilter(l)];
    t.cache(0, 0, f, k);
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
  var B = d;
  this._init(a, c, b);
  return this;
}

function CToggle(a, c, b, d, e) {
  var f,
    k,
    n,
    r = [],
    p,
    m,
    q;
  this._init = function (t, B, l, v) {
    k = [];
    n = [];
    var w = new createjs.SpriteSheet({
      images: [l],
      frames: {
        width: l.width / 2,
        height: l.height,
        regX: l.width / 2 / 2,
        regY: l.height / 2,
      },
      animations: {
        state_true: [0],
        state_false: [1],
      },
    });
    f = v;
    q = createSprite(
      w,
      "state_" + f,
      l.width / 2 / 2,
      l.height / 2,
      l.width / 2,
      l.height
    );
    q.x = t;
    q.y = B;
    q.cursor = "pointer";
    q.stop();
    e.addChild(q);
    this._initListener();
  };
  this.unload = function () {
    q.off("mousedown", p);
    q.off("pressup", m);
    e.removeChild(q);
  };
  this._initListener = function () {
    p = q.on("mousedown", this.buttonDown);
    m = q.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (t, B, l) {
    k[t] = B;
    n[t] = l;
  };
  this.addEventListenerWithParams = function (t, B, l, v) {
    k[t] = B;
    n[t] = l;
    r = v;
  };
  this.setActive = function (t) {
    f = t;
    q.gotoAndStop("state_" + f);
  };
  this.buttonRelease = function () {
    q.scaleX = 1;
    q.scaleY = 1;
    playSound("press_but", 1, !1);
    f = !f;
    q.gotoAndStop("state_" + f);
    k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(n[ON_MOUSE_UP], r);
  };
  this.buttonDown = function () {
    q.scaleX = 0.9;
    q.scaleY = 0.9;
    k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(n[ON_MOUSE_DOWN], r);
  };
  this.setPosition = function (t, B) {
    q.x = t;
    q.y = B;
  };
  this.setVisible = function (t) {
    q.visible = t;
  };
  this.getY = function () {
    return q.y;
  };
  this._init(a, c, b, d);
}

function CMenu() {
  var a,
    c,
    b,
    d,
    e,
    f,
    k,
    n,
    r,
    p,
    m,
    q = null,
    t = null,
    B;
  this._init = function () {
    k = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
    s_oStage.addChild(k);
    var l = s_oSpriteLibrary.getSprite("but_menu_bg");
    n = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 164, l, s_oStage);
    n.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
      (l = s_oSpriteLibrary.getSprite("audio_icon")),
        (e = CANVAS_WIDTH - l.width / 4 - 10),
        (f = l.height / 2 + 10),
        (r = new CToggle(e, f, l, s_bAudioActive, s_oStage)),
        r.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
    l = s_oSpriteLibrary.getSprite("but_credits");
    SHOW_CREDITS
      ? ((a = 10 + l.width / 2),
        (c = l.height / 2 + 10),
        (p = new CGfxButton(a, c, l, s_oStage)),
        p.addEventListener(ON_MOUSE_UP, this._onCredits, this),
        (b = a + l.width + 10),
        (d = c))
      : ((b = 10 + l.width / 2), (d = l.height / 2 + 10));
    l = window.document;
    var v = l.documentElement;
    q =
      v.requestFullscreen ||
      v.mozRequestFullScreen ||
      v.webkitRequestFullScreen ||
      v.msRequestFullscreen;
    t =
      l.exitFullscreen ||
      l.mozCancelFullScreen ||
      l.webkitExitFullscreen ||
      l.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (q = !1);
    q &&
      screenfull.isEnabled &&
      ((l = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (m = new CToggle(b, d, l, s_bFullscreen, s_oStage)),
      m.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    B = new createjs.Shape();
    B.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    s_oStage.addChild(B);
    createjs.Tween.get(B)
      .to(
        {
          alpha: 0,
        },
        400
      )
      .call(function () {
        B.visible = !1;
      });
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };
  this.refreshButtonPos = function (l, v) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      r.setPosition(e - l, v + f);
    q && screenfull.isEnabled && m.setPosition(b + l, d + v);
    SHOW_CREDITS && p.setPosition(a + l, c + v);
  };
  this.unload = function () {
    n.unload();
    n = null;
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) r.unload(), (r = null);
    SHOW_CREDITS && p.unload();
    q && screenfull.isEnabled && m.unload();
    s_oStage.removeAllChildren();
    s_oMenu = null;
  };
  this._onButPlayRelease = function () {
    this.unload();
    s_oMain.gotoGame();
    $(s_oMain).trigger("start_session");
  };
  this._onAudioToggle = function () {
    createjs.Sound.setMute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this._onCredits = function () {
    _oCreditsPanel = new CCreditsPanel();
  };
  this.resetFullscreenBut = function () {
    q && screenfull.isEnabled && m.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? t.call(window.document)
      : q.call(window.document.documentElement);
    sizeHandler();
  };
  s_oMenu = this;
  this._init();
}
var s_oMenu = null;

function CGame(a) {
  var c = !1,
    b,
    d,
    e,
    f,
    k,
    n,
    r,
    p,
    m,
    q,
    t,
    B,
    l,
    v,
    w,
    K,
    h,
    L,
    J,
    C,
    D,
    P,
    x,
    R,
    S,
    I,
    z,
    M,
    T,
    Z,
    aa,
    G,
    E,
    g,
    Y;
  this._init = function () {
    e = MAX_BET;
    f = -1;
    k = B = d = 0;
    s_oTweenController = new CTweenController();
    aa = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
    s_oStage.addChild(aa);
    G = new CInterface(TOTAL_MONEY);
    M = new createjs.Container();
    s_oStage.addChild(M);
    T = new CHandEvaluator();
    E = new CSeat();
    E.setCredit(TOTAL_MONEY);
    Z = new CHelpCursor(
      520,
      416,
      s_oSpriteLibrary.getSprite("help_cursor"),
      s_oStage
    );
    this.reset(!1);
    x = new CVector2();
    x.set(1214, 228);
    R = new CVector2();
    R.set(CANVAS_WIDTH / 2 - 199, 230);
    S = new CVector2();
    S.set(418, 820);
    I = new CVector2();
    I.set(0, -CANVAS_HEIGHT);
    z = new CVector2(454, 230);
    J = [E.getCardOffset(), R];
    Y = new CGameOver();
    E.getCredit() < FICHES_VALUE[0]
      ? (this._gameOver(), this.changeState(-1))
      : (c = !0);
    P = new CVector2(x.getX(), x.getY());
    g = new CMsgBox();
    this.changeState(STATE_GAME_WAITING_FOR_BET);
  };
  this.unload = function () {
    c = !1;
    for (var y = 0; y < w.length; y++) w[y].unload();
    G.unload();
    Y.unload();
    g.unload();
    s_oStage.removeAllChildren();
  };
  this.reset = function (y) {
    n = k = d = 0;
    E.reset();
    w = [];
    w.splice(0);
    K = [];
    L = [];
    G.reset();
    G.enableBetFiches(y);
    this.shuffleCard();
  };
  this.shuffleCard = function () {
    h = [];
    h = s_oGameSettings.getShuffledCardDeck();
  };
  this.changeState = function (y) {
    f = y;
    switch (y) {
      case STATE_GAME_WAITING_FOR_BET:
        G.displayMsg(
          TEXT_DISPLAY_MSG_WAITING_BET,
          TEXT_MIN_BET + ": " + MIN_BET + "\n" + TEXT_MAX_BET + ": " + MAX_BET
        );
        break;
      case STATE_GAME_DEALING:
        G.disableButtons(),
          G.displayMsg(TEXT_DISPLAY_MSG_DEALING, ""),
          this._dealing();
    }
  };
  this.cardFromDealerArrived = function (y, F, u) {
    (!1 === F || (F && 9 === u)) && y.showCard();
    10 > u && s_oGame._dealing();
  };
  this.setMoney = function (y) {
    E.setCredit(y);
    G.refreshCredit(y);
  };
  this._showWin = function () {
    b
      ? this._playerLose()
      : q === NO_HAND && "dealer" !== l
      ? this._playerWin(TEXT_DISPLAY_MSG_NOT_QUALIFY)
      : "player" === l
      ? this._playerWin(TEXT_HAND_WON_PLAYER)
      : "dealer" === l && q !== NO_HAND
      ? this._playerLose()
      : this._standOff();
    "player" === l ? playSound("win", 1, !1) : playSound("lose", 1, !1);
    this.changeState(STATE_GAME_DISTRIBUTE_FICHES);
    G.refreshCredit(E.getCredit());
    setTimeout(function () {
      E.clearBet();
      s_oGame.changeState(STATE_GAME_WAITING_FOR_BET);
      G.enableBetFiches(!0);
    }, 3 * TIME_CARD_REMOVE);
  };
  this._playerWin = function (y) {
    E.increaseCredit(p);
    V -= p;
    G.displayMsg(
      TEXT_DISPLAY_MSG_SHOWDOWN,
      TEXT_DISPLAY_MSG_PLAYER_WIN + " " + p + TEXT_CURRENCY
    );
    E.initMovement(0, S.getX(), S.getY());
    E.initMovement(1, S.getX(), S.getY());
    G.showResultText(y);
  };
  this._playerLose = function (y) {
    G.displayMsg(TEXT_DISPLAY_MSG_SHOWDOWN, TEXT_DISPLAY_MSG_PLAYER_LOSE);
    E.initMovement(0, I.getX(), I.getY());
    y || E.initMovement(1, I.getX(), I.getY());
    G.showResultText(TEXT_HAND_WON_DEALER);
  };
  this._standOff = function () {
    E.increaseCredit(p);
    V -= p;
    G.displayMsg(TEXT_DISPLAY_MSG_SHOWDOWN, TEXT_DISPLAY_MSG_STANDOFF);
    E.initMovement(0, S.getX(), S.getY());
    E.initMovement(1, S.getX(), S.getY());
    G.showResultText(TEXT_DISPLAY_MSG_STANDOFF);
  };
  this._dealing = function () {
    if (10 > n) {
      var y = new CCard(x.getX(), x.getY(), M);
      if (1 === n % J.length) {
        var F = new CVector2(R.getX() + (CARD_WIDTH / 2 + 7) * n, R.getY());
        var u = D.splice(0, 1),
          H = u[0].fotogram;
        u = u[0].rank;
        y.setInfo(P, F, H, u, !0, n);
        y.addEventListener(ON_CARD_SHOWN, this._onCardShown);
        K.push(y);
      } else
        (u = C.splice(0, 1)),
          (H = u[0].fotogram),
          (u = u[0].rank),
          y.setInfo(P, E.getAttachCardOffset(), H, u, !1, n),
          E.newCardDealed(),
          L.push(y);
      w.push(y);
      n++;
      y.addEventListener(ON_CARD_ANIMATION_ENDING, this.cardFromDealerArrived);
      playSound("card", 1, !1);
    } else
      setTimeout(function () {
        s_oGame.changeState(STATE_GAME_PLAYER_TURN);
        G.displayMsg(TEXT_DISPLAY_MSG_USER_TURN, "");
        G.enable(!1, !0, !0);
      }, 1e3);
  };
  this._onEndHand = function () {
    for (var y = new CVector2(z.getX(), z.getY()), F = 0; F < w.length; F++)
      w[F].initRemoving(y), w[F].hideCard();
    G.clearCardValueText();
    d = 0;
    s_oGame.changeState(STATE_GAME_SHOW_WINNER);
    playSound("fiche_collect", 1, !1);
    B++;
    B === AD_SHOW_COUNTER &&
      ((B = 0), $(s_oMain).trigger("show_interlevel_ad"));
    $(s_oMain).trigger("save_score", [E.getCredit()]);
  };
  this._onCardShown = function () {
    f === STATE_GAME_PLAYER_TURN &&
      (4 === m
        ? (G.showHandValue(q, t), (f = STATE_GAME_SHOWDOWN), s_oGame._showWin())
        : s_oGame._showNextDealerCard());
  };
  this.setBet = function (y, F) {
    if (G.isResultPanelvisible())
      G.disableBetFiches(), E.clearBet(), (v = this.setBet), this._onEndHand();
    else {
      var u = FICHES_VALUE[F];
      if (y === BET_ANTE) {
        d = 0;
        Z.hide();
        var H = E.getBetAnte() + u;
        if (2 * H > E.getCredit() - u) {
          G.displayMsg(TEXT_NO_MONEY_FOR_RAISE, "");
          return;
        }
        if (H > e) {
          g.show(TEXT_ERROR_MAX_BET);
          return;
        }
      } else H = 2 * E.getBetAnte();
      $(s_oMain).trigger("bet_placed", H);
      y === BET_ANTE
        ? (E.decreaseCredit(u), (V += u), E.betAnte(u), G.enable(!0, !1, !1))
        : (E.decreaseCredit(H), (V += H), E.betRaise());
      G.refreshCredit(E.getCredit());
    }
  };
  this._gameOver = function () {
    Y.show();
  };
  this._calculateTotalWin = function () {
    if (q === NO_HAND && "dealer" !== l)
      p = 2 * E.getBetAnte() + 2 * E.getBetAnte();
    else if ("player" === l) {
      var y = 2 * E.getBetAnte();
      p = y + y * PAYOUT_MULT[t] + y;
    } else
      p =
        "dealer" === l && q !== NO_HAND
          ? 0
          : E.getBetAnte() + 2 * E.getBetAnte();
  };
  this.onRebet = function () {
    G.isResultPanelvisible() && ((v = this.rebet), this._onEndHand());
  };
  this.onDeal = function () {
    r = E.getBetAnte() * PAYOUT_MULT[PAYOUT_MULT.length - 1];
    if (E.getBetAnte() < MIN_BET)
      g.show(TEXT_ERROR_MIN_BET), G.enableBetFiches(!1), G.enable(!1, !1, !1);
    else {
      M.removeAllChildren();
      if (
        (V + 2 * E.getBetAnte() < r
          ? WIN_OCCURRENCE + 1
          : Math.floor(101 * Math.random())) > WIN_OCCURRENCE
      ) {
        do {
          C = this._generateRandPlayerCards();
          D = this._generateRandDealerCards();
          var y = T.evaluate(D, !0),
            F = T.evaluate(C, !1);
          q = y.ret;
          t = F.ret;
          l = T.getWinnerComparingHands(F.sort_hand, y.sort_hand, t, q);
          this._calculateTotalWin();
        } while (q === NO_HAND || "player" === l || "dealer_no_hand" === l);
      } else {
        do
          (C = this._generateRandPlayerCards()),
            (D = this._generateRandDealerCards()),
            (y = T.evaluate(D, !0)),
            (F = T.evaluate(C, !1)),
            (q = y.ret),
            (t = F.ret),
            (l = T.getWinnerComparingHands(F.sort_hand, y.sort_hand, t, q)),
            this._calculateTotalWin();
        while ("dealer" === l || p > V + 2 * E.getBetAnte());
      }
      E.setPrevBet();
      playSound("card", 1, !1);
      b = !1;
      this.changeState(STATE_GAME_DEALING);
    }
  };
  this.onFold = function () {
    b = !0;
    l = "dealer";
    m = 0;
    this._showNextDealerCard();
  };
  this.onRaise = function () {
    f !== STATE_GAME_DISTRIBUTE_FICHES &&
      (this.setBet(BET_RAISE, G.getFicheSelected()),
      (m = 0),
      this._showNextDealerCard());
  };
  this._showNextDealerCard = function () {
    K[m].showCard();
    m++;
  };
  this._generateRandDealerCards = function () {
    for (var y = [], F = 0; 5 > F; F++)
      y.push({
        fotogram: h[k].fotogram,
        rank: h[k].rank,
        suit: h[k].suit,
      }),
        k++,
        this._checkDeckLength();
    return y;
  };
  this._generateRandPlayerCards = function () {
    for (var y = [], F = 0; 5 > F; F++)
      y.push({
        fotogram: h[k].fotogram,
        rank: h[k].rank,
        suit: h[k].suit,
      }),
        k++,
        this._checkDeckLength();
    return y;
  };
  this._checkDeckLength = function () {
    k >= h.length && ((h = s_oGameSettings.getShuffledCardDeck()), (k = 0));
  };
  this.clearBets = function () {
    if (f === STATE_GAME_WAITING_FOR_BET) {
      G.enable(!1, !1, !1);
      var y = E.getStartingBet();
      0 < y &&
        (E.clearBet(),
        E.increaseCredit(y),
        (V -= y),
        G.refreshCredit(E.getCredit()),
        (y = E.checkIfRebetIsPossible()),
        G.enableBetFiches(y));
    }
  };
  this.rebet = function () {
    this.clearBets();
    var y = E.rebet();
    V += y;
    G.enable(!0, !1, !1);
    G.refreshCredit(E.getCredit());
    d = BET_TIME;
  };
  this.onExit = function () {
    this.unload();
    $(s_oMain).trigger("save_score", [E.getCredit()]);
    $(s_oMain).trigger("end_session");
    $(s_oMain).trigger("share_event", E.getCredit());
    s_oMain.gotoMenu();
  };
  this.getState = function () {
    return f;
  };
  this._updateDealing = function () {
    for (var y = 0; y < w.length; y++) w[y].update();
  };
  this._updateFiches = function () {
    E.updateFichesController();
  };
  this._updateShowWinner = function () {
    for (var y = 0; y < w.length; y++) w[y].update();
    d += s_iTimeElaps;
    d > TIME_END_HAND &&
      ((d = 0),
      (y = E.checkIfRebetIsPossible()),
      this.reset(y),
      G.reset(),
      E.getCredit() < FICHES_VALUE[0]
        ? (this._gameOver(), this.changeState(-1))
        : E.getCredit() < FICHES_VALUE[0]
        ? (this._gameOver(), this.changeState(-1))
        : (this.changeState(STATE_GAME_WAITING_FOR_BET),
          v.call(this, 0, G.getFicheSelected())));
  };
  this.update = function () {
    if (!1 !== c)
      switch (f) {
        case STATE_GAME_WAITING_FOR_BET:
          d += s_iTimeElaps;
          6e3 < d &&
            ((d = 0), Z.isVisible() || 0 !== E.getBetAnte() || Z.show(1));
          break;
        case STATE_GAME_DEALING:
          this._updateDealing();
          break;
        case STATE_GAME_DISTRIBUTE_FICHES:
          this._updateFiches();
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
  var V = a.game_cash;
  PAYOUT_MULT = a.payout;
  TIME_END_HAND = a.time_show_hand;
  AD_SHOW_COUNTER = a.ad_show_counter;
  this._init();
}
var s_oGame, s_oTweenController;

function CInterface(a) {
  var c,
    b,
    d,
    e,
    f,
    k,
    n,
    r,
    p,
    m,
    q,
    t,
    B,
    l,
    v,
    w = null,
    K,
    h,
    L,
    J,
    C,
    D,
    P,
    x,
    R = null,
    S = null;
  this._init = function (I) {
    var z = s_oSpriteLibrary.getSprite("but_exit");
    d = CANVAS_WIDTH - z.width / 2 - 10;
    e = z.height / 2 + 10;
    p = new CGfxButton(d, e, z, s_oStage);
    p.addEventListener(ON_MOUSE_UP, this._onExit, this);
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
      (f = p.getX() - z.width - 10),
        (k = z.height / 2 + 10),
        (w = new CToggle(
          f,
          k,
          s_oSpriteLibrary.getSprite("audio_icon"),
          s_bAudioActive,
          s_oStage
        )),
        w.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
    z = window.document;
    var M = z.documentElement;
    R =
      M.requestFullscreen ||
      M.mozRequestFullScreen ||
      M.webkitRequestFullScreen ||
      M.msRequestFullscreen;
    S =
      z.exitFullscreen ||
      z.mozCancelFullScreen ||
      z.webkitExitFullscreen ||
      z.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (R = !1);
    R &&
      screenfull.isEnabled &&
      ((z = s_oSpriteLibrary.getSprite("but_fullscreen")),
      null === w
        ? ((c = p.getX() - z.width / 2 - 10), (b = z.height / 2 + 10))
        : ((c = f - z.width / 2 - 10), (b = z.height / 2 + 10)),
      (x = new CToggle(c, b, z, s_bFullscreen, s_oStage)),
      x.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    z = createBitmap(s_oSpriteLibrary.getSprite("display_bg"));
    z.x = 290;
    z.y = 6;
    s_oStage.addChild(z);
    z = s_oSpriteLibrary.getSprite("gui_bg");
    M = createBitmap(z);
    M.y = CANVAS_HEIGHT - z.height;
    s_oStage.addChild(M);
    z = s_oSpriteLibrary.getSprite("but_clear");
    m = new CGfxButton(830, CANVAS_HEIGHT - z.height / 2, z, s_oStage);
    m.disable();
    m.addEventListener(ON_MOUSE_UP, this._onButClearRelease, this);
    z = s_oSpriteLibrary.getSprite("but_rebet");
    q = new CGfxButton(890, CANVAS_HEIGHT - z.height / 2, z, s_oStage);
    q.disable();
    q.addEventListener(ON_MOUSE_UP, this._onButRebetRelease, this);
    z = s_oSpriteLibrary.getSprite("but_generic");
    B = new CTextButton(
      1012,
      CANVAS_HEIGHT - z.height / 2,
      z,
      TEXT_DEAL,
      FONT_GAME_1,
      "#ffffff",
      30,
      s_oStage
    );
    B.addEventListener(ON_MOUSE_UP, this._onButDealRelease, this);
    z = s_oSpriteLibrary.getSprite("but_generic");
    l = new CTextButton(
      1196,
      CANVAS_HEIGHT - z.height / 2,
      z,
      TEXT_RAISE,
      FONT_GAME_1,
      "#ffffff",
      30,
      s_oStage
    );
    l.addEventListener(ON_MOUSE_UP, this._onButRaiseRelease, this);
    z = s_oSpriteLibrary.getSprite("but_generic");
    v = new CTextButton(
      1380,
      CANVAS_HEIGHT - z.height / 2,
      z,
      TEXT_FOLD,
      FONT_GAME_1,
      "#ffffff",
      30,
      s_oStage
    );
    v.addEventListener(ON_MOUSE_UP, this._onButFoldRelease, this);
    POS_BET[BET_ANTE] = {
      x: CANVAS_WIDTH / 2 - 100,
      y: 440,
    };
    POS_BET[BET_RAISE] = {
      x: CANVAS_WIDTH / 2 + 100,
      y: 440,
    };
    t = new CGfxButton(
      POS_BET[BET_ANTE].x,
      POS_BET[BET_ANTE].y,
      s_oSpriteLibrary.getSprite("bet_ante"),
      s_oStage
    );
    t.addEventListener(ON_MOUSE_UP, this._onButAnteRelease, this);
    M = s_oSpriteLibrary.getSprite("bet_raise");
    var T = createBitmap(M);
    T.x = POS_BET[BET_RAISE].x;
    T.y = POS_BET[BET_RAISE].y;
    T.regX = M.width / 2;
    T.regY = M.height / 2;
    s_oStage.addChild(T);
    J = new CTLText(
      s_oStage,
      408,
      16,
      192,
      48,
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
    C = new CTLText(
      s_oStage,
      408,
      66,
      192,
      38,
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
    h = new CTLText(
      s_oStage,
      CANVAS_WIDTH / 2 - 180,
      290,
      360,
      21,
      21,
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
    L = new CTLText(
      s_oStage,
      CANVAS_WIDTH / 2 - 180,
      650,
      360,
      21,
      21,
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
    new CTLText(
      s_oStage,
      300,
      CANVAS_HEIGHT - 84,
      150,
      30,
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
    K = new CTLText(
      s_oStage,
      460,
      CANVAS_HEIGHT - 84,
      150,
      30,
      30,
      "left",
      "#ffde00",
      FONT_GAME_2,
      1,
      0,
      0,
      TEXT_CURRENCY + I.toFixed(2),
      !0,
      !0,
      !1,
      !1
    );
    I = [
      {
        x: 337,
        y: CANVAS_HEIGHT - 24,
      },
      {
        x: 417,
        y: CANVAS_HEIGHT - 24,
      },
      {
        x: 497,
        y: CANVAS_HEIGHT - 24,
      },
      {
        x: 577,
        y: CANVAS_HEIGHT - 24,
      },
      {
        x: 657,
        y: CANVAS_HEIGHT - 24,
      },
      {
        x: 737,
        y: CANVAS_HEIGHT - 24,
      },
    ];
    r = [];
    for (M = 0; M < NUM_FICHES; M++)
      (r[M] = new CFiche(I[M].x, I[M].y, M, FICHES_VALUE[M], 1, !0, s_oStage)),
        r[M].addEventListenerWithParams(
          ON_MOUSE_UP,
          this._onFicheClicked,
          this,
          [FICHES_VALUE[M], M]
        ),
        0 === M && r[0].select(!0);
    n = 0;
    FICHE_WIDTH = z.width;
    D = new CAnimText(CANVAS_WIDTH, CANVAS_HEIGHT, s_oStage);
    P = new CPaytablePanel(CANVAS_WIDTH - 303, 450, s_oStage);
    this.disableButtons();
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };
  this.unload = function () {
    p.unload();
    p = null;
    !1 === DISABLE_SOUND_MOBILE && (w.unload(), (w = null));
    R && screenfull.isEnabled && x.unload();
    m.unload();
    B.unload();
    q.unload();
    s_oInterface = null;
  };
  this.refreshButtonPos = function (I, z) {
    p.setPosition(d - I, z + e);
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      w.setPosition(f - I, z + k);
    R && screenfull.isEnabled && x.setPosition(c - I, b + z);
    P.refreshButtonPos(I, z);
  };
  this.reset = function () {
    this.disableButtons();
  };
  this.enableBetFiches = function (I) {
    for (var z = 0; z < NUM_FICHES; z++) r[z].enable();
    m.enable();
    t.enable();
    I && q.enable();
  };
  this.disableBetFiches = function () {
    for (var I = 0; I < NUM_FICHES; I++) r[I].disable();
    m.disable();
    q.disable();
    t.disable();
  };
  this.disableButtons = function () {
    B.disable();
    v.disable();
    l.disable();
  };
  this.enable = function (I, z, M) {
    I ? B.enable() : B.disable();
    z ? l.enable() : l.disable();
    M ? v.enable() : v.disable();
  };
  this.refreshCredit = function (I) {
    K.refreshText(TEXT_CURRENCY + I.toFixed(2));
  };
  this.refreshCardValue = function (I, z) {
    h.refreshText("" + I);
    L.refreshText("" + z);
  };
  this.displayMsg = function (I, z) {
    J.refreshText(I);
    C.refreshText(z);
  };
  this.clearCardValueText = function () {
    h.refreshText("");
    L.refreshText("");
    D.hide();
  };
  this._onFicheClicked = function (I) {
    for (var z = 0; z < r.length; z++) r[z].select(!1);
    r[I[1]].select(!0);
    n = I[1];
  };
  this.showResultText = function (I) {
    D.show(
      {
        x: -200,
        y: CANVAS_HEIGHT / 2 + 160,
      },
      {
        x: CANVAS_WIDTH / 2 - 450,
        y: CANVAS_HEIGHT / 2 + 160,
      },
      I
    );
  };
  this.showHandValue = function (I, z) {
    h.refreshText(TEXT_EVALUATOR[I]);
    L.refreshText(TEXT_EVALUATOR[z]);
  };
  this._onButClearRelease = function () {
    s_oGame.clearBets();
  };
  this._onButRebetRelease = function () {
    q.disable();
    s_oGame.onRebet();
  };
  this._onButAnteRelease = function () {
    s_oGame.setBet(BET_ANTE, n);
  };
  this._onButDealRelease = function () {
    this.disableBetFiches();
    this.disableButtons();
    s_oGame.onDeal();
  };
  this._onButRaiseRelease = function () {
    this.disableBetFiches();
    this.disableButtons();
    s_oGame.onRaise();
  };
  this._onButFoldRelease = function () {
    this.disableBetFiches();
    this.disableButtons();
    s_oGame.onFold();
  };
  this._onExit = function () {
    s_oGame.onExit();
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this.resetFullscreenBut = function () {
    R && screenfull.isEnabled && x.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? S.call(window.document)
      : R.call(window.document.documentElement);
    sizeHandler();
  };
  this.getFicheSelected = function () {
    return n;
  };
  this.isResultPanelvisible = function () {
    return D.isVisible();
  };
  s_oInterface = this;
  this._init(a);
  return this;
}
var s_oInterface = null;

function CTweenController() {
  this.tweenValue = function (a, c, b) {
    return a + b * (c - a);
  };
  this.easeLinear = function (a, c, b, d) {
    return (b * a) / d + c;
  };
  this.easeInCubic = function (a, c, b, d) {
    d = (a /= d) * a * a;
    return c + b * d;
  };
  this.easeBackInQuart = function (a, c, b, d) {
    d = (a /= d) * a;
    return c + b * (2 * d * d + 2 * d * a + -3 * d);
  };
  this.easeInBack = function (a, c, b, d) {
    return b * (a /= d) * a * (2.70158 * a - 1.70158) + c;
  };
  this.easeOutCubic = function (a, c, b, d) {
    return b * ((a = a / d - 1) * a * a + 1) + c;
  };
}

function CSeat() {
  var a, c, b, d, e, f, k, n, r, p;
  this._init = function () {
    n = new createjs.Container();
    n.x = CANVAS_WIDTH / 2 - 160;
    n.y = 586;
    s_oStage.addChild(n);
    p = [];
    for (var m = 0; 2 > m; m++) p[m] = new CFichesController();
    c = a = e = 0;
    this.reset();
    r = new CVector2();
    r.set(0, 0);
    k = new CVector2(r.getX(), r.getY());
  };
  this.unload = function () {
    s_oStage.removeChild(n);
  };
  this.addEventListener = function (m, q, t) {};
  this.reset = function () {
    for (var m = (d = 0); m < p.length; m++) p[m].reset();
    f = [];
    for (m = 0; 3 > m; m++) f[m] = [];
  };
  this.clearBet = function () {
    c = a = 0;
    f = [];
    for (var m = 0; m < p.length; m++) p[m].reset(), (f[m] = []);
  };
  this.resetBet = function () {
    c = a = 0;
  };
  this.setCredit = function (m) {
    e = m;
  };
  this.increaseCredit = function (m) {
    e += m;
  };
  this.betAnte = function (m) {
    a += m;
    p[0].createFichesPile(a, POS_BET[0].x, POS_BET[0].y);
  };
  this.betRaise = function () {
    c = 2 * a;
    p[1].createFichesPile(c, POS_BET[1].x, POS_BET[1].y);
  };
  this.setPrevBet = function () {
    b = a;
  };
  this.decreaseCredit = function (m) {
    e -= m;
    e = parseFloat(e.toFixed(2));
  };
  this.refreshFiches = function (m, q, t, B, l) {
    f[l].push({
      value: m,
      index: q,
    });
    p[l].refreshFiches(f[l], t, B);
  };
  this.initMovement = function (m, q, t) {
    p[m].initMovement(q, t);
  };
  this.newCardDealed = function () {
    d++;
  };
  this.rebet = function () {
    c = 0;
    a = b;
    this.decreaseCredit(b);
    p[BET_ANTE].createFichesPile(b, POS_BET[BET_ANTE].x, POS_BET[BET_ANTE].y);
    return b;
  };
  this.checkIfRebetIsPossible = function () {
    for (var m = 0, q = 0; q < p.length; q++) {
      var t = parseFloat(p[q].getPrevBet().toFixed(2));
      m += t;
    }
    return m > e ? !1 : !0;
  };
  this.updateFichesController = function () {
    for (var m = 0; m < p.length; m++) p[m].update();
  };
  this.getAttachCardOffset = function () {
    k.set(n.x + r.getX() + (CARD_WIDTH + 14) * d, n.y + r.getY());
    return k;
  };
  this.getBetAnte = function () {
    return a;
  };
  this.getBetRaise = function () {
    return c;
  };
  this.getCredit = function () {
    return e;
  };
  this.getCardOffset = function () {
    return r;
  };
  this.getPotentialWin = function (m) {
    return (void 0)[m];
  };
  this.getStartingBet = function () {
    for (var m = 0, q = 0; q < p.length; q++) m += p[q].getValue();
    return m;
  };
  this._init();
}

function CFichesController() {
  var a, c, b, d, e, f, k, n, r, p;
  this._init = function () {
    n = new createjs.Container();
    s_oStage.addChild(n);
    e = new CVector2();
    e.set(n.x, n.y);
    r = new createjs.Container();
    s_oStage.addChild(r);
    p = new createjs.Text("", "28px " + FONT_GAME_1, "#fff");
    p.textAlign = "center";
    r.addChild(p);
    b = d = c = 0;
    a = !1;
  };
  this.addEventListener = function (m, q, t) {};
  this.reset = function () {
    a = !1;
    b = 0;
    n.removeAllChildren();
    n.x = e.getX();
    n.y = e.getY();
    p.text = "";
  };
  this.setPrevValue = function (m) {
    d = m;
  };
  this.refreshFiches = function (m, q, t) {
    m = m.sortOn("value", "index");
    for (var B = q, l = t + 10, v = (b = 0), w = 0; w < m.length; w++)
      new CFiche(B, l, m[w].index, FICHES_VALUE[m[w].index], 0.85, !1, n),
        (l -= 5),
        v++,
        9 < v && ((v = 0), (B += FICHE_WIDTH), (l = t)),
        (b += m[w].value);
    playSound("chip", 1, !1);
    p.x = q;
    p.y = t + 35;
    p.text = b.toFixed(2) + TEXT_CURRENCY;
  };
  this.createFichesPile = function (m, q, t) {
    this.reset();
    var B = [];
    do {
      for (
        var l = FICHES_VALUE[FICHES_VALUE.length - 1],
          v = FICHES_VALUE.length - 1;
        l > m;

      )
        v--, (l = FICHES_VALUE[v]);
      v = Math.floor(m / l);
      for (var w = 0; w < v; w++)
        B.push({
          value: l,
          index: s_oGameSettings.getIndexForFiches(l),
        });
      l = Math.floor(m / l) === m / l ? 0 : m % l;
      m = l.toFixed(2);
    } while (0 < l);
    this.refreshFiches(B, q, t);
  };
  this.initMovement = function (m, q) {
    d = b;
    f = new CVector2(n.x, n.y);
    k = new CVector2(m, q);
    p.text = "";
    a = !0;
  };
  this.getValue = function () {
    return b;
  };
  this.getPrevBet = function () {
    return d;
  };
  this.update = function () {
    if (a)
      if (((c += s_iTimeElaps), c > TIME_FICHES_MOV)) (c = 0), (a = !1);
      else {
        var m = easeInOutCubic(c, 0, 1, TIME_FICHES_MOV),
          q = new CVector2();
        q = tweenVectors(f, k, m, q);
        n.x = q.getX();
        n.y = q.getY();
      }
  };
  this._init();
}

function CVector2(a, c) {
  var b, d;
  this._init = function (e, f) {
    b = e;
    d = f;
  };
  this.add = function (e, f) {
    b += e;
    d += f;
  };
  this.addV = function (e) {
    b += e.getX();
    d += e.getY();
  };
  this.scalarDivision = function (e) {
    b /= e;
    d /= e;
  };
  this.subV = function (e) {
    b -= e.getX();
    d -= e.getY();
  };
  this.scalarProduct = function (e) {
    b *= e;
    d *= e;
  };
  this.invert = function () {
    b *= -1;
    d *= -1;
  };
  this.dotProduct = function (e) {
    return b * e.getX() + d * e.getY();
  };
  this.set = function (e, f) {
    b = e;
    d = f;
  };
  this.setV = function (e) {
    b = e.getX();
    d = e.getY();
  };
  this.length = function () {
    return Math.sqrt(b * b + d * d);
  };
  this.length2 = function () {
    return b * b + d * d;
  };
  this.normalize = function () {
    var e = this.length();
    0 < e && ((b /= e), (d /= e));
  };
  this.getNormalize = function (e) {
    this.length();
    e.set(b, d);
    e.normalize();
  };
  this.rot90CCW = function () {
    var e = b;
    b = -d;
    d = e;
  };
  this.rot90CW = function () {
    var e = b;
    b = d;
    d = -e;
  };
  this.getRotCCW = function (e) {
    e.set(b, d);
    e.rot90CCW();
  };
  this.getRotCW = function (e) {
    e.set(b, d);
    e.rot90CW();
  };
  this.ceil = function () {
    b = Math.ceil(b);
    d = Math.ceil(d);
  };
  this.round = function () {
    b = Math.round(b);
    d = Math.round(d);
  };
  this.toString = function () {
    return "Vector2: " + b + ", " + d;
  };
  this.print = function () {
    trace("Vector2: " + b + ", " + d);
  };
  this.getX = function () {
    return b;
  };
  this.getY = function () {
    return d;
  };
  this._init(a, c);
}

function CGameSettings() {
  var a, c;
  this._init = function () {
    var b = -1;
    a = [];
    for (var d = 0; 52 > d; d++) {
      var e = (d + 1) % 13;
      1 === e ? ((e = 14), b++) : 0 === e && (e = 13);
      a.push({
        fotogram: d,
        rank: e,
        suit: b,
      });
    }
  };
  this.getIndexForFiches = function (b) {
    for (var d = 0, e = 0; e < FICHES_VALUE.length; e++)
      FICHES_VALUE[e] === b && (d = e);
    return d;
  };
  this.generateFichesPile = function (b) {
    var d = [],
      e = FICHES_VALUE.length - 1,
      f = FICHES_VALUE[e];
    do {
      var k = b % f;
      k = CMath.roundDecimal(k, 1);
      b = Math.floor(b / f);
      for (var n = 0; n < b; n++) d.push(f);
      e--;
      f = FICHES_VALUE[e];
      b = k;
    } while (0 < k && -1 < e);
    return d;
  };
  this.timeToString = function (b) {
    b = Math.round(b / 1e3);
    var d = Math.floor(b / 60);
    b -= 60 * d;
    var e = "";
    e = 10 > d ? e + ("0" + d + ":") : e + (d + ":");
    return 10 > b ? e + ("0" + b) : e + b;
  };
  this.getShuffledCardDeck = function () {
    for (var b = [], d = 0; d < a.length; d++) b[d] = a[d];
    for (c = []; 0 < b.length; )
      c.push(b.splice(Math.round(Math.random() * (b.length - 1)), 1)[0]);
    return c;
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

function ease(a, c, b, d, e, f) {
  switch (a) {
    case TYPE_LINEAR:
      var k = easeLinear(c, b, d, e, f);
      break;
    case TYPE_IN_CUBIC:
      k = easeInCubic(c, b, d, e, f);
      break;
    case TYPE_OUT_CUBIC:
      k = easeOutCubic(c, b, d, e, f);
      break;
    case TYPE_IN_BACK:
      k = easeInBack(c, b, d, e, f);
      break;
    case TYPE_OUT_BACK:
      k = easeInBack(c, b, d, e, f);
  }
  return k;
}

function easeOutBounce(a, c, b, d) {
  return (a /= d) < 1 / 2.75
    ? 7.5625 * b * a * a + c
    : a < 2 / 2.75
    ? b * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + c
    : a < 2.5 / 2.75
    ? b * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + c
    : b * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + c;
}

function easeInBounce(a, c, b, d) {
  return b - easeOutBounce(d - a, 0, b, d) + c;
}

function easeInOutBounce(a, c, b, d) {
  return a < d / 2
    ? 0.5 * easeInBounce(2 * a, 0, b, d) + c
    : 0.5 * easeOutBounce(2 * a - d, 0, b, d) + 0.5 * b + c;
}

function easeInCirc(a, c, b, d) {
  return -b * (Math.sqrt(1 - (a /= d) * a) - 1) + c;
}

function easeOutCirc(a, c, b, d) {
  return b * Math.sqrt(1 - (a = a / d - 1) * a) + c;
}

function easeInOutCirc(a, c, b, d) {
  return 1 > (a /= d / 2)
    ? (-b / 2) * (Math.sqrt(1 - a * a) - 1) + c
    : (b / 2) * (Math.sqrt(1 - (a -= 2) * a) + 1) + c;
}

function easeInCubic(a, c, b, d, e) {
  return b * (a /= d) * a * a + c;
}

function easeOutCubic(a, c, b, d, e) {
  return b * ((a = a / d - 1) * a * a + 1) + c;
}

function easeInOutCubic(a, c, b, d, e) {
  return 1 > (a /= d / 2)
    ? (b / 2) * a * a * a + c
    : (b / 2) * ((a -= 2) * a * a + 2) + c;
}

function easeInElastic(a, c, b, d, e, f, k) {
  if (0 == a) return c;
  if (1 == (a /= d)) return c + b;
  k || (k = 0.3 * d);
  !f || f < Math.abs(b)
    ? ((f = b), (e = k / 4))
    : (e = (k / (2 * Math.PI)) * Math.asin(b / f));
  return (
    -(f * Math.pow(2, 10 * --a) * Math.sin((2 * (a * d - e) * Math.PI) / k)) + c
  );
}

function easeOutElastic(a, c, b, d, e, f, k) {
  if (0 == a) return c;
  if (1 == (a /= d)) return c + b;
  k || (k = 0.3 * d);
  !f || f < Math.abs(b)
    ? ((f = b), (e = k / 4))
    : (e = (k / (2 * Math.PI)) * Math.asin(b / f));
  return (
    f * Math.pow(2, -10 * a) * Math.sin((2 * (a * d - e) * Math.PI) / k) + b + c
  );
}

function easeInOutElastic(a, c, b, d, e, f, k) {
  if (0 == a) return c;
  if (1 == (a /= d)) return c + b;
  k || (k = 0.3 * d);
  !f || f < Math.abs(b)
    ? ((f = b), (e = k / 4))
    : (e = (k / (2 * Math.PI)) * Math.asin(b / f));
  return 1 > a
    ? -0.5 *
        f *
        Math.pow(2, 10 * --a) *
        Math.sin((2 * (a * d - e) * Math.PI) / k) +
        c
    : f *
        Math.pow(2, -10 * --a) *
        Math.sin((2 * (a * d - e) * Math.PI) / k) *
        0.5 +
        b +
        c;
}

function easeInExpo(a, c, b, d) {
  return 0 == a ? c : b * Math.pow(2, 10 * (a / d - 1)) + c;
}

function easeOutExpo(a, c, b, d) {
  return a == d ? c + b : b * (-Math.pow(2, (-10 * a) / d) + 1) + c;
}

function easeInOutExpo(a, c, b, d) {
  return 0 == a
    ? c
    : a == d
    ? c + b
    : 1 > (a /= d / 2)
    ? (b / 2) * Math.pow(2, 10 * (a - 1)) + c
    : (b / 2) * (-Math.pow(2, -10 * --a) + 2) + c;
}

function easeLinear(a, c, b, d) {
  return (b * a) / d + c;
}

function easeInQuad(a, c, b, d) {
  return b * (a /= d) * a + c;
}

function easeOutQuad(a, c, b, d) {
  return -b * (a /= d) * (a - 2) + c;
}

function easeInOutQuad(a, c, b, d) {
  return 1 > (a /= d / 2)
    ? (b / 2) * a * a + c
    : (-b / 2) * (--a * (a - 2) - 1) + c;
}

function easeInQuart(a, c, b, d) {
  return b * (a /= d) * a * a * a + c;
}

function easeOutQuart(a, c, b, d) {
  return -b * ((a = a / d - 1) * a * a * a - 1) + c;
}

function easeInOutQuart(a, c, b, d) {
  return 1 > (a /= d / 2)
    ? (b / 2) * a * a * a * a + c
    : (-b / 2) * ((a -= 2) * a * a * a - 2) + c;
}

function easeInQuint(a, c, b, d) {
  return b * (a /= d) * a * a * a * a + c;
}

function easeOutQuint(a, c, b, d) {
  return b * ((a = a / d - 1) * a * a * a * a + 1) + c;
}

function easeInOutQuint(a, c, b, d) {
  return 1 > (a /= d / 2)
    ? (b / 2) * a * a * a * a * a + c
    : (b / 2) * ((a -= 2) * a * a * a * a + 2) + c;
}

function easeInSine(a, c, b, d) {
  return -b * Math.cos((a / d) * (Math.PI / 2)) + b + c;
}

function easeOutSine(a, c, b, d) {
  return b * Math.sin((a / d) * (Math.PI / 2)) + c;
}

function easeInOutSine(a, c, b, d) {
  return (-b / 2) * (Math.cos((Math.PI * a) / d) - 1) + c;
}

function easeInBack(a, c, b, d) {
  return b * (a /= d) * a * (2.70158 * a - 1.70158) + c;
}

function easeOutBack(a, c, b, d) {
  return b * ((a = a / d - 1) * a * (2.70158 * a + 1.70158) + 1) + c;
}

function CCard(a, c, b) {
  var d,
    e,
    f = -1,
    k,
    n,
    r,
    p,
    m,
    q,
    t,
    B,
    l,
    v;
  this._init = function (w, K, h) {
    v = h;
    h = {
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
    h = new createjs.SpriteSheet(h);
    l = createSprite(
      h,
      "back",
      CARD_WIDTH / 2,
      CARD_HEIGHT / 2,
      CARD_WIDTH,
      CARD_HEIGHT
    );
    l.x = w;
    l.y = K;
    l.rotation = 120;
    l.stop();
    v.addChild(l);
    t = [];
    B = [];
  };
  this.unload = function () {
    q = m = null;
    v.removeChild(l);
  };
  this.addEventListener = function (w, K, h) {
    t[w] = K;
    B[w] = h;
  };
  this.setInfo = function (w, K, h, L, J, C) {
    e = !1;
    p = 0;
    k = h;
    n = L;
    m = w;
    q = K;
    r = C;
    d = J;
    f = STATE_CARD_DEALING;
  };
  this.initRemoving = function (w) {
    m = new CVector2(l.x, l.y);
    q = w;
    p = 0;
    f = STATE_CARD_REMOVING;
  };
  this.setValue = function () {
    l.gotoAndStop(k);
    var w = this;
    createjs.Tween.get(l)
      .to(
        {
          scaleX: 1,
        },
        100
      )
      .call(function () {
        w.cardShown();
      });
  };
  this.showCard = function () {
    var w = this;
    createjs.Tween.get(l)
      .to(
        {
          scaleX: 0.1,
        },
        100
      )
      .call(function () {
        w.setValue();
      });
  };
  this.hideCard = function () {
    var w = this;
    createjs.Tween.get(l)
      .to(
        {
          scaleX: 0.1,
        },
        100
      )
      .call(function () {
        w.setBack();
      });
  };
  this.setBack = function () {
    l.gotoAndStop("back");
    var w = this;
    createjs.Tween.get(l)
      .to(
        {
          scaleX: 1,
        },
        100
      )
      .call(function () {
        w.cardHidden();
      });
  };
  this.cardShown = function () {
    t[ON_CARD_SHOWN] && t[ON_CARD_SHOWN].call(B[ON_CARD_SHOWN]);
  };
  this.cardHidden = function () {
    e = !0;
  };
  this.getValue = function () {
    return n;
  };
  this.getFotogram = function () {
    return k;
  };
  this._updateDealing = function () {
    p += s_iTimeElaps;
    if (p > TIME_CARD_DEALING)
      (f = -1),
        (p = 0),
        (l.x = q.getX()),
        (l.y = q.getY()),
        (l.rotation = 360),
        t[ON_CARD_ANIMATION_ENDING] &&
          t[ON_CARD_ANIMATION_ENDING].call(
            B[ON_CARD_ANIMATION_ENDING],
            this,
            d,
            r
          );
    else {
      this.visible = !0;
      var w = easeInOutCubic(p, 0, 1, TIME_CARD_DEALING),
        K = new CVector2();
      K = tweenVectors(m, q, w, K);
      l.x = K.getX();
      l.y = K.getY();
      l.rotation = 120 + (24e3 * w) / 100;
    }
  };
  this._updateRemoving = function () {
    p += s_iTimeElaps;
    if (p > TIME_CARD_REMOVE) (p = 0), (e = !1), (f = -1), this.unload();
    else {
      var w = easeInOutCubic(p, 0, 1, TIME_CARD_REMOVE),
        K = new CVector2();
      K = tweenVectors(m, q, w, K);
      l.x = K.getX();
      l.y = K.getY();
      l.rotation = (4500 * w) / 100;
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
  this._init(a, c, b);
}
var s_oCard;

function CGameOver() {
  var a, c, b;
  this._init = function () {
    b = new createjs.Container();
    s_oStage.addChild(b);
    b.on("click", function () {});
    var d = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
    b.addChild(d);
    new CTLText(
      b,
      CANVAS_WIDTH / 2 - 180,
      275,
      360,
      140,
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
    a = new CTextButton(
      CANVAS_WIDTH / 2 - 100,
      450,
      s_oSpriteLibrary.getSprite("but_game_bg"),
      TEXT_RECHARGE,
      FONT_GAME_1,
      "#fff",
      14,
      b
    );
    a.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
    c = new CTextButton(
      CANVAS_WIDTH / 2 + 100,
      450,
      s_oSpriteLibrary.getSprite("but_game_bg"),
      TEXT_EXIT,
      FONT_GAME_1,
      "#fff",
      14,
      b
    );
    c.addEventListener(ON_MOUSE_UP, this._onExit, this);
    this.hide();
  };
  this.unload = function () {
    a.unload();
    c.unload();
    b.off("click", function () {});
  };
  this.show = function () {
    b.visible = !0;
    $(s_oMain).trigger("end_session");
  };
  this.hide = function () {
    b.visible = !1;
  };
  this._onRecharge = function () {
    b.visible = !1;
    $(s_oMain).trigger("recharge");
  };
  this._onExit = function () {
    s_oGame.onExit();
  };
  this._init();
}

function CMsgBox() {
  var a, c, b;
  this._init = function () {
    b = new createjs.Container();
    b.alpha = 0;
    b.visible = !1;
    s_oStage.addChild(b);
    a = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
    b.addChild(a);
    c = new CTLText(
      b,
      CANVAS_WIDTH / 2 - 180,
      CANVAS_HEIGHT / 2 - 90,
      360,
      166,
      34,
      "center",
      "#fff",
      FONT_GAME_1,
      1,
      0,
      0,
      " ",
      !0,
      !0,
      !0,
      !1
    );
    c.setShadow("#000", 2, 2, 2);
  };
  this.unload = function () {
    b.off("mousedown", this._onExit);
  };
  this._initListener = function () {
    b.on("mousedown", this._onExit);
  };
  this.show = function (d) {
    c.refreshText(d);
    b.visible = !0;
    var e = this;
    createjs.Tween.get(b)
      .to(
        {
          alpha: 1,
        },
        500
      )
      .call(function () {
        e._initListener();
      });
  };
  this._onExit = function () {
    b.visible && (b.off("mousedown"), (b.visible = !1));
  };
  this._init();
  return this;
}

function CHandEvaluator() {
  var a, c, b;
  this.evaluate = function (d, e) {
    c = [];
    a = [];
    for (var f = 0; f < d.length; f++)
      (c[f] = {
        rank: d[f].rank,
        suit: d[f].suit,
      }),
        (a[f] = {
          rank: d[f].rank,
          suit: d[f].suit,
        });
    c.sort(this.compareRank);
    a.sort(this.compareRank);
    b = [0, 1, 2, 3, 4];
    return {
      ret: this.rankHand(e),
      sort_hand: a,
    };
  };
  this.rankHand = function (d) {
    return this._checkForRoyalFlush()
      ? ROYAL_FLUSH
      : this._checkForStraightFlush()
      ? STRAIGHT_FLUSH
      : this._checkForFourOfAKind()
      ? FOUR_OF_A_KIND
      : this._checkForFullHouse()
      ? FULL_HOUSE
      : this._checkForFlush()
      ? FLUSH
      : this._checkForStraight()
      ? STRAIGHT
      : this._checkForThreeOfAKind()
      ? THREE_OF_A_KIND
      : this._checkForTwoPair()
      ? TWO_PAIR
      : this._checkForOnePair()
      ? ONE_PAIR
      : this._checkHighCard(d)
      ? HIGH_CARD
      : NO_HAND;
  };
  this._checkForRoyalFlush = function () {
    return this._isRoyalStraight() && this._isFlush() ? !0 : !1;
  };
  this._checkForStraightFlush = function () {
    return this._isStraight() && this._isFlush() ? !0 : !1;
  };
  this._checkForFourOfAKind = function () {
    return c[0].rank === c[3].rank
      ? (c.splice(4, 1), b.splice(4, 1), !0)
      : c[1].rank === c[4].rank
      ? (c.splice(0, 1), b.splice(0, 1), !0)
      : !1;
  };
  this._checkForFullHouse = function () {
    return (c[0].rank === c[1].rank && c[2].rank === c[4].rank) ||
      (c[0].rank === c[2].rank && c[3].rank === c[4].rank)
      ? !0
      : !1;
  };
  this._checkForFlush = function () {
    return this._isFlush() ? !0 : !1;
  };
  this._checkForStraight = function () {
    return this._isStraight() ? !0 : !1;
  };
  this._checkForThreeOfAKind = function () {
    return c[0].rank === c[1].rank && c[0].rank === c[2].rank
      ? (c.splice(3, 1), c.splice(3, 1), b.splice(3, 1), b.splice(3, 1), !0)
      : c[1].rank === c[2].rank && c[1].rank === c[3].rank
      ? (c.splice(0, 1), c.splice(3, 1), b.splice(0, 1), b.splice(3, 1), !0)
      : c[2].rank === c[3].rank && c[2].rank === c[4].rank
      ? (c.splice(0, 1), c.splice(0, 1), b.splice(0, 1), b.splice(0, 1), !0)
      : !1;
  };
  this._checkForTwoPair = function () {
    return c[0].rank === c[1].rank && c[2].rank === c[3].rank
      ? (c.splice(4, 1), b.splice(4, 1), !0)
      : c[1].rank === c[2].rank && c[3].rank === c[4].rank
      ? (c.splice(0, 1), b.splice(0, 1), !0)
      : c[0].rank === c[1].rank && c[3].rank === c[4].rank
      ? (c.splice(2, 1), b.splice(2, 1), !0)
      : !1;
  };
  this._checkForOnePair = function () {
    for (var d = 0; 4 > d; d++)
      if (c[d].rank === c[d + 1].rank) {
        var e = c[d],
          f = c[d + 1];
        c = [];
        c.push(e);
        c.push(f);
        b = [d, d + 1];
        return !0;
      }
    return !1;
  };
  this._checkHighCard = function (d) {
    for (var e = !1, f = !1, k = 0; 5 > k; k++)
      c[k].rank === CARD_ACE && (e = !0), c[k].rank === CARD_KING && (f = !0);
    return d ? (e && f ? !0 : !1) : e || f ? !0 : !1;
  };
  this._isFlush = function () {
    return c[0].suit === c[1].suit &&
      c[0].suit === c[2].suit &&
      c[0].suit === c[3].suit &&
      c[0].suit === c[4].suit
      ? !0
      : !1;
  };
  this._isRoyalStraight = function () {
    return c[0].rank === CARD_TEN &&
      c[1].rank === CARD_JACK &&
      c[2].rank === CARD_QUEEN &&
      c[3].rank === CARD_KING &&
      c[4].rank === CARD_ACE
      ? !0
      : !1;
  };
  this._isStraight = function () {
    var d =
      c[0].rank + 1 === c[1].rank &&
      c[1].rank + 1 === c[2].rank &&
      c[2].rank + 1 === c[3].rank;
    return d && c[0].rank === CARD_TWO && c[4].rank === CARD_ACE
      ? !0
      : d && c[3].rank + 1 === c[4].rank
      ? !0
      : !1;
  };
  this.compareRank = function (d, e) {
    return d.rank < e.rank ? -1 : d.rank > e.rank ? 1 : 0;
  };
  this.getWinnerComparingHands = function (d, e, f, k) {
    if (f === k)
      switch (f) {
        case STRAIGHT_FLUSH:
          return d[0].suit > e[0].suit
            ? "dealer"
            : d[0].suit < e[0].suit
            ? "player"
            : "standoff";
        case FOUR_OF_A_KIND:
          return d[1].rank > e[1].rank
            ? "player"
            : d[1].rank < e[1].rank
            ? "dealer"
            : "standoff";
        case FULL_HOUSE:
          return d[4].rank > e[4].rank
            ? "player"
            : d[4].rank < e[4].rank
            ? "dealer"
            : "standoff";
        case FLUSH:
          return d[0].suit > e[0].suit
            ? "dealer"
            : d[0].suit < e[0].suit
            ? "player"
            : "standoff";
        case STRAIGHT:
          return d[4].rank > e[4].rank
            ? "player"
            : d[4].rank < e[4].rank
            ? "dealer"
            : "standoff";
        case THREE_OF_A_KIND:
          return d[2].rank > e[2].rank
            ? "player"
            : d[2].rank < e[2].rank
            ? "dealer"
            : "standoff";
        case TWO_PAIR:
          f = 0;
          for (k = d.length - 1; 0 < k; k--)
            if (d[k].rank === d[k - 1].rank) {
              f = d[k].rank;
              break;
            }
          d = 0;
          for (k = e.length - 1; 0 < k; k--)
            if (e[k].rank === e[k - 1].rank) {
              d = e[k].rank;
              break;
            }
          return f > d ? "player" : f < d ? "dealer" : "standoff";
        case ONE_PAIR:
          for (k = f = 0; k < d.length - 1; k++)
            if (d[k].rank === d[k + 1].rank) {
              f = d[k].rank;
              break;
            }
          for (k = d = 0; k < e.length - 1; k++)
            if (e[k].rank === e[k + 1].rank) {
              d = e[k].rank;
              break;
            }
          return f > d ? "player" : f < d ? "dealer" : "standoff";
        case NO_HAND:
          break;
        default:
          return "standoff";
      }
    else return k === NO_HAND ? "dealer_no_hand" : f > k ? "dealer" : "player";
  };
}

function CAnimText(a, c, b) {
  var d, e, f;
  this._init = function (n, r) {
    f = new createjs.Container();
    f.visible = !1;
    f.x = n;
    f.y = r;
    k.addChild(f);
    var p = s_oSpriteLibrary.getSprite("win_bg"),
      m = createBitmap(p);
    f.addChild(m);
    e = new CTLText(
      f,
      5,
      5,
      p.width - 10,
      p.height - 10,
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
      !0,
      !1
    );
  };
  this.show = function (n, r, p) {
    d = n;
    e.refreshText(p);
    f.x = n.x;
    f.y = n.y;
    f.visible = !0;
    createjs.Tween.get(f).to(
      {
        x: r.x,
        y: r.y,
      },
      1e3,
      createjs.Ease.elasticOut
    );
  };
  this.hide = function () {
    f.visible = !1;
    f.x = d.x;
    f.y = d.y;
  };
  this.isVisible = function () {
    return f.visible;
  };
  var k = b;
  this._init(a, c);
}

function CPaytablePanel(a, c, b) {
  var d, e, f;
  this._init = function (n, r) {
    d = n;
    e = r;
    f = new createjs.Container();
    f.x = d;
    f.y = e;
    k.addChild(f);
    var p = s_oSpriteLibrary.getSprite("paytable_bg"),
      m = createBitmap(p);
    f.addChild(m);
    for (var q = (m = ""), t = 0; t < PAYOUT_MULT.length; t++)
      (m += TEXT_EVALUATOR[t]),
        (q += PAYOUT_MULT[t] + ":1"),
        t < PAYOUT_MULT.length - 1 && ((m += "\n"), (q += "\n"));
    new CTLText(
      f,
      10,
      10,
      200,
      180,
      20,
      "left",
      "#ffde00",
      FONT_GAME_1,
      1,
      0,
      0,
      m,
      !0,
      !0,
      !0,
      !1
    );
    new CTLText(
      f,
      p.width - 90,
      10,
      85,
      180,
      20,
      "right",
      "#ffde00",
      FONT_GAME_1,
      1,
      0,
      0,
      q,
      !0,
      !0,
      !0,
      !1
    );
  };
  this.refreshButtonPos = function (n, r) {
    f.x = d - n;
  };
  var k = b;
  this._init(a, c);
}

function CHelpCursor(a, c, b, d) {
  var e, f;
  this._init = function (n, r, p) {
    e = n;
    f = createBitmap(p);
    f.visible = !1;
    f.x = n;
    f.y = r;
    d.addChild(f);
  };
  this.show = function (n) {
    0 > n && (f.scaleX *= -1);
    this._move(n, e + 30 * n, 600);
    f.visible = !0;
  };
  this.hide = function () {
    createjs.Tween.removeTweens(f);
    f.x = e;
    f.visible = !1;
  };
  this._move = function (n, r, p) {
    var m = 0 < n ? createjs.Ease.cubicIn : createjs.Ease.cubicOut;
    createjs.Tween.get(f)
      .to(
        {
          x: r,
        },
        p,
        m
      )
      .call(function () {
        n *= -1;
        k._move(n, r + 15 * n, 400);
      });
  };
  this.isVisible = function () {
    return f.visible;
  };
  var k = this;
  this._init(a, c, b);
}

function CCreditsPanel() {
  var a, c, b, d, e, f, k, n;
  this._init = function () {
    n = new createjs.Container();
    s_oStage.addChild(n);
    a = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
    n.addChild(a);
    e = new createjs.Shape();
    e.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    e.alpha = 0.01;
    k = e.on("click", this._onLogoButRelease);
    n.addChild(e);
    var r = s_oSpriteLibrary.getSprite("but_exit");
    b = new CGfxButton(615, 270, r, n);
    b.addEventListener(ON_MOUSE_UP, this.unload, this);
    d = new createjs.Text(
      TEXT_CREDITS_DEVELOPED,
      "40px " + FONT_GAME_1,
      "#fff"
    );
    d.textAlign = "center";
    d.textBaseline = "alphabetic";
    d.x = CANVAS_WIDTH / 2;
    d.y = CANVAS_HEIGHT / 2 - 54;
    n.addChild(d);
    r = s_oSpriteLibrary.getSprite("logo_ctl");
    c = createBitmap(r);
    c.regX = r.width / 2;
    c.regY = r.height / 2;
    c.x = CANVAS_WIDTH / 2;
    c.y = CANVAS_HEIGHT / 2;
    n.addChild(c);
    f = new createjs.Text("www.codethislab.com", "36px " + FONT_GAME_1, "#fff");
    f.textAlign = "center";
    f.textBaseline = "alphabetic";
    f.x = CANVAS_WIDTH / 2;
    f.y = CANVAS_HEIGHT / 2 + 70;
    n.addChild(f);
  };
  this.unload = function () {
    e.off("click", k);
    b.unload();
    b = null;
    s_oStage.removeChild(n);
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
  setShadow: function (a, c, b, d) {
    null !== this._oText &&
      (this._oText.shadow = new createjs.Shadow(a, c, b, d));
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

function CTLText(a, c, b, d, e, f, k, n, r, p, m, q, t, B, l, v, w) {
  this._oContainer = a;
  this._x = c;
  this._y = b;
  this._iWidth = d;
  this._iHeight = e;
  this._bMultiline = v;
  this._iFontSize = this._iStartingFontSize = f;
  this._szAlign = k;
  this._szColor = n;
  this._szFont = r;
  this._iPaddingH = m;
  this._iPaddingV = q;
  this._bVerticalAlign = l;
  this._bFitText = B;
  this._bDebug = w;
  this._oDebugShape = null;
  this._fLineHeightFactor = p;
  this._oText = null;
  t && this.__createText(t);
}

function CFiche(a, c, b, d, e, f, k) {
  var n, r, p, m, q, t, B;
  this._init = function (l, v, w, K, h) {
    B = new createjs.Container();
    B.x = l;
    B.y = v;
    B.scaleX = B.scaleY = e;
    k.addChild(B);
    l = s_oSpriteLibrary.getSprite("fiche_highlight");
    q = createBitmap(l);
    q.x = -9;
    q.y = -9;
    q.visible = !1;
    B.addChild(q);
    l = s_oSpriteLibrary.getSprite("fiche_" + w);
    t = createBitmap(l);
    B.addChild(t);
    new CTLText(
      B,
      8,
      8,
      l.width - 21,
      20,
      20,
      "center",
      COLOR_FICHE_PER_VALUE[w],
      FONT_GAME_1,
      1,
      0,
      0,
      K,
      !0,
      !0,
      !1,
      !1
    );
    h &&
      ((n = !1),
      (r = []),
      (p = []),
      B.on("mousedown", this.buttonDown),
      B.on("pressup", this.buttonRelease));
    B.regX = l.width / 2;
    B.regY = l.height / 2;
  };
  this.addEventListener = function (l, v, w) {
    r[l] = v;
    p[l] = w;
  };
  this.addEventListenerWithParams = function (l, v, w, K) {
    r[l] = v;
    p[l] = w;
    m = K;
  };
  this.select = function (l) {
    q.visible = l;
  };
  this.enable = function () {
    n = !1;
  };
  this.disable = function () {
    n = !0;
  };
  this.buttonRelease = function () {
    n ||
      ((B.scaleX = e),
      (B.scaleY = e),
      r[ON_MOUSE_UP] && r[ON_MOUSE_UP].call(p[ON_MOUSE_UP], m));
  };
  this.buttonDown = function () {
    n ||
      ((B.scaleX = 0.9 * e),
      (B.scaleY = 0.9 * e),
      r[ON_MOUSE_DOWN] && r[ON_MOUSE_DOWN].call(p[ON_MOUSE_DOWN], m));
  };
  this.getX = function () {
    return B.x;
  };
  this.getY = function () {
    return B.x;
  };
  this._init(a, c, b, d, f);
}

function extractHostname(a) {
  a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
  a = a.split(":")[0];
  return (a = a.split("?")[0]);
}

function extractRootDomain(a) {
  a = extractHostname(a);
  var c = a.split("."),
    b = c.length;
  2 < b && (a = c[b - 2] + "." + c[b - 1]);
  return a;
}
var getClosestTop = function () {
    var a = window,
      c = !1;
    try {
      for (; a.parent.document !== a.document; )
        if (a.parent.document) a = a.parent;
        else {
          c = !0;
          break;
        }
    } catch (b) {
      c = !0;
    }
    return {
      topFrame: a,
      err: c,
    };
  },
  getBestPageUrl = function (a) {
    var c = a.topFrame,
      b = "";
    if (a.err)
      try {
        try {
          b = window.top.location.href;
        } catch (e) {
          var d = window.location.ancestorOrigins;
          b = d[d.length - 1];
        }
      } catch (e) {
        b = c.document.referrer;
      }
    else b = c.location.href;
    return b;
  },
  TOPFRAMEOBJ = getClosestTop(),
  PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);

function seekAndDestroy() {
  for (
    var a = extractRootDomain(PAGE_URL),
      c = [
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
    b < c.length;
    b++
  )
    if (c[b] === a) return !0;
  return !1;
}
