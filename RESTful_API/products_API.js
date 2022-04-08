/*
GET to retrieve a resource;
PUT to change the state of or update a resource, which can be an object, file or block;
POST to create that resource; and
DELETE to remove it.
*/

//DOES NOT WORK YET 

const passportProduct = [
    {id: 1, country: "Malta", price: 200},
    {id: 2, country: "UK", price: 9000}
]

/*Get all passport products*/ 
app.get('/api/products', (req, res) => {
    res.send(passportProduct)
});

/* 
Define a parameter such as id 
Get specific product by id or return eller message
*/
app.get('/api/products:id', (req, res) => {
    resource.send(req.params.id); // 1 simple method
    const prod = passportProduct.find(c => c.id == parseInt(req.params.id)); //2 best method
    if (!prod) res.status(404).send('The product is not found: error 404');
    res.send(prod); 
});

/*Create resource(product) */
app.post('/api/products', (req, res) => {
    const product = {
        id: courses.length + 1, 
        name: req.body.name
    }
});