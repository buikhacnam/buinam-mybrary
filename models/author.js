const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Author', authorSchema);


//meanwhile at mongo db:
// _id: 6003d002e1c501001517ba7a
// name: "nam"
// __v: 0

// _id: 6003d00de1c501001517ba7c
// name: "bui"
// __v: 0