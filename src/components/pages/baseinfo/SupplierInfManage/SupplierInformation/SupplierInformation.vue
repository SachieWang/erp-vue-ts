<!--
 * @Author: SachieW
 * @Date: 2021-04-14 11:01:12
 * @LastEditTime: 2021-04-14 18:15:11
 * @LastEditors: SachieW
 * @Description: 
 * @FilePath: \erp-vue-ts\src\components\pages\baseinfo\SupplierInfManage\SupplierInformation\SupplierInformation.vue
-->
<template>
  <vxe-grid v-bind="gridOptions"></vxe-grid>
</template>

<script lang="ts">
import XEAjax from "xe-ajax";
import { VxeGridProps } from "vxe-table";
import config from "@/config";
import vm from "@/main";

var gridOptions: VxeGridProps = {
  border: true,
  loading: false,
  resizable: true,
  showHeaderOverflow: true,
  showOverflow: true,
  highlightHoverRow: true,
  keepSource: true, //使用编辑状态则需启用，保存原值
  id: "supplierinformation",
  height: "auto",
  formConfig: {
    items: [
      {
        title: "供应商编号",
        field: "vendorCode",
        itemRender: {
          name: "$input",
          props: { placeholder: "请输入供应商编号" },
        },
      },
      {
        title: "供应商名称",
        field: "vendorName",
        itemRender: {
          name: "$input",
          props: { placeholder: "请输入供应商名称" },
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
      type: "checkbox",
      field: "id",
      width: 80,
    },
    {
      title: "供应商编号",
      field: "vendorCode",
      editRender: {
        name: "$input",
      },
    },
    {
      title: "供应商名称",
      field: "vendorName",
      editRender: {
        name: "$input",
      },
    },
    {
      title: "供应商类型",
      field: "vendorType",
      editRender: {
        name: "$input",
      },
    },
    {
      title: "电子邮件",
      field: "email",
      editRender: {
        name: "$input",
      },
    },
    {
      title: "电话号码",
      field: "phone",
      editRender: {
        name: "$input",
      },
    },
    {
      title: "联系人",
      field: "manager",
      editRender: {
        name: "$input",
      },
    },
    {
      title: "地址",
      field: "adress",
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
      query: ({ page, form }) => {
        var Param = form;
        Param.limit = page.pageSize;
        Param.start = page.pageSize * (page.currentPage - 1);

        return XEAjax.post(
          `http://` + config.host + `:8080/vendor/queryByParam`,
          Param
        );
      },
      delete: ({ body }) => {
        return new Promise(function (resolve) {
          XEAjax.post(`http://` + config.host + `:8080/vendor/save`, body).then(
            (value) => {
              (vm as any).$store.dispatch("updateSupplierOPTS");
              resolve(value);
            }
          );
        });
      },
      save: ({ body }) => {
        // return XEAjax.post(`http://` + config.host + `:8080/vendor/save`, body);
        return new Promise(function (resolve) {
          XEAjax.post(`http://` + config.host + `:8080/vendor/save`, body).then(
            (value) => {
              (vm as any).$store.dispatch("updateSupplierOPTS");
              resolve(value);
            }
          );
        });
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
  checkboxConfig: {
    labelField: "id",
    reserve: true,
    highlight: true,
    range: true,
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
