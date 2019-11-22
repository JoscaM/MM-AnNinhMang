import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dinary from './Dinary';
class Admin extends Component {


      componentDidMount() {
          if(this.props.auth.isAuthenticated) {
              if (this.props.auth.user.userrole ==='User'){
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
            if ( nextProps.auth.user.userrole === "User" ){
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
            <div>
                <Dinary />
            </div>
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
