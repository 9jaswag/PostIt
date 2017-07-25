import React, { Component } from 'react';
import Sidebar from '../sidebar/Sidebar';

class GroupPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showMessageDiv: false,
      showAddUserDiv: false
    };

    this.postMessage = this.postMessage.bind(this);
    this.addUser = this.addUser.bind(this);
  }
  postMessage() {
    if (this.state.showAddUserDiv) {
      this.setState(prevState => ({
        showAddUserDiv: !prevState.showAddUserDiv
      }));
    }
    this.setState(prevState => ({
      showMessageDiv: !prevState.showMessageDiv
    }));
  }
  addUser() {
    if (this.state.showMessageDiv) {
      this.setState(prevState => ({
        showMessageDiv: !prevState.showMessageDiv
      })); 
    }
    this.setState(prevState => ({
      showAddUserDiv: !prevState.showAddUserDiv
    }));
  }

  render() {
    return(
      <div>
        { /*Main Page*/ }
        <div className="row">
          { /*Sidebar*/ }
          <Sidebar />
          { /*Main Page*/ }
          <div className="col s12 m9 l10">
            <div className="col s12 m12 l9" style={{ marginTop: '2rem' }}>
              <h5 className="center-align uppercase">Andela Bootcamp Message Board</h5>
              <div className="row full-height overflow-y-scroll">
                { /*Message Cards*/ }
                <div className="col s12">
                  <div className="card teal darken-1 hoverable">
                    <div className="card-content white-text">
                      <h6 className="inline-block">@troy34 <small className="padding-left">2:15pm</small></h6>
                      <span className="red darken-3 margin-h default-radius" style={{ padding: '.1rem .4rem' }}>critical</span>
                      <p>I am a very simple card. I am good at containing small bits of information.</p>
                    </div>
                    <div className="card-action right-align">
                      <i className="material-icons" style={{cursor: 'pointer'}}>delete</i>
                    </div>
                  </div>
                  <div className="card teal darken-1 hoverable">
                    <div className="card-content white-text">
                      <h6 className="inline-block">@troy34 <small className="padding-left">2:15pm</small></h6>
                      <span className="amber accent-4 margin-h default-radius" style={{ padding: '.1rem .4rem' }}>urgent</span>
                      <p>I am a very simple card. I am good at containing small bits of information.</p>
                    </div>
                    <div className="card-action right-align">
                      <i className="material-icons" style={{cursor: 'pointer'}}>delete</i>
                    </div>
                  </div>
                  <div className="card teal darken-1 hoverable">
                    <div className="card-content white-text">
                      <h6 className="inline-block">@troy34 <small className="padding-left">2:15pm</small></h6>
                      <span className="light-blue darken-3 margin-h default-radius" style={{ padding: '.1rem .4rem' }}>normal</span>
                      <p>I am a very simple card. I am good at containing small bits of information.</p>
                    </div>
                    <div className="card-action right-align">
                      <i className="material-icons" style={{cursor: 'pointer'}}>delete</i>
                    </div>
                  </div>
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
                  { this.state.showMessageDiv ? <MessageDiv onClick={ this.postMessage } /> : null }
                  <button className="btn margin-v2 post-message-toggle one-whole" onClick={ this.postMessage }>Send A Message</button>
                </div>
                <hr/>
                { /*Add new user div*/ }
                <div className="col s12 m12 l12 no-padding">
                  { this.state.showAddUserDiv ? <AddUserdiv onClick={ this.addUser }/> : null }
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

const MessageDiv = (props) => {
  return(
    <section className="post-message margin-v2">
      <h6 className="uppercase center-align">Post a new message</h6>
      <form action="" className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <textarea cols="30" rows="10" id="message" className="materialize-textarea" required></textarea>
            <label htmlFor="message">Message</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <select name="" id="priority">
              <option value="normal" defaultValue>Normal</option>
              <option value="urgent">Urgent</option>
              <option value="critical">Critical</option>
            </select>
            <label htmlFor="priority">Message Priority</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input className="btn one-whole" type="submit" value="Send Message"/>
            <input onClick={ props.onClick } className="btn one-whole post-message-cancel" type="reset" value="Cancel" style={{ marginTop: '.5rem' }}/>
          </div>
        </div>
      </form>
    </section>
  );
}

const AddUserdiv = (props) => {
  return(
    <section className="add-user-form">
      <h6 className="center-align uppercase">Search for a user and add them to this group</h6>
      <form action="" className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input id="username" type="text" className="validate" required/>
            <label htmlFor="first_name">Enter username</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input className="btn one-whole" type="submit" value="Add User"/>
            <input onClick={ props.onClick } className="btn one-whole adduser-cancel" type="reset" value="Cancel" style={{ marginTop: '.5rem' }}/>
          </div>
        </div>
      </form>
    </section>
  );
}

export default GroupPage;