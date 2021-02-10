import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';
import Pagination from '../Pagination';
import { withRouter, Link } from "react-router-dom";

class CommentsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            comments: props.comments,
            loading: false,
            currentPage: 1,
            postsPerPage: 8
        }

        this.paginate = this.paginate.bind(this);
    }
    //change page
    paginate(number){
        this.setState({
            currentPage: number
        });
    }

    render(){
        const comments = this.props.comments;
        const awaitingApproval = comments.length;

        //youtube = https://www.youtube.com/watch?v=IYCa1F-OWmk&ab_channel=TraversyMedia
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentComments = comments.slice(indexOfFirstPost, indexOfLastPost);

        return (
            <div className="col-10 dash">
                <div className="topbar row">
                <div className="topbar-div col-12">
                        <div className="row">
                            <div className="col-6">
                                <h4>Comments</h4>
                            </div>
                            <div className="col-6">
                                <span className="float-right pb-4">Number of Comments awaiting approval: {awaitingApproval} </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="posts-lists col-12">
                    <div className="post-heading pt-2">
                        <h3>Under Review Queue</h3>
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
                        {currentComments.map(item => (
                        <tbody key={item.id}>
                          <tr>
                            <td ><Moment format="DD/MM/YYYY">{item.created_at}</Moment></td>
                            <td>{item.body}</td>
                            <td>{item.s_score}</td>
                            <td>{item.s_magnitude}</td>
                            <td><button className="review-button"><Link to={"/dashboard/comment/" + item.id}>Review</Link></button></td>
                          </tr>
                        </tbody>
                         ))}
                      </table>
                   
                    </div>
                </div>
                <Pagination postsPerPage={this.state.postsPerPage} totalPosts={comments.length} paginate={this.paginate} />
            </div>
        )
    };
}

export default CommentsList;