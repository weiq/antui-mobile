import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';
import {Layout as _Layout, NavBar as _NavBar} from '../src';
import "babel-polyfill";
import Pages from './index';
import FastClick from 'fastclick';
const { Home, Icon, Layout, SearchBar, ImageLoader, 
  Modal, Drawer, Chart, NavBar, Button } = Pages;

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <_Layout.CoreLayout transition="sfr" {...this.props}>
        <_Layout>
          <_Layout.Header>
            <_NavBar backURL="/" transition="sfl" />
          </_Layout.Header>
          <_Layout.Content>
            {this.props.children}
          </_Layout.Content>
        </_Layout>
      </_Layout.CoreLayout>
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
      <Route path="button" component={Button} />
    </Route>
  </Router>
), document.getElementById('container'));