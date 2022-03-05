<template>
  <div class="reporting-guidelines">
    

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
       <el-table-column label="审核层级"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="审核用户"  align="center">
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
  name: 'ReportingGuidelines',
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
</style>
