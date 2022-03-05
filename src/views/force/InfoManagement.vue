<template>
  <div class="poor">
    <el-row>
      <el-col :span="3">
        <CityTree
          @getCityId="handleGetCityId"
          @getCityName="getCityName"
        />
      </el-col>
      <el-col :span="21">
        <div class="PovertyInfo">
          <div class="titcon">
            <div class="titleft">
              <span>当前位置:</span>
              <span>工作队信息管理</span>
            </div>
            <div class="titright">
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="handleCreate"
              >添加</el-button>
            </div>
          </div>

          <div class="table-con">
            <el-table
              border
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column
                label="地区"
                align="center"
                width="270"
              >
                <template slot-scope="{row}">
                  <span>{{row.cityName}}</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="villageName"
                label="村庄"
              >
              </el-table-column>
              <el-table-column
                prop="teamName"
                label="工作队名称"
              >
              </el-table-column>

              <el-table-column
                prop="memberNum"
                label="队员数量"
              >
              </el-table-column>

              <el-table-column
                label="操作"
                align="center"
                width="150px"
              >
                <template
                  slot-scope="{row}"
                  fixed='right'
                >

                  <el-button
                    type="text"
                    @click="handleUpdate(row)"
                  >修改</el-button>
                  <!-- <el-popover
                    :ref="'popover-' + row.teamId"
                    placement="top"
                    width="160"
                    title="确定删除此行数据？"
                    trigger="click"
                  >
                    <div>
                      <el-button
                        size="mini"
                        @click="$refs[`popover-` + row.teamId].doClose()"
                      >取消</el-button>
                      <el-button
                        type="primary"
                        size="mini"
                        @click="$refs[`popover-` + row.teamId].doClose();handleDelete(row)"
                      >确定</el-button>
                    </div>
                    <el-button
                      slot="reference"
                      type="text"
                      style="margin-left: 10px"
                    >
                      <i class="el-icon-delete" />删除
                    </el-button>
                  </el-popover> -->
                  <!-- <el-button type="text">走访记录</el-button> -->
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
            :visible.sync="dialogFormVisible1"
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

                    <el-col>
                      <el-form-item
                        label="工作队名称"
                        prop="teamName"
                      >
                        <el-input
                          v-model="temp.teamName"
                          placeholder="工作队名称"
                          maxlength="60"
                          clearable
                        />
                      </el-form-item>
                      <el-form-item
                        label="村庄"
                        prop="villageName"
                      >
                        <el-input
                          v-model="temp.villageName"
                          placeholder="村庄"
                          maxlength="60"
                          clearable
                        />
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { teamList, addteam, editteam } from '@/api/force/InfoManagement'
import waves from '@/directive/waves' // waves directive
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import CityTree from '@/components/cityTree'
import { changeQ } from '@/utils/fenye'
export default {
  components: {
    CityTree,
    Pagination
  },
  directives: { waves, elDragDialog },
  filters: {
    filterType(val) {
      if (val === '0') {
        return '脱贫户'
      } else if (val === '1') {
        return '脱贫不稳定户'
      }
    }
  },
  data() {
    return {
      listQuery: {
        currentPage: 1,
        pageSize: 10
      },
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
      disabledStatus: false,
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        cityName: [
          {
            required: true,
            message: '地区不能为空',
            trigger: ['blur', 'change']
          }
        ],
        poorName: [
          {
            required: true,
            message: '户主姓名不能为空',
            trigger: ['blur', 'change']
          }
        ],
        cardNo: [
          {
            required: true,
            message: '户主身份证号不能为空',
            trigger: ['blur', 'change']
          }
        ],
        address: [
          {
            required: true,
            message: '详细地址不能为空',
            trigger: ['blur', 'change']
          }
        ],
        telephone: [
          {
            required: true,
            message: '户主电话号码不能为空',
            trigger: ['blur', 'change']
          }
        ],
        isaz: [
          {
            required: true,
            message: '是否住在安置区不能为空',
            trigger: ['blur', 'change']
          }
        ],
        azaddress: [
          {
            required: true,
            message: '安置区地址不能为空',
            trigger: ['blur', 'change']
          }
        ],
        type: [
          {
            required: true,
            message: '户属性不能为空',
            trigger: ['blur', 'change']
          }
        ]
      },
      labelPosition: 'right',
      temp: {
        poorId: undefined
      },
      dialogFormVisible1: false,
      dialogStatus: '',
      obj: {},
      tableData: [
        {
          cityName: '福州'
        }
      ],

      cityId: '',
      cityName: '',
      total: 0
    }
  },

  created() {
    if (window.innerWidth < 700) {
      this.labelPosition = 'top'
    }

    this.getList()
  },
  watch: {},
  methods: {
    //获取城市名
    getCityName(cityName) {
      this.cityName = cityName
    },

    handleDelete(row) {
      delpoorinfo({ teamId: row.teamId }).then((response) => {
        console.log('responseresponse', response)
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

    getList() {
      let params = Object.assign(
        {},
        {
          cityId: this.cityId,

          current: this.listQuery.currentPage,
          size: this.listQuery.pageSize
        }
      )
      teamList(params).then((response) => {
        console.log('response', response)
        if (response.code === 200) {
          const cc = [...response.obj]
          const total = cc.pop()
          const pages = cc.pop()
          this.tableData = cc
          this.total = total.count
          console.log('this.tableData', this.tableData)
        }
      })
    },

    handleGetCityId(node) {
      this.cityId = node.cityId
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
      this.temp = Object.assign({}, row, {
        isaz: String(row.isaz),
        type: String(row.type)
      }) // copy obj

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
    //初始化数据
    resetTemp() {
      this.temp = {
        poorId: undefined
      }
    },
    //弹窗确定按钮，编辑数据
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = {}

          tempData.teamId = this.temp.teamId
          tempData.villageName = this.temp.villageName
          tempData.teamName = this.temp.teamName
          tempData.villageId = this.cityId
          tempData.cityName = this.cityName

          tempData.cityId = this.cityId
          this.disabledStatus = true
          editteam(tempData).then((response) => {
            if (response.code === 200) {
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

    //弹窗确定按钮，添加数据
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.disabledStatus = true

          this.temp = {
            ...this.temp,
            cityId: this.cityId,
            villageId: this.cityId,
            cityName: this.cityName
          }
          addteam(this.temp).then((response) => {
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

<style lang='scss' scoped>
.PovertyInfo {
  .heder-title {
    display: flex;
    align-items: center;
    .item-con {
      flex: 1;
      display: flex;
      align-items: center;
      .item {
        display: flex;
        background: rgb(59, 140, 229);
        color: white;
        font-size: 15px;
        align-items: center;
        height: 46px;
        .itemleft {
          padding: 0px 5px;
          border-right: 1px solid white;
        }
        .itemright {
          padding: 0px 5px;
        }
      }
      .item2 {
        background: rgb(84, 203, 84);
      }
      .item3 {
        background: rgb(255, 0, 0);
      }
      .item4 {
        background: rgb(252, 135, 31);
      }
      .item5 {
        background: rgb(138, 43, 226);
      }
    }
    .btn-con {
      el-button {
        margin-left: 20px;
      }
    }
  }
  .table-con {
    margin-top: 20px;
  }
}
.poor {
  padding: 10px;
}
.titcon {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .titleft {
    flex: 1;
  }
}
</style>
