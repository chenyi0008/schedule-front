import request from "@/utils/request";

export function postGroup(data) {
  return request({
    url: "group",
    method: "post",
    data,
  });
}

export function putGroup(data) {
  return request({
    url: "group",
    method: "put",
    data,
  });
}

export function deleteGroup(params) {
  return request({
    url: "group",
    method: "delete",
    params,
  });
}

export function geGroup(params) {
  return request({
    url: "group",
    method: "get",
    params,
  });
}

export function getGroupByStaff(params) {
  return request({
    url: "group/join",
    method: "get",
    params,
  });
}

export function getStaffIdByGroup(params) {
  return request({
    url: "group/list",
    method: "get",
    params,
  });
}
