function initializePagew() {
  getelement();
  store2();
  createCustomer();
}

function createCustomer() {
  //Get required fields
  const customerFirstNameField = document.getElementById("fname");
  const customerFirstName = customerFirstNameField.value;

  const customerLastNameField = document.getElementById("lname");
  const customerLastName = customerLastNameField.value;

  //Create a customer object
  const customerObject = {
    firstName: customerFirstName,
    lastName: customerLastName,
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
  var hfirst = document.getElementById("firstname");
  hfirst.innerText = localStorage.fname;
  //var hlast = document.getElementById("lastname");
  //hlast.innerText = localStorage.lname;
}

function store2() {
  var userName = document.getElementById("firstname");
  sessionStorage.setItem("fname", userName);
}

function customerid() {
  id += 1;
}
