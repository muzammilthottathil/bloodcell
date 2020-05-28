module.exports = {

    getLoginPage : (req, res) => {
        res.render('login.ejs', {
            title : "Login",
            message : ""
        })
    },

    loginUser : (req, res) => {
        res.send('user logged in successfully');
    },

    addAdmin : (req, res) => {
        // res.send('Admin added succesfully');
        // let name = req.body.name;
        // let deptId = req.body.deptId;
        // let email = req.body.email;
        // let password = req.body.password;
        let username = req.body.username;
        let password = req.body.password;
        let admin = req.body.admin;


        bcrypt.hash(password, 10, (err, hash) => {
            if(err) {
                console.log(err);
                return;
            }
            password = hash;

            let registerUserQuery = `INSERT INTO users (user_name, dept_id, password, admin) VALUES(?, ?, ?)`
            let values = [username, password, true];
            db.query(registerUserQuery, values, (err, rows, fields) => {
                if(err) {
                    res.status(500).send(err);
                    return;
                }
                res.redirect('/login');
            })
        })
    }
}