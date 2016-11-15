'use strict';


var path = process.cwd();
var RoomHandler = require(path + '/app/controllers/roomHandler.server.js');
var UserHandler = require(path + '/app/controllers/userHandler.server.js');
var MessageHandler = require(path + '/app/controllers/messageHandler.server.js');

//var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');

module.exports = function(app,passport) {
    var messageHandler = new MessageHandler();
    var userHandler = new UserHandler();
    var roomHandler = new RoomHandler();
    
    function isLoggedIn(req,res,next) {
        if(req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/login');
        }
    }
//     app.route('/')
// 		.get(function (req, res) {
// 			res.sendFile(path + '/client/index.html');
// 		});
// 	app.route('rooms/:id')
// 	    .get(roomHandler.getHistory);

    
    app.route('/')
        .get(isLoggedIn,function(req, res){
            res.sendFile(path + '/client/index.html');
        });
        
    //retrieve current user information
    app.route('/user')
        .get(isLoggedIn, userHandler.getUsrInfo);
    //rooms
    app.route('/rooms')
        // .get(isLoggedIn,function(req,res) {
        //     res.sendFile(path + '/client/rooms.html');
        // })
        .get(isLoggedIn,roomHandler.getRooms)
        .post(isLoggedIn, roomHandler.addRoom);
    //message
    app.route('/message')
        .get(isLoggedIn, messageHandler.getMessages)
        .post(isLoggedIn, messageHandler.addMessage)
        //.delete(isLoggedIn, clickHandler.resetClicks);        
    
        
    app.route('/login')
        .get(function(req,res) {
            res.sendFile(path + '/client/login.html');
        });
        
    app.route('/logout')
        .get(function(req,res) {
            req.logout();
            res.redirect('/login');
        });
        
    // app.route('/profile')
    //     .get(isLoggedIn, function(req,res) {
    //         res.sendFile(path.join(__dirname,'../../public/profile.html'));
    //     });
    // app.route('/api/:id')
    //     .get(isLoggedIn, function(req,res) {
    //         res.json(req.user.github);
    //     });
        
    app.route('/auth/google')
        .get(passport.authenticate('google',{ scope : ['profile', 'email'] }));
        
    app.route('/auth/google/callback')
        .get(passport.authenticate('google', {
            successRedirect:'/',
            failureRedirect:'/login'
        }));
        
    // var clickHandler = new ClickHandler();
    
    // app.route('/api/:id/clicks')
    //     .get(isLoggedIn, clickHandler.getClicks)
    //     .post(isLoggedIn, clickHandler.addClick)
    //     .delete(isLoggedIn, clickHandler.resetClicks);        
    
}

// module.exports = function (app) {

// 	//var clickHandler = clickHandler || new ClickHandler();

// 	app.route('/')
// 		.get(function (req, res) {
// 			res.sendFile(path + '/client/index.html');
// 		});

// // 	app.route('/api/stocks')
// // 		.get(clickHandler.getStocks);
		
// // 	app.route('/api/stocks/:id')
// // 		.post(clickHandler.addStock)
// // 		.delete(clickHandler.removeStock)
// // 		.put(clickHandler.updateStock)
//  };
