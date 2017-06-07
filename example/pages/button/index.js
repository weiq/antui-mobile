import React from 'react';
import { Button } from '../../../src';
import Page from '../../component/page';
import './index.less';

export default class ButtonDemo extends React.Component {
  render() {
    return (
      <Page className="button-demo" title="Button" subTitle="按钮">
        <nav>
          <h2>代码演示</h2>
          <h3>基本</h3>
          <section>
            <Button className="btn" type="primary">primary button</Button>
            <Button className="btn" disabled onClick={e => console.log(e)}>
              disabled button
            </Button>
            <Button className="btn" loading>loading button</Button>
            <Button className="btn" icon="check-circle-o">with icon</Button>
            <Button className="btn" icon={require('!svg-sprite!./user.svg')}>
              with local icon
            </Button>

            <div style={{ height: '0.16rem' }} />
            {/* <Button className="btn" activeStyle={false}>无点击反馈</Button> */}
            {/* <Button className="btn" activeStyle={{ backgroundColor: 'red' }}>自定义点击反馈 style</Button> */}

            <p style={{ margin: '30px 0 18px 0', color: '#999' }}>inline / small</p>
            <div style={{ marginBottom: '0.16rem' }}>
              <Button type="primary" inline style={{ marginRight: '0.08rem' }}>inline</Button>
              <Button type="ghost" inline size="small" style={{ marginRight: '0.08rem' }}>inline small</Button>
              <Button type="primary" inline size="small">inline small</Button>
            </div>
          </section>
        </nav>
      </Page>
    );
  }
};