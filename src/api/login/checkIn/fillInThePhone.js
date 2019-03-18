import axios from '@/libs/api.request'

export const getAccountDetail = (accountName) => {
  let params = new URLSearchParams()
  params.append('accountName', accountName)
  return axios.request({
    url: 'getAccountDetail',
    data: params,
    method: 'post'
  })
}
