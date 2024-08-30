var uri = 'data:application/vnd.ms-excel;base64,',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
                             + '<head><meta http-equiv="Content-type" content="text/html;charset=UTF-8" /><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>'
                             + '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64 = function(s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            },
            format = function(s, c) {
                return s.replace(/{(\w+)}/g, function(m, p) {
                    return c[p];
                })
            };
var tableToExcel =  function({ tableData, tabName, tableTitleList, imgkey}) {
    var thStr = ''
    var tdStr = ''
    // 标题
    tableTitleList.forEach((item)=>{
        thStr += `<th>${item.title}</th>`
    })
    // 行
    tableData.forEach((item) => {
        let tr = '<tr>'
        tableTitleList.forEach((items) => {
            let td = ''
            if(items.key === imgkey && item[imgkey].length) { // 遇到图片
                let imgs = ''
                td = `<td style='mso-number-format:"\@"' height=${item[imgkey].length * 50}>`
                item[items.key] && item[items.key].forEach((img ) => {
                    imgs+= `<img width=50 height=50 src=${img}><br>`
                })
                td += imgs
            } else {
                td += `<td style='mso-number-format:"\@"'>`+ empty(item[items.key])
            }
            td+= '</td>'
            tr += td
        })
        tr+= '</tr>'
        tdStr += tr
    })

    var html = `<tbody><tr style="background:#e9e9e9; border:1px solid #c3cbdd; color: #000; font-size: 15px; font-weight: bold; background:#cfcfcf">${thStr}</tr>${tdStr}</tbody>`

    var ctx = {
        worksheet : tabName || 'Worksheet',
        table : html
    }
    return uri + base64(format(template, ctx));
}

interface DowPrams {
    tableData: any[] // 报表数据
    tableTitleList: any[]
    fileName: string
    tabName: string
    imgkey: string // 图片的键名
}
// 调用方法
export function lindownload({ tableData, tableTitleList, fileName, tabName, imgkey } : DowPrams) {
    var a = document.createElement('a')
    a.href = tableToExcel({
        tableTitleList,
        tableData,
        tabName,
        imgkey
    })
    a.download = `${fileName}.xlsx`
    document.body.appendChild(a)
    a.click()
}
// 空值处理
function empty(str){
    return str === null ? '-' : str 
}