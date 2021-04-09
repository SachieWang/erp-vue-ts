<template>
  <vxe-grid v-bind="gridOptions"></vxe-grid>
</template>

<script lang="ts">
import { reactive } from "vue";
import { VxeGridProps } from "vxe-table";
import XEAjax from "xe-ajax";
import config from "@/config";

export default {
  setup() {
    const gridOptions = reactive({
      data: [],
      border: true,
      resizable: false,
      height: "auto",
      columns: [
        {
          title: "序号",
          type: "seq",
          width: 100,
        },
        {
          title: "事务编号",
          field: "billcode",
        },
        {
          title: "仓库",
          field: "warecode",
        },
        {
          title: "物料编号",
          field: "partcode",
        },
        {
          title: "物料名称",
          field: "partname",
        },
        {
          title: "规格",
          field: "spec",
        },
        {
          title: "特征",
          field: "character",
        },
        {
          title: "轮胎编号",
          field: "tirecode",
        },
        {
          title: "轮胎品牌",
          field: "brand",
        },
        {
          title: "轮胎型号",
          field: "modelk",
        },
        {
          title: "事务日期",
          field: "beg_date",
        },
        {
          title: "供应商",
          field: "supname",
        },
        {
          title: "剩余数量",
          field: "cur_num",
        },
        {
          title: "入库数量",
          field: "in_num",
        },
        {
          title: "成本价格",
          field: "cost_price1",
        },
        {
          title: "成本价格（不含税）",
          field: "cost_price0",
        },
      ],
      pagerConfig: {
        pageSize: 10,
        pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000],
        // enabled: false,
      },
      proxyConfig: {
        props: {
          list: "data",
          result: "data",
          total: "total",
        },
        ajax: {
          // 接收 Promise
          query: ({ page }) => {
            return XEAjax.get(
              `http://` +
                config.host +
                `:8080/njuits-erp/batchmanage/view.action?warecode=&partcode=&partname=&character=&spec=&brand=&modelk=&start=` +
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