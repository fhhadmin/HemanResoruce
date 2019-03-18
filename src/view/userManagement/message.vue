<template>
  <div>
    <addMessage
      ref="showAddMessage"
      :userId="backToNowObj.id"
      @successAdd='addAdminDate'
      style="margin-bottom: 5px;">
    </addMessage>
    <editableTables :columns='columns' :showPage="false" v-model="dataList" :stateSelect='false'></editableTables>
  </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables'
import addMessage from './cpmponents/addMessage'
import { AdminQueryUsers, adminUserAdd, adminUserUpdate } from '@/api/userManagement/message'
export default({
  components: {
    editableTables,
    addMessage
  },
  data () {
    return {
      columns: [
        {
          title: '登录账号',
          key: 'accountName'
        },
        {
          title: '登录密码',
          key: 'accountPass'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.daminId = params.row.id
                    this.backToNowObj = params.row
                    this.backToNowObj.id = this.backToNowObj.id + '|' + new Date()
                    this.$refs.showAddMessage.showModal(this.backToNowObj)
                    this.$refs.showAddMessage.isEdit = false
                    this.editState = true
                  }
                }
              }, '编辑')
            ])
          }
        }
      ],
      dataList: [],
      // shopList: [],
      vmodelSelect: '',
      selectShopId: '',
      password: '',
      daminId: '',
      backToNowObj: {},
      editState: false
    }
  },
  methods: {
    // 添加管理员成功
    addAdminDate (e) {
      // 判断是否是编辑状态
      if (this.editState) {
        e.id = this.daminId
        adminUserUpdate(e).then(res => {
          this.$Message.success('成功')
          this.getList()
          this.$refs.showAddMessage.hideModal()
          this.$refs.showAddMessage.modal_loading = false
        }).catch(err => {
          this.$Message.error(err)
          this.$refs.showAddMessage.modal_loading = false
        })
      } else {
        adminUserAdd(e).then(res => {
          this.$Message.success('成功')
          this.getList()
          this.$refs.showAddMessage.hideModal()
          this.$refs.showAddMessage.modal_loading = false
        }).catch(err => {
          this.$Message.error(err.msg)
          this.$refs.showAddMessage.modal_loading = false
        })
      }
    },
    // 分页查询管理员
    getList () {
      this.dataList = []
      AdminQueryUsers().then(res => {
        this.dataList = []
        this.dataList.push(...res.info.data)
      }).catch(err => {
        console.log(err.msg)
      })
    }
  },
  mounted () {
    // 初始化管理员列表
    this.getList()
  }
})
</script>
<style>

</style>
