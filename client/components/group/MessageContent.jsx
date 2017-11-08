import React from 'react';
import classnames from 'classnames';

/**
 * @function MessageContent
 * @description the MessageContent component.
 * @returns {string} The HTML markup for the MessageContent component
 */
const MessageContent = ({ message }) => (
  <div className="card teal darken-1 hoverable">
    <div className="card-content white-text">
      <h5 className="slim">{ message.title }</h5>
      <h6 className="inline-block slim">@{message.author} <small
        className="padding-left"
      >
        { new Date(message.createdAt).toLocaleTimeString({ hour12: true })
        }</small>
      </h6>
      <span className={
        classnames('margin-h default-radius slim message-content-padding', {
          'red darken-3': message.priority === 'critical',
          'amber accent-4': message.priority === 'urgent',
          'light-blue darken-3': message.priority === 'normal',
        })}
      >{ message.priority }</span>
      <p className="flow-text">
        { message.message }
      </p>
    </div>
  </div>
);

export default MessageContent;
