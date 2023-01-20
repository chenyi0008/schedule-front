<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',

}
</script>

<style lang="less">
*{
  margin: 0px;
}
.fullScreen{
  min-width: 100vw;
  min-height: 100vh;
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
