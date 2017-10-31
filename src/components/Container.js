import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import { fetchData, setViewId } from '../actions';
import Header from './Header';

class Container extends Component {
  static propTypes = {
    fetchData: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div className="container-fluid l-container">
        <Header />
        <Link to="/">Home</Link>
      </div>
    );
  }
}
const ConnectedContainer = connect(
  state => ({
    data: state.data,
  }),
  dispatch => ({
    fetchData: () => dispatch(fetchData()),
  }),
)(Container);

export default ConnectedContainer;
