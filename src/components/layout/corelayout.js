import React, { Component, PropTypes } from 'react';
import PageSystem from '../pages/System';
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

  static childContextTypes = {
    page: React.PropTypes.object
  };

  componentDidMount() {
    this.context.page.popup({
      uid: "123",
      header: <div>123</div>
    })    
  }

  /**
   * this.context.page.popup({uid, header, content, footer, navbar, force})
   */
  getChildContext () {
    return {
      page: {
        popup: (props) => { this.refs['pageSystem'].popup(props); },
      }
    };
  }

  render() {
    const { prefixCls, children, className } = this.props;
    const classes = cx(prefixCls, {
    }, className);
    return (
      <div className={`${prefixCls}-wrapper`}>
        <div className={classes}>
          {children}
        </div>
        <PageSystem ref="pageSystem" />
      </div>
    );
  }
}

export default CoreLayout;