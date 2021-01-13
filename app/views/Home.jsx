import React from 'react';
import Layout from './shared/Layout';
import { Row, Col, Card } from 'react-bootstrap';

const Home = (props) => {

    return (

        <Layout user={props.user}>
            <>

                <div className="container">

                    <div className="row">
                        <div className="col-12">
                            <div className="jumbotron">
                                <h2>Welcome to Project Explorer</h2>
                                <p className="lead">
                                    Project Explorer is a repository for final year projects across all departments at your institution. You can submit your project and search projects submitted by others to learn from.
                                </p>

                                { !props.user ? (
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
                        {props.project.map((project) => (
                            <Col key={project.id} xs={12} sm={12} md={3} lg={3} xl={3}>
                                <Card className="p-3">
                                    <h5 className="card-header">
                                        <a href={`/project/${project.id}`}> {project.name} </a>
                                    </h5>
                                    <small className="text-muted"> {project.authors.join(", ")} </small>
                                    <p className="card-body"> {project.abstract} </p>
                                    <div className="card-footer card-tag"> {project.tags} </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                </div>

            </>
        </Layout>

    );

}

export default Home;