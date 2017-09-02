import React from 'react';
import classnames from 'classnames';

const MessageCard = ({ onClick, message }) => (
  <div className="teal darken-1 hoverable custom-card tooltipped" data-position="top" data-delay="50" data-tooltip="click message title to view message">
    <div className="white-text">
      <h5 className="pointer normal" onClick={ onClick } data-id={ message.id } data-readby={ message.readby } data-fullmessage={JSON.stringify(message)}>{ message.title }</h5>
      <span className="inline-block slim">@{message.author} <small className="padding-left">{ new Date(message.createdAt).toLocaleTimeString({ hour12: true }) }</small></span>
      <span className={ classnames('margin-h default-radius slim', {
        'red darken-3': message.priority === 'critical',
        'amber accent-4': message.priority === 'urgent',
        'light-blue darken-3': message.priority === 'normal',
      }) } style={{ padding: '.3rem .5rem', fontSize: '10px' }}>{ message.priority }</span>
      <div className="inline-block">
        {/* Dropdown Trigger */}
        <a className='dropdown-button text-white slim' href='#' data-activates='readby'>Read By</a>

        {/* Dropdown Structure */}
        <ul id='readby' className='dropdown-content teal darken-1'>
          {
            message.readby.map((user, index) => <span key={index} className="normal chip">@{ user } </span>)
          }
        </ul>
      </div>
    </div>
  </div>
);

export default MessageCard;
