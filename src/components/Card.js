import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';


export default class Card extends Component {
  static propTypes = {
    imageSrc: PropTypes.string,
    description: PropTypes.string
  };

  render() {
    const { imageSrc, description } = this.props;

    return (
      <div className="l-card">
        <img src={imageSrc} className="l-card-img"></img>
        <div className="l-card-content">
          {description}
        </div>
        <div className="l-card-footer">
          <Icon name="calendar" />
        </div>
      </div>
    );
  }
}
