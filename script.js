// Handle login form submission

const apiEndpoint= "https://employee-management-service.onrender.com/api/v1"

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
        const jsonResponse=await loginResult.json()
        localStorage.setItem("accessToken",jsonResponse["accessToken"])
        await populateUserDetails()
    }else{

        document.getElementById('alertContainer').innerHTML = `
          <div class="alert alert-danger" role="alert">
            Please provide valid Emp ID and Password
          </div>`
    }

});

document.addEventListener("DOMContentLoaded",async function () {
    var token = localStorage.getItem("accessToken");
    console.log("This is working")

    if(token!=null) {
        const loginResult=await fetch((apiEndpoint+"/login/validate-token"),{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":localStorage.getItem("accessToken")
            }
        })
        console.log("LOgin result "+loginResult.status)
        if(loginResult.status!=200) {
            localStorage.removeItem("accessToken")
            token=null
        }
    }

    if (token) {
        await populateUserDetails()
    }else{
        document.getElementById("logout").style.display="none";
        document.getElementById("ApplyleaveRequests").style.display="none";
    }
});

const populateUserDetails =async ()=>{
    document.getElementById("profile").style.display = "block";
    document.getElementById("employment").style.display = "block";
    document.getElementById("leave").style.display = "block";
    document.getElementById("logout").style.display="block";
    document.getElementById("ApplyleaveRequests").style.display="block";
    document.getElementById("login").style.display = "none";
    document.getElementById("alertContainer").style.display = "none";

    let userData=await fetch((apiEndpoint+"/employee"),{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem("accessToken")
        }
    })
    userData=await userData.json()

    document.getElementById("firstName").innerHTML='<label className="form-label">First Name : </label>'+userData["firstName"]
    document.getElementById("lastName").innerHTML='<label className="form-label">Last Name : </label>'+userData["lastName"]
    document.getElementById("dob").innerHTML='<label className="form-label">DOB : </label>'+userData["dob"]
    document.getElementById("sex").innerHTML='<label className="form-label">Gender : </label>'+userData["sex"]

    let employeeDate= await fetch((apiEndpoint+"/employment"),{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem("accessToken")
        }
    })
    employeeDate=await employeeDate.json()

    document.getElementById("workLocation").innerHTML='<label className="form-label">workLocation : </label>'+employeeDate["workLocation"]
    document.getElementById("employmentType").innerHTML='<label className="form-label">employmentType : </label>'+employeeDate["employmentType"]
    document.getElementById("careerLevel").innerHTML='<label className="form-label">careerLevel : </label>'+employeeDate["careerLevel"]
    document.getElementById("managerId").innerHTML='<label className="form-label">managerId : </label>'+employeeDate["managerId"]
    document.getElementById("department").innerHTML='<label className="form-label">department : </label>'+employeeDate["department"]
    document.getElementById("team").innerHTML='<label className="form-label">team : </label>'+employeeDate["team"]
    document.getElementById("hrid").innerHTML='<label className="form-label">hrid : </label>'+employeeDate["hrid"]
    generateLeaveRequests()
}

document.getElementById("logoutForm").addEventListener("submit",async function(){
    let logoutData=await fetch((apiEndpoint+"/login/signout"),{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem("accessToken")
        }
    })
    localStorage.removeItem("accessToken")
    location.reload()
})

const generateLeaveRequests=async()=>{

    let leaveData=await fetch((apiEndpoint+"/leave"),{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem("accessToken")
        }
    })
    leaveData=await leaveData.json()
    let finalString = "";
    finalString+='<ol type="1">';
    leaveData.forEach((ele)=>{
        finalString+='<li><ul>'
        finalString+='<li><label className="form-label">To : </label>'+ele["to"]+'</li>'
        finalString+='<li><label className="form-label">From : </label>'+ele["from"]+'</li>'
        finalString+='<li><label className="form-label">Status : </label>'+ele["status"]+'</li>'
        finalString+='<li><label className="form-label">Description : </label>'+ele["description"]+'</li>'
        finalString+='<li><label className="form-label">Leave Type : </label>'+ele["leave Type"]+'</li>'
        finalString+='</ul></li>'
    })
    finalString+='</ol>'

    document.getElementById("leaveRequests").innerHTML=finalString
}

document.getElementById("leaveRequestForm").addEventListener("submit",async function(){
    const startDate=document.getElementById("startDate").value
    const endDate=document.getElementById("endDate").value
    const description=document.getElementById("reason").value
    const leaveType=document.getElementById("leaveType").value
    debugger
    let uploadLeaveRequest=await fetch(apiEndpoint+"/api/v1/leave",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":localStorage.getItem("accessToken")
        },
        body: JSON.stringify({
            "tp":startDate,
            "from":from,
            "description":description,

        })
    })
    console.log(startDate,endDate)
})