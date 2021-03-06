const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs").promises; //Needed to be able to read files async - https://thewebdev.info/2022/02/26/how-to-read-file-with-async-and-await-in-node-js/
const app1 = express();
app1.use(cors());
app1.use(bodyParser.json());
const port = process.env.PORT || 3000; //if no port is given choose 3000

//Json file paths
const basketsFilePath = "baskets.json";
const customersFilePath = "customers.json";

let allProducts = require("./products/products.json");
const { type } = require("express/lib/response");
const { all } = require("express/lib/application");
app1.use(express.static("webshop"));
app1.get("/", (req, res) => res.send("Server_2: Products"));

//Invalid route statements
app1.listen(port, function (err) {
  if (err) console.log("error in server");
  console.log(`server is listening on ${port}`);
});

/**----------------------------------------- PRODUCTS------------------------------------------*/ 
/* Get all products */
app1.get("/products", (req, res) => {
 res.status(200).json(allProducts)
  res.send(allProducts);
});

/* Get all product categories */
app1.get("/products/types", (req, res) => {
  var allTypes = allProducts.products.map((x) => x.type); //returns all types for each product
  var uniqueTypes = [...new Set(allTypes)];
  res.send(uniqueTypes);
});

/* Get products on sale */
app1.get("/products/sale", (req, res) => {
  res.status(200).json(allProducts)
  res.send(allProducts.products.filter((x) => x.onsale == true));
});

/* Get product by ID */
app1.get("/products/:prodId", (req, res) => {
  const prodId = req.params.prodId;
  if (!prodId) res.status(404).send("Given ID is not valid");
  res.send(allProducts.products.filter((x) => x.id == prodId));
});

/* Get a specific product by category */
app1.get("/products/types/:typeId", (req, res) => {
  const typeId = req.params.typeId;
  if (!typeId) res.status(404).send("Given ID is not valid");
  res.send(allProducts.products.filter((x) => x.type == typeId));
});

/**----------------------------------------- CUSTOMERS------------------------------------------*/ 

/* Create a new customer */
app1.post("/customers", (req, res) => {
  //Read the new customer from the body of post request
  var newCustomer = req.body;

  //File to read
  const fileName = customersFilePath;

  //Read json file
  getJsonArrayFromFile(fileName).then((customers) => {
    //find highest id among existing customer and +1 and assign
    //Map customersArray to array of ints by selecting only id
    let idArray = customers.map((x) => x.id);

    //Find the highest id using Math.max and increment by 1
    //Passing the array directly to Math.max will result in an error when there's more than one id in the array.
    //To fix this, we use the spread operator as described in this SO post.
    //https://stackoverflow.com/questions/32647149/why-is-math-max-returning-nan-on-an-array-of-integers

    var id = Math.max(...idArray) + 1;
    newCustomer.id = id;

    //Push the new customer to the array
    customers.push(newCustomer);

    //Convert the array back to a json string and then overwrite the file
    writeArrayToJsonFile(fileName, customers);

    //Send response to client, that we succeesfully stored the new customer, and return the new customer with id to the client
    res.status(201).json(newCustomer);
  });
});

/* Get all customers */
app1.get("/customers", (req, res) => {
  const fileName = customersFilePath;
  getJsonArrayFromFile(fileName).then((customers) => {
    res.status(200).json(customers);
  });
});

/* Creat a new basket */
app1.post("/baskets", (req, res) => {
  //Receive customerId from request
  var customerId = req.body.customerId;

  const filePath = basketsFilePath;


  getJsonArrayFromFile(filePath).then((baskets) => {
    var idArray = baskets.map((x) => x.id);
    var id = Math.max(...idArray) + 1;

    //Create a new empty basket object for user
    const newBasket = {
      id: id,
      products: [],
    };

    //Add new basket object to baskets array
    baskets.push(newBasket);

    //Convert the array back to a json string and then overwrite the file
    writeArrayToJsonFile(filePath, baskets);
    res.status(201).json(newBasket);
  });
});

/* Get basket by id */
app1.get("/baskets/:id", (req, res) => {
  const filePath = basketsFilePath;

  getJsonArrayFromFile(filePath).then((baskets) => {
    //Find basket with the specified id and return it
    var basket = baskets.filter((x) => x.id == req.params.id)[0];
    res.status(200).json(basket);
  });
});


/* Useful for putting products into basket and deleting them */ 
app1.put("/baskets/:id", (req, res) => {
  //Receive the new basket in the body of the request
  const filePath = basketsFilePath;
  var newBasket = req.body;
  
  //Get all baskets, find the one with the id, and replace with the new basket - then write to file
  getJsonArrayFromFile(filePath).then((baskets) => {
    basketIndex = baskets.findIndex(x => x.id == newBasket.id);
    baskets[basketIndex] = newBasket;
    writeArrayToJsonFile(filePath, baskets)
    res.status(200).json({newBasket});
  });
})

/**----------------------------------------- HELPER METHODS------------------------------------------*/ 

/* Read the content of a file and return a promise containing the content parsed as a javascript array */
async function getJsonArrayFromFile(filePath) {
  const data = await fs.readFile(filePath);
  var dataAsJson = JSON.parse(data);
  return dataAsJson;
}

/* Takes a javascript object and converts it to a json string. Then overrides the  file on the specified path */
async function writeArrayToJsonFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data));
  } catch (err) {
    console.error(`Failed to write to file with path: ${filePath}`);
    throw err;
  }
}

