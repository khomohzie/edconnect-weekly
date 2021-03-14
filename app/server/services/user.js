// imports
// const fs = require("fs");
// const path = require("path");
// const Users = require("../models/users").Users;
// const User = require("../models/users").User;

// // load data file
// const usersFile = path.join(__dirname, "../users.json");

// // helper functions
// const saveJsonFile = (file, data) => fs.writeFileSync(file, JSON.stringify({ data }));
// const getFileAsJson = (file) => JSON.parse(fs.readFileSync(file));
// const saveUsersToFile = (data) => saveJsonFile(usersFile, data);
// const id = () => Math.random().toString(36).substring(2);

// // populate users with data from file.
// const users = new Users();
// users.data = getFileAsJson(usersFile).data;

const User = require('../models/user');
const helper = require('../models/mongo_helper');

/* Creates new user */
const create = async ({
    firstname,
    lastname,
    email,
    password,
    matricNumber,
    program,
    graduationYear,
}) => {
    try {
        const user = new User({
            firstname,
            lastname,
            email,
            password,
            matricNumber,
            program,
            graduationYear
        });

        await user.setPassword(password)

        return [true, await user.save()];
    } catch (err) {
        return [false, helper.translateError(err)];
    }
}

/* Authenticate a user */
const authenticate = async (email, password) => {
    const user = await User.findOne({email});

    if (user && await user.validPassword(password)) {
        return [true, user];
    } else {
        return [false, ["Invalid email/password"]];
    }
};

/* Return user with specified id */
const getById = (id) => {
    return User.findById(id);
};

/* Return all users */
const getAll = () => {
    return User.find();
};

module.exports = {
    create,
    authenticate,
    getById,
    getAll,
};
