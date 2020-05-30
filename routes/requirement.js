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

    getRequirementDetailsPage : (req, res) => {
        // res.send('requirement details will be displayed here');
        let requirementId = req.params.requirementid;

        let getRequirementDetailsQuery = `SELECT * FROM requirement WHERE requirement_id = ${requirementId}`;
        let getDonorsQuery = `SELECT name, year_of_admission, dept, phone_no
            FROM donations, donor
            WHERE donations.requirement_id = ${requirementId} AND donations.donor_id = donor.donor_id;`;

        db.query(getRequirementDetailsQuery, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return res.send(err);
            }
            let requirement = rows[0];
            console.log(requirement);

            db.query(getDonorsQuery, (err, rows, fields) => {
                if(err) {
                    console.log(err);
                    return res.send(err);
                }
                
                let donors = rows;
                console.log(donors);
                res.render('requirementDetails.ejs', {
                    title : 'Requirement Details',
                    donors : donors,
                    requirement : requirement
                })
            })

        })

        


        
    },

    getAssignDonorPage : (req, res) => {
        // res.send('Assign donor from here');
        let getDonorsQuery = 'SELECT * FROM donor ORDER BY last_donation';
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
        let updateLastDonationQuery = `UPDATE donor SET last_donation = '${today}' WHERE donor_id = ${donorId}`;

        db.query(updateLastDonationQuery, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return res.send(err);
            }

            console.log('Last donation update successfully');
        })
        
        db.query(assignDonorQuery, values, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return res.send(err);
            }

            console.log('Donor assigned successfully');
            res.redirect('/admin/' + requirementId + '/details');
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
    },

    getClosedRequirementsPage : (req, res) => {

        // res.send('Closed requirements will be shown here');
        let getClosedRequirementsQuery = `SELECT * FROM requirement WHERE closed = 1 ORDER BY date DESC`;
        db.query(getClosedRequirementsQuery, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return res.send(err);
            }
            // console.log(rows);
            res.render('closedRequirements.ejs', {
                title : 'Closed Requirements',
                requirements : rows
            })
        })
    }

}