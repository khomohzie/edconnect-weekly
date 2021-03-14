// imports
// const fs = require("fs");
// const path = require("path");
// const Projects = require("../models/projects").Projects;
// const Project = require("../models/projects").Project;

// // load data file
// const projectsFile = path.join(__dirname, "../projects.json");

// // helper functions
// const saveJsonFile = (file, data) => fs.writeFileSync(file, JSON.stringify({ data }));
// const getFileAsJson = (file) => JSON.parse(fs.readFileSync(file));
// const saveProjectsToFile = (data) => saveJsonFile(projectsFile, data);
// const id = () => Math.random().toString(36).substring(2);

// // populate projects with data from file.
// const projects = new Projects();
// projects.data = getFileAsJson(projectsFile).data;

const Project = require('../models/project');
const helper = require('../models/mongo_helper');

/* Create new project */
const create = async ({ name, abstract, authors, tags, createdBy }) => {
    try {
        const project = new Project({
            name,
            abstract,
            authors,
            tags,
            createdBy
        });

        return [true, await project.save()];
    } catch (err) {
        return [false, helper.translateError(err)];
    };
}

/* Return project with specified id */
const getById = (id) => {
    return Project.findById(id).populate('createdBy');
};
/* Return all projects */
const getAll = () => {
    return Project.find();
};

module.exports = {
    getAll,
    create,
    getById
};