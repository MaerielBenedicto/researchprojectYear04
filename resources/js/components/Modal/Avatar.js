import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class Avatar extends Component {
    constructor() {
        super();
        this.state = {
            image: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
    }

    handleChange(e) {
        let file = e.target.files;
        if(!file.length) return;
        this.setState({image: file[0]});
    }

    uploadImage(e) {
        e.preventDefault();
        const user = this.props.user;
        let token = user.token;

        let data = new FormData();
        data.append('image', this.state.image);

        // Display the key/value pairs
        for (var pair of data.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
        axios.post('/api/avatar/' + user.id, data, {
            headers: {
                'Authorization': "Bearer " + token,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            console.log(res);
            this.props.uploaded();
            this.props.uploadSuccess(res);
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    render() {

        const showModal = (this.props.showModal) ?  'style': '';

        return (
            <div className={'modal' + showModal} >
                <div className="modal-mask">
                    <div className="modal-wrapper">
                        <div className="modal-container">
                            <div className="modal-body">
                                <div className="col-12">
                                    <div className="modal-form-heading">
                                        <h4>Edit Avatar</h4>

                                    </div>
                                </div>
                                {/* <!-- EDIT AVATAR --> */}
                                <div className="col-12">
                                    <form onSubmit={this.uploadImage} encType="multipart/form-data">
                                        <div className="form-row">

                                            <div className="form-group col-lg-12 col-sm-12">
                                                <div className="custom-file">
                                                    <input required type="file" name="image" onChange={this.handleChange} className="custom-file-input" id="image" />
                                                    <label className="custom-file-label" >Profile Image</label>
                                                </div>
                                            </div>

                                            <div className="col-lg-3 col-sm-6">
                                                <button type="submit" className="btn btn-primary">Add</button>
                                            </div>

                                            <div className="col-lg-3 col-sm-6">
                                                <button type="button" onClick={this.props.closeModal} className="btn btn-secondary">Cancel</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    };
}

export default Avatar;


