import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router, Route } from 'react-router';
import "babel-polyfill";
import Pages from './index';
import FastClick from 'fastclick';
const { Button, Navpage, Tooltip, Icon, Layout, SearchBar, TreeTransfer, Map, Editor, Chart } = Pages;

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        {this.props.children}
      </div>
    );
  }
}

window.addEventListener('load', () => {
  FastClick.attach(document.body);
});

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="icon" component={Icon} />
    </Route>
  </Router>
), document.getElementById('container'));