import React, { Component, PropTypes } from 'react';
import {findDOMNode} from 'react-dom';
import cx from 'classnames';
import TransitionPages from './transitionpages';
import {Session} from '../../utils/storage';

function generator(props) {
  return Basic => {
    return class Adapter extends Component {
      static Header;
      static Footer;
      static Content;

      static propTypes = {
        storeName: PropTypes.string,
      }
      // 存储历史数据
      store = Session.getAttribute("store") || {};

      componentDidMount() {
        this.restoreScrollTop();    
      }

      componentWillUnmount() {
        this.storeScrollTop();
      }

      restoreScrollTop() {
        if (this.props.storeName) {
          let dom = findDOMNode(this);
          dom.scrollTop = this.store[this.props.storeName] ? this.store[this.props.storeName].scrollTop : 0;
        }
      }

      storeScrollTop() {
        if (this.props.storeName) {
          let scrollTop = findDOMNode(this).scrollTop;
          if (this.store && this.store[this.props.storeName]) {
            this.store[this.props.storeName] = {scrollTop};
            Session.setAttribute("store", this.store);
          } else {
            Session.setAttribute("store", {[this.props.storeName]: {scrollTop}});
          }
        }
      }

      render() {
        const { prefixCls } = props;
        const compProps = {...this.props};
        delete compProps.storeName;
        
        return <Basic prefixCls={prefixCls} {...compProps} />;
      }
    };
  };
}

class Basic extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
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