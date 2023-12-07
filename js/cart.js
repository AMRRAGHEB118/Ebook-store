if (!userDetails) {
    window.location.href = 'login.html';
} else {
    if(userDetails.user.role === 'admin') {
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
    const discountInfoElement = document.getElementById('discount-info');
    const appliedCouponElement = document.getElementById('applied-coupon');

    cartTable.innerHTML = '<tr><th>Ebook</th><th>Quantity</th><th>Categories</th><th>Subtotal</th></tr>';

    let totalPrice = cartItems.totalPrice;
    let totalItemPrice = 0;
    let cartQuantity = 0;

    cartItems.products.forEach(item => {
        const subtotal = item.quantity * item.price;
        totalItemPrice += subtotal;

        cartQuantity += item.quantity;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="cart-info">
                    <img src="${item.product.coverImage}" alt="${item.product.title}" />
                    <div>
                        <p>${item.product.title}</p>
                        <small>Price: ${item.product.price.toFixed(2)} $</small> <br />
                        <a href="#">Remove</a>
                    </div>
                </div>
            </td>
            <td>${item.quantity}</td>
            <td>${item.product.category.title}</td>
            <td>${subtotal.toFixed(2)} $</td>
        `;

        cartTable.appendChild(row);
    });

    let discount = 0;

    if(totalPrice < totalItemPrice) {
        appliedCouponElement.classList.remove('d-none');
    }

    if (cartQuantity > 3) {
        discount = 0.25 * totalPrice;
        totalPrice -= discount;
        discountInfoElement.innerHTML = `<p>Discount: ${discount.toFixed(2)} $</p>`;
    } else {
        discountInfoElement.innerHTML = '';
    }

    totalPriceElement.textContent = `${totalPrice.toFixed(2)} $`;
};

renderCart();
