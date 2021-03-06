import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import shortid from 'shortid';

/**
 * @function MessageCard
 * @description the MessageCard component.
 * @returns {string} The HTML markup for the MessageCard component
 */
const MessageCard = ({ onClick, message, loopKey }) => (
  <div
    className="teal darken-1 hoverable custom-card tooltipped margin-v"
    data-position="top"
    data-delay="50"
    data-tooltip="click message title to view message"
    key={loopKey}
  >
    <div className="white-text">
      <Link
        to={{
          pathname: '/message',
          state: { message }
        }}
        className="pointer normal text-white block"
        onClick={onClick}
        data-id={message.id}
        data-readby={message.readby}
      >{ message.title }
      </Link>
      <span className="inline-block slim">@{message.author} <small
        className="padding-left"
      >
        { new Date(message.createdAt).toLocaleTimeString({ hour12: true })
        }</small>
      </span>
      <span className={
        classnames('margin-h default-radius slim message-card-style', {
          'red darken-3': message.priority === 'critical',
          'amber accent-4': message.priority === 'urgent',
          'light-blue darken-3': message.priority === 'normal',
        })}
      >
        { message.priority }
      </span>
      <div className="inline-block">
        {/* Dropdown Trigger */}
        <a
          className="dropdown-button text-white slim"
          href="#"
          data-activates="readby"
        >Read By</a>

        {/* Dropdown Structure */}
        <ul id="readby" className="dropdown-content teal darken-1">
          {
            message.readby.map(user => (<span
              key={shortid.generate()}
              className="normal chip"
            >@{ user } </span>))
          }
        </ul>
      </div>
    </div>
  </div>
);

export default MessageCard;
