document.addEventListener('DOMContentLoaded', async () => {
    const server_url = "http://localhost:3000/api";
    const orderList = document.getElementById('order-list');
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Please log in to view your orders.');
        window.location.href = 'index.html';
    }

    async function fetchOrders() {
        try {
            const response = await fetch(`${server_url}/orders`, {
                headers: {
                    'Authorization': token
                }
            });
            if (response.ok) {
                const orders = await response.json();
                orders.forEach(order => addOrderToList(order));
            } else {
                console.error('Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function addOrderToList(order) {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>Order ID: ${order._id}</h3>
            <p>Name: ${order.name}</p>
            <p>Address: ${order.address}, ${order.city}, ${order.state}, ${order.zip}</p>
            <p>Status: ${order.status}</p>
            <p>Ordered on: ${new Date(order.createdAt).toLocaleDateString()}</p>
            <h4>Products:</h4>
            <ul>
                ${order.cart.map(product => `<li>${product.name} - $${product.price}</li>`).join('')}
            </ul>
        `;
        orderList.appendChild(li);
    }

    fetchOrders();
});
