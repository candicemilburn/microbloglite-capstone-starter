"use strict"

window.onload = () => {


    const registrationForm = document.querySelector("#registrationForm")

    registrationForm.addEventListener("submit", register)
}

//method/function to sign up form 
//CRUD: (C)reate a user
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
    alert("Account successfully created. Please log in now.");
    //redirect user to log in for the first time and create a key
    window.location.href = "/index.html";
    
} catch (error) {
    console.log("Error occurred:", error);
    alert("An error occurred while creating your account. Please try again later.");
}



}