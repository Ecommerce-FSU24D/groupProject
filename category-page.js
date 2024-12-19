const searchErrorContainer = document.getElementById('searchErrorContainer');
const productGrid = document.querySelector('.banner-container');

const categoryValues = {
    "Jul": "67587d1b1b92081d71bb9836",
    "Rymden": "67587e091b92081d71bb983c",
    "Sport": "67587e4d1b92081d71bb983e",
    "Träning": "67587e9b1b92081d71bb9840",
    "LED": "67587f001b92081d71bb9842",
    "Samlarobjekt": "67587fcd1b92081d71bb9844",
    "Natur": "67587da91b92081d71bb983a",
    "Halloween": "67587d6c1b92081d71bb9838"
};

const categoryCheckboxes = document.querySelectorAll('.category-checkbox');
const priceRadios = document.querySelectorAll('input[name="price-sort"]');

function getSelectedCategories() {
    const selectedCategories = [];
    categoryCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedCategories.push(categoryValues[checkbox.value]);
        }
    });
    return selectedCategories;
}

function getSelectedPriceSort() {
    let sortOrder = 'none';
    priceRadios.forEach(radio => {
        if (radio.checked) {
            sortOrder = radio.value;
        }
    });
    return sortOrder;
}

// Visa produkter
async function fetchProducts() {
    const selectedCategories = getSelectedCategories();
    const sortOrder = getSelectedPriceSort();

    try {
        const response = await fetch('https://ecommerce-api-livid-six.vercel.app/products');
        if (!response.ok) throw new Error("Fel vid hämtning av produkter");
        const products = await response.json();

        let filteredProducts = selectedCategories.length > 0
            ? products.filter(product => selectedCategories.includes(product.category))
            : products;

        if (filteredProducts.length === 0) {
            productGrid.innerHTML = `<p>Inga produkter hittades för de valda kategorierna.</p>`;
            return;
        }

        if (sortOrder === 'low-to-high') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'high-to-low') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }

        productGrid.innerHTML = '';
        filteredProducts.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            const price = product.price ? `${product.price} kr` : "Ej angivet";
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
        console.error("Kunde inte hämta produkter:", error.message);
        productGrid.innerHTML = "<p>Kunde inte ladda produkter. Försök igen senare.</p>";
    }
}

// Sök i dropdown
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', function (event) {
    event.preventDefault();
    fetchProducts();
});

// Rensa i dropdown
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', function (event) {
    
    categoryCheckboxes.forEach(checkbox => checkbox.checked = false);
    priceRadios.forEach(radio => radio.checked = false);
});