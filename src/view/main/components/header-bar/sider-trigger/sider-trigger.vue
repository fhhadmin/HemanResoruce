<template>
  <a @click="handleChange" type="text" :class="['sider-trigger-a', collapsed ? 'collapsed' : '']">
    <!-- <Icon type="android-arrow-back" :size="size"/> -->
    <!-- <i class="iconfont">&#xe62c;</i> -->
    <svg class="iconfont-svg" aria-hidden="true" style="font-size: 26px;">
      <use xlink:href="#icon-weibiaoti26"></use>
    </svg>
  </a>
</template>
<script>
export default {
  name: 'siderTrigger',
  props: {
    collapsed: Boolean,
    icon: {
      type: String,
      default: 'navicon-round'
    },
    size: {
      type: Number,
      default: 26
    }
  },
  methods: {
    handleChange () {
      this.$emit('on-change', !this.collapsed)
    }
  }
}
</script>
<style lang="less">
@import './sider-trigger.less';
</style>
