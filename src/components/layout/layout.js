import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
    const { prefixCls, className, children, transition: t, ...others } = this.props;

    const divCls = cx(className, prefixCls);

    let transition = 'sfr';
    if (t) {
      switch (t) {
        case 'right':
          transition = 'sfr';
          break;
        case 'left':
          transition = 'rfr';
          break;
        case 'up':
          transition = 'sfb';
          break;
        case 'down':
          transition = 'rfb';
          break;
      }
    }

    return t ? (
      <ReactCSSTransitionGroup
        component='div'
        className='pages'
        transitionName={`page-transition-${transition}`}
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
      >
        {React.cloneElement(this.props.children, {
          key: location.pathname
        })}
      </ReactCSSTransitionGroup>
    ) : (
      <div className={divCls} {...others}>{children}</div>
    );
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

export default Layout;