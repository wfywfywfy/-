<template>
  <div class="home">
    <div class='mcon'>
      <div class="mtitle" :style='mstyle'>
        <span>
    {{title}}
    </span>
    </div>
     <el-table
     border
      :data="data"
      style="width: 100%"
      >
      <el-table-column label="人数" width="100" align="center">
      <template slot-scope="{row}">
       <span>{{row.Fam}}</span>
      </template>
      </el-table-column>
      <el-table-column label="户数" width="100" align="center">
      <template slot-scope="{row}">
       <span>{{row.Num}}</span>
      </template>
      </el-table-column>
      <template v-if='Standard'>
       <el-table-column label="户达标率" width="100" align="center">
      <template slot-scope="{row}">
       <span>{{row.address}}</span>
      </template>
      </el-table-column>
      </template>
      <template v-if='NoStandard'>
      <el-table-column label="户未达标率" width="100" align="center">
      <template slot-scope="{row}">
       <span>{{row.address}}</span>
      </template>
      </el-table-column>
      </template>
    </el-table>
  </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  components: {},
  props: {
    title: {
      type: String,
      default: '全部'
    },
    mstyle: {
      type: Object,
      default: function () {
        return {}
      }
    },
		data:{
			type: Object,
			default: function () {
			  return {}
			}
		}
  },
  data() {
    return {
     
    }
  },
  computed: {
    NoStandard() {
      return this.title === '未达标'
    },
    Standard() {
      return this.title === '达标'
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.mcon {
  display: flex;
  margin-right: 10px;
  .mtitle {
    width: 40px;
    position: relative;
    line-height: 20px;
    span {
      font-size: 16px;
      width: 1px;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 30%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>
