const controller = require('../../Controllers/Auth/controller.signin.js');
module.exports = function(app){
    app.get('/signin',controller.SigninUser);
    app.post('/signin',controller.SigninUser);
}