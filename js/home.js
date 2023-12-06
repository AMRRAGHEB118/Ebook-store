let offerTag = document.querySelector('.offer');
offerTag.innerHTML = offerContent;
const productListContainer = document.getElementById('productList');

const productElementRender = (container, productImage, productId, productTitle, productPrice) => {
    const productElement = document.createElement('div');
    productElement.classList.add('col-4');
    productElement.innerHTML = `
        <a href="../bookDetails.html?id=${productId}">
        <img src="${productImage}" alt="Book 4" /></a>
        <a href="../bookDetails.html?id=${productId}">
            <h4>${productTitle}</h4>
        </a>
        <div class="rating">
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star-o"></i>
        </div>
        <p>$.${productPrice}</p> 
    `;

    container.appendChild(productElement);
}


const getProducts = async (category, page, limit) => {
    productListContainer.innerHTML = '';
    try {
        const response = await axios.get(`${backendUrl}/product?category=${category}&page=${page}&limit=${limit}`);
        const products = response.data.data;
        products.forEach((product) => {
            productElementRender(productListContainer, product.coverImage, product._id, product.title, product.price);
        });
    } catch (error) {
        console.error(error);
    }
}


getProducts('', 1, 12);