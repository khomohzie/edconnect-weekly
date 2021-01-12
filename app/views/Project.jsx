import React from 'react';
import Layout from './shared/Layout';

const Project = (props) => {

    return (

        <Layout>

            <div className="container">
                <div className="row">
                    <h1 className="my-3" id="project_name"> {props.projectData.name} </h1>
                </div>
                <div className="row align-items-center profile-body">
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-4">
                                Created by<br />
                                <span id="project_author"> {props.userData.firstname + " " + props.userData.lastname} </span>
                            </div>

                            <div className="col-md-4">
                                Date Created<br />
                                03/03/2020
                            </div>

                            <div className="col-md-4">
                                Last Updated<br />
                                04/04/2020
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
                            {props.projectData.abstract}
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
                                    { props.projectData.authors ? props.projectData.authors.map( (author) => (
                                        <span className="d-block" key={author}>{ author }</span>
                                    ) ) : null }
                                </p>
                            </div>

                            <div className="card-footer">
                                <small className="card-tag" id="project_tags">
                                    { props.projectData.tags ? props.projectData.tags.map( (tag) => (
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