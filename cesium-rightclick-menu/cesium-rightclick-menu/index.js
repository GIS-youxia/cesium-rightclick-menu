import cMap from './src/cesium-rightclick-menu'

// 为组件提供 install 安装方法，供按需引入
cMap.install = Vue => {
    Vue.component(cMap.name, cMap)
}

// 默认导出组件
export default cMap

