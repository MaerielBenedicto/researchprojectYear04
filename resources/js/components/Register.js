
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom'
import '../../css/app.css';

import Home from '../views/Home';

class Register extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            isLoggedIn: false
        };
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-4 offset-lg-4 col-sm-12">
                    <div className="auth-form-heading">
                        <h2>Sign Up</h2>
                        <p>Already have an account? <Link to="/sign-in">Sign In</Link></p>
                    </div>

                    <form>
                        <div className="row">
                            <div className="form-group col-12">
                                <label>Full Name</label>
                                <input id="name" type="text"  className="form-control" name="name"/>
                            </div>

                            <div className="form-group col-12">
                                <label >Email Address</label>
                                <input id="email" type="email"  className="form-control" name="email"  />
                            </div>

                            <div className="form-group col-12">
                                <label >Password</label>
                                <input id="password" type="password"  className="form-control" name="password"  />
                            </div>

                            <div className="form-group col-12">
                                <label >Confirm password</label>
                                <input id="password_confirmation"  type="password" className="form-control" name="password_confirmation" />
                            </div>

                            <div className="form-button col-12">
                                <button type="submit" className="btn btn-primary">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    };
}

export default Register;
