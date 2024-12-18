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


  const productReviews = document.getElementById('product-reviews');

  const price = product.price ? `${product.price} ` : "Ej angivet";
  const averageRating = product.averageRating;
  // const review = product.ratings[0].review;
  const ratings = product.ratings;

  async function fetchUsers() {
    try {
      const response = await fetch('https://ecommerce-api-livid-six.vercel.app/users');
      if (!response.ok) throw new Error('Hittade ingen data');
      usersData = await response.json();
    } catch(error) {
      console.error('Error: ', error);
    }
  }


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
  <p class="product-rating">${averageRating} av 5</p>
  <p id="product-price">${price} kr</p>
  <p class="product-info-header">Recensioner</p>
`;

(async () => {
  await fetchUsers();
  console.log(usersData);
  ratings.map( review => {
    const user = usersData.find(user => user._id === review.user_id);
    const username = user ? `${user.first_name} ${user.last_name}` : "Anonym";
    productReviews.innerHTML += `
      <div class="review-container">
        <p>${username}</p>
        <p>Betyg ${review.rating} av 5</p>
        <p> ${review.review} </p>
      </div>
    `
  });
})();

const reviewForm = document.getElementById('review-form');

reviewForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        rating: parseInt(document.getElementById('rating').value),
        comment: document.getElementById('description-review').value,
    };

    try {
      const response = await fetch(`https://ecommerce-api-livid-six.vercel.app/products/${product._id}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: 'USER_ID', // Vi behöver hämta userns ID och lägga in den här..
            rating: parseInt(document.getElementById('rating').value),
            review: document.getElementById('description-review').value
            
        }),
    });

        if (response.ok) {
            alert('Tackar för recensionen!');
            console.log("OK");
            reviewForm.reset();
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
        }
    } catch (error) {
        alert('An error occurred. Please try again later.');
        console.error('Error:', error);
    }
});



})
