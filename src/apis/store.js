import request from "@/utils/request";

export function postStore(data) {
  return request({
    url: "store",
    method: "post",
    data,
  });
}

export function putStore(data) {
  return request({
    url: "store",
    method: "put",
    data,
  });
}

export function deleteStore(params) {
  return request({
    url: "store",
    method: "delete",
    params,
  });
}

export function getAllStore() {
  return request({
    url: "store/getAll",
    method: "get",
  });
}

export function getStoreById(id) {
  return request({
    url: "store/" + id,
    method: "get",
  });
}

export function getStoreByPage(params) {
  return request({
    url: "store/page",
    method: "get",
    params,
  });
}
