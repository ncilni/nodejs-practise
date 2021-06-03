const express = require("express");
const config = require("config");
const helmet = require("helmet");
const morgan = require("morgan");
const debug = require("debug")("app");

const log = require("./utils/logger");
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

let genres = [
  { id: 1, name: "Thriller" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Romances" },
];
app.get("/", (req, res) => {
  res.render("index", { title: "Vidl api", message: "Welcome!" });
});

// Get all genres
app.get("/api/genres", (req, res) => {
  return res.send(genres);
});

// Get genre by Id
app.get("/api/genres/:id", (req, res) => {
  let genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send("The genre with the requested id does not exist");
  return res.send(genre);
});

// Add a new genre
app.post("/api/genres", (req, res) => {
  const { error } = addGenreSchema.validate(req.body);
  if (error) return res.status(400).send(error);
  newGenre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(newGenre);
  return res.send(newGenre);
});

// Update an existing genre
app.put("/api/genres/:id", (req, res) => {
  let genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send("The genre with the requested id does not exist");
  const { error } = addGenreSchema.validate(req.body);
  if (error) return res.status(400).send(error);
  genre.name = req.body.name;
  return res.send(genre);
});

// Update an existing genre
app.delete("/api/genres/:id", (req, res) => {
  let genreId = genres.findIndex((g) => g.id === parseInt(req.params.id));
  if (genreId < 0)
    return res
      .status(404)
      .send("The genre with the requested id does not exist");
  genres.splice(genreId, 1);
  return res.sendStatus(204);
});

app.listen(port, () =>
  console.log("Listening on port ", port, `: in ${app.get("env")} environment`)
);
