import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  let params = new URLSearchParams()
  params.append('accountName', userName)
  params.append('accountPass', password)
  return axios.request({
    url: '/account/login',
    data: params,
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: '/account/query',
    method: 'post'
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/account/logout',
    method: 'post'
  })
}

/**
 * 统计回访人数
 * @param people
 */
export const getCusVisitCount = (people) => {
  return axios.request({
    url: 'getCusVisitCount',
    method: 'post'
  })
}
