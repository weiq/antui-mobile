import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import cx from 'classnames';

/**
 * 页面过渡
 */
export default class TransitionPages extends Component {

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    location: PropTypes.object,
    /**
     * 可以直接指定转场动画，或由子类传入，或由url传入
     */
    transition: PropTypes.string,
  };

  static defaultProps = {
    prefixCls: "antui-transition-pages"
  }

  render() {
    const { prefixCls, className, location, children, transition: _selfTransition } = this.props;
    const classes = cx(prefixCls, className);

    let transition = 'sfr';
    let transitionKey;

    if (location && location.pathname) {
      transitionKey = location.pathname;
    } else if (children && children.props && children.props.location) {
      transitionKey = children.props.location.pathname;
    }

    if (location && location.query.t) {
      transition = location.query.t;
    } else if (children.props && children.props.transition) {
      transition = children.props.transition;
    } else if (_selfTransition) {
      transition = _selfTransition;
    }  

    let childrenComp = null;

    if (children && children.length) {
      childrenComp = children;
    } else if (React.isValidElement(children)) {
      childrenComp = transitionKey ? React.cloneElement(children, {
        key: transitionKey
      }) : children;
    }

    return (
      <ReactCSSTransitionGroup
        component='div'
        className={classes}
        transitionName={`page-transition-${transition}`}
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
      >
        {childrenComp}
      </ReactCSSTransitionGroup>
    );
  }
}