import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class Pagination extends Component {
    constructor() {
        super();
        this.state = {
            pageNumbers: []
        };

    }

    componentDidMount() {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.totalPosts / this.props.postsPerPage); i++) {
            pageNumbers.push(i);
        }


        this.setState({
            pageNumbers: pageNumbers
        });
    }

    render() {
        return (
            <div>
                <ul className="pagination">
                    {this.state.pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a className="page-link" onClick={() => this.props.paginate(number)}>{number}</a>
                        </li>
                    ))}
                </ul>
            </div>
        )
    };
}

export default Pagination;