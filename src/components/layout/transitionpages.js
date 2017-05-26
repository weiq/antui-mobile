import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

/**
 * 页面过渡
 */
export default class TransitionPages extends Component {

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    /**
     * 可以直接指定转场动画，或由子类传入，或由url传入
     */
    transition: PropTypes.string,
  };

  render() {
    const { location, children, transition: _selfTransition } = this.props;
    let transition = 'sfl';
    let transitionKey;

    if ('key' in children.props) {
      transitionKey = children.props.key;
    } else if (location && location.pathname) {
      transitionKey = location.pathname;
    }

    if (_selfTransition) {
      transition = _selfTransition;
    } else if (children.props && children.props.location) {
      transition = children.props.location.query.t;
    } else if (children.props && children.props.transition) {
      transition = children.props.transition;
    }

    return (
      <ReactCSSTransitionGroup
        component='div'
        className='transition-pages'
        transitionName={`page-transition-${transition}`}
        transitionEnterTimeout={400}
        transitionLeaveTimeout={400}
      >
        {React.cloneElement(this.props.children, {
          key: transitionKey
        })}
      </ReactCSSTransitionGroup>
    );
  }
}