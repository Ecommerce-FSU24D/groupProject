/* ##### Index page ##### */







/* ##### Product-grid ##### */



const categories = {
    "67587d1b1b92081d71bb9836": "Jul",
    "67587d6c1b92081d71bb9838": "Halloween",
    "67587da91b92081d71bb983a": "Natur",
    "67587e091b92081d71bb983c": "Rymden",
    "67587e4d1b92081d71bb983e": "Sport",
    "67587e9b1b92081d71bb9840": "Träning",
    "67587f001b92081d71bb9842": "LED",
    "67587fcd1b92081d71bb9844": "Samlarobjekt"
};

async function fetchProducts(categoryName) {
    try {
        //Hämtar produkter från API
        const response = await fetch('https://ecommerce-api-livid-six.vercel.app/products');
        if (!response.ok) throw new Error("Fel vid hämtning av produkter");
        const products = await response.json();

        // Filtrerar produkter baserat på kategori
        const filterProducts = products.filter(product => categories[product.category] === categoryName);

        // ### Spara produkter i localStorage. ###
        localStorage.setItem('products', JSON.stringify(filterProducts));

        const productGrid = document.querySelector('.product-grid');

        if (filterProducts.length === 0) {
            productGrid.innerHTML = `<p>Inga produkter hittades för kategorin "${categoryName}".</p>`;
            return;
        }
    

        filterProducts.forEach((product, index) => {
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');

          // Extrahera priset 
          const price = product.price["$numberDecimal"] ? `${product.price["$numberDecimal"]} kr` : "Ej angivet";

          // Hämtar betyget
          const rating = Array.isArray(product.ratings) && product.ratings.length > 0
          ? product.ratings[0].rating
          : "Betyg saknas";

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
  
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Läser kategori från query string och visa produkter
const selectedCategory = getQueryParameter('category');
if (selectedCategory) {
    document.querySelector('main h1').textContent = `${selectedCategory}`;
    fetchProducts(selectedCategory);
} else {
    document.querySelector('.product-grid').innerHTML = `<p>Ingen kategori vald.</p>`;
}

/* ##### Product-page ##### */