<template>
  <div class="home">
     <el-card>
       <div class="titcard">
   <el-form :inline="true" :model="listQuery" class="searchform">

  <el-form-item label="项目类别">
    <el-input v-model="listQuery.title" placeholder="请输入"  />
  </el-form-item>
   <el-form-item label="实施地点">
    <el-input v-model="listQuery.title" placeholder="请输入"  />
  </el-form-item>
    
</el-form>

<el-row>
  <el-col :span="24"><div class="search">
    <el-button type="primary">查询</el-button>
    </div></el-col>
</el-row>
</div>
</el-card>

<el-table
     border
      :data="tableData"
      style="width: 100%"
      >
        <el-table-column label="项目名称" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="项目类别"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
       <el-table-column label="建设性质"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="实施地点"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="建设任务"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
<el-table-column label="资金规模"  align="center">
<el-table-column label="小计"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      </el-table-column>

      <el-table-column label="筹资方式" align="center">
      <el-table-column label="整合资金"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
       <el-table-column label="其他资金"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
</el-table-column>

<el-table-column label="受益对象" align="center">
      <el-table-column label="贫困户数"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
       <el-table-column label="贫困人口数"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      </el-table-column>
<el-table-column label="绩效目标"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>

<el-table-column label="时间进度" align="center">
      <el-table-column label="计划开工时间"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
       <el-table-column label="计划完工时间"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      </el-table-column>

<el-table-column label="责任单位" align="center">
      <el-table-column label="项目主管单位"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
       <el-table-column label="项目组织实施单位"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      </el-table-column>

      <el-table-column label="群众参与和带贫减贫机制"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
       <el-table-column label="备注"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
export default {
  name: 'Home',
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
  methods: {}
}
</script>
<style lang="scss" scoped>
.titcard {
  display: flex;
  .searchform {
    flex: 1;
  }
}
</style>
