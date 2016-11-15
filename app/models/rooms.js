'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room = new Schema({
    name:String,
    description:String,
    history:[{
        id:String,
        name:String,
        content:String,
        time:String
    }]
});

module.exports = mongoose.model('Room',Room)