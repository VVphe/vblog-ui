<template>
  <div id="RegisterPage">
      <div class="middle-box text-center loginscreen   animated fadeInDown">
        <div>
            <div>

                <h1 class="logo-name">VB</h1>

            </div>
            <h3>Register to vblog</h3>
            <p>Create account to see it in action.</p>
            <form class="m-t" role="form" action="login.html">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Name" required="" v-model="username">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password" required="" v-model="password">
                </div>
                
                <button class="btn btn-primary block full-width m-b" @click="register">Register</button>

                <p class="text-muted text-center"><small>Already have an account?</small></p>
                <a class="btn btn-sm btn-white btn-block" @click="goLogin">Login</a>
            </form>
            
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        username: '',
        password: '',
    }
  },
  methods: {
    goLogin: function() {
        this.$router.push('/login')
    },
    register: function() {
        var formData = new FormData()
        formData.append('username', this.username)
        formData.append('password', this.password)
        this.$http.post(global.vblogUrl + '/register', formData)
            .then(res => {
                toastr.success("注册成功")
            }, err => {
                toastr.error("注册失败")
            })
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
</style>
