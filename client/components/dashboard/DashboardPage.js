import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../sidebar/Sidebar';
import getGroups from '../../actions/getGroups';
import getMessages from '../../actions/getMessages';

export class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    sessionStorage.setItem('groupDetails', e.target.dataset.id + ' ' + e.target.dataset.name );
  }
  componentDidMount() {
    this.props.getGroups();
  }

  render() {;
    const groups = this.props.groups;
    const groupCards = groups.map((group) => {
      return <a className="pointer" href="/group" data-position="right" data-delay="50" data-tooltip={ group.group.description } key={group.group.id} onClick={ this.onClick }>
        <div className="col s12 m6 l4">
          <div data-id={group.group.id} data-name={group.group.name} className="card-panel hoverable">{ group.group.name } { (group.unreadCount > 0) ? <span className="new badge">{group.unreadCount}</span> : null}</div>
        </div>
      </a>
    });
    return(
      <div>
        <div className="row">
          { /*Sidebar*/ }
          <Sidebar />
          { /*Main page*/ }
          <div className="col s12 m9 l10" style={{ marginTop: '2rem' }}>
            <div className="col s12 m12 l12">
              <h5 className="center-align uppercase" style={{ marginBottom: '2rem' }}>My Groups</h5>
              { /*Group cards*/ }
              { (groups.length > 0) ? groupCards : <h6 className="center-align margin-v2">No Groups Available. Create one from the left sidebar</h6> } 
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes= {
  getGroups: React.PropTypes.func.isRequired,
  getMessages: React.PropTypes.func.isRequired,
}

function mapStateToProps(state){
  return {
    user: state.auth.user,
    groups: state.groups
  }
}

export default connect(mapStateToProps, { getGroups, getMessages }) (DashboardPage);