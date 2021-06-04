const express = require("express");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const debug = require("debug")("app");

const genres = require("./routes/genres");
const home = require("./routes/home");

const log = require("./middleware/logger");
const addGenreSchema = require("./validations/genre");
const port = config.get("Configuration.port");

// creating the express app
const app = express();
// setting up body-parsing middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(helmet());

debug("app running in dev mode");
debug("morgan enabled...");
if (app.get("env") === "dev") {
  app.use(morgan("tiny"));
}
// logger middleware
app.use(log);

// view engine setup for pug
app.set("view engine", "pug");
// by default express looks into ./views
app.set("views", "./views");

app.use("/", home);
app.use("/api/genres", genres);

app.listen(port, () =>
  console.log("Listening on port ", port, `: in ${app.get("env")} environment`)
);
