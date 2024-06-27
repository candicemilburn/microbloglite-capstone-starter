/* Posts Page JavaScript */

"use strict";
const api = "http://microbloglite.us-east-2.elasticbeanstalk.com";

window.onload = () => {

    //getPostsAsyncExample()

    getPosts();

    // Looks for the logout button in by its id in html 
    const logOutButton = document.querySelector("#logOutButton");
    // With the add event listener when the button is clicked it will call the funciton
    // and logout the user snf clear the local data of and send them to the login page
    logOutButton.addEventListener("click", logout);


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

//get posts with fetch

function getPosts() {
    const loginData = getLoginData();
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`,
        },
    };

    fetch(api + "/api/posts", options)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(posts => {
        
        console.log(posts);
        displayPosts(posts);
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
        // Handle the error appropriately, e.g., show an error message to the user
        alert('Failed to fetch posts. Please try again later.');
    });
}
    const displayPosts= (posts) => {

      // Getting a hold of the container where posts will be displayed
        let postContainer = document.querySelector("#postContainer");
   
        // Clear previous content if needed
        postContainer.innerHTML = '';
    
        // let posts = await getPosts();
    
   
        posts.forEach((post) => {
   
           let date = new Date(post.createdAt).toLocaleString();
   
            postContainer.innerHTML += `
           <div class="post">
                   <span class="username"><b>${post.username}</b></span><br>
                   <span class="comment">Said: ${post.text}</span><br>
                   <span class="date"><i><small>Posted on: ${date}</small></i></span><br>
               </div><hr>`;
           
           
   
        });
   
   
   
   
   }


function getLoginData () {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}