const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const foodieRoutes = require('./Routes/foodie-route');
const app = express();
const methodOverride = require('method-override')


//use expressLayouts
app.use(expressLayouts)
app.set('layout', "./myLayouts/main-layout");

//  connect to Db
const dbURI = 'mongodb+srv://karry29:Wisdom....1@karry29.upcamff.mongodb.net/FoodRecipe?retryWrites=true&w=majority'

mongoose.connect(dbURI)
.then(()=>{
    console.log('connected to db');
})

.catch((err)=>{
    console.log(err)
})

// use file Upload
app.use(fileUpload());

// use express urlencoded
app.use(express.urlencoded ({ extended: true }));

// use public folder
app.use(express.static('public'));

// set view engin
app.set('view engine', 'ejs')

app.use(methodOverride('_method'))

// food recipe route
app.use(foodieRoutes)




app.listen(3000, ()=>{
    console.log('listening to request at port 3000');
})
