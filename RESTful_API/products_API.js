const express = require("express");
const cors = require("cors");
const app1 = express();
app1.use(cors());
const port = process.env.PORT || 3000; //if no port is given choose 3000

let Allproducts = require("./products/products.json");
const { type } = require("express/lib/response");
const { all } = require("express/lib/application");
app1.use(express.static('webshop'))
app1.get("/", (req, res) => res.send("Server_2: Products"));

//Not used?
//app1.get("/test", (req, res) => res.send("Testing"));

//goes to html page: ItemsOverview
app1.get("/itemsoverview", (req, res) => res.sendFile("webshop/ItemsOverview_v1.html", {root: __dirname }));

//get product info
app1.get("/productinfo", (req, res) => res.sendFile("webshop/ProductInfo.html", {root: __dirname }));


//Invalid route statements
app1.listen(port, function (err) {
  if (err) console.log("error in server");
  console.log(`server is listening on ${port}`);
});

//Products
/*Get all products*/
app1.get("/Products", (req, res) => {
  res.send(Allproducts);
});

/* Get all product categories*/
app1.get("/products/types", (req, res) => {
    var allTypes = Allproducts.products.map(x => x.type); //returns all types for each product 
    var uniqueTypes = [...new Set(allTypes)];
    res.send(uniqueTypes);
});

/*Get product by ID -- returns full .json script for specific prodId*/
app1.get("/products/:prodId", (req, res) => {
  const prodId = req.params.prodId;
  if (!prodId) res.status(404).send("Given ID is not valid");
  res.send(Allproducts.products.filter((x) => x.id == prodId));
});

//Get ID -- returns one id to ProductInfo.html to process and visualise data
app1.get("/item/:prodId", (req, res) =>  {
  const prodId = req.params.prodId;
  if (!prodId) res.status(404).send("Given ID is not valid");
  res.sendFile("webshop/ProductInfo.html", {root: __dirname});
});


/*Get a specific product by category*/
app1.get("/products/types/:typeId", (req, res) => {
  const typeId = req.params.typeId;
  if (!typeId) res.status(404).send("Given ID is not valid");
  res.send(Allproducts.products.filter((x) => x.type == typeId));
});

/*Get products on sale*/
app1.get("/products/onSaleProducts", (req, res) => {
  res.send(Allproducts.products.filter((x) => x.onsale == true));
});

//--------------------------------DOES NOT WORK--------------------------------------------------------------

/* 
Define a parameter such as id 
Get specific product by id or return eller message
*/
app1.get("/api/products:id", (req, res) => {
  resource.send(req.params.id); // 1 simple method
  const prod = passportProduct.find((c) => c.id == parseInt(req.params.id)); //2 best method
  if (!prod) res.status(404).send("The product is not found: error 404");
  res.send(prod);
});

//products on sale
app1.get("/sale", (req, res) => {
  res.send(req.params);
  if (!product) res.status(404).send("There are no products on sale");
  res.send(product);
});
