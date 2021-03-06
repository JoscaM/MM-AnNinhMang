import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDinary } from '../actions/dinaryAction'
import { connect } from 'react-redux';
import MaterialTable from 'material-table';

class Dinary extends Component {

  componentDidMount() {
    let token  = localStorage.jwtToken
    this.props.getDinary(token);
  };
    render() {
      let {dinaries}= this.props.dinaries;
      console.log(dinaries);
        return (
  //           {<div className="mt-5">
  //             <table class="table table-striped">
  //                 <thead>
  //                 <tr>
  //                   <th scope="col">Name</th>
  //                   <th scope="col">Action</th>
  //                   <th scope="col">TimeIn</th>
  //                   <th scope="col">TimeOut</th>
  //                 </tr>
  //                 </thead>
  //                 <tbody>
  //                 { dinaries.map(({author,action,timeIn, timeOut })=>(
  //                   <tr>
  //                     <th scope="row">{author}</th>
  //                     <td>{action}</td>
  //                     <td>{timeIn}</td>
  //                     <td>{timeOut}</td>
  //                   </tr>
  //                 ))
  //               }
  //
  //                 </tbody>
  // </table>
  //
  //           </div>}
  <div style={{ maxWidth: "100%" }}>
     <MaterialTable
       columns={[
         { title: "Author", field: "author" },
         { title: "User Action", field: "action" },
         { title: "TimeIn", field: "timeIn" },
         { title: "TimeOut", field: "timeOut"  }
       ]}
       data={dinaries}
       title="User Dinaries"
       editable ={{
         onRowDelete: newdata => console.log('add')
       }}
     />
   </div>
        );
    }
}

Dinary.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    dinaries: PropTypes.array.isRequired,
    getDinary : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    dinaries : state.dinaries,
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps,  {getDinary} )(Dinary)
