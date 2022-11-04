const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients:{
        type: Array,
        required: true
    },
    category: {
        type: String,
        enum: ['SOUP', 'RICE', 'BEANS', 'SNACKS', 'PORRIDGE'],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },

}, {timestamps: true});

const Recipe = mongoose.model('recipe', recipeSchema)

module.exports = Recipe