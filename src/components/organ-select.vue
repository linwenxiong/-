<template>
  <a-select :allowClear="true" :options="depOptions" :style="`width:${width}`" placeholder="请选择门店" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { apiGetDepOptions } from '../api/modules/product'
const props = defineProps({
  width: {
    type: String,
    default: '180px'
  }
})
const depOptions = ref([])
const getDepOptions = async () => {
  const res = await apiGetDepOptions()
  const { data } = res
  const v = data.map((item) => {
    return {
      label: `${item.orgname}(${item.organ})`,
      value: item.organ
    }
  })
  return v
}
const init = async () => {
  depOptions.value = await getDepOptions()
}
init()
</script>