import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Sidebar from '../dashboard/Sidebar';
import { getGroups, setGroupToStore } from '../../actions/groupActions';
import GroupCards from '../group/GroupCards';

const propTypes = {
  getGroups: PropTypes.func.isRequired,
  setGroupToStore: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired
};

/**
 * @description the Dashboard Page component
 * @export
 * @class DashboardPage
 * @extends {Component}
 */
export class DashboardPage extends Component {
  /**
   * @description constructor that creates an instance of DashboardPage.
   * @param {any} props
   * @memberof DashboardPage
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * @method componentDidMount
   * @description class method that gets the user's groups on component mount
   * @return {void}
   * @memberof DashboardPage
   */
  componentDidMount() {
    this.props.getGroups();
  }

  /**
   * @method onClick
   * @description class method that handles the click of a group card
   * @param {object} event
   * @returns {void}
   * @memberof DashboardPage
   */
  onClick(event) {
    this.props.setGroupToStore(
      [event.target.dataset.id,
        event.target.dataset.name,
        event.target.dataset.owner
      ]);
    $('.tooltipped').tooltip('remove');
    this.props.history.push('/group');
  }

  /**
   * @method render
   * @description class method that renders the component
   * @returns {string} The HTML markup for the DashboardPage
   * @memberof DashboardPage
   */
  render() {
    const groups = this.props.groups;
    const groupCards = groups.map(group => (<GroupCards
      onClick={this.onClick}
      group={group}
      key={group.group.id}
    />));
    return (
      <div className="row">
        { /* Sidebar*/ }
        <Sidebar />
        { /* Main page*/ }
        <div className="col s12 m9 l10 margin-v-top">
          <div className="col s12 m12 l12">
            <h5 className="center-align uppercase margin-v-bottom">
              My Groups
            </h5>
            { /* Group cards*/ }
            { (groups.length > 0) ? groupCards : <h6
              className="center-align margin-v2"
            >
              No Groups Available. Create one from the sidebar</h6> }
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

export default connect(
  mapStateToProps,
  { getGroups, setGroupToStore })(withRouter(DashboardPage));
