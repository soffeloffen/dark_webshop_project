function initializePagew() {
  getelement();
  store2();
  createCustomer();
}

function createCustomer() {
  //Get required fields
  const usernameField = document.getElementById("username");
  const customerUsername = usernameField.value;

  const passwordField = document.getElementById("password");
  const password = passwordField.value;

  //Create a customer object
  const customerObject = {
    username: customerUsername,
    password: password,
  };

  //Convert object to a json string
  const customersObjectAsJsonString = JSON.stringify(customerObject);

  //Send a post request to the customers endpoint with the json string in the body of the request
  fetch("http://localhost:3000/customers", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: customersObjectAsJsonString,
  }).then((response) => {
    //Wait for the API to respond - statuscode should be 201 if everything went well
    if (response.status === 201) {
      console.log("Customer successfully created");
    } else {
      console.log("Failed with error code + " + response.status);
    }
  });
}

function getelement() {
  var username = document.getElementById("userName");
  username.innerText = localStorage.fname;
  //var hlast = document.getElementById("lastname");
  //hlast.innerText = localStorage.lname;
}

function store2() {
  var username = document.getElementById("passwords");
  sessionStorage.setItem("fname", userName);
}

function customerid() {
  id += 1;
}
