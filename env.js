module.exports = {
  url:
    process.env.ENV === "PRODUCTION"
      ? "https://counterworld.herokuapp.com/"
      : "http://127.0.0.1:3000",
  port: process.env.PORT || 3000
};
