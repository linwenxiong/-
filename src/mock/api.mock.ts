import Mock from 'mockjs'
console.log(Mock)
const obj= Mock.mock({
  'list|5':[
     {
      'id':'@id',
       'name':'@cname',
        'title':'@ctitle(6,10)'
     }
   ]
  })
   
  export default [
    {
      url: "/api/stations",
      type: "get",
      response: () => {
        return obj.list
      }
    },
    {
   url: "/api/user",
      type: "get",
      response: () => {
        return obj.list
      }
   
  }
  ]