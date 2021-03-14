const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    abstract: {
        type: String,
        required: true
    },
    authors: {
        type: [String],
        required: true,
        unique: true
    },
    tags: {
        type: [String]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project