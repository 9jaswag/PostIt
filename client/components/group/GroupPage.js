import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Sidebar from '../sidebar/Sidebar';
import PostMessageForm from '../postMessage/PostMessageForm';
import AddUserForm from '../addUser/AddUserForm';
import getMessages from '../../actions/getMessages';
import passMessage from '../../actions/passMessageAction';
import updateReadBy from '../../actions/readbyAction';

class GroupPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
      priority: ''
    };
    
    this.onLoad = this.onLoad.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onLoad() {
    this.props.getMessages(this.props.groupDetails.split(' ')[0]).then(
      (res) => {
        this.setState({messages: res.data.data})
      },
      () => {}
    );
  }
  onClick(e) {
    sessionStorage.setItem('message', e.target.dataset.fullmessage );
    const data = { id: Number(e.target.dataset.id), readby: `${e.target.dataset.readby}${this.props.user.userUsername},` };
    console.log(data);
    //check if user is already in readby before adding
    this.props.updateReadBy(data);
    // get message readby, update readby and redirect to message
    // location.href="/message"
  }

  componentDidMount() {
    this.onLoad();
  }

  render() {
    const { messages } = this.state;
    const groupName = this.props.groupDetails.split(' ')[1];
    const messageCards = messages.map( message =>
      <div key={message.id} className="card teal darken-1 hoverable tooltipped" data-position="top" data-delay="50" data-tooltip="click to view message">
        <div className="card-content white-text">
          <h5 className="pointer" onClick={ this.onClick } data-id={ message.id } data-readby={ message.readby } data-fullmessage={JSON.stringify(message)}>{ message.title }</h5>
          <h6 className="inline-block">@{message.author} <small className="padding-left">{ new Date(message.createdAt).toLocaleTimeString({hour12: true}) }</small></h6>
          <span className={ classnames('margin-h default-radius slim', {
            'red darken-3': message.priority === 'critical',
            'amber accent-4': message.priority === 'urgent',
            'light-blue darken-3': message.priority === 'normal',
          }) } style={{ padding: '.1rem .4rem' }}>{ message.priority }</span>
        </div>
        <div className="card-action">
          <span className="white-text">Read By: @{ message.readby }</span>
        </div>
      </div>
    )
    return(
      <div>
        { /*Main Page*/ }
        <div className="row">
          { /*Sidebar*/ }
          <Sidebar />
          { /*Main Page*/ }
          <div className="col s12 m9 l10">
            <div className="col s12 m12 l9" style={{ marginTop: '2rem' }}>
              <h5 className="center-align uppercase">{ groupName ? `${groupName} Message Board` : null } </h5>
              <div className="row full-height overflow-y-scroll">
                { /*Message Cards*/ }
                <div className="col s12">
                  { (messages.length > 0) ? messageCards : <h5 className="center-align margin-v2">No Messages Available. Create one from the right sidebar</h5> }
                </div>
              </div>
            </div>
            { /*Right Sidebar*/ }
            <div className="col s12 m12 l3">
              <div className="row">
                { /*Group Stats*/ }
                <div className="col s12 m12 l12 teal accent-4 padding05">
                  <h6 className="white-text center-align" style={{ marginBottom: '2rem' }}>GROUP STATISTICS</h6>
                  <div className="col s12 m12 l12 center-align">
                    <i className="material-icons white-text large">group</i>
                    <h5 className="white-text">15 Members</h5>
                  </div>
                </div>
                { /*Send A Message div*/ }
                <div className="col s12 m12 l12 no-padding">
                  <PostMessageForm groupId={this.props.groupDetails.split(' ')[0]} />
                  <a href="#postMessageModal" className="waves-effect waves-light one-whole btn margin-v2 modal-trigger">Send A Message</a>
                </div>
                <hr/>
                { /*Add new user div*/ }
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

GroupPage.propTypes = {
  groupDetails: React.PropTypes.string.isRequired,
  getMessages: React.PropTypes.func.isRequired,
  passMessage: React.PropTypes.func.isRequired,
  updateReadBy: React.PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    groupDetails: state.groupDetails.details,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { getMessages, passMessage, updateReadBy }) (GroupPage);
