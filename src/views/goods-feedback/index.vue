<template>
  <section class="goods-feedback-wrappy">
    <f-search @search="seek" @exportFile="exportFile" />
    <a-table :pagination="true" :loading="loading" :bordered="true" :scroll="{ x: 1200, y: publicStore.getLayoutHeight }"
      :dataSource="dataSource" :columns="columns">
      <template v-slot:bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex == 'feddback'">
          <div>
            <b :class="['feedback-ratio', getColor(record.feddback)]"></b> {{ record.feddback }}
          </div>
        </template>
        <template v-if="column.dataIndex == 'isSolve'">
          <a-tag :color="record.isSolve === '是' ? '#87d068' : '#f50'">
            {{ record.isSolve }}
          </a-tag>
        </template>
        <template v-if="column.dataIndex == 'imgs'">
          <div class="goods-feedback-img">
            <a-image :width="50" :height="50" v-for="(img, imgk) in record.imgs" :key="imgk" :src="img" />
          </div>
        </template>
      </template>
    </a-table>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import FSearch from './components/search.vue'
import { apiGetAccept } from '../../api/modules/product'
import { columns, exportColumns } from '../../constants/gfeddback-column'
import { downloadExcel } from '../../plugins/export-excel'

import { getDate } from '../../common/utils'
import { message } from 'ant-design-vue'
import { usePublicStore } from '../../stores'
const loading = ref(false)
const publicStore = usePublicStore()
const dataSource = ref([])
const time = ref({ start: '', end: '' })
// 导出文件
function exportFile() {
  if (!dataSource.value.length) {
    message.error('没有可导出的数据！')
    return
  }
  const parms = {
    tableDatas: dataSource.value,
    fileName: '货物异常情况统计',
    exclude: ['defeAmount', 'recMan', 'orderQty', 'ordBilNo', 'spec', 'fix', 'buyer', 'amount', 'ordBillNo', 'accID'],
    tableSheetHeader: exportColumns
  }
  downloadExcel(parms)

  // lindownload({
  //   tableData: dataSource.value,
  //   tableTitleList: columns,
  //   fileName: "货物异常情况统计",
  //   tabName: "tab",
  //   imgkey: 'imgs'
  // })
}
// const heght = window.innerHeight - 64-35-24-15-32-94-10
// console.log(heght)

// 查找
function seek(val) {
  getAccept({
    current: 1,
    ...val
  })
}
// 列表
async function getAccept({
  page = 100,
  current = 1,
  organ = '',
  goodsName = '',
  fix = '',
  time = []
}) {
  loading.value = true
  const res = await apiGetAccept({
    page,
    current,
    organ,
    goodsName,
    fix,
    time
  })
  const { data: { records } } = res
  const r = records.map((item) => {
    // 处理是否解决字段
    !item.fix ? item.isSolve = '' : item.fix === '已解决' ? item.isSolve = '是' : item.isSolve = '否'
    // 异常率
    item.feddback = (Math.floor(item.defectiveQty / item.acceptQty * 10000) || 0) / 100 + '%'
    return item
  })
  dataSource.value = r
  loading.value = false
}
// 获取字体颜色
const getColor = (feddback: string) => {
  const v = +feddback.split('%')[0]
  if (v >= 50) {
    return 'font-red'
  }
  return ''
}
const init = async () => {
  time.value.start = getDate()
  time.value.end = getDate()
}
init()
getAccept({})
</script>
<style lang="less">
.goods-feedback-wrappy {
  .ant-table-wrapper {
    margin-top: 10px;
  }

  .feedback-ratio {
    width: 8px;
    height: 8px;
    background: #06be53;
    display: inline-block;
    border-radius: 50%;
  }

  .font-red {
    background: red;
  }

  .goods-feedback-img {
    .ant-image {
      margin-right: 5px;
      margin-bottom: 5px;
      overflow: hidden;
    }

    .ant-image-mask-info {
      display: none;
    }
  }
}
</style>