const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv');
const passport = require('passport'), GoogleStrategy = require('passport-google-oauth20')
const app = express();
const port = process.env.PORT;
const errorHandler = require('./middleware/errorHandler');
const public = require('path').join(__dirname, 'resources');
const db = require('./sequelize/models');
const {socialLogin} = require("./services/auth");
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

const corsOptions = {
    origin: "*",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: '50mb',}))
app.use(errorHandler);
app.use(passport.initialize())

passport.serializeUser((user, cb) => {
    return cb(null, user.id)
})

passport.deserializeUser((user, cb) => {
    return cb(null, user.id)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/login/google-auth"
    },
    (accessToken, refreshToken, profile, cb) => {
        return cb(null, profile)
    }
))

app.post('/api/google', async (req, res, next) => {
    const {tokenId} = req.body
    const ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    const {name, email, picture} = ticket.getPayload();
    socialLogin(email)
        .then((data) => res.status(200).json({data, message: "Logged in successfully"}))
        .catch(next)
    ;
})

app.use(express.static(public));
app.use('/api/auth', require('./controllers/auth'));
app.use('/api/user', require('./controllers/user'));
app.use('/api/project', require('./controllers/project'));

app.listen(port, () => {
    console.log("App is listening on port " + port);
})