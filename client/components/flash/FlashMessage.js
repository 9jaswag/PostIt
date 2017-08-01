import React, { Component } from 'react';

class FlashMessage extends Component {
  render() {
    const { id, type, text } = this.props.message;
    return(
      <div className="center-align text-red">
        { text }
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired
}

export default FlashMessage;