import React from 'react';

/**
 * GroupCards component.
 * @returns {string} The HTML markup for the GroupCards component
 */
const GroupCards = ({ onClick, group }) => (
  <div className="tooltipped pointer"
    data-position="top" data-delay="50"
    data-tooltip={ group.group.description }>
    <div onClick={ onClick }>
      <div className="col s12 m6 l4">
        <div data-id={group.group.id}
          data-name={group.group.name}
          data-owner={group.group.owner}
          className="card-panel hoverable">
          { group.group.name } { (group.unreadCount > 0) ? <span
            className="new badge">{group.unreadCount}</span> : null}</div>
      </div>
    </div>
  </div>
);

export default GroupCards;
