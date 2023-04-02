import request from "@/utils/request";

export function postLogin(data) {
  return request({
    url: "user",
    method: "post",
    data,
  });
}

export function putRegisterByEmail(data) {
  return request({
    url: "user/email",
    method: "put",
    data,
  });
}

export function postACK(data){
  return request({
    url:"user/sendMsg",
    method:"post",
    data,
  });
}

