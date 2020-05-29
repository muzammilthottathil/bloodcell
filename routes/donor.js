const db = require('../mysqlConnection');

module.exports = {

    getAddDonorPage : (req, res) => {
        res.render('addDonor.ejs', {
            title : 'Add Donor',
            username : ''
        })
    },

    addDonorDetails : (req, res) => {
        // res.send('Details added succesfully');
        // console.log(req.body);
        let universityRegNo = req.body.universityRegNO;
        let name = req.body.name;
        let admissionYear = req.body.admissionYear;
        let dept = req.body.dept;
        let phoneNo = req.body.phoneNo;
        let email = req.body.email;
        let bloodGroup = req.body.bloodGroup;
        let height = req.body.height;
        let weight = req.body.weight;
        let lastDonation = req.body.lastDonation;

        let enterDetailQuery = 'INSERT IGNORE INTO donor VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let values = [universityRegNo, name, admissionYear, dept, phoneNo, email, bloodGroup, height, weight, lastDonation];

        db.query(enterDetailQuery, values, (err, rows, fields) => {
            if(err) {
                // console.log(err);
                res.send(err);
                return;
            }

            res.send('Details added succesfully');
        })


    }
}