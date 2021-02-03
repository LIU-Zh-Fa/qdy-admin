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
    <el-row :gutter="8" class="mtb12">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="list">
      <el-table-column type="index" width="55" align="center" />
      <el-table-column label="商家名称" prop="merchantname"  />
      <el-table-column label="商家电话" prop="phonenum" />
      <el-table-column label="所在省市区" prop="sysdistrictname" />>
      <el-table-column label="详细地址" prop="address" />
      <el-table-column label="营业执照号" prop="licensenum" />
      <el-table-column label="经度" prop="longitude" />
      <el-table-column label="纬度" prop="latitude" />
      <el-table-column label="创建时间" prop="createtime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createtime) }}</span>
        </template>
      </el-table-column>
            <el-table-column label="更新时间" prop="createtime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createtime) }}</span>
        </template>
      </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
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
      title="新增"
      :visible.sync="addVisible"
      :close-on-click-modal="false"
      @close="closeFun"
    >
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="商家名称" prop="merchantname">
          <el-input v-model="ruleForm.merchantname"></el-input>
        </el-form-item>
        <el-form-item label="商家电话" prop="phonenum">
          <el-input v-model="ruleForm.phonenum"></el-input>
        </el-form-item>
        <el-form-item label="所在省市区" prop="city">
          <el-cascader
            v-model="ruleForm.province"
            :options="treeArr"
            ref="province"
            :key='n'
            :props="valId"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="商家地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="营业执照号" prop="licensenum">
          <el-input v-model="ruleForm.licensenum"></el-input>
        </el-form-item>
        <el-form-item label="营业执照图片地址" prop="licenseUrl">
          <el-upload
            v-model="ruleForm.licenseUrl"
            class="upload-demo"
            :action="actionList"
            :headers="{'Authorization':tokenList}"
            :on-change="successClick"
            multiple
            :limit="1"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <!-- <el-form-item label="费率" prop="rate">
          <el-input v-model="ruleForm.rate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item> -->
        <el-form-item label="经度" prop="longitude">
          <el-input v-model="ruleForm.longitude"></el-input>
        </el-form-item>
        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="ruleForm.latitude"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible('ruleForm')" :loading="confirmLoad">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList,tree,merchantSave } from "@/api/merchant";
import { getToken } from '@/utils/auth'
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
      addVisible:false,
      confirmLoad:false,
      treeArr:[],
      n:"",
      cityList:[],
      fileList:[],
      valId:{
        value:"id",
        label: 'label',
        children: 'children'
      },
      tokenList:"",
      actionList: '/api/dayin/cc/fileUpload',
      ruleForm: {
        address: "",//详细地址
        latitude: "",//纬度
        licenseUrl: "",//营业执照路径
        licensenum: "",//营业执照号
        longitude: "",//经度
        merchantname: "",//商家名称
        phonenum: "",//手机号
        province:[],//省市区
        },
    };
  },
  created() {
    this.getList();
    tree({}).then(res=>{//级联框数据
      // console.log(res)
      this.treeArr=res.data;
    })
    this.tokenList=getToken('Authorization')
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
    handleChange(value){//级联框
      this.valLabel=this.$refs.province.getCheckedNodes()[0].pathLabels.join('');
      this.valFinally=this.$refs.province.value[0]
    },
    handleAdd(){//新增弹框
      this.addVisible=true;
    },
    dialogVisible(){//新增
      this.confirmLoad=true;
      merchantSave({
        address: this.ruleForm.address,//详细地址
        latitude: this.ruleForm.latitude,//纬度
        licenseUrl: this.successUrl,//营业执照路径
        licensenum: this.ruleForm.licensenum,//营业执照号
        longitude: this.ruleForm.longitude,//经度
        merchantname: this.ruleForm.merchantname,//商家名称
        phonenum: this.ruleForm.phonenum,//手机号
        sysdistrictid: this.valFinally,//省市区
        sysdistrictname: this.valLabel,//省市区名称
      }).then(res=>{
        if(res.code==200){
          this.getList();
          this.addVisible=false;
          this.$message.success('新增成功')
          this.confirmLoad=false;
        }else{
          this.$message.error(res.msg)
        }
      })
      // this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       alert('submit!');
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
    },
    editClick(row){//编辑
    console.log(row)
      this.addVisible=true;
    },
    successClick(file){//上传
      if(file.response){
        this.successUrl=file.response.data.filePath;
      }
    },
    closeFun(){//关闭弹窗回调
      this.successUrl=""
      this.valLabel=""
      this.valFinally=""
      this.fileList=[]
      this.n=Math.random()
      this.$refs.ruleForm.resetFields();
      this.ruleForm={
        address:"",
        latitude:"",
        licenseUrl:"",
        licensenum:"",
        longitude:"",
        merchantname:"",
        phonenum:"",
        province:[],
        licenseUrl:[]
      }
    }
  }
};
</script>