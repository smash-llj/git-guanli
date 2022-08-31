<template>
  <div id="logins">
    <h1>欢迎使用后台管理系统</h1>
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      label-width="100px"
      class="loginContainer"
    >
      <h3 class="login-title">登录</h3>
      <el-form-item
        label="账户"
        label-width="80px"
        prop="username"
        class="username"
      >
        <el-input
          type="input"
          v-model="form.username"
          auto-complete="off"
          placeholder="请输入用户名"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        label-width="80px"
        prop="username"
        class="username"
      >
        <el-input
          type="password"
          v-model="form.password"
          auto-complete="off"
          placeholder="请输入密码"
        >
        </el-input>
      </el-form-item>
      <el-form-item class="login">
        <el-button @click="logintop" class="login-btn">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getMenu } from "../../api/data";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        userName: [
          { requiered: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            message: "用户名不能少于三个",
            trigger: "blur",
          },
        ],
        password: [{ requiered: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    logintop() {
      getMenu(this.form).then((res) => {
        if (res.data.code === 20000) {
          console.log(res);
          this.$store.commit("SETTOKEN", res.data.token);
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning({
            message: "请检查账号和密码",
          });
        }
      });
    },
  },
};
</script>

<style  scoped>
#logins {
  background: url("../../src/assets/login.png") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
.loginContainer {
  width: 350px;
  position: relative;
  top: 180px;
  left: calc(50% - 220px);
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;
  border-radius: 15px;
  background-clip: padding-box;
  border: 1px solid #eaeaea;
}
h1 {
  position: relative;

  top: 100px;
  left: 39%;
}
.loginContainer .username .el-form-item__label {
  text-align: center;
}
.login-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login {
  margin: 10px auto 0px auto;
}
.login-btn {
  display: inline-block;
  width: 145px;
  height: 40px;
}
</style>