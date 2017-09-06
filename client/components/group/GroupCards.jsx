import React from 'react';
import { Link } from 'react-router-dom';

/**
 * GroupCards component.
 * @returns {string} The HTML markup for the GroupCards component
 */
const GroupCards = ({ onClick, group }) => (
  <div className="tooltipped" data-position="top" data-delay="50" data-tooltip={ group.group.description }>
    <Link className="pointer" to="/group" onClick={ onClick }>
      <div className="col s12 m6 l4">
        <div data-id={group.group.id} data-name={group.group.name} className="card-panel hoverable">{ group.group.name } { (group.unreadCount > 0) ? <span className="new badge">{group.unreadCount}</span> : null}</div>
      </div>
    </Link>
  </div>
);

export default GroupCards;
