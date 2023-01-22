import request from "@/utils/request";

export function postRule(data) {
  return request({
    url: "rule/add",
    method: "post",
    data,
  });
}

export function putRule(data) {
  return request({
    url: "rule",
    method: "put",
    data,
  });
}

export function deleteRule(params) {
  return request({
    url: "rule",
    method: "delete",
    params,
  });
}

export function getAllRule() {
  return request({
    url: "rule/getAll",
    method: "get",
  });
}

export function getRuleById(id) {
  return request({
    url: "rule/" + id,
    method: "get",
  });
}

export function getRuleByStoreId(params) {
  return request({
    url: "rule/",
    method: "get",
    params,
  });
}


