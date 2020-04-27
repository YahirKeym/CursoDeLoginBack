const Mysql = require('../Consultas/Mysql.js');
exports = (module.exports = {});
const TABLAPOST = 'proyectofacebook.proyecto_posts';
/**
 * 
 */
const HoraDeCreacionParaMysql = ()=>{
    let Fecha = new Date();
    let Year = Fecha.getUTCFullYear();
    let Month = Fecha.getUTCMonth();
    let Day = Fecha.getUTCDate();
    let Hour = Fecha.getUTCHours();
    let Minutes = Fecha.getUTCMinutes();
    let Seconds = Fecha.getUTCSeconds();
    return `${Year}/${Month}/${Day-1} ${Hour}:${Minutes}:${Seconds}`;
}
/**
 * 
 */
exports.create = ({Titulo,Contenido},{IdUsuario}) => new Promise((resolve,reject)=>{
    let Status = {
        status:true,
        notification:{
            msg:'',
            typeNotify: 'success'
        }
    }
    const QUERYCreatePost = `
        INSERT INTO ${TABLAPOST} (Titulo,Contenido,HoraDeCreacion,IdUsuario)
        VALUES ('${Titulo}','${Contenido}','${HoraDeCreacionParaMysql()}','${IdUsuario}')
    `
    Mysql(QUERYCreatePost).then(({insertId})=>{
        if(insertId !== undefined && insertId > 0){
            Status['notification'].msg = 'Se inserto de manera correcta el post';
        }else{
            Status['notification'].msg = 'Hubo un error al insertar el post';
            Status['notification'].typeNotify = 'warning';
        }
        resolve(Status);
    }).catch(err=>{
        console.log(err);
        Status['notification'].msg = 'Hubo un error al hacer la petición';
        Status['notification'].typeNotify = 'danger';
        reject(Status);
    })
})
/**
 * 
 */
exports.update = ({IdPosts,Titulo,Contenido}) => new Promise((resolve,reject)=>{
    let Status = {
        status:true,
        notification:{
            msg:'',
            typeNotify: 'success'
        }
    }
    const QUERYCreatePost = `
        UPDATE ${TABLAPOST} SET Titulo='${Titulo}', Contenido='${Contenido}' WHERE IdProyectoPost='${IdPosts}' 
    `
    Mysql(QUERYCreatePost).then(({affectedRows})=>{
        if(affectedRows > 0){
            Status['notification'].msg = 'Se actualizo de manera correcta el post';
        }else{
            Status['notification'].msg = 'Todo correcto pero no hubo actualización alguna';
            Status['notification'].typeNotify = 'info';
        }
        resolve(Status);
    }).catch(err=>{
        console.log(err);
        Status['notification'].msg = 'Hubo un error al intentar actualizar';
        Status['notification'].typeNotify = 'danger';
        reject({err: 'Error en la consulta'})
    })
})
/**
 * 
 */
exports.delete = ({IdPosts}) => new Promise((resolve,reject)=>{
    let Status = {
        status:true,
        notification:{
            msg:'',
            typeNotify: 'success'
        }
    }
    const QUERYCreatePost = `
        UPDATE ${TABLAPOST} SET Eliminado=1 WHERE IdProyectoPost='${IdPosts}' 
    `
    Mysql(QUERYCreatePost).then(({affectedRows})=>{
        if(affectedRows > 0){
            Status['notification'].msg = 'Se elimino de manera correcta el post';
        }else{
            Status['notification'].msg = 'Hubo un problema al eliminar el post';
            Status['notification'].typeNotify = 'warning';
        }
        resolve(Status)
    }).catch(err=>{
        Status['notification'].msg = 'Hubo un error al eliminar el post';
        Status['notification'].typeNotify = 'danger';
        reject(Status)
    })
})

/**
 * 
 */
exports.get = ({IdUsuario}) => new Promise((resolve,reject)=>{
    let Status = {
        status:true,
        notification:{
            msg:'',
            typeNotify: 'success'
        },
        data:[]
    }
    const QUERYCreatePost = `
        SELECT * FROM ${TABLAPOST} WHERE IdUsuario='${IdUsuario}' AND Eliminado=0
    `
    Mysql(QUERYCreatePost).then(async Result=>{
        let saveDatos = [];
        for await({IdProyectoPost,Titulo,Contenido,HoraDeCreacion} of Result){
            saveDatos.push({
                IdPosts: IdProyectoPost,
                Titulo:Titulo,
                Contenido:Contenido,
                HoraDeCreacion: HoraDeCreacion
            })
        }
        Status['notification'].msg = 'Los datos se trajeron correctamente';
        Status.data = saveDatos;
        resolve(Status);
    }).catch(err=>{
        console.log(err);
        Status['notification'].msg = 'Hubo un error en la consulta';
        Status['notification'].typeNotify = 'danger';
        reject(Status)
    })
})
/**
 * 
 */
exports.getOnePost = ({IdPost}) => new Promise((resolve,reject)=>{
    let Status = {
        status:true,
        notification:{
            msg:'',
            typeNotify: 'success'
        },
        data:{
            Titulo: '',
            Contenido: ''
        }
    }
    const QUERYCreatePost = `
        SELECT * FROM ${TABLAPOST} WHERE IdProyectoPost='${IdPost}' AND Eliminado=0
    `
    Mysql(QUERYCreatePost).then(async Result=>{
        let {Contenido, Titulo} = Result[0];
        Status['notification'].msg = 'Los datos se trajeron correctamente';
        Status.data = {
            Titulo:Titulo,
            Contenido: Contenido
        };
        resolve(Status);
    }).catch(err=>{
        console.log(err);
        Status['notification'].msg = 'Hubo un error en la consulta';
        Status['notification'].typeNotify = 'danger';
        reject(Status)
    })
})