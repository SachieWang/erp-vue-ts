<template>
  <vxe-grid ref="xGrid" v-bind="gridOptions">
    <template #header>
      <div style="display: flex; flex-direction: row">
        <div>分类编码</div>
        <input
          v-model="girdconfig.filterName"
          type="type"
          placeholder="Filter"
          @keyup="searchEvent"
        />
      </div>
    </template>
  </vxe-grid>
</template>

<script  lang="ts">
import XEAjax from "xe-ajax";
import { onMounted, reactive, ref } from "vue";
import { VxeTableInstance } from "vxe-table";
import searchClassTree from "@/composables/searchTree";
import config from "@/config";

export default {
  setup() {
    const xGrid = ref({} as VxeTableInstance);

    const girdconfig = reactive({
      filterName: "",
      loading: false,
      originData: [] as any[],
    });

    const { searchEvent } = searchClassTree(xGrid, girdconfig);

    girdconfig.loading = true;

    onMounted(() => {
      XEAjax.post(
        `http://` + config.host + `:8080/materialtype/queryTree`
      ).then((res) => {
        girdconfig.originData = res.data;
        xGrid.value.loadData(res.data);
      });
    });

    return {
      xGrid,
      girdconfig,
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
        rowId: "id",
        formConfig: {
          titleWidth: 100,
          titleAlign: "right",
          items: [
            {
              span: 2,
              align: "center",
              field: "switchStatus",
              itemRender: {
                name: "$switch",
                props: {
                  openLabel: "编辑模式",
                  closeLabel: "编辑模式",
                },
                events: {
                  change: () => {
                    if (!(this as any).$router.hasRoute("PartClassEdit")) {
                      var pathToComponent =
                        "../pages/PartClassEdit/PartClassEdit";
                      console.log("to import route: ", pathToComponent);
                      //动态添加路由
                      (this as any).$router.addRoute({
                        name: "PartClassEdit",
                        path: "/PartClassEdit",
                        component: () => import("./PartClassEdit.vue"),
                      });
                      console.log((this as any).$router);
                    }
                    (this as any).$router.push({ name: "PartClassEdit" });
                  },
                },
                defaultValue: false,
              },
            },
            {
              span: 22,
            },
          ],
        },
        proxyConfig: {
          autoLoad: true,
          seq: true, // 启用动态序号代理
          props: {
            list: "data",
          },
          ajax: {
            // 接收 Promise 对象
            query: () => {
              return XEAjax.post(
                `http://` + config.host + `:8080/materialtype/queryTree`
              );
            },
          },
        },
        columns: [
          {
            title: "分类编码",
            align: "center",
            field: "typeCode",
            treeNode: true,
            slots: {
              header: "header",
            },
          },
          {
            title: "分类名称",
            field: "typeName",
          },
        ],
        treeConfig: {
          children: "children",
          line: true,
          trigger: "cell",
        },
        sortConfig: {
          defaultSort: {
            field: "typeCode",
            order: "asc",
          },
        },
      },
    };
  },
};
</script>