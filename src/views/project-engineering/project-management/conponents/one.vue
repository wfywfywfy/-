<template>
  <div class="reporting-guidelines">
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
       <el-table-column label="项目负责单位"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="项目资金"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="项目覆盖范围"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="附件"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="发布人"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="发布时间"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="项目状态"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="审批流程"  align="center">
      <template slot-scope="{row}">
      
       <el-button type="primary" @click="gotodetail" size="mini">审批流程</el-button>
      </template>
      </el-table-column>
 <el-table-column label="操作"  align="center" width="200">
      <el-button type="primary" >详情</el-button>
      <el-button type="danger" >删除</el-button>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
export default {
  name: 'ReportingGuidelines',
  components: {},
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
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
  methods: {
    gotodetail() {
      this.$router.push({
        path: '/project-engineering/project-management/reporting-guidelines',
        query: { orderId: '1' }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.titcard {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  .searchform {
    flex: 1;
  }
}
</style>
