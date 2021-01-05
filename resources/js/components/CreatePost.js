import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class CreatePost extends Component {
    constructor(){
        super();
        this.state = {
        };
    }

    componentDidMount(){
       
    }

    render(){
        return (
            <div className="body-content">
            <div className="row">
                <div className="col-lg-4 offset-lg-4  offset-md-2  offset-sm-1 col-md-8 col-sm-10">
                    <div className="col-12 auth-form-heading">
                        <h2>Create Post</h2>
                    </div>
                    {/* Create Forum */}
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
                                <span><input type="checkbox" value="lsRememberMe" id="rememberMe"/> <label>Remember me</label></span>
                                <a href="#">Forgot Password?</a>
                            </div>

                            <div className="form-bttn col-12">
                                <button className="signin-btn" type="submit">Sign In</button>
                            </div>
                        </div>
                    </form>
                    {/* END Create forum */}
                </div>
            </div>
        </div>
        )
    };
}

export default CreatePost;