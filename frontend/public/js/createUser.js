

function sendData(){
    let email = $("#email").val();
    let password= $("#password").val();
    let data = {
        "email": email,
        "password" : password
    }
    $.ajax({
        url: 'https://www.erikgolke.com/API/v1/newUser',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(response){
            localStorage.setItem("user", email);
            localStorage.setItem("token", response.token);
            window.location.href = "homepage.html";
            console.log(response);
            
        },
        error: function(error){
            console.log(error);
        }
    })
}
function verifyPassword(){
    let password = $("#password").val();
    let verifyPass = $("#verifypassword").val();
    if(password == verifyPass){
        sendData();
    }else{
        alert("Passwords don't match");
    }
}


function login(){
    let username = $("#userEmail").val();
    let password = $("#loginPassword").val();
    let data = {
        "userEmail": username,
        "password": password
    }
    $.ajax({
        url: 'https://www.erikgolke.com/API/v1/login',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(response){
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", username)
            window.location.href = "homepage.html";
            console.log(response);
            
        },
        error: function(error){
            console.log(error);
        }
    })
}