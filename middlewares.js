const jwt = require('jsonwebtoken');

module.exports = {

    verifyFaculty : (req, res, next) => {
        let token = req.cookies.token;
        // console.log(token);
        if(!token) {
            res.redirect('/login');
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if(err) {
                res.status(200).send(err);
                return;
            }

            if(decoded.facultyId == req.params.id) {
                req.body.facultyId = decoded.facultyId;
                next();
                return;
            } else {
                res.status(403).json({
                    message : 'Permission denied'
                });
            }
    
        });

    },

    verifyLogin : (req, res, next) => {
        let token = req.cookies.token;
        console.log("Checking if already logged in");
        // console.log(token);
        
        if(token == null) {
            console.log("Token null");
            next();
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if(err) {
                res.status(403).send(err);
                return;
            }
            if(decoded.admin) {
                res.redirect('/admin');
            }
        });
    },

    verifyAdmin : (req, res, next) => {
        let token = req.cookies.token;

        if(token == null) {
            res.redirect('/login');
            return;
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if(err) {
                res.status(403).send(err);
                return;
            }

            // console.log(user.admin);
            if(user.admin) {
                req.body.adminId = user.user;
                // console.log(req.body.adminId);
                next();
                return;
            } else {
                res.status(403).json({
                    message : 'Permission denied',
                    reason : 'Only admins have the permission for this'
                })
            }            
        });
    }
}