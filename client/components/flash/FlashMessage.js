import React, { Component } from 'react';

class FlashMessage extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  render() {
    const { id, type, text } = this.props.message;
    return(
      <div className="center-align text-red">
        <button onClick= { this.onClick } className="close"><span>&times;</span></button>
        { text }
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: React.PropTypes.object.isRequired,
  deleteFlashMessage: React.PropTypes.func.isRequired
}

export default FlashMessage;