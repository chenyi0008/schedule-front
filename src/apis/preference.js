import request from "@/utils/request";

export function postPreference(data) {
  return request({
    url: "preference/add",
    method: "post",
    data,
  });
}

export function putPreference(data) {
  return request({
    url: "preference",
    method: "put",
    data,
  });
}

export function deletePreference(params) {
  return request({
    url: "preference",
    method: "delete",
    params,
  });
}

export function getAllPreference() {
  return request({
    url: "preference/getAll",
    method: "get",
  });
}

export function getPreferenceByUserId(id) {
  return request({
    url: "preference/" + id,
    method: "get",
  });
}
