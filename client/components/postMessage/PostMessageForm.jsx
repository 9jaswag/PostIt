/* global Materialize */
/**
 * Component for form that posts a message to a group
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import postMessage from '../../actions/postMessageAction';
import getMessages from '../../actions/getMessages';

const propTypes = {
  postMessage: PropTypes.func.isRequired
};

/**
 * @export
 * @class PostMessageForm
 * @extends {Component}
 */
export class PostMessageForm extends Component {
  /**
   * Creates an instance of PostMessageForm.
   * @param {any} props
   * @memberof PostMessageForm
   */
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      priority: 'normal',
      title: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Makes an action call to post a message to a group
   * @param {object} e
   * @returns {void}
   * @memberof PostMessageForm
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.postMessage(this.props.groupId, this.state).then(
      () => {
        this.setState({
          message: '',
          title: '',
          priority: 'normal'
        });
        this.props.getMessages(this.props.groupId);
        Materialize.toast('Message posted', 2000);
        this.props.history.push('/group');
      }
    );
  }

  /**
   * @param {object} e
   * @returns {void}
   * @memberof PostMessageForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * @returns {string} The HTML markup for the PostMessageForm component
   * @memberof PostMessageForm
   */
  render() {
    return (
      <div>
        { /* Post Message Modal Structure */}
        <div className="modal-content">
          <div className="row">
            <div className="col s12">
              <h5 className="center-align form">Post New Broadcast Message</h5>
            </div>
          </div>
          <form action="" className="col s12" onSubmit= { this.onSubmit }>
            <div className="row form">
              <div className="input-field col s12">
                <input type="text"
                  cols="30"
                  rows="10"
                  id="title"
                  name="title"
                  value={ this.state.title }
                  onChange= { this.onChange }
                  className="validate form" required/>
                <label htmlFor="title">Message Title</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <textarea cols="30"
                  rows="10" id="message"
                  name="message" value={ this.state.message }
                  onChange= { this.onChange }
                  className="materialize-textarea form" required></textarea>
                <label htmlFor="message">Message body</label>
              </div>
            </div>
            <div className="row form">
              <div className="input-field col s12">
                <select className="browser-default"
                  name="priority" id="priority"
                  value={ this.state.priority }
                  onChange= { this.onChange }>
                  <option value="normal" defaultValue>Normal</option>
                  <option value="urgent">Urgent</option>
                  <option value="critical">Critical</option>
                </select>
                <label htmlFor="priority"
                  className="active">Message Priority
                </label>
              </div>
            </div>
            <div className="row form">
              <div className="input-field col s12">
                <input
                  className="waves-effect waves-light one-whole btn margin-v2"
                  type="submit"
                  value="Send Broadcast Message"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

PostMessageForm.propTypes = propTypes;

const mapStateToProps = state => ({
  userDetails: state.auth.user
});

export default connect(
  mapStateToProps, { postMessage, getMessages })(withRouter(PostMessageForm));
