import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

/* Components */
import Filter from './Filter';
import PostVote from './PostVote';
import Bookmark from './Bookmark';
import SideLinkPosts from './SideLinkPosts';
import Moment from 'react-moment';
import DeleteConfirmation from './Modal/DeleteConfirmation';

/* Icons */
import { FaCommentAlt, FaEdit, FaListAlt, FaEllipsisV, FaTrashAlt } from 'react-icons/fa';

class PostList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            forum: {},
            isLoaded: false,
            sortby: 'Latest',
            search: null,
            showModal: false,
        };

        this.getPosts = this.getPosts.bind(this);
        this.changeSortby = this.changeSortby.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts() {
        //get posts in a forum
        axios.get('/api/forums/' + this.props.match.params.forumId)
            .then(response => {
                // console.log(response);
                this.setState({
                    posts: response.data.data,
                    isLoaded: true
                });
            })
            .catch(function (error) {
                if (error) {
                    this.setState({ errors: error.response.data.errors });
                }
            });
    }

    changeSortby(sort) {
        this.setState({ sortby: sort });
    }

    //set search state
    onSearchChange(e) {
        const search = e.target.value;
        this.setState({ search: search });
    }

    //delete post 
    delete() {
        let token = this.props.user.token;
        axios.delete('/api/posts/' + this.state.item.id,
            { headers: { Authorization: "Bearer " + token } })
            .then(response => {
                // console.log(response);
                this.getPosts();
            })
            .catch(function (error) {
                if (error) {
                    console.log(error);
                    this.setState({ errors: error.response.data.errors });
                }
            });
    }


    render() {
        const user = this.props.user;
        const forum_id = parseInt(this.props.match.params.forumId);
        const forums = this.props.forums;
        const bookmarks = this.props.bookmarks;
        const votes = this.props.pvotes;

        //get forum with the forum_id
        const forum = forums.find(forum => forum.id === forum_id);

        if (this.state.isLoaded) {
            const posts = this.state.posts;

            //filter posts by: latest, oldest and popular
            var filteredPosts = [];
            if (this.state.sortby === 'Latest') {
                filteredPosts = posts.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            } else if (this.state.sortby === 'Oldest') {
                filteredPosts = posts.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            } else if (this.state.sortby === 'Popular') {
                filteredPosts = posts.slice().sort((a, b) => b.upvote - a.upvote);
            }

            //filter post by search: words
            filteredPosts = filteredPosts.filter(post =>
                (this.state.search === null) || (post.title.includes(this.state.search)) ||
                (post.body.includes(this.state.search))
            );

            if (user) {
                //set bookmarked posts
                filteredPosts = filteredPosts.map((post, i) => {
                    if (bookmarks.some(bookmark => bookmark.id === post.id)) {
                        post.bookmarked = true;
                    } else {
                        post.bookmarked = false;
                    }
                    return post;
                });
            }

            if (user) {
                //check if user have voted post
                filteredPosts.filter((post, i) => {
                    if (post.post_vote.length > 1) {
                        return post.post_vote.map((vote) => {
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
                        })
                    }
                });
            }
        }
        return (
            <div>
                <div className="col-12">
                    <Filter
                        sortby={this.state.sortby}
                        changeSortby={this.changeSortby}
                        onSearchChange={this.onSearchChange}
                        search={this.state.search}
                    />
                </div>
                {/* <div className="forum-post-div body-m-bottom"> */}
                <div className="container body-m-bottom">
                    <div className="row ml-0 p-3">
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="forum-detail col-lg-11 col-sm-12 col-xs-12 order-lg-1 order-sm-2">
                                    <div className="row">
                                        <div className="col-lg-10 col-sm-12 col-md-12 ">
                                            <h4 className="title">{forum.topic}</h4>
                                            <p>{forum.description}</p>
                                        </div>
                                        <div className="col-lg-2 col-md-12 col-sm-12  numpost">
                                            <FaListAlt className="icon post-icon" /> {forum.postsCount} posts
                                        </div>
                                    </div>
                                </div>

                                {this.state.isLoaded && (
                                    <div className="posts-rows ml-0 col-lg-11 col-md-12 col-sm-12 col-xs-12 order-3 order-sm-3 order-xs-3">
                                        {filteredPosts.map(post => (
                                            <div className={'post-detail col-lg-12 col-sm-12 py-3 '} key={post.id}>
                                                <div className="row">
                                                    <div className="col-1">
                                                        <img src={(post.user.image !== 'image.jpg' || undefined) ? ('../uploads/' + post.user.image) : 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png'} />
                                                    </div>
                                                    <div className="col-10 post-user-deet">
                                                        <div>
                                                            <span> {post.user.name}</span>
                                                            <p>
                                                                <strong>Posted on: </strong>
                                                                <Link to={`/forums/${forum.id}`}>
                                                                    {forum.topic}
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
                                                            voted={this.getPosts}
                                                            item_upvote={post.upvote}
                                                            item_voted={post.voted}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-11 offset-1 post-body-div">
                                                        <h4>
                                                            <Link to={{
                                                                pathname: `/posts/${post.id}`,
                                                                state: { post: post }
                                                            }}>
                                                                {post.title}
                                                            </Link>
                                                        </h4>

                                                        <p>{post.body}</p>
                                                        <FaCommentAlt className="icon ml-0" /> {post.comments.length} <span className="p-0">Comments</span>
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
                                                                            pathname: '/submit-post/' + post.forum_id,
                                                                            state: {
                                                                                forumId: post.forum_id,
                                                                                postId: post.id,
                                                                                title: post.title,
                                                                                body: post.body,
                                                                                mode: 'edit'
                                                                            }
                                                                        }} >
                                                                            <span className="bttn"><FaEdit className="icon" />Edit</span>
                                                                        </Link>
                                                                    </button>
                                                                    <button className="dropdown-item drop-down-link" onClick={() => this.setState({ showModal: true, item: post })}>
                                                                        <span><FaTrashAlt className="icon" />  Delete </span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* DELETE FORUM */}
                        {this.state.showModal && (
                            <DeleteConfirmation
                                user={user}
                                item={"post"}
                                delete={() => this.delete()}
                                showModal={this.state.showModal}
                                closeModal={() => this.setState({ showModal: false })}
                            />
                        )}


                        <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 order-sm-1 order-md-1 order-2" style={{ height: 100 + '%' }}>
                            {/* CREATE FORUM BUTTON */}
                            <Link to={{
                                pathname: '/submit-post/' + this.props.match.params.forumId,
                                state: {
                                    forumId: this.props.match.params.forumId
                                }
                            }} >
                                <button className="forum-bttn btn-primary mb-2">Start a new discussion</button>
                            </Link>

                            {/* LIST OF POPULAR POSTS */}
                            <SideLinkPosts
                                posts={this.props.posts}
                            />
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>

        )
    };
}

export default withRouter(PostList);