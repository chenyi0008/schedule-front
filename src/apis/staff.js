import request from "@/utils/request";

export function postStaff(data) {
  return request({
    url: "staff/add",
    method: "post",
    data,
  });
}

export function putStaff(data) {
  return request({
    url: "staff",
    method: "put",
    data,
  });
}

export function deleteStaff(params) {
  return request({
    url: "staff",
    method: "delete",
    params,
  });
}

export function getAllStaff() {
  return request({
    url: "staff/getAll",
    method: "get",
  });
}

export function getStaffById(id) {
  return request({
    url: "staff/" + id,
    method: "get",
  });
}

export function getStaffByPage(params) {
  return request({
    url: "staff/page",
    method: "get",
    params,
  });
}
