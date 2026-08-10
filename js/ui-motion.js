/**
 * 克制 UI 动效：首页卡片 / 侧栏交错淡入
 * 尊重 prefers-reduced-motion；不做持续动画
 */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  var targets = document.querySelectorAll(
    "#content-body > .article, #sidebar .widget-wrap, #banner"
  );
  if (!targets.length) return;

  targets.forEach(function (el, i) {
    el.classList.add("motion-ready");
    el.style.transitionDelay = Math.min(i * 0.06, 0.36) + "s";
  });

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("motion-in");
      el.classList.remove("motion-ready");
    });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.classList.add("motion-in");
        el.classList.remove("motion-ready");
        io.unobserve(el);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  targets.forEach(function (el) {
    io.observe(el);
  });
})();
