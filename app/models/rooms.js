'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room = new Schema({
    id:String,
    history:[{
        who:String,
        what:String,
        when:String
    }]
});

module.exports = mongoose.model('Room',Room)