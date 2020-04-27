const jwt = require('jwt-simple');
const palabraSecreta = 'gatito';

exports = (module.exports = {});
let databaseUsers = {
    'Yahir' : {
        Id: 1,
        Password: 'YahirPassword',
        Correo: 'yahir@correo.com',
        Nombre: 'Yahir Axel Keymurth'
    },
    'Jefferson' : {
        Id: 2,
        Password: 'JeffersonPassword',
        Correo: 'jefferson@correo.com',
        Nombre: 'Jefferson Leon'
    }
}
exports.signinUser = (User = '',Password = '',Token = '') => new Promise((resolve)=>{
    let Status = {
        status:true,
        data: {
            loggued:false
        },
        notification:{
            'msg': '',
            typeNotify: 'success'
        }
    }
    if(Token.length === 0){
        if(databaseUsers[User] !== undefined){
            let {Password : PasswordOfDatabase,Correo,Nombre} = databaseUsers[User];
            if(PasswordOfDatabase === Password){
                Status.data.loggued = true;
                Status.data.User = User;
                Status.data.Correo = Correo;
                Status.data.Nombre = Nombre;
                Status.notification.msg = 'Usuario Logueado Correctamente';
                let Token = jwt.encode(Status.data,palabraSecreta);
                Status.data.Cookie = Token;
                resolve(Status)
            }else{
                Status.notification.msg = 'El usuario o la contraseña pueden ser incorrectos.';
                Status.notification.typeNotify = 'warning';
                resolve(Status);
            }
        }else{
            Status.notification.msg = 'El usuario no existe';
            Status.notification.typeNotify = 'warning';
            resolve(Status);
        }
    }else{
        let Data = jwt.decode(Token,palabraSecreta);
        const {User,Correo,Nombre} = Data;
        if(databaseUsers[User] !== undefined){
            Status.data.loggued = true;
            Status.data.User = User;
            Status.data.Correo = Correo;
            Status.data.Nombre = Nombre;
        }else{
            Status.notification.msg = 'No hay usuario logueado';
        }
        resolve(Status);
    }
})