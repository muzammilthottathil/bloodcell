const db = require('../mysqlConnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {

    getLoginPage : (req, res) => {
        res.render('login.ejs', {
            title : "Login",
            message : ""
        })
    },


    loginUser : (req, res) => {
        // res.send('user logged in successfully');
        let username = req.body.username;
        let password = req.body.password;

        // console.log(req.body);
        let getUserQuery = `SELECT * FROM users WHERE user_name = '${username}'`;
        db.query(getUserQuery, (err, rows, fields) => {

            if(err) {
                res.send(err);
                return;
            }

            if(rows.length === 0) {
                res.render('login.ejs',{
                    title : 'Login',
                    //Change begins here 
                    message : 'Invalid Email !!!'
                    //Change ends here
                })
                return;
            }

            let user = rows[0];
            bcrypt.compare(password, user.password, (err, match) => {

                if(err) {
                    console.log(err);
                    res.status(200).send(err);
                    return;
                }
                
                if(match) {
                    jwt.sign({ username : username, admin : user.admin }, process.env.JWT_SECRET_KEY, { expiresIn : "3600s" }, (err, token) => {
                        if(err) {
                            console.log(err);
                            res.status(300).send(err);
                            return;
                        }

                        res.cookie('token', token, {
                            expiresIn: "3600s",
                            secure: false, // set to true if your using https
                            httpOnly: true,
                        })
                        
                        // console.log('login succesful');
                        // res.redirect('/faculty/' + user.faculty_id);
                        if(user.admin) {
                            res.render('adminHome.ejs', {
                                title : 'Home',
                                username : 'Nss'
                            })
                        }
                        else {
                            res.render('studentHome.ejs', {
                                title : 'Home',
                                username : user.user_name
                            })
                        }
                    })
                } else {
                    // res.redirect('/login');
                    res.render('login.ejs',{
                        title : 'Login',
                        //Change begins here 
                        message : 'Incorrect Password !!!'
                        //Change ends here
                    })
                    return;
                }
            })
        })

    },

    getAdminHomePage : (req, res) => {
        res.render('adminHome.ejs', {
            title : 'Home',
            username : 'Nss'
        })
    },

    addAdmin : (req, res) => {

        let username = req.body.username;
        let password = req.body.password;


        bcrypt.hash(password, 10, (err, hash) => {
            if(err) {
                console.log(err);
                return;
            }
            password = hash;

            let registerUserQuery = `INSERT INTO users (user_name, password, admin) VALUES(?, ?, ?)`
            let values = [username, password, true];
            db.query(registerUserQuery, values, (err, rows, fields) => {
                if(err) {
                    res.status(500).send(err);
                    return;
                }
                console.log('Admin added succefully');
                res.redirect('/login');
            })
        })
    },

    
}