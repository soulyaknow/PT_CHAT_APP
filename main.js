document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        const gender = document.getElementById("gender").value;

    const userData = {username,password,firstname,lastname,gender,};
    
    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.message == "Successfully created") {
            alert("User registered successfully!");
        } 
        else {
            alert("Registration failed. Please try again.");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert(error);
    });
});
});

document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("login-form");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

    const userData = {username,password};
    
    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.message == "Login Successfully") {
            alert("User Login successfully!");
        } 
        else {
            alert("Login failed. Please try again.");
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        alert(error);
    });
});
}); m,l