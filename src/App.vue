<template>
  <el-container>
    <el-aside width="240px"><SideBar /></el-aside>
    <el-container class="site-body">
      <el-main>
        <el-container class="content-page">
          <el-main
            class="content"
            style="height: calc(100% - 20px); padding: 0px"
          >
            <router-view @showPicture="showPicture" v-slot="{ Component }">
              <transition name="fade">
                <component :is="Component" />
              </transition>
            </router-view>
          </el-main>
        </el-container>
      </el-main>
    </el-container>
  </el-container>

  <el-drawer
    :title="title"
    v-model="drawer"
    :direction="direction"
    destroy-on-close
    size="20%"
  >
    <el-row v-for="(prof, index) in profs" :key="index">
      <el-col :span="16" :offset="4">
        <el-image
          style="width: 100px; height: 100px"
          :src="prof"
          :preview-src-list="profs"
        >
          <template #error>
            <div class="image-slot">
              <!-- <i class="el-icon-picture-outline"></i> -->
              暂无图片
            </div>
          </template>
        </el-image>
      </el-col>
      <el-divider></el-divider>
    </el-row>
  </el-drawer>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SideBar from "./components/layout/SideBar.vue";

@Options({
  data() {
    return {
      title: "",
      drawer: false,
      direction: "rtl",
      profs: [],
    };
  },
  components: {
    SideBar,
  },
  methods: {
    showPicture(args: any) {
      console.log(args);

      (this as any).title = args.partname;
      (this as any).profs = args.profs;
      (this as any).drawer = true;
    },
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #409eff;
  /* margin-top: 60px; */
}

.site-body {
  height: calc(100vh - 60px);
}

.el-header {
  padding: 0;
}

.el-aside {
  height: 100%;
}

.content-page {
  width: 100%;
  height: 100%;
}

.content {
  width: 100%;
  height: 100%;
}
</style>
