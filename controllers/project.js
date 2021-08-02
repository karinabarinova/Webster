const express = require('express');
const router = express.Router();
const service = require('../services/project');
const authJwt = require('../middleware/authJwt');
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'resources/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer( {
    storage: storage,
    dest: 'resources/uploads',
    limits: {
        fileSize: 1000000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|pdf|webp)$/))
            return cb(new Error('Please upload an image'))
        cb(undefined, true)
    }
})

router.post('/add', authJwt.verifyToken, upload.single('image'), add);
router.get('/', getAll);


module.exports = router;

function add(req, res, next) {
    service.add(req.file, req.userId)
        .then((data) => res.status(200).json({data, message: "Registration successful, please check your email for verification instructions"}))
        .catch(next);
}

function getAll(req, res, next) {
    service.getAll()
        .then((data) => res.status(200).json({data, message: "Registration successful, please check your email for verification instructions"}))
        .catch(next);
}