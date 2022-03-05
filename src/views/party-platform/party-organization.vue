<template>
  <div class="party-organization">

    <el-row>
      <el-col :span="3">
        <el-tree
          :data="treeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
        />
      </el-col>

      <el-col :span="21">

        <div class="data-con">

          <div class="data-item">
            <el-button
              v-waves
              class="filter-item"
              type="primary"
              icon="el-icon-search"
              @click="handleCreate"
              style='margin-left:10px'
            >
              新建
            </el-button>

          </div>
        </div>

        <el-table
          :key="tableKey"
          border
          v-loading="listLoading"
          :data="list"
          style="width: 100%"
        >

          <el-table-column
            label="党组织名称"
            class-name="status-col"
          >
            <template slot-scope="{row}">
              <span>{{ row.partyname}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="支部书记"
            class-name="status-col"
          >
            <template slot-scope="{row}">
              <span>{{ row.secretary}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="电话"
            class-name="status-col"
          >
            <template slot-scope="{row}">
              <span>{{row.telephone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="地址"
            class-name="status-col"
          >
            <template slot-scope="{row}">
              <span>{{ row.address}}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            width="300"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="{row}">
              <el-button
                type="primary"
                size="mini"
                @click="handleUpdate(row)"
              >
                修改
              </el-button>
              <el-button
                v-if="row.status!='deleted'"
                size="mini"
                type="danger"
                @click="handleDelete(row)"
              >
                删除
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
      </el-col>
    </el-row>
    <el-dialog
      v-el-drag-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible1"
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
            label="支部书记"
            prop="secretary"
          >
            <el-input
              v-model="temp.secretary"
              placeholder="支部书记"
              :disabled="dialogStatus==='update'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="电话"
            prop="telephone"
          >
            <el-input
              v-model="temp.telephone"
              placeholder="电话"
              :disabled="dialogStatus==='update'"
              maxlength="60"
              clearable
            />
          </el-form-item>
          <el-form-item
            label="地址"
            prop="address"
          >
            <el-input
              v-model="temp.address"
              placeholder="地址"
              :disabled="dialogStatus==='update'"
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

        <el-button @click="dialogFormVisible1 = false">
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
import { partyTree } from '@/api/common'
import { partylist, addparty } from '@/api/party-platform/party-organization'
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import waves from '@/directive/waves' // waves
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import _ from 'lodash'
// import {helpPoorResults} from '@/api/povertyAlleviation'

export default {
  components: {
    Pagination
  },
  directives: { waves, elDragDialog },
  data() {
    return {
      disabledStatus: false,
      dialogVisible1: false,
      listLoading: true,
      tableKey: 0,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      disabledStatus: false,
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        partyname: [
          {
            required: true,
            message: '党组织名称不能为空',
            trigger: ['blur', 'change']
          }
        ],
        secretary: [
          {
            required: true,
            message: '支部书记不能为空',
            trigger: ['blur', 'change']
          }
        ],
        telephone: [
          {
            required: true,
            message: '电话不能为空',
            trigger: ['blur', 'change']
          }
        ],
        address: [
          {
            required: true,
            message: '地址不能为空',
            trigger: ['blur', 'change']
          }
        ]
      },
      labelPosition: 'right',
      temp: {
        id: undefined
      },
      dialogFormVisible1: false,
      dialogStatus: '',
      obj: {},
      tableData: [
        {
          cityName: '福州'
        }
      ],
      listQuery: {
        currentPage: 1,
        pageSize: 10
      },
      total: 0,
      list: [],
      partyname: ''
    }
  },

  async created() {
    if (window.innerWidth < 700) {
      this.labelPosition = 'top'
    }

    this.getList()
    const cc = await this.getPartyTree()

    this.dealCityArr(cc)
  },
  watch: {
    // cityId(n, o) {
    //   poorInformation({ cityId }).then((response) => {
    //     if (response.code === 200) {
    //       this.tableData = response.obj
    //     }
    //   })
    // }
  },
  methods: {
    //递归组织机构
    dealCityArr(arr) {
      let result = []
      arr.forEach((item) => {
        if (item.children && item.children.length > 0) {
          item.children = this.dealCityArr(item.children)
          result.push({
            label: item.partyname,
            children: item.children,
            partyId: item.partyId
          })
        } else {
          result.push({
            label: item.partyname,
            partyId: item.partyId
          })
        }
      })

      this.treeData = result

      return result
    },

    //获取组织机构
    async getPartyTree() {
      const cc = await partyTree()
      return cc.obj
    },
    handleDelete(row) {
      delpoorinfo(row.id).then((response) => {
        if (response.message === 200) {
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

    getList() {
      this.listLoading = true
      const params = Object.assign(
        {},
        {
          partyname: this.partyname,
          current: this.listQuery.currentPage,
          size: this.listQuery.pageSize
        }
      )

      partylist(params).then((res) => {
        this.listLoading = false
        if (res.code === 200) {
          const cc = [...res.obj]

          const total = cc.pop()
          const size = cc.pop()
          this.list = cc
          this.total = total.count
          this.listQuery.currentPage = size.current
          this.listQuery.pageSize = size.size
          console.log('this.listQuery', this.listQuery)
        }
      })
    },
    handleNodeClick(node) {
      this.partyname = node.label
      this.partyId = node.partyId
      this.getList()
    },

    //检验规则
    checkTenantName(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t('systenant.tenantName-required')))
      } else {
        callback()
      }
    },
    //编辑按钮
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible1 = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    //新增按钮
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible1 = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    //弹窗确定按钮，添加数据
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.disabledStatus = true

          this.temp = { ...this.temp, partyname: this.partyname }
          console.log('this.temp', this.temp)
          addparty(this.temp).then((response) => {
            console.log('response', response)
            if (response.code === 200) {
              // this.list.unshift(this.temp)
              this.disabledStatus = false
              this.dialogFormVisible1 = false
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
    //初始化数据
    resetTemp() {
      this.temp = {
        id: undefined
      }
    },
    //弹窗确定按钮，编辑数据
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = {}
          const cityName = this.temp.cityName.join(',')
          tempData.id = this.temp.id
          tempData.cityName = cityName
          tempData.poorName = this.temp.poorName
          tempData.cardNo = this.temp.cardNo
          tempData.address = this.temp.address
          tempData.telephone = this.temp.telephone
          tempData.isaz = this.temp.isaz
          tempData.azaddress = this.temp.azaddress
          tempData.type = this.temp.type
          this.disabledStatus = true
          editpoorinfo(tempData).then((response) => {
            if (response.message === 200) {
              this.disabledStatus = false
              this.dialogFormVisible1 = false
              this.$message({
                message: '修改成功',
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
    handleWarning(response) {
      this.$message({
        message: response.message || response,
        type: 'warning',
        duration: 2000
      })
      this.disabledStatus = false
    }
  }
}
</script>
<style lang="scss" scoped>
.party-organization {
  padding: 10px;
  .msearch {
    border-bottom: 1px #eee solid;
    padding-bottom: 20px;
    font-size: 15px;
  }
  .card-con {
    margin-bottom: 20px;
    margin-top: 20px;
    .data-con {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-top: 20px;
      justify-content: flex-end;
    }
    .data-item {
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
}
.data-item {
  text-align: right;
  margin-bottom: 15px;
}
</style>
