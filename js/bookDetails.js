const bookDetailsContainer = document.getElementById('bookDetailsContainer');
const commentsContainer = document.getElementById('comments-container');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const urlSearchParams = new URLSearchParams(window.location.search);
const selectedBook = urlSearchParams.get('id')

if (!selectedBook) {
    window.location.href = 'ebooks.html';
}

if (!userDetails) {
    window.location.href = 'login.html';
} else {
    if(userDetails.user.role !== 'buyer') {
        window.location.href = 'ebooks.html';
    }
}

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
};

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
                    <input id="quantityInput" min="1" type="number" value="1" />
                    <button data-id="${book._id}" class="btn" onclick="addToCart(${book._id})">Add To Cart</button>
                    <div class="btnswq">
                        <button onclick="Toggle1(),show_pup()" id="btnh112" class="btntr"><i class="fas fa-heart"></i></button>
                        <div class="Cardsa" id="pup">
                            <img src="../Faver/heart15.png" alt="">
                            <h1>Add</h1>
                            <p>To-Favorite</p>
                            <button class="btncx-close" onclick="hidde_pup()">close</button>
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

fetchComments();
getBookDetails();




