module.exports = {

    getLoginPage : (req, res) => {
        res.render('login.ejs', {
            title : "Login",
            message : ""
        })
    },

    loginUser : (req, res) => {
        res.send('user logged in successfully');
    }
}