var socketio = io();

let username = '';
let params = new URLSearchParams(window.location.search);
if (params.has('username')) {
  username = params.get('username');
}
console.log('Current User => ', username);

let today = new Date();
let time = today.getHours() + ':' + today.getMinutes();

let form = document.getElementById('chat-form');
let msgInp = document.getElementById('msg');
// let userMsgs = document.getElementById('userMsgs');
let userMsgsDiv = document.getElementById('chat-messages');

// newConnection
socketio.on('newConnection', (data) => {
  let elementDiv = document.createElement('div');
  elementDiv.innerHTML = `<div style="background-color: #f2e6ff"> <p> ${data.username}: <span style="margin-left:30px">${data.msg} </span></p> <p> ${data.time} </p> </div> <br>`;
  userMsgsDiv.appendChild(elementDiv);
});

// socketio.on('leftChat', (data) => {
//   let elementDiv = document.createElement('div');
//   elementDiv.innerHTML = `<div style="background-color: #f2e6ff"> <p> ${data.username}: <span style="margin-left:30px">${data.msg} </span></p> <p> ${data.time} </p> </div> <br>`;
//   userMsgsDiv.appendChild(elementDiv);
// });

form.addEventListener('submit', (e) => {
  console.log('BOOLEAN for messages in chat input box ==> ', !!msgInp.value);
  e.preventDefault();
  if (!!msgInp.value) {
    let elementDiv = document.createElement('div');
    elementDiv.innerHTML = `<div style="background-color: #b3d1ff"> <p> You: <span style="margin-left:30px">${msgInp.value} </span></p> <p> ${time} </p> </div> <br>`;
    userMsgsDiv.appendChild(elementDiv);

    socketio.emit('chatMsg', { msg: msgInp.value, username, time });
  }
  msgInp.value = '';
});

socketio.on('msgToChatBox', (data) => {
  console.log('Data received from server ==> ', data);
  let elementDiv = document.createElement('div');
  elementDiv.innerHTML = `<div style="background-color: #b3ecff"> <p> ${data.username}: <span style="margin-left:30px"> ${data.msg} <span> </p> <pstyle="margin-left:10px"> ${data.time} </p> </div> <br>`;
  userMsgsDiv.appendChild(elementDiv);
});
