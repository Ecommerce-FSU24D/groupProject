document.addEventListener("DOMContentLoaded", function() {
  // Hämtar index genom från product-grid.html, index avgörs av vilken produkt som användaren klickar på.
  const urlParams = new URLSearchParams(window.location.search);
  const productIndex = urlParams.get('index');
  
  // Hämtar products som sparades i localStorage genom main.js (när produkter genereras på product-grid.html sidan)
  const products = JSON.parse(localStorage.getItem('products'));

  const product = products[productIndex];
  
  // Container för produktinformation (pris, beskrivning etc)
  const productInfoDiv = document.getElementById('product-info');

  // Container för produktbild
  const productImageDiv = document.getElementById('product-image-container');

  const price = product.price["$numberDecimal"];
  const rating = product.ratings[0].rating;
  const review = product.ratings[0].review;

  productImageDiv.innerHTML = `
  <img src="${product.images}" alt="${product.name}">
  `;

  productInfoDiv.innerHTML = `
  <h1>${product.name}</h1>
  <p>${product.description}</p>
  <p><b>Antal kvar:</b> ${product.stock}</p>
  <p><b>Betyg</b> ${rating} av 5</p>
  <p id="product-price"><b>Pris:</b> ${price} kr</p>
  <h2>Recensioner</h2>
  <p> ${review} </p>
  <img src="/assets/assets/shopping-cart-outline-svgrepo-com.svg"
`;
})
