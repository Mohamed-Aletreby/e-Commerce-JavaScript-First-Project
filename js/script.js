// Start Selecting All Elements we will need
// !(Note) : Every Group of Elements are related to specific code or function, will give it number or Unique Number to know that elements when use it

// Start Selecting Elements are related with Light and Dark Mode Function and give them Unique Number (1)
// Select the HTML Element
const rootElement = document.documentElement;

// Select Light and Dark Mode Elements
const switchElement = document.querySelector(".top-header__light-mode");
const lightElement = switchElement.children[0];
const darkElement = switchElement.children[1];

// Select Toggle Elements and give them Unique Number (2)
const toggleElement = document.querySelector(".top-header__toggle");
const mobileNav = document.querySelector(".mobile-header");
const closeMobileNav = document.querySelector(".mobile-header__close");

// Select Accordion Elements and giv them Unique Number (3)
const accordionItem = Array.from(
  document.querySelectorAll(".mobile-header__links .main-nav__item")
);

const accordionContent = Array.from(
  document.querySelectorAll(".mobile-header__links .main-nav__item  ul")
);

const accordionIcon = Array.from(
  document.querySelectorAll(".mobile-header__links .main-nav__item i")
);

// Select Sliders Elements and give them Unique Number (4)
// Select Sliders Items Elements
const sliderItems = Array.from(
  document.querySelectorAll(".home-section__slider")
);

// Select the Sliders Circles Elements
const sliderCircles = Array.from(
  document.querySelectorAll(".home-section__circles span")
);

// Select the Sliders Buttons Elements

// Select Product Cards Section Elements and give them Unique Number (5)
const productsCards = Array.from(
  document.querySelectorAll(".products__cards .product-card")
);

const quickViewButtons = Array.from(
  document.querySelectorAll(".product-card .card__footer .card__quick-view")
);

const addButtons = Array.from(
  document.querySelectorAll(".product-card .card__footer .card__add")
);

// Select  Product Section Tabs Elements and give them Unique Number (6)
const tabButtons = Array.from(
  document.querySelectorAll(".product-header__nav .product-header__item")
);

/***********************************************************************************/

/***********************************************************************************/
/* Start Dark and Light Mode Functions */

// ! ( Note ) : Here We will Use Elements With Unique Number (1)
// When User Open the site for first time
// here check if there value in localStorage("theme") or not and set this value if found to the root Element
// and change lightElement and darkElement

if (localStorage.getItem("theme") !== null) {
  if (localStorage.getItem("theme") === "dark") {
    lightElement.classList.add("hidden");
    darkElement.classList.remove("hidden");
  } else if (localStorage.getItem("theme") === "light") {
    darkElement.classList.add("hidden");
    lightElement.classList.remove("hidden");
  }
  rootElement.setAttribute("data-theme", localStorage.getItem("theme"));
}

// Switch Between Light and Dark Elements
// and save the value of current status of theme in localStorage
switchElement.addEventListener("click", function (e) {
  if (
    darkElement.classList.contains("hidden") &&
    rootElement.getAttribute("data-theme") === "light"
  ) {
    lightElement.classList.add("hidden");
    darkElement.classList.remove("hidden");
    rootElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else if (
    lightElement.classList.contains("hidden") &&
    rootElement.getAttribute("data-theme") === "dark"
  ) {
    darkElement.classList.add("hidden");
    lightElement.classList.remove("hidden");
    rootElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

/* End Dark and Light Mode Functions */
/***********************************************************************************/
/***********************************************************************************/
/* Start Toggle Code */
// ! ( Note ) : Here We will Use Elements With Unique Number (2)
toggleElement.addEventListener("click", function () {
  mobileNav.style.left = mobileNav.style.left === "-100%" ? "0" : "-100%";
});

closeMobileNav.addEventListener("click", function () {
  mobileNav.style.left = "-100%";
});

/* End Toggle Code */
/***********************************************************************************/
/***********************************************************************************/
/* Start Accordion Code */
// ! ( Note ) : Here We will Use Elements With Unique Number (3)

for (let i = 0; i < accordionItem.length; i++) {
  accordionItem[i].addEventListener("click", function () {
    for (let m = 0; m < accordionContent.length; m++) {
      if (i === m) {
        accordionContent[m].style.display =
          accordionContent[m].style.display == "block" ? "none" : "block";
        accordionIcon[m].classList.replace("fa-angle-down", "fa-angle-up");
      } else {
        accordionContent[m].style.display = "none";
        accordionIcon[m].classList.replace("fa-angle-up", "fa-angle-down");
      }
    }
  });
}
/* End Accordion Code */
/***********************************************************************************/

/***********************************************************************************/
/* Start Sliders Functions */

// ! ( Note ) : Here We will Use Elements With Unique Number (4)

// Set Current Slide Index
let currentSlide = 1;

// Loop Through All Pagination Items
for (let i = 0; i < sliderItems.length; i++) {
  sliderCircles[i].addEventListener("click", function () {
    currentSlide = Number(sliderItems[i].getAttribute("data-index"));
    slider();
  });
}

// Create The Slider Function
function slider() {
  // Remove All Active Classes
  removeAllActive();

  // Set Active Class on Current Slide
  sliderItems[currentSlide - 1].classList.add("home-section__slider--active");

  // Set Active Class on Current Circle
  sliderCircles[currentSlide - 1].classList.add("active");
}

// Remove All Active Classes From Sliders and Circles
function removeAllActive() {
  // Loop Through Sliders Items Elements and remove active class
  sliderItems.forEach(function (slider) {
    slider.classList.remove("home-section__slider--active");
  });

  // Loop Through Slider Circles Items and remove active class
  sliderCircles.forEach(function (item) {
    item.classList.remove("active");
  });
}

/* End Sliders Functions */
/***********************************************************************************/

/***********************************************************************************/
/* Start working with Products Section*/

// ! ( Note ) : Here We will Use Elements With Unique Number (5)

// Here Set the start Number for each variable above, this number we will use to iterate on 3 variables and set to each one custom attribute
let cardIndex = 1;
let addBtnIndex = 1;
let quickViewIndex = 1;

// Set Custom Attribute For Each Card (data-index)
productsCards.forEach(function (card) {
  card.setAttribute("data-index", cardIndex);
  cardIndex++;
});

// Set Custom Attribute For Each Quick View Buttons (data-index)
quickViewButtons.forEach(function (QuickViewButton) {
  QuickViewButton.setAttribute("data-index", quickViewIndex);
  quickViewIndex++;
});

// Set Custom Attribute For Each Add Buttons (data-index)
addButtons.forEach(function (addBtn) {
  addBtn.setAttribute("data-index", addBtnIndex);
  addBtnIndex++;
});

/* Start Quick View Functions */
// Start Quick View Functions to Collecting data about card that clicked and store this data in local storage

// Prepare Variables that will contain the data about the card
let cardImages;
let activeImageSource;
let otherImageSource;
let cardBody;

let cardInformation = [];
// Loop Through All Quick View buttons
quickViewButtons.forEach(function (quickViewButton) {
  quickViewButton.addEventListener("click", function (e) {
    let dataIndex = e.target.getAttribute("data-index");

    for (let i = 0; i < productsCards.length; i++) {
      if (dataIndex === productsCards[i].getAttribute("data-index")) {
        cardImages = productsCards[i].children[0].children[0];
        cardBody = productsCards[i].children[1];

        activeImageSource = cardImages.children[0].children[0].src;
        otherImageSource = cardImages.children[1].children[0].src;

        let cardInfo = {
          activeImageSource: activeImageSource,
          otherImageSource: otherImageSource,
          cardBody: cardBody.innerHTML,
        };

        cardInformation[0] = cardInfo;
        localStorage.setItem(
          "cardInformation",
          JSON.stringify(cardInformation)
        );

        quickViewButton.setAttribute("href", "quick-view.html");
      }
    }
  });
});

/* End Quick View Functions */

/* Start add to cart Functions */
// Start add to cart Functions and Collecting data about card that clicked and store this data in local storage
// Prepare Variables that will contain the data about the card
let cartElement = document.querySelector(".top-header__cart");
let cartCountElement = document.querySelector(".top-header__cart-count");

let cartImageSource;
let cartTitle;
let cartPrice;

let cartCount = 0;

let cartInformation = [];

addButtons.forEach(function (addButton) {
  addButton.addEventListener("click", function (e) {
    e.preventDefault();

    if (e.target.innerText.toLowerCase() === "add to cart") {
      e.target.textContent = "item added";
      e.target.classList.add("active");

      let dataIndex = e.target.getAttribute("data-index");

      for (let i = 0; i < productsCards.length; i++) {
        if (dataIndex === productsCards[i].getAttribute("data-index")) {
          cartImageSource =
            productsCards[i].children[0].children[0].children[0].children[0]
              .src;

          cartTitle = productsCards[i].children[1].children[1].innerText;
          cartPrice =
            productsCards[i].children[1].children[4].children[0].innerText;

          let cartInfo = {
            cartImageSource: cartImageSource,
            cartTitle: cartTitle,
            cartPrice: cartPrice,
            cardIndex: dataIndex,
          };

          cartInformation.push(cartInfo);

          localStorage.setItem(
            "cartInformation",
            JSON.stringify(cartInformation)
          );

          cartCount++;
          cartCountElement.textContent = cartCount;
        }
      }
    }
  });
});

cartElement.addEventListener("click", function (e) {
  if (cartCount > 0) {
    cartElement.setAttribute("href", "cart.html");
  }
});

/* End add to cart Functions */

/* End working with Products Section*/
/***********************************************************************************/

/***********************************************************************************/
/* Start Product Section Tabs Code */
// ! ( Note ) : Here We will Use Elements With Unique Number (6) and the first variable from  Unique Number (5)

tabButtons.forEach(function (tab) {
  tab.addEventListener("click", function (e) {
    if (e.target.getAttribute("data-type") === "all") {
      // mark all tabs as unselected
      tabButtons.forEach(function (tab) {
        tab.setAttribute("aria-selected", false);
      });
      // mark the clicked tab as selected
      e.target.setAttribute("aria-selected", true);
      productsCards.forEach(function (card) {
        card.style.display = "block";
      });
    } else {
      // mark all tabs as unselected
      tabButtons.forEach(function (tab) {
        tab.setAttribute("aria-selected", false);
      });
      // mark the clicked tab as selected
      e.target.setAttribute("aria-selected", true);
      let customAttributeValue = `data-type=${e.target.getAttribute(
        "data-type"
      )}`;
      let activeCards = Array.from(
        document.querySelectorAll(
          `.products__cards .product-card[${customAttributeValue}]`
        )
      );
      productsCards.forEach(function (card) {
        card.style.display = "none";
      });
      activeCards.forEach(function (card) {
        card.style.display = "block";
      });
    }
  });
});

/* End Product Section Tabs Code */
/***********************************************************************************/
