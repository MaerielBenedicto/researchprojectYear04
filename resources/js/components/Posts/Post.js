import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import AddComment from '../AddComment';
import Comments from '../Comments';

// import { CgProfile } from 'react-icons/CgProfile';


class Post extends Component {
    constructor(){
        super();
        this.state = {
            post: {},
            isLoaded: false
        };

        this.delete = this.delete.bind(this);
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

    delete() {
        console.log("DELETE");
        let token = localStorage.getItem("token");
        axios.delete('/api/posts/' + this.props.match.params.id,
        {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            console.log(response);
            this.props.history.push('/forums/'+ this.state.post.forum_id);   

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
                   <div className="row">
                        <div className="post-detail col-9 py-3">
                            <div className="row">
                                <div className="col-12">
                                    <img src="https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png"/>
                                    <span> {this.state.post.user.name}</span>
                                    <Link to={{
                                        pathname: '/submit-post/' + this.props.match.params.id,
                                        state: {
                                            forumId: this.state.post.forum_id,
                                            postId: this.props.match.params.id,
                                            title: this.state.post.title,
                                            body: this.state.post.body,
                                            mode: 'edit'
                                        }}} >
                                            <button className="bttn float-right">Edit</button>
                                        </Link> 
                                        <button className="bttn float-right" onClick={this.delete}>Delete</button>
                                </div>
                                <div className="col-12">
                                    <h4>{this.state.post.title}</h4>
                                    <p>{this.state.post.body}</p>
                                </div>
                            </div>
                       </div>
                    </div>
                        <Comments postId={this.props.match.params.id} user={this.props.user} />
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