<template>
    <div>
      <div class="imgClass" v-for="(item, index) in rePic">
        <img  @click="clickImg(item)" class="imgClass-img" :src="item"/>
        <span class="imgClass-close" @click="closeClick(index)" v-if="cancelShow">x</span>
      </div>
      <Modal
        v-model="modal"
        title="图片"
        @on-cancel="cancel">
        <img :src="imgUrl" style="width: 100%;list-style: none; padding: 0; margin: 5px 0"/>
      </Modal>
    </div>
</template>
<script>
import './clickImg.less'
export default ({
  data () {
    return {
      imgUrl: '',
      modal: false
    }
  },
  props: {
    rePic: {
      type: Array,
      default: () => ([])
    },
    cancelShow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    clickImg (e) {
      this.modal = true
      this.imgUrl = e
    },
    cancel () {

    },
    closeClick (index) {
      this.$emit('closeClick', index)
    }
  }
})
</script>
<style>

</style>
