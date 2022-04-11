import express from "express";
import cors from "cors";

/**
 * import { CustomersRouter } from "./customer/customer.route.js";
 *
 */
const express = require("express");
const app2 = express();
const port = process.env.PORT || 3000; //if no port is given choose 3000
app2.use(cors());

app2.listen(port, function (err) {
  if (err) console.log("error in server");
  console.log(`server is listening on ${port}`);
});

app2.get("/", (req, res) => res.send("Server_3: Customers"));

//get all customers
app2.get("PATH TO CUSTOMERS", (req, res) => {
  res.send(req.params);
});

//get customer by id
app2.get("PATH TO CUSTOMER ID", (req, res) => {
  res.send(req.params);
});

//create a new basket for customer by id
app2.post("PATH TO BASKET", (req, res) => {
  res.send(`{
        "parameters": ${JSON.stringify(req.params)}
        "body":${JSON.stringify(req.body)}
    }`);
});

//put a new resource/product into the basket
app2.post("/baskets/:customerid/products/:productid", (req, res) => {
  res.send(`{
        "parameters": ${JSON.stringify(req.params)}
        "body":${JSON.stringify(req.body)}
    }`);
});

//delete product from basket
app2.delete("/baskets/:customerid/products/:productid", (req, res) => {
  res.send(req.params);
});

//Get specific basket by customer id
app2.get("/baskets/:customerid/", (req, res) => {
  res.send(req.params);
});
