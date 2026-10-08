'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});



/**
 * trip enquiry form -> WhatsApp
 *
 * No server needed: the form builds a message and opens WhatsApp with it.
 * Put the business WhatsApp number below in international format,
 * digits only, no "+" and no spaces. Uganda example: 256700123456
 */

const WHATSAPP_NUMBER = "256704048018";

const enquiryForm = document.querySelector("[data-enquiry-form]");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = new FormData(enquiryForm);
    const message =
      "Hello Wild Africa Trails, I would like to plan a trip.\n\n" +
      "Destination: " + (data.get("destination") || "-") + "\n" +
      "Travellers: " + (data.get("people") || "-") + "\n" +
      "Arrival: " + (data.get("checkin") || "-") + "\n" +
      "Departure: " + (data.get("checkout") || "-");

    window.open(
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message),
      "_blank",
      "noopener"
    );
  });
}


/**
 * gallery carousel
 *
 * Scrolls one photo at a time; arrows disable at either end.
 */

const galleryTrack = document.querySelector("[data-gallery-track]");
const galleryPrev = document.querySelector("[data-gallery-prev]");
const galleryNext = document.querySelector("[data-gallery-next]");

if (galleryTrack && galleryPrev && galleryNext) {
  const slideStep = function () {
    const item = galleryTrack.querySelector(".gallery-item");
    const gap = parseFloat(getComputedStyle(galleryTrack).columnGap) || 0;
    return item.getBoundingClientRect().width + gap;
  };

  const updateArrows = function () {
    const max = galleryTrack.scrollWidth - galleryTrack.clientWidth;
    galleryPrev.disabled = galleryTrack.scrollLeft <= 4;
    galleryNext.disabled = galleryTrack.scrollLeft >= max - 4;
  };

  galleryPrev.addEventListener("click", function () {
    galleryTrack.scrollBy({ left: -slideStep() });
  });

  galleryNext.addEventListener("click", function () {
    galleryTrack.scrollBy({ left: slideStep() });
  });

  galleryTrack.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  updateArrows();

  // autoplay: roll on a timer, wrap back to the start at the end,
  // pause while the visitor hovers, touches, focuses or the tab is hidden
  const AUTOPLAY_MS = 4000;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let autoplayPaused = false;
  let galleryVisible = false;

  const autoplayTick = function () {
    if (autoplayPaused || !galleryVisible || document.hidden) return;
    const max = galleryTrack.scrollWidth - galleryTrack.clientWidth;
    if (galleryTrack.scrollLeft >= max - 4) {
      galleryTrack.scrollTo({ left: 0 });
    } else {
      galleryTrack.scrollBy({ left: slideStep() });
    }
  };

  const pauseAutoplay = function () { autoplayPaused = true; };
  const resumeAutoplay = function () { autoplayPaused = false; };

  if (!reduceMotion) {
    const galleryBox = galleryTrack.closest("[data-gallery]");

    galleryBox.addEventListener("mouseenter", pauseAutoplay);
    galleryBox.addEventListener("mouseleave", resumeAutoplay);
    galleryBox.addEventListener("focusin", pauseAutoplay);
    galleryBox.addEventListener("focusout", resumeAutoplay);
    galleryBox.addEventListener("touchstart", pauseAutoplay, { passive: true });
    galleryBox.addEventListener("touchend", function () {
      setTimeout(resumeAutoplay, AUTOPLAY_MS);
    }, { passive: true });

    new IntersectionObserver(function (entries) {
      galleryVisible = entries[0].isIntersecting;
    }).observe(galleryBox);

    setInterval(autoplayTick, AUTOPLAY_MS);
  }
}
