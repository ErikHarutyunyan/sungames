(function () {
  var a =
      "undefined" !== typeof window && "undefined" !== typeof window.document
        ? window.document
        : {},
    e = "undefined" !== typeof module && module.exports,
    b = "undefined" !== typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
    c = (function () {
      for (
        var b,
          d = [
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
          c = 0,
          f = d.length,
          e = {};
        c < f;
        c++
      )
        if ((b = d[c]) && b[1] in a) {
          for (c = 0; c < b.length; c++) e[d[0][c]] = b[c];
          return e;
        }
      return !1;
    })(),
    l = {
      change: c.fullscreenchange,
      error: c.fullscreenerror,
    },
    g = {
      request: function (e) {
        var d = c.requestFullscreen;
        e = e || a.documentElement;
        if (/5\.1[.\d]* Safari/.test(navigator.userAgent)) e[d]();
        else e[d](b && Element.ALLOW_KEYBOARD_INPUT);
      },
      exit: function () {
        a[c.exitFullscreen]();
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
      on: function (b, d) {
        var c = l[b];
        c && a.addEventListener(c, d, !1);
      },
      off: function (b, c) {
        var d = l[b];
        d && a.removeEventListener(d, c, !1);
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
        enabled: {
          enumerable: !0,
          get: function () {
            return !!a[c.fullscreenEnabled];
          },
        },
      }),
      e ? (module.exports = g) : (window.screenfull = g))
    : e
    ? (module.exports = !1)
    : (window.screenfull = !1);
})();

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
(function () {
  function a(a) {
    a = String(a);
    return a.charAt(0).toUpperCase() + a.slice(1);
  }

  function e(a, b) {
    var d = -1,
      e = a ? a.length : 0;
    if ("number" == typeof e && -1 < e && e <= w)
      for (; ++d < e; ) b(a[d], d, a);
    else c(a, b);
  }

  function b(b) {
    b = String(b).replace(/^ +| +$/g, "");
    return /^(?:webOS|i(?:OS|P))/.test(b) ? b : a(b);
  }

  function c(a, b) {
    for (var d in a) z.call(a, d) && b(a[d], d, a);
  }

  function l(b) {
    return null == b ? a(b) : B.call(b).slice(8, -1);
  }

  function g(a, b) {
    var d = null != a ? typeof a[b] : "number";
    return (
      !/^(?:boolean|number|string|undefined)$/.test(d) &&
      ("object" == d ? !!a[b] : !0)
    );
  }

  function k(a) {
    return String(a).replace(/([ -])(?!$)/g, "$1?");
  }

  function d(a, b) {
    var d = null;
    e(a, function (c, e) {
      d = b(d, c, e, a);
    });
    return d;
  }

  function m(a) {
    function e(c) {
      return d(c, function (d, c) {
        var e = c.pattern || k(c);
        !d &&
          (d =
            RegExp("\\b" + e + " *\\d+[.\\w_]*", "i").exec(a) ||
            RegExp("\\b" + e + " *\\w+-[\\w]*", "i").exec(a) ||
            RegExp(
              "\\b" + e + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)",
              "i"
            ).exec(a)) &&
          ((d = String(
            c.label && !RegExp(e, "i").test(c.label) ? c.label : d
          ).split("/"))[1] &&
            !/[\d.]+/.test(d[0]) &&
            (d[0] += " " + d[1]),
          (c = c.label || c),
          (d = b(
            d[0]
              .replace(RegExp(e, "i"), c)
              .replace(RegExp("; *(?:" + c + "[_-])?", "i"), " ")
              .replace(RegExp("(" + c + ")[-_.]?(\\w)", "i"), "$1 $2")
          )));
        return d;
      });
    }

    function f(b) {
      return d(b, function (b, d) {
        return (
          b ||
          (RegExp(
            d + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)",
            "i"
          ).exec(a) || 0)[1] ||
          null
        );
      });
    }
    var n = t,
      p = a && "object" == typeof a && "String" != l(a);
    p && ((n = a), (a = null));
    var D = n.navigator || {},
      v = D.userAgent || "";
    a || (a = v);
    var I = p
        ? !!D.likeChrome
        : /\bChrome\b/.test(a) && !/internal|\n/i.test(B.toString()),
      w = p ? "Object" : "ScriptBridgingProxyObject",
      z = p ? "Object" : "Environment",
      H = p && n.java ? "JavaPackage" : l(n.java),
      Q = p ? "Object" : "RuntimeObject";
    z = (H = /\bJava/.test(H) && n.java) && l(n.environment) == z;
    var R = H ? "a" : "\u03b1",
      S = H ? "b" : "\u03b2",
      N = n.document || {},
      E = n.operamini || n.opera,
      K = r.test((K = p && E ? E["[[Class]]"] : l(E))) ? K : (E = null),
      h,
      L = a;
    p = [];
    var M = null,
      F = a == v;
    v = F && E && "function" == typeof E.version && E.version();
    var x = (function (b) {
        return d(b, function (b, d) {
          return (
            b ||
            (RegExp("\\b" + (d.pattern || k(d)) + "\\b", "i").exec(a) &&
              (d.label || d))
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
      q = (function (b) {
        return d(b, function (b, d) {
          return (
            b ||
            (RegExp("\\b" + (d.pattern || k(d)) + "\\b", "i").exec(a) &&
              (d.label || d))
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
      y = e([
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
      C = (function (b) {
        return d(b, function (b, d, c) {
          return (
            b ||
            ((d[y] ||
              d[/^[a-z]+(?: +[a-z]+\b)*/i.exec(y)] ||
              RegExp("\\b" + k(c) + "(?:\\b|\\w*\\d)", "i").exec(a)) &&
              c)
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
      u = (function (c) {
        return d(c, function (d, c) {
          var e = c.pattern || k(c);
          if (
            !d &&
            (d = RegExp("\\b" + e + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(a))
          ) {
            var f = d,
              l = c.label || c,
              m = {
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
            e &&
              l &&
              /^Win/i.test(f) &&
              !/^Windows Phone /i.test(f) &&
              (m = m[/[\d.]+$/.exec(f)]) &&
              (f = "Windows " + m);
            f = String(f);
            e && l && (f = f.replace(RegExp(e, "i"), l));
            d = f = b(
              f
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
    x && (x = [x]);
    C && !y && (y = e([C]));
    if ((h = /\bGoogle TV\b/.exec(y))) y = h[0];
    /\bSimulator\b/i.test(a) && (y = (y ? y + " " : "") + "Simulator");
    "Opera Mini" == q &&
      /\bOPiOS\b/.test(a) &&
      p.push("running in Turbo/Uncompressed mode");
    "IE" == q && /\blike iPhone OS\b/.test(a)
      ? ((h = m(a.replace(/like iPhone OS/, ""))),
        (C = h.manufacturer),
        (y = h.product))
      : /^iP/.test(y)
      ? (q || (q = "Safari"),
        (u =
          "iOS" +
          ((h = / OS ([\d_]+)/i.exec(a)) ? " " + h[1].replace(/_/g, ".") : "")))
      : "Konqueror" != q || /buntu/i.test(u)
      ? (C &&
          "Google" != C &&
          ((/Chrome/.test(q) && !/\bMobile Safari\b/i.test(a)) ||
            /\bVita\b/.test(y))) ||
        (/\bAndroid\b/.test(u) && /^Chrome/.test(q) && /\bVersion\//i.test(a))
        ? ((q = "Android Browser"), (u = /\bAndroid\b/.test(u) ? u : "Android"))
        : "Silk" == q
        ? (/\bMobi/i.test(a) || ((u = "Android"), p.unshift("desktop mode")),
          /Accelerated *= *true/i.test(a) && p.unshift("accelerated"))
        : "PaleMoon" == q && (h = /\bFirefox\/([\d.]+)\b/.exec(a))
        ? p.push("identifying as Firefox " + h[1])
        : "Firefox" == q && (h = /\b(Mobile|Tablet|TV)\b/i.exec(a))
        ? (u || (u = "Firefox OS"), y || (y = h[1]))
        : !q ||
          (h = !/\bMinefield\b/i.test(a) && /\b(?:Firefox|Safari)\b/.exec(q))
        ? (q &&
            !y &&
            /[\/,]|^[^(]+?\)/.test(a.slice(a.indexOf(h + "/") + 8)) &&
            (q = null),
          (h = y || C || u) &&
            (y || C || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(u)) &&
            (q =
              /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(u) ? u : h) +
              " Browser"))
        : "Electron" == q &&
          (h = (/\bChrome\/([\d.]+)\b/.exec(a) || 0)[1]) &&
          p.push("Chromium " + h)
      : (u = "Kubuntu");
    v ||
      (v = f([
        "(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))",
        "Version",
        k(q),
        "(?:Firefox|Minefield|NetFront)",
      ]));
    if (
      (h =
        ("iCab" == x && 3 < parseFloat(v) && "WebKit") ||
        (/\bOpera\b/.test(q) && (/\bOPR\b/.test(a) ? "Blink" : "Presto")) ||
        (/\b(?:Midori|Nook|Safari)\b/i.test(a) &&
          !/^(?:Trident|EdgeHTML)$/.test(x) &&
          "WebKit") ||
        (!x && /\bMSIE\b/i.test(a) && ("Mac OS" == u ? "Tasman" : "Trident")) ||
        ("WebKit" == x && /\bPlayStation\b(?! Vita\b)/i.test(q) && "NetFront"))
    )
      x = [h];
    "IE" == q && (h = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(a) || 0)[1])
      ? ((q += " Mobile"),
        (u = "Windows Phone " + (/\+$/.test(h) ? h : h + ".x")),
        p.unshift("desktop mode"))
      : /\bWPDesktop\b/i.test(a)
      ? ((q = "IE Mobile"),
        (u = "Windows Phone 8.x"),
        p.unshift("desktop mode"),
        v || (v = (/\brv:([\d.]+)/.exec(a) || 0)[1]))
      : "IE" != q &&
        "Trident" == x &&
        (h = /\brv:([\d.]+)/.exec(a)) &&
        (q && p.push("identifying as " + q + (v ? " " + v : "")),
        (q = "IE"),
        (v = h[1]));
    if (F) {
      if (g(n, "global"))
        if (
          (H &&
            ((h = H.lang.System),
            (L = h.getProperty("os.arch")),
            (u =
              u ||
              h.getProperty("os.name") + " " + h.getProperty("os.version"))),
          z)
        ) {
          try {
            (v = n.require("ringo/engine").version.join(".")), (q = "RingoJS");
          } catch (P) {
            (h = n.system) &&
              h.global.system == n.system &&
              ((q = "Narwhal"), u || (u = h[0].os || null));
          }
          q || (q = "Rhino");
        } else
          "object" == typeof n.process &&
            !n.process.browser &&
            (h = n.process) &&
            ("object" == typeof h.versions &&
              ("string" == typeof h.versions.electron
                ? (p.push("Node " + h.versions.node),
                  (q = "Electron"),
                  (v = h.versions.electron))
                : "string" == typeof h.versions.nw &&
                  (p.push("Chromium " + v, "Node " + h.versions.node),
                  (q = "NW.js"),
                  (v = h.versions.nw))),
            q ||
              ((q = "Node.js"),
              (L = h.arch),
              (u = h.platform),
              (v = (v = /[\d.]+/.exec(h.version)) ? v[0] : null)));
      else
        l((h = n.runtime)) == w
          ? ((q = "Adobe AIR"), (u = h.flash.system.Capabilities.os))
          : l((h = n.phantom)) == Q
          ? ((q = "PhantomJS"),
            (v =
              (h = h.version || null) &&
              h.major + "." + h.minor + "." + h.patch))
          : "number" == typeof N.documentMode &&
            (h = /\bTrident\/(\d+)/i.exec(a))
          ? ((v = [v, N.documentMode]),
            (h = +h[1] + 4) != v[1] &&
              (p.push("IE " + v[1] + " mode"), x && (x[1] = ""), (v[1] = h)),
            (v = "IE" == q ? String(v[1].toFixed(1)) : v[0]))
          : "number" == typeof N.documentMode &&
            /^(?:Chrome|Firefox)\b/.test(q) &&
            (p.push("masking as " + q + " " + v),
            (q = "IE"),
            (v = "11.0"),
            (x = ["Trident"]),
            (u = "Windows"));
      u = u && b(u);
    }
    v &&
      (h =
        /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(v) ||
        /(?:alpha|beta)(?: ?\d)?/i.exec(a + ";" + (F && D.appMinorVersion)) ||
        (/\bMinefield\b/i.test(a) && "a")) &&
      ((M = /b/i.test(h) ? "beta" : "alpha"),
      (v =
        v.replace(RegExp(h + "\\+?$"), "") +
        ("beta" == M ? S : R) +
        (/\d+\+?/.exec(h) || "")));
    if (
      "Fennec" == q ||
      ("Firefox" == q && /\b(?:Android|Firefox OS)\b/.test(u))
    )
      q = "Firefox Mobile";
    else if ("Maxthon" == q && v) v = v.replace(/\.[\d.]+/, ".x");
    else if (/\bXbox\b/i.test(y))
      "Xbox 360" == y && (u = null),
        "Xbox 360" == y && /\bIEMobile\b/.test(a) && p.unshift("mobile mode");
    else if (
      (!/^(?:Chrome|IE|Opera)$/.test(q) &&
        (!q || y || /Browser|Mobi/.test(q))) ||
      ("Windows CE" != u && !/Mobi/i.test(a))
    )
      if ("IE" == q && F)
        try {
          null === n.external && p.unshift("platform preview");
        } catch (P) {
          p.unshift("embedded");
        }
      else
        (/\bBlackBerry\b/.test(y) || /\bBB10\b/.test(a)) &&
        (h =
          (RegExp(y.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(a) ||
            0)[1] || v)
          ? ((h = [h, /BB10/.test(a)]),
            (u =
              (h[1] ? ((y = null), (C = "BlackBerry")) : "Device Software") +
              " " +
              h[0]),
            (v = null))
          : this != c &&
            "Wii" != y &&
            ((F && E) ||
              (/Opera/.test(q) && /\b(?:MSIE|Firefox)\b/i.test(a)) ||
              ("Firefox" == q && /\bOS X (?:\d+\.){2,}/.test(u)) ||
              ("IE" == q &&
                ((u && !/^Win/.test(u) && 5.5 < v) ||
                  (/\bWindows XP\b/.test(u) && 8 < v) ||
                  (8 == v && !/\bTrident\b/.test(a))))) &&
            !r.test((h = m.call(c, a.replace(r, "") + ";"))) &&
            h.name &&
            ((h = "ing as " + h.name + ((h = h.version) ? " " + h : "")),
            r.test(q)
              ? (/\bIE\b/.test(h) && "Mac OS" == u && (u = null),
                (h = "identify" + h))
              : ((h = "mask" + h),
                (q = K ? b(K.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera"),
                /\bIE\b/.test(h) && (u = null),
                F || (v = null)),
            (x = ["Presto"]),
            p.push(h));
    else q += " Mobile";
    if ((h = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(a) || 0)[1])) {
      h = [parseFloat(h.replace(/\.(\d)$/, ".0$1")), h];
      if ("Safari" == q && "+" == h[1].slice(-1))
        (q = "WebKit Nightly"), (M = "alpha"), (v = h[1].slice(0, -1));
      else if (
        v == h[1] ||
        v == (h[2] = (/\bSafari\/([\d.]+\+?)/i.exec(a) || 0)[1])
      )
        v = null;
      h[1] = (/\bChrome\/([\d.]+)/i.exec(a) || 0)[1];
      537.36 == h[0] &&
        537.36 == h[2] &&
        28 <= parseFloat(h[1]) &&
        "WebKit" == x &&
        (x = ["Blink"]);
      F && (I || h[1])
        ? (x && (x[1] = "like Chrome"),
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
              : "Blink" != x
              ? "27"
              : "28")))
        : (x && (x[1] = "like Safari"),
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
      x &&
        (x[1] +=
          " " + (h += "number" == typeof h ? ".x" : /[.+]/.test(h) ? "" : "+"));
      "Safari" == q && (!v || 45 < parseInt(v)) && (v = h);
    }
    "Opera" == q && (h = /\bzbov|zvav$/.exec(u))
      ? ((q += " "),
        p.unshift("desktop mode"),
        "zvav" == h ? ((q += "Mini"), (v = null)) : (q += "Mobile"),
        (u = u.replace(RegExp(" *" + h + "$"), "")))
      : "Safari" == q &&
        /\bChrome\b/.exec(x && x[1]) &&
        (p.unshift("desktop mode"),
        (q = "Chrome Mobile"),
        (v = null),
        /\bOS X\b/.test(u) ? ((C = "Apple"), (u = "iOS 4.3+")) : (u = null));
    v &&
      0 == v.indexOf((h = /[\d.]+$/.exec(u))) &&
      -1 < a.indexOf("/" + h + "-") &&
      (u = String(u.replace(h, "")).replace(/^ +| +$/g, ""));
    x &&
      !/\b(?:Avant|Nook)\b/.test(q) &&
      (/Browser|Lunascape|Maxthon/.test(q) ||
        ("Safari" != q && /^iOS/.test(u) && /\bSafari\b/.test(x[1])) ||
        (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
          q
        ) &&
          x[1])) &&
      (h = x[x.length - 1]) &&
      p.push(h);
    p.length && (p = ["(" + p.join("; ") + ")"]);
    C && y && 0 > y.indexOf(C) && p.push("on " + C);
    y && p.push((/^on /.test(p[p.length - 1]) ? "" : "on ") + y);
    if (u) {
      var O =
        (h = / ([\d.+]+)$/.exec(u)) &&
        "/" == u.charAt(u.length - h[0].length - 1);
      u = {
        architecture: 32,
        family: h && !O ? u.replace(h[0], "") : u,
        version: h ? h[1] : null,
        toString: function () {
          var a = this.version;
          return (
            this.family +
            (a && !O ? " " + a : "") +
            (64 == this.architecture ? " 64-bit" : "")
          );
        },
      };
    }
    (h = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(L)) && !/\bi686\b/i.test(L)
      ? (u &&
          ((u.architecture = 64),
          (u.family = u.family.replace(RegExp(" *" + h), ""))),
        q &&
          (/\bWOW64\b/i.test(a) ||
            (F &&
              /\w(?:86|32)$/.test(D.cpuClass || D.platform) &&
              !/\bWin64; x64\b/i.test(a))) &&
          p.unshift("32-bit"))
      : u &&
        /^OS X/.test(u.family) &&
        "Chrome" == q &&
        39 <= parseFloat(v) &&
        (u.architecture = 64);
    a || (a = null);
    n = {};
    n.description = a;
    n.layout = x && x[0];
    n.manufacturer = C;
    n.name = q;
    n.prerelease = M;
    n.product = y;
    n.ua = a;
    n.version = q && v;
    n.os = u || {
      architecture: null,
      family: null,
      version: null,
      toString: function () {
        return "null";
      },
    };
    n.parse = m;
    n.toString = function () {
      return this.description || "";
    };
    n.version && p.unshift(v);
    n.name && p.unshift(q);
    u &&
      q &&
      (u != String(u).split(" ")[0] || (u != q.split(" ")[0] && !y)) &&
      p.push(y ? "(" + u + ")" : "on " + u);
    p.length && (n.description = p.join(" "));
    return n;
  }
  var f = {
      function: !0,
      object: !0,
    },
    t = (f[typeof window] && window) || this,
    n = f[typeof exports] && exports;
  f = f[typeof module] && module && !module.nodeType && module;
  var p = n && f && "object" == typeof global && global;
  !p || (p.global !== p && p.window !== p && p.self !== p) || (t = p);
  var w = Math.pow(2, 53) - 1,
    r = /\bOpera/;
  p = Object.prototype;
  var z = p.hasOwnProperty,
    B = p.toString,
    D = m();
  "function" == typeof define && "object" == typeof define.amd && define.amd
    ? ((t.platform = D),
      define(function () {
        return D;
      }))
    : n && f
    ? c(D, function (a, b) {
        n[b] = a;
      })
    : (t.platform = D);
}).call(this);
var s_iScaleFactor = 1,
  s_bIsIphone = !1,
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
  var e = a.toLowerCase(),
    b = window.document,
    c = b.documentElement;
  if (void 0 === window["inner" + a]) a = c["client" + a];
  else if (window["inner" + a] != c["client" + a]) {
    var l = b.createElement("body");
    l.id = "vpw-test-b";
    l.style.cssText = "overflow:scroll";
    var g = b.createElement("div");
    g.id = "vpw-test-d";
    g.style.cssText = "position:absolute;top:-1000px";
    g.innerHTML =
      "<style>@media(" +
      e +
      ":" +
      c["client" + a] +
      "px){body#vpw-test-b div#vpw-test-d{" +
      e +
      ":7px!important}}</style>";
    l.appendChild(g);
    c.insertBefore(l, b.head);
    a = 7 == g["offset" + a] ? c["client" + a] : window["inner" + a];
    c.removeChild(l);
  } else a = window["inner" + a];
  return a;
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
  window.matchMedia("(orientation: portrait)").matches && sizeHandler();
  window.matchMedia("(orientation: landscape)").matches && sizeHandler();
}

function isChrome() {
  return (
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
  );
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

function sizeHandler() {
  window.scrollTo(0, 1);
  if ($("#canvas")) {
    var a =
      "safari" === platform.name.toLowerCase()
        ? getIOSWindowHeight()
        : getSize("Height");
    var e = getSize("Width");
    _checkOrientation(e, a);
    var b = Math.min(a / CANVAS_HEIGHT, e / CANVAS_WIDTH),
      c = CANVAS_WIDTH * b;
    b *= CANVAS_HEIGHT;
    if (b < a) {
      var l = a - b;
      b += l;
      c += (CANVAS_WIDTH / CANVAS_HEIGHT) * l;
    } else
      c < e &&
        ((l = e - c), (c += l), (b += (CANVAS_HEIGHT / CANVAS_WIDTH) * l));
    l = a / 2 - b / 2;
    var g = e / 2 - c / 2,
      k = CANVAS_WIDTH / c;
    if (g * k < -EDGEBOARD_X || l * k < -EDGEBOARD_Y)
      (b = Math.min(
        a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y),
        e / (CANVAS_WIDTH - 2 * EDGEBOARD_X)
      )),
        (c = CANVAS_WIDTH * b),
        (b *= CANVAS_HEIGHT),
        (l = (a - b) / 2),
        (g = (e - c) / 2),
        (k = CANVAS_WIDTH / c);
    s_iOffsetX = -1 * g * k;
    s_iOffsetY = -1 * l * k;
    0 <= l && (s_iOffsetY = 0);
    0 <= g && (s_iOffsetX = 0);
    null !== s_oInterface &&
      s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    s_bIsIphone
      ? ((canvas = document.getElementById("canvas")),
        (s_oStage.canvas.width = 2 * c),
        (s_oStage.canvas.height = 2 * b),
        (canvas.style.width = c + "px"),
        (canvas.style.height = b + "px"),
        (s_oStage.scaleX = s_oStage.scaleY =
          2 * Math.min(c / CANVAS_WIDTH, b / CANVAS_HEIGHT)))
      : s_bMobile || isChrome()
      ? ($("#canvas").css("width", c + "px"),
        $("#canvas").css("height", b + "px"))
      : ((s_oStage.canvas.width = c),
        (s_oStage.canvas.height = b),
        (s_iScaleFactor = Math.min(c / CANVAS_WIDTH, b / CANVAS_HEIGHT)),
        (s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor));
    0 > l || (l = (a - b) / 2);
    $("#canvas").css("top", l + "px");
    $("#canvas").css("left", g + "px");
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

function createBitmap(a, e, b) {
  var c = new createjs.Bitmap(a),
    l = new createjs.Shape();
  e && b
    ? l.graphics.beginFill("#fff").drawRect(0, 0, e, b)
    : l.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
  c.hitArea = l;
  return c;
}

function createSprite(a, e, b, c, l, g) {
  a = null !== e ? new createjs.Sprite(a, e) : new createjs.Sprite(a);
  e = new createjs.Shape();
  e.graphics.beginFill("#000000").drawRect(-b, -c, l, g);
  a.hitArea = e;
  return a;
}

function randomFloatBetween(a, e, b) {
  "undefined" === typeof b && (b = 2);
  return parseFloat(Math.min(a + Math.random() * (e - a), e).toFixed(b));
}

function rotateVector2D(a, e) {
  var b = e.getX() * Math.cos(a) + e.getY() * Math.sin(a),
    c = e.getX() * -Math.sin(a) + e.getY() * Math.cos(a);
  e.set(b, c);
}

function tweenVectorsOnX(a, e, b) {
  return a + b * (e - a);
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

function bubbleSort(a) {
  do {
    var e = !1;
    for (var b = 0; b < a.length - 1; b++)
      a[b] > a[b + 1] &&
        ((e = a[b]), (a[b] = a[b + 1]), (a[b + 1] = e), (e = !0));
  } while (e);
}

function compare(a, e) {
  return a.index > e.index ? -1 : a.index < e.index ? 1 : 0;
}

function easeLinear(a, e, b, c) {
  return (b * a) / c + e;
}

function easeInQuad(a, e, b, c) {
  return b * (a /= c) * a + e;
}

function easeInSine(a, e, b, c) {
  return -b * Math.cos((a / c) * (Math.PI / 2)) + b + e;
}

function easeInCubic(a, e, b, c) {
  return b * (a /= c) * a * a + e;
}

function getTrajectoryPoint(a, e) {
  var b = new createjs.Point(),
    c = (1 - a) * (1 - a),
    l = a * a;
  b.x = c * e.start.x + 2 * (1 - a) * a * e.traj.x + l * e.end.x;
  b.y = c * e.start.y + 2 * (1 - a) * a * e.traj.y + l * e.end.y;
  return b;
}

function formatTime(a) {
  a /= 1e3;
  var e = Math.floor(a / 60);
  a = parseFloat(a - 60 * e).toFixed(1);
  var b = "";
  b = 10 > e ? b + ("0" + e + ":") : b + (e + ":");
  return 10 > a ? b + ("0" + a) : b + a;
}

function degreesToRadians(a) {
  return (a * Math.PI) / 180;
}

function checkRectCollision(a, e) {
  var b = getBounds(a, 0.9);
  var c = getBounds(e, 0.98);
  return calculateIntersection(b, c);
}

function calculateIntersection(a, e) {
  var b, c, l, g;
  var k = a.x + (b = a.width / 2);
  var d = a.y + (c = a.height / 2);
  var m = e.x + (l = e.width / 2);
  var f = e.y + (g = e.height / 2);
  k = Math.abs(k - m) - (b + l);
  d = Math.abs(d - f) - (c + g);
  return 0 > k && 0 > d
    ? ((k = Math.min(Math.min(a.width, e.width), -k)),
      (d = Math.min(Math.min(a.height, e.height), -d)),
      {
        x: Math.max(a.x, e.x),
        y: Math.max(a.y, e.y),
        width: k,
        height: d,
        rect1: a,
        rect2: e,
      })
    : null;
}

function getBounds(a, e) {
  var b = {
    x: Infinity,
    y: Infinity,
    width: 0,
    height: 0,
  };
  if (a instanceof createjs.Container) {
    b.x2 = -Infinity;
    b.y2 = -Infinity;
    var c = a.children,
      l = c.length,
      g;
    for (g = 0; g < l; g++) {
      var k = getBounds(c[g], 1);
      k.x < b.x && (b.x = k.x);
      k.y < b.y && (b.y = k.y);
      k.x + k.width > b.x2 && (b.x2 = k.x + k.width);
      k.y + k.height > b.y2 && (b.y2 = k.y + k.height);
    }
    Infinity == b.x && (b.x = 0);
    Infinity == b.y && (b.y = 0);
    Infinity == b.x2 && (b.x2 = 0);
    Infinity == b.y2 && (b.y2 = 0);
    b.width = b.x2 - b.x;
    b.height = b.y2 - b.y;
    delete b.x2;
    delete b.y2;
  } else {
    if (a instanceof createjs.Bitmap) {
      l = a.sourceRect || a.image;
      g = l.width * e;
      var d = l.height * e;
    } else if (a instanceof createjs.Sprite)
      if (
        a.spriteSheet._frames &&
        a.spriteSheet._frames[a.currentFrame] &&
        a.spriteSheet._frames[a.currentFrame].image
      ) {
        l = a.spriteSheet.getFrame(a.currentFrame);
        g = l.rect.width;
        d = l.rect.height;
        c = l.regX;
        var m = l.regY;
      } else (b.x = a.x || 0), (b.y = a.y || 0);
    else (b.x = a.x || 0), (b.y = a.y || 0);
    c = c || 0;
    g = g || 0;
    m = m || 0;
    d = d || 0;
    b.regX = c;
    b.regY = m;
    l = a.localToGlobal(0 - c, 0 - m);
    k = a.localToGlobal(g - c, d - m);
    g = a.localToGlobal(g - c, 0 - m);
    c = a.localToGlobal(0 - c, d - m);
    b.x = Math.min(Math.min(Math.min(l.x, k.x), g.x), c.x);
    b.y = Math.min(Math.min(Math.min(l.y, k.y), g.y), c.y);
    b.width = Math.max(Math.max(Math.max(l.x, k.x), g.x), c.x) - b.x;
    b.height = Math.max(Math.max(Math.max(l.y, k.y), g.y), c.y) - b.y;
  }
  return b;
}

function NoClickDelay(a) {
  this.element = a;
  window.Touch && this.element.addEventListener("touchstart", this, !1);
}

function shuffle(a) {
  for (var e = a.length, b, c; 0 < e; )
    (c = Math.floor(Math.random() * e)),
      e--,
      (b = a[e]),
      (a[e] = a[c]),
      (a[c] = b);
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
      var e = document.createEvent("MouseEvents");
      e.initEvent("click", !0, !0);
      a.dispatchEvent(e);
    }
  },
};
(function () {
  function a(a) {
    var b = {
      focus: "visible",
      focusin: "visible",
      pageshow: "visible",
      blur: "hidden",
      focusout: "hidden",
      pagehide: "hidden",
    };
    a = a || window.event;
    a.type in b
      ? (document.body.className = b[a.type])
      : ((document.body.className = this[e] ? "hidden" : "visible"),
        "hidden" === document.body.className
          ? s_oMain.stopUpdate()
          : s_oMain.startUpdate());
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
    e,
    b,
    c,
    l,
    g,
    k;
  this.init = function (a, m, f) {
    e = {};
    c = b = 0;
    l = a;
    g = m;
    k = f;
  };
  this.addSprite = function (d, c) {
    if (!a.hasOwnProperty(d)) {
      var f = new Image();
      a[d] = e[d] = {
        szPath: c,
        oSprite: f,
        bLoaded: !1,
      };
      b++;
    }
  };
  this.getSprite = function (b) {
    return a.hasOwnProperty(b) ? a[b].oSprite : null;
  };
  this._onSpritesLoaded = function () {
    b = 0;
    g.call(k);
  };
  this._onSpriteLoaded = function () {
    l.call(k);
    ++c === b && this._onSpritesLoaded();
  };
  this.loadSprites = function () {
    for (var a in e)
      (e[a].oSprite.oSpriteLibrary = this),
        (e[a].oSprite.szKey = a),
        (e[a].oSprite.onload = function () {
          this.oSpriteLibrary.setLoaded(this.szKey);
          this.oSpriteLibrary._onSpriteLoaded(this.szKey);
        }),
        (e[a].oSprite.onerror = function (a) {
          var b = a.currentTarget;
          setTimeout(function () {
            e[b.szKey].oSprite.src = e[b.szKey].szPath;
          }, 500);
        }),
        (e[a].oSprite.src = e[a].szPath);
  };
  this.setLoaded = function (b) {
    a[b].bLoaded = !0;
  };
  this.isLoaded = function (b) {
    return a[b].bLoaded;
  };
  this.getNumSprites = function () {
    return b;
  };
}
var CANVAS_WIDTH = 1920,
  CANVAS_HEIGHT = 1080,
  EDGEBOARD_X = 256,
  EDGEBOARD_Y = 84,
  FPS_TIME = 1e3 / 24,
  DISABLE_SOUND_MOBILE = !1,
  STATE_LOADING = 0,
  STATE_MENU = 1,
  STATE_HELP = 1,
  STATE_GAME = 3,
  PRIMARY_FONT = "arialbold",
  ON_MOUSE_DOWN = 0,
  ON_MOUSE_UP = 1,
  ON_MOUSE_OVER = 2,
  ON_MOUSE_OUT = 3,
  ON_DRAG_START = 4,
  ON_DRAG_END = 5,
  TIME_ANIM_IDLE,
  ANIM_IDLE1_TIMESPEED,
  ANIM_IDLE2_TIMESPEED,
  ANIM_IDLE3_TIMESPEED,
  ANIM_SPIN_TIMESPEED,
  TIME_ANIM_WIN,
  ANIM_WIN1_TIMESPEED,
  ANIM_WIN2_TIMESPEED,
  TIME_ANIM_LOSE,
  STATE_IDLE = 0,
  STATE_SPIN = 1,
  STATE_WIN = 2,
  STATE_LOSE = 3,
  LED_SPIN = 3,
  MIN_FAKE_SPIN = 3,
  WHEEL_SPIN_TIMESPEED = 2600,
  START_CREDIT,
  START_BET,
  BET_OFFSET,
  MAX_BET,
  WHEEL_SETTINGS,
  AD_SHOW_COUNTER = [],
  BANK_CASH,
  WIN_OCCURRENCE,
  ENABLE_FULLSCREEN,
  ENABLE_CHECK_ORIENTATION,
  SHOW_CREDITS,
  SEGMENT_ROT = 18;
TEXT_GAMEOVER = "I'M SORRY, NO MORE CREDITS TO PLAY";
TEXT_PLAY = "PLAY";
TEXT_CREDITS = "CREDITS";
TEXT_SPIN = "SPIN";
TEXT_PLUS = "+";
TEXT_MIN = "-";
TEXT_CURRENCY = "$";
TEXT_HELP1 =
  'CLICK ON "+" or "-" BUTTONS TO SELECT YOUR BET. PRIZE WILL VARY ACCORDING TO THE WAGER. THE MORE YOU BET, THE MORE YOU CAN WIN. WHEN YOU ARE READY, SPIN THE WHEEL TO PLAY!';
TEXT_HELP2 = "WHEN THE WHEEL STOPS SPINNING, YOU'LL BE SHOWN YOUR PRIZE!";
TEXT_ALERT =
  "wheel_settings PROBABILITY CHECK FAILED: win_occurence number sum must be 100! Please read paragraph in the documentation for more help.";
var TEXT_CREDITS_DEVELOPED = "DEVELOPED BY",
  TEXT_PRELOADER_CONTINUE = "START";
TEXT_SHARE_IMAGE = "200x200.jpg";
TEXT_SHARE_TITLE = "Congratulations!";
TEXT_SHARE_MSG1 = "You collected <strong>";
TEXT_SHARE_MSG2 =
  " points</strong>!<br><br>Share your score with your friends!";
TEXT_SHARE_SHARE1 = "My score is ";
TEXT_SHARE_SHARE2 = " points! Can you do better?";

function CPreloader() {
  var a, e, b, c, l, g, k, d, m, f;
  this._init = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
    s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
    s_oSpriteLibrary.addSprite("but_start", "./sprites/but_start.png");
    s_oSpriteLibrary.loadSprites();
    f = new createjs.Container();
    s_oStage.addChild(f);
  };
  this.unload = function () {
    m.unload();
    f.removeAllChildren();
  };
  this._onImagesLoaded = function () {};
  this._onAllImagesLoaded = function () {
    this.attachSprites();
    s_oMain.preloaderReady();
  };
  this.attachSprites = function () {
    var t = new createjs.Shape();
    t.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    f.addChild(t);
    t = s_oSpriteLibrary.getSprite("200x200");
    k = createBitmap(t);
    k.regX = 0.5 * t.width;
    k.regY = 0.5 * t.height;
    k.x = CANVAS_WIDTH / 2;
    k.y = CANVAS_HEIGHT / 2 - 80;
    f.addChild(k);
    d = new createjs.Shape();
    d.graphics
      .beginFill("rgba(0,0,0,0.01)")
      .drawRoundRect(k.x - 100, k.y - 100, 200, 200, 10);
    f.addChild(d);
    k.mask = d;
    t = s_oSpriteLibrary.getSprite("progress_bar");
    c = createBitmap(t);
    c.x = CANVAS_WIDTH / 2 - t.width / 2;
    c.y = CANVAS_HEIGHT / 2 + 70;
    f.addChild(c);
    a = t.width;
    e = t.height;
    l = new createjs.Shape();
    l.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(c.x, c.y, 1, e);
    f.addChild(l);
    c.mask = l;
    b = new createjs.Text("", "30px " + PRIMARY_FONT, "#fff");
    b.x = CANVAS_WIDTH / 2;
    b.y = CANVAS_HEIGHT / 2 + 120;
    b.textBaseline = "alphabetic";
    b.textAlign = "center";
    f.addChild(b);
    t = s_oSpriteLibrary.getSprite("but_start");
    m = new CTextButton(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2 + 100,
      t,
      TEXT_PRELOADER_CONTINUE,
      "Arial",
      "#000",
      36,
      !0,
      f
    );
    m.addEventListener(ON_MOUSE_UP, this._onButStartRelease, this);
    m.setVisible(!1);
    g = new createjs.Shape();
    g.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    f.addChild(g);
    createjs.Tween.get(g)
      .to(
        {
          alpha: 0,
        },
        500
      )
      .call(function () {
        createjs.Tween.removeTweens(g);
        f.removeChild(g);
      });
  };
  this._onButStartRelease = function () {
    s_oMain._onRemovePreloader();
  };
  this.refreshLoader = function (d) {
    b.text = d + "%";
    100 === d &&
      (s_oMain._onRemovePreloader(), (b.visible = !1), (c.visible = !1));
    l.graphics.clear();
    d = Math.floor((d * a) / 100);
    l.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(c.x, c.y, d, e);
  };
  this._init();
}

function CMain(a) {
  var e,
    b = 0,
    c = 0,
    l = STATE_LOADING,
    g,
    k;
  this.initContainer = function () {
    s_oCanvas = document.getElementById("canvas");
    s_oStage = new createjs.Stage(s_oCanvas);
    createjs.Touch.enable(s_oStage);
    s_bMobile = jQuery.browser.mobile;
    !1 === s_bMobile &&
      (s_oStage.enableMouseOver(20),
      $("body").on("contextmenu", "#canvas", function (a) {
        return !1;
      }));
    s_iPrevTime = new Date().getTime();
    createjs.Ticker.addEventListener("tick", this._update);
    createjs.Ticker.framerate = 30;
    navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
    s_oSpriteLibrary = new CSpriteLibrary();
    g = new CPreloader();
  };
  this.preloaderReady = function () {
    this._loadImages();
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || this._initSounds();
    e = !0;
  };
  this.soundLoaded = function () {
    b++;
    g.refreshLoader(Math.floor((b / c) * 100));
  };
  this._initSounds = function () {
    Howler.mute(!s_bAudioActive);
    s_aSoundsInfo = [];
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "game_over",
      loop: !1,
      volume: 1,
      ingamename: "game_over",
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
      filename: "reel",
      loop: !0,
      volume: 1,
      ingamename: "reel",
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
      filename: "win",
      loop: !1,
      volume: 1,
      ingamename: "win",
    });
    c += s_aSoundsInfo.length;
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
            for (var d = 0; d < s_aSoundsInfo.length; d++)
              if (a === s_aSounds[s_aSoundsInfo[d].ingamename]._sounds[0]._id) {
                s_oMain.tryToLoadSound(s_aSoundsInfo[d], !0);
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
    s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
    s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
    s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
    s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.png");
    s_oSpriteLibrary.addSprite("bg_help", "./sprites/bg_help.png");
    s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
    s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
    s_oSpriteLibrary.addSprite("but_spin", "./sprites/but_spin.png");
    s_oSpriteLibrary.addSprite("but_plus", "./sprites/but_plus.png");
    s_oSpriteLibrary.addSprite("wheel", "./sprites/wheel.png");
    s_oSpriteLibrary.addSprite("leds", "./sprites/leds.png");
    s_oSpriteLibrary.addSprite(
      "but_fullscreen",
      "./sprites/but_fullscreen.png"
    );
    s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
    s_oSpriteLibrary.addSprite("logo_credits", "./sprites/logo_credits.png");
    c += s_oSpriteLibrary.getNumSprites();
    s_oSpriteLibrary.loadSprites();
  };
  this._onImagesLoaded = function () {
    b++;
    g.refreshLoader(Math.floor((b / c) * 100));
  };
  this._onAllImagesLoaded = function () {};
  this._onRemovePreloader = function () {
    g.unload();
    s_oMain.gotoMenu();
  };
  this.gotoMenu = function () {
    new CMenu();
    l = STATE_MENU;
  };
  this.gotoGame = function (a) {
    s_bEasyMode = a;
    k = new CGame(d);
    l = STATE_GAME;
    $(s_oMain).trigger("game_start");
  };
  this.gotoHelp = function () {
    new CHelp();
    l = STATE_HELP;
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
  this._update = function (a) {
    if (!1 !== e) {
      var b = new Date().getTime();
      s_iTimeElaps = b - s_iPrevTime;
      s_iCntTime += s_iTimeElaps;
      s_iCntFps++;
      s_iPrevTime = b;
      1e3 <= s_iCntTime &&
        ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0));
      l === STATE_GAME && k.update();
      s_oStage.update(a);
    }
  };
  s_oMain = this;
  var d = a;
  ENABLE_CHECK_ORIENTATION = a.check_orientation;
  ENABLE_FULLSCREEN = a.fullscreen;
  SHOW_CREDITS = a.show_credits;
  s_bAudioActive = a.audio_enable_on_startup;
  this.initContainer();
}
var s_bMobile,
  s_bEasyMode,
  s_bAudioActive = !1,
  s_iCntTime = 0,
  s_iTimeElaps = 0,
  s_iPrevTime = 0,
  s_iCntFps = 0,
  s_iCurFps = 0,
  s_oDrawLayer,
  s_oStage,
  s_oMain,
  s_oSpriteLibrary,
  s_oCanvas,
  s_bFullscreen = !1,
  s_aSounds,
  s_aSoundsInfo;

function CTextButton(a, e, b, c, l, g, k, d, m) {
  var f, t, n, p, w, r, z;
  this._init = function (a, b, d, c, e, l, g, m, k) {
    f = !1;
    t = [];
    n = [];
    r = new createjs.Container();
    r.x = a;
    r.y = b;
    r.cursor = "pointer";
    k.addChild(r);
    m
      ? ((z = createBitmap(d)), r.addChild(z), (r.regX = d.width / 2))
      : ((a = new createjs.SpriteSheet({
          images: [d],
          frames: {
            width: d.width / 2,
            height: d.height,
          },
          animations: {
            state_true: [0],
            state_false: [1],
          },
        })),
        (z = createSprite(a, "state_false", 0, 0, d.width / 2, d.height)),
        r.addChild(z),
        new CTLText(
          r,
          20,
          20,
          d.width / 2 - 40,
          d.height - 40,
          g,
          "center",
          l,
          e,
          1,
          10,
          10,
          c,
          !0,
          !0,
          !1,
          !1
        ),
        (r.regX = d.width / 4));
    r.regY = d.height / 2;
    this._initListener();
  };
  this.unload = function () {
    r.off("mousedown", p);
    r.off("pressup", w);
    m.removeChild(r);
  };
  this.setVisible = function (a) {
    r.visible = a;
  };
  this._initListener = function () {
    p = r.on("mousedown", this.buttonDown);
    w = r.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (a, b, d) {
    t[a] = b;
    n[a] = d;
  };
  this.buttonRelease = function () {
    f ||
      ((r.scaleX = 1),
      (r.scaleY = 1),
      playSound("click", 1, !1),
      t[ON_MOUSE_UP] && t[ON_MOUSE_UP].call(n[ON_MOUSE_UP]));
  };
  this.buttonDown = function () {
    f ||
      ((r.scaleX = 0.9),
      (r.scaleY = 0.9),
      t[ON_MOUSE_DOWN] && t[ON_MOUSE_DOWN].call(n[ON_MOUSE_DOWN]));
  };
  this.enable = function () {
    f = !1;
    d || z.gotoAndStop("state_true");
  };
  this.disable = function () {
    f = !0;
    d || z.gotoAndStop("state_false");
  };
  this.setPosition = function (a, b) {
    r.x = a;
    r.y = b;
  };
  this.setX = function (a) {
    r.x = a;
  };
  this.setY = function (a) {
    r.y = a;
  };
  this.getButtonImage = function () {
    return r;
  };
  this.getX = function () {
    return r.x;
  };
  this.getY = function () {
    return r.y;
  };
  this._init(a, e, b, c, l, g, k, d, m);
  return this;
}

function CToggle(a, e, b, c, l) {
  var g, k, d, m, f, t;
  this._init = function (a, b, c, e) {
    k = [];
    d = [];
    var f = new createjs.SpriteSheet({
      images: [c],
      frames: {
        width: c.width / 2,
        height: c.height,
        regX: c.width / 2 / 2,
        regY: c.height / 2,
      },
      animations: {
        state_true: [0],
        state_false: [1],
      },
    });
    g = e;
    t = createSprite(
      f,
      "state_" + g,
      c.width / 2 / 2,
      c.height / 2,
      c.width / 2,
      c.height
    );
    t.x = a;
    t.y = b;
    t.stop();
    t.cursor = "pointer";
    n.addChild(t);
    this._initListener();
  };
  this.unload = function () {
    t.off("mousedown", m);
    t.off("pressup", f);
    n.removeChild(t);
  };
  this._initListener = function () {
    m = t.on("mousedown", this.buttonDown);
    f = t.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (a, b, c) {
    k[a] = b;
    d[a] = c;
  };
  this.setActive = function (a) {
    g = a;
    t.gotoAndStop("state_" + g);
  };
  this.buttonRelease = function () {
    t.scaleX = 1;
    t.scaleY = 1;
    playSound("click", 1, !1);
    g = !g;
    t.gotoAndStop("state_" + g);
    k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(d[ON_MOUSE_UP], g);
  };
  this.buttonDown = function () {
    t.scaleX = 0.9;
    t.scaleY = 0.9;
    k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(d[ON_MOUSE_DOWN]);
  };
  this.setPosition = function (a, b) {
    t.x = a;
    t.y = b;
  };
  var n = l;
  this._init(a, e, b, c);
}

function CGfxButton(a, e, b) {
  var c, l, g, k, d;
  this._init = function (a, b, e) {
    c = [];
    l = [];
    d = createBitmap(e);
    d.x = a;
    d.y = b;
    d.regX = e.width / 2;
    d.regY = e.height / 2;
    d.cursor = "pointer";
    s_oStage.addChild(d);
    this._initListener();
  };
  this.unload = function () {
    d.off("mousedown", g);
    d.off("pressup", k);
    s_oStage.removeChild(d);
  };
  this.setVisible = function (a) {
    d.visible = a;
  };
  this._initListener = function () {
    g = d.on("mousedown", this.buttonDown);
    k = d.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (a, b, d) {
    c[a] = b;
    l[a] = d;
  };
  this.buttonRelease = function () {
    d.scaleX = 1;
    d.scaleY = 1;
    playSound("click", 1, !1);
    c[ON_MOUSE_UP] && c[ON_MOUSE_UP].call(l[ON_MOUSE_UP]);
  };
  this.buttonDown = function () {
    d.scaleX = 0.9;
    d.scaleY = 0.9;
    c[ON_MOUSE_DOWN] && c[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN]);
  };
  this.setPosition = function (a, b) {
    d.x = a;
    d.y = b;
  };
  this.setX = function (a) {
    d.x = a;
  };
  this.setY = function (a) {
    d.y = a;
  };
  this.getButtonImage = function () {
    return d;
  };
  this.getX = function () {
    return d.x;
  };
  this.getY = function () {
    return d.y;
  };
  this._init(a, e, b);
  return this;
}

function CMenu() {
  var a,
    e,
    b,
    c,
    l,
    g,
    k = null,
    d = null,
    m,
    f,
    t,
    n,
    p,
    w;
  this._init = function () {
    f = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
    s_oStage.addChild(f);
    var r = s_oSpriteLibrary.getSprite("but_play");
    t = new CTextButton(
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT - 190,
      r,
      TEXT_PLAY,
      PRIMARY_FONT,
      "#ffffff",
      70,
      !1,
      s_oStage
    );
    t.enable();
    t.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
    r = s_oSpriteLibrary.getSprite("but_credits");
    SHOW_CREDITS
      ? ((a = CANVAS_WIDTH - r.height / 2 - 10),
        (e = r.height / 2 + 10),
        (w = new CGfxButton(a, e, r, s_oStage)),
        w.addEventListener(ON_MOUSE_UP, this._onCredits, this),
        (r = s_oSpriteLibrary.getSprite("audio_icon")),
        (l = a - r.width / 2 - 10))
      : ((r = s_oSpriteLibrary.getSprite("audio_icon")),
        (l = CANVAS_WIDTH - r.height / 2 - 10));
    g = r.height / 2 + 10;
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
      (p = new CToggle(l, g, r, s_bAudioActive, s_oStage)),
        p.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
    r = window.document;
    var z = r.documentElement;
    k =
      z.requestFullscreen ||
      z.mozRequestFullScreen ||
      z.webkitRequestFullScreen ||
      z.msRequestFullscreen;
    d =
      r.exitFullscreen ||
      r.mozCancelFullScreen ||
      r.webkitExitFullscreen ||
      r.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (k = !1);
    k &&
      screenfull.enabled &&
      ((r = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (b = r.width / 4 + 10),
      (c = r.height / 2 + 10),
      (m = new CToggle(b, c, r, s_bFullscreen, s_oStage)),
      m.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    n = new createjs.Shape();
    n.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    s_oStage.addChild(n);
    createjs.Tween.get(n)
      .to(
        {
          alpha: 0,
        },
        1e3
      )
      .call(function () {
        n.visible = !1;
      });
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };
  this.unload = function () {
    t.unload();
    t = null;
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) p.unload(), (p = null);
    SHOW_CREDITS && (w.unload(), (w = null));
    k && screenfull.enabled && m.unload();
    s_oStage.removeChild(f);
    s_oMenu = f = null;
  };
  this.refreshButtonPos = function (d, f) {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      p.setPosition(l - d, f + g);
    SHOW_CREDITS && w.setPosition(a - d, f + e);
    k && screenfull.enabled && m.setPosition(b + d, c + f);
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this.resetFullscreenBut = function () {
    m.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? d.call(window.document)
      : k.call(window.document.documentElement);
    sizeHandler();
  };
  this._onButPlayRelease = function () {
    this.unload();
    $(s_oMain).trigger("start_session");
    s_oMain.gotoGame();
  };
  this._onCredits = function () {
    new CCreditsPanel();
  };
  s_oMenu = this;
  this._init();
}
var s_oMenu = null;

function CGame(a) {
  var e,
    b,
    c,
    l,
    g,
    k,
    d,
    m,
    f,
    t,
    n,
    p,
    w,
    r = null,
    z,
    B;
  this._init = function () {
    k = 1;
    c = b = 0;
    d = START_BET;
    m = START_CREDIT;
    f = -1;
    g = STATE_IDLE;
    t = 0;
    n = BANK_CASH;
    p = [];
    for (var a = 0, r = 0; r < WHEEL_SETTINGS.length; r++)
      a += WHEEL_SETTINGS[r].win_occurence;
    100 !== a
      ? ((a = createBitmap(s_oSpriteLibrary.getSprite("msg_box"))),
        s_oStage.addChild(a),
        (a = new createjs.Text(TEXT_ALERT, "50px " + PRIMARY_FONT, "#ffffff")),
        (a.x = CANVAS_WIDTH / 2),
        (a.y = CANVAS_HEIGHT / 2 - 200),
        (a.textAlign = "center"),
        (a.textBaseline = "middle"),
        (a.lineWidth = 900),
        s_oStage.addChild(a))
      : ((e = !0),
        (z = new CWheel(1198, 540)),
        (a = createBitmap(s_oSpriteLibrary.getSprite("bg_game"))),
        s_oStage.addChild(a),
        (B = new CLeds(1198, 540)),
        (l = B.getState()),
        (w = new CInterface()),
        new CHelpPanel(),
        this._initProbability(),
        m < START_BET && this.gameOver());
  };
  this._initProbability = function () {
    for (var a = [], b = 0; b < WHEEL_SETTINGS.length; b++)
      a[b] = WHEEL_SETTINGS[b].win_occurence;
    for (b = 0; b < a.length; b++) for (var d = 0; d < a[b]; d++) p.push(b);
  };
  this.modifyBonus = function (a) {
    d = "plus" === a ? d + BET_OFFSET : d - BET_OFFSET;
    d = parseFloat(d.toFixed(2));
    if (d > MAX_BET) (d -= BET_OFFSET), (k = 1);
    else if (d < START_BET) (d += BET_OFFSET), (k = 1);
    else if (d > m) {
      d -= BET_OFFSET;
      return;
    }
    k = d / START_BET;
    k = k.toFixed(2);
    w.refreshBet(d);
    z.clearText();
    z.setText(k);
  };
  this.tryShowAd = function () {
    t++;
    t === AD_SHOW_COUNTER &&
      ((t = 0), $(s_oMain).trigger("show_interlevel_ad"));
  };
  this.spinWheel = function () {
    w.disableSpin(!0);
    g = STATE_SPIN;
    c = 0;
    this.setNewRound();
    w.refreshMoney(0);
    m -= d;
    n += d;
    m = parseFloat(m.toFixed(2));
    n = parseFloat(n.toFixed(2));
    w.refreshCredit(m);
    for (var a, b = [], e = 0; e < p.length; e++)
      (a = WHEEL_SETTINGS[p[e]].prize * k),
        a <= n &&
          b.push({
            prize: a,
            index: e,
          });
    b = b[Math.floor(Math.random() * b.length)].index;
    f = p[b];
    a = MIN_FAKE_SPIN + Math.floor(3 * Math.random());
    e = SEGMENT_ROT - 3;
    e = -e / 2 + Math.random() * e;
    b = (360 - z.getDegree() + p[b] * SEGMENT_ROT + e) % 360;
    b = 360 * a + b;
    z.clearText();
    z.setText(k);
    z.spin(b, a);
    $(s_oMain).trigger("bet_placed", d);
  };
  this.setNewRound = function () {
    0 > f || (w.refreshCredit(m), w.clearMoneyPanel(), (f = -1));
  };
  this.releaseWheel = function () {
    this.tryShowAd();
    w.disableSpin(!1);
    w.refreshMoney(WHEEL_SETTINGS[f].prize * k);
    m += WHEEL_SETTINGS[f].prize * k;
    n -= WHEEL_SETTINGS[f].prize * k;
    $(s_oMain).trigger("save_score", [m]);
    w.refreshCredit(m);
    w.animWin();
    m < START_BET && this.gameOver();
    k > m / START_BET &&
      ((k = Math.floor(m / START_BET)), (d = k * START_BET), w.refreshBet(d));
    0 >= WHEEL_SETTINGS[f].prize
      ? ((g = STATE_LOSE), playSound("game_over", 1, !1))
      : ((g = STATE_WIN), playSound("win", 1, !1));
  };
  this.getCurColor = function () {
    return z.getColor();
  };
  this.unload = function () {
    stopSound("reel");
    e = !1;
    w.unload();
    null !== r && r.unload();
    createjs.Tween.removeAllTweens();
    s_oStage.removeAllChildren();
  };
  this.onExit = function () {
    $(s_oMain).trigger("save_score", [m]);
    $(s_oMain).trigger("share_event", m);
    this.unload();
    s_oMain.gotoMenu();
  };
  this.gameOver = function () {
    r = CEndPanel(s_oSpriteLibrary.getSprite("msg_box"));
    r.show();
  };
  this._animLedIdle = function () {
    b += s_iTimeElaps;
    if (b > TIME_ANIM_IDLE) {
      b = 0;
      for (var a = Math.floor(Math.random() * B.getNumAnim()); a === l; )
        a = Math.floor(Math.random() * B.getNumAnim());
      B.changeAnim(a);
      l = a;
    }
  };
  this._animLedSpin = function () {
    B.changeAnim(LED_SPIN);
    g = -1;
  };
  this._animLedWin = function () {
    0 === c
      ? (B.changeAnim(4 + Math.round(Math.random())),
        B.setWinColor(this.getCurColor()))
      : c > TIME_ANIM_WIN &&
        ((b = TIME_ANIM_IDLE), (g = STATE_IDLE), this.setNewRound(), (c = 0));
    c += s_iTimeElaps;
  };
  this._animLedLose = function () {
    0 === c
      ? (B.changeAnim(6), B.setWinColor(this.getCurColor()))
      : c > TIME_ANIM_LOSE &&
        ((b = TIME_ANIM_IDLE), (g = STATE_IDLE), this.setNewRound(), (c = 0));
    c += s_iTimeElaps;
  };
  this.update = function () {
    if (e)
      switch ((B.update(), g)) {
        case STATE_IDLE:
          this._animLedIdle();
          break;
        case STATE_SPIN:
          this._animLedSpin();
          break;
        case STATE_WIN:
          this._animLedWin();
          break;
        case STATE_LOSE:
          this._animLedLose();
      }
  };
  s_oGame = this;
  WHEEL_SETTINGS = a.wheel_settings;
  START_CREDIT = a.start_credit;
  START_BET = a.start_bet;
  BET_OFFSET = a.bet_offset;
  MAX_BET = a.max_bet;
  TIME_ANIM_IDLE = a.anim_idle_change_frequency;
  ANIM_IDLE1_TIMESPEED = a.led_anim_idle1_timespeed;
  ANIM_IDLE2_TIMESPEED = a.led_anim_idle2_timespeed;
  ANIM_IDLE3_TIMESPEED = a.led_anim_idle3_timespeed;
  ANIM_SPIN_TIMESPEED = a.led_anim_spin_timespeed;
  TIME_ANIM_WIN = a.led_anim_win_duration;
  ANIM_WIN1_TIMESPEED = a.led_anim_win1_timespeed;
  ANIM_WIN2_TIMESPEED = a.led_anim_win2_timespeed;
  TIME_ANIM_LOSE = a.led_anim_lose_duration;
  AD_SHOW_COUNTER = a.ad_show_counter;
  BANK_CASH = a.bank_cash;
  ENABLE_FULLSCREEN = a.fullscreen;
  this._init();
}
var s_oGame;

function CVector2(a, e) {
  var b, c;
  this._init = function (a, e) {
    b = a;
    c = e;
  };
  this.add = function (a, e) {
    b += a;
    c += e;
  };
  this.addV = function (a) {
    b += a.getX();
    c += a.getY();
  };
  this.scalarDivision = function (a) {
    b /= a;
    c /= a;
  };
  this.subV = function (a) {
    b -= a.getX();
    c -= a.getY();
  };
  this.scalarProduct = function (a) {
    b *= a;
    c *= a;
  };
  this.invert = function () {
    b *= -1;
    c *= -1;
  };
  this.dotProduct = function (a) {
    return b * a.getX() + c * a.getY();
  };
  this.set = function (a, e) {
    b = a;
    c = e;
  };
  this.setV = function (a) {
    b = a.getX();
    c = a.getY();
  };
  this.length = function () {
    return Math.sqrt(b * b + c * c);
  };
  this.length2 = function () {
    return b * b + c * c;
  };
  this.normalize = function () {
    var a = this.length();
    0 < a && ((b /= a), (c /= a));
  };
  this.getNormalize = function (a) {
    this.length();
    a.set(b, c);
    a.normalize();
  };
  this.rot90CCW = function () {
    var a = b;
    b = -c;
    c = a;
  };
  this.rot90CW = function () {
    var a = b;
    b = c;
    c = -a;
  };
  this.getRotCCW = function (a) {
    a.set(b, c);
    a.rot90CCW();
  };
  this.getRotCW = function (a) {
    a.set(b, c);
    a.rot90CW();
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

function CFormatText(a, e, b, c) {
  var l, g, k, d;
  this._init = function (a, b, c, e) {
    l = 0;
    d = new createjs.Container();
    d.x = a;
    d.y = b;
    e.addChild(d);
    a = 85;
    b = a / 20;
    for (e = 0; e < c.length; e++) {
      var f = a + "px";
      g = new createjs.Text();
      g.text = c[e];
      g.font = f + " " + PRIMARY_FONT;
      g.color = "#000000";
      g.textAlign = "left";
      g.textBaseline = "middle";
      g.x = l + 2;
      g.y = 6;
      d.addChild(g);
      k = new createjs.Text();
      k.text = c[e];
      k.font = f + " " + PRIMARY_FONT;
      k.color = "#ffffff";
      k.textAlign = "left";
      k.textBaseline = "middle";
      k.x = l;
      k.y = 4;
      d.addChild(k);
      l += k.getMeasuredWidth() + b;
      a -= 9;
    }
    d.cache(
      0,
      -d.getBounds().height / 2,
      d.getBounds().width,
      d.getBounds().height
    );
  };
  this.unload = function () {
    c.removeChild(d);
  };
  this.rotateText = function (a) {
    d.rotation = a;
  };
  this._init(a, e, b, c);
}

function CInterface() {
  var a,
    e,
    b,
    c,
    l,
    g,
    k = null,
    d = null,
    m,
    f,
    t,
    n,
    p,
    w,
    r,
    z,
    B,
    D,
    I,
    G;
  this._init = function () {
    I = this;
    r = 0;
    var A = s_oSpriteLibrary.getSprite("but_exit");
    b = CANVAS_WIDTH - A.height / 2 - 10;
    c = A.height / 2 + 10;
    t = new CGfxButton(b, c, A, !0);
    t.addEventListener(ON_MOUSE_UP, this._onExit, this);
    a = CANVAS_WIDTH - A.width / 2 - 100;
    e = A.height / 2 + 10;
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
      (A = s_oSpriteLibrary.getSprite("audio_icon")),
        (f = new CToggle(a, e, A, s_bAudioActive, s_oStage)),
        f.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
    A = window.document;
    var J = A.documentElement;
    k =
      J.requestFullscreen ||
      J.mozRequestFullScreen ||
      J.webkitRequestFullScreen ||
      J.msRequestFullscreen;
    d =
      A.exitFullscreen ||
      A.mozCancelFullScreen ||
      A.webkitExitFullscreen ||
      A.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (k = !1);
    k &&
      screenfull.enabled &&
      ((A = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (l = A.width / 4 + 10),
      (g = A.height / 2 + 10),
      (m = new CToggle(l, g, A, s_bFullscreen, s_oStage)),
      m.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    A = s_oSpriteLibrary.getSprite("but_spin");
    n = new CTextButton(
      500,
      CANVAS_HEIGHT - 190,
      A,
      TEXT_SPIN,
      PRIMARY_FONT,
      "#ffffff",
      70,
      !1,
      s_oStage
    );
    n.enable();
    n.addEventListener(ON_MOUSE_UP, this._onButSpinRelease, this);
    A = s_oSpriteLibrary.getSprite("but_plus");
    p = new CTextButton(
      650,
      CANVAS_HEIGHT - 320,
      A,
      TEXT_PLUS,
      PRIMARY_FONT,
      "#ffffff",
      70,
      !1,
      s_oStage
    );
    p.enable();
    p.addEventListener(ON_MOUSE_UP, this._onButPlusRelease, this);
    A = s_oSpriteLibrary.getSprite("but_plus");
    w = new CTextButton(
      350,
      CANVAS_HEIGHT - 320,
      A,
      TEXT_MIN,
      PRIMARY_FONT,
      "#ffffff",
      70,
      !1,
      s_oStage
    );
    w.enable();
    w.addEventListener(ON_MOUSE_UP, this._onButMinRelease, this);
    new CTLText(
      s_oStage,
      282,
      132,
      450,
      100,
      140,
      "center",
      "#000000",
      PRIMARY_FONT,
      1,
      2,
      2,
      TEXT_CREDITS,
      !0,
      !0,
      !1,
      !1
    );
    new CTLText(
      s_oStage,
      280,
      130,
      450,
      100,
      140,
      "center",
      "#fff",
      PRIMARY_FONT,
      1,
      2,
      2,
      TEXT_CREDITS,
      !0,
      !0,
      !1,
      !1
    );
    z = new CTLText(
      s_oStage,
      310,
      284,
      370,
      90,
      100,
      "left",
      "#fff",
      PRIMARY_FONT,
      1,
      2,
      2,
      TEXT_CURRENCY + START_CREDIT.toFixed(2),
      !0,
      !0,
      !1,
      !1
    );
    B = new CTLText(
      s_oStage,
      310,
      486,
      326,
      110,
      100,
      "left",
      "#fff",
      PRIMARY_FONT,
      1,
      2,
      2,
      TEXT_CURRENCY + "0.00",
      !0,
      !0,
      !1,
      !1
    );
    G = new CTLText(
      s_oStage,
      310,
      486,
      326,
      110,
      100,
      "left",
      "yellow",
      PRIMARY_FONT,
      1,
      2,
      2,
      TEXT_CURRENCY + "0.00",
      !0,
      !0,
      !1,
      !1
    );
    G.setAlpha(r);
    D = new CTLText(
      s_oStage,
      410,
      730,
      180,
      60,
      70,
      "center",
      "#fff",
      PRIMARY_FONT,
      1,
      2,
      2,
      TEXT_CURRENCY + START_BET,
      !0,
      !0,
      !1,
      !1
    );
    this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };
  this.unload = function () {
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) f.unload(), (f = null);
    t.unload();
    n.unload();
    k && screenfull.enabled && m.unload();
    s_oInterface = null;
  };
  this.refreshCredit = function (a) {
    z.refreshText(TEXT_CURRENCY + a.toFixed(2));
  };
  this.clearMoneyPanel = function () {
    G.setAlpha(0);
    createjs.Tween.removeTweens(G.getText());
  };
  this.refreshMoney = function (a) {
    B.refreshText(TEXT_CURRENCY + a.toFixed(2));
    G.refreshText(TEXT_CURRENCY + a.toFixed(2));
  };
  this.refreshBet = function (a) {
    D.refreshText(TEXT_CURRENCY + a);
  };
  this.animWin = function () {
    r = 1 === r ? 0 : 1;
    createjs.Tween.get(G.getText())
      .to(
        {
          alpha: r,
        },
        150,
        createjs.Ease.cubicOut
      )
      .call(function () {
        I.animWin();
      });
  };
  this._onButSpinRelease = function () {
    s_oGame.spinWheel();
  };
  this._onButPlusRelease = function () {
    s_oGame.modifyBonus("plus");
  };
  this._onButMinRelease = function () {
    s_oGame.modifyBonus("min");
  };
  this.disableSpin = function (a) {
    !0 === a
      ? (n.disable(), p.disable(), w.disable())
      : (n.enable(), p.enable(), w.enable());
  };
  this.refreshButtonPos = function (d, n) {
    t.setPosition(b - d, n + c);
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      f.setPosition(a - d, n + e);
    k && screenfull.enabled && m.setPosition(l + d, g + n);
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this.resetFullscreenBut = function () {
    m.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? d.call(window.document)
      : k.call(window.document.documentElement);
    sizeHandler();
  };
  this._onExit = function () {
    $(s_oMain).trigger("end_session");
    s_oGame.onExit();
  };
  s_oInterface = this;
  this._init();
  return this;
}
var s_oInterface = null;

function CHelpPanel() {
  var a, e;
  this._init = function () {
    e = new createjs.Container();
    e.alpha = 0;
    s_oStage.addChild(e);
    var b = this;
    a = createBitmap(s_oSpriteLibrary.getSprite("bg_help"));
    e.addChild(a);
    new CTLText(
      e,
      CANVAS_WIDTH / 2 - 98,
      CANVAS_HEIGHT / 2 - 312,
      600,
      280,
      70,
      "center",
      "#000000",
      PRIMARY_FONT,
      1,
      2,
      2,
      TEXT_HELP1,
      !0,
      !0,
      !0,
      !1
    );
    new CTLText(
      e,
      CANVAS_WIDTH / 2 - 100,
      CANVAS_HEIGHT / 2 - 310,
      600,
      280,
      70,
      "center",
      "#fff",
      PRIMARY_FONT,
      1,
      2,
      2,
      TEXT_HELP1,
      !0,
      !0,
      !0,
      !1
    );
    new CTLText(
      e,
      CANVAS_WIDTH / 2 - 498,
      CANVAS_HEIGHT / 2 + 102,
      600,
      180,
      70,
      "center",
      "#000000",
      PRIMARY_FONT,
      1,
      2,
      2,
      TEXT_HELP2,
      !0,
      !0,
      !0,
      !1
    );
    new CTLText(
      e,
      CANVAS_WIDTH / 2 - 500,
      CANVAS_HEIGHT / 2 + 100,
      600,
      180,
      70,
      "center",
      "#fff",
      PRIMARY_FONT,
      1,
      2,
      2,
      TEXT_HELP2,
      !0,
      !0,
      !0,
      !1
    );
    createjs.Tween.get(e).to(
      {
        alpha: 1,
      },
      700
    );
    e.on("pressup", function () {
      b._onExitHelp();
    });
  };
  this.unload = function () {
    s_oStage.removeChild(e);
    var a = this;
    e.off("pressup", function () {
      a._onExitHelp();
    });
  };
  this._onExitHelp = function () {
    b.unload();
  };
  var b = this;
  this._init();
}

function CEndPanel(a) {
  var e, b, c, l;
  this._init = function (a) {
    b = new createjs.Container();
    b.alpha = 0;
    b.visible = !1;
    s_oStage.addChild(b);
    e = createBitmap(a);
    b.addChild(e);
    c = new CTLText(
      b,
      CANVAS_WIDTH / 2 - 398,
      222,
      800,
      600,
      70,
      "center",
      "#000",
      PRIMARY_FONT,
      1,
      20,
      20,
      "",
      !0,
      !0,
      !0,
      !1
    );
    l = new CTLText(
      b,
      CANVAS_WIDTH / 2 - 400,
      220,
      800,
      600,
      70,
      "center",
      "#fff",
      PRIMARY_FONT,
      1,
      20,
      20,
      "",
      !0,
      !0,
      !0,
      !1
    );
  };
  this.unload = function () {
    b.off("mousedown", this._onExit);
  };
  this._initListener = function () {
    b.on("mousedown", this._onExit);
  };
  this.show = function () {
    playSound("game_over", 1, !1);
    $(s_oMain).trigger("show_interlevel_ad");
    c.refreshText(TEXT_GAMEOVER);
    l.refreshText(TEXT_GAMEOVER);
    b.visible = !0;
    var a = this;
    createjs.Tween.get(b)
      .to(
        {
          alpha: 1,
        },
        500
      )
      .call(function () {
        a._initListener();
      });
  };
  this._onExit = function () {
    b.off("mousedown", this._onExit);
    s_oStage.removeChild(b);
    $(s_oMain).trigger("end_session");
    s_oGame.onExit();
  };
  this._init(a);
  return this;
}

function CWheel(a, e) {
  var b, c, l, g, k;
  this._init = function (a, e) {
    b = [];
    c = [];
    l = [];
    for (var d = 0; d < WHEEL_SETTINGS.length; d++)
      l[d] = WHEEL_SETTINGS[d].prize;
    this._initColors();
    d = s_oSpriteLibrary.getSprite("wheel");
    k = new createjs.Container();
    k.x = a;
    k.y = e;
    s_oStage.addChild(k);
    g = createBitmap(d);
    g.regX = d.width / 2;
    g.regY = d.height / 2;
    k.addChild(g);
    g.cache(0, 0, d.width, d.height);
    this.setText(1);
  };
  this.unload = function () {
    s_oStage.removeChild(k);
  };
  this._initColors = function () {
    for (var a = 0; 9 > a; a++) c[0] = "violet";
    for (a = 351; 360 >= a; a++) c[a] = "violet";
    for (var b = 0; 4 > b; b++)
      for (a = 9 + b * SEGMENT_ROT * 5; a < 27 + b * SEGMENT_ROT * 5; a++)
        c[a] = "blue";
    for (b = 0; 4 > b; b++)
      for (a = 27 + b * SEGMENT_ROT * 5; a < 45 + b * SEGMENT_ROT * 5; a++)
        c[a] = "green";
    for (b = 0; 4 > b; b++)
      for (a = 45 + b * SEGMENT_ROT * 5; a < 63 + b * SEGMENT_ROT * 5; a++)
        c[a] = "yellow";
    for (b = 0; 4 > b; b++)
      for (a = 63 + b * SEGMENT_ROT * 5; a < 81 + b * SEGMENT_ROT * 5; a++)
        c[a] = "red";
    for (b = 0; 3 > b; b++)
      for (a = 81 + b * SEGMENT_ROT * 5; a <= 99 + b * SEGMENT_ROT * 5; a++)
        c[a] = "violet";
    for (a = 315; 333 >= a; a++) c[a] = "white";
  };
  this.setText = function (a) {
    for (
      var d = new CVector2(-355, 3),
        c = SEGMENT_ROT,
        e = (Math.PI * SEGMENT_ROT) / 180,
        g = 0;
      g < l.length;
      g++
    ) {
      var p = (l[g] * a).toFixed(2);
      b[g] = new CFormatText(d.getX(), d.getY(), TEXT_CURRENCY + p, k);
      b[g].rotateText(-c * g);
      rotateVector2D(e, d);
    }
  };
  this.clearText = function () {
    for (var a = 0; a < l.length; a++) b[a].unload();
  };
  this.spin = function (a, b) {
    playSound("start_reel", 1, !1);
    playSound("reel", 0.1, !0);
    createjs.Tween.get(k)
      .to(
        {
          rotation: k.rotation + a,
        },
        WHEEL_SPIN_TIMESPEED * b,
        createjs.Ease.quartOut
      )
      .call(function () {
        k.rotation %= 360;
        s_oGame.releaseWheel();
        (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || stopSound("reel");
      });
  };
  this.getDegree = function () {
    return k.rotation;
  };
  this.getColor = function () {
    return c[Math.round(k.rotation)];
  };
  this._init(a, e);
}

function CLeds(a, e) {
  var b, c, l, g, k, d, m, f, t;
  this._init = function (a, b) {
    k = 3;
    l = Math.floor(Math.random() * k);
    g = 0;
    f = [];
    t = new createjs.Container();
    t.x = a;
    t.y = b;
    s_oStage.addChild(t);
    var c = {
      images: [s_oSpriteLibrary.getSprite("leds")],
      frames: {
        width: 90,
        height: 90,
        regX: 45,
        regY: 45,
      },
      animations: {
        off: [0],
        white: [1],
        green: [2],
        blue: [3],
        violet: [4],
        red: [5],
        yellow: [6],
      },
    };
    c = new createjs.SpriteSheet(c);
    for (
      var d = new CVector2(-427, 0),
        e = ((360 / WHEEL_SETTINGS.length) * Math.PI) / 180,
        n = 0;
      n < WHEEL_SETTINGS.length;
      n++
    )
      (f[n] = createSprite(c, "off", 0, 0, 90, 90)),
        (f[n].x = d.getX()),
        (f[n].y = d.getY()),
        rotateVector2D(e, d),
        t.addChild(f[n]);
    f[0].visible = !1;
  };
  this.unload = function () {
    s_oStage.removeChild(t);
  };
  this.setWinColor = function (a) {
    b = a;
  };
  this.getState = function () {
    return l;
  };
  this.getNumAnim = function () {
    return k;
  };
  this.changeAnim = function (a) {
    g = 0;
    l = a;
    for (a = 0; a < f.length; a++) f[a].gotoAndStop("off");
  };
  this.animIdle0 = function () {
    g += s_iTimeElaps;
    if (0 <= g && g < ANIM_IDLE1_TIMESPEED / 2)
      for (var a = 0; a < f.length; a++)
        0 === a % 2 ? f[a].gotoAndStop("white") : f[a].gotoAndStop("off");
    else if (g >= ANIM_IDLE1_TIMESPEED / 2 && g < ANIM_IDLE1_TIMESPEED)
      for (a = 0; a < f.length; a++)
        0 === a % 2 ? f[a].gotoAndStop("off") : f[a].gotoAndStop("white");
    else g = 0;
  };
  this.animIdle1 = function () {
    0 === g &&
      ((d = 0),
      f[d].gotoAndStop("white"),
      f[f.length / 4].gotoAndStop("white"),
      f[f.length / 2].gotoAndStop("white"),
      f[(3 * f.length) / 4].gotoAndStop("white"));
    g += s_iTimeElaps;
    g > ANIM_IDLE2_TIMESPEED &&
      (d === f.length / 4 && ((d = 0), (g = 1)),
      0 === d
        ? (f[f.length - 1].gotoAndStop("off"),
          f[0].gotoAndStop("white"),
          f[f.length / 4 - 1].gotoAndStop("off"),
          f[f.length / 4].gotoAndStop("white"),
          f[f.length / 2 - 1].gotoAndStop("off"),
          f[f.length / 2].gotoAndStop("white"),
          f[(3 * f.length) / 4 - 1].gotoAndStop("off"),
          f[(3 * f.length) / 4].gotoAndStop("white"))
        : (f[d - 1].gotoAndStop("off"),
          f[d].gotoAndStop("white"),
          f[f.length / 4 + d - 1].gotoAndStop("off"),
          f[f.length / 4 + d].gotoAndStop("white"),
          f[f.length / 2 + d - 1].gotoAndStop("off"),
          f[f.length / 2 + d].gotoAndStop("white"),
          f[(3 * f.length) / 4 + d - 1].gotoAndStop("off"),
          f[(3 * f.length) / 4 + d].gotoAndStop("white")),
      d++,
      (g = 1));
  };
  this.animIdle2 = function () {
    0 === g &&
      ((d = 0),
      (m = f.length / 2),
      f[d].gotoAndStop("white"),
      f[m].gotoAndStop("white"));
    g += s_iTimeElaps;
    g > ANIM_IDLE3_TIMESPEED &&
      (d === f.length / 2 && ((d = 0), (m = f.length / 2), (g = 1)),
      0 === d
        ? (f[f.length - 1].gotoAndStop("off"),
          f[1].gotoAndStop("off"),
          f[0].gotoAndStop("white"),
          f[f.length / 2 + 1].gotoAndStop("off"),
          f[f.length / 2 - 1].gotoAndStop("off"),
          f[f.length / 2].gotoAndStop("white"))
        : (f[d - 1].gotoAndStop("off"),
          f[d].gotoAndStop("white"),
          1 !== d && f[f.length - d + 1].gotoAndStop("off"),
          f[f.length - d].gotoAndStop("white"),
          f[m + 1].gotoAndStop("off"),
          f[m].gotoAndStop("white"),
          f[f.length - m - 1].gotoAndStop("off"),
          0 !== m && f[f.length - m].gotoAndStop("white")),
      d++,
      m--,
      (g = 1));
  };
  this.animSpin0 = function () {
    0 === g &&
      ((d = Math.floor(Math.random() * f.length)), f[d].gotoAndStop("white"));
    g += s_iTimeElaps;
    g > ANIM_SPIN_TIMESPEED &&
      (0 > d && ((d = f.length - 1), (g = 1)),
      d === f.length - 1
        ? (f[0].gotoAndStop("off"), f[f.length - 1].gotoAndStop("white"))
        : (f[d + 1].gotoAndStop("off"), f[d].gotoAndStop("white")),
      d--,
      (g = 1));
  };
  this.animWin0 = function () {
    g += s_iTimeElaps;
    if (0 <= g && g < ANIM_WIN1_TIMESPEED / 2)
      for (var a = 0; a < f.length; a++)
        0 === a % 2 ? f[a].gotoAndStop(b) : f[a].gotoAndStop("off");
    else if (g >= ANIM_WIN1_TIMESPEED / 2 && g < ANIM_WIN1_TIMESPEED)
      for (a = 0; a < f.length; a++)
        0 === a % 2 ? f[a].gotoAndStop("off") : f[a].gotoAndStop(b);
    else g = 0;
  };
  this.animWin1 = function () {
    0 === g &&
      ((d = 0),
      (m = f.length / 2),
      (c = b),
      f[d].gotoAndStop(c),
      f[m].gotoAndStop(c));
    g += s_iTimeElaps;
    g > ANIM_WIN2_TIMESPEED &&
      (d > f.length / 4 &&
        ((d = 0), (m = f.length / 2), (g = 1), (c = c === b ? "off" : b)),
      0 === d
        ? (f[0].gotoAndStop(c), f[f.length / 2].gotoAndStop(c))
        : d <= f.length / 4 &&
          (f[d].gotoAndStop(c),
          f[f.length - d].gotoAndStop(c),
          f[m].gotoAndStop(c),
          0 !== m && f[f.length - m].gotoAndStop(c)),
      d++,
      m--,
      (g = 1));
  };
  this.animLose = function () {
    for (var a = 0; a < f.length; a++) f[a].gotoAndStop(b);
    l = -1;
  };
  this.update = function () {
    switch (l) {
      case 0:
        this.animIdle0();
        break;
      case 1:
        this.animIdle1();
        break;
      case 2:
        this.animIdle2();
        break;
      case 3:
        this.animSpin0();
        break;
      case 4:
        this.animWin0();
        break;
      case 5:
        this.animWin1();
        break;
      case 6:
        this.animLose();
    }
  };
  this._init(a, e);
}

function CCreditsPanel() {
  var a, e, b, c, l, g, k, d;
  this._init = function () {
    d = new createjs.Container();
    s_oStage.addChild(d);
    var m = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
    d.addChild(m);
    m = s_oSpriteLibrary.getSprite("msg_box");
    b = createBitmap(m);
    b.x = CANVAS_WIDTH / 2;
    b.y = CANVAS_HEIGHT / 2;
    b.regX = m.width / 2;
    b.regY = m.height / 2;
    d.addChild(b);
    g = new createjs.Shape();
    g.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    g.alpha = 0.01;
    e = g.on("click", this._onLogoButRelease);
    d.addChild(g);
    m = s_oSpriteLibrary.getSprite("but_exit");
    a = CANVAS_WIDTH / 2 + 570;
    c = new CGfxButton(a, 254, m, d);
    c.addEventListener(ON_MOUSE_UP, this.unload, this);
    l = new createjs.Text(
      TEXT_CREDITS_DEVELOPED,
      "46px " + PRIMARY_FONT,
      "#ffffff"
    );
    l.x = CANVAS_WIDTH / 2;
    l.y = 430;
    l.textAlign = "center";
    d.addChild(l);
    m = s_oSpriteLibrary.getSprite("logo_credits");
    var f = createBitmap(m);
    f.regX = m.width / 2;
    f.regY = m.height / 2;
    f.x = CANVAS_WIDTH / 2;
    f.y = CANVAS_HEIGHT / 2;
    d.addChild(f);
    k = new createjs.Text(
      "WWW.CODETHISLAB.COM",
      "35px " + PRIMARY_FONT,
      "#ffffff"
    );
    k.x = CANVAS_WIDTH / 2;
    k.y = 600;
    k.textAlign = "center";
    d.addChild(k);
  };
  this.unload = function () {
    g.off("click", e);
    c.unload();
    c = null;
    s_oStage.removeChild(d);
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
  setPos: function (a, e) {
    this._x = a;
    this._y = e;
    this._oText.x = a;
    this._oText.y = e;
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

function CTLText(a, e, b, c, l, g, k, d, m, f, t, n, p, w, r, z, B) {
  this._oContainer = a;
  this._x = e;
  this._y = b;
  this._iWidth = c;
  this._iHeight = l;
  this._bMultiline = z;
  this._iFontSize = g;
  this._szAlign = k;
  this._szColor = d;
  this._szFont = m;
  this._iPaddingH = t;
  this._iPaddingV = n;
  this._bVerticalAlign = r;
  this._bFitText = w;
  this._bDebug = B;
  this._oDebugShape = null;
  this._fLineHeightFactor = f;
  this._oText = null;
  p && this.__createText(p);
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
        } catch (l) {
          var c = window.location.ancestorOrigins;
          b = c[c.length - 1];
        }
      } catch (l) {
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
