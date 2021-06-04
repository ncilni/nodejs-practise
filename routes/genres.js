const express = require("express");
const router = express.Router();

let genres = [
  { id: 1, name: "Thriller" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Romances" },
];

// Get all genres
router.get("", (req, res) => {
  return res.send(genres);
});

// Get genre by Id
router.get("/:id", (req, res) => {
  let genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre)
    return res
      .status(404)
      .send("The genre with the requested id does not exist");
  return res.send(genre);
});

// Add a new genre
router.post("", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
  let genreId = genres.findIndex((g) => g.id === parseInt(req.params.id));
  if (genreId < 0)
    return res
      .status(404)
      .send("The genre with the requested id does not exist");
  genres.splice(genreId, 1);
  return res.sendStatus(204);
});

module.exports = router;
