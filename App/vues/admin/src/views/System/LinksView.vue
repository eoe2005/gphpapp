<template>
  <div>
    <h1 class="header">友情链接管理</h1>
    <el-tabs
      v-model="loadParam.type"
      type="card"
      tab-position="top"
      @tab-click="selectTab"
    >
      <el-tab-pane label="全部" name="0"> </el-tab-pane>
      <el-tab-pane
        v-for="(item, k) in tabs.tabnames"
        :key="k"
        :label="item.name"
        :name="item.id"
      >
        <el-button type="primary" size="default" @click="newLink(item.id, null)"
          >添加链接</el-button
        >
      </el-tab-pane>
    </el-tabs>

    <el-table :data="tableData" border stripe>
      <el-table-column prop="name" label="名称" width="150" fixed>
      </el-table-column>
      <el-table-column label="类型" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.target_type == 10">Web</span>
          <span v-else-if="scope.row.is_show == 20">Android</span>
          <span v-else>Ios</span>
        </template>
      </el-table-column>
      <el-table-column label="图片" width="150">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.img"
            fit="fill"
            :lazy="true"
          ></el-image>
        </template> </el-table-column
      >is_show
      <el-table-column label="链接" width="150">
        <template slot-scope="scope">
          <a :href="scope.row.links" target="_blank">{{ scope.row.name }}</a>
        </template>
      </el-table-column>
      <el-table-column label="类型" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.is_show == 1">显示</span>
          <span v-else>不显示</span>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="描述" width="150">
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
            @click="newLink(scope.row.target_type, scope.row)"
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
        <el-form-item label="名称">
          <el-input
            v-model="saveData.data.name"
            placeholder="名称"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-input
            v-model="saveData.data.img"
            placeholder="图片"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input
            v-model="saveData.data.links"
            placeholder="链接地址"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="saveData.data.content"
            placeholder="描述"
            type="textarea"
            :rows="2"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-select v-model="saveData.data.is_show" placeholder="是否显示">
            <el-option label="显示" value="1"></el-option>
            <el-option label="不显示" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="saveData.isOpen = false">Cancel</el-button>
        <el-button type="primary" @click="savelink">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loadParam: {
        type: 0,
        page: 1,
        pageSize: 10,
        isLoad: false,
        total: 0,
      },
      tableData: [],

      tabs: {
        tabnames: [],
      },
      saveData: {
        isOpen: false,
        isLoad: false,
        data: {},
      },
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async savelink() {
      if (this.saveData.isLoad) {
        return;
      }
      this.saveData.isLoad = true;
      const data = await this.$post("/sys/saveLink", {
        data: this.saveData.data,
      });
      this.saveData.isLoad = false;
      if (data.code == 200) {
        this.loadData();
        this.saveData.isOpen = false;
        this.$message({
          message: "保存成功",
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
    newLink(type, data) {
      this.saveData.isOpen = true;
      if (data) {
        this.saveData.data = {
          id: data.id,
          target_type: type,
          name: data.name,
          img: data.img,
          links: data.links,
          content: data.content,
          is_show: data.is_show + "",
        };
      } else {
        this.saveData.data = {
          target_type: type,
          name: "",
          img: "",
          links: "",
          content: "",
          is_show: "1",
        };
      }
    },
    selectTab() {
      this.loadData();
    },
    async loadData() {
      if (this.loadParam.isLoad) {
        return;
      }
      this.loadParam.isLoad = true;
      const data = await this.$post("/sys/links", this.loadParam);
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
        this.tabs.tabnames = data.data.target_types;
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
