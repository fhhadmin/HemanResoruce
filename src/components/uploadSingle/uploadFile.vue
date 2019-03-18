<!--
 * @description:
 * @Author: 9thArts@LucasWang
 * @Date: 2019-02-19
 * @LastEditors: 9thArts@LucasWang
 * @LastEditTime: 2019-02-22
  * 上传单个
 -->
<template>
  <Upload
    ref="upload"
    action="index.baseUrl"
      :format ="['xlsx','xls']"
      :on-success="uploadSuccess"
      :on-remove ="removeFile"
      :before-upload="handleBeforeUpload"
    >
    <Button icon="ios-cloud-upload-outline">上传文件</Button>
  </Upload>

</template>
<script>
import { getQiniuToken } from '@/api/data'
import config from '@/config'

export default {
  props: ['maxCount'],
  mounted () {
    getQiniuToken().then(res => {
      this.token = res.data
    })
    this.uploadList = this.$refs.upload.fileList
  },
  data () {
    return {
      token: '',
      uploadList: [],
      key: `admin_${new Date().getTime()}.xls`
    }
  },
  methods: {
    uploadSuccess (res, file, fileList) {
      this.fileListChange(fileList)
    },
    removeFile (file, fileList) {
      this.fileListChange(fileList)
    },
    fileListChange (fileList) {
      let arr = []
      fileList.forEach(item => {
        arr.push(item.response.key)
      })
      this.$emit('change', arr.join(','))
    },
    handleBeforeUpload (e) {
      // console.log(e)
      this.generateKey(e)
      const check = this.uploadList.length < parseInt(this.maxCount)
      if (!check) {
        this.$Notice.warning({
          title: `最多支持同时上传 ${this.maxCount} 张个文件！.`
        })
      }
      return check
    },

    generateKey (e) {
      const file = e.name
      const index = file.lastIndexOf('.')
      this.key = 'admin_' + new Date().getTime() + '_' + this.createUid(8, 16) + '.' + file.substr(index + 1)
      return true
    },

    createUid (len, radix) {
      var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
      var uuid = [], i
      radix = radix || chars.length

      if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
      } else {
        // rfc4122, version 4 form
        var r

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'

        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random() * 16
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
          }
        }
      }

      return uuid.join('')
    }
  }
}
</script>
<style>

</style>
