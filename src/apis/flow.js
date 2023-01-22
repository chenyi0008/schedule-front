import request from "@/utils/request";

export function postSchedule(data) {
  return request({
    url: "schedule",
    method: "post",
    data,
  });
}

export function putSchedule(data) {
  return request({
    url: "schedule",
    method: "put",
    data,
  });
}

export function deleteSchedule(params) {
  return request({
    url: "schedule",
    method: "delete",
    params,
  });
}

export function getSchedule(params) {
  return request({
    url: "schedule/page",
    method: "get",
    params,
  });
}

export function delScheduleByDate(params) {
  return request({
    url: "schedule/date",
    method: "delete",
    params,
  });
}
export function getSchedule(params) {
  return request({
    url: "schedule/schedule",
    method: "get",
    params,
  });
}
