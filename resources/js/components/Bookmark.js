import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import {FaListAlt, FaRegBookmark, FaBookmark } from 'react-icons/fa';

class Bookmark extends Component {
    constructor(props){
        super(props);
        this.state = {
            bookmarked: props.bookmarked
        };

        this.bookmark = this.bookmark.bind(this);
    }

    bookmark(){
        let token = this.props.user.token;
        if(this.props.forum_bookmark){
            
            //if not yet bookmarked
            if(!this.state.bookmarked){
                axios.post('/api/bookmark/forum/' + this.props.id, null,
                {
                    headers: { Authorization: "Bearer " + token }
                })
                .then((response) => {
                    // console.log(response.data);
                    this.setState({bookmarked: true});
                })
                .catch(function(error) {
                    console.log(error);
                    if(error){
                        console.log(error);
                    } 
                });
            } 
            //un bookmark forum
            else {
                axios.post('/api/unbookmark/forum/' + this.props.id, null,
                {
                    headers: { Authorization: "Bearer " + token }
                })
                .then((response) => {
                    // console.log(response.data);
                    this.setState({bookmarked: false});
                })
                .catch(function(error) {
                    console.log(error);
                    if(error){
                        console.log(error);
                    } 
                });
            }
        }
    }

    render(){

        const bookmarks = this.props.bookmarks;
        return (
            <button className="bookmark-bttn" onClick={()=> this.bookmark()}>
            {(this.state.bookmarked) ? (
                 <span><FaBookmark className="icon bookmark"/> Bookmarked</span>
            ) : <span><FaRegBookmark className="icon"/> Bookmark</span> }
            </button> 
        )
    };
}

export default Bookmark;