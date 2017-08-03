import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../sidebar/Sidebar';
import getMessages from '../../actions/getMessages';

class GroupPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
      priority: ''
    };
    
    this.onLoad = this.onLoad.bind(this);
  }
  onLoad() {
    this.props.getMessages(this.props.groupDetails.split(' ')[0]).then(
      (res) => {
        this.setState({messages: res.data.data})
      },
      () => {}
    );
  }

  componentDidMount() {
    this.onLoad();
  }

  render() {
    const { messages } = this.state;
    const messageCards = messages.map( message =>
      <div className="card teal darken-1 hoverable" key={message.id}>
        <div className="card-content white-text">
          <h6 className="inline-block">@{message.author} <small className="padding-left">2:15pm</small></h6>
          <span className="red darken-3 margin-h default-radius" style={{ padding: '.1rem .4rem' }}>{ message.priority }</span>
          <p>{ message.message }</p>
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
              <h5 className="center-align uppercase">{ this.props.groupDetails.split(' ')[1] } Message Board</h5>
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
                  <div className="col s6 m6 l6 center-align">
                    <i className="material-icons white-text large">group</i>
                    <h5 className="white-text">15</h5>
                  </div>
                  <div className="col s6 m6 l6 center-align">
                    <i className="material-icons white-text large">message</i>
                    <h5 className="white-text">30</h5>
                  </div>
                </div>
                { /*Send A Message div*/ }
                <div className="col s12 m12 l12 no-padding">
                  <MessageDiv />
                  <button className="btn margin-v2 post-message-toggle one-whole" onClick={ this.postMessage }>Send A Message</button>
                </div>
                <hr/>
                { /*Add new user div*/ }
                <div className="col s12 m12 l12 no-padding">
                  <AddUserdiv />
                  <button className="btn margin-v2 add-user-trigger one-whole" onClick={ this.addUser }>Add New Users To Group</button>
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
}

function mapStateToProps(state){
  return {
    groupDetails: state.groupDetails.details
  }
}

export default connect(mapStateToProps, { getMessages }) (GroupPage);
