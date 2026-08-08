/* =============================================================
   ALVAREZ — interactions
   ============================================================= */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const on = (el, ev, fn, opt) => el && el.addEventListener(ev, fn, opt);
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Page load sequence ---------- */
  window.addEventListener("load", () => {
    document.body.classList.add("is-loaded");
  });
  // Fallback in case 'load' is delayed by slow media
  setTimeout(() => document.body.classList.add("is-loaded"), 1400);

  /* ---------- Media: reveal images/video once decoded, hide on error ---------- */
  $$("[data-media]").forEach((el) => {
    const done = () => el.classList.add("is-ready");
    const fail = () => { el.style.display = "none"; }; // reveal the CSS gradient behind
    if (el.tagName === "IMG") {
      if (el.complete && el.naturalWidth > 0) done();
      on(el, "load", done);
      on(el, "error", fail);
    } else if (el.tagName === "VIDEO") {
      on(el, "loadeddata", done);
      on(el, "error", fail);
      // If it never loads within 3.5s, keep the ambient fallback
      setTimeout(() => { if (!el.classList.contains("is-ready")) el.style.display = "none"; }, 3500);
    }
  });

  /* ---------- Scroll progress bar ---------- */
  const progress = $(".progress");
  const setProgress = () => {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    if (progress) progress.style.transform = `scaleX(${scrolled})`;
  };

  /* ---------- Nav scroll state + back to top ---------- */
  const nav = $(".nav");
  const totop = $(".totop");
  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("is-scrolled", y > 40);
    if (totop) totop.classList.toggle("is-visible", y > 700);
    setProgress();
  };
  let ticking = false;
  on(window, "scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => { onScroll(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = $(".nav__toggle");
  const closeMenu = () => document.body.classList.remove("menu-open");
  on(toggle, "click", () => document.body.classList.toggle("menu-open"));
  $$(".nav__mobile a").forEach((a) => on(a, "click", closeMenu));
  on(document, "keydown", (e) => {
    if (e.key === "Escape") { closeMenu(); closeLightbox(); }
  });

  /* ---------- Smooth anchor scroll ---------- */
  $$('a[href^="#"]').forEach((a) => {
    on(a, "click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$(".reveal, .stat");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (entry.target.classList.contains("stat")) countUp(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => { el.classList.add("is-visible"); if (el.classList.contains("stat")) countUp(el); });
  }

  /* ---------- Count up ---------- */
  function countUp(stat) {
    const numEl = $(".stat__num-value", stat);
    if (!numEl) return;
    const target = parseFloat(numEl.dataset.count || "0");
    const decimals = (numEl.dataset.decimals && parseInt(numEl.dataset.decimals)) || 0;
    if (reduceMotion) { numEl.textContent = target.toFixed(decimals); return; }
    const dur = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      numEl.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(tick);
      else numEl.textContent = target.toFixed(decimals);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Hero parallax ---------- */
  const heroMedia = $(".hero__media");
  if (heroMedia && !reduceMotion) {
    on(window, "scroll", () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroMedia.style.transform = `translateY(${y * 0.25}px)`;
      }
    }, { passive: true });
  }

  /* ---------- Custom cursor ---------- */
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (finePointer && !reduceMotion) {
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.append(dot, ring);
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    on(window, "mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    $$("a, button, .card, .tile, input, textarea, .play").forEach((el) => {
      on(el, "mouseenter", () => ring.classList.add("is-hover"));
      on(el, "mouseleave", () => ring.classList.remove("is-hover"));
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !reduceMotion) {
    $$("[data-magnetic]").forEach((el) => {
      const strength = 0.35;
      on(el, "mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      on(el, "mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- Lightbox (hero showreel) ---------- */
  const lightbox = $(".lightbox");
  const lbVideo = $(".lightbox__inner video");
  function openLightbox() {
    if (!lightbox) return;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
    if (lbVideo) { try { lbVideo.play(); } catch (e) {} }
  }
  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lbVideo) { try { lbVideo.pause(); } catch (e) {} }
  }
  $$("[data-lightbox-open]").forEach((el) => on(el, "click", openLightbox));
  $$("[data-lightbox-close]").forEach((el) => on(el, "click", closeLightbox));
  on(lightbox, "click", (e) => { if (e.target === lightbox) closeLightbox(); });

  /* ---------- Marquee: duplicate content for a seamless loop ---------- */
  $$(".marquee__track").forEach((track) => {
    track.innerHTML += track.innerHTML;
  });

  /* ---------- Form validation with micro-interactions ---------- */
  const form = $(".form");
  if (form) {
    const validators = {
      name: (v) => v.trim().length >= 2 || "Please enter your name.",
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Enter a valid email address.",
      project: (v) => v.trim().length >= 1 || "Tell us a little about the project.",
    };
    const validateField = (field) => {
      const input = $("input, textarea", field);
      if (!input) return true;
      const rule = validators[input.name];
      if (!rule) return true;
      const res = rule(input.value);
      const ok = res === true;
      field.classList.toggle("is-invalid", !ok);
      const err = $(".field__error", field);
      if (err && !ok) err.textContent = res;
      return ok;
    };
    $$(".field", form).forEach((field) => {
      const input = $("input, textarea", field);
      on(input, "blur", () => { if (input.value) validateField(field); });
      on(input, "input", () => { if (field.classList.contains("is-invalid")) validateField(field); });
    });
    on(form, "submit", (e) => {
      e.preventDefault();
      let valid = true;
      $$(".field", form).forEach((field) => { if (!validateField(field)) valid = false; });
      if (!valid) {
        const firstBad = $(".field.is-invalid", form);
        if (firstBad) firstBad.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        return;
      }
      form.classList.add("is-sent");
    });
  }

  /* ---------- Current year ---------- */
  const yearEl = $("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
