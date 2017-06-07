import React, { PureComponent, PropTypes } from 'react';
import Layout from '../layout';
import NavBar from '../navbar';
import cx from 'classnames';

/**
 * 带导航条的的页面
 */
class Pages extends PureComponent {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    header: PropTypes.node,
    content: PropTypes.node,
    footer: PropTypes.node,
    navbar: PropTypes.object,
    style: PropTypes.object,
  }

  static defaultProps = {
    prefixCls: "antui-pages"
  }

  render() {
    const {prefixCls, className, header, content, footer, navbar, style} = this.props;

    const classes = cx(prefixCls, className);

    return (
      <Layout className={classes} style={style}>
        <Layout.Header>
          {header || (navbar && <NavBar {...navbar}>{navbar.title}</NavBar>)}
        </Layout.Header>
        <Layout.Content>{content}</Layout.Content>
        <Layout.Footer>{footer}</Layout.Footer>
      </Layout>
    );
  }
}

export default Pages;