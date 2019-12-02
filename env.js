let url = "";

if (process.env.ENV === "PRODUCTION") {
  url = "https://counterworld.herokuapp.com/";
} else if (process.env.ENV === "DEV") {
  url = "http://127.0.0.1:3000";
} else {
  url = "https://counterworld.herokuapp.com/";
}

//url = "http://127.0.0.1:3000";

module.exports = {
  url: url,
  port: process.env.PORT || 3000
};
