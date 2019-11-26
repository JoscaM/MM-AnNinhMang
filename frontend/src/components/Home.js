import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddItem from './AddIteam'
import ShoppingList from './ShoppingList';
 class Home extends Component {
    constructor(props){
      super(props);
    }
    componentDidMount(){
      if(!this.props.auth){
        this.props.history.push('/')
      }
    }
    render() {
        return (
            <div>
                <AddItem />
                <ShoppingList />
            </div>
        );
    }
}
Home.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, null)(Home)
