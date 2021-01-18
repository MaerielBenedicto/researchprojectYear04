import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class UserPosts extends Component {
    constructor(){
        super();
        this.state = {
            posts: []
        };

        this.delete = this.delete.bind(this);
        this.posts = this.posts.bind(this);
    }

    componentDidMount(){
        this.posts();
    }

    posts(){
        console.log(this.props.user.id);
        //get user forums
        let token = localStorage.getItem("token");
        console.log(this.props.user.id);
        axios.get('/api/profile/' + this.props.user.id + '/posts', 
        {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {        
            this.setState({
                posts: response.data,
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

    delete(id) {
        let token = localStorage.getItem("token");
        axios.delete('/api/posts/' + id,
        {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            console.log(response);
            this.posts();
            // this.props.history.push('/forums/'+ this.state.post.forum_id);   
        })
        .catch(function(error){
            if(error){
                console.log(error);
                this.state.errors = error.response.data.errors;
            } 
        });
    }

    render(){
        return (
            <div className="mt-2">
                <div className="container"> 
                    <h4>POSTS</h4>
                    {this.state.posts.map(item => (
                                    <div className="post" key={item.id}>
                                        <div className="post-title">
                                            <Link to={`/posts/${item.id}`} >
                                            {item.title}
                                            </Link>
                                        </div>
            
                                        <div className="post-body">
                                        {item.body}
                                        </div>

                                            <Link to={{
                                            pathname: '/submit-post/' + item.forum_id,
                                            state: {
                                                forumId: item.forum_id,
                                                postId: item.id,
                                                title: item.title,
                                                body: item.body,
                                                mode: 'edit'

                                            }}} >

                                                <button className="bttn">Edit</button>
                                            </Link>
                                            <button className="bttn float-right" onClick={ () => this.delete(item.id)}>Delete</button>


                                    </div>
                                    
                                ))}

                </div>
                
            </div>
        )
    };
}

export default UserPosts;