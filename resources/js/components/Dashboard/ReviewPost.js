import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class ReviewPost extends Component {
    constructor(){
        super();
        this.state = {
            post: {}
        };

        this.changeStatus = this.changeStatus.bind(this);
    }

    componentDidMount(){
        axios.get('/api/posts/' + this.props.match.params.id)
        .then(response => {        
            this.setState({
                post: response.data.data,
                isLoaded: true
            });
        })
        .catch(function(error){
            if(error){
                console.log(error);
                this.state.errors = error.response.data.errors;
            } 
        });
    }

    changeStatus(status){
        let token = localStorage.getItem('token');
        axios.put('/api/review/' + this.state.post.id, 
        {
            status: status
        },
        {
            headers: { Authorization: "Bearer " + token }
        })
        .then((response) => {
            console.log(response.data);
            // this.props.history.push('/posts/'+ response.data.id);   
          })
        .catch((error) => {
            console.log(error);
            if(error){
                console.log(error);
            } 
        });  
    }

    render(){
        const post = this.state.post;
        return (
            <div className="col-10 dash">
                <div className="topbar row">
                    <div className="topbar-div col-12">
                        <h4>Post # {this.props.match.params.id}</h4>
                    </div>
                </div>

                <div className="posts-lists col-12">
                    <h2>Under review</h2>
                    <div className="row">
                        <div className="user-data col-6">
                            <p>Posted on: 18/01/2021</p>
                            <p>User: Allyssa Daniel</p>
                            <p>Email: allyssa@gmail.com</p>
                        </div>

                        <div className="user-data col-5">
                            <p>Sentiment score: {post.s_score}</p>
                            <p>Magnitude score: {post.s_magnitude}</p>
                            <p>Sentiment: Negative </p>
                        </div>
                    </div>
                    
                    <div>
                        <p>Title: {post.title}</p>
                        <p>Body: {post.body}</p>
                    </div>
                    <div>
                        <p>Action</p>
                        <button onClick={() => this.changeStatus('approved')}>Approve</button>
                        <button onClick={()=>this.changeStatus('denied')}>Deny</button>
                    </div>
                </div>
            </div>
        )
    };
}

export default withRouter(ReviewPost);