$(document).ready(function(){
    console.log(localStorage.getItem("token"));
})

function showupdateQuote(){
    if($('#quoteUpdate').css("display") == "none"){
        $('#quoteUpdate').css("display", "block");
        $('#quoteFieldButton').html("Hide Update Quote");
    }else{
        $('#quoteUpdate').css("display", "none");
        $('#quoteFieldButton').html("Show Update Quote");
    }
}
function updateQuote(){
    let user =localStorage.getItem("user")
    let quote = $("#quote").val();
    let updateQuote = $("#quoteUpdate").val();
    let data = {
        "quote": quote,
        "email": user,
        "updateQuote": updateQuote
    }
    $.ajax({
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
        },
        url: 'https://www.erikgolke.com/API/v1/quote',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    })
}

function updateEmail(){
    let user =localStorage.getItem("user")
    let newEmail = $("#email").val();
    let data = {
        "email": user,
        "newEmail": newEmail
    }
    $.ajax({
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
        },
        url: 'https://www.erikgolke.com/API/v1/changeUserName',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(response){
            console.log("User changed")
            localStorage.setItem("user", response.email)
        },
        error: function(error){
            console.log(error);
        }
    })
}

function deleteQuote(){
    let user =localStorage.getItem("user")
    let quote = $("#quote").val();
    let data = {
        "quote": quote,
        "email": user
    }
    $.ajax({
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
        },
        url: 'https://www.erikgolke.com/API/v1/quote',
        type: 'DELETE', 
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(response){
            console.log(response);
            
        },
        error: function(error){
            console.log(error);
        }
    })
}
function deleteAllQuote(){
    let user =localStorage.getItem("user")
    let data = {
        "email": user
    }
    $.ajax({
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
        },
        url: 'https://www.erikgolke.com/API/v1/quoteAll',
        type: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(response){
            console.log(response);

        },
        error: function(error){
            console.log(error);
        }
    })
}


function getQuote(){
    let user =localStorage.getItem("user")
    $.ajax({
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
        },
        url: 'https://www.erikgolke.com/API/v1/quote?email='+user,
        type: 'GET',
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    })
}

function getAnyQuote(){
    $.ajax({
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
        },
        url: 'https://www.erikgolke.com/API/v1/quoteAll',
        type: 'GET',
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    })
}

function sendQuote(){
    let user =localStorage.getItem("user")
    let quote = $("#quote").val();
    let data = {
        "quote": quote,
        "email" : user
    }
    $.ajax({
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
        },
        url: 'https://www.erikgolke.com/API/v1/quote',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    })
}