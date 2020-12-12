const router = require("express").Router();
const fs = require("fs")
const index = fs.readFileSync("./public/index.html", "utf8")
const notes = fs.readFileSync("./public/notes.html", "utf8")
// const savedNotes = fs.readFile("./db/db.json", "utf8", (err, data) =>{
//   if (err) throw err;
//   res.json(data)
// })

router.get("/", (req, res) => {
  res.json({
    msg: "success",
  });
});

router.get("/api/notes", (req,res) =>{
  fs.readFile("./db/db.json", "utf8", (err, data) =>{
    if (err) throw err;
    res.json(data)
  })
})

router.get("/notes", (req, res) => {
  res.json(notes)
});

router.get("/*", (req, res) => {
  res.json(index)
});

module.exports = router;
