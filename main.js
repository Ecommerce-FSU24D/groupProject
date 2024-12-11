async function fetchProducts() {
    const response = await fetch('https://ecommerce-api-livid-six.vercel.app/products');
    const products = await response.json();
    const productGrid = document.querySelector('.product-grid');
  
    // Välj fyra slumpmässiga produkter
    const shuffledProducts = products.sort(() => 0.5 - Math.random());
    const randomProducts = shuffledProducts.slice(0, 4);
  
    randomProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');
  
      // Extrahera priset från product.price
      const price = product.price["$numberDecimal"] ? `${product.price["$numberDecimal"]} kr` : "Ej angivet";
  
      productCard.innerHTML = `
        <img src="${product.images}" alt="${product.name}">
        <p>${price}</p>
        <h3>${product.name}</h3>
        <p>${product.description.substring(0, 50)}... <a href="product.html?id=${product.id}" class="read-more-link">Läs mer</a></p>
      `;
  
      productGrid.appendChild(productCard);
    });
  }
  
  fetchProducts();
  
