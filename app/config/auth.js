module.exports = {

    // 'facebookAuth' : {
    //     'clientID'      : 'your-secret-clientID-here', // your App ID
    //     'clientSecret'  : 'your-client-secret-here', // your App Secret
    //     'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    // },

    // 'twitterAuth' : {
    //     'consumerKey'       : 'your-consumer-key-here',
    //     'consumerSecret'    : 'your-client-secret-here',
    //     'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    // },

    'googleAuth' : {
        'clientID'      : process.env.GOOGLE_AUTH_KEY,
        'clientSecret'  : process.env.GOOGLE_AUTH_SECRET,
        'callbackURL'   : process.env.GOOGLE_AUTH_CALLBACK
    }

};