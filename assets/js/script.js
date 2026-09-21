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