function initializePage() {
  document.getElementById("firstname").innerHTML =
    localStorage.getItem("fname");
  initializeBasket();
}

function initializeBasket() {
  //Create a div to hold the basket products
  var basketDiv = document.getElementById("basket");
  basketDiv.innerHTML = "";
  var currentUserId = localStorage.getItem("currentUserId");
  price = 0;

  //Get the basket for the current user
  fetch("http://localhost:3000/baskets/" + currentUserId).then((response) =>
    response.json().then((userBasket) => {
      //Create a list
      var list = document.createElement("ul");
      basketDiv.appendChild(list);
      var priceLine = document.createElement("h3");
      basketDiv.appendChild(priceLine);

      if(userBasket.products.length == 0){
        basketDiv.innerHTML = "<h3>No products in basket</h3>"
      }

      //Create a list item for each orderline
      userBasket.products.forEach((orderLine) => {
        var listElement = document.createElement("li");

        //Get the product associated with each orderline
        fetch("http://localhost:3000/products/" + orderLine.productId).then(
          (response) =>
            response.json().then((product) => {
              price = price + product[0].price * orderLine.quantity;
              listElement.innerHTML = `<h3>${product[0].title} x ${orderLine.quantity}</h3><button onclick="removeProductFromBasket(${product[0].id})">Remove</button>`;
              listElement.id = product[0].id;
              list.appendChild(listElement);
              priceLine.innerHTML = `Total: ${price} USD`;
            })
        );
      });
    })
  );
}

function removeProductFromBasket(productId) {
  const currentUserId = localStorage.getItem("currentUserId");
  //Get the current users basket
  fetch("http://localhost:3000/baskets/" + currentUserId).then((response) =>
    response.json().then((basket) => {
      //Find the orderline to edit
      var orderLineToEdit = basket.products.find(
        (x) => x.productId == productId
      );
      //If quantity is above 1 we count down the quantity by 1
      if (orderLineToEdit.quantity > 1) {
        orderLineToEdit.quantity = orderLineToEdit.quantity - 1;
      }
      //If quantity is 1, we remove the item from the products in the basket
      else {
        basket.products = basket.products.filter(x => x.productId != productId)
      }

      //Send the updated basket to the server
      fetch("http://localhost:3000/baskets/" + basket.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(basket),
      }).then((response) =>
        response.json()
        //Load the page again to reflect changes
        .then((newBasket) => initializeBasket())
      );
    })
  );
}
