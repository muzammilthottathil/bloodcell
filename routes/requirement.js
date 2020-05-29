const db = require('../mysqlConnection');

module.exports = {
    getAddRequirementPage : (req, res) => {
        // res.send('Add requirement page');
        let getHospitalsQuery = 'SELECT name FROM hospital';
        db.query(getHospitalsQuery, (err, rows, fields) => {
            if(err) {
                res.send(err);
                return;
            }

            console.log(rows);
            res.render('addRequirement.ejs', {
                title : 'Add Requirement',
                hospitals : rows
            })
        })
    },

    addRequirement : (req, res) => {

        console.log(req.body);
        let patientName = req.body.patientName;
        let bystander = req.body.bystander;
        let bloodGroup = req.body.bloodGroup;
        let noOfUnits = req.body.noOfUnits;
        let typeOfDonation = req.body.typeOfDonation;
        let hospital = req.body.hospital;
        let contactNo = req.body.contactNo;

        let addRequirementQuery = `INSERT IGNORE INTO bloodcell.requirement
            (patient_name, by_stander, blood_group, quantity, type_of_requirement, hospital, contact_no)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
        let values = [ patientName, bystander, bloodGroup, noOfUnits, typeOfDonation, hospital, contactNo ];

        db.query(addRequirementQuery, values, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return res.send(err);
            }

            console.log('Requirement added successfully');
            res.redirect('/admin');
        })
    }
}