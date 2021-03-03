import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import Filter from './Filter';
import PostVote from './PostVote';
import Bookmark from './Bookmark';
import SideLinkForums from './SideLinkForums';

import { FaCommentAlt, FaEdit, FaListAlt } from 'react-icons/fa';

class PostList extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            forum: {},
            isLoaded: false,
            sortby: 'Latest'
        };

        this.getPosts = this.getPosts.bind(this);
        this.changeSortby = this.changeSortby.bind(this);
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
                    console.log(error.response);
                    this.state.errors = error.response.data.errors;
                }
            });
    }

    changeSortby(sort) {
        this.setState({ sortby: sort });
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

            var filteredPosts = [];
            if (this.state.sortby === 'Latest') {
                filteredPosts = posts.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            } else if (this.state.sortby === 'Oldest') {
                filteredPosts = posts.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            } else if (this.state.sortby === 'Popular') {
                filteredPosts = posts.slice().sort((a, b) => b.upvote - a.upvote);
            }

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
                    <Filter sortby={this.state.sortby} changeSortby={this.changeSortby} />
                </div>
                <div className="forum-post-div body-m-bottom">
                    <div className="container">
                        <div className="row">
                                <div className="forum-detail col-lg-9 col-sm-12 col-xs-12 order-lg-1 order-sm-2">
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
                                    <div className="posts-rows ml-0 col-lg-9 col-md-12 col-sm-12 col-xs-12 order-sm-3 order-xs-3">
                                        {filteredPosts.map(item => (
                                            <div className="post ml-0 col-lg-12 col-md-12 col-xs-12 col-sm-12 order-md-1 order-sm-3" key={item.id}>
                                                    <div className="col-lg-12 col-md-9 col-sm-8 post-row">
                                                    <img src={(item.user.image !== 'image.jpg' || undefined) ? ('../uploads/' + item.user.image) : 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png'} />
                                                        <span> {item.user.name}</span>
                                                        <PostVote
                                                            postId={item.id}
                                                            user={this.props.user}
                                                            voted={this.getPosts}
                                                            item_upvote={item.upvote}
                                                            item_voted={item.voted}
                                                        />
                                                    </div>
                                                        <div className="col-10 offset-1">
                                                            <div className="post-title">
                                                                <Link to={{
                                                                    pathname: `/posts/${item.id}`,
                                                                    state: { post: item }}} >
                                                                    {item.title}
                                                                </Link>
                                                            </div>
                                                            <div className="post-body">
                                                                {item.body}
                                                            </div>
                                                            <FaCommentAlt className="icon" />{item.comments.length} <span className="pr-2">Comments</span>
                                                            <Bookmark
                                                                user={this.props.user}
                                                                id={item.id}
                                                                bookmarked={item.bookmarked}
                                                                post_bookmark={true}
                                                                AddbookmarkSuccess={this.props.AddbookmarkSuccess}
                                                                RemovebookmarkSuccess={this.props.RemovebookmarkSuccess}
                                                            />

                                                            {(this.props.user && this.props.user.id === item.user.id) ? (
                                                                <Link to={{
                                                                    pathname: '/submit-post/' + this.props.match.params.forumId,
                                                                    state: {
                                                                        forumId: this.props.match.params.forumId,
                                                                        postId: item.id,
                                                                        title: item.title,
                                                                        body: item.body,
                                                                        mode: 'edit'
                                                                    }
                                                                }} >
                                                                    <button className="bookmark-bttn"> <FaEdit className="icon" />Edit</button>
                                                                </Link>
                                                            ) : ''}
                                                        </div>
                                            </div>

                                        ))}
                                    </div>
                                )}
                                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 order-sm-1 order-md-1">
                                <Link to={{
                                    pathname: '/submit-post/' + this.props.match.params.forumId,
                                    state: {
                                        forumId: this.props.match.params.forumId
                                    }
                                }} >
                                    <button className="forum-bttn btn-primary">Start a new discussion</button>
                                </Link>
                                {/* <div className="col-lg-3"> */}
                                {/* <SideLinkForums
                                    forums={this.props.forums}
                                /> */}
                            {/* </div> */}
                                </div>                            
                        </div>
                    </div>
                </div>
            </div>

        )
    };
}

export default withRouter(PostList);