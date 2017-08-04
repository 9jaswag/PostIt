/**
 * Component for form that posts a message to a group
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import postMessage from '../../actions/postMessageAction';

class PostMessageForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      priority: 'normal'
    }
    
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e){
    e.preventDefault();;
    this.props.postMessage(this.props.id, this.state).then(
      (res) => {
        location.href='/group'
      },
      (err) => {}
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return(
      <div>
        { /* Post Message Modal Structure */}
        <div id="postMessageModal" className="modal">
          <div className="modal-content">
            <div className="row">
              <div className="col s12">
                <h5>Post New Broadcast Message</h5>
              </div>
            </div>
            <form action="" className="col s12" onSubmit= { this.onSubmit }>
              <div className="row">
                <div className="input-field col s12">
                  <textarea cols="30" rows="10" id="message" name="message" value={ this.state.message } onChange= { this.onChange } className="materialize-textarea" required></textarea>
                  <label htmlFor="message">Message</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <select className="browser-default" name="priority" id="priority" value={ this.state.priority } onChange= { this.onChange }>
                    <option value="normal" defaultValue>Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="critical">Critical</option>
                  </select>
                  {/* <label htmlFor="priority">Message Priority</label> */}
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input className="btn one-whole" type="submit" value="Send Broadcast Message"/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostMessageForm.propTypes = {
  postMessage: React.PropTypes.func.isRequired
}

export default connect(null, { postMessage }) (PostMessageForm);