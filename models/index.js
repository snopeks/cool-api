var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cool-api-development')
module.exports.Food = require('./Food.js')