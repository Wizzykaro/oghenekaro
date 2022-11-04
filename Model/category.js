// require mongoose
const mongoose = require('mongoose');

// create a new schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    image: {
        type:String,
        required:true
    }
}, {timestamps:true});

// create a model
const Category = mongoose.model('category', categorySchema);

// export model
module.exports = Category;