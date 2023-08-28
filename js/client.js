const socket = io("http://localhost:8000", { transports: ["websocket"] });//due to cors error

const form=document.getElementById('send-container');
const messageinput=document.getElementById('msgInp');
const messagecontainer=document.querySelector(".container");

var audio=new Audio('msgsound.mp3');

const appendd=(message,position)=>{
    const msgelement=document.createElement('div');
    msgelement.innerText=message;
    msgelement.classList.add('message');//adding css with class message
    msgelement.classList.add(position); //adding css with position
    messagecontainer.append(msgelement);
    if(position=='left'){
        audio.play();
    }
}

const namee=prompt("Enter your name to join");
socket.emit('new-user-joined',namee);

socket.on('user-joined',namee=>{
    appendd(`${namee} joined the chat`,'right');
})

socket.on('receive',data=>{
    appendd(`${data.name} : ${data.message}`,'left');
})

socket.on('left',namee=>{
    appendd(`${namee} left the chat`,'right');
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg=messageinput.value;
    appendd(`You:${msg}`,'right');
    socket.emit('send',msg);
    messageinput.value='';
})