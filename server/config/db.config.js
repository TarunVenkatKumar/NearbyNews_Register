const mysql = require('mysql2');

// create here mysql connection

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tarun@123',
    database: 'news'
});

dbConn.connect(function(error){
    if(error) throw error;
    console.log('Database Connected Successfully!!!');
})

module.exports = dbConn;