export const shelfTableColumns = [
  {
    title: 'ID',
    dataIndex: 'patternID',
    key: 'patternID'
  },
  {
    title: '货架名称',
    dataIndex: 'shelfCD',
    key: 'shelfCD'
  },
  {
    title: '版本号',
    dataIndex: 'version',
    key: 'version'
  },
  {
    title: '所处门店',
    dataIndex: 'organ',
    key: 'organ'
  },
  {
    title: '模板编码',
    dataIndex: 'patternCD',
    key: 'patternCD'
  },{
    title: '操作',
    dataIndex: 'control',
    key: 'control'
  }
]
export const dialogDataTableColumns = [
  {
    title: '商品名称',
    dataIndex: 'productName',
    key: 'productName',
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
  },
  {
    title: '损耗率%',
    dataIndex: 'lossMargin',
    key: 'lossMargin',
    sorter: {
      compare: (a, b) => a.lossMargin - b.lossMargin
    }
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
]

export const stockTableColumns = [{
  title: '商品名称',
  key: 'productName',
  dataIndex: 'productName'
},
{
  title: '货架号',
  key: 'shelfNum',
  dataIndex: 'shelfNum',
  
},
{
  title: '商品条码',
  key: 'productCD',
  dataIndex: 'productCD',
},
{
  title: '店名',
  key:'storeCD',
  dataIndex:'storeCD',
},
{
  title: '规格型号',
  key: 'unit',
  dataIndex: 'unit',
},
{
  title: '货架层',
  key: 'sequenceNum',
  dataIndex: 'sequenceNum',
},
{
  title: '占位宽',
  key: 'width',
  dataIndex: 'width'
},
{
  title: '0库存天数',
  key: 'zeroStockDay',
  dataIndex: 'zeroStockDay',
},
{
  title: '空货位预警',
  key: 'emptyWarning',
  dataIndex: 'emptyWarning',
},
]

export const queryColumn = [
  {
    label: '商品条码',
    key: 'barcode',
    type: 'text'
  },
  // {
  //   label: '货架编号',
  //   key: 'huojiacode',
  //   type: 'text'
  // },
  // {
  //   label: '模板编号',
  //   key: 'mobancode',
  //   type: 'text',
  // },
  // {
  //   label: '所处门店',
  //   key: 'organ',
  //   type: 'organ-select',
  // },
  {
    label: '发起时间',
    key: 'times',
    type: 'time-zone',
  },
]