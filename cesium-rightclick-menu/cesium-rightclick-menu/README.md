## 说明

    将下图内的功能集合在本项目中，方便后续项目集成到需要的项目,用户在地图上右键点击弹出菜单。

![img.png](img.png)

## 目录结构描述

    ├── imgs   // 图片图标等
    ├── js   // 图片图标等
    |   |── xt3d.new.js // cesium js库
    ├── lib   // 包含各版本的lib文件夹
    ├── utils // 工具及通用函数
    ├── CommonMapComp.vue      // 主菜单文件，包含三维地图的创建
    ...
    ├── ReadMe.md           // 帮助文档

## 引入方法

##### 1.将该文件完整复制到自己的项目内

##### 2.CommonMapComp.vue的引入

```html
    将CommonMapComp.vue作为组件引入到所需vue文件，及可创建一个包含右键功能菜单的三位地图；

    <div style="width: 100%;height: 100%;display: block;">
      <common-map-comp
        :to-center="toCenter"
        :load3d-tiles="load3dTiles"
        :tile-set-url="tileSetUrl"
      ></common-map-comp>
    </div>
```

##### 3.icons的引入

[打开icons地址](https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=3778628&keyword=&project_type=&page=)

  ``` javascript
    将如上链接内所有icons添加到自己的项目，并在main.js内引入

    // 确保路径正确
    import './assets/icons/iconfont.css'
    import './assets/icons/iconfont.js'
  ```

##### 4.xt3d.new.js的引入

  ``` javascript
    1.如果项目内没有该文件，将其复制到static目录下，并在index.html内引入
     <script src="./static/xt3d.new.js"></script>
    2.如项目内已经包含，为确保功能的一致性，减少bug出现，使用该文件进行替换
  ```



