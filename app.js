var express = require("express");
var app = express();
const chalk = require("chalk");
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json

var http = require("http").createServer(app);
var io = require("socket.io")(http);

const globaldata = {
  nextBirthsProjection: 6 * 1000 * 60 * 20, //387000 births per day //16122 births per hour // 270 biths per minute // 4.5 births per second
  nextDeathsProjection: 1.9 * 1000 * 60 * 20, //162360 deaths per day // 6795 deaths per hour //113 death per minute // 1.9 deaths per second
  nextProjectionDate: Date.now() + 1000 * 60 * 20, // unix date + ms * seg * minutes
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

// Socket ---------------------------------------------------

io.on("connection", function(socket) {
  // client is conected so send this.
  io.emit("admin_global_data", globaldata);

  console.log(chalk.green("Client conected!"));

  // save data to the global variable
  socket.on("save_admin_gloabl_data", function(msg) {
    console.log(msg);
  });

  // disconnect
  socket.on("disconnect", function() {
    console.log(chalk.red("Client disconected"));
  });
});

// ===========================================================
// Bootstrap app
//
http.listen(3000, function() {
  console.log(chalk.green("Server App listening on port 3000!"));
});
