<template>
  <div class="money-issue1">
      <el-card>
       <div class="titcard">
  
    <el-button type="primary">增加</el-button>
    </div>

</el-card>
    <el-table
     border
      :data="tableData"
      style="width: 100%"
      >
        <el-table-column label="序号" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="申报指南名称"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
       <el-table-column label="接收单位"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="发放日期"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="发放金额"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="发放人"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="发放状态"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="备注"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      
 <el-table-column label="操作"  align="center" width="300px">
      <el-button type="primary" >详情</el-button>
      <el-button type="primary" >修改</el-button>
      <el-button type="danger" >删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'MoneyIssue1',
  components: {},
  data() {
    return {
      tableData: [
        {
          date: '王先生',
          name: '2233'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.money-issue1 {
  padding: 10px;
  .titcard {
    display: flex;
    justify-content: flex-end;
    .searchform {
      flex: 1;
    }
  }
}
</style>
