import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dinary from './Dinary';
// import Manage from './manage';
import Manage from './newmanage'
import {Tabs, Tab} from 'react-bootstrap-tabs';

class Admin extends Component {
  constructor(props, context) {
          super(props, context);
          this.state = {
           key: 'home',
          };
  }
      componentDidMount() {
          if(this.props.auth.isAuthenticated) {
              console.log(this.props.auth);
              if (this.props.auth.user.userrole ==='User'||!this.props.auth.user.userrole){
                alert('You cant access this page!!')
                this.props.history.push('/');
              }
          }
          else {
            this.props.history.push('/');
          }
      }

      componentWillReceiveProps(nextProps) {
          if(nextProps.auth.isAuthenticated) {
            console.log(nextProps.auth.user.userrole);
            if ( nextProps.auth.user.userrole === "User"||!this.props.auth.user.userrole ){
              alert('You cant access this page!!')
              this.props.history.push('/');
            }
          }
          else {
            this.props.history.push('/');
          }
          if(nextProps.errors) {
              this.setState({
                  errors: nextProps.errors
              });
          }
      }

    render() {
        return (
          <Tabs className='mt-3' onSelect={(index, label) => console.log(label + ' selected')}>
              <Tab label="Dinary"><Dinary /></Tab>
              <Tab label="Manage"><Manage /></Tab>
          </Tabs>
        );
    }
}

Admin.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps,  null )(Admin)
