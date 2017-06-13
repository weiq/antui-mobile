import React from 'react';
import { Layout, Icon } from '../../../src';
import { List } from 'antd-mobile';
import './home.less';
const Content = Layout.Content;
const Footer = Layout.Footer;

class Home extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  static defaultProps = {
    transition: "sfl"
  }

  render() {
    return (
      <Layout className="home-layout">
        <Content className="test-scroll" storeName="home">
          {menus.map((menu, i) => (
            <List key={"list_" + i} renderHeader={() => menu.name} className="my-list">
              {menu.items.map((item, j) => (
                <List.Item key={"item_" + j} 
                  extra={item.label} 
                  arrow="horizontal" 
                  thumb={<Icon type="list" />} 
                  onClick={() => this.context.router.push(item.to)}>
                  {item.component}
                </List.Item>
              ))}
            </List>
          ))}
        </Content>
        <Footer className="home-footer">移动端组件库 antui-mobile</Footer>
      </Layout>
    );
  }
}

const menus = [
  {
    name: '基本',
    icon: 'basic',
    items: [
      {
        component: 'Button',
        label: '按钮',
        to: '/button'
      },
      {
        component: 'Icon',
        label: '图标',
        to: '/icon'
      },
      {
        component: 'ImageLoader',
        label: '图片',
        to: '/image'
      },
      {
        component: 'Modal',
        label: '弹窗',
        to: '/modal'
      },
      {
        component: 'SearchBar',
        label: '搜索条',
        to: '/searchbar'
      },
      {
        component: 'NavBar',
        label: '导航条',
        to: '/navbar'
      },
    ]
  },
  {
    name: '部局',
    icon: 'basic',
    items: [
      {
        component: 'Layout',
        label: '部局',
        to: '/layout'
      },
      {
        component: 'Drawer',
        label: '抽屉',
        to: '/drawer'
      },
    ]
  },
  {
    name: '图表',
    icon: 'basic',
    items: [
      {
        component: 'Chart',
        label: '图表',
        to: '/chart'
      }
    ]
  },
];

export default Home;