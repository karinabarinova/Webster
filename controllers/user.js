const express = require('express');
const router = express.Router();
const service = require('../services/user');
const authJwt = require('../middleware/authJwt');
const upload = require('../helpers/uploadAvatar')

router.get('/',  authJwt.verifyToken, getUserInfo);
router.post('/change-password', authJwt.verifyToken, changePasswordInAccount)
router.post('/change-email', authJwt.verifyToken, changeEmailInAccount)
router.post('/upload-avatar', authJwt.verifyToken, upload.single('image'),changeAvatarInAccount)
//TODO: edit/getByID subscriptions

module.exports = router;

function getUserInfo(req, res, next) {
    service.getUserInfo(req.userId)
        .then((data) => res.json(data))
        .catch(next);
}

function changePasswordInAccount (req, res, next) {
    service.changePassword(req.userId,  req.body.password)
        .then(() => res.json({ message: 'Password updated successfully' }))
        .catch(next);
}

function changeEmailInAccount (req, res, next) {
    service.changeMail(req.userId,  req.body.email)
        .then(() => res.json({ message: 'Email updated successfully' }))
        .catch(next);
}

function changeAvatarInAccount (req, res, next) {
    service.uploadAvatar(req.userId, req.file.filename)
        .then(() => res.json({ message: 'Avatar updated successfully' }))
        .catch(next)
}