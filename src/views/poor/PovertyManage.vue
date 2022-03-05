<template>

  <div class="poor">
    <el-row>
      <!-- <el-col :span="3">
        <CityTree @getCityId="handleGetCityId" />
      </el-col> -->
      <el-col :span="21">
        <div class="wrap">
          <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
          >
            <el-tab-pane
              label="帮扶单位管理"
              name="first"
            ></el-tab-pane>
            <el-tab-pane
              label="结对贫困村管理"
              name="second"
            ></el-tab-pane>
            <!-- <el-tab-pane
              label="帮付费主题信息"
              name="third"
            ></el-tab-pane>
            <el-tab-pane
              label="十项工程责任单位"
              name="fourth"
            ></el-tab-pane> -->
          </el-tabs>
          <el-table
            :data="list"
            border
            v-loading="listLoading"
            style="width: 100%"
          >
            <el-table-column
              prop="teamname"
              label="帮扶单位"
              width="180"
            >

            </el-table-column>
            <el-table-column
              prop="employeename"
              label="工作队员"
            >
            </el-table-column>
            <el-table-column
              prop="cityname"
              label="结对乡镇"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="villagename"
              label="结对贫困村"
            >
            </el-table-column>
            <el-table-column
              prop="partyname"
              label="第一书记"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="联系电话"
            >
            </el-table-column>

            <el-table-column
              prop="tel"
              label="联系电话"
            >
            </el-table-column>

          </el-table>

          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize"
            @pagination="getList"
          />
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { helpList } from '@/api/poor/PovertyManage'
import CityTree from '@/components/cityTree'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  components: {
    CityTree,
    Pagination
  },
  data() {
    return {
      cityname: '测试',
      listLoading: true,
      cityId: '',
      activeName: 'second',
      listQuery: {
        currentPage: 1,
        pageSize: 10
      },
      list: [],
      total: 0
    }
  },
  watch: {
    cityId(n, o) {
      console.log('poorSituation', n)
    }
  },
  created() {
    if (window.innerWidth < 700) {
      this.labelPosition = 'top'
    }

    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const params = Object.assign(
        {},
        {
          cityname: this.cityname,
          current: this.listQuery.currentPage,
          size: this.listQuery.pageSize
        }
      )

      helpList(params).then((res) => {
        this.listLoading = false
        if (res.code === 200) {
          const cc = [...res.obj]
          console.log('cc', cc)
          const total = cc.pop()
          const size = cc.pop()
          this.list = cc
          this.total = total.count
          this.listQuery.currentPage = size.current
          this.listQuery.pageSize = size.size
          console.log('this.listQuery', this.listQuery)
        }
      })
    },
    handleGetCityId(city) {
      // console.log(city)
      this.cityId = city
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang='scss' scoped>
.wrap {
  margin: 20px 0 0 20px;
}
.poor {
  padding: 10px;
}
</style>
