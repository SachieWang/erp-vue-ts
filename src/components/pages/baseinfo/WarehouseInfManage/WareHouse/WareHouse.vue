<!--
 * @Author: SachieW
 * @Date: 2021-04-14 09:17:01
 * @LastEditTime: 2021-04-14 11:14:24
 * @LastEditors: SachieW
 * @Description: 
 * @FilePath: \erp-vue-ts\src\components\pages\baseinfo\WarehouseInfManage\WareHouse\WareHouse.vue
-->
<template>
  <vxe-grid v-bind="gridOptions"></vxe-grid>
</template>

<script lang="ts">
import XEAjax from "xe-ajax";
import { VxeGridProps } from "vxe-table";
import config from "@/config";

var gridOptions: VxeGridProps = {
  border: true,
  loading: false,
  resizable: true,
  showHeaderOverflow: true,
  showOverflow: true,
  highlightHoverRow: true,
  keepSource: true,//使用编辑状态则需启用，保存原值
  id: "warehouse",
  height: "auto",
  formConfig: {
    items: [
      {
        title: "仓库代码",
        field: "wareCode",
        itemRender: {
          name: "$input",
          props: { placeholder: "请输入仓库代码" },
        },
      },
      {
        title: "仓库名称",
        field: "wareName",
        itemRender: {
          name: "$input",
          props: { placeholder: "请输入仓库名称" },
        },
      },
      {
        title: "仓库类型",
        field: "wareType",
        itemRender: {
          name: "$input",
          props: { placeholder: "请选择仓库类型" },
        },
      },
      {
        title: "有效仓库",
        field: "abled",
        itemRender: {
          name: "$input",
          props: { placeholder: "请选择有效仓库" },
        },
      },
      {
        itemRender: {
          name: "$buttons",
          children: [
            {
              props: {
                type: "submit",
                content: "搜索",
                status: "primary",
              },
            },
            { props: { type: "reset", content: "重置" } },
          ],
        },
      },
    ],
  },
  toolbarConfig: {
    buttons: [
      { code: "insert_actived", name: "新增", icon: "fa fa-plus" },
      { code: "delete", name: "直接删除", icon: "fa fa-trash-o" },
      { code: "mark_cancel", name: "删除/取消", icon: "fa fa-trash-o" },
      {
        code: "save",
        name: "保存",
        icon: "fa fa-save",
        status: "success",
      },
    ],
    refresh: true,
    import: true,
    export: true,
    print: true,
    zoom: true,
    custom: true,
  },
  rowId: "id",
  columns: [
    {
      title: "序号",
      type: "seq",
      width: 50,
    },
    {
      title: "仓库代码",
      field: "wareCode",
      editRender: {
        name: "$input",
      },
    },
    {
      title: "仓库名称",
      field: "wareName",
      editRender: {
        name: "$input",
      },
    },
    {
      title: "是否启用",
      field: "abled",
      editRender: {
        name: "$switch",
        props: {
          openLabel: "是",
          closeLabel: "否",
        },
        defaultValue: false,
      },
      formatter: ({ cellValue }: any) => {
        if (cellValue == true) {
          return "是";
        } else {
          return "否";
        }
      },
    },
    {
      title: "仓库类型",
      field: "wareType",
      editRender: {
        name: "$input",
      },
    },
    {
      title: "开账模式",
      field: "openType",
      editRender: {
        name: "$input",
      },
    },
    {
      title: "备注",
      field: "remark",
      editRender: {
        name: "$input",
      },
    },
  ],
  proxyConfig: {
    autoLoad: true,
    form: true,
    props: {
      // list: "data",
      result: "data",
      total: "total",
    },
    ajax: {
      query: ({ page }) => {
        let Param = { limit: 0, start: 0 };
        Param.limit = page.pageSize;
        Param.start = page.pageSize * (page.currentPage - 1);

        return XEAjax.post(
          `http://` + config.host + `:8080/ware/queryByParam`,
          Param
        );
      },
      delete: ({ body }) => {
        return XEAjax.post(`http://` + config.host + `:8080/ware/save`, body);
      },
      save: ({ body }) => {
        return XEAjax.post(`http://` + config.host + `:8080/ware/save`, body);
      },
    },
  },
  pagerConfig: {
    pageSize: 10,
    pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000],
    // enabled: false,
  },
  editConfig: {
    trigger: "click",
    mode: "row",
    showStatus: true,
  },
};

export default {
  data() {
    return {
      gridOptions: gridOptions,
    };
  },
};
</script>
