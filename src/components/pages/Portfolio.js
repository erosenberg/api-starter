import React, { Component } from 'react';
import SideNav from '../SideNav';

export default class Portfolio extends Component {
  render() {
    const sections = ['work', 'education', 'skills'];

    return (
      <div className="container">
        <div className="row">
          <div className="sidebar col-md-3">
            <SideNav links={sections} />
          </div>
          <div className="content col-md-9">Main content</div>
        </div>
      </div>
    );
  }
}
