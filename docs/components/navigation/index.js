import React, { Component, PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import Menu, { Item as MenuItem, ItemGroup as MenuItemGroup } from 'rc-menu';
import cx from 'classnames';
import 'rc-menu/assets/index.css';
import './style.less';

class Navigation extends Component {

  static propTypes = {
    data: PropTypes.array,
    locale: PropTypes.string,
    current: PropTypes.object,
    langs: PropTypes.object,
    logo: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      searchFilter: '',
      showSetting: false,
      showMenu: true,
    };
  }

  onSearch(text) {
    this.setState({
      searchFilter: text
    });
  }

  renderSideBar() {
    return this.props.data.map((doc, i) => {
      return (
        <Link
          to={`/docs/${i}/articles/0`}
          className={cx("navmenu__item", {"active": this.props.current.id === i + ""})}
          key={i}
          >
          <FontAwesome name={doc.icon} size="2x" />
          <p>{typeof doc.name === 'object' ? doc.name[this.props.locale] : doc.name}</p>
        </Link>
      );
    });
  }

  renderMenu() {
    if (!this.props.current.id) return false;

    const { langs, locale } = this.props;
    let item = this.props.data[this.props.current.id];

    if (item.type === 'menu') {
      let menus = item.items;
      return (
        <Menu className="menuItems" theme="dark" mode="inline" defaultSelectedKeys={["menu" + this.props.current.aid]}>
          <MenuItemGroup title={!this.state.searchFilter ? `${menus.length} ${langs.searchbar.items}` : langs.searchbar.result}>
            {
              menus.map((item, i) => {
                if (!this.state.searchFilter || item.name.toLowerCase().indexOf(this.state.searchFilter.toLowerCase()) > -1) {
                  return ( 
                    <MenuItem key={"menu" + i}>
                      <Link to={`/docs/${this.props.current.id}/articles/${i}`}>
                        <div className="menu-item">
                          <FontAwesome name={item.icon} size="2x" className="menu-icon" />
                          <span className="menu-name">{typeof item.name === 'object' ? item.name[locale] : item.name}</span>
                        </div>
                      </Link>
                    </MenuItem>
                  );
                } else {
                  return false;
                }
              })
            }
          </MenuItemGroup>
        </Menu>
      );
    }
  }

  render() {
    const { langs, logo, data, current } = this.props;
    let item = data[current.id] ? data[current.id] : data[0];

    return (
      <div className={`App__nav ${item.type === 'menu' ? 'menu' : 'nomenu'}`} >
        <nav className="navSidebar background--nav">
          <div className="navSidebar--logo">
            <img src={logo} alt="logo" />
          </div>
          <ul className="navmenu">
            {this.renderSideBar()}
            <div className="navmenu__item">
              <FontAwesome name="cog" size="2x" />
              <p>{langs.setting.title}</p>
            </div>
          </ul>
        </nav>
        {item.type === 'menu' ? <div className="mobileToggle" onClick={e => this.setState({ showMenu: !this.state.showMenu })} ><FontAwesome name="bars" /></div> : false}
        {item.type === 'menu' && this.state.showMenu
          ? <div className="navMenu">
            <div
              lang={langs.searchbar}
              placeholder={langs.searchbar.placeholder}
              onChange={this.onSearch.bind(this)}
              />
            {this.renderMenu()}
          </div> : false}
      </div>
    );
  }
}
export default Navigation;