// Handle login form submission
import "./config.json"
console.log("this is working")

document.getElementById("loginForm").addEventListener("submit",async function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const apiEndPoint="http://127.0.0.1:8080/api/v1/login"

    const loginResult = await fetch(apiEndPoint, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            "empId":username,
            "password":password
        })
    });

    if(loginResult.status==200){
        document.getElementById("profile").style.display = "block";
        document.getElementById("leave").style.display = "block";
        document.getElementById("login").style.display = "none";
        const jsonResponse=await loginResult.json()

        localStorage.setItem("accessToken",jsonResponse["accessToken"])
    }else{
        alert("Please provide valid Emp ID aand Password")
    }

});

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("accessToken");
    if (token) {
        document.getElementById("profile").style.display = "block";
        document.getElementById("leave").style.display = "block";
        document.getElementById("login").style.display = "none";
    }
});
