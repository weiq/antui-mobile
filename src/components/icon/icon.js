import React, {PropTypes} from 'react';
import classNames from 'classnames';
import {Icon} from 'antd-mobile';

/**
 *  Icon
 */
class IconComp extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    spin: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node, 
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
    if (typeof svg === "string") { // svg 为图标路径
      svgProps = {...this.props, type: require(`${svg}`)};
      delete svgProps.svg;
    } else if (svg === true) { // 使用内部svg
      svgProps = {type: require("../../style/icon/svg/" + type + ".svg")};
      delete svgProps.svg;
    }
    
    return !svg ? <i className={classString} {...props}>{children}</i> : <Icon {...svgProps} />;
  }
} 

export default IconComp;