function initializePage() {
  document.getElementById("userName").innerHTML = localStorage.getItem("fname");
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
      //Get the new created user from the response and then create a basket
      response.json().then((newCreatedUser) => {
        createBasket(newCreatedUser.id);

        console.log(newCreatedUser, 'new user')

        //Redirect to registration complete window
        localStorage.setItem("fname", newCreatedUser.username);
        localStorage.setItem("currentUserId", newCreatedUser.id)
        
        window.location.replace(
          "http://localhost:3000/RegistrationComplete_v1.html"
        );
      });
    } else {
      console.log("Failed with error code + " + response.status);
    }
  });
}

function createBasket(customerId) {
  customerIdObj = { customerId: customerId };
  const customerIdObjectAsJsonString = JSON.stringify(customerIdObj);

  fetch("http://localhost:3000/baskets", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: customerIdObjectAsJsonString,
  }).then((response) => {
    //Wait for the API to respond - statuscode should be 201 if everything went well
    if (response.status === 201) {
      console.log("Basket successfully created");
    } else {
      console.log("Failed with error code + " + response.status);
    }
  });
}
