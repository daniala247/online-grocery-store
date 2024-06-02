document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-product-form');
    const productList = document.getElementById('products');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = form.name.value;
        const price = form.price.value;
        const category = form.category.value;

        try {
            const response = await fetch('http://localhost:3000/api/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, price, category })
            });

            if (response.ok) {
                const product = await response.json();
                addProductToList(product);
                form.reset();
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

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

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/${product._id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    productList.removeChild(li);
                } else {
                    console.error('Failed to delete product');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });

        li.appendChild(deleteButton);
        productList.appendChild(li);
    }

    fetchProducts();
});
