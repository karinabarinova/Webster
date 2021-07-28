const express = require('express');
const router = express.Router();
const service = require('../services/auth');
//logout should be done on client side

router.post('/login', login);
router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/password-reset', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;

function register(req, res, next) {
    service.register(req.body)
        .then(() => res.status(200).json({message: "Registration successful, please check your email for verification instructions"}))
        .catch(next);
}

function login(req, res, next) {
    const {email, password} = req.body;
    service.login({email, password})
        .then((data) => res.status(200).json({data, message: "Logged in successfully"}))
        .catch(next);
}

function verifyEmail(req, res, next) {
    service.verifyEmail(req.body)
        .then(() => res.status(200).json({ message: 'Verification successful, you can now login' }))
        .catch(next);
}

function forgotPassword(req, res, next) {
    service.forgotPassword(req.body)
        .then(() => res.json({ message: 'Please check your email for password reset instructions' }))
        .catch(next);
}

function resetPassword(req, res, next) {
    service.resetPassword(req.body)
        .then(() => res.json({ message: 'Password reset successful, you can now login' }))
        .catch(next);
}
