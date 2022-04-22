/*var amount= 0;

function addToBasket(){
localStorage.setItem( "Drug1Name", "Magic Mushrooms" );
localStorage.setItem( "Drug1Amount", 1);

}

function updateDrug1(){
var total = parseInt(localStorage.getItem( "Drug1Amount" ) );
var updatedTotal = total +1;
localStorage.setItem( "Drug1Amount", updatedTotal ); 
}

function reset() {
    localStorage.removeItem;
}*/

function addOneTest() {
    var url = window.location.href.split('/');
    var id = url.at(-1);

    /* use id and add to url of products , then return the div with all attributes requested  */
    fetch("http://localhost:3000/products/"+id)
      .then((response) => response.json())
      .then((data) => {

        //var fs = require('fs');
        let basketjson = fs.readFileSync("/basket.json","utf-8");

        let basket = JSON.parse(basketjson);
        
        var title = data[0].title;
       // var price = data[0].price;
        //var amount = data[0].amount+=1;

        basket.push(title);

        basketjson = JSON.stringify(basket);

        fs.writeFileSync("/basket.json",basketjson,"utf-8");

        });
  }