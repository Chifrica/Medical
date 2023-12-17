const mongoose = require('mongoose');

const dburi = "mongodb+srv://comon928:test123@cluster2.e6gjnqj.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dburi).then(() => {
    console.log("Connected to MongoDB")
}).catch((e) => {
    console.log("Error while connecting to MongoDB")
    console.log(e)
}); 


//appointment
const AppointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // trim: true
    },
    number: {
        type: Number,
        required: true,
        // trim: true
    },
    email: {
        type: String,
        required: true,
        // trim: true
    },
    date: {
        type: String,
        required: true,
        // trim: true
    },

})

const Appointmentcollections = new mongoose.model('Appointmentcollections', AppointmentSchema)

module.exports = Appointmentcollections