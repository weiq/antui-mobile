import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {Icon} from 'antd-mobile';

/**
 *  Icon SVG图标 font图标
 */
class IconComp extends React.Component {
  static propTypes = {
    /**
     * 图标名
     */
    type: PropTypes.string.isRequired,
    /**
     * 旋转
     */
    spin: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node, 
    /**
     * 设为true则使用自已配置的svg图标，设为antd为使用antd的图标
     */
    svg: PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool
    ]),
  }

  render() {
    const { type, className = '', children, spin, svg, ...props } = this.props;
    const classString = classNames({
      iconfont: true,
      'iconfont-spin': !!spin || type === 'loading',
      [`iconfont-${type}`]: true,
    }, className);

    let svgProps = {};
    if (svg === "antd") { // 使用antd的svg图标 
      svgProps = {...this.props, type};
      delete svgProps.svg;
    } else if (svg === true) { // 使用内部svg图标 
      svgProps = {...this.props, type: require("../../style/icon/svg/" + type + ".svg")};
      delete svgProps.svg;
    }
    
    return !svg ? <i className={classString} {...props}>{children}</i> : <Icon {...svgProps} />;
  }
} 

export default IconComp;