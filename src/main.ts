/*
 * @Author: SachieW
 * @Date: 2021-03-29 16:09:22
 * @LastEditTime: 2021-04-14 18:09:43
 * @LastEditors: SachieW
 * @Description: 
 * @FilePath: \erp-vue-ts\src\main.ts
 */
import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import installVueRouter from './plugins/vue-router'
import installVXETable from './plugins/vxe-table'
import store from './store'

// createApp(App).mount('#app')
const app = createApp(App).use(store);
installElementPlus(app);
installVueRouter(app);
installVXETable(app);
const vm = app.mount('#app');

export default vm;
