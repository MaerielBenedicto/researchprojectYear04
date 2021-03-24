import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import UserForums from '../components/UserForums';
import UserPosts from '../components/UserPosts';
import Avatar from '../components/Modal/Avatar';

import {FaUserEdit, FaWindowClose} from 'react-icons/fa';
import BookmarkLists from '../components/BookmarkLists';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.user.name, 
            email: props.user.email,
            password: '',
            password_confirmation: '',
            user: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.uploaded = this.uploaded.bind(this);
        
    }

    handleSubmitForm(e) {
        //prevent from reloading page
        e.preventDefault();

        //
        axios.post('/api/profile/' + this.props.user.id, {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        }, 
        { headers: { Authorization: "Bearer " + this.props.user.token } 
        })
            .then((response) => {
                console.log(response.data);
                this.props.updateProfile(response.data.user);
                this.setState({update: false});
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

        //if user.image is not set to the default
        const avatar = (user.image !== 'image.jpg' || undefined) ? ('uploads/' + user.image) : 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png';

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
                                <a href="#forums-tab" className="nav-link" id="forums-tab" data-toggle="tab" data-target="#forums" type="button" role="tab" aria-controls="forums" aria-selected="false">Forums</a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <a href="#posts-tab" className="nav-link" id="posts-tab" data-toggle="tab" data-target="#posts" type="button" role="tab" aria-controls="posts" aria-selected="false">Posts</a>
                            </li>
                            {/* <li className="nav-item" role="presentation">
                                <a href="#comments-tab" className="nav-link" id="comments-tab" data-toggle="tab" data-target="#comments" type="button" role="tab" aria-controls="comments" aria-selected="false">Comments</a>
                            </li> */}
                            <li className="nav-item" role="presentation">
                                <a href="#bookmarks-tab" className="nav-link" id="bookmarks-tab" data-toggle="tab" data-target="#bookmarks" type="button" role="tab" aria-controls="bookmarks" aria-selected="false">Bookmarks</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row profile">
                                    <div className="col-2 profile-avatar">
                                    <img src={(user.image !== 'image.jpg' || undefined) ? ('uploads/' + user.image) : 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png'} />
                                        
                                        <div><button onClick={()=> this.setState({showModal: true})}className="edit-avatar-bttn btn-primary">Edit avatar</button></div>
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
                                                                value={this.state.name}
                                                                onChange={this.handleChange} />
                                                        ) : (<p> {user.name} </p>)}
                                                    </div>

                                                    <div className="form-group col-12">
                                                        <label>Email address</label>
                                                        {(this.state.update) ? (
                                                            <input id="email" type="email" className="form-control" placeholder="Email" name="email"
                                                                value={this.state.email}
                                                                onChange={this.handleChange} />
                                                        ) : (<p>{user.email}</p>)}
                                                    </div>
                                                    
                                                    {/* UPDATE PROFILE */}
                                                    {(this.state.update) ? (
                                                        <div>
                                                            <div className="form-group col-12">
                                                                <label>Password</label>
                                                                <input id="password" type="password" className="form-control" placeholder="Password" name="password"
                                                                    value={this.state.password}
                                                                    onChange={this.handleChange} />
                                                            </div>

                                                            <div className="form-group col-12">
                                                                <label>Confrim password</label>
                                                                <input id="password_confirmation" type="password" className="form-control" placeholder="Confirm password" name="password_confirmation"
                                                                    value={this.state.password_confirmation}
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
                            <div className="tab-pane fade" id="forums" role="tabpanel" aria-labelledby="forums-tab">
                                <UserForums user={user}/>
                            </div>
                            <div className="tab-pane fade" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <UserPosts user={user}/>
                            </div>
                            {/* <div className="tab-pane fade" id="comments" role="tabpanel" aria-labelledby="comments-tab">
                                <UserPosts user={user}/>
                            </div> */}
                            <div className="tab-pane fade" id="bookmarks" role="tabpanel" aria-labelledby="bookmarks-tab">
                                <BookmarkLists 
                                    user={user} 
                                    posts_bookmarks={this.props.posts_bookmarks}
                                    forums_bookmarks={this.props.forums_bookmarks}
                                />
                            </div>
                            
                        </div>
                        
                        {/* UPLOAD IMAGE  */}
                        {this.state.showModal && (
                                <Avatar user={user} 
                                        uploaded={this.uploaded} 
                                        uploadSuccess={this.props.uploadSuccess}
                                        showModal={this.state.showModal}
                                        closeModal={()=> this.setState({showModal: false})}
                                />
                        )}

                    </div>

                </div>

            </div>
        )
    };
}

export default withRouter(Profile);