import React, { Component, PropTypes } from 'react';
import PageSystem from '../pages/System';
import cx from 'classnames';
import Transition from './transitionpages';

class CoreLayout extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    style: PropTypes.object,
  }

  static defaultProps = {
    prefixCls: "antui-corelayout"
  }

  static childContextTypes = {
    page: PropTypes.object
  };

  /**
   * this.context.page.popup({uid, header, content, footer, navbar, force})
   */
  getChildContext () {
    return {
      page: {
        popup: (props) => { this.refs['pageSystem'].popup(props); },
        prevPopup: (props) => { this.refs['pageSystem'].prevPopup(props); },
        close: (uid) => { this.refs['pageSystem'].close(uid); },
        closeAll: () => { this.refs['pageSystem'].closeAll(); },
      }
    };
  }

  render() {
    const { prefixCls, children, className, style, ...otherProps } = this.props;
    const classes = cx(prefixCls, {
    }, className);
    return (
      <div className={`${prefixCls}-wrapper`} style={style}>
        <Transition className={classes} {...otherProps}>
          {children}
        </Transition>
        <PageSystem ref="pageSystem" />
      </div>
    );
  }
}

export default CoreLayout;