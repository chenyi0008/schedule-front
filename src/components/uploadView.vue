<template>
	<div>
		<el-upload
			action="#"
			:auto-upload="false"
			:http-request="handleFileUpload"
			:show-file-list="false"
			:on-change="c"
			ref="upload"
			multiple
			:limit="1"
			accept=".csv, text/csv, application/vnd.ms-excel"
		>
			<el-button
				class="el-icon-upload"
				size="small"
				type="primary"
				@click="submitFile"
			>
				选择文件
			</el-button>
		</el-upload>
	</div>
</template>

<script>
import { postSchedule } from "../apis/common.js";
// import {}   ;

export default {
	name: "uploadView",

	data() {
		return {
			fileList: [],
		};
	},
	methods: {
		postSchedule(storeId) {
			postSchedule(storeId).then((res) => {
				if (res.data.code === 1)
					this.$message({ message: "res.data.msg", type: "success" });
			});
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
		handleFileUpload(form) {
			// console.log(">>>", form.file);
			// const formData = new FormData();

			postSchedule(this.$store.state.storeId, form)
				.then((res) => {
					console.log(res);
					if (res.data.code === 1)
						this.$message({
							message: res.data.msg,
							type: "success",
						});
					else
						this.$message({
							message: res.data.msg,
							type: "warning",
						});
				})
				.catch((err) => {
					this.$message({ message: err, type: "error" });
				});
		},
		submitFile() {
			// this.$refs.upload.submit();
		},
		c() {
			this.$refs.upload.submit();
		},
	},
};
</script>
