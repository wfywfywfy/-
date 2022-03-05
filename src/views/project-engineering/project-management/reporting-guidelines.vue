<template>
  <div class="reporting-guidelines">
<component :is="cc" ></component>
  </div>
</template>
<script>
import one from './conponents/one'
import tow from './conponents/tow'
export default {
  name: 'ReportingGuidelines',
  components: {
    one,
    tow
  },
  data() {
    return {
      cc: 'one',
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      tableData: [
        {
          date: '王先生',
          name: '2233'
        }
      ]
    }
  },
  computed: {},
  watch: {
    '$route.query.orderId': {
      handler() {
        if (this.$route.query.orderId === '1') {
          this.cc = 'tow'
        } else {
          this.cc = 'one'
        }
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.reporting-guidelines {
  padding: 10px;
}
</style>
