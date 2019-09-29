var express = require('express');
var app = express();
const chalk = require('chalk');
app.use(express.static('public'));



app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


app.get('/data', function (req, res) {
    res.send({data: 01})
});










// ===========================================================
// Bootstrap app
//
app.listen(3000, function () {
    console.log(chalk.green('Server App listening on port 3000!'));
});