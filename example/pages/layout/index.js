import React from 'react';
import { Layout } from '../../../src';
import Page from '../../component/page';
import './layout.less';

const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;
const Transition = Layout.Transition;

export default class IconDemo extends React.Component {
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
                  <Transition>
                    <div key={this.state.transition} transition={this.state.transition} className="content">Animate</div>
                  </Transition>
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