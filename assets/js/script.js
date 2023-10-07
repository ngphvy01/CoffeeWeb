'use strict';

//---------------------------- PRELOAD----------------------

const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

//  add event listener on multiple elements

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}


//---------------------------- NAVBAR----------------------
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

//---------------------------- HEADER AND BACK_TO_TOP BUTTON----------------------

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});


//---------------------------- SLIDER PART ----------------------
const sliderPartSlider = document.querySelector("[data-sliderPart-slider]");
const sliderPartSliderItems = document.querySelectorAll("[data-sliderPart-slider-item]");
const sliderPartSliderPrevBtn = document.querySelector("[data-prev-btn]");
const sliderPartSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = sliderPartSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  sliderPartSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = sliderPartSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= sliderPartSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

sliderPartSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = sliderPartSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

sliderPartSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([sliderPartSliderNextBtn, sliderPartSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([sliderPartSliderNextBtn, sliderPartSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);


//---------------------------- MENU ----------------------
let data = [['Strawberry yogurt', '', '$2.00', 'Strawberry, Milk, Yogurt', 'menu1.jpg'],
['Matcha Milk', 'SIGNATURE', '$3.00', 'Matcha, Milk and Cream cheese', 'menu2.jpg'],
['Bubble Tea', 'SIGNATURE', '$3.00', 'Matcha, Milk and Cream', 'menu3.jpg'],
['Coffee/Matcha Coffee', 'SIGNATURE', '$3.00', 'Matcha, Milk and Cream cheese', 'menu4.jpg'],
['Cream', 'SIGNATURE', '$3.50', 'Matcha, Milk and Cream cheese', 'menu5.jpg'],
['Stereo', 'SIGNATURE', '$3.00', 'Matcha, Milk and Cream cheese', 'menu6.jpg'],
['Matcha Cake', 'SIGNATURE', '$4.00', 'Matcha, Milk and Cream cheese', 'menu7.jpg'],];
let menuList = document.getElementById("menuList");
for (i = 0; i < data.length; ++i) {
  let li = document.createElement('li');
  li.innerHTML =
    '<div class="menu-card hover:card">'
    + '<div  class="menu-card">'

    + '<figure class="card-banner img-holder">'
    + '<img src="./assets/images/' + data[i][4] + '"width="100" height="100" loading="lazy"'
    + 'class="img-cover">'
    + '</figure>'

    + '<div>'

    + '<div class="title-wrapper">'
    + '<h3 class="title-3">'
    + '<a href="#" class="card-title">' + data[i][0] + '</a>'
    + '</h3>'
    + '<span class="badge label-1">' + data[i][1] + '</span>'
    + '</div>'

    + '<p class="card-text label-1">' + data[i][3] + '</p>'
    + '</div>'

    + '</div>'
    + '<span class="title-2" style="color:var(--pink-primary);">' + data[i][2] + '</span>'
    + '</div>';
  menuList.appendChild(li);
}

//---------------------------- RESERVATION ----------------------
const locationList = document.querySelectorAll("[data-location]");
let currentLocationPos = 0;
let lastActiveLocationItem = locationList[0];

for (var i = 0; i < locationList.length; i++) {
  locationList[i].addEventListener('click', ((j) => {
    return function () {

      lastActiveLocationItem.classList.remove("active");
      locationList[j].classList.add("active");
      lastActiveLocationItem = locationList[j];

      resetReservationState();
    }
  }
  )(i), true
  )
}

function starRating(value) {
  let result = '<div class="reviews">';
  for (let j = 1; j < 6; j++) {
    if (j <= value) {
      result = result + '<i class="fa fa-star checked"></i>';
    }
    else {
      result = result + '<i class="fa fa-star-o"></i>';
    }
  }
  result = result + '</div>';
  return result;
}

let dataRestaurant = [['LIB Le Thanh Ton', '8/15 Le Thanh Ton Street, Ben Nghe Ward, District 1', 4, 'place1.jpg'],
['LIB SaiGon Center', '8/15 Le Thanh Ton Street, Ben Nghe Ward, District 1', 5, 'place2.jpg'],
['LIB GigaMall', '8/15 Le Thanh Ton Street, Ben Nghe Ward, District 1', 5, 'place3.jpg'],
['LIB Le Thanh Ton', '8/15 Le Thanh Ton Street, Ben Nghe Ward, District 1', 4, 'place1.jpg'],];

function showList() {
  let restaurantList = document.getElementById("restaurantList");
  restaurantList.innerHTML = '';
  for (i = 0; i < dataRestaurant.length; ++i) {
    let li = document.createElement('li');
    let rate = starRating(dataRestaurant[i][2]);
    li.innerHTML =
      '<div class="menu-card hover:card">'
      + '<div  class="menu-card" style="border:none;">'

      + '<figure class="card-banner img-holder">'
      + '<img src="./assets/images/' + dataRestaurant[i][3] + '"width="100" height="100" loading="lazy"'
      + 'class="img-cover">'
      + '</figure>'

      + '<div>'

      + '<h3 class="title-3">'
      + '<a href="#" class="restaurant-card-title">' + dataRestaurant[i][0] + '</a>'
      + '</h3>'

      + '<p class="restaurant-card-address body-4 ">' + dataRestaurant[i][1] + '</p>'
      + rate
      + '</div>'

      + '</div>'
      + '<span class="body-2 display-1 restaurant-hour ">' + selectedTime.value + '</span>'
      + '</div>';
    restaurantList.appendChild(li);
  }
  return false;
}

let bookTableBtn = document.getElementById('bookTableBtn');

let selectedTime = document.getElementById('selectedTime');
let selectedDate = document.getElementById('selectedDate');
let selectedPeople = document.getElementById('selectedPeople');

const onVerify = function () {
  if (selectedTime.value != '' && selectedDate.value != '' && selectedPeople.value != '') {
    bookTableBtn.disabled = false;
  }
  else {
    bookTableBtn.disabled = true;
  }
}

function resetReservationState() {
  let restaurantList = document.getElementById("restaurantList");
  restaurantList.innerHTML = '';
  selectedTime.selectedIndex = 0;
  selectedPeople.selectedIndex = 0;
  selectedDate.value = '';
  onVerify();
}

selectedTime.addEventListener("change", onVerify);
selectedDate.addEventListener("change", onVerify);
selectedPeople.addEventListener("change", onVerify);
bookTableBtn.disabled = true;
bookTableBtn.addEventListener('click', showList);