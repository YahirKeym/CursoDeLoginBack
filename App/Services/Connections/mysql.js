const MYSQL = require('mysql2/promise');

module.exports = () => {
    let AjustesConnect = {
        host: '127.0.0.1',
        user: 'root',
        password:'Password123',
        database: 'proyectofacebook'
    }
    return MYSQL.createConnection(AjustesConnect);
}