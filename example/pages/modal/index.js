import React from 'react';
import { Modal, Button } from '../../../src';
import Page from '../../component/page';

export default class ModalDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false,
      modal3: false,
    };
  }
  showModal = key => (e) => {
    // 现象：如果弹出的弹框上的 x 按钮的位置、和手指点击 button 时所在的位置「重叠」起来，
    // 会触发 x 按钮的点击事件而导致关闭弹框 (注：弹框上的取消/确定等按钮遇到同样情况也会如此)
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  render() {
    return (
      <Page className="modal-demo" title="Modal" subTitle="模态窗口">
        <nav>
          <h2>代码演示</h2>
          <h3>基本</h3>
          <Button onClick={this.showModal('modal1')}>Modal 对话框 (自动检测平台)</Button>
          <section>
            <Modal
              title="这是 title"
              transparent
              maskClosable={false}
              visible={this.state.modal1}
              onClose={this.onClose('modal1')}
              footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
            >
              这是内容...<br />
              这是内容...<br />
            </Modal>
          </section>
          <h3>静态调用</h3>
          <section>
            <Button onClick={() => Modal.alert('删除', '确定删除么???', [
              { text: '取消', onPress: () => console.log('cancel') },
              { text: '确定', onPress: () => console.log('ok'), style: { fontWeight: 'bold' } },
            ])}
            >确认对话框</Button>
            <br />
            <Button onClick={() => Modal.alert('多个按钮情况', <div>这里有好多个按钮, 你试试</div>, [
              { text: '按钮一', onPress: () => console.log('第0个按钮被点击了') },
              { text: '按钮二', onPress: () => console.log('第1个按钮被点击了') },
              { text: '按钮三', onPress: () => console.log('第2个按钮被点击了') },
            ])}
            >弹出多个按钮 </Button>
          </section>
          <h3>...</h3>
        </nav>
      </Page>
    );
  }
};