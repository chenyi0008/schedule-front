<template>
  <el-row>
    <el-button type="primary" round @click="setData('add', null)"
      >新增规则</el-button
    >
    <el-button type="info" round>批量删除</el-button>
  </el-row>
</template>
    
    <style>
.el-row {
  float: right;
}
</style>
  
    <script>
export default {
  name: "newRulebutton",
  methods: {
    setData(type, v) {
      //数据添加、编辑
      this.flag = true; //弹框的显示
      this.state = type;
      if (this.state == "edit") {
        this.obj = { ...v };
      } else {
        this.obj = {};
      }
    },

    submit() {
      //添加、编辑数据提交
      if (this.state == "add") {
        let _id = new Data().getTime();
        this.list.push({ ...this.obj, id: _id });
      } else {
        this.lists.forEach((item, i) => {
          if (item.id == this.obj.id) {
            this.lists[i] = this.obj;
          }
        })
      };
      this.flag = false ;//弹框的隐藏
      this.obj = {}
    },
    dev(v,i){
        //数据删除
        this.lists =this.lists.filter(item=>v.id !=item.id) ;
    }
  },
};
</script> 