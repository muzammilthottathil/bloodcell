const db = require('./mysqlConnection');
const bcrypt = require('bcrypt');



module.exports = {
    addUser : (username, password) => {

        // let username = req.body.username;
        // let password = req.body.password;
    
    
        bcrypt.hash(password, 10, (err, hash) => {
            if(err) {
                console.log(err);
                return;
            }
            password = hash;
    
            let registerUserQuery = `INSERT INTO users (user_name, password, admin) VALUES(?, ?, ?)`
            let values = [username, password, false];
            db.query(registerUserQuery, values, (err, rows, fields) => {
                if(err) {
                    // res.status(500).send(err);
                    console.log(err);
                    return;
                }
                console.log('User added succefully');
                // res.redirect('/login');
            })
        })
    }
}