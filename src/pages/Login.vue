<template>
  <div class="mainBox">
    <div class="halfVBox">
      <h1>后台管理系统</h1>
      <p v-text="mode"/>
    </div>
    <div class="halfVBox">
      <form>
        <label for="id">账号</label>
        <input id="id" type="text"/>
        <label for="password">密码</label>
        <input id="password" type="password"/>
        <button v-if="isLogin">登陆</button>
        <button @click="isLogin ? changeMode() : register()">注册</button>
      </form>
  </div>
  </div>
</template>

<script>
  export default {
    name:"Login",
    data(){
      return{
        isLogin: true,
      }
    },
    computed: {
      mode(){
        return this.isLogin
        ? "Login in View"
        : "Register View";
      }
    },
    methods: {
      changeMode(){
        this.isLogin = !this.isLogin;
      },
      register(){
        alert('register');
      },
      login(){
        alert('login');
      }
    }
  }
</script>

<style lang="less" scoped>
h1{
  color: #66CCFF
}

</style>
