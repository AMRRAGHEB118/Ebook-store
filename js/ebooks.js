const optionListContainer = document.getElementById('optionList');
const productListContainer = document.getElementById('productList');
// const paginationButtons = document.querySelectorAll('.pagination-btn button');
const paginationContainer = document.getElementById('paginationContainer');

const ITEMS_PER_PAGE = 12;
let currentPage = 1;
let totalPages = 0;

const getTotalPages = async () => {
    try {
        const response = await axios.get(`${backendUrl}/product/count`);
        return Math.ceil(response.data.data / ITEMS_PER_PAGE);
    } catch (error) {
        console.error(error);
    }
}

const optionRender = (container, id, text, value) => {
    const option = document.createElement('button');
    option.classList.add('btn', 'btn-primary', 'm-2');
    option.addEventListener('click', () => {
        getProducts(value)
    })
    option.id = id;
    option.dataset.category = value;
    option.innerText = text;
    container.appendChild(option);
}

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

const getCategories = async () => {
    try {
        const response = await axios.get(`${backendUrl}/category`);
        const categories = response.data.data;
        optionRender(optionListContainer, '', 'All', '')
        categories.forEach((category) => {
            optionRender(optionListContainer, category._id, category.title, category._id)
        });
    } catch (error) {
        console.error(error);
    }
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

const paginationButtonsRender = () => {
    if(totalPages > 0) {
        paginationContainer.innerHTML = '';
        for(let page = 1; page <= totalPages; page++) {
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-primary');
            if(page === currentPage) button.classList.add('active');
            button.id = page;
            button.innerText = page;
            button.addEventListener('click', () => {
                handlePaginationClick(page);
            })
            paginationContainer.appendChild(button);
        }
    }
}

const setButtonActive = (button) => {
    const buttons = document.querySelectorAll('.pagination-btn button');
    buttons.forEach((btn) => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
}

const handlePaginationClick = (page) => {
    currentPage = page;
    const urlSearchParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlSearchParams.get('category') || '';
    getProducts(selectedCategory, currentPage, ITEMS_PER_PAGE);
    setButtonActive(document.getElementById(page));
};

getTotalPages().then((pages) => {
    totalPages = pages;
    paginationButtonsRender();
});
getCategories();
getProducts('', 1, 12);
