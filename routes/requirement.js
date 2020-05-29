const db = require('../mysqlConnection');

module.exports = {

    getAddRequirementPage : (req, res) => {

        let getHospitalsQuery = 'SELECT name FROM hospital';
        db.query(getHospitalsQuery, (err, rows, fields) => {
            if(err) {
                res.send(err);
                return;
            }

            // console.log(rows);
            res.render('addRequirement.ejs', {
                title : 'Add Requirement',
                hospitals : rows
            })
        })
    },

    addRequirement : (req, res) => {

        // console.log(req.body);
        let patientName = req.body.patientName;
        let bystander = req.body.bystander;
        let bloodGroup = req.body.bloodgroup;
        let noOfUnits = req.body.noOfUnits;
        let typeOfDonation = req.body.typeOfDonation;
        let hospital = req.body.hospital;
        let contactNo = req.body.contactNo;
        let date = req.body.date;

        let addRequirementQuery = `INSERT IGNORE INTO bloodcell.requirement
            (patient_name, by_stander, blood_group, quantity, type_of_requirement, hospital, contact_no, date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        let values = [ patientName, bystander, bloodGroup, noOfUnits, typeOfDonation, hospital, contactNo, date ];

        db.query(addRequirementQuery, values, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return res.send(err);
            }

            console.log('Requirement added successfully');
            res.redirect('/admin');
        })
    },

    getAssignDonorPage : (req, res) => {
        // res.send('Assign donor from here');
        let getDonorsQuery = 'SELECT * FROM donor';
        db.query(getDonorsQuery, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return res.send(err);
            }
            // console.log(rows);
            res.render('assignDonor.ejs', {
                donors : rows
            });
        })

    },

    assignDonor : (req, res) => {
        
        // console.log(req.params);
        let donorId = req.params.donorid;
        let requirementId = req.params.requirementid;
        let today = new Date().toJSON().slice(0,10).replace(/-/g,'-');

        let assignDonorQuery = 'INSERT IGNORE INTO donations VALUES (?, ?, ?)';
        let values = [ requirementId, donorId, today ];

        db.query(assignDonorQuery, values, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return res.send(err);
            }

            console.log('Donor assigned successfully');
            res.redirect('/admin');
        })
    },

    closeRequirement : (req, res) => {
    
        let requirementId = req.params.requirementid;
        let closeRequirementQuery = `UPDATE requirement SET closed = TRUE WHERE requirement_id = ${requirementId}`;
        
        db.query(closeRequirementQuery, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return res.send(err);
            }

            console.log('Requirement closed');
            res.redirect('/admin');
        })
    }
}