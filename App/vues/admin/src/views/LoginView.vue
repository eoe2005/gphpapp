<template>
  <div class="login">
    <div class="form">
      <h1>欢迎回来</h1>
      <input
        v-model="reqData.login_name"
        type="text"
        placeholder="请输入账号"
      />
      <input v-model="reqData.pass" type="password" placeholder="请输入密码" />
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reqData: {
        login_name: "",
        pass: "",
      },
    };
  },
  mounted() {
    // const data = { scope: "rwerrwer", deadline: 1721123605 };
    // base64.encode();
    // this.$CryptoJS.HmacSHA1();
    if (this.$store.state.admin_id > 0) {
      this.$router.replace("/");
    }
  },
  methods: {
    async login() {
      if (this.reqData.login_name == "") {
        this.$message("请输入登录用户名");
        return;
      } else if (this.reqData.passwd == "") {
        this.$message("请输入密码");
        return;
      }
      const data = await this.$post("/index/login", this.reqData);
      if (data.code == 200) {
        console.log(data);
        this.$store.commit("setUserInfo", data.data);
        sessionStorage.setItem("store", JSON.stringify(data.data));
        this.$router.replace("/");
      } else {
        this.$message(data.msg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  padding-top: 20vh;
  background-image: linear-gradient(to bottom, #666, #444);
  .form {
    width: 400px;
    margin: 0px auto;
    background-color: #333;
    text-align: center;
    padding: 1rem;
    color: #fff;
    input {
      display: block;
      width: 300px;
      margin: 0.5rem auto;
      line-height: 2.5rem;
      height: 2.5rem;
      padding-left: 0.5rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      outline: none;
    }
    button {
      display: block;
      display: block;
      width: 200px;
      line-height: 3rem;
      height: 3rem;
      border-radius: 1rem;
      margin: 0.5rem auto;
      font-size: 1.2rem;
    }
  }
}
</style>
