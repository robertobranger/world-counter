let helper = require("./helper.js");

var presentBirthRatePerSecond = 0;
var presentDeathRatePerSecond = 0;
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
  return parseInt(1000 * (1 / RandomVariable(birthRate)));
}

function timeToNextDeath(deathRate) {
  return parseInt(1000 * (1 / RandomVariable(deathRate)));
}

function RandomVariable(rate) {
  return (0.7 + 0.6 * Math.random()) * rate;
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
  presentBirthRatePerSecond,
  presentDeathRatePerSecond,
  worldPopulationIn,
  ioIn
) {
  io = ioIn;
  worldPopulation = worldPopulationIn;

  startCountingBirths(presentBirthRatePerSecond);
  startCountingDeaths(presentDeathRatePerSecond);
}

exports = module.exports = start;
