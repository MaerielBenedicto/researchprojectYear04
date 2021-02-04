import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';

import { withRouter, Link } from "react-router-dom";

class PostsList extends Component {
    render(){
        const posts = this.props.posts;
        const awaitingApproval = posts.length;

        return (
            <div className="col-10 dash">
                <div className="topbar row">
                    <div className="topbar-div col-12">
                        <h4>Posts</h4>
                        <p className="float-right pb-4">Number of Posts awaiting approval: {awaitingApproval} </p> 
                    </div>
                </div>

                <div className="posts-lists col-12">
                    <div className="post-heading pt-5">
                        Under Review Queue
                    </div>
                    <div className="posts-table">
                        <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Title</th>
                            <th scope="col">Sentiment Score</th>
                            <th scope="col">Sentiment Magnitude</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        {posts.map(item => (
                        <tbody key={item.id}>
                          <tr>
                            <td ><Moment format="DD/MM/YYYY">{item.created_at}</Moment></td>
                            <td>{item.title}</td>
                            <td>{item.s_score}</td>
                            <td>{item.s_magnitude}</td>
                            <td><button><Link to={"/dashboard/post/" + item.id}>Review</Link></button></td>
                          </tr>
                        </tbody>
                         ))}
                      </table>
                   
                    </div>
                </div>
                

            </div>
        )
    };
}

export default PostsList;