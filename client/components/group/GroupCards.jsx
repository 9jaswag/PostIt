import React from 'react';

const GroupCards = ({onClick, description, id, name, count, }) => (
  <div>
  <a onClick= { onClick } href="/group"  className="tooltipped pointer" data-position="right" data-delay="50" data-tooltip={ group.group.description }>
  <div className="col s12 m6 l4">
    <div data-id={group.group.id} data-name={group.group.name} className="card-panel hoverable">{ group.group.name }{ (count > 0) ? <span className="new badge">{group.unreadCount}</span> : null}</div>
  </div>
  </a>
</div>
);

export default GroupCards;