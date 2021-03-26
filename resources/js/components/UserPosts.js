import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import { FaTrashAlt, FaEllipsisH, FaEdit, FaCommentAlt } from 'react-icons/fa';
import Moment from 'react-moment';
import DeleteConfirmation from './Modal/DeleteConfirmation';

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

    delete() {
        let token = this.props.user.token;
        axios.delete('/api/posts/' + this.state.item,
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
        const user = this.props.user;

        const underReview = posts.filter((post => {
            if (post.action == 'under review') {
                return post;
            }
        }));

        return (
            <div className="mt-2 body-m-bottom">
                <div className="container">
                    <div className="row">

                        <div className="posts-table col-lg-9">
                            {posts.length === 0 && (
                                <div className="p-4"><p> You currently do not have any posts!</p></div>
                            )}
                            <table className="table table-bordered">

                                {posts.map(item => (
                                    <tbody key={item.id}>
                                        <tr>
                                            <td>
                                                <div>
                                                    {/* <h4>{item.title}</h4> */}
                                                    <Link to={{
                                                        pathname: `/posts/${item.id}`,
                                                        state: {
                                                            post: item,
                                                            prevPath: location.pathname
                                                        }
                                                    }} ><h4>{item.title}</h4></Link>
                                                    {item.action == 'under review' && (
                                                        <span className="warning-status"> Under Review</span>
                                                    )}
                                                    <p><span>Forum: {item.forum.topic}</span> | Posted on: <Moment format="DD/MM/YYYY">{item.created_at}</Moment></p>
                                                    <div className="row">
                                                        <div className="dropdown show col-6">
                                                            <FaCommentAlt className="icon ml-0" /> {item.comments.length} <span className="p-0">Comments</span>
                                                            <a className="btn actions-btn dropdown" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <FaEllipsisH className="icon" />
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
                                                                <button className="dropdown-item drop-down-link"  onClick={()=> this.setState({showModal: true, item: item.id})}>
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
                        <div className="col-lg-3 approval-list">
                            <p> Waiting for Approval:</p>

                            <p> {underReview.length} Posts</p>
                        </div>
                    </div>

                    {/* DELETE FORUM */}
                    {this.state.showModal && (
                        <DeleteConfirmation 
                            user={user}
                            item={"post"}
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

export default withRouter(UserPosts);