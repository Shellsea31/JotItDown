// localhost:2020/api  <==== is the base

const router = require("express").Router();
const fs = require("fs")
const index = fs.readFileSync("./public/index.html", "utf8")
const notes = fs.readFileSync("./public/notes.html", "utf8")

// testing connection
router.get("/", (req, res) => {
  res.json({
    msg: "success",
  });
});

// GET: saved notes "String"
router.get("/api/notes", (req,res) =>{
  fs.readFile("./db/db.json", "utf8", (err, data) =>{
    if (err) throw err;
    res.send(JSON.parse(data))
  })
})

// GET: notes.html
router.get("/notes", (req, res) => {
  res.send(notes)
});

// GET: index.html
router.get("/*", (req, res) => {
  res.send(index)
});


module.exports = router;
