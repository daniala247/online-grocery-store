document.addEventListener('DOMContentLoaded', () => {
    const server_url = "http://localhost:3000/api";
    const form = document.getElementById('add-product-form');
    const productList = document.getElementById('products');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        
        try {
            const response = await fetch(`${server_url}/products/add`, {
                method: 'POST',
                body: formData
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
        `;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', async () => {
            try {
                const response = await fetch(`${server_url}/products/${product._id}`, {
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
