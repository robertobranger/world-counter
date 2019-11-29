let helper = require("./helper.js");

var nextBirthsProjection = 0;
var nextDeathsProjection = 0;
var nextProjectionDate = 0;
var worldPopulation = 0;
var pplInSPace = 0;
var io = null;

function oneBirthHappened() {
  worldPopulation++;

  io.emit(
    "client_data",
    `+ ${helper.format(helper.pad(worldPopulation, 12), 0)}`
  );
  //trigger
}

function oneDeathHappened() {
  worldPopulation--;
  io.emit(
    "client_data",
    `- ${helper.format(helper.pad(worldPopulation, 12), 0)}`
  );
  // trigger
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

function start(
  BirthsProjection,
  DeathsProjection,
  ProjectionDate,
  worldPopulationIn,
  ioIn
) {
  io = ioIn;
  worldPopulation = worldPopulationIn;

  var timeRemainingToNextProjection = ProjectionDate - Date.now();
  var presentBirthRatePerSecond =
    BirthsProjection / timeRemainingToNextProjection;
  var presentDeathRatePerSecond =
    DeathsProjection / timeRemainingToNextProjection;
  startCountingBirths(presentBirthRatePerSecond);
  startCountingDeaths(presentDeathRatePerSecond);
}

exports = module.exports = start;
