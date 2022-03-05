<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col>
          <div class="msearch">
            干部申报
          </div>
        </el-col>
        <!-- <el-col :span="8">
          <div class="item">
            <div class="item1">地区:</div>
            <el-cascader
              placeholder="请选择地区"
              style="width:300px;"
              v-model="listQuery.cityName"
              :options="options"
              clearable
            ></el-cascader>
          </div>
        </el-col> -->
        <el-col :span="8">
          <div class="item">
            <div class="item1">户主:</div>
            <el-input
              v-model="listQuery.poorname"
              placeholder="请输入户主"
              clearable
              class=""
              @keyup.enter.native="handleFilter"
            />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="item1">户主身份证:</div>
            <el-input
              v-model="listQuery.poorcardno"
              placeholder="请输入户主身份证"
              clearable
              class=""
              @keyup.enter.native="handleFilter"
            />
          </div>
        </el-col>

        <el-col :span="8">
          <div class="item">
            <div class="item1">申报类别:</div>
            <el-select
              v-model="listQuery.preportype"
              placeholder="请选择"
            >
              <el-option
                label="人均纯收入"
                value="1"
              ></el-option>
              <el-option
                label="自付医药费"
                value="2"
              ></el-option>
              <el-option
                label="因意外之死、致重度残疾"
                value="3"
              ></el-option>
              <el-option
                label="自付医药费占家庭年收入"
                value="4"
              ></el-option>

            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="item">
            <div class="item1">申报时间:</div>
            <el-date-picker
              v-model="listQuery.createtime"
              format="yyyy-MM-dd"
              placeholder="申报时间"
            >
            </el-date-picker>
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
        :data="tableData"
        border
        fit
        highlight-current-row
        style="width: 100%"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
      >

        <el-table-column
          label="序号"
          prop="reportId"
        />
        <el-table-column
          label="户主姓名"
          prop="reportpoorname"
        />
        <el-table-column
          label="户主身份证"
          prop="reportcardno"
        />

        <el-table-column label="申报类别">
          <template slot-scope="{row}">
            <span>{{row.reporttype | changeType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="申报时间"
          prop="reportime"
        />
        <el-table-column
          label="申报人"
          prop="reportname"
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
            label="申报对象"
            prop="reportname"
          >
            <el-input
              :disabled="true"
              v-model="temp.reportname"
              placeholder="申报对象"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="户主姓名"
            prop="reportpoorname"
          >
            <el-input
              :disabled="dialogStatus==='detail'"
              v-model="temp.reportpoorname"
              placeholder="户主姓名"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="风险类别"
            prop="reporttype"
          >
            <el-select
              :disabled="dialogStatus==='detail'"
              v-model="temp.reporttype"
              placeholder="风险类别"
            >
              <el-option
                label="人均纯收入"
                value="1"
              ></el-option>
              <el-option
                label="自付医药费"
                value="2"
              ></el-option>
              <el-option
                label="因意外之死、致重度残疾"
                value="3"
              ></el-option>
              <el-option
                label="自付医药费占家庭年收入"
                value="4"
              ></el-option>
            </el-select>
          </el-form-item>
          <div v-if="dialogStatus==='detail'">

            <el-form-item
              label="户主身份证"
              prop="reportcardno"
            >
              <el-input
                v-model="temp.reportcardno"
                placeholder="户主身份证"
                :disabled="dialogStatus==='detail'"
                maxlength="60"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="申报人"
              prop="reportname"
            >
              <el-input
                v-model="temp.reportname"
                placeholder="申报人"
                :disabled="dialogStatus==='detail'"
                maxlength="60"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="申报时间"
              prop="reportime"
            >
              <el-date-picker
                :disabled="dialogStatus==='detail'"
                type="datetime"
                v-model="temp.reportime"
                format="yyyy-MM-dd HH:mm"
                placeholder="申报时间"
              >
              </el-date-picker>

            </el-form-item>

          </div>
          <!-- <div v-if="dialogStatus==='detail'">
            <el-form-item
              label="受灾名称"
              prop="tenantCode"
            >
              <el-input
                v-model="temp.tenantCode"
                placeholder="受灾名称"
                :disabled="dialogStatus==='detail'"
                maxlength="60"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="是否主要居住用房"
              prop="tenantCode"
            >
              <el-input
                v-model="temp.tenantCode"
                placeholder="是否主要居住用房"
                :disabled="dialogStatus==='detail'"
                maxlength="60"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="受灾房屋数量"
              prop="tenantCode"
            >
              <el-input
                v-model="temp.tenantCode"
                placeholder="受灾房屋数量"
                :disabled="dialogStatus==='detail'"
                maxlength="60"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="受灾房屋面积"
              prop="tenantCode"
            >
              <el-input
                v-model="temp.tenantCode"
                placeholder="受灾房屋面积"
                :disabled="dialogStatus==='detail'"
                maxlength="60"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="房屋安全等级"
              prop="tenantCode"
            >
              <el-input
                v-model="temp.tenantCode"
                placeholder="房屋安全等级"
                :disabled="dialogStatus==='detail'"
                maxlength="60"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="受灾产业"
              prop="tenantCode"
            >
              <el-input
                v-model="temp.tenantCode"
                placeholder="受灾产业"
                :disabled="dialogStatus==='detail'"
                maxlength="60"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="受灾程度（绝收、减产）"
              prop="tenantCode"
            >
              <el-input
                v-model="temp.tenantCode"
                placeholder="受灾程度（绝收、减产）"
                :disabled="dialogStatus==='detail'"
                maxlength="60"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="损失金额（估算）"
              prop="tenantCode"
            >
              <el-input
                v-model="temp.tenantCode"
                placeholder="损失金额（估算）"
                :disabled="dialogStatus==='detail'"
                maxlength="60"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="损失占比"
              prop="tenantCode"
            >
              <el-input
                v-model="temp.tenantCode"
                placeholder="损失占比"
                :disabled="dialogStatus==='detail'"
                maxlength="60"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="财产状况"
              prop="tenantCode"
            >
              <el-input
                v-model="temp.tenantCode"
                placeholder="财产状况"
                :disabled="dialogStatus==='detail'"
                maxlength="60"
                clearable
              />
            </el-form-item>
            <el-form-item
              label="备注"
              prop="tenantCode"
            >
              <el-input
                v-model="temp.tenantCode"
                placeholder="备注"
                :disabled="dialogStatus==='detail'"
                maxlength="60"
                clearable
              />
            </el-form-item>
          </div> -->
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
import {
  reportList,
  reportListt,
  addreport,
  report
} from '@/api/prevent-poverty/cadre-declare'
import waves from '@/directive/waves' // waves directive
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import qs from 'qs'
import { saveAs } from 'file-saver'
import { changeQ } from '@/utils/fenye'
import _ from 'lodash'
import mmoment from 'moment'
export default {
  name: 'SysTenant',
  components: { Pagination },
  directives: { waves, elDragDialog },
  filters: {
    changeType(val) {
      if (val === 1) {
        return '人均纯收入'
      } else if (val === 2) {
        return '自付医药费'
      } else if (val === 3) {
        return '因意外之死、致重度残疾'
      } else if (val === 4) {
        return '自付医药费占家庭年收入'
      }
    }
  },
  data() {
    return {
      tableKey: 0,
      tableKey1: 0,
      labelPosition: 'right',
      tableData: [{}],
      total: 0,
      listLoading: false,
      disabledStatus: false,
      listQuery: {
        currentPage: 1,
        pageSize: 10,
        poorname: undefined,
        poorcardno: undefined,
        preportype: undefined,
        createtime: undefined
      },
      temp: {
        id: undefined,
        reportname: '李四'
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
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const { currentPage, pageSize } = changeQ(
        this.listQuery.currentPage,
        this.listQuery.pageSize
      )
      if (
        this.listQuery.poorname != undefined ||
        this.listQuery.poorcardno != undefined ||
        this.listQuery.preportype != undefined ||
        this.listQuery.createtime != undefined
      ) {
        // console.log(currentPage, pageSize, 88888)

        let params = {
          ...{
            limit: pageSize,
            offset: currentPage
          },
          ..._.omit(
            {
              ...this.listQuery,
              createtime:
                this.listQuery.createtime !== undefined
                  ? mmoment(this.listQuery.createtime).format('YYYY-MM-DD HH')
                  : undefined
            },
            ['pageSize', 'currentPage']
          )
        }

        reportListt(params).then((response) => {
          console.log('response', response)
          this.listLoading = false
          if (response.code === 200) {
            const cc = [...response.obj]
            const total = cc.pop()

            this.tableData = cc
            this.total = total.count
            console.log('this.tableData', this.tableData)
          }
        })
      } else {
        let params = {
          ...{
            limit: pageSize,
            offset: currentPage
          }
        }
        console.log('this.listQuery', this.listQuery)
        reportList(params).then((response) => {
          console.log('response', response)
          this.listLoading = false
          if (response.code === 200) {
            const cc = [...response.obj]
            const total = cc.pop()

            this.tableData = cc
            this.total = total.count
            console.log('this.tableData', this.tableData)
          }
        })
      }
    },

    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    },
    handleReset() {
      this.listQuery.poorname = undefined
      this.listQuery.poorcardno = undefined
      this.listQuery.preportype = undefined
      this.listQuery.createtime = undefined

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
        id: undefined,
        reportname: '李四'
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
          this.temp = { ...this.temp, reportname: '李四' }
          addreport(this.temp).then((response) => {
            if (response.code === 200) {
              // this.list.unshift(this.temp)
              this.disabledStatus = false
              this.dialogFormVisible = false
              this.$message({
                message: '添加成功',
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
      let params = {
        reportId: row.reportId
      }
      report(params).then((res) => {
        this.temp = { ...res.obj, reporttype: String(res.obj.reporttype) }
      })
      // this.temp = Object.assign({}, row) // copy obj
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
</style>