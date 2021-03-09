import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class Search extends Component {
    render() {
        return (
            <input id="search" type="text" className="form-control-search" placeholder="Search" name="search"
                onChange={this.props.onSearchChange}
                value={(this.props.search ? (this.props.search) : (''))} />
        )
    };
}

export default Search;