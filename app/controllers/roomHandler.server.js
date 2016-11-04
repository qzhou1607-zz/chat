'use strict';
var path = require('path');
var Users = require('../models/users.js');
var Rooms = require('../models/rooms.js');

function roomHandler () {
    //get chat history in a specific room
    this.getHistory = function(req,res) {
        var roomId = req.params.id;
        Users.findOne({'id':roomId},{'_id':false})
                .exec( function(err,result) {
                    if(err) {
                        throw err;
                    } 
                    if (result) {
                         res.json(result.history);
                    } 
                    
                })
    }
    
    // this.addClick = function(req,res) {
    //     Users.findOneAndUpdate({'github.id':req.user.github.id},{$inc:{'nbrClicks.clicks':1}})
    //     .exec(
    //         function(err,result) {
    //             if(err) { throw err; }
    //             res.json(result.nbrClicks);
    //         }
    //     );
    // }
    // this.resetClicks = function(req,res) {
    //     Users.findOneAndUpdate({'github.id':req.user.github.id},{'nbrClicks.clicks':0})
    //     .exec(
    //         function(err,result) {
    //             if(err) { throw err; }
    //             res.json(result.nbrClicks);
    //         }
    //     );
    // }
}
module.exports = roomHandler;