import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import {FaTrashAlt, FaEllipsisV, FaEdit} from 'react-icons/fa';
import Moment from 'react-moment';

class UserPosts extends Component {
    constructor() {
        super();
        this.state = {
            posts: []
        };

        this.delete = this.delete.bind(this);
        this.posts = this.posts.bind(this);
    }

    componentDidMount() {
        this.posts();
    }

    posts() {
        //get user forums
        let token = this.props.user.token;
        axios.get('/api/profile/' + this.props.user.id + '/posts',
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then(response => {
                this.setState({
                    posts: response.data,
                    isLoaded: true
                });
            })
            .catch(function (error) {
                if (error) {
                    console.log(error);
                    this.state.errors = error.response.data.errors;
                }
            });
    }

    delete(id) {
        let token = this.props.user.token;
        axios.delete('/api/posts/' + id,
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then(response => {
                console.log(response);
                this.posts();
                // this.props.history.push('/forums/'+ this.state.post.forum_id);   
            })
            .catch(function (error) {
                if (error) {
                    console.log(error);
                    this.state.errors = error.response.data.errors;
                }
            });
    }

    render() {

        const posts = this.state.posts;
        return (
            <div className="mt-2">
                <div className="container">
                    <h4>POSTS</h4>

                    <div className="posts-table">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Body</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            {posts.map(item => (
                                <tbody key={item.id}>
                                    <tr>
                                        <td ><Moment format="DD/MM/YYYY">{item.created_at}</Moment></td>
                                        <td>{item.title}</td>
                                        <td>{item.body}</td>

                                        <td>
                                            <div className="dropdown show">
                                                <a className="btn actions-btn dropdown" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <FaEllipsisV className="icon" />
                                                </a>

                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    <button className="dropdown-item drop-down-link edit-bttn">
                                                        <Link to={{
                                                            pathname: '/submit-post/' + item.forum_id,
                                                            state: {
                                                                forumId: item.forum_id,
                                                                postId: item.id,
                                                                title: item.title,
                                                                body: item.body,
                                                                mode: 'edit'
                                                            }
                                                        }} >
                                                            <span className="bttn"><FaEdit className="icon" />Edit</span>
                                                        </Link>
                                                    </button>
                                                    <button className="dropdown-item drop-down-link"onClick={() => this.delete(item.id)}>
                                                        <span><FaTrashAlt className="icon" />  Delete </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>


                    {this.state.posts.map(item => (
                        <div className="post" key={item.id}>
                            <div className="post-title">
                                <Link to={`/posts/${item.id}`} >
                                    {item.title}
                                </Link>
                            </div>

                            <div className="post-body">
                                {item.body}
                            </div>

                            <Link to={{
                                pathname: '/submit-post/' + item.forum_id,
                                state: {
                                    forumId: item.forum_id,
                                    postId: item.id,
                                    title: item.title,
                                    body: item.body,
                                    mode: 'edit'

                                }
                            }} >

                                <button className="bttn">Edit</button>
                            </Link>
                            <button className="bttn float-right" onClick={() => this.delete(item.id)}>Delete</button>
                        </div>

                    ))}

                </div>

            </div>
        )
    };
}

export default UserPosts;