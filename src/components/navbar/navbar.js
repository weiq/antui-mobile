import React, { Component, PropTypes } from 'react';
import { NavBar } from 'antd-mobile';

/**
 * 导航条组件 一般放到Layout的Header中
 */
class NavBarComp extends Component {
  static propTypes = {
    /**
     * 导航模式 'dark', 'light'
     */
    mode: PropTypes.string,

    /**
     * 返回时过度动画 左：'sfl', 右：'sfr', 上：'sft', 下：'sfb'
     */
    transition: PropTypes.string,

    /**
     * 点击返回时跳转到的路由
     */
    backURL: PropTypes.string,

    /**
     * 点击左侧区域的事件，如配置这一项，则backURL将失效
     */
    onLeftClick: PropTypes.func,
  }

  static defaultProps = {
    mode: "light",
    transition: "sfl",
    backURL: "/"
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  onLeftClick = () => {
    const {backURL, onLeftClick, transition} = this.props;

    if (onLeftClick && typeof onLeftClick === "function") {
      onLeftClick();
    } else if (backURL) {
      let url = backURL + (backURL.match(/[?]/g) ? '&' : '?') + 't=' + transition;
      this.context.router.push(url);
    }
  }

  render() {
    const {mode, ...otherProps} = this.props;

    delete otherProps.backURL;
    delete otherProps.transition;

    return (
      <NavBar
        mode={mode}
        onLeftClick={this.onLeftClick}
        {...otherProps} 
      />
    );
  }
}

export default NavBarComp;