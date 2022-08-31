<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isShowTab"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3 v-if="isShowTab">后台</h3>
    <h3 v-else>通用管理系统</h3>
    <el-menu-item
      v-for="item in NoChildren"
      :index="item.path"
      :key="item.path"
      @click="showLink(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in HasChildren" :index="item.path" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(childrenItem, Index) in item.children"
        :key="childrenItem.path"
      >
        <el-menu-item :index="Index.toString()">{{
          childrenItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: "BgAside",
  data() {
    return {
      menu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
          url: "UserManage/UserManage",
        },
        {
          path: "/goods",
          name: "goods",
          label: "商品管理",
          icon: "video-play",
          url: "MallManage/MallManage",
        },

        {
          path: "/other",
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
              url: "Other/pageOne",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
              url: "Other/pageTwo",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    showLink(item) {
      this.$router.push({
        name: item.name,
      });
      this.$store.commit("TABSHOW", item);
    },
  },
  computed: {
    NoChildren() {
      return this.menu.filter((item) => !item.children);
    },
    HasChildren() {
      return this.menu.filter((item) => item.children);
    },
    isShowTab() {
      return this.$store.state.showTab.isShow;
    },
  },
};
</script>


<style scoped lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>

