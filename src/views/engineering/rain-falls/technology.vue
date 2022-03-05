<template>
  <div class="technology">
    <el-card class="titcard">
   <el-form :inline="true" :model="listQuery" class="demo-form-inline">
 
  <el-form-item label="乡镇">
    <el-select v-model="listQuery.region" placeholder="请选择">
      <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="村委">
    <el-select v-model="listQuery.region" placeholder="请选择">
      <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
    <el-button type="primary" @click="onSubmit">导出数据</el-button>
  </el-form-item>
    <el-form-item>
   <span class="msp">全部数据2014</span>
  </el-form-item>
</el-form>
<el-row>
  <el-col :span="24"><div class="technologytit">
    科技骨干培训班——本次已采集9户
    </div></el-col>
</el-row>
</el-card>

 <el-table
     border
      :data="tableData"
      style="width: 100%"
      >
      <el-table-column label="科技骨干培训班" align="center">
        <el-table-column label="序号" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="乡镇"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="行政村"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
       <el-table-column label="户主姓名"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="户主证件号码"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
       <el-table-column label="姓名"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="身份证号码"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
       <el-table-column label="年龄"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="民族"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
       <el-table-column label="在校生状况"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="联系地址"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
       <el-table-column label="联系电话"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="培训学校"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="专业"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="结业证号"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="期数"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="补助金额"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      <el-table-column label="年份"  align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
      
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'Technology',
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
      importanceOptions: [1, 2, 3],
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
    onSubmit() {}
  }
}
</script>
<style lang="scss" scoped>
.technology {
  padding: 10px;
  .titcard {
    margin-bottom: 20px;
  }
  .msp {
    font-size: 16px;
    color: darkblue;
  }
  .technologytit {
    text-align: center;
  }
}
</style>
