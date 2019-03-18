import axios from '@/libs/api.request'

/**
 * 导入项目材料
 * @param { String } pName 项目名称
 * @param { String } file 文件
 */
export const importMaterial = (pName, file) => {
  let params = new URLSearchParams()
  params.append('pName', pName)
  params.append('file', file)
  return axios.request({
    url: '/proMaterial/importMaterial',
    data: params,
    method: 'post'
  })
}

/**
 * 查询项目用料列表
 * @param { String } pageNum 当前页数
 * @param { String } pId 项目id
 */
export const getPageList = (pageNum, pId) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('pId', pId)
  return axios.request({
    url: '/proMaterial/getPageList',
    data: params,
    method: 'post'
  })
}

/**
 * 查询项目列表
 * @param { String } pageNum 当前页数
 * @param { String } pageSize 每页条数
 */
export const getProjectList = (pageNum, pageSize) => {
  let params = new URLSearchParams()
  params.append('pageNum', pageNum)
  params.append('pageSize', pageSize)
  return axios.request({
    url: '/project/getPageList',
    data: params,
    method: 'post'
  })
}
