
(function () {
  function a(l) {
    l = String(l);
    return l.charAt(0).toUpperCase() + l.slice(1);
  }

  function e(l, H) {
    var F = -1,
      y = l ? l.length : 0;
    if ("number" == typeof y && -1 < y && y <= x)
      for (; ++F < y; ) H(l[F], F, l);
    else c(l, H);
  }

  function b(l) {
    l = String(l).replace(/^ +| +$/g, "");
    return /^(?:webOS|i(?:OS|P))/.test(l) ? l : a(l);
  }

  function c(l, H) {
    for (var F in l) K.call(l, F) && H(l[F], F, l);
  }

  function g(l) {
    return null == l ? a(l) : A.call(l).slice(8, -1);
  }

  function f(l, H) {
    var F = null != l ? typeof l[H] : "number";
    return (
      !/^(?:boolean|number|string|undefined)$/.test(F) &&
      ("object" == F ? !!l[H] : !0)
    );
  }

  function h(l) {
    return String(l).replace(/([ -])(?!$)/g, "$1?");
  }

  function r(l, H) {
    var F = null;
    e(l, function (y, B) {
      F = H(F, y, B, l);
    });
    return F;
  }

  function m(l) {
    function H(M) {
      return r(M, function (P, N) {
        var T = N.pattern || h(N);
        !P &&
          (P =
            RegExp("\\b" + T + " *\\d+[.\\w_]*", "i").exec(l) ||
            RegExp("\\b" + T + " *\\w+-[\\w]*", "i").exec(l) ||
            RegExp(
              "\\b" + T + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)",
              "i"
            ).exec(l)) &&
          ((P = String(
            N.label && !RegExp(T, "i").test(N.label) ? N.label : P
          ).split("/"))[1] &&
            !/[\d.]+/.test(P[0]) &&
            (P[0] += " " + P[1]),
          (N = N.label || N),
          (P = b(
            P[0]
              .replace(RegExp(T, "i"), N)
              .replace(RegExp("; *(?:" + N + "[_-])?", "i"), " ")
              .replace(RegExp("(" + N + ")[-_.]?(\\w)", "i"), "$1 $2")
          )));
        return P;
      });
    }

    function F(M) {
      return r(M, function (P, N) {
        return (
          P ||
          (RegExp(
            N + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)",
            "i"
          ).exec(l) || 0)[1] ||
          null
        );
      });
    }
    var y = C,
      B = l && "object" == typeof l && "String" != g(l);
    B && ((y = l), (l = null));
    var G = y.navigator || {},
      D = G.userAgent || "";
    l || (l = D);
    var n = B
        ? !!G.likeChrome
        : /\bChrome\b/.test(l) && !/internal|\n/i.test(A.toString()),
      v = B ? "Object" : "ScriptBridgingProxyObject",
      I = B ? "Object" : "Environment",
      Q = B && y.java ? "JavaPackage" : g(y.java),
      S = B ? "Object" : "RuntimeObject";
    I = (Q = /\bJava/.test(Q) && y.java) && g(y.environment) == I;
    var V = Q ? "a" : "\u03b1",
      ba = Q ? "b" : "\u03b2",
      Z = y.document || {},
      W = y.operamini || y.opera,
      L = t.test((L = B && W ? W["[[Class]]"] : g(W))) ? L : (W = null),
      d,
      aa = l;
    B = [];
    var X = null,
      R = l == D;
    D = R && W && "function" == typeof W.version && W.version();
    var k = (function (M) {
        return r(M, function (P, N) {
          return (
            P ||
            (RegExp("\\b" + (N.pattern || h(N)) + "\\b", "i").exec(l) &&
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
      q = (function (M) {
        return r(M, function (P, N) {
          return (
            P ||
            (RegExp("\\b" + (N.pattern || h(N)) + "\\b", "i").exec(l) &&
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
      J = H([
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
      O = (function (M) {
        return r(M, function (P, N, T) {
          return (
            P ||
            ((N[J] ||
              N[/^[a-z]+(?: +[a-z]+\b)*/i.exec(J)] ||
              RegExp("\\b" + h(T) + "(?:\\b|\\w*\\d)", "i").exec(l)) &&
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
      E = (function (M) {
        return r(M, function (P, N) {
          var T = N.pattern || h(N);
          if (
            !P &&
            (P = RegExp("\\b" + T + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(l))
          ) {
            var Y = P,
              ca = N.label || N,
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
            T &&
              ca &&
              /^Win/i.test(Y) &&
              !/^Windows Phone /i.test(Y) &&
              (da = da[/[\d.]+$/.exec(Y)]) &&
              (Y = "Windows " + da);
            Y = String(Y);
            T && ca && (Y = Y.replace(RegExp(T, "i"), ca));
            P = Y = b(
              Y.replace(/ ce$/i, " CE")
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
          return P;
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
    k && (k = [k]);
    O && !J && (J = H([O]));
    if ((d = /\bGoogle TV\b/.exec(J))) J = d[0];
    /\bSimulator\b/i.test(l) && (J = (J ? J + " " : "") + "Simulator");
    "Opera Mini" == q &&
      /\bOPiOS\b/.test(l) &&
      B.push("running in Turbo/Uncompressed mode");
    "IE" == q && /\blike iPhone OS\b/.test(l)
      ? ((d = m(l.replace(/like iPhone OS/, ""))),
        (O = d.manufacturer),
        (J = d.product))
      : /^iP/.test(J)
      ? (q || (q = "Safari"),
        (E =
          "iOS" +
          ((d = / OS ([\d_]+)/i.exec(l)) ? " " + d[1].replace(/_/g, ".") : "")))
      : "Konqueror" != q || /buntu/i.test(E)
      ? (O &&
          "Google" != O &&
          ((/Chrome/.test(q) && !/\bMobile Safari\b/i.test(l)) ||
            /\bVita\b/.test(J))) ||
        (/\bAndroid\b/.test(E) && /^Chrome/.test(q) && /\bVersion\//i.test(l))
        ? ((q = "Android Browser"), (E = /\bAndroid\b/.test(E) ? E : "Android"))
        : "Silk" == q
        ? (/\bMobi/i.test(l) || ((E = "Android"), B.unshift("desktop mode")),
          /Accelerated *= *true/i.test(l) && B.unshift("accelerated"))
        : "PaleMoon" == q && (d = /\bFirefox\/([\d.]+)\b/.exec(l))
        ? B.push("identifying as Firefox " + d[1])
        : "Firefox" == q && (d = /\b(Mobile|Tablet|TV)\b/i.exec(l))
        ? (E || (E = "Firefox OS"), J || (J = d[1]))
        : !q ||
          (d = !/\bMinefield\b/i.test(l) && /\b(?:Firefox|Safari)\b/.exec(q))
        ? (q &&
            !J &&
            /[\/,]|^[^(]+?\)/.test(l.slice(l.indexOf(d + "/") + 8)) &&
            (q = null),
          (d = J || O || E) &&
            (J || O || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(E)) &&
            (q =
              /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(E) ? E : d) +
              " Browser"))
        : "Electron" == q &&
          (d = (/\bChrome\/([\d.]+)\b/.exec(l) || 0)[1]) &&
          B.push("Chromium " + d)
      : (E = "Kubuntu");
    D ||
      (D = F([
        "(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))",
        "Version",
        h(q),
        "(?:Firefox|Minefield|NetFront)",
      ]));
    if (
      (d =
        ("iCab" == k && 3 < parseFloat(D) && "WebKit") ||
        (/\bOpera\b/.test(q) && (/\bOPR\b/.test(l) ? "Blink" : "Presto")) ||
        (/\b(?:Midori|Nook|Safari)\b/i.test(l) &&
          !/^(?:Trident|EdgeHTML)$/.test(k) &&
          "WebKit") ||
        (!k && /\bMSIE\b/i.test(l) && ("Mac OS" == E ? "Tasman" : "Trident")) ||
        ("WebKit" == k && /\bPlayStation\b(?! Vita\b)/i.test(q) && "NetFront"))
    )
      k = [d];
    "IE" == q && (d = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(l) || 0)[1])
      ? ((q += " Mobile"),
        (E = "Windows Phone " + (/\+$/.test(d) ? d : d + ".x")),
        B.unshift("desktop mode"))
      : /\bWPDesktop\b/i.test(l)
      ? ((q = "IE Mobile"),
        (E = "Windows Phone 8.x"),
        B.unshift("desktop mode"),
        D || (D = (/\brv:([\d.]+)/.exec(l) || 0)[1]))
      : "IE" != q &&
        "Trident" == k &&
        (d = /\brv:([\d.]+)/.exec(l)) &&
        (q && B.push("identifying as " + q + (D ? " " + D : "")),
        (q = "IE"),
        (D = d[1]));
    if (R) {
      if (f(y, "global"))
        if (
          (Q &&
            ((d = Q.lang.System),
            (aa = d.getProperty("os.arch")),
            (E =
              E ||
              d.getProperty("os.name") + " " + d.getProperty("os.version"))),
          I)
        ) {
          try {
            (D = y.require("ringo/engine").version.join(".")), (q = "RingoJS");
          } catch (M) {
            (d = y.system) &&
              d.global.system == y.system &&
              ((q = "Narwhal"), E || (E = d[0].os || null));
          }
          q || (q = "Rhino");
        } else
          "object" == typeof y.process &&
            !y.process.browser &&
            (d = y.process) &&
            ("object" == typeof d.versions &&
              ("string" == typeof d.versions.electron
                ? (B.push("Node " + d.versions.node),
                  (q = "Electron"),
                  (D = d.versions.electron))
                : "string" == typeof d.versions.nw &&
                  (B.push("Chromium " + D, "Node " + d.versions.node),
                  (q = "NW.js"),
                  (D = d.versions.nw))),
            q ||
              ((q = "Node.js"),
              (aa = d.arch),
              (E = d.platform),
              (D = (D = /[\d.]+/.exec(d.version)) ? D[0] : null)));
      else
        g((d = y.runtime)) == v
          ? ((q = "Adobe AIR"), (E = d.flash.system.Capabilities.os))
          : g((d = y.phantom)) == S
          ? ((q = "PhantomJS"),
            (D =
              (d = d.version || null) &&
              d.major + "." + d.minor + "." + d.patch))
          : "number" == typeof Z.documentMode &&
            (d = /\bTrident\/(\d+)/i.exec(l))
          ? ((D = [D, Z.documentMode]),
            (d = +d[1] + 4) != D[1] &&
              (B.push("IE " + D[1] + " mode"), k && (k[1] = ""), (D[1] = d)),
            (D = "IE" == q ? String(D[1].toFixed(1)) : D[0]))
          : "number" == typeof Z.documentMode &&
            /^(?:Chrome|Firefox)\b/.test(q) &&
            (B.push("masking as " + q + " " + D),
            (q = "IE"),
            (D = "11.0"),
            (k = ["Trident"]),
            (E = "Windows"));
      E = E && b(E);
    }
    D &&
      (d =
        /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(D) ||
        /(?:alpha|beta)(?: ?\d)?/i.exec(l + ";" + (R && G.appMinorVersion)) ||
        (/\bMinefield\b/i.test(l) && "a")) &&
      ((X = /b/i.test(d) ? "beta" : "alpha"),
      (D =
        D.replace(RegExp(d + "\\+?$"), "") +
        ("beta" == X ? ba : V) +
        (/\d+\+?/.exec(d) || "")));
    if (
      "Fennec" == q ||
      ("Firefox" == q && /\b(?:Android|Firefox OS)\b/.test(E))
    )
      q = "Firefox Mobile";
    else if ("Maxthon" == q && D) D = D.replace(/\.[\d.]+/, ".x");
    else if (/\bXbox\b/i.test(J))
      "Xbox 360" == J && (E = null),
        "Xbox 360" == J && /\bIEMobile\b/.test(l) && B.unshift("mobile mode");
    else if (
      (!/^(?:Chrome|IE|Opera)$/.test(q) &&
        (!q || J || /Browser|Mobi/.test(q))) ||
      ("Windows CE" != E && !/Mobi/i.test(l))
    )
      if ("IE" == q && R)
        try {
          null === y.external && B.unshift("platform preview");
        } catch (M) {
          B.unshift("embedded");
        }
      else
        (/\bBlackBerry\b/.test(J) || /\bBB10\b/.test(l)) &&
        (d =
          (RegExp(J.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(l) ||
            0)[1] || D)
          ? ((d = [d, /BB10/.test(l)]),
            (E =
              (d[1] ? ((J = null), (O = "BlackBerry")) : "Device Software") +
              " " +
              d[0]),
            (D = null))
          : this != c &&
            "Wii" != J &&
            ((R && W) ||
              (/Opera/.test(q) && /\b(?:MSIE|Firefox)\b/i.test(l)) ||
              ("Firefox" == q && /\bOS X (?:\d+\.){2,}/.test(E)) ||
              ("IE" == q &&
                ((E && !/^Win/.test(E) && 5.5 < D) ||
                  (/\bWindows XP\b/.test(E) && 8 < D) ||
                  (8 == D && !/\bTrident\b/.test(l))))) &&
            !t.test((d = m.call(c, l.replace(t, "") + ";"))) &&
            d.name &&
            ((d = "ing as " + d.name + ((d = d.version) ? " " + d : "")),
            t.test(q)
              ? (/\bIE\b/.test(d) && "Mac OS" == E && (E = null),
                (d = "identify" + d))
              : ((d = "mask" + d),
                (q = L ? b(L.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera"),
                /\bIE\b/.test(d) && (E = null),
                R || (D = null)),
            (k = ["Presto"]),
            B.push(d));
    else q += " Mobile";
    if ((d = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(l) || 0)[1])) {
      d = [parseFloat(d.replace(/\.(\d)$/, ".0$1")), d];
      if ("Safari" == q && "+" == d[1].slice(-1))
        (q = "WebKit Nightly"), (X = "alpha"), (D = d[1].slice(0, -1));
      else if (
        D == d[1] ||
        D == (d[2] = (/\bSafari\/([\d.]+\+?)/i.exec(l) || 0)[1])
      )
        D = null;
      d[1] = (/\bChrome\/([\d.]+)/i.exec(l) || 0)[1];
      537.36 == d[0] &&
        537.36 == d[2] &&
        28 <= parseFloat(d[1]) &&
        "WebKit" == k &&
        (k = ["Blink"]);
      R && (n || d[1])
        ? (k && (k[1] = "like Chrome"),
          (d =
            d[1] ||
            ((d = d[0]),
            530 > d
              ? 1
              : 532 > d
              ? 2
              : 532.05 > d
              ? 3
              : 533 > d
              ? 4
              : 534.03 > d
              ? 5
              : 534.07 > d
              ? 6
              : 534.1 > d
              ? 7
              : 534.13 > d
              ? 8
              : 534.16 > d
              ? 9
              : 534.24 > d
              ? 10
              : 534.3 > d
              ? 11
              : 535.01 > d
              ? 12
              : 535.02 > d
              ? "13+"
              : 535.07 > d
              ? 15
              : 535.11 > d
              ? 16
              : 535.19 > d
              ? 17
              : 536.05 > d
              ? 18
              : 536.1 > d
              ? 19
              : 537.01 > d
              ? 20
              : 537.11 > d
              ? "21+"
              : 537.13 > d
              ? 23
              : 537.18 > d
              ? 24
              : 537.24 > d
              ? 25
              : 537.36 > d
              ? 26
              : "Blink" != k
              ? "27"
              : "28")))
        : (k && (k[1] = "like Safari"),
          (d =
            ((d = d[0]),
            400 > d
              ? 1
              : 500 > d
              ? 2
              : 526 > d
              ? 3
              : 533 > d
              ? 4
              : 534 > d
              ? "4+"
              : 535 > d
              ? 5
              : 537 > d
              ? 6
              : 538 > d
              ? 7
              : 601 > d
              ? 8
              : "8")));
      k &&
        (k[1] +=
          " " + (d += "number" == typeof d ? ".x" : /[.+]/.test(d) ? "" : "+"));
      "Safari" == q && (!D || 45 < parseInt(D)) && (D = d);
    }
    "Opera" == q && (d = /\bzbov|zvav$/.exec(E))
      ? ((q += " "),
        B.unshift("desktop mode"),
        "zvav" == d ? ((q += "Mini"), (D = null)) : (q += "Mobile"),
        (E = E.replace(RegExp(" *" + d + "$"), "")))
      : "Safari" == q &&
        /\bChrome\b/.exec(k && k[1]) &&
        (B.unshift("desktop mode"),
        (q = "Chrome Mobile"),
        (D = null),
        /\bOS X\b/.test(E) ? ((O = "Apple"), (E = "iOS 4.3+")) : (E = null));
    D &&
      0 == D.indexOf((d = /[\d.]+$/.exec(E))) &&
      -1 < l.indexOf("/" + d + "-") &&
      (E = String(E.replace(d, "")).replace(/^ +| +$/g, ""));
    k &&
      !/\b(?:Avant|Nook)\b/.test(q) &&
      (/Browser|Lunascape|Maxthon/.test(q) ||
        ("Safari" != q && /^iOS/.test(E) && /\bSafari\b/.test(k[1])) ||
        (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
          q
        ) &&
          k[1])) &&
      (d = k[k.length - 1]) &&
      B.push(d);
    B.length && (B = ["(" + B.join("; ") + ")"]);
    O && J && 0 > J.indexOf(O) && B.push("on " + O);
    J && B.push((/^on /.test(B[B.length - 1]) ? "" : "on ") + J);
    if (E) {
      var U =
        (d = / ([\d.+]+)$/.exec(E)) &&
        "/" == E.charAt(E.length - d[0].length - 1);
      E = {
        architecture: 32,
        family: d && !U ? E.replace(d[0], "") : E,
        version: d ? d[1] : null,
        toString: function () {
          var M = this.version;
          return (
            this.family +
            (M && !U ? " " + M : "") +
            (64 == this.architecture ? " 64-bit" : "")
          );
        },
      };
    }
    (d = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(aa)) && !/\bi686\b/i.test(aa)
      ? (E &&
          ((E.architecture = 64),
          (E.family = E.family.replace(RegExp(" *" + d), ""))),
        q &&
          (/\bWOW64\b/i.test(l) ||
            (R &&
              /\w(?:86|32)$/.test(G.cpuClass || G.platform) &&
              !/\bWin64; x64\b/i.test(l))) &&
          B.unshift("32-bit"))
      : E &&
        /^OS X/.test(E.family) &&
        "Chrome" == q &&
        39 <= parseFloat(D) &&
        (E.architecture = 64);
    l || (l = null);
    y = {};
    y.description = l;
    y.layout = k && k[0];
    y.manufacturer = O;
    y.name = q;
    y.prerelease = X;
    y.product = J;
    y.ua = l;
    y.version = q && D;
    y.os = E || {
      architecture: null,
      family: null,
      version: null,
      toString: function () {
        return "null";
      },
    };
    y.parse = m;
    y.toString = function () {
      return this.description || "";
    };
    y.version && B.unshift(D);
    y.name && B.unshift(q);
    E &&
      q &&
      (E != String(E).split(" ")[0] || (E != q.split(" ")[0] && !J)) &&
      B.push(J ? "(" + E + ")" : "on " + E);
    B.length && (y.description = B.join(" "));
    return y;
  }
  var p = {
      function: !0,
      object: !0,
    },
    C = (p[typeof window] && window) || this,
    z = p[typeof exports] && exports;
  p = p[typeof module] && module && !module.nodeType && module;
  var w = z && p && "object" == typeof global && global;
  !w || (w.global !== w && w.window !== w && w.self !== w) || (C = w);
  var x = Math.pow(2, 53) - 1,
    t = /\bOpera/;
  w = Object.prototype;
  var K = w.hasOwnProperty,
    A = w.toString,
    u = m();
  "function" == typeof define && "object" == typeof define.amd && define.amd
    ? ((C.platform = u),
      define(function () {
        return u;
      }))
    : z && p
    ? c(u, function (l, H) {
        z[H] = l;
      })
    : (C.platform = u);
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
      e = 0;
    e < a.length;
    e++
  ) {
    var b = document.createElement("meta");
    b.name = a[e].name;
    b.content = a[e].content;
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

function isIOSLessThen13() {
  var a = platform.os,
    e = a.family.toLowerCase();
  a = parseFloat(a.version);
  return "ios" === e && 13 > a ? !0 : !1;
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
(function () {
  var a =
      "undefined" !== typeof window && "undefined" !== typeof window.document
        ? window.document
        : {},
    e = "undefined" !== typeof module && module.exports,
    b = (function () {
      for (
        var f,
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
          r = 0,
          m = h.length,
          p = {};
        r < m;
        r++
      )
        if ((f = h[r]) && f[1] in a) {
          for (r = 0; r < f.length; r++) p[h[0][r]] = f[r];
          return p;
        }
      return !1;
    })(),
    c = {
      change: b.fullscreenchange,
      error: b.fullscreenerror,
    },
    g = {
      request: function (f) {
        return new Promise(
          function (h, r) {
            var m = function () {
              this.off("change", m);
              h();
            }.bind(this);
            this.on("change", m);
            f = f || a.documentElement;
            Promise.resolve(f[b.requestFullscreen]())["catch"](r);
          }.bind(this)
        );
      },
      exit: function () {
        return new Promise(
          function (f, h) {
            if (this.isFullscreen) {
              var r = function () {
                this.off("change", r);
                f();
              }.bind(this);
              this.on("change", r);
              Promise.resolve(a[b.exitFullscreen]())["catch"](h);
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
      on: function (f, h) {
        var r = c[f];
        r && a.addEventListener(r, h, !1);
      },
      off: function (f, h) {
        var r = c[f];
        r && a.removeEventListener(r, h, !1);
      },
      raw: b,
    };
  b
    ? (Object.defineProperties(g, {
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
      e ? (module.exports = g) : (window.screenfull = g))
    : e
    ? (module.exports = {
        isEnabled: !1,
      })
    : (window.screenfull = {
        isEnabled: !1,
      });
})();
var s_iScaleFactor = 1,
  s_iOffsetX,
  s_iOffsetY,
  s_bIsRetina,
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
  var e = a.toLowerCase(),
    b = window.document,
    c = b.documentElement;
  if (void 0 === window["inner" + a]) a = c["client" + a];
  else if (window["inner" + a] != c["client" + a]) {
    var g = b.createElement("body");
    g.id = "vpw-test-b";
    g.style.cssText = "overflow:scroll";
    var f = b.createElement("div");
    f.id = "vpw-test-d";
    f.style.cssText = "position:absolute;top:-1000px";
    f.innerHTML =
      "<style>@media(" +
      e +
      ":" +
      c["client" + a] +
      "px){body#vpw-test-b div#vpw-test-d{" +
      e +
      ":7px!important}}</style>";
    g.appendChild(f);
    c.insertBefore(g, b.head);
    a = 7 == f["offset" + a] ? c["client" + a] : window["inner" + a];
    c.removeChild(g);
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
  isRetina();
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

function isRetina() {
  s_bIsRetina = matchMedia(
    "(-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2), (min-resolution: 192dpi)"
  ).matches
    ? !0
    : !1;
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
    var e = getSize("Width");
    s_bFocus && _checkOrientation(e, a);
    var b = Math.min(a / CANVAS_HEIGHT, e / CANVAS_WIDTH),
      c = Math.round(CANVAS_WIDTH * b);
    b = Math.round(CANVAS_HEIGHT * b);
    if (b < a) {
      var g = a - b;
      b += g;
      c += (CANVAS_WIDTH / CANVAS_HEIGHT) * g;
    } else
      c < e &&
        ((g = e - c), (c += g), (b += (CANVAS_HEIGHT / CANVAS_WIDTH) * g));
    g = a / 2 - b / 2;
    var f = e / 2 - c / 2,
      h = CANVAS_WIDTH / c;
    if (f * h < -EDGEBOARD_X || g * h < -EDGEBOARD_Y)
      (b = Math.min(
        a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y),
        e / (CANVAS_WIDTH - 2 * EDGEBOARD_X)
      )),
        (c = CANVAS_WIDTH * b),
        (b *= CANVAS_HEIGHT),
        (g = (a - b) / 2),
        (f = (e - c) / 2),
        (h = CANVAS_WIDTH / c);
    s_iOffsetX = -1 * f * h;
    s_iOffsetY = -1 * g * h;
    0 <= g && (s_iOffsetY = 0);
    0 <= f && (s_iOffsetX = 0);
    null !== s_oInterface &&
      s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    s_bIsRetina && s_oStage
      ? ((canvas = document.getElementById("canvas")),
        (s_oStage.canvas.width = 2 * c),
        (s_oStage.canvas.height = 2 * b),
        (canvas.style.width = c + "px"),
        (canvas.style.height = b + "px"),
        (e = Math.min(c / CANVAS_WIDTH, b / CANVAS_HEIGHT)),
        (s_iScaleFactor = 2 * e),
        (s_oStage.scaleX = s_oStage.scaleY = 2 * e))
      : s_bMobile
      ? ($("#canvas").css("width", c + "px"),
        $("#canvas").css("height", b + "px"))
      : s_oStage &&
        ((s_oStage.canvas.width = c),
        (s_oStage.canvas.height = b),
        (s_iScaleFactor = Math.min(c / CANVAS_WIDTH, b / CANVAS_HEIGHT)),
        (s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor));
    0 > g || (g = (a - b) / 2);
    $("#canvas").css("top", g + "px");
    $("#canvas").css("left", f + "px");
    fullscreenHandler();
  }
}

function _checkOrientation(a, e) {
  s_bMobile &&
    ENABLE_CHECK_ORIENTATION &&
    (a > e
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
      : ((document.body.className = this[e] ? "hidden" : "visible"),
        "hidden" === document.body.className
          ? (s_oMain.stopUpdate(), (s_bFocus = !1))
          : (s_oMain.startUpdate(), (s_bFocus = !0)));
  }
  var e = "hidden";
  e in document
    ? document.addEventListener("visibilitychange", a)
    : (e = "mozHidden") in document
    ? document.addEventListener("mozvisibilitychange", a)
    : (e = "webkitHidden") in document
    ? document.addEventListener("webkitvisibilitychange", a)
    : (e = "msHidden") in document
    ? document.addEventListener("msvisibilitychange", a)
    : "onfocusin" in document
    ? (document.onfocusin = document.onfocusout = a)
    : (window.onpageshow =
        window.onpagehide =
        window.onfocus =
        window.onblur =
          a);
})();

function createBitmap(a, e, b) {
  var c = new createjs.Bitmap(a),
    g = new createjs.Shape();
  e && b
    ? g.graphics.beginFill("#fff").drawRect(0, 0, e, b)
    : g.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
  c.hitArea = g;
  return c;
}

function createSprite(a, e, b, c, g, f) {
  a = null !== e ? new createjs.Sprite(a, e) : new createjs.Sprite(a);
  e = new createjs.Shape();
  e.graphics.beginFill("#000000").drawRect(-b, -c, g, f);
  a.hitArea = e;
  return a;
}

function randomFloatBetween(a, e, b) {
  "undefined" === typeof b && (b = 2);
  return parseFloat(Math.min(a + Math.random() * (e - a), e).toFixed(b));
}

function shuffle(a) {
  for (var e = a.length, b, c; 0 !== e; )
    (c = Math.floor(Math.random() * e)),
      --e,
      (b = a[e]),
      (a[e] = a[c]),
      (a[c] = b);
  return a;
}

function formatTime(a) {
  a /= 1e3;
  var e = Math.floor(a / 60);
  a = parseFloat(a - 60 * e).toFixed(1);
  var b = "";
  b = 10 > e ? b + ("0" + e + ":") : b + (e + ":");
  return 10 > a ? b + ("0" + a) : b + a;
}
Array.prototype.sortOn = function () {
  var a = this.slice();
  if (!arguments.length) return a.sort();
  var e = Array.prototype.slice.call(arguments);
  return a.sort(function (b, c) {
    for (var g = e.slice(), f = g.shift(); b[f] == c[f] && g.length; )
      f = g.shift();
    return b[f] == c[f] ? 0 : b[f] > c[f] ? 1 : -1;
  });
};

function roundDecimal(a, e) {
  var b = Math.pow(10, e);
  return Math.round(b * a) / b;
}

function tweenVectors(a, e, b, c) {
  c.set(
    a.getX() + b * (e.getX() - a.getX()),
    a.getY() + b * (e.getY() - a.getY())
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
      var e = document.createEvent("MouseEvents");
      e.initEvent("click", !0, !0);
      a.dispatchEvent(e);
    }
  },
};

function playSound(a, e, b) {
  return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
    ? (s_aSounds[a].play(),
      s_aSounds[a].volume(e),
      s_aSounds[a].loop(b),
      s_aSounds[a])
    : null;
}

function stopSound(a) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].stop();
}

function setVolume(a, e) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].volume(e);
}

function setMute(a, e) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].mute(e);
}

function ctlArcadeResume() {
  null !== s_oMain && s_oMain.startUpdate();
}

function ctlArcadePause() {
  null !== s_oMain && s_oMain.stopUpdate();
}

function getParamValue(a) {
  for (
    var e = window.location.search.substring(1).split("&"), b = 0;
    b < e.length;
    b++
  ) {
    var c = e[b].split("=");
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
    e,
    b,
    c,
    g,
    f,
    h;
  this.init = function (r, m, p) {
    e = {};
    c = b = 0;
    g = r;
    f = m;
    h = p;
  };
  this.addSprite = function (r, m) {
    if (!a.hasOwnProperty(r)) {
      var p = new Image();
      a[r] = e[r] = {
        szPath: m,
        oSprite: p,
        bLoaded: !1,
      };
      b++;
    }
  };
  this.getSprite = function (r) {
    return a.hasOwnProperty(r) ? a[r].oSprite : null;
  };
  this._onSpritesLoaded = function () {
    b = 0;
    f.call(h);
  };
  this._onSpriteLoaded = function () {
    g.call(h);
    ++c === b && this._onSpritesLoaded();
  };
  this.loadSprites = function () {
    for (var r in e)
      (e[r].oSprite.oSpriteLibrary = this),
        (e[r].oSprite.szKey = r),
        (e[r].oSprite.onload = function () {
          this.oSpriteLibrary.setLoaded(this.szKey);
          this.oSpriteLibrary._onSpriteLoaded(this.szKey);
        }),
        (e[r].oSprite.onerror = function (m) {
          var p = m.currentTarget;
          setTimeout(function () {
            e[p.szKey].oSprite.src = e[p.szKey].szPath;
          }, 500);
        }),
        (e[r].oSprite.src = e[r].szPath);
  };
  this.setLoaded = function (r) {
    a[r].bLoaded = !0;
  };
  this.isLoaded = function (r) {
    return a[r].bLoaded;
  };
  this.getNumSprites = function () {
    return b;
  };
}
var CANVAS_WIDTH = 1700,
  CANVAS_HEIGHT = 768,
  EDGEBOARD_X = 338,
  EDGEBOARD_Y = 0,
  FPS_TIME = 1e3 / 24,
  DISABLE_SOUND_MOBILE = !1,
  FONT_GAME_1 = "ArialBold",
  FONT_GAME_2 = "Digital-7",
  STATE_LOADING = 0,
  STATE_MENU = 1,
  STATE_HELP = 1,
  STATE_GAME = 3,
  STATE_GAME_WAITING_FOR_BET = 0,
  STATE_GAME_DEALING = 1,
  STATE_GAME_HITTING = 2,
  STATE_GAME_SPLIT = 3,
  STATE_GAME_FINALIZE = 4,
  STATE_GAME_SHOW_WINNER = 5,
  STATE_CARD_DEALING = 0,
  STATE_CARD_SPLIT = 1,
  STATE_CARD_REMOVING = 2,
  ON_MOUSE_DOWN = 0,
  ON_MOUSE_UP = 1,
  ON_MOUSE_OVER = 2,
  ON_MOUSE_OUT = 3,
  ON_DRAG_START = 4,
  ON_DRAG_END = 5,
  SIT_DOWN = "SIT_DOWN",
  PASS_TURN = "PASS_TURN",
  PLAYER_LOSE = "PLAYER_LOSE",
  ASSIGN_FICHES = "ASSIGN_FICHES",
  FICHES_END_MOV = "FICHES_END_MOV",
  RESTORE_ACTION = "RESTORE_ACTION",
  END_HAND = "END_HAND",
  ON_CARD_SHOWN = "ON_CARD_SHOWN",
  ON_CARD_ANIMATION_ENDING = "ON_CARD_ANIMATION_ENDING",
  SPLIT_CARD_END_ANIM = "SPLIT_CARD_END_ANIM",
  ON_CARD_TO_REMOVE = "ON_CARD_TO_REMOVE",
  NUM_FICHES = 6,
  CARD_WIDTH = 44,
  CARD_HEIGHT = 63,
  MIN_BET,
  MAX_BET,
  TOTAL_MONEY,
  FICHE_WIDTH = 45,
  WIN_OCCURRENCE,
  TIME_FICHES_MOV = 600,
  TIME_CARD_DEALING = 250,
  TIME_CARD_REMOVE = 1e3,
  TIME_SHOW_FINAL_CARDS = 4e3,
  TIME_END_HAND = 1500,
  BET_TIME = 1e4,
  COLOR_FICHE_PER_VALUE = "#000 #000 #000 #fff #000 #fff".split(" "),
  SIZE_FONT_FICHE = [12, 18, 18, 18, 18, 20],
  AD_SHOW_COUNTER,
  ENABLE_FULLSCREEN,
  ENABLE_CHECK_ORIENTATION,
  SHOW_CREDITS;

function CPreloader() {
  var a, e, b, c, g, f, h, r, m;
  this._init = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
    s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
    s_oSpriteLibrary.loadSprites();
    m = new createjs.Container();
    s_oStage.addChild(m);
  };
  this.unload = function () {
    m.removeAllChildren();
  };
  this._onImagesLoaded = function () {};
  this._onAllImagesLoaded = function () {
    this.attachSprites();
    s_oMain.preloaderReady();
  };
  this.attachSprites = function () {
    var p = new createjs.Shape();
    p.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    m.addChild(p);
    p = s_oSpriteLibrary.getSprite("200x200");
    h = createBitmap(p);
    h.regX = 0.5 * p.width;
    h.regY = 0.5 * p.height;
    h.x = CANVAS_WIDTH / 2;
    h.y = CANVAS_HEIGHT / 2 - 180;
    m.addChild(h);
    r = new createjs.Shape();
    r.graphics
      .beginFill("rgba(0,0,0,0.01)")
      .drawRoundRect(h.x - 100, h.y - 100, 200, 200, 10);
    m.addChild(r);
    h.mask = r;
    p = s_oSpriteLibrary.getSprite("progress_bar");
    c = createBitmap(p);
    c.x = CANVAS_WIDTH / 2 - p.width / 2;
    c.y = CANVAS_HEIGHT / 2 + 50;
    m.addChild(c);
    a = p.width;
    e = p.height;
    g = new createjs.Shape();
    g.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(c.x, c.y, 1, e);
    m.addChild(g);
    c.mask = g;
    b = new createjs.Text("", "30px " + FONT_GAME_1, "#fff");
    b.x = CANVAS_WIDTH / 2;
    b.y = CANVAS_HEIGHT / 2 + 100;
    b.textBaseline = "alphabetic";
    b.textAlign = "center";
    m.addChild(b);
    f = new createjs.Shape();
    f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    m.addChild(f);
    createjs.Tween.get(f)
      .to(
        {
          alpha: 0,
        },
        500
      )
      .call(function () {
        createjs.Tween.removeTweens(f);
        m.removeChild(f);
      });
  };
  this.refreshLoader = function (p) {
    b.text = p + "%";
    100 === p &&
      (s_oMain._onRemovePreloader(), (b.visible = !1), (c.visible = !1));
    g.graphics.clear();
    p = Math.floor((p * a) / 100);
    g.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(c.x, c.y, p, e);
  };
  this._init();
}

function CMain(a) {
  var e,
    b = 0,
    c = 0,
    g = STATE_LOADING,
    f,
    h;
  this.initContainer = function () {
    var m = document.getElementById("canvas");
    s_oStage = new createjs.Stage(m);
    createjs.Touch.enable(s_oStage, !0);
    s_bMobile = jQuery.browser.mobile;
    !1 === s_bMobile && s_oStage.enableMouseOver(20);
    s_iPrevTime = new Date().getTime();
    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener("tick", this._update);
    navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
    s_oSpriteLibrary = new CSpriteLibrary();

    f = new CPreloader();
    s_oGameSettings = new CGameSettings();
    e = !0;
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
    var m = [];
    m.push({
      path: "./sounds/",
      filename: "card",
      loop: !1,
      volume: 1,
      ingamename: "card",
    });
    m.push({
      path: "./sounds/",
      filename: "chip",
      loop: !1,
      volume: 1,
      ingamename: "chip",
    });
    m.push({
      path: "./sounds/",
      filename: "fiche_collect",
      loop: !1,
      volume: 1,
      ingamename: "fiche_collect",
    });
    m.push({
      path: "./sounds/",
      filename: "press_but",
      loop: !1,
      volume: 1,
      ingamename: "press_but",
    });
    m.push({
      path: "./sounds/",
      filename: "win",
      loop: !1,
      volume: 1,
      ingamename: "win",
    });
    m.push({
      path: "./sounds/",
      filename: "lose",
      loop: !1,
      volume: 1,
      ingamename: "lose",
    });
    c += m.length;
    s_aSounds = [];
    for (var p = 0; p < m.length; p++)
      s_aSounds[m[p].ingamename] = new Howl({
        src: [m[p].path + m[p].filename + ".mp3"],
        autoplay: !1,
        preload: !0,
        loop: m[p].loop,
        volume: m[p].volume,
        onload: s_oMain.soundLoaded,
      });
  };
  this._loadImages = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite("but_menu_bg", "./sprites/but_menu_bg.png");
    s_oSpriteLibrary.addSprite("but_game_bg", "./sprites/but_game_bg.png");
    s_oSpriteLibrary.addSprite(
      "but_game_small_bg",
      "./sprites/but_game_small_bg.png"
    );
    s_oSpriteLibrary.addSprite(
      "but_game_very_small_bg",
      "./sprites/but_game_very_small_bg.png"
    );
    s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
    s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
    s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
    s_oSpriteLibrary.addSprite("bg_game_1", "./sprites/bg_game_1.jpg");
    s_oSpriteLibrary.addSprite("bg_game_2", "./sprites/bg_game_2.jpg");
    s_oSpriteLibrary.addSprite("bg_game_3", "./sprites/bg_game_3.jpg");
    s_oSpriteLibrary.addSprite("bg_game_4", "./sprites/bg_game_4.jpg");
    s_oSpriteLibrary.addSprite("seat", "./sprites/seat.png");
    s_oSpriteLibrary.addSprite(
      "card_spritesheet",
      "./sprites/card_spritesheet.png"
    );
    s_oSpriteLibrary.addSprite("arrow_hand", "./sprites/arrow_hand.png");
    s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
    s_oSpriteLibrary.addSprite("display_bg", "./sprites/display_bg.png");
    s_oSpriteLibrary.addSprite("bet_bg", "./sprites/bet_bg.png");
    s_oSpriteLibrary.addSprite("money_bg", "./sprites/money_bg.png");
    s_oSpriteLibrary.addSprite(
      "but_fullscreen",
      "./sprites/but_fullscreen.png"
    );
    s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
    s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
    for (var m = 0; m < NUM_FICHES; m++)
      s_oSpriteLibrary.addSprite("fiche_" + m, "./sprites/fiche_" + m + ".png");
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
    g = STATE_MENU;
  };
  this.gotoGame = function () {
    h = new CGame(r);
    g = STATE_GAME;
  };
  this.gotoHelp = function () {
    new CHelp();
    g = STATE_HELP;
  };
  this.stopUpdate = function () {
    e = !1;
    createjs.Ticker.paused = !0;
    $("#block_game").css("display", "block");
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || Howler.mute(!0);
  };
  this.startUpdate = function () {
    s_iPrevTime = new Date().getTime();
    e = !0;
    createjs.Ticker.paused = !1;
    $("#block_game").css("display", "none");
    (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) &&
      s_bAudioActive &&
      Howler.mute(!1);
  };
  this._update = function (m) {
    if (e) {
      var p = new Date().getTime();
      s_iTimeElaps = p - s_iPrevTime;
      s_iCntTime += s_iTimeElaps;
      s_iCntFps++;
      s_iPrevTime = p;
      1e3 <= s_iCntTime &&
        ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0));
      g === STATE_GAME && h.update();
      s_oStage.update(m);
    }
  };
  s_oMain = this;
  var r = a;
  ENABLE_CHECK_ORIENTATION = a.check_orientation;
  ENABLE_FULLSCREEN = a.fullscreen;
  SHOW_CREDITS = a.show_credits;
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
  s_bFullscreen = !1,
  s_aSounds;

function CTextButton(a, e, b, c, g, f, h, r) {
  var m, p, C, z, w, x, t, K, A, u, l, H;
  this._init = function (F, y, B, G, D, n, v) {
    m = !1;
    p = 1;
    w = [];
    x = [];
    H = createBitmap(B);
    C = B.width;
    z = B.height;
    u = new createjs.Container();
    u.x = F;
    u.y = y;
    u.regX = B.width / 2;
    u.regY = B.height / 2;
    s_bMobile || (u.cursor = "pointer");
    u.addChild(H, l);
    r.addChild(u);
    l = new CTLText(
      u,
      10,
      6,
      B.width - 20,
      B.height - 10,
      v,
      "center",
      n,
      D,
      1,
      0,
      0,
      G,
      !0,
      !0,
      !1,
      !1
    );
    this._initListener();
  };
  this.unload = function () {
    u.off("mousedown", t);
    u.off("pressup", K);
    r.removeChild(u);
  };
  this.setVisible = function (F) {
    u.visible = F;
  };
  this.setAlign = function (F) {
    l.textAlign = F;
  };
  this.setTextX = function (F) {
    l.x = F;
  };
  this.setScale = function (F) {
    p = u.scaleX = u.scaleY = F;
  };
  this.enable = function () {
    m = !1;
    u.filters = [];
    u.cache(0, 0, C, z);
  };
  this.disable = function () {
    m = !0;
    var F = new createjs.ColorMatrix().adjustSaturation(-100);
    u.filters = [new createjs.ColorMatrixFilter(F)];
    u.cache(0, 0, C, z);
  };
  this._initListener = function () {
    t = u.on("mousedown", this.buttonDown);
    K = u.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (F, y, B) {
    w[F] = y;
    x[F] = B;
  };
  this.addEventListenerWithParams = function (F, y, B, G) {
    w[F] = y;
    x[F] = B;
    A = G;
  };
  this.buttonRelease = function () {
    m ||
      (playSound("press_but", 1, !1),
      (u.scaleX = p),
      (u.scaleY = p),
      w[ON_MOUSE_UP] && w[ON_MOUSE_UP].call(x[ON_MOUSE_UP], A));
  };
  this.buttonDown = function () {
    m ||
      ((u.scaleX = 0.9 * p),
      (u.scaleY = 0.9 * p),
      w[ON_MOUSE_DOWN] && w[ON_MOUSE_DOWN].call(x[ON_MOUSE_DOWN]));
  };
  this.setPosition = function (F, y) {
    u.x = F;
    u.y = y;
  };
  this.tweenPosition = function (F, y, B, G, D, n, v) {
    createjs.Tween.get(u)
      .wait(G)
      .to(
        {
          x: F,
          y: y,
        },
        B,
        D
      )
      .call(function () {
        void 0 !== n && n.call(v);
      });
  };
  this.changeText = function (F) {
    l.refreshText(F);
  };
  this.setX = function (F) {
    u.x = F;
  };
  this.setY = function (F) {
    u.y = F;
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
  this.getSprite = function () {
    return u;
  };
  this.getScale = function () {
    return u.scaleX;
  };
  this._init(a, e, b, c, g, f, h);
}

function CGfxButton(a, e, b) {
  var c,
    g,
    f,
    h,
    r,
    m = [],
    p,
    C,
    z;
  this._init = function (w, x, t) {
    c = !1;
    h = [];
    r = [];
    g = t.width;
    f = t.height;
    z = createBitmap(t);
    z.x = w;
    z.y = x;
    z.regX = t.width / 2;
    z.regY = t.height / 2;
    z.cursor = "pointer";
    s_oStage.addChild(z);
    this._initListener();
  };
  this.unload = function () {
    z.off("mousedown", p);
    z.off("pressup", C);
    s_oStage.removeChild(z);
  };
  this.setVisible = function (w) {
    z.visible = w;
  };
  this._initListener = function () {
    p = z.on("mousedown", this.buttonDown);
    C = z.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (w, x, t) {
    h[w] = x;
    r[w] = t;
  };
  this.addEventListenerWithParams = function (w, x, t, K) {
    h[w] = x;
    r[w] = t;
    m = K;
  };
  this.buttonRelease = function () {
    c ||
      (playSound("press_but", 1, !1),
      (z.scaleX = 1),
      (z.scaleY = 1),
      h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(r[ON_MOUSE_UP], m));
  };
  this.buttonDown = function () {
    c ||
      ((z.scaleX = 0.9),
      (z.scaleY = 0.9),
      h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(r[ON_MOUSE_DOWN], m));
  };
  this.setPosition = function (w, x) {
    z.x = w;
    z.y = x;
  };
  this.setX = function (w) {
    z.x = w;
  };
  this.setY = function (w) {
    z.y = w;
  };
  this.enable = function () {
    c = !1;
    z.filters = [];
    z.cache(0, 0, g, f);
  };
  this.disable = function () {
    c = !0;
    var w = new createjs.ColorMatrix()
      .adjustSaturation(-100)
      .adjustBrightness(40);
    z.filters = [new createjs.ColorMatrixFilter(w)];
    z.cache(0, 0, g, f);
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
  this._init(a, e, b);
  return this;
}

function CToggle(a, e, b, c, g) {
  var f, h, r, m;
  this._init = function (C, z, w, x) {
    h = [];
    r = [];
    var t = new createjs.SpriteSheet({
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
    f = x;
    m = createSprite(
      t,
      "state_" + f,
      w.width / 2 / 2,
      w.height / 2,
      w.width / 2,
      w.height
    );
    m.x = C;
    m.y = z;
    m.stop();
    p.addChild(m);
    this._initListener();
  };
  this.unload = function () {
    m.off("mousedown", this.buttonDown);
    m.off("pressup", this.buttonRelease);
    s_bMobile || m.off("mouseover", this.buttonOver);
    p.removeChild(m);
  };
  this._initListener = function () {
    m.on("mousedown", this.buttonDown);
    m.on("pressup", this.buttonRelease);
    if (!s_bMobile) m.on("mouseover", this.buttonOver);
  };
  this.addEventListener = function (C, z, w) {
    h[C] = z;
    r[C] = w;
  };
  this.setActive = function (C) {
    f = C;
    m.gotoAndStop("state_" + f);
  };
  this.buttonRelease = function () {
    m.scaleX = 1;
    m.scaleY = 1;
    playSound("press_but", 1, 0);
    f = !f;
    m.gotoAndStop("state_" + f);
    h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(r[ON_MOUSE_UP], f);
  };
  this.buttonDown = function () {
    m.scaleX = 0.9;
    m.scaleY = 0.9;
    h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(r[ON_MOUSE_DOWN]);
  };
  this.buttonOver = function (C) {
    s_bMobile || (C.target.cursor = "pointer");
  };
  this.setPosition = function (C, z) {
    m.x = C;
    m.y = z;
  };
  var p = g;
  this._init(a, e, b, c);
}

function CMenu() {
  var a,
    e,
    b,
    c,
    g,
    f,
    h,
    r,
    m,
    p,
    C,
    z,
    w = null,
    x = null;
  this._init = function () {
    h = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
    s_oStage.addChild(h);
    var t = s_oSpriteLibrary.getSprite("but_menu_bg");
    r = new CTextButton(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT - 164,
      t,
      TEXT_PLAY,
      FONT_GAME_1,
      "#ffffff",
      40,
      s_oStage
    );
    r.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
      (t = s_oSpriteLibrary.getSprite("audio_icon")),
        (g = CANVAS_WIDTH - t.width / 4 - 10),
        (f = t.height / 2 + 10),
        (m = new CToggle(g, f, t, s_bAudioActive, s_oStage)),
        m.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
    var K = s_oSpriteLibrary.getSprite("but_credits");
    t = window.document;
    var A = t.documentElement;
    w =
      A.requestFullscreen ||
      A.mozRequestFullScreen ||
      A.webkitRequestFullScreen ||
      A.msRequestFullscreen;
    x =
      t.exitFullscreen ||
      t.mozCancelFullScreen ||
      t.webkitExitFullscreen ||
      t.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (w = !1);
    w && screenfull.isEnabled
      ? ((t = s_oSpriteLibrary.getSprite("but_fullscreen")),
        (b = t.width / 4 + 10),
        (c = t.height / 2 + 10),
        (C = new CToggle(b, c, t, s_bFullscreen, s_oStage)),
        C.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this),
        (a = b + 10 + t.width / 2),
        (e = t.height / 2 + 10))
      : ((a = 10 + K.width / 2), (e = K.height / 2 + 10));
    SHOW_CREDITS &&
      ((z = new CGfxButton(a, e, K)),
      z.addEventListener(ON_MOUSE_UP, this._onCredits, this));
    p = new createjs.Shape();
    p.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    s_oStage.addChild(p);
    createjs.Tween.get(p)
      .to(
        {
          alpha: 0,
        },
        400
      )
      .call(function () {
        p.visible = !1;
      });
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };
  this.refreshButtonPos = function (t, K) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      m.setPosition(g - t, K + f);
    w && screenfull.isEnabled && C.setPosition(b + t, c + K);
    SHOW_CREDITS && z.setPosition(a + t, e + K);
  };
  this.unload = function () {
    r.unload();
    r = null;
    SHOW_CREDITS && z.unload();
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) m.unload(), (m = null);
    w && screenfull.isEnabled && C.unload();
    s_oStage.removeAllChildren();
    s_oMenu = null;
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
  this.resetFullscreenBut = function () {
    w && screenfull.isEnabled && C.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? x.call(window.document)
      : w.call(window.document.documentElement);
    sizeHandler();
  };
  this._onCredits = function () {
    new CCreditsPanel();
  };
  s_oMenu = this;
  this._init();
}
var s_oMenu = null;

function CGame(a) {
  var e = !1,
    b,
    c,
    g,
    f = !1,
    h,
    r,
    m,
    p,
    C,
    z,
    w,
    x,
    t,
    K,
    A,
    u,
    l,
    H,
    F,
    y,
    B,
    G,
    D,
    n,
    v,
    I,
    Q,
    S,
    V,
    ba,
    Z,
    W,
    L,
    d,
    aa,
    X;
  this._init = function () {
    p = MAX_BET;
    C = MIN_BET;
    z = -1;
    l = m = 0;
    s_oTweenController = new CTweenController();
    W = createBitmap(
      s_oSpriteLibrary.getSprite(
        "bg_game_" + (Math.floor(4 * Math.random()) + 1)
      )
    );
    s_oStage.addChild(W);
    d = new CSeat();
    d.setCredit(TOTAL_MONEY);
    d.addEventListener(SIT_DOWN, this._onSitDown, this);
    d.addEventListener(RESTORE_ACTION, this._onSetPlayerActions);
    d.addEventListener(PASS_TURN, this._passTurnToDealer);
    d.addEventListener(END_HAND, this._onEndHand);
    d.addEventListener(PLAYER_LOSE, this._playerLose);
    Z = new createjs.Container();
    s_oStage.addChild(Z);
    L = new CInterface(TOTAL_MONEY);
    L.displayMsg(TEXT_DISPLAY_MSG_SIT_DOWN);
    this.reset(!0);
    I = new CVector2();
    I.set(1214, 228);
    Q = new CVector2();
    Q.set(788, 180);
    S = new CVector2();
    S.set(418, 820);
    V = new CVector2();
    V.set(CANVAS_WIDTH / 2, -100);
    ba = new CVector2(408, 208);
    D = [d.getCardOffset(), Q];
    L.disableBetFiches();
    aa = new CGameOver();
    X = new CMsgBox();
    d.getCredit() < C ? (this._gameOver(), this.changeState(-1)) : (e = !0);
  };
  this.unload = function () {
    e = !1;
    for (var k = 0; k < H.length; k++) H[k].unload();
    k = d.getPlayerCards();
    for (var q = 0; q < k.length; q++) k[q].unload();
    L.unload();
    aa.unload();
    X.unload();
    s_oStage.removeAllChildren();
  };
  this.reset = function (k) {
    b = !0;
    h = g = c = !1;
    K = t = x = w = m = r = 0;
    d.reset();
    H = [];
    H.splice(0);
    y = [];
    y.splice(0);
    L.reset();
    L.enableBetFiches();
    k
      ? this.shuffleCard()
      : (A > G.length / 2 || u > F.length / 2) && this.shuffleCard();
  };
  this.setMoney = function (k) {
    d.setVisibleSitDownButton(!1);
    d.setCredit(k);
    L.refreshCredit(k);
    s_oInterface.enableBetFiches();
    s_oInterface.enable(!0, !1, !1, !1, !1);
    e = !0;
  };
  this.shuffleCard = function () {
    B = [];
    B = s_oGameSettings.getShuffledCardDeck();
    G = [];
    F = [];
    for (var k = 0; k < B.length; k++)
      0 === k % 2 ? G.push(B[k]) : F.push(B[k]);
    u = A = 0;
    n = [];
    for (k = 0; k < B.length; k++) n[k] = 0;
  };
  this.changeState = function (k) {
    z = k;
    switch (z) {
      case STATE_GAME_DEALING:
        if (
          (R < 2 * d.getCurBet() ? WIN_OCCURRENCE : 100 * Math.random()) <
          WIN_OCCURRENCE
        ) {
          f = !0;
          do k = s_oGameSettings.getRandDealerPattern();
          while (!1 === this._checkIfDealerPatternCanBeUsed(k));
          v = [];
          for (var q = 0; q < k.length; q++) v[q] = k[q];
        } else f = !1;
        L.disableButtons();
        L.displayMsg(TEXT_DISPLAY_MSG_DEALING);
        this._dealing();
    }
  };
  this._checkIfDealerPatternCanBeUsed = function (k) {
    for (var q = 0; q < k.length; q++) if (1 < n[k[q]]) return !1;
    return !0;
  };
  this.attachCardToDeal = function (k, q, J, O) {
    var E = new CCard(I.getX(), I.getY(), Z);
    if (J)
      if (f) {
        var U = v.shift();
        u++;
      } else {
        do {
          U = F[u];
          u++;
          u > F.length / 2 && (this.shuffleCard(), (u = 0));
          var M = s_oGameSettings.getCardValue(U);
          11 === M && 21 < x + M && (M = 1);
        } while (
          21 < x + M ||
          (16 < x + M && x + M < d.getHandValue(0) && 21 > d.getHandValue(0))
        );
      }
    else if (f) {
      do
        (U = G[A]),
          A++,
          A > G.length / 2 && (this.shuffleCard(), (A = 0)),
          (M = s_oGameSettings.getCardValue(U)),
          11 === M && 21 < d.getHandValue(0) + M && (M = 1);
      while (21 < d.getHandValue(0) + M);
    } else {
      do
        (U = G[A]),
          A++,
          A > G.length / 2 && (this.shuffleCard(), (A = 0)),
          (M = s_oGameSettings.getCardValue(U)),
          11 === M && 21 < d.getHandValue(0) + M && (M = 1);
      while (16 < d.getHandValue(0) + M && 22 > d.getHandValue(0) + M);
    }
    E.setInfo(k, q, U, s_oGameSettings.getCardValue(U), J, O);
    n[U] += 1;
    E.addEventListener(ON_CARD_ANIMATION_ENDING, this.cardFromDealerArrived);
    H.push(E);
    playSound("card", 1, !1);
  };
  this.cardFromDealerArrived = function (k, q, J) {
    for (var O = 0; O < H.length; O++)
      if (H[O] === k) {
        H.splice(O, 1);
        break;
      }
    !1 === q
      ? (d.addCardToHand(k),
        d.increaseHandValue(k.getValue()),
        2 < J && d.refreshCardValue())
      : ((x += k.getValue()),
        2 < t && L.refreshDealerCardValue(x),
        11 === k.getValue() && K++,
        y.push(k));
    3 > J
      ? s_oGame._dealing()
      : (s_oGame._checkHand(),
        !1 === q && g && ((g = !1), s_oGame._onStandPlayer()));
  };
  this._onStandPlayer = function () {
    d.stand();
  };
  this._checkHand = function () {
    var k;
    if (b) d.checkHand();
    else if ((L.refreshDealerCardValue(x), h))
      21 === x ? this.playerStandOff(0) : this._playerWin(0);
    else if (21 === x && 2 === y.length)
      for (
        0 < r &&
          2 === y.length &&
          (d.increaseCredit(2 * r + r),
          (R -= 2 * r),
          L.refreshCredit(d.getCredit())),
          k = 0;
        k < d.getNumHands();
        k++
      )
        this._playerLose(k);
    else
      21 < x
        ? 0 < K
          ? (K--,
            (x -= 10),
            L.refreshDealerCardValue(x),
            17 > x ? this.hitDealer() : this._checkWinner())
          : this._checkWinner()
        : 17 > x
        ? this.hitDealer()
        : this._checkWinner();
  };
  this._playerWin = function (k) {
    var q = 1;
    21 === d.getHandValue(k) &&
      2 === d.getNumCardsForHand(k) &&
      (q = BLACKJACK_PAYOUT);
    q = d.getBetForHand(k) + parseFloat((d.getBetForHand(k) * q).toFixed(2));
    d.increaseCredit(q);
    R -= q;
    d.showWinner(k, TEXT_SHOW_WIN_PLAYER, q);
    L.displayMsg(TEXT_DISPLAY_MSG_PLAYER_WIN);
    d.initMovement(k, S.getX(), S.getY());
    21 === x
      ? d.initInsuranceMov(S.getX(), S.getY())
      : d.initInsuranceMov(V.getX(), V.getY());
  };
  this._playerLose = function (k) {
    d.showWinner(k, TEXT_SHOW_LOSE_PLAYER, 0);
    L.displayMsg(TEXT_DISPLAY_MSG_PLAYER_LOSE);
    d.initMovement(k, V.getX(), V.getY());
    21 === x
      ? d.initInsuranceMov(S.getX(), S.getY())
      : d.initInsuranceMov(V.getX(), V.getY());
  };
  this.playerStandOff = function (k) {
    d.increaseCredit(d.getBetForHand(k));
    R -= d.getBetForHand(k);
    d.showWinner(k, TEXT_SHOW_STANDOFF, 0);
    L.displayMsg(TEXT_DISPLAY_MSG_PLAYER_STANDOFF);
    d.initMovement(k, S.getX(), S.getY());
    21 === x
      ? d.initInsuranceMov(S.getX(), S.getY())
      : d.initInsuranceMov(V.getX(), V.getY());
  };
  this._dealing = function () {
    if (w < 2 * D.length) {
      var k = new CCard(I.getX(), I.getY(), Z),
        q = new CVector2(I.getX(), I.getY());
      if (1 === w % D.length) {
        t++;
        var J = new CVector2(
          Q.getX() + (CARD_WIDTH + 2) * (1 < w ? 1 : 0),
          Q.getY()
        );
        var O = f ? v.shift() : F[u];
        k.setInfo(q, J, O, s_oGameSettings.getCardValue(O), !0, t);
        n[O] += 1;
        u++;
        2 === t && k.addEventListener(ON_CARD_SHOWN, this._onCardShown);
      } else {
        if (
          !f &&
          1 === A &&
          18 <
            s_oGameSettings.getCardValue(G[A]) +
              s_oGameSettings.getCardValue(G[A - 1])
        ) {
          J = s_oGameSettings.getCardValue(G[A - 1]);
          do G.shift();
          while (21 === J + s_oGameSettings.getCardValue(G[A]));
        }
        k.setInfo(
          q,
          d.getAttachCardOffset(),
          G[A],
          s_oGameSettings.getCardValue(G[A]),
          !1,
          d.newCardDealed()
        );
        n[G[A]] += 1;
        A++;
      }
      H.push(k);
      w++;
      k.addEventListener(ON_CARD_ANIMATION_ENDING, this.cardFromDealerArrived);
      k.addEventListener(ON_CARD_TO_REMOVE, this._onRemoveCard);
      playSound("card", 1, !1);
    } else this._checkAvailableActionForPlayer();
  };
  this.hitDealer = function () {
    var k = new CVector2(I.getX(), I.getY()),
      q = new CVector2(Q.getX() + (CARD_WIDTH + 3) * t, Q.getY());
    t++;
    this.attachCardToDeal(k, q, !0, t);
    this.changeState(STATE_GAME_HITTING);
    playSound("card", 1, !1);
  };
  this._checkWinner = function () {
    for (var k = 0; k < d.getNumHands(); k++)
      21 < d.getHandValue(k)
        ? this._playerLose(k)
        : 21 < x
        ? this._playerWin(k)
        : 22 > d.getHandValue(k) && d.getHandValue(k) > x
        ? this._playerWin(k)
        : d.getHandValue(k) === x
        ? this.playerStandOff(k)
        : this._playerLose(k);
  };
  this._onEndHand = function () {
    for (var k = new CVector2(ba.getX(), ba.getY()), q = 0; q < y.length; q++)
      y[q].initRemoving(k), y[q].hideCard();
    q = d.getPlayerCards();
    for (var J = 0; J < q.length; J++) q[J].initRemoving(k), q[J].hideCard();
    d.clearText();
    L.clearDealerText();
    m = 0;
    s_oGame.changeState(STATE_GAME_SHOW_WINNER);
    playSound("fiche_collect", 1, !1);
    l++;
    l === AD_SHOW_COUNTER &&
      ((l = 0), $(s_oMain).trigger("show_interlevel_ad"));
  };
  this.ficheSelected = function (k, q) {
    var J = d.getCurBet();
    k > d.getCredit()
      ? X.show(TEXT_NO_MONEY)
      : J + k > p
      ? X.show(TEXT_ERROR_MAX_BET)
      : ((J = Number((J + k).toFixed(1))),
        d.decreaseCredit(k),
        (R += k),
        d.changeBet(J),
        d.refreshFiches(k, q, 0, 0),
        d.bet(J, !1),
        L.enable(!0, !1, !1, !1, !1),
        L.refreshCredit(d.getCredit()));
  };
  this._checkAvailableActionForPlayer = function () {
    this.changeState(-1);
    var k = d.getHandValue(0);
    if (21 === k)
      (h = !0),
        d.refreshCardValue(),
        11 === y[0].getValue() && d.getCredit() >= d.getCurBet() / 2
          ? ((r = d.getCurBet() / 2), L.showInsurancePanel())
          : this._passTurnToDealer();
    else {
      21 < k && d.removeAce();
      d.refreshCardValue();
      k = !1;
      d.isSplitAvailable() && d.getCredit() >= 1.5 * d.getCurBet() && (k = !0);
      L.displayMsg(TEXT_DISPLAY_MSG_YOUR_ACTION);
      var q = !1;
      2 === d.getNumCardsForHand(0) &&
        8 < d.getHandValue(0) &&
        16 > d.getHandValue(0) &&
        d.getCredit() >= d.getCurBet() &&
        !c &&
        (q = !0);
      L.enable(!1, !0, !0, q, k);
      11 === y[0].getValue() &&
        d.getCredit() >= d.getCurBet() / 2 &&
        L.showInsurancePanel();
    }
  };
  this._passTurnToDealer = function () {
    b &&
      ((b = !1),
      L.disableButtons(),
      y[1].showCard(),
      playSound("card", 1, !1),
      L.displayMsg(TEXT_DISPLAY_MSG_DEALER_TURN));
  };
  this._gameOver = function () {
    this.clearBets();
    aa.show();
  };
  this.onFicheSelected = function (k, q) {
    this.ficheSelected(q, k);
  };
  this._onSetPlayerActions = function (k, q, J, O, E) {
    L.enable(k, q, J, O, E);
    d.refreshCardValue();
  };
  this._onSitDown = function () {
    this.changeState(STATE_GAME_WAITING_FOR_BET);
    L.enableBetFiches();
  };
  this.onDeal = function () {
    d.getCredit() + d.getCurBet() < C
      ? this._gameOver()
      : C > d.getCurBet()
      ? (X.show(TEXT_ERROR_MIN_BET),
        s_oInterface.enableBetFiches(),
        s_oInterface.enable(!0, !1, !1, !1, !1))
      : (this.changeState(STATE_GAME_DEALING),
        $(s_oMain).trigger("bet_placed", d.getCurBet()));
  };
  this.onHit = function () {
    var k = new CVector2(I.getX(), I.getY()),
      q = new CVector2(
        d.getAttachCardOffset().getX(),
        d.getAttachCardOffset().getY()
      );
    this.attachCardToDeal(k, q, !1, d.newCardDealed());
    this.changeState(STATE_GAME_HITTING);
  };
  this.onStand = function () {
    d.stand();
  };
  this.onDouble = function () {
    var k = d.getCurBet();
    var q = k + k;
    d.doubleAction(q);
    d.changeBet(q);
    d.decreaseCredit(k);
    R += k;
    R < 2 * q && (f = !1);
    d.bet(q);
    L.refreshCredit(d.getCredit());
    this.onHit();
    g = !0;
    $(s_oMain).trigger("bet_placed", k);
  };
  this.onSplit = function () {
    R < 4 * d.getCurBet() && (f = !1);
    d.split();
    this.changeState(STATE_GAME_SPLIT);
  };
  this._onSplitCardEndAnim = function () {
    var k = d.getCurBet(),
      q = k;
    k += q;
    d.bet(k, !0);
    c = !0;
    L.enable(!1, !0, !0, !1, !1);
    d.setSplitHand();
    d.refreshCardValue();
    d.changeBet(k - q);
    d.decreaseCredit(q);
    R += q;
    L.refreshCredit(d.getCredit());
    $(s_oMain).trigger("bet_placed", q);
  };
  this.clearBets = function () {
    var k = d.getStartingBet();
    0 < k &&
      (d.clearBet(),
      d.increaseCredit(k),
      (R -= k),
      L.refreshCredit(d.getCredit()));
  };
  this.rebet = function () {
    this.clearBets();
    var k = d.rebet();
    0 < k
      ? (L.enable(!0, !1, !1, !1, !1),
        (R += k),
        L.refreshCredit(d.getCredit()),
        (m = BET_TIME))
      : L.disableRebet();
  };
  this.onBuyInsurance = function () {
    r = d.getCurBet() / 2;
    var k = d.getCurBet();
    k += r;
    d.insurance(k, -r, r);
    L.refreshCredit(d.getCredit());
    h && this._passTurnToDealer();
  };
  this.onNotBuyInsurance = function () {
    h && this._passTurnToDealer();
  };
  this._onCardShown = function () {
    s_oGame._checkHand();
  };
  this._onRemoveCard = function (k) {
    k.unload();
  };
  this.onExit = function () {
    this.unload();
    $(s_oMain).trigger("save_score", [d.getCredit()]);
    $(s_oMain).trigger("end_session");
    $(s_oMain).trigger("share_event", d.getCredit());
    s_oMain.gotoMenu();
  };
  this.getState = function () {
    return z;
  };
  this._updateWaitingBet = function () {
    m += s_iTimeElaps;
    m > BET_TIME
      ? ((m = 0),
        d.getCurBet() < C ||
          (L.disableBetFiches(),
          L.enable(!0, !1, !1, !1, !1),
          this.changeState(STATE_GAME_DEALING),
          $(s_oMain).trigger("bet_placed", d.getCurBet())))
      : L.displayMsg(
          TEXT_MIN_BET + ":" + C + "\n" + TEXT_MAX_BET + ":" + p,
          TEXT_DISPLAY_MSG_WAITING_BET + " " + Math.floor((BET_TIME - m) / 1e3)
        );
  };
  this._updateDealing = function () {
    for (var k = 0; k < H.length; k++) H[k].update();
  };
  this._updateHitting = function () {
    for (var k = 0; k < H.length; k++) H[k].update();
  };
  this._updateSplit = function () {
    d.updateSplit();
  };
  this._updateShowWinner = function () {
    d.updateFichesController(s_iTimeElaps);
    for (var k = d.getPlayerCards(), q = 0; q < k.length; q++) k[q].update();
    for (k = 0; k < y.length; k++) y[k].update();
    m += s_iTimeElaps;
    m > TIME_END_HAND &&
      ((m = 0),
      this.reset(!1),
      L.reset(),
      d.getCredit() < C
        ? (this._gameOver(), this.changeState(-1))
        : this.changeState(STATE_GAME_WAITING_FOR_BET),
      L.refreshCredit(d.getCredit()));
  };
  this.update = function () {
    if (!1 !== e)
      switch (z) {
        case STATE_GAME_WAITING_FOR_BET:
          this._updateWaitingBet();
          break;
        case STATE_GAME_DEALING:
          this._updateDealing();
          break;
        case STATE_GAME_HITTING:
          this._updateHitting();
          break;
        case STATE_GAME_SPLIT:
          this._updateSplit();
          break;
        case STATE_GAME_SHOW_WINNER:
          this._updateShowWinner();
      }
  };
  s_oGame = this;
  TOTAL_MONEY = a.money;
  MIN_BET = a.min_bet;
  MAX_BET = a.max_bet;
  BET_TIME = a.bet_time;
  BLACKJACK_PAYOUT = a.blackjack_payout;
  WIN_OCCURRENCE = a.win_occurrence;
  var R = a.game_cash;
  AD_SHOW_COUNTER = a.ad_show_counter;
  this._init();
}
var s_oGame, s_oTweenController;

function CInterface(a) {
  var e,
    b,
    c,
    g,
    f,
    h,
    r,
    m,
    p,
    C,
    z,
    w,
    x,
    t,
    K,
    A,
    u,
    l,
    H,
    F,
    y,
    B,
    G = null,
    D = null;
  this._init = function (n) {
    var v = s_oSpriteLibrary.getSprite("but_exit");
    c = CANVAS_WIDTH - v.width / 2 - 2;
    g = v.height / 2 + 2;
    m = new CGfxButton(c, g, v, !0);
    m.addEventListener(ON_MOUSE_UP, this._onExit, this);
    !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
      ? ((f = m.getX() - v.width),
        (h = v.height / 2 + 2),
        (A = new CToggle(
          f,
          h,
          s_oSpriteLibrary.getSprite("audio_icon"),
          s_bAudioActive,
          s_oStage
        )),
        A.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
        (e = f - v.width - 2),
        (b = h))
      : ((e = m.getX() - v.width), (b = v.height / 2 + 2));
    v = window.document;
    var I = v.documentElement;
    G =
      I.requestFullscreen ||
      I.mozRequestFullScreen ||
      I.webkitRequestFullScreen ||
      I.msRequestFullscreen;
    D =
      v.exitFullscreen ||
      v.mozCancelFullScreen ||
      v.webkitExitFullscreen ||
      v.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (G = !1);
    G &&
      screenfull.isEnabled &&
      ((v = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (B = new CToggle(e, b, v, s_bFullscreen, s_oStage)),
      B.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    v = createBitmap(s_oSpriteLibrary.getSprite("display_bg"));
    v.x = 280;
    v.y = 6;
    s_oStage.addChild(v);
    v = s_oSpriteLibrary.getSprite("bet_bg");
    I = createBitmap(v);
    I.x = 340;
    I.y = CANVAS_HEIGHT - v.height + 4;
    s_oStage.addChild(I);
    v = s_oSpriteLibrary.getSprite("but_game_small_bg");
    p = new CTextButton(
      444,
      CANVAS_HEIGHT - 30,
      v,
      TEXT_CLEAR,
      FONT_GAME_1,
      "#ffffff",
      14,
      s_oStage
    );
    p.addEventListener(ON_MOUSE_UP, this._onButClearRelease, this);
    C = new CTextButton(
      632,
      CANVAS_HEIGHT - 30,
      v,
      TEXT_REBET,
      FONT_GAME_1,
      "#ffffff",
      14,
      s_oStage
    );
    C.addEventListener(ON_MOUSE_UP, this._onButRebetRelease, this);
    H = new CTLText(
      s_oStage,
      400,
      18,
      190,
      40,
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
    F = new CTLText(
      s_oStage,
      400,
      60,
      190,
      40,
      18,
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
    l = new createjs.Text("", "20px " + FONT_GAME_1, "#fff");
    l.shadow = new createjs.Shadow("#000000", 2, 2, 1);
    l.x = 758;
    l.y = 180;
    l.textAlign = "right";
    s_oStage.addChild(l);
    v = createBitmap(s_oSpriteLibrary.getSprite("money_bg"));
    v.x = 1127;
    v.y = CANVAS_HEIGHT - 100;
    s_oStage.addChild(v);
    u = new CTLText(
      s_oStage,
      1130,
      CANVAS_HEIGHT - 95,
      224,
      29,
      29,
      "center",
      "#ffde00",
      FONT_GAME_2,
      1,
      0,
      0,
      TEXT_CURRENCY + n.toFixed(2),
      !0,
      !0,
      !0,
      !1
    );
    v = s_oSpriteLibrary.getSprite("but_game_bg");
    z = new CTextButton(
      908,
      CANVAS_HEIGHT - 30,
      v,
      TEXT_DEAL,
      FONT_GAME_1,
      "#ffffff",
      20,
      s_oStage
    );
    z.addEventListener(ON_MOUSE_UP, this._onButDealRelease, this);
    w = new CTextButton(
      1008,
      CANVAS_HEIGHT - 30,
      v,
      TEXT_HIT,
      FONT_GAME_1,
      "#ffffff",
      20,
      s_oStage
    );
    w.addEventListener(ON_MOUSE_UP, this._onButHitRelease, this);
    x = new CTextButton(
      1108,
      CANVAS_HEIGHT - 30,
      v,
      TEXT_STAND,
      FONT_GAME_1,
      "#ffffff",
      20,
      s_oStage
    );
    x.addEventListener(ON_MOUSE_UP, this._onButStandRelease, this);
    t = new CTextButton(
      1208,
      CANVAS_HEIGHT - 30,
      v,
      TEXT_DOUBLE,
      FONT_GAME_1,
      "#ffffff",
      20,
      s_oStage
    );
    t.addEventListener(ON_MOUSE_UP, this._onButDoubleRelease, this);
    K = new CTextButton(
      1308,
      CANVAS_HEIGHT - 30,
      v,
      TEXT_SPLIT,
      FONT_GAME_1,
      "#ffffff",
      20,
      s_oStage
    );
    K.addEventListener(ON_MOUSE_UP, this._onButSplitRelease, this);
    n = [
      {
        x: 387,
        y: 666,
      },
      {
        x: 447,
        y: 666,
      },
      {
        x: 507,
        y: 666,
      },
      {
        x: 567,
        y: 666,
      },
      {
        x: 627,
        y: 666,
      },
      {
        x: 687,
        y: 666,
      },
    ];
    r = [];
    v = s_oGameSettings.getFichesValues();
    for (I = 0; I < NUM_FICHES; I++)
      (r[I] = new CFiche(n[I].x, n[I].y, I, v[I], !0, s_oStage)),
        r[I].addEventListenerWithParams(
          ON_MOUSE_UP,
          this._onFicheClicked,
          this,
          [v[I], I]
        );
    y = new CInsurancePanel();
    this.disableButtons();
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };
  this.unload = function () {
    m.unload();
    m = null;
    !1 === DISABLE_SOUND_MOBILE && (A.unload(), (A = null));
    G && screenfull.isEnabled && B.unload();
    s_oInterface = null;
  };
  this.refreshButtonPos = function (n, v) {
    m.setPosition(c - n, v + g);
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      A.setPosition(f - n, v + h);
    G && screenfull.isEnabled && B.setPosition(e - n, b + v);
  };
  this.reset = function () {
    this.disableButtons();
  };
  this.enableBetFiches = function () {
    for (var n = 0; n < NUM_FICHES; n++) r[n].enable();
    p.enable();
    C.enable();
  };
  this.disableBetFiches = function () {
    for (var n = 0; n < NUM_FICHES; n++) r[n].disable();
    p.disable();
    C.disable();
  };
  this.disableRebet = function () {
    C.disable();
  };
  this.disableButtons = function () {
    z.disable();
    w.disable();
    x.disable();
    t.disable();
    K.disable();
  };
  this.enable = function (n, v, I, Q, S) {
    n ? z.enable() : z.disable();
    v ? w.enable() : w.disable();
    I ? x.enable() : x.disable();
    Q ? t.enable() : t.disable();
    S ? K.enable() : K.disable();
  };
  this.refreshCredit = function (n) {
    u.refreshText(TEXT_CURRENCY + n.toFixed(2));
  };
  this.refreshDealerCardValue = function (n) {
    l.text = "" + n;
  };
  this.displayMsg = function (n, v) {
    H.refreshText(n);
    void 0 !== v && F.refreshText(v);
  };
  this.showInsurancePanel = function () {
    y.show(TEXT_INSURANCE);
  };
  this.clearDealerText = function () {
    l.text = "";
  };
  this._onFicheClicked = function (n) {
    s_oGame.onFicheSelected(n[1], n[0]);
  };
  this._onButClearRelease = function () {
    s_oGame.clearBets();
  };
  this._onButRebetRelease = function () {
    s_oGame.rebet();
  };
  this._onButDealRelease = function () {
    this.disableBetFiches();
    this.disableButtons();
    s_oGame.onDeal();
  };
  this._onButHitRelease = function () {
    this.disableButtons();
    s_oGame.onHit();
  };
  this._onButStandRelease = function () {
    this.disableButtons();
    s_oGame.onStand();
  };
  this._onButDoubleRelease = function () {
    this.disableButtons();
    s_oGame.onDouble();
  };
  this._onButSplitRelease = function () {
    this.disableButtons();
    s_oGame.onSplit();
  };
  this._onExit = function () {
    s_oGame.onExit();
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this.resetFullscreenBut = function () {
    G && screenfull.isEnabled && B.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? D.call(window.document)
      : G.call(window.document.documentElement);
    sizeHandler();
  };
  s_oInterface = this;
  this._init(a);
  return this;
}
var s_oInterface = null;

function CTweenController() {
  this.tweenValue = function (a, e, b) {
    return a + b * (e - a);
  };
  this.easeLinear = function (a, e, b, c) {
    return (b * a) / c + e;
  };
  this.easeInCubic = function (a, e, b, c) {
    c = (a /= c) * a * a;
    return e + b * c;
  };
  this.easeBackInQuart = function (a, e, b, c) {
    c = (a /= c) * a;
    return e + b * (2 * c * c + 2 * c * a + -3 * c);
  };
  this.easeInBack = function (a, e, b, c) {
    return b * (a /= c) * a * (2.70158 * a - 1.70158) + e;
  };
  this.easeOutCubic = function (a, e, b, c) {
    return b * ((a = a / c - 1) * a * a + 1) + e;
  };
}

function CSeat() {
  var a, e, b, c, g, f, h, r, m, p, C, z, w, x, t, K, A, u, l, H, F, y, B, G, D;
  this._init = function () {
    p = new createjs.Container();
    p.x = 734;
    p.y = 360;
    var n = createBitmap(s_oSpriteLibrary.getSprite("seat"));
    n.x = 66;
    n.y = 175;
    p.addChild(n);
    n = s_oSpriteLibrary.getSprite("but_game_small_bg");
    t = new CTextButton(
      115,
      221,
      n,
      TEXT_SIT_DOWN,
      FONT_GAME_1,
      "#ffffff",
      20,
      p
    );
    t.addEventListener(ON_MOUSE_UP, this._onSitDown, this);
    w = new createjs.Text("", "20px " + FONT_GAME_1, "#ffde00");
    w.shadow = new createjs.Shadow("#000000", 2, 2, 1);
    w.x = 84;
    w.y = 208;
    w.textAlign = "right";
    p.addChild(w);
    x = new createjs.Text("", "20px " + FONT_GAME_1, "#ffde00");
    x.shadow = new createjs.Shadow("#000000", 2, 2, 1);
    x.x = 175;
    x.y = 208;
    x.textAlign = "left";
    p.addChild(x);
    C = new createjs.Text("", "20px " + FONT_GAME_1, "#ffffff");
    C.shadow = new createjs.Shadow("#000000", 2, 2, 1);
    C.x = 56;
    C.y = 105;
    C.textAlign = "right";
    p.addChild(C);
    z = new createjs.Text("", "20px " + FONT_GAME_1, "#ffffff");
    z.shadow = new createjs.Shadow("#000000", 2, 2, 1);
    z.x = 138;
    z.y = 105;
    z.textAlign = "left";
    p.addChild(z);
    l = new createjs.Text("", "20px " + FONT_GAME_1, "#ffffff");
    l.shadow = new createjs.Shadow("#000000", 2, 2, 1);
    l.x = 0;
    l.y = 240;
    l.textAlign = "center";
    p.addChild(l);
    H = new createjs.Text("", "20px " + FONT_GAME_1, "#ffffff");
    H.shadow = new createjs.Shadow("#000000", 2, 2, 1);
    H.x = 150;
    H.y = 240;
    H.textAlign = "left";
    p.addChild(H);
    F = createBitmap(s_oSpriteLibrary.getSprite("arrow_hand"));
    F.visible = !1;
    p.addChild(F);
    s_oStage.addChild(p);
    K = new CVector2();
    K.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    y = new CFichesController(
      {
        x: 834,
        y: 566,
      },
      K
    );
    g = 0;
    f = [];
    h = [];
    this.reset();
    A = new CVector2();
    A.set(64, 163);
    m = new CVector2(A.getX(), A.getY());
    u = new CVector2();
    u.set(172, 163);
    G = [];
    D = [];
  };
  this.unload = function () {
    s_oStage.removeChild(p);
  };
  this.addEventListener = function (n, v, I) {
    G[n] = v;
    D[n] = I;
  };
  this.reset = function () {
    c = b = 0;
    e = a = !1;
    for (var n = 0; n < f.length; n++) f[n].getFichesController().reset();
    f = [];
    n = new CHandController(A, y);
    f.push(n);
    for (n = 0; n < h.length; n++) h[n].unload();
    h = [];
    r = [];
    y.addEventListener(FICHES_END_MOV, this._onFichesEndMove);
    B = null;
    this.clearText();
  };
  this.clearText = function () {
    w.text = "";
    x.text = "";
    C.text = "";
    z.text = "";
  };
  this.clearBet = function () {
    y.reset();
    r = [];
    w.text = "";
    f[b].changeBet(0);
  };
  this.addCardToHand = function (n) {
    f[b].addCard(n);
    h.push(n);
    n.addEventListener(ON_CARD_TO_REMOVE, this._onRemoveCard);
  };
  this.increaseHandValue = function (n) {
    f[b].increaseHandValue(n);
  };
  this.refreshCardValue = function () {
    C.text = "" + this.getHandValue(0);
    0 < this.getHandValue(1) && (z.text = "" + this.getHandValue(1));
  };
  this.setCredit = function (n) {
    g = n;
  };
  this.increaseCredit = function (n) {
    g += n;
  };
  this.changeBet = function (n) {
    f[b].changeBet(n);
  };
  this.checkHand = function () {
    var n = f[b].getValue();
    if (21 === n) this.checkPlayerLastHand(PASS_TURN);
    else if (21 < n)
      0 < f[b].getAces()
        ? (f[b].removeAce(),
          21 === f[b].getValue()
            ? this.checkPlayerLastHand(PASS_TURN)
            : a
            ? this.checkPlayerLastHand(PASS_TURN)
            : G[RESTORE_ACTION] &&
              G[RESTORE_ACTION].call(D[RESTORE_ACTION], !1, !0, !0, !1, !1),
          this.refreshCardValue())
        : 1 < f.length || e
        ? this.checkPlayerLastHand(PASS_TURN)
        : this.checkPlayerLastHand(PLAYER_LOSE);
    else if (a) this.checkPlayerLastHand(PASS_TURN);
    else {
      var v = !1;
      2 === f[b].getNumCards() && 8 < n && 16 > n
        ? (v = !0)
        : 0 < this.getAces() &&
          (21 < n
            ? ((n -= 10), this.removeAce(), 8 < n && 16 > n && (v = !0))
            : ((n -= 10),
              2 === f[b].getNumCards() && 8 < n && 16 > n && (v = !0)));
      G[RESTORE_ACTION] &&
        G[RESTORE_ACTION].call(D[RESTORE_ACTION], !1, !0, !0, v, !1);
    }
  };
  this.checkPlayerLastHand = function (n) {
    b--;
    -1 < b
      ? (G[RESTORE_ACTION] &&
          G[RESTORE_ACTION].call(D[RESTORE_ACTION], !1, !0, !0, !1, !1),
        (F.x = A.getX()))
      : (G[n] && G[n].call(D[n], 0), this.removeArrow());
  };
  this.bet = function (n, v) {
    v
      ? ((w.text = TEXT_CURRENCY + n / 2), (x.text = TEXT_CURRENCY + n / 2))
      : (w.text = TEXT_CURRENCY + n);
  };
  this.setSplitHand = function () {
    for (var n = [], v = 0; v < r.length; v++) n.push(r[v]);
    B = new CFichesController(
      {
        x: 950,
        y: 566,
      },
      K
    );
    B.refreshFiches(n, 0, 0, !1);
    B.addEventListener(B.FICHES_END_MOV, this._onFichesEndMove);
    n = new CHandController(u, B);
    f.push(n);
    f[1].addCard(f[0].getCard(1));
    f[0].removeCard(1);
    1 === f[0].getValue() && (f[0].setHandValue(11), f[0].increaseAces());
    f[1].setHandValue(f[0].getValue());
    b = f.length - 1;
  };
  this.decreaseCredit = function (n) {
    g -= n;
  };
  this.stand = function () {
    this.checkPlayerLastHand(PASS_TURN);
  };
  this.refreshFiches = function (n, v, I, Q) {
    r.push({
      value: n,
      index: v,
    });
    y.refreshFiches(r, I, Q);
  };
  this.initMovement = function (n, v, I) {
    this.getFichesController(n).initMovement(v, I, !1);
  };
  this.initInsuranceMov = function (n, v) {
    y.initInsuranceMov(n, v);
  };
  this.showWinner = function (n, v, I) {
    0 < I
      ? (0 === n ? (l.text = v + ": " + I) : (H.text = v + ": " + I),
        playSound("win", 1, !1))
      : (0 === n ? (l.text = v) : (H.text = v), playSound("lose", 1, !1));
    var Q = this;
    0 === n
      ? createjs.Tween.get(l)
          .to(
            {
              alpha: 1,
            },
            TIME_SHOW_FINAL_CARDS
          )
          .call(function () {
            Q.endWinAnim();
          })
      : createjs.Tween.get(H)
          .to(
            {
              alpha: 1,
            },
            TIME_SHOW_FINAL_CARDS
          )
          .call(function () {
            Q.endWinAnim();
          });
    $(s_oMain).trigger("save_score", [g]);
  };
  this.endWinAnim = function () {
    l &&
      H &&
      ((l.text = ""),
      (H.text = ""),
      G[END_HAND] && G[END_HAND].call(D[END_HAND]));
  };
  this.newCardDealed = function () {
    c++;
    return c;
  };
  this.removeAce = function () {
    f[b].removeAce();
  };
  this.removeArrow = function () {
    F.visible = !1;
  };
  this.doubleAction = function (n) {
    f[b].changeBet(n);
    n = [];
    for (var v = 0; v < r.length; v++) n.push(r[v]);
    1 < f.length
      ? 1 === b
        ? B.refreshFiches(n, 0, 40)
        : y.refreshFiches(n, 0, 40)
      : y.refreshFiches(n, 0, 40);
  };
  this.split = function () {
    h[0].initSplit(new CVector2(p.x + A.getX(), p.y + A.getY()));
    h[1].initSplit(new CVector2(p.x + u.getX(), p.y + u.getY()));
    h[1].addEventListener(SPLIT_CARD_END_ANIM, this._onSplitCardEndAnim);
  };
  this.insurance = function (n, v, I) {
    this.changeBet(n);
    this.increaseCredit(v);
    n = y.createFichesPile(I, !0);
    r = [];
    for (v = 0; v < n.length; v++)
      r.push({
        value: n[v].value,
        index: n[v].index,
      });
    e = !0;
  };
  this.rebet = function () {
    var n = y.getPrevBet();
    if (n > g || 0 === n) return 0;
    this.decreaseCredit(n);
    this.changeBet(n);
    var v = y.createFichesPile(n, !1);
    r = [];
    for (var I = 0; I < v.length; I++)
      r.push({
        value: v[I].value,
        index: v[I].index,
      });
    this.bet(n, !1);
    return n;
  };
  this.setVisibleSitDownButton = function (n) {
    t.setVisible(n);
  };
  this._onSitDown = function () {
    t.setVisible(!1);
    G[SIT_DOWN] && G[SIT_DOWN].call(D[SIT_DOWN]);
  };
  this._onFichesEndMove = function () {
    G[ASSIGN_FICHES] && G[ASSIGN_FICHES].call(D[ASSIGN_FICHES]);
  };
  this._onRemoveCard = function (n) {
    for (var v = 0; v < h.length; v++)
      if (h[v] === n) {
        h.splice(v, 1);
        break;
      }
  };
  this._onSplitCardEndAnim = function () {
    s_oGame._onSplitCardEndAnim();
    F.x = u.getX();
    F.y = u.getY() + 70;
    F.visible = !0;
  };
  this.updateFichesController = function (n) {
    B && B.update(n);
    y.update(n);
  };
  this.updateSplit = function () {
    for (var n = 0; n < h.length; n++) h[n].update(s_iTimeElaps);
  };
  this.isSplitAvailable = function () {
    return h[0] && h[1]
      ? 0 === Math.abs(h[0].getFotogram() - h[1].getFotogram()) % 13
        ? !0
        : !1
      : !1;
  };
  this.getAttachCardOffset = function () {
    if (0 === b)
      m.set(
        p.x + A.getX() + (CARD_WIDTH / 2) * f[b].getNumCards(),
        p.y + A.getY() - (CARD_HEIGHT / 2) * f[b].getNumCards()
      );
    else {
      var n = p.x + u.getX() + (CARD_WIDTH / 2) * f[b].getNumCards(),
        v = p.y + u.getY() - (CARD_HEIGHT / 2) * f[b].getNumCards();
      m.set(n, v);
    }
    return m;
  };
  this.getCurBet = function () {
    return f[b].getCurBet();
  };
  this.getCredit = function () {
    return g;
  };
  this.getHandValue = function (n) {
    return n > f.length - 1 ? 0 : f[n].getValue();
  };
  this.getNumHands = function () {
    return f.length;
  };
  this.getNumCardsForHand = function (n) {
    return f[n].getNumCards();
  };
  this.getBetForHand = function (n) {
    return f[n].getCurBet();
  };
  this.getAces = function () {
    return f[b].getAces();
  };
  this.getFichesController = function (n) {
    return f[n].getFichesController();
  };
  this.getCardOffset = function () {
    return A;
  };
  this.getPlayerCards = function () {
    return h;
  };
  this.getStartingBet = function () {
    return y.getValue();
  };
  this._init();
}

function CFichesController(a, e) {
  var b, c, g, f, h, r, m, p, C, z, w, x, t, K, A;
  this._init = function (u, l) {
    x = new createjs.Container();
    x.x = u.x;
    x.y = u.y;
    s_oStage.addChild(x);
    t = new createjs.Container();
    t.x = 400;
    t.y = 230;
    s_oStage.addChild(t);
    m = new CVector2();
    m.set(x.x, x.y);
    z = new CVector2();
    z.setV(l);
    h = r = f = 0;
    c = b = !1;
    K = [];
    A = [];
  };
  this.addEventListener = function (u, l, H) {
    K[u] = l;
    A[u] = H;
  };
  this.reset = function () {
    g = b = !1;
    h = 0;
    x.removeAllChildren();
    t.removeAllChildren();
    x.x = m.getX();
    x.y = m.getY();
    t.x = z.getX();
    t.y = z.getY();
  };
  this.refreshFiches = function (u, l, H, F) {
    u = u.sortOn("value", "index");
    var y = H;
    F && (b = !0);
    for (var B = (h = 0), G = 0; G < u.length; G++) {
      var D = x;
      F && (D = t);
      new CFiche(l, y, u[G].index, u[G].value, !1, D).setScale(0.7);
      y -= 5;
      B++;
      9 < B && ((B = 0), (l += FICHE_WIDTH), (y = H));
      h += u[G].value;
      h = parseFloat(h.toFixed(2));
    }
    playSound("chip", 1, !1);
  };
  this.createFichesPile = function (u, l) {
    var H = s_oGameSettings.getFichesValues(),
      F = [];
    do {
      for (var y = H[H.length - 1], B = H.length - 1; y > u; ) B--, (y = H[B]);
      B = Math.floor(u / y);
      for (var G = 0; G < B; G++)
        F.push({
          value: y,
          index: s_oGameSettings.getIndexForFiches(y),
        });
      y = u % y;
      u = y = parseFloat(y.toFixed(2));
    } while (0 < y);
    this.refreshFiches(F, 0, 0, l);
    return F;
  };
  this.rebet = function () {
    this.createFichesPile(r, !1);
  };
  this.initMovement = function (u, l, H) {
    b || (r = h);
    c = H;
    p = new CVector2(x.x, x.y);
    C = new CVector2(u, l);
  };
  this.initInsuranceMov = function (u, l) {
    w = new CVector2(u, l);
  };
  this.getValue = function () {
    return h;
  };
  this.getPrevBet = function () {
    return r;
  };
  this._updateInsuranceFiches = function () {
    if (b) {
      var u = easeInOutCubic(f, 0, 1, TIME_FICHES_MOV);
      u = tweenVectors(z, w, u, new CVector2());
      t.x = u.getX();
      t.y = u.getY();
    }
  };
  this.update = function (u) {
    if (!g)
      if (((f += u), f > TIME_FICHES_MOV))
        (f = 0),
          (g = !0),
          K[FICHES_END_MOV] && K[FICHES_END_MOV].call(A[FICHES_END_MOV], c, h);
      else {
        u = easeInOutCubic(f, 0, 1, TIME_FICHES_MOV);
        var l = new CVector2();
        l = tweenVectors(p, C, u, l);
        x.x = l.getX();
        x.y = l.getY();
        this._updateInsuranceFiches();
      }
  };
  this._init(a, e);
}

function CVector2(a, e) {
  var b, c;
  this._init = function (g, f) {
    b = g;
    c = f;
  };
  this.add = function (g, f) {
    b += g;
    c += f;
  };
  this.addV = function (g) {
    b += g.getX();
    c += g.getY();
  };
  this.scalarDivision = function (g) {
    b /= g;
    c /= g;
  };
  this.subV = function (g) {
    b -= g.getX();
    c -= g.getY();
  };
  this.scalarProduct = function (g) {
    b *= g;
    c *= g;
  };
  this.invert = function () {
    b *= -1;
    c *= -1;
  };
  this.dotProduct = function (g) {
    return b * g.getX() + c * g.getY();
  };
  this.set = function (g, f) {
    b = g;
    c = f;
  };
  this.setV = function (g) {
    b = g.getX();
    c = g.getY();
  };
  this.length = function () {
    return Math.sqrt(b * b + c * c);
  };
  this.length2 = function () {
    return b * b + c * c;
  };
  this.normalize = function () {
    var g = this.length();
    0 < g && ((b /= g), (c /= g));
  };
  this.getNormalize = function (g) {
    this.length();
    g.set(b, c);
    g.normalize();
  };
  this.rot90CCW = function () {
    var g = b;
    b = -c;
    c = g;
  };
  this.rot90CW = function () {
    var g = b;
    b = c;
    c = -g;
  };
  this.getRotCCW = function (g) {
    g.set(b, c);
    g.rot90CCW();
  };
  this.getRotCW = function (g) {
    g.set(b, c);
    g.rot90CW();
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
  this._init(a, e);
}

function CGameSettings() {
  var a, e, b, c;
  this._init = function () {
    b = [];
    a = [];
    for (var g = 0; 2 > g; g++)
      for (var f = 0; 52 > f; f++) {
        a.push(f);
        var h = (f + 1) % 13;
        if (10 < h || 0 === h) h = 10;
        1 === h && (h = 11);
        b.push(h);
      }
    c = [0.1, 1, 5, 10, 25, 100];
  };
  this.getFichesValues = function () {
    return c;
  };
  this.getFichesValueAt = function (g) {
    return c[g];
  };
  this.getIndexForFiches = function (g) {
    for (var f = 0, h = 0; h < c.length; h++) c[h] === g && (f = h);
    return f;
  };
  this.generateFichesPile = function (g) {
    var f = [],
      h = c.length - 1,
      r = c[h];
    do {
      var m = g % r;
      m = CMath.roundDecimal(m, 1);
      g = Math.floor(g / r);
      for (var p = 0; p < g; p++) f.push(r);
      h--;
      r = c[h];
      g = m;
    } while (0 < m && -1 < h);
    return f;
  };
  this.timeToString = function (g) {
    g = Math.round(g / 1e3);
    var f = Math.floor(g / 60);
    g -= 60 * f;
    var h = "";
    h = 10 > f ? h + ("0" + f + ":") : h + (f + ":");
    return 10 > g ? h + ("0" + g) : h + g;
  };
  this.getShuffledCardDeck = function () {
    for (var g = [], f = 0; f < a.length; f++) g[f] = a[f];
    for (e = []; 0 < g.length; )
      e.push(g.splice(Math.round(Math.random() * (g.length - 1)), 1)[0]);
    return e;
  };
  this.getCardValue = function (g) {
    return b[g];
  };
  this.getRandDealerPattern = function () {
    var g;
    do {
      var f = [];
      for (var h = (g = 0); 2 > h; h++) {
        do var r = Math.floor(52 * Math.random());
        while (11 === this.getCardValue(r));
        g += this.getCardValue(r);
        f.push(r);
      }
    } while (12 > g || 16 < g);
    g = 21 - g;
    do h = Math.floor(52 * Math.random());
    while (this.getCardValue(h) <= g || 11 === this.getCardValue(h));
    f.push(h);
    return f;
  };
  this._init();
}
var TYPE_LINEAR = 0,
  TYPE_OUT_CUBIC = 1,
  TYPE_IN_CUBIC = 2,
  TYPE_OUT_BACK = 3,
  TYPE_IN_BACK = 4;

function ease(a, e, b, c, g, f) {
  switch (a) {
    case TYPE_LINEAR:
      var h = easeLinear(e, b, c, g, f);
      break;
    case TYPE_IN_CUBIC:
      h = easeInCubic(e, b, c, g, f);
      break;
    case TYPE_OUT_CUBIC:
      h = easeOutCubic(e, b, c, g, f);
      break;
    case TYPE_IN_BACK:
      h = easeInBack(e, b, c, g, f);
      break;
    case TYPE_OUT_BACK:
      h = easeInBack(e, b, c, g, f);
  }
  return h;
}

function easeOutBounce(a, e, b, c) {
  return (a /= c) < 1 / 2.75
    ? 7.5625 * b * a * a + e
    : a < 2 / 2.75
    ? b * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + e
    : a < 2.5 / 2.75
    ? b * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + e
    : b * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + e;
}

function easeInBounce(a, e, b, c) {
  return b - easeOutBounce(c - a, 0, b, c) + e;
}

function easeInOutBounce(a, e, b, c) {
  return a < c / 2
    ? 0.5 * easeInBounce(2 * a, 0, b, c) + e
    : 0.5 * easeOutBounce(2 * a - c, 0, b, c) + 0.5 * b + e;
}

function easeInCirc(a, e, b, c) {
  return -b * (Math.sqrt(1 - (a /= c) * a) - 1) + e;
}

function easeOutCirc(a, e, b, c) {
  return b * Math.sqrt(1 - (a = a / c - 1) * a) + e;
}

function easeInOutCirc(a, e, b, c) {
  return 1 > (a /= c / 2)
    ? (-b / 2) * (Math.sqrt(1 - a * a) - 1) + e
    : (b / 2) * (Math.sqrt(1 - (a -= 2) * a) + 1) + e;
}

function easeInCubic(a, e, b, c, g) {
  return b * (a /= c) * a * a + e;
}

function easeOutCubic(a, e, b, c, g) {
  return b * ((a = a / c - 1) * a * a + 1) + e;
}

function easeInOutCubic(a, e, b, c, g) {
  return 1 > (a /= c / 2)
    ? (b / 2) * a * a * a + e
    : (b / 2) * ((a -= 2) * a * a + 2) + e;
}

function easeInElastic(a, e, b, c, g, f, h) {
  if (0 == a) return e;
  if (1 == (a /= c)) return e + b;
  h || (h = 0.3 * c);
  !f || f < Math.abs(b)
    ? ((f = b), (g = h / 4))
    : (g = (h / (2 * Math.PI)) * Math.asin(b / f));
  return (
    -(f * Math.pow(2, 10 * --a) * Math.sin((2 * (a * c - g) * Math.PI) / h)) + e
  );
}

function easeOutElastic(a, e, b, c, g, f, h) {
  if (0 == a) return e;
  if (1 == (a /= c)) return e + b;
  h || (h = 0.3 * c);
  !f || f < Math.abs(b)
    ? ((f = b), (g = h / 4))
    : (g = (h / (2 * Math.PI)) * Math.asin(b / f));
  return (
    f * Math.pow(2, -10 * a) * Math.sin((2 * (a * c - g) * Math.PI) / h) + b + e
  );
}

function easeInOutElastic(a, e, b, c, g, f, h) {
  if (0 == a) return e;
  if (1 == (a /= c)) return e + b;
  h || (h = 0.3 * c);
  !f || f < Math.abs(b)
    ? ((f = b), (g = h / 4))
    : (g = (h / (2 * Math.PI)) * Math.asin(b / f));
  return 1 > a
    ? -0.5 *
        f *
        Math.pow(2, 10 * --a) *
        Math.sin((2 * (a * c - g) * Math.PI) / h) +
        e
    : f *
        Math.pow(2, -10 * --a) *
        Math.sin((2 * (a * c - g) * Math.PI) / h) *
        0.5 +
        b +
        e;
}

function easeInExpo(a, e, b, c) {
  return 0 == a ? e : b * Math.pow(2, 10 * (a / c - 1)) + e;
}

function easeOutExpo(a, e, b, c) {
  return a == c ? e + b : b * (-Math.pow(2, (-10 * a) / c) + 1) + e;
}

function easeInOutExpo(a, e, b, c) {
  return 0 == a
    ? e
    : a == c
    ? e + b
    : 1 > (a /= c / 2)
    ? (b / 2) * Math.pow(2, 10 * (a - 1)) + e
    : (b / 2) * (-Math.pow(2, -10 * --a) + 2) + e;
}

function easeLinear(a, e, b, c) {
  return (b * a) / c + e;
}

function easeInQuad(a, e, b, c) {
  return b * (a /= c) * a + e;
}

function easeOutQuad(a, e, b, c) {
  return -b * (a /= c) * (a - 2) + e;
}

function easeInOutQuad(a, e, b, c) {
  return 1 > (a /= c / 2)
    ? (b / 2) * a * a + e
    : (-b / 2) * (--a * (a - 2) - 1) + e;
}

function easeInQuart(a, e, b, c) {
  return b * (a /= c) * a * a * a + e;
}

function easeOutQuart(a, e, b, c) {
  return -b * ((a = a / c - 1) * a * a * a - 1) + e;
}

function easeInOutQuart(a, e, b, c) {
  return 1 > (a /= c / 2)
    ? (b / 2) * a * a * a * a + e
    : (-b / 2) * ((a -= 2) * a * a * a - 2) + e;
}

function easeInQuint(a, e, b, c) {
  return b * (a /= c) * a * a * a * a + e;
}

function easeOutQuint(a, e, b, c) {
  return b * ((a = a / c - 1) * a * a * a * a + 1) + e;
}

function easeInOutQuint(a, e, b, c) {
  return 1 > (a /= c / 2)
    ? (b / 2) * a * a * a * a * a + e
    : (b / 2) * ((a -= 2) * a * a * a * a + 2) + e;
}

function easeInSine(a, e, b, c) {
  return -b * Math.cos((a / c) * (Math.PI / 2)) + b + e;
}

function easeOutSine(a, e, b, c) {
  return b * Math.sin((a / c) * (Math.PI / 2)) + e;
}

function easeInOutSine(a, e, b, c) {
  return (-b / 2) * (Math.cos((Math.PI * a) / c) - 1) + e;
}

function easeInBack(a, e, b, c) {
  return b * (a /= c) * a * (2.70158 * a - 1.70158) + e;
}

function easeOutBack(a, e, b, c) {
  return b * ((a = a / c - 1) * a * (2.70158 * a + 1.70158) + 1) + e;
}

function CHandController(a, e) {
  var b, c, g, f, h, r;
  this._init = function (m, p) {
    g = c = b = 0;
    f = [];
    h = m;
    r = p;
  };
  this.addCard = function (m) {
    f.push(m);
    11 === m.getValue() && c++;
  };
  this.removeCard = function (m) {
    var p = f[m];
    b -= p.getValue();
    11 === p.getValue() && c--;
    f.splice(m, 1);
  };
  this.changeBet = function (m) {
    g = m;
  };
  this.removeAce = function () {
    b -= 10;
    c--;
  };
  this.setHandValue = function (m) {
    b = m;
  };
  this.increaseAces = function () {
    c++;
  };
  this.increaseHandValue = function (m) {
    b += m;
  };
  this.getValue = function () {
    return b;
  };
  this.getCurBet = function () {
    return g;
  };
  this.getDoubleBet = function () {
    return g;
  };
  this.getAces = function () {
    return c;
  };
  this.getCard = function (m) {
    return f[m];
  };
  this.getNumCards = function () {
    return f.length;
  };
  this.getAttachOffset = function () {
    return h;
  };
  this.getFichesController = function () {
    return r;
  };
  this._init(a, e);
}

function CCard(a, e, b) {
  var c,
    g,
    f = -1,
    h,
    r,
    m,
    p,
    C,
    z,
    w,
    x,
    t,
    K;
  this._init = function (A, u, l) {
    K = l;
    l = {
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
    l = new createjs.SpriteSheet(l);
    t = createSprite(
      l,
      "back",
      CARD_WIDTH / 2,
      CARD_HEIGHT / 2,
      CARD_WIDTH,
      CARD_HEIGHT
    );
    t.x = A;
    t.y = u;
    t.stop();
    K.addChild(t);
    w = [];
    x = [];
  };
  this.unload = function () {
    z = C = null;
    K.removeChild(t);
  };
  this.addEventListener = function (A, u, l) {
    w[A] = u;
    x[A] = l;
  };
  this.setInfo = function (A, u, l, H, F, y) {
    g = !1;
    p = 0;
    h = l;
    r = H;
    C = A;
    z = u;
    m = y;
    c = F;
    f = STATE_CARD_DEALING;
  };
  this.removeFromTable = function () {
    w[ON_CARD_TO_REMOVE] &&
      w[ON_CARD_TO_REMOVE].call(x[ON_CARD_TO_REMOVE], this);
  };
  this.initSplit = function (A) {
    C = new CVector2(t.x, t.y);
    z = A;
    p = 0;
    f = STATE_CARD_SPLIT;
  };
  this.initRemoving = function (A) {
    C = new CVector2(t.x, t.y);
    z = A;
    p = 0;
    f = STATE_CARD_REMOVING;
  };
  this.setValue = function () {
    t.gotoAndStop(h);
    var A = this;
    createjs.Tween.get(t)
      .to(
        {
          scaleX: 1,
        },
        100
      )
      .call(function () {
        A.cardShown();
      });
  };
  this.showCard = function () {
    var A = this;
    createjs.Tween.get(t)
      .to(
        {
          scaleX: 0.1,
        },
        100
      )
      .call(function () {
        A.setValue();
      });
  };
  this.hideCard = function () {
    var A = this;
    createjs.Tween.get(t)
      .to(
        {
          scaleX: 0.1,
        },
        100
      )
      .call(function () {
        A.setBack();
      });
  };
  this.setBack = function () {
    t.gotoAndStop("back");
    var A = this;
    createjs.Tween.get(t)
      .to(
        {
          scaleX: 1,
        },
        100
      )
      .call(function () {
        A.cardHidden();
      });
  };
  this.cardShown = function () {
    w[ON_CARD_SHOWN] && w[ON_CARD_SHOWN].call(x[ON_CARD_SHOWN]);
  };
  this.cardHidden = function () {
    g = !0;
  };
  this.getValue = function () {
    return r;
  };
  this.getFotogram = function () {
    return h;
  };
  this._updateDealing = function () {
    p += s_iTimeElaps;
    if (p > TIME_CARD_DEALING)
      (f = -1),
        (p = 0),
        (t.x = z.getX()),
        (t.y = z.getY()),
        (t.rotation = 360),
        w[ON_CARD_ANIMATION_ENDING] &&
          w[ON_CARD_ANIMATION_ENDING].call(
            x[ON_CARD_ANIMATION_ENDING],
            this,
            c,
            m
          ),
        !1 === (c && 2 === m) && this.showCard();
    else {
      this.visible = !0;
      var A = easeInOutCubic(p, 0, 1, TIME_CARD_DEALING),
        u = new CVector2();
      u = tweenVectors(C, z, A, u);
      t.x = u.getX();
      t.y = u.getY();
      !1 === c && (t.rotation = (36e3 * A) / 100);
    }
  };
  this._updateSplit = function () {
    p += s_iTimeElaps;
    if (p > TIME_CARD_DEALING)
      (p = 0),
        w[SPLIT_CARD_END_ANIM] &&
          w[SPLIT_CARD_END_ANIM].call(x[SPLIT_CARD_END_ANIM]),
        (f = -1);
    else {
      var A = easeInOutCubic(p, 0, 1, TIME_CARD_DEALING),
        u = new CVector2();
      u = tweenVectors(C, z, A, u);
      t.x = u.getX();
      t.y = u.getY();
    }
  };
  this._updateRemoving = function () {
    p += s_iTimeElaps;
    if (p > TIME_CARD_REMOVE)
      (p = 0),
        (g = t.visible = !1),
        (f = -1),
        w[ON_CARD_TO_REMOVE] &&
          w[ON_CARD_TO_REMOVE].call(x[ON_CARD_TO_REMOVE], this);
    else {
      var A = easeInOutCubic(p, 0, 1, TIME_CARD_REMOVE),
        u = new CVector2();
      u = tweenVectors(C, z, A, u);
      t.x = u.getX();
      t.y = u.getY();
      t.rotation = (4500 * A) / 100;
    }
  };
  this.update = function () {
    switch (f) {
      case STATE_CARD_DEALING:
        this._updateDealing();
        break;
      case STATE_CARD_SPLIT:
        this._updateSplit();
        break;
      case STATE_CARD_REMOVING:
        !0 === g && this._updateRemoving();
    }
  };
  s_oCard = this;
  this._init(a, e, b);
}
var s_oCard;

function CInsurancePanel() {
  var a, e, b, c;
  this._init = function () {
    c = new createjs.Container();
    s_oStage.addChild(c);
    c.visible = !1;
    var g = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
    c.addChild(g);
    b = new CTLText(
      c,
      CANVAS_WIDTH / 2 - 190,
      290,
      360,
      100,
      50,
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
    b.setShadow("#000000", 2, 2, 2);
    g = s_oSpriteLibrary.getSprite("but_game_small_bg");
    a = new CTextButton(
      CANVAS_WIDTH / 2 - 100,
      CANVAS_HEIGHT - 300,
      g,
      TEXT_NO,
      FONT_GAME_1,
      "#ffffff",
      20,
      c
    );
    a.addEventListener(ON_MOUSE_UP, this._onButNoRelease, this);
    e = new CTextButton(
      CANVAS_WIDTH / 2 + 100,
      CANVAS_HEIGHT - 300,
      g,
      TEXT_YES,
      FONT_GAME_1,
      "#ffffff",
      20,
      c
    );
    e.addEventListener(ON_MOUSE_UP, this._onButYesRelease, this);
  };
  this.unload = function () {
    s_oStage.removeChild(c);
  };
  this.show = function (g) {
    b.refreshText(g);
    c.visible = !0;
  };
  this._onButNoRelease = function () {
    c.visible = !1;
    s_oGame.onNotBuyInsurance();
  };
  this._onButYesRelease = function () {
    c.visible = !1;
    s_oGame.onBuyInsurance();
  };
  this._init();
}

function CGameOver() {
  var a, e, b, c;
  this._init = function () {
    c = new createjs.Container();
    s_oStage.addChild(c);
    c.on("click", function () {});
    var g = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
    c.addChild(g);
    a = new CTLText(
      c,
      CANVAS_WIDTH / 2 - 190,
      290,
      360,
      100,
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
    e = new CTextButton(
      CANVAS_WIDTH / 2 - 100,
      450,
      s_oSpriteLibrary.getSprite("but_game_bg"),
      TEXT_RECHARGE,
      FONT_GAME_1,
      "#fff",
      14,
      c
    );
    e.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
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
    e.unload();
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
    c.visible = !1;
    $(s_oMain).trigger("recharge");
  };
  this._onExit = function () {
    c.visible = !1;
    s_oInterface.enableBetFiches();
    s_oInterface.enable(!0, !1, !1, !1, !1);
  };
  this._init();
}

function CMsgBox() {
  var a, e, b;
  this._init = function () {
    b = new createjs.Container();
    b.alpha = 0;
    b.visible = !1;
    s_oStage.addChild(b);
    a = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
    b.addChild(a);
    e = new CTLText(
      b,
      CANVAS_WIDTH / 2 - 180,
      CANVAS_HEIGHT / 2 - 50,
      360,
      100,
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
    e.setShadow("#000", 2, 2, 2);
  };
  this.unload = function () {
    b.off("mousedown", this._onExit);
  };
  this._initListener = function () {
    b.on("mousedown", this._onExit);
  };
  this.show = function (c) {
    e.refreshText(c);
    b.visible = !0;
    var g = this;
    createjs.Tween.get(b)
      .to(
        {
          alpha: 1,
        },
        500
      )
      .call(function () {
        g._initListener();
      });
    setTimeout(function () {
      g._onExit();
    }, 3e3);
  };
  this._onExit = function () {
    b.visible && (b.off("mousedown"), (b.visible = !1));
  };
  this._init();
  return this;
}

function CCreditsPanel() {
  var a, e, b, c, g, f, h, r, m, p, C;
  this._init = function () {
    C = new createjs.Container();
    C.alpha = 0;
    s_oStage.addChild(C);
    var z = new createjs.Shape();
    z.graphics
      .beginFill("rgba(0,0,0,0.7)")
      .drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    C.addChild(z);
    b = createBitmap(s_oSpriteLibrary.getSprite("msg_box"));
    C.addChild(b);
    r = new createjs.Shape();
    r.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    r.alpha = 0.01;
    r.on("click", this._onLogoButRelease);
    C.addChild(r);
    z = s_oSpriteLibrary.getSprite("but_menu_bg");
    a = CANVAS_WIDTH / 2;
    e = CANVAS_HEIGHT - 164;
    g = new CTextButton(
      a,
      e,
      z,
      TEXT_EXIT,
      FONT_GAME_1,
      "#ffffff",
      40,
      s_oStage
    );
    g.addEventListener(ON_MOUSE_UP, this.unload, this);
    h = new createjs.Text(
      TEXT_CREDITS_DEVELOPED,
      "38px " + FONT_GAME_1,
      "#000"
    );
    h.textAlign = "center";
    h.textBaseline = "alphabetic";
    h.x = CANVAS_WIDTH / 2;
    h.y = 330;
    h.outline = 2;
    C.addChild(h);
    f = new createjs.Text(
      TEXT_CREDITS_DEVELOPED,
      "38px " + FONT_GAME_1,
      "#fff"
    );
    f.textAlign = "center";
    f.textBaseline = "alphabetic";
    f.x = CANVAS_WIDTH / 2;
    f.y = 330;
    C.addChild(f);
    z = s_oSpriteLibrary.getSprite("logo_ctl");
    c = createBitmap(z);
    c.regX = z.width / 2;
    c.regY = z.height / 2;
    c.x = CANVAS_WIDTH / 2;
    c.y = CANVAS_HEIGHT / 2;
    C.addChild(c);
    p = new createjs.Text("www.codethislab.com", "30px " + FONT_GAME_1, "#000");
    p.textAlign = "center";
    p.textBaseline = "alphabetic";
    p.x = CANVAS_WIDTH / 2;
    p.y = 460;
    p.outline = 2;
    C.addChild(p);
    m = new createjs.Text("www.codethislab.com", "30px " + FONT_GAME_1, "#fff");
    m.textAlign = "center";
    m.textBaseline = "alphabetic";
    m.x = CANVAS_WIDTH / 2;
    m.y = 460;
    C.addChild(m);
    createjs.Tween.get(C).to(
      {
        alpha: 1,
      },
      600,
      createjs.Ease.cubicOut
    );
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };
  this.refreshButtonPos = function (z, w) {};
  this.unload = function () {
    r.off("click", this._onLogoButRelease);
    g.unload();
    g = null;
    s_oStage.removeChild(C);
  };
  this._onLogoButRelease = function () {
    window.open("http://www.codethislab.com/index.php?&l=en", "_blank");
  };
  this._init();
}

function CFiche(a, e, b, c, g, f) {
  var h, r, m, p, C, z, w, x;
  this._init = function (t, K, A, u, l) {
    x = new createjs.Container();
    x.x = t;
    x.y = K;
    f.addChild(x);
    t = s_oSpriteLibrary.getSprite("fiche_" + A);
    w = createBitmap(t);
    x.addChild(w);
    new CTLText(
      x,
      9,
      7,
      22,
      18,
      SIZE_FONT_FICHE[A],
      "center",
      COLOR_FICHE_PER_VALUE[A],
      FONT_GAME_1,
      1,
      0,
      0,
      u,
      !0,
      !0,
      !1,
      !1
    );
    l &&
      ((h = !1),
      (r = t.width),
      (m = t.height),
      (p = []),
      (C = []),
      x.on("mousedown", this.buttonDown),
      x.on("pressup", this.buttonRelease));
  };
  this.addEventListener = function (t, K, A) {
    p[t] = K;
    C[t] = A;
  };
  this.addEventListenerWithParams = function (t, K, A, u) {
    p[t] = K;
    C[t] = A;
    z = u;
  };
  this.enable = function () {
    h = !1;
    x.filters = [];
    x.cache(0, 0, r, m);
  };
  this.disable = function () {
    h = !0;
    var t = new createjs.ColorMatrix()
      .adjustSaturation(-100)
      .adjustBrightness(40);
    x.filters = [new createjs.ColorMatrixFilter(t)];
    x.cache(0, 0, r, m);
  };
  this.setScale = function (t) {
    x.scaleX = t;
    x.scaleY = t;
  };
  this.buttonRelease = function () {
    h ||
      (playSound("press_but", 1, !1),
      (x.scaleX = 1),
      (x.scaleY = 1),
      p[ON_MOUSE_UP] && p[ON_MOUSE_UP].call(C[ON_MOUSE_UP], z));
  };
  this.buttonDown = function () {
    h ||
      ((x.scaleX = 0.9),
      (x.scaleY = 0.9),
      p[ON_MOUSE_DOWN] && p[ON_MOUSE_DOWN].call(C[ON_MOUSE_DOWN], z));
  };
  this._init(a, e, b, c, g);
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
  setShadow: function (a, e, b, c) {
    null !== this._oText &&
      (this._oText.shadow = new createjs.Shadow(a, e, b, c));
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

function CTLText(a, e, b, c, g, f, h, r, m, p, C, z, w, x, t, K, A) {
  this._oContainer = a;
  this._x = e;
  this._y = b;
  this._iWidth = c;
  this._iHeight = g;
  this._bMultiline = K;
  this._iFontSize = f;
  this._szAlign = h;
  this._szColor = r;
  this._szFont = m;
  this._iPaddingH = C;
  this._iPaddingV = z;
  this._bVerticalAlign = t;
  this._bFitText = x;
  this._bDebug = A;
  this._oDebugShape = null;
  this._fLineHeightFactor = p;
  this._oText = null;
  w && this.__createText(w);
}

function extractHostname(a) {
  a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
  a = a.split(":")[0];
  return (a = a.split("?")[0]);
}

function extractRootDomain(a) {
  a = extractHostname(a);
  var e = a.split("."),
    b = e.length;
  2 < b && (a = e[b - 2] + "." + e[b - 1]);
  return a;
}
var getClosestTop = function () {
    var a = window,
      e = !1;
    try {
      for (; a.parent.document !== a.document; )
        if (a.parent.document) a = a.parent;
        else {
          e = !0;
          break;
        }
    } catch (b) {
      e = !0;
    }
    return {
      topFrame: a,
      err: e,
    };
  },
  getBestPageUrl = function (a) {
    var e = a.topFrame,
      b = "";
    if (a.err)
      try {
        try {
          b = window.top.location.href;
        } catch (g) {
          var c = window.location.ancestorOrigins;
          b = c[c.length - 1];
        }
      } catch (g) {
        b = e.document.referrer;
      }
    else b = e.location.href;
    return b;
  },
  TOPFRAMEOBJ = getClosestTop(),
  PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);

function seekAndDestroy() {
  for (
    var a = extractRootDomain(PAGE_URL),
      e = [
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
    b < e.length;
    b++
  )
    if (e[b] === a) return !0;
  return !1;
}
