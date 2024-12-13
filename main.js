/* ##### Index page ##### */







/* ##### Product-grid ##### */
async function fetchProducts() {
    try {
        const response = await fetch('https://ecommerce-api-livid-six.vercel.app/products');
        const products = await response.json();
        const productGrid = document.querySelector('.product-grid');
    
        // Välj fyra slumpmässiga produkter
        const shuffledProducts = products.sort(() => 0.5 - Math.random());
        const randomProducts = shuffledProducts.slice(0, 4);

        /* Spara products i localStorage så att de kan hämtas i product-page.html. Jag hittar inget sätt att komma åt objektet
        dynamiskt via vårt API så jag får hämta dem via localStorage istället.*/

        localStorage.setItem('products', JSON.stringify(products));
    
        randomProducts.forEach((product, index) => {
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');

          // Extrahera priset 
          const price = product.price["$numberDecimal"] ? `${product.price["$numberDecimal"]} kr` : "Ej angivet";

          // Hämtar betyget
          const rating = Array.isArray(product.ratings) && product.ratings.length > 0
          ? product.ratings[0].rating
          : "Ingen rating";


          productCard.innerHTML = `
              <img src="${product.images}" alt="${product.title}">
              <p>${price}</p>
              <h3>${product.name}</h3>
              <p>Betyg: ${rating} av 5</p>
              <p>${product.description.substring(0, 50)}... <a href="product-page.html?index=${index}" class="read-more-link">Läs mer</a></p>
          `;

          productGrid.appendChild(productCard);
        });
    } catch (error) {
        console.error("Kunde inte hämta produkter:", error);
        document.querySelector('.product-grid').innerHTML = "<p>Kunde inte ladda produkter. Försök igen senare.</p>";
    }
}
  
fetchProducts();

/* ##### Product-page ##### */
