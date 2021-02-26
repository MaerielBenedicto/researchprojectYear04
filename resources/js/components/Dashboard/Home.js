import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import { FaUserEdit, FaWindowClose } from 'react-icons/fa';
import Avatar from '../Modal/Avatar';

class Home extends Component {
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
                        <div className="row pt-4">
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
                                                    <div className="p-0 m-0">
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

export default Home;