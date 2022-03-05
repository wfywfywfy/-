<template>
  <div class="family-data">
    <el-card class="card-con">
      <div class="data-con">
        <div class="data-item">
          <span style="margin-right:10px">审核状态:</span>
          <el-select
            v-model="SearchForm.author"
            placeholder="Type"
            clearable
            class="filter-item"
            style="width: 150px"
          >
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>

        <div class="data-item">
          <span style="margin-right:10px">乡镇:</span>
          <el-select
            v-model="SearchForm.author"
            placeholder="Type"
            clearable
            class="filter-item"
            style="width: 150px"
          >
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="data-item">
          <span style="margin-right:10px">行政村:</span>
          <el-select
            v-model="SearchForm.author"
            placeholder="Type"
            clearable
            class="filter-item"
            style="width: 150px"
          >
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="data-item">
          <span style="margin-right:10px">月份:</span>
          <el-select
            v-model="SearchForm.author"
            placeholder="Type"
            clearable
            class="filter-item"
            style="width: 150px"
          >
            <el-option
              v-for="item in calendarTypeOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        <div class="data-item">
          <span style="margin-right:10px">姓名:</span>
          <el-input
            v-model="SearchForm.title"
            placeholder="请输入姓名"
            style="width: 150px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
        </div>
        <div class="data-item">
          <span style="margin-right:10px">身份证号:</span>
          <el-input
            v-model="SearchForm.title"
            placeholder="请输入身份证号"
            style="width: 300px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
        </div>

        <div class="data-item">
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
            style='margin-left:10px'
          >
            查询
          </el-button>

          <el-button
            v-waves
            class="filter-item"
            type="primary"
            @click="handleCreate"
          >
            批量审核
          </el-button>
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            @click="handleCreate"
          >
            导出审核
          </el-button>
        </div>
      </div>
    </el-card>

    <el-table
      :key="tableKey"
      border
      v-loading="listLoading"
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>

      <el-table-column
        label="审核类型"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{  }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="乡(镇)"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{  }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="行政村"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{  }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="证件号码"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{ row.importance }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="户主姓名"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{  }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="与户主关系"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{  }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="信息修改原因"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{  }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="申请审核人"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{  }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="申请审核时间"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{  }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核状态"
        class-name="status-col"
      >
        <template slot-scope="{row}">
          <span>{{  }}</span>
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
            @click="handleToView(row)"
          >
            查看
          </el-button>
          <!-- <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button> -->

        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item
          label="importance"
          prop="type"
        >
          <el-select
            v-model="temp.importance"
            placeholder="请选择"
          >
            <el-option
              v-for="item in importanceOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="Date"
          prop="timestamp"
        >
          <el-date-picker
            v-model="temp.timestamp"
            type="datetime"
            placeholder="Please pick a date"
          />
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="查看"
      :visible.sync="dialogVisible"
    >
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item
          label="Type"
          prop="type"
        >
          <span>
            {{temp.importance}}
          </span>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >
          确定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import { fetchList } from '@/api/article'
import waves from '@/directive/waves' // waves
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import _ from 'lodash'

export default {
  name: 'FamilyData',
  components: {
    Pagination
  },
  directives: { waves },
  data() {
    return {
      list: null,
      tableKey: 'id',
      total: 0,
      listLoading: true,
      importanceOptions: [1, 2, 3],
      calendarTypeOptions: ['Ruth', 'Richard', 'Timothy', 'Carol', 'Ronald'],
      SearchForm: {
        author: '',
        importance: '',
        title: ''
      },
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined
      },
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogVisible: false,
      textMap: {
        update: '编辑',
        create: '新建'
      },
      dialogStatus: 'create'
    }
  },

  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    getList() {
      this.listLoading = true
      const params = _.assign({}, this.listQuery, this.SearchForm)
      console.log('params', params)
      fetchList(params).then((res) => {
        this.list = res.data.items
        this.total = res.data.total
        console.log('this.list', res)
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleToView(row) {
      this.dialogVisible = true
      _.assign(this.temp, row)
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        timestamp: new Date()
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
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Created Successfully',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = _.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = _.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Update Successfully',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleDelete(row) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.family-data {
  padding: 10px;
  .card-con {
    margin-bottom: 20px;
    margin-top: 20px;
    .data-con {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    .data-item {
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>
