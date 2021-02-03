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
        };
    }

    componentDidMount(){
       
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
                            <PostsList />
                        </Route>
                        <Route exact path="/dashboard/comments">
                            <CommentsList />
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