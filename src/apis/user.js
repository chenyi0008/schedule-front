import request from "@/utils/request";

export function postLogin(data) {
  return request({
    url: "user",
    method: "post",
    data,
  });
}

export function putRegister(data) {
  return request({
    url: "user",
    method: "put",
    data,
  });
}
