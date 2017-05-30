import React from 'react';
import { Layout, Pages } from '../../../src';
import Page from '../../component/page';
import './layout.less';

const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;
const Transition = Layout.Transition;

export default class LayoutDemo extends React.Component {
  state= {
    transition: 'left'
  }

  add = (transition) => {
    this.setState({
      transition
    });
  }

  render() {
    return (
      <Page className="layout-demo" title="Layout" subTitle="布局">
        <nav>
          <h2>基本布局：</h2>
          <section>
            <div style={{height: 400, position: 'relative'}}>
              <Layout>
                <Header>Header</Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
              </Layout>
            </div>
          </section>
          <h2>嵌套：</h2>
          <section>
            <div style={{height: 400, position: 'relative'}}>
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
          <h2>转场效果：</h2>
          <section>
            <div style={{height: 400, position: 'relative'}}>
              <Layout className="transition-layout">
                <Header>
                  <div>
                    <button onClick={e => this.add("sft")}>top</button>
                    <button onClick={e => this.add("sfr")}>right</button>
                    <button onClick={e => this.add("sfb")}>bottom</button>
                    <button onClick={e => this.add("sfl")}>left</button>
                  </div>
                  <div>
                    <button onClick={e => this.add("rft")}>r-top</button>
                    <button onClick={e => this.add("rfr")}>r-right</button>
                    <button onClick={e => this.add("rfb")}>r-bottom</button>
                    <button onClick={e => this.add("rfl")}>r-left</button>
                  </div>
                </Header>
                <Content>
                  <Transition transition={this.state.transition}>
                    <div key={this.state.transition} className="content">Animate</div>
                  </Transition>
                </Content>
                <Footer>Footer</Footer>
              </Layout>
            </div>
          </section>
          <h2>CoreLayout</h2>
          <section style={{position: 'relative', height: 400, border: '1px solid'}}>
            <Layout.CoreLayout>
              <DemoPage />
            </Layout.CoreLayout>
          </section>
        </nav>
      </Page>
    );
  }
};

class DemoPage extends React.Component {
  static contextTypes = {
    page: React.PropTypes.object,
  }

  state = {
    page: 0
  }

  // this.context.page.popup({uid, header, content, footer, navbar, force})
  popup = () => {
    this.context.page.popup({
      uid: "demo" + this.state.page++,
      navbar: {title: "Popup" + this.state.page},
      content: <button onClick={this.popup}>弹出页面 {this.state.page}</button>,
      style: {border: '2px solid #f50'}
    });
  }

  render() {
    return (
      <Pages 
        navbar={{
          title: 'Demo'
        }}
        content={(
          <div>
            <button onClick={this.popup}>弹出页面</button>
          </div>
        )}
        style={{border: '2px solid #f50'}}
      />
    );
  }
}