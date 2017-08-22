import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../sidebar/Sidebar';
import getGroups from '../../actions/getGroups';
import setGroupId from '../../actions/groupIdAction';
import getMessages from '../../actions/getMessages';

export class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    }
    this.onLoad = this.onLoad.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onLoad() {
    const getGroup = new Promise ((resolve) => {
      resolve(this.props.getGroups());
    });
    getGroup.then(() => {
      const groupsWithNotification = [];
      this.props.groups.map(group => {
        this.props.getMessages(group.id).then(
          (res) => {
            // map returned message array
            let count = 0;
            res.data.data.map(message => {
              if (!message.readby.split(',').includes(this.props.user.userUsername)) {
                count ++;
              }
            })
            groupsWithNotification.push({id: group.id, name: group.name, count});
            this.setState({ groups: groupsWithNotification })
          },
          (err) => {}
        );
      });
    });
  }

  onClick(e) {
    sessionStorage.setItem('groupDetails', e.target.dataset.id + ' ' + e.target.dataset.name );
  }
  componentDidMount() {
    this.onLoad();
  }

  render() {
    const { groups } = this.state;
    const groupCards = groups.map(group =>
      <a onClick= { this.onClick } href="/group"  className="tooltipped pointer" data-position="right" data-delay="50" data-tooltip={ group.description }  key={group.id}>
        <div className="col s12 m6 l4">
          <div data-id={group.id} data-name={group.name} className="card-panel hoverable">{ group.name }{ (group.count > 0) ? <span className="new badge">{group.count}</span> : null}</div>
        </div>
      </a>
    );
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
              {/* { groupCards } */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes= {
  getGroups: React.PropTypes.func.isRequired,
  setGroupId: React.PropTypes.func.isRequired,
  getMessages: React.PropTypes.func.isRequired,
}

function mapStateToProps(state){
  return {
    user: state.auth.user,
    groups: state.groups
  }
}

export default connect(mapStateToProps, { getGroups, setGroupId, getMessages }) (DashboardPage);
