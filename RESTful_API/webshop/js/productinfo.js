function initializePage() {
  getProduct();
  addUserName();
}

function addUserName() {
  document.getElementById("firstname").innerHTML =
    localStorage.getItem("fname");
}

/* Get and visualise data attributes for specific product */
function getProduct() {
  //Gets url and splits at every '/' to get the prodID at the end of URL, second line url.at(-1) gets ID
  var url = window.location.href.split("/");
  var id = url.at(-1);

  /* use id and add to url of products , then return the div with all attributes requested  */
  fetch("http://localhost:3000/products/" + id)
    .then((response) => response.json())
    .then((data) => {
      let productsDiv = document.getElementById("products");
      productsDiv.innerHTML = "";
      let node = document.createElement("div");

      let title = document.createElement("h2");
      title.innerText = data[0].title;

      let quantity = document.createElement("h4");
      quantity.innerText =
        data[0].quantity +
        " " +
        data[0].measurement +
        " --- " +
        "price: " +
        data[0].price +
        " " +
        data[0].currency;

      let image = document.createElement("img");
      image.src = "/" + data[0].image;

      let longdescription = document.createElement("h4");
      longdescription.innerText = data[0].longdescription;

      let button = document.createElement("button");
      button.innerHTML = "Add to basket";

      button.onclick = () => addToBasket(data[0].id);

      // node.appendChild(button);
      node.appendChild(image);
      node.appendChild(title);
      node.appendChild(quantity);
      node.appendChild(longdescription);
      node.appendChild(button);
      // node.appendChild(amountInBasket);
      //  node.appendChild(addtoBasket);

      productsDiv.appendChild(node);
    });
}

function addToBasket(productId) {
  //Get the id of the currently signed in user
  const currentUserId = localStorage.getItem("currentUserId");

  //Get the basket for the currently signed in user
  fetch("http://localhost:3000/baskets/" + currentUserId)
    .then((response) => response.json())
    .then((basket) => {
      
      //if product already exist in basket, count up quantity
      let product = basket.products.find((x) => x.productId == productId);
      if (product) {
        product.quantity++;
      }
      //If it doesn't exist, add it with quantity 1
      else {
        var newProductInBasket = { productId: productId, quantity: 1 };
        basket.products.push(newProductInBasket);
      }

      //Send the updated basket to the server

      fetch("http://localhost:3000/baskets/" + basket.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(basket),
      })
      .then((response) => response.json().then((data) => console.log(data)));
    });
}
