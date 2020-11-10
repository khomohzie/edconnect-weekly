import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from './shared/Layout';
import cookie from './cookie';
import { Alert } from 'react-bootstrap';

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

                    setError(err.errors);
                }
            })
    }

    return (
        <Layout>

            <main role="main">

                <div class="container">

                    <div class="row mt-3">
                        <div class="col-12 col-md-8 offset-md-2">
                            <h1>Login</h1>

                            { error ? <Alert variant="danger">Invalid email/password</Alert> : null }
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12 col-md-8 offset-md-2">
                            <form onSubmit={onLogin} encType="text/plain">
                                <fieldset class="form-group">
                                    <label for="email" class="col-form-label">Email address</label>
                                    <input class="form-control" type="email" onChange={handleInput} name="email" value={login.email} maxlength="50" placeholder="Enter email" />
                                </fieldset>
                                <fieldset class="form-group">
                                    <label for="password" class="col-form-label">Password</label>
                                    <input class="form-control" type="password" onChange={handleInput} name="password" value={login.password} placeholder="Password" />
                                </fieldset>

                                <input class="btn btn-primary" type="submit" value="Login" />
                            </form>
                        </div>
                    </div>

                </div>

            </main>

        </Layout>
    );
}

export default Login;