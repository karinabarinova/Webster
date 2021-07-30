const {User} = require('../sequelize/models');
const bcrypt = require('bcryptjs');
const sendEmail = require('../helpers/sendMail');
const makeANiceEmail = require('../helpers/makeANiceEmail');

module.exports = {
    getUserInfo,
    changePassword,
    changeMail,
    uploadAvatar
}

async function getUserInfo(userId) {
    const user = await User.findByPk(userId);
    return {
        user: basicDetails(user),
    };
}

//helpers

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function basicDetails(user) {
    const { id, email, role, createdAt, updatedAt, fullName, profile_picture } = user;
    const fullNameArr = fullName.split(' ');
    const name = `${capitalizeFirstLetter(fullNameArr[0])} ${capitalizeFirstLetter(fullNameArr[1])}`
    return { id, email, role, createdAt, updatedAt, name,  profile_picture};
}

async function changePassword(id, password) {
    const user = await User.findOne({
        where: {
            id: id
        }
    })

    if (!user) throw 'Oops something wrong'

    if (password) {
        user.password = await hash(password)
        user.save()
    }
}

async function uploadAvatar (id, avatar) {
    const user = await User.findOne({
        where: {
            id: id
        }
    })
    if (!user) throw 'Oops something wrong'

    if (avatar) {
        user.profile_picture = avatar
        user.save()
    }
}

async function changeMail(id, email) {
    const user = await User.findOne({
        where: {
            id: id
        }
    })

    if (!user) throw 'Oops something wrong'

    if (email) {
        user.email = email;
        user.save()
    }
}

async function hash(password) {
    return await bcrypt.hash(password, 8);
}


