<template>
  <div class="app-container">
    <div class="filter-container">
      <el-row>
        <el-col>
          <div class="msearch">
            单位信息
          </div>
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
          type="selection"
          width="40"
        />
        <el-table-column
          label="组织机构名称"
          prop="partyName"
        />

        <el-table-column
          label="组织类型"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{row.type | changeText}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="地区"
          prop="addr"
        />

        <el-table-column
          label="组织类型"
          align="center"
        >
          <template slot-scope="{row}">
            <span>{{row.status==='1'?'是':'否'}}</span>
          </template>
        </el-table-column>
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
              <i class="el-icon-edit-outline" /> 编辑
            </el-button>

            <el-popover
              :ref="'popover-' + row.id"
              placement="top"
              width="160"
              title="确定删除此行数据？"
              trigger="click"
            >
              <div>
                <el-button
                  size="mini"
                  @click="$refs[`popover-` + row.id].doClose()"
                >取消</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="$refs[`popover-` + row.id].doClose();handleDelete(row,$index)"
                >确定</el-button>
              </div>
              <el-button
                slot="reference"
                type="text"
                style="margin-left: 10px"
              >
                <i class="el-icon-delete" />删除
              </el-button>
            </el-popover>
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
          :model="temp"
          :label-position="labelPosition"
          label-width="160px"
          style="width: 100%"
        >

          <el-form-item
            label="组织机构名称"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="组织机构名称"
              :disabled="false"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="组织类型"
            prop="tenantCode"
          >
            <el-select
              v-model="temp.k"
              placeholder="请选择组织类型"
            >
              <el-option
                label="国家"
                value="1"
              ></el-option>
              <el-option
                label="省级"
                value="2"
              ></el-option>
              <el-option
                label="市级"
                value="3"
              ></el-option>
              <el-option
                label="乡级"
                value="4"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="有效标识"
            prop="tenantCode"
          >
            <el-switch
              class="switch"
              v-model="temp.l"
              active-color="#13ce66"
              inactive-color="#ddd"
              active-text="有效"
              inactive-text="无效"
            >
            </el-switch>
          </el-form-item>
          <el-form-item
            label="所属行政区"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="组织机构名称"
              :disabled="false"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="自定义编码"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="组织机构名称"
              :disabled="false"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="组织代码"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="组织机构名称"
              :disabled="false"
              maxlength="60"
              clearable
            />
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
import { unitinfolist } from '@/api/unit-information/unit-information'
import waves from '@/directive/waves' // waves directive
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import qs from 'qs'
import { saveAs } from 'file-saver'

export default {
  name: 'SysTenant',
  components: { Pagination },
  directives: { waves, elDragDialog },
  filters: {
    changeText(val) {
      if (val === '1') {
        return '国家'
      } else if (val === '2') {
        return '省级'
      } else if (val === '3') {
        return '市级'
      } else if (val === '4') {
        return '乡级'
      }
    }
  },
  data() {
    return {
      bb: '11',
      cc: 0,
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

    this.getList()
  },
  computed: {},
  methods: {
    getList() {
      let params = {
        ...{
          current: this.listQuery.currentPage,
          size: this.listQuery.pageSize
        }
      }
      unitinfolist(params).then((response) => {
        console.log('response', response)
        if (response.code === 200) {
          const cc = [...response.obj]
          const total = cc.pop()
          const pages = cc.pop()
          this.list = cc
          this.total = total.count
          console.log('this.list', this.list)
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
/* switch按钮样式 */
::v-deep .switch .el-switch__label {
  position: absolute;
  display: none;
  color: #fff !important;
}
/*打开时文字位置设置*/
::v-deep .switch .el-switch__label--right {
  z-index: 1;
}
/* 调整打开时文字的显示位子 */
::v-deep .switch .el-switch__label--right span {
  margin-left: 10px;
}
/*关闭时文字位置设置*/
::v-deep .switch .el-switch__label--left {
  z-index: 1;
}
/* 调整关闭时文字的显示位子 */
::v-deep .switch .el-switch__label--left span {
  margin-left: 25px;
}
/*显示文字*/
::v-deep .switch .el-switch__label.is-active {
  display: block;
}
/* 调整按钮的宽度 */
::v-deep .switch.el-switch .el-switch__core,
::v-deep .el-switch .el-switch__label {
  width: 65px !important;
  margin: 0;
}
</style>