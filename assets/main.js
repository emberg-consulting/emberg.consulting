(function () {
  "use strict";

  /* ---------- Config ---------- */
  var TG = "emberg_consulting";
  var MAIL = "emberg.work@mail.ru";
  var METRIKA_ID = ""; // вставить номер счётчика Яндекс.Метрики

  var MESSAGES = {
    C01: "Здравствуйте, Эмберг! Хочу записаться на разбор отдела продаж. [C01]",
    C02: "Здравствуйте, Эмберг! Хочу записаться на разбор отдела продаж. [C02]",
    C03: "Здравствуйте, Эмберг! У меня вопрос: [C03]",
    C04: "Здравствуйте, Эмберг! Узнал себя в описании на сайте, хочу разобрать, где ломается у нас. [C04]",
    C05: "Здравствуйте, Эмберг! Хочу проверить наш отдел продаж по пяти точкам. [C05]",
    C06: "Здравствуйте, Эмберг! Хочу обсудить, как будет устроена работа с нашей компанией. [C06]",
    C07: "Здравствуйте, Эмберг! Хочу уточнить про гарантии: [C07]",
    C08: "Здравствуйте, Эмберг! Хочу записаться на разбор отдела продаж за 5 000 ₽. [C08]",
    C09: "Здравствуйте, Эмберг! Интересует построение отдела продаж, хочу обсудить. [C09]",
    C10: "Здравствуйте, Эмберг! Хочу узнать про трекинг после проекта. [C10]",
    C11: "Здравствуйте, Эмберг! Посмотрел проекты на сайте, хочу обсудить нашу ситуацию. [C11]",
    C12: "Здравствуйте, Эмберг! Хочу обсудить партнёрство. [C12]",
    C13: "Здравствуйте, Эмберг! [C13]",
    C14: "Здравствуйте, Эмберг! Не нашёл на сайте ответ на вопрос: [C14]",
    C15: "Здравствуйте, Эмберг! Хочу записаться на разбор отдела продаж. [C15]",
    C17: "Здравствуйте, Эмберг! Хочу записаться на разбор отдела продаж. [C17]"
  };

  /* ---------- Buttons ---------- */
  function tgLink(code) {
    return "https://t.me/" + TG + "?text=" + encodeURIComponent(MESSAGES[code] || MESSAGES.C13);
  }
  document.querySelectorAll("[data-cta]").forEach(function (a) {
    var code = a.getAttribute("data-cta");
    if (code === "C16") {
      a.href = "mailto:" + MAIL + "?subject=" + encodeURIComponent("Разбор отдела продаж [C16]");
    } else {
      a.href = tgLink(code);
      a.target = "_blank";
      a.rel = "noopener";
    }
    a.addEventListener("click", function () {
      if (window.ym && METRIKA_ID) window.ym(METRIKA_ID, "reachGoal", "cta_" + code);
    });
  });
  document.querySelectorAll("[data-mail]").forEach(function (a) {
    a.href = "mailto:" + MAIL;
    a.textContent = MAIL;
  });

  /* ---------- Header / menu ---------- */
  var header = document.querySelector(".header");
  var burger = document.querySelector(".burger");
  var body = document.body;
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
    var sticky = document.querySelector(".sticky-cta");
    if (sticky) sticky.classList.toggle("show", window.scrollY > window.innerHeight * 0.85);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (burger) {
    burger.addEventListener("click", function () {
      var open = body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".mobile-menu a").forEach(function (a) {
      a.addEventListener("click", function () { body.classList.remove("menu-open"); });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }
  // hero reveals immediately
  requestAnimationFrame(function () {
    document.querySelectorAll(".hero .reveal").forEach(function (el) { el.classList.add("in"); });
  });

  /* ---------- Cookie consent ---------- */
  var KEY = "emberg_consent";
  var cookie = document.querySelector(".cookie");
  function getConsent() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setConsent(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function loadMetrika() {
    if (!METRIKA_ID || window.ym) return;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      k = e.createElement(t); a = e.getElementsByTagName(t)[0];
      k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    window.ym(METRIKA_ID, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
  }
  var c = getConsent();
  if (c === "all") loadMetrika();
  else if (!c && cookie) setTimeout(function () { cookie.classList.add("show"); }, 1200);
  if (cookie) {
    cookie.querySelector("[data-consent='all']").addEventListener("click", function () {
      setConsent("all"); cookie.classList.remove("show"); loadMetrika();
    });
    cookie.querySelector("[data-consent='necessary']").addEventListener("click", function () {
      setConsent("necessary"); cookie.classList.remove("show");
    });
  }

  /* ---------- Hero shader ---------- */
  var canvas = document.querySelector(".hero-canvas");
  if (!canvas || reduce) return;
  var gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) return;

  var VS = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  var FS = [
    "precision highp float;",
    "uniform vec2 u_res;uniform float u_t;uniform vec2 u_m;",
    "vec3 hash3(vec2 p){vec3 q=vec3(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)),dot(p,vec2(419.2,371.9)));return fract(sin(q)*43758.5453);}",
    "float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);f=f*f*(3.-2.*f);",
    "float a=hash3(i).x,b=hash3(i+vec2(1.,0.)).x,c=hash3(i+vec2(0.,1.)).x,d=hash3(i+vec2(1.,1.)).x;",
    "return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}",
    "float fbm(vec2 p){float v=0.;float a=.5;mat2 r=mat2(.8,.6,-.6,.8);for(int i=0;i<5;i++){v+=a*noise(p);p=r*p*2.1;a*=.5;}return v;}",
    "void main(){",
    "vec2 uv=gl_FragCoord.xy/u_res.xy;vec2 p=uv;p.x*=u_res.x/u_res.y;",
    "float t=u_t*.06;",
    "vec2 m=(u_m-.5)*.25;",
    "vec2 q=vec2(fbm(p+t+m),fbm(p-t*.7+vec2(5.2,1.3)));",
    "vec2 r=vec2(fbm(p+2.2*q+vec2(1.7,9.2)+t*.4),fbm(p+2.2*q+vec2(8.3,2.8)-t*.3));",
    "float f=fbm(p+2.6*r);",
    "vec3 navy=vec3(.106,.165,.29);",
    "vec3 deep=vec3(.043,.075,.141);",
    "vec3 steel=vec3(.31,.42,.6);",
    "vec3 silver=vec3(.79,.82,.87);",
    "vec3 ice=vec3(.93,.95,.98);",
    "vec3 col=mix(deep,navy,smoothstep(.1,.6,f));",
    "col=mix(col,steel,smoothstep(.35,.75,f)*.9);",
    "col=mix(col,silver,smoothstep(.55,.9,length(r))*.75);",
    "col=mix(col,ice,smoothstep(.72,1.,f*length(q))*.6);",
    "float vign=smoothstep(1.5,.3,length(uv-vec2(.5,.45)));",
    "col*=mix(.7,1.05,vign);",
    "float g=fract(sin(dot(gl_FragCoord.xy+u_t,vec2(12.9898,78.233)))*43758.5453);",
    "col+=(g-.5)*.025;",
    "gl_FragColor=vec4(col,1.);}"
  ].join("\n");

  function sh(type, src) {
    var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  }
  var vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
  if (!vs || !fs) return;
  var prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog); gl.useProgram(prog);
  var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  var uRes = gl.getUniformLocation(prog, "u_res"), uT = gl.getUniformLocation(prog, "u_t"), uM = gl.getUniformLocation(prog, "u_m");

  var mouse = [0.5, 0.5], target = [0.5, 0.5];
  window.addEventListener("pointermove", function (e) {
    target = [e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight];
  }, { passive: true });

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var scale = 0.5; // render at half res for speed, blur hides it
    var w = Math.floor(canvas.clientWidth * dpr * scale), h = Math.floor(canvas.clientHeight * dpr * scale);
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
  }
  window.addEventListener("resize", resize);
  resize();

  var start = performance.now(), visible = true;
  document.addEventListener("visibilitychange", function () { visible = !document.hidden; });
  function frame(now) {
    if (visible && window.scrollY < window.innerHeight * 1.2) {
      mouse[0] += (target[0] - mouse[0]) * 0.04; mouse[1] += (target[1] - mouse[1]) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uT, (now - start) / 1000);
      gl.uniform2f(uM, mouse[0], mouse[1]);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
