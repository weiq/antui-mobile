import React, { Component } from 'react';
import Layout from '../layout';
import { Toast } from 'antd-mobile';
import Pages from './pages';

export default class System extends Component {
  static propTypes = {

  };

  static defaultProps = {

  };

  state = {
    page: {}, // 页面
    current: null, // 当前显示哪个页
    _uids: [],
    transition: "sfr",
  }

  popup(props) {
    const {uid, force} = props;
    let { page, _uids } = this.state;
    if (!uid || !props) throw new Error("uid & element 不能为空");

    if (page[uid]) {
      if (force) { // 替换已有
        page[uid] = props;
        _uids = page._uids.filter(_uid => _uid !== uid);
        _uids.push(uid);
      } else {
        Toast.fail("uid: " + uid + "已存在");
        return;
      }
    } else {
      page[uid] = props;
      _uids.push(uid);
    }

    this.setState({
      page,
      current: uid,
      _uids,
      transition: "sfr",
    });
  }

  prevPopup() {

  }

  close(uid) {

  }

  closeAll() {

  }

  render() {
    const { page, transition } = this.state;
    return (
      <Layout.Transition transition={transition}>
        {Object.keys(page).map((uid, i) => {
          return <Pages 
            key={"page-" + uid}
            {...page[uid].props} />;
        })}
      </Layout.Transition>
    );
  }
}