import React from 'react';
import { NavBar, Icon } from '../../../src';
import Page from '../../component/page';

export default class NavBarDemo extends React.Component {
  render() {
    return (
      <Page className="navbar-demo" title="NavBar" subTitle="导航条">
        <nav>
          <h2>代码演示</h2>
          <h3>基本</h3>
          <section>
            <NavBar
              leftContent="back"
              onLeftClick={() => console.log('onLeftClick')}
              rightContent={[
                <Icon type="search" />,
              ]}
            >NavBar</NavBar>
          </section>
          <h3>基本</h3>
          <section>
            <NavBar
              leftContent="back"
              onLeftClick={() => console.log('onLeftClick')}
              rightContent={[
                <Icon type="search" />,
              ]}
            >NavBar</NavBar>
          </section>
          <h3>基本</h3>
          <section>
            <NavBar
              leftContent="back"
              onLeftClick={() => console.log('onLeftClick')}
              rightContent={[
                <Icon type="search" />,
              ]}
            >NavBar</NavBar>
          </section>
        </nav>
      </Page>
    );
  }
};