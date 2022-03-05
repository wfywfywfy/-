<template>
  <div class="monitoring-standard">
    <el-table
      border
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        label="类别"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{row.date}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="项目"
        align="center"
      >
        <template slot-scope="{row}">
          <span>{{row.name}}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="预警指标"
        align="center"
      >
        <el-table-column
          label="一级预警"
          align="center"
        >
          <el-table-column
            label="已脱贫户(含脱贫不稳定户)"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="一般农户(含边缘易致贫户)"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{row.name}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="二级预警"
          align="center"
        >
          <el-table-column
            label="已脱贫户(含脱贫不稳定户)"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="一般农户(含边缘易致贫户)"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{row.name}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="三级预警"
          align="center"
        >
          <el-table-column
            label="已脱贫户(含脱贫不稳定户)"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="一般农户(含边缘易致贫户)"
            align="center"
          >
            <template slot-scope="{row}">
              <span>{{row.name}}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'MonitoringStandard',
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
