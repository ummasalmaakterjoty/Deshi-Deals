// traverse technique
const cartbtns = document.getElementsByClassName("cart-btn");
const cartContainer = document.getElementById("cart-container");
const totalPriceElement = document.getElementById("total-price");
const quantityElement = document.getElementById("total-quantity");
const clearBtn = document.getElementById("btn-clear");

// Add products to cart
for (let cartButton of cartbtns) {
  cartButton.addEventListener("click", function () {
    // product image
    const productImg =
      cartButton.parentNode.parentNode.parentNode.children[0].children[0].src;

    // product title
    const productTitle =
      cartButton.parentNode.parentNode.parentNode.children[1].children[0]
        .innerText;

    // product price text (example: "120 TK")
    const productPrice = cartButton.parentNode.parentNode.children[2].innerText;

    // remove all non-numeric characters except dot
    const numericPrice = parseFloat(productPrice.replace(/[^0-9.]/g, ""));

    // update total price
    const currentTotal = parseFloat(totalPriceElement.innerText) || 0;
    totalPriceElement.innerText = currentTotal + numericPrice;

    // update total quantity
    const currentQuantity = parseInt(quantityElement.innerText) || 0;
    quantityElement.innerText = currentQuantity + 1;

    // add item to cart container
    const newCart = document.createElement("div");
    newCart.innerHTML = `
      <div class="bg-gray-200 rounded-xl flex justify-between items-center p-4 mb-2">
        <img src="${productImg}" alt="product" class="w-10">
        <div>
          <h2 class="font-bold">${productTitle}</h2>
          <h2 class="product-price">${numericPrice}</h2>
        </div>
        <button class="remove-btn bg-red-500 text-white px-2 py-1 rounded">X</button>
      </div>
    `;

    cartContainer.append(newCart);

    // Remove individual item
    const removeBtn = newCart.querySelector(".remove-btn");
    removeBtn.addEventListener("click", function () {
      const itemPrice = parseFloat(
        newCart.querySelector(".product-price").innerText
      );

      // subtract price
      const total = parseFloat(totalPriceElement.innerText);
      totalPriceElement.innerText = total - itemPrice;

      // subtract quantity
      const qty = parseInt(quantityElement.innerText);
      quantityElement.innerText = qty - 1;

      // remove item
      newCart.remove();
    });
  });
}

// Clear all items
clearBtn.addEventListener("click", function () {
  cartContainer.innerHTML = ""; // remove all items
  totalPriceElement.innerText = 0; // reset price
  quantityElement.innerText = 0; // reset quantity
});
