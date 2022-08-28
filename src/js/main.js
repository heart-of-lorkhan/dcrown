// import "@babel/polyfill";

/*!
 * ScrollToSmooth
 * Author: Bastian Fießinger
 * Version: 3.0.2
 */
let scrollToSmooth = (function () {
  function t(n) {
    return (t =
      typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol === "function" &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          })(n);
  }
  function n(t, n) {
    for (let e = 0; e < n.length; e++) {
      let i = n[e];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(t, i.key, i);
    }
  }
  function e(t, n) {
    return (
      (function (t) {
        if (Array.isArray(t)) {
          return t;
        }
      })(t) ||
      (function (t, n) {
        if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(t))) {
          return;
        }
        let e = [];
        let i = !0;
        let r = !1;
        let o = void 0;
        try {
          for (
            var s, a = t[Symbol.iterator]();
            !(i = (s = a.next()).done) &&
            (e.push(s.value), !n || e.length !== n);
            i = !0
          ) {}
        } catch (t) {
          (r = !0), (o = t);
        } finally {
          try {
            i || a.return == null || a.return();
          } finally {
            if (r) {
              throw o;
            }
          }
        }

        return e;
      })(t, n) ||
      (function (t, n) {
        if (!t) {
          return;
        }
        if (typeof t === "string") {
          return i(t, n);
        }
        let e = Object.prototype.toString.call(t).slice(8, -1);
        e === "Object" && t.constructor && (e = t.constructor.name);
        if (e === "Map" || e === "Set") {
          return Array.from(t);
        }
        if (
          e === "Arguments" ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
        ) {
          return i(t, n);
        }
      })(t, n) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function i(t, n) {
    (n == null || n > t.length) && (n = t.length);
    for (var e = 0, i = new Array(n); e < n; e++) {
      i[e] = t[e];
    }

    return i;
  }
  let r;
  let o = function (t) {
    return t;
  };
  let s = document;
  let a = s.documentElement;
  let c = s.body;
  let l = window;
  let u =
    l.requestAnimationFrame ||
    l.mozRequestAnimationFrame ||
    l.webkitRequestAnimationFrame ||
    l.msRequestAnimationFrame;
  let f = l.cancelAnimationFrame || l.mozCancelAnimationFrame;
  let h = function (t) {
    let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s;

    return n.querySelector(t);
  };
  let g = function (t, n) {
    Array.prototype.forEach.call(t, n);
  };
  let p = function (t) {
    let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : s;
    let e = !0;
    try {
      typeof t === "string" ? h(t, n) : y(t) && n.contains(t);
    } catch (t) {
      e = !1;
    }

    return e;
  };
  var y = function (n) {
    return (
      (function (n) {
        try {
          return n instanceof Node;
        } catch (e) {
          return (
            t(n) === "object" &&
            typeof n.nodeType === "number" &&
            typeof n.nodeName === "string" &&
            t(n.ownerDocument) === "object"
          );
        }
      })(n) ||
      (function (n) {
        try {
          return n instanceof HTMLElement;
        } catch (e) {
          return (
            t(n) === "object" &&
            n.nodeType === 1 &&
            t(n.style) === "object" &&
            t(n.ownerDocument) === "object"
          );
        }
      })(n)
    );
  };
  let d = function () {
    return l.pageYOffset || c.scrollTop || a.scrollTop;
  };
  let m = function () {
    return l.performance && "now" in l.performance
      ? performance.now()
      : new Date().getTime();
  };
  let v = function (t) {
    let n = new RegExp(`(${location.hash})?$`);

    return (t.baseURI || s.URL).replace(n, "");
  };
  let b = function () {
    return Math.max(
      c.scrollHeight,
      c.offsetHeight,
      c.clientHeight,
      a.scrollHeight,
      a.offsetHeight,
      a.clientHeight
    );
  };
  let S = function () {
    return l.innerHeight || a.clientHeight || c.clientHeight;
  };
  let A = function (t) {
    return `${t}px`;
  };
  let w = "data-scrolltosmooth-expand";
  let E = "top";
  let x = "bottom";
  function j(t) {
    let n = "";

    return (
      this.settings.targetAttribute === "href" && t.href
        ? (n = t.href.replace(v(t), ""))
        : t.getAttribute(this.settings.targetAttribute) &&
          (n = t.getAttribute(this.settings.targetAttribute)),
      this.settings.topOnEmptyHash && n == "#"
        ? this.container
        : p(n, this.container)
        ? h(n, this.container)
        : null
    );
  }
  function O() {
    let t = this;
    let n = [];

    return (
      g(this.elements, (e) => {
        j.call(t, e) &&
          ((t.settings.targetAttribute === "href" &&
            e.href.indexOf(v(e)) != -1 &&
            e.href.indexOf("#") != -1 &&
            (e.hash != "" || t.settings.topOnEmptyHash)) ||
            t.settings.targetAttribute != "href") &&
          n.push(e);
      }),
      n
    );
  }
  function M(t, n) {
    n.stopPropagation(), n.preventDefault();
    let e = j.call(this, t);
    e && this.scrollTo(e);
  }
  function H(t) {
    let n = Math.max(1, this.settings.duration);
    if (this.settings.durationRelative) {
      let e =
        typeof this.settings.durationRelative === "number"
          ? this.settings.durationRelative
          : 1e3;
      n = Math.max(this.settings.duration, t * (n / e));
    }

    return (
      this.settings.durationMin &&
        n < this.settings.durationMin &&
        (n = this.settings.durationMin),
      this.settings.durationMax &&
        n > this.settings.durationMax &&
        (n = this.settings.durationMax),
      n
    );
  }
  function P(t, n, e) {
    let i = (function (t, n, e) {
      let i = n - e;

      return t < 0
        ? { to: E, px: -1 * t }
        : t > i && { to: x, px: -1 * (i - t) };
    })(t, n, e);
    let r = R.call(this);
    let o = r.filter((t) => {
      return t.getAttribute(w) === E;
    })[0];
    let s = r.filter((t) => {
      return t.getAttribute(w) === x;
    })[0];
    i && o && i.to === E
      ? (o.style.height = A(i.px))
      : i && s && i.to === x
      ? (s.style.height = A(i.px))
      : g(r, (t) => {
          t.style.removeProperty("height");
        });
  }
  function R() {
    return Array.prototype.slice.call(this.container.children).filter((t) => {
      return t.hasAttribute(w);
    });
  }
  function T(t, n, e, i, o) {
    let s = this;
    let a = t - n;
    let c = a < 0 ? -1 * a : a;
    let f = H.call(this, c);
    let h = Math.min(f, m() - e);
    let g = h / f;
    let p =
      typeof this.settings.easing === "string"
        ? (function (t, n) {
            return Function(`"use strict"; return (${t}(${n}))`)();
          })(this.settings.easing, g)
        : this.settings.easing(g);
    let y = n + a * p;
    this.settings.onScrollUpdate &&
      typeof this.settings.onScrollUpdate === "function" &&
      this.settings.onScrollUpdate({
        startPosition: n,
        currentPosition: y,
        endPosition: t,
      }),
      l.scroll(0, y),
      i || (i = b()),
      o || (o = S()),
      P.call(this, y, i, o),
      h >= f
        ? this.settings.onScrollEnd &&
          typeof this.settings.onScrollEnd === "function" &&
          this.settings.onScrollEnd({ startPosition: n, endPosition: t })
        : (r = u(() => {
            T.call(s, t, n, e, i, o);
          }));
  }

  return (function () {
    function i(t, n) {
      !(function (t, n) {
        if (!(t instanceof n)) {
          throw new TypeError("Cannot call a class as a function");
        }
      })(this, i);
      let e = {
        container: s,
        targetAttribute: "href",
        topOnEmptyHash: !0,
        offset: null,
        duration: 400,
        durationRelative: !1,
        durationMin: null,
        durationMax: null,
        easing: o,
        onScrollStart: null,
        onScrollUpdate: null,
        onScrollEnd: null,
      };
      for (let r in ((n = n || e), e)) {
        Object.prototype.hasOwnProperty.call(e, r) &&
          !Object.prototype.hasOwnProperty.call(n, r) &&
          (n[r] = e[r]);
      }
      this.settings = n;
      let l = c;
      typeof this.settings.container === "string" && p(this.settings.container)
        ? (l = h(this.settings.container))
        : typeof this.settings.container !== "string" &&
          y(this.settings.container) &&
          p(this.settings.container) &&
          (l = this.settings.container),
        (l = l === s || l === a ? c : l),
        (this.container = l),
        (this.elements =
          typeof t === "string"
            ? (function (t) {
                return (arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : s
                ).querySelectorAll(t);
              })(t, this.container)
            : t);
    }
    let u;
    let v;
    let A;

    return (
      (u = i),
      (v = [
        {
          key: "init",
          value() {
            let t = this;
            this.destroy();
            let n = s.createElement("div");
            n.setAttribute(w, E),
              this.container.insertBefore(n, this.container.firstChild);
            let e = s.createElement("div");
            e.setAttribute(w, x),
              this.container.appendChild(e),
              g(O.call(this), (n) => {
                n.addEventListener("click", M.bind(t, n), !1);
              }),
              g(["mousewheel", "wheel", "touchmove"], (n) => {
                l.addEventListener(n, () => {
                  t.cancelScroll();
                });
              });
          },
        },
        {
          key: "destroy",
          value() {
            let t = this;
            this.settings &&
              (this.cancelScroll(),
              g(R.call(this), (t) => {
                t.parentNode.removeChild(t);
              }),
              g(O.call(this), (n) => {
                n.removeEventListener("click", M.bind(t, n), !1);
              }));
          },
        },
        {
          key: "scrollTo",
          value(n) {
            let e = d();
            let i = b();
            let r = S();
            let o = 0;
            if (isNaN(n)) {
              if (
                (t(n) === "object" || typeof n === "string") &&
                p(n, this.container)
              ) {
                typeof n === "string" && (n = h(n, this.container));
                let s = n.getBoundingClientRect().top + e;
                o = i - s < r ? i - r : s;
              }
            } else {
              typeof n === "string" && (n = parseFloat(n)),
                (o = n = i - n < r ? i - r : n);
            }
            if (this.settings.offset !== null) {
              let a = 0;
              if (p(this.settings.offset, this.container)) {
                let c = this.settings.offset;
                typeof c === "string" && (c = h(this.settings.offset)),
                  y(c) && (a = c.getBoundingClientRect().height);
              } else {
                isNaN(this.settings.offset) ||
                  (typeof (a = this.settings.offset) === "string" &&
                    (a = parseFloat(a)));
              }
              o -= a;
            }
            (o = o < 0 ? 0 : o),
              this.settings.onScrollStart &&
                typeof this.settings.onScrollStart === "function" &&
                this.settings.onScrollStart({
                  startPosition: e,
                  endPosition: o,
                }),
              T.call(this, o, e, m(), i, r);
          },
        },
        {
          key: "scrollBy",
          value(t) {
            this.scrollTo(d() + t);
          },
        },
        {
          key: "cancelScroll",
          value() {
            r && f(r);
          },
        },
        {
          key: "update",
          value(n) {
            if (t(n) === "object") {
              for (let i = 0, r = Object.entries(n); i < r.length; i++) {
                let o = e(r[i], 2);
                let s = o[0];
                let a = o[1];
                this.settings[s] = a;
              }
            }
          },
        },
      ]) && n(u.prototype, v),
      A && n(u, A),
      i
    );
  })();
})();

import scrollHeader from "./scrollHeader";
import heroVideo from "./heroVideo";

window.addEventListener(
  "load",
  () => {
    scrollHeader();
    heroVideo();

    const scrollButtons = document.querySelectorAll("[data-scrollto]");

    let smoothScroll = new scrollToSmooth("button", {
      targetAttribute: "data-scrollto",
      duration: 1000,
      offset: "#header-top",
      onScrollStart: () => {
        scrollButtons.forEach((button) => button.blur());
      },
    });

    smoothScroll.init();

    const scrollspyElements = document.querySelectorAll("[data-scrollspy]");

    function isAnyPartOfElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const windowWidth =
        window.innerWidth || document.documentElement.clientWidth;

      const vertInView =
        rect.top <= windowHeight && rect.top + rect.height >= 0;
      const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

      return vertInView && horInView;
    }

    window.addEventListener("scroll", () => {
      scrollspyElements.forEach((element) => {
        if (isAnyPartOfElementInViewport(element)) {
          const animationClass = element.dataset.scrollspy;
          element.classList.add("animate__animated");
          element.classList.add(animationClass);
        }
      });
    });

    scrollspyElements.forEach((element) => {
      if (isAnyPartOfElementInViewport(element)) {
        const animationClass = element.dataset.scrollspy;
        element.classList.add("animate__animated");
        element.classList.add(animationClass);
      }
    });

    const roleButtons = document.querySelectorAll("[data-role]");

    if (roleButtons.length) {
      const roleSelect = document.getElementById("role-select");

      roleButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const role = this.dataset.role;
          roleSelect.value = role;
        });
      });
    }
  },
  false
);
