<template>
  <!-- x: {{ elementX }} y:{{ elementY }} {{ isOutside }} {{ element }} -->
  <a-form layout="inline" style="padding: 15px 0">
    <a-form-item label="选择门店">
      <organ-select v-model:value="organCode"></organ-select>
    </a-form-item>
    <a-button type="primary" @click="addPointClick">新增绑定货架</a-button>
  </a-form>

  <div class="point-wrappy" ref="target" @click="handleClick" v-if="organCode">
    <h2 v-if="!planView[organCode]">暂无该门店的平面图</h2>
    <template v-else>

      <!-- 循环list -->
      <div v-for="point, index in  pointList" :key="index"
        :style="`position:absolute; z-index: 1; top:${point.locationY - icons.y}px; left:${point.locationX - icons.x}px;`">
        <a-popover title="货架信息">
          <template #content>
            <p>模板CD：{{ point.patternCD }}</p>
            <p>序号：{{ point.shelfNum }}</p>
          </template>
          <img src="../../assets/points.svg" alt="">
        </a-popover>
      </div>

      <!-- 移动跟随 -->
      <img v-if="addPoint"
        :style="`position:absolute; z-index: 1; top:${elementY - icons.y}px; left:${elementX - icons.x}px;`"
        src="../../assets/points.svg" alt="">

      <!-- 确定坐标 -->
      <div v-if="visible"
        :style="`position:absolute; z-index: 1; top:${element.y - icons.y}px; left:${element.x - icons.x}px;`">
        <img src="../../assets/points.svg" alt="">
      </div>

      <!-- <span class="point-dot" :style="`top:${element.y}px; left:${element.x}px;`"></span> -->
      <img class="planView" :src="planView[organCode]" alt="">
    </template>
  </div>

  <a-modal v-model:visible="visible" @ok="handleOk">
    <template #title>
      <div ref="modalTitleRef" style="width: 100%; cursor: move">绑定货架坐标</div>
    </template>
    <template #modalRender="{ originVNode }">
      <div :style="transformStyle">
        <component :is="originVNode" />
      </div>
    </template>

    <p>当前坐标：X:{{ element.x }} Y:{{ element.y }}</p>
    <a-form :model="shelves" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 19 }" autocomplete="off">
      <a-form-item label="所在门店" name="organ" v-bind="validateInfos.organ">
        <a-input v-model:value="shelves.organ" :readonly="true" />
      </a-form-item>
      <a-form-item label="模板CD" name="patternCD" v-bind="validateInfos.patternCD">
        <!-- <a-input v-model:value="shelves.patternCD" /> -->
        <a-select v-model:value="shelves.patternCD" show-search placeholder="input search text"
          :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null"
          :options="patternCDOptions" @search="handleSearch" @change="handleChange">
        </a-select>

      </a-form-item>
      <a-form-item label="序号" name="shelfNum" v-bind="validateInfos.shelfNum">
        <a-input v-model:value="shelves.shelfNum" />
      </a-form-item>
    </a-form>

  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Form, message } from 'ant-design-vue';
// import { ArrowDownOutlined } from '@ant-design/icons-vue';
import { useMouseInElement, useDebounceFn } from '@vueuse/core'
import OrganSelect from '../../components/organ-select.vue'
import { apiAddProductLocation, apiFindPatternCD, apiGetLocationByOrgan } from '../../api'
import { useTransformStyle } from './index'

interface PointLists {
  locationX: number;
  locationY: number;
  patternCD: string;
  shelfNum: number;
}

const pointList = ref(<PointLists[]>[])
const modalTitleRef = ref(null);
const { transformStyle } = useTransformStyle(modalTitleRef)

const useForm = Form.useForm;
const organCode = ref('')
const visible = ref(false)
const element = ref({ x: 50, y: 100 })
const shelves = ref({ organ: '', patternCD: '', shelfNum: '' })
const patternCDOptions = ref([])
const target = ref(null);
const addPoint = ref(false);
const { elementX, elementY, isOutside } = useMouseInElement(target)
const planView = {
  '1005': 'https://www.hzxqsy.com/shop/1005.jpg',
  '1006': '',
}

function addPointClick() {
  addPoint.value = true
}

function handleClick() {
  if (!addPoint.value) return
  element.value.x = elementX.value
  element.value.y = elementY.value
  shelves.value.organ = organCode.value
  visible.value = true
}

function getCenterPoint() {
  const icon = {
    width: 32,
    height: 32,
  }
  return {
    x: icon.width / 2 + 5,
    y: icon.height / 2 + 2,
  }
}

const icons = { // icon的偏移量
  x: getCenterPoint().x,
  y: getCenterPoint().y,
}

const rulesRef = {
  organ: [{ required: true, message: '请输入门店编码' }],
  patternCD: [{ required: true, message: '请输入模板CD' }],
  shelfNum: [{ required: true, message: '请输入序号', }],
}

const { resetFields, validate, validateInfos } = useForm(shelves, rulesRef);
async function handleOk() {
  validate()
    .then(async () => {
      await apiAddProductLocation({
        "organ": shelves.value.organ,
        "locationX": element.value.x,
        "locationY": element.value.y,
        "patternCD": shelves.value.patternCD,
        "shelfNum": shelves.value.shelfNum
      })
      message.success('保存成功')
      visible.value = false
      handleOrganChange()
    })
    .catch(err => {
      console.log('error', err);
    });
}

const debouncedFn = useDebounceFn(async (val) => {
  const res = await apiFindPatternCD({
    "code": val
  })
  const { data } = res
  const datas = data.map((item) => {
    return {
      label: item,
      value: item
    }
  })
  patternCDOptions.value = datas
}, 1000)

async function handleOrganChange() {
  const res = await apiGetLocationByOrgan({
    "organ": "1005"
  })
  pointList.value = res.data
}
handleOrganChange()
async function handleSearch(e) {
  debouncedFn(e)
}

function handleChange(e) {
  console.log(e)
}
</script>

<style lang="less" scoped>
.point-dot {
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: red;
  border-radius: 50%;
}


.point-wrappy {
  position: relative;
}

.planView {
  display: block;
  width: 1623px;
  height: 862px;
  border: 1px solid;
}
</style>