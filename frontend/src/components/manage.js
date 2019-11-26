import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUserInfo , deleteUser } from '../actions/dinaryAction'
import { connect } from 'react-redux';
class Manage extends Component {

  componentDidMount() {
    let token  = localStorage.jwtToken
    this.props.getUserInfo(token);
  };

  handleClick = id => {
    let token  = localStorage.jwtToken
    this.props.deleteUser(id ,token )
  }
    render() {
      let {users}= this.props.dinaries;
      // console.log(dinaries);
        return (
            <div className="mt-5">
              <table class="table table-striped">
                  <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">RegisterDate</th>
                    <th scope="col">Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  { users.map(({_id,name , email , register_date })=>(
                    <tr>
                      <th scope="row">{_id}</th>
                      <th >{name}</th>
                      <td>{email}</td>
                      <td>{register_date}</td>
                      <td>
                        <button onClick={this.handleClick.bind(this, _id)} type="button" class="btn btn-danger">Delete</button>
                        <button  type="button" class="btn btn-success">Active</button>
                      </td>

                    </tr>
                  ))
                }

                  </tbody>
  </table>

            </div>
        );
    }
}

Manage.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    userList: PropTypes.array.isRequired,
    getUserInfo : PropTypes.func.isRequired,
    deleteUser : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    dinaries : state.dinaries,
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps,  {getUserInfo , deleteUser} )(Manage)
