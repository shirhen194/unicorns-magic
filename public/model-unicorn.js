var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//design the two schema below and use sub docs 
//to define the relationship between posts and comments

let unicornSchema = new mongoose.Schema({
    name: String,
    magic: String
});

let Unicorn = mongoose.model('unicorn', unicornSchema)

module.exports = Unicorn