<template>
  <div class="conty">
     <el-row>
  <el-col :span="3">
   <CityTree @getCityId="handleGetCityId" />
    </el-col>
    <el-col :span="21">
    <div class="mtopcon">
    <mtop :mstyle="{background: '#3b8ce5'}" :data='totalD'></mtop>
    <mtop :mstyle="{background: '#54cb54'}"  :data = 'achieveD' title='达标'></mtop>
    <mtop :mstyle="{background: 'red'}"  :data = 'unachieveD' title='未达标'></mtop>
  </div>
  <el-row>
  <el-col :span="24">
    <div class="seat">
<div class="seat1">
    <div class="current">
      当前位子:北山镇
    </div>
    <div class="warning">
<img src="" alt="#">
<i>预警线</i>
    </div>
    <div class="rules">
<img src="" alt="#">
<i>指标规则</i>
    </div>
</div>
    <div class="years">2019</div>
    </div>
    </el-col>
</el-row>

 <el-table
     border
      :data="tableData"
      style="width: 100%"
      ref="table"
      >


      <el-table-column label="序号" width="100" align="center">
      <template slot-scope="{row}">
       <span>{{row.date}}</span>
      </template>
      </el-table-column>
      <el-table-column label="户主姓名" align="center">
      <template slot-scope="{row}">
       <span>{{row.poorName}}</span>
      </template>
      </el-table-column>

       <el-table-column label="贫困户属性" align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
       <el-table-column label="主要致贫原因" align="center">
      <template slot-scope="{row}">
       <span>{{row.poorReason}}</span>
      </template>
      </el-table-column>
       <el-table-column label="贫困户所在地" align="center">
      <template slot-scope="{row}">
       <span>{{row.cityName}}</span>
      </template>
      </el-table-column>
       <el-table-column label="收入得分" align="center">
      <template slot-scope="{row}">
       <span>{{row.incomeScore}}</span>
      </template>
      </el-table-column>
       <el-table-column label="两不愁三保障" align="center">
      <template slot-scope="{row}">
       <span>{{row.name}}</span>
      </template>
      </el-table-column>
       <el-table-column label="查看" align="center">
      <template slot-scope="{row}">
       <span @click="detail">查看详情</span>
      </template>
      </el-table-column>
       <el-table-column label="操作" align="center">
      <template slot-scope="scope">
                    <span v-if='scope.row.show' @click="toogleExpand(scope.row)">收起</span>
                    <span v-else @click="toogleExpand(scope.row)">展开</span>
                </template>
      </el-table-column>
      <el-table-column type="expand" width="1">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    </el-table>
</el-col>
</el-row>
  </div>
</template>
<script>
import Mtop from '@/components/Mtop'
import CityTree from '@/components/cityTree'
import {helpPoorResults} from '@/api/povertyAlleviation'
 
export default {
  name: 'Home',
  components: {
    Mtop,
		CityTree
  },
  data() {
    return {
			cityId:'',
			totalD:{},
			achieveD:{},
			unachieveD:{},
      treeData: [
        {
          label: '隆回县',
          children: [
            {
              label: '北山镇'
            },
            {
              label: '大水田乡'
            },
            {
              label: '高平镇'
            },
            {
              label: '荷田乡'
            },
            {
              label: '荷香桥镇'
            },
            {
              label: '横板桥镇'
            },
            {
              label: '虎形山瑶族乡'
            },
            {
              label: '花门街道'
            },
            {
              label: '金石桥镇'
            },
            {
              label: '六都寨镇'
            },
            {
              label: '罗洪镇'
            },
            {
              label: '麻糖山乡'
            },
            {
              label: '南岳庙镇'
            },
            {
              label: '七江镇'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [
        {
          date: '170',
          poorName: '21',
          address: '79%',
		  poorReason:'',
		  incomeScore:''
        }
      ],
      show: true
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
	  handleGetCityId(city){
	  	// console.log(city)
	  	this.cityId = city
	  },
		helpPoorResults(){
			this.listLoading = true
			let cityId = this.cityId
			poorList({cityId}).then((response)=>{
				if(response.data.code===200){
					this.tableData = response.data.obj['poorList']
					this.totalD['Fam'] = response.data.obj['Fam']
					this.totalD['Num'] = response.data.obj['Num']
					this.achieveD['Fam'] = response.data.obj['Fam']
					this.achieveD['Num'] = response.data.obj['Num']
					this.unachieveD['Fam'] = response.data.obj['Fam']
					this.unachieveD['Num'] = response.data.obj['Num']
					this.listLoading = false
				}
				else{
					
				}
			})
		},
    detail() {
      this.$router.push({
        path: '/country-detail',
        query: {
          id: 'aa'
        }
      })
    },
    toogleExpand(row) {
      const $table = this.$refs.table
      this.tableData.map((item) => {
        if (row.id != item.id) {
          $table.toggleRowExpansion(item, false)
        }
      })
      $table.toggleRowExpansion(row)
    },
    handleNodeClick() {}
  }
}
</script>
<style lang="scss" scoped>
.conty {
  padding: 10px;
  .mtopcon {
    display: flex;
  }
  .seat {
    display: flex;
    align-items: center;
    margin: 20px 0px;
    .seat1 {
      display: flex;
      flex: 1;
      .current {
        margin-right: 15px;
      }
      .warning {
        margin-right: 15px;
      }
    }
    .years {
      background-color: #b8d8a7;
      padding: 15px 20px;
    }
    i {
      font-style: normal;
    }
  }
}
</style>
