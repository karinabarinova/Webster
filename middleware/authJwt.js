const jwt = require("jsonwebtoken");
const config = require('../config/auth');
const db = require('../sequelize/models')
const User = db.user;

verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(403).json({
            message: "No token provided"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        req.userId = decoded.id;
        next();
    })
}

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            if (roles.includes("admin")) {
                next();
                return;
            }
            res.status(403).send({
                message: "Admin role required"
            })
            return;
        })
    })
}

isCompany = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            if (roles.includes("company")) {
                next();
                return;
            }
            res.status(403).send({
                message: "Company role required"
            })
            return;
        })
    })
}

const authJwt = {
    verifyToken,
    isAdmin,
    isCompany
}

module.exports = authJwt;
