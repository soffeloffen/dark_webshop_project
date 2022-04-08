import express from "express";

const app = express();
const port = process.env.PORT || 3000; //if no port is given choose 3000

app.get("/", (req, res) => res.send("hey yo"));
app.listen(port, () => console.log(`listening on ${port}`));
