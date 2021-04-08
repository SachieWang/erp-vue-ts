import { createRouter, createWebHashHistory } from 'vue-router'
import routes from "../router/index"
import { App } from 'vue'

export default (app: App<Element>) => {
    const router = createRouter({
        history: createWebHashHistory(),
        routes,
    })
    app.use(router)
}