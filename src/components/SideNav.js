import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class SideNav extends Component {
  static propTypes = {
    links: PropTypes.array
  };

  render() {
    const { links } = this.props;
    return (
      <nav className="nav flex-column">
        {_.map(links, (link, i) =>
          <a className="nav-link" href="#" key={`${link}-${i}`}>{link}</a>
        )}
      </nav>
    );
  }
}
