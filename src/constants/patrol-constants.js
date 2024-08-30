export const queryColumn = [
  {
    label: '任务ID',
    key: 'taskID',
    type: 'text',
  },
  {
    label: '姓名',
    key: 'name',
    type: 'text',
  },
  {
    label: '门店',
    key: 'organ',
    type: 'organ-select',
  },
  {
    label: '日期',
    key: 'dateTime',
    type: 'time-zone',
  }
]
export const tableColumns = [
  {
    title: '任务ID',
    dataIndex: 'taskID',
    key: 'taskID'
  },
  {
    title: '发起时间',
    dataIndex: 'taskDate',
    key: 'taskDate'
  },
  {
    title: '巡检门店',
    dataIndex: 'orgName',
    key: 'orgName'
  },
  {
    title: '区域',
    dataIndex: 'taskAreaName',
    key: 'taskAreaName'
  },
  {
    title: '巡检员',
    dataIndex: 'taskManName',
    key: 'taskManName'
  },
  {
    title: '总得分',
    dataIndex: 'score',
    key: 'score'
  },
  {
    title: '整改率(%)',
    dataIndex: 'recNum',
    key: 'recNum'
  },
  {
    title: '巡检次数',
    dataIndex: 'organNum',
    key: 'organNum'
  },
  {
    title: '操作',
    dataIndex: 'control',
    key: 'control'
  }
]

export const modalTableColumns = [
  {
    width: 500,
    title: '项目',
    dataIndex: 'name',
    key: 'id'
  },
  {
    width: 50,
    title: '得分',
    dataIndex: 'score',
    key: 'id'
  },
  {
    title: '合格',
    dataIndex: 'qualified',
    key: 'qualified'
  },
  {
    title: '问题描述',
    dataIndex: 'describe',
    key: 'describe'
  },
  {
    title: '图片',
    dataIndex: 'imgs',
    key: 'imgs'
  },
  {
    title: '状态',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '整改图片',
    dataIndex: 'imgs2',
    key: 'imgs2'
  },
  {
    width: 75,
    title: '整改人',
    dataIndex: 'submitManName',
    key: 'submitManName'
  },
  {
    title: '备注',
    dataIndex: 'submitData',
    key: 'submitData'
  },
  {
    width: 100,
    title: '时间',
    dataIndex: 'submitTime',
    key: 'submitTime'
  },
]

/**
 * 导出需要的字段
 */
export const EXPORTCOULMN = [
  { key: 'taskID', title: '任务ID' },
  { key: 'managerName', title: '巡检人员' },
  { key: 'orgName', title: '巡检门店' },
  { key: 'area', title: '巡检区域' },
  { key: 'checkingProject', title: '巡检项目' },
  { key: 'checkingItem', title: '标准' },
  { key: 'score', title: '打分' },
  { key: 'describe', title: '问题描述' },
  { key: 'type', title: '状态' },
  { key: 'submitManName', title: '整改人' },
  { key: 'submitData', title: '备注' },
  { key: 'submitTime', title: '提交时间' },
]



export const PINGFENSTATUS = {
  0: '待整改',
  1: '待整改',
  2: '已整改（待门店干部审核）',
  3: '已整改（待督导/采购审核）',
  4: '审核通过(整改结束)',
  5: '驳回(干部审核不通过)',
  6: '驳回(督导审核不通过)',
}