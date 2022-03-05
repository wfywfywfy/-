<template>
  <div class="app-container">
    <el-row>

      <el-col :span="24">
        <el-card>
          <el-row>
            <el-col :span="12">
              <div class="village">
                村名称：安吉村委会
              </div>
              <div class="village-info">
                <div class="item-info">
                  所在镇：精口镇
                </div>
                <div class="item-info">
                  所在镇：精口镇
                </div>
                <div class="item-info">
                  所在镇：精口镇
                </div>
                <div class="item-info">
                  所在镇：精口镇
                </div>
                <div class="item-info">
                  所在镇：精口镇
                </div>
                <div class="item-info">
                  所在镇：精口镇
                </div>
                <div class="item-info">
                  所在镇：精口镇
                </div>
                <div class="item-info">
                  所在镇：精口镇
                </div>
                <div class="item-info">
                  所在镇：精口镇
                </div>
                <div class="item-info">
                  所在镇：精口镇
                </div>
                <div class="item-info">
                  所在镇：精口镇
                </div>
                <div class="item-info">
                  所在镇：精口镇
                </div>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <img
                  src=""
                  alt=""
                >
                这里是二维码
              </div>
            </el-col>
            <el-col :span="7">
              <div>
                <img
                  src="#"
                  alt=""
                >
                这里是轮播图
              </div>
            </el-col>
          </el-row>
        </el-card>
        <div class="btngrou">
          <el-radio-group v-model="radio1">
            <el-radio-button label="prosperousindustry">产业兴旺</el-radio-button>
            <!-- <el-radio-button label="ecologicalstraightin">生态直居</el-radio-button>
            <el-radio-button label="ruralcivilization">乡村文明</el-radio-button>
            <el-radio-button label="effectivegovernance">治理有效</el-radio-button>
            <el-radio-button label="liferich">生活富裕</el-radio-button> -->
          </el-radio-group>
        </div>
        <component
          v-bind:is="currentTabComponent"
          :cityId="cityId"
        ></component>

      </el-col>
    </el-row>

  </div>
</template>

<script>
import {
  villageinfo,
  addvillageinfo,
  editvillageinfo,
  delvillageinfo
} from '@/api/rural-revitalization/rural-revitalization'
import waves from '@/directive/waves' // waves directive
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import qs from 'qs'
import { saveAs } from 'file-saver'
import CityTree from '@/components/cityTree'

import prosperousindustry from './components/prosperous-industry.vue'
import ecologicalstraightin from './components/ecological-straight-in.vue'
import ruralcivilization from './components/rural-civilization.vue'
import effectivegovernance from './components/effective-governance.vue'
import liferich from './components/life-rich.vue'
export default {
  name: 'SysTenant',
  components: {
    Pagination,
    CityTree,
    prosperousindustry,
    ecologicalstraightin,
    ruralcivilization,
    effectivegovernance,
    liferich
  },
  directives: { waves, elDragDialog },
  data() {
    return {
      radio1: 'prosperousindustry',
      options: [
        {
          value: '霞浦县',
          label: '霞浦县',
          children: [
            {
              value: '北壁乡',
              label: '北壁乡',
              children: [
                {
                  value: '长春镇',
                  label: '长春镇',
                  children: [
                    {
                      value: '松城街道',
                      label: '松城街道'
                    },
                    {
                      value: '松港街道',
                      label: '松港街道'
                    },
                    {
                      value: '松山街道',
                      label: '松山街道'
                    }
                  ]
                },
                {
                  value: '牙城镇',
                  label: '牙城镇'
                },
                {
                  value: '溪南镇',
                  label: '溪南镇'
                },
                {
                  value: '沙江镇',
                  label: '沙江镇'
                },
                {
                  value: '下浒镇',
                  label: '下浒镇'
                },
                {
                  value: '三沙镇',
                  label: '三沙镇'
                }
              ]
            },
            {
              value: '海岛乡',
              label: '海岛乡'
            },
            {
              value: '盐田畲族乡',
              label: '盐田畲族乡'
            },
            {
              value: '崇儒畲族乡',
              label: '崇儒畲族乡'
            },
            {
              value: '柏洋乡',
              label: '柏洋乡'
            }
          ]
        }
      ],
      tableKey: 0,
      tableKey1: 0,
      labelPosition: 'right',
      list: [{}],
      total: 0,
      listLoading: false,
      disabledStatus: false,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        tenantCode: undefined,
        tenantName: undefined,
        tenantContact: undefined,
        tenantEmail: undefined,
        tenantTel: undefined,
        sorter: 'createTime_descend'
      },
      temp: {
        id: undefined
      },
      multipleSelection: [],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增',
        detail: '详情'
      },
      rules: {
        tenantCode: [
          {
            required: true,
            validator: this.checkTenantCode,
            trigger: ['blur', 'change']
          }
        ],
        tenantName: [
          {
            required: true,
            validator: this.checkTenantName,
            trigger: ['blur', 'change']
          }
        ],
        tenantEmail: [
          {
            required: false,
            type: 'email',
            validator: this.checkTenantEmail,
            trigger: ['blur', 'change']
          }
        ]
      },
      downloadLoading: false,
      advancedSearch: false,
      cityId: '',
      villageid: ''
    }
  },
  computed: {
    currentTabComponent() {
      return this.radio1
    }
  },
  created() {
    if (window.innerWidth < 700) {
      this.labelPosition = 'top'
    }
    this.cityId = this.$route.query.cityId

    // this.getList()
  },
  methods: {
    handleGetCityId(city) {
      // console.log(city)
      this.cityId = city
    },
    getList() {
      this.listLoading = true
      const params = Object.assign(
        {},
        {
          cityId: this.cityId,
          villageid: this.villageid
          // current: this.listQuery.currentPage,
          // size: this.listQuery.pageSize
        }
      )

      villageinfo(params).then((res) => {
        this.listLoading = false
        if (res.code === 200) {
          const cc = [...res.obj]
          console.log('cc', cc)
          const total = cc.pop()
          // const size = cc.pop()
          this.list = cc
          this.total = total.count
          // this.listQuery.currentPage = size.current
          // this.listQuery.pageSize = size.size
          console.log('this.listQuery', this.listQuery)
        }
      })
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleReset() {
      this.listQuery.tenantCode = undefined
      this.listQuery.tenantName = undefined
      this.listQuery.tenantContact = undefined
      this.listQuery.tenantEmail = undefined
      this.listQuery.tenantTel = undefined
      this.handleFilter()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'createTime') {
        this.sortByCreateTime(order)
      }
    },
    sortByCreateTime(order) {
      if (order === 'ascending') {
        this.listQuery.sorter = 'createTime_ascend'
      } else {
        this.listQuery.sorter = 'createTime_descend'
      }
      this.handleFilter()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    resetTemp() {
      this.temp = {
        id: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.disabledStatus = true
          addSysTenant(this.temp).then((response) => {
            if (response.message === 'success') {
              this.list.unshift(this.temp)
              this.disabledStatus = false
              this.dialogFormVisible = false
              this.$message({
                message: this.$t('common.add-success'),
                type: 'success',
                duration: 2000
              })
              this.handleReset()
            } else {
              this.handleWarning(response)
            }
          })
        }
      })
    },
    handleDetail(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'detail'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // const tempData = Object.assign({}, this.temp)
          const tempData = {}
          tempData.id = this.temp.id
          tempData.tenantCode = this.temp.tenantCode
          tempData.tenantName = this.temp.tenantName
          tempData.tenantContact = this.temp.tenantContact
          tempData.tenantEmail = this.temp.tenantEmail
          tempData.tenantTel = this.temp.tenantTel
          this.disabledStatus = true
          updateSysTenant(tempData).then((response) => {
            if (response.message === 'success') {
              this.disabledStatus = false
              this.dialogFormVisible = false
              this.$message({
                message: this.$t('common.edit-success'),
                type: 'success',
                duration: 2000
              })
              this.handleReset()
            } else {
              this.handleWarning(response)
            }
          })
        }
      })
    },
    handleDelete(row, index) {
      if (row.id) {
        this.delete(row.id)
      } else {
        if (this.multipleSelection.length === 0) {
          this.handleWarning(this.$t('common.choose-delete'))
          return
        }
        this.$confirm(
          this.$t('common.confirm-batch-delete'),
          this.$t('common.batch-delete'),
          {
            confirmButtonText: this.$t('common.confirm'),
            cancelButtonText: this.$t('common.cancel'),
            type: 'warning'
          }
        )
          .then(() => {
            this.delete(
              this.multipleSelection
                .map((item) => {
                  return item.id
                })
                .join(',')
            )
          })
          .catch(() => {})
      }
    },
    delete(deleteArray) {
      deleteSysTenant(deleteArray).then((response) => {
        if (response.message === 'success') {
          this.$message({
            message: this.$t('common.delete-success'),
            type: 'success',
            duration: 2000
          })
          this.handleReset()
        } else {
          this.handleWarning(response)
        }
      })
    },

    getSortClass: function (key) {
      const sorter = this.listQuery.sorter
      return sorter === `${key}_ascend` ? 'ascending' : 'descending'
    },
    handleWarning(response) {
      this.$message({
        message: response.message || response,
        type: 'warning',
        duration: 2000
      })
      this.disabledStatus = false
    },
    checkTenantCode(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('systenant.tenantCode-required')))
      } else {
        callback()
      }
    },
    checkTenantName(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('systenant.tenantName-required')))
      } else {
        callback()
      }
    },
    checkTenantEmail(rule, value, callback) {
      if (value) {
        const reg =
          /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error(this.$t('sysuser.email-format')))
        }
      } else {
        callback()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  padding: 0px 20px;
  margin-bottom: 15px;
  .item1 {
    font-size: 15px;
    text-align: right;
    margin-right: 10px;
    white-space: nowrap;
    width: 130px;
  }
  .el-input {
    flex: 1;
  }
  .el-select {
    flex: 1;
  }
  .el-range-editor {
    flex: 1;
  }
}
.msearch {
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 20px;
}
.table-con {
  .table-tit {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  .table-btn {
    text-align: right;
    margin-bottom: 15px;
  }
}
.form-tit1 {
  font-size: 20px;
  color: rgb(40, 139, 237);
  margin-bottom: 20px;
  background: rgb(240, 242, 245);
  padding: 10px 10px;
}
.mform {
  .el-input {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
}
.m-card {
  background: rgb(230, 247, 255);
  .m-card1 {
    font-size: 20px;
    color: rgb(40, 139, 237);
    margin-bottom: 15px;
  }
  .m-card2 {
    font-size: 15px;
  }
}
.m-tit {
  font-size: 20px;
  color: rgb(40, 139, 237);
  margin: 15px 0px;
}
.village-info {
  display: flex;
  flex-wrap: wrap;
  .item-info {
    width: 33.3333333%;
    margin: 20px 0px 0px;
  }
}
.btngrou {
  margin-top: 20px;
}
</style>