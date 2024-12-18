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
  <p>${product.description}</p>
  <p><b>Antal kvar:</b> ${product.stock}</p>
  <p><b>Betyg</b> ${averageRating} av 5</p>
  <p id="product-price"><b>Pris:</b> ${price} kr</p>
  <h2>Recensioner</h2>
  <img src="/assets/assets/shopping-cart-outline-svgrepo-com.svg"
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
        const response = await fetch('https://ecommerce-api-livid-six.vercel.app/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
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
