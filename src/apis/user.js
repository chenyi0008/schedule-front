import request from "@/utils/request";

export function postLogin(data) {
  return request({
    url: "user",
    method: "post",
    data,
  });
}

export function putRegisterByEmail(data,params) {
  return request({
    url: "/user/email",
    method: "put",
    data,
    
    params:{code:params},
  });
}

export function sendMsg(data){
  return request({
    url:"/user/sendMsg",
    method:"post",
    data,

  });
}

