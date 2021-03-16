<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" class="searchForm">
      <el-row>
        <el-col :span="6">
          <el-form-item label="商家名称" prop="merchantname">
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
        <el-col :span="6">
          <el-form-item label="订单时间" prop="createtime">
             <el-date-picker
                v-model="queryParams.createtime"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择订单时间">
              </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table v-loading="loading" :data="list">
      <el-table-column type="index" width="55" align="center" />
      <el-table-column label="订单号" prop="ordernum"  />
      <el-table-column label="商家名称" prop="sysmerchantname" />
      <el-table-column label="下单时间" prop="creatdate" />
      <el-table-column label="姓名" prop="username" :show-overflow-tooltip="true" />
      <el-table-column label="联系电话" prop="phonenum" :show-overflow-tooltip="true" />
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          {{ (statusOptions.filter(item=>item.value == scope.row.state)[0] || {label:''}).label}}
        </template>
      </el-table-column>
      <el-table-column label="文件总数" prop="totalsum" />
      <el-table-column label="取件时间" align="center" prop="updatetime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updatetime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" prop="amount" />
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-show="scope.row.state == 1"
            type="text"
            icon="el-icon-printer"
            @click="handleDetail(scope.row,'down')"
          >去打印</el-button>
          <el-button
            size="mini"
            v-show="scope.row.state == 2"
            type="text"
            icon="el-icon-view"
            @click="goDetail(scope.row.id)"
          >查看详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <el-dialog
        title="请输入取件码"
        :visible.sync="open"
        width="30%"
        :before-close="handleClose">
        <el-input v-model="pickCode" placeholder="请输入取件码"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" :loading="btnloading" @click="checkPickCode">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, checkPickCode } from "@/api/orderList";
import { statusOptions } from './constants/index'
export default {
  name: "orderlist",
  data() {
    return {
      btnloading: false,
      statusOptions,
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 角色表格数据
      list: [],
      // 是否显示弹出层
      open: false,
      pickCode: '',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        merchantname: '',
        createtime: ''
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询角色列表 */
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
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    handleDetail(row,type){
        this.open = true;
        this.detailId = row.id
    },
    checkPickCode(){
        this.btnloading=true
        checkPickCode({orderId: this.detailId, pickCode:this.pickCode}).then(res=>{
            this.btnloading=false
            if(res.code == 200){
                this.goDetail(this.detailId)
            }else{
                this.$message({
                    type: 'error',
                    message: '验证码错误'
                })
                return
            }
        }).catch(e=>{
            this.btnloading=false
        })
    },
    goDetail(id){
        this.$router.push({path:'/order/detail/'+id})
    },
    handleClose(){
        this.open = false;
        this.btnloading=false
        this.pickCode = ''
    }
  }
};
</script>