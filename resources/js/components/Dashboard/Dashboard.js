import React, { Component, useState, useEffect } from 'react';
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
        this.uploadSuccess = this.uploadSuccess.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

    componentDidMount() {
        let token = this.props.user.token;

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
        if (data.status === 'approved') {
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
        //if comment is approved, remove comment from list
        if (data.status === 'approved') {
            let tempComments = this.state.comments;
            //get rid of old comment
            tempComments.splice(tempComments.findIndex(comment => comment.id == data.id), 1);
            this.setState({
                comments: tempComments
            });
        }
    }

    uploadSuccess(image){
        let token = this.props.user.token;
          axios.get('/api/user',
            { headers: { Authorization: "Bearer " + token } })
            .then((response) =>{
              console.log(response);
              localStorage.setItem("user", JSON.stringify(response.data.user));
               this.setState({user: response.data.user})
            })
            .catch(function (error) {
              console.log(error);
              if (error) {
                console.log(error);
              }
            });    
      }
    
      updateProfile(){
        let token = this.state.user.token;
          axios.get('/api/user',
            { headers: { Authorization: "Bearer " + token } })
            .then((response) =>{
              console.log(response);
              localStorage.setItem("user", JSON.stringify(response.data.user));
               this.setState({user: response.data.user})
            })
            .catch(function (error) {
              console.log(error);
              if (error) {
                console.log(error);
              }
            });
      }


    render() {
        if (this.state.isLoaded) {
            return (
                <div className="App dashboard">
                        <Sidebar  user={this.props.user} onSuccess={this.props.onSuccess}/>
                            <Route exact path="/dashboard">
                                <Home user={this.props.user} 
                                      uploadSuccess={this.props.uploadSuccess}/>
                            </Route>
                            <Route exact path="/dashboard/posts">
                                <PostsList posts={this.state.posts} />
                            </Route>
                            <Route exact path="/dashboard/comments">
                                <CommentsList comments={this.state.comments} />
                            </Route>
                            <Route exact path="/dashboard/post/:id">
                                <ReviewPost
                                    user={this.props.user}
                                    posts={this.state.posts}
                                    changeStatusSuccess={this.changePostStatusSuccess}
                                />
                            </Route>
                            <Route exact path="/dashboard/comment/:id">
                                <ReviewComment
                                    user={this.props.user}
                                    comments={this.state.comments}
                                    changeStatusSuccess={this.changeCommentStatusSuccess}
                                />
                            </Route>
                </div>
            )
        }
        else {
            //display sidebar only
            return <div> <Router><Sidebar user={this.props.user} onSuccess={this.props.onSuccess}/></Router></div>;
        }

    };
}

export default Dashboard;