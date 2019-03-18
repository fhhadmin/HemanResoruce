import axios from '@/libs/api.request'

/**
 *  后台新增用户
 * @param {Object} data
 */
export const adminUserAdd = (data) => {
  let params = new URLSearchParams()
  params.append('accountName', data.account)
  params.append('accountPass', data.password)
  params.append('obj', data.permission)
  return axios.request({
    url: '/account/add',
    data: params,
    method: 'post'
  })
}

/**
 * 后台查询用户列表
 */
export const AdminQueryUsers = () => {
  return axios.request({
    url: '/account/getPageList',
    method: 'get'
  })
}

/**
 *  按id查询用户
 * @param {String} id
 */
export const queryUserById = (userId) => {
  let params = new URLSearchParams()
  params.append('accountId', userId)
  return axios.request({
    url: '/accountMenu/query',
    data: params,
    method: 'post'
  })
}

/**
 *  后台编辑用户
 * @param {Object} data
 */
export const adminUserUpdate = (data) => {
  console.log(data)
  return axios.request({
    url: '/accountMenu/edit',
    data,
    method: 'post'
  })
}
