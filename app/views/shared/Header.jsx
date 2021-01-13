import React from 'react';
import { Nav } from 'react-bootstrap';

export default ({ user }) => {

    return (

        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
            <a href="/" className="navbar-brand">Project Explorer</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#responsive-nav" aria-controls="#responsive-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="#responsive-nav">
                <form className="form-inline my-2 my-lg-0 pull-xs-left" method="POST" action="" encType="text/plain">
                    <input className="form-control" type="search" aria-label="Search" placeholder="Search Projects" />&nbsp;
                <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                </form>

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/projects/qqg8jtk5iso" title="Projects">Projects</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/projects/submit" title="Submit Project">Submit</a>
                    </li>
                </ul>


                {user ? (
                    <Nav className="navbar-nav justify-content-end">
                        <Nav.Link href="/logout" id="logout" title="Logout">
                            Logout
                        </Nav.Link>
                        <a className="nav-link active" id="username">
                            Hi, {user.firstname}
                        </a>
                    </Nav>
                ) : (
                        <Nav className="navbar-nav justify-content-end">
                            <Nav.Link href="/signup" title="Sign up">
                                Sign up
                            </Nav.Link>
                            <Nav.Link href="/login" title="Login Page">
                                Login
                            </Nav.Link>
                        </Nav>
                    )
                }
            </div>
        </nav >

    );

}