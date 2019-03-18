<!--
 * @description: 
 * @Author: 9thArts@LucasWang
 * @LastEditors: 9thArts@LucasWang
 * @Date: 2019-02-28
 * @LastEditTime: 2019-02-28
 -->
<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="210" :collapsed-width="64" v-model="collapsed">
      <side-menu accordion :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con" style="box-sizing: border-box; height: 100%">
          <img v-show="!collapsed" style="height: 80px;" :src="maxLogo" key="max-logo" />
          <img v-show="collapsed" :src="minLogo" key="min-logo" />
          <!-- <h1 v-if="!collapsed">正元管理后台</h1>
          <h1 v-if="collapsed">正元管理后台</h1> -->
        </div>
        <div class="shopName" v-show="!collapsed">
          {{ this.$store.state.user.shopName }}
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :user-avator="userAvator"/>
        </header-bar>
      </Header>
      <Content>
        <Layout>
          <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div>
          <Content class="content-con">
            <Card class="page-card">
              <keep-alive :include="cacheList">
                <router-view/>
              </keep-alive>
            </Card>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import sideMenu from './components/side-menu'
import headerBar from './components/header-bar'
import tagsNav from './components/tags-nav'
import user from './components/user'
import { mapMutations, mapActions } from 'vuex'
import { getNewTagList, getNextName } from '@/libs/util'
import minLogo from '@/assets/images/index_active.png'
import maxLogo from '@/assets/images/index_active.png'
import {getCusVisitCount} from '@/api/user'
import './main.less'
export default {
  name: 'Main',
  components: {
    sideMenu,
    headerBar,
    tagsNav,
    user
  },
  data () {
    return {
      collapsed: false,
      minLogo,
      maxLogo
    }
  },
  computed: {
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userAvator () {
      return this.$store.state.user.avatorImgPath
    },
    cacheList () {
      return this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)) : []
    },
    menuList () {
      return this.$store.getters.menuList
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      // 总访问顾客
      'SET_VISIT_ALL',
      // 已完成访问的顾客
      'SET_VISIT_YES',
      // 还没访问的顾客
      'SET_VISIT_NO'
    ]),
    ...mapActions([
      'handleLogin'
    ]),
    turnToPage (name) {
      this.$router.push({
        name: name
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, name) {
      const nextName = getNextName(this.tagNavList, name)
      this.setTagNavList(res)
      if (type === 'all') this.turnToPage('home')
      else if (this.$route.name === name) this.$router.push({ name: nextName })
    },
    handleClick (item) {
      this.turnToPage(item.name)
    },
    // 获得计划回访人数
    getVisit () {
      this.$Notice.destroy()
      getCusVisitCount().then(res => {
        let data = res.info[0]
        console.log(data)
        this.SET_VISIT_ALL(data.visitAll)
        this.SET_VISIT_YES(data.visitYes)
        this.SET_VISIT_NO(data.visitNo)
        // 触发回访提示
        this.visitPlanShow()
      }).catch(err => {
        console.log(err)
      })
      this.$Notice.config({
        top: 50
      })
    },
    // 回访提示
    visitPlanShow () {
      this.$Notice.info({
        title: '回访提醒',
        duration: 0,
        render: (h) => {
          return (
            <div>
              <row>
                <i-col span="8">
            计划回访
                  <span>
                    {this.$store.state.deteilsId.visitAll}
                  </span>
          人
                </i-col>
                <i-col span="8">
            已回访
                  <span style="color: rgb(25, 190, 107)">
                    {this.$store.state.deteilsId.visitYes}
                  </span>
          人
                </i-col>
                <i-col span="8">
            未回访
                  <span style="color: red">
                    {this.$store.state.deteilsId.visitNo}
                  </span>
          人
                </i-col>
              </row>
            </div>
          )
        }
      })
    }
  },
  watch: {
    '$route' (newRoute) {
      this.setBreadCrumb(newRoute.matched)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.addTag(this.$store.state.app.homeRoute)
    this.setBreadCrumb(this.$route.matched)
    this.getVisit()
  }
}
</script>
<style>
  .shopName{
    color: #eeeeee;
    font-size: 20px;
    padding: 10px 12px;
    text-align: center;
    box-sizing: border-box;
    word-break: break-all;
    word-wrap: break-word;
    margin-top: 5px;
  }
</style>
