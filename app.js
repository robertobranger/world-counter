var express = require("express");
var app = express();
const chalk = require("chalk");
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json
let serv = require("./env.js");
var help = require("./helper");
const pad = help.pad;
const format = help.format;

var http = require("http").createServer(app);
var io = require("socket.io")(http);

let globaldata = {
  presentBirthRatePerSecond: 4.5, // 4.5 births per second
  presentDeathRatePerSecond: 1.9, // 1.9 deaths per second
  worldPopulation: 7748186415
};

let pplInSpace = 6;
let simbol = "+";
let prevpplInSpace = 0;
var cantidadCerosPad = 12;

var contador = require("./contador")(
  globaldata.presentBirthRatePerSecond,
  globaldata.presentDeathRatePerSecond,
  globaldata.worldPopulation,
  io
);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/admin", function(req, res) {
  res.sendFile(__dirname + "/public/admin.html");
});

// Socket ---------------------------------------------------

io.on("connection", function(socket) {
  
  contador = require("./contador")(
    globaldata.presentBirthRatePerSecond,
    globaldata.presentDeathRatePerSecond,
    globaldata.worldPopulation,
    io
  );
  
  // =====================================================
  // general

  console.log(chalk.green("Client conected!"));

  // disconnect
  socket.on("disconnect", function(client) {
    console.log(client);
    console.log(chalk.red("Client disconected"));
  });

  io.emit("admin_pplInSpace", pplInSpace);
  io.emit(
    "client_pplInSpace",
    `${simbol} ${format(pad(pplInSpace, cantidadCerosPad))}`
  );

  // =====================================================
  // admin

  // admin client is conected so send this.
  io.emit("admin_global_data", globaldata);

  // save data to the global variable
  socket.on("save_admin_gloabl_data", function(msg) {
    console.log("SAVE NEW DATA:", msg);

    globaldata = {
      presentBirthRatePerSecond: msg.presentBirthRatePerSecond,
      presentDeathRatePerSecond: msg.presentDeathRatePerSecond,

      worldPopulation: msg.worldPopulation
    };


  });

  socket.on("save_admin_pplInSpace", function(msg) {
    console.log("SAVE NEW DATA (save_admin_pplInSpace):", msg);
    pplInSpace = msg;

    simbol = parseInt(msg) >= prevpplInSpace ? "+" : "-";

    prevpplInSpace = pplInSpace;

    io.emit(
      "client_pplInSpace",
      `${simbol} ${format(pad(pplInSpace, cantidadCerosPad))}`
    );
  });

  // =====================================================
  // =====================================================
  // =====================================================
  // client
});

// ===========================================================
// Bootstrap app
//
http.listen(serv.port, function() {
  console.log(chalk.green(`Server App listening on port ${serv.port}!`));
});
