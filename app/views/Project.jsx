import React from 'react';
import Layout from './shared/Layout';

const Project = ({ projectName, authors, abstract, tags, projectAuthor, createdAt, updatedAt, user }) => {

    const CreatedAt = new Date(createdAt).toLocaleDateString();
    const UpdatedAt = new Date(updatedAt).toLocaleDateString();

    return (

        <Layout user={user}>

            <div className="container">
                <div className="row">
                    <h1 className="my-3" id="project_name"> {projectName} </h1>
                </div>
                <div className="row align-items-center profile-body">
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-4">
                                Created by<br />
                                <span id="project_author"> {projectAuthor} </span>
                            </div>

                            <div className="col-md-4">
                                Date Created<br />
                                {CreatedAt}
                            </div>

                            <div className="col-md-4">
                                Last Updated<br />
                                {UpdatedAt}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-2">
                        <a className="btn btn-primary" href="/editproject">Edit Project</a>
                    </div>
                </div>
            </div>

            <div className="container">

                <div className="row">

                    <div className="col-md-6 heading">

                        <h3>Project Abstract</h3>

                        <p id="project_abstract">
                            {abstract}
                        </p>

                    </div>

                    <div className="col-md-6 heading">

                        <h3>Project Details</h3>

                        <div className="card">
                            <div className="card-header">
                                <b>Author(s)</b>
                            </div>

                            <div className="card-block">
                                <p className="card-text" id="project_authors">
                                    { authors ? authors.map( (author) => (
                                        <span className="d-block" key={author}>{ author }</span>
                                    ) ) : null }
                                </p>
                            </div>

                            <div className="card-footer">
                                <small className="card-tag" id="project_tags">
                                    { tags ? tags.map( (tag) => (
                                        <span className="mr-2" key={tag}> { tag } </span>
                                    ) ) : null }
                                </small>
                            </div>
                        </div>

                        <div className="card mt-3">
                            <div className="card-header">
                                <b>Project files</b>
                            </div>
                            <div className="card-block upload-file">
                                <p className="card-text">No file uploaded yet</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </Layout>

    );

}

export default Project;