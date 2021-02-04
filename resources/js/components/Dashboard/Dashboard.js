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
    constructor(){
        super();
        this.state = {
            posts: [],
            comments: []
        };

        this.posts = this.posts.bind(this);
        this.comments = this.comments.bind(this);

    }

    componentDidMount(){
       this.posts();
       this.comments();
    }

    posts(){
        let token = localStorage.getItem('token');
        axios.get('/api/posts', 
        {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            console.log(response);
            const posts = response.data;
            this.setState({
                posts: posts
            });
          })
        .catch(function(error) {
            console.log(error);
            if(error){
                console.log(error);
            } 
        });
    }

    comments(){
        let token = localStorage.getItem('token');
        axios.get('/api/comments', 
        {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            console.log(response);
            const comments = response.data;
            this.setState({
                comments: comments
            });
          })
        .catch(function(error) {
            console.log(error);
            if(error){
                console.log(error);
            } 
        });
    }

    render(){
        return (
            <div className="App dashboard">
                <Router>
                    <Sidebar />
                    <Switch>
                    <Route exact path="/dashboard">
                            <Home />
                        </Route>
                        <Route exact path="/dashboard/posts">
                            <PostsList posts={this.state.posts}/>
                        </Route>
                        <Route exact path="/dashboard/comments">
                            <CommentsList comments={this.state.comments}/>
                        </Route>
                        <Route exact path="/dashboard/post/:id">
                            <ReviewPost />
                        </Route>
                        <Route exact path="/dashboard/comment/:id">
                            <ReviewComment />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    };
}

export default Dashboard;