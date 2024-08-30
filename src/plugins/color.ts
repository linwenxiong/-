import 'vue';
declare module 'vue' {
  interface ComponentCustomProperties {
    $translate: (defectiveQty: number, acceptQty: number) => string
  }
}
const plugin = {
  install(app, options) {
    app.config.globalProperties.$translate = (defectiveQty, acceptQty) => {
      const v = (Math.floor(defectiveQty / acceptQty * 100) || 0) 
      if(v >= 50) {
        return 'font-red'
      }
      // if(v >= 20) {
      //   return 'font-yellow'
      // }
      // if(v >=10) {
      //   return 'font-blue'
      // }
      return ''
    }
  }
}
export default plugin