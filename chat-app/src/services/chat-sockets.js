import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:8000");

function listUsers(cb) {
  socket.emit("listUsers");
  socket.on("users", users => cb(users));
}

function userLogin(user) {
  socket.emit("userLogin", { user });
}

function sendMessage(data) {
  socket.emit("messageSent", data);
}

function subscribeToMessagesForUserAndRecipient(currentUser, from, cb) {
  socket.on("messageReceived", data => {
    if (currentUser === data.to && from === data.from) {
      cb(data);
    }
  });
}

function removeAllListeners() {
  socket.removeAllListeners();
}

export {
  removeAllListeners,
  subscribeToMessagesForUserAndRecipient,
  sendMessage,
  listUsers,
  userLogin
};
