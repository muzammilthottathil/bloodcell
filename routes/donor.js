const db = require('../mysqlConnection');

module.exports = {

    getAddDonorPage : (req, res) => {
        res.render('addDonor.ejs', {
            title : 'Add Donor',
            username : ''
        })
    },

    addDonorDetails : (req, res) => {

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

        let enterDetailQuery = 'INSERT IGNORE INTO donor (university_reg_no,name, year_of_admission, dept, phone_no, blood_group, height, weight, mail_id, last_donation) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let values = [universityRegNo, name, admissionYear, dept, phoneNo, bloodGroup, height, weight, email, lastDonation];

        db.query(enterDetailQuery, values, (err, rows, fields) => {
            if(err) {
                console.log(err);
                res.send(err);
                return;
            }

            // res.send('Details added succesfully');
            console.log('Donor added succesfully');
            res.redirect('/admin');
        })
    },

    getDonorsPage : (req, res) => {

        let getDonorsQuery = `SELECT * FROM donor`;
        db.query(getDonorsQuery, (err, rows, fields) => {
            console.log(rows);
            res.render('donors.ejs', {
                title : 'Donors',
                donors : rows
            })
        })        
    }
}