<template>
  <div class="measures">
    
    <el-tabs v-model="activeName2" @tab-click="handleClick">
    <el-tab-pane label="乡村旅游脱贫工程" name="first">
      <div class='add'>
     <el-button type="primary">新增</el-button>
    </div>
     <el-table
     border
      :data="tableData"
      style="width: 100%"
      >
      <el-table-column label="发放年度" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
       <el-table-column label="带动乡村旅游扶贫的旅游企业或合作社" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="发放金额" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="备注" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
     
       <el-table-column label="操作"  align="center">
      <el-button type="primary" size='mini'>编辑</el-button>
      <el-button type="danger" size='mini'>删除</el-button>
      </el-table-column>
      
    </el-table>
      </el-tab-pane>
    <el-tab-pane label="转移就业脱贫工程" name="second">转移就业脱贫工程</el-tab-pane>
    <el-tab-pane label="易地搬迁脱贫工程" name="third">
     易地搬迁脱贫工程
    </el-tab-pane>
    <el-tab-pane label="生态补偿脱贫工程" name="fourth">生态补偿脱贫工程</el-tab-pane>
     <el-tab-pane label="教育发展脱贫工程" name="five">教育发展脱贫工程</el-tab-pane>
     <el-tab-pane label="医疗救助脱贫工程" name="six">医疗救助脱贫工程</el-tab-pane>



     <el-tab-pane label="社会保障兜底工程" name="seven">
     社会保障兜底工程
      </el-tab-pane>
    <el-tab-pane label="直接帮扶信息工程" name="eight">直接帮扶信息工程</el-tab-pane>
    <el-tab-pane label="金融扶贫工程" name="nine">
     金融扶贫工程
    </el-tab-pane>
    <el-tab-pane label="文化扶贫户户通工程" name="ten">文化扶贫户户通工程</el-tab-pane>
     <el-tab-pane label="科技服务与信息网络扶贫工程" name="eleven">科技服务与信息网络扶贫工程</el-tab-pane>
     <el-tab-pane label="发展生产脱贫工程" name="twelve">发展生产脱贫工程</el-tab-pane>
       <el-tab-pane label="水利扶贫工程" name="thirteen">水利扶贫工程</el-tab-pane>
     <el-tab-pane label="危房改造工程" name="fourteen">危房改造工程</el-tab-pane>
     <el-tab-pane label="雨露计划" name="fifteen">雨露计划</el-tab-pane>
  </el-tabs>
  
  </div>
</template>
<script>
export default {
  name: 'Measures',
  components: {},
  data() {
    return {
      activeName2: 'first',
      tableData: [
        {
          date: '王先生',
          name: '男'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClick() {}
  }
}
</script>
<style lang="scss" scoped>
.measures {
  padding: 10px;
  .add {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
  }
}
</style>
