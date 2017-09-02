import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from '../sidebar/Sidebar';
import PostMessageForm from '../postMessage/PostMessageForm';
import AddUserForm from '../addUser/AddUserForm';
import getMessages from '../../actions/getMessages';
import passMessage from '../../actions/passMessageAction';
import updateReadBy from '../../actions/readbyAction';
import MessageCard from '../message/MessageCard';

const propTypes = {
  groupDetails: PropTypes.string.isRequired,
  getMessages: PropTypes.func.isRequired,
  passMessage: PropTypes.func.isRequired,
  updateReadBy: PropTypes.func.isRequired
};

/**
 * Group page component
 */
export class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      displayedMessage: [],
      message: '',
      priority: '',
      displayState: 'all'
    };

    this.onLoad = this.onLoad.bind(this);
    this.onClick = this.onClick.bind(this);
    this.filterMessages = this.filterMessages.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onLoad() {
    this.props.getMessages(this.props.groupDetails.split(' ')[0]).then(
      (res) => {
        this.setState({ messages: res.data.data });
        this.filterMessages(res.data.data);
      },
      () => {}
    );
  }
  onClick(e) {
    sessionStorage.setItem('message', e.target.dataset.fullmessage);
    // get message readby, update readby and redirect to message
    if (!e.target.dataset.readby.includes(this.props.user.userUsername)) {
      const data = { id: Number(e.target.dataset.id), readby: [...e.target.dataset.readby.split(','), this.props.user.userUsername] };
      this.props.updateReadBy(data);
    }
    location.href='/message';
  }
  filterMessages(messages) {
    const displayedMessage = [];
    messages.map((message) => {
      if (this.state.displayState === 'all') {
        displayedMessage.push(message);
      }
      if (this.state.displayState === 'unread') {
        if (!message.readby.includes(this.props.user.userUsername)) {
          displayedMessage.push(message);
        }
      }
      if (this.state.displayState === 'archived') {
        if (message.readby.includes(this.props.user.userUsername)) {
          displayedMessage.push(message);
        }
      }
    });
    this.setState({ displayedMessage });
  }
  onChange(e) {
    this.setState({ displayState: e.target.value });
    this.onLoad();
  }

  componentDidMount() {
    this.onLoad();
  }

  render() {
    const { displayedMessage } = this.state;
    const groupName = this.props.groupDetails.split(' ')[1];
    const messageCards = displayedMessage.map(message =>
      <div className="margin-v" key={message.id}>
        <MessageCard onClick={ this.onClick } message={ message }/>
      </div>
    );
    return (
      <div>
        {/* Main Page */}
        <div className="row">
          {/* Sidebar */}
          <Sidebar />
          {/* Main Page */}
          <div className="col s12 m9 l10">
            <div className="col s12 m12 l9" style={{ marginTop: '2rem' }}>
              <h5 className="center-align uppercase">{ groupName ? `${groupName} Message Board` : null } </h5>
              <div className="row full-height overflow-y-scroll">
                { /* Message Cards*/ }
                <div className="col s12">
                  <label htmlFor="filter-message">Filter Messages</label>
                  <select className="browser-default" name="filter-message" id="filter-message" value={ this.state.displayState } onChange={ this.onChange }>
                    <option value="all">All</option>
                    <option value="unread">Unread</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div className="col s12">
                  { (displayedMessage.length > 0) ? messageCards : <h6 className="center-align margin-v2">No Messages Available. Create one from the right sidebar</h6> }
                </div>
              </div>
            </div>
            { /* Right Sidebar*/ }
            <div className="col s12 m12 l3">
              <div className="row">
                { /* Group Stats*/ }
                {/* <div className="col s12 m12 l12 teal accent-4 padding05">
                  <h6 className="white-text center-align" style={{ marginBottom: '2rem' }}>GROUP STATISTICS</h6>
                  <div className="col s12 m12 l12 center-align">
                    <i className="material-icons white-text large">group</i>
                    <h5 className="white-text">15 Members</h5>
                  </div>
                </div> */}
                { /* Send A Message div*/ }
                <div className="col s12 m12 l12 no-padding">
                  <PostMessageForm groupId={this.props.groupDetails.split(' ')[0]} />
                  <a href="#postMessageModal" className="waves-effect waves-light one-whole btn margin-v2 modal-trigger">Send A Message</a>
                </div>
                <hr/>
                { /* Add new user div*/ }
                <div className="col s12 m12 l12 no-padding">
                  <AddUserForm groupId={this.props.groupDetails.split(' ')[0]} />
                  <a href="#addUserModal" className="waves-effect waves-light one-whole btn margin-v2 modal-trigger">Add New Users To Group</a>
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
  groupDetails: state.groupDetails.details,
  user: state.auth.user
});

export default connect(mapStateToProps, { getMessages, passMessage, updateReadBy })(GroupPage);
