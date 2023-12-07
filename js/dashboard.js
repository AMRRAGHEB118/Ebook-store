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

    row.innerHTML = `
        <td><img src="${product.coverImage}" alt="${product.title}" class="product-image"></td>
        <td>${product.title}</td>
        <td>${product.category}</td>
        <td>${product.updatedAt}</td>
        <td><span class="quantity-value">${product.quantity}</span></td>
        <td>${product.sold}</td>
        <td>${product.price}</td>
        <td>
        <a href="editProduct.html?id=${product._id}" class="btn btn-primary edit-btn">
            Edit
        </a>
        </td>
        <td>
            <button onclick="deleteProduct('${product._id}')" class="btn btn-danger">
                <i class="fas fa-trash"></i>
            </button>
        </td>
        <td>
        <button onclick="generateCoupon('${product._id}')" class="btn btn-primary generate-coupon-btn">
            Generate Coupon
        </button>
        </td>
    `;

    tbody.appendChild(row);
}


const generateCoupon = async (productId) => {
    try {
        const response = await axios.post(`${backendUrl}/coupon/generate/${productId}`);
        const coupon = response.data.data;

        if (coupon) {
            alert(coupon._id);
        }

    } catch (error) {
        console.error(error);
    }
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

const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${backendUrl}/product/${productId}`);
        alert(response.data.message);
        window.location.reload();
    } catch (error) {
        console.error(error);
    }
}


userNameRender();
getProducts();