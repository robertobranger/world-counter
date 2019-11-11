import io from "socket.io-client";

const url = process.env.URL || "http://127.0.0.1";
const port = process.env.PORT || 3000;

let socketIO = io(`${url}:${port}`);

let counterText = document.getElementById("counterText");

socketIO.on("client_data", msg => {
  console.log(msg);

  counterText.innerText = msg;
});

/*window.setInterval(() => {
  socketIO.emit("client_current_digits", { id: socketIO.id, worldPopulation });
}, 1000);*/
