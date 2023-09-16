// Handle login form submission
const response = await fetch('./config.json');
const jsonData = await response.json();
const apiEndpoint= jsonData["apiEndpoint"]

document.getElementById("loginForm").addEventListener("submit",async function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const loginResult = await fetch(apiEndpoint+"/login", {
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
        document.getElementById("alertContainer").style.display = "none";
        const jsonResponse=await loginResult.json()

        localStorage.setItem("accessToken",jsonResponse["accessToken"])

        let userData=await fetch(apiEndpoint+"/employee/1",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        userData=await userData.json()

        document.getElementById("firstName").innerText=userData["firstName"]
        document.getElementById("lastName").innerText=userData["lastName"]
        document.getElementById("dob").innerText=userData["dob"]
        document.getElementById("sex").innerText=userData["sex"]


    }else{

        document.getElementById('alertContainer').innerHTML = `
          <div class="alert alert-danger" role="alert">
            Please provide valid Emp ID and Password
          </div>`
    }

});

document.addEventListener("DOMContentLoaded",async function () {
    var token = localStorage.getItem("accessToken");
    debugger
    const apiEndPoint=apiEndpoint+"/login/validate-token"
    debugger
    console.log("This is working")

    const loginResult = await fetch(apiEndPoint, {
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":token
        }
    });
    debugger
    console.log("LOgin result "+loginResult.status)
    if(loginResult.status!=200) {
        localStorage.removeItem("accessToken")
        token=null
    }


    if (token) {
        document.getElementById("profile").style.display = "block";
        document.getElementById("leave").style.display = "block";
        document.getElementById("login").style.display = "none";
    }
});
