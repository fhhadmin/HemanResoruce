  <style lang="less">
    @import './login.less';
  </style>
  <template>
    <div class="login" @keydown.enter="handleLogin">
      <div class="login-con">
        <Card icon="log-in" title="欢迎登录" :bordered="false">
          <div class="form-con">
            <login-form @on-success-valid="handleSubmit"></login-form>
            <div class="register">
              <!-- <div class="register-cut"> -->
                <!--<span @click="checkIn" style="color: #eb6c27">工地入住</span>-->
                <!--| <span @click="passwordForget">忘记密码?</span>-->
              <!--</div>-->
            </div>
            <p class="login-tip">请输入户名和密码</p>
          </div>
        </Card>
      </div>
    </div>
  </template>
<script>
import loginForm from '_c/login-form'
import { setToken } from '@/libs/util'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      carValue: 0
    }
  },
  components: {
    loginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      setToken('token')
      this.$router.push({
        name: 'home'
      })
      console.log(11)
      return
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$Message.success('欢迎登陆')
          this.$router.push({
            name: 'home'
          })
        })
      }).catch(err => {
        this.$Message.error(err)
      })
    },
    // 忘记密码
    passwordForget () {
      this.$router.push({
        name: 'passwordForget'
      })
    }
  },
  mounted () {
    this.$Notice.destroy()
  }
}
</script>

  <style>

  </style>
