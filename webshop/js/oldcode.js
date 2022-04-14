const { response } = require("express");
const { header } = require("express/lib/request");
const { type } = require("express/lib/response");

function initializePage() {
  getListOfTypes();
  getAllProducts();
  initializeFilters();
}

function getAllProducts() {
  //Call the backend (API) - make sure the server is running.
  //Fetch calls the endpoint and receives a response. Once we receive the response we format it as json.
  //Once the response is formatted, we can start working on the data.
  fetch("http://localhost:3000/Products")
    .then((response) => response.json())
    .then((data) => {
      //Log the products, so we can view the data in console - delete after test
      console.log(data.products);

      //DIV STUFF

      let productsDiv = document.getElementById("products");
      productsDiv.innerHTML = "";

      data.products.forEach((product) => {
        let node = document.createElement("div");

        let title = document.createElement("h2");
        title.innerText = product.title;

        let image = document.createElement("img");
        image.src = product.image;

        node.appendChild(image);
        node.appendChild(title);

        productsDiv.appendChild(node);
      });
    });
}


function getListOfTypes() {
  fetch("http://localhost:3000/products/types")
    .then((response) => response.json())
    .then((data) => {
      //Log the products, so we can view the data in console - delete after test
      let typesHTMLelement = document.getElementById("productTypes"); //find the html element by id where you want to display data 
      data.forEach((X) => {
        let divTypeX = document.createElement("div");
        //divTypeX.classList.add("userNameInMenu"); GIVE CSS CLASS HERE TO DIRECTLY FORMAT 
        let h2TypeX = document.createElement("h2");
        h2TypeX.innerHTML = X;
        divTypeX.appendChild(h2TypeX);
        typesHTMLelement.appendChild(divTypeX);
      });
    });
}

function getProductsByType(type) {
  fetch("http://localhost:3000/products/types/" + type)
    .then((response) => response.json())
    .then((data) => {
      let typeDiv = document.getElementById("productTypes");
      productsDiv.innerHTML = "";

      data.products.forEach((product) => {
        let node = document.createElement("div");

        let title = document.createElement("h2");
        title.innerText = product.title;

        let image = document.createElement("img");
        image.src = product.image;

        node.appendChild(image);
        node.appendChild(title);

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
      filterButton.onclick = getProductsByType(type);
      divFilters.appendChild(filterButton);
    });
  })
}


//----------------------------------OLD-------------------------------------------------
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}

function myFunction1() {
  var x = document.getElementById("drugss");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function myFunction2() {
  var x = document.getElementById("idss");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function myFunction3() {
  var x = document.getElementById("EUpass");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  return x.style.display;
}

function myFunction4() {
  var x = document.getElementById("plants");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  return x.style.display;
}
