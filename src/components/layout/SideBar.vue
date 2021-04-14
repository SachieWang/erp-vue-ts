<template>
  <el-row class="tac">
    <el-col :span="23" :push="1">
      <el-row style="height: 60px">
        <el-col :span="6" class="sidebar-title-icon">
          <i class="el-icon-menu" />
        </el-col>
        <el-col :span="18" class="sidebar-title-text">
          <h1>物资供应</h1>
        </el-col>
      </el-row>
      <el-menu
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
        style="height: calc(100% - 62px)"
        @mouseenter="handleHover"
        @mouseleave="handleLeave"
        :collapse="isCollapse"
      >
        <el-submenu index="baseinfo">
          <template #title>
            <i class="el-icon-setting"></i>
            <span>基础数据</span>
          </template>
          <el-submenu index="MaterialInfManage">
            <template #title>物资信息管理</template>
            <el-menu-item index="PartClass">分类管理</el-menu-item>
            <el-menu-item index="PartBasic">物料管理</el-menu-item>
            <el-menu-item index="BatchManage">批次管理</el-menu-item>
            <el-menu-item index="PriceCoefficient">价格系数</el-menu-item>
          </el-submenu>
          <el-submenu index="WarehouseInfManage">
            <template #title> 仓库信息管理 </template>
            <el-menu-item index="WareHouse">仓库管理</el-menu-item>
            <el-menu-item index="1-2-2">库位管理</el-menu-item>
            <el-menu-item index="1-2-3">保管员管理</el-menu-item>
            <el-menu-item index="1-2-4">库存事务定义</el-menu-item>
          </el-submenu>
          <el-submenu index="SupplierInfManage">
            <template #title>供应商资料管理</template>
            <el-menu-item index="SupplierInformation">
              供应商资料管理
            </el-menu-item>
            <el-menu-item index="SupplierQuotation">
              供应商报价管理
            </el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="BusinessManage">
          <template #title>
            <i class="el-icon-setting"></i>
            <span> 业务管理</span>
          </template>
          <el-menu-item index="WareOriginal">期初事务管理</el-menu-item>
          <el-menu-item index="WarePurchase">采购入库管理</el-menu-item>
          <el-menu-item index="WareStore">生产领料管理</el-menu-item>
          <el-menu-item index="WareBack">采购退料管理</el-menu-item>
          <el-menu-item index="2-5">生产退料管理</el-menu-item>
          <el-menu-item index="2-6">调拨出库管理</el-menu-item>
          <el-menu-item index="2-7">调整事务管理</el-menu-item>
          <el-menu-item index="2-8">销售出库管理</el-menu-item>
          <el-menu-item index="2-9">仓库结转管理</el-menu-item>
        </el-submenu>
        <el-submenu index="ReportAnalysis">
          <template #title>
            <i class="el-icon-setting"></i>
            <span>报表分析</span>
          </template>
          <el-menu-item index="3-1">库存状态报表分析</el-menu-item>
          <el-menu-item index="3-2">库存结转历史分析</el-menu-item>
          <el-menu-item index="3-3">单据明细报表分析</el-menu-item>
          <el-menu-item index="3-4">月度结转报表分析</el-menu-item>
          <el-menu-item index="3-5">材料出库汇总明细</el-menu-item>
          <el-menu-item index="3-6">超短缺库存分析</el-menu-item>
          <el-menu-item index="3-7">供应商采购月报</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    handleHover() {
      if ((this as any).$data.isCollapse == true) {
        (this as any).$data.isCollapse = false;
      }
    },
    handleLeave() {
      if ((this as any).$data.isCollapse == false) {
        (this as any).$data.isCollapse = true;
      }
    },
    handleSelect(key: any, keyPath: any) {
      let path = "";
      for (let index = 0; index < keyPath.length; index++) {
        path = path + "/" + keyPath[index];
      }
      console.log(path);

      console.log((this as any).$router.hasRoute(key)); //是否存在目标路由
      //存在则跳转
      if ((this as any).$router.hasRoute(key)) {
        console.log("route success: ", key);
        (this as any).$router.push({ name: key });
      } else {
        var pathToComponent = "../pages" + path + "/" + key;
        console.log("to import route: ", pathToComponent);
        //动态添加路由
        (this as any).$router.addRoute({
          name: key,
          path: "/" + key,
          component: () =>
            import("../pages" + path + "/" + key)
              .then((res) => res)
              .catch((err) => {
                console.log("module import error catched!!!");
                console.log(err);
                (this as any).$router.push({ name: "home" });
              }),
        });
        (this as any).$router.replace({ name: key }).catch((err: any) => {
          console.log(err);
        });
      }
      console.log((this as any).$router.getRoutes());
    },
    handleOpen(key: any, keyPath: any) {
      console.log(key, keyPath);
    },
    handleClose(key: any, keyPath: any) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.tac {
  height: 100%;
}
.sidebar-title-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sidebar-title-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
</style>
