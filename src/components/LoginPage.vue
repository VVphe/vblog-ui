<template>
  <div id="loginpage" class="gray-bg" style="height:100%">
    <div class="loginColumns animated fadeInDown">
        <div class="row">

            <div class="col-md-6">
                <h2 class="font-bold">Welcome to Vblog</h2>


            </div>
            <div class="col-md-6">
                <div class="ibox-content">
                    <form class="m-t" role="form" action="index.html">
                        <div class="form-group">
                            <input type="email" class="form-control" placeholder="Username" required="" v-model="username">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="Password" required="" v-model="password">
                        </div>
                        <button type="submit" class="btn btn-primary block full-width m-b" @click="login(1)">Login</button>

                        <a href="#">
                            <small>Forgot password?</small>
                        </a>

                        <p class="text-muted text-center">
                            <small>Do not have an account?</small>
                        </p>
                        <a class="btn btn-sm btn-white btn-block" @click="goRegister">Create an account</a>
                    </form>
                    <p class="m-t">
                        <small>Let's start the fantastic journey in Zabbix-data-UI's world</small>
                    </p>
                </div>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-6">
                Copyright Xlab of Software College, Tongji University
            </div>
            <div class="col-md-6 text-right">
               <small>© 2017-2018</small>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        username: "",
        password: "",
        token: "",
    }
  },
  methods: {
      login: function(userid) {
          var formData =  new FormData()
          formData.append('username', this.username)
          formData.append('password', this.password)
          this.$http.post(global.vblogUrl + '/login', formData)
            .then(res => {
                window.localStorage.setItem('token', res.bodyText)
                console.log(res.bodyText)
            })
          this.$router.push({name: 'AboutmePage'})
          //this.$router.push('/user' + '/' + userid + '/cluster')
      },
      goRegister: function() {
          this.$router.push('/register')
      }
  },
  mounted() {

  }
}
</script>

<style scoped>
</style>
