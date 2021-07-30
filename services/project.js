const {Project} = require('../sequelize/models');


module.exports = {
    add,
}

async function add(image) {
    if (!image)
        throw 'Provide an image'
    const project = await Project.create({
        path: image.path,
    })
    return project.path
}

