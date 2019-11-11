import io from "socket.io-client";
import serv from "../env";

let socketIO = io(serv.url);

let counterText = document.getElementById("counterText");

socketIO.on("client_data", msg => {
  console.log(msg);

  counterText.innerText = msg;
});

/*window.setInterval(() => {
  socketIO.emit("client_current_digits", { id: socketIO.id, worldPopulation });
}, 1000);*/
