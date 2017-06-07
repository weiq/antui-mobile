import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router, Route, IndexRoute } from 'react-router';
import {Layout, NavBar} from '../src';
import "babel-polyfill";
import Pages from './index';
import FastClick from 'fastclick';
const { HomePage, IconPage, LayoutPage, SearchBarPage, ImageLoaderPage, 
  ModalPage, DrawerPage, ChartPage, NavBarPage, ButtonPage } = Pages;

class App extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return (
      <Layout.CoreLayout transition="sfr" {...this.props}>
        <Layout>
          <Layout.Header>
            <NavBar backURL="/" transition="sfl" />
          </Layout.Header>
          <Layout.Content>
            {this.props.children}
          </Layout.Content>
        </Layout>
      </Layout.CoreLayout>
    );
  }
}

window.addEventListener('load', () => {
  FastClick.attach(document.body);
});

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="chart" component={ChartPage} />
      <Route path="drawer" component={DrawerPage} />
      <Route path="modal" component={ModalPage} />
      <Route path="searchbar" component={SearchBarPage} />
      <Route path="layout" component={LayoutPage} />
      <Route path="icon" component={IconPage} />
      <Route path="image" component={ImageLoaderPage} />
      <Route path="navbar" component={NavBarPage} />
      <Route path="button" component={ButtonPage} />
    </Route>
  </Router>
), document.getElementById('container'));