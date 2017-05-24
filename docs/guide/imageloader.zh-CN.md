
配置
-------------
引入ImageLoader后需要进行初始化 `const Image = ImageLoader(options)` options配置项有：
####  breakpoints
根据屏幕的大小来从多张图片中加载一张.如下示例代码:

```javascript
ImageLoader({ 
  breakpoints: [{
    width: 420, 
    src: 'data-src-small'
  }, {
    width: 768, 
    src: 'data-src-medium'
  }]
});
```

####  container
如果你需要限制某个元素内的图片才需要懒加载, 可以在这里设置, 默认值为: window

```javascript
ImageLoader({ 
  container: '#scrolling-container' // 默认值为window
});
```

####  success | error
加载成功时, 将执行success函数function(ele), 默认值为: false

在加载图片失败的时候, 将调用error函数. 这里有两种返回信息, missing和invalid. 
如果没有定义data-src属性将返回消息missing.
如果定义的data-src无效将返回消息invalid.
示例代码:

```javascript
ImageLoader({ 
  success: function(ele){
    // 加载成功
  },
  error: function(ele, msg){
    if(msg === 'missing'){
      // 没有src
    }
    else if(msg === 'invalid'){
      // src无效
    }  
  }
});
```

####  errorClass
如果某个元素内容加载失败, 将会添加errorClass指定的样式类.

####  successClass
加载成功时元素将获得的类名

####  loadInvisible
如果想加载不可见的元素, 可以将项设置为true.

####  offset
offset用于控制离元素被访问有多少px时, 开始提前加载元素指定的内容(图片等). 默认为100, 即当元素距离可见区域100px时, 将会加载元素指定的内容.

####  saveViewportOffsetDelay
调用resize事件的频率, 默认为50ms.

####  selector
应该延迟加载的元素选择器。 如果你想延迟加载所有图像写'img'。 您可以添加多个选择器，以逗号分隔; '.b-lazy，.bLazy，.blazy'。示例:

```javascript
ImageLoader({ 
  selector: 'img' // 选择所有图片
});
```

####  selector
用于传递视网膜图像, 如: src="image.jpg|image@2x.jpg".

####  validateDelay
设置滚动/调整大小时应该调用validate函数的频率。 默认值为25ms。
