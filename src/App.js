import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router';

import Container from './components/Container';

import './styles/index.scss';

const routes = [{
  component: Container,
  path: '/example',
}];

export default class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Container} />
            {_.map(routes, (route, i) => {
              const { path, component } = route;
              return <Route path={path} component={component} key={`${path}-${i}`} />;
            })}
          </Switch>
        </Router>
      </Provider>
    );
  }
}

