<template>
  <div class="headers">
     <div class='add'>
     <el-button type="primary">新增</el-button>
    </div>
     <el-table
     border
      :data="tableData"
      style="width: 100%"
      >
      <el-table-column label="照片" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
       <el-table-column label="帮扶负责人" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="政治面貌" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="帮扶负责人职务" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="帮扶负责人所在单位名称" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="帮扶开始时间" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="帮扶结束时间" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="单位隶属关系" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="单位地址" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
       <el-table-column label="联系电话" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      
     
       <el-table-column label="操作"  align="center">
      <el-button type="primary" size='mini'>编辑</el-button>
      <el-button type="danger" size='mini'>删除</el-button>
      </el-table-column>
      
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'Headers',
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
.headers {
  padding: 10px;
  .add {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
  }
}
</style>
