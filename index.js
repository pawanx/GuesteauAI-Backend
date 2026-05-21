const express = require("express");
const cors = require("cors");
require("dotenv").config();
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/api/", (req, res) => {
  res.send("App is running properly");
});

app.use("/api/recipes", recipeRoutes);

app.listen(PORT, () => {
  console.log(`App is running on the PORT ${PORT}`);
});
