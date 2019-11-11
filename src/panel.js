import io from "socket.io-client";
import serv from "../env";
let socketIO = io(serv.url);

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
