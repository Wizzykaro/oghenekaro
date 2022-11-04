const toggler = document.querySelector('.toggler')
const navbarlinks = document.querySelector('.nav-links')
const navbarSearch = document.querySelector('input[type = "search"]');

toggler.addEventListener('click', ()=>{
    navbarlinks.classList.toggle('active')
    navbarSearch.classList.toggle('active')
})

// clone the ingredients div
const ingredients_list = document.querySelector('#ingredients_lists');
const ingredientDiv = document.querySelector('.ingredientDiv');
const ingredient_btn = document.querySelector('#ingredients_btn');

ingredient_btn.addEventListener('click', () =>{
    const newIngredientInput = ingredientDiv.cloneNode(true);
    ingredients_list.appendChild(newIngredientInput);
    newIngredientInput.querySelector('input').value = ''
})
