function initializePage() {

    getProduct();
  }
  
  function getProduct() {
    //Call the backend (API) - make sure the server is running.
    //Fetch calls the endpoint and receives a response. Once we receive the response we format it as json.
    //Once the response is formatted, we can start working on the data.
    var url = window.location.href.split('/');
    var id = url.at(-1);

    fetch("http://localhost:3000/products/" + id)
      .then((response) => response.json())
      .then((data) => {
        

        let productsDiv = document.getElementById("products");
         productsDiv.innerHTML = "";

        let node = document.createElement("div");

        let title = document.createElement("h2");
        title.innerText = data[0].title;

        let quantity = document.createElement("h4");
        quantity.innerText = data[0].quantity + " " + data[0].measurement + " --- " + "price: " + data[0].price + " " + data[0].currency;
       
        let image =document.createElement("img");
        image.src =data[0].image;

        let longdescription = document.createElement("h4");
        longdescription.innerText = data[0].longdescription;

       // let price = document.createElement("h4");
       // price.innerText =  "price: " + data[0].price + " " + data[0].currency;
       const addtoBasket = document.createElement("button");
        addtoBasket.innerHTML = "Add 1 to Basket";
       

        node.appendChild(image);
        node.appendChild(title);
        node.appendChild(quantity);
        node.appendChild(longdescription);
        node.appendChild(addtoBasket);
        //node.appendChild(price);



        productsDiv.appendChild(node);
      });
  }