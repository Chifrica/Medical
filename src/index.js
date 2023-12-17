const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb");
app.use(express.urlencoded({ extended: false }));

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.use(express.json())

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../templates"))

app.listen(3000, () => {
  console.log("Server is listening on port 3000")
})

app.get("/", (req, res) => {
    res.render("login")
    })

app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }
    await collection.insertMany([data])
    res.redirect("/home")

});

app.post("/login", async (req, res) => {

    try{
        const check = await collection.findOne({name:req.body.username})

        if(check.password == req.body.password){
            res.redirect("/home")
        } else {
            req.flash("error", "Invalid username or password")
            res.redirect("/")
        }
    } catch(e) {
        req.flash("error", "Invalid details")
    }
});

app.get("/home", (req, res) => {
    res.render("home")
})


app.get("/signup", (req, res) => {
    res.render("signup")
})
    