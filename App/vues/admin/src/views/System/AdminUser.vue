<template>
  <div>
    <h1 class="header">管理员列表</h1>
    <el-button type="primary" size="default" @click="newAdminUser(null)"
      >添加账号</el-button
    >

    <el-table :data="tableData" border stripe>
      <el-table-column prop="login_name" label="登录名" fixed width="150">
      </el-table-column>
      <el-table-column prop="nick_name" label="昵称" width="150">
      </el-table-column>
      <el-table-column label="头像" width="150">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.avatar"
            fit="fill"
            :lazy="true"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 10">禁止登录</span>
          <span v-else>正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_at" label="创建时间" width="150">
      </el-table-column>
      <el-table-column prop="update_at" label="最后修改时间" width="150">
      </el-table-column>
      <el-table-column prop="create_ip" label="创建IP" width="150">
      </el-table-column>
      <el-table-column prop="update_ip" label="最后修改IP" width="150">
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="newAdminUser(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="paginationChange"
      :current-page="loadParam.page"
      :page-size="loadParam.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="loadParam.total"
    ></el-pagination>
    <el-dialog :title="saveData.title" :visible.sync="saveData.isOpen">
      <el-form :model="saveData.data">
        <el-form-item label="登录名">
          <el-input
            v-model="saveData.data.login_name"
            placeholder="登录名"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input
            v-model="saveData.data.nick_name"
            placeholder="昵称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="saveData.data.passwd"
            placeholder="密码"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="saveData.data.status" placeholder="状态">
            <el-option label="正常" value="0"></el-option>
            <el-option label="禁止登录" value="10"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="saveData.isOpen = false">Cancel</el-button>
        <el-button type="primary" @click="saveAdmin">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadParam: {
        page: 1,
        pageSize: 10,
        isLoad: false,
        total: 0,
      },
      tableData: [],
      saveData: {
        isOpen: false,
        title: "",
        data: {},
      },
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async saveAdmin() {
      const data = await this.$post("/sys/saveAdmin", {
        data: this.saveData.data,
      });
      if (data.code == 200) {
        this.saveData.isOpen = false;
        this.loadData();
        this.$message({
          message: "保存成",
          type: "success",
          showClose: true,
          duration: 3000,
        });
      } else {
        this.$message({
          message: data.msg,
          type: "error",
          showClose: true,
          duration: 3000,
        });
      }
    },
    newAdminUser(data) {
      this.saveData.isOpen = true;
      if (data) {
        this.saveData.title = "修改账号";
        this.saveData.data = {
          id: data.id,
          login_name: data.login_name,
          nick_name: data.nick_name,
          passwd: "",
          status: data.status + "",
        };
      } else {
        this.saveData.title = "新建账号";
        this.saveData.data = {
          login_name: "",
          nick_name: "",
          passwd: "",
          status: "0",
        };
      }
      console.log(data);
    },
    async loadData() {
      if (this.loadParam.isLoad) {
        return;
      }
      this.loadParam.isLoad = true;
      const data = await this.$post("/sys/admins", this.loadParam);
      this.loadParam.isLoad = false;
      if (data.code != 200) {
        this.$message({
          message: data.msg,
          type: "error",
          showClose: true,
          duration: 3000,
        });
      } else {
        this.loadParam.total = data.data.total;
        this.tableData = data.data.list;
      }
    },
    paginationChange(page) {
      this.loadParam.page = page;
      this.loadData();
    },
  },
};
</script>

<style lang="scss" scoped></style>
