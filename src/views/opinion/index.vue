<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="list">
      <el-table-column type="index" width="55" align="center" />
      <el-table-column label="微信昵称" prop="wechantname"  />
      <el-table-column label="问题和意见" prop="opinion"  />
      <el-table-column label="联系方式" prop="phone" />
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
            icon="el-icon-view"
            @click="handleDetail(scope.row)"
          >查看</el-button>
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
        title="详情"
        :visible.sync="open"
        width="30%"
        :before-close="handleClose">
        <div><span class="tit">昵称：</span>123</div>
        <div><span class="tit">问题和意见：</span>123</div>
        <div><span class="tit">创建时间：</span>123</div>
        <div class="pic">
          <img src="">
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from "@/api/opinion";
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