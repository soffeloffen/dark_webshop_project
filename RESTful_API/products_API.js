import express from "express";
import cors from "cors";

/** 
 * import { ProductsRouter } from "./products/products.route.js";
 * 
*/
const express = require("express");
const app1 = express();
const port = process.env.PORT || 3000; //if no port is given choose 3000

app1.get("/", (req, res) => res.send("Server_2: Products"));

//Invalid route statements 
app1.listen(port, function(err) {
    if (err) console.log("error in server");
    console.log(`server is listening on ${port}`);
}); 

/*Get all passport products*/ 
app.get('WRITE PATH TO PRODUCTS', (req, res) => {
    res.send(reg.params);
    res.send(passportProduct); //example below - must specify path
});

/*Get all drugs products*/ 
app.get('WRITE PATH TO PRODUCTS', (req, res) => {
    res.send(reg.params);
    res.send(drug_products); //example below - must specify path
});

const passportProduct = [
    {id: 1, country: "Malta", price: 200},
    {id: 2, country: "UK", price: 9000}
]

/*Get a specific product category*/
app1.get('WRITE PATH TO CATEGORY IDs', (req,res) => {
    res.send(req.params);
    if (!category)
        res.status(404).send("Given ID is not valid");
    res.send(category);
});

/* Get all product categories*/
app1.get("PATH TO CATEGORIES", (req, res) => {
    res.send(req.params);
    if (!category)
        res.status(404).send("Categories not found");
    res.send(category);
});

/* 
Define a parameter such as id 
Get specific product by id or return eller message
*/
app1.get('/api/products:id', (req, res) => {
    resource.send(req.params.id); // 1 simple method
    const prod = passportProduct.find(c => c.id == parseInt(req.params.id)); //2 best method
    if (!prod) res.status(404).send('The product is not found: error 404');
    res.send(prod); 
});

//products on sale 
app1.get("/sale", (req, res) => {
    res.send(req.params);
    if (!product) res.status(404).send("There are no products on sale");
    res.send(product);
  });

/*Create resource(product) */
app1.post('/api/products', (req, res) => {
    const product = {
        id: courses.length + 1, 
        name: req.body.name
    }
});