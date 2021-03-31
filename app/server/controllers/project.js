const express = require('express');
const Project = require('../services/project');

const router = express.Router();

router.get('/projects/submit', (req, res) => {
    if(!req.session.user) {
        res.redirect('/login');
    }
    else {
        const errors = req.flash("error");
        res.render('CreateProject', {errors, user: req.session.user});
    }
})

router.post('/projects/submit', async (req, res) => {
    const name = req.body.name;
    const abstract = req.body.abstract;
    const authors = req.body.authors;
    const tags = req.body.tags;
    const createdBy = req.session.user._id;

    const authorsArr = authors.split(', ');
    const tagsArr = tags.split(', ');

    const [isCreated, result] = await Project.create({name, abstract, authors, createdBy, "authors": authorsArr, "tags": tagsArr});

    if(isCreated) {
        res.redirect('/');
    }
    else {
        req.flash("error", result);
        res.redirect('/projects/submit');
    }
})

router.get("/project/:id", async (req, res) => {
    // const id = req.params.id

    // const projectData = await Project.getById(id);
    // console.log(projectData);

    // // The person that created the project
    // const userData = User.getById(projectData.createdBy);
    // console.log(userData);

    const id = req.params.id
    const projectData = await Project.getById(id)

    console.log(projectData);

    const projectName = projectData.name
    const authors = projectData.authors
    const abstract = projectData.abstract
    const tags = projectData.tags

    const createdAt = projectData.createdAt;
    const updatedAt = projectData.updatedAt;

    let projectAuthor = projectData.createdBy.firstname + " " + projectData.createdBy.lastname

    res.render("Project", { projectName, authors, abstract, tags, projectAuthor, createdAt, updatedAt, user: req.session.user });
});

module.exports = router