<template>
  <vxe-grid ref="xGrid" v-bind="gridOptions">
    <template #content>
      <vxe-grid v-bind="subGridOptions"></vxe-grid>
    </template>
  </vxe-grid>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { VxeGridProps, VxeTableInstance } from "vxe-table";
import XEAjax from "xe-ajax";
import config from '@/config';

export default {
  setup() {
    //引用父级表格实例
    const xGrid = ref({} as VxeTableInstance);

    //主表配置
    const gridOptions = reactive({
      height: "auto",
      border: "full",
      highlightHoverRow: true,
      highlightCurrentRow: true,
      formConfig: {
        titleWidth: 100,
        titleAlign: "right",
        items: [
          {
            field: "billcode",
            title: "事务编号",
            span: 5,
            titlePrefix: {
              message: "app.body.valid.rName",
              icon: "fa fa-exclamation-circle",
            },
            itemRender: {
              name: "$input",
              props: { placeholder: "请输入事务编号" },
            },
          },
          {
            field: "busbrandno",
            title: "车牌号",
            span: 5,
            itemRender: {
              name: "$input",
              props: { placeholder: "请输入车牌号" },
            },
          },
          {
            field: "wa_startdate",
            title: "事务日期",
            span: 5,
            itemRender: {
              name: "$input",
              props: {
                type: "date",
                placeholder: "请选择开始日期",
              },
            },
          },
          {
            field: "wa_enddate",
            // title: "~",
            span: 4,
            itemRender: {
              name: "$input",
              align: "left",
              props: {
                type: "date",
                placeholder: "请选择截止日期",
              },
            },
          },
          {
            span: 5,
            align: "center",
            // collapseNode: true,
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
      columns: [
        {
          title: "事务编号",
          field: "billcode",
          type: "checkbox",
          width: 150,
        },
        {
          type: "expand",
          title: "详细",
          width: 50,
          slots: {
            content: "content",
          },
        },
        {
          title: "仓库名称",
          field: "warecode",
        },
        {
          title: "事务状态",
          field: "state",
        },
        {
          title: "审核状态",
          field: "isconfim",
        },
        {
          title: "事务日期",
          field: "billdatestr",
        },
        {
          title: "事务原因",
          field: "causecode",
        },
        {
          title: "保管员",
          field: "checker",
        },
        {
          title: "经手人",
          field: "handler",
        },
        {
          title: "领用部门",
          field: "deptcode",
        },
        {
          title: "车牌号",
          field: "onboardid",
        },
        {
          title: "线路类别",
          field: "linecategory",
        },
        {
          title: "领料单号",
          field: "billco",
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
          query: ({ page, form }) => {
            return XEAjax.get(
              `http://`+config.host+`:8080/njuits-erp/warestore/view.action?_dc=1617176981579&billcode=` +
                form.billcode +
                `&busbrandno=` +
                form.busbrandno +
                `&startdate=` +
                form.wa_startdate +
                `&enddate=` +
                form.wa_enddate +
                `&warecode=&billco=&state=&typecode=2&start=` +
                page.pageSize * (page.currentPage - 1) +
                `&limit=` +
                page.pageSize
            );
          },
        },
      },
      // expandConfig: {
      //   lazy: true,
      //   loadMethod({ row }: any) {
      //     return new Promise(function (resolve) {
      //       XEAjax.get(
      //         `http://`+config.host+`:8080/njuits-erp/warestorede/view.action?_dc=1617181982474&billcode=` +
      //           row.billcode +
      //           `&billco=&typecode=&start=0&limit=100`
      //       ).then(function (res) {
      //         // grid.value.loadData(res.data);

      //         row.expandData = res.data;
      //         resolve();
      //       });
      //     });
      //   },
      // },
      checkboxConfig: {
        labelField: "billcode",
        reserve: true,
        highlight: true,
        range: true,
      },
    } as VxeGridProps);

    const subGridOptions = reactive({
      data: [],
      border: true,
      resizable: false,
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
      },
      columns: [
        {
          title: "序号",
          width: 50,
          type: "checkbox",
        },
        {
          title: "事务编码",
          visible: false,
          field: "billcode",
        },
        {
          title: "事务日期",
          visible: false,
          field: "billdatestr",
        },
        {
          title: "事务类型",
          visible: false,
          field: "typecode",
        },
        {
          title: "仓库名称",
          visible: false,
          field: "warecode",
        },
        {
          title: "事务状态",
          visible: false,
          field: "state",
        },
        {
          title: "物料编码",
          field: "partcode",
        },
        {
          title: "物料名称",
          field: "partname",
        },
        {
          title: "轮胎编号",
          field: "tirecode",
        },
        {
          title: "库存单位",
          field: "unit",
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
          title: "库位",
          visible: false,
          field: "stationcode",
        },
        {
          title: "批号",
          field: "batcode",
        },
        {
          title: "出库数量",
          field: "out_num",
        },
        {
          title: "价格",
          field: "out_price1",
        },
        {
          title: "金额",
          field: "out_sum1",
        },
        {
          title: "参考价(元)",
          field: "sprice1",
        },
        {
          title: "备注",
          field: "note",
        },
      ],
      checkboxConfig: {
        labelField: "partcode",
        reserve: true,
        highlight: true,
        range: true,
      },
      proxyConfig: {
        enabled: false,
        props: {
          list: "data",
          result: "data",
          total: "total",
        },
        ajax: {
          query() {
            return XEAjax.get(
              `http://`+config.host+`:8080/njuits-erp/warestorede/view.action?_dc=1617181982474&billcode=` +
                xGrid.value.getCurrentRecord().billcode +
                `&billco=&typecode=&start=0&limit=100`
            );
          },
          delete() {
            return new Promise(function (resolve) {
              resolve("success");
            });
            // return XEAjax.get(
            //   `http://`+config.host+`:8080/njuits-erp/warestorede/view.action?_dc=1617181982474&billcode=LL202103280001&billco=&typecode=&start=0&limit=100`
            // );
          },
        },
      },
    } as VxeGridProps);

    return {
      xGrid,
      gridOptions,
      subGridOptions,
    };
  },
};
</script>