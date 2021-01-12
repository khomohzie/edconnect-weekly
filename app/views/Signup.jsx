import React, { useState } from 'react';
import Layout from './shared/Layout';
import { Alert } from 'react-bootstrap';

const Signup = (props) => {

    const [signup, setSignup] = useState([]);

    const handleInput = (event) => {
        setSignup({
            ...signup, [event.target.name]: event.target.value
        });
    }

    return (

        <Layout>
            <>

                <main role="main">

                    <div className="container">

                        <div className="row">
                            <div className="col-12 heading">
                                <h2>Sign up</h2>
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
                            <div className="col-md-12">
                                <form action="signup" method="POST" id="signupForm" name="signupForm">

                                    <div className="form-group row">
                                        <div className="col-12">

                                            <div className="row">

                                                <div className="col-12 col-md-6">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <label htmlFor="firstname" className="col-form-label">First name</label>
                                                        </div>
                                                        <div className="col-12">
                                                            <input className="form-control" type="text" name="firstname" value={signup.firstname || ""} onChange={handleInput} maxLength="30" placeholder="First name" required />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <label htmlFor="lastname" className="col-form-label">Last name</label>
                                                        </div>
                                                        <div className="col-12">
                                                            <input className="form-control" type="text" name="lastname" value={signup.lastname || ""} onChange={handleInput} maxLength="30" placeholder="Last name" required />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-12">
                                            <div className="row">

                                                <div className="col-12 col-md-6">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <label htmlFor="email" className="col-form-label">Email Address</label>
                                                        </div>
                                                        <div className="col-12">
                                                            <input className="form-control" type="email" name="email" value={signup.email || ""} onChange={handleInput} maxLength="50" placeholder="Your Email address" required />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <label htmlFor="password" className="col-form-label">Password</label>
                                                        </div>
                                                        <div className="col-12">
                                                            <input className="form-control" type="password" name="password" value={signup.password || ""} onChange={handleInput} maxLength="30" placeholder="Your Password" required />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-12">
                                            <div className="row">

                                                <div className="col-12 col-md-6">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <label htmlFor="program" className="col-form-label">Program</label>
                                                        </div>
                                                        <div className="col-12">
                                                            <select className="form-control" name="program" value={signup.program} onChange={handleInput} required>
                                                                <option>Choose...</option>
                                                                {props.program.map((program) => (
                                                                    <option key={program}> {program} </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6">
                                                    <div className="row">

                                                        <div className="col-12 col-md-6">
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <label htmlFor="matricnumber" className="col-form-label">Matriculation Number</label>
                                                                </div>
                                                                <div className="col-12">
                                                                    <input className="form-control" type="text" name="matricNumber" value={signup.matricNumber || ""} onChange={handleInput} maxLength="8" placeholder="e.g. 16/2020" required />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-12 col-md-6">
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <label htmlFor="graduationyear" className="col-form-label">Graduation Year</label>
                                                                </div>
                                                                <div className="col-12">
                                                                    <select className="form-control" name="graduationYear" value={signup.graduationYear} onChange={handleInput} required>
                                                                        <option>Choose...</option>
                                                                        {props.gradYear.map((gradYear) => (
                                                                            <option key={gradYear}> {gradYear} </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <button className="btn btn-primary" type="submit">Sign Up</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>

            </>
        </Layout>
    );

}

export default Signup;