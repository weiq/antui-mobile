import React, { Component, PropTypes } from 'react';
import Layout from '../layout';
import { Toast } from 'antd-mobile';
import Pages from './pages';
import cx from 'classnames';
import Icon from '../icon';

const leftContent = (prop) => (
  <div className="system_navbar-left" onClick={prop.prevPopup}>
    <span className="system_navbar-left-icon">
      <Icon svg="antd" type="left" />
    </span>
    <span className="system_navbar-left-content">返回</span>
  </div>
);

const leftContentAndClose = (prop) => (
  <div className="system_navbar-left">
    <div className="navbar-back" onClick={prop.prevPopup}>
      <span className="system_navbar-left-icon">
        <Icon svg="antd" type="left" />
      </span>
      <span className="system_navbar-left-content">返回</span>
    </div>
    <div className="navbar-close" onClick={prop.closeAll}>
      <span className="system_navbar-left-content">关闭</span>
    </div>
  </div>
);

export default class System extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
  };

  static defaultProps = {
    prefixCls: "antui-pages-system"
  };

  state = {
    page: {}, // 页面
    current: null, // 当前显示哪个页
    _uids: [],
    transition: "rfl",
    hide: true,
  }

  popup = (options) => {
    const {uid, navbar, force, ...otherProps} = options;
    let { page, _uids } = this.state;
    let _navbar = {
      leftContent: _uids.length > 1 ? leftContentAndClose({
        prevPopup: this.prevPopup,
        closeAll: this.closeAll
      }) : leftContent({
        prevPopup: this.prevPopup
      }),
      iconName: null,
      ...navbar
    };
    if (!uid || !options) throw new Error("uid & options 不能为空");

    if (page[uid]) {
      if (force) { // 替换已有
        page[uid] = {navbar: _navbar, ...otherProps};
        _uids = page._uids.filter(_uid => _uid !== uid);
        _uids.push(uid);
      } else {
        Toast.fail("uid: " + uid + "已存在");
        return;
      }
    } else {
      page[uid] = {navbar: _navbar, ...otherProps};
      _uids.push(uid);
    }

    this.setState({
      page,
      current: uid,
      _uids,
      transition: "rfl",
      hide: false
    });
  }

  prevPopup = () => {
    let {current, _uids, page} = this.state;
    if (current) {
      delete page[current];
      _uids.pop();
      this.setState({
        page,
        current: _uids.slice(-1)[0],
        _uids,
        transition: "rfr",
      });
      
      if (_uids.length === 0) {
        setTimeout(_ => this.setState({hide: true}), 400);
      }
    }
  }

  close = (uid) => {
    let {page, current, _uids} = this.state;
    if (page[uid]) {
      delete page[uid];
      _uids = _uids.filter(_uid => _uid !== uid);
      
      if (_uids.length > 0) {
        current = current === uid ? _uids[_uids.length - 1] : current;
      } else {
        current = null;
      }

      this.setState({
        page,
        current,
        _uids,
        transition: "rfr",
      });

      if (_uids.length === 0) {
        setTimeout(_ => this.setState({hide: true}), 400);
      }
    }
  }

  closeAll = () => {
    this.setState({
      page: {},
      current: null,
      _uids: [],
      transition: "rfr",
    });

    setTimeout(_ => this.setState({hide: true}), 400);
  }

  render() {
    const { page, transition, hide } = this.state;

    let pageList = Object.keys(page);
    const classes = cx(this.props.prefixCls, {
      hide
    });

    return (
      <Layout.Transition 
        transition={transition} 
        className={classes}
      >
        {pageList.map((uid, i) => {
          return <Pages
            key={"page-" + uid}
            {...page[uid]} />;
        })}
      </Layout.Transition>
    );
  }
}