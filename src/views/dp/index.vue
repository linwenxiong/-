<template>
  <div class="dp-box">
    <!-- <h1 class="dp-title">配送中心拣货绩效</h1> -->
    <div class="table-header">
      <div class="table__cell" v-for="title, index in titleList" :key="index
        ">{{ title }}</div>
    </div>

    <div class="table-content-wrap">
      <h2 class="table-content-loading" v-if="loading">数据加载中...</h2>
      <div class="table-content" :style="`top:-${top}px`">
        <div class="table__row" v-for="item, index in listdata" :key="index">
          <div class="table__cell">{{ item.jobNumber }}</div>
          <div class="table__cell" style="font-weight: bold;">{{ item.name }}</div>
          <div class="table__cell">{{ item.rowNumber }}</div>
          <div class="table__cell">{{ item.goodsNum }}</div>
          <div class="table__cell" style="font-weight: bold;">{{ item.todayPerformance }}</div>
          <div class="table__cell" style="font-weight: bold;">{{ item.monthPerformance }}</div>
          <div class="table__cell">{{ item.trackerMethod }}</div>
        </div>
      </div>
    </div>


  </div>
</template>
<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'

import { apiGetPerformance } from '../../api'

const titleList = [
  '工号',
  '姓名',
  '行数',
  '数量',
  '今日绩效',
  '当月绩效',
  '核算方式',
]



const listdata = ref(<any>[])
const top = ref(0)
const loading = ref(true)

let boxHeight = 0
let windowheight = 0
let timer = 0
let counter = 0

async function getPerformance() {
  const { data } = await apiGetPerformance({})
  listdata.value = data
  loading.value = false

  nextTick(() => {
    boxHeight = document.querySelector('.table-content')?.clientHeight || 0
    windowheight = document.querySelector('.table-content-wrap')?.clientHeight || 0
    console.log('就绪了', boxHeight, windowheight)
    if (counter === 0) {
      setTimeout(() => {
        startScroll(500)
        counter++
      }, 1000)
    } else {
      startScroll(500)
    }
  })

}

const init = async () => {
  await getPerformance()
  if (listdata.value.length) {
    setInterval(() => {
      getPerformance()
    }, 8000)
  }
}

const startScroll = (canMove) => {
  clearInterval(timer)
  timer = setInterval(() => {
    if (top.value < canMove) {
      top.value++
    } else {
      top.value = 0
    }
  }, 30)

}

onMounted(() => {
  init()
})
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

.dp-box {
  width: 100%;
}

.dp-title {
  padding: 30px;
  text-align: center;
  font-size: 35px;
  font-weight: bold;
}

.table-header {
  padding: 12px 0px;
  display: flex;
  background-color: #f5f7fa;
  border-bottom: 1px solid #dbdbdb;
  font-weight: bold;

  .table__cell {
    flex: 1;
    padding: 0 15px;
    // border-right: 1px solid #dbdbdb
  }
}

.table-content-wrap {
  overflow: hidden;
  position: fixed;
  top: 55px;
  left: 0;
  right: 0;
  bottom: 0;
}

.table-content {
  // overflow: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;

  .table__row {
    display: flex;
    border-bottom: 1px solid #dbdbdb;
    font-size: 18px;
  }

  .table__cell {
    flex: 1;
    padding: 15px;
    border-right: 1px solid #dbdbdb;
  }
}

.table-content-loading {
  text-align: center;
  padding-top: 50px;
}
</style>