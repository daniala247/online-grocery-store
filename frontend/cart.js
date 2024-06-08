document.addEventListener('DOMContentLoaded', () => {
    const server_url = "https://online-grocery-store-w7fa.vercel.app/api";
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
        alert('Please log in to view your cart.');
        window.location.href = 'home.html';
        return;
    }

    async function loadCart() {
        let cart = JSON.parse(localStorage.getItem(`cart_${user._id}`)) || [];
        cartItemsList.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
            cartTotalDiv.textContent = '';
            return;
        }

        
        const productCount = {}; // Object to store product counts
        
            // Count the occurrences of each productId
        for (let productId of cart) {
            if (productCount[productId]) {
                productCount[productId]++;
            } else {
                productCount[productId] = 1;
            }
        }
        cart = [...new Set(cart)];
        console.log(cart)
    
        // Fetch and display product details with quantities
        for (let productId in productCount) {
            try {
                const response = await fetch(`${server_url}/products/${productId}`);
                if (response.ok) {
                    const product = await response.json();
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" width="100">
                        <span>${product.name} - $${product.price} - x${productCount[productId]}</span>
                        <button onclick="removeFromCart('${productId}')">Remove</button>
                    `;
                    cartItemsList.appendChild(li);
                    total += product.price * productCount[productId]; // Multiply price by quantity
                    cartTotalDiv.textContent = `Total: $${total.toFixed(2)}`;
                } else {
                    console.error('Failed to fetch product:', productId, response.message);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        }
        
        
    }

    window.removeFromCart = (productId) => {
        let cart = JSON.parse(localStorage.getItem(`cart_${user._id}`)) || [];
        cart = cart.filter(id => id !== productId);
        localStorage.setItem(`cart_${user._id}`, JSON.stringify(cart));
        loadCart();
    };

    checkoutButton.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem(`cart_${user._id}`)) || [];
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
        } else {
            window.location.href = 'checkout.html';
        }
    });

    loadCart();
});
