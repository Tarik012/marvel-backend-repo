const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

//pour les ves variables d'environnement
require("dotenv").config();

app.use(express.json());
app.use(cors());

// GET ALL COMICS
app.get("/comics", async (req, res) => {
  const title = req.query.title || "";
  const skip = req.query.skip || 0;
  const limit = req.query.limit || 100;
  //console.log("A"); doit s'afficher si j'interroge cette route depuis le front
  try {
    const response = await axios.get(
      `${process.env.URL_COMICS}?apiKey=${process.env.MARVEL_KEY}&limit=${limit}&skip=${skip}&title=${title}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET ALL COMICS WITH A SPECIFIC CHARACTER
app.get("/comics/:characterId", async (req, res) => {
  //console.log(req.params);
  const characterId = req.params["characterId"];

  // const url = `${process.env.URL_COMICS}/${characterId}?apiKey=${process.env.MARVEL_KEY}}`;
  // console.log(url);
  try {
    const response = await axios.get(
      `${process.env.URL_COMICS}/${characterId}?apiKey=${process.env.MARVEL_KEY}`
    );
    //res.json("OK");
    //console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//GET A LIST OF CHARACTERS
app.get("/characters", async (req, res) => {
  const name = req.query.title || ""; // si valeur null ou undefined, je prends la valeur de droite sinon celle de gauche
  const skip = req.query.skip || 0;
  const limit = req.query.limit || 100;

  // console.log(
  //   `${process.env.URL_CHARACTERS}?apiKey=${process.env.MARVEL_KEY}&limit=${limit}&skip=${skip}&title=${name}`
  // );

  try {
    const response = await axios.get(
      `${process.env.URL_CHARACTERS}?apiKey=${process.env.MARVEL_KEY}&limit=${limit}&skip=${skip}&name=${name}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//GET A LIST OF A SPECIFIC CHARACTER
app.get("/character/:characterId", async (req, res) => {
  const characterId = req.params["characterId"];
  try {
    const response = await axios.get(
      `${process.env.URL_CHARACTERS}/${characterId}?apiKey=${process.env.MARVEL_KEY}`
    );
    //res.json("OK");
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(400).json({ message: "Cette route n'existe pas" });
});

app.listen(3200, () => {
  console.log("Server started 🚀");
});
