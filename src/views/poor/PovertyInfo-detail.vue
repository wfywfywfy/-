<template>
  <div class="poor">
    <el-row>
      <el-col :span="21">
        <el-col>
          <div class="item">
            <div class="item1">所在地区</div>
            <div class="item2">天水市</div>
          </div>
          <el-col :span="8">
            <div class="item">
              <div class="item1">户编号</div>
              <div class="item2">00365</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <div class="item1">户主姓名</div>
              <div class="item2">王海兰</div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="item">
              <div class="item1">户主身份证</div>
              <div class="item2">6532144</div>
            </div>
          </el-col>
          <el-col
            :span="8"
            v-for="(item,index) in 7"
            :key="index"
          >
            <div class="item">
              <div class="item1">所在地区</div>
              <div class="item2">天水市</div>
            </div>
          </el-col>
        </el-col>

      </el-col>
      <el-col>
        <div class="PovertyInfo">
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
                label="户主姓名"
                align="center"
              >
                <template slot-scope="{row}">
                  <span>{{row.poorName}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="户主身份证号"
                align="center"
              >
                <template slot-scope="{row}">
                  <span>{{row.cardNo}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="详细地址"
                align="center"
              >
                <template slot-scope="{row}">
                  <span>{{row.address}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="户主电话号码"
                align="center"
              >
                <template slot-scope="{row}">
                  <span>{{row.telephone}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="是否住在安置区"
                align="center"
              >
                <template slot-scope="{row}">
                  <span>{{row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="安置区地址"
                align="center"
              >
                <template slot-scope="{row}">
                  <span>{{row.poorName}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="户属性"
                align="center"
              >
                <template slot-scope="{row}">
                  <span>{{row.type}}</span>
                </template>
              </el-table-column>

              <!-- <el-table-column
                label="审核状态"
                align="center"
                width="300px"
              >
                <template
                  slot-scope="{row}"
                  fixed='right'
                >
                  <el-button type="text">详情</el-button>
                  <el-button
                    type="text"
                    @click="handleUpdate(row)"
                  >编辑</el-button>

                  <el-popover
                    :ref="'popover-' + row.id"
                    placement="top"
                    width="160"
                    title="确定删除此行数据"
                    trigger="click"
                  >
                    <div>
                      <el-button
                        size="mini"
                        @click="$refs[`popover-` + row.id].doClose()"
                      > 取消</el-button>
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
              </el-table-column> -->

            </el-table>
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

                    <el-form-item
                      label="地区"
                      prop="cityName"
                    >
                      <el-cascader
                        style="width:300px;"
                        v-model="temp.cityName"
                        :options="options"
                        clearable
                      ></el-cascader>
                    </el-form-item>

                    <el-form-item
                      label="户主姓名"
                      prop="poorName"
                    >
                      <el-input
                        v-model="temp.poorName"
                        placeholder="姓名"
                        maxlength="64"
                        clearable
                      />
                    </el-form-item>

                    <el-form-item
                      label="户主身份证号"
                      prop="cardNo"
                    >
                      <el-input
                        v-model="temp.cardNo"
                        placeholder="身份证号"
                        maxlength="64"
                        clearable
                      />
                    </el-form-item>

                    <el-form-item
                      label="详细地址"
                      prop="address"
                    >
                      <el-input
                        v-model="temp.address"
                        placeholder="请输入详细地址"
                        maxlength="64"
                        clearable
                      />
                    </el-form-item>

                    <el-form-item
                      label="户主电话号码"
                      prop="telephone"
                    >
                      <el-input
                        v-model="temp.telephone"
                        placeholder="请输入手机号码"
                        maxlength="64"
                        clearable
                      />
                    </el-form-item>

                    <el-form-item
                      label="是否住在安置区"
                      prop="tenantCode"
                    >
                      <el-radio-group v-model="temp.radio">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="2">否</el-radio>
                      </el-radio-group>

                    </el-form-item>

                    <el-form-item
                      label="安置区地址"
                      prop="tenantCode"
                    >
                      <el-input
                        v-model="temp.tenantCode"
                        placeholder="请输入安置区地址"
                        maxlength="64"
                        clearable
                      />
                    </el-form-item>

                    <el-form-item
                      label="户属性"
                      prop="type"
                    >
                      <el-select
                        v-model="temp.type"
                        placeholder="请选择户属性"
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
import { seepoorinfo } from '@/api/poor/PovertyInfo.js'
import waves from '@/directive/waves' // waves directive
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui

import CityTree from '@/components/cityTree'
export default {
  components: {
    CityTree
  },
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
      disabledStatus: false,
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        tenantName: [
          {
            required: true,
            validator: this.checkTenantName,
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
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },

  created() {
    if (window.innerWidth < 700) {
      this.labelPosition = 'top'
    }
    this.getList()
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
    getList() {
      let params = {
        id: this.$route.query.id
      }
      console.log('params', params)
      seepoorinfo(params).then((response) => {
        if (response.code === 200) {
          this.obj = response.obj[0]
          console.log('this.obj', this.obj)
          this.tableData = response.obj[0].poorList
          console.log('this.obj', this.tableData)
        }
      })
    },

    handleDelete(row, index) {
      if (row.id) {
        this.delete(row.id)
      } else {
        // if (this.multipleSelection.length === 0) {
        //   this.handleWarning(this.$t('common.choose-delete'))
        //   return
        // }
        // this.$confirm(
        //   this.$t('common.confirm-batch-delete'),
        //   this.$t('common.batch-delete'),
        //   {
        //     confirmButtonText: this.$t('common.confirm'),
        //     cancelButtonText: this.$t('common.cancel'),
        //     type: 'warning'
        //   }
        // )
        //   .then(() => {
        //     this.delete(
        //       this.multipleSelection
        //         .map((item) => {
        //           return item.id
        //         })
        //         .join(',')
        //     )
        //   })
        //   .catch(() => {})
      }
    },
    goDetail() {
      this.$router.push({
        path: 'PovertyInfo-detail',
        query: {
          id: '11'
        }
      })
    },
    handleGetCityId(city) {
      // console.log(city)
      this.cityId = city
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
          // const tempData = {}
          // tempData.id = this.temp.id
          // tempData.tenantCode = this.temp.tenantCode
          // tempData.tenantName = this.temp.tenantName
          // tempData.tenantContact = this.temp.tenantContact
          // tempData.tenantEmail = this.temp.tenantEmail
          // tempData.tenantTel = this.temp.tenantTel
          this.disabledStatus = true
          // updateSysTenant(tempData).then((response) => {
          //   if (response.message === 'success') {
          //     this.disabledStatus = false
          //     this.dialogFormVisible1 = false
          //     this.$message({
          //       message: this.$t('common.edit-success'),
          //       type: 'success',
          //       duration: 2000
          //     })
          //     this.handleReset()
          //   } else {
          //     this.handleWarning(response)
          //   }
          // })
        }
      })
    },
    //弹窗确定按钮，添加数据
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.disabledStatus = true
          const cityName = this.temp.cityName.join(',')
          this.temp = Object.assign({}, this.temp, {
            cityName
          })

          // addSysTenant(this.temp).then((response) => {
          //   if (response.message === 'success') {
          //     this.list.unshift(this.temp)
          //     this.disabledStatus = false
          //     this.dialogFormVisible1 = false
          //     this.$message({
          //       message: this.$t('common.add-success'),
          //       type: 'success',
          //       duration: 2000
          //     })
          //     this.handleReset()
          //   } else {
          //     this.handleWarning(response)
          //   }
          // })
        }
      })
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
.item {
  display: flex;
  align-items: center;
  padding: 0px 20px;
  margin-bottom: 25px;
  .item1 {
    font-size: 15px;
    text-align: right;
    margin-right: 10px;
    white-space: nowrap;
    width: 130px;
  }
  .item2 {
    font-size: 15px;
    flex: 0 0 1;
  }
}
</style>
