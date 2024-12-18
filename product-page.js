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

  const price = product.price;
  const rating = product.ratings[0].rating;
  const review = product.ratings[0].review;

  productImageDiv.innerHTML = `
  <img src="${product.images}" alt="${product.name}">
  `;

  productInfoDiv.innerHTML = `
  <h1>${product.name}</h1>
  <p class="product-info-header">Produktbeskrivning</p>
  <p>${product.description}</p>
  <p class="product-info-header">Antal kvar på lagret</p>
  <svg class="product-stock" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<linearGradient id="IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1" x1="9.858" x2="38.142" y1="9.858" y2="38.142" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#9dffce"></stop><stop offset="1" stop-color="#50d18d"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Ra_pIPl8tqh3igN_gr1)" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><linearGradient id="IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2" x1="13" x2="36" y1="24.793" y2="24.793" gradientUnits="userSpaceOnUse"><stop offset=".824" stop-color="#135d36"></stop><stop offset=".931" stop-color="#125933"></stop><stop offset="1" stop-color="#11522f"></stop></linearGradient><path fill="url(#IMoH7gpu5un5Dx2vID39Rb_pIPl8tqh3igN_gr2)" d="M21.293,32.707l-8-8c-0.391-0.391-0.391-1.024,0-1.414l1.414-1.414	c0.391-0.391,1.024-0.391,1.414,0L22,27.758l10.879-10.879c0.391-0.391,1.024-0.391,1.414,0l1.414,1.414	c0.391,0.391,0.391,1.024,0,1.414l-13,13C22.317,33.098,21.683,33.098,21.293,32.707z"></path>
</svg>
  <p class="product-stock">${product.stock}</p>
  <p class="product-info-header">Kundomdömen</p>
  <img class="product-rating" src="assets/icons8-rating-48.png">
  <p class="product-rating">${rating} av 5</p>
  <p id="product-price">${price} kr</p>
  <p class="product-info-header">Recensioner</p>
  <p> " ${review} " </p>
`;


})
