var express = require('express'),
    app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}));
// var db = require('./models')

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
      {method: 'POST', path: 'api/foods', description: 'create a new fav food'}
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

app.listen(process.env.PORT || 3000, function(){
  console.log("express server is up and running on http://localhost:3000/")
});