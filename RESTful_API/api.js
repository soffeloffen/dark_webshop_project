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

//Products
/*Get all products*/
app1.get("/products", (req, res) => {
 res.status(200).json(allProducts)
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
  res.status(200).json(allProducts)
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

//get customers
app1.get("/customers", (req, res) => {
  const fileName = customersFilePath;
  getJsonArrayFromFile(fileName).then((customers) => {
    res.status(200).json(customers);
  });
});

//BASKETS
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

//DET ER DEN HER POST TIL BASKET DER IKKE VIRKER
//Put new product in basket
app1.post("/baskets/:id/:productListTest/:prodId", (req, res) => {
  
  try{
    //PARAMETER CONST
    const prodId = req.params.prodId;
    const basketId = req.params.id;
    //TEST CONST
    const basketTest =req.params.productListTest;
    const basketTest2 =req.subdomains;

    //BASKET.JSON
    const fileName = basketsFilePath;

    //LOOPER GENNEM ALLE PRODUKTER OG RETURNERER PRODUCT HVOR ID MATCHER PARAMETER prodId
    const product = allProducts.products.filter((x) => x.id == prodId);

    //getJsonArrayFromFile(fileName).then((products) => {
     
  
      //TypeError: basketId.push is not a function
      //fordi basketId ikke er et array.
      //problemet er at vi mangler at finde products[] array der ligger i basket for specifiktbasket id
      //Convert the array back to a json string and then overwrite the file
      //TEST (KAN SLETTES)
   const data = fileName;
   const arr = Object.values(data)
      // writeArrayToJsonFile(fileName, baskets); ???
   //const arr = data.filter((x)=> x.id)
   console.log("hey");
   console.log(arr);
   
    //TEST (KAN SLETTES)
   //TEST, PRØVER AT FINDE BASKET ID DER ER = DET BASKETID VI FÅR I PARAM
   //FOR AT FINDE PRODUCTS ARRAY PÅ DEN BASKET
   const basket1 = arr.filter((x) => x.id == basketId);

    //TEST (KAN SLETTES)
    console.log(basket1);
   //RETURNERER DET PRODUCT SOM VI ER INDE PÅ NÅR VI KLIKKER 'ADD TO BASKET'
    console.log(product[0]);
    //RETURNERER PRODUCT ID PÅ DET PRODUCT SOM VI ER INDE PÅ NÅR VI KLIKKER 'ADD TO BASKET'
    console.log(prodId);
    //RETURNERER BASKET ID DEN CUSTOMER SOM VI ER INDE PÅ NÅR VI KLIKKER 'ADD TO BASKET'
    console.log(basketId);
    //TEST (KAN SLETTES)
    console.log(test)

    //VIRKER IKKE - SKAL ENDE MED AT VÆRE products.push(product) //TROR JEG (liste fra basket.js, basketid)
    basket1.push(product)

  } catch(error){
    res.status(400).send(error.message);
  }
});



app1.get("/baskets/:id", (req, res) => {
  const filePath = basketsFilePath;

  getJsonArrayFromFile(filePath).then((baskets) => {
    //Find basket with the specified id and return it
    var basket = baskets.filter((x) => x.id == req.params.id)[0];
    res.status(200).json(basket);
  });
});

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

app1.delete("baskets/:id/products/:prodId", (req, res) => {
  res.send(req.params + "item succesfully deleted")
})

//Read the content of a file and return a promise containing the content parsed as a javascript array
async function getJsonArrayFromFile(filePath) {
  const data = await fs.readFile(filePath);
  var dataAsJson = JSON.parse(data);
  return dataAsJson;
}

//Takes a javascript object and converts it to a json string. Then overrides the the file on the specified path
async function writeArrayToJsonFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data));
  } catch (err) {
    console.error(`Failed to write to file with path: ${filePath}`);
    throw err;
  }
}

