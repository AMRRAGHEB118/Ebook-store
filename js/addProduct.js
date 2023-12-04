if(userDetails) {
    if(userDetails.user.role !== 'seller') {
        window.location.href = './';
    }
} else {
    window.location.href = './';
}

const categorySelect = document.getElementById('selectCategory');

optionRender = (container, id, text, value, isHidden) => {
    const option = document.createElement('option');
    option.hidden = isHidden
    option.id = id
    option.value = value
    option.text = text
    container.appendChild(option)
}

const getCategories = async () => {
    try {
        const response = await axios.get(`${backendUrl}/category`);
        const categories = response.data.data;
        optionRender(categorySelect, '', 'Select Category', '', true)
        categories.forEach((category) => {
            optionRender(categorySelect, category._id, category.title, category._id, false)
        });
} catch (error) {
        console.error(error);
}
}

getCategories();

const addProduct = async () => {
    const bookTitle = document.getElementById('book-title').value;
    const description = document.getElementById('description').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;
    const category = document.getElementById('selectCategory').value;
    const sellerId = userDetails.user._id;
    const message = document.getElementById('message');

    if (!bookTitle || !description || !quantity || !price || !image || !category) {
        alert('Please fill in all fields.');
        return
    }
// before create product validation is done for price input
    const isUrlValid = (url) => {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(url);
    }

    if (!isUrlValid(image)) {
        message.innerHTML = 'Please enter a valid image URL.';
        return
    }

    if(price < 0 || quantity < 0) {
        message.innerHTML = 'Please enter valid quantity and price.';
        return;
    }

    try {
        const response = await axios.post(`${backendUrl}/product`, {
            title: bookTitle,
            description: description,
            price: price,
            category: category,
            quantity: quantity,
            coverImage: image,
            seller: sellerId
        });

        message.innerHTML = 'Product added successfully.';

        setTimeout(() => {
            message.innerHTML = '';
            window.location.href = './dashboard.html';
        }, 4000)
    } catch (error) {
        console.error(error);
    }
}
