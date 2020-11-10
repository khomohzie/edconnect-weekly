import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Layout from './shared/Layout';
import cookie from './cookie';

const Login = (props) => {

    const [login, setLogin] = useState([]);
    const history = useHistory();
    const [error, setError] = useState();

    const handleInput = (event) => {
        event.preventDefault();

        setLogin({
            ...login, [event.target.name]: event.target.value
        })
    }

    const onLogin = (event) => {
        event.preventDefault();

        fetch("/api/login", {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(login),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
            .then(async function (res) {
                if (res.status === 200) {
                    var response = await res.json();

                    cookie.createCookie("uid", response.data.id, "30");

                    history.push("/")

                    return response;
                }

                if (res.status !== 200) {
                    var err = await res.json();

                    setError("Invalid email/password");

                    console.log(err);

                    return err;
                }
            })
    }

    return (
        <Layout>

            <main role="main">

                <div className="container">

                    <div className="row mt-3">
                        <div className="col-12 col-md-8 offset-md-2">
                            <h1>Login</h1>

                            { error ? <Alert variant="danger"> { error } </Alert> : null }
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 col-md-8 offset-md-2">
                            <form onSubmit={onLogin} encType="text/plain" id="loginForm">
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