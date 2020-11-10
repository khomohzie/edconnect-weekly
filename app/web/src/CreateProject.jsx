import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Layout from './shared/Layout';
import cookie from './cookie';

const CreateProject = () => {

    const [project, setProject] = useState([]);
    const [error, setError] = useState();
    const history = useHistory();

    const handleInput = (event) => {

        if (event.target.name === "authors") {
            project.authors = project.authors || [];
            project.authors = event.target.value.split(", ");
        }
        else if (event.target.name === "tags") {
            project.tags = project.tags || [];
            project.tags = event.target.value.split(", ");
        }
        else {
            project[event.target.name] = event.target.value;
        }
        setProject({ ...project });

    }

    const submitProj = (event) => {
        event.preventDefault();

        fetch("/api/projects", {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(project),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
            .then(async function (res) {
                if (res.status === 200) {
                    history.push("/");

                    return res;
                }

                if (res.status !== 200) {
                    var response = await res.json();

                    setError(response.errors);
                }
            })
    }

    if (!cookie.readCookie("uid")) {
        history.push("/login");
    }

    return (
        <Layout>

            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-8 offset-md-2">
                        <form onSubmit={submitProj} encType="text/plain" id="createProjectForm">

                            <h3 className="my-3">Submit Project</h3>

                            {error ? <Alert variant="danger"> {error[0]} <br /> {error[1]} </Alert> : null}

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