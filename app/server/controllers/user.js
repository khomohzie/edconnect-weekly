const express = require('express');
const School = require('../services/school');
const User = require('../services/user');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.render('Signup', { program: School.getPrograms(), gradYear: School.getGradYears(), errors: req.flash("error") });
});

router.post('/signup', (req, res) => {
    const user = User.create(req.body);

    if (user[0] === true) {
        req.session.user = user;
        res.redirect('/');
    }
    else {
        req.flash("error", user[1]);
        res.redirect('/signup');
    }
});

router.get("/login", (req, res) => {
    res.render("Login", { errors: req.flash("error") });
});

router.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const user = User.authenticate(email, password)
    if(user[0] === true) {
        req.session.user = user
        res.redirect('/')
    }
    else {
        req.flash("error", user)
        res.redirect('/login')
    }
});

module.exports = router;