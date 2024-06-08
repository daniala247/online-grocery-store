document.addEventListener('DOMContentLoaded', () => {
    const server_url = "https://online-grocery-store-w7fa.vercel.app/api";
    const checkoutForm = document.getElementById('add-checkout-form');
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
        alert('Please log in to proceed to checkout.');
        window.location.href = 'index.html';
        return;
    }

    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const orderDetails = {
            name: checkoutForm.name.value,
            address: checkoutForm.address.value,
            city: checkoutForm.city.value,
            state: checkoutForm.state.value,
            zip: checkoutForm.zip.value,
            cart: JSON.parse(localStorage.getItem(`cart_${user._id}`)) || []
        };

        try {
            const response = await fetch(`${server_url}/orders/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(orderDetails)
            });

            if (response.ok) {
                localStorage.removeItem(`cart_${user._id}`);
                alert('Order placed successfully!');
                window.location.href = 'orders.html';
            } else {
                console.error('Failed to place order');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
