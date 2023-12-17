const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const LoginCollections = require("./mongodb");
const Appointmentcollections = require("./appointment");
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

    //signup
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }
    await LoginCollections.insertMany([data])
    res.redirect("/home")

});


app.get("/home", (req, res) => {
    res.render("home")
})


app.get("/signup", (req, res) => {
    res.render("signup")
});

//appointment form
app.post("/appointment", async (req, res) => {

    try{
        const data = {
            name: req.body.name,
            number: req.body.number,
            email: req.body.email,
            date: req.body.date
        }
        await Appointmentcollections.insertMany([data])
        res.redirect("/home")
        console.log( "Appointment added successfully")
        } catch(e) {
            console.log("Appointment error", e.message)
    }
});




//login
app.post("/login", async (req, res) => {
    try{
        const check = await LoginCollections.findOne({name:req.body.username})
        const password = req.body.password
        if(check.password == password){
            res.redirect("/home")
        } else {
            console.log("Invalid username or password")
            res.redirect("/")
        }
    } catch(e) {
        console.log("Login error", e.message)
    }
});