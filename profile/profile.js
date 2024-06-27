"use strict"

window.onload = () => {
    let logOutButton = document.querySelector("#logOutButton");
    let addPost = document.querySelector("#addPost");

    logOutButton.addEventListener("click", logout);
    addPost.addEventListener("submit", addToFeed);
}


function logout() {
const loginData = getLoginData();
const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";
  // GET /auth/logout
  const options = {
      method: "GET",
      headers: {
          // This header is how we authenticate our user with the
          // server for any API requests which require the user
          // to be logged-in in order to have access.
          // In the API docs, these endpoints display a lock icon.
          Authorization: `Bearer ${loginData.token}`,
      },
  };

  fetch(apiBaseURL + "/auth/logout", options)
      .then(response => response.json())
      .then(data => console.log(data))
      .finally(() => {
          // We're using `finally()` so that we will continue with the
          // browser side of logging out (below) even if there is an 
          // error with the fetch request above.

          window.localStorage.removeItem("login-data");  // remove login data from LocalStorage
          window.location.assign("../index.html");  // redirect back to landing page
      });
}


// Create todo 
const addToFeed = async (event) => {
  // call preventDefault to keep the page from reloading the form and refreshing 
  event.preventDefault();
    //generate new form data object
  let formData = new FormData(event.target);

  // generate  a javascript Objext from the form data object created above 
  let formDataASObject = Object.fromEntries(formData);

  try {
      const loginData = getLoginData();
      // we make a fetch POST request to create a todo in the API
      const response = await fetch("http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts",

          {
              method: "POST",
              headers: {
                  
                  Authorization: `Bearer ${loginData.token}`,
                  "Content-type": "application/json; charset=UTF-8"
              },
              // take the data from the form and build the body of the request
              body: JSON.stringify(formDataASObject)
              
          }
      );
      // turn the response into somthing we can work with 
      const newPost = await response.json();
      alert("Your post has been added to the feed!")
      console.log(newPost)

      window.location.href="../postspage/index.html"
  } catch (error) {

      console.log("Well that didn't go as planned, did it?")


  }

}