const express = require('express');
const Project = require('../services/project');
const User = require('../services/user');

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

router.post('/projects/submit', (req, res) => {
    const name = req.body.name;
    const abstract = req.body.abstract;
    const authors = req.body.authors;
    const tags = req.body.tags;
    const createdBy = req.session.user.id;

    const authorsArr = authors.split(', ');
    const tagsArr = tags.split(', ');

    const [isCreated, result] = Project.create({name, abstract, authors, createdBy, "authors": authorsArr, "tags": tagsArr});

    if(isCreated) {
        res.redirect('/');
    }
    else {
        req.flash("error", result);
        res.redirect('/projects/submit');
    }
})

router.get("/projects/:id", (req, res) => {
    const id = req.params.id

    const projectData = Project.getById(id);
    console.log(projectData);

    // The person that created the project
    const userData = User.getById(projectData.createdBy);
    console.log(userData);

    // The owner of the account i.e the person logged in at the time

    res.render("Project", { projectData: projectData, userData: userData, user: req.session.user });
});

module.exports = router