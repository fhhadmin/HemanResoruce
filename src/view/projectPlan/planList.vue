<template>
  <div>
    <editableTables :columns="columns" :value="dataList" :isLoading="loading" :selectShow="false" style="width:800px;">
      <Select v-model="proName" placeholder="选择项目" style="width:200px;">
        <Option v-for="item in projectList" :value="item.pId" :key="item.pId">{{item.pName}}</Option>
      </Select>
    </editableTables>
    <Modal
      v-model="addMaterial"
      title="添加材料计划"
      :mask-closable="false"
      :fullscreen="true"
      :scrollable="true">
      <div style="margin-left:200px;">
        <div style="border: 1px solid #e5e5e5;width:90%;height: 400px;margin-top:20px;">
          <div style="margin-top: -10px;margin-left:20px;font-size:16px;">待选材料列表</div>
          <div style="margin:100px;" v-if="isLoad">
            <div style="margin-top:150px;margin-left:120px;"><Spin size="small"></Spin></div>
            <Spin style="margin-top:-15px;margin-left:300px;"></Spin>
            <Spin style="margin-top:-25px;margin-left:550px;" size="large"></Spin>
          </div>
          <div style="margin:20px;">
            <template v-for="(item,index) in list">
              <Tag checkable @on-change="isClick(item.materName+item.materModel+ ' ' +item.mid)" color="primary" :name="item.materName" :checked="checked">{{item.materName}}({{item.materModel}})</Tag>
            </template>
          </div>
        </div>
        <div style="border: 1px solid #e5e5e5;width: 90%;height: 200px;margin-top:20px;" v-if="isTable">
          <div style="margin-top: -10px;margin-left:20px;font-size:16px;">已选列表</div>
          <virtual-list :size="40" :remain="8">
            <div style="margin:10px">
              <template v-for="(item,index) in tagList">
                <Tag color="red">{{item}}</Tag>
              </template>
            </div>
          </virtual-list>
          <div style="position: fixed;bottom:220px;left:85.5%"><Button type="info" @click="generateTable">生成用料表</Button></div>
        </div>
        <div style="margin-top:20px;" v-else>
          <!-- <virtual-list :size="40" :remain="8"> -->
            <editableTables :columns="planMaterial" :value="planMaterialList" @input="getInput" :selectShow="false" :showPage="false" :isLoading="isLoading" style="width:90%;"></editableTables>
          <!-- </virtual-list> -->
        </div>
      </div>
      <div slot="footer">
        <Button type="primary" @click="addOk">添加</Button>
        <Button type="warning" @click="addCancel">取消</Button>
      </div>
    </Modal>
    <Modal
      title="计划材料详情"
      v-model="materQuery"
      :mask-closable="false"
      :width="900">
      <virtual-list :size="40" :remain="8">
        <editableTables :columns="materQueryList" :pageTotal="totalPage" :value="materialQueryList" :selectShow="false" @getPage="getPageNum" :isLoading="materLoading">
          <Button type="primary" style="margin-left:708px">导出</Button>
        </editableTables>
      </virtual-list>
    </Modal>
  </div>
</template>

<script>
import virtualList from 'vue-virtual-scroll-list'
import editableTables from '_c/editableTables/editableTables'
import { getProjectList, getPageList } from '@/api/materialList/materialList'
import { addProPlan, getProPlan, materialQuery, addMaterial, getPlanMaterial } from '@/api/projectPlan/planList'
export default {
  components:{
    editableTables,
    virtualList
  },
  data(){
    return{
      pageNum: 1,
      totalPage: 1,
      pageSize: 10,
      loading: false,
      isLoading: false,
      materQuery: false,
      addMaterial: false,
      checked: false,
      isLoad: false,
      materLoading: false,
      proName: '',
      nid: '',
      pId: '',
      proId: '',
      planId: '',
      isTable: true,
      projectList: [],
      list: [],
      tagList: [],
      tagIdLIst: [],
      materList: [],
      columns: [
        {
          title: '计划编号',
          key: 'number',
          align: 'center'
        },
        {
          title:'计划时间',
          key: 'planTime',
          align: 'center'
        },
        {
          title: '入场时间',
          key: 'inTime',
          align:'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render:(h,params) => {
            return ('div',[
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '10px'
                },
                on:{
                  click:() => {
                    this.isLoad = true
                    this.addMaterial = true
                    this.tagList = []
                    this.tagIdLIst = []
                    this.nid = params.row.nid
                    this.isTable = true
                    this.getMaterialList()
                  }
                }
              }, '添加材料'),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {

                },
                on:{
                  click:() => {
                    this.materQuery = true
                    this.planId = params.row.nid
                    this.materLoading = true
                    this.getMaterialQuery()
                  }
                }
              }, '查看'),
            ])
          }
        }
      ],
      dataList: [],
      planMaterial: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '材料名称',
          key: 'materName',
          align: 'center'
        },
        {
          title: '材料规格',
          key: 'materModel',
          align: 'center'
        },
        {
          title: '单位',
          key: 'materUnit',
          align: 'center'
        },
        {
          title: "项目总量",
          key: 'materNum',
          align: 'center'
        },
        {
          title: '计划数量',
          key: 'planNum',
          editable: true,
          align: 'center'
        }
      ],
      planMaterialList: [],
      materQueryList: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '材料名称',
          key: 'materName',
          align: 'center'
        },
        {
          title: '材料规格',
          key: 'materModel',
          align: 'center'
        },
        {
          title: '单位',
          key: 'materUnit',
          align: 'center'
        },
        {
          title: "项目总量",
          key: 'materNum',
          align: 'center'
        },
        {
          title: '计划数量',
          key: 'planNum',
          align: 'center'
        }
      ],
      materialQueryList: []
    }
  },
  methods: {
    getPageNum(e) {
      this.pageNum = e
      this.getMaterialQuery()
    },
    addOk() {
      let planList = {}
      this.materList = []
      this.planMaterialList.map(item => {
        planList.mId = item.mid
        planList.nId = this.nid
        planList.planNum = item.planNum
        this.materList.push(planList)
      })
      addMaterial(this.materList).then(res => {
        if (res.info === '操作成功') {
          console.log(res)
          this.addMaterial = false
        }else{
          this.$Message.error('添加失败!')
        }
      })
    },
    addCancel(){
      this.addMaterial = false
    },
    isClick(e){
      var idList = []
      if (this.tagList.length === 0) {
        this.tagList.push(e.trim().split(' ')[0])
        idList.push(e.trim().split(' ')[1])
      }else{
        if(this.tagList.indexOf(e.trim().split(' ')[0]) === -1) {
            this.tagList.push(e.trim().split(' ')[0])
            idList.push(e.trim().split(' ')[1])
        }else{
          this.tagList.splice(this.tagList.indexOf(e.trim().split(' ')[0]), 1)
         idList.splice(idList.indexOf(e.trim().split(' ')[1]), 1)
        }
      }
      this.tagIdLIst = idList
    },
    // 获取项目列表
    getProjectList() {
      this.projectList = []
      getProjectList( 1, '100').then(res => {
        if(res.status === 1) {
          this.projectList = res.info.data
          this.proName = this.projectList.length === 0 ? '' : this.projectList[0].pId
        }else{
          console.log('操作失败')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 查询项目计划列表
    getPageList(){
      this.loading = true
      getProPlan(this.proId, this.pageNum, 10).then(res => {
        this.loading = false
        this.dataList = []
        if(res.info === "暂无计划") {
          this.$Message.error('该项目暂无计划!')
        }else{
          this.dataList = res.info.data
          this.pageNum = res.info.pageTotal
        }
      })
      this.getMaterialList()
    },
    // 查询项目材料列表
    getMaterialList(){
      this.list = []
      getPageList(1,this.proId).then(res => {
        this.isLoad = false
        if(res.info === '暂无数据'){
          this.$Message.error('暂无数据')
        }else{
          res.info.data.map(e => {
            this.list.push(e)
          })
        }
      })
    },
    // 生成用料表
    generateTable(){
      if(this.tagIdLIst.length !== 0) {
        materialQuery(this.tagIdLIst).then(res => {
          this.isTable = false
          this.planMaterialList = res.info
        })
      }else{
        this.$Message.error('请先选择计划材料!')
      }
    },
    // 保存编辑
    getInput(e){
      this.planMaterialList = e
    },
    getMaterialQuery(){
      getPlanMaterial(this.planId, this.pageNum, this.pageSize).then(res => {
        this.materLoading = false
        if(res.info.data){
          let dataList = {}
          res.info.data.map(item => {
            console.log(res.info)
            dataList.materName = item.proMaterialDomain.materName
            dataList.materModel = item.proMaterialDomain.materModel
            dataList.materUnit = item.proMaterialDomain.materUnit
            dataList.materNum = item.proMaterialDomain.materNum
            dataList.planNum = item.planNum
            this.pageNum = res.info.pageTotal
            this.materialQueryList.push(dataList)
          })
        }
      })
    }
  },
  watch:{
    'selectProject'(e) {
      this.pId = e
    },
    'proName'(e) {
      this.proId = e
      this.getPageList()
    }
  },
  mounted() {
    this.getProjectList()
    // this.getPageList()
  }
}
</script>

<style>

</style>
