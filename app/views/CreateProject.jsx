import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Layout from './shared/Layout';

const CreateProject = (props) => {

    const [project, setProject] = useState([]);

    const handleInput = (event) => {

        setProject({ ...project, [event.target.name]: event.target.value });

    }

    return (
        <Layout>

            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-8 offset-md-2">
                        <form action="/projects/submit" method="POST" id="createProjectForm">

                            <h3 className="my-3">Submit Project</h3>

                            {props.errors != "" ?
                                <Alert variant="danger">
                                    {props.errors.map((error) => (
                                        <p key={error}>{error}</p>
                                    ))}
                                </Alert> : null
                            }

                            <fieldset class="form-group">
                                <label>Project Name</label>
                                <input class="form-control" type="text" onChange={handleInput} name="name" value={project.name} maxlength="50" placeholder="Enter project name" />
                            </fieldset>

                            <fieldset class="form-group">
                                <label>Project Abstract</label>
                                <textarea class="form-control" onChange={handleInput} name="abstract" value={project.abstract} maxlength="100" rows="10" cols="56"></textarea>
                            </fieldset>

                            <fieldset class="form-group">
                                <label>Author(s)</label>
                                <input class="form-control" type="text" onChange={handleInput} name="authors" value={project.authors} maxlength="50" placeholder="Enter author names (separated by comma)" />
                            </fieldset>

                            <fieldset class="form-group">
                                <label>Tag(s)</label>
                                <input class="form-control" type="text" onChange={handleInput} name="tags" value={project.tags} maxlength="50" placeholder="Use # to tag project with different topics (e.g. #javascript #mongodb)" />
                            </fieldset>

                            <button class="btn btn-primary" type="submit" name="submit">Continue</button>

                        </form>
                    </div>
                </div>
            </div>

        </Layout>
    );

}

export default CreateProject;