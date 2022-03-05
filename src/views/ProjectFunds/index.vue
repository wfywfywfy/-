<template>
  <div class="wrap">
    <div class="head">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="项目类别">
        <el-input v-model="formInline.user" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="活动地点">
        <el-input v-model="formInline.region" placeholder=""></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    </div>
    <!-- <div class="from">
      <el-table
      :data="tableData"
      :span-method="arraySpanMethod"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
       
        label="数值 1">
      </el-table-column>
      <el-table-column
        prop="amount2"
       
        label="数值 2">
      </el-table-column>
      <el-table-column
        prop="amount3"
        
        label="数值 3">
      </el-table-column>
    </el-table>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
       tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15
        }],
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang='scss' scoped>
.head{
  
}
.wrap{
  padding: 32px;
}
</style>
