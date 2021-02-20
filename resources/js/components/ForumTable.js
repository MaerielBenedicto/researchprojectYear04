import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import {FaListAlt, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import Bookmark from './Bookmark';
class ForumTable extends Component {
    constructor() {
        super();
        this.state = {
        };
    }

    componentDidMount() {

    }

    render() {
        const item = this.props.item;

        return (
            <div >
                <div className="forum col-12" key={item.id}>
                    <div className="forum-title">
                        <Link to={`/forums/${item.id}`} className="forum-title">
                            {item.topic}
                        </Link>
                    </div>

                    {(this.props.user && this.props.user.id === item.user.id) ? (
                        <Link to={{
                            pathname: '/forums',
                            state: {
                                forumId: item.id,
                                topic: item.topic,
                                description: item.description,
                                mode: 'edit'
                            }
                        }}>
                            <div className="float-right bttn"> Edit </div>
                        </Link>
                    ) : ''}

                    {(this.props.user && this.props.user.id === item.user.id) ? (
                        <button className="bttn float-right" onClick={() => this.delete(item)}>Delete</button>
                    ) : ''}
                    <div className="forum-desc">
                        {item.description}
                    </div>
                    <div className="forum-actions">
                        <FaListAlt className="icon post-icon" /> {item.postsCount} posts
                        <Bookmark user={this.props.user} id={item.id} bookmarked={item.bookmarked} forum_bookmark={true}/>
                    </div>

                </div>
            </div>
        )
    };
}

export default ForumTable;