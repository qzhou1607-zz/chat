'use strict';
var path = require('path');
var Users = require('../models/users.js');

function userHandler () {
    this.getUsrInfo = function(req,res) {
        console.log(req.user.google.id);
        Users.findOne({'google.id':req.user.google.id},{'_id':false})
                .exec( function(err,result) {
                    if(err) {
                        throw err;
                    } 
                    if (result) {
                        //console.log(result);
                        res.json(result);
                        //  res.json({
                        //      name:result.google.name,
                        //      email:result.google.email
                        //  });
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
module.exports = userHandler;