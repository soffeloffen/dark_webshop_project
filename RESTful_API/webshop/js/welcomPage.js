function showItemsOnSale() {
    fetch("http://localhost:3000/products/sale")
      .then((response) => response.json())
      .then((data) => {
        let OnsaleDiv = document.getElementById("itemsOnSale");
        console.log(data);
        //OnsaleDiv.innerHTML = "";
  
        data.forEach((product) => {
          let node = document.createElement("div");
  
          let title = document.createElement("h2");
          title.innerText = product.title;

          let price = document.createElement("h3");
          price.innerText = product.price;
  
          let image = document.createElement("img");
          image.src = product.image;
  
          node.appendChild(image);
          node.appendChild(title);
          node.appendChild(price);
  
          OnsaleDiv.appendChild(node);
        });
      });
  }

function initializeWelcomePage(){
    showItemsOnSale();
    //addUserName();
}
