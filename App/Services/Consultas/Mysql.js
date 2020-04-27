const Mysql = require('../Connections/mysql.js');

module.exports = (QUERY)=> new Promise((resolve,reject)=>{
    Mysql().then(connection=>{
        connection.query(QUERY,(err,results,fields)=>{
            if(err) reject(err);
            resolve(results);
        })
    }).catch(err=>{
        console.log(err);
        reject(err);
    });
})