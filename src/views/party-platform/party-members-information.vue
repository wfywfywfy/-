<template>

  <div class="app-container">
    <div class="filter-container">
      <div class="msearch">
        党员信息管理
      </div>
    </div>

    <el-row>
      <el-col :span="3">
        <el-tree
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
        />
      </el-col>

      <el-col :span="21">
        <div class="table-con">

          <div class="table-btn">
            <div class="table-btn1">
              {{memberManger}}党员管理
            </div>
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
              label="姓名"
              prop="tenantCode"
            />
            <el-table-column
              label="性别"
              prop="tenantName"
            />
            <el-table-column
              label="出生日期"
              prop="tenantContact"
            />
            <el-table-column
              label="入党日期"
              prop="tenantEmail"
            />
            <el-table-column
              label="所属党支部"
              prop="tenantEmail"
            />
            <el-table-column
              label="支部职务"
              prop="tenantEmail"
            />
            <el-table-column
              label="党员工作状态"
              prop="tenantEmail"
            />
            <el-table-column
              label="开始时间"
              prop="tenantEmail"
            />
            <el-table-column
              label="联系电话"
              prop="tenantEmail"
            />
            <el-table-column
              label="	学历"
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
                  <i class="el-icon-edit-outline" /> 编辑
                </el-button>
                <el-button
                  type="text"
                  @click="dialogFormVisible1=true"
                >
                  <i class="el-icon-edit-outline" /> 组织关系转接
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
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="temp"
          :label-position="labelPosition"
          label-width="160px"
          style="width: 100%"
        >

          <el-form-item
            label="姓名"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="姓名"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="党员工作状态"
            prop="tenantCode"
          >
            <el-select
              :disabled="dialogStatus==='detail'"
              v-model="temp.k"
              placeholder="请选择党员工作状态"
            >
              <el-option
                label="在岗"
                value="zaig"
              ></el-option>
              <el-option
                label="休假"
                value="xiuj"
              ></el-option>
              <el-option
                label="在机关上班"
                value="zaij"
              ></el-option>

            </el-select>
          </el-form-item>

          <el-form-item
            label="开始时间"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="开始时间"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="性别"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="性别"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="民族"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="民族"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="籍贯"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="籍贯"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="出生日期"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="出生日期"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="党内职务"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="党内职务"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="党员类型"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="党员类型"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="所属党支部"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="所属党支部"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="入党日期"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="入党日期"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="工作岗位"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="工作岗位"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="文化程度/学历"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="文化程度/学历"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="联系方式"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="联系方式"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="转正日期"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="转正日期"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="党籍状态"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="党籍状态"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="家庭地址"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="家庭地址"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="家庭地址坐标"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="家庭地址坐标"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="是否是失联党员"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="是否是失联党员"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="失联日期"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="失联日期"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="是否为流动党员"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="是否为流动党员"
              :disabled="dialogStatus==='detail'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="外出流向"
            prop="tenantCode"
          >
            <el-input
              v-model="temp.tenantCode"
              placeholder="外出流向"
              :disabled="dialogStatus==='detail'"
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

    <el-dialog
      v-el-drag-dialog
      title="选择转接类型"
      :visible.sync="dialogFormVisible1"
    >
      <div class="">
        <div class="mbtn-con">
          <el-button
            type="primary"
            class="filter-item"
          >
            转入其他党支部
          </el-button>
          <el-button
            type="primary"
            class="filter-item"
          >
            转出本党委
          </el-button>
        </div>
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
      dialogFormVisible1: false,
      memberManger: '思泉党支部党员管理',
      treeData: [
        {
          label: '组织结构',
          children: [
            {
              label: '北京集团总公司'
            },
            {
              label: '思泉党支部',
              children: [
                {
                  label: ' 部门党组织'
                }
              ]
            },
            {
              label: '思泉党支部1',
              children: [
                {
                  label: ' 部门党组织1'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
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
    handleNodeClick(node) {
      this.memberManger = node.label

      if (node.label === '北壁乡') {
        this.tableshow = true
      } else if (node.label === '松城街道') {
        this.tableshow = false
      }
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
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .table-btn1 {
      margin-right: auto;
    }
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
.mbtn-con {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20%;
}
</style>