<template>
  <div
    v-loading.fullscreen.lock="isLoading"
    class="l--filter-table"
    element-loading-background="rgba(255, 255, 255, 0.7)"
  >
    <div
      ref="filterWrap"
      class="filter-wrap"
    >
      <slot name="action" />
    </div>
    <div
      class="table-wrap"
      :style="{height: tableWrapHeight}"
    >
      <div
        ref="tableInner"
        class="table-inner full-height"
      >
        <slot />
      </div>
    </div>
    <div
      ref="pageWrap"
      class="page-wrap text-right"
    >
      <slot name="page" />
      <el-pagination
        layout="total, prev, pager, next, jumper"
        :current-page="page.curPageNo"
        :page-size="page.pageSize"
        :total="page.total"
        @size-change="$emit('onPageSizeChange', $event)"
        @current-change="$emit('onPageIndexChange', $event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutFilterTable',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default () {
        return {
          total: 0,
          curPageNo: 1,
          pageSize: 60
        }
      }
    }
  },
  data () {
    return {
      tableWrapHeight: '0px'
    }
  },
  mounted () {
    this.calculateTableInnerHeight()
  },
  methods: {
    calculateTableInnerHeight () {
      const FILTER = this.$refs.filterWrap.offsetHeight
      const PAGINATION = this.$refs.pageWrap.offsetHeight
      // console.log(`${FILTER_WRAP} ${PAGINATION}`)
      this.tableWrapHeight = `calc(100% - 5px - ${FILTER + PAGINATION}px)`
    }
  }
}
</script>

<style lang="less" scoped>
  .l--filter-table {
    display: flex;
    height: 100%;
    padding: 40px;
    flex-direction: column;
    align-items: stretch;
  }

  .filter-wrap {
    overflow-x: hidden;
    overflow-y: auto;

    .filter-header {
      margin-bottom: 20px;
    }
  }

  .table-wrap {
    flex-grow: 1;

    .table-inner {
      overflow-x: hidden;
      overflow-y: auto;
    }
  }

  .page-wrap {
    height: 40px;
    padding-top: 10px;

    /deep/ .el-pagination {
      padding: 0;
    }
  }
</style>
