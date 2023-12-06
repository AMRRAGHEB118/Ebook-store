if (!userDetails) {
    window.location.href = 'login.html';
} else {
    if(userDetails.user.role !== 'buyer') {
        window.location.href = '/';
    }
}

const getCartItems = async () => {
    try {
        const response = await axios.get(`${backendUrl}/cart/${userDetails.user._id}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};


const renderCart = async () => {
    const cartItems = await getCartItems();

    const cartTable = document.getElementById('cart-table');
    const totalPriceElement = document.getElementById('total-price');

    cartTable.innerHTML = '<tr><th>Ebook</th><th>Quantity</th><th>Categories</th><th>Subtotal</th></tr>';

    let totalPrice = 0;

    cartItems.forEach(item => {
        const subtotal = item.quantity * item.price;
        totalPrice += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="cart-info">
                    <img src="images/ActionBook4.jpeg" alt="${item.name}" />
                    <div>
                        <p>${item.name}</p>
                        <small>Price: ${item.price.toFixed(2)} $</small> <br />
                        <a href="#">Remove</a>
                    </div>
                </div>
            </td>
            <td>${item.quantity}</td>
            <td>${item.category}</td>
            <td>${subtotal.toFixed(2)} $</td>
        `;

        cartTable.appendChild(row);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2) + ' $';
};

renderCart();
