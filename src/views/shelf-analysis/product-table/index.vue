<template>
  <a-table :dataSource="tableDataSource" :columns="tableColumns" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { apiGetPatternSaleReportByDay } from '../../../api'
const tableDataSource = ref([])
const tableColumns = ref([
  {
    title: '商品名称',
    dataIndex: 'productName',
    key: 'productName'
  },
  {
    title: '货架编码',
    dataIndex: 'shelfNum',
    key: 'shelfNum'
  },
  {
    title: '日期',
    dataIndex: 'dataRange',
    key: 'dataRange'
  }, {
    title: '商品条码',
    dataIndex: 'barcode',
    key: 'barcode'
  }, {
    title: '模板编码',
    dataIndex: 'patternCD',
    key: 'patternCD'
  }, {
    title: '面层深',
    dataIndex: 'goodsSKU',
    key: 'goodsSKU'
  }, {
    title: '销售数量',
    dataIndex: 'salesNumber',
    key: 'salesNumber',
    sorter: {
      compare: (a, b) => a.salesNumber - b.salesNumber
    }
  },
  {
    title: '销售金额',
    dataIndex: 'salesPrice',
    key: 'salesPrice',
    sorter: {
      compare: (a, b) => a.salesPrice - b.salesPrice
    }
  }, {
    title: '毛利率',
    dataIndex: 'grossMargin',
    key: 'grossMargin'
  },
  {
    title: '损耗数量',
    dataIndex: 'lossNum',
    key: 'lossNum',

  }, {
    title: '损耗价格',
    dataIndex: 'lossPrice',
    key: 'lossPrice'
  },
])
async function getPatternSaleReportByDay() {
 const res = await apiGetPatternSaleReportByDay({
  "patternCD":"M20230529185812225",
  "patternID":"1034",
  "shelfNum":"1","organ":"1005","startDay":"2023-09-01","endDay":"2023-09-04"})
 console.log(res)
 const { data } = res
 tableDataSource.value = data
}
getPatternSaleReportByDay()
</script>