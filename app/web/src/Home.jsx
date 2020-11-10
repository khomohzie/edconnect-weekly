import React, { useEffect, useState } from 'react';
import Layout from './shared/Layout';
import {Row, Col, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cookie from './cookie';

const Home = (props) => {

    const [projects, setProjects] = useState([]);

    useEffect( () => {
        fetch("/api/projects")
            .then( function(response) {
                return response.json();
            } )
            .then( (projects) => {
                setProjects(projects);
            } )
    }, [] );

    return (

        <Layout>
            <>

                <div className="container">

                    <div className="row">
                        <div className="col-12">
                            <div className="jumbotron">
                                <h2>Welcome to Project Explorer</h2>
                                <p className="lead">
                                    Project Explorer is a repository for final year projects across all departments at your institution. You can submit your project and search projects submitted by others to learn from.
                                </p>

                                { !cookie.readCookie("uid") ? (
                                    <p>
                                    <a className="btn btn-primary" href="/signup">Get Started</a>
                                    &nbsp;
                                    <a className="btn btn-secondary" href="/login">Login</a>
                                </p>
                                ) : null }
                                
                            </div>
                        </div>
                    </div>

                    <Row className="showcase">
                        {projects.map( (project) => (
                            <Col key={project.id} xs={12} sm={12} md={3} lg={3} xl={3}>
                                <Card className="p-3">
                                    <h5 className="card-header">
                                        <Link to={`/projects/${project.id}`}> {project.name} </Link>
                                    </h5>
                                    <small className="text-muted"> {project.authors.join(", ")} </small>
                                    <p className="card-body"> {project.abstract} </p>
                                    <div className="card-footer card-tag"> {project.tags} </div>
                                </Card>
                            </Col>
                        ) )}
                    </Row>

                </div>

            </>
        </Layout>

    );

}

export default Home;