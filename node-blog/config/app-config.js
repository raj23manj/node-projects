// one more way
// https://stackoverflow.com/questions/8332333/node-js-setting-up-environment-specific-configs-to-be-used-with-everyauth
//var Config = require('./conf'),
//    conf = new Config();
// conf.twitter.consumerKey
module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'development':
            return {dev setting};

        case 'test':
            return {prod settings};

        default:
            return {error or other settings};
    }
};
