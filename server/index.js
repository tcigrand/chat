const io = require("socket.io")();

const users = new Set();

io.on("connection", client => {
  console.log("connection");

  client.on("listUsers", () => {
    io.emit("users", Array.from(users));
  });

  client.on("subscribeToChat", interval => {});

  client.on("userLogin", ({ user }) => {
    console.log("login", user);
    users.add(user);
  });

  client.on("messageSent", data => {
    io.emit("messageReceived", data);
  });
});

const port = 8000;
io.listen(port);
console.log("listening on port ", port);
