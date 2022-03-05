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
              label="序号"
              prop="villageId"
            />
            <el-table-column
              label="户数(户)"
              prop="totalFam"
            />
            <el-table-column
              label="人数(人)"
              prop="totalNum"
            />
            <el-table-column
              label="主导产业"
              prop="property"
            />

            <el-table-column label="是否贫困村">
              <template slot-scope="{row}">
                <span>{{row.ispoor | changeIspoor }}</span>
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
                  <i class="el-icon-edit-outline" />编辑
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

          <!-- <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize"
            @pagination="getList"
          /> -->
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
                label="是否贫困村"
                prop="poorName"
              >
                <el-input
                  v-model="temp.poorName"
                  placeholder="是否贫困村"
                  maxlength="60"
                  clearable
                  :disabled="dialogStatus==='detail'"
                />
              </el-form-item>

              <el-form-item
                label="主导产业"
                prop="cardNo"
              >
                <el-input
                  v-model="temp.cardNo"
                  placeholder="主导产业"
                  maxlength="60"
                  clearable
                  :disabled="dialogStatus==='detail'"
                />
              </el-form-item>

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

export default {
  name: 'SysTenant',
  components: { Pagination, CityTree },
  directives: { waves, elDragDialog },
  props: {
    cityId: {
      type: String,
      default: ''
    }
  },
  filters: {
    changeIspoor(val) {
      if (val === 1) {
        return '是'
      } else if (val === 2) {
        return '否'
      }
    }
  },
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
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const params = Object.assign(
        {},
        {
          cityId: this.cityId,

          villageid: '1'
          // current: this.listQuery.currentPage,
          // size: this.listQuery.pageSize
        }
      )

      villageinfo(params).then((res) => {
        this.listLoading = false
        if (res.code === 200) {
          const cc = [...res.obj]
          // console.log('cc', cc)
          const total = cc.pop()
          // const size = cc.pop()
          this.list = cc
          // this.total = total.count
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
</style>