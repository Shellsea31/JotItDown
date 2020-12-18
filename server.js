const express = require("express");
const app = express();
const PORT = process.env.PORT || 2020;
const apiRoutes = require("./routes/api-routes");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// it delivers public (front end) folder to user
app.use(express.static("./public"))

app.use("/", apiRoutes);

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
