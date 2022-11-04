const { modelName, create } = require('../Model/Category');
const category = require('../Model/Category');
const Recipe = require('../Model/Recipe');

// using async & await
const homepage = async(req,res)=>{
    
    try{
        const number = 5;
        // for categories
        const categories = await category.find().limit(number);
        // latest recipes
        const latestRecipes = await Recipe.find().sort({createdAt: -1}).limit(number);
        // for soup only
        const soup = await Recipe.find({category:'SOUP'}).sort({createdAt: -1}).limit(number);
        // for beans only
        const beans = await Recipe.find({category:'BEANS'}).sort({createdAt: -1}).limit(number);
        // for rice only
        const rice = await Recipe.find({category:'RICE'}).sort({createdAt: -1}).limit(number);
        // for porridge only
        const porridge = await Recipe.find({category:'PORRIDGE'}).sort({createdAt: -1}).limit(number);
        // for Snacks only
        const snacks = await Recipe.find({category:'SNACKS'}).sort({createdAt: -1}).limit(number);
        
        res.render('index', {title: 'home-page', categories, latestRecipes, soup, beans, rice, porridge, snacks});
    }

    catch(err){
        console.log(err);
    }
    
}





// using promises
// const homepage = (req, res)=>{
//     category.find()
//     .then((categories)=>{
//         res.render('index', {title: 'home-page',
//     categories});
//     })

//     .catch((err)=>{
//         console.log(err);
//     })
    
// }

// get all categories

const allCategories = async(req, res)=>{
  try{
      // for each categories
      const categories = await category.find();
      res.render('category', {title: 'All-Categories', categories});
  }
  catch(err){
    console.log(err)
  }

}
// get all recipes
const allrecipes = async(req, res)=>{
    try {
       // for each recipe
        const recipes = await Recipe.find();
        res.render('recipe', {title: 'All-Categories', recipes}); 
    } 
    catch (err) {
        console.log(err)
    }

}

const getCategoryContent = async(req, res)=>{
    try{
        const cate_Name = req.params.cateName;
        const matchingRecipes = await Recipe.find({category: cate_Name});
        // res.json(matchingRecipes)
        res.render('getCategory', {title: 'recipes', matchingRecipes});
    }
    
    catch(err){
        console.log(err)
    }
}

const getRecipeDetails = async(req,res)=>{
    try {
        const id = req.params.id;
        const details = await Recipe.findById(id);
        // res.json(details);
        res.render('recipeDetails', {title: 'recipe details', details});
    } catch (err) {
        console.log(err)
    }
}
 
const searchRecipe = async(req,res)=>{
    try{
        let searcHRecipe = req.body.search;
        // use the name attribute
        const searcHRecipeCol = await Recipe.find(
            { $text: {$search: searcHRecipe, $diacriticSensitive: true }})
            // res.json(searcHRecipe)
        res.render('search', {title: 'search_result', searcHRecipeCol })
    }
    catch (err){
        console.log(err);
    }
}
const getSubmitRecipe = async(req,res)=>{
    try{
        res.render('submitForm', {title: 'submit_recipe'} )
    }
    catch (err){
        console.log(err)
    }
}


const postSubmitRecipe = async (req,res)=>{
    let theImage;
    let uploadPath;
    let newImageName;
    if(!req.files || Object.keys(req.files).length === 0)
    {
        console.log('no file to upload')
    } else{
        theImage = req.files.image;
        newImageName = theImage.name;
        uploadPath = require('path').resolve('./') + '/public/imgs_recipe' + newImageName;

        theImage.mv(uploadPath, function(err){
            if(err){
                console.log(err)
            }
        })
    }
        try{
        const newRecipe = new Recipe({
            'name':req.body.recipeName,
            'email':req.body.email,
            'description':req.body.description,
            'category':req.body.category,
            'ingredient':req.body.ingredients,
            'image': newImageName,
        })

        await newRecipe.save();
        res.redirect('/submitRecipe');
    }
    catch(err){
        console.log(err)
    }
    
}
    

const getEditForm = async(req,res)=>{

    const id = req.params.id;
    const toBeEditedRecipe = await Recipe.findById(id);
    res.render('update', {title: 'update_recipe', toBeEditedRecipe})
}

const editRecipe = async(req,res)=>{
    let theImage;
    let uploadPath;
    let newImageName;
    if(!req.files || Object.keys(req.files).length === 0)
    {
        console.log('no file to upload')
    } else{
        theImage = req.files.image;
        newImageName = theImage.name;
        uploadPath = require('path').resolve('./') + '/public/imgs_recipe' + newImageName;

        theImage.mv(uploadPath, function(err){
            if(err){
                console.log(err)
            }
        })
    }

    try{
        let id = req.params.id
        const edit_recipe = await Recipe.findByIdAndUpdate(id);
        edit_recipe.name = req.body.recipeName;
        edit_recipe.description = req.body.description;
        edit_recipe.ingredients = req.body.ingredients;
        edit_recipe.category = req.body.category;
        edit_recipe.email = req.body.email;
        
        await edit_recipe.save();
        res.redirect(`/recipeDetails/${edit_recipe._id}`);
        // res.json(edit_recipe)

    }
    catch(err){
        console.log(err)
    }

}

const deleteRecipe = async(req,res)=>{
    let id = req.params.id
    await Recipe.findByIdAndDelete(id);
    res.redirect('/recipes');
}


module.exports = {
    homepage,
    allCategories,
    allrecipes,
    getCategoryContent,
    searchRecipe,
    getSubmitRecipe,
    postSubmitRecipe,
    getRecipeDetails,
    getEditForm,
    editRecipe,
    deleteRecipe
    
}

// insert category

// const insertCategories = (req,res)=>{
//     category.insertMany([
//         {
//         'name': 'soup',
//         'image': 'soup.jpg'
//         },
//         {
//             'name': 'beans',
//             'image': 'beans.jpg'
//         },
//         {
//             'name': 'rice',
//             'image': 'rice.jpg'
//         },
//         {
//             'name': 'snacks',
//             'image': 'snacks.jpg'
//         },
//         {
//             'name': 'porridge',
//             'image': 'porridge.jpg'
//         },
// ])
// };

// insertCategories();

// const insertRecipe = async(req,res)=>{
//     try{
//         await Recipe.insertMany(
//         [

//             {
//                 'name': 'Banga Soup',
//                 'description': 'made with palm fruit',
//                 'ingredients': ['banga oil','pepper',],
//                 'category': 'SOUP',
//                 'image': 'Food6.jpg',
//                 'email': 'karo@gmail.com'
//               },
          
//           {
//             'name': 'Fried Beans',
//             'description': 'Beans fried with oil,tomatoes and pepper',
//             'ingredients': ['Beans', 'oil','pepper','tomatoes'],
//             'category': 'BEANS',
//             'image': 'Food7.jpg',
//             'email': 'karo@gmail.com'
//           },
//           {
//             'name': 'jollof rice',
//             'description': 'rice made with tomatoes and pepper',
//             'ingredients': ['ginger', 'garlic','pepper','tomatoes'],
//             'category': 'RICE',
//             'image': 'Food8.jpg',
//             'email': 'wizzy@gmail.com'
//           },
//           {
//             'name': 'Egg Roll',
//             'description': 'made with flour and egg',
//             'ingredients': ['flour', 'egg', 'sugar'],
//             'category': 'SNACKS',
//             'image': 'Food9.jpg',
//             'email': 'maro@gmail.com'
//           },
//           {
//             'name': 'Yam Porridge',
//             'description': 'made with oil',
//             'ingredients': ['Beans', 'oil','pepper','tomatoes'],
//             'category': 'PORRIDGE',
//             'image': 'Food10.jpg',
//             'email': 'Taro@gmail.com'
//           },
//         ]   
//     )
//     }
//     catch(err){
//         console.log(`error occured ${err}`)
//     }

//     insertRecipe();



