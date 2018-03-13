var db = require('./models')


var food_list = [
  {
    name: 'Crepes',
    ingredients: 'flour, eggs, milk, salt, oil, vanilla',
    countryOfOrigin: 'France',
    recipeUrl: 'https://www.allrecipes.com/recipe/19037/dessert-crepes/',
    rating: 10
  },
  {
    name: 'Pad Thai',
    ingredients: 'beansprouts, eggs, milk, salt, oil, rice noodles, cilantro, lemon, fish sauce, sugar, white wine vinegar, peanuts, tofu',
    countryOfOrigin: 'Thailand',
    recipeUrl: 'https://www.allrecipes.com/recipe/42968/pad-thai/',
    rating: 9
  },
  {
    name: 'Fried Rice',
    ingredients: 'rice, eggs, carrots, salt, oil, peas, soy sauce',
    countryOfOrigin: 'China',
    recipeUrl: 'https://www.allrecipes.com/recipe/79543/fried-rice-restaurant-style',
    rating: 8
  },
  {
    name: 'Sushi',
    ingredients: 'rice, fish, seaweed, sesame seeds, assorted vegetables',
    countryOfOrigin: 'Japan',
    recipeUrl: 'https://www.allrecipes.com/recipe/24228/sushi-roll/',
    rating: 10
  }
]

db.Food.remove({}, function(err, food){
  if(err){
    console.log('there was an error on removal!', err)
  } else {
    console.log('removed all foods')
    db.Food.create(food_list, function(err, foods){
      if(err){
        return console.log('err creating foods', err )
      } else {
        console.log("created", foods.length, "foods");
        process.exit();
      }
    });
  }
});
