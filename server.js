var express = require('express'),
    app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
var db = require('./models')

app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})
app.use(express.static('public'));
app.use(express.static(__dirname + '/views'));


app.get('/', function homepage(req, res){
  console.log('in the homepage fn!')
  res.status(200).render('index')

})

app.get('/api', function showApi(req, res){
  var myApi = {
    message: 'here is my cool api!',
    endpoints: [
      {method: 'GET', path: '/api', description: 'Describes all available endpoints'},
      {method: 'GET', path: '/api/profile', description: 'gives my developer profile info'},
      {method: 'POST', path: 'api/food', description: 'create a new fav food'},
      {method: 'PUT', path: 'api/food/:id', description: 'update a specific food'},
      {method: 'DELETE', path: 'api/food/:id', description: 'delete a food'}
    ]
  }
  res.json({myApi})
})

app.get('/api/profile', function myProfile(req, res){
  var profile = {
    message: 'hello there!',
    name: 'Stephanie Snopek',
    github: 'https://github.com/snopeks'
  }
  res.json({profile})
})

app.get('/api/food', function favFoods(req, res){
  db.Food.find().exec(function getAllFood(err, allFood){
    if(err){
      return console.log('there was an error!', err)
    } else {
      res.json(allFood)
    }
  })
})
app.post('/api/food', function addFood(req, res){
  console.log(req.body)
  db.Food.create({
    name: req.body.name,
    ingredients: req.body.ingredients,
    countryOfOrigin: req.body.countryOfOrigin,
    recipeUrl: req.body.recipeUrl,
    rating: req.body.rating
  }, function(err, succ){
    if(err){
      console.log("there was an error creating your food", err)
    } else {
      console.log("created food", succ)
      res.json(succ)
    }
  })
  // res.redirect('/')
})

app.put('/api/food/:id', function editFood(req, res){
  console.log("food edit!", req.params);
  console.log('body is ', req.body);
  var foodId = req.params.id;
  db.Food.findOneAndUpdate({ _id: foodId }, req.body, {new: true})
    .exec(function(err, updatedFood){
      console.log(updatedFood)
      res.json(updatedFood)
    });
})

app.delete('/api/food/:id', function deleteFood(req, res){
  console.log('this is your req.params.id', req.params.id)
  var foodId = req.params.id
  db.Food.findOneAndRemove({_id: foodId}, function(err, deletedFood){
    res.json(deletedFood)
  })

})
app.listen(process.env.PORT || 3000, function(){
  console.log("express server is up and running on http://localhost:3000/")
});