<template>
  <div class="mange">
    <el-dialog
      :title="showType === 'add' ? '添加用户' : '更新用户'"
      :visible.sync="isTypeShow"
      class="dk"
    >
      <bgForm
        :formLabel="opertateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      >
      </bgForm>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isTypeShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>

    <div class="mange-header">
      <el-button type="primary" @click="adduser">新增</el-button>
      <bgForm
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </bgForm>
    </div>
    <bgTable
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    ></bgTable>
  </div>
</template>

<script>
import bgForm from "../../src/components/bgFrom.vue";
import bgTable from "../../src/components/bgTable.vue";
import { getUser } from "../../api/data";

export default {
  name: "zhuye-goods",
  components: { bgForm, bgTable },
  data() {
    return {
      showType: "add",
      isTypeShow: false,
      tableData: [],
      tableLabel: [
        { prop: "name", label: "姓名" },
        { prop: "age", label: "年龄" },
        { prop: "sexLabel", label: "性别" },
        { prop: "birth", label: "出生日期", width: 320 },
        { prop: "addr", label: "地址", width: 320 },
      ],
      config: {
        page: 1,
        total: 30,
        loading: false,
      },
      opertateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
    };
  },
  methods: {
    adduser() {
      (this.isTypeShow = true),
        (this.showType = "add"),
        (this.operateForm = {
          name: "",
          addr: "",
          age: "",
          birth: "",
          sex: "",
        });
    },
    confirm() {
      if (this.showType === "edit") {
        this.$http.post("user/edit", this.operateForm).then((res) => {
          //点击确认的时候关闭弹窗
          this.isTypeShow = false;
          console.log(res);
          this.getList();
        });
      } else {
        this.$http.post("user/add", this.operateForm).then((res) => {
          //点击确认的时候关闭弹窗
          this.isTypeShow = false;
          console.log(res);
          this.getList();
        });
      }
    },
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      //输入完判断后对搜索框清空
      this.searchForm.keyword = "";
      //接收来自bgTable的数据，并更新到this.config.page
      this.$bus.$on("hello", (x) => {
        this.config.page = x;
      });
      getUser({
        page: this.config.page,
        name,
      }).then((res) => {
        console.log(res);
        this.tableData = res.data.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.data.count;
        this.config.loading = false;
      });
    },
    editUser(row) {
      this.showType = "edit";
      this.isTypeShow = true;
      this.operateForm = row;
      console.log(row);
    },
    delUser(row) {
      console.log(this);
      this.$confirm("此操作将删除文件，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .get("/user/del", {
            params: { id },
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          });
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
.mange-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>