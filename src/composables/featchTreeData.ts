/*
 * @Author: SachieW
 * @Date: 2021-04-12 17:00:08
 * @LastEditTime: 2021-04-12 18:13:23
 * @LastEditors: SachieW
 * @Description: 
 * @FilePath: \erp-vue-ts\src\composables\featchTreeData.ts
 */

import config from "@/config";
import XEAjax from "xe-ajax";

export default async function fetchData(gridConfig: any) {
    XEAjax.get(
        `http://` + config.host + `:8080/njuits-erp/t_partclass/getTree.action`
    ).then((res) => {
        gridConfig.originData = res.data;
    });
}