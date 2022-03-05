<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col>
          <div class="msearch">
            数据审核
          </div>
        </el-col>

        <el-col :span="8">
          <div class="item">
            <div class="item1">地区:</div>
            <el-cascader
              v-model="listQuery.cityName"
              :options="cityArr"
              clearable
            ></el-cascader>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="item1">户主:</div>
            <el-input
              v-model="listQuery.poorName"
              placeholder="户主"
              maxlength="60"
              clearable
            />
          </div>
        </el-col>

        <el-col :span="8">
          <div class="item">
            <div class="item1">户主身份证:</div>
            <el-input
              v-model="listQuery.poorName"
              placeholder="户主身份证"
              maxlength="60"
              clearable
            />
          </div>
        </el-col>

        <el-col :span="8">
          <div class="item">
            <div class="item1">申报类别:</div>
            <el-select
              v-model="listQuery.k"
              placeholder="请选择申报类别"
            >
              <el-option
                label="人均纯收入"
                value="1"
              ></el-option>
              <el-option
                label="自付医药费"
                value="2"
              ></el-option>

            </el-select>
          </div>
        </el-col>
        <el-col style="text-align:center;">
          <el-button
            v-waves
            type="primary"
            class="filter-item"
            icon="el-icon-search"
            @click="handleFilter"
          >
            查询
          </el-button>
          <el-button
            v-waves
            type="primary"
            class="filter-item"
            icon="el-icon-refresh-right"
            @click="handleReset"
          >
            重置
          </el-button>

        </el-col>

      </el-row>
    </div>
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
          label="序号"
          prop="tenantCode"
        />
        <el-table-column
          label="户主姓名"
          prop="tenantName"
        />
        <el-table-column
          label="户主身份证"
          prop="tenantContact"
        />
        <el-table-column
          label="申报类别"
          prop="tenantEmail"
        />

        <el-table-column
          label="申报时间"
          prop="tenantEmail"
        />
        <el-table-column
          label="申报人"
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
    <el-dialog
      v-el-drag-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <div class="mform">
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="temp"
          :label-position="labelPosition"
          label-width="160px"
          style="width: 100%"
        >

          <el-form-item
            label="标题"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="标题"
              :disabled="false"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="类型"
            prop="tenantCode"
          >
            <el-select
              v-model="temp.k"
              placeholder="请选择活动区域"
            >
              <el-option
                label="国家资讯"
                value="guoj"
              ></el-option>
              <el-option
                label="省级资讯"
                value="shengj"
              ></el-option>
              <el-option
                label="市级资讯"
                value="shij"
              ></el-option>
              <el-option
                label="乡级资讯"
                value="xiangj"
              ></el-option>
            </el-select>
          </el-form-item>

        </el-form>
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

export default {
  name: 'SysTenant',
  components: { Pagination },
  directives: { waves, elDragDialog },
  data() {
    return {
      cityArr: [
        {
          children: [
            {
              children: [
                {
                  children: [],
                  cityId: 4,
                  cityName: '福建省',
                  parentId: '2',
                  type: null,
                  createTime: '2021-12-27 14:51:07',
                  updateTime: '2021-12-27 14:51:07'
                }
              ],
              cityId: 2,
              cityName: '福州市',
              parentId: '1',
              type: '1',
              createTime: null,
              updateTime: null
            }
          ],
          cityId: 1,
          cityName: '霞浦县',
          parentId: null,
          type: '1',
          createTime: '2021-12-26 14:11:30',
          updateTime: '2021-12-26 14:11:30'
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
        create: '新增'
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
    this.dealCityArr(this.cityArr)
    // this.getList()
  },
  methods: {
    //递归城市
    dealCityArr(arr) {
      let result = []
      arr.forEach((item) => {
        if (item.children && item.children.length > 0) {
          item.children = this.dealCityArr(item.children)
          result.push({
            value: item.cityName,
            label: item.cityName,
            children: item.children
          })
        } else {
          result.push({
            value: item.cityName,
            label: item.cityName
          })
        }
      })

      this.cityArr = result

      return result
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
  .el-cascader {
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
</style>