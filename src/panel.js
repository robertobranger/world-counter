import axios from "axios";
import io from "socket.io-client";

let socketIO = io("http://127.0.0.1:3000");

let btn_save = document.getElementById("btn-save");

let nextBirthsProjection = document.getElementById("1");
let nextDeathsProjection = document.getElementById("2");
let nextProjectionDate = document.getElementById("3");
let worldPopulation = document.getElementById("4");

socketIO.on("admin_global_data", msg => {
  nextBirthsProjection.value = msg.nextBirthsProjection;
  nextDeathsProjection.value = msg.nextDeathsProjection;
  nextProjectionDate.value = msg.nextProjectionDate;
  worldPopulation.value = msg.worldPopulation;

  console.log(msg);
});

btn_save.onclick = () => {
  const data = {
    nextBirthsProjection: nextBirthsProjection.value,
    nextDeathsProjection: nextDeathsProjection.value,
    nextProjectionDate: nextProjectionDate.value,
    worldPopulation: worldPopulation.value
  };

  socketIO.emit("save_admin_gloabl_data", data);
};
