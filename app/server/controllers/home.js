const express = require('express');
const Project = require('../services/project');

const router = express.Router();

router.get('/', async (req, res) => {

    // add code to render the Home Component, and pass in the projects  

    // as a props

    res.render('Home', { project: await Project.getAll(), user: req.session.user });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
})

module.exports = router;