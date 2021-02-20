import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import {FaListAlt, FaRegBookmark, FaBookmark } from 'react-icons/fa';

class Bookmark extends Component {
    constructor(){
        super();
        this.state = {

        };
    }

    componentDidMount(){
       
    }

    render(){
        return (
            <button className="bookmark-bttn" onClick={()=> this.setState({bookmarked: true})}>
            {(this.state.bookmarked ? (
                 <span><FaBookmark className="icon"/> Bookmark</span>
            ) : <span><FaRegBookmark className="icon"/> Bookmark</span> )}
            </button> 
        )
    };
}

export default Bookmark;