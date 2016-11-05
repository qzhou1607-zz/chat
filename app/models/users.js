'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    github:{
        id:String,
        displayName:String,
        userName:String,
        publicRepos:Number
    },
    google:{
        id:String,
        token:String,
        name:String,
        email:String
    },
    isOnline:Boolean
});

module.exports = mongoose.model('User',User)