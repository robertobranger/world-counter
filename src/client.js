import io from "socket.io-client";
import serv from "../env";

let socketIO = io(serv.url);

let counterText = document.getElementById("counterText");
let pplInSpace = document.getElementById("pplInSpace");

socketIO.on("client_data", msg => {
  counterText.innerText = msg;
});

socketIO.on("client_pplInSpace", msg => {
  pplInSpace.innerText = msg;
});
