module.exports = {
    getHomePage : (req, res) => {
        res.render('index.ejs', {
            title : "NSS CET Blood Cell"
        })
    }
}