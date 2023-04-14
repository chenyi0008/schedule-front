<template>
  <div>
    <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  multiple
  :limit="3"
  :on-exceed="handleExceed"
  :file-list="fileList"

  accept=".csv, text/csv, application/vnd.ms-excel"
>
  <el-button class="el-icon-upload" size="small" type="primary"></el-button>
</el-upload>

  </div>
</template>

<script>
import {postSchedule} from "../apis/common.js";
// import {}   ;

export default {

  name: "uploadView",
  
  data() {

    return {
      fileList: [
      ],
    };
  },
  methods: {
    postSchedule(storeId) {
      postSchedule().then((res) => {
        console.log(res);
      });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    validateSVG(file) {
      const isCSV = file.type === "image/csv+xml";
      const isLt500KB = file.size / 1024 < 500;
      if (!isCSV) {
        this.$message.error("只能上传svg格式的文件");
      }
      if (!isLt500KB) {
        this.$message.error("文件大小不能超过500kb");
      }
      return isCSV && isLt500KB;
    },
  },
};
</script>
