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

        if(lastDonation == '') {
            // console.log('Empty string');
            lastDonation = '2000-01-01';
        }

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
            // console.log(rows[0].lastDonation.toJSON().slice(0,10).replace(/-/g,'-'));
            console.log(rows);
            res.render('donors.ejs', {
                title : 'Donors',
                donors : rows
            })
        })        
    },

    editDonorPage : (req, res) => {

        let donorId = req.params.donorid;

        let getDonorDetailsQuery = `SELECT * FROM donor WHERE donor_id = ${donorId}`;
        db.query(getDonorDetailsQuery, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return res.send(err);
            }
            // console.log(rows[0]);
            res.render('editDonor.ejs', {
                title : 'Edit Donor',
                donor : rows[0]
            })
        })
    },

    editDonor : (req, res) => {
        
        let donorId = req.params.donorid;
        // console.log(req.params);
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

        if(lastDonation == '') {
            // console.log('Empty string');
            lastDonation = '2000-01-01';
        }

        let updateDetailsQuery = `UPDATE donor 
            SET university_reg_no = ?, name = ?, year_of_admission = ?, dept = ?, phone_no = ?, blood_group = ?, height = ?, weight = ?, mail_id = ?, last_donation = ?
            WHERE donor_id = ${donorId}`;

        let values = [ universityRegNo, name, admissionYear, dept, phoneNo, bloodGroup, height, weight, email, lastDonation ];

        db.query(updateDetailsQuery, values, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return res.send(err);
            }

            res.redirect('/admin/donors');
        })

    }
}