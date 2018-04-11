const http = require("http");
const socketIO = require("socket.io");
const app = require("./src/app");
const port = process.env.PORT || 5000;

const server = http.createServer(app);
// const io = socketIO(server);
//
// io.on("connection", socket => {
//   console.log("a user connected");
//
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
//
//   socket.on("coding event", function(data) {
//     socket.broadcast.to(data.room).emit("receive code", data);
//   });
// });

server.listen(port);
