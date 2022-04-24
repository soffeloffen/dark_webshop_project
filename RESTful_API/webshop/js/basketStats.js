function initializePage() {
  document.getElementById("firstname").innerHTML =
    localStorage.getItem("fname");
  initializeBasket();
}

function initializeBasket() {
  //Create a div to hold the basket products
  var basketDiv = document.getElementById("basket");
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

      //Create a list item for each orderline
      userBasket.products.forEach((orderLine) => {
        var listElement = document.createElement("li");

        //Get the product associated with each orderline
        fetch("http://localhost:3000/products/" + orderLine.productId).then(
          (response) =>
            response.json().then((product) => {
              console.log(price, "price before");
              price = price + product[0].price * orderLine.quantity;
              console.log(price, "price after");
              console.log(product);
              listElement.innerHTML = `<h3>${product[0].title} x ${orderLine.quantity}</h3>`;
              list.appendChild(listElement);
              priceLine.innerHTML = `Total: ${price}`;
            })
        );
        
      });
      
      
      
    })
  );
}
