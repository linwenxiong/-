<template>
  <a-form layout="inline" style="margin-top: 15px">
      <a-form-item label="商品名称">
        <a-input
          placeholder="请输入商品名称" 
          v-model:value="seekData.goodsName" 
          :allowClear="true"/>
      </a-form-item>
      <a-form-item label="门店">
        <organ-selec v-model:value="seekData.organ"/>
      </a-form-item>
      <a-form-item label="状态" style="width:150px" >
        <a-select
          v-model:value="seekData.fix"
          :allowClear="true"
          :options="statsSelect"
          placeholder="请选择" />
      </a-form-item>
      <a-form-item label="发起时间">
        <a-date-picker v-model:value="time.start" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" @change="startTimeChange"/> - 
        <a-date-picker v-model:value="time.end" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" :disabled-date="disabledDate"/>
      </a-form-item>
      <a-button type="primary" html-type="submit" @click="search">搜 索</a-button>
      <a-button type="primary" style="margin-left: 5px" @click="exportFile">导出报表</a-button>
    </a-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import dayjs, { Dayjs } from 'dayjs';
import { statsSelect } from '../../../constants/gfeddback-column'
import organSelec from '../../../components/organ-select.vue'
import { getDate } from '../../../common/utils'
interface SearchData {
  goodsName: string
  organ: string
  fix: string
  time: Array<string>
}
interface Time {
  start: string
  end: string
}
const emit = defineEmits(['search', 'exportFile'])
const seekData = ref(<SearchData>{})
const time = ref(<Time>{})
const exportFile = () => {
  emit('exportFile')
}
// 结束时间如果小于开始时间的处理
const startTimeChange = (v) => {
  if( !time.value.end ||  dayjs(time.value.end) <  dayjs(v) ) {
    time.value.end = v
  }
}
// 限制不可选择的日期
const disabledDate = (currentDate: Dayjs) => {
  return currentDate.diff(time.value.start) < 0 
}

const search = () => {
  seekData.value.time = [time.value.start, time.value.end]
  emit('search', seekData.value)
}
const init = () => {
  time.value.start = getDate()
  time.value.end = getDate()
}
init()
</script>