import React, { Component, PropTypes } from 'react';
import { Layout, NavBar } from '../../../src';
import cx from 'classnames';

const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

/**
 * 带导航条的的页面
 */
class Pages extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    header: PropTypes.node,
    content: PropTypes.node,
    footer: PropTypes.node,
    navbar: PropTypes.object,
  }

  static defaultProps = {
    prefixCls: "antui-pages"
  }
  render() {
    const {prefixCls, className, header, content, footer, navbar} = this.props;

    const classes = cx(prefixCls, className);

    return (
      <Layout className={classes}>
        <Header>
          {header || <NavBar {...navbar}>{navbar.title}</NavBar>}
        </Header>
        <Content>{content}</Content>
        <Footer>{footer}</Footer>
      </Layout>
    );
  }
}

export default Pages;