<!--
 * @description:
 * @Author: 9thArts@LucasWang
 * @Date: 2019-02-18
 * @LastEditors: 9thArts@LucasWang
 * @LastEditTime: 2019-02-19
 * action 上传地址
 * 上传多个
 -->
<template>
  <div>
    <showImg v-if="imgShow" :defaultImgList="uploadList" @handleView="handleView" @handleRemove="handleRemove"></showImg>
    <Upload
      ref="upload"
      :show-upload-list="false"
      :default-file-list="defaultList"
      :on-success="handleSuccess"
      :format="['jpg','jpeg','png']"
      :max-size="204800"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      multiple
      type="drag"
      action="//upload.qiniup.com"
      :data="{token: token}"
      style="display: inline-block;width:58px;"
    >
      <div style="width: 58px;height:58px;line-height: 58px;">
        <Icon type="ios-camera" size="20"></Icon>
      </div>
    </Upload>
    <Modal title="预览图片" v-model="visible">
      <img
        :src="imgName"
        v-if="visible"
        style="width: 100%"
      >
    </Modal>
  </div>
</template>
<script>
  import { getQiniuToken } from '@/api/data'
  import config from '@/config'
  import showImg from './showImg'
  export default {
    components: {
      showImg
    },
    data () {
      return {
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: [],
        token: '',
        newList: []
        // config.qiniuBaseUrl: 'http://pn4ionp3r.bkt.clouddn.com/'
      }
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      imgShow: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      // 点击查看
      handleView (url) {
        this.imgName = url
        this.visible = true
        const fileList = this.$refs.upload.fileList
      },
      // 删除按钮
      handleRemove (file) {
        let newList = []
        this.uploadList.map(item => {
          if (file.name !== item.name) {
            newList.push({...item})
          }
        })
        this.$emit('input', this.getReturnUrl(newList))
      },
      // 拼接返回数据
      getReturnUrl (urlList) {
        let url = ''
        urlList.forEach(item => {
            url += `${item.name},`
        })
        return url.substring(0, url.length-1)
      },
      // 上传成功
      handleSuccess (res, file) {
        file.url = config.baseUrl.qiniuBaseUrl + '/' + res.key
        this.uploadList.push({
          name: res.key,
          url: file.url,
          status: "finished"
        })
        file.name = res.key
        this.$emit('input', this.getReturnUrl(this.uploadList))
        this.$emit('succeedOk', this.getReturnUrl(this.uploadList))
      },
      // 错误
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式错误',
          desc:
            '文件 ' +
            file.name +
            ' 格式错误，请选择 png/jpg 格式图片.'
        })
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出上传大小限制',
          desc: '文件  ' + file.name + ' 太大，请上传小于 2M 的文件.'
        })
      },
      handleBeforeUpload () {
        const check = this.uploadList.length < 5
        if (!check) {
          this.$Notice.warning({
            title: '最多支持同时上传 5 张个文件！.'
          })
        }
        return check
      },
      // 赋值
      setDefaultList() {
        if (!this.newList) return
        let obj = {}
        this.newList.split(',').forEach(item => {
          let name = ''
          if (item.includes('.jpg') ||item.includes('.jpeg') || item.includes('.png')) {
            name = item.split('.')[0]
          } else {
            name = item
          }
          this.uploadList.push({
            name: name,
            url: this.addImgBase(item),
            status: "finished"
          })
        })
      }
    },
    mounted () {
      this.$nextTick(() => {
        getQiniuToken().then(res => {
          this.token = res.data
        })
      })
    },
    watch: {
      value (e) {
        this.uploadList = []
        this.newList = e
        this.setDefaultList()
      }
      // defaultImageList () {
        // if(!this.defaultList || this.defaultImageList.length <= 0) return
        // let arr = this.defaultImageList.split(',')
        // console.log('--------------',arr)
        // // arr.foreach(item => {
        // //   config.qiniuBaseUrl + '/' + item
        // // })
        // for (let i = 0; i < arr.length; i++) {
        //   const obj = {
        //     name: arr[i],
        //     url: config.qiniuBaseUrl + '/' + arr[i]
        //   }
        //   arr[i] = obj
        // }
        // this.defaultList = arr
      // }
    }
  }
</script>
<style>
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    margin-right: 4px;
  }
  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }
  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
