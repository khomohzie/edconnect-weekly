import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import cookie from '../cookie';

export default () => {

    const [userState, setUserState] = useState();
    const history = useHistory();

    useEffect(() => {
        if (cookie.readCookie("uid")) {
            fetch("/api/users/" + cookie.readCookie("uid"))
                .then(async function (response) {
                    const res = await response.json();
                    setUserState(res);
                })
        }
    }, [])

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
                        <a className="nav-link" href="/projects" title="Projects">Projects</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/projects/submit" title="Submit Project">Submit</a>
                    </li>
                </ul>


                {userState ? (
                    <Nav className="navbar-nav justify-content-end">
                        <Nav.Link onClick={() => {
                            document.cookie = `uid=; expires=Thu, 01 Jan 1970T00:00:00Z`;
                            history.push("/");
                            setUserState(undefined);
                        }} title="Logout">
                            Logout
                            </Nav.Link>
                        <a className="nav-link disabled-cursor active">
                            Hi, {userState.firstname}
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