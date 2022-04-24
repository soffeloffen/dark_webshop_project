const express = require("express");
const cors = require("cors");
const app2 = express();
app2.use(cors());

const fs = require("fs");

const port = process.env.PORT || 3000; //if no port is given choose 3000
const { type } = require("express/lib/response");
const { all } = require("express/lib/application");
app2.use(express.static('webshop'))
app2.get("/", (req, res) => res.send("Server_3: customers"));
let customers = require("./customers/customers.json");
const { Z_FIXED } = require("zlib");

app2.listen(port, function (err) {
  if (err) console.log("error in server");
  console.log(`server is listening on ${port}`);
});

app2.get("/", (req, res) => res.send("Server_3: Customers"));

//get customers 
app2.get("/customers", (req, res) => {
  res.send(customers);
});

