function initializePage() {
    getProduct();
  }
  
 /* Get and visualise data attributes for specific product */ 
function getProduct() {

    //Gets url and splits at every '/' to get the prodID at the end of URL, second line url.at(-1) gets ID
    var url = window.location.href.split('/');
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
        quantity.innerText = data[0].quantity + " " + data[0].measurement + " --- " + "price: " + data[0].price + " " + data[0].currency;
       
        let image =document.createElement("img");
        image.src ="/"+data[0].image;

        let longdescription = document.createElement("h4");
        longdescription.innerText = data[0].longdescription;


        let button = document.createElement('button');
        button.innerHTML = 'click me';
        button.onclick = addOneTest();


       /*
        let button = document.createElement('button');
        button.innerHTML = 'click me';
        button.id = data[0].id;
        button.onclick = addtoBasket();

        let amountInBasket = document.createElement("h4");
        amountInBasket.innerText = data[0].amount;

*/       
       // addtoBasket button - currently dead, but to be used later to append to basket
       //we have an attribute in products.json file called 'amount' that we can use to count how many items of each
       //products have been added to basket (for each user OR anonymous user)
        //const addtoBasket = document.createElement("button");
        //addtoBasket.innerHTML = "Add 1 to Basket";
//addtoBasket.onclick(data[0].amount=+1)
       
       // node.appendChild(button);
        node.appendChild(image);
        node.appendChild(title);
        node.appendChild(quantity);
        node.appendChild(longdescription);
        node.appendChild(button)
       // node.appendChild(amountInBasket);
      //  node.appendChild(addtoBasket);


        productsDiv.appendChild(node);
      });
  }

