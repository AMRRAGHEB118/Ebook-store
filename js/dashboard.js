const userName = document.getElementById('user-name');
let userId = userDetails.user._id;
const productContainer = document.querySelector('table tbody');

const userNameRender = () => {
    if (userDetails) {
        userName.innerHTML = userDetails.user.username;
    }
}

const productRowRender = (product) => {
    const tbody = document.getElementById('productContainer');
    const row = document.createElement('tr');
    row.classList.add('table-row', 'product', 'cursor-pointer', 'text-center');
    row.setAttribute('data-id', product._id);
    row.setAttribute('data-category', product.category);
    row.setAttribute('data-title', product.title);
    row.setAttribute('data-image', product.image);
    row.setAttribute('data-price', product.price);
    row.setAttribute('data-quantity', product.quantity);
    row.setAttribute('data-sold', product.sold);
    row.setAttribute('data-updatedAt', product.updatedAt);

    row.addEventListener('click', () => {
        window.location.href = `editProduct.html?id=${product._id}`;
    });

    row.innerHTML = `
        <td><img src="${product.coverImage}" alt="${product.title}" class="product-image"></td>
        <td>${product.title}</td>
        <td>${product.category}</td>
        <td>${product.updatedAt}</td>
        <td><span class="quantity-value">${product.quantity}</span></td>
        <td>${product.sold}</td>
        <td>${product.price}</td>
        <td>
            <a href="deleteProduct.html?id=${product._id}" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Delete">
                <i class="fas fa-trash"></i>
            </a>
        </td>
    `;

    tbody.appendChild(row);
}




const getProducts = async () => {
    try {
        const response = await axios.get(`${backendUrl}/product/seller/${userId}`);
        const products = response.data.data;
        products.forEach((product) => {
            productRowRender(product);
        });
    } catch (error) {
        console.error(error);
    }
}


userNameRender();
getProducts();