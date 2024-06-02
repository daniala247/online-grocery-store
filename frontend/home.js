document.addEventListener('DOMContentLoaded', async () => {
    const productList = document.getElementById('products');

    async function fetchProducts() {
        try {
            const response = await fetch('http://localhost:3000/api/products');
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
        li.textContent = `${product.name} - $${product.price} - ${product.category}`;

        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Cart';
        addButton.addEventListener('click', () => {
            addToCart(product);
        });

        li.appendChild(addButton);
        productList.appendChild(li);
    }

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart');
    }

    fetchProducts();
});
