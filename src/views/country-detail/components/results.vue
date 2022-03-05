<template>
  <div class="results">
    
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
       <el-table-column label="户主姓名" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="人均可支配收入" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="是否危房户" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="饮水是否安全" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="是否有因贫辍学成员" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="收入得分" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
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
  methods: {}
}
</script>
<style lang="scss" scoped>
.results {
  padding: 10px;
}
</style>
