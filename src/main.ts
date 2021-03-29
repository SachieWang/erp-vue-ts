import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import installVueRouter from './plugins/vue-router'
import installVXETable from './plugins/vxe-table'

// createApp(App).mount('#app')
const app = createApp(App);
installElementPlus(app);
installVueRouter(app);
installVXETable(app);
app.mount('#app');
