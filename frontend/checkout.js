document.addEventListener('DOMContentLoaded', () => {
    const server_url = "http://localhost:3000/api";
    const checkoutForm = document.getElementById('add-checkout-form');
    console.log(checkoutForm)

    checkoutForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const orderDetails = {
            name: checkoutForm.name.value,
            address: checkoutForm.address.value,
            city: checkoutForm.city.value,
            state: checkoutForm.state.value,
            zip: checkoutForm.zip.value,
            cart: JSON.parse(localStorage.getItem('cart')) || []
        };
        const formData = new FormData(checkoutForm)
        console.log(formData)

        try {
            const response = await fetch(`${server_url}/orders/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderDetails)
            });

            if (response.ok) {
                localStorage.removeItem('cart');
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
