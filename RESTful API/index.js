import express from "express";

/*LISTENING TO GET REQUEST - dynamic port variable*/ 
const port = process.env.PORT || 3000; //if no port is given, use 3000
const app = express(); 

app.get("/", (req, res) => res.send("Server 1: Hello from index.js"));

app.listen(port, () => console.log(`listening on ${port}`));