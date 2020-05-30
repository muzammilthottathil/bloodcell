const db = require('../mysqlConnection');

module.exports = {
    getAddHospitalPage : (req, res) => {
        res.render('addHospital.ejs', {
            title : 'Add Hospital',
        });
    },

    addHospital : (req, res) => {
        // res.send('Hospital added successfully');
        console.log(req.body);
        let hospitalName = req.body.hospitalName;
        let address = req.body.address;
        let landmark = req.body.landmark;
        let contactNo = req.body.contactNo;

        let addHospitalQuery = 'INSERT IGNORE INTO hospital VALUES (?, ?, ?, ?)';
        let values = [ hospitalName, address, landmark, contactNo ];
        db.query(addHospitalQuery, values, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return res.send(err);
            }

            console.log('Hospital added succesfully');
            res.redirect('/admin');
        })
    },

    getHospitalsPage : (req, res) => {

        let getHospitalsQuery = `SELECT * FROM hospital`
        db.query(getHospitalsQuery, (err, rows, fields) => {
            console.log(rows);
            res.render('hospitals.ejs', {
                title : 'Hospitals',
                hospitals : rows
            })
        })
    },

    editHospitalPage : (req, res) => {

        let hospitalName = req.params.hospitalname;

        let getHospitalDetailsQuery = `SELECT * FROM hospital WHERE name = '${hospitalName}'`;
        db.query(getHospitalDetailsQuery, (err, rows, fields) => {
            if(err) {
                console.log(err);
                return res.send(err);
            }
            if(rows.length === 0) {
                res.json({
                    message : 'Invalid hospital name'
                })
                return;
            }
            res.render('editHospital.ejs', {
                title : 'Edit Hospital',
                hospital : rows[0]
            })
        })
    }
}