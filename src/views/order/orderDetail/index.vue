<template>
  <div class="app-container">
      <div class="baseInfo">
          <el-row>
              <el-col :span="12"><span>订单号：</span>{{orderId}}</el-col>
              <el-col :span="12"><span>用户昵称：</span>{{userName}}</el-col>
          </el-row>
      </div>
      <div class="fileList">
          
      </div>
  </div>
</template>

<script>
import { orderDetail } from "@/api/orderList";
export default {
  name: "orderdetail",
  data() {
    return {
        id: '',
        orderId: '',
        userName: ''
    };
  },
  created() {
    this.id = this.$route.params.id;
    orderDetail({orderId: this.id}).then(res=>{
        this.orderId = res.data.SysOrder.id;
        this.userName = res.data.SysOrder.username
    })
  },
  methods: {

  }
};
</script>
<style lang="scss" scoped>
.baseInfo{
    padding: 20px;
    font-size: 16px;
    color: rgba(0,0,0,0.45);
    span{
        color: rgba(0,0,0,0.85);
    }
}

</style>