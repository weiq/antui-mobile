import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';
import { CoreLayout } from '../src/components/layout';
import "babel-polyfill";
import Pages from './index';
import FastClick from 'fastclick';
const { Home, Icon, Layout, SearchBar, ImageLoader, 
  Modal, Drawer, Chart, NavBar } = Pages;

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <CoreLayout>
        {this.props.children}
      </CoreLayout>
    );
  }
}

window.addEventListener('load', () => {
  FastClick.attach(document.body);
});

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="chart" component={Chart} />
      <Route path="drawer" component={Drawer} />
      <Route path="modal" component={Modal} />
      <Route path="searchbar" component={SearchBar} />
      <Route path="layout" component={Layout} />
      <Route path="icon" component={Icon} />
      <Route path="image" component={ImageLoader} />
      <Route path="navbar" component={NavBar} />
    </Route>
  </Router>
), document.getElementById('container'));