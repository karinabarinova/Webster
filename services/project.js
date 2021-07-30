const {Project} = require('../sequelize/models');


module.exports = {
    add,
    getAll
}

async function add(image) {
    if (!image)
        throw 'Provide an image'
    const project = await Project.create({
        path: image.path,
    })
    return project.path
}

async function getAll() {
    return await Project.findAll();
}

