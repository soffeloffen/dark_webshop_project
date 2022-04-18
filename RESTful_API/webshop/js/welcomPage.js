function showItemsOnSale() {
    fetch("http://localhost:3000/products/onSaleProducts")
      .then((response) => response.json())
      .then((data) => {
        let OnsaleDiv = document.getElementById("itemsOnSale");
        console.log(data);
        //OnsaleDiv.innerHTML = "";
  
        data.forEach((product) => {
          let node = document.createElement("div");
  
          let title = document.createElement("h2");
          title.innerText = product.title;
  
          let image = document.createElement("img");
          image.src = product.image;
  
          node.appendChild(image);
          node.appendChild(title);
  
          OnsaleDiv.appendChild(node);
        });
      });
  }

function initializeWelcomePage(){
    showItemsOnSale();
    //addUserName();
}

