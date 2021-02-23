import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import UserForums from '../components/UserForums';
import UserPosts from '../components/UserPosts';
import Avatar from '../components/Modal/Avatar';

import {FaUserEdit, FaWindowClose} from 'react-icons/fa';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.uploaded = this.uploaded.bind(this);
        
    }

    handleSubmitForm(e) {
        //prevent from reloading page
        e.preventDefault();
        axios.post('/api/register', {
            name: this.state.user.name,
            email: this.state.user.email,
            password: this.state.user.password,
            password_confirmation: this.state.user.password_confirmation
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
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    uploaded(){
        this.setState({showModal: false});
    }

    render() {
        const user = this.props.user;
        const avatar = user.image ? ('uploads/' + user.image) : 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png';

        return (
            <div className="body-content pb-0">
                <div className="container">
                    {/* <div className="row"> */}
                    <div className="col-12">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a href="#home" className="nav-link active" id="home-tab" data-toggle="tab" data-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">My Profile</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a href="#profile-tab" className="nav-link" id="profile-tab" data-toggle="tab" data-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Posts</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a href="#contact-tab" className="nav-link" id="contact-tab" data-toggle="tab" data-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Comments</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row profile">
                                    <div className="col-2 profile-avatar">
                                        <img src={avatar} />
                                        
                                        <div><button onClick={()=> this.setState({showModal: true})}className="edit-avatar-bttn">Edit avatar</button></div>
                                    </div>
                                    <div className="profile-div col-5">
                                        <div className="profile-heading">
                                            <h4>Account information 
                                                {this.state.update && (
                                                    <button onClick={()=> this.setState({update: false})} className="float-right">
                                                    <FaWindowClose className="icon" />
                                                </button>
                                                )}
                                        
                                                <button onClick={()=> this.setState({update: true})} className="float-right">
                                                    <FaUserEdit className="icon" />
                                                </button>
                                            </h4>
                                            
                                        </div>
                                        <div className="profile-details">
                                            <form onSubmit={this.handleSubmitForm} className="form-div">
                                                <div className="row">
                                                    <div className="form-group col-12">
                                                        <label>Name</label>
                                                        {(this.state.update) ? (
                                                            <input id="name" type="text" className="form-control" placeholder="Name" name="name"
                                                                value={this.state.user.name}
                                                                onChange={this.handleChange} />
                                                        ) : (<p> {user.name} </p>)}
                                                    </div>

                                                    <div className="form-group col-12">
                                                        <label>Email address</label>
                                                        {(this.state.update) ? (
                                                            <input id="email" type="email" className="form-control" placeholder="Email" name="email"
                                                                value={this.state.user.email}
                                                                onChange={this.handleChange} />
                                                        ) : (<p>{user.email}</p>)}
                                                    </div>

                                                    {(this.state.update) ? (
                                                        <div>
                                                            <div className="form-group col-12">
                                                                <label>Password</label>
                                                                <input id="password" type="password" className="form-control" placeholder="Password" name="password"
                                                                    value={this.state.user.password}
                                                                    onChange={this.handleChange} />
                                                            </div>

                                                            <div className="form-group col-12">
                                                                <label>Confrim password</label>
                                                                <input id="password_confirmation" type="password" className="form-control" placeholder="Confirm password" name="password_confirmation"
                                                                    value={this.state.user.password_confirmation}
                                                                    onChange={this.handleChange} />
                                                            </div>

                                                            <div className="form-bttn col-12">
                                                                <button type="submit" className="register-btn">
                                                                    Update Profile
                                                        </button>
                                                            </div>
                                                        </div>
                                                    ):""}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <UserPosts user={user}/>
                            </div>
                            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                <UserForums user={user}/>
                            </div>
                        </div>
                        
                        {this.state.showModal && (
                                <Avatar user={user} uploaded={this.uploaded} uploadSuccess={this.props.uploadSuccess}/>
                        )}

                    </div>

                </div>

            </div>
        )
    };
}

export default Profile;