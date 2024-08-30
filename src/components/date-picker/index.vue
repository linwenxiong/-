<style lang="less" scoped>
.date-picker {
  display: flex;

  .shelf-jl {
    padding: 0 6px;
  }
}
</style>
<template>
  <div class="date-picker">
    <a-date-picker format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" v-model:value="compvalue[0]" @change="change" />
    <div class="shelf-jl"> - </div>
    <a-date-picker format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" v-model:value="compvalue[1]" @change="change" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
// import dayjs, { Dayjs } from 'dayjs';
const props = defineProps({
  value: {
    type: Array,
    defalut: () => []
  }
})

const emit = defineEmits(['update:value'])
const compvalue = ref(<any>[])
compvalue.value = props.value

function change(v) {
  // if (!compvalue.value[1] || dayjs(compvalue.value[1]) < dayjs(v)) {
  //   compvalue.value[1] = v
  // }
  emit('update:value', compvalue.value)
}

// 结束时间如果小于开始时间的处理
// function startTimeChange(v) {
//   if (!compvalue.value[1] || dayjs(compvalue.value[1]) < dayjs(v)) {
//     compvalue.value[1] = v
//   }
// }
</script>
