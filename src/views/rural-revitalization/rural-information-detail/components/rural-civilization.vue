<template>
  <div class="app-container">
    <el-row>

      <el-col :span="24">

        <div class="table-con">

          <div class="table-btn">
            <el-button
              type="primary"
              class="filter-item"
              icon="el-icon-plus"
              @click="handleCreate"
            >
              新增
            </el-button>

          </div>
          <el-table
            :key="tableKey"
            ref="multipleTable"
            v-loading="listLoading"
            :data="list"
            border
            fit
            highlight-current-row
            style="width: 100%"
            @sort-change="sortChange"
            @selection-change="handleSelectionChange"
          >

            <el-table-column
              label="地区"
              prop="tenantName"
            />
            <el-table-column
              label="户主姓名"
              prop="tenantContact"
            />
            <el-table-column
              label="身份证号"
              prop="tenantEmail"
            />
            <el-table-column
              label="联系电话"
              prop="tenantEmail"
            />
            <el-table-column
              label="户属性标识"
              prop="tenantEmail"
            />
            <el-table-column
              label="防贫风险类别"
              prop="tenantEmail"
            />

            <el-table-column
              label="操作"
              align="center"
              width="260"
            >
              <template slot-scope="{row,$index}">
                <el-button
                  type="text"
                  @click="handleDetail(row)"
                >
                  <i class="el-icon-edit-outline" /> 详情
                </el-button>
                <el-button
                  type="text"
                  @click="handleUpdate(row)"
                >
                  <i class="el-icon-edit-outline" /> 详情
                </el-button>

              </template>
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
    <el-dialog
      v-el-drag-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <div class="mform">

        <el-row>
          <el-col>
            <el-form
              ref="dataForm"
              :rules="rules"
              :model="temp"
              :label-position="labelPosition"
              label-width="150px"
              style="width: 100%"
            >

              <el-form-item
                label="地区"
                prop="cityName"
              >
                <el-cascader
                  style="width:300px;"
                  v-model="temp.cityName"
                  :options="options"
                  clearable
                  :disabled="dialogStatus==='detail'"
                ></el-cascader>
              </el-form-item>

              <el-col :span="12">
                <el-form-item
                  label="户主姓名"
                  prop="poorName"
                >
                  <el-input
                    v-model="temp.poorName"
                    placeholder="姓名"
                    maxlength="64"
                    clearable
                    :disabled="dialogStatus==='detail'"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="户主身份证号"
                  prop="cardNo"
                >
                  <el-input
                    v-model="temp.cardNo"
                    placeholder="身份证号"
                    maxlength="64"
                    clearable
                    :disabled="dialogStatus==='detail'"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item
                  label="详细地址"
                  prop="address"
                >
                  <el-input
                    v-model="temp.address"
                    placeholder="请输入详细地址"
                    maxlength="64"
                    clearable
                    :disabled="dialogStatus==='detail'"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="户主电话号码"
                  prop="telephone"
                >
                  <el-input
                    v-model="temp.telephone"
                    placeholder="请输入手机号码"
                    maxlength="64"
                    clearable
                    :disabled="dialogStatus==='detail'"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="是否住在安置区"
                  prop="tenantCode"
                >
                  <el-radio-group
                    v-model="temp.radio"
                    :disabled="dialogStatus==='detail'"
                  >
                    <el-radio label="1">是</el-radio>
                    <el-radio label="2">否</el-radio>
                  </el-radio-group>

                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="安置区地址"
                  prop="tenantCode"
                >
                  <el-input
                    :disabled="dialogStatus==='detail'"
                    v-model="temp.tenantCode"
                    placeholder="请输入安置区地址"
                    maxlength="64"
                    clearable
                  />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item
                  label="户属性"
                  prop="type"
                >
                  <el-select
                    v-model="temp.type"
                    placeholder="请选择户属性"
                    :disabled="dialogStatus==='detail'"
                  >
                    <el-option
                      label="脱贫户"
                      value="1"
                    ></el-option>
                    <el-option
                      label="脱贫不稳定户"
                      value="2"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-form>
          </el-col>
        </el-row>

      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >

        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          :disabled="disabledStatus"
          @click="dialogStatus==='create'?createData():updateData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import {
//   querySysTenant,
//   addSysTenant,
//   updateSysTenant,
//   deleteSysTenant,
//   exportSysTenant
// } from '@/api/admin'
import waves from '@/directive/waves' // waves directive
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import qs from 'qs'
import { saveAs } from 'file-saver'
import CityTree from '@/components/cityTree'

export default {
  name: 'SysTenant',
  components: { Pagination, CityTree },
  directives: { waves, elDragDialog },
  data() {
    return {
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
      advancedSearch: false
    }
  },

  created() {
    if (window.innerWidth < 700) {
      this.labelPosition = 'top'
    }
    // this.getList()
  },
  methods: {
    handleGetCityId(city) {
      // console.log(city)
      this.cityId = city
    },
    getList() {
      this.listLoading = true
      querySysTenant(this.listQuery).then((response) => {
        this.list = response.data.list
        this.total = response.data.pagination.total
        this.listLoading = false
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
</style>