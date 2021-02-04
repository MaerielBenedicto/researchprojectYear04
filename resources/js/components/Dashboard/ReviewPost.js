import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import Moment from 'react-moment';

class ReviewPost extends Component {
    constructor(){
        super();
        this.state = {
            post: {},
            alert: null
        };

        this.changeStatus = this.changeStatus.bind(this);
    }

    componentDidMount(){
        // axios.get('/api/posts/' + this.props.match.params.id)
        // .then(response => {        
        //     this.setState({
        //         post: response.data.data,
        //         isLoaded: true
        //     });
        // })
        // .catch(function(error){
        //     if(error){
        //         console.log(error);
        //         this.state.errors = error.response.data.errors;
        //     } 
        // });
    }

    changeStatus(e){
        const status = e.target.value;
        let token = localStorage.getItem('token');
        axios.put('/api/review/post/' + this.props.match.params.id, 
        {
            status: status
        },
        {
            headers: { Authorization: "Bearer " + token }
        })
        .then((response) => {
            console.log(response.data);
            const alert = this.state.post.title + " successfully " + status + "!";

            this.setState({
                post: response.data,
                alert: alert
            });
          })
        .catch((error) => {
            console.log(error);
            if(error){
                console.log(error);
            } 
        });  
    }

    render(){

        const posts = this.props.posts;
        const post_id = parseInt(this.props.match.params.id);
        const post = posts.find(post => post.id === post_id);

            return (
                <div className="col-10 dash">
                    <div className="topbar row">
                        <div className="topbar-div col-12">
                            <h4>Post # {post.id}</h4>
                        </div>
                    </div>
                    { this.state.alert && (
                          <div className="alert alert-info">
                          <span>{this.state.alert}</span>
                     </div>
                    )}
                  
    
                    <div className="posts-lists col-12">
                        <h2>Under review</h2>
                        <div className="row">
                            <div className="user-data col-6">
                                <p>Posted on: <Moment format="DD/MM/YYYY">{post.created_at}</Moment></p>
                                <p>User: {post.user.name}</p>
                                <p>Email: {post.user.email}</p>
                            </div>
    
                            <div className="user-data col-5">
                                <p>Sentiment score: {post.s_score}</p>
                                <p>Magnitude score: {post.s_magnitude}</p>
                                <p>Sentiment: Negative </p>
                            </div>
                        </div>
                        
                        <div className="row mt-3">
                            <div className="user-data col-11">
                                <p>Title: {post.title}</p>
                                <p>Body: {post.body}</p>
                            </div>
                        </div>
                        <div className="row mt-3 ml-2">
                            <div className="col-5">
                                <p>Action</p>
                                <button value="approved" onClick={this.changeStatus} className="approve-bttn">Approve</button>
                                <button value="denied" onClick={this.changeStatus}  className="denied-bttn">Deny</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
    };
}

export default withRouter(ReviewPost);