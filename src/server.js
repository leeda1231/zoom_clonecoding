import express from "express";
import path from "path";
import http from "http";
import WebSocket, {WebSocketServer} from "ws";

const __dirname = path.resolve();
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
// user가 /public으로 가게되면 __dirname + "/public" 폴더를 보여주게 한다.
app.use("/public", express.static(__dirname + "/src/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// const handleListen = () => console.log(`Listening on ws://localhost:3000`);
// app.listen(3000, handleListen);

// 같은 서버에서 http와 webSocket 둘 다 작동
// 2개가 같은 port에 있길 원하기 때문에 이렇게 하는 것
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

//vanilla JS
function handleConnection(socket) {
  console.log(socket)
}
wss.on("connection", handleConnection)


// app.listen과 다른 건 http서버에 access 하려는 것
server.listen(3000, handleListen);