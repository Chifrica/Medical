const mongoose = require('mongoose');

const dburi = "mongodb+srv://comon928:test123@cluster2.e6gjnqj.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dburi).then(() => {
    console.log("Connected to MongoDB")
}).catch((e) => {
    console.log("Error while connecting to MongoDB")
    console.log(e)
}); 

// const Login = mongoose.model('Login', LoginSchema)

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // trim: true
    },
    password: {
        type: String,
        required: false,
        // trim: true
    }
})

const LoginCollections = new mongoose.model('LoginCollections', LoginSchema)

module.exports = LoginCollections


