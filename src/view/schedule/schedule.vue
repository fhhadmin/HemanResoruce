<template>
  <div>
    <editableTables :columns="columns" :value="dataList" :pageTotal="totalPages" @getPage="getPageNum" :selectOption="selectOption" @filtrateClick='filtrateClick'></editableTables>
  </div>
</template>
<script>
import editableTables from '_c/editableTables/editableTables'
export default {
  components: {
    editableTables,
  },
  data () {
    return {
      pageTotal: 1,
      currentPage: 1,
      stagelSelect: '',
      totalPages: 1,
      dataList:[
        {
          name: '水泥',
          precification: '',
          number: 3,
          unit: '吨'
        },
        {
          name: '沙子',
          precification: '',
          number: 3,
          unit: '吨'
        }
      ],
      selectOption: [
        {
          label: '计划一阶段',
          value: 'stage'
        }
      ],
      columns: [
        {
          title: '序号',
          type: 'index',
          align: 'center'
        },
        {
          title: '名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '规格/型号',
          key: 'precification',
          align: 'center'
        },
        {
          title: '数量',
          key: 'number',
          align: 'center'
        },
        {
          title: '单位',
          key: 'unit',
          align: 'center'
        },
      ]
    }
  },
  methods: {
    getPageNum(e) {
      this.currentPage = e
    },
    filtrateClick (e) {
      console.log(e, 'eeeeee')
      console.log(this.selectOption)
    }
  }
}
</script>
