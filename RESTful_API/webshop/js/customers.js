function initializePagew(){
    getelement();
    store2();
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