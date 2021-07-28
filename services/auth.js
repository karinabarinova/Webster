const config = require('../config/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const db = require('../sequelize/models');
const Role = db.ROLES;
const Op = db.Sequelize.Op;
const sendEmail = require('../helpers/sendMail');
const makeANiceEmail = require('../helpers/makeANiceEmail');
const {User} = require('../sequelize/models');


module.exports = {
    login,
    register,
    verifyEmail,
    forgotPassword,
    resetPassword,
    socialLogin
}

//TODO:  add forgotPassword,resetPassword,

async function register(params) {
    if (await User.findOne({where: {email: params.email}})) {
        // send already registered error in email to prevent account enumeration
        // await sendAlreadyRegisteredEmail(params.email, origin);
        throw "Email is already taken";
    }

    const role = Role.includes(params.role) ? params.role : "user";

    // create account object
    const user = await User.create({
        email: params.email,
        password: bcrypt.hashSync(params.password, 8),
        fullName: `${params.firstName} ${params.lastName}`,
        role,
        validation_str: randomTokenString()
    })

    await sendVerificationEmail(user);
}

async function login({email, password}) {
    const user = await User.findOne({
        where: {
            email: email.toLowerCase()
        }
    })

    if (!user || !user.email_validated || !(await bcrypt.compare(password, user.password))) {
        throw 'Email or password is incorrect'
    }

    const accessToken = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 86400 //24 hours
    });

    // await user.getSubscription();
    return {
        ...basicDetails(user),
        subscriptions: await user.getSubscriptions(),
        accessToken,
        expiresIn: 86400
    }
}


async function socialLogin(email) {
    const user = await User.findOne({
        where: {
            email
        }
    })

    if (!user || !user.email_validated) {
        throw 'Email is incorrect'
    }

    const accessToken = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 86400 //24 hours
    });

    // await user.getSubscription();
    return {
        ...basicDetails(user),
        subscriptions: await user.getSubscriptions(),
        accessToken,
        expiresIn: 86400
    }
}


async function verifyEmail({token}) {
    const user = await User.findOne({
        where: {
            validation_str: token
        }
    })
    if (!user) throw 'Verification failed';

    user.email_validated = true;
    user.validation_str = null;
    await user.save();
}

async function forgotPassword({email}) {
    const user = await db.User.findOne({where: {email}});

    // always return ok response to prevent email enumeration
    if (!user) return;

    // create reset token that expires after 24 hours
    user.resetToken = randomTokenString();
    user.resetTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    // send email
    await sendPasswordResetEmail(user);
}

async function validateResetToken({token}) {
    const user = await db.User.findOne({
        where: {
            resetToken: token,
            resetTokenExpires: {[Op.gt]: Date.now()}
        }
    });

    if (!user) throw 'Invalid token';

    return user;
}


async function resetPassword({password, token}) {
    const user = await validateResetToken({token});

    // update password and remove reset token
    user.password = await hash(password);
    user.passwordReset = Date.now();
    user.resetToken = null;
    await user.save();
}


//helpers

async function sendPasswordResetEmail(user) {
    let message = `Your password Reset Token is here!
    <a href="http://localhost:3006/reset?token=${user.resetToken}">Click Here to reset</a>`;

    await sendEmail({
        to: user.email,
        subject: 'UEvent - Reset Password',
        html: makeANiceEmail(`${message}`)
    });
}

async function sendVerificationEmail(user, origin) {
    let message;
    if (origin) {
        const verifyUrl = `http://localhost:3000/api/auth/verify-email?token=${user.validation_str}`;
        message = `<p>Please click the below link to verify your email address:</p>
                   <p><a href="${verifyUrl}">${verifyUrl}</a></p>`;
    } else {
        message = `<p>Please use the below token to verify your email address with the <code>/api/auth/verify-email</code> api route:</p>
                   <p><code>${user.validation_str}</code></p>`;
    }

    await sendEmail({
        to: user.email,
        subject: 'UEvent - Verify Email',
        html: makeANiceEmail(`${message}`)
    });
}

function randomTokenString() {
    return crypto.randomBytes(40).toString('hex');
}

function basicDetails(user) {
    const {id, email, role, createdAt, updatedAt, fullName} = user;
    return {id, email, role, createdAt, updatedAt, fullName};
}

async function hash(password) {
    return await bcrypt.hash(password, 8);
}
