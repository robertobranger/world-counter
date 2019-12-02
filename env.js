let url = "";

if (process.env.ENV === "PRODUCTION") {
  url = "https://counterworld.herokuapp.com/";
} else {
  url = "http://127.0.0.1:3000";
}

module.exports = {
  url: url,
  port: process.env.PORT || 3000
};
