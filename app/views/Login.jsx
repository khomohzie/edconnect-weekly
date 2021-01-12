import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Layout from './shared/Layout';

const Login = (props) => {

    const [login, setLogin] = useState([]);

    const handleInput = (event) => {
        event.preventDefault();

        setLogin({
            ...login, [event.target.name]: event.target.value
        })
    }

    return (
        <Layout user={props.user}>

            <main role="main">

                <div className="container">

                    <div className="row mt-3">
                        <div className="col-12 col-md-8 offset-md-2">
                            <h1>Login</h1>

                            {props.errors != "" ?
                                <Alert variant="danger">
                                    {props.errors.map((error) => (
                                        <p key={error}>{error}</p>
                                    ))}
                                </Alert> : null
                            }

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2">
                            <form action="login" method="POST" id="loginForm">
                                <fieldset className="form-group">
                                    <label htmlFor="email" className="col-form-label">Email address</label>
                                    <input className="form-control" type="email" onChange={handleInput} name="email" value={login.email || ""} maxLength="50" placeholder="Enter email" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label htmlFor="password" className="col-form-label">Password</label>
                                    <input className="form-control" type="password" onChange={handleInput} name="password" value={login.password || ""} placeholder="Password" />
                                </fieldset>

                                <input className="btn btn-primary" type="submit" value="Login" />
                            </form>
                        </div>
                    </div>

                </div>

            </main>

        </Layout>
    );
}

export default Login;