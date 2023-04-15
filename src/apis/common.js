import request from "@/utils/request";
import axios from "axios";

export function postSchedule(storeId, file) {
	return request({
		url: `common/uploadCSV?storeId=${storeId}`,
		method: "post",
		headers: {
			"Content-Type": "multipart/form-data",
		},
		data: file,
	});
}
