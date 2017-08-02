import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../sidebar/Sidebar';
import getGroups from '../../actions/getGroups';

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    }
    this.onLoad = this.onLoad.bind(this);
  }

  onLoad() {
    this.props.getGroups().then(
      (res) => {
        this.setState({groups: res.data.data.Groups})
      },
      () => {}
    );
  }
  
  componentDidMount() {
    this.onLoad();
  }

  render() {
    const { groups } = this.state;
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
              {/* <a href="/group" className="tooltipped pointer"  data-position="right" data-delay="50" data-tooltip="This is a short group description of a maximum of about 70 chars.">
                <div className="col s12 m6 l4">
                  <div className="card-panel hoverable">Andela Bootcamp <span className="new badge">4</span></div>
                </div>
              </a> */}
              { groups.map( group => 
                <a href="/group" className="tooltipped pointer" data-position="right" data-delay="50" data-tooltip={ group.description }  key={group.id}>
                <div className="col s12 m6 l4">
                  <div className="card-panel hoverable">{ group.name }<span className="new badge">4</span></div>
                </div>
              </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes= {
  getGroups: React.PropTypes.func.isRequired
}

export default connect(null, { getGroups }) (DashboardPage);
