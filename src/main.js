import axios from "axios";

var nextBirthsProjection = 0;
var nextDeathsProjection = 0;
var nextProjectionDate = 0;
var worldPopulation = 0;

var onSwitch = true;
var seconds = 1000;

function oneBirthHappened() {
  worldPopulation++;
  document.getElementById("counterText").innerHTML = worldPopulation;
}

function oneDeathHappened() {
  worldPopulation--;
  document.getElementById("counterText").innerHTML = worldPopulation;
}

function timeToNextBirth(birthRate) {
  return (1000 * 5) / poissonRandomVariable(5 * birthRate);
}

function timeToNextDeath(deathRate) {
  return (1000 * 10) / poissonRandomVariable(10 * deathRate);
}

function poissonRandomVariable(mean) {
  var limit = Math.exp(-mean);
  var p = 1.0;
  var counter = 0;

  do {
    counter++;
    p *= Math.random();
  } while (p > limit);

  return counter - 1;
}

function startCountingBirths(birthRate1) {
  var timeoutTime1 = timeToNextBirth(birthRate1);
  setTimeout(function() {
    oneBirthHappened();
    startCountingBirths(birthRate1);
  }, timeoutTime1);
}
function startCountingDeaths(deathRate1) {
  var timeoutTime2 = timeToNextDeath(deathRate1);
  setTimeout(function() {
    oneDeathHappened();
    startCountingDeaths(deathRate1);
  }, timeoutTime2);
}

function start(BirthsProjection, DeathsProjection, ProjectionDate) {
  var timeRemainingToNextProjection = ProjectionDate - Date.now();
  var presentBirthRatePerSecond =
    BirthsProjection / timeRemainingToNextProjection;
  var presentDeathRatePerSecond =
    DeathsProjection / timeRemainingToNextProjection;
  startCountingBirths(presentBirthRatePerSecond);
  startCountingDeaths(presentDeathRatePerSecond);
}

window.onload = () => {
  axios.get("/data").then(
    response => {
      console.log(response);

      nextBirthsProjection = response.data.nextBirthsProjection;
      nextDeathsProjection = response.data.nextDeathsProjection;
      nextProjectionDate = response.data.nextProjectionDate;
      worldPopulation = response.data.worldPopulation;

      start(nextBirthsProjection, nextDeathsProjection, nextProjectionDate);
    },
    error => {
      console.log(error);
      alert("error ");
    }
  );
};
