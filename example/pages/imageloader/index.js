import React from 'react';
import { ImageLoader } from '../../../src';
import Page from '../../component/page';
import './imageloader.less';
const Image = ImageLoader({container: ".image-demo-container"});

export default class IconDemo extends React.Component {
  render() {
    return (
      <Page className="image-demo" title="Image" subTitle="图片">
        <nav>
          <h2>图片加载（Lazy）：</h2>
          <section>
            <div className="image-demo-container">
              <Image src="http://cdn.dinbror.dk/assets/blazy/01.jpg" />
              <Image src="http://cdn.dinbror.dk/assets/blazy/02.jpg" />
              <Image src="http://cdn.dinbror.dk/assets/blazy/03.jpg" />
              <Image src="http://cdn.dinbror.dk/assets/blazy/04.jpg" />
              <Image src="http://cdn.dinbror.dk/assets/blazy/05.jpg" />
              <Image src="http://cdn.dinbror.dk/assets/blazy/06.jpg" />
              <Image src="http://cdn.dinbror.dk/assets/blazy/07.jpg" style={{width: 200}} />
              <h4>src地址无效：</h4>
              <Image src="http://cdn.dinbror.dk/assets/blazy/08.jpg" />
              <h4>无src地址：</h4>
              <Image src="" width="300" height="200" />
            </div>
          </section>
        </nav>
      </Page>
    );
  }
};