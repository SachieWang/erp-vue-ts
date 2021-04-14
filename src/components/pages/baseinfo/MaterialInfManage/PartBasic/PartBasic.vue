<template>
  <vxe-grid ref="xGrid" v-bind="gridOptions" style="height: 100%"></vxe-grid>
</template>

<script lang="ts">
import XEAjax from "xe-ajax";
import XEUtils from "xe-utils";
import config from "@/config";
import { toRaw } from "vue";

export default {
  data() {
    return {
      gridOptions: {
        border: true,
        loading: false,
        resizable: true,
        showHeaderOverflow: true,
        showOverflow: true,
        highlightHoverRow: true,
        keepSource: true,
        id: "partbasic",
        height: "auto",
        rowId: "id",
        formConfig: {
          titleWidth: 100,
          titleAlign: "right",
          items: [
            {
              field: "itemCode",
              title: "物料编码",
              span: 8,
              itemRender: {
                name: "$input",
                props: { placeholder: "请输入物料编码" },
              },
            },
            {
              field: "itemName",
              title: "物料名称",
              span: 8,
              itemRender: {
                name: "$input",
                props: { placeholder: "请输入物料名称" },
              },
            },
            {
              field: "specs",
              title: "规格",
              span: 8,
              itemRender: {
                name: "$input",
                props: { placeholder: "请输入规格" },
              },
            },
            {
              field: "itemType",
              title: "物料类别",
              span: 8,
              folding: true,
              itemRender: {
                name: "$input",
                props: { placeholder: "请输入角色" },
              },
            },
            {
              field: "vendorCode",
              title: "供应商",
              span: 8,
              folding: true,
              itemRender: {
                name: "$select",
                options: [],
              },
            },
            {
              span: 24,
              align: "center",
              collapseNode: true,
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
          { type: "checkbox", title: "序号", width: 120 },
          {
            title: "图片资料",
            cellRender: {
              name: "ElButton",
              attrs: {
                size: "mini",
                type: "success",
                icon: "el-icon-message",
                circle: true,
              },
              events: {
                click: ({ row }: any) => {
                  console.log(row);

                  var prof = [
                    row.prof == null
                      ? null
                      : `http://` + config.host + `:8080` + row.prof,
                    row.prof2 == null
                      ? null
                      : `http://` + config.host + `:8080` + row.prof2,
                    row.prof3 == null
                      ? null
                      : `http://` + config.host + `:8080` + row.prof3,
                    row.prof4 == null
                      ? null
                      : `http://` + config.host + `:8080` + row.prof4,
                    row.prof5 == null
                      ? null
                      : `http://` + config.host + `:8080` + row.prof5,
                  ];
                  var details = {
                    partname: row.partname,
                    profs: prof,
                  };
                  (this as any).$emit("show-picture", details);
                },
              },
            },
            align: "center",
          },
          {
            title: "是否审批",
            field: "approval",
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
            title: "批次管理",
            field: "batchManage",
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
            field: "innerCoefficient",
            title: "内销系数",
            editRender: {
              name: "$input",
            },
          },
          {
            title: "物料编码",
            field: "itemCode",
            editRender: {
              name: "$input",
            },
          },
          {
            title: "物料名称",
            field: "itemName",
            editRender: {
              name: "$input",
            },
          },
          {
            title: "物料类型",
            field: "itemType",
            editRender: {
              name: "$input",
            },
          },
          {
            title: "最大库存",
            field: "maxNum",
            editRender: {
              name: "$input",
            },
          },
          {
            title: "外销系数",
            field: "outerCoefficient",
            editRender: {
              name: "$input",
            },
          },
          {
            title: "适用车型",
            field: "relationType",
            editRender: {
              name: "$input",
            },
          },
          {
            title: "安全库存",
            field: "safeNum",
            editRender: {
              name: "$input",
            },
          },
          {
            title: "规格",
            field: "specs",
            editRender: {
              name: "$input",
            },
          },
          {
            title: "单位",
            field: "unit",
            editRender: {
              name: "$input",
            },
          },
          {
            title: "供应商",
            field: "vendorCode",
            editRender: {
              name: "$select",
              options: [],
            },
          },
        ],
        proxyConfig: {
          autoLoad: true,
          seq: true, // 启用动态序号代理
          sort: true, // 启用排序代理
          filter: true, // 启用筛选代理
          form: true, // 启用表单代理
          props: {
            list: "data",
            result: "data",
            total: "total",
          },
          ajax: {
            // 接收 Promise 对象
            query: ({ page, form }: any) => {
              var Param = form;
              Param.limit = page.pageSize;
              Param.start = page.pageSize * (page.currentPage - 1);
              return XEAjax.post(
                `http://` + config.host + `:8080/material/queryByParam`,
                Param
              );
            },
            delete: ({ body }: any) =>
              XEAjax.post(
                `http://` + config.host + `:8080/material/save`,
                body
              ),
            save: ({ body }: any) =>
              XEAjax.post(
                `http://` + config.host + `:8080/material/save`,
                body
              ),
          },
        },
        pagerConfig: {
          pageSize: 10,
          pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000],
          // enabled: false,
        },
        customConfig: {
          storage: true,
          checkMethod: (this as any).checkColumnMethod,
        },
        printConfig: {
          columns: [
            { field: "name" },
            { field: "email" },
            { field: "nickname" },
            { field: "age" },
            { field: "amount" },
          ],
        },
        sortConfig: {
          trigger: "cell",
        },
        filterConfig: {
          remote: true,
        },
        importConfig: {
          remote: true,
          importMethod: (this as any).importMethod,
          types: ["xlsx"],
          modes: ["insert"],
        },
        exportConfig: {
          remote: false,
          exportMethod: (this as any).exportMethod,
          types: ["csv", "html", "xml", "txt"],
          modes: ["current", "selected", "all"],
        },
        checkboxConfig: {
          labelField: "id",
          reserve: true,
          highlight: true,
          range: true,
        },
        editRules: {
          name: [
            { required: true, message: "app.body.valid.rName" },
            { min: 3, max: 50, message: "名称长度在 3 到 50 个字符" },
          ],
          email: [{ required: true, message: "邮件必须填写" }],
          role: [{ required: true, message: "角色必须填写" }],
        },
        editConfig: {
          trigger: "click",
          mode: "row",
          showStatus: true,
        },
      },
    };
  },
  methods: {
    formatAmount({ cellValue }: any) {
      return cellValue
        ? `$${XEUtils.commafy(XEUtils.toNumber(cellValue), { digits: 2 })}`
        : "";
    },
    formatDate({ cellValue }: any) {
      return XEUtils.toDateString(cellValue, "yyyy-MM-dd HH:ss:mm");
    },
    checkColumnMethod({ column }: any) {
      if (["nickname", "role"].includes(column.property)) {
        return false;
      }
      return true;
    },
    importMethod({ file }: any) {
      // 处理表单
      const formBody = new FormData();
      formBody.append("file", file);
      // 上传文件
      return XEAjax.post(
        "https://api.xuliangzhan.com:10443/api/pub/import",
        formBody
      )
        .then((data) => {
          (this as any).$XModal.message({
            message: `成功导入 ${data.result.insertRows} 条记录！`,
            status: "success",
          });
          // 导入完成，刷新表格
          (this as any).$refs.xGrid.commitProxy("query");
        })
        .catch(() => {
          (this as any).$XModal.message({
            message: "导入失败，请检查数据是否正确！",
            status: "error",
          });
        });
    },
    exportMethod({ options }: any) {
      const proxyInfo = (this as any).$refs.xGrid.getProxyInfo();
      // 传给服务端的参数
      const body = {
        filename: options.filename,
        sheetName: options.sheetName,
        isHeader: options.isHeader,
        original: options.original,
        mode: options.mode,
        pager: proxyInfo.pager,
        ids:
          options.mode === "selected"
            ? options.data.map((item: any) => item.id)
            : [],
        fields: options.columns.map((column: any) => {
          return {
            field: column.property,
            title: column.title,
          };
        }),
      };
      // 开始服务端导出
      return XEAjax.post(
        "https://api.xuliangzhan.com:10443/api/pub/export",
        body
      )
        .then((data) => {
          if (data.id) {
            (this as any).$XModal.message({
              message: "导出成功，开始下载",
              status: "success",
            });
            // 读取路径，请求文件
            XEAjax.fetch(
              `https://api.xuliangzhan.com:10443/api/pub/export/download/${data.id}`
            ).then((response) => {
              response.blob().then((blob) => {
                // 开始下载
                (this as any).$XSaveFile({
                  filename: "导出数据",
                  type: "xlsx",
                  content: blob,
                });
              });
            });
          }
        })
        .catch(() => {
          (this as any).$XModal.message({
            message: "导出失败！",
            status: "error",
          });
        });
    },
  },

  async created() {
    await (this as any).$store.dispatch("getSupplierOPTS");
    const xGrid = (this as any).$refs.xGrid;
    console.log(
      "下拉框准备：",
      toRaw((this as any).$store.state.SupplierInfo.OPTS)
    );

    if (xGrid) {
      // 数据表下拉框准备
      const vendorColumn = xGrid.getColumnByField("vendorCode");
      vendorColumn.editRender.options = toRaw(
        (this as any).$store.state.SupplierInfo.OPTS
      );
      //查询条件下拉框准备
      const vendorItem = xGrid.getFormItems(4);
      vendorItem.itemRender.options = toRaw(
        (this as any).$store.state.SupplierInfo.OPTS
      );
    }
    // console.log((this as any).$store.state.SupplierInfo.OPTS);
  },
};
</script>