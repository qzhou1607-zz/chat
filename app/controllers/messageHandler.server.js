'use strict';
var path = require('path');
var Users = require('../models/users.js');
var Rooms = require('../models/rooms.js');


function messageHandler () {
    //get chat history in a specific room
    this.getMessages = function(req,res) {
        var currentRoomName = req.query.currentRoomName;
        Rooms.findOne({'name':currentRoomName},{'_id':false})
                .exec( function(err,result) {
                    if(err) {
                        throw err;
                    } 
                    if (result) {
                         res.json(result.history);
                    } 
                    
                })
    }
    
    this.addMessage = function(req,res) {
        var currentRoomName = req.body.currentRoomName;
        var newMessage = {
            id:req.user.google.id,
            name:req.user.google.name,
            content:req.body.message,
            time:new Date()
        };
        //insert a new one if not found
        var options = { upsert: true, new: true, setDefaultsOnInsert: true };
        var update = { $push: { history: newMessage }};
        Rooms
            .findOneAndUpdate({'name':currentRoomName}, update, options)
            .exec(
                function(err,room) {
                    if(err) { throw err };
                    res.json(room);
                }
            );
        
    };
    
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
module.exports = messageHandler;