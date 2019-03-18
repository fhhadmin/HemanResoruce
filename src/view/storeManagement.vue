<template>
  <div>
    <Upload action="" :on-success="handleSuccess">
        <Button type="primary">导入仓库表</Button>
    </Upload>
    <div>
      <editable-tables
          :columns="columns"
          v-model="dataList"
          :selectShow="selectShow"
          :pageTotal='pageTotal'
          @getPage='getPageNum'
          :isLoading="loading">
          <Input placeholder="请输入材料名称" style="width:200px;" v-model="materName"/><Button icon="ios-search" @click="searchMater">搜索</Button>
      </editable-tables>
    </div>
  </div>
</template>
<script>
import editableTables from '_c/editableTables'
import index from '@/config/index.js'
export default {
  components: {
    editableTables,
  },
  data() {
    return {
      // 材料名称
      materName: '',
      // 导入文件路径
      file: '',
      loading: false,
      buttonSize: 'large',
      selectShow: false,
      currentPage: 1,
      pageTotal:10,
      dataList:[
        {
          name: '水泥',
          standard: '',
          unit: '吨',
          amount: 100
        },
        {
          name: '钢筋',
          standard: '',
          unit: '吨',
          amount: 200
        },
        {
          name: '沙子',
          standard: '',
          unit: '吨',
          amount: 300
        }
      ],
      columns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '材料名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '规格型号',
          key: 'standard',
          align: 'center'
        },
        {
          title: '单位',
          key: 'unit',
          align: 'center'
        },
        {
          title: '库存数量',
          key: 'amount',
          align: 'center'
        },
      ],
    }
  },
  methods: {
    //文件导入成功后的处理
    handleSuccess (res) {
      //
    },
    // 获取材料列表
    getMaterList (data) {
      this.loading = true
      //接口
      // this.materName = this.getMaterList === 0 ? '': this.getMaterList[0]
    },
    getPageNum (e) {
      // console.log(e)
      this.currentPage = e
      this.getList({"pageNum": this.currentPage, "pageSize": 10})
    },
    searchMater() {
      if (this.materName !=='') {
        console.log(this.materName,'name.....')
      } else {

      }

    }
  },
  mounted() {
    // console.log(index,'index....')
     let {baseUrl} = index
     this.file = baseUrl.pro
    //  this.getMaterList()
  }

}
</script>
<style>

</style>
