<template>
  <div class="party-activity">

    <div class="btn-con">
      <el-radio-group v-model="activeName">
        <el-radio-button label="PartyActivities">党建活动</el-radio-button>
        <el-radio-button label="PolicyDocument">政策文件</el-radio-button>
        <el-radio-button label="SubjectEducation">主题教育</el-radio-button>
      </el-radio-group>
    </div>

    <component
      :ref="currentTabComponent"
      v-bind:is="currentTabComponent"
      :data='list'
    />
  </div>
</template>
<script>
import waves from '@/directive/waves' // waves
import PartyActivities from './components/party-activities'
import PolicyDocument from './components/policy-document'
import SubjectEducation from './components/subject-education'
import { partyBuild, policyFile, themeEducation } from '@/api/workPartyBuilding'
export default {
  name: 'PartyActivity',
  components: {
    PartyActivities,
    PolicyDocument,
    SubjectEducation
  },
  directives: { waves },
  filters: {},
  data() {
    return {
      activeName: 'PartyActivities',
      list: []
    }
  },

  computed: {
    currentTabComponent() {
      // if (this.activeName === 'PartyActivities') {
      //   partyBuild().then((res) => {
      //     if (res.data.code === 200) {
      //       this.list = res.data.obj
      //     }
      //   })
      // } else if (this.activeName === 'PolicyDocument') {
      //   policyFile().then((res) => {
      //     if (res.data.code === 200) {
      //       this.list = res.data.obj
      //     }
      //   })
      // } else if (this.activeName === 'SubjectEducation') {
      //   themeEducation().then((res) => {
      //     if (res.data.code === 200) {
      //       this.list = res.data.obj
      //     }
      //   })
      // }
      return this.activeName
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClick(e) {
      console.log('this.radio1', this.activeName)
    }
  }
}
</script>
<style lang="scss" scoped>
.party-activity {
  padding: 10px;
  .card-con {
    margin-bottom: 20px;
    margin-top: 20px;
    .data-con {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-top: 20px;
    }
    .data-item {
      margin-right: 20px;
      margin-bottom: 20px;
    }
    .addbtn {
      display: flex;
      justify-content: flex-end;
      el-button {
        margin-top: 20px;
      }
    }
  }
  .btn-con {
    margin-bottom: 20px;
  }
}
</style>
