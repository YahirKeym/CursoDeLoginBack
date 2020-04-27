const controller = require('../../Controllers/posts/controller.posts.js');
module.exports = function(app){
    app.get('/get/posts',controller.GetPost);
    app.get('/get/onePost/:IdPost',controller.getOnePost);

    app.post('/create/posts',controller.CreatePost);
    app.patch('/update/posts',controller.UpdatePost);
    app.delete('/delete/posts',controller.DeletePost);
}