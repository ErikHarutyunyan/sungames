(function () {
  var a =
      "undefined" !== typeof window && "undefined" !== typeof window.document
        ? window.document
        : {},
    g = "undefined" !== typeof module && module.exports,
    k = (function () {
      for (
        var h,
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
          f = 0,
          p = b.length,
          e = {};
        f < p;
        f++
      )
        if ((h = b[f]) && h[1] in a) {
          for (f = 0; f < h.length; f++) e[b[0][f]] = h[f];
          return e;
        }
      return !1;
    })(),
    d = {
      change: k.fullscreenchange,
      error: k.fullscreenerror,
    },
    m = {
      request: function (h) {
        return new Promise(
          function (b, f) {
            var p = function () {
              this.off("change", p);
              b();
            }.bind(this);
            this.on("change", p);
            h = h || a.documentElement;
            Promise.resolve(h[k.requestFullscreen]())["catch"](f);
          }.bind(this)
        );
      },
      exit: function () {
        return new Promise(
          function (h, b) {
            if (this.isFullscreen) {
              var f = function () {
                this.off("change", f);
                h();
              }.bind(this);
              this.on("change", f);
              Promise.resolve(a[k.exitFullscreen]())["catch"](b);
            } else h();
          }.bind(this)
        );
      },
      toggle: function (h) {
        return this.isFullscreen ? this.exit() : this.request(h);
      },
      onchange: function (h) {
        this.on("change", h);
      },
      onerror: function (h) {
        this.on("error", h);
      },
      on: function (h, b) {
        var f = d[h];
        f && a.addEventListener(f, b, !1);
      },
      off: function (h, b) {
        var f = d[h];
        f && a.removeEventListener(f, b, !1);
      },
      raw: k,
    };
  k
    ? (Object.defineProperties(m, {
        isFullscreen: {
          get: function () {
            return !!a[k.fullscreenElement];
          },
        },
        element: {
          enumerable: !0,
          get: function () {
            return a[k.fullscreenElement];
          },
        },
        isEnabled: {
          enumerable: !0,
          get: function () {
            return !!a[k.fullscreenEnabled];
          },
        },
      }),
      g ? (module.exports = m) : (window.screenfull = m))
    : g
    ? (module.exports = {
        isEnabled: !1,
      })
    : (window.screenfull = {
        isEnabled: !1,
      });
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
      g = 0;
    g < a.length;
    g++
  ) {
    var k = document.createElement("meta");
    k.name = a[g].name;
    k.content = a[g].content;
    var d = window.document.head.querySelector('meta[name="' + k.name + '"]');
    d && d.parentNode.removeChild(d);
    window.document.head.appendChild(k);
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
    g = a.family.toLowerCase();
  a = parseFloat(a.version);
  return "ios" === g && 13 > a ? !0 : !1;
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
  function a(t) {
    t = String(t);
    return t.charAt(0).toUpperCase() + t.slice(1);
  }

  function g(t, z) {
    var B = -1,
      D = t ? t.length : 0;
    if ("number" == typeof D && -1 < D && D <= q)
      for (; ++B < D; ) z(t[B], B, t);
    else d(t, z);
  }

  function k(t) {
    t = String(t).replace(/^ +| +$/g, "");
    return /^(?:webOS|i(?:OS|P))/.test(t) ? t : a(t);
  }

  function d(t, z) {
    for (var B in t) u.call(t, B) && z(t[B], B, t);
  }

  function m(t) {
    return null == t ? a(t) : x.call(t).slice(8, -1);
  }

  function h(t, z) {
    var B = null != t ? typeof t[z] : "number";
    return (
      !/^(?:boolean|number|string|undefined)$/.test(B) &&
      ("object" == B ? !!t[z] : !0)
    );
  }

  function b(t) {
    return String(t).replace(/([ -])(?!$)/g, "$1?");
  }

  function f(t, z) {
    var B = null;
    g(t, function (D, C) {
      B = z(B, D, C, t);
    });
    return B;
  }

  function p(t) {
    function z(L) {
      return f(L, function (K, I) {
        var N = I.pattern || b(I);
        !K &&
          (K =
            RegExp("\\b" + N + " *\\d+[.\\w_]*", "i").exec(t) ||
            RegExp("\\b" + N + " *\\w+-[\\w]*", "i").exec(t) ||
            RegExp(
              "\\b" + N + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)",
              "i"
            ).exec(t)) &&
          ((K = String(
            I.label && !RegExp(N, "i").test(I.label) ? I.label : K
          ).split("/"))[1] &&
            !/[\d.]+/.test(K[0]) &&
            (K[0] += " " + K[1]),
          (I = I.label || I),
          (K = k(
            K[0]
              .replace(RegExp(N, "i"), I)
              .replace(RegExp("; *(?:" + I + "[_-])?", "i"), " ")
              .replace(RegExp("(" + I + ")[-_.]?(\\w)", "i"), "$1 $2")
          )));
        return K;
      });
    }

    function B(L) {
      return f(L, function (K, I) {
        return (
          K ||
          (RegExp(
            I + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)",
            "i"
          ).exec(t) || 0)[1] ||
          null
        );
      });
    }
    var D = l,
      C = t && "object" == typeof t && "String" != m(t);
    C && ((D = t), (t = null));
    var A = D.navigator || {},
      y = A.userAgent || "";
    t || (t = y);
    var J = C
        ? !!A.likeChrome
        : /\bChrome\b/.test(t) && !/internal|\n/i.test(x.toString()),
      M = C ? "Object" : "ScriptBridgingProxyObject",
      W = C ? "Object" : "Environment",
      S = C && D.java ? "JavaPackage" : m(D.java),
      ba = C ? "Object" : "RuntimeObject";
    W = (S = /\bJava/.test(S) && D.java) && m(D.environment) == W;
    var ca = S ? "a" : "\u03b1",
      da = S ? "b" : "\u03b2",
      X = D.document || {},
      Q = D.operamini || D.opera,
      T = r.test((T = C && Q ? Q["[[Class]]"] : m(Q))) ? T : (Q = null),
      v,
      U = t;
    C = [];
    var V = null,
      R = t == y;
    y = R && Q && "function" == typeof Q.version && Q.version();
    var G = (function (L) {
        return f(L, function (K, I) {
          return (
            K ||
            (RegExp("\\b" + (I.pattern || b(I)) + "\\b", "i").exec(t) &&
              (I.label || I))
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
      E = (function (L) {
        return f(L, function (K, I) {
          return (
            K ||
            (RegExp("\\b" + (I.pattern || b(I)) + "\\b", "i").exec(t) &&
              (I.label || I))
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
      H = z([
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
      O = (function (L) {
        return f(L, function (K, I, N) {
          return (
            K ||
            ((I[H] ||
              I[/^[a-z]+(?: +[a-z]+\b)*/i.exec(H)] ||
              RegExp("\\b" + b(N) + "(?:\\b|\\w*\\d)", "i").exec(t)) &&
              N)
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
      F = (function (L) {
        return f(L, function (K, I) {
          var N = I.pattern || b(I);
          if (
            !K &&
            (K = RegExp("\\b" + N + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(t))
          ) {
            var P = K,
              Y = I.label || I,
              Z = {
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
            N &&
              Y &&
              /^Win/i.test(P) &&
              !/^Windows Phone /i.test(P) &&
              (Z = Z[/[\d.]+$/.exec(P)]) &&
              (P = "Windows " + Z);
            P = String(P);
            N && Y && (P = P.replace(RegExp(N, "i"), Y));
            K = P = k(
              P.replace(/ ce$/i, " CE")
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
    G && (G = [G]);
    O && !H && (H = z([O]));
    if ((v = /\bGoogle TV\b/.exec(H))) H = v[0];
    /\bSimulator\b/i.test(t) && (H = (H ? H + " " : "") + "Simulator");
    "Opera Mini" == E &&
      /\bOPiOS\b/.test(t) &&
      C.push("running in Turbo/Uncompressed mode");
    "IE" == E && /\blike iPhone OS\b/.test(t)
      ? ((v = p(t.replace(/like iPhone OS/, ""))),
        (O = v.manufacturer),
        (H = v.product))
      : /^iP/.test(H)
      ? (E || (E = "Safari"),
        (F =
          "iOS" +
          ((v = / OS ([\d_]+)/i.exec(t)) ? " " + v[1].replace(/_/g, ".") : "")))
      : "Konqueror" != E || /buntu/i.test(F)
      ? (O &&
          "Google" != O &&
          ((/Chrome/.test(E) && !/\bMobile Safari\b/i.test(t)) ||
            /\bVita\b/.test(H))) ||
        (/\bAndroid\b/.test(F) && /^Chrome/.test(E) && /\bVersion\//i.test(t))
        ? ((E = "Android Browser"), (F = /\bAndroid\b/.test(F) ? F : "Android"))
        : "Silk" == E
        ? (/\bMobi/i.test(t) || ((F = "Android"), C.unshift("desktop mode")),
          /Accelerated *= *true/i.test(t) && C.unshift("accelerated"))
        : "PaleMoon" == E && (v = /\bFirefox\/([\d.]+)\b/.exec(t))
        ? C.push("identifying as Firefox " + v[1])
        : "Firefox" == E && (v = /\b(Mobile|Tablet|TV)\b/i.exec(t))
        ? (F || (F = "Firefox OS"), H || (H = v[1]))
        : !E ||
          (v = !/\bMinefield\b/i.test(t) && /\b(?:Firefox|Safari)\b/.exec(E))
        ? (E &&
            !H &&
            /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(v + "/") + 8)) &&
            (E = null),
          (v = H || O || F) &&
            (H || O || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(F)) &&
            (E =
              /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(F) ? F : v) +
              " Browser"))
        : "Electron" == E &&
          (v = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) &&
          C.push("Chromium " + v)
      : (F = "Kubuntu");
    y ||
      (y = B([
        "(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))",
        "Version",
        b(E),
        "(?:Firefox|Minefield|NetFront)",
      ]));
    if (
      (v =
        ("iCab" == G && 3 < parseFloat(y) && "WebKit") ||
        (/\bOpera\b/.test(E) && (/\bOPR\b/.test(t) ? "Blink" : "Presto")) ||
        (/\b(?:Midori|Nook|Safari)\b/i.test(t) &&
          !/^(?:Trident|EdgeHTML)$/.test(G) &&
          "WebKit") ||
        (!G && /\bMSIE\b/i.test(t) && ("Mac OS" == F ? "Tasman" : "Trident")) ||
        ("WebKit" == G && /\bPlayStation\b(?! Vita\b)/i.test(E) && "NetFront"))
    )
      G = [v];
    "IE" == E && (v = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1])
      ? ((E += " Mobile"),
        (F = "Windows Phone " + (/\+$/.test(v) ? v : v + ".x")),
        C.unshift("desktop mode"))
      : /\bWPDesktop\b/i.test(t)
      ? ((E = "IE Mobile"),
        (F = "Windows Phone 8.x"),
        C.unshift("desktop mode"),
        y || (y = (/\brv:([\d.]+)/.exec(t) || 0)[1]))
      : "IE" != E &&
        "Trident" == G &&
        (v = /\brv:([\d.]+)/.exec(t)) &&
        (E && C.push("identifying as " + E + (y ? " " + y : "")),
        (E = "IE"),
        (y = v[1]));
    if (R) {
      if (h(D, "global"))
        if (
          (S &&
            ((v = S.lang.System),
            (U = v.getProperty("os.arch")),
            (F =
              F ||
              v.getProperty("os.name") + " " + v.getProperty("os.version"))),
          W)
        ) {
          try {
            (y = D.require("ringo/engine").version.join(".")), (E = "RingoJS");
          } catch (L) {
            (v = D.system) &&
              v.global.system == D.system &&
              ((E = "Narwhal"), F || (F = v[0].os || null));
          }
          E || (E = "Rhino");
        } else
          "object" == typeof D.process &&
            !D.process.browser &&
            (v = D.process) &&
            ("object" == typeof v.versions &&
              ("string" == typeof v.versions.electron
                ? (C.push("Node " + v.versions.node),
                  (E = "Electron"),
                  (y = v.versions.electron))
                : "string" == typeof v.versions.nw &&
                  (C.push("Chromium " + y, "Node " + v.versions.node),
                  (E = "NW.js"),
                  (y = v.versions.nw))),
            E ||
              ((E = "Node.js"),
              (U = v.arch),
              (F = v.platform),
              (y = (y = /[\d.]+/.exec(v.version)) ? y[0] : null)));
      else
        m((v = D.runtime)) == M
          ? ((E = "Adobe AIR"), (F = v.flash.system.Capabilities.os))
          : m((v = D.phantom)) == ba
          ? ((E = "PhantomJS"),
            (y =
              (v = v.version || null) &&
              v.major + "." + v.minor + "." + v.patch))
          : "number" == typeof X.documentMode &&
            (v = /\bTrident\/(\d+)/i.exec(t))
          ? ((y = [y, X.documentMode]),
            (v = +v[1] + 4) != y[1] &&
              (C.push("IE " + y[1] + " mode"), G && (G[1] = ""), (y[1] = v)),
            (y = "IE" == E ? String(y[1].toFixed(1)) : y[0]))
          : "number" == typeof X.documentMode &&
            /^(?:Chrome|Firefox)\b/.test(E) &&
            (C.push("masking as " + E + " " + y),
            (E = "IE"),
            (y = "11.0"),
            (G = ["Trident"]),
            (F = "Windows"));
      F = F && k(F);
    }
    y &&
      (v =
        /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(y) ||
        /(?:alpha|beta)(?: ?\d)?/i.exec(t + ";" + (R && A.appMinorVersion)) ||
        (/\bMinefield\b/i.test(t) && "a")) &&
      ((V = /b/i.test(v) ? "beta" : "alpha"),
      (y =
        y.replace(RegExp(v + "\\+?$"), "") +
        ("beta" == V ? da : ca) +
        (/\d+\+?/.exec(v) || "")));
    if (
      "Fennec" == E ||
      ("Firefox" == E && /\b(?:Android|Firefox OS)\b/.test(F))
    )
      E = "Firefox Mobile";
    else if ("Maxthon" == E && y) y = y.replace(/\.[\d.]+/, ".x");
    else if (/\bXbox\b/i.test(H))
      "Xbox 360" == H && (F = null),
        "Xbox 360" == H && /\bIEMobile\b/.test(t) && C.unshift("mobile mode");
    else if (
      (!/^(?:Chrome|IE|Opera)$/.test(E) &&
        (!E || H || /Browser|Mobi/.test(E))) ||
      ("Windows CE" != F && !/Mobi/i.test(t))
    )
      if ("IE" == E && R)
        try {
          null === D.external && C.unshift("platform preview");
        } catch (L) {
          C.unshift("embedded");
        }
      else
        (/\bBlackBerry\b/.test(H) || /\bBB10\b/.test(t)) &&
        (v =
          (RegExp(H.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(t) ||
            0)[1] || y)
          ? ((v = [v, /BB10/.test(t)]),
            (F =
              (v[1] ? ((H = null), (O = "BlackBerry")) : "Device Software") +
              " " +
              v[0]),
            (y = null))
          : this != d &&
            "Wii" != H &&
            ((R && Q) ||
              (/Opera/.test(E) && /\b(?:MSIE|Firefox)\b/i.test(t)) ||
              ("Firefox" == E && /\bOS X (?:\d+\.){2,}/.test(F)) ||
              ("IE" == E &&
                ((F && !/^Win/.test(F) && 5.5 < y) ||
                  (/\bWindows XP\b/.test(F) && 8 < y) ||
                  (8 == y && !/\bTrident\b/.test(t))))) &&
            !r.test((v = p.call(d, t.replace(r, "") + ";"))) &&
            v.name &&
            ((v = "ing as " + v.name + ((v = v.version) ? " " + v : "")),
            r.test(E)
              ? (/\bIE\b/.test(v) && "Mac OS" == F && (F = null),
                (v = "identify" + v))
              : ((v = "mask" + v),
                (E = T ? k(T.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera"),
                /\bIE\b/.test(v) && (F = null),
                R || (y = null)),
            (G = ["Presto"]),
            C.push(v));
    else E += " Mobile";
    if ((v = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1])) {
      v = [parseFloat(v.replace(/\.(\d)$/, ".0$1")), v];
      if ("Safari" == E && "+" == v[1].slice(-1))
        (E = "WebKit Nightly"), (V = "alpha"), (y = v[1].slice(0, -1));
      else if (
        y == v[1] ||
        y == (v[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1])
      )
        y = null;
      v[1] = (/\bChrome\/([\d.]+)/i.exec(t) || 0)[1];
      537.36 == v[0] &&
        537.36 == v[2] &&
        28 <= parseFloat(v[1]) &&
        "WebKit" == G &&
        (G = ["Blink"]);
      R && (J || v[1])
        ? (G && (G[1] = "like Chrome"),
          (v =
            v[1] ||
            ((v = v[0]),
            530 > v
              ? 1
              : 532 > v
              ? 2
              : 532.05 > v
              ? 3
              : 533 > v
              ? 4
              : 534.03 > v
              ? 5
              : 534.07 > v
              ? 6
              : 534.1 > v
              ? 7
              : 534.13 > v
              ? 8
              : 534.16 > v
              ? 9
              : 534.24 > v
              ? 10
              : 534.3 > v
              ? 11
              : 535.01 > v
              ? 12
              : 535.02 > v
              ? "13+"
              : 535.07 > v
              ? 15
              : 535.11 > v
              ? 16
              : 535.19 > v
              ? 17
              : 536.05 > v
              ? 18
              : 536.1 > v
              ? 19
              : 537.01 > v
              ? 20
              : 537.11 > v
              ? "21+"
              : 537.13 > v
              ? 23
              : 537.18 > v
              ? 24
              : 537.24 > v
              ? 25
              : 537.36 > v
              ? 26
              : "Blink" != G
              ? "27"
              : "28")))
        : (G && (G[1] = "like Safari"),
          (v =
            ((v = v[0]),
            400 > v
              ? 1
              : 500 > v
              ? 2
              : 526 > v
              ? 3
              : 533 > v
              ? 4
              : 534 > v
              ? "4+"
              : 535 > v
              ? 5
              : 537 > v
              ? 6
              : 538 > v
              ? 7
              : 601 > v
              ? 8
              : "8")));
      G &&
        (G[1] +=
          " " + (v += "number" == typeof v ? ".x" : /[.+]/.test(v) ? "" : "+"));
      "Safari" == E && (!y || 45 < parseInt(y)) && (y = v);
    }
    "Opera" == E && (v = /\bzbov|zvav$/.exec(F))
      ? ((E += " "),
        C.unshift("desktop mode"),
        "zvav" == v ? ((E += "Mini"), (y = null)) : (E += "Mobile"),
        (F = F.replace(RegExp(" *" + v + "$"), "")))
      : "Safari" == E &&
        /\bChrome\b/.exec(G && G[1]) &&
        (C.unshift("desktop mode"),
        (E = "Chrome Mobile"),
        (y = null),
        /\bOS X\b/.test(F) ? ((O = "Apple"), (F = "iOS 4.3+")) : (F = null));
    y &&
      0 == y.indexOf((v = /[\d.]+$/.exec(F))) &&
      -1 < t.indexOf("/" + v + "-") &&
      (F = String(F.replace(v, "")).replace(/^ +| +$/g, ""));
    G &&
      !/\b(?:Avant|Nook)\b/.test(E) &&
      (/Browser|Lunascape|Maxthon/.test(E) ||
        ("Safari" != E && /^iOS/.test(F) && /\bSafari\b/.test(G[1])) ||
        (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(
          E
        ) &&
          G[1])) &&
      (v = G[G.length - 1]) &&
      C.push(v);
    C.length && (C = ["(" + C.join("; ") + ")"]);
    O && H && 0 > H.indexOf(O) && C.push("on " + O);
    H && C.push((/^on /.test(C[C.length - 1]) ? "" : "on ") + H);
    if (F) {
      var aa =
        (v = / ([\d.+]+)$/.exec(F)) &&
        "/" == F.charAt(F.length - v[0].length - 1);
      F = {
        architecture: 32,
        family: v && !aa ? F.replace(v[0], "") : F,
        version: v ? v[1] : null,
        toString: function () {
          var L = this.version;
          return (
            this.family +
            (L && !aa ? " " + L : "") +
            (64 == this.architecture ? " 64-bit" : "")
          );
        },
      };
    }
    (v = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(U)) && !/\bi686\b/i.test(U)
      ? (F &&
          ((F.architecture = 64),
          (F.family = F.family.replace(RegExp(" *" + v), ""))),
        E &&
          (/\bWOW64\b/i.test(t) ||
            (R &&
              /\w(?:86|32)$/.test(A.cpuClass || A.platform) &&
              !/\bWin64; x64\b/i.test(t))) &&
          C.unshift("32-bit"))
      : F &&
        /^OS X/.test(F.family) &&
        "Chrome" == E &&
        39 <= parseFloat(y) &&
        (F.architecture = 64);
    t || (t = null);
    D = {};
    D.description = t;
    D.layout = G && G[0];
    D.manufacturer = O;
    D.name = E;
    D.prerelease = V;
    D.product = H;
    D.ua = t;
    D.version = E && y;
    D.os = F || {
      architecture: null,
      family: null,
      version: null,
      toString: function () {
        return "null";
      },
    };
    D.parse = p;
    D.toString = function () {
      return this.description || "";
    };
    D.version && C.unshift(y);
    D.name && C.unshift(E);
    F &&
      E &&
      (F != String(F).split(" ")[0] || (F != E.split(" ")[0] && !H)) &&
      C.push(H ? "(" + F + ")" : "on " + F);
    C.length && (D.description = C.join(" "));
    return D;
  }
  var e = {
      function: !0,
      object: !0,
    },
    l = (e[typeof window] && window) || this,
    c = e[typeof exports] && exports;
  e = e[typeof module] && module && !module.nodeType && module;
  var n = c && e && "object" == typeof global && global;
  !n || (n.global !== n && n.window !== n && n.self !== n) || (l = n);
  var q = Math.pow(2, 53) - 1,
    r = /\bOpera/;
  n = Object.prototype;
  var u = n.hasOwnProperty,
    x = n.toString,
    w = p();
  "function" == typeof define && "object" == typeof define.amd && define.amd
    ? ((l.platform = w),
      define(function () {
        return w;
      }))
    : c && e
    ? d(w, function (t, z) {
        c[z] = t;
      })
    : (l.platform = w);
}).call(this);
var s_iScaleFactor = 1,
  s_oCanvasLeft,
  s_oCanvasTop,
  s_iOffsetX = 0,
  s_iOffsetY = 0,
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

function getSize(a) {
  var g = a.toLowerCase(),
    k = window.document,
    d = k.documentElement;
  if (void 0 === window["inner" + a]) a = d["client" + a];
  else if (window["inner" + a] != d["client" + a]) {
    var m = k.createElement("body");
    m.id = "vpw-test-b";
    m.style.cssText = "overflow:scroll";
    var h = k.createElement("div");
    h.id = "vpw-test-d";
    h.style.cssText = "position:absolute;top:-1000px";
    h.innerHTML =
      "<style>@media(" +
      g +
      ":" +
      d["client" + a] +
      "px){body#vpw-test-b div#vpw-test-d{" +
      g +
      ":7px!important}}</style>";
    m.appendChild(h);
    d.insertBefore(m, k.head);
    a = 7 == h["offset" + a] ? d["client" + a] : window["inner" + a];
    d.removeChild(m);
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

function sizeHandler() {
  window.scrollTo(0, 1);
  if ($("#canvas")) {
    var a =
      null !== platform.name && "safari" === platform.name.toLowerCase()
        ? getIOSWindowHeight()
        : getSize("Height");
    var g = getSize("Width");
    s_bFocus && _checkOrientation(g, a);
    var k = Math.min(a / CANVAS_HEIGHT, g / CANVAS_WIDTH),
      d = Math.round(CANVAS_WIDTH * k);
    k = Math.round(CANVAS_HEIGHT * k);
    if (k < a) {
      var m = a - k;
      k += m;
      d += (CANVAS_WIDTH / CANVAS_HEIGHT) * m;
    } else
      d < g &&
        ((m = g - d), (d += m), (k += (CANVAS_HEIGHT / CANVAS_WIDTH) * m));
    m = a / 2 - k / 2;
    var h = g / 2 - d / 2,
      b = CANVAS_WIDTH / d;
    if (h * b < -EDGEBOARD_X || m * b < -EDGEBOARD_Y)
      (k = Math.min(
        a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y),
        g / (CANVAS_WIDTH - 2 * EDGEBOARD_X)
      )),
        (d = Math.round(CANVAS_WIDTH * k)),
        (k = Math.round(CANVAS_HEIGHT * k)),
        (m = (a - k) / 2),
        (h = (g - d) / 2),
        (b = CANVAS_WIDTH / d);
    s_iOffsetX = -1 * h * b;
    s_iOffsetY = -1 * m * b;
    0 <= m && (s_iOffsetY = 0);
    0 <= h && (s_iOffsetX = 0);
    null !== s_oGame && s_oGame.refreshButtonPos();
    null !== s_oMenu && s_oMenu.refreshButtonPos();
    null !== s_oBetPanel && s_oBetPanel.refreshButtonPos();
    s_bIsIphone && s_oStage
      ? ((canvas = document.getElementById("canvas")),
        (s_oStage.canvas.width = 2 * d),
        (s_oStage.canvas.height = 2 * k),
        (canvas.style.width = d + "px"),
        (canvas.style.height = k + "px"),
        (s_iScaleFactor = 2 * Math.min(d / CANVAS_WIDTH, k / CANVAS_HEIGHT)),
        (s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor))
      : s_bMobile
      ? ($("#canvas").css("width", d + "px"),
        $("#canvas").css("height", k + "px"))
      : s_oStage &&
        ((s_oStage.canvas.width = d),
        (s_oStage.canvas.height = k),
        (s_iScaleFactor = Math.min(d / CANVAS_WIDTH, k / CANVAS_HEIGHT)),
        (s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor));
    0 > m || (m = (a - k) / 2);
    $("#canvas").css("top", m + "px");
    $("#canvas").css("left", h + "px");
    fullscreenHandler();
  }
}

function _checkOrientation(a, g) {
  s_bMobile &&
    ENABLE_CHECK_ORIENTATION &&
    (a > g
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

function createBitmap(a, g, k) {
  var d = new createjs.Bitmap(a),
    m = new createjs.Shape();
  g && k
    ? m.graphics.beginFill("#fff").drawRect(0, 0, g, k)
    : m.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
  d.hitArea = m;
  return d;
}

function createSprite(a, g, k, d, m, h) {
  a = null !== g ? new createjs.Sprite(a, g) : new createjs.Sprite(a);
  g = new createjs.Shape();
  g.graphics.beginFill("#000000").drawRect(-k, -d, m, h);
  a.hitArea = g;
  return a;
}

function randomFloatBetween(a, g, k) {
  "undefined" === typeof k && (k = 2);
  return parseFloat(Math.min(a + Math.random() * (g - a), g).toFixed(k));
}

function linearFunction(a, g, k, d, m) {
  return ((a - g) * (m - d)) / (k - g) + d;
}

function formatTime(a) {
  a /= 1e3;
  var g = Math.floor(a / 60);
  a = Math.floor(a - 60 * g);
  var k = "";
  k = 10 > g ? k + ("0" + g + ":") : k + (g + ":");
  return 10 > a ? k + ("0" + a) : k + a;
}

function NoClickDelay(a) {
  this.element = a;
  window.Touch && this.element.addEventListener("touchstart", this, !1);
}

function shuffle(a) {
  for (var g = a.length, k, d; 0 < g; )
    (d = Math.floor(Math.random() * g)),
      g--,
      (k = a[g]),
      (a[g] = a[d]),
      (a[d] = k);
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
      var g = document.createEvent("MouseEvents");
      g.initEvent("click", !0, !0);
      a.dispatchEvent(g);
    }
  },
};

function ctlArcadeResume() {
  null !== s_oMain && s_oMain.startUpdate();
}

function ctlArcadePause() {
  null !== s_oMain && s_oMain.stopUpdate();
}

function getParamValue(a) {
  for (
    var g = window.location.search.substring(1).split("&"), k = 0;
    k < g.length;
    k++
  ) {
    var d = g[k].split("=");
    if (d[0] == a) return d[1];
  }
}
Array.prototype.sortOn = function () {
  var a = this.slice();
  if (!arguments.length) return a.sort();
  var g = Array.prototype.slice.call(arguments);
  return a.sort(function (k, d) {
    for (var m = g.slice(), h = m.shift(); k[h] == d[h] && m.length; )
      h = m.shift();
    return k[h] == d[h] ? 0 : k[h] > d[h] ? 1 : -1;
  });
};

function playSound(a, g, k) {
  return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
    ? (s_aSounds[a].play(),
      s_aSounds[a].volume(g),
      s_aSounds[a].loop(k),
      s_aSounds[a])
    : null;
}

function stopSound(a) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].stop();
}

function setVolume(a, g) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].volume(g);
}

function setMute(a, g) {
  (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_aSounds[a].mute(g);
}

function pauseSound(a) {
  s_aSounds[a].pause();
}

function easeLinear(a, g, k, d) {
  return (k * a) / d + g;
}

function collisionWithCircle(a, g, k) {
  var d = a.getX() - g.getX(),
    m = a.getY() - g.getY();
  return Math.sqrt(d * d + m * m) < a.getCollision() * k + g.getCollision() * k
    ? !0
    : !1;
}
(function () {
  function a(k) {
    var d = {
      focus: "visible",
      focusin: "visible",
      pageshow: "visible",
      blur: "hidden",
      focusout: "hidden",
      pagehide: "hidden",
    };
    k = k || window.event;
    k.type in d
      ? (document.body.className = d[k.type])
      : ((document.body.className = this[g] ? "hidden" : "visible"),
        "hidden" === document.body.className
          ? (s_oMain.stopUpdate(), (s_bFocus = !1))
          : (s_oMain.startUpdate(), (s_bFocus = !0)));
  }
  var g = "hidden";
  g in document
    ? document.addEventListener("visibilitychange", a)
    : (g = "mozHidden") in document
    ? document.addEventListener("mozvisibilitychange", a)
    : (g = "webkitHidden") in document
    ? document.addEventListener("webkitvisibilitychange", a)
    : (g = "msHidden") in document
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
    !1 !== screenfull.isEnabled &&
    ((s_bFullscreen = screenfull.isFullscreen),
    null !== s_oInterface && s_oInterface.resetFullscreenBut(),
    null !== s_oMenu && s_oMenu.resetFullscreenBut(),
    null !== s_oBetPanel && s_oBetPanel.resetFullscreenBut());
}
if (screenfull.isEnabled)
  screenfull.on("change", function () {
    s_bFullscreen = screenfull.isFullscreen;
    null !== s_oInterface && s_oInterface.resetFullscreenBut();
    null !== s_oMenu && s_oMenu.resetFullscreenBut();
    null !== s_oBetPanel && s_oBetPanel.resetFullscreenBut();
  });

function CSpriteLibrary() {
  var a = {},
    g,
    k,
    d,
    m,
    h,
    b;
  this.init = function (f, p, e) {
    g = {};
    d = k = 0;
    m = f;
    h = p;
    b = e;
  };
  this.addSprite = function (f, p) {
    if (!a.hasOwnProperty(f)) {
      var e = new Image();
      a[f] = g[f] = {
        szPath: p,
        oSprite: e,
        bLoaded: !1,
      };
      k++;
    }
  };
  this.getSprite = function (f) {
    return a.hasOwnProperty(f) ? a[f].oSprite : null;
  };
  this._onSpritesLoaded = function () {
    k = 0;
    h.call(b);
  };
  this._onSpriteLoaded = function () {
    m.call(b);
    ++d === k && this._onSpritesLoaded();
  };
  this.loadSprites = function () {
    for (var f in g)
      (g[f].oSprite.oSpriteLibrary = this),
        (g[f].oSprite.szKey = f),
        (g[f].oSprite.onload = function () {
          this.oSpriteLibrary.setLoaded(this.szKey);
          this.oSpriteLibrary._onSpriteLoaded(this.szKey);
        }),
        (g[f].oSprite.onerror = function (p) {
          var e = p.currentTarget;
          setTimeout(function () {
            g[e.szKey].oSprite.src = g[e.szKey].szPath;
          }, 500);
        }),
        (g[f].oSprite.src = g[f].szPath);
  };
  this.setLoaded = function (f) {
    a[f].bLoaded = !0;
  };
  this.isLoaded = function (f) {
    return a[f].bLoaded;
  };
  this.getNumSprites = function () {
    return k;
  };
}
var CANVAS_WIDTH = 1920,
  CANVAS_HEIGHT = 1080,
  EDGEBOARD_X = 90,
  EDGEBOARD_Y = 142,
  FPS = 40,
  FPS_TIME = 1e3 / FPS,
  DISABLE_SOUND_MOBILE = !1,
  PRIMARY_FONT = "impactregular",
  SECONDARY_FONT = "ds-digitalbold",
  TERTIARY_FONT = "motorwerkregular",
  STATE_LOADING = 0,
  STATE_MENU = 1,
  STATE_BET_PANEL = 2,
  STATE_GAME = 3,
  ON_MOUSE_DOWN = 0,
  ON_MOUSE_UP = 1,
  ON_MOUSE_OVER = 2,
  ON_MOUSE_OUT = 3,
  ON_DRAG_START = 4,
  ON_DRAG_END = 5,
  FICHE_WIDTH = 68,
  COLOR_FICHES = "#ff7706 #ffb600 #000 #06a800 #d50000 #444444".split(" "),
  CHIP_VALUES,
  BET_PANEL_X = 110,
  BET_PANEL_Y = 140,
  BET_PANEL_WIDTH,
  BET_PANEL_HEIGHT,
  HORSE_WIDTH = 758,
  HORSE_HEIGHT = 380,
  NUM_CHIPS,
  NUM_HORSES,
  MIN_BET,
  MAX_BET,
  WIN_OCCURRENCE,
  NUM_TRACK_BG = 397,
  ARRIVAL_X = 1500,
  MOVE_TRACK_X_OFFSET = 30,
  TIME_CHECK_RANK = 2e3,
  HORSE_DATA = {
    horse_names: "cocoa ranger blazer jazzy harley trigger pepper dash".split(
      " "
    ),
    odd_win_bet: [3.7, 5.5, 2.2, 11.75, 17.25, 8.75, 7.15, 6.15],
    odd_place_bet: [1.95, 2.55, 1.25, 5.5, 7.75, 3.05, 2.5, 2.05],
    odd_show_bet: [1.25, 1.7, 1.09, 2.55, 4, 1.75, 1.55, 1.35],
    forecast: [
      {
        first: 1,
        second: 2,
        odd: 20,
      },
      {
        first: 1,
        second: 3,
        odd: 6.25,
      },
      {
        first: 1,
        second: 4,
        odd: 60,
      },
      {
        first: 1,
        second: 5,
        odd: 80,
      },
      {
        first: 1,
        second: 6,
        odd: 23,
      },
      {
        first: 1,
        second: 7,
        odd: 20,
      },
      {
        first: 1,
        second: 8,
        odd: 15,
      },
      {
        first: 2,
        second: 1,
        odd: 28,
      },
      {
        first: 2,
        second: 3,
        odd: 10.25,
      },
      {
        first: 2,
        second: 4,
        odd: 65,
      },
      {
        first: 2,
        second: 5,
        odd: 68,
      },
      {
        first: 2,
        second: 6,
        odd: 58,
      },
      {
        first: 2,
        second: 7,
        odd: 42,
      },
      {
        first: 2,
        second: 8,
        odd: 32,
      },
      {
        first: 3,
        second: 1,
        odd: 5.75,
      },
      {
        first: 3,
        second: 2,
        odd: 8.75,
      },
      {
        first: 3,
        second: 4,
        odd: 26,
      },
      {
        first: 3,
        second: 5,
        odd: 31,
      },
      {
        first: 3,
        second: 6,
        odd: 19,
      },
      {
        first: 3,
        second: 7,
        odd: 15,
      },
      {
        first: 3,
        second: 8,
        odd: 10,
      },
      {
        first: 4,
        second: 1,
        odd: 84,
      },
      {
        first: 4,
        second: 2,
        odd: 56,
      },
      {
        first: 4,
        second: 3,
        odd: 23,
      },
      {
        first: 4,
        second: 5,
        odd: 80,
      },
      {
        first: 4,
        second: 6,
        odd: 65,
      },
      {
        first: 4,
        second: 7,
        odd: 55,
      },
      {
        first: 4,
        second: 8,
        odd: 40,
      },
      {
        first: 5,
        second: 1,
        odd: 70,
      },
      {
        first: 5,
        second: 2,
        odd: 70,
      },
      {
        first: 5,
        second: 3,
        odd: 68,
      },
      {
        first: 5,
        second: 4,
        odd: 84,
      },
      {
        first: 5,
        second: 6,
        odd: 80,
      },
      {
        first: 5,
        second: 7,
        odd: 70,
      },
      {
        first: 5,
        second: 8,
        odd: 50,
      },
      {
        first: 6,
        second: 1,
        odd: 48,
      },
      {
        first: 6,
        second: 2,
        odd: 58,
      },
      {
        first: 6,
        second: 3,
        odd: 13,
      },
      {
        first: 6,
        second: 4,
        odd: 70,
      },
      {
        first: 6,
        second: 5,
        odd: 80,
      },
      {
        first: 6,
        second: 7,
        odd: 55,
      },
      {
        first: 6,
        second: 8,
        odd: 40,
      },
      {
        first: 7,
        second: 1,
        odd: 40,
      },
      {
        first: 7,
        second: 2,
        odd: 50,
      },
      {
        first: 7,
        second: 3,
        odd: 10,
      },
      {
        first: 7,
        second: 4,
        odd: 50,
      },
      {
        first: 7,
        second: 5,
        odd: 55,
      },
      {
        first: 7,
        second: 6,
        odd: 40,
      },
      {
        first: 7,
        second: 8,
        odd: 35,
      },
      {
        first: 8,
        second: 1,
        odd: 38,
      },
      {
        first: 8,
        second: 2,
        odd: 48,
      },
      {
        first: 8,
        second: 3,
        odd: 8,
      },
      {
        first: 8,
        second: 4,
        odd: 50,
      },
      {
        first: 8,
        second: 5,
        odd: 40,
      },
      {
        first: 8,
        second: 6,
        odd: 35,
      },
      {
        first: 8,
        second: 7,
        odd: 30,
      },
    ],
  },
  ENABLE_FULLSCREEN,
  ENABLE_CHECK_ORIENTATION,
  SHOW_CREDITS,
  SOUNDTRACK_VOLUME_IN_GAME = 1;

function CGameSettings(a) {
  var g, k, d, m, h, b, f, p, e;
  this._init = function (l) {
    e = l;
    l = e.horse_names;
    NUM_HORSES = l.length;
    g = [];
    for (var c = 0; c < NUM_HORSES; c++) g[c] = l[c];
    this._initSimpleOdd();
    this._initForecastOdd();
    this._initPaths();
    this._initHorseInfo();
    b = CHIP_VALUES;
  };
  this._initSimpleOdd = function () {
    var l = e.odd_win_bet,
      c = e.odd_place_bet,
      n = e.odd_show_bet;
    k = [];
    d = [];
    m = [];
    for (var q = 0; q < l.length; q++)
      (k[q] = l[q]), (d[q] = c[q]), (m[q] = n[q]);
  };
  this._initForecastOdd = function () {
    var l = e.forecast;
    h = [];
    for (var c = 0; c < NUM_HORSES; c++) h[c] = [];
    for (c = 0; c < l.length; c++)
      h[l[c].first - 1][l[c].second - 1] = l[c].odd;
  };
  this._initPaths = function () {
    f = [];
    var l = [
        {
          x: 363,
          frame: 100,
        },
        {
          x: 790,
          frame: 160,
        },
        {
          x: 948,
          frame: 190,
        },
        {
          x: 832,
          frame: 200,
        },
        {
          x: ARRIVAL_X - HORSE_WIDTH / 2,
          frame: 210,
        },
      ],
      c = [
        {
          x: 395,
          frame: 100,
        },
        {
          x: 948,
          frame: 180,
        },
        {
          x: 1027,
          frame: 190,
        },
        {
          x: 911,
          frame: 180,
        },
        {
          x: ARRIVAL_X - HORSE_WIDTH / 2 - 337,
          frame: 210,
        },
      ],
      n = [
        {
          x: 269,
          frame: 100,
        },
        {
          x: 632,
          frame: 130,
        },
        {
          x: 711,
          frame: 320,
        },
        {
          x: 674,
          frame: 170,
        },
        {
          x: ARRIVAL_X - HORSE_WIDTH / 2 - 555,
          frame: 140,
        },
      ],
      q = [
        {
          x: 300,
          frame: 100,
        },
        {
          x: 537,
          frame: 130,
        },
        {
          x: 569,
          frame: 210,
        },
        {
          x: 760,
          frame: 100,
        },
        {
          x: ARRIVAL_X - HORSE_WIDTH / 2 - 756,
          frame: 320,
        },
      ],
      r = [
        {
          x: 348,
          frame: 100,
        },
        {
          x: 553,
          frame: 260,
        },
        {
          x: 758,
          frame: 200,
        },
        {
          x: 706,
          frame: 100,
        },
        {
          x: ARRIVAL_X - HORSE_WIDTH / 2 - 861,
          frame: 200,
        },
      ],
      u = [
        {
          x: 332,
          frame: 100,
        },
        {
          x: 411,
          frame: 170,
        },
        {
          x: 400,
          frame: 50,
        },
        {
          x: 610,
          frame: 50,
        },
        {
          x: ARRIVAL_X - HORSE_WIDTH / 2 - 1008,
          frame: 490,
        },
      ],
      x = [
        {
          x: 348,
          frame: 100,
        },
        {
          x: 458,
          frame: 100,
        },
        {
          x: 500,
          frame: 70,
        },
        {
          x: 658,
          frame: 100,
        },
        {
          x: ARRIVAL_X - HORSE_WIDTH / 2 - 1264,
          frame: 490,
        },
      ],
      w = [
        {
          x: 300,
          frame: 100,
        },
        {
          x: 316,
          frame: 100,
        },
        {
          x: 400,
          frame: 70,
        },
        {
          x: 516,
          frame: 100,
        },
        {
          x: ARRIVAL_X - HORSE_WIDTH / 2 - 1580,
          frame: 490,
        },
      ];
    f.push({
      place_1: l,
      place_2: c,
      place_3: n,
      place_4: q,
      place_5: r,
      place_6: u,
      place_7: x,
      place_8: w,
    });
    l = [
      {
        x: 230,
        frame: 100,
      },
      {
        x: 450,
        frame: 180,
      },
      {
        x: 500,
        frame: 170,
      },
      {
        x: 1e3,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2,
        frame: 210,
      },
    ];
    c = [
      {
        x: 250,
        frame: 100,
      },
      {
        x: 600,
        frame: 200,
      },
      {
        x: 850,
        frame: 180,
      },
      {
        x: 1150,
        frame: 170,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 300,
        frame: 210,
      },
    ];
    n = [
      {
        x: 170,
        frame: 100,
      },
      {
        x: 250,
        frame: 150,
      },
      {
        x: 700,
        frame: 230,
      },
      {
        x: 1050,
        frame: 240,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 500,
        frame: 140,
      },
    ];
    q = [
      {
        x: 190,
        frame: 100,
      },
      {
        x: 250,
        frame: 150,
      },
      {
        x: 600,
        frame: 150,
      },
      {
        x: 1060,
        frame: 150,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 750,
        frame: 310,
      },
    ];
    r = [
      {
        x: 220,
        frame: 100,
      },
      {
        x: 350,
        frame: 280,
      },
      {
        x: 700,
        frame: 180,
      },
      {
        x: 1020,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 850,
        frame: 200,
      },
    ];
    u = [
      {
        x: 210,
        frame: 100,
      },
      {
        x: 160,
        frame: 280,
      },
      {
        x: 300,
        frame: 100,
      },
      {
        x: 960,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1e3,
        frame: 280,
      },
    ];
    x = [
      {
        x: 220,
        frame: 100,
      },
      {
        x: 200,
        frame: 270,
      },
      {
        x: 270,
        frame: 190,
      },
      {
        x: 720,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1150,
        frame: 200,
      },
    ];
    w = [
      {
        x: 210,
        frame: 100,
      },
      {
        x: 200,
        frame: 190,
      },
      {
        x: 400,
        frame: 100,
      },
      {
        x: 600,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1300,
        frame: 370,
      },
    ];
    f.push({
      place_1: l,
      place_2: c,
      place_3: n,
      place_4: q,
      place_5: r,
      place_6: u,
      place_7: x,
      place_8: w,
    });
    l = [
      {
        x: 230,
        frame: 100,
      },
      {
        x: 900,
        frame: 180,
      },
      {
        x: 700,
        frame: 180,
      },
      {
        x: 800,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2,
        frame: 200,
      },
    ];
    c = [
      {
        x: 250,
        frame: 100,
      },
      {
        x: 1e3,
        frame: 200,
      },
      {
        x: 850,
        frame: 180,
      },
      {
        x: 700,
        frame: 180,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 300,
        frame: 200,
      },
    ];
    n = [
      {
        x: 170,
        frame: 100,
      },
      {
        x: 800,
        frame: 150,
      },
      {
        x: 650,
        frame: 240,
      },
      {
        x: 500,
        frame: 240,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 500,
        frame: 130,
      },
    ];
    q = [
      {
        x: 190,
        frame: 100,
      },
      {
        x: 740,
        frame: 150,
      },
      {
        x: 500,
        frame: 300,
      },
      {
        x: 560,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 700,
        frame: 210,
      },
    ];
    r = [
      {
        x: 220,
        frame: 100,
      },
      {
        x: 750,
        frame: 280,
      },
      {
        x: 680,
        frame: 180,
      },
      {
        x: 520,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 850,
        frame: 200,
      },
    ];
    u = [
      {
        x: 210,
        frame: 100,
      },
      {
        x: 600,
        frame: 180,
      },
      {
        x: 500,
        frame: 100,
      },
      {
        x: 400,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 960,
        frame: 380,
      },
    ];
    x = [
      {
        x: 200,
        frame: 100,
      },
      {
        x: 500,
        frame: 270,
      },
      {
        x: 280,
        frame: 190,
      },
      {
        x: 220,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1050,
        frame: 200,
      },
    ];
    w = [
      {
        x: 210,
        frame: 100,
      },
      {
        x: 500,
        frame: 280,
      },
      {
        x: 250,
        frame: 100,
      },
      {
        x: 220,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1200,
        frame: 280,
      },
    ];
    f.push({
      place_1: l,
      place_2: c,
      place_3: n,
      place_4: q,
      place_5: r,
      place_6: u,
      place_7: x,
      place_8: w,
    });
    l = [
      {
        x: 330,
        frame: 100,
      },
      {
        x: 850,
        frame: 180,
      },
      {
        x: 950,
        frame: 170,
      },
      {
        x: 1050,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2,
        frame: 210,
      },
    ];
    c = [
      {
        x: 250,
        frame: 100,
      },
      {
        x: 750,
        frame: 200,
      },
      {
        x: 850,
        frame: 180,
      },
      {
        x: 1e3,
        frame: 170,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 300,
        frame: 210,
      },
    ];
    n = [
      {
        x: 270,
        frame: 100,
      },
      {
        x: 800,
        frame: 150,
      },
      {
        x: 850,
        frame: 230,
      },
      {
        x: 900,
        frame: 240,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 500,
        frame: 140,
      },
    ];
    q = [
      {
        x: 290,
        frame: 100,
      },
      {
        x: 740,
        frame: 150,
      },
      {
        x: 700,
        frame: 200,
      },
      {
        x: 760,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 710,
        frame: 310,
      },
    ];
    r = [
      {
        x: 220,
        frame: 100,
      },
      {
        x: 450,
        frame: 280,
      },
      {
        x: 700,
        frame: 180,
      },
      {
        x: 720,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 850,
        frame: 200,
      },
    ];
    u = [
      {
        x: 210,
        frame: 100,
      },
      {
        x: 360,
        frame: 290,
      },
      {
        x: 450,
        frame: 100,
      },
      {
        x: 460,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1e3,
        frame: 270,
      },
    ];
    x = [
      {
        x: 220,
        frame: 100,
      },
      {
        x: 390,
        frame: 280,
      },
      {
        x: 720,
        frame: 180,
      },
      {
        x: 720,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1150,
        frame: 200,
      },
    ];
    w = [
      {
        x: 210,
        frame: 100,
      },
      {
        x: 420,
        frame: 280,
      },
      {
        x: 600,
        frame: 100,
      },
      {
        x: 520,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1200,
        frame: 280,
      },
    ];
    f.push({
      place_1: l,
      place_2: c,
      place_3: n,
      place_4: q,
      place_5: r,
      place_6: u,
      place_7: x,
      place_8: w,
    });
    l = [
      {
        x: 230,
        frame: 100,
      },
      {
        x: 850,
        frame: 180,
      },
      {
        x: 900,
        frame: 170,
      },
      {
        x: 1e3,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2,
        frame: 210,
      },
    ];
    c = [
      {
        x: 250,
        frame: 100,
      },
      {
        x: 850,
        frame: 200,
      },
      {
        x: 950,
        frame: 170,
      },
      {
        x: 900,
        frame: 180,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 250,
        frame: 210,
      },
    ];
    n = [
      {
        x: 270,
        frame: 100,
      },
      {
        x: 800,
        frame: 150,
      },
      {
        x: 950,
        frame: 240,
      },
      {
        x: 900,
        frame: 230,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 500,
        frame: 140,
      },
    ];
    q = [
      {
        x: 190,
        frame: 100,
      },
      {
        x: 840,
        frame: 140,
      },
      {
        x: 460,
        frame: 200,
      },
      {
        x: 760,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 700,
        frame: 320,
      },
    ];
    r = [
      {
        x: 220,
        frame: 100,
      },
      {
        x: 850,
        frame: 270,
      },
      {
        x: 600,
        frame: 190,
      },
      {
        x: 720,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 750,
        frame: 200,
      },
    ];
    u = [
      {
        x: 210,
        frame: 100,
      },
      {
        x: 660,
        frame: 280,
      },
      {
        x: 400,
        frame: 100,
      },
      {
        x: 660,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 850,
        frame: 280,
      },
    ];
    x = [
      {
        x: 240,
        frame: 100,
      },
      {
        x: 850,
        frame: 270,
      },
      {
        x: 600,
        frame: 190,
      },
      {
        x: 720,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 950,
        frame: 200,
      },
    ];
    w = [
      {
        x: 180,
        frame: 100,
      },
      {
        x: 560,
        frame: 290,
      },
      {
        x: 360,
        frame: 100,
      },
      {
        x: 660,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1050,
        frame: 270,
      },
    ];
    f.push({
      place_1: l,
      place_2: c,
      place_3: n,
      place_4: q,
      place_5: r,
      place_6: u,
      place_7: x,
      place_8: w,
    });
    l = [
      {
        x: 230,
        frame: 120,
      },
      {
        x: 950,
        frame: 200,
      },
      {
        x: 700,
        frame: 100,
      },
      {
        x: 900,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2,
        frame: 240,
      },
    ];
    c = [
      {
        x: 250,
        frame: 170,
      },
      {
        x: 950,
        frame: 150,
      },
      {
        x: 750,
        frame: 140,
      },
      {
        x: 900,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 250,
        frame: 200,
      },
    ];
    n = [
      {
        x: 270,
        frame: 120,
      },
      {
        x: 1e3,
        frame: 140,
      },
      {
        x: 750,
        frame: 200,
      },
      {
        x: 800,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 450,
        frame: 200,
      },
    ];
    q = [
      {
        x: 190,
        frame: 100,
      },
      {
        x: 940,
        frame: 160,
      },
      {
        x: 660,
        frame: 300,
      },
      {
        x: 880,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 690,
        frame: 200,
      },
    ];
    r = [
      {
        x: 220,
        frame: 170,
      },
      {
        x: 950,
        frame: 200,
      },
      {
        x: 700,
        frame: 190,
      },
      {
        x: 720,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 850,
        frame: 200,
      },
    ];
    u = [
      {
        x: 210,
        frame: 120,
      },
      {
        x: 860,
        frame: 300,
      },
      {
        x: 600,
        frame: 190,
      },
      {
        x: 620,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 950,
        frame: 150,
      },
    ];
    x = [
      {
        x: 200,
        frame: 170,
      },
      {
        x: 900,
        frame: 200,
      },
      {
        x: 700,
        frame: 190,
      },
      {
        x: 700,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1050,
        frame: 200,
      },
    ];
    w = [
      {
        x: 230,
        frame: 120,
      },
      {
        x: 880,
        frame: 290,
      },
      {
        x: 600,
        frame: 200,
      },
      {
        x: 640,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1180,
        frame: 150,
      },
    ];
    f.push({
      place_1: l,
      place_2: c,
      place_3: n,
      place_4: q,
      place_5: r,
      place_6: u,
      place_7: x,
      place_8: w,
    });
    l = [
      {
        x: 230,
        frame: 120,
      },
      {
        x: 1e3,
        frame: 220,
      },
      {
        x: 1e3,
        frame: 100,
      },
      {
        x: 1030,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2,
        frame: 320,
      },
    ];
    c = [
      {
        x: 250,
        frame: 170,
      },
      {
        x: 1150,
        frame: 150,
      },
      {
        x: 1150,
        frame: 140,
      },
      {
        x: 1100,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 350,
        frame: 200,
      },
    ];
    n = [
      {
        x: 270,
        frame: 120,
      },
      {
        x: 1e3,
        frame: 140,
      },
      {
        x: 950,
        frame: 200,
      },
      {
        x: 1050,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 550,
        frame: 200,
      },
    ];
    q = [
      {
        x: 190,
        frame: 100,
      },
      {
        x: 1040,
        frame: 160,
      },
      {
        x: 1060,
        frame: 300,
      },
      {
        x: 980,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 800,
        frame: 200,
      },
    ];
    r = [
      {
        x: 220,
        frame: 170,
      },
      {
        x: 1150,
        frame: 200,
      },
      {
        x: 1100,
        frame: 190,
      },
      {
        x: 920,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 950,
        frame: 200,
      },
    ];
    u = [
      {
        x: 210,
        frame: 120,
      },
      {
        x: 1060,
        frame: 300,
      },
      {
        x: 1e3,
        frame: 210,
      },
      {
        x: 820,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1050,
        frame: 130,
      },
    ];
    x = [
      {
        x: 260,
        frame: 170,
      },
      {
        x: 1150,
        frame: 200,
      },
      {
        x: 1e3,
        frame: 190,
      },
      {
        x: 920,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1200,
        frame: 200,
      },
    ];
    w = [
      {
        x: 10,
        frame: 120,
      },
      {
        x: 1060,
        frame: 270,
      },
      {
        x: 1e3,
        frame: 200,
      },
      {
        x: 800,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1350,
        frame: 170,
      },
    ];
    f.push({
      place_1: l,
      place_2: c,
      place_3: n,
      place_4: q,
      place_5: r,
      place_6: u,
      place_7: x,
      place_8: w,
    });
    l = [
      {
        x: 230,
        frame: 120,
      },
      {
        x: 750,
        frame: 300,
      },
      {
        x: 640,
        frame: 100,
      },
      {
        x: 950,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2,
        frame: 240,
      },
    ];
    c = [
      {
        x: 250,
        frame: 120,
      },
      {
        x: 930,
        frame: 300,
      },
      {
        x: 700,
        frame: 100,
      },
      {
        x: 850,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 300,
        frame: 240,
      },
    ];
    n = [
      {
        x: 270,
        frame: 120,
      },
      {
        x: 1030,
        frame: 290,
      },
      {
        x: 800,
        frame: 100,
      },
      {
        x: 750,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 550,
        frame: 250,
      },
    ];
    q = [
      {
        x: 190,
        frame: 120,
      },
      {
        x: 730,
        frame: 290,
      },
      {
        x: 600,
        frame: 100,
      },
      {
        x: 500,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 790,
        frame: 250,
      },
    ];
    r = [
      {
        x: 220,
        frame: 120,
      },
      {
        x: 700,
        frame: 290,
      },
      {
        x: 650,
        frame: 100,
      },
      {
        x: 450,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 950,
        frame: 250,
      },
    ];
    u = [
      {
        x: 210,
        frame: 120,
      },
      {
        x: 530,
        frame: 290,
      },
      {
        x: 400,
        frame: 100,
      },
      {
        x: 250,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1050,
        frame: 250,
      },
    ];
    x = [
      {
        x: 180,
        frame: 120,
      },
      {
        x: 680,
        frame: 290,
      },
      {
        x: 350,
        frame: 100,
      },
      {
        x: 250,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1200,
        frame: 250,
      },
    ];
    w = [
      {
        x: 190,
        frame: 120,
      },
      {
        x: 550,
        frame: 290,
      },
      {
        x: 300,
        frame: 100,
      },
      {
        x: 200,
        frame: 100,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1350,
        frame: 250,
      },
    ];
    f.push({
      place_1: l,
      place_2: c,
      place_3: n,
      place_4: q,
      place_5: r,
      place_6: u,
      place_7: x,
      place_8: w,
    });
    l = [
      {
        x: 510,
        frame: 150,
      },
      {
        x: 930,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2,
        frame: 440,
      },
    ];
    c = [
      {
        x: 520,
        frame: 150,
      },
      {
        x: 1e3,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 250,
        frame: 440,
      },
    ];
    n = [
      {
        x: 570,
        frame: 150,
      },
      {
        x: 1030,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 450,
        frame: 440,
      },
    ];
    q = [
      {
        x: 550,
        frame: 150,
      },
      {
        x: 1130,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 690,
        frame: 440,
      },
    ];
    r = [
      {
        x: 490,
        frame: 150,
      },
      {
        x: 990,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 850,
        frame: 440,
      },
    ];
    u = [
      {
        x: 530,
        frame: 150,
      },
      {
        x: 850,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 950,
        frame: 440,
      },
    ];
    x = [
      {
        x: 490,
        frame: 150,
      },
      {
        x: 820,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1050,
        frame: 440,
      },
    ];
    w = [
      {
        x: 500,
        frame: 150,
      },
      {
        x: 750,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1200,
        frame: 440,
      },
    ];
    f.push({
      place_1: l,
      place_2: c,
      place_3: n,
      place_4: q,
      place_5: r,
      place_6: u,
      place_7: x,
      place_8: w,
    });
    l = [
      {
        x: 630,
        frame: 130,
      },
      {
        x: 650,
        frame: 80,
      },
      {
        x: 550,
        frame: 180,
      },
      {
        x: 950,
        frame: 300,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2,
        frame: 100,
      },
    ];
    c = [
      {
        x: 550,
        frame: 190,
      },
      {
        x: 650,
        frame: 100,
      },
      {
        x: 700,
        frame: 200,
      },
      {
        x: 900,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 300,
        frame: 100,
      },
    ];
    n = [
      {
        x: 570,
        frame: 130,
      },
      {
        x: 600,
        frame: 50,
      },
      {
        x: 450,
        frame: 230,
      },
      {
        x: 600,
        frame: 340,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 500,
        frame: 40,
      },
    ];
    q = [
      {
        x: 590,
        frame: 130,
      },
      {
        x: 540,
        frame: 50,
      },
      {
        x: 360,
        frame: 150,
      },
      {
        x: 460,
        frame: 250,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 710,
        frame: 210,
      },
    ];
    r = [
      {
        x: 520,
        frame: 130,
      },
      {
        x: 550,
        frame: 180,
      },
      {
        x: 300,
        frame: 180,
      },
      {
        x: 420,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 800,
        frame: 100,
      },
    ];
    u = [
      {
        x: 610,
        frame: 130,
      },
      {
        x: 600,
        frame: 90,
      },
      {
        x: 600,
        frame: 100,
      },
      {
        x: 800,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 950,
        frame: 270,
      },
    ];
    x = [
      {
        x: 540,
        frame: 130,
      },
      {
        x: 500,
        frame: 180,
      },
      {
        x: 250,
        frame: 180,
      },
      {
        x: 320,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1100,
        frame: 100,
      },
    ];
    w = [
      {
        x: 510,
        frame: 130,
      },
      {
        x: 500,
        frame: 90,
      },
      {
        x: 600,
        frame: 100,
      },
      {
        x: 700,
        frame: 200,
      },
      {
        x: ARRIVAL_X - HORSE_WIDTH / 2 - 1250,
        frame: 270,
      },
    ];
    f.push({
      place_1: l,
      place_2: c,
      place_3: n,
      place_4: q,
      place_5: r,
      place_6: u,
      place_7: x,
      place_8: w,
    });
  };
  this._initHorseInfo = function () {
    p = [];
    p[0] = {
      start: new createjs.Point(-HORSE_WIDTH, 405),
      scale: 0.48,
    };
    p[1] = {
      start: new createjs.Point(-HORSE_WIDTH, 464),
      scale: 0.54,
    };
    p[2] = {
      start: new createjs.Point(-HORSE_WIDTH, 523),
      scale: 0.61,
    };
    p[3] = {
      start: new createjs.Point(-HORSE_WIDTH, 582),
      scale: 0.68,
    };
    p[4] = {
      start: new createjs.Point(-HORSE_WIDTH, 641),
      scale: 0.75,
    };
    p[5] = {
      start: new createjs.Point(-HORSE_WIDTH, 700),
      scale: 0.83,
    };
    p[6] = {
      start: new createjs.Point(-HORSE_WIDTH, 759),
      scale: 0.92,
    };
    p[7] = {
      start: new createjs.Point(-HORSE_WIDTH, 854),
      scale: 1,
    };
  };
  this.getIndexForFiches = function (l) {
    for (var c = 0, n = 0; n < b.length; n++) b[n] === l && (c = n);
    return c;
  };
  this.getHorsePercentageArray = function () {
    for (var l = [], c = 0; c < k.length; c++)
      for (var n = Math.floor(k[c]), q = 0; q < n; q++) l.push(c);
    return (l = shuffle(l));
  };
  this.getHorseName = function (l) {
    return g[l];
  };
  this.getAllHorseNames = function () {
    return g;
  };
  this.getOddWin = function (l) {
    return k[l];
  };
  this.getOddPlace = function (l) {
    return d[l];
  };
  this.getOddShow = function (l) {
    return m[l];
  };
  this.getForecastOdd = function (l, c) {
    return h[l][c];
  };
  this.getRandomPath = function () {
    var l = Math.floor(Math.random() * f.length);
    console.log("random seq: " + l);
    return f[l];
  };
  this.getHorseInfo = function (l) {
    return p[l];
  };
  s_oGameSettings = this;
  this._init(a);
}
var s_oGameSettings = null;

function CPreloader() {
  var a, g, k, d, m, h, b, f, p;
  this._init = function () {
    s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
    s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
    s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
    s_oSpriteLibrary.loadSprites();
    p = new createjs.Container();
    s_oStage.addChild(p);
  };
  this.unload = function () {
    p.removeAllChildren();
  };
  this._onImagesLoaded = function () {};
  this._onAllImagesLoaded = function () {
    this.attachSprites();
    s_oMain.preloaderReady();
  };
  this.attachSprites = function () {
    var e = new createjs.Shape();
    e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    p.addChild(e);
    e = s_oSpriteLibrary.getSprite("200x200");
    b = createBitmap(e);
    b.regX = 0.5 * e.width;
    b.regY = 0.5 * e.height;
    b.x = CANVAS_WIDTH / 2;
    b.y = CANVAS_HEIGHT / 2 - 140;
    p.addChild(b);
    f = new createjs.Shape();
    f.graphics
      .beginFill("rgba(0,0,0,0.01)")
      .drawRoundRect(b.x - 100, b.y - 100, 200, 200, 10);
    p.addChild(f);
    b.mask = f;
    e = s_oSpriteLibrary.getSprite("progress_bar");
    d = createBitmap(e);
    d.x = CANVAS_WIDTH / 2 - e.width / 2;
    d.y = CANVAS_HEIGHT / 2 + 90;
    p.addChild(d);
    a = e.width;
    g = e.height;
    m = new createjs.Shape();
    m.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, 1, g);
    p.addChild(m);
    d.mask = m;
    k = new createjs.Text("", "30px " + PRIMARY_FONT, "#fff");
    k.x = CANVAS_WIDTH / 2;
    k.y = CANVAS_HEIGHT / 2 + 140;
    k.textBaseline = "alphabetic";
    k.textAlign = "center";
    p.addChild(k);
    h = new createjs.Shape();
    h.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    p.addChild(h);
    createjs.Tween.get(h)
      .to(
        {
          alpha: 0,
        },
        500
      )
      .call(function () {
        createjs.Tween.removeTweens(h);
        p.removeChild(h);
      });
  };
  this.refreshLoader = function (e) {
    k.text = e + "%";
    100 === e &&
      (s_oMain._onRemovePreloader(), (k.visible = !1), (d.visible = !1));
    m.graphics.clear();
    e = Math.floor((e * a) / 100);
    m.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, e, g);
  };
  this._init();
}

function CMain(a) {
  var g,
    k = 0,
    d = 0,
    m = STATE_LOADING,
    h,
    b;
  this.initContainer = function () {
    s_oCanvas = document.getElementById("canvas");
    s_oStage = new createjs.Stage(s_oCanvas);
    s_oStage.preventSelection = !1;
    createjs.Touch.enable(s_oStage, !0);
    s_bMobile = isMobile();
    !1 === s_bMobile && s_oStage.enableMouseOver(10);
    s_iPrevTime = new Date().getTime();
    createjs.Ticker.addEventListener("tick", this._update);
    createjs.Ticker.framerate = FPS;
    navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
    s_oSpriteLibrary = new CSpriteLibrary();
    h = new CPreloader();
  };
  this.preloaderReady = function () {
    s_oGameSettings = new CGameSettings(HORSE_DATA);
    s_oBetList = new CBetList();
    s_oMain._loadImages();
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || s_oMain._initSounds();
    g = !0;
  };
  this.soundLoaded = function () {
    k++;
    h.refreshLoader(Math.floor((k / d) * 100));
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
      filename: "trot",
      loop: !1,
      volume: 1,
      ingamename: "trot",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "car",
      loop: !1,
      volume: 1,
      ingamename: "car",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "photo",
      loop: !1,
      volume: 1,
      ingamename: "photo",
    });
    s_aSoundsInfo.push({
      path: "./sounds/",
      filename: "soundtrack",
      loop: !0,
      volume: 1,
      ingamename: "soundtrack",
    });
    d += s_aSoundsInfo.length;
    s_aSounds = [];
    for (var f = 0; f < s_aSoundsInfo.length; f++)
      this.tryToLoadSound(s_aSoundsInfo[f], !1);
  };
  this.tryToLoadSound = function (f, p) {
    setTimeout(
      function () {
        s_aSounds[f.ingamename] = new Howl({
          src: [f.path + f.filename + ".mp3"],
          autoplay: !1,
          preload: !0,
          loop: f.loop,
          volume: f.volume,
          onload: s_oMain.soundLoaded,
          onloaderror: function (e, l) {
            for (var c = 0; c < s_aSoundsInfo.length; c++)
              if (e === s_aSounds[s_aSoundsInfo[c].ingamename]._sounds[0]._id) {
                s_oMain.tryToLoadSound(s_aSoundsInfo[c], !0);
                break;
              }
          },
          onplayerror: function (e) {
            for (var l = 0; l < s_aSoundsInfo.length; l++)
              if (e === s_aSounds[s_aSoundsInfo[l].ingamename]._sounds[0]._id) {
                s_aSounds[s_aSoundsInfo[l].ingamename].once(
                  "unlock",
                  function () {
                    s_aSounds[s_aSoundsInfo[l].ingamename].play();
                    "soundtrack" === s_aSoundsInfo[l].ingamename &&
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
    s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
    s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
    s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
    s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
    s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
    s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
    s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
    s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
    s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png");
    s_oSpriteLibrary.addSprite(
      "but_fullscreen",
      "./sprites/but_fullscreen.png"
    );
    s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
    s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
    s_oSpriteLibrary.addSprite("arrow_left", "./sprites/arrow_left.png");
    s_oSpriteLibrary.addSprite("arrow_right", "./sprites/arrow_right.png");
    s_oSpriteLibrary.addSprite("fiche_0", "./sprites/fiche_0.png");
    s_oSpriteLibrary.addSprite("fiche_1", "./sprites/fiche_1.png");
    s_oSpriteLibrary.addSprite("fiche_2", "./sprites/fiche_2.png");
    s_oSpriteLibrary.addSprite("fiche_3", "./sprites/fiche_3.png");
    s_oSpriteLibrary.addSprite("fiche_4", "./sprites/fiche_4.png");
    s_oSpriteLibrary.addSprite("fiche_5", "./sprites/fiche_5.png");
    s_oSpriteLibrary.addSprite("bg_bet_panel", "./sprites/bg_bet_panel.jpg");
    s_oSpriteLibrary.addSprite("money_panel", "./sprites/money_panel.png");
    s_oSpriteLibrary.addSprite(
      "simple_bet_panel",
      "./sprites/simple_bet_panel.png"
    );
    s_oSpriteLibrary.addSprite(
      "forecast_panel",
      "./sprites/forecast_panel.png"
    );
    s_oSpriteLibrary.addSprite("bet_place", "./sprites/bet_place.png");
    s_oSpriteLibrary.addSprite(
      "fiche_highlight",
      "./sprites/fiche_highlight.png"
    );
    s_oSpriteLibrary.addSprite("odd_bg", "./sprites/odd_bg.png");
    s_oSpriteLibrary.addSprite("rank_panel", "./sprites/rank_panel.png");
    s_oSpriteLibrary.addSprite("panel_arrival", "./sprites/panel_arrival.png");
    s_oSpriteLibrary.addSprite("bibs", "./sprites/bibs.png");
    s_oSpriteLibrary.addSprite("but_skip", "./sprites/but_skip.png");
    s_oSpriteLibrary.addSprite("logo_menu", "./sprites/logo_menu.png");
    s_oSpriteLibrary.addSprite(
      "but_start_race",
      "./sprites/but_start_race.png"
    );
    s_oSpriteLibrary.addSprite("but_clear_bet", "./sprites/but_clear_bet.png");
    s_oSpriteLibrary.addSprite("fiche_panel", "./sprites/fiche_panel.png");
    s_oSpriteLibrary.addSprite("fill_bar", "./sprites/fill_bar.png");
    s_oSpriteLibrary.addSprite("win_panel", "./sprites/win_panel.png");
    s_oSpriteLibrary.addSprite("lose_panel", "./sprites/lose_panel.png");
    s_oSpriteLibrary.addSprite("car", "./sprites/car.png");
    s_oSpriteLibrary.addSprite("car_wheel", "./sprites/car_wheel.png");
    s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
    s_oSpriteLibrary.addSprite("but_skip_big", "./sprites/but_skip_big.png");
    s_oSpriteLibrary.addSprite("car_logo", "./sprites/car_logo.png");
    for (var f = 0; f < NUM_HORSES; f++) {
      s_oSpriteLibrary.addSprite(
        "bib_gui_" + f,
        "./sprites/bib_gui_" + f + ".png"
      );
      for (var p = 0; 32 > p; p++)
        s_oSpriteLibrary.addSprite(
          "runner_" + f + "_" + p,
          "./sprites/runners/runner_" + f + "/runner_" + f + "_" + p + ".png"
        );
    }
    s_oSpriteLibrary.addSprite("track_0", "./sprites/track_tiles/track_0.png");
    s_oSpriteLibrary.addSprite("track_1", "./sprites/track_tiles/track_1.png");
    s_oSpriteLibrary.addSprite("track_2", "./sprites/track_tiles/track_2.png");
    s_oSpriteLibrary.addSprite(
      "parallax_0",
      "./sprites/track_tiles/parallax_0.png"
    );
    s_oSpriteLibrary.addSprite(
      "parallax_1",
      "./sprites/track_tiles/parallax_1.png"
    );
    d += s_oSpriteLibrary.getNumSprites();
    s_oSpriteLibrary.loadSprites();
  };
  this._onImagesLoaded = function () {
    k++;
    h.refreshLoader(Math.floor((k / d) * 100));
  };
  this._onAllImagesLoaded = function () {};
  this._onRemovePreloader = function () {
    h.unload();
    s_oSoundTrack = playSound("soundtrack", 1, !0);
    this.gotoMenu();
  };
  this.setMoney = function (f) {};
  this.gotoMenu = function () {
    new CMenu();
    m = STATE_MENU;
  };
  this.gotoBetPanel = function () {
    new CBetPanel();
    m = STATE_BET_PANEL;
    $(s_oMain).trigger("start_session");
  };
  this.gotoGame = function (f) {
    b = new CGame(f);
    m = STATE_GAME;
  };
  this.stopUpdate = function () {
    g = !1;
    createjs.Ticker.paused = !0;
    $("#block_game").css("display", "block");
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || Howler.mute(!0);
  };
  this.startUpdate = function () {
    s_iPrevTime = new Date().getTime();
    g = !0;
    createjs.Ticker.paused = !1;
    $("#block_game").css("display", "none");
    (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) &&
      s_bAudioActive &&
      Howler.mute(!1);
  };
  this._update = function (f) {
    if (!1 !== g) {
      var p = new Date().getTime();
      s_iTimeElaps = p - s_iPrevTime;
      s_iCntTime += s_iTimeElaps;
      s_iCntFps++;
      s_iPrevTime = p;
      1e3 <= s_iCntTime &&
        ((s_iCurFps = s_iCntFps), (s_iCntTime -= 1e3), (s_iCntFps = 0));
      m === STATE_GAME && b.update();
      s_oStage.update(f);
    }
  };
  s_oMain = this;
  s_iCurMoney = a.money;
  s_iGameCash = a.game_cash;
  CHIP_VALUES = a.chip_values;
  MIN_BET = a.min_bet;
  MAX_BET = a.max_bet;
  WIN_OCCURRENCE = a.win_occurrence;
  AD_SHOW_COUNTER = a.num_levels_for_ads;
  SHOW_CREDITS = a.show_credits;
  ENABLE_FULLSCREEN = a.fullscreen;
  ENABLE_CHECK_ORIENTATION = a.check_orientation;
  NUM_CHIPS = CHIP_VALUES.length;
  s_bAudioActive = a.audio_enable_on_startup;
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
  s_oStage,
  s_oMain,
  s_oSpriteLibrary,
  s_oSoundTrack = null,
  s_oCanvas,
  s_iCurMoney,
  s_iGameCash,
  s_iAdCounter = 0,
  s_aSounds;

function CTextButton(a, g, k, d, m, h, b, f) {
  var p, e, l, c, n, q, r, u, x, w;
  this._init = function (t, z, B, D, C, A, y) {
    p = !1;
    e = 1;
    l = [];
    c = [];
    w = createBitmap(B);
    u = new createjs.Container();
    u.x = t;
    u.y = z;
    u.regX = B.width / 2;
    u.regY = B.height / 2;
    s_bMobile || (u.cursor = "pointer");
    u.addChild(w, x);
    f.addChild(u);
    x = new CTLText(
      u,
      10,
      5,
      B.width - 20,
      B.height - 10,
      y,
      "center",
      A,
      C,
      1,
      0,
      0,
      D,
      !0,
      !0,
      !1,
      !1
    );
    this._initListener();
  };
  this.unload = function () {
    u.off("mousedown", n);
    u.off("pressup", q);
    f.removeChild(u);
  };
  this.setVisible = function (t) {
    u.visible = t;
  };
  this.setAlign = function (t) {
    x.textAlign = t;
  };
  this.setTextX = function (t) {
    x.x = t;
  };
  this.setScale = function (t) {
    e = u.scaleX = u.scaleY = t;
  };
  this.enable = function () {
    p = !1;
  };
  this.disable = function () {
    p = !0;
  };
  this._initListener = function () {
    n = u.on("mousedown", this.buttonDown);
    q = u.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (t, z, B) {
    l[t] = z;
    c[t] = B;
  };
  this.addEventListenerWithParams = function (t, z, B, D) {
    l[t] = z;
    c[t] = B;
    r = D;
  };
  this.buttonRelease = function () {
    p ||
      (playSound("click", 1, !1),
      (u.scaleX = e),
      (u.scaleY = e),
      l[ON_MOUSE_UP] && l[ON_MOUSE_UP].call(c[ON_MOUSE_UP], r));
  };
  this.buttonDown = function () {
    p ||
      ((u.scaleX = 0.9 * e),
      (u.scaleY = 0.9 * e),
      l[ON_MOUSE_DOWN] && l[ON_MOUSE_DOWN].call(c[ON_MOUSE_DOWN]));
  };
  this.setPosition = function (t, z) {
    u.x = t;
    u.y = z;
  };
  this.tweenPosition = function (t, z, B, D, C, A, y) {
    createjs.Tween.get(u)
      .wait(D)
      .to(
        {
          x: t,
          y: z,
        },
        B,
        C
      )
      .call(function () {
        void 0 !== A && A.call(y);
      });
  };
  this.changeText = function (t) {
    x.refreshText(t);
  };
  this.setX = function (t) {
    u.x = t;
  };
  this.setY = function (t) {
    u.y = t;
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
  this._init(a, g, k, d, m, h, b);
}

function CToggle(a, g, k, d, m) {
  var h, b, f, p, e, l, c;
  this._init = function (n, q, r, u, x) {
    c = void 0 !== x ? x : s_oStage;
    b = [];
    f = [];
    x = new createjs.SpriteSheet({
      images: [r],
      frames: {
        width: r.width / 2,
        height: r.height,
        regX: r.width / 2 / 2,
        regY: r.height / 2,
      },
      animations: {
        state_true: [0],
        state_false: [1],
      },
    });
    h = u;
    p = createSprite(
      x,
      "state_" + h,
      r.width / 2 / 2,
      r.height / 2,
      r.width / 2,
      r.height
    );
    p.x = n;
    p.y = q;
    p.stop();
    s_bMobile || (p.cursor = "pointer");
    c.addChild(p);
    this._initListener();
  };
  this.unload = function () {
    p.off("mousedown", e);
    p.off("pressup", l);
    c.removeChild(p);
  };
  this._initListener = function () {
    e = p.on("mousedown", this.buttonDown);
    l = p.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (n, q, r) {
    b[n] = q;
    f[n] = r;
  };
  this.setCursorType = function (n) {
    p.cursor = n;
  };
  this.setActive = function (n) {
    h = n;
    p.gotoAndStop("state_" + h);
  };
  this.buttonRelease = function () {
    p.scaleX = 1;
    p.scaleY = 1;
    playSound("click", 1, 0);
    h = !h;
    p.gotoAndStop("state_" + h);
    b[ON_MOUSE_UP] && b[ON_MOUSE_UP].call(f[ON_MOUSE_UP], h);
  };
  this.buttonDown = function () {
    p.scaleX = 0.9;
    p.scaleY = 0.9;
    b[ON_MOUSE_DOWN] && b[ON_MOUSE_DOWN].call(f[ON_MOUSE_DOWN]);
  };
  this.setPosition = function (n, q) {
    p.x = n;
    p.y = q;
  };
  this._init(a, g, k, d, m);
}

function CGfxButton(a, g, k, d) {
  var m,
    h,
    b,
    f,
    p,
    e,
    l,
    c,
    n = !1;
  this._init = function (r, u, x) {
    m = [];
    h = [];
    f = [];
    b = createBitmap(x);
    b.x = r;
    b.y = u;
    e = p = 1;
    b.regX = x.width / 2;
    b.regY = x.height / 2;
    s_bMobile || (b.cursor = "pointer");
    q.addChild(b);
    this._initListener();
  };
  this.unload = function () {
    createjs.Tween.removeTweens(b);
    b.off("mousedown", l);
    b.off("pressup", c);
    q.removeChild(b);
  };
  this.setVisible = function (r) {
    b.visible = r;
  };
  this.setCursorType = function (r) {
    b.cursor = r;
  };
  this._initListener = function () {
    l = b.on("mousedown", this.buttonDown);
    c = b.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (r, u, x) {
    m[r] = u;
    h[r] = x;
  };
  this.addEventListenerWithParams = function (r, u, x, w) {
    m[r] = u;
    h[r] = x;
    f[r] = w;
  };
  this.buttonRelease = function () {
    n ||
      ((b.scaleX = 0 < p ? p : -p),
      (b.scaleY = e),
      playSound("click", 1, 0),
      m[ON_MOUSE_UP] && m[ON_MOUSE_UP].call(h[ON_MOUSE_UP], f[ON_MOUSE_UP]));
  };
  this.buttonDown = function () {
    n ||
      ((b.scaleX = 0 < p ? 0.9 * p : 0.9 * -p),
      (b.scaleY = 0.9 * e),
      m[ON_MOUSE_DOWN] &&
        m[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN], f[ON_MOUSE_DOWN]));
  };
  this.rotation = function (r) {
    b.rotation = r;
  };
  this.getButton = function () {
    return b;
  };
  this.setPosition = function (r, u) {
    b.x = r;
    b.y = u;
  };
  this.setX = function (r) {
    b.x = r;
  };
  this.setY = function (r) {
    b.y = r;
  };
  this.getButtonImage = function () {
    return b;
  };
  this.block = function (r) {
    n = r;
    b.scaleX = p;
    b.scaleY = e;
  };
  this.setScaleX = function (r) {
    p = b.scaleX = r;
  };
  this.setScale = function (r) {
    e = p = r;
    b.scaleX = b.scaleY = r;
  };
  this.getX = function () {
    return b.x;
  };
  this.getY = function () {
    return b.y;
  };
  this.pulseAnimation = function () {
    createjs.Tween.get(b, {
      loop: -1,
    })
      .to(
        {
          scaleX: 0.9 * p,
          scaleY: 0.9 * e,
        },
        850,
        createjs.Ease.quadOut
      )
      .to(
        {
          scaleX: p,
          scaleY: e,
        },
        650,
        createjs.Ease.quadIn
      );
  };
  this.removeAllTweens = function () {
    createjs.Tween.removeTweens(b);
  };
  var q = void 0 !== d ? d : s_oStage;
  this._init(a, g, k);
  return this;
}

function CMenu() {
  var a,
    g,
    k,
    d,
    m,
    h,
    b,
    f,
    p,
    e,
    l,
    c,
    n,
    q,
    r,
    u = null,
    x,
    w = null,
    t = null,
    z;
  this._init = function () {
    l = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
    s_oStage.addChild(l);
    var B = s_oSpriteLibrary.getSprite("but_play");
    p = CANVAS_WIDTH / 2;
    e = CANVAS_HEIGHT - B.height / 2 - 10;
    c = new CGfxButton(p, e, B);
    c.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
    B = s_oSpriteLibrary.getSprite("but_credits");
    SHOW_CREDITS
      ? ((m = 10 + B.width / 2),
        (h = B.height / 2 + 10),
        (r = new CGfxButton(m, h, B)),
        r.addEventListener(ON_MOUSE_UP, this._onCredits, this),
        (k = m + B.width + 10),
        (d = h))
      : ((k = 10 + B.width / 2), (d = B.height / 2 + 10));
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile)
      (B = s_oSpriteLibrary.getSprite("audio_icon")),
        (b = CANVAS_WIDTH - B.width / 4 - 10),
        (f = B.height / 2 + 10),
        (q = new CToggle(b, f, B, s_bAudioActive, s_oStage)),
        q.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
    B = window.document;
    var D = B.documentElement;
    w =
      D.requestFullscreen ||
      D.mozRequestFullScreen ||
      D.webkitRequestFullScreen ||
      D.msRequestFullscreen;
    t =
      B.exitFullscreen ||
      B.mozCancelFullScreen ||
      B.webkitExitFullscreen ||
      B.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (w = !1);
    w &&
      screenfull.isEnabled &&
      ((B = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (x = new CToggle(k, d, B, s_bFullscreen, s_oStage)),
      x.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    B = s_oSpriteLibrary.getSprite("logo_menu");
    a = CANVAS_WIDTH / 2;
    g = 10;
    z = createBitmap(B);
    z.regX = B.width / 2;
    z.x = a;
    z.y = g;
    s_oStage.addChild(z);
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
        s_oStage.removeChild(n);
      });
    this.refreshButtonPos();
  };
  this.unload = function () {
    c.unload();
    c = null;
    SHOW_CREDITS && r.unload();
    s_oStage.removeChild(l);
    l = null;
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) q.unload(), (q = null);
    w && screenfull.isEnabled && x.unload();
    s_oMenu = null;
  };
  this.refreshButtonPos = function () {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      q.setPosition(b - s_iOffsetX, f + s_iOffsetY);
    w && screenfull.isEnabled && x.setPosition(k + s_iOffsetX, d + s_iOffsetY);
    c.setPosition(p, e - s_iOffsetY);
    SHOW_CREDITS && r.setPosition(m + s_iOffsetX, h + s_iOffsetY);
    null !== u && u.refreshButtonPos();
    z.y = g + s_iOffsetY;
  };
  this.exitFromCredits = function () {
    u = null;
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this._onCredits = function () {
    u = new CCreditsPanel();
  };
  this._onButPlayRelease = function () {
    this.unload();
    s_oMain.gotoBetPanel();
  };
  this.resetFullscreenBut = function () {
    w && screenfull.isEnabled && x.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? t.call(window.document)
      : w.call(window.document.documentElement);
    sizeHandler();
  };
  s_oMenu = this;
  this._init();
}
var s_oMenu = null;

function CGame(a) {
  var g, k, d, m, h, b, f, p, e, l, c, n, q, r, u, x, w, t, z, B, D, C;
  this._init = function () {
    m = d = g = !1;
    f = b = 0;
    r = s_oGameSettings.getAllHorseNames();
    setVolume("soundtrack", 0);
    s_oTweenController = new CTweenController();
    x = new createjs.Container();
    s_oStage.addChild(x);
    t = new CBgController(x);
    B = new CRankingGui(r, s_oStage);
    D = new CArrivalPanel(CANVAS_WIDTH, 246, s_oStage);
    z = new CInterface();
    this.generateFinalRank();
    this._prepareHorses();
    B.setStep(p + 180);
    w = new createjs.Shape();
    w.graphics.beginFill("white").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    w.alpha = 0;
    s_oStage.addChild(w);
    $(s_oMain).trigger("start_level", 1);
    C = new createjs.Text("", "40px " + PRIMARY_FONT, "#000");
    C.textAlign = "center";
    C.textBaseline = "alphabetic";
    C.x = CANVAS_WIDTH / 2;
    C.y = 220;
    s_oGame.startRace();
    l = setTimeout(function () {
      s_oGame.startHorses();
    }, 3e3);
    u = new CCar(x);
    playSound("trot", 1, !1);
    playSound("car", 1, !1);
    this.refreshButtonPos();
  };
  this.unload = function () {
    stopSound("trot");
    z.unload();
    createjs.Tween.removeAllTweens();
    s_oStage.removeAllChildren();
    clearInterval(l);
    s_oGame = null;
  };
  this.refreshButtonPos = function () {
    z.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    B.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    D.refreshButtonPos(s_iOffsetX, s_iOffsetY);
  };
  this.pause = function () {
    g = !1;
    pauseSound("trot");
    u.pause(!0);
    t.pause(!0);
    for (var A = 0; A < NUM_HORSES; A++) q[A].pauseAnim();
  };
  this.unpause = function () {
    g = !0;
    playSound("trot", 1, !1);
    u.pause(!1);
    t.pause(!1);
    for (var A = 0; A < NUM_HORSES; A++) q[A].unpauseAnim();
  };
  this.onExit = function () {
    setVolume("soundtrack", 1);
    s_oGame.unload();
    s_oMain.gotoMenu();
    $(s_oMain).trigger("end_session");
    $(s_oMain).trigger("show_interlevel_ad");
    $(s_oMain).trigger("share_event", [s_iCurMoney]);
  };
  this.gotoBetPanel = function () {
    setVolume("soundtrack", 1);
    s_oGame.unload();
    s_oMain.gotoBetPanel();
  };
  this.startRace = function () {
    z.blockExit(!1);
    g = !0;
    t.startTrack();
  };
  this.generateFinalRank = function () {
    s_oBetList.getMinWin() > s_iGameCash
      ? this._generateLosingResult()
      : 100 * Math.random() < WIN_OCCURRENCE
      ? this._generateWinResult()
      : this._generateLosingResult();
    h = parseFloat(h.toFixed(2));
  };
  this._generateWinResult = function () {
    k = !0;
    do {
      c = this._generateRandomRank();
      var A = s_oBetList.getTotWinWithCurRank(c);
      h = A.tot_win;
    } while (h <= a);
    n = A.win_list;
  };
  this._generateLosingResult = function () {
    k = !1;
    do {
      c = this._generateRandomRank();
      var A = s_oBetList.getTotWinWithCurRank(c);
      h = A.tot_win;
    } while (h > a);
    n = A.win_list;
  };
  this._generateRandomRank = function () {
    for (
      var A = [], y = s_oGameSettings.getHorsePercentageArray();
      A.length < NUM_HORSES;

    ) {
      var J = y[Math.floor(Math.random() * y.length)];
      A.unshift(J);
      for (var M = y.length - 1; 0 <= M; ) y[M] === J && y.splice(M, 1), M--;
    }
    return A;
  };
  this._prepareHorses = function () {
    q = [];
    for (
      var A = s_oGameSettings.getRandomPath(), y = (p = e = 0);
      y < A.place_1.length;
      y++
    )
      p += A.place_1[y].frame;
    console.log("_aFinalRank " + c);
    for (y = 0; y < NUM_HORSES; y++) {
      var J = s_oGameSettings.getHorseInfo(y),
        M = c.indexOf(y);
      q[y] = new CHorse(J.start, y, r[y], J.scale, A["place_" + (M + 1)], M, x);
    }
  };
  this.startHorses = function () {
    for (var A = 0; A < NUM_HORSES; A++) q[A].startRace();
  };
  this.horsePhotofinish = function (A, y) {
    z.blockExit(!0);
    D.refreshRank(A, y);
    b++;
    4 > b
      ? ((g = !1), (f = TIME_CHECK_RANK), this._playFlashAnim())
      : 6 === b && this.endRace();
  };
  this.endRace = function () {
    k || 0 < h
      ? ((s_iCurMoney += h),
        (s_iGameCash -= h),
        (s_iCurMoney = parseFloat(s_iCurMoney.toFixed(2))),
        (s_iGameCash = parseFloat(s_iGameCash.toFixed(2))),
        z.showWinPanel(h, n, c))
      : z.showLosePanel(c);
    stopSound("trot");
    setVolume("soundtrack", 1);
    $(s_oMain).trigger("save_score", s_iCurMoney);
  };
  this.checkHorseArrival = function () {
    d = !0;
    this._refreshRank();
  };
  this._playFlashAnim = function () {
    for (var A = 0; A < NUM_HORSES; A++) q[A].pauseAnim();
    playSound("photo", 1, !1);
    createjs.Tween.get(w)
      .to(
        {
          alpha: 0.8,
        },
        200
      )
      .call(function () {
        var y = new createjs.ColorMatrix().adjustSaturation(-100);
        x.filters = [new createjs.ColorMatrixFilter(y)];
        x.cache(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        m = !0;
        createjs.Tween.get(w)
          .to(
            {
              alpha: 0,
            },
            400
          )
          .call(function () {
            s_oGame.restoreRaceAfterFlash();
          });
      });
  };
  this.restoreRaceAfterFlash = function () {
    setTimeout(function () {
      for (var A = 0; A < NUM_HORSES; A++) q[A].unpauseAnim();
      x.filters = [];
      x.cache(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      g = !0;
    }, 1e3);
  };
  this._refreshRank = function () {
    for (var A = [], y = 0; y < NUM_HORSES; y++) {
      var J = q[y].getX();
      A[y] = {
        index: y,
        x: J,
      };
    }
    A.sort(this.compareXPos);
    B.refreshRank(A);
  };
  this.compareXPos = function (A, y) {
    return A.x > y.x ? -1 : A.x < y.x ? 1 : 0;
  };
  this.returnInBetPanel = function () {
    s_iAdCounter++;
    s_iAdCounter === AD_SHOW_COUNTER &&
      ((s_iAdCounter = 0), $(s_oMain).trigger("show_interlevel_ad"));
    s_oGame.gotoBetPanel();
  };
  this.readyForArrival = function () {
    z.hideSkip();
    t.readyForArrival();
  };
  this.onSkip = function () {
    g && (this.pause(), this.endRace());
  };
  this.update = function () {
    if (g) {
      e++;
      t.update();
      B.refreshRadar(e);
      for (var A = 0; A < NUM_HORSES; A++) q[A].update(d);
      m && x.updateCache();
      f += s_iTimeElaps;
      f > TIME_CHECK_RANK && !d && ((f = 0), this._refreshRank());
    }
  };
  s_oGame = this;
  this._init();
}
var s_oGame = null,
  s_oTweenController;

function CInterface() {
  var a,
    g,
    k,
    d,
    m,
    h,
    b,
    f,
    p,
    e,
    l = null,
    c = null,
    n,
    q,
    r,
    u,
    x;
  this._init = function () {
    var w = s_oSpriteLibrary.getSprite("but_exit");
    a = CANVAS_WIDTH - w.width / 2 - 10;
    g = w.height / 2 + 10;
    n = new CGfxButton(a, g, w);
    n.block(!0);
    n.addEventListener(ON_MOUSE_UP, this._onExit, this);
    !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
      ? ((w = s_oSpriteLibrary.getSprite("audio_icon")),
        (b = a - w.width / 2 - 10),
        (f = g),
        (p = new CToggle(b, f, w, s_bAudioActive, s_oStage)),
        p.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
        (m = b - w.width / 2 - 10),
        (h = f))
      : ((m = a - w.width - 10), (h = g));
    w = window.document;
    var t = w.documentElement;
    l =
      t.requestFullscreen ||
      t.mozRequestFullScreen ||
      t.webkitRequestFullScreen ||
      t.msRequestFullscreen;
    c =
      w.exitFullscreen ||
      w.mozCancelFullScreen ||
      w.webkitExitFullscreen ||
      w.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (l = !1);
    l &&
      screenfull.isEnabled &&
      ((w = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (e = new CToggle(m, h, w, s_bFullscreen, s_oStage)),
      e.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    w = s_oSpriteLibrary.getSprite("but_skip");
    k = CANVAS_WIDTH - w.width / 2 - 10;
    d = CANVAS_HEIGHT - w.height / 2 - 220;
    q = new CGfxButton(k, d, w, s_oStage);
    q.addEventListener(ON_MOUSE_UP, this._onSkip, this);
    u = new CLosePanel(s_oStage);
    r = new CWinPanel(s_oStage);
    x = new CAreYouSurePanel(s_oStage);
  };
  this.refreshButtonPos = function () {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      p.setPosition(b - s_iOffsetX, f + s_iOffsetY);
    l && screenfull.isEnabled && e.setPosition(m - s_iOffsetX, h + s_iOffsetY);
    n.setPosition(a - s_iOffsetX, g + s_iOffsetY);
    q.setPosition(k - s_iOffsetX, d - s_iOffsetY);
  };
  this.showWinPanel = function (w, t, z) {
    r.show(w, t, z);
  };
  this.showLosePanel = function (w) {
    u.show(w);
  };
  this.unload = function () {
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) p.unload(), (p = null);
    l && screenfull.isEnabled && e.unload();
    q.unload();
    r.unload();
    u.unload();
    x.unload();
    s_oInterface = null;
  };
  this.blockExit = function (w) {
    n.block(w);
  };
  this._onExit = function () {
    s_oGame.pause();
    x.show();
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this.resetFullscreenBut = function () {
    l && screenfull.isEnabled && e.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? c.call(window.document)
      : l.call(window.document.documentElement);
    sizeHandler();
  };
  this.hideSkip = function () {
    q.setVisible(!1);
  };
  this._onSkip = function () {
    s_oGame.onSkip();
  };
  s_oInterface = this;
  this._init();
  return this;
}
var s_oInterface = null;

function CCreditsPanel() {
  var a, g, k, d, m, h, b, f, p, e, l, c;
  this._init = function () {
    l = new createjs.Container();
    s_oStage.addChild(l);
    f = new createjs.Shape();
    f.graphics.beginFill("#000").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    f.alpha = 0.7;
    e = f.on("click", this._onLogoButRelease);
    l.addChild(f);
    var n = s_oSpriteLibrary.getSprite("msg_box");
    k = -n.width / 2;
    d = CANVAS_HEIGHT / 2;
    g = CANVAS_WIDTH / 2;
    c = new createjs.Container();
    c.x = k;
    c.y = d;
    c.regX = n.width / 2;
    c.regY = n.height / 2;
    l.addChild(c);
    m = createBitmap(n);
    c.addChild(m);
    var q = s_oSpriteLibrary.getSprite("but_exit");
    a = n.width;
    b = new CGfxButton(a, 0, q, c);
    b.addEventListener(ON_MOUSE_UP, this.unload, this);
    q = s_oSpriteLibrary.getSprite("logo_ctl");
    h = createBitmap(q);
    h.regX = q.width / 2;
    h.regY = q.height / 2;
    h.x = n.width / 2;
    h.y = n.height / 2 - 50;
    c.addChild(h);
    p = new createjs.Text(
      "www.codethislab.com",
      "36px " + PRIMARY_FONT,
      "#fff"
    );
    p.textAlign = "center";
    p.textBaseline = "alphabetic";
    p.x = n.width / 2;
    p.y = n.height / 2 + 220;
    c.addChild(p);
    createjs.Tween.get(c).to(
      {
        x: g,
      },
      500,
      createjs.Ease.backOut
    );
  };
  this.unload = function () {
    f.off("click", e);
    b.unload();
    b = null;
    s_oStage.removeChild(l);
    s_oMenu.exitFromCredits();
  };
  this._onLogoButRelease = function () {
    window.open("http://www.codethislab.com/index.php?&l=en", "_blank");
  };
  this._init();
}

function CBetPanel() {
  var a,
    g,
    k,
    d,
    m,
    h,
    b,
    f,
    p,
    e,
    l,
    c,
    n = null,
    q = null,
    r,
    u,
    x,
    w,
    t,
    z,
    B,
    D,
    C;
  this._init = function () {
    p = b = 0;
    l = [];
    C = new createjs.Container();
    s_oStage.addChild(C);
    var A = createBitmap(s_oSpriteLibrary.getSprite("bg_bet_panel"));
    C.addChild(A);
    var y = s_oSpriteLibrary.getSprite("but_exit");
    m = CANVAS_WIDTH - y.width / 2 - 10;
    h = y.height / 2 + 10;
    z = new CGfxButton(m, h, y, C);
    z.addEventListener(ON_MOUSE_UP, this.onExit, this);
    !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile
      ? ((A = s_oSpriteLibrary.getSprite("audio_icon")),
        (k = m - y.width - 10),
        (d = A.height / 2 + 10),
        (B = new CToggle(k, d, A, s_bAudioActive, s_oStage)),
        B.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this),
        (a = k - A.width / 2 - 10),
        (g = d))
      : ((a = m - y.width - 10), (g = h));
    A = window.document;
    y = A.documentElement;
    n =
      y.requestFullscreen ||
      y.mozRequestFullScreen ||
      y.webkitRequestFullScreen ||
      y.msRequestFullscreen;
    q =
      A.exitFullscreen ||
      A.mozCancelFullScreen ||
      A.webkitExitFullscreen ||
      A.msExitFullscreen;
    !1 === ENABLE_FULLSCREEN && (n = !1);
    n &&
      screenfull.isEnabled &&
      ((A = s_oSpriteLibrary.getSprite("but_fullscreen")),
      (c = new CToggle(a, g, A, s_bFullscreen, s_oStage)),
      c.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
    y = s_oSpriteLibrary.getSprite("simple_bet_panel");
    BET_PANEL_WIDTH = y.width;
    BET_PANEL_HEIGHT = y.height;
    D = new createjs.Container();
    D.x = BET_PANEL_X;
    D.y = BET_PANEL_Y;
    C.addChild(D);
    e = [];
    e[0] = new CSimpleBetPanel(0, 0, D);
    e[1] = new CForecastPanel(BET_PANEL_WIDTH, 0, D);
    A = s_oSpriteLibrary.getSprite("money_panel");
    w = new CChipPanel(BET_PANEL_X + y.width + A.width / 2, 396, C);
    r = new createjs.Shape();
    r.graphics
      .beginFill("rgba(255,255,255,0.01)")
      .drawRect(
        BET_PANEL_X + 6,
        BET_PANEL_Y,
        BET_PANEL_WIDTH - 12,
        BET_PANEL_HEIGHT
      );
    C.addChild(r);
    D.mask = r;
    f = 0;
    u = new CGfxButton(
      BET_PANEL_X + 8,
      CANVAS_HEIGHT / 2,
      s_oSpriteLibrary.getSprite("arrow_left"),
      C
    );
    u.addEventListener(ON_MOUSE_UP, this._onArrowLeft, this);
    x = new CGfxButton(
      BET_PANEL_X + y.width - 10,
      CANVAS_HEIGHT / 2,
      s_oSpriteLibrary.getSprite("arrow_right"),
      C
    );
    x.addEventListener(ON_MOUSE_UP, this._onArrowRight, this);
    t = new CMsgBox(C);
    s_oBetList.reset();
    this.refreshButtonPos();
  };
  this.unload = function () {
    u.unload();
    x.unload();
    z.unload();
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) || B.unload();
    n && screenfull.isEnabled && c.unload();
    t.unload();
    w.unload();
    for (var A = 0; A < e.length; A++) e[A].unload();
    s_oStage.removeAllChildren();
  };
  this.refreshButtonPos = function () {
    (!1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile) ||
      B.setPosition(k - s_iOffsetX, d + s_iOffsetY);
    n && screenfull.isEnabled && c.setPosition(a - s_iOffsetX, g + s_iOffsetY);
    z.setPosition(m - s_iOffsetX, h + s_iOffsetY);
  };
  this.setChipSelected = function (A) {
    p = A;
  };
  this.setMoney = function (A) {
    s_iCurMoney = A;
    w.refreshMoney();
  };
  this.setSimpleBet = function (A, y, J, M) {
    if (J > s_iCurMoney + b) return t.show(TEXT_NO_MONEY, !0), !1;
    if (b + J > MAX_BET) return t.show(TEXT_ERR_MAX_BET, !1), !1;
    s_oBetList.addSimpleBet(A, y, J);
    b += J;
    b = Number(b.toFixed(2));
    s_iCurMoney -= J;
    s_iCurMoney = parseFloat(s_iCurMoney.toFixed(2));
    s_iGameCash += J;
    s_iGameCash = parseFloat(s_iGameCash.toFixed(2));
    w.refreshMoney();
    w.refreshBet(b);
    l.push(M);
    return !0;
  };
  this.setForecastBet = function (A, y, J, M) {
    if (J > s_iCurMoney + b) return t.show(TEXT_NO_MONEY, !0), !1;
    if (b + J > MAX_BET) return t.show(TEXT_ERR_MAX_BET, !1), !1;
    s_oBetList.addForecastBet(A, y, J);
    b += J;
    b = Number(b.toFixed(2));
    s_iCurMoney -= J;
    s_iCurMoney = parseFloat(s_iCurMoney.toFixed(2));
    s_iGameCash += J;
    s_iGameCash = parseFloat(s_iGameCash.toFixed(2));
    w.refreshMoney();
    w.refreshBet(b);
    l.push(M);
    return !0;
  };
  this.refreshPagePos = function (A, y) {
    D.x = BET_PANEL_X;
    e[f].setX(0);
    e[A].setX(y);
  };
  this.clearBet = function () {
    for (var A = 0; A < l.length; A++) l[A].clearBet();
    s_iCurMoney += b;
    s_iCurMoney = parseFloat(s_iCurMoney.toFixed(2));
    s_iGameCash -= b;
    s_iGameCash = parseFloat(s_iGameCash.toFixed());
    b = 0;
    e[0].clearBet();
    s_oBetList.reset();
    w.refreshBet(0);
    w.refreshMoney();
  };
  this._onArrowLeft = function () {
    var A = f;
    f++;
    f === e.length && ((f = 0), (A = e.length - 1));
    e[f].setX(BET_PANEL_WIDTH);
    createjs.Tween.get(D)
      .to(
        {
          x: -BET_PANEL_WIDTH + BET_PANEL_X,
        },
        500,
        createjs.Ease.cubicOut
      )
      .call(function () {
        s_oBetPanel.refreshPagePos(A, BET_PANEL_WIDTH);
      });
  };
  this._onArrowRight = function () {
    var A = f;
    f--;
    0 > f && (f = e.length - 1);
    e[f].setX(-BET_PANEL_WIDTH);
    createjs.Tween.get(D)
      .to(
        {
          x: BET_PANEL_X + BET_PANEL_WIDTH,
        },
        500,
        createjs.Ease.cubicOut
      )
      .call(function () {
        s_oBetPanel.refreshPagePos(A, -BET_PANEL_WIDTH);
      });
  };
  this.onStartExit = function () {
    b < MIN_BET
      ? t.show(TEXT_ERR_MIN_BET, !1)
      : (this.unload(),
        s_oMain.gotoGame(b),
        $(s_oMain).trigger("bet_placed", b));
  };
  this.onExit = function () {
    $(s_oMain).trigger("end_session");
    this.unload();
    s_oMain.gotoMenu();
  };
  this._onAudioToggle = function () {
    Howler.mute(s_bAudioActive);
    s_bAudioActive = !s_bAudioActive;
  };
  this.resetFullscreenBut = function () {
    n && screenfull.isEnabled && c.setActive(s_bFullscreen);
  };
  this._onFullscreenRelease = function () {
    s_bFullscreen
      ? q.call(window.document)
      : n.call(window.document.documentElement);
    sizeHandler();
  };
  this.getChipSelected = function () {
    return p;
  };
  s_oBetPanel = this;
  this._init();
}
var s_oBetPanel = null;

function CChipPanel(a, g, k) {
  var d, m, h, b, f, p, e, l, c;
  this._init = function (q, r) {
    d = q;
    m = r;
    c = new createjs.Container();
    c.x = d;
    c.y = m;
    n.addChild(c);
    var u = 0;
    l = new CTextButton(
      0,
      u,
      s_oSpriteLibrary.getSprite("but_clear_bet"),
      TEXT_CLEAR_BET,
      PRIMARY_FONT,
      "#fff",
      24,
      c
    );
    l.addEventListener(ON_MOUSE_UP, this._onClearBet, this);
    u += 34;
    var x = s_oSpriteLibrary.getSprite("money_panel"),
      w = createBitmap(s_oSpriteLibrary.getSprite("money_panel"));
    w.regX = x.width / 2;
    w.y = u;
    c.addChild(w);
    new CTLText(
      c,
      -90,
      50,
      180,
      22,
      22,
      "center",
      "#ffde00",
      SECONDARY_FONT,
      1,
      0,
      0,
      TEXT_MIN_BET + ": " + MIN_BET + TEXT_CURRENCY,
      !0,
      !0,
      !1,
      !1
    );
    new CTLText(
      c,
      -90,
      70,
      180,
      22,
      22,
      "center",
      "#ffde00",
      SECONDARY_FONT,
      1,
      0,
      0,
      TEXT_MAX_BET + ": " + MAX_BET + TEXT_CURRENCY,
      !0,
      !0,
      !1,
      !1
    );
    u += 80;
    w = createBitmap(s_oSpriteLibrary.getSprite("money_panel"));
    w.regX = x.width / 2;
    w.y = u;
    c.addChild(w);
    new CTLText(
      c,
      -90,
      114,
      180,
      28,
      28,
      "left",
      "#fff",
      TERTIARY_FONT,
      1,
      0,
      0,
      TEXT_BET,
      !0,
      !0,
      !1,
      !1
    );
    p = new CTLText(
      c,
      -90,
      135,
      180,
      32,
      32,
      "center",
      "#ffde00",
      SECONDARY_FONT,
      1,
      0,
      0,
      "0" + TEXT_CURRENCY,
      !0,
      !0,
      !1,
      !1
    );
    u += 80;
    w = createBitmap(x);
    w.regX = x.width / 2;
    w.y = u;
    c.addChild(w);
    new CTLText(
      c,
      -90,
      194,
      180,
      28,
      28,
      "left",
      "#fff",
      TERTIARY_FONT,
      1,
      0,
      0,
      TEXT_MONEY,
      !0,
      !0,
      !1,
      !1
    );
    f = new CTLText(
      c,
      -90,
      216,
      180,
      32,
      32,
      "center",
      "#ffde00",
      SECONDARY_FONT,
      1,
      0,
      0,
      s_iCurMoney + TEXT_CURRENCY,
      !0,
      !0,
      !1,
      !1
    );
    u += 80;
    this._initChips(u);
    e = new CButStartRace(
      0,
      u + 210,
      s_oSpriteLibrary.getSprite("but_start_race"),
      TEXT_START_RACE,
      "#fff",
      24,
      c
    );
    e.addEventListener(ON_MOUSE_UP, this._onStartRace, this);
  };
  this.unload = function () {
    for (var q = 0; q < h; q++) h[q].unload();
    e.unload();
  };
  this._initChips = function (q) {
    var r = s_oSpriteLibrary.getSprite("fiche_panel"),
      u = new createjs.Container();
    u.y = q;
    u.regX = r.width / 2;
    c.addChild(u);
    q = createBitmap(r);
    u.addChild(q);
    q = [
      {
        x: 45,
        y: 40,
      },
      {
        x: 115,
        y: 40,
      },
      {
        x: 185,
        y: 40,
      },
      {
        x: 45,
        y: 112,
      },
      {
        x: 115,
        y: 112,
      },
      {
        x: 185,
        y: 112,
      },
    ];
    h = [];
    for (r = 0; r < NUM_CHIPS; r++)
      (h[r] = new CFicheBut(r, q[r].x, q[r].y, 1, u)),
        h[r].addEventListenerWithParams(
          ON_MOUSE_UP,
          this._onFicheClicked,
          this,
          r
        );
    q = s_oSpriteLibrary.getSprite("fiche_highlight");
    b = createBitmap(q);
    b.regX = q.width / 2;
    b.regY = q.height / 2;
    b.x = h[0].getX();
    b.y = h[0].getY();
    u.addChild(b);
  };
  this.refreshMoney = function () {
    f.refreshText(s_iCurMoney + TEXT_CURRENCY);
  };
  this.refreshBet = function (q) {
    p.refreshText(q + TEXT_CURRENCY);
  };
  this._onStartRace = function () {
    s_oBetPanel.onStartExit();
  };
  this._onClearBet = function () {
    s_oBetPanel.clearBet();
  };
  this._onFicheClicked = function (q) {
    b.x = h[q].getX();
    b.y = h[q].getY();
    s_oBetPanel.setChipSelected(q);
  };
  var n = k;
  this._init(a, g);
}

function CSimpleBetPanel(a, g, k) {
  var d, m, h, b, f;
  this._init = function (e, l) {
    f = new createjs.Container();
    f.x = e;
    f.y = l;
    p.addChild(f);
    var c = createBitmap(s_oSpriteLibrary.getSprite("simple_bet_panel"));
    f.addChild(c);
    new CTLText(
      f,
      30,
      16,
      168,
      30,
      30,
      "center",
      "#fff",
      PRIMARY_FONT,
      1,
      0,
      0,
      TEXT_TRAP,
      !0,
      !0,
      !1,
      !1
    );
    new CTLText(
      f,
      220,
      16,
      168,
      30,
      30,
      "center",
      "#fff",
      PRIMARY_FONT,
      1,
      0,
      0,
      TEXT_WINS,
      !0,
      !0,
      !1,
      !1
    );
    new CTLText(
      f,
      390,
      16,
      168,
      30,
      30,
      "center",
      "#fff",
      PRIMARY_FONT,
      1,
      0,
      0,
      TEXT_PLACE,
      !0,
      !0,
      !1,
      !1
    );
    new CTLText(
      f,
      565,
      16,
      168,
      30,
      30,
      "center",
      "#fff",
      PRIMARY_FONT,
      1,
      0,
      0,
      TEXT_SHOW,
      !0,
      !0,
      !1,
      !1
    );
    new CTLText(
      f,
      745,
      16,
      168,
      30,
      30,
      "center",
      "#fff",
      PRIMARY_FONT,
      1,
      0,
      0,
      TEXT_TRAP,
      !0,
      !0,
      !1,
      !1
    );
    new CTLText(
      f,
      935,
      16,
      168,
      30,
      30,
      "center",
      "#fff",
      PRIMARY_FONT,
      1,
      0,
      0,
      TEXT_WINS,
      !0,
      !0,
      !1,
      !1
    );
    new CTLText(
      f,
      1105,
      16,
      168,
      30,
      30,
      "center",
      "#fff",
      PRIMARY_FONT,
      1,
      0,
      0,
      TEXT_PLACE,
      !0,
      !0,
      !1,
      !1
    );
    new CTLText(
      f,
      1275,
      16,
      168,
      30,
      30,
      "center",
      "#fff",
      PRIMARY_FONT,
      1,
      0,
      0,
      TEXT_SHOW,
      !0,
      !0,
      !1,
      !1
    );
    c = s_oSpriteLibrary.getSprite("bibs");
    for (
      var n = new createjs.SpriteSheet({
          images: [c],
          frames: {
            width: c.width / 4,
            height: c.height / 2,
          },
          animations: {
            bib_0: 0,
            bib_1: 1,
            bib_2: 2,
            bib_3: 3,
            bib_4: 4,
            bib_5: 5,
            bib_6: 6,
            bib_7: 7,
          },
        }),
        q = 55,
        r = 36,
        u = 0;
      u < NUM_HORSES;
      u++
    ) {
      var x = createSprite(n, "bib_" + u, 0, 0, c.width / 3, c.height / 2);
      x.x = r;
      x.y = q;
      x.scaleX = x.scaleY = 0.5;
      f.addChild(x);
      u === NUM_HORSES / 2 - 1
        ? ((r = 743), (q = 55))
        : (q += c.height / 2 + 71);
    }
    this._initHorseInfos();
    this._initBetPlaces();
  };
  this._initHorseInfos = function () {
    var e = s_oGameSettings.getAllHorseNames();
    d = [];
    for (var l = 128, c = 200, n = 0; n < NUM_HORSES; n++) {
      var q = new CHorse(
        {
          x: l,
          y: c,
        },
        n,
        " ",
        0.22,
        [],
        null,
        f
      );
      d.push(q);
      new CTLText(
        f,
        l - 80,
        c,
        158,
        22,
        22,
        "left",
        "#fff",
        TERTIARY_FONT,
        1,
        0,
        0,
        e[n].toUpperCase(),
        !0,
        !0,
        !1,
        !1
      );
      n === NUM_HORSES / 2 - 1 ? ((l = 838), (c = 200)) : (c += 182);
    }
  };
  this._initBetPlaces = function () {
    h = [];
    b = [];
    m = [];
    for (
      var e = 237, l = 118, c = s_oSpriteLibrary.getSprite("bet_place"), n = 0;
      n < NUM_HORSES;
      n++
    ) {
      var q = new createjs.Text(
        s_oGameSettings.getOddWin(n),
        "30px " + PRIMARY_FONT,
        "#fff"
      );
      q.textAlign = "center";
      q.textBaseline = "middle";
      q.x = e + 60;
      q.y = l + 85;
      f.addChild(q);
      q = new CButBet(
        q.x + 3,
        l,
        c,
        0.7,
        {
          x: 12,
          y: 8,
        },
        f
      );
      q.addEventListenerWithParams(ON_MOUSE_UP, this._onWinClicked, this, n);
      m.push(q);
      q = new createjs.Text(
        s_oGameSettings.getOddPlace(n),
        "30px " + PRIMARY_FONT,
        "#fff"
      );
      q.textAlign = "center";
      q.textBaseline = "middle";
      q.x = e + 237;
      q.y = l + 85;
      f.addChild(q);
      q = new CButBet(
        q.x + 3,
        l,
        c,
        0.7,
        {
          x: 12,
          y: 8,
        },
        f
      );
      q.addEventListenerWithParams(ON_MOUSE_UP, this._onPlaceClicked, this, n);
      h.push(q);
      q = new createjs.Text(
        s_oGameSettings.getOddShow(n),
        "30px " + PRIMARY_FONT,
        "#fff"
      );
      q.textAlign = "center";
      q.textBaseline = "middle";
      q.x = e + 411;
      q.y = l + 85;
      f.addChild(q);
      q = new CButBet(
        q.x + 3,
        l,
        c,
        0.7,
        {
          x: 12,
          y: 8,
        },
        f
      );
      q.addEventListenerWithParams(ON_MOUSE_UP, this._onShowClicked, this, n);
      b.push(q);
      n === NUM_HORSES / 2 - 1 ? ((e = 952), (l = 118)) : (l += 183);
    }
  };
  this.unload = function () {
    for (var e = 0; e < h.length; e++)
      m[e].unload(), b[e].unload(), h[e].unload();
  };
  this.setX = function (e) {
    f.x = e;
  };
  this.clearBet = function () {
    for (var e = 0; e < d.length; e++) d[e].resetAnim();
  };
  this._onWinClicked = function (e) {
    var l = CHIP_VALUES[s_oBetPanel.getChipSelected()];
    s_oBetPanel.setSimpleBet(e, 1, l, m[e]) &&
      ("anim" !== d[e].getCurAnim() && d[e].setAnim("anim"),
      m[e].increaseBet(l));
  };
  this._onPlaceClicked = function (e) {
    var l = CHIP_VALUES[s_oBetPanel.getChipSelected()];
    s_oBetPanel.setSimpleBet(e, 2, l, h[e]) &&
      ("anim" !== d[e].getCurAnim() && d[e].setAnim("anim"),
      h[e].increaseBet(l));
  };
  this._onShowClicked = function (e) {
    var l = CHIP_VALUES[s_oBetPanel.getChipSelected()];
    s_oBetPanel.setSimpleBet(e, 3, l, b[e]) &&
      ("anim" !== d[e].getCurAnim() && d[e].setAnim("anim"),
      b[e].increaseBet(l));
  };
  this.getContainer = function () {
    return f;
  };
  var p = k;
  this._init(a, g);
}

function CForecastPanel(a, g, k) {
  var d, m;
  this._init = function () {
    m = new createjs.Container();
    m.x = a;
    m.y = g;
    h.addChild(m);
    var b = createBitmap(s_oSpriteLibrary.getSprite("forecast_panel"));
    m.addChild(b);
    this._initForecastBets();
  };
  this.unload = function () {
    for (var b in d) -1 < b.indexOf("forecast_") && d[b].unload();
  };
  this._initForecastBets = function () {
    d = [];
    for (
      var b = [
          {
            x: 46,
            y: 15,
          },
          {
            x: 405,
            y: 15,
          },
          {
            x: 759,
            y: 15,
          },
          {
            x: 1113,
            y: 15,
          },
          {
            x: 46,
            y: 405,
          },
          {
            x: 405,
            y: 405,
          },
          {
            x: 759,
            y: 405,
          },
          {
            x: 1113,
            y: 405,
          },
        ],
        f = 0;
      f < NUM_HORSES;
      f++
    )
      this._placeForecastBetForHorse(f, b[f].x, b[f].y);
  };
  this._placeForecastBetForHorse = function (b, f, p) {
    var e = s_oSpriteLibrary.getSprite("odd_bg"),
      l = s_oSpriteLibrary.getSprite("bet_place"),
      c = s_oSpriteLibrary.getSprite("bibs"),
      n = c.width / 4,
      q = c.height / 2;
    c = new createjs.SpriteSheet({
      images: [c],
      frames: {
        width: n,
        height: q,
      },
      animations: {
        bib_0: [0],
        bib_1: [1],
        bib_2: [2],
        bib_3: [3],
        bib_4: [4],
        bib_5: [5],
        bib_6: [6],
        bib_7: [7],
      },
    });
    for (var r = 0; r < NUM_HORSES; r++)
      if (r !== b) {
        var u = createSprite(c, "bib_" + b, 0, 0, n, q);
        u.x = f;
        u.y = p;
        u.scaleX = u.scaleY = 0.5;
        m.addChild(u);
        var x = new createjs.Text("X", "12px " + PRIMARY_FONT, "#fff");
        x.textAlign = "center";
        x.textBaseline = "middle";
        x.x = f + 0.5 * n + 10;
        x.y = p + (0.5 * q) / 2;
        m.addChild(x);
        var w = createSprite(c, "bib_" + r, 0, 0, n / 3, q / 2);
        w.x = x.x + 10;
        w.y = u.y;
        w.scaleX = w.scaleY = 0.5;
        m.addChild(w);
        x = createBitmap(e);
        x.x = w.x + 0.5 * n + 10;
        x.y = u.y + 2;
        m.addChild(x);
        u = new createjs.Text(
          s_oGameSettings.getForecastOdd(b, r),
          "24px " + PRIMARY_FONT,
          "#fff"
        );
        u.textAlign = "center";
        u.textBaseline = "alphabetic";
        u.x = x.x + e.width / 2;
        u.y = x.y + e.height / 2 + 8;
        m.addChild(u);
        u = new CButBet(
          x.x + e.width + (0.72 * l.width) / 2 + 5,
          x.y + (0.72 * l.height) / 2 - 2,
          l,
          0.45,
          {
            x: 20,
            y: 16,
          },
          m
        );
        u.setScale(0.6);
        u.addEventListenerWithParams(
          ON_MOUSE_UP,
          this._onForecastClicked,
          this,
          {
            first: b,
            second: r,
          }
        );
        d["forecast_" + b + "_" + r] = u;
        p += 0.5 * (q - 14) + 3;
      }
  };
  this.setX = function (b) {
    m.x = b;
  };
  this._onForecastClicked = function (b) {
    var f = CHIP_VALUES[s_oBetPanel.getChipSelected()];
    s_oBetPanel.setForecastBet(
      b.first,
      b.second,
      f,
      d["forecast_" + b.first + "_" + b.second]
    ) && d["forecast_" + b.first + "_" + b.second].increaseBet(f);
  };
  var h = k;
  this._init(a, g);
}

function CBetList() {
  var a, g, k;
  this._init = function () {
    this.reset();
  };
  this.reset = function () {
    a = [];
    for (var d = 0; d < NUM_HORSES; d++)
      (a[d] = []), (a[d].place_1 = 0), (a[d].place_2 = 0), (a[d].place_3 = 0);
    g = [];
    for (d = 0; d < NUM_HORSES; d++) {
      g[d] = [];
      for (var m = 0; m < NUM_HORSES; m++) g[d][m] = 0;
    }
    k = [];
  };
  this.addSimpleBet = function (d, m, h) {
    a[d]["place_" + m] += h;
    var b = 0;
    switch (m) {
      case 1:
        b = h * s_oGameSettings.getOddWin(d);
        break;
      case 2:
        b = h * s_oGameSettings.getOddPlace(d);
        break;
      case 3:
        b = h * s_oGameSettings.getOddShow(d);
    }
    k.push({
      type_bet: "simple",
      horses: [
        {
          index: d,
          place: m,
        },
      ],
      bet: h,
      win: b,
    });
  };
  this.addForecastBet = function (d, m, h) {
    g[d][m] += h;
    k.push({
      type_bet: "forecast",
      horses: [
        {
          index: d,
          place: 1,
        },
        {
          index: m,
          place: 2,
        },
      ],
      bet: h,
      win: h * s_oGameSettings.getForecastOdd(d, m),
    });
  };
  this.getMinWin = function () {
    if (0 < k.length) {
      for (var d = k[0].win, m = 1; m < k.length; m++)
        d > k[m].win && (d = k[m].win);
      return d;
    }
    return 0;
  };
  this.getTotWinWithCurRank = function (d) {
    var m = 0,
      h = [];
    if (0 < a[d[0]].place_1) {
      var b = a[d[0]].place_1 * s_oGameSettings.getOddWin(d[0]);
      b = parseFloat(b.toFixed(2));
      m += b;
      h.push({
        win: b,
        horses: d[0],
        bet: a[d[0]].place_1,
        type: "win",
      });
    }
    0 < a[d[0]].place_2 &&
      ((b = a[d[0]].place_2 * s_oGameSettings.getOddPlace(d[0])),
      (b = parseFloat(b.toFixed(2))),
      (m += b),
      h.push({
        win: b,
        horses: d[0],
        bet: a[d[0]].place_2,
        type: "place",
      }));
    0 < a[d[1]].place_2 &&
      ((b = a[d[1]].place_2 * s_oGameSettings.getOddPlace(d[1])),
      (b = parseFloat(b.toFixed(2))),
      (m += b),
      h.push({
        win: b,
        horses: d[1],
        bet: a[d[1]].place_2,
        type: "place",
      }));
    0 < a[d[0]].place_3 &&
      ((b = a[d[0]].place_3 * parseFloat(s_oGameSettings.getOddShow(d[0]))),
      (b = parseFloat(b.toFixed(2))),
      (m += b),
      h.push({
        win: b,
        horses: d[0],
        bet: a[d[0]].place_3,
        type: "show",
      }));
    0 < a[d[1]].place_3 &&
      ((b = a[d[1]].place_3 * s_oGameSettings.getOddShow(d[1])),
      (b = parseFloat(b.toFixed(2))),
      (m += b),
      h.push({
        win: b,
        horses: d[1],
        bet: a[d[1]].place_3,
        type: "show",
      }));
    0 < a[d[2]].place_3 &&
      ((b = a[d[2]].place_3 * s_oGameSettings.getOddShow(d[2])),
      (b = parseFloat(b.toFixed(2))),
      (m += b),
      h.push({
        win: b,
        horses: d[2],
        bet: a[d[2]].place_3,
        type: "show",
      }));
    0 < g[d[0]][d[1]] &&
      ((b = g[d[0]][d[1]] * s_oGameSettings.getForecastOdd(d[0], d[1])),
      (b = parseFloat(b.toFixed(2))),
      (m += b),
      h.push({
        win: b,
        horses: [d[0], d[1]],
        bet: g[d[0]][d[1]],
        type: "forecast",
      }));
    return {
      tot_win: m,
      win_list: h,
    };
  };
  s_oBetList = this;
  this._init();
}
var s_oBetList = null;

function CFichesController(a, g, k) {
  var d, m, h, b, f, p, e;
  this._init = function (c, n) {
    m = n;
    b = c;
    f = new createjs.Container();
    f.x = b.x;
    f.y = b.y;
    f.regX = FICHE_WIDTH / 2;
    f.regY = FICHE_WIDTH / 2;
    l.addChild(f);
    p = new createjs.Container();
    l.addChild(p);
    e = new createjs.Text("", 28 * n + "px " + PRIMARY_FONT, "#fff");
    e.textAlign = "center";
    p.addChild(e);
    d = h = 0;
  };
  this.addEventListener = function (c, n, q) {};
  this.reset = function () {
    d = 0;
    f.removeAllChildren();
    f.x = b.x;
    f.y = b.y;
    e.text = "";
  };
  this.setPrevValue = function (c) {
    h = c;
  };
  this.refreshFiches = function (c, n, q) {
    c = c.sortOn("value", "index");
    for (
      var r = n + (FICHE_WIDTH * g) / 2,
        u = q + (FICHE_WIDTH * g) / 2,
        x = (d = 0),
        w = 0;
      w < c.length;
      w++
    )
      new CFicheBut(c[w].index, r, u, g, f).disable(),
        (u -= 5),
        x++,
        9 < x && ((x = 0), (r += FICHE_WIDTH), (u = q)),
        (d += c[w].value);
    playSound("chip", 1, 0);
    e.x = n;
    e.y = q + 38 * m;
    e.text = d.toFixed(2) + TEXT_CURRENCY;
  };
  this.createFichesPile = function (c, n, q) {
    this.reset();
    var r = CHIP_VALUES,
      u = [];
    do {
      for (var x = r[r.length - 1], w = r.length - 1; x > c; ) w--, (x = r[w]);
      w = Math.floor(c / x);
      for (var t = 0; t < w; t++)
        u.push({
          value: x,
          index: s_oGameSettings.getIndexForFiches(x),
        });
      x = Math.floor(c / x) === c / x ? 0 : c % x;
      c = x.toFixed(2);
    } while (0 < x);
    this.refreshFiches(u, n, q * m);
  };
  this.getValue = function () {
    return d;
  };
  this.getPrevBet = function () {
    return h;
  };
  var l = k;
  this._init(a, g);
}

function CButBet(a, g, k, d, m, h) {
  var b,
    f,
    p,
    e,
    l,
    c,
    n,
    q,
    r,
    u = !1,
    x,
    w;
  this._init = function (z, B, D, C, A) {
    b = 0;
    f = [];
    p = [];
    l = [];
    w = new createjs.Container();
    w.x = z;
    w.y = B;
    t.addChild(w);
    e = createBitmap(D);
    n = c = 1;
    e.regX = D.width / 2;
    e.regY = D.height / 2;
    s_bMobile || (w.cursor = "pointer");
    w.addChild(e);
    this._initListener();
    x = new CFichesController(A, C, w);
  };
  this.unload = function () {
    createjs.Tween.removeTweens(e);
    w.off("mousedown", q);
    w.off("pressup", r);
    t.removeChild(w);
  };
  this.setVisible = function (z) {
    e.visible = z;
  };
  this.setCursorType = function (z) {
    e.cursor = z;
  };
  this._initListener = function () {
    q = w.on("mousedown", this.buttonDown);
    r = w.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (z, B, D) {
    f[z] = B;
    p[z] = D;
  };
  this.addEventListenerWithParams = function (z, B, D, C) {
    f[z] = B;
    p[z] = D;
    l[z] = C;
  };
  this.buttonRelease = function () {
    u ||
      ((e.scaleX = 0 < c ? c : -c),
      (e.scaleY = n),
      playSound("chip", 1, 0),
      f[ON_MOUSE_UP] && f[ON_MOUSE_UP].call(p[ON_MOUSE_UP], l[ON_MOUSE_UP]));
  };
  this.buttonDown = function () {
    u ||
      ((e.scaleX = 0 < c ? 0.9 * c : 0.9 * -c),
      (e.scaleY = 0.9 * n),
      f[ON_MOUSE_DOWN] &&
        f[ON_MOUSE_DOWN].call(p[ON_MOUSE_DOWN], l[ON_MOUSE_DOWN]));
  };
  this.rotation = function (z) {
    e.rotation = z;
  };
  this.getButton = function () {
    return e;
  };
  this.setPosition = function (z, B) {
    e.x = z;
    e.y = B;
  };
  this.setX = function (z) {
    e.x = z;
  };
  this.setY = function (z) {
    e.y = z;
  };
  this.getButtonImage = function () {
    return e;
  };
  this.block = function (z) {
    u = z;
    e.scaleX = c;
    e.scaleY = n;
  };
  this.setScaleX = function (z) {
    c = e.scaleX = z;
  };
  this.setScale = function (z) {
    n = c = z;
    e.scaleX = e.scaleY = z;
  };
  this.increaseBet = function (z) {
    b += z;
    x.createFichesPile(b.toFixed(2), 0, -4);
  };
  this.clearBet = function () {
    b = 0;
    x.reset();
  };
  this.getX = function () {
    return e.x;
  };
  this.getY = function () {
    return e.y;
  };
  this.pulseAnimation = function () {
    createjs.Tween.get(e, {
      loop: -1,
    })
      .to(
        {
          scaleX: 0.9 * c,
          scaleY: 0.9 * n,
        },
        850,
        createjs.Ease.quadOut
      )
      .to(
        {
          scaleX: c,
          scaleY: n,
        },
        650,
        createjs.Ease.quadIn
      );
  };
  this.removeAllTweens = function () {
    createjs.Tween.removeTweens(e);
  };
  this.getTotBet = function () {
    return b;
  };
  var t = void 0 !== h ? h : s_oStage;
  this._init(a, g, k, d, m);
  return this;
}

function CMsgBox(a) {
  var g, k, d, m, h, b, f, p, e, l;
  this._init = function () {
    f = new createjs.Container();
    f.visible = !1;
    a.addChild(f);
    b = new createjs.Shape();
    b.graphics.beginFill("#000").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    b.alpha = 0.7;
    b.on("click", function () {});
    f.addChild(b);
    var c = s_oSpriteLibrary.getSprite("msg_box");
    k = -c.width / 2;
    d = CANVAS_HEIGHT / 2;
    g = CANVAS_WIDTH / 2;
    p = new createjs.Container();
    p.x = k;
    p.y = d;
    p.regX = c.width / 2;
    p.regY = c.height / 2;
    f.addChild(p);
    m = createBitmap(c);
    p.addChild(m);
    h = new CTLText(
      p,
      20,
      160,
      c.width - 40,
      140,
      70,
      "center",
      "#fff",
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
    e = new CTextButton(
      c.width / 2,
      400,
      s_oSpriteLibrary.getSprite("but_clear_bet"),
      TEXT_RECHARGE,
      PRIMARY_FONT,
      "#fff",
      30,
      p
    );
    e.setVisible(!1);
    e.addEventListener(ON_MOUSE_UP, this._onRecharge, this);
    l = new CGfxButton(
      c.width - 60,
      60,
      s_oSpriteLibrary.getSprite("but_exit"),
      p
    );
    l.addEventListener(ON_MOUSE_UP, this._onExit, this);
  };
  this.unload = function () {
    e.unload();
    l.unload();
  };
  this.show = function (c, n) {
    h.refreshText(c);
    f.visible = !0;
    createjs.Tween.get(p).to(
      {
        x: g,
      },
      500,
      createjs.Ease.backOut
    );
    n ? e.setVisible(!0) : e.setVisible(!1);
  };
  this._onExit = function () {
    f.visible = !1;
  };
  this._onRecharge = function () {
    $(s_oMain).trigger("recharge");
    f.visible = !1;
  };
  this._init();
  return this;
}

function CHorse(a, g, k, d, m, h, b) {
  var f, p, e, l, c, n, q, r, u, x, w, t, z, B;
  this._init = function (C, A, y, J, M) {
    e = p = !1;
    l = A;
    r = 0;
    u = ARRIVAL_X - (HORSE_WIDTH / 2) * J + 70;
    w = y;
    t = M;
    0 < t.length && (x = t[r].x);
    B = new createjs.Container();
    B.x = C.x;
    B.y = C.y;
    B.scaleX = B.scaleY = 1.25 * J;
    B.regX = HORSE_WIDTH / 2;
    B.regY = HORSE_HEIGHT;
    D.addChild(B);
    C = [];
    for (A = 0; 32 > A; A++)
      C.push(s_oSpriteLibrary.getSprite("runner_" + l + "_" + A));
    C = new createjs.SpriteSheet({
      images: C,
      frames: {
        width: HORSE_WIDTH,
        height: HORSE_HEIGHT,
      },
      animations: {
        idle: 0,
        anim: [0, 16],
        start: 0,
        anim_1: [1, 16, "anim"],
        anim_2: [6, 16, "anim"],
        anim_3: [11, 16, "anim"],
        sprint: [17, 31],
      },
    });
    z = createSprite(C, "idle", 0, 0, HORSE_WIDTH, HORSE_HEIGHT);
    B.addChild(z);
  };
  this.startRace = function () {
    z.gotoAndPlay("anim_" + (Math.floor(3 * Math.random()) + 1));
    q = B.x;
    c = 0;
    n = t[r].frame;
    f = !0;
  };
  this.setVisible = function (C) {
    B.visible = C;
  };
  this.pauseAnim = function () {
    z.paused = !0;
  };
  this.unpauseAnim = function () {
    z.paused = !1;
  };
  this.resetAnim = function () {
    z.gotoAndStop("idle");
  };
  this.setAnim = function (C) {
    z.gotoAndPlay(C);
  };
  this.getX = function () {
    return B.x;
  };
  this.getCurAnim = function () {
    return z.currentAnimation;
  };
  this.skip = function () {
    e = !1;
    c = n;
    r = t.length;
  };
  this.update = function (C) {
    if (f) {
      if (e)
        C &&
          (c++,
          (A = s_oTweenController.easeLinear(c, 0, 1, n)),
          (A = s_oTweenController.tweenValue(q, x, A)),
          (B.x = A));
      else if ((c++, c >= n))
        r++,
          r < t.length
            ? ((c = 0),
              (n = t[r].frame),
              (q = B.x),
              (x = t[r].x),
              r === t.length - 1 && z.gotoAndPlay("sprint"))
            : (s_oGame.readyForArrival(),
              (e = !0),
              (c = 0),
              (n = 60 + 5 * h),
              (q = B.x),
              (x = CANVAS_WIDTH + HORSE_WIDTH));
      else {
        var A = s_oTweenController.easeLinear(c, 0, 1, n);
        A = s_oTweenController.tweenValue(q, x, A);
        B.x = A;
      }
      C && !p && B.x >= u && ((p = !0), s_oGame.horsePhotofinish(l, w));
    }
  };
  var D = b;
  this._init(a, g, k, d, m);
}

function CTweenController() {
  this.tweenValue = function (a, g, k) {
    return a + k * (g - a);
  };
  this.easeLinear = function (a, g, k, d) {
    return (k * a) / d + g;
  };
  this.easeInCubic = function (a, g, k, d) {
    d = (a /= d) * a * a;
    return g + k * d;
  };
  this.easeBackInQuart = function (a, g, k, d) {
    d = (a /= d) * a;
    return g + k * (2 * d * d + 2 * d * a + -3 * d);
  };
  this.easeInBack = function (a, g, k, d) {
    return k * (a /= d) * a * (2.70158 * a - 1.70158) + g;
  };
  this.easeOutCubic = function (a, g, k, d) {
    return k * ((a = a / d - 1) * a * a + 1) + g;
  };
  this.getTrajectoryPoint = function (a, g) {
    var k = new createjs.Point(),
      d = (1 - a) * (1 - a),
      m = a * a;
    k.x = d * g.start.x + 2 * (1 - a) * a * g.traj.x + m * g.end.x;
    k.y = d * g.start.y + 2 * (1 - a) * a * g.traj.y + m * g.end.y;
    return k;
  };
}

function CRankingGui(a, g) {
  var k, d, m, h, b, f, p, e;
  this._init = function (c) {
    var n = s_oSpriteLibrary.getSprite("rank_panel");
    k = CANVAS_HEIGHT - n.height + 4;
    e = new createjs.Container();
    e.x = 0;
    e.y = k;
    l.addChild(e);
    n = createBitmap(n);
    e.addChild(n);
    b = [];
    b[0] = new createjs.Point(1482, 70);
    b[1] = new createjs.Point(1292, 70);
    b[2] = new createjs.Point(1098, 70);
    b[3] = new createjs.Point(901, 70);
    b[4] = new createjs.Point(711, 70);
    b[5] = new createjs.Point(507, 70);
    b[6] = new createjs.Point(317, 70);
    b[7] = new createjs.Point(136, 70);
    this._initBibs(c);
    c = s_oSpriteLibrary.getSprite("fill_bar");
    f = createBitmap(c);
    f.x = 205;
    f.y = 180;
    e.addChild(f);
    d = c.width;
    p = new createjs.Shape();
    p.graphics
      .beginFill("rgba(255,255,255,0.01)")
      .drawRect(f.x, f.y - 2, 0.01, 10);
    e.addChild(p);
    f.mask = p;
    this.refreshButtonPos();
  };
  this.refreshButtonPos = function () {
    e.y = k - s_iOffsetY;
  };
  this.setStep = function (c) {
    m = d / c;
  };
  this._initBibs = function (c) {
    h = [];
    for (var n = 0; n < NUM_HORSES; n++) {
      var q = new createjs.Container();
      q.x = b[n].x;
      q.y = b[n].y;
      e.addChild(q);
      var r = createBitmap(s_oSpriteLibrary.getSprite("bib_gui_" + n));
      q.addChild(r);
      new CTLText(
        q,
        -26,
        0,
        100,
        19,
        19,
        "right",
        "#fff",
        TERTIARY_FONT,
        1,
        0,
        0,
        c[n].toUpperCase(),
        !0,
        !0,
        !1,
        !1
      );
      h.push(q);
    }
  };
  this.refreshRank = function (c) {
    for (var n = 0; n < c.length; n++)
      createjs.Tween.get(h[c[n].index]).to(
        {
          x: b[n].x,
        },
        1e3,
        createjs.Ease.cubicOut
      );
  };
  this.refreshRadar = function (c) {
    c *= m;
    c > d ||
      (p.graphics.clear(),
      p.graphics
        .beginFill("rgba(255,255,255,0.01)")
        .drawRect(f.x, f.y - 2, c, 10));
  };
  var l = g;
  this._init(a);
}

function CArrivalPanel(a, g, k) {
  var d, m, h, b, f, p, e, l;
  this._init = function (n, q) {
    b = !1;
    f = 0;
    m = n;
    h = q;
    l = new createjs.Container();
    l.x = m;
    l.y = h;
    c.addChild(l);
    var r = s_oSpriteLibrary.getSprite("panel_arrival"),
      u = createBitmap(r);
    l.addChild(u);
    d = CANVAS_WIDTH - r.width - s_iOffsetX;
    r = s_oSpriteLibrary.getSprite("bibs");
    u = r.width / 4;
    var x = r.height / 2;
    r = new createjs.SpriteSheet({
      images: [r],
      frames: {
        width: u,
        height: x,
      },
      animations: {
        bib_0: [0],
        bib_1: [1],
        bib_2: [2],
        bib_3: [3],
        bib_4: [4],
        bib_5: [5],
        bib_6: [6],
        bib_7: [7],
      },
    });
    p = [];
    e = [];
    for (var w = 4, t = 0; t < NUM_HORSES; t++) {
      var z = createSprite(r, "bib_0", 0, 0, u, x);
      z.x = 10;
      z.y = w;
      z.visible = !1;
      z.scaleX = z.scaleY = 0.45;
      l.addChild(z);
      e.push(z);
      z = new CTLText(
        l,
        z.x + 0.45 * u + 5,
        z.y + 5,
        120,
        20,
        16,
        "left",
        "#fff",
        TERTIARY_FONT,
        1,
        0,
        0,
        " ",
        !0,
        !0,
        !1,
        !1
      );
      p.push(z);
      w += 0.45 * x + 1;
    }
  };
  this.refreshButtonPos = function () {
    l.x = b ? d - s_iOffsetX : m - s_iOffsetX;
  };
  this.show = function () {
    b = !0;
    createjs.Tween.get(l).to(
      {
        x: d,
      },
      500,
      createjs.Ease.cubicOut
    );
  };
  this.hide = function () {
    b = !1;
    createjs.Tween.get(l).to(
      {
        x: m,
      },
      500,
      createjs.Ease.cubicOut
    );
  };
  this.refreshRank = function (n, q) {
    p[f].refreshText(q);
    e[f].gotoAndStop("bib_" + n);
    e[f].visible = !0;
    0 === f && this.show();
    f++;
  };
  var c = k;
  this._init(a, g);
}

function CWinPanel(a) {
  var g, k, d, m, h, b, f, p, e, l, c, n;
  this._init = function () {
    c = new createjs.Container();
    f = c.on("click", function () {});
    c.visible = !1;
    q.addChild(c);
    p = new createjs.Shape();
    p.graphics.beginFill("#000").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    p.alpha = 0.7;
    f = p.on("click", function () {});
    c.addChild(p);
    var r = s_oSpriteLibrary.getSprite("win_panel");
    k = -r.width / 2;
    d = CANVAS_HEIGHT / 2;
    g = CANVAS_WIDTH / 2;
    n = new createjs.Container();
    n.x = k;
    n.y = d;
    n.regX = r.width / 2;
    n.regY = r.height / 2;
    c.addChild(n);
    r = createBitmap(r);
    n.addChild(r);
    r = s_oSpriteLibrary.getSprite("bibs");
    m = r.width / 4;
    h = r.height / 2;
    b = new createjs.SpriteSheet({
      images: [r],
      frames: {
        width: m,
        height: h,
      },
      animations: {
        bib_0: [0],
        bib_1: [1],
        bib_2: [2],
        bib_3: [3],
        bib_4: [4],
        bib_5: [5],
        bib_6: [6],
        bib_7: [7],
      },
    });
    l = new CTLText(
      n,
      580,
      524,
      280,
      150,
      60,
      "center",
      "#ffde00",
      SECONDARY_FONT,
      1,
      0,
      0,
      TEXT_WIN,
      !0,
      !0,
      !0,
      !1
    );
    e = new CGfxButton(984, 600, s_oSpriteLibrary.getSprite("but_skip_big"), n);
    e.addEventListener(ON_MOUSE_UP, this.onSkip, this);
  };
  this.unload = function () {
    c.off("click", f);
    e.unload();
  };
  this.show = function (r, u, x) {
    l.refreshText(TEXT_WIN + "\n\n" + r + TEXT_CURRENCY);
    r = 156;
    for (var w = 0; 3 > w; w++)
      new CHorse(
        {
          x: 890,
          y: r,
        },
        x[w],
        " ",
        0.39,
        [],
        null,
        n
      ),
        (r += 160);
    r = 40;
    for (x = 0; x < u.length; x++) {
      if ("forecast" === u[x].type) {
        var t = u[x].horses,
          z = createSprite(b, "bib_" + t[0], 0, 0, m, h);
        z.x = 30;
        z.y = r;
        z.scaleX = z.scaleY = 0.5;
        n.addChild(z);
        w = new createjs.Text("X", "20px " + PRIMARY_FONT, "#fff");
        w.textAlign = "center";
        w.textBaseline = "middle";
        w.x = z.x + 0.5 * m + 10;
        w.y = r + 18;
        n.addChild(w);
        t = createSprite(b, "bib_" + t[1], 0, 0, m, h);
        t.x = w.x + 10;
        t.y = r;
        t.scaleX = t.scaleY = 0.5;
        n.addChild(t);
        w = t.x + 60;
      } else
        (z = createSprite(b, "bib_" + u[x].horses, 0, 0, m, h)),
          (z.x = 30),
          (z.y = r),
          (z.scaleX = z.scaleY = 0.5),
          n.addChild(z),
          (w = z.x + 60);
      new CTLText(
        n,
        w,
        r + 10,
        100,
        40,
        40,
        "left",
        "#ffb400",
        PRIMARY_FONT,
        1,
        0,
        0,
        u[x].type.toUpperCase(),
        !0,
        !0,
        !1,
        !1
      );
      new CTLText(
        n,
        w + 150,
        r + 10,
        280,
        40,
        40,
        "left",
        "#fff",
        PRIMARY_FONT,
        1,
        0,
        0,
        TEXT_WIN + ": " + u[x].win + TEXT_CURRENCY,
        !0,
        !0,
        !1,
        !1
      );
      r += 55;
    }
    c.visible = !0;
    createjs.Tween.get(n).to(
      {
        x: g,
      },
      500,
      createjs.Ease.backOut
    );
  };
  this.onSkip = function () {
    s_oGame.returnInBetPanel();
  };
  var q = a;
  this._init();
}

function CLosePanel(a) {
  var g, k, d, m, h, b, f, p, e, l, c, n;
  this._init = function () {
    n = new createjs.Container();
    n.visible = !1;
    q.addChild(n);
    e = new createjs.Shape();
    e.graphics.beginFill("#000").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    e.alpha = 0.7;
    p = e.on("click", function () {});
    n.addChild(e);
    var r = s_oSpriteLibrary.getSprite("lose_panel");
    k = -r.width / 2;
    d = CANVAS_HEIGHT / 2;
    g = CANVAS_WIDTH / 2;
    c = new createjs.Container();
    c.x = k;
    c.y = d;
    c.regX = r.width / 2;
    c.regY = r.height / 2;
    n.addChild(c);
    var u = createBitmap(r);
    c.addChild(u);
    new CTLText(
      c,
      r.width / 2 - 200,
      60,
      400,
      50,
      50,
      "center",
      "#fff",
      PRIMARY_FONT,
      1,
      0,
      0,
      TEXT_NO_WIN,
      !0,
      !0,
      !1,
      !1
    );
    u = s_oSpriteLibrary.getSprite("bibs");
    m = u.width / 4;
    h = u.height / 2;
    f = new createjs.SpriteSheet({
      images: [u],
      frames: {
        width: m,
        height: h,
      },
      animations: {
        bib_0: [0],
        bib_1: [1],
        bib_2: [2],
        bib_3: [3],
        bib_4: [4],
        bib_5: [5],
        bib_6: [6],
        bib_7: [7],
      },
    });
    b = [];
    u = createSprite(f, "bib_0", 0, 0, m, h);
    u.x = r.width / 2 - 150 - m / 2;
    u.y = 200;
    c.addChild(u);
    b.push(u);
    u = createSprite(f, "bib_0", 0, 0, m, h);
    u.x = r.width / 2 - m / 2;
    u.y = 200;
    c.addChild(u);
    b.push(u);
    u = createSprite(f, "bib_0", 0, 0, m, h);
    u.x = r.width / 2 + 150 - m / 2;
    u.y = 200;
    c.addChild(u);
    b.push(u);
    new CTLText(
      c,
      r.width / 2 - 200,
      350,
      400,
      50,
      50,
      "center",
      "#fff",
      PRIMARY_FONT,
      1,
      0,
      0,
      TEXT_WIN + ": 0.00 " + TEXT_CURRENCY,
      !0,
      !0,
      !1,
      !1
    );
    l = new CGfxButton(
      r.width - 100,
      400,
      s_oSpriteLibrary.getSprite("but_skip"),
      c
    );
    l.addEventListener(ON_MOUSE_UP, this.onSkip, this);
  };
  this.unload = function () {
    e.off("click", p);
    l.unload();
  };
  this.show = function (r) {
    for (var u = 0; 3 > u; u++) b[u].gotoAndStop("bib_" + r[u]);
    n.visible = !0;
    createjs.Tween.get(c).to(
      {
        x: g,
      },
      500,
      createjs.Ease.backOut
    );
  };
  this.onSkip = function () {
    s_oGame.returnInBetPanel();
  };
  var q = a;
  this._init();
}

function CButStartRace(a, g, k, d, m, h, b) {
  var f, p, e, l, c;
  this._init = function (q, r, u, x, w, t) {
    f = [];
    p = [];
    x = createBitmap(u);
    e = new createjs.Container();
    e.x = q;
    e.y = r;
    e.regX = u.width / 2;
    e.regY = u.height / 2;
    e.addChild(x);
    n.addChild(e);
    s_bMobile || (e.cursor = "pointer");
    this._initListener();
  };
  this.unload = function () {
    e.off("mousedown", l);
    e.off("pressup", c);
    n.removeChild(e);
  };
  this.setVisible = function (q) {
    e.visible = q;
  };
  this._initListener = function () {
    l = e.on("mousedown", this.buttonDown);
    c = e.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (q, r, u) {
    f[q] = r;
    p[q] = u;
  };
  this.buttonRelease = function () {
    e.scaleX = 1;
    e.scaleY = 1;
    playSound("click", 1, 0);
    f[ON_MOUSE_UP] && f[ON_MOUSE_UP].call(p[ON_MOUSE_UP]);
  };
  this.buttonDown = function () {
    e.scaleX = 0.9;
    e.scaleY = 0.9;
    f[ON_MOUSE_DOWN] && f[ON_MOUSE_DOWN].call(p[ON_MOUSE_DOWN]);
  };
  this.setPosition = function (q, r) {
    e.x = q;
    e.y = r;
  };
  this.setX = function (q) {
    e.x = q;
  };
  this.setY = function (q) {
    e.y = q;
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
  var n = b;
  this._init(a, g, k, d, m, h);
  return this;
}

function CAreYouSurePanel(a) {
  var g, k, d, m, h, b, f, p, e;
  this._init = function () {
    p = new createjs.Container();
    p.visible = !1;
    l.addChild(p);
    h = new createjs.Shape();
    h.graphics.beginFill("#000").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    h.alpha = 0.7;
    m = h.on("click", function () {});
    p.addChild(h);
    var c = s_oSpriteLibrary.getSprite("msg_box");
    k = -c.width / 2;
    d = CANVAS_HEIGHT / 2;
    g = CANVAS_WIDTH / 2;
    e = new createjs.Container();
    e.x = k;
    e.y = d;
    e.regX = c.width / 2;
    e.regY = c.height / 2;
    p.addChild(e);
    var n = createBitmap(c);
    e.addChild(n);
    new CTLText(
      e,
      20,
      30,
      c.width - 40,
      200,
      100,
      "center",
      "#fff",
      PRIMARY_FONT,
      1,
      0,
      0,
      TEXT_ARE_YOU_SURE,
      !0,
      !0,
      !0,
      !1
    );
    b = new CGfxButton(
      c.width / 2 + 230,
      c.height - 100,
      s_oSpriteLibrary.getSprite("but_yes"),
      e
    );
    b.addEventListener(ON_MOUSE_UP, this._onReleaseYes, this);
    f = new CGfxButton(
      c.width / 2 - 230,
      c.height - 100,
      s_oSpriteLibrary.getSprite("but_no"),
      e
    );
    f.addEventListener(ON_MOUSE_UP, this._onReleaseNo, this);
  };
  this.unload = function () {
    h.off("click", m);
    f.unload();
    b.unload();
  };
  this.show = function () {
    p.visible = !0;
    createjs.Tween.get(e).to(
      {
        x: g,
      },
      500,
      createjs.Ease.backOut
    );
  };
  this._onReleaseYes = function () {
    s_oGame.onExit();
  };
  this._onReleaseNo = function () {
    p.visible = !1;
    s_oGame.unpause();
  };
  var l = a;
  this._init(a);
}
CTLText.prototype = {
  constructor: CTLText,
  __autofit: function () {
    if (this._bFitText) {
      var a = this._szMsg,
        g = 3 > a.length ? !1 : this._bEllipsis;
      if (g || this._bMultiline) {
        var k = a.length - 2,
          d = this._iStartingFontSize;
        this.__refreshTextFont(d);
        for (
          var m = this._oText.getBounds();
          m.height + this._iOutline > this._iEffectiveHeight ||
          m.width + this._iOutline > this._iEffectiveWidth;

        ) {
          if (g && d < this._iMinTextSize) {
            if (
              (k--,
              (this._oText.text = a.slice(0, k) + "..."),
              this.__updateY(),
              this.__verticalAlign(),
              1 == k)
            )
              break;
          } else if (
            (d--,
            this.__refreshTextFont(d),
            this.__updateY(),
            this.__verticalAlign(),
            d < this._iMinTextSize && !g)
          )
            break;
          m = this._oText.getBounds();
        }
        this._iFontSize = d;
        this.__updateY();
        this.__verticalAlign();
        this.__updateStroke();
      } else this.__autofitLight();
    }
  },
  __autofitLight: function () {
    this.__refreshTextFont(this._iStartingFontSize);
    var a = Math.floor(
      linearFunction(
        this._iEffectiveWidth,
        this._oText.getBounds().width + this._iOutline,
        0,
        this._iStartingFontSize,
        0
      )
    );
    a > this._iStartingFontSize
      ? (a = this._iStartingFontSize)
      : a < this._iMinTextSize && (a = this._iMinTextSize);
    this.__refreshTextFont(a);
    this._iFontSize = a;
    this.__updateY();
    this.__verticalAlign();
    this.__updateStroke();
  },
  __refreshTextFont: function (a) {
    this._oText.font = a + "px " + this._szFont;
    this._oText.lineHeight = Math.round(a * this._fLineHeightFactor);
  },
  __verticalAlign: function () {
    if (this._bVerticalAlign) {
      var a = this._oText.getBounds().height;
      this._oText.y -= (a - this._iHeight) / 2 + this._iPaddingV;
    }
  },
  __updateY: function () {
    this._oText.y = this._iPaddingV;
    switch (this._oText.textBaseline) {
      case "middle":
        this._oText.y +=
          this._oText.lineHeight / 2 +
          (this._iFontSize * this._fLineHeightFactor - this._iFontSize);
    }
  },
  __updateStroke: function () {
    this._oStroke &&
      ((this._oStroke.x = this._oText.x),
      (this._oStroke.y = this._oText.y),
      (this._oStroke.text = this._oText.text),
      (this._oStroke.font = this._oText.font),
      (this._oStroke.lineHeight = this._oText.lineHeight));
  },
  __updateOutline: function () {
    this._iOutline =
      this._oStroke && this._oStroke.outline > this._oText.outline
        ? this._oStroke.outline
        : this._oText.outline;
  },
  __createText: function (a) {
    this._bDebug &&
      ((this._oDebugShape = new createjs.Shape()),
      this._oDebugShape.graphics
        .beginFill("rgba(255,130,0,0.5)")
        .drawRect(0, 0, this._iWidth, this._iHeight)
        .moveTo(this._iPaddingH, this._iHeight - this._iPaddingV)
        .lineTo(this._iWidth - this._iPaddingH, this._iHeight - this._iPaddingV)
        .lineTo(this._iWidth - this._iPaddingH, this._iPaddingV)
        .lineTo(this._iPaddingH, this._iPaddingV)
        .closePath()
        .beginFill("rgba(255,0,0,0.5)")
        .drawRect(
          this._iPaddingH,
          this._iPaddingV,
          this._iEffectiveWidth,
          this._iEffectiveHeight
        ),
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
        this._oText.x = this._iWidth / 2;
        break;
      case "left":
        this._oText.x = this._iPaddingH;
        break;
      case "right":
        this._oText.x = this._iWidth - this._iPaddingH;
    }
    this._oContainer.addChild(this._oText);
    this.refreshText(a);
  },
  setStroke: function (a, g) {
    this._oStroke ||
      ((this._oStroke = this._oText.clone()),
      this._oContainer.addChild(this._oStroke),
      this._oContainer.swapChildren(this._oStroke, this._oText));
    this.setStrokeColor(g ? g : this._szStrokeColor);
    this.setStrokeSize(a ? a : this._iStrokeSize);
  },
  setStrokeColor: function (a) {
    this._szStrokeColor = a;
    this._oStroke && (this._oStroke.color = this._szStrokeColor);
  },
  setStrokeSize: function (a) {
    this._iStrokeSize = a;
    this._oStroke &&
      ((this._oStroke.outline = this._iStrokeSize),
      this.__updateOutline(),
      this.__autofit());
  },
  removeStroke: function () {
    this._oStroke &&
      (this._oContainer.removeChild(this._oStroke),
      (this._oStroke = null),
      this.__updateOutline(),
      this.__autofit());
  },
  roll: function (a, g, k, d, m, h) {
    g = null == g ? 1500 : g;
    k = null == k ? createjs.Ease.linear : k;
    if (this._oText) {
      var b = {
        score: parseInt(this._szMsg),
      };
      this._szMsg = a;
      var f = this._bFitText
        ? function () {
            this._oText.text = Math.floor(b.score);
            this.__autofitLight();
          }
        : function () {
            this._oText.text = Math.floor(b.score);
          };
      this._oTweenRollText = createjs.Tween.get(b).to(
        {
          score: a,
        },
        g,
        k
      );
      this._oTweenRollText.on("change", f, this);
      this._oTweenRollText.on(
        "complete",
        function () {
          d && d.apply(m, h);
          this.stopRolling();
        },
        this,
        !0
      );
    }
  },
  isRolling: function () {
    return null == this._oTweenRollText ? !1 : !0;
  },
  stopRolling: function () {
    this.isRolling() &&
      (this._oTweenRollText.removeAllEventListeners(),
      (this._oTweenRollText.paused = !0),
      (this._oTweenRollText = null));
  },
  pauseRolling: function () {
    this.isRolling() && (this._oTweenRollText.paused = !0);
  },
  resumeRolling: function () {
    this.isRolling() && (this._oTweenRollText.paused = !1);
  },
  setY: function (a) {
    this._oContainer.y = a;
  },
  setX: function (a) {
    this._oContainer.x = a;
  },
  setVerticalAlign: function (a) {
    this._bVerticalAlign = a;
  },
  setOutline: function (a) {
    this._oText && ((this._oText.outline = a), this.__updateOutline());
  },
  setShadow: function (a, g, k, d) {
    this._oText && (this._oText.shadow = new createjs.Shadow(a, g, k, d));
  },
  setColor: function (a) {
    this._szColor = a;
    this._oText.color = this._szColor;
  },
  setAlpha: function (a) {
    this._oContainer.alpha = a;
  },
  setVisible: function (a) {
    this._oContainer.visible = a;
  },
  setFontSize: function (a) {
    this._iFontSize = this._iStartingFontSize = a;
    this.refreshText(this._szMsg);
  },
  removeTweens: function () {
    createjs.Tween.removeTweens(this._oContainer);
  },
  getText: function () {
    return this._oText;
  },
  getTextWidth: function () {
    return this._oText.getBounds().width + this._iOutline;
  },
  getTextHeight: function () {
    return this._oText.getBounds().height + this._iOutline;
  },
  getMsg: function () {
    return this._szMsg;
  },
  getX: function () {
    return this._oContainer.x;
  },
  getY: function () {
    return this._oContainer.y;
  },
  getHeight: function () {
    return this._iHeight;
  },
  getWidth: function () {
    return this._iWidth;
  },
  getColor: function () {
    return this._szColor;
  },
  getFontSize: function () {
    return this._iFontSize;
  },
  unload: function () {
    this.stopRolling();
    this._oParentContainer.removeChild(this._oContainer);
  },
  refreshText: function (a) {
    this._szMsg = a;
    "" === this._szMsg && (this._szMsg = " ");
    null === this._oText && this.__createText(this._szMsg);
    this._oText.text = this._szMsg;
    this.__refreshTextFont(this._iStartingFontSize);
    this.__autofit();
  },
};

function CTLText(a, g, k, d, m, h, b, f, p, e, l, c, n, q, r, u, x, w, t) {
  w = void 0 === w ? 11 : w;
  t = void 0 === t ? !0 : t;
  this._oParentContainer = a;
  this._oContainer = new createjs.Container();
  this._oContainer.x = g;
  this._oContainer.y = k;
  this._oParentContainer.addChild(this._oContainer);
  this._iOutline = 0;
  this._iWidth = d;
  this._iHeight = m;
  this._bMultiline = u;
  this._iStartingFontSize = this._iFontSize = h;
  this._szAlign = b;
  this._szColor = f;
  this._szFont = p;
  this._iPaddingH = l;
  this._iPaddingV = c;
  this._iEffectiveWidth = this._iWidth - 2 * this._iPaddingH;
  this._iEffectiveHeight = this._iHeight - 2 * this._iPaddingV;
  this._bVerticalAlign = r;
  this._bFitText = q;
  this._iMinTextSize = w;
  this._bDebug = x;
  this._bEllipsis = t;
  this._oDebugShape = null;
  this._fLineHeightFactor = e;
  this._oText = null;
  n && this.__createText(n);
}

function CFicheBut(a, g, k, d, m) {
  var h,
    b,
    f,
    p = [],
    e,
    l;
  this._init = function (c, n) {
    var q = s_oSpriteLibrary.getSprite("fiche_" + a);
    h = !1;
    l = new createjs.Container();
    l.x = c;
    l.y = n;
    l.regX = q.width / 2;
    l.regY = q.height / 2;
    m.addChild(l);
    b = [];
    f = [];
    e = createBitmap(q);
    e.cursor = "pointer";
    l.addChild(e);
    l.scaleX = l.scaleY = d;
    new CTLText(
      l,
      q.width / 2 - 20,
      q.height / 2 - 14,
      36,
      30,
      28,
      "center",
      COLOR_FICHES[a],
      PRIMARY_FONT,
      1,
      0,
      0,
      CHIP_VALUES[a],
      !0,
      !0,
      !1,
      !1
    );
    this._initListener();
  };
  this.unload = function () {
    l.off("mousedown", this.buttonDown);
    l.off("pressup", this.buttonRelease);
    m.removeChild(l);
  };
  this.select = function () {};
  this.deselect = function () {};
  this.enable = function () {
    h = !1;
  };
  this.disable = function () {
    h = !0;
  };
  this.setVisible = function (c) {
    l.visible = c;
  };
  this._initListener = function () {
    l.on("mousedown", this.buttonDown);
    l.on("pressup", this.buttonRelease);
  };
  this.addEventListener = function (c, n, q) {
    b[c] = n;
    f[c] = q;
  };
  this.addEventListenerWithParams = function (c, n, q, r) {
    b[c] = n;
    f[c] = q;
    p = r;
  };
  this.buttonRelease = function () {
    h ||
      (playSound("click", 1, !1),
      (l.scaleX = d),
      (l.scaleY = d),
      b[ON_MOUSE_UP] && b[ON_MOUSE_UP].call(f[ON_MOUSE_UP], p));
  };
  this.buttonDown = function () {
    h ||
      ((l.scaleX = 0.9 * d),
      (l.scaleY = 0.9 * d),
      b[ON_MOUSE_DOWN] && b[ON_MOUSE_DOWN].call(f[ON_MOUSE_DOWN], p));
  };
  this.setPosition = function (c, n) {
    l.x = c;
    l.y = n;
  };
  this.setX = function (c) {
    l.x = c;
  };
  this.setY = function (c) {
    l.y = c;
  };
  this.getX = function () {
    return l.x;
  };
  this.getY = function () {
    return l.y;
  };
  this._init(g, k);
}

function CBgController(a) {
  var g, k, d, m, h, b, f, p, e;
  this._init = function () {
    d = 0;
    k = !1;
    g = !0;
    p = new createjs.Container();
    a.addChild(p);
    var l = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
    p.addChild(l);
    l = s_oSpriteLibrary.getSprite("track_0");
    m = l.width;
    e = new createjs.Container();
    e.x = 2 * -m;
    e.y = 50;
    p.addChild(e);
    b = [];
    var c = createBitmap(s_oSpriteLibrary.getSprite("parallax_0"));
    e.addChild(c);
    b.push(c);
    c = createBitmap(s_oSpriteLibrary.getSprite("parallax_0"));
    c.x = m;
    e.addChild(c);
    b.push(c);
    c = createBitmap(s_oSpriteLibrary.getSprite("parallax_0"));
    c.x = 2 * m;
    e.addChild(c);
    b.push(c);
    c = createBitmap(s_oSpriteLibrary.getSprite("parallax_0"));
    c.x = 3 * m;
    e.addChild(c);
    b.push(c);
    h = [];
    for (var n = (c = 0); 2 > n; n++) {
      var q = createBitmap(l);
      q.x = c;
      p.addChild(q);
      h.push(q);
      c += m;
    }
  };
  this.startTrack = function () {
    f = createjs.Tween.get(e)
      .to(
        {
          x: 3 * -m,
        },
        1e4,
        createjs.Ease.sineOut
      )
      .call(function () {
        b[2].image = s_oSpriteLibrary.getSprite("parallax_1");
        f = createjs.Tween.get(e)
          .to(
            {
              x: -m,
            },
            1e4,
            createjs.Ease.sineInOut
          )
          .call(function () {
            b[2].image = s_oSpriteLibrary.getSprite("parallax_0");
            f = createjs.Tween.get(e).to(
              {
                x: 2 * -m,
              },
              12e3,
              createjs.Ease.sineIn
            );
          });
      });
  };
  this.readyForArrival = function () {
    k = !0;
  };
  this._changeTrackTile = function (l) {
    k
      ? (h[l].image = s_oSpriteLibrary.getSprite("track_2"))
      : (d++,
        2 === d
          ? ((d = 0), (h[l].image = s_oSpriteLibrary.getSprite("track_1")))
          : (h[l].image = s_oSpriteLibrary.getSprite("track_0")));
    h[l].x = h[0 === l ? 1 : 0].x + m;
  };
  this.pause = function (l) {
    f.paused = l;
  };
  this.update = function () {
    if (g)
      for (var l = 0; l < h.length; l++) {
        if (
          -1 !== h[l].image.src.indexOf("track_2") &&
          0 >= h[l].x + MOVE_TRACK_X_OFFSET
        ) {
          h[l].x = 0;
          this.pause();
          g = !1;
          s_oGame.checkHorseArrival();
          break;
        }
        if (h[l].x <= -m) {
          this._changeTrackTile(l);
          break;
        } else h[l].x -= MOVE_TRACK_X_OFFSET;
      }
  };
  this._init();
}

function CCar(a) {
  var g, k, d, m;
  this._init = function () {
    var h = s_oSpriteLibrary.getSprite("car");
    m = new createjs.Container();
    m.x = -h.width;
    m.y = 300;
    a.addChild(m);
    var b = s_oSpriteLibrary.getSprite("car_wheel"),
      f = createBitmap(b);
    f.regX = b.width / 2;
    f.regY = b.height / 2;
    f.x = 444;
    f.y = 334;
    m.addChild(f);
    var p = createBitmap(b);
    p.regX = b.width / 2;
    p.regY = b.height / 2;
    p.x = 950;
    p.y = 334;
    m.addChild(p);
    h = createBitmap(h);
    m.addChild(h);
    h = s_oSpriteLibrary.getSprite("car_logo");
    h = createBitmap(h);
    h.x = 280;
    h.y = 233;
    m.addChild(h);
    g = createjs.Tween.get(m)
      .to(
        {
          x: CANVAS_WIDTH / 2 - 250,
        },
        4e3,
        createjs.Ease.cubicOut
      )
      .to(
        {
          x: CANVAS_WIDTH,
        },
        4e3,
        createjs.Ease.cubicIn
      )
      .call(function () {
        stopSound("car");
        a.removeChild(m);
        createjs.Tween.removeTweens(f);
        createjs.Tween.removeTweens(p);
      });
    k = createjs.Tween.get(f, {
      loop: -1,
    }).to(
      {
        rotation: 360,
      },
      300,
      createjs.Ease.linear
    );
    d = createjs.Tween.get(p, {
      loop: -1,
    }).to(
      {
        rotation: 360,
      },
      300,
      createjs.Ease.linear
    );
  };
  this.pause = function (h) {
    g.paused = h;
    k.paused = h;
    d.paused = h;
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
  var g = a.split("."),
    k = g.length;
  2 < k && (a = g[k - 2] + "." + g[k - 1]);
  return a;
}
var getClosestTop = function () {
    var a = window,
      g = !1;
    try {
      for (; a.parent.document !== a.document; )
        if (a.parent.document) a = a.parent;
        else {
          g = !0;
          break;
        }
    } catch (k) {
      g = !0;
    }
    return {
      topFrame: a,
      err: g,
    };
  },
  getBestPageUrl = function (a) {
    var g = a.topFrame,
      k = "";
    if (a.err)
      try {
        try {
          k = window.top.location.href;
        } catch (m) {
          var d = window.location.ancestorOrigins;
          k = d[d.length - 1];
        }
      } catch (m) {
        k = g.document.referrer;
      }
    else k = g.location.href;
    return k;
  },
  TOPFRAMEOBJ = getClosestTop(),
  PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);

function seekAndDestroy() {
  for (
    var a = extractRootDomain(PAGE_URL),
      g = [
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
      k = 0;
    k < g.length;
    k++
  )
    if (g[k] === a) return !0;
  return !1;
}
