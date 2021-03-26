import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import { FaTrashAlt, FaEllipsisH, FaEdit, FaCommentAlt } from 'react-icons/fa';
import Moment from 'react-moment';
import DeleteConfirmation from './Modal/DeleteConfirmation';

class UserForums extends Component {
    constructor() {
        super();
        this.state = {
            forums: [],
            showModal: false
        };

        this.delete = this.delete.bind(this);
        this.forums = this.forums.bind(this);
    }

    componentDidMount() {
        this.forums();
    }

    forums() {
        //get user forums
        let token = this.props.user.token;
        axios.get('/api/profile/' + this.props.user.id + '/forums',
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then(response => {
                this.setState({
                    forums: response.data
                });
            })
            .catch(function (error) {
                if (error) {
                    console.log(error.response);
                    this.state.errors = error.response.data.errors;
                }
            });
    }

    delete() {
        console.log("DELETE");
        let token = this.props.user.token;
        axios.delete('/api/forums/' + this.state.item,
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then(response => {
                console.log(response);
                this.forums();
            })
            .catch(function (error) {
                if (error) {
                    console.log(error);
                    this.state.errors = error.response.data.errors;
                }
            });
    }

    render() {
        const forums = this.state.forums;
        const user = this.props.user;
        return (
            <div className="mt-2 body-m-bottom">
                <div className="container">
                    <div className="row">

                        <div className="posts-table col-lg-9">
                            {forums.length === 0 && (
                                <div className="p-4"><p> You currently do not have any forums!</p></div>
                            )}
                            <table className="table table-bordered">

                                {forums.map(item => (
                                    <tbody key={item.id}>
                                        <tr>
                                            <td>
                                                <div>
                                                    <Link to={`/forums/${item.id}`}>
                                                        <h4>{item.topic}</h4>
                                                    </Link>
                                                    <p><span>Posted on: <Moment format="DD/MM/YYYY">{item.created_at}</Moment></span></p>

                                                    <p>{item.description}</p>
                                                    <div className="row">
                                                        <div className="dropdown show col-6">
                                                            <FaCommentAlt className="icon ml-0" /> {item.postsCount} <span className="p-0">Posts</span>
                                                            <a className="btn actions-btn dropdown" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <FaEllipsisH className="icon" />
                                                            </a>

                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                                <button className="dropdown-item drop-down-link edit-bttn">
                                                                    <Link to={{
                                                                        pathname: '/forums',
                                                                        state: {
                                                                            forumId: item.id,
                                                                            topic: item.topic,
                                                                            description: item.description,
                                                                            mode: 'edit'
                                                                        }
                                                                    }}>
                                                                        <span className="bttn"><FaEdit className="icon" />Edit</span>
                                                                    </Link>
                                                                </button>
                                                                <button className="dropdown-item drop-down-link" onClick={()=> this.setState({showModal: true, item: item.id})} >
                                                                    <span><FaTrashAlt className="icon" />  Delete </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </table>

                        </div>
                        <div className="col">
                            <Link to={{
                                pathname: '/forums',
                                state: {}
                            }}>
                                <button className="forum-bttn btn-primary">Create a new Forum topic</button>
                            </Link>
                        </div>
                    </div>
                    
                    {/* DELETE FORUM */}
                    {this.state.showModal && (
                        <DeleteConfirmation 
                            user={user}
                            item={"forum"}
                            delete={this.delete}
                            showModal={this.state.showModal}
                            closeModal={() => this.setState({ showModal: false })}
                        />
                    )}

                </div>

            </div>
        )
    };
}

export default UserForums;