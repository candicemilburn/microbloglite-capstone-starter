"use strict"

window.onload = () =>{
console.log("i think i can")

// registerButton.addEventListener("click", saveData);

const registrationForm = document.querySelector("#registrationForm");
registrationForm.addEventListener("submit", register);
}


const register = async (event) => {
   
    //call preventDefault to keep the page from reloading
    event.preventDefault();
    
    //generate a new form data object
    let formData = new FormData(event.target);

    //generate a JavaScript Object from the formData object created above
    let formDataAsObject = Object.fromEntries(formData);

    try {
        //make a fetch(POST) request to create new user
        let response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(formDataAsObject)
        });


        let newUser = await response.json();

        console.log(newUser, "New user created!");
        alert("Account successfully created! Please log in now.");
        //redirect user to log in for the first time and create a key
        window.location.href = "../index.html";

    } catch (error) {
        console.log("Error occurred:", error);
        alert("An error occurred while creating your account. Please try again.");
    }

}


// function saveData() {

//     let fullName = document.querySelector("#fullName").value;
//     let password = document.querySelector("#password").value;
//     let username = document.querySelector("#username").value;

//     // localStorage.setItem("fullName", fullName);
//     // localStorage.setItem("password", password);
//     // localStorage.setItem("username", username);

//     let user = {
//         fullName: fullName,
//         username: username,
//         password: password,
//     };

//     let json = JSON.stringify(user);
//     localStorage.setItem(username, JSON.stringify(user));

//     console.log(json, "User Added");


// }

// registrationForm.addEventListener('submit', function(event) {
//     event.preventDefault();
//     const username = document.getElementById("username").value;
//     const fullName = document.getElementById("fullName").value;
//     const password = document.getElementById("password").value;
    
  
//     register(username, fullName, password);
//   });
//method/function to sign up form 
//CRUD: (C)reate a user

// fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/users", {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ username, fullName, password })
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log('Registration successful:', data);
//     alert("Account successfully created! Please log in now.");
//     // Redirect to login page
//     window.location.href = "../index.html"; 
//   })
//   .catch(error => {
//     console.error('Error registering user:', error);
//     //alert('An error occurred while creating your account. Please try again.');
//   });

