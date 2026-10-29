/* Путь: стрелки рисуются по очереди при появлении блока, по стрелкам бежит свет.
   На десктопе весь путь запускается разом, на телефоне каждый шаг - когда до него доскроллили */
(function () {
  "use strict";
  var j = document.querySelector(".journey");
  if (!j) return;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mobile = window.matchMedia && window.matchMedia("(max-width: 979px)").matches;
  var items = j.querySelectorAll(".j-step, .j-arrow");

  if (reduce || !("IntersectionObserver" in window)) {
    j.classList.add("go", "done");
  } else if (mobile) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        el.classList.add("go");
        if (el.classList.contains("j-arrow")) setTimeout(function () { el.classList.add("done"); }, 900);
        io.unobserve(el);
      });
    }, { threshold: 0.4, rootMargin: "0px 0px -10% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        j.classList.add("go");
        setTimeout(function () { j.classList.add("done"); }, 2400);
        io2.disconnect();
      });
    }, { threshold: 0.3 });
    io2.observe(j);
  }

  /* Подсветка карточки за курсором */
  j.querySelectorAll(".j-card").forEach(function (c) {
    c.addEventListener("pointermove", function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty("--mx", (e.clientX - r.left) + "px");
      c.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  });
})();
