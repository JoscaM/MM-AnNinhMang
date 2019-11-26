import React  , {Component} from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { getUserInfo , deleteUser } from '../actions/dinaryAction'
import { connect } from 'react-redux';
class Manage extends Component {
   constructor(props){
     super(props);
     this.state = {};
   };
   componentDidMount() {
     let token  = localStorage.jwtToken
     this.props.getUserInfo(token);
   };
  render() {
    let {users}= this.props.dinaries;
    let token = localStorage.getItem('jwtToken');
    console.log(users);
    return(
    <div style={{ maxWidth: "100%" }}>
       <MaterialTable
         columns={[
           { title: "Id", field: "_id" },
           { title: "Name", field: "name" },
           { title: "Email", field: "email" },
           { title: "RegisterDate", field: "register_date"  }
         ]}
         data={users}
         title="User Management"
         editable ={{
           onRowAdd: newData =>
              new Promise(resolve =>{
                setTimeout(() => {
                    resolve();

                    // {this.props.admincreate(newData,token) }

                  }, 600)
                }),
           onRowUpdate: (newData,oldData) =>
              new Promise(resolve =>{
                setTimeout(() => {
                    resolve();

                    // {this.props.adminUpdate(newData,oldData.id,token) }
                  }, 600)
                }),
           onRowDelete: oldData=>
              new Promise(resolve =>{
                setTimeout(() => {
                    resolve();

                    // {this.props.adminDelete(oldData.id,token) }
                  }, 600);
                 }),
         }}
       />
     </div>
   )}
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
