const servicios = require('../../Services/Posts/servicios.posts.js');
exports = (module.exports = {});

exports.CreatePost = ({body,Autentica},res)=>{
    servicios.create(body,{IdUsuario:1}).then(Response=>{
        res.json(Response);
    }).catch(err=>{
        console.log(err);
        res.json(err);
    })
}
/**
 * 
 */
exports.UpdatePost = ({body},res)=>{
    servicios.update(body,{IdUsuario:1}).then(Response=>{
        res.json(Response);
    }).catch(err=>{
        console.log(err);
        res.json(err);
    })
}
/**
 * 
 */
exports.DeletePost = ({body},res)=>{
    servicios.delete(body).then(Response=>{
        res.json(Response);
    }).catch(err=>{
        console.log(err);
        res.json(err);
    })
}
/**
 * 
 */
exports.GetPost = ({Autentica},res)=>{
    servicios.get({IdUsuario:1}).then(Response=>{
        res.json(Response);
    }).catch(err=>{
        console.log(err);
        res.json(err);
    })
}
/**
 * 
 */
exports.getOnePost = ({params},res)=>{
    servicios.getOnePost(params).then(response=>{
        res.json(response);
    }).catch(err=>{
        res.json(err);
    })
}