import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import createGroup from '../../actions/createGroup';

const propTypes = {
  createGroup: PropTypes.func.isRequired
};

export class CreateGroupForm extends Component {
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

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    this.props.createGroup(this.state).then(
      () => {
        location.href= '/dashboard';
        Materialize.toast('Group created successfully', 2000);
      },
      ({ response }) => this.setState({ errors: response.data.errors, isLoading: false })
    );
  }

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

export default connect(null, { createGroup })(CreateGroupForm);
