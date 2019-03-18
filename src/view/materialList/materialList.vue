<template>
  <div>
    <editableTables :columns="columns" :value="dataList" :selectShow="false" :pageTotal="totalPages" :currentPage="currentPage" @getPage="getPageNum" :isLoading="isLoading">
      <Select v-model="selectProject" placeholder="选择已导入的项目" style="width:200px;">
        <Option v-for="item in projectList" :value="item.pId+' '+item.pName" :key="item.pId">{{item.pName}}</Option>
      </Select>
      <Button type="info" @click="importMaterial">导入施工材料</Button>
      <Button type="success">导出</Button>
    </editableTables>
    <Modal
      v-model="importExcel"
      title="施工材料导入"
      :mask-closable="false">
      <Button style="margin:20px" type="info" @click="importProject" v-if="isShow.showProject">导入已有项目</Button>
      <Button style="margin:20px" type="info" @click="importNewProject" v-if="isShow.showProject">导入新建项目</Button>
      <Select v-model="existingProject" v-if="isShow.isExisting" style="width:200px;margin-left:20px;">
        <Option v-for="item in projectList" :value="item.pId" :key="item.pId">{{item.pName}}</Option>
      </Select>
      <Button v-if="isShow.isExisting" @click="selectReturn">返回</Button>
      <Input placeholder="请输入项目名称" v-model="projectName" v-if="isShow.isNew" style="width:200px;margin-left:20px;" />
      <Button v-if="isShow.isNew" @click="isReturn">返回</Button>
      <Upload
        action="//192.168.31.19:80/admin/proMaterial/importMaterial"
        :data="{
          pId: this.pId,
          pName: this.pName
        }"
        :on-success="handleSuccess"
        >
      <Button icon="ios-cloud-upload-outline" style="margin:20px" type="info">上传材料表</Button>
    </Upload>
    </Modal>
  </div>
</template>
<script>
import index from '@/config/index'
import { importMaterial, getPageList, getProjectList } from '@/api/materialList/materialList'
import editableTables from '_c/editableTables/editableTables'
export default {
  data(){
    return {
      pageNum: 1,
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      selectProject: '',
      pId: '',
      pName: '',
      id: '',
      name: '',
      isShow: {
        showProject: true,
        isExisting: false,
        isNew: false
      },
      importExcel: false,
      file: "",
      existingProject: '',
      projectName: '',
      projectList: [],
      columns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '名称',
          key: 'materName',
          align: 'center'
        },
        {
          title: '规格/型号',
          key: 'materModel',
          align: 'center'
        },
        {
          title: '数量',
          key: 'materNum',
          align: 'center'
        },
        {
          title: '单位',
          key: 'materUnit',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render:(h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {

                },
                on: {
                  click: () => {

                  }
                }
              }, '详情')
            ])
          }
        }
      ],
      dataList: [],
    }
  },
  components: {
    editableTables
  },
  methods: {
    getPageNum(e){
      this.currentPage = e
    },
    selectRow(){

    },
    importMaterial(){
      this.importExcel = true
      this.isShow.showProject = true
      this.isShow.isExisting = false
      this.isShow.isNew = false
    },
    importProject(){
      this.isShow.showProject = false
      this.isShow.isExisting = true
    },
    importNewProject(){
      this.isShow.showProject = false
      this.isShow.isNew = true
    },
    selectReturn() {
      this.isShow.showProject = true
      this.isShow.isExisting = false
      this.existingProject = ''
    },
    isReturn() {
      this.isShow.showProject = true
      this.isShow.isNew = false
      this.projectName = ''
    },
    //上传成功
    handleSuccess(res){
      if(res.status === 1) {
        this.$Message.success('上传成功')
        this.getList()
      }else{
        this.$Message.error('上传失败')
      }
    },
    // 获取项目列表
    getProjectList() {
      this.projectList = []
      getProjectList(this.pageNum,'100').then(res => {
        if(res.status === 1) {
          this.projectList = res.info.data
        }else{
          console.log('操作失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取项目用料列表
    getList() {
      this.isLoading = true
      this.dataList = []
      this.list = []
      getPageList(this.pageNum, this.id).then(res => {
        this.isLoading = false
        this.dataList = res.info.data
        this.totalPages = res.info.pageTotal
      })
    }
  },
  watch: {
    'existingProject'(e){
      this.pId = e
    },
    'projectName'(e) {
      this.pName = e
    },
    'selectProject'(e){
      this.id = e.trim().split(' ')[0]
      this.name = e.trim().split(' ')[1]
      this.getList()
    }
  },
  mounted(){
    let {baseUrl} = index
    this.file = baseUrl.pro

    this.getProjectList()
  }
}
</script>
<style>

</style>
