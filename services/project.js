const {Project, User} = require('../sequelize/models');


module.exports = {
    add,
    getAll
}

async function add(image, id) {
    if (!image)
        throw 'Provide an image'
    const user = await User.findByPk(id);
    const project = await Project.create({
        path: image.path,
        owner: id
    })
    await user.addProject(project);
    return project.path;
}

async function getAll() {
    return await Project.findAll();
}

