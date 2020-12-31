import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Posts from '../components/Posts';

class Home extends Component {
    render(){
        return (
            <div className="container">
                <div>
                    <h1> Home </h1>
                    <Posts />
                </div>
            </div>
        )
    };
}

export default Home;