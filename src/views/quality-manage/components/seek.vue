<template>
    <a-form layout="inline" style="margin-bottom: 20px;" :model="formState"  @finish="onFinish">
        <a-form-item  label="评分项目" >
            <a-input style="width:180px"  v-model:value="formState.pfProject" :allowClear="true"  placeholder="请输入项目" ></a-input>
        </a-form-item>

        <a-form-item  label="评分用户" >
            <a-input 
                style="width:160px" 
                placeholder="请输入用户"
                v-model:value="formState.user"
                :allowClear="true"/>
        </a-form-item>

        <a-form-item  label="门店" >
            <organ-selec v-model:value="formState.md"/>
        </a-form-item>
        
        <a-form-item  label="类目" >
            <a-select
                :allowClear="true"
                style="width:160px" 
                placeholder="请选择类目"
                v-model:value="formState.leimu"
                :options="categoryOptions">
            </a-select>
        </a-form-item>

        <a-form-item label="评分时间">
            <a-range-picker 
                format="YYYY-MM-DD" 
                valueFormat="YYYY-MM-DD" 
                v-model:value="formState.time" 
                :placeholder="['开始时间', '结束时间']"
                :disabled-date="disabledDate"
                @change="timeChange" />
        </a-form-item>
        <a-form-item>
 
            <a-button type="primary" html-type="submit">搜 索</a-button>
            <a-button 
                type="primary" 
                style="margin-left: 5px" 
                @click="exportBtn"
                :loading="exportLoading"
                >导出报表
            </a-button>
        </a-form-item>
    </a-form>
</template>
<script>
import { defineComponent, ref } from 'vue'
import { apiGetItem } from '@/api/modules/product.js'
import organSelec from '../../../components/organ-select.vue'
import "dayjs/locale/zh-cn"
export default defineComponent({
   name: 'Seek',
   emits: ['callback', 'exportBack'],
   components: {
    organSelec
   },
   props: {
    exportLoading: {
        type: Boolean,
        default: false
    },
    tableType: {
        type: String,
        default: '1',
    }
   },
   setup(props, {emit}) {
    const formState = ref({
        pfProject: '',
        user: '',
        md: null,
        time: [],
        leimu: null
    })

    const disabledDate = (current) => {}
     
    const categoryOptions = ref([])
    // 类目选项
    const getCategoryOptions = async () => {
       const res = await apiGetItem()
       const { data } = res
       categoryOptions.value = data
    }
 
    const setSeekPrams = () => {
            const temp = {
                item: formState.value.leimu,
                pfxm: formState.value.pfProject,
                czy: formState.value.user,
                organ: formState.value.md,
                timeInterval: formState.value.time || []
            }
            return temp
        }
 
    getCategoryOptions()
    return {
        categoryOptions,
        disabledDate,
        timeChange(e) {},
        exportBtn() {
            const temp = setSeekPrams()
            emit('exportBack', temp)
        },
        onFinish() {
            const temp = setSeekPrams()
            emit('callback', temp)
        },
        formState,
    }
   }
})
</script>