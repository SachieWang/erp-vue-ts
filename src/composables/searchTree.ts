/*
 * @Author: SachieW
 * @Date: 2021-04-12 16:10:39
 * @LastEditTime: 2021-04-13 17:33:49
 * @LastEditors: SachieW
 * @Description: In User Settings Edit
 * @FilePath: \erp-vue-ts\src\composables\searchTree.ts
 */

import { nextTick, Ref } from "vue";
import { VxeTableInstance } from "vxe-table";
import XEUtils from "xe-utils";

export default function searchClassTree(xGrid: Ref<VxeTableInstance>, config: any) {
    const searchEvent = XEUtils.debounce(
        function () {
            console.log("start");

            handleSearch(xGrid.value, {
                filterName: config.filterName,
                originData: config.originData,
            });
        },
        500,
        { leading: false, trailing: true }
    );

    return {
        searchEvent
    }
}

async function handleSearch(xGrid: VxeTableInstance, config: { filterName: String, originData: any }) {
    const filterName = XEUtils.toValueString(config.filterName).trim();
    console.log(filterName);

    if (filterName) {
        console.log(filterName);

        const options = { children: "children" };
        const searchProps = ["typeCode", "typeName"];
        await xGrid.loadData(
            XEUtils.searchTree(
                config.originData,
                (item) =>
                    searchProps.some(
                        (key) =>
                            XEUtils.toValueString(item[key]).indexOf(filterName) > -1
                    ),
                options
            )
        );
        // 搜索之后默认展开所有子节点
        nextTick(() => {
            xGrid.setAllTreeExpand(true);
        });
    } else {
        xGrid.reloadData(config.originData);
    }
}
