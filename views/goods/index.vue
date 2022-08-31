<template>
  <div>
    <div class="contanierTop">
      <el-input placeholder="请输入内容" v-model="input" clearable> </el-input>
      <el-button type="primary">添加</el-button>
      <el-button type="danger">删除</el-button>
    </div>
    <div class="contanierBottom">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        class="tableContanier"
        @selection-change="handleSelectionChange"
      >
        >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="日期" width="120" align="center">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="allSelection()">全选</el-button>
        <el-button @click="deleteSelection()">取消选择</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "zhuye-user",
  data() {
    return {
      input: "",
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
    };
  },
  methods: {
    allSelection() {
      this.$refs.multipleTable.toggleAllSelection();
    },
    deleteSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
};
</script>

<style scoped>
.contanierTop {
  display: flex;
  margin: 30px auto;
}

button {
  margin: 0 20px;
}
.tableContanier {
  text-align: center;
}
</style>