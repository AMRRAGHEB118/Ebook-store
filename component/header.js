const headerContainer = document.querySelector('.header');
let headerContent = `
<div class="container">
  <div class="navbar">
    <div class="logo">
      <a href="/">
        <img src="images/EbookStore-Logo.png" alt="EbookStore-Logo"
      /></a>
    </div>
    <!----------  Nav Bar ------------------>
    <nav>
      <ul id="MenuItems">
        <li><a href="/">Home</a></li>
        <li><a href="ebooks.html">Ebooks</a></li>
        <li><a href="../eBookStore/about-me-page-master/index.html">About us</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
    <img src="images/menu.png" class="menu-icon" onclick="menutoggle()" />
  </div>
  
</div>
` 
let headerContentGustCase= `
<div class="container">
  <div class="navbar">
  <center>
  <div class="logo">
      <a href="/">
        <img src="images/EbookStore-Logo.png" alt="EbookStore-Logo"
      /></a>
    </div>

  </center>
    <!----------  Nav Bar ------------------>
    <nav>
    <ul id="MenuItems">
      <li><a href="/">Home</a></li>
      <li><a href="../about-us.html">About us</a></li>
    </ul>
  </nav>
    <img src="images/menu.png" class="menu-icon" onclick="menutoggle()" />
  </div>
  
</div>
`   

let userDetails = JSON.parse(localStorage.getItem('userDetails'));
let isAuthenticated = false;

if (userDetails) {
  isAuthenticated = true;
}

if (isAuthenticated){
  headerContainer.innerHTML = headerContent;
} 
else{
  headerContainer.innerHTML = headerContentGustCase;
}

const accountLink = document.querySelector('#MenuItems');
const loginLink = `<li id="loginLink"><a class="btn btn-success" href="/login.html">Login</a></li>`;
const logoutLink = `<li id="logoutLink"><button class="btn btn-danger" href="#">Logout</button></li>`;
const cartLink = `<li id="cartLink"><a href="cart.html"><img src="images/cart.png" alt="Shoping Cart" width="28px" height="28px" style="margin-left: 10px; margin-top: 15px" /></a></li>`;
const dashboardLink = `<li id="dashboardLink"><a href="/dashboard.html">Dashboard</a></li>`;

accountLink.innerHTML += isAuthenticated ? `${dashboardLink}${cartLink}${logoutLink}` : loginLink;

const loginLogoutLink = document.querySelector(isAuthenticated ? '#logoutLink' : '#loginLink');

if (loginLogoutLink && isAuthenticated) {
  loginLogoutLink.addEventListener('click', () => {
    localStorage.removeItem('userDetails');
    window.location.reload();
  });
}

const cartLinkElement = document.querySelector('#cartLink');
const dashboardLinkElement = document.querySelector('#dashboardLink');

if (cartLinkElement && dashboardLinkElement) {
  if (userDetails) {
    if (userDetails.user.role === 'buyer') {
      cartLinkElement.style.display = 'inline';
      dashboardLinkElement.style.display = 'none';
    } else if (userDetails.user.role === 'seller') {
      cartLinkElement.style.display = 'none';
      dashboardLinkElement.style.display = 'inline';
    }
  } else {
    cartLinkElement.style.display = 'none';
    dashboardLinkElement.style.display = 'none';
  }
}
