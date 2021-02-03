<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" :inline="true" class="searchForm">
      <el-row>
        <el-col :span="6">
          <el-form-item label="微信昵称" prop="merchantname">
            <el-input
              v-model="queryParams.merchantname"
              placeholder="请输入商家名称"
              clearable
              size="small"
              style="width: 240px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form> -->
    <el-table v-loading="loading" :data="list">
      <el-table-column type="index" width="55" align="center" />
      <el-table-column label="微信昵称" prop="wechatname"  />
      <el-table-column label="手机号" prop="phonenum" />
      <el-table-column label="性别" prop="sex">
        <template slot-scope="scope">
          <span>{{ scope.row.sex=="1"?'男':scope.row.sex=="2"?'女':'未知'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="是否可用" prop="enabled" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.enabled=="0"?'不可用':'可用'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createtime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createtime) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { getList } from "@/api/member";
export default {
  data() {
    return {
      // 总条数
      total: 0,
      // 角色表格数据
      list: [],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      getList(this.queryParams).then(
        response => {
          this.list = response.data.list;
          this.total = response.data.total;
          this.loading = false;
        }
      );
    },
  }
};
</script>