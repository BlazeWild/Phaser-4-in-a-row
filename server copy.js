const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

console.log("Server started");

// Serve static files from the client/public directory
app.use(express.static(path.join(__dirname, "client", "public")));

// Serve the index.html file from the client folder
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// Start the server
server.listen(3000, () => {
  console.log("listening on *:3000");
});
