<template>
  <div>
    <h1 class="header">修改密码</h1>
    <el-form :model="postData" ref="form" :inline="false" size="normal">
      <el-form-item label="旧密码">
        <el-input
          type="password"
          v-model="postData.old"
          placeholder="旧密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input
          type="password"
          v-model="postData.pass"
          placeholder="新密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input
          type="password"
          v-model="postData.cirformpass"
          placeholder="确认密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postData: {
        old: "",
        pass: "",
        cirformpass: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      if (this.postData.old.length < 6) {
        this.$message({
          message: "请输入旧密码",
          type: "error",
          showClose: true,
          duration: 3000,
        });
        return;
      }
      if (this.postData.pass.length < 6) {
        this.$message({
          message: "请输入新密码",
          type: "error",
          showClose: true,
          duration: 3000,
        });
        return;
      }
      if (this.postData.pass != this.postData.cirformpass) {
        this.$message({
          message: "两次输入的密码不一致",
          type: "error",
          showClose: true,
          duration: 3000,
        });

        return;
      }
      const data = await this.$post("/sys/changePass", this.postData);
      if (data.code != 200) {
        this.$message({
          message: data.msg,
          type: "error",
          showClose: true,
          duration: 3000,
        });
      } else {
        this.$message({
          message: "修改成功",
          type: "success",
          showClose: true,
          duration: 3000,
        });
        this.postData = { old: "", pass: "", cirformpass: "" };
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
