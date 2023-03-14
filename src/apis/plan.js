import request from "@/utils/request";

export function postPlan(data) {
	return request({
		url: "plan",
		method: "post",
		data,
	});
}

export function putPlan(data) {
	return request({
		url: "plan",
		method: "put",
		data,
	});
}

export function deletePlan(params) {
	return request({
		url: "plan",
		method: "delete",
		params,
	});
}

export function getPlan(params) {
	return request({
		url: "plan",
		method: "get",
		params,
	});
}

export function getSchedule(storeId, params) {
	return request({
		url: "plan/calculate/" + storeId,
		method: "get",
		params,
	});
}
