
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom'
import '../../css/app.css';

import Home from '../views/Home';

class Register extends Component {

    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: '',
            isLoggedIn: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);

    }

    handleSubmitForm(e){
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
            localStorage.setItem("token", response.data.token);
            this.props.login();
            this.setState({
                name: response.data.name,
                email: response.data.email,
                isLoggedIn: true
            });
          })
        .catch(function(error) {
            if(error.response){
            console.log(error.response.data.errors);
            this.state.errors = error.response.data.errors;
            } 
        });
      }

    handleChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    render() {
        if (this.state.isLoggedIn) {
            // redirect to home if logged in
            return <Redirect to='/' />;
          }

        return (
            <div className="body-content">
            <div className="row">
                <div className="col-lg-4 offset-lg-4 col-sm-12">
                    <div className="auth-form-heading">
                        <h2>Sign Up</h2>
                        <p>Already have an account? <Link to="/sign-in">Sign In</Link></p>
                    </div>

                    <form onSubmit={this.handleSubmitForm} className="form-div">
                        <div className="row">
                            <div className="form-group col-12">
=                                <input id="name" type="text"  className="form-control" name="name" 
                                value={this.state.name}
                                onChange={this.handleChange}/>
                            </div>

                            <div className="form-group col-12">
                                <input id="email" type="email"  className="form-control" name="email"
                                value={this.state.email}
                                onChange={this.handleChange}  />
                            </div>

                            <div className="form-group col-12">
                                <input id="password" type="password"  className="form-control" name="password" 
                                value={this.state.password}
                                onChange={this.handleChange} />
                            </div>

                            <div className="form-group col-12">
                                <input id="password_confirmation"  type="password" className="form-control" name="password_confirmation" 
                                value={this.state.password_confirmation}
                                onChange={this.handleChange}/>
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
            </div>
        )
    };
}

export default Register;
