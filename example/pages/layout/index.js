import React from 'react';
import { Layout } from '../../../src';
import Page from '../../component/page';
import './layout.less';

const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

export default class IconDemo extends React.Component {
  render() {
    return (
      <Page className="layout-demo" title="Layout" subTitle="布局">
        <nav>
          <h2>基本布局：</h2>
          <section>
            <div className="layout-demo-container" style={{height: 400, position: 'relative'}}>
              <Layout>
                <Header>Header</Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
              </Layout>
            </div>
          </section>
          <h2>嵌套：</h2>
          <section>
            <div className="layout-demo-container" style={{height: 400, position: 'relative'}}>
              <Layout>
                <Header>Header</Header>
                <Content>
                  Content
                  <Layout className="inside-layout">
                    <Header>inside Header</Header>
                    <Content>inside Content</Content>
                    <Footer>inside Footer</Footer>
                  </Layout>
                </Content>
                <Footer>Footer</Footer>
              </Layout>
            </div>
          </section>
        </nav>
      </Page>
    );
  }
};