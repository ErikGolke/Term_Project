$(document).ready(function(){
    console.log(localStorage.getItem("token"));
})

function getMetrics(){
    let metrics = "";
    let field = document.getElementById("metrics");
    $.ajax({
        beforeSend: function(xhr){
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"))
        },
        url: 'https://www.erikgolke.com/API/v1/metrics',
        type: 'GET',
        contentType: 'application/json',
        success: function(response){
            let messages = response.message
            messages.forEach((row) =>{
                metrics += JSON.stringify(row);
                metrics += "<br>"
            })
            field.innerHTML = metrics;
            console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    })
}
