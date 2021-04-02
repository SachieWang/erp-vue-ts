# ERP-Frontend（vue、typescript版本）

## 描述

本项目为Vue版本ERP系统前端，编程语言为 `HTML + TypeScript + css`，包含页面路由管理、状态管理（store）以及大数据报表渲染

## 项目结构（主要内容）

erp  
|--- dist/（生产文件目录，存放编译后前端资源）  
|--- public/（公共前端文件目录，包含主页面index.html和网站图标favicon.ico）  
|--- src/（源文件目录）  
&emsp;&emsp;|--- assets/（资源目录）  
&emsp;&emsp;|--- components/（vue组件目录）  
&emsp;&emsp;|&emsp;&emsp;|--- layout/（布局组件，此处目前只有SideBar，定义侧边栏组件）  
&emsp;&emsp;|&emsp;&emsp;|--- pages/（页面主内容，即各项表格）  
&emsp;&emsp;|--- plugins/（组件应用的定义文件目录，主要用于定义element、vue-router、vxe-table等组件的引用）  
&emsp;&emsp;|--- router/（初始路由定义文件目录，在此处配置主页面路由、404路由等，其余动态路由在SideBar组件中注册管理）  
&emsp;&emsp;|--- App.vue（应用主体文件，包含页面整体布局、公共样式、SideBar组件注册以及抽屉组件）  
&emsp;&emsp;|--- main.ts（应用配置文件，初始化vue app并安装依赖的组件）

## 概要

### 项目初始化配置

```none
yarn install
```

### 编译并运行（支持热重启）

```none
yarn serve
```

### 编译并压缩项目

```none
yarn build
```

### 改善&修复

```none
yarn lint
```

### 其他配置参考

See [Configuration Reference](https://cli.vuejs.org/config/).

## 依赖

### 框架

|角色|框架名|地址|
|:-|:-|:-
|**应用框架**|Vue 3|[文档地址](https://v3.cn.vuejs.org/guide/introduction.html)
|**UI框架：**|Element-Plus|[文档地址](https://element-plus.gitee.io/#/zh-CN/component/installation)
|**表格框架：**|vxe-table 4.x|[文档地址](https://xuliangzhan_admin.gitee.io/vxe-table/v4/table/grid/fullEdit)

### 相关部件

|用途|部件名|地址
|:-|:-|:-
|页面路由|Vue Router (next)|[文档地址](https://next.router.vuejs.org/zh/installation.html)
|状态管理（store）|Vuex 4|[文档地址](https://next.vuex.vuejs.org/) [建议参考](https://vuex.vuejs.org/zh/)
