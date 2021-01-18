import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Sidebar from './Sidebar';
import PostsList from './PostsList';
import ReviewPost from './ReviewPost';

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
                            <PostsList />
                        </Route>
                        <Route exact path="/dashboard/review">
                            <ReviewPost />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    };
}

export default Dashboard;