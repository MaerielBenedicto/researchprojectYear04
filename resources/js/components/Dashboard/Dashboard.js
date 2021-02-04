import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Sidebar from './Sidebar';
import PostsList from './PostsList';
import ReviewPost from './ReviewPost';
import CommentsList from './CommentsList';
import Home from './Home';
import ReviewComment from './ReviewComment';


class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            comments: [],
            isLoaded: false
        };
        this.changePostStatusSuccess = this.changePostStatusSuccess.bind(this);
        this.changeCommentStatusSuccess = this.changeCommentStatusSuccess.bind(this);
    }

    componentDidMount() {
        let token = localStorage.getItem('token');

        axios.all([
            axios.get('/api/posts',
                { headers: { Authorization: "Bearer " + token } }),
            axios.get('/api/comments',
                { headers: { Authorization: "Bearer " + token } })
        ])
            .then(axios.spread((posts, comments) => {
                console.log('posts', posts);
                console.log('comments', comments);
                const postsData = posts.data;
                const commentsData = comments.data;
                this.setState({
                    posts: postsData,
                    comments: commentsData,
                    isLoaded: true
                });
            }))
            .catch(function (error) {
                console.log(error);
                if (error) {
                    console.log(error);
                }
            });
    }

    changePostStatusSuccess(data) {
        console.log('data', data);
        //if post is approved, remove post from list
        if(data.status === 'approved'){
            let tempPosts = this.state.posts;
            //get rid of old post
            tempPosts.splice(tempPosts.findIndex(post => post.id == data.id), 1);
            this.setState({
                posts: tempPosts
            });
        }
    }

    changeCommentStatusSuccess(data) {
        console.log('data', data);
        //if post is approved, remove post from list
        if(data.status === 'approved'){
            let tempComments = this.state.comments;
            //get rid of old post
            tempComments.splice(tempComments.findIndex(comment => comment.id == data.id), 1);
            this.setState({
                comments: tempComments
            });
        }
    }


    render() {
        if (this.state.isLoaded) {
            return (
                <div className="App dashboard">
                    <Router>
                        <Sidebar />
                        <Switch>
                            <Route exact path="/dashboard">
                                <Home />
                            </Route>
                            <Route exact path="/dashboard/posts">
                                <PostsList posts={this.state.posts} />
                            </Route>
                            <Route exact path="/dashboard/comments">
                                <CommentsList comments={this.state.comments} />
                            </Route>
                            <Route exact path="/dashboard/post/:id">
                                <ReviewPost
                                    posts={this.state.posts}
                                    changeStatusSuccess={this.changePostStatusSuccess}
                                />
                            </Route>
                            <Route exact path="/dashboard/comment/:id">
                                <ReviewComment 
                                    comments={this.state.comments} 
                                    changeStatusSuccess={this.changeCommentStatusSuccess}    
                                />
                            </Route>
                        </Switch>
                    </Router>
                </div>
            )
        }
        else {
            return <div> <Router><Sidebar /></Router></div>;
        }

    };
}

export default Dashboard;