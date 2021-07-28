const db = require('../sequelize/models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).json({
                message: "Email is already in use"
            });
            return;
        }
    })
    next();
}

checkRoleExist = (req, res, next) => {
    if (req.body.roles) { //TODO: do we really need several role on registration?
        for(let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).json({
                    message: "Role does not exist"
                })
                return;
            }
        }
    }
    next();
}

const verifySignUp = {
    checkDuplicateEmail,
    checkRoleExist
};

module.exports = verifySignUp;
