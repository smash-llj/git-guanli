<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <BgAside></BgAside>
    </el-aside>
    <el-container>
      <el-header>
        <bgHeader></bgHeader>
      </el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import BgAside from "../src/components/BgAside.vue";
import bgHeader from "../src/components/bgHeader.vue";
export default {
  name: "BgHome",
  components: {
    BgAside,
    bgHeader,
  },
};
</script>

<style lang="less">
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}
</style>