/*
 * @description:
 * @Author: 9thArts@LucasWang
 * @Date: 2019-02-18
 * @LastEditors: 9thArts@LucasWang
 * @LastEditTime: 2019-02-22
 */
import axios from '@/libs/api.request'
import qs from 'qs'
import clonedeep from 'clonedeep'

// 获取七牛上传 token
export const getQiniuToken = () => {
    return axios.request({
        url: '/qiniu/getToken',
        method: 'get'
    })
}

// 查询品牌文案/快速问诊
export const getConfig = () => {
    return axios.request({
        url: '/config',
        method: 'get'
    })
}
// 保存品牌文案/快速问诊
export const saveConfig = info => {
    return axios.request({
        url: '/config',
        method: 'post',
        data: info
    })
}

// 获取科室数据
export const getDepartment =() => {
    return axios.request({
        url: '/department'
    })
}

// 保存科室数据
export const saveDepartment =(info) => {
  let data = clonedeep(info)
  data.feature = data.feature === '1'
    return axios.request({
        url: '/department',
        method: 'post',
        data: data
    })
}

// 删除科室
export const delDepartment = id => {
    return axios.request({
        url: '/department?'+ qs.stringify(id),
        method: 'delete'
    })
}

//get dept illness
export const getIllnessByDept = id =>{
    return axios.request({
        url:'/department-disease?departmentId='+id,
        method:'get'
    });
}

//delete illness by id
export const delIllness = id =>{
    return axios.request({
        url:'/department-disease?diseaseId='+id,
        method:'delete'
    });
}

//save illness by id
export const saveIllness = (deptId,illId,illness)=>{
    // let params = new URLSearchParams()
    // params.append('departmentId',deptId)
    // if(illId)
    //     params.append('id',illId)
    // params.append('name',illness)
    return axios.request({
        url:'/department-disease',
        data:illId===0?{departmentId:deptId,name:illness}:{departmentId:deptId,id:illId,name:illness},
        method:'post'
    })
}

