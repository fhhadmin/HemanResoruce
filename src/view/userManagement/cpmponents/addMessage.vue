<template>
    <div style="display: inline-block">
      <Button type="primary" @click="showModal">添加人员</Button>
      <Modal
        v-model="modal"
        title="添加人员基本信息"
        class="authority"
      >
        <div style="margin-bottom: 5px" v-if="isEdit">
          <span>账号：</span>
          <Input v-model="account" placeholder="登录账号" style="width: 300px" />
        </div>
        <div style="margin-bottom: 5px" v-if="isEdit">
          <span>密码：</span>
          <Input v-model="password" placeholder="登录密码" style="width: 300px" />
        </div>
        <div>
          <p style="font-weight: 700;">权限分配：</p>
          <roleTableTree :id="newUserId" @selectUp="selectUp"></roleTableTree>
        </div>
        <div slot="footer">
          <Button @click="cancel">取消</Button>
          <Button type="success" :loading="modal_loading" @click="confirm">确定</Button>
        </div>
      </Modal>
    </div>
</template>
<script>
import roleTableTree from '../cpmponents/roleTable-Tree'
export default({
  components: {
    roleTableTree
  },
  data () {
    return {
      modal: false,
      account: '',
      password: '',
      name: '',
      authority: '',
      modal_loading: false,
      newUserId: '',
      isEdit: true
    }
  },
  props: {
    userId: String
  },
  methods: {
    selectUp (e) {
      console.log(e)
      this.authority = e
    },
    // 确定
    confirm () {
      this.modal_loading = true
      console.log(this.authority)
      console.log(JSON.stringify(this.authority))
      let dataValue = {
        account: this.account,
        password: this.password,
        name: this.name,
        permission: JSON.stringify(this.authority)
      }
      this.$emit('successAdd', dataValue)
    },
    // 取消
    cancel () {
      this.hideModal()
    },
    showModal (dataObj) {
      this.isEdit = true
      this.modal = true
      this.modal_loading = false
      this.account = ''
      this.password = ''
      this.name = ''
      this.authority = ''
      this.data = ''
      this.newUserId = '' + '.' + new Date()
      // 有值赋值
      if (Object.keys(dataObj).length !== 0) {
        this.account = dataObj.account
        this.password = dataObj.password
        this.name = dataObj.name
      }
    },
    hideModal () {
      this.modal = false
      this.modal_loading = false
      this.account = ''
      this.password = ''
      this.name = ''
      this.authority = ''
      this.data = ''
    },
    // 复位
    restoration () {
      this.modal_loading = false
      this.account = ''
      this.password = ''
      this.name = ''
      this.authority = ''
      this.modal = false
    }
  },
  mounted () {

  },
  watch: {
    userId (e) {
      this.newUserId = e.split('|')[0] + '.' + new Date()
    }
  }
})
</script>
<style>
  .dataList div{
    margin-bottom: 10px;
  }
  .authority span{
    font-weight: 700;
  }
</style>
