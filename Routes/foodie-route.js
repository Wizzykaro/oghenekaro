const express = require('express');
const router = express.Router();
const foodieController = require('../controller/foodie-controller')



router.get('/', foodieController.homepage);
router.get('/categories', foodieController.allCategories);
router.get('/recipes', foodieController.allrecipes);
// get recipe content
router.get('/recipes/:cateName', foodieController.getCategoryContent);
// get recipe details
router.get('/recipesDatails/:id', foodieController.getRecipeDetails);
// search recipe
router.post('/search', foodieController.searchRecipe);
// get submit form
router.get('/submitRecipe', foodieController.getSubmitRecipe);
// post submit form
router.post('/submitRecipe', foodieController.postSubmitRecipe);
// TO GET EDIT RECIPE
router.get('/editRecipe/:id', foodieController.getEditForm)
// TO EDIT RECIPE
router.put('/editRecipe/:id', foodieController.editRecipe)

router.delete('/deleteRecipe/:id', foodieController.deleteRecipe)






module.exports = router
