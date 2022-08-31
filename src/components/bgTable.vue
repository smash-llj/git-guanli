<template>
  <div class="bgTable">
    <el-table :data="tableData" height="70vh" stripe>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 125"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }} </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handelEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handelDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      layout="prev ,pager, next"
      :total="config.total"
      :current-page-sync="config.page"
      @current-change="updatePage"
      :page-size="20"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "bgTable",
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  methods: {
    handelEdit(row) {
      this.$emit("edit", row);
      console.log("11111" + row);
    },
    handelDelete(row) {
      this.$emit("del", row);
    },
    updatePage(page) {
      //这里利用全局事件总线把点击的page传给user组件
      this.$bus.$emit("hello", page);
      this.$emit("changePage");
    },
  },
};
</script>

<style scoped >
.bgTable {
  background-color: #fff;
  position: relative;
}
.pager {
  display: inline-block;
  margin-top: 20px;
  position: relative;
  bottom: 0px;
  left: 415px;
}
</style>