document.addEventListener('DOMContentLoaded', () => {
    const usernameElement = document.getElementById('username');
    const passwordElement = document.getElementById('password');
    const roleElement = document.getElementById('role');
    const logoutButton = document.getElementById('logout-button');

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        alert('Please log in to view your profile.');
        window.location.href = 'index.html';
        return;
    }

    usernameElement.textContent = user.username;
    passwordElement.textContent = '******'; // Do not display the actual password
    roleElement.textContent = user.role;

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert('Logged out successfully!');
        window.location.href = 'index.html';
    });
});
