// public/app.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => response.json())
        .then(data => {
            const productsDiv = document.getElementById('products');
            data.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.textContent = `${product.name} - $${product.price}`;
                productsDiv.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});
