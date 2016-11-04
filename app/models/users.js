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
    isOnline:Boolean
});

module.exports = mongoose.model('User',User)