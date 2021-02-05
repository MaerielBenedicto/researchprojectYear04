import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect, useHistory, withRouter } from 'react-router-dom'
import '../../css/app.css';
import Home from '../views/Home';

class Signin extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            remember: false,
            errors: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleSubmitForm(e){
        //prevent from reloading page
        e.preventDefault();
        axios.post('/api/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then((response) => {
            console.log(response.data);
            const user = response.data;            
            this.props.onSuccess(user, this.state.remember);
          })
          .catch((error) => {
            if(error.response){
                this.setState({errors: error.response.data.errors });
            } 
        });
      }

    handleChange(e){
        const target = e.target;
        const value = (target.type === 'checkbox') ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    render() {
        return (
            <div className="body-content">
                <div className="row">
                    <div className="col-lg-4 offset-lg-4  offset-md-2  offset-sm-1 col-md-8 col-sm-10">
                        <div className="col-12 auth-form-heading">
                            <h2>SIGN IN</h2>
                        </div>
                        {/* LOG IN FORM */}
                        <form onSubmit={this.handleSubmitForm} className="form-div"> 
                            <div className="row">
                                <div className="form-group col-12">
                                    <input id="email" type="email" className="form-control" placeholder="Email" name="email" required 
                                    value={this.state.email}
                                    onChange={this.handleChange} />
                                </div>

                                <div className="form-group col-12">
                                    <input id="password" type="password" className="form-control" placeholder="Password" name="password" required 
                                    value={this.state.password}
                                    onChange={this.handleChange} />
                                </div>
                                <div className="form-group col-12 form-msg">
                                    <span>
                                        <input type="checkbox" id="rememberMe" name="remember"
                                            checked={this.state.remember}
                                            onChange={this.handleChange}
                                         /> 
                                        <label>Remember me</label></span>
                                    <a href="#">Forgot Password?</a>
                                </div>

                                <div className="form-bttn col-12">
                                    <button className="signin-btn" type="submit">Sign In</button>
                                </div>
                            </div>
                        </form>
                        {/* END LOG IN FORM */}
                    </div>
                </div>
            </div>
        )
    };
}

export default withRouter(Signin);