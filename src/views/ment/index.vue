<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="list">
      <el-table-column type="index" width="55" align="center" />
      <el-table-column label="姓名" prop="name"  />
      <el-table-column label="手机号" prop="phone" />
      <el-table-column label="状态" prop="state">
        <template slot-scope="scope">
          <span>{{ scope.row.state=="1"?'新增':'已沟通'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="意见" prop="remark" :show-overflow-tooltip="true" />
      <el-table-column label="创建时间" align="center" prop="creattime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.creattime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleDetail(scope.row)"
          >操作</el-button>
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
    <el-dialog
        title="意见"
        :visible.sync="open"
        width="30%"
        :before-close="handleClose">
        <el-input type="textarea" v-model="message" placeholder="请输入意见"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" :loading="btnloading" @click="changeMent">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, updateSettleMent } from "@/api/ment";
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
      open: false,
      btnloading: false,
      message: ''
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
    handleDetail(row){
      this.detail = row;
      this.open = true;
    },
    handleClose(){
        this.open = false;
        this.btnloading=false
        this.message = ''
    },
    changeMent(){
        this.btnloading=true;
        var obj = {...this.detail}
        obj.remark=this.message
        obj.state= '2'
        updateSettleMent(obj).then(res=>{
          this.$message({
            type:'success',
            message:'修改成功'
          })
          this.getList()
          this.handleClose()
        })
    }
  }
};
</script>