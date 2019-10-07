import axios from "axios";

let btn_save = document.getElementById("btn-save");

btn_save.onclick = () => {
  const nextBirthsProjection = document.getElementById("1").value;
  const nextDeathsProjection = document.getElementById("2").value;
  const nextProjectionDate = document.getElementById("3").value;
  const worldPopulation = document.getElementById("4").value;

  const data = {
    nextBirthsProjection,
    nextDeathsProjection,
    nextProjectionDate,
    worldPopulation
  };

  axios.post("http://127.0.0.1:3000/data", data).then(
    response => {
      console.log(response);
    },
    error => {
      console.log(error);
    }
  );
};
