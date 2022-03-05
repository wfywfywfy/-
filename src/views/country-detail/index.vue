<template>
  <div class="country-detail">
    <el-row>
  <el-col :span="24">
    <div class="toptitle">
当前位置：扶贫对象 > 详细信息
    </div>
    <div>
<el-collapse v-model="activeNames1">
  <el-collapse-item>
    <template slot="title" >
      展开
    </template>
    <el-card class="box-card">
     <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
</el-card>
 
  </el-collapse-item>
</el-collapse>
      </div>
      <div style="margin-top:20px;">
  <el-radio-group v-model="radio1">
    <el-radio-button label="family">家庭成员</el-radio-button>
      <el-radio-button label="life">生产生活条件</el-radio-button>
      <el-radio-button label="headers">帮扶负责人</el-radio-button>
      <el-radio-button label="measures">帮扶措施</el-radio-button>
      <el-radio-button label="record">走访记录</el-radio-button>
      <el-radio-button label="results">帮扶成效</el-radio-button>
    </el-radio-group>
    </div>
    <component v-bind:is="currentTabComponent"></component>
    </el-col>
</el-row>
  </div>
</template>
<script>
import family from './components/family'
import life from './components/life'
import headers from './components/headers'
import record from './components/record'
import results from './components/results'
import measures from './components/measures'

export default {
  name: 'Home',
  components: {
    family,
    life,
    headers,
    record,
    results,
    measures
  },
  data() {
    return {
      activeNames1: '',

      radio1: 'family'
    }
  },
  computed: {
    currentTabComponent() {
      return this.radio1
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.country-detail {
  padding: 10px;
  .toptitle {
    margin: 10px 0px;
  }
  .el-collapse-item__heade {
    display: block !important;
    text-align: center !important;
  }
}
</style>
