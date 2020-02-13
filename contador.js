let helper = require("./helper.js");

var presentBirthRatePerSecond = 0;
var presentDeathRatePerSecond = 0;
var worldPopulation = 0;
var pplInSPace = 0;
var io = null;
var DeathcounterState = "count";
var BirthCounterState = "count";

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


async function startCounting(
  
  DeathcounterState1,
  BirthCounterState1
) {
  var D = DeathcounterState1;
  var B = BirthCounterState1;
  var X = true;

  setInterval(function() {
    if (D == "count") {

      var timeoutTime2 = timeToNextDeath(presentDeathRatePerSecond);
      oneDeathHappened();
      D = "wait";

      setTimeout(function() {
        D = "count";

      }, timeoutTime2);
    }

    if (B == "count") {
      var timeoutTime1 = timeToNextBirth(presentBirthRatePerSecond);

      oneBirthHappened();
      B = "wait";

      setTimeout(() => {
        B = "count";
      }, timeoutTime1);
    }
  }, 1);
}

function start(
  presentBirthRatePerSecondIn,
  presentDeathRatePerSecondIn,
  worldPopulationIn,
  ioIn, primera_corrida
) {
  io = ioIn;
  worldPopulation = worldPopulationIn;
  presentBirthRatePerSecond = presentBirthRatePerSecondIn;
  presentDeathRatePerSecond = presentDeathRatePerSecondIn;


  if (primera_corrida = true) {
    startCounting(
      DeathcounterState,
      BirthCounterState
    );
  }
}

exports.default = start;
