document.addEventListener('DOMContentLoaded', async () => {
    const server_url = "http://localhost:3000/api";
    const productList = document.getElementById('products');
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const searchButton = document.getElementById('search-button');
    const searchBox = document.getElementById('search-box');

    searchButton.addEventListener('click', () => {
        if (searchBox.style.display === 'none' || searchBox.style.display === '') {
            searchBox.style.display = 'block';
        } else {
            searchBox.style.display = 'none';
        }
    });

  //  if (!token || !user) {
    //    alert('Please log in to add items to your cart.');
      //  window.location.href = 'index.html';
        //return;
   // }

    async function fetchGroupedProducts(query = '') {
        try {
            const response = await fetch(`${server_url}/products/grouped?query=${encodeURIComponent(query)}`);
            if (response.ok) {
                const groupedProducts = await response.json();
                productList.innerHTML = ''; // Clear the list before adding new items
                for (const [category, products] of Object.entries(groupedProducts)) {
                    addCategoryToList(category, products);
                }
            } else {
                console.error('Failed to fetch products');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function addCategoryToList(category, products) {
        const categorySection = document.createElement('section');
        const categoryHeader = document.createElement('h3');
        categoryHeader.textContent = category;
        categoryHeader.classList.add('category-header');

        const ul = document.createElement('ul');
        ul.classList.add('category-list');

        products.forEach(product => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${product.image}" alt="${product.name}" width="100">
                <div class="product-details">
                    <span class="product-name">${product.name}</span>
                    <span class="product-price">$${product.price}</span>
                </div>
                <button onclick="addToCart('${product._id}')">Add to Cart</button>
            `;
            ul.appendChild(li);
        });

        categorySection.appendChild(categoryHeader);
        categorySection.appendChild(ul);
        productList.appendChild(categorySection);
    }

    window.addToCart = (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to add items to your cart.');
            return;
        }
        
        let cart = JSON.parse(localStorage.getItem(`cart_${user._id}`)) || [];
        const existingItem = cart.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ productId, quantity: 1 });
        }
        localStorage.setItem(`cart_${user._id}`, JSON.stringify(cart));
        alert('Product added to cart');
    };

    searchBox.addEventListener('keyup', async (event) => {
        const query = searchBox.value.trim();
        fetchGroupedProducts(query);
    });

    fetchGroupedProducts();
});
