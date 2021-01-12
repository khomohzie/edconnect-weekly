const express = require('express');
const Project = require('../services/project');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('Home', { project: Project.getAll(), user: req.session.user });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
})

module.exports = router;