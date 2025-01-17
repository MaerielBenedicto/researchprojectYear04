import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";
import Search from './Search';

class Filter extends Component {
    render() {
        return (
            <div className="filter-bar row">
                <div className="container">
                    <ul className="sort-list">
                        <li><a className="sort-list-a" onClick={e => this.props.changeSortby('Popular')}> Popular</a></li>
                        <li><a className="sort-list-a" onClick={e => this.props.changeSortby('Latest')}> Latest</a></li>
                        <li><a className="sort-list-a" onClick={e => this.props.changeSortby('Oldest')}> Oldest</a></li>
                    </ul>
                    <div className="float-right search-input">
                        <Search
                            onSearchChange={this.props.onSearchChange}
                            search={this.props.search} 
                        />
                    </div>

                </div>
            </div>
        )
    };
}

export default Filter;