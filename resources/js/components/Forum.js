import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class Forum extends Component {
    constructor(){
        super();
        this.state = {
            posts: [],
            forum: {}
        };
        
    }

    componentDidMount(){
        //get posts in a forum
        axios.get('/api/forums/' + this.props.match.params.id)
        .then(response => {
            // console.log(response.data);
            const tempPosts = response.data.data;
            const tempForum = response.data.forum;
              //never modify state directly
              this.setState({
                posts: tempPosts,
                forum: tempForum
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
        return (
            <div className="body-content">
                <div className="container"> 
                <div className="row">
                    <div className="col py-3">
                            <h4>{this.state.forum.topic}</h4>
                            <p>{this.state.forum.description}</p>
                   </div>
                </div>
                    <div className="row">
                        <div className="col-8 py-3">
                        {this.state.posts.map(item => (
                        <div key={item.id}>
                            <div className="media-body">
                            <div >
                                <Link to={`/posts/${item.id}`} className="pet-name">
                                {item.title}
                                </Link>
                            </div>

                            <div className="apt-notes">
                            {item.body}
                            </div>
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default withRouter(Forum);