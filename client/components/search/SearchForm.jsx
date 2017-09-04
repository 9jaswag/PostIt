import React from 'react';

/**
 * Search form component
 * @param {object} param0
 * @returns {string} The HTML markup for the SearchForm
 */
const SearchForm = ({ onSubmit, onChange, state }) => <form action="" onSubmit={ onSubmit }>
  <div className="row">
    <div className="input-field col s12">
      <input placeholder="Enter a username and press enter" id="username" name="username" type="text" value={ state.username } onChange={ onChange } className="validate"/>
      <label htmlFor="username">Search</label>
    </div>
    <div className="col l12">{ state.errors && <span className="red-text">{ state.errors }</span>}</div>
  </div>
</form>;

export default SearchForm;
