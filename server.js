const express = require("express");
const app = express();
const PORT = 2020;
const apiRoutes = require("./db/routes/api-routes")

// parse received url as a string and use it to grab data
app.use(express.urlencoded({extended: true}));

// parse json data
app.use(express.json());

app.use("/api", apiRoutes);

app.listen(PORT, ()=> console.log(`listening at http://localhost:${PORT}`));