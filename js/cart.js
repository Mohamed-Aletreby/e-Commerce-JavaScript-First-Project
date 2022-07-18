/* Start Cart code */

// Start Selecting Elements
let cartTableBody = document.querySelector(".cart__body");
let pageContent = JSON.parse(localStorage.getItem("cartInformation"));

function displayItems() {
  let bodyContent = "";
  for (let i = 0; i < pageContent.length; i++) {
    bodyContent += `<tr>
                <td class='cart__index'>${i}</td>
                <td class="cart__img">
                  <img src="${pageContent[i].cartImageSource}" alt="" />
                </td>
                <td class="cart__title">
                  ${pageContent[i].cartTitle}
                </td>
                <td class="cart__price">${pageContent[i].cartPrice}</td>
                <td class="cart__quantity">
                  <input type="number" class="cart__quantity-input" value="1">
                </td>
                <td class="cart__total"></td>
                <td class="cart__remove">
                  <button class="cart__remove-btn" onclick='deleteItem(${i})' >
                    remove
                  </button>
                </td>
              </tr>`;
    cartTableBody.innerHTML = bodyContent;
  }
}

displayItems();

// Delete Item Function
function deleteItem(index) {
  // here we cut or splice one item from (index) parameter
  // this (index) parameter value we get it from the loop [i]
  pageContent.splice(index, 1);
  if (pageContent.length === 0) {
    cartTableBody.innerHTML = "";
  }
  // here we must update the localStorage because we updated the[ tasks] array
  localStorage.setItem("cartInformation", JSON.stringify(pageContent));
  console.log(localStorage.getItem("cartInformation"));
  // here we call displayTasks() function to show the user the final result after delete the item
  displayItems();
  afterWebPageLoad()
}

/* End Cart code */

window.addEventListener("load", function () {
  afterWebPageLoad();
});

let priceIndex = 1;
let totalIndex = 1;
let quantityIndex = 1;

function afterWebPageLoad() {
  let cartPrice = Array.from(document.querySelectorAll(".cart__price"));
  let cartTotal = Array.from(document.querySelectorAll(".cart__total"));
  let cartQuantityInputs = Array.from(
    document.querySelectorAll(".cart__quantity .cart__quantity-input")
  );

  cartPrice.forEach(function (price) {
    price.setAttribute("data-index", priceIndex);
    priceIndex++;
  });

  cartTotal.forEach(function (total) {
    total.setAttribute("data-index", totalIndex);
    totalIndex++;
  });

  cartQuantityInputs.forEach(function (cartQuantity) {
    cartQuantity.setAttribute("data-index", quantityIndex);
    quantityIndex++;
  });

  let currentPrice;
  let currentTotal = 0;
  let currentQuantityValue;
  cartQuantityInputs.forEach(function (cartQuantityInput) {
    cartQuantityInput.addEventListener("keyup", function (e) {
      let dataIndex = e.target.getAttribute("data-index");

      for (let i = 0; i < cartPrice.length; i++) {
        if (
          dataIndex === cartPrice[i].getAttribute("data-index") &&
          dataIndex === cartTotal[i].getAttribute("data-index")
        ) {
          currentQuantityValue = Number(cartQuantityInputs[i].value);
          currentPrice = Number(cartPrice[i].textContent.slice(1));
          currentTotal = currentPrice * currentQuantityValue;
          cartTotal[i].textContent = `$ ${currentTotal}`;
        }
      }
    });
  });

  function updatePrice() {
    for (let i = 0; i < pageContent.length; i++) {
      cartTotal[i].textContent = pageContent[i].cartPrice;
    }
  }
  updatePrice();
}
