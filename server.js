const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const Chat = require("./models/Chat");

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "https://hacktoon-world.vercel.app", credentials: true },
});

let onlineUsers = 0;
io.on("connection", (socket) => {
  console.log("🟢 Connected:", socket.id);
  onlineUsers++;
  io.emit("onlineUsers", onlineUsers);
  socket.on("disconnect", () => {
    onlineUsers--;
    io.emit("onlineUsers", onlineUsers);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
});
