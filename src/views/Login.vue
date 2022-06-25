<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="from"
    lael-width="100px"
    class="login-contain"
  >
    <h3 class="login_title">系统登入</h3>
    <el-form-item
      label="用户名"
      label-witdh="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        autocomplete="off"
        placeholder="请输入账号"
      >
      </el-input>
    </el-form-item>
    <el-form-item
      label="密码"
      label-witdh="80px"
      prop="password"
      class="password"
    >
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="请输入密码"
      >
      </el-input>
    </el-form-item>
    <el-form-item class="login_submit">
      <el-button type="primary" @click="login" class="login_submit"
        >登入</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
//import Mock from 'mockjs'
import { getMenu } from "../api/data";
export default {
  name: "LoginItem",
  data() {
    return {
      form: {},
      rules: {
        username: [
          { require: true, massage: "请输入用户名", trigger: "blur" },
          { min: 3, massage: "用户名长度不能小于三位", trigger: "blur" },
        ],
        password: [{ require: true, massage: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      getMenu(this.form).then(({ data: res }) => {
        console.log(res);
        if (res.code === 20000) {
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("addMenu", this.$router);
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning(res.data.massage);
        }
      });
      //const token = 121
      //this.$store.commit('setToken',token)
      //console.log(token);
      //this.$router.push({name:'home'})
    },
  },
};
</script>

<style lang="less" scoped>
.login-contain {
  width: 500px;
  margin: 0px auto;
  background: #fff;
  box-shadow: 0 0 25px #cac6c6;
  border-radius: 15px;
  height: 350px;
  margin-top: 100px;
  h3 {
    text-align: center;
    font-weight: 100;
    padding-top: 50px;
  }
  .username {
    width: 200px;
    margin: 0px auto;
  }
  .password {
    width: 200px;
    margin: 0px auto;
  }
  .login_submit {
    margin: 10px auto;
    width: 70px;
  }
}
</style>