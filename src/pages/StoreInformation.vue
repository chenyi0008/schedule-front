<template>
  <div>
    <div style="float: left">
      <shopSearchbutton></shopSearchbutton
      ><shopSearchbutton2></shopSearchbutton2
      ><el-button type="primary" icon="el-icon-search">搜索</el-button>

    <div id="app">
      <div class="modal" v-show="isshow">
        <div class="contain">
        <div class="title"><span>编辑</span><span @click="isshow=false">x</span></div>
        <div class="content">
          <input type="text" placeholder="标题" v-model="keywords"><br>
          <input type="text" placeholder="标题" v-model='newItem.title'><br>
          <input type="text" placeholder="作者" v-model="newItem.author"><br>
          <input type="date" v-model="newItem.createtime"><br>

        </div>
        </div>
      </div>
      </div>
    </div>





    <div style="float: right"><deleteButton></deleteButton><shopButton @click="addItem()"></shopButton></div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="max-height: 480px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="100px"></el-table-column>
      <el-table-column prop="name" label="名称" width="200px">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="200px"
      ></el-table-column>
      <el-table-column prop="size" label="面积" width="200px"></el-table-column>
      <template slot:scope float="right">
        <el-table-column prop="control" label="操作" width="400px">
          <template>
            <div>
              <el-button type="primary" class="edit" plain @click="editItem(item,index)">编辑</el-button>
              <el-button type="danger"  class="delete" plain @click="deleteItem(item)">删除</el-button>
            </div>
        </template>

      </el-table-column>
    </template>
    </el-table>
    



    <div><paginAtion style="margin-top: 30px"></paginAtion></div>
  </div>
  
</template>

<script>
import shopButton from "../components/shopButton.vue";
import deleteButton from "../components/deleteButton.vue";
import shopSearchbutton from "@/components/shopSearchbutton";
import shopSearchbutton2 from "@/components/shopSearchbutton2";
import paginAtion from "../components/paginAtion.vue";
import { getAllStore } from "@/apis/store";
export default {
  name: "tableView",
  components: {
    shopButton,
    shopSearchbutton,
    shopSearchbutton2,
    paginAtion,
    deleteButton
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      keywords:'',
      isshow:false,
      editIndex:null,//正在编辑的行号
      newItem:{
      title:"",
      author: '',
      createtime:"",
      },

      tempItem:{//正在编辑的对象          
        title:"",
        author:'',
        createtime:''
      },
};

  },
  mounted() {
    getAllStore().then((res) => {
      console.log(res.data.data);
      this.tableData = res.data.data;
    });
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addItem(){
      this.list.unshift({
        ...this.newItem
      });
      this.newItem={
        title:"",
        author:'',
        createtime:''
      }
    },
    deleteItem(obj){
      var index =this.list.indexOf(obj);
      if(confirm("确定删除吗？")){
        this.list.splice(index, 1);
      }
    },
    editItem(item,index){
    this.isshow=true;
    //显示模态框
    this.tempItem={
      ...item
    };
    item.editIndex=index;//正在编辑的行
    },
    //确定修改
    updateItem(){
      this.list[this.editIndex]=
      {...this.tempItem
    };
    this.isshow=false;
    //清空
    this.tempItem ={
      title:"",
      author:'',
      createtime:''
    }
  },

},
computed:{
  //过滤出的list
  fillist(){
    if(this.keywords.trim()==""){
      return this.list;

    }
    else{
      return this.list.filter(item=>{return item.title.includes(this.keywords)})
    }
  }
}


}
</script>

<style lang="less" scoped>
.modal{
  width:100vh;
  height:vh;
  background-color: rgba(0,0,0,.6);
  position:absolute;
  left:0;
  top:0;
}

.modal .contain{
  width:400px;
  height:300px;
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  background-color: #fff;
}
.modal .title{
  width:100%;
  height:30px;
  background-color:#00aaff;
  line-height:38px;
  text-align:center;
}
.modal .title span:nth-of-type(2){
  float:right;
}

</style>

