/* global sessionStorage */
/* global $ */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Sidebar from '../dashboard/Sidebar.jsx';
import PostMessageForm from './PostMessageForm.jsx';
import AddUserForm from './AddUserForm.jsx';
import getMessages,{ passMessage,
  updateReadBy } from '../../actions/messageActions';
import { getMemberCount } from '../../actions/groupActions';
import MessageCard from '../group/MessageCard.jsx';

const propTypes = {
  groupDetails: PropTypes.array.isRequired,
  getMessages: PropTypes.func.isRequired,
  passMessage: PropTypes.func.isRequired,
  updateReadBy: PropTypes.func.isRequired
};

/**
 * @export
 * @class GroupPage
 * @extends {Component}
 */
export class GroupPage extends Component {
  /**
   * Creates an instance of GroupPage.
   * @param {any} props
   * @memberof GroupPage
   */
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      displayedMessage: [],
      message: '',
      priority: '',
      displayState: 'all',
      memberCount: 0
    };

    this.onClick = this.onClick.bind(this);
    this.filterMessages = this.filterMessages.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  /**
   * @param {object} event
   * @returns {void}
   * @memberof GroupPage
   */
  onClick(event) {
    // get message readby, update readby and redirect to message
    if (!event.target.dataset.readby.includes(this.props.user.username)) {
      const data = {
        id: Number(event.target.dataset.id),
        readby: this.props.user.username };
      this.props.updateReadBy(data);
    }
    sessionStorage.setItem('message', event.target.dataset.message);
    this.props.passMessage(event.target.dataset.message);
    $('.tooltipped').tooltip('remove');
  }
  /**
   * Filters the messages based on their 'read' state
   * @method filterMessages
   * @param {Array} messages an array of messages
   * @return {void}
   */
  filterMessages(messages) {
    const displayedMessage = [];
    if (messages && messages.length > 0) {
      messages.forEach((message) => {
        if (this.state.displayState === 'all') {
          displayedMessage.push(message);
        }
        if (this.state.displayState === 'unread') {
          if (!message.readby.includes(this.props.user.username)) {
            displayedMessage.push(message);
          }
        }
        if (this.state.displayState === 'archived') {
          if (message.readby.includes(this.props.user.username)) {
            displayedMessage.push(message);
          }
        }
      });
      this.setState({ displayedMessage });
    }
  }
  /**
   * Calls the onLoad method on component mount
   * @method componentDidMount
   * @return {void}
   * @memberof GroupPage
   */
  componentDidMount() {
    if (this.props.groupDetails) {
      const groupId = this.props.groupDetails[0];
      this.props.getMessages(groupId).then(
        () => {
          this.setState({ messages: this.props.messages }, () => {
            this.filterMessages(this.props.messages);
          });
        },
        ({ response }) => {
          Materialize.toast(response.data.error, 2000);
          this.props.history.push('/dashboard');
        }
      );
      this.props.getMemberCount(groupId);
    } else {
      this.props.history.push('/dashboard');
    }
  }
  /**
   * Filters the messages based on their 'read' state
   * @method componentWillReceiveProps
   * @param {object} nextProps new props coming into the component
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.messages.length > this.props.messages.length) {
      this.setState({
        messages: nextProps.messages
      }, () => {
        this.filterMessages(nextProps.messages);
      });
    }
  }
  /**
   * @param {object} event
   * @returns {void}
   * @memberof GroupPage
   */
  onChange(event) {
    this.setState({ displayState: event.target.value }, () => {
      this.filterMessages(this.props.messages);
    });
  }
  /**
   * @returns {string} The HTML markup for the GroupPage
   * @memberof GroupPage
   */
  render() {
    const { displayedMessage } = this.state;
    const groupName = this.props.groupDetails[1];
    const messageCards = displayedMessage.map(message =>
      <MessageCard onClick={ this.onClick }
        message={ message }
        key={message.id}/>
    );
    return (
      <div>
        {/* Main Page */}
        <div className="row">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Page */}
          <div className="col s12 m9 l10 no-padding">
            <div className="col s12 m12 l7 middle margin-v-top">
              <h5 className="center-align uppercase">
                { groupName ? `${groupName} Message Board` : null } </h5>
              <div className="row full-height">
                { /* Message Cards*/ }
                <div className="col s12">
                  <label htmlFor="filter-message">Filter Messages</label>
                  <select
                    className="browser-default"
                    name="filter-message"
                    id="filter-message"
                    value={ this.state.displayState }
                    onChange={ this.onChange }>
                    <option value="all">All</option>
                    <option value="unread">Unread</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="col s12 message-card-div overflow-y-scroll">
                  { (displayedMessage.length > 0) ? messageCards : <h6
                    className="center-align margin-v2">
                    No Messages Available. Create one from the sidebar</h6> }
                </div>
              </div>
            </div>
            { /* Right Sidebar*/ }
            <div className="col s12 m12 l5 no-padding right">
              <div className="row">
                { /* Group Stats*/ }
                <div className="col s12 m12 l12 teal accent-4">
                  <h6 className="white-text center-align margin-v-bottom-none">
                    GROUP STATISTICS
                  </h6>
                  <h6 className="white-text center-align">
                    { this.props.count } Members</h6>
                </div>
                { /* Send A Message div*/ }
                <div className="col s12 m12 l12 no-padding">
                  <PostMessageForm groupId={this.props.groupDetails[0]} />
                </div>
                <hr/>
                { /* Add new user div*/ }
                <div className="col s12 m12 l12 no-padding">
                  <AddUserForm groupId={this.props.groupDetails[0]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GroupPage.propTypes = propTypes;

const mapStateToProps = state => ({
  groupDetails: state.groupDetails,
  user: state.auth.user,
  count: state.groupMemberCount,
  messages: state.message
});

export default connect(
  mapStateToProps,
  { getMessages,
    passMessage,
    updateReadBy,
    getMemberCount })(withRouter(GroupPage));
