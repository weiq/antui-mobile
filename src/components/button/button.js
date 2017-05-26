import React, { Component } from 'react';
import {Button} from 'antd-mobile';

/**
 * 按钮组件 用法见[antd-mobile](https://mobile.ant.design/components/button-cn/)
 */
class ButtonComp extends Component {
  render() {
    return <Button {...this.props} />;
  }
}

export default ButtonComp;