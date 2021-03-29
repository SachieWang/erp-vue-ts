import { createRouter, createWebHashHistory } from 'vue-router'
import routes from "../router/index"
import { App } from 'vue'

export default (app: App<Element>) => {
    const router = createRouter({
        // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
        history: createWebHashHistory(),
        routes,// short for `routes: routes`
    })
    app.use(router)
}