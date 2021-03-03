import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, Link } from "react-router-dom";

class CreateForum extends Component {
    constructor(props){
        super(props);
        this.state = {
            topic: props.location.state.topic || '',
            description: props.location.state.description || '',
            mode: props.location.state.mode || 'create'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    handleSubmitForm(e){
        //prevent from reloading page
        e.preventDefault();
        let token = this.props.user.token;
        if(this.state.mode === 'create'){
            axios.post('/api/forums', 
            {
                topic: this.state.topic,
                description: this.state.description,
                user_id: this.props.user.id
            },
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then((response) => {
                console.log('responseeeeeee',response);
                this.props.render.createForumSuccess(response.data.data);
                this.props.history.push('/forums/'+ response.data.data.id);   
              })
            .catch((error) => {
                console.log(error);
                if(error){
                    console.log(error);
                } 
            });   
        } else if(this.state.mode === 'edit') {
            axios.put('/api/forums/' + this.props.location.state.forumId, 
            {
                topic: this.state.topic,
                description: this.state.description,
                user_id: this.props.user.id
            },
            {
                headers: { Authorization: "Bearer " + token }
            })
            .then((response) => {
                this.props.render.updateForumSuccess(response.data);
                this.props.history.push('/forums/'+ response.data.id); 
              })
            .catch((error) => {
                console.log(error);
                if(error){
                    console.log(error);
                } 
            }); 
        }
      }

    handleChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      goBack(){
        this.props.history.goBack();
      }

    render(){
        return (
            <div className="body-content">
                <div className="container">
                    {/* Create Forum */}
                    <form onSubmit={this.handleSubmitForm}> 
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <h3>Create new Forum Topic</h3>
                        </div>
                        <div className="col-lg-9 forum-topic">
                            <h4>Topic Title</h4>
                            <input id="forum-title" type="text" className="form-control-forum" placeholder="Topic" name="topic"  
                            value={this.state.topic}
                            onChange={this.handleChange} />
                        </div>
                        <div className="col-lg-9 forum-description">
                            <h4>Topic Description</h4>
                            <textarea className="form-control-forum-body col-12 mb-3" rows="9" id="description" placeholder="Description" name="description"  
                            value={this.state.description}
                            onChange={this.handleChange}>
                            </textarea>
                        </div>
                        <div className="form-bttn col-lg-9">
                            <button className="submit-button btn-primary" type="submit">Submit</button>
                            {/* <button onClick={()=> this.goBack} className="cancel-button float-right btn-secondary">Cancel</button> */}

                        </div>
                    </div>
                    </form>
                    {/* END Create forum */}
                </div>
        </div>
        )
    };
}

export default withRouter(CreateForum);