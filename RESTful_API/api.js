const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs").promises; //Needed to be able to read files async - https://thewebdev.info/2022/02/26/how-to-read-file-with-async-and-await-in-node-js/
const app1 = express();
app1.use(cors());
app1.use(bodyParser.json());
const port = process.env.PORT || 3000; //if no port is given choose 3000

let allProducts = require("./products/products.json");
const { type } = require("express/lib/response");
const { all } = require("express/lib/application");
app1.use(express.static("webshop"));
app1.get("/", (req, res) => res.send("Server_2: Products"));

//goes to html page: ItemsOverview
app1.get("/itemsoverview", (req, res) =>
  res.sendFile("webshop/ItemsOverview_v1.html", { root: __dirname })
);

//get product info
app1.get("/productinfo", (req, res) =>
  res.sendFile("webshop/ProductInfo.html", { root: __dirname })
);

//Invalid route statements
app1.listen(port, function (err) {
  if (err) console.log("error in server");
  console.log(`server is listening on ${port}`);
});

//Products
/*Get all products*/
app1.get("/Products", (req, res) => {
  res.send(allProducts);
});

/* Get all product categories*/
app1.get("/products/types", (req, res) => {
  var allTypes = allProducts.products.map((x) => x.type); //returns all types for each product
  var uniqueTypes = [...new Set(allTypes)];
  res.send(uniqueTypes);
});

/*Get products on sale*/
app1.get("/products/sale", (req, res) => {
  res.send(allProducts.products.filter((x) => x.onsale == true));
});

/*Get product by ID -- returns full .json script for specific prodId*/
app1.get("/products/:prodId", (req, res) => {
  const prodId = req.params.prodId;
  if (!prodId) res.status(404).send("Given ID is not valid");
  res.send(allProducts.products.filter((x) => x.id == prodId));
});

//Get ID -- returns one id to ProductInfo.html to process and visualise data
app1.get("/item/:prodId", (req, res) => {
  const prodId = req.params.prodId;
  if (!prodId) res.status(404).send("Given ID is not valid");
  res.sendFile("webshop/ProductInfo.html", { root: __dirname });
});

/*Get a specific product by category*/
app1.get("/products/types/:typeId", (req, res) => {
  const typeId = req.params.typeId;
  if (!typeId) res.status(404).send("Given ID is not valid");
  res.send(allProducts.products.filter((x) => x.type == typeId));
});

/*Create a new customer */
app1.post("/customers", (req, res) => {
  //Read the new customer from the body of post request
  var newCustomer = req.body;

  //File to read
  const fileName = "customers.json";

  //Read json file and parse to array
  fs.readFile(fileName, function (err, data) {
    if (err) {
      //Throw an error if something goes wrong reading the file
      console.log(
        `Failed to read file ${fileName}. Failed with error: ${err.message}`
      );
      throw err;
    } else {
      //We succeeded reading the file and got the data back
      //Parse data to array
      var customersArray = JSON.parse(data);

      //find highest id among existing customer and +1 and assign
      //Map customersArray to array of ints by selecting only id
      let idArray = customersArray.map((x) => x.id);

      //Find the highest id using Math.max and increment by 1
      //Passing the array directly to Math.max will result in an error when there's more than one id in the array.
      //To fix this, we use the spread operator as described in this SO post.
      //https://stackoverflow.com/questions/32647149/why-is-math-max-returning-nan-on-an-array-of-integers

      var id = Math.max(...idArray) + 1;
      newCustomer.id = id;

      //Push the new customer to the array
      customersArray.push(newCustomer);

      //Convert the array back to a json string and then overwrite the file
      fs.writeFile(fileName, JSON.stringify(customersArray), function (err) {
        //Throw an error if we fail to write to the file
        if (err) throw err;

        //Send response to client, that we succeesfully stored the new customer, and return the new customer with id to the client
        res.status(201).json(newCustomer);
      });
    }
  });
});

//get customers
app1.get("/customers", (req, res) => {
  const fileName = "customers.json";

  fs.readFile(fileName, function (err, data) {
    if (err) {
      //Throw an error if something goes wrong reading the file
      console.log(
        `Failed to read file ${fileName}. Failed with error: ${err.message}`
      );
      throw err;
    } else {
      var customersArray = JSON.parse(data);
      res.json(customersArray);
    }
  });
});

//BASKETS
app1.post("/baskets", (req, res) => {
  //Receive customerId from request
  var customerId = req.body;

  //Get baskets from file
  const filePath = "baskets.json";
  fs.readFile(filePath, function (err, data) {
    if (err) {
      console.log(
        `Failed to read file ${filePath}. Failed with error: ${err.message}`
      );
      throw err;
    }
    var basketsArray = JSON.parse(data);

    var idArray = basketsArray.map((x) => x.id);

    var id = Math.max(...idArray) + 1;

    //Create a new empty basket object for user
    const newBasket = {
      id: id,
      customerId: customerId,
      products: [],
    };

    //Add new basket object to baskets array
    basketsArray.push(newBasket);

    //Convert the array back to a json string and then overwrite the file
    fs.writeFile(filePath, JSON.stringify(basketsArray), function (err) {
      //Throw an error if we fail to write to the file
      if (err) throw err;

      //Send response to client, that we succeesfully stored the new customer, and return the new customer with id to the client
      res.status(201).json(newBasket);
    });
  });
});

app1.get("/baskets/:id", (req, res) => {
  const filePath = "baskets.json";

  getJsonArrayFromFile(filePath).then((baskets) => {
    var basket = baskets.filter((x) => x.id == req.params.id);
    res.status(200).json(basket);
  });
});

//Read the content of a file and return a promise containing the content parsed as a javascript array
async function getJsonArrayFromFile(filePath) {
  const data = await fs.readFile(filePath);
  var dataAsJson = JSON.parse(data);
  return dataAsJson;
}