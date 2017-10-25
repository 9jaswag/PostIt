import React from 'react';
/**
 * RenderUser component
 * @param {object} param0 object containing user's detail
 * @returns {string} The HTML markup for the Render component
 */
const RenderUser = ({ user, loopKey }) => <div className="card-panel hoverable">
  <div className="row" key={ loopKey }>
    <div className="col s12">
      <span className="bold">Username:</span>
      <span className="bold margin-h">@{ user.username }</span>
    </div>
    <div className="col s6">
      <span className="bold">Email:</span>
      <span className="italics margin-h">{ user.email }</span>
    </div>
    <div className="col s6">
      <span className="bold">Groups:</span>
      <span className="italics margin-h">{ user.Groups.length }</span>
    </div>
    <div className="col s12">
      <span className="bold">Phone:</span>
      <span className="italics margin-h">{ user.phone }</span>
    </div>
  </div>
</div>;

export default RenderUser;
