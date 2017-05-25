import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import TransitionPages from './transitionpages';

function generator(props) {
  return Basic => {
    return class Adapter extends Component {
      static Header;
      static Footer;
      static Content;
      render() {
        const { prefixCls } = props;
        return <Basic prefixCls={prefixCls} {...this.props} />;
      }
    };
  };
}

class Basic extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    /**
     * 动画效果
     */
    transition: PropTypes.string,
  }

  render() {
    const { prefixCls, className, children, ...others } = this.props;

    const divCls = cx(className, prefixCls);

    return <div className={divCls} {...others}>{children}</div>;
  }
}

const Layout = generator({
  prefixCls: 'antui-layout',
})(Basic);

const Header = generator({
  prefixCls: 'antui-layout-header',
})(Basic);

const Footer = generator({
  prefixCls: 'antui-layout-footer',
})(Basic);

const Content = generator({
  prefixCls: 'antui-layout-content',
})(Basic);

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Transition = TransitionPages;

export default Layout;