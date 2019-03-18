import axios from '@/libs/api.request'

export const add = (addObj) => {
  const { deptName, deptPhone, deptNum, deptAddr, cityId, dLoginName, allowPic } = addObj
  console.log(addObj)
  let params = new URLSearchParams()
  params.append('deptName', deptName)
  params.append('deptPhone', deptPhone)
  params.append('allowPic', allowPic)
  params.append('deptNum', deptNum)
  params.append('deptAddr', deptAddr)
  params.append('cityId', cityId[2])
  params.append('dLoginName', dLoginName)
  return axios.request({
    url: 'dept/add',
    // headers: {
    //   'Content-Type': 'application/json;charset=UTF-8'
    // },
    data: params,
    method: 'post'
  })
}
