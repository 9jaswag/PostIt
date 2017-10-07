import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Sidebar from '../dashboard/Sidebar.jsx';
import MessageContent from './MessageContent.jsx';

/**
 * @export
 * @class MessagePage
 * @extends {Component}
 */
export class MessagePage extends Component {
  /**
   * Creates an instance of MessagePage.
   * @param {any} props
   * @memberof MessagePage
   */
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }
  /**
   * Takes the user to the previous page
   * @method goBack
   * @return {void}
   */
  goBack() {
    this.props.history.push('/group');
  }
  /**
   * Checks if a message is passed before the component is rendered
   * @method componentDidMount
   * @return {void}
   * @memberof MessagePage
   */
  componentWillMount() {
    if (!(this.props.message)) {
      this.props.history.push('/group');
    }
  }
  /**
   * @returns {string} The HTML markup for the MessagePage component
   * @memberof MessagePage
   */
  render() {
    const message = this.props.message;
    const messageContent = <MessageContent message={ message }/>;
    return (
      <div>
        { /* Main Page*/ }
        <div className="row">
          { /* Sidebar*/ }
          <Sidebar />
          { /* Main Page*/ }
          <div className="col s12 m9 l10">
            <div className="col s12" style={{ marginTop: '2rem' }}>
              <div className="container">
                <div className="row full-height overflow-y-scroll margin-v2">
                  <button
                    onClick={ this.goBack }
                    className="btn waves-effect waves-light">Go Back
                  </button>
                  { /* Message Div*/ }
                  { message && messageContent }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: JSON.parse(state.message.message)
});

export default connect(mapStateToProps)(MessagePage);
