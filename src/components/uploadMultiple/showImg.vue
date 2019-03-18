<template>
  <div style="display: inline-block">
    <div class="demo-upload-list" v-for="item in newDefaultImgList">
      <template v-if="item.status === 'finished'">
        <img :src="item.url">
        <div class="demo-upload-list-cover">
          <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
          <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
        </div>
      </template>
      <template v-else>
        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
      </template>
    </div>
  </div>
</template>
<script>
  export default {
    name: "showImg",
    props: {
      defaultImgList: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        newDefaultImgList: []
      }
    },
    methods: {
      handleView (name) {
        this.$emit('handleView', name)
      },
      handleRemove (item) {
        this.$emit('handleRemove', item)
      }
    },
    watch: {
      defaultImgList (e) {
        this.newDefaultImgList = e
      }
    }
  }
</script>

<style scoped>

</style>
