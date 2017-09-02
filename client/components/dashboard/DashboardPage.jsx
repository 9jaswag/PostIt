import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from '../sidebar/Sidebar';
import getGroups from '../../actions/getGroups';
import getMessages from '../../actions/getMessages';
import GroupCards from '../group/GroupCards';

const propTypes = {
  getGroups: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
};

/**
 * @export
 * @class DashboardPage
 * @extends {Component}
 */
export class DashboardPage extends Component {
  /**
   * Creates an instance of DashboardPage.
   * @param {any} props
   * @memberof DashboardPage
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  /**
   * @param {object} e
   * @returns {void}
   * @memberof DashboardPage
   */
  onClick(e) {
    sessionStorage.setItem('groupDetails', `${e.target.dataset.id} ${e.target.dataset.name}`);
  }
  /**
   * Gets the user's groups on component mount
   * @method componentDidMount
   * @return {void}
   * @memberof DashboardPage
   */
  componentDidMount() {
    this.props.getGroups();
  }

  /**
   * @returns {string} The HTML markup for the DashboardPage
   * @memberof DashboardPage
   */
  render() {
    const groups = this.props.groups;
    const groupCards = groups.map(group => <div key={ group.group.id }>
      <GroupCards onClick={ this.onClick } group={ group }/>
    </div>);
    return (
      <div>
        <div className="row">
          { /* Sidebar*/ }
          <Sidebar />
          { /* Main page*/ }
          <div className="col s12 m9 l10" style={{ marginTop: '2rem' }}>
            <div className="col s12 m12 l12">
              <h5 className="center-align uppercase" style={{ marginBottom: '2rem' }}>My Groups</h5>
              { /* Group cards*/ }
              { (groups.length > 0) ? groupCards : <h6 className="center-align margin-v2">No Groups Available. Create one from the left sidebar</h6> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = propTypes;

const mapStateToProps = state => ({
  user: state.auth.user,
  groups: state.groups
});

export default connect(mapStateToProps, { getGroups, getMessages })(DashboardPage);
