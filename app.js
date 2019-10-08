var express = require("express");
var app = express();
const chalk = require("chalk");
app.use(express.static("public"));
app.use(express.json()); // for parsing application/json

var http = require("http").createServer(app);
var io = require("socket.io")(http);

let globaldata = {
  nextBirthsProjection: 6 * 1000 * 60 * 20, //387000 births per day //16122 births per hour // 270 biths per minute // 4.5 births per second
  nextDeathsProjection: 1.9 * 1000 * 60 * 20, //162360 deaths per day // 6795 deaths per hour //113 death per minute // 1.9 deaths per second
  nextProjectionDate: Date.now() + 1000 * 60 * 20, // unix date + ms * seg * minutes
  worldPopulation: 7432536555
};

let client_data_list = [];

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
  // =====================================================
  // general

  console.log(chalk.green("Client conected!"));

  // disconnect
  socket.on("disconnect", function(client) {
    console.log(client);
    console.log(chalk.red("Client disconected"));
  });

  // =====================================================
  // admin

  // admin client is conected so send this.
  io.emit("admin_global_data", globaldata);

  // save data to the global variable
  socket.on("save_admin_gloabl_data", function(msg) {
    console.log("SAVE NEW DATA:", msg);

    globaldata = {
      nextBirthsProjection: msg.nextBirthsProjection,
      nextDeathsProjection: msg.nextDeathsProjection,
      nextProjectionDate: msg.nextProjectionDate,
      worldPopulation: msg.worldPopulation
    };

    io.emit("client_global_data", globaldata);
  });

  // =====================================================
  // client

  // client is conected so send this.
  io.emit("client_global_data", globaldata);

  socket.on("client_current_digits", function(msg) {
    let l = client_data_list.length;
    let newClient = true;

    for (let i = 0; i < l; i++) {
      if (client_data_list[i].id === msg.id) {
        client_data_list[i] = msg;
        newClient = false;
        break;
      }
    }

    if (newClient) {
      client_data_list.push(msg);
    }

    console.log(client_data_list);
  });
});

// ===========================================================
// Bootstrap app
//
http.listen(3000, function() {
  console.log(chalk.green("Server App listening on port 3000!"));
});
