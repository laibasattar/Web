
function handleinput(event){

    var name =document.getElementById("name").value
    var email=document.getElementById("email").value
    var subject =document.getElementById("subject").value
    var message =document.getElementById("message").value
   
    if(!email) {
       alert("Please fill the Email")
      }
    if(!name) {
        alert("Please add Name")
    }
    if(!subject) {
        alert("Please add Subject")
    }
    if(!message) {
        alert("Please add Message")
    }
    if(email && name && subject && message){
        alert("Message Sent")
    }
    event.preventDefault();
}