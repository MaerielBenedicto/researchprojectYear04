import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class SideLinkForums extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        const forums = this.props.forums;
        var filteredForums = [];
        filteredForums = forums.slice(0, 5).sort((a, b) => b.postsCount - a.postsCount);

        return (
            <div className="col-lg-12 sidelinks-div">
                <div>
                    <h4 className="sidelink-title">Popular Forums</h4>
                    {filteredForums.map(forum => (
                        <ul key={forum.id}>
                            <li><Link to={`/forums/${forum.id}`}>
                                {forum.topic}
                            </Link></li>
                        </ul>
                    ))}
                </div>
            </div>
        )
    };
}

export default SideLinkForums;