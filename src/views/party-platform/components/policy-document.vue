<template>
  <div class="app-container">

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
          prop="policyFileId"
        />
        <el-table-column
          label="标题"
          prop="title"
        />
        <el-table-column
          label="发布人"
          prop="creatorName"
        />
        <el-table-column label="类型">
          <template slot-scope="{row}">
            <span>{{row.type | changeType }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发布时间"
          prop="createTime"
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
            >编辑</el-button>
            <el-popover
              :ref="'popover-' + row.policyFileId"
              placement="top"
              width="160"
              title="确定删除此行数据？"
              trigger="click"
            >
              <div>
                <el-button
                  size="mini"
                  @click="$refs[`popover-` + row.policyFileId].doClose()"
                >取消</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  @click="$refs[`popover-` + row.policyFileId].doClose();handleDelete(row)"
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
          :rules="rules"
          :model="temp"
          :label-position="labelPosition"
          label-width="160px"
          style="width: 100%"
        >

          <el-form-item
            label="活动主题"
            prop="title"
          >
            <el-input
              v-model="temp.title"
              placeholder="活动主题"
              :disabled="false"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="活动类型"
            prop="type"
          >
            <el-select
              v-model="temp.type"
              placeholder="请选择活动类型"
            >
              <el-option
                label="通知文件"
                value="1"
              ></el-option>
              <el-option
                label="实施意见"
                value="2"
              ></el-option>

            </el-select>
          </el-form-item>
          <el-form-item
            label="发布人"
            prop="creatorName"
          >
            <el-select
              v-model="temp.creatorName"
              placeholder="请选择发布人"
              disabled="true"
            >
              <el-option
                label="余家俊"
                value="余家俊"
              ></el-option>

            </el-select>
          </el-form-item>
          <el-form-item
            label="活动时间"
            prop="createTime"
          >
            <el-date-picker
              type="datetime"
              v-model="temp.createTime"
              format="yyyy-MM-dd HH:mm"
              placeholder="活动时间"
            >
            </el-date-picker>

          </el-form-item>

          <el-form-item
            label="文件内容摘要"
            prop="content"
          >
            <el-input
              v-model="temp.content"
              placeholder="活动内容"
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
import {
  xczxfilelist,
  addfileinfo,
  editfileinfo,
  delfileinfo
} from '@/api/party-platform/party-information'
import waves from '@/directive/waves' // waves directive
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import qs from 'qs'
import { saveAs } from 'file-saver'
import mmoment from 'moment'
export default {
  name: 'SysTenant',
  components: { Pagination },
  directives: { waves, elDragDialog },
  filters: {
    changeType(val) {
      if (val === 1) {
        return '通知文件'
      } else if (val === 2) {
        return '实施意见'
      }
    }
  },
  data() {
    return {
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
        id: undefined,
        creatorName: '余家俊'
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
  methods: {
    getList() {
      this.listLoading = true
      let params = {
        size: this.listQuery.pageSize,
        current: this.listQuery.currentPage
      }
      xczxfilelist(params).then((response) => {
        console.log('response', response)
        if (response.code === 200) {
          const cc = [...response.obj]

          const total = cc.pop()
          const size = cc.pop()

          this.list = cc
          this.total = total.count
          this.listQuery.currentPage = size.current
          this.listQuery.pageSize = size.size
          this.listLoading = false
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
        id: undefined,
        creatorName: '余家俊'
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
          this.temp.createTime = mmoment(this.temp.createTime).format(
            'YYYY-MM-DD HH:mm'
          )
          console.log('this.temp', this.temp)
          addfileinfo(this.temp).then((response) => {
            if (response.code === 200) {
              this.list.unshift(this.temp)
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row, {
        type: String(row.type)
      }) // copy obj

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
          tempData.policyFileId = this.temp.policyFileId
          tempData.title = this.temp.title
          tempData.type = this.temp.type
          tempData.createTime = this.temp.createTime
          tempData.content = this.temp.content
          tempData.creatorName = this.temp.creatorName
          this.disabledStatus = true
          editfileinfo(tempData).then((response) => {
            if (response.code === 200) {
              this.disabledStatus = false
              this.dialogFormVisible = false
              this.$message({
                message: '编辑成功',
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
    handleDelete(row) {
      delfileinfo({ fileid: row.policyFileId }).then((response) => {
        if (response.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.handleReset()
        } else {
          this.handleWarning(response)
        }
      })
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