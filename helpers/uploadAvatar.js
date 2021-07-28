const multer = require('multer');
const path = require('path');
// const moment = require('moment')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resources/uploads');
    },
    filename: (req, file, cb) => {
        cb(null,  file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer ({
    storage: storage,
    destination: 'resources/uploads',
    limits: {
        fileSize: 1000000
    },
    fileFilter (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/))
            return cb(new Error('Please upload an image'))
        cb(undefined, true)
    }
});

module.exports = upload;