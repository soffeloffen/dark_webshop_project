function initializePage() {
  // getListOfTypes();
  initializeFilters();
  getAllProducts();
}

//function itemInfo(){
  //<a href="products/drug1.html"> <img src="images/drug1.png" style="height: 250px ;width: 250px;" alt="img1" /></a> 
//}
function getAllProducts(value) {
  //Call the backend (API) - make sure the server is running.
  //Fetch calls the endpoint and receives a response. Once we receive the response we format it as json.
  //Once the response is formatted, we can start working on the data.
  fetch("http://localhost:3000/Products")
    .then((response) => response.json())
    .then((data) => {

      let productsDiv = document.getElementById("products");
      productsDiv.innerHTML = "";

      data.products.forEach((product) => {
       
        let node = document.createElement("div");

        let title = document.createElement("h2");
        title.innerText = product.title;

        let a = document.createElement("a");
        a.href = "/item/"+ product.id;

        let image =document.createElement("img");
        image.id = product.id;
        image.src =product.image;
        
        a.appendChild(image);

        //let button = document.createElement('button');
        //button.innerHTML = 'click me';
        //button.onclick = itemInfo();

        node.appendChild(a);
        node.appendChild(title);
        //node.appendChild(button);

        productsDiv.appendChild(node);

        
      });
    });
}

//<img class="demo cursor" src="images/drug1.png" style="height: 200px ;width: 200px;" onclick="window.location.href='products/drug1.html';" >
function getProductsByType(type) {
  fetch("http://localhost:3000/products/types/" + type)
    .then((response) => response.json())
    .then((data) => {
      
      let typeTitle = document.getElementById("typeTitle");
      typeTitle.innerText = "Filtered on " + type;

      let productsDiv = document.getElementById("products");
      productsDiv.innerHTML = "";

      let clearFiltersButton = document.getElementById("clearFiltersBtn");
      clearFiltersButton.classList.remove("hidden");

      data.forEach((product) => {
        let node = document.createElement("div");

        let title = document.createElement("h2");
        title.innerText = product.title;

        let image = document.createElement("img");
        image.src = product.image;

  
        node.appendChild(image);
        node.appendChild(title);
        //node.appendChild(button);

        productsDiv.appendChild(node);
      });
    })
}

function initializeFilters(){
  fetch("http://localhost:3000/products/types/")
  .then((response) => response.json())
  .then((data) => {
    let divFilters = document.getElementById("filters");
    data.forEach((type) => {
      let filterButton = document.createElement("button");
      filterButton.innerText = type;
      filterButton.onclick = () => getProductsByType(type);
      divFilters.appendChild(filterButton);
    });
    
    //Create the clear filters button
    let clearFiltersButton = document.createElement("button");
    clearFiltersButton.innerText = "Clear filters";
    clearFiltersButton.classList.add("hidden");
    clearFiltersButton.id = "clearFiltersBtn";

    //When the clear filters button is clicked, we should show all products again
    clearFiltersButton.onclick = () => clearFilters();
    divFilters.appendChild(clearFiltersButton);
  })
}

function clearFilters(){
  let clearFiltersButton = document.getElementById("clearFiltersBtn");
  let typeTitle = document.getElementById("typeTitle");
  typeTitle.innerHTML = "All products";
  clearFiltersButton.classList.add("hidden");
  getAllProducts();
}

//GET LIST OF PRODUCT TYPES 
// function getListOfTypes() {
//   fetch("http://localhost:3000/products/types")
//     .then((response) => response.json())
//     .then((data) => {
//       //Log the products, so we can view the data in console - delete after test
//       let typesHTMLelement = document.getElementById("productTypes"); //find the html element by id where you want to display data 
//       data.forEach((X) => {
//         let divTypeX = document.createElement("div");
//         //divTypeX.classList.add("userNameInMenu"); GIVE CSS CLASS HERE TO DIRECTLY FORMAT 
//         let h2TypeX = document.createElement("h2");
//         h2TypeX.innerHTML = X;
//         divTypeX.appendChild(h2TypeX);
//         typesHTMLelement.appendChild(divTypeX);
//       });
//     });
// }