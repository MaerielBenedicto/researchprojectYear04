import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class DeleteConfirmation extends Component {

    render() {
        const showModal = (this.props.showModal) ? 'style' : '';

        return (
            <div className={'modal' + showModal} >
                <div className="modal-mask">
                    <div className="modal-wrapper">
                        <div className="modal-container">
                            <div className="modal-body">
                                <div className="col-12">
                                    <div className="modal-form-heading">
                                        <h4>Delete</h4>
                                    </div>
                                </div>
                                {/* <!-- DELETE CONFIRMATION --> */}
                                <div className="col-12">
                                    <div className="form-row">
                                        <div className="form-group col-lg-12 col-sm-12">
                                            <div className="custom">
                                                <label>
                                                    Are you sure you want to delete this {this.props.item}? <br />
                                                </label>
                                            </div>
                                        </div>

                                        <div className="col-lg-3 col-sm-6">
                                            <button type="submit" className="btn btn-primary" onClick={() => { this.props.delete(); this.props.closeModal() }}>Confirm</button>
                                        </div>

                                        <div className="col-lg-3 col-sm-6">
                                            <button type="button" onClick={this.props.closeModal} className="btn btn-secondary">Cancel</button>
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

export default DeleteConfirmation;


