const bookDetailsContainer = document.getElementById('bookDetailsContainer');
const commentsContainer = document.getElementById('comments-container');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const urlSearchParams = new URLSearchParams(window.location.search);
const selectedBook = urlSearchParams.get('id')
const productListContainer = document.getElementById('productList');
let offer = undefined;


if (!selectedBook) {
window.location.href = 'ebooks.html';
}

if (!userDetails) {
window.location.href = 'login.html';
} else {
if(userDetails.user.role === 'admin') {
window.location.href = '/';
}
}

const formatDate = (dateString) => {
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
return formattedDate;
};

const addToCart = async (bookId) => {
    const response = await axios.post(`${backendUrl}/cart/${bookId}?offer=${offer}`, {
    userId: userDetails.user._id,
    quantity: document.getElementById('quantityInput').value
    });
    if (response.data.success) {
    alert('Book added to cart');
    }
}

const bookDetailsRender = (book) => {
bookDetailsContainer.innerHTML = `
    <div class="row">
        <div class="col-2">
            <img src="${book.coverImage}" alt="Book4" width="68%" />
        </div>
        <div class="col-2">
            <p>Home / Ebook</p>
            <h1>${book.title}</h1>
            <h4>$${book.price} <i class="fa-solid fa-tags"></i></h4>

            <div class="coupon-input-section my-3">
            <label class="coupon-label" for="couponCode">Enter Coupon Code:</label>
            <input type="text" id="couponCode" class="coupon-input w-100" placeholder="Coupon Code">
            <button class="btn btn-primary mt-3" onclick="applyCoupon()">Apply Coupon</button>
            <p id="couponMessage" class="coupon-message d-none"></p>
            </div>

            <input id="quantityInput" min="1" type="number" value="1" />
            <button class="btn" onclick="addToCart(${`'${book._id}'`})">Add To Cart</button>
            <div class="btnswq">
                <button id="btnh112" class="btn btn-secondary"><i class="fas fa-heart"></i></button>
                <div class="Cardsa" id="pup">
                    <img src="../Faver/heart15.png" alt="">
                    <h1>Add</h1>
                    <p>To-Favorite</p>
                    <button class="btn btn-danger" onclick="hidde_pup()">close</button>
                </div>
            </div>
            <h3>Book Details <i class="fa fa-indent"></i></h3>
            <p>${book.description}</p>
            <a href="#" class="btn" style="margin-left:100px; margin-top: 65px;">Rating</a>
            <form action="">
                <div class="rating">
                    <input type="radio" name="rate" id="rating-op5" data-idx="0" hidden>
                    <label for="rating-op5"><span>Excellent</span></label>
                    <input type="radio" name="rate" id="rating-op4" data-idx="1" hidden>
                    <label for="rating-op4"><span>Very Good </span></label>
                    <input type="radio" name="rate" id="rating-op3" data-idx="2" hidden>
                    <label for="rating-op3"><span>Good</span></label>
                    <input type="radio" name="rate" id="rating-op2" data-idx="3" hidden>
                    <label for="rating-op2"><span>Good Enough</span></label>
                    <input type="radio" name="rate" id="rating-op1" data-idx="4" hidden>
                    <label for="rating-op1"><span>Very Bad</span></label>
                </div>
            </form>
        </div>
    </div>
`;
}

const getBookDetails = async () => {
try {
const response = await axios.get(`${backendUrl}/product/${selectedBook}`);
const bookDetails = response.data.data;
bookDetailsRender(bookDetails);
} catch (error) {
console.log(error);
}
}

const fetchComments = async () => {
const response = await fetch(`${backendUrl}/comment/${selectedBook}`);
const data = await response.json();
const comments = data.data;
if (comments) {
displayComments(comments);
} else {
console.error('Comments not found in the response:', data);
}
};

const displayComments = (comments) => {
commentsContainer.innerHTML = '';
comments.forEach(comment => {
const commentElement = document.createElement('div');
commentElement.classList.add('comment');
commentElement.id = comment._id;
commentElement.innerHTML = `
<div class="comment-header">
    <strong>${comment.user.username}</strong> - ${formatDate(comment.updatedAt)}
</div>
<div class="comment-text">${comment.comment}</div>
`;
commentsContainer.appendChild(commentElement);
});
};

const addComment = async (comment) => {
const response = await axios.post(`${backendUrl}/comment`, {
comment: comment,
product: selectedBook,
user: userDetails.user._id
})
const comments = response.data.data.comments;
displayComments(comments);
};

commentForm.addEventListener('submit', (event) => {
event.preventDefault();
const newComment = commentInput.value;
if (newComment.trim() !== '') {
addComment(newComment);
commentInput.value = '';
}
});

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


const applyCoupon = async () => {
    const couponInput = document.getElementById('couponCode');
    const coupon = couponInput.value;

    try {
        const response = await axios.post(`${backendUrl}/coupon/apply`, {
            id: coupon,
            product: selectedBook
        });

        const data = response.data;

        if (response.data.success) {
            document.getElementById('couponMessage').style.color = 'green';
            document.getElementById('couponMessage').innerText = data.message;
            document.getElementById('couponMessage').classList.remove('d-none');
            couponInput.value = '';
            commentInput.setAttribute('disabled', true);
            offer = 20;
        } else {
            document.getElementById('couponMessage').style.color = 'red';
            document.getElementById('couponMessage').innerText = data.message;
            document.getElementById('couponMessage').classList.remove('d-none');
            couponInput.value = '';
        }
    } catch (error) {
        document.getElementById('couponMessage').style.color = 'red';
        document.getElementById('couponMessage').innerText = error.response.data.message;
        document.getElementById('couponMessage').classList.remove('d-none');
        couponInput.value = '';
    }
}


fetchComments();
getBookDetails();
getProducts('', 1, 4);
