<template>
  <div>
    <a-table :scroll="{ y: 520 }" :dataSource="dataSource" :columns="columns"
      :pagination="{ pageSize: 10, showSizeChanger: false }" bordered>
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex == 'beizhu'">
          <b class="pinfen-special-text">{{ record.beizhu }}</b>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { pingfenAllColumns } from '@/constants/pinzhi-column.js'

export default defineComponent({
  name: 'pinfenAllTab',
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {
      columns: pingfenAllColumns
    }
  }
})
</script>
<style lang="less">
.ant-table table {
  font-size: 12px;
}
</style>