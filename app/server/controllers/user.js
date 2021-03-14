const express = require('express');
const School = require('../services/school');
const User = require('../services/user');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('Signup', { program: School.getPrograms(), gradYear: School.getGradYears(), errors: req.flash("error") });
});

router.post('/signup', async (req, res) => {
    const firstname = req.body.firstName
    const lastname = req.body.lastName
    const email = req.body.email
    const password = req.body.password
    const matricNumber = req.body.matricNumber
    const program = req.body.program
    const graduationYear = req.body.graduationYear

    const [signup, user] = await User.create({firstname, lastname, email, password, matricNumber, program, graduationYear});
    if(signup) {
        req.session.user = user;
        res.redirect('/');
    }
    else {
        req.flash("error", user);
        res.redirect('/signup');
    }
});

router.get("/login", (req, res) => {
    res.render("Login", { errors: req.flash("error") });
});

router.post("/login", async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const [login, user] = await User.authenticate(email, password)
    if(login) {
        req.session.user = user;
        res.redirect('/');
    }
    else {
        req.flash("error", user);
        res.redirect('/login');
    }
});

module.exports = router;