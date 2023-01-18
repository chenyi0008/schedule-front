<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="less">
*{
  margin: 0px;
}
.centerFlex(@dirc: column){ 
  display: flex;
  flex-direction: @dirc;
  justify-content: center;
  align-items: center;
}
.mainBox{
  width: 100vw;
  height: 100vh;
  .centerFlex(row)
}
.halfVBox{
  width: 50vw;
  height: 100vh;
  .centerFlex
}

</style>
