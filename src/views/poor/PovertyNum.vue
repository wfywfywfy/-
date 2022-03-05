<template>

  <div class="poor">
    <el-row>
      <el-col :span="3">
        <CityTree
          @getCityId="handleGetCityId"
          :cityId="cityId"
        />
      </el-col>
      <el-col :span="21">
        <div>

          <el-table
            :data="tableData"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="poorName"
              label="姓名"
              width="320"
            >
            </el-table-column>
            <el-table-column
              prop="cityName"
              label="市区"
              width="220"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              width="300"
            >
            </el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              width="318"
            >
            </el-table-column>

            <el-table-column
              prop="postCode"
              label="邮编"
              width="320"
            >
            </el-table-column>

          </el-table>

        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { poorStatistics } from '@/api/poor/PovertyNum.js'
import CityTree from '@/components/cityTree'
export default {
  components: {
    CityTree
  },
  data() {
    return {
      tableData: [],
      radio1: '1',
      arr: [],
      obj: {},
      cityId: ''
    }
  },
  created() {
    this.getList()
  },

  watch: {
    // radio1(n, o) {
    //   console.log('radio1', n)
    // },
    cityId(n, o) {
      console.log('poorSituation11', n)
      let cityId = n
      poorSituation({ cityId }).then((response) => {
        if (response.code === 200) {
          this.obj = response.obj
        }
      })
    }
  },
  // updated() {
  //   console.log('poorSituation22', this.cityId)
  //   poorSituation({ cityId: this.cityId }).then((response) => {
  //     if (response.code === 200) {
  //       this.obj = response.obj
  //     }
  //   })
  // }
  methods: {
    getList() {
      poorStatistics({ cityId: this.cityId }).then((response) => {
        if (response.code === 200) {
          console.log('response', response)
          this.tableData = response.obj
          console.log('this.obj', this.tableData)
        }
      })
    },
    handleGetCityId(node) {
      // console.log(city)
      this.cityId = node.cityId
    }
  }
}
</script>

<style lang='scss' scoped>
.title {
  height: 60px;
  line-height: 60px;
  font-size: 24px;
  text-indent: 2rem;
  background-color: aqua;
}
.content,
.details {
  margin-top: 20px;
}

.content .radio .el-radio-button {
  margin-top: 20px;
  margin-right: 20px;
}
.num {
  color: red;
  font-size: 16px;
}
.poor {
  padding: 10px;
}
</style>
