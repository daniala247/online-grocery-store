document.addEventListener('DOMContentLoaded', () => {
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');

    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsList.innerHTML = '';
        let total = 0;

        cart.forEach((product, index) => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - $${product.price} - ${product.category}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                removeFromCart(index);
            });

            li.appendChild(removeButton);
            cartItemsList.appendChild(li);

            total += product.price;
        });

        cartTotalDiv.textContent = `Total: $${total.toFixed(2)}`;
    }

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }

    loadCart();
});
