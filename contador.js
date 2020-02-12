let helper = require("./helper.js");

var presentBirthRatePerSecond = 0;
var presentDeathRatePerSecond = 0;
var worldPopulation = 0;
var pplInSPace = 0;
var io = null;
var DeathcounterState = 'count';
var BirthCounterState = 'count';


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

/*function startCountingBirths(birthRate1) {
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
}*/


function startCounting(birthRate1,deathRate1,DeathcounterState1,BirthCounterState1) {

  var D = DeathcounterState1
  var B = BirthCounterState1
  var X = true;
  while (X) {
    
    if (D == 'count') {
      console.log('Contando muerte');
      var timeoutTime2 = timeToNextDeath(deathRate1);
      oneDeathHappened();
      D = 'wait'
      
      setTimeout(function() {
        D = 'count';
        console.log(D);
      }, 1000);
    
    }
  
    if (B == 'count') {
      
      var timeoutTime1 = timeToNextBirth(birthRate1);
      
      oneBirthHappened();
      B = 'wait'
      
      setTimeout(() => {
        B = 'count'
      }, timeoutTime1);
    
    }

  }

}

function start(
  presentBirthRatePerSecond,
  presentDeathRatePerSecond,
  worldPopulationIn,
  ioIn
) {
  io = ioIn;
  worldPopulation = worldPopulationIn;

  startCounting(presentBirthRatePerSecond,presentDeathRatePerSecond,DeathcounterState,BirthCounterState)
  /*
  startCountingBirths(presentBirthRatePerSecond);
  startCountingDeaths(presentDeathRatePerSecond);
  */
}

exports = module.exports = start;
