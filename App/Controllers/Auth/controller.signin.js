const servicios = require('../../Services/Auth/service.signin.js');
exports = (module.exports = {});

exports.SigninUser = ({body,query},res)=>{
    const {Token} = query;
    const {User,Password} = body;
    servicios.signinUser(User,Password,Token).then(Response=>{
        res.json(Response);
    }).catch(err=>{
        console.log(err);
        res.json({err:'Hubo un error en la app'})
    });

}