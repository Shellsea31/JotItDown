const express = require("express");
const app = express();
const PORT = 2020;
const apiRoutes = require("./routes/api-routes")

// parse received url as a string and use it to grab data
app.use(express.urlencoded({extended: true}));

// parse json data
app.use(express.json());

app.use("/", apiRoutes);

app.listen(PORT, ()=> console.log(`listening at http://localhost:${PORT}`));