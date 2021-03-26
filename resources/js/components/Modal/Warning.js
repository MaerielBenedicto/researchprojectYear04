import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class Warning extends Component {

    render() {
        const showModal = (this.props.showModal) ? 'style' : '';

        return (
            <div className={'modal' + showModal} >
                <div className="modal-mask">
                    <div className="modal-wrapper">
                        <div className="modal-container">
                            <div className="modal-body">
                                {/* <!-- WARNING --> */}
                                <div className="col-12">
                                    <div className="form-row">
                                        <div className="form-group col-lg-12 col-sm-12">
                                            <div className="custom">
                                                <label>
                                                    Your comment has been perceived as hostile and are hidden from the other users.<br />
                                                    Edit this comment or wait for admin approval.
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-lg-3 col-sm-6">
                                            <button type="button" onClick={this.props.closeModal} className="btn btn-secondary">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    };
}

export default Warning;


