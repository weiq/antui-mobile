import React, {PropTypes, Component} from 'react';
import classNames from 'classnames';
import Icon from '../icon';

/**
 * 搜索条组件
 */
class SearchBar extends Component {
  static propTypes = {
    /**
     * 占位符
     */
    placeholder: PropTypes.string,
    /**
     * input的name名
     */
    searchName: PropTypes.string,
    /**
     * 当搜索内容改变时触发
     */
    onChange: PropTypes.func,
    /**
     * 当点击取消icon图标时触发
     */
    onClear: PropTypes.func,
    /**
     * 当点击取消按钮时触发
     */
    onCancel: PropTypes.func,
    /**
     * 当点击搜索按钮时触发
     */
    onSubmit: PropTypes.func,
    className: PropTypes.string,
    prefixCls: PropTypes.string,
  };

  static defaultProps = {
    prefixCls: 'antui-search-bar',
    placeholder: '搜索',
    searchName: 'q',
    autocomplete: 'off'
  };

  state = {
    focus: false,
    clearing: false,
    text: ''
  }

  changeHandle = (e) => {
    let text = e.target.value;
    if (this.props.onChange) this.props.onChange(text, e);
    this.setState({ text });
  }

  cancelHandle = (e) => {
    this.setState({
      focus: false,
      text: ''
    });
    if (this.props.onCancel) this.props.onCancel(e);
    if (this.props.onChange) this.props.onChange('', e);
  }

  clearHandle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ text: '', clearing: true });
    if (this.props.onClear) this.props.onClear(e);
    this.refs.searchInput.focus();
    if (this.props.onChange) this.props.onChange('', e);
  }

  blurHandle = (e) => {
    if (this.state.text === '') {
      this.setState({ focus: false });
    }
  }

  submitHandle= (e) => {
    if (this.props.onSubmit) {
      e.preventDefault();
      e.stopPropagation();
      this.props.onSubmit(this.state.text, e);
    }
  }

  render() {
    const {prefixCls, placeholder, className, searchName} = this.props;
    const classes = classNames(prefixCls, {
      [`${prefixCls}_focusing`]: this.state.focus,
    }, className);

    return (
      <div className={classes}>
        <form className={`${prefixCls}__form`} onSubmit={this.submitHandle}>
          <div className={`${prefixCls}__box`}>
            <Icon type="search" svg="antd" className="antui-icon-search" />
            <input
              ref="searchInput"
              type="search"
              name={searchName}
              className={`${prefixCls}__input`}
              placeholder={placeholder}
              onFocus={e => this.setState({ focus: true })}
              onBlur={this.blurHandle}
              onChange={this.changeHandle}
              value={this.state.text}
            />
            <Icon type="cross-circle" svg="antd" className="antui-icon-clear" onClick={this.clearHandle} />
          </div>
          <label
            className={`${prefixCls}__label`}
            onClick={() => {
              let searchInput = this.refs.searchInput;
              if (searchInput) {
                searchInput.focus();
              }
            }}
            style={{ display: this.state.text ? "none" : null }}
          >
            <span><Icon type="search" svg="antd" className="antui-icon-search" />{placeholder}</span>
          </label>
        </form>
        <a className={`${prefixCls}__cancel-btn`} onClick={this.cancelHandle}>取消</a>
      </div>
    );
  }
}

export default SearchBar;