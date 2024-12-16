document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".item");
  const totalItemsElement = document.getElementById("total-items");
  const totalPriceElement = document.getElementById("total-price");
  const checkoutBtn = document.querySelector(".checkout-btn");

  function updateSummary() {
      let totalItems = 0;
      let totalPrice = 0;

      items.forEach(item => {
          const quantity = parseInt(item.querySelector(".quantity").value);
          const price = parseInt(item.dataset.price);
          totalItems += quantity;
          totalPrice += quantity * price;

          item.querySelector(".item-total").textContent = `€${(quantity * price).toFixed(2)}`;
      });

      totalItemsElement.textContent = totalItems;
      totalPriceElement.textContent = `€${totalPrice.toFixed(2)}`;
  }

  items.forEach(item => {
      const minusBtn = item.querySelector(".minus-btn");
      const plusBtn = item.querySelector(".plus-btn");
      const quantityInput = item.querySelector(".quantity");
      const removeBtn = item.querySelector(".remove-btn");

      minusBtn.addEventListener("click", () => {
          const quantity = Math.max(1, parseInt(quantityInput.value) - 1);
          quantityInput.value = quantity;
          updateSummary();
      });

      plusBtn.addEventListener("click", () => {
          const quantity = parseInt(quantityInput.value) + 1;
          quantityInput.value = quantity;
          updateSummary();
      });

      removeBtn.addEventListener("click", () => {
          item.remove();
          updateSummary();
      });
  });

  checkoutBtn.addEventListener("click", () => {
      alert("Merry Christmas! 🎄 Thank you for shopping!");
     
  });

  updateSummary();
});
