import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlashMessage from './FlashMessage.jsx';
import { deleteFlashMessage } from '../../actions/flashMessages';

class FlashMessagesList extends Component {
  render() {
    const messages = this.props.messages.map(message => {
      <FlashMessage key={message.id} message={message} deleteFlashMessage={this.props.deleteFlashMessage} />
    });
    return(
      <div>{messages}</div>
    );
  }
}

FlashMessagesList.propTypes = {
  messages: React.PropTypes.array.isRequired
}

function mapStateToProps(state){
  return {
    messages: state.flashMessages,
    deleteFlashMessage: React.PropTypes.func.isRequired
  }
}

export default connect(mapStateToProps, { deleteFlashMessage }) (FlashMessagesList);