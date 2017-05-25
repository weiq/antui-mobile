import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

class CoreLayout extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
  }

  static defaultProps = {
    prefixCls: "antui-corelayout"
  }
  render() {
    const { prefixCls, children, className } = this.props
    const classes = cx(prefixCls, {
    }, className);
    return (
      <div className={`${prefixCls}-wrapper`}>
        <div className={classes}>
          {children}
        </div>
        <NotificationSystem ref='notificationSystem' />
        <ModalSystem ref='modalSystem' />
        <IndicatorSystem ref='indicatorSystem' />
      </div>
    )
  }
}

export default CoreLayout;