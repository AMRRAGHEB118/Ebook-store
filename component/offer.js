let offerContent = `
<div class="small-container">
  <div class="row">
    <div class="col-2">
      <img src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1683050173-91aF1JPyq5L.jpg?crop=1xw:1xh;center,top&resize=980:*" width="400px" class="offer-img" />
    </div>
    <div class="col-2">
      <p>Available on EbookStore</p>
      <br />
      <h1>
        <div>
          <h1>Discount Offer <i class="fa-solid fa-tags"></i></h1>
        </div>
      </h1>
      <h2>Romantic Comedy, by Curtis Sittenfeld</h2>
      <br />
      <small>
        Making Michael Arceneaux's I Don't Want to Die Poor required
        reading in high schools across the country would help a lot of
        young people think twice about the promise that going to college
        at any cost is the only path to upward social mobility.
      </small>
      <btn onclick="addToCart('656e0a35a459844916bcfdfe', 10)" class="btn">Buy Now &#8594;</btn>
    </div>
  </div>
</div>
`

const addToCart = async (bookId, offer) => {
  if(!userDetails){
    window.location.href = "/login.html";
    return;
  }
  const response = await axios.post(`${backendUrl}/cart/${bookId}?offer=${offer}`, {
  userId: userDetails.user._id,
  quantity: 1
  });
    setTimeout(() => {
      window.location.href = "/cart.html";
    }, 2000);
  }