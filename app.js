var express = require("express");
var app = express();
const chalk = require("chalk");
app.use(express.static("public"));

const globaldata = {
  nextBirthsProjection: 6 * 1000 * 60 * 20, //387000 births per day //16122 births per hour // 270 biths per minute // 4.5 births per second
  nextDeathsProjection: 1.9 * 1000 * 60 * 20, //162360 deaths per day // 6795 deaths per hour //113 death per minute // 1.9 deaths per second
  nextProjectionDate: Date.now() + 1000 * 60 * 20,
  worldPopulation: 7432536555
};

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/admin", function(req, res) {
  res.sendFile(__dirname + "/public/admin.html");
});

app.get("/data", function(req, res) {
  res.send(globaldata);
});

app.post("/data", function(req, res) {
  res.send({ data: 01 });
});

// ===========================================================
// Bootstrap app
//
app.listen(3000, function() {
  console.log(chalk.green("Server App listening on port 3000!"));
});
