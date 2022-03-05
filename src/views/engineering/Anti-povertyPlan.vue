<template>
  <div class="content">
    <el-table
    :data="tableData"
    border
    style="width: 100%">

    <el-table-column
      prop="name"
      label="序号"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="计划标题"
      >
    </el-table-column>
    <el-table-column
      prop="province"
      label="附件"
     >
    </el-table-column>
    <el-table-column
      prop="成立时间"
      label="发布人"
     >
    </el-table-column>
    <el-table-column
      prop="address"
      label="发布时间"
    >
    </el-table-column>
     <el-table-column
      prop="address"
      label="上报"
    >
    </el-table-column>
    
    <el-table-column
      
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
 <div class="foot"> <el-pagination
  background
  layout="prev, pager, next"
  :total="1">
</el-pagination></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
          date: '',
          name: '',
          province: '',
          city: '',
          address: '',
          zip: 0
        }]
    };
  },
};
</script>

<style lang='scss' scoped>
.content{
  padding: 32px;
}
.foot{
  text-align: center;
  margin-top: 20px;
}
</style>