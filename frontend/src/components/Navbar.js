import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser, editUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';
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
class Navbar extends Component {
  constructor() {
      super();
      this.state = {
        modal : false,
        email : '',
        name : '',
        password: ''
      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    componentDidMount() {
        if(this.props.auth.user){
          let user = this.props.auth.user;
          this.setState({name :user.name , email : user.email})
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.user) {
          let user = nextProps.auth.user;
          this.setState({name :user.name , email : user.email})
        }
    }
    handleSubmit(e) {
       e.preventDefault();
       let token = localStorage.getItem('jwtToken')
       const user = {

         name: this.state.name,
           email: this.state.email,
           password: this.state.password,
       }
        this.props.editUser(user,token,this.props.history);
   };
    toggle = () => {
      this.setState({
        modal: !this.state.modal
      });
    };
     onViewInfo(e) {
       console.log(this.state);
      this.toggle()
     }

    render() {
        const {isAuthenticated, user} = this.props.auth;
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <a className='mt-2' onClick={this.onViewInfo.bind(this)}>
                  <strong >{user ? `Welcome ${user.name}` : ''}</strong>
                </a>
                <a href="" className="nav-link" onClick={this.onLogout.bind(this)}>
                            Logout
                </a>
            </ul>
        )
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Sign In</Link>
            </li>
        </ul>
      )
        return(
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Identify Access Manage</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>


            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>User Information</ModalHeader>
              <ModalBody>
                <Form onSubmit={this.handleSubmitModal}>
                  <FormGroup>
                    <Label for='name'>Name</Label>
                    <Input
                      type='text'
                      name='name'
                      id='name'
                      value = {this.state.name}
                      onChange={this.handleInputChange}
                    />
                    <Label for='email'>Email</Label>
                    <Input
                      type='text'
                      name='email'
                      id='email'
                      value = {this.state.email}
                      onChange={this.handleInputChange}
                    />
                    <Label for='password'>Password</Label>
                    <Input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='Input here if you want to change password!'
                      onChange={this.handleInputChange}
                    />
                    <Button color='dark' style={{ marginTop: '2rem' }} block>
                      Confirm
                    </Button>
                  </FormGroup>
                </Form>
              </ModalBody>
            </Modal>
</div>


        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, editUser })(withRouter(Navbar));
