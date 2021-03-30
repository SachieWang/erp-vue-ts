export default [
    { path: '/', component: () => import("../components/pages/home.vue") },
    { path: '/partbasic', component: () => import("../components/pages/PartBasic.vue") },
    { path: '/partclass', component: () => import("../components/pages/PartClass.vue") },
    { path: '/batchmanage', component: () => import("../components/pages/BatchManage.vue") },
]