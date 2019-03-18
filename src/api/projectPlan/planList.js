import axios from '@/libs/api.request'

/**
 * 添加项目计划
 * @param { String } pId 项目id
 * @param { String } planTime 计划时间
 * @param { String } inTime 进场时间
 * @param { String } number 编号
 */
export const addProPlan = (pId, planTime, inTime, number) => {
  let params = new URLSearchParams()
  params.append('pId', pId)
  params.append('planTime', planTime)
  params.append('inTime', inTime)
  params.append('number', number)
  return axios.request({
    url: '/proPlan/add',
    data: params,
    method: 'post'
  })
}

/**
 * 查询项目计划列表
 * @param { String } pId 项目id
 * @param { String } pageNum 页码
 * @param { String } pageSize 条数
 */
export const getProPlan = (pId, pageNum, pageSize) => {
  let params = new URLSearchParams()
  params.append('pId', pId)
  params.append('pageNum', pageNum)
  params.append('pageSize', pageSize)
  return axios.request({
    url: '/proPlan/getPageList',
    data: params,
    method: 'post'
  })
}

/**
 * 根据材料id查询已选材料id
 * @param { List } mIds 已选材料id的集合
 */
export const materialQuery = (mIds) => {
  let params = new URLSearchParams()
  params.append('mIds', mIds)
  return axios.request({
    url: '/proMaterial/query',
    data: params,
    method: 'post'
  })
}

/**
 * 添加计划表材料
 * data {
 *  mid, 材料id
 *  nid,计划id
 *  planNum 计划数量
 * }
 */
export const addMaterial = (data) => {
  let params = new URLSearchParams()
  params.append('object', JSON.stringify(data))
  return axios.request({
    url: '/materialPlan/add',
    data: params,
    method: 'post'
  })
}

/**
 * 分页查询材料计划表
 * @param { String } nId 计划id
 * @param { String } pageNum 当前页数
 * @param { String } pageSize 每页条数
 */
export const getPlanMaterial = (nId, pageNum, pageSize) => {
  let params = new URLSearchParams()
  params.append('nId', nId)
  params.append('pageNum', pageNum)
  params.append('pageSize', pageSize)
  return axios.request({
    url: '/materialPlan/getPageList',
    data: params,
    method: 'post'
  })
}
