import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

//components
import AddComment from '../AddComment';
import Comments from '../Comments';
import PostVote from '../PostVote';
import Bookmark from '../Bookmark';
import SideLinkForums from '../SideLinkForums';
import DeleteConfirmation from '../Modal/DeleteConfirmation';

//moment
import Moment from 'react-moment';
//icons
import { FaEdit, FaTrashAlt, FaCommentAlt, FaEllipsisV, FaRegWindowClose } from 'react-icons/fa';


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            comments: [],
            isLoaded: false,
            sortby: 'Latest',
            showModal: false
        };

        this.comments = this.comments.bind(this);
        this.delete = this.delete.bind(this);
        this.getPost = this.getPost.bind(this);
        this.updateSuccess = this.updateSuccess.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    componentDidMount() {
        this.getPost();
        this.comments();
    }

    getPost() {
        axios.get('/api/posts/' + this.props.match.params.id)
            .then(response => {
                if (response.data.data.action === "under review") {
                    this.setState({
                        hide: true
                    });
                }
                this.setState({
                    post: response.data.data,
                    isLoaded: true
                });
            })
            .catch(function (error) {
                if (error) {
                    console.log(error);
                    this.setState({errors: error.response.data.errors});
                }
            });
    }

    comments() {
        axios.get('/api/posts/' + this.props.match.params.id + '/comments')
            .then(response => {
                this.setState({
                    comments: response.data.data
                });
            })
            .catch(function (error) {
                if (error) {
                    console.log(error);
                    this.setState({errors: error.response.data.errors});
                }
            });
    }

    delete() {
        let token = this.props.user.token;
        axios.delete('/api/posts/' + this.props.match.params.id,
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then(response => {
                // console.log(response);
                this.props.history.push('/forums/' + this.state.post.forum_id);
            })
            .catch(function (error) {
                if (error) {
                    console.log(error);
                    this.setState({errors: error.response.data.errors});
                }
            });
    }

    updateSuccess(result) {
        let tempComments = this.state.comments;
        //get rid of old comment
        tempComments.splice(tempComments.findIndex(comment => comment.id == result.id), 1);
        //add updated comment
        tempComments.unshift(result);
        this.setState({
            comments: tempComments
        });
    }

    addComment(comment) {
        let tempComments = this.state.comments;

        //push comment in the beginning of the array
        tempComments.unshift(comment);
        this.setState({
            comments: tempComments
        });
    }

    render() {
        if (this.state.isLoaded) {
            const forums = this.props.forums;

            const addClass = this.state.hide ? 'hide-post' : '';
            const hideClass = this.state.hide ? '' : 'removeWarning';
            const user = this.props.user;
            const post = this.state.post;
            var comments = this.state.comments;
            const bookmarks = this.props.bookmarks;

            if (user) {
                if (post.post_vote.length >= 1) {
                    post.post_vote.map((vote) => {
                        if (vote.user_id == user.id) {
                            if (vote.vote == 1) {
                                post.voted = true;
                            } else if (vote.vote == -1) {
                                post.voted = false;
                            } else {
                                post.voted = null;
                            }
                            return post;
                        }
                    });
                }

                //check if user have voted comment
                comments.filter((comment, i) => {
                    if (comment.comment_vote.length >= 1) {
                        return comment.comment_vote.map((vote) => {
                            if (vote.user_id == user.id) {
                                if (vote.vote == 1) {
                                    comment.voted = true;
                                } else if (vote.vote == -1) {
                                    comment.voted = false;
                                } else {
                                    comment.voted = null;
                                }
                                return comment;
                            }
                        })
                    }
                });

                 //set bookmarked post
                    if (bookmarks.map(bookmark => bookmark.id === post.id)) {
                        post.bookmarked = true;
                    } else {
                        post.bookmarked = false;
                    }
            }
            

            return (
                <div className="body-m-top body-m-bottom">
                    <div className="container">
                        <div className="row ml-0">
                            <div className="col-9">
                                <div className="row">
                                    <div className={'post-detail col-lg-12 col-sm-12 py-3 order-1' + addClass} style={{ height: 100 + '%' }}>
                                        <div className="row">
                                            <div className="col-1">
                                                <img src={(post.user.image !== 'image.jpg' || undefined) ? ('../uploads/' + post.user.image) : 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png'} />
                                            </div>
                                            <div className="col-10 post-user-deet">
                                                <div>
                                                    <span> {post.user.name}</span>
                                                    <p>
                                                        <strong>Posted on: </strong>
                                                        <Link to={`/forums/${post.forum_id}`}>
                                                            {post.forum.topic}
                                                        </Link>&nbsp;
                                                        <strong>|</strong> &nbsp;
                                                        <Moment format="LL">{post.created_at}</Moment>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-1 vote-div pl-0">
                                                <PostVote
                                                    postId={post.id}
                                                    user={user}
                                                    voted={this.getPost}
                                                    item_upvote={post.upvote}
                                                    item_voted={post.voted}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-11 offset-1 post-body-div">
                                                <h4>{post.title}</h4>
                                                <p>{post.body}</p>
                                                <FaCommentAlt className="icon ml-0" /> {this.state.comments.length} <span className="p-0">Comments</span>
                                                <Bookmark
                                                    user={this.props.user}
                                                    id={post.id}
                                                    bookmarked={post.bookmarked}
                                                    post_bookmark={true}
                                                    AddbookmarkSuccess={this.props.AddbookmarkSuccess}
                                                    RemovebookmarkSuccess={this.props.RemovebookmarkSuccess}
                                                />
                                                {(user && user.id === post.user.id) ? (
                                                    <div className="dropdown show float-right">
                                                        <a className="btn actions-btn dropdown" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <FaEllipsisV className="icon" />
                                                        </a>

                                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                            <button className="dropdown-item drop-down-link edit-bttn">
                                                                <Link to={{
                                                                    pathname: '/submit-post/' + this.props.match.params.id,
                                                                    state: {
                                                                        forumId: post.forum_id,
                                                                        postId: this.props.match.params.id,
                                                                        title: post.title,
                                                                        body: post.body,
                                                                        mode: 'edit'
                                                                    }
                                                                }} >
                                                                    <span className="bttn"><FaEdit className="icon" />Edit</span>
                                                                </Link>
                                                            </button>
                                                            <button className="dropdown-item drop-down-link" onClick={()=> this.setState({showModal: true})}>
                                                                <span><FaTrashAlt className="icon" />  Delete </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : ''}
                                            </div>
                                        </div>

                                    </div>
                                    <div className={" " + hideClass}>
                                        <div className={'col-lg-12 warning-div'}>
                                            <div>
                                                <button className="close-bttn float-right" onClick={() => this.setState({ hide: false })}><FaRegWindowClose /></button>
                                            </div>
                                            <div>
                                                <p className="warning-text">This post is currently under review as it may contain abusive language.
                                        You are the only one that can view this post. Edit this post or wait for admin approval. </p>
                                            </div>
                                        </div>
                                    </div>

                                    {post.action !== 'under review' && (
                                        <div className="col-lg-12 order-2 p-0">
                                            <Comments
                                                comments={comments}
                                                postId={this.props.match.params.id}
                                                user={user}
                                                getComments={this.comments}
                                                // addComment={this.addComment}
                                                addComment={this.comments}
                                                updateComment={this.updateSuccess}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-lg-3 order-3 side-link">
                                <SideLinkForums
                                    forums={this.props.forums}
                                />
                            </div>
                        </div>

                        {/* DELETE POST */}
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
        }
        else {
            return null;
        }
    };
}

export default withRouter(Post);