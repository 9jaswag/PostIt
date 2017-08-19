import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Sidebar from '../sidebar/Sidebar';

/**
 * Message component
 * for displayng individual messages
 */
export class MessagePage extends Component {
  constructor(props){
    super(props);
    this.goBack = this.goBack.bind(this);
  }
  
  goBack(){
    // window.history.back()
    location.href="/group"
  }

  componentWillMount(){
    console.log('yh')
    // deal with no message in storage
  }

  render() {
    const message = this.props.message;
    return(
      <div>
        { /*Main Page*/ }
        <div className="row">
          { /*Sidebar*/ }
          <Sidebar />
          { /*Main Page*/ }
          <div className="col s12 m9 l10">
            <div className="col s12" style={{ marginTop: '2rem' }}>
              <div className="row">
                <button onClick={ this.goBack } className="btn waves-effect waves-light">Go Back</button>
              </div>
              <div className="container">
                <div className="row full-height overflow-y-scroll margin-v2">
                  { /*Message Cards*/ }
                  <div className="card teal darken-1 hoverable">
                    <div className="card-content white-text">
                      <h5 className="slim">{ message.title }</h5>
                      <h6 className="inline-block slim">@{message.author} <small className="padding-left">{ new Date(message.createdAt).toLocaleTimeString({hour12: true}) }</small></h6>
                      <span className={ classnames('margin-h default-radius slim', {
                        'red darken-3': message.priority === 'critical',
                        'amber accent-4': message.priority === 'urgent',
                        'light-blue darken-3': message.priority === 'normal',
                      }) } style={{ padding: '.1rem .4rem' }}>{ message.priority }</span>
                      <p className="flow-text margin-v4">{ message.message }</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    message: JSON.parse(state.message.message)
  }
}

export default connect(mapStateToProps) (MessagePage);
