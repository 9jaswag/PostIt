import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Sidebar from '../sidebar/Sidebar';

/**
 * Message component
 * for displayng individual messages
 */
class MessagePage extends Component {
  render() {
    return(
      <div>
        { /*Main Page*/ }
        <div className="row">
          { /*Sidebar*/ }
          <Sidebar />
          { /*Main Page*/ }
          <div className="col s12 m9 l10">
            <div className="col s12" style={{ marginTop: '2rem' }}>
              <h5 className="center-align uppercase"> Message Title </h5>
              <div className="row full-height overflow-y-scroll">
                { /*Message Cards*/ }
                Message
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null) (MessagePage);
