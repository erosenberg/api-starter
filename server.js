const express = require("express");
const paths = require("./config/paths");

const { NODE_ENV, SERVER_PORT } = process.env;

const app = express();

app.use(express.static(paths.staticPath));
app.set("view engine", "ejs");

app.get("/marco", (req, res) => {
  res.send("polo");
});

app.get("*", (req, res) => {
  res.render(paths.indexViewPath);
});

app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}!`);
});
