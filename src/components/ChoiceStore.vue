<template>
  <div>
    <label>当前门店 : </label>
    <el-select v-model="storeId" placeholder="请选择门店">
      <el-option
        v-for="item in storeList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { getAllStore } from "@/apis/store";
// import storage from "@/storage/index.vue";
export default {
  name: "ChoiceStore",
  data() {
    return {
      storeId: null,
      storeList: [],
    };
  },
  mounted() {
    getAllStore().then((res) => {
      console.log(res.data.data);
      this.storeList = res.data.data;
      // this.storeId = storage.get("storeId")
      //   ? this.isExist(storage.get("storeId"))
      //   : res.data.data[0].id;
      this.$store.state.storeId = res.data.data[0].id;
      this.storeId = res.data.data[0].id;
    });
  },
  methods: {
    isExist(id) {
      for (let item of this.storeList) {
        if (id == item.id) return id;
      }
      return false;
    },
  },
  watch: {
    storeId(newId) {
      // console.log("newId", newId);
      // storage.set("storeId", newId);
      this.$store.state.storeId = newId;
      console.log("this.$store.state.storeId", this.$store.state.storeId);
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  color:white

}


</style>
