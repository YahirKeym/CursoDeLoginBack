const Auth = require('./Auth/index.js');
const Posts = require('./Posts/index.js');
module.exports = function(App){
    Auth(App);
    Posts(App);
}