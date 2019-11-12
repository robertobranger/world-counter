import io from "socket.io-client";
import serv from "../env";

let socketIO = io(serv.url);

let counterText = document.getElementById("counterText");
let pplInSpace = document.getElementById("pplInSpace");

socketIO.on("client_data", msg => {
  counterText.innerText = msg.worldPopulation;
  pplInSpace.innerText = msg.pplInSpace;
});

/*socketIO.on("client_data_inSpace", msg => {
});*/

/*window.setInterval(() => {
  socketIO.emit("client_current_digits", { id: socketIO.id, worldPopulation });
}, 1000);*/
