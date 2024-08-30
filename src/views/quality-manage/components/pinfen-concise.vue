<template>
    <a-table :dataSource="dataSource" :columns="columns"  :pagination="{ pageSize: 9, showSizeChanger:false }" bordered>
        <template v-slot:bodyCell="{ column, record, index}">
            <template v-if="column.dataIndex == 'OnJobStatus'">
                <span >
                    <a-tag color="red" v-if="record.OnJobStatus == '未确认'">
                        {{ record.OnJobStatus }}
                    </a-tag>
                    <a-tag color="green" v-else>
                        {{ record.OnJobStatus }}
                    </a-tag>
                </span>
            </template>
            <template v-if="column.dataIndex == 'score'">
                <i :class="['p-icons', +record.score < 60 ? 'red': +record.score < 80 ? 'yellow': 'green' ]"></i>
                {{ record.score }}
            </template>
            <template v-if="column.dataIndex == 'operate'">
                <a-button size="small" type="link" style="font-size:12px" @click="open(index, record.name, record.time)">查看详情</a-button>
            </template>
        </template>
    </a-table>
</template>
<script setup lang="ts">
interface Props {
    dataSource: [], // 数据源
    columns: [],// 列标题
}
const props = withDefaults(defineProps<Props>(), {
    dataSource: () => [],
    columns: () => []
})
interface Emits {
  (
    e: 'click', 
    index: number,
    name: string,
    time: string
  ): void
}
const emit = defineEmits<Emits>()
function open( index, name, time ) {
    emit('click', index, name, time  )
}
</script>
<style lang="less" scoped>
.p-icons {
    border-radius: 50%;
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #cfcfcf;
    &&.red { 
        background-color: red;
    }
    &&.yellow {
        background-color: #ffa60b;
    }
    &&.green {
        background-color: #06c106;
    }
}
</style>