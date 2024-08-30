export const columns = [
  {
    title: "ID",
    width: 80,
    dataIndex: "accID",
    key: "accID",
    fixed: "left",
  },
  {
    title: "门店",
    width: 60,
    dataIndex: "organ",
    key: "organ",
    fixed: "left",
  },
  {
    title: "记录人",
    fixed: "left",
    width: 75,
    dataIndex: "recManName",
    key: "recManName",
  },
  {
    title: "发起时间",
    width: 100,
    dataIndex: "acceptDateTime",
    key: "acceptDateTime",
  },
  {
    title: "来货时间",
    width: 100,
    dataIndex: "arrivalTime",
    key: "arrivalTime",
  },
 
  {
    title: "科别",
    width: 100,
    dataIndex: "goodsDeptName",
    key: "goodsDeptName",
  },
  {
    title: "条码",
    dataIndex: "barcode",
    width: 68,
    key: "barcode",
  },
  {
    title: "品名",
    width: 100,
    dataIndex: "goodsName",
    key: "goodsName",

  },
  {
    title: "单位",
    dataIndex: "unit",
    key: "unit",
    width: 50,
  },
  // {
  //   title: "来货进价",
  //   width: 100,
  //   dataIndex: "createTime",
  //   key: "createTime",
  // },
  {
    title: "来货进价",
    width: 70,
    dataIndex: "price",
    key: "price",
  },
  {
    title: "来货数量",
    dataIndex: "acceptQty",
    key: "acceptQty",
    width: 60,
  },
  {
    title: "问题数量",
    dataIndex: "defectiveQty",
    key: "defectiveQty",
    width: 90,
  },
  
  // {
  //   title: "来货品质问题金额",
  //   width: 100,
  //   dataIndex: "rexecutorName",
  //   key: "rexecutorName",
  // },

  {
    title: "异常率",
    width: 100,
    dataIndex: "feddback",
    key: "feddback",
  },
  
  {
    title: "问题描述",
    width: 100,
    dataIndex: "descrip",
    key: "descrip",
  },
  {
    title: "采购提供的解决方案",
    dataIndex: "solution",
    width: 100,
    key: "solution",
  },
  {
    title: "采购解决时间",
    dataIndex: "solDateTime",
    width: 100,
    key: "solDateTime",
  },
  {
    title: "问题是否解决",
    width: 68,
    dataIndex: "isSolve",
    key: "isSolve",
  },
  {
    title: "门店确认时间",
    width: 100,
    dataIndex: "defDateTime",
    key: "defDateTime",
  },
  {
    title: "备注",
    width: 100,
    dataIndex: "bz",
    key: "bz",
  },  
  {
    title: "图片",
    width: 150,
    dataIndex: "imgs",
    key: "imgs",
  },
];

export const exportColumns = [
  {
    width: 80,
    key: "accID",
  },
  {
    title: "门店",
    key: "organ",
  },
  {
    title: "记录人",
    key: "recManName",
  },
  {
    title: "发起时间",
    key: "acceptDateTime",
  },
  {
    title: "来货时间",
    key: "arrivalTime",
  },
 
  {
    title: "科别",
    key: "goodsDeptName",
  },
  {
    title: "条码",
    key: "barcode",
  },
  {
    title: "品名",
    key: "goodsName",

  },
  {
    title: "单位",
    key: "unit",
  },
  // {
  //   title: "来货进价",
  //   width: 100,
  //   dataIndex: "createTime",
  //   key: "createTime",
  // },
  {
    title: "来货进价",
    key: "price",
  },
  {
    title: "来货数量",
    key: "acceptQty",
  },
  {
    title: "问题数量",
    key: "defectiveQty",
  },
  // {
  //   title: "来货品质问题金额",
  //   width: 100,
  //   dataIndex: "rexecutorName",
  //   key: "rexecutorName",
  // },
  {
    title: '采购提供的解决方案',
    key: "solution"
  },
  {
    title: "问题是否解决",
    key: 'fix'
  },
  {
    title: "异常率",
    key: "feddback",
  },
  
  {
    title: "问题描述",
    key: "descrip",
  },
  {
    title: "采购提供的解决方案",
    key: "solution",
  },
  {
    title: "采购解决时间",
    key: "solDateTime",
  },
  {
    title: "问题是否解决",
    key: "isSolve",
  },
  {
    title: "门店确认时间",
    key: "defDateTime",
  },
  {
    title: "备注",
    key: "bz",
  },  
  {
    title: "图片",
    key: "imgs",
  },
];

export const statsSelect = [
  {
    label: '待解决',
    value: '待解决',
  },
  {
    label: '未解决',
    value: '未解决',
  },
  {
    label: '已解决',
    value: '已解决',
  }
];