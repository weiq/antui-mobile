import React from 'react';
import { SearchBar } from '../../../src';
import Page from '../../component/page';

export default class SearchBarDemo extends React.Component {
  render() {
    return (
      <Page className="searchbar-demo" title="SearchBar" subTitle="搜索条">
        <nav>
          <h2>代码演示</h2>
          <h3>基本</h3>
          <section>
            <SearchBar
              leftContent="返回"
              onLeftClick={() => console.log('onLeftClick')}
            />
          </section>
        </nav>
      </Page>
    );
  }
};