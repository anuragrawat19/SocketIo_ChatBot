const socket = io();
// console.log('check 1', socket.connected)
var notification_audio = new Audio('ting.mp3');
const form  = document.getElementById("send-container");

const messageInput = document.getElementById('msginput')

const messageContainer  = document.querySelector(".container")

const append = (message,position)=>{
    const joinedmessageElement = document.createElement('div');
    joinedmessageElement.innerText = message;
    joinedmessageElement.classList.add('message');
    joinedmessageElement.classList.add(position);
    messageContainer.append(joinedmessageElement);
    if(position == 'left'){
        notification_audio.play()

    }
}
const USERNAME = prompt("Enter Your Name to Join ");
//whne ever any new user Enters the CHat
if (USERNAME){
    socket.emit("newuser-joined",USERNAME); // using socket it will emit the event to the server that someone joined
    socket.on('user-joined',name=>{ 
        append(`${name} Joined the Chat`,'right')
    
    })
}
else{
        socket.emit("newuser-joined","Anonymous User"); // using socket it will emit the event to the server that someone joined
        socket.on('user-joined',name=>{ 
            append(`${name} Joined the Chat`,'right')
        
        })
}
///////////////////////////
//When the message is sent by any
form.addEventListener('submit',(e)=>{
    e.preventDefault(); //helps in not loading the page
    const message = messageInput.value;
    append(`You : ${message}`,'right')
    socket.emit('send',message)
    messageInput.value = ""

    socket.on('recieve',data=>{
        if (data.name){
            append(`${data.name} :  ${data.message}`,'left')
        }
        else{
            append(`Anonymous User :  ${data.message}`,'left')

        }

    })

})





socket.on('left',user=>{
    if(user){
    append(`${user} : Left the Chat`,'right')

    }
    else{
        append(`Anonymous User : Left the Chat`,'right')

    }

})