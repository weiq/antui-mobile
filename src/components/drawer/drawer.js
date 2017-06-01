import React, { Component, PropTypes } from 'react';
import Drawer from 'rc-drawer';
import 'rc-drawer/assets/index.css';
/**
 * 用于在屏幕边缘显示应用导航等内容的面板
 */
export default class DrawerCmpt extends Component {
  static propTypes = {
    /** 用于手动控制抽屉显隐 */
    visible: PropTypes.bool,
    /** 宽度 */
    width: PropTypes.number,
    /** 抽屉内容 */
    sidebar: PropTypes.node,
    /** 抽屉位置，可选 top left right bottom */
    placement: PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
  };

  static defaultProps = {
    visible: false,
    width: 160,
    placement: 'right',
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
    });
  }

  render() {
    const { sidebar, placement, width, children } = this.props;
    const sidebarStyle = placement === 'top' || placement === 'bottom' ? {height: width} : {width: width};
    
    const _sidebar = (
      <div className="antui-layout-drawer-sidebar" style={sidebarStyle}>{sidebar}</div>
    );

    const drawerProps = {
      docked: false,
      open: this.state.visible,
      transitions: true,
      touch: true,
      enableDragHandle: false,
      position: placement,
      dragToggleDistance: 30,
      onOpenChange: (visible) => {
        this.setState({ visible });
      }
    };

    return (
      <div className="antui-layout-drawer">
        <Drawer sidebar={_sidebar} {...drawerProps} style={{ overflow: 'hidden' }} sidebarStyle={{boxShadow: '0 0 0'}}>{ children }</Drawer>
      </div>
    );
  }
}