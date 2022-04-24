function initializePagew(){
    getelement();
    store2();
    createCustomer();
}

function createCustomer(){
    const customername = document.getElementById("fname");
    const obj = JSON.stringify(customername);
    fs.writeFileSync('customers.json', obj, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    });
  }

console.log(window.localStorage.getItem("fname"));

function getelement() {
  var hfirst = document.getElementById("firstname");
  hfirst.innerText = localStorage.fname;
  //var hlast = document.getElementById("lastname");
  //hlast.innerText = localStorage.lname;
}

function store2() {
  var userName = document.getElementById("firstname");
  sessionStorage.setItem("fname", userName);
}

function customerid(){
    id += 1;
}