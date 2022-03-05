<template>

  <div class="poor">
    <el-row>
      <el-col :span="3">
        <CityTree @getCityId="handleGetCityId" />
      </el-col>
      <el-col :span="21">
        <div>
          <div class="title">贫困状况</div>
          <div class="content">
            <p>
              {{obj.cityName}} 农村总人口 <span class="num">{{obj.cityFam}}</span> 户<span class="num">{{obj.cityNum}}</span>
              人。
            </p>
            <p>
              贫困人口总数 <span class="num">{{obj.poorFam}}</span>户<span class="num">{{obj.poorNum}}</span>人(一般贫困户 <span class="num">{{obj.poorNormalFam}}</span>户<span class="num">{{obj.poorNormalNum}}</span>
              人；低保户<span class="num">{{obj.poorLowFam}}</span>户<span class="num">{{obj.poorLowNum}}</span>
              人；兜底户<span class="num">{{obj.poorButtomFam}}</span>户<span class="num">{{obj.poorButtomNum}}</span> 人)。
            </p>
            <p>
              其中：已脱贫 <span class="num">{{obj.outPoorFam}}</span>户<span class="num">{{obj.outPoorNum}}</span>
              人 ；未脱贫 <span class="num">3343</span>户<span class="num">7722</span>
              人 。
            </p>
            <p>
              贫困发生率从<span class="num">15.5%</span> 下降至<span class="num">0.62%</span>
              。因病致贫为隆回县贫困人口的主要致贫原因，占贫困人口的<span class="num">56.92%</span>。
            </p>
            <p>隆回县 共有 <span class="num">572</span>个行政村。</p>
          </div>
          <div class="title">精准脱贫十项工程落实情况</div>
          <div class="content">
            <div>
              <el-radio-group
                v-model="radio1"
                class="radio"
              >

                <el-radio-button
                  label="1"
                  border
                >乡村旅游</el-radio-button>
                <el-radio-button
                  label="2"
                  border
                >贫困劳动力</el-radio-button>
                <el-radio-button
                  label="3"
                  border
                > 贫困户劳动力交通补助</el-radio-button>
                <el-radio-button
                  label="4"
                  border
                >易地搬迁</el-radio-button>
                <el-radio-button
                  label="5"
                  border
                >退耕还林</el-radio-button>
                <el-radio-button
                  label="6"
                  border
                >教育发展</el-radio-button>
                <el-radio-button
                  label="7"
                  border
                > 健康扶贫</el-radio-button>
                <el-radio-button
                  label="8"
                  border
                >社会保障兜底</el-radio-button>
                <el-radio-button
                  label="9"
                  border
                > 农办直接帮扶</el-radio-button>
                <el-radio-button
                  label="10"
                  border
                >小额信贷</el-radio-button>
                <el-radio-button
                  label="11"
                  border
                >文化扶贫</el-radio-button>
                <el-radio-button
                  label="12"
                  border
                >科技服务与信息网络扶贫</el-radio-button>
                <el-radio-button
                  label="13"
                  border
                >发展生产</el-radio-button>
                <el-radio-button
                  label="14"
                  border
                >饮水安全</el-radio-button>
                <el-radio-button
                  label="15"
                  border
                >危房改造雨露计划</el-radio-button>

              </el-radio-group>
              <div class="details">隆回县乡村旅游受益户数：1031</div>

            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import { poorSituation } from '@/api/helpPoorHouseholds'
import CityTree from '@/components/cityTree'
export default {
  components: {
    CityTree
  },
  data() {
    return {
      radio1: '1',
      arr: [],
      obj: {},
      cityId: ''
    }
  },
  created() {
    // console.log('poorSituation', this.cityId)
    poorSituation({ cityId: this.cityId }).then((response) => {
      console.log('response', response)
      if (response.code === 200) {
        this.obj = response.obj
        console.log('this.obj', this.obj)
      }
    })
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
    handleGetCityId(city) {
      // console.log(city)
      this.cityId = city
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
