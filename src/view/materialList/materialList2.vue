<template>
  <div>
    <editableTables :columns="columns" :value="projectList" :selectShow="false" :pageTotal="totalPages" :currentPage="currentPage" @getPage="getPageNum" :isLoading="isLoading">
      <Button type="info" @click="importMaterial">导入施工材料</Button>
      <Button type="success">导出</Button>
    </editableTables>
    <Modal
      v-model="importExcel"
      title="施工材料导入"
      :mask-closable="false">
      <Select v-model="importPro" style="margin:20px;width:120px;margin-right:0px;">
        <Option :value="0">导入新建项目</Option>
        <Option :value="1">导入已有项目</Option>
      </Select>
      <Select v-model="existingProject" v-if="isShow.isExisting" style="width:200px;margin-left:0px;" placeholder="请选择项目">
        <Option v-for="item in projectList" :value="item.pId" :key="item.pId">{{item.pName}}</Option>
      </Select>
      <Input placeholder="请输入项目名称" v-model="projectName" v-if="isShow.isNew" style="width:200px;margin-left:0px;" />
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
    <Modal
      title="项目用料表"
      v-model="proTable"
      :width="1000">
      <editableTables :columns="proMaterList" :value="dataList" :isLoading="loading"></editableTables>
    </Modal>
    <Modal
      v-model="addProPlan"
      :mask-closable="false"
      title="添加项目计划">
      <div style="margin: 20px; color:#919191;">
        <Tooltip>
          <span v-if="this.length < 1">已成功添加 0 个计划</span>
          <span v-else>已成功添加 {{this.length}} 个计划</span>
          <div slot="content" v-if="this.length >= 1 ">
            <span>计划时间</span>
            <div v-for="item in planGroup">
              <p>{{item.planTime}}</p>
            </div>
          </div>
          <div slot="content" v-else>
            <span>暂无计划</span>
          </div>
        </Tooltip>
      </div>
      <div style="margin:20px;">
        <!-- <span>计划时间: </span><DatePicker type="daterange" v-model="planTime" placeholder="选择计划执行时间段" style="width: 200px;margin-right:20px;"></DatePicker> -->
        <span>计划时间: </span><DatePicker type="date" v-model="planTime" placeholder="选择计划执行时间段" style="width: 200px;margin-right:20px;"></DatePicker>
      </div>
      <div style="margin:20px;">
        <span>进场时间: </span><DatePicker type="date" v-model="startTime" placeholder="选择进场时间" style="width: 200px;margin-right:20px;"></DatePicker>
      </div>
      <div style="margin:20px;">
        <span>编 号: </span><Input v-model="planNum" placeholder="请输入计划编号" style="width:200px;" />
      </div>
      <div slot="footer">
        <Button type="primary" @click="addPlanOK">添加</Button>
        <Button type="warning" @click="addPlanCancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import index from '@/config/index'
import { importMaterial, getPageList, getProjectList } from '@/api/materialList/materialList'
import { addProPlan, getProPlan, materialQuery } from '@/api/projectPlan/planList'
import editableTables from '_c/editableTables/editableTables'
export default {
  data(){
    return {
      toolTip: '',
      importPro: 1,
      pageNum: 1,
      currentPage: 1,
      totalPages: 1,
      isLoading: false,
      loading: false,
      proTable: false,
      addProPlan: false,
      length: 0,
      pId: '',
      pName: '',
      id: '',
      name: '',
      planTime: '',
      startTime: '',
      planNum: '',
      proId: '',
      isShow: {
        isExisting: false,
        isNew: false
      },
      importExcel: false,
      file: "",
      existingProject: '',
      projectName: '',
      planGroup: [],
      columns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '项目名称',
          key: 'pName',
          align: 'center'
        },
        {
          title: '导入时间',
          key: 'createTime',
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
                  type: 'info',
                  size: 'small'
                },
                style: {

                },
                on: {
                  click: () => {
                    this.addProPlan = true
                    this.proId = params.row.pId
                    let planList = {}
                    this.planGroup = []
                    this.length = ''
                    getProPlan(this.proId, 1, 100).then(res => {
                      if(res.info.data) {
                        res.info.data.map(item => {
                        this.length = res.info.data.length
                          planList = item
                          this.planGroup.push(planList)
                        })
                      }

                    })
                  }
                }
              }, '添加计划'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginLeft: '10px'
                },
                on: {
                  click: () => {
                    this.proTable = true
                    this.proId = params.row.pId
                    this.getList()
                  }
                }
              }, '项目用料')
            ])
          }
        }
      ],
      projectList: [],
      proMaterList: [
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
          title: '已用',
          key: 'used',
          align: 'center'
        },
        {
          title: '剩余',
          key: 'surplus',
          align: 'center'
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
      if(this.importPro === 0) {
        this.isShow.isNew = true
        this.isShow.isExisting = false
      }else if(this.importPro === 1) {
        this.isShow.isNew = false
        this.isShow.isExisting = true
      }

    },
    //上传成功
    handleSuccess(res){
      if(res.status === 1) {
        this.$Message.success('上传成功')
      }else{
        this.$Message.error('上传失败')
      }
    },
    // 获取项目列表
    getProjectList() {
      this.projectList = []
      this.isLoading = true
      getProjectList(this.pageNum,'100').then(res => {
        this.isLoading = false
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
      this.loading = true
      this.dataList = []
      this.list = []
      getPageList(this.pageNum, this.proId).then(res => {
        this.loading = false
        this.dataList = res.info.data
        this.totalPages = res.info.pageTotal
      })
    },
    //添加项目计划
    addPlanOK(){
      this.addProPlan = false
      this.planTime = this.planTime.Format('yyyy-MM-dd')
      this.startTime = this.startTime.Format('yyyy-MM-dd')
      addProPlan(this.proId, this.planTime, this.startTime, this.planNum).then(res => {
        if(res.info === '操作成功'){
          this.$Message.success('计划添加成功!')
        }else{
          this.$Message.error('添加失败!')
        }
      })
    },
    addPlanCancel(){
      this.addProPlan = false
    }
  },
  watch: {
    'existingProject'(e){
      this.pId = e
    },
    'projectName'(e) {
      this.pName = e
    },
    'importPro' (e) {
      console.log(e)
      if(e === 0) {
        this.isShow.isNew = true
        this.isShow.isExisting = false
      }else if(e === 1){
        this.isShow.isExisting = true
        this.isShow.isNew = false
      }
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
