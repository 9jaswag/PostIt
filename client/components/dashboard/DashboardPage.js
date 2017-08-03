import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../sidebar/Sidebar';
import getGroups from '../../actions/getGroups';
import setGroupId from '../../actions/groupIdAction';

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      currGroupId: null
    }
    this.onLoad = this.onLoad.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onLoad() {
    this.props.getGroups().then(
      (res) => {
        this.setState({groups: res.data.data.Groups})
      },
      () => {}
    );
  }

  onClick(e) {
    this.props.setGroupId(e.target.dataset.id + ' ' + e.target.dataset.name );
    sessionStorage.setItem('groupDetails', e.target.dataset.id + ' ' + e.target.dataset.name );
  }
  
  componentDidMount() {
    this.onLoad();
  }

  render() {
    const { groups } = this.state;
    const groupCards = groups.map( group =>
      <a onClick= { this.onClick } href="/group" className="tooltipped pointer" data-position="right" data-delay="50" data-tooltip={ group.description }  key={group.id}>
      <div className="col s12 m6 l4">
        <div data-id={group.id} data-name={group.name} className="card-panel hoverable">{ group.name }<span className="new badge">4</span></div>
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
              { (groups.length > 0 ) ? groupCards : <h4 className="center-align">No Groups Available. Create one from the left sidebar</h4> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes= {
  getGroups: React.PropTypes.func.isRequired,
  setGroupId: React.PropTypes.func.isRequired
}

export default connect(null, { getGroups, setGroupId }) (DashboardPage);
