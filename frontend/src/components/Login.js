import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser, logoutUser } from '../actions/authentication';
import classnames from 'classnames';
import bcrypt from 'bcryptjs'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

class Login extends Component {

    constructor() {
        super();
        this.state = {
          modal : false,
            email: '',
            password: '',
            code : '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

     handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
         this.props.loginUser(user);
         this.toggle();
    };

    toggle = () => {
      this.setState({
        modal: !this.state.modal
      });
    };
    handleSubmitModal(code,path,user){
      bcrypt.compare(this.state.code ,code )
      .then( isMatch =>{
        if(isMatch){
            localStorage.setItem('userrole', user.userrole);
           localStorage.setItem('jwtToken', user.token);
           localStorage.setItem('name', user.name);
            this.props.history.push(path)
          }
        else{
          this.props.history.push('/login');
        }
      })
    }
    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            console.log(this.props.auth);
            if (this.props.auth.user.userrole ==='User'){
              this.props.history.push('/');

              // this.handleClick(this.props.auth.user.code , '/')

            }
            else{
              this.props.history.push('/admin');
              // this.handleClick(this.props.auth.user.code , 'admin')

            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
          console.log(nextProps.auth.user.userrole);
          if ( nextProps.auth.user.userrole === "User" ){
            this.handleSubmitModal(nextProps.auth.user.code , '/',nextProps.auth.user)
          }
          else{
            this.handleSubmitModal(nextProps.auth.user.code , 'admin',nextProps.auth.user)
          }
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    render() {
        const {errors} = this.state;
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Login</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })}
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Login User
                    </button>
                </div>
            </form>

            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>Verify code from your email</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.handleSubmitModal}>
                  <FormGroup>
                    <Label for='item'>Code</Label>
                    <Input
                      type='text'
                      name='code'
                      id='code'
                      placeholder='Input code here'
                      onChange={this.handleInputChange}
                    />
                    <Button color='dark' style={{ marginTop: '2rem' }} block>
                      Verify
                    </Button>
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>




















        </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, { loginUser ,logoutUser })(Login)
