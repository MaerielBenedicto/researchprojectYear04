import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import { FaUserEdit, FaWindowClose } from 'react-icons/fa';

class Home extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        const user = this.props.user;
        const avatar = (user.image !== 'image.jpg') ? ('uploads/' + user.image) : 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png';

        return (
            <div className="col-10 dash">
                <div className="topbar row">
                    <div className="topbar-div col-12">
                        <div className="row">
                            <div className="col-6">
                                <h4>Profile</h4>
                            </div>
                        </div>
                        <div className="row pt-5">
                            <div className="col-12 profile">
                                <div className="row">

                                <div className="col-3 profile-avatar">
                                    <img src={avatar} />

                                    <div><button onClick={() => this.setState({ showModal: true })} className="edit-avatar-bttn">Edit avatar</button></div>
                                </div>
                                <div className="profile-div col-5">
                                    <div className="profile-heading">
                                        <h4>Account information
                                                {this.state.update && (
                                                <button onClick={() => this.setState({ update: false })} className="float-right">
                                                    <FaWindowClose className="icon" />
                                                </button>
                                            )}

                                            <button onClick={() => this.setState({ update: true })} className="float-right">
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
                                                ) : ""}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default Home;