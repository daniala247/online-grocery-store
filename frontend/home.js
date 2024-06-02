document.addEventListener('DOMContentLoaded', async () => {
    const server_url = "http://localhost:3000/api";
    const productList = document.getElementById('products');

    async function fetchProducts() {
        try {
            const response = await fetch(`${server_url}/products`);
            if (response.ok) {
                const products = await response.json();
                products.forEach(product => addProductToList(product));
            } else {
                console.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function addProductToList(product) {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="100">
            <span>${product.name} - $${product.price} - ${product.category}</span>
            <button onclick="addToCart('${product._id}')">Add to Cart</button>
        `;
        productList.appendChild(li);
    }

    window.addToCart = (productId) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (!cart.includes(productId)) {
            cart.push(productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Product added to cart');
        } else {
            alert('Product is already in the cart');
        }
    };

    fetchProducts();
});
