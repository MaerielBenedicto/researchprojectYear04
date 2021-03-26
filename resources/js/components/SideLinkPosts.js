import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class SideLinkPosts extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        const posts = this.props.posts;
        if(posts !== undefined){
            var filteredPosts = [];
            filteredPosts = posts.slice(0,5).sort((a, b) => b.upvote - a.upvote);
            return (
                <div className="col-lg-12 sidelinks-div mt-4 side-link">
                    <div>
                        <h4 className="sidelink-title">Popular Posts</h4>
                        {filteredPosts.map(post => (
                            <ul key={post.id}>
                                <li><Link to={{
                                    pathname: `/posts/${post.id}`,
                                    state: { post: post }
                                }}>
                                    {post.title}
                                </Link></li>
                            </ul>
                        ))}
                    </div>
                </div>
            )
        } else {
            return null;
        }
    };
}

export default SideLinkPosts;