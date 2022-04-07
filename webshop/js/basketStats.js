var amount= 0;

function setDrug1(){
localStorage.setItem( "Drug1Name", "Magic Mushrooms" );
localStorage.setItem( "Drug1Amount", 1);
}

function updateDrug1(){
var total = parseInt(localStorage.getItem( "Drug1Amount" ) );
var updatedTotal = total +1;
localStorage.setItem( "Drug1Amount", updatedTotal ); 
}



function reset() {
    sessionStorage.removeItem;
}