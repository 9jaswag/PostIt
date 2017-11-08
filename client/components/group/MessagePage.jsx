import React, { Component } from 'react';
import Sidebar from '../dashboard/Sidebar';
import MessageContent from './MessageContent';

/**
 * @description the MessagePage component
 * @export
 * @class MessagePage
 * @extends {Component}
 */
export class MessagePage extends Component {
  /**
   * @description constructor that creates an instance of MessagePage.
   * @param {any} props
   * @memberof MessagePage
   */
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  /**
   * @method componentDidMount
   * @description class method that checks if a message
   * is passed before the component is rendered
   * @return {void}
   * @memberof MessagePage
   */
  componentWillMount() {
    if (!(this.props.location.state.message)) {
      this.props.history.push('/group');
    }
  }

  /**
   * @method goBack
   * @description class method that takes the user to the previous page
   * @return {void}
   * @memberof MessagePage
   */
  goBack() {
    this.props.history.push('/group');
  }

  /**
   * @method render
   * @description class method that renders the component
   * @returns {string} The HTML markup for the MessagePage component
   * @memberof MessagePage
   */
  render() {
    const message = this.props.location.state.message;
    const messageContent = <MessageContent message={message} />;
    return (
      <div>
        { /* Main Page*/ }
        <div className="row">
          { /* Sidebar*/ }
          <Sidebar />
          { /* Main Page*/ }
          <div className="col s12 m9 l10">
            <div className="col s12 margin-v-top">
              <div className="container">
                <div className="row full-height overflow-y-scroll margin-v2">
                  <button
                    onClick={this.goBack}
                    className="btn waves-effect waves-light"
                  >Go Back
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

export default MessagePage;
