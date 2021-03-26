import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import { FaListAlt, FaRegBookmark, FaBookmark } from 'react-icons/fa';

class Bookmark extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookmarked: props.bookmarked
        };

        this.bookmark = this.bookmark.bind(this);
    }

    bookmark() {
        let user = this.props.user;
        
        if (user) {

            let token = this.props.user.token;
            if (this.props.forum_bookmark) {
                //if not yet bookmarked
                if (!this.state.bookmarked) {
                    axios.post('/api/bookmark/forum/' + this.props.id, null,
                        { headers: { Authorization: "Bearer " + token }})
                        .then((response) => {
                            this.setState({ bookmarked: true });
                            this.props.AddbookmarkSuccess(response.data);
                        })
                        .catch(function (error) {
                            if (error) console.log(error);
                        });
                }
                //un bookmark forum
                else {
                    axios.post('/api/unbookmark/forum/' + this.props.id, null,
                        { headers: { Authorization: "Bearer " + token } })
                        .then((response) => {
                            this.setState({ bookmarked: false });
                            this.props.RemovebookmarkSuccess(response.data);
                        })
                        .catch(function (error) {
                            if (error) console.log(error);
                            
                        });
                }
            } else {
                //if not yet bookmarked
                if (!this.state.bookmarked) {
                    axios.post('/api/bookmark/post/' + this.props.id, null,
                        { headers: { Authorization: "Bearer " + token }})
                        .then((response) => {
                            console.log(response.data);
                            this.props.AddbookmarkSuccess(response.data);
                            this.setState({ bookmarked: true });
                        })
                        .catch(function (error) {
                            if (error) console.log(error);
                        });
                }
                //un bookmark forum
                else {
                    axios.post('/api/unbookmark/post/' + this.props.id, null,
                        { headers: { Authorization: "Bearer " + token }})
                        .then((response) => {
                            this.props.RemovebookmarkSuccess(response.data);
                            this.setState({ bookmarked: false });
                        })
                        .catch(function (error) {
                            if (error) {
                                console.log(error);
                            }
                        });
                }
            }
        } else {
            this.props.history.push('/signin');
        }
    }

    render() {
        return (
            <button className="bookmark-bttn" onClick={() => this.bookmark()}>
                {(this.state.bookmarked) ? (
                    <span><FaBookmark className="icon bookmark" /> Bookmark</span>
                ) : <span><FaRegBookmark className="icon" /> Bookmark</span>}
            </button>
        )
    };
}

export default withRouter(Bookmark);