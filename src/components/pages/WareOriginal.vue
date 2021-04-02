
<template>
  <vxe-grid v-bind="gridOptions"></vxe-grid>
</template>

<script lang="ts">
import { reactive } from "vue";
import { VxeGridProps } from "vxe-table";
import XEAjax from "xe-ajax";

export default {
  setup() {
    const gridOptions = reactive({
      height: "auto",
      emptyText: "暂无数据",
      columns: [
        {
          title: "序号",
          width: 50,
        },
        {
          title: "事务编号",
          field: "billcode",
        },
        {
          title: "仓库名称",
          field: "warecode",
        },
        {
          title: "事务日期",
          field: "billdate_str",
        },
        {
          title: "保管员",
          field: "checker",
        },
        {
          title: "状态",
          field: "state",
        },
        {
          title: "供应商",
          field: "supname",
        },
        {
          title: "摘要",
          field: "note",
        },
      ],
      pagerConfig: {
        pageSize: 20,
        pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000],
      },
      proxyConfig: {
        enabled: true,
        autoLoad: true,
        message: true,
        seq: true,
        sort: true,
        filter: true,
        form: true,
        props: {
          list: "data",
          result: "data",
          total: "total",
        },
        ajax: {
          query: ({ page }) => {
            return XEAjax.get(
              `http://localhost:8080/njuits-erp/ware_original/view.action?_dc=1617174493571&billcode=&startdate=&enddate=&warecode=&start=` +
                page.pageSize * (page.currentPage - 1) +
                `&limit=` +
                page.pageSize
            );
          },
        },
      },
    } as VxeGridProps);

    return {
      gridOptions,
    };
  },
};
</script>