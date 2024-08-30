<template>
  <div class="self-query-header">
    <div class="self-query-header-left">
      <a-form layout="inline" labelAlign="left">
        <a-form-item :label="item.label" v-for="item, index in column" :key="index">
          <!-- 普通输入框 -->
          <a-input v-if="item.type === 'text'" v-model:value="compvalue[item.key]" :allowClear="true" />
          <!-- 门店下拉 -->
          <organ-selec v-else-if="item.type === 'organ-select'" width="100%" v-model:value="compvalue[item.key]" />
          <!-- 时间区间 -->
          <template v-else-if="item.type === 'time-zone'">
            <a-date-picker format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" v-model:value="compvalue[item.key][0]" />
            <div class="shelf-jl"> - </div>
            <a-date-picker format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" v-model:value="compvalue[item.key][1]" />
          </template>
        </a-form-item>
      </a-form>
    </div>
    <div class="self-query-header-right">
      <a-button class="button" type="primary" @click="emit('seekClick')">
        <template #icon><search-outlined /></template>搜索
      </a-button>
      <a-button class="button" @click="reset">
        <template #icon><sync-outlined /></template>重置
      </a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { SearchOutlined, SyncOutlined } from '@ant-design/icons-vue';
import organSelec from '../components/organ-select.vue'
import { getDate } from '../common/utils'
interface Item {
  label: string
  type: string
  key: string
}
const props = defineProps({
  column: {
    type: Array<Item>,
    default: () => []
  }
})
const compvalue = ref({})

function init() {
  props.column.forEach((item) => {
    if (item.type === 'time-zone') {
      compvalue.value[item.key] = [getDate(), getDate()]
    } else {
      compvalue.value[item.key] = ''
    }
  })
}
init()
const emit = defineEmits(['update:value', 'seekClick'])
emit('update:value', compvalue.value)
function reset() {
  init()
}

</script>
<style lang="less">
.self-query-header {
  display: flex;
}

.self-query-header-left {
  flex: 1;
}

.self-query-header-right {
  width: 150px;
  border-left: 1px solid #e3e3e3;
  padding-left: 19px;

  .button {
    margin-top: 10px;
  }
}</style>