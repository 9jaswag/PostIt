import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import createGroup from '../../actions/groupActions';

const propTypes = {
  createGroup: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

/**
 * @description the Create Group Form component
 * @export
 * @class CreateGroupForm
 * @extends {Component}
 */
export class CreateGroupForm extends Component {
  /**
   * @description constructor that creates an instance of CreateGroupForm.
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.groupDetails.length > 0 && !nextProps.error.errors) {
      Materialize.toast('Group created successfully', 2000);
      this.props.history.push('/group');
    }
    if (nextProps.error.errors) {
      this.setState({
        errors: nextProps.error.errors, isLoading: false
      });
    }
  }

  /**
   * @method onChange
   * @description class method that sets user input to state
   * @param {object} event
   * @returns {void}
   * @memberof CreateGroupForm
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   * @method onSubmit
   * @description class method that makes an action call to create a new group
   * @param {object} event
   * @returns {void}
   * @memberof CreateGroupForm
   */
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    if (this.state.description.length < 61) {
      this.props.createGroup(this.state);
    } else {
      this.setState({ errors: {
        description: 'Group description must be 60 characters or less'
      } });
    }
  }

  /**
   * @method render
   * @description class method that renders the component
   * @returns {string} The HTML markup for the CreateGroupForm
   * @memberof CreateGroupForm
   */
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <form action="" className="col s12" onSubmit={this.onSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                name="name"
                id="name"
                className="validate"
                onChange={this.onChange}
                value={this.state.name}
                required
                autoComplete="off"
              />
              <label htmlFor="name">Group Name</label>
              { errors.group && <span className="error">
                { errors.group }</span>}
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                name="description"
                id="description"
                className="validate"
                onChange={this.onChange}
                value={this.state.description}
                data-length="60"
                required
                autoComplete="off"
              />
              <label htmlFor="description">Group Description</label>
              { errors.description && <span className="error">
                { errors.description }</span>}
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                className="btn one-whole"
                type="submit"
                value="Create Group"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  groupDetails: state.groupDetails,
  error: state.error
});

CreateGroupForm.propTypes = propTypes;

export default connect(mapStateToProps, { createGroup })(withRouter(CreateGroupForm));
