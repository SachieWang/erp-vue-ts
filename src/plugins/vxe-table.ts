import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import VXETablePluginElement from 'vxe-table-plugin-element'
import 'vxe-table-plugin-element/dist/style.css'

import { App } from 'vue'

VXETable.use(VXETablePluginElement)

export default (app: App<Element>) => {
    app.use(VXETable);
}