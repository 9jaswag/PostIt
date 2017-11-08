import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @function NotFound
 * @description the NotFound component
 * @returns {string} The HTML markup for the NotFound component
 */
const NotFound = () => (<div
  className="s12 teal accent-4 center-align fh valign-wrapper"
>
  <div className="center-align centralize">
    <h3 className="white-text">
      You're lost. Let's guide you <Link to="/">Home</Link>
    </h3>
  </div>
</div>);

export default NotFound;
