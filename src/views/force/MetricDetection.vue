<template>
  <div>

    <div class="poor">
      <el-row>
        <el-col :span="3">
          <CityTree @getCityId="handleGetCityId" />
        </el-col>
        <el-col :span="21">
          <div class="titcon">
            <div class="titleft">
              <span>当前位置:</span>
              <span>项目指标监测</span>
            </div>
            <div class="titright">
              <el-button type="primary">添加</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
import CityTree from '@/components/cityTree'
export default {
  components: {
    CityTree
  },
  data() {
    return {
      cityId: ''
    }
  },
  methods: {
    handleGetCityId(city) {
      // console.log(city)
      this.cityId = city
    }
  }
}
</script>

<style lang='scss' scoped>
.titcon {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .titleft {
    flex: 1;
  }
}
</style>