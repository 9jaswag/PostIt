/* global Materialize */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import createGroup from '../../actions/createGroup';

const propTypes = {
  createGroup: PropTypes.func.isRequired
};

/**
 * @export
 * @class CreateGroupForm
 * @extends {Component}
 */
export class CreateGroupForm extends Component {
  /**
   * Creates an instance of CreateGroupForm.
   * @param {any} props
   * @memberof CreateGroupForm
   */
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @param {object} e
   * @returns {void}
   * @memberof CreateGroupForm
   */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * Makes an action call to create a new group
   * @param {object} e
   * @returns {void}
   * @memberof CreateGroupForm
   */
  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.createGroup(this.state).then(
      () => {
        this.props.history.push('/dashboard');
        Materialize.toast('Group created successfully', 2000);
      },
      ({ response }) => this.setState({ errors: response.data.errors, isLoading: false })
    );
  }
  /**
   * @returns {string} The HTML markup for the CreateGroupForm
   * @memberof CreateGroupForm
   */
  render() {
    const { errors } = this.state;
    return (
      <div>
        <form action="" className="col s12" onSubmit={ this.onSubmit }>
          <div className="row">
            <div className="input-field col s12">
              <input type="text" name="name" id="name" className="validate" onChange={ this.onChange } value={ this.state.name } required />
              <label htmlFor="name">Group Name</label>
              { errors.group && <span className="red-text">{ errors.group }</span>}
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input type="text" name="description" id="description" className="validate" onChange={ this.onChange } value={ this.state.description } data-length="80" required/>
              <label htmlFor="description">Group Description</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input className="btn one-whole" type="submit" value="Create Group"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

CreateGroupForm.propTypes = propTypes;

export default connect(null, { createGroup })(withRouter(CreateGroupForm));
