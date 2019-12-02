import io from "socket.io-client";
import serv from "../env";
import flatpickr from "flatpickr";
import moment from "moment";

let socketIO = io(window.location.href.replace("admin", ""));

let btn_save = document.getElementById("btn-save");
let btn_save_ppinSpace = document.getElementById("btn-save-ppinSpace");

let presentBirthRatePerSecond = document.getElementById("1");
let presentDeathRatePerSecond = document.getElementById("2");
let worldPopulation = document.getElementById("4");
let pplInSpace = document.getElementById("5");

socketIO.on("admin_global_data", msg => {
  presentBirthRatePerSecond.value = msg.presentDeathRatePerSecond;
  presentDeathRatePerSecond.value = msg.presentDeathRatePerSecond;
  worldPopulation.value = msg.worldPopulation;
});

socketIO.on("admin_pplInSpace", msg => {
  pplInSpace.value = msg;
});

btn_save.onclick = () => {
  const data = {
    presentBirthRatePerSecond: presentBirthRatePerSecond.value,
    presentDeathRatePerSecond: presentDeathRatePerSecond.value,
    worldPopulation: worldPopulation.value
  };

  socketIO.emit("save_admin_gloabl_data", data);
};

btn_save_ppinSpace.onclick = () => {
  socketIO.emit("save_admin_pplInSpace", pplInSpace.value);
};
