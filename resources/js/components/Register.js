
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect, withRouter } from 'react-router-dom'
import '../../css/app.css';

import Forums from '../views/Forums';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);

    }

    handleSubmitForm(e) {
        //prevent from reloading page
        e.preventDefault();
        axios.post('/api/register', {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        })
            .then((response) => {
                console.log(response.data);
                const user = response.data;
                this.props.onSuccess(user);
            })
            .catch((error) => {
                if (error.response) {
                    this.setState({ errors: error.response.data.errors });
                }
            });
    }

    handleChange(e) {
        const target = e.target;
        const value = (target.type === 'checkbox') ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const errors = this.state.errors;

        return (
            <div className="body-content">
                <div className="row">
                    <div className="col-lg-4 offset-lg-4 col-sm-12">
                        <div className="auth-form-heading">
                            <h2>REGISTER</h2>
                        </div>

                        <form onSubmit={this.handleSubmitForm} className="form-div">
                            <div className="row">
                                <div className="form-group col-12">
                                    <input id="name" type="text" className="form-control"
                                        placeholder="Name" name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                    <span className="error">{errors.name}</span>

                                </div>

                                <div className="form-group col-12">
                                    <input id="email" type="email" className="form-control" 
                                        placeholder="Email" name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                    <span className="error">{errors.email}</span>

                                </div>

                                <div className="form-group col-12">
                                    <input id="password" type="password" className="form-control" 
                                        placeholder="Password" name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                    <span className="error">{errors.password}</span>

                                </div>

                                <div className="form-group col-12">
                                    <input id="password_confirmation" type="password" 
                                        className="form-control" placeholder="Confirm password" 
                                        name="password_confirmation"
                                        value={this.state.password_confirmation}
                                        onChange={this.handleChange}
                                    />
                                    <span className="error">{errors.password_confirmation}</span>

                                </div>

                                <div className="form-bttn col-12">
                                    <button type="submit" className="register-btn">
                                        Register
                                </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    };
}

export default withRouter(Register);
