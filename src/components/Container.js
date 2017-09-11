import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import { fetchData, setViewId } from '../actions';
import Header from './Header';
import Card from './Card';

class Container extends Component {
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
