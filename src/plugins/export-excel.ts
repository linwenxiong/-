import ExportJsonExcel from "js-export-excel";
interface Option {
  fileName: string;
  datas: any;
}
// 下载
function download({ fileName, datas }) {
  const option: Option = {
    fileName,
    datas,
  };
  var toExcel = new ExportJsonExcel(option); //new
  toExcel.saveExcel(); //保存
}

export function downloadExcel({
  tableDatas,
  fileName,
  exclude,
  tableSheetHeader,
}) {
  // --------------------------
  const sheetFilter = Object.keys(tableDatas[0]); // 导出列
  exclude.forEach((item) => {
    // 剔除列
    const index = sheetFilter.indexOf(item);
    if (index !== -1) {
      sheetFilter.splice(index, 1);
    }
  });
  // --------------------------获取每一列的标题
  const sheetHeader = sheetFilter.map((item) => {
    const zv = tableSheetHeader.find((pf) => {
      return item === pf.key;
    });
    return zv?.title;
  });
  // 处理图片情况
  // tableDatas.forEach((item) => {

  // })

  const datas = [
    {
      sheetData: tableDatas,
      sheetName: fileName, //底部的tab名称
      sheetFilter,
      sheetHeader,
      columnWidths: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5], // 每一列的宽度
    },
  ];
  download({
    fileName,
    datas,
  });
}
