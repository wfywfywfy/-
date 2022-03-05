<template>
  <el-tree
    :data="treeData"
    :props="defaultProps"
    @node-click="handleNodeClick"
    node-key="cityId"
  ></el-tree>
</template>

<script>
import { cityTree } from '@/api/common'

export default {
  // props: {
  //   cityId: {
  //     type: String,
  //     default: ''
  //   }
  // },
  data() {
    return {
      cityId: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'cityName'
      }
    }
  },
  async created() {
    const cc = await this.getPartyTree()

    this.dealCityArr(cc)
  },
  methods: {
    //递归城市
    dealCityArr(arr) {
      let result = []
      arr.forEach((item) => {
        if (item.children && item.children.length > 0) {
          item.children = this.dealCityArr(item.children)
          result.push({
            cityName: item.cityName,
            cityId: item.cityId,
            children: item.children
          })
        } else {
          result.push({
            cityName: item.cityName,
            cityId: item.cityId
          })
        }
      })

      this.treeData = result

      return result
    },
    //获取组织机构
    async getPartyTree() {
      const cc = await cityTree()
      return cc.obj
    },

    handleNodeClick(node) {
      this.$emit('getCityId', {
        cityId: String(node.cityId),
        cityName: String(node.cityName)
      })
    }
  }
}
</script>

<style>
</style>
