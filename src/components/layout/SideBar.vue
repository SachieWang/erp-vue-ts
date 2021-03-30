
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
      >
        <el-submenu index="基础数据">
          <!-- title -->
          <template #title>
            <!-- <i class="el-icon-location"></i> -->
            <!-- <span> -->
            基础数据
            <!-- </span> -->
          </template>
          <!-- content -->
          <el-submenu index="物资信息管理">
            <template #title>物资信息管理</template>
            <el-menu-item index="分类管理">分类管理</el-menu-item>
            <el-menu-item index="物料管理">物料管理</el-menu-item>
            <el-menu-item index="批次管理">批次管理</el-menu-item>
            <el-menu-item index="1-1-4">价格系数</el-menu-item>
          </el-submenu>
          <el-submenu index="1-2">
            <template #title>仓库信息管理</template>
            <el-menu-item index="1-2-1">仓库管理</el-menu-item>
            <el-menu-item index="1-2-2">库位管理</el-menu-item>
            <el-menu-item index="1-2-3">保管员管理</el-menu-item>
            <el-menu-item index="1-2-4">库存事务定义</el-menu-item>
          </el-submenu>
          <el-submenu index="1-3">
            <template #title>供应商资料管理</template>
            <el-menu-item index="1-3-1">供应商资料管理</el-menu-item>
            <el-menu-item index="1-3-1">供应商报价管理</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template #title> 业务管理 </template>
          <el-menu-item index="2-1">期初事务管理</el-menu-item>
          <el-menu-item index="2-2">采购入库管理</el-menu-item>
          <el-menu-item index="2-3">生产领料管理</el-menu-item>
          <el-menu-item index="2-4">采购退料管理</el-menu-item>
          <el-menu-item index="2-5">生产退料管理</el-menu-item>
          <el-menu-item index="2-6">调拨出库管理</el-menu-item>
          <el-menu-item index="2-7">调整事务管理</el-menu-item>
          <el-menu-item index="2-8">销售出库管理</el-menu-item>
          <el-menu-item index="2-9">仓库结转管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template #title>报表分析</template>
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
      isCollapse: false,
    };
  },
  methods: {
    handleOpen(key: any, keyPath: any) {
      console.log(key, keyPath);
    },
    handleClose(key: any, keyPath: any) {
      console.log(key, keyPath);
    },
    handleSelect(key: any, keyPath: any) {
      console.log(key, keyPath);
      if (key == "物料管理") {
        console.log((this as any).$route);
        (this as any).$router.push("/partbasic");
      } else if (key == "分类管理") {
        (this as any).$router.push("/partclass");
      } else if (key == "批次管理") {
        (this as any).$router.push("/batchmanage");
      } else {
        (this as any).$router.push("/");
      }
    },
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
