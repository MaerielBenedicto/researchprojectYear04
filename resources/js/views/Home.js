import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import Filter from '../components/Filter';
import PostVote from '../components/PostVote';
import Bookmark from '../components/Bookmark';
import SideLinkForums from '../components/SideLinkForums';
import Pagination from '../components/Pagination';

import { FaCommentAlt, FaEdit, FaListAlt, FaEllipsisV, FaTrashAlt } from 'react-icons/fa';
import Moment from 'react-moment';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: props.posts,
            sortby: 'Latest',
            search: null,
            currentPage: 1,
            postsPerPage: 25
        };

        this.changeSortby = this.changeSortby.bind(this);
        this.delete = this.delete.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.paginate = this.paginate.bind(this);
    }

    //change page
    paginate(number) {
        this.setState({
            currentPage: number
        });
    }

    delete(post) {
        let token = this.props.user.token;
        axios.delete('/api/posts/' + post.id,
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then(response => {
                // console.log(response);
                this.props.getPosts();
                this.props.history.push('/');
            })
            .catch(function (error) {
                if (error) {
                    console.log(error);
                    this.setState({
                        errors: error
                    });
                }
            });
    }

    changeSortby(sort) {
        this.setState({ sortby: sort });
    }

    //set author state
    onSearchChange(e) {
        const search = e.target.value;
        this.setState({ search: search });
    }

    render() {
        const user = this.props.user;
        const posts = this.props.posts;
        const bookmarks = this.props.bookmarks;

        if (posts !== undefined) {
            var filteredPosts = [];
            if (this.state.sortby === 'Latest') {
                filteredPosts = posts.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            } else if (this.state.sortby === 'Oldest') {
                filteredPosts = posts.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
            } else if (this.state.sortby === 'Popular') {
                filteredPosts = posts.slice().sort((a, b) => b.upvote - a.upvote);
            }


            filteredPosts = filteredPosts.filter(post =>
                (this.state.search === null) || (post.title.includes(this.state.search)) ||
                (post.body.includes(this.state.search))
            );

            //youtube = https://www.youtube.com/watch?v=IYCa1F-OWmk&ab_channel=TraversyMedia
            const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
            const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
            const currentFilteredPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

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

                //check if user have voted post
                currentFilteredPosts.filter((post, i) => {
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

                    <div className="container">
                        <div className="row ml-0" >
                            <div className="col-lg-9">
                                {/* <div className="posts-rows ml-0 col-lg-9 col-md-12 col-sm-12 col-xs-12 order-sm-3 order-xs-3"> */}
                                {currentFilteredPosts.map(post => (
                                    <div className={'post-detail col-lg-11 col-sm-12 py-3 '} key={post.id}>
                                        <div className="row">
                                            <div className="col-1">
                                                <img src={(post.user.image !== 'image.jpg' || undefined) ? ('uploads/' + post.user.image) : 'https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png'} />
                                            </div>
                                            <div className="col-10 post-user-deet">
                                                <div>
                                                    <span> {post.user.name}</span>
                                                    <p>
                                                        <strong>Posted on: </strong>
                                                        <Link to={`/forums/${post.forum.id}`}>
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
                                                    voted={this.props.getPosts}
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
                                                            <button className="dropdown-item drop-down-link" onClick={() => this.delete(post)}>
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
                            <div className="col-lg-3  side-link">
                                <SideLinkForums
                                    forums={this.props.forums}
                                />
                            </div>

                        </div>
                        {/* </div> */}
                        <Pagination postsPerPage={this.state.postsPerPage} totalPosts={posts.length} paginate={this.paginate} />
                    </div>
                </div>
            )
        } else {
            return null;
        }

    };
}

export default withRouter(Home);