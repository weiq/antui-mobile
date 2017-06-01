import React from 'react';
import { Drawer, Layout } from '../../../src';
import Page from '../../component/page';
import './drawer.less';

export default class DrawerDemo extends React.Component {
  state = {
    visible1: false,
    visible2: false
  }

  handleOpen = (id) => {
    this.setState({
      visible1: false,
      visible2: false,
      [`visible${id}`]: true
    });
  }

  render() {
    const sidebar = <h3>hello Drawer</h3>;
    return (
      <Page className="drawer" title="Drawer" subTitle="抽屉">
        <nav>
          <h2>代码演示</h2>
          <h3>1. 最简单的使用</h3>
          <code>
            <h5 onClick={() => this.handleOpen(1)}>open drawer</h5>
            <Drawer visible={this.state.visible1} sidebar={sidebar}>
              <Layout />
            </Drawer>
          </code>
          <h3>2. 抽屉弹出位置与宽度</h3>
          <code>
            <h5 onClick={() => this.handleOpen(2)}>open drawer</h5>
            <Drawer visible={this.state.visible2} sidebar={sidebar} placement="top" width={80}>
              <Layout />
            </Drawer>
          </code>
        </nav>
      </Page>
    );
  }
};
