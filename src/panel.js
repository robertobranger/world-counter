import io from "socket.io-client";
import serv from "../env";
import flatpickr from "flatpickr";
import moment from "moment";

let socketIO = io(serv.url);

let btn_save = document.getElementById("btn-save");
let btn_save_ppinSpace = document.getElementById("btn-save-ppinSpace");

let nextBirthsProjection = document.getElementById("1");
let nextDeathsProjection = document.getElementById("2");
let nextProjectionDate = document.getElementById("3");
let worldPopulation = document.getElementById("4");
let pplInSpace = document.getElementById("5");

socketIO.on("admin_global_data", msg => {
  nextBirthsProjection.value = msg.nextBirthsProjection;
  nextDeathsProjection.value = msg.nextDeathsProjection;
  nextProjectionDate.value = moment(msg.nextProjectionDate, "x").format(
    "YYYY-MM-DD"
  );
  worldPopulation.value = msg.worldPopulation;
});

socketIO.on("admin_pplInSpace", msg => {
  pplInSpace.value = msg;
});

btn_save.onclick = () => {
  const data = {
    nextBirthsProjection: nextBirthsProjection.value,
    nextDeathsProjection: nextDeathsProjection.value,
    nextProjectionDate: moment(nextProjectionDate.value, "YYYY-MM-DD").format(
      "x"
    ),
    worldPopulation: worldPopulation.value
  };

  socketIO.emit("save_admin_gloabl_data", data);
};

btn_save_ppinSpace.onclick = () => {
  socketIO.emit("save_admin_pplInSpace", pplInSpace.value);
};

flatpickr(nextProjectionDate, {
  minDate: "today",
  enableTime: false,
  dateFormat: "Y-m-d"
});
