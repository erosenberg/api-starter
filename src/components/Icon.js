import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Icon extends Component {
  static propTypes = {
    name: PropTypes.string
  };

  render() {
    const { name } = this.props;

    return (
      <i className={name ? `fa fa-${name}` : 'fa'} />
    );
  }
}



