import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from '../sidebar/Sidebar';
import getGroups from '../../actions/getGroups';
import getMessages from '../../actions/getMessages';
import GroupCards from '../group/GroupCards';

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
      return <div key={ group.group.id }>
        <GroupCards onClick={ this.onClick } group={ group }/>
      </div>
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
  getGroups: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
}

function mapStateToProps(state){
  return {
    user: state.auth.user,
    groups: state.groups
  }
}

export default connect(mapStateToProps, { getGroups, getMessages }) (DashboardPage);