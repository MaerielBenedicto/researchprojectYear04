import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class PostsList extends Component {
    constructor(){
        super();
        this.state = {
            posts: []
        };
    }

    componentDidMount(){
        let token = localStorage.getItem('token');
        axios.get('/api/posts', 
        {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => {
            console.log(response);
            const posts = response.data;
            this.setState({
                posts: posts
            });
          })
        .catch(function(error) {
            console.log(error);
            if(error){
                console.log(error);
            } 
        });
    }

    render(){
        return (
            <div className="col-10 dash">
                <div className="topbar row">
                    <div className="topbar-div col-12">
                        <h4>Posts</h4>
                    </div>
                </div>

                <div className="posts-lists col-12">
                    <div>
                        LISTS OF UNDER REVIEWS
                    </div>
                    <div>
                    
                        <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Title</th>
                            <th scope="col">Sentiment Score</th>
                            <th scope="col">Sentiment Magnitude</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        {this.state.posts.map(item => (
                        <tbody>
                          <tr key={item.id}>
                            <td>{item.created_at}</td>
                            <td>{item.title}</td>
                            <td>{item.s_score}</td>
                            <td>{item.s_magnitude}</td>
                            <td><button>Review</button></td>
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