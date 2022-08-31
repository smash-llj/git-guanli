<template>
  <header>
    <div class="l">
      <el-button
        plain
        icon="el-icon-menu"
        class="btn"
        @click="isShowState"
      ></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          class="ft"
          style="color: aliceblue"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r">
      <el-dropdown trigger="click" szie="mini">
        <span>
          <img src="../../src/assets/user.jpg" class="personalImg" />
        </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心 </el-dropdown-item>
          <el-dropdown-item @click.native="exitLogin">退出 </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "bgHeader",
  methods: {
    isShowState() {
      this.$store.commit("QIEHUAN");
    },
    exitLogin() {
      console.log(this);
      this.$store.commit("CLEARTOKEN");
      this.$router.push({ name: "login" });
    },
  },
  computed: {
    ...mapState({ tags: (state) => state.showTab.tabList }),
    // tags() {
    //   return this.$store.state.showTab.tabList;
    // },
  },
};
</script>

<style scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.l {
  display: flex;
  align-items: center;
}
header .btn {
  margin-right: 20px;
}

.personalImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>