import React, { Component } from 'react';
import notify from '../Notify';
import View from '../View';
import TinyPage from './TinyPage';
import NavBar from '../NavBar';

export default class System extends Component {
  state = {
    page: {}, // 页面
    maxSize: 4, // 最大数量
    current: null, // 当前显示哪个页
    _uids: [],
    transition: "sfr",
  }

  static propTypes = {
    
  };

  static defaultProps = {
    
  };
  
  addPage(uid, element, options = {}) {
    let {page, _uids, maxSize} = this.state;
    if (!uid || !element) throw new Error("uid & element 不能为空");
    if (_uids.length === maxSize) notify.warn("新增的页面过多, size: " + _uids.length);
    if (options.hidden) {
      this.state.hidden = options.hidden;
    } else {
      this.state.hidden = false;
    } 

    let pageObj = {
      navTitle: options.title || "",
      props: options.props || {},
      element
    };
    if (page[uid]) {
      if (options.force) { // 替换已有
        page[uid] = pageObj;
        _uids = page._uids.filter(_uid => _uid !== uid);
        _uids.push(uid);
      } else {
        notify.error("uid: " + uid + "已存在");
        return;
      }
    } else {
      page[uid] = pageObj;
      _uids.push(uid);
    }

    this.setState({
      page,
      current: uid,
      _uids,
      transition: "sfr",
    });
  }

  showErrorPage(content) {
    this.addPage("errorPage", <ErrorPage content={content} />);
  }

  updatePage(uid, options) {

  }

  resumePage(uid, options) {
    let {page, current, _uids} = this.state;

    if (page[uid] && current !== uid) {
      let index = _uids.indexOf(uid);
      let _page = {};
      for (let i = 0; i <= index; i++) {
        _page[_uids[i]] = page[_uids[i]];
      }

      this.setState({
        page: _page,
        current: uid,
        _uids: _uids.slice(0, index + 1)
      });
    } else if (page[uid] && current === uid) {
      page[uid] = objectAssign({}, page[uid], options);
      this.setState({
        page,
        transition: "sfr",
      });
    }
  }

  removePage(uid) {
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
        transition: "sfl",
      });
    }
  }

  removeAll() {
    const {_uids} = this.state;

    if (_uids.length > 0) {
      this.setState({
        page: {},
        current: null,
        maxSize: 4,
        _uids: [],
        transition: "sfl",
      });
    }
  }

  prevPage() {
    let {page, current, _uids} = this.state;
    if (_uids.length > 0) {
      delete page[current];
      _uids = _uids.slice(0, _uids.length - 1);
      current = _uids[_uids.length - 1] || null;

      this.setState({
        page,
        current,
        _uids,
        transition: "rfr",
      });
    }
  }

  render () {
    const {page, _uids, current, transition, hidden} = this.state;
    return _uids.length > 0 ? (
      <View id="pageSys">
        <NavBar 
          leftContent="返回"
          onLeftClick={() => { ::this.prevPage(); }}
          mode="light"
          hidden={hidden}
        >{page[current].navTitle}</NavBar>
        <Container 
          className="pageSys-container"
          transition={transition}
        >
          {Object.keys(page).map((uid, i) => {
            return <TinyPage 
              key={"page-" + uid} 
              visible={uid === current}>
              {React.cloneElement(page[uid].element, page[uid].props)}
            </TinyPage>;
          })}
        </Container>
      </View>
    ) : null;
  }
}