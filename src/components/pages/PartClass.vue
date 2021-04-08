<template>
  <vxe-grid
    ref="xGrid"
    v-bind="gridOptions"
    :data="demo1.tableData"
    style="height: 100%"
  >
    <template #header>
      <div>分类编码</div>
      <input
        v-model="demo1.filterName"
        type="type"
        placeholder="Filter"
        @keyup="searchEvent"
      />
    </template>
  </vxe-grid>
</template>

<script  lang="ts">
import XEAjax from "xe-ajax";
import XEUtils from "xe-utils";
import { reactive, ref, nextTick } from "vue";
import { VxeTableInstance } from "vxe-table";
export default {
  setup() {
    const xGrid = ref({} as VxeTableInstance);

    const demo1 = reactive({
      filterName: "",
      loading: false,
      originData: [] as any[],
      tableData: [] as any[],
    });

    const handleSearch = async () => {
      const filterName = XEUtils.toValueString(demo1.filterName).trim();
      console.log(filterName);

      if (filterName) {
        console.log(filterName);
        
        const options = { children: "child" };
        const searchProps = ["classcode", "classname"];
        await xGrid.value.loadData(
          XEUtils.searchTree(
            demo1.originData,
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
          const $table = xGrid.value;
          $table.setAllTreeExpand(true);
        });
      } else {
        xGrid.value.reloadData(demo1.originData);
        // demo1.tableData = demo1.originData;
      }
    };

    // 创建一个防防抖函数，调用频率间隔 500 毫秒
    const searchEvent = XEUtils.debounce(
      function () {
        console.log("start");

        handleSearch();
      },
      500,
      { leading: false, trailing: true }
    );

    demo1.loading = true;
    XEAjax.get(
      "http://localhost:8080/njuits-erp/t_partclass/getTree.action"
    ).then((res) => {
      demo1.originData = res.data;
    });

    return {
      xGrid,
      demo1,
      searchEvent,
    };
  },
  data(): any {
    return {
      gridOptions: {
        data: [],
        border: true,
        loading: false,
        resizable: true,
        showHeaderOverflow: true,
        showOverflow: true,
        highlightHoverRow: true,
        keepSource: true,
        id: "partclass",
        height: "auto",
        // rowId: "_XID",
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
        pagerConfig: {
          pageSize: 10,
          pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000],
          // enabled: false,
        },
        formConfig: {
          titleWidth: 100,
          titleAlign: "right",
          items: [
            {
              field: "partcode",
              title: "分类编码",
              span: 8,
              titlePrefix: {
                message: "app.body.valid.rName",
                icon: "fa fa-exclamation-circle",
              },
              itemRender: {
                name: "$input",
                props: { placeholder: "请输入名称" },
              },
            },
            {
              field: "email",
              title: "分类名称",
              span: 8,
              itemRender: {
                name: "$input",
                props: { placeholder: "请输入邮件" },
              },
            },
            {
              span: 8,
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
            query: ({ form }: any) => {
              console.log(form);
              return XEAjax.get(
                `http://localhost:8080/njuits-erp/t_partclass/getTree.action`
              );
            },
            delete: () => console.log("delete"),
            save: ({ body }: any) => XEAjax.post("https://localhost", body),
          },
        },
        columns: [
          { type: "checkbox", title: "序号", width: 120 },
          {
            title: "分类编码",
            align: "center",
            field: "classcode",
            treeNode: true,
            slots: {
              header: "header",
            },
          },
          {
            title: "分类名称",
            field: "classname",
          },
          {
            title: "会计科目",
            field: "account",
          },
          {
            field: "isdisable",
            title: "是否可用",
          },
        ],
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
        treeConfig: {
          children: "child",
          line: true,
          trigger: "cell",
        },
      },
    };
  },
  created() {
    // (this as any).findSexList();
  },
  methods: {
    async findSexList() {
      const sexList = await XEAjax.get(
        "http://121.36.220.233:8080/api/v1/product/creates"
      );
      //   const sexList = await function () {
      //     return new Promise((resolve) => {
      //       resolve([
      //         { value: 1, label: "男" },
      //         { value: 0, label: "女" },
      //       ]);
      //     });
      //   };
      // 异步更新下拉选项
      (this as any).sexList = sexList;
      const xGrid = (this as any).$refs.xGrid;
      if (xGrid) {
        const sexColumn = xGrid.getColumnByField("sex");
        sexColumn.editRender.options = sexList;
        const sexItem = xGrid.getFormItems(4);
        sexItem[4].itemRender.options = sexList;
      }
    },
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
};
</script>