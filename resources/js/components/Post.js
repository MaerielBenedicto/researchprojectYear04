import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import Comments from './Comments';

class Post extends Component {
    constructor(){
        super();
        this.state = {
            post: {},
            isLoaded: false
        };
    }

    componentDidMount(){
        axios.get('/api/posts/' + this.props.match.params.id)
        .then(response => {
            // console.log(response.data.data);
            const tempPost = response.data.data;
            //never modify state directly
            this.setState({
                post: tempPost, 
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

    render(){
        if(this.state.isLoaded){
            return (
                <div className="body-content">
                    <div className="container"> 
                    <h4>POST COMMENTS</h4>
                   <div className="row">
                        <div className="col py-3">
                            
                                <h4>{this.state.post.title}</h4>
                                <p>{this.state.post.body}</p>
                                <span> {this.state.post.user.name}</span>
                       </div>
                    </div>
                        
                        <Comments postId={this.props.match.params.id} />
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    };
}

export default withRouter(Post);