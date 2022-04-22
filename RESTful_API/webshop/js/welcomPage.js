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

          //anso: har tilføjet en href så når man klikker på de varer onSale bliver man navigeret til productInfo siden
          let a = document.createElement("a");
          a.href = "/item/"+ product.id;
  
          let image =document.createElement("img");
          image.id = product.id;
          image.src =product.image;
          
          a.appendChild(image);
          node.appendChild(a);
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

